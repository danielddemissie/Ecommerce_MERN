import { takeLatest } from "redux-saga/effects";
import { HomePageAction as actions } from "../slice/home";

function* handleFetchFilterValues() {
  try {
    yield console.log("");
  } catch (error) {
    yield console.log("object");
  }
}

export function* LandingPageSaga() {
  yield takeLatest(actions.act.type, handleFetchFilterValues);
}
