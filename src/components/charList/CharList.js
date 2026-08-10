import './charList.scss';
import errorGif  from '../errorMessage/error.gif';

import MarvelService from '../../services/MarvelService';
import { Component } from 'react';

class CharList extends Component {
  constructor() {
    super();
    this.state = {
      char: [],
    };
  }

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
    this.setState({ char });
  }

  onImageError = (e) => {
    e.target.src = errorGif ;
  };

  marvelService = new MarvelService();
  render() {
    const heroList = this.state.char.map((listItem, index) => {
      return (
        <li className="char__item" key={index}>
          <img src={listItem.thumbnail} alt="abyss" onError={this.onImageError} />
          <div className="char__name">{listItem.name}</div>
        </li>
      );
    });

    return (
      <div className="char__list">
        <ul className="char__grid">{heroList}</ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
