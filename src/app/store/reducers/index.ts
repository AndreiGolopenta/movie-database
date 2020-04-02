import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromMovie from './movie.reducers';

export interface StoreState {
    movie: fromMovie.MovieState;
}

export const reducers: ActionReducerMap<StoreState> = {
    movie: fromMovie.reducer
};

export const getMovieState = createFeatureSelector('movie');
