/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';



import Navbar from '../components/navbar';
import Hours from "../components/historyHours";
import DailyTotals from "../components/historyDailyTotals"
import HistoryHeader from "../components/historyHeader";

@connect((store) => {
    return {
        tsec: store.targets,
        returnToLink: store.returnToLink
    };
})
export default class History extends React.Component {

    render() {

        return (

            <div>
                <Navbar/>
                <HistoryHeader user={this.props.params.user}/>
                <DailyTotals mac={this.props.params.user}/>
                <Hours
                    day={this.props.params.day}
                    user={this.props.params.user}>
                </Hours>
                <div>
                    <Link to={this.props.returnToLink}>Back</Link>
                </div>
            </div>
        )
    }
}




