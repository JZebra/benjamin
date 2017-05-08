// @flow

import { computed, observable, action } from 'mobx';
import moment from 'moment';

import { _format } from './utils.js';

export default class AppState {
    transportLayer: Object;
    // We currently only have the Benjamin virtue set so we never change selectedVirtueSetId
    @observable selectedVirtueSetId = 1;
    @observable virtues = [];
    @observable virtueEntries = [];
    @observable virtueStars = [];
    @observable incompleteFetches = 0;
    @observable selectedDay = '';

    constructor(transportLayer: Object) {
        this.transportLayer = transportLayer;
    }

    loadVirtues(): void {
        this.incompleteFetches++
        this.transportLayer.fetchVirtues().then(fetchedVirtues => {
            this.virtues = fetchedVirtues;
            this.incompleteFetches--
        });
    }

    loadVirtueEntries(start: string, end: string): void {
        this.incompleteFetches++
        this.transportLayer.fetchVirtueEntries(start, end).then(fetchedVirtueEntries => {
            this.virtueEntries = fetchedVirtueEntries;
            this.incompleteFetches--
        });
    }

    loadAllVirtueEntries(): void {
        this.incompleteFetches++
        this.transportLayer.fetchAllVirtueEntries().then(fetchedVirtueEntries => {
            this.virtueEntries = fetchedVirtueEntries;
            this.incompleteFetches--
        });
    }

    loadVirtueStars(): void {
        this.incompleteFetches++
        this.transportLayer.fetchVirtueStars().then(fetchedVirtueStars => {
            this.virtueStars = fetchedVirtueStars;
            this.incompleteFetches--
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
        let oldVirtueStar = this.virtueStars.find(vs => {
            return vs.date === newVirtueStar.date
        })

        if (oldVirtueStar) {
            oldVirtueStar.virtue_id = newVirtueStar.virtue_id
        } else {
            this.virtueStars.push(newVirtueStar)
        }
    }

    @action selectDay(day: string): void {
        this.selectedDay = day;
    }

    @computed get virtueEntryDateMap(): Object {
        let dateMap = {};

        let sorted = this.virtueEntries.sort((a, b) => {
            if (a.date < b.date) {
                return -1;
            } else if (a.date > b.date) {
                return 1;
            } else {
                return 0;
            }
        });

        let startDate = new Date(sorted[0].date);
        let endDate = new Date();

        let dates = [];

        while (startDate < endDate) {
            dates.push(startDate);
            let newDate = startDate.setDate(startDate.getDate() + 1);
            startDate = new Date(newDate);
        }

        let formattedDates = dates.map(date => moment(date).format('YYYY-MM-DD'));

        formattedDates.forEach(date => {
            dateMap[date] = [];
        });

        sorted.forEach(virtueEntry => {
            const key = virtueEntry.date;
            dateMap[key].push(virtueEntry);
        });

        return dateMap;
    }

    @computed get isLoading(): Boolean {
        return this.incompleteFetches !== 0
    }

    getToday() {
        return _format(moment());
    }
}
