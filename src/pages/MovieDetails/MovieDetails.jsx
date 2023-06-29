import { getMoviesById } from 'API';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useParams, Link } from 'react-router-dom';
import { Aditional, GoBack, MovieInfo } from './MovieDetails.styled';
import { Loader } from 'components/Loader/Loader';

const MovieDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');

  const [currentMovie, setCurrentMovie] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getCurrentMovie = async () => {
      try {
        const response = await getMoviesById(id);
        setCurrentMovie(response.data);
        setIsLoading(false);
        if (!response.data) {
          setError(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentMovie();
  }, [id]);

  const posterUrl = currentMovie?.poster_path
    ? `https://image.tmdb.org/t/p/w200${currentMovie.poster_path}`
    : 'http://placehold.it/200x300';

  const userScore = currentMovie ? currentMovie.vote_average * 10 : null;

  return (
    <main>
      {isLoading && <Loader />}
      {error && <p>Oops.. Simesing went wrong</p>}
      <GoBack to={backLinkLocationRef.current}>← GO back</GoBack>
      {currentMovie && (
        <>
          <MovieInfo>
            <img src={posterUrl} alt="" />
            <div>
              <h2>{currentMovie.original_title}</h2>
              <p>User Score: {userScore}%</p>
              <h2>Overview</h2>
              <p>{currentMovie.overview ?? 'There is no review'}</p>
              <h2>Genres</h2>
              <p>{currentMovie.genres.map(genre => genre.name).join(' ')}</p>
            </div>
          </MovieInfo>
          <Aditional>
            <h2>Aditional informations</h2>
            <ul>
              <li>
                <Link to={'cast'}>cast</Link>
              </li>
              <li>
                <Link to={'reviews'}>reviews</Link>
              </li>
            </ul>
          </Aditional>
        </>
      )}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MovieDetails;
