import { ReactElement } from "react";

import { FriendList } from "~/components/friend-list";
import { RootLayout } from "~/layouts/root";

export default function FriendsPage() {
  return (
    <div>
      <FriendList />
    </div>
  );
}

FriendsPage.getLayout = (page: ReactElement) => {
  return <RootLayout title="Friends">{page}</RootLayout>;
};
