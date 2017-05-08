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
        const date = this.props.date;
        const { virtues, virtueStars } = this.props.appStore
        const virtueEntries = this.props.appStore.virtueEntryDateMap[date];

        return virtues.map(v => {
            const ve = virtueEntries.find(ve => ve.virtue_id === v.id);
            const value = ve ? this.renderValue(ve.value) : <span>?</span>;
            const vs = virtueStars.find(vs => vs.date === date && vs.virtue_id === v.id);
            // TODO: refactor with classnames library if we do this a lot.
            const className = vs ? "ScrollDay-VirtueEntry starred" : "ScrollDay-VirtueEntry";

            return (
                <div onClick={ this.handleVEClick.bind(this, v, ve) } className={className} >
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
                { this.renderVirtueEntries() }
            </div>
        )
    }
}
