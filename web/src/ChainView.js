// @flow

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { FaTrophy } from 'react-icons/lib/fa';


@observer
export default class ChainView extends Component {

    handleClick(): void {
        this.props.viewStore.expandDay();
        this.props.viewStore.expandVirtueSet(this.props.appStore.selectedVirtueSetId);
        this.props.appStore.selectDay(this.props.day);
    }

    getStatus(): Object {
        // TODO: cache this
        const appStore = this.props.appStore;
        const virtueCount = appStore.virtueSets[0].virtues.length;
        const virtueEntries = this.props.virtueEntryDateMap[this.props.day] || [];
        const successes = virtueEntries.filter(virtueEntry => virtueEntry.value === 1).length;
        const starredVirtue = appStore.virtueStars.find(vs => {
            return vs.date === this.props.day
        })
        const starredVirtueTitle = starredVirtue ?
        appStore.virtues.find(v => v.id === starredVirtue.virtue_id).title : ''
        const isToday = this.props.appStore.getToday() === this.props.day;

        return {
            isToday: isToday,
            virtueCount: virtueCount,
            successes: successes,
            virtueEntriesCount: virtueEntries.length,
            starredVirtueTitle: starredVirtueTitle
        }
    }

    getColor(): string {
        // const statusColors = {
        //     0: '#FF0000',
        //     1: '#CC0000',
        //     2: '#AA0000',
        //     3: '#990000',
        //     4: '#881100',
        //     5: '#772200',
        //     6: '#663300',
        //     7: '#554400',
        //     8: '#445500',
        //     9: '#336600',
        //     10: '#009900',
        //     11: '#00AA00',
        //     12: '#00CC00',
        //     13: '#00FF00'
        // }

        const successRatio = this.getStatus()['successes'] / this.getStatus()['virtueEntriesCount'] || 0
        const red = 255 - Math.floor(successRatio * 255)
        const green = Math.floor(successRatio * 255)
        const blue = 42

        return `rgb(${red}, ${green}, ${blue})`
        // return statusColors[this.getStatus()['successes']];
    }

    renderVirtueEntryResults(): Object {
        const status = this.getStatus();
        return <p>{ `${ status.successes } / ${ status['virtueCount'] }` }</p>
    }

    renderTrophy() {
        const status = this.getStatus();
        if (status.successes >= 10) {
            return <FaTrophy size={30} />
        }
    }

    renderStarredVirtue() {
        const status = this.getStatus();
        return <p>{ status.starredVirtueTitle }</p>
    }

    render(): React$Element<any> {
        let style = {
            border: '',
            backgroundColor: this.getColor(),
            height: '160px',
            width: '160px',
            padding: '12px',
            margin: '8px',
            display: 'inline-block',
            verticalAlign: 'bottom'
        }

        if (this.getStatus().isToday) {
            style.border = '8px solid yellow';
        }

        return (
            <div style={ style } onClick={ this.handleClick.bind(this) } >
                <p>{ this.props.day }</p>
                { this.renderStarredVirtue() }
                { this.renderTrophy() }
                { this.renderVirtueEntryResults() }
            </div>
        )
    }
}
