/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Member, ServerData, ServerError } from "../types/member";

//типизация createAsyncThunk:
//1. тип получаемых данных
//2. тип аргумента, передав. в async func.
//3. типизация ошибки

export const getMembers = createAsyncThunk<
  ServerData,
  number,
  { rejectValue: string }
>("members/getMembers", async (cardsQuantity, { rejectWithValue }) => {
  const myData = await axios.get(
    `https://reqres.in/api/users?per_page=${cardsQuantity}`
  );
  console.log("myData", myData);
  console.log(typeof myData.status)

  if ( myData.status !== 200) {
    return rejectWithValue("Server Error");
  }

  const result = myData.data;
  return result;
});

export const getMemberById = createAsyncThunk<
  Member,
  string,
  { rejectValue: string }
>(
  "members/getMemberById",

  async (id, { rejectWithValue }) => {
    const data = await axios.get(`https://reqres.in/api/users/${id}`);
    if (data.status !== 200) {
      return rejectWithValue("Server Error");
    }
    const result = data.data.data;
    return result;
  }
);

const serverData: ServerData = { data: [], total: 0 };

export const teamMembersSlice = createSlice({
  name: "teamMembers",
  initialState: {
    serverData,
    memberById: {} as Member,
    error: null as ServerError,
  },
  reducers: {
    addMembers(state, action: PayloadAction<ServerData>) {
      state.serverData = action.payload;
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
        state.serverData = action.payload;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getMemberById.fulfilled, (state, action) => {
        state.memberById = action.payload;
      })
      .addCase(getMemberById.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { addMembers } = teamMembersSlice.actions;
