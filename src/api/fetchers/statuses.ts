import { sleep } from "../helpers/sleep";
import MOCK_DATA from "../mock-data.json";

export async function fetchAllStatuses() {
  await sleep(1000);
  return MOCK_DATA.statuses;
}
