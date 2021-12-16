import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { createTrack, uploadTrack, removeTrack } from "../../api/playlist";
import Dialog from "../UI/Dialog/Dialog";
import FileInput from "../UI/FileInput/FileInput";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { fetchPlaylist } from "../../actions/playlist";
import { makeToast } from "../../toasts";
import EditTrack from "./EditTrack";

function UploadTrack({ isOpen, onClose }) {
  const [metadata, setMetadata] = useState();
  const [editTrackModal, setEditTrackModal] = useState(false);

  const dispatch = useDispatch();

  const { id } = useParams();

  const handleUpload = async (file) => {
    const metadata = await uploadTrack(file);
    setMetadata(metadata);
  }

  const handleSave = async () => {
    const { cacheTrackIndex } = metadata;
    const { message, id: trackId } = await createTrack({
      cacheTrackIndex,
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
    onClose();
    setMetadata(null);
  };

  const onEdit = () => {
    onClose();
    setEditTrackModal(true);
  }

  const onModalClose = () => {
    onClose();
    setMetadata(null);
  }

  return <Dialog title="Upload New Track"
    open={isOpen}
    handleClose={onModalClose}
    onSave={handleSave}
    handleEdit={onEdit}>
    <div className="upload-track">
      {metadata?.poster ?
        <img className="poster" alt="Poster" src={`data:image/jpeg;base64,${metadata.poster.buffer}`} /> :
        <div className="no-poster" />}
      {metadata && <div className="track-info">
        <div className="title">{metadata.title}</div>
        <div className="artist">{metadata.artist}</div>
      </div>}
      {!metadata && <FileInput preview={true} handleUpload={handleUpload}>
        <div className="upload-button"><UploadOutlined style={{ fontSize: "20px", marginRight: "8px" }} />Upload</div>
      </FileInput>}
    </div>
    <EditTrack isOpen={editTrackModal} setIsOpen={setEditTrackModal} />
  </Dialog>;
}

export default UploadTrack;
