import React from "react";
import Dialog from "../UI/Dialog/Dialog";
import { useState } from "react";
import TextField from "../UI/TextField/TextField";
import { removePlaylist, createPlaylist } from "../../api/playlist";
import { useDispatch } from "react-redux";
import { fetchPlaylists } from "../../actions/playlists";
import AddItem from "../AddItem";
import { makeToast } from "../../toasts";

function NewPlaylist() {
  const [name, setName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleSave = async () => {
    if (name.length) {
      const { message, id } = await createPlaylist({ name });
      dispatch(fetchPlaylists("me"));
      makeToast({
        undoAction: async () => {
          await removePlaylist(id);
          dispatch(fetchPlaylists("me"));
        },
        message,
      });
    }
  };

  return (
    <>
      <AddItem title="Add new playlist" onAdd={handleOpen} />
      <Dialog
        variant="form"
        title="Add new playlist"
        open={isDialogOpen}
        handleClose={handleClose}
        onSave={handleSave}
      >
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter playlist name"
        />
      </Dialog>
    </>
  );
}

export default NewPlaylist;
