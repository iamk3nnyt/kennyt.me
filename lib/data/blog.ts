import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import { ReadOperations } from "@/lib/db/read";
import { BaseDocument } from "@/lib/db/types";
import { UpdateOperations } from "@/lib/db/update";
import client from "@/lib/mongodb";
import { Article } from "@/types/blog";
import { Filter } from "mongodb";

// Article operations
export async function getArticles(filter: Filter<Article> = {}) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Article>(db, "articles");

  return readOps.findMany(filter, {
    projection: {
      _id: 0,
      slug: 1,
      title: 1,
      excerpt: 1,
      date: 1,
      image: 1,
      content: 1,
    },
    sort: { date: -1 },
  });
}

export async function getArticleBySlug(slug: string) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Article>(db, "articles");

  return readOps.findOne(
    { slug },
    {
      projection: {
        _id: 0,
        slug: 1,
        title: 1,
        excerpt: 1,
        date: 1,
        content: 1,
        image: 1,
      },
    },
  );
}

export async function createArticle(data: Omit<Article, keyof BaseDocument>) {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<Article>(db, "articles");

  return createOps.createOne(data);
}

export async function createManyArticles(
  data: Array<Omit<Article, keyof BaseDocument>>,
) {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<Article>(db, "articles");

  return createOps.createMany(data);
}

export async function updateArticle(
  slug: string,
  data: Partial<Omit<Article, keyof BaseDocument>>,
) {
  const db = client.db("kennyt");
  const updateOps = new UpdateOperations<Article>(db, "articles");

  return updateOps.updateOne({ slug }, { $set: data });
}

export async function deleteArticle(slug: string) {
  const db = client.db("kennyt");
  const deleteOps = new DeleteOperations<Article>(db, "articles");

  return deleteOps.deleteOne({ slug });
}

export async function deleteAllArticles() {
  const db = client.db("kennyt");
  const deleteOps = new DeleteOperations<Article>(db, "articles");

  return deleteOps.deleteMany({});
}

// Featured Article operations
export async function getFeaturedArticles(
  filter: Filter<Article> = { featured: true },
) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Article>(db, "articles");

  return readOps.findMany(filter, {
    projection: {
      _id: 0,
      slug: 1,
      title: 1,
      excerpt: 1,
      date: 1,
    },
    sort: { date: -1 },
  });
}

export async function getFeaturedArticleBySlug(slug: string) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Article>(db, "articles");

  return readOps.findOne(
    { slug, featured: true },
    {
      projection: {
        _id: 0,
        slug: 1,
        title: 1,
        excerpt: 1,
        date: 1,
      },
    },
  );
}

export async function createFeaturedArticle(
  data: Omit<Article, keyof BaseDocument>,
) {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<Article>(db, "articles");

  return createOps.createOne(data);
}

export async function createManyFeaturedArticles(
  data: Array<Omit<Article, keyof BaseDocument>>,
) {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<Article>(db, "articles");

  return createOps.createMany(data);
}

export async function updateFeaturedArticle(
  slug: string,
  data: Partial<Omit<Article, keyof BaseDocument>>,
) {
  const db = client.db("kennyt");
  const updateOps = new UpdateOperations<Article>(db, "articles");

  return updateOps.updateOne({ slug }, { $set: data });
}

export async function deleteFeaturedArticle(slug: string) {
  const db = client.db("kennyt");
  const deleteOps = new DeleteOperations<Article>(db, "articles");

  return deleteOps.deleteOne({ slug });
}

export async function deleteAllFeaturedArticles() {
  const db = client.db("kennyt");
  const deleteOps = new DeleteOperations<Article>(db, "articles");

  return deleteOps.deleteMany({});
}

export async function getPaginatedArticles(page: number, limit: number) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Article>(db, "articles");

  return readOps.findPaginated(
    {},
    {
      page,
      limit,
      sort: { date: -1 },
    },
    {
      projection: {
        _id: 0,
        slug: 1,
        title: 1,
        excerpt: 1,
        date: 1,
        image: 1,
      },
    },
  );
}

export async function getArticleCount() {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Article>(db, "articles");

  return readOps.count({});
}

export async function getArticlesByDateRange(
  startDate: string,
  endDate: string,
) {
  return getArticles({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  });
}

export async function getArticlesByTitle(title: string) {
  return getArticles({
    title: { $regex: title, $options: "i" },
  });
}

export async function getRecentArticles(limit: number = 5) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Article>(db, "articles");

  return readOps.findMany(
    {},
    {
      projection: {
        _id: 0,
        slug: 1,
        title: 1,
        excerpt: 1,
        date: 1,
        image: 1,
      },
      sort: { date: -1 },
      limit,
    },
  );
}

