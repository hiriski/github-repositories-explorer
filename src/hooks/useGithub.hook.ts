import { useContext } from 'react'

// context
import { GithubContext } from '@/contexts/github.context'

export const useGithub = (): GithubContextType => {
  const context = useContext<GithubContextType>(GithubContext)
  return context
}
