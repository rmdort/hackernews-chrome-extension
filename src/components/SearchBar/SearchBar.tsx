import React from "react"
import { Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/core"

interface IProps {
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<IProps> = (props) => {
  return (
    <InputGroup pb={4}>
      <InputLeftElement children={<Icon name="search" />} />
      <Input {...props} />
    </InputGroup>
  )
}

SearchBar.defaultProps = {
  placeholder: "Search HackerNews",
}

export default SearchBar
