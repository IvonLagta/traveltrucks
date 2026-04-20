import Link from "next/link";
import { notFound } from "next/navigation";
import { isAxiosError } from "axios";
import BookingForm from "@/components/booking-form/booking-form";
import CamperGallery from "@/components/camper-gallery/camper-gallery";
import CamperReviews from "@/components/camper-reviews/camper-reviews";
import CamperSpecs from "@/components/camper-specs/camper-specs";
import { getCamperById, getCamperReviews } from "@/lib/camperApi";
import css from "./page.module.css";

interface PageProps {
  params: Promise<{ camperId: string }>;
}

export default async function CamperDetailPage({ params }: PageProps) {
  const { camperId } = await params;

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
      isAxiosError(error) && error.message ? error.message : "Невідома помилка";
    return (
      <main className={css.errorPage}>
        <h1 className={css.errorTitle}>Помилка</h1>
        <p className={css.errorText}>
          Не вдалося завантажити кемпер: {message}.
        </p>
        <Link href="/catalog" className={css.errorLink}>
          ← Назад до каталогу
        </Link>
      </main>
    );
  }

  const engineText = Array.isArray(camper.engine)
    ? camper.engine.join(", ")
    : camper.engine;

  return (
    <main className={css.page}>
      <div className={css.header}>
        <div>
          <h1 className={css.title}>{camper.name}</h1>
          <p className={css.meta}>{camper.location}</p>
          <p className={css.metaSmall}>
            ⭐ {camper.rating.toFixed(1)} · {camper.totalReviews} відгуків
          </p>
        </div>
        <div className={css.headerActions}>
          <span className={css.price}>€{camper.price.toLocaleString()}</span>
          <Link href="/catalog" className={css.backLink}>
            ← Каталог
          </Link>
        </div>
      </div>

      <CamperGallery camperName={camper.name} gallery={camper.gallery} />

      <div className={css.content}>
        <div className={css.main}>
          <section className={css.panel}>
            <h2 className={css.panelTitle}>Опис</h2>
            <p className={css.description}>{camper.description}</p>
          </section>

          <CamperSpecs
            form={camper.form}
            engine={engineText}
            transmission={camper.transmission}
            length={camper.length}
            width={camper.width}
            height={camper.height}
            tank={camper.tank}
            consumption={camper.consumption}
          />

          {camper.amenities.length > 0 && (
            <section className={css.panel}>
              <h2 className={css.panelTitle}>Зручності</h2>
              <div className={css.amenities}>
                {camper.amenities.map((item) => (
                  <span key={item} className={css.amenity}>
                    {item}
                  </span>
                ))}
              </div>
            </section>
          )}

          <CamperReviews reviews={reviews} />
        </div>

        <aside>
          <BookingForm camperId={camperId} />
        </aside>
      </div>
    </main>
  );
}
