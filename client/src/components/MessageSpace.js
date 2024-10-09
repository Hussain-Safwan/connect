import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import Button from "@mui/material/Button";
import "../styles/msg-space.css";

function MessageSpace({ thread }) {
  const [message, setMessage] = React.useState("");
  let [messageList, setMessageList] = React.useState([]);

  const submitMessage = () => {
    setMessageList((ls) => [...ls, message]);
    setMessage("");
    console.log(messageList);
  };

  return (
    <div className="msg-space">
      <div className="header">
        <List sx={{ width: "100%" }}>
          <ListItem className="">
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={thread.name} secondary="2w34ee" />
          </ListItem>
        </List>
        <Button color="error" variant="outlined" className="logout-btn">
          Logout
        </Button>
      </div>

      <div className="messages">
        {messageList.map((item, i) =>
          i % 2 == 0 ? (
            <div className="message left">{item}</div>
          ) : (
            <div style={{ display: "flex" }}>
              <span />
              <div className="message right">{item}</div>
            </div>
          )
        )}
      </div>

      <div className="footer">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" color="success" onClick={submitMessage}>
          Send
        </Button>
      </div>
    </div>
  );
}
export default MessageSpace;
