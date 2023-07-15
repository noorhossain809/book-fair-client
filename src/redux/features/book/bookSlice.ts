import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../../types/globalTypes";


interface IBook{
    book: IProduct[]
}


const initialState : IBook = {
    book: []
}
const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {

    }
})

export default bookSlice.reducer