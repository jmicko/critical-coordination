import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
// Components to import 
import ExecutiveProjectView from './ExecutiveProjectView';
import ClientVendorProjectView from './ClientVendorProjectView';


class Project extends Component {



    navigate = web_address => {
        this.props.history.push(web_address);
      }


  render() {
    return (
      <>
        { (this.props.store.user.user_type === "admin") ? <ExecutiveProjectView history={this.props.history}/> : <ClientVendorProjectView history={this.props.history}/> }

        <button onClick={ () => this.navigate('/task') } >Button to the task page</button>
      </>
    );
  }
}

export default connect(mapStoreToProps)(Project);