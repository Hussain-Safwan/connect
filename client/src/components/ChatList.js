import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import "../styles/chatlist.css";
import ChatListHeader from "./ChatListHeader";

function ChatList(props) {
  const [selected, setSelected] = React.useState(0);
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
  props.selectThread(threadList[selected]);

  const trim = (text, limit) => {
    return text.length < limit ? text : text.substring(0, limit) + "...";
  };

  return (
    <div className="list">
      <ChatListHeader contactList={threadList} />
      <List sx={{ width: "100%" }}>
        {threadList.map((item, i) => (
          <ListItem
            onClick={() => {
              setSelected(i);
              // props.selectThread(item);
            }}
            className={i == selected ? "list-item selected-item" : "list-item"}
          >
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.name} secondary={"@" + item.username} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
export default ChatList;
