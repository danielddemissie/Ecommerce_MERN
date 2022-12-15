import { createSlice } from "../../utils/@reduxjs";
import { useInjectReducer, useInjectSaga } from "../../utils/redux-injectors";
import { LandingPageSaga } from "../saga/home";
import { HomePageState } from "../../types/home";

export const initialState: HomePageState = {};

const slice = createSlice({
  name: "homePageState",
  initialState,
  reducers: {
    act: () => {
      console.log("object");
    },
  },
});

export const { actions: HomePageAction } = slice;

export const useHomepageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: LandingPageSaga });
  return { actions: slice.actions };
};
