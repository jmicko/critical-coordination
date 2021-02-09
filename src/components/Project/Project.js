import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import TaskList from './TaskList';
import ProjectTitle from './ProjectTitle';




class Project extends Component {

 

  //          {this.props.store.task.projectTasksReducers.map((task) => { return<div> { task.id }</div>})}

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