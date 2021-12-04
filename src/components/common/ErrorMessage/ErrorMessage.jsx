import React from 'react'
import './ErrorMessage.css'
import * as AiIcons from 'react-icons/ai'

const ErrorMessage = ({ message="Ha ocurrido un error inesperado" }) => {
    
    return (
        <div className="alert">
            <div className="alert-card">
                <div className="alert-card-header">
                    <i className=""></i>
                    <AiIcons.AiFillExclamationCircle className="bi bi-exclamation-circle-fill"/>
                </div>
                <div className="alert-card-body">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default ErrorMessage;