import { AppImage } from "@/components/app-image";
import { ToolItem } from "@/types";
import {
  Gamepad2,
  Headphones,
  Laptop,
  Monitor,
  Smartphone,
  Sofa,
  Watch,
} from "lucide-react";

export default function AboutPage() {
  const socialLinks = [
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
    {
      name: "YouTube",
      url: "https://youtube.com/@iamk3nnyt",
      icon: "https://www.google.com/s2/favicons?domain=youtube.com&sz=64",
    },
    {
      name: "Indiehackers",
      url: "https://www.indiehackers.com/ktranish",
      icon: "https://www.google.com/s2/favicons?domain=indiehackers.com&sz=64",
    },
    {
      name: "Upwork",
      url: "https://www.upwork.com/freelancers/~019a5657f93b409619",
      icon: "https://www.google.com/s2/favicons?domain=upwork.com&sz=64",
    },
    {
      name: "Fiverr",
      url: "https://www.fiverr.com/ktra99",
      icon: "https://www.google.com/s2/favicons?domain=fiverr.com&sz=64",
    },
  ];

  const tools: ToolItem[] = [];

  const roomSetup = {
    peripherals: {
      icon: Headphones,
      items: [
        "Razer Basilisk V3",
        "Razer Mouse Pad Goliathus Extended Chroma",
        "Razer Cynosa V2",
        "Logitech Brio 100",
        "Andersson Model ORH-C3000 Headset",
      ],
    },
    computers: {
      icon: Laptop,
      items: ["Ideapad Pro 5 (AMD Ryzen 7)", "Desire2 Laptop Stand"],
    },
    display: {
      icon: Monitor,
      items: ['LG UltraGear 34GP63AP-B 34" 3440 x 1440 (UltraWide) HDMI 160Hz'],
    },
    audio: {
      icon: Headphones,
      items: ["Jabra Elite Speaker"],
    },
    mobile: {
      icon: Smartphone,
      items: ["iPhone 15", "Samsung Wireless Charger Trio"],
    },
    gaming: {
      icon: Gamepad2,
      items: ["Nintendo Switch"],
    },
    furniture: {
      icon: Sofa,
      items: [
        "Mittzon Skrivbord 160x80",
        "Snarum RBN 120x200 Medium Fast/Beige",
        "2x Aloe Vera Konstväxt, 17 cm",
      ],
    },
    wearables: {
      icon: Watch,
      items: ["Fitbit Inspire 3"],
    },
  };

  return (
    <main className="bg-[#111113] px-4 pt-16 text-[#F3F3F3]">
      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">Biography</h2>
        <p className="mb-8 text-[#B0B0B0]">
          I'm Kenny, a full stack developer, designer, and founder passionate
          about building beautiful, performant web experiences. I love working
          at the intersection of design and engineering, and I'm always
          exploring new technologies and creative projects.
        </p>
      </section>

      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-4 text-xl font-semibold text-white">Connect</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
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
      </section>

      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">Bookmarks</h2>
        {tools.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
            <div className="mb-4 text-4xl">🔖</div>
            <h3 className="mb-2 text-lg font-medium text-white">
              No Bookmarks Saved
            </h3>
            <p className="text-sm text-[#B0B0B0]">
              My collection of useful tools and resources hasn't been curated
              yet. I'll share my favorite tools, articles, and resources here,
              with each bookmark bringing value to my workflow.
            </p>
          </div>
        ) : (
          <ul className="mb-8 divide-y divide-[#232326]">
            {tools.map((item) => (
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

      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">Room Setup</h2>
        <p className="mb-8 text-[#B0B0B0]">
          My workspace is carefully curated with high-quality peripherals and
          equipment to ensure optimal productivity and comfort. Here's a
          detailed breakdown of my setup.
        </p>
        <div className="space-y-8">
          {Object.entries(roomSetup).map(
            ([category, { icon: Icon, items }]) => (
              <div key={category}>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-medium text-white capitalize">
                  <Icon className="h-5 w-5" />
                  {category}
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 rounded-lg bg-[#18181B] p-4 transition-colors hover:bg-[#232326]"
                    >
                      <span className="text-sm text-[#B0B0B0]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>
      </section>
    </main>
  );
}
