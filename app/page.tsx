import { AppImage } from "@/components/app-image";
import { ReadOperations } from "@/lib/db/read";
import client from "@/lib/mongodb";
import { cn } from "@/lib/utils";
import { FeaturedArticle } from "@/types/blog";
import { TimelineEntry } from "@/types/timeline";
import Link from "next/link";

function Gallery() {
  const gallery = [
    {
      src: "/gallery/mountain.png",
      alt: "Mountain",
    },
    {
      src: "/gallery/beach.png",
      alt: "Beach",
    },
    {
      src: "/gallery/tower.png",
      alt: "Tower",
    },
    {
      src: "/gallery/city.png",
      alt: "City",
    },
    {
      src: "/gallery/tv.png",
      alt: "Tv",
    },
    {
      src: "/gallery/underground.png",
      alt: "Underground",
    },
  ];
  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Photo Gallery</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {gallery.map((img, idx) => (
          <div key={idx} className="overflow-hidden rounded-xl bg-[#18181B]">
            <div className="relative h-40">
              <AppImage
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

async function Timeline() {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<TimelineEntry>(db, "timeline");

  const entries = await readOps.findMany(
    {},
    {
      projection: {
        _id: 0,
        company: 1,
        role: 1,
        period: 1,
        description: 1,
        location: 1,
        skills: 1,
        achievements: 1,
      },
      sort: { startDate: -1 },
    },
  );

  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Work Timeline</h2>
      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
          <div className="mb-4 text-4xl">💼</div>
          <h3 className="mb-2 text-lg font-medium text-white">
            No Work Experience
          </h3>
          <p className="text-sm text-[#B0B0B0]">
            My work experience hasn&apos;t been added yet. I&apos;ll share my
            professional journey here, including my roles, achievements, and the
            skills I&apos;ve developed along the way.
          </p>
        </div>
      ) : (
        <ol className="relative border-l border-[#232326]">
          {entries.map((job, idx) => (
            <li key={idx} className="mb-10 ml-4">
              <div className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full border-2 border-[#232326] bg-blue-500" />
              <h3 className="text-lg font-semibold text-white">
                {job.role}{" "}
                <span className="font-normal text-[#B0B0B0]">
                  @ {job.company}
                </span>
              </h3>
              <span className="mb-1 block text-xs text-[#88888C]">
                {job.period}
              </span>
              <p className="mb-2 text-[#B0B0B0]">{job.description}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

async function Featured() {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<FeaturedArticle>(db, "blog_posts");

  const posts = await readOps.findMany(
    { featured: true },
    {
      projection: { _id: 0, slug: 1, title: 1, excerpt: 1, date: 1 },
      sort: { date: -1 }, // Sort by date in descending order
    },
  );

  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Featured articles
      </h2>
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
          <div className="mb-4 text-4xl">📝</div>
          <h3 className="mb-2 text-lg font-medium text-white">
            No Featured Articles
          </h3>
          <p className="text-sm text-[#B0B0B0]">
            My featured articles haven&apos;t been selected yet. I&apos;ll share
            my best thoughts on design, development, and the creative process
            here, with each article bringing new insights.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-[#232326]">
          {posts.map((post, index) => (
            <article key={post.slug} className={cn(index ? "py-6" : "pb-6")}>
              <h3 className="mb-1 text-2xl font-semibold text-white">
                <Link href={`/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h3>
              <time className="mb-2 block text-xs text-[#88888C]">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <p className="mb-2 text-[#B0B0B0]">{post.excerpt}</p>
              <Link
                href={`/${post.slug}`}
                className="inline-block text-sm text-blue-400 transition hover:text-blue-300"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function Techstack() {
  const techstack = [
    { name: "Editor", value: "VS Code" },
    { name: "Terminal", value: "Oh My Zsh" },
    { name: "Framework", value: "Next.js" },
    { name: "Language", value: "TypeScript" },
    { name: "UI", value: "Tailwind CSS" },
    { name: "Hosting", value: "Vercel" },
    { name: "Version Control", value: "Git & GitHub" },
    { name: "Database", value: "MongoDB" },
  ];
  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Tech stack</h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {techstack.map((item, idx) => (
          <li key={idx} className="rounded-lg bg-[#18181B] p-4">
            <span className="block text-sm text-[#B0B0B0]">{item.name}</span>
            <span className="block text-lg font-medium text-white">
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="bg-[#111113] px-4 pt-16 text-[#F3F3F3]">
      <Gallery />
      <Timeline />
      <Featured />
      <Techstack />
    </main>
  );
}
