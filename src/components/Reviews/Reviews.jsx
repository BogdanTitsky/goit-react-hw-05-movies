import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getReviewsById } from 'API';
import { Loader } from 'components/Loader/Loader';

const Reviews = () => {
  const [reviews, setReviews] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getCurrentMovie = async () => {
      try {
        const response = await getReviewsById(id);
        setReviews(response.data.results);
        setIsLoading(false);
        if (!response.data.results) {
          setError(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentMovie();
  }, [id]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>Oops.. Simesing went wrong</p>}
      {reviews && (
        <>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map(review => {
                return (
                  <li key={review.id}>
                    <h3>Athor: {review.author}</h3>
                    <p>{review.content}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>We don't have any reviews for this movie.</p>
          )}
        </>
      )}
    </>
  );
};

export default Reviews;
