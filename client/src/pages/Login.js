import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../store/actions/userAction'
import { Redirect } from "react-router-dom";

export default function Login() {
    const [state, setState] = useState({
        email: '',
        password: '',
        errors: {}
    })
    const store = useSelector((state) => state)

    let history = useHistory();
    const dispatch = useDispatch()

    const changeHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const formHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(state, history))
    }

    if (store.userReducer.isAuthenticated) {
        return <Redirect to="/" />
    }

    return (
        <form className="form" onSubmit={formHandler}>
            <div className="col-md-8 offset-md-2">
                <h3 className="mt-5 text-center">Enter all the information</h3>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input onChange={changeHandler} type="email" className="form-control" name="email" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input onChange={changeHandler} type="password" className="form-control" name="password" />
                </div>
                <Link to="/forgotpass">
                    <p className="my-2 login-form__​text-underline">Forgotten password?</p></Link>
                <Link to="/register">
                    <p className="login-form__​text-underline">Don't have any account? Please register. </p></Link>
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </div>
        </form>
    )
}
