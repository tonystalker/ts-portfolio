export type PreviewType = "image" | "video" | "gallery" | "interactive";
export type ProjectStatus = "LIVE" | "BUILDING" | "ARCHIVED";

export interface Project {
  slug: string;
  title: string;
  year: number;
  status: ProjectStatus;
  category?: "ai" | "systems" | "product" | "realtime" | string;
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
    bio: "I work across agent workflows, backend infrastructure, and thoughtful interfaces, turning unclear ideas into software people can actually use.",
    principle: "Move fast. Make it hold.",
    now: "Building applied-AI products, learning systems design by shipping.",
    availability: "Open to opportunities which questions my knowledge",
    location: "India · UTC+5:30",
    email: "707ayushtripathi@gmail.com",
    shortAbout: [
      "I got into programming in class 8 through Java, not because I had a plan, but because it was the first time a computer course felt like a superpower.",
      "That curiosity survived a 2 GB laptop, an ambitious attempt at Android Studio, a few crashed emulators, a JEE detour, and more experiments than sensible hardware should have allowed. It eventually led me through Python, Web3, backend systems, Go, Rust, and now applied AI.",
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
          content: "In class 8, Java was part of the computer syllabus. It was the first programming language I encountered, and I got unusually invested, enough to keep thinking about it long after class was over. I liked the simple fact that a few lines of code could make a machine do something new."
        },
        {
          num: "02",
          title: "Building with what I had",
          content: "Java pulled me toward Android development. I installed Android Studio on a 2 GB RAM computer, downloaded emulators, and learned a practical lesson quickly: ambition and available memory are not the same thing. The machine eventually gave up, so I found lighter tools and built Windows executables instead. The constraint did not end the interest; it changed the route."
        },
        {
          num: "03",
          title: "The detour",
          content: "I stepped away from programming for JEE preparation and later joined IIT (BHU) to study Ceramic Engineering. Materials made sense to me: understanding how things are made, what they can withstand, and how they behave under pressure. Software eventually became the version of that question I wanted to keep answering."
        },
        {
          num: "04",
          title: "Python, crypto, and a small bet",
          content: "After JEE, I returned through Python. Around the same time, the Dogecoin moment pulled me into crypto. One evening, I put the ₹600 I had set aside into a meme coin so I could afford a movie ticket. Five minutes later it had doubled; I withdrew it and went to the movie.\n\nThat was not a financial strategy. It was a glimpse into how fast digital systems can move, and how much interesting engineering sits beneath the noise. I started looking past the price charts: smart contracts, wallets, protocols, and the infrastructure that makes decentralised products possible."
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
    calLink: "https://cal.com/ayush-tripathi/30min",
  },
  
  socials: {
    github: "https://github.com/tonystalker",
    twitter: "https://x.com/TonyStalkerr",
    linkedin: "https://www.linkedin.com/in/ayush-tripathi-4a062b1b4/",
    email: "707ayushtripathi@gmail.com",
    cal: "https://cal.com/ayush-tripathi/30min",
  },

  projects: [] as Project[],

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
