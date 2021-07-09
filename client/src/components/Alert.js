import React from 'react'
import { useSelector } from 'react-redux'

function Alert() {
    const alert = useSelector((state) => state.alartReducer)
    if (alert !== null && alert.length > 0) {
        let alertList = alert.map((al) => {
            return (
                <div key={al.id} className={`alert-style text-center alert alert-${al.color}`} role="alert">
                    {al.msg}
                </div>
            )
        });
        return alertList
    } else {
        return null
    }
}

export default Alert
