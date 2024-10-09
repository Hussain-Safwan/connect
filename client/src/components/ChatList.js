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
      lastMessage: "Will reach by tomorrow",
      sender: "Me",
    },
    {
      name: "Manha Hayder",
      lastMessage: "Will reach by tomorrow",
      sender: "Me",
    },
    {
      name: "Aisha Irrina",
      lastMessage: "Will reach by tomorrow",
      sender: "Me",
    },
    {
      name: "Mahbeen Hayder",
      lastMessage: "Will reach by tomorrow",
      sender: "Me",
    },
    {
      name: "Miqdaad Abdullah",
      lastMessage: "Will reach by tomorrow",
      sender: "Me",
    },
  ]);
  props.selectThread(threadList[0]);

  const trim = (text, limit) => {
    return text.length < limit ? text : text.substring(0, limit) + "...";
  };

  return (
    <div className="list">
      <ChatListHeader />
      <List sx={{ width: "100%" }}>
        {threadList.map((item, i) => (
          <ListItem
            onClick={() => {
              setSelected(i);
              props.selectThread(item);
            }}
            className={i == selected ? "list-item selected-item" : "list-item"}
          >
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={trim(item.lastMessage, 10)}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
export default ChatList;
