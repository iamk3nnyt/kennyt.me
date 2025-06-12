import { ComponentShowcase } from "@/components/component-showcase";
import {
  Gamepad2,
  Headphones,
  Laptop,
  Monitor,
  Smartphone,
  Sofa,
  Watch,
} from "lucide-react";

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

export function RoomShowcase() {
  const categories = {
    peripherals: [
      { name: "Logitech MX Master 3S" },
      { name: "Keychron K8 Pro" },
    ],
    computers: [{ name: "MacBook Pro 16" }, { name: "Custom PC Build" }],
    display: [{ name: "LG UltraGear 27GP950" }, { name: "Dell U2723QE" }],
    audio: [{ name: "AirPods Pro 2" }, { name: "Sony WH-1000XM5" }],
  };

  return (
    <ComponentShowcase
      title="Room Setup"
      description="A collection of high-quality peripherals and equipment that make up my productive workspace."
      demo={
        <div className="space-y-8 sm:p-4">
          {(Object.entries(categories) as [string, { name: string }[]][]).map(
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
                    {items.map((item) => (
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
      }
      code={`async function Room() {
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
        equipment to ensure optimal productivity and comfort. Here's a
        detailed breakdown of my setup.
      </p>
      {Object.keys(categories).length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
          <div className="mb-4 text-4xl">🏠</div>
          <h3 className="mb-2 text-lg font-medium text-white">
            No Room Setup Added
          </h3>
          <p className="text-sm text-[#B0B0B0]">
            My room setup hasn't been added yet. I'll share my
            workspace details here, including the equipment, peripherals, and
            furniture that make up my productive environment.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {(Object.entries(categories) as [string, RoomItem[]][]).map(
            ([category, items]) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <div key={category}>
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-medium text-white capitalize">
                    <Icon className="h-5 w-5" />
                    {category}
                  </h3>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {items.map((item) => (
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
}`}
    />
  );
}
