import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
//imported Components
import ProjectTitle from './ProjectTitle/ProjectTitle';



class Project extends Component {

  render() {
    return (
      <div>
        <ProjectTitle/>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Project);