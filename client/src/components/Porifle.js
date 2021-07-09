import React from 'react'
import CoverPhoto from '../assets/images/coverphoto.jpg'
import Avatar from '../assets/images/avatar.svg'
import { connect } from 'react-redux'
import { fileUpload, editProfile } from '../store/actions/profileAction'
import Title from '../components/Title'
import ProfileModal from './ProfileModal'
import Loading from './Lodding'
import jwt_decode from "jwt-decode";

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null,
            modalOpen: false,
            isEditable: false,
            bio: '',
            decode: ''
        }
    }

    fileSelectedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        }, () => {
            return this.fileUploadHandler(event)
        })
    }

    fileUploadHandler = (event) => {
        event.preventDefault()
        const fd = new FormData()
        fd.append('avatar', this.state.selectedFile)
        this.props.fileUpload(fd)
        this.setState({ selectedFile: null })
    }

    modalOpen = () => {
        this.setState({ modalOpen: true })
    }

    modalClose = () => {
        setTimeout(() => {
            this.setState({ modalOpen: false })
        })
    }

    bioEditHandler = () => {
        this.props.state.user.bio = this.state.bio
        this.props.editProfile(this.props.state.user)
    }
    componentDidMount() {
        const token = localStorage.getItem('token')
        const decode = jwt_decode(token);
        this.setState({ decode: decode.username });
    }

    render() {
        const userMe = this.props.state
        return (
            <div className="profile" >
                {
                    userMe.isLoading ? (
                        <Loading />
                    ) : (
                        <>
                            <Title title={`${userMe.user.name} | Facebook`} />
                            <div className="profile__top">
                                <img src={CoverPhoto} alt="coverPhoto" className="cover__photo" />
                                {userMe.user.username === this.state.decode && <input
                                    style={{ display: 'none' }}
                                    type='file'
                                    onChange={this.fileSelectedHandler}
                                    ref={fileInput => this.fileInput = fileInput} />}
                                <img src={userMe.user.avatar.length > 0 ? userMe.user.avatar[0] : Avatar} alt="" className="profile__photo" onClick={() => this.fileInput.click()} />
                                <h3 className="profile__name">{userMe.user.name}</h3>
                                {userMe.user.bio ? (
                                    <p className="profile__bio">{userMe.user.bio} </p>
                                ) : (
                                    <div>
                                        {this.state.isEditable ? (
                                            <div>
                                                <textarea className="profile__bio-input form-control"
                                                    onChange={(e) => this.setState({ bio: e.target.value })} />
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => this.setState({ isEditable: false })}>Cancel
                                                </button>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={this.bioEditHandler}>Save</button>
                                            </div>
                                        ) : (
                                            <>
                                                {

                                                    userMe.user.username === this.state.decode && <p
                                                        className="profile__bio"
                                                        onClick={() => {
                                                            return this.setState({ isEditable: true })
                                                        }}>Add bio</p>
                                                }
                                            </>

                                        )}
                                    </div>
                                )}
                                {
                                    userMe.user.username === this.state.decode && <button
                                        className="btn btn-primary edit__button mt-2"
                                        type="submit"
                                        onClick={this.modalOpen}
                                    >Edit Profile</button>
                                }

                            </div>
                            {this.state.modalOpen && <ProfileModal
                                modalClose={this.modalClose}
                                user={userMe} />}
                        </>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state: state.profileReducer
})

export default connect(mapStateToProps, { fileUpload, editProfile })(Profile)