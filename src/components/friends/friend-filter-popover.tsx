import { useMemo } from "react";

import { FriendFilter } from "~/api/fetchers/friends";
import { fetchAllTags } from "~/api/fetchers/tags";
import { useQuery } from "~/hooks/use-query";

import CrossIcon from "../icons/cross-icon";
import styles from "./friend-filter-popover.module.css";

const DISCLOSURE_POPOVER_GAP = 10;

export interface FriendFilterPopoverProps {
  disclosureRef: HTMLElement | null;
  filter: FriendFilter;
  onFilterChange: (newFilter: FriendFilter) => void;
  isVisible: boolean;
}

export function FriendFilterPopover({
  disclosureRef,
  filter,
  onFilterChange,
  isVisible,
}: FriendFilterPopoverProps) {
  const { data: tags } = useQuery(fetchAllTags);

  const style = useMemo(() => {
    const rect = disclosureRef?.getBoundingClientRect();
    if (!rect) {
      return null;
    }
    return {
      left: rect.left,
      top: rect.bottom + DISCLOSURE_POPOVER_GAP,
    };
  }, [disclosureRef]);

  if (!isVisible || !style) {
    return null;
  }
  return (
    <div className={styles.container} style={style}>
      <div className={styles.headerContainer}>
        <button className={styles.clearAllButton}>Clear all</button>
        <span className={styles.title}>Filter</span>
        <button className={styles.dismissButton}>
          <CrossIcon />
        </button>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.statusesContainer}>
          <span className={styles.subtitle}>Friend Status</span>
          {tags &&
            tags.map((tag) => (
              <div key={tag} className={styles.statusItem}>
                <span>{tag}</span>
              </div>
            ))}
        </div>
        <button className={styles.applyButton}>Apply</button>
      </div>
    </div>
  );
}
