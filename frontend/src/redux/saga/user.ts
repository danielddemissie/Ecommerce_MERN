import { call, takeEvery, put } from "redux-saga/effects";
import { userAction } from "../slice/user";
import { AxiosAPI } from "../../config";
import { AxiosResponse } from "axios";

function* loadUsers() {
  try {
    let response: AxiosResponse = yield call(() =>
      AxiosAPI({ url: "https://jsonplaceholder.typicode.com/users" })
    );
    if (response.status === 200) {
      yield put(userAction.loadUsersSuccess(response.data));
    }
  } catch (e) {
    yield put(userAction.loadUsersError());
    yield console.log("Error ---> ", e);
  }
}

export default function* userSaga() {
  yield takeEvery(userAction.loadUsers.type, loadUsers);
}
