import React from "react";
import Dialog from "../UI/Dialog/Dialog";
import AddItem from "../AddItem";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { duplicatePlaylist, removePlaylist } from "../../api/playlist";
import { makeToast } from "../../toasts";
import TextField from "../UI/TextField/TextField";
import { fetchPlaylists } from "../../actions/playlists";

function DuplicatePlaylist() {
  const playlist = useSelector((state) => state.playlists.current);
  const dispatch = useDispatch();

  const [name, setName] = useState(playlist.name);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDuplicate = async () => {
    const { message, id: createdId } = await duplicatePlaylist({
      id: playlist.id,
      newName: name,
    });
    dispatch(fetchPlaylists("me"));
    makeToast({
      undoAction: async () => {
        await removePlaylist(createdId);
        dispatch(fetchPlaylists("me"));
      },
      message,
    });
    setIsDialogOpen(false);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleOpen = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <AddItem title="Duplicate playlist" onAdd={handleOpen} icon="copy" />
      <Dialog
        title="Duplicate playlist"
        open={isDialogOpen}
        handleClose={handleClose}
        onSave={handleDuplicate}
      >
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new name"
        />
      </Dialog>
    </>
  );
}

export default DuplicatePlaylist;
