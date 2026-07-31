"use client";

import styles from "./style.module.scss";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, useGSAP);

export default function Header() {
    const headerRef  = useRef<HTMLHeadElement>(null);
    const strideRef  = useRef<HTMLSpanElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const seasonSpansRef = useRef<HTMLSpanElement[]>([]);

    useGSAP(() => {
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

        const navLinks = gsap.utils.toArray<HTMLAnchorElement>(
            navRef.current?.querySelectorAll("a") ?? []
        );

        const navSplit = SplitText.create(navLinks, {
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



    }, { scope: headerRef });

    return (
        <header className={styles.header} ref={headerRef}>
            <div className={styles.logoWrapper}>
                <Link href="/" className={styles.logo}>
                    <span ref={strideRef}>STRIDE</span>
                    <span className={styles.copyright}>©</span>
                </Link>
            </div>

            <div className={styles.rightCol}>
                <nav className={styles.nav} ref={navRef}>
                    <Link href="/">NEW</Link>
                    <Link href="/">SHOP</Link>
                    <Link href="/">BESTSELLERS</Link>
                    <Link href="/">COLLECTIONS</Link>
                </nav>

                <div className={styles.season}>
                    <span ref={(el) => { if (el) seasonSpansRef.current[0] = el; }}>
                        FALL / WINTER
                    </span>
                    <span ref={(el) => { if (el) seasonSpansRef.current[1] = el; }}>
                        2024
                    </span>
                </div>
            </div>
        </header>
    );
}