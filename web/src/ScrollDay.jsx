// @flow

import React, { Component } from 'react';
import { observer } from 'mobx-react';


@observer
export default class ScrollDay extends Component {


    render() {

        return (
            <div className="row">
                {this.props.date}
            </div>
        )
    }
}
