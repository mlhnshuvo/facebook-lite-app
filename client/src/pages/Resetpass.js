import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetPass } from '../store/actions/userAction'

function PassReset() {
    const [state, setState] = useState({
        password: ''
    })
    const dispatch = useDispatch()
    let history = useHistory();
    let {token} = useParams()

    const changeHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const formHandler = (e) => {
        e.preventDefault();
        dispatch(resetPass(state.password, token, history))
    }

    return (
        <form className="form" onSubmit={formHandler}>
            <div className="col-md-8 offset-md-2">
                <h3 className="mt-5 text-center">Enter new password</h3>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input onChange={changeHandler} type="password" className="form-control" name="password" />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </div>
        </form>
    )
}

export default PassReset
