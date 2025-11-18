"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function gsapRollingCounter(element: HTMLElement, endValue: number, duration: number = 2) {
  const obj = { val: 0 };

  gsap.to(obj, {
    val: endValue,
    duration,
    ease: "power3.out",
    onUpdate: () => {
      const current = Math.floor(obj.val);
      element.textContent = current.toString();
    },
  });
}

export default function Preloader() {
  const counterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (counterRef.current) {
      gsapRollingCounter(counterRef.current, 100, 2); // 0 → 100 in 2 sec
    }
  }, []);

  return (
    <div className="grid place-items-center h-screen">
      <p className="font-mono text-xl ">
        <span ref={counterRef}>0</span>%
      </p>
    </div>
  );
}
