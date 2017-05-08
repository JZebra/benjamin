// @flow

import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ScrollDay from './ScrollDay';
import ScrollHeader from './ScrollHeader';


@observer
export default class ScrollView extends Component {

    renderHeader() {
        return (
            <ScrollHeader
                appStore={ this.props.appStore }
                viewStore={ this.props.viewStore }
            />
        )
    }

    renderDays() {
        let dates = Object.keys(this.props.appStore.virtueEntryDateMap)
        dates.sort().reverse();
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
                { this.renderHeader() }
                { this.renderDays() }
            </div>
        )
    }
}
