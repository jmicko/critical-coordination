import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Popup from 'reactjs-popup';
import AddNewProject from '../AddNewProject/AddNewProject';


class ExecutivePortfolioView extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_PORTFOLIO' })
    }

    state = {
        project_id: '',
        location_id: '',
        project_name: '',
        location_name: '',
        PO_Number: '',
        due_date: '',
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    // Each time a person clicks on a different project this changes 
    // the ID so that you update the right one
    updateId = (project) => {
        this.setState({ project_id: project.id })
        this.setState({ location_id: project.location_fk })
    }

    // update the database and then get the info from the update DB
    update = () => {
        this.props.dispatch({ type: 'UPDATE_PORTFOLIO', payload: this.state });
        this.props.dispatch({ type: 'GET_PORTFOLIO' })
    }
    // this function will route us to the task page
    navigate = (web_address, project) => {
        document.cookie = `project=${project.id}`;
        this.props.dispatch({ type: 'FETCH_PROJECT', payload: project.id })
        // console.log(project.id); //this is logging the project whic has the ID to make the redux call with for the project view.
        this.props.history.push(web_address);

        // this.props.history.push(web_address);
    };

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
                <h1> Executive Portfolio Page </h1>
                <button>
                    Add New Project
                </button>
                <AddNewProject />
                <table className="table td">
                    <thead>
                        <tr position='align-left'>
                            <th>Project:</th>
                            <th>Location:</th>
                            <th>PO#:</th>
                            <th>Due Date:</th>
                            <th>Status:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.store.portfolio.map((project) => {
                            return <tr key={project.id} onClick={() => this.navigate(`/project`, project)}>
                                <td><label>{project.project_name}</label> </td>
                                <td><label>{project.location_name}</label></td>
                                <td><label>{project.PO_Number}</label></td>
                                <td>{this.dateConversion(project.due_date)}</td>
                                <td><input placeholder='Logic needs to be done' /></td>
                                <td>
                                    <Popup trigger={<button>Edit</button>} position="center" >
                                        <div className="editPanel" onClick={() => this.updateId(project)}>
                                            <h3>Edit Window:</h3>
                                            <label>Project:</label>
                                            <input placeholder={project.project_name} onChange={this.handleChange('project_name')} />
                                            <label>Location:</label>
                                            <input placeholder={project.location_name} onChange={this.handleChange('location_name')} />
                                            <label>PO#:</label>
                                            <input placeholder={project.PO_Number} onChange={this.handleChange('PO_Number')} />

                                            {/* Edit the date/calendar to show the date which is coming from the DB and not todays date */}
                                            <label>Due Date:</label>
                                            <input type="date" onChange={this.handleChange('due_date')} placeholder={project.due_date} />

                                            <button onClick={this.update}>Save</button>
                                        </div>
                                    </Popup>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </center>
        );
    }
};


export default connect(mapStoreToProps)(ExecutivePortfolioView);

