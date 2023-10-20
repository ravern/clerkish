import styles from "../navigation/title-bar.module.css";

export interface TitleBarProps {
  title: string;
}

export function TitleBar({ title }: TitleBarProps) {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
    </div>
  );
}
