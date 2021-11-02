import { OrgDetails } from "./org";
import { RepoDetails } from "./repo";
import { UserDetails } from "./user";

export interface State {
  orgs: Map<number, OrgDetails>;
  repos: Map<number, RepoDetails>;
  users: Map<number, UserDetails>;
}
