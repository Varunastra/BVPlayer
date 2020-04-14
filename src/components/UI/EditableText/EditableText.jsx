import React, { useRef } from 'react';
import "./EditableText.scss";
import { useEffect } from 'react';
import { useCallback } from 'react';

function EditableText({ value, isEditable, setIsEditable, onChange }) {
    const indent = 2;
    const inputRef = useRef();
    const spanRef = useRef();

    const changeInputWidth = useCallback(() => {
        const newWidth = spanRef.current.offsetWidth;
        inputRef.current.style.width = newWidth + indent + "px";
    }, []);

    useEffect(() => {
        if (inputRef.current && isEditable) {
            changeInputWidth();
        }
    }, [isEditable, changeInputWidth]);

    useEffect(() => {
        if (inputRef.current) {
            changeInputWidth();
        }
    }, [value, changeInputWidth]);

    return (
        <div className="editable">
            {isEditable
                ? <>
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        ref={inputRef} />
                    <span ref={spanRef}>
                        {value}
                    </span>
                </>
                : value
            }
        </div>
    )
}

export default EditableText;
