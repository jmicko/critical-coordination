import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
// import ProjectDetails from './ProjectDetails/ProjectDetails';
import PortfolioStatus from '../PortfolioStatus/PortfolioStatus';
// import Popup from 'reactjs-popup';


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
        status = {this.state.status}
        updateStatus = {this.updateStatus} />
        
        {/* div to hold status bar. clicking a button will 
                        change the status and color will update */}
        {/* <div className="status-bar">
                <button
                  onClick={() => this.setState({ status: 'onTime' })}
                  className={`
                    btn-status
                    ${this.state.status === "onTime" && "active"}
                  `}
                >
                  On Time
                </button>
                <button
                  onClick={() => this.setState({ status: 'attention' })}
                  className={`${this.state.status === "attention" && "active"}`}
                >
                  Needs Attention
                </button>
                <button
                  onClick={() => this.setState({ status: 'late' })}
                  className={`
                  ${this.state.status === "late" &&
                    "active"}
                  `}
                >
                  Late
                </button>
                <button
                  onClick={() => this.setState({ status: 'complete' })}
                  className={`
                    btn-status
                    ${this.state.status === "complete" && "active"}
                  `}
                >
                  Complete
                </button>
              </div> */}


        <div className="project-details">
          <div className="project-name">
            <h2>{this.props.project.project_name}</h2>
          </div>

          <p>{JSON.stringify(this.props.project)}</p>

          <p>Location: {this.props.project.location_name}</p>

          <p>PO#: {this.props.project.PO_Number}</p>

          <p>Due Date: {this.props.dateConversion(this.props.project.due_date)}</p>

          {/* <label>Status: <input placeholder='Logic needs to be done' /></label> */}

          {/* {this.props.store.user.user_type === "admin" &&
            <Popup trigger={open => (<button className="btn">Edit </button>)} position="left" >
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
          } */}
          <button className="btn" onClick={() => this.navigate(`/projectdetails`, this.props.project)}>Details</button>
          <button className="btn">Close Project</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Project);