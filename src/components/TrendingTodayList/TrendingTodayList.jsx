import { Link } from 'react-router-dom';

export const TrendingTodayList = ({ films }) => {
  return (
    <ul>
      {films.map(film => {
        return (
          <li key={film.id}>
            <Link to={`movies/${film.id}`}>
              {film.title || film.name || film.original_title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
