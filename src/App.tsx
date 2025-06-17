// components
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import Header from './components/header'
import GithubRepositoriesExplorer from './components/github-repositories-explorer'
import Footer from './components/footer'

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
        <Footer />
      </Container>
    </Box>
  )
}

export default App
