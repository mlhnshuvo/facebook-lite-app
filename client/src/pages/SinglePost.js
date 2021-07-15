import React, { useEffect } from 'react'
import ShowPost from '../components/ShowPost'
import { useSelector, useDispatch } from 'react-redux'
import { getSinglePost } from '../store/actions/postAction'
import { useParams } from "react-router-dom";

export default function SinglePost() {
    const postReducer = useSelector((store) => store.postReducer)
    const dispatch = useDispatch()
    let { id } = useParams();

    useEffect(() => {
        dispatch(getSinglePost(id))
    }, [dispatch, id])

    return (
        <div>
            <ShowPost store={postReducer} className='single-post' />
        </div>
    )
}
