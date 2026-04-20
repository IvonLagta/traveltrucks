import { ReviewEntity } from "@/lib/camperApi";
import css from "./camper-reviews.module.css";

interface CamperReviewsProps {
  reviews: ReviewEntity[];
}

export default function CamperReviews({ reviews }: CamperReviewsProps) {
  return (
    <section className={css.section}>
      <h2 className={css.title}>Reviews</h2>
      {reviews.length === 0 ? (
        <p className={css.empty}>No reviews yet.</p>
      ) : (
        <ul className={css.list}>
          {reviews.map((review) => (
            <li key={review.id} className={css.item}>
              <div className={css.head}>
                <div className={css.avatar}>
                  {review.reviewer_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className={css.name}>{review.reviewer_name}</p>
                  <p className={css.meta}>
                    <span className={css.stars}>
                      {Array.from({ length: review.reviewer_rating }).map((_, i) => (
                        <svg key={i} className={css.starIcon} aria-hidden="true">
                          <use href="/icons.svg#star" />
                        </svg>
                      ))}
                    </span>
                  </p>
                </div>
              </div>
              <p className={css.comment}>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
