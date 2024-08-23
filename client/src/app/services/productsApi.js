import { api } from './api'
import { providesList } from './api'
const PRODUCTS_URL = '/api/products'

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    allProducts: builder.query({
      query: (query) => ({
        url: `${PRODUCTS_URL}`,
        params: query
      }),
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
    myProducts: builder.query({
      query: ({ userId, page, pageSize }) => ({
        url: `${PRODUCTS_URL}/my/${userId}`,
        params: { page, pageSize }
      }),
      providesTags: (result) => providesList(result, 'Goods')
    }),
    editProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${PRODUCTS_URL}/edit/${id}`,
        method: 'PUT',
        body: formData
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
      query: (formData) => ({
        url: `${PRODUCTS_URL}/add`,
        method: 'POST',
        body: formData
      }),
      invalidatesTags: [{ type: 'Goods', id: 'LIST' }]
    })
  })
})

export const {
  useAllProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useProductByIdQuery,
  useRemoveProductMutation,
  useMyProductsQuery
} = productsApi
