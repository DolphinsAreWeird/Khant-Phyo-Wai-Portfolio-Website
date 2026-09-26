import { TrendingUp, Cpu, Code, Database, Briefcase } from 'lucide-react';

export const DATA = {
  hero: {
    roles: ["Chief Financial Officer", "AI Engineer", "Business Strategist"],
    tagline: "Bridging the gap between complex AI engineering and strategic financial leadership."
  },
  stats: [
    { label: "C-Level Role", value: 1 },
    { label: "Projects Delivered", value: 12 },
    { label: "Years Experience", value: 3 },
    { label: "GPA / 4.0", value: 3.7 }
  ],
  skills: [
    "Python", "TensorFlow", "Financial Modeling", "React", "Node.js", "SQL", 
    "Strategic Planning", "OpenCV", "Risk Management", "B2B Sales"
  ],
  experience: [
    {
      id: 1,
      role: "Chief Financial Officer (CFO)",
      company: "Sonar Audiobooks",
      period: "Jan 2025 - Present",
      desc: "Leading financial strategy for an AI accessibility startup.",
      points: ["Directing financial planning & 3-year runway.", "Overseeing B2B commercialization pivot.", "Building Python backend for OCR pipelines."],
      tags: ["Executive", "Finance", "AI"],
      highlight: true
    },
    {
      id: 2,
      role: "Project Managing Assistant",
      company: "CMKL University",
      period: "Apr 2024 - Present",
      desc: "Strategic coordination for AI research initiatives.",
      points: ["Market research & competitor analysis.", "Developing monetization models for research."],
      tags: ["Strategy", "Research"],
      highlight: false
    },
    {
      id: 3,
      role: "AI-Centric Designer",
      company: "CMKL University",
      period: "Apr 2024 - Aug 2024",
      desc: "Optimizing game dev workflows with AI.",
      points: ["Integrated AI tools to automate asset generation.", "Applied ML insights for product usability."],
      tags: ["AI", "Game Dev"],
      highlight: false
    }
  ],
  projects: [
    {
      id: "sonar",
      title: "Sonar Audiobooks",
      category: "AI & Business",
      image: "/images/Sonar.webp", 
      tags: ["CFO Role", "AI Startup"],
      shortDesc: "Financial strategy and tech pipeline for AI audiobooks.",
      fullDesc: "Sonar Audiobooks is an AI-driven platform converting physical text to audio for the visually impaired. As CFO and Engineer, I bridged the gap between technical feasibility and market viability.",
      challenges: "The main challenge was creating a sustainable business model while ensuring the OCR (Optical Character Recognition) pipeline was cost-effective.",
      solution: "I developed a hybrid business model targeting B2B libraries and direct consumers. Technically, I optimized the Python OCR pipeline to reduce token usage by 40%.",
      stack: ["Python", "React", "Financial Modeling", "OpenCV"],
      link: "https://sonaraudiobooks.com/"
    },
    {
      id: "thai-neighbourhood",
      title: "Thai Neighbourhood",
      category: "Strategy",
      image: "/images/404.webp",
      tags: ["Economic Dev", "Analytics"],
      shortDesc: "Sustainable business model for community development.",
      fullDesc: "A tech-driven initiative to revitalize local Thai communities through digital adoption and economic modeling.",
      challenges: "Quantifying the economic impact of digital tools on rural communities.",
      solution: "Created a predictive economic model using local data to forecast growth, securing partnership interest from local government bodies.",
      stack: ["Data Analytics", "Unity", "Strategic Planning"],
      link: "https://lab404.mystrikingly.com/"
    },
    {
      id: "simpal",
      title: "Simpal Clothing",
      category: "Web Dev",
      image: "/images/web-simpal.png",
      tags: ["E-Commerce", "React"],
      shortDesc: "Full-stack e-commerce solution.",
      fullDesc: "A modern e-commerce platform built for a fashion brand, focusing on user experience and conversion optimization.",
      challenges: "Integrating secure payments and managing real-time inventory.",
      solution: "Built a React frontend with a serverless Node.js backend, resulting in a 20% increase in conversion rates during testing.",
      stack: ["React", "Node.js", "Stripe API"],
      link: "https://simpalclothing.netlify.app/"
    }
  ]
};