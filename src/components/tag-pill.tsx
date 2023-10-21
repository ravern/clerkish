import { Tag } from "~/api/models";
import { cn } from "~/helpers/cn";

import styles from "./tag-pill.module.css";

const TAG_STYLES = {
  [Tag.CloseFriends]: styles.closeFriends,
  [Tag.SuperCloseFriends]: styles.superCloseFriends,
};

export interface TagPillProps {
  tag: Tag;
}

export function TagPill({ tag }: TagPillProps) {
  return <span className={cn(styles.tag, TAG_STYLES[tag])}>{tag}</span>;
}
