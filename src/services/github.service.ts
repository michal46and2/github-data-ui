import { Org, OrgDetails } from "@/interfaces/org";
import { Repo, RepoDetails } from "@/interfaces/repo";
import { Resp } from "@/interfaces/resp";
import { User, UserDetails } from "@/interfaces/user";

export default class GithubService {
  private readonly baseUrl = "https://api.github.com/";
  private readonly orgsEndpoint = "organizations";
  private readonly usersEndpoint = "users";
  private readonly reposEndpoint = "repositories";
  private readonly pullsEndpoint = "/pulls";

  private fetchEndpoint<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    return fetch(url).then((res) => res.json());
  }

  private fetchUrl<T>(url: string): Promise<T> {
    return fetch(url).then((res) => res.json());
  }

  public fetchOrgs(): Promise<ReadonlyArray<OrgDetails>> {
    return this.fetchEndpoint<ReadonlyArray<Org>>(this.orgsEndpoint).then(
      (orgs) =>
        Promise.all(
          orgs.slice(0, 3).map((org) => this.fetchUrl<OrgDetails>(org.url))
        )
    );
  }

  public fetchUsers(): Promise<ReadonlyArray<UserDetails>> {
    return this.fetchEndpoint<ReadonlyArray<User>>(this.usersEndpoint).then(
      (users) => {
        return Promise.all(
          users.slice(0, 3).map((user) => this.fetchUrl<UserDetails>(user.url))
        );
      }
    );
  }

  public fetchRepos(): Promise<ReadonlyArray<RepoDetails>> {
    return this.fetchEndpoint<ReadonlyArray<Repo>>(this.reposEndpoint).then(
      (repos) => {
        const data = repos.slice(0, 2).map((repo) =>
          Promise.all([
            this.fetchUrl<RepoDetails>(repo.url),
            this.fetchUrl<ReadonlyArray<Resp>>(
              `${repo.url}${this.pullsEndpoint}`
            ).then((data) => data.length),
          ]).then(([repo, prs_count]) => ({
            ...repo,
            prs_count,
          }))
        );
        return Promise.all(data);
      }
    );
  }
}
