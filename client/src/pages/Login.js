import * as React from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { MyContext } from "../context";

function Login() {
  const navigate = useNavigate();
  const { context, setContext } = React.useContext(MyContext);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const submit = () => {
    const login = async () => {
      const res = await axios.post("http://localhost:4000/api/login/", {
        username,
        password,
      });

      if (res.data.success) {
        const { user, threadList } = res.data.data;
        setContext({
          user: user,
          threadList: threadList,
          selectedThread: threadList.length === 0 ? null : threadList[0],
        });
        navigate("/");
      } else {
        console.log(res.data.message);
      }
    };

    login();
  };

  return (
    <div className="login">
      <div className="box">
        <h1>
          Welcome to <span>Connect</span>
        </h1>
        <div className="login-box">
          <TextField
            id="outlined-basic"
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
            id="outlined-basic"
            label="Password"
            variant="outlined"
            className="textbox"
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
          <Button variant="contained" color="success" onClick={submit}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Login;
