import { useState } from 'react';

import MovieGrid from "../MovieGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from '../MovieModal/MovieModal';
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import { toast } from 'react-hot-toast'; 

export default function App(){
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSearch = async (query: string) => {
        try {
        setIsLoading(true);
        setIsError(false);
        setMovies([]);

        const data = await fetchMovies(query);
        if(data.length === 0){
          toast.error(" No movies found for your request..")
          return;
  
        }
        setMovies(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
      
    };
    const handleSelect = (movie: Movie) => {
      setSelectedMovie(movie)
    };
    return(
        <div> 
        <SearchBar onSubmit={handleSearch} />
        {isLoading && <Loader/>}
        {isError && <ErrorMessage/>}
        {movies.length > 0 && (
       <MovieGrid onSelect={handleSelect} movies={movies}/>
      )}
      {selectedMovie && (
  <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
)}
        
        </div>
       
    )
}