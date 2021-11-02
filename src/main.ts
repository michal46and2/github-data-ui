import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import vuetify from "./plugins/vuetify";
import moment from "moment";
import { UserDetails } from "./interfaces/user";
import { RepoDetails } from "./interfaces/repo";

Vue.config.productionTip = false;

Vue.filter("formatDate", function (value: string) {
  if (value) {
    return moment(value).format("DD-MM-YYYY");
  }
});
Vue.filter("nameWithLogin", function (user: UserDetails) {
  if (user) {
    return user.name.split(" ").join(` :${user.login}: `);
  }
});
Vue.filter("registeredDaysAgo", function (value: string) {
  if (value) {
    const created = moment(value).startOf("day");
    const current = moment().startOf("day");
    return `Registered ${current.diff(created, "days")} days ago.`;
  }
});
Vue.filter("prsToIssuesRatio", function (repo: RepoDetails) {
  if (repo) {
    return `PRs to issues ratio: ${(
      (repo.prs_count / repo.open_issues_count) *
      100
    ).toFixed(2)} %`;
  }
});

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
