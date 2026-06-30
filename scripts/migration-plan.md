# Piano finale: microCMS → markdown locale

> Inventario contenuti: [`migration-export/works-inventory.json`](migration-export/works-inventory.json)  
> Stato i18n sito: già configurato (`it` default, `en` prefissato, fallback rewrite)

## Obiettivo

Eliminare microCMS dal portfolio. I 14 case study diventano file markdown locali con immagini in repo, serviti via Astro Content Collections. Una sola pagina Astro per route, contenuto scelto per locale (pattern già usato per `projects.json`, `index.json`, ecc.).

## Inventario (recuperato)

| Metrica | Valore |
|---------|--------|
| Case study | 14 |
| Technical | 10 |
| Creative | 4 |
| Con note HTML | 11 |
| Con link esterno | 12 |
| Immagini totali | 50 |

### Slug e portfolio

| Slug | Portfolio | Cliente | Anno | Img |
|------|-----------|---------|------|-----|
| `concorso-capodaglio` | technical | Associazione Culturale Wanda Capodaglio | 2025 | 4 |
| `mad-about-events` | technical | Giulio Maddii | 2022 | 1 |
| `cartelloni-valdarno-v2` | technical | Kipo srl | 2025 | 4 |
| `alta-movie` | technical | Giovanni Raiola, Alta Movie Aerials | 2022 | 6 |
| `arkadia` | technical | Arkadia Onlus | 2024 | 4 |
| `dpg` | technical | Prof.sa Myriam Pettinato | 2023 | 4 |
| `ait-fase-1` | technical | Accademia Italiana del Tartufo | 2022 | 1 |
| `abbicuradite-unigum` | technical | Unigum spa | 2024 | 5 |
| `il-maestro` | technical | Giorgio Butini | 2024 | 3 |
| `showroom-ml-auto` | technical | M&L Auto | 2024 | 3 |
| `pentolino-dell-oste` | creative | Il Pentolino dell'OSte | 2021 | 6 |
| `upkmae` | creative | A. Mini | 2022 | 3 |
| `seth-ep-covers` | creative | Simone Bracci | 2022 | 5 |
| `ascg-logo` | creative | ASCG Service | 2020 | 1 |

Campi disponibili per ogni entry: `title`, `description`, `client`, `start_date`, `status`, `type`, `link`, `notes` (HTML), `coverImage`, `galleryImages`.

**Nota:** `category[]` non è nell'inventario. Derivarlo da `portfolio`: `technical` → "Development", `creative` → "Editorial".

---

## Architettura

```
src/
  content.config.ts
  content/works/
    it/                         ← fase 1 (14 file)
      concorso-capodaglio.md
      ...
    en/                         ← fase 5 (opzionale, fallback en→it)
  assets/works/
    concorso-capodaglio/
      cover.jpg
      01.png, 02.png, ...
  i18n/utils.ts                 ← + getWorksForLocale()
  pages/portfolio/
    [portfolioType]/
      index.astro               ← invariato (portfolio.json)
      [slug].astro              ← nuovo (sostituisce [id]/[slug].astro)
```

### Formato markdown

```yaml
---
title: "Sito del \"Concorso Nazionale Wanda Capodaglio\""
slug: concorso-capodaglio
portfolio: technical
locale: it
client: "Associazione Culturale Wanda Capodaglio"
start_date: 2025-01-01
status: Concluso
type: Sito web
link: https://www.concorsonazionalewandacapodaglio.it/
image: ../../../assets/works/concorso-capodaglio/cover.jpg
gallery:
  - ../../../assets/works/concorso-capodaglio/01.png
notes: |
  <h4>Tech Stack</h4><ul><li>WordPress</li></ul>
---

Corpo = description (testo decodificato da HTML entities).
```

- `notes` resta HTML in frontmatter → `set:html` (come oggi)
- Conversione notes → markdown: fase opzionale successiva

### URL

| Prima | Dopo |
|-------|------|
| `/portfolio/technical/{microcms-id}/{slug}/` | `/portfolio/technical/{slug}/` |
| `/en/portfolio/technical/{microcms-id}/{slug}/` | `/en/portfolio/technical/{slug}/` |

Redirect 301 permanenti per tutti i 28 URL vecchi (14 slug × 2 locale).

---

## Schema Content Collection

File: `src/content.config.ts`

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const works = defineCollection({
  loader: glob({
    base: "./src/content/works",
    pattern: "**/*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      portfolio: z.enum(["technical", "creative"]),
      locale: z.enum(["it", "en"]),
      client: z.string(),
      start_date: z.coerce.date(),
      status: z.string(),
      type: z.string(),
      link: z.url().optional(),
      image: image(),
      gallery: z.array(image()).default([]),
      notes: z.string().optional(),
    }),
});

export const collections = { works };
```

Helper locale in `src/i18n/utils.ts`:

```ts
export function getWorkForLocale<T extends { data: { slug: string; locale: Lang } }>(
  entries: T[],
  slug: string,
  locale: Lang,
): T | undefined {
  const matches = entries.filter((e) => e.data.slug === slug);
  return (
    matches.find((e) => e.data.locale === locale) ??
    matches.find((e) => e.data.locale === defaultLang)
  );
}

