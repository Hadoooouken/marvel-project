class MarvelService {
  _apiBase = 'https://marvel-server-zeta.vercel.app/characters/';
  _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(`${this._apiBase}?limit=9&offset=0&${this._apiKey}`);
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homePage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items

    };
  };
}

export default MarvelService;
