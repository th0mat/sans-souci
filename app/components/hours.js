/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import 'history';
import moment from 'moment';
import Hour from "../components/hour";


var url = "http://171.101.236.255:3000/";


export default React.createClass({

    getInitialState() {
        return {
            mac: [],
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
                console.log("***responseJson: ", responseJson);
                var tmp = JSON.parse(responseJson);
                tmp.mac = tmp.mac.filter((x)=>{
                    let now = moment();
                    let one = moment(x[0]*1000);
                    return !(now.date() == one.date() && now.hour() < one.hour());
                });
                tmp.mac = tmp.mac.reverse();
                this.setState({
                    mac: tmp.mac,
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


    render(){
        return (
            <div>

                <p>Device mac address: {this.props.user}</p>
                <br/>

                {
                    this.state.mac.map((x) => {
                            return (
                                <Hour
                                    key={x[0]}
                                    hour={x[0]}
                                    traffic={x[1]}
                                ></Hour>
                            )
                        }
                    )
                }
            </div>
        )
    },

});


