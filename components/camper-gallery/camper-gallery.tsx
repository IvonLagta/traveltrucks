import { CamperImageEntity } from "@/lib/camperApi";
import styles from "./camper-gallery.module.css";

interface CamperGalleryProps {
  camperName: string;
  gallery: CamperImageEntity[];
}

export default function CamperGallery({
  camperName,
  gallery,
}: CamperGalleryProps) {
  if (gallery.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {gallery.map((image, index) => (
          <div
            key={image.id}
            className={`${styles.item} ${index === 0 ? styles.itemMain : ""}`}>
            <img
              src={image.original}
              alt={`${camperName} — фото ${index + 1}`}
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
