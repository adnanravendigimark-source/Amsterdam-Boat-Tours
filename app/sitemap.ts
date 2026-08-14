import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPosts } from "@/lib/posts";
import { getHomepageContent } from "@/lib/homepage";
import { getPrivacyPolicy } from "@/lib/legal";
import { getBlogSeoSettings } from "@/lib/settings";
import { getAboutPage } from "@/lib/about";
import { getContactPage } from "@/lib/contact";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, homepage, privacyPolicy, blogSeo, about, contact] = await Promise.all([
    getPosts(),
    getHomepageContent(),
    getPrivacyPolicy(),
    getBlogSeoSettings(),
    getAboutPage(),
    getContactPage(),
  ]);

  const staticPageCandidates: Array<MetadataRoute.Sitemap[number] & { noIndex: boolean }> = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
      noIndex: homepage.noIndex,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      noIndex: about.noIndex,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      noIndex: blogSeo.noIndex,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
      noIndex: contact.noIndex,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
      noIndex: privacyPolicy.noIndex,
    },
  ];

  const staticPages: MetadataRoute.Sitemap = staticPageCandidates
    .filter((page) => !page.noIndex)
    .map(({ noIndex, ...page }) => page);

  const postPages: MetadataRoute.Sitemap = posts
    .filter((post) => !post.noIndex)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.date),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  return [...staticPages, ...postPages];
}
