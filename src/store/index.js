import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { teamMembersSlice } from './teamMembersSlice';
import { registeredUsersSlice } from './RegisteredUsersSlice';

const rootReducer = combineReducers({
  teamMembersSlice: teamMembersSlice.reducer,
  registeredUsersSlice: registeredUsersSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
