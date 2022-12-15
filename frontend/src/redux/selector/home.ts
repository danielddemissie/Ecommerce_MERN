import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../types";
import { initialState } from "../slice/home";

const selectSlice = (state: RootState) => state.homePageState || initialState;

export const selectHomePage = createSelector([selectSlice], (state) => state);
