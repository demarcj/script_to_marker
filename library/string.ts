// String.prototype.includes
if (!String.prototype.includes) {
  String.prototype.includes = function (
    this: string,
    searchString: string | RegExp,
    position?: number
  ): boolean {
    "use strict";

    // matches your runtime guard
    if (searchString instanceof RegExp) {
      throw new TypeError("first argument must not be a RegExp");
    }

    var start: number = position === undefined ? 0 : position;
    return this.indexOf(String(searchString), start) !== -1;
  };
}

if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (
    this: string,
    searchValue: string | RegExp,
    replaceValue: string | ((substring: string, ...args: any[]) => string)
  ): string {
    if (this == null) {
      throw new TypeError("String.prototype.replaceAll called on null or undefined");
    }

    var str = String(this);

    // RegExp path
    if (searchValue instanceof RegExp) {
      if (!searchValue.global) {
        throw new TypeError("replaceAll must be called with a global RegExp");
      }
      // String.replace supports string or function replacer
      return str.replace(searchValue, replaceValue as any);
    }

    // String path
    var searchStr = String(searchValue);

    // Special-case empty string (matches JS behavior)
    if (searchStr === "") {
      var out = "";
      for (var i = 0; i < str.length; i++) {
        out += (typeof replaceValue === "function"
          ? String((replaceValue as any).call(undefined, "", i, str))
          : String(replaceValue)
        ) + str.charAt(i);
      }
      out += (typeof replaceValue === "function"
        ? String((replaceValue as any).call(undefined, "", str.length, str))
        : String(replaceValue)
      );
      return out;
    }

    // If replacement is a string, your original fast split/join path is perfect
    if (typeof replaceValue !== "function") {
      return str.split(searchStr).join(String(replaceValue));
    }

    // Function replacer for string search:
    // Build result manually so we can call replacer(match, index, wholeString)
    var fn = replaceValue;
    var result = "";
    var startIndex = 0;
    var matchIndex = str.indexOf(searchStr, startIndex);

    while (matchIndex !== -1) {
      result += str.substring(startIndex, matchIndex);
      result += String(fn.call(undefined, searchStr, matchIndex, str));
      startIndex = matchIndex + searchStr.length;
      matchIndex = str.indexOf(searchStr, startIndex);
    }

    result += str.substring(startIndex);
    return result;
  };
}

