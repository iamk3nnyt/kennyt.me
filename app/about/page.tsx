import { AppImage } from "@/components/app-image";
import { getBookmarks } from "@/lib/data/bookmarks";
import { getRoomItems } from "@/lib/data/room";
import { getSocialLinks } from "@/lib/data/social";
import { RoomItem } from "@/types/room";
import {
  Gamepad2,
  Headphones,
  Laptop,
  Monitor,
  Smartphone,
  Sofa,
  Watch,
} from "lucide-react";

function Intro() {
  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Biography</h2>
      <p className="mb-8 text-[#B0B0B0]">
        I&apos;m Kenny, a full stack developer, designer, and founder passionate
        about building beautiful, performant web experiences. I love working at
        the intersection of design and engineering, and I&apos;m always
        exploring new technologies and creative projects.
      </p>
    </section>
  );
}

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
      )}
    </section>
  );
}

async function Bookmarks() {
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
            My collection of useful tools and resources hasn&apos;t been curated
            yet. I&apos;ll share my favorite tools, articles, and resources
            here, with each bookmark bringing value to my workflow.
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
}

const categoryIcons = {
  peripherals: Headphones,
  computers: Laptop,
  display: Monitor,
  audio: Headphones,
  mobile: Smartphone,
  gaming: Gamepad2,
  furniture: Sofa,
  wearables: Watch,
} as const;

async function Room() {
  const items = await getRoomItems();

  // Group items by category
  const categories = items.reduce(
    (acc: Record<string, RoomItem[]>, item: RoomItem) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {},
  );

  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Room Setup</h2>
      <p className="mb-8 text-[#B0B0B0]">
        My workspace is carefully curated with high-quality peripherals and
        equipment to ensure optimal productivity and comfort. Here&apos;s a
        detailed breakdown of my setup.
      </p>
      {Object.keys(categories).length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
          <div className="mb-4 text-4xl">🏠</div>
          <h3 className="mb-2 text-lg font-medium text-white">
            No Room Setup Added
          </h3>
          <p className="text-sm text-[#B0B0B0]">
            My room setup hasn&apos;t been added yet. I&apos;ll share my
            workspace details here, including the equipment, peripherals, and
            furniture that make up my productive environment.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {(Object.entries(categories) as [string, RoomItem[]][]).map(
            ([category, items]) => {
              const Icon =
                categoryIcons[category as keyof typeof categoryIcons];
              return (
                <div key={category}>
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-medium text-white capitalize">
                    <Icon className="h-5 w-5" />
                    {category}
                  </h3>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {items.map((item: RoomItem) => (
                      <li
                        key={item.name}
                        className="flex items-center gap-3 rounded-lg bg-[#18181B] p-4 transition-colors hover:bg-[#232326]"
                      >
                        <span className="text-sm text-[#B0B0B0]">
                          {item.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            },
          )}
        </div>
      )}
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-[#111113] px-4 pt-16 text-[#F3F3F3]">
      <Intro />
      <Connect />
      <Bookmarks />
      <Room />
    </main>
  );
}
