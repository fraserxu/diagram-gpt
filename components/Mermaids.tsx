"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

import { Copy } from "lucide-react";

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>("Copy SVG");

  useEffect(() => {
    mermaid.mermaidAPI.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "forest",
      logLevel: 5,
    });
  }, []);

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

  const copyToClipboard = (text: string) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const handleCopyClick = () => {
    const container = ref.current;

    if (!container) return;

    const svgElement = container.querySelector("svg");

    if (svgElement) {
      const svgCode = svgElement.outerHTML;
      copyToClipboard(svgCode);
      setLabel("Copied!");

      setTimeout(() => {
        setLabel("Copy SVG");
      }, 1000);
    }
  };

  return (
    <div className="w-full">
      <div className="absolute right-0 px-4 py-2 text-xs font-sans justify-between">
        <button className="flex ml-auto gap-2" onClick={handleCopyClick}>
          <Copy className="mr-2 h-4 w-4" />
          {label}
        </button>
      </div>
      <div ref={ref} className="mermaid flex items-center justify-center">
        {chart}
      </div>
    </div>
  );
}
