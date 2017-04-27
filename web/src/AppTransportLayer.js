// TODO: move fetch into this file
import { _fetch } from './utils'

export default class AppTransportLayer {

    fetchVirtueEntries(start, end) {
        const queryString = `?startDate=${start}&endDate=${end}`;
        const url = 'api/virtue_entries' + queryString;

        return _fetch(url).then(res => res.json()).then(json => json);
    }

}
