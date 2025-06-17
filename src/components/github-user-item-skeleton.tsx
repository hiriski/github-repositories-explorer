import { Box, Skeleton, Stack } from '@mui/material'

const GithubUserItemSkeleton = () => {
  return (
    <Box
      display='flex'
      alignItems='center'
      p={2}
      sx={{
        borderRadius: 2,
        width: '100%',
      }}
    >
      <Skeleton variant='circular' width={56} height={56} sx={{ mr: 2 }} />
      <Stack spacing={1} flex={1}>
        <Skeleton variant='text' width='50%' height={24} />
        <Skeleton variant='text' width='70%' height={20} />
      </Stack>
    </Box>
  )
}

export default GithubUserItemSkeleton
