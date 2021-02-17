import React, { Component } from 'react';
import {
  HashRouter as Router,
  //Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserPage from '../UserPage/UserPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AdminPage from '../AdminPage/AdminPage';
import ResetPage from '../ResetPage/ResetPage';
import ResetLinkPage from '../resetLinkPage/ResetLinkPage';
import Portfolio from '../Portfolio/Portfolio';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import Task from '../Task/Task';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/login" />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
              component={UserPage}
            />
            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect: if logged in, redirects to "/user" else shows LoginPage at /login
              exact path="/login"
              component={LoginPage}
              authRedirect="/portfolio"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact path="/registration"
              component={RegisterPage}
              authRedirect="/user"
            />
            <ProtectedRoute
              exact path="/adminpage"
              component={AdminPage}
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              component={LoginPage}
              authRedirect="/portfolio"
            />
            <ProtectedRoute
              exact
              path="/forgotpassword"
              component={ResetPage}
              authRedirect="/portfolio"
            />
            <ProtectedRoute
              exact path="/resetpassword"
              component={ResetLinkPage}
              authRedirect="/portfolio"
              />
            <ProtectedRoute
              exact
              path="/portfolio"
              component={Portfolio}
            />
            <ProtectedRoute
              exact path="/task"
              component={Task}
            />
            <ProtectedRoute
              exact path="/projectdetails"
              component={ProjectDetails}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
