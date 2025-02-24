import { MediaMatcher } from '@angular/cdk/layout';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MediaQueryService {
  #isMobile = signal(true);

  isMobile = this.#isMobile.asReadonly();

  #mobileQuery: MediaQueryList;
  #mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this.#mobileQuery = media.matchMedia('(max-width: 768px)');
    this.#isMobile.set(this.#mobileQuery.matches);
    this.#mobileQueryListener = () =>
      this.#isMobile.set(this.#mobileQuery.matches);
    this.#mobileQuery.addEventListener('change', this.#mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.#mobileQuery.removeEventListener('change', this.#mobileQueryListener);
  }
}
