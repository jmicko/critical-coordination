import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Popup from 'reactjs-popup';


class ExecutivePortfolioView extends Component {
  state = {
    project_name: '',
    location_name: '',
    PO_Number: '',
    due_date: '',
  };

handleChange = name => event => {
    this.setState({ [name]: event.target.value });    
}

update = () => {
    this.props.dispatch({ type: 'UPDATE_PORTFOLIO', payload: this.state });    
}

    render() {
        return (
            <>
                <h1> Executive Portfolio Page </h1>
                <table>
                    <tbody>
                        {this.props.store.portfolio.map((project, index) => {
                            return <tr key={index}>              
                                        <td><input value={project.project_name}/></td>
                                        <td><input value={project.location_name}/></td>
                                        <td><input value={project.PO_Number}/></td>
                                        <td><input value={project.due_date}/></td>
                                        <td><input value='Logic needs to be done'/></td>
                                        <td><Popup trigger={<button>Edit</button>} closeOnButtonClick position="center" >
                                                <div className="editPanel">
                                                    <input placeholder={project.project_name} onChange={this.handleChange('project_name')}/>
                                                    <input placeholder={project.location_name} onChange={this.handleChange('location_name')}/> 
                                                    <input placeholder={project.PO_Number} onChange={this.handleChange('PO_Number')}/> 
                                                    <input placeholder={project.due_date} onChange={this.handleChange('due_date')}/>    
                                                 <button onClick={this.update}>Save</button>
                                                </div>
                                            </Popup>
                                        </td>
                                    </tr>
                        })}                        
                    </tbody>
                </table> 
            </>
        );
    }
};


export default connect(mapStoreToProps)(ExecutivePortfolioView);