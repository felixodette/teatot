import type {
  CmsImage, Room, Service, GalleryItem, DiningMenuItem,
  Testimonial, Faq, TeamMember, BlogPost, LegalPage,
} from "@/types/cms";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const urlRewriteMap: Record<string, string> = require("@/migration/url-rewrite-map.json");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RawItem = Record<string, any>;

function str(item: RawItem, field: string, fallback = ""): string {
  return item[field]?.value ?? fallback;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function num(item: RawItem, field: string, fallback = 0): number {
  return item[field]?.value ?? fallback;
}

function bool(item: RawItem, field: string): boolean {
  return item[field]?.value === true;
}

function img(item: RawItem, field: string): CmsImage {
  const v = item[field]?.value;
  const originalUrl: string = v?.url ?? "";
  const localUrl = urlRewriteMap[originalUrl] ?? originalUrl;
  return {
    url: localUrl,
    alt: v?.altText ?? "",
    thumbnailUrl: localUrl,
  };
}

function published(raw: { items?: RawItem[] }): RawItem[] {
  return (raw?.items ?? []).filter((i) => i._draft !== true);
}

export function normalizeRooms(raw: { items?: RawItem[] }): Room[] {
  return published(raw).map((i) => ({
    slug: i._slug,
    name: str(i, "Name"),
    category: str(i, "Category"),
    shortDescription: str(i, "Short Descriotion"),
    fullDescription: str(i, "Full Description"),
    currency: str(i, "Currency"),
    pricePerNight: num(i, "Price Per Night"),
    maxGuests: num(i, "Max Guests"),
    roomSize: num(i, "Room Size"),
    bedType: str(i, "Bed Type"),
    amenities: str(i, "Amenities"),
    featured: bool(i, "Featured"),
    thumbnail: img(i, "Thumbnail"),
  }));
}

export function normalizeServices(raw: { items?: RawItem[] }): Service[] {
  return published(raw).map((i) => ({
    slug: i._slug,
    number: str(i, "Number"),
    image: img(i, "Image"),
    name: str(i, "Name"),
    shortDescription: stripHtml(str(i, "Short Descrription")),
    fullDescription: str(i, "Full Description"),
    category: str(i, "Category"),
  }));
}

export function normalizeGallery(raw: { items?: RawItem[] }): GalleryItem[] {
  return published(raw).map((i) => ({
    slug: i._slug,
    caption: str(i, "Caption"),
    content: str(i, "Content"),
    category: str(i, "Category"),
    sortOrder: num(i, "Sort Order"),
    image: img(i, "Image"),
  }));
}

export function normalizeDiningMenu(raw: { items?: RawItem[] }): DiningMenuItem[] {
  return published(raw).map((i) => ({
    slug: i._slug,
    itemName: str(i, "Item Name"),
    description: str(i, "Description"),
    currency: str(i, "Currency"),
    price: num(i, "Price"),
    category: str(i, "Category"),
    featured: bool(i, "Featured"),
  }));
}

export function normalizeTestimonials(raw: { items?: RawItem[] }): Testimonial[] {
  return published(raw).map((i) => ({
    slug: i._slug,
    guestName: str(i, "Guest Name"),
    location: str(i, "Location"),
    quote: str(i, "Quote"),
    date: str(i, "Date"),
    roomStayed: str(i, "Room Stayed"),
  }));
}

export function normalizeFaqs(raw: { items?: RawItem[] }): Faq[] {
  return published(raw).map((i) => ({
    slug: i._slug,
    question: str(i, "Question"),
    answer: str(i, "Answer"),
    category: str(i, "Category"),
    sort: num(i, "Sort"),
  }));
}

export function normalizeTeam(raw: { items?: RawItem[] }): TeamMember[] {
  return published(raw).map((i) => ({
    slug: i._slug,
    name: str(i, "Name"),
    role: str(i, "Role"),
    bio: str(i, "Bio"),
    sortOrder: num(i, "Sort Order"),
    photo: img(i, "Photo"),
  }));
}

export function normalizeBlogPosts(raw: { items?: RawItem[] }): BlogPost[] {
  return published(raw).map((i) => ({
    slug: i._slug,
    title: str(i, "Title"),
    excerpt: str(i, "Excerpt"),
    body: str(i, "Body"),
    author: str(i, "Author"),
    publishedDate: str(i, "Published Date"),
    tag: str(i, "Tag"),
    coverImage: img(i, "Cover Image"),
  }));
}

export function normalizeLegalPages(raw: { items?: RawItem[] }): LegalPage[] {
  return published(raw).map((i) => ({
    slug: i._slug,
    title: str(i, "Title"),
    body: str(i, "Body"),
    lastUpdate: str(i, "Last Update"),
  }));
}
