import fire from '../../config/fire';

const db = fire.firestore();

const getUserData = async (userId) => {
  const userRef = await db.collection('users').doc(userId);
  const user = await userRef.get();
  return user.data();
};

const getAllUsers = async () => {
  const userRef = await db.collection('users');
  const userArr: Array<any> = [];

  const snapshot = await userRef.get();
  snapshot.forEach((doc) => {
    const obj = {
      id: doc.id,
      ...doc.data(),
    };
    userArr.push(obj);
  });
  return userArr;
};

const updateProfile = async (data, user, tempFile, myProfile) => {
  let profileImageUrl = user?.photoURL;
  const userRef = fire.firestore().collection('users').doc(user?.uid);
  try {
    const userData = await userRef.get();
    const blipsArr = userData.data()?.blips;
    // Først sjekke at det er et bilde. Bildet vil ligge i tempfile.
    // Hvis det er et bilde, så finn mappen nmed bilde, og slett det som er der
    if (tempFile !== undefined) {
      // Sletter profilbildet.
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
      console.log('ok');
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
    const updatedUser = await userRef.get();
    return updatedUser.data();
  } catch (err) {
    console.error(err.message);
  }
};

export default {
  getUserData,
  getAllUsers,
  updateProfile,
};
