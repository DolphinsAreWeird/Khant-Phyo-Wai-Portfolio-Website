// Everything the page says lives here, so updating the site means editing
// this file, not the components. Facts come from Khant's project knowledge
// base (~/Documents/Project Knowledge Base); keep them in sync with it.
//
// House style: British spelling, contractions, plain verbs, specifics over
// adjectives. No "not X but Y" contrasts, no bold lead-ins, no em dashes.
// Say less up front; detail goes behind an expand.

export const profile = {
  name: "Khant Phyo Wai",
  nickname: "KP",
  email: "kelvinwai.khantphyo@gmail.com",
  url: "https://khantphyowai.vercel.app",
  links: {
    linkedin: "https://www.linkedin.com/in/khant-phyo-wai/",
    github: "https://github.com/DolphinsAreWeird",
    instagram: "https://www.instagram.com/khant_p_wai/",
  },
};

// Job titles Khant would answer to, best fit first. The page shows the first
// few and ends the list with "or anything".
export const openTo = [
  "Forward deployed engineer",
  "System architect",
  "AI architect",
  "Solutions architect",
  "Product manager",
  "Technical product manager",
  "Project manager",
  "Technical programme manager",
  "Solutions engineer",
  "Applied AI engineer",
  "AI consultant",
  "Founding engineer",
  "Chief of staff",
  "Business analyst",
];

export type Fact = { term: string; detail: string };

export const facts: Fact[] = [
  { term: "Now", detail: "Co-founder, director and CFO, Sonar AI" },
  { term: "Studying", detail: "AI and Computer Engineering, CMKL University. Graduating May 2027, QPA 3.78" },
  {
    term: "Results",
    detail: "Won True Alpha 2026 with my intern team. 1st at Beyond Green Hackathon 2025. 2nd at CIIM NEXT GEN CREATORS 2026. 3rd in the AI track at U-Hackathon 2026",
  },
  { term: "Languages", detail: "Burmese, English (IELTS 8.0), some Thai and Mandarin" },
];

// What Khant is carrying this semester, shown as a process list.
export type Process = { name: string; status: "Running" | "Done"; detail: string };

export const running: Process[] = [
  { name: "Sonar AI", status: "Running", detail: "Co-founder and CFO, in our first months after launch." },
  { name: "Honours thesis", status: "Running", detail: "Can Wikipedia traffic predict library borrowing? Final test in December." },
  { name: "Athena", status: "Running", detail: "Research project: one approved source for CMKL's handbooks and chatbot." },
  { name: "LAB404", status: "Running", detail: "Project manager since 2024. Just built an app that teaches RL to high-schoolers." },
  { name: "Classes", status: "Running", detail: "A full fourth-year load. QPA 3.78." },
  { name: "Competitions", status: "Running", detail: "About twenty in 2026. Latest: 3rd of almost 400, built in 24 hours." },
  { name: "True Alpha internship", status: "Done", detail: "Led five interns at True Corporation. We won." },
];

export type Principle = {
  title: string;
  body: string;
  seenIn: { label: string; href: string }[];
};

