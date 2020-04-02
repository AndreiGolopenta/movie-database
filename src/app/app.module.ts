import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
 
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store';

import { AppComponent } from './app.component';
import * as fromContainers from './containers';
import * as fromComponents from './components';

const ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: 'home',
        children: [
            { path: '', component: fromContainers.HomeComponent },
            { path: ':id', component: fromContainers.MovieDetailComponent }
        ]
    },
    { path: 'watchlist', component: fromContainers.WatchlistComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        ...fromContainers.containers,
        ...fromComponents.components
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot(ROUTES),
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
