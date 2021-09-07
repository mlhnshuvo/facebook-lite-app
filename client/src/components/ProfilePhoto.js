import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Lodding";
import { deleteProfilePic } from "../store/actions/profileAction";

function ProfilePhoto(props) {
  const store = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();

  return (
    <div
      className={
        props.unfixed
          ? "ourcard card--short-about-me-unfixed some-twick"
          : "ourcard card--short-about-me"
      }
    >
      <div className="profile-photo">
        {store.isLoading ? (
          <Loading />
        ) : (
          <>
            {store.user.avatar.length > 0 ? (
              store.user.avatar.map((el, index) => {
                return (
                  <div className="profile-photo__ahref" key={el.url}>
                    <a href={el.url}>
                      <img
                        src={el.url}
                        alt="avatar"
                        className="profile-photo__img"
                      />
                    </a>
                    <button
                      className="btn btn-danger"
                      onClick={() => dispatch(deleteProfilePic(el.public_id, index))}
                    >
                      delete
                    </button>
                  </div>
                );
              })
            ) : (
              <h4>There is no images</h4>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePhoto;
