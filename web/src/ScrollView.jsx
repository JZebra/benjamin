// @flow

import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ScrollDay from './ScrollDay';


@observer
export default class ScrollView extends Component {

    renderDays() {
        let dates = Object.keys(this.props.appStore.virtueEntryDateMap)
        dates.sort()
        return dates.map(date => {
            return (
                <ScrollDay
                    key={ date }
                    date={ date }
                    appStore={ this.props.appStore }
                    viewStore={ this.props.viewStore }
                />)
        });
    }

    render() {
        return (
            <div className="scroll-container container-fluid">
                {this.renderDays()}
            </div>
        )
    }
}
