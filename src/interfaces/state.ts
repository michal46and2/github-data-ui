import { OrgDetails } from "./org";
import { RepoDetails } from "./repo";
import { UserDetails } from "./user";

export interface State {
  orgs: ReadonlyArray<OrgDetails>;
  repos: ReadonlyArray<RepoDetails>;
  users: ReadonlyArray<UserDetails>;
}
