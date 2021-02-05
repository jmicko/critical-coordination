import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../AdminLocation/AdminLocation.css'

class AdminLocation extends Component {

componentDidMount() {
    this.props.dispatch({type: 'FETCH_ALLLOCATION'});
}

  state = {
    newLocation: {
      company: '',
      address: '',
      location_name: '',
    },
    showAddLocation: false
  };

  handleChange = (event, type) => {
    this.setState({
      newLocation: {
        ...this.state.newLocation,
        [type]: event.target.value
      }
    })
  }

  addLocation = (event) => {
    event.preventDefault();
    let location = this.state.newLocation;
    if (location.company !== '' && location.address !== '' && location.location_name !== '') {
      console.log('in addLocation');
      this.props.dispatch({ type: 'ADMIN_ADD_LOCATION', payload: location })
    } else {
      alert('Please ensure all fields are filled before submitting')
    }
    this.setState({
      showAddLocation: false,
      newLocation: {
        company: '',
        address: '',
        location_name: '',
      }
    })
  }

  showAddLocation = () => {
    this.setState({
      showAddLocation: !this.state.showAddLocation
    })
  }


  render() {
    return (
      <div>
        <h3>Admin Location Page</h3>
        {this.state.showAddLocation ?
          <> <h4>Add New Location</h4>
            <form>
              <label>Select Company to add a location to: </label>
              <select onChange={(event) => this.handleChange(event, 'company')}>
                {this.props.store.admin.allCompanyReducer.map((company) => <option key={company.id} value={company.id}>{company.company_name}</option>)}
              </select>
              <br/>
              <label>New Location Address:</label>
              <input required onChange={(event) => this.handleChange(event, 'address')} value={this.state.newLocation.address}></input>
              <br/>
              <label>New Location Nickname: </label>
              <input required onChange={(event) => this.handleChange(event, 'location_name')} value={this.state.newLocation.location_name}></input>
              <button className="button" type="submit" onClick={(event) => this.addLocation(event)}>Add Location</button>
            </form><button onClick={this.showAddLocation}>Close</button></>
          : <button onClick={this.showAddLocation}>Add Location</button>}
              <table className="tableClass">
                <thead className="headerClass">
                  <tr><th>Company</th><th>Name</th><th>Address</th><th>&nbsp;</th><th>&nbsp;</th></tr>
                </thead>
                <tbody className="bodyClass">
                    {this.props.store.admin.allLocationReducer.map((lineItem, index) => {
                        return (
                          <tr key={index}>
                              <td>{lineItem.company_name}</td>
                              <td>{lineItem.location_name}</td>
                              <td>{lineItem.address}</td>
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
export default connect(mapStoreToProps)(AdminLocation);
