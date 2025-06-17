import { FC, memo, useCallback, useMemo, useState } from 'react'

// components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import GithubRepositoryItem from './github-repository-item'
import GithubRepositoryItemSkeleton from './github-repositort-item-skeleton'

// icons
import LinkIcon from '@/assets/icons/tabler--link.svg'

// apis
import { GitHubApi, IRequestFetchRepositories } from '@/services/github.api'

// hooks
import { Button } from '@mui/material'
import { useGithub } from '@/hooks'

interface Props {
  user: IGithubUser
  isLastItem: boolean
}

const GithubUserItem: FC<Props> = ({ user, isLastItem }) => {
  const [totalCount, setTotalCount] = useState(0)
  const [repositories, setRepositories] = useState<IGithubRepository[]>([])
  const [repositoryIsLoading, setRepositoryIsLoading] = useState(false)

  // github context state
  const { expandedItem, setExpandedItem } = useGithub()

  const [params, setParams] = useState({
    userId: user.id,
    username: user.login,
    per_page: 10,
    page: 1,
  })

  const showLoadMoreButton = useMemo(
    () => params.page * params.per_page < totalCount,
    [params.page, totalCount]
  )

  const fetchRepositories = useCallback(
    async (providedParams: IRequestFetchRepositories) => {
      setParams(prev => ({
        ...prev,
        page: providedParams.page,
      }))
      try {
        setRepositoryIsLoading(true)
        const result = await GitHubApi.fetchRepositories(providedParams)
        setTotalCount(result.totalCount)
        const newRepositories: IGithubRepository[] =
          providedParams.page > 1
            ? [...repositories, ...result.repositories]
            : result.repositories
        setRepositories(newRepositories)
      } catch (e) {
        console.log('e', e)
      } finally {
        setRepositoryIsLoading(false)
      }
    },
    [repositoryIsLoading, repositories, totalCount, params.page]
  )

  const onClickUser = useCallback(async () => {
    console.log('user.login : expandedItem', user.login, expandedItem)
    setExpandedItem(user.login)
    if (user.login !== expandedItem) {
      fetchRepositories(params)
    } else {
      // reset state
      // setRepositories([])
      // setTotalCount(0)
    }
  }, [repositories, totalCount, expandedItem, user.login])

  return (
    <Stack direction='column'>
      <Stack
        onClick={onClickUser}
        direction='row'
        sx={{
          cursor: 'pointer',
          alignItems: 'center',
          py: 2,
          ...(!isLastItem &&
            user.login !== expandedItem &&
            repositories.length === 0 && {
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
              src={LinkIcon}
              sx={{ width: 18, height: 'auto', mt: 0.2 }}
            />
            <Typography
              variant='subtitle1'
              component='p'
              sx={{ color: 'text.secondary', fontWeight: '600' }}
            >
              {user.html_url}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {expandedItem === user.login && (
        <Stack
          sx={{
            maxHeight: 400,
            overflowY: 'scroll',
            pl: 2.4,
            gap: 1.4,
            pb: 2,
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
          }}
        >
          {!repositoryIsLoading && repositories?.length === 0 ? (
            <Box
              sx={{
                minHeight: 100,
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
                {user.login} doesn't have any repositories or no public ones
                available.
              </Typography>
            </Box>
          ) : (
            <Stack sx={{ mt: 1 }}>
              {repositoryIsLoading && params.page === 1
                ? Array.from({ length: 5 }).map((_, index) => (
                    <GithubRepositoryItemSkeleton key={index} />
                  ))
                : repositories.map(item => (
                    <GithubRepositoryItem
                      key={String(item.id)}
                      repository={item}
                    />
                  ))}
              {showLoadMoreButton && (
                <Stack>
                  <Button
                    onClick={() =>
                      fetchRepositories({ ...params, page: params.page + 1 })
                    }
                    sx={{ fontWeight: '700' }}
                    loading={repositoryIsLoading && params.page > 1}
                  >
                    Lorem More...
                  </Button>
                </Stack>
              )}
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  )
}

export default memo(GithubUserItem)
