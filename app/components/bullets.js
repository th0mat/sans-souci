/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';


// from http://tristen.ca/hcl-picker/#/hlc/14/1/242937/E1FB75
var palette = ["#242937", "#285864", "#256970", "#257A7A", "#298B81", "#369D85",
    "#48AE86", "#60BF85", "#7BCF82", "#9ADF7D", "#BCEE79", "#E1FB75"].reverse();


function makeOne(color) {
    var cir = '<svg class="one" width="30" height="30"><circle cx="15" cy="15" r="13" stroke="';
    cir += palette[palette.length - 1] + '" stroke-width="1" fill="';
    cir += color + '" /></svg>';
    return cir;
}


function makeTen(colors) {
    var full = "";
    for (var i = 0; i < 10; i++) {
        full += makeOne(colors[i]);
    }
    return full;
}


export default React.createClass({
    render() {
        var traffic = this.props.traffic;
        var colors = traffic.map(x => {
            if (x === 0) return palette[0];
            if (x <= 100) return palette[1];
            if (x <= 1000) return palette[2];
            if (x <= 3000) return palette[3];
            if (x <= 6000) return palette[4];
            if (x <= 10000) return palette[5];
            if (x <= 20000) return palette[6];
            if (x <= 50000) return palette[7];
            if (x <= 100000) return palette[8];
            if (x <= 500000) return palette[9];
            if (x <= 1500000) return palette[10];
            return palette[11];
        });

        function createMarkup() {
            return {
                __html: makeTen(colors)
            };
        };
        return ( < div className="bullets"
                       dangerouslySetInnerHTML={
                           createMarkup()
                       }
            />
        );
    }
});

