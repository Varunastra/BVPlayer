import React, { useRef } from 'react';
import "./EditableText.scss";
import { useEffect } from 'react';

function EditableText({ value, isEditable, onChange, areaStyle, defaultValue }) {
    const inputRef = useRef();
    const spanRef = useRef();

    const setTextAreaHeight = () => {
        const spanEl = spanRef.current;
        const inputEl = inputRef.current;
        inputEl.style.height = spanEl.offsetHeight + "px";
    };

    useEffect(() => {
        if (inputRef.current && value.length) {
            setTextAreaHeight();
        }
    }, [value]);

    useEffect(() => {
        if (isEditable) {
            setTextAreaHeight();
        }
    }, [isEditable]);

    return (
        <div className="editable">
            {isEditable
                ? <>
                    <span ref={spanRef}>{value}</span>
                    <textarea
                        style={areaStyle}
                        value={value}
                        ref={inputRef}
                        onKeyPress={e => e.key === "Enter" && e.preventDefault() }
                        onChange={onChange}
                    />
                </>
                : value || defaultValue
            }
        </div>
    )
}

export default EditableText;
