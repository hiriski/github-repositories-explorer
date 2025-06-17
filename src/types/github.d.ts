declare global {
  interface GithubContextType {
    users: IGithubUser[]
    setUsers: (users: IGithubUser[]) => void
    repositories: { [key: string]: IGithubRepository[] }
    setRepositories: (repositories: {
      [key: string]: IGithubRepository[]
    }) => void
    usersLoading: boolean
    setUsersLoading: (loading: boolean) => void
    expandedItem: string | null
    setExpandedItem: (item: string | null) => void
  }
  interface IGithubUser {
    login: string
    name: string
    id: number
    node_id: string
    avatar_url: string
    url: string
    html_url: string
    repos_url: string
    type: string
    score: number
  }

  interface IGithubRepository {
    id: number
    node_id: string
    name: string
    full_name: string
    private: boolean
    owner: IGithubUser
    html_url: string
    description: string | null
    fork: boolean
    url: string
    git_url: string
    ssh_url: string
    clone_url: string
    svn_url: string
    homepage: null
    size: number
    stargazers_count: number
    watchers_count: number
    language: string[]
    has_issues: false
    has_projects: true
    has_downloads: true
    has_wiki: boolean
    has_pages: boolean
    has_discussions: boolean
    forks_count: number
    archived: boolean
    license: string | null
    allow_forking: boolean
    is_template: boolean
    topics: string[]
    visibility: 'public' | 'private'
    forks: number
    watchers: number
    default_branch: string
  }
}

export {}
