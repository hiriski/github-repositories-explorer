// components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// icons
import GithubLogoSvg from '@/assets/icons/fontisto--github.svg'

const Header = () => {
  return (
    <Stack
      gap={2}
      sx={{ mb: 4, alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        component='img'
        src={GithubLogoSvg}
        sx={{ width: 52, height: 'auto' }}
      />
      <Typography
        variant='h3'
        component='h1'
        sx={{
          textAlign: 'center',
          fontSize: {
            xs: 18,
            md: 28,
          },
        }}
      >
        GitHub Repositories Explorer
      </Typography>
    </Stack>
  )
}

export default Header
