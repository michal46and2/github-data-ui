import { Resp } from "./resp";

export interface User extends Resp {
  readonly avatar_url: string;
  readonly login: string;
}

export interface UserDetails extends User {
  readonly created_at: string;
  readonly name: string;
}
