import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment-timezone';

import { _fetch } from './utils';

@observer
export default class ChainView extends Component {
    renderVirtueEntryResults() {
        let successes = 0
        const date_string = this.props.day.format("LL");
        const virtueEntries = this.props.virtueEntryDateMap[date_string] || [];
        virtueEntries.map(virtueEntry => {
            if (virtueEntry.value === 1) {
                successes++
            }
        })
        return `${successes} / ${virtueEntries.length}`;
    }

    render() {
        return (
            <div>
                <p>{ this.props.day.format("LL") }</p>
                <p>{ this.renderVirtueEntryResults() }</p>
            </div>
        )
    }
}
