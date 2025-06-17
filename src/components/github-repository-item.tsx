import { FC, memo, useCallback } from 'react'

// components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// icons
import StarIcon from '@/assets/icons/material-symbols--star-rounded.svg'

interface Props {
  repository: IGithubRepository
}

const GithubRepositoryItem: FC<Props> = ({ repository }) => {
  const onClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(repository.html_url, '_blank')
  }, [])
  return (
    <Stack
      sx={{
        bgcolor: 'background.default',
        borderRadius: 3,
        py: 1,
        px: 1.4,
        mb: 1,
      }}
      onClick={onClick}
    >
      <Stack gap={0.2}>
        <Stack
          direction='row'
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Typography sx={{ fontWeight: '700', fontSize: '1.05rem' }}>
            {repository.name}
          </Typography>
          {repository?.stargazers_count > 0 && (
            <Stack direction='row' sx={{ alignItems: 'center', gap: 0.5 }}>
              <Typography
                variant='subtitle2'
                sx={{ fontWeight: '800', color: 'text.primary' }}
              >
                {repository.stargazers_count}
              </Typography>
              <Box
                component='img'
                src={StarIcon}
                sx={{ width: 17, height: 'auto' }}
              />
            </Stack>
          )}
        </Stack>
        <Typography
          variant='subtitle2'
          component='p'
          sx={{ color: 'text.secondary', lineHeight: 1.3, mb: 0.4 }}
        >
          {repository.description}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default memo(GithubRepositoryItem)
