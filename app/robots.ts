import { BASE_URL } from "@/constants";
import type { MetadataRoute } from "next";

/**
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/static/chunks/", "/api/"],
    },
    sitemap: BASE_URL + "/sitemap.xml",
    host: BASE_URL,
  };
}
