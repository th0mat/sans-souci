import React from 'react';
import 'history';
import {connect} from 'react-redux';
import '../css/iruka.css';
import {Link} from 'react-router';
import AddMac from './addMac';
import {Glyphicon} from 'react-bootstrap';
import * as actions from '../redux/actions';

@connect((store) => {
    return {
        targetsOnly: store.targetsOnly
    };
})
export default class SetTargetsList extends React.Component {

    arrowClick(mac, direction, e) {
        // get targets
        let targets = this.props.targetsOnly;
        console.log("*** pre sort: ", targets);
        // find target
        let target = targets.find((x)=> {
            return x.macHex === mac
        });
        // update sortOrder
        target.sortOrder += direction;
        // sort by sortOrder
        let sorted = targets.sort((x, y)=> {
            return x.sortOrder - y.sortOrder
        });
        // update sortOrder field to index
        let updated = sorted.map((x, i)=> {
            x.sortOrder = i;
            return x;
        })
        console.log('*** newly ordered: ', updated);
        // dispatch targets
        this.props.dispatch(actions.postTargetChanges(updated));
    }

    render() {
        var targets = this.props.targetsOnly;

        return (
            <div>
                < div>
                    <AddMac buttonName='add this device' destination="/profile/" invalidMsg="invalid mac address"/>
                    <br/><br/>
                    <span>Currently monitored: {targets.length}</span>
                    <br/><br/>


                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Mac</th>
                            <th>Profile</th>
                            <th>Sort</th>
                        </tr>
                        </thead>
                        <tbody>
                        {targets.map(x=> {
                            return (
                                <tr key={x.macHex}>

                                    <td>< img className="media-object"
                                              height="35"
                                              width="35"
                                              src={
                                                  "../" + x.avatar
                                              }
                                              alt={x.dname}/></td>
                                    <td>{x.dname}</td>
                                    <td style={{fontFamily: "monospace"}}>{x.macHex}</td>
                                    <td><Link to={"profile/" + x.macHex}>change</Link></td>
                                    <td><Glyphicon class="sortArrow"
                                                   onClick={this.arrowClick.bind(this, x.macHex, -1.5)}
                                                   glyph="arrow-up"/>
                                        &nbsp;
                                        <Glyphicon class="sortArrow"
                                                   onClick={this.arrowClick.bind(this, x.macHex, +1.5)}
                                                   glyph="arrow-down"/></td>

                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

};


