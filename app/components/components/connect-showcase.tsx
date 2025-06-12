import { AppImage } from "@/components/app-image";
import { ComponentShowcase } from "@/components/component-showcase";

export function ConnectShowcase() {
  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/iamk3nnyt",
      icon: "https://www.google.com/s2/favicons?domain=github.com&sz=64",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/itsk3nny_",
      icon: "https://www.google.com/s2/favicons?domain=twitter.com&sz=64",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/itsk3nny",
      icon: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=64",
    },
    {
      name: "Dribbble",
      url: "https://dribbble.com/itsk3nny",
      icon: "https://www.google.com/s2/favicons?domain=dribbble.com&sz=64",
    },
  ];

  return (
    <ComponentShowcase
      title="Connect"
      description="A grid component for displaying social media links with icons and hover effects."
      demo={
        <div className="sm:p-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {socials.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group flex items-center gap-3 rounded-lg bg-[#18181B] p-4 transition-colors hover:bg-[#232326]"
              >
                <span className="relative size-6">
                  <AppImage
                    src={link.icon}
                    alt={`${link.name} icon`}
                    className="h-full w-full"
                  />
                </span>
                <span className="text-sm text-[#B0B0B0] group-hover:text-white">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      }
      code={`import { AppImage } from "@/components/app-image";
import { getSocialLinks } from "@/lib/data/social";

async function Connect() {
  const socials = await getSocialLinks();

  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Connect</h2>
      {socials.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
          <div className="mb-4 text-4xl">🔗</div>
          <h3 className="mb-2 text-lg font-medium text-white">
            No Social Links Added
          </h3>
          <p className="text-sm text-[#B0B0B0]">
            I haven&apos;t added my social media profiles yet. Check back soon
            to connect with me on various platforms and stay updated with my
            latest work and projects.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {socials.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group flex items-center gap-3 rounded-lg bg-[#18181B] p-4 transition-colors hover:bg-[#232326]"
            >
              <span className="relative size-6">
                <AppImage
                  src={link.icon}
                  alt={\`\${link.name} icon\`}
                  className="h-full w-full"
                />
              </span>
              <span className="text-sm text-[#B0B0B0] group-hover:text-white">
                {link.name}
              </span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}`}
    />
  );
}
