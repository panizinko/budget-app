// Add a “random subreddit” feature that allows you to click a button (or some other method) and a random subreddit from a pre-determined list will be displayed
// Add a way for users to save a list of their favourite subreddits to switch between
// Add a way for users to “save” their favourite GIFs — perhaps they could type favourites in the subreddit bar and it will display all of their saved GIFs

import { Component, effect, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { RedditService } from '../../shared/data-access/reddit.service';
import { GifListComponent } from './ui/gif-list.component';
import { SearchBarComponent } from './ui/search-bar.component';

@Component({
  selector: 'app-gifs',
  imports: [
    GifListComponent,
    InfiniteScrollDirective,
    SearchBarComponent,
    MatProgressSpinnerModule,
  ],
  template: `
    <app-search-bar
      [subredditFormControl]="redditService.subredditFormControl"
    ></app-search-bar>

    @if (redditService.loading()) {
      <mat-progress-spinner mode="indeterminate" diameter="50" />
    } @else {
      <app-gif-list
        [gifs]="redditService.gifs()"
        infiniteScroll
        (scrolled)="
          redditService.pagination$.next(redditService.lastKnownGif())
        "
        class="grid-container"
      />
    }
  `,
  styles: `
    mat-progress-spinner {
      margin: 2rem auto;
    }
  `,
})
export default class GifsComponent {
  redditService = inject(RedditService);
  snackBar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      const error = this.redditService.error();

      if (error !== null) {
        this.snackBar.open(error, 'Dismiss', { duration: 2000 });
      }
    });
  }
}
