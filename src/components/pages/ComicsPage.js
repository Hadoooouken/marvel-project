import ComicsList from '../comicsList/ComicsList';
import banner from '../../resources/img/Banner.jpg';
import { Helmet } from 'react-helmet';

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page with list of our comics" />
        <title>Comics page</title>
      </Helmet>
      <img src={banner} alt="banner" />

      <ComicsList />
    </>
  );
};

export default ComicsPage;
