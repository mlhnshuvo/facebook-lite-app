import React, { useState } from 'react'
import Like from '../assets/images/like.png'
import Comments from '../assets/images/comments.png'
import Share from '../assets/images/share.png'
import { useDispatch, useSelector } from 'react-redux'
import { likePost, commentPost, commentPostReply } from '../store/actions/postAction'
import Avatar from '../assets/images/avatar.svg'

export default function CreateCom({ post }) {
    const store = useSelector((state) => state.profileReducer)
    const [state, setState] = useState({ ComInputShow: false })
    const [comshow, setComshow] = useState({ comShow: false })
    const [replybtn, setReplybtn] = useState({ show: false, showId: "" })
    const dispatch = useDispatch()

    const openReply = (id) => {
        setReplybtn({ show: !replybtn.show, showId: id })
    }

    return (
        <div className="position-reletive ">
            <div className="show-post__bottom">
                <span className="show-post__bottom-item">{post.likes.length} Likes</span>
                <span className="show-post__bottom-item"
                    onClick={() => setComshow({ comShow: !comshow.comShow })}  >{post.comments.length} comments</span>
                <span className="show-post__bottom-item"> 2 shares</span>
            </div>
            <hr />
            <div
                className="show-post__bottom">
                <span className="show-post__bottom-item"
                    onClick={() => dispatch(likePost(post._id))}>
                    <img className="show-post__bottom-item-img" src={Like} alt="Like" /><p>Like</p>
                </span>
                <span className="show-post__bottom-item"
                    onClick={() => setState({ ComInputShow: !state.ComInputShow })} >
                    <img className="show-post__bottom-item-img" src={Comments} alt="Like" /><p>Comment</p>
                </span>
                <span className="show-post__bottom-item">
                    <img className="show-post__bottom-item-img" src={Share} alt="Like" /><p>Share</p></span>
            </div>
            <hr />
            {comshow.comShow &&
                post.comments.map((comment) => {
                    return <div>
                        <div className="show-post__bottom-com">
                            <div className="show-post__bottom-name">
                                <img className="avatar avatar-sm" src={comment.author.image ? comment.author.image : Avatar} alt="" />
                            </div>
                            <div>
                                <h6>{comment.author.name}</h6>
                                <small>{comment.body}</small>
                                <button className="btn-reply"
                                    onClick={() => openReply(comment._id)}>Reply</button>
                            </div>

                        </div>

                        {replybtn.show && (
                            <input type="text"
                                className="input input--comment input--comment-reply"
                                placeholder="Write a reply..."
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && e.target.value) {
                                        dispatch(commentPostReply(e.target.value, post._id, comment._id))
                                        e.target.value = ''
                                    }
                                }} />
                        )}
                        {comment.replyComments.map((comRep) => {
                            return <div className="show-post__bottom-com show-post__bottom-com-reply">
                                <div className="show-post__bottom-name">
                                    <img className="avatar avatar-sm" src={comRep.author.image ? comRep.author.image : Avatar} alt="" />
                                </div>
                                <div className="show-post__bottom-com-reply-name">
                                    <h6>{comRep.author.name}</h6>
                                    <small>{comRep.body}</small>
                                </div>
                            </div>
                        })}
                    </div>
                })
            }

            {state.ComInputShow ? <div className="show-post__comments">
                <img className="show-post__top-img avatar" src={store.user && store.user.avatar.length > 0 ? store.user.avatar[0].url : Avatar} alt="PostImg" />
                <input
                    type="text"
                    placeholder="Write a comment..."
                    className="input input--comment"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value) {
                            dispatch(commentPost(e.target.value, post._id))
                            e.target.value = ''
                        }
                    }} />
            </div> : null}
        </div>
    )
}