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
    archiveMode: false,
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
    
    viewArchive = () => {
      if (!this.state.archiveMode) {
        console.log("archive mode", this.state.archiveMode);
        this.props.dispatch({ type: 'FETCH_ARCHIVE' });
      } else {
        console.log("NOT archive mode", this.state.archiveMode);
        this.props.dispatch({ type: 'FETCH_PORTFOLIO' });
      }
      this.setState({
        archiveMode: !this.state.archiveMode
      });
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
    return (month + "/" + day + "/" + year);
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
        <center className="metal notched box">
          <h1 className="bigHeader"> Project Portfolio </h1>
        </center>
        {/* THIS WILL RENDER IF ADMIN */}
        {this.props.store.user.user_type === "admin" &&
          <div className="flex archive">
            {!this.state.archiveMode 
            ?
            <button
            className="btn"
            onClick={this.showAdd}>
              Add New Project
            </button>
            :

            <div className="ghost"></div>
              }
            <button
            className="btn"
            onClick={this.viewArchive}>
            {this.state.archiveMode 
             ? "Back to Current Projects"
             : "View Archive"
            }
            </button>
          </div>
        }
        {this.state.showAddNewProject && this.props.store.user.user_type === "admin" && <AddNewProject />}

        {this.props.store.portfolio.map((project) => {
          return (
            <Project
              key={project.id}
              project={project}
              dateConversion={this.dateConversion}
              history={this.props.history}
              archiveMode={this.state.archiveMode}
            />
          )
        })}
      </div >
    );
  }
}

export default connect(mapStoreToProps)(Portfolio);