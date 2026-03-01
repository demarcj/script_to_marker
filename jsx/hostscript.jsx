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

// library/library.ts
var project = app.project;
var active_comp = function() {
  return project == null ? void 0 : project.activeItem;
};
var time = function() {
  var _a;
  return ((_a = active_comp()) == null ? void 0 : _a.time) || 0;
};
var selected_layers = function() {
  var _a;
  return (_a = active_comp()) == null ? void 0 : _a.selectedLayers;
};
var selected_layer = function() {
  var _a;
  return (_a = selected_layers()) == null ? void 0 : _a[0];
};
var all_layers = function() {
  var _a;
  return Array((_a = active_comp()) == null ? void 0 : _a.layers.length).fill(void 0).map(function(layer, i) {
    var _a2;
    return (_a2 = active_comp()) == null ? void 0 : _a2.layer(i + 1);
  });
};
var has_active_comp = function() {
  try {
    if (!active_comp()) {
      throw new Error("No comp was selected");
    }
    return true;
  } catch (e) {
    alert("Please select a comp");
    return false;
  }
};
var has_layers = function() {
  var _a;
  try {
    if (!((_a = active_comp()) == null ? void 0 : _a.layers)) {
      throw new Error("No layer was selected");
    }
    return true;
  } catch (e) {
    alert("Please add layers to the active comp");
    return false;
  }
};
var has_selected_layer = function() {
  var _a;
  try {
    if (!((_a = selected_layers()) == null ? void 0 : _a.length)) {
      throw new Error("No layer selected");
    }
    return true;
  } catch (e) {
    alert("Please select a layer");
    return false;
  }
};
var has_single_selected_layer = function() {
  var _a, _b;
  try {
    if (((_a = selected_layers()) == null ? void 0 : _a.length) && !(((_b = selected_layers()) == null ? void 0 : _b.length) === 1)) {
      throw new Error("Has multiple layers selected");
    }
    return true;
  } catch (e) {
    alert("Please only select one layer");
    return false;
  }
};
var is_text_layer_empty = function() {
  var _a;
  try {
    if (!((_a = selected_layer()) == null ? void 0 : _a.property("Source Text")).value.text.length) {
      throw new Error("Text layer contains no text");
    }
    return true;
  } catch (e) {
    alert("This text layer is empty. Please add text to this layer");
    return false;
  }
};
var is_text_layer = function() {
  var _a;
  try {
    if (((_a = selected_layer()) == null ? void 0 : _a.property("Source Text")) === null) {
      throw new Error("No text layer was selected");
    }
    return true;
  } catch (e) {
    alert("Please select a text layer");
    return false;
  }
};
var check_error = function(check_func) {
  return check_func.some(function(confirm) {
    return !confirm();
  });
};
var error_message = function(name) {
  return alert("\n  The ".concat(name.length ? name + " " : "", "operation failed.\n  Some changes may have been applied.\n  Use Undo to revert the action if necessary. \n"));
};
var print = (function() {
  var arr = [];
  for (var i = 0; i < arguments.length; i++) {
    arr.push(arguments[i]);
  }
  alert(arr.join("\n"));
});

// index.ts
var text_layer_express = '\n  const m = thisComp.marker;\n\n  if (m.numKeys == 0) {\n    "";\n  } else {\n    let k = m.nearestKey(time);\n    if (k.time > time && k.index > 1) k = m.key(k.index - 1);\n\n    let start = k.time;\n    let end = k.time + k.duration;\n\n    (time >= start && time < end) ? k.comment : "";\n  }\n';
var get_script = function() {
  try {
    var file = File.openDialog("Select a text file", "*.txt;*.srt");
    if (file === null) {
      return;
    }
    file.open("r");
    var content = file.read();
    file.close();
    var content_list = content.split("\n").filter(function(txt) {
      return (txt == null ? void 0 : txt.length) && txt.length > 0;
    });
    var content_map = {};
    var num = "";
    var time_stamp = "";
    content_list.forEach(function(item, i) {
      var index = (i + 1) % 3;
      if (index % 3 === 0) {
        content_map[parseInt(num)] = {
          time: time_stamp,
          text: item
        };
        return;
      }
      if (index % 2 === 0) {
        time_stamp = item;
        return;
      }
      num = item;
    });
    return content_map;
  } catch (e) {
    alert("Couldn't retreive the file.");
  }
};
var timestampToSeconds = function(stamp) {
  var normalized = stamp.replace(",", ".");
  var parts = normalized.split(":");
  if (parts.length !== 3) {
    return 0;
  }
  var hours = parseInt(parts[0], 10) || 0;
  var mins = parseInt(parts[1], 10) || 0;
  var secsAndMs = parts[2].split(".");
  var secs = parseInt(secsAndMs[0], 10) || 0;
  var ms = parseInt(secsAndMs[1], 10) || 0;
  return hours * 3600 + mins * 60 + secs + ms / 1e3;
};
var create_comment = function(content) {
  try {
    var content_list = Object.values(content);
    content_list.forEach(function(item, i) {
      var _a;
      var duration = item.time.split(" --> ");
      var start_dur = timestampToSeconds(duration[0]);
      var end_dur = timestampToSeconds(duration[1]);
      var marker = new MarkerValue(item.text);
      marker.duration = end_dur - start_dur;
      marker.cuePointName = "script_to_marker";
      (_a = active_comp()) == null ? void 0 : _a.markerProperty.setValueAtTime(start_dur, marker);
    });
    return true;
  } catch (e) {
    return false;
  }
};
var create_text_layer = function() {
  try {
    var textLayer = active_comp().layers.addText("");
    textLayer.name = "Script";
    var textSource = active_comp().layer(1).property("Source Text");
    var textVal = textSource.value;
    textVal.justification = ParagraphJustification.CENTER_JUSTIFY;
    var textDoc = textLayer.property("ADBE Text Properties").property("ADBE Text Document");
    textDoc.expression = text_layer_express;
    textSource.setValue(textVal);
  } catch (e) {
    alert("Something wrong happened when trying to create text layers");
  }
};
var clear_script = function() {
  try {
    var comp = active_comp();
    if (!comp) {
      return false;
    }
    var markers = comp == null ? void 0 : comp.markerProperty;
    var index = 1;
    Array(markers.numKeys).fill(void 0).forEach(function(marker, i) {
      var _a;
      var cue = (_a = markers.keyValue(index)) == null ? void 0 : _a.cuePointName;
      if (cue && cue === "script_to_marker") {
        markers.removeKey(index);
        return;
      }
      index += 1;
    });
  } catch (e) {
    alert("Something wrong happened when trying to delete the markers");
  }
};
var handle_clear_script = function() {
  app.beginUndoGroup("Delete All Comments");
  try {
    if (check_error([has_active_comp])) {
      return;
    }
    clear_script();
  } catch (e) {
    error_message("Delete All Comments");
  } finally {
    app.endUndoGroup();
  }
};
var script_to_marker = function() {
  app.beginUndoGroup("Script to Marker");
  try {
    if (check_error([has_active_comp])) {
      return;
    }
    var content = get_script();
    if (!content) {
      return;
    }
    if (!create_comment(content)) {
      return;
    }
    create_text_layer();
  } catch (e) {
    error_message("Script to Marker");
  } finally {
    app.endUndoGroup();
  }
};
