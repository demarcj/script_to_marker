// Array.prototype.filter
if (!Array.prototype.filter) {
  Array.prototype.filter = function <T>(
    this: T[],
    callbackfn: (value: T, index: number, array: T[]) => boolean,
    thisArg?: any
  ): T[] {
    var arr: T[] = [];
    for (var i = 0; i < this.length; i++) {
      // keep it simple for ExtendScript; if you want "holes" behavior, add: if (!(i in this)) continue;
      if (callbackfn.call(thisArg, this[i], i, this)) {
        arr.push(this[i]);
      }
    }
    return arr;
  };
}

// Array.prototype.map
if (!Array.prototype.map) {
  Array.prototype.map = function <T, U>(
    this: T[],
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[] {
    var arr: U[] = [];
    for (var i = 0; i < this.length; i++) {
      arr.push(callbackfn.call(thisArg, this[i], i, this));
    }
    return arr;
  };
}

// Array.prototype.forEach
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function <T>(
    this: T[],
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void {
    for (var i = 0; i < this.length; i++) {
      callbackfn.call(thisArg, this[i], i, this);
    }
  };
}

// Array.prototype.includes (ExtendScript-safe)
if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === searchElement) {
        return true;
      }
    }
    return false;
  };

  // Make non-enumerable (best effort)
  try {
    Object.defineProperty(Array.prototype, "includes", {
      value: Array.prototype.includes,
      enumerable: false
    });
  } catch (e) {}
}

// Array.prototype.some
if (!Array.prototype.some) {
  Array.prototype.some = function <T>(
    this: T[],
    callbackfn: (value: T, index: number, array: T[]) => boolean,
    thisArg?: any
  ): boolean {
    if (this == null) {
      throw new TypeError("Array.prototype.some called on null or undefined");
    }
    if (typeof callbackfn !== "function") {
      throw new TypeError(String(callbackfn) + " is not a function");
    }

    var obj = Object(this) as any;
    var len = obj.length >>> 0;

    for (var i = 0; i < len; i++) {
      // matches your version's behavior
      if (i in obj) {
        if (callbackfn.call(thisArg, obj[i] as T, i, this)) {
          return true;
        }
      }
    }
    return false;
  };
}

if (!Array.prototype.fill) {
  Array.prototype.fill = function (value, start, end) {
    if (this == null) {
      throw new TypeError('Array.prototype.fill called on null or undefined');
    }

    var O = Object(this);
    var len = O.length >>> 0;

    var relativeStart = start === undefined ? 0 : start >> 0; // to integer
    var k = relativeStart < 0
      ? Math.max(len + relativeStart, 0)
      : Math.min(relativeStart, len);

    var relativeEnd = end === undefined ? len : end >> 0;
    var the_final = relativeEnd < 0
      ? Math.max(len + relativeEnd, 0)
      : Math.min(relativeEnd, len);

    while (k < the_final) {
      O[k] = value;
      k++;
    }

    return O;
  };
}

if (!Array.prototype.find) {
  Array.prototype.find = function (
    predicate: (value: any, index: number, obj: any[]) => boolean,
    thisArg?: any
  ) {
    if (this == null) {
      throw new TypeError("Array.prototype.find called on null or undefined");
    }

    if (typeof predicate !== "function") {
      throw new TypeError("predicate must be a function");
    }

    var list = Object(this);
    var length = list.length >>> 0;

    for (var i = 0; i < length; i++) {
      if (i in list) {
        var value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
    }

    return undefined;
  };
}