import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class AddNewProject extends Component {

componentDidMount(){
   this.props.dispatch({type: 'FETCH_ALLCOMPANY'});
   this.props.dispatch({type: 'FETCH_ALLLOCATION'});
}
   state = {
      newProject: {
         project_name: '',
         company: '',
         location: '',
         PO: '',
         due_date: '',
      }
   };
   
   componentDidUpdate(prevProps){
      
   }

   handleChange = (event, type) => {
      this.setState({
         newProject: {
            ...this.state.newProject,
            [type]: event.target.value
         }
      })
   }

   saveProject = () => {
      if (this.state.newProject.company !== '' && this.state.newProject.location !== '' 
         && this.state.newProject.PO !== '' && this.state.newProject.due_date !== '' && this.state.newProject.project_name !== ''){
         this.props.dispatch( {type: 'ADMIN_ADD_PROJECT', payload: this.state.newProject});
            // 
      } else {
         alert('Please fill out all fields before Saving a New Project')
      }
   }

   render() {
      return (
         <div className="slate notched">
            {JSON.stringify(this.props.store.projectReducer)}
            <h4>Add New Project</h4>
            <label> New Project Company:
               <select required onChange={(event) => this.handleChange(event, 'company')} value={this.state.newProject.company}>
                  {this.props.store.admin.allCompanyReducer.map((company) => {
                     return (
                        <option key={company.id} value={company.id}>{company.company_name}</option>)
                  })}
               </select>
            </label>
            <label> New Project Location:
               <select required onChange={(event) => this.handleChange(event, 'location')} value={this.state.newProject.location}>
                  <option></option>
                  {this.props.store.admin.allLocationReducer.map( (location) => {
                     return (
                        this.state.newProject.company == location.company_fk &&
                           <option key={location.id} value={location.id}>{location.location_name} : {location.address}</option>
                     )
                  })}
               </select><br/>
            </label>
            <label> Project Name:
               <input type="text" onChange={(event) => this.handleChange(event, 'project_name')} value={this.state.newProject.project_name}></input>
            </label>
            <label> PO Number:
               <input type="text" onChange={(event) => this.handleChange(event, 'PO')} value={this.state.newProject.PO}></input>
            </label>
            <label> Project Due Date:
               <input type="Date" onChange={(event) => this.handleChange(event, 'due_date')} value={this.state.newProject.due_date}></input>
            </label>
            <br/>
            <button onClick={this.saveProject}>Save Project</button>
         </div>
      );
   }
}

export default connect(mapStoreToProps)(withRouter(AddNewProject));
