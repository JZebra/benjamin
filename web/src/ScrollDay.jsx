// @flow

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { FaCheck, FaTimesCircle } from 'react-icons/lib/fa';


import './ScrollDay.scss';


@observer
export default class ScrollDay extends Component {

    renderValue(value) {
        if (value === 1) {
            return <FaCheck />;
        }

        if (value === 0) {
            return <FaTimesCircle />;
        }
    }

    renderVirtueEntries() {
        // TODO: maintain order between Scrolldays
        const virtues = this.props.appStore.virtues;
        const virtueEntries = this.props.appStore.virtueEntryDateMap[this.props.date];

        return virtues.map(v => {
            const ve = virtueEntries.find(ve => ve.virtue_id === v.id);
            if (ve) {
                return (
                    <div className="ScrollDay-VirtueEntry">
                        { this.renderValue(ve.value) }
                    </div>
                )
            } else {
                return (
                    <div className="ScrollDay-VirtueEntry">
                        <span>?</span>
                    </div>
                )
            }
        });
    }

    render() {

        return (
            <div className="row ScrollDay-row">
                <div className="ScrollDay-date">
                    {this.props.date}
                </div>
                <div className="ScrollDay-spacer">
                </div>
                { this.renderVirtueEntries() }
            </div>
        )
    }
}
