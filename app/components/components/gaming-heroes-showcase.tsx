import { AppImage } from "@/components/app-image";
import { ComponentShowcase } from "@/components/component-showcase";

export function GamingHeroesShowcase() {
  const heroes = [
    {
      name: "Layla",
      role: "Marksman",
      specialty: "Finisher/Damage",
      image:
        "https://static.wikia.nocookie.net/mobile-legends/images/5/58/Hero181-portrait.png",
    },
    {
      name: "Franco",
      role: "Tank",
      specialty: "Initiator/Control",
      image:
        "https://static.wikia.nocookie.net/mobile-legends/images/b/b3/Hero101-portrait.png",
    },
    {
      name: "Eudora",
      role: "Mage",
      specialty: "Control/Burst",
      image:
        "https://static.wikia.nocookie.net/mobile-legends/images/a/ab/Hero151-portrait.png",
    },
  ];

  return (
    <ComponentShowcase
      title="Gaming Heroes"
      description="A showcase of my main heroes in Mobile Legends: Bang Bang, featuring their roles, specialties, and splash art in a horizontal scrollable layout."
      demo={
        <div className="sm:p-4">
          <h2 className="mb-6 text-xl font-semibold text-white">Main Heroes</h2>
          <div className="flex gap-8 overflow-x-auto p-0.5">
            {heroes.map((hero) => (
              <div
                key={hero.name}
                className="group relative h-[420px] max-w-xs min-w-[280px] flex-shrink-0 overflow-hidden rounded-2xl shadow-lg"
              >
                <AppImage
                  src={hero.image}
                  alt={`${hero.name} hero splash art`}
                  className="absolute inset-0"
                />
                {/* Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
                {/* Content */}
                <div className="relative z-20 flex h-full flex-col justify-end p-6">
                  <div className="mb-2">
                    <div className="text-2xl font-bold text-white drop-shadow-lg">
                      {hero.name}
                    </div>
                    <div className="text-xs font-medium tracking-wide text-blue-200 uppercase drop-shadow">
                      {hero.role} • {hero.specialty}
                    </div>
                  </div>
                </div>
                {/* Card border effect */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-blue-500/30 transition-all ring-inset" />
              </div>
            ))}
          </div>
        </div>
      }
      code={`import { AppImage } from "@/components/app-image";
import { getHeroes } from "@/lib/data/gaming";

async function Heroes() {
  const heroes = await getHeroes();

  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Main Heroes</h2>
      {heroes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
          <div className="mb-4 text-4xl">⚔️</div>
          <h3 className="mb-2 text-lg font-medium text-white">
            No Heroes Added
          </h3>
          <p className="text-sm text-[#B0B0B0]">
            My hero pool hasn&apos;t been added yet. I&apos;ll showcase my
            favorite heroes here, including their roles, specialties, and splash
            art.
          </p>
        </div>
      ) : (
        <div className="flex gap-8 overflow-x-auto p-0.5">
          {heroes.map((hero) => (
            <div
              key={hero.name}
              className="group relative h-[420px] max-w-xs min-w-[280px] flex-shrink-0 overflow-hidden rounded-2xl shadow-lg"
            >
              <AppImage
                src={hero.image}
                alt={\`\${hero.name} hero splash art\`}
                className="absolute inset-0"
              />
              {/* Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
              {/* Content */}
              <div className="relative z-20 flex h-full flex-col justify-end p-6">
                <div className="mb-2">
                  <div className="text-2xl font-bold text-white drop-shadow-lg">
                    {hero.name}
                  </div>
                  <div className="text-xs font-medium tracking-wide text-blue-200 uppercase drop-shadow">
                    {hero.role} • {hero.specialty}
                  </div>
                </div>
              </div>
              {/* Card border effect */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-blue-500/30 transition-all ring-inset" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}`}
    />
  );
}
