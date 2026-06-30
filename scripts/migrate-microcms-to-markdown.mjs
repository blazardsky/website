#!/usr/bin/env node
/**
 * Migrates portfolio works from works-inventory.json to local markdown + assets.
 * Usage: node scripts/migrate-microcms-to-markdown.mjs
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INVENTORY_PATH = path.join(
  ROOT,
  "scripts/migration-export/works-inventory.json",
);
const CONTENT_DIR = path.join(ROOT, "src/content/works/it");
const ASSETS_DIR = path.join(ROOT, "src/assets/works");

function decodeHtmlEntities(str) {
  if (!str) return str;
  return str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(Number(num)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    );
}

function yamlString(value) {
  return JSON.stringify(value);
}

function getExtension(url) {
  const pathname = new URL(url).pathname;
  const ext = path.extname(pathname).toLowerCase();
  return ext || ".jpg";
}

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(destPath), { recursive: true });
  await fs.writeFile(destPath, buffer);
  return destPath;
}

function assetPath(slug, filename) {
  return `../../../assets/works/${slug}/${filename}`;
}

function buildFrontmatter(work, coverFile, galleryFiles) {
  const lines = [
    "---",
    `title: ${yamlString(decodeHtmlEntities(work.title))}`,
    `slug: ${work.slug}`,
    `portfolio: ${work.portfolio}`,
    `locale: it`,
    `client: ${yamlString(decodeHtmlEntities(work.client))}`,
    `start_date: ${work.start_date}`,
    `status: ${yamlString(work.status)}`,
    `type: ${yamlString(work.type)}`,
  ];

  if (work.link) {
    lines.push(`link: ${work.link}`);
  }

  lines.push(`image: ${assetPath(work.slug, coverFile)}`);

  if (galleryFiles.length > 0) {
    lines.push("gallery:");
    for (const file of galleryFiles) {
      lines.push(`  - ${assetPath(work.slug, file)}`);
    }
  } else {
    lines.push("gallery: []");
  }

  if (work.notes) {
    lines.push("notes: |");
    for (const line of work.notes.split("\n")) {
      lines.push(`  ${line}`);
    }
  }

  lines.push("---");
  return lines.join("\n");
}

async function migrateWork(work, report) {
  const slugDir = path.join(ASSETS_DIR, work.slug);
  await fs.mkdir(slugDir, { recursive: true });

  const coverExt = getExtension(work.coverImage);
  const coverFile = `cover${coverExt}`;
  const coverPath = path.join(slugDir, coverFile);

  try {
    await downloadImage(work.coverImage, coverPath);
    report.imagesDownloaded++;
  } catch (err) {
    report.errors.push({ slug: work.slug, file: coverFile, error: err.message });
    return null;
  }

  const galleryFiles = [];
  for (let i = 0; i < work.galleryImages.length; i++) {
    const url = work.galleryImages[i];
    const ext = getExtension(url);
    const filename = `${String(i + 1).padStart(2, "0")}${ext}`;
    const filePath = path.join(slugDir, filename);
    try {
      await downloadImage(url, filePath);
      galleryFiles.push(filename);
      report.imagesDownloaded++;
    } catch (err) {
      report.errors.push({ slug: work.slug, file: filename, error: err.message });
    }
  }

  const description = decodeHtmlEntities(work.description);
  const frontmatter = buildFrontmatter(work, coverFile, galleryFiles);
  const markdown = `${frontmatter}\n\n${description}\n`;

  const mdPath = path.join(CONTENT_DIR, `${work.slug}.md`);
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(mdPath, markdown, "utf8");
  report.markdownCreated++;

  return {
    id: work.id,
    slug: work.slug,
    portfolio: work.portfolio,
  };
}

async function main() {
  const inventory = JSON.parse(await fs.readFile(INVENTORY_PATH, "utf8"));
  const report = {
    markdownCreated: 0,
    imagesDownloaded: 0,
    errors: [],
    redirects: [],
  };

  console.log(`Migrating ${inventory.length} works from inventory...\n`);

  for (const work of inventory) {
    const redirect = await migrateWork(work, report);
    if (redirect) {
      report.redirects.push(redirect);
      console.log(`  ✓ ${work.slug}`);
    } else {
      console.log(`  ✗ ${work.slug} (skipped)`);
    }
  }

  console.log("\n--- Migration Report ---");
  console.log(`Markdown files: ${report.markdownCreated}/${inventory.length}`);
  console.log(`Images downloaded: ${report.imagesDownloaded}`);
  if (report.errors.length > 0) {
    console.log(`Errors: ${report.errors.length}`);
    for (const err of report.errors) {
      console.log(`  - ${err.slug}/${err.file}: ${err.error}`);
    }
  }

  console.log("\n--- Redirect Map (for astro.config.mjs) ---");
  for (const { id, slug, portfolio } of report.redirects) {
    console.log(
      `"/portfolio/${portfolio}/${id}/${slug}": "/portfolio/${portfolio}/${slug}",`,
    );
    console.log(
      `"/en/portfolio/${portfolio}/${id}/${slug}": "/en/portfolio/${portfolio}/${slug}",`,
    );
  }

  const redirectPath = path.join(
    ROOT,
    "scripts/migration-export/redirect-map.json",
  );
  await fs.writeFile(
    redirectPath,
    JSON.stringify(report.redirects, null, 2),
    "utf8",
  );
  console.log(`\nRedirect map saved to ${redirectPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
