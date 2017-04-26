function getCSRFTokenFromCookie() {
    const cookie = document.cookie;
    const re = /csrftoken=([0-9a-zA-Z]+)/;
    return cookie.match(re)[1];
}

export function _fetch(url, method='GET', payload=null) {
    // TODO Move this to env or settings file
    const baseURL = 'http://localhost:8000/'
    const fullURL = baseURL + url;
    const headers = new Headers({
        'X-CSRFToken':  getCSRFTokenFromCookie(),
        'Content-Type': 'application/json'
    });

    let options = {
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

