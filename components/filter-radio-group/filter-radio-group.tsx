import type { FilterRadioGroupProps } from "@/types/types";
import css from "./filter-radio-group.module.css";

export default function FilterRadioGroup({
  label,
  name,
  options,
  value,
  onChange,
}: FilterRadioGroupProps) {
  return (
    <div className={css.filters}>
      <p className={css.name}>{label}</p>
      <ul className={css.list}>
        {options.map((option) => (
          <li key={option} className={css.filter}>
            <label
              className={`${css.option} ${value === option ? css.optionActive : ""}`}>
              <input
                type="radio"
                name={name}
                checked={value === option}
                onClick={() => onChange(value === option ? undefined : option)}
                onChange={() => undefined}
                className={css.input}
              />
              <span className={css.text}>
                {option
                  .replace(/_/g, " ")
                  .replace(/^\w/, (c) => c.toUpperCase())}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