// A real sequence: this is the order Khant works in.
export const principles: Principle[] = [
  {
    title: "Find the real problem first",
    body: "My favourite part. Argus started as an in-cabin translation idea until I noticed the brief was about airports, and translation is an airline's problem. The research sprint I'm running at Sonar is called Finding the Real Problem, for a reason.",
    seenIn: [
      { label: "Argus AI", href: "#argus" },
      { label: "Sonar AI", href: "#sonar" },
    ],
  },
  {
    title: "Work out the system and the numbers together",
    body: "Every architecture I sketch has a money model next to it. RoomWitness breaks even at about 177 paid cases a month; a Seamless cart pays back its hardware in nine months. When the numbers don't work, I change the design.",
    seenIn: [
      { label: "RoomWitness", href: "#roomwitness" },
      { label: "Seamless", href: "#seamless" },
    ],
  },
  {
    title: "Argue with the plan, especially mine",
    body: "I fact-checked the RoomWitness pitch before a judge could, then put the idea in front of a mock panel. Their verdict moved the bill from renters to landlords.",
    seenIn: [{ label: "RoomWitness", href: "#roomwitness" }],
  },
  {
    title: "Let good people build it",
    body: "On Team NamjaiX I set the stack and sketch the architecture, and Tuey and Beam write most of the code. I want a plan so clear that nobody needs me in the room, with each person on the part they're best at.",
    seenIn: [
      { label: "RoomWitness", href: "#roomwitness" },
      { label: "Argus AI", href: "#argus" },
    ],
  },
  {
    title: "Get it shipped",
    body: "Deadlines are the one thing I don't argue with. Four of us built Icarus in 24 hours and placed 3rd out of almost 400 people. This semester I'm carrying six things at once and none of them has slipped.",
    seenIn: [
      { label: "Currently running", href: "#now" },
      { label: "Icarus", href: "#more" },
    ],
  },
];

export type Stage =
  | {
      label: string;
      detail?: string;
      kind?: "input" | "step" | "gate" | "output";
    }
  | { group: { label: string; detail?: string }[] };

// Each project has its own colour, used for its card, diagram and links.
export type ProjectColor = { light: string; dark: string };

