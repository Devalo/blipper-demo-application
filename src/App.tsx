import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BlipFeed from './components/blips/BlipFeed';
import './App.css';
import Layout from './components/layout/Layout';
import Register from './components/session/Register';
import Login from './components/session/Login';
import Profile from './components/profile/Profile';
import ListUsers from './components/users/ListUsers';
import ShowUser from './components/users/ShowUser';
import EditProfile from './components/profile/EditProfile';
import fire from './config/fire';

function App() {
  const [signedIn, setSignedIn] = useState<boolean>();

  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });

  return (
    <Router>
      <div className="App">
        <Layout>
          <div className="main-container">

            {signedIn
              ? (
                <Switch>
                  <Route path="/brukere/:id">
                    <ShowUser />
                  </Route>
                  <Route path="/brukere">
                    <ListUsers />
                  </Route>

                  <Route path="/min-side/rediger">
                    <EditProfile />
                  </Route>
                  <Route path="/min-side">
                    <Profile />
                  </Route>

                  <Route path="/">
                    <BlipFeed />
                  </Route>

                </Switch>
              )
              : (
                <Switch>
                  <Route path="/registrer">
                    <Register />
                  </Route>

                  <Route path="/">
                    <Login />
                  </Route>

                </Switch>
              )}

          </div>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
