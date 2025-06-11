import { AppImage } from "@/components/app-image";
import { cn } from "@/lib/utils";

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

function Timeline() {
  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Work Timeline</h2>
      <ol className="relative border-l border-[#232326]">
        {[...Array(3)].map((_, idx) => (
          <li key={idx} className="mb-10 ml-4">
            <div className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full border-2 border-[#232326] bg-[#232326]" />
            <div className="mb-1">
              <div className="shimmer h-6 w-48 rounded" />
            </div>
            <div className="mb-2">
              <div className="shimmer h-4 w-32 rounded" />
            </div>
            <div className="mb-2">
              <div className="shimmer h-4 w-full rounded" />
              <div className="shimmer mt-2 h-4 w-2/3 rounded" />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Featured() {
  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Featured articles
      </h2>
      <div className="divide-y divide-[#232326]">
        {[...Array(3)].map((_, index) => (
          <article key={index} className={cn(index ? "py-6" : "pb-6")}>
            <div className="mb-1">
              <div className="shimmer h-8 w-3/4 rounded" />
            </div>
            <div className="mb-2">
              <div className="shimmer h-4 w-24 rounded" />
            </div>
            <div className="mb-2">
              <div className="shimmer h-4 w-full rounded" />
              <div className="shimmer mt-2 h-4 w-2/3 rounded" />
            </div>
            <div className="shimmer h-4 w-20 rounded" />
          </article>
        ))}
      </div>
    </section>
  );
}

function Techstack() {
  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Tech stack</h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[...Array(8)].map((_, i) => (
          <li key={i} className="rounded-lg bg-[#18181B] p-4">
            <div className="shimmer mb-1 h-4 w-16 rounded" />
            <div className="shimmer h-6 w-24 rounded" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Loading() {
  return (
    <main className="bg-[#111113] px-4 pt-16 text-[#F3F3F3]">
      <Gallery />
      <Timeline />
      <Featured />
      <Techstack />
    </main>
  );
}
