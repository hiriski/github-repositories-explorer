// @mui utils
import { createTheme as createMuiTheme, Theme } from '@mui/material/styles'

// theme config
import paletteBase from './theme/palette-base'
import paletteDark from './theme/palette-dark'
import paletteLight from './theme/palette-light'
import breakpoints from './theme/breakpoints'
import typography from './theme/typography'
import shadows from './theme/shadows'
import components from './theme/components'

export const createTheme = (isDark?: boolean): Theme => {
  const palette = isDark
    ? { ...paletteBase, ...paletteDark }
    : { ...paletteBase, ...paletteLight }
  return createMuiTheme({
    palette,
    breakpoints: breakpoints,
    typography: typography,
    shadows: shadows,
    components: components,
  })
}
