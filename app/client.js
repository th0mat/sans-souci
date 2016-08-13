import React from 'react';
import ReactDOM from 'react-dom';

import Traffic from  './components/traffic.js';


var TopLevel = React.createClass({

    render() {
        return ( < div >
            <Traffic></Traffic>
        </div>)
    }
});


ReactDOM.render(<TopLevel/>, document.getElementById('topLevel'));
