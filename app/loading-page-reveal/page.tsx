"use client";

import { useGSAP } from "@gsap/react";
import styles from "./styles.module.css";
import { useRef } from "react";
import gsap from "gsap";

const disableScroll = () => {
  document.body.classList.add("disable-scroll");
};

const enableScroll = () => {
  document.body.classList.remove("disable-scroll");
};

function animate(
  preLoaderOverlayEl: HTMLElementTagNameMap["div"] | null,
  pageContentEl: HTMLElementTagNameMap["div"] | null,
) {
  const tl = gsap.timeline();
  tl.to(preLoaderOverlayEl, {
    scale: 0.1,
    duration: 0.75,
    ease: "power2.out",
    delay: 1,
  })
    .to(preLoaderOverlayEl, {
      scale: 0.25,
      duration: 1,
      ease: "power3.out",
    })
    .to(preLoaderOverlayEl, {
      scale: 0.5,
      duration: 0.75,
      ease: "power3.out",
    })
    .to(preLoaderOverlayEl, {
      scale: 0.75,
      duration: 0.5,
      ease: "power2.out",
    })
    .to(preLoaderOverlayEl, {
      scale: 1,
      duration: 1,
      ease: "power3.out",
      onComplete() {
        enableScroll();
      },
    })
    .to(preLoaderOverlayEl, {
      clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
      duration: 1.25,
      ease: "expo.out",
    })
    .to(
      pageContentEl,
      {
        y: "0",
        duration: 1.25,
        ease: "expo.out",
      },
      "<",
    );
}

export default function Page() {
  const preLoaderOverlayRef = useRef<HTMLElementTagNameMap["div"]>(null);
  const pageContentRef = useRef<HTMLElementTagNameMap["div"]>(null);

  useGSAP(() => {
    disableScroll();

    gsap.set(pageContentRef.current, { y: "100vh" });
    animate(preLoaderOverlayRef.current, pageContentRef.current);
  }, []);

  return (
    <>
      <div className="fixed inset-0 mx-auto">
        <section className="absolute top-1/2 w-full -translate-y-1/2">
          <div className="container mx-auto flex gap-8 border">
            <div className="max-w-xs">
              <h1 className="font-mono text-base font-semibold uppercase">
                Ipsum possimus autem porro velit cupiditate? Maiores delectus voluptatem animi temporibus debitis.
              </h1>
            </div>

            <div className="max-w-xs">
              <h1 className="font-mono text-base font-semibold uppercase">
                Ipsum possimus autem porro velit cupiditate? Maiores delectus voluptatem.
              </h1>
            </div>

            <div className="ml-auto self-center border">
              <p>00</p>
            </div>
          </div>
        </section>

        <div ref={preLoaderOverlayRef} className={`${styles.preloaderOverlay}`} />
      </div>

      <div ref={pageContentRef} className="relative z-10">
        <section className="h-screen">
          <img className="h-full w-full object-cover" src="https://picsum.photos/seed/picsum/1500/1000" alt="" />
        </section>
      </div>
    </>
  );
}
