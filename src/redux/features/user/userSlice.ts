/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IUserState {
  user: {};
  isLoading: boolean;
  isError: boolean;
  error: string | null;
   accessToken: string | null
}

interface ICredential {
  email: string;
  password: string;
}

const initialState: IUserState = {
  user: {},
  isLoading: false,
  isError: false,
  error: null,
   accessToken: null 
};

const baseUrl = 'https://book-fair-backend.vercel.app/api/v1/auth'
// const url = 'http://localhost:5000/api/v1/auth'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async({email, password}: ICredential) => {
   
    const request = await axios.post(`${baseUrl}/login`, {email, password})
    const response = await request.data
    // localStorage.setItem('user', JSON.stringify(response))
    return response
  }
)

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async(id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response
  }
)

const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    //   setUser: (state, action: PayloadAction<string | null>) => {
    //   state.user = action.payload;
    // },
    },
    extraReducers: (builder) => {
      builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload
        state.error = null;
        // state.user.email = action.payload
        console.log('action', action.payload);
        state.accessToken= action.payload.data.accessToken
        window.localStorage.setItem('token', action.payload.data.accessToken)
        window.location.reload()
    
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if(action.error.message === 'Request failed with status code 401'){
          state.error = 'Access Denied! Invalid credentials';
        }else{
          state.error = action.error.message!;
          // toast.error('Access Denied! Invalid credentials');
        }
        
      })
       // user fetch
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
       // console.log('user:', state.user)
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message!
        // console.log('FetchUser Rejected:', action.error)
       // toast.error((t) => <ToastContent message={action.error.message} />)
      })
    },
})

export default userSlice.reducer
