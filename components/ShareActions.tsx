"use client";

import { useState } from "react";

export function ShareActions({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function share() {
    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={share}
        className="rounded-lg bg-coral px-4 py-2.5 font-heading text-sm font-bold text-white transition hover:bg-[#d03d23]"
      >
        {copied ? "Copied" : "Share"}
      </button>
      <a className="rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 font-heading text-sm font-semibold text-white" href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}>
        Facebook
      </a>
      <a className="rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 font-heading text-sm font-semibold text-white" href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}>
        X
      </a>
      <a className="rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 font-heading text-sm font-semibold text-white" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}>
        LinkedIn
      </a>
      <a className="rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 font-heading text-sm font-semibold text-white" href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}>
        WhatsApp
      </a>
    </div>
  );
}
