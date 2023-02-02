# @averay/gulp-index-dirs

[![codecov][codecov-badge]][codecov]

[codecov]: https://codecov.io/gh/adamaveray/gulp-index-dirs
[codecov-badge]: https://codecov.io/gh/adamaveray/gulp-index-dirs/branch/main/graph/badge.svg

A Gulp plugin to rename non-index files to indices within matching subdirectories.

This plugin can be used to enable serving a static website with clean, extensionless URLs (e.g. `https://www.example.com/example-page/`) without needing to configure the web server to rewrite URLs, by moving generated files to index files within a matching subdirectory.

For example, given the following source files:

```
pages/index.html
pages/about.html
pages/contact.html
```

The following files will be output:

```
dist/index.html
dist/about/index.html
dist/contact/index.html
```

## Usage

Import the `indexDirs` function and add it to a Gulp stream.

```
import indexDirs from '@averay/gulp-index-dirs';

gulp.src('...')
  .pipe(indexDirs())
  .pipe(gulp.dest('...'));
```

### Options

The function takes a single optional argument of the extensionless index file name, defaulting to `index`:

```js
// ...
.pipe(indexDirs('default')) // Will result in e.g. default.html
```

---

[MIT License](./LICENSE)
