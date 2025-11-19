"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import styles from "./styles.module.css";
import { RollingCounter } from "../(Counter)/rolling/page";

gsap.registerPlugin(SplitText);

class AppScroll {
  static lock() {
    document.body.classList.add("disable-scroll");
  }

  static release() {
    document.body.classList.remove("disable-scroll");
  }
}

function animate(
  preLoaderOverlayEl: HTMLElementTagNameMap["div"] | null,
  pageContentEl: HTMLElementTagNameMap["div"] | null,
) {
  const tl = gsap.timeline();
  tl.to(".preloader-copy", {
    opacity: "100%",
    duration: 0.25,
    delay: 0.1,
    ease: "expo.inOut",
  }).to(
    ".preloader-copy .line",
    {
      y: "0%",
      duration: 1,
      ease: "expo.out",
      stagger: 0.075,
    },
    "<",
  );

  tl.to(
    preLoaderOverlayEl,
    {
      opacity: 1,
      duration: 0.25,
      ease: "expo.in",
    },
    "-=0.85",
  )
    .to(preLoaderOverlayEl, {
      scale: 0.1,
      duration: 0.2,
      ease: "power1.out",
    })
    .to(preLoaderOverlayEl, {
      scale: 0.25,
      duration: 0.5,
      ease: "sine.out",
    })
    .to(preLoaderOverlayEl, {
      scale: 0.5,
      duration: 0.2,
      ease: "sine.out",
    })
    .to(preLoaderOverlayEl, {
      scale: 0.65,
      duration: 0.2,
      ease: "sine.out",
    })
    .to(preLoaderOverlayEl, {
      scale: 1,
      duration: 0.3,
      ease: "sine.inOut",
      onComplete() {
        AppScroll.release();

        gsap.set(document.querySelector("#preloader-text-content"), { opacity: 0, pointerEvents: "none" });
      },
    })
    .to(
      preLoaderOverlayEl,
      {
        clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
        duration: 1.75,
        ease: "expo.out",
      },
      "-=0.1",
    )
    .to(
      pageContentEl,
      {
        y: "0",
        duration: 1,
        ease: "expo.out",
      },
      "<",
    );
}

function animateCounter(counterEl: HTMLElementTagNameMap["p"] | null, duration = 5, delay = 0) {
  if (!counterEl) return;

  let curretnVallue = 0;
  const updateIntervale = 200;
  const maxDuration = duration * 1000;
  const startTime = Date.now();
  let intervalTimeout: NodeJS.Timeout;

  setTimeout(() => {
    const updateCounter = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = elapsedTime / maxDuration;

      if (curretnVallue < 100 && elapsedTime < maxDuration) {
        const target = Math.floor(progress * 100);
        const jump = Math.floor(Math.random() * 25) * 5;
        curretnVallue = Math.min(curretnVallue + jump, target, 100);

        counterEl.textContent = curretnVallue.toString() + "%";
      } else {
        counterEl.textContent = "100%";
        clearInterval(intervalTimeout);
      }
    };

    intervalTimeout = setInterval(updateCounter, updateIntervale);
  }, delay * 1000);
}

function splitTextIntoLines(selector: gsap.DOMTarget | undefined, options: Partial<SplitText.Vars> = {}) {
  if (!selector) return;

  const defaults: SplitText.Vars = {
    type: "lines",
    mask: "lines",
    linesClass: "line",
    ...options,
  };

  return SplitText.create(selector, defaults);
}

export default function Page() {
  const preLoaderTextContainerRef = useRef<HTMLElementTagNameMap["div"]>(null);
  const preLoaderOverlayRef = useRef<HTMLElementTagNameMap["div"]>(null);
  const pageContentRef = useRef<HTMLElementTagNameMap["div"]>(null);
  // const counterRef = useRef<HTMLElementTagNameMap["p"]>(null);

  useGSAP(() => {
    AppScroll.lock();

    splitTextIntoLines(preLoaderTextContainerRef.current?.querySelectorAll(".preloader-copy"));

    gsap.set(".preloader-copy .line", { y: "100%" });

    gsap.set(pageContentRef.current, { y: "100vh" });
    // animateCounter(counterRef.current, 4.8, 0.2);
    animate(preLoaderOverlayRef.current, pageContentRef.current);
  }, []);

  return (
    <>
      <section className="fixed inset-0 z-10 mx-auto">
        <div
          ref={preLoaderTextContainerRef}
          id="preloader-text-content"
          className="absolute top-1/2 w-full -translate-y-1/2"
        >
          <div className="flex gap-8 px-6">
            <div className="max-w-xs">
              <p className="preloader-copy font-mono text-sm uppercase opacity-0">
                Ipsum possimus autem porro velit cupiditate? Maiores delectus voluptatem animi temporibus debitis.
              </p>
            </div>

            <div className="max-w-xs">
              <p className="preloader-copy font-mono text-sm uppercase opacity-0">
                Ipsum possimus autem porro velit cupiditate? Maiores delectus voluptatem.
              </p>
            </div>

            <div className="ml-auto self-center">
              <RollingCounter delay={0.8} duration={2.2} acceleration={200} />
            </div>
          </div>
        </div>

        <div ref={preLoaderOverlayRef} className={`${styles.preloaderOverlay}`} />
      </section>

      <div ref={pageContentRef}>
        <section className="h-screen">
          <img className="h-full w-full object-cover" src="https://picsum.photos/seed/picsum/1500/1000" alt="" />
        </section>

        <section className="h-screen">
          <img className="h-full w-full object-cover" src="https://picsum.photos/seed/one/1500/1000" alt="" />
        </section>
      </div>
    </>
  );
}
