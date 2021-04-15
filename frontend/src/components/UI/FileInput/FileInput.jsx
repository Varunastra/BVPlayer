import React from "react";
import "./FileInput.scss";
import { useState } from "react";
import { useRef } from "react";

function FileInput({
    handleUpload,
    children,
    preview,
}) {
    const [filename, setFilename] = useState(null);
    const inputRef = useRef();

    const handleFileChange = (e) => {
        if (e.target.files.length) {
            const file = e.target.files[0];
            setFilename(file.name);
            handleUpload(file);
        }
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    return (
        <div className="file-input">
            <label onClick={handleClick}>
                {children}
            </label>
            <input type="file" ref={inputRef} onChange={handleFileChange} />
            {(preview && filename) && (
                <div className="preview">{filename}</div>
            )}
        </div>
    );
}

export default FileInput;
