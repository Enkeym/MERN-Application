import { api } from './api'
const ORDERS_URL = '/api/orders'

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ORDERS_URL,
      providesTags: [{ type: 'Orders', id: 'LIST' }]
    }),

    getOrdersById: builder.query({
      query: (id) => `${ORDERS_URL}/${id}`,
      providesTags: (result) =>
        result ? [{ type: 'Orders', id: result.id }] : ['Orders']
    }),

    addOrders: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}`,
        method: 'POST',
        body: order
      }),
      invalidatesTags: ['Orders']
    }),

    removeOrders: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: 'POST'
      }),
      invalidatesTags: ['Orders']
    })
  })
})

export const {
  useGetOrdersQuery,
  useGetOrdersByIdQuery,
  useAddOrdersMutation,
  useRemoveOrdersMutation
} = ordersApi
