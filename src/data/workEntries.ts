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
    oneLiner:
      'A MobileNetV2-based computer vision pipeline for classifying disaster imagery from aerial photos.',
    overview:
      'Built and evaluated a MobileNetV2-based computer vision pipeline in Python for aerial disaster image classification, using data augmentation and class balancing to improve model generalization on imbalanced datasets.',
    context:
      'Aerial disaster-imagery datasets are inherently imbalanced — most images show no disaster at all — which biases standard classifiers toward the majority class and hides real performance on the cases that matter most.',
    problem: [
      'Disaster classes were significantly underrepresented compared to normal, no-disaster imagery.',
      'Aerial images vary widely in altitude, lighting, and angle, making generalization difficult for a lightweight model.',
      'The model needed to stay efficient enough to be practical, not just accurate on paper — hence MobileNetV2 over a heavier backbone.',
    ],
    process: [
      'Built the classification pipeline in Python using MobileNetV2 as the backbone for efficiency.',
      'Applied data augmentation and class-balancing techniques to counteract the dataset imbalance.',
      'Evaluated the model across held-out disaster categories to check real generalization, not just aggregate accuracy.',
    ],
    outcome: [
      'Improved model generalization on imbalanced datasets through targeted data augmentation and class balancing.',
    ],
    retrospective:
      'Working with genuinely imbalanced data made clear why raw accuracy is a misleading metric on its own — the augmentation and balancing work mattered more to real performance than architecture tuning did.',
  },
  {
    slug: 'used-cars-price-prediction',
    title: 'Used Cars Price Prediction',
    role: 'Academic Project',
    period: 'August 2024 – December 2024',
    location: 'NJIT',
    category: 'project',
    accent: '#ffd23f',
    oneLiner:
      'An end-to-end ML pipeline predicting used car prices with SHAP-based interpretability.',
    overview:
      'Developed an end-to-end machine learning pipeline for used car price prediction using Random Forest and Gradient Boosting, with feature engineering, preprocessing, and SHAP-based model interpretation.',
    context:
      'Used car pricing depends on many interacting factors — mileage, age, brand, condition — and a price estimate is only useful if people can trust and understand what’s driving it, not just receive a number.',
    problem: [
      'Raw listing data was noisy and inconsistent, requiring significant cleaning and feature engineering before modeling.',
      'A black-box model that only outputs a price isn’t actionable without explaining which factors drove that price.',
      'Needed to compare model families to find the right balance between accuracy and interpretability.',
    ],
    process: [
      'Cleaned and engineered features from raw listing data, handling missing values and categorical variables.',
      'Trained and compared Random Forest and Gradient Boosting models on the processed dataset.',
      'Applied SHAP to break down individual predictions, surfacing which features most influenced any given price estimate.',
    ],
    outcome: [
      'Used SHAP-based interpretation to explain model predictions, not just optimize for accuracy.',
    ],
    retrospective:
      'This project pushed me to treat interpretability as a first-class requirement rather than an afterthought — a model’s explanation is often as valuable as its prediction.',
  },
  {
    slug: 'ad-maker',
    title: 'AD MAKER',
    role: 'Undergraduate Research Project',
    period: 'January 2022 – December 2022',
    location: 'Mahindra University',
    category: 'project',
    accent: '#ff8bd1',
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
]

export function getWorkEntry(slug: string) {
  return workEntries.find((entry) => entry.slug === slug)
}
