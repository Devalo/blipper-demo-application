/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import fire from '../../config/fire';

const Navigation = () => {
  const [userEmail, setUserEmail] = useState(null);
  fire.auth().onAuthStateChanged((user: any) => {
    if (user) {
      setUserEmail(user.email);
    }
  });
  const signOut = () => {
    fire.auth().signOut();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">BLIPPER</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {fire.auth().currentUser
          && (
          <>
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Veggen
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/min-side" className="nav-link">
                  Min side
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/brukere" className="nav-link">
                  Brukere
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown me-auto">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {userEmail}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <Link to="min-side/rediger" className="dropdown-item">
                      Rediger profil
                    </Link>
                  </li>
                  <li>
                    <span
                      className="dropdown-item"
                      role="button"
                      onClick={signOut}
                      onKeyDown={signOut}
                      tabIndex={0}
                    >
                      Logg ut
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navigation;
