import { useCallback, useState } from "react";

import { fetchAllFriends, FriendFilter } from "~/api/fetchers/friends";
import { useQuery } from "~/hooks/use-query";

import { FriendFilterToolbar } from "./friend-filter-toolbar";
import styles from "./friend-list.module.css";
import { FriendListItem } from "./friend-list-item";

export interface FriendsListProps {}

export function FriendList({}: FriendsListProps) {
  const [filter, setFilter] = useState<FriendFilter>({
    tags: {
      include: ["Close Friends"],
    },
  });

  const allFriendsFetcher = useCallback(
    () => fetchAllFriends(filter),
    [filter]
  );
  const { data: friends, error, isLoading } = useQuery(allFriendsFetcher);

  return (
    <div className={styles.container}>
      <div className={styles.toolbarContainer}>
        <FriendFilterToolbar filter={filter} onFilterChange={setFilter} />
      </div>
      {isLoading && <>Loading...</>}
      {error && <>Error: {error.message}</>}
      {friends && (
        <div className={styles.listContainer}>
          {friends.map((friend) => (
            <FriendListItem key={friend.id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
}
