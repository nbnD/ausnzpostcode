"use client";

import { useState } from "react";
import type { FAQItem } from "@/components/FAQAccordion";

type FAQGroup = {
  id: string;
  label: string;
  items: FAQItem[];
};

export function TabbedFAQAccordion({ groups }: { groups: FAQGroup[] }) {
  const [activeGroup, setActiveGroup] = useState(groups[0]?.id ?? "");

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2 rounded-[14px] border border-border bg-white p-2 shadow-sm" role="tablist" aria-label="Homepage FAQ categories">
        {groups.map((group) => {
          const active = group.id === activeGroup;

          return (
            <button
              key={group.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`faq-panel-${group.id}`}
              id={`faq-tab-${group.id}`}
              onClick={() => setActiveGroup(group.id)}
              className={`rounded-lg px-4 py-2.5 font-heading text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-coral/30 ${
                active
                  ? "bg-navy text-white shadow-sm"
                  : "bg-ash text-navy hover:bg-coral/10 hover:text-coral"
              }`}
            >
              {group.label}
            </button>
          );
        })}
      </div>
      {groups.map((group) => (
        <div
          key={group.id}
          role="tabpanel"
          id={`faq-panel-${group.id}`}
          aria-labelledby={`faq-tab-${group.id}`}
          hidden={group.id !== activeGroup}
          className="space-y-2"
        >
          {group.items.map((item, index) => (
            <details
              key={item.question}
              className="group overflow-hidden rounded-[10px] border border-border bg-white open:shadow-sm"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-navy transition hover:text-coral focus:outline-none focus:ring-2 focus:ring-coral/30">
                {item.question}
                <span className="text-xs text-muted transition group-open:rotate-180">v</span>
              </summary>
              <div className="border-t border-border px-5 pb-4 pt-3 text-sm leading-6 text-muted">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      ))}
    </div>
  );
}
