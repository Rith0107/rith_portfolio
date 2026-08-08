# Hyperframes Composition Brief: Rithwik Lagishetty — Portfolio

## Objective
Create a short launch-style brag video for a personal software-engineer
portfolio site — a dark, macOS-window-styled site that hides a fully
playable Pac-Man game behind a sprite on the hero window.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: ~20 seconds

## Source Material
- Project root: `/Users/rithwiklagishetty/Desktop/Rith-portfolio`
- Primary files read: `index.html`, `src/index.css`, `README.md`, `src/pages/Home.tsx`, `src/components/PacmanEasterEgg.tsx`, `src/components/PacmanGame.tsx`, `public/projects/*.svg`
- Product name: Rithwik Lagishetty (portfolio site)
- Tagline / strongest claim: "I build reliable systems & AI-powered tools."
- Key UI or visual moment to recreate: the Pac-Man discovery flow — sprite
  running along the hero window's top edge → click → speech bubble → modal
  opens on a real maze with ghosts and a HUD
- Copy that must appear verbatim:
  - "I build reliable systems & AI-powered tools."
  - "Wanna play a game?"
  - "One window, everywhere."
  - "Real report visuals. Not stock mockups."
  - "A portfolio with a boss level."

## Creative Direction
- Tone preset: default
- Creative direction: a clean, confident portfolio tour that turns into a surprise arcade reveal
- Interpretation: warm, postable, comfortable pacing (5 scenes, 3-5.5s each) — let the design work breathe before the game reveal lands; the punchline stays light, never overplayed
- Angle: this isn't a landing page pretending to be a product — it's a real, working site with a genuine surprise. The video plays it calm and confident, then lets the hidden game land as the payoff.
- Hook: headline "I build reliable systems & AI-powered tools." slams onto the dark WindowFrame hero card, italic half already carrying its real soft glow
- Outro / punchline: "Rithwik Lagishetty" wordmark settles, then "A portfolio with a boss level."
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign — reuse the site's actual dark/monochrome system, not a new palette

## Visual Identity
- Background: `#0a0a0b` (near-black); elevated surfaces `#141416` / `#1c1c1f`
- Text: primary `#f2f2f3`, secondary `#a3a3a8`, muted `#6b6b70`
- Accent: soft white glow (headline text-shadow), teal `#4fd1c5` for small status/live accents
- Display font: Inter (500-700 weight); "Press Start 2P" for the Pac-Man modal title specifically
- Visual references from the project: macOS traffic-light window chrome (red/yellow/green dots, reused everywhere), the hand-built SVG project mockups in `public/projects/`, the Pac-Man modal's HUD (Score / Lives with heart icons) and comic speech bubble

## Storyboard
Use the storyboard in `brag-output/brag-plan.md` as the creative contract.

Scene summary:
1. Hook — 3.5s — headline slams onto the hero WindowFrame, traffic lights visible
2. Design system — 4s — three quick cuts (hero / project card / resume viewer) all sharing the same window chrome, label "One window, everywhere."
3. Real project work — 4.5s — 3 project cards reveal one by one (confusion matrix, scatter plot, pipeline diagram), label "Real report visuals. Not stock mockups."
4. The reveal (centerpiece) — 5.5s — Pac-Man sprite runs on the hero window → click → speech bubble "Wanna play a game?" → click Yeah → game modal opens (maze, ghosts, HUD)
5. Outro — 2.5s — wordmark + "A portfolio with a boss level."

## Audio
- Audio role: warm, clean bed; restrained until the reveal, then a single bright accent
- Audio arc: bed enters low under Scene 1, steady through 2-3, small lift into Scene 4's reveal, clean settle on the outro
- Music: `happy-beats-business-moves-vol-1-by-ende-dot-app.mp3`
- Music treatment: enter low, steady mid-video, small lift going into Scene 4, outro lands on a strong beat rather than fading mid-line
- Music cue guidance: bundled preset, tempo 120.19 BPM. Strong-cue cluster at 17.02/17.52/18.52/20.02s — target the outro wordmark landing around 17.5-18s. Full cue JSON at `~/.claude/skills/brag/assets/music/cues/happy-beats-business-moves-vol-1-by-ende-dot-app.music-cues.json`.
- Audio-reactive treatment: subtle only — headline glow in Scene 1 may breathe faintly with the beat; nothing elsewhere
- Audio-coupled moments:
  - Scene 3 card arrivals — soft settle tick per card, loosely on the beat grid
  - Scene 4 sprite click — soft UI click
  - Scene 4 modal open — one bright 8-bit-style sting/coin-ding (the single audio highlight of the video)
- SFX selection guidance: keep it sparse everywhere except the modal-open sting; card ticks and the click should be quiet, polished, not arcade-y themselves — save the retro/8-bit character for the one sting
- SFX analysis guidance: use `~/.claude/skills/brag/assets/sfx/sfx-analysis.md` if present; prefer low high-frequency-risk sounds for the repeated card ticks
- Exact SFX choice: Hyperframes to choose exact files/timestamps/volume based on the implemented animation
- Audio files: copy chosen music (and any SFX Hyperframes selects) into `brag-output/composition/assets/`

## Hyperframes Instructions
Load native Hyperframes conventions (composition structure, `data-*` timing
attributes, GSAP animation, rendering/check/lint) via `hyperframes docs` —
the companion domain skills aren't installed in this environment, so `docs`
is the source of truth here. This is its own workflow, not the generic
promo/launch-video path.

Requirements:
- Show at least one real UI/visual element from the source project (the
  Pac-Man reveal and the real project-card art both qualify).
- Keep all text readable in the final render.
- Keep the video within 15-25 seconds (target ~20s).
- Include the planned music/SFX layer.
- Treat cue metadata as optional timing hints; prioritize readability and
  pacing over strict beat-locking.
- Use 1-3 strong-cue locks max; snap Scene 3's sequential card reveals to
  the beat grid loosely, not tightly if it hurts readability.
- Use local assets for audio.
- Run `hyperframes check` before render.
