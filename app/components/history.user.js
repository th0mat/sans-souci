/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';

var url = "http://171.101.236.255:3000/";


export default React.createClass({

    getInitialState() {
        return {
            data: {test: "data"}
        };
    },

    getDataFromApiAsync() {
        return fetch(url + 'api/history/' + this.props.day + "/" + this.props.user)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState( {data :responseJson})
            })
            .catch((error) => {
                console.error(error);
            });
    },


    componentDidMount() {
        this.getDataFromApiAsync();
    },

    render() {
        return ( <div>
                    <h3>Records for Today</h3>

                    <p>Data for user: {this.props.user}</p>
                    <p>Day of data: {this.props.day}</p>
                    <div>{JSON.stringify(this.state.data)}</div>
                    <br/>

                 </div>
        );
    }
});


