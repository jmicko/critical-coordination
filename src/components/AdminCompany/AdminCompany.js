import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../AdminCompany/AdminCompany.css'

class AdminCompany extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM

  async componentDidMount() {
    // Get's data to populate lists/tables
    this.props.dispatch({ type: 'FETCH_ALLCOMPANY' });
  }

  state = {
    newCompany: {
      company: '',
    }
  };

  handleChange = (event, type) => {
    this.setState({
      newCompany: {
        ...this.state.newCompany,
        [type]: event.target.value
      }
    })
  }

  addCompany = (event) => {
    event.preventDefault();
    let company = this.state.newCompany;
    if (company.company !== '') {
      console.log('in addCompany');
      this.props.dispatch({ type: 'ADMIN_ADD_COMPANY', payload: company })
    } else {
      alert('Please ensure all fields are filled before submitting')
    }
    this.setState({
      showAddUser: false,
      newCompany: {
        company: '',
      }
    })
  }

  showAddCompany = () => {
    this.setState({
      showAddCompany: !this.state.showAddCompany
    })
    console.log('in addCompany');
  }

  render() {
    return (
      <div>
        <h3>Admin Company Page</h3>
        {this.state.showAddCompany ?
          <> <h4>Add New User</h4>
            <form>
              <label>New Company Name: </label>
              <input required onChange={(event) => this.handleChange(event, 'company')} value={this.state.newCompany.company}></input>
              <button className="button" type="submit" onClick={(event) => this.addCompany(event)}>Add Company</button>
            </form><button onClick={this.showAddCompany}>Close</button></>
          : <button onClick={this.showAddCompany}>Add Company</button>}
        <table className="tableClass">
          <thead className="headerClass">
            <tr><th>Company Name</th><th>&nbsp;</th><th>&nbsp;</th></tr>
          </thead>
          <tbody className="bodyClass">
            {this.props.store.admin.allCompanyReducer.map((lineItem, index) => {
              return (
                <tr key={index}>
                  <td>{lineItem.company_name}</td>
                  <td><button className="adminButtonClass">Modify</button></td>
                  <td><button className="adminButtonClass">Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(AdminCompany);
