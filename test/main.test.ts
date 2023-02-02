import { Readable, Stream } from 'node:stream';
import type Vinyl from 'vinyl';

import indexDirs from '../src';
import { collateStream, makeFile } from './lib';

describe('gulp-index-dirs', () => {
  it('creates a stream', () => {
    expect(indexDirs()).toBeInstanceOf(Stream);
  });

  it('renames files to index', async () => {
    const input: Vinyl[] = [makeFile('/example/path/one.html'), makeFile('/example/path/two.html')];
    const expected: Vinyl[] = [makeFile('/example/path/one/index.html'), makeFile('/example/path/two/index.html')];

    const files = await collateStream<Vinyl>(Readable.from(input).pipe(indexDirs()));
    expect(files).toMatchVinylPaths(expected);
  });

  it('ignores already-named files', async () => {
    const input: Vinyl[] = [makeFile('/example/path/index.html'), makeFile('/example/path/index.txt')];
    const expected: Vinyl[] = [makeFile('/example/path/index.html'), makeFile('/example/path/index.txt')];

    const files = await collateStream<Vinyl>(Readable.from(input).pipe(indexDirs()));
    expect(files).toMatchVinylPaths(expected);
  });

  it('allows custom index names', async () => {
    const input: Vinyl[] = [makeFile('/example/path/main.html'), makeFile('/example/path/other.html')];
    const expected: Vinyl[] = [makeFile('/example/path/main.html'), makeFile('/example/path/other/main.html')];

    const files = await collateStream<Vinyl>(Readable.from(input).pipe(indexDirs('main')));
    expect(files).toMatchVinylPaths(expected);
  });

  it('accepts stream files', async () => {
    const input: Vinyl[] = [makeFile('/example/path/one.html', new Readable())];
    const expected: Vinyl[] = [makeFile('/example/path/one/index.html')];

    const files = await collateStream<Vinyl>(Readable.from(input).pipe(indexDirs()));
    expect(files).toMatchVinylPaths(expected);
  });

  it('accepts buffer files', async () => {
    const input: Vinyl[] = [makeFile('/example/path/one.html', Buffer.from('hello world'))];
    const expected: Vinyl[] = [makeFile('/example/path/one/index.html')];

    const files = await collateStream<Vinyl>(Readable.from(input).pipe(indexDirs()));
    expect(files).toMatchVinylPaths(expected);
  });
});
