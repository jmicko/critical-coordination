import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name ClientVendorPortfolioView with the name for the new
// component.
class ClientVendorPortfolioView extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
      <div>
        <h1> Client/Vendor Portfolio Page</h1>
        <table>
          <tbody>
            {this.props.store.portfolio.map((project, index) => {
              return <tr key={index}>              
                        <td><input value={project.project_name}/></td>
                        <td><input value={project.location_name}/></td>
                        <td><input value={project.PO_Number}/></td>
                        <td><input value={project.due_date}/></td>
                        <td><input value='Logic needs to be done'/></td>
                      </tr>
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ClientVendorPortfolioView);