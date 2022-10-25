import {MovieType} from '../../types/types';
import {GenreFilter} from '../../const';

const selectedGenre = GenreFilter.All as string;

export type GenresListPropsType = {
  movies: MovieType[];
}

const getGenreElement = (genre: string): JSX.Element => (
  <li className={`catalog__genres-item  ${genre === selectedGenre ? 'catalog__genres-item--active' : ''}`} key={genre}>
    <a href="#" className="catalog__genres-link">{genre}</a>
  </li>
);

export default function GenresList({movies}: GenresListPropsType): JSX.Element {
  const orderedGenresList: string[] = [];
  orderedGenresList.push(GenreFilter.All);
  movies.forEach((movie) => {
    if (!orderedGenresList.includes(movie.genre)) {
      orderedGenresList.push(movie.genre);
    }
  });
  return <>{orderedGenresList.map((genre) => getGenreElement(genre))}</>;
}
