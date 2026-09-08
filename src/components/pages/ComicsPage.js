import ComicsList from '../comicsList/ComicsList';
import banner from '../../resources/img/Banner.jpg';

const ComicsPage = () => {
  return (
    <>
      <img src={banner} alt="banner" />

      <ComicsList />
    </>
  );
};

export default ComicsPage
