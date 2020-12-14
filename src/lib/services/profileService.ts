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

export default {
  getUserData,
  getAllUsers,
};
