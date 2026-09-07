import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();
  const _apiBase = 'https://marvel-server-zeta.vercel.app/characters/';
  const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
  const _baseOffset = 0;
  const _apiBaseComics = 'https://marvel-server-zeta.vercel.app/comics/';

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}${id}?${_apiKey}`);

    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homePage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const getAllComics = async (offset = _baseOffset) => {
      const res = await request(`${_apiBaseComics}?limit=9&offset=${offset}&${_apiKey}`);
      return res.data.results
    };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    clearError,
    getAllComics
  };
};

export default useMarvelService;
