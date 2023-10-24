import { sleep } from "../helpers/sleep";
import MOCK_DATA from "../mock-data.json";
import { Friend } from "../models";

export interface FriendFilter {
  status?: {
    in: string[];
  };
}

export interface FriendPagination {
  offset: number;
  limit: number;
}

export async function fetchAllFriends(
  filter: FriendFilter,
  pagination?: FriendPagination
): Promise<Friend[]> {
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

  if (pagination) {
    friends = friends.slice(
      pagination.offset,
      pagination.offset + pagination.limit
    );
  }

  return friends;
}

export async function fetchFriend(id: number): Promise<Friend | null> {
  await sleep(1000);
  return MOCK_DATA.friends.find((friend) => friend.id === id) ?? null;
}
