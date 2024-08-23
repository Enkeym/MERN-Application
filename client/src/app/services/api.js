import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: '',
})

export function providesList(result, tagType) {
  const products = result?.products || result?.currentPageProducts
  return products
    ? [
        { type: tagType, id: 'LIST' },
        ...products.map(({ id }) => ({ type: tagType, id }))
      ]
    : [{ type: tagType, id: 'LIST' }]
}

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  tagTypes: ['User', 'Product', 'Categories', 'Orders', 'Cart'],
  endpoints: () => ({})
})
