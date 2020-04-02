import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { MovieById } from 'src/app/models/movie.interface';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-watchlist',
    templateUrl: './watchlist.component.html',
    styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
    data$: Observable<MovieById[]>;
    sortBy$: Observable<string>;
    watchlistStatus: boolean = true;

    constructor(private store: Store<fromStore.StoreState>) {}

    ngOnInit(): void {
        this.data$ = this.store.select(fromStore.getWatchlist);
        this.sortBy$ = this.store.select(fromStore.getSortBy);
    }

    handleWatchlist(movie: MovieById) {
        this.store.dispatch(new fromStore.RemoveFromWatchlist(movie));
    }

    handleSort(value: string) {
        this.store.dispatch(new fromStore.SortData(value));
    }
}
