if (!Object.keys) {
  Object.keys = (function () {
    "use strict";

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasDontEnumBug = !({ toString: null } as any).propertyIsEnumerable("toString");
    var dontEnums = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"
    ];
    var dontEnumsLength = dontEnums.length;

    return function (obj: any): string[] {
      if (typeof obj !== "function" && (typeof obj !== "object" || obj === null)) {
        throw new TypeError("Object.keys called on non-object");
      }

      var result: string[] = [];
      var prop: string;
      var i: number;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }

      return result;
    };
  })();
}


if (!Object.values) {
  Object.values = (function () {
    "use strict";

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasDontEnumBug = !({ toString: null } as any).propertyIsEnumerable("toString");
    var dontEnums = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"
    ];
    var dontEnumsLength = dontEnums.length;

    return function <T>(obj: { [key: string]: T } | any): T[] {
      if (typeof obj !== "function" && (typeof obj !== "object" || obj === null)) {
        throw new TypeError("Object.values called on non-object");
      }

      var result: T[] = [];
      var prop: string;
      var i: number;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(obj[prop] as T);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            // ✅ BUGFIX: push the VALUE, not the key name string
            result.push(obj[dontEnums[i]] as T);
          }
        }
      }

      return result;
    };
  })();
}
