import { ReactElement } from "react";

import { RootLayout } from "~/layouts/root";

import styles from "./index.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <span className={styles.text}>Welcome to the Clerkie Challenge!</span>
    </div>
  );
}

HomePage.getLayout = (page: ReactElement) => {
  return <RootLayout title="Home">{page}</RootLayout>;
};
