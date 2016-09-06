/**
 * Created by thomasnatter on 9/2/16.
 */

import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

@connect((store) => {
    return {
        mac: store.macHistory,
    };
})
export default class Daily extends React.Component {
    render(){
        var totals = getDailyTotals(this.props.mac)

        return (
            <div>
                <br/>
                <br/>
                <h4>Daily totals</h4>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th class="text-right">today</th>
                        <th class="text-right">yesterday</th>
                        <th class="text-right">day before</th>
                    </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td class="text-right">{totals[0].toLocaleString()}</td>
                                <td class="text-right">{totals[1].toLocaleString()}</td>
                                <td class="text-right">{totals[2].toLocaleString()}</td>
                            </tr>
                    </tbody>
                </table>


            </div>
        )
    }
}

function getDailyTotals(mac) {
    var totals = [0, 0, 0];
    var dates = [moment().date(), moment().subtract(1, 'days').date(), moment().subtract(2, 'days').date()];
    for (let h of mac) {
        let ht = h[1].reduce((a, b)=> a + b, 0);
        let day = dates.findIndex(x=> x == moment(h[0]*1000).date());
        totals[day] += ht;
    }
    return totals;
}