import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Array<{
    path: string;
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/", changeFrequency: "weekly" },
    { path: "/about", changeFrequency: "monthly" },
    { path: "/contact", changeFrequency: "monthly" },
    { path: "/login", changeFrequency: "monthly" },
  ];

  return routes.map(({ path, changeFrequency }) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified,
    changeFrequency,
  }));
}
