import {createSlice} from '@reduxjs/toolkit';
import {HomeType} from '../../types/state';
import {ALL_GENRES_FILTER_NAME, Namespace} from '../../const';
import {genreChangeAction} from '../action';
import {fetchHomeDataAction} from '../api-actions';

const initialState: HomeType = {
  featuredMovie: null,
  selectedGenre: ALL_GENRES_FILTER_NAME,
  movies: [],
};

export const home = createSlice({
  name: Namespace.Home,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(genreChangeAction, (state, action) => {
        state.selectedGenre = action.payload;
      });

    builder
      .addCase(fetchHomeDataAction.fulfilled, (state, action) => {
        state.featuredMovie = action.payload.featuredMovie;
        state.movies = action.payload.movies;
      });
  }
});