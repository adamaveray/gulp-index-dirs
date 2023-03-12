import { join } from 'node:path';
import { Transform } from 'node:stream';

import type Vinyl from 'vinyl';

function renameFile(file: Vinyl, indexName: string): void {
  const { basename, dirname, extname } = file;
  const extlessBasename = basename.slice(0, Math.max(0, basename.length - extname.length));
  if (extlessBasename !== indexName) {
    // Convert to nested index
    file.dirname = join(dirname, extlessBasename);
    file.basename = indexName + extname;
  }
}

export default function indexDirs(indexName = 'index'): Transform {
  return new Transform({
    objectMode: true,
    transform(file: Vinyl, encoding, callback) {
      renameFile(file, indexName);
      callback(null, file);
    },
  });
}
