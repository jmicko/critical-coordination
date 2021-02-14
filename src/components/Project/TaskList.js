import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddNewTask from '../AddNewTask/AddNewTask';
import AdminTaskList from './AdminTaskList/AdminTaskList'
import ContractorTaskList from './ContractorTaskList'
import ClientTaskList from './ClientTaskList'

const getCookie = (cookieName) => {
  // Get name followed by anything except a semicolon
  const cookieString = RegExp('' + cookieName + '[^;]+').exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./, '') : '');
}

class TaskList extends Component {
  state = {
    showAddTask: false,
  };

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_PROJECT_TASKS', payload: getCookie('project') })
    this.props.dispatch({ type: 'FETCH_TASKSTATUS' });
  }

  showAddTask = () => {
    this.setState({
      showAddTask: !this.state.showAddTask
    })
  }

  render() {
    return (
      <div className="container night rounded">
        {this.props.store.user.user_type === 'admin' &&
          <div>
            {!this.state.showAddTask &&
              <button
                className="btn"
                onClick={this.showAddTask}>
                Add Task
              </button>
            }
            {this.state.showAddTask && <AddNewTask showAddTask={this.showAddTask} />}
          </div>
        }
        <h3>Task List</h3>
        {this.props.store.task.projectTaskReducer.map((task, index) => {
          return <div key={index}>
            {this.props.store.user.user_type === 'admin' && <AdminTaskList task={task} />}
            {this.props.store.user.user_type === 'contractor' && <ContractorTaskList task={task} />}
            {this.props.store.user.user_type === 'client' && <ClientTaskList task={task} />}
          </div>

        })}
      </div>


    );
  }
}

export default connect(mapStoreToProps)(TaskList);