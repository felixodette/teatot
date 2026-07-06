export interface CmsImage {
  url: string;
  alt: string;
  thumbnailUrl: string;
}

export interface Room {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  currency: string;
  pricePerNight: number;
  maxGuests: number;
  roomSize: number;
  bedType: string;
  amenities: string;
  featured: boolean;
  thumbnail: CmsImage;
}

export interface Service {
  slug: string;
  number: string;
  image: CmsImage;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
}

export interface GalleryItem {
  slug: string;
  caption: string;
  content: string;
  category: string;
  sortOrder: number;
  image: CmsImage;
}

export interface DiningMenuItem {
  slug: string;
  itemName: string;
  description: string;
  currency: string;
  price: number;
  category: string;
  featured: boolean;
}

export interface Testimonial {
  slug: string;
  guestName: string;
  location: string;
  quote: string;
  date: string;
  roomStayed: string;
}

export interface Faq {
  slug: string;
  question: string;
  answer: string;
  category: string;
  sort: number;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  sortOrder: number;
  photo: CmsImage;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  publishedDate: string;
  tag: string;
  coverImage: CmsImage;
}

export interface LegalPage {
  slug: string;
  title: string;
  body: string;
  lastUpdate: string;
}
