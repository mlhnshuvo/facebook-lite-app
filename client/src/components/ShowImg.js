import React, { useRef } from 'react'
import Avatar from '../assets/images/avatar.svg'
import { useSelector } from 'react-redux'
import LoginUser from '../utils/loginUser'

function ShowImg({ fileSelectedHandler }) {
    const state = useSelector((state) => state.profileReducer)

    const inputEl = useRef(null);
    const onButtonClick = () => {
        inputEl.current.click()
    };

    return (
        <div>
            {
                state.user.username === LoginUser().username &&
                <input
                    style={{ display: 'none' }}
                    type='file'
                    onChange={(e) => fileSelectedHandler(e)}
                    ref={inputEl} />
            }
            <img
                src={state.user.avatar.length > 0 ? state.user.avatar[0].url : Avatar}
                alt=""
                className="profile__photo"
                onClick={onButtonClick}
            />
        </div>
    )
}

export default ShowImg