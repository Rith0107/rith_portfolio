# Brag Plan: Rithwik Lagishetty — Portfolio

## What is this app?
A personal portfolio site for a software engineer, styled as a set of dark
macOS windows, that hides a fully playable Pac-Man game behind a tiny sprite
running along the top of the hero window.

## The angle
This isn't a landing page pretending to be a product — it's a real, working
site with a genuine surprise built into it. The angle is a calm, confident
portfolio tour that quietly escalates: clean design system, real project
work, and then — without warning — an actual arcade game opens on top of it.
The joke (if there is one) is that a portfolio site had no business being
this fun to poke at.

## Hook (first 2-3 seconds)
The hero headline slams onto the dark WindowFrame card: "I build reliable
systems & AI-powered tools." — the italic half already carries a soft
gradient glow in the real UI. Traffic-light dots visible top-left, grounding
it as a "window" immediately.

## Key moments (the middle)
- The same macOS window-chrome (red/yellow/green traffic lights) reused
  across the hero, the project cards, and the resume viewer — "one motif,
  everywhere," not a one-off hero decoration.
- The project grid: three cards reveal one by one, each showing a real,
  specific technical visual (a confusion matrix, a predicted-vs-actual
  scatter plot, a generation pipeline diagram) — not generic dashboard
  mockups.

## Outro / punchline
Wordmark "Rithwik Lagishetty" settles on screen with a light line underneath:
"A portfolio with a boss level." Quiet, warm, a little proud of itself —
never explains the joke further than that.

## User flow worth showing
The centerpiece. Entry → key action → result, all real UI:
1. **Entry:** a tiny Pac-Man sprite is already chomping its way along the top
   edge of the hero window frame.
2. **Key action:** cursor clicks the sprite. A hand-drawn comic speech bubble
   pops up next to the click point: "Wanna play a game?" with "Yeah" / "Nah"
   buttons. Cursor clicks "Yeah."
3. **Result:** a full modal opens — a generated maze, two ghosts, a HUD
   reading "Score 0" / "Lives" with three heart icons, Pac-Man mid-chomp in
   the corner. It's a real, playable game, not a screenshot.

## Tone
- Preset: `default`
- Creative direction: a clean, confident portfolio tour that turns into a
  surprise arcade reveal — the fun is earned by the calm setup before it.
- Interpretation: warm and postable, not a parody. Comfortable pacing (4-5
  scenes, 3-5s each) so the design work gets to breathe before the game
  reveal lands. Light punchline at the outro, never overplayed.

## Format: landscape — 1920x1080
## Duration: 20s target

## Visual identity (from the project)
- Background: `#0a0a0b` (near-black), elevated surfaces `#141416` / `#1c1c1f`
- Accent: soft white glow (`rgba(255,255,255,0.35)` text-shadow on headlines),
  teal `#4fd1c5` used sparingly for live/status accents
- Text: primary `#f2f2f3`, secondary `#a3a3a8`, muted `#6b6b70`
- Display font: Inter (weights 500-700) for UI; "Press Start 2P" (bundled
  Google Font) for the Pac-Man modal's title specifically — a nice beat to
  echo in the reveal moment
- Strongest visual element: the reused macOS window-chrome (traffic-light
  dots) — it's the one visual thread tying the whole site, and the game,
  together

## Share copy (draft)
Built my portfolio to look like a stack of dark macOS windows — then hid a
fully playable Pac-Man behind one of them.

