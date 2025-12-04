"use client";

import { useRef, useEffect, useState } from "react";
import type { MousePosition } from "./types";

export function useMouseTracking() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });

      // Calculate normalized pointer position (-1 to 1) for CSS custom properties
      const ratioX = x / rect.width - 0.5;
      const ratioY = y / rect.height - 0.5;
      const pointerX = Math.max(-1, Math.min(1, ratioX * 2));
      const pointerY = Math.max(-1, Math.min(1, ratioY * 2));

      // Set CSS custom properties on the card element
      cardRef.current.style.setProperty("--pointer-x", pointerX.toString());
      cardRef.current.style.setProperty("--pointer-y", pointerY.toString());
    }

    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseenter", () => setIsHovering(true));
      card.addEventListener("mouseleave", () => setIsHovering(false));
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseenter", () => setIsHovering(true));
        card.removeEventListener("mouseleave", () => setIsHovering(false));
      }
    };
  }, []);

  return { cardRef, mousePosition, isHovering };
}

