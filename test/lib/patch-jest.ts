import Vinyl from 'vinyl';

function getFilePaths(files: Vinyl[]): string[] {
  return files.map(({ path }) => path);
}

expect.extend({
  toMatchVinylPaths(received: any, expected: any): jest.CustomMatcherResult {
    if (!Array.isArray(received)) {
      return { pass: false, message: () => 'Value expected to be array.' };
    }

    const nonVinylEntry: unknown = received.find((item) => !(item instanceof Vinyl));
    if (nonVinylEntry != null) {
      return { pass: false, message: () => 'All values expected to be Vinyl files.' };
    }

    const { isNot = false } = this;

    const receivedPaths = getFilePaths(received as Vinyl[]);
    const expectedPaths = getFilePaths(expected as Vinyl[]);
    if (isNot) {
      expect(receivedPaths).not.toEqual(expectedPaths);
    } else {
      expect(receivedPaths).toEqual(expectedPaths);
    }

    return { pass: !isNot, message: () => 'All value paths expected to match.' };
  },
});
