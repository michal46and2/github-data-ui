import { Resp } from "./resp";

export interface Org extends Resp {
  readonly login: string;
}

export interface OrgDetails extends Org {
  readonly created_at: string;
  readonly followers: number;
  readonly name?: string;
  readonly public_repos: number;
}
