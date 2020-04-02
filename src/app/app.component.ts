import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from './store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieById } from './models/movie.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    countWatchlist$: Observable<number>;

    constructor(private store: Store<fromStore.StoreState>) {}

    ngOnInit(): void {
        this.countWatchlist$ = this.store
            .select(fromStore.getWatchlist)
            .pipe(map((data: MovieById[]) => data.length));
    }
}
