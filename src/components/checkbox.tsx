import styles from "./checkbox.module.css";
import { CheckedIcon } from "./icons/checked-icon";
import { UncheckedIcon } from "./icons/unchecked-icon";

export interface CheckboxProps {
  value: boolean;
  onChange: (newValue: boolean) => void;
}

export function Checkbox({ value, onChange }: CheckboxProps) {
  const handleClick = () => {
    onChange(!value);
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      {value ? <CheckedIcon /> : <UncheckedIcon />}
    </button>
  );
}
