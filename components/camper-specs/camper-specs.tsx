import css from "./camper-specs.module.css";

interface CamperSpecsProps {
  form: string;
  engine: string;
  transmission: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
}

export default function CamperSpecs(props: CamperSpecsProps) {
  const items = [
    ["Тип кузова", props.form],
    ["Двигун", props.engine],
    ["Коробка передач", props.transmission],
    ["Довжина", props.length],
    ["Ширина", props.width],
    ["Висота", props.height],
    ["Бак", props.tank],
    ["Витрата", props.consumption],
  ];

  return (
    <section className={css.section}>
      <h2 className={css.title}>Характеристики</h2>
      <ul className={css.list}>
        {items.map(([label, value]) => (
          <li key={label} className={css.item}>
            <span className={css.label}>{label}</span>
            <span className={css.value}>{value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
