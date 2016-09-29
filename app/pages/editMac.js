/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';



import Navbar from '../components/navbar';
import EditHeader from "../components/editHeader";

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
                <EditHeader user={this.props.params.user}/>

                <div>
                    <Link to='/settings'>Back</Link>
                </div>
            </div>
        )
    }
}




