import { ActionTypes } from "@/enums/action-types";
import { MutationTypes } from "@/enums/mutation-types";
import { Org, OrgDetails } from "@/interfaces/org";
import { RepoDetails } from "@/interfaces/repo";
import { State } from "@/interfaces/state";
import { User, UserDetails } from "@/interfaces/user";
import { Observable } from "rxjs";
import { ActionContext } from "vuex";

import GithubService from "../services/github.service";
const gs = new GithubService();

type LoadingData =
  | MutationTypes.SET_ORGS_LOADING
  | MutationTypes.SET_USERS_LOADING
  | MutationTypes.SET_REPOS_LOADING;
type SetData =
  | MutationTypes.SET_ORGS
  | MutationTypes.SET_USERS
  | MutationTypes.SET_REPOS;

const datasets: {
  readonly [key in SetData]: Observable<
    ReadonlyArray<OrgDetails | UserDetails | RepoDetails>
  >;
} = {
  [MutationTypes.SET_ORGS]: gs.fetch$<Org, OrgDetails>(gs.orgsEndpoint),
  [MutationTypes.SET_USERS]: gs.fetch$<User, UserDetails>(gs.usersEndpoint),
  [MutationTypes.SET_REPOS]: gs.fetchRepos$,
};

interface GetData {
  readonly loading: LoadingData;
  readonly set: SetData;
}

export default {
  [ActionTypes.GET_DATA](
    { commit }: ActionContext<State, State>,
    { loading, set }: GetData
  ): void {
    commit(loading, true);
    datasets[set].subscribe((data) => {
      commit(set, data);
      commit(loading, false);
    });
  },
  [ActionTypes.GET_ORGS]({ commit }: ActionContext<State, State>): void {
    commit(MutationTypes.SET_ORGS_LOADING, true);
    gs.fetch$<Org, OrgDetails>(gs.orgsEndpoint).subscribe((orgs) => {
      commit(MutationTypes.SET_ORGS, orgs);
      commit(MutationTypes.SET_ORGS_LOADING, false);
    });
  },
  [ActionTypes.GET_USERS]({ commit }: ActionContext<State, State>): void {
    commit(MutationTypes.SET_USERS_LOADING, true);
    gs.fetch$<User, UserDetails>(gs.usersEndpoint).subscribe((users) => {
      commit(MutationTypes.SET_USERS, users);
      commit(MutationTypes.SET_USERS_LOADING, false);
    });
  },
  [ActionTypes.GET_REPOS]({ commit }: ActionContext<State, State>): void {
    commit(MutationTypes.SET_REPOS_LOADING, true);
    gs.fetchRepos$.subscribe((repos) => {
      commit(MutationTypes.SET_REPOS, repos);
      commit(MutationTypes.SET_REPOS_LOADING, false);
    });
  },
};
