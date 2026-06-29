# Guida allo stile del sito

In breve: **diretto, scherzoso, colorato, handcrafted, punk, leggero, accessibile**.

Il sito parla in prima persona, con tono informale ma competente. L'estetica mescola un fondo caldo e carta con accenti neon; i bordi irregolari e le rotazioni leggere danno un feeling fatto a mano, senza rinunciare a leggibilità e a11y.

---

## Colori

Tema: **caldo + neon**. Due assi cromatici distinti per i due mondi del portfolio.

| Token | Hex | Uso |
|---|---|---|
| **Primario** (`foreground`) | `#18181b` | Testo principale, sfondi scuri, header/footer invertiti |
| **Secondario** (`background`) | `#eee2cb` | Sfondo pagina, base calda |
| **Alternativo — Technical** | `#fba0fa` | Portfolio dev, badge tech, card competenze |
| **Alternativo — Creative** | `#fb8c00` | Portfolio creativo, badge creative, card competenze |
| **Accento** (`accent`) | `#e9e017` | Sezioni evidenziate, hover focus, footer bar |

Varianti utili:

| Token | Hex | Uso |
|---|---|---|
| `technical-light` | `#ffbcfe` | — |
| `technical-dark` | `#fa88f9` | Stato focus sui blocchi technical |
| `creative-light` | `#fbb45c` | — |
| `creative-dark` | `#e27e00` | Stato focus sui blocchi creative |
| `accent-dark` | `#605C04` | Testo su sfondo accent (footer) |

### Superfici e testo

| Ruolo | Token | Hex | Note |
|---|---|---|---|
| Sfondo | `background` | `#eee2cb` | Default body |
| Sfondo chiaro | `midground` | `#f7f6df` | Callout CTA, linee decorative su sfondo scuro |
| Sfondo scuro | `foreground` | `#18181b` | Sezioni invertite (`text-background`) |
| Testo | `foreground` | `#18181b` | Su sfondo chiaro |
| Testo invertito | `background` | `#eee2cb` | Su sfondo scuro |
| Sfondo callout | `accent` | `#e9e017` | Sezioni “who am I”, footer bar |
| Testo callout | `accent-dark` | `#605C04` | Su sfondo accent |
| Overlay semitrasparente | `white/50` | — | Box introduttivi a mano (es. “Mi presento”) |

**Combinazioni tipiche**

- Sezione chiara: `bg-background text-foreground`
- Sezione scura: `bg-foreground text-background`
- Highlight: `bg-accent` + testo scuro
- Card technical: `bg-technical text-foreground`
- Card creative: `bg-creative text-foreground`

---

## Tipografia

### Font

| Ruolo | Famiglia | Classe / note |
|---|---|---|
| Display / titoli | **Clash Display** (Fontshare) | Default `html`, peso `extrabold` o `light` |
| Corpo “a mano” | **NISCRIPT** (font custom) | `.font-cursive` — +65% rispetto al corpo |
| Monospace | stack system (`Menlo`, `Courier New`…) | `code`, toggle accessibilità |
| Corpo | eredita da Clash Display | `line-height: 135%` |

### Gerarchia

| Livello | Stile tipico |
|---|---|
| Hero / H1 | `uppercase font-extrabold leading-none`, `clamp(3rem, 12cqw, 6rem)` |
| Sezione / H2 | `uppercase font-extrabold text-4xl md:text-6xl` |
| Sottosezione / H3 | `uppercase font-extrabold text-3xl md:text-5xl` |
| Card / H4 | `uppercase font-bold text-2xl` |
| Corpo narrativo | `.font-cursive text-lg text-balance` |
| Label / badge | `uppercase font-bold text-xs`, `rounded-md p-1` |
| Microcopy | `text-sm`, `text-xs` |

### Regole tipografiche

- Titoli e CTA: **sempre uppercase**.
- Parole chiave nei titoli: `<strong>` con peso maggiore.
- Termini inglesi: `<span lang="en">` dove serve.
- `<b>` mappa a `font-weight: 600` (non 700).
- Link nel corpo (`p > a`, `li > a`): sottolineati; **hover toglie** la sottolineatura.
- Titoli grandi: `leading-none`, `text-pretty` o `text-balance` per andare a capo bene.

---

## Pattern

### Bordi irregolari (clip-path)

Il look “handcrafted” nasce da bordi tagliati a mano:

- **`clip01`** — sezioni ampie (SVG `#containerClip01`)
- **`clip02`** — card portfolio grandi (SVG `#containerClip02`)
- **`clip03`** — pulsanti portfolio, card, sezioni media (polygon CSS)
- **`generateRuggedRectangle()`** — bordi generati proceduralmente (certificazioni, gallery); seed fisso per riproducibilità

