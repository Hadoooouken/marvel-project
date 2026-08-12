import './charList.scss';
import errorGif from '../errorMessage/error.gif';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import MarvelService from '../../services/MarvelService';
import { Component } from 'react';

class CharList extends Component {
  state = {
    char: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.getHeroList();
  }

  getHeroList() {
    this.marvelService
      .getAllCharacters()
      .then((res) => this.setHeroList(res))
      .catch(this.onError);
  }

  setHeroList(char) {
    this.setState({ char, loading: false });
  }

  onImageError = (e) => {
    e.target.src = errorGif;
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  marvelService = new MarvelService();
  render() {
    const heroList = this.state.char.map((listItem) => {
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
    const { loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? heroList : null;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {errorMessage} {spinner} {content}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
