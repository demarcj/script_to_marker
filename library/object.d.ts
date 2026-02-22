declare global {
  interface ObjectConstructor {
    keys(o: object): string[];

    // Best realistic typing for ES3 polyfill world:
    // - works with index signatures / records cleanly
    // - still usable for ExtendScript objects
    values<T>(o: { [key: string]: T } | ArrayLike<T>): T[];

    values(o: object): any[];
  }
}

export {};
