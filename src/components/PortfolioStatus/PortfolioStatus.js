import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './PortfolioStatus.css'

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class PortfolioStatus extends Component {

    state = {
        status: 'complete'
    };

    componentDidUpdate(prevProps) {
        if (this.props.status !== prevProps.status) {
            console.log('the props have changed!', this.props.status);
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            //   div to hold status bar. clicking a button will 
            // change the status and color will update
            <div className="status-bar">
                <button
                    onClick={() => this.props.updateStatus('onTime')}
                    className={`
                        btn-status
                        ${this.state.status === "onTime" && "active"}
                        `}
                >
                    On Time
                </button>
                {/* <button
                    onClick={() => this.props.updateStatus('attention' )}
                    className={`${this.state.status === "attention" && "active"}`}
                >
                    Needs Attention
                </button> */}
                <button
                    onClick={() => this.props.updateStatus('late' )}
                    className={`
                        ${this.state.status === "late" &&
                        "active"}
                        `}
                >
                    Late
                </button>
                <button
                    onClick={() => this.props.updateStatus('complete' )}
                    className={`
                            btn-status
                            ${this.state.status === "complete" && "active"}
                          `}
                >
                    Complete
                </button>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(PortfolioStatus);