// @flow

import React, { Component } from 'react';
import { observer } from 'mobx-react';


@observer
export default class ChainView extends Component {
    handleClick(): void {
        this.props.viewStore.expandDay();
        this.props.appStore.selectDay(this.props.day);
    }

    getStatus(): Object {
        const virtueEntries = this.props.virtueEntryDateMap[this.props.day] || [];
        const successes = virtueEntries.filter(virtueEntry => virtueEntry.value === 1).length;

        return {
            successes: successes,
            virtuesCount: virtueEntries.length
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

        const successRatio = this.getStatus()['successes'] / this.getStatus()['virtuesCount'] || 0
        const red = 255 - Math.floor(successRatio * 255)
        const green = Math.floor(successRatio * 255)
        const blue = 42

        return `rgb(${red}, ${green}, ${blue})`
        // return statusColors[this.getStatus()['successes']];
    }

    renderVirtueEntryResults(): Object {
        const status = this.getStatus();
        return <p>{ `${ status.successes } / ${ status.virtuesCount }` }</p>
    }


    render(): React$Element<any> {
        const style = {
            backgroundColor: this.getColor(),
            width: '120px',
            padding: '12px',
            margin: '8px',
            display: 'inline-block'
        }

        return (
            <div style={ style } onClick={ this.handleClick.bind(this) } >
                <p>{ this.props.day }</p>
                { this.renderVirtueEntryResults() }
            </div>
        )
    }
}
