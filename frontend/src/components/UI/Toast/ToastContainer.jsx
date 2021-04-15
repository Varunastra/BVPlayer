import React from 'react'
import { useSelector } from 'react-redux';
import Toast from './Toast';

function ToastContainer() {
    const toastList = useSelector(state => state.status.toasts);

    return (
        <div className="toast-container">
            {toastList.map((toast) => <Toast {...toast} key={toast.id} />)}
        </div>
    )
}

export default ToastContainer;
