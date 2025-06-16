import { FC, memo, useState } from 'react'

// components
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// icons
import GithubRepositoryItem from './github-repository-item'
import RepositoryIcon from '@/assets/icons/iconoir--repository.svg'

interface Props {
  user: IGithubUser
  isLastItem: boolean
}

const GithubUserItem: FC<Props> = ({ user, isLastItem }) => {
  const [expanded, setExpanded] = useState(false)
  const [repositories, setRepositories] = useState<IGithubRepository[]>([])
  return (
    <Stack direction='column'>
      <Stack
        direction='row'
        sx={{
          cursor: 'pointer',
          alignItems: 'center',
          py: 2,
          ...(!isLastItem &&
            !expanded && {
              borderBottom: theme => `1px solid ${theme.palette.divider}`,
            }),
        }}
      >
        <Avatar src={user.avatar_url} sx={{ width: 48, height: 48, mr: 3 }} />
        <Stack>
          <Typography variant='h6' sx={{ fontWeight: '700' }}>
            {user.name ?? user.login}
          </Typography>
          <Stack direction='row' gap={1}>
            <Box
              component='img'
              src={RepositoryIcon}
              sx={{ width: 16, height: 'auto' }}
            />
            <Typography
              variant='subtitle1'
              component='p'
              sx={{ color: 'text.secondary', fontWeight: '600' }}
            >
              79 Repositories
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {expanded && (
        <Stack
          sx={{
            pl: 2,
            gap: 1.4,
            pb: 2,
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
          }}
        >
          {repositories.map(item => (
            <GithubRepositoryItem key={String(item.id)} repository={item} />
          ))}
        </Stack>
      )}
    </Stack>
  )
}

export default memo(GithubUserItem)
