import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

type WithLayoutProps = {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type NextPageWithLayout<Props = {}, InitialProps = Props> = NextPage<
  Props,
  InitialProps
> &
  WithLayoutProps;

export type AppPropsWithLayout<Props = any> = AppProps<Props> & {
  Component: NextPageWithLayout<Props>;
};
