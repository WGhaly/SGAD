// ─── SGAD Website — Data Layer ────────────────────────────────────────────────

export type ProjectCategory =
  | "banking"
  | "hospitality"
  | "restaurants"
  | "corporate";

export interface Project {
  slug: string;
  category: ProjectCategory;
  client: string;
  name: string;
  description: string;
  location: string;
  value?: string;
  area?: string;
  duration?: string;
  delivery?: string;
  status: "Completed" | "Ongoing";
  image: string;
  gallery?: string[];
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  highlights?: string[];
  image: string;
  link: string;
}

export interface Client {
  name: string;
  sector: ProjectCategory | "all";
  logo?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
}

export interface Stat {
  value: string;
  suffix: string;
  label: string;
}

// ─── Projects ────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  // Banking
  {
    slug: "egbank-branches",
    category: "banking",
    client: "EGBank",
    name: "EGBank Network Expansion",
    description:
      "Comprehensive fitout of 13 branches across Egypt plus administrative floors and renovation works, establishing a cohesive, modern identity for one of Egypt's leading private banks.",
    location: "Multiple Locations, Egypt",
    value: "351M EGP",
    duration: "36 months",
    delivery: "Turnkey",
    status: "Completed",
    image: "/portfolio/Egbank.jpeg",
    gallery: [
      "/portfolio/Egbank.jpeg",
    ],
    featured: true,
  },
  {
    slug: "aib-branches",
    category: "banking",
    client: "Arab Investment Bank (AIB)",
    name: "AIB Branch Portfolio",
    description:
      "Full interior design and fitout of three prime-location branches — Arabella Plaza, Antoniades Gardens (Alexandria) and Mohi El Din Abu El-Ezz — delivering a premium customer experience aligned with AIB's refined corporate identity.",
    location: "Cairo & Alexandria, Egypt",
    value: "145.5M EGP",
    area: "1,880 sqm",
    duration: "18 months",
    delivery: "Turnkey",
    status: "Completed",
    image: "/portfolio/AIB.jpeg",
    featured: true,
  },
  {
    slug: "fabmisr-branches",
    category: "banking",
    client: "FABMISR",
    name: "FABMISR Cairo Branches",
    description:
      "Two branches for First Abu Dhabi Bank in Egypt — Shams Club Heliopolis and LMD Building One Ninety — balancing the Group's international design standards with a distinctly Egyptian sense of warmth.",
    location: "Cairo, Egypt",
    value: "50.5M EGP",
    duration: "3 months",
    delivery: "Turnkey",
    status: "Ongoing",
    image:
      "https://images.unsplash.com/photo-1565402170291-8491f14678db?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "aaib",
    category: "banking",
    client: "Arab African International Bank (AAIB)",
    name: "AAIB Premium Branch",
    description:
      "Sophisticated interior fitout of the Manshia – Alexandria branch, plus CCTV system integration across new projects with the main control room HQ, reinforcing AAIB's status as a prestige institution.",
    location: "Alexandria, Egypt",
    value: "33.4M EGP",
    area: "580 sqm",
    duration: "8 months",
    delivery: "BOQ",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "adib",
    category: "banking",
    client: "Abu Dhabi Islamic Bank (ADIB)",
    name: "ADIB Egypt Branch",
    description:
      "Complete fitout of ADIB's Mansoura branch incorporating Islamic geometric motifs with contemporary finishes to create a welcoming yet distinguished space.",
    location: "Mansoura, Egypt",
    value: "20M EGP",
    area: "420 sqm",
    duration: "6 months",
    delivery: "Turnkey",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "attijariwafa",
    category: "banking",
    client: "Attijariwafa Bank",
    name: "Attijariwafa Renovation",
    description:
      "Full renovation and rebranding fitout across four branches — El Opera Square, El Khalafawy Shubra, Assuit and Sohag — refreshing Attijariwafa Bank Egypt's network with a bold contemporary design language.",
    location: "Cairo, Assuit & Sohag, Egypt",
    value: "25M EGP",
    duration: "9 months",
    delivery: "Turnkey",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
  },
  // Hospitality
  {
    slug: "casa-cook-el-gouna",
    category: "hospitality",
    client: "Casa Cook / TUI Hotels",
    name: "Casa Cook El Gouna",
    description:
      "Boutique hotel fitout on the Red Sea coast for TUI's lifestyle brand Casa Cook, blending raw natural materials with curated Bohemian-Mediterranean aesthetics.",
    location: "El Gouna, Red Sea, Egypt",
    area: "500 sqm",
    delivery: "Turnkey",
    status: "Completed",
    image: "/portfolio/Casacook.jpeg",
    featured: true,
  },
  {
    slug: "conrad-corniche-nile",
    category: "hospitality",
    client: "Conrad Hotels & Resorts",
    name: "Conrad Corniche Nile",
    description:
      "Interior fitout for Conrad Hotel's riverfront property on the Nile Corniche, marrying five-star luxury with panoramic river views and sophisticated Egyptian craftsmanship.",
    location: "Cairo, Egypt",
    delivery: "Turnkey",
    status: "Completed",
    image: "/portfolio/Conrad.jpeg",
    featured: true,
  },
  {
    slug: "three-corners",
    category: "hospitality",
    client: "Three Corners Hotels",
    name: "Three Corners Rihana Inn – El Gouna",
    description:
      "Complete fitout and furnishing package for Three Corners Rihana Inn, a European hospitality group with a strong Red Sea presence, delivering a relaxed luxury coastal experience.",
    location: "El Gouna, Red Sea, Egypt",
    delivery: "Turnkey",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80",
  },
  // Restaurants
  {
    slug: "mado-concord-plaza",
    category: "restaurants",
    client: "Mado Egypt",
    name: "Mado — Concord Plaza Mall",
    description:
      "Full interior fit-out of the flagship Mado restaurant and patisserie inside Concord Plaza Mall — a Turkish-inspired dessert destination with a refined, welcoming atmosphere.",
    location: "Heliopolis, Cairo, Egypt",
    delivery: "Turnkey",
    status: "Completed",
    image: "/portfolio/MADO.jpeg",
    featured: true,
  },
  {
    slug: "wahet-omar",
    category: "restaurants",
    client: "Wahet Omar",
    name: "Wahet Omar Restaurant",
    description:
      "High-end Egyptian restaurant concept fitout celebrating authentic Levantine cuisine in a setting that fuses oriental architecture with contemporary comfort.",
    location: "Cairo, Egypt",
    delivery: "Turnkey",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  },
  // Corporate
  {
    slug: "edraki-company",
    category: "corporate",
    client: "Edraki Company",
    name: "Edraki Company Fitout",
    description:
      "Complete commercial interior fitout for Edraki Company, delivering a professional workspace that reflects the client's brand identity and operational requirements.",
    location: "Egypt",
    delivery: "Turnkey",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    featured: true,
  },
];

