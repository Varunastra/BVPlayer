import React from 'react';
import "./Toast.scss";
import { useDispatch } from 'react-redux';
import { removeToast } from '../../../actions/status';

function Toast({ id, type, message, delay = 2500 }) {
    const dispatch = useDispatch();

    const barStyle = {
        animationDuration: `${delay}ms`
    }

    setTimeout(() => {
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
            <div className="bar" style={barStyle} />
        </div>
    );
};

export default Toast;
