import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import MovieList from '../../components/movie-list/movie-list';
import GenresList from '../../components/genres-list/genres-list';
import {useNavigate} from 'react-router-dom';
import {PageRoute} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import User from '../../components/user/user';
import {useEffect} from 'react';
import {fetchHomeDataAction} from '../../store/api-actions';
import LoadingSpinner from '../../components/loading/loading-spinner';
import MyListButton from '../../components/my-list-button/my-list-button';
import {getFeaturedMovie, getMovies} from '../../store/home/selectors';
import {Link} from 'react-router-dom';


export default function HomeScreen(): JSX.Element {
  const featuredMovie = useAppSelector(getFeaturedMovie);
  const movies = useAppSelector(getMovies);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHomeDataAction());
  }, []);

  if (!movies.length || !featuredMovie) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={featuredMovie?.backgroundImage} alt={featuredMovie?.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo/>
          <User/>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <Link to={`/movie/${featuredMovie.id}`}>
                <img src={featuredMovie?.posterImage} alt={`${featuredMovie?.name} poster`} width="218"
                  height="327"
                />
              </Link>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title" onClick={() => navigate(`/movie/${featuredMovie.id}`)}>{featuredMovie?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{featuredMovie?.genre}</span>
                <span className="film-card__year">{featuredMovie?.released}</span>
              </p>

              <div className="film-card__buttons">
                <button onClick={() => navigate(`${PageRoute.Player}/${featuredMovie?.id}`)}
                  className="btn btn--play film-card__button" type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <MyListButton movie={featuredMovie}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content"
        style={{backgroundImage: `linear-gradient(-180deg, ${featuredMovie?.backgroundColor} -500%, #000000 100%)`}}
      >
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <GenresList movies={movies}/>
          </ul>

          <MovieList movies={movies} isAtHome/>

        </section>

        <Footer/>
      </div>
    </>
  );
}
