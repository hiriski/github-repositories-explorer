import {
  FC,
  useMemo,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
} from 'react'

// lodash
import debounce from 'lodash/debounce'

// components
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

// icons
import SearchIconSvg from '@/assets/icons/gridicons--search.svg'

interface Props {
  onSearch: (query: string) => void
}

const SearchBar: FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce(value => {
        if (onSearch) {
          onSearch(value)
        }
      }, 750),
    [onSearch]
  )

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
    },
    []
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        debouncedSearch.cancel() // cancel pending debounce
        if (onSearch) onSearch(query)
      }
    },
    [debouncedSearch, onSearch, query]
  )

  // Call debounced search when query changes
  useEffect(() => {
    debouncedSearch(query)
    return debouncedSearch.cancel // cleanup
  }, [query, debouncedSearch])

  return (
    <TextField
      variant='outlined'
      placeholder='Search...'
      value={query}
      onChange={handleInputChange}
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
  )
}

export default SearchBar
