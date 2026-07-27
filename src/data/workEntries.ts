export interface WorkEntry {
  slug: string
  title: string
  role: string
  period: string
  location: string
  category: 'experience' | 'project'
  accent: string
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
    slug: 'global-payments',
    title: 'Global Payments',
    role: 'Software Engineer Intern',
    period: 'June 2025 – December 2025',
    location: 'Atlanta, USA',
    category: 'experience',
    accent: '#5b8cff',
    oneLiner:
      'Cut manual compliance review time by 90%+ with an AI-powered anomaly detection pipeline.',
    overview:
      'At Global Payments, I built an AI-powered anomaly detection system for customer-facing mailer documents — catching layout issues, text overlap, and missing values in semi-structured PDFs and HTML templates before they reached customers, cutting manual compliance review from hours to minutes.',
    context:
      'Every customer mailer — statements, notices, and other compliance-sensitive documents — had to be manually reviewed for formatting errors, missing data, and layout problems before going out. That process consumed 2–3 hours per review cycle and didn’t scale with mailer volume.',
    problem: [
      'Mailer documents were semi-structured (PDFs and HTML templates), so issues could show up as subtle text overlaps, layout shifts, or silently missing values — not always obvious to catch programmatically.',
      'Manual review was slow and inherently inconsistent, since different reviewers could catch different issues.',
      'Any solution had to reach production-ready reliability, since it would gate real customer-facing communications in a compliance-sensitive financial context.',
    ],
    process: [
      'Built Python-based ML pipelines targeting the three main anomaly categories the team cared about most: text overlap, layout issues, and missing values in semi-structured documents.',
      'Worked closely with engineers and stakeholders to shape what "correct" looked like for each document type, since compliance requirements varied across mailer formats.',
      'Iterated on detection accuracy and integrated the pipeline into production enterprise systems using Agile development practices, testing against real mailer data before rollout.',
    ],
    outcome: [
      'Manual compliance review time dropped from 2–3 hours to under 15 minutes.',
      'Anomaly detection time cut by 90%+.',
      '95% detection accuracy achieved across the targeted anomaly types.',
      'Solution integrated into production enterprise systems, not just a research prototype.',
    ],
    retrospective:
      'The biggest lesson wasn’t about model sophistication — it was that a well-scoped ML pipeline earns trust by being reliable enough that a human reviewer can lean on it, not by being clever.',
  },
  {
    slug: 'fis',
    title: 'FIS',
    role: 'Software Engineer II',
    period: 'January 2026 – Present',
    location: 'Atlanta, USA',
    category: 'experience',
    accent: '#6f6bff',
    oneLiner:
      'Modernizing a legacy Cards platform from COBOL to Java for a major financial services enterprise.',
    overview:
      'At FIS, I work on modernizing the Cards platform by migrating legacy COBOL components to Java, alongside contributing to AI-driven document anomaly-detection work for customer mailer validation.',
    outcome: [
      'Contributing to backend maintainability, scalability, and long-term system reliability improvements on a legacy enterprise platform.',
      'Extending document anomaly-detection work toward AFP processing, building on PDF-based validation workflows.',
      'Delivering production-ready enterprise features in Agile teams, translating business requirements into reliable backend services.',
    ],
  },
  {
    slug: 'cognida-ai',
    title: 'Cognida.ai',
    role: 'Software Developer / Software Developer Intern',
    period: 'February 2023 – October 2023',
    location: 'Hyderabad, India',
    category: 'experience',
    accent: '#3ecf8e',
    oneLiner:
      'Built an internal PowerApps tool that streamlined assignment tracking across teams.',
    overview:
      'At Cognida.ai, I built an internal mobile application using Microsoft PowerApps to streamline assignment tracking and status reporting, improving operational efficiency and stakeholder visibility.',
    outcome: [
      'Used client and usage data to identify product and workflow improvement opportunities.',
      'Worked with cross-functional teams to translate business requirements into implementable features, user stories, dashboards, and technical deliverables.',
    ],
  },
  {
    slug: 'perspectai',
    title: 'PerspectAI',
    role: 'Technical and Inside Sales Intern',
    period: 'July 2022 – October 2022',
    location: 'Hyderabad, India',
    category: 'experience',
    accent: '#ffb03b',
    oneLiner:
      'Conducted market research and cross-functional product work as an early-career technical/sales hybrid role.',
    overview:
      'At PerspectAI, I conducted market research to identify target audiences and analyze industry trends, while also collaborating across technical teams spanning testing, development, and design.',
    outcome: [
      'Learned how extensive market research helps identify relevant target audiences and understand current trends.',
      'Gained hands-on exposure to multiple parts of the product lifecycle by working across testing, development, and design.',
    ],
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
    outcome: [
      'Improved model generalization on imbalanced datasets through targeted data augmentation and class balancing.',
    ],
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
    outcome: [
      'Used SHAP-based interpretation to explain model predictions, not just optimize for accuracy.',
    ],
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
      'An ad-concept generation system combining GPT-3, ConceptNet, and emotion-aware NLP.',
    overview:
      'Built an interactive ad-generation system that uses GPT-3, ConceptNet, and NRCLex to generate ad concepts given a product type and emotional tone.',
    outcome: [
      'Designed NLP pipelines for large ad datasets, including emotion tagging, semantic filtering, and content ranking to improve relevance of generated ads.',
    ],
  },
]

export function getWorkEntry(slug: string) {
  return workEntries.find((entry) => entry.slug === slug)
}
