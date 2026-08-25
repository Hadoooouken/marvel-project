import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './charInfo.scss';
import errorGif from '../errorMessage/error.gif';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
const marvelService = new MarvelService();

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    updateChar();
  }, [charId]);

  // componentDidUpdate(prevProps) {
  //   if (this.props.charId !== prevProps.charId) {
  //     this.updateChar();
  //   }
  // }

  const updateChar = () => {
    if (!charId) {
      return;
    }
    onCharLoading();
    marvelService.getCharacter(charId).then(onCharLoaded).catch(onError);
  };

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };

  const onCharLoading = () => {
    setLoading(true);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const onImageError = (e) => {
    e.target.src = errorGif;
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? (
    <View char={char} onImageError={onImageError} />
  ) : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char, onImageError }) => {
  const { name, description, thumbnail, homePage, wiki, comics } = char;
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} onError={onImageError} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homePage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length === 0 && 'There is no comics with character'}
        {comics.map((item, index) => {
          return (
            <li key={index} className="char__comics-item">
              {item}
            </li>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
