import React from "react";
import "./Spinner.scss";

export function Spinner({ isLoading }) {
    return (
        <>
            {isLoading && (
                <div className="spinner">
                    <div className="container">
                        <div className="circle">
                            <div />
                            <div />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
