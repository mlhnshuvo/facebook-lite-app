import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { findEmail } from '../store/actions/userAction'

export default function MatchEmail() {
    const [state, setState] = useState({
        email: ''
    })
    const dispatch = useDispatch()

    const changeHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(findEmail(state))
    }

    return (
        <form className="form" onSubmit={onSubmit}>
            <div className="col-md-8 offset-md-2">
                <h3 className="my-5 text-center">Enter registerd email</h3>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input onChange={changeHandler} type="email" className="form-control" name="email" />
                </div>
                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </div>
        </form>
    )
}
