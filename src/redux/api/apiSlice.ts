import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'


export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1',
        prepareHeaders: (headers, {getState}) => {
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

