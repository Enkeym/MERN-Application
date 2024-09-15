import { api } from './api'

const CART_URL = '/api/cart'

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => CART_URL,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Cart', id })),
              { type: 'Cart', id: 'LIST' }
            ]
          : [{ type: 'Cart', id: 'LIST' }]
    }),

    addToCart: builder.mutation({
      query: (item) => ({
        url: `${CART_URL}/add`,
        method: 'POST',
        body: item
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
    }),

    removeFromCart: builder.mutation({
      query: (productID) => ({
        url: `${CART_URL}/remove/${productID}`,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
    }),

    editCartQuantity: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `${CART_URL}/edit/${productId}`,
        method: 'POST',
        body: { quantity }
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
    })
  })
})

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useEditCartQuantityMutation
} = cartApi
