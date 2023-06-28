import axios from 'axios';

const KEY = '183c3cacc9c38c09c14d38798ccfe9d7';
const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export const getMovies = async () => {
  const response = await moviesApi.get('trending/all/day', {
    params: { api_key: KEY },
  });
  return response.data;
};

export const getMoviesById = async id => {
  const response = await moviesApi.get(`movie/${id}`, {
    params: { api_key: KEY },
  });

  return response;
};

export const getCastById = async id => {
  const response = await moviesApi.get(`movie/${id}/credits`, {
    params: { api_key: KEY },
  });

  return response;
};

export const getReviewsById = async id => {
  const response = await moviesApi.get(`movie/${id}/reviews`, {
    params: { api_key: KEY },
  });

  return response;
};
