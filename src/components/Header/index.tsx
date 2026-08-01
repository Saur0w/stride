"use client";

import styles from "./style.module.scss";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, useGSAP);

export default function Header() {
    const headerRef = useRef<HTMLHeadElement>(null);
    const strideRef = useRef<HTMLSpanElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const seasonSpansRef = useRef<HTMLSpanElement[]>([]);

    useGSAP(
        () => {
            const logoSplit = SplitText.create(strideRef.current!, {
                type: "chars",
                mask: "chars",
                maskClass: styles.logoMask,
            });

            gsap.from(logoSplit.chars, {
                delay: 7,
                yPercent: 110,
                duration: 1,
                ease: "power4.out",
                stagger: 0.045,
            });

            const navTexts = gsap.utils.toArray<HTMLElement>(
                navRef.current?.querySelectorAll(`.${styles.navText}`) ?? []
            );

            const navSplit = SplitText.create(navTexts, {
                type: "words",
                mask: "words",
            });

            gsap.from(navSplit.words, {
                delay: 7.5,
                yPercent: -110,
                duration: 1,
                ease: "power4.out",
                stagger: 0.045,
            });

            const navLinks = navRef.current?.querySelectorAll("a");

            navLinks?.forEach((link) => {
                const underline = link.querySelector(
                    `.${styles.underline}`
                ) as HTMLElement;
                if (!underline) return;

                const onMouseEnter = () => {
                    gsap.killTweensOf(underline);
                    gsap.set(underline, { transformOrigin: "left center" });
                    gsap.to(underline, {
                        scaleX: 1,
                        duration: 0.4,
                        ease: "power3.out",
                    });
                };

                const onMouseLeave = () => {
                    gsap.killTweensOf(underline);
                    gsap.set(underline, { transformOrigin: "right center" });
                    gsap.to(underline, {
                        scaleX: 0,
                        duration: 0.4,
                        ease: "power3.inOut",
                    });
                };

                link.addEventListener("mouseenter", onMouseEnter);
                link.addEventListener("mouseleave", onMouseLeave);
            });

            const seasonSplit = SplitText.create(seasonSpansRef.current!, {
                type: "words",
                mask: "words",
            });

            gsap.from(seasonSplit.words, {
                delay: 7.5,
                yPercent: 110,
                duration: 1,
                ease: "power4.out",
                stagger: 0.045,
            });
        },
        { scope: headerRef }
    );

    return (
        <header className={styles.header} ref={headerRef}>
            <div className={styles.logoWrapper}>
                <Link href="/" className={styles.logo}>
                    <span ref={strideRef}>STRIDE</span>
                    <span className={styles.copyright}>©</span>
                </Link>
            </div>

            <div className={styles.rightCol}>
                <nav className={styles.nav} ref={navRef} style={{ viewTransitionName: "navbar"}}>
                    <Link href="/">
                        <span className={styles.navText}>HOME</span>
                        <span className={styles.underline}></span>
                    </Link>
                    <Link href="/new">
                        <span className={styles.navText}>NEW</span>
                        <span className={styles.underline}></span>
                    </Link>
                    <Link href="/products">
                        <span className={styles.navText}>BESTSELLERS</span>
                        <span className={styles.underline}></span>
                    </Link>
                    <Link href="/collection">
                        <span className={styles.navText}>COLLECTIONS</span>
                        <span className={styles.underline}></span>
                    </Link>
                </nav>

                <div className={styles.season}>
                    <span
                        ref={(el) => {
                            if (el) seasonSpansRef.current[0] = el;
                        }}
                    >
                        FALL / WINTER
                    </span>
                    <span
                        ref={(el) => {
                            if (el) seasonSpansRef.current[1] = el;
                        }}
                    >
                        2024
                    </span>
                </div>
            </div>
        </header>
    );
}