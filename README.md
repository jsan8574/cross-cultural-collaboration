# Cross-Cultural Collaboration

A self-paced, two-track e-learning course. Plain HTML/CSS/JS — **no build step, no
framework, no backend, no login**. Deploys to GitHub Pages by pushing this folder as-is.

Built from the facilitator-led deck `Cross culture training Induction.pptx` (48 slides,
43 carrying speaker notes). The notes — not the slides — supplied the model answers,
coaching language and RCM consequences behind every "Coaching Key Points" callout.

---

## The two tracks

| Track | Audience | Modules | Knowledge check |
|---|---|---|---|
| **Leading Offshore Teams** | US-side leaders | 12 | 15 questions |
| **Working with US Teams** | Colleagues in PH · India · Sri Lanka | 6 | 12 questions |

The second track is the companion view: US low-context norms, individualism and what it
means for feedback and recognition, speed-as-competence, and how US client expectations
flow downstream (payer timely-filing windows, compliance deadlines, revenue targets)
so offshore teams can see where a "Friday" deadline actually originates.

Tracks are independent: separate progress, separate scores, separate certificates.

---

## Structure

```
index.html              shell + routing targets (cache-bust ?v=N lives here)
css/styles.css          all styling; light/dark; deck-derived palette
js/track-us.js          TRACK_US  — content for the US-side track
js/track-offshore.js    TRACK_OFFSHORE + the COURSE registry
js/store.js             localStorage persistence + elapsed-time tracking
js/activities.js        the six activity renderers
js/certificate.js       canvas certificate (PNG) + jsPDF answers export
js/app.js               routing, block rendering, quizzes, progress roll-up
fonts/                  Proxima Nova 400/600/700 + matching italics
.nojekyll               stops GitHub Pages running Jekyll over the folder
```

### Adding a third track

`COURSE.tracks` at the bottom of `js/track-offshore.js` is the registry. Add a new file
defining a track object with the same shape, load it in `index.html` before `app.js`,
and push it into `COURSE.tracks`. Storage keys are namespaced `ccl.v1.<trackId>.*`, so a
new track cannot collide with an existing learner's progress. Nothing else needs changing.

---

## Fonts — what is actually in the files

Read from the `OS/2` and `name` tables rather than the filenames:

| File | Subfamily | usWeightClass |
|---|---|---|
| ProximaNova-Regular.otf | Regular | **400** |
| ProximaNova-RegularItalic.otf | Regular Italic | 400 + italic bit |
| ProximaNova-Semibold.otf | Semibold | **600** |
| ProximaNova-SemiboldItalic.otf | Semibold Italic | 600 + italic bit |
| ProximaNova-Bold.otf | Bold | **700** |
| ProximaNova-BoldItalic.otf | Bold Italic | 700 + italic bit |

**True Bold (700) is present — nothing is aliased or substituted.** The design uses
400 body / 600 UI labels / 700 headings, all real files.

Two things to know:

- There is **no Light, Medium, Black or ExtraBold**. Never use `font-weight: 300` or
  `800` — the browser would synthesise them and they would not match.
- All six files report `italicAngle: 0.0` in the `post` table even though the glyphs are
  genuinely italic. Harmless here because each `@font-face` declares `font-style: italic`
  explicitly, but never let the browser synthesise an oblique.

`Proxima Nova Regular.ttf` in the source folder is a duplicate of Regular and is not shipped.

---

## Palette & chrome

Follows the the organisation course-player reference: a deep navy → teal gradient
header, cool-only accents, white cards on a pale blue-grey ground. **No warm tones** —
the orange and amber from the source deck are deliberately not used.

