import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { setCurrentUser } from '../actions/usersActionCreators';
import { setCurrentAlert, clearCurrentAlert } from '../actions/alertsActionCreators';
import fetchPlus from '../../../helpers/fetch-plus';


import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
    this.resetAlertBar = this.resetAlertBar.bind(this);
  }

  signOut(e) {
    e.preventDefault();

    return fetchPlus('http://localhost:3000/sessions', {
      method: 'DELETE'
    })
      .then(() => {
        this.props.history.push('/sign-in');
        this.props.dispatch(setCurrentUser(null));
        this.props.dispatch(setCurrentAlert('success', 'Successfully logged out.'));
      })
      .catch(e => console.error(e));
  }

  resetAlertBar() {

    if (this.props.currentAlert) {
      this.props.dispatch(clearCurrentAlert());
    }
  }

  render() {
    const { currentUser } = this.props;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" href="#" to="/">Navbar</Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {
                currentUser && <li className="nav-item active d-flex align-items-center mx-3">
                  <span className="font-weight-bold">
                    {currentUser.email}
                  </span>
                </li>
              }
              {
                !currentUser && <li className="nav-item active">
                  <Link className="nav-link" href="#" to="/sign-in" onClick={this.resetAlertBar}>Sign In</Link>
                </li>
              }
              {
                !currentUser && <li className="nav-item active">
                  <Link className="nav-link" href="#" to="/sign-up" onClick={this.resetAlertBar}>Sign Up</Link>
                </li>
              }
              {
                currentUser && <li className="nav-item active">
                  <a className="nav-link" href="#" onClick={this.signOut}>Sign Out</a>
                </li>
              }
              {/*
                  <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                  </li>
                  <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                  </li>
                  <li className="nav-item">
                  <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                  </li>
              */}

            </ul>
            {/*
            <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            */}

          </div>
        </nav>
    );
  }
}

NavBar.propTypes = {
  currentUser: PropTypes.object
}

export default withRouter(NavBar);
