export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readTime: number;
  content: string; // HTML string — safe, all content is authored by us
}

export const posts: Post[] = [
  {
    slug: "building-defi-stablecoin-protocol",
    title: "Building a DeFi Stablecoin",
    date: "2025-11-20",
    description:
      "A deep dive into building an over-collateralized stablecoin protocol from scratch with Solidity, Chainlink price feeds, and a liquidation engine.",
    tags: ["Solidity", "DeFi", "Blockchain", "Hardhat"],
    readTime: 8,
    content: `
<h2>The Problem with Stablecoins</h2>
<p>When I started building my DeFi protocol, the first question I had to answer was: how do you create a coin worth exactly $1 without centralised collateral? The answer is over-collateralisation — you lock up more value than you borrow.</p>

<h2>The Core Mechanism</h2>
<p>The protocol works like this: you deposit ETH as collateral, and in return you can mint DSC (Decentralised Stable Coin) — but only up to 50% of your collateral's USD value. This 200% collateralisation ratio is your safety buffer against volatility.</p>

<pre><code>// The core mint function
function mintDsc(uint256 amountDscToMint)
    public
    moreThanZero(amountDscToMint)
{
    s_DSCMinted[msg.sender] += amountDscToMint;
    _revertIfHealthFactorIsBroken(msg.sender);
    bool minted = i_dsc.mint(msg.sender, amountDscToMint);
    if (!minted) revert DSCEngine__MintFailed();
}</code></pre>

<h2>The Liquidation Engine</h2>
<p>What happens when ETH price drops and your collateral falls below 150% of your minted DSC? Liquidators can step in — they repay your DSC debt and receive your ETH at a 10% discount as a bonus. Pure game theory making the protocol self-sustaining.</p>

<h2>Chainlink Price Feeds</h2>
<p>Real-time ETH/USD pricing via Chainlink oracles. Getting this wrong means catastrophic failure. I implemented a 3-hour staleness check to reject outdated prices:</p>

<pre><code>function getUsdValue(address token, uint256 amount)
    public view returns (uint256)
{
    AggregatorV3Interface feed = AggregatorV3Interface(s_priceFeeds[token]);
    (, int256 price,, uint256 updatedAt,) = feed.latestRoundData();
    if (block.timestamp - updatedAt > 3 hours)
        revert DSCEngine__StalePrice();
    return (uint256(price) * ADDITIONAL_FEED_PRECISION * amount) / PRECISION;
}</code></pre>

<h2>What I Learned</h2>
<p>DeFi is unforgiving. One off-by-one error in decimal arithmetic can drain millions. The most valuable lesson: test every attack vector, including the ones you think are impossible.</p>
<p>The full protocol is open-source at <a href="https://github.com/tonystalker/defi_dsc_engine" target="_blank" rel="noopener noreferrer">github.com/tonystalker/defi_dsc_engine</a>.</p>
`,
  },
  {
    slug: "real-time-code-interview-platform",
    title: "Real-Time Code Interview Platform",
    date: "2025-09-10",
    description:
      "How I built a live coding platform with Monaco Editor, WebSockets for real-time collaboration, and sandboxed Docker-based code execution.",
    tags: ["Next.js", "TypeScript", "WebSockets", "Monaco Editor"],
    readTime: 6,
    content: `
<h2>The Gap in the Market</h2>
<p>LeetCode and HackerRank are great for solo practice, but they are not built for live interviews. I needed a platform where an interviewer and candidate can write code together in real-time, see each other's cursor, and safely execute the output.</p>

<h2>Monaco Editor</h2>
<p>VS Code is built on Monaco. If it is good enough for VS Code, it is good enough for a code interview platform. Integration in Next.js is clean:</p>

<pre><code>import { Editor } from "@monaco-editor/react";

function CodeEditor({ value, onChange, language }) {
  return (
    &lt;Editor
      height="70vh"
      language={language}
      value={value}
      onChange={onChange}
      theme="vs-dark"
      options={{ fontSize: 14, minimap: { enabled: false } }}
    /&gt;
  );
}</code></pre>

<h2>Real-Time Synchronisation</h2>
<p>I used WebSockets via socket.io for bi-directional sync. Every keystroke is debounced and broadcast to all session participants — but not sent back to the original sender to prevent cursor jumping:</p>

<pre><code>socket.on("code-change", ({ sessionId, code, senderId }) => {
  // broadcast to everyone in the session EXCEPT the sender
  socket.to(sessionId).emit("code-update", { code, senderId });
});</code></pre>

<h2>Sandboxed Execution</h2>
<p>You cannot let users run arbitrary code on your server uncontrolled. I spun up an isolated Docker container per execution request — network disabled, filesystem read-only, 10-second timeout. Code runs, container is destroyed. No state persists between runs.</p>

<h2>The Hardest Part</h2>
<p>Not the WebSocket sync or Docker isolation — it was cursor position synchronisation. When two people type simultaneously, whose cursor wins? I ended up implementing operational transformation for cursor positions, separate from the content sync.</p>
`,
  },
  {
    slug: "full-stack-web3-development",
    title: "Full-Stack Web3 Development",
    date: "2025-07-15",
    description:
      "Practical patterns for connecting a React frontend to deployed smart contracts: wallet connection, reading on-chain state, and writing transactions safely.",
    tags: ["React", "Web3.js", "Solidity", "TypeScript"],
    readTime: 7,
    content: `
<h2>The Stack That Works</h2>
<p>After building three Web3 projects, I have settled on a stack that minimises friction: Solidity for contracts, Hardhat for testing and deployment, ethers.js for contract interaction, and React with wagmi on the frontend.</p>

<h2>Connecting a Wallet</h2>
<p>The first UX challenge in any dApp is wallet connection. With wagmi, this is almost trivial:</p>

<pre><code>import { useConnect, useAccount } from "wagmi";
import { injected } from "wagmi/connectors";

function WalletButton() {
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();

  if (isConnected)
    return &lt;span&gt;{address.slice(0,6)}...{address.slice(-4)}&lt;/span&gt;;

  return (
    &lt;button onClick={() =&gt; connect({ connector: injected() })}&gt;
      Connect Wallet
    &lt;/button&gt;
  );
}</code></pre>

<h2>Reading Contract State</h2>
<p>On-chain reads are free. Give useReadContract your ABI and address, and query any public state:</p>

<pre><code>const { data: balance } = useReadContract({
  address: CONTRACT_ADDRESS,
  abi: TOKEN_ABI,
  functionName: "balanceOf",
  args: [userAddress],
});</code></pre>

<h2>Writing Transactions</h2>
<p>Writes cost gas and require the user's MetaMask signature. The flow: prepare, send, wait for confirmation. useWriteContract handles the heavy lifting:</p>

<pre><code>const { writeContract, isPending } = useWriteContract();

function handleDeposit(amount: bigint) {
  writeContract({
    address: CONTRACT_ADDRESS,
    abi: POOL_ABI,
    functionName: "deposit",
    args: [amount],
    value: amount, // ETH sent with the tx
  });
}</code></pre>

<h2>The Mental Model</h2>
<p>Think of your smart contract as a database with a built-in REST API. Reads are GET requests. Writes are authenticated POST requests where the user signs with their private key instead of a JWT.</p>
<p>The biggest gotcha: always handle "loading" and "error" states. Users close MetaMask mid-flow, switch networks, or run out of gas. Your UI needs to be bulletproof around every one of these cases.</p>
`,
  },
];

/** Returns all posts sorted newest-first. */
export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Returns a single post by slug, or undefined if not found. */
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
