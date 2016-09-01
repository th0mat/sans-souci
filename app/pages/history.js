/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';



import Navbar from '../components/navbar';
import Hours from "../components/hours";


@connect((store) => {
    return {
        tsec: store.targets,
        returnToLink: store.returnToLink
    };
})
export default class Hisotry extends React.Component {

    render() {

        return (

            <div>
                <Navbar/>
                <br/><br/>
                <Hours
                    day={this.props.params.day}
                    user={this.props.params.user}>
                </Hours>
                <br/>
                <Link to="/">Back to Live</Link>
            </div>
        )
    }
}




