// @flow

import React, { Component } from 'react';
import { observer } from 'mobx-react';

import './ScrollHeader.scss';

@observer
export default class ScrollHeader extends Component {

    renderVirtues() {
        return this.props.appStore.virtues.map(v => {
            return (
                <div
                    className="ScrollHeader-virtue"
                    key={v.id}
                    >
                    { v.title }
                </div>
            )
        });
    }

    render() {
        return (
            <div className="row ScrollHeader-row">
                <div className="ScrollHeader-spacer"></div>
                <div className="ScrollHeader-spacer"></div>
                { this.renderVirtues() }
            </div>
        )
    }
}
