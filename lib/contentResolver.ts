import data from "@/content/data.json";

export interface PhotoContent {
  src: string | null;
  alt: string;
  caption: string | null;
}

export interface MapContent {
  src?: string | null;
  label: string;
  sublabel: string;
  tag: string;
  mapType: "urban" | "garden";
  caption: string;
}

export interface AudioContent {
  src: string | null;
  title: string;
  caption: string;
}

export interface SocialSectionContent {
  title: string;
  quoteId: string;
  layout: "fullquote" | "centered" | "rightline" | "fullcenter";
}

export interface SymbolismItemContent {
  photoId: string;
  quoteId: string;
  gradient: string;
}

const store = data as Record<string, unknown>;

export function resolveText(id: string): string {
  const val = store[id];
  if (typeof val === "string") return val;
  throw new Error(`[ContentResolver] Expected string for "${id}", got ${typeof val}`);
}

export function resolveWords(id: string): string[] {
  const val = store[id];
  if (Array.isArray(val)) return val as string[];
  throw new Error(`[ContentResolver] Expected string[] for "${id}"`);
}

export const resolveParagraphs = resolveWords;

/** Resolves a quote that may be a single string or an array of strings. */
export function resolveQuoteLines(id: string): string[] {
  const val = store[id];
  if (typeof val === "string") return [val];
  if (Array.isArray(val)) return val as string[];
  throw new Error(`[ContentResolver] Expected string or string[] for "${id}"`);
}

export function resolvePhoto(id: string): PhotoContent {
  const val = store[id];
  if (val && typeof val === "object" && !Array.isArray(val))
    return val as PhotoContent;
  throw new Error(`[ContentResolver] Expected PhotoContent for "${id}"`);
}

export function resolveMap(id: string): MapContent {
  const val = store[id];
  if (val && typeof val === "object" && !Array.isArray(val))
    return val as MapContent;
  throw new Error(`[ContentResolver] Expected MapContent for "${id}"`);
}

export function resolveAudio(id: string): AudioContent {
  const val = store[id];
  if (val && typeof val === "object" && !Array.isArray(val))
    return val as AudioContent;
  throw new Error(`[ContentResolver] Expected AudioContent for "${id}"`);
}

export function resolveNavLabel(sectionId: string): string {
  const labels = store["nav_labels"] as Record<string, string>;
  return labels[sectionId] ?? sectionId;
}

export function resolveSocialSections(): SocialSectionContent[] {
  return store["social_sections"] as SocialSectionContent[];
}

export function resolveSymbolismItems(): SymbolismItemContent[] {
  return store["symbolism_items"] as SymbolismItemContent[];
}

export interface SymbolismBlockContent {
  title: string;
  quoteId: string;
  description: string;
}

export function resolveSymbolismBlocks(): SymbolismBlockContent[] {
  return store["symbolism_blocks"] as SymbolismBlockContent[];
}

export function resolve(id: string): unknown {
  return store[id] ?? null;
}

export const siteTitle       = resolveText("site_title");
export const siteDescription = resolveText("site_description");
