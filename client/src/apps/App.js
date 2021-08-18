import React from 'react'
import { Helmet } from "react-helmet";
import Router from './router'
import { isAuthenticated } from '../store/actions/userAction'
import { useDispatch } from 'react-redux'

export default function App() {
    
    const dispatch = useDispatch()
    dispatch(isAuthenticated())

    return (
        <div>
            <Helmet>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"></link>
            </Helmet>
            <Router />
        </div>
    )
}