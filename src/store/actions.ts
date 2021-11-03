import { ActionTypes } from "@/enums/action-types";
import { MutationTypes } from "@/enums/mutation-types";
import { Org, OrgDetails } from "@/interfaces/org";
import { State } from "@/interfaces/state";
import { User, UserDetails } from "@/interfaces/user";
import { ActionContext } from "vuex";

import GithubService from "../services/github.service";
const gs = new GithubService();

export default {
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
