import { doesArrayIncludeArray } from "../helpers/array-include";
import { sleep } from "../helpers/sleep";
import MOCK_DATA from "../mock-data.json";
import { Friend } from "../models";

export interface FriendFilter {
  tags: {
    include: string[];
  };
}

export async function fetchAllFriends(filter: FriendFilter): Promise<Friend[]> {
  await sleep(1000);
  return MOCK_DATA.friends.filter((friend) => {
    return doesArrayIncludeArray(friend.tags, filter.tags.include);
  });
}

export async function fetchFriend(id: number): Promise<Friend | null> {
  await sleep(1000);
  return MOCK_DATA.friends.find((friend) => friend.id === id) ?? null;
}
