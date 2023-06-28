import { Link, useLocation } from 'react-router-dom';

export const TrendingTodayList = ({ films }) => {
  const location = useLocation();

  return (
    <ul>
      {films.map(film => {
        return (
          <li key={film.id}>
            <Link to={`movies/${film.id}`} state={{ from: location }}>
              {film.title || film.name || film.original_title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
