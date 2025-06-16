import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// fonts
import '@fontsource/plus-jakarta-sans/300.css'
import '@fontsource/plus-jakarta-sans/300-italic.css'
import '@fontsource/plus-jakarta-sans/400-italic.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/500-italic.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/600-italic.css'
import '@fontsource/plus-jakarta-sans/700.css'
import '@fontsource/plus-jakarta-sans/700-italic.css'
import '@fontsource/plus-jakarta-sans/800.css'
import '@fontsource/plus-jakarta-sans/800-italic.css'

// @mui css baseline
import CssBaseline from '@mui/material/CssBaseline'

// context provider
import AppContextProvider from './components/app-context-provider.tsx'
import MuiThemeProvider from './plugins/@mui/components/@mui-theme.provider.tsx'

// component wrapper
import App from './App.tsx'
import GithubContextProvider from './components/github-context-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContextProvider>
      <GithubContextProvider>
        <MuiThemeProvider>
          <CssBaseline enableColorScheme />
          <App />
        </MuiThemeProvider>
      </GithubContextProvider>
    </AppContextProvider>
  </StrictMode>
)
