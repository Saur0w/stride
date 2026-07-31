"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import styles from "./style.module.scss";

const WORD = "STRIDE";
const LOOP_COUNT = 8;

export default function Preloader() {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        if (!preloaderRef.current || !headingRef.current) return;

        const tl = gsap.timeline({ paused: true });
        const chars = gsap.utils.toArray<HTMLSpanElement>(`.${styles.char}`);

        chars.forEach((char, i) => {
            const original = char.querySelector<HTMLDivElement>(`.${styles.originalText}`);
            const clone = char.querySelector<HTMLDivElement>(`.${styles.cloneText}`);

            if (!original || !clone) return;

            const isEven = i % 2 === 0;

            gsap.set(clone, {
                yPercent: isEven ? -100 : 100,
            });

            const roll = gsap.to([original, clone], {
                repeat: LOOP_COUNT,
                ease: "none",
                yPercent: isEven ? "+=100" : "-=100",
                duration: 1,
            });

            tl.add(roll, 0);
        });

        // 1. Scrub slot machine timeline
        gsap.to(tl, {
            progress: 1,
            duration: 4,
            ease: "power4.out",
            onComplete: () => {
                // 2. Exit sequence after landing
                const exitTl = gsap.timeline();

                // Slide the text up out of view
                exitTl.to(headingRef.current, {
                    yPercent: -110,
                    duration: 0.8,
                    ease: "power4.inOut",
                })
                    // Lift the entire preloader background up to reveal the page
                    .to(preloaderRef.current, {
                        yPercent: -100,
                        duration: 1,
                        ease: "power4.inOut",
                        onComplete: () => {
                            if (preloaderRef.current) {
                                preloaderRef.current.style.display = "none";
                            }
                        }
                    }, "-=0.4"); // Overlap slightly for fluid editorial timing
            }
        });

    }, { scope: preloaderRef });

    return (
        <section className={styles.preloader} ref={preloaderRef}>
            <div className={styles.text}>
                <h1 ref={headingRef}>
                    {WORD.split("").map((letter, index) => (
                        <span key={index} className={styles.char}>
                            <div className={styles.originalText}>{letter}</div>
                            <div className={styles.cloneText}>{letter}</div>
                        </span>
                    ))}
                </h1>
            </div>
        </section>
    );
}