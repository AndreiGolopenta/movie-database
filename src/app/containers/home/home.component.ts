import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import {
    debounceTime,
    pluck,
    distinctUntilChanged,
    switchMap
} from 'rxjs/operators';
import { MovieService } from 'src/app/services/movie.service';
import { MovieSearch } from 'src/app/models/movie.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
    subscription: Subscription;
    data$: Observable<MovieSearch[]>;
    setWidth: string = '';

    @ViewChild('inputSearch') inputSearch: ElementRef;

    constructor(
        private movieService: MovieService,
        private router: Router,
        private store: Store<fromStore.StoreState>
    ) {}

    ngOnInit(): void {
        this.data$ = this.store.select(fromStore.getSearchData);
    }

    ngAfterViewInit(): void {
        this.subscription = fromEvent(this.inputSearch.nativeElement, 'keyup')
            .pipe(
                debounceTime(1000),
                pluck('target', 'value'),
                distinctUntilChanged(),
                switchMap((value: string) =>
                    this.movieService.searchMovie(encodeURIComponent(value))
                )
            )
            .subscribe((response: MovieSearch[]) =>
                this.store.dispatch(new fromStore.SaveSearchData(response))
            );
    }

    handleSelectMovie(movieId: string): void {
        this.router.navigate(['/home', movieId]);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
