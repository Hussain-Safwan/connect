import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import "../styles/chatlist.css";
import ChatListHeader from "./ChatListHeader";

function ChatList() {
  const [selected, setSelected] = React.useState(0);

  return (
    <div className="list">
      <ChatListHeader />
      <List sx={{ width: "100%" }}>
        {Array(10)
          .fill(0)
          .map((item, i) => (
            <ListItem
              onClick={() => setSelected(i)}
              className={
                i == selected ? "list-item selected-item" : "list-item"
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
          ))}
      </List>
    </div>
  );
}
export default ChatList;
