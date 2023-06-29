import { useEffect, useState } from 'react';
import { getMovies } from 'API';
import { FilmList } from 'components/FilmList/FilmList';

export const Home = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await getMovies();
      const movies = response.results;
      setFilms(movies);
    };

    fetchMovies();
  }, []);

  return (
    <main>
      <h1>Trending today</h1>
      <FilmList films={films}></FilmList>
    </main>
  );
};
