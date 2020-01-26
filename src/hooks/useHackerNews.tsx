import React, { useState, useEffect, useCallback } from 'react'
import useLocalStorage, { setStateType } from './useLocalStorage'
import { searchByDate } from './../api'
const KEY_NEWS: string = 'hn_news'

type ItemOption = {
  title?: string
  story_title?: string
  url?: string
  points?: string
  created_at: string
  num_comments: number
  author?: string
}

export interface hookOptions {
  query: string
}

interface hookOutput {
  data?: ItemOption[]
  isLoading: boolean
  fetchData: () => void
}

function fetchHackerNews({ query }: hookOptions): hookOutput {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = useCallback(() => {
    async function startFetching() {
      setIsLoading(true)
      const news = await searchByDate({
        query
      })
      setData(news.hits)
      setIsLoading(false)
    }
    startFetching()
  }, [query])

  return {
    data,
    isLoading,
    fetchData
  }
}

function useHackerNews({ query }: hookOptions): [ItemOption[], boolean] {
  const [news, setNews] = useLocalStorage(`${KEY_NEWS}_${query}`, [])
  const { data, fetchData, isLoading } = fetchHackerNews({ query })

  useEffect(() => {
    fetchData()
  }, [query])

  useEffect(() => {
    if (data && !isLoading) {
      setNews(data)
    }
  }, [data, isLoading])

  return [news, isLoading]
}

export default useHackerNews
