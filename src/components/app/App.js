import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

import decoration from '../../resources/img/vision.png';
import banner from '../../resources/img/Banner.jpg';
import { useState } from 'react';


import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import ComicsList from '../comicsList/ComicsList';



const App = () => {
  // const [selectedChar, setChar] = useState(null);

  // const onCharSelected = (id) => {
  //   setChar(id);
  // };

  return (
    <div className="app">
      <AppHeader />

      <main>
        <div>
          <img src={banner} alt="banner" />
        </div>
        <ComicsList/>
        {/* <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>

        <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected} />
          </ErrorBoundary>

          <ErrorBoundary>
            <CharInfo charId={+selectedChar} />
          </ErrorBoundary>
        </div> */}
        {/* <img className="bg-decoration" src={decoration} alt="vision" /> */}
      </main>
    </div>
  );
};

export default App;
