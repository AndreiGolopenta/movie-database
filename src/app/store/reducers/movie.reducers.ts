import * as fromMovie from '../actions/movie.actions';
import { MovieById, MovieSearch } from '../../models/movie.interface';
import { UtilityFunction } from './utilityFunction';

export interface MovieState {
    search: MovieSearch[];
    watchlist: MovieById[];
    sortBy: string;
}

export const initialState: MovieState = {
    search: [],
    watchlist: [],
    sortBy: 'List Order'
};

export function reducer(
    state: MovieState = initialState,
    action: fromMovie.MovieActions
) {
    switch (action.type) {
        case fromMovie.SAVE_SEARCH_DATA: {
            const search = action.payload;

            return {
                ...state,
                search
            };
        }

        case fromMovie.ADD_TO_WATCHLIST: {
            let movie: MovieById;
            if (state.watchlist.length) {
                movie = {
                    ...action.payload,
                    listOrder: state.watchlist.length
                };
            } else {
                movie = { ...action.payload, listOrder: 0 };
            }

            const watchlist = UtilityFunction.sortData(
                [...state.watchlist, movie],
                state.sortBy
            );

            return {
                ...state,
                watchlist
            };
        }

        case fromMovie.REMOVE_FROM_WATCHLIST: {
            const watchlist = state.watchlist.filter(
                (movie: MovieById) => movie.imdbID !== action.payload.imdbID
            );

            return {
                ...state,
                watchlist
            };
        }

        case fromMovie.SORT_DATA: {
            const sortBy = action.payload;
            const data = [...state.watchlist];
            const watchlist = UtilityFunction.sortData(data, sortBy);

            return {
                ...state,
                watchlist,
                sortBy
            };
        }

        default: {
            return state;
        }
    }
}

export const getSearchData = (state: MovieState) => state.search;
export const getWatchlist = (state: MovieState) => state.watchlist;
export const getSortBy = (state: MovieState) => state.sortBy;
