import { MovieById } from '../../models/movie.interface';

export class UtilityFunction {
    static sortData(data: MovieById[], sortBy: string): MovieById[] {
        switch (sortBy) {
            case 'List Order': {
                return data.sort(
                    (prev: MovieById, next: MovieById) =>
                        prev.listOrder - next.listOrder
                );
            }

            case 'Alphabetical ascending': {
                return data.sort((prev: MovieById, next: MovieById) => {
                    if (prev.Title < next.Title) {
                        return -1;
                    }
                    if (prev.Title > next.Title) {
                        return 1;
                    }
                    return 0;
                });
            }

            case 'Alphabetical descending': {
                return data.sort((prev: MovieById, next: MovieById) => {
                    if (prev.Title < next.Title) {
                        return 1;
                    }
                    if (prev.Title > next.Title) {
                        return -1;
                    }
                    return 0;
                });
            }

            case 'Rating ascending': {
                return data.sort(
                    (prev: MovieById, next: MovieById) =>
                        parseFloat(prev.imdbRating) -
                        parseFloat(next.imdbRating)
                );
            }

            case 'Rating descending': {
                return data.sort(
                    (prev: MovieById, next: MovieById) =>
                        parseFloat(next.imdbRating) -
                        parseFloat(prev.imdbRating)
                );
            }
        }
    }
}
