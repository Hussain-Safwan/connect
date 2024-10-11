import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import "../styles/msg-space.css";

function MessageSpace({ thread, contactList }) {
  const [message, setMessage] = React.useState("");
  const [openGroupModal, setOpenGroupModal] = React.useState(false);
  const [groupName, setGroupName] = React.useState("");
  const [contactUsername, setContactUsername] = React.useState("");
  const [addedContacts, setAddedContacts] = React.useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  let [messageList, setMessageList] = React.useState([]);

  const submitMessage = () => {
    setMessageList((ls) => [...ls, message]);
    setMessage("");
    console.log(messageList);
  };
  const handleGroupModalClose = () => {
    setOpenGroupModal(false);
    setContactUsername("");
    setAddedContacts([]);
  };
  const onContactUsernameChange = (e) => {
    setContactUsername(e.target.value);
  };
  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };
  const addContact = () => {
    setContactUsername("");
    const index = contactList.findIndex((item) => {
      return item.username === contactUsername;
    });

    if (index !== -1) {
      setAddedContacts([contactList[index], ...addedContacts]);
    } else setOpenSnackbar(true);
  };
  const removeContact = (username) => {
    console.log(username);
    const filteredList = addedContacts.filter(
      (item) => item.username !== username
    );
    setAddedContacts(filteredList);
  };
  const submitGroupThread = () => {
    const thread = {
      name: groupName,
      participants: addedContacts,
    };

    console.log(thread);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    p: 4,
  };
  return (
    <div className="msg-space">
      <div className="header" onClick={setOpenGroupModal}>
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

      <Modal
        open={openGroupModal}
        onClose={handleGroupModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            onChange={handleGroupNameChange}
            variant="h6"
            component="h2"
          >
            {thread.name}
          </Typography>
          <br />

          <div className="group-link">
            {"http://www.connect.com/join/23er23"}
          </div>
          <br />
          <div>
            <TextField
              id="outlined-basic"
              label="Enter participant's username"
              variant="standard"
              onChange={(e) => onContactUsernameChange(e)}
            />
            <Button
              variant="outlined"
              onClick={addContact}
              color="success"
              style={{ marginLeft: "20px", marginTop: "10px" }}
            >
              Add
            </Button>
          </div>
          <br />

          <div className="added-contacts">
            <List sx={{ width: "100%" }}>
              {addedContacts.map((item, i) => (
                <ListItem className="list-item">
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name} secondary={item.username} />
                  <CancelIcon
                    color="error"
                    onClick={() => removeContact(item.username)}
                  />
                </ListItem>
              ))}
            </List>
          </div>

          <Button
            variant="contained"
            color="success"
            onClick={submitGroupThread}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
export default MessageSpace;
