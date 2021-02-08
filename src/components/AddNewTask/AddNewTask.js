import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Popup from 'reactjs-popup';


class AddNewTask extends Component {

    componentDidMount(){ 
    }

    state = {
    };

    handleChange = (event, name) => {
        this.setState({ [name]: event.target.value });    
    }

  // returns the date in the day/month/year format
    dateConversion = date => {
        let year = date[0]+date[1]+date[2]+date[3];
        let month = date[5]+date[6];
        let day = date[8]+date[9];
        return( day + "/" + month + "/" + year);
    }

    render() {
        // console.log(this.state);
        return (
            <center className="container paper">
                <h1> Add New Task </h1>
                <form>
                    <label>
                    <input></input>
                    </label>
                </form>
            </center>
        );
    }
};


export default connect(mapStoreToProps)(AddNewTask);

 