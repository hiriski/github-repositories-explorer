import { Box, Typography } from '@mui/material'

const App = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant='h4'>Hello world</Typography>
    </Box>
  )
}

export default App
