import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";

import { cn } from "~/helpers/cn";

import styles from "./nav-bar-link.module.css";

export interface NavBarLinkProps {
  icon: ReactElement;
  label: string;
  href: Url;
}

export function NavBarLink({ icon, label, href }: NavBarLinkProps) {
  const { pathname } = useRouter();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(styles.link, isActive && styles.activeLink)}
    >
      {icon}
      <span className={styles.label}>{label}</span>
    </Link>
  );
}
