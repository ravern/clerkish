import { Tag } from "~/api/models";
import { cn } from "~/helpers/cn";

import styles from "./tag-item.module.css";

const TAG_STYLES = {
  [Tag.CloseFriends]: styles.closeFriends,
  [Tag.SuperCloseFriends]: styles.superCloseFriends,
};

export interface TagItemProps {
  tag: Tag;
}

export function TagItem({ tag }: TagItemProps) {
  return <span className={cn(styles.tag, TAG_STYLES[tag])}>{tag}</span>;
}
