import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fire from '../../config/fire';

const EditProfile = () => {
  const user = fire.auth().currentUser;
  const history = useHistory();
  const {
    register, handleSubmit, errors, reset, watch,
  } = useForm();
  const [displayName, setDisplayName] = useState<any>();
  const [fileName, setFileName] = useState('Velg bilde');
  const [tempFile, setTempFile] = useState<any>();
  const myProfile = useSelector((state: any) => state?.profile);

  const password = useRef({});
  password.current = watch('password', '');

  useEffect(() => {
    setDisplayName(myProfile?.displayName);
  }, []);

  const onSubmit = async (data) => {
    let profileImageUrl = user?.photoURL;
    const userRef = fire.firestore().collection('users').doc(user?.uid);
    try {
      const userData = await userRef.get();
      const blipsArr = userData.data()?.blips;
      // Først sjekke at det er et bilde. Bildet vil ligge i tempfile.
      // Hvis det er et bilde, så finn mappen nmed bilde, og slett det som er der
      if (tempFile !== undefined) {
        if (myProfile?.photoURL) {
          const storageRef = fire.storage().ref();
          const imagesRef = storageRef.child(`${user?.uid}/profileImage`);
          imagesRef.listAll().then((result) => {
            result.items.forEach((file) => {
              file.delete();
            });
          });
        }
        // Legg så det nye bilde i mappen, og fetch downloadURL
        const storageRef = fire.storage().ref(`${user?.uid}/profileImage/${tempFile.name}`);
        await storageRef.put(tempFile);
        profileImageUrl = await storageRef.getDownloadURL();

        // Finn alle blips, og oppdater med nytt bilde

        const batch = fire.firestore().batch();

        for (let i = 0; i < blipsArr.length; i += 1) {
          const blipRef = fire.firestore().collection('blips').doc(blipsArr[i]);
          batch.set(blipRef, {
            user: {
              photoURL: profileImageUrl,
              displayName: data.displayName ? data.displayName : myProfile.displayName,
            },
          }, { merge: true });
        }
        await batch.commit();
      }

      if (data.displayName !== myProfile.displayName) {
        const batch = fire.firestore().batch();
        for (let i = 0; i < blipsArr.length; i += 1) {
          const blipRef = fire.firestore().collection('blips').doc(blipsArr[i]);
          batch.set(blipRef, {
            user: {
              displayName: data.displayName,
            },
          }, { merge: true });
        }
        batch.commit();
      }

      // finn user, og oppdater
      await userRef.set({
        photoURL: tempFile ? profileImageUrl : myProfile.photoURL || '',
        displayName: data.displayName ? data.displayName : myProfile.displayName,
      }, { merge: true });

      reset();
      history.push('/min-side');
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleFile = (fileArg) => {
    if (fileArg.target.files.length > 0) {
      setTempFile(fileArg.target.files[0]);
      setFileName(fileArg.target.files[0].name);
    } else {
      setFileName('Velg bilde');
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
