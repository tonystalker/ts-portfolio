"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { NotionRead } from "@/lib/notion/models";
import { FiArrowUpRight, FiSearch } from "react-icons/fi";
import Image from "next/image";

const FILTERS = ["All", "Article", "Paper", "Book", "Video", "Tool"];

export function ReadsLibrary({ reads }: { reads: NotionRead[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReads = useMemo(() => {
    return reads.filter((read) => {
      const matchesFilter = activeFilter === "All" || read.type === activeFilter;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        read.title.toLowerCase().includes(searchLower) ||
        read.author.toLowerCase().includes(searchLower) ||
        read.tags.some(t => t.toLowerCase().includes(searchLower)) ||
        read.category.toLowerCase().includes(searchLower);
      
      return matchesFilter && matchesSearch;
    });
  }, [reads, activeFilter, searchQuery]);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by title, author, or tags..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-transparent text-[13px] outline-none transition-all duration-300"
            style={{ 
              borderColor: "var(--border)", 
              color: "var(--text)", 
              fontFamily: "var(--font-mono)"
            }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="px-3 py-1.5 rounded-full text-[12px] transition-all duration-200"
              style={{
                fontFamily: "var(--font-mono)",
                background: activeFilter === filter ? "var(--text)" : "transparent",
                color: activeFilter === filter ? "var(--background)" : "var(--text-muted)",
                border: `1px solid ${activeFilter === filter ? "transparent" : "var(--border)"}`
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Reads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredReads.map((read) => (
            <motion.a
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={read.id}
              href={read.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col p-4 rounded-2xl border transition-all duration-300 hover:border-gray-400/50 relative overflow-hidden"
              style={{ 
                borderColor: "var(--border)", 
                background: "rgba(255, 255, 255, 0.02)" 
              }}
            >
              {/* Type Badge */}
              <div className="absolute top-4 right-4 z-10 px-2 py-0.5 rounded-full text-[10px] font-medium"
                   style={{ background: "var(--border)", color: "var(--text)", fontFamily: "var(--font-mono)" }}>
                {read.type}
              </div>

              {read.thumbnail && (
                <div className="w-full h-32 relative mb-4 rounded-xl overflow-hidden bg-black/10">
                  <Image src={read.thumbnail} alt={read.title} fill className="object-cover" />
                </div>
              )}

              <div className="flex flex-col gap-1.5 flex-1">
                <h3 className="text-[15px] font-medium leading-snug group-hover:text-blue-400 transition-colors" 
                    style={{ color: "var(--text)", fontFamily: "var(--font-sans)" }}>
                  {read.title}
                </h3>
                {read.author && (
                  <p className="text-[12px]" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    {read.author} • {read.source}
                  </p>
                )}
                
                {read.myTake && (
                  <div className="mt-3 p-3 rounded-xl border border-dashed border-white/10 bg-white/[0.01]">
                    <p className="text-[12px] leading-relaxed" style={{ color: "var(--text-body)", fontFamily: "var(--font-sans)" }}>
                      <span className="font-semibold" style={{ color: "var(--accent)" }}>My Take: </span>
                      {read.myTake}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {read.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-md" 
                          style={{ background: "var(--border)", color: "var(--text-muted)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <FiArrowUpRight className="text-[16px] text-gray-500 group-hover:text-white transition-colors" />
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
        
        {filteredReads.length === 0 && (
          <div className="col-span-1 sm:col-span-2 py-12 flex flex-col items-center justify-center opacity-50">
            <p className="text-[14px]" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              No reading items found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
