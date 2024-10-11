import * as React from "react";
import "../styles/msg-space.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import TextField from "@mui/material/TextField";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CancelIcon from "@mui/icons-material/Cancel";

function ChatListHeader({ contactList }) {
  const [openNewModal, setOpenNewModal] = React.useState(false);
  const [openGroupModal, setOpenGroupModal] = React.useState(false);
  const [codeValue, setCodeValue] = React.useState("");
  const [contactUsername, setContactUsername] = React.useState("");
  const [addedContacts, setAddedContacts] = React.useState([]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    p: 4,
  };

  const handleClose = () => setOpenNewModal(false);
  const handleGroupModalClose = () => setOpenGroupModal(false);

  const onCodeValueChange = (e) => {
    setCodeValue(e.target.value);
  };
  const onContactUsernameChange = (e) => {
    setContactUsername(e.target.value);
  };
  const addContact = () => {
    setContactUsername("");
    const index = contactList.findIndex((item) => {
      return item.username === contactUsername;
    });

    if (index !== -1) {
      setAddedContacts([contactList[index], ...addedContacts]);
    }
  };
  const removeContact = (username) => {
    console.log(username);
    const filteredList = addedContacts.filter(
      (item) => item.username !== username
    );
    setAddedContacts(filteredList);
  };
  const submitCode = () => {
    setOpenNewModal(false);
    console.log(codeValue);
  };

  return (
    <div classname="chat-list-header">
      <Modal
        open={openNewModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Contact
          </Typography>
          <br />

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <TextField
              id="outlined-basic"
              label="Enter username"
              variant="outlined"
              onChange={(e) => onCodeValueChange(e)}
            />
            <Button variant="contained" onClick={submitCode}>
              Add
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openGroupModal}
        onClose={handleGroupModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Group Chat
          </Typography>
          <br />

          <div>
            <TextField
              id="outlined-basic"
              label="Enter name of the group"
              variant="outlined"
              onChange={(e) => onCodeValueChange(e)}
            />
          </div>
          <br />
          <div>
            <TextField
              id="outlined-basic"
              label="Enter participant's username"
              variant="outlined"
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

          <Button variant="contained" color="success" onClick={submitCode}>
            Create
          </Button>
        </Box>
      </Modal>

      <div
        style={{
          display: "flex",
          color: "#ccc",
          borderBottom: "1px solid #eee",
          padding: "5px 0",
        }}
      >
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Chats
        </Typography>
        <div>
          <Button
            onClick={() => setOpenNewModal(true)}
            style={{ color: "#333" }}
            toolTip="Add new contact"
          >
            <PersonAddAltIcon color="success" />
          </Button>

          <Button
            onClick={() => setOpenGroupModal(true)}
            style={{ color: "#333" }}
            toolTip="Add new contact"
          >
            <GroupAddIcon color="success" />
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ChatListHeader;
