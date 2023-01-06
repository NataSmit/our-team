/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {Member} from '../types/member'

export const getMembers = createAsyncThunk<Member[], undefined, {rejectValue: string}>(
  "members/getMembers",
  async (_, { rejectWithValue }) => {
    
      const myData = await axios.get("https://reqres.in/api/users?per_page=12");

      if (myData.statusText !== "OK") {
        return rejectWithValue("Server Error");
      }

      const result = myData.data.data;
      return result;
  }
);

export const getMemberById = createAsyncThunk<Member, string, {rejectValue: string}>(
  "members/getMemberById",

  async (id, {rejectWithValue}) => {
    
      const data = await axios.get(`https://reqres.in/api/users/${id}`);
      if (data.statusText !== "OK") {
        return rejectWithValue("Server Error");
      }
      const result = data.data.data;
      return result;
    
  }
);

const teamMembers: Member[] = [];
const teamMembersSecondPage: Member[] = [];
type ServerError = null | string |undefined


export const teamMembersSlice = createSlice({
  name: "teamMembers",
  initialState: {
    teamMembers,
    teamMembersSecondPage,
    memberById: {} as Member,
    error: null as ServerError,
  },
  reducers: {
    addMembers(state, action: PayloadAction<Member[]>) {
      state.teamMembers = action.payload;
    },
    addMembersSecondPage(state, action: PayloadAction<Member[]>) {
      state.teamMembersSecondPage = action.payload;
    },
  },
  //extraReducers: {
  //  [getMembers.fulfilled]: (state, action) => {
  //    state.teamMembers = action.payload;
  //  },
  //  [getMembers.rejected]: (state, action) => {
  //    state.error = action.payload;
  //  },
  //  [getMemberById.fulfilled]: (state, action) => {
  //    state.memberById = action.payload;
  //  },
  //  [getMemberById.rejected]: (state, action) => {
  //    state.error = action.payload;
  //  },
  //},
  extraReducers: (builder) => {
    builder
     .addCase(getMembers.fulfilled, (state, action) => {
      state.teamMembers = action.payload
     })
     .addCase(getMembers.rejected, (state, action) => {
       state.error = action.payload;
     })
     .addCase(getMemberById.fulfilled, (state, action) => {
       state.memberById = action.payload;
     })
     .addCase(getMemberById.rejected, (state, action) => {
       state.error = action.payload;
     })
  }
});

export const { addMembers } = teamMembersSlice.actions;
