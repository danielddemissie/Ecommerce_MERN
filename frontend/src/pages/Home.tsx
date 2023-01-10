import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/Card";
import { userAction } from "../redux/slice/user";

export default function Home() {
  const disptach = useDispatch();
  const { data: allUsers, isLoading } = useSelector(
    (state: any) => state.users
  );

  React.useEffect(() => {
    disptach(userAction.loadUsers());
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <div>
          <h2>Loading...</h2>
        </div>
      ) : (
        allUsers.map((user: any, index: number) => (
          <Card key={index} user={user} />
        ))
      )}
    </div>
  );
}
