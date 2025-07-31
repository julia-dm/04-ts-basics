export interface Movie {
    objectID: string;
    title: string;
    url: string;
  }
  export interface MoviesHttpResponse {
    hits: Movie[];
  }