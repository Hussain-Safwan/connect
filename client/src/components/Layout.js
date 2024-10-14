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

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <div className="layout">
      {user && (
        <>
          <ChatList className="chat-list" />
          <MessageSpace className="msg-space" />
        </>
      )}
    </div>
  );
}
export default Layout;
