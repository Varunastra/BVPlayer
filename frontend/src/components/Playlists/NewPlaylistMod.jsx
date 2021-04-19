import React from "react";
import Dialog from "../UI/Dialog/Dialog";
import { useState } from "react";
import TextField from "../UI/TextField/TextField";
import { removePlaylist, createPlaylist } from "../../api/playlist";
import { useDispatch } from "react-redux";
import { fetchPlaylists } from "../../actions/playlists";
import { makeToast } from "../../toasts";
import { PlusOutlined } from "@ant-design/icons";

function NewPlaylistMod() {
  const [name, setName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleDialog = () => setIsDialogOpen((isOpen) => !isOpen);

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
      <div className="playlist-mod new" onClick={toggleDialog}>
        <PlusOutlined />
        Create new playlist
      </div>
      <Dialog
        variant="form"
        title="Add new playlist"
        open={isDialogOpen}
        handleClose={toggleDialog}
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

export default NewPlaylistMod;
