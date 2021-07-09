import React, { useState } from 'react'

import MoreImg from '../assets/images/more.png'
import LkeCmntShr from './LkeCmntShr'
import Loading from './Lodding'
import ReactHtmlParser from 'react-html-parser'

export default function ShowPost({ store }) {
    const [state, setState] = useState({ showId: '', show: false })

    const openMoreItem = (id) => {
        setState({ showId: id, show: !state.show })
    }

    return (
        <div>
            {store.isLoading ? (
                <Loading />
            ) : (
                <div>
                    {store.post.map(post => {
                        return (
                            <div className="show-post ourcard">
                                <div className="show-post__top">
                                    <div className="show-post__top-top">
                                        <div className="show-post__top-top">
                                            <img className="show-post__top-img avatar" src={post.author.image} alt="" />
                                            <p className="show-post__top-name">{post.author.name}</p>
                                        </div>
                                        <span className="nav__icon position-reletive icon--pointer" onClick={() => openMoreItem(post._id)}>
                                            < img className="nav__icon-img" src={MoreImg} alt="More" />
                                            {
                                                state.showId === post._id && state.show &&
                                                <ul className="nav__collape">
                                                    <li className="nav__collape-item icon--pointer">
                                                        <p>Share this post</p>
                                                    </li>
                                                    <li className="nav__collape-item icon--pointer">
                                                        <p>Embed this post</p>
                                                    </li>
                                                    <li className="nav__collape-item icon--pointer">
                                                        <p>Copy link to post</p>
                                                    </li>
                                                </ul>
                                            }
                                        </span>
                                    </div>
                                    <p className="show-post__text">
                                        {ReactHtmlParser(post.body)}
                                    </p>
                                    <img src={post.image} alt="postImg" className="show-post__img" />
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
