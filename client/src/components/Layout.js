import * as React from "react";
import ChatList from "./ChatList";
import MessageSpace from "./MessageSpace";
import "../styles/layout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context";

function Layout() {
  axios.defaults.withCredentials = true;
  const { context, setContext } = React.useContext(MyContext);
  const { user, threadList, selectedThread } = context;
  const navigate = useNavigate();

  if (user == null) navigate("/login");

  return (
    <div className="layout">
      <ChatList className="chat-list" />
      {threadList.length < 1 ? (
        <div>No conversation thread selected</div>
      ) : (
        <MessageSpace className="msg-space" />
      )}
    </div>
  );
}
export default Layout;
