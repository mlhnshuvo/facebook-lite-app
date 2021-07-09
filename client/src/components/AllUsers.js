import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../store/actions/userAction'
import Lodding from './Lodding'
import Avatar from '../assets/images/avatar.svg'
import { Link } from "react-router-dom";

export default function AllUsers() {
    const store = useSelector((state) => state.userReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    return (
        <div className={'ourcard card--users'}>
            <h3 className="short-me__school">All users</h3>
            <ul className="card__users__ui">
                {
                    store.isLoading ? (
                        <Lodding />
                    ) : (
                        store.user.map((el) => {
                            return (
                                <Link to={`${el.username}`} >
                                    <li key={el._id} className="card__users__li">
                                        <img className="avatar card__users__li-avatar" src={el.avatar.length > 0 ? el.avatar[0] : Avatar} alt="" />
                                        <p>{el.name}</p>
                                    </li>
                                </Link>
                            )
                        })
                    )
                }
            </ul>
        </div>
    )
}