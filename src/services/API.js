import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = {
  api_key: '3d673b2d8e40eafc68577fae5a6a1f4b',
  page: 1,
  language: 'en-US',
};

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';

async function getTrendingMovies() {
  const { data } = await axios
    .get('/trending/movie/day')
    .then(data => data)
    .catch(function (error) {
      toast.error(error);
    });
  return data;
}

async function getMoviesBySearch(searchQuery) {
  const { data } = await axios
    .get('/search/movie?', {
      params: { query: searchQuery },
    })
    .then(data => data)
    .catch(function (error) {
      toast.error(error);
    });
  return data;
}

async function getMovieDetails(movieId) {
  const { data } = await axios
    .get(`/movie/${movieId}`)
    .then(data => data)
    .catch(function (error) {
      toast.error(error);
    });
  return data;
}

async function getMovieCredits(movieId) {
  const { data } = await axios
    .get(`/movie/${movieId}/credits`)
    .then(data => data);
  return data.cast;
}

async function getMovieReviews(movieId) {
  const { data } = await axios
    .get(`/movie/${movieId}/reviews`)
    .then(data => data);
  return data.results;
}
async function getMoviesByQuery(query) {
  const { data } = await axios
    .get(`/search/movie?`, {
      params: { query: query },
    })
    .then(data => data);
  return data.results;
  //   const {
  //     data: { results },
  //   } = await axios.get(`/search/movie?api_key=${API_KEY}&query=${query}`);
  //   return results;
}

export {
  getTrendingMovies,
  getMoviesBySearch,
  getMovieDetails,
  getMovieCredits,
  getMovieReviews,
  BASE_IMAGE_URL,
  getMoviesByQuery,
};
