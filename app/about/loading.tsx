import { AppImage } from "@/components/app-image";
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

function Connect() {
  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-4 text-xl font-semibold text-white">Connect</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg bg-[#18181B] p-4"
          >
            <div className="shimmer size-6 shrink-0 rounded" />
            <div className="shimmer h-5 w-20 rounded" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Bookmarks() {
  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Bookmarks</h2>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-2 py-2">
            <div className="shimmer size-5 shrink-0 rounded" />
            <div className="shimmer h-5 w-full rounded" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Room() {
  const categories = [
    "peripherals",
    "computers",
    "display",
    "audio",
    "mobile",
    "gaming",
    "furniture",
    "wearables",
  ];

  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Room Setup</h2>
      <p className="mb-8 text-[#B0B0B0]">
        My workspace is carefully curated with high-quality peripherals and
        equipment to ensure optimal productivity and comfort. Here&apos;s a
        detailed breakdown of my setup.
      </p>
      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category}>
            <div className="mb-4 flex items-center gap-2">
              <div className="shimmer size-5 shrink-0 rounded" />
              <div className="shimmer h-6 w-24 rounded" />
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-lg bg-[#18181B] p-4"
                >
                  <div className="shimmer h-5 w-full rounded" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <main className="bg-[#111113] px-4 pt-16 text-[#F3F3F3]">
      <Intro />
      <Connect />
      <Bookmarks />
      <Room />
    </main>
  );
}
