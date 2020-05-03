import React from "react"
import { Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/core"

interface IProps {
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  autoFocus?: boolean
}

const SearchBar: React.FC<IProps> = (props) => {
  return (
    <InputGroup pb={4}>
      <InputLeftElement children={<Icon name="search" />} />
      <Input autoFocus {...props} />
    </InputGroup>
  )
}

SearchBar.defaultProps = {
  placeholder: "Search HackerNews",
}

export default SearchBar
