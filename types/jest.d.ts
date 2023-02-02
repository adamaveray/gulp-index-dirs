declare global {
  import type Vinyl from 'vinyl';

  namespace jest {
    interface Matchers<R, T = {}> {
      toMatchVinylPaths(expected: Vinyl[]): R;
    }
  }
}

declare namespace jest {
  import type Vinyl from 'vinyl';

  interface Matchers<R, T = {}> {
    toMatchVinylPaths(expected: Vinyl[]): R;
  }
}
