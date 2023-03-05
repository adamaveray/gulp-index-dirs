import { join } from 'node:path';
import { Transform } from 'node:stream';
import type Vinyl from 'vinyl';

function renameFile(file: Vinyl, indexName: string): void {
  const { extname, basename } = file;
  const extlessBasename = basename.substring(0, basename.length - extname.length);
  if (extlessBasename !== indexName) {
    // Convert to nested index
    file.dirname = join(file.dirname, extlessBasename);
    file.basename = indexName + extname;
  }
}

export default function indexDirs(indexName = 'index'): Transform {
  return new Transform({
    objectMode: true,
    transform(file: Vinyl, enc, cb) {
      renameFile(file, indexName);
      cb(null, file);
    },
  });
}
