import { Status } from "~/api/models";
import { cn } from "~/helpers/cn";

import styles from "./status-pill.module.css";

const STATUS_STYLES = {
  [Status.CloseFriends]: styles.closeFriends,
  [Status.SuperCloseFriends]: styles.superCloseFriends,
};

export interface StatusPillProps {
  status: Status;
}

export function StatusPill({ status }: StatusPillProps) {
  return (
    <span className={cn(styles.status, STATUS_STYLES[status])}>{status}</span>
  );
}
