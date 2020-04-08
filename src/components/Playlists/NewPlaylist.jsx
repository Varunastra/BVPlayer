import React from "react";
import Dialog from "../UI/Dialog/Dialog";
import { useState } from "react";
import TextField from "../UI/TextField/TextField";
import { createPlaylist } from "../../api/playlist";
import { useDispatch } from "react-redux";
import { fetchPlaylists } from "../../actions/playlists";
import AddItem from "../AddItem";

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
            await createPlaylist(name);
            dispatch(fetchPlaylists("me"));
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
