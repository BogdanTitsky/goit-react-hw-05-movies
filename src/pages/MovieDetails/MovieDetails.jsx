import { getMoviesById } from 'API';
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

export const MovieDetails = () => {
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');

  const [currentMovie, setCurrentMovie] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getCurrentMovie = async () => {
      try {
        const response = await getMoviesById(id);
        setCurrentMovie(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentMovie();
  }, [id]);

  const posterUrl =
    currentMovie &&
    `https://image.tmdb.org/t/p/w200${currentMovie.poster_path}`;

  const userScore = currentMovie ? currentMovie.vote_average * 10 : null;

  return (
    <>
      <Link to={backLinkLocationRef.current}>← GO back</Link>
      {currentMovie && (
        <>
          <img src={posterUrl} alt="" />
          <h2>{currentMovie.original_title}</h2>
          <p>User Score: {userScore}%</p>
          <h2>Overview</h2>
          <p>{currentMovie.overview ?? 'There is no review'}</p>
          <h2>Genres</h2>
          <p>{currentMovie.genres.map(genre => genre.name).join(' ')}</p>
          <h2>Aditional informations</h2>
          <ul>
            <li>
              <Link to={'cast'}>cast</Link>
            </li>
            <li>
              <Link to={'reviews'}>reviews</Link>
            </li>
          </ul>
        </>
      )}
      <Outlet />
    </>
  );
};
