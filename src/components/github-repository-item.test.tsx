import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// components
import GithubRepositoryItem from './github-repository-item'

// Sample repository data
const mockRepository = {
  id: 123,
  name: 'example-repo',
  html_url: 'https://github.com/example/example-repo',
  description: 'This is a sample repository',
  stargazers_count: 42,
} as unknown as IGithubRepository

describe('GithubRepositoryItem', () => {
  let openMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    openMock = vi.fn()
    // Mock window.open
    window.open = openMock
  })

  it('renders repository name and description', () => {
    render(<GithubRepositoryItem repository={mockRepository} />)

    expect(screen.getByText('example-repo')).toBeInTheDocument()
    expect(screen.getByText('This is a sample repository')).toBeInTheDocument()
  })

  it('displays star count and icon when stargazers_count > 0', () => {
    render(<GithubRepositoryItem repository={mockRepository} />)

    expect(screen.getByText('42')).toBeInTheDocument()
    const starIcon = screen.getByRole('img')
    expect(starIcon).toBeInTheDocument()
  })

  it('does not display star icon when stargazers_count = 0', () => {
    const repoWithoutStars = { ...mockRepository, stargazers_count: 0 }
    render(<GithubRepositoryItem repository={repoWithoutStars} />)

    expect(screen.queryByText('42')).not.toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('opens repository link in new tab on click', () => {
    render(<GithubRepositoryItem repository={mockRepository} />)

    const container = screen.getByText('example-repo')
    fireEvent.click(container)

    expect(openMock).toHaveBeenCalledWith(
      'https://github.com/example/example-repo',
      '_blank'
    )
  })
})
