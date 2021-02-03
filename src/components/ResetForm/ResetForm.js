import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';



class ResetForm extends Component {
   state = {
      email: '',
   };

 validateEmail = (email) => {
   if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      return (true)
   }
   alert("You have entered an invalid email address!")
   return (false)
   }

   submitReset = (event) => {
         event.preventDefault();
         if (this.validateEmail(this.state.email)) {
            this.props.dispatch({
               type: 'RESET_PASSWORD',
               payload: { email: this.state.email } } );
               alert(`If ${this.state.email} matches a user in our system, a password reset request will be sent shortly to that email address. Please check the email and follow any directions contained within.`);
            this.setState( { email: ''} )
         }
   }; // end registerUser

   handleInputChangeFor = (propertyName) => (event) => {
      this.setState({
         [propertyName]: event.target.value,
      });
   };

   render() {
      return (
         <form className="formPanel" onSubmit={this.registerUser}>
            <h2>Reset Password</h2>
            {this.props.store.errors.registrationMessage && (
               <h3 className="alert" role="alert">
                  {this.props.store.errors.registrationMessage}
               </h3>
            )}
            <div>
               <label htmlFor="username">
                  Registered Email:
            <input
                     type="text"
                     name="username"
                     value={this.state.email}
                     required
                     onChange={this.handleInputChangeFor('email')}
                  />
               </label>
            </div>
            <div>
               
            </div>
            <div>
               <input 
                  className="btn" 
                  type="submit" 
                  name="submit" 
                  value="Request Reset" 
                  onClick={this.submitReset}
               />
            </div>
         </form>
      );
   }
}



export default connect(mapStoreToProps)(ResetForm);
