import React from "react";
import Dialog from "../UI/Dialog/Dialog";
import { useState } from "react";
import TextField from "../UI/TextField/TextField";
import { createTrack, removeTrack } from "../../api/playlist";
import { useDispatch, useSelector } from "react-redux";
import AddItem from "../AddItem";
import FileInput from "../UI/FileInput/FileInput";
import { fetchTracks } from "../../actions/playlist";
import Button from "../UI/Button/Button";
import { Spinner } from "../UI/Spinner/Spinner";
import { makeToast } from "../../toasts";

function NewTrack() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [track, setTrack] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { id } = useSelector((state) => state.playlists.current);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const { message, id: trackId } = await createTrack({
      track: { title, author, track },
      playlistId: id,
    });
    dispatch(fetchTracks(id));
    makeToast({
      message,
      undoAction: async () => {
        await removeTrack({ playlistId: id, trackId });
        dispatch(fetchTracks(id));
      },
    });
  };

  return (
    <>
      <AddItem title="Add new track" onAdd={handleOpen} />
      <Dialog
        variant="form"
        title="Add new track"
        open={isDialogOpen}
        handleClose={handleClose}
        onSave={handleSave}
      >
        <div className="add-track-container">
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter track name"
          />
          <TextField
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter track author"
          />
          <FileInput preview={true} handleUpload={(file) => setTrack(file)}>
            <Button>Upload track</Button>
          </FileInput>
        </div>
        <Spinner isLoading={isSaving} />
      </Dialog>
    </>
  );
}

export default NewTrack;
