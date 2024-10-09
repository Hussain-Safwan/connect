import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import "../styles/msg-space.css";

function MessageSpace() {
  return (
    <div className="msg-space">
      <div className="header" style={{ borderBottom: "1px solid #eee" }}>
        <List sx={{ width: "100%" }}>
          <ListItem className="">
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
          </ListItem>
        </List>
      </div>
    </div>
  );
}
export default MessageSpace;
