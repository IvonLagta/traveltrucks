import Link from "next/link";
import css from "./home-hero.module.css";

export default function HomeHero() {
  return (
    <section className={css.hero}>
      <h1 className={css.title}>Campers of your dreams</h1>
      <p className={css.subtitle}>
        You can find everything you want in our catalog
      </p>
      <Link href="/catalog" className={css.viewBtn}>
        View Now
      </Link>
    </section>
  );
}
