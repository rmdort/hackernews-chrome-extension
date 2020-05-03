import React from "react"
import {
  Stack,
  Box,
  Heading,
  Text,
  Link,
  Icon,
  StatGroup,
  Stat,
  StatHelpText,
  StatNumber,
  Flex,
  useColorMode,
} from "@chakra-ui/core"
import { IPromiseWrapper, IResults } from "./../../api/hn"
import * as timeago from "timeago.js"
import { Global, css } from "@emotion/core"

interface IProps {
  resource: IPromiseWrapper<IResults>
  query: string
  isPending: boolean
}

const Results: React.FC<IProps> = ({ resource, query, isPending }) => {
  const values = resource.read()
  const noResults = query && !values.length && !isPending
  const { colorMode } = useColorMode()
  const boxProps = {
    shadow: "md",
    borderRadius: 5,
    borderWidth: 1,
    p: 2,
    display: "flex",
  }
  return (
    <Stack spacing={2}>
      <Global
        styles={css`
          .result-title em {
            background: yellow;
            color: ${colorMode === "dark" ? "black" : "inherit"};
          }
        `}
      />
      {noResults && (
        <Box {...boxProps}>
          <Text>Oops! No results, try a different keyword.</Text>
        </Box>
      )}
      {values.map((value) => {
        const highlightedTitle = value._highlightResult.title.value
        const date = timeago.format(value.created_at)
        return (
          <Link key={value.objectID} href={value.url} {...boxProps}>
            <Flex alignItems="center" flex={1}>
              <StatGroup>
                <Stat textAlign="center">
                  <StatNumber>{value.points}</StatNumber>
                  <StatHelpText>Points</StatHelpText>
                </Stat>
              </StatGroup>
              <Box>
                <Heading
                  as="h1"
                  size="sm"
                  mb={1}
                  alignItems="center"
                  display="flex"
                >
                  <Icon name="external-link" mr={1} />
                  <span
                    className="result-title"
                    dangerouslySetInnerHTML={{ __html: highlightedTitle }}
                  />
                </Heading>
                <Text fontSize="xs">{date}</Text>
              </Box>
            </Flex>
          </Link>
        )
      })}
    </Stack>
  )
}

export default Results
