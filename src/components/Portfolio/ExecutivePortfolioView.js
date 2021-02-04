import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name ExecutivePortfolioView with the name for the new
// component.
class ExecutivePortfolioView extends Component {
  state = {
    heading: 'Class Component',
  };

    render() {
        return (
            <>
                <h1> Executive Portfolio Page </h1>
                <table>
                    <tbody>
                        <tr>              
                            <td><input placeholder='name'/></td>
                            <td><input placeholder='location'/></td>
                            <td><input placeholder='PO number'/></td>
                            <td><input placeholder='NLT Date'/></td>
                            <td><input placeholder='Status'/></td>
                            <td><button>Edit</button></td>
                        </tr>
                    </tbody>
                </table> 
            </>
        );
    }
};


export default connect(mapStoreToProps)(ExecutivePortfolioView);