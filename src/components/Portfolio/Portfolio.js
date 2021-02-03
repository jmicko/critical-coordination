import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name Portfolio with the name for the new
// component.
class Portfolio extends Component {
  state = {
    heading: 'Class Component',
   

  };

componentDidMount(){
  this.props.dispatch({ type: 'GET_PORTFOLIO', payload: this.props.store.user.id})
}

handleChange = name => {
  this.props.dispatch({ type: 'EDIT_PORTFOLIO', payload: name}); //this is not setup quite yet and is just a place holder for the moment
}

navigate = web_address => {
  this.props.history.push(web_address);
}




  render() {
    let user = 1; // we will make this a call to the redux and the user.id store like this.props.store.user.id. will want to double check how this works
    // const admin = this.props.store.user.admin;
    
    // ADMIN VIEW ----
    if ( true ){

      return( <div>
        <h1> this is the portfolio page</h1>
      <h1>hello this is the admin stuff </h1>

      {JSON.stringify(this.props.store.user.admin)}
      <button onClick={ () => this.navigate('/project') } >Button to the task page</button>

      <table>
        {/* {this.props.store.portfolio.portfolio.reducer.map((project, index) => {
          return (
          
            <tr key={index} onClick={ () => this.navigate('/project')}>  */}
            <tbody>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th><button>filter</button></th>
              </tr>
              <tr>              
                <td><input placeholder='name'/></td>
                <td><input placeholder='location'/></td>
                <td><input placeholder='PO number'/></td>
                <td><input placeholder='NLT Date'/></td>
                <td><input placeholder='Status'/></td>
                <td><button>Edit</button></td>
              </tr>
            </tbody>
          {/* )
        })} */}

        {/* code for the css styling to make the input placeholder a solid text and not grey
        input::placeholder {
          color: red; */}

      </table>   
      </div>
      )
    }



    {/* Conditioal rendering, if the user it Tom and has the user ID  admin we will get him the ability to edit and make changes to the files. */}
       


    // CLIENT VIEW ----
    if( user === 2 ) {
      return(
        <div>
          <h1>Portfolio Page</h1>
          <h2>cleint stuff this is not editable</h2>

          <table>
            {/* {this.props.store.portfolio.portfolio.reducer.map((project, index) => {
              return (
              
                <tr key={index} onClick={ () => this.navigate('/project')}>  */}
            <tbody>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th><button>filter</button></th>
              </tr>
              <tr>
                <td><input value='name'/></td>
                <td><input value='location'/></td>
                <td><input value='PO number'/></td>
                <td><input value='NLT Date'/></td>
                <td><input value='Status'/></td>
              </tr>
            </tbody>

              {/* )
            })} */}

          </table>
          <button onClick={ () => this.navigate('/project') } >Button to the project page</button>

        </div>

      )
    }


    //VENDOR VIEW ----
    if( user === 3){
      return (
        <>
        <h1>Portfolio Page</h1>
          <h1>Vendor view is not editable at this level</h1>
          <table>
            {/* {this.props.store.portfolio.portfolio.reducer.map((project, index) => {
              return (
              
                <tr key={index} onClick={ () => this.navigate('/project')}>  */}
            <tbody>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th><button>filter drop down</button></th>
              </tr>
              <tr>
                <td><input value='name'/></td>
                <td><input value='location'/></td>
                <td><input value='PO number'/></td>
                <td><input value='NLT Date'/></td>
                <td><input value='Status'/></td>
                <td><button>Details</button></td>
              </tr>
            </tbody>
            <button onClick={ () => this.navigate('/project') } >Button to the project page</button>
              {/* )
            })} */}
     
          </table>
        </>
      )
    }


    // EDIT VIEW 
    if( user === 4){
      return (
        <>
        <h1>Portfolio Page</h1>
          <h1>Vendor view is not editable at this level</h1>
          <table>
            {/* {this.props.store.portfolio.portfolio.reducer.map((project, index) => {
              return (
              
                <tr key={index} onClick={ () => this.navigate('/project')}>  */}
            <tbody>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th><button>filter drop down</button></th>
              </tr>
              <tr>
                <td><input placeholder='name'/></td>
                <td><input placeholder='location'/></td>
                <td><input placeholder='PO number'/></td>
                <td><input placeholder='NLT Date'/></td>
                <td><input placeholder='Status'/></td>
                <td><button>Details</button></td>
              </tr>
            </tbody>
            <button onClick={ () => this.navigate('/project') } >Save</button>
              {/* )
            })} */}
     
          </table>
        </>
      )
    }








    
  }
}

export default connect(mapStoreToProps)(Portfolio);