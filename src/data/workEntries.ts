export interface WorkEntry {
  slug: string
  title: string
  role: string
  period: string
  roles?: { title: string; period: string }[]
  location: string
  category: 'experience' | 'project'
  accent: string
  logo?: string
  logoWithTitle?: boolean
  image?: string
  oneLiner: string
  overview: string
  context?: string
  problem?: string[]
  process?: string[]
  outcome?: string[]
  retrospective?: string
}

export const workEntries: WorkEntry[] = [
  {
    slug: 'fis',
    title: 'FIS',
    role: 'Software Engineer II',
    period: 'January 2026 – Present',
    location: 'Atlanta, USA',
    category: 'experience',
    accent: '#6f6bff',
    logo: '/logos/fis.png',
    oneLiner:
      'Modernizing a legacy Cards platform from COBOL to Java for a major financial services enterprise.',
    overview:
      'At FIS, I work on modernizing the Cards platform by migrating legacy COBOL components to Java, alongside contributing to AI-driven document anomaly-detection work for customer mailer validation.',
    context:
      'The Cards platform runs on decades-old COBOL, and the team needed to modernize it toward Java without disrupting a live financial-services platform that other systems depend on.',
    problem: [
      'The existing COBOL codebase is difficult to safely extend, and every change carries outsized risk on a platform that processes real financial transactions.',
      'New product and compliance requirements need capabilities the legacy stack can’t support without a structured migration path.',
      'Migration has to happen incrementally, in parallel with the platform staying in production.',
    ],
    process: [
      'Working with the team to identify and prioritize COBOL modules for migration to Java based on risk and business value.',
      'Writing Java services that reproduce legacy behavior and validating them against existing COBOL outputs before cutting traffic over.',
      'Extending the anomaly-detection work from Global Payments toward AFP (Advanced Function Presentation) document processing for mailer validation.',
    ],
    outcome: [
      'Contributing to backend maintainability, scalability, and long-term system reliability improvements on a legacy enterprise platform.',
      'Extending document anomaly-detection work toward AFP processing, building on PDF-based validation workflows.',
      'Delivering production-ready enterprise features in Agile teams, translating business requirements into reliable backend services.',
    ],
    retrospective:
      'Legacy migration work is a different discipline from greenfield development — correctness under strict backward-compatibility constraints matters more than speed, and that tradeoff has shaped how I approach every change here.',
  },
  {
    slug: 'global-payments',
    title: 'Global Payments',
    role: 'Software Engineer Intern',
    period: 'June 2025 – December 2025',
    location: 'Atlanta, USA',
    category: 'experience',
    accent: '#5b8cff',
    logo: '/logos/global-payments.png',
    oneLiner:
      'Cut manual compliance review time by 90%+ with an AI-powered system that catches text overlap and missing values in card mailers before they print.',
    overview:
      'At Global Payments, I built an AI-powered system for customer-facing card mailers that catches two costly quality issues before they reach print: text printed over existing text, and required monetary or percentage fields left blank. It flags and annotates the affected pages automatically, cutting manual compliance review from hours to minutes.',
    context:
      'Unintended irregularities — overlapping text, missing required values — were a recurring quality issue in card mailers, causing reprints and delays. Manual, page-by-page review couldn’t scale to the mailer volume, and any fix had to work on both scanned and native-text PDFs, cheaply enough to run on every batch.',
    problem: [
      'Overprinted or overlapping text often went unnoticed in large batches of documents, and manual QA was too slow and error-prone to reliably catch it at volume.',
      'Critical fields — APR, credit limit, fees — sometimes rendered without a value, and needed to be caught whether they were an inline omission or a missing table entry.',
      'Any solution had to work on both scanned and embedded-text PDFs, since mailers arrived in both forms.',
    ],
    process: [
      'For text-overlap detection, evaluated four approaches before settling on one: a bounding-box comparison of OCR text regions (simple, but failed on scanned PDFs and complex layouts), an OCR heatmap/blur method (fast, but dependent on brittle Tesseract tuning), and unlabeled clustering via autoencoders or SimCLR (needed no labels, but couldn’t reliably tell a real overlay from a legitimately different page design).',
      'Landed on a labeled-reference approach instead: curated a small set of true text-overlay samples, embedded both those and each PDF crop with a pretrained ResNet-50 (2048-dimensional feature vectors, final classification layer removed), and flagged matches above a cosine-similarity threshold.',
      'Built a separate missing-value detector: parsed mailer text and tables with pdfplumber, normalized run-together and line-broken text with wordninja, used regex against a maintained list of critical fields to catch missing $/% values, and verified true monetary/percentage entities with spaCy NER for multi-line cases.',
      'Used PyMuPDF (fitz) to annotate flagged PDFs directly — a sticky note summarizing every detected page plus bookmarks to jump straight to it — and sorted output into good_pdfs/ and bad_pdfs/ folders so reviewers only had to open documents that actually needed attention.',
    ],
    outcome: [
      'Manual compliance review time dropped from 2–3 hours to under 15 minutes.',
      '~95% accuracy detecting text overlays with few false positives, and >90% accuracy identifying missing required fields.',
      'Processed 50MB mailer files in about 3 minutes, with a clear path to further speedup via GPU-accelerated PyTorch and ResNet-50.',
      'Solution integrated into production enterprise systems, not just a research prototype.',
    ],
    retrospective:
      'I went through three progressively more automated approaches — bounding boxes, heatmaps, self-supervised clustering — before the one that actually worked turned out to be the simplest: a small labeled reference set matched by embedding similarity. The fancier unsupervised methods were more interesting to build, but they couldn’t hit the precision a compliance workflow actually needs.',
  },
  {
    slug: 'cognida-ai',
    title: 'Cognida.ai',
    role: 'Software Developer',
    period: 'February 2023 – October 2023',
    roles: [
      { title: 'Software Developer', period: 'August 2023 – October 2023' },
      { title: 'Software Developer Intern', period: 'February 2023 – July 2023' },
    ],
    location: 'Hyderabad, India',
    category: 'experience',
    accent: '#3ecf8e',
    logo: '/logos/cognida-ai.png',
    oneLiner:
      'Built an internal PowerApps tool that streamlined assignment tracking across teams.',
    overview:
      'At Cognida.ai, I built an internal mobile application using Microsoft PowerApps to streamline assignment tracking and status reporting, improving operational efficiency and stakeholder visibility.',
    context:
      'Teams were tracking assignment status through scattered spreadsheets and ad-hoc updates, leaving managers without a reliable, real-time view of where work actually stood.',
    problem: [
      'There was no centralized system for assignment tracking, so status visibility depended on whoever remembered to send an update.',
      'Different teams — product, engineering, design — needed different views of the same underlying data.',
      'The solution needed to ship fast without a full custom application build.',
    ],
    process: [
      'Interviewed stakeholders across teams to understand what "status" needed to mean for each of them.',
      'Built the tracking tool and reporting dashboards in Microsoft PowerApps, iterating directly on stakeholder feedback.',
      'Used client and usage data after launch to identify gaps and prioritize the next round of improvements.',
    ],
    outcome: [
      'Used client and usage data to identify product and workflow improvement opportunities.',
      'Worked with cross-functional teams to translate business requirements into implementable features, user stories, dashboards, and technical deliverables.',
    ],
    retrospective:
      'This was my first real lesson in how much software work is translation — turning what different stakeholders actually need into one coherent tool, not just building what was asked for literally.',
  },
  {
    slug: 'perspectai',
    title: 'PerspectAI',
    role: 'Technical and Inside Sales Intern',
    period: 'July 2022 – October 2022',
    location: 'Hyderabad, India',
    category: 'experience',
    accent: '#ffb03b',
    logo: '/logos/perspectai.png',
    logoWithTitle: true,
    oneLiner:
      'Conducted market research and cross-functional product work as an early-career technical/sales hybrid role.',
    overview:
      'At PerspectAI, I conducted market research to identify target audiences and analyze industry trends, while also collaborating across technical teams spanning testing, development, and design.',
    context:
      'PerspectAI, an early-stage AI company, needed a clearer picture of its target audience and competitive landscape, while its small team meant no one was dedicated to bridging the technical and go-to-market sides of the product.',
    problem: [
      'The team lacked a clear, research-backed view of who the product was actually for and how it compared to alternatives in the market.',
      'As a small team, there was no dedicated role connecting technical development with sales and market positioning.',
    ],
    process: [
      'Conducted market research across the industry to map target audiences and identify relevant trends.',
      'Sat in on and contributed to testing, development, and design discussions to understand the product from the inside out.',
    ],
    outcome: [
      'Learned how extensive market research helps identify relevant target audiences and understand current trends.',
      'Gained hands-on exposure to multiple parts of the product lifecycle by working across testing, development, and design.',
    ],
    retrospective:
      'This role showed me how much technical decisions are shaped by market context — a lesson that has stuck with me in every engineering role since.',
  },
  {
    slug: 'disaster-recognition',
    title: 'Disaster Recognition from Aerial Images',
    role: 'Academic Project',
    period: 'January 2025 – May 2025',
    location: 'NJIT',
    category: 'project',
    accent: '#ff6b6b',
    image: '/projects/disaster-recognition.svg',
    oneLiner:
      'A MobileNetV2-based computer vision pipeline for classifying disaster imagery from aerial photos.',
    overview:
      'Built and evaluated a MobileNetV2-based computer vision pipeline in Python to classify aerial drone imagery into disaster categories, starting from a full exploratory analysis of the AIDER dataset to understand exactly how imbalanced and inconsistent the raw data was before writing any training code.',
    context:
      'Aerial footage from drones is one of the fastest ways to survey a disaster zone, but someone still has to look at every frame and decide what they’re seeing. That’s slow, and it defeats the point of using a drone in the first place if a human has to review the feed frame by frame.',
    problem: [
      'The AIDER dataset is heavily skewed: 4,390 "normal" images against roughly 500 each for fire, flooded areas, collapsed buildings, and traffic incidents — so a naive classifier could score well just by guessing "normal" every time.',
      'Source images ranged from 123×152 pixels up to 5184×3456, shot at inconsistent altitudes and angles, with no uniform size or framing to train on directly.',
      'The model needed to stay lightweight enough to eventually run on UAV hardware, not just perform well on a workstation.',
    ],
    process: [
      'Ran a full EDA on the AIDER dataset first — class counts, image dimensions, format consistency — before touching a model, to actually see the shape of the imbalance rather than assume it.',
      'Rebalanced the training split deliberately: capped normal images at 4,000 and each disaster class at 450 for training, holding out the remainder for testing, instead of training on the raw 9:1 split.',
      'Standardized images to a consistent input size using padding and adaptive resizing rather than stretching, to keep aerial detail intact across wildly different source resolutions.',
      'Applied data augmentation — rotation, flipping, color adjustment — to the underrepresented disaster classes to further offset the imbalance without discarding real data.',
      'Built the classification pipeline around MobileNetV2 for its efficiency, with UAV deployment as the target, not just benchmark accuracy.',
    ],
    outcome: [
      'Landed on a preprocessing and class-balancing pipeline that treats the dataset’s imbalance as a first-class problem rather than an afterthought — the groundwork that determines whether a disaster classifier is actually trustworthy in the field.',
    ],
    retrospective:
      'Doing the EDA properly — actually looking at the class distribution and image size spread before touching a model — made it obvious how much of "model performance" gets decided upstream, in how you handle the data.',
  },
  {
    slug: 'used-cars-price-prediction',
    title: 'Used Cars Price Prediction',
    role: 'Academic Project',
    period: 'August 2024 – December 2024',
    location: 'NJIT',
    category: 'project',
    accent: '#ffd23f',
    image: '/projects/used-cars-price-prediction.svg',
    oneLiner:
      'An eight-model comparison for used car price prediction, with the ensemble models I built and tuned coming out on top.',
    overview:
      'Compared eight regression approaches — from a plain Linear Regression baseline up through Random Forest, XGBoost, LightGBM, and CatBoost — to predict used car prices, handling missing data, feature engineering, and a heavily skewed target variable along the way. I focused on building and tuning the ensemble models, which ended up being the strongest performers in the comparison.',
    context:
      'Used car pricing depends on a mix of factors — mileage, model year, brand, fuel type, condition — that don’t move in a straight line with price, so the real question wasn’t which single model to reach for, it was which approach could actually capture that non-linearity.',
    problem: [
      'A Linear Regression baseline collapsed outright — a negative R² and error values in the trillions — because car pricing just isn’t a linear function of mileage and age.',
      'The target variable, price, was heavily right-skewed: most cars clustered at the low end with a long tail of expensive outliers that could throw off a model trained naively.',
      'With eight model families in the comparison, from Ridge Regression to Neural Networks, the real work was tuning and evaluating each one fairly rather than just picking a favorite.',
    ],
    process: [
      'Built and hyperparameter-tuned the ensemble models — Random Forest, XGBoost, LightGBM, and CatBoost — using grid search to find the right depth, learning rate, and estimator count for each.',
      'Random Forest landed on 100 estimators and a max depth of 30 after tuning; XGBoost’s best configuration (300 estimators, max depth 5, learning rate 0.2) ended up beating every other model in the comparison.',
      'Evaluated every model — from the Linear Regression baseline through the gradient-boosted ones — on the same held-out test set using R², RMSE, and MAE, so the comparison stayed apples-to-apples.',
    ],
    outcome: [
      'XGBoost finished on top across all eight models (R² 0.82), with LightGBM (0.81) and CatBoost (0.80) close behind — the ensemble and gradient-boosted models I worked on comfortably outperformed the linear baselines.',
    ],
    retrospective:
      'Watching a plain Linear Regression fail outright — a negative R² — was the clearest possible argument for why model selection has to follow the actual shape of the data, not just familiarity or convenience.',
  },
  {
    slug: 'ad-maker',
    title: 'AD MAKER',
    role: 'Undergraduate Research Project',
    period: 'January 2022 – December 2022',
    location: 'Mahindra University',
    category: 'project',
    accent: '#ff8bd1',
    image: '/projects/ad-maker.svg',
    oneLiner:
      'A system that turns a product and an emotion into a usable ad concept, combining ConceptNet, emotion-aware filtering, and GPT-3.',
    overview:
      'Ad-Maker is a fourth-year project, built under the supervision of Dr. Sunny Rai, that generates advertisement concepts from just a product and a target emotion. It expands the product into related concepts with ConceptNet, filters them by emotional relevance, and feeds the result to GPT-3 to produce a short, usable ad story.',
    context:
      'Coming up with an ad concept that actually connects with an audience usually starts from a blank page. I wanted to test whether pairing a semantic knowledge graph with a language model could reliably produce a usable starting point from nothing more than a product name and an emotional tone.',
    problem: [
      'Ad ideation is open-ended — a bare product name has to be turned into a concrete, emotionally-targeted concept before it can even be evaluated.',
      'GPT-3 run directly on a product name tends toward generic output, since the model has no signal for the tone the ad should carry.',
      'The large ad dataset I validated against had no existing emotion labels to build on, so it couldn’t be used for emotion filtering as-is.',
      'Any generated concept had to be screened for profanity and offensive language before it could reach a user.',
    ],
    process: [
      'Reviewed prior computational-creativity work — analogical-reasoning tools like the Retriever, metaphor generation for pictorial ads, and explainable computational creativity — to ground the approach before building anything.',
      'Used conceptnet-lite to expand the product into related concepts via relations like used_for, is_a, part_of, and synonym, then scored each candidate against the user’s chosen emotion with NRCLex, which covers 10 emotions versus the 5 offered by text2emotion, the library I tried first.',
      'Built NLP pipelines to tag, semantically filter, and rank the large ad dataset itself, so it could be used both to emotion-label reference ads and to validate generated concepts against real creative direction.',
      'Passed the emotion-filtered concepts, the product, and the target emotion to a few-shot GPT-3 (Da Vinci) model trained on summarized real advertisements, falling back to an unfiltered GPT-3 pass when the emotion filter returned nothing.',
      'Ran every generated output through a profanity-check classifier — a linear SVM trained on 200k labeled samples — before it reached the user.',
      'Tried cosine similarity as an additional filtering step, then dropped it: it was slow to compute and didn’t make the surviving concepts any more novel, so it added cost without improving results.',
    ],
    outcome: [
      'Designed NLP pipelines for the large ad dataset, including emotion tagging, semantic filtering, and content ranking, to improve the relevance of generated ads.',
      'Validated the system against that curated dataset of real commercial ads (objective, emotional tone, and description per ad) and found the generated concepts nearly matched the dataset’s actual creative direction.',
      'The system occasionally surfaced words and angles outside the reference dataset entirely — genuinely novel directions, not just reproductions of known ad patterns.',
    ],
    retrospective:
      'The most useful engineering decision here wasn’t one that made it into the final pipeline — it was dropping cosine similarity after testing showed it didn’t earn its cost. Measuring whether an addition actually helps, and cutting it when it doesn’t, mattered more than stacking on another technique.',
  },
  {
    slug: 'this-portfolio',
    title: 'My Portfolio',
    role: 'Personal Project',
    period: '2026',
    location: 'Self-directed',
    category: 'project',
    accent: '#4fd1c5',
    image: '/projects/this-portfolio.svg',
    oneLiner:
      'A from-scratch React and TypeScript portfolio, including a custom image-processing pipeline for every logo, seal, and signature on it.',
    overview:
      'Built this site itself as a React, TypeScript, and Vite single-page app with a shared dark, monochrome design system, and wrote a from-scratch Python and Pillow image pipeline to turn photographed company logos, a university seal, and my own handwritten signature into clean assets without any design software.',
    context:
      'I wanted a portfolio that felt personally authored rather than a template with my name swapped in — real photos, my real signature, and project visuals grounded in my actual reports, instead of stock icons and lorem-ipsum placeholders.',
    problem: [
      'Every logo I had access to — company logos, a university seal, my own signature — only existed as low-resolution photos with visible paper texture and uneven lighting, not clean vector assets.',
      'I had no access to Photoshop or any paid image-editing tool, and no existing background-removal service I wanted to depend on.',
      'The site needed one consistent visual language — window chrome, browser-style mockups, a shared spacing and color system — reused across a hero, case studies, and a terminal-style skills list without duplicating styles.',
    ],
    process: [
      'Set up the site as a React + TypeScript + Vite SPA with React Router, using CSS custom properties for a shared design system (color tokens, spacing scale, shared radii and shadows) instead of a component library.',
      'Wrote an image-processing pipeline in Python with Pillow and scipy from scratch — chroma-keying by color distance from a sampled background, flood-fill to separate enclosed ink from background on a university seal, median-filter despeckling, and connected-component analysis to strip noise — to turn photographed logos and my signature into clean transparent PNGs.',
      'Iterated the site favicon the same way: processed a photographed hand-drawn monogram down to a raster mark, found it illegible at actual browser-tab size, and replaced it with a simplified two-letter wordmark rendered directly at the target sizes.',
      'Built a reusable window-chrome component for the macOS-style frames used throughout the site, and separately hand-built browser-chrome SVG mockups (tabs, address bar, toolbar) for each project case study.',
      'Added a scroll-driven interaction on the About page — a light reflection across each photo frame that shifts position based on the frame’s location in the viewport as you scroll.',
    ],
    outcome: [
      'Shipped a fully custom portfolio with no template underneath it — every logo, seal, signature, project mockup, and favicon on the site was processed or designed specifically for it.',
    ],
    retrospective:
      'Processing my own photographed logos and signature by hand, instead of grabbing stock icons, is what actually makes the site feel like mine rather than a template with my name swapped in.',
  },
  {
    slug: 'handwriting-font',
    title: 'A Font Made From My Handwriting',
    role: 'Personal Project',
    period: 'July 2026 – Present',
    location: 'Self-directed',
    category: 'project',
    accent: '#a78bfa',
    image: '/projects/handwriting-font.svg',
    oneLiner:
      'Turning my own handwriting into a real, installable typeface — currently in progress, in its own repo.',
    overview:
      'An ongoing project to design a custom font from my own handwriting, distributable as a real TTF/OTF file rather than a font-generator novelty. I built a printable glyph-template tool to capture every character consistently, and I’m taking it through Calligraphr to produce the final font files.',
    context:
      'I wanted a typeface that’s actually mine — not another Google Fonts pick everyone else’s site also uses — and was curious whether turning handwriting into a real, installable font was something I could realistically do myself, end to end.',
    problem: [
      'Font tools generally expect either one full scanned sheet in their own template format, or individually cropped images per glyph — neither of which I had a way to produce yet.',
      'Getting consistent letterforms across 80-plus characters (uppercase, lowercase, digits, punctuation) needed a shared baseline and frame per glyph, not loose handwriting on blank paper.',
      'Needed to decide up front between fully-automatic template tools (fast, less control) and manual per-glyph tools like FontForge (slower, more control) before committing to a workflow.',
    ],
    process: [
      'Built a printable HTML template with a labeled box for every uppercase and lowercase letter, digit, and common punctuation mark, plus instructions for pen and scan quality, published for printing.',
      'Caught and fixed a real bug during review — the quote-mark glyph box was rendering the literal text “&quot;” instead of an actual quote character, since the label logic read it through `textContent` without decoding the HTML entity.',
      'Compared font-creation workflows — Calligraphr’s automatic template versus its manual custom-upload flow, FontForge, Glyphs, and Fontself Maker — and settled on Calligraphr’s manual upload path, since I designed my own template instead of using theirs.',
      'Set up a separate git repository for the project (kept deliberately out of the portfolio repo), and pushed it to a private GitHub repo.',
    ],
    outcome: [
      'Template tool built, reviewed, and published; workflow chosen; repo live on GitHub (private, for now).',
      'Next: print the template, write and scan every glyph, build the font in Calligraphr, and export the TTF/OTF.',
    ],
    retrospective:
      'Catching the escaped quote-mark bug before printing was a good reminder that a template you’re about to fill in by hand, one character at a time, is expensive to redo — worth double-checking every glyph box renders exactly right before a single pen touches paper.',
  },
]

export function getWorkEntry(slug: string) {
  return workEntries.find((entry) => entry.slug === slug)
}
