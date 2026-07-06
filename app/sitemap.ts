import type { MetadataRoute } from "next";
import { getRooms } from "@/lib/data";
import { getBlogPosts } from "@/lib/data";
import { getLegalPages } from "@/lib/data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://teatot.co.ke";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/rooms`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/dining`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const roomPages: MetadataRoute.Sitemap = getRooms().map((r) => ({
    url: `${BASE}/rooms/${r.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = getBlogPosts().map((p) => ({
    url: `${BASE}/blog-posts/${p.slug}`,
    lastModified: new Date(p.publishedDate),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const legalPages: MetadataRoute.Sitemap = getLegalPages().map((p) => ({
    url: `${BASE}/legal-page/${p.slug}`,
    lastModified: new Date(p.lastUpdate),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...staticPages, ...roomPages, ...blogPages, ...legalPages];
}
