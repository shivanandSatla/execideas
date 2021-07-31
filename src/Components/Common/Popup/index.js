import React from 'react';
import ReactDOM from 'react-dom';
import './Popup.css';

export const PopupContent = props => {
    return (
        <div className="popup-content">
            {props.children}
        </div>
    )
}
export const PopUpHeader = props => {
    return (
        <div className="popup-header">
            <div>
                <h3>{props.title}</h3>
            </div>
            <div>
                <h3 onClick={props.handlePopupClose}>x</h3>
            </div>
        </div>
    )
};

export const PopupBody = props => {
    return (
        <div className="popup-body">
            {props.children}
        </div>
    )
};

export const PopupFooter = props => {
    return (
        <div className="popup-footer">
            <div className="popup-footer-buttons">
                <button onClick={props.handleOkClick}>Ok</button>
                <button onClick={props.handlePopupClose}>Cancel</button>
            </div>
        </div>
    )
}
const Popup = props => {
    return (
        ReactDOM.createPortal(props.children,document.getElementById('root'))
    )
}

export default Popup;