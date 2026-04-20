import Button from "@/components/button/button";
import type { LoadMoreButtonProps } from "@/types/types";
import css from "./load-more-button.module.css";

export default function LoadMoreButton({
  isLoading,
  onClick,
}: LoadMoreButtonProps) {
  return (
    <div className={css.wrap}>
      <Button
        type="button"
        onClick={onClick}
        disabled={isLoading}
        variant="clearBtn"
        className={css.button}>
        {isLoading ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
}
