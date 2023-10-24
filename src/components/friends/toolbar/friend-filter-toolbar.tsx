import { Ref, useRef, useState } from "react";

import { FriendFilter } from "~/api/fetchers/friends";
import { cn } from "~/helpers/cn";

import { FilterIcon } from "../../icons/filter-icon";
import { FriendFilterPopover } from "./friend-filter-popover";
import styles from "./friend-filter-toolbar.module.css";

export interface FriendFilterToolbarProps {
  filter: FriendFilter;
  onFilterChange: (newFilter: FriendFilter) => void;
}

export function FriendFilterToolbar({
  filter,
  onFilterChange,
}: FriendFilterToolbarProps) {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const disclosureRef = useRef<HTMLButtonElement | null>(null);

  const handleDisclosureClick = () => {
    setIsFilterVisible((isFilterVisible) => !isFilterVisible);
  };

  const handleClearAllClick = () => {
    onFilterChange({});
  };

  const handleFilterPopoverDismiss = () => {
    setIsFilterVisible(false);
  };

  const isFilterActive =
    isFilterVisible || (filter.status && filter.status.in.length > 0);

  return (
    <>
      <div className={styles.container}>
        <button
          ref={disclosureRef}
          onClick={handleDisclosureClick}
          className={cn(
            styles.disclosureButton,
            isFilterActive && styles.activeDisclosureButton
          )}
        >
          <FilterIcon
            className={cn(
              styles.disclosureIcon,
              isFilterActive && styles.activeDisclosureIcon
            )}
          />
          {filter.status && (
            <span className={styles.filterCount}>
              {filter.status.in.length}
            </span>
          )}
        </button>
        <div className={styles.separator} />
        <button
          onClick={handleClearAllClick}
          disabled={!filter.status}
          className={cn(
            styles.clearAllButton,
            filter.status && styles.activeClearAllButton
          )}
        >
          Clear all
        </button>
      </div>
      <FriendFilterPopover
        disclosureElem={disclosureRef.current}
        filter={filter}
        onFilterChange={onFilterChange}
        isVisible={isFilterVisible}
        onDismiss={handleFilterPopoverDismiss}
      />
    </>
  );
}
