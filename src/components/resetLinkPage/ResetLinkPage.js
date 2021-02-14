import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import qs from 'query-string';



class ResetLinkPage extends Component {
   state = {
      newPW: '',
      token: ''
   };

   
   componentDidMount(){
      const results = qs.parse(this.props.location.search);
      let token = results.token
      console.log('token is:', token);
      this.setState({
         token: token
      })
   }
   
   submitPassword = (event) => {
      event.preventDefault();
      this.props.dispatch({ type: 'SET_RESET_PASSWORD', payload: { password: this.state.newPW, token: this.state.token }
         });
         alert(`Your password has been reset, please log in with new credentials`);
         this.setState({ newPW: '' })     
         this.props.history.push('/login')
   }; // end registerUser

   handleInputChangeFor = (propertyName) => (event) => {
      this.setState({
         [propertyName]: event.target.value,
      });
   };

   render() {
      return (
         <form className="formPanel night rounded" onSubmit={this.registerUser}>
            <h2>Set New Password</h2>
            {this.props.store.errors.registrationMessage && (
               <h3 className="alert" role="alert">
                  {this.props.store.errors.registrationMessage}
               </h3>
            )}
            <div>
               <label htmlFor="newPassword">
                  New Password:
            <input
                     type="text"
                     name="newPassword"
                     value={this.state.email}
                     required
                     onChange={this.handleInputChangeFor('newPW')}
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
                  value="Submit"
                  onClick={this.submitPassword}
               />
            </div>
         </form>
      );
   }

}


export default connect(mapStoreToProps)(ResetLinkPage);
