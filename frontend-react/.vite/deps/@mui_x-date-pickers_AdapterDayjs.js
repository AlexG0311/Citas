import {
  require_dayjs_min
} from "./chunk-F5FQQUW5.js";
import {
  warnOnce
} from "./chunk-AVBJDU3V.js";
import {
  _extends
} from "./chunk-HQ6ZTAWL.js";
import {
  __commonJS,
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// node_modules/dayjs/plugin/weekOfYear.js
var require_weekOfYear = __commonJS({
  "node_modules/dayjs/plugin/weekOfYear.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_weekOfYear = t();
    }(exports, function() {
      "use strict";
      var e = "week", t = "year";
      return function(i, n, r) {
        var f = n.prototype;
        f.week = function(i2) {
          if (void 0 === i2 && (i2 = null), null !== i2) return this.add(7 * (i2 - this.week()), "day");
          var n2 = this.$locale().yearStart || 1;
          if (11 === this.month() && this.date() > 25) {
            var f2 = r(this).startOf(t).add(1, t).date(n2), s = r(this).endOf(e);
            if (f2.isBefore(s)) return 1;
          }
          var a = r(this).startOf(t).date(n2).startOf(e).subtract(1, "millisecond"), o = this.diff(a, e, true);
          return o < 0 ? r(this).startOf("week").week() : Math.ceil(o);
        }, f.weeks = function(e2) {
          return void 0 === e2 && (e2 = null), this.week(e2);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/customParseFormat.js
var require_customParseFormat = __commonJS({
  "node_modules/dayjs/plugin/customParseFormat.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_customParseFormat = t();
    }(exports, function() {
      "use strict";
      var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, r = /\d\d/, i = /\d\d?/, o = /\d*[^-_:/,()\s\d]+/, s = {}, a = function(e2) {
        return (e2 = +e2) + (e2 > 68 ? 1900 : 2e3);
      };
      var f = function(e2) {
        return function(t2) {
          this[e2] = +t2;
        };
      }, h = [/[+-]\d\d:?(\d\d)?|Z/, function(e2) {
        (this.zone || (this.zone = {})).offset = function(e3) {
          if (!e3) return 0;
          if ("Z" === e3) return 0;
          var t2 = e3.match(/([+-]|\d\d)/g), n2 = 60 * t2[1] + (+t2[2] || 0);
          return 0 === n2 ? 0 : "+" === t2[0] ? -n2 : n2;
        }(e2);
      }], u = function(e2) {
        var t2 = s[e2];
        return t2 && (t2.indexOf ? t2 : t2.s.concat(t2.f));
      }, d = function(e2, t2) {
        var n2, r2 = s.meridiem;
        if (r2) {
          for (var i2 = 1; i2 <= 24; i2 += 1) if (e2.indexOf(r2(i2, 0, t2)) > -1) {
            n2 = i2 > 12;
            break;
          }
        } else n2 = e2 === (t2 ? "pm" : "PM");
        return n2;
      }, c = { A: [o, function(e2) {
        this.afternoon = d(e2, false);
      }], a: [o, function(e2) {
        this.afternoon = d(e2, true);
      }], Q: [n, function(e2) {
        this.month = 3 * (e2 - 1) + 1;
      }], S: [n, function(e2) {
        this.milliseconds = 100 * +e2;
      }], SS: [r, function(e2) {
        this.milliseconds = 10 * +e2;
      }], SSS: [/\d{3}/, function(e2) {
        this.milliseconds = +e2;
      }], s: [i, f("seconds")], ss: [i, f("seconds")], m: [i, f("minutes")], mm: [i, f("minutes")], H: [i, f("hours")], h: [i, f("hours")], HH: [i, f("hours")], hh: [i, f("hours")], D: [i, f("day")], DD: [r, f("day")], Do: [o, function(e2) {
        var t2 = s.ordinal, n2 = e2.match(/\d+/);
        if (this.day = n2[0], t2) for (var r2 = 1; r2 <= 31; r2 += 1) t2(r2).replace(/\[|\]/g, "") === e2 && (this.day = r2);
      }], w: [i, f("week")], ww: [r, f("week")], M: [i, f("month")], MM: [r, f("month")], MMM: [o, function(e2) {
        var t2 = u("months"), n2 = (u("monthsShort") || t2.map(function(e3) {
          return e3.slice(0, 3);
        })).indexOf(e2) + 1;
        if (n2 < 1) throw new Error();
        this.month = n2 % 12 || n2;
      }], MMMM: [o, function(e2) {
        var t2 = u("months").indexOf(e2) + 1;
        if (t2 < 1) throw new Error();
        this.month = t2 % 12 || t2;
      }], Y: [/[+-]?\d+/, f("year")], YY: [r, function(e2) {
        this.year = a(e2);
      }], YYYY: [/\d{4}/, f("year")], Z: h, ZZ: h };
      function l(n2) {
        var r2, i2;
        r2 = n2, i2 = s && s.formats;
        for (var o2 = (n2 = r2.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(t2, n3, r3) {
          var o3 = r3 && r3.toUpperCase();
          return n3 || i2[r3] || e[r3] || i2[o3].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(e2, t3, n4) {
            return t3 || n4.slice(1);
          });
        })).match(t), a2 = o2.length, f2 = 0; f2 < a2; f2 += 1) {
          var h2 = o2[f2], u2 = c[h2], d2 = u2 && u2[0], l2 = u2 && u2[1];
          o2[f2] = l2 ? { regex: d2, parser: l2 } : h2.replace(/^\[|\]$/g, "");
        }
        return function(e2) {
          for (var t2 = {}, n3 = 0, r3 = 0; n3 < a2; n3 += 1) {
            var i3 = o2[n3];
            if ("string" == typeof i3) r3 += i3.length;
            else {
              var s2 = i3.regex, f3 = i3.parser, h3 = e2.slice(r3), u3 = s2.exec(h3)[0];
              f3.call(t2, u3), e2 = e2.replace(u3, "");
            }
          }
          return function(e3) {
            var t3 = e3.afternoon;
            if (void 0 !== t3) {
              var n4 = e3.hours;
              t3 ? n4 < 12 && (e3.hours += 12) : 12 === n4 && (e3.hours = 0), delete e3.afternoon;
            }
          }(t2), t2;
        };
      }
      return function(e2, t2, n2) {
        n2.p.customParseFormat = true, e2 && e2.parseTwoDigitYear && (a = e2.parseTwoDigitYear);
        var r2 = t2.prototype, i2 = r2.parse;
        r2.parse = function(e3) {
          var t3 = e3.date, r3 = e3.utc, o2 = e3.args;
          this.$u = r3;
          var a2 = o2[1];
          if ("string" == typeof a2) {
            var f2 = true === o2[2], h2 = true === o2[3], u2 = f2 || h2, d2 = o2[2];
            h2 && (d2 = o2[2]), s = this.$locale(), !f2 && d2 && (s = n2.Ls[d2]), this.$d = function(e4, t4, n3, r4) {
              try {
                if (["x", "X"].indexOf(t4) > -1) return new Date(("X" === t4 ? 1e3 : 1) * e4);
                var i3 = l(t4)(e4), o3 = i3.year, s2 = i3.month, a3 = i3.day, f3 = i3.hours, h3 = i3.minutes, u3 = i3.seconds, d3 = i3.milliseconds, c3 = i3.zone, m2 = i3.week, M2 = /* @__PURE__ */ new Date(), Y = a3 || (o3 || s2 ? 1 : M2.getDate()), p = o3 || M2.getFullYear(), v = 0;
                o3 && !s2 || (v = s2 > 0 ? s2 - 1 : M2.getMonth());
                var D, w = f3 || 0, g = h3 || 0, y = u3 || 0, L = d3 || 0;
                return c3 ? new Date(Date.UTC(p, v, Y, w, g, y, L + 60 * c3.offset * 1e3)) : n3 ? new Date(Date.UTC(p, v, Y, w, g, y, L)) : (D = new Date(p, v, Y, w, g, y, L), m2 && (D = r4(D).week(m2).toDate()), D);
              } catch (e5) {
                return /* @__PURE__ */ new Date("");
              }
            }(t3, a2, r3, n2), this.init(), d2 && true !== d2 && (this.$L = this.locale(d2).$L), u2 && t3 != this.format(a2) && (this.$d = /* @__PURE__ */ new Date("")), s = {};
          } else if (a2 instanceof Array) for (var c2 = a2.length, m = 1; m <= c2; m += 1) {
            o2[1] = a2[m - 1];
            var M = n2.apply(this, o2);
            if (M.isValid()) {
              this.$d = M.$d, this.$L = M.$L, this.init();
              break;
            }
            m === c2 && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else i2.call(this, e3);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/localizedFormat.js
var require_localizedFormat = __commonJS({
  "node_modules/dayjs/plugin/localizedFormat.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_localizedFormat = t();
    }(exports, function() {
      "use strict";
      var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
      return function(t, o, n) {
        var r = o.prototype, i = r.format;
        n.en.formats = e, r.format = function(t2) {
          void 0 === t2 && (t2 = "YYYY-MM-DDTHH:mm:ssZ");
          var o2 = this.$locale().formats, n2 = function(t3, o3) {
            return t3.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(t4, n3, r2) {
              var i2 = r2 && r2.toUpperCase();
              return n3 || o3[r2] || e[r2] || o3[i2].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(e2, t5, o4) {
                return t5 || o4.slice(1);
              });
            });
          }(t2, void 0 === o2 ? {} : o2);
          return i.call(this, n2);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/isBetween.js
var require_isBetween = __commonJS({
  "node_modules/dayjs/plugin/isBetween.js"(exports, module) {
    !function(e, i) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isBetween = i();
    }(exports, function() {
      "use strict";
      return function(e, i, t) {
        i.prototype.isBetween = function(e2, i2, s, f) {
          var n = t(e2), o = t(i2), r = "(" === (f = f || "()")[0], u = ")" === f[1];
          return (r ? this.isAfter(n, s) : !this.isBefore(n, s)) && (u ? this.isBefore(o, s) : !this.isAfter(o, s)) || (r ? this.isBefore(n, s) : !this.isAfter(n, s)) && (u ? this.isAfter(o, s) : !this.isBefore(o, s));
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/advancedFormat.js
var require_advancedFormat = __commonJS({
  "node_modules/dayjs/plugin/advancedFormat.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_advancedFormat = t();
    }(exports, function() {
      "use strict";
      return function(e, t) {
        var r = t.prototype, n = r.format;
        r.format = function(e2) {
          var t2 = this, r2 = this.$locale();
          if (!this.isValid()) return n.bind(this)(e2);
          var s = this.$utils(), a = (e2 || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(e3) {
            switch (e3) {
              case "Q":
                return Math.ceil((t2.$M + 1) / 3);
              case "Do":
                return r2.ordinal(t2.$D);
              case "gggg":
                return t2.weekYear();
              case "GGGG":
                return t2.isoWeekYear();
              case "wo":
                return r2.ordinal(t2.week(), "W");
              case "w":
              case "ww":
                return s.s(t2.week(), "w" === e3 ? 1 : 2, "0");
              case "W":
              case "WW":
                return s.s(t2.isoWeek(), "W" === e3 ? 1 : 2, "0");
              case "k":
              case "kk":
                return s.s(String(0 === t2.$H ? 24 : t2.$H), "k" === e3 ? 1 : 2, "0");
              case "X":
                return Math.floor(t2.$d.getTime() / 1e3);
              case "x":
                return t2.$d.getTime();
              case "z":
                return "[" + t2.offsetName() + "]";
              case "zzz":
                return "[" + t2.offsetName("long") + "]";
              default:
                return e3;
            }
          });
          return n.bind(this)(a);
        };
      };
    });
  }
});

// node_modules/@mui/x-date-pickers/esm/AdapterDayjs/AdapterDayjs.js
var import_dayjs = __toESM(require_dayjs_min(), 1);
var import_weekOfYear = __toESM(require_weekOfYear(), 1);
var import_customParseFormat = __toESM(require_customParseFormat(), 1);
var import_localizedFormat = __toESM(require_localizedFormat(), 1);
var import_isBetween = __toESM(require_isBetween(), 1);
var import_advancedFormat = __toESM(require_advancedFormat(), 1);
import_dayjs.default.extend(import_localizedFormat.default);
import_dayjs.default.extend(import_weekOfYear.default);
import_dayjs.default.extend(import_isBetween.default);
import_dayjs.default.extend(import_advancedFormat.default);
var formatTokenMap = {
  // Year
  YY: "year",
  YYYY: {
    sectionType: "year",
    contentType: "digit",
    maxLength: 4
  },
  // Month
  M: {
    sectionType: "month",
    contentType: "digit",
    maxLength: 2
  },
  MM: "month",
  MMM: {
    sectionType: "month",
    contentType: "letter"
  },
  MMMM: {
    sectionType: "month",
    contentType: "letter"
  },
  // Day of the month
  D: {
    sectionType: "day",
    contentType: "digit",
    maxLength: 2
  },
  DD: "day",
  Do: {
    sectionType: "day",
    contentType: "digit-with-letter"
  },
  // Day of the week
  d: {
    sectionType: "weekDay",
    contentType: "digit",
    maxLength: 2
  },
  dd: {
    sectionType: "weekDay",
    contentType: "letter"
  },
  ddd: {
    sectionType: "weekDay",
    contentType: "letter"
  },
  dddd: {
    sectionType: "weekDay",
    contentType: "letter"
  },
  // Meridiem
  A: "meridiem",
  a: "meridiem",
  // Hours
  H: {
    sectionType: "hours",
    contentType: "digit",
    maxLength: 2
  },
  HH: "hours",
  h: {
    sectionType: "hours",
    contentType: "digit",
    maxLength: 2
  },
  hh: "hours",
  // Minutes
  m: {
    sectionType: "minutes",
    contentType: "digit",
    maxLength: 2
  },
  mm: "minutes",
  // Seconds
  s: {
    sectionType: "seconds",
    contentType: "digit",
    maxLength: 2
  },
  ss: "seconds"
};
var defaultFormats = {
  year: "YYYY",
  month: "MMMM",
  monthShort: "MMM",
  dayOfMonth: "D",
  dayOfMonthFull: "Do",
  weekday: "dddd",
  weekdayShort: "dd",
  hours24h: "HH",
  hours12h: "hh",
  meridiem: "A",
  minutes: "mm",
  seconds: "ss",
  fullDate: "ll",
  keyboardDate: "L",
  shortDate: "MMM D",
  normalDate: "D MMMM",
  normalDateWithWeekday: "ddd, MMM D",
  fullTime12h: "hh:mm A",
  fullTime24h: "HH:mm",
  keyboardDateTime12h: "L hh:mm A",
  keyboardDateTime24h: "L HH:mm"
};
var MISSING_UTC_PLUGIN = ["Missing UTC plugin", "To be able to use UTC or timezones, you have to enable the `utc` plugin", "Find more information on https://mui.com/x/react-date-pickers/timezone/#day-js-and-utc"].join("\n");
var MISSING_TIMEZONE_PLUGIN = ["Missing timezone plugin", "To be able to use timezones, you have to enable both the `utc` and the `timezone` plugin", "Find more information on https://mui.com/x/react-date-pickers/timezone/#day-js-and-timezone"].join("\n");
var withLocale = (dayjs, locale) => !locale ? dayjs : (...args) => dayjs(...args).locale(locale);
var AdapterDayjs = class {
  constructor({
    locale: _locale,
    formats
  } = {}) {
    this.isMUIAdapter = true;
    this.isTimezoneCompatible = true;
    this.lib = "dayjs";
    this.dayjs = void 0;
    this.locale = void 0;
    this.formats = void 0;
    this.escapedCharacters = {
      start: "[",
      end: "]"
    };
    this.formatTokenMap = formatTokenMap;
    this.setLocaleToValue = (value) => {
      const expectedLocale = this.getCurrentLocaleCode();
      if (expectedLocale === value.locale()) {
        return value;
      }
      return value.locale(expectedLocale);
    };
    this.hasUTCPlugin = () => typeof import_dayjs.default.utc !== "undefined";
    this.hasTimezonePlugin = () => typeof import_dayjs.default.tz !== "undefined";
    this.isSame = (value, comparing, comparisonTemplate) => {
      const comparingInValueTimezone = this.setTimezone(comparing, this.getTimezone(value));
      return value.format(comparisonTemplate) === comparingInValueTimezone.format(comparisonTemplate);
    };
    this.cleanTimezone = (timezone) => {
      switch (timezone) {
        case "default": {
          return void 0;
        }
        case "system": {
          return import_dayjs.default.tz.guess();
        }
        default: {
          return timezone;
        }
      }
    };
    this.createSystemDate = (value) => {
      if (this.hasUTCPlugin() && this.hasTimezonePlugin()) {
        const timezone = import_dayjs.default.tz.guess();
        if (timezone !== "UTC") {
          return import_dayjs.default.tz(value, timezone);
        }
        return (0, import_dayjs.default)(value);
      }
      return (0, import_dayjs.default)(value);
    };
    this.createUTCDate = (value) => {
      if (!this.hasUTCPlugin()) {
        throw new Error(MISSING_UTC_PLUGIN);
      }
      return import_dayjs.default.utc(value);
    };
    this.createTZDate = (value, timezone) => {
      if (!this.hasUTCPlugin()) {
        throw new Error(MISSING_UTC_PLUGIN);
      }
      if (!this.hasTimezonePlugin()) {
        throw new Error(MISSING_TIMEZONE_PLUGIN);
      }
      const keepLocalTime = value !== void 0 && !value.endsWith("Z");
      return (0, import_dayjs.default)(value).tz(this.cleanTimezone(timezone), keepLocalTime);
    };
    this.getLocaleFormats = () => {
      const locales = import_dayjs.default.Ls;
      const locale = this.locale || "en";
      let localeObject = locales[locale];
      if (localeObject === void 0) {
        if (true) {
          warnOnce(["MUI X: Your locale has not been found.", "Either the locale key is not a supported one. Locales supported by dayjs are available here: https://github.com/iamkun/dayjs/tree/dev/src/locale.", "Or you forget to import the locale from 'dayjs/locale/{localeUsed}'", "fallback on English locale."]);
        }
        localeObject = locales.en;
      }
      return localeObject.formats;
    };
    this.adjustOffset = (value) => {
      if (!this.hasTimezonePlugin()) {
        return value;
      }
      const timezone = this.getTimezone(value);
      if (timezone !== "UTC") {
        const fixedValue = value.tz(this.cleanTimezone(timezone), true);
        if (fixedValue.$offset === (value.$offset ?? 0)) {
          return value;
        }
        value.$offset = fixedValue.$offset;
      }
      return value;
    };
    this.date = (value, timezone = "default") => {
      if (value === null) {
        return null;
      }
      let parsedValue;
      if (timezone === "UTC") {
        parsedValue = this.createUTCDate(value);
      } else if (timezone === "system" || timezone === "default" && !this.hasTimezonePlugin()) {
        parsedValue = this.createSystemDate(value);
      } else {
        parsedValue = this.createTZDate(value, timezone);
      }
      if (this.locale === void 0) {
        return parsedValue;
      }
      return parsedValue.locale(this.locale);
    };
    this.getInvalidDate = () => (0, import_dayjs.default)(/* @__PURE__ */ new Date("Invalid date"));
    this.getTimezone = (value) => {
      if (this.hasTimezonePlugin()) {
        const zone = value.$x?.$timezone;
        if (zone) {
          return zone;
        }
      }
      if (this.hasUTCPlugin() && value.isUTC()) {
        return "UTC";
      }
      return "system";
    };
    this.setTimezone = (value, timezone) => {
      if (this.getTimezone(value) === timezone) {
        return value;
      }
      if (timezone === "UTC") {
        if (!this.hasUTCPlugin()) {
          throw new Error(MISSING_UTC_PLUGIN);
        }
        return value.utc();
      }
      if (timezone === "system") {
        return value.local();
      }
      if (!this.hasTimezonePlugin()) {
        if (timezone === "default") {
          return value;
        }
        throw new Error(MISSING_TIMEZONE_PLUGIN);
      }
      return import_dayjs.default.tz(value, this.cleanTimezone(timezone));
    };
    this.toJsDate = (value) => {
      return value.toDate();
    };
    this.parse = (value, format) => {
      if (value === "") {
        return null;
      }
      return this.dayjs(value, format, this.locale, true);
    };
    this.getCurrentLocaleCode = () => {
      return this.locale || "en";
    };
    this.is12HourCycleInCurrentLocale = () => {
      return /A|a/.test(this.getLocaleFormats().LT || "");
    };
    this.expandFormat = (format) => {
      const localeFormats = this.getLocaleFormats();
      const t = (formatBis) => formatBis.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (_, a, b) => a || b.slice(1));
      return format.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (_, a, b) => {
        const B = b && b.toUpperCase();
        return a || localeFormats[b] || t(localeFormats[B]);
      });
    };
    this.isValid = (value) => {
      if (value == null) {
        return false;
      }
      return value.isValid();
    };
    this.format = (value, formatKey) => {
      return this.formatByString(value, this.formats[formatKey]);
    };
    this.formatByString = (value, formatString) => {
      return this.dayjs(value).format(formatString);
    };
    this.formatNumber = (numberToFormat) => {
      return numberToFormat;
    };
    this.isEqual = (value, comparing) => {
      if (value === null && comparing === null) {
        return true;
      }
      if (value === null || comparing === null) {
        return false;
      }
      return value.toDate().getTime() === comparing.toDate().getTime();
    };
    this.isSameYear = (value, comparing) => {
      return this.isSame(value, comparing, "YYYY");
    };
    this.isSameMonth = (value, comparing) => {
      return this.isSame(value, comparing, "YYYY-MM");
    };
    this.isSameDay = (value, comparing) => {
      return this.isSame(value, comparing, "YYYY-MM-DD");
    };
    this.isSameHour = (value, comparing) => {
      return value.isSame(comparing, "hour");
    };
    this.isAfter = (value, comparing) => {
      return value > comparing;
    };
    this.isAfterYear = (value, comparing) => {
      if (!this.hasUTCPlugin()) {
        return value.isAfter(comparing, "year");
      }
      return !this.isSameYear(value, comparing) && value.utc() > comparing.utc();
    };
    this.isAfterDay = (value, comparing) => {
      if (!this.hasUTCPlugin()) {
        return value.isAfter(comparing, "day");
      }
      return !this.isSameDay(value, comparing) && value.utc() > comparing.utc();
    };
    this.isBefore = (value, comparing) => {
      return value < comparing;
    };
    this.isBeforeYear = (value, comparing) => {
      if (!this.hasUTCPlugin()) {
        return value.isBefore(comparing, "year");
      }
      return !this.isSameYear(value, comparing) && value.utc() < comparing.utc();
    };
    this.isBeforeDay = (value, comparing) => {
      if (!this.hasUTCPlugin()) {
        return value.isBefore(comparing, "day");
      }
      return !this.isSameDay(value, comparing) && value.utc() < comparing.utc();
    };
    this.isWithinRange = (value, [start, end]) => {
      return value >= start && value <= end;
    };
    this.startOfYear = (value) => {
      return this.adjustOffset(value.startOf("year"));
    };
    this.startOfMonth = (value) => {
      return this.adjustOffset(value.startOf("month"));
    };
    this.startOfWeek = (value) => {
      return this.adjustOffset(this.setLocaleToValue(value).startOf("week"));
    };
    this.startOfDay = (value) => {
      return this.adjustOffset(value.startOf("day"));
    };
    this.endOfYear = (value) => {
      return this.adjustOffset(value.endOf("year"));
    };
    this.endOfMonth = (value) => {
      return this.adjustOffset(value.endOf("month"));
    };
    this.endOfWeek = (value) => {
      return this.adjustOffset(this.setLocaleToValue(value).endOf("week"));
    };
    this.endOfDay = (value) => {
      return this.adjustOffset(value.endOf("day"));
    };
    this.addYears = (value, amount) => {
      return this.adjustOffset(amount < 0 ? value.subtract(Math.abs(amount), "year") : value.add(amount, "year"));
    };
    this.addMonths = (value, amount) => {
      return this.adjustOffset(amount < 0 ? value.subtract(Math.abs(amount), "month") : value.add(amount, "month"));
    };
    this.addWeeks = (value, amount) => {
      return this.adjustOffset(amount < 0 ? value.subtract(Math.abs(amount), "week") : value.add(amount, "week"));
    };
    this.addDays = (value, amount) => {
      return this.adjustOffset(amount < 0 ? value.subtract(Math.abs(amount), "day") : value.add(amount, "day"));
    };
    this.addHours = (value, amount) => {
      return this.adjustOffset(amount < 0 ? value.subtract(Math.abs(amount), "hour") : value.add(amount, "hour"));
    };
    this.addMinutes = (value, amount) => {
      return this.adjustOffset(amount < 0 ? value.subtract(Math.abs(amount), "minute") : value.add(amount, "minute"));
    };
    this.addSeconds = (value, amount) => {
      return this.adjustOffset(amount < 0 ? value.subtract(Math.abs(amount), "second") : value.add(amount, "second"));
    };
    this.getYear = (value) => {
      return value.year();
    };
    this.getMonth = (value) => {
      return value.month();
    };
    this.getDate = (value) => {
      return value.date();
    };
    this.getHours = (value) => {
      return value.hour();
    };
    this.getMinutes = (value) => {
      return value.minute();
    };
    this.getSeconds = (value) => {
      return value.second();
    };
    this.getMilliseconds = (value) => {
      return value.millisecond();
    };
    this.setYear = (value, year) => {
      return this.adjustOffset(value.set("year", year));
    };
    this.setMonth = (value, month) => {
      return this.adjustOffset(value.set("month", month));
    };
    this.setDate = (value, date) => {
      return this.adjustOffset(value.set("date", date));
    };
    this.setHours = (value, hours) => {
      return this.adjustOffset(value.set("hour", hours));
    };
    this.setMinutes = (value, minutes) => {
      return this.adjustOffset(value.set("minute", minutes));
    };
    this.setSeconds = (value, seconds) => {
      return this.adjustOffset(value.set("second", seconds));
    };
    this.setMilliseconds = (value, milliseconds) => {
      return this.adjustOffset(value.set("millisecond", milliseconds));
    };
    this.getDaysInMonth = (value) => {
      return value.daysInMonth();
    };
    this.getWeekArray = (value) => {
      const start = this.startOfWeek(this.startOfMonth(value));
      const end = this.endOfWeek(this.endOfMonth(value));
      let count = 0;
      let current = start;
      const nestedWeeks = [];
      while (current < end) {
        const weekNumber = Math.floor(count / 7);
        nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
        nestedWeeks[weekNumber].push(current);
        current = this.addDays(current, 1);
        count += 1;
      }
      return nestedWeeks;
    };
    this.getWeekNumber = (value) => {
      return value.week();
    };
    this.getYearRange = ([start, end]) => {
      const startDate = this.startOfYear(start);
      const endDate = this.endOfYear(end);
      const years = [];
      let current = startDate;
      while (this.isBefore(current, endDate)) {
        years.push(current);
        current = this.addYears(current, 1);
      }
      return years;
    };
    this.dayjs = withLocale(import_dayjs.default, _locale);
    this.locale = _locale;
    this.formats = _extends({}, defaultFormats, formats);
    import_dayjs.default.extend(import_customParseFormat.default);
  }
  getDayOfWeek(value) {
    return value.day() + 1;
  }
};
export {
  AdapterDayjs
};
//# sourceMappingURL=@mui_x-date-pickers_AdapterDayjs.js.map
