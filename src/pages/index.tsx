import { ReactElement } from "react";

import { RootLayout } from "~/layouts/root";

export default function LandingPage() {
  return <div>Hello world</div>;
}

LandingPage.getLayout = (page: ReactElement) => {
  return <RootLayout>{page}</RootLayout>;
};
