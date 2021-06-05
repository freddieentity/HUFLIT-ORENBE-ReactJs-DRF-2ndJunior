import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

function NotFoundPrivateRoute() {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <img
        alt=""
        src={`https://cdn.dribbble.com/users/1285629/screenshots/3582584/4041.gif`}
        widh="100%"
      />
      <Link
        to="/login"
        style={{
          margin: "0",
          position: "absolute",
          top: "50%",
          width: "102px",
          height: "50px",
        }}
      >
        <Button style={{ borderRadius: "25px", border: "1px solid black" }}>
          Login
        </Button>
      </Link>
    </div>
  );
}

export default NotFoundPrivateRoute;
