"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function RollingCounter({
  duration: counterDuration = 3,
  minInterval = 0.1,
  delay = 0,
  acceleration = 150,
}: {
  duration?: number;
  minInterval?: number;
  delay?: number;
  acceleration?: number;
}) {
  const counterWrapperRef = useRef<HTMLElementTagNameMap["div"]>(null);

  useGSAP(() => {
    const counter = { val: 1 };
    gsap.to(counter, { val: 100, duration: counterDuration, delay });

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
        duration: duration <= minInterval ? minInterval : duration,
        onComplete() {
          elementA.textContent = elementB.textContent;
          gsap.set(counterWrapperRef.current, { top: "0%" });

          if (val < 100) {
            const speedIncreaseBy = counterDuration / acceleration;
            updateCounter(duration - speedIncreaseBy);
          }
        },
      });
    };

    setTimeout(() => updateCounter(counterDuration / 10), delay * 1000);
  }, []);

  return (
    <div className="relative h-(--height,16px) w-12 overflow-hidden text-sm font-mono">
      <div ref={counterWrapperRef} className="absolute top-0 left-0 w-full *:flex *:items-center *:justify-end">
        <div className="counter-box-a h-(--height,16px) w-full">0%</div>
        <div className="counter-box-b h-(--height,16px) w-full">0%</div>
      </div>
    </div>
  );
}

export default function RollingPage() {
  return (
    <div className="grid h-screen place-items-center ">
      <RollingCounter duration={3.5}></RollingCounter>
    </div>
  );
}
