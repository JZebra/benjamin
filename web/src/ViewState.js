// @flow

import { observable, action } from 'mobx';

export default class ViewState {
    @observable currentView = {
        chainView: true,
        dayView: false,
    }

    @observable expandedVirtueSets = [];
    @observable expandedVirtues = [];

    @action expandVirtueSet(virtueSetId: number): void {
        this.expandedVirtueSets.push(virtueSetId);
    }

    @action collapseVirtueSet(virtueSetId: number): void {
        this.expandedVirtueSets =
        this.expandedVirtueSets.filter(id => id !== virtueSetId);
    }

    @action expandVirtue(virtueId: number): void {
        this.expandedVirtues.push(virtueId);
    }

    @action collapseVirtue(virtueId: number): void {
        this.expandedVirtues =
        this.expandedVirtues.filter(id => id !== virtueId);
    }

    @action expandDay(): void {
        this.currentView = {
            chainView: false,
            dayView: true,
        };
    }

    @action collapseDay(): void {
        this.currentView = {
            chainView: true,
            dayView: false,
        }
    }
}
