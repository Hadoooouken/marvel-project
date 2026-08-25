import './charList.scss';
import errorGif from '../errorMessage/error.gif';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import MarvelService from '../../services/MarvelService';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);

  const itemRefs = useRef([]);
  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest();
  },[]);

  const onRequest = (offset) => {
    onCharListLoading();
    marvelService
      .getAllCharacters(offset)
      .then((res) => setHeroList(res))
      .catch(onError);
  };

  const onCharListLoading = () => {
    setNewItemLoading(true);
  };

  const setHeroList = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList((charList) => [...charList, ...newCharList]);
    setLoading(false);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
  };

  const onImageError = (e) => {
    e.target.src = errorGif;
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  };

  const heroList = charList.map((listItem, index) => {
    return (
      <li
        ref={(el) => (itemRefs.current[index] = el)}
        className="char__item"
        key={listItem.id}
        onClick={() => {
          focusOnItem(index);
          props.onCharSelected(listItem.id);
        }}
      >
        <img src={listItem.thumbnail} alt={listItem.name} onError={onImageError} />
        <div className="char__name">{listItem.name}</div>
      </li>
    );
  });

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? heroList : null;

  return (
    <div className="char__list">
      <ul className="char__grid">
        {errorMessage} {spinner} {content}
      </ul>
      <button
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
        disabled={newItemLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};
export default CharList;
