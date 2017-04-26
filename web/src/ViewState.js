import { observable, action } from 'mobx';

export default class ViewState {
    @observable expandedVirtueSets = [];
    @observable expandedVirtues = [];

    @action expandVirtueSet(virtueSetId) {
        this.expandedVirtueSets.push(virtueSetId);
    }

    @action collapseVirtueSet(virtueSetId) {
        this.expandedVirtueSets =
        this.expandedVirtueSets.filter(id => id !== virtueSetId);
    }

    @action expandVirtue(virtueId) {
        this.expandedVirtues.push(virtueId);
    }

    @action collapseVirtue(virtueId) {
        this.expandedVirtues =
        this.expandedVirtues.filter(id => id !== virtueId);
    }
}