export type CaseStudy = {
  id: "sonar" | "roomwitness" | "argus" | "cadence" | "seamless";
  name: string;
  color: ProjectColor;
  summary: string;
  // Shown on the card.
  card: Fact[];
  // Shown inside the expanded decision record.
  context: Fact[];
  problem: string;
  pipelineTitle: string;
  pipeline: Stage[];
  decisions: string[];
  myPart: string;
  outcome: string;
  stack?: string;
  links: { label: string; href: string }[];
  privateNote?: string;
  aside: string;
  visualCaption: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "sonar",
    name: "Sonar AI",
    color: { light: "#16809d", dark: "#5cc6e2" },
    summary: "Thai audiobooks voiced by AI and checked by human editors. I co-founded it.",
    card: [
      { term: "My job", detail: "Co-founder, director and CFO" },
      { term: "When", detail: "2024 to now" },
      { term: "Status", detail: "App live on iOS and Android" },
    ],
    context: [
      { term: "Team", detail: "4 co-founders, plus staff" },
      { term: "Started as", detail: "A CMKL class project in 2024; a company since Oct 2025" },
    ],
    problem:
      "Recording one Thai audiobook with a human narrator takes three to four weeks, so very few get made. The project began with blind readers, who were waiting longest. Sonar's bet is that AI voices plus human editors can turn a book around in days.",
    pipelineTitle: "How a book becomes an audiobook",
    pipeline: [
      { label: "A book", detail: "Licensed, or public domain", kind: "input" },
      { label: "Director model", detail: "Gives each character a voice", kind: "step" },
      { label: "AI narration", detail: "Gemini TTS and our own Thai models", kind: "step" },
      { label: "Evaluator model", detail: "Flags bad takes", kind: "step" },
      { label: "Human editors", detail: "Check every book before release", kind: "gate" },
      { label: "Sonar app", detail: "Per book or by subscription", kind: "output" },
    ],
    decisions: [
      "In March 2025, before we were a company, I wrote the team's first five-year NPV model. It made the case for selling to businesses first.",
      "Before we picked a voice engine I benchmarked more than ten Thai text-to-speech models on real audiobook passages, then costed Gemini's voices against running our own.",
      "This October I'm running a three-week user research sprint to decide what the app fixes next. The decision rules went in writing before the first session, so the data can't flatter us.",
    ],
    myPart:
      "I've been on Sonar since the student proposal in September 2024. Before the company existed I built its first website, scouted voice models and wrote to Perkins School for the Blind, who said they'd be delighted to work with us. Since we incorporated I've run finance, and I built the ERP system the company runs on.",
    outcome:
      "Sonar won the Beyond Green Hackathon in 2025, went through CMKL's Startup Studio and the Zero to One accelerator, and launched its app in July 2026.",
    links: [{ label: "sonaraudiobooks.com", href: "https://sonaraudiobooks.com/" }],
    aside: "Sonar started as a class assignment. Technically I still haven't handed it in.",
    visualCaption: "The Sonar app's home and player screens, and me next to an early Sonar poster.",
  },
  {
    id: "roomwitness",
    name: "RoomWitness",
    color: { light: "#2b8452", dark: "#6fcf97" },
    summary: "AI that helps Thai renters win back their deposits. My idea; I led the team.",
    card: [
      { term: "My job", detail: "Team lead and system architect" },
      { term: "When", detail: "May to Oct 2026" },
      { term: "Status", detail: "Live on AWS; NTT DATA results in Nov" },
    ],
    context: [
      { term: "Team", detail: "3 people" },
      { term: "For", detail: "BDI Hackathon 2026, then NTT DATA Digital Innovation Challenge 2026" },
    ],
    problem:
      "Bangkok renters often lose part of a one- or two-month deposit to deductions they could legally dispute. Thailand tightened the rules in 2025, but most renters don't know the process and can't write a formal complaint in Thai.",
    pipelineTitle: "Four agents, one claim",
    pipeline: [
      { label: "Photos, lease and chats", detail: "Move-in and move-out photos, the contract", kind: "input" },
      {
        group: [
          { label: "Agent 1: photos", detail: "Damage or normal wear" },
          { label: "Agent 2: contract", detail: "Clauses the 2025 rules void" },
        ],
      },
      { label: "Agent 3: the law", detail: "Civil Code §537–571", kind: "step" },
      { label: "Agent 4: letters", detail: "Formal Thai PDFs", kind: "step" },
      { label: "Renter approves", detail: "Nothing goes out without a yes", kind: "gate" },
      { label: "A claim they can file", kind: "output" },
    ],
    decisions: [
      "I split the work across four small agents, each with one job and an output we could check. Every deduction in the final letter comes back marked lawful, disputed or unlawful, with the statute text attached.",
      "Before the second competition I fact-checked our own pitch. One statistic had no source, so it went, and the complaint timeline changed from 4–8 weeks to the real 2–6 months.",
      "A mock panel of a judge, a sceptic, a lawyer, a renter, a landlord and the regulator moved the bill: the renter app stays free, and the money comes from landlords with three or more units.",
    ],
    myPart:
      "The idea was mine. I led the team, picked the stack, designed the agents and wrote the first two along with the legal corpus, plus the validation research and the 24-month financial model. Tuey and Beam wrote most of the production code.",
    outcome:
      "Entered at BDI 2026, then moved to Amazon Bedrock and deployed on AWS for NTT DATA, with renter approval and audit logs added for responsible AI.",
    stack: "Next.js, Express, FastAPI, Typhoon v2, ChromaDB, Amazon Bedrock, ECS Fargate",
    links: [{ label: "Code on GitHub", href: "https://github.com/DolphinsAreWeird/RoomWitness" }],
    aside: "I argued with our own pitch deck. The deck lost.",
    visualCaption: "A sample case: the verdict screen on desktop and the landlord view on a phone.",
  },
  {
    id: "argus",
    name: "Argus AI",
    color: { light: "#a86b00", dark: "#f2b544" },
    summary: "Turns airport CCTV into a short list of incidents worth a guard's attention.",
    card: [
      { term: "My job", detail: "System architect; my idea" },
      { term: "When", detail: "Sep to Oct 2026" },
      { term: "Status", detail: "Results due end of Oct" },
    ],
    context: [
      { term: "Team", detail: "3 people" },
      { term: "For", detail: "SKY Innovation Spark 2026, run by airport systems firm SKY ICT" },
    ],
    problem:
      "CCTV operators lose focus after about 20 minutes of watching, and Suvarnabhumi alone handled 62.9 million passengers in 2025. Argus watches every feed and hands a guard the few that need a human, with the passenger record attached.",
    pipelineTitle: "From camera to a guard's screen",
    pipeline: [
      { label: "CCTV feeds", detail: "Cameras the airport already has", kind: "input" },
      { label: "Detection", detail: "YOLOv8: people and bags", kind: "step" },
      { label: "Tracking", detail: "ByteTrack between frames", kind: "step" },
      { label: "Rules engine", detail: "Bags, zones, crowding", kind: "step" },
      { label: "Passenger lookup", detail: "Who checked in nearby", kind: "step" },
      { label: "Guard dashboard", detail: "A person makes the call", kind: "output" },
    ],
    decisions: [
      "I dropped my first idea, in-cabin translation, because that's airline territory and the brief was about airports.",
      "I pushed the team from one vague \"suspicious\" flag to ten named categories in tiers: three to build now, three stretch goals, one for later and three open research problems. That kept the pitch honest about what the prototype could do.",
      "Guards stay in charge, and the system only flags and explains. The airport's own passenger data is the thing no outside CCTV vendor can offer, so the design leans on it.",
    ],
    myPart:
      "The problem, the idea and the architecture were mine. I also directed the pitch deck, its Thai version and the video. Tuey built the prototype from that design.",
    outcome: "Submitted in September, prototype built over the next two weeks, reviewed with a SKY mentor in October.",
    stack: "Python, YOLOv8, ByteTrack, FastAPI, WebSocket dashboard",
    links: [],
    aside: "Named after the giant with a hundred eyes. Ours has fewer, but it never blinks.",
    visualCaption: "Concept frame from the pitch: an unattended bag, traced back to its owner.",
  },
  {
    id: "cadence",
    name: "Cadence",
    color: { light: "#6a4fcf", dark: "#a895ff" },
    summary: "The ERP Sonar AI runs on, built from scratch: money, people, paperwork and contracts in one system.",
    card: [
      { term: "My job", detail: "Product owner and builder" },
      { term: "When", detail: "Aug 2026 to now" },
      { term: "Status", detail: "Used daily by staff and directors" },
    ],
    context: [
      { term: "Team", detail: "Me, plus Beam, our bookkeeper turned second developer" },
      {
        term: "Modules",
        detail:
          "Accounting and live budgets; HR and payroll (employee register, payslips, social security, planned hires); contracts and e-signatures; client invoicing; Thai tax documents; bank feed and reconciliation; month close; monthly accounts; investor page",
      },
    ],
    problem:
      "Sonar's budget lived in a spreadsheet. Nobody knew the live balance mid-month, every expense waited on one approver, and overspending only showed up at month-end. Tax paperwork came from separate scripts, so the documents and the books could disagree.",
    pipelineTitle: "From one ledger row to every document",
    pipeline: [
      { label: "Ledger entry", detail: "In the old workbook's columns", kind: "input" },
      { label: "Live budget", detail: "Sub-category to company", kind: "step" },
      { label: "Documents", detail: "Vouchers, receipts, tax forms", kind: "step" },
      { label: "Month close", detail: "Bank statement matched", kind: "step" },
      { label: "Monthly accounts", detail: "P&L, balance sheet, cash flow", kind: "output" },
    ],
    decisions: [
      "I wrote the company budget as code. The app reads it as the plan and refuses to load one that doesn't add up.",
      "We dropped approvals. Spending is logged straight away and flagged afterwards if it's over, and each department sees what it has left the moment something is logged.",
      "Every document comes from the ledger row it cites, so a payee's receipt and the books can't drift apart.",
    ],
    myPart:
      "I started it from an empty project and our Excel ledger in August 2026, wrote the budget plan it enforces, designed the document templates and set the bookkeeping rules. I built it with Claude Code; Beam joined in September and built the month-close tools. It began as a budget tracker and grew into an ERP: HR, payroll, contracts and invoicing followed, and more HR modules are on the way.",
    outcome: "Staff and directors use it every day. It replaced the ledger workbook, the separate document scripts and the one-person approval queue.",
    stack: "Python, FastAPI, SQLite, WeasyPrint, Docker, Cloudflare Tunnel",
    links: [],
    privateNote: "Private company system. Happy to demo it.",
    aside: "Yes, the CFO built the finance system. No, I didn't approve my own budget. There are no approvals.",
    visualCaption: "A sample screen with made-up numbers. The real one stays private.",
  },
  {
    id: "seamless",
    name: "Seamless",
    color: { light: "#bd3a75", dark: "#f07ab0" },
    summary: "A smart shopping cart for hypermarkets. My intern team at True Corporation won True Alpha 2026 with it.",
    card: [
      { term: "My job", detail: "Team lead; owned the business case" },
      { term: "When", detail: "Jun to Aug 2026" },
      { term: "Result", detail: "Winners of True Alpha 2026" },
    ],
    context: [
      { term: "Team", detail: "5 interns" },
      { term: "For", detail: "True Alpha 2026 at True Corporation, with a brief from a Thai retail group" },
    ],
    problem:
      "The brief came from a large Thai retail group that wanted new ways to earn from the stores it already has. Our cart suggests products to each shopper, shows promotions in the aisle, checks the basket and takes payment.",
    pipelineTitle: "Rollout plan",
    pipeline: [
      { label: "Pilot", detail: "10 carts in one branch", kind: "step" },
      { label: "Prove it", detail: "100 carts across 10 branches", kind: "step" },
      { label: "Scale", detail: "Every hypermarket in the group", kind: "output" },
    ],
    decisions: [
      "The retailer rents the carts for 2,999 baht per cart per month with hardware and upgrades included, so it buys nothing upfront. Brands pay for sponsored spots on a 60/40 split.",
      "Each rollout stage has to work before the next one gets money: one branch, then ten, then every store.",
      "I ran the team on short sprints with regular mentor check-ins, and every round of leadership feedback became a task with an owner.",
    ],
    myPart:
      "I led the five of us and owned the business side: market and competitor research, field interviews, the business model and a 60-month cost model. At the end I wrote the technical hand-over so the code could outlive the internship.",
    outcome:
      "We won True Alpha 2026, presenting the business case and a working prototype to True's leadership. The model shows a 61–66% gross margin per cart and a nine-month payback on the hardware.",
    stack: "FastAPI, ChromaDB hybrid search, PyThaiNLP, Llama 4 Scout vision, React (prototype built by First and Palm)",
    links: [],
    aside: "Sixty months of spreadsheet for one shopping cart. Worth it.",
    visualCaption: "A sample of the cart's screen. Products and prices are made up.",
  },
];

