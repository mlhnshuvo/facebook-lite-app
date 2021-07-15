import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../store/actions/userAction'
import Recaptcha from 'react-google-recaptcha'
import AppConfig from '../App.cofig'

export default function Register() {
    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        errors: {},
        token: ''
    })

    let history = useHistory();
    const dispatch = useDispatch()

    const reCaptcha = useRef()

    const changeHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const formHandler = (e) => {
        e.preventDefault();
        dispatch(registerUser(state, history))
        reCaptcha.current.reset();
    }

    const onChange = function (value) {
        setState({ ...state, token: value })
    };

    return (
        <form className="form" onSubmit={formHandler}>
            <div className="col-md-8 offset-md-2">
                <h3 className="mt-5 text-center">Enter all the information</h3>
                <div className="mb-3">
                    <label className="form-label is-invalid">Name</label>
                    <input onChange={changeHandler} type="name" className="form-control" name="name" />
                </div>
                <div className="mb-3">
                    <label className="form-label is-invalid">Email address</label>
                    <input onChange={changeHandler} type="email" className="form-control" name="email" />
                    <div className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label is-invalid">Phone</label>
                    <input onChange={changeHandler} type="phone" className="form-control" name="phone" />
                    <div className="form-text">We'll never share your phone with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label is-invalid">Password</label>
                    <input onChange={changeHandler} type="password" className="form-control " name="password" />
                </div>
                <div className="mb-3 form-check">
                    <Recaptcha
                        sitekey={AppConfig().ReCAPTCHA_SITE_KEY}
                        onChange={onChange}
                        ref={reCaptcha} />
                </div>
                <Link to="/login"><p className="text-decoration-underline">I have account. Login</p></Link>
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </div>
        </form>
    )
}