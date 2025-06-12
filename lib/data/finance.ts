// lib/data/finance.ts
import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import { ReadOperations } from "@/lib/db/read";
import { BaseDocument } from "@/lib/db/types";
import { UpdateOperations } from "@/lib/db/update";
import client from "@/lib/mongodb";
import { Transaction } from "@/types/finance";
import { Filter } from "mongodb";

// Read operations
export async function getTransactions(filter: Filter<Transaction> = {}) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Transaction>(db, "transactions");

  return readOps.findMany(filter, {
    projection: {
      _id: 0,
      amount: 1,
      type: 1,
      category: 1,
      description: 1,
      date: 1,
      paymentMethod: 1,
      status: 1,
    },
    sort: { date: -1 }, // Sort by date descending
  });
}

export async function getTransactionById(id: string) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Transaction>(db, "transactions");

  return readOps.findById(id, {
    projection: {
      _id: 0,
      amount: 1,
      type: 1,
      category: 1,
      description: 1,
      date: 1,
      paymentMethod: 1,
      status: 1,
    },
  });
}

// Create operations
export async function createTransaction(
  data: Omit<Transaction, keyof BaseDocument>,
) {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<Transaction>(db, "transactions");

  return createOps.createOne(data);
}

export async function createManyTransactions(
  data: Array<Omit<Transaction, keyof BaseDocument>>,
) {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<Transaction>(db, "transactions");

  return createOps.createMany(data);
}

// Update operations
export async function updateTransaction(
  id: string,
  data: Partial<Omit<Transaction, keyof BaseDocument>>,
) {
  const db = client.db("kennyt");
  const updateOps = new UpdateOperations<Transaction>(db, "transactions");

  return updateOps.updateById(id, { $set: data });
}

// Delete operations
export async function deleteTransaction(id: string) {
  const db = client.db("kennyt");
  const deleteOps = new DeleteOperations<Transaction>(db, "transactions");

  return deleteOps.deleteById(id);
}

export async function deleteAllTransactions() {
  const db = client.db("kennyt");
  const deleteOps = new DeleteOperations<Transaction>(db, "transactions");

  return deleteOps.deleteMany({});
}

// Seed operation
export async function seedTransactions() {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<Transaction>(db, "transactions");
  const deleteOps = new DeleteOperations<Transaction>(db, "transactions");

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  const seed = [
    {
      amount: -45.99,
      category: "Groceries",
      description: "Weekly grocery shopping at Whole Foods",
      date: new Date().toISOString().split("T")[0],
      type: "expense",
      month: currentMonth,
      year: currentYear,
    },
    {
      amount: 2500,
      category: "Salary",
      description: "Monthly salary deposit",
      date: new Date().toISOString().split("T")[0],
      type: "income",
      month: currentMonth,
      year: currentYear,
    },
    {
      amount: -29.99,
      category: "Entertainment",
      description: "Netflix subscription",
      date: new Date().toISOString().split("T")[0],
      type: "expense",
      month: currentMonth,
      year: currentYear,
    },
    {
      amount: -89.99,
      category: "Utilities",
      description: "Electricity bill",
      date: new Date().toISOString().split("T")[0],
      type: "expense",
      month: currentMonth,
      year: currentYear,
    },
    {
      amount: 150,
      category: "Freelance",
      description: "Website development project",
      date: new Date().toISOString().split("T")[0],
      type: "income",
      month: currentMonth,
      year: currentYear,
    },
  ];

  // Clear existing transactions
  await deleteOps.deleteMany({});

  // Insert new transactions
  return createOps.createMany(seed);
}

// Helper functions for common queries
export async function getTransactionsByDateRange(
  startDate: string,
  endDate: string,
) {
  return getTransactions({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  });
}

export async function getTransactionsByType(type: "income" | "expense") {
  return getTransactions({ type });
}

export async function getTransactionsByCategory(category: string) {
  return getTransactions({ category });
}

export async function getTransactionsByPaymentMethod(paymentMethod: string) {
  return getTransactions({ paymentMethod });
}

export async function getTransactionsByStatus(
  status: "pending" | "completed" | "failed",
) {
  return getTransactions({ status });
}

export async function getTransactionsByAmountRange(
  minAmount: number,
  maxAmount: number,
) {
  return getTransactions({
    amount: {
      $gte: minAmount,
      $lte: maxAmount,
    },
  });
}

// Aggregation functions
export async function getTotalIncome(startDate?: string, endDate?: string) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Transaction>(db, "transactions");

  const filter: Filter<Transaction> = { type: "income" };
  if (startDate && endDate) {
    filter.date = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  const transactions = await readOps.findMany(filter);
  return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}

export async function getTotalExpenses(startDate?: string, endDate?: string) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Transaction>(db, "transactions");

  const filter: Filter<Transaction> = { type: "expense" };
  if (startDate && endDate) {
    filter.date = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  const transactions = await readOps.findMany(filter);
  // Since expenses are already negative, we need to make them positive for the total
  return transactions.reduce(
    (sum, transaction) => sum + Math.abs(transaction.amount),
    0,
  );
}

export async function getNetIncome(startDate?: string, endDate?: string) {
  const income = await getTotalIncome(startDate, endDate);
  const expenses = await getTotalExpenses(startDate, endDate);
  return income - expenses;
}

export async function getCategoryTotals(startDate?: string, endDate?: string) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Transaction>(db, "transactions");

  const filter: Filter<Transaction> = {};
  if (startDate && endDate) {
    filter.date = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  const transactions = await readOps.findMany(filter);
  const categoryTotals = new Map<string, number>();

  transactions.forEach((transaction) => {
    const currentTotal = categoryTotals.get(transaction.category) || 0;
    // Since expenses are already negative in the data, we just add the amount directly
    categoryTotals.set(transaction.category, currentTotal + transaction.amount);
  });

  return Object.fromEntries(categoryTotals);
}
