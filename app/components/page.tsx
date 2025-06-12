import { BASE_URL } from "@/constants";
import type { Metadata } from "next";
import { ErrorShowcase } from "./components/error-showcase";
import { NotFoundShowcase } from "./components/not-found-showcase";

export const metadata: Metadata = {
  title: "Components - Kenny Tran's Component Library",
  description:
    "Explore my collection of reusable UI components, from navigation and stats displays to error handling and galleries. Each component is designed with clean aesthetics and modern functionality.",
  openGraph: {
    title: "Components - Kenny Tran's Component Library",
    description:
      "Explore my collection of reusable UI components, from navigation and stats displays to error handling and galleries. Each component is designed with clean aesthetics and modern functionality.",
    url: "/components",
    type: "website",
    images: [
      {
        url: "/components.png",
        width: 1200,
        height: 630,
        alt: "Kenny Tran's Component Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Components - Kenny Tran's Component Library",
    description:
      "Explore my collection of reusable UI components, from navigation and stats displays to error handling and galleries. Each component is designed with clean aesthetics and modern functionality.",
    images: ["/components.png"],
    creator: "@itsk3nny_",
  },
  alternates: {
    canonical: "/components",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Components - Kenny Tran's Component Library",
      description:
        "Explore my collection of reusable UI components, from navigation and stats displays to error handling and galleries. Each component is designed with clean aesthetics and modern functionality.",
      url: BASE_URL + "/components",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [],
      },
      author: {
        "@type": "Person",
        name: "Kenny Tran",
        url: BASE_URL + "/about",
      },
      publisher: {
        "@type": "Person",
        name: "Kenny Tran",
        url: BASE_URL + "/about",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": BASE_URL + "/components",
      },
    }),
  },
};

export default function ComponentsPage() {
  return (
    <>
      <main className="bg-[#111113] px-4 pt-16 text-[#F3F3F3]">
        <section className="mx-auto mb-16 max-w-2xl">
          <h1 className="mb-6 text-xl font-semibold text-white">
            Component Library
          </h1>
          <p className="mb-8 text-[#B0B0B0]">
            A collection of reusable components used throughout kennyt.me. Each
            component is designed to be modular, accessible, and follows our
            design system. Feel free to explore, test, and copy the code for
            your own projects.
          </p>
        </section>

        <section className="mx-auto mb-16 max-w-2xl">
          <h2 className="mb-6 text-xl font-semibold text-white">
            UI Components
          </h2>
          <div className="flex flex-col gap-y-6">
            <ErrorShowcase />
            <NotFoundShowcase />
          </div>
        </section>
      </main>
    </>
  );
}
