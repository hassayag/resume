import queryString from 'querystring';

let tokenExpiresAt = Date.now();
let lastToken = '';

export default async function handler(req, res) {
    // const endpoint = 'https://api.spotify.com/v1/me/player/recently-played'
    const endpoint = 'https://api.spotify.com/v1/playlists/6OxOl1VenOr3gY4E0kDw7q/tracks';
    const token = await getToken();
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(endpoint, options);
    if (response.status !== 200) {
        res.status(response.status).send(response.statusText);
        return;
    }

    const data = await response.json();

    const trackUris = data.items?.map((item) => item.track.id);

    const randomUri = trackUris[Math.floor(trackUris.length * Math.random())];

    // const iframe = await getIFrame(randomUri)
    // if (!iframe) {
    //     res.status(404).send('not found')
    // }
    res.status(200).send(randomUri);
}

async function getIFrame(uri) {
    const token = await getToken();
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    // const response = await fetch(`https://open.spotify.com/embed-track/iframe-api/v1/${uri}`, options);
    const response = await fetch(
        `https://open.spotify.com/embed-podcast/iframe-api/v1/spotify:episode:00ANHlyEzJBowXkrljDvzr`,
        options
    );

    if (response.status !== 200) {
        throw new Error(`Spotify request failed - ${response.body}`);
        return;
    }

    const iframe = await response.text();
    return iframe;
}

async function getToken() {
    const endpoint = 'https://accounts.spotify.com/api/token';

    const requestBody = {
        grant_type: 'client_credentials',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString.stringify(requestBody),
    };

    if (!lastToken || Date.now() > tokenExpiresAt) {
        const response = await fetch(endpoint, options);
        const data = await response.json();

        lastToken = data.access_token;
        tokenExpiresAt = Date.now() + data.expires_in * 1000;
        return data.access_token;
    }

    return lastToken;
}

// async function login() {
//     const redirect_uri = 'http://localhost:3002/';
//     const state = crypto.randomBytes(20).toString('hex');
//     const scope = 'user-read-private user-read-email';

//     const requestBody = {
//         response_type: 'code',
//         client_id: CLIENT_ID,
//         scope: scope,
//         redirect_uri: redirect_uri,
//         state: state
//     };

//     const response = await fetch('https://accounts.spotify.com/authorize?' + queryString.stringify(requestBody))
//     if (response.status !== 200) {
//         res.status(response.status).send(response.statusText)
//         return;
//     }

//     const data = await response.text()
//     console.log(data)
//     return data;
// }
