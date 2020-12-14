import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import placeholderImg from '../../static/profile-placeholder-img.png';
import { getAllUsers } from '../../lib/reducers/usersReducer';
import { getUserBlips } from '../../lib/reducers/blipReducer';
import { IUser, IBlips } from '../../types/types';

const ShowUser = () => {
  dayjs.locale('nb');
  dayjs.extend(relativeTime);
  const params: { id: string; } = useParams();
  const dispatch = useDispatch();
  const user: IUser = useSelector((state: any) => {
    return state.users.find((u) => u.id === params.id);
  });
  const userBlips: Array<IBlips> = useSelector((state: any) => {
    return state.blips.filter((u) => u.user.uid === params.id);
  });

  useEffect(() => {
    if (!user) {
      dispatch(getAllUsers());
    }
  }, []);

  useEffect(() => {
    if (userBlips.length === 0) {
      dispatch(getUserBlips(params.id));
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-5">
          <div className="row">
            <div className="col-md-3">
              <div className="profile-img">
                {user?.photoURL
                  ? <img src={user.photoURL} alt="profile-img" className="img-fluid" />
                  : <img src={placeholderImg} alt="profile-img" className="img-fluid" />}
              </div>
            </div>
            <div className="col-md-9">
              <div className="headline">
                <h2>
                  {user.displayName}
                </h2>
              </div>
              {user.email}
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
export default ShowUser;
