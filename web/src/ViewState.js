// @flow

import { observable, action } from 'mobx';

export default class ViewState {
    // Observables
    @observable currentView = {
        chainView: true,
        dayView: false,
        scrollView: false,
    }
    @observable expandedVirtues = [];

    // Actions
    @action expandVirtue(virtueId: number): void {
        this.expandedVirtues.push(virtueId);
    }

    @action collapseVirtue(virtueId: number): void {
        this.expandedVirtues =
        this.expandedVirtues.filter(id => id !== virtueId);
    }

    @action openDayView(): void {
        this.currentView = {
            chainView: false,
            dayView: true,
            scrollView: false,
        };
    }

    @action openChainView(): void {
        this.currentView = {
            chainView: true,
            dayView: false,
            scrollView: false,
        }
    }

    @action openScrollView(): void {
        this.currentView = {
            chainView: false,
            dayView: false,
            scrollView: true,
        }
    }
}
