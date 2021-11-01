<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-row>
          <v-col cols="4">
            <v-card
              elevation="1"
              outlined
              v-for="org in $store.state.orgs"
              v-bind:key="org.id"
            >
              <v-card-text>
                <div class="text--primary">{{ org.name }}</div>
                <div>{{ org.followers }}</div>
                <div>{{ org.public_repos }}</div>
                <div>{{ org.created_at | formatDate }}</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card
              elevation="1"
              outlined
              v-for="user in $store.state.users"
              v-bind:key="user.id"
            >
              <v-img height="250" :src="user.avatar_url"></v-img>
              <v-card-title>
                {{ user | nameWithLogin }}
              </v-card-title>
              <v-card-text>
                {{ user.created_at | formatDate }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card
              elevation="1"
              outlined
              v-for="repo in $store.state.repos"
              v-bind:key="repo.id"
            >
              <v-card-title>
                {{ repo.name }}
              </v-card-title>
              <v-card-text>
                <div>{{ repo.prs_count }}</div>
                <div>{{ repo.stargazers_count }}</div>
                <div>{{ repo.open_issues_count }}</div>
                <div>{{ repo.prs_count / repo.open_issues_count }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { ActionTypes } from "../enums/action-types";

export default Vue.extend({
  name: "Layout",
  created() {
    this.$store.dispatch(ActionTypes.GET_ORGS);
    this.$store.dispatch(ActionTypes.GET_USERS);
    this.$store.dispatch(ActionTypes.GET_REPOS);
  },
});
</script>
