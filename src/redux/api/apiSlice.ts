import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://book-fair-backend.vercel.app/api/v1',
        prepareHeaders: (headers) => {
            const token = window.localStorage.getItem('token')
            console.log('token from api', token)

            if(token){
                headers.set("authorization", String(token))
            }
            return headers
        }
    }),
    tagTypes: ['books'],
    endpoints: () => ({})
})

