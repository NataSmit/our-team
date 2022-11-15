import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk(
  'user/register',
  async (params, { rejectWithValue, dispatch }) => {
    const { mail, password } = params;
    try {
      const res = await axios.post('https://reqres.in/api/register', {
        email: mail,
        password,
      });
      console.log(res.data.token);
      if (res.statusText !== 'OK') {
        throw new Error('Server Error');
      } else {
        dispatch(addUser({ mail, password }));
      }
      return res.data.token;
    } catch (err) {
      console.log(err.response.statusText);
      return rejectWithValue(err.response.statusText);
    }
  },

);

export const registeredUsersSlice = createSlice({
  name: 'registeredUsers',
  initialState: {
    registeredUsers: [],
    token: '',
    registrationError: null,
  },
  reducers: {
    addUser(state, action) {
      state.registeredUsers.push(action.payload);
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.token = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.registrationError = action.payload;
    },
  },
});

export const { addUser } = registeredUsersSlice.actions;
