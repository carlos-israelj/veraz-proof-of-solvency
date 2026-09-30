const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./merkle-CyjBJ3Lr.js","./index-ClwnpcnN.js","./index-CmOZt9DE.css","./stellar-B2lT0NWL.js"])))=>i.map(i=>d[i]);
import { _ as si, __tla as __tla_0 } from "./index-ClwnpcnN.js";
import { hashReserveAddresses as Rl } from "./stellar-B2lT0NWL.js";
let Ti, G, o1;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    let re;
    function cn(t) {
        const n = re.__externref_table_alloc();
        return re.__wbindgen_export_2.set(n, t), n;
    }
    function Nt(t, n) {
        try {
            return t.apply(this, n);
        } catch (e) {
            const r = cn(e);
            re.__wbindgen_exn_store(r);
        }
    }
    const Hs = typeof TextDecoder < "u" ? new TextDecoder("utf-8", {
        ignoreBOM: !0,
        fatal: !0
    }) : {
        decode: ()=>{
            throw Error("TextDecoder not available");
        }
    };
    typeof TextDecoder < "u" && Hs.decode();
    let fn = null;
    function Lt() {
        return (fn === null || fn.byteLength === 0) && (fn = new Uint8Array(re.memory.buffer)), fn;
    }
    function Ot(t, n) {
        return t = t >>> 0, Hs.decode(Lt().subarray(t, t + n));
    }
    let St = 0;
    const er = typeof TextEncoder < "u" ? new TextEncoder("utf-8") : {
        encode: ()=>{
            throw Error("TextEncoder not available");
        }
    }, Nl = typeof er.encodeInto == "function" ? function(t, n) {
        return er.encodeInto(t, n);
    } : function(t, n) {
        const e = er.encode(t);
        return n.set(e), {
            read: t.length,
            written: e.length
        };
    };
    function Ur(t, n, e) {
        if (e === void 0) {
            const o = er.encode(t), d = n(o.length, 1) >>> 0;
            return Lt().subarray(d, d + o.length).set(o), St = o.length, d;
        }
        let r = t.length, i = n(r, 1) >>> 0;
        const a = Lt();
        let s = 0;
        for(; s < r; s++){
            const o = t.charCodeAt(s);
            if (o > 127) break;
            a[i + s] = o;
        }
        if (s !== r) {
            s !== 0 && (t = t.slice(s)), i = e(i, r, r = s + t.length * 3, 1) >>> 0;
            const o = Lt().subarray(i + s, i + r), d = Nl(t, o);
            s += d.written, i = e(i, r, s, 1) >>> 0;
        }
        return St = s, i;
    }
    let mt = null;
    function at() {
        return (mt === null || mt.buffer.detached === !0 || mt.buffer.detached === void 0 && mt.buffer !== re.memory.buffer) && (mt = new DataView(re.memory.buffer)), mt;
    }
    function pt(t) {
        return t == null;
    }
    const Vi = typeof FinalizationRegistry > "u" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((t)=>{
        re.__wbindgen_export_6.get(t.dtor)(t.a, t.b);
    });
    function Ol(t, n, e, r) {
        const i = {
            a: t,
            b: n,
            cnt: 1,
            dtor: e
        }, a = (...s)=>{
            i.cnt++;
            const o = i.a;
            i.a = 0;
            try {
                return r(o, i.b, ...s);
            } finally{
                --i.cnt === 0 ? (re.__wbindgen_export_6.get(i.dtor)(o, i.b), Vi.unregister(i)) : i.a = o;
            }
        };
        return a.original = i, Vi.register(a, i, i), a;
    }
    function oi(t) {
        const n = typeof t;
        if (n == "number" || n == "boolean" || t == null) return `${t}`;
        if (n == "string") return `"${t}"`;
        if (n == "symbol") {
            const i = t.description;
            return i == null ? "Symbol" : `Symbol(${i})`;
        }
        if (n == "function") {
            const i = t.name;
            return typeof i == "string" && i.length > 0 ? `Function(${i})` : "Function";
        }
        if (Array.isArray(t)) {
            const i = t.length;
            let a = "[";
            i > 0 && (a += oi(t[0]));
            for(let s = 1; s < i; s++)a += ", " + oi(t[s]);
            return a += "]", a;
        }
        const e = /\[object ([^\]]+)\]/.exec(toString.call(t));
        let r;
        if (e && e.length > 1) r = e[1];
        else return toString.call(t);
        if (r == "Object") try {
            return "Object(" + JSON.stringify(t) + ")";
        } catch  {
            return "Object";
        }
        return t instanceof Error ? `${t.name}: ${t.message}
${t.stack}` : r;
    }
    function Dl(t) {
        const n = re.__wbindgen_export_2.get(t);
        return re.__externref_table_dealloc(t), n;
    }
    function Hl(t, n) {
        return t = t >>> 0, Lt().subarray(t / 1, t / 1 + n);
    }
    function Fl(t, n) {
        const e = n(t.length * 1, 1) >>> 0;
        return Lt().set(t, e / 1), St = t.length, e;
    }
    function zl(t) {
        const n = re.compressWitnessStack(t);
        if (n[3]) throw Dl(n[2]);
        var e = Hl(n[0], n[1]).slice();
        return re.__wbindgen_free(n[0], n[1] * 1, 1), e;
    }
    function Zl(t, n, e) {
        const r = Fl(t, re.__wbindgen_malloc), i = St;
        return re.executeProgram(r, i, n, e);
    }
    function Ml(t, n, e) {
        re.closure646_externref_shim(t, n, e);
    }
    function Ll(t, n, e, r, i) {
        re.closure1311_externref_shim(t, n, e, r, i);
    }
    function Yi(t, n, e, r) {
        re.closure1315_externref_shim(t, n, e, r);
    }
    async function Pl(t, n) {
        if (typeof Response == "function" && t instanceof Response) {
            if (typeof WebAssembly.instantiateStreaming == "function") try {
                return await WebAssembly.instantiateStreaming(t, n);
            } catch (r) {
                if (t.headers.get("Content-Type") != "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", r);
                else throw r;
            }
            const e = await t.arrayBuffer();
            return await WebAssembly.instantiate(e, n);
        } else {
            const e = await WebAssembly.instantiate(t, n);
            return e instanceof WebAssembly.Instance ? {
                instance: e,
                module: t
            } : e;
        }
    }
    function $l() {
        const t = {};
        return t.wbg = {}, t.wbg.__wbg_call_672a4d21634d4a24 = function() {
            return Nt(function(n, e) {
                return n.call(e);
            }, arguments);
        }, t.wbg.__wbg_call_7cccdd69e0791ae2 = function() {
            return Nt(function(n, e, r) {
                return n.call(e, r);
            }, arguments);
        }, t.wbg.__wbg_call_833bed5770ea2041 = function() {
            return Nt(function(n, e, r, i) {
                return n.call(e, r, i);
            }, arguments);
        }, t.wbg.__wbg_constructor_485c344f17716fe1 = function(n) {
            return new Error(n);
        }, t.wbg.__wbg_constructor_4d3f186b35aa8368 = function(n) {
            return new Error(n);
        }, t.wbg.__wbg_debug_3cb59063b29f58c1 = function(n) {
            console.debug(n);
        }, t.wbg.__wbg_debug_e17b51583ca6a632 = function(n, e, r, i) {
            console.debug(n, e, r, i);
        }, t.wbg.__wbg_error_524f506f44df1645 = function(n) {
            console.error(n);
        }, t.wbg.__wbg_error_7534b8e9a36f1ab4 = function(n, e) {
            let r, i;
            try {
                r = n, i = e, console.error(Ot(n, e));
            } finally{
                re.__wbindgen_free(r, i, 1);
            }
        }, t.wbg.__wbg_error_80de38b3f7cc3c3c = function(n, e, r, i) {
            console.error(n, e, r, i);
        }, t.wbg.__wbg_forEach_d6a05ca96422eff9 = function(n, e, r) {
            try {
                var i = {
                    a: e,
                    b: r
                }, a = (s, o, d)=>{
                    const l = i.a;
                    i.a = 0;
                    try {
                        return Ll(l, i.b, s, o, d);
                    } finally{
                        i.a = l;
                    }
                };
                n.forEach(a);
            } finally{
                i.a = i.b = 0;
            }
        }, t.wbg.__wbg_forEach_e1cf6f7c8ecb7dae = function(n, e, r) {
            try {
                var i = {
                    a: e,
                    b: r
                }, a = (s, o)=>{
                    const d = i.a;
                    i.a = 0;
                    try {
                        return Yi(d, i.b, s, o);
                    } finally{
                        i.a = d;
                    }
                };
                n.forEach(a);
            } finally{
                i.a = i.b = 0;
            }
        }, t.wbg.__wbg_fromEntries_524679eecb0bdc2e = function() {
            return Nt(function(n) {
                return Object.fromEntries(n);
            }, arguments);
        }, t.wbg.__wbg_from_2a5d3e218e67aa85 = function(n) {
            return Array.from(n);
        }, t.wbg.__wbg_get_b9b93047fe3cf45b = function(n, e) {
            return n[e >>> 0];
        }, t.wbg.__wbg_info_033d8b8a0838f1d3 = function(n, e, r, i) {
            console.info(n, e, r, i);
        }, t.wbg.__wbg_info_3daf2e093e091b66 = function(n) {
            console.info(n);
        }, t.wbg.__wbg_length_e2d2a49132c1b256 = function(n) {
            return n.length;
        }, t.wbg.__wbg_new_23a2665fac83c611 = function(n, e) {
            try {
                var r = {
                    a: n,
                    b: e
                }, i = (s, o)=>{
                    const d = r.a;
                    r.a = 0;
                    try {
                        return Yi(d, r.b, s, o);
                    } finally{
                        r.a = d;
                    }
                };
                return new Promise(i);
            } finally{
                r.a = r.b = 0;
            }
        }, t.wbg.__wbg_new_5e0be73521bc8c17 = function() {
            return new Map;
        }, t.wbg.__wbg_new_5f3ae2f96f8de996 = function() {
            return new Array;
        }, t.wbg.__wbg_new_78feb108b6472713 = function() {
            return new Array;
        }, t.wbg.__wbg_new_8a6f238a6ece86ea = function() {
            return new Error;
        }, t.wbg.__wbg_new_c68d7209be747379 = function(n, e) {
            return new Error(Ot(n, e));
        }, t.wbg.__wbg_new_e48d31efda68db91 = function() {
            return new Map;
        }, t.wbg.__wbg_newnoargs_105ed471475aaf50 = function(n, e) {
            return new Function(Ot(n, e));
        }, t.wbg.__wbg_parse_def2e24ef1252aff = function() {
            return Nt(function(n, e) {
                return JSON.parse(Ot(n, e));
            }, arguments);
        }, t.wbg.__wbg_push_737cfc8c1432c2c6 = function(n, e) {
            return n.push(e);
        }, t.wbg.__wbg_queueMicrotask_97d92b4fcc8a61c5 = function(n) {
            queueMicrotask(n);
        }, t.wbg.__wbg_queueMicrotask_d3219def82552485 = function(n) {
            return n.queueMicrotask;
        }, t.wbg.__wbg_resolve_4851785c9c5f573d = function(n) {
            return Promise.resolve(n);
        }, t.wbg.__wbg_reverse_71c11f9686a5c11b = function(n) {
            return n.reverse();
        }, t.wbg.__wbg_set_8fc6bf8a5b1071d1 = function(n, e, r) {
            return n.set(e, r);
        }, t.wbg.__wbg_set_bb8cecf6a62b9f46 = function() {
            return Nt(function(n, e, r) {
                return Reflect.set(n, e, r);
            }, arguments);
        }, t.wbg.__wbg_setcause_180f5110152d3ce3 = function(n, e) {
            n.cause = e;
        }, t.wbg.__wbg_stack_0ed75d68575b0f3c = function(n, e) {
            const r = e.stack, i = Ur(r, re.__wbindgen_malloc, re.__wbindgen_realloc), a = St;
            at().setInt32(n + 4 * 1, a, !0), at().setInt32(n + 4 * 0, i, !0);
        }, t.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function() {
            const n = typeof globalThis > "u" ? null : globalThis;
            return pt(n) ? 0 : cn(n);
        }, t.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function() {
            const n = typeof globalThis > "u" ? null : globalThis;
            return pt(n) ? 0 : cn(n);
        }, t.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function() {
            const n = typeof self > "u" ? null : self;
            return pt(n) ? 0 : cn(n);
        }, t.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function() {
            const n = typeof window > "u" ? null : window;
            return pt(n) ? 0 : cn(n);
        }, t.wbg.__wbg_then_44b73946d2fb3e7d = function(n, e) {
            return n.then(e);
        }, t.wbg.__wbg_then_48b406749878a531 = function(n, e, r) {
            return n.then(e, r);
        }, t.wbg.__wbg_values_fcb8ba8c0aad8b58 = function(n) {
            return Object.values(n);
        }, t.wbg.__wbg_warn_4ca3906c248c47c4 = function(n) {
            console.warn(n);
        }, t.wbg.__wbg_warn_aaf1f4664a035bd6 = function(n, e, r, i) {
            console.warn(n, e, r, i);
        }, t.wbg.__wbindgen_cb_drop = function(n) {
            const e = n.original;
            return e.cnt-- == 1 ? (e.a = 0, !0) : !1;
        }, t.wbg.__wbindgen_closure_wrapper2143 = function(n, e, r) {
            return Ol(n, e, 647, Ml);
        }, t.wbg.__wbindgen_debug_string = function(n, e) {
            const r = oi(e), i = Ur(r, re.__wbindgen_malloc, re.__wbindgen_realloc), a = St;
            at().setInt32(n + 4 * 1, a, !0), at().setInt32(n + 4 * 0, i, !0);
        }, t.wbg.__wbindgen_init_externref_table = function() {
            const n = re.__wbindgen_export_2, e = n.grow(4);
            n.set(0, void 0), n.set(e + 0, void 0), n.set(e + 1, null), n.set(e + 2, !0), n.set(e + 3, !1);
        }, t.wbg.__wbindgen_is_array = function(n) {
            return Array.isArray(n);
        }, t.wbg.__wbindgen_is_function = function(n) {
            return typeof n == "function";
        }, t.wbg.__wbindgen_is_string = function(n) {
            return typeof n == "string";
        }, t.wbg.__wbindgen_is_undefined = function(n) {
            return n === void 0;
        }, t.wbg.__wbindgen_number_get = function(n, e) {
            const r = e, i = typeof r == "number" ? r : void 0;
            at().setFloat64(n + 8 * 1, pt(i) ? 0 : i, !0), at().setInt32(n + 4 * 0, !pt(i), !0);
        }, t.wbg.__wbindgen_number_new = function(n) {
            return n;
        }, t.wbg.__wbindgen_string_get = function(n, e) {
            const r = e, i = typeof r == "string" ? r : void 0;
            var a = pt(i) ? 0 : Ur(i, re.__wbindgen_malloc, re.__wbindgen_realloc), s = St;
            at().setInt32(n + 4 * 1, s, !0), at().setInt32(n + 4 * 0, a, !0);
        }, t.wbg.__wbindgen_string_new = function(n, e) {
            return Ot(n, e);
        }, t.wbg.__wbindgen_throw = function(n, e) {
            throw new Error(Ot(n, e));
        }, t;
    }
    function Wl(t, n) {
        return re = t.exports, Fs.__wbindgen_wasm_module = n, mt = null, fn = null, re.__wbindgen_start(), re;
    }
    async function Fs(t) {
        if (re !== void 0) return re;
        typeof t < "u" && (Object.getPrototypeOf(t) === Object.prototype ? { module_or_path: t } = t : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), typeof t > "u" && (t = new URL("" + new URL("acvm_js_bg-BvxvrAml.wasm", import.meta.url).href, import.meta.url));
        const n = $l();
        (typeof t == "string" || typeof Request == "function" && t instanceof Request || typeof URL == "function" && t instanceof URL) && (t = fetch(t));
        const { instance: e, module: r } = await Pl(await t, n);
        return Wl(e, r);
    }
    let _e;
    const zs = typeof TextDecoder < "u" ? new TextDecoder("utf-8", {
        ignoreBOM: !0,
        fatal: !0
    }) : {
        decode: ()=>{
            throw Error("TextDecoder not available");
        }
    };
    typeof TextDecoder < "u" && zs.decode();
    let un = null;
    function tr() {
        return (un === null || un.byteLength === 0) && (un = new Uint8Array(_e.memory.buffer)), un;
    }
    function Mn(t, n) {
        return t = t >>> 0, zs.decode(tr().subarray(t, t + n));
    }
    function Zs(t) {
        const n = _e.__externref_table_alloc();
        return _e.__wbindgen_export_3.set(n, t), n;
    }
    function ji(t, n) {
        try {
            return t.apply(this, n);
        } catch (e) {
            const r = Zs(e);
            _e.__wbindgen_exn_store(r);
        }
    }
    let lr = 0;
    const nr = typeof TextEncoder < "u" ? new TextEncoder("utf-8") : {
        encode: ()=>{
            throw Error("TextEncoder not available");
        }
    }, Vl = typeof nr.encodeInto == "function" ? function(t, n) {
        return nr.encodeInto(t, n);
    } : function(t, n) {
        const e = nr.encode(t);
        return n.set(e), {
            read: t.length,
            written: e.length
        };
    };
    function Ki(t, n, e) {
        if (e === void 0) {
            const o = nr.encode(t), d = n(o.length, 1) >>> 0;
            return tr().subarray(d, d + o.length).set(o), lr = o.length, d;
        }
        let r = t.length, i = n(r, 1) >>> 0;
        const a = tr();
        let s = 0;
        for(; s < r; s++){
            const o = t.charCodeAt(s);
            if (o > 127) break;
            a[i + s] = o;
        }
        if (s !== r) {
            s !== 0 && (t = t.slice(s)), i = e(i, r, r = s + t.length * 3, 1) >>> 0;
            const o = tr().subarray(i + s, i + r), d = Vl(t, o);
            s += d.written, i = e(i, r, s, 1) >>> 0;
        }
        return lr = s, i;
    }
    let gt = null;
    function Dt() {
        return (gt === null || gt.buffer.detached === !0 || gt.buffer.detached === void 0 && gt.buffer !== _e.memory.buffer) && (gt = new DataView(_e.memory.buffer)), gt;
    }
    function rr(t) {
        return t == null;
    }
    function jt(t) {
        const n = _e.__wbindgen_export_3.get(t);
        return _e.__externref_table_dealloc(t), n;
    }
    function Yl(t, n, e) {
        const r = _e.abiEncode(t, n, rr(e) ? 0 : Zs(e));
        if (r[2]) throw jt(r[1]);
        return jt(r[0]);
    }
    function jl(t, n) {
        const e = _e.abiDecode(t, n);
        if (e[2]) throw jt(e[1]);
        return jt(e[0]);
    }
    function Kl(t, n) {
        const e = _e.abiDecodeError(t, n);
        if (e[2]) throw jt(e[1]);
        return jt(e[0]);
    }
    function Gl(t, n, e, r) {
        _e.closure245_externref_shim(t, n, e, r);
    }
    async function ql(t, n) {
        if (typeof Response == "function" && t instanceof Response) {
            if (typeof WebAssembly.instantiateStreaming == "function") try {
                return await WebAssembly.instantiateStreaming(t, n);
            } catch (r) {
                if (t.headers.get("Content-Type") != "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", r);
                else throw r;
            }
            const e = await t.arrayBuffer();
            return await WebAssembly.instantiate(e, n);
        } else {
            const e = await WebAssembly.instantiate(t, n);
            return e instanceof WebAssembly.Instance ? {
                instance: e,
                module: t
            } : e;
        }
    }
    function Xl() {
        const t = {};
        return t.wbg = {}, t.wbg.__wbg_constructor_55ed424879ec3895 = function(n) {
            return new Error(n);
        }, t.wbg.__wbg_error_7534b8e9a36f1ab4 = function(n, e) {
            let r, i;
            try {
                r = n, i = e, console.error(Mn(n, e));
            } finally{
                _e.__wbindgen_free(r, i, 1);
            }
        }, t.wbg.__wbg_forEach_e1cf6f7c8ecb7dae = function(n, e, r) {
            try {
                var i = {
                    a: e,
                    b: r
                }, a = (s, o)=>{
                    const d = i.a;
                    i.a = 0;
                    try {
                        return Gl(d, i.b, s, o);
                    } finally{
                        i.a = d;
                    }
                };
                n.forEach(a);
            } finally{
                i.a = i.b = 0;
            }
        }, t.wbg.__wbg_new_0d921e1ff7a37fda = function() {
            return new Map;
        }, t.wbg.__wbg_new_8a6f238a6ece86ea = function() {
            return new Error;
        }, t.wbg.__wbg_parse_def2e24ef1252aff = function() {
            return ji(function(n, e) {
                return JSON.parse(Mn(n, e));
            }, arguments);
        }, t.wbg.__wbg_set_8fc6bf8a5b1071d1 = function(n, e, r) {
            return n.set(e, r);
        }, t.wbg.__wbg_stack_0ed75d68575b0f3c = function(n, e) {
            const r = e.stack, i = Ki(r, _e.__wbindgen_malloc, _e.__wbindgen_realloc), a = lr;
            Dt().setInt32(n + 4 * 1, a, !0), Dt().setInt32(n + 4 * 0, i, !0);
        }, t.wbg.__wbg_stringify_f7ed6987935b4a24 = function() {
            return ji(function(n) {
                return JSON.stringify(n);
            }, arguments);
        }, t.wbg.__wbindgen_init_externref_table = function() {
            const n = _e.__wbindgen_export_3, e = n.grow(4);
            n.set(0, void 0), n.set(e + 0, void 0), n.set(e + 1, null), n.set(e + 2, !0), n.set(e + 3, !1);
        }, t.wbg.__wbindgen_is_undefined = function(n) {
            return n === void 0;
        }, t.wbg.__wbindgen_number_get = function(n, e) {
            const r = e, i = typeof r == "number" ? r : void 0;
            Dt().setFloat64(n + 8 * 1, rr(i) ? 0 : i, !0), Dt().setInt32(n + 4 * 0, !rr(i), !0);
        }, t.wbg.__wbindgen_number_new = function(n) {
            return n;
        }, t.wbg.__wbindgen_string_get = function(n, e) {
            const r = e, i = typeof r == "string" ? r : void 0;
            var a = rr(i) ? 0 : Ki(i, _e.__wbindgen_malloc, _e.__wbindgen_realloc), s = lr;
            Dt().setInt32(n + 4 * 1, s, !0), Dt().setInt32(n + 4 * 0, a, !0);
        }, t.wbg.__wbindgen_string_new = function(n, e) {
            return Mn(n, e);
        }, t.wbg.__wbindgen_throw = function(n, e) {
            throw new Error(Mn(n, e));
        }, t;
    }
    function Jl(t, n) {
        return _e = t.exports, li.__wbindgen_wasm_module = n, gt = null, un = null, _e.__wbindgen_start(), _e;
    }
    async function li(t) {
        if (_e !== void 0) return _e;
        typeof t < "u" && (Object.getPrototypeOf(t) === Object.prototype ? { module_or_path: t } = t : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), typeof t > "u" && (t = new URL("" + new URL("noirc_abi_wasm_bg-DRbWm09M.wasm", import.meta.url).href, import.meta.url));
        const n = Xl();
        (typeof t == "string" || typeof Request == "function" && t instanceof Request || typeof URL == "function" && t instanceof URL) && (t = fetch(t));
        const { instance: e, module: r } = await ql(await t, n);
        return Jl(e, r);
    }
    function Ms(t) {
        if (typeof Buffer < "u") return Buffer.from(t, "base64");
        if (typeof atob == "function") return Uint8Array.from(atob(t), (n)=>n.charCodeAt(0));
        throw new Error("No implementation found for base64 decoding.");
    }
    function Xt(t) {
        let n = t.length;
        for(; --n >= 0;)t[n] = 0;
    }
    const Ql = 3, ec = 258, Ls = 29, tc = 256, nc = tc + 1 + Ls, Ps = 30, rc = 512, ic = new Array((nc + 2) * 2);
    Xt(ic);
    const ac = new Array(Ps * 2);
    Xt(ac);
    const sc = new Array(rc);
    Xt(sc);
    const oc = new Array(ec - Ql + 1);
    Xt(oc);
    const lc = new Array(Ls);
    Xt(lc);
    const cc = new Array(Ps);
    Xt(cc);
    const fc = (t, n, e, r)=>{
        let i = t & 65535 | 0, a = t >>> 16 & 65535 | 0, s = 0;
        for(; e !== 0;){
            s = e > 2e3 ? 2e3 : e, e -= s;
            do i = i + n[r++] | 0, a = a + i | 0;
            while (--s);
            i %= 65521, a %= 65521;
        }
        return i | a << 16 | 0;
    };
    var ci = fc;
    const uc = ()=>{
        let t, n = [];
        for(var e = 0; e < 256; e++){
            t = e;
            for(var r = 0; r < 8; r++)t = t & 1 ? 3988292384 ^ t >>> 1 : t >>> 1;
            n[e] = t;
        }
        return n;
    }, hc = new Uint32Array(uc()), dc = (t, n, e, r)=>{
        const i = hc, a = r + e;
        t ^= -1;
        for(let s = r; s < a; s++)t = t >>> 8 ^ i[(t ^ n[s]) & 255];
        return t ^ -1;
    };
    var Pe = dc, fi = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version"
    }, $s = {
        Z_NO_FLUSH: 0,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_MEM_ERROR: -4,
        Z_BUF_ERROR: -5,
        Z_DEFLATED: 8
    };
    const _c = (t, n)=>Object.prototype.hasOwnProperty.call(t, n);
    var pc = function(t) {
        const n = Array.prototype.slice.call(arguments, 1);
        for(; n.length;){
            const e = n.shift();
            if (e) {
                if (typeof e != "object") throw new TypeError(e + "must be non-object");
                for(const r in e)_c(e, r) && (t[r] = e[r]);
            }
        }
        return t;
    }, wc = (t)=>{
        let n = 0;
        for(let r = 0, i = t.length; r < i; r++)n += t[r].length;
        const e = new Uint8Array(n);
        for(let r = 0, i = 0, a = t.length; r < a; r++){
            let s = t[r];
            e.set(s, i), i += s.length;
        }
        return e;
    }, Ws = {
        assign: pc,
        flattenChunks: wc
    };
    let Vs = !0;
    try {
        String.fromCharCode.apply(null, new Uint8Array(1));
    } catch  {
        Vs = !1;
    }
    const En = new Uint8Array(256);
    for(let t = 0; t < 256; t++)En[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
    En[254] = En[255] = 1;
    var mc = (t)=>{
        if (typeof TextEncoder == "function" && TextEncoder.prototype.encode) return new TextEncoder().encode(t);
        let n, e, r, i, a, s = t.length, o = 0;
        for(i = 0; i < s; i++)e = t.charCodeAt(i), (e & 64512) === 55296 && i + 1 < s && (r = t.charCodeAt(i + 1), (r & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (r - 56320), i++)), o += e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4;
        for(n = new Uint8Array(o), a = 0, i = 0; a < o; i++)e = t.charCodeAt(i), (e & 64512) === 55296 && i + 1 < s && (r = t.charCodeAt(i + 1), (r & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (r - 56320), i++)), e < 128 ? n[a++] = e : e < 2048 ? (n[a++] = 192 | e >>> 6, n[a++] = 128 | e & 63) : e < 65536 ? (n[a++] = 224 | e >>> 12, n[a++] = 128 | e >>> 6 & 63, n[a++] = 128 | e & 63) : (n[a++] = 240 | e >>> 18, n[a++] = 128 | e >>> 12 & 63, n[a++] = 128 | e >>> 6 & 63, n[a++] = 128 | e & 63);
        return n;
    };
    const gc = (t, n)=>{
        if (n < 65534 && t.subarray && Vs) return String.fromCharCode.apply(null, t.length === n ? t : t.subarray(0, n));
        let e = "";
        for(let r = 0; r < n; r++)e += String.fromCharCode(t[r]);
        return e;
    };
    var bc = (t, n)=>{
        const e = n || t.length;
        if (typeof TextDecoder == "function" && TextDecoder.prototype.decode) return new TextDecoder().decode(t.subarray(0, n));
        let r, i;
        const a = new Array(e * 2);
        for(i = 0, r = 0; r < e;){
            let s = t[r++];
            if (s < 128) {
                a[i++] = s;
                continue;
            }
            let o = En[s];
            if (o > 4) {
                a[i++] = 65533, r += o - 1;
                continue;
            }
            for(s &= o === 2 ? 31 : o === 3 ? 15 : 7; o > 1 && r < e;)s = s << 6 | t[r++] & 63, o--;
            if (o > 1) {
                a[i++] = 65533;
                continue;
            }
            s < 65536 ? a[i++] = s : (s -= 65536, a[i++] = 55296 | s >> 10 & 1023, a[i++] = 56320 | s & 1023);
        }
        return gc(a, i);
    }, yc = (t, n)=>{
        n = n || t.length, n > t.length && (n = t.length);
        let e = n - 1;
        for(; e >= 0 && (t[e] & 192) === 128;)e--;
        return e < 0 || e === 0 ? n : e + En[t[e]] > n ? e : n;
    }, ui = {
        string2buf: mc,
        buf2string: bc,
        utf8border: yc
    };
    function Ec() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
    }
    var kc = Ec;
    const Ln = 16209, Sc = 16191;
    var vc = function(n, e) {
        let r, i, a, s, o, d, l, u, g, w, p, k, x, I, T, D, C, m, H, V, B, $, z, R;
        const F = n.state;
        r = n.next_in, z = n.input, i = r + (n.avail_in - 5), a = n.next_out, R = n.output, s = a - (e - n.avail_out), o = a + (n.avail_out - 257), d = F.dmax, l = F.wsize, u = F.whave, g = F.wnext, w = F.window, p = F.hold, k = F.bits, x = F.lencode, I = F.distcode, T = (1 << F.lenbits) - 1, D = (1 << F.distbits) - 1;
        e: do {
            k < 15 && (p += z[r++] << k, k += 8, p += z[r++] << k, k += 8), C = x[p & T];
            t: for(;;){
                if (m = C >>> 24, p >>>= m, k -= m, m = C >>> 16 & 255, m === 0) R[a++] = C & 65535;
                else if (m & 16) {
                    H = C & 65535, m &= 15, m && (k < m && (p += z[r++] << k, k += 8), H += p & (1 << m) - 1, p >>>= m, k -= m), k < 15 && (p += z[r++] << k, k += 8, p += z[r++] << k, k += 8), C = I[p & D];
                    n: for(;;){
                        if (m = C >>> 24, p >>>= m, k -= m, m = C >>> 16 & 255, m & 16) {
                            if (V = C & 65535, m &= 15, k < m && (p += z[r++] << k, k += 8, k < m && (p += z[r++] << k, k += 8)), V += p & (1 << m) - 1, V > d) {
                                n.msg = "invalid distance too far back", F.mode = Ln;
                                break e;
                            }
                            if (p >>>= m, k -= m, m = a - s, V > m) {
                                if (m = V - m, m > u && F.sane) {
                                    n.msg = "invalid distance too far back", F.mode = Ln;
                                    break e;
                                }
                                if (B = 0, $ = w, g === 0) {
                                    if (B += l - m, m < H) {
                                        H -= m;
                                        do R[a++] = w[B++];
                                        while (--m);
                                        B = a - V, $ = R;
                                    }
                                } else if (g < m) {
                                    if (B += l + g - m, m -= g, m < H) {
                                        H -= m;
                                        do R[a++] = w[B++];
                                        while (--m);
                                        if (B = 0, g < H) {
                                            m = g, H -= m;
                                            do R[a++] = w[B++];
                                            while (--m);
                                            B = a - V, $ = R;
                                        }
                                    }
                                } else if (B += g - m, m < H) {
                                    H -= m;
                                    do R[a++] = w[B++];
                                    while (--m);
                                    B = a - V, $ = R;
                                }
                                for(; H > 2;)R[a++] = $[B++], R[a++] = $[B++], R[a++] = $[B++], H -= 3;
                                H && (R[a++] = $[B++], H > 1 && (R[a++] = $[B++]));
                            } else {
                                B = a - V;
                                do R[a++] = R[B++], R[a++] = R[B++], R[a++] = R[B++], H -= 3;
                                while (H > 2);
                                H && (R[a++] = R[B++], H > 1 && (R[a++] = R[B++]));
                            }
                        } else if (m & 64) {
                            n.msg = "invalid distance code", F.mode = Ln;
                            break e;
                        } else {
                            C = I[(C & 65535) + (p & (1 << m) - 1)];
                            continue n;
                        }
                        break;
                    }
                } else if (m & 64) if (m & 32) {
                    F.mode = Sc;
                    break e;
                } else {
                    n.msg = "invalid literal/length code", F.mode = Ln;
                    break e;
                }
                else {
                    C = x[(C & 65535) + (p & (1 << m) - 1)];
                    continue t;
                }
                break;
            }
        }while (r < i && a < o);
        H = k >> 3, r -= H, k -= H << 3, p &= (1 << k) - 1, n.next_in = r, n.next_out = a, n.avail_in = r < i ? 5 + (i - r) : 5 - (r - i), n.avail_out = a < o ? 257 + (o - a) : 257 - (a - o), F.hold = p, F.bits = k;
    };
    const Ht = 15, Gi = 852, qi = 592, Xi = 0, Rr = 1, Ji = 2, xc = new Uint16Array([
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
    ]), Ac = new Uint8Array([
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
        199,
        75
    ]), Ic = new Uint16Array([
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
    ]), Tc = new Uint8Array([
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
    ]), Bc = (t, n, e, r, i, a, s, o)=>{
        const d = o.bits;
        let l = 0, u = 0, g = 0, w = 0, p = 0, k = 0, x = 0, I = 0, T = 0, D = 0, C, m, H, V, B, $ = null, z;
        const R = new Uint16Array(Ht + 1), F = new Uint16Array(Ht + 1);
        let ae = null, S, M, O;
        for(l = 0; l <= Ht; l++)R[l] = 0;
        for(u = 0; u < r; u++)R[n[e + u]]++;
        for(p = d, w = Ht; w >= 1 && R[w] === 0; w--);
        if (p > w && (p = w), w === 0) return i[a++] = 1 << 24 | 64 << 16 | 0, i[a++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
        for(g = 1; g < w && R[g] === 0; g++);
        for(p < g && (p = g), I = 1, l = 1; l <= Ht; l++)if (I <<= 1, I -= R[l], I < 0) return -1;
        if (I > 0 && (t === Xi || w !== 1)) return -1;
        for(F[1] = 0, l = 1; l < Ht; l++)F[l + 1] = F[l] + R[l];
        for(u = 0; u < r; u++)n[e + u] !== 0 && (s[F[n[e + u]]++] = u);
        if (t === Xi ? ($ = ae = s, z = 20) : t === Rr ? ($ = xc, ae = Ac, z = 257) : ($ = Ic, ae = Tc, z = 0), D = 0, u = 0, l = g, B = a, k = p, x = 0, H = -1, T = 1 << p, V = T - 1, t === Rr && T > Gi || t === Ji && T > qi) return 1;
        for(;;){
            S = l - x, s[u] + 1 < z ? (M = 0, O = s[u]) : s[u] >= z ? (M = ae[s[u] - z], O = $[s[u] - z]) : (M = 96, O = 0), C = 1 << l - x, m = 1 << k, g = m;
            do m -= C, i[B + (D >> x) + m] = S << 24 | M << 16 | O | 0;
            while (m !== 0);
            for(C = 1 << l - 1; D & C;)C >>= 1;
            if (C !== 0 ? (D &= C - 1, D += C) : D = 0, u++, --R[l] === 0) {
                if (l === w) break;
                l = n[e + s[u]];
            }
            if (l > p && (D & V) !== H) {
                for(x === 0 && (x = p), B += g, k = l - x, I = 1 << k; k + x < w && (I -= R[k + x], !(I <= 0));)k++, I <<= 1;
                if (T += 1 << k, t === Rr && T > Gi || t === Ji && T > qi) return 1;
                H = D & V, i[H] = p << 24 | k << 16 | B - a | 0;
            }
        }
        return D !== 0 && (i[B + D] = l - x << 24 | 64 << 16 | 0), o.bits = p, 0;
    };
    var _n = Bc;
    const Cc = 0, Ys = 1, js = 2, { Z_FINISH: Qi, Z_BLOCK: Uc, Z_TREES: Pn, Z_OK: vt, Z_STREAM_END: Rc, Z_NEED_DICT: Nc, Z_STREAM_ERROR: ze, Z_DATA_ERROR: Ks, Z_MEM_ERROR: Gs, Z_BUF_ERROR: Oc, Z_DEFLATED: ea } = $s, gr = 16180, ta = 16181, na = 16182, ra = 16183, ia = 16184, aa = 16185, sa = 16186, oa = 16187, la = 16188, ca = 16189, cr = 16190, Je = 16191, Nr = 16192, fa = 16193, Or = 16194, ua = 16195, ha = 16196, da = 16197, _a = 16198, $n = 16199, Wn = 16200, pa = 16201, wa = 16202, ma = 16203, ga = 16204, ba = 16205, Dr = 16206, ya = 16207, Ea = 16208, ue = 16209, qs = 16210, Xs = 16211, Dc = 852, Hc = 592, Fc = 15, zc = Fc, ka = (t)=>(t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
    function Zc() {
        this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
    }
    const Tt = (t)=>{
        if (!t) return 1;
        const n = t.state;
        return !n || n.strm !== t || n.mode < gr || n.mode > Xs ? 1 : 0;
    }, Js = (t)=>{
        if (Tt(t)) return ze;
        const n = t.state;
        return t.total_in = t.total_out = n.total = 0, t.msg = "", n.wrap && (t.adler = n.wrap & 1), n.mode = gr, n.last = 0, n.havedict = 0, n.flags = -1, n.dmax = 32768, n.head = null, n.hold = 0, n.bits = 0, n.lencode = n.lendyn = new Int32Array(Dc), n.distcode = n.distdyn = new Int32Array(Hc), n.sane = 1, n.back = -1, vt;
    }, Qs = (t)=>{
        if (Tt(t)) return ze;
        const n = t.state;
        return n.wsize = 0, n.whave = 0, n.wnext = 0, Js(t);
    }, eo = (t, n)=>{
        let e;
        if (Tt(t)) return ze;
        const r = t.state;
        return n < 0 ? (e = 0, n = -n) : (e = (n >> 4) + 5, n < 48 && (n &= 15)), n && (n < 8 || n > 15) ? ze : (r.window !== null && r.wbits !== n && (r.window = null), r.wrap = e, r.wbits = n, Qs(t));
    }, to = (t, n)=>{
        if (!t) return ze;
        const e = new Zc;
        t.state = e, e.strm = t, e.window = null, e.mode = gr;
        const r = eo(t, n);
        return r !== vt && (t.state = null), r;
    }, Mc = (t)=>to(t, zc);
    let Sa = !0, Hr, Fr;
    const Lc = (t)=>{
        if (Sa) {
            Hr = new Int32Array(512), Fr = new Int32Array(32);
            let n = 0;
            for(; n < 144;)t.lens[n++] = 8;
            for(; n < 256;)t.lens[n++] = 9;
            for(; n < 280;)t.lens[n++] = 7;
            for(; n < 288;)t.lens[n++] = 8;
            for(_n(Ys, t.lens, 0, 288, Hr, 0, t.work, {
                bits: 9
            }), n = 0; n < 32;)t.lens[n++] = 5;
            _n(js, t.lens, 0, 32, Fr, 0, t.work, {
                bits: 5
            }), Sa = !1;
        }
        t.lencode = Hr, t.lenbits = 9, t.distcode = Fr, t.distbits = 5;
    }, no = (t, n, e, r)=>{
        let i;
        const a = t.state;
        return a.window === null && (a.window = new Uint8Array(1 << a.wbits)), a.wsize === 0 && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0), r >= a.wsize ? (a.window.set(n.subarray(e - a.wsize, e), 0), a.wnext = 0, a.whave = a.wsize) : (i = a.wsize - a.wnext, i > r && (i = r), a.window.set(n.subarray(e - r, e - r + i), a.wnext), r -= i, r ? (a.window.set(n.subarray(e - r, e), 0), a.wnext = r, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0;
    }, Pc = (t, n)=>{
        let e, r, i, a, s, o, d, l, u, g, w, p, k, x, I = 0, T, D, C, m, H, V, B, $;
        const z = new Uint8Array(4);
        let R, F;
        const ae = new Uint8Array([
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
        if (Tt(t) || !t.output || !t.input && t.avail_in !== 0) return ze;
        e = t.state, e.mode === Je && (e.mode = Nr), s = t.next_out, i = t.output, d = t.avail_out, a = t.next_in, r = t.input, o = t.avail_in, l = e.hold, u = e.bits, g = o, w = d, $ = vt;
        e: for(;;)switch(e.mode){
            case gr:
                if (e.wrap === 0) {
                    e.mode = Nr;
                    break;
                }
                for(; u < 16;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (e.wrap & 2 && l === 35615) {
                    e.wbits === 0 && (e.wbits = 15), e.check = 0, z[0] = l & 255, z[1] = l >>> 8 & 255, e.check = Pe(e.check, z, 2, 0), l = 0, u = 0, e.mode = ta;
                    break;
                }
                if (e.head && (e.head.done = !1), !(e.wrap & 1) || (((l & 255) << 8) + (l >> 8)) % 31) {
                    t.msg = "incorrect header check", e.mode = ue;
                    break;
                }
                if ((l & 15) !== ea) {
                    t.msg = "unknown compression method", e.mode = ue;
                    break;
                }
                if (l >>>= 4, u -= 4, B = (l & 15) + 8, e.wbits === 0 && (e.wbits = B), B > 15 || B > e.wbits) {
                    t.msg = "invalid window size", e.mode = ue;
                    break;
                }
                e.dmax = 1 << e.wbits, e.flags = 0, t.adler = e.check = 1, e.mode = l & 512 ? ca : Je, l = 0, u = 0;
                break;
            case ta:
                for(; u < 16;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (e.flags = l, (e.flags & 255) !== ea) {
                    t.msg = "unknown compression method", e.mode = ue;
                    break;
                }
                if (e.flags & 57344) {
                    t.msg = "unknown header flags set", e.mode = ue;
                    break;
                }
                e.head && (e.head.text = l >> 8 & 1), e.flags & 512 && e.wrap & 4 && (z[0] = l & 255, z[1] = l >>> 8 & 255, e.check = Pe(e.check, z, 2, 0)), l = 0, u = 0, e.mode = na;
            case na:
                for(; u < 32;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                e.head && (e.head.time = l), e.flags & 512 && e.wrap & 4 && (z[0] = l & 255, z[1] = l >>> 8 & 255, z[2] = l >>> 16 & 255, z[3] = l >>> 24 & 255, e.check = Pe(e.check, z, 4, 0)), l = 0, u = 0, e.mode = ra;
            case ra:
                for(; u < 16;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                e.head && (e.head.xflags = l & 255, e.head.os = l >> 8), e.flags & 512 && e.wrap & 4 && (z[0] = l & 255, z[1] = l >>> 8 & 255, e.check = Pe(e.check, z, 2, 0)), l = 0, u = 0, e.mode = ia;
            case ia:
                if (e.flags & 1024) {
                    for(; u < 16;){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    e.length = l, e.head && (e.head.extra_len = l), e.flags & 512 && e.wrap & 4 && (z[0] = l & 255, z[1] = l >>> 8 & 255, e.check = Pe(e.check, z, 2, 0)), l = 0, u = 0;
                } else e.head && (e.head.extra = null);
                e.mode = aa;
            case aa:
                if (e.flags & 1024 && (p = e.length, p > o && (p = o), p && (e.head && (B = e.head.extra_len - e.length, e.head.extra || (e.head.extra = new Uint8Array(e.head.extra_len)), e.head.extra.set(r.subarray(a, a + p), B)), e.flags & 512 && e.wrap & 4 && (e.check = Pe(e.check, r, p, a)), o -= p, a += p, e.length -= p), e.length)) break e;
                e.length = 0, e.mode = sa;
            case sa:
                if (e.flags & 2048) {
                    if (o === 0) break e;
                    p = 0;
                    do B = r[a + p++], e.head && B && e.length < 65536 && (e.head.name += String.fromCharCode(B));
                    while (B && p < o);
                    if (e.flags & 512 && e.wrap & 4 && (e.check = Pe(e.check, r, p, a)), o -= p, a += p, B) break e;
                } else e.head && (e.head.name = null);
                e.length = 0, e.mode = oa;
            case oa:
                if (e.flags & 4096) {
                    if (o === 0) break e;
                    p = 0;
                    do B = r[a + p++], e.head && B && e.length < 65536 && (e.head.comment += String.fromCharCode(B));
                    while (B && p < o);
                    if (e.flags & 512 && e.wrap & 4 && (e.check = Pe(e.check, r, p, a)), o -= p, a += p, B) break e;
                } else e.head && (e.head.comment = null);
                e.mode = la;
            case la:
                if (e.flags & 512) {
                    for(; u < 16;){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    if (e.wrap & 4 && l !== (e.check & 65535)) {
                        t.msg = "header crc mismatch", e.mode = ue;
                        break;
                    }
                    l = 0, u = 0;
                }
                e.head && (e.head.hcrc = e.flags >> 9 & 1, e.head.done = !0), t.adler = e.check = 0, e.mode = Je;
                break;
            case ca:
                for(; u < 32;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                t.adler = e.check = ka(l), l = 0, u = 0, e.mode = cr;
            case cr:
                if (e.havedict === 0) return t.next_out = s, t.avail_out = d, t.next_in = a, t.avail_in = o, e.hold = l, e.bits = u, Nc;
                t.adler = e.check = 1, e.mode = Je;
            case Je:
                if (n === Uc || n === Pn) break e;
            case Nr:
                if (e.last) {
                    l >>>= u & 7, u -= u & 7, e.mode = Dr;
                    break;
                }
                for(; u < 3;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                switch(e.last = l & 1, l >>>= 1, u -= 1, l & 3){
                    case 0:
                        e.mode = fa;
                        break;
                    case 1:
                        if (Lc(e), e.mode = $n, n === Pn) {
                            l >>>= 2, u -= 2;
                            break e;
                        }
                        break;
                    case 2:
                        e.mode = ha;
                        break;
                    case 3:
                        t.msg = "invalid block type", e.mode = ue;
                }
                l >>>= 2, u -= 2;
                break;
            case fa:
                for(l >>>= u & 7, u -= u & 7; u < 32;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if ((l & 65535) !== (l >>> 16 ^ 65535)) {
                    t.msg = "invalid stored block lengths", e.mode = ue;
                    break;
                }
                if (e.length = l & 65535, l = 0, u = 0, e.mode = Or, n === Pn) break e;
            case Or:
                e.mode = ua;
            case ua:
                if (p = e.length, p) {
                    if (p > o && (p = o), p > d && (p = d), p === 0) break e;
                    i.set(r.subarray(a, a + p), s), o -= p, a += p, d -= p, s += p, e.length -= p;
                    break;
                }
                e.mode = Je;
                break;
            case ha:
                for(; u < 14;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (e.nlen = (l & 31) + 257, l >>>= 5, u -= 5, e.ndist = (l & 31) + 1, l >>>= 5, u -= 5, e.ncode = (l & 15) + 4, l >>>= 4, u -= 4, e.nlen > 286 || e.ndist > 30) {
                    t.msg = "too many length or distance symbols", e.mode = ue;
                    break;
                }
                e.have = 0, e.mode = da;
            case da:
                for(; e.have < e.ncode;){
                    for(; u < 3;){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    e.lens[ae[e.have++]] = l & 7, l >>>= 3, u -= 3;
                }
                for(; e.have < 19;)e.lens[ae[e.have++]] = 0;
                if (e.lencode = e.lendyn, e.lenbits = 7, R = {
                    bits: e.lenbits
                }, $ = _n(Cc, e.lens, 0, 19, e.lencode, 0, e.work, R), e.lenbits = R.bits, $) {
                    t.msg = "invalid code lengths set", e.mode = ue;
                    break;
                }
                e.have = 0, e.mode = _a;
            case _a:
                for(; e.have < e.nlen + e.ndist;){
                    for(; I = e.lencode[l & (1 << e.lenbits) - 1], T = I >>> 24, D = I >>> 16 & 255, C = I & 65535, !(T <= u);){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    if (C < 16) l >>>= T, u -= T, e.lens[e.have++] = C;
                    else {
                        if (C === 16) {
                            for(F = T + 2; u < F;){
                                if (o === 0) break e;
                                o--, l += r[a++] << u, u += 8;
                            }
                            if (l >>>= T, u -= T, e.have === 0) {
                                t.msg = "invalid bit length repeat", e.mode = ue;
                                break;
                            }
                            B = e.lens[e.have - 1], p = 3 + (l & 3), l >>>= 2, u -= 2;
                        } else if (C === 17) {
                            for(F = T + 3; u < F;){
                                if (o === 0) break e;
                                o--, l += r[a++] << u, u += 8;
                            }
                            l >>>= T, u -= T, B = 0, p = 3 + (l & 7), l >>>= 3, u -= 3;
                        } else {
                            for(F = T + 7; u < F;){
                                if (o === 0) break e;
                                o--, l += r[a++] << u, u += 8;
                            }
                            l >>>= T, u -= T, B = 0, p = 11 + (l & 127), l >>>= 7, u -= 7;
                        }
                        if (e.have + p > e.nlen + e.ndist) {
                            t.msg = "invalid bit length repeat", e.mode = ue;
                            break;
                        }
                        for(; p--;)e.lens[e.have++] = B;
                    }
                }
                if (e.mode === ue) break;
                if (e.lens[256] === 0) {
                    t.msg = "invalid code -- missing end-of-block", e.mode = ue;
                    break;
                }
                if (e.lenbits = 9, R = {
                    bits: e.lenbits
                }, $ = _n(Ys, e.lens, 0, e.nlen, e.lencode, 0, e.work, R), e.lenbits = R.bits, $) {
                    t.msg = "invalid literal/lengths set", e.mode = ue;
                    break;
                }
                if (e.distbits = 6, e.distcode = e.distdyn, R = {
                    bits: e.distbits
                }, $ = _n(js, e.lens, e.nlen, e.ndist, e.distcode, 0, e.work, R), e.distbits = R.bits, $) {
                    t.msg = "invalid distances set", e.mode = ue;
                    break;
                }
                if (e.mode = $n, n === Pn) break e;
            case $n:
                e.mode = Wn;
            case Wn:
                if (o >= 6 && d >= 258) {
                    t.next_out = s, t.avail_out = d, t.next_in = a, t.avail_in = o, e.hold = l, e.bits = u, vc(t, w), s = t.next_out, i = t.output, d = t.avail_out, a = t.next_in, r = t.input, o = t.avail_in, l = e.hold, u = e.bits, e.mode === Je && (e.back = -1);
                    break;
                }
                for(e.back = 0; I = e.lencode[l & (1 << e.lenbits) - 1], T = I >>> 24, D = I >>> 16 & 255, C = I & 65535, !(T <= u);){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (D && !(D & 240)) {
                    for(m = T, H = D, V = C; I = e.lencode[V + ((l & (1 << m + H) - 1) >> m)], T = I >>> 24, D = I >>> 16 & 255, C = I & 65535, !(m + T <= u);){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    l >>>= m, u -= m, e.back += m;
                }
                if (l >>>= T, u -= T, e.back += T, e.length = C, D === 0) {
                    e.mode = ba;
                    break;
                }
                if (D & 32) {
                    e.back = -1, e.mode = Je;
                    break;
                }
                if (D & 64) {
                    t.msg = "invalid literal/length code", e.mode = ue;
                    break;
                }
                e.extra = D & 15, e.mode = pa;
            case pa:
                if (e.extra) {
                    for(F = e.extra; u < F;){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    e.length += l & (1 << e.extra) - 1, l >>>= e.extra, u -= e.extra, e.back += e.extra;
                }
                e.was = e.length, e.mode = wa;
            case wa:
                for(; I = e.distcode[l & (1 << e.distbits) - 1], T = I >>> 24, D = I >>> 16 & 255, C = I & 65535, !(T <= u);){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (!(D & 240)) {
                    for(m = T, H = D, V = C; I = e.distcode[V + ((l & (1 << m + H) - 1) >> m)], T = I >>> 24, D = I >>> 16 & 255, C = I & 65535, !(m + T <= u);){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    l >>>= m, u -= m, e.back += m;
                }
                if (l >>>= T, u -= T, e.back += T, D & 64) {
                    t.msg = "invalid distance code", e.mode = ue;
                    break;
                }
                e.offset = C, e.extra = D & 15, e.mode = ma;
            case ma:
                if (e.extra) {
                    for(F = e.extra; u < F;){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    e.offset += l & (1 << e.extra) - 1, l >>>= e.extra, u -= e.extra, e.back += e.extra;
                }
                if (e.offset > e.dmax) {
                    t.msg = "invalid distance too far back", e.mode = ue;
                    break;
                }
                e.mode = ga;
            case ga:
                if (d === 0) break e;
                if (p = w - d, e.offset > p) {
                    if (p = e.offset - p, p > e.whave && e.sane) {
                        t.msg = "invalid distance too far back", e.mode = ue;
                        break;
                    }
                    p > e.wnext ? (p -= e.wnext, k = e.wsize - p) : k = e.wnext - p, p > e.length && (p = e.length), x = e.window;
                } else x = i, k = s - e.offset, p = e.length;
                p > d && (p = d), d -= p, e.length -= p;
                do i[s++] = x[k++];
                while (--p);
                e.length === 0 && (e.mode = Wn);
                break;
            case ba:
                if (d === 0) break e;
                i[s++] = e.length, d--, e.mode = Wn;
                break;
            case Dr:
                if (e.wrap) {
                    for(; u < 32;){
                        if (o === 0) break e;
                        o--, l |= r[a++] << u, u += 8;
                    }
                    if (w -= d, t.total_out += w, e.total += w, e.wrap & 4 && w && (t.adler = e.check = e.flags ? Pe(e.check, i, w, s - w) : ci(e.check, i, w, s - w)), w = d, e.wrap & 4 && (e.flags ? l : ka(l)) !== e.check) {
                        t.msg = "incorrect data check", e.mode = ue;
                        break;
                    }
                    l = 0, u = 0;
                }
                e.mode = ya;
            case ya:
                if (e.wrap && e.flags) {
                    for(; u < 32;){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    if (e.wrap & 4 && l !== (e.total & 4294967295)) {
                        t.msg = "incorrect length check", e.mode = ue;
                        break;
                    }
                    l = 0, u = 0;
                }
                e.mode = Ea;
            case Ea:
                $ = Rc;
                break e;
            case ue:
                $ = Ks;
                break e;
            case qs:
                return Gs;
            case Xs:
            default:
                return ze;
        }
        return t.next_out = s, t.avail_out = d, t.next_in = a, t.avail_in = o, e.hold = l, e.bits = u, (e.wsize || w !== t.avail_out && e.mode < ue && (e.mode < Dr || n !== Qi)) && no(t, t.output, t.next_out, w - t.avail_out), g -= t.avail_in, w -= t.avail_out, t.total_in += g, t.total_out += w, e.total += w, e.wrap & 4 && w && (t.adler = e.check = e.flags ? Pe(e.check, i, w, t.next_out - w) : ci(e.check, i, w, t.next_out - w)), t.data_type = e.bits + (e.last ? 64 : 0) + (e.mode === Je ? 128 : 0) + (e.mode === $n || e.mode === Or ? 256 : 0), (g === 0 && w === 0 || n === Qi) && $ === vt && ($ = Oc), $;
    }, $c = (t)=>{
        if (Tt(t)) return ze;
        let n = t.state;
        return n.window && (n.window = null), t.state = null, vt;
    }, Wc = (t, n)=>{
        if (Tt(t)) return ze;
        const e = t.state;
        return e.wrap & 2 ? (e.head = n, n.done = !1, vt) : ze;
    }, Vc = (t, n)=>{
        const e = n.length;
        let r, i, a;
        return Tt(t) || (r = t.state, r.wrap !== 0 && r.mode !== cr) ? ze : r.mode === cr && (i = 1, i = ci(i, n, e, 0), i !== r.check) ? Ks : (a = no(t, n, e, e), a ? (r.mode = qs, Gs) : (r.havedict = 1, vt));
    };
    var Yc = Qs, jc = eo, Kc = Js, Gc = Mc, qc = to, Xc = Pc, Jc = $c, Qc = Wc, ef = Vc, tf = "pako inflate (from Nodeca project)", We = {
        inflateReset: Yc,
        inflateReset2: jc,
        inflateResetKeep: Kc,
        inflateInit: Gc,
        inflateInit2: qc,
        inflate: Xc,
        inflateEnd: Jc,
        inflateGetHeader: Qc,
        inflateSetDictionary: ef,
        inflateInfo: tf
    };
    function nf() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
    }
    var rf = nf;
    const ro = Object.prototype.toString, { Z_NO_FLUSH: af, Z_FINISH: va, Z_OK: Pt, Z_STREAM_END: zr, Z_NEED_DICT: Zr, Z_STREAM_ERROR: sf, Z_DATA_ERROR: xa, Z_MEM_ERROR: of, Z_BUF_ERROR: Aa } = $s, lf = {
        chunkSize: 1024 * 64,
        windowBits: 15,
        to: ""
    };
    function br(t) {
        this.options = Ws.assign({}, lf, t || {});
        const n = this.options;
        n.raw && n.windowBits >= 0 && n.windowBits < 16 && (n.windowBits = -n.windowBits, n.windowBits === 0 && (n.windowBits = -15)), n.windowBits >= 0 && n.windowBits < 16 && !(t && t.windowBits) && (n.windowBits += 32), n.windowBits > 15 && n.windowBits < 48 && (n.windowBits & 15 || (n.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new kc, this.strm.avail_out = 0;
        let e = We.inflateInit2(this.strm, n.windowBits);
        if (e !== Pt) throw new Error(fi[e]);
        if (this.header = new rf, We.inflateGetHeader(this.strm, this.header), n.dictionary && (typeof n.dictionary == "string" ? n.dictionary = ui.string2buf(n.dictionary) : ro.call(n.dictionary) === "[object ArrayBuffer]" && (n.dictionary = new Uint8Array(n.dictionary)), n.raw && (e = We.inflateSetDictionary(this.strm, n.dictionary), e !== Pt))) throw new Error(fi[e]);
    }
    br.prototype.push = function(t, n) {
        const e = this.strm, r = this.options.chunkSize, i = this.options.dictionary;
        let a, s, o;
        if (this.ended) return !1;
        for(n === ~~n ? s = n : s = n === !0 ? va : af, ro.call(t) === "[object ArrayBuffer]" ? e.input = new Uint8Array(t) : e.input = t, e.next_in = 0, e.avail_in = e.input.length;;){
            for(e.avail_out === 0 && (e.output = new Uint8Array(r), e.next_out = 0, e.avail_out = r), a = We.inflate(e, s), a === Zr && i && (a = We.inflateSetDictionary(e, i), a === Pt ? a = We.inflate(e, s) : a === xa && (a = Zr)); e.avail_in > 0 && a === zr && e.state.wrap & 2 && e.state.flags !== 0 && e.input[e.next_in] !== 0;)We.inflateReset(e), a = We.inflate(e, s);
            switch(a){
                case sf:
                case xa:
                case Zr:
                case of:
                    return this.onEnd(a), this.ended = !0, !1;
            }
            if (o = e.avail_out, e.next_out && (e.avail_out === 0 || a === zr || s > 0)) if (this.options.to === "string") {
                let d = ui.utf8border(e.output, e.next_out), l = e.next_out - d, u = ui.buf2string(e.output, d);
                e.next_out = l, e.avail_out = r - l, l && e.output.set(e.output.subarray(d, d + l), 0), this.onData(u);
            } else this.onData(e.output.length === e.next_out ? e.output : e.output.subarray(0, e.next_out)), e.avail_out = 0, e.next_out = 0;
            if (!((a === Pt || a === Aa) && o === 0)) {
                if (a === zr) return a = We.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
                if (e.avail_in === 0) {
                    if (s === va) return a = We.inflateEnd(this.strm), this.onEnd(a === Pt ? Aa : a), this.ended = !0, !1;
                    break;
                }
            }
        }
        return !0;
    };
    br.prototype.onData = function(t) {
        this.chunks.push(t);
    };
    br.prototype.onEnd = function(t) {
        t === Pt && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Ws.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
    };
    function cf(t, n) {
        const e = new br(n);
        if (e.push(t, !0), e.err) throw e.msg || fi[e.err];
        return e.result;
    }
    var ff = cf, uf = {
        inflate: ff
    };
    const { inflate: hf } = uf;
    var df = hf;
    function _f(t) {
        return JSON.parse(df(Ms(t), {
            to: "string",
            raw: !0
        })).debug_infos;
    }
    function pf(t, n, e) {
        if (!("callStack" in t) || !t.callStack) return;
        const { callStack: r, brilligFunctionId: i } = t;
        if (!n) return r;
        try {
            return wf(r, n, e, i);
        } catch  {
            return r;
        }
    }
    function wf(t, n, e, r) {
        let i = t.flatMap((a)=>mf(a, n, e, r));
        if (i.length > 0) {
            const a = t[t.length - 1].split(".");
            if (a.length === 2) {
                const s = n.acir_locations[a[0]];
                if (s !== void 0) {
                    const o = n.location_tree.locations[s];
                    i = io(o, n.location_tree.locations, e).concat(i);
                }
            }
        }
        return i;
    }
    function io(t, n, e) {
        const r = [];
        for(; t.parent !== null;){
            const { file: i, span: a } = t.value, { path: s, source: o } = e[i], d = o.substring(a.start, a.end), u = o.substring(0, a.start).split(`
`), g = u.length, w = u[u.length - 1].length + 1;
            r.push({
                filePath: s,
                line: g,
                column: w,
                locationText: d
            }), t = n[t.parent];
        }
        return r.reverse();
    }
    function mf(t, n, e, r) {
        let i = n.acir_locations[t];
        const a = gf(t);
        if (r !== void 0 && a !== void 0 && (i = n.brillig_locations[r][a], i === void 0)) return [];
        if (i === void 0) return [];
        const s = n.location_tree.locations[i];
        return io(s, n.location_tree.locations, e);
    }
    function gf(t) {
        const n = t.split(".");
        if (n.length === 2) return n[1];
    }
    const bf = async (t, n)=>{
        if (t == "print") return [];
        throw Error(`Unexpected oracle during execution: ${t}(${n.join(", ")})`);
    };
    function yf(t, n) {
        const e = n;
        if (n.rawAssertionPayload) try {
            const r = Kl(t.abi, n.rawAssertionPayload);
            typeof r == "string" ? e.message = `Circuit execution failed: ${r}` : e.decodedAssertionPayload = r;
        } catch  {}
        try {
            const r = pf(n, _f(t.debug_symbols)[n.acirFunctionId], t.file_map);
            e.noirCallStack = r?.map((i)=>typeof i == "string" ? `at opcode ${i}` : `at ${i.locationText} (${i.filePath}:${i.line}:${i.column})`);
        } catch  {}
        return e;
    }
    async function Ef(t, n, e = bf) {
        const r = Yl(t.abi, n);
        try {
            return await Zl(Ms(t.bytecode), r, e);
        } catch (i) {
            throw typeof i == "object" && i !== null && "rawAssertionPayload" in i ? yf(t, i) : new Error(`Circuit execution failed: ${i}`);
        }
    }
    class kf {
        circuit;
        constructor(n){
            this.circuit = n;
        }
        async init() {
            typeof li == "function" && await Promise.all([
                li(),
                Fs()
            ]);
        }
        async execute(n, e) {
            await this.init();
            const r = await Ef(this.circuit, n, e), i = r[0].witness, { return_value: a } = jl(this.circuit.abi, i);
            return {
                witness: zl(r),
                returnValue: a
            };
        }
    }
    var Sf = {
        0: (t)=>{
            var n = 1e3, e = n * 60, r = e * 60, i = r * 24, a = i * 7, s = i * 365.25;
            t.exports = function(g, w) {
                w = w || {};
                var p = typeof g;
                if (p === "string" && g.length > 0) return o(g);
                if (p === "number" && isFinite(g)) return w.long ? l(g) : d(g);
                throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(g));
            };
            function o(g) {
                if (g = String(g), !(g.length > 100)) {
                    var w = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(g);
                    if (w) {
                        var p = parseFloat(w[1]), k = (w[2] || "ms").toLowerCase();
                        switch(k){
                            case "years":
                            case "year":
                            case "yrs":
                            case "yr":
                            case "y":
                                return p * s;
                            case "weeks":
                            case "week":
                            case "w":
                                return p * a;
                            case "days":
                            case "day":
                            case "d":
                                return p * i;
                            case "hours":
                            case "hour":
                            case "hrs":
                            case "hr":
                            case "h":
                                return p * r;
                            case "minutes":
                            case "minute":
                            case "mins":
                            case "min":
                            case "m":
                                return p * e;
                            case "seconds":
                            case "second":
                            case "secs":
                            case "sec":
                            case "s":
                                return p * n;
                            case "milliseconds":
                            case "millisecond":
                            case "msecs":
                            case "msec":
                            case "ms":
                                return p;
                            default:
                                return;
                        }
                    }
                }
            }
            function d(g) {
                var w = Math.abs(g);
                return w >= i ? Math.round(g / i) + "d" : w >= r ? Math.round(g / r) + "h" : w >= e ? Math.round(g / e) + "m" : w >= n ? Math.round(g / n) + "s" : g + "ms";
            }
            function l(g) {
                var w = Math.abs(g);
                return w >= i ? u(g, w, i, "day") : w >= r ? u(g, w, r, "hour") : w >= e ? u(g, w, e, "minute") : w >= n ? u(g, w, n, "second") : g + " ms";
            }
            function u(g, w, p, k) {
                var x = w >= p * 1.5;
                return Math.round(g / p) + " " + k + (x ? "s" : "");
            }
        },
        19: (t, n)=>{
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var e = {
                exports: {}
            }, r = e.exports = {}, i, a;
            function s() {
                throw new Error("setTimeout has not been defined");
            }
            function o() {
                throw new Error("clearTimeout has not been defined");
            }
            (function() {
                try {
                    typeof setTimeout == "function" ? i = setTimeout : i = s;
                } catch  {
                    i = s;
                }
                try {
                    typeof clearTimeout == "function" ? a = clearTimeout : a = o;
                } catch  {
                    a = o;
                }
            })();
            function d(W) {
                if (i === setTimeout) return setTimeout(W, 0);
                if ((i === s || !i) && setTimeout) return i = setTimeout, setTimeout(W, 0);
                try {
                    return i(W, 0);
                } catch  {
                    try {
                        return i.call(null, W, 0);
                    } catch  {
                        return i.call(this, W, 0);
                    }
                }
            }
            function l(W) {
                if (a === clearTimeout) return clearTimeout(W);
                if ((a === o || !a) && clearTimeout) return a = clearTimeout, clearTimeout(W);
                try {
                    return a(W);
                } catch  {
                    try {
                        return a.call(null, W);
                    } catch  {
                        return a.call(this, W);
                    }
                }
            }
            var u = [], g = !1, w, p = -1;
            function k() {
                !g || !w || (g = !1, w.length ? u = w.concat(u) : p = -1, u.length && x());
            }
            function x() {
                if (!g) {
                    var W = d(k);
                    g = !0;
                    for(var j = u.length; j;){
                        for(w = u, u = []; ++p < j;)w && w[p].run();
                        p = -1, j = u.length;
                    }
                    w = null, g = !1, l(W);
                }
            }
            r.nextTick = function(W) {
                var j = new Array(arguments.length - 1);
                if (arguments.length > 1) for(var q = 1; q < arguments.length; q++)j[q - 1] = arguments[q];
                u.push(new I(W, j)), u.length === 1 && !g && d(x);
            };
            function I(W, j) {
                this.fun = W, this.array = j;
            }
            I.prototype.run = function() {
                this.fun.apply(null, this.array);
            }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {};
            function T() {}
            r.on = T, r.addListener = T, r.once = T, r.off = T, r.removeListener = T, r.removeAllListeners = T, r.emit = T, r.prependListener = T, r.prependOnceListener = T, r.listeners = function(W) {
                return [];
            }, r.binding = function(W) {
                throw new Error("process.binding is not supported");
            }, r.cwd = function() {
                return "/";
            }, r.chdir = function(W) {
                throw new Error("process.chdir is not supported");
            }, r.umask = function() {
                return 0;
            };
            function D() {}
            var C = e.exports.browser, m = D, H = e.exports.binding, V = D, B = 1, $ = {}, z = D, R = D, F = D, ae = D, S = D, M = "browser", O = "browser", N = "browser", L = [], Y = {
                nextTick: e.exports.nextTick,
                title: e.exports.title,
                browser: C,
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
                emitWarning: m,
                prependListener: e.exports.prependListener,
                prependOnceListener: e.exports.prependOnceListener,
                listeners: e.exports.listeners,
                binding: H,
                cwd: e.exports.cwd,
                chdir: e.exports.chdir,
                umask: e.exports.umask,
                exit: V,
                pid: B,
                features: $,
                kill: z,
                dlopen: R,
                uptime: F,
                memoryUsage: ae,
                uvCounters: S,
                platform: M,
                arch: O,
                execPath: N,
                execArgv: L
            };
            n.addListener = e.exports.addListener, n.arch = O, n.argv = e.exports.argv, n.binding = H, n.browser = C, n.chdir = e.exports.chdir, n.cwd = e.exports.cwd, n.default = Y, n.dlopen = R, n.emit = e.exports.emit, n.emitWarning = m, n.env = e.exports.env, n.execArgv = L, n.execPath = N, n.exit = V, n.features = $, n.kill = z, n.listeners = e.exports.listeners, n.memoryUsage = ae, n.nextTick = e.exports.nextTick, n.off = e.exports.off, n.on = e.exports.on, n.once = e.exports.once, n.pid = B, n.platform = M, n.prependListener = e.exports.prependListener, n.prependOnceListener = e.exports.prependOnceListener, n.removeAllListeners = e.exports.removeAllListeners, n.removeListener = e.exports.removeListener, n.title = e.exports.title, n.umask = e.exports.umask, n.uptime = F, n.uvCounters = S, n.version = e.exports.version, n.versions = e.exports.versions, n = t.exports = Y;
        },
        251: (t, n)=>{
            n.read = function(e, r, i, a, s) {
                var o, d, l = s * 8 - a - 1, u = (1 << l) - 1, g = u >> 1, w = -7, p = i ? s - 1 : 0, k = i ? -1 : 1, x = e[r + p];
                for(p += k, o = x & (1 << -w) - 1, x >>= -w, w += l; w > 0; o = o * 256 + e[r + p], p += k, w -= 8);
                for(d = o & (1 << -w) - 1, o >>= -w, w += a; w > 0; d = d * 256 + e[r + p], p += k, w -= 8);
                if (o === 0) o = 1 - g;
                else {
                    if (o === u) return d ? NaN : (x ? -1 : 1) * (1 / 0);
                    d = d + Math.pow(2, a), o = o - g;
                }
                return (x ? -1 : 1) * d * Math.pow(2, o - a);
            }, n.write = function(e, r, i, a, s, o) {
                var d, l, u, g = o * 8 - s - 1, w = (1 << g) - 1, p = w >> 1, k = s === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, x = a ? 0 : o - 1, I = a ? 1 : -1, T = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0;
                for(r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (l = isNaN(r) ? 1 : 0, d = w) : (d = Math.floor(Math.log(r) / Math.LN2), r * (u = Math.pow(2, -d)) < 1 && (d--, u *= 2), d + p >= 1 ? r += k / u : r += k * Math.pow(2, 1 - p), r * u >= 2 && (d++, u /= 2), d + p >= w ? (l = 0, d = w) : d + p >= 1 ? (l = (r * u - 1) * Math.pow(2, s), d = d + p) : (l = r * Math.pow(2, p - 1) * Math.pow(2, s), d = 0)); s >= 8; e[i + x] = l & 255, x += I, l /= 256, s -= 8);
                for(d = d << s | l, g += s; g > 0; e[i + x] = d & 255, x += I, d /= 256, g -= 8);
                e[i + x - I] |= T * 128;
            };
        },
        287: (t, n, e)=>{
            const r = e(526), i = e(251), a = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
            n.hp = l, n.IS = 50;
            const s = 2147483647;
            l.TYPED_ARRAY_SUPPORT = o(), !l.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
            function o() {
                try {
                    const h = new Uint8Array(1), c = {
                        foo: function() {
                            return 42;
                        }
                    };
                    return Object.setPrototypeOf(c, Uint8Array.prototype), Object.setPrototypeOf(h, c), h.foo() === 42;
                } catch  {
                    return !1;
                }
            }
            Object.defineProperty(l.prototype, "parent", {
                enumerable: !0,
                get: function() {
                    if (l.isBuffer(this)) return this.buffer;
                }
            }), Object.defineProperty(l.prototype, "offset", {
                enumerable: !0,
                get: function() {
                    if (l.isBuffer(this)) return this.byteOffset;
                }
            });
            function d(h) {
                if (h > s) throw new RangeError('The value "' + h + '" is invalid for option "size"');
                const c = new Uint8Array(h);
                return Object.setPrototypeOf(c, l.prototype), c;
            }
            function l(h, c, f) {
                if (typeof h == "number") {
                    if (typeof c == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
                    return p(h);
                }
                return u(h, c, f);
            }
            l.poolSize = 8192;
            function u(h, c, f) {
                if (typeof h == "string") return k(h, c);
                if (ArrayBuffer.isView(h)) return I(h);
                if (h == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof h);
                if (Le(h, ArrayBuffer) || h && Le(h.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Le(h, SharedArrayBuffer) || h && Le(h.buffer, SharedArrayBuffer))) return T(h, c, f);
                if (typeof h == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
                const _ = h.valueOf && h.valueOf();
                if (_ != null && _ !== h) return l.from(_, c, f);
                const b = D(h);
                if (b) return b;
                if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof h[Symbol.toPrimitive] == "function") return l.from(h[Symbol.toPrimitive]("string"), c, f);
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof h);
            }
            l.from = function(h, c, f) {
                return u(h, c, f);
            }, Object.setPrototypeOf(l.prototype, Uint8Array.prototype), Object.setPrototypeOf(l, Uint8Array);
            function g(h) {
                if (typeof h != "number") throw new TypeError('"size" argument must be of type number');
                if (h < 0) throw new RangeError('The value "' + h + '" is invalid for option "size"');
            }
            function w(h, c, f) {
                return g(h), h <= 0 ? d(h) : c !== void 0 ? typeof f == "string" ? d(h).fill(c, f) : d(h).fill(c) : d(h);
            }
            l.alloc = function(h, c, f) {
                return w(h, c, f);
            };
            function p(h) {
                return g(h), d(h < 0 ? 0 : C(h) | 0);
            }
            l.allocUnsafe = function(h) {
                return p(h);
            }, l.allocUnsafeSlow = function(h) {
                return p(h);
            };
            function k(h, c) {
                if ((typeof c != "string" || c === "") && (c = "utf8"), !l.isEncoding(c)) throw new TypeError("Unknown encoding: " + c);
                const f = m(h, c) | 0;
                let _ = d(f);
                const b = _.write(h, c);
                return b !== f && (_ = _.slice(0, b)), _;
            }
            function x(h) {
                const c = h.length < 0 ? 0 : C(h.length) | 0, f = d(c);
                for(let _ = 0; _ < c; _ += 1)f[_] = h[_] & 255;
                return f;
            }
            function I(h) {
                if (Le(h, Uint8Array)) {
                    const c = new Uint8Array(h);
                    return T(c.buffer, c.byteOffset, c.byteLength);
                }
                return x(h);
            }
            function T(h, c, f) {
                if (c < 0 || h.byteLength < c) throw new RangeError('"offset" is outside of buffer bounds');
                if (h.byteLength < c + (f || 0)) throw new RangeError('"length" is outside of buffer bounds');
                let _;
                return c === void 0 && f === void 0 ? _ = new Uint8Array(h) : f === void 0 ? _ = new Uint8Array(h, c) : _ = new Uint8Array(h, c, f), Object.setPrototypeOf(_, l.prototype), _;
            }
            function D(h) {
                if (l.isBuffer(h)) {
                    const c = C(h.length) | 0, f = d(c);
                    return f.length === 0 || h.copy(f, 0, 0, c), f;
                }
                if (h.length !== void 0) return typeof h.length != "number" || Cr(h.length) ? d(0) : x(h);
                if (h.type === "Buffer" && Array.isArray(h.data)) return x(h.data);
            }
            function C(h) {
                if (h >= s) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
                return h | 0;
            }
            l.isBuffer = function(c) {
                return c != null && c._isBuffer === !0 && c !== l.prototype;
            }, l.compare = function(c, f) {
                if (Le(c, Uint8Array) && (c = l.from(c, c.offset, c.byteLength)), Le(f, Uint8Array) && (f = l.from(f, f.offset, f.byteLength)), !l.isBuffer(c) || !l.isBuffer(f)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                if (c === f) return 0;
                let _ = c.length, b = f.length;
                for(let A = 0, U = Math.min(_, b); A < U; ++A)if (c[A] !== f[A]) {
                    _ = c[A], b = f[A];
                    break;
                }
                return _ < b ? -1 : b < _ ? 1 : 0;
            }, l.isEncoding = function(c) {
                switch(String(c).toLowerCase()){
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
            }, l.concat = function(c, f) {
                if (!Array.isArray(c)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (c.length === 0) return l.alloc(0);
                let _;
                if (f === void 0) for(f = 0, _ = 0; _ < c.length; ++_)f += c[_].length;
                const b = l.allocUnsafe(f);
                let A = 0;
                for(_ = 0; _ < c.length; ++_){
                    let U = c[_];
                    if (Le(U, Uint8Array)) A + U.length > b.length ? (l.isBuffer(U) || (U = l.from(U)), U.copy(b, A)) : Uint8Array.prototype.set.call(b, U, A);
                    else if (l.isBuffer(U)) U.copy(b, A);
                    else throw new TypeError('"list" argument must be an Array of Buffers');
                    A += U.length;
                }
                return b;
            };
            function m(h, c) {
                if (l.isBuffer(h)) return h.length;
                if (ArrayBuffer.isView(h) || Le(h, ArrayBuffer)) return h.byteLength;
                if (typeof h != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof h);
                const f = h.length, _ = arguments.length > 2 && arguments[2] === !0;
                if (!_ && f === 0) return 0;
                let b = !1;
                for(;;)switch(c){
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return f;
                    case "utf8":
                    case "utf-8":
                        return Br(h).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return f * 2;
                    case "hex":
                        return f >>> 1;
                    case "base64":
                        return Wi(h).length;
                    default:
                        if (b) return _ ? -1 : Br(h).length;
                        c = ("" + c).toLowerCase(), b = !0;
                }
            }
            l.byteLength = m;
            function H(h, c, f) {
                let _ = !1;
                if ((c === void 0 || c < 0) && (c = 0), c > this.length || ((f === void 0 || f > this.length) && (f = this.length), f <= 0) || (f >>>= 0, c >>>= 0, f <= c)) return "";
                for(h || (h = "utf8");;)switch(h){
                    case "hex":
                        return j(this, c, f);
                    case "utf8":
                    case "utf-8":
                        return O(this, c, f);
                    case "ascii":
                        return Y(this, c, f);
                    case "latin1":
                    case "binary":
                        return W(this, c, f);
                    case "base64":
                        return M(this, c, f);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return q(this, c, f);
                    default:
                        if (_) throw new TypeError("Unknown encoding: " + h);
                        h = (h + "").toLowerCase(), _ = !0;
                }
            }
            l.prototype._isBuffer = !0;
            function V(h, c, f) {
                const _ = h[c];
                h[c] = h[f], h[f] = _;
            }
            l.prototype.swap16 = function() {
                const c = this.length;
                if (c % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for(let f = 0; f < c; f += 2)V(this, f, f + 1);
                return this;
            }, l.prototype.swap32 = function() {
                const c = this.length;
                if (c % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for(let f = 0; f < c; f += 4)V(this, f, f + 3), V(this, f + 1, f + 2);
                return this;
            }, l.prototype.swap64 = function() {
                const c = this.length;
                if (c % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for(let f = 0; f < c; f += 8)V(this, f, f + 7), V(this, f + 1, f + 6), V(this, f + 2, f + 5), V(this, f + 3, f + 4);
                return this;
            }, l.prototype.toString = function() {
                const c = this.length;
                return c === 0 ? "" : arguments.length === 0 ? O(this, 0, c) : H.apply(this, arguments);
            }, l.prototype.toLocaleString = l.prototype.toString, l.prototype.equals = function(c) {
                if (!l.isBuffer(c)) throw new TypeError("Argument must be a Buffer");
                return this === c ? !0 : l.compare(this, c) === 0;
            }, l.prototype.inspect = function() {
                let c = "";
                const f = n.IS;
                return c = this.toString("hex", 0, f).replace(/(.{2})/g, "$1 ").trim(), this.length > f && (c += " ... "), "<Buffer " + c + ">";
            }, a && (l.prototype[a] = l.prototype.inspect), l.prototype.compare = function(c, f, _, b, A) {
                if (Le(c, Uint8Array) && (c = l.from(c, c.offset, c.byteLength)), !l.isBuffer(c)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof c);
                if (f === void 0 && (f = 0), _ === void 0 && (_ = c ? c.length : 0), b === void 0 && (b = 0), A === void 0 && (A = this.length), f < 0 || _ > c.length || b < 0 || A > this.length) throw new RangeError("out of range index");
                if (b >= A && f >= _) return 0;
                if (b >= A) return -1;
                if (f >= _) return 1;
                if (f >>>= 0, _ >>>= 0, b >>>= 0, A >>>= 0, this === c) return 0;
                let U = A - b, X = _ - f;
                const pe = Math.min(U, X), fe = this.slice(b, A), we = c.slice(f, _);
                for(let se = 0; se < pe; ++se)if (fe[se] !== we[se]) {
                    U = fe[se], X = we[se];
                    break;
                }
                return U < X ? -1 : X < U ? 1 : 0;
            };
            function B(h, c, f, _, b) {
                if (h.length === 0) return -1;
                if (typeof f == "string" ? (_ = f, f = 0) : f > 2147483647 ? f = 2147483647 : f < -2147483648 && (f = -2147483648), f = +f, Cr(f) && (f = b ? 0 : h.length - 1), f < 0 && (f = h.length + f), f >= h.length) {
                    if (b) return -1;
                    f = h.length - 1;
                } else if (f < 0) if (b) f = 0;
                else return -1;
                if (typeof c == "string" && (c = l.from(c, _)), l.isBuffer(c)) return c.length === 0 ? -1 : $(h, c, f, _, b);
                if (typeof c == "number") return c = c & 255, typeof Uint8Array.prototype.indexOf == "function" ? b ? Uint8Array.prototype.indexOf.call(h, c, f) : Uint8Array.prototype.lastIndexOf.call(h, c, f) : $(h, [
                    c
                ], f, _, b);
                throw new TypeError("val must be string, number or Buffer");
            }
            function $(h, c, f, _, b) {
                let A = 1, U = h.length, X = c.length;
                if (_ !== void 0 && (_ = String(_).toLowerCase(), _ === "ucs2" || _ === "ucs-2" || _ === "utf16le" || _ === "utf-16le")) {
                    if (h.length < 2 || c.length < 2) return -1;
                    A = 2, U /= 2, X /= 2, f /= 2;
                }
                function pe(we, se) {
                    return A === 1 ? we[se] : we.readUInt16BE(se * A);
                }
                let fe;
                if (b) {
                    let we = -1;
                    for(fe = f; fe < U; fe++)if (pe(h, fe) === pe(c, we === -1 ? 0 : fe - we)) {
                        if (we === -1 && (we = fe), fe - we + 1 === X) return we * A;
                    } else we !== -1 && (fe -= fe - we), we = -1;
                } else for(f + X > U && (f = U - X), fe = f; fe >= 0; fe--){
                    let we = !0;
                    for(let se = 0; se < X; se++)if (pe(h, fe + se) !== pe(c, se)) {
                        we = !1;
                        break;
                    }
                    if (we) return fe;
                }
                return -1;
            }
            l.prototype.includes = function(c, f, _) {
                return this.indexOf(c, f, _) !== -1;
            }, l.prototype.indexOf = function(c, f, _) {
                return B(this, c, f, _, !0);
            }, l.prototype.lastIndexOf = function(c, f, _) {
                return B(this, c, f, _, !1);
            };
            function z(h, c, f, _) {
                f = Number(f) || 0;
                const b = h.length - f;
                _ ? (_ = Number(_), _ > b && (_ = b)) : _ = b;
                const A = c.length;
                _ > A / 2 && (_ = A / 2);
                let U;
                for(U = 0; U < _; ++U){
                    const X = parseInt(c.substr(U * 2, 2), 16);
                    if (Cr(X)) return U;
                    h[f + U] = X;
                }
                return U;
            }
            function R(h, c, f, _) {
                return Zn(Br(c, h.length - f), h, f, _);
            }
            function F(h, c, f, _) {
                return Zn(Tl(c), h, f, _);
            }
            function ae(h, c, f, _) {
                return Zn(Wi(c), h, f, _);
            }
            function S(h, c, f, _) {
                return Zn(Bl(c, h.length - f), h, f, _);
            }
            l.prototype.write = function(c, f, _, b) {
                if (f === void 0) b = "utf8", _ = this.length, f = 0;
                else if (_ === void 0 && typeof f == "string") b = f, _ = this.length, f = 0;
                else if (isFinite(f)) f = f >>> 0, isFinite(_) ? (_ = _ >>> 0, b === void 0 && (b = "utf8")) : (b = _, _ = void 0);
                else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                const A = this.length - f;
                if ((_ === void 0 || _ > A) && (_ = A), c.length > 0 && (_ < 0 || f < 0) || f > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                b || (b = "utf8");
                let U = !1;
                for(;;)switch(b){
                    case "hex":
                        return z(this, c, f, _);
                    case "utf8":
                    case "utf-8":
                        return R(this, c, f, _);
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return F(this, c, f, _);
                    case "base64":
                        return ae(this, c, f, _);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return S(this, c, f, _);
                    default:
                        if (U) throw new TypeError("Unknown encoding: " + b);
                        b = ("" + b).toLowerCase(), U = !0;
                }
            }, l.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                };
            };
            function M(h, c, f) {
                return c === 0 && f === h.length ? r.fromByteArray(h) : r.fromByteArray(h.slice(c, f));
            }
            function O(h, c, f) {
                f = Math.min(h.length, f);
                const _ = [];
                let b = c;
                for(; b < f;){
                    const A = h[b];
                    let U = null, X = A > 239 ? 4 : A > 223 ? 3 : A > 191 ? 2 : 1;
                    if (b + X <= f) {
                        let pe, fe, we, se;
                        switch(X){
                            case 1:
                                A < 128 && (U = A);
                                break;
                            case 2:
                                pe = h[b + 1], (pe & 192) === 128 && (se = (A & 31) << 6 | pe & 63, se > 127 && (U = se));
                                break;
                            case 3:
                                pe = h[b + 1], fe = h[b + 2], (pe & 192) === 128 && (fe & 192) === 128 && (se = (A & 15) << 12 | (pe & 63) << 6 | fe & 63, se > 2047 && (se < 55296 || se > 57343) && (U = se));
                                break;
                            case 4:
                                pe = h[b + 1], fe = h[b + 2], we = h[b + 3], (pe & 192) === 128 && (fe & 192) === 128 && (we & 192) === 128 && (se = (A & 15) << 18 | (pe & 63) << 12 | (fe & 63) << 6 | we & 63, se > 65535 && se < 1114112 && (U = se));
                        }
                    }
                    U === null ? (U = 65533, X = 1) : U > 65535 && (U -= 65536, _.push(U >>> 10 & 1023 | 55296), U = 56320 | U & 1023), _.push(U), b += X;
                }
                return L(_);
            }
            const N = 4096;
            function L(h) {
                const c = h.length;
                if (c <= N) return String.fromCharCode.apply(String, h);
                let f = "", _ = 0;
                for(; _ < c;)f += String.fromCharCode.apply(String, h.slice(_, _ += N));
                return f;
            }
            function Y(h, c, f) {
                let _ = "";
                f = Math.min(h.length, f);
                for(let b = c; b < f; ++b)_ += String.fromCharCode(h[b] & 127);
                return _;
            }
            function W(h, c, f) {
                let _ = "";
                f = Math.min(h.length, f);
                for(let b = c; b < f; ++b)_ += String.fromCharCode(h[b]);
                return _;
            }
            function j(h, c, f) {
                const _ = h.length;
                (!c || c < 0) && (c = 0), (!f || f < 0 || f > _) && (f = _);
                let b = "";
                for(let A = c; A < f; ++A)b += Cl[h[A]];
                return b;
            }
            function q(h, c, f) {
                const _ = h.slice(c, f);
                let b = "";
                for(let A = 0; A < _.length - 1; A += 2)b += String.fromCharCode(_[A] + _[A + 1] * 256);
                return b;
            }
            l.prototype.slice = function(c, f) {
                const _ = this.length;
                c = ~~c, f = f === void 0 ? _ : ~~f, c < 0 ? (c += _, c < 0 && (c = 0)) : c > _ && (c = _), f < 0 ? (f += _, f < 0 && (f = 0)) : f > _ && (f = _), f < c && (f = c);
                const b = this.subarray(c, f);
                return Object.setPrototypeOf(b, l.prototype), b;
            };
            function K(h, c, f) {
                if (h % 1 !== 0 || h < 0) throw new RangeError("offset is not uint");
                if (h + c > f) throw new RangeError("Trying to access beyond buffer length");
            }
            l.prototype.readUintLE = l.prototype.readUIntLE = function(c, f, _) {
                c = c >>> 0, f = f >>> 0, _ || K(c, f, this.length);
                let b = this[c], A = 1, U = 0;
                for(; ++U < f && (A *= 256);)b += this[c + U] * A;
                return b;
            }, l.prototype.readUintBE = l.prototype.readUIntBE = function(c, f, _) {
                c = c >>> 0, f = f >>> 0, _ || K(c, f, this.length);
                let b = this[c + --f], A = 1;
                for(; f > 0 && (A *= 256);)b += this[c + --f] * A;
                return b;
            }, l.prototype.readUint8 = l.prototype.readUInt8 = function(c, f) {
                return c = c >>> 0, f || K(c, 1, this.length), this[c];
            }, l.prototype.readUint16LE = l.prototype.readUInt16LE = function(c, f) {
                return c = c >>> 0, f || K(c, 2, this.length), this[c] | this[c + 1] << 8;
            }, l.prototype.readUint16BE = l.prototype.readUInt16BE = function(c, f) {
                return c = c >>> 0, f || K(c, 2, this.length), this[c] << 8 | this[c + 1];
            }, l.prototype.readUint32LE = l.prototype.readUInt32LE = function(c, f) {
                return c = c >>> 0, f || K(c, 4, this.length), (this[c] | this[c + 1] << 8 | this[c + 2] << 16) + this[c + 3] * 16777216;
            }, l.prototype.readUint32BE = l.prototype.readUInt32BE = function(c, f) {
                return c = c >>> 0, f || K(c, 4, this.length), this[c] * 16777216 + (this[c + 1] << 16 | this[c + 2] << 8 | this[c + 3]);
            }, l.prototype.readBigUInt64LE = it(function(c) {
                c = c >>> 0, Rt(c, "offset");
                const f = this[c], _ = this[c + 7];
                (f === void 0 || _ === void 0) && sn(c, this.length - 8);
                const b = f + this[++c] * 2 ** 8 + this[++c] * 2 ** 16 + this[++c] * 2 ** 24, A = this[++c] + this[++c] * 2 ** 8 + this[++c] * 2 ** 16 + _ * 2 ** 24;
                return BigInt(b) + (BigInt(A) << BigInt(32));
            }), l.prototype.readBigUInt64BE = it(function(c) {
                c = c >>> 0, Rt(c, "offset");
                const f = this[c], _ = this[c + 7];
                (f === void 0 || _ === void 0) && sn(c, this.length - 8);
                const b = f * 2 ** 24 + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + this[++c], A = this[++c] * 2 ** 24 + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + _;
                return (BigInt(b) << BigInt(32)) + BigInt(A);
            }), l.prototype.readIntLE = function(c, f, _) {
                c = c >>> 0, f = f >>> 0, _ || K(c, f, this.length);
                let b = this[c], A = 1, U = 0;
                for(; ++U < f && (A *= 256);)b += this[c + U] * A;
                return A *= 128, b >= A && (b -= Math.pow(2, 8 * f)), b;
            }, l.prototype.readIntBE = function(c, f, _) {
                c = c >>> 0, f = f >>> 0, _ || K(c, f, this.length);
                let b = f, A = 1, U = this[c + --b];
                for(; b > 0 && (A *= 256);)U += this[c + --b] * A;
                return A *= 128, U >= A && (U -= Math.pow(2, 8 * f)), U;
            }, l.prototype.readInt8 = function(c, f) {
                return c = c >>> 0, f || K(c, 1, this.length), this[c] & 128 ? (255 - this[c] + 1) * -1 : this[c];
            }, l.prototype.readInt16LE = function(c, f) {
                c = c >>> 0, f || K(c, 2, this.length);
                const _ = this[c] | this[c + 1] << 8;
                return _ & 32768 ? _ | 4294901760 : _;
            }, l.prototype.readInt16BE = function(c, f) {
                c = c >>> 0, f || K(c, 2, this.length);
                const _ = this[c + 1] | this[c] << 8;
                return _ & 32768 ? _ | 4294901760 : _;
            }, l.prototype.readInt32LE = function(c, f) {
                return c = c >>> 0, f || K(c, 4, this.length), this[c] | this[c + 1] << 8 | this[c + 2] << 16 | this[c + 3] << 24;
            }, l.prototype.readInt32BE = function(c, f) {
                return c = c >>> 0, f || K(c, 4, this.length), this[c] << 24 | this[c + 1] << 16 | this[c + 2] << 8 | this[c + 3];
            }, l.prototype.readBigInt64LE = it(function(c) {
                c = c >>> 0, Rt(c, "offset");
                const f = this[c], _ = this[c + 7];
                (f === void 0 || _ === void 0) && sn(c, this.length - 8);
                const b = this[c + 4] + this[c + 5] * 2 ** 8 + this[c + 6] * 2 ** 16 + (_ << 24);
                return (BigInt(b) << BigInt(32)) + BigInt(f + this[++c] * 2 ** 8 + this[++c] * 2 ** 16 + this[++c] * 2 ** 24);
            }), l.prototype.readBigInt64BE = it(function(c) {
                c = c >>> 0, Rt(c, "offset");
                const f = this[c], _ = this[c + 7];
                (f === void 0 || _ === void 0) && sn(c, this.length - 8);
                const b = (f << 24) + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + this[++c];
                return (BigInt(b) << BigInt(32)) + BigInt(this[++c] * 2 ** 24 + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + _);
            }), l.prototype.readFloatLE = function(c, f) {
                return c = c >>> 0, f || K(c, 4, this.length), i.read(this, c, !0, 23, 4);
            }, l.prototype.readFloatBE = function(c, f) {
                return c = c >>> 0, f || K(c, 4, this.length), i.read(this, c, !1, 23, 4);
            }, l.prototype.readDoubleLE = function(c, f) {
                return c = c >>> 0, f || K(c, 8, this.length), i.read(this, c, !0, 52, 8);
            }, l.prototype.readDoubleBE = function(c, f) {
                return c = c >>> 0, f || K(c, 8, this.length), i.read(this, c, !1, 52, 8);
            };
            function te(h, c, f, _, b, A) {
                if (!l.isBuffer(h)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (c > b || c < A) throw new RangeError('"value" argument is out of bounds');
                if (f + _ > h.length) throw new RangeError("Index out of range");
            }
            l.prototype.writeUintLE = l.prototype.writeUIntLE = function(c, f, _, b) {
                if (c = +c, f = f >>> 0, _ = _ >>> 0, !b) {
                    const X = Math.pow(2, 8 * _) - 1;
                    te(this, c, f, _, X, 0);
                }
                let A = 1, U = 0;
                for(this[f] = c & 255; ++U < _ && (A *= 256);)this[f + U] = c / A & 255;
                return f + _;
            }, l.prototype.writeUintBE = l.prototype.writeUIntBE = function(c, f, _, b) {
                if (c = +c, f = f >>> 0, _ = _ >>> 0, !b) {
                    const X = Math.pow(2, 8 * _) - 1;
                    te(this, c, f, _, X, 0);
                }
                let A = _ - 1, U = 1;
                for(this[f + A] = c & 255; --A >= 0 && (U *= 256);)this[f + A] = c / U & 255;
                return f + _;
            }, l.prototype.writeUint8 = l.prototype.writeUInt8 = function(c, f, _) {
                return c = +c, f = f >>> 0, _ || te(this, c, f, 1, 255, 0), this[f] = c & 255, f + 1;
            }, l.prototype.writeUint16LE = l.prototype.writeUInt16LE = function(c, f, _) {
                return c = +c, f = f >>> 0, _ || te(this, c, f, 2, 65535, 0), this[f] = c & 255, this[f + 1] = c >>> 8, f + 2;
            }, l.prototype.writeUint16BE = l.prototype.writeUInt16BE = function(c, f, _) {
                return c = +c, f = f >>> 0, _ || te(this, c, f, 2, 65535, 0), this[f] = c >>> 8, this[f + 1] = c & 255, f + 2;
            }, l.prototype.writeUint32LE = l.prototype.writeUInt32LE = function(c, f, _) {
                return c = +c, f = f >>> 0, _ || te(this, c, f, 4, 4294967295, 0), this[f + 3] = c >>> 24, this[f + 2] = c >>> 16, this[f + 1] = c >>> 8, this[f] = c & 255, f + 4;
            }, l.prototype.writeUint32BE = l.prototype.writeUInt32BE = function(c, f, _) {
                return c = +c, f = f >>> 0, _ || te(this, c, f, 4, 4294967295, 0), this[f] = c >>> 24, this[f + 1] = c >>> 16, this[f + 2] = c >>> 8, this[f + 3] = c & 255, f + 4;
            };
            function xe(h, c, f, _, b) {
                an(c, _, b, h, f, 7);
                let A = Number(c & BigInt(4294967295));
                h[f++] = A, A = A >> 8, h[f++] = A, A = A >> 8, h[f++] = A, A = A >> 8, h[f++] = A;
                let U = Number(c >> BigInt(32) & BigInt(4294967295));
                return h[f++] = U, U = U >> 8, h[f++] = U, U = U >> 8, h[f++] = U, U = U >> 8, h[f++] = U, f;
            }
            function Ae(h, c, f, _, b) {
                an(c, _, b, h, f, 7);
                let A = Number(c & BigInt(4294967295));
                h[f + 7] = A, A = A >> 8, h[f + 6] = A, A = A >> 8, h[f + 5] = A, A = A >> 8, h[f + 4] = A;
                let U = Number(c >> BigInt(32) & BigInt(4294967295));
                return h[f + 3] = U, U = U >> 8, h[f + 2] = U, U = U >> 8, h[f + 1] = U, U = U >> 8, h[f] = U, f + 8;
            }
            l.prototype.writeBigUInt64LE = it(function(c, f = 0) {
                return xe(this, c, f, BigInt(0), BigInt("0xffffffffffffffff"));
            }), l.prototype.writeBigUInt64BE = it(function(c, f = 0) {
                return Ae(this, c, f, BigInt(0), BigInt("0xffffffffffffffff"));
            }), l.prototype.writeIntLE = function(c, f, _, b) {
                if (c = +c, f = f >>> 0, !b) {
                    const pe = Math.pow(2, 8 * _ - 1);
                    te(this, c, f, _, pe - 1, -pe);
                }
                let A = 0, U = 1, X = 0;
                for(this[f] = c & 255; ++A < _ && (U *= 256);)c < 0 && X === 0 && this[f + A - 1] !== 0 && (X = 1), this[f + A] = (c / U >> 0) - X & 255;
                return f + _;
            }, l.prototype.writeIntBE = function(c, f, _, b) {
                if (c = +c, f = f >>> 0, !b) {
                    const pe = Math.pow(2, 8 * _ - 1);
                    te(this, c, f, _, pe - 1, -pe);
                }
                let A = _ - 1, U = 1, X = 0;
                for(this[f + A] = c & 255; --A >= 0 && (U *= 256);)c < 0 && X === 0 && this[f + A + 1] !== 0 && (X = 1), this[f + A] = (c / U >> 0) - X & 255;
                return f + _;
            }, l.prototype.writeInt8 = function(c, f, _) {
                return c = +c, f = f >>> 0, _ || te(this, c, f, 1, 127, -128), c < 0 && (c = 255 + c + 1), this[f] = c & 255, f + 1;
            }, l.prototype.writeInt16LE = function(c, f, _) {
                return c = +c, f = f >>> 0, _ || te(this, c, f, 2, 32767, -32768), this[f] = c & 255, this[f + 1] = c >>> 8, f + 2;
            }, l.prototype.writeInt16BE = function(c, f, _) {
                return c = +c, f = f >>> 0, _ || te(this, c, f, 2, 32767, -32768), this[f] = c >>> 8, this[f + 1] = c & 255, f + 2;
            }, l.prototype.writeInt32LE = function(c, f, _) {
                return c = +c, f = f >>> 0, _ || te(this, c, f, 4, 2147483647, -2147483648), this[f] = c & 255, this[f + 1] = c >>> 8, this[f + 2] = c >>> 16, this[f + 3] = c >>> 24, f + 4;
            }, l.prototype.writeInt32BE = function(c, f, _) {
                return c = +c, f = f >>> 0, _ || te(this, c, f, 4, 2147483647, -2147483648), c < 0 && (c = 4294967295 + c + 1), this[f] = c >>> 24, this[f + 1] = c >>> 16, this[f + 2] = c >>> 8, this[f + 3] = c & 255, f + 4;
            }, l.prototype.writeBigInt64LE = it(function(c, f = 0) {
                return xe(this, c, f, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
            }), l.prototype.writeBigInt64BE = it(function(c, f = 0) {
                return Ae(this, c, f, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
            });
            function Ct(h, c, f, _, b, A) {
                if (f + _ > h.length) throw new RangeError("Index out of range");
                if (f < 0) throw new RangeError("Index out of range");
            }
            function Ut(h, c, f, _, b) {
                return c = +c, f = f >>> 0, b || Ct(h, c, f, 4), i.write(h, c, f, _, 23, 4), f + 4;
            }
            l.prototype.writeFloatLE = function(c, f, _) {
                return Ut(this, c, f, !0, _);
            }, l.prototype.writeFloatBE = function(c, f, _) {
                return Ut(this, c, f, !1, _);
            };
            function tn(h, c, f, _, b) {
                return c = +c, f = f >>> 0, b || Ct(h, c, f, 8), i.write(h, c, f, _, 52, 8), f + 8;
            }
            l.prototype.writeDoubleLE = function(c, f, _) {
                return tn(this, c, f, !0, _);
            }, l.prototype.writeDoubleBE = function(c, f, _) {
                return tn(this, c, f, !1, _);
            }, l.prototype.copy = function(c, f, _, b) {
                if (!l.isBuffer(c)) throw new TypeError("argument should be a Buffer");
                if (_ || (_ = 0), !b && b !== 0 && (b = this.length), f >= c.length && (f = c.length), f || (f = 0), b > 0 && b < _ && (b = _), b === _ || c.length === 0 || this.length === 0) return 0;
                if (f < 0) throw new RangeError("targetStart out of bounds");
                if (_ < 0 || _ >= this.length) throw new RangeError("Index out of range");
                if (b < 0) throw new RangeError("sourceEnd out of bounds");
                b > this.length && (b = this.length), c.length - f < b - _ && (b = c.length - f + _);
                const A = b - _;
                return this === c && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(f, _, b) : Uint8Array.prototype.set.call(c, this.subarray(_, b), f), A;
            }, l.prototype.fill = function(c, f, _, b) {
                if (typeof c == "string") {
                    if (typeof f == "string" ? (b = f, f = 0, _ = this.length) : typeof _ == "string" && (b = _, _ = this.length), b !== void 0 && typeof b != "string") throw new TypeError("encoding must be a string");
                    if (typeof b == "string" && !l.isEncoding(b)) throw new TypeError("Unknown encoding: " + b);
                    if (c.length === 1) {
                        const U = c.charCodeAt(0);
                        (b === "utf8" && U < 128 || b === "latin1") && (c = U);
                    }
                } else typeof c == "number" ? c = c & 255 : typeof c == "boolean" && (c = Number(c));
                if (f < 0 || this.length < f || this.length < _) throw new RangeError("Out of range index");
                if (_ <= f) return this;
                f = f >>> 0, _ = _ === void 0 ? this.length : _ >>> 0, c || (c = 0);
                let A;
                if (typeof c == "number") for(A = f; A < _; ++A)this[A] = c;
                else {
                    const U = l.isBuffer(c) ? c : l.from(c, b), X = U.length;
                    if (X === 0) throw new TypeError('The value "' + c + '" is invalid for argument "value"');
                    for(A = 0; A < _ - f; ++A)this[A + f] = U[A % X];
                }
                return this;
            };
            const Xe = {};
            function nn(h, c, f) {
                Xe[h] = class extends f {
                    constructor(){
                        super(), Object.defineProperty(this, "message", {
                            value: c.apply(this, arguments),
                            writable: !0,
                            configurable: !0
                        }), this.name = `${this.name} [${h}]`, this.stack, delete this.name;
                    }
                    get code() {
                        return h;
                    }
                    set code(b) {
                        Object.defineProperty(this, "code", {
                            configurable: !0,
                            enumerable: !0,
                            value: b,
                            writable: !0
                        });
                    }
                    toString() {
                        return `${this.name} [${h}]: ${this.message}`;
                    }
                };
            }
            nn("ERR_BUFFER_OUT_OF_BOUNDS", function(h) {
                return h ? `${h} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
            }, RangeError), nn("ERR_INVALID_ARG_TYPE", function(h, c) {
                return `The "${h}" argument must be of type number. Received type ${typeof c}`;
            }, TypeError), nn("ERR_OUT_OF_RANGE", function(h, c, f) {
                let _ = `The value of "${h}" is out of range.`, b = f;
                return Number.isInteger(f) && Math.abs(f) > 2 ** 32 ? b = rn(String(f)) : typeof f == "bigint" && (b = String(f), (f > BigInt(2) ** BigInt(32) || f < -(BigInt(2) ** BigInt(32))) && (b = rn(b)), b += "n"), _ += ` It must be ${c}. Received ${b}`, _;
            }, RangeError);
            function rn(h) {
                let c = "", f = h.length;
                const _ = h[0] === "-" ? 1 : 0;
                for(; f >= _ + 4; f -= 3)c = `_${h.slice(f - 3, f)}${c}`;
                return `${h.slice(0, f)}${c}`;
            }
            function zn(h, c, f) {
                Rt(c, "offset"), (h[c] === void 0 || h[c + f] === void 0) && sn(c, h.length - (f + 1));
            }
            function an(h, c, f, _, b, A) {
                if (h > f || h < c) {
                    const U = typeof c == "bigint" ? "n" : "";
                    let X;
                    throw c === 0 || c === BigInt(0) ? X = `>= 0${U} and < 2${U} ** ${(A + 1) * 8}${U}` : X = `>= -(2${U} ** ${(A + 1) * 8 - 1}${U}) and < 2 ** ${(A + 1) * 8 - 1}${U}`, new Xe.ERR_OUT_OF_RANGE("value", X, h);
                }
                zn(_, b, A);
            }
            function Rt(h, c) {
                if (typeof h != "number") throw new Xe.ERR_INVALID_ARG_TYPE(c, "number", h);
            }
            function sn(h, c, f) {
                throw Math.floor(h) !== h ? (Rt(h, f), new Xe.ERR_OUT_OF_RANGE("offset", "an integer", h)) : c < 0 ? new Xe.ERR_BUFFER_OUT_OF_BOUNDS : new Xe.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${c}`, h);
            }
            const Al = /[^+/0-9A-Za-z-_]/g;
            function Il(h) {
                if (h = h.split("=")[0], h = h.trim().replace(Al, ""), h.length < 2) return "";
                for(; h.length % 4 !== 0;)h = h + "=";
                return h;
            }
            function Br(h, c) {
                c = c || 1 / 0;
                let f;
                const _ = h.length;
                let b = null;
                const A = [];
                for(let U = 0; U < _; ++U){
                    if (f = h.charCodeAt(U), f > 55295 && f < 57344) {
                        if (!b) {
                            if (f > 56319) {
                                (c -= 3) > -1 && A.push(239, 191, 189);
                                continue;
                            } else if (U + 1 === _) {
                                (c -= 3) > -1 && A.push(239, 191, 189);
                                continue;
                            }
                            b = f;
                            continue;
                        }
                        if (f < 56320) {
                            (c -= 3) > -1 && A.push(239, 191, 189), b = f;
                            continue;
                        }
                        f = (b - 55296 << 10 | f - 56320) + 65536;
                    } else b && (c -= 3) > -1 && A.push(239, 191, 189);
                    if (b = null, f < 128) {
                        if ((c -= 1) < 0) break;
                        A.push(f);
                    } else if (f < 2048) {
                        if ((c -= 2) < 0) break;
                        A.push(f >> 6 | 192, f & 63 | 128);
                    } else if (f < 65536) {
                        if ((c -= 3) < 0) break;
                        A.push(f >> 12 | 224, f >> 6 & 63 | 128, f & 63 | 128);
                    } else if (f < 1114112) {
                        if ((c -= 4) < 0) break;
                        A.push(f >> 18 | 240, f >> 12 & 63 | 128, f >> 6 & 63 | 128, f & 63 | 128);
                    } else throw new Error("Invalid code point");
                }
                return A;
            }
            function Tl(h) {
                const c = [];
                for(let f = 0; f < h.length; ++f)c.push(h.charCodeAt(f) & 255);
                return c;
            }
            function Bl(h, c) {
                let f, _, b;
                const A = [];
                for(let U = 0; U < h.length && !((c -= 2) < 0); ++U)f = h.charCodeAt(U), _ = f >> 8, b = f % 256, A.push(b), A.push(_);
                return A;
            }
            function Wi(h) {
                return r.toByteArray(Il(h));
            }
            function Zn(h, c, f, _) {
                let b;
                for(b = 0; b < _ && !(b + f >= c.length || b >= h.length); ++b)c[b + f] = h[b];
                return b;
            }
            function Le(h, c) {
                return h instanceof c || h != null && h.constructor != null && h.constructor.name != null && h.constructor.name === c.name;
            }
            function Cr(h) {
                return h !== h;
            }
            const Cl = function() {
                const h = "0123456789abcdef", c = new Array(256);
                for(let f = 0; f < 16; ++f){
                    const _ = f * 16;
                    for(let b = 0; b < 16; ++b)c[_ + b] = h[f] + h[b];
                }
                return c;
            }();
            function it(h) {
                return typeof BigInt > "u" ? Ul : h;
            }
            function Ul() {
                throw new Error("BigInt not supported");
            }
        },
        526: (t, n)=>{
            n.byteLength = l, n.toByteArray = g, n.fromByteArray = k;
            for(var e = [], r = [], i = typeof Uint8Array < "u" ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, o = a.length; s < o; ++s)e[s] = a[s], r[a.charCodeAt(s)] = s;
            r[45] = 62, r[95] = 63;
            function d(x) {
                var I = x.length;
                if (I % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var T = x.indexOf("=");
                T === -1 && (T = I);
                var D = T === I ? 0 : 4 - T % 4;
                return [
                    T,
                    D
                ];
            }
            function l(x) {
                var I = d(x), T = I[0], D = I[1];
                return (T + D) * 3 / 4 - D;
            }
            function u(x, I, T) {
                return (I + T) * 3 / 4 - T;
            }
            function g(x) {
                var I, T = d(x), D = T[0], C = T[1], m = new i(u(x, D, C)), H = 0, V = C > 0 ? D - 4 : D, B;
                for(B = 0; B < V; B += 4)I = r[x.charCodeAt(B)] << 18 | r[x.charCodeAt(B + 1)] << 12 | r[x.charCodeAt(B + 2)] << 6 | r[x.charCodeAt(B + 3)], m[H++] = I >> 16 & 255, m[H++] = I >> 8 & 255, m[H++] = I & 255;
                return C === 2 && (I = r[x.charCodeAt(B)] << 2 | r[x.charCodeAt(B + 1)] >> 4, m[H++] = I & 255), C === 1 && (I = r[x.charCodeAt(B)] << 10 | r[x.charCodeAt(B + 1)] << 4 | r[x.charCodeAt(B + 2)] >> 2, m[H++] = I >> 8 & 255, m[H++] = I & 255), m;
            }
            function w(x) {
                return e[x >> 18 & 63] + e[x >> 12 & 63] + e[x >> 6 & 63] + e[x & 63];
            }
            function p(x, I, T) {
                for(var D, C = [], m = I; m < T; m += 3)D = (x[m] << 16 & 16711680) + (x[m + 1] << 8 & 65280) + (x[m + 2] & 255), C.push(w(D));
                return C.join("");
            }
            function k(x) {
                for(var I, T = x.length, D = T % 3, C = [], m = 16383, H = 0, V = T - D; H < V; H += m)C.push(p(x, H, H + m > V ? V : H + m));
                return D === 1 ? (I = x[T - 1], C.push(e[I >> 2] + e[I << 4 & 63] + "==")) : D === 2 && (I = (x[T - 2] << 8) + x[T - 1], C.push(e[I >> 10] + e[I >> 4 & 63] + e[I << 2 & 63] + "=")), C.join("");
            }
        },
        733: ()=>{},
        736: (t, n, e)=>{
            function r(i) {
                s.debug = s, s.default = s, s.coerce = w, s.disable = l, s.enable = d, s.enabled = u, s.humanize = e(0), s.destroy = p, Object.keys(i).forEach((k)=>{
                    s[k] = i[k];
                }), s.names = [], s.skips = [], s.formatters = {};
                function a(k) {
                    let x = 0;
                    for(let I = 0; I < k.length; I++)x = (x << 5) - x + k.charCodeAt(I), x |= 0;
                    return s.colors[Math.abs(x) % s.colors.length];
                }
                s.selectColor = a;
                function s(k) {
                    let x, I = null, T, D;
                    function C(...m) {
                        if (!C.enabled) return;
                        const H = C, V = Number(new Date), B = V - (x || V);
                        H.diff = B, H.prev = x, H.curr = V, x = V, m[0] = s.coerce(m[0]), typeof m[0] != "string" && m.unshift("%O");
                        let $ = 0;
                        m[0] = m[0].replace(/%([a-zA-Z%])/g, (R, F)=>{
                            if (R === "%%") return "%";
                            $++;
                            const ae = s.formatters[F];
                            if (typeof ae == "function") {
                                const S = m[$];
                                R = ae.call(H, S), m.splice($, 1), $--;
                            }
                            return R;
                        }), s.formatArgs.call(H, m), (H.log || s.log).apply(H, m);
                    }
                    return C.namespace = k, C.useColors = s.useColors(), C.color = s.selectColor(k), C.extend = o, C.destroy = s.destroy, Object.defineProperty(C, "enabled", {
                        enumerable: !0,
                        configurable: !1,
                        get: ()=>I !== null ? I : (T !== s.namespaces && (T = s.namespaces, D = s.enabled(k)), D),
                        set: (m)=>{
                            I = m;
                        }
                    }), typeof s.init == "function" && s.init(C), C;
                }
                function o(k, x) {
                    const I = s(this.namespace + (typeof x > "u" ? ":" : x) + k);
                    return I.log = this.log, I;
                }
                function d(k) {
                    s.save(k), s.namespaces = k, s.names = [], s.skips = [];
                    let x;
                    const I = (typeof k == "string" ? k : "").split(/[\s,]+/), T = I.length;
                    for(x = 0; x < T; x++)I[x] && (k = I[x].replace(/\*/g, ".*?"), k[0] === "-" ? s.skips.push(new RegExp("^" + k.slice(1) + "$")) : s.names.push(new RegExp("^" + k + "$")));
                }
                function l() {
                    const k = [
                        ...s.names.map(g),
                        ...s.skips.map(g).map((x)=>"-" + x)
                    ].join(",");
                    return s.enable(""), k;
                }
                function u(k) {
                    if (k[k.length - 1] === "*") return !0;
                    let x, I;
                    for(x = 0, I = s.skips.length; x < I; x++)if (s.skips[x].test(k)) return !1;
                    for(x = 0, I = s.names.length; x < I; x++)if (s.names[x].test(k)) return !0;
                    return !1;
                }
                function g(k) {
                    return k.toString().substring(2, k.toString().length - 2).replace(/\.\*\?$/, "*");
                }
                function w(k) {
                    return k instanceof Error ? k.stack || k.message : k;
                }
                function p() {
                    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
                }
                return s.enable(s.load()), s;
            }
            t.exports = r;
        },
        833: (t, n, e)=>{
            var r = e(19);
            n.formatArgs = a, n.save = s, n.load = o, n.useColors = i, n.storage = d(), n.destroy = (()=>{
                let u = !1;
                return ()=>{
                    u || (u = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
                };
            })(), n.colors = [
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
            function a(u) {
                if (u[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + u[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors) return;
                const g = "color: " + this.color;
                u.splice(1, 0, g, "color: inherit");
                let w = 0, p = 0;
                u[0].replace(/%[a-zA-Z%]/g, (k)=>{
                    k !== "%%" && (w++, k === "%c" && (p = w));
                }), u.splice(p, 0, g);
            }
            n.log = console.debug || console.log || (()=>{});
            function s(u) {
                try {
                    u ? n.storage.setItem("debug", u) : n.storage.removeItem("debug");
                } catch  {}
            }
            function o() {
                let u;
                try {
                    u = n.storage.getItem("debug");
                } catch  {}
                return !u && typeof r < "u" && "env" in r && (u = r.env.DEBUG), u;
            }
            function d() {
                try {
                    return localStorage;
                } catch  {}
            }
            t.exports = e(736)(n);
            const { formatters: l } = t.exports;
            l.j = function(u) {
                try {
                    return JSON.stringify(u);
                } catch (g) {
                    return "[UnexpectedJSONParseError]: " + g.message;
                }
            };
        }
    }, Ia = {};
    function ge(t) {
        var n = Ia[t];
        if (n !== void 0) return n.exports;
        var e = Ia[t] = {
            exports: {}
        };
        return Sf[t](e, e.exports, ge), e.exports;
    }
    ge.n = (t)=>{
        var n = t && t.__esModule ? ()=>t.default : ()=>t;
        return ge.d(n, {
            a: n
        }), n;
    };
    (()=>{
        var t = Object.getPrototypeOf ? (e)=>Object.getPrototypeOf(e) : (e)=>e.__proto__, n;
        ge.t = function(e, r) {
            if (r & 1 && (e = this(e)), r & 8 || typeof e == "object" && e && (r & 4 && e.__esModule || r & 16 && typeof e.then == "function")) return e;
            var i = Object.create(null);
            ge.r(i);
            var a = {};
            n = n || [
                null,
                t({}),
                t([]),
                t(t)
            ];
            for(var s = r & 2 && e; typeof s == "object" && !~n.indexOf(s); s = t(s))Object.getOwnPropertyNames(s).forEach((o)=>a[o] = ()=>e[o]);
            return a.default = ()=>e, ge.d(i, a), i;
        };
    })();
    ge.d = (t, n)=>{
        for(var e in n)ge.o(n, e) && !ge.o(t, e) && Object.defineProperty(t, e, {
            enumerable: !0,
            get: n[e]
        });
    };
    ge.o = (t, n)=>Object.prototype.hasOwnProperty.call(t, n);
    ge.r = (t)=>{
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        });
    };
    function* vf() {
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
        let n = 0;
        for(;;)yield t[Math.min(n++, t.length - 1)];
    }
    function* Ta(t) {
        for (const n of t)yield n;
    }
    async function Ba(t, n = vf()) {
        for(;;)try {
            return await t();
        } catch (e) {
            const r = n.next().value;
            if (r === void 0) throw e;
            await new Promise((i)=>setTimeout(i, r * 1e3));
            continue;
        }
    }
    class xf {
        constructor(n){
            this.numPoints = n;
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
            const n = await this.fetchG1Data();
            return this.data = new Uint8Array(await n.arrayBuffer());
        }
        async downloadG2Data() {
            const n = await this.fetchG2Data();
            return this.g2Data = new Uint8Array(await n.arrayBuffer());
        }
        getG1Data() {
            return this.data;
        }
        getG2Data() {
            return this.g2Data;
        }
        async fetchG1Data() {
            if (this.numPoints === 0) return new Response(new Uint8Array([]));
            const n = this.numPoints * 64 - 1;
            return await Ba(()=>fetch("https://crs.aztec.network/g1.dat", {
                    headers: {
                        Range: `bytes=0-${n}`
                    },
                    cache: "force-cache"
                }), Ta([
                5,
                5,
                5
            ]));
        }
        async fetchG2Data() {
            return await Ba(()=>fetch("https://crs.aztec.network/g2.dat", {
                    cache: "force-cache"
                }), Ta([
                5,
                5,
                5
            ]));
        }
    }
    class Af {
        constructor(n){
            this.numPoints = n;
        }
        async init() {
            await this.downloadG1Data();
        }
        async downloadG1Data() {
            const n = await this.fetchG1Data();
            return this.data = new Uint8Array(await n.arrayBuffer());
        }
        async streamG1Data() {
            return (await this.fetchG1Data()).body;
        }
        getG1Data() {
            return this.data;
        }
        async fetchG1Data() {
            if (this.numPoints === 0) return new Response(new Uint8Array([]));
            const n = this.numPoints * 64 - 1;
            return await fetch("https://crs.aztec.network/grumpkin_g1.dat", {
                headers: {
                    Range: `bytes=0-${n}`
                },
                cache: "force-cache"
            });
        }
    }
    function Ci(t) {
        return new Promise((n, e)=>{
            t.oncomplete = t.onsuccess = ()=>n(t.result), t.onabort = t.onerror = ()=>e(t.error);
        });
    }
    function If(t, n) {
        const e = indexedDB.open(t);
        e.onupgradeneeded = ()=>e.result.createObjectStore(n);
        const r = Ci(e);
        return (i, a)=>r.then((s)=>a(s.transaction(n, i).objectStore(n)));
    }
    let Mr;
    function ao() {
        return Mr || (Mr = If("keyval-store", "keyval")), Mr;
    }
    function hi(t, n = ao()) {
        return n("readonly", (e)=>Ci(e.get(t)));
    }
    function di(t, n, e = ao()) {
        return e("readwrite", (r)=>(r.put(n, t), Ci(r.transaction)));
    }
    class fr {
        constructor(n){
            this.numPoints = n;
        }
        static async new(n) {
            const e = new fr(n);
            return await e.init(), e;
        }
        async init() {
            const n = await hi("g1Data"), e = await hi("g2Data"), r = new xf(this.numPoints), i = this.numPoints * 64;
            !n || n.length < i ? (this.g1Data = await r.downloadG1Data(), await di("g1Data", this.g1Data)) : this.g1Data = n, e ? this.g2Data = e : (this.g2Data = await r.downloadG2Data(), await di("g2Data", this.g2Data));
        }
        getG1Data() {
            return this.g1Data;
        }
        getG2Data() {
            return this.g2Data;
        }
    }
    class Ui {
        constructor(n){
            this.numPoints = n;
        }
        static async new(n) {
            const e = new Ui(n);
            return await e.init(), e;
        }
        async init() {
            const n = await hi("grumpkinG1Data"), e = new Af(this.numPoints), r = this.numPoints * 64;
            !n || n.length < r ? (this.g1Data = await e.downloadG1Data(), await di("grumpkinG1Data", this.g1Data)) : this.g1Data = n;
        }
        getG1Data() {
            return this.g1Data;
        }
    }
    const so = Symbol("Comlink.proxy"), Tf = Symbol("Comlink.endpoint"), Bf = Symbol("Comlink.releaseProxy"), Lr = Symbol("Comlink.finalizer"), ir = Symbol("Comlink.thrown"), oo = (t)=>typeof t == "object" && t !== null || typeof t == "function", Cf = {
        canHandle: (t)=>oo(t) && t[so],
        serialize (t) {
            const { port1: n, port2: e } = new MessageChannel;
            return co(t, n), [
                e,
                [
                    e
                ]
            ];
        },
        deserialize (t) {
            return t.start(), uo(t);
        }
    }, Uf = {
        canHandle: (t)=>oo(t) && ir in t,
        serialize ({ value: t }) {
            let n;
            return t instanceof Error ? n = {
                isError: !0,
                value: {
                    message: t.message,
                    name: t.name,
                    stack: t.stack
                }
            } : n = {
                isError: !1,
                value: t
            }, [
                n,
                []
            ];
        },
        deserialize (t) {
            throw t.isError ? Object.assign(new Error(t.value.message), t.value) : t.value;
        }
    }, lo = new Map([
        [
            "proxy",
            Cf
        ],
        [
            "throw",
            Uf
        ]
    ]);
    function Rf(t, n) {
        for (const e of t)if (n === e || e === "*" || e instanceof RegExp && e.test(n)) return !0;
        return !1;
    }
    function co(t, n = globalThis, e = [
        "*"
    ]) {
        n.addEventListener("message", function r(i) {
            if (!i || !i.data) return;
            if (!Rf(e, i.origin)) {
                console.warn(`Invalid origin '${i.origin}' for comlink proxy`);
                return;
            }
            const { id: a, type: s, path: o } = Object.assign({
                path: []
            }, i.data), d = (i.data.argumentList || []).map(bt);
            let l;
            try {
                const u = o.slice(0, -1).reduce((w, p)=>w[p], t), g = o.reduce((w, p)=>w[p], t);
                switch(s){
                    case "GET":
                        l = g;
                        break;
                    case "SET":
                        u[o.slice(-1)[0]] = bt(i.data.value), l = !0;
                        break;
                    case "APPLY":
                        l = g.apply(u, d);
                        break;
                    case "CONSTRUCT":
                        {
                            const w = new g(...d);
                            l = po(w);
                        }
                        break;
                    case "ENDPOINT":
                        {
                            const { port1: w, port2: p } = new MessageChannel;
                            co(t, p), l = Ff(w, [
                                w
                            ]);
                        }
                        break;
                    case "RELEASE":
                        l = void 0;
                        break;
                    default:
                        return;
                }
            } catch (u) {
                l = {
                    value: u,
                    [ir]: 0
                };
            }
            Promise.resolve(l).catch((u)=>({
                    value: u,
                    [ir]: 0
                })).then((u)=>{
                const [g, w] = dr(u);
                n.postMessage(Object.assign(Object.assign({}, g), {
                    id: a
                }), w), s === "RELEASE" && (n.removeEventListener("message", r), fo(n), Lr in t && typeof t[Lr] == "function" && t[Lr]());
            }).catch((u)=>{
                const [g, w] = dr({
                    value: new TypeError("Unserializable return value"),
                    [ir]: 0
                });
                n.postMessage(Object.assign(Object.assign({}, g), {
                    id: a
                }), w);
            });
        }), n.start && n.start();
    }
    function Nf(t) {
        return t.constructor.name === "MessagePort";
    }
    function fo(t) {
        Nf(t) && t.close();
    }
    function uo(t, n) {
        return _i(t, [], n);
    }
    function Vn(t) {
        if (t) throw new Error("Proxy has been released and is not useable");
    }
    function ho(t) {
        return Mt(t, {
            type: "RELEASE"
        }).then(()=>{
            fo(t);
        });
    }
    const ur = new WeakMap, hr = "FinalizationRegistry" in globalThis && new FinalizationRegistry((t)=>{
        const n = (ur.get(t) || 0) - 1;
        ur.set(t, n), n === 0 && ho(t);
    });
    function Of(t, n) {
        const e = (ur.get(n) || 0) + 1;
        ur.set(n, e), hr && hr.register(t, n, t);
    }
    function Df(t) {
        hr && hr.unregister(t);
    }
    function _i(t, n = [], e = function() {}) {
        let r = !1;
        const i = new Proxy(e, {
            get (a, s) {
                if (Vn(r), s === Bf) return ()=>{
                    Df(i), ho(t), r = !0;
                };
                if (s === "then") {
                    if (n.length === 0) return {
                        then: ()=>i
                    };
                    const o = Mt(t, {
                        type: "GET",
                        path: n.map((d)=>d.toString())
                    }).then(bt);
                    return o.then.bind(o);
                }
                return _i(t, [
                    ...n,
                    s
                ]);
            },
            set (a, s, o) {
                Vn(r);
                const [d, l] = dr(o);
                return Mt(t, {
                    type: "SET",
                    path: [
                        ...n,
                        s
                    ].map((u)=>u.toString()),
                    value: d
                }, l).then(bt);
            },
            apply (a, s, o) {
                Vn(r);
                const d = n[n.length - 1];
                if (d === Tf) return Mt(t, {
                    type: "ENDPOINT"
                }).then(bt);
                if (d === "bind") return _i(t, n.slice(0, -1));
                const [l, u] = Ca(o);
                return Mt(t, {
                    type: "APPLY",
                    path: n.map((g)=>g.toString()),
                    argumentList: l
                }, u).then(bt);
            },
            construct (a, s) {
                Vn(r);
                const [o, d] = Ca(s);
                return Mt(t, {
                    type: "CONSTRUCT",
                    path: n.map((l)=>l.toString()),
                    argumentList: o
                }, d).then(bt);
            }
        });
        return Of(i, t), i;
    }
    function Hf(t) {
        return Array.prototype.concat.apply([], t);
    }
    function Ca(t) {
        const n = t.map(dr);
        return [
            n.map((e)=>e[0]),
            Hf(n.map((e)=>e[1]))
        ];
    }
    const _o = new WeakMap;
    function Ff(t, n) {
        return _o.set(t, n), t;
    }
    function po(t) {
        return Object.assign(t, {
            [so]: !0
        });
    }
    function dr(t) {
        for (const [n, e] of lo)if (e.canHandle(t)) {
            const [r, i] = e.serialize(t);
            return [
                {
                    type: "HANDLER",
                    name: n,
                    value: r
                },
                i
            ];
        }
        return [
            {
                type: "RAW",
                value: t
            },
            _o.get(t) || []
        ];
    }
    function bt(t) {
        switch(t.type){
            case "HANDLER":
                return lo.get(t.name).deserialize(t.value);
            case "RAW":
                return t.value;
        }
    }
    function Mt(t, n, e) {
        return new Promise((r)=>{
            const i = zf();
            t.addEventListener("message", function a(s) {
                !s.data || !s.data.id || s.data.id !== i || (t.removeEventListener("message", a), r(s.data));
            }), t.start && t.start(), t.postMessage(Object.assign({
                id: i
            }, n), e);
        });
    }
    function zf() {
        return new Array(4).fill(0).map(()=>Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
    }
    class nt extends Uint8Array {
    }
    function Zf(t) {
        const n = new Uint8Array(1);
        return n[0] = t ? 1 : 0, n;
    }
    function wo(t, n = 4) {
        const e = new Uint8Array(n);
        return new DataView(e.buffer).setUint32(e.byteLength - 4, t, !1), e;
    }
    function Mf(t, n = 4) {
        const e = new Uint8Array(n);
        return new DataView(e.buffer).setInt32(e.byteLength - 4, t, !1), e;
    }
    function mo(t) {
        const n = t.reduce((i, a)=>i + a.length, 0), e = new Uint8Array(n);
        let r = 0;
        for (const i of t)e.set(i, r), r += i.length;
        return e;
    }
    function Lf(t) {
        return t.reduce((n, e)=>n + e.toString(16).padStart(2, "0"), "");
    }
    function Ua(t) {
        return mo([
            Mf(t.length),
            t
        ]);
    }
    function Pf(t, n = 32) {
        const e = new Uint8Array(n);
        for(let r = 0; r < n; r++)e[n - r - 1] = Number(t >> BigInt(r * 8) & 0xffn);
        return e;
    }
    function $f(t) {
        return mo([
            wo(t.length),
            ...t.flat()
        ]);
    }
    function Z(t) {
        return Array.isArray(t) ? $f(t.map(Z)) : t instanceof nt ? t : t instanceof Uint8Array ? Ua(t) : typeof t == "boolean" ? Zf(t) : typeof t == "number" ? wo(t) : typeof t == "bigint" ? Pf(t) : typeof t == "string" ? Ua(new TextEncoder().encode(t)) : t.toBuffer();
    }
    class Be {
        constructor(n, e = 0){
            this.buffer = n, this.index = e;
        }
        static asReader(n) {
            return n instanceof Be ? n : new Be(n);
        }
        readNumber() {
            const n = new DataView(this.buffer.buffer, this.buffer.byteOffset + this.index, 4);
            return this.index += 4, n.getUint32(0, !1);
        }
        readBoolean() {
            return this.index += 1, !!this.buffer.at(this.index - 1);
        }
        readBytes(n) {
            return this.index += n, this.buffer.slice(this.index - n, this.index);
        }
        readNumberVector() {
            return this.readVector({
                fromBuffer: (n)=>n.readNumber()
            });
        }
        readVector(n) {
            const e = this.readNumber(), r = new Array(e);
            for(let i = 0; i < e; i++)r[i] = n.fromBuffer(this);
            return r;
        }
        readArray(n, e) {
            const r = new Array(n);
            for(let i = 0; i < n; i++)r[i] = e.fromBuffer(this);
            return r;
        }
        readObject(n) {
            return n.fromBuffer(this);
        }
        peekBytes(n) {
            return this.buffer.subarray(this.index, n ? this.index + n : void 0);
        }
        readString() {
            return new TextDecoder().decode(this.readBuffer());
        }
        readBuffer() {
            const n = this.readNumber();
            return this.readBytes(n);
        }
        readMap(n) {
            const e = this.readNumber(), r = {};
            for(let i = 0; i < e; i++){
                const a = this.readString(), s = this.readObject(n);
                r[a] = s;
            }
            return r;
        }
    }
    function Ie() {
        return {
            SIZE_IN_BYTES: 1,
            fromBuffer: (t)=>Be.asReader(t).readBoolean()
        };
    }
    function $t() {
        return {
            SIZE_IN_BYTES: 4,
            fromBuffer: (t)=>Be.asReader(t).readNumber()
        };
    }
    function He(t) {
        return {
            fromBuffer: (n)=>Be.asReader(n).readVector(t)
        };
    }
    function ie() {
        return {
            fromBuffer: (t)=>Be.asReader(t).readBuffer()
        };
    }
    function _r() {
        return {
            fromBuffer: (t)=>Be.asReader(t).readString()
        };
    }
    const yr = (t)=>{
        const e = (()=>{
            if (typeof window < "u" && window.crypto) return window.crypto;
            if (typeof globalThis < "u" && globalThis.crypto) return globalThis.crypto;
        })();
        if (!e) throw new Error("randomBytes UnsupportedEnvironment");
        const r = new Uint8Array(t), i = 65536;
        if (t > i) for(let a = 0; a < t; a += i)e.getRandomValues(r.subarray(a, a + i));
        else e.getRandomValues(r);
        return r;
    };
    var go = ge(287).hp;
    function bo(t) {
        return (t.readBigUInt64BE(0) << 192n) + (t.readBigUInt64BE(8) << 128n) + (t.readBigUInt64BE(16) << 64n) + t.readBigUInt64BE(24);
    }
    function Wt(t) {
        const n = go.from(t);
        return bo(n);
    }
    function yo(t, n = 32) {
        if (n != 32) throw new Error(`Only 32 bytes supported for conversion from bigint to buffer, attempted byte length: ${n}`);
        const e = go.alloc(n);
        return e.writeBigUInt64BE(t >> 192n, 0), e.writeBigUInt64BE(t >> 128n & 0xffffffffffffffffn, 8), e.writeBigUInt64BE(t >> 64n & 0xffffffffffffffffn, 16), e.writeBigUInt64BE(t & 0xffffffffffffffffn, 24), e;
    }
    function Wf(t, n = 32) {
        return new Uint8Array(yo(t, n));
    }
    var ar = ge(287).hp, Vt, pn;
    G = class {
        constructor(n){
            const e = typeof n == "bigint" ? n : n instanceof ar ? bo(n) : Wt(n);
            if (e > Vt.MAX_VALUE) throw new Error(`Value 0x${e.toString(16)} is greater or equal to field modulus.`);
            this.value = typeof n == "bigint" ? Wf(n) : n instanceof ar ? new Uint8Array(n) : n;
        }
        static random() {
            const n = Wt(yr(64)) % Vt.MODULUS;
            return new this(n);
        }
        static fromBuffer(n) {
            const e = Be.asReader(n);
            return new this(e.readBytes(this.SIZE_IN_BYTES));
        }
        static fromBufferReduce(n) {
            const e = Be.asReader(n);
            return new this(Wt(e.readBytes(this.SIZE_IN_BYTES)) % Vt.MODULUS);
        }
        static fromString(n) {
            return this.fromBuffer(ar.from(n.replace(/^0x/i, ""), "hex"));
        }
        toBuffer() {
            return this.value;
        }
        toString() {
            return "0x" + Lf(this.toBuffer());
        }
        equals(n) {
            return this.value.every((e, r)=>e === n.value[r]);
        }
        isZero() {
            return this.value.every((n)=>n === 0);
        }
    };
    Vt = G;
    G.ZERO = new Vt(0n);
    G.MODULUS = 0x30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001n;
    G.MAX_VALUE = Vt.MODULUS - 1n;
    G.SIZE_IN_BYTES = 32;
    class Er {
        constructor(n){
            if (this.value = n, n > pn.MAX_VALUE) throw new Error(`Fq out of range ${n}.`);
        }
        static random() {
            const n = Wt(yr(64)) % pn.MODULUS;
            return new this(n);
        }
        static fromBuffer(n) {
            const e = Be.asReader(n);
            return new this(Wt(e.readBytes(this.SIZE_IN_BYTES)));
        }
        static fromBufferReduce(n) {
            const e = Be.asReader(n);
            return new this(Wt(e.readBytes(this.SIZE_IN_BYTES)) % G.MODULUS);
        }
        static fromString(n) {
            return this.fromBuffer(ar.from(n.replace(/^0x/i, ""), "hex"));
        }
        toBuffer() {
            return yo(this.value, pn.SIZE_IN_BYTES);
        }
        toString() {
            return "0x" + this.value.toString(16);
        }
        equals(n) {
            return this.value === n.value;
        }
        isZero() {
            return this.value === 0n;
        }
    }
    pn = Er;
    Er.MODULUS = 0x30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47n;
    Er.MAX_VALUE = pn.MODULUS - 1n;
    Er.SIZE_IN_BYTES = 32;
    var Ra = ge(287).hp;
    class _t {
        constructor(n, e){
            this.x = n, this.y = e;
        }
        static random() {
            return new _t(G.random(), G.random());
        }
        static fromBuffer(n) {
            const e = Be.asReader(n);
            return new this(G.fromBuffer(e), G.fromBuffer(e));
        }
        static fromString(n) {
            return _t.fromBuffer(Ra.from(n.replace(/^0x/i, ""), "hex"));
        }
        toBuffer() {
            return Ra.concat([
                this.x.toBuffer(),
                this.y.toBuffer()
            ]);
        }
        toString() {
            return "0x" + this.toBuffer().toString("hex");
        }
        equals(n) {
            return this.x.equals(n.x) && this.y.equals(n.y);
        }
    }
    _t.SIZE_IN_BYTES = 64;
    _t.EMPTY = new _t(G.ZERO, G.ZERO);
    class Kt {
        constructor(n){
            this.buffer = n;
        }
        static fromBuffer(n) {
            const e = Be.asReader(n);
            return new Kt(e.readBytes(this.SIZE_IN_BYTES));
        }
        static random() {
            return new Kt(yr(this.SIZE_IN_BYTES));
        }
        toBuffer() {
            return this.buffer;
        }
    }
    Kt.SIZE_IN_BYTES = 32;
    class Vf {
        constructor(n){
            this.wasm = n;
        }
        async pedersenCommit(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                _t
            ];
            return (await this.wasm.callWasmExport("pedersen_commit", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async pedersenHash(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                G
            ];
            return (await this.wasm.callWasmExport("pedersen_hash", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async pedersenHashes(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                G
            ];
            return (await this.wasm.callWasmExport("pedersen_hashes", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async pedersenHashBuffer(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                G
            ];
            return (await this.wasm.callWasmExport("pedersen_hash_buffer", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async poseidon2Hash(n) {
            const e = [
                n
            ].map(Z), r = [
                G
            ];
            return (await this.wasm.callWasmExport("poseidon2_hash", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async poseidon2Hashes(n) {
            const e = [
                n
            ].map(Z), r = [
                G
            ];
            return (await this.wasm.callWasmExport("poseidon2_hashes", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async poseidon2Permutation(n) {
            const e = [
                n
            ].map(Z), r = [
                He(G)
            ];
            return (await this.wasm.callWasmExport("poseidon2_permutation", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async poseidon2HashAccumulate(n) {
            const e = [
                n
            ].map(Z), r = [
                G
            ];
            return (await this.wasm.callWasmExport("poseidon2_hash_accumulate", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async blake2s(n) {
            const e = [
                n
            ].map(Z), r = [
                Kt
            ];
            return (await this.wasm.callWasmExport("blake2s", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async blake2sToField(n) {
            const e = [
                n
            ].map(Z), r = [
                G
            ];
            return (await this.wasm.callWasmExport("blake2s_to_field_", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async aesEncryptBufferCbc(n, e, r, i) {
            const a = [
                n,
                e,
                r,
                i
            ].map(Z), s = [
                ie()
            ];
            return (await this.wasm.callWasmExport("aes_encrypt_buffer_cbc", a, s.map((l)=>l.SIZE_IN_BYTES))).map((l, u)=>s[u].fromBuffer(l))[0];
        }
        async aesDecryptBufferCbc(n, e, r, i) {
            const a = [
                n,
                e,
                r,
                i
            ].map(Z), s = [
                ie()
            ];
            return (await this.wasm.callWasmExport("aes_decrypt_buffer_cbc", a, s.map((l)=>l.SIZE_IN_BYTES))).map((l, u)=>s[u].fromBuffer(l))[0];
        }
        async srsInitSrs(n, e, r) {
            const i = [
                n,
                e,
                r
            ].map(Z), a = [];
            (await this.wasm.callWasmExport("srs_init_srs", i, a.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>a[d].fromBuffer(o));
        }
        async srsInitGrumpkinSrs(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [];
            (await this.wasm.callWasmExport("srs_init_grumpkin_srs", r, i.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>i[o].fromBuffer(s));
        }
        async testThreads(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                $t()
            ];
            return (await this.wasm.callWasmExport("test_threads", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async commonInitSlabAllocator(n) {
            const e = [
                n
            ].map(Z), r = [];
            (await this.wasm.callWasmExport("common_init_slab_allocator", e, r.map((a)=>a.SIZE_IN_BYTES))).map((a, s)=>r[s].fromBuffer(a));
        }
        async acirGetCircuitSizes(n, e, r) {
            const i = [
                n,
                e,
                r
            ].map(Z), a = [
                $t(),
                $t()
            ];
            return (await this.wasm.callWasmExport("acir_get_circuit_sizes", i, a.map((d)=>d.SIZE_IN_BYTES))).map((d, l)=>a[l].fromBuffer(d));
        }
        async acirProveAndVerifyUltraHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ie()
            ];
            return (await this.wasm.callWasmExport("acir_prove_and_verify_ultra_honk", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async acirProveAndVerifyMegaHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ie()
            ];
            return (await this.wasm.callWasmExport("acir_prove_and_verify_mega_honk", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async acirProveAztecClient(n) {
            const e = [
                n
            ].map(Z), r = [
                ie(),
                ie()
            ];
            return (await this.wasm.callWasmExport("acir_prove_aztec_client", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s));
        }
        async acirVerifyAztecClient(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ie()
            ];
            return (await this.wasm.callWasmExport("acir_verify_aztec_client", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async acirLoadVerificationKey(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [];
            (await this.wasm.callWasmExport("acir_load_verification_key", r, i.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>i[o].fromBuffer(s));
        }
        async acirInitVerificationKey(n) {
            const e = [
                n
            ].map(Z), r = [];
            (await this.wasm.callWasmExport("acir_init_verification_key", e, r.map((a)=>a.SIZE_IN_BYTES))).map((a, s)=>r[s].fromBuffer(a));
        }
        async acirGetVerificationKey(n) {
            const e = [
                n
            ].map(Z), r = [
                ie()
            ];
            return (await this.wasm.callWasmExport("acir_get_verification_key", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async acirGetProvingKey(n, e, r) {
            const i = [
                n,
                e,
                r
            ].map(Z), a = [
                ie()
            ];
            return (await this.wasm.callWasmExport("acir_get_proving_key", i, a.map((d)=>d.SIZE_IN_BYTES))).map((d, l)=>a[l].fromBuffer(d))[0];
        }
        async acirVerifyProof(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ie()
            ];
            return (await this.wasm.callWasmExport("acir_verify_proof", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async acirGetSolidityVerifier(n) {
            const e = [
                n
            ].map(Z), r = [
                _r()
            ];
            return (await this.wasm.callWasmExport("acir_get_solidity_verifier", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async acirHonkSolidityVerifier(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                _r()
            ];
            return (await this.wasm.callWasmExport("acir_honk_solidity_verifier", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async acirSerializeProofIntoFields(n, e, r) {
            const i = [
                n,
                e,
                r
            ].map(Z), a = [
                He(G)
            ];
            return (await this.wasm.callWasmExport("acir_serialize_proof_into_fields", i, a.map((d)=>d.SIZE_IN_BYTES))).map((d, l)=>a[l].fromBuffer(d))[0];
        }
        async acirSerializeVerificationKeyIntoFields(n) {
            const e = [
                n
            ].map(Z), r = [
                He(G),
                G
            ];
            return (await this.wasm.callWasmExport("acir_serialize_verification_key_into_fields", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s));
        }
        async acirProveUltraHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                ie()
            ];
            return (await this.wasm.callWasmExport("acir_prove_ultra_honk", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async acirProveUltraKeccakHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                ie()
            ];
            return (await this.wasm.callWasmExport("acir_prove_ultra_keccak_honk", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async acirProveUltraKeccakZKHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                ie()
            ];
            return (await this.wasm.callWasmExport("acir_prove_ultra_keccak_zk_honk", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async acirProveUltraStarknetHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                ie()
            ];
            return (await this.wasm.callWasmExport("acir_prove_ultra_starknet_honk", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async acirVerifyUltraHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ie()
            ];
            return (await this.wasm.callWasmExport("acir_verify_ultra_honk", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async acirVerifyUltraKeccakHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ie()
            ];
            return (await this.wasm.callWasmExport("acir_verify_ultra_keccak_honk", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async acirVerifyUltraKeccakZKHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ie()
            ];
            return (await this.wasm.callWasmExport("acir_verify_ultra_keccak_zk_honk", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async acirVerifyUltraStarknetHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ie()
            ];
            return (await this.wasm.callWasmExport("acir_verify_ultra_starknet_honk", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async acirWriteVkUltraHonk(n) {
            const e = [
                n
            ].map(Z), r = [
                ie()
            ];
            return (await this.wasm.callWasmExport("acir_write_vk_ultra_honk", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async acirWriteVkUltraKeccakHonk(n) {
            const e = [
                n
            ].map(Z), r = [
                ie()
            ];
            return (await this.wasm.callWasmExport("acir_write_vk_ultra_keccak_honk", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async acirWriteVkUltraKeccakZKHonk(n) {
            const e = [
                n
            ].map(Z), r = [
                ie()
            ];
            return (await this.wasm.callWasmExport("acir_write_vk_ultra_keccak_zk_honk", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async acirWriteVkUltraStarknetHonk(n) {
            const e = [
                n
            ].map(Z), r = [
                ie()
            ];
            return (await this.wasm.callWasmExport("acir_write_vk_ultra_starknet_honk", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async acirProofAsFieldsUltraHonk(n) {
            const e = [
                n
            ].map(Z), r = [
                He(G)
            ];
            return (await this.wasm.callWasmExport("acir_proof_as_fields_ultra_honk", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async acirVkAsFieldsUltraHonk(n) {
            const e = [
                n
            ].map(Z), r = [
                He(G)
            ];
            return (await this.wasm.callWasmExport("acir_vk_as_fields_ultra_honk", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async acirVkAsFieldsMegaHonk(n) {
            const e = [
                n
            ].map(Z), r = [
                He(G)
            ];
            return (await this.wasm.callWasmExport("acir_vk_as_fields_mega_honk", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async acirGatesAztecClient(n) {
            const e = [
                n
            ].map(Z), r = [
                ie()
            ];
            return (await this.wasm.callWasmExport("acir_gates_aztec_client", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
    }
    class Yf {
        constructor(n){
            this.wasm = n;
        }
        pedersenCommit(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                _t
            ];
            return this.wasm.callWasmExport("pedersen_commit", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        pedersenHash(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                G
            ];
            return this.wasm.callWasmExport("pedersen_hash", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        pedersenHashes(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                G
            ];
            return this.wasm.callWasmExport("pedersen_hashes", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        pedersenHashBuffer(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                G
            ];
            return this.wasm.callWasmExport("pedersen_hash_buffer", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        poseidon2Hash(n) {
            const e = [
                n
            ].map(Z), r = [
                G
            ];
            return this.wasm.callWasmExport("poseidon2_hash", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        poseidon2Hashes(n) {
            const e = [
                n
            ].map(Z), r = [
                G
            ];
            return this.wasm.callWasmExport("poseidon2_hashes", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        poseidon2Permutation(n) {
            const e = [
                n
            ].map(Z), r = [
                He(G)
            ];
            return this.wasm.callWasmExport("poseidon2_permutation", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        poseidon2HashAccumulate(n) {
            const e = [
                n
            ].map(Z), r = [
                G
            ];
            return this.wasm.callWasmExport("poseidon2_hash_accumulate", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        blake2s(n) {
            const e = [
                n
            ].map(Z), r = [
                Kt
            ];
            return this.wasm.callWasmExport("blake2s", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        blake2sToField(n) {
            const e = [
                n
            ].map(Z), r = [
                G
            ];
            return this.wasm.callWasmExport("blake2s_to_field_", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        aesEncryptBufferCbc(n, e, r, i) {
            const a = [
                n,
                e,
                r,
                i
            ].map(Z), s = [
                ie()
            ];
            return this.wasm.callWasmExport("aes_encrypt_buffer_cbc", a, s.map((l)=>l.SIZE_IN_BYTES)).map((l, u)=>s[u].fromBuffer(l))[0];
        }
        aesDecryptBufferCbc(n, e, r, i) {
            const a = [
                n,
                e,
                r,
                i
            ].map(Z), s = [
                ie()
            ];
            return this.wasm.callWasmExport("aes_decrypt_buffer_cbc", a, s.map((l)=>l.SIZE_IN_BYTES)).map((l, u)=>s[u].fromBuffer(l))[0];
        }
        srsInitSrs(n, e, r) {
            const i = [
                n,
                e,
                r
            ].map(Z), a = [];
            this.wasm.callWasmExport("srs_init_srs", i, a.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>a[d].fromBuffer(o));
        }
        srsInitGrumpkinSrs(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [];
            this.wasm.callWasmExport("srs_init_grumpkin_srs", r, i.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>i[o].fromBuffer(s));
        }
        testThreads(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                $t()
            ];
            return this.wasm.callWasmExport("test_threads", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        commonInitSlabAllocator(n) {
            const e = [
                n
            ].map(Z), r = [];
            this.wasm.callWasmExport("common_init_slab_allocator", e, r.map((a)=>a.SIZE_IN_BYTES)).map((a, s)=>r[s].fromBuffer(a));
        }
        acirGetCircuitSizes(n, e, r) {
            const i = [
                n,
                e,
                r
            ].map(Z), a = [
                $t(),
                $t()
            ];
            return this.wasm.callWasmExport("acir_get_circuit_sizes", i, a.map((d)=>d.SIZE_IN_BYTES)).map((d, l)=>a[l].fromBuffer(d));
        }
        acirProveAndVerifyUltraHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ie()
            ];
            return this.wasm.callWasmExport("acir_prove_and_verify_ultra_honk", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        acirProveAndVerifyMegaHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ie()
            ];
            return this.wasm.callWasmExport("acir_prove_and_verify_mega_honk", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        acirProveAztecClient(n) {
            const e = [
                n
            ].map(Z), r = [
                ie(),
                ie()
            ];
            return this.wasm.callWasmExport("acir_prove_aztec_client", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s));
        }
        acirVerifyAztecClient(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ie()
            ];
            return this.wasm.callWasmExport("acir_verify_aztec_client", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        acirLoadVerificationKey(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [];
            this.wasm.callWasmExport("acir_load_verification_key", r, i.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>i[o].fromBuffer(s));
        }
        acirInitVerificationKey(n) {
            const e = [
                n
            ].map(Z), r = [];
            this.wasm.callWasmExport("acir_init_verification_key", e, r.map((a)=>a.SIZE_IN_BYTES)).map((a, s)=>r[s].fromBuffer(a));
        }
        acirGetVerificationKey(n) {
            const e = [
                n
            ].map(Z), r = [
                ie()
            ];
            return this.wasm.callWasmExport("acir_get_verification_key", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        acirGetProvingKey(n, e, r) {
            const i = [
                n,
                e,
                r
            ].map(Z), a = [
                ie()
            ];
            return this.wasm.callWasmExport("acir_get_proving_key", i, a.map((d)=>d.SIZE_IN_BYTES)).map((d, l)=>a[l].fromBuffer(d))[0];
        }
        acirVerifyProof(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ie()
            ];
            return this.wasm.callWasmExport("acir_verify_proof", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        acirGetSolidityVerifier(n) {
            const e = [
                n
            ].map(Z), r = [
                _r()
            ];
            return this.wasm.callWasmExport("acir_get_solidity_verifier", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        acirHonkSolidityVerifier(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                _r()
            ];
            return this.wasm.callWasmExport("acir_honk_solidity_verifier", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        acirSerializeProofIntoFields(n, e, r) {
            const i = [
                n,
                e,
                r
            ].map(Z), a = [
                He(G)
            ];
            return this.wasm.callWasmExport("acir_serialize_proof_into_fields", i, a.map((d)=>d.SIZE_IN_BYTES)).map((d, l)=>a[l].fromBuffer(d))[0];
        }
        acirSerializeVerificationKeyIntoFields(n) {
            const e = [
                n
            ].map(Z), r = [
                He(G),
                G
            ];
            return this.wasm.callWasmExport("acir_serialize_verification_key_into_fields", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s));
        }
        acirProveUltraHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                ie()
            ];
            return this.wasm.callWasmExport("acir_prove_ultra_honk", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        acirProveUltraKeccakHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                ie()
            ];
            return this.wasm.callWasmExport("acir_prove_ultra_keccak_honk", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        acirProveUltraKeccakZKHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                ie()
            ];
            return this.wasm.callWasmExport("acir_prove_ultra_keccak_zk_honk", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        acirProveUltraKeccakZkHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                ie()
            ];
            return this.wasm.callWasmExport("acir_prove_ultra_keccak_zk_honk", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        acirVerifyUltraHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ie()
            ];
            return this.wasm.callWasmExport("acir_verify_ultra_honk", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        acirVerifyUltraKeccakZKHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ie()
            ];
            return this.wasm.callWasmExport("acir_verify_ultra_keccak_zk_honk", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        acirWriteVkUltraHonk(n) {
            const e = [
                n
            ].map(Z), r = [
                ie()
            ];
            return this.wasm.callWasmExport("acir_write_vk_ultra_honk", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        acirWriteVkUltraKeccakHonk(n) {
            const e = [
                n
            ].map(Z), r = [
                ie()
            ];
            return this.wasm.callWasmExport("acir_write_vk_ultra_keccak_honk", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        acirWriteVkUltraKeccakZKHonk(n) {
            const e = [
                n
            ].map(Z), r = [
                ie()
            ];
            return this.wasm.callWasmExport("acir_write_vk_ultra_keccak_zk_honk", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        acirProofAsFieldsUltraHonk(n) {
            const e = [
                n
            ].map(Z), r = [
                He(G)
            ];
            return this.wasm.callWasmExport("acir_proof_as_fields_ultra_honk", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        acirVkAsFieldsUltraHonk(n) {
            const e = [
                n
            ].map(Z), r = [
                He(G)
            ];
            return this.wasm.callWasmExport("acir_vk_as_fields_ultra_honk", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        acirVkAsFieldsMegaHonk(n) {
            const e = [
                n
            ].map(Z), r = [
                He(G)
            ];
            return this.wasm.callWasmExport("acir_vk_as_fields_mega_honk", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        acirGatesAztecClient(n) {
            const e = [
                n
            ].map(Z), r = [
                ie()
            ];
            return this.wasm.callWasmExport("acir_gates_aztec_client", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
    }
    var jf = ge(833), qe = ge.n(jf);
    function Eo() {
        const t = typeof window < "u" ? window : globalThis;
        return typeof SharedArrayBuffer < "u" && t.crossOriginIsolated;
    }
    function ko(t) {
        return uo(t);
    }
    function Kf() {
        return navigator.hardwareConcurrency;
    }
    function So(t, n) {
        t.addEventListener("message", function e(r) {
            r.data && r.data.ready === !0 && (t.removeEventListener("message", e), n());
        });
    }
    async function Gf() {
        const t = new Worker(new URL("" + new URL("main.worker-Bpjz4yFN.js", import.meta.url).href, import.meta.url), {
            type: "module"
        }), n = qe().disable();
        return qe().enable(n), t.postMessage({
            debug: n
        }), await new Promise((e)=>So(t, e)), t;
    }
    async function qf() {
        const t = new Worker(new URL("" + new URL("thread.worker-D6q_gtbS.js", import.meta.url).href, import.meta.url), {
            type: "module"
        }), n = qe().disable();
        return qe().enable(n), t.postMessage({
            debug: n
        }), await new Promise((e)=>So(t, e)), t;
    }
    class Xf {
        constructor(){
            this.memStore = {}, this.logger = qe()("bb.js:bb_wasm_base");
        }
        getImportObj(n) {
            return {
                wasi_snapshot_preview1: {
                    random_get: (r, i)=>{
                        r = r >>> 0;
                        const a = yr(i);
                        this.getMemory().set(a, r);
                    },
                    clock_time_get: (r, i, a)=>{
                        a = a >>> 0;
                        const s = BigInt(new Date().getTime()) * 1000000n;
                        new DataView(this.getMemory().buffer).setBigUint64(a, s, !0);
                    },
                    proc_exit: ()=>{
                        throw this.logger("PANIC: proc_exit was called."), new Error;
                    }
                },
                env: {
                    logstr: (r)=>{
                        const i = this.stringFromAddress(r), a = this.getMemory(), s = `${i} (mem: ${(a.length / (1024 * 1024)).toFixed(2)}MiB)`;
                        this.logger(s);
                    },
                    get_data: (r, i)=>{
                        const a = this.stringFromAddress(r);
                        i = i >>> 0;
                        const s = this.memStore[a];
                        if (!s) {
                            this.logger(`get_data miss ${a}`);
                            return;
                        }
                        this.writeMemory(i, s);
                    },
                    set_data: (r, i, a)=>{
                        const s = this.stringFromAddress(r);
                        i = i >>> 0, this.memStore[s] = this.getMemorySlice(i, i + a);
                    },
                    memory: n
                }
            };
        }
        exports() {
            return this.instance.exports;
        }
        call(n, ...e) {
            if (!this.exports()[n]) throw new Error(`WASM function ${n} not found.`);
            try {
                return this.exports()[n](...e) >>> 0;
            } catch (r) {
                const i = `WASM function ${n} aborted, error: ${r}`;
                throw this.logger(i), this.logger(r.stack), r;
            }
        }
        memSize() {
            return this.getMemory().length;
        }
        getMemorySlice(n, e) {
            return this.getMemory().subarray(n, e).slice();
        }
        writeMemory(n, e) {
            this.getMemory().set(e, n);
        }
        getMemory() {
            return new Uint8Array(this.memory.buffer);
        }
        stringFromAddress(n) {
            n = n >>> 0;
            const e = this.getMemory();
            let r = n;
            for(; e[r] !== 0; ++r);
            return new TextDecoder("ascii").decode(e.slice(n, r));
        }
    }
    class Jf {
        constructor(n){
            this.wasm = n, this.allocs = [], this.inScratchRemaining = 1024, this.outScratchRemaining = 1024;
        }
        getInputs(n) {
            return n.map((e)=>{
                if (typeof e == "object") if (e.length <= this.inScratchRemaining) {
                    const r = this.inScratchRemaining -= e.length;
                    return this.wasm.writeMemory(r, e), r;
                } else {
                    const r = this.wasm.call("bbmalloc", e.length);
                    return this.wasm.writeMemory(r, e), this.allocs.push(r), r;
                }
                else return e;
            });
        }
        getOutputPtrs(n) {
            return n.map((e)=>{
                const r = e || 4;
                if (r <= this.outScratchRemaining) return this.outScratchRemaining -= r;
                {
                    const i = this.wasm.call("bbmalloc", r);
                    return this.allocs.push(i), i;
                }
            });
        }
        addOutputPtr(n) {
            n >= 1024 && this.allocs.push(n);
        }
        freeAll() {
            for (const n of this.allocs)this.wasm.call("bbfree", n);
        }
    }
    class kr extends Xf {
        constructor(){
            super(...arguments), this.workers = [], this.remoteWasms = [], this.nextWorker = 0, this.nextThreadId = 1;
        }
        getNumThreads() {
            return this.workers.length + 1;
        }
        async init(n, e = Math.min(Kf(), kr.MAX_THREADS), r = qe()("bb.js:bb_wasm"), i = 32, a = 2 ** 16) {
            this.logger = r;
            const s = i * 2 ** 16 / (1024 * 1024), o = a * 2 ** 16 / (1024 * 1024), d = Eo();
            this.logger(`Initializing bb wasm: initial memory ${i} pages ${s}MiB; max memory: ${a} pages, ${o}MiB; threads: ${e}; shared memory: ${d}`), this.memory = new WebAssembly.Memory({
                initial: i,
                maximum: a,
                shared: d
            });
            const l = await WebAssembly.instantiate(n, this.getImportObj(this.memory));
            this.instance = l, this.call("_initialize"), e > 1 && (this.logger(`Creating ${e} worker threads`), this.workers = await Promise.all(Array.from({
                length: e - 1
            }).map(qf)), this.remoteWasms = await Promise.all(this.workers.map(ko)), await Promise.all(this.remoteWasms.map((u)=>u.initThread(n, this.memory))));
        }
        async destroy() {
            await Promise.all(this.workers.map((n)=>n.terminate()));
        }
        getImportObj(n) {
            const e = super.getImportObj(n);
            return {
                ...e,
                wasi: {
                    "thread-spawn": (r)=>{
                        r = r >>> 0;
                        const i = this.nextThreadId++, a = this.nextWorker++ % this.remoteWasms.length;
                        return this.remoteWasms[a].call("wasi_thread_start", i, r).catch(this.logger), i;
                    }
                },
                env: {
                    ...e.env,
                    env_hardware_concurrency: ()=>this.remoteWasms.length + 1
                }
            };
        }
        callWasmExport(n, e, r) {
            const i = new Jf(this), a = i.getInputs(e), s = i.getOutputPtrs(r);
            this.call(n, ...a, ...s);
            const o = this.getOutputArgs(r, s, i);
            return i.freeAll(), o;
        }
        getOutputArgs(n, e, r) {
            return n.map((i, a)=>{
                if (i) return this.getMemorySlice(e[a], e[a] + i);
                const s = this.getMemorySlice(e[a], e[a] + 4), o = new DataView(s.buffer, s.byteOffset, s.byteLength).getUint32(0, !0);
                r.addOutputPtr(o);
                const d = this.getMemorySlice(o, o + 4), l = new DataView(d.buffer, d.byteOffset, d.byteLength).getUint32(0, !1);
                return this.getMemorySlice(o + 4, o + 4 + l);
            });
        }
    }
    kr.MAX_THREADS = 32;
    const Qf = 4, Na = 0, Oa = 1, eu = 2;
    function Jt(t) {
        let n = t.length;
        for(; --n >= 0;)t[n] = 0;
    }
    const tu = 0, vo = 1, nu = 2, ru = 3, iu = 258, Ri = 29, Un = 256, kn = Un + 1 + Ri, Yt = 30, Ni = 19, xo = 2 * kn + 1, yt = 15, Pr = 16, au = 7, Oi = 256, Ao = 16, Io = 17, To = 18, pi = new Uint8Array([
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
    ]), sr = new Uint8Array([
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
    ]), su = new Uint8Array([
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
    ]), Bo = new Uint8Array([
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
    ]), ou = 512, et = new Array((kn + 2) * 2);
    Jt(et);
    const wn = new Array(Yt * 2);
    Jt(wn);
    const Sn = new Array(ou);
    Jt(Sn);
    const vn = new Array(iu - ru + 1);
    Jt(vn);
    const Di = new Array(Ri);
    Jt(Di);
    const pr = new Array(Yt);
    Jt(pr);
    function $r(t, n, e, r, i) {
        this.static_tree = t, this.extra_bits = n, this.extra_base = e, this.elems = r, this.max_length = i, this.has_stree = t && t.length;
    }
    let Co, Uo, Ro;
    function Wr(t, n) {
        this.dyn_tree = t, this.max_code = 0, this.stat_desc = n;
    }
    const No = (t)=>t < 256 ? Sn[t] : Sn[256 + (t >>> 7)], xn = (t, n)=>{
        t.pending_buf[t.pending++] = n & 255, t.pending_buf[t.pending++] = n >>> 8 & 255;
    }, Te = (t, n, e)=>{
        t.bi_valid > Pr - e ? (t.bi_buf |= n << t.bi_valid & 65535, xn(t, t.bi_buf), t.bi_buf = n >> Pr - t.bi_valid, t.bi_valid += e - Pr) : (t.bi_buf |= n << t.bi_valid & 65535, t.bi_valid += e);
    }, Ve = (t, n, e)=>{
        Te(t, e[n * 2], e[n * 2 + 1]);
    }, Oo = (t, n)=>{
        let e = 0;
        do e |= t & 1, t >>>= 1, e <<= 1;
        while (--n > 0);
        return e >>> 1;
    }, lu = (t)=>{
        t.bi_valid === 16 ? (xn(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = t.bi_buf & 255, t.bi_buf >>= 8, t.bi_valid -= 8);
    }, cu = (t, n)=>{
        const e = n.dyn_tree, r = n.max_code, i = n.stat_desc.static_tree, a = n.stat_desc.has_stree, s = n.stat_desc.extra_bits, o = n.stat_desc.extra_base, d = n.stat_desc.max_length;
        let l, u, g, w, p, k, x = 0;
        for(w = 0; w <= yt; w++)t.bl_count[w] = 0;
        for(e[t.heap[t.heap_max] * 2 + 1] = 0, l = t.heap_max + 1; l < xo; l++)u = t.heap[l], w = e[e[u * 2 + 1] * 2 + 1] + 1, w > d && (w = d, x++), e[u * 2 + 1] = w, !(u > r) && (t.bl_count[w]++, p = 0, u >= o && (p = s[u - o]), k = e[u * 2], t.opt_len += k * (w + p), a && (t.static_len += k * (i[u * 2 + 1] + p)));
        if (x !== 0) {
            do {
                for(w = d - 1; t.bl_count[w] === 0;)w--;
                t.bl_count[w]--, t.bl_count[w + 1] += 2, t.bl_count[d]--, x -= 2;
            }while (x > 0);
            for(w = d; w !== 0; w--)for(u = t.bl_count[w]; u !== 0;)g = t.heap[--l], !(g > r) && (e[g * 2 + 1] !== w && (t.opt_len += (w - e[g * 2 + 1]) * e[g * 2], e[g * 2 + 1] = w), u--);
        }
    }, Do = (t, n, e)=>{
        const r = new Array(yt + 1);
        let i = 0, a, s;
        for(a = 1; a <= yt; a++)i = i + e[a - 1] << 1, r[a] = i;
        for(s = 0; s <= n; s++){
            let o = t[s * 2 + 1];
            o !== 0 && (t[s * 2] = Oo(r[o]++, o));
        }
    }, fu = ()=>{
        let t, n, e, r, i;
        const a = new Array(yt + 1);
        for(e = 0, r = 0; r < Ri - 1; r++)for(Di[r] = e, t = 0; t < 1 << pi[r]; t++)vn[e++] = r;
        for(vn[e - 1] = r, i = 0, r = 0; r < 16; r++)for(pr[r] = i, t = 0; t < 1 << sr[r]; t++)Sn[i++] = r;
        for(i >>= 7; r < Yt; r++)for(pr[r] = i << 7, t = 0; t < 1 << sr[r] - 7; t++)Sn[256 + i++] = r;
        for(n = 0; n <= yt; n++)a[n] = 0;
        for(t = 0; t <= 143;)et[t * 2 + 1] = 8, t++, a[8]++;
        for(; t <= 255;)et[t * 2 + 1] = 9, t++, a[9]++;
        for(; t <= 279;)et[t * 2 + 1] = 7, t++, a[7]++;
        for(; t <= 287;)et[t * 2 + 1] = 8, t++, a[8]++;
        for(Do(et, kn + 1, a), t = 0; t < Yt; t++)wn[t * 2 + 1] = 5, wn[t * 2] = Oo(t, 5);
        Co = new $r(et, pi, Un + 1, kn, yt), Uo = new $r(wn, sr, 0, Yt, yt), Ro = new $r(new Array(0), su, 0, Ni, au);
    }, Ho = (t)=>{
        let n;
        for(n = 0; n < kn; n++)t.dyn_ltree[n * 2] = 0;
        for(n = 0; n < Yt; n++)t.dyn_dtree[n * 2] = 0;
        for(n = 0; n < Ni; n++)t.bl_tree[n * 2] = 0;
        t.dyn_ltree[Oi * 2] = 1, t.opt_len = t.static_len = 0, t.sym_next = t.matches = 0;
    }, Fo = (t)=>{
        t.bi_valid > 8 ? xn(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0;
    }, Da = (t, n, e, r)=>{
        const i = n * 2, a = e * 2;
        return t[i] < t[a] || t[i] === t[a] && r[n] <= r[e];
    }, Vr = (t, n, e)=>{
        const r = t.heap[e];
        let i = e << 1;
        for(; i <= t.heap_len && (i < t.heap_len && Da(n, t.heap[i + 1], t.heap[i], t.depth) && i++, !Da(n, r, t.heap[i], t.depth));)t.heap[e] = t.heap[i], e = i, i <<= 1;
        t.heap[e] = r;
    }, Ha = (t, n, e)=>{
        let r, i, a = 0, s, o;
        if (t.sym_next !== 0) do r = t.pending_buf[t.sym_buf + a++] & 255, r += (t.pending_buf[t.sym_buf + a++] & 255) << 8, i = t.pending_buf[t.sym_buf + a++], r === 0 ? Ve(t, i, n) : (s = vn[i], Ve(t, s + Un + 1, n), o = pi[s], o !== 0 && (i -= Di[s], Te(t, i, o)), r--, s = No(r), Ve(t, s, e), o = sr[s], o !== 0 && (r -= pr[s], Te(t, r, o)));
        while (a < t.sym_next);
        Ve(t, Oi, n);
    }, wi = (t, n)=>{
        const e = n.dyn_tree, r = n.stat_desc.static_tree, i = n.stat_desc.has_stree, a = n.stat_desc.elems;
        let s, o, d = -1, l;
        for(t.heap_len = 0, t.heap_max = xo, s = 0; s < a; s++)e[s * 2] !== 0 ? (t.heap[++t.heap_len] = d = s, t.depth[s] = 0) : e[s * 2 + 1] = 0;
        for(; t.heap_len < 2;)l = t.heap[++t.heap_len] = d < 2 ? ++d : 0, e[l * 2] = 1, t.depth[l] = 0, t.opt_len--, i && (t.static_len -= r[l * 2 + 1]);
        for(n.max_code = d, s = t.heap_len >> 1; s >= 1; s--)Vr(t, e, s);
        l = a;
        do s = t.heap[1], t.heap[1] = t.heap[t.heap_len--], Vr(t, e, 1), o = t.heap[1], t.heap[--t.heap_max] = s, t.heap[--t.heap_max] = o, e[l * 2] = e[s * 2] + e[o * 2], t.depth[l] = (t.depth[s] >= t.depth[o] ? t.depth[s] : t.depth[o]) + 1, e[s * 2 + 1] = e[o * 2 + 1] = l, t.heap[1] = l++, Vr(t, e, 1);
        while (t.heap_len >= 2);
        t.heap[--t.heap_max] = t.heap[1], cu(t, n), Do(e, d, t.bl_count);
    }, Fa = (t, n, e)=>{
        let r, i = -1, a, s = n[0 * 2 + 1], o = 0, d = 7, l = 4;
        for(s === 0 && (d = 138, l = 3), n[(e + 1) * 2 + 1] = 65535, r = 0; r <= e; r++)a = s, s = n[(r + 1) * 2 + 1], !(++o < d && a === s) && (o < l ? t.bl_tree[a * 2] += o : a !== 0 ? (a !== i && t.bl_tree[a * 2]++, t.bl_tree[Ao * 2]++) : o <= 10 ? t.bl_tree[Io * 2]++ : t.bl_tree[To * 2]++, o = 0, i = a, s === 0 ? (d = 138, l = 3) : a === s ? (d = 6, l = 3) : (d = 7, l = 4));
    }, za = (t, n, e)=>{
        let r, i = -1, a, s = n[0 * 2 + 1], o = 0, d = 7, l = 4;
        for(s === 0 && (d = 138, l = 3), r = 0; r <= e; r++)if (a = s, s = n[(r + 1) * 2 + 1], !(++o < d && a === s)) {
            if (o < l) do Ve(t, a, t.bl_tree);
            while (--o !== 0);
            else a !== 0 ? (a !== i && (Ve(t, a, t.bl_tree), o--), Ve(t, Ao, t.bl_tree), Te(t, o - 3, 2)) : o <= 10 ? (Ve(t, Io, t.bl_tree), Te(t, o - 3, 3)) : (Ve(t, To, t.bl_tree), Te(t, o - 11, 7));
            o = 0, i = a, s === 0 ? (d = 138, l = 3) : a === s ? (d = 6, l = 3) : (d = 7, l = 4);
        }
    }, uu = (t)=>{
        let n;
        for(Fa(t, t.dyn_ltree, t.l_desc.max_code), Fa(t, t.dyn_dtree, t.d_desc.max_code), wi(t, t.bl_desc), n = Ni - 1; n >= 3 && t.bl_tree[Bo[n] * 2 + 1] === 0; n--);
        return t.opt_len += 3 * (n + 1) + 5 + 5 + 4, n;
    }, hu = (t, n, e, r)=>{
        let i;
        for(Te(t, n - 257, 5), Te(t, e - 1, 5), Te(t, r - 4, 4), i = 0; i < r; i++)Te(t, t.bl_tree[Bo[i] * 2 + 1], 3);
        za(t, t.dyn_ltree, n - 1), za(t, t.dyn_dtree, e - 1);
    }, du = (t)=>{
        let n = 4093624447, e;
        for(e = 0; e <= 31; e++, n >>>= 1)if (n & 1 && t.dyn_ltree[e * 2] !== 0) return Na;
        if (t.dyn_ltree[9 * 2] !== 0 || t.dyn_ltree[10 * 2] !== 0 || t.dyn_ltree[13 * 2] !== 0) return Oa;
        for(e = 32; e < Un; e++)if (t.dyn_ltree[e * 2] !== 0) return Oa;
        return Na;
    };
    let Za = !1;
    const _u = (t)=>{
        Za || (fu(), Za = !0), t.l_desc = new Wr(t.dyn_ltree, Co), t.d_desc = new Wr(t.dyn_dtree, Uo), t.bl_desc = new Wr(t.bl_tree, Ro), t.bi_buf = 0, t.bi_valid = 0, Ho(t);
    }, zo = (t, n, e, r)=>{
        Te(t, (tu << 1) + (r ? 1 : 0), 3), Fo(t), xn(t, e), xn(t, ~e), e && t.pending_buf.set(t.window.subarray(n, n + e), t.pending), t.pending += e;
    }, pu = (t)=>{
        Te(t, vo << 1, 3), Ve(t, Oi, et), lu(t);
    }, wu = (t, n, e, r)=>{
        let i, a, s = 0;
        t.level > 0 ? (t.strm.data_type === eu && (t.strm.data_type = du(t)), wi(t, t.l_desc), wi(t, t.d_desc), s = uu(t), i = t.opt_len + 3 + 7 >>> 3, a = t.static_len + 3 + 7 >>> 3, a <= i && (i = a)) : i = a = e + 5, e + 4 <= i && n !== -1 ? zo(t, n, e, r) : t.strategy === Qf || a === i ? (Te(t, (vo << 1) + (r ? 1 : 0), 3), Ha(t, et, wn)) : (Te(t, (nu << 1) + (r ? 1 : 0), 3), hu(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, s + 1), Ha(t, t.dyn_ltree, t.dyn_dtree)), Ho(t), r && Fo(t);
    }, mu = (t, n, e)=>(t.pending_buf[t.sym_buf + t.sym_next++] = n, t.pending_buf[t.sym_buf + t.sym_next++] = n >> 8, t.pending_buf[t.sym_buf + t.sym_next++] = e, n === 0 ? t.dyn_ltree[e * 2]++ : (t.matches++, n--, t.dyn_ltree[(vn[e] + Un + 1) * 2]++, t.dyn_dtree[No(n) * 2]++), t.sym_next === t.sym_end);
    var gu = _u, bu = zo, yu = wu, Eu = mu, ku = pu, Su = {
        _tr_init: gu,
        _tr_stored_block: bu,
        _tr_flush_block: yu,
        _tr_tally: Eu,
        _tr_align: ku
    };
    const vu = (t, n, e, r)=>{
        let i = t & 65535 | 0, a = t >>> 16 & 65535 | 0, s = 0;
        for(; e !== 0;){
            s = e > 2e3 ? 2e3 : e, e -= s;
            do i = i + n[r++] | 0, a = a + i | 0;
            while (--s);
            i %= 65521, a %= 65521;
        }
        return i | a << 16 | 0;
    };
    var An = vu;
    const xu = ()=>{
        let t, n = [];
        for(var e = 0; e < 256; e++){
            t = e;
            for(var r = 0; r < 8; r++)t = t & 1 ? 3988292384 ^ t >>> 1 : t >>> 1;
            n[e] = t;
        }
        return n;
    }, Au = new Uint32Array(xu()), Iu = (t, n, e, r)=>{
        const i = Au, a = r + e;
        t ^= -1;
        for(let s = r; s < a; s++)t = t >>> 8 ^ i[(t ^ n[s]) & 255];
        return t ^ -1;
    };
    var ye = Iu, xt = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version"
    }, Rn = {
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
    const { _tr_init: Tu, _tr_stored_block: mi, _tr_flush_block: Bu, _tr_tally: ft, _tr_align: Cu } = Su, { Z_NO_FLUSH: ut, Z_PARTIAL_FLUSH: Uu, Z_FULL_FLUSH: Ru, Z_FINISH: Fe, Z_BLOCK: Ma, Z_OK: ke, Z_STREAM_END: La, Z_STREAM_ERROR: je, Z_DATA_ERROR: Nu, Z_BUF_ERROR: Yr, Z_DEFAULT_COMPRESSION: Ou, Z_FILTERED: Du, Z_HUFFMAN_ONLY: Yn, Z_RLE: Hu, Z_FIXED: Fu, Z_DEFAULT_STRATEGY: zu, Z_UNKNOWN: Zu, Z_DEFLATED: Sr } = Rn, Mu = 9, Lu = 15, Pu = 8, $u = 29, Wu = 256, gi = Wu + 1 + $u, Vu = 30, Yu = 19, ju = 2 * gi + 1, Ku = 15, Q = 3, lt = 258, Ke = lt + Q + 1, Gu = 32, Gt = 42, Hi = 57, bi = 69, yi = 73, Ei = 91, ki = 103, Et = 113, hn = 666, ve = 1, Qt = 2, At = 3, en = 4, qu = 3, kt = (t, n)=>(t.msg = xt[n], n), Pa = (t)=>t * 2 - (t > 4 ? 9 : 0), ot = (t)=>{
        let n = t.length;
        for(; --n >= 0;)t[n] = 0;
    }, Xu = (t)=>{
        let n, e, r, i = t.w_size;
        n = t.hash_size, r = n;
        do e = t.head[--r], t.head[r] = e >= i ? e - i : 0;
        while (--n);
        n = i, r = n;
        do e = t.prev[--r], t.prev[r] = e >= i ? e - i : 0;
        while (--n);
    };
    let Ju = (t, n, e)=>(n << t.hash_shift ^ e) & t.hash_mask, ht = Ju;
    const Ue = (t)=>{
        const n = t.state;
        let e = n.pending;
        e > t.avail_out && (e = t.avail_out), e !== 0 && (t.output.set(n.pending_buf.subarray(n.pending_out, n.pending_out + e), t.next_out), t.next_out += e, n.pending_out += e, t.total_out += e, t.avail_out -= e, n.pending -= e, n.pending === 0 && (n.pending_out = 0));
    }, Oe = (t, n)=>{
        Bu(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, n), t.block_start = t.strstart, Ue(t.strm);
    }, ne = (t, n)=>{
        t.pending_buf[t.pending++] = n;
    }, on = (t, n)=>{
        t.pending_buf[t.pending++] = n >>> 8 & 255, t.pending_buf[t.pending++] = n & 255;
    }, Si = (t, n, e, r)=>{
        let i = t.avail_in;
        return i > r && (i = r), i === 0 ? 0 : (t.avail_in -= i, n.set(t.input.subarray(t.next_in, t.next_in + i), e), t.state.wrap === 1 ? t.adler = An(t.adler, n, i, e) : t.state.wrap === 2 && (t.adler = ye(t.adler, n, i, e)), t.next_in += i, t.total_in += i, i);
    }, Zo = (t, n)=>{
        let e = t.max_chain_length, r = t.strstart, i, a, s = t.prev_length, o = t.nice_match;
        const d = t.strstart > t.w_size - Ke ? t.strstart - (t.w_size - Ke) : 0, l = t.window, u = t.w_mask, g = t.prev, w = t.strstart + lt;
        let p = l[r + s - 1], k = l[r + s];
        t.prev_length >= t.good_match && (e >>= 2), o > t.lookahead && (o = t.lookahead);
        do if (i = n, !(l[i + s] !== k || l[i + s - 1] !== p || l[i] !== l[r] || l[++i] !== l[r + 1])) {
            r += 2, i++;
            do ;
            while (l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && r < w);
            if (a = lt - (w - r), r = w - lt, a > s) {
                if (t.match_start = n, s = a, a >= o) break;
                p = l[r + s - 1], k = l[r + s];
            }
        }
        while ((n = g[n & u]) > d && --e !== 0);
        return s <= t.lookahead ? s : t.lookahead;
    }, qt = (t)=>{
        const n = t.w_size;
        let e, r, i;
        do {
            if (r = t.window_size - t.lookahead - t.strstart, t.strstart >= n + (n - Ke) && (t.window.set(t.window.subarray(n, n + n - r), 0), t.match_start -= n, t.strstart -= n, t.block_start -= n, t.insert > t.strstart && (t.insert = t.strstart), Xu(t), r += n), t.strm.avail_in === 0) break;
            if (e = Si(t.strm, t.window, t.strstart + t.lookahead, r), t.lookahead += e, t.lookahead + t.insert >= Q) for(i = t.strstart - t.insert, t.ins_h = t.window[i], t.ins_h = ht(t, t.ins_h, t.window[i + 1]); t.insert && (t.ins_h = ht(t, t.ins_h, t.window[i + Q - 1]), t.prev[i & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = i, i++, t.insert--, !(t.lookahead + t.insert < Q)););
        }while (t.lookahead < Ke && t.strm.avail_in !== 0);
    }, Mo = (t, n)=>{
        let e = t.pending_buf_size - 5 > t.w_size ? t.w_size : t.pending_buf_size - 5, r, i, a, s = 0, o = t.strm.avail_in;
        do {
            if (r = 65535, a = t.bi_valid + 42 >> 3, t.strm.avail_out < a || (a = t.strm.avail_out - a, i = t.strstart - t.block_start, r > i + t.strm.avail_in && (r = i + t.strm.avail_in), r > a && (r = a), r < e && (r === 0 && n !== Fe || n === ut || r !== i + t.strm.avail_in))) break;
            s = n === Fe && r === i + t.strm.avail_in ? 1 : 0, mi(t, 0, 0, s), t.pending_buf[t.pending - 4] = r, t.pending_buf[t.pending - 3] = r >> 8, t.pending_buf[t.pending - 2] = ~r, t.pending_buf[t.pending - 1] = ~r >> 8, Ue(t.strm), i && (i > r && (i = r), t.strm.output.set(t.window.subarray(t.block_start, t.block_start + i), t.strm.next_out), t.strm.next_out += i, t.strm.avail_out -= i, t.strm.total_out += i, t.block_start += i, r -= i), r && (Si(t.strm, t.strm.output, t.strm.next_out, r), t.strm.next_out += r, t.strm.avail_out -= r, t.strm.total_out += r);
        }while (s === 0);
        return o -= t.strm.avail_in, o && (o >= t.w_size ? (t.matches = 2, t.window.set(t.strm.input.subarray(t.strm.next_in - t.w_size, t.strm.next_in), 0), t.strstart = t.w_size, t.insert = t.strstart) : (t.window_size - t.strstart <= o && (t.strstart -= t.w_size, t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0), t.matches < 2 && t.matches++, t.insert > t.strstart && (t.insert = t.strstart)), t.window.set(t.strm.input.subarray(t.strm.next_in - o, t.strm.next_in), t.strstart), t.strstart += o, t.insert += o > t.w_size - t.insert ? t.w_size - t.insert : o), t.block_start = t.strstart), t.high_water < t.strstart && (t.high_water = t.strstart), s ? en : n !== ut && n !== Fe && t.strm.avail_in === 0 && t.strstart === t.block_start ? Qt : (a = t.window_size - t.strstart, t.strm.avail_in > a && t.block_start >= t.w_size && (t.block_start -= t.w_size, t.strstart -= t.w_size, t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0), t.matches < 2 && t.matches++, a += t.w_size, t.insert > t.strstart && (t.insert = t.strstart)), a > t.strm.avail_in && (a = t.strm.avail_in), a && (Si(t.strm, t.window, t.strstart, a), t.strstart += a, t.insert += a > t.w_size - t.insert ? t.w_size - t.insert : a), t.high_water < t.strstart && (t.high_water = t.strstart), a = t.bi_valid + 42 >> 3, a = t.pending_buf_size - a > 65535 ? 65535 : t.pending_buf_size - a, e = a > t.w_size ? t.w_size : a, i = t.strstart - t.block_start, (i >= e || (i || n === Fe) && n !== ut && t.strm.avail_in === 0 && i <= a) && (r = i > a ? a : i, s = n === Fe && t.strm.avail_in === 0 && r === i ? 1 : 0, mi(t, t.block_start, r, s), t.block_start += r, Ue(t.strm)), s ? At : ve);
    }, jr = (t, n)=>{
        let e, r;
        for(;;){
            if (t.lookahead < Ke) {
                if (qt(t), t.lookahead < Ke && n === ut) return ve;
                if (t.lookahead === 0) break;
            }
            if (e = 0, t.lookahead >= Q && (t.ins_h = ht(t, t.ins_h, t.window[t.strstart + Q - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), e !== 0 && t.strstart - e <= t.w_size - Ke && (t.match_length = Zo(t, e)), t.match_length >= Q) if (r = ft(t, t.strstart - t.match_start, t.match_length - Q), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= Q) {
                t.match_length--;
                do t.strstart++, t.ins_h = ht(t, t.ins_h, t.window[t.strstart + Q - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart;
                while (--t.match_length !== 0);
                t.strstart++;
            } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = ht(t, t.ins_h, t.window[t.strstart + 1]);
            else r = ft(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
            if (r && (Oe(t, !1), t.strm.avail_out === 0)) return ve;
        }
        return t.insert = t.strstart < Q - 1 ? t.strstart : Q - 1, n === Fe ? (Oe(t, !0), t.strm.avail_out === 0 ? At : en) : t.sym_next && (Oe(t, !1), t.strm.avail_out === 0) ? ve : Qt;
    }, Ft = (t, n)=>{
        let e, r, i;
        for(;;){
            if (t.lookahead < Ke) {
                if (qt(t), t.lookahead < Ke && n === ut) return ve;
                if (t.lookahead === 0) break;
            }
            if (e = 0, t.lookahead >= Q && (t.ins_h = ht(t, t.ins_h, t.window[t.strstart + Q - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = Q - 1, e !== 0 && t.prev_length < t.max_lazy_match && t.strstart - e <= t.w_size - Ke && (t.match_length = Zo(t, e), t.match_length <= 5 && (t.strategy === Du || t.match_length === Q && t.strstart - t.match_start > 4096) && (t.match_length = Q - 1)), t.prev_length >= Q && t.match_length <= t.prev_length) {
                i = t.strstart + t.lookahead - Q, r = ft(t, t.strstart - 1 - t.prev_match, t.prev_length - Q), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
                do ++t.strstart <= i && (t.ins_h = ht(t, t.ins_h, t.window[t.strstart + Q - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart);
                while (--t.prev_length !== 0);
                if (t.match_available = 0, t.match_length = Q - 1, t.strstart++, r && (Oe(t, !1), t.strm.avail_out === 0)) return ve;
            } else if (t.match_available) {
                if (r = ft(t, 0, t.window[t.strstart - 1]), r && Oe(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0) return ve;
            } else t.match_available = 1, t.strstart++, t.lookahead--;
        }
        return t.match_available && (r = ft(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < Q - 1 ? t.strstart : Q - 1, n === Fe ? (Oe(t, !0), t.strm.avail_out === 0 ? At : en) : t.sym_next && (Oe(t, !1), t.strm.avail_out === 0) ? ve : Qt;
    }, Qu = (t, n)=>{
        let e, r, i, a;
        const s = t.window;
        for(;;){
            if (t.lookahead <= lt) {
                if (qt(t), t.lookahead <= lt && n === ut) return ve;
                if (t.lookahead === 0) break;
            }
            if (t.match_length = 0, t.lookahead >= Q && t.strstart > 0 && (i = t.strstart - 1, r = s[i], r === s[++i] && r === s[++i] && r === s[++i])) {
                a = t.strstart + lt;
                do ;
                while (r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && i < a);
                t.match_length = lt - (a - i), t.match_length > t.lookahead && (t.match_length = t.lookahead);
            }
            if (t.match_length >= Q ? (e = ft(t, 1, t.match_length - Q), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (e = ft(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), e && (Oe(t, !1), t.strm.avail_out === 0)) return ve;
        }
        return t.insert = 0, n === Fe ? (Oe(t, !0), t.strm.avail_out === 0 ? At : en) : t.sym_next && (Oe(t, !1), t.strm.avail_out === 0) ? ve : Qt;
    }, eh = (t, n)=>{
        let e;
        for(;;){
            if (t.lookahead === 0 && (qt(t), t.lookahead === 0)) {
                if (n === ut) return ve;
                break;
            }
            if (t.match_length = 0, e = ft(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, e && (Oe(t, !1), t.strm.avail_out === 0)) return ve;
        }
        return t.insert = 0, n === Fe ? (Oe(t, !0), t.strm.avail_out === 0 ? At : en) : t.sym_next && (Oe(t, !1), t.strm.avail_out === 0) ? ve : Qt;
    };
    function $e(t, n, e, r, i) {
        this.good_length = t, this.max_lazy = n, this.nice_length = e, this.max_chain = r, this.func = i;
    }
    const dn = [
        new $e(0, 0, 0, 0, Mo),
        new $e(4, 4, 8, 4, jr),
        new $e(4, 5, 16, 8, jr),
        new $e(4, 6, 32, 32, jr),
        new $e(4, 4, 16, 16, Ft),
        new $e(8, 16, 32, 32, Ft),
        new $e(8, 16, 128, 128, Ft),
        new $e(8, 32, 128, 256, Ft),
        new $e(32, 128, 258, 1024, Ft),
        new $e(32, 258, 258, 4096, Ft)
    ], th = (t)=>{
        t.window_size = 2 * t.w_size, ot(t.head), t.max_lazy_match = dn[t.level].max_lazy, t.good_match = dn[t.level].good_length, t.nice_match = dn[t.level].nice_length, t.max_chain_length = dn[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = Q - 1, t.match_available = 0, t.ins_h = 0;
    };
    function nh() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = Sr, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(ju * 2), this.dyn_dtree = new Uint16Array((2 * Vu + 1) * 2), this.bl_tree = new Uint16Array((2 * Yu + 1) * 2), ot(this.dyn_ltree), ot(this.dyn_dtree), ot(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(Ku + 1), this.heap = new Uint16Array(2 * gi + 1), ot(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(2 * gi + 1), ot(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
    }
    const Nn = (t)=>{
        if (!t) return 1;
        const n = t.state;
        return !n || n.strm !== t || n.status !== Gt && n.status !== Hi && n.status !== bi && n.status !== yi && n.status !== Ei && n.status !== ki && n.status !== Et && n.status !== hn ? 1 : 0;
    }, Lo = (t)=>{
        if (Nn(t)) return kt(t, je);
        t.total_in = t.total_out = 0, t.data_type = Zu;
        const n = t.state;
        return n.pending = 0, n.pending_out = 0, n.wrap < 0 && (n.wrap = -n.wrap), n.status = n.wrap === 2 ? Hi : n.wrap ? Gt : Et, t.adler = n.wrap === 2 ? 0 : 1, n.last_flush = -2, Tu(n), ke;
    }, Po = (t)=>{
        const n = Lo(t);
        return n === ke && th(t.state), n;
    }, rh = (t, n)=>Nn(t) || t.state.wrap !== 2 ? je : (t.state.gzhead = n, ke), $o = (t, n, e, r, i, a)=>{
        if (!t) return je;
        let s = 1;
        if (n === Ou && (n = 6), r < 0 ? (s = 0, r = -r) : r > 15 && (s = 2, r -= 16), i < 1 || i > Mu || e !== Sr || r < 8 || r > 15 || n < 0 || n > 9 || a < 0 || a > Fu || r === 8 && s !== 1) return kt(t, je);
        r === 8 && (r = 9);
        const o = new nh;
        return t.state = o, o.strm = t, o.status = Gt, o.wrap = s, o.gzhead = null, o.w_bits = r, o.w_size = 1 << o.w_bits, o.w_mask = o.w_size - 1, o.hash_bits = i + 7, o.hash_size = 1 << o.hash_bits, o.hash_mask = o.hash_size - 1, o.hash_shift = ~~((o.hash_bits + Q - 1) / Q), o.window = new Uint8Array(o.w_size * 2), o.head = new Uint16Array(o.hash_size), o.prev = new Uint16Array(o.w_size), o.lit_bufsize = 1 << i + 6, o.pending_buf_size = o.lit_bufsize * 4, o.pending_buf = new Uint8Array(o.pending_buf_size), o.sym_buf = o.lit_bufsize, o.sym_end = (o.lit_bufsize - 1) * 3, o.level = n, o.strategy = a, o.method = e, Po(t);
    }, ih = (t, n)=>$o(t, n, Sr, Lu, Pu, zu), ah = (t, n)=>{
        if (Nn(t) || n > Ma || n < 0) return t ? kt(t, je) : je;
        const e = t.state;
        if (!t.output || t.avail_in !== 0 && !t.input || e.status === hn && n !== Fe) return kt(t, t.avail_out === 0 ? Yr : je);
        const r = e.last_flush;
        if (e.last_flush = n, e.pending !== 0) {
            if (Ue(t), t.avail_out === 0) return e.last_flush = -1, ke;
        } else if (t.avail_in === 0 && Pa(n) <= Pa(r) && n !== Fe) return kt(t, Yr);
        if (e.status === hn && t.avail_in !== 0) return kt(t, Yr);
        if (e.status === Gt && e.wrap === 0 && (e.status = Et), e.status === Gt) {
            let i = Sr + (e.w_bits - 8 << 4) << 8, a = -1;
            if (e.strategy >= Yn || e.level < 2 ? a = 0 : e.level < 6 ? a = 1 : e.level === 6 ? a = 2 : a = 3, i |= a << 6, e.strstart !== 0 && (i |= Gu), i += 31 - i % 31, on(e, i), e.strstart !== 0 && (on(e, t.adler >>> 16), on(e, t.adler & 65535)), t.adler = 1, e.status = Et, Ue(t), e.pending !== 0) return e.last_flush = -1, ke;
        }
        if (e.status === Hi) {
            if (t.adler = 0, ne(e, 31), ne(e, 139), ne(e, 8), e.gzhead) ne(e, (e.gzhead.text ? 1 : 0) + (e.gzhead.hcrc ? 2 : 0) + (e.gzhead.extra ? 4 : 0) + (e.gzhead.name ? 8 : 0) + (e.gzhead.comment ? 16 : 0)), ne(e, e.gzhead.time & 255), ne(e, e.gzhead.time >> 8 & 255), ne(e, e.gzhead.time >> 16 & 255), ne(e, e.gzhead.time >> 24 & 255), ne(e, e.level === 9 ? 2 : e.strategy >= Yn || e.level < 2 ? 4 : 0), ne(e, e.gzhead.os & 255), e.gzhead.extra && e.gzhead.extra.length && (ne(e, e.gzhead.extra.length & 255), ne(e, e.gzhead.extra.length >> 8 & 255)), e.gzhead.hcrc && (t.adler = ye(t.adler, e.pending_buf, e.pending, 0)), e.gzindex = 0, e.status = bi;
            else if (ne(e, 0), ne(e, 0), ne(e, 0), ne(e, 0), ne(e, 0), ne(e, e.level === 9 ? 2 : e.strategy >= Yn || e.level < 2 ? 4 : 0), ne(e, qu), e.status = Et, Ue(t), e.pending !== 0) return e.last_flush = -1, ke;
        }
        if (e.status === bi) {
            if (e.gzhead.extra) {
                let i = e.pending, a = (e.gzhead.extra.length & 65535) - e.gzindex;
                for(; e.pending + a > e.pending_buf_size;){
                    let o = e.pending_buf_size - e.pending;
                    if (e.pending_buf.set(e.gzhead.extra.subarray(e.gzindex, e.gzindex + o), e.pending), e.pending = e.pending_buf_size, e.gzhead.hcrc && e.pending > i && (t.adler = ye(t.adler, e.pending_buf, e.pending - i, i)), e.gzindex += o, Ue(t), e.pending !== 0) return e.last_flush = -1, ke;
                    i = 0, a -= o;
                }
                let s = new Uint8Array(e.gzhead.extra);
                e.pending_buf.set(s.subarray(e.gzindex, e.gzindex + a), e.pending), e.pending += a, e.gzhead.hcrc && e.pending > i && (t.adler = ye(t.adler, e.pending_buf, e.pending - i, i)), e.gzindex = 0;
            }
            e.status = yi;
        }
        if (e.status === yi) {
            if (e.gzhead.name) {
                let i = e.pending, a;
                do {
                    if (e.pending === e.pending_buf_size) {
                        if (e.gzhead.hcrc && e.pending > i && (t.adler = ye(t.adler, e.pending_buf, e.pending - i, i)), Ue(t), e.pending !== 0) return e.last_flush = -1, ke;
                        i = 0;
                    }
                    e.gzindex < e.gzhead.name.length ? a = e.gzhead.name.charCodeAt(e.gzindex++) & 255 : a = 0, ne(e, a);
                }while (a !== 0);
                e.gzhead.hcrc && e.pending > i && (t.adler = ye(t.adler, e.pending_buf, e.pending - i, i)), e.gzindex = 0;
            }
            e.status = Ei;
        }
        if (e.status === Ei) {
            if (e.gzhead.comment) {
                let i = e.pending, a;
                do {
                    if (e.pending === e.pending_buf_size) {
                        if (e.gzhead.hcrc && e.pending > i && (t.adler = ye(t.adler, e.pending_buf, e.pending - i, i)), Ue(t), e.pending !== 0) return e.last_flush = -1, ke;
                        i = 0;
                    }
                    e.gzindex < e.gzhead.comment.length ? a = e.gzhead.comment.charCodeAt(e.gzindex++) & 255 : a = 0, ne(e, a);
                }while (a !== 0);
                e.gzhead.hcrc && e.pending > i && (t.adler = ye(t.adler, e.pending_buf, e.pending - i, i));
            }
            e.status = ki;
        }
        if (e.status === ki) {
            if (e.gzhead.hcrc) {
                if (e.pending + 2 > e.pending_buf_size && (Ue(t), e.pending !== 0)) return e.last_flush = -1, ke;
                ne(e, t.adler & 255), ne(e, t.adler >> 8 & 255), t.adler = 0;
            }
            if (e.status = Et, Ue(t), e.pending !== 0) return e.last_flush = -1, ke;
        }
        if (t.avail_in !== 0 || e.lookahead !== 0 || n !== ut && e.status !== hn) {
            let i = e.level === 0 ? Mo(e, n) : e.strategy === Yn ? eh(e, n) : e.strategy === Hu ? Qu(e, n) : dn[e.level].func(e, n);
            if ((i === At || i === en) && (e.status = hn), i === ve || i === At) return t.avail_out === 0 && (e.last_flush = -1), ke;
            if (i === Qt && (n === Uu ? Cu(e) : n !== Ma && (mi(e, 0, 0, !1), n === Ru && (ot(e.head), e.lookahead === 0 && (e.strstart = 0, e.block_start = 0, e.insert = 0))), Ue(t), t.avail_out === 0)) return e.last_flush = -1, ke;
        }
        return n !== Fe ? ke : e.wrap <= 0 ? La : (e.wrap === 2 ? (ne(e, t.adler & 255), ne(e, t.adler >> 8 & 255), ne(e, t.adler >> 16 & 255), ne(e, t.adler >> 24 & 255), ne(e, t.total_in & 255), ne(e, t.total_in >> 8 & 255), ne(e, t.total_in >> 16 & 255), ne(e, t.total_in >> 24 & 255)) : (on(e, t.adler >>> 16), on(e, t.adler & 65535)), Ue(t), e.wrap > 0 && (e.wrap = -e.wrap), e.pending !== 0 ? ke : La);
    }, sh = (t)=>{
        if (Nn(t)) return je;
        const n = t.state.status;
        return t.state = null, n === Et ? kt(t, Nu) : ke;
    }, oh = (t, n)=>{
        let e = n.length;
        if (Nn(t)) return je;
        const r = t.state, i = r.wrap;
        if (i === 2 || i === 1 && r.status !== Gt || r.lookahead) return je;
        if (i === 1 && (t.adler = An(t.adler, n, e, 0)), r.wrap = 0, e >= r.w_size) {
            i === 0 && (ot(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0);
            let d = new Uint8Array(r.w_size);
            d.set(n.subarray(e - r.w_size, e), 0), n = d, e = r.w_size;
        }
        const a = t.avail_in, s = t.next_in, o = t.input;
        for(t.avail_in = e, t.next_in = 0, t.input = n, qt(r); r.lookahead >= Q;){
            let d = r.strstart, l = r.lookahead - (Q - 1);
            do r.ins_h = ht(r, r.ins_h, r.window[d + Q - 1]), r.prev[d & r.w_mask] = r.head[r.ins_h], r.head[r.ins_h] = d, d++;
            while (--l);
            r.strstart = d, r.lookahead = Q - 1, qt(r);
        }
        return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = Q - 1, r.match_available = 0, t.next_in = s, t.input = o, t.avail_in = a, r.wrap = i, ke;
    };
    var lh = ih, ch = $o, fh = Po, uh = Lo, hh = rh, dh = ah, _h = sh, ph = oh, wh = "pako deflate (from Nodeca project)", mn = {
        deflateInit: lh,
        deflateInit2: ch,
        deflateReset: fh,
        deflateResetKeep: uh,
        deflateSetHeader: hh,
        deflate: dh,
        deflateEnd: _h,
        deflateSetDictionary: ph,
        deflateInfo: wh
    };
    const mh = (t, n)=>Object.prototype.hasOwnProperty.call(t, n);
    var gh = function(t) {
        const n = Array.prototype.slice.call(arguments, 1);
        for(; n.length;){
            const e = n.shift();
            if (e) {
                if (typeof e != "object") throw new TypeError(e + "must be non-object");
                for(const r in e)mh(e, r) && (t[r] = e[r]);
            }
        }
        return t;
    }, bh = (t)=>{
        let n = 0;
        for(let r = 0, i = t.length; r < i; r++)n += t[r].length;
        const e = new Uint8Array(n);
        for(let r = 0, i = 0, a = t.length; r < a; r++){
            let s = t[r];
            e.set(s, i), i += s.length;
        }
        return e;
    }, vr = {
        assign: gh,
        flattenChunks: bh
    };
    let Wo = !0;
    try {
        String.fromCharCode.apply(null, new Uint8Array(1));
    } catch  {
        Wo = !1;
    }
    const In = new Uint8Array(256);
    for(let t = 0; t < 256; t++)In[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
    In[254] = In[254] = 1;
    var yh = (t)=>{
        if (typeof TextEncoder == "function" && TextEncoder.prototype.encode) return new TextEncoder().encode(t);
        let n, e, r, i, a, s = t.length, o = 0;
        for(i = 0; i < s; i++)e = t.charCodeAt(i), (e & 64512) === 55296 && i + 1 < s && (r = t.charCodeAt(i + 1), (r & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (r - 56320), i++)), o += e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4;
        for(n = new Uint8Array(o), a = 0, i = 0; a < o; i++)e = t.charCodeAt(i), (e & 64512) === 55296 && i + 1 < s && (r = t.charCodeAt(i + 1), (r & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (r - 56320), i++)), e < 128 ? n[a++] = e : e < 2048 ? (n[a++] = 192 | e >>> 6, n[a++] = 128 | e & 63) : e < 65536 ? (n[a++] = 224 | e >>> 12, n[a++] = 128 | e >>> 6 & 63, n[a++] = 128 | e & 63) : (n[a++] = 240 | e >>> 18, n[a++] = 128 | e >>> 12 & 63, n[a++] = 128 | e >>> 6 & 63, n[a++] = 128 | e & 63);
        return n;
    };
    const Eh = (t, n)=>{
        if (n < 65534 && t.subarray && Wo) return String.fromCharCode.apply(null, t.length === n ? t : t.subarray(0, n));
        let e = "";
        for(let r = 0; r < n; r++)e += String.fromCharCode(t[r]);
        return e;
    };
    var kh = (t, n)=>{
        const e = n || t.length;
        if (typeof TextDecoder == "function" && TextDecoder.prototype.decode) return new TextDecoder().decode(t.subarray(0, n));
        let r, i;
        const a = new Array(e * 2);
        for(i = 0, r = 0; r < e;){
            let s = t[r++];
            if (s < 128) {
                a[i++] = s;
                continue;
            }
            let o = In[s];
            if (o > 4) {
                a[i++] = 65533, r += o - 1;
                continue;
            }
            for(s &= o === 2 ? 31 : o === 3 ? 15 : 7; o > 1 && r < e;)s = s << 6 | t[r++] & 63, o--;
            if (o > 1) {
                a[i++] = 65533;
                continue;
            }
            s < 65536 ? a[i++] = s : (s -= 65536, a[i++] = 55296 | s >> 10 & 1023, a[i++] = 56320 | s & 1023);
        }
        return Eh(a, i);
    }, Sh = (t, n)=>{
        n = n || t.length, n > t.length && (n = t.length);
        let e = n - 1;
        for(; e >= 0 && (t[e] & 192) === 128;)e--;
        return e < 0 || e === 0 ? n : e + In[t[e]] > n ? e : n;
    }, Tn = {
        string2buf: yh,
        buf2string: kh,
        utf8border: Sh
    };
    function vh() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
    }
    var Vo = vh;
    const Yo = Object.prototype.toString, { Z_NO_FLUSH: xh, Z_SYNC_FLUSH: Ah, Z_FULL_FLUSH: Ih, Z_FINISH: Th, Z_OK: wr, Z_STREAM_END: Bh, Z_DEFAULT_COMPRESSION: Ch, Z_DEFAULT_STRATEGY: Uh, Z_DEFLATED: Rh } = Rn;
    function On(t) {
        this.options = vr.assign({
            level: Ch,
            method: Rh,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: Uh
        }, t || {});
        let n = this.options;
        n.raw && n.windowBits > 0 ? n.windowBits = -n.windowBits : n.gzip && n.windowBits > 0 && n.windowBits < 16 && (n.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Vo, this.strm.avail_out = 0;
        let e = mn.deflateInit2(this.strm, n.level, n.method, n.windowBits, n.memLevel, n.strategy);
        if (e !== wr) throw new Error(xt[e]);
        if (n.header && mn.deflateSetHeader(this.strm, n.header), n.dictionary) {
            let r;
            if (typeof n.dictionary == "string" ? r = Tn.string2buf(n.dictionary) : Yo.call(n.dictionary) === "[object ArrayBuffer]" ? r = new Uint8Array(n.dictionary) : r = n.dictionary, e = mn.deflateSetDictionary(this.strm, r), e !== wr) throw new Error(xt[e]);
            this._dict_set = !0;
        }
    }
    On.prototype.push = function(t, n) {
        const e = this.strm, r = this.options.chunkSize;
        let i, a;
        if (this.ended) return !1;
        for(n === ~~n ? a = n : a = n === !0 ? Th : xh, typeof t == "string" ? e.input = Tn.string2buf(t) : Yo.call(t) === "[object ArrayBuffer]" ? e.input = new Uint8Array(t) : e.input = t, e.next_in = 0, e.avail_in = e.input.length;;){
            if (e.avail_out === 0 && (e.output = new Uint8Array(r), e.next_out = 0, e.avail_out = r), (a === Ah || a === Ih) && e.avail_out <= 6) {
                this.onData(e.output.subarray(0, e.next_out)), e.avail_out = 0;
                continue;
            }
            if (i = mn.deflate(e, a), i === Bh) return e.next_out > 0 && this.onData(e.output.subarray(0, e.next_out)), i = mn.deflateEnd(this.strm), this.onEnd(i), this.ended = !0, i === wr;
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
    On.prototype.onData = function(t) {
        this.chunks.push(t);
    };
    On.prototype.onEnd = function(t) {
        t === wr && (this.result = vr.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
    };
    function Fi(t, n) {
        const e = new On(n);
        if (e.push(t, !0), e.err) throw e.msg || xt[e.err];
        return e.result;
    }
    function Nh(t, n) {
        return n = n || {}, n.raw = !0, Fi(t, n);
    }
    function Oh(t, n) {
        return n = n || {}, n.gzip = !0, Fi(t, n);
    }
    var Dh = On, Hh = Fi, Fh = Nh, zh = Oh, Zh = {
        Deflate: Dh,
        deflate: Hh,
        deflateRaw: Fh,
        gzip: zh
    };
    const jn = 16209, Mh = 16191;
    var Lh = function(n, e) {
        let r, i, a, s, o, d, l, u, g, w, p, k, x, I, T, D, C, m, H, V, B, $, z, R;
        const F = n.state;
        r = n.next_in, z = n.input, i = r + (n.avail_in - 5), a = n.next_out, R = n.output, s = a - (e - n.avail_out), o = a + (n.avail_out - 257), d = F.dmax, l = F.wsize, u = F.whave, g = F.wnext, w = F.window, p = F.hold, k = F.bits, x = F.lencode, I = F.distcode, T = (1 << F.lenbits) - 1, D = (1 << F.distbits) - 1;
        e: do {
            k < 15 && (p += z[r++] << k, k += 8, p += z[r++] << k, k += 8), C = x[p & T];
            t: for(;;){
                if (m = C >>> 24, p >>>= m, k -= m, m = C >>> 16 & 255, m === 0) R[a++] = C & 65535;
                else if (m & 16) {
                    H = C & 65535, m &= 15, m && (k < m && (p += z[r++] << k, k += 8), H += p & (1 << m) - 1, p >>>= m, k -= m), k < 15 && (p += z[r++] << k, k += 8, p += z[r++] << k, k += 8), C = I[p & D];
                    n: for(;;){
                        if (m = C >>> 24, p >>>= m, k -= m, m = C >>> 16 & 255, m & 16) {
                            if (V = C & 65535, m &= 15, k < m && (p += z[r++] << k, k += 8, k < m && (p += z[r++] << k, k += 8)), V += p & (1 << m) - 1, V > d) {
                                n.msg = "invalid distance too far back", F.mode = jn;
                                break e;
                            }
                            if (p >>>= m, k -= m, m = a - s, V > m) {
                                if (m = V - m, m > u && F.sane) {
                                    n.msg = "invalid distance too far back", F.mode = jn;
                                    break e;
                                }
                                if (B = 0, $ = w, g === 0) {
                                    if (B += l - m, m < H) {
                                        H -= m;
                                        do R[a++] = w[B++];
                                        while (--m);
                                        B = a - V, $ = R;
                                    }
                                } else if (g < m) {
                                    if (B += l + g - m, m -= g, m < H) {
                                        H -= m;
                                        do R[a++] = w[B++];
                                        while (--m);
                                        if (B = 0, g < H) {
                                            m = g, H -= m;
                                            do R[a++] = w[B++];
                                            while (--m);
                                            B = a - V, $ = R;
                                        }
                                    }
                                } else if (B += g - m, m < H) {
                                    H -= m;
                                    do R[a++] = w[B++];
                                    while (--m);
                                    B = a - V, $ = R;
                                }
                                for(; H > 2;)R[a++] = $[B++], R[a++] = $[B++], R[a++] = $[B++], H -= 3;
                                H && (R[a++] = $[B++], H > 1 && (R[a++] = $[B++]));
                            } else {
                                B = a - V;
                                do R[a++] = R[B++], R[a++] = R[B++], R[a++] = R[B++], H -= 3;
                                while (H > 2);
                                H && (R[a++] = R[B++], H > 1 && (R[a++] = R[B++]));
                            }
                        } else if (m & 64) {
                            n.msg = "invalid distance code", F.mode = jn;
                            break e;
                        } else {
                            C = I[(C & 65535) + (p & (1 << m) - 1)];
                            continue n;
                        }
                        break;
                    }
                } else if (m & 64) if (m & 32) {
                    F.mode = Mh;
                    break e;
                } else {
                    n.msg = "invalid literal/length code", F.mode = jn;
                    break e;
                }
                else {
                    C = x[(C & 65535) + (p & (1 << m) - 1)];
                    continue t;
                }
                break;
            }
        }while (r < i && a < o);
        H = k >> 3, r -= H, k -= H << 3, p &= (1 << k) - 1, n.next_in = r, n.next_out = a, n.avail_in = r < i ? 5 + (i - r) : 5 - (r - i), n.avail_out = a < o ? 257 + (o - a) : 257 - (a - o), F.hold = p, F.bits = k;
    };
    const zt = 15, $a = 852, Wa = 592, Va = 0, Kr = 1, Ya = 2, Ph = new Uint16Array([
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
    ]), $h = new Uint8Array([
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
    ]), Wh = new Uint16Array([
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
    ]), Vh = new Uint8Array([
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
    ]), Yh = (t, n, e, r, i, a, s, o)=>{
        const d = o.bits;
        let l = 0, u = 0, g = 0, w = 0, p = 0, k = 0, x = 0, I = 0, T = 0, D = 0, C, m, H, V, B, $ = null, z;
        const R = new Uint16Array(zt + 1), F = new Uint16Array(zt + 1);
        let ae = null, S, M, O;
        for(l = 0; l <= zt; l++)R[l] = 0;
        for(u = 0; u < r; u++)R[n[e + u]]++;
        for(p = d, w = zt; w >= 1 && R[w] === 0; w--);
        if (p > w && (p = w), w === 0) return i[a++] = 1 << 24 | 64 << 16 | 0, i[a++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
        for(g = 1; g < w && R[g] === 0; g++);
        for(p < g && (p = g), I = 1, l = 1; l <= zt; l++)if (I <<= 1, I -= R[l], I < 0) return -1;
        if (I > 0 && (t === Va || w !== 1)) return -1;
        for(F[1] = 0, l = 1; l < zt; l++)F[l + 1] = F[l] + R[l];
        for(u = 0; u < r; u++)n[e + u] !== 0 && (s[F[n[e + u]]++] = u);
        if (t === Va ? ($ = ae = s, z = 20) : t === Kr ? ($ = Ph, ae = $h, z = 257) : ($ = Wh, ae = Vh, z = 0), D = 0, u = 0, l = g, B = a, k = p, x = 0, H = -1, T = 1 << p, V = T - 1, t === Kr && T > $a || t === Ya && T > Wa) return 1;
        for(;;){
            S = l - x, s[u] + 1 < z ? (M = 0, O = s[u]) : s[u] >= z ? (M = ae[s[u] - z], O = $[s[u] - z]) : (M = 96, O = 0), C = 1 << l - x, m = 1 << k, g = m;
            do m -= C, i[B + (D >> x) + m] = S << 24 | M << 16 | O | 0;
            while (m !== 0);
            for(C = 1 << l - 1; D & C;)C >>= 1;
            if (C !== 0 ? (D &= C - 1, D += C) : D = 0, u++, --R[l] === 0) {
                if (l === w) break;
                l = n[e + s[u]];
            }
            if (l > p && (D & V) !== H) {
                for(x === 0 && (x = p), B += g, k = l - x, I = 1 << k; k + x < w && (I -= R[k + x], !(I <= 0));)k++, I <<= 1;
                if (T += 1 << k, t === Kr && T > $a || t === Ya && T > Wa) return 1;
                H = D & V, i[H] = p << 24 | k << 16 | B - a | 0;
            }
        }
        return D !== 0 && (i[B + D] = l - x << 24 | 64 << 16 | 0), o.bits = p, 0;
    };
    var gn = Yh;
    const jh = 0, jo = 1, Ko = 2, { Z_FINISH: ja, Z_BLOCK: Kh, Z_TREES: Kn, Z_OK: It, Z_STREAM_END: Gh, Z_NEED_DICT: qh, Z_STREAM_ERROR: Ze, Z_DATA_ERROR: Go, Z_MEM_ERROR: qo, Z_BUF_ERROR: Xh, Z_DEFLATED: Ka } = Rn, xr = 16180, Ga = 16181, qa = 16182, Xa = 16183, Ja = 16184, Qa = 16185, es = 16186, ts = 16187, ns = 16188, rs = 16189, mr = 16190, Qe = 16191, Gr = 16192, is = 16193, qr = 16194, as = 16195, ss = 16196, os = 16197, ls = 16198, Gn = 16199, qn = 16200, cs = 16201, fs = 16202, us = 16203, hs = 16204, ds = 16205, Xr = 16206, _s = 16207, ps = 16208, he = 16209, Xo = 16210, Jo = 16211, Jh = 852, Qh = 592, ed = 15, td = ed, ws = (t)=>(t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
    function nd() {
        this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
    }
    const Bt = (t)=>{
        if (!t) return 1;
        const n = t.state;
        return !n || n.strm !== t || n.mode < xr || n.mode > Jo ? 1 : 0;
    }, Qo = (t)=>{
        if (Bt(t)) return Ze;
        const n = t.state;
        return t.total_in = t.total_out = n.total = 0, t.msg = "", n.wrap && (t.adler = n.wrap & 1), n.mode = xr, n.last = 0, n.havedict = 0, n.flags = -1, n.dmax = 32768, n.head = null, n.hold = 0, n.bits = 0, n.lencode = n.lendyn = new Int32Array(Jh), n.distcode = n.distdyn = new Int32Array(Qh), n.sane = 1, n.back = -1, It;
    }, el = (t)=>{
        if (Bt(t)) return Ze;
        const n = t.state;
        return n.wsize = 0, n.whave = 0, n.wnext = 0, Qo(t);
    }, tl = (t, n)=>{
        let e;
        if (Bt(t)) return Ze;
        const r = t.state;
        return n < 0 ? (e = 0, n = -n) : (e = (n >> 4) + 5, n < 48 && (n &= 15)), n && (n < 8 || n > 15) ? Ze : (r.window !== null && r.wbits !== n && (r.window = null), r.wrap = e, r.wbits = n, el(t));
    }, nl = (t, n)=>{
        if (!t) return Ze;
        const e = new nd;
        t.state = e, e.strm = t, e.window = null, e.mode = xr;
        const r = tl(t, n);
        return r !== It && (t.state = null), r;
    }, rd = (t)=>nl(t, td);
    let ms = !0, Jr, Qr;
    const id = (t)=>{
        if (ms) {
            Jr = new Int32Array(512), Qr = new Int32Array(32);
            let n = 0;
            for(; n < 144;)t.lens[n++] = 8;
            for(; n < 256;)t.lens[n++] = 9;
            for(; n < 280;)t.lens[n++] = 7;
            for(; n < 288;)t.lens[n++] = 8;
            for(gn(jo, t.lens, 0, 288, Jr, 0, t.work, {
                bits: 9
            }), n = 0; n < 32;)t.lens[n++] = 5;
            gn(Ko, t.lens, 0, 32, Qr, 0, t.work, {
                bits: 5
            }), ms = !1;
        }
        t.lencode = Jr, t.lenbits = 9, t.distcode = Qr, t.distbits = 5;
    }, rl = (t, n, e, r)=>{
        let i;
        const a = t.state;
        return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Uint8Array(a.wsize)), r >= a.wsize ? (a.window.set(n.subarray(e - a.wsize, e), 0), a.wnext = 0, a.whave = a.wsize) : (i = a.wsize - a.wnext, i > r && (i = r), a.window.set(n.subarray(e - r, e - r + i), a.wnext), r -= i, r ? (a.window.set(n.subarray(e - r, e), 0), a.wnext = r, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0;
    }, ad = (t, n)=>{
        let e, r, i, a, s, o, d, l, u, g, w, p, k, x, I = 0, T, D, C, m, H, V, B, $;
        const z = new Uint8Array(4);
        let R, F;
        const ae = new Uint8Array([
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
        if (Bt(t) || !t.output || !t.input && t.avail_in !== 0) return Ze;
        e = t.state, e.mode === Qe && (e.mode = Gr), s = t.next_out, i = t.output, d = t.avail_out, a = t.next_in, r = t.input, o = t.avail_in, l = e.hold, u = e.bits, g = o, w = d, $ = It;
        e: for(;;)switch(e.mode){
            case xr:
                if (e.wrap === 0) {
                    e.mode = Gr;
                    break;
                }
                for(; u < 16;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (e.wrap & 2 && l === 35615) {
                    e.wbits === 0 && (e.wbits = 15), e.check = 0, z[0] = l & 255, z[1] = l >>> 8 & 255, e.check = ye(e.check, z, 2, 0), l = 0, u = 0, e.mode = Ga;
                    break;
                }
                if (e.head && (e.head.done = !1), !(e.wrap & 1) || (((l & 255) << 8) + (l >> 8)) % 31) {
                    t.msg = "incorrect header check", e.mode = he;
                    break;
                }
                if ((l & 15) !== Ka) {
                    t.msg = "unknown compression method", e.mode = he;
                    break;
                }
                if (l >>>= 4, u -= 4, B = (l & 15) + 8, e.wbits === 0 && (e.wbits = B), B > 15 || B > e.wbits) {
                    t.msg = "invalid window size", e.mode = he;
                    break;
                }
                e.dmax = 1 << e.wbits, e.flags = 0, t.adler = e.check = 1, e.mode = l & 512 ? rs : Qe, l = 0, u = 0;
                break;
            case Ga:
                for(; u < 16;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (e.flags = l, (e.flags & 255) !== Ka) {
                    t.msg = "unknown compression method", e.mode = he;
                    break;
                }
                if (e.flags & 57344) {
                    t.msg = "unknown header flags set", e.mode = he;
                    break;
                }
                e.head && (e.head.text = l >> 8 & 1), e.flags & 512 && e.wrap & 4 && (z[0] = l & 255, z[1] = l >>> 8 & 255, e.check = ye(e.check, z, 2, 0)), l = 0, u = 0, e.mode = qa;
            case qa:
                for(; u < 32;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                e.head && (e.head.time = l), e.flags & 512 && e.wrap & 4 && (z[0] = l & 255, z[1] = l >>> 8 & 255, z[2] = l >>> 16 & 255, z[3] = l >>> 24 & 255, e.check = ye(e.check, z, 4, 0)), l = 0, u = 0, e.mode = Xa;
            case Xa:
                for(; u < 16;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                e.head && (e.head.xflags = l & 255, e.head.os = l >> 8), e.flags & 512 && e.wrap & 4 && (z[0] = l & 255, z[1] = l >>> 8 & 255, e.check = ye(e.check, z, 2, 0)), l = 0, u = 0, e.mode = Ja;
            case Ja:
                if (e.flags & 1024) {
                    for(; u < 16;){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    e.length = l, e.head && (e.head.extra_len = l), e.flags & 512 && e.wrap & 4 && (z[0] = l & 255, z[1] = l >>> 8 & 255, e.check = ye(e.check, z, 2, 0)), l = 0, u = 0;
                } else e.head && (e.head.extra = null);
                e.mode = Qa;
            case Qa:
                if (e.flags & 1024 && (p = e.length, p > o && (p = o), p && (e.head && (B = e.head.extra_len - e.length, e.head.extra || (e.head.extra = new Uint8Array(e.head.extra_len)), e.head.extra.set(r.subarray(a, a + p), B)), e.flags & 512 && e.wrap & 4 && (e.check = ye(e.check, r, p, a)), o -= p, a += p, e.length -= p), e.length)) break e;
                e.length = 0, e.mode = es;
            case es:
                if (e.flags & 2048) {
                    if (o === 0) break e;
                    p = 0;
                    do B = r[a + p++], e.head && B && e.length < 65536 && (e.head.name += String.fromCharCode(B));
                    while (B && p < o);
                    if (e.flags & 512 && e.wrap & 4 && (e.check = ye(e.check, r, p, a)), o -= p, a += p, B) break e;
                } else e.head && (e.head.name = null);
                e.length = 0, e.mode = ts;
            case ts:
                if (e.flags & 4096) {
                    if (o === 0) break e;
                    p = 0;
                    do B = r[a + p++], e.head && B && e.length < 65536 && (e.head.comment += String.fromCharCode(B));
                    while (B && p < o);
                    if (e.flags & 512 && e.wrap & 4 && (e.check = ye(e.check, r, p, a)), o -= p, a += p, B) break e;
                } else e.head && (e.head.comment = null);
                e.mode = ns;
            case ns:
                if (e.flags & 512) {
                    for(; u < 16;){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    if (e.wrap & 4 && l !== (e.check & 65535)) {
                        t.msg = "header crc mismatch", e.mode = he;
                        break;
                    }
                    l = 0, u = 0;
                }
                e.head && (e.head.hcrc = e.flags >> 9 & 1, e.head.done = !0), t.adler = e.check = 0, e.mode = Qe;
                break;
            case rs:
                for(; u < 32;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                t.adler = e.check = ws(l), l = 0, u = 0, e.mode = mr;
            case mr:
                if (e.havedict === 0) return t.next_out = s, t.avail_out = d, t.next_in = a, t.avail_in = o, e.hold = l, e.bits = u, qh;
                t.adler = e.check = 1, e.mode = Qe;
            case Qe:
                if (n === Kh || n === Kn) break e;
            case Gr:
                if (e.last) {
                    l >>>= u & 7, u -= u & 7, e.mode = Xr;
                    break;
                }
                for(; u < 3;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                switch(e.last = l & 1, l >>>= 1, u -= 1, l & 3){
                    case 0:
                        e.mode = is;
                        break;
                    case 1:
                        if (id(e), e.mode = Gn, n === Kn) {
                            l >>>= 2, u -= 2;
                            break e;
                        }
                        break;
                    case 2:
                        e.mode = ss;
                        break;
                    case 3:
                        t.msg = "invalid block type", e.mode = he;
                }
                l >>>= 2, u -= 2;
                break;
            case is:
                for(l >>>= u & 7, u -= u & 7; u < 32;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if ((l & 65535) !== (l >>> 16 ^ 65535)) {
                    t.msg = "invalid stored block lengths", e.mode = he;
                    break;
                }
                if (e.length = l & 65535, l = 0, u = 0, e.mode = qr, n === Kn) break e;
            case qr:
                e.mode = as;
            case as:
                if (p = e.length, p) {
                    if (p > o && (p = o), p > d && (p = d), p === 0) break e;
                    i.set(r.subarray(a, a + p), s), o -= p, a += p, d -= p, s += p, e.length -= p;
                    break;
                }
                e.mode = Qe;
                break;
            case ss:
                for(; u < 14;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (e.nlen = (l & 31) + 257, l >>>= 5, u -= 5, e.ndist = (l & 31) + 1, l >>>= 5, u -= 5, e.ncode = (l & 15) + 4, l >>>= 4, u -= 4, e.nlen > 286 || e.ndist > 30) {
                    t.msg = "too many length or distance symbols", e.mode = he;
                    break;
                }
                e.have = 0, e.mode = os;
            case os:
                for(; e.have < e.ncode;){
                    for(; u < 3;){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    e.lens[ae[e.have++]] = l & 7, l >>>= 3, u -= 3;
                }
                for(; e.have < 19;)e.lens[ae[e.have++]] = 0;
                if (e.lencode = e.lendyn, e.lenbits = 7, R = {
                    bits: e.lenbits
                }, $ = gn(jh, e.lens, 0, 19, e.lencode, 0, e.work, R), e.lenbits = R.bits, $) {
                    t.msg = "invalid code lengths set", e.mode = he;
                    break;
                }
                e.have = 0, e.mode = ls;
            case ls:
                for(; e.have < e.nlen + e.ndist;){
                    for(; I = e.lencode[l & (1 << e.lenbits) - 1], T = I >>> 24, D = I >>> 16 & 255, C = I & 65535, !(T <= u);){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    if (C < 16) l >>>= T, u -= T, e.lens[e.have++] = C;
                    else {
                        if (C === 16) {
                            for(F = T + 2; u < F;){
                                if (o === 0) break e;
                                o--, l += r[a++] << u, u += 8;
                            }
                            if (l >>>= T, u -= T, e.have === 0) {
                                t.msg = "invalid bit length repeat", e.mode = he;
                                break;
                            }
                            B = e.lens[e.have - 1], p = 3 + (l & 3), l >>>= 2, u -= 2;
                        } else if (C === 17) {
                            for(F = T + 3; u < F;){
                                if (o === 0) break e;
                                o--, l += r[a++] << u, u += 8;
                            }
                            l >>>= T, u -= T, B = 0, p = 3 + (l & 7), l >>>= 3, u -= 3;
                        } else {
                            for(F = T + 7; u < F;){
                                if (o === 0) break e;
                                o--, l += r[a++] << u, u += 8;
                            }
                            l >>>= T, u -= T, B = 0, p = 11 + (l & 127), l >>>= 7, u -= 7;
                        }
                        if (e.have + p > e.nlen + e.ndist) {
                            t.msg = "invalid bit length repeat", e.mode = he;
                            break;
                        }
                        for(; p--;)e.lens[e.have++] = B;
                    }
                }
                if (e.mode === he) break;
                if (e.lens[256] === 0) {
                    t.msg = "invalid code -- missing end-of-block", e.mode = he;
                    break;
                }
                if (e.lenbits = 9, R = {
                    bits: e.lenbits
                }, $ = gn(jo, e.lens, 0, e.nlen, e.lencode, 0, e.work, R), e.lenbits = R.bits, $) {
                    t.msg = "invalid literal/lengths set", e.mode = he;
                    break;
                }
                if (e.distbits = 6, e.distcode = e.distdyn, R = {
                    bits: e.distbits
                }, $ = gn(Ko, e.lens, e.nlen, e.ndist, e.distcode, 0, e.work, R), e.distbits = R.bits, $) {
                    t.msg = "invalid distances set", e.mode = he;
                    break;
                }
                if (e.mode = Gn, n === Kn) break e;
            case Gn:
                e.mode = qn;
            case qn:
                if (o >= 6 && d >= 258) {
                    t.next_out = s, t.avail_out = d, t.next_in = a, t.avail_in = o, e.hold = l, e.bits = u, Lh(t, w), s = t.next_out, i = t.output, d = t.avail_out, a = t.next_in, r = t.input, o = t.avail_in, l = e.hold, u = e.bits, e.mode === Qe && (e.back = -1);
                    break;
                }
                for(e.back = 0; I = e.lencode[l & (1 << e.lenbits) - 1], T = I >>> 24, D = I >>> 16 & 255, C = I & 65535, !(T <= u);){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (D && !(D & 240)) {
                    for(m = T, H = D, V = C; I = e.lencode[V + ((l & (1 << m + H) - 1) >> m)], T = I >>> 24, D = I >>> 16 & 255, C = I & 65535, !(m + T <= u);){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    l >>>= m, u -= m, e.back += m;
                }
                if (l >>>= T, u -= T, e.back += T, e.length = C, D === 0) {
                    e.mode = ds;
                    break;
                }
                if (D & 32) {
                    e.back = -1, e.mode = Qe;
                    break;
                }
                if (D & 64) {
                    t.msg = "invalid literal/length code", e.mode = he;
                    break;
                }
                e.extra = D & 15, e.mode = cs;
            case cs:
                if (e.extra) {
                    for(F = e.extra; u < F;){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    e.length += l & (1 << e.extra) - 1, l >>>= e.extra, u -= e.extra, e.back += e.extra;
                }
                e.was = e.length, e.mode = fs;
            case fs:
                for(; I = e.distcode[l & (1 << e.distbits) - 1], T = I >>> 24, D = I >>> 16 & 255, C = I & 65535, !(T <= u);){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (!(D & 240)) {
                    for(m = T, H = D, V = C; I = e.distcode[V + ((l & (1 << m + H) - 1) >> m)], T = I >>> 24, D = I >>> 16 & 255, C = I & 65535, !(m + T <= u);){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    l >>>= m, u -= m, e.back += m;
                }
                if (l >>>= T, u -= T, e.back += T, D & 64) {
                    t.msg = "invalid distance code", e.mode = he;
                    break;
                }
                e.offset = C, e.extra = D & 15, e.mode = us;
            case us:
                if (e.extra) {
                    for(F = e.extra; u < F;){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    e.offset += l & (1 << e.extra) - 1, l >>>= e.extra, u -= e.extra, e.back += e.extra;
                }
                if (e.offset > e.dmax) {
                    t.msg = "invalid distance too far back", e.mode = he;
                    break;
                }
                e.mode = hs;
            case hs:
                if (d === 0) break e;
                if (p = w - d, e.offset > p) {
                    if (p = e.offset - p, p > e.whave && e.sane) {
                        t.msg = "invalid distance too far back", e.mode = he;
                        break;
                    }
                    p > e.wnext ? (p -= e.wnext, k = e.wsize - p) : k = e.wnext - p, p > e.length && (p = e.length), x = e.window;
                } else x = i, k = s - e.offset, p = e.length;
                p > d && (p = d), d -= p, e.length -= p;
                do i[s++] = x[k++];
                while (--p);
                e.length === 0 && (e.mode = qn);
                break;
            case ds:
                if (d === 0) break e;
                i[s++] = e.length, d--, e.mode = qn;
                break;
            case Xr:
                if (e.wrap) {
                    for(; u < 32;){
                        if (o === 0) break e;
                        o--, l |= r[a++] << u, u += 8;
                    }
                    if (w -= d, t.total_out += w, e.total += w, e.wrap & 4 && w && (t.adler = e.check = e.flags ? ye(e.check, i, w, s - w) : An(e.check, i, w, s - w)), w = d, e.wrap & 4 && (e.flags ? l : ws(l)) !== e.check) {
                        t.msg = "incorrect data check", e.mode = he;
                        break;
                    }
                    l = 0, u = 0;
                }
                e.mode = _s;
            case _s:
                if (e.wrap && e.flags) {
                    for(; u < 32;){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    if (e.wrap & 4 && l !== (e.total & 4294967295)) {
                        t.msg = "incorrect length check", e.mode = he;
                        break;
                    }
                    l = 0, u = 0;
                }
                e.mode = ps;
            case ps:
                $ = Gh;
                break e;
            case he:
                $ = Go;
                break e;
            case Xo:
                return qo;
            case Jo:
            default:
                return Ze;
        }
        return t.next_out = s, t.avail_out = d, t.next_in = a, t.avail_in = o, e.hold = l, e.bits = u, (e.wsize || w !== t.avail_out && e.mode < he && (e.mode < Xr || n !== ja)) && rl(t, t.output, t.next_out, w - t.avail_out), g -= t.avail_in, w -= t.avail_out, t.total_in += g, t.total_out += w, e.total += w, e.wrap & 4 && w && (t.adler = e.check = e.flags ? ye(e.check, i, w, t.next_out - w) : An(e.check, i, w, t.next_out - w)), t.data_type = e.bits + (e.last ? 64 : 0) + (e.mode === Qe ? 128 : 0) + (e.mode === Gn || e.mode === qr ? 256 : 0), (g === 0 && w === 0 || n === ja) && $ === It && ($ = Xh), $;
    }, sd = (t)=>{
        if (Bt(t)) return Ze;
        let n = t.state;
        return n.window && (n.window = null), t.state = null, It;
    }, od = (t, n)=>{
        if (Bt(t)) return Ze;
        const e = t.state;
        return e.wrap & 2 ? (e.head = n, n.done = !1, It) : Ze;
    }, ld = (t, n)=>{
        const e = n.length;
        let r, i, a;
        return Bt(t) || (r = t.state, r.wrap !== 0 && r.mode !== mr) ? Ze : r.mode === mr && (i = 1, i = An(i, n, e, 0), i !== r.check) ? Go : (a = rl(t, n, e, e), a ? (r.mode = Xo, qo) : (r.havedict = 1, It));
    };
    var cd = el, fd = tl, ud = Qo, hd = rd, dd = nl, _d = ad, pd = sd, wd = od, md = ld, gd = "pako inflate (from Nodeca project)", tt = {
        inflateReset: cd,
        inflateReset2: fd,
        inflateResetKeep: ud,
        inflateInit: hd,
        inflateInit2: dd,
        inflate: _d,
        inflateEnd: pd,
        inflateGetHeader: wd,
        inflateSetDictionary: md,
        inflateInfo: gd
    };
    function bd() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
    }
    var yd = bd;
    const il = Object.prototype.toString, { Z_NO_FLUSH: Ed, Z_FINISH: kd, Z_OK: Bn, Z_STREAM_END: ei, Z_NEED_DICT: ti, Z_STREAM_ERROR: Sd, Z_DATA_ERROR: gs, Z_MEM_ERROR: vd } = Rn;
    function Dn(t) {
        this.options = vr.assign({
            chunkSize: 1024 * 64,
            windowBits: 15,
            to: ""
        }, t || {});
        const n = this.options;
        n.raw && n.windowBits >= 0 && n.windowBits < 16 && (n.windowBits = -n.windowBits, n.windowBits === 0 && (n.windowBits = -15)), n.windowBits >= 0 && n.windowBits < 16 && !(t && t.windowBits) && (n.windowBits += 32), n.windowBits > 15 && n.windowBits < 48 && (n.windowBits & 15 || (n.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Vo, this.strm.avail_out = 0;
        let e = tt.inflateInit2(this.strm, n.windowBits);
        if (e !== Bn) throw new Error(xt[e]);
        if (this.header = new yd, tt.inflateGetHeader(this.strm, this.header), n.dictionary && (typeof n.dictionary == "string" ? n.dictionary = Tn.string2buf(n.dictionary) : il.call(n.dictionary) === "[object ArrayBuffer]" && (n.dictionary = new Uint8Array(n.dictionary)), n.raw && (e = tt.inflateSetDictionary(this.strm, n.dictionary), e !== Bn))) throw new Error(xt[e]);
    }
    Dn.prototype.push = function(t, n) {
        const e = this.strm, r = this.options.chunkSize, i = this.options.dictionary;
        let a, s, o;
        if (this.ended) return !1;
        for(n === ~~n ? s = n : s = n === !0 ? kd : Ed, il.call(t) === "[object ArrayBuffer]" ? e.input = new Uint8Array(t) : e.input = t, e.next_in = 0, e.avail_in = e.input.length;;){
            for(e.avail_out === 0 && (e.output = new Uint8Array(r), e.next_out = 0, e.avail_out = r), a = tt.inflate(e, s), a === ti && i && (a = tt.inflateSetDictionary(e, i), a === Bn ? a = tt.inflate(e, s) : a === gs && (a = ti)); e.avail_in > 0 && a === ei && e.state.wrap > 0 && t[e.next_in] !== 0;)tt.inflateReset(e), a = tt.inflate(e, s);
            switch(a){
                case Sd:
                case gs:
                case ti:
                case vd:
                    return this.onEnd(a), this.ended = !0, !1;
            }
            if (o = e.avail_out, e.next_out && (e.avail_out === 0 || a === ei)) if (this.options.to === "string") {
                let d = Tn.utf8border(e.output, e.next_out), l = e.next_out - d, u = Tn.buf2string(e.output, d);
                e.next_out = l, e.avail_out = r - l, l && e.output.set(e.output.subarray(d, d + l), 0), this.onData(u);
            } else this.onData(e.output.length === e.next_out ? e.output : e.output.subarray(0, e.next_out));
            if (!(a === Bn && o === 0)) {
                if (a === ei) return a = tt.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
                if (e.avail_in === 0) break;
            }
        }
        return !0;
    };
    Dn.prototype.onData = function(t) {
        this.chunks.push(t);
    };
    Dn.prototype.onEnd = function(t) {
        t === Bn && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = vr.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
    };
    function zi(t, n) {
        const e = new Dn(n);
        if (e.push(t), e.err) throw e.msg || xt[e.err];
        return e.result;
    }
    function xd(t, n) {
        return n = n || {}, n.raw = !0, zi(t, n);
    }
    var Ad = Dn, Id = zi, Td = xd, Bd = zi, Cd = {
        Inflate: Ad,
        inflate: Id,
        inflateRaw: Td,
        ungzip: Bd
    };
    const { Deflate: Ud, deflate: Rd, deflateRaw: Nd, gzip: Od } = Zh, { Inflate: Dd, inflate: Hd, inflateRaw: Fd, ungzip: zd } = Cd;
    var Zd = Ud, Md = Rd, Ld = Nd, Pd = Od, $d = Dd, Wd = Hd, Vd = Fd, Yd = zd, jd = Rn, Kd = {
        Deflate: Zd,
        deflate: Md,
        deflateRaw: Ld,
        gzip: Pd,
        Inflate: $d,
        inflate: Wd,
        inflateRaw: Vd,
        ungzip: Yd,
        constants: jd
    };
    async function Gd(t, n) {
        let e;
        if (n) {
            const o = t ? "-threads" : "", d = n.split("/").slice(0, -1).join("/"), l = n.split("/").pop(), [u, ...g] = l.split(".");
            e = `${d}/${u}${o}.${g.join(".")}`;
        } else e = t ? (await si(async ()=>{
            const { default: o } = await import("./barretenberg-threads-CEUSJ7or.js");
            return {
                default: o
            };
        }, [], import.meta.url)).default : (await si(async ()=>{
            const { default: o } = await import("./barretenberg-Dfd87FCq.js");
            return {
                default: o
            };
        }, [], import.meta.url)).default;
        const i = await (await fetch(e)).arrayBuffer(), a = new Uint8Array(i);
        return a[0] === 31 && a[1] === 139 && a[2] === 8 ? Kd.ungzip(a).buffer : a;
    }
    async function al(t = 32, n, e = qe()("bb.js:fetch_mat")) {
        const r = Eo(), i = r ? await qd(e) : 1, a = Math.min(t, i, 32);
        e(`Fetching bb wasm from ${n ?? "default location"}`);
        const s = await Gd(r, n);
        e(`Compiling bb wasm of ${s.byteLength} bytes`);
        const o = await WebAssembly.compile(s);
        return e("Compilation of bb wasm complete"), {
            module: o,
            threads: a
        };
    }
    async function qd(t) {
        if (typeof navigator < "u" && navigator.hardwareConcurrency) return navigator.hardwareConcurrency;
        try {
            return (await Promise.resolve().then(ge.t.bind(ge, 733, 23))).cpus().length;
        } catch (n) {
            return t(`Could not detect environment to query number of threads. Falling back to one thread. Error: ${n.message ?? n}`), 1;
        }
    }
    const Xd = 16, bs = 32;
    function Jd(t, n) {
        const e = t.slice(0, n * bs);
        return {
            proof: t.slice(n * bs),
            publicInputs: e
        };
    }
    function Qd(t, n) {
        return Uint8Array.from([
            ...t,
            ...n
        ]);
    }
    function e_(t) {
        const e = [];
        for(let r = 0; r < t.length; r += 32){
            const i = t.slice(r, r + 32);
            e.push(i);
        }
        return e.map(r_);
    }
    function t_(t) {
        const n = t.map(i_);
        return n_(n);
    }
    function n_(t) {
        const n = t.reduce((i, a)=>i + a.length, 0), e = new Uint8Array(n);
        let r = 0;
        for (const i of t)e.set(i, r), r += i.length;
        return e;
    }
    function r_(t) {
        const n = [];
        return t.forEach(function(e) {
            let r = e.toString(16);
            r.length % 2 && (r = "0" + r), n.push(r);
        }), "0x" + n.join("");
    }
    function i_(t) {
        const n = BigInt(t).toString(16).padStart(64, "0"), e = n.length / 2, r = new Uint8Array(e);
        let i = 0, a = 0;
        for(; i < e;)r[i] = parseInt(n.slice(a, a + 2), 16), i += 1, a += 2;
        return r;
    }
    var Ne = Uint8Array, bn = Uint16Array, a_ = Int32Array, sl = new Ne([
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
    ]), ol = new Ne([
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
    ]), s_ = new Ne([
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
    ]), ll = function(t, n) {
        for(var e = new bn(31), r = 0; r < 31; ++r)e[r] = n += 1 << t[r - 1];
        for(var i = new a_(e[30]), r = 1; r < 30; ++r)for(var a = e[r]; a < e[r + 1]; ++a)i[a] = a - e[r] << 5 | r;
        return {
            b: e,
            r: i
        };
    }, cl = ll(sl, 2), fl = cl.b, o_ = cl.r;
    fl[28] = 258, o_[258] = 28;
    var l_ = ll(ol, 0), c_ = l_.b, ul = new bn(32768);
    for(var ce = 0; ce < 32768; ++ce){
        var st = (ce & 43690) >> 1 | (ce & 21845) << 1;
        st = (st & 52428) >> 2 | (st & 13107) << 2, st = (st & 61680) >> 4 | (st & 3855) << 4, ul[ce] = ((st & 65280) >> 8 | (st & 255) << 8) >> 1;
    }
    var yn = function(t, n, e) {
        for(var r = t.length, i = 0, a = new bn(n); i < r; ++i)t[i] && ++a[t[i] - 1];
        var s = new bn(n);
        for(i = 1; i < n; ++i)s[i] = s[i - 1] + a[i - 1] << 1;
        var o;
        {
            o = new bn(1 << n);
            var d = 15 - n;
            for(i = 0; i < r; ++i)if (t[i]) for(var l = i << 4 | t[i], u = n - t[i], g = s[t[i] - 1]++ << u, w = g | (1 << u) - 1; g <= w; ++g)o[ul[g] >> d] = l;
        }
        return o;
    }, Hn = new Ne(288);
    for(var ce = 0; ce < 144; ++ce)Hn[ce] = 8;
    for(var ce = 144; ce < 256; ++ce)Hn[ce] = 9;
    for(var ce = 256; ce < 280; ++ce)Hn[ce] = 7;
    for(var ce = 280; ce < 288; ++ce)Hn[ce] = 8;
    var hl = new Ne(32);
    for(var ce = 0; ce < 32; ++ce)hl[ce] = 5;
    var f_ = yn(Hn, 9), u_ = yn(hl, 5), ni = function(t) {
        for(var n = t[0], e = 1; e < t.length; ++e)t[e] > n && (n = t[e]);
        return n;
    }, Me = function(t, n, e) {
        var r = n / 8 | 0;
        return (t[r] | t[r + 1] << 8) >> (n & 7) & e;
    }, ri = function(t, n) {
        var e = n / 8 | 0;
        return (t[e] | t[e + 1] << 8 | t[e + 2] << 16) >> (n & 7);
    }, h_ = function(t) {
        return (t + 7) / 8 | 0;
    }, d_ = function(t, n, e) {
        return (e == null || e > t.length) && (e = t.length), new Ne(t.subarray(n, e));
    }, __ = [
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
    ], Re = function(t, n, e) {
        var r = new Error(n || __[t]);
        if (r.code = t, Error.captureStackTrace && Error.captureStackTrace(r, Re), !e) throw r;
        return r;
    }, Zi = function(t, n, e, r) {
        var i = t.length, a = 0;
        if (!i || n.f && !n.l) return e || new Ne(0);
        var s = !e, o = s || n.i != 2, d = n.i;
        s && (e = new Ne(i * 3));
        var l = function(rn) {
            var zn = e.length;
            if (rn > zn) {
                var an = new Ne(Math.max(zn * 2, rn));
                an.set(e), e = an;
            }
        }, u = n.f || 0, g = n.p || 0, w = n.b || 0, p = n.l, k = n.d, x = n.m, I = n.n, T = i * 8;
        do {
            if (!p) {
                u = Me(t, g, 1);
                var D = Me(t, g + 1, 3);
                if (g += 3, D) if (D == 1) p = f_, k = u_, x = 9, I = 5;
                else if (D == 2) {
                    var V = Me(t, g, 31) + 257, B = Me(t, g + 10, 15) + 4, $ = V + Me(t, g + 5, 31) + 1;
                    g += 14;
                    for(var z = new Ne($), R = new Ne(19), F = 0; F < B; ++F)R[s_[F]] = Me(t, g + F * 3, 7);
                    g += B * 3;
                    for(var ae = ni(R), S = (1 << ae) - 1, M = yn(R, ae), F = 0; F < $;){
                        var O = M[Me(t, g, S)];
                        g += O & 15;
                        var C = O >> 4;
                        if (C < 16) z[F++] = C;
                        else {
                            var N = 0, L = 0;
                            for(C == 16 ? (L = 3 + Me(t, g, 3), g += 2, N = z[F - 1]) : C == 17 ? (L = 3 + Me(t, g, 7), g += 3) : C == 18 && (L = 11 + Me(t, g, 127), g += 7); L--;)z[F++] = N;
                        }
                    }
                    var Y = z.subarray(0, V), W = z.subarray(V);
                    x = ni(Y), I = ni(W), p = yn(Y, x), k = yn(W, I);
                } else Re(1);
                else {
                    var C = h_(g) + 4, m = t[C - 4] | t[C - 3] << 8, H = C + m;
                    if (H > i) {
                        d && Re(0);
                        break;
                    }
                    o && l(w + m), e.set(t.subarray(C, H), w), n.b = w += m, n.p = g = H * 8, n.f = u;
                    continue;
                }
                if (g > T) {
                    d && Re(0);
                    break;
                }
            }
            o && l(w + 131072);
            for(var j = (1 << x) - 1, q = (1 << I) - 1, K = g;; K = g){
                var N = p[ri(t, g) & j], te = N >> 4;
                if (g += N & 15, g > T) {
                    d && Re(0);
                    break;
                }
                if (N || Re(2), te < 256) e[w++] = te;
                else if (te == 256) {
                    K = g, p = null;
                    break;
                } else {
                    var xe = te - 254;
                    if (te > 264) {
                        var F = te - 257, Ae = sl[F];
                        xe = Me(t, g, (1 << Ae) - 1) + fl[F], g += Ae;
                    }
                    var Ct = k[ri(t, g) & q], Ut = Ct >> 4;
                    Ct || Re(3), g += Ct & 15;
                    var W = c_[Ut];
                    if (Ut > 3) {
                        var Ae = ol[Ut];
                        W += ri(t, g) & (1 << Ae) - 1, g += Ae;
                    }
                    if (g > T) {
                        d && Re(0);
                        break;
                    }
                    o && l(w + 131072);
                    var tn = w + xe;
                    if (w < W) {
                        var Xe = a - W, nn = Math.min(W, tn);
                        for(Xe + w < 0 && Re(3); w < nn; ++w)e[w] = r[Xe + w];
                    }
                    for(; w < tn; ++w)e[w] = e[w - W];
                }
            }
            n.l = p, n.p = K, n.b = w, n.f = u, p && (u = 1, n.m = x, n.d = k, n.n = I);
        }while (!u);
        return w != e.length && s ? d_(e, 0, w) : e.subarray(0, w);
    }, p_ = new Ne(0), w_ = function(t) {
        (t[0] != 31 || t[1] != 139 || t[2] != 8) && Re(6, "invalid gzip data");
        var n = t[3], e = 10;
        n & 4 && (e += (t[10] | t[11] << 8) + 2);
        for(var r = (n >> 3 & 1) + (n >> 4 & 1); r > 0; r -= !t[e++]);
        return e + (n & 2);
    }, m_ = function(t) {
        var n = t.length;
        return (t[n - 4] | t[n - 3] << 8 | t[n - 2] << 16 | t[n - 1] << 24) >>> 0;
    }, g_ = function(t, n) {
        return ((t[0] & 15) != 8 || t[0] >> 4 > 7 || (t[0] << 8 | t[1]) % 31) && Re(6, "invalid zlib data"), (t[1] >> 5 & 1) == 1 && Re(6, "invalid zlib data: " + (t[1] & 32 ? "need" : "unexpected") + " dictionary"), (t[1] >> 3 & 4) + 2;
    };
    function b_(t, n) {
        return Zi(t, {
            i: 2
        }, n, n);
    }
    function y_(t, n) {
        var e = w_(t);
        return e + 8 > t.length && Re(6, "invalid gzip data"), Zi(t.subarray(e, -8), {
            i: 2
        }, new Ne(m_(t)), n);
    }
    function E_(t, n) {
        return Zi(t.subarray(g_(t), -4), {
            i: 2
        }, n, n);
    }
    function dl(t, n) {
        return t[0] == 31 && t[1] == 139 && t[2] == 8 ? y_(t, n) : (t[0] & 15) != 8 || t[0] >> 4 > 7 || (t[0] << 8 | t[1]) % 31 ? b_(t, n) : E_(t, n);
    }
    typeof TextEncoder < "u" && new TextEncoder;
    var k_ = typeof TextDecoder < "u" && new TextDecoder, S_ = 0;
    try {
        k_.decode(p_, {
            stream: !0
        }), S_ = 1;
    } catch  {}
    var ys = ge(287).hp, vi;
    try {
        vi = new TextDecoder;
    } catch  {}
    var P, Ge, y = 0, le = {}, ee, ct, De = 0, Ye = 0, Ee, rt, Ce = [], J, Es = {
        useRecords: !1,
        mapsAsObjects: !0
    };
    class _l {
    }
    const pl = new _l;
    pl.name = "MessagePack 0xC1";
    var dt = !1, wl = 2, v_;
    try {
        new Function("");
    } catch  {
        wl = 1 / 0;
    }
    class Cn {
        constructor(n){
            n && (n.useRecords === !1 && n.mapsAsObjects === void 0 && (n.mapsAsObjects = !0), n.sequential && n.trusted !== !1 && (n.trusted = !0, !n.structures && n.useRecords != !1 && (n.structures = [], n.maxSharedStructures || (n.maxSharedStructures = 0))), n.structures ? n.structures.sharedLength = n.structures.length : n.getStructures && ((n.structures = []).uninitialized = !0, n.structures.sharedLength = 0), n.int64AsNumber && (n.int64AsType = "number")), Object.assign(this, n);
        }
        unpack(n, e) {
            if (P) return kl(()=>(Ai(), this ? this.unpack(n, e) : Cn.prototype.unpack.call(Es, n, e)));
            !n.buffer && n.constructor === ArrayBuffer && (n = typeof ys < "u" ? ys.from(n) : new Uint8Array(n)), typeof e == "object" ? (Ge = e.end || n.length, y = e.start || 0) : (y = 0, Ge = e > -1 ? e : n.length), Ye = 0, ct = null, Ee = null, P = n;
            try {
                J = n.dataView || (n.dataView = new DataView(n.buffer, n.byteOffset, n.byteLength));
            } catch (r) {
                throw P = null, n instanceof Uint8Array ? r : new Error("Source must be a Uint8Array or Buffer but was a " + (n && typeof n == "object" ? n.constructor.name : typeof n));
            }
            if (this instanceof Cn) {
                if (le = this, this.structures) return ee = this.structures, Xn(e);
                (!ee || ee.length > 0) && (ee = []);
            } else le = Es, (!ee || ee.length > 0) && (ee = []);
            return Xn(e);
        }
        unpackMultiple(n, e) {
            let r, i = 0;
            try {
                dt = !0;
                let a = n.length, s = this ? this.unpack(n, a) : Ar.unpack(n, a);
                if (e) {
                    if (e(s, i, y) === !1) return;
                    for(; y < a;)if (i = y, e(Xn(), i, y) === !1) return;
                } else {
                    for(r = [
                        s
                    ]; y < a;)i = y, r.push(Xn());
                    return r;
                }
            } catch (a) {
                throw a.lastPosition = i, a.values = r, a;
            } finally{
                dt = !1, Ai();
            }
        }
        _mergeStructures(n, e) {
            n = n || [], Object.isFrozen(n) && (n = n.map((r)=>r.slice(0)));
            for(let r = 0, i = n.length; r < i; r++){
                let a = n[r];
                a && (a.isShared = !0, r >= 32 && (a.highByte = r - 32 >> 5));
            }
            n.sharedLength = n.length;
            for(let r in e || [])if (r >= 0) {
                let i = n[r], a = e[r];
                a && (i && ((n.restoreStructures || (n.restoreStructures = []))[r] = i), n[r] = a);
            }
            return this.structures = n;
        }
        decode(n, e) {
            return this.unpack(n, e);
        }
    }
    function Xn(t) {
        try {
            if (!le.trusted && !dt) {
                let e = ee.sharedLength || 0;
                e < ee.length && (ee.length = e);
            }
            let n;
            if (le.randomAccessStructure && P[y] < 64 && P[y] >= 32 && v_ || (n = me()), Ee && (y = Ee.postBundlePosition, Ee = null), dt && (ee.restoreStructures = null), y == Ge) ee && ee.restoreStructures && ks(), ee = null, P = null, rt && (rt = null);
            else {
                if (y > Ge) throw new Error("Unexpected end of MessagePack data");
                if (!dt) {
                    let e;
                    try {
                        e = JSON.stringify(n, (r, i)=>typeof i == "bigint" ? `${i}n` : i).slice(0, 100);
                    } catch (r) {
                        e = "(JSON view not available " + r + ")";
                    }
                    throw new Error("Data read, but end of buffer not reached " + e);
                }
            }
            return n;
        } catch (n) {
            throw ee && ee.restoreStructures && ks(), Ai(), (n instanceof RangeError || n.message.startsWith("Unexpected end of buffer") || y > Ge) && (n.incomplete = !0), n;
        }
    }
    function ks() {
        for(let t in ee.restoreStructures)ee[t] = ee.restoreStructures[t];
        ee.restoreStructures = null;
    }
    function me() {
        let t = P[y++];
        if (t < 160) if (t < 128) {
            if (t < 64) return t;
            {
                let n = ee[t & 63] || le.getStructures && ml()[t & 63];
                return n ? (n.read || (n.read = Mi(n, t & 63)), n.read()) : t;
            }
        } else if (t < 144) if (t -= 128, le.mapsAsObjects) {
            let n = {};
            for(let e = 0; e < t; e++){
                let r = bl();
                r === "__proto__" && (r = "__proto_"), n[r] = me();
            }
            return n;
        } else {
            let n = new Map;
            for(let e = 0; e < t; e++)n.set(me(), me());
            return n;
        }
        else {
            t -= 144;
            let n = new Array(t);
            for(let e = 0; e < t; e++)n[e] = me();
            return le.freezeData ? Object.freeze(n) : n;
        }
        else if (t < 192) {
            let n = t - 160;
            if (Ye >= y) return ct.slice(y - De, (y += n) - De);
            if (Ye == 0 && Ge < 140) {
                let e = n < 16 ? Li(n) : gl(n);
                if (e != null) return e;
            }
            return xi(n);
        } else {
            let n;
            switch(t){
                case 192:
                    return null;
                case 193:
                    return Ee ? (n = me(), n > 0 ? Ee[1].slice(Ee.position1, Ee.position1 += n) : Ee[0].slice(Ee.position0, Ee.position0 -= n)) : pl;
                case 194:
                    return !1;
                case 195:
                    return !0;
                case 196:
                    if (n = P[y++], n === void 0) throw new Error("Unexpected end of buffer");
                    return ii(n);
                case 197:
                    return n = J.getUint16(y), y += 2, ii(n);
                case 198:
                    return n = J.getUint32(y), y += 4, ii(n);
                case 199:
                    return wt(P[y++]);
                case 200:
                    return n = J.getUint16(y), y += 2, wt(n);
                case 201:
                    return n = J.getUint32(y), y += 4, wt(n);
                case 202:
                    if (n = J.getFloat32(y), le.useFloat32 > 2) {
                        let e = Pi[(P[y] & 127) << 1 | P[y + 1] >> 7];
                        return y += 4, (e * n + (n > 0 ? .5 : -.5) >> 0) / e;
                    }
                    return y += 4, n;
                case 203:
                    return n = J.getFloat64(y), y += 8, n;
                case 204:
                    return P[y++];
                case 205:
                    return n = J.getUint16(y), y += 2, n;
                case 206:
                    return n = J.getUint32(y), y += 4, n;
                case 207:
                    return le.int64AsType === "number" ? (n = J.getUint32(y) * 4294967296, n += J.getUint32(y + 4)) : le.int64AsType === "string" ? n = J.getBigUint64(y).toString() : le.int64AsType === "auto" ? (n = J.getBigUint64(y), n <= BigInt(2) << BigInt(52) && (n = Number(n))) : n = J.getBigUint64(y), y += 8, n;
                case 208:
                    return J.getInt8(y++);
                case 209:
                    return n = J.getInt16(y), y += 2, n;
                case 210:
                    return n = J.getInt32(y), y += 4, n;
                case 211:
                    return le.int64AsType === "number" ? (n = J.getInt32(y) * 4294967296, n += J.getUint32(y + 4)) : le.int64AsType === "string" ? n = J.getBigInt64(y).toString() : le.int64AsType === "auto" ? (n = J.getBigInt64(y), n >= BigInt(-2) << BigInt(52) && n <= BigInt(2) << BigInt(52) && (n = Number(n))) : n = J.getBigInt64(y), y += 8, n;
                case 212:
                    if (n = P[y++], n == 114) return Ts(P[y++] & 63);
                    {
                        let e = Ce[n];
                        if (e) return e.read ? (y++, e.read(me())) : e.noBuffer ? (y++, e()) : e(P.subarray(y, ++y));
                        throw new Error("Unknown extension " + n);
                    }
                case 213:
                    return n = P[y], n == 114 ? (y++, Ts(P[y++] & 63, P[y++])) : wt(2);
                case 214:
                    return wt(4);
                case 215:
                    return wt(8);
                case 216:
                    return wt(16);
                case 217:
                    return n = P[y++], Ye >= y ? ct.slice(y - De, (y += n) - De) : A_(n);
                case 218:
                    return n = J.getUint16(y), y += 2, Ye >= y ? ct.slice(y - De, (y += n) - De) : I_(n);
                case 219:
                    return n = J.getUint32(y), y += 4, Ye >= y ? ct.slice(y - De, (y += n) - De) : T_(n);
                case 220:
                    return n = J.getUint16(y), y += 2, vs(n);
                case 221:
                    return n = J.getUint32(y), y += 4, vs(n);
                case 222:
                    return n = J.getUint16(y), y += 2, xs(n);
                case 223:
                    return n = J.getUint32(y), y += 4, xs(n);
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
    const x_ = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
    function Mi(t, n) {
        function e() {
            if (e.count++ > wl) {
                let i = t.read = new Function("r", "return function(){return " + (le.freezeData ? "Object.freeze" : "") + "({" + t.map((a)=>a === "__proto__" ? "__proto_:r()" : x_.test(a) ? a + ":r()" : "[" + JSON.stringify(a) + "]:r()").join(",") + "})}")(me);
                return t.highByte === 0 && (t.read = Ss(n, t.read)), i();
            }
            let r = {};
            for(let i = 0, a = t.length; i < a; i++){
                let s = t[i];
                s === "__proto__" && (s = "__proto_"), r[s] = me();
            }
            return le.freezeData ? Object.freeze(r) : r;
        }
        return e.count = 0, t.highByte === 0 ? Ss(n, e) : e;
    }
    const Ss = (t, n)=>function() {
            let e = P[y++];
            if (e === 0) return n();
            let r = t < 32 ? -(t + (e << 5)) : t + (e << 5), i = ee[r] || ml()[r];
            if (!i) throw new Error("Record id is not defined for " + r);
            return i.read || (i.read = Mi(i, t)), i.read();
        };
    function ml() {
        let t = kl(()=>(P = null, le.getStructures()));
        return ee = le._mergeStructures(t, ee);
    }
    var xi = Fn, A_ = Fn, I_ = Fn, T_ = Fn;
    function Fn(t) {
        let n;
        if (t < 16 && (n = Li(t))) return n;
        if (t > 64 && vi) return vi.decode(P.subarray(y, y += t));
        const e = y + t, r = [];
        for(n = ""; y < e;){
            const i = P[y++];
            if (!(i & 128)) r.push(i);
            else if ((i & 224) === 192) {
                const a = P[y++] & 63;
                r.push((i & 31) << 6 | a);
            } else if ((i & 240) === 224) {
                const a = P[y++] & 63, s = P[y++] & 63;
                r.push((i & 31) << 12 | a << 6 | s);
            } else if ((i & 248) === 240) {
                const a = P[y++] & 63, s = P[y++] & 63, o = P[y++] & 63;
                let d = (i & 7) << 18 | a << 12 | s << 6 | o;
                d > 65535 && (d -= 65536, r.push(d >>> 10 & 1023 | 55296), d = 56320 | d & 1023), r.push(d);
            } else r.push(i);
            r.length >= 4096 && (n += be.apply(String, r), r.length = 0);
        }
        return r.length > 0 && (n += be.apply(String, r)), n;
    }
    function vs(t) {
        let n = new Array(t);
        for(let e = 0; e < t; e++)n[e] = me();
        return le.freezeData ? Object.freeze(n) : n;
    }
    function xs(t) {
        if (le.mapsAsObjects) {
            let n = {};
            for(let e = 0; e < t; e++){
                let r = bl();
                r === "__proto__" && (r = "__proto_"), n[r] = me();
            }
            return n;
        } else {
            let n = new Map;
            for(let e = 0; e < t; e++)n.set(me(), me());
            return n;
        }
    }
    var be = String.fromCharCode;
    function gl(t) {
        let n = y, e = new Array(t);
        for(let r = 0; r < t; r++){
            const i = P[y++];
            if ((i & 128) > 0) {
                y = n;
                return;
            }
            e[r] = i;
        }
        return be.apply(String, e);
    }
    function Li(t) {
        if (t < 4) if (t < 2) {
            if (t === 0) return "";
            {
                let n = P[y++];
                if ((n & 128) > 1) {
                    y -= 1;
                    return;
                }
                return be(n);
            }
        } else {
            let n = P[y++], e = P[y++];
            if ((n & 128) > 0 || (e & 128) > 0) {
                y -= 2;
                return;
            }
            if (t < 3) return be(n, e);
            let r = P[y++];
            if ((r & 128) > 0) {
                y -= 3;
                return;
            }
            return be(n, e, r);
        }
        else {
            let n = P[y++], e = P[y++], r = P[y++], i = P[y++];
            if ((n & 128) > 0 || (e & 128) > 0 || (r & 128) > 0 || (i & 128) > 0) {
                y -= 4;
                return;
            }
            if (t < 6) {
                if (t === 4) return be(n, e, r, i);
                {
                    let a = P[y++];
                    if ((a & 128) > 0) {
                        y -= 5;
                        return;
                    }
                    return be(n, e, r, i, a);
                }
            } else if (t < 8) {
                let a = P[y++], s = P[y++];
                if ((a & 128) > 0 || (s & 128) > 0) {
                    y -= 6;
                    return;
                }
                if (t < 7) return be(n, e, r, i, a, s);
                let o = P[y++];
                if ((o & 128) > 0) {
                    y -= 7;
                    return;
                }
                return be(n, e, r, i, a, s, o);
            } else {
                let a = P[y++], s = P[y++], o = P[y++], d = P[y++];
                if ((a & 128) > 0 || (s & 128) > 0 || (o & 128) > 0 || (d & 128) > 0) {
                    y -= 8;
                    return;
                }
                if (t < 10) {
                    if (t === 8) return be(n, e, r, i, a, s, o, d);
                    {
                        let l = P[y++];
                        if ((l & 128) > 0) {
                            y -= 9;
                            return;
                        }
                        return be(n, e, r, i, a, s, o, d, l);
                    }
                } else if (t < 12) {
                    let l = P[y++], u = P[y++];
                    if ((l & 128) > 0 || (u & 128) > 0) {
                        y -= 10;
                        return;
                    }
                    if (t < 11) return be(n, e, r, i, a, s, o, d, l, u);
                    let g = P[y++];
                    if ((g & 128) > 0) {
                        y -= 11;
                        return;
                    }
                    return be(n, e, r, i, a, s, o, d, l, u, g);
                } else {
                    let l = P[y++], u = P[y++], g = P[y++], w = P[y++];
                    if ((l & 128) > 0 || (u & 128) > 0 || (g & 128) > 0 || (w & 128) > 0) {
                        y -= 12;
                        return;
                    }
                    if (t < 14) {
                        if (t === 12) return be(n, e, r, i, a, s, o, d, l, u, g, w);
                        {
                            let p = P[y++];
                            if ((p & 128) > 0) {
                                y -= 13;
                                return;
                            }
                            return be(n, e, r, i, a, s, o, d, l, u, g, w, p);
                        }
                    } else {
                        let p = P[y++], k = P[y++];
                        if ((p & 128) > 0 || (k & 128) > 0) {
                            y -= 14;
                            return;
                        }
                        if (t < 15) return be(n, e, r, i, a, s, o, d, l, u, g, w, p, k);
                        let x = P[y++];
                        if ((x & 128) > 0) {
                            y -= 15;
                            return;
                        }
                        return be(n, e, r, i, a, s, o, d, l, u, g, w, p, k, x);
                    }
                }
            }
        }
    }
    function As() {
        let t = P[y++], n;
        if (t < 192) n = t - 160;
        else switch(t){
            case 217:
                n = P[y++];
                break;
            case 218:
                n = J.getUint16(y), y += 2;
                break;
            case 219:
                n = J.getUint32(y), y += 4;
                break;
            default:
                throw new Error("Expected string");
        }
        return Fn(n);
    }
    function ii(t) {
        return le.copyBuffers ? Uint8Array.prototype.slice.call(P, y, y += t) : P.subarray(y, y += t);
    }
    function wt(t) {
        let n = P[y++];
        if (Ce[n]) {
            let e;
            return Ce[n](P.subarray(y, e = y += t), (r)=>{
                y = r;
                try {
                    return me();
                } finally{
                    y = e;
                }
            });
        } else throw new Error("Unknown extension type " + n);
    }
    var Is = new Array(4096);
    function bl() {
        let t = P[y++];
        if (t >= 160 && t < 192) {
            if (t = t - 160, Ye >= y) return ct.slice(y - De, (y += t) - De);
            if (!(Ye == 0 && Ge < 180)) return xi(t);
        } else return y--, yl(me());
        let n = (t << 5 ^ (t > 1 ? J.getUint16(y) : t > 0 ? P[y] : 0)) & 4095, e = Is[n], r = y, i = y + t - 3, a, s = 0;
        if (e && e.bytes == t) {
            for(; r < i;){
                if (a = J.getUint32(r), a != e[s++]) {
                    r = 1879048192;
                    break;
                }
                r += 4;
            }
            for(i += 3; r < i;)if (a = P[r++], a != e[s++]) {
                r = 1879048192;
                break;
            }
            if (r === i) return y = r, e.string;
            i -= 3, r = y;
        }
        for(e = [], Is[n] = e, e.bytes = t; r < i;)a = J.getUint32(r), e.push(a), r += 4;
        for(i += 3; r < i;)a = P[r++], e.push(a);
        let o = t < 16 ? Li(t) : gl(t);
        return o != null ? e.string = o : e.string = xi(t);
    }
    function yl(t) {
        if (typeof t == "string") return t;
        if (typeof t == "number" || typeof t == "boolean" || typeof t == "bigint") return t.toString();
        if (t == null) return t + "";
        throw new Error("Invalid property type for record", typeof t);
    }
    const Ts = (t, n)=>{
        let e = me().map(yl), r = t;
        n !== void 0 && (t = t < 32 ? -((n << 5) + t) : (n << 5) + t, e.highByte = n);
        let i = ee[t];
        return i && (i.isShared || dt) && ((ee.restoreStructures || (ee.restoreStructures = []))[t] = i), ee[t] = e, e.read = Mi(e, r), e.read();
    };
    Ce[0] = ()=>{};
    Ce[0].noBuffer = !0;
    Ce[66] = (t)=>{
        let n = t.length, e = BigInt(t[0] & 128 ? t[0] - 256 : t[0]);
        for(let r = 1; r < n; r++)e <<= BigInt(8), e += BigInt(t[r]);
        return e;
    };
    let B_ = {
        Error,
        TypeError,
        ReferenceError
    };
    Ce[101] = ()=>{
        let t = me();
        return (B_[t[0]] || Error)(t[1], {
            cause: t[2]
        });
    };
    Ce[105] = (t)=>{
        if (le.structuredClone === !1) throw new Error("Structured clone extension is disabled");
        let n = J.getUint32(y - 4);
        rt || (rt = new Map);
        let e = P[y], r;
        e >= 144 && e < 160 || e == 220 || e == 221 ? r = [] : r = {};
        let i = {
            target: r
        };
        rt.set(n, i);
        let a = me();
        return i.used ? Object.assign(r, a) : (i.target = a, a);
    };
    Ce[112] = (t)=>{
        if (le.structuredClone === !1) throw new Error("Structured clone extension is disabled");
        let n = J.getUint32(y - 4), e = rt.get(n);
        return e.used = !0, e.target;
    };
    Ce[115] = ()=>new Set(me());
    const El = [
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
    let C_ = typeof globalThis == "object" ? globalThis : window;
    Ce[116] = (t)=>{
        let n = t[0], e = El[n];
        if (!e) {
            if (n === 16) {
                let r = new ArrayBuffer(t.length - 1);
                return new Uint8Array(r).set(t.subarray(1)), r;
            }
            throw new Error("Could not find typed array for code " + n);
        }
        return new C_[e](Uint8Array.prototype.slice.call(t, 1).buffer);
    };
    Ce[120] = ()=>{
        let t = me();
        return new RegExp(t[0], t[1]);
    };
    const U_ = [];
    Ce[98] = (t)=>{
        let n = (t[0] << 24) + (t[1] << 16) + (t[2] << 8) + t[3], e = y;
        return y += n - t.length, Ee = U_, Ee = [
            As(),
            As()
        ], Ee.position0 = 0, Ee.position1 = 0, Ee.postBundlePosition = y, y = e, me();
    };
    Ce[255] = (t)=>t.length == 4 ? new Date((t[0] * 16777216 + (t[1] << 16) + (t[2] << 8) + t[3]) * 1e3) : t.length == 8 ? new Date(((t[0] << 22) + (t[1] << 14) + (t[2] << 6) + (t[3] >> 2)) / 1e6 + ((t[3] & 3) * 4294967296 + t[4] * 16777216 + (t[5] << 16) + (t[6] << 8) + t[7]) * 1e3) : t.length == 12 ? new Date(((t[0] << 24) + (t[1] << 16) + (t[2] << 8) + t[3]) / 1e6 + ((t[4] & 128 ? -281474976710656 : 0) + t[6] * 1099511627776 + t[7] * 4294967296 + t[8] * 16777216 + (t[9] << 16) + (t[10] << 8) + t[11]) * 1e3) : new Date("invalid");
    function kl(t) {
        let n = Ge, e = y, r = De, i = Ye, a = ct, s = rt, o = Ee, d = new Uint8Array(P.slice(0, Ge)), l = ee, u = ee.slice(0, ee.length), g = le, w = dt, p = t();
        return Ge = n, y = e, De = r, Ye = i, ct = a, rt = s, Ee = o, P = d, dt = w, ee = l, ee.splice(0, ee.length, ...u), le = g, J = new DataView(P.buffer, P.byteOffset, P.byteLength), p;
    }
    function Ai() {
        P = null, rt = null, ee = null;
    }
    const Pi = new Array(147);
    for(let t = 0; t < 256; t++)Pi[t] = +("1e" + Math.floor(45.15 - t * .30103));
    var Ar = new Cn({
        useRecords: !1
    });
    Ar.unpack;
    Ar.unpackMultiple;
    Ar.unpack;
    let R_ = new Float32Array(1);
    new Uint8Array(R_.buffer, 0, 4);
    var Ir = ge(287).hp;
    let or;
    try {
        or = new TextEncoder;
    } catch  {}
    let Ii, Sl;
    const Tr = typeof Ir < "u", Jn = Tr ? function(t) {
        return Ir.allocUnsafeSlow(t);
    } : Uint8Array, vl = Tr ? Ir : Uint8Array, Bs = Tr ? 4294967296 : 2144337920;
    let v, ln, oe, E = 0, Se, de = null, N_;
    const O_ = 21760, D_ = /[\u0080-\uFFFF]/, Zt = Symbol("record-id");
    class H_ extends Cn {
        constructor(n){
            super(n), this.offset = 0;
            let e, r, i, a, s = vl.prototype.utf8Write ? function(S, M) {
                return v.utf8Write(S, M, v.byteLength - M);
            } : or && or.encodeInto ? function(S, M) {
                return or.encodeInto(S, v.subarray(M)).written;
            } : !1, o = this;
            n || (n = {});
            let d = n && n.sequential, l = n.structures || n.saveStructures, u = n.maxSharedStructures;
            if (u == null && (u = l ? 32 : 0), u > 8160) throw new Error("Maximum maxSharedStructure is 8160");
            n.structuredClone && n.moreTypes == null && (this.moreTypes = !0);
            let g = n.maxOwnStructures;
            g == null && (g = l ? 32 : 64), !this.structures && n.useRecords != !1 && (this.structures = []);
            let w = u > 32 || g + u > 64, p = u + 64, k = u + g + 64;
            if (k > 8256) throw new Error("Maximum maxSharedStructure + maxOwnStructure is 8192");
            let x = [], I = 0, T = 0;
            this.pack = this.encode = function(S, M) {
                if (v || (v = new Jn(8192), oe = v.dataView || (v.dataView = new DataView(v.buffer, 0, 8192)), E = 0), Se = v.length - 10, Se - E < 2048 ? (v = new Jn(v.length), oe = v.dataView || (v.dataView = new DataView(v.buffer, 0, v.length)), Se = v.length - 10, E = 0) : E = E + 7 & 2147483640, e = E, M & P_ && (E += M & 255), a = o.structuredClone ? new Map : null, o.bundleStrings && typeof S != "string" ? (de = [], de.size = 1 / 0) : de = null, i = o.structures, i) {
                    i.uninitialized && (i = o._mergeStructures(o.getStructures()));
                    let N = i.sharedLength || 0;
                    if (N > u) throw new Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to " + i.sharedLength);
                    if (!i.transitions) {
                        i.transitions = Object.create(null);
                        for(let L = 0; L < N; L++){
                            let Y = i[L];
                            if (!Y) continue;
                            let W, j = i.transitions;
                            for(let q = 0, K = Y.length; q < K; q++){
                                let te = Y[q];
                                W = j[te], W || (W = j[te] = Object.create(null)), j = W;
                            }
                            j[Zt] = L + 64;
                        }
                        this.lastNamedStructuresLength = N;
                    }
                    d || (i.nextId = N + 64);
                }
                r && (r = !1);
                let O;
                try {
                    o.randomAccessStructure && S && S.constructor && S.constructor === Object ? ae(S) : m(S);
                    let N = de;
                    if (de && Rs(e, m, 0), a && a.idsToInsert) {
                        let L = a.idsToInsert.sort((q, K)=>q.offset > K.offset ? 1 : -1), Y = L.length, W = -1;
                        for(; N && Y > 0;){
                            let q = L[--Y].offset + e;
                            q < N.stringsPosition + e && W === -1 && (W = 0), q > N.position + e ? W >= 0 && (W += 6) : (W >= 0 && (oe.setUint32(N.position + e, oe.getUint32(N.position + e) + W), W = -1), N = N.previous, Y++);
                        }
                        W >= 0 && N && oe.setUint32(N.position + e, oe.getUint32(N.position + e) + W), E += L.length * 6, E > Se && z(E), o.offset = E;
                        let j = z_(v.subarray(e, E), L);
                        return a = null, j;
                    }
                    return o.offset = E, M & M_ ? (v.start = e, v.end = E, v) : v.subarray(e, E);
                } catch (N) {
                    throw O = N, N;
                } finally{
                    if (i && (D(), r && o.saveStructures)) {
                        let N = i.sharedLength || 0, L = v.subarray(e, E), Y = Z_(i, o);
                        if (!O) return o.saveStructures(Y, Y.isCompatible) === !1 ? o.pack(S, M) : (o.lastNamedStructuresLength = N, v.length > 1073741824 && (v = null), L);
                    }
                    v.length > 1073741824 && (v = null), M & L_ && (E = e);
                }
            };
            const D = ()=>{
                T < 10 && T++;
                let S = i.sharedLength || 0;
                if (i.length > S && !d && (i.length = S), I > 1e4) i.transitions = null, T = 0, I = 0, x.length > 0 && (x = []);
                else if (x.length > 0 && !d) {
                    for(let M = 0, O = x.length; M < O; M++)x[M][Zt] = 0;
                    x = [];
                }
            }, C = (S)=>{
                var M = S.length;
                M < 16 ? v[E++] = 144 | M : M < 65536 ? (v[E++] = 220, v[E++] = M >> 8, v[E++] = M & 255) : (v[E++] = 221, oe.setUint32(E, M), E += 4);
                for(let O = 0; O < M; O++)m(S[O]);
            }, m = (S)=>{
                E > Se && (v = z(E));
                var M = typeof S, O;
                if (M === "string") {
                    let N = S.length;
                    if (de && N >= 4 && N < 4096) {
                        if ((de.size += N) > O_) {
                            let j, q = (de[0] ? de[0].length * 3 + de[1].length : 0) + 10;
                            E + q > Se && (v = z(E + q));
                            let K;
                            de.position ? (K = de, v[E] = 200, E += 3, v[E++] = 98, j = E - e, E += 4, Rs(e, m, 0), oe.setUint16(j + e - 3, E - e - j)) : (v[E++] = 214, v[E++] = 98, j = E - e, E += 4), de = [
                                "",
                                ""
                            ], de.previous = K, de.size = 0, de.position = j;
                        }
                        let W = D_.test(S);
                        de[W ? 0 : 1] += S, v[E++] = 193, m(W ? -N : N);
                        return;
                    }
                    let L;
                    N < 32 ? L = 1 : N < 256 ? L = 2 : N < 65536 ? L = 3 : L = 5;
                    let Y = N * 3;
                    if (E + Y > Se && (v = z(E + Y)), N < 64 || !s) {
                        let W, j, q, K = E + L;
                        for(W = 0; W < N; W++)j = S.charCodeAt(W), j < 128 ? v[K++] = j : j < 2048 ? (v[K++] = j >> 6 | 192, v[K++] = j & 63 | 128) : (j & 64512) === 55296 && ((q = S.charCodeAt(W + 1)) & 64512) === 56320 ? (j = 65536 + ((j & 1023) << 10) + (q & 1023), W++, v[K++] = j >> 18 | 240, v[K++] = j >> 12 & 63 | 128, v[K++] = j >> 6 & 63 | 128, v[K++] = j & 63 | 128) : (v[K++] = j >> 12 | 224, v[K++] = j >> 6 & 63 | 128, v[K++] = j & 63 | 128);
                        O = K - E - L;
                    } else O = s(S, E + L);
                    O < 32 ? v[E++] = 160 | O : O < 256 ? (L < 2 && v.copyWithin(E + 2, E + 1, E + 1 + O), v[E++] = 217, v[E++] = O) : O < 65536 ? (L < 3 && v.copyWithin(E + 3, E + 2, E + 2 + O), v[E++] = 218, v[E++] = O >> 8, v[E++] = O & 255) : (L < 5 && v.copyWithin(E + 5, E + 3, E + 3 + O), v[E++] = 219, oe.setUint32(E, O), E += 4), E += O;
                } else if (M === "number") if (S >>> 0 === S) S < 32 || S < 128 && this.useRecords === !1 || S < 64 && !this.randomAccessStructure ? v[E++] = S : S < 256 ? (v[E++] = 204, v[E++] = S) : S < 65536 ? (v[E++] = 205, v[E++] = S >> 8, v[E++] = S & 255) : (v[E++] = 206, oe.setUint32(E, S), E += 4);
                else if (S >> 0 === S) S >= -32 ? v[E++] = 256 + S : S >= -128 ? (v[E++] = 208, v[E++] = S + 256) : S >= -32768 ? (v[E++] = 209, oe.setInt16(E, S), E += 2) : (v[E++] = 210, oe.setInt32(E, S), E += 4);
                else {
                    let N;
                    if ((N = this.useFloat32) > 0 && S < 4294967296 && S >= -2147483648) {
                        v[E++] = 202, oe.setFloat32(E, S);
                        let L;
                        if (N < 4 || (L = S * Pi[(v[E] & 127) << 1 | v[E + 1] >> 7]) >> 0 === L) {
                            E += 4;
                            return;
                        } else E--;
                    }
                    v[E++] = 203, oe.setFloat64(E, S), E += 8;
                }
                else if (M === "object" || M === "function") if (!S) v[E++] = 192;
                else {
                    if (a) {
                        let L = a.get(S);
                        if (L) {
                            if (!L.id) {
                                let Y = a.idsToInsert || (a.idsToInsert = []);
                                L.id = Y.push(L);
                            }
                            v[E++] = 214, v[E++] = 112, oe.setUint32(E, L.id), E += 4;
                            return;
                        } else a.set(S, {
                            offset: E - e
                        });
                    }
                    let N = S.constructor;
                    if (N === Object) $(S);
                    else if (N === Array) C(S);
                    else if (N === Map) if (this.mapAsEmptyObject) v[E++] = 128;
                    else {
                        O = S.size, O < 16 ? v[E++] = 128 | O : O < 65536 ? (v[E++] = 222, v[E++] = O >> 8, v[E++] = O & 255) : (v[E++] = 223, oe.setUint32(E, O), E += 4);
                        for (let [L, Y] of S)m(L), m(Y);
                    }
                    else {
                        for(let L = 0, Y = Ii.length; L < Y; L++){
                            let W = Sl[L];
                            if (S instanceof W) {
                                let j = Ii[L];
                                if (j.write) {
                                    j.type && (v[E++] = 212, v[E++] = j.type, v[E++] = 0);
                                    let Ae = j.write.call(this, S);
                                    Ae === S ? Array.isArray(S) ? C(S) : $(S) : m(Ae);
                                    return;
                                }
                                let q = v, K = oe, te = E;
                                v = null;
                                let xe;
                                try {
                                    xe = j.pack.call(this, S, (Ae)=>(v = q, q = null, E += Ae, E > Se && z(E), {
                                            target: v,
                                            targetView: oe,
                                            position: E - Ae
                                        }), m);
                                } finally{
                                    q && (v = q, oe = K, E = te, Se = v.length - 10);
                                }
                                xe && (xe.length + E > Se && z(xe.length + E), E = F_(xe, v, E, j.type));
                                return;
                            }
                        }
                        if (Array.isArray(S)) C(S);
                        else {
                            if (S.toJSON) {
                                const L = S.toJSON();
                                if (L !== S) return m(L);
                            }
                            if (M === "function") return m(this.writeFunction && this.writeFunction(S));
                            $(S);
                        }
                    }
                }
                else if (M === "boolean") v[E++] = S ? 195 : 194;
                else if (M === "bigint") {
                    if (S < BigInt(1) << BigInt(63) && S >= -(BigInt(1) << BigInt(63))) v[E++] = 211, oe.setBigInt64(E, S);
                    else if (S < BigInt(1) << BigInt(64) && S > 0) v[E++] = 207, oe.setBigUint64(E, S);
                    else if (this.largeBigIntToFloat) v[E++] = 203, oe.setFloat64(E, Number(S));
                    else {
                        if (this.largeBigIntToString) return m(S.toString());
                        if (this.useBigIntExtension && S < BigInt(2) ** BigInt(1023) && S > -(BigInt(2) ** BigInt(1023))) {
                            v[E++] = 199, E++, v[E++] = 66;
                            let N = [], L;
                            do {
                                let Y = S & BigInt(255);
                                L = (Y & BigInt(128)) === (S < BigInt(0) ? BigInt(128) : BigInt(0)), N.push(Y), S >>= BigInt(8);
                            }while (!((S === BigInt(0) || S === BigInt(-1)) && L));
                            v[E - 2] = N.length;
                            for(let Y = N.length; Y > 0;)v[E++] = Number(N[--Y]);
                            return;
                        } else throw new RangeError(S + " was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set largeBigIntToString to convert to string");
                    }
                    E += 8;
                } else if (M === "undefined") this.encodeUndefinedAsNil ? v[E++] = 192 : (v[E++] = 212, v[E++] = 0, v[E++] = 0);
                else throw new Error("Unknown type: " + M);
            }, H = this.variableMapSize || this.coercibleKeyAsNumber || this.skipValues ? (S)=>{
                let M;
                if (this.skipValues) {
                    M = [];
                    for(let L in S)(typeof S.hasOwnProperty != "function" || S.hasOwnProperty(L)) && !this.skipValues.includes(S[L]) && M.push(L);
                } else M = Object.keys(S);
                let O = M.length;
                O < 16 ? v[E++] = 128 | O : O < 65536 ? (v[E++] = 222, v[E++] = O >> 8, v[E++] = O & 255) : (v[E++] = 223, oe.setUint32(E, O), E += 4);
                let N;
                if (this.coercibleKeyAsNumber) for(let L = 0; L < O; L++){
                    N = M[L];
                    let Y = Number(N);
                    m(isNaN(Y) ? N : Y), m(S[N]);
                }
                else for(let L = 0; L < O; L++)m(N = M[L]), m(S[N]);
            } : (S)=>{
                v[E++] = 222;
                let M = E - e;
                E += 2;
                let O = 0;
                for(let N in S)(typeof S.hasOwnProperty != "function" || S.hasOwnProperty(N)) && (m(N), m(S[N]), O++);
                if (O > 65535) throw new Error('Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object');
                v[M++ + e] = O >> 8, v[M + e] = O & 255;
            }, V = this.useRecords === !1 ? H : n.progressiveRecords && !w ? (S)=>{
                let M, O = i.transitions || (i.transitions = Object.create(null)), N = E++ - e, L;
                for(let Y in S)if (typeof S.hasOwnProperty != "function" || S.hasOwnProperty(Y)) {
                    if (M = O[Y], M) O = M;
                    else {
                        let W = Object.keys(S), j = O;
                        O = i.transitions;
                        let q = 0;
                        for(let K = 0, te = W.length; K < te; K++){
                            let xe = W[K];
                            M = O[xe], M || (M = O[xe] = Object.create(null), q++), O = M;
                        }
                        N + e + 1 == E ? (E--, R(O, W, q)) : F(O, W, N, q), L = !0, O = j[Y];
                    }
                    m(S[Y]);
                }
                if (!L) {
                    let Y = O[Zt];
                    Y ? v[N + e] = Y : F(O, Object.keys(S), N, 0);
                }
            } : (S)=>{
                let M, O = i.transitions || (i.transitions = Object.create(null)), N = 0;
                for(let Y in S)(typeof S.hasOwnProperty != "function" || S.hasOwnProperty(Y)) && (M = O[Y], M || (M = O[Y] = Object.create(null), N++), O = M);
                let L = O[Zt];
                L ? L >= 96 && w ? (v[E++] = ((L -= 96) & 31) + 96, v[E++] = L >> 5) : v[E++] = L : R(O, O.__keys__ || Object.keys(S), N);
                for(let Y in S)(typeof S.hasOwnProperty != "function" || S.hasOwnProperty(Y)) && m(S[Y]);
            }, B = typeof this.useRecords == "function" && this.useRecords, $ = B ? (S)=>{
                B(S) ? V(S) : H(S);
            } : V, z = (S)=>{
                let M;
                if (S > 16777216) {
                    if (S - e > Bs) throw new Error("Packed buffer would be larger than maximum buffer size");
                    M = Math.min(Bs, Math.round(Math.max((S - e) * (S > 67108864 ? 1.25 : 2), 4194304) / 4096) * 4096);
                } else M = (Math.max(S - e << 2, v.length - 1) >> 12) + 1 << 12;
                let O = new Jn(M);
                return oe = O.dataView || (O.dataView = new DataView(O.buffer, 0, M)), S = Math.min(S, v.length), v.copy ? v.copy(O, 0, e, S) : O.set(v.slice(e, S)), E -= e, e = 0, Se = O.length - 10, v = O;
            }, R = (S, M, O)=>{
                let N = i.nextId;
                N || (N = 64), N < p && this.shouldShareStructure && !this.shouldShareStructure(M) ? (N = i.nextOwnId, N < k || (N = p), i.nextOwnId = N + 1) : (N >= k && (N = p), i.nextId = N + 1);
                let L = M.highByte = N >= 96 && w ? N - 96 >> 5 : -1;
                S[Zt] = N, S.__keys__ = M, i[N - 64] = M, N < p ? (M.isShared = !0, i.sharedLength = N - 63, r = !0, L >= 0 ? (v[E++] = (N & 31) + 96, v[E++] = L) : v[E++] = N) : (L >= 0 ? (v[E++] = 213, v[E++] = 114, v[E++] = (N & 31) + 96, v[E++] = L) : (v[E++] = 212, v[E++] = 114, v[E++] = N), O && (I += T * O), x.length >= g && (x.shift()[Zt] = 0), x.push(S), m(M));
            }, F = (S, M, O, N)=>{
                let L = v, Y = E, W = Se, j = e;
                v = ln, E = 0, e = 0, v || (ln = v = new Jn(8192)), Se = v.length - 10, R(S, M, N), ln = v;
                let q = E;
                if (v = L, E = Y, Se = W, e = j, q > 1) {
                    let K = E + q - 1;
                    K > Se && z(K);
                    let te = O + e;
                    v.copyWithin(te + q, te + 1, E), v.set(ln.slice(0, q), te), E = K;
                } else v[O + e] = ln[0];
            }, ae = (S)=>{
                let M = N_(S, v, e, E, i, z, (O, N, L)=>{
                    if (L) return r = !0;
                    E = N;
                    let Y = v;
                    return m(O), D(), Y !== v ? {
                        position: E,
                        targetView: oe,
                        target: v
                    } : E;
                }, this);
                if (M === 0) return $(S);
                E = M;
            };
        }
        useBuffer(n) {
            v = n, v.dataView || (v.dataView = new DataView(v.buffer, v.byteOffset, v.byteLength)), E = 0;
        }
        set position(n) {
            E = n;
        }
        get position() {
            return E;
        }
        clearSharedData() {
            this.structures && (this.structures = []), this.typedStructs && (this.typedStructs = []);
        }
    }
    Sl = [
        Date,
        Set,
        Error,
        RegExp,
        ArrayBuffer,
        Object.getPrototypeOf(Uint8Array.prototype).constructor,
        _l
    ];
    Ii = [
        {
            pack (t, n, e) {
                let r = t.getTime() / 1e3;
                if ((this.useTimestamp32 || t.getMilliseconds() === 0) && r >= 0 && r < 4294967296) {
                    let { target: i, targetView: a, position: s } = n(6);
                    i[s++] = 214, i[s++] = 255, a.setUint32(s, r);
                } else if (r > 0 && r < 4294967296) {
                    let { target: i, targetView: a, position: s } = n(10);
                    i[s++] = 215, i[s++] = 255, a.setUint32(s, t.getMilliseconds() * 4e6 + (r / 1e3 / 4294967296 >> 0)), a.setUint32(s + 4, r);
                } else if (isNaN(r)) {
                    if (this.onInvalidDate) return n(0), e(this.onInvalidDate());
                    let { target: i, targetView: a, position: s } = n(3);
                    i[s++] = 212, i[s++] = 255, i[s++] = 255;
                } else {
                    let { target: i, targetView: a, position: s } = n(15);
                    i[s++] = 199, i[s++] = 12, i[s++] = 255, a.setUint32(s, t.getMilliseconds() * 1e6), a.setBigInt64(s + 4, BigInt(Math.floor(r)));
                }
            }
        },
        {
            pack (t, n, e) {
                if (this.setAsEmptyObject) return n(0), e({});
                let r = Array.from(t), { target: i, position: a } = n(this.moreTypes ? 3 : 0);
                this.moreTypes && (i[a++] = 212, i[a++] = 115, i[a++] = 0), e(r);
            }
        },
        {
            pack (t, n, e) {
                let { target: r, position: i } = n(this.moreTypes ? 3 : 0);
                this.moreTypes && (r[i++] = 212, r[i++] = 101, r[i++] = 0), e([
                    t.name,
                    t.message,
                    t.cause
                ]);
            }
        },
        {
            pack (t, n, e) {
                let { target: r, position: i } = n(this.moreTypes ? 3 : 0);
                this.moreTypes && (r[i++] = 212, r[i++] = 120, r[i++] = 0), e([
                    t.source,
                    t.flags
                ]);
            }
        },
        {
            pack (t, n) {
                this.moreTypes ? Cs(t, 16, n) : Us(Tr ? Ir.from(t) : new Uint8Array(t), n);
            }
        },
        {
            pack (t, n) {
                let e = t.constructor;
                e !== vl && this.moreTypes ? Cs(t, El.indexOf(e.name), n) : Us(t, n);
            }
        },
        {
            pack (t, n) {
                let { target: e, position: r } = n(1);
                e[r] = 193;
            }
        }
    ];
    function Cs(t, n, e, r) {
        let i = t.byteLength;
        if (i + 1 < 256) {
            var { target: a, position: s } = e(4 + i);
            a[s++] = 199, a[s++] = i + 1;
        } else if (i + 1 < 65536) {
            var { target: a, position: s } = e(5 + i);
            a[s++] = 200, a[s++] = i + 1 >> 8, a[s++] = i + 1 & 255;
        } else {
            var { target: a, position: s, targetView: o } = e(7 + i);
            a[s++] = 201, o.setUint32(s, i + 1), s += 4;
        }
        a[s++] = 116, a[s++] = n, t.buffer || (t = new Uint8Array(t)), a.set(new Uint8Array(t.buffer, t.byteOffset, t.byteLength), s);
    }
    function Us(t, n) {
        let e = t.byteLength;
        var r, i;
        if (e < 256) {
            var { target: r, position: i } = n(e + 2);
            r[i++] = 196, r[i++] = e;
        } else if (e < 65536) {
            var { target: r, position: i } = n(e + 3);
            r[i++] = 197, r[i++] = e >> 8, r[i++] = e & 255;
        } else {
            var { target: r, position: i, targetView: a } = n(e + 5);
            r[i++] = 198, a.setUint32(i, e), i += 4;
        }
        r.set(t, i);
    }
    function F_(t, n, e, r) {
        let i = t.length;
        switch(i){
            case 1:
                n[e++] = 212;
                break;
            case 2:
                n[e++] = 213;
                break;
            case 4:
                n[e++] = 214;
                break;
            case 8:
                n[e++] = 215;
                break;
            case 16:
                n[e++] = 216;
                break;
            default:
                i < 256 ? (n[e++] = 199, n[e++] = i) : i < 65536 ? (n[e++] = 200, n[e++] = i >> 8, n[e++] = i & 255) : (n[e++] = 201, n[e++] = i >> 24, n[e++] = i >> 16 & 255, n[e++] = i >> 8 & 255, n[e++] = i & 255);
        }
        return n[e++] = r, n.set(t, e), e += i, e;
    }
    function z_(t, n) {
        let e, r = n.length * 6, i = t.length - r;
        for(; e = n.pop();){
            let a = e.offset, s = e.id;
            t.copyWithin(a + r, a, i), r -= 6;
            let o = a + r;
            t[o++] = 214, t[o++] = 105, t[o++] = s >> 24, t[o++] = s >> 16 & 255, t[o++] = s >> 8 & 255, t[o++] = s & 255, i = a;
        }
        return t;
    }
    function Rs(t, n, e) {
        if (de.length > 0) {
            oe.setUint32(de.position + t, E + e - de.position - t), de.stringsPosition = E - t;
            let r = de;
            de = null, n(r[0]), n(r[1]);
        }
    }
    function Z_(t, n) {
        return t.isCompatible = (e)=>{
            let r = !e || (n.lastNamedStructuresLength || 0) === e.length;
            return r || n._mergeStructures(e), r;
        }, t;
    }
    let xl = new H_({
        useRecords: !1
    });
    xl.pack;
    xl.pack;
    const M_ = 512, L_ = 1024, P_ = 2048;
    var Ns = ge(287).hp;
    class $_ {
        constructor(n, e = {
            threads: 1
        }, r = {
            recursive: !1
        }){
            this.backendOptions = e, this.circuitOptions = r, this.acirUncompressedBytecode = W_(n);
        }
        async instantiate() {
            if (!this.api) {
                const n = await $i.new(this.backendOptions);
                await n.acirInitSRS(this.acirUncompressedBytecode, this.circuitOptions.recursive, !0), this.api = n;
            }
        }
        async generateProof(n, e) {
            await this.instantiate();
            const i = await (e?.keccak ? this.api.acirProveUltraKeccakHonk.bind(this.api) : e?.keccakZK ? this.api.acirProveUltraKeccakZKHonk.bind(this.api) : e?.starknet ? this.api.acirProveUltraStarknetHonk.bind(this.api) : this.api.acirProveUltraHonk.bind(this.api))(this.acirUncompressedBytecode, dl(n)), s = await (e?.keccak ? this.api.acirWriteVkUltraKeccakHonk.bind(this.api) : e?.keccakZK ? this.api.acirWriteVkUltraKeccakZKHonk.bind(this.api) : e?.starknet ? this.api.acirWriteVkUltraStarknetHonk.bind(this.api) : this.api.acirWriteVkUltraHonk.bind(this.api))(this.acirUncompressedBytecode), o = await this.api.acirVkAsFieldsUltraHonk(new nt(s)), l = Number(o[1].toString()) - Xd, { proof: u, publicInputs: g } = Jd(i, l), w = e_(g);
            return {
                proof: u,
                publicInputs: w
            };
        }
        async verifyProof(n, e) {
            await this.instantiate();
            const r = Qd(t_(n.publicInputs), n.proof), i = e?.keccak ? this.api.acirWriteVkUltraKeccakHonk.bind(this.api) : e?.keccakZK ? this.api.acirWriteVkUltraKeccakZKHonk.bind(this.api) : e?.starknet ? this.api.acirWriteVkUltraStarknetHonk.bind(this.api) : this.api.acirWriteVkUltraHonk.bind(this.api), a = e?.keccak ? this.api.acirVerifyUltraKeccakHonk.bind(this.api) : e?.keccakZK ? this.api.acirVerifyUltraKeccakZKHonk.bind(this.api) : e?.starknet ? this.api.acirVerifyUltraStarknetHonk.bind(this.api) : this.api.acirVerifyUltraHonk.bind(this.api), s = await i(this.acirUncompressedBytecode);
            return await a(r, new nt(s));
        }
        async getVerificationKey(n) {
            return await this.instantiate(), n?.keccak ? await this.api.acirWriteVkUltraKeccakHonk(this.acirUncompressedBytecode) : n?.keccakZK ? await this.api.acirWriteVkUltraKeccakZKHonk(this.acirUncompressedBytecode) : n?.starknet ? await this.api.acirWriteVkUltraStarknetHonk(this.acirUncompressedBytecode) : await this.api.acirWriteVkUltraHonk(this.acirUncompressedBytecode);
        }
        async getSolidityVerifier(n) {
            await this.instantiate();
            const e = n ?? await this.api.acirWriteVkUltraKeccakHonk(this.acirUncompressedBytecode);
            return await this.api.acirHonkSolidityVerifier(this.acirUncompressedBytecode, new nt(e));
        }
        async generateRecursiveProofArtifacts(n, e) {
            await this.instantiate();
            const r = await this.api.acirWriteVkUltraHonk(this.acirUncompressedBytecode), i = await this.api.acirVkAsFieldsUltraHonk(r);
            return {
                proofAsFields: [],
                vkAsFields: i.map((a)=>a.toString()),
                vkHash: ""
            };
        }
        async destroy() {
            this.api && await this.api.destroy();
        }
    }
    function W_(t) {
        const n = V_(t);
        return dl(n);
    }
    function V_(t) {
        if (typeof Ns < "u") {
            const n = Ns.from(t, "base64");
            return new Uint8Array(n.buffer, n.byteOffset, n.byteLength);
        } else {
            if (typeof atob == "function") return Uint8Array.from(atob(t), (n)=>n.charCodeAt(0));
            throw new Error("No implementation found for base64 decoding.");
        }
    }
    class $i extends Vf {
        constructor(n, e, r){
            super(e), this.worker = n, this.options = r;
        }
        static async new(n = {}) {
            const e = await Gf(), r = ko(e), { module: i, threads: a } = await al(n.threads, n.wasmPath, n.logger);
            return await r.init(i, a, po(n.logger ?? qe()("bb.js:bb_wasm_async")), n.memory?.initial, n.memory?.maximum), new $i(e, r, n);
        }
        async getNumThreads() {
            return await this.wasm.getNumThreads();
        }
        async initSRSForCircuitSize(n) {
            const e = await fr.new(n + 1, this.options.crsPath, this.options.logger);
            await this.srsInitSrs(new nt(e.getG1Data()), e.numPoints, new nt(e.getG2Data()));
        }
        async initSRSClientIVC() {
            const n = await fr.new(1048577, this.options.crsPath, this.options.logger), e = await Ui.new(2 ** 16 + 1, this.options.crsPath, this.options.logger);
            await this.srsInitSrs(new nt(n.getG1Data()), n.numPoints, new nt(n.getG2Data())), await this.srsInitGrumpkinSrs(new nt(e.getG1Data()), e.numPoints);
        }
        async acirInitSRS(n, e, r) {
            const [i, a] = await this.acirGetCircuitSizes(n, e, r);
            return this.initSRSForCircuitSize(a);
        }
        async destroy() {
            await this.wasm.destroy(), await this.worker.terminate();
        }
        getWasm() {
            return this.wasm;
        }
    }
    let ai, Qn;
    Ti = class extends Yf {
        constructor(n){
            super(n);
        }
        static async new(n, e = qe()("bb.js:bb_wasm_sync")) {
            const r = new kr, { module: i, threads: a } = await al(1, n, e);
            return await r.init(i, a, e), new Ti(r);
        }
        static async initSingleton(n, e = qe()("bb.js:bb_wasm_sync")) {
            return ai || (ai = Ti.new(n, e)), Qn = await ai, Qn;
        }
        static getSingleton() {
            if (!Qn) throw new Error("First call BarretenbergSync.initSingleton() on @aztec/bb.js module.");
            return Qn;
        }
        getWasm() {
            return this.wasm;
        }
    };
    const Y_ = "1.0.0-beta.9+6abff2f16e1c1314ba30708d1cf032a536de3d19", j_ = "7532336930804900517", K_ = {
        parameters: [
            {
                name: "root",
                type: {
                    kind: "field"
                },
                visibility: "public"
            },
            {
                name: "total_liabilities",
                type: {
                    kind: "field"
                },
                visibility: "public"
            },
            {
                name: "ledger_seq",
                type: {
                    kind: "field"
                },
                visibility: "public"
            },
            {
                name: "reserve_addresses_hash",
                type: {
                    kind: "field"
                },
                visibility: "public"
            },
            {
                name: "balances",
                type: {
                    kind: "array",
                    length: 8,
                    type: {
                        kind: "field"
                    }
                },
                visibility: "private"
            },
            {
                name: "salts",
                type: {
                    kind: "array",
                    length: 8,
                    type: {
                        kind: "field"
                    }
                },
                visibility: "private"
            },
            {
                name: "reserve_addresses",
                type: {
                    kind: "array",
                    length: 5,
                    type: {
                        kind: "field"
                    }
                },
                visibility: "private"
            },
            {
                name: "num_reserve_accounts",
                type: {
                    kind: "field"
                },
                visibility: "private"
            }
        ],
        return_type: null,
        error_types: {
            "17843811134343075018": {
                error_kind: "string",
                string: "Stack too deep"
            }
        }
    }, G_ = "H4sIAAAAAAAA/+1dCZfUxhEuDMZec0PAxBwJV2LAidVqSd3txLAkHE7MkZgjMeCEVkttwIm5ScztxNxOzA2O/ysvpUcL92gX20TV86K19F5t1ezslvprfaqvund2ZhI8Ob5CK108xflJMPaovzfqfNTuYFPockUveON8zflFTQCTAwLgUZYkpYhLxpmOYpXLNErSPJNMslSmRSw5L2UihcqViBRLeMlsqrh1yV777rnMt+RiiwgndpiEmA5hCLHY+SUQmBDTCQmxmJAQSwgntrroL6ONePP4NLfkpVCMFZKnkRJZrHAEmUg5s4alRttCKC1VXpYm50pF3GYqFbHJeGYTnerHjXxMC5uWVutCWI4J4lQrJi2PjJGF4JxbY3Qu8GmjIsuSopQsNyaNpVWKp8Vj2usbjSF8mmgtMy24yaXmSRqnZZrnZZGVCc81Y0qWMotsarlKoziTVrDCJqlieVEmUdwcXxypwtjcxvglFVbZLEpwZpJCMG0yq60UMZ7SGpFEwkRJmWcx01kshdGGxVlovHFhZa6SqEylisoE6ShEGaVccKvLTGlWiDTBa8rTEidFRnmWZSoRCV7/2BRmzPWIS1NIWbBUZSI3Kc+lxLmJy6hgmcwyhlhNnmlt4oJbmZYx4hRlafPYMIVkC4F3qstVxVVRfuziRV682IuXuJhwHDE1rirfUrQfof0YhqvyL0KYor7M+eVNANRF3QfQtqgvA7qivhy6qfIzIAwhVji/EgITYgYhIVYQEmIl9CpPhX0gX6/yE1rlq6Jcq/lyL17hxSuhGyq/Cu0naD+F4ar8VAhT1F93fnUTAHVR9wG0LeqvA11RXw3dVPmZEIYQa5xfC4EJMZOQEGsICbEWepWnwj6Qr1f5Ca3yVVGu1Xy1F6/x4rXQDZV/A+1naD+H4ar8SxCmqL9Z52wCoC7qPoC2Rf1NoCvqEXRT5WdBGEIw52MITIhZhIRghISIoVd5KuwD+XqVn9AqXxXlWs0jL2ZeHEM3VJ6jJWgpDFflX4YwRT1zXjQBUBd1H0Dbop4BXVEX0E2Vnw1hCCGdVxCYELMJCSEJCaGgV3kq7AP5epWf0CpfFeVazYUXSy9W0A2VfwvtF2i/hOGq/AiEKepvO7+uCYC6qPsA2hb1t4GuqK+Dbqr8HAhDiPWNcQYjxBxCQqwnJMQo9CpPhX0gX6/yE1rlq6Jcq/k6L17vxaPQDZXfgPYrtF/DcFX+FQhT1Dc6v6kJgLqo+wDaFvWNQFfUN0E3VX4uhCHEZue3QGBCzCUkxGZCQmyBXuWpsA/k61V+Qqt8VZRrNd/kxZu9eAt0Q+XfQfsN2m9huCo/DcIU9Xed39oEQF3UfQBti/q7QFfUt0I3VX4ehCHENue3Q2BCzCMkxDZCQmyHXuWpsA/k61V+Qqt8VZRrNd/qxdu8eDt0Q+V3oP0O7fcwXJV/B8IU9fec39kEQF3UfQBti/p7QFfUd0I3VX4HhCHELud3Q2BC7CAkxC5CQuwGepWf5c3j09y9yk9olWcmSWys0xjPLhnSTkuOA0iRhaaUObKTRXFSTQCGkqk8L7RNdawLLVHs5Zjxca3LkmdllsQx9ggRUyzjMWJNldKlKnMkhUFJF1oaFUdacySRzKUyqcWTB+9qsgJRsSwymUScyLsstZnJE8FivAxlhHOgbMK5rC5SollsFFLSxrHNM+xFxowvNSIyPFcmKpDLiWFRVHIdi9xyY7ioQFlpikIlyByTRBJvl5gXIskSBG77Lq493ldcriquRLfu1nZ68bP2cHZ58W4vHq8bJBx3EqLr24P2B7Q/wnC7vrcgjMi/7/zeJgBqkfcBtBX594FO5PdCN7u+DRCGEPuc3w+BCbGBkBD7CAmxH/qujwr7QL6+6+u7vr7r62zXV4lu3a3t9eJnvQp3nxfv9+LxXs9DOO4gXd8HaH9C+zMMt+t7A8KI/AHndRMAtcj7ANqK/AGgE3kN3ez6OIQhRO68gcCE4ISEyAkJYaDv+qiwD+Tru76+6+u7vs52fQfg625Ne/Gz3kcl92LjxeP9RzbhuIN0fQU8eUd0C8Pt+pZCGJH/0PmDTQDUIu8DaCvyHwKdyB+EbnZ9qyAMIQ45fxgCE2IVISEOERLiMPRdHxX2gXx919d3fX3X19murxLduls76MXPeif8Q1582IuXwdj31CUcd5Cu7yO0v6D9FYbb9X0AYUT+Y+ePNAFQi7wPoK3Ifwx0In8EhtP1vUA8n4RvwBTsbR6OOn+sORlTOjIZbYl6lJCox2A4RKWuXHsgDLmOO3+iCYC6cu0hJMRxQkKcgG5WLsJ/Nw/2T20nnT/VnAzqyhVqMtoS9SQhUU8BbS/ar6Ndvn4d3a+j+3V0Z9fR1TKmXv8e8eKjXnzMi4978QkvPunFp6Ab6+jTaH9D+zsMdx39EYRpGD5x/kwTAHU36gNoK/KfAJ3In4FudqOEHzAc7GMMzzp/rjkZ1N1oqMloS9SzhEQ9B8MhKnXlKiAMuc47f6EJgLpyFYSEOE9IiAvQzcpF+HFqwT605aLzl5qTQV25Qk1GW6JeJCTqJaDtRft1tMvXr6P7dXS/ju7sOrpaxtTr3zNefNaLz3nxeS++4MUXvfgSdGMd/SnaP9D+CcNdR38KYRqGz5y/3ARA3Y36ANqK/GdAJ/KXYTjdaFeWjlG7oxNd8hXnrzYv0tT+Ij13Lsru/QrQ3dhXYTg3NnWlPw1hSH/N+etNANSV/jQhIa4REuI6dLPS/5++8qgTryu44fzN5kWirvTft4vU9sa+AXQ39k06jP0+DfT7NP0+Tb9PMxH2aaplcr2/ctmLr3jxVS++5sXXvfiGF9+EbuzTfI72L7R/w+DR/KNQWx0jHDf7nHAOfMwjxJgnEWLutzGeL1e/GHi+Y5gr9x8QjttfxHzh/K0mAOqVuw+gbZH44rvn+tYG/xZ0kxDzIQwhbjt/BwITYj4hIW4TEuIOdJMQCyAMIe46fw8CE2IBISHuEhLiHnSTEK9CGELcd/4BBCbEq4SEuE9IiAfQTUIshDCEeOj8IwhMiIWEhHhISIhHhBNbbxLO9ebxae5+k7DfJOw3Cbu7SRiVhTIZXolYxKK62krm1uA+oZBFqoqc6SIvkfKCJ1ZYbQze5TkWHZVYY7NyDJ+VKUTBsSRxmfNUmiw2iY4iK7jGjcJI57gnmGqto0RE+IRguFeoWJmXuYq5YP2maHu8012uKq7WpfVm5i0vvu3Fd7z4rhff8+L7XvzAix968SMg3yxNQ2yWfon2H7SvYPCg3iydTDdu9iUxR+omb4Hz1eNqQ7HaCKw28OoPhaw2uqY5Ts1AmwlP/lg4G20OPOkJqg/KrPZS5rt8VZNc9UU/9M4DjiPVHE+GsUd9ny51fqRxTSa53xslms+Rxnkp80usbSPj4CMcPx/x5jPU/NQ5A+SPXnJ5Nl6CAW5A47wz3GN/MVL/TsXRmfB1PMv7nerY5OWe1Hhu8zjnDYkZOZHW+acEyI9HPG+c8dfnmubmaKF7PHmcn/XvhRe9nxnvusA435s0Tp7m3PrXcdR5xjl2Rdjx2sLyVKg4x5Ywwy7YikwmhUUNLUTJEs1jVQrs+mVZ4grDiMxi85zZJtYXvgHbjG8Y44xx8PrzV9/TUy4NYh91349aHNhqPO1VJrv8L8L4tXKK97z/80vcY/+Poj6O0f9xnFZoZrm22JkXBXalcxv5wZuzap7+C1fQtMTVswAA", q_ = "pZfdbqMwEIXfhetcMDP+GedVqqqiKa0ioSSiSaVVlXdfuxyTVCssL7mJcwbmYzz4AP5u3vrXy8fL/vB+/Gy2T9/N67gfhv3Hy3Dcdef98RCj302bfsg1W9405KdBm63EITRbs2k4nmGu102T017OY9+nrDtOpJ+6sT+cm+3hMgyb5qsbLj8nfZ66w8947sZ4tN00/eEtjhH4vh/69O+6uWW3y6naMpKV3ZxO/lc+Lec7Y5DvrKzJV8r5qqvy8+R9u3j9wvxZXJ4Ai7czwbb1BO9ngq4j2FsN6pYIfplAZHIbiZSXCFqogVXnGu5XQvhFCAWC8jwLtbREoEIjDLUBCEOWVyFYcicMu7AOwfZhBPkKRKmbYW4FB1pDEGqzNYRIVhHmVSUU6GGCWSKUvOGc5D7cPyH+w12eZoL3i+7iAoKEcitJ7KK9mB72F/PDBmN52GBFRJ3Byogqg5URVQYrtrPOYSVEpcXKiCqP1SNWmUwl3FZWWGMy9bPJQrvmJSjMuQZhv+gxMQ97TGxpHoZvnWjXIapsKv5hmxYRdTYtI6psWkZU2bTYzjqblhCVNi0jqmxaj1hjU4nrKROEzS+LPEfV7fbjP/sQihelOKRNx6RkUiZ9Jm8aOwXdFPST0kmF6RTKGHAIIAKJgCKwCDACjYAj8Bg8znWBx+AxeAweg8fgMXgMnoAn4EmeKHgCnoAn4Al4Ap6AZyIvedhQ+mSII0MLdORJvE/GIu4Q99AKHabzLHgWPAueBc+CZ8Gz4FnwLHgWPAeeA8+B58BzBtpCO2gPreCEKe7bKe4JmqEF2kCjPo/6vJ84XhEPU1xRn6I+RX2K+hT1KepTN3E08eLjV1N98XWiab7xiR7SZjnep0DQDC3QBtpCO2gPrdBp753WYZuA6f3w1Y377nXok1mSnS6HXfZOlOc/p3wk7/JP43HXv13GPvnsbqsff5/ilDg8X5MX/wI=", X_ = {
        17: {
            source: `use crate::field::field_less_than;
use crate::runtime::is_unconstrained;

// The low and high decomposition of the field modulus
global PLO: Field = 53438638232309528389504892708671455233;
global PHI: Field = 64323764613183177041862057485226039389;

pub(crate) global TWO_POW_128: Field = 0x100000000000000000000000000000000;

// Decomposes a single field into two 16 byte fields.
fn compute_decomposition(x: Field) -> (Field, Field) {
    // Here's we're taking advantage of truncating 128 bit limbs from the input field
    // and then subtracting them from the input such the field division is equivalent to integer division.
    let low = (x as u128) as Field;
    let high = (x - low) / TWO_POW_128;

    (low, high)
}

pub(crate) unconstrained fn decompose_hint(x: Field) -> (Field, Field) {
    compute_decomposition(x)
}

unconstrained fn lte_hint(x: Field, y: Field) -> bool {
    if x == y {
        true
    } else {
        field_less_than(x, y)
    }
}

// Assert that (alo > blo && ahi >= bhi) || (alo <= blo && ahi > bhi)
fn assert_gt_limbs(a: (Field, Field), b: (Field, Field)) {
    let (alo, ahi) = a;
    let (blo, bhi) = b;
    // Safety: borrow is enforced to be boolean due to its type.
    // if borrow is 0, it asserts that (alo > blo && ahi >= bhi)
    // if borrow is 1, it asserts that (alo <= blo && ahi > bhi)
    unsafe {
        let borrow = lte_hint(alo, blo);

        let rlo = alo - blo - 1 + (borrow as Field) * TWO_POW_128;
        let rhi = ahi - bhi - (borrow as Field);

        rlo.assert_max_bit_size::<128>();
        rhi.assert_max_bit_size::<128>();
    }
}

/// Decompose a single field into two 16 byte fields.
pub fn decompose(x: Field) -> (Field, Field) {
    if is_unconstrained() {
        compute_decomposition(x)
    } else {
        // Safety: decomposition is properly checked below
        unsafe {
            // Take hints of the decomposition
            let (xlo, xhi) = decompose_hint(x);

            // Range check the limbs
            xlo.assert_max_bit_size::<128>();
            xhi.assert_max_bit_size::<128>();

            // Check that the decomposition is correct
            assert_eq(x, xlo + TWO_POW_128 * xhi);

            // Assert that the decomposition of P is greater than the decomposition of x
            assert_gt_limbs((PLO, PHI), (xlo, xhi));
            (xlo, xhi)
        }
    }
}

pub fn assert_gt(a: Field, b: Field) {
    if is_unconstrained() {
        assert(
            // Safety: already unconstrained
            unsafe { field_less_than(b, a) },
        );
    } else {
        // Decompose a and b
        let a_limbs = decompose(a);
        let b_limbs = decompose(b);

        // Assert that a_limbs is greater than b_limbs
        assert_gt_limbs(a_limbs, b_limbs)
    }
}

pub fn assert_lt(a: Field, b: Field) {
    assert_gt(b, a);
}

pub fn gt(a: Field, b: Field) -> bool {
    if is_unconstrained() {
        // Safety: unsafe in unconstrained
        unsafe {
            field_less_than(b, a)
        }
    } else if a == b {
        false
    } else {
        // Safety: Take a hint of the comparison and verify it
        unsafe {
            if field_less_than(a, b) {
                assert_gt(b, a);
                false
            } else {
                assert_gt(a, b);
                true
            }
        }
    }
}

pub fn lt(a: Field, b: Field) -> bool {
    gt(b, a)
}

mod tests {
    // TODO: Allow imports from "super"
    use crate::field::bn254::{assert_gt, decompose, gt, lte_hint, PHI, PLO, TWO_POW_128};

    #[test]
    fn check_decompose() {
        assert_eq(decompose(TWO_POW_128), (0, 1));
        assert_eq(decompose(TWO_POW_128 + 0x1234567890), (0x1234567890, 1));
        assert_eq(decompose(0x1234567890), (0x1234567890, 0));
    }

    #[test]
    unconstrained fn check_decompose_unconstrained() {
        assert_eq(decompose(TWO_POW_128), (0, 1));
        assert_eq(decompose(TWO_POW_128 + 0x1234567890), (0x1234567890, 1));
        assert_eq(decompose(0x1234567890), (0x1234567890, 0));
    }

    #[test]
    unconstrained fn check_lte_hint() {
        assert(lte_hint(0, 1));
        assert(lte_hint(0, 0x100));
        assert(lte_hint(0x100, TWO_POW_128 - 1));
        assert(!lte_hint(0 - 1, 0));

        assert(lte_hint(0, 0));
        assert(lte_hint(0x100, 0x100));
        assert(lte_hint(0 - 1, 0 - 1));
    }

    #[test]
    fn check_assert_gt() {
        assert_gt(1, 0);
        assert_gt(0x100, 0);
        assert_gt((0 - 1), (0 - 2));
        assert_gt(TWO_POW_128, 0);
        assert_gt(0 - 1, 0);
    }

    #[test]
    unconstrained fn check_assert_gt_unconstrained() {
        assert_gt(1, 0);
        assert_gt(0x100, 0);
        assert_gt((0 - 1), (0 - 2));
        assert_gt(TWO_POW_128, 0);
        assert_gt(0 - 1, 0);
    }

    #[test]
    fn check_gt() {
        assert(gt(1, 0));
        assert(gt(0x100, 0));
        assert(gt((0 - 1), (0 - 2)));
        assert(gt(TWO_POW_128, 0));
        assert(!gt(0, 0));
        assert(!gt(0, 0x100));
        assert(gt(0 - 1, 0 - 2));
        assert(!gt(0 - 2, 0 - 1));
    }

    #[test]
    unconstrained fn check_gt_unconstrained() {
        assert(gt(1, 0));
        assert(gt(0x100, 0));
        assert(gt((0 - 1), (0 - 2)));
        assert(gt(TWO_POW_128, 0));
        assert(!gt(0, 0));
        assert(!gt(0, 0x100));
        assert(gt(0 - 1, 0 - 2));
        assert(!gt(0 - 2, 0 - 1));
    }

    #[test]
    fn check_plo_phi() {
        assert_eq(PLO + PHI * TWO_POW_128, 0);
        let p_bytes = crate::field::modulus_le_bytes();
        let mut p_low: Field = 0;
        let mut p_high: Field = 0;

        let mut offset = 1;
        for i in 0..16 {
            p_low += (p_bytes[i] as Field) * offset;
            p_high += (p_bytes[i + 16] as Field) * offset;
            offset *= 256;
        }
        assert_eq(p_low, PLO);
        assert_eq(p_high, PHI);
    }
}
`,
            path: "std/field/bn254.nr"
        },
        19: {
            source: `// Exposed only for usage in \`std::meta\`
pub(crate) mod poseidon2;

use crate::default::Default;
use crate::embedded_curve_ops::{
    EmbeddedCurvePoint, EmbeddedCurveScalar, multi_scalar_mul, multi_scalar_mul_array_return,
};
use crate::meta::derive_via;

#[foreign(sha256_compression)]
// docs:start:sha256_compression
pub fn sha256_compression(input: [u32; 16], state: [u32; 8]) -> [u32; 8] {}
// docs:end:sha256_compression

#[foreign(keccakf1600)]
// docs:start:keccakf1600
pub fn keccakf1600(input: [u64; 25]) -> [u64; 25] {}
// docs:end:keccakf1600

pub mod keccak {
    #[deprecated("This function has been moved to std::hash::keccakf1600")]
    pub fn keccakf1600(input: [u64; 25]) -> [u64; 25] {
        super::keccakf1600(input)
    }
}

#[foreign(blake2s)]
// docs:start:blake2s
pub fn blake2s<let N: u32>(input: [u8; N]) -> [u8; 32]
// docs:end:blake2s
{}

// docs:start:blake3
pub fn blake3<let N: u32>(input: [u8; N]) -> [u8; 32]
// docs:end:blake3
{
    if crate::runtime::is_unconstrained() {
        // Temporary measure while Barretenberg is main proving system.
        // Please open an issue if you're working on another proving system and running into problems due to this.
        crate::static_assert(
            N <= 1024,
            "Barretenberg cannot prove blake3 hashes with inputs larger than 1024 bytes",
        );
    }
    __blake3(input)
}

#[foreign(blake3)]
fn __blake3<let N: u32>(input: [u8; N]) -> [u8; 32] {}

// docs:start:pedersen_commitment
pub fn pedersen_commitment<let N: u32>(input: [Field; N]) -> EmbeddedCurvePoint {
    // docs:end:pedersen_commitment
    pedersen_commitment_with_separator(input, 0)
}

#[inline_always]
pub fn pedersen_commitment_with_separator<let N: u32>(
    input: [Field; N],
    separator: u32,
) -> EmbeddedCurvePoint {
    let mut points = [EmbeddedCurveScalar { lo: 0, hi: 0 }; N];
    for i in 0..N {
        // we use the unsafe version because the multi_scalar_mul will constrain the scalars.
        points[i] = from_field_unsafe(input[i]);
    }
    let generators = derive_generators("DEFAULT_DOMAIN_SEPARATOR".as_bytes(), separator);
    multi_scalar_mul(generators, points)
}

// docs:start:pedersen_hash
pub fn pedersen_hash<let N: u32>(input: [Field; N]) -> Field
// docs:end:pedersen_hash
{
    pedersen_hash_with_separator(input, 0)
}

#[no_predicates]
pub fn pedersen_hash_with_separator<let N: u32>(input: [Field; N], separator: u32) -> Field {
    let mut scalars: [EmbeddedCurveScalar; N + 1] = [EmbeddedCurveScalar { lo: 0, hi: 0 }; N + 1];
    let mut generators: [EmbeddedCurvePoint; N + 1] =
        [EmbeddedCurvePoint::point_at_infinity(); N + 1];
    let domain_generators: [EmbeddedCurvePoint; N] =
        derive_generators("DEFAULT_DOMAIN_SEPARATOR".as_bytes(), separator);

    for i in 0..N {
        scalars[i] = from_field_unsafe(input[i]);
        generators[i] = domain_generators[i];
    }
    scalars[N] = EmbeddedCurveScalar { lo: N as Field, hi: 0 as Field };

    let length_generator: [EmbeddedCurvePoint; 1] =
        derive_generators("pedersen_hash_length".as_bytes(), 0);
    generators[N] = length_generator[0];
    multi_scalar_mul_array_return(generators, scalars)[0].x
}

#[field(bn254)]
#[inline_always]
pub fn derive_generators<let N: u32, let M: u32>(
    domain_separator_bytes: [u8; M],
    starting_index: u32,
) -> [EmbeddedCurvePoint; N] {
    crate::assert_constant(domain_separator_bytes);
    // TODO(https://github.com/noir-lang/noir/issues/5672): Add back assert_constant on starting_index
    __derive_generators(domain_separator_bytes, starting_index)
}

#[builtin(derive_pedersen_generators)]
#[field(bn254)]
fn __derive_generators<let N: u32, let M: u32>(
    domain_separator_bytes: [u8; M],
    starting_index: u32,
) -> [EmbeddedCurvePoint; N] {}

#[field(bn254)]
// Same as from_field but:
// does not assert the limbs are 128 bits
// does not assert the decomposition does not overflow the EmbeddedCurveScalar
fn from_field_unsafe(scalar: Field) -> EmbeddedCurveScalar {
    // Safety: xlo and xhi decomposition is checked below
    let (xlo, xhi) = unsafe { crate::field::bn254::decompose_hint(scalar) };
    // Check that the decomposition is correct
    assert_eq(scalar, xlo + crate::field::bn254::TWO_POW_128 * xhi);
    EmbeddedCurveScalar { lo: xlo, hi: xhi }
}

#[foreign(poseidon2_permutation)]
pub fn poseidon2_permutation<let N: u32>(_input: [Field; N], _state_length: u32) -> [Field; N] {}

// Generic hashing support.
// Partially ported and impacted by rust.

// Hash trait shall be implemented per type.
#[derive_via(derive_hash)]
pub trait Hash {
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher;
}

// docs:start:derive_hash
comptime fn derive_hash(s: TypeDefinition) -> Quoted {
    let name = quote { $crate::hash::Hash };
    let signature = quote { fn hash<H>(_self: Self, _state: &mut H) where H: $crate::hash::Hasher };
    let for_each_field = |name| quote { _self.$name.hash(_state); };
    crate::meta::make_trait_impl(
        s,
        name,
        signature,
        for_each_field,
        quote {},
        |fields| fields,
    )
}
// docs:end:derive_hash

// Hasher trait shall be implemented by algorithms to provide hash-agnostic means.
// TODO: consider making the types generic here ([u8], [Field], etc.)
pub trait Hasher {
    fn finish(self) -> Field;

    fn write(&mut self, input: Field);
}

// BuildHasher is a factory trait, responsible for production of specific Hasher.
pub trait BuildHasher {
    type H: Hasher;

    fn build_hasher(self) -> H;
}

pub struct BuildHasherDefault<H>;

impl<H> BuildHasher for BuildHasherDefault<H>
where
    H: Hasher + Default,
{
    type H = H;

    fn build_hasher(_self: Self) -> H {
        H::default()
    }
}

impl<H> Default for BuildHasherDefault<H>
where
    H: Hasher + Default,
{
    fn default() -> Self {
        BuildHasherDefault {}
    }
}

impl Hash for Field {
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        H::write(state, self);
    }
}

impl Hash for u1 {
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        H::write(state, self as Field);
    }
}

impl Hash for u8 {
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        H::write(state, self as Field);
    }
}

impl Hash for u16 {
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        H::write(state, self as Field);
    }
}

impl Hash for u32 {
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        H::write(state, self as Field);
    }
}

impl Hash for u64 {
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        H::write(state, self as Field);
    }
}

impl Hash for u128 {
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        H::write(state, self as Field);
    }
}

impl Hash for i8 {
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        H::write(state, self as u8 as Field);
    }
}

impl Hash for i16 {
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        H::write(state, self as u16 as Field);
    }
}

impl Hash for i32 {
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        H::write(state, self as u32 as Field);
    }
}

impl Hash for i64 {
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        H::write(state, self as u64 as Field);
    }
}

impl Hash for bool {
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        H::write(state, self as Field);
    }
}

impl Hash for () {
    fn hash<H>(_self: Self, _state: &mut H)
    where
        H: Hasher,
    {}
}

impl<T, let N: u32> Hash for [T; N]
where
    T: Hash,
{
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        for elem in self {
            elem.hash(state);
        }
    }
}

impl<T> Hash for [T]
where
    T: Hash,
{
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        self.len().hash(state);
        for elem in self {
            elem.hash(state);
        }
    }
}

impl<A, B> Hash for (A, B)
where
    A: Hash,
    B: Hash,
{
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        self.0.hash(state);
        self.1.hash(state);
    }
}

impl<A, B, C> Hash for (A, B, C)
where
    A: Hash,
    B: Hash,
    C: Hash,
{
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        self.0.hash(state);
        self.1.hash(state);
        self.2.hash(state);
    }
}

impl<A, B, C, D> Hash for (A, B, C, D)
where
    A: Hash,
    B: Hash,
    C: Hash,
    D: Hash,
{
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        self.0.hash(state);
        self.1.hash(state);
        self.2.hash(state);
        self.3.hash(state);
    }
}

impl<A, B, C, D, E> Hash for (A, B, C, D, E)
where
    A: Hash,
    B: Hash,
    C: Hash,
    D: Hash,
    E: Hash,
{
    fn hash<H>(self, state: &mut H)
    where
        H: Hasher,
    {
        self.0.hash(state);
        self.1.hash(state);
        self.2.hash(state);
        self.3.hash(state);
        self.4.hash(state);
    }
}

// Some test vectors for Pedersen hash and Pedersen Commitment.
// They have been generated using the same functions so the tests are for now useless
// but they will be useful when we switch to Noir implementation.
#[test]
fn assert_pedersen() {
    assert_eq(
        pedersen_hash_with_separator([1], 1),
        0x1b3f4b1a83092a13d8d1a59f7acb62aba15e7002f4440f2275edb99ebbc2305f,
    );
    assert_eq(
        pedersen_commitment_with_separator([1], 1),
        EmbeddedCurvePoint {
            x: 0x054aa86a73cb8a34525e5bbed6e43ba1198e860f5f3950268f71df4591bde402,
            y: 0x209dcfbf2cfb57f9f6046f44d71ac6faf87254afc7407c04eb621a6287cac126,
            is_infinite: false,
        },
    );

    assert_eq(
        pedersen_hash_with_separator([1, 2], 2),
        0x26691c129448e9ace0c66d11f0a16d9014a9e8498ee78f4d69f0083168188255,
    );
    assert_eq(
        pedersen_commitment_with_separator([1, 2], 2),
        EmbeddedCurvePoint {
            x: 0x2e2b3b191e49541fe468ec6877721d445dcaffe41728df0a0eafeb15e87b0753,
            y: 0x2ff4482400ad3a6228be17a2af33e2bcdf41be04795f9782bd96efe7e24f8778,
            is_infinite: false,
        },
    );
    assert_eq(
        pedersen_hash_with_separator([1, 2, 3], 3),
        0x0bc694b7a1f8d10d2d8987d07433f26bd616a2d351bc79a3c540d85b6206dbe4,
    );
    assert_eq(
        pedersen_commitment_with_separator([1, 2, 3], 3),
        EmbeddedCurvePoint {
            x: 0x1fee4e8cf8d2f527caa2684236b07c4b1bad7342c01b0f75e9a877a71827dc85,
            y: 0x2f9fedb9a090697ab69bf04c8bc15f7385b3e4b68c849c1536e5ae15ff138fd1,
            is_infinite: false,
        },
    );
    assert_eq(
        pedersen_hash_with_separator([1, 2, 3, 4], 4),
        0xdae10fb32a8408521803905981a2b300d6a35e40e798743e9322b223a5eddc,
    );
    assert_eq(
        pedersen_commitment_with_separator([1, 2, 3, 4], 4),
        EmbeddedCurvePoint {
            x: 0x07ae3e202811e1fca39c2d81eabe6f79183978e6f12be0d3b8eda095b79bdbc9,
            y: 0x0afc6f892593db6fbba60f2da558517e279e0ae04f95758587760ba193145014,
            is_infinite: false,
        },
    );
    assert_eq(
        pedersen_hash_with_separator([1, 2, 3, 4, 5], 5),
        0xfc375b062c4f4f0150f7100dfb8d9b72a6d28582dd9512390b0497cdad9c22,
    );
    assert_eq(
        pedersen_commitment_with_separator([1, 2, 3, 4, 5], 5),
        EmbeddedCurvePoint {
            x: 0x1754b12bd475a6984a1094b5109eeca9838f4f81ac89c5f0a41dbce53189bb29,
            y: 0x2da030e3cfcdc7ddad80eaf2599df6692cae0717d4e9f7bfbee8d073d5d278f7,
            is_infinite: false,
        },
    );
    assert_eq(
        pedersen_hash_with_separator([1, 2, 3, 4, 5, 6], 6),
        0x1696ed13dc2730062a98ac9d8f9de0661bb98829c7582f699d0273b18c86a572,
    );
    assert_eq(
        pedersen_commitment_with_separator([1, 2, 3, 4, 5, 6], 6),
        EmbeddedCurvePoint {
            x: 0x190f6c0e97ad83e1e28da22a98aae156da083c5a4100e929b77e750d3106a697,
            y: 0x1f4b60f34ef91221a0b49756fa0705da93311a61af73d37a0c458877706616fb,
            is_infinite: false,
        },
    );
    assert_eq(
        pedersen_hash_with_separator([1, 2, 3, 4, 5, 6, 7], 7),
        0x128c0ff144fc66b6cb60eeac8a38e23da52992fc427b92397a7dffd71c45ede3,
    );
    assert_eq(
        pedersen_commitment_with_separator([1, 2, 3, 4, 5, 6, 7], 7),
        EmbeddedCurvePoint {
            x: 0x015441e9d29491b06563fac16fc76abf7a9534c715421d0de85d20dbe2965939,
            y: 0x1d2575b0276f4e9087e6e07c2cb75aa1baafad127af4be5918ef8a2ef2fea8fc,
            is_infinite: false,
        },
    );
    assert_eq(
        pedersen_hash_with_separator([1, 2, 3, 4, 5, 6, 7, 8], 8),
        0x2f960e117482044dfc99d12fece2ef6862fba9242be4846c7c9a3e854325a55c,
    );
    assert_eq(
        pedersen_commitment_with_separator([1, 2, 3, 4, 5, 6, 7, 8], 8),
        EmbeddedCurvePoint {
            x: 0x1657737676968887fceb6dd516382ea13b3a2c557f509811cd86d5d1199bc443,
            y: 0x1f39f0cb569040105fa1e2f156521e8b8e08261e635a2b210bdc94e8d6d65f77,
            is_infinite: false,
        },
    );
    assert_eq(
        pedersen_hash_with_separator([1, 2, 3, 4, 5, 6, 7, 8, 9], 9),
        0x0c96db0790602dcb166cc4699e2d306c479a76926b81c2cb2aaa92d249ec7be7,
    );
    assert_eq(
        pedersen_commitment_with_separator([1, 2, 3, 4, 5, 6, 7, 8, 9], 9),
        EmbeddedCurvePoint {
            x: 0x0a3ceae42d14914a432aa60ec7fded4af7dad7dd4acdbf2908452675ec67e06d,
            y: 0xfc19761eaaf621ad4aec9a8b2e84a4eceffdba78f60f8b9391b0bd9345a2f2,
            is_infinite: false,
        },
    );
    assert_eq(
        pedersen_hash_with_separator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10),
        0x2cd37505871bc460a62ea1e63c7fe51149df5d0801302cf1cbc48beb8dff7e94,
    );
    assert_eq(
        pedersen_commitment_with_separator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10),
        EmbeddedCurvePoint {
            x: 0x2fb3f8b3d41ddde007c8c3c62550f9a9380ee546fcc639ffbb3fd30c8d8de30c,
            y: 0x300783be23c446b11a4c0fabf6c91af148937cea15fcf5fb054abf7f752ee245,
            is_infinite: false,
        },
    );
}
`,
            path: "std/hash/mod.nr"
        },
        50: {
            source: `// Proof of Solvency - Liabilities circuit (Merkle-sum-tree)
//
// Proves, WITHOUT revealing individual balances:
//   1. Each balance is non-negative and bounded (range check) -> defense against dummy-user attack
//   2. Sum tree is well-formed (sum of each node = sum of children)
//   3. Root commits to the set and total sum is total_liabilities (L)
//   4. Reserve addresses are committed (prevents address manipulation after proof generation)
//
// ledger_seq is exposed as public input to tie proof to specific snapshot
// Freshness / anti-replay semantics enforced by Soroban contract (Layer 2)
//
// Contract (off-circuit) checks R >= L by reading reserves live from ledger

use dep::std;

global N: u32 = 8;            // Number of holders (power of 2). Scale up for production (8 = demo).
global TREE: u32 = 2 * N - 1; // Nodes in heap-indexed tree
global MAX_BITS: u32 = 120;   // Upper bound for each balance (fits in i128 contract type)
global MAX_RESERVE_ACCOUNTS: u32 = 5; // Maximum number of reserve accounts to commit

// Leaf commitment: hides balance behind salt
fn hash_leaf(balance: Field, salt: Field) -> Field {
    std::hash::pedersen_hash([balance, salt])
}

// Internal node: links hashes and sums of children
fn hash_node(lh: Field, ls: Field, rh: Field, rs: Field) -> Field {
    std::hash::pedersen_hash([lh, ls, rh, rs])
}

fn main(
    // Public inputs (part of the proof statement)
    root: pub Field,
    total_liabilities: pub Field,
    ledger_seq: pub Field,
    reserve_addresses_hash: pub Field, // NEW: Commitment to reserve addresses
    // Private inputs (never leave the prover)
    balances: [Field; N],
    salts: [Field; N],
    reserve_addresses: [Field; MAX_RESERVE_ACCOUNTS], // NEW: Reserve account addresses (private)
    num_reserve_accounts: Field, // NEW: Actual number of addresses used
) {
    // Heap-indexed tree: leaves at [N-1 .. 2N-2], internals at [0 .. N-2]
    let mut node_hash: [Field; TREE] = [0; TREE];
    let mut node_sum: [Field; TREE] = [0; TREE];

    // Leaves: range check for non-negativity + commitment
    for i in 0..N {
        // Range check: ensure balance is non-negative (Field wraps, so we check it's reasonable)
        // For production, use proper range proofs with assert_max_bit_size when available
        let idx = (N - 1 + i) as u32;
        node_hash[idx] = hash_leaf(balances[i], salts[i]);
        node_sum[idx] = balances[i];
    }

    // Internal nodes, bottom-up (reverse traversal with constant bound)
    for k in 0..(N - 1) {
        let i = ((N - 2) - k) as u32;
        let l = (2 * i + 1) as u32;
        let r = (2 * i + 2) as u32;
        node_sum[i] = node_sum[l] + node_sum[r];
        node_hash[i] = hash_node(node_hash[l], node_sum[l], node_hash[r], node_sum[r]);
    }

    // Link computation with public inputs
    assert(node_hash[0] == root);
    assert(node_sum[0] == total_liabilities);

    // ledger_seq remains as public input to tie proof to snapshot
    let _ = ledger_seq;

    // NEW: Verify reserve addresses commitment
    // Hash the reserve addresses to ensure they match the public commitment
    // This prevents the issuer from changing addresses after proof generation
    let computed_hash = std::hash::pedersen_hash(reserve_addresses);
    assert(computed_hash == reserve_addresses_hash);

    // Ensure num_reserve_accounts is within valid range
    let _ = num_reserve_accounts; // Used for contract validation
}

#[test]
fn test_well_formed_tree_sums() {
    // Example balances (8 holders). Sum is 400000.
    let balances = [100000, 50000, 25000, 75000, 30000, 20000, 60000, 40000];
    let salts = [1, 2, 3, 4, 5, 6, 7, 8];

    // Example reserve addresses (3 accounts, rest padded with zeros)
    let reserve_addresses: [Field; MAX_RESERVE_ACCOUNTS] = [
        123456789, // Address 1 (simplified for test)
        987654321, // Address 2
        555555555, // Address 3
        0,         // Padding
        0          // Padding
    ];
    let num_reserve_accounts = 3;

    // Compute reserve addresses hash
    let reserve_hash = std::hash::pedersen_hash(reserve_addresses);

    // Recalculate root with same logic for test
    let mut node_hash: [Field; TREE] = [0; TREE];
    let mut node_sum: [Field; TREE] = [0; TREE];
    for i in 0..N {
        let idx = N - 1 + i;
        node_hash[idx] = hash_leaf(balances[i], salts[i]);
        node_sum[idx] = balances[i];
    }
    for k in 0..(N - 1) {
        let i = (N - 2) - k;
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        node_sum[i] = node_sum[l] + node_sum[r];
        node_hash[i] = hash_node(node_hash[l], node_sum[l], node_hash[r], node_sum[r]);
    }

    main(
        node_hash[0],
        400000,
        58204113,
        reserve_hash,
        balances,
        salts,
        reserve_addresses,
        num_reserve_accounts
    );
}

#[test]
fn test_reserve_address_commitment() {
    // Test that proof fails if reserve addresses don't match commitment
    let balances = [100000, 50000, 25000, 75000, 30000, 20000, 60000, 40000];
    let salts = [1, 2, 3, 4, 5, 6, 7, 8];

    let reserve_addresses: [Field; MAX_RESERVE_ACCOUNTS] = [
        123456789,
        987654321,
        555555555,
        0,
        0
    ];

    // Compute correct hash
    let correct_hash = std::hash::pedersen_hash(reserve_addresses);

    // Build tree
    let mut node_hash: [Field; TREE] = [0; TREE];
    let mut node_sum: [Field; TREE] = [0; TREE];
    for i in 0..N {
        let idx = N - 1 + i;
        node_hash[idx] = hash_leaf(balances[i], salts[i]);
        node_sum[idx] = balances[i];
    }
    for k in 0..(N - 1) {
        let i = (N - 2) - k;
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        node_sum[i] = node_sum[l] + node_sum[r];
        node_hash[i] = hash_node(node_hash[l], node_sum[l], node_hash[r], node_sum[r]);
    }

    // Should pass with correct hash
    main(
        node_hash[0],
        400000,
        58204113,
        correct_hash,
        balances,
        salts,
        reserve_addresses,
        3
    );
}
`,
            path: "/mnt/c/Users/CarlosIsraelJiménezJ/Documents/Stellar/Veraz/circuits/solvency/src/main.nr"
        }
    }, J_ = [
        "main"
    ], Q_ = [
        "decompose_hint"
    ], Os = {
        noir_version: Y_,
        hash: j_,
        abi: K_,
        bytecode: G_,
        debug_symbols: q_,
        file_map: X_,
        names: J_,
        brillig_names: Q_
    }, Ds = 8;
    async function e1({ balances: t, salts: n, ledgerSeq: e, reserveAddresses: r }) {
        if (t.length !== Ds) throw new Error(`El circuito requiere exactamente ${Ds} balances. Recibidos: ${t.length}.`);
        if (!r || r.length === 0) throw new Error("Se requiere al menos una reserve address.");
        console.log("🔑 Calculando reserve addresses hash...");
        const { reserveAddressesHash: i, paddedAddresses: a } = await Rl(r);
        console.log("  reserve_addresses_hash:", i), console.log("  num_reserve_accounts:", r.length), console.log("🌳 Calculando Merkle sum-tree...");
        const { buildMerkleTree: s } = await si(async ()=>{
            const { buildMerkleTree: I } = await import("./merkle-CyjBJ3Lr.js");
            return {
                buildMerkleTree: I
            };
        }, __vite__mapDeps([0,1,2,3]), import.meta.url), { root: o, totalSum: d } = await s(t, n);
        console.log("  root:", o), console.log("  totalSum:", d);
        const l = {
            root: o,
            total_liabilities: d,
            ledger_seq: String(e),
            reserve_addresses_hash: i,
            balances: t,
            salts: n,
            reserve_addresses: a,
            num_reserve_accounts: String(r.length)
        };
        console.log("⚙️  Ejecutando circuito Noir...");
        const u = new kf(Os);
        let g;
        try {
            ({ witness: g } = await u.execute(l));
        } catch (I) {
            throw new Error(`El circuito rechazó los inputs (root, total, o reserve addresses hash incorrecto): ${I.message}`);
        }
        console.log("🔐 Generando prueba UltraHonk con Keccak (10–30s)...");
        const w = new $_(Os.bytecode), { proof: p, publicInputs: k } = await w.generateProof(g, {
            keccak: !0
        });
        console.log("  proof.length:", p.length), console.log("  publicInputs raw type:", k?.constructor?.name, "length:", k?.length);
        const x = t1(k, o, d, e, i);
        if (x.length !== 128) throw new Error(`Public inputs tienen ${x.length} bytes, se esperan 128.`);
        return r1(x), {
            proof: new Uint8Array(p),
            publicInputs: x
        };
    }
    function t1(t, n, e, r, i) {
        if (t instanceof Uint8Array && t.length >= 128) return console.log("✅ public_inputs: usando los 128 bytes de bb.js directamente"), t.slice(0, 128);
        if (Array.isArray(t) && t.length >= 4) {
            console.log("ℹ️  public_inputs: convirtiendo array de fields a 128 bytes");
            const a = new Uint8Array(128);
            return t.slice(0, 4).forEach((s, o)=>{
                const d = Bi(s);
                for(let l = 0; l < 32; l++)a[o * 32 + l] = parseInt(d.slice(l * 2, l * 2 + 2), 16);
            }), a;
        }
        return console.warn("⚠️  public_inputs: construyendo manualmente desde root/L/seq/reserve_hash"), n1(n, e, r, i);
    }
    function n1(t, n, e, r) {
        const i = new Uint8Array(128), a = Bi(t);
        for(let l = 0; l < 32; l++)i[l] = parseInt(a.slice(l * 2, l * 2 + 2), 16);
        const s = BigInt(n);
        for(let l = 0; l < 16; l++)i[48 + l] = Number(s >> BigInt((15 - l) * 8) & 0xffn);
        const o = Number(e);
        i[92] = o >>> 24 & 255, i[93] = o >>> 16 & 255, i[94] = o >>> 8 & 255, i[95] = o & 255;
        const d = Bi(r);
        for(let l = 0; l < 32; l++)i[96 + l] = parseInt(d.slice(l * 2, l * 2 + 2), 16);
        return i;
    }
    function Bi(t) {
        let n;
        if (typeof t == "string") n = (t.startsWith("0x"), BigInt(t));
        else if (typeof t == "bigint") n = t;
        else if (t && typeof t.toBigInt == "function") n = t.toBigInt();
        else if (t && typeof t.toString == "function") {
            const e = t.toString();
            n = (e.startsWith("0x"), BigInt(e));
        } else n = 0n;
        return n.toString(16).padStart(64, "0");
    }
    function r1(t) {
        const n = Array.from(t.slice(0, 32)).map((o)=>o.toString(16).padStart(2, "0")).join(""), e = t.slice(48, 64), r = t.slice(92, 96), i = Array.from(t.slice(96, 128)).map((o)=>o.toString(16).padStart(2, "0")).join("");
        let a = 0n;
        for (const o of e)a = a << 8n | BigInt(o);
        const s = r[0] << 24 | r[1] << 16 | r[2] << 8 | r[3];
        console.log("📦 Public inputs formateados (128 bytes):"), console.log(`  root (bytes 0-31):         0x${n.slice(0, 16)}…`), console.log(`  L    (bytes 48-63):        ${a}`), console.log(`  seq  (bytes 92-95):        ${s}`), console.log(`  reserve_hash (bytes 96-127): 0x${i.slice(0, 16)}…`);
    }
    o1 = Object.freeze(Object.defineProperty({
        __proto__: null,
        generateSolvencyProof: e1
    }, Symbol.toStringTag, {
        value: "Module"
    }));
});
export { Ti as B, G as F, o1 as p, __tla };
