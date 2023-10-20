import { Friend, Tag } from "~/api/models";

import styles from "./friend-list-item.module.css";
import { TagItem } from "./tag-item";

export interface FriendListItemProps {
  friend: Friend;
}

export function FriendListItem({ friend }: FriendListItemProps) {
  return (
    <div className={styles.card}>
      <div className={styles.nameContainer}>
        <span className={styles.name}>{friend.name}</span>
        <div className={styles.tagContainer}>
          {friend.tags.map((tag) => (
            <TagItem key={tag} tag={tag as Tag} />
          ))}
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <span className={styles.email}>{friend.email}</span>
        <span className={styles.detailsSeparator} />
        <span className={styles.phone}>{friend.phone}</span>
      </div>
    </div>
  );
}
