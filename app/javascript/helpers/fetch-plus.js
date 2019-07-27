import { isJSONResponse } from './response-helper';

export default function fetchPlus(url, options = { method: 'GET' }) {
  let timezoneOffset = new Date().getTimezoneOffset();
  const sign = timezoneOffset < 0 ? '+' : '-'; // yes, this is the opposite as expected
  timezoneOffset = Math.abs(timezoneOffset) / 60;

  let headers = {
    'Content-Type': 'application/json',
    'X-Timezone-Offset': `${sign}${timezoneOffset}`
  };

  if (options.method.toLowerCase() !== 'get') {
    const csrfToken = document.getElementsByName('csrf-token')[0].content;

    headers = Object.assign(headers, {
      'X-CSRF-Token': csrfToken,
    });
  }

  headers =  new Headers(headers);

  options = Object.assign({ headers }, options)

  let _res;

  return fetch(url, options)
    .then(res => {
      _res = res;

      if (res.headers.get('content-type').indexOf('application/json') !== -1) {
        return res.json();
      }

      throw(res.statusText);
    })
    .then(json => {
      return { json, res: _res };
    })
    .catch(e => {
      throw(e);
    });
}
