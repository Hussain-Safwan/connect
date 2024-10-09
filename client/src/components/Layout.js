import * as React from "react";
import ChatList from "./ChatList";
import MessageSpace from "./MessageSpace";
import "../styles/layout.css";

function Layout() {
  return (
    <div className="layout">
      <ChatList className="chat-list" />
      <MessageSpace className="msg-space" />
    </div>
  );
}
export default Layout;
