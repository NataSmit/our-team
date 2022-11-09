import {createSlice} from '@reduxjs/toolkit';

export const teamMembersSlice = createSlice({
  name: 'teamMembers',
  initialState: {
    teamMembers: [],
  },
  reducers: {
    addMembers(state, action) {
       state.teamMembers = action.payload
    }
  }
})

export const {addMembers} = teamMembersSlice.actions;