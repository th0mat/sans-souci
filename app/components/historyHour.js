/**
 * Created by thomasnatter on 8/25/16.
 */

import React from 'react';
import moment from 'moment';


// expected props: hour, traffic array with 12 elements


// from http://tristen.ca/hcl-picker/#/hlc/14/1/242937/E1FB75
var palette = ["#242937", "#285864", "#256970", "#257A7A", "#298B81", "#369D85",
    "#48AE86", "#60BF85", "#7BCF82", "#9ADF7D", "#BCEE79", "lightgrey"].reverse();
// var palette = ["#242937", "#285864", "#256970", "#257A7A", "#298B81", "#369D85",
//     "#48AE86", "#60BF85", "#7BCF82", "#9ADF7D", "#BCEE79", "#E1FB75"].reverse();



export default React.createClass({


    render() {
        var traffic = this.props.traffic;
        var sysup = this.props.sysup;
        var colors = traffic.map((x, i) => {
            if (x === -0.01) return 'skyBlue'; // not yet
            if (x === 0 && sysup[i] === 0) return '#fcd276'; // system was down
            if (x === 0) return '#F8F8F8';
            if (x <= 1000) return palette[1];
            if (x <= 10000) return palette[2];
            if (x <= 100000) return palette[3];
            if (x <= 500000) return palette[4];
            if (x <= 1000000) return palette[5];
            if (x <= 5000000) return palette[6];
            if (x <= 10000000) return palette[7];
            if (x <= 50000000) return palette[8];
            if (x <= 100000000) return palette[9];
            if (x <= 500000000) return palette[10];
            return palette[11];
        });



        return (
            <div id="historyContainer">
                <div class="time-left"><span>{moment(this.props.hour * 1000).format("Do, HH:mm")}</span></div>


                <div class="quarter">
                    <div class="min" style={{background: colors[0]}} ></div>
                    <div class="min" style={{background: colors[1]}} ></div>
                    <div class="min" style={{background: colors[2]}} ></div>
                </div>
                <div class="quarter">
                    <div class="min" style={{background: colors[3]}} ></div>
                    <div class="min" style={{background: colors[4]}} ></div>
                    <div class="min" style={{background: colors[5]}} ></div>
                </div>
                <div class="quarter">
                    <div class="min" style={{background: colors[6]}} ></div>
                    <div class="min" style={{background: colors[7]}} ></div>
                    <div class="min" style={{background: colors[8]}} ></div>
                </div>
                <div class="quarter">
                    <div class="min" style={{background: colors[9]}} ></div>
                    <div class="min" style={{background: colors[10]}} ></div>
                    <div class="min" style={{background: colors[11]}} ></div>
                </div>


                <div class="time-right">{moment((this.props.hour + 3600)* 1000).format("HH:mm")}</div>

            </div>

        );

    }
});

