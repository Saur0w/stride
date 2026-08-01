"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(useGSAP, SplitText);

const PRODUCT_IMAGES = [
    "/images/toe.jpg",
    "/images/heels.jpg",
    "/images/cactus.jpg",
    "/images/blanket.jpg",
];

const COLORS = [
    { id: "black", name: "BLACK", hex: "#000000" },
    { id: "nude", name: "NUDE", hex: "#B88A60" },
    { id: "silver", name: "SILVER", hex: "#B0B5B8" },
];

export default function Products() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mainImageRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    const [activeImage, setActiveImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(`.${styles.thumb}`, {
                opacity: 0,
                x: -20,
                stagger: 0.08,
                duration: 0.8,
            })
                .from(
                    mainImageRef.current,
                    {
                        opacity: 0,
                        scale: 0.96,
                        duration: 1,
                    },
                    "-=0.6"
                );

            if (titleRef.current) {
                const titleSplit = SplitText.create(titleRef.current, {
                    type: "chars",
                });

                tl.from(
                    titleSplit.chars,
                    {
                        yPercent: 120,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power4.out",
                        stagger: 0.02,
                    },
                    "-=0.8"
                );
            }

            tl.from(
                `.${styles.details} > *:not(.${styles.title})`,
                {
                    opacity: 0,
                    y: 20,
                    stagger: 0.06,
                    duration: 0.8,
                },
                "-=0.6"
            );

        },
        { scope: containerRef }
    );

    const handleThumbClick = (index: number) => {
        if (index === activeImage) return;
        setActiveImage(index);

        if (mainImageRef.current) {
            gsap.fromTo(
                mainImageRef.current,
                { opacity: 0.4 },
                { opacity: 1, duration: 0.4, ease: "power2.out" }
            );
        }
    };

    return (
        <section className={styles.products} ref={containerRef}>
            <div className={styles.container}>
                <div className={styles.thumbnails}>
                    {PRODUCT_IMAGES.map((src, idx) => (
                        <button
                            key={idx}
                            className={`${styles.thumb} ${
                                activeImage === idx ? styles.activeThumb : ""
                            }`}
                            onClick={() => handleThumbClick(idx)}
                        >
                            <Image
                                src={src}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                unoptimized
                                className={styles.thumbImg}
                            />
                        </button>
                    ))}
                </div>

                <div className={styles.mainDisplay}>
                    <div className={styles.mainImageWrapper} ref={mainImageRef}>
                        <Image
                            src={PRODUCT_IMAGES[activeImage]}
                            alt="Dazzling Diamond Pointed-Toe Stiletto Heels"
                            fill
                            priority
                            unoptimized
                            className={styles.mainImg}
                        />
                    </div>
                </div>

                <div className={styles.details}>
                    <span className={styles.badge}>ONLINE EXCLUSIVE</span>

                    <h1 className={styles.title} ref={titleRef}>
                        Dazzling Diamond Pointed-Toe Stiletto Heels
                    </h1>

                    <span className={styles.price}>$449.99</span>

                    <div className={styles.rating}>
                        <span className={styles.stars}>★★★★★</span>
                        <span className={styles.reviewCount}>5 REVIEWS</span>
                    </div>

                    <div className={styles.colorSection}>
            <span className={styles.label}>
              COLOR: <strong>{selectedColor.name}</strong>
            </span>
                        <div className={styles.swatches}>
                            {COLORS.map((color) => (
                                <button
                                    key={color.id}
                                    className={`${styles.swatch} ${
                                        selectedColor.id === color.id ? styles.activeSwatch : ""
                                    }`}
                                    style={{ backgroundColor: color.hex }}
                                    onClick={() => setSelectedColor(color)}
                                    aria-label={color.name}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={styles.sizeSection}>
                        <button className={styles.sizeDropdown}>
                            SIZE: SELECT SIZE <span className={styles.arrow}>›</span>
                        </button>
                        <button className={styles.sizeGuideBtn}>SIZE GUIDE</button>
                    </div>

                    <button className={styles.addToCartBtn}>ADD TO CART - $449.99</button>

                    <p className={styles.shippingNote}>
                        FREE SHIPPING ON US ORDERS $100+
                    </p>

                    <div className={styles.footerLinks}>
                        <Link href="/">DESCRIPTION</Link>
                        <span className={styles.slash}>/</span>
                        <Link href="/">CONTACT</Link>
                        <span className={styles.slash}>/</span>
                        <Link href="/">RETURN POLICY</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}