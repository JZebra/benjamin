import { computed, observable, action } from 'mobx';
import moment from 'moment-timezone';

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
        this.isLoading = true;
        this.transportLayer.fetchVirtueEntries(start, end).then(fetchedVirtueEntries => {
            this.virtueEntries = fetchedVirtueEntries;
        });
    }

    loadVirtueSets() {
        this.transportLayer.fetchVirtueSets().then(fetchedVirtueSets => {
            this.virtueSets = fetchedVirtueSets;
        })
    }

    recordVirtueEntry(date, value, virtue_id) {
        this.transportLayer.postVirtueEntry(date, value, virtue_id).then(recordedVirtueEntry => {
            // store this
        });
    }

    recordVirtueStar(date, virtue_id) {
        const initialVirtueId = virtue_id
        this.transportLayer.postVirtueStar(date, virtue_id).then(recordedVirtueStar => {
            const finalVirtueId = recordedVirtueStar.virtue_id
            this.replaceVirtueStar(initialVirtueId, finalVirtueId, recordedVirtueStar)
        });
    }

    @action replaceVirtueStar(initialVirtueId, finalVirtueId, virtueStar) {
        // TODO: Deletes a entry from starred_days and adds an entry to another virtue
    }



    @computed get VirtueEntryDateMap() {
        let dateMap = {};
        this.virtueEntries.forEach(virtueEntry => {
            const key = moment(virtueEntry.date).format('LL');
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
