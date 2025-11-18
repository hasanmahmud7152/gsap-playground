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

    const obj = { val: 0 };

    gsap.to(obj, {
      val: 100,
      duration: 5,
      ease: "power3.out",
      onUpdate: () => {
        const element = counterWrapperRef.current?.querySelector(".second-box");
        if (element) {
          element.textContent = "a";
        }

        // const current = Math.floor(obj.val);
        // element.textContent = current.toString();
      },
    });

    return () => {
      return clearInterval(foo);
    };
  }, []);

  return (
    <div className="grid h-screen place-items-center">
      <div>
        <div className="relative size-12 overflow-hidden outline">
          <div ref={counterWrapperRef} className="counter-wrapper absolute top-0 left-0 w-full">
            <div className="first-box grid size-12 place-items-center">R</div>
            <div className="second-box grid size-12 place-items-center">R</div>
          </div>
        </div>
      </div>
    </div>
  );
}
