import React, { useEffect } from 'react'
import CreatePost from '../components/CreatePost'
import Porifle from '../components/Porifle'
import ShortAboutMe from '../components/ShortAboutMe'
import ProfilePhoto from '../components/ProfilePhoto'
import ShowPost from '../components/ShowPost'
import { useSelector, useDispatch } from 'react-redux'
import { getMyPost } from '../store/actions/postAction'
import { useParams } from "react-router-dom";
import loginUser from '../utils/loginUser'

export default function Home(props) {
    const postReducer = useSelector((store) => store.postReducer)
    const profileReducer = useSelector((state) => state.profileReducer)
    const dispatch = useDispatch()
    let { username } = useParams();

    useEffect(() => {
        dispatch(getMyPost(username))
    }, [dispatch, username])

    return (
        <div>
            <Porifle />
            <div className={props.homeStyleProfile}>
                <div>
                    <ShortAboutMe unfixed />
                    <ProfilePhoto unfixed />
                </div>
                <div className="z-index">
                    {profileReducer.user && profileReducer.user.username === loginUser().username && (<CreatePost />)}
                    <ShowPost store={postReducer} />
                </div>
            </div>
        </div>
    )
}
