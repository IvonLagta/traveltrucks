import Image from "next/image";
import { MiddleTruncate } from "@re-dev/react-truncate";
import Button from "@/components/button/button";
import { CamperListItemDto } from "@/lib/camperApi";
import css from "./camper-card.module.css";

interface CamperCardProps {
  camper: CamperListItemDto;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const featureChips = [camper.engine, camper.transmission, camper.form];
  const formatFeatureLabel = (value: string) =>
    value.replace(/_/g, " ").replace(/^\w/, (char) => char.toUpperCase());
  const formatLocation = (value: string) => {
    const parts = value
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    if (parts.length === 2) {
      return `${parts[1]}, ${parts[0]}`;
    }

    return value;
  };

  return (
    <article className={css.card}>
      <div className={css.imageWrap}>
        <Image
          src={camper.coverImage}
          alt={camper.name}
          fill
          sizes="(max-width: 1023px) 100vw, 292px"
          className={css.image}
        />
      </div>
      <div className={css.info}>
        <div className={css.header}>
          <h2 className={css.name}>{camper.name}</h2>
          <span className={css.price}>€{camper.price.toLocaleString()}</span>
        </div>
        <div className={css.details}>
          <p className={css.rating}>
            ⭐ {camper.rating.toFixed(1)}({camper.totalReviews} Reviews)
          </p>
          <p className={css.location}>{formatLocation(camper.location)}</p>
        </div>

        <div className={css.description}>
          <MiddleTruncate end={0}>{camper.description}</MiddleTruncate>
        </div>

        <div className={css.amenities}>
          {featureChips.map((item) => (
            <span key={item} className={css.amenity}>
              {formatFeatureLabel(item)}
            </span>
          ))}
        </div>
        <Button
          href={`/catalog/${camper.id}`}
          variant="mainBtn"
          className={css.link}>
          Show More
        </Button>
      </div>
    </article>
  );
}
