import type {
  Room, Service, GalleryItem, DiningMenuItem,
  Testimonial, Faq, TeamMember, BlogPost, LegalPage,
} from "@/types/cms";
import {
  normalizeRooms, normalizeServices, normalizeGallery,
  normalizeDiningMenu, normalizeTestimonials, normalizeFaqs,
  normalizeTeam, normalizeBlogPosts, normalizeLegalPages,
} from "@/lib/normalize";
import roomsData from "@/framer-local/cms/rooms.json";
import servicesData from "@/framer-local/cms/services.json";
import galleryData from "@/framer-local/cms/gallery.json";
import diningMenuData from "@/framer-local/cms/dining-menu.json";
import testimonialsData from "@/framer-local/cms/testimonials.json";
import faqsData from "@/framer-local/cms/faqs.json";
import teamData from "@/framer-local/cms/team.json";
import blogPostsData from "@/framer-local/cms/blog-posts.json";
import legalPageData from "@/framer-local/cms/legal-page.json";

export function getRooms(): Room[] {
  return normalizeRooms(roomsData);
}

export function getRoomBySlug(slug: string): Room | undefined {
  return getRooms().find((r) => r.slug === slug);
}

export function getFeaturedRooms(): Room[] {
  return getRooms().filter((r) => r.featured);
}

export function getServices(): Service[] {
  return normalizeServices(servicesData);
}

export function getGallery(): GalleryItem[] {
  return normalizeGallery(galleryData)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getDiningMenu(): DiningMenuItem[] {
  return normalizeDiningMenu(diningMenuData);
}

export function getDiningMenuByCategory(category: string): DiningMenuItem[] {
  return getDiningMenu().filter((d) => d.category === category);
}

export function getTestimonials(): Testimonial[] {
  return normalizeTestimonials(testimonialsData);
}

export function getFaqs(): Faq[] {
  return normalizeFaqs(faqsData)
    .sort((a, b) => a.sort - b.sort);
}

export function getTeam(): TeamMember[] {
  return normalizeTeam(teamData)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getBlogPosts(): BlogPost[] {
  return normalizeBlogPosts(blogPostsData)
    .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

export function getLegalPages(): LegalPage[] {
  return normalizeLegalPages(legalPageData);
}

export function getLegalPageBySlug(slug: string): LegalPage | undefined {
  return getLegalPages().find((p) => p.slug === slug);
}
