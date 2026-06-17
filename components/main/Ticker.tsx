"use client";

import { useEffect, useState, useRef } from "react";

const SEPARATOR = " ·· ";

const items = [
  { key: "location", defaultValue: "LOCATING..." },
  { key: "session", defaultValue: "00:00:00" },
  { key: "status", defaultValue: "OPEN TO WORK" },
];

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

export function Ticker() {
  const [weather, setWeather] = useState("LOCATING...");
  const [sessionTime, setSessionTime] = useState("00:00:00");
  const [visitors, setVisitors] = useState("---");
  const startRef = useRef(Date.now());

  useEffect(() => {
    // Weather via GeoJS + Open-Meteo (both free, no auth)
    const fetchWeather = async () => {
      try {
        const geoRes = await fetch("https://get.geojs.io/v1/ip/geo.json");
        const geo = await geoRes.json();
        if (geo.city && geo.latitude && geo.longitude) {
          const wRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&current_weather=true`
          );
          const w = await wRes.json();
          setWeather(
            `${geo.city.toUpperCase()} :: ${w.current_weather.temperature}°C`
          );
        }
      } catch {
        setWeather("SYS_OFFLINE");
      }
    };
    fetchWeather();

    const fetchVisitors = async () => {
      try {
        const res = await fetch("https://api.counterapi.dev/v1/ayush-tripathi/portfolio/up");
        const data = await res.json();
        setVisitors(data.count.toString());
      } catch {
        setVisitors("ERR");
      }
    };
    fetchVisitors();

    // Session timer
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
      setSessionTime(formatTime(elapsed));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const tickerText = [
    `LOC :: ${weather}`,
    `SESSION :: ${sessionTime}`,
    `STATUS :: OPEN TO WORK`,
    `STACK :: GO · TS · PYTHON · SOLIDITY`,
    `VISITORS :: ${visitors}`,
  ]
    .join(`  ${SEPARATOR}  `)
    .repeat(3) + `  ${SEPARATOR}  `;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--text)]/20 bg-[var(--bg)] overflow-hidden"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <div className="flex whitespace-nowrap py-2">
        <div className="flex animate-[marquee_30s_linear_infinite]">
          <span className="text-[10px] tracking-widest text-[var(--text)] opacity-50 pr-8">
            {tickerText}
          </span>
          {/* Duplicate for seamless loop */}
          <span className="text-[10px] tracking-widest text-[var(--text)] opacity-50 pr-8">
            {tickerText}
          </span>
        </div>
      </div>
    </div>
  );
}
