import * as React from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

import { MyContext } from "../context";
import { post } from "../apiClient";

function Login() {
  const navigate = useNavigate();
  const { context, setContext } = React.useContext(MyContext);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const submit = async () => {
    try {
      const res = await post("/login/", {
        username,
        password,
      });

      const { user, threadList } = res.data.data;
      const ctx = {
        user: user,
        threadList: threadList,
        selectedThread: threadList.length === 0 ? null : threadList[0],
      };
      localStorage.setItem("connect", JSON.stringify(ctx));
      setContext(ctx);
      navigate("/");
    } catch (error) {
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="login">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Invalid username or passowrd"
      />
      <div className="box">
        <h1>
          Welcome to <span>Connect</span>
        </h1>
        <div className="login-box">
          <TextField
            label="Username"
            variant="outlined"
            className="textbox"
            value={username}
            onChange={(e) => onUsernameChange(e)}
          />
        </div>
        <br />
        <div className="login-box">
          <TextField
            label="Password"
            variant="outlined"
            className="textbox"
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e)}
          />
        </div>{" "}
        <br />
        <div className="login-footer">
          <Button
            variant="outlined"
            color="success"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={submit}
            disabled={username === "" || password === ""}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Login;
