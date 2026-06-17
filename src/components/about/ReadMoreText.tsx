"use client";

/**
 * ReadMoreText — collapsible paragraph for long content.
 * Shows a truncated preview with a "Read More" toggle that expands the
 * full text. Keeps the about-hero layout intact when copy is long.
 */
import { useState } from "react";

type Props = {
  text: string;
  /** characters shown when collapsed */
  limit?: number;
};

export default function ReadMoreText({ text, limit = 360 }: Props) {
  const [expanded, setExpanded] = useState(false);

  // short enough — no toggle needed
  if (text.length <= limit) {
    return <p className="text">{text}</p>;
  }

  // cut at last word boundary before the limit
  const cut = text.slice(0, limit);
  const preview = cut.slice(0, cut.lastIndexOf(" ")).trimEnd();

  return (
    <p className="text">
      {expanded ? text : `${preview}… `}
      <button
        type="button"
        className="read-more-btn"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </p>
  );
}
