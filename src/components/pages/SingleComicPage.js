import './singleComicPage.scss';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import errorGif from '../errorMessage/error.gif';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import useMarvelService from '../../services/MarvelService';

const SingleComicPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);

  const { loading, error, getComic, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComic(comicId).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const onImageError = (e) => {
    e.target.src = errorGif;
  };
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? (
    <View comic={comic} onImageError={onImageError} />
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comic, onImageError }) => {
  const { title, description, pageCount, thumbnail, textObjects, prices } = comic;
  console.log(comic);
  return (
    <div className="single-comic">
      <img
        src={`${thumbnail.path}.${thumbnail.extension}`}
        alt={title}
        className="single-comic__img"
        onError={onImageError}
      />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {textObjects.languages}</p>
        <div className="single-comic__price">{prices[0].price}$</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
