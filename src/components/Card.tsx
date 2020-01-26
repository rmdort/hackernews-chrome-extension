import React from 'react'
import * as timeago from 'timeago.js'
import { ItemOption } from './Stories'
import { Box, Link } from 'rebass'

type Props = {
  item: ItemOption
}

function Card(props: Props) {
  const { item } = props
  const {
    story_title: storyTitle,
    title,
    url,
    created_at: createdAt,
    points,
    author,
    num_comments
  } = item
  return (
    <Box
      p={2}
      m={2}
      bg="secondary"
      sx={{
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
        borderRadius: 5
      }}
    >
      <Box>
        <Link
          target="_blank"
          href={url}
          sx={{
            ':visited': {
              color: 'black'
            }
          }}
        >
          {storyTitle || title}
        </Link>
      </Box>
      {points} points | {timeago.format(createdAt)} | {author} | {num_comments}{' '}
      comments
    </Box>
  )
}

export default Card
