import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCastById } from 'API';

export const Cast = () => {
  const [cast, setCast] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getCurrentMovie = async () => {
      try {
        const response = await getCastById(id);
        setCast(response.data.cast);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentMovie();
  }, [id]);

  return (
    <>
      {cast && (
        <ul>
          {cast.map(actor => {
            const actorsPhoto = actor.profile_path
              ? `https://image.tmdb.org/t/p/w92${actor.profile_path}`
              : 'http://dummyimage.com/92x138';
            return (
              <li key={actor.id}>
                <img src={actorsPhoto} alt="NonPhoto" />
                <p>{actor.original_name}</p>
                <p>Character: {actor.character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
