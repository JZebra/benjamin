// @flow

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { FaCheck, FaTimesCircle } from 'react-icons/lib/fa';

import './ScrollDay.scss';


@observer
export default class ScrollDay extends Component {

    handleVEClick(v, ve) {
        const { appStore, date } = this.props;
        if (ve) {
            const newValue = ve.value ? '0' : '1';
            appStore.recordVirtueEntry(date, newValue, v.id)
        } else {
            const newValue = '1';
            appStore.recordVirtueEntry(date, newValue, v.id)
        }
    }

    renderValue(value: number) {
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
            const value = ve ? this.renderValue(ve.value) : <span>?</span>;
            return (
                <div onClick={ this.handleVEClick.bind(this, v, ve) } className="ScrollDay-VirtueEntry">
                    { value }
                </div>
            )
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
