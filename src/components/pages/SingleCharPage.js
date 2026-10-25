import './singleComicPage.scss';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import errorGif from '../errorMessage/error.gif';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import banner from '../../resources/img/Banner.jpg';

import useMarvelService from '../../services/MarvelService';

const SingleCharPage = () => {
  const { charId } = useParams();
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    clearError();
    getCharacter(charId).then(onComicLoaded);
  };

  const onComicLoaded = (char) => {
    setChar(char);
  };

  const onImageError = (e) => {
    e.target.src = errorGif;
  };
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? (
    <View char={char} onImageError={onImageError} />
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ char, onImageError }) => {
  const { name, description, thumbnail } = char;
  return (
    <>
      <img src={banner} alt="banner" />
      <div className="single-comic">
        <img src={thumbnail} alt={name} className="single-char__img" onError={onImageError} />
        <div className="single-comic__info">
          <h2 className="single-comic__name">{name}</h2>
          <p className="single-comic__descr">{description}</p>
        </div>
      </div>
    </>
  );
};

export default SingleCharPage;
