import { Org, OrgDetails } from "@/interfaces/org";
import { Repo, RepoDetails } from "@/interfaces/repo";
import { Resp } from "@/interfaces/resp";
import { User, UserDetails } from "@/interfaces/user";
import { forkJoin, from, Observable, zip } from "rxjs";
import { map, mergeMap, take } from "rxjs/operators";

export default class GithubService {
  private readonly baseUrl = "https://api.github.com/";
  private readonly perPage = 5;
  private readonly queryParams = `?per_page=${this.perPage}`;
  public readonly orgsEndpoint = `organizations${this.queryParams}`;
  public readonly usersEndpoint = `users${this.queryParams}`;
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
        Promise.all(orgs.map((org) => this.fetchUrl<OrgDetails>(org.url)))
    );
  }

  public fetchUsers(): Promise<ReadonlyArray<UserDetails>> {
    return this.fetchEndpoint<ReadonlyArray<User>>(this.usersEndpoint).then(
      (users) => {
        return Promise.all(
          users.map((user) => this.fetchUrl<UserDetails>(user.url))
        );
      }
    );
  }

  public fetchRepos(): Promise<ReadonlyArray<RepoDetails>> {
    return this.fetchEndpoint<ReadonlyArray<Repo>>(this.reposEndpoint).then(
      (repos) => {
        const data = repos.slice(0, this.perPage).map((repo) =>
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

  public fetch$<T1 extends Resp, T2>(
    endpoint: string
  ): Observable<ReadonlyArray<T2>> {
    return from(this.fetchEndpoint<ReadonlyArray<T1>>(endpoint)).pipe(
      take(1),
      mergeMap((data) => forkJoin(data.map((el) => this.fetchUrl<T2>(el.url))))
    );
  }

  public get fetchRepos$(): Observable<ReadonlyArray<RepoDetails>> {
    return from(
      this.fetchEndpoint<ReadonlyArray<Repo>>(this.reposEndpoint)
    ).pipe(
      take(1),
      map((repos) => repos.slice(0, this.perPage)),
      mergeMap((repos) =>
        forkJoin(
          repos.map((repo) =>
            zip(
              this.fetchUrl<RepoDetails>(repo.url),
              this.fetchUrl<ReadonlyArray<Resp>>(
                `${repo.url}${this.pullsEndpoint}`
              ).then((data) => data.length)
            ).pipe(
              map(([repository, prs_count]) => ({
                ...repository,
                prs_count,
              }))
            )
          )
        )
      )
    );
  }
}
