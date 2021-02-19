import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
const getCookie = (cookieName) => {
    // Get name followed by anything except a semicolon
    const cookieString = RegExp('' + cookieName + '[^;]+').exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./, '') : '');
}



class AddNewTask extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PROJECT', payload: getCookie('project') });
        this.props.dispatch({ type: 'FETCH_ALLCOMPANY' });
        this.props.dispatch({ type: 'FETCH_TASKSTATUS' });
    }

    state = {
        newTask: {
            type: '',
            company: '',
            updated_by: `${this.props.store.user.first_name} ${this.props.store.user.last_name}`,
            notes: '',
            project: getCookie('project'),
            due_date: '',
            status: '',
            tracking_number: '',
        }
    };

    handleChange = (event, name) => {
        this.setState({
            newTask: {
                ...this.state.newTask,
                [name]: event.target.value
            }
        });
    }

    addTask = () => {
        if (this.state.newTask.type !== '' &&
            this.state.newTask.company !== '' &&
            this.state.newTask.due_date !== '' &&
            this.state.newTask.status !== '') {
            this.props.dispatch({ type: 'ADMIN_ADD_TASK', payload: this.state.newTask })
            this.setState({
                newTask: {
                    type: '',
                    company: '',
                    updated_by: `${this.props.store.user.first_name} ${this.props.store.user.last_name}`,
                    notes: '',
                    project: getCookie('project'),
                    due_date: '',
                    status: '',
                    tracking_number: '',
                }
            })
        } else {
            alert('please fill out all fields before saving a new task')
        }
    }

    render() {
        // console.log(this.state);
        return (
            <div className="container metal rounded">
                <h3> Add New Task </h3>
                <form>
                    {/* TASK TYPE */}
                    <label>Task Type:
                        <select value={this.state.newTask.type} onChange={(event) => this.handleChange(event, 'type')}>
                            <option value=''></option>
                            <option value="1">Materials</option>
                            <option value="2">Install</option>
                            <option value="3">Invoice</option>
                            <option value="4">Custom</option>
                        </select>
                    </label>

                    {/* ASSIGNED TO */}
                    <label>Company Assigned:
                        <select value={this.state.newTask.company} onChange={(event) => this.handleChange(event, 'company')}>
                            <option value=''></option>
                            {this.props.store.admin.allCompanyReducer.map((company) => {
                                return <option key={company.id} value={company.id}>{company.company_name}</option>
                            })}
                        </select>
                    </label><br/>

                    {/* DUE DATE */}
                    <label> Due Date:
                        <input value={this.state.newTask.due_date} onChange={(event) => this.handleChange(event, 'due_date')} type="date"></input>
                    </label><br/>

                    {/* STATUS */}
                    <label> Status:
                        <select value={this.state.newTask.status} onChange={(event) => this.handleChange(event, 'status')}>
                            <option value=''></option>
                            {this.props.store.admin.taskStatusReducer.map((status) => {
                                return <option key={status.id} value={status.id}>{status.status_type}</option>
                            })}
                        </select>
                    </label><br/>

                    {/* TRACKING NUMBER */}
                    {/* render tracking number if "materials" task type is selected */}
                    {this.state.newTask.type === '1' &&
                        <label> Tracking Number:
                        <input
                                value={this.state.newTask.tracking_number}
                                onChange={(event) => this.handleChange(event, 'tracking_number')}
                                placeholder="UPS or FEDEX"
                            ></input> <br/>
                        </label>
                    }

                    {/* NOTES */}
                    <label> Notes:
                            <textarea placeholder="...any specific details about the task go here"
                            className="notes" type="text" cols="60" rows="5"
                            value={this.state.newTask.notes}
                            onChange={(event) => this.handleChange(event, 'notes')} />
                    </label>

                    {/* BUTTONS */}
                    <div className="new-task-buttons">
                        {/* SUBMIT */}
                        <button
                            className="btn"
                            onClick={(event) => this.addTask(event)}
                            type="submit"
                        >
                            Add Task
                        </button>
                        {/* CANCEL */}
                        <button
                            className="btn"
                            onClick={this.props.showAddTask}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};


export default connect(mapStoreToProps)(AddNewTask);