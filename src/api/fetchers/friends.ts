import { sleep } from "../helpers/sleep";
import MOCK_DATA from "../mock-data.json";
import { Friend } from "../models";

export interface FetchAllFriendsFilter {
  status?: {
    in: string[];
  };
}

export interface FetchAllFriendsPagination {
  offset?: number;
  limit: number;
}

export interface FetchAllFriendsResponse {
  data: Friend[];
  hasNextPage: boolean;
}

export async function fetchAllFriends(
  filter: FetchAllFriendsFilter,
  pagination: FetchAllFriendsPagination
): Promise<FetchAllFriendsResponse> {
  await sleep(1000);

  let friends = MOCK_DATA.friends;

  if (filter.status) {
    friends = friends.filter((friend) => {
      if (!friend.status) {
        return null;
      }
      return filter.status?.in.includes(friend.status);
    });
  }

  const offset = pagination.offset ?? 0;
  friends = friends.slice(
    offset,
    Math.min(friends.length, offset + pagination.limit)
  );

  const totalCount = MOCK_DATA.friends.length;
  return {
    data: friends,
    hasNextPage: offset + pagination.limit < totalCount,
  };
}

export async function fetchFriend(id: number): Promise<Friend | null> {
  await sleep(1000);
  return MOCK_DATA.friends.find((friend) => friend.id === id) ?? null;
}
