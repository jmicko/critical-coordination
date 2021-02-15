import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
// import ProjectDetails from './ProjectDetails/ProjectDetails';
import PortfolioStatus from '../PortfolioStatus/PortfolioStatus';
import Popup from 'reactjs-popup';


class Project extends Component {

  state = {
    edit: '',
    project_id: '',
    project_name: '',
    location_name: '',
    PO_Number: '',
    due_date: '',
    showAddNewProject: false,
    location_fk: '',
    status: 'complete'
  }

  updateStatus = (newStatus) => {
    this.setState({
      status: newStatus
    })
  }

  updateId = (project) => {
    this.setState({ project_id: project.id });
    this.setState({ location_fk: project.location_fk });
  }

  // this function will route us to the task page
  navigate = (web_address, project) => {
    document.cookie = `project=${project.id}`;
    this.props.dispatch({ type: 'FETCH_PROJECT', payload: project.id });
    this.props.history.push(web_address);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  render() {
    return (
      <div
        // key={this.props.project.id}
        // class names will render based on task status
        className={`
                        project-item 
                        ${this.state.status === "onTime" && "on-time"}
                        ${this.state.status === "attention" && "attention"}
                        ${this.state.status === "late" && "late"}
                        ${this.state.status === "complete" && "complete"}
                    `}
      >
        <PortfolioStatus
          status={this.state.status}
          updateStatus={this.updateStatus} />


        <div className="project-details">
          <div className="highlighter">
            <h2>{this.props.project.project_name}</h2>
          </div>

<<<<<<< HEAD
          <p></p>

=======
          {/* <p>{JSON.stringify(this.props.project)}</p> */}
>>>>>>> master
          <p>Location: {this.props.project.location_name}</p>
          <p>PO#: {this.props.project.PO_Number}</p>
          <p>Due Date: {this.props.dateConversion(this.props.project.due_date)}</p>

          {this.props.store.user.user_type === "admin" &&
            <Popup trigger={open => (<button className="btn">Edit </button>)} position="right" >
              <div className="editPanel" onClick={() => this.updateId(this.props.project)}>
                <h3>Edit Window:</h3>
                <label>Project:</label>
                <input placeholder={this.props.project.project_name} onChange={this.handleChange('project_name')} />
                <label>Location:</label>
                <select onChange={this.handleChange('location_name')}>
                  {this.props.store.admin.allLocationReducer.map((location) => <option key={location.address} value={location.location_name}>{location.location_name}</option>)}
                </select>
                <label>PO#:</label>
                <input placeholder={this.props.project.PO_Number} onChange={this.handleChange('PO_Number')} />
                <label>Due Date:</label>
                <input type="date" onChange={this.handleChange('due_date')} placeholder={this.props.project.due_date} />
                <button onClick={this.fieldValidation}>Save</button>
              </div>
            </Popup>
          }
          <button className="btn" onClick={() => this.navigate(`/projectdetails`, this.props.project)}>Details</button>
          {this.props.store.user.user_type === "admin" &&
            <button className="btn btn-delete">Close Project</button>
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Project);