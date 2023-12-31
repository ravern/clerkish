import { ReactElement } from "react";

import { FriendList } from "~/components/friends/friend-list";
import { RootLayout } from "~/layouts/root";

export default function FriendsPage() {
  return <FriendList />;
}

FriendsPage.getLayout = (page: ReactElement) => {
  return <RootLayout title="Friends">{page}</RootLayout>;
};
