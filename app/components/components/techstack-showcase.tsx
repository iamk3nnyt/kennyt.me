import { ComponentShowcase } from "@/components/component-showcase";

export function TechstackShowcase() {
  const techstack = [
    {
      name: "Frontend",
      value: "React, Next.js, TypeScript",
    },
    {
      name: "Backend",
      value: "Node.js, Express, MongoDB",
    },
    {
      name: "Styling",
      value: "Tailwind CSS, CSS Modules",
    },
    {
      name: "Testing",
      value: "Jest, React Testing Library",
    },
  ];

  return (
    <ComponentShowcase
      title="Techstack"
      description="A grid component for displaying tech stack items with names and values, including an empty state."
      demo={
        <div className="sm:p-4">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {techstack.map((item) => (
              <li key={item.name} className="rounded-lg bg-[#18181B] p-4">
                <span className="block text-sm text-[#B0B0B0]">
                  {item.name}
                </span>
                <span className="block text-lg font-medium text-white">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      }
      code={`import { getTechStack } from "@/lib/data/tech";

async function Techstack() {
  const techstack = await getTechStack();

  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Tech stack</h2>
      {techstack.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
          <div className="mb-4 text-4xl">💻</div>
          <h3 className="mb-2 text-lg font-medium text-white">
            No Tech Stack Added
          </h3>
          <p className="text-sm text-[#B0B0B0]">
            My tech stack hasn&apos;t been added yet. I&apos;ll share the tools,
            frameworks, and technologies I use to build and maintain my projects
            here.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {techstack.map((item) => (
            <li key={item.name} className="rounded-lg bg-[#18181B] p-4">
              <span className="block text-sm text-[#B0B0B0]">{item.name}</span>
              <span className="block text-lg font-medium text-white">
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}`}
    />
  );
}
