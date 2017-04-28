import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';

import { _fetch, _format } from './utils';
import ChainView from './ChainView';

@observer
export default class ChainViewContainer extends Component {
    getDisplayableDays() {
        let days = [];
        for (let i = 0; i < 10; i++) {
            days.push(_format(moment().startOf('day').subtract(i, 'days')));
        }

        return days;
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
