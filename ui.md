# Ayush Tripathi portfolio — UI revamp specification

## Decision

Rebuild the portfolio around a **quiet technical editorial** direction: dark, high-contrast, evidence-led, and personal without being busy. The closest strategic reference is [Chirag Dave](https://chirxg.is-a.dev/): it makes the engineering identity clear immediately, proves it with outcomes, and gives each project enough context to feel real. Do **not** copy its layout, typography, content, terminal UI, or project cards.

The signature differentiator for Ayush should be the interactive **door-and-light footer**. It provides the memorable visual moment; the rest of the site should remain exceptionally legible and calm.

## Audit of the current site

### What already works

- The content order is sensible: introduction, experience, activity, projects, stack, contact.
- The copy identifies a clear technical lane: AI, agents, scalable software, and systems work.
- The current hero has a human portrait and a brief personal story.
- Navigation is compact, and the light/dark toggle is useful.
- Project names such as Voiceflow and FlowDesk communicate a more interesting direction than a generic frontend portfolio.

### What is holding it back

| Area | Current state | Revamp direction |
| --- | --- | --- |
| First impression | Pale background, soft border card, large `hey i'm ayush`; polished but visually familiar. | Replace with a stronger thesis, a dark editorial canvas, and immediate evidence of capability. |
| Hierarchy | The hero repeats identity information and uses a very short animated claim (`I build fast`). | Use one clear value proposition, then one proof-led supporting paragraph. |
| Projects | Cards expose the name and description but not enough result, architecture, or visual proof. | Make 3 selected projects feel like case-study teasers: problem, role, outcome, stack, live/source links. |
| Visual system | Rounded white cards and faint blue ambient colour make the design gentle rather than distinctive. | Use a restrained dark surface, hairline borders, sparse grid texture, warm off-white type, and one muted accent. |
| Credibility | Skills appear as a long inventory; visitors need to infer depth. | Promote evidence: shipped systems, constraints, outcomes, engineering choices, GitHub/activity where meaningful. |
| Footer | Standard contact block plus ticker does the job but is not memorable. | End with the interactive door scene as the portfolio’s authored closing experience. |
| Accessibility | Some text and the bottom ticker have low-contrast risk; animated content may distract. | Use WCAG AA contrast, pause/reduced-motion behaviour, visible focus rings, and no essential information only in animation. |

## Reference synthesis

### Keep from Chirag Dave — primary direction

- A decisive opening sentence that says what the engineer actually builds.
- Proof near the claim: production metrics, current role/status, selected pull requests or activity only if they add substance.
- Project cards that explain **why it matters** and **under the hood**, not just the tools used.
- A dense-but-readable dark visual language with restrained decorative details.
- Clear section labels, short navigation, and a direct contact invitation.

### Borrow selectively from the other references

| Reference | Strong pattern to adapt | Do not adopt |
| --- | --- | --- |
| [Samiran De](https://samworks.vercel.app/) | Personal visual signature, clear project previews, a consistent central content column. | Large decorative banner/anime treatment or the very dense horizontal grid. |
| [Ashutosh Tiwari](https://www.ashutoshtiwari.me/) | Command-palette navigation, detailed experience timelines, clearly labelled project status. | Listing every tool repeatedly or overly long repeated content blocks. |
| [Siddharth Meena](https://siddz.com/) | Light editorial spacing, small personal details, GitHub contribution activity used as evidence. | Making the opening mostly profile metadata or displaying every technology as equal. |
| [Manish Kumar](https://manixh.vercel.app/) | Straightforward social/contact affordances and visible open-source work. | Excessive badges, repeated marquees, dense icon clouds, and novelty taking priority over project stories. |

## Information architecture

Keep the existing information architecture: a focused home page plus dedicated `/projects`, `/blog` (or `/writing`), and `/reads` routes. Keep the top navigation: `home`, `work`, `writing`, `reads`, plus a compact command palette / theme control. The revamp improves the visual system and storytelling; it does not remove these sections.

1. **Hero / thesis**
2. **Proof strip** — availability, location/time zone, selected metrics or role
3. **Selected work** — exactly 3 strong projects
4. **Experience** — concise timeline with expandable details
5. **Engineering toolkit** — grouped by capability, not logo soup
6. **Writing / experiments / activity** — only if there is useful current material
7. **Contact invitation**
8. **Interactive door-and-light footer**

### Route responsibilities

| Route | Purpose | UI direction |
| --- | --- | --- |
| `/` | Concise narrative and strongest proof. | Hero, 3 selected-project teasers, compact experience/proof, contact transition, and door footer. |
| `/projects` | Full project archive and deeper case studies. | Filter-free editorial index; each item has a real preview, role, outcome, stack, and links. Use project detail pages where depth warrants it. |
| `/blog` or `/writing` | Engineering notes, build logs, and technical essays. | Reading-first layout with date, topic, read time, and a restrained featured-post treatment. Avoid card-heavy magazine styling. |
| `/reads` | Books, essays, articles, papers, or links worth sharing. | A curated, personal library organised by topic/status, with a one-line note on why each item matters. Keep it calm and easy to scan. |

## Page specification

### 1. Hero

**Goal:** Answer who Ayush is, what he builds, and why a visitor should keep reading within five seconds.

Suggested content structure:

```text
EYEBROW: AI SYSTEMS · PRODUCT ENGINEERING · INDIA

I build AI products and systems that stay reliable after the demo.

I work across agent workflows, backend infrastructure, and considered interfaces —
turning ambiguous ideas into fast, usable software.

[View selected work]  [Start a conversation]
```

- Use a two-column desktop composition: thesis left; small evidence/status module right.
- The right module may contain portrait, `currently exploring`, availability, and 2–3 verified metrics. It must not imitate Chirag’s terminal card.
- On mobile: copy first, actions second, portrait/status module below.
- Avoid typewriter effects for the main claim. A single 350–500 ms fade/slide reveal is enough.

### 2. Proof strip

A compact horizontal band directly below hero. Include only true information:

- Current focus: `AI agents / voice interfaces / scalable web systems`.
- Location/time zone.
- Availability: `Open to internships, freelance, or full-time` only if accurate.
- One or two hard numbers only if independently supportable.

Use a static, selectable text row. Remove the endlessly moving system ticker; it competes with reading and feels decorative rather than evidential.

### 3. Selected work

Use three varied cards in a stacked editorial layout, not a uniform grid.

Each project needs:

- Number and year: `01 — 2026`
- Product name and one-sentence outcome
- A real product screenshot, UI crop, or custom technical visual
- `Why it matters`: one outcome, user impact, or problem solved
- `Under the hood`: 3–5 meaningful technologies/decisions
- Links: `Live site` and `Source` where public

Suggested existing projects:

1. **Voiceflow** — focus on local voice interaction, wake-word detection, and MCP integration.
2. **FlowDesk** — focus on hybrid RAG, intent classification, escalation, and support reliability.
3. **One project that demonstrates systems depth** — choose the strongest shipped product, open-source system, or infrastructure project.

Do not use generic browser-window mockups for every project. Let each visual match the product: waveform/flow for Voiceflow, support-triage visual for FlowDesk, architecture/data detail for the third project.

### 4. Experience

- Use a clean vertical timeline with date, company, role, and a one-line impact statement.
- The entire timeline should scan in under 15 seconds.
- Expand a role only when there are strong implementation details or measurable outcomes.
- Separate education from work experience; do not lead with the ceramic-engineering detour. Keep it as a human detail in the short biography or about page.

### 5. Toolkit

Group skills as capabilities, using text-forward tags:

```text
AI & agent systems: Python, LangChain, LangGraph, MCP
Application layer: TypeScript, React, Next.js
Backend & infrastructure: Go, Node.js, Docker, PostgreSQL
```

- Show tools you can speak about in an interview. Do not show an exhaustive inventory.
- Avoid circular logo carousels or a dense tiled logo wall.

### 6. Writing / activity

Use this only if it has fresh, useful material. Good content:

- Architecture notes from Voiceflow or FlowDesk.
- Short engineering write-ups about agent reliability, RAG evaluation, or deployment.
- GitHub activity only when it supports an active builder narrative.

Otherwise, use the space for a concise `Now` section: what you are building, learning, and looking for.

### 7. Contact transition

Before the footer scene, include one calm, high-contrast contact line:

```text
Have a hard product or systems problem?
Let’s make it reliable.
[707ayushtripathi@gmail.com]
```

No form is required. Make the email a prominent mailto link and retain GitHub, LinkedIn, and X as small secondary links.

## Interactive footer — door and movable light

This is an authored ending, not a decorative background. The scene should occupy 70–100vh desktop and 65–80vh mobile.

### Art direction

- Seamlessly transition from the site’s dark canvas into a near-black, cinematic space.
- Centre a realistic, worn **back door** within a restrained wall/frame. Match the attached video’s door, framing, age, material, hardware, darkness, and camera angle as closely as the visual reference permits.
- Use a warm, movable hanging lamp/light as the only dominant light source, with very subtle cool ambient fill.
- Add `AYUSH` as a small physical nameplate, door number, or quiet footer signature—not a giant title.
- Keep footer links low contrast and outside the light’s primary focal area.

### Interaction behaviour

- Drag the hanging lamp on desktop; touch-drag it on mobile.
- The light follows with 100–180 ms inertial lag and is restricted to a believable arc above/in front of the door.
- Its real 3D position changes shadow direction, shadow length, highlight placement, brightness, and falloff on the door and frame.
- On release, settle with a brief, restrained sway; no cartoon bounce.
- Show `drag the light` until first interaction, then fade it out.
- The camera never moves.

### Implementation constraints

- Use React + Three.js + React Three Fiber and physically based materials.
- Use a shadow-casting `SpotLight` or `PointLight`, contact shadows, soft shadow filtering, realistic decay, and a minimal ambient light.
- Create a low-poly-but-convincing door with panel depth, a frame, hardware, worn painted wood/roughness, and edge wear. Do not use one flat image as the door.
- Cap DPR; reduce shadow-map size and post-processing on mobile.
- Provide a non-WebGL fallback: static door art plus a softly moving CSS radial light.
- Honour `prefers-reduced-motion`: steady light, no drag inertia or sway.
- Do not include hacker visuals, neon, particles, skulls, code-rain, glassmorphism, or unrelated decorative effects.

## Visual system

### Palette

Use a predominantly dark theme. Suggested starting tokens, to tune after visual QA:

```css
--canvas: #0b0b0b;
--surface: #111111;
--surface-raised: #171717;
--text-primary: #f0eee9;
--text-secondary: #aaa69d;
--line: rgba(240, 238, 233, 0.13);
--accent: #c8d66a; /* muted acid-lime; use sparingly */
--lamp: #efb66d;
```

- Accent is for status dots, text links, and focus—not big backgrounds.
- Warm footer lighting must feel intentional beside the neutral UI.
- Offer a light theme only if it is fully designed; otherwise ship a refined dark-first experience and use OS preference sensibly.

### Type

- Display / thesis: modern grotesk or restrained monospaced grotesk, medium weight.
- Supporting copy: highly readable sans-serif.
- Metadata: mono, small caps, subtle letter spacing.
- Avoid displaying two unrelated dramatic typefaces. Use italics only for specific emphasis, not an entire second visual identity.

### Layout

- Desktop max content width: 1180–1240px.
- Reading column for longer copy: 640–720px.
- Outer margins: 32px desktop, 20px mobile.
- Section vertical rhythm: 120–160px desktop; 72–96px mobile.
- Use 1px rules and a faint grid only where they reinforce grouping. The page must not become a faux-terminal template.

## Motion and interaction rules

- Motion should clarify hierarchy or offer feedback; no animation merely to fill empty space.
- Entry animations: opacity + 12–20px vertical translation, 400–550ms, `cubic-bezier(0.22, 1, 0.36, 1)`.
- Project image hover: subtle 1.02 scale or crop shift; retain a visible keyboard focus state.
- Respect `prefers-reduced-motion` across all transitions.
- Maintain 44px minimum touch targets and persistent focus visibility.

## Priority roadmap

### P0 — identity and conversion

1. Replace hero copy and hierarchy.
2. Rebuild selected work around outcomes and proof.
3. Remove the looping system ticker and duplicate identity cues.
4. Establish the dark editorial tokens, responsive type scale, spacing system, and accessible contrast.
5. Rebuild contact CTA.

### P1 — credibility and polish

1. Rewrite experience as a concise impact timeline.
2. Group the stack by capability.
3. Add a `Now` / writing section only with current material.
4. Add command palette only if it includes useful actions: navigation, email, resume, theme.
5. Audit mobile navigation, images, focus states, and reduced-motion behaviour.

### P2 — signature experience

1. Build and performance-test the 3D door footer.
2. Create the CSS/no-WebGL fallback.
3. Tune shadows, drag constraints, and lamp inertia against the reference video.
4. Add performance budgets: lazy-load Three.js at footer approach; target 60fps desktop and graceful mobile degradation.

## Definition of done

- Visitors understand Ayush’s engineering focus and see 2–3 credible examples before the first long scroll.
- Every showcased project has a real visual, outcome, technical depth, and a working destination.
- The site feels authored, spare, and confident—not like a collection of UI components.
- The door footer is the one memorable interactive moment and remains accessible and performant.
- Mobile layout is deliberately designed, not merely compressed desktop.
