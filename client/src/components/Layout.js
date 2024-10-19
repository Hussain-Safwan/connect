import * as React from "react";
import ChatList from "./ChatList";
import MessageSpace from "./MessageSpace";
import "../styles/layout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context";
import { get } from "../apiClient";

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

  React.useEffect(() => {
    const fetchThreads = async () => {
      const res = await get(`/threads/${user.username}`);
      if (res.data) {
        setContext((ctx) => ({
          ...ctx,
          threadList: res.data.data,
          selectedThread: res.data.data.length === 0 ? {} : res.data.data[1],
        }));
        localStorage.setItem("connect", JSON.stringify(context));
      }
    };

    if (user) fetchThreads();
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
