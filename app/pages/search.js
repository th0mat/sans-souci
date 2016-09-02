/**
 * Created by thomasnatter on 9/2/16.
 */

import React from 'react';
import {Link} from 'react-router';


// routed via address of type: history/:day/:user

import Navbar from '../components/navbar';


export default React.createClass({

    render() {
        return (
            <div>
                <Navbar />
                <div class="page-header">
                    <h1>Search history <small>via manual input</small></h1>
                </div>

                <h4>The easier way</h4>

                <p>You can access the history of any device listed on the live monitor screen
                by clicking on its image. On the scan screen there are links for all observed devices
                which also directly bring you to the history of that device.</p>
                <p>To return to the previous screen from history, click on the image on the history page.</p>

                <h4>Manual input</h4>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.</p>

                <br/>
                <Link to="/">Back to Live</Link>

            </div>
        )
    }
});



