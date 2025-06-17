import { useCallback } from 'react'

// components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import SearchBar from './searcbar'
import GithubUserItem from './github-user-item'

// hooks
import { useGithub } from '@/hooks'

// apis
import { GitHubApi } from '@/services/github.api'
import GithubUserItemSkeleton from './github-user-item-skeleton'

const GithubRepositoriesExplorer = () => {
  const { usersLoading, setUsersLoading, users, setUsers } = useGithub()

  const onSearch = useCallback(
    async (value: string) => {
      if (value) {
        try {
          setUsersLoading(true)
          setUsers([])
          const users = await GitHubApi.fetchSearchUsers(value)
          setUsers(users)
        } catch (e) {
          console.log('e', e)
        } finally {
          setUsersLoading(false)
        }
      }
    },
    [usersLoading]
  )

  return (
    <Card
      sx={{
        mx: 'auto',
        width: {
          xs: '100%',
          sm: 600,
        },
        boxShadow: 2,
        borderRadius: 6.5,
      }}
    >
      <CardContent
        sx={{
          px: { xs: 3, sm: 5 },
          py: { xs: 3, sm: 4 },
        }}
      >
        <SearchBar onSearch={onSearch} />
        {!usersLoading && users?.length === 0 ? (
          <Box
            sx={{
              minHeight: 160,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant='body2'
              component='p'
              sx={{
                color: 'text.disabled',
                textAlign: 'center',
                fontSize: {
                  xs: 14,
                  md: 16,
                },
              }}
            >
              Search someone's name to see the results.
            </Typography>
          </Box>
        ) : (
          <Stack sx={{ mt: 1 }}>
            {usersLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <GithubUserItemSkeleton key={index} />
                ))
              : users.map((user, index) => (
                  <GithubUserItem
                    key={user.login}
                    user={user as IGithubUser}
                    isLastItem={users?.length - 1 === index}
                  />
                ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  )
}

export default GithubRepositoriesExplorer
