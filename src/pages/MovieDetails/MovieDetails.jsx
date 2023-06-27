import { Cast } from 'components/Cast/Cast';
import { Link, Outlet } from 'react-router-dom';

export const MovieDetails = ({ image, title }) => {
  return (
    <>
      <button type="button">← GO back</button>
      <img src="http://placehold.it/350x50" alt="" />
      <ul>
        <li>
          <Link to={'cast'}>cast</Link>
        </li>
        <li>
          <Link to={'reviews'}>reviews</Link>
        </li>
      </ul>

      <Outlet />
    </>
  );
};
