import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment-timezone';

import { _fetch } from './utils';
import ChainView from './ChainView';

@observer
export default class ChainViewContainer extends Component {
    getDisplayableDays() {
        // TODO: add timezones
        let days = [];
        for (let i = 0; i < 10; i++) {
            days.push(moment().startOf('day').subtract(i, 'days'));
        }

        return days;
    }

    componentDidMount() {
        const start = moment().startOf('day').subtract(10, 'days').unix();
        const end = moment().startOf('day').unix();

        this.props.appStore.loadVirtueEntries(start, end);
    }

    render() {
        const displayDays = this.getDisplayableDays();
        const virtueEntryDateMap = this.props.appStore.VirtueEntryDateMap;
        const chainViews = displayDays.map(day => {
            return <ChainView
                day={day}
                virtueEntryDateMap={virtueEntryDateMap}
                appStore={this.props.appStore}
                viewStore={this.props.viewStore}
            />
        });

        return (
            <div className="container-fluid">
                {chainViews}
            </div>
        )
    }
}
