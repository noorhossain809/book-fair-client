/* eslint-disable @typescript-eslint/restrict-template-expressions */
// import { api } from "../../api/apiSlice";

import { IProduct } from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
    endpoints: (builder) => ({
        
        addBook: builder.mutation({
            query: (data: IProduct) => ({
                url: '/book/create-book',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['books']
        }),
        getBooks: builder.query({
            query: () => ({
                url: '/book'
            }),
            providesTags: ['books']
        }),
        getSingleBook: builder.query({
            query: (id) => ({
                url: `/book/${id}`
            }),
        }),
    })
})

export const {useGetBooksQuery, useAddBookMutation, useGetSingleBookQuery} = bookApi

