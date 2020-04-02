import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovieById } from 'src/app/models/movie.interface';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    @Input() movie: MovieById;
    @Input() watchlistStatus: boolean;

    @Output() addRemoveToWatchlist = new EventEmitter<MovieById>();

    ngOnInit(): void {}

    watchlist(): void {
        this.addRemoveToWatchlist.emit(this.movie);
    }
}
