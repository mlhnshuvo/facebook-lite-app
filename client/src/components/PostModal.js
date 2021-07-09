import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Images from '../assets/images/images.png';
import { createPost } from '../store/actions/postAction'

export default function PostModal(props) {
    const [postBody, setpostBody] = useState({ body: '' })
    const [postImg, setpostImg] = useState({ image: null })
    const dispatch = useDispatch()

    const changeHandler = (value) => {
        setpostBody({ body: value })
    }

    const fileHandler = (e) => {
        setpostImg({ image: e.target.files[0] })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('image', postImg.image)
        fd.append('body', postBody.body)
        dispatch(createPost(fd))
    }

    const inputEl = useRef(null);
    const onButtonClick = () => {
        inputEl.current.click()
    };

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create Post</h5>
                        <button
                            onClick={() => props.modalClose()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            <ReactQuill
                                theme="snow"
                                className="react-quill"
                                onChange={changeHandler}
                            />
                            <div className="modal__add-something">
                                <p>Add to your post</p>
                                <input
                                    type="file"
                                    className="d-none"
                                    ref={inputEl}
                                    onChange={fileHandler} />
                                <img
                                    src={Images}
                                    alt=""
                                    className="modal__add-img"
                                    onClick={onButtonClick}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}