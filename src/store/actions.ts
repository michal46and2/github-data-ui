import { ActionTypes } from "@/enums/action-types";
import { MutationTypes } from "@/enums/mutation-types";
import { State } from "@/interfaces/state";
import { ActionContext } from "vuex";

import GithubService from "../services/github.service";
const gs = new GithubService();

export default {
  async [ActionTypes.GET_ORGS]({
    commit,
  }: ActionContext<State, State>): Promise<void> {
    try {
      commit(MutationTypes.SET_ORGS, await gs.fetchOrgs());
    } catch (error) {
      console.log(error);
    }
  },
  async [ActionTypes.GET_USERS]({
    commit,
  }: ActionContext<State, State>): Promise<void> {
    try {
      commit(MutationTypes.SET_USERS, await gs.fetchUsers());
    } catch (error) {
      console.log(error);
    }
  },
  async [ActionTypes.GET_REPOS]({
    commit,
  }: ActionContext<State, State>): Promise<void> {
    try {
      commit(MutationTypes.SET_REPOS, await gs.fetchRepos());
    } catch (error) {
      console.log(error);
    }
  },
};
