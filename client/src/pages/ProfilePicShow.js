import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { deleteProfilePic } from '../store/actions/profileAction'

function ProfilePicShow() {
    const store = useSelector((state) => state.profileReducer)
    const { name } = useParams()
    const dispatch = useDispatch()
    let history = useHistory();

    return (
        <div className="ProfilePicShow">
            {store && store.user.avatar.map((avatar, index) => {
                return avatar === `/` + name && (
                    <div>
                        <button
                            className="btn btn-danger ProfilePicShow__btn"
                            onClick={() => dispatch(deleteProfilePic(index, history, store.user.username))}
                        >Delete</button>
                        <img
                            className="ProfilePicShow__image"
                            src={avatar}
                            alt="" />
                    </div>
                )
            })}
        </div>
    )
}

export default ProfilePicShow
