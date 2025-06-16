import { useCallback, useState } from 'react'

// components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import SearchBar from './searcbar'
import GithubUserItem from './github-user-item'

const GithubRepositoriesExplorer = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<IGithubUser[]>([])

  const onSearch = useCallback((value: string) => {
    console.log('VALUE', value)
  }, [])

  return (
    <Card
      sx={{
        mx: 'auto',
        width: {
          xs: '100%',
          sm: 520,
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
        {!isLoading && users?.length === 0 ? (
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
            {users.map((user, index) => (
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
