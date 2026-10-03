export type PreviewType = "image" | "video" | "gallery" | "interactive";
export type ProjectStatus = "LIVE" | "BUILDING" | "ARCHIVED";

export interface Project {
  slug: string;
  title: string;
  year: number;
  status: ProjectStatus;
  description: string;
  shortDescription?: string;
  whyItMatters?: string;
  underTheHood?: string[];
  image: string;
  website?: string;
  github?: string;
  tags: string[];
  tech?: string[];
  previewType?: PreviewType;
  architecture?: string;
  gallery?: string[];
  metrics?: { label: string; value: string }[];
  featured?: boolean;
}

export interface ExperienceRole {
  id: string;
  company: string;
  title: string;
  duration: string;
  summary: string;
  details: string[];
  tech: string[];
}

export const portfolioConfig = {
  about: {
    name: "Ayush Tripathi",
    eyebrow: "AI SYSTEMS · PRODUCT ENGINEERING · INDIA",
    title: "I build AI products and systems that hold up after the demo.",
    bio: "I work across agent workflows, backend infrastructure, and thoughtful interfaces—turning unclear ideas into software people can actually use.",
    principle: "Move fast. Make it hold.",
    now: "Building applied-AI products, learning systems design by shipping.",
    availability: "Open to internships, freelance, or full-time",
    location: "India · UTC+5:30",
    email: "707ayushtripathi@gmail.com",
    shortAbout: [
      "I got into programming in class 8 through Java—not because I had a plan, but because it was the first time a computer course felt like a superpower.",
      "That curiosity survived a 4 GB laptop, an ambitious attempt at Android Studio, a few crashed emulators, a JEE detour, and more experiments than sensible hardware should have allowed. It eventually led me through Python, Web3, backend systems, Go, Rust, and now applied AI.",
      "Today, I build products at the intersection of agents, infrastructure, and user experience. I still like moving quickly. I just care more about whether what I ship keeps working when real people depend on it."
    ],
    fullStory: {
      heading: "How I got here",
      opening: "My route into software was not linear. It began with a Java exam, continued through a laptop that was not remotely prepared for Android Studio, took a detour through JEE and Ceramic Engineering at IIT (BHU), and eventually became a habit of building things to see whether they could work in the real world.",
      quote: {
        text: "“Sometimes you gotta run before you can walk.”",
        author: "Tony Stark, Iron Man (2008)"
      },
      chapters: [
        {
          num: "01",
          title: "The first compiler",
          content: "In class 8, Java was part of the computer syllabus. It was the first programming language I encountered, and I got unusually invested—enough to keep thinking about it long after class was over. I liked the simple fact that a few lines of code could make a machine do something new."
        },
        {
          num: "02",
          title: "Building with what I had",
          content: "Java pulled me toward Android development. I installed Android Studio on a 4 GB RAM computer, downloaded emulators, and learned a practical lesson quickly: ambition and available memory are not the same thing. The machine eventually gave up, so I found lighter tools and built Windows executables instead. The constraint did not end the interest; it changed the route."
        },
        {
          num: "03",
          title: "The detour",
          content: "I stepped away from programming for JEE preparation and later joined IIT (BHU) to study Ceramic Engineering. Materials made sense to me: understanding how things are made, what they can withstand, and how they behave under pressure. Software eventually became the version of that question I wanted to keep answering."
        },
        {
          num: "04",
          title: "Python, crypto, and a small bet",
          content: "After JEE, I returned through Python. Around the same time, the Dogecoin moment pulled me into crypto. One evening, I put the ₹600 I had set aside into a meme coin so I could afford a movie ticket. Five minutes later it had doubled; I withdrew it and went to the movie.\n\nThat was not a financial strategy. It was a glimpse into how fast digital systems can move—and how much interesting engineering sits beneath the noise. I started looking past the price charts: smart contracts, wallets, protocols, and the infrastructure that makes decentralised products possible."
        },
        {
          num: "05",
          title: "Web3 to systems",
          content: "I began participating in the Web3 ecosystem, contributing where I could and building products around it. Hackathons taught me to turn vague ideas into demos under pressure. Eventually I became more interested in the systems beneath the product: what happens when the happy path breaks, how data moves, and how software stays reliable.\n\nI learned Rust, then Go, and built a key-value store in Go. That work shifted my attention from interfaces alone toward the backend and infrastructure choices that make an application dependable."
        },
        {
          num: "06",
          title: "What I build now",
          content: "Now I am building applied-AI products and agentic systems. I enjoy the whole path: working out the product, building the interface, designing the workflow, and making the backend hold.\n\nI have won three hackathons, worked in early-stage teams, and kept returning to the same idea: ship quickly, learn from reality, then make the next version stronger."
        }
      ],
      closing: "The motto used to be “ship fast.” It is now “move fast, make it hold.”"
    },
    personalDetail: "Unrelated but true: I was the tallest kid in school until I stopped playing basketball. My height never negotiated another contract.",
    metrics: [
      { label: "Target voice latency", value: "<150ms" },
      { label: "Local execution", value: "100%" },
      { label: "Architecture", value: "Multi-Agent" },
    ],
  },
  
  socials: {
    github: "https://github.com/tonystalker",
    twitter: "https://x.com/TonyStalkerr",
    linkedin: "https://www.linkedin.com/in/ayush-tripathi-4a062b1b4/",
    email: "707ayushtripathi@gmail.com",
  },

  projects: [
    {
      slug: "voiceflow",
      title: "Voiceflow",
      year: 2026,
      status: "LIVE",
      description: "Real-time AI voice assistant for automated food ordering, built 100% locally with wake-word detection, MCP tool integration, and sub-150ms latency.",
      shortDescription: "Local AI voice assistant with wake-word detection, MCP Swiggy tool integration, and streaming voice-to-intent execution.",
      whyItMatters: "Eliminates cloud vendor dependency and audio privacy risks while achieving immediate, natural conversational turn-taking for real-world ordering.",
      underTheHood: [
        "Local wake-word detection via Porcupine & Whisper quantized models",
        "Model Context Protocol (MCP) server for external Swiggy cart & menu orchestration",
        "Deterministic LangGraph state machine handling speech interruption & confirmation",
        "Sub-150ms pipeline using Groq & FastAPI streaming WebSockets"
      ],
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80",
      github: "https://github.com/tonystalker/voiceflow",
      tags: ["AI Agents", "MCP", "FastAPI", "LangGraph"],
      tech: ["LangGraph", "Groq", "FastAPI", "ElevenLabs", "Porcupine", "MCP"],
      previewType: "image",
      featured: true,
      metrics: [
        { label: "Latency", value: "<150ms" },
        { label: "Privacy", value: "100% Local" }
      ]
    },
    {
      slug: "flowdesk",
      title: "FlowDesk",
      year: 2026,
      status: "LIVE",
      description: "Intelligent multi-agent customer support platform orchestrating intent classification, hybrid RAG retrieval, grounded response generation, and automated human escalation.",
      shortDescription: "Multi-agent support platform with hybrid RAG, intent classification, grounded answers, and escalation routing.",
      whyItMatters: "Eliminates LLM hallucination and runaway support tickets by enforcing deterministic source attribution and confidence-scored human handoffs.",
      underTheHood: [
        "Multi-agent supervisor routing with LangGraph and Llama 3 via Groq",
        "Hybrid RAG combining dense vector search (Pinecone) with BM25 keyword matching",
        "Strict verification node calculating grounding citation overlap before output",
        "Real-time escalation dispatch via Supabase Webhooks and GCP Cloud Functions"
      ],
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
      website: "https://flow-desk-lemon-one.vercel.app/",
      github: "https://github.com/tonystalker/FlowDesk",
      tags: ["Multi-Agent", "RAG", "Pinecone", "LangGraph"],
      tech: ["LangGraph", "Pinecone", "Groq", "Supabase", "GCP", "Next.js"],
      previewType: "image",
      featured: true,
      metrics: [
        { label: "Query Automation", value: "70%+" },
        { label: "Grounding Check", value: "Strict Citations" }
      ]
    },
    {
      slug: "codesentinel",
      title: "CodeSentinel",
      year: 2026,
      status: "LIVE",
      description: "Autonomous code review and security auditing pipeline orchestrating Tree-sitter AST queries, vulnerability pattern detection, and isolated E2B sandbox self-debugging.",
      shortDescription: "AI code review pipeline with LangGraph multi-agent orchestration, Tree-sitter AST RAG, and E2B sandbox validation.",
      whyItMatters: "Bridges the gap between heuristic linters and autonomous fix generation by validating proposed patches in isolated sandbox runtimes before submission.",
      underTheHood: [
        "Tree-sitter AST parsing for semantic code graph extraction and chunking",
        "LangGraph multi-agent flow: Reviewer -> Patch Generator -> Test Runner",
        "Isolated ephemeral E2B sandbox execution for live test reproduction",
        "Automated GitHub Action integration with confidence-scored PR comments"
      ],
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
      github: "https://github.com/tonystalker/CodeSentinel",
      tags: ["Developer Tools", "LangGraph", "E2B", "AST"],
      tech: ["LangGraph", "E2B Sandbox", "Tree-sitter", "Python", "GitHub Actions"],
      previewType: "image",
      featured: true,
      metrics: [
        { label: "Validation", value: "E2B Sandbox" },
        { label: "Parsing", value: "Tree-sitter AST" }
      ]
    },
    {
      slug: "memoris",
      title: "Memoris",
      year: 2026,
      status: "BUILDING",
      description: "Decentralized long-term conversational memory and state synchronization engine for distributed agent swarms.",
      shortDescription: "State synchronization and hierarchical memory engine for autonomous agent swarms.",
      whyItMatters: "Provides sub-millisecond context retrieval and conflict-free state merging across asynchronous agent teams.",
      underTheHood: [
        "Hierarchical episodic and semantic memory indexing",
        "CRDT-based state reconciliation across concurrent agent threads",
        "Vector-quantized embedding cache for instant similarity recall"
      ],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      github: "https://github.com/tonystalker/Memoris",
      tags: ["Agent Swarms", "Memory", "Python"],
      tech: ["Python", "FastAPI", "Vector DB", "Redis"],
      previewType: "image",
      featured: false
    }
  ] as Project[],

  experience: [
    {
      id: "scriptsolve",
      company: "Scriptsolve",
      title: "Software Engineering Intern",
      duration: "2024",
      summary: "Engineered responsive components, real-time progress synchronization, and state management for an interactive educational platform.",
      details: [
        "Engineered reusable React and TypeScript components integrated with REST APIs, improving lesson loading performance and catalog responsiveness.",
        "Implemented dynamic sidebar navigation with hierarchical state management, providing accurate lesson tracking and zero-latency progress indicators.",
        "Developed a real-time completion tracker with TypeScript and Tailwind CSS, reliably synchronizing client state with backend events."
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "REST APIs"]
    }
  ] as ExperienceRole[]
};
