import React, { useEffect, useState } from 'react'
import { light, dark } from './theme'
import { ThemeProvider } from 'emotion-theming'
import Content from './components/Content'
import { Global, css } from '@emotion/core'
import useDarkMode from './hooks/useDarkMode'
import { Box } from 'rebass'

const App: React.FC = () => {
  const [isDarkMode, setIsDarkmode] = useDarkMode(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  const [query, setQuery] = useState()

  return (
    <ThemeProvider theme={isDarkMode ? dark : light}>
      <Global
        styles={theme => css`
          html {
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,
              Arial, sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 1.42857142857143;
            -ms-overflow-style: -ms-autohiding-scrollbar;
            text-decoration-skip-ink: auto;
          }
          body {
            background: ${theme.colors.background};
            font-size: 100%;
          }
        `}
      />
      <Box maxWidth={640} m="auto">
        <button onClick={() => setQuery('react')}>React</button>
        <button onClick={() => setQuery('react-dom')}>React DOM</button>
        <Content query={query} />
      </Box>
    </ThemeProvider>
  )
}

export default App
