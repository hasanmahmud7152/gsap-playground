"use client";

import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useRef } from "react";
import styles from "./LinkList.module.css";

// type Props<T extends keyof HTMLElementTagNameMap> = Partial<HTMLElementTagNameMap[T]>;
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1");

export default function LinkList() {
  const links = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

  const placeHolder = useRef<HTMLElementTagNameMap["div"]>(null);

  const activeImgIndex = useRef(-1);
  const activeImgEl = useRef<HTMLElementTagNameMap["img"]>(null);
  const activeImgWrapperEl = useRef<HTMLElementTagNameMap["div"]>(null);

  const linkContainer = useRef<HTMLElementTagNameMap["ul"]>(null);

  const handleOnMouseEnter = (index: number) => {
    if (activeImgIndex.current === index) return;

    const prevHoverLink = linkContainer.current?.children[activeImgIndex.current]?.children[0];
    if (prevHoverLink) {
      const mouseEvent = new Event("mouseleave");
      prevHoverLink?.dispatchEvent(mouseEvent);
    }
    activeImgIndex.current = index;

    activeImgEl.current = document.createElement("img");
    activeImgEl.current.classList.add(styles["reveal-image"]);
    activeImgEl.current.src = `https://picsum.photos/seed/${index + 1}/900/600`;
    gsap.set(activeImgEl.current, { scale: 1.25, opacity: 0 });

    activeImgWrapperEl.current = document.createElement("div");
    activeImgWrapperEl.current.classList.add(styles["reveal-image-wrapper"]);
    gsap.set(activeImgWrapperEl.current, { opacity: 1, clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" });
    activeImgWrapperEl.current.appendChild(activeImgEl.current);

    placeHolder.current?.appendChild(activeImgWrapperEl.current);

    gsap.to(activeImgWrapperEl.current, {
      duration: 0.5,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "hop",
    });

    gsap.to(activeImgEl.current, {
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(activeImgEl.current, {
      scale: 1,
      duration: 1.25,
      ease: "hop",
      onComplete() {},
    });
  };

  const handleOnMouseLeave = (index: number) => {
    if (activeImgIndex.current === index) {
      activeImgIndex.current = -1;
    }

    const imgWrapperElToRemove = activeImgWrapperEl.current;

    activeImgWrapperEl.current = null;
    activeImgEl.current = null;

    gsap.to(imgWrapperElToRemove, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
      onComplete() {
        imgWrapperElToRemove?.remove();
      },
    });
  };

  return (
    <>
      <div ref={placeHolder} className="pointer-events-none absolute inset-0"></div>
      <ul ref={linkContainer} className="mt-[30%] ml-[10%] flex max-w-md flex-wrap gap-4">
        {links.map((item, index) => (
          <li key={item}>
            <a
              onMouseEnter={() => handleOnMouseEnter(index)}
              onMouseLeave={() => handleOnMouseLeave(index)}
              className={`relative inline-block py-1 text-2xl font-semibold capitalize ${styles.link}`}
              href="#"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
