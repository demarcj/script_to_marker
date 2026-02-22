declare global {
  interface Array<T> {
    filter(
      callbackfn: (value: T, index: number, array: T[]) => boolean,
      thisArg?: any
    ): T[];

    map<U>(
      callbackfn: (value: T, index: number, array: T[]) => U,
      thisArg?: any
    ): U[];

    forEach(
      callbackfn: (value: T, index: number, array: T[]) => void,
      thisArg?: any
    ): void;

    includes(searchElement: T, fromIndex?: number): boolean;

    some(
      callbackfn: (value: T, index: number, array: T[]) => boolean,
      thisArg?: any
    ): boolean;

    fill(value: T, start?: number, end?: number): T[];

    find(
      predicate: (value: T, index: number, obj: T[]) => boolean,
      thisArg?: any
    ): T | undefined;
  }
}

export {};