## Audio direction
- Role: warm, clean bed — restrained until the reveal, then a single bright accent
- Music: `happy-beats-business-moves-vol-1-by-ende-dot-app.mp3` (120 BPM, clean/upbeat, bundled preset available)
- Music treatment: enters low under Scene 1, sits steady through Scenes 2-3, a small lift going into Scene 4, outro lands on a strong beat rather than fading mid-line
- Music cue guidance: preset tempo 120.19 BPM. Strong-cue cluster at 17.02s/17.52s/18.52s/20.02s is right where the outro wordmark should land — target ~17.5-18s for "Rithwik Lagishetty" settling in. No dense sequential-reveal beat-snapping needed; the project-card reveals in Scene 3 can loosely follow the beat grid without needing tight sync.
- Audio-reactive treatment: subtle only — the headline's existing glow may breathe faintly with the beat in Scene 1; nothing audio-reactive elsewhere.
- SFX posture: sparse. A soft UI click on the Pac-Man sprite tap, and one bright 8-bit-style sting/coin-ding the instant the game modal opens — the one moment worth spending a distinctive sound on, since the real product already leans into "Press Start 2P" retro-arcade styling there.
- Audio-coupled moments: the speech-bubble pop-in on click; the 8-bit sting on modal-open; optionally a soft "settle" tick as each project card lands in Scene 3.
- Restraint rule: no chiptune loop, no waveform bars, no audio-reactive flashing. One accent sound earns the reveal — the bed stays clean everywhere else.

## Storyboard

### Scene 1 — Hook — 3.5s
The hero WindowFrame card, dark background, traffic-light dots top-left. The
headline "I build reliable systems & AI-powered tools." slams in, with the
italic "AI-powered tools" carrying its real soft white glow.
Sequential/interaction: none
Audio intent: calm confidence, not urgency — the bed just starts
Audio-coupled idea: none
Music: bed enters low
Transition mood: clean crossfade → Scene 2

### Scene 2 — Design system — 4s
Quick cut between three real UI moments that all share the same traffic-light
window chrome: the hero card, a project card, the resume viewer frame. Short
label: "One window, everywhere."
Sequential/interaction: none (three quick holds, not a reveal sequence)
Audio intent: light, propulsive — bed settles into its groove
Audio-coupled idea: soft whoosh on each of the three cuts
Music: steady
Transition mood: clean wipe → Scene 3

### Scene 3 — Real project work — 4.5s
Three project cards reveal one by one: Disaster Recognition (confusion
matrix visual), Used Cars Price Prediction (predicted-vs-actual scatter
plot), Ad Maker (generation pipeline diagram). Label: "Real report visuals.
Not stock mockups."
Sequential/interaction: yes — 3 cards arrive one by one, each with a soft
settle tick
Audio intent: matter-of-fact pride, not a hard sell
Audio-coupled idea: soft settle tick per card arrival, loosely on the beat grid
Music: steady, minor lift starting near the end of this scene
Transition mood: clean crossfade → Scene 4

### Scene 4 — The reveal (user flow centerpiece) — 5.5s
Entry: the tiny Pac-Man sprite chomps along the top edge of the hero window.
Key action: cursor clicks it; a comic speech bubble pops in — "Wanna play a
game?" with Yeah/Nah buttons; cursor clicks "Yeah." Result: the game modal
opens full — generated maze, two ghosts, HUD reading "Score 0" and three
heart-icon lives, Pac-Man mid-chomp.
Sequential/interaction: yes — simulate the click on the sprite, the bubble
pop-in, then the click on "Yeah"
Audio intent: playful surprise — this is the beat the whole video built toward
Audio-coupled idea: soft click on the sprite tap; bright 8-bit sting the
instant the modal opens
Music: small lift/brightening under the modal-open moment
Transition mood: soft hold → Scene 5

### Scene 5 — Outro / punchline — 2.5s
"Rithwik Lagishetty" wordmark settles center, then the line "A portfolio with
a boss level." underneath. Landed on/near the strong-beat cluster (~17.5-18s).
Sequential/interaction: none
Audio intent: warm settle, confident close
Audio-coupled idea: none
Music: outro lands on a strong beat, then a clean fade
Transition mood: soft hold → end

**Music mood for this video:** upbeat, clean, confident — never dense or chaotic
**Audio summary:** a restrained, warm bed for most of the video with one bright, well-earned accent right as the hidden game reveals itself, then a clean settle on the outro.
