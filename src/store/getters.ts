import { OrgDetails } from "@/interfaces/org";
import { RepoDetails } from "@/interfaces/repo";
import { State } from "@/interfaces/state";
import { UserDetails } from "@/interfaces/user";

function mapToArray<T>(map: Map<number, T>): ReadonlyArray<T> {
  return Array.from(map.values());
}

export default {
  getOrgs: (state: State): ReadonlyArray<OrgDetails> => mapToArray(state.orgs),
  getUsers: (state: State): ReadonlyArray<UserDetails> =>
    mapToArray(state.users),
  getRepos: (state: State): ReadonlyArray<RepoDetails> =>
    mapToArray(state.repos),
  getReposSorted: (state: State): ReadonlyArray<RepoDetails> =>
    mapToArray(state.repos)
      .slice()
      .sort((a, b) => b.prs_count - a.prs_count),
};
