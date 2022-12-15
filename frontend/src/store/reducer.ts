import { combineReducers } from "@reduxjs/toolkit";
import { InjectedReducersType } from "../utils/types/index";

export function createReducer(injectedReducers: InjectedReducersType = {}) {
  if (Object.keys(injectedReducers).length === 0) {
    return (state: any) => state;
  } else {
    return combineReducers({
      ...injectedReducers,
    });
  }
}
