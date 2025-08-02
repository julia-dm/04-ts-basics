import { useState,useEffect } from 'react';

import MovieGrid from "../MovieGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from '../MovieModal/MovieModal';
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import ReactPaginate from 'react-paginate';
import { toast } from 'react-hot-toast'; 
import css from "../App/App.module.css";
import { useQuery ,keepPreviousData} from '@tanstack/react-query';

export default function App() {
  const [name, setName] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(1);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ['movies', name, page,fetchMovies],
    queryFn: () => fetchMovies(name, page),
    enabled: name !== "",
    placeholderData: keepPreviousData,
    
  });
  useEffect(() => {
    if (isSuccess && data?.results?.length === 0) {
      toast.error("No movies found for your request..");
    }
  }, [isSuccess, data]);
  
  const totalPages = data?.total_pages ?? 0;

  const handleSearch = (query: string) => {
    setName(query);
    setPage(1); 
    
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={page- 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />
      )}


      {data && data.results.length > 0 && (
        <MovieGrid onSelect={handleSelect} movies={data.results} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}