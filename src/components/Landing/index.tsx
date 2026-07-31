"use client";

import styles from "./style.module.scss";
import Image from "next/image";

export default function Landing() {
    return (
        <section className={styles.landing}>
            <div className={styles.imageWrapper}>
                <Image
                    src="/images/main.jpg"
                    alt="Stride Hero Background"
                    fill
                    priority
                    sizes="100vw"
                    unoptimized
                />
                <div className={styles.overlay} />
            </div>

            {/* Layered Content in Front */}
            <div className={styles.content}>
                <h1 className={styles.title}>STRIDE</h1>
                <p className={styles.subtitle}>
                    Invites her into a realm of luxurious footwear
                </p>
            </div>
        </section>
    );
}