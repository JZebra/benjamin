import { computed, observable, action } from 'mobx';
import moment from 'moment-timezone';

export default class AppState {
    transportLayer;
    @observable virtueSets = [];
    @observable virtueEntries = [];
    @observable isLoading = true;

    constructor(transportLayer) {
        this.transportLayer = transportLayer;
    }

    loadVirtueEntries(start, end) {
        this.isLoading = true;
        this.transportLayer.fetchVirtueEntries(start, end).then(fetchedVirtueEntries => {
            this.virtueEntries = fetchedVirtueEntries;
        });
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

    @action storeVirtueSets(virtueSets) {
        this.virtueSets = virtueSets;
    }
}
