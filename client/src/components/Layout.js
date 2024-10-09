import * as React from "react";
import ChatList from "./ChatList";
import MessageSpace from "./MessageSpace";
import "../styles/layout.css";

function Layout() {
  const [selected, setSelected] = React.useState({});
  const selectThread = (thread) => {
    setSelected(thread);
    console.log(selected);
  };
  return (
    <div className="layout">
      <ChatList selectThread={selectThread} className="chat-list" />
      <MessageSpace thread={selected} className="msg-space" />
    </div>
  );
}
export default Layout;
