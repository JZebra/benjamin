import { computed, observable, action } from 'mobx';

export default class AppState {
    transportLayer;
    @observable virtueSets = [];
    @observable virtueEntries = [];
    @observable isLoading = true;
    @observable selectedDay = '';

    constructor(transportLayer) {
        this.transportLayer = transportLayer;
    }

    loadVirtueEntries(start, end) {
        this.isLoading = true
        this.transportLayer.fetchVirtueEntries(start, end).then(fetchedVirtueEntries => {
            this.virtueEntries = fetchedVirtueEntries;
            this.isLoading = false;
        });
    }

    loadVirtueSets() {
        this.isLoading = true;
        this.transportLayer.fetchVirtueSets().then(fetchedVirtueSets => {
            this.virtueSets = fetchedVirtueSets;
            this.isLoading = false;;
        });
    }

    recordVirtueEntry(date, value, virtue_id) {
        this.transportLayer.postVirtueEntry(date, value, virtue_id).then(recordedVirtueEntry => {
            // store this
        });
    }

    recordVirtueStar(date, virtue_id) {
        this.transportLayer.postVirtueStar(date, virtue_id).then(recordedVirtueStar => {
            this.replaceVirtueStar(recordedVirtueStar);
        });
    }

    @action replaceVirtueStar(newVirtueStar) {
        let oldVirtueStar = this.virtueSets[0].virtue_stars.find(vs => {
            return vs.date === newVirtueStar.date
        })

        if (oldVirtueStar) {
            oldVirtueStar.virtue_id = newVirtueStar.virtue_id
        } else {
            this.virtueSets[0].virtue_stars.push(newVirtueStar)
        }
    }

    @computed get VirtueEntryDateMap() {
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

    @action selectDay(day) {
        this.selectedDay = day;
    }
}
