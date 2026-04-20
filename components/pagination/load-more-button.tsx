import Button from "@/components/button/button";
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
