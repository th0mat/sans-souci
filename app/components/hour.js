/**
 * Created by thomasnatter on 8/25/16.
 */

import React from 'react';
import moment from 'moment';


// from http://tristen.ca/hcl-picker/#/hlc/14/1/242937/E1FB75
var palette = ["#242937", "#285864", "#256970", "#257A7A", "#298B81", "#369D85",
    "#48AE86", "#60BF85", "#7BCF82", "#9ADF7D", "#BCEE79", "#E1FB75"].reverse();



export default React.createClass({
    render() {
        var fromHour = moment(this.props.hour * 1000).format('hh');
        var toHour = fromHour;
        var traffic = this.props.traffic;
        var colors = traffic.map(x => {
            if (x === 0) return palette[0];
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
            <div class="container">
                <div class="time">{this.fromHour}</div>


                <div class="quarter">
                    <div {'className="min" style="background:' + color[0] + '"'} >1</div>
                    <div {'className="min" style="background:' + color[1] + '"'} >1</div>
                    <div {'className="min" style="background:' + color[2] + '"'} >1</div>
                </div>
                <div class="quarter">
                    <div {'className="min" style="background:' + color[3] + '"'} >1</div>
                    <div {'className="min" style="background:' + color[4] + '"'} >1</div>
                    <div {'className="min" style="background:' + color[5] + '"'} >1</div>
                </div>
                <div class="quarter">
                    <div {'className="min" style="background:' + color[6] + '"'} >1</div>
                    <div {'className="min" style="background:' + color[7] + '"'} >1</div>
                    <div {'className="min" style="background:' + color[8] + '"'} >1</div>
                </div>
                <div class="quarter">
                    <div {'className="min" style="background:' + color[9] + '"'} >1</div>
                    <div {'className="min" style="background:' + color[10] + '"'} >1</div>
                    <div {'className="min" style="background:' + color[11] + '"'} >1</div>
                </div>


                <div class="time">{this.toHour}</div>

            </div>

        );

    }
});

