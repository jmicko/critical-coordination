import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './Task.css'

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name Task with the name for the new
// component.
class Task extends Component {

  state = {
    // toggle edit mode on and off to conditionally render input fields or static elements
    edit: false,
    task: {}
  }

  // handle navigation from buttons on page
  navigate = web_address => {
    this.props.history.push(web_address);
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'CLEAR_TASK'
    });
    this.props.dispatch({
      type: 'FETCH_TASK',
      // the payload works for testing purposes, but should become a prop so it can change based on parent
      payload: 2
    });
  }

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      // change the task property for the input being changed
      task: { ...this.state.task, [propertyName]: event.target.value },
    });
  };

  handleEditButton = () => {
    this.state.edit
      // if coming out of edit mode, send changes to task store
      ? this.updateTask()
      // if going into edit mode, put the task store into local state
      : this.setState({
        task: this.props.store.task
      })
      // toggle edit mode
    this.setState({ edit: !this.state.edit })
  }

  updateTask = () => {
    console.log('task will be updated to', this.state.task);
  }


  render() {
    return (
      <div className="container paper">
        <h2>Task Page</h2>
        <p>
          {/* Task store: {JSON.stringify(this.props.store.task)} */}
        </p>
        <p>
          {/* Local state: {JSON.stringify(this.state)} */}
        </p>
        <button onClick={() => this.navigate('/portfolio')} >Button to the portfolio page</button>
        <div>
          {
            this.state.edit
              ?
              // if in edit mode, render form items
              <div>
                <form className="taskPanel">
                  {/* map through the task object based on the array of object keys */}
                  {Object.keys(this.props.store.task).map((taskProperty, i) => {
                    return (
                      <label htmlFor={taskProperty}>
                        Task {taskProperty}:
                        <input
                        // check if the property value is a number, and change the field type if true
                          type={Number(this.state.task[taskProperty])
                            ? "number"
                            : "text"}
                            name={taskProperty}
                            // the object key can determine values of the task object
                            // if there is a value, fill the input. If not, use empty string
                          value={this.state.task[taskProperty]
                            ? this.state.task[taskProperty]
                            : ""}
                          required
                          onChange={this.handleInputChangeFor(taskProperty)}
                        />
                      </label>
                    )

                  })}
                </form>
              </div>
              :
              // if in view mode, render static html elements
              <div className="taskPanel">
                {Object.keys(this.props.store.task).map((taskProperty, i) => {
                  return (
                    <div className="top">
                      <p className="top">Task {taskProperty}: {this.props.store.task[taskProperty]}</p>
                    </div>
                  )
                })}
              </div>
          }
          {/* render a button with text based on current mode */}
          <button onClick={() => this.handleEditButton()}>
            {this.state.edit
              ? "Save"
              : "Edit"}
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Task);