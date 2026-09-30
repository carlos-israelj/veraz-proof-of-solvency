import { _ as Wn, __tla as __tla_0 } from "./index-Bt1osp3T.js";
let Pn, An, Ir, j, xn, jt, Ku, eu, tu, Qc;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    var Ss = {
        0: (t)=>{
            var r = 1e3, e = r * 60, n = e * 60, i = n * 24, a = i * 7, s = i * 365.25;
            t.exports = function(b, g) {
                g = g || {};
                var y = typeof b;
                if (y === "string" && b.length > 0) return l(b);
                if (y === "number" && isFinite(b)) return g.long ? u(b) : p(b);
                throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(b));
            };
            function l(b) {
                if (b = String(b), !(b.length > 100)) {
                    var g = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(b);
                    if (g) {
                        var y = parseFloat(g[1]), v = (g[2] || "ms").toLowerCase();
                        switch(v){
                            case "years":
                            case "year":
                            case "yrs":
                            case "yr":
                            case "y":
                                return y * s;
                            case "weeks":
                            case "week":
                            case "w":
                                return y * a;
                            case "days":
                            case "day":
                            case "d":
                                return y * i;
                            case "hours":
                            case "hour":
                            case "hrs":
                            case "hr":
                            case "h":
                                return y * n;
                            case "minutes":
                            case "minute":
                            case "mins":
                            case "min":
                            case "m":
                                return y * e;
                            case "seconds":
                            case "second":
                            case "secs":
                            case "sec":
                            case "s":
                                return y * r;
                            case "milliseconds":
                            case "millisecond":
                            case "msecs":
                            case "msec":
                            case "ms":
                                return y;
                            default:
                                return;
                        }
                    }
                }
            }
            function p(b) {
                var g = Math.abs(b);
                return g >= i ? Math.round(b / i) + "d" : g >= n ? Math.round(b / n) + "h" : g >= e ? Math.round(b / e) + "m" : g >= r ? Math.round(b / r) + "s" : b + "ms";
            }
            function u(b) {
                var g = Math.abs(b);
                return g >= i ? d(b, g, i, "day") : g >= n ? d(b, g, n, "hour") : g >= e ? d(b, g, e, "minute") : g >= r ? d(b, g, r, "second") : b + " ms";
            }
            function d(b, g, y, v) {
                var I = g >= y * 1.5;
                return Math.round(b / y) + " " + v + (I ? "s" : "");
            }
        },
        19: (t, r)=>{
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var e = {
                exports: {}
            }, n = e.exports = {}, i, a;
            function s() {
                throw new Error("setTimeout has not been defined");
            }
            function l() {
                throw new Error("clearTimeout has not been defined");
            }
            (function() {
                try {
                    typeof setTimeout == "function" ? i = setTimeout : i = s;
                } catch  {
                    i = s;
                }
                try {
                    typeof clearTimeout == "function" ? a = clearTimeout : a = l;
                } catch  {
                    a = l;
                }
            })();
            function p(L) {
                if (i === setTimeout) return setTimeout(L, 0);
                if ((i === s || !i) && setTimeout) return i = setTimeout, setTimeout(L, 0);
                try {
                    return i(L, 0);
                } catch  {
                    try {
                        return i.call(null, L, 0);
                    } catch  {
                        return i.call(this, L, 0);
                    }
                }
            }
            function u(L) {
                if (a === clearTimeout) return clearTimeout(L);
                if ((a === l || !a) && clearTimeout) return a = clearTimeout, clearTimeout(L);
                try {
                    return a(L);
                } catch  {
                    try {
                        return a.call(null, L);
                    } catch  {
                        return a.call(this, L);
                    }
                }
            }
            var d = [], b = !1, g, y = -1;
            function v() {
                !b || !g || (b = !1, g.length ? d = g.concat(d) : y = -1, d.length && I());
            }
            function I() {
                if (!b) {
                    var L = p(v);
                    b = !0;
                    for(var $ = d.length; $;){
                        for(g = d, d = []; ++y < $;)g && g[y].run();
                        y = -1, $ = d.length;
                    }
                    g = null, b = !1, u(L);
                }
            }
            n.nextTick = function(L) {
                var $ = new Array(arguments.length - 1);
                if (arguments.length > 1) for(var X = 1; X < arguments.length; X++)$[X - 1] = arguments[X];
                d.push(new T(L, $)), d.length === 1 && !b && p(I);
            };
            function T(L, $) {
                this.fun = L, this.array = $;
            }
            T.prototype.run = function() {
                this.fun.apply(null, this.array);
            }, n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.version = "", n.versions = {};
            function C() {}
            n.on = C, n.addListener = C, n.once = C, n.off = C, n.removeListener = C, n.removeAllListeners = C, n.emit = C, n.prependListener = C, n.prependOnceListener = C, n.listeners = function(L) {
                return [];
            }, n.binding = function(L) {
                throw new Error("process.binding is not supported");
            }, n.cwd = function() {
                return "/";
            }, n.chdir = function(L) {
                throw new Error("process.chdir is not supported");
            }, n.umask = function() {
                return 0;
            };
            function M() {}
            var D = e.exports.browser, B = M, F = e.exports.binding, G = M, O = 1, K = {}, W = M, P = M, H = M, _t = M, E = M, N = "browser", U = "browser", x = "browser", z = [], V = {
                nextTick: e.exports.nextTick,
                title: e.exports.title,
                browser: D,
                env: e.exports.env,
                argv: e.exports.argv,
                version: e.exports.version,
                versions: e.exports.versions,
                on: e.exports.on,
                addListener: e.exports.addListener,
                once: e.exports.once,
                off: e.exports.off,
                removeListener: e.exports.removeListener,
                removeAllListeners: e.exports.removeAllListeners,
                emit: e.exports.emit,
                emitWarning: B,
                prependListener: e.exports.prependListener,
                prependOnceListener: e.exports.prependOnceListener,
                listeners: e.exports.listeners,
                binding: F,
                cwd: e.exports.cwd,
                chdir: e.exports.chdir,
                umask: e.exports.umask,
                exit: G,
                pid: O,
                features: K,
                kill: W,
                dlopen: P,
                uptime: H,
                memoryUsage: _t,
                uvCounters: E,
                platform: N,
                arch: U,
                execPath: x,
                execArgv: z
            };
            r.addListener = e.exports.addListener, r.arch = U, r.argv = e.exports.argv, r.binding = F, r.browser = D, r.chdir = e.exports.chdir, r.cwd = e.exports.cwd, r.default = V, r.dlopen = P, r.emit = e.exports.emit, r.emitWarning = B, r.env = e.exports.env, r.execArgv = z, r.execPath = x, r.exit = G, r.features = K, r.kill = W, r.listeners = e.exports.listeners, r.memoryUsage = _t, r.nextTick = e.exports.nextTick, r.off = e.exports.off, r.on = e.exports.on, r.once = e.exports.once, r.pid = O, r.platform = N, r.prependListener = e.exports.prependListener, r.prependOnceListener = e.exports.prependOnceListener, r.removeAllListeners = e.exports.removeAllListeners, r.removeListener = e.exports.removeListener, r.title = e.exports.title, r.umask = e.exports.umask, r.uptime = H, r.uvCounters = E, r.version = e.exports.version, r.versions = e.exports.versions, r = t.exports = V;
        },
        251: (t, r)=>{
            r.read = function(e, n, i, a, s) {
                var l, p, u = s * 8 - a - 1, d = (1 << u) - 1, b = d >> 1, g = -7, y = i ? s - 1 : 0, v = i ? -1 : 1, I = e[n + y];
                for(y += v, l = I & (1 << -g) - 1, I >>= -g, g += u; g > 0; l = l * 256 + e[n + y], y += v, g -= 8);
                for(p = l & (1 << -g) - 1, l >>= -g, g += a; g > 0; p = p * 256 + e[n + y], y += v, g -= 8);
                if (l === 0) l = 1 - b;
                else {
                    if (l === d) return p ? NaN : (I ? -1 : 1) * (1 / 0);
                    p = p + Math.pow(2, a), l = l - b;
                }
                return (I ? -1 : 1) * p * Math.pow(2, l - a);
            }, r.write = function(e, n, i, a, s, l) {
                var p, u, d, b = l * 8 - s - 1, g = (1 << b) - 1, y = g >> 1, v = s === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, I = a ? 0 : l - 1, T = a ? 1 : -1, C = n < 0 || n === 0 && 1 / n < 0 ? 1 : 0;
                for(n = Math.abs(n), isNaN(n) || n === 1 / 0 ? (u = isNaN(n) ? 1 : 0, p = g) : (p = Math.floor(Math.log(n) / Math.LN2), n * (d = Math.pow(2, -p)) < 1 && (p--, d *= 2), p + y >= 1 ? n += v / d : n += v * Math.pow(2, 1 - y), n * d >= 2 && (p++, d /= 2), p + y >= g ? (u = 0, p = g) : p + y >= 1 ? (u = (n * d - 1) * Math.pow(2, s), p = p + y) : (u = n * Math.pow(2, y - 1) * Math.pow(2, s), p = 0)); s >= 8; e[i + I] = u & 255, I += T, u /= 256, s -= 8);
                for(p = p << s | u, b += s; b > 0; e[i + I] = p & 255, I += T, p /= 256, b -= 8);
                e[i + I - T] |= C * 128;
            };
        },
        287: (t, r, e)=>{
            const n = e(526), i = e(251), a = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
            r.hp = u, r.IS = 50;
            const s = 2147483647;
            u.TYPED_ARRAY_SUPPORT = l(), !u.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
            function l() {
                try {
                    const f = new Uint8Array(1), o = {
                        foo: function() {
                            return 42;
                        }
                    };
                    return Object.setPrototypeOf(o, Uint8Array.prototype), Object.setPrototypeOf(f, o), f.foo() === 42;
                } catch  {
                    return !1;
                }
            }
            Object.defineProperty(u.prototype, "parent", {
                enumerable: !0,
                get: function() {
                    if (u.isBuffer(this)) return this.buffer;
                }
            }), Object.defineProperty(u.prototype, "offset", {
                enumerable: !0,
                get: function() {
                    if (u.isBuffer(this)) return this.byteOffset;
                }
            });
            function p(f) {
                if (f > s) throw new RangeError('The value "' + f + '" is invalid for option "size"');
                const o = new Uint8Array(f);
                return Object.setPrototypeOf(o, u.prototype), o;
            }
            function u(f, o, c) {
                if (typeof f == "number") {
                    if (typeof o == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
                    return y(f);
                }
                return d(f, o, c);
            }
            u.poolSize = 8192;
            function d(f, o, c) {
                if (typeof f == "string") return v(f, o);
                if (ArrayBuffer.isView(f)) return T(f);
                if (f == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof f);
                if (Zt(f, ArrayBuffer) || f && Zt(f.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Zt(f, SharedArrayBuffer) || f && Zt(f.buffer, SharedArrayBuffer))) return C(f, o, c);
                if (typeof f == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
                const h = f.valueOf && f.valueOf();
                if (h != null && h !== f) return u.from(h, o, c);
                const _ = M(f);
                if (_) return _;
                if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof f[Symbol.toPrimitive] == "function") return u.from(f[Symbol.toPrimitive]("string"), o, c);
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof f);
            }
            u.from = function(f, o, c) {
                return d(f, o, c);
            }, Object.setPrototypeOf(u.prototype, Uint8Array.prototype), Object.setPrototypeOf(u, Uint8Array);
            function b(f) {
                if (typeof f != "number") throw new TypeError('"size" argument must be of type number');
                if (f < 0) throw new RangeError('The value "' + f + '" is invalid for option "size"');
            }
            function g(f, o, c) {
                return b(f), f <= 0 ? p(f) : o !== void 0 ? typeof c == "string" ? p(f).fill(o, c) : p(f).fill(o) : p(f);
            }
            u.alloc = function(f, o, c) {
                return g(f, o, c);
            };
            function y(f) {
                return b(f), p(f < 0 ? 0 : D(f) | 0);
            }
            u.allocUnsafe = function(f) {
                return y(f);
            }, u.allocUnsafeSlow = function(f) {
                return y(f);
            };
            function v(f, o) {
                if ((typeof o != "string" || o === "") && (o = "utf8"), !u.isEncoding(o)) throw new TypeError("Unknown encoding: " + o);
                const c = B(f, o) | 0;
                let h = p(c);
                const _ = h.write(f, o);
                return _ !== c && (h = h.slice(0, _)), h;
            }
            function I(f) {
                const o = f.length < 0 ? 0 : D(f.length) | 0, c = p(o);
                for(let h = 0; h < o; h += 1)c[h] = f[h] & 255;
                return c;
            }
            function T(f) {
                if (Zt(f, Uint8Array)) {
                    const o = new Uint8Array(f);
                    return C(o.buffer, o.byteOffset, o.byteLength);
                }
                return I(f);
            }
            function C(f, o, c) {
                if (o < 0 || f.byteLength < o) throw new RangeError('"offset" is outside of buffer bounds');
                if (f.byteLength < o + (c || 0)) throw new RangeError('"length" is outside of buffer bounds');
                let h;
                return o === void 0 && c === void 0 ? h = new Uint8Array(f) : c === void 0 ? h = new Uint8Array(f, o) : h = new Uint8Array(f, o, c), Object.setPrototypeOf(h, u.prototype), h;
            }
            function M(f) {
                if (u.isBuffer(f)) {
                    const o = D(f.length) | 0, c = p(o);
                    return c.length === 0 || f.copy(c, 0, 0, o), c;
                }
                if (f.length !== void 0) return typeof f.length != "number" || Wr(f.length) ? p(0) : I(f);
                if (f.type === "Buffer" && Array.isArray(f.data)) return I(f.data);
            }
            function D(f) {
                if (f >= s) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
                return f | 0;
            }
            u.isBuffer = function(o) {
                return o != null && o._isBuffer === !0 && o !== u.prototype;
            }, u.compare = function(o, c) {
                if (Zt(o, Uint8Array) && (o = u.from(o, o.offset, o.byteLength)), Zt(c, Uint8Array) && (c = u.from(c, c.offset, c.byteLength)), !u.isBuffer(o) || !u.isBuffer(c)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                if (o === c) return 0;
                let h = o.length, _ = c.length;
                for(let S = 0, A = Math.min(h, _); S < A; ++S)if (o[S] !== c[S]) {
                    h = o[S], _ = c[S];
                    break;
                }
                return h < _ ? -1 : _ < h ? 1 : 0;
            }, u.isEncoding = function(o) {
                switch(String(o).toLowerCase()){
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1;
                }
            }, u.concat = function(o, c) {
                if (!Array.isArray(o)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (o.length === 0) return u.alloc(0);
                let h;
                if (c === void 0) for(c = 0, h = 0; h < o.length; ++h)c += o[h].length;
                const _ = u.allocUnsafe(c);
                let S = 0;
                for(h = 0; h < o.length; ++h){
                    let A = o[h];
                    if (Zt(A, Uint8Array)) S + A.length > _.length ? (u.isBuffer(A) || (A = u.from(A)), A.copy(_, S)) : Uint8Array.prototype.set.call(_, A, S);
                    else if (u.isBuffer(A)) A.copy(_, S);
                    else throw new TypeError('"list" argument must be an Array of Buffers');
                    S += A.length;
                }
                return _;
            };
            function B(f, o) {
                if (u.isBuffer(f)) return f.length;
                if (ArrayBuffer.isView(f) || Zt(f, ArrayBuffer)) return f.byteLength;
                if (typeof f != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof f);
                const c = f.length, h = arguments.length > 2 && arguments[2] === !0;
                if (!h && c === 0) return 0;
                let _ = !1;
                for(;;)switch(o){
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return c;
                    case "utf8":
                    case "utf-8":
                        return Hr(f).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return c * 2;
                    case "hex":
                        return c >>> 1;
                    case "base64":
                        return Hn(f).length;
                    default:
                        if (_) return h ? -1 : Hr(f).length;
                        o = ("" + o).toLowerCase(), _ = !0;
                }
            }
            u.byteLength = B;
            function F(f, o, c) {
                let h = !1;
                if ((o === void 0 || o < 0) && (o = 0), o > this.length || ((c === void 0 || c > this.length) && (c = this.length), c <= 0) || (c >>>= 0, o >>>= 0, c <= o)) return "";
                for(f || (f = "utf8");;)switch(f){
                    case "hex":
                        return $(this, o, c);
                    case "utf8":
                    case "utf-8":
                        return U(this, o, c);
                    case "ascii":
                        return V(this, o, c);
                    case "latin1":
                    case "binary":
                        return L(this, o, c);
                    case "base64":
                        return N(this, o, c);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return X(this, o, c);
                    default:
                        if (h) throw new TypeError("Unknown encoding: " + f);
                        f = (f + "").toLowerCase(), h = !0;
                }
            }
            u.prototype._isBuffer = !0;
            function G(f, o, c) {
                const h = f[o];
                f[o] = f[c], f[c] = h;
            }
            u.prototype.swap16 = function() {
                const o = this.length;
                if (o % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for(let c = 0; c < o; c += 2)G(this, c, c + 1);
                return this;
            }, u.prototype.swap32 = function() {
                const o = this.length;
                if (o % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for(let c = 0; c < o; c += 4)G(this, c, c + 3), G(this, c + 1, c + 2);
                return this;
            }, u.prototype.swap64 = function() {
                const o = this.length;
                if (o % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for(let c = 0; c < o; c += 8)G(this, c, c + 7), G(this, c + 1, c + 6), G(this, c + 2, c + 5), G(this, c + 3, c + 4);
                return this;
            }, u.prototype.toString = function() {
                const o = this.length;
                return o === 0 ? "" : arguments.length === 0 ? U(this, 0, o) : F.apply(this, arguments);
            }, u.prototype.toLocaleString = u.prototype.toString, u.prototype.equals = function(o) {
                if (!u.isBuffer(o)) throw new TypeError("Argument must be a Buffer");
                return this === o ? !0 : u.compare(this, o) === 0;
            }, u.prototype.inspect = function() {
                let o = "";
                const c = r.IS;
                return o = this.toString("hex", 0, c).replace(/(.{2})/g, "$1 ").trim(), this.length > c && (o += " ... "), "<Buffer " + o + ">";
            }, a && (u.prototype[a] = u.prototype.inspect), u.prototype.compare = function(o, c, h, _, S) {
                if (Zt(o, Uint8Array) && (o = u.from(o, o.offset, o.byteLength)), !u.isBuffer(o)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof o);
                if (c === void 0 && (c = 0), h === void 0 && (h = o ? o.length : 0), _ === void 0 && (_ = 0), S === void 0 && (S = this.length), c < 0 || h > o.length || _ < 0 || S > this.length) throw new RangeError("out of range index");
                if (_ >= S && c >= h) return 0;
                if (_ >= S) return -1;
                if (c >= h) return 1;
                if (c >>>= 0, h >>>= 0, _ >>>= 0, S >>>= 0, this === o) return 0;
                let A = S - _, q = h - c;
                const ft = Math.min(A, q), lt = this.slice(_, S), ht = o.slice(c, h);
                for(let it = 0; it < ft; ++it)if (lt[it] !== ht[it]) {
                    A = lt[it], q = ht[it];
                    break;
                }
                return A < q ? -1 : q < A ? 1 : 0;
            };
            function O(f, o, c, h, _) {
                if (f.length === 0) return -1;
                if (typeof c == "string" ? (h = c, c = 0) : c > 2147483647 ? c = 2147483647 : c < -2147483648 && (c = -2147483648), c = +c, Wr(c) && (c = _ ? 0 : f.length - 1), c < 0 && (c = f.length + c), c >= f.length) {
                    if (_) return -1;
                    c = f.length - 1;
                } else if (c < 0) if (_) c = 0;
                else return -1;
                if (typeof o == "string" && (o = u.from(o, h)), u.isBuffer(o)) return o.length === 0 ? -1 : K(f, o, c, h, _);
                if (typeof o == "number") return o = o & 255, typeof Uint8Array.prototype.indexOf == "function" ? _ ? Uint8Array.prototype.indexOf.call(f, o, c) : Uint8Array.prototype.lastIndexOf.call(f, o, c) : K(f, [
                    o
                ], c, h, _);
                throw new TypeError("val must be string, number or Buffer");
            }
            function K(f, o, c, h, _) {
                let S = 1, A = f.length, q = o.length;
                if (h !== void 0 && (h = String(h).toLowerCase(), h === "ucs2" || h === "ucs-2" || h === "utf16le" || h === "utf-16le")) {
                    if (f.length < 2 || o.length < 2) return -1;
                    S = 2, A /= 2, q /= 2, c /= 2;
                }
                function ft(ht, it) {
                    return S === 1 ? ht[it] : ht.readUInt16BE(it * S);
                }
                let lt;
                if (_) {
                    let ht = -1;
                    for(lt = c; lt < A; lt++)if (ft(f, lt) === ft(o, ht === -1 ? 0 : lt - ht)) {
                        if (ht === -1 && (ht = lt), lt - ht + 1 === q) return ht * S;
                    } else ht !== -1 && (lt -= lt - ht), ht = -1;
                } else for(c + q > A && (c = A - q), lt = c; lt >= 0; lt--){
                    let ht = !0;
                    for(let it = 0; it < q; it++)if (ft(f, lt + it) !== ft(o, it)) {
                        ht = !1;
                        break;
                    }
                    if (ht) return lt;
                }
                return -1;
            }
            u.prototype.includes = function(o, c, h) {
                return this.indexOf(o, c, h) !== -1;
            }, u.prototype.indexOf = function(o, c, h) {
                return O(this, o, c, h, !0);
            }, u.prototype.lastIndexOf = function(o, c, h) {
                return O(this, o, c, h, !1);
            };
            function W(f, o, c, h) {
                c = Number(c) || 0;
                const _ = f.length - c;
                h ? (h = Number(h), h > _ && (h = _)) : h = _;
                const S = o.length;
                h > S / 2 && (h = S / 2);
                let A;
                for(A = 0; A < h; ++A){
                    const q = parseInt(o.substr(A * 2, 2), 16);
                    if (Wr(q)) return A;
                    f[c + A] = q;
                }
                return A;
            }
            function P(f, o, c, h) {
                return fr(Hr(o, f.length - c), f, c, h);
            }
            function H(f, o, c, h) {
                return fr(ys(o), f, c, h);
            }
            function _t(f, o, c, h) {
                return fr(Hn(o), f, c, h);
            }
            function E(f, o, c, h) {
                return fr(bs(o, f.length - c), f, c, h);
            }
            u.prototype.write = function(o, c, h, _) {
                if (c === void 0) _ = "utf8", h = this.length, c = 0;
                else if (h === void 0 && typeof c == "string") _ = c, h = this.length, c = 0;
                else if (isFinite(c)) c = c >>> 0, isFinite(h) ? (h = h >>> 0, _ === void 0 && (_ = "utf8")) : (_ = h, h = void 0);
                else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                const S = this.length - c;
                if ((h === void 0 || h > S) && (h = S), o.length > 0 && (h < 0 || c < 0) || c > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                _ || (_ = "utf8");
                let A = !1;
                for(;;)switch(_){
                    case "hex":
                        return W(this, o, c, h);
                    case "utf8":
                    case "utf-8":
                        return P(this, o, c, h);
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return H(this, o, c, h);
                    case "base64":
                        return _t(this, o, c, h);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return E(this, o, c, h);
                    default:
                        if (A) throw new TypeError("Unknown encoding: " + _);
                        _ = ("" + _).toLowerCase(), A = !0;
                }
            }, u.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                };
            };
            function N(f, o, c) {
                return o === 0 && c === f.length ? n.fromByteArray(f) : n.fromByteArray(f.slice(o, c));
            }
            function U(f, o, c) {
                c = Math.min(f.length, c);
                const h = [];
                let _ = o;
                for(; _ < c;){
                    const S = f[_];
                    let A = null, q = S > 239 ? 4 : S > 223 ? 3 : S > 191 ? 2 : 1;
                    if (_ + q <= c) {
                        let ft, lt, ht, it;
                        switch(q){
                            case 1:
                                S < 128 && (A = S);
                                break;
                            case 2:
                                ft = f[_ + 1], (ft & 192) === 128 && (it = (S & 31) << 6 | ft & 63, it > 127 && (A = it));
                                break;
                            case 3:
                                ft = f[_ + 1], lt = f[_ + 2], (ft & 192) === 128 && (lt & 192) === 128 && (it = (S & 15) << 12 | (ft & 63) << 6 | lt & 63, it > 2047 && (it < 55296 || it > 57343) && (A = it));
                                break;
                            case 4:
                                ft = f[_ + 1], lt = f[_ + 2], ht = f[_ + 3], (ft & 192) === 128 && (lt & 192) === 128 && (ht & 192) === 128 && (it = (S & 15) << 18 | (ft & 63) << 12 | (lt & 63) << 6 | ht & 63, it > 65535 && it < 1114112 && (A = it));
                        }
                    }
                    A === null ? (A = 65533, q = 1) : A > 65535 && (A -= 65536, h.push(A >>> 10 & 1023 | 55296), A = 56320 | A & 1023), h.push(A), _ += q;
                }
                return z(h);
            }
            const x = 4096;
            function z(f) {
                const o = f.length;
                if (o <= x) return String.fromCharCode.apply(String, f);
                let c = "", h = 0;
                for(; h < o;)c += String.fromCharCode.apply(String, f.slice(h, h += x));
                return c;
            }
            function V(f, o, c) {
                let h = "";
                c = Math.min(f.length, c);
                for(let _ = o; _ < c; ++_)h += String.fromCharCode(f[_] & 127);
                return h;
            }
            function L(f, o, c) {
                let h = "";
                c = Math.min(f.length, c);
                for(let _ = o; _ < c; ++_)h += String.fromCharCode(f[_]);
                return h;
            }
            function $(f, o, c) {
                const h = f.length;
                (!o || o < 0) && (o = 0), (!c || c < 0 || c > h) && (c = h);
                let _ = "";
                for(let S = o; S < c; ++S)_ += Es[f[S]];
                return _;
            }
            function X(f, o, c) {
                const h = f.slice(o, c);
                let _ = "";
                for(let S = 0; S < h.length - 1; S += 2)_ += String.fromCharCode(h[S] + h[S + 1] * 256);
                return _;
            }
            u.prototype.slice = function(o, c) {
                const h = this.length;
                o = ~~o, c = c === void 0 ? h : ~~c, o < 0 ? (o += h, o < 0 && (o = 0)) : o > h && (o = h), c < 0 ? (c += h, c < 0 && (c = 0)) : c > h && (c = h), c < o && (c = o);
                const _ = this.subarray(o, c);
                return Object.setPrototypeOf(_, u.prototype), _;
            };
            function Y(f, o, c) {
                if (f % 1 !== 0 || f < 0) throw new RangeError("offset is not uint");
                if (f + o > c) throw new RangeError("Trying to access beyond buffer length");
            }
            u.prototype.readUintLE = u.prototype.readUIntLE = function(o, c, h) {
                o = o >>> 0, c = c >>> 0, h || Y(o, c, this.length);
                let _ = this[o], S = 1, A = 0;
                for(; ++A < c && (S *= 256);)_ += this[o + A] * S;
                return _;
            }, u.prototype.readUintBE = u.prototype.readUIntBE = function(o, c, h) {
                o = o >>> 0, c = c >>> 0, h || Y(o, c, this.length);
                let _ = this[o + --c], S = 1;
                for(; c > 0 && (S *= 256);)_ += this[o + --c] * S;
                return _;
            }, u.prototype.readUint8 = u.prototype.readUInt8 = function(o, c) {
                return o = o >>> 0, c || Y(o, 1, this.length), this[o];
            }, u.prototype.readUint16LE = u.prototype.readUInt16LE = function(o, c) {
                return o = o >>> 0, c || Y(o, 2, this.length), this[o] | this[o + 1] << 8;
            }, u.prototype.readUint16BE = u.prototype.readUInt16BE = function(o, c) {
                return o = o >>> 0, c || Y(o, 2, this.length), this[o] << 8 | this[o + 1];
            }, u.prototype.readUint32LE = u.prototype.readUInt32LE = function(o, c) {
                return o = o >>> 0, c || Y(o, 4, this.length), (this[o] | this[o + 1] << 8 | this[o + 2] << 16) + this[o + 3] * 16777216;
            }, u.prototype.readUint32BE = u.prototype.readUInt32BE = function(o, c) {
                return o = o >>> 0, c || Y(o, 4, this.length), this[o] * 16777216 + (this[o + 1] << 16 | this[o + 2] << 8 | this[o + 3]);
            }, u.prototype.readBigUInt64LE = qt(function(o) {
                o = o >>> 0, ge(o, "offset");
                const c = this[o], h = this[o + 7];
                (c === void 0 || h === void 0) && Ze(o, this.length - 8);
                const _ = c + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + this[++o] * 2 ** 24, S = this[++o] + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + h * 2 ** 24;
                return BigInt(_) + (BigInt(S) << BigInt(32));
            }), u.prototype.readBigUInt64BE = qt(function(o) {
                o = o >>> 0, ge(o, "offset");
                const c = this[o], h = this[o + 7];
                (c === void 0 || h === void 0) && Ze(o, this.length - 8);
                const _ = c * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + this[++o], S = this[++o] * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + h;
                return (BigInt(_) << BigInt(32)) + BigInt(S);
            }), u.prototype.readIntLE = function(o, c, h) {
                o = o >>> 0, c = c >>> 0, h || Y(o, c, this.length);
                let _ = this[o], S = 1, A = 0;
                for(; ++A < c && (S *= 256);)_ += this[o + A] * S;
                return S *= 128, _ >= S && (_ -= Math.pow(2, 8 * c)), _;
            }, u.prototype.readIntBE = function(o, c, h) {
                o = o >>> 0, c = c >>> 0, h || Y(o, c, this.length);
                let _ = c, S = 1, A = this[o + --_];
                for(; _ > 0 && (S *= 256);)A += this[o + --_] * S;
                return S *= 128, A >= S && (A -= Math.pow(2, 8 * c)), A;
            }, u.prototype.readInt8 = function(o, c) {
                return o = o >>> 0, c || Y(o, 1, this.length), this[o] & 128 ? (255 - this[o] + 1) * -1 : this[o];
            }, u.prototype.readInt16LE = function(o, c) {
                o = o >>> 0, c || Y(o, 2, this.length);
                const h = this[o] | this[o + 1] << 8;
                return h & 32768 ? h | 4294901760 : h;
            }, u.prototype.readInt16BE = function(o, c) {
                o = o >>> 0, c || Y(o, 2, this.length);
                const h = this[o + 1] | this[o] << 8;
                return h & 32768 ? h | 4294901760 : h;
            }, u.prototype.readInt32LE = function(o, c) {
                return o = o >>> 0, c || Y(o, 4, this.length), this[o] | this[o + 1] << 8 | this[o + 2] << 16 | this[o + 3] << 24;
            }, u.prototype.readInt32BE = function(o, c) {
                return o = o >>> 0, c || Y(o, 4, this.length), this[o] << 24 | this[o + 1] << 16 | this[o + 2] << 8 | this[o + 3];
            }, u.prototype.readBigInt64LE = qt(function(o) {
                o = o >>> 0, ge(o, "offset");
                const c = this[o], h = this[o + 7];
                (c === void 0 || h === void 0) && Ze(o, this.length - 8);
                const _ = this[o + 4] + this[o + 5] * 2 ** 8 + this[o + 6] * 2 ** 16 + (h << 24);
                return (BigInt(_) << BigInt(32)) + BigInt(c + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + this[++o] * 2 ** 24);
            }), u.prototype.readBigInt64BE = qt(function(o) {
                o = o >>> 0, ge(o, "offset");
                const c = this[o], h = this[o + 7];
                (c === void 0 || h === void 0) && Ze(o, this.length - 8);
                const _ = (c << 24) + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + this[++o];
                return (BigInt(_) << BigInt(32)) + BigInt(this[++o] * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + h);
            }), u.prototype.readFloatLE = function(o, c) {
                return o = o >>> 0, c || Y(o, 4, this.length), i.read(this, o, !0, 23, 4);
            }, u.prototype.readFloatBE = function(o, c) {
                return o = o >>> 0, c || Y(o, 4, this.length), i.read(this, o, !1, 23, 4);
            }, u.prototype.readDoubleLE = function(o, c) {
                return o = o >>> 0, c || Y(o, 8, this.length), i.read(this, o, !0, 52, 8);
            }, u.prototype.readDoubleBE = function(o, c) {
                return o = o >>> 0, c || Y(o, 8, this.length), i.read(this, o, !1, 52, 8);
            };
            function et(f, o, c, h, _, S) {
                if (!u.isBuffer(f)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (o > _ || o < S) throw new RangeError('"value" argument is out of bounds');
                if (c + h > f.length) throw new RangeError("Index out of range");
            }
            u.prototype.writeUintLE = u.prototype.writeUIntLE = function(o, c, h, _) {
                if (o = +o, c = c >>> 0, h = h >>> 0, !_) {
                    const q = Math.pow(2, 8 * h) - 1;
                    et(this, o, c, h, q, 0);
                }
                let S = 1, A = 0;
                for(this[c] = o & 255; ++A < h && (S *= 256);)this[c + A] = o / S & 255;
                return c + h;
            }, u.prototype.writeUintBE = u.prototype.writeUIntBE = function(o, c, h, _) {
                if (o = +o, c = c >>> 0, h = h >>> 0, !_) {
                    const q = Math.pow(2, 8 * h) - 1;
                    et(this, o, c, h, q, 0);
                }
                let S = h - 1, A = 1;
                for(this[c + S] = o & 255; --S >= 0 && (A *= 256);)this[c + S] = o / A & 255;
                return c + h;
            }, u.prototype.writeUint8 = u.prototype.writeUInt8 = function(o, c, h) {
                return o = +o, c = c >>> 0, h || et(this, o, c, 1, 255, 0), this[c] = o & 255, c + 1;
            }, u.prototype.writeUint16LE = u.prototype.writeUInt16LE = function(o, c, h) {
                return o = +o, c = c >>> 0, h || et(this, o, c, 2, 65535, 0), this[c] = o & 255, this[c + 1] = o >>> 8, c + 2;
            }, u.prototype.writeUint16BE = u.prototype.writeUInt16BE = function(o, c, h) {
                return o = +o, c = c >>> 0, h || et(this, o, c, 2, 65535, 0), this[c] = o >>> 8, this[c + 1] = o & 255, c + 2;
            }, u.prototype.writeUint32LE = u.prototype.writeUInt32LE = function(o, c, h) {
                return o = +o, c = c >>> 0, h || et(this, o, c, 4, 4294967295, 0), this[c + 3] = o >>> 24, this[c + 2] = o >>> 16, this[c + 1] = o >>> 8, this[c] = o & 255, c + 4;
            }, u.prototype.writeUint32BE = u.prototype.writeUInt32BE = function(o, c, h) {
                return o = +o, c = c >>> 0, h || et(this, o, c, 4, 4294967295, 0), this[c] = o >>> 24, this[c + 1] = o >>> 16, this[c + 2] = o >>> 8, this[c + 3] = o & 255, c + 4;
            };
            function kt(f, o, c, h, _) {
                Oe(o, h, _, f, c, 7);
                let S = Number(o & BigInt(4294967295));
                f[c++] = S, S = S >> 8, f[c++] = S, S = S >> 8, f[c++] = S, S = S >> 8, f[c++] = S;
                let A = Number(o >> BigInt(32) & BigInt(4294967295));
                return f[c++] = A, A = A >> 8, f[c++] = A, A = A >> 8, f[c++] = A, A = A >> 8, f[c++] = A, c;
            }
            function St(f, o, c, h, _) {
                Oe(o, h, _, f, c, 7);
                let S = Number(o & BigInt(4294967295));
                f[c + 7] = S, S = S >> 8, f[c + 6] = S, S = S >> 8, f[c + 5] = S, S = S >> 8, f[c + 4] = S;
                let A = Number(o >> BigInt(32) & BigInt(4294967295));
                return f[c + 3] = A, A = A >> 8, f[c + 2] = A, A = A >> 8, f[c + 1] = A, A = A >> 8, f[c] = A, c + 8;
            }
            u.prototype.writeBigUInt64LE = qt(function(o, c = 0) {
                return kt(this, o, c, BigInt(0), BigInt("0xffffffffffffffff"));
            }), u.prototype.writeBigUInt64BE = qt(function(o, c = 0) {
                return St(this, o, c, BigInt(0), BigInt("0xffffffffffffffff"));
            }), u.prototype.writeIntLE = function(o, c, h, _) {
                if (o = +o, c = c >>> 0, !_) {
                    const ft = Math.pow(2, 8 * h - 1);
                    et(this, o, c, h, ft - 1, -ft);
                }
                let S = 0, A = 1, q = 0;
                for(this[c] = o & 255; ++S < h && (A *= 256);)o < 0 && q === 0 && this[c + S - 1] !== 0 && (q = 1), this[c + S] = (o / A >> 0) - q & 255;
                return c + h;
            }, u.prototype.writeIntBE = function(o, c, h, _) {
                if (o = +o, c = c >>> 0, !_) {
                    const ft = Math.pow(2, 8 * h - 1);
                    et(this, o, c, h, ft - 1, -ft);
                }
                let S = h - 1, A = 1, q = 0;
                for(this[c + S] = o & 255; --S >= 0 && (A *= 256);)o < 0 && q === 0 && this[c + S + 1] !== 0 && (q = 1), this[c + S] = (o / A >> 0) - q & 255;
                return c + h;
            }, u.prototype.writeInt8 = function(o, c, h) {
                return o = +o, c = c >>> 0, h || et(this, o, c, 1, 127, -128), o < 0 && (o = 255 + o + 1), this[c] = o & 255, c + 1;
            }, u.prototype.writeInt16LE = function(o, c, h) {
                return o = +o, c = c >>> 0, h || et(this, o, c, 2, 32767, -32768), this[c] = o & 255, this[c + 1] = o >>> 8, c + 2;
            }, u.prototype.writeInt16BE = function(o, c, h) {
                return o = +o, c = c >>> 0, h || et(this, o, c, 2, 32767, -32768), this[c] = o >>> 8, this[c + 1] = o & 255, c + 2;
            }, u.prototype.writeInt32LE = function(o, c, h) {
                return o = +o, c = c >>> 0, h || et(this, o, c, 4, 2147483647, -2147483648), this[c] = o & 255, this[c + 1] = o >>> 8, this[c + 2] = o >>> 16, this[c + 3] = o >>> 24, c + 4;
            }, u.prototype.writeInt32BE = function(o, c, h) {
                return o = +o, c = c >>> 0, h || et(this, o, c, 4, 2147483647, -2147483648), o < 0 && (o = 4294967295 + o + 1), this[c] = o >>> 24, this[c + 1] = o >>> 16, this[c + 2] = o >>> 8, this[c + 3] = o & 255, c + 4;
            }, u.prototype.writeBigInt64LE = qt(function(o, c = 0) {
                return kt(this, o, c, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
            }), u.prototype.writeBigInt64BE = qt(function(o, c = 0) {
                return St(this, o, c, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
            });
            function me(f, o, c, h, _, S) {
                if (c + h > f.length) throw new RangeError("Index out of range");
                if (c < 0) throw new RangeError("Index out of range");
            }
            function we(f, o, c, h, _) {
                return o = +o, c = c >>> 0, _ || me(f, o, c, 4), i.write(f, o, c, h, 23, 4), c + 4;
            }
            u.prototype.writeFloatLE = function(o, c, h) {
                return we(this, o, c, !0, h);
            }, u.prototype.writeFloatBE = function(o, c, h) {
                return we(this, o, c, !1, h);
            };
            function Ne(f, o, c, h, _) {
                return o = +o, c = c >>> 0, _ || me(f, o, c, 8), i.write(f, o, c, h, 52, 8), c + 8;
            }
            u.prototype.writeDoubleLE = function(o, c, h) {
                return Ne(this, o, c, !0, h);
            }, u.prototype.writeDoubleBE = function(o, c, h) {
                return Ne(this, o, c, !1, h);
            }, u.prototype.copy = function(o, c, h, _) {
                if (!u.isBuffer(o)) throw new TypeError("argument should be a Buffer");
                if (h || (h = 0), !_ && _ !== 0 && (_ = this.length), c >= o.length && (c = o.length), c || (c = 0), _ > 0 && _ < h && (_ = h), _ === h || o.length === 0 || this.length === 0) return 0;
                if (c < 0) throw new RangeError("targetStart out of bounds");
                if (h < 0 || h >= this.length) throw new RangeError("Index out of range");
                if (_ < 0) throw new RangeError("sourceEnd out of bounds");
                _ > this.length && (_ = this.length), o.length - c < _ - h && (_ = o.length - c + h);
                const S = _ - h;
                return this === o && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(c, h, _) : Uint8Array.prototype.set.call(o, this.subarray(h, _), c), S;
            }, u.prototype.fill = function(o, c, h, _) {
                if (typeof o == "string") {
                    if (typeof c == "string" ? (_ = c, c = 0, h = this.length) : typeof h == "string" && (_ = h, h = this.length), _ !== void 0 && typeof _ != "string") throw new TypeError("encoding must be a string");
                    if (typeof _ == "string" && !u.isEncoding(_)) throw new TypeError("Unknown encoding: " + _);
                    if (o.length === 1) {
                        const A = o.charCodeAt(0);
                        (_ === "utf8" && A < 128 || _ === "latin1") && (o = A);
                    }
                } else typeof o == "number" ? o = o & 255 : typeof o == "boolean" && (o = Number(o));
                if (c < 0 || this.length < c || this.length < h) throw new RangeError("Out of range index");
                if (h <= c) return this;
                c = c >>> 0, h = h === void 0 ? this.length : h >>> 0, o || (o = 0);
                let S;
                if (typeof o == "number") for(S = c; S < h; ++S)this[S] = o;
                else {
                    const A = u.isBuffer(o) ? o : u.from(o, _), q = A.length;
                    if (q === 0) throw new TypeError('The value "' + o + '" is invalid for argument "value"');
                    for(S = 0; S < h - c; ++S)this[S + c] = A[S % q];
                }
                return this;
            };
            const $t = {};
            function ze(f, o, c) {
                $t[f] = class extends c {
                    constructor(){
                        super(), Object.defineProperty(this, "message", {
                            value: o.apply(this, arguments),
                            writable: !0,
                            configurable: !0
                        }), this.name = `${this.name} [${f}]`, this.stack, delete this.name;
                    }
                    get code() {
                        return f;
                    }
                    set code(_) {
                        Object.defineProperty(this, "code", {
                            configurable: !0,
                            enumerable: !0,
                            value: _,
                            writable: !0
                        });
                    }
                    toString() {
                        return `${this.name} [${f}]: ${this.message}`;
                    }
                };
            }
            ze("ERR_BUFFER_OUT_OF_BOUNDS", function(f) {
                return f ? `${f} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
            }, RangeError), ze("ERR_INVALID_ARG_TYPE", function(f, o) {
                return `The "${f}" argument must be of type number. Received type ${typeof o}`;
            }, TypeError), ze("ERR_OUT_OF_RANGE", function(f, o, c) {
                let h = `The value of "${f}" is out of range.`, _ = c;
                return Number.isInteger(c) && Math.abs(c) > 2 ** 32 ? _ = De(String(c)) : typeof c == "bigint" && (_ = String(c), (c > BigInt(2) ** BigInt(32) || c < -(BigInt(2) ** BigInt(32))) && (_ = De(_)), _ += "n"), h += ` It must be ${o}. Received ${_}`, h;
            }, RangeError);
            function De(f) {
                let o = "", c = f.length;
                const h = f[0] === "-" ? 1 : 0;
                for(; c >= h + 4; c -= 3)o = `_${f.slice(c - 3, c)}${o}`;
                return `${f.slice(0, c)}${o}`;
            }
            function ur(f, o, c) {
                ge(o, "offset"), (f[o] === void 0 || f[o + c] === void 0) && Ze(o, f.length - (c + 1));
            }
            function Oe(f, o, c, h, _, S) {
                if (f > c || f < o) {
                    const A = typeof o == "bigint" ? "n" : "";
                    let q;
                    throw o === 0 || o === BigInt(0) ? q = `>= 0${A} and < 2${A} ** ${(S + 1) * 8}${A}` : q = `>= -(2${A} ** ${(S + 1) * 8 - 1}${A}) and < 2 ** ${(S + 1) * 8 - 1}${A}`, new $t.ERR_OUT_OF_RANGE("value", q, f);
                }
                ur(h, _, S);
            }
            function ge(f, o) {
                if (typeof f != "number") throw new $t.ERR_INVALID_ARG_TYPE(o, "number", f);
            }
            function Ze(f, o, c) {
                throw Math.floor(f) !== f ? (ge(f, c), new $t.ERR_OUT_OF_RANGE("offset", "an integer", f)) : o < 0 ? new $t.ERR_BUFFER_OUT_OF_BOUNDS : new $t.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${o}`, f);
            }
            const ws = /[^+/0-9A-Za-z-_]/g;
            function gs(f) {
                if (f = f.split("=")[0], f = f.trim().replace(ws, ""), f.length < 2) return "";
                for(; f.length % 4 !== 0;)f = f + "=";
                return f;
            }
            function Hr(f, o) {
                o = o || 1 / 0;
                let c;
                const h = f.length;
                let _ = null;
                const S = [];
                for(let A = 0; A < h; ++A){
                    if (c = f.charCodeAt(A), c > 55295 && c < 57344) {
                        if (!_) {
                            if (c > 56319) {
                                (o -= 3) > -1 && S.push(239, 191, 189);
                                continue;
                            } else if (A + 1 === h) {
                                (o -= 3) > -1 && S.push(239, 191, 189);
                                continue;
                            }
                            _ = c;
                            continue;
                        }
                        if (c < 56320) {
                            (o -= 3) > -1 && S.push(239, 191, 189), _ = c;
                            continue;
                        }
                        c = (_ - 55296 << 10 | c - 56320) + 65536;
                    } else _ && (o -= 3) > -1 && S.push(239, 191, 189);
                    if (_ = null, c < 128) {
                        if ((o -= 1) < 0) break;
                        S.push(c);
                    } else if (c < 2048) {
                        if ((o -= 2) < 0) break;
                        S.push(c >> 6 | 192, c & 63 | 128);
                    } else if (c < 65536) {
                        if ((o -= 3) < 0) break;
                        S.push(c >> 12 | 224, c >> 6 & 63 | 128, c & 63 | 128);
                    } else if (c < 1114112) {
                        if ((o -= 4) < 0) break;
                        S.push(c >> 18 | 240, c >> 12 & 63 | 128, c >> 6 & 63 | 128, c & 63 | 128);
                    } else throw new Error("Invalid code point");
                }
                return S;
            }
            function ys(f) {
                const o = [];
                for(let c = 0; c < f.length; ++c)o.push(f.charCodeAt(c) & 255);
                return o;
            }
            function bs(f, o) {
                let c, h, _;
                const S = [];
                for(let A = 0; A < f.length && !((o -= 2) < 0); ++A)c = f.charCodeAt(A), h = c >> 8, _ = c % 256, S.push(_), S.push(h);
                return S;
            }
            function Hn(f) {
                return n.toByteArray(gs(f));
            }
            function fr(f, o, c, h) {
                let _;
                for(_ = 0; _ < h && !(_ + c >= o.length || _ >= f.length); ++_)o[_ + c] = f[_];
                return _;
            }
            function Zt(f, o) {
                return f instanceof o || f != null && f.constructor != null && f.constructor.name != null && f.constructor.name === o.name;
            }
            function Wr(f) {
                return f !== f;
            }
            const Es = function() {
                const f = "0123456789abcdef", o = new Array(256);
                for(let c = 0; c < 16; ++c){
                    const h = c * 16;
                    for(let _ = 0; _ < 16; ++_)o[h + _] = f[c] + f[_];
                }
                return o;
            }();
            function qt(f) {
                return typeof BigInt > "u" ? ks : f;
            }
            function ks() {
                throw new Error("BigInt not supported");
            }
        },
        526: (t, r)=>{
            r.byteLength = u, r.toByteArray = b, r.fromByteArray = v;
            for(var e = [], n = [], i = typeof Uint8Array < "u" ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, l = a.length; s < l; ++s)e[s] = a[s], n[a.charCodeAt(s)] = s;
            n[45] = 62, n[95] = 63;
            function p(I) {
                var T = I.length;
                if (T % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var C = I.indexOf("=");
                C === -1 && (C = T);
                var M = C === T ? 0 : 4 - C % 4;
                return [
                    C,
                    M
                ];
            }
            function u(I) {
                var T = p(I), C = T[0], M = T[1];
                return (C + M) * 3 / 4 - M;
            }
            function d(I, T, C) {
                return (T + C) * 3 / 4 - C;
            }
            function b(I) {
                var T, C = p(I), M = C[0], D = C[1], B = new i(d(I, M, D)), F = 0, G = D > 0 ? M - 4 : M, O;
                for(O = 0; O < G; O += 4)T = n[I.charCodeAt(O)] << 18 | n[I.charCodeAt(O + 1)] << 12 | n[I.charCodeAt(O + 2)] << 6 | n[I.charCodeAt(O + 3)], B[F++] = T >> 16 & 255, B[F++] = T >> 8 & 255, B[F++] = T & 255;
                return D === 2 && (T = n[I.charCodeAt(O)] << 2 | n[I.charCodeAt(O + 1)] >> 4, B[F++] = T & 255), D === 1 && (T = n[I.charCodeAt(O)] << 10 | n[I.charCodeAt(O + 1)] << 4 | n[I.charCodeAt(O + 2)] >> 2, B[F++] = T >> 8 & 255, B[F++] = T & 255), B;
            }
            function g(I) {
                return e[I >> 18 & 63] + e[I >> 12 & 63] + e[I >> 6 & 63] + e[I & 63];
            }
            function y(I, T, C) {
                for(var M, D = [], B = T; B < C; B += 3)M = (I[B] << 16 & 16711680) + (I[B + 1] << 8 & 65280) + (I[B + 2] & 255), D.push(g(M));
                return D.join("");
            }
            function v(I) {
                for(var T, C = I.length, M = C % 3, D = [], B = 16383, F = 0, G = C - M; F < G; F += B)D.push(y(I, F, F + B > G ? G : F + B));
                return M === 1 ? (T = I[C - 1], D.push(e[T >> 2] + e[T << 4 & 63] + "==")) : M === 2 && (T = (I[C - 2] << 8) + I[C - 1], D.push(e[T >> 10] + e[T >> 4 & 63] + e[T << 2 & 63] + "=")), D.join("");
            }
        },
        733: ()=>{},
        736: (t, r, e)=>{
            function n(i) {
                s.debug = s, s.default = s, s.coerce = g, s.disable = u, s.enable = p, s.enabled = d, s.humanize = e(0), s.destroy = y, Object.keys(i).forEach((v)=>{
                    s[v] = i[v];
                }), s.names = [], s.skips = [], s.formatters = {};
                function a(v) {
                    let I = 0;
                    for(let T = 0; T < v.length; T++)I = (I << 5) - I + v.charCodeAt(T), I |= 0;
                    return s.colors[Math.abs(I) % s.colors.length];
                }
                s.selectColor = a;
                function s(v) {
                    let I, T = null, C, M;
                    function D(...B) {
                        if (!D.enabled) return;
                        const F = D, G = Number(new Date), O = G - (I || G);
                        F.diff = O, F.prev = I, F.curr = G, I = G, B[0] = s.coerce(B[0]), typeof B[0] != "string" && B.unshift("%O");
                        let K = 0;
                        B[0] = B[0].replace(/%([a-zA-Z%])/g, (P, H)=>{
                            if (P === "%%") return "%";
                            K++;
                            const _t = s.formatters[H];
                            if (typeof _t == "function") {
                                const E = B[K];
                                P = _t.call(F, E), B.splice(K, 1), K--;
                            }
                            return P;
                        }), s.formatArgs.call(F, B), (F.log || s.log).apply(F, B);
                    }
                    return D.namespace = v, D.useColors = s.useColors(), D.color = s.selectColor(v), D.extend = l, D.destroy = s.destroy, Object.defineProperty(D, "enabled", {
                        enumerable: !0,
                        configurable: !1,
                        get: ()=>T !== null ? T : (C !== s.namespaces && (C = s.namespaces, M = s.enabled(v)), M),
                        set: (B)=>{
                            T = B;
                        }
                    }), typeof s.init == "function" && s.init(D), D;
                }
                function l(v, I) {
                    const T = s(this.namespace + (typeof I > "u" ? ":" : I) + v);
                    return T.log = this.log, T;
                }
                function p(v) {
                    s.save(v), s.namespaces = v, s.names = [], s.skips = [];
                    let I;
                    const T = (typeof v == "string" ? v : "").split(/[\s,]+/), C = T.length;
                    for(I = 0; I < C; I++)T[I] && (v = T[I].replace(/\*/g, ".*?"), v[0] === "-" ? s.skips.push(new RegExp("^" + v.slice(1) + "$")) : s.names.push(new RegExp("^" + v + "$")));
                }
                function u() {
                    const v = [
                        ...s.names.map(b),
                        ...s.skips.map(b).map((I)=>"-" + I)
                    ].join(",");
                    return s.enable(""), v;
                }
                function d(v) {
                    if (v[v.length - 1] === "*") return !0;
                    let I, T;
                    for(I = 0, T = s.skips.length; I < T; I++)if (s.skips[I].test(v)) return !1;
                    for(I = 0, T = s.names.length; I < T; I++)if (s.names[I].test(v)) return !0;
                    return !1;
                }
                function b(v) {
                    return v.toString().substring(2, v.toString().length - 2).replace(/\.\*\?$/, "*");
                }
                function g(v) {
                    return v instanceof Error ? v.stack || v.message : v;
                }
                function y() {
                    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
                }
                return s.enable(s.load()), s;
            }
            t.exports = n;
        },
        833: (t, r, e)=>{
            var n = e(19);
            r.formatArgs = a, r.save = s, r.load = l, r.useColors = i, r.storage = p(), r.destroy = (()=>{
                let d = !1;
                return ()=>{
                    d || (d = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
                };
            })(), r.colors = [
                "#0000CC",
                "#0000FF",
                "#0033CC",
                "#0033FF",
                "#0066CC",
                "#0066FF",
                "#0099CC",
                "#0099FF",
                "#00CC00",
                "#00CC33",
                "#00CC66",
                "#00CC99",
                "#00CCCC",
                "#00CCFF",
                "#3300CC",
                "#3300FF",
                "#3333CC",
                "#3333FF",
                "#3366CC",
                "#3366FF",
                "#3399CC",
                "#3399FF",
                "#33CC00",
                "#33CC33",
                "#33CC66",
                "#33CC99",
                "#33CCCC",
                "#33CCFF",
                "#6600CC",
                "#6600FF",
                "#6633CC",
                "#6633FF",
                "#66CC00",
                "#66CC33",
                "#9900CC",
                "#9900FF",
                "#9933CC",
                "#9933FF",
                "#99CC00",
                "#99CC33",
                "#CC0000",
                "#CC0033",
                "#CC0066",
                "#CC0099",
                "#CC00CC",
                "#CC00FF",
                "#CC3300",
                "#CC3333",
                "#CC3366",
                "#CC3399",
                "#CC33CC",
                "#CC33FF",
                "#CC6600",
                "#CC6633",
                "#CC9900",
                "#CC9933",
                "#CCCC00",
                "#CCCC33",
                "#FF0000",
                "#FF0033",
                "#FF0066",
                "#FF0099",
                "#FF00CC",
                "#FF00FF",
                "#FF3300",
                "#FF3333",
                "#FF3366",
                "#FF3399",
                "#FF33CC",
                "#FF33FF",
                "#FF6600",
                "#FF6633",
                "#FF9900",
                "#FF9933",
                "#FFCC00",
                "#FFCC33"
            ];
            function i() {
                return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
            }
            function a(d) {
                if (d[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + d[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors) return;
                const b = "color: " + this.color;
                d.splice(1, 0, b, "color: inherit");
                let g = 0, y = 0;
                d[0].replace(/%[a-zA-Z%]/g, (v)=>{
                    v !== "%%" && (g++, v === "%c" && (y = g));
                }), d.splice(y, 0, b);
            }
            r.log = console.debug || console.log || (()=>{});
            function s(d) {
                try {
                    d ? r.storage.setItem("debug", d) : r.storage.removeItem("debug");
                } catch  {}
            }
            function l() {
                let d;
                try {
                    d = r.storage.getItem("debug");
                } catch  {}
                return !d && typeof n < "u" && "env" in n && (d = n.env.DEBUG), d;
            }
            function p() {
                try {
                    return localStorage;
                } catch  {}
            }
            t.exports = e(736)(r);
            const { formatters: u } = t.exports;
            u.j = function(d) {
                try {
                    return JSON.stringify(d);
                } catch (b) {
                    return "[UnexpectedJSONParseError]: " + b.message;
                }
            };
        }
    }, Vn = {};
    function dt(t) {
        var r = Vn[t];
        if (r !== void 0) return r.exports;
        var e = Vn[t] = {
            exports: {}
        };
        return Ss[t](e, e.exports, dt), e.exports;
    }
    dt.n = (t)=>{
        var r = t && t.__esModule ? ()=>t.default : ()=>t;
        return dt.d(r, {
            a: r
        }), r;
    };
    (()=>{
        var t = Object.getPrototypeOf ? (e)=>Object.getPrototypeOf(e) : (e)=>e.__proto__, r;
        dt.t = function(e, n) {
            if (n & 1 && (e = this(e)), n & 8 || typeof e == "object" && e && (n & 4 && e.__esModule || n & 16 && typeof e.then == "function")) return e;
            var i = Object.create(null);
            dt.r(i);
            var a = {};
            r = r || [
                null,
                t({}),
                t([]),
                t(t)
            ];
            for(var s = n & 2 && e; typeof s == "object" && !~r.indexOf(s); s = t(s))Object.getOwnPropertyNames(s).forEach((l)=>a[l] = ()=>e[l]);
            return a.default = ()=>e, dt.d(i, a), i;
        };
    })();
    dt.d = (t, r)=>{
        for(var e in r)dt.o(r, e) && !dt.o(t, e) && Object.defineProperty(t, e, {
            enumerable: !0,
            get: r[e]
        });
    };
    dt.o = (t, r)=>Object.prototype.hasOwnProperty.call(t, r);
    dt.r = (t)=>{
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        });
    };
    function* Bs() {
        const t = [
            1,
            1,
            1,
            2,
            4,
            8,
            16,
            32,
            64
        ];
        let r = 0;
        for(;;)yield t[Math.min(r++, t.length - 1)];
    }
    function* $n(t) {
        for (const r of t)yield r;
    }
    async function Yn(t, r = Bs()) {
        for(;;)try {
            return await t();
        } catch (e) {
            const n = r.next().value;
            if (n === void 0) throw e;
            await new Promise((i)=>setTimeout(i, n * 1e3));
            continue;
        }
    }
    class Is {
        constructor(r){
            this.numPoints = r;
        }
        async init() {
            await this.downloadG1Data(), await this.downloadG2Data();
        }
        async streamG1Data() {
            return (await this.fetchG1Data()).body;
        }
        async streamG2Data() {
            return (await this.fetchG2Data()).body;
        }
        async downloadG1Data() {
            const r = await this.fetchG1Data();
            return this.data = new Uint8Array(await r.arrayBuffer());
        }
        async downloadG2Data() {
            const r = await this.fetchG2Data();
            return this.g2Data = new Uint8Array(await r.arrayBuffer());
        }
        getG1Data() {
            return this.data;
        }
        getG2Data() {
            return this.g2Data;
        }
        async fetchG1Data() {
            if (this.numPoints === 0) return new Response(new Uint8Array([]));
            const r = this.numPoints * 64 - 1;
            return await Yn(()=>fetch("https://crs.aztec.network/g1.dat", {
                    headers: {
                        Range: `bytes=0-${r}`
                    },
                    cache: "force-cache"
                }), $n([
                5,
                5,
                5
            ]));
        }
        async fetchG2Data() {
            return await Yn(()=>fetch("https://crs.aztec.network/g2.dat", {
                    cache: "force-cache"
                }), $n([
                5,
                5,
                5
            ]));
        }
    }
    class vs {
        constructor(r){
            this.numPoints = r;
        }
        async init() {
            await this.downloadG1Data();
        }
        async downloadG1Data() {
            const r = await this.fetchG1Data();
            return this.data = new Uint8Array(await r.arrayBuffer());
        }
        async streamG1Data() {
            return (await this.fetchG1Data()).body;
        }
        getG1Data() {
            return this.data;
        }
        async fetchG1Data() {
            if (this.numPoints === 0) return new Response(new Uint8Array([]));
            const r = this.numPoints * 64 - 1;
            return await fetch("https://crs.aztec.network/grumpkin_g1.dat", {
                headers: {
                    Range: `bytes=0-${r}`
                },
                cache: "force-cache"
            });
        }
    }
    function Tn(t) {
        return new Promise((r, e)=>{
            t.oncomplete = t.onsuccess = ()=>r(t.result), t.onabort = t.onerror = ()=>e(t.error);
        });
    }
    function As(t, r) {
        const e = indexedDB.open(t);
        e.onupgradeneeded = ()=>e.result.createObjectStore(r);
        const n = Tn(e);
        return (i, a)=>n.then((s)=>a(s.transaction(r, i).objectStore(r)));
    }
    let Vr;
    function qi() {
        return Vr || (Vr = As("keyval-store", "keyval")), Vr;
    }
    function fn(t, r = qi()) {
        return r("readonly", (e)=>Tn(e.get(t)));
    }
    function hn(t, r, e = qi()) {
        return e("readwrite", (n)=>(n.put(r, t), Tn(n.transaction)));
    }
    Ir = class {
        constructor(r){
            this.numPoints = r;
        }
        static async new(r) {
            const e = new Ir(r);
            return await e.init(), e;
        }
        async init() {
            const r = await fn("g1Data"), e = await fn("g2Data"), n = new Is(this.numPoints), i = this.numPoints * 64;
            !r || r.length < i ? (this.g1Data = await n.downloadG1Data(), await hn("g1Data", this.g1Data)) : this.g1Data = r, e ? this.g2Data = e : (this.g2Data = await n.downloadG2Data(), await hn("g2Data", this.g2Data));
        }
        getG1Data() {
            return this.g1Data;
        }
        getG2Data() {
            return this.g2Data;
        }
    };
    xn = class {
        constructor(r){
            this.numPoints = r;
        }
        static async new(r) {
            const e = new xn(r);
            return await e.init(), e;
        }
        async init() {
            const r = await fn("grumpkinG1Data"), e = new vs(this.numPoints), n = this.numPoints * 64;
            !r || r.length < n ? (this.g1Data = await e.downloadG1Data(), await hn("grumpkinG1Data", this.g1Data)) : this.g1Data = r;
        }
        getG1Data() {
            return this.g1Data;
        }
    };
    const Ji = Symbol("Comlink.proxy"), Ts = Symbol("Comlink.endpoint"), xs = Symbol("Comlink.releaseProxy"), $r = Symbol("Comlink.finalizer"), Er = Symbol("Comlink.thrown"), Qi = (t)=>typeof t == "object" && t !== null || typeof t == "function", Us = {
        canHandle: (t)=>Qi(t) && t[Ji],
        serialize (t) {
            const { port1: r, port2: e } = new MessageChannel;
            return ea(t, r), [
                e,
                [
                    e
                ]
            ];
        },
        deserialize (t) {
            return t.start(), na(t);
        }
    }, Cs = {
        canHandle: (t)=>Qi(t) && Er in t,
        serialize ({ value: t }) {
            let r;
            return t instanceof Error ? r = {
                isError: !0,
                value: {
                    message: t.message,
                    name: t.name,
                    stack: t.stack
                }
            } : r = {
                isError: !1,
                value: t
            }, [
                r,
                []
            ];
        },
        deserialize (t) {
            throw t.isError ? Object.assign(new Error(t.value.message), t.value) : t.value;
        }
    }, ta = new Map([
        [
            "proxy",
            Us
        ],
        [
            "throw",
            Cs
        ]
    ]);
    function Rs(t, r) {
        for (const e of t)if (r === e || e === "*" || e instanceof RegExp && e.test(r)) return !0;
        return !1;
    }
    function ea(t, r = globalThis, e = [
        "*"
    ]) {
        r.addEventListener("message", function n(i) {
            if (!i || !i.data) return;
            if (!Rs(e, i.origin)) {
                console.warn(`Invalid origin '${i.origin}' for comlink proxy`);
                return;
            }
            const { id: a, type: s, path: l } = Object.assign({
                path: []
            }, i.data), p = (i.data.argumentList || []).map(le);
            let u;
            try {
                const d = l.slice(0, -1).reduce((g, y)=>g[y], t), b = l.reduce((g, y)=>g[y], t);
                switch(s){
                    case "GET":
                        u = b;
                        break;
                    case "SET":
                        d[l.slice(-1)[0]] = le(i.data.value), u = !0;
                        break;
                    case "APPLY":
                        u = b.apply(d, p);
                        break;
                    case "CONSTRUCT":
                        {
                            const g = new b(...p);
                            u = sa(g);
                        }
                        break;
                    case "ENDPOINT":
                        {
                            const { port1: g, port2: y } = new MessageChannel;
                            ea(t, y), u = Zs(g, [
                                g
                            ]);
                        }
                        break;
                    case "RELEASE":
                        u = void 0;
                        break;
                    default:
                        return;
                }
            } catch (d) {
                u = {
                    value: d,
                    [Er]: 0
                };
            }
            Promise.resolve(u).catch((d)=>({
                    value: d,
                    [Er]: 0
                })).then((d)=>{
                const [b, g] = Tr(d);
                r.postMessage(Object.assign(Object.assign({}, b), {
                    id: a
                }), g), s === "RELEASE" && (r.removeEventListener("message", n), ra(r), $r in t && typeof t[$r] == "function" && t[$r]());
            }).catch((d)=>{
                const [b, g] = Tr({
                    value: new TypeError("Unserializable return value"),
                    [Er]: 0
                });
                r.postMessage(Object.assign(Object.assign({}, b), {
                    id: a
                }), g);
            });
        }), r.start && r.start();
    }
    function Ns(t) {
        return t.constructor.name === "MessagePort";
    }
    function ra(t) {
        Ns(t) && t.close();
    }
    function na(t, r) {
        return pn(t, [], r);
    }
    function hr(t) {
        if (t) throw new Error("Proxy has been released and is not useable");
    }
    function ia(t) {
        return ke(t, {
            type: "RELEASE"
        }).then(()=>{
            ra(t);
        });
    }
    const vr = new WeakMap, Ar = "FinalizationRegistry" in globalThis && new FinalizationRegistry((t)=>{
        const r = (vr.get(t) || 0) - 1;
        vr.set(t, r), r === 0 && ia(t);
    });
    function zs(t, r) {
        const e = (vr.get(r) || 0) + 1;
        vr.set(r, e), Ar && Ar.register(t, r, t);
    }
    function Ds(t) {
        Ar && Ar.unregister(t);
    }
    function pn(t, r = [], e = function() {}) {
        let n = !1;
        const i = new Proxy(e, {
            get (a, s) {
                if (hr(n), s === xs) return ()=>{
                    Ds(i), ia(t), n = !0;
                };
                if (s === "then") {
                    if (r.length === 0) return {
                        then: ()=>i
                    };
                    const l = ke(t, {
                        type: "GET",
                        path: r.map((p)=>p.toString())
                    }).then(le);
                    return l.then.bind(l);
                }
                return pn(t, [
                    ...r,
                    s
                ]);
            },
            set (a, s, l) {
                hr(n);
                const [p, u] = Tr(l);
                return ke(t, {
                    type: "SET",
                    path: [
                        ...r,
                        s
                    ].map((d)=>d.toString()),
                    value: p
                }, u).then(le);
            },
            apply (a, s, l) {
                hr(n);
                const p = r[r.length - 1];
                if (p === Ts) return ke(t, {
                    type: "ENDPOINT"
                }).then(le);
                if (p === "bind") return pn(t, r.slice(0, -1));
                const [u, d] = Gn(l);
                return ke(t, {
                    type: "APPLY",
                    path: r.map((b)=>b.toString()),
                    argumentList: u
                }, d).then(le);
            },
            construct (a, s) {
                hr(n);
                const [l, p] = Gn(s);
                return ke(t, {
                    type: "CONSTRUCT",
                    path: r.map((u)=>u.toString()),
                    argumentList: l
                }, p).then(le);
            }
        });
        return zs(i, t), i;
    }
    function Os(t) {
        return Array.prototype.concat.apply([], t);
    }
    function Gn(t) {
        const r = t.map(Tr);
        return [
            r.map((e)=>e[0]),
            Os(r.map((e)=>e[1]))
        ];
    }
    const aa = new WeakMap;
    function Zs(t, r) {
        return aa.set(t, r), t;
    }
    function sa(t) {
        return Object.assign(t, {
            [Ji]: !0
        });
    }
    function Tr(t) {
        for (const [r, e] of ta)if (e.canHandle(t)) {
            const [n, i] = e.serialize(t);
            return [
                {
                    type: "HANDLER",
                    name: r,
                    value: n
                },
                i
            ];
        }
        return [
            {
                type: "RAW",
                value: t
            },
            aa.get(t) || []
        ];
    }
    function le(t) {
        switch(t.type){
            case "HANDLER":
                return ta.get(t.name).deserialize(t.value);
            case "RAW":
                return t.value;
        }
    }
    function ke(t, r, e) {
        return new Promise((n)=>{
            const i = Ls();
            t.addEventListener("message", function a(s) {
                !s.data || !s.data.id || s.data.id !== i || (t.removeEventListener("message", a), n(s.data));
            }), t.start && t.start(), t.postMessage(Object.assign({
                id: i
            }, r), e);
        });
    }
    function Ls() {
        return new Array(4).fill(0).map(()=>Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
    }
    jt = class extends Uint8Array {
    };
    function Ms(t) {
        const r = new Uint8Array(1);
        return r[0] = t ? 1 : 0, r;
    }
    function oa(t, r = 4) {
        const e = new Uint8Array(r);
        return new DataView(e.buffer).setUint32(e.byteLength - 4, t, !1), e;
    }
    function Fs(t, r = 4) {
        const e = new Uint8Array(r);
        return new DataView(e.buffer).setInt32(e.byteLength - 4, t, !1), e;
    }
    function la(t) {
        const r = t.reduce((i, a)=>i + a.length, 0), e = new Uint8Array(r);
        let n = 0;
        for (const i of t)e.set(i, n), n += i.length;
        return e;
    }
    function Ps(t) {
        return t.reduce((r, e)=>r + e.toString(16).padStart(2, "0"), "");
    }
    function Kn(t) {
        return la([
            Fs(t.length),
            t
        ]);
    }
    function Hs(t, r = 32) {
        const e = new Uint8Array(r);
        for(let n = 0; n < r; n++)e[r - n - 1] = Number(t >> BigInt(n * 8) & 0xffn);
        return e;
    }
    function Ws(t) {
        return la([
            oa(t.length),
            ...t.flat()
        ]);
    }
    function R(t) {
        return Array.isArray(t) ? Ws(t.map(R)) : t instanceof jt ? t : t instanceof Uint8Array ? Kn(t) : typeof t == "boolean" ? Ms(t) : typeof t == "number" ? oa(t) : typeof t == "bigint" ? Hs(t) : typeof t == "string" ? Kn(new TextEncoder().encode(t)) : t.toBuffer();
    }
    class vt {
        constructor(r, e = 0){
            this.buffer = r, this.index = e;
        }
        static asReader(r) {
            return r instanceof vt ? r : new vt(r);
        }
        readNumber() {
            const r = new DataView(this.buffer.buffer, this.buffer.byteOffset + this.index, 4);
            return this.index += 4, r.getUint32(0, !1);
        }
        readBoolean() {
            return this.index += 1, !!this.buffer.at(this.index - 1);
        }
        readBytes(r) {
            return this.index += r, this.buffer.slice(this.index - r, this.index);
        }
        readNumberVector() {
            return this.readVector({
                fromBuffer: (r)=>r.readNumber()
            });
        }
        readVector(r) {
            const e = this.readNumber(), n = new Array(e);
            for(let i = 0; i < e; i++)n[i] = r.fromBuffer(this);
            return n;
        }
        readArray(r, e) {
            const n = new Array(r);
            for(let i = 0; i < r; i++)n[i] = e.fromBuffer(this);
            return n;
        }
        readObject(r) {
            return r.fromBuffer(this);
        }
        peekBytes(r) {
            return this.buffer.subarray(this.index, r ? this.index + r : void 0);
        }
        readString() {
            return new TextDecoder().decode(this.readBuffer());
        }
        readBuffer() {
            const r = this.readNumber();
            return this.readBytes(r);
        }
        readMap(r) {
            const e = this.readNumber(), n = {};
            for(let i = 0; i < e; i++){
                const a = this.readString(), s = this.readObject(r);
                n[a] = s;
            }
            return n;
        }
    }
    function Bt() {
        return {
            SIZE_IN_BYTES: 1,
            fromBuffer: (t)=>vt.asReader(t).readBoolean()
        };
    }
    function Se() {
        return {
            SIZE_IN_BYTES: 4,
            fromBuffer: (t)=>vt.asReader(t).readNumber()
        };
    }
    function Nt(t) {
        return {
            fromBuffer: (r)=>vt.asReader(r).readVector(t)
        };
    }
    function nt() {
        return {
            fromBuffer: (t)=>vt.asReader(t).readBuffer()
        };
    }
    function xr() {
        return {
            fromBuffer: (t)=>vt.asReader(t).readString()
        };
    }
    const Nr = (t)=>{
        const e = (()=>{
            if (typeof window < "u" && window.crypto) return window.crypto;
            if (typeof globalThis < "u" && globalThis.crypto) return globalThis.crypto;
        })();
        if (!e) throw new Error("randomBytes UnsupportedEnvironment");
        const n = new Uint8Array(t), i = 65536;
        if (t > i) for(let a = 0; a < t; a += i)e.getRandomValues(n.subarray(a, a + i));
        else e.getRandomValues(n);
        return n;
    };
    var ca = dt(287).hp;
    function ua(t) {
        return (t.readBigUInt64BE(0) << 192n) + (t.readBigUInt64BE(8) << 128n) + (t.readBigUInt64BE(16) << 64n) + t.readBigUInt64BE(24);
    }
    function Be(t) {
        const r = ca.from(t);
        return ua(r);
    }
    function fa(t, r = 32) {
        if (r != 32) throw new Error(`Only 32 bytes supported for conversion from bigint to buffer, attempted byte length: ${r}`);
        const e = ca.alloc(r);
        return e.writeBigUInt64BE(t >> 192n, 0), e.writeBigUInt64BE(t >> 128n & 0xffffffffffffffffn, 8), e.writeBigUInt64BE(t >> 64n & 0xffffffffffffffffn, 16), e.writeBigUInt64BE(t & 0xffffffffffffffffn, 24), e;
    }
    function Vs(t, r = 32) {
        return new Uint8Array(fa(t, r));
    }
    var kr = dt(287).hp, Ie, He;
    j = class {
        constructor(r){
            const e = typeof r == "bigint" ? r : r instanceof kr ? ua(r) : Be(r);
            if (e > Ie.MAX_VALUE) throw new Error(`Value 0x${e.toString(16)} is greater or equal to field modulus.`);
            this.value = typeof r == "bigint" ? Vs(r) : r instanceof kr ? new Uint8Array(r) : r;
        }
        static random() {
            const r = Be(Nr(64)) % Ie.MODULUS;
            return new this(r);
        }
        static fromBuffer(r) {
            const e = vt.asReader(r);
            return new this(e.readBytes(this.SIZE_IN_BYTES));
        }
        static fromBufferReduce(r) {
            const e = vt.asReader(r);
            return new this(Be(e.readBytes(this.SIZE_IN_BYTES)) % Ie.MODULUS);
        }
        static fromString(r) {
            return this.fromBuffer(kr.from(r.replace(/^0x/i, ""), "hex"));
        }
        toBuffer() {
            return this.value;
        }
        toString() {
            return "0x" + Ps(this.toBuffer());
        }
        equals(r) {
            return this.value.every((e, n)=>e === r.value[n]);
        }
        isZero() {
            return this.value.every((r)=>r === 0);
        }
    };
    Ie = j;
    j.ZERO = new Ie(0n);
    j.MODULUS = 0x30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001n;
    j.MAX_VALUE = Ie.MODULUS - 1n;
    j.SIZE_IN_BYTES = 32;
    class zr {
        constructor(r){
            if (this.value = r, r > He.MAX_VALUE) throw new Error(`Fq out of range ${r}.`);
        }
        static random() {
            const r = Be(Nr(64)) % He.MODULUS;
            return new this(r);
        }
        static fromBuffer(r) {
            const e = vt.asReader(r);
            return new this(Be(e.readBytes(this.SIZE_IN_BYTES)));
        }
        static fromBufferReduce(r) {
            const e = vt.asReader(r);
            return new this(Be(e.readBytes(this.SIZE_IN_BYTES)) % j.MODULUS);
        }
        static fromString(r) {
            return this.fromBuffer(kr.from(r.replace(/^0x/i, ""), "hex"));
        }
        toBuffer() {
            return fa(this.value, He.SIZE_IN_BYTES);
        }
        toString() {
            return "0x" + this.value.toString(16);
        }
        equals(r) {
            return this.value === r.value;
        }
        isZero() {
            return this.value === 0n;
        }
    }
    He = zr;
    zr.MODULUS = 0x30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47n;
    zr.MAX_VALUE = He.MODULUS - 1n;
    zr.SIZE_IN_BYTES = 32;
    var jn = dt(287).hp;
    class se {
        constructor(r, e){
            this.x = r, this.y = e;
        }
        static random() {
            return new se(j.random(), j.random());
        }
        static fromBuffer(r) {
            const e = vt.asReader(r);
            return new this(j.fromBuffer(e), j.fromBuffer(e));
        }
        static fromString(r) {
            return se.fromBuffer(jn.from(r.replace(/^0x/i, ""), "hex"));
        }
        toBuffer() {
            return jn.concat([
                this.x.toBuffer(),
                this.y.toBuffer()
            ]);
        }
        toString() {
            return "0x" + this.toBuffer().toString("hex");
        }
        equals(r) {
            return this.x.equals(r.x) && this.y.equals(r.y);
        }
    }
    se.SIZE_IN_BYTES = 64;
    se.EMPTY = new se(j.ZERO, j.ZERO);
    class Ae {
        constructor(r){
            this.buffer = r;
        }
        static fromBuffer(r) {
            const e = vt.asReader(r);
            return new Ae(e.readBytes(this.SIZE_IN_BYTES));
        }
        static random() {
            return new Ae(Nr(this.SIZE_IN_BYTES));
        }
        toBuffer() {
            return this.buffer;
        }
    }
    Ae.SIZE_IN_BYTES = 32;
    class $s {
        constructor(r){
            this.wasm = r;
        }
        async pedersenCommit(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                se
            ];
            return (await this.wasm.callWasmExport("pedersen_commit", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async pedersenHash(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                j
            ];
            return (await this.wasm.callWasmExport("pedersen_hash", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async pedersenHashes(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                j
            ];
            return (await this.wasm.callWasmExport("pedersen_hashes", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async pedersenHashBuffer(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                j
            ];
            return (await this.wasm.callWasmExport("pedersen_hash_buffer", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async poseidon2Hash(r) {
            const e = [
                r
            ].map(R), n = [
                j
            ];
            return (await this.wasm.callWasmExport("poseidon2_hash", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        async poseidon2Hashes(r) {
            const e = [
                r
            ].map(R), n = [
                j
            ];
            return (await this.wasm.callWasmExport("poseidon2_hashes", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        async poseidon2Permutation(r) {
            const e = [
                r
            ].map(R), n = [
                Nt(j)
            ];
            return (await this.wasm.callWasmExport("poseidon2_permutation", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        async poseidon2HashAccumulate(r) {
            const e = [
                r
            ].map(R), n = [
                j
            ];
            return (await this.wasm.callWasmExport("poseidon2_hash_accumulate", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        async blake2s(r) {
            const e = [
                r
            ].map(R), n = [
                Ae
            ];
            return (await this.wasm.callWasmExport("blake2s", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        async blake2sToField(r) {
            const e = [
                r
            ].map(R), n = [
                j
            ];
            return (await this.wasm.callWasmExport("blake2s_to_field_", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        async aesEncryptBufferCbc(r, e, n, i) {
            const a = [
                r,
                e,
                n,
                i
            ].map(R), s = [
                nt()
            ];
            return (await this.wasm.callWasmExport("aes_encrypt_buffer_cbc", a, s.map((u)=>u.SIZE_IN_BYTES))).map((u, d)=>s[d].fromBuffer(u))[0];
        }
        async aesDecryptBufferCbc(r, e, n, i) {
            const a = [
                r,
                e,
                n,
                i
            ].map(R), s = [
                nt()
            ];
            return (await this.wasm.callWasmExport("aes_decrypt_buffer_cbc", a, s.map((u)=>u.SIZE_IN_BYTES))).map((u, d)=>s[d].fromBuffer(u))[0];
        }
        async srsInitSrs(r, e, n) {
            const i = [
                r,
                e,
                n
            ].map(R), a = [];
            (await this.wasm.callWasmExport("srs_init_srs", i, a.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>a[p].fromBuffer(l));
        }
        async srsInitGrumpkinSrs(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [];
            (await this.wasm.callWasmExport("srs_init_grumpkin_srs", n, i.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>i[l].fromBuffer(s));
        }
        async testThreads(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                Se()
            ];
            return (await this.wasm.callWasmExport("test_threads", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async commonInitSlabAllocator(r) {
            const e = [
                r
            ].map(R), n = [];
            (await this.wasm.callWasmExport("common_init_slab_allocator", e, n.map((a)=>a.SIZE_IN_BYTES))).map((a, s)=>n[s].fromBuffer(a));
        }
        async acirGetCircuitSizes(r, e, n) {
            const i = [
                r,
                e,
                n
            ].map(R), a = [
                Se(),
                Se()
            ];
            return (await this.wasm.callWasmExport("acir_get_circuit_sizes", i, a.map((p)=>p.SIZE_IN_BYTES))).map((p, u)=>a[u].fromBuffer(p));
        }
        async acirProveAndVerifyUltraHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                Bt()
            ];
            return (await this.wasm.callWasmExport("acir_prove_and_verify_ultra_honk", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async acirProveAndVerifyMegaHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                Bt()
            ];
            return (await this.wasm.callWasmExport("acir_prove_and_verify_mega_honk", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async acirProveAztecClient(r) {
            const e = [
                r
            ].map(R), n = [
                nt(),
                nt()
            ];
            return (await this.wasm.callWasmExport("acir_prove_aztec_client", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s));
        }
        async acirVerifyAztecClient(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                Bt()
            ];
            return (await this.wasm.callWasmExport("acir_verify_aztec_client", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async acirLoadVerificationKey(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [];
            (await this.wasm.callWasmExport("acir_load_verification_key", n, i.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>i[l].fromBuffer(s));
        }
        async acirInitVerificationKey(r) {
            const e = [
                r
            ].map(R), n = [];
            (await this.wasm.callWasmExport("acir_init_verification_key", e, n.map((a)=>a.SIZE_IN_BYTES))).map((a, s)=>n[s].fromBuffer(a));
        }
        async acirGetVerificationKey(r) {
            const e = [
                r
            ].map(R), n = [
                nt()
            ];
            return (await this.wasm.callWasmExport("acir_get_verification_key", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        async acirGetProvingKey(r, e, n) {
            const i = [
                r,
                e,
                n
            ].map(R), a = [
                nt()
            ];
            return (await this.wasm.callWasmExport("acir_get_proving_key", i, a.map((p)=>p.SIZE_IN_BYTES))).map((p, u)=>a[u].fromBuffer(p))[0];
        }
        async acirVerifyProof(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                Bt()
            ];
            return (await this.wasm.callWasmExport("acir_verify_proof", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async acirGetSolidityVerifier(r) {
            const e = [
                r
            ].map(R), n = [
                xr()
            ];
            return (await this.wasm.callWasmExport("acir_get_solidity_verifier", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        async acirHonkSolidityVerifier(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                xr()
            ];
            return (await this.wasm.callWasmExport("acir_honk_solidity_verifier", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async acirSerializeProofIntoFields(r, e, n) {
            const i = [
                r,
                e,
                n
            ].map(R), a = [
                Nt(j)
            ];
            return (await this.wasm.callWasmExport("acir_serialize_proof_into_fields", i, a.map((p)=>p.SIZE_IN_BYTES))).map((p, u)=>a[u].fromBuffer(p))[0];
        }
        async acirSerializeVerificationKeyIntoFields(r) {
            const e = [
                r
            ].map(R), n = [
                Nt(j),
                j
            ];
            return (await this.wasm.callWasmExport("acir_serialize_verification_key_into_fields", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s));
        }
        async acirProveUltraHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                nt()
            ];
            return (await this.wasm.callWasmExport("acir_prove_ultra_honk", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async acirProveUltraKeccakHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                nt()
            ];
            return (await this.wasm.callWasmExport("acir_prove_ultra_keccak_honk", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async acirProveUltraKeccakZKHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                nt()
            ];
            return (await this.wasm.callWasmExport("acir_prove_ultra_keccak_zk_honk", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async acirProveUltraStarknetHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                nt()
            ];
            return (await this.wasm.callWasmExport("acir_prove_ultra_starknet_honk", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async acirVerifyUltraHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                Bt()
            ];
            return (await this.wasm.callWasmExport("acir_verify_ultra_honk", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async acirVerifyUltraKeccakHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                Bt()
            ];
            return (await this.wasm.callWasmExport("acir_verify_ultra_keccak_honk", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async acirVerifyUltraKeccakZKHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                Bt()
            ];
            return (await this.wasm.callWasmExport("acir_verify_ultra_keccak_zk_honk", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async acirVerifyUltraStarknetHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                Bt()
            ];
            return (await this.wasm.callWasmExport("acir_verify_ultra_starknet_honk", n, i.map((l)=>l.SIZE_IN_BYTES))).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        async acirWriteVkUltraHonk(r) {
            const e = [
                r
            ].map(R), n = [
                nt()
            ];
            return (await this.wasm.callWasmExport("acir_write_vk_ultra_honk", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        async acirWriteVkUltraKeccakHonk(r) {
            const e = [
                r
            ].map(R), n = [
                nt()
            ];
            return (await this.wasm.callWasmExport("acir_write_vk_ultra_keccak_honk", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        async acirWriteVkUltraKeccakZKHonk(r) {
            const e = [
                r
            ].map(R), n = [
                nt()
            ];
            return (await this.wasm.callWasmExport("acir_write_vk_ultra_keccak_zk_honk", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        async acirWriteVkUltraStarknetHonk(r) {
            const e = [
                r
            ].map(R), n = [
                nt()
            ];
            return (await this.wasm.callWasmExport("acir_write_vk_ultra_starknet_honk", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        async acirProofAsFieldsUltraHonk(r) {
            const e = [
                r
            ].map(R), n = [
                Nt(j)
            ];
            return (await this.wasm.callWasmExport("acir_proof_as_fields_ultra_honk", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        async acirVkAsFieldsUltraHonk(r) {
            const e = [
                r
            ].map(R), n = [
                Nt(j)
            ];
            return (await this.wasm.callWasmExport("acir_vk_as_fields_ultra_honk", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        async acirVkAsFieldsMegaHonk(r) {
            const e = [
                r
            ].map(R), n = [
                Nt(j)
            ];
            return (await this.wasm.callWasmExport("acir_vk_as_fields_mega_honk", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        async acirGatesAztecClient(r) {
            const e = [
                r
            ].map(R), n = [
                nt()
            ];
            return (await this.wasm.callWasmExport("acir_gates_aztec_client", e, n.map((s)=>s.SIZE_IN_BYTES))).map((s, l)=>n[l].fromBuffer(s))[0];
        }
    }
    class Ys {
        constructor(r){
            this.wasm = r;
        }
        pedersenCommit(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                se
            ];
            return this.wasm.callWasmExport("pedersen_commit", n, i.map((l)=>l.SIZE_IN_BYTES)).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        pedersenHash(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                j
            ];
            return this.wasm.callWasmExport("pedersen_hash", n, i.map((l)=>l.SIZE_IN_BYTES)).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        pedersenHashes(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                j
            ];
            return this.wasm.callWasmExport("pedersen_hashes", n, i.map((l)=>l.SIZE_IN_BYTES)).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        pedersenHashBuffer(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                j
            ];
            return this.wasm.callWasmExport("pedersen_hash_buffer", n, i.map((l)=>l.SIZE_IN_BYTES)).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        poseidon2Hash(r) {
            const e = [
                r
            ].map(R), n = [
                j
            ];
            return this.wasm.callWasmExport("poseidon2_hash", e, n.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        poseidon2Hashes(r) {
            const e = [
                r
            ].map(R), n = [
                j
            ];
            return this.wasm.callWasmExport("poseidon2_hashes", e, n.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        poseidon2Permutation(r) {
            const e = [
                r
            ].map(R), n = [
                Nt(j)
            ];
            return this.wasm.callWasmExport("poseidon2_permutation", e, n.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        poseidon2HashAccumulate(r) {
            const e = [
                r
            ].map(R), n = [
                j
            ];
            return this.wasm.callWasmExport("poseidon2_hash_accumulate", e, n.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        blake2s(r) {
            const e = [
                r
            ].map(R), n = [
                Ae
            ];
            return this.wasm.callWasmExport("blake2s", e, n.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        blake2sToField(r) {
            const e = [
                r
            ].map(R), n = [
                j
            ];
            return this.wasm.callWasmExport("blake2s_to_field_", e, n.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        aesEncryptBufferCbc(r, e, n, i) {
            const a = [
                r,
                e,
                n,
                i
            ].map(R), s = [
                nt()
            ];
            return this.wasm.callWasmExport("aes_encrypt_buffer_cbc", a, s.map((u)=>u.SIZE_IN_BYTES)).map((u, d)=>s[d].fromBuffer(u))[0];
        }
        aesDecryptBufferCbc(r, e, n, i) {
            const a = [
                r,
                e,
                n,
                i
            ].map(R), s = [
                nt()
            ];
            return this.wasm.callWasmExport("aes_decrypt_buffer_cbc", a, s.map((u)=>u.SIZE_IN_BYTES)).map((u, d)=>s[d].fromBuffer(u))[0];
        }
        srsInitSrs(r, e, n) {
            const i = [
                r,
                e,
                n
            ].map(R), a = [];
            this.wasm.callWasmExport("srs_init_srs", i, a.map((l)=>l.SIZE_IN_BYTES)).map((l, p)=>a[p].fromBuffer(l));
        }
        srsInitGrumpkinSrs(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [];
            this.wasm.callWasmExport("srs_init_grumpkin_srs", n, i.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>i[l].fromBuffer(s));
        }
        testThreads(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                Se()
            ];
            return this.wasm.callWasmExport("test_threads", n, i.map((l)=>l.SIZE_IN_BYTES)).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        commonInitSlabAllocator(r) {
            const e = [
                r
            ].map(R), n = [];
            this.wasm.callWasmExport("common_init_slab_allocator", e, n.map((a)=>a.SIZE_IN_BYTES)).map((a, s)=>n[s].fromBuffer(a));
        }
        acirGetCircuitSizes(r, e, n) {
            const i = [
                r,
                e,
                n
            ].map(R), a = [
                Se(),
                Se()
            ];
            return this.wasm.callWasmExport("acir_get_circuit_sizes", i, a.map((p)=>p.SIZE_IN_BYTES)).map((p, u)=>a[u].fromBuffer(p));
        }
        acirProveAndVerifyUltraHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                Bt()
            ];
            return this.wasm.callWasmExport("acir_prove_and_verify_ultra_honk", n, i.map((l)=>l.SIZE_IN_BYTES)).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        acirProveAndVerifyMegaHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                Bt()
            ];
            return this.wasm.callWasmExport("acir_prove_and_verify_mega_honk", n, i.map((l)=>l.SIZE_IN_BYTES)).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        acirProveAztecClient(r) {
            const e = [
                r
            ].map(R), n = [
                nt(),
                nt()
            ];
            return this.wasm.callWasmExport("acir_prove_aztec_client", e, n.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>n[l].fromBuffer(s));
        }
        acirVerifyAztecClient(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                Bt()
            ];
            return this.wasm.callWasmExport("acir_verify_aztec_client", n, i.map((l)=>l.SIZE_IN_BYTES)).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        acirLoadVerificationKey(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [];
            this.wasm.callWasmExport("acir_load_verification_key", n, i.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>i[l].fromBuffer(s));
        }
        acirInitVerificationKey(r) {
            const e = [
                r
            ].map(R), n = [];
            this.wasm.callWasmExport("acir_init_verification_key", e, n.map((a)=>a.SIZE_IN_BYTES)).map((a, s)=>n[s].fromBuffer(a));
        }
        acirGetVerificationKey(r) {
            const e = [
                r
            ].map(R), n = [
                nt()
            ];
            return this.wasm.callWasmExport("acir_get_verification_key", e, n.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        acirGetProvingKey(r, e, n) {
            const i = [
                r,
                e,
                n
            ].map(R), a = [
                nt()
            ];
            return this.wasm.callWasmExport("acir_get_proving_key", i, a.map((p)=>p.SIZE_IN_BYTES)).map((p, u)=>a[u].fromBuffer(p))[0];
        }
        acirVerifyProof(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                Bt()
            ];
            return this.wasm.callWasmExport("acir_verify_proof", n, i.map((l)=>l.SIZE_IN_BYTES)).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        acirGetSolidityVerifier(r) {
            const e = [
                r
            ].map(R), n = [
                xr()
            ];
            return this.wasm.callWasmExport("acir_get_solidity_verifier", e, n.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        acirHonkSolidityVerifier(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                xr()
            ];
            return this.wasm.callWasmExport("acir_honk_solidity_verifier", n, i.map((l)=>l.SIZE_IN_BYTES)).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        acirSerializeProofIntoFields(r, e, n) {
            const i = [
                r,
                e,
                n
            ].map(R), a = [
                Nt(j)
            ];
            return this.wasm.callWasmExport("acir_serialize_proof_into_fields", i, a.map((p)=>p.SIZE_IN_BYTES)).map((p, u)=>a[u].fromBuffer(p))[0];
        }
        acirSerializeVerificationKeyIntoFields(r) {
            const e = [
                r
            ].map(R), n = [
                Nt(j),
                j
            ];
            return this.wasm.callWasmExport("acir_serialize_verification_key_into_fields", e, n.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>n[l].fromBuffer(s));
        }
        acirProveUltraHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                nt()
            ];
            return this.wasm.callWasmExport("acir_prove_ultra_honk", n, i.map((l)=>l.SIZE_IN_BYTES)).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        acirProveUltraKeccakHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                nt()
            ];
            return this.wasm.callWasmExport("acir_prove_ultra_keccak_honk", n, i.map((l)=>l.SIZE_IN_BYTES)).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        acirProveUltraKeccakZKHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                nt()
            ];
            return this.wasm.callWasmExport("acir_prove_ultra_keccak_zk_honk", n, i.map((l)=>l.SIZE_IN_BYTES)).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        acirProveUltraKeccakZkHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                nt()
            ];
            return this.wasm.callWasmExport("acir_prove_ultra_keccak_zk_honk", n, i.map((l)=>l.SIZE_IN_BYTES)).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        acirVerifyUltraHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                Bt()
            ];
            return this.wasm.callWasmExport("acir_verify_ultra_honk", n, i.map((l)=>l.SIZE_IN_BYTES)).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        acirVerifyUltraKeccakZKHonk(r, e) {
            const n = [
                r,
                e
            ].map(R), i = [
                Bt()
            ];
            return this.wasm.callWasmExport("acir_verify_ultra_keccak_zk_honk", n, i.map((l)=>l.SIZE_IN_BYTES)).map((l, p)=>i[p].fromBuffer(l))[0];
        }
        acirWriteVkUltraHonk(r) {
            const e = [
                r
            ].map(R), n = [
                nt()
            ];
            return this.wasm.callWasmExport("acir_write_vk_ultra_honk", e, n.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        acirWriteVkUltraKeccakHonk(r) {
            const e = [
                r
            ].map(R), n = [
                nt()
            ];
            return this.wasm.callWasmExport("acir_write_vk_ultra_keccak_honk", e, n.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        acirWriteVkUltraKeccakZKHonk(r) {
            const e = [
                r
            ].map(R), n = [
                nt()
            ];
            return this.wasm.callWasmExport("acir_write_vk_ultra_keccak_zk_honk", e, n.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        acirProofAsFieldsUltraHonk(r) {
            const e = [
                r
            ].map(R), n = [
                Nt(j)
            ];
            return this.wasm.callWasmExport("acir_proof_as_fields_ultra_honk", e, n.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        acirVkAsFieldsUltraHonk(r) {
            const e = [
                r
            ].map(R), n = [
                Nt(j)
            ];
            return this.wasm.callWasmExport("acir_vk_as_fields_ultra_honk", e, n.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        acirVkAsFieldsMegaHonk(r) {
            const e = [
                r
            ].map(R), n = [
                Nt(j)
            ];
            return this.wasm.callWasmExport("acir_vk_as_fields_mega_honk", e, n.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>n[l].fromBuffer(s))[0];
        }
        acirGatesAztecClient(r) {
            const e = [
                r
            ].map(R), n = [
                nt()
            ];
            return this.wasm.callWasmExport("acir_gates_aztec_client", e, n.map((s)=>s.SIZE_IN_BYTES)).map((s, l)=>n[l].fromBuffer(s))[0];
        }
    }
    var Gs = dt(833), Vt = dt.n(Gs);
    function ha() {
        const t = typeof window < "u" ? window : globalThis;
        return typeof SharedArrayBuffer < "u" && t.crossOriginIsolated;
    }
    function pa(t) {
        return na(t);
    }
    function Ks() {
        return navigator.hardwareConcurrency;
    }
    function da(t, r) {
        t.addEventListener("message", function e(n) {
            n.data && n.data.ready === !0 && (t.removeEventListener("message", e), r());
        });
    }
    async function js() {
        const t = new Worker(new URL("" + new URL("main.worker-Bpjz4yFN.js", import.meta.url).href, import.meta.url), {
            type: "module"
        }), r = Vt().disable();
        return Vt().enable(r), t.postMessage({
            debug: r
        }), await new Promise((e)=>da(t, e)), t;
    }
    async function Xs() {
        const t = new Worker(new URL("" + new URL("thread.worker-D6q_gtbS.js", import.meta.url).href, import.meta.url), {
            type: "module"
        }), r = Vt().disable();
        return Vt().enable(r), t.postMessage({
            debug: r
        }), await new Promise((e)=>da(t, e)), t;
    }
    class qs {
        constructor(){
            this.memStore = {}, this.logger = Vt()("bb.js:bb_wasm_base");
        }
        getImportObj(r) {
            return {
                wasi_snapshot_preview1: {
                    random_get: (n, i)=>{
                        n = n >>> 0;
                        const a = Nr(i);
                        this.getMemory().set(a, n);
                    },
                    clock_time_get: (n, i, a)=>{
                        a = a >>> 0;
                        const s = BigInt(new Date().getTime()) * 1000000n;
                        new DataView(this.getMemory().buffer).setBigUint64(a, s, !0);
                    },
                    proc_exit: ()=>{
                        throw this.logger("PANIC: proc_exit was called."), new Error;
                    }
                },
                env: {
                    logstr: (n)=>{
                        const i = this.stringFromAddress(n), a = this.getMemory(), s = `${i} (mem: ${(a.length / (1024 * 1024)).toFixed(2)}MiB)`;
                        this.logger(s);
                    },
                    get_data: (n, i)=>{
                        const a = this.stringFromAddress(n);
                        i = i >>> 0;
                        const s = this.memStore[a];
                        if (!s) {
                            this.logger(`get_data miss ${a}`);
                            return;
                        }
                        this.writeMemory(i, s);
                    },
                    set_data: (n, i, a)=>{
                        const s = this.stringFromAddress(n);
                        i = i >>> 0, this.memStore[s] = this.getMemorySlice(i, i + a);
                    },
                    memory: r
                }
            };
        }
        exports() {
            return this.instance.exports;
        }
        call(r, ...e) {
            if (!this.exports()[r]) throw new Error(`WASM function ${r} not found.`);
            try {
                return this.exports()[r](...e) >>> 0;
            } catch (n) {
                const i = `WASM function ${r} aborted, error: ${n}`;
                throw this.logger(i), this.logger(n.stack), n;
            }
        }
        memSize() {
            return this.getMemory().length;
        }
        getMemorySlice(r, e) {
            return this.getMemory().subarray(r, e).slice();
        }
        writeMemory(r, e) {
            this.getMemory().set(e, r);
        }
        getMemory() {
            return new Uint8Array(this.memory.buffer);
        }
        stringFromAddress(r) {
            r = r >>> 0;
            const e = this.getMemory();
            let n = r;
            for(; e[n] !== 0; ++n);
            return new TextDecoder("ascii").decode(e.slice(r, n));
        }
    }
    class Js {
        constructor(r){
            this.wasm = r, this.allocs = [], this.inScratchRemaining = 1024, this.outScratchRemaining = 1024;
        }
        getInputs(r) {
            return r.map((e)=>{
                if (typeof e == "object") if (e.length <= this.inScratchRemaining) {
                    const n = this.inScratchRemaining -= e.length;
                    return this.wasm.writeMemory(n, e), n;
                } else {
                    const n = this.wasm.call("bbmalloc", e.length);
                    return this.wasm.writeMemory(n, e), this.allocs.push(n), n;
                }
                else return e;
            });
        }
        getOutputPtrs(r) {
            return r.map((e)=>{
                const n = e || 4;
                if (n <= this.outScratchRemaining) return this.outScratchRemaining -= n;
                {
                    const i = this.wasm.call("bbmalloc", n);
                    return this.allocs.push(i), i;
                }
            });
        }
        addOutputPtr(r) {
            r >= 1024 && this.allocs.push(r);
        }
        freeAll() {
            for (const r of this.allocs)this.wasm.call("bbfree", r);
        }
    }
    class Dr extends qs {
        constructor(){
            super(...arguments), this.workers = [], this.remoteWasms = [], this.nextWorker = 0, this.nextThreadId = 1;
        }
        getNumThreads() {
            return this.workers.length + 1;
        }
        async init(r, e = Math.min(Ks(), Dr.MAX_THREADS), n = Vt()("bb.js:bb_wasm"), i = 32, a = 2 ** 16) {
            this.logger = n;
            const s = i * 2 ** 16 / (1024 * 1024), l = a * 2 ** 16 / (1024 * 1024), p = ha();
            this.logger(`Initializing bb wasm: initial memory ${i} pages ${s}MiB; max memory: ${a} pages, ${l}MiB; threads: ${e}; shared memory: ${p}`), this.memory = new WebAssembly.Memory({
                initial: i,
                maximum: a,
                shared: p
            });
            const u = await WebAssembly.instantiate(r, this.getImportObj(this.memory));
            this.instance = u, this.call("_initialize"), e > 1 && (this.logger(`Creating ${e} worker threads`), this.workers = await Promise.all(Array.from({
                length: e - 1
            }).map(Xs)), this.remoteWasms = await Promise.all(this.workers.map(pa)), await Promise.all(this.remoteWasms.map((d)=>d.initThread(r, this.memory))));
        }
        async destroy() {
            await Promise.all(this.workers.map((r)=>r.terminate()));
        }
        getImportObj(r) {
            const e = super.getImportObj(r);
            return {
                ...e,
                wasi: {
                    "thread-spawn": (n)=>{
                        n = n >>> 0;
                        const i = this.nextThreadId++, a = this.nextWorker++ % this.remoteWasms.length;
                        return this.remoteWasms[a].call("wasi_thread_start", i, n).catch(this.logger), i;
                    }
                },
                env: {
                    ...e.env,
                    env_hardware_concurrency: ()=>this.remoteWasms.length + 1
                }
            };
        }
        callWasmExport(r, e, n) {
            const i = new Js(this), a = i.getInputs(e), s = i.getOutputPtrs(n);
            this.call(r, ...a, ...s);
            const l = this.getOutputArgs(n, s, i);
            return i.freeAll(), l;
        }
        getOutputArgs(r, e, n) {
            return r.map((i, a)=>{
                if (i) return this.getMemorySlice(e[a], e[a] + i);
                const s = this.getMemorySlice(e[a], e[a] + 4), l = new DataView(s.buffer, s.byteOffset, s.byteLength).getUint32(0, !0);
                n.addOutputPtr(l);
                const p = this.getMemorySlice(l, l + 4), u = new DataView(p.buffer, p.byteOffset, p.byteLength).getUint32(0, !1);
                return this.getMemorySlice(l + 4, l + 4 + u);
            });
        }
    }
    Dr.MAX_THREADS = 32;
    const Qs = 4, Xn = 0, qn = 1, to = 2;
    function Ue(t) {
        let r = t.length;
        for(; --r >= 0;)t[r] = 0;
    }
    const eo = 0, _a = 1, ro = 2, no = 3, io = 258, Un = 29, nr = 256, Ke = nr + 1 + Un, ve = 30, Cn = 19, ma = 2 * Ke + 1, ce = 15, Yr = 16, ao = 7, Rn = 256, wa = 16, ga = 17, ya = 18, dn = new Uint8Array([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        0
    ]), Sr = new Uint8Array([
        0,
        0,
        0,
        0,
        1,
        1,
        2,
        2,
        3,
        3,
        4,
        4,
        5,
        5,
        6,
        6,
        7,
        7,
        8,
        8,
        9,
        9,
        10,
        10,
        11,
        11,
        12,
        12,
        13,
        13
    ]), so = new Uint8Array([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        3,
        7
    ]), ba = new Uint8Array([
        16,
        17,
        18,
        0,
        8,
        7,
        9,
        6,
        10,
        5,
        11,
        4,
        12,
        3,
        13,
        2,
        14,
        1,
        15
    ]), oo = 512, Gt = new Array((Ke + 2) * 2);
    Ue(Gt);
    const We = new Array(ve * 2);
    Ue(We);
    const je = new Array(oo);
    Ue(je);
    const Xe = new Array(io - no + 1);
    Ue(Xe);
    const Nn = new Array(Un);
    Ue(Nn);
    const Ur = new Array(ve);
    Ue(Ur);
    function Gr(t, r, e, n, i) {
        this.static_tree = t, this.extra_bits = r, this.extra_base = e, this.elems = n, this.max_length = i, this.has_stree = t && t.length;
    }
    let Ea, ka, Sa;
    function Kr(t, r) {
        this.dyn_tree = t, this.max_code = 0, this.stat_desc = r;
    }
    const Ba = (t)=>t < 256 ? je[t] : je[256 + (t >>> 7)], qe = (t, r)=>{
        t.pending_buf[t.pending++] = r & 255, t.pending_buf[t.pending++] = r >>> 8 & 255;
    }, It = (t, r, e)=>{
        t.bi_valid > Yr - e ? (t.bi_buf |= r << t.bi_valid & 65535, qe(t, t.bi_buf), t.bi_buf = r >> Yr - t.bi_valid, t.bi_valid += e - Yr) : (t.bi_buf |= r << t.bi_valid & 65535, t.bi_valid += e);
    }, Mt = (t, r, e)=>{
        It(t, e[r * 2], e[r * 2 + 1]);
    }, Ia = (t, r)=>{
        let e = 0;
        do e |= t & 1, t >>>= 1, e <<= 1;
        while (--r > 0);
        return e >>> 1;
    }, lo = (t)=>{
        t.bi_valid === 16 ? (qe(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = t.bi_buf & 255, t.bi_buf >>= 8, t.bi_valid -= 8);
    }, co = (t, r)=>{
        const e = r.dyn_tree, n = r.max_code, i = r.stat_desc.static_tree, a = r.stat_desc.has_stree, s = r.stat_desc.extra_bits, l = r.stat_desc.extra_base, p = r.stat_desc.max_length;
        let u, d, b, g, y, v, I = 0;
        for(g = 0; g <= ce; g++)t.bl_count[g] = 0;
        for(e[t.heap[t.heap_max] * 2 + 1] = 0, u = t.heap_max + 1; u < ma; u++)d = t.heap[u], g = e[e[d * 2 + 1] * 2 + 1] + 1, g > p && (g = p, I++), e[d * 2 + 1] = g, !(d > n) && (t.bl_count[g]++, y = 0, d >= l && (y = s[d - l]), v = e[d * 2], t.opt_len += v * (g + y), a && (t.static_len += v * (i[d * 2 + 1] + y)));
        if (I !== 0) {
            do {
                for(g = p - 1; t.bl_count[g] === 0;)g--;
                t.bl_count[g]--, t.bl_count[g + 1] += 2, t.bl_count[p]--, I -= 2;
            }while (I > 0);
            for(g = p; g !== 0; g--)for(d = t.bl_count[g]; d !== 0;)b = t.heap[--u], !(b > n) && (e[b * 2 + 1] !== g && (t.opt_len += (g - e[b * 2 + 1]) * e[b * 2], e[b * 2 + 1] = g), d--);
        }
    }, va = (t, r, e)=>{
        const n = new Array(ce + 1);
        let i = 0, a, s;
        for(a = 1; a <= ce; a++)i = i + e[a - 1] << 1, n[a] = i;
        for(s = 0; s <= r; s++){
            let l = t[s * 2 + 1];
            l !== 0 && (t[s * 2] = Ia(n[l]++, l));
        }
    }, uo = ()=>{
        let t, r, e, n, i;
        const a = new Array(ce + 1);
        for(e = 0, n = 0; n < Un - 1; n++)for(Nn[n] = e, t = 0; t < 1 << dn[n]; t++)Xe[e++] = n;
        for(Xe[e - 1] = n, i = 0, n = 0; n < 16; n++)for(Ur[n] = i, t = 0; t < 1 << Sr[n]; t++)je[i++] = n;
        for(i >>= 7; n < ve; n++)for(Ur[n] = i << 7, t = 0; t < 1 << Sr[n] - 7; t++)je[256 + i++] = n;
        for(r = 0; r <= ce; r++)a[r] = 0;
        for(t = 0; t <= 143;)Gt[t * 2 + 1] = 8, t++, a[8]++;
        for(; t <= 255;)Gt[t * 2 + 1] = 9, t++, a[9]++;
        for(; t <= 279;)Gt[t * 2 + 1] = 7, t++, a[7]++;
        for(; t <= 287;)Gt[t * 2 + 1] = 8, t++, a[8]++;
        for(va(Gt, Ke + 1, a), t = 0; t < ve; t++)We[t * 2 + 1] = 5, We[t * 2] = Ia(t, 5);
        Ea = new Gr(Gt, dn, nr + 1, Ke, ce), ka = new Gr(We, Sr, 0, ve, ce), Sa = new Gr(new Array(0), so, 0, Cn, ao);
    }, Aa = (t)=>{
        let r;
        for(r = 0; r < Ke; r++)t.dyn_ltree[r * 2] = 0;
        for(r = 0; r < ve; r++)t.dyn_dtree[r * 2] = 0;
        for(r = 0; r < Cn; r++)t.bl_tree[r * 2] = 0;
        t.dyn_ltree[Rn * 2] = 1, t.opt_len = t.static_len = 0, t.sym_next = t.matches = 0;
    }, Ta = (t)=>{
        t.bi_valid > 8 ? qe(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0;
    }, Jn = (t, r, e, n)=>{
        const i = r * 2, a = e * 2;
        return t[i] < t[a] || t[i] === t[a] && n[r] <= n[e];
    }, jr = (t, r, e)=>{
        const n = t.heap[e];
        let i = e << 1;
        for(; i <= t.heap_len && (i < t.heap_len && Jn(r, t.heap[i + 1], t.heap[i], t.depth) && i++, !Jn(r, n, t.heap[i], t.depth));)t.heap[e] = t.heap[i], e = i, i <<= 1;
        t.heap[e] = n;
    }, Qn = (t, r, e)=>{
        let n, i, a = 0, s, l;
        if (t.sym_next !== 0) do n = t.pending_buf[t.sym_buf + a++] & 255, n += (t.pending_buf[t.sym_buf + a++] & 255) << 8, i = t.pending_buf[t.sym_buf + a++], n === 0 ? Mt(t, i, r) : (s = Xe[i], Mt(t, s + nr + 1, r), l = dn[s], l !== 0 && (i -= Nn[s], It(t, i, l)), n--, s = Ba(n), Mt(t, s, e), l = Sr[s], l !== 0 && (n -= Ur[s], It(t, n, l)));
        while (a < t.sym_next);
        Mt(t, Rn, r);
    }, _n = (t, r)=>{
        const e = r.dyn_tree, n = r.stat_desc.static_tree, i = r.stat_desc.has_stree, a = r.stat_desc.elems;
        let s, l, p = -1, u;
        for(t.heap_len = 0, t.heap_max = ma, s = 0; s < a; s++)e[s * 2] !== 0 ? (t.heap[++t.heap_len] = p = s, t.depth[s] = 0) : e[s * 2 + 1] = 0;
        for(; t.heap_len < 2;)u = t.heap[++t.heap_len] = p < 2 ? ++p : 0, e[u * 2] = 1, t.depth[u] = 0, t.opt_len--, i && (t.static_len -= n[u * 2 + 1]);
        for(r.max_code = p, s = t.heap_len >> 1; s >= 1; s--)jr(t, e, s);
        u = a;
        do s = t.heap[1], t.heap[1] = t.heap[t.heap_len--], jr(t, e, 1), l = t.heap[1], t.heap[--t.heap_max] = s, t.heap[--t.heap_max] = l, e[u * 2] = e[s * 2] + e[l * 2], t.depth[u] = (t.depth[s] >= t.depth[l] ? t.depth[s] : t.depth[l]) + 1, e[s * 2 + 1] = e[l * 2 + 1] = u, t.heap[1] = u++, jr(t, e, 1);
        while (t.heap_len >= 2);
        t.heap[--t.heap_max] = t.heap[1], co(t, r), va(e, p, t.bl_count);
    }, ti = (t, r, e)=>{
        let n, i = -1, a, s = r[0 * 2 + 1], l = 0, p = 7, u = 4;
        for(s === 0 && (p = 138, u = 3), r[(e + 1) * 2 + 1] = 65535, n = 0; n <= e; n++)a = s, s = r[(n + 1) * 2 + 1], !(++l < p && a === s) && (l < u ? t.bl_tree[a * 2] += l : a !== 0 ? (a !== i && t.bl_tree[a * 2]++, t.bl_tree[wa * 2]++) : l <= 10 ? t.bl_tree[ga * 2]++ : t.bl_tree[ya * 2]++, l = 0, i = a, s === 0 ? (p = 138, u = 3) : a === s ? (p = 6, u = 3) : (p = 7, u = 4));
    }, ei = (t, r, e)=>{
        let n, i = -1, a, s = r[0 * 2 + 1], l = 0, p = 7, u = 4;
        for(s === 0 && (p = 138, u = 3), n = 0; n <= e; n++)if (a = s, s = r[(n + 1) * 2 + 1], !(++l < p && a === s)) {
            if (l < u) do Mt(t, a, t.bl_tree);
            while (--l !== 0);
            else a !== 0 ? (a !== i && (Mt(t, a, t.bl_tree), l--), Mt(t, wa, t.bl_tree), It(t, l - 3, 2)) : l <= 10 ? (Mt(t, ga, t.bl_tree), It(t, l - 3, 3)) : (Mt(t, ya, t.bl_tree), It(t, l - 11, 7));
            l = 0, i = a, s === 0 ? (p = 138, u = 3) : a === s ? (p = 6, u = 3) : (p = 7, u = 4);
        }
    }, fo = (t)=>{
        let r;
        for(ti(t, t.dyn_ltree, t.l_desc.max_code), ti(t, t.dyn_dtree, t.d_desc.max_code), _n(t, t.bl_desc), r = Cn - 1; r >= 3 && t.bl_tree[ba[r] * 2 + 1] === 0; r--);
        return t.opt_len += 3 * (r + 1) + 5 + 5 + 4, r;
    }, ho = (t, r, e, n)=>{
        let i;
        for(It(t, r - 257, 5), It(t, e - 1, 5), It(t, n - 4, 4), i = 0; i < n; i++)It(t, t.bl_tree[ba[i] * 2 + 1], 3);
        ei(t, t.dyn_ltree, r - 1), ei(t, t.dyn_dtree, e - 1);
    }, po = (t)=>{
        let r = 4093624447, e;
        for(e = 0; e <= 31; e++, r >>>= 1)if (r & 1 && t.dyn_ltree[e * 2] !== 0) return Xn;
        if (t.dyn_ltree[9 * 2] !== 0 || t.dyn_ltree[10 * 2] !== 0 || t.dyn_ltree[13 * 2] !== 0) return qn;
        for(e = 32; e < nr; e++)if (t.dyn_ltree[e * 2] !== 0) return qn;
        return Xn;
    };
    let ri = !1;
    const _o = (t)=>{
        ri || (uo(), ri = !0), t.l_desc = new Kr(t.dyn_ltree, Ea), t.d_desc = new Kr(t.dyn_dtree, ka), t.bl_desc = new Kr(t.bl_tree, Sa), t.bi_buf = 0, t.bi_valid = 0, Aa(t);
    }, xa = (t, r, e, n)=>{
        It(t, (eo << 1) + (n ? 1 : 0), 3), Ta(t), qe(t, e), qe(t, ~e), e && t.pending_buf.set(t.window.subarray(r, r + e), t.pending), t.pending += e;
    }, mo = (t)=>{
        It(t, _a << 1, 3), Mt(t, Rn, Gt), lo(t);
    }, wo = (t, r, e, n)=>{
        let i, a, s = 0;
        t.level > 0 ? (t.strm.data_type === to && (t.strm.data_type = po(t)), _n(t, t.l_desc), _n(t, t.d_desc), s = fo(t), i = t.opt_len + 3 + 7 >>> 3, a = t.static_len + 3 + 7 >>> 3, a <= i && (i = a)) : i = a = e + 5, e + 4 <= i && r !== -1 ? xa(t, r, e, n) : t.strategy === Qs || a === i ? (It(t, (_a << 1) + (n ? 1 : 0), 3), Qn(t, Gt, We)) : (It(t, (ro << 1) + (n ? 1 : 0), 3), ho(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, s + 1), Qn(t, t.dyn_ltree, t.dyn_dtree)), Aa(t), n && Ta(t);
    }, go = (t, r, e)=>(t.pending_buf[t.sym_buf + t.sym_next++] = r, t.pending_buf[t.sym_buf + t.sym_next++] = r >> 8, t.pending_buf[t.sym_buf + t.sym_next++] = e, r === 0 ? t.dyn_ltree[e * 2]++ : (t.matches++, r--, t.dyn_ltree[(Xe[e] + nr + 1) * 2]++, t.dyn_dtree[Ba(r) * 2]++), t.sym_next === t.sym_end);
    var yo = _o, bo = xa, Eo = wo, ko = go, So = mo, Bo = {
        _tr_init: yo,
        _tr_stored_block: bo,
        _tr_flush_block: Eo,
        _tr_tally: ko,
        _tr_align: So
    };
    const Io = (t, r, e, n)=>{
        let i = t & 65535 | 0, a = t >>> 16 & 65535 | 0, s = 0;
        for(; e !== 0;){
            s = e > 2e3 ? 2e3 : e, e -= s;
            do i = i + r[n++] | 0, a = a + i | 0;
            while (--s);
            i %= 65521, a %= 65521;
        }
        return i | a << 16 | 0;
    };
    var Je = Io;
    const vo = ()=>{
        let t, r = [];
        for(var e = 0; e < 256; e++){
            t = e;
            for(var n = 0; n < 8; n++)t = t & 1 ? 3988292384 ^ t >>> 1 : t >>> 1;
            r[e] = t;
        }
        return r;
    }, Ao = new Uint32Array(vo()), To = (t, r, e, n)=>{
        const i = Ao, a = n + e;
        t ^= -1;
        for(let s = n; s < a; s++)t = t >>> 8 ^ i[(t ^ r[s]) & 255];
        return t ^ -1;
    };
    var wt = To, he = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version"
    }, ir = {
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_MEM_ERROR: -4,
        Z_BUF_ERROR: -5,
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        Z_BINARY: 0,
        Z_TEXT: 1,
        Z_UNKNOWN: 2,
        Z_DEFLATED: 8
    };
    const { _tr_init: xo, _tr_stored_block: mn, _tr_flush_block: Uo, _tr_tally: re, _tr_align: Co } = Bo, { Z_NO_FLUSH: ne, Z_PARTIAL_FLUSH: Ro, Z_FULL_FLUSH: No, Z_FINISH: zt, Z_BLOCK: ni, Z_OK: yt, Z_STREAM_END: ii, Z_STREAM_ERROR: Pt, Z_DATA_ERROR: zo, Z_BUF_ERROR: Xr, Z_DEFAULT_COMPRESSION: Do, Z_FILTERED: Oo, Z_HUFFMAN_ONLY: pr, Z_RLE: Zo, Z_FIXED: Lo, Z_DEFAULT_STRATEGY: Mo, Z_UNKNOWN: Fo, Z_DEFLATED: Or } = ir, Po = 9, Ho = 15, Wo = 8, Vo = 29, $o = 256, wn = $o + 1 + Vo, Yo = 30, Go = 19, Ko = 2 * wn + 1, jo = 15, Q = 3, te = 258, Ht = te + Q + 1, Xo = 32, Te = 42, zn = 57, gn = 69, yn = 73, bn = 91, En = 103, ue = 113, Fe = 666, Et = 1, Ce = 2, pe = 3, Re = 4, qo = 3, fe = (t, r)=>(t.msg = he[r], r), ai = (t)=>t * 2 - (t > 4 ? 9 : 0), Qt = (t)=>{
        let r = t.length;
        for(; --r >= 0;)t[r] = 0;
    }, Jo = (t)=>{
        let r, e, n, i = t.w_size;
        r = t.hash_size, n = r;
        do e = t.head[--n], t.head[n] = e >= i ? e - i : 0;
        while (--r);
        r = i, n = r;
        do e = t.prev[--n], t.prev[n] = e >= i ? e - i : 0;
        while (--r);
    };
    let Qo = (t, r, e)=>(r << t.hash_shift ^ e) & t.hash_mask, ie = Qo;
    const Tt = (t)=>{
        const r = t.state;
        let e = r.pending;
        e > t.avail_out && (e = t.avail_out), e !== 0 && (t.output.set(r.pending_buf.subarray(r.pending_out, r.pending_out + e), t.next_out), t.next_out += e, r.pending_out += e, t.total_out += e, t.avail_out -= e, r.pending -= e, r.pending === 0 && (r.pending_out = 0));
    }, Ct = (t, r)=>{
        Uo(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, r), t.block_start = t.strstart, Tt(t.strm);
    }, rt = (t, r)=>{
        t.pending_buf[t.pending++] = r;
    }, Le = (t, r)=>{
        t.pending_buf[t.pending++] = r >>> 8 & 255, t.pending_buf[t.pending++] = r & 255;
    }, kn = (t, r, e, n)=>{
        let i = t.avail_in;
        return i > n && (i = n), i === 0 ? 0 : (t.avail_in -= i, r.set(t.input.subarray(t.next_in, t.next_in + i), e), t.state.wrap === 1 ? t.adler = Je(t.adler, r, i, e) : t.state.wrap === 2 && (t.adler = wt(t.adler, r, i, e)), t.next_in += i, t.total_in += i, i);
    }, Ua = (t, r)=>{
        let e = t.max_chain_length, n = t.strstart, i, a, s = t.prev_length, l = t.nice_match;
        const p = t.strstart > t.w_size - Ht ? t.strstart - (t.w_size - Ht) : 0, u = t.window, d = t.w_mask, b = t.prev, g = t.strstart + te;
        let y = u[n + s - 1], v = u[n + s];
        t.prev_length >= t.good_match && (e >>= 2), l > t.lookahead && (l = t.lookahead);
        do if (i = r, !(u[i + s] !== v || u[i + s - 1] !== y || u[i] !== u[n] || u[++i] !== u[n + 1])) {
            n += 2, i++;
            do ;
            while (u[++n] === u[++i] && u[++n] === u[++i] && u[++n] === u[++i] && u[++n] === u[++i] && u[++n] === u[++i] && u[++n] === u[++i] && u[++n] === u[++i] && u[++n] === u[++i] && n < g);
            if (a = te - (g - n), n = g - te, a > s) {
                if (t.match_start = r, s = a, a >= l) break;
                y = u[n + s - 1], v = u[n + s];
            }
        }
        while ((r = b[r & d]) > p && --e !== 0);
        return s <= t.lookahead ? s : t.lookahead;
    }, xe = (t)=>{
        const r = t.w_size;
        let e, n, i;
        do {
            if (n = t.window_size - t.lookahead - t.strstart, t.strstart >= r + (r - Ht) && (t.window.set(t.window.subarray(r, r + r - n), 0), t.match_start -= r, t.strstart -= r, t.block_start -= r, t.insert > t.strstart && (t.insert = t.strstart), Jo(t), n += r), t.strm.avail_in === 0) break;
            if (e = kn(t.strm, t.window, t.strstart + t.lookahead, n), t.lookahead += e, t.lookahead + t.insert >= Q) for(i = t.strstart - t.insert, t.ins_h = t.window[i], t.ins_h = ie(t, t.ins_h, t.window[i + 1]); t.insert && (t.ins_h = ie(t, t.ins_h, t.window[i + Q - 1]), t.prev[i & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = i, i++, t.insert--, !(t.lookahead + t.insert < Q)););
        }while (t.lookahead < Ht && t.strm.avail_in !== 0);
    }, Ca = (t, r)=>{
        let e = t.pending_buf_size - 5 > t.w_size ? t.w_size : t.pending_buf_size - 5, n, i, a, s = 0, l = t.strm.avail_in;
        do {
            if (n = 65535, a = t.bi_valid + 42 >> 3, t.strm.avail_out < a || (a = t.strm.avail_out - a, i = t.strstart - t.block_start, n > i + t.strm.avail_in && (n = i + t.strm.avail_in), n > a && (n = a), n < e && (n === 0 && r !== zt || r === ne || n !== i + t.strm.avail_in))) break;
            s = r === zt && n === i + t.strm.avail_in ? 1 : 0, mn(t, 0, 0, s), t.pending_buf[t.pending - 4] = n, t.pending_buf[t.pending - 3] = n >> 8, t.pending_buf[t.pending - 2] = ~n, t.pending_buf[t.pending - 1] = ~n >> 8, Tt(t.strm), i && (i > n && (i = n), t.strm.output.set(t.window.subarray(t.block_start, t.block_start + i), t.strm.next_out), t.strm.next_out += i, t.strm.avail_out -= i, t.strm.total_out += i, t.block_start += i, n -= i), n && (kn(t.strm, t.strm.output, t.strm.next_out, n), t.strm.next_out += n, t.strm.avail_out -= n, t.strm.total_out += n);
        }while (s === 0);
        return l -= t.strm.avail_in, l && (l >= t.w_size ? (t.matches = 2, t.window.set(t.strm.input.subarray(t.strm.next_in - t.w_size, t.strm.next_in), 0), t.strstart = t.w_size, t.insert = t.strstart) : (t.window_size - t.strstart <= l && (t.strstart -= t.w_size, t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0), t.matches < 2 && t.matches++, t.insert > t.strstart && (t.insert = t.strstart)), t.window.set(t.strm.input.subarray(t.strm.next_in - l, t.strm.next_in), t.strstart), t.strstart += l, t.insert += l > t.w_size - t.insert ? t.w_size - t.insert : l), t.block_start = t.strstart), t.high_water < t.strstart && (t.high_water = t.strstart), s ? Re : r !== ne && r !== zt && t.strm.avail_in === 0 && t.strstart === t.block_start ? Ce : (a = t.window_size - t.strstart, t.strm.avail_in > a && t.block_start >= t.w_size && (t.block_start -= t.w_size, t.strstart -= t.w_size, t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0), t.matches < 2 && t.matches++, a += t.w_size, t.insert > t.strstart && (t.insert = t.strstart)), a > t.strm.avail_in && (a = t.strm.avail_in), a && (kn(t.strm, t.window, t.strstart, a), t.strstart += a, t.insert += a > t.w_size - t.insert ? t.w_size - t.insert : a), t.high_water < t.strstart && (t.high_water = t.strstart), a = t.bi_valid + 42 >> 3, a = t.pending_buf_size - a > 65535 ? 65535 : t.pending_buf_size - a, e = a > t.w_size ? t.w_size : a, i = t.strstart - t.block_start, (i >= e || (i || r === zt) && r !== ne && t.strm.avail_in === 0 && i <= a) && (n = i > a ? a : i, s = r === zt && t.strm.avail_in === 0 && n === i ? 1 : 0, mn(t, t.block_start, n, s), t.block_start += n, Tt(t.strm)), s ? pe : Et);
    }, qr = (t, r)=>{
        let e, n;
        for(;;){
            if (t.lookahead < Ht) {
                if (xe(t), t.lookahead < Ht && r === ne) return Et;
                if (t.lookahead === 0) break;
            }
            if (e = 0, t.lookahead >= Q && (t.ins_h = ie(t, t.ins_h, t.window[t.strstart + Q - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), e !== 0 && t.strstart - e <= t.w_size - Ht && (t.match_length = Ua(t, e)), t.match_length >= Q) if (n = re(t, t.strstart - t.match_start, t.match_length - Q), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= Q) {
                t.match_length--;
                do t.strstart++, t.ins_h = ie(t, t.ins_h, t.window[t.strstart + Q - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart;
                while (--t.match_length !== 0);
                t.strstart++;
            } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = ie(t, t.ins_h, t.window[t.strstart + 1]);
            else n = re(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
            if (n && (Ct(t, !1), t.strm.avail_out === 0)) return Et;
        }
        return t.insert = t.strstart < Q - 1 ? t.strstart : Q - 1, r === zt ? (Ct(t, !0), t.strm.avail_out === 0 ? pe : Re) : t.sym_next && (Ct(t, !1), t.strm.avail_out === 0) ? Et : Ce;
    }, ye = (t, r)=>{
        let e, n, i;
        for(;;){
            if (t.lookahead < Ht) {
                if (xe(t), t.lookahead < Ht && r === ne) return Et;
                if (t.lookahead === 0) break;
            }
            if (e = 0, t.lookahead >= Q && (t.ins_h = ie(t, t.ins_h, t.window[t.strstart + Q - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = Q - 1, e !== 0 && t.prev_length < t.max_lazy_match && t.strstart - e <= t.w_size - Ht && (t.match_length = Ua(t, e), t.match_length <= 5 && (t.strategy === Oo || t.match_length === Q && t.strstart - t.match_start > 4096) && (t.match_length = Q - 1)), t.prev_length >= Q && t.match_length <= t.prev_length) {
                i = t.strstart + t.lookahead - Q, n = re(t, t.strstart - 1 - t.prev_match, t.prev_length - Q), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
                do ++t.strstart <= i && (t.ins_h = ie(t, t.ins_h, t.window[t.strstart + Q - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart);
                while (--t.prev_length !== 0);
                if (t.match_available = 0, t.match_length = Q - 1, t.strstart++, n && (Ct(t, !1), t.strm.avail_out === 0)) return Et;
            } else if (t.match_available) {
                if (n = re(t, 0, t.window[t.strstart - 1]), n && Ct(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0) return Et;
            } else t.match_available = 1, t.strstart++, t.lookahead--;
        }
        return t.match_available && (n = re(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < Q - 1 ? t.strstart : Q - 1, r === zt ? (Ct(t, !0), t.strm.avail_out === 0 ? pe : Re) : t.sym_next && (Ct(t, !1), t.strm.avail_out === 0) ? Et : Ce;
    }, tl = (t, r)=>{
        let e, n, i, a;
        const s = t.window;
        for(;;){
            if (t.lookahead <= te) {
                if (xe(t), t.lookahead <= te && r === ne) return Et;
                if (t.lookahead === 0) break;
            }
            if (t.match_length = 0, t.lookahead >= Q && t.strstart > 0 && (i = t.strstart - 1, n = s[i], n === s[++i] && n === s[++i] && n === s[++i])) {
                a = t.strstart + te;
                do ;
                while (n === s[++i] && n === s[++i] && n === s[++i] && n === s[++i] && n === s[++i] && n === s[++i] && n === s[++i] && n === s[++i] && i < a);
                t.match_length = te - (a - i), t.match_length > t.lookahead && (t.match_length = t.lookahead);
            }
            if (t.match_length >= Q ? (e = re(t, 1, t.match_length - Q), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (e = re(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), e && (Ct(t, !1), t.strm.avail_out === 0)) return Et;
        }
        return t.insert = 0, r === zt ? (Ct(t, !0), t.strm.avail_out === 0 ? pe : Re) : t.sym_next && (Ct(t, !1), t.strm.avail_out === 0) ? Et : Ce;
    }, el = (t, r)=>{
        let e;
        for(;;){
            if (t.lookahead === 0 && (xe(t), t.lookahead === 0)) {
                if (r === ne) return Et;
                break;
            }
            if (t.match_length = 0, e = re(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, e && (Ct(t, !1), t.strm.avail_out === 0)) return Et;
        }
        return t.insert = 0, r === zt ? (Ct(t, !0), t.strm.avail_out === 0 ? pe : Re) : t.sym_next && (Ct(t, !1), t.strm.avail_out === 0) ? Et : Ce;
    };
    function Lt(t, r, e, n, i) {
        this.good_length = t, this.max_lazy = r, this.nice_length = e, this.max_chain = n, this.func = i;
    }
    const Pe = [
        new Lt(0, 0, 0, 0, Ca),
        new Lt(4, 4, 8, 4, qr),
        new Lt(4, 5, 16, 8, qr),
        new Lt(4, 6, 32, 32, qr),
        new Lt(4, 4, 16, 16, ye),
        new Lt(8, 16, 32, 32, ye),
        new Lt(8, 16, 128, 128, ye),
        new Lt(8, 32, 128, 256, ye),
        new Lt(32, 128, 258, 1024, ye),
        new Lt(32, 258, 258, 4096, ye)
    ], rl = (t)=>{
        t.window_size = 2 * t.w_size, Qt(t.head), t.max_lazy_match = Pe[t.level].max_lazy, t.good_match = Pe[t.level].good_length, t.nice_match = Pe[t.level].nice_length, t.max_chain_length = Pe[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = Q - 1, t.match_available = 0, t.ins_h = 0;
    };
    function nl() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = Or, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(Ko * 2), this.dyn_dtree = new Uint16Array((2 * Yo + 1) * 2), this.bl_tree = new Uint16Array((2 * Go + 1) * 2), Qt(this.dyn_ltree), Qt(this.dyn_dtree), Qt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(jo + 1), this.heap = new Uint16Array(2 * wn + 1), Qt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(2 * wn + 1), Qt(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
    }
    const ar = (t)=>{
        if (!t) return 1;
        const r = t.state;
        return !r || r.strm !== t || r.status !== Te && r.status !== zn && r.status !== gn && r.status !== yn && r.status !== bn && r.status !== En && r.status !== ue && r.status !== Fe ? 1 : 0;
    }, Ra = (t)=>{
        if (ar(t)) return fe(t, Pt);
        t.total_in = t.total_out = 0, t.data_type = Fo;
        const r = t.state;
        return r.pending = 0, r.pending_out = 0, r.wrap < 0 && (r.wrap = -r.wrap), r.status = r.wrap === 2 ? zn : r.wrap ? Te : ue, t.adler = r.wrap === 2 ? 0 : 1, r.last_flush = -2, xo(r), yt;
    }, Na = (t)=>{
        const r = Ra(t);
        return r === yt && rl(t.state), r;
    }, il = (t, r)=>ar(t) || t.state.wrap !== 2 ? Pt : (t.state.gzhead = r, yt), za = (t, r, e, n, i, a)=>{
        if (!t) return Pt;
        let s = 1;
        if (r === Do && (r = 6), n < 0 ? (s = 0, n = -n) : n > 15 && (s = 2, n -= 16), i < 1 || i > Po || e !== Or || n < 8 || n > 15 || r < 0 || r > 9 || a < 0 || a > Lo || n === 8 && s !== 1) return fe(t, Pt);
        n === 8 && (n = 9);
        const l = new nl;
        return t.state = l, l.strm = t, l.status = Te, l.wrap = s, l.gzhead = null, l.w_bits = n, l.w_size = 1 << l.w_bits, l.w_mask = l.w_size - 1, l.hash_bits = i + 7, l.hash_size = 1 << l.hash_bits, l.hash_mask = l.hash_size - 1, l.hash_shift = ~~((l.hash_bits + Q - 1) / Q), l.window = new Uint8Array(l.w_size * 2), l.head = new Uint16Array(l.hash_size), l.prev = new Uint16Array(l.w_size), l.lit_bufsize = 1 << i + 6, l.pending_buf_size = l.lit_bufsize * 4, l.pending_buf = new Uint8Array(l.pending_buf_size), l.sym_buf = l.lit_bufsize, l.sym_end = (l.lit_bufsize - 1) * 3, l.level = r, l.strategy = a, l.method = e, Na(t);
    }, al = (t, r)=>za(t, r, Or, Ho, Wo, Mo), sl = (t, r)=>{
        if (ar(t) || r > ni || r < 0) return t ? fe(t, Pt) : Pt;
        const e = t.state;
        if (!t.output || t.avail_in !== 0 && !t.input || e.status === Fe && r !== zt) return fe(t, t.avail_out === 0 ? Xr : Pt);
        const n = e.last_flush;
        if (e.last_flush = r, e.pending !== 0) {
            if (Tt(t), t.avail_out === 0) return e.last_flush = -1, yt;
        } else if (t.avail_in === 0 && ai(r) <= ai(n) && r !== zt) return fe(t, Xr);
        if (e.status === Fe && t.avail_in !== 0) return fe(t, Xr);
        if (e.status === Te && e.wrap === 0 && (e.status = ue), e.status === Te) {
            let i = Or + (e.w_bits - 8 << 4) << 8, a = -1;
            if (e.strategy >= pr || e.level < 2 ? a = 0 : e.level < 6 ? a = 1 : e.level === 6 ? a = 2 : a = 3, i |= a << 6, e.strstart !== 0 && (i |= Xo), i += 31 - i % 31, Le(e, i), e.strstart !== 0 && (Le(e, t.adler >>> 16), Le(e, t.adler & 65535)), t.adler = 1, e.status = ue, Tt(t), e.pending !== 0) return e.last_flush = -1, yt;
        }
        if (e.status === zn) {
            if (t.adler = 0, rt(e, 31), rt(e, 139), rt(e, 8), e.gzhead) rt(e, (e.gzhead.text ? 1 : 0) + (e.gzhead.hcrc ? 2 : 0) + (e.gzhead.extra ? 4 : 0) + (e.gzhead.name ? 8 : 0) + (e.gzhead.comment ? 16 : 0)), rt(e, e.gzhead.time & 255), rt(e, e.gzhead.time >> 8 & 255), rt(e, e.gzhead.time >> 16 & 255), rt(e, e.gzhead.time >> 24 & 255), rt(e, e.level === 9 ? 2 : e.strategy >= pr || e.level < 2 ? 4 : 0), rt(e, e.gzhead.os & 255), e.gzhead.extra && e.gzhead.extra.length && (rt(e, e.gzhead.extra.length & 255), rt(e, e.gzhead.extra.length >> 8 & 255)), e.gzhead.hcrc && (t.adler = wt(t.adler, e.pending_buf, e.pending, 0)), e.gzindex = 0, e.status = gn;
            else if (rt(e, 0), rt(e, 0), rt(e, 0), rt(e, 0), rt(e, 0), rt(e, e.level === 9 ? 2 : e.strategy >= pr || e.level < 2 ? 4 : 0), rt(e, qo), e.status = ue, Tt(t), e.pending !== 0) return e.last_flush = -1, yt;
        }
        if (e.status === gn) {
            if (e.gzhead.extra) {
                let i = e.pending, a = (e.gzhead.extra.length & 65535) - e.gzindex;
                for(; e.pending + a > e.pending_buf_size;){
                    let l = e.pending_buf_size - e.pending;
                    if (e.pending_buf.set(e.gzhead.extra.subarray(e.gzindex, e.gzindex + l), e.pending), e.pending = e.pending_buf_size, e.gzhead.hcrc && e.pending > i && (t.adler = wt(t.adler, e.pending_buf, e.pending - i, i)), e.gzindex += l, Tt(t), e.pending !== 0) return e.last_flush = -1, yt;
                    i = 0, a -= l;
                }
                let s = new Uint8Array(e.gzhead.extra);
                e.pending_buf.set(s.subarray(e.gzindex, e.gzindex + a), e.pending), e.pending += a, e.gzhead.hcrc && e.pending > i && (t.adler = wt(t.adler, e.pending_buf, e.pending - i, i)), e.gzindex = 0;
            }
            e.status = yn;
        }
        if (e.status === yn) {
            if (e.gzhead.name) {
                let i = e.pending, a;
                do {
                    if (e.pending === e.pending_buf_size) {
                        if (e.gzhead.hcrc && e.pending > i && (t.adler = wt(t.adler, e.pending_buf, e.pending - i, i)), Tt(t), e.pending !== 0) return e.last_flush = -1, yt;
                        i = 0;
                    }
                    e.gzindex < e.gzhead.name.length ? a = e.gzhead.name.charCodeAt(e.gzindex++) & 255 : a = 0, rt(e, a);
                }while (a !== 0);
                e.gzhead.hcrc && e.pending > i && (t.adler = wt(t.adler, e.pending_buf, e.pending - i, i)), e.gzindex = 0;
            }
            e.status = bn;
        }
        if (e.status === bn) {
            if (e.gzhead.comment) {
                let i = e.pending, a;
                do {
                    if (e.pending === e.pending_buf_size) {
                        if (e.gzhead.hcrc && e.pending > i && (t.adler = wt(t.adler, e.pending_buf, e.pending - i, i)), Tt(t), e.pending !== 0) return e.last_flush = -1, yt;
                        i = 0;
                    }
                    e.gzindex < e.gzhead.comment.length ? a = e.gzhead.comment.charCodeAt(e.gzindex++) & 255 : a = 0, rt(e, a);
                }while (a !== 0);
                e.gzhead.hcrc && e.pending > i && (t.adler = wt(t.adler, e.pending_buf, e.pending - i, i));
            }
            e.status = En;
        }
        if (e.status === En) {
            if (e.gzhead.hcrc) {
                if (e.pending + 2 > e.pending_buf_size && (Tt(t), e.pending !== 0)) return e.last_flush = -1, yt;
                rt(e, t.adler & 255), rt(e, t.adler >> 8 & 255), t.adler = 0;
            }
            if (e.status = ue, Tt(t), e.pending !== 0) return e.last_flush = -1, yt;
        }
        if (t.avail_in !== 0 || e.lookahead !== 0 || r !== ne && e.status !== Fe) {
            let i = e.level === 0 ? Ca(e, r) : e.strategy === pr ? el(e, r) : e.strategy === Zo ? tl(e, r) : Pe[e.level].func(e, r);
            if ((i === pe || i === Re) && (e.status = Fe), i === Et || i === pe) return t.avail_out === 0 && (e.last_flush = -1), yt;
            if (i === Ce && (r === Ro ? Co(e) : r !== ni && (mn(e, 0, 0, !1), r === No && (Qt(e.head), e.lookahead === 0 && (e.strstart = 0, e.block_start = 0, e.insert = 0))), Tt(t), t.avail_out === 0)) return e.last_flush = -1, yt;
        }
        return r !== zt ? yt : e.wrap <= 0 ? ii : (e.wrap === 2 ? (rt(e, t.adler & 255), rt(e, t.adler >> 8 & 255), rt(e, t.adler >> 16 & 255), rt(e, t.adler >> 24 & 255), rt(e, t.total_in & 255), rt(e, t.total_in >> 8 & 255), rt(e, t.total_in >> 16 & 255), rt(e, t.total_in >> 24 & 255)) : (Le(e, t.adler >>> 16), Le(e, t.adler & 65535)), Tt(t), e.wrap > 0 && (e.wrap = -e.wrap), e.pending !== 0 ? yt : ii);
    }, ol = (t)=>{
        if (ar(t)) return Pt;
        const r = t.state.status;
        return t.state = null, r === ue ? fe(t, zo) : yt;
    }, ll = (t, r)=>{
        let e = r.length;
        if (ar(t)) return Pt;
        const n = t.state, i = n.wrap;
        if (i === 2 || i === 1 && n.status !== Te || n.lookahead) return Pt;
        if (i === 1 && (t.adler = Je(t.adler, r, e, 0)), n.wrap = 0, e >= n.w_size) {
            i === 0 && (Qt(n.head), n.strstart = 0, n.block_start = 0, n.insert = 0);
            let p = new Uint8Array(n.w_size);
            p.set(r.subarray(e - n.w_size, e), 0), r = p, e = n.w_size;
        }
        const a = t.avail_in, s = t.next_in, l = t.input;
        for(t.avail_in = e, t.next_in = 0, t.input = r, xe(n); n.lookahead >= Q;){
            let p = n.strstart, u = n.lookahead - (Q - 1);
            do n.ins_h = ie(n, n.ins_h, n.window[p + Q - 1]), n.prev[p & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = p, p++;
            while (--u);
            n.strstart = p, n.lookahead = Q - 1, xe(n);
        }
        return n.strstart += n.lookahead, n.block_start = n.strstart, n.insert = n.lookahead, n.lookahead = 0, n.match_length = n.prev_length = Q - 1, n.match_available = 0, t.next_in = s, t.input = l, t.avail_in = a, n.wrap = i, yt;
    };
    var cl = al, ul = za, fl = Na, hl = Ra, pl = il, dl = sl, _l = ol, ml = ll, wl = "pako deflate (from Nodeca project)", Ve = {
        deflateInit: cl,
        deflateInit2: ul,
        deflateReset: fl,
        deflateResetKeep: hl,
        deflateSetHeader: pl,
        deflate: dl,
        deflateEnd: _l,
        deflateSetDictionary: ml,
        deflateInfo: wl
    };
    const gl = (t, r)=>Object.prototype.hasOwnProperty.call(t, r);
    var yl = function(t) {
        const r = Array.prototype.slice.call(arguments, 1);
        for(; r.length;){
            const e = r.shift();
            if (e) {
                if (typeof e != "object") throw new TypeError(e + "must be non-object");
                for(const n in e)gl(e, n) && (t[n] = e[n]);
            }
        }
        return t;
    }, bl = (t)=>{
        let r = 0;
        for(let n = 0, i = t.length; n < i; n++)r += t[n].length;
        const e = new Uint8Array(r);
        for(let n = 0, i = 0, a = t.length; n < a; n++){
            let s = t[n];
            e.set(s, i), i += s.length;
        }
        return e;
    }, Zr = {
        assign: yl,
        flattenChunks: bl
    };
    let Da = !0;
    try {
        String.fromCharCode.apply(null, new Uint8Array(1));
    } catch  {
        Da = !1;
    }
    const Qe = new Uint8Array(256);
    for(let t = 0; t < 256; t++)Qe[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
    Qe[254] = Qe[254] = 1;
    var El = (t)=>{
        if (typeof TextEncoder == "function" && TextEncoder.prototype.encode) return new TextEncoder().encode(t);
        let r, e, n, i, a, s = t.length, l = 0;
        for(i = 0; i < s; i++)e = t.charCodeAt(i), (e & 64512) === 55296 && i + 1 < s && (n = t.charCodeAt(i + 1), (n & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (n - 56320), i++)), l += e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4;
        for(r = new Uint8Array(l), a = 0, i = 0; a < l; i++)e = t.charCodeAt(i), (e & 64512) === 55296 && i + 1 < s && (n = t.charCodeAt(i + 1), (n & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (n - 56320), i++)), e < 128 ? r[a++] = e : e < 2048 ? (r[a++] = 192 | e >>> 6, r[a++] = 128 | e & 63) : e < 65536 ? (r[a++] = 224 | e >>> 12, r[a++] = 128 | e >>> 6 & 63, r[a++] = 128 | e & 63) : (r[a++] = 240 | e >>> 18, r[a++] = 128 | e >>> 12 & 63, r[a++] = 128 | e >>> 6 & 63, r[a++] = 128 | e & 63);
        return r;
    };
    const kl = (t, r)=>{
        if (r < 65534 && t.subarray && Da) return String.fromCharCode.apply(null, t.length === r ? t : t.subarray(0, r));
        let e = "";
        for(let n = 0; n < r; n++)e += String.fromCharCode(t[n]);
        return e;
    };
    var Sl = (t, r)=>{
        const e = r || t.length;
        if (typeof TextDecoder == "function" && TextDecoder.prototype.decode) return new TextDecoder().decode(t.subarray(0, r));
        let n, i;
        const a = new Array(e * 2);
        for(i = 0, n = 0; n < e;){
            let s = t[n++];
            if (s < 128) {
                a[i++] = s;
                continue;
            }
            let l = Qe[s];
            if (l > 4) {
                a[i++] = 65533, n += l - 1;
                continue;
            }
            for(s &= l === 2 ? 31 : l === 3 ? 15 : 7; l > 1 && n < e;)s = s << 6 | t[n++] & 63, l--;
            if (l > 1) {
                a[i++] = 65533;
                continue;
            }
            s < 65536 ? a[i++] = s : (s -= 65536, a[i++] = 55296 | s >> 10 & 1023, a[i++] = 56320 | s & 1023);
        }
        return kl(a, i);
    }, Bl = (t, r)=>{
        r = r || t.length, r > t.length && (r = t.length);
        let e = r - 1;
        for(; e >= 0 && (t[e] & 192) === 128;)e--;
        return e < 0 || e === 0 ? r : e + Qe[t[e]] > r ? e : r;
    }, tr = {
        string2buf: El,
        buf2string: Sl,
        utf8border: Bl
    };
    function Il() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
    }
    var Oa = Il;
    const Za = Object.prototype.toString, { Z_NO_FLUSH: vl, Z_SYNC_FLUSH: Al, Z_FULL_FLUSH: Tl, Z_FINISH: xl, Z_OK: Cr, Z_STREAM_END: Ul, Z_DEFAULT_COMPRESSION: Cl, Z_DEFAULT_STRATEGY: Rl, Z_DEFLATED: Nl } = ir;
    function sr(t) {
        this.options = Zr.assign({
            level: Cl,
            method: Nl,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: Rl
        }, t || {});
        let r = this.options;
        r.raw && r.windowBits > 0 ? r.windowBits = -r.windowBits : r.gzip && r.windowBits > 0 && r.windowBits < 16 && (r.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Oa, this.strm.avail_out = 0;
        let e = Ve.deflateInit2(this.strm, r.level, r.method, r.windowBits, r.memLevel, r.strategy);
        if (e !== Cr) throw new Error(he[e]);
        if (r.header && Ve.deflateSetHeader(this.strm, r.header), r.dictionary) {
            let n;
            if (typeof r.dictionary == "string" ? n = tr.string2buf(r.dictionary) : Za.call(r.dictionary) === "[object ArrayBuffer]" ? n = new Uint8Array(r.dictionary) : n = r.dictionary, e = Ve.deflateSetDictionary(this.strm, n), e !== Cr) throw new Error(he[e]);
            this._dict_set = !0;
        }
    }
    sr.prototype.push = function(t, r) {
        const e = this.strm, n = this.options.chunkSize;
        let i, a;
        if (this.ended) return !1;
        for(r === ~~r ? a = r : a = r === !0 ? xl : vl, typeof t == "string" ? e.input = tr.string2buf(t) : Za.call(t) === "[object ArrayBuffer]" ? e.input = new Uint8Array(t) : e.input = t, e.next_in = 0, e.avail_in = e.input.length;;){
            if (e.avail_out === 0 && (e.output = new Uint8Array(n), e.next_out = 0, e.avail_out = n), (a === Al || a === Tl) && e.avail_out <= 6) {
                this.onData(e.output.subarray(0, e.next_out)), e.avail_out = 0;
                continue;
            }
            if (i = Ve.deflate(e, a), i === Ul) return e.next_out > 0 && this.onData(e.output.subarray(0, e.next_out)), i = Ve.deflateEnd(this.strm), this.onEnd(i), this.ended = !0, i === Cr;
            if (e.avail_out === 0) {
                this.onData(e.output);
                continue;
            }
            if (a > 0 && e.next_out > 0) {
                this.onData(e.output.subarray(0, e.next_out)), e.avail_out = 0;
                continue;
            }
            if (e.avail_in === 0) break;
        }
        return !0;
    };
    sr.prototype.onData = function(t) {
        this.chunks.push(t);
    };
    sr.prototype.onEnd = function(t) {
        t === Cr && (this.result = Zr.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
    };
    function Dn(t, r) {
        const e = new sr(r);
        if (e.push(t, !0), e.err) throw e.msg || he[e.err];
        return e.result;
    }
    function zl(t, r) {
        return r = r || {}, r.raw = !0, Dn(t, r);
    }
    function Dl(t, r) {
        return r = r || {}, r.gzip = !0, Dn(t, r);
    }
    var Ol = sr, Zl = Dn, Ll = zl, Ml = Dl, Fl = {
        Deflate: Ol,
        deflate: Zl,
        deflateRaw: Ll,
        gzip: Ml
    };
    const dr = 16209, Pl = 16191;
    var Hl = function(r, e) {
        let n, i, a, s, l, p, u, d, b, g, y, v, I, T, C, M, D, B, F, G, O, K, W, P;
        const H = r.state;
        n = r.next_in, W = r.input, i = n + (r.avail_in - 5), a = r.next_out, P = r.output, s = a - (e - r.avail_out), l = a + (r.avail_out - 257), p = H.dmax, u = H.wsize, d = H.whave, b = H.wnext, g = H.window, y = H.hold, v = H.bits, I = H.lencode, T = H.distcode, C = (1 << H.lenbits) - 1, M = (1 << H.distbits) - 1;
        t: do {
            v < 15 && (y += W[n++] << v, v += 8, y += W[n++] << v, v += 8), D = I[y & C];
            e: for(;;){
                if (B = D >>> 24, y >>>= B, v -= B, B = D >>> 16 & 255, B === 0) P[a++] = D & 65535;
                else if (B & 16) {
                    F = D & 65535, B &= 15, B && (v < B && (y += W[n++] << v, v += 8), F += y & (1 << B) - 1, y >>>= B, v -= B), v < 15 && (y += W[n++] << v, v += 8, y += W[n++] << v, v += 8), D = T[y & M];
                    r: for(;;){
                        if (B = D >>> 24, y >>>= B, v -= B, B = D >>> 16 & 255, B & 16) {
                            if (G = D & 65535, B &= 15, v < B && (y += W[n++] << v, v += 8, v < B && (y += W[n++] << v, v += 8)), G += y & (1 << B) - 1, G > p) {
                                r.msg = "invalid distance too far back", H.mode = dr;
                                break t;
                            }
                            if (y >>>= B, v -= B, B = a - s, G > B) {
                                if (B = G - B, B > d && H.sane) {
                                    r.msg = "invalid distance too far back", H.mode = dr;
                                    break t;
                                }
                                if (O = 0, K = g, b === 0) {
                                    if (O += u - B, B < F) {
                                        F -= B;
                                        do P[a++] = g[O++];
                                        while (--B);
                                        O = a - G, K = P;
                                    }
                                } else if (b < B) {
                                    if (O += u + b - B, B -= b, B < F) {
                                        F -= B;
                                        do P[a++] = g[O++];
                                        while (--B);
                                        if (O = 0, b < F) {
                                            B = b, F -= B;
                                            do P[a++] = g[O++];
                                            while (--B);
                                            O = a - G, K = P;
                                        }
                                    }
                                } else if (O += b - B, B < F) {
                                    F -= B;
                                    do P[a++] = g[O++];
                                    while (--B);
                                    O = a - G, K = P;
                                }
                                for(; F > 2;)P[a++] = K[O++], P[a++] = K[O++], P[a++] = K[O++], F -= 3;
                                F && (P[a++] = K[O++], F > 1 && (P[a++] = K[O++]));
                            } else {
                                O = a - G;
                                do P[a++] = P[O++], P[a++] = P[O++], P[a++] = P[O++], F -= 3;
                                while (F > 2);
                                F && (P[a++] = P[O++], F > 1 && (P[a++] = P[O++]));
                            }
                        } else if (B & 64) {
                            r.msg = "invalid distance code", H.mode = dr;
                            break t;
                        } else {
                            D = T[(D & 65535) + (y & (1 << B) - 1)];
                            continue r;
                        }
                        break;
                    }
                } else if (B & 64) if (B & 32) {
                    H.mode = Pl;
                    break t;
                } else {
                    r.msg = "invalid literal/length code", H.mode = dr;
                    break t;
                }
                else {
                    D = I[(D & 65535) + (y & (1 << B) - 1)];
                    continue e;
                }
                break;
            }
        }while (n < i && a < l);
        F = v >> 3, n -= F, v -= F << 3, y &= (1 << v) - 1, r.next_in = n, r.next_out = a, r.avail_in = n < i ? 5 + (i - n) : 5 - (n - i), r.avail_out = a < l ? 257 + (l - a) : 257 - (a - l), H.hold = y, H.bits = v;
    };
    const be = 15, si = 852, oi = 592, li = 0, Jr = 1, ci = 2, Wl = new Uint16Array([
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        13,
        15,
        17,
        19,
        23,
        27,
        31,
        35,
        43,
        51,
        59,
        67,
        83,
        99,
        115,
        131,
        163,
        195,
        227,
        258,
        0,
        0
    ]), Vl = new Uint8Array([
        16,
        16,
        16,
        16,
        16,
        16,
        16,
        16,
        17,
        17,
        17,
        17,
        18,
        18,
        18,
        18,
        19,
        19,
        19,
        19,
        20,
        20,
        20,
        20,
        21,
        21,
        21,
        21,
        16,
        72,
        78
    ]), $l = new Uint16Array([
        1,
        2,
        3,
        4,
        5,
        7,
        9,
        13,
        17,
        25,
        33,
        49,
        65,
        97,
        129,
        193,
        257,
        385,
        513,
        769,
        1025,
        1537,
        2049,
        3073,
        4097,
        6145,
        8193,
        12289,
        16385,
        24577,
        0,
        0
    ]), Yl = new Uint8Array([
        16,
        16,
        16,
        16,
        17,
        17,
        18,
        18,
        19,
        19,
        20,
        20,
        21,
        21,
        22,
        22,
        23,
        23,
        24,
        24,
        25,
        25,
        26,
        26,
        27,
        27,
        28,
        28,
        29,
        29,
        64,
        64
    ]), Gl = (t, r, e, n, i, a, s, l)=>{
        const p = l.bits;
        let u = 0, d = 0, b = 0, g = 0, y = 0, v = 0, I = 0, T = 0, C = 0, M = 0, D, B, F, G, O, K = null, W;
        const P = new Uint16Array(be + 1), H = new Uint16Array(be + 1);
        let _t = null, E, N, U;
        for(u = 0; u <= be; u++)P[u] = 0;
        for(d = 0; d < n; d++)P[r[e + d]]++;
        for(y = p, g = be; g >= 1 && P[g] === 0; g--);
        if (y > g && (y = g), g === 0) return i[a++] = 1 << 24 | 64 << 16 | 0, i[a++] = 1 << 24 | 64 << 16 | 0, l.bits = 1, 0;
        for(b = 1; b < g && P[b] === 0; b++);
        for(y < b && (y = b), T = 1, u = 1; u <= be; u++)if (T <<= 1, T -= P[u], T < 0) return -1;
        if (T > 0 && (t === li || g !== 1)) return -1;
        for(H[1] = 0, u = 1; u < be; u++)H[u + 1] = H[u] + P[u];
        for(d = 0; d < n; d++)r[e + d] !== 0 && (s[H[r[e + d]]++] = d);
        if (t === li ? (K = _t = s, W = 20) : t === Jr ? (K = Wl, _t = Vl, W = 257) : (K = $l, _t = Yl, W = 0), M = 0, d = 0, u = b, O = a, v = y, I = 0, F = -1, C = 1 << y, G = C - 1, t === Jr && C > si || t === ci && C > oi) return 1;
        for(;;){
            E = u - I, s[d] + 1 < W ? (N = 0, U = s[d]) : s[d] >= W ? (N = _t[s[d] - W], U = K[s[d] - W]) : (N = 96, U = 0), D = 1 << u - I, B = 1 << v, b = B;
            do B -= D, i[O + (M >> I) + B] = E << 24 | N << 16 | U | 0;
            while (B !== 0);
            for(D = 1 << u - 1; M & D;)D >>= 1;
            if (D !== 0 ? (M &= D - 1, M += D) : M = 0, d++, --P[u] === 0) {
                if (u === g) break;
                u = r[e + s[d]];
            }
            if (u > y && (M & G) !== F) {
                for(I === 0 && (I = y), O += b, v = u - I, T = 1 << v; v + I < g && (T -= P[v + I], !(T <= 0));)v++, T <<= 1;
                if (C += 1 << v, t === Jr && C > si || t === ci && C > oi) return 1;
                F = M & G, i[F] = y << 24 | v << 16 | O - a | 0;
            }
        }
        return M !== 0 && (i[O + M] = u - I << 24 | 64 << 16 | 0), l.bits = y, 0;
    };
    var $e = Gl;
    const Kl = 0, La = 1, Ma = 2, { Z_FINISH: ui, Z_BLOCK: jl, Z_TREES: _r, Z_OK: de, Z_STREAM_END: Xl, Z_NEED_DICT: ql, Z_STREAM_ERROR: Dt, Z_DATA_ERROR: Fa, Z_MEM_ERROR: Pa, Z_BUF_ERROR: Jl, Z_DEFLATED: fi } = ir, Lr = 16180, hi = 16181, pi = 16182, di = 16183, _i = 16184, mi = 16185, wi = 16186, gi = 16187, yi = 16188, bi = 16189, Rr = 16190, Yt = 16191, Qr = 16192, Ei = 16193, tn = 16194, ki = 16195, Si = 16196, Bi = 16197, Ii = 16198, mr = 16199, wr = 16200, vi = 16201, Ai = 16202, Ti = 16203, xi = 16204, Ui = 16205, en = 16206, Ci = 16207, Ri = 16208, ct = 16209, Ha = 16210, Wa = 16211, Ql = 852, tc = 592, ec = 15, rc = ec, Ni = (t)=>(t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
    function nc() {
        this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
    }
    const _e = (t)=>{
        if (!t) return 1;
        const r = t.state;
        return !r || r.strm !== t || r.mode < Lr || r.mode > Wa ? 1 : 0;
    }, Va = (t)=>{
        if (_e(t)) return Dt;
        const r = t.state;
        return t.total_in = t.total_out = r.total = 0, t.msg = "", r.wrap && (t.adler = r.wrap & 1), r.mode = Lr, r.last = 0, r.havedict = 0, r.flags = -1, r.dmax = 32768, r.head = null, r.hold = 0, r.bits = 0, r.lencode = r.lendyn = new Int32Array(Ql), r.distcode = r.distdyn = new Int32Array(tc), r.sane = 1, r.back = -1, de;
    }, $a = (t)=>{
        if (_e(t)) return Dt;
        const r = t.state;
        return r.wsize = 0, r.whave = 0, r.wnext = 0, Va(t);
    }, Ya = (t, r)=>{
        let e;
        if (_e(t)) return Dt;
        const n = t.state;
        return r < 0 ? (e = 0, r = -r) : (e = (r >> 4) + 5, r < 48 && (r &= 15)), r && (r < 8 || r > 15) ? Dt : (n.window !== null && n.wbits !== r && (n.window = null), n.wrap = e, n.wbits = r, $a(t));
    }, Ga = (t, r)=>{
        if (!t) return Dt;
        const e = new nc;
        t.state = e, e.strm = t, e.window = null, e.mode = Lr;
        const n = Ya(t, r);
        return n !== de && (t.state = null), n;
    }, ic = (t)=>Ga(t, rc);
    let zi = !0, rn, nn;
    const ac = (t)=>{
        if (zi) {
            rn = new Int32Array(512), nn = new Int32Array(32);
            let r = 0;
            for(; r < 144;)t.lens[r++] = 8;
            for(; r < 256;)t.lens[r++] = 9;
            for(; r < 280;)t.lens[r++] = 7;
            for(; r < 288;)t.lens[r++] = 8;
            for($e(La, t.lens, 0, 288, rn, 0, t.work, {
                bits: 9
            }), r = 0; r < 32;)t.lens[r++] = 5;
            $e(Ma, t.lens, 0, 32, nn, 0, t.work, {
                bits: 5
            }), zi = !1;
        }
        t.lencode = rn, t.lenbits = 9, t.distcode = nn, t.distbits = 5;
    }, Ka = (t, r, e, n)=>{
        let i;
        const a = t.state;
        return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Uint8Array(a.wsize)), n >= a.wsize ? (a.window.set(r.subarray(e - a.wsize, e), 0), a.wnext = 0, a.whave = a.wsize) : (i = a.wsize - a.wnext, i > n && (i = n), a.window.set(r.subarray(e - n, e - n + i), a.wnext), n -= i, n ? (a.window.set(r.subarray(e - n, e), 0), a.wnext = n, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0;
    }, sc = (t, r)=>{
        let e, n, i, a, s, l, p, u, d, b, g, y, v, I, T = 0, C, M, D, B, F, G, O, K;
        const W = new Uint8Array(4);
        let P, H;
        const _t = new Uint8Array([
            16,
            17,
            18,
            0,
            8,
            7,
            9,
            6,
            10,
            5,
            11,
            4,
            12,
            3,
            13,
            2,
            14,
            1,
            15
        ]);
        if (_e(t) || !t.output || !t.input && t.avail_in !== 0) return Dt;
        e = t.state, e.mode === Yt && (e.mode = Qr), s = t.next_out, i = t.output, p = t.avail_out, a = t.next_in, n = t.input, l = t.avail_in, u = e.hold, d = e.bits, b = l, g = p, K = de;
        t: for(;;)switch(e.mode){
            case Lr:
                if (e.wrap === 0) {
                    e.mode = Qr;
                    break;
                }
                for(; d < 16;){
                    if (l === 0) break t;
                    l--, u += n[a++] << d, d += 8;
                }
                if (e.wrap & 2 && u === 35615) {
                    e.wbits === 0 && (e.wbits = 15), e.check = 0, W[0] = u & 255, W[1] = u >>> 8 & 255, e.check = wt(e.check, W, 2, 0), u = 0, d = 0, e.mode = hi;
                    break;
                }
                if (e.head && (e.head.done = !1), !(e.wrap & 1) || (((u & 255) << 8) + (u >> 8)) % 31) {
                    t.msg = "incorrect header check", e.mode = ct;
                    break;
                }
                if ((u & 15) !== fi) {
                    t.msg = "unknown compression method", e.mode = ct;
                    break;
                }
                if (u >>>= 4, d -= 4, O = (u & 15) + 8, e.wbits === 0 && (e.wbits = O), O > 15 || O > e.wbits) {
                    t.msg = "invalid window size", e.mode = ct;
                    break;
                }
                e.dmax = 1 << e.wbits, e.flags = 0, t.adler = e.check = 1, e.mode = u & 512 ? bi : Yt, u = 0, d = 0;
                break;
            case hi:
                for(; d < 16;){
                    if (l === 0) break t;
                    l--, u += n[a++] << d, d += 8;
                }
                if (e.flags = u, (e.flags & 255) !== fi) {
                    t.msg = "unknown compression method", e.mode = ct;
                    break;
                }
                if (e.flags & 57344) {
                    t.msg = "unknown header flags set", e.mode = ct;
                    break;
                }
                e.head && (e.head.text = u >> 8 & 1), e.flags & 512 && e.wrap & 4 && (W[0] = u & 255, W[1] = u >>> 8 & 255, e.check = wt(e.check, W, 2, 0)), u = 0, d = 0, e.mode = pi;
            case pi:
                for(; d < 32;){
                    if (l === 0) break t;
                    l--, u += n[a++] << d, d += 8;
                }
                e.head && (e.head.time = u), e.flags & 512 && e.wrap & 4 && (W[0] = u & 255, W[1] = u >>> 8 & 255, W[2] = u >>> 16 & 255, W[3] = u >>> 24 & 255, e.check = wt(e.check, W, 4, 0)), u = 0, d = 0, e.mode = di;
            case di:
                for(; d < 16;){
                    if (l === 0) break t;
                    l--, u += n[a++] << d, d += 8;
                }
                e.head && (e.head.xflags = u & 255, e.head.os = u >> 8), e.flags & 512 && e.wrap & 4 && (W[0] = u & 255, W[1] = u >>> 8 & 255, e.check = wt(e.check, W, 2, 0)), u = 0, d = 0, e.mode = _i;
            case _i:
                if (e.flags & 1024) {
                    for(; d < 16;){
                        if (l === 0) break t;
                        l--, u += n[a++] << d, d += 8;
                    }
                    e.length = u, e.head && (e.head.extra_len = u), e.flags & 512 && e.wrap & 4 && (W[0] = u & 255, W[1] = u >>> 8 & 255, e.check = wt(e.check, W, 2, 0)), u = 0, d = 0;
                } else e.head && (e.head.extra = null);
                e.mode = mi;
            case mi:
                if (e.flags & 1024 && (y = e.length, y > l && (y = l), y && (e.head && (O = e.head.extra_len - e.length, e.head.extra || (e.head.extra = new Uint8Array(e.head.extra_len)), e.head.extra.set(n.subarray(a, a + y), O)), e.flags & 512 && e.wrap & 4 && (e.check = wt(e.check, n, y, a)), l -= y, a += y, e.length -= y), e.length)) break t;
                e.length = 0, e.mode = wi;
            case wi:
                if (e.flags & 2048) {
                    if (l === 0) break t;
                    y = 0;
                    do O = n[a + y++], e.head && O && e.length < 65536 && (e.head.name += String.fromCharCode(O));
                    while (O && y < l);
                    if (e.flags & 512 && e.wrap & 4 && (e.check = wt(e.check, n, y, a)), l -= y, a += y, O) break t;
                } else e.head && (e.head.name = null);
                e.length = 0, e.mode = gi;
            case gi:
                if (e.flags & 4096) {
                    if (l === 0) break t;
                    y = 0;
                    do O = n[a + y++], e.head && O && e.length < 65536 && (e.head.comment += String.fromCharCode(O));
                    while (O && y < l);
                    if (e.flags & 512 && e.wrap & 4 && (e.check = wt(e.check, n, y, a)), l -= y, a += y, O) break t;
                } else e.head && (e.head.comment = null);
                e.mode = yi;
            case yi:
                if (e.flags & 512) {
                    for(; d < 16;){
                        if (l === 0) break t;
                        l--, u += n[a++] << d, d += 8;
                    }
                    if (e.wrap & 4 && u !== (e.check & 65535)) {
                        t.msg = "header crc mismatch", e.mode = ct;
                        break;
                    }
                    u = 0, d = 0;
                }
                e.head && (e.head.hcrc = e.flags >> 9 & 1, e.head.done = !0), t.adler = e.check = 0, e.mode = Yt;
                break;
            case bi:
                for(; d < 32;){
                    if (l === 0) break t;
                    l--, u += n[a++] << d, d += 8;
                }
                t.adler = e.check = Ni(u), u = 0, d = 0, e.mode = Rr;
            case Rr:
                if (e.havedict === 0) return t.next_out = s, t.avail_out = p, t.next_in = a, t.avail_in = l, e.hold = u, e.bits = d, ql;
                t.adler = e.check = 1, e.mode = Yt;
            case Yt:
                if (r === jl || r === _r) break t;
            case Qr:
                if (e.last) {
                    u >>>= d & 7, d -= d & 7, e.mode = en;
                    break;
                }
                for(; d < 3;){
                    if (l === 0) break t;
                    l--, u += n[a++] << d, d += 8;
                }
                switch(e.last = u & 1, u >>>= 1, d -= 1, u & 3){
                    case 0:
                        e.mode = Ei;
                        break;
                    case 1:
                        if (ac(e), e.mode = mr, r === _r) {
                            u >>>= 2, d -= 2;
                            break t;
                        }
                        break;
                    case 2:
                        e.mode = Si;
                        break;
                    case 3:
                        t.msg = "invalid block type", e.mode = ct;
                }
                u >>>= 2, d -= 2;
                break;
            case Ei:
                for(u >>>= d & 7, d -= d & 7; d < 32;){
                    if (l === 0) break t;
                    l--, u += n[a++] << d, d += 8;
                }
                if ((u & 65535) !== (u >>> 16 ^ 65535)) {
                    t.msg = "invalid stored block lengths", e.mode = ct;
                    break;
                }
                if (e.length = u & 65535, u = 0, d = 0, e.mode = tn, r === _r) break t;
            case tn:
                e.mode = ki;
            case ki:
                if (y = e.length, y) {
                    if (y > l && (y = l), y > p && (y = p), y === 0) break t;
                    i.set(n.subarray(a, a + y), s), l -= y, a += y, p -= y, s += y, e.length -= y;
                    break;
                }
                e.mode = Yt;
                break;
            case Si:
                for(; d < 14;){
                    if (l === 0) break t;
                    l--, u += n[a++] << d, d += 8;
                }
                if (e.nlen = (u & 31) + 257, u >>>= 5, d -= 5, e.ndist = (u & 31) + 1, u >>>= 5, d -= 5, e.ncode = (u & 15) + 4, u >>>= 4, d -= 4, e.nlen > 286 || e.ndist > 30) {
                    t.msg = "too many length or distance symbols", e.mode = ct;
                    break;
                }
                e.have = 0, e.mode = Bi;
            case Bi:
                for(; e.have < e.ncode;){
                    for(; d < 3;){
                        if (l === 0) break t;
                        l--, u += n[a++] << d, d += 8;
                    }
                    e.lens[_t[e.have++]] = u & 7, u >>>= 3, d -= 3;
                }
                for(; e.have < 19;)e.lens[_t[e.have++]] = 0;
                if (e.lencode = e.lendyn, e.lenbits = 7, P = {
                    bits: e.lenbits
                }, K = $e(Kl, e.lens, 0, 19, e.lencode, 0, e.work, P), e.lenbits = P.bits, K) {
                    t.msg = "invalid code lengths set", e.mode = ct;
                    break;
                }
                e.have = 0, e.mode = Ii;
            case Ii:
                for(; e.have < e.nlen + e.ndist;){
                    for(; T = e.lencode[u & (1 << e.lenbits) - 1], C = T >>> 24, M = T >>> 16 & 255, D = T & 65535, !(C <= d);){
                        if (l === 0) break t;
                        l--, u += n[a++] << d, d += 8;
                    }
                    if (D < 16) u >>>= C, d -= C, e.lens[e.have++] = D;
                    else {
                        if (D === 16) {
                            for(H = C + 2; d < H;){
                                if (l === 0) break t;
                                l--, u += n[a++] << d, d += 8;
                            }
                            if (u >>>= C, d -= C, e.have === 0) {
                                t.msg = "invalid bit length repeat", e.mode = ct;
                                break;
                            }
                            O = e.lens[e.have - 1], y = 3 + (u & 3), u >>>= 2, d -= 2;
                        } else if (D === 17) {
                            for(H = C + 3; d < H;){
                                if (l === 0) break t;
                                l--, u += n[a++] << d, d += 8;
                            }
                            u >>>= C, d -= C, O = 0, y = 3 + (u & 7), u >>>= 3, d -= 3;
                        } else {
                            for(H = C + 7; d < H;){
                                if (l === 0) break t;
                                l--, u += n[a++] << d, d += 8;
                            }
                            u >>>= C, d -= C, O = 0, y = 11 + (u & 127), u >>>= 7, d -= 7;
                        }
                        if (e.have + y > e.nlen + e.ndist) {
                            t.msg = "invalid bit length repeat", e.mode = ct;
                            break;
                        }
                        for(; y--;)e.lens[e.have++] = O;
                    }
                }
                if (e.mode === ct) break;
                if (e.lens[256] === 0) {
                    t.msg = "invalid code -- missing end-of-block", e.mode = ct;
                    break;
                }
                if (e.lenbits = 9, P = {
                    bits: e.lenbits
                }, K = $e(La, e.lens, 0, e.nlen, e.lencode, 0, e.work, P), e.lenbits = P.bits, K) {
                    t.msg = "invalid literal/lengths set", e.mode = ct;
                    break;
                }
                if (e.distbits = 6, e.distcode = e.distdyn, P = {
                    bits: e.distbits
                }, K = $e(Ma, e.lens, e.nlen, e.ndist, e.distcode, 0, e.work, P), e.distbits = P.bits, K) {
                    t.msg = "invalid distances set", e.mode = ct;
                    break;
                }
                if (e.mode = mr, r === _r) break t;
            case mr:
                e.mode = wr;
            case wr:
                if (l >= 6 && p >= 258) {
                    t.next_out = s, t.avail_out = p, t.next_in = a, t.avail_in = l, e.hold = u, e.bits = d, Hl(t, g), s = t.next_out, i = t.output, p = t.avail_out, a = t.next_in, n = t.input, l = t.avail_in, u = e.hold, d = e.bits, e.mode === Yt && (e.back = -1);
                    break;
                }
                for(e.back = 0; T = e.lencode[u & (1 << e.lenbits) - 1], C = T >>> 24, M = T >>> 16 & 255, D = T & 65535, !(C <= d);){
                    if (l === 0) break t;
                    l--, u += n[a++] << d, d += 8;
                }
                if (M && !(M & 240)) {
                    for(B = C, F = M, G = D; T = e.lencode[G + ((u & (1 << B + F) - 1) >> B)], C = T >>> 24, M = T >>> 16 & 255, D = T & 65535, !(B + C <= d);){
                        if (l === 0) break t;
                        l--, u += n[a++] << d, d += 8;
                    }
                    u >>>= B, d -= B, e.back += B;
                }
                if (u >>>= C, d -= C, e.back += C, e.length = D, M === 0) {
                    e.mode = Ui;
                    break;
                }
                if (M & 32) {
                    e.back = -1, e.mode = Yt;
                    break;
                }
                if (M & 64) {
                    t.msg = "invalid literal/length code", e.mode = ct;
                    break;
                }
                e.extra = M & 15, e.mode = vi;
            case vi:
                if (e.extra) {
                    for(H = e.extra; d < H;){
                        if (l === 0) break t;
                        l--, u += n[a++] << d, d += 8;
                    }
                    e.length += u & (1 << e.extra) - 1, u >>>= e.extra, d -= e.extra, e.back += e.extra;
                }
                e.was = e.length, e.mode = Ai;
            case Ai:
                for(; T = e.distcode[u & (1 << e.distbits) - 1], C = T >>> 24, M = T >>> 16 & 255, D = T & 65535, !(C <= d);){
                    if (l === 0) break t;
                    l--, u += n[a++] << d, d += 8;
                }
                if (!(M & 240)) {
                    for(B = C, F = M, G = D; T = e.distcode[G + ((u & (1 << B + F) - 1) >> B)], C = T >>> 24, M = T >>> 16 & 255, D = T & 65535, !(B + C <= d);){
                        if (l === 0) break t;
                        l--, u += n[a++] << d, d += 8;
                    }
                    u >>>= B, d -= B, e.back += B;
                }
                if (u >>>= C, d -= C, e.back += C, M & 64) {
                    t.msg = "invalid distance code", e.mode = ct;
                    break;
                }
                e.offset = D, e.extra = M & 15, e.mode = Ti;
            case Ti:
                if (e.extra) {
                    for(H = e.extra; d < H;){
                        if (l === 0) break t;
                        l--, u += n[a++] << d, d += 8;
                    }
                    e.offset += u & (1 << e.extra) - 1, u >>>= e.extra, d -= e.extra, e.back += e.extra;
                }
                if (e.offset > e.dmax) {
                    t.msg = "invalid distance too far back", e.mode = ct;
                    break;
                }
                e.mode = xi;
            case xi:
                if (p === 0) break t;
                if (y = g - p, e.offset > y) {
                    if (y = e.offset - y, y > e.whave && e.sane) {
                        t.msg = "invalid distance too far back", e.mode = ct;
                        break;
                    }
                    y > e.wnext ? (y -= e.wnext, v = e.wsize - y) : v = e.wnext - y, y > e.length && (y = e.length), I = e.window;
                } else I = i, v = s - e.offset, y = e.length;
                y > p && (y = p), p -= y, e.length -= y;
                do i[s++] = I[v++];
                while (--y);
                e.length === 0 && (e.mode = wr);
                break;
            case Ui:
                if (p === 0) break t;
                i[s++] = e.length, p--, e.mode = wr;
                break;
            case en:
                if (e.wrap) {
                    for(; d < 32;){
                        if (l === 0) break t;
                        l--, u |= n[a++] << d, d += 8;
                    }
                    if (g -= p, t.total_out += g, e.total += g, e.wrap & 4 && g && (t.adler = e.check = e.flags ? wt(e.check, i, g, s - g) : Je(e.check, i, g, s - g)), g = p, e.wrap & 4 && (e.flags ? u : Ni(u)) !== e.check) {
                        t.msg = "incorrect data check", e.mode = ct;
                        break;
                    }
                    u = 0, d = 0;
                }
                e.mode = Ci;
            case Ci:
                if (e.wrap && e.flags) {
                    for(; d < 32;){
                        if (l === 0) break t;
                        l--, u += n[a++] << d, d += 8;
                    }
                    if (e.wrap & 4 && u !== (e.total & 4294967295)) {
                        t.msg = "incorrect length check", e.mode = ct;
                        break;
                    }
                    u = 0, d = 0;
                }
                e.mode = Ri;
            case Ri:
                K = Xl;
                break t;
            case ct:
                K = Fa;
                break t;
            case Ha:
                return Pa;
            case Wa:
            default:
                return Dt;
        }
        return t.next_out = s, t.avail_out = p, t.next_in = a, t.avail_in = l, e.hold = u, e.bits = d, (e.wsize || g !== t.avail_out && e.mode < ct && (e.mode < en || r !== ui)) && Ka(t, t.output, t.next_out, g - t.avail_out), b -= t.avail_in, g -= t.avail_out, t.total_in += b, t.total_out += g, e.total += g, e.wrap & 4 && g && (t.adler = e.check = e.flags ? wt(e.check, i, g, t.next_out - g) : Je(e.check, i, g, t.next_out - g)), t.data_type = e.bits + (e.last ? 64 : 0) + (e.mode === Yt ? 128 : 0) + (e.mode === mr || e.mode === tn ? 256 : 0), (b === 0 && g === 0 || r === ui) && K === de && (K = Jl), K;
    }, oc = (t)=>{
        if (_e(t)) return Dt;
        let r = t.state;
        return r.window && (r.window = null), t.state = null, de;
    }, lc = (t, r)=>{
        if (_e(t)) return Dt;
        const e = t.state;
        return e.wrap & 2 ? (e.head = r, r.done = !1, de) : Dt;
    }, cc = (t, r)=>{
        const e = r.length;
        let n, i, a;
        return _e(t) || (n = t.state, n.wrap !== 0 && n.mode !== Rr) ? Dt : n.mode === Rr && (i = 1, i = Je(i, r, e, 0), i !== n.check) ? Fa : (a = Ka(t, r, e, e), a ? (n.mode = Ha, Pa) : (n.havedict = 1, de));
    };
    var uc = $a, fc = Ya, hc = Va, pc = ic, dc = Ga, _c = sc, mc = oc, wc = lc, gc = cc, yc = "pako inflate (from Nodeca project)", Kt = {
        inflateReset: uc,
        inflateReset2: fc,
        inflateResetKeep: hc,
        inflateInit: pc,
        inflateInit2: dc,
        inflate: _c,
        inflateEnd: mc,
        inflateGetHeader: wc,
        inflateSetDictionary: gc,
        inflateInfo: yc
    };
    function bc() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
    }
    var Ec = bc;
    const ja = Object.prototype.toString, { Z_NO_FLUSH: kc, Z_FINISH: Sc, Z_OK: er, Z_STREAM_END: an, Z_NEED_DICT: sn, Z_STREAM_ERROR: Bc, Z_DATA_ERROR: Di, Z_MEM_ERROR: Ic } = ir;
    function or(t) {
        this.options = Zr.assign({
            chunkSize: 1024 * 64,
            windowBits: 15,
            to: ""
        }, t || {});
        const r = this.options;
        r.raw && r.windowBits >= 0 && r.windowBits < 16 && (r.windowBits = -r.windowBits, r.windowBits === 0 && (r.windowBits = -15)), r.windowBits >= 0 && r.windowBits < 16 && !(t && t.windowBits) && (r.windowBits += 32), r.windowBits > 15 && r.windowBits < 48 && (r.windowBits & 15 || (r.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Oa, this.strm.avail_out = 0;
        let e = Kt.inflateInit2(this.strm, r.windowBits);
        if (e !== er) throw new Error(he[e]);
        if (this.header = new Ec, Kt.inflateGetHeader(this.strm, this.header), r.dictionary && (typeof r.dictionary == "string" ? r.dictionary = tr.string2buf(r.dictionary) : ja.call(r.dictionary) === "[object ArrayBuffer]" && (r.dictionary = new Uint8Array(r.dictionary)), r.raw && (e = Kt.inflateSetDictionary(this.strm, r.dictionary), e !== er))) throw new Error(he[e]);
    }
    or.prototype.push = function(t, r) {
        const e = this.strm, n = this.options.chunkSize, i = this.options.dictionary;
        let a, s, l;
        if (this.ended) return !1;
        for(r === ~~r ? s = r : s = r === !0 ? Sc : kc, ja.call(t) === "[object ArrayBuffer]" ? e.input = new Uint8Array(t) : e.input = t, e.next_in = 0, e.avail_in = e.input.length;;){
            for(e.avail_out === 0 && (e.output = new Uint8Array(n), e.next_out = 0, e.avail_out = n), a = Kt.inflate(e, s), a === sn && i && (a = Kt.inflateSetDictionary(e, i), a === er ? a = Kt.inflate(e, s) : a === Di && (a = sn)); e.avail_in > 0 && a === an && e.state.wrap > 0 && t[e.next_in] !== 0;)Kt.inflateReset(e), a = Kt.inflate(e, s);
            switch(a){
                case Bc:
                case Di:
                case sn:
                case Ic:
                    return this.onEnd(a), this.ended = !0, !1;
            }
            if (l = e.avail_out, e.next_out && (e.avail_out === 0 || a === an)) if (this.options.to === "string") {
                let p = tr.utf8border(e.output, e.next_out), u = e.next_out - p, d = tr.buf2string(e.output, p);
                e.next_out = u, e.avail_out = n - u, u && e.output.set(e.output.subarray(p, p + u), 0), this.onData(d);
            } else this.onData(e.output.length === e.next_out ? e.output : e.output.subarray(0, e.next_out));
            if (!(a === er && l === 0)) {
                if (a === an) return a = Kt.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
                if (e.avail_in === 0) break;
            }
        }
        return !0;
    };
    or.prototype.onData = function(t) {
        this.chunks.push(t);
    };
    or.prototype.onEnd = function(t) {
        t === er && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Zr.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
    };
    function On(t, r) {
        const e = new or(r);
        if (e.push(t), e.err) throw e.msg || he[e.err];
        return e.result;
    }
    function vc(t, r) {
        return r = r || {}, r.raw = !0, On(t, r);
    }
    var Ac = or, Tc = On, xc = vc, Uc = On, Cc = {
        Inflate: Ac,
        inflate: Tc,
        inflateRaw: xc,
        ungzip: Uc
    };
    const { Deflate: Rc, deflate: Nc, deflateRaw: zc, gzip: Dc } = Fl, { Inflate: Oc, inflate: Zc, inflateRaw: Lc, ungzip: Mc } = Cc;
    var Fc = Rc, Pc = Nc, Hc = zc, Wc = Dc, Vc = Oc, $c = Zc, Yc = Lc, Gc = Mc, Kc = ir, jc = {
        Deflate: Fc,
        deflate: Pc,
        deflateRaw: Hc,
        gzip: Wc,
        Inflate: Vc,
        inflate: $c,
        inflateRaw: Yc,
        ungzip: Gc,
        constants: Kc
    };
    async function Xc(t, r) {
        let e;
        if (r) {
            const l = t ? "-threads" : "", p = r.split("/").slice(0, -1).join("/"), u = r.split("/").pop(), [d, ...b] = u.split(".");
            e = `${p}/${d}${l}.${b.join(".")}`;
        } else e = t ? (await Wn(async ()=>{
            const { default: l } = await import("./barretenberg-threads-CEUSJ7or.js");
            return {
                default: l
            };
        }, [], import.meta.url)).default : (await Wn(async ()=>{
            const { default: l } = await import("./barretenberg-Dfd87FCq.js");
            return {
                default: l
            };
        }, [], import.meta.url)).default;
        const i = await (await fetch(e)).arrayBuffer(), a = new Uint8Array(i);
        return a[0] === 31 && a[1] === 139 && a[2] === 8 ? jc.ungzip(a).buffer : a;
    }
    async function Xa(t = 32, r, e = Vt()("bb.js:fetch_mat")) {
        const n = ha(), i = n ? await qc(e) : 1, a = Math.min(t, i, 32);
        e(`Fetching bb wasm from ${r ?? "default location"}`);
        const s = await Xc(n, r);
        e(`Compiling bb wasm of ${s.byteLength} bytes`);
        const l = await WebAssembly.compile(s);
        return e("Compilation of bb wasm complete"), {
            module: l,
            threads: a
        };
    }
    async function qc(t) {
        if (typeof navigator < "u" && navigator.hardwareConcurrency) return navigator.hardwareConcurrency;
        try {
            return (await Promise.resolve().then(dt.t.bind(dt, 733, 23))).cpus().length;
        } catch (r) {
            return t(`Could not detect environment to query number of threads. Falling back to one thread. Error: ${r.message ?? r}`), 1;
        }
    }
    const Jc = 16, Oi = 32;
    Qc = function(t, r) {
        const e = t.slice(0, r * Oi);
        return {
            proof: t.slice(r * Oi),
            publicInputs: e
        };
    };
    tu = function(t, r) {
        return Uint8Array.from([
            ...t,
            ...r
        ]);
    };
    eu = function(t) {
        const e = [];
        for(let n = 0; n < t.length; n += 32){
            const i = t.slice(n, n + 32);
            e.push(i);
        }
        return e.map(iu);
    };
    function ru(t) {
        const r = t.map(au);
        return nu(r);
    }
    function nu(t) {
        const r = t.reduce((i, a)=>i + a.length, 0), e = new Uint8Array(r);
        let n = 0;
        for (const i of t)e.set(i, n), n += i.length;
        return e;
    }
    function iu(t) {
        const r = [];
        return t.forEach(function(e) {
            let n = e.toString(16);
            n.length % 2 && (n = "0" + n), r.push(n);
        }), "0x" + r.join("");
    }
    function au(t) {
        const r = BigInt(t).toString(16).padStart(64, "0"), e = r.length / 2, n = new Uint8Array(e);
        let i = 0, a = 0;
        for(; i < e;)n[i] = parseInt(r.slice(a, a + 2), 16), i += 1, a += 2;
        return n;
    }
    var Ut = Uint8Array, Ye = Uint16Array, su = Int32Array, qa = new Ut([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        0,
        0,
        0,
        0
    ]), Ja = new Ut([
        0,
        0,
        0,
        0,
        1,
        1,
        2,
        2,
        3,
        3,
        4,
        4,
        5,
        5,
        6,
        6,
        7,
        7,
        8,
        8,
        9,
        9,
        10,
        10,
        11,
        11,
        12,
        12,
        13,
        13,
        0,
        0
    ]), ou = new Ut([
        16,
        17,
        18,
        0,
        8,
        7,
        9,
        6,
        10,
        5,
        11,
        4,
        12,
        3,
        13,
        2,
        14,
        1,
        15
    ]), Qa = function(t, r) {
        for(var e = new Ye(31), n = 0; n < 31; ++n)e[n] = r += 1 << t[n - 1];
        for(var i = new su(e[30]), n = 1; n < 30; ++n)for(var a = e[n]; a < e[n + 1]; ++a)i[a] = a - e[n] << 5 | n;
        return {
            b: e,
            r: i
        };
    }, ts = Qa(qa, 2), es = ts.b, lu = ts.r;
    es[28] = 258, lu[258] = 28;
    var cu = Qa(Ja, 0), uu = cu.b, rs = new Ye(32768);
    for(var ot = 0; ot < 32768; ++ot){
        var Jt = (ot & 43690) >> 1 | (ot & 21845) << 1;
        Jt = (Jt & 52428) >> 2 | (Jt & 13107) << 2, Jt = (Jt & 61680) >> 4 | (Jt & 3855) << 4, rs[ot] = ((Jt & 65280) >> 8 | (Jt & 255) << 8) >> 1;
    }
    var Ge = function(t, r, e) {
        for(var n = t.length, i = 0, a = new Ye(r); i < n; ++i)t[i] && ++a[t[i] - 1];
        var s = new Ye(r);
        for(i = 1; i < r; ++i)s[i] = s[i - 1] + a[i - 1] << 1;
        var l;
        {
            l = new Ye(1 << r);
            var p = 15 - r;
            for(i = 0; i < n; ++i)if (t[i]) for(var u = i << 4 | t[i], d = r - t[i], b = s[t[i] - 1]++ << d, g = b | (1 << d) - 1; b <= g; ++b)l[rs[b] >> p] = u;
        }
        return l;
    }, lr = new Ut(288);
    for(var ot = 0; ot < 144; ++ot)lr[ot] = 8;
    for(var ot = 144; ot < 256; ++ot)lr[ot] = 9;
    for(var ot = 256; ot < 280; ++ot)lr[ot] = 7;
    for(var ot = 280; ot < 288; ++ot)lr[ot] = 8;
    var ns = new Ut(32);
    for(var ot = 0; ot < 32; ++ot)ns[ot] = 5;
    var fu = Ge(lr, 9), hu = Ge(ns, 5), on = function(t) {
        for(var r = t[0], e = 1; e < t.length; ++e)t[e] > r && (r = t[e]);
        return r;
    }, Ot = function(t, r, e) {
        var n = r / 8 | 0;
        return (t[n] | t[n + 1] << 8) >> (r & 7) & e;
    }, ln = function(t, r) {
        var e = r / 8 | 0;
        return (t[e] | t[e + 1] << 8 | t[e + 2] << 16) >> (r & 7);
    }, pu = function(t) {
        return (t + 7) / 8 | 0;
    }, du = function(t, r, e) {
        return (e == null || e > t.length) && (e = t.length), new Ut(t.subarray(r, e));
    }, _u = [
        "unexpected EOF",
        "invalid block type",
        "invalid length/literal",
        "invalid distance",
        "stream finished",
        "no stream handler",
        ,
        "no callback",
        "invalid UTF-8 data",
        "extra field too long",
        "date not in range 1980-2099",
        "filename too long",
        "stream finishing",
        "invalid zip data"
    ], xt = function(t, r, e) {
        var n = new Error(r || _u[t]);
        if (n.code = t, Error.captureStackTrace && Error.captureStackTrace(n, xt), !e) throw n;
        return n;
    }, Zn = function(t, r, e, n) {
        var i = t.length, a = 0;
        if (!i || r.f && !r.l) return e || new Ut(0);
        var s = !e, l = s || r.i != 2, p = r.i;
        s && (e = new Ut(i * 3));
        var u = function(De) {
            var ur = e.length;
            if (De > ur) {
                var Oe = new Ut(Math.max(ur * 2, De));
                Oe.set(e), e = Oe;
            }
        }, d = r.f || 0, b = r.p || 0, g = r.b || 0, y = r.l, v = r.d, I = r.m, T = r.n, C = i * 8;
        do {
            if (!y) {
                d = Ot(t, b, 1);
                var M = Ot(t, b + 1, 3);
                if (b += 3, M) if (M == 1) y = fu, v = hu, I = 9, T = 5;
                else if (M == 2) {
                    var G = Ot(t, b, 31) + 257, O = Ot(t, b + 10, 15) + 4, K = G + Ot(t, b + 5, 31) + 1;
                    b += 14;
                    for(var W = new Ut(K), P = new Ut(19), H = 0; H < O; ++H)P[ou[H]] = Ot(t, b + H * 3, 7);
                    b += O * 3;
                    for(var _t = on(P), E = (1 << _t) - 1, N = Ge(P, _t), H = 0; H < K;){
                        var U = N[Ot(t, b, E)];
                        b += U & 15;
                        var D = U >> 4;
                        if (D < 16) W[H++] = D;
                        else {
                            var x = 0, z = 0;
                            for(D == 16 ? (z = 3 + Ot(t, b, 3), b += 2, x = W[H - 1]) : D == 17 ? (z = 3 + Ot(t, b, 7), b += 3) : D == 18 && (z = 11 + Ot(t, b, 127), b += 7); z--;)W[H++] = x;
                        }
                    }
                    var V = W.subarray(0, G), L = W.subarray(G);
                    I = on(V), T = on(L), y = Ge(V, I), v = Ge(L, T);
                } else xt(1);
                else {
                    var D = pu(b) + 4, B = t[D - 4] | t[D - 3] << 8, F = D + B;
                    if (F > i) {
                        p && xt(0);
                        break;
                    }
                    l && u(g + B), e.set(t.subarray(D, F), g), r.b = g += B, r.p = b = F * 8, r.f = d;
                    continue;
                }
                if (b > C) {
                    p && xt(0);
                    break;
                }
            }
            l && u(g + 131072);
            for(var $ = (1 << I) - 1, X = (1 << T) - 1, Y = b;; Y = b){
                var x = y[ln(t, b) & $], et = x >> 4;
                if (b += x & 15, b > C) {
                    p && xt(0);
                    break;
                }
                if (x || xt(2), et < 256) e[g++] = et;
                else if (et == 256) {
                    Y = b, y = null;
                    break;
                } else {
                    var kt = et - 254;
                    if (et > 264) {
                        var H = et - 257, St = qa[H];
                        kt = Ot(t, b, (1 << St) - 1) + es[H], b += St;
                    }
                    var me = v[ln(t, b) & X], we = me >> 4;
                    me || xt(3), b += me & 15;
                    var L = uu[we];
                    if (we > 3) {
                        var St = Ja[we];
                        L += ln(t, b) & (1 << St) - 1, b += St;
                    }
                    if (b > C) {
                        p && xt(0);
                        break;
                    }
                    l && u(g + 131072);
                    var Ne = g + kt;
                    if (g < L) {
                        var $t = a - L, ze = Math.min(L, Ne);
                        for($t + g < 0 && xt(3); g < ze; ++g)e[g] = n[$t + g];
                    }
                    for(; g < Ne; ++g)e[g] = e[g - L];
                }
            }
            r.l = y, r.p = Y, r.b = g, r.f = d, y && (d = 1, r.m = I, r.d = v, r.n = T);
        }while (!d);
        return g != e.length && s ? du(e, 0, g) : e.subarray(0, g);
    }, mu = new Ut(0), wu = function(t) {
        (t[0] != 31 || t[1] != 139 || t[2] != 8) && xt(6, "invalid gzip data");
        var r = t[3], e = 10;
        r & 4 && (e += (t[10] | t[11] << 8) + 2);
        for(var n = (r >> 3 & 1) + (r >> 4 & 1); n > 0; n -= !t[e++]);
        return e + (r & 2);
    }, gu = function(t) {
        var r = t.length;
        return (t[r - 4] | t[r - 3] << 8 | t[r - 2] << 16 | t[r - 1] << 24) >>> 0;
    }, yu = function(t, r) {
        return ((t[0] & 15) != 8 || t[0] >> 4 > 7 || (t[0] << 8 | t[1]) % 31) && xt(6, "invalid zlib data"), (t[1] >> 5 & 1) == 1 && xt(6, "invalid zlib data: " + (t[1] & 32 ? "need" : "unexpected") + " dictionary"), (t[1] >> 3 & 4) + 2;
    };
    function bu(t, r) {
        return Zn(t, {
            i: 2
        }, r, r);
    }
    function Eu(t, r) {
        var e = wu(t);
        return e + 8 > t.length && xt(6, "invalid gzip data"), Zn(t.subarray(e, -8), {
            i: 2
        }, new Ut(gu(t)), r);
    }
    function ku(t, r) {
        return Zn(t.subarray(yu(t), -4), {
            i: 2
        }, r, r);
    }
    function is(t, r) {
        return t[0] == 31 && t[1] == 139 && t[2] == 8 ? Eu(t, r) : (t[0] & 15) != 8 || t[0] >> 4 > 7 || (t[0] << 8 | t[1]) % 31 ? bu(t, r) : ku(t, r);
    }
    typeof TextEncoder < "u" && new TextEncoder;
    var Su = typeof TextDecoder < "u" && new TextDecoder, Bu = 0;
    try {
        Su.decode(mu, {
            stream: !0
        }), Bu = 1;
    } catch  {}
    var Zi = dt(287).hp, Sn;
    try {
        Sn = new TextDecoder;
    } catch  {}
    var Z, Wt, m = 0, st = {}, tt, ee, Rt = 0, Ft = 0, gt, Xt, At = [], J, Li = {
        useRecords: !1,
        mapsAsObjects: !0
    };
    class as {
    }
    const ss = new as;
    ss.name = "MessagePack 0xC1";
    var ae = !1, os = 2, Iu;
    try {
        new Function("");
    } catch  {
        os = 1 / 0;
    }
    class rr {
        constructor(r){
            r && (r.useRecords === !1 && r.mapsAsObjects === void 0 && (r.mapsAsObjects = !0), r.sequential && r.trusted !== !1 && (r.trusted = !0, !r.structures && r.useRecords != !1 && (r.structures = [], r.maxSharedStructures || (r.maxSharedStructures = 0))), r.structures ? r.structures.sharedLength = r.structures.length : r.getStructures && ((r.structures = []).uninitialized = !0, r.structures.sharedLength = 0), r.int64AsNumber && (r.int64AsType = "number")), Object.assign(this, r);
        }
        unpack(r, e) {
            if (Z) return ps(()=>(In(), this ? this.unpack(r, e) : rr.prototype.unpack.call(Li, r, e)));
            !r.buffer && r.constructor === ArrayBuffer && (r = typeof Zi < "u" ? Zi.from(r) : new Uint8Array(r)), typeof e == "object" ? (Wt = e.end || r.length, m = e.start || 0) : (m = 0, Wt = e > -1 ? e : r.length), Ft = 0, ee = null, gt = null, Z = r;
            try {
                J = r.dataView || (r.dataView = new DataView(r.buffer, r.byteOffset, r.byteLength));
            } catch (n) {
                throw Z = null, r instanceof Uint8Array ? n : new Error("Source must be a Uint8Array or Buffer but was a " + (r && typeof r == "object" ? r.constructor.name : typeof r));
            }
            if (this instanceof rr) {
                if (st = this, this.structures) return tt = this.structures, gr(e);
                (!tt || tt.length > 0) && (tt = []);
            } else st = Li, (!tt || tt.length > 0) && (tt = []);
            return gr(e);
        }
        unpackMultiple(r, e) {
            let n, i = 0;
            try {
                ae = !0;
                let a = r.length, s = this ? this.unpack(r, a) : Mr.unpack(r, a);
                if (e) {
                    if (e(s, i, m) === !1) return;
                    for(; m < a;)if (i = m, e(gr(), i, m) === !1) return;
                } else {
                    for(n = [
                        s
                    ]; m < a;)i = m, n.push(gr());
                    return n;
                }
            } catch (a) {
                throw a.lastPosition = i, a.values = n, a;
            } finally{
                ae = !1, In();
            }
        }
        _mergeStructures(r, e) {
            r = r || [], Object.isFrozen(r) && (r = r.map((n)=>n.slice(0)));
            for(let n = 0, i = r.length; n < i; n++){
                let a = r[n];
                a && (a.isShared = !0, n >= 32 && (a.highByte = n - 32 >> 5));
            }
            r.sharedLength = r.length;
            for(let n in e || [])if (n >= 0) {
                let i = r[n], a = e[n];
                a && (i && ((r.restoreStructures || (r.restoreStructures = []))[n] = i), r[n] = a);
            }
            return this.structures = r;
        }
        decode(r, e) {
            return this.unpack(r, e);
        }
    }
    function gr(t) {
        try {
            if (!st.trusted && !ae) {
                let e = tt.sharedLength || 0;
                e < tt.length && (tt.length = e);
            }
            let r;
            if (st.randomAccessStructure && Z[m] < 64 && Z[m] >= 32 && Iu || (r = pt()), gt && (m = gt.postBundlePosition, gt = null), ae && (tt.restoreStructures = null), m == Wt) tt && tt.restoreStructures && Mi(), tt = null, Z = null, Xt && (Xt = null);
            else {
                if (m > Wt) throw new Error("Unexpected end of MessagePack data");
                if (!ae) {
                    let e;
                    try {
                        e = JSON.stringify(r, (n, i)=>typeof i == "bigint" ? `${i}n` : i).slice(0, 100);
                    } catch (n) {
                        e = "(JSON view not available " + n + ")";
                    }
                    throw new Error("Data read, but end of buffer not reached " + e);
                }
            }
            return r;
        } catch (r) {
            throw tt && tt.restoreStructures && Mi(), In(), (r instanceof RangeError || r.message.startsWith("Unexpected end of buffer") || m > Wt) && (r.incomplete = !0), r;
        }
    }
    function Mi() {
        for(let t in tt.restoreStructures)tt[t] = tt.restoreStructures[t];
        tt.restoreStructures = null;
    }
    function pt() {
        let t = Z[m++];
        if (t < 160) if (t < 128) {
            if (t < 64) return t;
            {
                let r = tt[t & 63] || st.getStructures && ls()[t & 63];
                return r ? (r.read || (r.read = Ln(r, t & 63)), r.read()) : t;
            }
        } else if (t < 144) if (t -= 128, st.mapsAsObjects) {
            let r = {};
            for(let e = 0; e < t; e++){
                let n = us();
                n === "__proto__" && (n = "__proto_"), r[n] = pt();
            }
            return r;
        } else {
            let r = new Map;
            for(let e = 0; e < t; e++)r.set(pt(), pt());
            return r;
        }
        else {
            t -= 144;
            let r = new Array(t);
            for(let e = 0; e < t; e++)r[e] = pt();
            return st.freezeData ? Object.freeze(r) : r;
        }
        else if (t < 192) {
            let r = t - 160;
            if (Ft >= m) return ee.slice(m - Rt, (m += r) - Rt);
            if (Ft == 0 && Wt < 140) {
                let e = r < 16 ? Mn(r) : cs(r);
                if (e != null) return e;
            }
            return Bn(r);
        } else {
            let r;
            switch(t){
                case 192:
                    return null;
                case 193:
                    return gt ? (r = pt(), r > 0 ? gt[1].slice(gt.position1, gt.position1 += r) : gt[0].slice(gt.position0, gt.position0 -= r)) : ss;
                case 194:
                    return !1;
                case 195:
                    return !0;
                case 196:
                    if (r = Z[m++], r === void 0) throw new Error("Unexpected end of buffer");
                    return cn(r);
                case 197:
                    return r = J.getUint16(m), m += 2, cn(r);
                case 198:
                    return r = J.getUint32(m), m += 4, cn(r);
                case 199:
                    return oe(Z[m++]);
                case 200:
                    return r = J.getUint16(m), m += 2, oe(r);
                case 201:
                    return r = J.getUint32(m), m += 4, oe(r);
                case 202:
                    if (r = J.getFloat32(m), st.useFloat32 > 2) {
                        let e = Fn[(Z[m] & 127) << 1 | Z[m + 1] >> 7];
                        return m += 4, (e * r + (r > 0 ? .5 : -.5) >> 0) / e;
                    }
                    return m += 4, r;
                case 203:
                    return r = J.getFloat64(m), m += 8, r;
                case 204:
                    return Z[m++];
                case 205:
                    return r = J.getUint16(m), m += 2, r;
                case 206:
                    return r = J.getUint32(m), m += 4, r;
                case 207:
                    return st.int64AsType === "number" ? (r = J.getUint32(m) * 4294967296, r += J.getUint32(m + 4)) : st.int64AsType === "string" ? r = J.getBigUint64(m).toString() : st.int64AsType === "auto" ? (r = J.getBigUint64(m), r <= BigInt(2) << BigInt(52) && (r = Number(r))) : r = J.getBigUint64(m), m += 8, r;
                case 208:
                    return J.getInt8(m++);
                case 209:
                    return r = J.getInt16(m), m += 2, r;
                case 210:
                    return r = J.getInt32(m), m += 4, r;
                case 211:
                    return st.int64AsType === "number" ? (r = J.getInt32(m) * 4294967296, r += J.getUint32(m + 4)) : st.int64AsType === "string" ? r = J.getBigInt64(m).toString() : st.int64AsType === "auto" ? (r = J.getBigInt64(m), r >= BigInt(-2) << BigInt(52) && r <= BigInt(2) << BigInt(52) && (r = Number(r))) : r = J.getBigInt64(m), m += 8, r;
                case 212:
                    if (r = Z[m++], r == 114) return $i(Z[m++] & 63);
                    {
                        let e = At[r];
                        if (e) return e.read ? (m++, e.read(pt())) : e.noBuffer ? (m++, e()) : e(Z.subarray(m, ++m));
                        throw new Error("Unknown extension " + r);
                    }
                case 213:
                    return r = Z[m], r == 114 ? (m++, $i(Z[m++] & 63, Z[m++])) : oe(2);
                case 214:
                    return oe(4);
                case 215:
                    return oe(8);
                case 216:
                    return oe(16);
                case 217:
                    return r = Z[m++], Ft >= m ? ee.slice(m - Rt, (m += r) - Rt) : Au(r);
                case 218:
                    return r = J.getUint16(m), m += 2, Ft >= m ? ee.slice(m - Rt, (m += r) - Rt) : Tu(r);
                case 219:
                    return r = J.getUint32(m), m += 4, Ft >= m ? ee.slice(m - Rt, (m += r) - Rt) : xu(r);
                case 220:
                    return r = J.getUint16(m), m += 2, Pi(r);
                case 221:
                    return r = J.getUint32(m), m += 4, Pi(r);
                case 222:
                    return r = J.getUint16(m), m += 2, Hi(r);
                case 223:
                    return r = J.getUint32(m), m += 4, Hi(r);
                default:
                    if (t >= 224) return t - 256;
                    if (t === void 0) {
                        let e = new Error("Unexpected end of MessagePack data");
                        throw e.incomplete = !0, e;
                    }
                    throw new Error("Unknown MessagePack token " + t);
            }
        }
    }
    const vu = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
    function Ln(t, r) {
        function e() {
            if (e.count++ > os) {
                let i = t.read = new Function("r", "return function(){return " + (st.freezeData ? "Object.freeze" : "") + "({" + t.map((a)=>a === "__proto__" ? "__proto_:r()" : vu.test(a) ? a + ":r()" : "[" + JSON.stringify(a) + "]:r()").join(",") + "})}")(pt);
                return t.highByte === 0 && (t.read = Fi(r, t.read)), i();
            }
            let n = {};
            for(let i = 0, a = t.length; i < a; i++){
                let s = t[i];
                s === "__proto__" && (s = "__proto_"), n[s] = pt();
            }
            return st.freezeData ? Object.freeze(n) : n;
        }
        return e.count = 0, t.highByte === 0 ? Fi(r, e) : e;
    }
    const Fi = (t, r)=>function() {
            let e = Z[m++];
            if (e === 0) return r();
            let n = t < 32 ? -(t + (e << 5)) : t + (e << 5), i = tt[n] || ls()[n];
            if (!i) throw new Error("Record id is not defined for " + n);
            return i.read || (i.read = Ln(i, t)), i.read();
        };
    function ls() {
        let t = ps(()=>(Z = null, st.getStructures()));
        return tt = st._mergeStructures(t, tt);
    }
    var Bn = cr, Au = cr, Tu = cr, xu = cr;
    function cr(t) {
        let r;
        if (t < 16 && (r = Mn(t))) return r;
        if (t > 64 && Sn) return Sn.decode(Z.subarray(m, m += t));
        const e = m + t, n = [];
        for(r = ""; m < e;){
            const i = Z[m++];
            if (!(i & 128)) n.push(i);
            else if ((i & 224) === 192) {
                const a = Z[m++] & 63;
                n.push((i & 31) << 6 | a);
            } else if ((i & 240) === 224) {
                const a = Z[m++] & 63, s = Z[m++] & 63;
                n.push((i & 31) << 12 | a << 6 | s);
            } else if ((i & 248) === 240) {
                const a = Z[m++] & 63, s = Z[m++] & 63, l = Z[m++] & 63;
                let p = (i & 7) << 18 | a << 12 | s << 6 | l;
                p > 65535 && (p -= 65536, n.push(p >>> 10 & 1023 | 55296), p = 56320 | p & 1023), n.push(p);
            } else n.push(i);
            n.length >= 4096 && (r += mt.apply(String, n), n.length = 0);
        }
        return n.length > 0 && (r += mt.apply(String, n)), r;
    }
    function Pi(t) {
        let r = new Array(t);
        for(let e = 0; e < t; e++)r[e] = pt();
        return st.freezeData ? Object.freeze(r) : r;
    }
    function Hi(t) {
        if (st.mapsAsObjects) {
            let r = {};
            for(let e = 0; e < t; e++){
                let n = us();
                n === "__proto__" && (n = "__proto_"), r[n] = pt();
            }
            return r;
        } else {
            let r = new Map;
            for(let e = 0; e < t; e++)r.set(pt(), pt());
            return r;
        }
    }
    var mt = String.fromCharCode;
    function cs(t) {
        let r = m, e = new Array(t);
        for(let n = 0; n < t; n++){
            const i = Z[m++];
            if ((i & 128) > 0) {
                m = r;
                return;
            }
            e[n] = i;
        }
        return mt.apply(String, e);
    }
    function Mn(t) {
        if (t < 4) if (t < 2) {
            if (t === 0) return "";
            {
                let r = Z[m++];
                if ((r & 128) > 1) {
                    m -= 1;
                    return;
                }
                return mt(r);
            }
        } else {
            let r = Z[m++], e = Z[m++];
            if ((r & 128) > 0 || (e & 128) > 0) {
                m -= 2;
                return;
            }
            if (t < 3) return mt(r, e);
            let n = Z[m++];
            if ((n & 128) > 0) {
                m -= 3;
                return;
            }
            return mt(r, e, n);
        }
        else {
            let r = Z[m++], e = Z[m++], n = Z[m++], i = Z[m++];
            if ((r & 128) > 0 || (e & 128) > 0 || (n & 128) > 0 || (i & 128) > 0) {
                m -= 4;
                return;
            }
            if (t < 6) {
                if (t === 4) return mt(r, e, n, i);
                {
                    let a = Z[m++];
                    if ((a & 128) > 0) {
                        m -= 5;
                        return;
                    }
                    return mt(r, e, n, i, a);
                }
            } else if (t < 8) {
                let a = Z[m++], s = Z[m++];
                if ((a & 128) > 0 || (s & 128) > 0) {
                    m -= 6;
                    return;
                }
                if (t < 7) return mt(r, e, n, i, a, s);
                let l = Z[m++];
                if ((l & 128) > 0) {
                    m -= 7;
                    return;
                }
                return mt(r, e, n, i, a, s, l);
            } else {
                let a = Z[m++], s = Z[m++], l = Z[m++], p = Z[m++];
                if ((a & 128) > 0 || (s & 128) > 0 || (l & 128) > 0 || (p & 128) > 0) {
                    m -= 8;
                    return;
                }
                if (t < 10) {
                    if (t === 8) return mt(r, e, n, i, a, s, l, p);
                    {
                        let u = Z[m++];
                        if ((u & 128) > 0) {
                            m -= 9;
                            return;
                        }
                        return mt(r, e, n, i, a, s, l, p, u);
                    }
                } else if (t < 12) {
                    let u = Z[m++], d = Z[m++];
                    if ((u & 128) > 0 || (d & 128) > 0) {
                        m -= 10;
                        return;
                    }
                    if (t < 11) return mt(r, e, n, i, a, s, l, p, u, d);
                    let b = Z[m++];
                    if ((b & 128) > 0) {
                        m -= 11;
                        return;
                    }
                    return mt(r, e, n, i, a, s, l, p, u, d, b);
                } else {
                    let u = Z[m++], d = Z[m++], b = Z[m++], g = Z[m++];
                    if ((u & 128) > 0 || (d & 128) > 0 || (b & 128) > 0 || (g & 128) > 0) {
                        m -= 12;
                        return;
                    }
                    if (t < 14) {
                        if (t === 12) return mt(r, e, n, i, a, s, l, p, u, d, b, g);
                        {
                            let y = Z[m++];
                            if ((y & 128) > 0) {
                                m -= 13;
                                return;
                            }
                            return mt(r, e, n, i, a, s, l, p, u, d, b, g, y);
                        }
                    } else {
                        let y = Z[m++], v = Z[m++];
                        if ((y & 128) > 0 || (v & 128) > 0) {
                            m -= 14;
                            return;
                        }
                        if (t < 15) return mt(r, e, n, i, a, s, l, p, u, d, b, g, y, v);
                        let I = Z[m++];
                        if ((I & 128) > 0) {
                            m -= 15;
                            return;
                        }
                        return mt(r, e, n, i, a, s, l, p, u, d, b, g, y, v, I);
                    }
                }
            }
        }
    }
    function Wi() {
        let t = Z[m++], r;
        if (t < 192) r = t - 160;
        else switch(t){
            case 217:
                r = Z[m++];
                break;
            case 218:
                r = J.getUint16(m), m += 2;
                break;
            case 219:
                r = J.getUint32(m), m += 4;
                break;
            default:
                throw new Error("Expected string");
        }
        return cr(r);
    }
    function cn(t) {
        return st.copyBuffers ? Uint8Array.prototype.slice.call(Z, m, m += t) : Z.subarray(m, m += t);
    }
    function oe(t) {
        let r = Z[m++];
        if (At[r]) {
            let e;
            return At[r](Z.subarray(m, e = m += t), (n)=>{
                m = n;
                try {
                    return pt();
                } finally{
                    m = e;
                }
            });
        } else throw new Error("Unknown extension type " + r);
    }
    var Vi = new Array(4096);
    function us() {
        let t = Z[m++];
        if (t >= 160 && t < 192) {
            if (t = t - 160, Ft >= m) return ee.slice(m - Rt, (m += t) - Rt);
            if (!(Ft == 0 && Wt < 180)) return Bn(t);
        } else return m--, fs(pt());
        let r = (t << 5 ^ (t > 1 ? J.getUint16(m) : t > 0 ? Z[m] : 0)) & 4095, e = Vi[r], n = m, i = m + t - 3, a, s = 0;
        if (e && e.bytes == t) {
            for(; n < i;){
                if (a = J.getUint32(n), a != e[s++]) {
                    n = 1879048192;
                    break;
                }
                n += 4;
            }
            for(i += 3; n < i;)if (a = Z[n++], a != e[s++]) {
                n = 1879048192;
                break;
            }
            if (n === i) return m = n, e.string;
            i -= 3, n = m;
        }
        for(e = [], Vi[r] = e, e.bytes = t; n < i;)a = J.getUint32(n), e.push(a), n += 4;
        for(i += 3; n < i;)a = Z[n++], e.push(a);
        let l = t < 16 ? Mn(t) : cs(t);
        return l != null ? e.string = l : e.string = Bn(t);
    }
    function fs(t) {
        if (typeof t == "string") return t;
        if (typeof t == "number" || typeof t == "boolean" || typeof t == "bigint") return t.toString();
        if (t == null) return t + "";
        throw new Error("Invalid property type for record", typeof t);
    }
    const $i = (t, r)=>{
        let e = pt().map(fs), n = t;
        r !== void 0 && (t = t < 32 ? -((r << 5) + t) : (r << 5) + t, e.highByte = r);
        let i = tt[t];
        return i && (i.isShared || ae) && ((tt.restoreStructures || (tt.restoreStructures = []))[t] = i), tt[t] = e, e.read = Ln(e, n), e.read();
    };
    At[0] = ()=>{};
    At[0].noBuffer = !0;
    At[66] = (t)=>{
        let r = t.length, e = BigInt(t[0] & 128 ? t[0] - 256 : t[0]);
        for(let n = 1; n < r; n++)e <<= BigInt(8), e += BigInt(t[n]);
        return e;
    };
    let Uu = {
        Error,
        TypeError,
        ReferenceError
    };
    At[101] = ()=>{
        let t = pt();
        return (Uu[t[0]] || Error)(t[1], {
            cause: t[2]
        });
    };
    At[105] = (t)=>{
        if (st.structuredClone === !1) throw new Error("Structured clone extension is disabled");
        let r = J.getUint32(m - 4);
        Xt || (Xt = new Map);
        let e = Z[m], n;
        e >= 144 && e < 160 || e == 220 || e == 221 ? n = [] : n = {};
        let i = {
            target: n
        };
        Xt.set(r, i);
        let a = pt();
        return i.used ? Object.assign(n, a) : (i.target = a, a);
    };
    At[112] = (t)=>{
        if (st.structuredClone === !1) throw new Error("Structured clone extension is disabled");
        let r = J.getUint32(m - 4), e = Xt.get(r);
        return e.used = !0, e.target;
    };
    At[115] = ()=>new Set(pt());
    const hs = [
        "Int8",
        "Uint8",
        "Uint8Clamped",
        "Int16",
        "Uint16",
        "Int32",
        "Uint32",
        "Float32",
        "Float64",
        "BigInt64",
        "BigUint64"
    ].map((t)=>t + "Array");
    let Cu = typeof globalThis == "object" ? globalThis : window;
    At[116] = (t)=>{
        let r = t[0], e = hs[r];
        if (!e) {
            if (r === 16) {
                let n = new ArrayBuffer(t.length - 1);
                return new Uint8Array(n).set(t.subarray(1)), n;
            }
            throw new Error("Could not find typed array for code " + r);
        }
        return new Cu[e](Uint8Array.prototype.slice.call(t, 1).buffer);
    };
    At[120] = ()=>{
        let t = pt();
        return new RegExp(t[0], t[1]);
    };
    const Ru = [];
    At[98] = (t)=>{
        let r = (t[0] << 24) + (t[1] << 16) + (t[2] << 8) + t[3], e = m;
        return m += r - t.length, gt = Ru, gt = [
            Wi(),
            Wi()
        ], gt.position0 = 0, gt.position1 = 0, gt.postBundlePosition = m, m = e, pt();
    };
    At[255] = (t)=>t.length == 4 ? new Date((t[0] * 16777216 + (t[1] << 16) + (t[2] << 8) + t[3]) * 1e3) : t.length == 8 ? new Date(((t[0] << 22) + (t[1] << 14) + (t[2] << 6) + (t[3] >> 2)) / 1e6 + ((t[3] & 3) * 4294967296 + t[4] * 16777216 + (t[5] << 16) + (t[6] << 8) + t[7]) * 1e3) : t.length == 12 ? new Date(((t[0] << 24) + (t[1] << 16) + (t[2] << 8) + t[3]) / 1e6 + ((t[4] & 128 ? -281474976710656 : 0) + t[6] * 1099511627776 + t[7] * 4294967296 + t[8] * 16777216 + (t[9] << 16) + (t[10] << 8) + t[11]) * 1e3) : new Date("invalid");
    function ps(t) {
        let r = Wt, e = m, n = Rt, i = Ft, a = ee, s = Xt, l = gt, p = new Uint8Array(Z.slice(0, Wt)), u = tt, d = tt.slice(0, tt.length), b = st, g = ae, y = t();
        return Wt = r, m = e, Rt = n, Ft = i, ee = a, Xt = s, gt = l, Z = p, ae = g, tt = u, tt.splice(0, tt.length, ...d), st = b, J = new DataView(Z.buffer, Z.byteOffset, Z.byteLength), y;
    }
    function In() {
        Z = null, Xt = null, tt = null;
    }
    const Fn = new Array(147);
    for(let t = 0; t < 256; t++)Fn[t] = +("1e" + Math.floor(45.15 - t * .30103));
    var Mr = new rr({
        useRecords: !1
    });
    Mr.unpack;
    Mr.unpackMultiple;
    Mr.unpack;
    let Nu = new Float32Array(1);
    new Uint8Array(Nu.buffer, 0, 4);
    var Fr = dt(287).hp;
    let Br;
    try {
        Br = new TextEncoder;
    } catch  {}
    let vn, ds;
    const Pr = typeof Fr < "u", yr = Pr ? function(t) {
        return Fr.allocUnsafeSlow(t);
    } : Uint8Array, _s = Pr ? Fr : Uint8Array, Yi = Pr ? 4294967296 : 2144337920;
    let k, Me, at, w = 0, bt, ut = null, zu;
    const Du = 21760, Ou = /[\u0080-\uFFFF]/, Ee = Symbol("record-id");
    class Zu extends rr {
        constructor(r){
            super(r), this.offset = 0;
            let e, n, i, a, s = _s.prototype.utf8Write ? function(E, N) {
                return k.utf8Write(E, N, k.byteLength - N);
            } : Br && Br.encodeInto ? function(E, N) {
                return Br.encodeInto(E, k.subarray(N)).written;
            } : !1, l = this;
            r || (r = {});
            let p = r && r.sequential, u = r.structures || r.saveStructures, d = r.maxSharedStructures;
            if (d == null && (d = u ? 32 : 0), d > 8160) throw new Error("Maximum maxSharedStructure is 8160");
            r.structuredClone && r.moreTypes == null && (this.moreTypes = !0);
            let b = r.maxOwnStructures;
            b == null && (b = u ? 32 : 64), !this.structures && r.useRecords != !1 && (this.structures = []);
            let g = d > 32 || b + d > 64, y = d + 64, v = d + b + 64;
            if (v > 8256) throw new Error("Maximum maxSharedStructure + maxOwnStructure is 8192");
            let I = [], T = 0, C = 0;
            this.pack = this.encode = function(E, N) {
                if (k || (k = new yr(8192), at = k.dataView || (k.dataView = new DataView(k.buffer, 0, 8192)), w = 0), bt = k.length - 10, bt - w < 2048 ? (k = new yr(k.length), at = k.dataView || (k.dataView = new DataView(k.buffer, 0, k.length)), bt = k.length - 10, w = 0) : w = w + 7 & 2147483640, e = w, N & Wu && (w += N & 255), a = l.structuredClone ? new Map : null, l.bundleStrings && typeof E != "string" ? (ut = [], ut.size = 1 / 0) : ut = null, i = l.structures, i) {
                    i.uninitialized && (i = l._mergeStructures(l.getStructures()));
                    let x = i.sharedLength || 0;
                    if (x > d) throw new Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to " + i.sharedLength);
                    if (!i.transitions) {
                        i.transitions = Object.create(null);
                        for(let z = 0; z < x; z++){
                            let V = i[z];
                            if (!V) continue;
                            let L, $ = i.transitions;
                            for(let X = 0, Y = V.length; X < Y; X++){
                                let et = V[X];
                                L = $[et], L || (L = $[et] = Object.create(null)), $ = L;
                            }
                            $[Ee] = z + 64;
                        }
                        this.lastNamedStructuresLength = x;
                    }
                    p || (i.nextId = x + 64);
                }
                n && (n = !1);
                let U;
                try {
                    l.randomAccessStructure && E && E.constructor && E.constructor === Object ? _t(E) : B(E);
                    let x = ut;
                    if (ut && ji(e, B, 0), a && a.idsToInsert) {
                        let z = a.idsToInsert.sort((X, Y)=>X.offset > Y.offset ? 1 : -1), V = z.length, L = -1;
                        for(; x && V > 0;){
                            let X = z[--V].offset + e;
                            X < x.stringsPosition + e && L === -1 && (L = 0), X > x.position + e ? L >= 0 && (L += 6) : (L >= 0 && (at.setUint32(x.position + e, at.getUint32(x.position + e) + L), L = -1), x = x.previous, V++);
                        }
                        L >= 0 && x && at.setUint32(x.position + e, at.getUint32(x.position + e) + L), w += z.length * 6, w > bt && W(w), l.offset = w;
                        let $ = Mu(k.subarray(e, w), z);
                        return a = null, $;
                    }
                    return l.offset = w, N & Pu ? (k.start = e, k.end = w, k) : k.subarray(e, w);
                } catch (x) {
                    throw U = x, x;
                } finally{
                    if (i && (M(), n && l.saveStructures)) {
                        let x = i.sharedLength || 0, z = k.subarray(e, w), V = Fu(i, l);
                        if (!U) return l.saveStructures(V, V.isCompatible) === !1 ? l.pack(E, N) : (l.lastNamedStructuresLength = x, k.length > 1073741824 && (k = null), z);
                    }
                    k.length > 1073741824 && (k = null), N & Hu && (w = e);
                }
            };
            const M = ()=>{
                C < 10 && C++;
                let E = i.sharedLength || 0;
                if (i.length > E && !p && (i.length = E), T > 1e4) i.transitions = null, C = 0, T = 0, I.length > 0 && (I = []);
                else if (I.length > 0 && !p) {
                    for(let N = 0, U = I.length; N < U; N++)I[N][Ee] = 0;
                    I = [];
                }
            }, D = (E)=>{
                var N = E.length;
                N < 16 ? k[w++] = 144 | N : N < 65536 ? (k[w++] = 220, k[w++] = N >> 8, k[w++] = N & 255) : (k[w++] = 221, at.setUint32(w, N), w += 4);
                for(let U = 0; U < N; U++)B(E[U]);
            }, B = (E)=>{
                w > bt && (k = W(w));
                var N = typeof E, U;
                if (N === "string") {
                    let x = E.length;
                    if (ut && x >= 4 && x < 4096) {
                        if ((ut.size += x) > Du) {
                            let $, X = (ut[0] ? ut[0].length * 3 + ut[1].length : 0) + 10;
                            w + X > bt && (k = W(w + X));
                            let Y;
                            ut.position ? (Y = ut, k[w] = 200, w += 3, k[w++] = 98, $ = w - e, w += 4, ji(e, B, 0), at.setUint16($ + e - 3, w - e - $)) : (k[w++] = 214, k[w++] = 98, $ = w - e, w += 4), ut = [
                                "",
                                ""
                            ], ut.previous = Y, ut.size = 0, ut.position = $;
                        }
                        let L = Ou.test(E);
                        ut[L ? 0 : 1] += E, k[w++] = 193, B(L ? -x : x);
                        return;
                    }
                    let z;
                    x < 32 ? z = 1 : x < 256 ? z = 2 : x < 65536 ? z = 3 : z = 5;
                    let V = x * 3;
                    if (w + V > bt && (k = W(w + V)), x < 64 || !s) {
                        let L, $, X, Y = w + z;
                        for(L = 0; L < x; L++)$ = E.charCodeAt(L), $ < 128 ? k[Y++] = $ : $ < 2048 ? (k[Y++] = $ >> 6 | 192, k[Y++] = $ & 63 | 128) : ($ & 64512) === 55296 && ((X = E.charCodeAt(L + 1)) & 64512) === 56320 ? ($ = 65536 + (($ & 1023) << 10) + (X & 1023), L++, k[Y++] = $ >> 18 | 240, k[Y++] = $ >> 12 & 63 | 128, k[Y++] = $ >> 6 & 63 | 128, k[Y++] = $ & 63 | 128) : (k[Y++] = $ >> 12 | 224, k[Y++] = $ >> 6 & 63 | 128, k[Y++] = $ & 63 | 128);
                        U = Y - w - z;
                    } else U = s(E, w + z);
                    U < 32 ? k[w++] = 160 | U : U < 256 ? (z < 2 && k.copyWithin(w + 2, w + 1, w + 1 + U), k[w++] = 217, k[w++] = U) : U < 65536 ? (z < 3 && k.copyWithin(w + 3, w + 2, w + 2 + U), k[w++] = 218, k[w++] = U >> 8, k[w++] = U & 255) : (z < 5 && k.copyWithin(w + 5, w + 3, w + 3 + U), k[w++] = 219, at.setUint32(w, U), w += 4), w += U;
                } else if (N === "number") if (E >>> 0 === E) E < 32 || E < 128 && this.useRecords === !1 || E < 64 && !this.randomAccessStructure ? k[w++] = E : E < 256 ? (k[w++] = 204, k[w++] = E) : E < 65536 ? (k[w++] = 205, k[w++] = E >> 8, k[w++] = E & 255) : (k[w++] = 206, at.setUint32(w, E), w += 4);
                else if (E >> 0 === E) E >= -32 ? k[w++] = 256 + E : E >= -128 ? (k[w++] = 208, k[w++] = E + 256) : E >= -32768 ? (k[w++] = 209, at.setInt16(w, E), w += 2) : (k[w++] = 210, at.setInt32(w, E), w += 4);
                else {
                    let x;
                    if ((x = this.useFloat32) > 0 && E < 4294967296 && E >= -2147483648) {
                        k[w++] = 202, at.setFloat32(w, E);
                        let z;
                        if (x < 4 || (z = E * Fn[(k[w] & 127) << 1 | k[w + 1] >> 7]) >> 0 === z) {
                            w += 4;
                            return;
                        } else w--;
                    }
                    k[w++] = 203, at.setFloat64(w, E), w += 8;
                }
                else if (N === "object" || N === "function") if (!E) k[w++] = 192;
                else {
                    if (a) {
                        let z = a.get(E);
                        if (z) {
                            if (!z.id) {
                                let V = a.idsToInsert || (a.idsToInsert = []);
                                z.id = V.push(z);
                            }
                            k[w++] = 214, k[w++] = 112, at.setUint32(w, z.id), w += 4;
                            return;
                        } else a.set(E, {
                            offset: w - e
                        });
                    }
                    let x = E.constructor;
                    if (x === Object) K(E);
                    else if (x === Array) D(E);
                    else if (x === Map) if (this.mapAsEmptyObject) k[w++] = 128;
                    else {
                        U = E.size, U < 16 ? k[w++] = 128 | U : U < 65536 ? (k[w++] = 222, k[w++] = U >> 8, k[w++] = U & 255) : (k[w++] = 223, at.setUint32(w, U), w += 4);
                        for (let [z, V] of E)B(z), B(V);
                    }
                    else {
                        for(let z = 0, V = vn.length; z < V; z++){
                            let L = ds[z];
                            if (E instanceof L) {
                                let $ = vn[z];
                                if ($.write) {
                                    $.type && (k[w++] = 212, k[w++] = $.type, k[w++] = 0);
                                    let St = $.write.call(this, E);
                                    St === E ? Array.isArray(E) ? D(E) : K(E) : B(St);
                                    return;
                                }
                                let X = k, Y = at, et = w;
                                k = null;
                                let kt;
                                try {
                                    kt = $.pack.call(this, E, (St)=>(k = X, X = null, w += St, w > bt && W(w), {
                                            target: k,
                                            targetView: at,
                                            position: w - St
                                        }), B);
                                } finally{
                                    X && (k = X, at = Y, w = et, bt = k.length - 10);
                                }
                                kt && (kt.length + w > bt && W(kt.length + w), w = Lu(kt, k, w, $.type));
                                return;
                            }
                        }
                        if (Array.isArray(E)) D(E);
                        else {
                            if (E.toJSON) {
                                const z = E.toJSON();
                                if (z !== E) return B(z);
                            }
                            if (N === "function") return B(this.writeFunction && this.writeFunction(E));
                            K(E);
                        }
                    }
                }
                else if (N === "boolean") k[w++] = E ? 195 : 194;
                else if (N === "bigint") {
                    if (E < BigInt(1) << BigInt(63) && E >= -(BigInt(1) << BigInt(63))) k[w++] = 211, at.setBigInt64(w, E);
                    else if (E < BigInt(1) << BigInt(64) && E > 0) k[w++] = 207, at.setBigUint64(w, E);
                    else if (this.largeBigIntToFloat) k[w++] = 203, at.setFloat64(w, Number(E));
                    else {
                        if (this.largeBigIntToString) return B(E.toString());
                        if (this.useBigIntExtension && E < BigInt(2) ** BigInt(1023) && E > -(BigInt(2) ** BigInt(1023))) {
                            k[w++] = 199, w++, k[w++] = 66;
                            let x = [], z;
                            do {
                                let V = E & BigInt(255);
                                z = (V & BigInt(128)) === (E < BigInt(0) ? BigInt(128) : BigInt(0)), x.push(V), E >>= BigInt(8);
                            }while (!((E === BigInt(0) || E === BigInt(-1)) && z));
                            k[w - 2] = x.length;
                            for(let V = x.length; V > 0;)k[w++] = Number(x[--V]);
                            return;
                        } else throw new RangeError(E + " was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set largeBigIntToString to convert to string");
                    }
                    w += 8;
                } else if (N === "undefined") this.encodeUndefinedAsNil ? k[w++] = 192 : (k[w++] = 212, k[w++] = 0, k[w++] = 0);
                else throw new Error("Unknown type: " + N);
            }, F = this.variableMapSize || this.coercibleKeyAsNumber || this.skipValues ? (E)=>{
                let N;
                if (this.skipValues) {
                    N = [];
                    for(let z in E)(typeof E.hasOwnProperty != "function" || E.hasOwnProperty(z)) && !this.skipValues.includes(E[z]) && N.push(z);
                } else N = Object.keys(E);
                let U = N.length;
                U < 16 ? k[w++] = 128 | U : U < 65536 ? (k[w++] = 222, k[w++] = U >> 8, k[w++] = U & 255) : (k[w++] = 223, at.setUint32(w, U), w += 4);
                let x;
                if (this.coercibleKeyAsNumber) for(let z = 0; z < U; z++){
                    x = N[z];
                    let V = Number(x);
                    B(isNaN(V) ? x : V), B(E[x]);
                }
                else for(let z = 0; z < U; z++)B(x = N[z]), B(E[x]);
            } : (E)=>{
                k[w++] = 222;
                let N = w - e;
                w += 2;
                let U = 0;
                for(let x in E)(typeof E.hasOwnProperty != "function" || E.hasOwnProperty(x)) && (B(x), B(E[x]), U++);
                if (U > 65535) throw new Error('Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object');
                k[N++ + e] = U >> 8, k[N + e] = U & 255;
            }, G = this.useRecords === !1 ? F : r.progressiveRecords && !g ? (E)=>{
                let N, U = i.transitions || (i.transitions = Object.create(null)), x = w++ - e, z;
                for(let V in E)if (typeof E.hasOwnProperty != "function" || E.hasOwnProperty(V)) {
                    if (N = U[V], N) U = N;
                    else {
                        let L = Object.keys(E), $ = U;
                        U = i.transitions;
                        let X = 0;
                        for(let Y = 0, et = L.length; Y < et; Y++){
                            let kt = L[Y];
                            N = U[kt], N || (N = U[kt] = Object.create(null), X++), U = N;
                        }
                        x + e + 1 == w ? (w--, P(U, L, X)) : H(U, L, x, X), z = !0, U = $[V];
                    }
                    B(E[V]);
                }
                if (!z) {
                    let V = U[Ee];
                    V ? k[x + e] = V : H(U, Object.keys(E), x, 0);
                }
            } : (E)=>{
                let N, U = i.transitions || (i.transitions = Object.create(null)), x = 0;
                for(let V in E)(typeof E.hasOwnProperty != "function" || E.hasOwnProperty(V)) && (N = U[V], N || (N = U[V] = Object.create(null), x++), U = N);
                let z = U[Ee];
                z ? z >= 96 && g ? (k[w++] = ((z -= 96) & 31) + 96, k[w++] = z >> 5) : k[w++] = z : P(U, U.__keys__ || Object.keys(E), x);
                for(let V in E)(typeof E.hasOwnProperty != "function" || E.hasOwnProperty(V)) && B(E[V]);
            }, O = typeof this.useRecords == "function" && this.useRecords, K = O ? (E)=>{
                O(E) ? G(E) : F(E);
            } : G, W = (E)=>{
                let N;
                if (E > 16777216) {
                    if (E - e > Yi) throw new Error("Packed buffer would be larger than maximum buffer size");
                    N = Math.min(Yi, Math.round(Math.max((E - e) * (E > 67108864 ? 1.25 : 2), 4194304) / 4096) * 4096);
                } else N = (Math.max(E - e << 2, k.length - 1) >> 12) + 1 << 12;
                let U = new yr(N);
                return at = U.dataView || (U.dataView = new DataView(U.buffer, 0, N)), E = Math.min(E, k.length), k.copy ? k.copy(U, 0, e, E) : U.set(k.slice(e, E)), w -= e, e = 0, bt = U.length - 10, k = U;
            }, P = (E, N, U)=>{
                let x = i.nextId;
                x || (x = 64), x < y && this.shouldShareStructure && !this.shouldShareStructure(N) ? (x = i.nextOwnId, x < v || (x = y), i.nextOwnId = x + 1) : (x >= v && (x = y), i.nextId = x + 1);
                let z = N.highByte = x >= 96 && g ? x - 96 >> 5 : -1;
                E[Ee] = x, E.__keys__ = N, i[x - 64] = N, x < y ? (N.isShared = !0, i.sharedLength = x - 63, n = !0, z >= 0 ? (k[w++] = (x & 31) + 96, k[w++] = z) : k[w++] = x) : (z >= 0 ? (k[w++] = 213, k[w++] = 114, k[w++] = (x & 31) + 96, k[w++] = z) : (k[w++] = 212, k[w++] = 114, k[w++] = x), U && (T += C * U), I.length >= b && (I.shift()[Ee] = 0), I.push(E), B(N));
            }, H = (E, N, U, x)=>{
                let z = k, V = w, L = bt, $ = e;
                k = Me, w = 0, e = 0, k || (Me = k = new yr(8192)), bt = k.length - 10, P(E, N, x), Me = k;
                let X = w;
                if (k = z, w = V, bt = L, e = $, X > 1) {
                    let Y = w + X - 1;
                    Y > bt && W(Y);
                    let et = U + e;
                    k.copyWithin(et + X, et + 1, w), k.set(Me.slice(0, X), et), w = Y;
                } else k[U + e] = Me[0];
            }, _t = (E)=>{
                let N = zu(E, k, e, w, i, W, (U, x, z)=>{
                    if (z) return n = !0;
                    w = x;
                    let V = k;
                    return B(U), M(), V !== k ? {
                        position: w,
                        targetView: at,
                        target: k
                    } : w;
                }, this);
                if (N === 0) return K(E);
                w = N;
            };
        }
        useBuffer(r) {
            k = r, k.dataView || (k.dataView = new DataView(k.buffer, k.byteOffset, k.byteLength)), w = 0;
        }
        set position(r) {
            w = r;
        }
        get position() {
            return w;
        }
        clearSharedData() {
            this.structures && (this.structures = []), this.typedStructs && (this.typedStructs = []);
        }
    }
    ds = [
        Date,
        Set,
        Error,
        RegExp,
        ArrayBuffer,
        Object.getPrototypeOf(Uint8Array.prototype).constructor,
        as
    ];
    vn = [
        {
            pack (t, r, e) {
                let n = t.getTime() / 1e3;
                if ((this.useTimestamp32 || t.getMilliseconds() === 0) && n >= 0 && n < 4294967296) {
                    let { target: i, targetView: a, position: s } = r(6);
                    i[s++] = 214, i[s++] = 255, a.setUint32(s, n);
                } else if (n > 0 && n < 4294967296) {
                    let { target: i, targetView: a, position: s } = r(10);
                    i[s++] = 215, i[s++] = 255, a.setUint32(s, t.getMilliseconds() * 4e6 + (n / 1e3 / 4294967296 >> 0)), a.setUint32(s + 4, n);
                } else if (isNaN(n)) {
                    if (this.onInvalidDate) return r(0), e(this.onInvalidDate());
                    let { target: i, targetView: a, position: s } = r(3);
                    i[s++] = 212, i[s++] = 255, i[s++] = 255;
                } else {
                    let { target: i, targetView: a, position: s } = r(15);
                    i[s++] = 199, i[s++] = 12, i[s++] = 255, a.setUint32(s, t.getMilliseconds() * 1e6), a.setBigInt64(s + 4, BigInt(Math.floor(n)));
                }
            }
        },
        {
            pack (t, r, e) {
                if (this.setAsEmptyObject) return r(0), e({});
                let n = Array.from(t), { target: i, position: a } = r(this.moreTypes ? 3 : 0);
                this.moreTypes && (i[a++] = 212, i[a++] = 115, i[a++] = 0), e(n);
            }
        },
        {
            pack (t, r, e) {
                let { target: n, position: i } = r(this.moreTypes ? 3 : 0);
                this.moreTypes && (n[i++] = 212, n[i++] = 101, n[i++] = 0), e([
                    t.name,
                    t.message,
                    t.cause
                ]);
            }
        },
        {
            pack (t, r, e) {
                let { target: n, position: i } = r(this.moreTypes ? 3 : 0);
                this.moreTypes && (n[i++] = 212, n[i++] = 120, n[i++] = 0), e([
                    t.source,
                    t.flags
                ]);
            }
        },
        {
            pack (t, r) {
                this.moreTypes ? Gi(t, 16, r) : Ki(Pr ? Fr.from(t) : new Uint8Array(t), r);
            }
        },
        {
            pack (t, r) {
                let e = t.constructor;
                e !== _s && this.moreTypes ? Gi(t, hs.indexOf(e.name), r) : Ki(t, r);
            }
        },
        {
            pack (t, r) {
                let { target: e, position: n } = r(1);
                e[n] = 193;
            }
        }
    ];
    function Gi(t, r, e, n) {
        let i = t.byteLength;
        if (i + 1 < 256) {
            var { target: a, position: s } = e(4 + i);
            a[s++] = 199, a[s++] = i + 1;
        } else if (i + 1 < 65536) {
            var { target: a, position: s } = e(5 + i);
            a[s++] = 200, a[s++] = i + 1 >> 8, a[s++] = i + 1 & 255;
        } else {
            var { target: a, position: s, targetView: l } = e(7 + i);
            a[s++] = 201, l.setUint32(s, i + 1), s += 4;
        }
        a[s++] = 116, a[s++] = r, t.buffer || (t = new Uint8Array(t)), a.set(new Uint8Array(t.buffer, t.byteOffset, t.byteLength), s);
    }
    function Ki(t, r) {
        let e = t.byteLength;
        var n, i;
        if (e < 256) {
            var { target: n, position: i } = r(e + 2);
            n[i++] = 196, n[i++] = e;
        } else if (e < 65536) {
            var { target: n, position: i } = r(e + 3);
            n[i++] = 197, n[i++] = e >> 8, n[i++] = e & 255;
        } else {
            var { target: n, position: i, targetView: a } = r(e + 5);
            n[i++] = 198, a.setUint32(i, e), i += 4;
        }
        n.set(t, i);
    }
    function Lu(t, r, e, n) {
        let i = t.length;
        switch(i){
            case 1:
                r[e++] = 212;
                break;
            case 2:
                r[e++] = 213;
                break;
            case 4:
                r[e++] = 214;
                break;
            case 8:
                r[e++] = 215;
                break;
            case 16:
                r[e++] = 216;
                break;
            default:
                i < 256 ? (r[e++] = 199, r[e++] = i) : i < 65536 ? (r[e++] = 200, r[e++] = i >> 8, r[e++] = i & 255) : (r[e++] = 201, r[e++] = i >> 24, r[e++] = i >> 16 & 255, r[e++] = i >> 8 & 255, r[e++] = i & 255);
        }
        return r[e++] = n, r.set(t, e), e += i, e;
    }
    function Mu(t, r) {
        let e, n = r.length * 6, i = t.length - n;
        for(; e = r.pop();){
            let a = e.offset, s = e.id;
            t.copyWithin(a + n, a, i), n -= 6;
            let l = a + n;
            t[l++] = 214, t[l++] = 105, t[l++] = s >> 24, t[l++] = s >> 16 & 255, t[l++] = s >> 8 & 255, t[l++] = s & 255, i = a;
        }
        return t;
    }
    function ji(t, r, e) {
        if (ut.length > 0) {
            at.setUint32(ut.position + t, w + e - ut.position - t), ut.stringsPosition = w - t;
            let n = ut;
            ut = null, r(n[0]), r(n[1]);
        }
    }
    function Fu(t, r) {
        return t.isCompatible = (e)=>{
            let n = !e || (r.lastNamedStructuresLength || 0) === e.length;
            return n || r._mergeStructures(e), n;
        }, t;
    }
    let ms = new Zu({
        useRecords: !1
    });
    ms.pack;
    ms.pack;
    const Pu = 512, Hu = 1024, Wu = 2048;
    var Xi = dt(287).hp;
    Ku = class {
        constructor(r, e = {
            threads: 1
        }, n = {
            recursive: !1
        }){
            this.backendOptions = e, this.circuitOptions = n, this.acirUncompressedBytecode = Vu(r);
        }
        async instantiate() {
            if (!this.api) {
                const r = await Pn.new(this.backendOptions);
                await r.acirInitSRS(this.acirUncompressedBytecode, this.circuitOptions.recursive, !0), this.api = r;
            }
        }
        async generateProof(r, e) {
            await this.instantiate();
            const i = await (e?.keccak ? this.api.acirProveUltraKeccakHonk.bind(this.api) : e?.keccakZK ? this.api.acirProveUltraKeccakZKHonk.bind(this.api) : e?.starknet ? this.api.acirProveUltraStarknetHonk.bind(this.api) : this.api.acirProveUltraHonk.bind(this.api))(this.acirUncompressedBytecode, is(r)), s = await (e?.keccak ? this.api.acirWriteVkUltraKeccakHonk.bind(this.api) : e?.keccakZK ? this.api.acirWriteVkUltraKeccakZKHonk.bind(this.api) : e?.starknet ? this.api.acirWriteVkUltraStarknetHonk.bind(this.api) : this.api.acirWriteVkUltraHonk.bind(this.api))(this.acirUncompressedBytecode), l = await this.api.acirVkAsFieldsUltraHonk(new jt(s)), u = Number(l[1].toString()) - Jc, { proof: d, publicInputs: b } = Qc(i, u), g = eu(b);
            return {
                proof: d,
                publicInputs: g
            };
        }
        async verifyProof(r, e) {
            await this.instantiate();
            const n = tu(ru(r.publicInputs), r.proof), i = e?.keccak ? this.api.acirWriteVkUltraKeccakHonk.bind(this.api) : e?.keccakZK ? this.api.acirWriteVkUltraKeccakZKHonk.bind(this.api) : e?.starknet ? this.api.acirWriteVkUltraStarknetHonk.bind(this.api) : this.api.acirWriteVkUltraHonk.bind(this.api), a = e?.keccak ? this.api.acirVerifyUltraKeccakHonk.bind(this.api) : e?.keccakZK ? this.api.acirVerifyUltraKeccakZKHonk.bind(this.api) : e?.starknet ? this.api.acirVerifyUltraStarknetHonk.bind(this.api) : this.api.acirVerifyUltraHonk.bind(this.api), s = await i(this.acirUncompressedBytecode);
            return await a(n, new jt(s));
        }
        async getVerificationKey(r) {
            return await this.instantiate(), r?.keccak ? await this.api.acirWriteVkUltraKeccakHonk(this.acirUncompressedBytecode) : r?.keccakZK ? await this.api.acirWriteVkUltraKeccakZKHonk(this.acirUncompressedBytecode) : r?.starknet ? await this.api.acirWriteVkUltraStarknetHonk(this.acirUncompressedBytecode) : await this.api.acirWriteVkUltraHonk(this.acirUncompressedBytecode);
        }
        async getSolidityVerifier(r) {
            await this.instantiate();
            const e = r ?? await this.api.acirWriteVkUltraKeccakHonk(this.acirUncompressedBytecode);
            return await this.api.acirHonkSolidityVerifier(this.acirUncompressedBytecode, new jt(e));
        }
        async generateRecursiveProofArtifacts(r, e) {
            await this.instantiate();
            const n = await this.api.acirWriteVkUltraHonk(this.acirUncompressedBytecode), i = await this.api.acirVkAsFieldsUltraHonk(n);
            return {
                proofAsFields: [],
                vkAsFields: i.map((a)=>a.toString()),
                vkHash: ""
            };
        }
        async destroy() {
            this.api && await this.api.destroy();
        }
    };
    function Vu(t) {
        const r = $u(t);
        return is(r);
    }
    function $u(t) {
        if (typeof Xi < "u") {
            const r = Xi.from(t, "base64");
            return new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
        } else {
            if (typeof atob == "function") return Uint8Array.from(atob(t), (r)=>r.charCodeAt(0));
            throw new Error("No implementation found for base64 decoding.");
        }
    }
    Pn = class extends $s {
        constructor(r, e, n){
            super(e), this.worker = r, this.options = n;
        }
        static async new(r = {}) {
            const e = await js(), n = pa(e), { module: i, threads: a } = await Xa(r.threads, r.wasmPath, r.logger);
            return await n.init(i, a, sa(r.logger ?? Vt()("bb.js:bb_wasm_async")), r.memory?.initial, r.memory?.maximum), new Pn(e, n, r);
        }
        async getNumThreads() {
            return await this.wasm.getNumThreads();
        }
        async initSRSForCircuitSize(r) {
            const e = await Ir.new(r + 1, this.options.crsPath, this.options.logger);
            await this.srsInitSrs(new jt(e.getG1Data()), e.numPoints, new jt(e.getG2Data()));
        }
        async initSRSClientIVC() {
            const r = await Ir.new(1048577, this.options.crsPath, this.options.logger), e = await xn.new(2 ** 16 + 1, this.options.crsPath, this.options.logger);
            await this.srsInitSrs(new jt(r.getG1Data()), r.numPoints, new jt(r.getG2Data())), await this.srsInitGrumpkinSrs(new jt(e.getG1Data()), e.numPoints);
        }
        async acirInitSRS(r, e, n) {
            const [i, a] = await this.acirGetCircuitSizes(r, e, n);
            return this.initSRSForCircuitSize(a);
        }
        async destroy() {
            await this.wasm.destroy(), await this.worker.terminate();
        }
        getWasm() {
            return this.wasm;
        }
    };
    let un, br;
    An = class extends Ys {
        constructor(r){
            super(r);
        }
        static async new(r, e = Vt()("bb.js:bb_wasm_sync")) {
            const n = new Dr, { module: i, threads: a } = await Xa(1, r, e);
            return await n.init(i, a, e), new An(n);
        }
        static async initSingleton(r, e = Vt()("bb.js:bb_wasm_sync")) {
            return un || (un = An.new(r, e)), br = await un, br;
        }
        static getSingleton() {
            if (!br) throw new Error("First call BarretenbergSync.initSingleton() on @aztec/bb.js module.");
            return br;
        }
        getWasm() {
            return this.wasm;
        }
    };
});
export { Pn as Barretenberg, An as BarretenbergSync, Ir as Crs, j as Fr, xn as GrumpkinCrs, jt as RawBuffer, Ku as UltraHonkBackend, eu as deflattenFields, tu as reconstructHonkProof, Qc as splitHonkProof, __tla };
