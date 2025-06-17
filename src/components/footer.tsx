import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// motion
import { motion, Variants } from 'framer-motion'

// icons
import HeartIcon from '@/assets/icons/heroicons--heart-20-solid.svg'

// images
import Avatar from '@/assets/avatar.png'
import { useCallback } from 'react'

const avatarVariants: Variants = {
  hover: {
    x: 0,
    scale: 0.9,
    transition: { duration: 0.3 },
  },
}

const Footer = () => {
  const onClickAvatar = useCallback(() => {
    window.open('https://github.com/hiriski', '_blank')
  }, [])
  return (
    <Stack sx={{ mt: 4, alignItems: 'center', justifyContent: 'center' }}>
      <Stack onClick={onClickAvatar} sx={{ cursor: 'pointer' }}>
        <motion.div variants={avatarVariants} whileHover='hover'>
          <Box component='img' src={Avatar} sx={{ width: 60, height: 60 }} />
        </motion.div>
      </Stack>
      <Typography
        component='p'
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'text.secondary',
          fontWeight: '400',
          fontSize: '0.85rem',
        }}
      >
        <Typography component='span' sx={{ fontSize: 'inherit' }}>
          Made with
        </Typography>
        <Box
          component='img'
          src={HeartIcon}
          sx={{ height: 18, width: 'auto', mx: 0.3 }}
        />
        <Typography component='span' sx={{ fontSize: 'inherit' }}>
          at Bandung, Indonesia
        </Typography>
      </Typography>
    </Stack>
  )
}

export default Footer
