import { ReactElement } from "react";

import { RootLayout } from "~/layouts/root";

export default function FriendListPage() {
  return <div>Hello world</div>;
}

FriendListPage.getLayout = (page: ReactElement) => {
  return <RootLayout title="Friends">{page}</RootLayout>;
};
