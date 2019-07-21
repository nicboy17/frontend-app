import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkToken } from "../../actions/signInActions";
import { Redirect } from 'react-router-dom';

import { LeftSidebar, TransferModal, DoughnutChart, LineChart, ChartTable, TransactionTable, Footer } from './../../components';
import './Dashboard.scss';

class Dashboard extends Component{
    constructor (props) {
        super(props);
        this.props.checkToken();
    }

    render(){
         return (
            <div className="dashboard-container">
                {this.props.UserStore.authenticated ? '' : <Redirect to='login' />}
                <div className="navigation">
                    <LeftSidebar/>
                </div>
                <div className="content-wrapper" id="content-div">
                    <div className="overview-container">
                        <div className="overview-table"><ChartTable/></div>
                        <div className="overview-graph"><DoughnutChart /></div>
                    </div>
                    <div className="graph-container"><LineChart /></div>
                    <div className="table-container"><TransactionTable /></div>
                    <div className="transfer-modal-container"><TransferModal/></div>
                    <div className="footer-container"><Footer/></div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        UserStore: state.UserStore
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            checkToken
        },
        dispatch
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)
