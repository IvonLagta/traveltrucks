import Link from "next/link";
import { CamperListItemDto } from "@/lib/camperApi";
import css from "./camper-card.module.css";

interface CamperCardProps {
  camper: CamperListItemDto;
}

export default function CamperCard({ camper }: CamperCardProps) {
  return (
    <article className={css.card}>
      <div className={css.imageWrap}>
        <img src={camper.coverImage} alt={camper.name} className={css.image} />
      </div>
      <div className={css.header}>
        <h2 className={css.name}>{camper.name}</h2>
        <span className={css.price}>
          €{camper.price.toLocaleString()}
        </span>
      </div>
      <p className={css.meta}>{camper.location}</p>
      <p className={css.rating}>
        ⭐ {camper.rating.toFixed(1)} · {camper.totalReviews} Reviews
      </p>
      <div className={css.amenities}>
        {camper.amenities.slice(0, 4).map((item) => (
          <span key={item} className={css.amenity}>
            {item}
          </span>
        ))}
      </div>
      <Link href={`/catalog/${camper.id}`} className={css.link}>
        Show More
      </Link>
    </article>
  );
}
