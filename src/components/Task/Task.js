import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name Task with the name for the new
// component.
class Task extends Component {

  state = {
    // toggle edit mode on and off to conditionally render input fields or static elements
    edit: false
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
      payload: 2
    });
  }

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleEditButton = () => {
    this.setState({ edit: !this.state.edit })
  }


  render() {
    return (
      <div className="container">
        <h2>Task Page</h2>
        <p>
          Task store: {JSON.stringify(this.props.store.task)}
        </p>
        <p>
          Local state: {JSON.stringify(this.state)}
        </p>
        <button onClick={() => this.navigate('/portfolio')} >Button to the portfolio page</button>
        <div className="taskPanel">
          {this.state.edit
            ?
            <form>
              <label htmlFor="task_id">
                Task ID:
              <input
                  type="text"
                  name="task_id"
                  value={this.props.store.task.id}
                  required
                  onChange={this.handleInputChangeFor('task_id')}
                />
              </label>
              <button onClick={() => this.handleEditButton()}>
                {this.state.edit
                  ? "Save"
                  : "Edit"}
              </button>
            </form>
            : <div>
              <p>Task ID: {this.props.store.task.id}</p>
              <button onClick={() => this.handleEditButton()}>
                {this.state.edit
                  ? "Save"
                  : "Edit"}
              </button>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Task);