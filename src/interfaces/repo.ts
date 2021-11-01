import { Resp } from "./resp";

export interface Repo extends Resp {
  readonly name: string;
}

export interface RepoDetails extends Repo {
  readonly open_issues_count: number;
  readonly stargazers_count: number;
  readonly prs_count: number;
}
