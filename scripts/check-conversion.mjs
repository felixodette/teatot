/**
 * Self-check: conversion P0/P1 CMS shape (service slugs + FAQs).
 * Run: node scripts/check-conversion.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function load(name) {
  return JSON.parse(readFileSync(join(root, "framer-local/cms", name), "utf8"));
}

let failed = 0;

const services = load("services.json");
const wantSlugs = [
  "restaurant",
  "conference-events",
  "outside-catering",
  "garden-venue",
  "guest-services",
];
const gotSlugs = services.items.filter((i) => !i._draft).map((i) => i._slug).sort();
if (JSON.stringify(gotSlugs) !== JSON.stringify([...wantSlugs].sort())) {
  console.error("FAIL service slugs:", gotSlugs, "want", wantSlugs);
  failed++;
} else {
  console.log("ok service slugs", gotSlugs.join(", "));
}

const banned = ["garage-parking", "laundry-dry-cleaning", "spa-wellness", "concierge"];
for (const slug of banned) {
  if (services.items.some((i) => i._slug === slug)) {
    console.error(`FAIL legacy slug still present: ${slug}`);
    failed++;
  }
}

const faqs = load("faqs.json");
const liveFaqs = faqs.items.filter((i) => !i._draft);
if (liveFaqs.length !== 4) {
  console.error(`FAIL faqs count ${liveFaqs.length}, want 4`);
  failed++;
} else {
  console.log("ok faqs count 4");
}

const blog = load("blog-posts.json");
const blob = JSON.stringify(blog);
for (const phrase of ["Discover Ol Donyo", "World-class recreation"]) {
  if (blob.includes(phrase)) {
    console.error(`FAIL blog still has cliché: ${phrase}`);
    failed++;
  }
}
console.log("ok blog clichés stripped");

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nall conversion checks passed");
