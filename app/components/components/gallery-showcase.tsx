import { AppImage } from "@/components/app-image";
import { ComponentShowcase } from "@/components/component-showcase";

export function GalleryShowcase() {
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
    <ComponentShowcase
      title="Gallery"
      description="A responsive photo gallery component that displays images in a grid layout with hover effects."
      demo={
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery.map((img, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-xl bg-[#18181B]"
              >
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
        </div>
      }
      code={`import { AppImage } from "@/components/app-image";

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
}`}
    />
  );
}
