// components
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import Header from './components/header'
import GithubRepositoriesExplorer from './components/github-repositories-explorer'

const App = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth='sm'>
        <Header />
        <GithubRepositoriesExplorer />
      </Container>
    </Box>
  )
}

export default App
