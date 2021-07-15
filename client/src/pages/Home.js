import React, { useEffect } from 'react'
import CreatePost from '../components/CreatePost'
import AllUsers from '../components/AllUsers'
import ShortAboutMe from '../components/ShortAboutMe'
import ShowPost from '../components/ShowPost'
import { useSelector, useDispatch } from 'react-redux'
import { getPost } from '../store/actions/postAction'

export default function Home(props) {
    const postReducer = useSelector((store) => store.postReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPost())
    }, [dispatch])

    return (
        <div>
            <div className={props.homeStyle}>
                <ShortAboutMe />
                <div className="z-index">
                    <CreatePost />
                    <ShowPost store={postReducer} />
                </div>
                <AllUsers />
            </div>
        </div>
    )
}
