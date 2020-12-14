import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getUserBlips } from '../../lib/reducers/blipReducer';
import { getMyProfile } from '../../lib/reducers/profileReducer';
import 'dayjs/locale/nb';
import fire from '../../config/fire';
import placeholderImg from '../../static/profile-placeholder-img.png';
import BlipForm from '../blips/BlipForm';

const Profile = () => {
  dayjs.locale('nb');
  dayjs.extend(relativeTime);
  const dispatch = useDispatch();
  const user: any = fire.auth().currentUser;
  const userBlips: any = useSelector((state: any) => {
    return state.blips.filter((u) => u.user.uid === user.uid);
  });
  const myProfile = useSelector((state:any) => state.profile);

  useEffect(() => {
    dispatch(getMyProfile(user.uid));
  }, []);

  useEffect(() => {
    if (userBlips.length === 0) {
      dispatch(getUserBlips(user.uid));
    }
  }, [dispatch]);

  return (
    <div>
      <div className="row">
        <div className="col-md-5">
          <div className="row">
            <div className="col-md-3">
              <div className="profile-img">
                {myProfile.photoURL
                  ? <img src={myProfile.photoURL} alt="profile-img" className="img-fluid" />
                  : <img src={placeholderImg} alt="profile-img" className="img-fluid" />}
              </div>
              <Link to="/min-side/rediger">
                <small>Rediger info</small>
              </Link>
            </div>
            <div className="col-md-9">
              <div className="headline">
                <h2>
                  {myProfile.displayName}
                </h2>
              </div>
              {myProfile.email}
            </div>
            <div className="mt-3">
              <BlipForm />
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="headline">
            <h2>Mine blips</h2>
          </div>
          <div className="feed mt-3">
            {userBlips.map((blip) => (
              <div className="feedItem" key={blip.id}>
                <h5>
                  <small className="text-muted">
                    {dayjs(blip.createdAt.seconds * 1000).fromNow()}
                  </small>
                </h5>
                {blip.text}
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
