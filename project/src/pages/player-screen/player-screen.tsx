import {MovieType} from '../../types/types';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import {useEffect} from 'react';
import {fetchActiveDataAction} from '../../store/api-actions';
import LoadingSpinner from '../../components/loading/loading-spinner';
import VideoPlayer from '../../components/video-player/video-player';
import {getActiveMovie} from '../../store/active/selectors';
import {getLoadingStatus} from '../../store/service/selectors';

export default function PlayerScreen(): JSX.Element {
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
    <VideoPlayer movie={movie as MovieType}/>
  );
}
