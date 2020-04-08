import React from "react";

export function ErrorMessage({ error }) {
    return (
        <>
            {error && (
                <div className="error">
                    <i className="fas fa-times-circle"></i>
                    <strong className="error-text">{error}</strong>
                </div>
            )}
        </>
    );
}
