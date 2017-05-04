// @flow

import { observable, action } from 'mobx';

export default class ViewState {
    // Observables
    @observable currentView = {
        chainView: true,
        dayView: false,
    }
    @observable expandedVirtueSets = [];
    @observable expandedVirtues = [];

    // Actions
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
