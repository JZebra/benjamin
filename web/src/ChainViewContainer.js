// @flow

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';

import { _fetch, _format } from './utils';
import ChainView from './ChainView';

@observer
export default class ChainViewContainer extends Component {
    getDisplayableDays(): Array<string> {
        let days = [];
        for (let i = 0; i < 10; i++) {
            days.push(_format(moment().startOf('day').subtract(i, 'days')));
        }

        return days;
    }

    render(): React$Element<any> {
        const displayDays = this.getDisplayableDays();
        const virtueEntryDateMap = this.props.appStore.virtueEntryDateMap;
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
