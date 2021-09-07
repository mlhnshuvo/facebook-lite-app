import React, { useState } from 'react'
import MoreImg from '../assets/images/more.png'
import LkeCmntShr from './LkeCmntShr'
import Loading from './Lodding'
import ReactHtmlParser from 'react-html-parser'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { deletePost } from '../store/actions/postAction'
import { useDispatch } from 'react-redux'
import loginUser from '../utils/loginUser'
import { Link } from 'react-router-dom'
import alartAction from '../store/actions/alertAction'
import Share from '../assets/images/share.png'
import Embed from '../assets/images/embed.png'
import Delete from '../assets/images/delete.png'
import Copy from '../assets/images/copy.png'
import AppConfig from '../App.cofig'

export default function ShowPost({ store, className }) {
    const [state, setState] = useState({ showId: '', show: false })
    const dispatch = useDispatch()

    const openMoreItem = (id) => {
        setState({ showId: id, show: !state.show })
    }

    return (
        <div>
            {store.isLoading ? (
                <Loading />
            ) : (
                <div>
                    {store.performSearch.map(post => {
                        return (
                            <div className={`show-post ourcard ${className}`}>
                                <div className="show-post__top">
                                    <div className="show-post__top-top">
                                        <div>
                                            <Link to={`/${post.author.username}`} className="show-post__top-top"> <img className="show-post__top-img avatar" src={post.author.image} alt="" />
                                                <p className="show-post__top-name">{post.author.name}</p></Link>
                                        </div>
                                        <span className="nav__icon position-reletive icon--pointer" onClick={() => openMoreItem(post._id)}>
                                            < img className="nav__icon-img" src={MoreImg} alt="More" />
                                            {
                                                state.showId === post._id && state.show &&
                                                <ul className="nav__collape">
                                                    <li className="nav__collape-item icon--pointer">
                                                        <img src={Share} alt=""
                                                            className="show__post-icon" />
                                                        <p>Share this post</p>
                                                    </li>
                                                    <li className="nav__collape-item icon--pointer">
                                                        <img src={Embed} alt=""
                                                            className="show__post-icon" />
                                                        <p>Embed this post</p>
                                                    </li>
                                                    {post.author.username === loginUser().username && (
                                                        <li
                                                            onClick={() => dispatch(deletePost(post._id, post.author.username))}
                                                            className="nav__collape-item icon--pointer">
                                                            <img src={Delete} alt=""
                                                                className="show__post-icon" />
                                                            <p>Delete</p>
                                                        </li>
                                                    )}
                                                    <CopyToClipboard
                                                        text={AppConfig().FRONTEND_URL + '/post/' + post._id}
                                                        onCopy={() => dispatch(alartAction('Copied', 'primary'))}>
                                                        <li className="nav__collape-item icon--pointer">
                                                            <img src={Copy} alt=""
                                                                className="show__post-icon" />
                                                            <p>Copy link to post</p>
                                                        </li>
                                                    </CopyToClipboard>
                                                </ul>
                                            }
                                        </span>
                                    </div>
                                    <p className="show-post__text">
                                        {ReactHtmlParser(post.body)}
                                    </p>
                                    <img src={post.image.url} alt="postImg" className="show-post__img" />
                                </div>
                                <LkeCmntShr post={post} />
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}