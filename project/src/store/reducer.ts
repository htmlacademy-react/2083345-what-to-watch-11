import {createReducer} from '@reduxjs/toolkit';
import {
  genreChangeAction,
  loadActiveMovieDataAction,
  loadsHomeMovieDataAction,
  requireAuthorizationAction, setErrorAction, setLoadingStatusAction
} from './action';
import {ALL_GENRES_FILTER_NAME, AuthorizationStatus, PLACEHOLDER_MOVIE} from '../const';
import {StateType} from '../types/types';

const initialState: StateType = {
  active: {
    movie: PLACEHOLDER_MOVIE,
    similar: [],
    reviews: [],
  },
  home: {
    featuredMovie: PLACEHOLDER_MOVIE,
    selectedGenre: ALL_GENRES_FILTER_NAME,
    movies: [],
  },
  myList: [],
  api: {
    authStatus: AuthorizationStatus.Unknown,
    isDataLoading: false,
    error: null
  }
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(genreChangeAction, (state, action) => {
      state.home.selectedGenre = action.payload;
    })
    .addCase(loadsHomeMovieDataAction, (state, action) => {
      state.home.featuredMovie = action.payload.featuredMovie;
      state.home.movies = action.payload.movies;
    })
    .addCase(loadActiveMovieDataAction, (state, action) => {
      state.active = action.payload;
    })
    .addCase(requireAuthorizationAction, (state, action) => {
      state.api.authStatus = action.payload;
    })
    .addCase(setLoadingStatusAction, (state, action) => {
      state.api.isDataLoading = action.payload;
    })
    .addCase(setErrorAction, (state, action) => {
      state.api.error = action.payload;
    });
});

export {reducer};
