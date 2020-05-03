import React from "react"
import { Input, InputGroup, InputLeftElement, InputRightElement, Icon, CloseButton } from "@chakra-ui/core"

interface IProps {
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  autoFocus?: boolean
  onReset: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const SearchBar: React.FC<IProps> = ({ value, onReset, ...props}) => {
  return (
    <InputGroup pb={4}>
      <InputLeftElement children={<Icon name="search" />} />
      <Input autoFocus value={value} {...props} />
      {value && <InputRightElement children={<CloseButton onMouseDown={onReset} />} />}
    </InputGroup>
  )
}

SearchBar.defaultProps = {
  placeholder: "Search HackerNews",
}

export default SearchBar
