/**
 * Created by thomasnatter on 9/2/16.
 */

import React from 'react';
import {Link} from 'react-router';

import AddMac from '../components/addMac';
import Navbar from '../components/navbar';


export default class Search extends React.Component {

    render() {

        return (
            <div>
                <Navbar />
                <div class="page-header">
                    <h1>Search history
                        <small> via manual input</small>
                    </h1>
                </div>

                <span>Mac to look-up: </span>&nbsp;&nbsp;
                <AddMac buttonName='search' destination="/history/" invalidMsg="invalid mac address"/>
                <br/>
                <br/>
                <br/>

                <h4>The easier way</h4>

                <p>You can access the history of any device listed on the live monitor screen
                    by clicking on its image. On the scan screen there are links for all observed devices
                    which also directly bring you to the history of that device.</p>
                <p>To return to the previous screen from history, click on the image on the history page.</p>

                <br/>
                <Link to="/">Back to Live</Link>

            </div>
        )
    }
};



