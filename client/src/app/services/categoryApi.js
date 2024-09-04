import { api } from './api'
import { providesList } from './api'
const CATEGORY_URL = '/api/category'

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => CATEGORY_URL,
      providesTags: (result) => providesList(result, 'Categories')
    }),

    getCategoryById: builder.query({
      query: (body) => `${CATEGORY_URL}/${body.category}/products`,
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
    }),

    removeCategories: builder.mutation({
      query: (body) => ({
        url: `${CATEGORY_URL}/remove`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Categories' }]
    })
  })
})

export const {
  useGetCategoryQuery,
  useAddCategoriesMutation,
  useGetCategoryByIdQuery
} = categoryApi
