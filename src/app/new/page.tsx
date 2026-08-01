"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

const NEW_ARRIVALS = [
    {
        id: 1,
        title: "TIMELESS NOIR ELEGANCE STILETTO",
        price: "$299.99",
        image: "/images/left.jpg",
        hasMoreColors: false,
    },
    {
        id: 2,
        title: "RADIANT SILVER CASCADE STILETTO",
        price: "$429.99",
        image: "/images/main.jpg",
        hasMoreColors: true,
    },
    {
        id: 3,
        title: "ROSE GOLD ENCHANTMENT STILETTO",
        price: "$359.99",
        image: "/images/right.jpg",
        hasMoreColors: true,
    },
];

export default function New() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);

            gsap.from(cards, {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out",
                stagger: 0.12,
            });
        },
        { scope: containerRef }
    );

    return (
        <section className={styles.newSection} ref={containerRef}>
            <div className={styles.grid}>
                {NEW_ARRIVALS.map((product) => (
                    <div key={product.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                priority
                                unoptimized
                                className={styles.productImg}
                            />
                        </div>

                        <div className={styles.cardFooter}>
                            <div className={styles.details}>
                                <span className={styles.title}>{product.title}</span>
                                <span className={styles.price}>{product.price}</span>
                            </div>

                            {product.hasMoreColors && (
                                <span className={styles.moreColors}>+MORE COLORS</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}