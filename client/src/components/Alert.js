import React from 'react'
import { useSelector } from 'react-redux'

function Alert() {
    const alert = useSelector((state) => state.alartReducer)
    if (alert && alert.msg) {
        return (
            <div className={`alert-style text-center alert alert-${alert.color}`} role="alert">
                {alert.msg}
            </div>
        )
    } else {
        return null
    }
}

export default Alert
