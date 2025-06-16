import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
  request: {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  },
})

export default octokit
