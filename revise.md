# Revision prompt — Ayush portfolio

Apply this as a **refinement pass** to the current implementation. Preserve the existing content routes (`/`, `/projects`, `/writing` or `/blog`, `/reads`) and the new dark editorial direction. Do not rebuild the site into a generic template.

## 1. Visual-system correction

The current dark base is promising, but the lime/green accent is not cohesive with the desired monochrome aesthetic. The site must be charcoal, black, and silver/soft-white—never red, lime green, amber, or colourful neon.

- Replace every bright green/acid-lime accent used in labels, dots, numbers, navigation states, and charts with silver/soft-white states.
- Use these starting tokens, then tune them visually:

```css
--canvas: #0b0b0b;
--surface: #111111;
--surface-raised: #181818;
--text-primary: #f2f2f0;
--text-secondary: #a7a7a4;
--text-muted: #70706e;
--line: rgba(242, 242, 240, 0.13);
--accent: #d5d5d0;
--accent-muted: #858581;
--footer-light: #f5f3ed;
```

- `--accent` is for small status dots, active states, compact labels, and keyboard focus. It must never become a large coloured panel.
- Use black as the canvas, charcoal as the depth layer, and silver/soft-white as the highlight. Avoid colour as decoration.
- Do not add red, lime green, blue gradients, glass cards, amber lighting, or multicolour effects.
- The giant `AYUSH` footer must be graphite/silver 3D text with cool white directional light and near-black shadows.

## 2. Hero improvements

Keep the Tony Stark quote at the top of the hero, above the main thesis:

```text
“Sometimes you gotta run before you can walk.”
— Tony Stark, Iron Man (2008)
```

Then show:

```text
I build AI products and systems that hold up after the demo.
```

Remove any decorative or unsupported technical claims such as `1080 resolution`, `100% local resolution`, or similar device/spec labels. They do not communicate value.

Directly beneath the hero copy, add this compact contact/action row:

```text
[Let’s build something]  [Book a call]

GitHub   X / Twitter   LinkedIn
```

- `Let’s build something` opens `mailto:707ayushtripathi@gmail.com`.
- `Book a call` should open the real Calendly/Cal.com URL if provided; otherwise show `Book a call — coming soon` as a disabled-looking non-link until a real URL exists.
- Social links must be text-forward with small icons optional, not oversized social cards.
- Use one primary silver-outline or muted-silver filled button, one quiet secondary button, and understated text links.

## 3. Home-page density and project cards

The current project cards are too tall. Make the home page feel sharper and faster to scan.

- On the home page, show exactly three selected projects.
- Each project should be a compact editorial row/card: 220–300px tall on desktop, no more than 240px of media height on mobile.
- Desktop layout: project number/year and text on the left; a contained visual preview on the right. Alternate the media side only if it improves rhythm.
- Each card includes: title, one-sentence outcome, one measurable/credible detail if real, 3–4 stack tags maximum, and `Live` / `Source` links.
- Do not include a long technical paragraph on the home page. Move deep architecture copy to `/projects/[slug]` or the project archive.
- Do not animate every card continuously. Hover/focus may use a subtle crop shift or 1.02 scale only.

## 4. Story section: retain the story, reduce the home-page bulk

The “How I got here” story is good content, but it is currently consuming too much vertical space on the home page.

- Home page: show the short 2–3 paragraph version and one concise story highlight (the 4 GB Android Studio moment).
- Add `Read the full route into systems & AI →` linking to a dedicated `/about` page or an expandable story section.
- Full story page: use the six numbered chapters already drafted.
- Keep the ₹600 meme-coin story, but frame it as curiosity about infrastructure—not investment advice or a trading flex.
- Keep the basketball-height fact as a tiny personal footnote, not a major section.

## 5. GitHub activity: monochrome evidence panel with an original composition

Replace the default-looking GitHub heatmap treatment with a custom activity module.

- Take inspiration from the supplied reference: a precise uppercase section label, a large framed dark panel, a profile row, month labels, high-density contribution cells, a clear total, and a restrained `less → more` legend.
- Do not duplicate the reference layout pixel-for-pixel. Give Ayush a distinct `BUILD LOG` identity: use a narrower content column, silver horizontal rules, a compact profile/status row, and a small summary sentence such as `commits, reviews, experiments, and shipped fixes`.
- Header: `BUILD LOG` and a large verified total: `[real total] contributions · last 365 days`.
- Use a compact grid that matches the site tokens: very dark inactive cells, graphite mid-intensity cells, silver high-intensity cells, and a small “less → more” legend.
- On desktop hover, show a custom tooltip with: exact date, contribution count, and a small intensity indicator.
- On mobile tap, show the same information in an anchored tooltip/bottom sheet; do not require hover.
- Keep each heatmap cell keyboard-focusable and expose an accessible label, e.g. `12 contributions on 4 October 2026`.
- If GitHub data cannot be fetched reliably, hide the module rather than showing a broken or static-looking heatmap.
- Do not make the chart the main visual. It supports the work; it does not replace it.

## 6. Navigation

- Keep the compact floating navigation, but ensure it never covers content or footer controls.
- Desktop: centred pill can remain fixed only when it has enough contrast and does not overlap interactive elements.
- Mobile: use a compact top navigation or a bottom bar respecting `env(safe-area-inset-bottom)`. It must not obscure content.
- Include `home`, `work`, `writing`, `reads`, plus a theme toggle and optional command-palette trigger.
- Do not add an `about` nav item unless the current information architecture needs it; link to the long story from the home section instead.

