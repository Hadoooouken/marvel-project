import './charList.scss';
import errorGif from '../errorMessage/error.gif';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import MarvelService from '../../services/MarvelService';
import { Component } from 'react';

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 0,
    charEnded: false,
  };

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then((res) => this.setHeroList(res))
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  setHeroList(newCharList) {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  }

  onImageError = (e) => {
    e.target.src = errorGif;
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  marvelService = new MarvelService();
  render() {
    const heroList = this.state.charList.map((listItem) => {
      return (
        <li
          className="char__item"
          key={listItem.id}
          onClick={() => this.props.onCharSelected(listItem.id)}
        >
          <img src={listItem.thumbnail} alt={listItem.name} onError={this.onImageError} />
          <div className="char__name">{listItem.name}</div>
        </li>
      );
    });
    const { loading, error, offset, newItemLoading, charEnded } = this.state;
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
          onClick={() => this.onRequest(offset)}
          disabled={newItemLoading}
          style={{ display: charEnded ? 'none' : 'block' }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
