import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loadUsers: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    loadUsersSuccess: (state, action) => {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    },
    loadUsersError: (state) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    },
  },
});

export const { actions: userAction, name: userSliceName } = userSlice;
export default userSlice.reducer;
