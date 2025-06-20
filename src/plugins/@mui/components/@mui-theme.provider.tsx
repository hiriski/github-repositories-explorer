import { FC, ReactNode, useMemo } from 'react'

// @mui
import { createTheme } from '@/plugins/@mui/theme'
import { CssBaseline, Theme, ThemeProvider } from '@mui/material'

// hooks
import { useApp } from '@/hooks'

const MuiThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { isDark } = useApp()
  const theme = useMemo<Theme>(() => createTheme(isDark), [isDark])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default MuiThemeProvider
