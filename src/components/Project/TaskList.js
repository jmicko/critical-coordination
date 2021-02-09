import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

const getCookie = (cookieName) => {
    // Get name followed by anything except a semicolon
    const cookieString = RegExp('' + cookieName + '[^;]+').exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./, '') : '');
  }

class TaskList extends Component {
    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_PROJECT_TASKS', payload: getCookie('project') })
    }

  render() {
    return (      
        <div className="container paper">
            <h3>Task List</h3>
            {this.props.store.projectReducer.projectTaskReducer.map((task) => {
                return <div key={task.id}>
                        <p> {task.task_name}</p>
                        </div>
            })}

                                        
        </div>

      
    );
  }
}

export default connect(mapStoreToProps)(TaskList);