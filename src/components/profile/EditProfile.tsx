import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editProfile } from '../../lib/reducers/profileReducer';
import fire from '../../config/fire';
import { IUser } from '../../types/types';

interface IData {
  displayName: string;
  profileImage?: any;
}

const EditProfile = () => {
  const user = fire.auth().currentUser;
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register, handleSubmit, errors, reset, watch,
  } = useForm();
  const [displayName, setDisplayName] = useState<string>();
  const [tempFile, setTempFile] = useState<any>();
  const myProfile: IUser = useSelector((state: any) => state?.profile);

  const password = useRef({});
  password.current = watch('password', '');
  console.log(myProfile);

  useEffect(() => {
    setDisplayName(myProfile?.displayName);
  }, []);

  const onSubmit = async (data: IData) => {
    dispatch(editProfile(data, user, tempFile, myProfile));
    reset();
    history.push('/min-side');
  };

  const handleFile = (fileArg) => {
    if (fileArg.target.files.length > 0) {
      setTempFile(fileArg.target.files[0]);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="headline">
            <h2>Endre profil</h2>
          </div>
        </div>
      </div>
      <div className="mt-5 row justify-content-md-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                className="form-control"
                name="displayName"
                ref={register()}
                placeholder="Navn"
                defaultValue={displayName}
              />
            </div>
            <div className="form-group mt-2">
              <input
                type="file"
                className="form-control"
                id="formFile"
                name="profileImage"
                onChange={handleFile}
                // ref={register({ validate: validateType })}
                ref={register()}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2">Lagre</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
