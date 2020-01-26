import React from 'react'
import Card from './Card'

export interface ItemsOptions {
  stories: ItemOption[]
}

export type ItemOption = {
  title?: string
  story_title?: string
  url?: string
  points?: string
  created_at: string
  num_comments: number
  author?: string
}

function Stories({ stories }: ItemsOptions) {
  return (
    <div>
      {stories
        .filter(({ url }) => url)
        .map((item: ItemOption, i: number) => {
          return <Card key={i} item={item} />
        })}
    </div>
  )
}

export default Stories
