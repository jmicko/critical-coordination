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

    // returns the date in the day/month/year format
    dateConversion = date => {
        let year = date[0] + date[1] + date[2] + date[3];
        let month = date[5] + date[6];
        let day = date[8] + date[9];
        return (day + "/" + month + "/" + year);
    }

    render() {
        // console.log(this.state);
        return (
            <center className="container paper">
                <h1> Add New Task </h1>
                <form>
                    <label>Task Type: &nbsp;
                        <select onChange={(event) => this.handleChange(event, 'type')}>
                            <option value=''></option>
                            <option value="1">Materials</option>
                            <option value="2">Install</option>
                            <option value="3">Invoice</option>
                            <option value="4">Custom</option>
                        </select>
                    </label>
                    <label>Company Assigned: &nbsp;
                        <select onChange={(event) => this.handleChange(event, 'company')}>
                            {this.props.store.admin.allCompanyReducer.map((company) => {
                                return <option key={company.id} value={company.id}>{company.company_name}</option>
                            })}
                        </select>
                    </label>
                    <label> Due Date: &nbsp;
                        <input onChange={(event) => this.handleChange(event, 'due_date')} type="date"></input>
                    </label>
                    <br />
                    <label> Task Status: &nbsp;
                        <select onChange={(event) => this.handleChange(event, 'status')}>
                            {this.props.store.admin.taskStatusReducer.map((status) => {
                                return <option key={status.id} value={status.id}>{status.status_type}</option>
                            })}
                        </select>
                    </label>
                    {this.state.newTask.type === '1' &&
                    <label> Tracking Number: &nbsp;
                        <input placeholder="UPS or FEDEX"></input>
                    </label>}
                    <br/>
                    <br/>
                    <label> Notes: &nbsp;
                            <input className="notes" type="text" size="100"></input>
                    </label>
                </form>
            </center>
        );
    }
};


export default connect(mapStoreToProps)(AddNewTask);

