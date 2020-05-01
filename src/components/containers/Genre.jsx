import React from 'react';

function Genre({ genre, handleRemove, isEditable }) {
    return (
        <div className="genre">
            {isEditable && <i className="fa fa-times" onClick={() => handleRemove(genre)} />}
            {genre.name}
        </div>
    )
};

export default Genre;
