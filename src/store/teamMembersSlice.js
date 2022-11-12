import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getMembers = createAsyncThunk(
  'members/getMembers',
  async function (_, {rejectWithValue}) {
    try {
      const myData = await axios.get('https://reqres.in/api/users')
      console.log('myData', myData.statusText)
      if (myData.statusText !== 'OK') {
        throw new Error('Server Error');
      }
      const result = myData.data.data;
      return result
    } catch(err) {
      return rejectWithValue(err)
    }
  }
)

export const getMemberById = createAsyncThunk(
  'members/getMemberById',

  async function (id, rejectWithValue) {
    try {
      const data = await axios.get('https://reqres.in/api/users/' + id)
      if (data.statusText !== 'OK') {
        throw new Error('Server Error');
      }
      const result = data.data.data;
      return result
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const teamMembersSlice = createSlice({
  name: 'teamMembers',
  initialState: {
    teamMembers: [],
    memberById: {},
    error: null,
  },
  reducers: {
    addMembers(state, action) {
       state.teamMembers = action.payload
    }
  },
  extraReducers: {
    [getMembers.fulfilled]: (state, action) => {
      state.teamMembers = action.payload;
    },
    [getMembers.rejected]: (state, action) => {
      state.error = action.payload
    },
    [getMemberById.fulfilled]: (state, action) => {
      state.memberById = action.payload;
    },
    [getMemberById.rejected]: (state, action) => {
      state.error = action.payload
    },
  }
})

export const {addMembers} = teamMembersSlice.actions;