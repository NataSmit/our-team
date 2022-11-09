import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {teamMembersSlice} from './teamMembersSlice';

const rootReducer = combineReducers({
  teamMembersSlice: teamMembersSlice.reducer,

})

export const store = configureStore({
  reducer: rootReducer,
})