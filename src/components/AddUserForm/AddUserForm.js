import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './AddUserForm.css'

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class AddUserForm extends Component {
   state = {
      newUser: {
         email: '',
         company: '',
         first_name: '',
         last_name: '',
         password: '',
         user_type: '',
      }
   };

   handleChange = (event, type) => {
      this.setState({
         newUser: {
            ...this.state.newUser,
            [type]: event.target.value
         }
      })
   }

   addUser = (event) => {
      event.preventDefault();
      let user = this.state.newUser;
      if(user.email !== '' && user.company !== '' 
      && user.first_name !== '' && user.last_name !== '' 
      && user.password !== '' && user.user_type !== '') {
         console.log('in addUser');
         this.props.dispatch( {type: 'ADMIN_ADD_USER', payload: user})
      } else {
         alert ('Please ensure all fields are filled before submitting')
      }
      this.setState({
         newUser: {
            email: '',
            company: '',
            first_name: '',
            last_name: '',
            password: '',
            user_type: '',
         }
      })
   }

   render() {
      return (
         <div>
            <h4>Add New User</h4>
            <form>
               <input required placeholder="email" onChange={(event) => this.handleChange(event, 'email')} value={this.state.newUser.email}></input>
               <select required onChange={(event) => this.handleChange(event, 'company')} value={this.state.newUser.company}>
                  {this.props.store.admin.allCompanyReducer.map( (company) => {
                     return (
                        <option key={company.id} value={company.id}>Company: {company.company_name}</option>)})}
               </select>
               <input required placeholder="First Name" onChange={(event) => this.handleChange(event, 'first_name')} value={this.state.newUser.first_name}></input>
               <input required placeholder="Last Name" onChange={(event) => this.handleChange(event, 'last_name')} value={this.state.newUser.last_name}></input>
               <input required placeholder="password" onChange={(event) => this.handleChange(event, 'password')} value={this.state.newUser.password}></input>
               <select required placeholder="user type" onChange={(event) => this.handleChange(event, 'user_type')} value={this.state.newUser.user_type}>
                  <option value="">User Type: </option>
                  <option value="client">User Type: Client</option>
                  <option value="contractor">User Type: Contractor</option>
                  <option value="admin">User Type: Admin</option>
               </select>
               <button className="button" type="submit" onClick={(event) => this.addUser(event)}>Add User</button>
            </form>
         </div>
      );
   }
}

export default connect(mapStoreToProps)(AddUserForm);