// Seed operations
export async function seedArticles() {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<Article>(db, "articles");
  const deleteOps = new DeleteOperations<Article>(db, "articles");

  const seed = [
    {
      slug: "crafting-design-system",
      title: "Crafting a design system for a multiplanetary future",
      date: "September 5, 2022",
      excerpt:
        "Most companies try to stay ahead of the curve when it comes to visual design. For Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.",
      content: `
      <p>Most companies try to stay ahead of the curve when it comes to visual design. For Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.</p>
      <h2>Why a Design System?</h2>
      <p>A design system is more than a set of UI components. It's a shared language for teams to build consistent, scalable products. For a multiplanetary future, this consistency is even more important.</p>
      <ul>
        <li>Unified branding across platforms</li>
        <li>Reusable components for rapid development</li>
        <li>Accessibility and performance at scale</li>
      </ul>
      <p>By investing in a robust design system, we ensure our products are ready for the challenges of tomorrow.</p>
    `,
      image: "https://example.com/nextjs.jpg",
      featured: false,
    },
    {
      slug: "building-ai-applications",
      title: "Building AI Applications with Next.js and OpenAI",
      date: "March 15, 2023",
      excerpt:
        "Learn how to build powerful AI applications using Next.js and OpenAI's API. This guide covers everything from setting up your project to implementing advanced AI features.",
      content: `
      <p>Artificial Intelligence is transforming how we build applications. With Next.js and OpenAI, we can create powerful AI-driven experiences that were once only possible in science fiction.</p>
      <h2>Getting Started</h2>
      <p>Setting up an AI application requires careful consideration of both frontend and backend architecture. Here's how we can structure our application for optimal performance and user experience.</p>
      <ul>
        <li>Setting up Next.js with TypeScript</li>
        <li>Integrating OpenAI's API</li>
        <li>Building a responsive UI</li>
        <li>Implementing error handling</li>
      </ul>
      <p>By following these steps, you'll have a solid foundation for building AI-powered applications.</p>
    `,
      image: "https://example.com/nextjs.jpg",
      featured: false,
    },
  ];

  // Clear existing articles
  await deleteOps.deleteMany({});

  // Insert new articles
  return createOps.createMany(seed);
}

export async function seedFeaturedArticles() {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<Article>(db, "articles");
  const deleteOps = new DeleteOperations<Article>(db, "articles");

  const seed = [
    {
      slug: "crafting-design-system-featured",
      title: "Crafting a design system for a multiplanetary future",
      date: "September 5, 2022",
      excerpt:
        "Most companies try to stay ahead of the curve when it comes to visual design. For Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.",
      content: `
      <p>Most companies try to stay ahead of the curve when it comes to visual design. For Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.</p>
      <h2>Why a Design System?</h2>
      <p>A design system is more than a set of UI components. It's a shared language for teams to build consistent, scalable products. For a multiplanetary future, this consistency is even more important.</p>
      <ul>
        <li>Unified branding across platforms</li>
        <li>Reusable components for rapid development</li>
        <li>Accessibility and performance at scale</li>
      </ul>
      <p>By investing in a robust design system, we ensure our products are ready for the challenges of tomorrow.</p>
    `,
      image: "https://example.com/nextjs.jpg",
      featured: true,
    },
    {
      slug: "building-ai-applications-featured",
      title: "Building AI Applications with Next.js and OpenAI",
      date: "March 15, 2023",
      excerpt:
        "Learn how to build powerful AI applications using Next.js and OpenAI's API. This guide covers everything from setting up your project to implementing advanced AI features.",
      content: `
      <p>Artificial Intelligence is transforming how we build applications. With Next.js and OpenAI, we can create powerful AI-driven experiences that were once only possible in science fiction.</p>
      <h2>Getting Started</h2>
      <p>Setting up an AI application requires careful consideration of both frontend and backend architecture. Here's how we can structure our application for optimal performance and user experience.</p>
      <ul>
        <li>Setting up Next.js with TypeScript</li>
        <li>Integrating OpenAI's API</li>
        <li>Building a responsive UI</li>
        <li>Implementing error handling</li>
      </ul>
      <p>By following these steps, you'll have a solid foundation for building AI-powered applications.</p>
    `,
      image: "https://example.com/nextjs.jpg",
      featured: true,
    },
  ];

  // Clear existing featured articles
  await deleteOps.deleteMany({});

  // Insert new featured articles
  return createOps.createMany(seed);
}
