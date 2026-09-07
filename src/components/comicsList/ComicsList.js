import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const ComicsList = () => {
  const { loading, error, getAllComics } = useMarvelService();
  const [comicsList, setComicsList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);

    getAllComics(offset).then((res) => setItemList(res));
  };

  const setItemList = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 9) {
      ended = true;
    }
    setComicsList((prev) => [...prev, ...newComicsList]);
    setNewItemLoading(false);
    setOffset((prev) => prev + 9);
    setComicsEnded(ended);
  };


  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  const comicsItem = comicsList.map((comicsItem) => {
    return (
      <li className="comics__item" key={comicsItem.id}>
        <a href="#">
          <img
            src={`${comicsItem.thumbnail.path}.${comicsItem.thumbnail.extension}`}
            alt={comicsItem.title}
            className="comics__item-img"
          />
          <div className="comics__item-name">{comicsItem.title}</div>
          <div className="comics__item-price">{comicsItem.prices[0].price}$</div>
        </a>
      </li>
    );
  });

  return (
    <div className="comics__list">
      <ul className="comics__grid">
        {errorMessage}
        {spinner}
        {comicsItem}
      </ul>
      {comicsEnded ? null : (
        <button
          className="button button__main button__long"
          onClick={() => onRequest(offset, false)}
          disabled={newItemLoading}
        >
          <div className="inner">load more</div>
        </button>
      )}
    </div>
  );
};

export default ComicsList;
