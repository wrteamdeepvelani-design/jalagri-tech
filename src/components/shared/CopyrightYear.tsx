/**
 * CopyrightYear — the footer year has to stay correct on a static export,
 * where the HTML is generated once at build time and then served unchanged.
 * The build year is rendered server-side so crawlers and no-JS visitors see a
 * real year, then the browser corrects it on mount if the calendar has moved
 * on since the last deploy.
 */
"use client";

import { useEffect, useState } from "react";

const BUILD_YEAR = new Date().getFullYear();

export default function CopyrightYear() {
  const [year, setYear] = useState(BUILD_YEAR);

  useEffect(() => {
    const current = new Date().getFullYear();
    if (current !== BUILD_YEAR) setYear(current);
  }, []);

  return <>{year}</>;
}
