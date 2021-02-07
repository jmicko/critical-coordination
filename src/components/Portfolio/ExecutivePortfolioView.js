import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Popup from 'reactjs-popup';


class ExecutivePortfolioView extends Component {

    componentDidMount(){ 
        this.props.dispatch({ type: 'GET_PORTFOLIO', payload: this.props.store.user?.company_fk })
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

updateId = (project) => {
    this.setState({project_id: project.id})
    this.setState({location_id: project.location_fk})
}

update = () => { 
    this.props.dispatch({ type: 'UPDATE_PORTFOLIO', payload: this.state });  
    this.props.dispatch({ type: 'GET_PORTFOLIO', payload: this.props.store.user?.company_fk })  
}

    render() {
        console.log(this.state);
        return (
            <>
                <h1> Executive Portfolio Page </h1>
                <table>
                    <tbody className="table td">
                    <th><td>Project:</td></th>
                    <th><td>Location:</td></th>
                    <th><td>PO#:</td></th>
                    <th><td>Due Date:</td></th>
                    <th><td>Status:</td></th>
                        {this.props.store.portfolio.map((project) => {
                            return <tr key={project.id}>
                                        <td><input value={project.project_name}/></td>
                                        <td><input value={project.location_name}/></td>
                                        <td><input value={project.PO_Number}/></td>
                                        <td><input value={project.due_date}/></td>
                                        <td><input value='Logic needs to be done'/></td>                                    
                                        <td>
                                            <Popup trigger={<button>Edit</button>} position="center" >
                                                <div className="editPanel" onClick={ () => this.updateId(project) }>
                                                    <input placeholder={project.project_name} onChange={this.handleChange('project_name')}/> 
                                                    <input placeholder={project.location_name} onChange={this.handleChange('location_name')}/> 
                                                    <input placeholder={project.PO_Number} onChange={this.handleChange('PO_Number')}/> 
                                                    {/* <input placeholder={format(project.due_date, "m/dd/yy")} onChange={this.handleChange('due_date')}/>     */}
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