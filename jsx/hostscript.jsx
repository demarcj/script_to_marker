"use strict";

// library/object.ts
if (!Object.keys) {
  Object.keys = (function() {
    "use strict";
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasDontEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
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
    return function(obj) {
      if (typeof obj !== "function" && (typeof obj !== "object" || obj === null)) {
        throw new TypeError("Object.keys called on non-object");
      }
      var result = [];
      var prop;
      var i;
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
  Object.values = (function() {
    "use strict";
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasDontEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
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
    return function(obj) {
      if (typeof obj !== "function" && (typeof obj !== "object" || obj === null)) {
        throw new TypeError("Object.values called on non-object");
      }
      var result = [];
      var prop;
      var i;
      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(obj[prop]);
        }
      }
      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(obj[dontEnums[i]]);
          }
        }
      }
      return result;
    };
  })();
}

// library/string.ts
if (!String.prototype.includes) {
  String.prototype.includes = function(searchString, position) {
    "use strict";
    if (searchString instanceof RegExp) {
      throw new TypeError("first argument must not be a RegExp");
    }
    var start = position === void 0 ? 0 : position;
    return this.indexOf(String(searchString), start) !== -1;
  };
}
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function(searchValue, replaceValue) {
    if (this == null) {
      throw new TypeError("String.prototype.replaceAll called on null or undefined");
    }
    var str = String(this);
    if (searchValue instanceof RegExp) {
      if (!searchValue.global) {
        throw new TypeError("replaceAll must be called with a global RegExp");
      }
      return str.replace(searchValue, replaceValue);
    }
    var searchStr = String(searchValue);
    if (searchStr === "") {
      var out = "";
      for (var i = 0; i < str.length; i++) {
        out += (typeof replaceValue === "function" ? String(replaceValue.call(void 0, "", i, str)) : String(replaceValue)) + str.charAt(i);
      }
      out += typeof replaceValue === "function" ? String(replaceValue.call(void 0, "", str.length, str)) : String(replaceValue);
      return out;
    }
    if (typeof replaceValue !== "function") {
      return str.split(searchStr).join(String(replaceValue));
    }
    var fn = replaceValue;
    var result = "";
    var startIndex = 0;
    var matchIndex = str.indexOf(searchStr, startIndex);
    while (matchIndex !== -1) {
      result += str.substring(startIndex, matchIndex);
      result += String(fn.call(void 0, searchStr, matchIndex, str));
      startIndex = matchIndex + searchStr.length;
      matchIndex = str.indexOf(searchStr, startIndex);
    }
    result += str.substring(startIndex);
    return result;
  };
}

// library/array.ts
if (!Array.prototype.filter) {
  Array.prototype.filter = function(callbackfn, thisArg) {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
      if (callbackfn.call(thisArg, this[i], i, this)) {
        arr.push(this[i]);
      }
    }
    return arr;
  };
}
if (!Array.prototype.map) {
  Array.prototype.map = function(callbackfn, thisArg) {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
      arr.push(callbackfn.call(thisArg, this[i], i, this));
    }
    return arr;
  };
}
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callbackfn, thisArg) {
    for (var i = 0; i < this.length; i++) {
      callbackfn.call(thisArg, this[i], i, this);
    }
  };
}
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === searchElement) {
        return true;
      }
    }
    return false;
  };
  try {
    Object.defineProperty(Array.prototype, "includes", {
      value: Array.prototype.includes,
      enumerable: false
    });
  } catch (e) {
  }
}
if (!Array.prototype.some) {
  Array.prototype.some = function(callbackfn, thisArg) {
    if (this == null) {
      throw new TypeError("Array.prototype.some called on null or undefined");
    }
    if (typeof callbackfn !== "function") {
      throw new TypeError(String(callbackfn) + " is not a function");
    }
    var obj = Object(this);
    var len = obj.length >>> 0;
    for (var i = 0; i < len; i++) {
      if (i in obj) {
        if (callbackfn.call(thisArg, obj[i], i, this)) {
          return true;
        }
      }
    }
    return false;
  };
}
if (!Array.prototype.fill) {
  Array.prototype.fill = function(value, start, end) {
    if (this == null) {
      throw new TypeError("Array.prototype.fill called on null or undefined");
    }
    var O = Object(this);
    var len = O.length >>> 0;
    var relativeStart = start === void 0 ? 0 : start >> 0;
    var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
    var relativeEnd = end === void 0 ? len : end >> 0;
    var the_final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
    while (k < the_final) {
      O[k] = value;
      k++;
    }
    return O;
  };
}
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate, thisArg) {
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
    return void 0;
  };
}

// library/json.ts
if (typeof JSON !== "object") {
  JSON = {};
}
if (typeof JSON.stringify !== "function") {
  JSON.stringify = function(value) {
    function quote(str2) {
      return '"' + str2.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t") + '"';
    }
    function str(v) {
      if (v === null) return "null";
      var type = typeof v;
      if (type === "string") return quote(v);
      if (type === "number") return isFinite(v) ? String(v) : "null";
      if (type === "boolean") return String(v);
      if (type === "object") {
        if (v instanceof Array) {
          var resA = [];
          for (var i = 0; i < v.length; i++) resA.push(str(v[i]) || "null");
          return "[" + resA.join(",") + "]";
        }
        var resO = [];
        for (var k in v) {
          if (v.hasOwnProperty(k)) {
            var val = str(v[k]);
            if (val !== void 0) resO.push(quote(k) + ":" + val);
          }
        }
        return "{" + resO.join(",") + "}";
      }
      return void 0;
    }
    return str(value);
  };
}

// index.ts
var sayHello = function() {
  return alert("Hello from ExtendScript");
};