// Smaller projects, shown as two highlights plus a searchable table.
export type MiniProject = {
  year: string;
  name: string;
  what: string;
  part: string;
  href?: string;
};

export const allProjects: MiniProject[] = [
  {
    year: "2026",
    name: "Icarus Assistant",
    what: "Voice guide for a finance app. 3rd in the AI track at U-Hackathon, out of almost 400 people",
    part: "Voice pipeline, integration and QA; built in 24 hours",
    href: "https://github.com/DolphinsAreWeird/Icarus-Assistant",
  },
  {
    year: "2026",
    name: "Pyaw",
    what: "Type Burmese the way you text it, in English letters. 95.7% phrase accuracy",
    part: "Solo, open source",
    href: "https://github.com/DolphinsAreWeird/pyaw",
  },
  {
    year: "2026",
    name: "Honours thesis",
    what: "Does Wikipedia traffic predict library borrowing? 25.8 million checkouts, 52 forecasting pipelines",
    part: "Solo research",
    href: "https://github.com/DolphinsAreWeird/cmkl-thesis-research",
  },
  { year: "2026", name: "Athena", what: "One approved source for CMKL's handbooks and chatbot, from 313 pages that disagree", part: "Built the review portal and pipeline" },
  { year: "2026", name: "Harty's Maze", what: "Web app that teaches reinforcement learning to high-school students", part: "Built it, for LAB404" },
  { year: "2026", name: "PrintDesk", what: "macOS print manager with real preview, pause and guided two-sided printing", part: "Solo, built in a week" },
  { year: "2026", name: "Pulse", what: "Menu-bar app for deadlines, company alarms and on-screen Thai translation", part: "Solo" },
  { year: "2026", name: "AssetWitness", what: "Move-out workflow for a state property manager, grown out of RoomWitness", part: "Team lead; proposal and prototype" },
  { year: "2026", name: "NextMeal", what: "Turns a doctor's diet prescription into daily Thai meal plans for elderly patients", part: "Team lead; architecture and financial model" },
  { year: "2026", name: "FlowState", what: "Homework app for students with ADHD", part: "Co-lead; seven-agent design" },
  { year: "2026", name: "Evidently", what: "Before-and-after damage checks and claim drafts for e-commerce returns", part: "Architecture and business case" },
  { year: "2026", name: "HandOver", what: "Keeps a company's know-how when people leave", part: "Architecture, stack and pricing" },
  { year: "2026", name: "CanopyTrust", what: "Satellite health scores for Thailand's community forests", part: "Architecture and policy case" },
  { year: "2026", name: "SaiDee", what: "AI guide on public bins that shows which bin your rubbish goes in", part: "Architecture, research and a 214-item dataset" },
  { year: "2026", name: "Stoma", what: "Predictive CO2 dosing for small greenhouses, for under USD 80", part: "Architecture and research" },
  { year: "2026", name: "PrepaidShield", what: "Insurance on prepaid packages if the shop closes, priced per merchant", part: "Business strategy and scoring design" },
  { year: "2025", name: "Agoda incident reports", what: "LLM pipeline that drafts and checks quarterly incident reports", part: "Intern project" },
  {
    year: "2025",
    name: "Obscura",
    what: "Web tool that anonymises personal data",
    part: "Led a team of five and built the prototype; grade A",
    href: "https://github.com/DolphinsAreWeird/Obscura",
  },
  {
    year: "2025",
    name: "BookTracker",
    what: "Talks blind readers into framing a book page for the camera",
    part: "Solo; Sonar's first prototype",
    href: "https://dolphinsareweird.github.io/BoookTrackerModel-for-SonarAudiobooks/",
  },
  { year: "2025", name: "Teacher Su analyser", what: "Local-LLM tools that turn about 430 school reports into progress dashboards", part: "Solo" },
  { year: "2025", name: "Thai OCR tests", what: "Tesseract, EasyOCR and TrOCR compared on Thai book pages", part: "Solo" },
  { year: "2024", name: "ThAI Immersion", what: "Live AI art from people's movement, shown at CMKL's AI summits", part: "Co-lead" },
  {
    year: "2024",
    name: "AI-Levator",
    what: "Unity digital twin of a lift system, controlled by an outside AI",
    part: "Built the simulation",
    href: "https://github.com/DolphinsAreWeird/ElevatorSimulationforAiLevator",
  },
  { year: "2024", name: "My Happy Thai Neighborhood", what: "Webtoon game that teaches people to spot scams", part: "Story bible and chapter scripts" },
  {
    year: "2023",
    name: "Harmony Vision",
    what: "HoloLens guitar trainer that shows finger positions on the fretboard",
    part: "UI and business plan",
    href: "https://github.com/DolphinsAreWeird/Harmony-Vision",
  },
  {
    year: "2023",
    name: "Websites",
    what: "CMKL LAB404's site, plus a bilingual site and online tests for a Myanmar education group",
    part: "Built them",
    href: "https://lab404.vercel.app",
  },
];

