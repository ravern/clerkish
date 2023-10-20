import { useCallback } from "react";

import { fetchAllFriends, FriendFilter } from "~/api/fetchers/friends";
import { useQuery } from "~/hooks/use-query";

import styles from "./friend-list.module.css";
import { FriendListItem } from "./friend-list-item";

export interface FriendsListProps {}

const filter: FriendFilter = {
  tags: {
    include: [],
  },
};

export function FriendList({}: FriendsListProps) {
  const allFriendsFetcher = useCallback(() => fetchAllFriends(filter), []);
  const { data: friends, error, isLoading } = useQuery(allFriendsFetcher);

  if (isLoading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>Error: {error.message}</>;
  }
  return (
    <div className={styles.container}>
      {friends.map((friend) => (
        <FriendListItem key={friend.id} friend={friend} />
      ))}
    </div>
  );
}
