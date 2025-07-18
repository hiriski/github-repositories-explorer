import { FC, Fragment, memo, useCallback, useMemo, useState } from 'react'

// components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import GithubRepositoryItem from './github-repository-item'
import GithubRepositoryItemSkeleton from './github-repositort-item-skeleton'

// icons
import LinkIcon from '@/assets/icons/tabler--link.svg'
import ArrowUpIcon from '@/assets/icons/akar-icons--arrow-up.svg'

// apis
import { GitHubApi, IRequestFetchRepositories } from '@/services/github.api'

// hooks
import { Button, IconButton } from '@mui/material'
import { useGithub } from '@/hooks'

// motion
import { motion, AnimatePresence, Variants } from 'framer-motion'

interface Props {
  user: IGithubUser
  isLastItem: boolean
}

const motionCardVariants: Variants = {
  collapsed: {
    height: 80,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  expanded: {
    height: 'auto',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
}

const motionContentVariants: Variants = {
  collapsed: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
  expanded: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1,
      duration: 0.3,
    },
  },
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
      setExpandedItem(null)
      // reset state
      // setRepositories([])
      // setTotalCount(0)
    }
  }, [repositories, totalCount, expandedItem, user.login])

  const onClickLink = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(user.html_url, '_blank')
  }, [])

  return (
    <Stack
      direction='column'
      component={motion.div}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        '&:hover': {
          '.btn-user-link': {
            right: 0,
            opacity: 1,
          },
        },
      }}
      variants={motionCardVariants}
      initial='collapsed'
      animate={expandedItem === user.login ? 'expanded' : 'collapsed'}
      onClick={onClickUser}
      whileTap={{ scale: 0.98 }}
    >
      <Fragment>
        <Stack
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
          <Avatar
            src={user.avatar_url}
            sx={{
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              mr: {
                xs: 1,
                sm: 3,
              },
            }}
          />
          <Stack>
            <Typography
              variant='h6'
              sx={{
                fontWeight: '700',
                fontSize: { xs: '1rem', sm: '1.1rem' },
              }}
            >
              {user.name ?? user.login}
            </Typography>
            <Stack direction='row' gap={1}>
              <Box
                component='img'
                src={LinkIcon}
                sx={{ width: { xs: 15, sm: 18 }, height: 'auto', mt: 0.2 }}
              />
              <Typography
                variant='subtitle1'
                component='p'
                sx={{
                  color: 'text.secondary',
                  fontWeight: '600',
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                }}
              >
                {user.html_url}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Fragment>
      <AnimatePresence>
        {expandedItem === user.login && (
          <motion.div
            variants={motionContentVariants}
            initial='collapsed'
            animate='expanded'
            exit='collapsed'
            style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#374151',
            }}
          >
            {expandedItem === user.login && (
              <Stack
                sx={{
                  maxHeight: 350,
                  overflowY: 'scroll',
                  pl: 2.4,
                  gap: {
                    xs: 1,
                    md: 1.4,
                  },
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
                      {user.login} doesn't have any repositories or no public
                      ones available.
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
                          onClick={e => {
                            e.stopPropagation()
                            fetchRepositories({
                              ...params,
                              page: params.page + 1,
                            })
                          }}
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
          </motion.div>
        )}
      </AnimatePresence>

      <IconButton
        className='btn-user-link'
        color='primary'
        sx={{
          position: 'absolute',
          userSelect: 'none',
          top: 20,
          right: -60,
          width: 40,
          height: 40,
          opacity: 0,
          transition: theme =>
            theme.transitions.create(['right', 'transform'], {
              duration: theme.transitions.duration.complex,
            }),
        }}
        onClick={onClickLink}
      >
        <Box
          component='img'
          src={ArrowUpIcon}
          sx={{ height: 20, width: 'auto', transform: 'rotate(45deg)' }}
        />
      </IconButton>
    </Stack>
  )
}

export default memo(GithubUserItem)
