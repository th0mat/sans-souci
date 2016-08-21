/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
var url = "http://171.101.236.255:3000/";


import Traffic from '../components/traffic.js';


export default React.createClass({

    getInitialState() {
        return {
            targets: []
        };
    },


    getDataFromApiAsync() {
        return fetch(url + 'api/config/targets')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    targets: responseJson
                })
            })
            .catch((error) => {
                console.error("*** error while loading config:", error);
            });
    },

    componentDidMount() {
        this.getDataFromApiAsync();
    },


    render() {
        return (
            <Traffic targets={this.state.targets}></Traffic>
        )
    }
});



