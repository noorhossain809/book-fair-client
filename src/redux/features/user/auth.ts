/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../store'


export interface User {
  email: string
  password: string
}

export interface UserResponse {
  user: User
  token: string
}

export interface LoginRequest {
  email: string
  password: string
}

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://book-fair-backend.vercel.app/api/v1/auth',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.accessToken
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
            query: (data) => ({
                url: '/signup',
                method: 'POST',
                body: data
            })
        }),
    // login: builder.mutation<UserResponse, LoginRequest>({
    //   query: (credentials) => ({
    //     url: '/login',
    //     method: 'POST',
    //     body: credentials,
    //   }),
    // }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  }),
})

export const { useProtectedMutation, useCreateUserMutation  } = authApi