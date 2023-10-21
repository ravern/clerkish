import { Friend, Tag } from "~/api/models";

import { TagPill } from "../tag-pill";
import styles from "./friend-list-item.module.css";

export interface FriendListItemProps {
  friend: Friend;
}

export function FriendListItem({ friend }: FriendListItemProps) {
  return (
    <div className={styles.card}>
      <div className={styles.nameContainer}>
        <span className={styles.name}>{friend.name}</span>
        <TagPill tag={friend.tag as Tag} />
      </div>
      <div className={styles.detailsContainer}>
        <span className={styles.email}>{friend.email}</span>
        <span className={styles.detailsSeparator} />
        <span className={styles.phone}>{friend.phone}</span>
      </div>
    </div>
  );
}
