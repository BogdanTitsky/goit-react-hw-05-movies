import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getReviewsById } from 'API';

export const Reviews = () => {
  const [reviews, setReviews] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getCurrentMovie = async () => {
      try {
        const response = await getReviewsById(id);
        setReviews(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentMovie();
  }, [id]);

  return (
    <>
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
