import Logo from '../../components/logo/logo';
import {useNavigate} from 'react-router-dom';
import NotFoundScreen from '../not-found/not-found-screen';
import {AuthorizationStatus, PageRoute} from '../../const';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import {Link} from 'react-router-dom';
import User from '../../components/user/user';
import LoadingSpinner from '../../components/loading/loading-spinner';
import {useAppSelector} from '../../hooks/store-hooks';

export default function AddReviewScreen(): JSX.Element {
  const navigate = useNavigate();

  const movie = useAppSelector((state) => state.active.movie);
  const isDataLoading = useAppSelector((state) => state.api.isDataLoading);
  const authStatus = useAppSelector((state) => state.api.authStatus);

  if (isDataLoading) {
    return <LoadingSpinner/>;
  }
  if (authStatus !== AuthorizationStatus.Auth) {
    navigate(PageRoute.SignIn);
  }
  if (movie === undefined) {
    return <NotFoundScreen />;
  }

  return (
    <section className="film-card film-card--full" style={{background: movie.backgroundColor}}>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={movie.backgroundImage} alt={movie.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${PageRoute.Movie}/${movie.id}`} className="breadcrumbs__link">{movie.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <User/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={movie.posterImage} alt={`${movie.name} poster`} width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm reviewedMovieId={movie.id}/>
      </div>
    </section>
  );
}
