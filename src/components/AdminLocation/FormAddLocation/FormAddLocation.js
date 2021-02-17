import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name FormAddLocation with the name for the new
// component.
class FormAddLocation extends Component {
    state = {
        heading: 'Class Component',
        address: '',
        locationName: '',
    };

    handleInputChangeFor = (propertyName) => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
      };

    render() {
        return (
            <form className="formPanel metal">
                <div className="highlighter">
                    <h2>Add New Location</h2>
                </div>
                <label>Select Company to add a location to: </label>
                <select onChange={(event) => this.handleChangeNewLocation(event, 'company')}>
                    {this.props.store.admin.allCompanyReducer.map((company) => <option key={company.id} value={company.id}>{company.company_name}</option>)}
                </select>
                <br />
                <label>New Location Address:</label>
                <input required onChange={(event) => this.handleInputChangeFor(event, 'address')} value={this.state.address}></input>
                <br />
                <label>New Location Nickname: </label>
                <input required onChange={(event) => this.handleInputChangeFor(event, 'locationName')} value={this.state.locationName}></input>
                <button className="btn" type="submit" onClick={(event) => this.addLocation(event)}>Add Location</button>
            </form>
        );
    }
}

export default connect(mapStoreToProps)(FormAddLocation);