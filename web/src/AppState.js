// @flow

import { computed, observable, action } from 'mobx';
import moment from 'moment';

import { _format } from './utils.js';

export default class AppState {
    transportLayer: Object;
    // We currently only have the Benjamin virtue set so we never change selectedVirtueSetId
    @observable selectedVirtueSetId = 1;
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
            this.isLoading = false;
        });
    }

    recordVirtueEntry(date: string, value: string, virtue_id: string) {
        this.transportLayer.postVirtueEntry(date, value, virtue_id).then(recordedVirtueEntry => {
            let oldVirtueEntry = this.virtueEntries.find(ve => {
                return ve.date === date && ve.virtue_id === virtue_id;
            });

            if (oldVirtueEntry) {
                oldVirtueEntry.value = value;
            } else {
                this.virtueEntries.push(recordedVirtueEntry);
            }
        });
    }

    recordVirtueStar(date: string, virtue_id: string): void {
        this.transportLayer.postVirtueStar(date, virtue_id).then(recordedVirtueStar => {
            this.replaceVirtueStar(recordedVirtueStar);
        });
    }

    // Actions
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

    @action selectDay(day: string): void {
        this.selectedDay = day;
    }


    // Computed
    @computed get virtues(): Array<Object> {
        const virtueSet = this.virtueSets.find(vs => {
            return vs.id === this.selectedVirtueSetId
        })
        return virtueSet ? virtueSet.virtues : []
    }

    @computed get virtueEntryDateMap(): Object {
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

    @computed get virtueStars(): Array<Object> {
        const virtueSet = this.virtueSets.find(vs => {
            return vs.id === this.selectedVirtueSetId
        })
        return virtueSet ? virtueSet.virtues : []
    }

    getToday() {
        return _format(moment());
    }
}
