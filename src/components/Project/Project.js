import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
//imported Components
import TaskList from './TaskList';
import ProjectTitle from './ProjectTitle';
import AddNewTask from '../AddNewTask/AddNewTask';
import TrackingApi from '../TrackingApi/TrackingApi'


class Project extends Component {

  render() {
    return (
      <div>
        <ProjectTitle/>
        <br></br>
        <TaskList/>  
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Project);