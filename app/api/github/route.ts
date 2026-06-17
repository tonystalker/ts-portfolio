import { NextResponse } from "next/server";

type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
};

type Week = {
  contributionDays: ContributionDay[];
};

const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const USERNAME = "tonystalker";

const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    // Fallback: return empty data so the calendar doesn't break
    return NextResponse.json(
      { contributions: [], totalContributions: 0 },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  const query = `
    query {
      user(login: "${USERNAME}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 0 }, // No caching — always fresh
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("GitHub API error:", res.status, text);
      return NextResponse.json(
        { contributions: [], totalContributions: 0 },
        { status: 502 }
      );
    }

    const json = await res.json();
    const calendar =
      json.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json(
        { contributions: [], totalContributions: 0 },
        { status: 502 }
      );
    }

    const contributions = calendar.weeks.flatMap((week: Week) =>
      week.contributionDays.map((day: ContributionDay) => ({
        date: day.date,
        count: day.contributionCount,
        level: levelMap[day.contributionLevel] ?? 0,
      }))
    );

    return NextResponse.json(
      {
        contributions,
        totalContributions: calendar.totalContributions,
      },
      {
        headers: {
          // Cache for 5 minutes, then revalidate in background
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (err) {
    console.error("GitHub fetch error:", err);
    return NextResponse.json(
      { contributions: [], totalContributions: 0 },
      { status: 500 }
    );
  }
}
