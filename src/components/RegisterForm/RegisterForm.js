import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class RegisterForm extends Component {
  state = {
    email: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        email: this.state.email,
        password: this.state.password,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="formPanel night rounded" onSubmit={this.registerUser}>
        <h2>Register User</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              value={this.state.email}
              required
              onChange={this.handleInputChangeFor('email')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor('password')}
            />
          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Register" />
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);