Preferire clip-path a `border-radius` per contenitori principali.

### Rotazioni e skew

Usare con parsimonia, sempre leggeri:

- Card/certificati: `rotate-2` / `-rotate-2` alternati
- CTA lavoro: `-rotate-2`, hover `rotate-2`
- Pulsanti portfolio: `skew-y-1` / `-skew-y-1`, hover `±rotate-2`
- Annotazioni: `.font-cursive -rotate-6`

### Animazioni

- **GSAP + ScrollTrigger**: reveal al scroll su `.gsap-split-word`, `.gsap-split-line`, `.gsap-split-char`
- **Hover**: `scale-y-110` (header), `scale-125` (immagini portfolio), `hover:-translate-y-1 hover:-rotate-3` (social)
- **Transizioni**: `ease-out`, durate brevi (`duration-75`–`duration-150`)
- **`prefers-reduced-motion: reduce`**: animazioni disabilitate

### Elementi decorativi

- **FollowTheLine**: linea SVG disegnata a mano, animata con stroke-dashoffset
- **Checkerboard**: pattern bianco/nero nel footer (`repeating-linear-gradient`)
- **Frecce SVG**: annotazioni disegnate, `aria-hidden="true"`
- **Illustrazioni PNG**: personaggi stilizzati sovrapposti ai blocchi colorati

### Layout

- Container testo: `max-w-3xl` / `max-w-4xl` / `max-w-5xl` / `max-w-6xl`
- Sezioni: `px-4 py-24` (padding generoso)
- Griglie responsive: `flex-col` → `md:flex-row`, `grid-cols-2` → `md:grid-cols-3`
- Breakpoint custom: `xs: 490px`

### Componenti ricorrenti

| Componente | Pattern |
|---|---|
| Header nav | Bottoni con `border-b-2 border-x-2`, `min-h-11`, hover `scale-y-110` |
| Portfolio buttons | `border-8`, colore pieno, `clip03`, hover rotazione |
| Card competenze | Colore di categoria + `clip03`, icona grande, titolo uppercase + corpo cursive |
| Testimonial | Foto `rounded-full`, layout alternato, separatore SVG ondulato |
| Footer | Logo SVG, social con `mix-blend-multiply`, checkerboard, barra `bg-accent` |
| Cookie banner | `bg-foreground text-background`, unico elemento con `border-radius: 0.5rem` |

---

## Voce e tono

- Prima persona singolare, diretta (“Ciao! Se sei qui…”).
- Umorismo leggero e autoironico, mai forzato.
- Censura soft con `<attr title="…">` per parole colorite.
- CTA chiare e informali (“contattami”, “continua a scrollare”).
- Emoji occasionali, solo dove aggiungono personalità (es. cookie 🍪).

---

## Accessibilità

- Target touch minimo: `min-h-11` (44px) su controlli header.
- Focus visibile: `focus:border-accent` sui bottoni header.
- Toggle leggibilità: sostituisce NISCRIPT con monospace (persiste in `localStorage`).
- Menu: focus trap, chiusura con `Escape`, `aria-hidden` / `role="dialog"`.
- Immagini: `alt` descrittivi; decorative con `alt=""`.
- Motion: rispetto di `prefers-reduced-motion`.
- Link esterni: `rel="noopener"`, `target="_blank"`, titolo descrittivo.
- Testi animati GSAP: nascosti fino all'animazione (`visibility: hidden`).

---

## REGOLE

- **No bordi sugli elementi** — unica eccezione: **pulsanti** (header, menu, portfolio, cookie).
- **No border-radius** sui contenitori principali — usa clip-path irregolari. Eccezioni: badge (`rounded-md`), foto profilo (`rounded-full`), cookie banner.
- **Due soli colori di categoria**: technical (rosa) e creative (arancio). L'accent giallo è per highlight, non per categorizzare.
- **Titoli = uppercase**. Corpo narrativo = `.font-cursive`.
- **Mai mescolare troppi effetti** sullo stesso elemento (rotazione + skew + scale insieme solo sui CTA principali).
- **Contrasto**: su sfondo scuro usare `text-background`; su accent usare `text-accent-dark`.
- **Link nel testo**: underline default, none on hover — non invertire.
- **Illustrazioni**: stile punk/hand-drawn, colori saturi, sovrapposte con `absolute` e `pointer-events-none`.

---

## Stack tecnico (riferimento)

- **Astro** + **Tailwind CSS v4** (`@theme` in `global.css`)
- **GSAP** (SplitText, ScrollTrigger)
- **Fontshare**: Clash Display
- **Font custom**: NISCRIPT (`/assets/fonts/`)
