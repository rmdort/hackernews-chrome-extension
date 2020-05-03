interface ISearchProps {
  query: string
}

export interface IResults {
  author: string
  comment_text: string | null
  created_at: string
  created_at_i: number
  num_comments: number
  objectID: string
  parent_id: string | null
  points: number
  story_id: string | null
  story_text: string | null
  story_title: string | null
  story_url: string | null
  title: string
  url: string
  _highlightResult: THighlight
}

type THighlight = Record<"title", { value: string }>

export interface IPromiseWrapper<T> {
  read: () => T[]
}

export const search = <T>({ query }: ISearchProps): IPromiseWrapper<T> => {
  const promise = query
    ? fetch(
        `http://hn.algolia.com/api/v1/search_by_date?tags=story&query="${query}"`
      )
        .then((res) => res.json())
        .then((res) => res.hits)
        .catch((err) => {
          throw err
        })
    : Promise.resolve([])

  return wrapPromise<T>(promise)
}

function wrapPromise<T>(promise: Promise<T>): IPromiseWrapper<T> {
  let status = "pending"
  let result: any
  let suspender = promise.then(
    (r) => {
      status = "success"
      result = r
    },
    (e) => {
      status = "error"
      result = e
    }
  )
  return {
    read() {
      if (status === "pending") {
        throw suspender
      } else if (status === "error") {
        throw result
      } else if (status === "success") {
        return result
      }
    },
  }
}
