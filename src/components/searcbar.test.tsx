import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, vi, expect, beforeEach } from 'vitest'

// components
import SearchBar from './searcbar'

// Mock lodash debounce to call the function immediately
vi.mock('lodash/debounce', () => ({
  default: (fn: unknown) => fn,
}))

describe('SearchBar Component', () => {
  let onSearchMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onSearchMock = vi.fn()
  })

  it('renders input and icon', () => {
    render(<SearchBar onSearch={onSearchMock} />)

    const input = screen.getByPlaceholderText(/search/i)
    expect(input).toBeInTheDocument()

    const icon = screen.getByRole('img')
    expect(icon).toBeInTheDocument()
  })

  it('calls onSearch when typing', async () => {
    render(<SearchBar onSearch={onSearchMock} />)

    const input = screen.getByPlaceholderText(/search/i)
    await userEvent.type(input, 'riski')

    await waitFor(() => {
      expect(onSearchMock).toHaveBeenLastCalledWith('riski')
    })
  })

  it('calls onSearch when Enter key is pressed', async () => {
    render(<SearchBar onSearch={onSearchMock} />)

    const input = screen.getByPlaceholderText(/search/i)
    await userEvent.type(input, 'doe')

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(onSearchMock).toHaveBeenCalledWith('doe')
  })

  it('displays the query text when input is filled', async () => {
    render(<SearchBar onSearch={onSearchMock} />)

    const input = screen.getByPlaceholderText(/search/i)
    await userEvent.type(input, 'alice')

    expect(screen.getByText(/showing users for/i)).toBeInTheDocument()
    expect(screen.getByText('alice')).toBeInTheDocument()
  })
})
