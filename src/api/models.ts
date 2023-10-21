export enum Tag {
  CloseFriends = "Close Friends",
  SuperCloseFriends = "Super Close Friends",
}

export type Friend = {
  id: number;
  name: string;
  email: string;
  phone: string;
  tag: string | null;
};
