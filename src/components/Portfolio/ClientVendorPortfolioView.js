import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class ClientVendorPortfolioView extends Component {
 
  componentDidMount(){ 
    this.props.dispatch({ type: 'FETCH_PORTFOLIO' })
  }
  // this function will route us to the task page
  navigate = (web_address, project) => {    
    document.cookie = `project=${project.id}`;
    this.props.dispatch({ type: 'FETCH_PROJECT', payload: project.id })    
    this.props.history.push(web_address);
  };

  // returns the date in the day/month/year format
  dateConversion = date => {
    // console.log(...date);
    let year = date[0]+date[1]+date[2]+date[3];
    let month = date[5]+date[6];
    let day = date[8]+date[9];
    return( day + "/" + month + "/" + year);
  }

  render() {
    return (
      <center>
        <div>
           { (this.props.store.user.user_type === "client") ? <h1>Client</h1> : <h1>Contractor</h1> }
          <table>
            <tbody>
              <th><td>Project:</td></th>
              <th><td>Location:</td></th>
              <th><td>PO#:</td></th>
              <th><td>Due Date:</td></th>
              <th><td>Status:</td></th>
              {this.props.store.portfolio.map((project, index) => {
                return <tr key={index} onClick={ () => this.navigate("/project", project)}>    
                          <td><label>{project.project_name}</label> </td>          
                          <td><label>{project.location_name}</label></td>
                          <td><label>{project.PO_Number}</label></td>
                          <td>{this.dateConversion(project.due_date)}</td> 
                          <td><input value='Logic needs to be done'/></td>
                        </tr>
              })}
            </tbody>
          </table>
        </div>
      </center>
    );
  }
}

export default connect(mapStoreToProps)(ClientVendorPortfolioView);