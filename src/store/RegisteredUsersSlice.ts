import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {RegisteredUser} from '../types/registeredUser'

export const register = createAsyncThunk<string, {mail: string, password: string}, {rejectValue: string}>(
  'user/register',
  async (params, { rejectWithValue, dispatch }) => {
    const { mail, password } = params;
    
      const res = await axios.post('https://reqres.in/api/register', {
        email: mail,
        password,
      });
      console.log(res.data.token);
      if (res.statusText !== 'OK') {
        return rejectWithValue('Server Error');
      } else {
        dispatch(addUser({ mail, password }));
      }
      return res.data.token;
  },

);

type InitialState = {
  registeredUsers: RegisteredUser[],
  token: string,
  registrationError: null | string | undefined
}

const initialState: InitialState = {
  registeredUsers: [],
  token: '',
  registrationError: null,
}

export const registeredUsersSlice = createSlice({
  name: 'registeredUsers',
  initialState,
  reducers: {
    addUser(state, action) {
      state.registeredUsers.push(action.payload);
    },
  },
  //extraReducers: {
  //  [register.fulfilled]: (state, action) => {
  //    state.token = action.payload;
  //  },
  //  [register.rejected]: (state, action) => {
  //    state.registrationError = action.payload;
  //  },
  //},
  extraReducers: (builder) => {
    builder
    .addCase(register.fulfilled, (state, action) => {
      state.token = action.payload;
    })
    .addCase(register.rejected, (state, action) => {
      state.registrationError = action.payload;
    })
  }
});

export const { addUser } = registeredUsersSlice.actions;
