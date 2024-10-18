import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import SendIcon from "@mui/icons-material/Send";

import "../styles/msg-space.css";
import { MyContext } from "../context";
import { useNavigate } from "react-router-dom";
import { get, post, put } from "../apiClient";
import AccountDialog from "./AccountDialog";
import { socket } from "../apiClient";

function MessageSpace() {
  const { context, setContext } = React.useContext(MyContext);
  const { user, threadList, selectedThread } = context;
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [openGroupModal, setOpenGroupModal] = React.useState(false);
  const [contactUsername, setContactUsername] = React.useState("");
  const [addedContacts, setAddedContacts] = React.useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openAccountDialog, setOpenAccountDialog] = React.useState(false);
  React.useEffect(() => {
    if (selectedThread) {
      setAddedContacts([...selectedThread.participants]);
    }
  }, [selectedThread]);

  React.useEffect(() => {
    socket.on("message", (thread) => {
      console.log(thread);
      if (
        thread.messages[thread.messages.length - 1].sender.username ===
        user.username
      )
        return;
      let tempList = threadList.filter(
        (item) => item._id !== selectedThread._id
      );

      setContext((ctx) => ({
        ...ctx,
        threadList: [thread, ...tempList],
        selectedThread: thread,
      }));
    });
  }, []);

  const msgRef = React.useRef(null);
  const scroll = () => {
    msgRef.current.scrollIntoView(false);
  };

  React.useEffect(() => {
    if (msgRef.current) scroll();
  }, [selectedThread.messages]);

  const submitMessage = async () => {
    socket.emit("message", {
      threadId: selectedThread._id,
      userId: user._id,
      content: message,
    });
    let tempList = threadList.filter((item) => item._id !== selectedThread._id);
    const tempThread = selectedThread;
    tempThread.messages.push({ sender: user, content: message });
    setContext((ctx) => ({
      ...ctx,
      threadList: [tempThread, ...tempList],
      selectedThread: tempThread,
    }));
    setMessage("");
  };

  const handleGroupModalClose = () => {
    setOpenGroupModal(false);
    setContactUsername("");
  };

  const onContactUsernameChange = (e) => {
    setContactUsername(e.target.value);
  };

  const addContact = () => {
    const index = threadList.findIndex((item) => {
      return (
        item.participants.length === 1 &&
        item.participants[0].username === contactUsername
      );
    });

    if (
      index !== -1 &&
      addedContacts.findIndex((item) => item.username === contactUsername) ===
        -1
    ) {
      console.log(threadList[index].participants);
      setAddedContacts([threadList[index].participants[0], ...addedContacts]);
    } else setOpenSnackbar(true);
    setContactUsername("");
  };
  const removeContact = (username) => {
    const filteredList = addedContacts.filter(
      (item) => item.username !== username
    );
    setAddedContacts(filteredList);
  };

  const editGroupThread = async () => {
    const thread = {
      groupId: selectedThread._id,
      participants: addedContacts,
    };

    const res = await put("/group", {
      thread,
      userId: user._id,
    });

    if (res.data) {
      const index = threadList.findIndex(
        (item) => item._id === selectedThread._id
      );
      const tempThreadList = threadList;
      tempThreadList[index] = res.data.data;
      setContext((ctx) => ({
        ...ctx,
        threadList: tempThreadList,
        selectedThread: res.data.data,
      }));
      handleGroupModalClose();
    }
  };

  const leaveGroup = async () => {
    const res = await get(`/leave/${selectedThread._id}/${user.username}`);

    if (res.data) {
      const tempList = threadList.filter(
        (item) => item._id !== selectedThread._id
      );
      setContext((ctx) => ({
        ...ctx,
        threadList: tempList,
        selectedThread: tempList.length === 0 ? null : tempList[0],
      }));

      handleGroupModalClose();
    }
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

  const formatDate = (date) => {
    date = new Date(date);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const month = date
      .toLocaleString("default", { month: "long" })
      .substring(0, 3);
    const day = date.getDate();

    return `${hours}:${minutes.toString().padStart(2, "0")}, ${month} ${day}`;
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="msg-space">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Username not found on your list of contacts"
      />
      <AccountDialog
        open={openAccountDialog}
        handleClose={() => setOpenAccountDialog(false)}
      />
      <div className="header">
        <List sx={{ width: "100%" }}>
          {selectedThread && (
            <ListItem className="">
              <ListItemAvatar>
                <Avatar
                  src={`https://robohash.org/${selectedThread.participants[0].username}`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  selectedThread.owner ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (selectedThread.owner) setOpenGroupModal(true);
                      }}
                    >
                      {selectedThread.name}
                    </span>
                  ) : (
                    selectedThread.participants[0].name
                  )
                }
                secondary={
                  selectedThread.owner ? (
                    <span>
                      {selectedThread.participants.length + 1 + " people"}
                      <span className="group-token">
                        {"@" + selectedThread.token}
                      </span>
                    </span>
                  ) : (
                    "@" + selectedThread.participants[0].username
                  )
                }
              />
            </ListItem>
          )}
        </List>
        <Avatar
          className="logout-btn"
          src={`https://robohash.org/${user.username}`}
          onClick={() => setOpenAccountDialog(true)}
        />
      </div>

      {selectedThread ? (
        <>
          <div className="messages">
            {selectedThread.messages.map((item, i) =>
              item.sender.username !== user.username ? (
                <>
                  <div className="message left" ref={msgRef}>
                    <div className="message-header">
                      <strong>{"@" + item.sender.username}</strong>
                      <span>{formatDate(item.sendingTime)}</span>
                    </div>
                    {item.content}
                  </div>
                  <br />
                </>
              ) : (
                <>
                  <div style={{ display: "flex" }}>
                    <span />
                    <div ref={msgRef} className="message right">
                      {item.content}
                      <div className="message-header">
                        <strong></strong>
                        <span style={{ color: "#fff" }}>
                          {formatDate(item.sendingTime)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )
            )}
          </div>

          <div className="footer">
            <div className="msg-box">
              <input
                className="msg-text"
                value={message}
                placeholder="Type your message here"
                onChange={(e) => setMessage(e.target.value)}
              />

              <Button
                variant="contained"
                color="success"
                onClick={submitMessage}
                style={{ borderRadius: "20px" }}
                disabled={message === ""}
              >
                <SendIcon />
              </Button>
            </div>
          </div>
          <Modal
            open={openGroupModal}
            onClose={handleGroupModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {selectedThread.name}
              </Typography>
              <br />

              {selectedThread.owner &&
                selectedThread.owner.username === user.username && (
                  <>
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
                              <Avatar
                                src={`https://robohash.org/${item.username}`}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={item.name}
                              secondary={item.username}
                            />
                            <CancelIcon
                              color="error"
                              onClick={() => removeContact(item.username)}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </div>
                  </>
                )}

              {selectedThread.owner &&
              selectedThread.owner.username === user.username ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={editGroupThread}
                >
                  Save Changes
                </Button>
              ) : (
                <Button variant="contained" color="error" onClick={leaveGroup}>
                  Leave Group
                </Button>
              )}
            </Box>
          </Modal>
        </>
      ) : (
        <p style={{ textAlign: "center", marginTop: "50px", color: "#aaa" }}>
          Please select a conversation to view messages
        </p>
      )}
    </div>
  );
}
export default MessageSpace;
