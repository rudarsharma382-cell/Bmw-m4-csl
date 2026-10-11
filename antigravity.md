# ANTIGRAVITY.md — Master Brief for the BMW M4 CSL 3D Website

> Read this file fully BEFORE writing any code. Re-read the BANNED list and the DEFINITION OF DONE before you say the work is finished.
> This site must look like it was designed by a senior automotive designer and built by a senior creative developer. Not generated. Not templated. If any part of it looks like "AI made this", it is wrong and must be redone.

---

## 0. THE PROJECT

- **Subject:** BMW M4 CSL (G82). A track-focused, limited-run, lightweight M car.
- **Type:** Single-page cinematic 3D / scroll-driven website, desktop and mobile.
- **Source material:** Video clips of the car generated in Google Flow (in the project's `/assets/video` folder). These are the visual foundation. Do not replace them with stock photos or random renders.
- **Feeling:** Precision, weight-saving, aggression, silence before noise. Think motorsport engineering poster, not tech startup landing page.
- **Audience:** Car enthusiasts who notice details. They will notice bad type, fake-looking UI and lazy layouts immediately.

---

## 1. HOW YOU (THE AGENT) MUST WORK

1. Read this whole file first.
2. Inspect `/assets` and report what you found (video count, durations, resolutions) before designing anything.
3. Write a short plan: sections, scroll choreography, type system, color tokens, asset pipeline. Then build.
4. Define design tokens FIRST (type scale, colors, spacing, easing) in one place. Every component uses tokens. No magic numbers scattered around.
5. Build section by section. After each section, check it against Section 9 (the checklist).
6. If something in this file conflicts with your habit or default, **this file wins**.
7. If you are unsure whether something looks "AI-ish", assume it does and choose the more restrained, more specific alternative.
8. Never invent facts about the car. Use only the verified spec list in Section 8. If you need another fact, leave a clearly marked `TODO: verify` instead of guessing.
9. At the end, produce a self-audit: list every rule in Section 9, mark pass or fail, and fix all fails.

---

## 2. BANNED LIST (HARD NO — zero tolerance)

If any item below appears in the output, the output is rejected.

### 2.1 Typography bans

- No default or lazy fonts: **Inter, Roboto, Arial, Helvetica, system-ui, Open Sans, Poppins, Montserrat, Lato** as the main design fonts. Browser-default serif or sans fallbacks showing on screen is a bug.
- No tiny text. **Nothing below 12px, ever.** Body copy is never below 16px. Uppercase micro-labels are 12 to 13px minimum with real letter-spacing, and only for short labels (max about 3 words).
- No light gray text on a dark background that fails contrast. Body text must hit WCAG AA at minimum (4.5:1).
- No more than **2 font families** in total (1 display + 1 text, optionally 1 mono for specs). No random third font.
- No faux bold / faux italic (always load the real weights used).
- No ALL CAPS paragraphs. No centered long paragraphs. No orphan single words on the last line of headings (use `text-wrap: balance` for headings and `text-wrap: pretty` for paragraphs).
- No gradient-filled text as a default heading style. No text with glow or neon shadows.
- No inconsistent font sizes. Every size comes from the type scale. No one-off `font-size: 13.5px`.
- No emoji used as design elements or icons. Anywhere.

### 2.2 Card and layout bans (the "AI card" look)

- No grid of 3 identical rounded cards with: a colored icon in a circle, a bold title, and two lines of gray text. This is the number one AI tell.
- No glassmorphism panels (blurred translucent boxes with a thin white border) used as a default container.
- No cards with large soft drop shadows, glowing borders, or "gradient border" tricks.
- No `rounded-2xl` / big pill radius on everything. Radius system is **0 to 2px** (sharp, engineered) unless a specific element has a real reason. One radius value across the site.
- No bento grids. No "feature grid" layouts. No "Why choose us" blocks. No pricing-table-style comparison cards.
- No stat counters in rounded boxes ("500+ happy customers"). This is a car site, not a SaaS site.
- No fake testimonials, fake reviews, fake logos, fake awards.
- No stacked sections that all look the same (centered heading, subtitle, 3 cards, repeat).
- No hamburger menu with a generic slide-over panel on desktop. Navigation must be minimal and custom.

### 2.3 Color and effect bans

- No purple-to-blue or pink-to-orange gradients. No "aurora" blurred blobs. No mesh gradients behind everything.
- No neon glow, no cyberpunk look, no random particle backgrounds.
- No pure `#000` page with pure `#fff` text and nothing in between. Use a deliberately tuned near-black and off-white (see tokens).
- No more than **1 accent color** in the UI. BMW M tricolor is allowed ONLY as a tiny, intentional detail (see Section 5).
- No stock UI icon packs used decoratively (no random Lucide/Heroicons sprinkled for filler). Icons only if they carry real meaning, and then a consistent custom or stroke-matched set.

### 2.4 Copy bans

- No filler marketing language: "Elevate your", "Unleash", "Experience the future of", "Seamlessly", "Cutting-edge", "Game-changer", "Revolutionary", "In today's fast-paced world".
- No lorem ipsum, no "Feature One / Feature Two", no placeholder names.
- No exclamation marks in headings. No rhetorical-question headings.
- Copy is short, concrete and technical. Numbers over adjectives. Say "1,625 kg" not "incredibly lightweight".

### 2.5 Motion and 3D bans

- No bouncy spring animations on UI. No fade-up-on-scroll applied to every single element (the classic AI pattern).
- No parallax that makes text hard to read. No auto-playing sound.
- No spinning-car-on-a-plain-gradient as the whole experience.
- No layout shift on load. No janky scroll. No scroll-hijacking that traps the user with no way to skip.
- No heavy unoptimized video (50MB+ background loops). No giant PNG sequences.
- No visible loading spinner that looks like a default. The loader must be designed (see Section 7).

### 2.4 Code bans

- No inline styles scattered around when tokens exist.
- No `!important` wars. No unused dependencies. No giant 3000-line single component.
- No `console.log` left in. No leftover template boilerplate (default Next/Vite page content, default favicon, default `<title>`).
- No `alt=""` missing on meaningful images. No div-soup where semantic HTML belongs.

---

## 3. TYPOGRAPHY SYSTEM (MUST FOLLOW)

Pick ONE of these pairings and commit. Do not mix across pairings. Self-host the font files (WOFF2), preload the critical ones, use `font-display: swap`, subset if possible.

**Pairing A (recommended, motorsport engineering feel)**

- Display: **Archivo** (variable, use the width axis: Expanded for hero numerals and big headings, SemiCondensed for dense labels)
- Text: **Instrument Sans**
- Mono (specs/data only): **JetBrains Mono** or **Geist Mono**

**Pairing B (tighter, more editorial)**

- Display: **Big Shoulders Display** or **Barlow Condensed**
- Text: **Instrument Sans** or **Figtree**
- Mono: **IBM Plex Mono**

**Pairing C (wide, modern)**

- Display: **Unbounded** (use sparingly, big sizes only)
- Text: **Instrument Sans**
- Mono: **Geist Mono**

If you believe another font is better, you may propose it, but it must be a real, characterful, properly licensed font, not a system default, and you must explain why before using it.

### Type scale (fluid, using `clamp`)

| Token          | Min  | Max   | Use                                                       |
| -------------- | ---- | ----- | --------------------------------------------------------- |
| `--text-hero`  | 56px | 200px | Hero number or model name only                            |
| `--text-h1`    | 40px | 112px | Section titles                                            |
| `--text-h2`    | 28px | 56px  | Sub-titles                                                |
| `--text-h3`    | 20px | 28px  | Spec headings                                             |
| `--text-body`  | 16px | 20px  | All paragraphs                                            |
| `--text-small` | 14px | 15px  | Captions, notes                                           |
| `--text-label` | 12px | 13px  | Uppercase labels, with `letter-spacing: 0.08em to 0.14em` |

Rules:

- Display headings: tight line-height (0.9 to 1.05), slightly negative letter-spacing.
- Body: line-height 1.5 to 1.65, max line length about 60 to 70 characters (`max-width: 65ch`).
- Numerals in spec tables use `font-variant-numeric: tabular-nums`.
- Only use the weights you load. Maximum 3 weights per family.
- Check the rendering on a real phone width. If it looks small, it is too small.

---

## 4. COLOR TOKENS

Define as CSS variables. Do not hard-code hex values in components.

```css
:root {
  --bg: #0b0c0e; /* near-black, slightly cool, never pure #000 */
  --bg-raised: #121317; /* only for rare surfaces */
  --line: #24262c; /* hairline rules and dividers */
  --text: #eceae4; /* warm off-white */
  --text-dim: #a3a29c; /* secondary text, must pass AA on --bg */
  --accent: #ff3b1d; /* single accent, motorsport red-orange. Used rarely. */
  --light: #e9e7e0; /* light sections, if any */
}
```

- Accent usage: a thin rule, a hover underline, one key number, the cursor/progress indicator. Never big filled buttons everywhere.
- Light sections are allowed for contrast between chapters, but must feel deliberate (like a printed spec sheet).
- Sample the actual car color from the videos and make sure the UI palette complements it. If the car's color clashes with the accent, adjust the accent, not the car.

---

## 5. BMW M DETAILS (use as small, precise touches only)

- The BMW M tricolor (light blue, dark blue, red) may appear as a **3-stripe divider of a few pixels height** at most once or twice (footer, loader). Never as large decoration, never as a gradient.
- The CSL identity: **Competition Sport Lightweight**. Lean into weight savings, carbon fibre, stripped interior, aggressive lighting signature. Design language = lighter, sharper, less decoration.
- Do not reproduce the official BMW roundel or wordmark as if this were the official BMW site. Add a small footer disclaimer: _Unofficial fan project. BMW, M and CSL are trademarks of BMW AG._

---

## 6. LAYOUT & COMPOSITION

- **Instead of cards:** use full-bleed sections, big type, hairline rules (`1px solid var(--line)`), and generous whitespace. Group information with alignment and spacing, not boxes.
- **Specs presentation:** an editorial spec sheet. Large numeral on the left, label and unit on the right, separated by a hairline. Rows, not tiles. Think race-car data sheet.
- Use a real **12-column grid** with consistent margins (about 24px mobile, 48 to 80px desktop). Break the grid on purpose, not by accident.
- Vary section rhythm: one big type moment, one full-bleed car moment, one dense data moment, one quiet moment. No two consecutive sections with the same structure.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192. Nothing outside the scale.
- Images and video always have defined aspect ratios (no layout shift) and `object-fit` set on purpose.
- The car is the hero of every section it appears in. UI never covers the car's key surfaces (front face, wheel arches, rear wing).

### Suggested section flow (adjust if the footage suggests better)

1. **Loader** — designed, minimal (progress in tabular numerals, thin line, M stripe detail).
2. **Hero** — car reveal, model name huge, one line of copy, scroll cue.
3. **Design / Aero** — front face, lights, carbon details (scroll-scrubbed).
4. **Weight** — the lightweight story told with numbers.
5. **Powertrain** — S58 engine, power, torque, 0 to 100.
6. **Track** — Nürburgring / handling, rear-driven focus.
7. **Interior / Details** — carbon bucket seats, stripped cabin (if footage exists).
8. **Spec sheet** — the full data table.
9. **Footer** — minimal, disclaimer, M stripe detail.

---

## 7. VIDEO → "3D" PIPELINE (IMPORTANT)

The Google Flow clips are **generated video, not a 3D model**. Do not pretend they are a real GLB. Choose the right technique and tell me which one you chose and why.

### Preferred approach: scroll-scrubbed image sequence on canvas

1. Extract frames with ffmpeg, per clip:
   ```bash
   ffmpeg -i input.mp4 -vf "fps=30,scale=1920:-2" -c:v libwebp -q:v 80 frames/clipname_%04d.webp
   ```
   (Use `scale=1280:-2` and lower fps for the mobile set. Keep each sequence roughly 120 to 300 frames.)
2. Draw frames to a `<canvas>` based on scroll progress (GSAP ScrollTrigger + Lenis for smooth scroll, or equivalent).
3. Preload in priority order: first frames first, rest in the background. Show real loader progress.
4. Use `requestAnimationFrame`, `devicePixelRatio` capped at 2, and cover-fit drawing so the car never stretches.
5. Respect `prefers-reduced-motion`: show a static still or simple video instead of scrubbing.

### Alternative: real 3D (only if a proper GLB model exists)

- three.js or react-three-fiber, with a compressed GLB (Draco/Meshopt, KTX2 textures), HDRI lighting, soft contact shadows, tone mapping set properly. Use video only as environment/backplate.
- Do NOT use AI-video-to-splat/photogrammetry unless the footage genuinely supports it; results from generated video are unreliable.

### Performance budget

- Initial load under about 2.5s on a mid-range phone on 4G for the hero (poster + first frames).
- Total JS under about 250KB gzipped for non-3D code.
- 60fps scroll on a mid-range laptop. If frames can't hold 60, reduce resolution, not smoothness.
- Lighthouse Performance 90+ on desktop, 80+ on mobile.
- Lazy-load everything below the fold. Provide poster images for every video.
- Videos for ambient backgrounds: H.264 MP4 + WebM, muted, `playsinline`, short loops, under about 4MB each.

---

## 8. VERIFIED SPEC SHEET (use only these; verify before publishing)

| Item                            | Value                                  |
| ------------------------------- | -------------------------------------- |
| Model                           | BMW M4 CSL (G82)                       |
| Engine                          | 3.0 L twin-turbo inline-6 (S58)        |
| Power                           | 550 hp (405 kW)                        |
| Torque                          | 650 Nm (479 lb-ft)                     |
| Drive                           | Rear-wheel drive                       |
| Transmission                    | 8-speed M Steptronic                   |
| 0 to 100 km/h                   | 3.7 s                                  |
| Weight saving vs M4 Competition | about 100 kg                           |
| Production                      | Limited to 1,000 units                 |
| Lighting                        | Laser lights with red accent signature |

> Everything above is from memory and must be double-checked against BMW's official press material before going live. Anything not on this list gets a `TODO: verify` marker, never a guess.

---

## 9. DEFINITION OF DONE (SELF-AUDIT CHECKLIST)

The agent must go through this list and report pass/fail for each item.

**Typography**

- [ ] Only the chosen font pairing is used, self-hosted, no fallback fonts visible
- [ ] No text under 12px anywhere, body text is 16px+
- [ ] All sizes come from the type scale tokens
- [ ] Headings use balanced wrapping, paragraphs max about 65ch
- [ ] Contrast passes AA everywhere

**Anti-AI design**

- [ ] Zero 3-up icon cards, zero glassmorphism, zero bento grids
- [ ] One radius value (0 to 2px), no big soft shadows
- [ ] One accent color, no gradients on text or backgrounds
- [ ] No filler marketing copy, no emoji, no lorem ipsum
- [ ] Sections do not repeat the same layout twice in a row
- [ ] Specs shown as an editorial table, not tiles

**Motion and 3D**

- [ ] Scroll-scrubbed sequence is smooth at 60fps
- [ ] Loader is custom and shows real progress
- [ ] Reduced-motion fallback works
- [ ] No layout shift (CLS near 0)
- [ ] Scroll is never trapped, user can always move on

**Responsive and technical**

- [ ] Looks intentional at 360px, 768px, 1280px, 1920px and ultrawide
- [ ] Touch targets 44px+, keyboard focus states visible and styled
- [ ] Semantic HTML, real alt text, proper `<title>` and meta/OG tags, custom favicon
- [ ] No console errors or warnings, no leftover boilerplate
- [ ] Lighthouse targets met

**Final step:** take screenshots at mobile and desktop, compare against this file, and list any rule you bent with a reason. If you bent a banned rule, fix it instead of explaining it.

---

## 10. ONE-LINE REMINDER FOR THE AGENT

> Every pixel should look chosen, not generated. When in doubt: bigger type, fewer boxes, more whitespace, real numbers, sharper edges, and let the car do the talking.
