import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '100px', marginBlockEnd: '20px' }}>404</p>
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '40px', marginBlockEnd: '50px' }}>
        Page doesn't exist
      </p>
      <Link
        style={{ display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: '50px', color: '#9F0013' }}
        to="/"
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
