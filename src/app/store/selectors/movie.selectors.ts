import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromMovie from '../reducers/movie.reducers';

export const getSearchData = createSelector(
    fromFeature.getMovieState,
    fromMovie.getSearchData
);

export const getWatchlist = createSelector(
    fromFeature.getMovieState,
    fromMovie.getWatchlist
);

export const getSortBy = createSelector(
    fromFeature.getMovieState,
    fromMovie.getSortBy
);
