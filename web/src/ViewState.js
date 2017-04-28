import { observable, action } from 'mobx';

export default class ViewState {
    @observable currentView = {
        chainView: true,
        dayView: false,
    }

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

    @action expandDay() {
        this.currentView = {
            chainView: false,
            dayView: true,
        }
    }

    @action collapseDay() {
        this.currentView = {
            chainView: true,
            dayView: false,
        }
    }
}
