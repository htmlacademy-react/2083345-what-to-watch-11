import {MovieType, ReviewType} from '../../types/types';
import {Link} from 'react-router-dom';
import {MovieScreenTab, PageRoute} from '../../const';
import MovieOverview from '../movie-overview/movie-overview';
import MovieDetails from '../movie-details/movie-details';
import MovieReviews from '../movie-reviews/movie-reviews';
import {useAppSelector} from '../../hooks/store-hooks';
import {getActiveMovie, getReviews} from '../../store/active/selectors';

export type MovieTabsPropsData = {
  tab: number;
}

const renderTab = (tab: number, movie: MovieType, reviews: ReviewType[]) => {
  switch (tab) {
    case MovieScreenTab.Overview:
      return <MovieOverview {...movie}/>;
    case MovieScreenTab.Details:
      return <MovieDetails {...movie}/>;
    case MovieScreenTab.Reviews:
      return <MovieReviews {...reviews}/>;
  }
};

export default function MovieTabs({tab}: MovieTabsPropsData): JSX.Element | null {
  const movie: MovieType | null = useAppSelector(getActiveMovie);
  const reviews: ReviewType[] | null = useAppSelector(getReviews);

  if (!movie) {
    return null;
  }

  return (
    <div className="film-card__info">
      <div className="film-card__poster film-card__poster--big">
        <img src={movie?.posterImage} alt={`${movie.name} poster`} width="218"
          height="327"
        />
      </div>

      <div className="film-card__desc">
        <nav className="film-nav film-card__nav">
          <ul className="film-nav__list">
            <li className={`film-nav__item ${tab === MovieScreenTab.Overview ? 'film-nav__item--active' : ''}`}>
              <Link to={`${PageRoute.Movie}/${movie.id}`} className="film-nav__link">Overview</Link>
            </li>
            <li className={`film-nav__item ${tab === MovieScreenTab.Details ? 'film-nav__item--active' : ''}`}>
              <Link to={`${PageRoute.Movie}/${movie.id}${PageRoute.Details}`} className="film-nav__link">Details</Link>
            </li>
            <li className={`film-nav__item ${tab === MovieScreenTab.Reviews ? 'film-nav__item--active' : ''}`}>
              <Link to={`${PageRoute.Movie}/${movie.id}${PageRoute.Reviews}`} className="film-nav__link">Reviews</Link>
            </li>
          </ul>
        </nav>

        {renderTab(tab, movie, reviews)}

      </div>
    </div>
  );
}
