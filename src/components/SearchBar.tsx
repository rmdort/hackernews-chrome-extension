import React from "react"
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  CloseButton,
} from "@chakra-ui/core"

interface IProps {
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  autoFocus?: boolean
  onReset: (e: React.MouseEvent<HTMLButtonElement>) => void
  ref: React.Ref<HTMLInputElement>
}

const SearchBar: React.FC<IProps> = React.forwardRef(
  ({ value, onReset, ...props }, forwardedRef) => {
    return (
      <InputGroup pb={4}>
        <InputLeftElement children={<Icon name="search" />} />
        <Input ref={forwardedRef} autoFocus value={value} {...props} />
        {value && (
          <InputRightElement children={<CloseButton onClick={onReset} />} />
        )}
      </InputGroup>
    )
  }
)

SearchBar.defaultProps = {
  placeholder: "Search HackerNews",
}

export default SearchBar
