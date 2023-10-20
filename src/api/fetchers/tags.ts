import { sleep } from "../helpers/sleep";
import MOCK_DATA from "../mock-data.json";

export async function fetchAllTags() {
  await sleep(1000);
  return MOCK_DATA.tags;
}
