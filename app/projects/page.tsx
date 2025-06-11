import { AppImage } from "@/components/app-image";
import { ReadOperations } from "@/lib/db/read";
import client from "@/lib/mongodb";
import { Project } from "@/types/project";

export default async function ProjectsPage() {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Project>(db, "projects");

  const projects = await readOps.findMany(
    {},
    {
      projection: { _id: 0, title: 1, link: 1 },
      sort: { title: -1 }, // Sort by title in descending order
    },
  );

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
