import Button from "@/components/button/button";
import bgImage from "@/public/bgImage.jpg";
import css from "./home.module.css";

export default function HomeHero() {
  return (
    <section
      className={css.hero}
      style={{ backgroundImage: `url(${bgImage.src})` }}>
      <h1 className={css.title}>Campers of your dreams</h1>
      <p className={css.subtitle}>
        You can find everything you want in our catalog
      </p>
      <Button href="/catalog" variant="mainBtn" className={css.viewBtn}>
        View Now
      </Button>
    </section>
  );
}
