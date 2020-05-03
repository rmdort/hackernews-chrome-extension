import React, { Suspense, useState, useTransition, useRef, useEffect } from "react"
import SearchBar from "./components/SearchBar"
import Results from "./components/Results"
import HNLogo from './components/HNLogo'
import { search, IPromiseWrapper, IResults } from "./api/hn"
import { Box, Spinner, useColorMode, IconButton } from "@chakra-ui/core"

const QUERY_KEY = 'query'
const initialQuery = localStorage.getItem(QUERY_KEY) || ''
const App = () => {
  const [query, setQuery] = useState<string>(initialQuery)
  const [resource, setResource] = useState<IPromiseWrapper<IResults>>(() => search<IResults>({ query }))
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [startTransition, isPending] = useTransition({
    timeoutMs: 2000,
  })
  const { colorMode, toggleColorMode } = useColorMode()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setQuery(query)
    startTransition(() => {
      setResource(search({ query }))
    })
  }
  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    setQuery("")
    inputRef.current && inputRef.current.focus()
  }

  useEffect(() => {
    try {
      localStorage.setItem(QUERY_KEY, query)
    } catch (err) {
      console.error('Error saving in localstorate', err)
    }
  }, [ query ])

  return (
    <Box margin="auto" width={800} py={4}>      
      <IconButton
        aria-label="Switch to dark mode"
        icon={colorMode === "dark" ? "sun" : "moon"}
        onClick={toggleColorMode}
        position="fixed"
        top={4}
        right={4}
      />

      <HNLogo />
      <SearchBar
        autoFocus
        value={query}
        onChange={handleChange}
        onReset={handleReset}
        ref={inputRef}
      />

      <Suspense fallback={<Spinner />}>
        <Results resource={resource} query={query} isPending={isPending} />
      </Suspense>
    </Box>
  )
}

export default App
