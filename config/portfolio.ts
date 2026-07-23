export type PreviewType = "image" | "video" | "gallery" | "interactive";
export type ProjectStatus = "LIVE" | "BUILDING" | "ARCHIVED";

export interface Project {
  slug: string;
  title: string;
  year: number;
  status: ProjectStatus;
  description: string;
  image: string;
  website?: string;
  github?: string;
  tags: string[];
  // Rich metadata
  tech?: string[];
  previewType?: PreviewType;
  architecture?: string; // markdown or plain text
  gallery?: string[]; // array of image urls
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
    title: "hey i'm ayush",
    subtitles: ["I build fast", "I ship fast"],
    availability: "Available for new opportunities",
  },
  
  socials: {
    github: "https://github.com/tonystalker",
    twitter: "https://x.com/tonystalker_",
    linkedin: "https://linkedin.com/in/tonystalker", // Assuming this, can be updated later
    email: "contact@ayush.com", // Assuming this, can be updated later
  },

  projects: [
    {
      slug: "crowd-fund",
      title: "Crowd Fund",
      year: 2025,
      status: "LIVE",
      description: "decentralised crowdfunding marketplace with smart contract integration written in solidity",
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
      website: "https://crowd-fund-me-i9j7.vercel.app/",
      tags: ["solidity", "next.js"],
      tech: ["Solidity", "Next.js", "Ethereum"],
      previewType: "image",
      featured: true,
    },
    {
      slug: "code-interview",
      title: "Code Interview",
      year: 2025,
      status: "LIVE",
      description: "real-time code interview platform with monaco editor and live sandboxed execution",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
      website: "https://code-chat-sigma.vercel.app/",
      tags: ["react", "node.js"],
      tech: ["React", "Node.js", "Monaco", "WebSockets"],
      previewType: "image",
      featured: true,
    },
    {
      slug: "web3-jobs",
      title: "Web3 Jobs",
      year: 2025,
      status: "LIVE",
      description: "web3 job portal where a single recruiter can post jobs across multiple companies",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
      website: "https://web3-jobs-1tnt.vercel.app/",
      tags: ["next.js", "web3"],
      tech: ["Next.js", "Web3.js", "Smart Contracts"],
      previewType: "image",
      featured: true,
    },
    {
      slug: "defi-protocol",
      title: "DeFi Protocol",
      year: 2024,
      status: "ARCHIVED",
      description: "over-collateralised stablecoin protocol with dsc minting and liquidation engine in solidity",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      github: "https://github.com/tonystalker/defi_dsc_engine",
      tags: ["solidity", "defi"],
      tech: ["Solidity", "Hardhat", "Chainlink", "Ethers.js"],
      previewType: "image",
      featured: false,
    }
  ] as Project[],

  experience: [
    {
      id: "scriptsolve",
      company: "Scriptsolve",
      title: "Software Engineering Intern",
      duration: "2024",
      summary: "Built responsive components and real-time tracking for an educational platform.",
      details: [
        "Built reusable React and TypeScript components and integrated REST APIs to deliver a responsive course catalog.",
        "Implemented dynamic sidebar navigation with React state management, enabling accurate lesson tracking and progress indicators that enhanced usability and streamlined navigation for learners.",
        "Developed a real-time completion tracker using TypeScript and Tailwind CSS, synchronizing frontend state with backend data to provide reliable progress visualization and actionable insights."
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "REST APIs"]
    }
  ] as ExperienceRole[]
};
