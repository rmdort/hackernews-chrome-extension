import React from 'react'
import Stories from './Stories'
import useHackerNews from './../hooks/useHackerNews'
import { hookOptions } from './../hooks/useHackerNews'

const Content: React.FC<hookOptions> = ({ query }) => {
  const [data, isLoading] = useHackerNews({
    query
  })

  return <Stories stories={data} />
}

export default Content
