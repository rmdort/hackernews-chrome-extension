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
import { IPromiseWrapper, IResults } from "./../api/hn"
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
            background: #ffc;
            font-style: normal;
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
        const numComments = value.num_comments
        const storyId = value.objectID
        const storyUrl = `https://news.ycombinator.com/item?id=${storyId}`
        const url = value.url || storyUrl
        const highlightedTitle = value._highlightResult.title.value
        const date = timeago.format(value.created_at)
        return (
          <Box
            {...boxProps}            
            key={value.objectID}            
          >
            <Flex alignItems="center" flex={1} minWidth={0}>
              <StatGroup>
                <Stat textAlign="center">
                  <StatNumber>{value.points}</StatNumber>
                  <StatHelpText>Points</StatHelpText>
                </Stat>
              </StatGroup>
              <Box minWidth={0}>
                <Link href={url} target='_blank'>
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
                </Link>
                <Text
                  title={value.url}
                  fontSize="xs"
                  pb={1}
                  whiteSpace="nowrap"
                  overflow="hidden"
                  style={{
                    textOverflow: "ellipsis",
                  }}
                >
                  {value.url}
                </Text>
                <Stack spacing={4} isInline>
                  <Text fontSize="xs">{date}</Text>
                  <Link href={storyUrl} target='_blank'>
                    <Text fontSize="xs">{numComments} comments</Text>
                  </Link>
                </Stack>
              </Box>
            </Flex>
          </Box>
        )
      })}
    </Stack>
  )
}

export default Results
