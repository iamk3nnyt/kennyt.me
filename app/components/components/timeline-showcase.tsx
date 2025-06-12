import { ComponentShowcase } from "@/components/component-showcase";

export function TimelineShowcase() {
  const entries = [
    {
      role: "Senior Software Engineer",
      company: "Tech Corp",
      period: "Jan 2023 - Present",
      description:
        "Leading development of core platform features and mentoring junior developers.",
    },
    {
      role: "Software Engineer",
      company: "Startup Inc",
      period: "Mar 2021 - Dec 2022",
      description:
        "Built and maintained critical infrastructure and APIs for the main product.",
    },
    {
      role: "Junior Developer",
      company: "Agency XYZ",
      period: "Jun 2020 - Feb 2021",
      description:
        "Developed and maintained client websites using modern web technologies.",
    },
  ];

  return (
    <ComponentShowcase
      title="Timeline"
      description="A vertical timeline component for displaying chronological entries with dates, titles, and descriptions."
      demo={
        <div className="sm:p-4">
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
        </div>
      }
      code={`import { getTimelineEntries } from "@/lib/data/timeline";

async function Timeline() {
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

  const entries = await getTimelineEntries({
    startDate: {
      $gte: twoYearsAgo,
    },
  });

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
}`}
    />
  );
}
