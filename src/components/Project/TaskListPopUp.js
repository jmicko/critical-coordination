import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Popup from 'reactjs-popup';


class TaskListPopUp extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
      <div>
        <Popup trigger={ open => (<button>Edit</button>)}>
            <div className="editPanel">
            <h3>Edit:</h3>           
                      <h4>you can edit from this popup</h4>          
            </div>
        </Popup>                            
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TaskListPopUp);