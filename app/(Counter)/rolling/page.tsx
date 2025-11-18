"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function RollingCounter({ duration: counterDuration = 3 }: { duration?: number }) {
  const counterWrapperRef = useRef<HTMLElementTagNameMap["div"]>(null);

  useGSAP(() => {
    const counter = { val: 1 };
    gsap.to(counter, { val: 100, duration: counterDuration });

    const updateCounter = (duration: number) => {
      const elementA = counterWrapperRef.current?.querySelector(".counter-box-a");
      const elementB = counterWrapperRef.current?.querySelector(".counter-box-b");

      if (!(elementA && elementB)) {
        return;
      }

      const val = Math.round(counter.val);

      elementB.textContent = val.toString() + "%";
      gsap.to(counterWrapperRef.current, {
        top: "-100%",
        ease: "power1.out",
        duration: duration <= 0 ? 0.05 : duration,
        onComplete() {
          elementA.textContent = elementB.textContent;
          gsap.set(counterWrapperRef.current, { top: "0%" });

          if (val < 100) {
            updateCounter(duration - counterDuration / 150);
          }
        },
      });
    };

    updateCounter(counterDuration / 10);
  }, []);

  return (
    <div className="relative h-(--height,16px) w-12 overflow-hidden text-sm">
      <div ref={counterWrapperRef} className="absolute top-0 left-0 w-full *:flex *:items-center *:justify-end">
        <div className="counter-box-a h-(--height,16px) w-full">0</div>
        <div className="counter-box-b h-(--height,16px) w-full">0</div>
      </div>
    </div>
  );
}

export default function RollingPage() {
  return (
    <div className="grid h-screen place-items-center font-mono">
      <RollingCounter></RollingCounter>
    </div>
  );
}
