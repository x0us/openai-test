var e = require("../@babel/runtime/helpers/typeof");
function t(e) {
  var t = e.getFullYear().toString(),
    r = (e.getMonth() + 1).toString(),
    n = e.getDate().toString(),
    a = e.getHours().toString(),
    o = e.getMinutes().toString();
  return (
    "0" == o && (o = "00"),
    1 == a.length && (a = "0" + a),
    1 == r.length && (r = "0" + r),
    1 == n.length && (n = "0" + n),
    [t, r, n, a, o]
  );
}
function r() {
  var e = new Date(),
    r = e.getFullYear(),
    n = e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1,
    o = e.getDate() < 10 ? "0" + e.getDate() : e.getDate(),
    g = e.getHours() < 10 ? "0" + e.getHours() : e.getHours(),
    i = e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes(),
    u = i - (i % 10);
  0 == u && (u = "00");
  var c = new Date(r + "/" + n + "/" + o + " " + g + ":" + u).getTime(),
    l = c + 5184e5,
    s = getApp();
  if (s.Data.downZeroMinute) var m = c + 6e4 * s.Data.downZeroMinute;
  else if (i % 10 == 0) m = c + 12e5;
  else m = c + 18e5;
  var D = new Date(c + 12e5),
    f = new Date(m),
    h = new Date(l),
    v = t(f);
  return { days: a(r, n), timeArr: v, limitTimeArr: t(D), maxTimeArr: t(h) };
}
var n = r();
function a(e, t) {
  return new Date(e, t, 0).getDate();
}
var o = a(n.timeArr[0], n.timeArr[1]);
function g(e) {
  for (var t = [], r = 1; r <= e; r++)
    r < 10 ? t.push("0" + r.toString()) : t.push(r.toString());
  return t;
}
var i = g(o);
module.exports = {
  getTimeStrmp: r,
  formatDate: t,
  dayNum: o,
  dayArr: i,
  GetDays: a,
  getDayArr: g,
  parseTime: function (t, r) {
    if (0 === arguments.length) return null;
    var n,
      a = r || "{y}-{m}-{d} {h}:{i}:{s}";
    "object" === e(t)
      ? (n = t)
      : ("string" == typeof t && /^[0-9]+$/.test(t) && (t = parseInt(t)),
        "number" == typeof t && 10 === t.toString().length && (t *= 1e3),
        (n = new Date(t)));
    var o = {
        y: n.getFullYear(),
        m: n.getMonth() + 1,
        d: n.getDate(),
        h: n.getHours(),
        i: n.getMinutes(),
        s: n.getSeconds(),
        a: n.getDay(),
      },
      g = a.replace(/{(y|m|d|h|i|s|a)+}/g, function (e, t) {
        var r = o[t];
        return "a" === t
          ? ["日", "一", "二", "三", "四", "五", "六"][r]
          : (e.length > 0 && r < 10 && (r = "0" + r), r || 0);
      });
    return g;
  },
  timeDifferenceFnc: function (e, t) {
    var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
    if (r) var a = Date.now();
    else a = new Date(e.replace(/-/g, "/"));
    var o = new Date(t.replace(/-/g, "/")) - 60 * n * 1e3,
      g = o - a,
      i = Math.floor(g / 864e5),
      u = g % 864e5,
      c = Math.floor(u / 36e5),
      l = g % 36e5,
      s = Math.floor(l / 6e4),
      m = g % 6e4,
      D = Math.floor(m / 1e3),
      f = i > 0 ? "".concat(i, "天") : "",
      h = i <= 0 && c <= 0 ? "" : "".concat(c, "时"),
      v = i <= 0 && c <= 0 && s <= 0 ? "" : "".concat(s, "分");
    return g > 0 ? "".concat(f).concat(h).concat(v).concat(D, "秒") : "";
  },
  timeToTimestamp: function (e) {
    var t = e.replace(/-/g, "/");
    return new Date(t).getTime();
  },
};
