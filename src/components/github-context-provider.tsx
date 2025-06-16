import { GithubContext } from '@/contexts/github.context'
import { FC, ReactNode, useState } from 'react'

export const GithubContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<IGithubUser[]>([])
  const [repositories, setRepositories] = useState<{
    [key: string]: IGithubRepository[]
  }>({})
  const [usersLoading, setUsersLoading] = useState(false)
  const [repositoriesLoading, setRepositoriesLoading] = useState(false)

  return (
    <GithubContext.Provider
      value={{
        users,
        setUsers,
        repositories,
        setRepositories,
        usersLoading,
        setUsersLoading,
        repositoriesLoading,
        setRepositoriesLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContextProvider
