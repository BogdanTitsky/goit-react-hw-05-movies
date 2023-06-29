import { useSearchParams } from 'react-router-dom';
import { getSearhedMovies } from 'API';
import { useEffect, useState } from 'react';
import { FilmList } from 'components/FilmList/FilmList';
import { Notify } from 'notiflix';

export const Movies = () => {
  const [searchInput, setSearchInput] = useState('');
  const [films, setFilms] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getFilms = async query => {
      const data = await getSearhedMovies(query);
      setFilms(data.results);

      if (data.results.length === 0) {
        Notify.failure('нема таких фільмів, напиши шось інше');
      }
    };

    const searchValue = searchParams.get('query');
    if (searchValue) {
      getFilms(searchValue);
    }
  }, [searchParams]);

  const handleSubmit = event => {
    event.preventDefault();

    if (!searchInput) {
      return Notify.failure('Шо ти тут шукаєш???');
    }
    setSearchParams({ query: searchInput });
    setSearchInput('');
  };

  return (
    <main>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {<FilmList films={films} />}
    </main>
  );
};
