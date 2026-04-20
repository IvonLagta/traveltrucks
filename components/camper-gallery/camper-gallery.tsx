"use client";

import { useState } from "react";
import Image from "next/image";
import type { CamperGalleryProps } from "@/types/types";
import styles from "./camper-gallery.module.css";

export default function CamperGallery({
  camperName,
  gallery,
}: CamperGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (gallery.length === 0) {
    return null;
  }

  const activeImage = gallery[activeIndex];

  const showPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const showNext = () => {
    setActiveIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className={styles.section}>
      <div className={styles.mainFrame}>
        <div className={styles.mainSlide}>
          <Image
            src={activeImage.original}
            alt={`${camperName} - photo ${activeIndex + 1}`}
            fill
            sizes="638px"
            className={styles.image}
            priority
          />
        </div>

        <button
          type="button"
          className={`${styles.edgeZone} ${styles.edgeZonePrev}`}
          aria-label="Previous image"
          onClick={showPrevious}
        />

        <button
          type="button"
          className={`${styles.edgeZone} ${styles.edgeZoneNext}`}
          aria-label="Next image"
          onClick={showNext}
        />
      </div>

      <div className={styles.thumbsList}>
        {gallery.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className={`${styles.thumbButton} ${index === activeIndex ? styles.thumbButtonActive : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show image ${index + 1}`}>
            <div className={styles.thumbWrap}>
              <Image
                src={image.original}
                alt={`${camperName} - thumbnail ${index + 1}`}
                fill
                sizes="136px"
                className={styles.image}
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
