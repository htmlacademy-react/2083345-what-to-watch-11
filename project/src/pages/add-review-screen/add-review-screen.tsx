import Logo from '../../components/logo/logo';
import {useParams} from 'react-router-dom';
import {PageRoute} from '../../const';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import {Link} from 'react-router-dom';
import User from '../../components/user/user';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import {fetchActiveDataAction} from '../../store/api-actions';
import {useEffect} from 'react';
import {MovieType} from '../../types/types';
import LoadingSpinner from '../../components/loading/loading-spinner';
import {getActiveMovie} from '../../store/active/selectors';
import {getLoadingStatus} from '../../store/service/selectors';

export default function AddReviewScreen(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (movie?.id.toString() !== params.id) {
      dispatch(fetchActiveDataAction(params.id as string));
    }
  }, []);

  const movie: MovieType | null = useAppSelector(getActiveMovie);
  const isLoading: boolean = useAppSelector(getLoadingStatus);

  if (isLoading || movie?.id.toString() !== params.id) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <section className="film-card film-card--full" style={{background: movie?.backgroundColor}}>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={movie?.backgroundImage} alt={movie?.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${PageRoute.Movie}/${movie?.id as number}`} className="breadcrumbs__link">{movie?.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <User/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={movie?.posterImage} alt={`${movie?.name as string} poster`} width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm/>
      </div>
    </section>
  );
}
