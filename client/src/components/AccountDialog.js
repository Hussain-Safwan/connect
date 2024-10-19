import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { MyContext } from "../context";
import { useNavigate } from "react-router-dom";

const AccountDialog = ({ open, handleClose }) => {
  const { context, setContext } = React.useContext(MyContext);
  const { user } = context;
  const navigate = useNavigate();
  const logout = () => {
    setContext({ user: null, threadList: [], selectedThread: null });
    localStorage.removeItem("connect");
    navigate("/login");
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>User Account</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar src={`https://robohash.org/${user.username}`} />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={`@${user.username}`} />
          </ListItemButton>
        </ListItem>
      </List>
      <div
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span></span>
        <Button variant="outlined" color="error" onClick={logout}>
          Logout
        </Button>
      </div>
    </Dialog>
  );
};

export default AccountDialog;
