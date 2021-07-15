import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Redirect } from "react-router-dom";
import alartAction from '../store/actions/alertAction'

function ActiveAccount() {
    const [state] = useState('')
    const dispatch = useDispatch()
    let { token } = useParams();
    const store = useSelector((state) => state)
    useEffect(() => {
        Axios.get('/api/user/active/' + token)
            .then(function () {
                dispatch(alartAction('Your account is active!', 'primary'))
                if (store.userReducer.isAuthenticated) {
                    return <Redirect to="/" />
                }
            })
            .catch(() => {
                dispatch(alartAction('Something is wrong!', 'danger'))
            })
    }, [dispatch, store.userReducer.isAuthenticated, token])

    return (
        <div className="active-account">
            <h2>{state}</h2>
        </div>
    )
}

export default ActiveAccount
