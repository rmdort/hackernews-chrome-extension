export interface QueryOptions {
  query: string | number
  tags?: TagOptions
  page?: number
}

export type TagOptions = 'story' | 'comment'

export async function searchByDate({
  query,
  tags = 'story',
  page
}: QueryOptions) {
  return fetch(
    `https://hn.algolia.com/api/v1/search_by_date?query="${query}"&tags=${tags}`
  ).then(response => response.json())
}
