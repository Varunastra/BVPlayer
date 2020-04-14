import React from 'react'
import { useState } from 'react';
import Dialog from './UI/Dialog/Dialog';
import TextField from './UI/TextField/TextField';
import { addGenre } from '../api/playlist';

function AddGenre({ trackId, setGenres, genres }) {
    const [name, setName] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const createGenre = async () => {
        await addGenre({ genre: { name }, trackId });
        setGenres([...genres, { name }]);
        setIsDialogOpen(false);
    };

    const handleOpen = () => {
        setIsDialogOpen(true);
    };

    const handleClose = () => {
        setIsDialogOpen(false);
    }

    return (
        <>
        <div className="genre" onClick={handleOpen}>
            <i className="fa fa-plus" />
            Assign genre
        </div>
        <Dialog title={"Assign genre"} 
                    variant="form" 
                    onSave={createGenre}
                    handleClose={handleClose}
                    open={isDialogOpen}>
                    <TextField placeholder="Enter genre" 
                        value={name} 
                        onChange={e => setName(e.target.value)} />
        </Dialog>
        </>
    )
};

export default AddGenre;
