import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import relativeTime from 'dayjs/plugin/relativeTime';

import { useSelector, useDispatch } from 'react-redux';
import { initializeBlips } from '../../lib/reducers/blipReducer';
import placeholderImg from '../../static/profile-placeholder-img.png';
import BlipForm from './BlipForm';
import fire from '../../config/fire';
import AddComment from './comments/AddComment';
import { getAllUsers } from '../../lib/reducers/usersReducer';
import ShowComments from './comments/ShowComments';
import { IUser, IBlips } from '../../types/types';

interface Props {

}
dayjs.locale('nb');
dayjs.extend(relativeTime);

const BlipFeed = (props: Props) => {
  const dispatch = useDispatch();
  const blips: Array<IBlips> = useSelector((state: any) => state.blips);
  const { currentUser } = fire.auth();
  const user: IUser = useSelector((state: any) => {
    return state.users.find((u: IUser) => u.id === currentUser?.uid);
  });
  console.log(blips);

  useEffect(() => {
    dispatch(initializeBlips());
  }, []);

  useEffect(() => {
    if (!user) {
      dispatch(getAllUsers());
    }
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-7">
          <div className="headline">
            <h2>Veggen  </h2>
          </div>
          <div className="feed mt-3">
            {blips.map((blip: IBlips) => (
              <div className="feedItem" key={blip.id}>
                <div className="row">
                  <div className="col-md-2">
                    {blip?.user?.photoURL
                      ? <img src={blip?.user?.photoURL} alt="profile-img" className="img-fluid" />
                      : <img src={placeholderImg} alt="profile-img" className="img-fluid" />}
                  </div>
                  <div className="col-md-10">
                    <h5>
                      {blip.user.uid === currentUser?.uid ? <Link to="/min-side">{blip.user.displayName}</Link> : <Link to={`/brukere/${blip.user.uid}`}>{blip.user.displayName}</Link>}
                      {' '}
                      <small className="text-muted">
                        {dayjs(blip.createdAt.seconds * 1000).fromNow()}
                      </small>
                    </h5>
                    {blip.text}
                    <div className="mt-4">
                      <ShowComments comments={blip.comments} />
                      <AddComment blipId={blip.id} user={user} />
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-5">
          <BlipForm />
        </div>
      </div>
    </div>
  );
};

export default BlipFeed;
