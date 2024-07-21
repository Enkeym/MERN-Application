import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: ''
})

export function providesList(resultsWithIds, tagType) {
  const currentPageProducts = resultsWithIds.currentPageProducts
  return currentPageProducts
    ? [
        { type: tagType, id: 'LIST' },
        ...currentPageProducts.map(({ id }) => ({ type: tagType, id }))
      ]
    : [{ type: tagType, id: 'LIST' }]
}

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  tagTypes: ['User', 'Product', 'Categories', 'Orders'],
  endpoints: () => ({})
})