| Role | Value |
|---|---|
| Header gradient | `#08202E` → `#0E3448` → `#17606E` |
| Ink / headings | `#0E2436` |
| Body / muted | `#33485C` · `#5C7185` · `#8697A8` |
| Teal accent | `#2E9CAB` (light `#7FC5D4`, deep `#17656F`) |
| Mint (second accent) | `#E3F0E9` ground, `#2E7D5B` ink |
| Page ground | `#F2F6F9` · surface `#FFFFFF` · border `#E1E9F0` |
| Numbered squares | `#14304A` |

The US track accents teal `#2E9CAB`; the offshore track uses the deeper `#17656F` so the
two are distinguishable at a glance. All values are CSS custom properties on `:root`.

The interface is light-only, matching the reference. There is no dark mode and no theme
toggle — if one is wanted later, redefine the tokens under
`@media (prefers-color-scheme: dark)` and nothing else needs to change.

**No logo is used anywhere**, per instruction. The header wordmark and the certificate
mark are drawn in code (three teal bars, and two overlapping rings respectively). If the
the organisation logo should be reinstated, drop the file into `fonts/`-adjacent
assets and swap the inline `<svg>` in the `.brandmark` block of `index.html`.

### Layout

- Sticky dark header: mark · edition + course title · learner greeting · live **Active
  time** · **Save Now** · **Switch Track**. Collapses progressively — greeting and clock
  drop below 900px and 760px respectively.
- Persistent left rail (296px): course progress, section list with numbered squares
  (teal check when complete, highlighted when current), and **View Learner Record**.
- Content column: teal `SECTION n OF m` eyebrow, large section title, `SUGGESTED` time
  on the right, then white cards.
- Below 1040px the rail moves above the content and **collapses behind a toggle**, so a
  13-item nav does not push the lesson below the fold on a phone.

---

## Activity types

Each type was chosen to fit its task, not the reverse.

| Type | Used for | Where |
|---|---|---|
| **Drag & drop buckets** | Sorting N items into 2–3 fixed categories | Operating systems, iceberg, country norms, do/avoid, channel choice, US reading |
| **Sequencing** | Ordering N unique steps | Unblocking a decision, designing a call, the urgency chain |
| **Matching (lines)** | Genuine 1:1 pairs, both sides distinct | Saving-face signals, US phrases decoded |
| **Flip cards** | Exploring N independent concepts | Profiles, teamwork concepts, RCM patterns, biases, habits |
| **Find the signal** | Locating the one value that matters in data | The cultural-dimension grid |
| **Branching simulation** | Converted facilitator role-plays | 6 simulations across both tracks |

**Design rule enforced throughout:** any task that is "sort N items into fixed categories"
is a bucket-sort, never one-to-one matching. Matching is used only where both sides are
genuinely distinct and unique — otherwise the passive column repeats the same visible text
and becomes ambiguous to click. A duplicate-label audit over all 24 activities is part of QA
(see below) and currently returns zero duplicates.

Every completed activity reveals a **Coaching Key Points** callout carrying the actual
pedagogical point from the facilitator notes — never generic praise.

---

## Progress, time, certificate, export

- Progress, quiz answers, checklists and free-text reflections persist in `localStorage`,
  namespaced per track.
- **Partial progress saves as the learner works** — every chip placed, pair connected, card
  turned, step reordered, radio selected and keystroke typed is written immediately. A
  mid-activity refresh restores exactly where they were.
- Elapsed time accumulates in deltas and **discards any gap over 60 seconds**, so a
  backgrounded tab, a closed laptop or a page left open overnight cannot inflate it. The
  timer also stops while the document is hidden.
- **Knowledge check answers and explanations stay hidden until the learner submits.**
- Certificate: canvas-drawn, learner's name, total time invested, score %, downloads as PNG.
  Unlocks at 75%.
- "Download PDF of my answers": compiles every reflection, checklist, activity result and
  graded answer into one document via jsPDF (loaded from CDN — needs a network connection).

If `localStorage` is unavailable (private window, blocked site data), the app falls back to
in-memory storage and warns the learner that progress will not persist.

---

## Cache busting — important

