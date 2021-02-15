import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './Portfolio.css'
import AddNewProject from '../AddNewProject/AddNewProject';
import Project from '../Project/Project';


class Portfolio extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_PORTFOLIO' });
    this.props.dispatch({ type: 'FETCH_ALLLOCATION' });
  }

  state = {
    edit: '',
    project_id: '',
    project_name: '',
    location_name: '',
    PO_Number: '',
    due_date: '',
    showAddNewProject: false,
    location_fk: '',
    // status: 'complete'
  };

  fieldValidation = () => {
    if (this.state.project_id &&
      this.state.project_name &&
      this.state.location_name &&
      this.state.PO_Number &&
      this.state.due_date &&
      this.state.location_fk
    ) { 
      this.update();
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
            <Project 
              key = {project.id}
              project = {project}
              dateConversion = {this.dateConversion}
              history = {this.props.history}
            />
          )
        })}
      </div >
    );
  }
}

export default connect(mapStoreToProps)(Portfolio);