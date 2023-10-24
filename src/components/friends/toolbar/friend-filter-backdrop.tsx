import styles from "./friend-filter-backdrop.module.css";

export interface FriendFilterBackdropProps {
  onDismiss: () => void;
}

export function FriendFilterBackdrop({ onDismiss }: FriendFilterBackdropProps) {
  return (
    <div className={styles.backdrop} onClick={onDismiss}>
      hello
    </div>
  );
}