Every CSS and JS tag in `index.html` carries `?v=N`:

```html
<link rel="stylesheet" href="css/styles.css?v=9">
<script src="js/app.js?v=9"></script>
```

**Bump every `?v=` number on every edit to any CSS or JS file.** GitHub Pages caches
aggressively and a stale file is the single most common cause of "my fix isn't showing up".

```bash
# bump all of them at once (edit the numbers to match)
sed -i '' 's/?v=9"/?v=10"/g' index.html
```

If a change does not appear while testing, **confirm the browser actually loaded the new
file before concluding the code is wrong** — check the Network panel, or run
`[...document.querySelectorAll('script')].map(s => s.src)` in the console.

---

## Local development

No build step. Any static server works:

```bash
python3 -m http.server 8731
```

Then open `http://localhost:8731`. Opening `index.html` directly via `file://` is not
recommended — font loading and `localStorage` behave differently.

---

## Deploying to GitHub Pages

> **GitHub Pages is public.** A Pages site is served to anyone with the URL regardless of
> whether the repository is private, and regardless of paid plan. It will be crawled and
> indexed. Private Pages exists only on GitHub Enterprise Cloud. This course discusses
> caste, civil-war legacy, religion and family circumstances — publish it deliberately.

```bash
gh repo create <name> --public --source=. --push
gh api -X POST repos/<owner>/<name>/pages -f build_type=legacy \
  -F 'source[branch]=main' -F 'source[path]=/'
```

The live URL is `https://<owner>.github.io/<name>/`. First build takes a minute or two.

`.nojekyll` is present so GitHub serves the folder verbatim rather than running Jekyll,
which would otherwise ignore any future directory beginning with an underscore.

---

## QA performed

Tested in a real browser end-to-end, including failure paths:

- Every one of the six activity types clicked through: wrong answers, partial answers,
  empty submits, retries, and successful completion.
- Knowledge check verified to leak **zero** answers before submission; failing score (53%)
  keeps the certificate locked; passing score (100%) unlocks it.
- Certificate renders and exports; answers PDF builds (3 pages, ~21 KB).
- Mid-activity refresh confirmed to restore partial state.
- Mobile viewport (375px): connector lines suppressed where the two columns stack — the
  numbered pair badges carry the same information — and all wide content (dimension grid,
  matrix tables) scrolls inside its own container with no horizontal page overflow.
- Duplicate-label audit across all 24 activities: zero duplicates.
- Fonts verified to render as three genuinely distinct weight files, not synthesised.
- Both home-screen track cards verified against an independent recomputation of progress.

### Bugs found and fixed during QA

- **Hunt activity had three valid answers.** The prompt asked for the "widest spread" and
  accepted only hierarchy (50), but high-context and indirect disagreement were both 52.
  Reframed to "the single highest score on the board" — 88 is a unique maximum.
- **Cross-track progress leak.** `Activities.countFor` read the ambient current track, so
  the home screen — which counts both tracks at once — reported one of them against the
  other's storage. It now takes an explicit track id.
- **Connector lines drew at zero size.** Laid out while the screen was still hidden, every
  rect measured zero. Added `Activities.reflow()` after each screen switch plus a
  zero-size guard that keeps the last good geometry.
- **Class-name collision.** The header's `.tmeta.col` matched the country-column `.col`
  rule and picked up a white card background. Renamed to `.stack`.
- **Sequence order was not persisted until first move.** Now written on first render.

### Known items for a future pass

- **Sri Lanka content is pending SME review by Varun and Dilupa.** Dilani's profile and the
  Sri Lanka scenario material in the Under Pressure and Blind Spots & Practice modules were
  drafted to give Sri Lanka parity with the Philippines and India. Validate before a live
  cohort. The in-course flag on Module 3 says so to the learner too — remove that
  `smenote` block once reviewed.
- Time estimates per module are drafted, not measured against a real cohort.
