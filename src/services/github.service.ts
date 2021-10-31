export default class GithubService {

  private baseUrl = 'https://api.github.com/'

  fetch(endpoint: string): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`
    return fetch(url).then(res => res.json())
  }
}
