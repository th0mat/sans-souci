/**
 * Created by thomasnatter on 9/2/16.
 */

import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';


Number.prototype.formatMoney = function(decPlaces, thouSeparator, decSeparator) {
    var n = this,
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSeparator = decSeparator == undefined ? "." : decSeparator,
        thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
        sign = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g,
            "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};


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
                                <td class="text-right">{totals[0].formatMoney(0)}</td>
                                <td class="text-right">{totals[1].formatMoney(0)}</td>
                                <td class="text-right">{totals[2].formatMoney(0)}</td>
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