## 7. Giant `Ayush` interactive footer

Keep the footer concept, but it must be giant typographic art—no door, dog, small nameplate, or room scene.

- The main visual is exactly `Ayush`: capital `A`, lowercase `yush`. It fills 70–100% of the viewport width and much of the footer height. Do not render it as `AYUSH`.
- Use actual 3D text geometry where WebGL is available. The word should have shallow physical depth and receive/cast light.
- Take only these compositional cues from the supplied visual reference: monumental extruded lettering, deep black negative space, a strong top-down/diagonal light angle, crisp dark cast shadows, and sculptural letter depth. Do not copy its red colour, ghost mascot, hanging character, or any other branded object.
- Material: brushed graphite/dark chrome sides with restrained silver face highlights. The letters should read as a sculpture in darkness, not glossy red plastic or neon signage.
- A cool-white movable spotlight follows pointer/touch movement with inertia and changes silver highlights, edge shadows, and letter depth in real time.
- Include a small initial cue: `drag to light AYUSH`; fade it after first interaction.
- Keep footer links and copyright subdued and outside the main word.
- Create a non-WebGL fallback: enormous CSS text with a soft-white moving light mask; preserve readability.

## 8. Performance fixes

The site must feel immediate. Diagnose and remove unnecessary continuous work.

- Do not load Three.js / React Three Fiber / the footer canvas until the footer is close to the viewport. Use dynamic import plus `IntersectionObserver`.
- Pause canvas rendering when the footer is off-screen or the tab is hidden.
- Cap render DPR at `min(devicePixelRatio, 1.5)` on desktop and `1`–`1.25` on mobile. Reduce shadow map size and disable expensive post-processing on mobile.
- Use `next/image` or equivalent responsive images. Serve AVIF/WebP, specify dimensions, and lazy-load below-the-fold media.
- Use only transform and opacity for ordinary UI animation. Avoid layout animation, repeated box-shadow animation, large `filter: blur()`, or many simultaneous scroll listeners.
- Use one animation library only; remove duplicate animation/smooth-scroll libraries if they overlap.
- Subset fonts, preload only the primary display/body font files, and use `font-display: swap`.
- Remove hidden continuous marquees/tickers and unnecessary decorative effects.
- Target: LCP under 2.5s on a mid-range mobile network and no sustained main-thread animation work outside the visible section.

## 9. Complete mobile-responsive requirements

Test at 360px, 390px, 414px, 768px, 1024px, and 1440px widths. Do not treat mobile as compressed desktop.

- No horizontal overflow at any breakpoint.
- Content margins: 20px at 360–414px; 24px at tablet; 32px+ desktop.
- Hero title uses `clamp()` and must not orphan a single word or overlap the quote/actions.
- Quote remains above the heading and has readable 14–16px type; it may wrap to two lines.
- Contact actions stack vertically below 420px; each has a minimum 44px touch target.
- Social links wrap cleanly with no tiny icon-only controls.
- Selected-work cards become one-column cards; media is cropped to a fixed 180–240px region and text never competes with imagery.
- Long story lives on the dedicated page/accordion; do not force users through six full chapters on the home page.
- GitHub activity becomes a horizontally contained, tappable grid. If cell labels cannot remain usable, show a condensed 90-day view and a `View GitHub` link instead.
- Floating navigation must obey safe-area insets and never cover the action buttons, heatmap tooltip, or giant footer text.
- Footer: reduce 3D complexity, retain large `Ayush` via `font-size: clamp(5rem, 25vw, 16rem)`, and use the CSS fallback if frame rate is poor.
- Test keyboard navigation, screen-reader labels, colour contrast, reduced-motion mode, and touch dragging.

## Acceptance criteria

1. The page uses one coherent black, charcoal, and silver visual language with no red, lime green, or decorative colour accents.
2. The hero immediately offers email/contact, booking, GitHub, X, and LinkedIn actions.
3. Home project cards are compact and outcome-led.
4. The story is memorable without making the home page excessively long.
5. GitHub activity communicates a verified total and per-day detail through hover/tap/focus.
6. The footer is a giant interactive `Ayush` word, not a door scene.

## 10. Typography: use the reference pairing, not a copied layout

The visual reference uses **Outfit** for its UI/body layer and a **Geist Mono**-style face for the technical/editorial display layer. Use the same open web-font pairing:

```css
--font-sans: "Outfit", "Avenir Next", system-ui, sans-serif;
--font-mono: "Geist Mono", "SFMono-Regular", Consolas, monospace;
```

- Body copy, navigation, project descriptions, and buttons: `Outfit`.
- Eyebrows, section labels, dates, status labels, GitHub metadata, contribution totals, and small links: `Geist Mono`, uppercase, 0.08–0.14em tracking.
- Hero heading and the large interactive `Ayush` word: use a carefully tuned display treatment based on `Geist Mono` for the technical voice, but adjust weight, width, tracking, and 3D material to make it recognisably Ayush’s own. Do not copy the reference heading breaks or use its exact text treatment.
- Do not introduce a third decorative typeface. Let typography, spacing, and monochrome contrast create the identity.
7. The site is smooth on mid-range mobile and every major interaction is responsive and accessible.
