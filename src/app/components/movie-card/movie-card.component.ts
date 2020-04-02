import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MovieSearch } from 'src/app/models/movie.interface';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
    @Input() movie: MovieSearch;

    @Output() selectMovie = new EventEmitter<string>();

    select(): void {
        this.selectMovie.emit(this.movie.imdbID);
    }
}
