import { useEffect, useState } from 'react';
import { getMovies } from 'API';
import { TrendingTodayList } from 'components/TrendingTodayList/TrendingTodayList';

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
  console.log(films);

  return (
    <main>
      <h1>Trending today</h1>
      <TrendingTodayList films={films}></TrendingTodayList>
    </main>
  );
};
