import { OrgDetails } from "./org";
import { RepoDetails } from "./repo";
import { UserDetails } from "./user";

type LoadingType = "orgs" | "users" | "repos";

export interface State {
  orgs: Map<number, OrgDetails>;
  repos: Map<number, RepoDetails>;
  users: Map<number, UserDetails>;
  loading: {
    [type in LoadingType]: boolean;
  };
}
