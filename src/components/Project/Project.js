import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
//imported Components
import TaskList from './TaskList';
import ProjectTitle from './ProjectTitle';
<<<<<<< HEAD
import AddNewTask from '../AddNewTask/AddNewTask';
import TrackingApi from '../TrackingApi/TrackingApi'
=======
>>>>>>> master


class Project extends Component {

  render() {
    return (
      <div>
        <ProjectTitle/>
        <br></br>
        <TaskList/>  
        <TrackingApi/>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Project);