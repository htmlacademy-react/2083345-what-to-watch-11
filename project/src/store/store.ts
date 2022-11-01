import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './root-reducer';
import {createApi} from '../api/api';
import {redirect} from './middlewares/redirect';

export const api = createApi();
export const store = configureStore({rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
