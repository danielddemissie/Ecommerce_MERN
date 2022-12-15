import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectHomePage } from "../redux/selector/home";
import { useHomepageSlice } from "../redux/slice/home";

export default function Home() {
  const { actions } = useHomepageSlice();
  const dispatch = useDispatch();
  const homepageState = useSelector(selectHomePage);

  React.useEffect(() => {
    dispatch(actions.act());
    console.log(homepageState);
  }, []);

  return <div>Home </div>;
}
