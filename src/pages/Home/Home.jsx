import { useEffect, useState } from 'react';
import { getMovies } from 'API';
import { FilmList } from 'components/FilmList/FilmList';
import { Loader } from 'components/Loader/Loader';

const Home = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await getMovies();
      const movies = response.results;
      setFilms(movies);

      setIsLoading(false);
      if (!response.results) {
        setError(true);
      }
    };

    fetchMovies();
  }, []);

  return (
    <main>
      <h1>Trending today</h1>

      <FilmList films={films}></FilmList>
      {isLoading && <Loader />}
      {error && <p>Oops.. Simesing went wrong</p>}
    </main>
  );
};

export default Home;
