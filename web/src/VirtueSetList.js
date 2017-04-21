import React, { Component } from 'react';
import VirtueSet from './VirtueSet'

// props: items

class VirtueSetList extends Component {

    renderItems(){
        let VirtueSets = []
        for (let item in this.props.items) {
            VirtueSets.push(VirtueSet(item).render())
        }
        return VirtueSets
    }


    render() {
        return (
        <ul className="VirtueSetList">
            {this.renderItems()}
        </ul>
        );
    }
}

export default VirtueSetList;
