import firebase from 'firebase';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import fire from '../../config/fire';
import blipReducer from '../reducers/blipReducer';
import { IBlips } from '../../types/types';

const db = fire.firestore();

const getAllBlips = async () => {
  try {
    const blips: Array<any> = [];
    const blipRef = db.collection('blips');
    const snapshot = await blipRef.orderBy('createdAt', 'desc').get();
    snapshot.forEach((doc) => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      blips.push(obj);
    });
    return blips;
  } catch (err) {
    console.error(err);
  }
  return [];
};
// Firebase returnerer ikke objektet tilbake, kun en referanse til objekte.t
// Heldigvis returneres ID. Da kan vi bruke ID'en til å fetche den nye
// og serrvere den

const addBlip = async (data) => {
  try {
    const user = fire.auth().currentUser;
    const userRef = db.collection('users').doc(user?.uid);
    const userCol = await userRef.get();
    const userData = userCol.data();

    const obj = {
      ...data,
      comments: {},
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      user: {
        displayName: userData?.displayName,
        uid: user?.uid,
        photoURL: userData?.photoURL,
      },
    };
    const blipRef = await db.collection('blips').add(obj);
    const fetchNew = await db.collection('blips').doc(blipRef.id).get();
    const newData: any = fetchNew.data();
    newData.id = fetchNew.id;
    await userRef.update({ blips: firebase.firestore.FieldValue.arrayUnion(fetchNew.id) });

    return newData;
  } catch (err) {
    console.error(err.message);
  }
  return [];
};

export const getUserBlips = async (userId) => {
  try {
    const blips: Array<any> = [];
    const blipRef = db.collection('blips');
    const snapshot = await blipRef.where('user.uid', '==', userId).orderBy('createdAt', 'desc').get();
    snapshot.forEach((doc) => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      blips.push(obj);
    });
    return blips;
  } catch (err) {
    console.error(err);
  }
  return [];
};

export const testGetUserBlips = async (userId) => {
  try {
    const blips: Array<any> = [];
    const blipRef = db.collection('blips');
    const snapshot = await blipRef.where('user.uid', '==', userId).orderBy('createdAt', 'desc').get();
    snapshot.forEach((doc) => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      blips.push(obj);
    });
    return blips;
  } catch (err) {
    console.error(err);
  }
  return [];
};

const createComment = async (blipId, commentData) => {
  const blipRef = db.collection('blips').doc(blipId);
  const randId = db.collection('blips').doc().id;

  try {
    const obj = {
      comments: {
        [randId]: {
          ...commentData,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        },
      },
    };

    await blipRef.set(obj, { merge: true });
    return obj;
  } catch (err) {
    console.error(err.message);
  }
  return false;
};

export default {
  getAllBlips,
  addBlip,
  testGetUserBlips,
  createComment,
};
