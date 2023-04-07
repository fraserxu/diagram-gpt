"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.mermaidAPI.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "forest",
      logLevel: 5,
    });
  });

  useEffect(() => {
    async function drawChart() {
      if (chart !== "") {
        if (ref.current) {
          ref.current.removeAttribute("data-processed");
        }
        await mermaid.run();
      }
    }

    drawChart();
  }, [chart]);

  return (
    <div ref={ref} className="mermaid">
      {chart}
    </div>
  );
}
