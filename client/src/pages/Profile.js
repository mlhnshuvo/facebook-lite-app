import React, { useEffect } from 'react'
import CreatePost from '../components/CreatePost'
import Porifle from '../components/Porifle'
import ShortAboutMe from '../components/ShortAboutMe'
import ProfilePhoto from '../components/ProfilePhoto'
import ShowPost from '../components/ShowPost'
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from 'react-redux'
import { getMyPost } from '../store/actions/postAction'
import { useParams } from "react-router-dom";

export default function Home(props) {
    const postReducer = useSelector((store) => store.postReducer)
    const profileReducer = useSelector((state) => state.profileReducer)
    const dispatch = useDispatch()
    let { username } = useParams();

    useEffect(() => {
        dispatch(getMyPost(username))
    }, [])

    const token = localStorage.getItem('token')

    if (token) {
        return (
            <div>
                <Porifle />
                <div className={props.homeStyleProfile}>
                    <div>
                        <ShortAboutMe unfixed />
                        <ProfilePhoto unfixed />
                    </div>
                    <div className="z-index">
                        {profileReducer.user && profileReducer.user.username === jwt_decode(token).username && (<CreatePost />)}
                        <ShowPost store={postReducer} />
                    </div>
                </div>
            </div>
        )
    }


}
