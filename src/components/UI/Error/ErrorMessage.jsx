import React from 'react';
import "./Error.scss";

function ErrorMessage({ error, hasIcon }) {
    return (
        <>
            {   error &&
                <div className="error-message">
                    {hasIcon && <li className="fa fa-times-circle" />}
                    <div className="error-text">
                        {error}
                    </div>
                </div>
            }
        </>
    )
};

export default ErrorMessage;
