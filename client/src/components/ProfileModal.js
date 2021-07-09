import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editProfile } from '../store/actions/profileAction'

function ProfileModal(props) {
    const [state, setState] = useState({
        name: props.user.user.name,
        bio: props.user.user.bio,
        school: props.user.user.school,
        skills: props.user.user.skills,
        relationship: props.user.user.relationship,
        city: props.user.user.address.city,
        country: props.user.user.address.country,
        postCode: props.user.user.address.postCode,
        social: props.user.user.social
    })

    const dispatch = useDispatch()

    const changeHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const socialChangeHandler = (e, index) => {
        const { social } = state
        social[index].url = e.target.value
        setState({ ...state, social: social })
    }

    const addItemSocialHandler = (e) => {
        const { social } = state
        const item = { url: '' }
        social.push(item)
        setState({ ...state, social })
    }

    const deleteSocialHandler = (id) => {
        const { social } = state
        const item = social.filter((el) => el._id !== id)
        setState({ ...state, social: item })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const { name, bio, school, city, country, postCode, skills, relationship, social } = state
        const editUser = {
            name,
            bio,
            school,
            skills,
            relationship,
            city: city,
            country: country,
            postCode: postCode,
            social
        }
        dispatch(editProfile(editUser))
    }

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Profile</h5>
                        <button
                            onClick={() => props.modalClose()}
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <form className="profile-edit-form" onSubmit={submitHandler}>
                            <div className="col-md-8 offset-md-2">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="name"
                                        className="form-control"
                                        name="name"
                                        value={state.name}
                                        placeholder="Tamim Iqbal"
                                        onChange={changeHandler} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Bio</label>
                                    <textarea
                                        onChange={changeHandler} className="form-control"
                                        name="bio"
                                        value={state.bio} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">School Name</label>
                                    <input
                                        type="shcool"
                                        className="form-control" placeholder="Kushtia University"
                                        name="school"
                                        value={state.school}
                                        onChange={changeHandler} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Skills</label>
                                    <input
                                        type="skills"
                                        placeholder="HTML, CSS, JavaScript"
                                        className="form-control" name="skills"
                                        value={state.skills}
                                        onChange={changeHandler} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Relationship</label>
                                    <select
                                        name="relationship"
                                        value={state.relationship} className="form-control"
                                        onChange={changeHandler}>
                                        <option>Select your status</option>
                                        <option value="Single">Single</option>
                                        <option value="In a relationship">In a relationship</option>
                                        <option value="Engaged">Engaged</option>
                                        <option value="Married">Married</option>
                                        <option value="It's complicated">It's complicated</option>
                                        <option value="Widowed">Widowed</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="profile-address">
                                    <h4>Address</h4>
                                    <div className="mb-3">
                                        <label className="form-label">City</label>
                                        <input
                                            type="address"
                                            placeholder="Kushtia, Bangladesh"
                                            className="form-control"
                                            name="city"
                                            value={state.city}
                                            onChange={changeHandler} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Country</label>
                                        <input
                                            type="address"
                                            placeholder="Kushtia, Bangladesh"
                                            className="form-control" name="country"
                                            value={state.country}
                                            onChange={changeHandler} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Post code</label>
                                        <input
                                            type="address"
                                            placeholder="Kushtia, Bangladesh"
                                            className="form-control" name="postCode"
                                            value={state.postCode}
                                            onChange={changeHandler} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Social
                                            <button
                                                className="btn btn-primary pe-auto profile__social-add-button"
                                                onClick={addItemSocialHandler}>Add item</button></label>
                                        {state.social.map((el, index) => {
                                            return <div className="profile-icon-url">
                                                <img
                                                    src={`https://logo.clearbit.com/${el.url}`}
                                                    alt=""
                                                    className="avatar profile__social-icon"
                                                />
                                                <input
                                                    type="social"
                                                    placeholder="www.instagram.com" className="form-control profile__social-input" name="url"
                                                    value={el.url}
                                                    onChange={(event) => socialChangeHandler(event, index)} />
                                                <button className="btn btn-danger profile__social-add-button"
                                                    onClick={() => deleteSocialHandler(el._id)} >delete</button>
                                            </div>
                                        })}
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-2"
                                    onClick={() => props.modalClose()}
                                >Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileModal