import { Action } from '@ngrx/store';
import { MovieSearch, MovieById } from '../../models/movie.interface';

export const SAVE_SEARCH_DATA = '[app] Save Search Data';
export const ADD_TO_WATCHLIST = '[app] Add To Watchlist';
export const REMOVE_FROM_WATCHLIST = '[app] Remove From Watchlist';
export const SORT_DATA = '[app] Sort Data';

export class SaveSearchData implements Action {
    readonly type = SAVE_SEARCH_DATA;
    constructor(public payload: MovieSearch[]) {}
}

export class AddToWatchlist implements Action {
    readonly type = ADD_TO_WATCHLIST;
    constructor(public payload: MovieById) {}
}

export class RemoveFromWatchlist implements Action {
    readonly type = REMOVE_FROM_WATCHLIST;
    constructor(public payload: MovieById) {}
}

export class SortData implements Action {
    readonly type = SORT_DATA;
    constructor(public payload: string) {}
}

export type MovieActions =
    | SaveSearchData
    | AddToWatchlist
    | RemoveFromWatchlist
    | SortData;
