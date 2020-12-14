import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../lib/reducers/usersReducer';
import placeholderImg from '../../static/profile-placeholder-img.png';
import fire from '../../config/fire';

const ListUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users);
  const { currentUser } = fire.auth();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div>
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          {users.map((user) => (
            <div className="row" key={user.id}>
              <div className="col-md-2">
                {user?.photoURL
                  ? <img src={user?.photoURL} alt="profile-img" className="img-fluid" />
                  : <img src={placeholderImg} alt="profile-img" className="img-fluid" />}
              </div>
              <div className="col-md-10">
                {user.id === currentUser?.uid ? <Link to="/min-side">{user.displayName}</Link> : <Link to={`/brukere/${user.id}`}>{user.displayName}</Link>}
              </div>
              <hr className="mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListUsers;
