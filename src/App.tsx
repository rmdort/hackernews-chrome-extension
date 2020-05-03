import React, { Suspense, useState, useTransition } from "react"
import SearchBar from "./components/SearchBar"
import Results from "./components/Results"
import { search, IPromiseWrapper, IResults } from "./api/hn"
import { Box, useColorMode, IconButton } from "@chakra-ui/core"

const initialPromise = search<IResults>({ query: "" })
const App = () => {
  const [query, setQuery] = useState<string>("")
  const [resource, setResource] = useState<IPromiseWrapper<IResults>>(
    initialPromise
  )
  const [startTransition, isPending] = useTransition({
    timeoutMs: 3000,
  })
  const { colorMode, toggleColorMode } = useColorMode()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setQuery(query)
    startTransition(() => {
      setResource(search({ query }))
    })
  }
  return (
    <Box margin="auto" width={800} py={4}>
      <Box color='white' background='#FC6723' width={30} height={30} display='flex' alignItems='center' justifyContent='center' margin='auto' mb={4} fontSize={20}>
        Y
      </Box>
      <IconButton
        aria-label="Switch to dark mode"
        icon={colorMode === "dark" ? "sun" : "moon"}
        onClick={toggleColorMode}
        position="fixed"
        top={4}
        right={4}
      />
      <SearchBar autoFocus value={query} onChange={handleChange} />

      <Suspense fallback={<span>Loading</span>}>
        <Results resource={resource} query={query} isPending={isPending} />
      </Suspense>
    </Box>
  )
}

export default App
