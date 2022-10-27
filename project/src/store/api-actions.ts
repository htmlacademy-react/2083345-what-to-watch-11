import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../types/state';
import {State} from '../types/state';
import {AxiosInstance} from 'axios';
import {ActiveMovieDataType, AuthDataType, HomeDataType, MovieType, ReviewType, UserDataType} from '../types/types';
import {ApiRoute, AuthorizationStatus, PLACEHOLDER_MOVIE, SHOW_ERROR_TIME_LIMIT} from '../const';
import {
  loadActiveMovieDataAction,
  loadsHomeMovieDataAction,
  requireAuthorizationAction,
  setLoadingStatusAction
} from './action';
import {Omit} from '@reduxjs/toolkit/dist/tsHelpers';
import {setErrorAction} from './action';
import {store} from './store';
import {dropToken, saveToken} from '../api/token';

export const fetchMoviesHomeAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'api/getMoviesHome',
  async (_, {dispatch, extra: api}) => {
    dispatch(setLoadingStatusAction(true));

    const homeData: Omit<HomeDataType, 'selectedGenre'> = {
      movies: [],
      featuredMovie: PLACEHOLDER_MOVIE
    };

    homeData.movies = (await api.get<MovieType[]>(ApiRoute.Movies)).data;
    homeData.featuredMovie = (await api.get<MovieType>(ApiRoute.Featured)).data;

    dispatch(loadsHomeMovieDataAction(homeData));
    dispatch(setLoadingStatusAction(false));
  },
);

export const fetchActiveMovieDataAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'api/getActiveMovieData',
  async (movieId, {dispatch, extra: api}) => {
    dispatch(setLoadingStatusAction(true));

    const activeData: ActiveMovieDataType = {
      movie: PLACEHOLDER_MOVIE,
      similar: [],
      reviews: [],
    };

    activeData.movie = (await api.get<MovieType>(`${ApiRoute.Movies}/${movieId}`)).data;
    activeData.similar = (await api.get<MovieType[]>(`${ApiRoute.Movies}/${movieId}${ApiRoute.Similar}`)).data;
    activeData.reviews = (await api.get<ReviewType[]>(`${ApiRoute.Comments}/${movieId}`)).data;


    dispatch(loadActiveMovieDataAction(activeData));
    dispatch(setLoadingStatusAction(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(ApiRoute.Login);
      dispatch(requireAuthorizationAction(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorizationAction(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthDataType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserDataType>(ApiRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorizationAction(AuthorizationStatus.Auth));
    //dispatch(redirectToRoute(PageRoute.Result));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(requireAuthorizationAction(AuthorizationStatus.NoAuth));
  },
);

export const clearErrorAction = createAsyncThunk(
  'game/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setErrorAction(null)),
      SHOW_ERROR_TIME_LIMIT,
    );
  },
);