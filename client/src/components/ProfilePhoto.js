import React from 'react'
import { useSelector } from 'react-redux'
import Loading from './Lodding'
import { Link } from 'react-router-dom'

function ProfilePhoto(props) {
    const store = useSelector((state) => state.profileReducer)

    return (
        <div className={props.unfixed ? 'ourcard card--short-about-me-unfixed some-twick' : 'ourcard card--short-about-me'}>
            <div className="profile-photo">
                {
                    store.isLoading ? (
                        <Loading />
                    ) : (
                        <>
                            {
                                store.user.avatar.length > 0 ? (
                                    store.user.avatar.map(el => {
                                        return (
                                            <Link to={`profilepic${el}`} key={el}>
                                                <img
                                                    src={el}
                                                    alt="avatar" className="profile-photo__img" />
                                            </Link>
                                        )
                                    })
                                ) : (
                                    <h4>There is no images</h4>
                                )
                            }
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default ProfilePhoto
