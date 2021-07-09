import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getMe, getUser } from '../store/actions/profileAction'
import Avatar from '../assets/images/avatar.svg'
import School from '../assets/images/school.png'
import Location from '../assets/images/location.png'
import Home from '../assets/images/home.png'
import Follower from '../assets/images/follower.png'
import Relationship from '../assets/images/relationship.png'
import Skills from '../assets/images/skills.png'
import { useParams } from "react-router-dom";

export default function ShortAboutMe(props) {
    const [state, setState] = useState({})
    const store = useSelector(store => store)
    const dispatch = useDispatch();
    const userMe = store.profileReducer.user;
    let { username } = useParams();

    useEffect(() => {
        dispatch(getUser(username))
        setState(userMe)
    }, [state])

    return (
        <div className={props.unfixed ? 'ourcard card--short-about-me-unfixed ' : 'ourcard card--short-about-me'}>
            {userMe ?
                <div className="short-me">
                    <h3 className="short-me__school">Intro</h3>
                    <p className="short-me__school"><img src={Avatar} className="nav__icon-img" alt="school" /> {userMe.name}</p>
                    <p className="short-me__school"><img src={School} className="nav__icon-img" alt="school" /> Studied at {userMe.school}</p>
                    <p className="short-me__school"><img src={Home} className="nav__icon-img" alt="Location" /> Lives in {userMe.address.city}</p>
                    <p className="short-me__school"><img src={Location} className="nav__icon-img" alt="Location" /> From {userMe.address.city}</p>
                    <p className="short-me__school"><img src={Relationship} className="nav__icon-img" alt="Location" /> {userMe.relationship}</p>
                    <p className="short-me__school"><img src={Follower} className="nav__icon-img" alt="Location" /> Followed by 767 people</p>
                    <p className="short-me__school"><img src={Skills} className="nav__icon-img" alt="Location" /> Skills: {userMe.skills}</p>
                    {userMe.social.map((el) => (
                        <p className="short-me__school"><img src={`https://logo.clearbit.com/${el.url}`} className="nav__icon-img" alt="Location" /> {el.url}</p>
                    ))}
                </div>
                :
                <h4>You are not logged in user. After login, you will see your details in here.</h4>
            }
        </div>
    )
}
