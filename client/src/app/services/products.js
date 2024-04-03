import { api } from './api'
import { providesList } from './api'
const PRODUCTS_URL = '/api/products'

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    allProducts: builder.query({
      query: (body) =>
        body.search === ''
          ? `${PRODUCTS_URL}`
          : `${PRODUCTS_URL}/search/${body.search}`,

      providesTags: (result) => providesList(result, 'Goods')
    }),
    ProductById: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: 'GET'
      }),
      providesTags: (result) =>
        result ? [result, { type: 'Goods' }] : [{ type: 'Goods' }]
    }),
    editProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/edit/${data.id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: [{ type: 'Goods' }]
    }),
    removeProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/remove/${id}`,
        method: 'POST',
        body: { id }
      }),
      invalidatesTags: [{ type: 'Goods' }]
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/add`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: [{ type: 'Goods' }]
    })
  })
})

export const {
  useAllProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useProductByIdQuery,
  useRemoveProductMutation
} = productsApi
