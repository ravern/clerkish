import { useEffect, useMemo, useState } from "react";

import { FriendFilter } from "~/api/fetchers/friends";
import { fetchAllTags } from "~/api/fetchers/tags";
import { useQuery } from "~/hooks/use-query";

import { Checkbox } from "../checkbox";
import CrossIcon from "../icons/cross-icon";
import { FriendFilterBackdrop } from "./friend-filter-backdrop";
import styles from "./friend-filter-popover.module.css";

const DISCLOSURE_POPOVER_GAP = 10;

export interface FriendFilterPopoverProps {
  disclosureElem: HTMLElement | null;
  filter: FriendFilter;
  onFilterChange: (newFilter: FriendFilter) => void;
  isVisible: boolean;
  onDismiss: () => void;
}

export function FriendFilterPopover({
  disclosureElem,
  filter,
  onFilterChange,
  isVisible,
  onDismiss,
}: FriendFilterPopoverProps) {
  const { data: tags } = useQuery(fetchAllTags);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  useEffect(() => {
    setSelectedTags(filter.tags?.include ?? []);
  }, [filter, setSelectedTags]);

  const style = useMemo(() => {
    const rect = disclosureElem?.getBoundingClientRect();
    if (!rect) {
      return null;
    }
    return {
      left: rect.left,
      top: rect.bottom + DISCLOSURE_POPOVER_GAP,
    };
  }, [disclosureElem]);

  const handleCheckboxChange = (tag: string) => (checked: boolean) => {
    const filteredSelectedTags = selectedTags.filter((t) => t !== tag);
    if (checked) {
      setSelectedTags([...filteredSelectedTags, tag]);
    } else {
      setSelectedTags(filteredSelectedTags);
    }
  };

  const handleClearAllClick = () => {
    onFilterChange({
      ...filter,
      tags: undefined,
    });
    onDismiss();
  };

  const handleApplyClick = () => {
    if (selectedTags.length > 0) {
      onFilterChange({
        ...filter,
        tags: {
          include: Array.from(selectedTags),
        },
      });
    } else {
      onFilterChange({
        ...filter,
        tags: undefined,
      });
    }
    onDismiss();
  };

  if (!isVisible || !style) {
    return null;
  }
  return (
    <>
      <div className={styles.container} style={style}>
        <div className={styles.headerContainer}>
          <button
            className={styles.clearAllButton}
            onClick={handleClearAllClick}
          >
            Clear all
          </button>
          <span className={styles.title}>Filter</span>
          <button className={styles.dismissButton} onClick={onDismiss}>
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
                  <Checkbox
                    value={selectedTags.includes(tag)}
                    onChange={handleCheckboxChange(tag)}
                  />
                </div>
              ))}
          </div>
          <button className={styles.applyButton} onClick={handleApplyClick}>
            Apply
          </button>
        </div>
      </div>
      <FriendFilterBackdrop onDismiss={onDismiss} />
    </>
  );
}
