import { BaseDocument } from "@/lib/db/types";

export interface BudgetStats extends BaseDocument {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  month: string;
  year: number;
  lastUpdated: Date;
}

export interface Transaction extends BaseDocument {
  amount: number;
  category: string;
  description: string;
  date: string;
  type: "income" | "expense";
  month: string;
  year: number;
}
