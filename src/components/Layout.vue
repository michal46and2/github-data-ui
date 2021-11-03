<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4">
        <Card :loading="$store.state.loading.orgs">
          <v-card-title>Organizations</v-card-title>
        </Card>
        <Card v-for="org in $store.getters.getOrgs" v-bind:key="org.id">
          <v-card-text>
            <div class="text--primary">{{ org.name || org.login }}</div>
            <div>Followers: {{ org.followers }}</div>
            <div>Repos: {{ org.public_repos }}</div>
            <div>Created: {{ org.created_at | formatDate }}</div>
          </v-card-text>
        </Card>
      </v-col>
      <v-col cols="12" sm="4">
        <Card :loading="$store.state.loading.users">
          <v-card-title>Users</v-card-title>
        </Card>
        <Card v-for="user in $store.getters.getUsers" v-bind:key="user.id">
          <v-img :src="user.avatar_url"></v-img>
          <v-card-text>
            <div class="text--primary">{{ user | nameWithLogin }}</div>
            <div>{{ user.created_at | registeredDaysAgo }}</div>
          </v-card-text>
        </Card>
      </v-col>
      <v-col cols="12" sm="4">
        <Card :loading="$store.state.loading.repos">
          <v-card-title>Repositories</v-card-title>
        </Card>
        <Card
          v-for="repo in $store.getters.getReposSorted"
          v-bind:key="repo.id"
        >
          <v-card-text>
            <div class="text--primary">{{ repo.name }}</div>
            <div>Open PRs: {{ repo.prs_count }}</div>
            <div>Stars: {{ repo.stargazers_count }}</div>
            <div>Open issues: {{ repo.open_issues_count }}</div>
            <div>{{ repo | prsToIssuesRatio }}</div>
          </v-card-text>
        </Card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { ActionTypes } from "../enums/action-types";
import { MutationTypes } from "../enums/mutation-types";
import Card from "./Card.vue";

export default Vue.extend({
  name: "Layout",
  components: {
    Card,
  },
  created() {
    this.$store.dispatch(ActionTypes.GET_DATA, {
      loading: MutationTypes.SET_ORGS_LOADING,
      set: MutationTypes.SET_ORGS,
    });
    this.$store.dispatch(ActionTypes.GET_DATA, {
      loading: MutationTypes.SET_USERS_LOADING,
      set: MutationTypes.SET_USERS,
    });
    this.$store.dispatch(ActionTypes.GET_DATA, {
      loading: MutationTypes.SET_REPOS_LOADING,
      set: MutationTypes.SET_REPOS,
    });
  },
});
</script>
