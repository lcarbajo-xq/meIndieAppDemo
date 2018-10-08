// Application name	meIndieApp
// API key	ea8ac249b3297be3fd9835fbdab301cf
// Shared secret	cef57bf923042dca84e0830b0efc2b8d
// Registered to	eRoCkSoN

class Api {
    async getTopArtists() {
        const url = 'https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=france&api_key=ea8ac249b3297be3fd9835fbdab301cf&format=json';
        const response = await fetch(url);
        const data  = await response.json();

        const artists = data.topartists.artist;
        const artist = artists.map(artist =>  ({
                id: artist.mbid,
                name: artist.name,
                image: artist.image[2]['#text'],
            }))
        return artist;
    }
}

export default new Api();


