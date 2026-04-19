import Link from "next/link";
import styles from "./home-hero.module.css";

export default function HomeHero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Campers of your dreams</h1>
      <p className={styles.subtitle}>
        You can find everything you want in our catalog
      </p>
      <Link href="/catalog" className={styles.viewBtn}>
        View Now
      </Link>
    </section>
  );
}
