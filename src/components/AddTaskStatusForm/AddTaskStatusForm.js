import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class AddTaskStatusForm extends Component {
   state = {
      newStatus: {
         status_type: '',
      }
   };

   handleChange = (event, type) => {
      this.setState({
         newStatus: {
            ...this.state.newStatus,
            [type]: event.target.value
         }
      })
   }

   addStatus = (event) => {
      event.preventDefault();
      let status = this.state.newStatus;
      if (status.status_type !== '') {
         console.log('in addStatus');
         this.props.dispatch({ type: 'ADMIN_ADD_STATUS', payload: status })
      } else {
         alert('Please ensure all fields are filled before submitting')
      }
      this.setState({
         newStatus: {
            status_type: '',
         }
      })
   }

   render() {
      return (
         <div>
            <h4>Add New Status</h4>
            <form>
               <label>New Status Type: </label>
               <input required onChange={(event) => this.handleChange(event, 'status_type')} value={this.state.newStatus.status_type}></input>  
               <button className="button" type="submit" onClick={(event) => this.addStatus(event)}>Add User</button>
            </form>
         </div>
      );
   }
}

export default connect(mapStoreToProps)(AddTaskStatusForm);
