import React, { useState } from 'react'
import PostModal from './PostModal.js'
import { useSelector } from 'react-redux'
import Avatar from '../assets/images/avatar.svg'

export default function Post() {
    const [state, setState] = useState({ open: false })
    const store = useSelector((state) => state.profileReducer)

    const modalClose = () => {
        setState({ open: false })
    }

    return (
        <div className="ourcard card--mind">
            <div className="card__mind-item">
                <img src={store.user && store.user.avatar.length > 0 ? store.user.avatar[0].url : Avatar} className="avatar" alt="" />
                <input type="text" className="input input--mind" placeholder={`What's on your mind ${store.user ? store.user.name : ''}?`}
                    onFocus={() => setState({ open: true })} />
            </div>
            {state.open && <PostModal modalClose={modalClose} />}
        </div>
    )
}
