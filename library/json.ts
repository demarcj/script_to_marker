if (typeof JSON !== "object") {
  JSON = {} as JSON;
}

if (typeof JSON.stringify !== "function") {
  JSON.stringify = function (value: any): string {

    function quote(str: string): string {
      return '"' + str
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t") + '"';
    }

    function str(v: any): string | undefined {
      if (v === null) return "null";

      var type = typeof v;

      if (type === "string") return quote(v);
      if (type === "number") return isFinite(v) ? String(v) : "null";
      if (type === "boolean") return String(v);

      if (type === "object") {
        if (v instanceof Array) {
          var resA: string[] = [];
          for (var i = 0; i < v.length; i++) resA.push(str(v[i]) || "null");
          return "[" + resA.join(",") + "]";
        }

        var resO: string[] = [];
        for (var k in v) {
          if (v.hasOwnProperty(k)) {
            var val = str(v[k]);
            if (val !== undefined) resO.push(quote(k) + ":" + val);
          }
        }
        return "{" + resO.join(",") + "}";
      }

      return undefined;
    }

    return str(value) as string;
  };
}