// ─── Category metadata ────────────────────────────────────────────────────────

export const categories: Record<
  ProjectCategory,
  { label: string; description: string; image: string; count: number }
> = {
  banking: {
    label: "Banking & Finance",
    description:
      "Bespoke branch fitouts and headquarters interiors for Egypt's leading financial institutions.",
    image: "/portfolio/Egbank.jpeg",
    count: 6,
  },
  hospitality: {
    label: "Hotels & Hospitality",
    description:
      "Five-star hotel interiors, resort fitouts and hospitality experiences across Egypt.",
    image: "/portfolio/Conrad.jpeg",
    count: 3,
  },
  restaurants: {
    label: "Restaurants & Retail",
    description:
      "Restaurant concepts, cafés and retail environments that bring brands to life through thoughtful space design.",
    image: "/portfolio/MADO.jpeg",
    count: 2,
  },
  corporate: {
    label: "Corporate & Commercial",
    description:
      "Modern workplace fitouts, headquarters and commercial spaces engineered for productivity and brand impact.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    count: 2,
  },
};

// ─── Services ─────────────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    id: "banking",
    title: "Banking & Financial Interiors",
    description: "Turnkey fitouts for banks, branches and financial HQs across Egypt.",
    longDescription:
      "From single-branch upgrades to multi-city network rollouts, SGAD delivers complete interior fitouts for Egypt's most trusted financial institutions. Our end-to-end service covers concept design, project management, specialist joinery, stone and finishes supply, MEP coordination, and final handover — on time, every time.",
    image:
      "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Multi-site rollout management across all governorates",
      "Specialist bank joinery and custom millwork",
      "Marble, stone and premium finishes supply and installation",
      "MEP and security system coordination",
      "Strict timeline and confidentiality protocols",
    ],
    link: "/projects/banking",
  },
  {
    id: "hospitality",
    title: "Hotels & Hospitality",
    description: "Five-star hotel fitouts and resort interiors that define guest experience.",
    longDescription:
      "SGAD brings deep expertise in creating hospitality interiors that balance operational efficiency with emotional impact. Whether a boutique resort on the Red Sea or a flagship Nile-side hotel, we deliver spaces that guests remember — and return to.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Five-star FF&E specification and procurement",
      "Guest room, suite and lobby design",
      "Food & beverage outlet interiors",
      "Back-of-house and operational space planning",
      "Phased handover for live hotel operations",
    ],
    link: "/projects/hospitality",
  },
  {
    id: "restaurants",
    title: "Restaurants & Retail",
    description: "Restaurant concepts and retail environments built to elevate brand identity.",
    longDescription:
      "Great dining and retail spaces tell a story. SGAD's team of designers and craftspeople work closely with operators to translate brand identity into immersive physical spaces — from intimate fine dining venues to large-format mall restaurants and flagship retail stores.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Brand-immersive concept design",
      "Custom joinery, signage and display fixtures",
      "Kitchen and service area fitout",
      "Acoustic treatment and ambient lighting design",
      "Mall landlord liaison and approvals",
    ],
    link: "/projects/restaurants",
  },
  {
    id: "corporate",
    title: "Corporate & Commercial",
    description: "Modern workplace fitouts designed for productivity, culture and brand expression.",
    longDescription:
      "The modern workplace is a powerful tool for attracting talent, reinforcing culture and driving performance. SGAD designs and delivers corporate interiors — from executive headquarters to agile open-plan offices — that align with your business goals and evolving ways of working.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Open-plan and activity-based workspace design",
      "Executive suite and boardroom fitout",
      "AV, IT and smart building infrastructure coordination",
      "Ergonomic furniture specification and procurement",
      "LEED and sustainability considerations",
    ],
    link: "/projects/corporate",
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────

