import * as React from "react";
import "../styles/login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
  return (
    <div className="login">
      <div className="box">
        <h1>
          Welcome to <span>Connect</span>
        </h1>
        <div className="login-box">
          <TextField
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            className="textbox"
            //   onChange={(e) => onCodeValueChange(e)}
          />
        </div>
        <br />
        <div className="login-box">
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            className="textbox"
            //   onChange={(e) => onCodeValueChange(e)}
          />
        </div>
        <br />
        <div className="login-box">
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            className="textbox"
            //   onChange={(e) => onCodeValueChange(e)}
          />
        </div>{" "}
        <br />
        <div className="login-footer">
          <Button variant="outlined" color="success">
            Go to Login
          </Button>
          <Button variant="contained" color="success">
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Login;
