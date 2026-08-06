import './randomChar.scss';
import MarvelService from '../../services/MarvelService';

import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react';

class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.updateChar();
  }
  state = {
    char: {},
  };

  marvelService = new MarvelService();

  onCharLoaded = (char) => {
    this.setState({ char });
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * 20);
    this.marvelService.getCharacter(id).then(this.onCharLoaded);
  };

  render() {
    const {
      char: { name, description, thumbnail, homePage, wiki },
    } = this.state;

    const shortDescription =
      description?.length > 47 ? `${description.slice(0, 47)}...` : description;

    const visibleDescription = shortDescription
      ? shortDescription
      : 'для этого персонажа нет описания';

    return (
      <div className="randomchar">
        <div className="randomchar__block">
          <img src={thumbnail} alt="Random character" className="randomchar__img" />
          <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>

            <p className="randomchar__descr">{visibleDescription}</p>
            <div className="randomchar__btns">
              <a href={homePage} className="button button__main">
                <div className="inner">homePage</div>
              </a>
              <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

export default RandomChar;
