import React from "react";
import { useState } from "react";
import Dialog from "./UI/Dialog/Dialog";
import TextField from "./UI/TextField/TextField";
import { PlusOutlined } from "@ant-design/icons";

function AddGenre({ handleCreate }) {
  const [name, setName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = () => {
    handleCreate({ name });
    setIsDialogOpen(false);
  };

  const handleOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="genre" onClick={handleOpen}>
        <PlusOutlined />
        Assign genre
      </div>
      <Dialog
        title={"Assign genre"}
        variant="form"
        onSave={handleSave}
        handleClose={handleClose}
        open={isDialogOpen}
      >
        <TextField
          placeholder="Enter genre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Dialog>
    </>
  );
}

export default AddGenre;
