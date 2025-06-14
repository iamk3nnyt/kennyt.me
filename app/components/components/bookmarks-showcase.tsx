import { AppImage } from "@/components/app-image";
import { ComponentShowcase } from "@/components/component-showcase";

export function BookmarksShowcase() {
  const bookmarks = [
    {
      name: "Next.js",
      url: "https://nextjs.org",
      icon: "https://www.google.com/s2/favicons?domain=nextjs.org&sz=64",
    },
    {
      name: "Tailwind CSS",
      url: "https://tailwindcss.com",
      icon: "https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=64",
    },
    {
      name: "TypeScript",
      url: "https://www.typescriptlang.org",
      icon: "https://www.google.com/s2/favicons?domain=typescriptlang.org&sz=64",
    },
    {
      name: "Vercel",
      url: "https://vercel.com",
      icon: "https://www.google.com/s2/favicons?domain=vercel.com&sz=64",
    },
  ];

  return (
    <ComponentShowcase
      title="Bookmarks"
      description="A collection of useful tools and resources, each bringing value to my workflow."
      demo={
        <ul className="divide-y divide-[#232326] sm:p-4">
          {bookmarks.map((item) => (
            <li key={item.url} className="flex gap-2 py-2">
              <div className="relative size-5 shrink-0">
                <AppImage
                  src={item.icon}
                  alt={item.name}
                  className="h-full w-full"
                />
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      }
      code={`async function Bookmarks() {
  const bookmarks = await getBookmarks();

  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Bookmarks</h2>
      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
          <div className="mb-4 text-4xl">🔖</div>
          <h3 className="mb-2 text-lg font-medium text-white">
            No Bookmarks Saved
          </h3>
          <p className="text-sm text-[#B0B0B0]">
            My collection of useful tools and resources hasn't been curated yet.
            I'll share my favorite tools, articles, and resources here, with each
            bookmark bringing value to my workflow.
          </p>
        </div>
      ) : (
        <ul className="mb-8 divide-y divide-[#232326]">
          {bookmarks.map((item) => (
            <li key={item.url} className="flex items-center gap-2 py-2">
              <div className="relative size-5 shrink-0">
                <AppImage
                  src={item.icon}
                  alt={item.name}
                  className="h-full w-full"
                />
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                {item.name}
              </a>
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
