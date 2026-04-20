"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { MiddleTruncate } from "@re-dev/react-truncate";
import Button from "@/components/button/button";
import { getCamperById } from "@/lib/api/clientApi";
import type { CamperCardProps } from "@/types/types";
import css from "./camper-card.module.css";

export default function CamperCard({ camper }: CamperCardProps) {
  const [imageCandidates, setImageCandidates] = useState<string[]>([
    camper.coverImage,
  ]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [hasRequestedGallery, setHasRequestedGallery] = useState(false);

  const featureChips = [
    {
      key: "engine",
      value: camper.engine,
      icon: "gas",
      iconClass: css.iconMedium,
    },
    { key: "form", value: camper.form, icon: "car", iconClass: css.iconMedium },
    {
      key: "transmission",
      value: camper.transmission,
      icon: "kpp",
      iconClass: css.iconMedium,
    },
  ];
  const activeImageSrc = imageCandidates[activeImageIndex] || "/bgImage.jpg";

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

  const handleImageError = useCallback(async () => {
    if (activeImageIndex + 1 < imageCandidates.length) {
      setActiveImageIndex((prev) => prev + 1);
      return;
    }

    if (hasRequestedGallery) {
      return;
    }

    setHasRequestedGallery(true);

    try {
      const details = await getCamperById(camper.id);
      const galleryUrls = details.gallery
        .map((image) => image.original)
        .filter(Boolean);

      const mergedCandidates = [
        ...imageCandidates,
        ...galleryUrls.filter((url) => !imageCandidates.includes(url)),
        "/bgImage.jpg",
      ];

      setImageCandidates(mergedCandidates);

      if (activeImageIndex + 1 < mergedCandidates.length) {
        setActiveImageIndex((prev) => prev + 1);
      }
    } catch {
      setImageCandidates((prev) =>
        prev.includes("/bgImage.jpg") ? prev : [...prev, "/bgImage.jpg"],
      );
      setActiveImageIndex((prev) => prev + 1);
    }
  }, [activeImageIndex, camper.id, hasRequestedGallery, imageCandidates]);

  return (
    <article className={css.card}>
      <div className={css.imageWrap}>
        <Image
          src={activeImageSrc}
          alt={camper.name}
          fill
          sizes="(max-width: 1023px) 100vw, 292px"
          className={css.image}
          onError={handleImageError}
        />
      </div>
      <div className={css.info}>
        <div className={css.header}>
          <h2 className={css.name}>{camper.name}</h2>
          <span className={css.price}>€{camper.price}</span>
        </div>
        <div className={css.details}>
          <p className={css.detailItem}>
            <svg className={css.iconStar} aria-hidden="true">
              <use href="/icons.svg#star" />
            </svg>
            {camper.rating.toFixed(1)}({camper.totalReviews} Reviews)
          </p>
          <p className={css.detailItem}>
            <svg className={css.iconSmall} aria-hidden="true">
              <use href="/icons.svg#map" />
            </svg>
            {formatLocation(camper.location)}
          </p>
        </div>

        <div className={css.description}>
          <MiddleTruncate end={0}>{camper.description}</MiddleTruncate>
        </div>

        <div className={css.amenities}>
          {featureChips.map((item) => (
            <span key={item.key} className={css.amenity}>
              <svg className={item.iconClass} aria-hidden="true">
                <use href={`/icons.svg#${item.icon}`} />
              </svg>
              {formatFeatureLabel(item.value)}
            </span>
          ))}
        </div>
        <Button
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="primaryButton"
          className={css.link}>
          Show More
        </Button>
      </div>
    </article>
  );
}
