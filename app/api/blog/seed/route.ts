import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import client from "@/lib/mongodb";
import { Article } from "@/types/blog";
import { NextResponse } from "next/server";

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
    image: "/og.png",
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
    image: "/ai-app.png",
  },
];

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const db = client.db("kennyt");
    const createOps = new CreateOperations<Article>(db, "articles");
    const deleteOps = new DeleteOperations<Article>(db, "articles");

    // Clear existing posts
    await deleteOps.deleteMany({});

    // Insert new posts
    const result = await createOps.createMany(seed);

    return NextResponse.json({
      message: "Successfully seeded blog posts",
      count: result.length,
      posts: result,
    });
  } catch (error) {
    console.error("Error seeding blog posts:", error);
    return NextResponse.json(
      { error: "Failed to seed blog posts" },
      { status: 500 },
    );
  }
}
