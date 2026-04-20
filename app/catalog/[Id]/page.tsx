import { notFound } from "next/navigation";
import { isAxiosError } from "axios";
import BookingForm from "@/components/booking-form/booking-form";
import CamperGallery from "@/components/camper-gallery/camper-gallery";
import CamperReviews from "@/components/camper-reviews/camper-reviews";
import { getCamperById, getCamperReviews } from "@/lib/api/serverApi";
import type { PageProps } from "@/types/types";
import css from "./page.module.css";

export default async function CamperDetailPage({ params }: PageProps) {
  const { Id: camperId } = await params;

  let camper;
  let reviews;

  try {
    [camper, reviews] = await Promise.all([
      getCamperById(camperId),
      getCamperReviews(camperId),
    ]);
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }
    const message =
      isAxiosError(error) && error.message ? error.message : "Unknown error";
    return (
      <main className={css.errorPage}>
        <h1 className={css.errorTitle}>Error</h1>
        <p className={css.errorText}>Failed to load camper: {message}.</p>
      </main>
    );
  }

  const formatAmenityLabel = (value: string) =>
    value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  const formatFormValue = (value: string) =>
    value.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <main className={css.page}>
      <div className={css.topSection}>
        <CamperGallery camperName={camper.name} gallery={camper.gallery} />

        <div className={css.rightPanel}>
          <div className={css.info}>
            <h1 className={css.title}>{camper.name}</h1>
            <ul className={css.detailsList}>
              <li className={css.detailItem}>
                <svg className={css.iconStar} aria-hidden="true">
                  <use href="/icons.svg#star" />
                </svg>
                {camper.rating.toFixed(1)}({camper.totalReviews} Reviews)
              </li>
              <li className={css.detailItem}>
                <svg className={css.icon} aria-hidden="true">
                  <use href="/icons.svg#map" />
                </svg>
                {camper.location}
              </li>
            </ul>
            <div className={css.price}>€{camper.price}</div>
            <p className={css.description}>{camper.description}</p>
          </div>

          <div className={css.specs}>
            {camper.amenities.length > 0 && (
              <section className={css.panel}>
                <h2 className={css.panelTitle}>Vehicle details</h2>
                <div className={css.amenities}>
                  {camper.amenities.map((item) => (
                    <span key={item} className={css.amenity}>
                      {formatAmenityLabel(item)}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <section className={css.specsSection}>
              <ul className={css.specsList}>
                <li className={css.specsItem}>
                  <span className={css.specsLabel}>Form</span>
                  <span className={css.specsValue}>
                    {formatFormValue(camper.form)}
                  </span>
                </li>
                <li className={css.specsItem}>
                  <span className={css.specsLabel}>Length</span>
                  <span className={css.specsValue}>{camper.length}</span>
                </li>
                <li className={css.specsItem}>
                  <span className={css.specsLabel}>Width</span>
                  <span className={css.specsValue}>{camper.width}</span>
                </li>
                <li className={css.specsItem}>
                  <span className={css.specsLabel}>Height</span>
                  <span className={css.specsValue}>{camper.height}</span>
                </li>
                <li className={css.specsItem}>
                  <span className={css.specsLabel}>Tank</span>
                  <span className={css.specsValue}>{camper.tank}</span>
                </li>
                <li className={css.specsItem}>
                  <span className={css.specsLabel}>Consumption</span>
                  <span className={css.specsValue}>{camper.consumption}</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      <div className={css.bottomSection}>
        <CamperReviews reviews={reviews} />

        <aside>
          <BookingForm camperId={camperId} />
        </aside>
      </div>
    </main>
  );
}
