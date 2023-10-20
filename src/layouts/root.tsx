import { ReactNode } from "react";

import { NavBar } from "~/components/nav-bar";
import { TitleBar } from "~/components/title-bar";

import styles from "./root.module.css";

type RootLayoutProps = {
  title: string;
  children: ReactNode;
};

export function RootLayout({ title, children }: RootLayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <NavBar />
      </header>
      <main className={styles.main}>
        <TitleBar title={title} />
        <div className={styles.page}>{children}</div>
      </main>
    </div>
  );
}
