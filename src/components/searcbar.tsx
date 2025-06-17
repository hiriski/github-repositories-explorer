import { FC, useState, useCallback, ChangeEvent, KeyboardEvent } from 'react'

// lodash
import debounce from 'lodash/debounce'

// components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'

// icons
import SearchIconSvg from '@/assets/icons/gridicons--search.svg'

interface Props {
  onSearch: (query: string) => void
}

const SearchBar: FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const debounceChangeHandler = useCallback(
    debounce((value: string) => {
      onSearch(value)
    }, 750),
    []
  )

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    debounceChangeHandler(value)
  }

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (onSearch) onSearch(query)
      }
    },
    [onSearch, query]
  )

  return (
    <Stack direction='column' gap={2}>
      <TextField
        variant='outlined'
        placeholder='Search...'
        value={query}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            fontSize: '1.1rem',
            fontWeight: '600',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Box
                component='img'
                src={SearchIconSvg}
                sx={{ width: 24, height: 'auto' }}
              />
            </InputAdornment>
          ),
        }}
      />
      {query && (
        <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
          Showing users for{' '}
          <Typography
            component='span'
            sx={{ fontWeight: '700', color: 'text.primary' }}
          >
            {query}
          </Typography>
        </Typography>
      )}
    </Stack>
  )
}

export default SearchBar
