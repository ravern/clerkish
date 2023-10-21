import { sleep } from "../helpers/sleep";
import MOCK_DATA from "../mock-data.json";
import { Friend } from "../models";

export interface FriendFilter {
  tags?: {
    include: string[];
  };
}

export async function fetchAllFriends(filter: FriendFilter): Promise<Friend[]> {
  await sleep(1000);
  if (!filter.tags) {
    return MOCK_DATA.friends;
  }
  return MOCK_DATA.friends.filter((friend) => {
    if (!friend.tag) {
      return null;
    }
    return filter.tags?.include.includes(friend.tag);
  });
}

export async function fetchFriend(id: number): Promise<Friend | null> {
  await sleep(1000);
  return MOCK_DATA.friends.find((friend) => friend.id === id) ?? null;
}
