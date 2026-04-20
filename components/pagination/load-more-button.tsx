import css from "./load-more-button.module.css";

interface LoadMoreButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export default function LoadMoreButton({
  isLoading,
  onClick,
}: LoadMoreButtonProps) {
  return (
    <div className={css.wrap}>
      <button
        type="button"
        onClick={onClick}
        disabled={isLoading}
        className={css.button}>
        {isLoading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}
