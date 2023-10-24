import { cn } from "~/helpers/cn";

import styles from "./friend-list-item-skeleton.module.css";

export function FriendListItemSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.nameContainer}>
        <div className={cn(styles.leftNameSkeleton, styles.gradient)} />
        <div className={cn(styles.rightNameSkeleton, styles.gradient)} />
      </div>
      <div className={styles.detailsContainer}>
        <div className={cn(styles.leftDetailsSkeleton, styles.gradient)} />
        <div className={cn(styles.rightDetailsSkeleton, styles.gradient)} />
      </div>
    </div>
  );
}
