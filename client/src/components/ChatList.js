import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import "../styles/chatlist.css";
import ChatListHeader from "./ChatListHeader";
import { MyContext } from "../context";

function ChatList() {
  const { context, setContext } = React.useContext(MyContext);
  const { user, threadList, selectedThread } = context;

  return (
    <div className="list">
      <ChatListHeader />
      {threadList.length < 1 ? (
        <p className="alert-msg">No conversations found</p>
      ) : (
        <List sx={{ width: "100%" }}>
          {threadList.map((item, i) => (
            <ListItem
              onClick={() => {
                setContext((ctx) => ({
                  ...ctx,
                  selectedThread: threadList[i],
                }));
              }}
              className={
                JSON.stringify(item) == JSON.stringify(selectedThread)
                  ? "list-item selected-item"
                  : "list-item"
              }
            >
              <ListItemAvatar>
                <Avatar
                  src={`https://robohash.org/${threadList[i].participants[0].username}`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.owner ? item.name : item.participants[0].name}
                secondary={
                  item.owner
                    ? item.participants.length + 1 + " people"
                    : "@" + item.participants[0].username
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}
export default ChatList;
