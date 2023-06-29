import { useEffect, useState } from 'react';
import { getMovies } from 'API';
import { FilmList } from 'components/FilmList/FilmList';
import { Loader } from 'components/Loader/Loader';

export const Home = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await getMovies();
      const movies = response.results;
      setFilms(movies);

      if (response.results !== 0) {
        setError(false);
        setIsLoading(false);
      } else {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <main>
      <h1>Trending today</h1>

      {isLoading && <Loader />}
      {error && <p>Oops.. Simesing went wrong</p>}
      <FilmList films={films}></FilmList>
    </main>
  );
};
