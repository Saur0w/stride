"use client";

import styles from "./style.module.scss";
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logoWrapper}>
                <Link href="/" className={styles.logo}>
                    STRIDE<span className={styles.copyright}>©</span>
                </Link>
            </div>

            <div className={styles.rightCol}>
                <nav className={styles.nav}>
                    <Link href="/">NEW</Link>
                    <Link href="/">SHOP</Link>
                    <Link href="/">BESTSELLERS</Link>
                    <Link href="/">COLLECTIONS</Link>
                </nav>

                <div className={styles.season}>
                    <span>FALL / WINTER</span>
                    <span>2024</span>
                </div>
            </div>
        </header>
    );
}