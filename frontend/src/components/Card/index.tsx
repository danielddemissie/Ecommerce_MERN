import React from "react";

export default function Card(props: { user: any }) {
  return (
    <div
      style={{
        border: "1px solid #000",
        width: 400,
        height: 300,
        borderRadius: 10,
        textAlign: "center",
        margin: "10px auto",
        padding: 20,
      }}
    >
      <h1>{props.user.name}</h1>
      <h2>{props.user.username}</h2>
      <h3>{props.user.email}</h3>
    </div>
  );
}
