// @flow

import { _fetch } from './utils'

export default class AppTransportLayer {

    fetchVirtues(): Promise<string> {
        const url = 'api/virtues/';
        return _fetch(url).then(res => res.json()).then(json => json)
    }

    fetchVirtueStars(): Promise<string> {
        const url = 'api/virtue_stars/';
        return _fetch(url).then(res => res.json()).then(json => json)
    }

    fetchVirtueEntries(start: string, end: string): Promise<string> {
        const queryString = `?startDate=${start}&endDate=${end}`;
        const url = 'api/virtue_entries' + queryString;

        return _fetch(url).then(res => res.json()).then(json => json);
    }

    fetchAllVirtueEntries() {
        const url = 'api/virtue_entries';
        return _fetch(url).then(res => res.json()).then(json => json);
    }

    postVirtueEntry(date:string , value:string, virtue_id: string): Promise<string> {
        const url = 'api/virtue_entries/';

        let payload = {
            date: date,
            value: value,
            virtue_id: virtue_id,
        };

        return _fetch(url, 'POST', payload).then(res => res.json()).then(json => json);
    }

    postVirtueStar(date:string, virtue_id: string): Promise<string> {
        const url = 'api/virtue_stars/';

        let payload = {
            date: date,
            virtue_id: virtue_id
        };

        return _fetch(url, 'POST', payload).then(res => res.json().then(json => json));
    }
}
