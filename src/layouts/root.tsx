import { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

export function RootLayout({ children }: RootLayoutProps) {
  return <div>{children}</div>;
}
