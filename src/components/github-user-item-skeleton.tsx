import { Box, Skeleton, Stack } from '@mui/material'

const GithubUserItemSkeleton = () => {
  return (
    <Box
      display='flex'
      alignItems='center'
      sx={{
        borderRadius: 2,
        width: '100%',
        py: {
          xs: 1,
          sm: 2,
        },
      }}
    >
      <Skeleton
        variant='circular'
        sx={{ mr: 2, width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 } }}
      />
      <Stack spacing={1} flex={1}>
        <Skeleton variant='text' width='50%' height={24} />
        <Skeleton variant='text' width='70%' height={20} />
      </Stack>
    </Box>
  )
}

export default GithubUserItemSkeleton
