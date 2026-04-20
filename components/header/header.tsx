"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./header.module.css";

export default function SiteHeader() {
  const pathname = usePathname();
  const isCatalogActive =
    pathname === "/catalog" || pathname.startsWith("/catalog/");

  return (
    <header
      className={`${css.header} ${isCatalogActive ? css.catalogHeader : ""}`}>
      <div className="container">
        <div className={css.headerContainer}>
          <div className={css.logo}>
            <Link href="/" className={css.logoLink}>
              Travel<span className={css.logoAccent}>Trucks</span>
            </Link>
          </div>
          <nav className={css.nav}>
            <ul className={css.navList}>
              <li className={css.navItem}>
                <Link href="/" className={css.link}>
                  Home
                </Link>
              </li>
              <li className={css.navItem}>
                <Link
                  href="/catalog"
                  className={`${css.link} ${css.catalogLink} ${isCatalogActive ? css.activeLink : ""}`}>
                  Catalog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
