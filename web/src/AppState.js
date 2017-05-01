// @flow

import { computed, observable, action } from 'mobx';

export default class AppState {
    transportLayer: Object;
    @observable virtueSets = [];
    @observable virtueEntries = [];
    @observable isLoading = true;
    @observable selectedDay = '';

    constructor(transportLayer: Object) {
        this.transportLayer = transportLayer;
    }

    loadVirtueEntries(start: string, end: string): void {
        this.isLoading = true
        this.transportLayer.fetchVirtueEntries(start, end).then(fetchedVirtueEntries => {
            this.virtueEntries = fetchedVirtueEntries;
            this.isLoading = false;
        });
    }

    loadVirtueSets(): void {
        this.isLoading = true;
        this.transportLayer.fetchVirtueSets().then(fetchedVirtueSets => {
            this.virtueSets = fetchedVirtueSets;
            this.isLoading = false;;
        });
    }

    recordVirtueEntry(date: string, value: string, virtue_id: string) {
        this.transportLayer.postVirtueEntry(date, value, virtue_id).then(recordedVirtueEntry => {
            // TODO: store this
        });
    }

    recordVirtueStar(date: string, virtue_id: string): void {
        this.transportLayer.postVirtueStar(date, virtue_id).then(recordedVirtueStar => {
            this.replaceVirtueStar(recordedVirtueStar);
        });
    }

    @action replaceVirtueStar(newVirtueStar: Object): void {
        let oldVirtueStar = this.virtueSets[0].virtue_stars.find(vs => {
            return vs.date === newVirtueStar.date
        })

        if (oldVirtueStar) {
            oldVirtueStar.virtue_id = newVirtueStar.virtue_id
        } else {
            this.virtueSets[0].virtue_stars.push(newVirtueStar)
        }
    }

    @computed get VirtueEntryDateMap(): Object {
        let dateMap = {};
        this.virtueEntries.forEach(virtueEntry => {
            const key = virtueEntry.date;
            if (dateMap[key] === undefined) {
                dateMap[key] = [virtueEntry];
            } else {
                dateMap[key].push(virtueEntry);
            }
        });
        return dateMap;
    }

    @action selectDay(day: string): void {
        this.selectedDay = day;
    }
}
