import React, { useState } from 'react'
import Logo from '../assets/images/logo.svg'
import Collapse from '../assets/images/collapse.png'
import Notification from '../assets/images/notification.png'
import Avatar from '../assets/images/avatar.svg'
import Message from '../assets/images/message.png'
import Logout from '../assets/images/logout.png'
import { Link, Redirect } from "react-router-dom";
import { logout } from '../store/actions/userAction'
import { useSelector, useDispatch } from 'react-redux'
import { searchTerm } from '../store/actions/postAction'

export default function NavBar() {
    const [state, setState] = useState({ show: false })
    const store = useSelector((state) => state.profileReducer)
    const storeUser = useSelector((state) => state)
    const dispatch = useDispatch()

    if (!storeUser.userReducer.isAuthenticated) {
        return <Redirect to="/login" />
    }

    return (
        <nav className="ournav">
            <div className="nav__nav-bar">
                <div className="nav__left-side">
                    <Link to="/"><img src={Logo} className="nav__right-logo" alt="Logo" /></Link>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="input nav__logo-input"
                        onChange={(e) => dispatch(searchTerm(e.target.value))}
                    />
                </div>
                <div className="nav__right-side">
                    <Link to={`/${store.user && store.user.username}`} ><span className="nav__icon icon--pointer">
                        < img className="nav__icon-img" src={store.user && store.user.avatar.length > 0 ? store.user.avatar[0].url : Avatar} alt="" />
                    </span></Link>
                    <span className="nav__icon icon--pointer">
                        < img className="nav__icon-img" src={Message} alt="Collapse" />
                    </span>
                    <span className="nav__icon icon--pointer">
                        < img className="nav__icon-img" src={Notification} alt="Collapse" />
                    </span>
                    <span
                        className="nav__icon position-reletive"
                        onClick={() => setState({ show: !state.show })}>
                        <img className="nav__icon-img icon--pointer" src={Collapse} alt="Collapse" />
                        {state.show && <ul className="nav__collape">
                            <Link to={`/${store.user && store.user.username}`}><li className="nav__collape-item icon--pointer">
                                <img src={store.user && store.user.avatar.length > 0 ? store.user.avatar[0] : Avatar} className="avatar" alt="" />
                                <h6>{store.user ? store.user.name : "Account"}</h6>
                            </li></Link>
                            <hr />
                            <li className="nav__collape-item icon--pointer">
                                <a href="/login" onClick={() => dispatch(logout())} >
                                    <span className="nav__icon">
                                        < img className="nav__icon-img" src={Logout} alt="More" />
                                        <p >Logout</p>
                                    </span>
                                </a>
                            </li>
                        </ul>}
                    </span>
                </div>
            </div>
        </nav>
    )
}