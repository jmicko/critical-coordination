import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './Portfolio.css'
import Popup from 'reactjs-popup';
import AddNewProject from '../AddNewProject/AddNewProject';


class Portfolio extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_PORTFOLIO' });
    this.props.dispatch({ type: 'FETCH_ALLLOCATION' });
  }

  state = {
    project_id: '',
    project_name: '',
    location_name: '',
    PO_Number: '',
    due_date: '',
    showAddNewProject: false,
    location_fk: '',
    status: 'complete'
  };

  fieldValidation = () => {
    if (this.state.project_id &&
      this.state.project_name &&
      this.state.location_name &&
      this.state.PO_Number &&
      this.state.due_date &&
      this.state.location_fk
    ) {
      { this.update() };
    } else {
      alert('Please fill out all the fields');
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }
  // Each time a person clicks on a different project this changes 
  // the ID so that you update the right one
  updateId = (project) => {
    this.setState({ project_id: project.id });
    this.setState({ location_fk: project.location_fk });
  }

  // update the database and then get the info from the updated DB
  update = () => {
    this.props.dispatch({ type: 'UPDATE_PORTFOLIO', payload: this.state });
    this.props.dispatch({ type: 'FETCH_PORTFOLIO' });
  }
  // this function will route us to the task page
  navigate = (web_address, project) => {
    document.cookie = `project=${project.id}`;
    this.props.dispatch({ type: 'FETCH_PROJECT', payload: project.id });
    this.props.history.push(web_address);
  };

  // returns the date in the day/month/year format
  dateConversion = date => {
    let year = date[0] + date[1] + date[2] + date[3];
    let month = date[5] + date[6];
    let day = date[8] + date[9];
    return (day + "/" + month + "/" + year);
  }

  showAdd = () => {
    this.setState({
      showAddNewProject: !this.state.showAddNewProject,
    })
  }

  render() {
    // console.log(this.state);
    return (
      <div className="container portfolio night rounded">
        {/* THIS WILL RENDER IF ADMIN */}
        {this.props.store.user.user_type === "admin"
          ?
          <div>
            <h1> Executive Portfolio Page </h1>
            <button
              className="btn"
              onClick={this.showAdd}>
              Add New Project
                    </button>

            {this.state.showAddNewProject && <AddNewProject />}
          </div>
          // END ADMIN
          // RENDER CLIENT PAGE IF CLIENT
          : this.props.store.user.user_type === "client"
            ? <h1> Client Portfolio Page </h1>
            // RENDER CONTRACTOR IF CONTRACTOR
            : <h1> Contractor Portfolio Page </h1>
        }

        {this.props.store.portfolio.map((project) => {
          return (
            <div
              key={project.id}
              // class names will render based on task status
              className={`
                        project-item 
                        ${this.state.status === "onTime" && "on-time"}
                        ${this.state.status === "attention" && "attention"}
                        ${this.state.status === "late" && "late"}
                        ${this.state.status === "complete" && "complete"}
                    `}
            >
              {/* div to hold status bar. clicking a button will 
                        change the status and color will update */}
              <div className="status-bar">
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
              </div>
              <div className="project-details"
                onClick={() => this.navigate(`/project`, project)}
              >
                <div className="project-name">
                  <h2>{project.project_name}</h2>
                </div>

                <p>Location: {project.location_name}</p>

                <p>PO#: {project.PO_Number}</p>

                <p>Due Date: {this.dateConversion(project.due_date)}</p>

                {/* <label>Status: <input placeholder='Logic needs to be done' /></label> */}

                {this.props.store.user.user_type === "admin" &&
                  <Popup trigger={open => (<button className="btn">Edit </button>)} position="left" >
                    <div className="editPanel" onClick={() => this.updateId(project)}>
                      <h3>Edit Window:</h3>
                      <label>Project:</label>
                      <input placeholder={project.project_name} onChange={this.handleChange('project_name')} />
                      <label>Location:</label>
                      <select onChange={this.handleChange('location_name')}>
                        {this.props.store.admin.allLocationReducer.map((location) => <option key={location.address} value={location.location_name}>{location.location_name}</option>)}
                      </select>
                      <label>PO#:</label>
                      <input placeholder={project.PO_Number} onChange={this.handleChange('PO_Number')} />
                      <label>Due Date:</label>
                      <input type="date" onChange={this.handleChange('due_date')} placeholder={project.due_date} />
                      <button onClick={this.fieldValidation}>Save</button>
                    </div>
                  </Popup>
                }
              </div>
            </div>
          )
        })}
      </div >
    );
  }
}

export default connect(mapStoreToProps)(Portfolio);