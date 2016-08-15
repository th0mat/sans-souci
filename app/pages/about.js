
import React from 'react';
import { Link } from 'react-router';


// routed via address of type: history/:day/:user


export default React.createClass({

    render() {
        return (
            <div>
                <h2>About</h2>
                <p>This is a routing test</p>
                <Link to="/">Back to Live</Link>

            </div>
        )
    }
});



