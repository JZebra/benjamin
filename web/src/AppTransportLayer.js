// TODO: move fetch into this file
import { _fetch } from './utils'

export default class AppTransportLayer {

    fetchVirtueEntries(start, end) {
        const queryString = `?startDate=${start}&endDate=${end}`;
        const url = 'api/virtue_entries' + queryString;

        return _fetch(url).then(res => res.json()).then(json => json);
    }

    fetchVirtueSets() {
        const url = 'api/virtue_sets/';
        return _fetch(url).then(res => res.json())
        .then(json => json)
    }

    postVirtueEntry(date, value, virtue_id) {
        const url = 'api/virtue_entries/';

        let payload = {
            date: date,
            value: value,
            virtue_id: virtue_id,
        };

        return _fetch(url, 'POST', payload).then(res => res.json()).then(json => json);
    }

    postVirtueStar(date, virtue_id) {
        const url = 'api/virtue_stars/';

        let payload = {
            date: date,
            virtue_id: virtue_id
        };

        return _fetch(url, 'POST', payload).then(res => res.json().then(json => json));
    }
}
