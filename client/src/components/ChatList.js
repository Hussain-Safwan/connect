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

  props.selectThread(props.threadList[selected]);

  const trim = (text, limit) => {
    return text.length < limit ? text : text.substring(0, limit) + "...";
  };

  return (
    <div className="list">
      <ChatListHeader contactList={props.threadList} />
      <List sx={{ width: "100%" }}>
        {props.threadList.map((item, i) => (
          <ListItem
            onClick={() => {
              setSelected(i);
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
