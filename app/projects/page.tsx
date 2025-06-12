import { AppImage } from "@/components/app-image";
import { getProjects } from "@/lib/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Kenny Tran's Portfolio Showcase",
  description:
    "Explore my portfolio of projects and products I've designed, built, or contributed to. Each project reflects my passion for clean design, robust engineering, and modern web technologies.",
  openGraph: {
    title: "Projects - Kenny Tran's Portfolio Showcase",
    description:
      "Explore my portfolio of projects and products I've designed, built, or contributed to. Each project reflects my passion for clean design, robust engineering, and modern web technologies.",
    url: "/projects",
    type: "website",
    images: [
      {
        url: "/projects.png",
        width: 1200,
        height: 630,
        alt: "Kenny Tran's Project Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Kenny Tran's Portfolio Showcase",
    description:
      "Explore my portfolio of projects and products I've designed, built, or contributed to. Each project reflects my passion for clean design, robust engineering, and modern web technologies.",
    images: ["/projects.png"],
    creator: "@itsk3nny_",
  },
  alternates: {
    canonical: "/projects",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Projects - Kenny Tran's Portfolio Showcase",
      description:
        "Explore my portfolio of projects and products I've designed, built, or contributed to. Each project reflects my passion for clean design, robust engineering, and modern web technologies.",
      url: "https://www.kennyt.me/projects",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [],
      },
      author: {
        "@type": "Person",
        name: "Kenny Tran",
        url: "https://www.kennyt.me/about",
      },
      publisher: {
        "@type": "Person",
        name: "Kenny Tran",
        url: "https://www.kennyt.me/about",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.kennyt.me/projects",
      },
    }),
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="bg-[#111113] px-4 pt-16 text-[#F3F3F3]">
      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">Showcase</h2>
        <p className="mb-8 text-[#B0B0B0]">
          A selection of projects and products I&apos;ve designed, built, or
          contributed to. Each project reflects my passion for clean design,
          robust engineering, and modern web technologies.
        </p>
      </section>

      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">Portfolio</h2>
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
            <div className="mb-4 text-4xl">💼</div>
            <h3 className="mb-2 text-lg font-medium text-white">
              No Projects Showcased
            </h3>
            <p className="text-sm text-[#B0B0B0]">
              My portfolio of projects hasn&apos;t been curated yet. I&apos;ll
              share my work in design, engineering, and web technologies here,
              with each project reflecting my passion for clean solutions.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[#232326]">
            {projects.map((project) => (
              <li key={project.title} className="flex items-center gap-2 py-2">
                <span className="relative size-5 shrink-0">
                  <AppImage
                    src={`https://www.google.com/s2/favicons?domain=${project.link}&sz=64`}
                    alt={project.title + " favicon"}
                    className="h-full w-full"
                  />
                </span>
                <div className="flex-1">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    {project.title}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
