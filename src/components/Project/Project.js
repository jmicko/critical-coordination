import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
//imported Components
import TaskList from './TaskList';
import ProjectTitle from './ProjectTitle';
import AddNewTask from '../AddNewTask/AddNewTask';


class Project extends Component {

  render() {
    return (
      <div>
        <ProjectTitle/>
        <br></br>
        {this.props.store.user.user_type === 'admin' &&
        <AddNewTask/>}
        <br></br>
        <TaskList/>  
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Project);