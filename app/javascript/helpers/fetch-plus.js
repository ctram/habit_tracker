export default function fetchPlus(url, options = { method: 'GET' }) {
    let headers = {
        'Content-Type': 'application/json'
    };

    if (options.method.toLowerCase() !== 'get') {
      const csrfToken = document.getElementsByName('csrf-token')[0].content;

      headers = Object.assign(headers, {
        'X-CSRF-Token': csrfToken
      });
    }

    headers =  new Headers(headers);

    options = Object.assign({ headers }, options)

    return fetch(url, options);
}
