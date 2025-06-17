import { render, screen } from '@testing-library/react'

// components
import Header from './header'

describe('Header', () => {
  it('renders the header with correct title', () => {
    render(<Header />)

    // Check if the title is rendered
    expect(screen.getByText('GitHub Repositories Explorer')).toBeInTheDocument()
  })

  it('applies correct styling to components', () => {
    render(<Header />)

    // Check if the title has the correct heading level
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('GitHub Repositories Explorer')

    // Check if the Stack component is rendered
    const stackElement = heading.parentElement?.parentElement
    expect(stackElement).toBeInTheDocument()
  })
})
