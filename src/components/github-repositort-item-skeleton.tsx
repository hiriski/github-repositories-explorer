import { Box, Skeleton, Stack } from '@mui/material'

const GithubRepositoryItemSkeleton = () => {
  return (
    <Box
      sx={{
        p: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#f5f7fb',
        borderRadius: 2,
        width: '100%',
      }}
    >
      <Box>
        <Skeleton variant='text' width={200} height={28} />
        <Skeleton variant='text' width={250} height={20} />
      </Box>
      <Stack direction='row' alignItems='center' spacing={1}>
        <Skeleton variant='text' width={20} height={24} />
        <Skeleton variant='circular' width={20} height={20} />
      </Stack>
    </Box>
  )
}

export default GithubRepositoryItemSkeleton
