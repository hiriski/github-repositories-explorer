import octokit from '@/plugins/octokit'

export interface IRequestFetchRepositories {
  username: string
  /** @description Limit results to repositories of the specified type. */
  type?: 'all' | 'owner' | 'member'
  /** @description The property to sort the results by. */
  sort?: 'created' | 'updated' | 'pushed' | 'full_name'
  /** @description The order to sort by. Default: `asc` when using `full_name`, otherwise `desc`. */
  direction?: 'asc' | 'desc'
  page: number
  per_page: number
}

export const GitHubApi = {
  fetchSearchUsers: async (name: string): Promise<IGithubUser[]> => {
    try {
      const { data } = await octokit.request('GET /search/users', {
        q: name,
      })
      if (data?.items?.length > 0) {
        return data.items.slice(0, 5) as IGithubUser[]
      }
      return []
    } catch (error) {
      return Promise.reject(error)
    }
  },

  fetchRepositories: async (
    params: IRequestFetchRepositories
  ): Promise<IGithubRepository[]> => {
    try {
      const { data } = await octokit.request('GET /users/{username}/repos', {
        username: params.username,
        per_page: params.per_page,
      })
      return data as unknown as IGithubRepository[]
    } catch (error) {
      return Promise.reject(error)
    }
  },
}
