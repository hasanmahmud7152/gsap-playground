"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  useGSAP(() => {
    gsap.to(".c", {
      scrollTrigger: {
        trigger: ".c",
        toggleActions: "play none none none",
        pin: true,
      },
      rotate: 360,
      x: 400,
    });
  }, []);

  return (
    <div>
      <div className="container mx-auto grid gap-24">
        <div className="grid h-[50dvh] place-items-center">
          <div className="a size-30 bg-red-400"></div>
        </div>
        <div className="grid h-[50dvh] place-items-center">
          <div className="b size-30 bg-red-400"></div>
        </div>
        <div className="grid h-[50dvh] place-items-center">
          <div className="c size-30 bg-red-400"></div>
        </div>
        <div className="h-screen"></div>
      </div>
    </div>
  );
}
