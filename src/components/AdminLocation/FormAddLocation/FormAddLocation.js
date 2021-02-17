import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name FormAddLocation with the name for the new
// component.
class FormAddLocation extends Component {
    state = {
        company: '',
        address: '',
        location_name: '',
    };

    handleInputChangeFor = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    };

    addLocation = () => {
        console.log('========= ADDLOCATION BUTTON CLICKED');
        this.props.dispatch({ type: 'ADMIN_ADD_LOCATION', payload: this.state })
    }

    render() {
        return (
            <form className="formPanel metal"
                onSubmit={this.addLocation}>
                {JSON.stringify(this.state)}
                <div className="highlighter">
                    <h2>Add New Location</h2>
                </div>
                {/* select input to choose company name for new location */}
                <label htmlFor="company-for-location">Select Company to add a location to: </label>
                <select
                    id="company-for-location"
                    onChange={this.handleInputChangeFor('company')}>
                    <option>Select</option>
                    {this.props.store.admin.allCompanyReducer.map((company) =>
                        <option
                            key={company.id}
                            value={company.id}>
                            {company.company_name}
                        </option>)
                    }
                </select>
                <br />
                {/* text input for new location  */}
                <label htmlFor="new-address">New Location Address:</label>
                <input
                    type="text"
                    id="new-address"
                    required
                    onChange={this.handleInputChangeFor('address')}
                    value={this.state.address}>
                </input>
                <br />
                <label>New Location Nickname: </label>
                <input
                    required
                    onChange={this.handleInputChangeFor('location_name')}
                    value={this.state.location_name}>
                </input>
                <button className="btn" type="submit"
                    // onClick={(event) => this.addLocation(event)}
                >Add Location</button>
            </form>
        );
    }
}

export default connect(mapStoreToProps)(FormAddLocation);