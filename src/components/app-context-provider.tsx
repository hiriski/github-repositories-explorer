import { AppContext } from '@/contexts'
import { FC, ReactNode, useState } from 'react'

export const AppContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState<boolean>(false)

  return (
    <AppContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
