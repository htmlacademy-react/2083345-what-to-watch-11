import {MovieType} from './types/types';

export enum PageRoute {
  Home = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Movie = '/movie',
  Details = '/details',
  Reviews = '/reviews',
  AddReview = '/review',
  Player = '/player'
}
export enum ApiRoute {
  Movies = '/films',
  Movie = '/film',
  Similar = '/similar',
  Featured = '/promo',
  MyList = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum MovieScreenTab {
  Overview,
  Details,
  Reviews
}

export const ALL_GENRES_FILTER_NAME = 'All Genres';

export const MAX_MOVIES_SHOWN_HOME = 8;

export const PLACEHOLDER_MOVIE: MovieType = {
  id: -1,
  name: '',
  posterImage: '',
  previewImage: '',
  backgroundImage: '',
  backgroundColor: '',
  videoLink: '',
  previewVideoLink: '',
  description: '',
  rating: 0,
  scoresCount: 0,
  director: '',
  starring: [],
  runTime: 0,
  genre: '',
  released: 0,
  isFavorite: false,
};

export const SHOW_ERROR_TIME_LIMIT = 5000;

export enum StatusCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404
}
