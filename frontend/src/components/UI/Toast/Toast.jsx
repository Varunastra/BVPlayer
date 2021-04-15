import React from 'react';
import "./Toast.scss";
import { useDispatch } from 'react-redux';
import { removeToast } from '../../../actions/status';

function Toast({ id, type, message, delay = 3000, undoAction }) {
    const dispatch = useDispatch();

    const barStyle = {
        animationDuration: `${delay}ms`
    }

    const handleUndo = async () => {
        clearTimeout(toastTimeout);
        dispatch(removeToast(id));
        undoAction();
    }

    const toastTimeout = setTimeout(() => {
        dispatch(removeToast(id));
    }, delay);

    const handleRemove = () => dispatch(removeToast(id));

    return (
        <div className={`toast ${type}`}>
            {type === "success" &&
                <i className="fa fa-check-circle" />}
            {type === "error" &&
                <i className="fa fa-times-circle" />
            }
            <span>{message}</span>
            <i className="fa fa-times" onClick={handleRemove} />
            {undoAction && <i onClick={handleUndo} className="fas fa-undo" />}
            <div className="bar" style={barStyle} />
        </div>
    );
};

export default Toast;
