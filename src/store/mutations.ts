import { MutationTypes } from "@/enums/mutation-types";
import { OrgDetails } from "@/interfaces/org";
import { RepoDetails } from "@/interfaces/repo";
import { Resp } from "@/interfaces/resp";
import { State } from "@/interfaces/state";
import { UserDetails } from "@/interfaces/user";

function arrayToMap<T extends Resp>(array: ReadonlyArray<T>): Map<number, T> {
  return new Map(array.map((el) => [el.id, el]));
}

export default {
  [MutationTypes.SET_ORGS]: (
    state: State,
    orgs: ReadonlyArray<OrgDetails>
  ): void => {
    state.orgs = arrayToMap(orgs);
  },
  [MutationTypes.SET_USERS]: (
    state: State,
    users: ReadonlyArray<UserDetails>
  ): void => {
    state.users = arrayToMap(users);
  },
  [MutationTypes.SET_REPOS]: (
    state: State,
    repos: ReadonlyArray<RepoDetails>
  ): void => {
    state.repos = arrayToMap(repos);
  },
};
