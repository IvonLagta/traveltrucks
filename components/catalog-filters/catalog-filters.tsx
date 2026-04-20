import { CamperFilters, FiltersResponseDto } from "@/lib/camperApi";
import FilterRadioGroup from "@/components/filter-radio-group/filter-radio-group";
import Button from "@/components/button/button";
import css from "./catalog-filters.module.css";

interface CatalogFiltersProps {
  filterOptions?: FiltersResponseDto;
  pendingFilters: CamperFilters;
  onPendingFiltersChange: (
    updater: (prev: CamperFilters) => CamperFilters,
  ) => void;
  onApply: () => void;
  onReset: () => void;
}

export default function CatalogFilters({
  filterOptions,
  pendingFilters,
  onPendingFiltersChange,
  onApply,
  onReset,
}: CatalogFiltersProps) {
  return (
    <aside className={css.aside}>
      <div className={css.panel}>
        <h2 className={css.title}>Filters</h2>

        <div className={css.content}>
          <label className={css.field}>
            <span className={css.label}>Location</span>
            <input
              type="text"
              placeholder="Kyiv, Ukraine"
              value={pendingFilters.location ?? ""}
              onChange={(e) =>
                onPendingFiltersChange((prev) => ({
                  ...prev,
                  location: e.target.value || undefined,
                }))
              }
              className={css.input}
            />
          </label>

          <FilterRadioGroup
            label="Camper Form"
            name="form"
            options={filterOptions?.forms ?? []}
            value={pendingFilters.form}
            onChange={(value) =>
              onPendingFiltersChange((prev) => ({
                ...prev,
                form: value,
              }))
            }
          />

          <FilterRadioGroup
            label="Transmission"
            name="transmission"
            options={filterOptions?.transmissions ?? []}
            value={pendingFilters.transmission}
            onChange={(value) =>
              onPendingFiltersChange((prev) => ({
                ...prev,
                transmission: value,
              }))
            }
          />

          <FilterRadioGroup
            label="Engine"
            name="engine"
            options={filterOptions?.engines ?? []}
            value={pendingFilters.engine}
            onChange={(value) =>
              onPendingFiltersChange((prev) => ({
                ...prev,
                engine: value,
              }))
            }
          />

          <div className={css.actions}>
            <Button type="button" onClick={onApply} variant="mainBtn">
              Apply
            </Button>
            <Button type="button" onClick={onReset} variant="clearBtn">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
