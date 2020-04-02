import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieById } from 'src/app/models/movie.interface';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
    movie$: Observable<MovieById>;
    watchlistStatus: boolean;
    watchlistSubscription: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private movieService: MovieService,
        private store: Store<fromStore.StoreState>
    ) {}

    ngOnInit(): void {
        this.movie$ = this.activatedRoute.params.pipe(
            map(params => params.id),
            switchMap((id: string) => this.movieService.searchById(id))
        );

        this.watchlistSubscription = this.movie$
            .pipe(
                switchMap((movie: MovieById) => {
                    return this.store
                        .select(fromStore.getWatchlist)
                        .pipe(
                            map((data: MovieById[]) =>
                                data.filter(
                                    (el: MovieById) =>
                                        el.imdbID === movie.imdbID
                                ).length
                                    ? true
                                    : false
                            )
                        );
                })
            )
            .subscribe((data: boolean) => (this.watchlistStatus = data));
    }

    handleWatchlist(movie: MovieById) {
        if (this.watchlistStatus) {
            this.store.dispatch(new fromStore.RemoveFromWatchlist(movie));
        } else {
            this.store.dispatch(new fromStore.AddToWatchlist(movie));
        }
    }

    ngOnDestroy(): void {
        if (this.watchlistSubscription) {
            this.watchlistSubscription.unsubscribe();
        }
    }
}
