import Vinyl from 'vinyl';

export {};

function getFilePaths(files: Vinyl[]): string[] {
  return files.map(({ path }) => path);
}

expect.extend({
  toMatchVinylPaths(received: any, expected: any): jest.CustomMatcherResult {
    if (!Array.isArray(received)) {
      return { pass: false, message: () => 'Value expected to be array.' };
    }

    const nonVinylEntry = received.find((item) => !(item instanceof Vinyl));
    if (nonVinylEntry != null) {
      return { pass: false, message: () => 'All values expected to be Vinyl files.' };
    }

    const receivedPaths = getFilePaths(received);
    const expectedPaths = getFilePaths(expected);
    if (this.isNot) {
      expect(receivedPaths).not.toEqual(expectedPaths);
    } else {
      expect(receivedPaths).toEqual(expectedPaths);
    }

    return { pass: !this.isNot, message: () => 'All value paths expected to match.' };
  },
});
