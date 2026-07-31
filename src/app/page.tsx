"use client";

import styles from "./page.module.css";
import Preloader from "@/components/Preloader";
import Landing from "@/components/Landing";

export default function Home() {
  return (
    <div className={styles.page}>
      <Preloader />
        <Landing />
    </div>
  );
}
