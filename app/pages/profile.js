/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';



import Navbar from '../components/navbar';
import EditProfile from "../components/editProfile";

@connect((store) => {
    return {
        tsec: store.targets,
        returnToLink: store.returnToLink
    };
})
export default class EditMac extends React.Component {

    render() {

        return (

            <div>
                <Navbar/>
                <EditProfile user={this.props.params.user}/>
            </div>
        )
    }
}




