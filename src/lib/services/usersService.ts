import fire from '../../config/fire';

const db = fire.firestore();

const getAllUsers = async () => {
  try {
    const usersArr: Array<any> = [];
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    snapshot.forEach((doc) => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      usersArr.push(obj);
    });
    return usersArr;
  } catch (err) {
    console.error(err.message);
  }
  return [];
};

export default {
  getAllUsers,
};
