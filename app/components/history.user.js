/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import 'history';
import moment from 'moment';

var url = "http://171.101.236.255:3000/";

function createTableHtml(data) {
    console.log(data);
    data = JSON.parse(data);
    var str = '<table class="table table-striped"><thead><tr><th>Date</th>';
    str += '<th  class="text-right">SysUp</th><th>Traffic</th></tr></thead><tbody>';
    data.mac.reverse();
    data.sysup.reverse();
    var nowHourIndex = 24 - moment().hour() - 1;
    for (let i = nowHourIndex; i < data.mac.length; i++) {
        var sysup = Math.round(data.sysup[i][1].reduce((a, b) => a + b, 0)/60*100);
        str += '<tr><td>' + moment.unix(data.mac[i][0]).format("ddd hA") + '</td><td class="text-right">' + sysup + '%</td><td>'
            + JSON.stringify(data.mac[i][1]) + '</td></td>';
    }
    str += '</tbody></table>';
    return {__html: str};
}


export default React.createClass({

    getInitialState() {
        return {
            data: {
                test: "data",
                tableHtml: ""
            }
        };
    },

    getDataFromApiAsync() {
        return fetch(url + 'api/history/' + this.props.day + "/" + this.props.user)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    tableHtml: createTableHtml(responseJson)
                })
            })
            .catch((error) => {
                console.error(error);
            });
    },

    componentDidMount()
    {
        this.getDataFromApiAsync();
    }
    ,

    render()
    {
        return ( <div>
                <h3>Raw Data</h3>

                <p>Device mac address: {this.props.user}</p>
                <br/>
                <div dangerouslySetInnerHTML={
                    this.state.tableHtml}></div>
                <br/>

            </div>
        );
    }
});


