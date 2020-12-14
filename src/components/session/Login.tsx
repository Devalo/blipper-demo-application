import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import fire from '../../config/fire';

interface ILogin {
  email: string;
  password: string;
}

const Login = () => {
  const [noUser, setNoUser] = useState('');
  const {
    register, handleSubmit, errors, reset,
  } = useForm();

  const onSubmit = async (data: ILogin) => {
    try {
      await fire.auth().signInWithEmailAndPassword(data.email, data.password);
    } catch (err) {
      setNoUser('Brukernavn eller passord er feil');
    }
  };

  console.log(noUser);

  return (
    <div>
      <main className="form-signin">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="h3 mb-3 fw-normal">Logg inn</h1>
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
          {noUser}
          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
          >
            Logg inn
          </button>
          <Link to="/registrer">Registrer ny bruker</Link>
        </form>
      </main>
    </div>
  );
};

export default Login;
