"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function RollingPage() {
  const counterWrapperRef = useRef<HTMLElementTagNameMap["div"]>(null);

  useGSAP(() => {
    const foo = setInterval(() => {
      gsap.to(counterWrapperRef.current, {
        top: "-100%",
        onComplete() {
          gsap.set(counterWrapperRef.current, { top: "0%" });
        },
      });
    }, 500);

    return () => {
      return clearInterval(foo);
    };
  }, []);

  return (
    <div className="grid h-screen place-items-center">
      <div>
        <div className="relative size-12 overflow-hidden outline">
          <div ref={counterWrapperRef} className="counter-wrapper absolute top-0 left-0 w-full">
            <div className="grid size-12 place-items-center">R</div>
            <div className="grid size-12 place-items-center">R</div>
          </div>
        </div>
      </div>
    </div>
  );
}