export type Release = {
  version: string;
  title: string;
  org: string;
  when: string;
  notes: string[];
  photo?: { src: string; alt: string; width: number; height: number };
};

export const changelog: Release[] = [
  {
    version: "2026.06",
    title: "Intern and team lead",
    org: "True Corporation",
    when: "Jun to Jul 2026",
    notes: [
      "Led five interns from the brief to the win: our team took True Alpha 2026.",
      "Built the business case and a 60-month cost model for Seamless.",
    ],
  },
  {
    version: "2025.10",
    title: "Co-founder, director and CFO",
    org: "Sonar AI",
    when: "On the team since 2024",
    notes: [
      "Own the budget and accounting, and build the financial models.",
      "Built Cadence, the ERP system the company runs on, from scratch.",
      "Running a three-week user research sprint on what the app fixes next.",
    ],
  },
  {
    version: "2025.05",
    title: "NOC engineer intern",
    org: "Agoda",
    when: "May to Aug 2025",
    notes: ["Prototyped an LLM pipeline that drafts and checks incident reports."],
  },
  {
    version: "2024.04",
    title: "Project manager",
    org: "LAB404 Innovation Lab, CMKL",
    when: "2024 to now",
    notes: [
      "Managed six student projects across AI, games and simulation, leading cross-disciplinary teams on scope, timelines, budgets and pitches. Two were exhibited at CMKL's AI Engineering and Innovation Summit 2024.",
      "Built the hard parts when a project needed them: a real-time AI art pipeline, a Unity lift simulation and the art for a scam-awareness game.",
      "Wrote the lab's incubator funding proposal and built and ran its website.",
    ],
  },
  {
    version: "2023.08",
    title: "Moved to Bangkok",
    org: "CMKL University",
    when: "2023",
    notes: [
      "Started AI and Computer Engineering.",
      "Event coordinator and marketing team at CMKL; marketing intern, then English and GED teacher, at ConnectEd.",
    ],
  },
  {
    version: "2021.09",
    title: "Assistant English teacher",
    org: "Teacher Su, Yangon",
    when: "2021 to 2023",
    notes: ["Taught English online through COVID, from young learners up to IELTS."],
  },
  {
    version: "2018",
    title: "Electrical power engineering student",
    org: "Yangon Technological University",
    when: "From 2018",
    notes: ["Where the engineering started. Hard hat optional, grin mandatory."],
    photo: {
      src: "/images/me/ytu-hard-hat.webp",
      alt: "Khant in a white hard hat at a classroom desk in Yangon, grinning",
      width: 600,
      height: 779,
    },
  },
  {
    version: "1.0-beta",
    title: "Early build",
    org: "Yangon",
    when: "Around 16",
    notes: ["Same smile, fewer projects."],
    photo: {
      src: "/images/me/age-16.webp",
      alt: "A teenage Khant in a striped shirt, laughing and holding a backpack",
      width: 520,
      height: 520,
    },
  },
];

