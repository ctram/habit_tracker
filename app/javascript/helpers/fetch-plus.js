export default function fetchPlus(url, options = { method: 'GET' }) {
    let defaults = {
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };

    options = Object.assign(defaults, options)

    return fetch(url, options);
}
