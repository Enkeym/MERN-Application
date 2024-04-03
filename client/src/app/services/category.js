import { api } from './api'
import { providesList } from './api'
const CATEGORY_URL = '/api/category'

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      /* query: (body) =>
        body ? `${CATEGORY_URL}/${body.category}` : `${CATEGORY_URL}`,
      providesTags: (result) => providesList(result, 'Categories') */
      query: () => CATEGORY_URL,
      providesTags: (result) => providesList(result, 'Categories')
    }),

    addCategories: builder.mutation({
      query: (body) => ({
        url: `${CATEGORY_URL}/add`,
        method: 'POST',
        body: {
          name: body.name,
          slug: body.slug
        }
      }),
      invalidatesTags: [{ type: 'Categories' }]
    })
  })
})

export const { useGetCategoryQuery, useAddCategoriesMutation } = categoryApi
