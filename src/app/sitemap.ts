import type { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabaseClient';

const BASE_URL = 'https://auto-sell.ai';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/how-to-sell-car-fast`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/car-valuation-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/cash-for-damaged-cars`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const brands = [
    'toyota', 'hyundai', 'mitsubishi', 'mazda', 'kia', 'ford',
    'subaru', 'volkswagen', 'bmw', 'mercedes', 'audi', 'honda',
    'nissan', 'holden',
  ];
  const brandPages: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${BASE_URL}/sell-${brand}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const types = [
    'used-cars', 'suvs', 'utes', 'hatchbacks', 'sedans', 'coupes',
    'convertibles', 'people-movers', 'trucks', 'van', 'motorcycle',
  ];
  const typePages: MetadataRoute.Sitemap = types.map((type) => ({
    url: `${BASE_URL}/sell-${type}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const locations = [
    'sydney', 'melbourne', 'brisbane', 'perth', 'adelaide', 'canberra', 'gold-coast',
  ];
  const locationPages: MetadataRoute.Sitemap = locations.map((city) => ({
    url: `${BASE_URL}/sell-my-car-${city}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const valueProps = [
    'immediate-payment', 'on-site-inspections', 'open-7-days', 'smooth-sales-process',
  ];
  const valuePropPages: MetadataRoute.Sitemap = valueProps.map((prop) => ({
    url: `${BASE_URL}/value-propositions/${prop}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  // Dynamic blog posts from Supabase
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at')
    .eq('published', true);

  const blogPages: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at || now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Dynamic CMS pages from Supabase
  const { data: cmsPages } = await supabase
    .from('pages')
    .select('slug, updated_at')
    .eq('published', true);

  const dynamicPages: MetadataRoute.Sitemap = (cmsPages ?? []).map((page) => ({
    url: `${BASE_URL}/${page.slug}`,
    lastModified: page.updated_at || now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...brandPages,
    ...typePages,
    ...locationPages,
    ...valuePropPages,
    ...blogPages,
    ...dynamicPages,
  ];
}