export const stats: Stat[] = [
  { value: "625", suffix: "M+", label: "EGP in Project Value" },
  { value: "6", suffix: "", label: "Banking Institutions Served" },
  { value: "3", suffix: "", label: "Hotel & Resort Projects" },
  { value: "2", suffix: "", label: "Restaurant Concepts" },
  { value: "1", suffix: "", label: "Corporate Fitout" },
  { value: "4", suffix: "", label: "Industry Sectors" },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    quote:
      "SGAD delivered an exceptional fit-out across all 13 of our branches — on budget, ahead of schedule and to a quality that has genuinely elevated how our customers perceive us.",
    author: "Branch Network Director",
    title: "Head of Retail Banking",
    company: "EGBank",
  },
  {
    quote:
      "From the first concept sketch to final handover, SGAD demonstrated a rare combination of design vision and construction discipline. Our Conrad property is proof of that.",
    author: "General Manager",
    title: "Property Operations",
    company: "Conrad Corniche Nile",
  },
  {
    quote:
      "What sets SGAD apart is their understanding of brand. They didn't just fit out our space — they translated the Casa Cook identity into every material, every light fitting, every detail.",
    author: "Regional Development Director",
    title: "TUI Hotels & Resorts",
    company: "Casa Cook El Gouna",
  },
  {
    quote:
      "Working with SGAD felt like a genuine partnership. Their project management was rigorous and the quality of finish across all three branches exceeded our expectations.",
    author: "Head of Real Estate",
    title: "Arab Investment Bank",
    company: "AIB Egypt",
  },
  {
    quote:
      "SGAD understood precisely what we needed — a space that feels welcoming to our clients while reflecting the prestige and heritage of our institution. They delivered exactly that.",
    author: "Chief Operating Officer",
    title: "AAIB",
    company: "Arab African International Bank",
  },
];

// ─── Clients ─────────────────────────────────────────────────────────────────

export const clients: Array<{ name: string; sector: ProjectCategory }> = [
  // Banking — confirmed from portfolio
  { name: "EGBank", sector: "banking" },
  { name: "Arab Investment Bank", sector: "banking" },
  { name: "FABMISR", sector: "banking" },
  { name: "AAIB", sector: "banking" },
  { name: "ADIB Egypt", sector: "banking" },
  { name: "Attijariwafa Bank", sector: "banking" },
  // Hospitality — confirmed from portfolio
  { name: "Casa Cook", sector: "hospitality" },
  { name: "Conrad Hotels", sector: "hospitality" },
  { name: "Three Corners", sector: "hospitality" },
  // Restaurants — confirmed from portfolio
  { name: "Mado Egypt", sector: "restaurants" },
  { name: "Wahet Omar", sector: "restaurants" },
  // Corporate — confirmed from portfolio
  { name: "Edraki Company", sector: "corporate" },
];

// ─── Hero slides ──────────────────────────────────────────────────────────────

export const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=2000&q=85",
    headline: "Banking Interiors\nBuilt for Trust",
    sub: "Egypt's leading fitout contractor for financial institutions.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85",
    headline: "Hospitality Spaces\nGuests Remember",
    sub: "Five-star hotel interiors from the Red Sea to the Nile.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=85",
    headline: "Restaurants That\nTell a Story",
    sub: "Dining environments designed to elevate every occasion.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85",
    headline: "Workplaces That\nInspire Excellence",
    sub: "Corporate fitouts engineered for culture and performance.",
  },
];