export type Issue = { title: string; status: string; body: string; extra?: "dolphin" | "photo" };

export const knownIssues: Issue[] = [
  {
    title: "Runs on ENTP firmware: argues with every plan, including his own",
    status: "Working as intended",
    body: "That's how I find the hole before a client or a judge does.",
  },
  {
    title: "Hands the pitch to a teammate",
    status: "By design",
    body: "I'd rather design the thing and build the deck. Whoever enjoys the stage gets the stage.",
  },
  {
    title: "Falls asleep at scenic viewpoints",
    status: "Can't reproduce on demand",
    body: "Evidence attached.",
    extra: "photo",
  },
  {
    title: "Says yes to more than one calendar should hold",
    status: "Handled",
    body: "See the list near the top of the page. Everything on it is on track.",
  },
  {
    title: "Builds a tool whenever one doesn't exist",
    status: "Won't fix",
    body: "Couldn't type Burmese on my Mac, so I built an input method. Printing was clumsy, so I built a print manager.",
  },
  {
    title: "Writes a lot of code with AI agents",
    status: "By design",
    body: "Then reviews it like it owes me money.",
  },
  {
    title: "GitHub username is DolphinsAreWeird",
    status: "Won't fix",
    body: "They are, though. Hover here.",
    extra: "dolphin",
  },
];
