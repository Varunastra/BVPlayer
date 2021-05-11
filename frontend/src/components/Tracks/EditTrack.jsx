import React from "react";
import Dialog from "../UI/Dialog/Dialog";
import { useState } from "react";
import TextField from "../UI/TextField/TextField";
import { createTrack, removeTrack } from "../../api/playlist";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylist } from "../../actions/playlist";
import { Spinner } from "../UI/Spinner/Spinner";
import { makeToast } from "../../toasts";

function EditTrack({ isOpen, setIsOpen }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { id } = useSelector((state) => state.playlist.playlist);
  const dispatch = useDispatch();

  const toggleDialog = () => setIsOpen(!isOpen);
  const handleSave = async () => {
    setIsSaving(true);
    const { message, id: trackId } = await createTrack({
      track: { title, artist },
      playlistId: id,
    });
    dispatch(fetchPlaylist(id));
    makeToast({
      message,
      undoAction: async () => {
        await removeTrack({ playlistId: id, trackId });
        dispatch(fetchPlaylist(id));
      },
    });
  };

  return (
    <>
      <Dialog
        title="Edit track"
        open={isOpen}
        handleClose={toggleDialog}
        onSave={handleSave}
      >
        <div className="add-track-container">
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter track name"
          />
          <TextField
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Enter track artist"
          />
        </div>
        <Spinner isLoading={isSaving} />
      </Dialog>
    </>
  );
}

export default EditTrack;
