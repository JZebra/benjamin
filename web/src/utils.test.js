import moment from 'moment';

import { getCSRFTokenFromCookie, _fetch, _format } from './utils.js';


const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

describe('getCSRFTokenFromCookie', () => {
    it('parses a Django SessionAuthentication cookie correctly', () => {
        document.cookie = "djdt=hide csrftoken=XKq5IVCO5cCt2vZ77sp54jWEkIursVlCc3OleO3edxMS4ygfFUUkq06EM6K7xDib"
        const csrftoken = getCSRFTokenFromCookie()
        expect(csrftoken).toBe('XKq5IVCO5cCt2vZ77sp54jWEkIursVlCc3OleO3edxMS4ygfFUUkq06EM6K7xDib');
    });
});

describe('_format', () => {
    it('formats moment objects to YYYY-MM-DD strings', () => {
        const testDate = moment(623900000000);
        expect(_format(testDate)).toBe('1989-10-08');
    });
});

describe('_fetch', () => {
    it('calls window.fetch on the correct url', () => {
        document.cookie = "djdt=hide csrftoken=XKq5IVCO5cCt2vZ77sp54jWEkIursVlCc3OleO3edxMS4ygfFUUkq06EM6K7xDib";
        let fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => {
            return Promise.resolve(mockResponse(200, 'ok', JSON.stringify({})))
        })

        _fetch('test_url').then(res => res.json()).then(json => console.log(json))
        expect(fetchSpy).toHaveBeenCalled()

        expect(fetchSpy.mock.calls[0][0]).toBe("http://localhost:8000/test_url")
        expect(fetchSpy.mock.calls[0][1]).toBe({"accept": "application/json", "credentials": "include", "headers": {"map": {"content-type": "application/json", "x-csrftoken": "XKq5IVCO5cCt2vZ77sp54jWEkIursVlCc3OleO3edxMS4ygfFUUkq06EM6K7xDib"}}, "method": "GET"})
    });
});

