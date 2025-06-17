import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { useGithub } from '@/hooks'
import { GitHubApi } from '@/services/github.api'

// components
import GithubUserItem from './github-user-item'

// Mock the useGithub hook
vi.mock('@/hooks', () => ({
  useGithub: vi.fn(),
}))

// Mock GitHubApi.fetchRepositories
vi.mock('@/services/github.api', () => ({
  GitHubApi: {
    fetchRepositories: vi.fn(),
  },
}))

// Sample user data
const mockUser = {
  login: 'hiriski',
  id: 34002829,
  node_id: 'MDQ6VXNlcjM0MDAyODI5',
  avatar_url: 'https://avatars.githubusercontent.com/u/34002829?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/hiriski',
  html_url: 'https://github.com/hiriski',
  followers_url: 'https://api.github.com/users/hiriski/followers',
  following_url: 'https://api.github.com/users/hiriski/following{/other_user}',
  gists_url: 'https://api.github.com/users/hiriski/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/hiriski/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/hiriski/subscriptions',
  organizations_url: 'https://api.github.com/users/hiriski/orgs',
  repos_url: 'https://api.github.com/users/hiriski/repos',
  events_url: 'https://api.github.com/users/hiriski/events{/privacy}',
  received_events_url: 'https://api.github.com/users/hiriski/received_events',
  type: 'User',
  user_view_type: 'private',
  site_admin: false,
  name: 'Rizki Muhamad s',
  company: 'BTS.id',
  blog: '',
  location: 'South Beach Palabuhanratu, West Java, Indonesia',
  email: 'hi@riski.me',
  hireable: null,
  bio: 'Speak less, observing more',
  twitter_username: null,
  public_repos: 79,
  public_gists: 1,
  followers: 41,
  following: 11,
  created_at: '2017-11-26T13:13:42Z',
  updated_at: '2025-06-16T14:22:36Z',
  private_gists: 8,
  total_private_repos: 100,
  owned_private_repos: 100,
  disk_usage: 787936,
  collaborators: 5,
  two_factor_authentication: true,
  plan: {
    name: 'free',
    space: 976562499,
    collaborators: 0,
    private_repos: 10000,
  },
} as unknown as IGithubUser

describe('GithubUserItem', () => {
  const setExpandedItem = vi.fn()

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks()

    // Default hook behavior
    ;(useGithub as unknown as Mock).mockReturnValue({
      expandedItem: null,
      setExpandedItem,
    })

    // Default API response
    ;(GitHubApi.fetchRepositories as unknown as Mock).mockResolvedValue({
      totalCount: 0,
      repositories: [],
    })
  })

  it('renders user name and link', () => {
    render(<GithubUserItem user={mockUser} isLastItem={false} />)

    expect(screen.getByText('Rizki Muhamad s')).toBeInTheDocument()
    expect(screen.getByText(mockUser.html_url)).toBeInTheDocument()
  })

  it('calls setExpandedItem and fetchRepositories on click', async () => {
    render(<GithubUserItem user={mockUser} isLastItem={false} />)

    const userItem = screen.getByText('Rizki Muhamad s')
    fireEvent.click(userItem)

    await waitFor(() => {
      expect(setExpandedItem).toHaveBeenCalledWith('hiriski')
      expect(GitHubApi.fetchRepositories).toHaveBeenCalledWith({
        userId: mockUser.id,
        username: mockUser.login,
        per_page: 10,
        page: 1,
      })
    })
  })

  it('opens GitHub profile in new tab on link icon click', () => {
    // Mock window.open
    const openMock = vi.fn()
    window.open = openMock

    render(<GithubUserItem user={mockUser} isLastItem={false} />)

    const linkButton = screen.getByRole('button')
    fireEvent.click(linkButton)

    expect(openMock).toHaveBeenCalledWith(mockUser.html_url, '_blank')
  })

  it('shows empty state when no repositories returned', async () => {
    // Set expanded state
    ;(useGithub as unknown as Mock).mockReturnValue({
      expandedItem: mockUser.login,
      setExpandedItem,
    })

    render(<GithubUserItem user={mockUser} isLastItem={false} />)

    await waitFor(() => {
      expect(
        screen.getByText(/doesn't have any repositories/i)
      ).toBeInTheDocument()
    })
  })
})
