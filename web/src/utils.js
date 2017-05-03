/* @flow */

export function getCSRFTokenFromCookie(): string {
    const cookie = document.cookie;
    const re = /csrftoken=([0-9a-zA-Z]+)/;
    const matches = cookie.match(re);
    if (matches != null && matches[1]) {
        return matches[1];
    } else {
        throw 'CSRF Token not found in cookie.';
    }
}

export function _fetch(url: string, method: MethodType='GET', payload?: Object) {
    // TODO Move this to env or settings file
    const baseURL = 'http://localhost:8000/'
    const fullURL = baseURL + url;
    const headers = new Headers({
        'X-CSRFToken':  getCSRFTokenFromCookie(),
        'Content-Type': 'application/json'
    });

    let options: RequestOptions = {
        method: method,
        headers: headers,
        credentials: 'include',
        accept: 'application/json'
    };


    if (payload) {
        options['body'] = JSON.stringify(payload);
    }

    return fetch(fullURL, options);
  }

export function _format(momentDate: Object): string {
    return momentDate.format('YYYY-MM-DD');
}
