import { observable, action } from 'mobx';

export default class AppState {
    @observable virtueSets = [];

    @action storeVirtueSets(virtueSets) {
        this.virtueSets = virtueSets;
    }
}
