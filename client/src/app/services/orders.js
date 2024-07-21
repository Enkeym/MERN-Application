import { api } from './api'
import { providesList } from './api'
const ORDERS_URL = '/api/orders'

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ORDERS_URL,
      providesTags: (result) => providesList(result, 'Orders')
    }),

    getOrdersById: builder.query({
      query: (id) => `${ORDERS_URL}/${id}`,
      providesTags: (result) => providesList(result, 'Orders')
    }),

    addOrders: builder.mutation({
      query: (body) => ({
        url: `${ORDERS_URL}/`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Orders' }]
    }),

    removeOrders: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'Orders' }]
    })
  })
})

export const {
  useGetOrdersQuery,
  useGetOrdersByIdQuery,
  useAddOrdersMutation,
  useRemoveOrdersMutation
} = ordersApi
