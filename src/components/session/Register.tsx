import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import fire from '../../config/fire';

interface IRegister {
  email: string;
  password: string;
  displayName: string;
}

const Register = () => {
  const [error, setError] = useState('');
  const {
    register, handleSubmit, errors, reset,
  } = useForm();

  const onSubmit = async (data: IRegister) => {
    try {
      const userObject = await fire.auth()
        .createUserWithEmailAndPassword(data.email, data.password);
      const obj = {
        email: userObject?.user?.email,
        displayName: data.displayName,
        photoURL: '',
        blips: [],
      };
      await fire
        .firestore()
        .collection('users')
        .doc(userObject?.user?.uid).set(obj);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Eposten er allerede i bruk');
      }
      console.error(err);
    }
  };

  return (
    <div>
      <main className="form-signin">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="h3 mb-3 fw-normal">Registrer bruker</h1>
          <input
            type="text"
            name="displayName"
            className="form-control"
            placeholder="Brukernavn"
            required
            ref={register({ required: true })}
          />
          {errors.email && 'Du må skrive inn ditt brukernavn'}
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="E-post"
            required
            ref={register({ required: true })}
          />
          {errors.email && 'Du må fylle inn epostadressen din'}
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Passord"
            required
            ref={register({ required: true })}
          />
          {errors.password && 'Du må fylle inn passordet ditt'}
          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
          >
            Registrer
          </button>
          {error}
          {' '}
          <br />
          <Link to="/">Logg inn</Link>
        </form>
      </main>
    </div>
  );
};

export default Register;
