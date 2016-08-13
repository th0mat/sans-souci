/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import Bullets from './bullets.js';


export default React.createClass({

    callHistory: function () {
        document.getElementById("Traffic").className = "hidden";
        document.getElementById("History").className = "";
    },

    render() {
        var lastSeen = "not yet";
        if (this.props.lastSeen) {
            var date = this.props.lastSeen;
            lastSeen = date.getHours() + ":";
            lastSeen += date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            if (date.getDate() === new Date().getDate()) {
                lastSeen += " today";
            } else {
                lastSeen += "on " + lastSeen.getFullYear() + "-" + lastSeen.getMonth() + "-" + lastSeen.getDay();
            }
        }

        return ( < div className="media">
                < div className="media-left">
                    < a href="#">
                        < img onClick={this.callHistory} className="media-object"
                              height="75"
                              width="75"
                              src={
                                  "../" + this.props.avatar
                              }
                              alt=""/>
                    </a></div>
                < div className="media-body">
                    < h4 className="media-heading"> {
                        this.props.dname
                    } </h4> < Bullets traffic={
                    this.props.traffic
                }> </Bullets>
                    < p >
                        < small > last seen: {
                            lastSeen
                        } </small>
                    </p >
                </div>
            </div>
        );
    }
})

