import * as React from "react";
import ChatList from "./ChatList";
import MessageSpace from "./MessageSpace";
import "../styles/layout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Layout() {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();
  const [threadList, setThreadList] = React.useState([
    {
      name: "Hussain Ifsan",
      username: "hussain_ifsan",
      sender: "Me",
      avatarUrl: "https://robohash.org/",
    },
    {
      name: "Manha Hayder",
      username: "snod010",
      sender: "Me",
      avatarUrl: "https://robohash.org/",
    },
    {
      name: "Aisha Irrina",
      username: "irrina2007",
      sender: "Me",
      avatarUrl: "https://robohash.org/",
    },
    {
      name: "Mahbeen Hayder",
      username: "_squeen_",
      sender: "Me",
      avatarUrl: "https://robohash.org/",
    },
    {
      name: "Miqdaad Abdullah",
      username: "saifUllah",
      sender: "Me",
      avatarUrl: "https://robohash.org/",
    },
  ]);
  React.useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("http://localhost:4000/api/user");

      // if (!res.data) {
      //   navigate("/login");
      // } else {
      //   setUser(res.data.data);
      // }
      console.log(res.data);
    };

    getUser();
  }, []);

  const [selected, setSelected] = React.useState({});
  const selectThread = (thread) => {
    setSelected(thread);
  };
  return (
    <div className="layout">
      <ChatList
        selectThread={selectThread}
        threadList={threadList}
        className="chat-list"
      />
      <MessageSpace
        thread={selected}
        threadList={threadList}
        className="msg-space"
      />
    </div>
  );
}
export default Layout;
