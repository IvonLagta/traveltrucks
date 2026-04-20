import Link from "next/link";
import css from "./header.module.css";

export default function SiteHeader() {
  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <div className={css.logo}>
          <Link href="/" className={css.logoMain}>
            Travel<span className={css.logoAccent}>Trucks</span>
          </Link>
        </div>
        <nav className={css.nav}>
          <Link href="/" className={css.link}>
            Home
          </Link>
          <Link href="/catalog" className={css.link}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
