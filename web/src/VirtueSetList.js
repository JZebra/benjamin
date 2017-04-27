import React, { Component } from 'react';
import {observer} from 'mobx-react';

import VirtueSet from './VirtueSet';

// props: items

@observer
export default class VirtueSetList extends Component {
    render() {
        const virtueSets = this.props.virtueSets;
        const style = {
          'listStyle': 'none',
          'backgroundColor': 'lightgreen',
          'margin': '0 25% 0 25%'
        };
        const viewStore = this.props.viewStore;
        const appStore = this.props.appStore;

        return (
            <div className="VirtueSetList container-fluid" style={style}>
                {virtueSets.map(virtueSet => {
                    return <VirtueSet
                        id={ virtueSet.id }
                        viewStore={ viewStore }
                        appStore ={ appStore }
                        virtueSet={ virtueSet } />
                })}
            </div>
        );
    }
}
