import { MutationTypes } from "@/enums/mutation-types";
import { OrgDetails } from "@/interfaces/org";
import { RepoDetails } from "@/interfaces/repo";
import { State } from "@/interfaces/state";
import { UserDetails } from "@/interfaces/user";

export default {
  [MutationTypes.SET_ORGS]: (
    state: State,
    orgs: ReadonlyArray<OrgDetails>
  ): void => {
    state.orgs = orgs;
  },
  [MutationTypes.SET_USERS]: (
    state: State,
    users: ReadonlyArray<UserDetails>
  ): void => {
    state.users = users;
  },
  [MutationTypes.SET_REPOS]: (
    state: State,
    repos: ReadonlyArray<RepoDetails>
  ): void => {
    state.repos = repos;
  },
};
