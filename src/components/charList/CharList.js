import './charList.scss';
import errorGif from '../errorMessage/error.gif';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';


const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);
  const {loading, error, getAllCharacters } = useMarvelService();
  const itemRefs = useRef([]);


  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ?  setNewItemLoading(false) :  setNewItemLoading(true);
   
    getAllCharacters(offset).then((res) => setHeroList(res));
  };

  const setHeroList = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
  };

  const onImageError = (e) => {
    e.target.src = errorGif;
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
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  // const content = !(loading || error) ? heroList : null;

  return (
    <div className="char__list">
      <ul className="char__grid">
        {errorMessage} {spinner} 
        {heroList}
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
