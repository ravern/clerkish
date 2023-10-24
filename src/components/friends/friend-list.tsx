import { useCallback, useEffect, useRef, useState } from "react";

import { fetchAllFriends, FriendFilter } from "~/api/fetchers/friends";
import { Friend } from "~/api/models";
import { useQuery } from "~/hooks/use-query";

import styles from "./friend-list.module.css";
import { FriendListItem } from "./friend-list-item";
import { FriendListItemSkeleton } from "./friend-list-item-skeleton";
import { FriendFilterToolbar } from "./toolbar/friend-filter-toolbar";

const PAGINATION_LIMIT = 10;
const INFINITE_SCROLL_THRESHOLD = 1;

export interface FriendsListProps {}

export function FriendList({}: FriendsListProps) {
  const [filter, setFilter] = useState<FriendFilter>({});
  const [paginationOffset, setPaginationOffset] = useState(0);

  const [friends, setFriends] = useState<Friend[]>([]);

  const allFriendsFetcher = useCallback(
    () =>
      fetchAllFriends(filter, {
        offset: paginationOffset,
        limit: PAGINATION_LIMIT,
      }),
    [filter, paginationOffset]
  );
  const {
    data: currentFriends,
    error,
    isLoading,
  } = useQuery(allFriendsFetcher);
  useEffect(() => {
    if (currentFriends != null) {
      setFriends((friends) => [...friends, ...currentFriends]);
    }
  }, [currentFriends]);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || isLoading) {
      return;
    }
    // From https://stackoverflow.com/questions/23961566/javascript-infinite-scroll-inside-a-div
    const container = containerRef.current;
    const scrollY = container.scrollHeight - container.scrollTop;
    const height = container.offsetHeight;
    const offset = scrollY - height;
    if (offset <= INFINITE_SCROLL_THRESHOLD) {
      // This triggers a refetch.
      setPaginationOffset((offset) => (offset += PAGINATION_LIMIT));
    }
  }, [containerRef, isLoading]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={styles.container}
    >
      <div className={styles.innerContainer}>
        <div className={styles.toolbarContainer}>
          <FriendFilterToolbar filter={filter} onFilterChange={setFilter} />
        </div>
        <div className={styles.listContainer}>
          {friends &&
            friends.map((friend) => (
              <FriendListItem key={friend.id} friend={friend} />
            ))}
          {(isLoading || true) &&
            [0, 1, 2].map((index) => <FriendListItemSkeleton key={index} />)}
        </div>
      </div>
    </div>
  );
}
