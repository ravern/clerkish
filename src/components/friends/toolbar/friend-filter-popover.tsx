import { useEffect, useMemo, useState } from "react";

import { FriendFilter } from "~/api/fetchers/friends";
import { fetchAllStatuses } from "~/api/fetchers/statuses";
import { useQuery } from "~/hooks/use-query";

import { Checkbox } from "../../checkbox";
import CrossIcon from "../../icons/cross-icon";
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
  const { data: statuses } = useQuery(fetchAllStatuses);

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  useEffect(() => {
    setSelectedStatuses(filter.status?.in ?? []);
  }, [filter, setSelectedStatuses]);

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

  const handleStatusItemClick = (clickedStatus: string) => () => {
    if (selectedStatuses.includes(clickedStatus)) {
      setSelectedStatuses(
        selectedStatuses.filter((status) => status !== clickedStatus)
      );
    } else {
      setSelectedStatuses([...selectedStatuses, clickedStatus]);
    }
  };

  const handleCheckboxChange =
    (changedStatus: string) => (checked: boolean) => {
      const filteredSelectedStatuses = selectedStatuses.filter(
        (status) => status !== changedStatus
      );
      if (checked) {
        setSelectedStatuses([...filteredSelectedStatuses, changedStatus]);
      } else {
        setSelectedStatuses(filteredSelectedStatuses);
      }
    };

  const handleClearAllClick = () => {
    onFilterChange({
      ...filter,
      status: undefined,
    });
    onDismiss();
  };

  const handleApplyClick = () => {
    if (selectedStatuses.length > 0) {
      onFilterChange({
        ...filter,
        status: {
          in: Array.from(selectedStatuses),
        },
      });
    } else {
      onFilterChange({
        ...filter,
        status: undefined,
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
            {statuses &&
              statuses.map((status) => (
                <div
                  key={status}
                  className={styles.statusItem}
                  onClick={handleStatusItemClick(status)}
                >
                  <span>{status}</span>
                  <Checkbox
                    value={selectedStatuses.includes(status)}
                    onChange={handleCheckboxChange(status)}
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