export function getWorksForLocale<T extends { data: { locale: Lang; portfolio: string } }>(
  entries: T[],
  locale: Lang,
  portfolio?: string,
): T[] {
  // raggruppa per slug, pick locale con fallback
}
```

---

## Fasi di implementazione

### Fase 0 — Script migrazione dati

**File:** `scripts/migrate-microcms-to-markdown.mjs`

1. Legge `scripts/migration-export/works-inventory.json`
2. Decodifica HTML entities (`&#39;`, `&quot;`, `&amp;`, …)
3. Scarica `coverImage` + `galleryImages` → `src/assets/works/{slug}/`
4. Scrive `src/content/works/it/{slug}.md`
5. Report: file creati, errori download, slug saltati

**Input alternativo (validazione):** export API microCMS con `.env` — opzionale, per cross-check.

### Fase 1 — Content config + tipi

- Creare `src/content.config.ts`
- Aggiornare tipi in `src/lib/types.ts` (`WorkEntry`, sostituisce `Work` da microcms)
- Verificare sync content layer: `astro dev` → `s + enter`

### Fase 2 — Route dettaglio

- Creare `src/pages/portfolio/[portfolioType]/[slug].astro`
- `getStaticPaths`: `getCollection("works")` → filtra `data.locale === Astro.currentLocale` (o genera entrambe le locale con fallback)
- Template: `render(entry)` per body, `entry.data.*` per meta, `Gallery` con `entry.data.gallery`
- Eliminare `src/pages/portfolio/[portfolioType]/[id]/[slug].astro`

### Fase 3 — Componenti lista

| File | Modifica |
|------|----------|
| `src/components/content/WorksList.astro` | `getCollection("works")` + `getWorksForLocale()`; link `localizedUrl(locale, "portfolio/{type}/{slug}")` |
| `src/components/ImmersiveWorks.astro` | idem, limit 6 |
| `src/components/Gallery.astro` | props `ImageMetadata[]` invece di `MicroImage` |
| `src/i18n/ui.ts` | stringhe: readMore, back, client, year, status, type, link, gallery scroll |

### Fase 4 — Redirect SEO

Aggiungere in `astro.config.mjs`:

```js
redirects: {
  "/portfolio/technical/39_zh2td2ob/concorso-capodaglio": "/portfolio/technical/concorso-capodaglio",
  // ... tutti i 14 slug IT
  "/en/portfolio/technical/39_zh2td2ob/concorso-capodaglio": "/en/portfolio/technical/concorso-capodaglio",
  // ... tutti i 14 slug EN
}
```

Oppure `public/_redirects` se deploy su Netlify.

### Fase 5 — Cleanup microCMS

- Eliminare `src/lib/microcms.ts`
- Rimuovere `microcms-js-sdk` da `package.json`
- Rimuovere `MICROCMS_*` da `.env.example`
- Rimuovere `fmzwhatqbs.microcms.io` da `astro.config.mjs` → `image.domains`
- Aggiornare menzione in `src/pages/credits.astro`

### Fase 6 — i18n EN (non bloccante)

- Cartella `src/content/works/en/` con stessi slug
- Fallback `en → it` già attivo in `astro.config.mjs`
- Traduzione manuale case study quando serve

---

## File toccati (checklist)

### Nuovi
- [ ] `scripts/migrate-microcms-to-markdown.mjs`
- [ ] `src/content.config.ts`
- [ ] `src/content/works/it/*.md` (×14)
- [ ] `src/assets/works/**/*` (×50 immagini)
- [ ] `src/pages/portfolio/[portfolioType]/[slug].astro`

### Modificati
- [ ] `src/components/content/WorksList.astro`
- [ ] `src/components/ImmersiveWorks.astro`
- [ ] `src/components/Gallery.astro`
- [ ] `src/i18n/ui.ts`
- [ ] `src/i18n/utils.ts`
- [ ] `src/lib/types.ts`
- [ ] `astro.config.mjs` (redirects, rimuovi domain CDN)
- [ ] `src/pages/credits.astro`

### Eliminati
- [ ] `src/lib/microcms.ts`
- [ ] `src/pages/portfolio/[portfolioType]/[id]/[slug].astro`
- [ ] dipendenza `microcms-js-sdk`

### Invariati
- `src/data/portfolio.json` (meta pagine lista portfolio)
- `src/data/projects.json`, `skills.json`, `index.json` (già i18n)
- `src/data/socials.json`

---

## Verifica finale

- [ ] `npm run build` completa **senza rete** (no chiamate microCMS)
- [ ] 14 pagine `/portfolio/{type}/{slug}` renderizzano correttamente
- [ ] Gallery + lightbox funzionano con immagini locali
- [ ] `/en/portfolio/...` mostra contenuto IT via fallback (finché mancano EN)
- [ ] Redirect 301 da vecchi URL con `{id}`
- [ ] Switch lingua mantiene slug e portfolio type
- [ ] Confronto visivo con produzione attuale (nicc-olo.com)

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| CDN microCMS offline post-migrazione | Scaricare tutte le 50 immagini in Fase 0 |
| HTML entities nei titoli | Decodifica nello script |
| SEO perso su URL con id | Redirect 301 |
| `notes` HTML inconsistente | Mantenere `set:html`; convertire a MD in seguito |
| Build lenta per immagini | `astro:assets` ottimizza a build time |

## Stima effort

| Fase | Effort |
|------|--------|
| 0 Script + download immagini | ~2h |
| 1–2 Content config + route | ~2h |
| 3 Componenti + UI strings | ~1.5h |
| 4 Redirect | ~30min |
| 5 Cleanup | ~30min |
| Verifica | ~1h |
| **Totale** | **~7–8h** |
