import { Friend, Status } from "~/api/models";

import { StatusPill } from "../status-pill";
import styles from "./friend-list-item.module.css";

export interface FriendListItemProps {
  friend: Friend;
}

export function FriendListItem({ friend }: FriendListItemProps) {
  return (
    <div className={styles.card}>
      <div className={styles.nameContainer}>
        <span className={styles.name}>{friend.name}</span>
        <StatusPill status={friend.status as Status} />
      </div>
      <div className={styles.detailsContainer}>
        <span className={styles.email}>{friend.email}</span>
        <span className={styles.detailsSeparator} />
        <span className={styles.phone}>{friend.phone}</span>
      </div>
    </div>
  );
}
