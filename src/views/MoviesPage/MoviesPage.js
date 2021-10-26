import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getMoviesBySearch, getMoviesByQuery } from '../../services/API';
import MoviesList from '../../components/MoviesList/MoviesList';
import SearchBar from '../../components/SearchBar/SearchBar';
import PageHeading from '../../components/PageHeading/PageHeading';
import { useHistory } from 'react-router-dom';

const MoviesPage = () => {
  const history = useHistory();
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (history.location?.search !== '') {
      const prevQuery = history.location?.search.split('=')[1];
      getMoviesByQuery(prevQuery).then(setMovies);
      setQuery(prevQuery);
    }
    if (!query) {
      return;
    }
    getMoviesBySearch(query).then(({ results }) => {
      if (results.length === 0) {
        toast.error('There are no results. Try another query');
        return;
      }
      setMovies(results);
      toast.success('Movies on your query');
    });
  }, [history.location?.search, query]);

  const onSubmit = query => {
    setQuery(query);
    setMovies([]);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <PageHeading text={query} />
      {movies && <MoviesList movies={movies} />}
    </>
  );
};

export default MoviesPage;
