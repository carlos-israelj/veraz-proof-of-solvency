const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./merkle-BsrW8myZ.js","./index-BqP13VZt.js","./index-CmOZt9DE.css"])))=>i.map(i=>d[i]);
import { _ as si, __tla as __tla_0 } from "./index-BqP13VZt.js";
let Bi, K, a1;
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
    const Ds = typeof TextDecoder < "u" ? new TextDecoder("utf-8", {
        ignoreBOM: !0,
        fatal: !0
    }) : {
        decode: ()=>{
            throw Error("TextDecoder not available");
        }
    };
    typeof TextDecoder < "u" && Ds.decode();
    let fn = null;
    function Lt() {
        return (fn === null || fn.byteLength === 0) && (fn = new Uint8Array(re.memory.buffer)), fn;
    }
    function Ot(t, n) {
        return t = t >>> 0, Ds.decode(Lt().subarray(t, t + n));
    }
    let St = 0;
    const er = typeof TextEncoder < "u" ? new TextEncoder("utf-8") : {
        encode: ()=>{
            throw Error("TextEncoder not available");
        }
    }, Rl = typeof er.encodeInto == "function" ? function(t, n) {
        return er.encodeInto(t, n);
    } : function(t, n) {
        const e = er.encode(t);
        return n.set(e), {
            read: t.length,
            written: e.length
        };
    };
    function Cr(t, n, e) {
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
            const o = Lt().subarray(i + s, i + r), d = Rl(t, o);
            s += d.written, i = e(i, r, s, 1) >>> 0;
        }
        return St = s, i;
    }
    let gt = null;
    function at() {
        return (gt === null || gt.buffer.detached === !0 || gt.buffer.detached === void 0 && gt.buffer !== re.memory.buffer) && (gt = new DataView(re.memory.buffer)), gt;
    }
    function pt(t) {
        return t == null;
    }
    const Wi = typeof FinalizationRegistry > "u" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((t)=>{
        re.__wbindgen_export_6.get(t.dtor)(t.a, t.b);
    });
    function Nl(t, n, e, r) {
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
                --i.cnt === 0 ? (re.__wbindgen_export_6.get(i.dtor)(o, i.b), Wi.unregister(i)) : i.a = o;
            }
        };
        return a.original = i, Wi.register(a, i, i), a;
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
    function Ol(t) {
        const n = re.__wbindgen_export_2.get(t);
        return re.__externref_table_dealloc(t), n;
    }
    function Dl(t, n) {
        return t = t >>> 0, Lt().subarray(t / 1, t / 1 + n);
    }
    function Fl(t, n) {
        const e = n(t.length * 1, 1) >>> 0;
        return Lt().set(t, e / 1), St = t.length, e;
    }
    function Hl(t) {
        const n = re.compressWitnessStack(t);
        if (n[3]) throw Ol(n[2]);
        var e = Dl(n[0], n[1]).slice();
        return re.__wbindgen_free(n[0], n[1] * 1, 1), e;
    }
    function zl(t, n, e) {
        const r = Fl(t, re.__wbindgen_malloc), i = St;
        return re.executeProgram(r, i, n, e);
    }
    function Zl(t, n, e) {
        re.closure646_externref_shim(t, n, e);
    }
    function $l(t, n, e, r, i) {
        re.closure1311_externref_shim(t, n, e, r, i);
    }
    function Vi(t, n, e, r) {
        re.closure1315_externref_shim(t, n, e, r);
    }
    async function Ll(t, n) {
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
    function Ml() {
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
                        return $l(l, i.b, s, o, d);
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
                        return Vi(d, i.b, s, o);
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
                        return Vi(d, r.b, s, o);
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
            const r = e.stack, i = Cr(r, re.__wbindgen_malloc, re.__wbindgen_realloc), a = St;
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
            return Nl(n, e, 647, Zl);
        }, t.wbg.__wbindgen_debug_string = function(n, e) {
            const r = oi(e), i = Cr(r, re.__wbindgen_malloc, re.__wbindgen_realloc), a = St;
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
            var a = pt(i) ? 0 : Cr(i, re.__wbindgen_malloc, re.__wbindgen_realloc), s = St;
            at().setInt32(n + 4 * 1, s, !0), at().setInt32(n + 4 * 0, a, !0);
        }, t.wbg.__wbindgen_string_new = function(n, e) {
            return Ot(n, e);
        }, t.wbg.__wbindgen_throw = function(n, e) {
            throw new Error(Ot(n, e));
        }, t;
    }
    function Pl(t, n) {
        return re = t.exports, Fs.__wbindgen_wasm_module = n, gt = null, fn = null, re.__wbindgen_start(), re;
    }
    async function Fs(t) {
        if (re !== void 0) return re;
        typeof t < "u" && (Object.getPrototypeOf(t) === Object.prototype ? { module_or_path: t } = t : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), typeof t > "u" && (t = new URL("" + new URL("acvm_js_bg-BvxvrAml.wasm", import.meta.url).href, import.meta.url));
        const n = Ml();
        (typeof t == "string" || typeof Request == "function" && t instanceof Request || typeof URL == "function" && t instanceof URL) && (t = fetch(t));
        const { instance: e, module: r } = await Ll(await t, n);
        return Pl(e, r);
    }
    let _e;
    const Hs = typeof TextDecoder < "u" ? new TextDecoder("utf-8", {
        ignoreBOM: !0,
        fatal: !0
    }) : {
        decode: ()=>{
            throw Error("TextDecoder not available");
        }
    };
    typeof TextDecoder < "u" && Hs.decode();
    let un = null;
    function tr() {
        return (un === null || un.byteLength === 0) && (un = new Uint8Array(_e.memory.buffer)), un;
    }
    function $n(t, n) {
        return t = t >>> 0, Hs.decode(tr().subarray(t, t + n));
    }
    function zs(t) {
        const n = _e.__externref_table_alloc();
        return _e.__wbindgen_export_3.set(n, t), n;
    }
    function Yi(t, n) {
        try {
            return t.apply(this, n);
        } catch (e) {
            const r = zs(e);
            _e.__wbindgen_exn_store(r);
        }
    }
    let lr = 0;
    const nr = typeof TextEncoder < "u" ? new TextEncoder("utf-8") : {
        encode: ()=>{
            throw Error("TextEncoder not available");
        }
    }, Wl = typeof nr.encodeInto == "function" ? function(t, n) {
        return nr.encodeInto(t, n);
    } : function(t, n) {
        const e = nr.encode(t);
        return n.set(e), {
            read: t.length,
            written: e.length
        };
    };
    function Gi(t, n, e) {
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
            const o = tr().subarray(i + s, i + r), d = Wl(t, o);
            s += d.written, i = e(i, r, s, 1) >>> 0;
        }
        return lr = s, i;
    }
    let mt = null;
    function Dt() {
        return (mt === null || mt.buffer.detached === !0 || mt.buffer.detached === void 0 && mt.buffer !== _e.memory.buffer) && (mt = new DataView(_e.memory.buffer)), mt;
    }
    function rr(t) {
        return t == null;
    }
    function Gt(t) {
        const n = _e.__wbindgen_export_3.get(t);
        return _e.__externref_table_dealloc(t), n;
    }
    function Vl(t, n, e) {
        const r = _e.abiEncode(t, n, rr(e) ? 0 : zs(e));
        if (r[2]) throw Gt(r[1]);
        return Gt(r[0]);
    }
    function Yl(t, n) {
        const e = _e.abiDecode(t, n);
        if (e[2]) throw Gt(e[1]);
        return Gt(e[0]);
    }
    function Gl(t, n) {
        const e = _e.abiDecodeError(t, n);
        if (e[2]) throw Gt(e[1]);
        return Gt(e[0]);
    }
    function jl(t, n, e, r) {
        _e.closure245_externref_shim(t, n, e, r);
    }
    async function Kl(t, n) {
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
    function ql() {
        const t = {};
        return t.wbg = {}, t.wbg.__wbg_constructor_55ed424879ec3895 = function(n) {
            return new Error(n);
        }, t.wbg.__wbg_error_7534b8e9a36f1ab4 = function(n, e) {
            let r, i;
            try {
                r = n, i = e, console.error($n(n, e));
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
                        return jl(d, i.b, s, o);
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
            return Yi(function(n, e) {
                return JSON.parse($n(n, e));
            }, arguments);
        }, t.wbg.__wbg_set_8fc6bf8a5b1071d1 = function(n, e, r) {
            return n.set(e, r);
        }, t.wbg.__wbg_stack_0ed75d68575b0f3c = function(n, e) {
            const r = e.stack, i = Gi(r, _e.__wbindgen_malloc, _e.__wbindgen_realloc), a = lr;
            Dt().setInt32(n + 4 * 1, a, !0), Dt().setInt32(n + 4 * 0, i, !0);
        }, t.wbg.__wbg_stringify_f7ed6987935b4a24 = function() {
            return Yi(function(n) {
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
            var a = rr(i) ? 0 : Gi(i, _e.__wbindgen_malloc, _e.__wbindgen_realloc), s = lr;
            Dt().setInt32(n + 4 * 1, s, !0), Dt().setInt32(n + 4 * 0, a, !0);
        }, t.wbg.__wbindgen_string_new = function(n, e) {
            return $n(n, e);
        }, t.wbg.__wbindgen_throw = function(n, e) {
            throw new Error($n(n, e));
        }, t;
    }
    function Xl(t, n) {
        return _e = t.exports, li.__wbindgen_wasm_module = n, mt = null, un = null, _e.__wbindgen_start(), _e;
    }
    async function li(t) {
        if (_e !== void 0) return _e;
        typeof t < "u" && (Object.getPrototypeOf(t) === Object.prototype ? { module_or_path: t } = t : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), typeof t > "u" && (t = new URL("" + new URL("noirc_abi_wasm_bg-DRbWm09M.wasm", import.meta.url).href, import.meta.url));
        const n = ql();
        (typeof t == "string" || typeof Request == "function" && t instanceof Request || typeof URL == "function" && t instanceof URL) && (t = fetch(t));
        const { instance: e, module: r } = await Kl(await t, n);
        return Xl(e, r);
    }
    function Zs(t) {
        if (typeof Buffer < "u") return Buffer.from(t, "base64");
        if (typeof atob == "function") return Uint8Array.from(atob(t), (n)=>n.charCodeAt(0));
        throw new Error("No implementation found for base64 decoding.");
    }
    function Xt(t) {
        let n = t.length;
        for(; --n >= 0;)t[n] = 0;
    }
    const Ql = 3, Jl = 258, $s = 29, ec = 256, tc = ec + 1 + $s, Ls = 30, nc = 512, rc = new Array((tc + 2) * 2);
    Xt(rc);
    const ic = new Array(Ls * 2);
    Xt(ic);
    const ac = new Array(nc);
    Xt(ac);
    const sc = new Array(Jl - Ql + 1);
    Xt(sc);
    const oc = new Array($s);
    Xt(oc);
    const lc = new Array(Ls);
    Xt(lc);
    const cc = (t, n, e, r)=>{
        let i = t & 65535 | 0, a = t >>> 16 & 65535 | 0, s = 0;
        for(; e !== 0;){
            s = e > 2e3 ? 2e3 : e, e -= s;
            do i = i + n[r++] | 0, a = a + i | 0;
            while (--s);
            i %= 65521, a %= 65521;
        }
        return i | a << 16 | 0;
    };
    var ci = cc;
    const fc = ()=>{
        let t, n = [];
        for(var e = 0; e < 256; e++){
            t = e;
            for(var r = 0; r < 8; r++)t = t & 1 ? 3988292384 ^ t >>> 1 : t >>> 1;
            n[e] = t;
        }
        return n;
    }, uc = new Uint32Array(fc()), hc = (t, n, e, r)=>{
        const i = uc, a = r + e;
        t ^= -1;
        for(let s = r; s < a; s++)t = t >>> 8 ^ i[(t ^ n[s]) & 255];
        return t ^ -1;
    };
    var Me = hc, fi = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version"
    }, Ms = {
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
    const dc = (t, n)=>Object.prototype.hasOwnProperty.call(t, n);
    var _c = function(t) {
        const n = Array.prototype.slice.call(arguments, 1);
        for(; n.length;){
            const e = n.shift();
            if (e) {
                if (typeof e != "object") throw new TypeError(e + "must be non-object");
                for(const r in e)dc(e, r) && (t[r] = e[r]);
            }
        }
        return t;
    }, pc = (t)=>{
        let n = 0;
        for(let r = 0, i = t.length; r < i; r++)n += t[r].length;
        const e = new Uint8Array(n);
        for(let r = 0, i = 0, a = t.length; r < a; r++){
            let s = t[r];
            e.set(s, i), i += s.length;
        }
        return e;
    }, Ps = {
        assign: _c,
        flattenChunks: pc
    };
    let Ws = !0;
    try {
        String.fromCharCode.apply(null, new Uint8Array(1));
    } catch  {
        Ws = !1;
    }
    const En = new Uint8Array(256);
    for(let t = 0; t < 256; t++)En[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
    En[254] = En[255] = 1;
    var wc = (t)=>{
        if (typeof TextEncoder == "function" && TextEncoder.prototype.encode) return new TextEncoder().encode(t);
        let n, e, r, i, a, s = t.length, o = 0;
        for(i = 0; i < s; i++)e = t.charCodeAt(i), (e & 64512) === 55296 && i + 1 < s && (r = t.charCodeAt(i + 1), (r & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (r - 56320), i++)), o += e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4;
        for(n = new Uint8Array(o), a = 0, i = 0; a < o; i++)e = t.charCodeAt(i), (e & 64512) === 55296 && i + 1 < s && (r = t.charCodeAt(i + 1), (r & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (r - 56320), i++)), e < 128 ? n[a++] = e : e < 2048 ? (n[a++] = 192 | e >>> 6, n[a++] = 128 | e & 63) : e < 65536 ? (n[a++] = 224 | e >>> 12, n[a++] = 128 | e >>> 6 & 63, n[a++] = 128 | e & 63) : (n[a++] = 240 | e >>> 18, n[a++] = 128 | e >>> 12 & 63, n[a++] = 128 | e >>> 6 & 63, n[a++] = 128 | e & 63);
        return n;
    };
    const gc = (t, n)=>{
        if (n < 65534 && t.subarray && Ws) return String.fromCharCode.apply(null, t.length === n ? t : t.subarray(0, n));
        let e = "";
        for(let r = 0; r < n; r++)e += String.fromCharCode(t[r]);
        return e;
    };
    var mc = (t, n)=>{
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
    }, bc = (t, n)=>{
        n = n || t.length, n > t.length && (n = t.length);
        let e = n - 1;
        for(; e >= 0 && (t[e] & 192) === 128;)e--;
        return e < 0 || e === 0 ? n : e + En[t[e]] > n ? e : n;
    }, ui = {
        string2buf: wc,
        buf2string: mc,
        utf8border: bc
    };
    function yc() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
    }
    var Ec = yc;
    const Ln = 16209, kc = 16191;
    var Sc = function(n, e) {
        let r, i, a, s, o, d, l, u, m, w, p, k, x, A, B, D, U, g, F, V, T, P, z, R;
        const H = n.state;
        r = n.next_in, z = n.input, i = r + (n.avail_in - 5), a = n.next_out, R = n.output, s = a - (e - n.avail_out), o = a + (n.avail_out - 257), d = H.dmax, l = H.wsize, u = H.whave, m = H.wnext, w = H.window, p = H.hold, k = H.bits, x = H.lencode, A = H.distcode, B = (1 << H.lenbits) - 1, D = (1 << H.distbits) - 1;
        e: do {
            k < 15 && (p += z[r++] << k, k += 8, p += z[r++] << k, k += 8), U = x[p & B];
            t: for(;;){
                if (g = U >>> 24, p >>>= g, k -= g, g = U >>> 16 & 255, g === 0) R[a++] = U & 65535;
                else if (g & 16) {
                    F = U & 65535, g &= 15, g && (k < g && (p += z[r++] << k, k += 8), F += p & (1 << g) - 1, p >>>= g, k -= g), k < 15 && (p += z[r++] << k, k += 8, p += z[r++] << k, k += 8), U = A[p & D];
                    n: for(;;){
                        if (g = U >>> 24, p >>>= g, k -= g, g = U >>> 16 & 255, g & 16) {
                            if (V = U & 65535, g &= 15, k < g && (p += z[r++] << k, k += 8, k < g && (p += z[r++] << k, k += 8)), V += p & (1 << g) - 1, V > d) {
                                n.msg = "invalid distance too far back", H.mode = Ln;
                                break e;
                            }
                            if (p >>>= g, k -= g, g = a - s, V > g) {
                                if (g = V - g, g > u && H.sane) {
                                    n.msg = "invalid distance too far back", H.mode = Ln;
                                    break e;
                                }
                                if (T = 0, P = w, m === 0) {
                                    if (T += l - g, g < F) {
                                        F -= g;
                                        do R[a++] = w[T++];
                                        while (--g);
                                        T = a - V, P = R;
                                    }
                                } else if (m < g) {
                                    if (T += l + m - g, g -= m, g < F) {
                                        F -= g;
                                        do R[a++] = w[T++];
                                        while (--g);
                                        if (T = 0, m < F) {
                                            g = m, F -= g;
                                            do R[a++] = w[T++];
                                            while (--g);
                                            T = a - V, P = R;
                                        }
                                    }
                                } else if (T += m - g, g < F) {
                                    F -= g;
                                    do R[a++] = w[T++];
                                    while (--g);
                                    T = a - V, P = R;
                                }
                                for(; F > 2;)R[a++] = P[T++], R[a++] = P[T++], R[a++] = P[T++], F -= 3;
                                F && (R[a++] = P[T++], F > 1 && (R[a++] = P[T++]));
                            } else {
                                T = a - V;
                                do R[a++] = R[T++], R[a++] = R[T++], R[a++] = R[T++], F -= 3;
                                while (F > 2);
                                F && (R[a++] = R[T++], F > 1 && (R[a++] = R[T++]));
                            }
                        } else if (g & 64) {
                            n.msg = "invalid distance code", H.mode = Ln;
                            break e;
                        } else {
                            U = A[(U & 65535) + (p & (1 << g) - 1)];
                            continue n;
                        }
                        break;
                    }
                } else if (g & 64) if (g & 32) {
                    H.mode = kc;
                    break e;
                } else {
                    n.msg = "invalid literal/length code", H.mode = Ln;
                    break e;
                }
                else {
                    U = x[(U & 65535) + (p & (1 << g) - 1)];
                    continue t;
                }
                break;
            }
        }while (r < i && a < o);
        F = k >> 3, r -= F, k -= F << 3, p &= (1 << k) - 1, n.next_in = r, n.next_out = a, n.avail_in = r < i ? 5 + (i - r) : 5 - (r - i), n.avail_out = a < o ? 257 + (o - a) : 257 - (a - o), H.hold = p, H.bits = k;
    };
    const Ft = 15, ji = 852, Ki = 592, qi = 0, Rr = 1, Xi = 2, vc = new Uint16Array([
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
    ]), xc = new Uint8Array([
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
    ]), Ac = new Uint8Array([
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
        let l = 0, u = 0, m = 0, w = 0, p = 0, k = 0, x = 0, A = 0, B = 0, D = 0, U, g, F, V, T, P = null, z;
        const R = new Uint16Array(Ft + 1), H = new Uint16Array(Ft + 1);
        let ae = null, S, $, O;
        for(l = 0; l <= Ft; l++)R[l] = 0;
        for(u = 0; u < r; u++)R[n[e + u]]++;
        for(p = d, w = Ft; w >= 1 && R[w] === 0; w--);
        if (p > w && (p = w), w === 0) return i[a++] = 1 << 24 | 64 << 16 | 0, i[a++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
        for(m = 1; m < w && R[m] === 0; m++);
        for(p < m && (p = m), A = 1, l = 1; l <= Ft; l++)if (A <<= 1, A -= R[l], A < 0) return -1;
        if (A > 0 && (t === qi || w !== 1)) return -1;
        for(H[1] = 0, l = 1; l < Ft; l++)H[l + 1] = H[l] + R[l];
        for(u = 0; u < r; u++)n[e + u] !== 0 && (s[H[n[e + u]]++] = u);
        if (t === qi ? (P = ae = s, z = 20) : t === Rr ? (P = vc, ae = xc, z = 257) : (P = Ic, ae = Ac, z = 0), D = 0, u = 0, l = m, T = a, k = p, x = 0, F = -1, B = 1 << p, V = B - 1, t === Rr && B > ji || t === Xi && B > Ki) return 1;
        for(;;){
            S = l - x, s[u] + 1 < z ? ($ = 0, O = s[u]) : s[u] >= z ? ($ = ae[s[u] - z], O = P[s[u] - z]) : ($ = 96, O = 0), U = 1 << l - x, g = 1 << k, m = g;
            do g -= U, i[T + (D >> x) + g] = S << 24 | $ << 16 | O | 0;
            while (g !== 0);
            for(U = 1 << l - 1; D & U;)U >>= 1;
            if (U !== 0 ? (D &= U - 1, D += U) : D = 0, u++, --R[l] === 0) {
                if (l === w) break;
                l = n[e + s[u]];
            }
            if (l > p && (D & V) !== F) {
                for(x === 0 && (x = p), T += m, k = l - x, A = 1 << k; k + x < w && (A -= R[k + x], !(A <= 0));)k++, A <<= 1;
                if (B += 1 << k, t === Rr && B > ji || t === Xi && B > Ki) return 1;
                F = D & V, i[F] = p << 24 | k << 16 | T - a | 0;
            }
        }
        return D !== 0 && (i[T + D] = l - x << 24 | 64 << 16 | 0), o.bits = p, 0;
    };
    var _n = Bc;
    const Tc = 0, Vs = 1, Ys = 2, { Z_FINISH: Qi, Z_BLOCK: Uc, Z_TREES: Mn, Z_OK: vt, Z_STREAM_END: Cc, Z_NEED_DICT: Rc, Z_STREAM_ERROR: ze, Z_DATA_ERROR: Gs, Z_MEM_ERROR: js, Z_BUF_ERROR: Nc, Z_DEFLATED: Ji } = Ms, mr = 16180, ea = 16181, ta = 16182, na = 16183, ra = 16184, ia = 16185, aa = 16186, sa = 16187, oa = 16188, la = 16189, cr = 16190, Qe = 16191, Nr = 16192, ca = 16193, Or = 16194, fa = 16195, ua = 16196, ha = 16197, da = 16198, Pn = 16199, Wn = 16200, _a = 16201, pa = 16202, wa = 16203, ga = 16204, ma = 16205, Dr = 16206, ba = 16207, ya = 16208, ue = 16209, Ks = 16210, qs = 16211, Oc = 852, Dc = 592, Fc = 15, Hc = Fc, Ea = (t)=>(t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
    function zc() {
        this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
    }
    const Bt = (t)=>{
        if (!t) return 1;
        const n = t.state;
        return !n || n.strm !== t || n.mode < mr || n.mode > qs ? 1 : 0;
    }, Xs = (t)=>{
        if (Bt(t)) return ze;
        const n = t.state;
        return t.total_in = t.total_out = n.total = 0, t.msg = "", n.wrap && (t.adler = n.wrap & 1), n.mode = mr, n.last = 0, n.havedict = 0, n.flags = -1, n.dmax = 32768, n.head = null, n.hold = 0, n.bits = 0, n.lencode = n.lendyn = new Int32Array(Oc), n.distcode = n.distdyn = new Int32Array(Dc), n.sane = 1, n.back = -1, vt;
    }, Qs = (t)=>{
        if (Bt(t)) return ze;
        const n = t.state;
        return n.wsize = 0, n.whave = 0, n.wnext = 0, Xs(t);
    }, Js = (t, n)=>{
        let e;
        if (Bt(t)) return ze;
        const r = t.state;
        return n < 0 ? (e = 0, n = -n) : (e = (n >> 4) + 5, n < 48 && (n &= 15)), n && (n < 8 || n > 15) ? ze : (r.window !== null && r.wbits !== n && (r.window = null), r.wrap = e, r.wbits = n, Qs(t));
    }, eo = (t, n)=>{
        if (!t) return ze;
        const e = new zc;
        t.state = e, e.strm = t, e.window = null, e.mode = mr;
        const r = Js(t, n);
        return r !== vt && (t.state = null), r;
    }, Zc = (t)=>eo(t, Hc);
    let ka = !0, Fr, Hr;
    const $c = (t)=>{
        if (ka) {
            Fr = new Int32Array(512), Hr = new Int32Array(32);
            let n = 0;
            for(; n < 144;)t.lens[n++] = 8;
            for(; n < 256;)t.lens[n++] = 9;
            for(; n < 280;)t.lens[n++] = 7;
            for(; n < 288;)t.lens[n++] = 8;
            for(_n(Vs, t.lens, 0, 288, Fr, 0, t.work, {
                bits: 9
            }), n = 0; n < 32;)t.lens[n++] = 5;
            _n(Ys, t.lens, 0, 32, Hr, 0, t.work, {
                bits: 5
            }), ka = !1;
        }
        t.lencode = Fr, t.lenbits = 9, t.distcode = Hr, t.distbits = 5;
    }, to = (t, n, e, r)=>{
        let i;
        const a = t.state;
        return a.window === null && (a.window = new Uint8Array(1 << a.wbits)), a.wsize === 0 && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0), r >= a.wsize ? (a.window.set(n.subarray(e - a.wsize, e), 0), a.wnext = 0, a.whave = a.wsize) : (i = a.wsize - a.wnext, i > r && (i = r), a.window.set(n.subarray(e - r, e - r + i), a.wnext), r -= i, r ? (a.window.set(n.subarray(e - r, e), 0), a.wnext = r, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0;
    }, Lc = (t, n)=>{
        let e, r, i, a, s, o, d, l, u, m, w, p, k, x, A = 0, B, D, U, g, F, V, T, P;
        const z = new Uint8Array(4);
        let R, H;
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
        if (Bt(t) || !t.output || !t.input && t.avail_in !== 0) return ze;
        e = t.state, e.mode === Qe && (e.mode = Nr), s = t.next_out, i = t.output, d = t.avail_out, a = t.next_in, r = t.input, o = t.avail_in, l = e.hold, u = e.bits, m = o, w = d, P = vt;
        e: for(;;)switch(e.mode){
            case mr:
                if (e.wrap === 0) {
                    e.mode = Nr;
                    break;
                }
                for(; u < 16;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (e.wrap & 2 && l === 35615) {
                    e.wbits === 0 && (e.wbits = 15), e.check = 0, z[0] = l & 255, z[1] = l >>> 8 & 255, e.check = Me(e.check, z, 2, 0), l = 0, u = 0, e.mode = ea;
                    break;
                }
                if (e.head && (e.head.done = !1), !(e.wrap & 1) || (((l & 255) << 8) + (l >> 8)) % 31) {
                    t.msg = "incorrect header check", e.mode = ue;
                    break;
                }
                if ((l & 15) !== Ji) {
                    t.msg = "unknown compression method", e.mode = ue;
                    break;
                }
                if (l >>>= 4, u -= 4, T = (l & 15) + 8, e.wbits === 0 && (e.wbits = T), T > 15 || T > e.wbits) {
                    t.msg = "invalid window size", e.mode = ue;
                    break;
                }
                e.dmax = 1 << e.wbits, e.flags = 0, t.adler = e.check = 1, e.mode = l & 512 ? la : Qe, l = 0, u = 0;
                break;
            case ea:
                for(; u < 16;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (e.flags = l, (e.flags & 255) !== Ji) {
                    t.msg = "unknown compression method", e.mode = ue;
                    break;
                }
                if (e.flags & 57344) {
                    t.msg = "unknown header flags set", e.mode = ue;
                    break;
                }
                e.head && (e.head.text = l >> 8 & 1), e.flags & 512 && e.wrap & 4 && (z[0] = l & 255, z[1] = l >>> 8 & 255, e.check = Me(e.check, z, 2, 0)), l = 0, u = 0, e.mode = ta;
            case ta:
                for(; u < 32;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                e.head && (e.head.time = l), e.flags & 512 && e.wrap & 4 && (z[0] = l & 255, z[1] = l >>> 8 & 255, z[2] = l >>> 16 & 255, z[3] = l >>> 24 & 255, e.check = Me(e.check, z, 4, 0)), l = 0, u = 0, e.mode = na;
            case na:
                for(; u < 16;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                e.head && (e.head.xflags = l & 255, e.head.os = l >> 8), e.flags & 512 && e.wrap & 4 && (z[0] = l & 255, z[1] = l >>> 8 & 255, e.check = Me(e.check, z, 2, 0)), l = 0, u = 0, e.mode = ra;
            case ra:
                if (e.flags & 1024) {
                    for(; u < 16;){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    e.length = l, e.head && (e.head.extra_len = l), e.flags & 512 && e.wrap & 4 && (z[0] = l & 255, z[1] = l >>> 8 & 255, e.check = Me(e.check, z, 2, 0)), l = 0, u = 0;
                } else e.head && (e.head.extra = null);
                e.mode = ia;
            case ia:
                if (e.flags & 1024 && (p = e.length, p > o && (p = o), p && (e.head && (T = e.head.extra_len - e.length, e.head.extra || (e.head.extra = new Uint8Array(e.head.extra_len)), e.head.extra.set(r.subarray(a, a + p), T)), e.flags & 512 && e.wrap & 4 && (e.check = Me(e.check, r, p, a)), o -= p, a += p, e.length -= p), e.length)) break e;
                e.length = 0, e.mode = aa;
            case aa:
                if (e.flags & 2048) {
                    if (o === 0) break e;
                    p = 0;
                    do T = r[a + p++], e.head && T && e.length < 65536 && (e.head.name += String.fromCharCode(T));
                    while (T && p < o);
                    if (e.flags & 512 && e.wrap & 4 && (e.check = Me(e.check, r, p, a)), o -= p, a += p, T) break e;
                } else e.head && (e.head.name = null);
                e.length = 0, e.mode = sa;
            case sa:
                if (e.flags & 4096) {
                    if (o === 0) break e;
                    p = 0;
                    do T = r[a + p++], e.head && T && e.length < 65536 && (e.head.comment += String.fromCharCode(T));
                    while (T && p < o);
                    if (e.flags & 512 && e.wrap & 4 && (e.check = Me(e.check, r, p, a)), o -= p, a += p, T) break e;
                } else e.head && (e.head.comment = null);
                e.mode = oa;
            case oa:
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
                e.head && (e.head.hcrc = e.flags >> 9 & 1, e.head.done = !0), t.adler = e.check = 0, e.mode = Qe;
                break;
            case la:
                for(; u < 32;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                t.adler = e.check = Ea(l), l = 0, u = 0, e.mode = cr;
            case cr:
                if (e.havedict === 0) return t.next_out = s, t.avail_out = d, t.next_in = a, t.avail_in = o, e.hold = l, e.bits = u, Rc;
                t.adler = e.check = 1, e.mode = Qe;
            case Qe:
                if (n === Uc || n === Mn) break e;
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
                        e.mode = ca;
                        break;
                    case 1:
                        if ($c(e), e.mode = Pn, n === Mn) {
                            l >>>= 2, u -= 2;
                            break e;
                        }
                        break;
                    case 2:
                        e.mode = ua;
                        break;
                    case 3:
                        t.msg = "invalid block type", e.mode = ue;
                }
                l >>>= 2, u -= 2;
                break;
            case ca:
                for(l >>>= u & 7, u -= u & 7; u < 32;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if ((l & 65535) !== (l >>> 16 ^ 65535)) {
                    t.msg = "invalid stored block lengths", e.mode = ue;
                    break;
                }
                if (e.length = l & 65535, l = 0, u = 0, e.mode = Or, n === Mn) break e;
            case Or:
                e.mode = fa;
            case fa:
                if (p = e.length, p) {
                    if (p > o && (p = o), p > d && (p = d), p === 0) break e;
                    i.set(r.subarray(a, a + p), s), o -= p, a += p, d -= p, s += p, e.length -= p;
                    break;
                }
                e.mode = Qe;
                break;
            case ua:
                for(; u < 14;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (e.nlen = (l & 31) + 257, l >>>= 5, u -= 5, e.ndist = (l & 31) + 1, l >>>= 5, u -= 5, e.ncode = (l & 15) + 4, l >>>= 4, u -= 4, e.nlen > 286 || e.ndist > 30) {
                    t.msg = "too many length or distance symbols", e.mode = ue;
                    break;
                }
                e.have = 0, e.mode = ha;
            case ha:
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
                }, P = _n(Tc, e.lens, 0, 19, e.lencode, 0, e.work, R), e.lenbits = R.bits, P) {
                    t.msg = "invalid code lengths set", e.mode = ue;
                    break;
                }
                e.have = 0, e.mode = da;
            case da:
                for(; e.have < e.nlen + e.ndist;){
                    for(; A = e.lencode[l & (1 << e.lenbits) - 1], B = A >>> 24, D = A >>> 16 & 255, U = A & 65535, !(B <= u);){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    if (U < 16) l >>>= B, u -= B, e.lens[e.have++] = U;
                    else {
                        if (U === 16) {
                            for(H = B + 2; u < H;){
                                if (o === 0) break e;
                                o--, l += r[a++] << u, u += 8;
                            }
                            if (l >>>= B, u -= B, e.have === 0) {
                                t.msg = "invalid bit length repeat", e.mode = ue;
                                break;
                            }
                            T = e.lens[e.have - 1], p = 3 + (l & 3), l >>>= 2, u -= 2;
                        } else if (U === 17) {
                            for(H = B + 3; u < H;){
                                if (o === 0) break e;
                                o--, l += r[a++] << u, u += 8;
                            }
                            l >>>= B, u -= B, T = 0, p = 3 + (l & 7), l >>>= 3, u -= 3;
                        } else {
                            for(H = B + 7; u < H;){
                                if (o === 0) break e;
                                o--, l += r[a++] << u, u += 8;
                            }
                            l >>>= B, u -= B, T = 0, p = 11 + (l & 127), l >>>= 7, u -= 7;
                        }
                        if (e.have + p > e.nlen + e.ndist) {
                            t.msg = "invalid bit length repeat", e.mode = ue;
                            break;
                        }
                        for(; p--;)e.lens[e.have++] = T;
                    }
                }
                if (e.mode === ue) break;
                if (e.lens[256] === 0) {
                    t.msg = "invalid code -- missing end-of-block", e.mode = ue;
                    break;
                }
                if (e.lenbits = 9, R = {
                    bits: e.lenbits
                }, P = _n(Vs, e.lens, 0, e.nlen, e.lencode, 0, e.work, R), e.lenbits = R.bits, P) {
                    t.msg = "invalid literal/lengths set", e.mode = ue;
                    break;
                }
                if (e.distbits = 6, e.distcode = e.distdyn, R = {
                    bits: e.distbits
                }, P = _n(Ys, e.lens, e.nlen, e.ndist, e.distcode, 0, e.work, R), e.distbits = R.bits, P) {
                    t.msg = "invalid distances set", e.mode = ue;
                    break;
                }
                if (e.mode = Pn, n === Mn) break e;
            case Pn:
                e.mode = Wn;
            case Wn:
                if (o >= 6 && d >= 258) {
                    t.next_out = s, t.avail_out = d, t.next_in = a, t.avail_in = o, e.hold = l, e.bits = u, Sc(t, w), s = t.next_out, i = t.output, d = t.avail_out, a = t.next_in, r = t.input, o = t.avail_in, l = e.hold, u = e.bits, e.mode === Qe && (e.back = -1);
                    break;
                }
                for(e.back = 0; A = e.lencode[l & (1 << e.lenbits) - 1], B = A >>> 24, D = A >>> 16 & 255, U = A & 65535, !(B <= u);){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (D && !(D & 240)) {
                    for(g = B, F = D, V = U; A = e.lencode[V + ((l & (1 << g + F) - 1) >> g)], B = A >>> 24, D = A >>> 16 & 255, U = A & 65535, !(g + B <= u);){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    l >>>= g, u -= g, e.back += g;
                }
                if (l >>>= B, u -= B, e.back += B, e.length = U, D === 0) {
                    e.mode = ma;
                    break;
                }
                if (D & 32) {
                    e.back = -1, e.mode = Qe;
                    break;
                }
                if (D & 64) {
                    t.msg = "invalid literal/length code", e.mode = ue;
                    break;
                }
                e.extra = D & 15, e.mode = _a;
            case _a:
                if (e.extra) {
                    for(H = e.extra; u < H;){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    e.length += l & (1 << e.extra) - 1, l >>>= e.extra, u -= e.extra, e.back += e.extra;
                }
                e.was = e.length, e.mode = pa;
            case pa:
                for(; A = e.distcode[l & (1 << e.distbits) - 1], B = A >>> 24, D = A >>> 16 & 255, U = A & 65535, !(B <= u);){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (!(D & 240)) {
                    for(g = B, F = D, V = U; A = e.distcode[V + ((l & (1 << g + F) - 1) >> g)], B = A >>> 24, D = A >>> 16 & 255, U = A & 65535, !(g + B <= u);){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    l >>>= g, u -= g, e.back += g;
                }
                if (l >>>= B, u -= B, e.back += B, D & 64) {
                    t.msg = "invalid distance code", e.mode = ue;
                    break;
                }
                e.offset = U, e.extra = D & 15, e.mode = wa;
            case wa:
                if (e.extra) {
                    for(H = e.extra; u < H;){
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
            case ma:
                if (d === 0) break e;
                i[s++] = e.length, d--, e.mode = Wn;
                break;
            case Dr:
                if (e.wrap) {
                    for(; u < 32;){
                        if (o === 0) break e;
                        o--, l |= r[a++] << u, u += 8;
                    }
                    if (w -= d, t.total_out += w, e.total += w, e.wrap & 4 && w && (t.adler = e.check = e.flags ? Me(e.check, i, w, s - w) : ci(e.check, i, w, s - w)), w = d, e.wrap & 4 && (e.flags ? l : Ea(l)) !== e.check) {
                        t.msg = "incorrect data check", e.mode = ue;
                        break;
                    }
                    l = 0, u = 0;
                }
                e.mode = ba;
            case ba:
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
                e.mode = ya;
            case ya:
                P = Cc;
                break e;
            case ue:
                P = Gs;
                break e;
            case Ks:
                return js;
            case qs:
            default:
                return ze;
        }
        return t.next_out = s, t.avail_out = d, t.next_in = a, t.avail_in = o, e.hold = l, e.bits = u, (e.wsize || w !== t.avail_out && e.mode < ue && (e.mode < Dr || n !== Qi)) && to(t, t.output, t.next_out, w - t.avail_out), m -= t.avail_in, w -= t.avail_out, t.total_in += m, t.total_out += w, e.total += w, e.wrap & 4 && w && (t.adler = e.check = e.flags ? Me(e.check, i, w, t.next_out - w) : ci(e.check, i, w, t.next_out - w)), t.data_type = e.bits + (e.last ? 64 : 0) + (e.mode === Qe ? 128 : 0) + (e.mode === Pn || e.mode === Or ? 256 : 0), (m === 0 && w === 0 || n === Qi) && P === vt && (P = Nc), P;
    }, Mc = (t)=>{
        if (Bt(t)) return ze;
        let n = t.state;
        return n.window && (n.window = null), t.state = null, vt;
    }, Pc = (t, n)=>{
        if (Bt(t)) return ze;
        const e = t.state;
        return e.wrap & 2 ? (e.head = n, n.done = !1, vt) : ze;
    }, Wc = (t, n)=>{
        const e = n.length;
        let r, i, a;
        return Bt(t) || (r = t.state, r.wrap !== 0 && r.mode !== cr) ? ze : r.mode === cr && (i = 1, i = ci(i, n, e, 0), i !== r.check) ? Gs : (a = to(t, n, e, e), a ? (r.mode = Ks, js) : (r.havedict = 1, vt));
    };
    var Vc = Qs, Yc = Js, Gc = Xs, jc = Zc, Kc = eo, qc = Lc, Xc = Mc, Qc = Pc, Jc = Wc, ef = "pako inflate (from Nodeca project)", We = {
        inflateReset: Vc,
        inflateReset2: Yc,
        inflateResetKeep: Gc,
        inflateInit: jc,
        inflateInit2: Kc,
        inflate: qc,
        inflateEnd: Xc,
        inflateGetHeader: Qc,
        inflateSetDictionary: Jc,
        inflateInfo: ef
    };
    function tf() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
    }
    var nf = tf;
    const no = Object.prototype.toString, { Z_NO_FLUSH: rf, Z_FINISH: Sa, Z_OK: Mt, Z_STREAM_END: zr, Z_NEED_DICT: Zr, Z_STREAM_ERROR: af, Z_DATA_ERROR: va, Z_MEM_ERROR: sf, Z_BUF_ERROR: xa } = Ms, of = {
        chunkSize: 1024 * 64,
        windowBits: 15,
        to: ""
    };
    function br(t) {
        this.options = Ps.assign({}, of, t || {});
        const n = this.options;
        n.raw && n.windowBits >= 0 && n.windowBits < 16 && (n.windowBits = -n.windowBits, n.windowBits === 0 && (n.windowBits = -15)), n.windowBits >= 0 && n.windowBits < 16 && !(t && t.windowBits) && (n.windowBits += 32), n.windowBits > 15 && n.windowBits < 48 && (n.windowBits & 15 || (n.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Ec, this.strm.avail_out = 0;
        let e = We.inflateInit2(this.strm, n.windowBits);
        if (e !== Mt) throw new Error(fi[e]);
        if (this.header = new nf, We.inflateGetHeader(this.strm, this.header), n.dictionary && (typeof n.dictionary == "string" ? n.dictionary = ui.string2buf(n.dictionary) : no.call(n.dictionary) === "[object ArrayBuffer]" && (n.dictionary = new Uint8Array(n.dictionary)), n.raw && (e = We.inflateSetDictionary(this.strm, n.dictionary), e !== Mt))) throw new Error(fi[e]);
    }
    br.prototype.push = function(t, n) {
        const e = this.strm, r = this.options.chunkSize, i = this.options.dictionary;
        let a, s, o;
        if (this.ended) return !1;
        for(n === ~~n ? s = n : s = n === !0 ? Sa : rf, no.call(t) === "[object ArrayBuffer]" ? e.input = new Uint8Array(t) : e.input = t, e.next_in = 0, e.avail_in = e.input.length;;){
            for(e.avail_out === 0 && (e.output = new Uint8Array(r), e.next_out = 0, e.avail_out = r), a = We.inflate(e, s), a === Zr && i && (a = We.inflateSetDictionary(e, i), a === Mt ? a = We.inflate(e, s) : a === va && (a = Zr)); e.avail_in > 0 && a === zr && e.state.wrap & 2 && e.state.flags !== 0 && e.input[e.next_in] !== 0;)We.inflateReset(e), a = We.inflate(e, s);
            switch(a){
                case af:
                case va:
                case Zr:
                case sf:
                    return this.onEnd(a), this.ended = !0, !1;
            }
            if (o = e.avail_out, e.next_out && (e.avail_out === 0 || a === zr || s > 0)) if (this.options.to === "string") {
                let d = ui.utf8border(e.output, e.next_out), l = e.next_out - d, u = ui.buf2string(e.output, d);
                e.next_out = l, e.avail_out = r - l, l && e.output.set(e.output.subarray(d, d + l), 0), this.onData(u);
            } else this.onData(e.output.length === e.next_out ? e.output : e.output.subarray(0, e.next_out)), e.avail_out = 0, e.next_out = 0;
            if (!((a === Mt || a === xa) && o === 0)) {
                if (a === zr) return a = We.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
                if (e.avail_in === 0) {
                    if (s === Sa) return a = We.inflateEnd(this.strm), this.onEnd(a === Mt ? xa : a), this.ended = !0, !1;
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
        t === Mt && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Ps.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
    };
    function lf(t, n) {
        const e = new br(n);
        if (e.push(t, !0), e.err) throw e.msg || fi[e.err];
        return e.result;
    }
    var cf = lf, ff = {
        inflate: cf
    };
    const { inflate: uf } = ff;
    var hf = uf;
    function df(t) {
        return JSON.parse(hf(Zs(t), {
            to: "string",
            raw: !0
        })).debug_infos;
    }
    function _f(t, n, e) {
        if (!("callStack" in t) || !t.callStack) return;
        const { callStack: r, brilligFunctionId: i } = t;
        if (!n) return r;
        try {
            return pf(r, n, e, i);
        } catch  {
            return r;
        }
    }
    function pf(t, n, e, r) {
        let i = t.flatMap((a)=>wf(a, n, e, r));
        if (i.length > 0) {
            const a = t[t.length - 1].split(".");
            if (a.length === 2) {
                const s = n.acir_locations[a[0]];
                if (s !== void 0) {
                    const o = n.location_tree.locations[s];
                    i = ro(o, n.location_tree.locations, e).concat(i);
                }
            }
        }
        return i;
    }
    function ro(t, n, e) {
        const r = [];
        for(; t.parent !== null;){
            const { file: i, span: a } = t.value, { path: s, source: o } = e[i], d = o.substring(a.start, a.end), u = o.substring(0, a.start).split(`
`), m = u.length, w = u[u.length - 1].length + 1;
            r.push({
                filePath: s,
                line: m,
                column: w,
                locationText: d
            }), t = n[t.parent];
        }
        return r.reverse();
    }
    function wf(t, n, e, r) {
        let i = n.acir_locations[t];
        const a = gf(t);
        if (r !== void 0 && a !== void 0 && (i = n.brillig_locations[r][a], i === void 0)) return [];
        if (i === void 0) return [];
        const s = n.location_tree.locations[i];
        return ro(s, n.location_tree.locations, e);
    }
    function gf(t) {
        const n = t.split(".");
        if (n.length === 2) return n[1];
    }
    const mf = async (t, n)=>{
        if (t == "print") return [];
        throw Error(`Unexpected oracle during execution: ${t}(${n.join(", ")})`);
    };
    function bf(t, n) {
        const e = n;
        if (n.rawAssertionPayload) try {
            const r = Gl(t.abi, n.rawAssertionPayload);
            typeof r == "string" ? e.message = `Circuit execution failed: ${r}` : e.decodedAssertionPayload = r;
        } catch  {}
        try {
            const r = _f(n, df(t.debug_symbols)[n.acirFunctionId], t.file_map);
            e.noirCallStack = r?.map((i)=>typeof i == "string" ? `at opcode ${i}` : `at ${i.locationText} (${i.filePath}:${i.line}:${i.column})`);
        } catch  {}
        return e;
    }
    async function yf(t, n, e = mf) {
        const r = Vl(t.abi, n);
        try {
            return await zl(Zs(t.bytecode), r, e);
        } catch (i) {
            throw typeof i == "object" && i !== null && "rawAssertionPayload" in i ? bf(t, i) : new Error(`Circuit execution failed: ${i}`);
        }
    }
    class Ef {
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
            const r = await yf(this.circuit, n, e), i = r[0].witness, { return_value: a } = Yl(this.circuit.abi, i);
            return {
                witness: Hl(r),
                returnValue: a
            };
        }
    }
    var kf = {
        0: (t)=>{
            var n = 1e3, e = n * 60, r = e * 60, i = r * 24, a = i * 7, s = i * 365.25;
            t.exports = function(m, w) {
                w = w || {};
                var p = typeof m;
                if (p === "string" && m.length > 0) return o(m);
                if (p === "number" && isFinite(m)) return w.long ? l(m) : d(m);
                throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(m));
            };
            function o(m) {
                if (m = String(m), !(m.length > 100)) {
                    var w = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(m);
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
            function d(m) {
                var w = Math.abs(m);
                return w >= i ? Math.round(m / i) + "d" : w >= r ? Math.round(m / r) + "h" : w >= e ? Math.round(m / e) + "m" : w >= n ? Math.round(m / n) + "s" : m + "ms";
            }
            function l(m) {
                var w = Math.abs(m);
                return w >= i ? u(m, w, i, "day") : w >= r ? u(m, w, r, "hour") : w >= e ? u(m, w, e, "minute") : w >= n ? u(m, w, n, "second") : m + " ms";
            }
            function u(m, w, p, k) {
                var x = w >= p * 1.5;
                return Math.round(m / p) + " " + k + (x ? "s" : "");
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
            var u = [], m = !1, w, p = -1;
            function k() {
                !m || !w || (m = !1, w.length ? u = w.concat(u) : p = -1, u.length && x());
            }
            function x() {
                if (!m) {
                    var W = d(k);
                    m = !0;
                    for(var G = u.length; G;){
                        for(w = u, u = []; ++p < G;)w && w[p].run();
                        p = -1, G = u.length;
                    }
                    w = null, m = !1, l(W);
                }
            }
            r.nextTick = function(W) {
                var G = new Array(arguments.length - 1);
                if (arguments.length > 1) for(var q = 1; q < arguments.length; q++)G[q - 1] = arguments[q];
                u.push(new A(W, G)), u.length === 1 && !m && d(x);
            };
            function A(W, G) {
                this.fun = W, this.array = G;
            }
            A.prototype.run = function() {
                this.fun.apply(null, this.array);
            }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {};
            function B() {}
            r.on = B, r.addListener = B, r.once = B, r.off = B, r.removeListener = B, r.removeAllListeners = B, r.emit = B, r.prependListener = B, r.prependOnceListener = B, r.listeners = function(W) {
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
            var U = e.exports.browser, g = D, F = e.exports.binding, V = D, T = 1, P = {}, z = D, R = D, H = D, ae = D, S = D, $ = "browser", O = "browser", N = "browser", L = [], Y = {
                nextTick: e.exports.nextTick,
                title: e.exports.title,
                browser: U,
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
                emitWarning: g,
                prependListener: e.exports.prependListener,
                prependOnceListener: e.exports.prependOnceListener,
                listeners: e.exports.listeners,
                binding: F,
                cwd: e.exports.cwd,
                chdir: e.exports.chdir,
                umask: e.exports.umask,
                exit: V,
                pid: T,
                features: P,
                kill: z,
                dlopen: R,
                uptime: H,
                memoryUsage: ae,
                uvCounters: S,
                platform: $,
                arch: O,
                execPath: N,
                execArgv: L
            };
            n.addListener = e.exports.addListener, n.arch = O, n.argv = e.exports.argv, n.binding = F, n.browser = U, n.chdir = e.exports.chdir, n.cwd = e.exports.cwd, n.default = Y, n.dlopen = R, n.emit = e.exports.emit, n.emitWarning = g, n.env = e.exports.env, n.execArgv = L, n.execPath = N, n.exit = V, n.features = P, n.kill = z, n.listeners = e.exports.listeners, n.memoryUsage = ae, n.nextTick = e.exports.nextTick, n.off = e.exports.off, n.on = e.exports.on, n.once = e.exports.once, n.pid = T, n.platform = $, n.prependListener = e.exports.prependListener, n.prependOnceListener = e.exports.prependOnceListener, n.removeAllListeners = e.exports.removeAllListeners, n.removeListener = e.exports.removeListener, n.title = e.exports.title, n.umask = e.exports.umask, n.uptime = H, n.uvCounters = S, n.version = e.exports.version, n.versions = e.exports.versions, n = t.exports = Y;
        },
        251: (t, n)=>{
            n.read = function(e, r, i, a, s) {
                var o, d, l = s * 8 - a - 1, u = (1 << l) - 1, m = u >> 1, w = -7, p = i ? s - 1 : 0, k = i ? -1 : 1, x = e[r + p];
                for(p += k, o = x & (1 << -w) - 1, x >>= -w, w += l; w > 0; o = o * 256 + e[r + p], p += k, w -= 8);
                for(d = o & (1 << -w) - 1, o >>= -w, w += a; w > 0; d = d * 256 + e[r + p], p += k, w -= 8);
                if (o === 0) o = 1 - m;
                else {
                    if (o === u) return d ? NaN : (x ? -1 : 1) * (1 / 0);
                    d = d + Math.pow(2, a), o = o - m;
                }
                return (x ? -1 : 1) * d * Math.pow(2, o - a);
            }, n.write = function(e, r, i, a, s, o) {
                var d, l, u, m = o * 8 - s - 1, w = (1 << m) - 1, p = w >> 1, k = s === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, x = a ? 0 : o - 1, A = a ? 1 : -1, B = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0;
                for(r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (l = isNaN(r) ? 1 : 0, d = w) : (d = Math.floor(Math.log(r) / Math.LN2), r * (u = Math.pow(2, -d)) < 1 && (d--, u *= 2), d + p >= 1 ? r += k / u : r += k * Math.pow(2, 1 - p), r * u >= 2 && (d++, u /= 2), d + p >= w ? (l = 0, d = w) : d + p >= 1 ? (l = (r * u - 1) * Math.pow(2, s), d = d + p) : (l = r * Math.pow(2, p - 1) * Math.pow(2, s), d = 0)); s >= 8; e[i + x] = l & 255, x += A, l /= 256, s -= 8);
                for(d = d << s | l, m += s; m > 0; e[i + x] = d & 255, x += A, d /= 256, m -= 8);
                e[i + x - A] |= B * 128;
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
                if (ArrayBuffer.isView(h)) return A(h);
                if (h == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof h);
                if (Le(h, ArrayBuffer) || h && Le(h.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Le(h, SharedArrayBuffer) || h && Le(h.buffer, SharedArrayBuffer))) return B(h, c, f);
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
            function m(h) {
                if (typeof h != "number") throw new TypeError('"size" argument must be of type number');
                if (h < 0) throw new RangeError('The value "' + h + '" is invalid for option "size"');
            }
            function w(h, c, f) {
                return m(h), h <= 0 ? d(h) : c !== void 0 ? typeof f == "string" ? d(h).fill(c, f) : d(h).fill(c) : d(h);
            }
            l.alloc = function(h, c, f) {
                return w(h, c, f);
            };
            function p(h) {
                return m(h), d(h < 0 ? 0 : U(h) | 0);
            }
            l.allocUnsafe = function(h) {
                return p(h);
            }, l.allocUnsafeSlow = function(h) {
                return p(h);
            };
            function k(h, c) {
                if ((typeof c != "string" || c === "") && (c = "utf8"), !l.isEncoding(c)) throw new TypeError("Unknown encoding: " + c);
                const f = g(h, c) | 0;
                let _ = d(f);
                const b = _.write(h, c);
                return b !== f && (_ = _.slice(0, b)), _;
            }
            function x(h) {
                const c = h.length < 0 ? 0 : U(h.length) | 0, f = d(c);
                for(let _ = 0; _ < c; _ += 1)f[_] = h[_] & 255;
                return f;
            }
            function A(h) {
                if (Le(h, Uint8Array)) {
                    const c = new Uint8Array(h);
                    return B(c.buffer, c.byteOffset, c.byteLength);
                }
                return x(h);
            }
            function B(h, c, f) {
                if (c < 0 || h.byteLength < c) throw new RangeError('"offset" is outside of buffer bounds');
                if (h.byteLength < c + (f || 0)) throw new RangeError('"length" is outside of buffer bounds');
                let _;
                return c === void 0 && f === void 0 ? _ = new Uint8Array(h) : f === void 0 ? _ = new Uint8Array(h, c) : _ = new Uint8Array(h, c, f), Object.setPrototypeOf(_, l.prototype), _;
            }
            function D(h) {
                if (l.isBuffer(h)) {
                    const c = U(h.length) | 0, f = d(c);
                    return f.length === 0 || h.copy(f, 0, 0, c), f;
                }
                if (h.length !== void 0) return typeof h.length != "number" || Ur(h.length) ? d(0) : x(h);
                if (h.type === "Buffer" && Array.isArray(h.data)) return x(h.data);
            }
            function U(h) {
                if (h >= s) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
                return h | 0;
            }
            l.isBuffer = function(c) {
                return c != null && c._isBuffer === !0 && c !== l.prototype;
            }, l.compare = function(c, f) {
                if (Le(c, Uint8Array) && (c = l.from(c, c.offset, c.byteLength)), Le(f, Uint8Array) && (f = l.from(f, f.offset, f.byteLength)), !l.isBuffer(c) || !l.isBuffer(f)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                if (c === f) return 0;
                let _ = c.length, b = f.length;
                for(let I = 0, C = Math.min(_, b); I < C; ++I)if (c[I] !== f[I]) {
                    _ = c[I], b = f[I];
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
                let I = 0;
                for(_ = 0; _ < c.length; ++_){
                    let C = c[_];
                    if (Le(C, Uint8Array)) I + C.length > b.length ? (l.isBuffer(C) || (C = l.from(C)), C.copy(b, I)) : Uint8Array.prototype.set.call(b, C, I);
                    else if (l.isBuffer(C)) C.copy(b, I);
                    else throw new TypeError('"list" argument must be an Array of Buffers');
                    I += C.length;
                }
                return b;
            };
            function g(h, c) {
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
                        return Tr(h).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return f * 2;
                    case "hex":
                        return f >>> 1;
                    case "base64":
                        return Pi(h).length;
                    default:
                        if (b) return _ ? -1 : Tr(h).length;
                        c = ("" + c).toLowerCase(), b = !0;
                }
            }
            l.byteLength = g;
            function F(h, c, f) {
                let _ = !1;
                if ((c === void 0 || c < 0) && (c = 0), c > this.length || ((f === void 0 || f > this.length) && (f = this.length), f <= 0) || (f >>>= 0, c >>>= 0, f <= c)) return "";
                for(h || (h = "utf8");;)switch(h){
                    case "hex":
                        return G(this, c, f);
                    case "utf8":
                    case "utf-8":
                        return O(this, c, f);
                    case "ascii":
                        return Y(this, c, f);
                    case "latin1":
                    case "binary":
                        return W(this, c, f);
                    case "base64":
                        return $(this, c, f);
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
                return c === 0 ? "" : arguments.length === 0 ? O(this, 0, c) : F.apply(this, arguments);
            }, l.prototype.toLocaleString = l.prototype.toString, l.prototype.equals = function(c) {
                if (!l.isBuffer(c)) throw new TypeError("Argument must be a Buffer");
                return this === c ? !0 : l.compare(this, c) === 0;
            }, l.prototype.inspect = function() {
                let c = "";
                const f = n.IS;
                return c = this.toString("hex", 0, f).replace(/(.{2})/g, "$1 ").trim(), this.length > f && (c += " ... "), "<Buffer " + c + ">";
            }, a && (l.prototype[a] = l.prototype.inspect), l.prototype.compare = function(c, f, _, b, I) {
                if (Le(c, Uint8Array) && (c = l.from(c, c.offset, c.byteLength)), !l.isBuffer(c)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof c);
                if (f === void 0 && (f = 0), _ === void 0 && (_ = c ? c.length : 0), b === void 0 && (b = 0), I === void 0 && (I = this.length), f < 0 || _ > c.length || b < 0 || I > this.length) throw new RangeError("out of range index");
                if (b >= I && f >= _) return 0;
                if (b >= I) return -1;
                if (f >= _) return 1;
                if (f >>>= 0, _ >>>= 0, b >>>= 0, I >>>= 0, this === c) return 0;
                let C = I - b, X = _ - f;
                const pe = Math.min(C, X), fe = this.slice(b, I), we = c.slice(f, _);
                for(let se = 0; se < pe; ++se)if (fe[se] !== we[se]) {
                    C = fe[se], X = we[se];
                    break;
                }
                return C < X ? -1 : X < C ? 1 : 0;
            };
            function T(h, c, f, _, b) {
                if (h.length === 0) return -1;
                if (typeof f == "string" ? (_ = f, f = 0) : f > 2147483647 ? f = 2147483647 : f < -2147483648 && (f = -2147483648), f = +f, Ur(f) && (f = b ? 0 : h.length - 1), f < 0 && (f = h.length + f), f >= h.length) {
                    if (b) return -1;
                    f = h.length - 1;
                } else if (f < 0) if (b) f = 0;
                else return -1;
                if (typeof c == "string" && (c = l.from(c, _)), l.isBuffer(c)) return c.length === 0 ? -1 : P(h, c, f, _, b);
                if (typeof c == "number") return c = c & 255, typeof Uint8Array.prototype.indexOf == "function" ? b ? Uint8Array.prototype.indexOf.call(h, c, f) : Uint8Array.prototype.lastIndexOf.call(h, c, f) : P(h, [
                    c
                ], f, _, b);
                throw new TypeError("val must be string, number or Buffer");
            }
            function P(h, c, f, _, b) {
                let I = 1, C = h.length, X = c.length;
                if (_ !== void 0 && (_ = String(_).toLowerCase(), _ === "ucs2" || _ === "ucs-2" || _ === "utf16le" || _ === "utf-16le")) {
                    if (h.length < 2 || c.length < 2) return -1;
                    I = 2, C /= 2, X /= 2, f /= 2;
                }
                function pe(we, se) {
                    return I === 1 ? we[se] : we.readUInt16BE(se * I);
                }
                let fe;
                if (b) {
                    let we = -1;
                    for(fe = f; fe < C; fe++)if (pe(h, fe) === pe(c, we === -1 ? 0 : fe - we)) {
                        if (we === -1 && (we = fe), fe - we + 1 === X) return we * I;
                    } else we !== -1 && (fe -= fe - we), we = -1;
                } else for(f + X > C && (f = C - X), fe = f; fe >= 0; fe--){
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
                return T(this, c, f, _, !0);
            }, l.prototype.lastIndexOf = function(c, f, _) {
                return T(this, c, f, _, !1);
            };
            function z(h, c, f, _) {
                f = Number(f) || 0;
                const b = h.length - f;
                _ ? (_ = Number(_), _ > b && (_ = b)) : _ = b;
                const I = c.length;
                _ > I / 2 && (_ = I / 2);
                let C;
                for(C = 0; C < _; ++C){
                    const X = parseInt(c.substr(C * 2, 2), 16);
                    if (Ur(X)) return C;
                    h[f + C] = X;
                }
                return C;
            }
            function R(h, c, f, _) {
                return Zn(Tr(c, h.length - f), h, f, _);
            }
            function H(h, c, f, _) {
                return Zn(Bl(c), h, f, _);
            }
            function ae(h, c, f, _) {
                return Zn(Pi(c), h, f, _);
            }
            function S(h, c, f, _) {
                return Zn(Tl(c, h.length - f), h, f, _);
            }
            l.prototype.write = function(c, f, _, b) {
                if (f === void 0) b = "utf8", _ = this.length, f = 0;
                else if (_ === void 0 && typeof f == "string") b = f, _ = this.length, f = 0;
                else if (isFinite(f)) f = f >>> 0, isFinite(_) ? (_ = _ >>> 0, b === void 0 && (b = "utf8")) : (b = _, _ = void 0);
                else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                const I = this.length - f;
                if ((_ === void 0 || _ > I) && (_ = I), c.length > 0 && (_ < 0 || f < 0) || f > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                b || (b = "utf8");
                let C = !1;
                for(;;)switch(b){
                    case "hex":
                        return z(this, c, f, _);
                    case "utf8":
                    case "utf-8":
                        return R(this, c, f, _);
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return H(this, c, f, _);
                    case "base64":
                        return ae(this, c, f, _);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return S(this, c, f, _);
                    default:
                        if (C) throw new TypeError("Unknown encoding: " + b);
                        b = ("" + b).toLowerCase(), C = !0;
                }
            }, l.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                };
            };
            function $(h, c, f) {
                return c === 0 && f === h.length ? r.fromByteArray(h) : r.fromByteArray(h.slice(c, f));
            }
            function O(h, c, f) {
                f = Math.min(h.length, f);
                const _ = [];
                let b = c;
                for(; b < f;){
                    const I = h[b];
                    let C = null, X = I > 239 ? 4 : I > 223 ? 3 : I > 191 ? 2 : 1;
                    if (b + X <= f) {
                        let pe, fe, we, se;
                        switch(X){
                            case 1:
                                I < 128 && (C = I);
                                break;
                            case 2:
                                pe = h[b + 1], (pe & 192) === 128 && (se = (I & 31) << 6 | pe & 63, se > 127 && (C = se));
                                break;
                            case 3:
                                pe = h[b + 1], fe = h[b + 2], (pe & 192) === 128 && (fe & 192) === 128 && (se = (I & 15) << 12 | (pe & 63) << 6 | fe & 63, se > 2047 && (se < 55296 || se > 57343) && (C = se));
                                break;
                            case 4:
                                pe = h[b + 1], fe = h[b + 2], we = h[b + 3], (pe & 192) === 128 && (fe & 192) === 128 && (we & 192) === 128 && (se = (I & 15) << 18 | (pe & 63) << 12 | (fe & 63) << 6 | we & 63, se > 65535 && se < 1114112 && (C = se));
                        }
                    }
                    C === null ? (C = 65533, X = 1) : C > 65535 && (C -= 65536, _.push(C >>> 10 & 1023 | 55296), C = 56320 | C & 1023), _.push(C), b += X;
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
            function G(h, c, f) {
                const _ = h.length;
                (!c || c < 0) && (c = 0), (!f || f < 0 || f > _) && (f = _);
                let b = "";
                for(let I = c; I < f; ++I)b += Ul[h[I]];
                return b;
            }
            function q(h, c, f) {
                const _ = h.slice(c, f);
                let b = "";
                for(let I = 0; I < _.length - 1; I += 2)b += String.fromCharCode(_[I] + _[I + 1] * 256);
                return b;
            }
            l.prototype.slice = function(c, f) {
                const _ = this.length;
                c = ~~c, f = f === void 0 ? _ : ~~f, c < 0 ? (c += _, c < 0 && (c = 0)) : c > _ && (c = _), f < 0 ? (f += _, f < 0 && (f = 0)) : f > _ && (f = _), f < c && (f = c);
                const b = this.subarray(c, f);
                return Object.setPrototypeOf(b, l.prototype), b;
            };
            function j(h, c, f) {
                if (h % 1 !== 0 || h < 0) throw new RangeError("offset is not uint");
                if (h + c > f) throw new RangeError("Trying to access beyond buffer length");
            }
            l.prototype.readUintLE = l.prototype.readUIntLE = function(c, f, _) {
                c = c >>> 0, f = f >>> 0, _ || j(c, f, this.length);
                let b = this[c], I = 1, C = 0;
                for(; ++C < f && (I *= 256);)b += this[c + C] * I;
                return b;
            }, l.prototype.readUintBE = l.prototype.readUIntBE = function(c, f, _) {
                c = c >>> 0, f = f >>> 0, _ || j(c, f, this.length);
                let b = this[c + --f], I = 1;
                for(; f > 0 && (I *= 256);)b += this[c + --f] * I;
                return b;
            }, l.prototype.readUint8 = l.prototype.readUInt8 = function(c, f) {
                return c = c >>> 0, f || j(c, 1, this.length), this[c];
            }, l.prototype.readUint16LE = l.prototype.readUInt16LE = function(c, f) {
                return c = c >>> 0, f || j(c, 2, this.length), this[c] | this[c + 1] << 8;
            }, l.prototype.readUint16BE = l.prototype.readUInt16BE = function(c, f) {
                return c = c >>> 0, f || j(c, 2, this.length), this[c] << 8 | this[c + 1];
            }, l.prototype.readUint32LE = l.prototype.readUInt32LE = function(c, f) {
                return c = c >>> 0, f || j(c, 4, this.length), (this[c] | this[c + 1] << 8 | this[c + 2] << 16) + this[c + 3] * 16777216;
            }, l.prototype.readUint32BE = l.prototype.readUInt32BE = function(c, f) {
                return c = c >>> 0, f || j(c, 4, this.length), this[c] * 16777216 + (this[c + 1] << 16 | this[c + 2] << 8 | this[c + 3]);
            }, l.prototype.readBigUInt64LE = it(function(c) {
                c = c >>> 0, Rt(c, "offset");
                const f = this[c], _ = this[c + 7];
                (f === void 0 || _ === void 0) && sn(c, this.length - 8);
                const b = f + this[++c] * 2 ** 8 + this[++c] * 2 ** 16 + this[++c] * 2 ** 24, I = this[++c] + this[++c] * 2 ** 8 + this[++c] * 2 ** 16 + _ * 2 ** 24;
                return BigInt(b) + (BigInt(I) << BigInt(32));
            }), l.prototype.readBigUInt64BE = it(function(c) {
                c = c >>> 0, Rt(c, "offset");
                const f = this[c], _ = this[c + 7];
                (f === void 0 || _ === void 0) && sn(c, this.length - 8);
                const b = f * 2 ** 24 + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + this[++c], I = this[++c] * 2 ** 24 + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + _;
                return (BigInt(b) << BigInt(32)) + BigInt(I);
            }), l.prototype.readIntLE = function(c, f, _) {
                c = c >>> 0, f = f >>> 0, _ || j(c, f, this.length);
                let b = this[c], I = 1, C = 0;
                for(; ++C < f && (I *= 256);)b += this[c + C] * I;
                return I *= 128, b >= I && (b -= Math.pow(2, 8 * f)), b;
            }, l.prototype.readIntBE = function(c, f, _) {
                c = c >>> 0, f = f >>> 0, _ || j(c, f, this.length);
                let b = f, I = 1, C = this[c + --b];
                for(; b > 0 && (I *= 256);)C += this[c + --b] * I;
                return I *= 128, C >= I && (C -= Math.pow(2, 8 * f)), C;
            }, l.prototype.readInt8 = function(c, f) {
                return c = c >>> 0, f || j(c, 1, this.length), this[c] & 128 ? (255 - this[c] + 1) * -1 : this[c];
            }, l.prototype.readInt16LE = function(c, f) {
                c = c >>> 0, f || j(c, 2, this.length);
                const _ = this[c] | this[c + 1] << 8;
                return _ & 32768 ? _ | 4294901760 : _;
            }, l.prototype.readInt16BE = function(c, f) {
                c = c >>> 0, f || j(c, 2, this.length);
                const _ = this[c + 1] | this[c] << 8;
                return _ & 32768 ? _ | 4294901760 : _;
            }, l.prototype.readInt32LE = function(c, f) {
                return c = c >>> 0, f || j(c, 4, this.length), this[c] | this[c + 1] << 8 | this[c + 2] << 16 | this[c + 3] << 24;
            }, l.prototype.readInt32BE = function(c, f) {
                return c = c >>> 0, f || j(c, 4, this.length), this[c] << 24 | this[c + 1] << 16 | this[c + 2] << 8 | this[c + 3];
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
                return c = c >>> 0, f || j(c, 4, this.length), i.read(this, c, !0, 23, 4);
            }, l.prototype.readFloatBE = function(c, f) {
                return c = c >>> 0, f || j(c, 4, this.length), i.read(this, c, !1, 23, 4);
            }, l.prototype.readDoubleLE = function(c, f) {
                return c = c >>> 0, f || j(c, 8, this.length), i.read(this, c, !0, 52, 8);
            }, l.prototype.readDoubleBE = function(c, f) {
                return c = c >>> 0, f || j(c, 8, this.length), i.read(this, c, !1, 52, 8);
            };
            function te(h, c, f, _, b, I) {
                if (!l.isBuffer(h)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (c > b || c < I) throw new RangeError('"value" argument is out of bounds');
                if (f + _ > h.length) throw new RangeError("Index out of range");
            }
            l.prototype.writeUintLE = l.prototype.writeUIntLE = function(c, f, _, b) {
                if (c = +c, f = f >>> 0, _ = _ >>> 0, !b) {
                    const X = Math.pow(2, 8 * _) - 1;
                    te(this, c, f, _, X, 0);
                }
                let I = 1, C = 0;
                for(this[f] = c & 255; ++C < _ && (I *= 256);)this[f + C] = c / I & 255;
                return f + _;
            }, l.prototype.writeUintBE = l.prototype.writeUIntBE = function(c, f, _, b) {
                if (c = +c, f = f >>> 0, _ = _ >>> 0, !b) {
                    const X = Math.pow(2, 8 * _) - 1;
                    te(this, c, f, _, X, 0);
                }
                let I = _ - 1, C = 1;
                for(this[f + I] = c & 255; --I >= 0 && (C *= 256);)this[f + I] = c / C & 255;
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
                let I = Number(c & BigInt(4294967295));
                h[f++] = I, I = I >> 8, h[f++] = I, I = I >> 8, h[f++] = I, I = I >> 8, h[f++] = I;
                let C = Number(c >> BigInt(32) & BigInt(4294967295));
                return h[f++] = C, C = C >> 8, h[f++] = C, C = C >> 8, h[f++] = C, C = C >> 8, h[f++] = C, f;
            }
            function Ie(h, c, f, _, b) {
                an(c, _, b, h, f, 7);
                let I = Number(c & BigInt(4294967295));
                h[f + 7] = I, I = I >> 8, h[f + 6] = I, I = I >> 8, h[f + 5] = I, I = I >> 8, h[f + 4] = I;
                let C = Number(c >> BigInt(32) & BigInt(4294967295));
                return h[f + 3] = C, C = C >> 8, h[f + 2] = C, C = C >> 8, h[f + 1] = C, C = C >> 8, h[f] = C, f + 8;
            }
            l.prototype.writeBigUInt64LE = it(function(c, f = 0) {
                return xe(this, c, f, BigInt(0), BigInt("0xffffffffffffffff"));
            }), l.prototype.writeBigUInt64BE = it(function(c, f = 0) {
                return Ie(this, c, f, BigInt(0), BigInt("0xffffffffffffffff"));
            }), l.prototype.writeIntLE = function(c, f, _, b) {
                if (c = +c, f = f >>> 0, !b) {
                    const pe = Math.pow(2, 8 * _ - 1);
                    te(this, c, f, _, pe - 1, -pe);
                }
                let I = 0, C = 1, X = 0;
                for(this[f] = c & 255; ++I < _ && (C *= 256);)c < 0 && X === 0 && this[f + I - 1] !== 0 && (X = 1), this[f + I] = (c / C >> 0) - X & 255;
                return f + _;
            }, l.prototype.writeIntBE = function(c, f, _, b) {
                if (c = +c, f = f >>> 0, !b) {
                    const pe = Math.pow(2, 8 * _ - 1);
                    te(this, c, f, _, pe - 1, -pe);
                }
                let I = _ - 1, C = 1, X = 0;
                for(this[f + I] = c & 255; --I >= 0 && (C *= 256);)c < 0 && X === 0 && this[f + I + 1] !== 0 && (X = 1), this[f + I] = (c / C >> 0) - X & 255;
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
                return Ie(this, c, f, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
            });
            function Ut(h, c, f, _, b, I) {
                if (f + _ > h.length) throw new RangeError("Index out of range");
                if (f < 0) throw new RangeError("Index out of range");
            }
            function Ct(h, c, f, _, b) {
                return c = +c, f = f >>> 0, b || Ut(h, c, f, 4), i.write(h, c, f, _, 23, 4), f + 4;
            }
            l.prototype.writeFloatLE = function(c, f, _) {
                return Ct(this, c, f, !0, _);
            }, l.prototype.writeFloatBE = function(c, f, _) {
                return Ct(this, c, f, !1, _);
            };
            function tn(h, c, f, _, b) {
                return c = +c, f = f >>> 0, b || Ut(h, c, f, 8), i.write(h, c, f, _, 52, 8), f + 8;
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
                const I = b - _;
                return this === c && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(f, _, b) : Uint8Array.prototype.set.call(c, this.subarray(_, b), f), I;
            }, l.prototype.fill = function(c, f, _, b) {
                if (typeof c == "string") {
                    if (typeof f == "string" ? (b = f, f = 0, _ = this.length) : typeof _ == "string" && (b = _, _ = this.length), b !== void 0 && typeof b != "string") throw new TypeError("encoding must be a string");
                    if (typeof b == "string" && !l.isEncoding(b)) throw new TypeError("Unknown encoding: " + b);
                    if (c.length === 1) {
                        const C = c.charCodeAt(0);
                        (b === "utf8" && C < 128 || b === "latin1") && (c = C);
                    }
                } else typeof c == "number" ? c = c & 255 : typeof c == "boolean" && (c = Number(c));
                if (f < 0 || this.length < f || this.length < _) throw new RangeError("Out of range index");
                if (_ <= f) return this;
                f = f >>> 0, _ = _ === void 0 ? this.length : _ >>> 0, c || (c = 0);
                let I;
                if (typeof c == "number") for(I = f; I < _; ++I)this[I] = c;
                else {
                    const C = l.isBuffer(c) ? c : l.from(c, b), X = C.length;
                    if (X === 0) throw new TypeError('The value "' + c + '" is invalid for argument "value"');
                    for(I = 0; I < _ - f; ++I)this[I + f] = C[I % X];
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
            function an(h, c, f, _, b, I) {
                if (h > f || h < c) {
                    const C = typeof c == "bigint" ? "n" : "";
                    let X;
                    throw c === 0 || c === BigInt(0) ? X = `>= 0${C} and < 2${C} ** ${(I + 1) * 8}${C}` : X = `>= -(2${C} ** ${(I + 1) * 8 - 1}${C}) and < 2 ** ${(I + 1) * 8 - 1}${C}`, new Xe.ERR_OUT_OF_RANGE("value", X, h);
                }
                zn(_, b, I);
            }
            function Rt(h, c) {
                if (typeof h != "number") throw new Xe.ERR_INVALID_ARG_TYPE(c, "number", h);
            }
            function sn(h, c, f) {
                throw Math.floor(h) !== h ? (Rt(h, f), new Xe.ERR_OUT_OF_RANGE("offset", "an integer", h)) : c < 0 ? new Xe.ERR_BUFFER_OUT_OF_BOUNDS : new Xe.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${c}`, h);
            }
            const Il = /[^+/0-9A-Za-z-_]/g;
            function Al(h) {
                if (h = h.split("=")[0], h = h.trim().replace(Il, ""), h.length < 2) return "";
                for(; h.length % 4 !== 0;)h = h + "=";
                return h;
            }
            function Tr(h, c) {
                c = c || 1 / 0;
                let f;
                const _ = h.length;
                let b = null;
                const I = [];
                for(let C = 0; C < _; ++C){
                    if (f = h.charCodeAt(C), f > 55295 && f < 57344) {
                        if (!b) {
                            if (f > 56319) {
                                (c -= 3) > -1 && I.push(239, 191, 189);
                                continue;
                            } else if (C + 1 === _) {
                                (c -= 3) > -1 && I.push(239, 191, 189);
                                continue;
                            }
                            b = f;
                            continue;
                        }
                        if (f < 56320) {
                            (c -= 3) > -1 && I.push(239, 191, 189), b = f;
                            continue;
                        }
                        f = (b - 55296 << 10 | f - 56320) + 65536;
                    } else b && (c -= 3) > -1 && I.push(239, 191, 189);
                    if (b = null, f < 128) {
                        if ((c -= 1) < 0) break;
                        I.push(f);
                    } else if (f < 2048) {
                        if ((c -= 2) < 0) break;
                        I.push(f >> 6 | 192, f & 63 | 128);
                    } else if (f < 65536) {
                        if ((c -= 3) < 0) break;
                        I.push(f >> 12 | 224, f >> 6 & 63 | 128, f & 63 | 128);
                    } else if (f < 1114112) {
                        if ((c -= 4) < 0) break;
                        I.push(f >> 18 | 240, f >> 12 & 63 | 128, f >> 6 & 63 | 128, f & 63 | 128);
                    } else throw new Error("Invalid code point");
                }
                return I;
            }
            function Bl(h) {
                const c = [];
                for(let f = 0; f < h.length; ++f)c.push(h.charCodeAt(f) & 255);
                return c;
            }
            function Tl(h, c) {
                let f, _, b;
                const I = [];
                for(let C = 0; C < h.length && !((c -= 2) < 0); ++C)f = h.charCodeAt(C), _ = f >> 8, b = f % 256, I.push(b), I.push(_);
                return I;
            }
            function Pi(h) {
                return r.toByteArray(Al(h));
            }
            function Zn(h, c, f, _) {
                let b;
                for(b = 0; b < _ && !(b + f >= c.length || b >= h.length); ++b)c[b + f] = h[b];
                return b;
            }
            function Le(h, c) {
                return h instanceof c || h != null && h.constructor != null && h.constructor.name != null && h.constructor.name === c.name;
            }
            function Ur(h) {
                return h !== h;
            }
            const Ul = function() {
                const h = "0123456789abcdef", c = new Array(256);
                for(let f = 0; f < 16; ++f){
                    const _ = f * 16;
                    for(let b = 0; b < 16; ++b)c[_ + b] = h[f] + h[b];
                }
                return c;
            }();
            function it(h) {
                return typeof BigInt > "u" ? Cl : h;
            }
            function Cl() {
                throw new Error("BigInt not supported");
            }
        },
        526: (t, n)=>{
            n.byteLength = l, n.toByteArray = m, n.fromByteArray = k;
            for(var e = [], r = [], i = typeof Uint8Array < "u" ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, o = a.length; s < o; ++s)e[s] = a[s], r[a.charCodeAt(s)] = s;
            r[45] = 62, r[95] = 63;
            function d(x) {
                var A = x.length;
                if (A % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var B = x.indexOf("=");
                B === -1 && (B = A);
                var D = B === A ? 0 : 4 - B % 4;
                return [
                    B,
                    D
                ];
            }
            function l(x) {
                var A = d(x), B = A[0], D = A[1];
                return (B + D) * 3 / 4 - D;
            }
            function u(x, A, B) {
                return (A + B) * 3 / 4 - B;
            }
            function m(x) {
                var A, B = d(x), D = B[0], U = B[1], g = new i(u(x, D, U)), F = 0, V = U > 0 ? D - 4 : D, T;
                for(T = 0; T < V; T += 4)A = r[x.charCodeAt(T)] << 18 | r[x.charCodeAt(T + 1)] << 12 | r[x.charCodeAt(T + 2)] << 6 | r[x.charCodeAt(T + 3)], g[F++] = A >> 16 & 255, g[F++] = A >> 8 & 255, g[F++] = A & 255;
                return U === 2 && (A = r[x.charCodeAt(T)] << 2 | r[x.charCodeAt(T + 1)] >> 4, g[F++] = A & 255), U === 1 && (A = r[x.charCodeAt(T)] << 10 | r[x.charCodeAt(T + 1)] << 4 | r[x.charCodeAt(T + 2)] >> 2, g[F++] = A >> 8 & 255, g[F++] = A & 255), g;
            }
            function w(x) {
                return e[x >> 18 & 63] + e[x >> 12 & 63] + e[x >> 6 & 63] + e[x & 63];
            }
            function p(x, A, B) {
                for(var D, U = [], g = A; g < B; g += 3)D = (x[g] << 16 & 16711680) + (x[g + 1] << 8 & 65280) + (x[g + 2] & 255), U.push(w(D));
                return U.join("");
            }
            function k(x) {
                for(var A, B = x.length, D = B % 3, U = [], g = 16383, F = 0, V = B - D; F < V; F += g)U.push(p(x, F, F + g > V ? V : F + g));
                return D === 1 ? (A = x[B - 1], U.push(e[A >> 2] + e[A << 4 & 63] + "==")) : D === 2 && (A = (x[B - 2] << 8) + x[B - 1], U.push(e[A >> 10] + e[A >> 4 & 63] + e[A << 2 & 63] + "=")), U.join("");
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
                    for(let A = 0; A < k.length; A++)x = (x << 5) - x + k.charCodeAt(A), x |= 0;
                    return s.colors[Math.abs(x) % s.colors.length];
                }
                s.selectColor = a;
                function s(k) {
                    let x, A = null, B, D;
                    function U(...g) {
                        if (!U.enabled) return;
                        const F = U, V = Number(new Date), T = V - (x || V);
                        F.diff = T, F.prev = x, F.curr = V, x = V, g[0] = s.coerce(g[0]), typeof g[0] != "string" && g.unshift("%O");
                        let P = 0;
                        g[0] = g[0].replace(/%([a-zA-Z%])/g, (R, H)=>{
                            if (R === "%%") return "%";
                            P++;
                            const ae = s.formatters[H];
                            if (typeof ae == "function") {
                                const S = g[P];
                                R = ae.call(F, S), g.splice(P, 1), P--;
                            }
                            return R;
                        }), s.formatArgs.call(F, g), (F.log || s.log).apply(F, g);
                    }
                    return U.namespace = k, U.useColors = s.useColors(), U.color = s.selectColor(k), U.extend = o, U.destroy = s.destroy, Object.defineProperty(U, "enabled", {
                        enumerable: !0,
                        configurable: !1,
                        get: ()=>A !== null ? A : (B !== s.namespaces && (B = s.namespaces, D = s.enabled(k)), D),
                        set: (g)=>{
                            A = g;
                        }
                    }), typeof s.init == "function" && s.init(U), U;
                }
                function o(k, x) {
                    const A = s(this.namespace + (typeof x > "u" ? ":" : x) + k);
                    return A.log = this.log, A;
                }
                function d(k) {
                    s.save(k), s.namespaces = k, s.names = [], s.skips = [];
                    let x;
                    const A = (typeof k == "string" ? k : "").split(/[\s,]+/), B = A.length;
                    for(x = 0; x < B; x++)A[x] && (k = A[x].replace(/\*/g, ".*?"), k[0] === "-" ? s.skips.push(new RegExp("^" + k.slice(1) + "$")) : s.names.push(new RegExp("^" + k + "$")));
                }
                function l() {
                    const k = [
                        ...s.names.map(m),
                        ...s.skips.map(m).map((x)=>"-" + x)
                    ].join(",");
                    return s.enable(""), k;
                }
                function u(k) {
                    if (k[k.length - 1] === "*") return !0;
                    let x, A;
                    for(x = 0, A = s.skips.length; x < A; x++)if (s.skips[x].test(k)) return !1;
                    for(x = 0, A = s.names.length; x < A; x++)if (s.names[x].test(k)) return !0;
                    return !1;
                }
                function m(k) {
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
                const m = "color: " + this.color;
                u.splice(1, 0, m, "color: inherit");
                let w = 0, p = 0;
                u[0].replace(/%[a-zA-Z%]/g, (k)=>{
                    k !== "%%" && (w++, k === "%c" && (p = w));
                }), u.splice(p, 0, m);
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
                } catch (m) {
                    return "[UnexpectedJSONParseError]: " + m.message;
                }
            };
        }
    }, Ia = {};
    function me(t) {
        var n = Ia[t];
        if (n !== void 0) return n.exports;
        var e = Ia[t] = {
            exports: {}
        };
        return kf[t](e, e.exports, me), e.exports;
    }
    me.n = (t)=>{
        var n = t && t.__esModule ? ()=>t.default : ()=>t;
        return me.d(n, {
            a: n
        }), n;
    };
    (()=>{
        var t = Object.getPrototypeOf ? (e)=>Object.getPrototypeOf(e) : (e)=>e.__proto__, n;
        me.t = function(e, r) {
            if (r & 1 && (e = this(e)), r & 8 || typeof e == "object" && e && (r & 4 && e.__esModule || r & 16 && typeof e.then == "function")) return e;
            var i = Object.create(null);
            me.r(i);
            var a = {};
            n = n || [
                null,
                t({}),
                t([]),
                t(t)
            ];
            for(var s = r & 2 && e; typeof s == "object" && !~n.indexOf(s); s = t(s))Object.getOwnPropertyNames(s).forEach((o)=>a[o] = ()=>e[o]);
            return a.default = ()=>e, me.d(i, a), i;
        };
    })();
    me.d = (t, n)=>{
        for(var e in n)me.o(n, e) && !me.o(t, e) && Object.defineProperty(t, e, {
            enumerable: !0,
            get: n[e]
        });
    };
    me.o = (t, n)=>Object.prototype.hasOwnProperty.call(t, n);
    me.r = (t)=>{
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        });
    };
    function* Sf() {
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
    function* Aa(t) {
        for (const n of t)yield n;
    }
    async function Ba(t, n = Sf()) {
        for(;;)try {
            return await t();
        } catch (e) {
            const r = n.next().value;
            if (r === void 0) throw e;
            await new Promise((i)=>setTimeout(i, r * 1e3));
            continue;
        }
    }
    class vf {
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
                }), Aa([
                5,
                5,
                5
            ]));
        }
        async fetchG2Data() {
            return await Ba(()=>fetch("https://crs.aztec.network/g2.dat", {
                    cache: "force-cache"
                }), Aa([
                5,
                5,
                5
            ]));
        }
    }
    class xf {
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
    function Ti(t) {
        return new Promise((n, e)=>{
            t.oncomplete = t.onsuccess = ()=>n(t.result), t.onabort = t.onerror = ()=>e(t.error);
        });
    }
    function If(t, n) {
        const e = indexedDB.open(t);
        e.onupgradeneeded = ()=>e.result.createObjectStore(n);
        const r = Ti(e);
        return (i, a)=>r.then((s)=>a(s.transaction(n, i).objectStore(n)));
    }
    let $r;
    function io() {
        return $r || ($r = If("keyval-store", "keyval")), $r;
    }
    function hi(t, n = io()) {
        return n("readonly", (e)=>Ti(e.get(t)));
    }
    function di(t, n, e = io()) {
        return e("readwrite", (r)=>(r.put(n, t), Ti(r.transaction)));
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
            const n = await hi("g1Data"), e = await hi("g2Data"), r = new vf(this.numPoints), i = this.numPoints * 64;
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
            const n = await hi("grumpkinG1Data"), e = new xf(this.numPoints), r = this.numPoints * 64;
            !n || n.length < r ? (this.g1Data = await e.downloadG1Data(), await di("grumpkinG1Data", this.g1Data)) : this.g1Data = n;
        }
        getG1Data() {
            return this.g1Data;
        }
    }
    const ao = Symbol("Comlink.proxy"), Af = Symbol("Comlink.endpoint"), Bf = Symbol("Comlink.releaseProxy"), Lr = Symbol("Comlink.finalizer"), ir = Symbol("Comlink.thrown"), so = (t)=>typeof t == "object" && t !== null || typeof t == "function", Tf = {
        canHandle: (t)=>so(t) && t[ao],
        serialize (t) {
            const { port1: n, port2: e } = new MessageChannel;
            return lo(t, n), [
                e,
                [
                    e
                ]
            ];
        },
        deserialize (t) {
            return t.start(), fo(t);
        }
    }, Uf = {
        canHandle: (t)=>so(t) && ir in t,
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
    }, oo = new Map([
        [
            "proxy",
            Tf
        ],
        [
            "throw",
            Uf
        ]
    ]);
    function Cf(t, n) {
        for (const e of t)if (n === e || e === "*" || e instanceof RegExp && e.test(n)) return !0;
        return !1;
    }
    function lo(t, n = globalThis, e = [
        "*"
    ]) {
        n.addEventListener("message", function r(i) {
            if (!i || !i.data) return;
            if (!Cf(e, i.origin)) {
                console.warn(`Invalid origin '${i.origin}' for comlink proxy`);
                return;
            }
            const { id: a, type: s, path: o } = Object.assign({
                path: []
            }, i.data), d = (i.data.argumentList || []).map(bt);
            let l;
            try {
                const u = o.slice(0, -1).reduce((w, p)=>w[p], t), m = o.reduce((w, p)=>w[p], t);
                switch(s){
                    case "GET":
                        l = m;
                        break;
                    case "SET":
                        u[o.slice(-1)[0]] = bt(i.data.value), l = !0;
                        break;
                    case "APPLY":
                        l = m.apply(u, d);
                        break;
                    case "CONSTRUCT":
                        {
                            const w = new m(...d);
                            l = _o(w);
                        }
                        break;
                    case "ENDPOINT":
                        {
                            const { port1: w, port2: p } = new MessageChannel;
                            lo(t, p), l = Ff(w, [
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
                const [m, w] = dr(u);
                n.postMessage(Object.assign(Object.assign({}, m), {
                    id: a
                }), w), s === "RELEASE" && (n.removeEventListener("message", r), co(n), Lr in t && typeof t[Lr] == "function" && t[Lr]());
            }).catch((u)=>{
                const [m, w] = dr({
                    value: new TypeError("Unserializable return value"),
                    [ir]: 0
                });
                n.postMessage(Object.assign(Object.assign({}, m), {
                    id: a
                }), w);
            });
        }), n.start && n.start();
    }
    function Rf(t) {
        return t.constructor.name === "MessagePort";
    }
    function co(t) {
        Rf(t) && t.close();
    }
    function fo(t, n) {
        return _i(t, [], n);
    }
    function Vn(t) {
        if (t) throw new Error("Proxy has been released and is not useable");
    }
    function uo(t) {
        return $t(t, {
            type: "RELEASE"
        }).then(()=>{
            co(t);
        });
    }
    const ur = new WeakMap, hr = "FinalizationRegistry" in globalThis && new FinalizationRegistry((t)=>{
        const n = (ur.get(t) || 0) - 1;
        ur.set(t, n), n === 0 && uo(t);
    });
    function Nf(t, n) {
        const e = (ur.get(n) || 0) + 1;
        ur.set(n, e), hr && hr.register(t, n, t);
    }
    function Of(t) {
        hr && hr.unregister(t);
    }
    function _i(t, n = [], e = function() {}) {
        let r = !1;
        const i = new Proxy(e, {
            get (a, s) {
                if (Vn(r), s === Bf) return ()=>{
                    Of(i), uo(t), r = !0;
                };
                if (s === "then") {
                    if (n.length === 0) return {
                        then: ()=>i
                    };
                    const o = $t(t, {
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
                return $t(t, {
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
                if (d === Af) return $t(t, {
                    type: "ENDPOINT"
                }).then(bt);
                if (d === "bind") return _i(t, n.slice(0, -1));
                const [l, u] = Ta(o);
                return $t(t, {
                    type: "APPLY",
                    path: n.map((m)=>m.toString()),
                    argumentList: l
                }, u).then(bt);
            },
            construct (a, s) {
                Vn(r);
                const [o, d] = Ta(s);
                return $t(t, {
                    type: "CONSTRUCT",
                    path: n.map((l)=>l.toString()),
                    argumentList: o
                }, d).then(bt);
            }
        });
        return Nf(i, t), i;
    }
    function Df(t) {
        return Array.prototype.concat.apply([], t);
    }
    function Ta(t) {
        const n = t.map(dr);
        return [
            n.map((e)=>e[0]),
            Df(n.map((e)=>e[1]))
        ];
    }
    const ho = new WeakMap;
    function Ff(t, n) {
        return ho.set(t, n), t;
    }
    function _o(t) {
        return Object.assign(t, {
            [ao]: !0
        });
    }
    function dr(t) {
        for (const [n, e] of oo)if (e.canHandle(t)) {
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
            ho.get(t) || []
        ];
    }
    function bt(t) {
        switch(t.type){
            case "HANDLER":
                return oo.get(t.name).deserialize(t.value);
            case "RAW":
                return t.value;
        }
    }
    function $t(t, n, e) {
        return new Promise((r)=>{
            const i = Hf();
            t.addEventListener("message", function a(s) {
                !s.data || !s.data.id || s.data.id !== i || (t.removeEventListener("message", a), r(s.data));
            }), t.start && t.start(), t.postMessage(Object.assign({
                id: i
            }, n), e);
        });
    }
    function Hf() {
        return new Array(4).fill(0).map(()=>Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
    }
    class nt extends Uint8Array {
    }
    function zf(t) {
        const n = new Uint8Array(1);
        return n[0] = t ? 1 : 0, n;
    }
    function po(t, n = 4) {
        const e = new Uint8Array(n);
        return new DataView(e.buffer).setUint32(e.byteLength - 4, t, !1), e;
    }
    function Zf(t, n = 4) {
        const e = new Uint8Array(n);
        return new DataView(e.buffer).setInt32(e.byteLength - 4, t, !1), e;
    }
    function wo(t) {
        const n = t.reduce((i, a)=>i + a.length, 0), e = new Uint8Array(n);
        let r = 0;
        for (const i of t)e.set(i, r), r += i.length;
        return e;
    }
    function $f(t) {
        return t.reduce((n, e)=>n + e.toString(16).padStart(2, "0"), "");
    }
    function Ua(t) {
        return wo([
            Zf(t.length),
            t
        ]);
    }
    function Lf(t, n = 32) {
        const e = new Uint8Array(n);
        for(let r = 0; r < n; r++)e[n - r - 1] = Number(t >> BigInt(r * 8) & 0xffn);
        return e;
    }
    function Mf(t) {
        return wo([
            po(t.length),
            ...t.flat()
        ]);
    }
    function Z(t) {
        return Array.isArray(t) ? Mf(t.map(Z)) : t instanceof nt ? t : t instanceof Uint8Array ? Ua(t) : typeof t == "boolean" ? zf(t) : typeof t == "number" ? po(t) : typeof t == "bigint" ? Lf(t) : typeof t == "string" ? Ua(new TextEncoder().encode(t)) : t.toBuffer();
    }
    class Te {
        constructor(n, e = 0){
            this.buffer = n, this.index = e;
        }
        static asReader(n) {
            return n instanceof Te ? n : new Te(n);
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
    function Ae() {
        return {
            SIZE_IN_BYTES: 1,
            fromBuffer: (t)=>Te.asReader(t).readBoolean()
        };
    }
    function Pt() {
        return {
            SIZE_IN_BYTES: 4,
            fromBuffer: (t)=>Te.asReader(t).readNumber()
        };
    }
    function Fe(t) {
        return {
            fromBuffer: (n)=>Te.asReader(n).readVector(t)
        };
    }
    function ie() {
        return {
            fromBuffer: (t)=>Te.asReader(t).readBuffer()
        };
    }
    function _r() {
        return {
            fromBuffer: (t)=>Te.asReader(t).readString()
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
    var go = me(287).hp;
    function mo(t) {
        return (t.readBigUInt64BE(0) << 192n) + (t.readBigUInt64BE(8) << 128n) + (t.readBigUInt64BE(16) << 64n) + t.readBigUInt64BE(24);
    }
    function Wt(t) {
        const n = go.from(t);
        return mo(n);
    }
    function bo(t, n = 32) {
        if (n != 32) throw new Error(`Only 32 bytes supported for conversion from bigint to buffer, attempted byte length: ${n}`);
        const e = go.alloc(n);
        return e.writeBigUInt64BE(t >> 192n, 0), e.writeBigUInt64BE(t >> 128n & 0xffffffffffffffffn, 8), e.writeBigUInt64BE(t >> 64n & 0xffffffffffffffffn, 16), e.writeBigUInt64BE(t & 0xffffffffffffffffn, 24), e;
    }
    function Pf(t, n = 32) {
        return new Uint8Array(bo(t, n));
    }
    var ar = me(287).hp, Vt, pn;
    K = class {
        constructor(n){
            const e = typeof n == "bigint" ? n : n instanceof ar ? mo(n) : Wt(n);
            if (e > Vt.MAX_VALUE) throw new Error(`Value 0x${e.toString(16)} is greater or equal to field modulus.`);
            this.value = typeof n == "bigint" ? Pf(n) : n instanceof ar ? new Uint8Array(n) : n;
        }
        static random() {
            const n = Wt(yr(64)) % Vt.MODULUS;
            return new this(n);
        }
        static fromBuffer(n) {
            const e = Te.asReader(n);
            return new this(e.readBytes(this.SIZE_IN_BYTES));
        }
        static fromBufferReduce(n) {
            const e = Te.asReader(n);
            return new this(Wt(e.readBytes(this.SIZE_IN_BYTES)) % Vt.MODULUS);
        }
        static fromString(n) {
            return this.fromBuffer(ar.from(n.replace(/^0x/i, ""), "hex"));
        }
        toBuffer() {
            return this.value;
        }
        toString() {
            return "0x" + $f(this.toBuffer());
        }
        equals(n) {
            return this.value.every((e, r)=>e === n.value[r]);
        }
        isZero() {
            return this.value.every((n)=>n === 0);
        }
    };
    Vt = K;
    K.ZERO = new Vt(0n);
    K.MODULUS = 0x30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001n;
    K.MAX_VALUE = Vt.MODULUS - 1n;
    K.SIZE_IN_BYTES = 32;
    class Er {
        constructor(n){
            if (this.value = n, n > pn.MAX_VALUE) throw new Error(`Fq out of range ${n}.`);
        }
        static random() {
            const n = Wt(yr(64)) % pn.MODULUS;
            return new this(n);
        }
        static fromBuffer(n) {
            const e = Te.asReader(n);
            return new this(Wt(e.readBytes(this.SIZE_IN_BYTES)));
        }
        static fromBufferReduce(n) {
            const e = Te.asReader(n);
            return new this(Wt(e.readBytes(this.SIZE_IN_BYTES)) % K.MODULUS);
        }
        static fromString(n) {
            return this.fromBuffer(ar.from(n.replace(/^0x/i, ""), "hex"));
        }
        toBuffer() {
            return bo(this.value, pn.SIZE_IN_BYTES);
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
    var Ca = me(287).hp;
    class _t {
        constructor(n, e){
            this.x = n, this.y = e;
        }
        static random() {
            return new _t(K.random(), K.random());
        }
        static fromBuffer(n) {
            const e = Te.asReader(n);
            return new this(K.fromBuffer(e), K.fromBuffer(e));
        }
        static fromString(n) {
            return _t.fromBuffer(Ca.from(n.replace(/^0x/i, ""), "hex"));
        }
        toBuffer() {
            return Ca.concat([
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
    _t.EMPTY = new _t(K.ZERO, K.ZERO);
    class jt {
        constructor(n){
            this.buffer = n;
        }
        static fromBuffer(n) {
            const e = Te.asReader(n);
            return new jt(e.readBytes(this.SIZE_IN_BYTES));
        }
        static random() {
            return new jt(yr(this.SIZE_IN_BYTES));
        }
        toBuffer() {
            return this.buffer;
        }
    }
    jt.SIZE_IN_BYTES = 32;
    class Wf {
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
                K
            ];
            return (await this.wasm.callWasmExport("pedersen_hash", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async pedersenHashes(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                K
            ];
            return (await this.wasm.callWasmExport("pedersen_hashes", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async pedersenHashBuffer(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                K
            ];
            return (await this.wasm.callWasmExport("pedersen_hash_buffer", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async poseidon2Hash(n) {
            const e = [
                n
            ].map(Z), r = [
                K
            ];
            return (await this.wasm.callWasmExport("poseidon2_hash", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async poseidon2Hashes(n) {
            const e = [
                n
            ].map(Z), r = [
                K
            ];
            return (await this.wasm.callWasmExport("poseidon2_hashes", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async poseidon2Permutation(n) {
            const e = [
                n
            ].map(Z), r = [
                Fe(K)
            ];
            return (await this.wasm.callWasmExport("poseidon2_permutation", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async poseidon2HashAccumulate(n) {
            const e = [
                n
            ].map(Z), r = [
                K
            ];
            return (await this.wasm.callWasmExport("poseidon2_hash_accumulate", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async blake2s(n) {
            const e = [
                n
            ].map(Z), r = [
                jt
            ];
            return (await this.wasm.callWasmExport("blake2s", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async blake2sToField(n) {
            const e = [
                n
            ].map(Z), r = [
                K
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
                Pt()
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
                Pt(),
                Pt()
            ];
            return (await this.wasm.callWasmExport("acir_get_circuit_sizes", i, a.map((d)=>d.SIZE_IN_BYTES))).map((d, l)=>a[l].fromBuffer(d));
        }
        async acirProveAndVerifyUltraHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ae()
            ];
            return (await this.wasm.callWasmExport("acir_prove_and_verify_ultra_honk", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async acirProveAndVerifyMegaHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ae()
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
                Ae()
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
                Ae()
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
                Fe(K)
            ];
            return (await this.wasm.callWasmExport("acir_serialize_proof_into_fields", i, a.map((d)=>d.SIZE_IN_BYTES))).map((d, l)=>a[l].fromBuffer(d))[0];
        }
        async acirSerializeVerificationKeyIntoFields(n) {
            const e = [
                n
            ].map(Z), r = [
                Fe(K),
                K
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
                Ae()
            ];
            return (await this.wasm.callWasmExport("acir_verify_ultra_honk", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async acirVerifyUltraKeccakHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ae()
            ];
            return (await this.wasm.callWasmExport("acir_verify_ultra_keccak_honk", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async acirVerifyUltraKeccakZKHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ae()
            ];
            return (await this.wasm.callWasmExport("acir_verify_ultra_keccak_zk_honk", r, i.map((o)=>o.SIZE_IN_BYTES))).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        async acirVerifyUltraStarknetHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ae()
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
                Fe(K)
            ];
            return (await this.wasm.callWasmExport("acir_proof_as_fields_ultra_honk", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async acirVkAsFieldsUltraHonk(n) {
            const e = [
                n
            ].map(Z), r = [
                Fe(K)
            ];
            return (await this.wasm.callWasmExport("acir_vk_as_fields_ultra_honk", e, r.map((s)=>s.SIZE_IN_BYTES))).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        async acirVkAsFieldsMegaHonk(n) {
            const e = [
                n
            ].map(Z), r = [
                Fe(K)
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
    class Vf {
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
                K
            ];
            return this.wasm.callWasmExport("pedersen_hash", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        pedersenHashes(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                K
            ];
            return this.wasm.callWasmExport("pedersen_hashes", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        pedersenHashBuffer(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                K
            ];
            return this.wasm.callWasmExport("pedersen_hash_buffer", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        poseidon2Hash(n) {
            const e = [
                n
            ].map(Z), r = [
                K
            ];
            return this.wasm.callWasmExport("poseidon2_hash", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        poseidon2Hashes(n) {
            const e = [
                n
            ].map(Z), r = [
                K
            ];
            return this.wasm.callWasmExport("poseidon2_hashes", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        poseidon2Permutation(n) {
            const e = [
                n
            ].map(Z), r = [
                Fe(K)
            ];
            return this.wasm.callWasmExport("poseidon2_permutation", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        poseidon2HashAccumulate(n) {
            const e = [
                n
            ].map(Z), r = [
                K
            ];
            return this.wasm.callWasmExport("poseidon2_hash_accumulate", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        blake2s(n) {
            const e = [
                n
            ].map(Z), r = [
                jt
            ];
            return this.wasm.callWasmExport("blake2s", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        blake2sToField(n) {
            const e = [
                n
            ].map(Z), r = [
                K
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
                Pt()
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
                Pt(),
                Pt()
            ];
            return this.wasm.callWasmExport("acir_get_circuit_sizes", i, a.map((d)=>d.SIZE_IN_BYTES)).map((d, l)=>a[l].fromBuffer(d));
        }
        acirProveAndVerifyUltraHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ae()
            ];
            return this.wasm.callWasmExport("acir_prove_and_verify_ultra_honk", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        acirProveAndVerifyMegaHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ae()
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
                Ae()
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
                Ae()
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
                Fe(K)
            ];
            return this.wasm.callWasmExport("acir_serialize_proof_into_fields", i, a.map((d)=>d.SIZE_IN_BYTES)).map((d, l)=>a[l].fromBuffer(d))[0];
        }
        acirSerializeVerificationKeyIntoFields(n) {
            const e = [
                n
            ].map(Z), r = [
                Fe(K),
                K
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
                Ae()
            ];
            return this.wasm.callWasmExport("acir_verify_ultra_honk", r, i.map((o)=>o.SIZE_IN_BYTES)).map((o, d)=>i[d].fromBuffer(o))[0];
        }
        acirVerifyUltraKeccakZKHonk(n, e) {
            const r = [
                n,
                e
            ].map(Z), i = [
                Ae()
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
                Fe(K)
            ];
            return this.wasm.callWasmExport("acir_proof_as_fields_ultra_honk", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        acirVkAsFieldsUltraHonk(n) {
            const e = [
                n
            ].map(Z), r = [
                Fe(K)
            ];
            return this.wasm.callWasmExport("acir_vk_as_fields_ultra_honk", e, r.map((s)=>s.SIZE_IN_BYTES)).map((s, o)=>r[o].fromBuffer(s))[0];
        }
        acirVkAsFieldsMegaHonk(n) {
            const e = [
                n
            ].map(Z), r = [
                Fe(K)
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
    var Yf = me(833), qe = me.n(Yf);
    function yo() {
        const t = typeof window < "u" ? window : globalThis;
        return typeof SharedArrayBuffer < "u" && t.crossOriginIsolated;
    }
    function Eo(t) {
        return fo(t);
    }
    function Gf() {
        return navigator.hardwareConcurrency;
    }
    function ko(t, n) {
        t.addEventListener("message", function e(r) {
            r.data && r.data.ready === !0 && (t.removeEventListener("message", e), n());
        });
    }
    async function jf() {
        const t = new Worker(new URL("" + new URL("main.worker-Bpjz4yFN.js", import.meta.url).href, import.meta.url), {
            type: "module"
        }), n = qe().disable();
        return qe().enable(n), t.postMessage({
            debug: n
        }), await new Promise((e)=>ko(t, e)), t;
    }
    async function Kf() {
        const t = new Worker(new URL("" + new URL("thread.worker-D6q_gtbS.js", import.meta.url).href, import.meta.url), {
            type: "module"
        }), n = qe().disable();
        return qe().enable(n), t.postMessage({
            debug: n
        }), await new Promise((e)=>ko(t, e)), t;
    }
    class qf {
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
    class Xf {
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
    class kr extends qf {
        constructor(){
            super(...arguments), this.workers = [], this.remoteWasms = [], this.nextWorker = 0, this.nextThreadId = 1;
        }
        getNumThreads() {
            return this.workers.length + 1;
        }
        async init(n, e = Math.min(Gf(), kr.MAX_THREADS), r = qe()("bb.js:bb_wasm"), i = 32, a = 2 ** 16) {
            this.logger = r;
            const s = i * 2 ** 16 / (1024 * 1024), o = a * 2 ** 16 / (1024 * 1024), d = yo();
            this.logger(`Initializing bb wasm: initial memory ${i} pages ${s}MiB; max memory: ${a} pages, ${o}MiB; threads: ${e}; shared memory: ${d}`), this.memory = new WebAssembly.Memory({
                initial: i,
                maximum: a,
                shared: d
            });
            const l = await WebAssembly.instantiate(n, this.getImportObj(this.memory));
            this.instance = l, this.call("_initialize"), e > 1 && (this.logger(`Creating ${e} worker threads`), this.workers = await Promise.all(Array.from({
                length: e - 1
            }).map(Kf)), this.remoteWasms = await Promise.all(this.workers.map(Eo)), await Promise.all(this.remoteWasms.map((u)=>u.initThread(n, this.memory))));
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
            const i = new Xf(this), a = i.getInputs(e), s = i.getOutputPtrs(r);
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
    const Qf = 4, Ra = 0, Na = 1, Jf = 2;
    function Qt(t) {
        let n = t.length;
        for(; --n >= 0;)t[n] = 0;
    }
    const eu = 0, So = 1, tu = 2, nu = 3, ru = 258, Ci = 29, Cn = 256, kn = Cn + 1 + Ci, Yt = 30, Ri = 19, vo = 2 * kn + 1, yt = 15, Mr = 16, iu = 7, Ni = 256, xo = 16, Io = 17, Ao = 18, pi = new Uint8Array([
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
    ]), au = new Uint8Array([
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
    ]), su = 512, et = new Array((kn + 2) * 2);
    Qt(et);
    const wn = new Array(Yt * 2);
    Qt(wn);
    const Sn = new Array(su);
    Qt(Sn);
    const vn = new Array(ru - nu + 1);
    Qt(vn);
    const Oi = new Array(Ci);
    Qt(Oi);
    const pr = new Array(Yt);
    Qt(pr);
    function Pr(t, n, e, r, i) {
        this.static_tree = t, this.extra_bits = n, this.extra_base = e, this.elems = r, this.max_length = i, this.has_stree = t && t.length;
    }
    let To, Uo, Co;
    function Wr(t, n) {
        this.dyn_tree = t, this.max_code = 0, this.stat_desc = n;
    }
    const Ro = (t)=>t < 256 ? Sn[t] : Sn[256 + (t >>> 7)], xn = (t, n)=>{
        t.pending_buf[t.pending++] = n & 255, t.pending_buf[t.pending++] = n >>> 8 & 255;
    }, Be = (t, n, e)=>{
        t.bi_valid > Mr - e ? (t.bi_buf |= n << t.bi_valid & 65535, xn(t, t.bi_buf), t.bi_buf = n >> Mr - t.bi_valid, t.bi_valid += e - Mr) : (t.bi_buf |= n << t.bi_valid & 65535, t.bi_valid += e);
    }, Ve = (t, n, e)=>{
        Be(t, e[n * 2], e[n * 2 + 1]);
    }, No = (t, n)=>{
        let e = 0;
        do e |= t & 1, t >>>= 1, e <<= 1;
        while (--n > 0);
        return e >>> 1;
    }, ou = (t)=>{
        t.bi_valid === 16 ? (xn(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = t.bi_buf & 255, t.bi_buf >>= 8, t.bi_valid -= 8);
    }, lu = (t, n)=>{
        const e = n.dyn_tree, r = n.max_code, i = n.stat_desc.static_tree, a = n.stat_desc.has_stree, s = n.stat_desc.extra_bits, o = n.stat_desc.extra_base, d = n.stat_desc.max_length;
        let l, u, m, w, p, k, x = 0;
        for(w = 0; w <= yt; w++)t.bl_count[w] = 0;
        for(e[t.heap[t.heap_max] * 2 + 1] = 0, l = t.heap_max + 1; l < vo; l++)u = t.heap[l], w = e[e[u * 2 + 1] * 2 + 1] + 1, w > d && (w = d, x++), e[u * 2 + 1] = w, !(u > r) && (t.bl_count[w]++, p = 0, u >= o && (p = s[u - o]), k = e[u * 2], t.opt_len += k * (w + p), a && (t.static_len += k * (i[u * 2 + 1] + p)));
        if (x !== 0) {
            do {
                for(w = d - 1; t.bl_count[w] === 0;)w--;
                t.bl_count[w]--, t.bl_count[w + 1] += 2, t.bl_count[d]--, x -= 2;
            }while (x > 0);
            for(w = d; w !== 0; w--)for(u = t.bl_count[w]; u !== 0;)m = t.heap[--l], !(m > r) && (e[m * 2 + 1] !== w && (t.opt_len += (w - e[m * 2 + 1]) * e[m * 2], e[m * 2 + 1] = w), u--);
        }
    }, Oo = (t, n, e)=>{
        const r = new Array(yt + 1);
        let i = 0, a, s;
        for(a = 1; a <= yt; a++)i = i + e[a - 1] << 1, r[a] = i;
        for(s = 0; s <= n; s++){
            let o = t[s * 2 + 1];
            o !== 0 && (t[s * 2] = No(r[o]++, o));
        }
    }, cu = ()=>{
        let t, n, e, r, i;
        const a = new Array(yt + 1);
        for(e = 0, r = 0; r < Ci - 1; r++)for(Oi[r] = e, t = 0; t < 1 << pi[r]; t++)vn[e++] = r;
        for(vn[e - 1] = r, i = 0, r = 0; r < 16; r++)for(pr[r] = i, t = 0; t < 1 << sr[r]; t++)Sn[i++] = r;
        for(i >>= 7; r < Yt; r++)for(pr[r] = i << 7, t = 0; t < 1 << sr[r] - 7; t++)Sn[256 + i++] = r;
        for(n = 0; n <= yt; n++)a[n] = 0;
        for(t = 0; t <= 143;)et[t * 2 + 1] = 8, t++, a[8]++;
        for(; t <= 255;)et[t * 2 + 1] = 9, t++, a[9]++;
        for(; t <= 279;)et[t * 2 + 1] = 7, t++, a[7]++;
        for(; t <= 287;)et[t * 2 + 1] = 8, t++, a[8]++;
        for(Oo(et, kn + 1, a), t = 0; t < Yt; t++)wn[t * 2 + 1] = 5, wn[t * 2] = No(t, 5);
        To = new Pr(et, pi, Cn + 1, kn, yt), Uo = new Pr(wn, sr, 0, Yt, yt), Co = new Pr(new Array(0), au, 0, Ri, iu);
    }, Do = (t)=>{
        let n;
        for(n = 0; n < kn; n++)t.dyn_ltree[n * 2] = 0;
        for(n = 0; n < Yt; n++)t.dyn_dtree[n * 2] = 0;
        for(n = 0; n < Ri; n++)t.bl_tree[n * 2] = 0;
        t.dyn_ltree[Ni * 2] = 1, t.opt_len = t.static_len = 0, t.sym_next = t.matches = 0;
    }, Fo = (t)=>{
        t.bi_valid > 8 ? xn(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0;
    }, Oa = (t, n, e, r)=>{
        const i = n * 2, a = e * 2;
        return t[i] < t[a] || t[i] === t[a] && r[n] <= r[e];
    }, Vr = (t, n, e)=>{
        const r = t.heap[e];
        let i = e << 1;
        for(; i <= t.heap_len && (i < t.heap_len && Oa(n, t.heap[i + 1], t.heap[i], t.depth) && i++, !Oa(n, r, t.heap[i], t.depth));)t.heap[e] = t.heap[i], e = i, i <<= 1;
        t.heap[e] = r;
    }, Da = (t, n, e)=>{
        let r, i, a = 0, s, o;
        if (t.sym_next !== 0) do r = t.pending_buf[t.sym_buf + a++] & 255, r += (t.pending_buf[t.sym_buf + a++] & 255) << 8, i = t.pending_buf[t.sym_buf + a++], r === 0 ? Ve(t, i, n) : (s = vn[i], Ve(t, s + Cn + 1, n), o = pi[s], o !== 0 && (i -= Oi[s], Be(t, i, o)), r--, s = Ro(r), Ve(t, s, e), o = sr[s], o !== 0 && (r -= pr[s], Be(t, r, o)));
        while (a < t.sym_next);
        Ve(t, Ni, n);
    }, wi = (t, n)=>{
        const e = n.dyn_tree, r = n.stat_desc.static_tree, i = n.stat_desc.has_stree, a = n.stat_desc.elems;
        let s, o, d = -1, l;
        for(t.heap_len = 0, t.heap_max = vo, s = 0; s < a; s++)e[s * 2] !== 0 ? (t.heap[++t.heap_len] = d = s, t.depth[s] = 0) : e[s * 2 + 1] = 0;
        for(; t.heap_len < 2;)l = t.heap[++t.heap_len] = d < 2 ? ++d : 0, e[l * 2] = 1, t.depth[l] = 0, t.opt_len--, i && (t.static_len -= r[l * 2 + 1]);
        for(n.max_code = d, s = t.heap_len >> 1; s >= 1; s--)Vr(t, e, s);
        l = a;
        do s = t.heap[1], t.heap[1] = t.heap[t.heap_len--], Vr(t, e, 1), o = t.heap[1], t.heap[--t.heap_max] = s, t.heap[--t.heap_max] = o, e[l * 2] = e[s * 2] + e[o * 2], t.depth[l] = (t.depth[s] >= t.depth[o] ? t.depth[s] : t.depth[o]) + 1, e[s * 2 + 1] = e[o * 2 + 1] = l, t.heap[1] = l++, Vr(t, e, 1);
        while (t.heap_len >= 2);
        t.heap[--t.heap_max] = t.heap[1], lu(t, n), Oo(e, d, t.bl_count);
    }, Fa = (t, n, e)=>{
        let r, i = -1, a, s = n[0 * 2 + 1], o = 0, d = 7, l = 4;
        for(s === 0 && (d = 138, l = 3), n[(e + 1) * 2 + 1] = 65535, r = 0; r <= e; r++)a = s, s = n[(r + 1) * 2 + 1], !(++o < d && a === s) && (o < l ? t.bl_tree[a * 2] += o : a !== 0 ? (a !== i && t.bl_tree[a * 2]++, t.bl_tree[xo * 2]++) : o <= 10 ? t.bl_tree[Io * 2]++ : t.bl_tree[Ao * 2]++, o = 0, i = a, s === 0 ? (d = 138, l = 3) : a === s ? (d = 6, l = 3) : (d = 7, l = 4));
    }, Ha = (t, n, e)=>{
        let r, i = -1, a, s = n[0 * 2 + 1], o = 0, d = 7, l = 4;
        for(s === 0 && (d = 138, l = 3), r = 0; r <= e; r++)if (a = s, s = n[(r + 1) * 2 + 1], !(++o < d && a === s)) {
            if (o < l) do Ve(t, a, t.bl_tree);
            while (--o !== 0);
            else a !== 0 ? (a !== i && (Ve(t, a, t.bl_tree), o--), Ve(t, xo, t.bl_tree), Be(t, o - 3, 2)) : o <= 10 ? (Ve(t, Io, t.bl_tree), Be(t, o - 3, 3)) : (Ve(t, Ao, t.bl_tree), Be(t, o - 11, 7));
            o = 0, i = a, s === 0 ? (d = 138, l = 3) : a === s ? (d = 6, l = 3) : (d = 7, l = 4);
        }
    }, fu = (t)=>{
        let n;
        for(Fa(t, t.dyn_ltree, t.l_desc.max_code), Fa(t, t.dyn_dtree, t.d_desc.max_code), wi(t, t.bl_desc), n = Ri - 1; n >= 3 && t.bl_tree[Bo[n] * 2 + 1] === 0; n--);
        return t.opt_len += 3 * (n + 1) + 5 + 5 + 4, n;
    }, uu = (t, n, e, r)=>{
        let i;
        for(Be(t, n - 257, 5), Be(t, e - 1, 5), Be(t, r - 4, 4), i = 0; i < r; i++)Be(t, t.bl_tree[Bo[i] * 2 + 1], 3);
        Ha(t, t.dyn_ltree, n - 1), Ha(t, t.dyn_dtree, e - 1);
    }, hu = (t)=>{
        let n = 4093624447, e;
        for(e = 0; e <= 31; e++, n >>>= 1)if (n & 1 && t.dyn_ltree[e * 2] !== 0) return Ra;
        if (t.dyn_ltree[9 * 2] !== 0 || t.dyn_ltree[10 * 2] !== 0 || t.dyn_ltree[13 * 2] !== 0) return Na;
        for(e = 32; e < Cn; e++)if (t.dyn_ltree[e * 2] !== 0) return Na;
        return Ra;
    };
    let za = !1;
    const du = (t)=>{
        za || (cu(), za = !0), t.l_desc = new Wr(t.dyn_ltree, To), t.d_desc = new Wr(t.dyn_dtree, Uo), t.bl_desc = new Wr(t.bl_tree, Co), t.bi_buf = 0, t.bi_valid = 0, Do(t);
    }, Ho = (t, n, e, r)=>{
        Be(t, (eu << 1) + (r ? 1 : 0), 3), Fo(t), xn(t, e), xn(t, ~e), e && t.pending_buf.set(t.window.subarray(n, n + e), t.pending), t.pending += e;
    }, _u = (t)=>{
        Be(t, So << 1, 3), Ve(t, Ni, et), ou(t);
    }, pu = (t, n, e, r)=>{
        let i, a, s = 0;
        t.level > 0 ? (t.strm.data_type === Jf && (t.strm.data_type = hu(t)), wi(t, t.l_desc), wi(t, t.d_desc), s = fu(t), i = t.opt_len + 3 + 7 >>> 3, a = t.static_len + 3 + 7 >>> 3, a <= i && (i = a)) : i = a = e + 5, e + 4 <= i && n !== -1 ? Ho(t, n, e, r) : t.strategy === Qf || a === i ? (Be(t, (So << 1) + (r ? 1 : 0), 3), Da(t, et, wn)) : (Be(t, (tu << 1) + (r ? 1 : 0), 3), uu(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, s + 1), Da(t, t.dyn_ltree, t.dyn_dtree)), Do(t), r && Fo(t);
    }, wu = (t, n, e)=>(t.pending_buf[t.sym_buf + t.sym_next++] = n, t.pending_buf[t.sym_buf + t.sym_next++] = n >> 8, t.pending_buf[t.sym_buf + t.sym_next++] = e, n === 0 ? t.dyn_ltree[e * 2]++ : (t.matches++, n--, t.dyn_ltree[(vn[e] + Cn + 1) * 2]++, t.dyn_dtree[Ro(n) * 2]++), t.sym_next === t.sym_end);
    var gu = du, mu = Ho, bu = pu, yu = wu, Eu = _u, ku = {
        _tr_init: gu,
        _tr_stored_block: mu,
        _tr_flush_block: bu,
        _tr_tally: yu,
        _tr_align: Eu
    };
    const Su = (t, n, e, r)=>{
        let i = t & 65535 | 0, a = t >>> 16 & 65535 | 0, s = 0;
        for(; e !== 0;){
            s = e > 2e3 ? 2e3 : e, e -= s;
            do i = i + n[r++] | 0, a = a + i | 0;
            while (--s);
            i %= 65521, a %= 65521;
        }
        return i | a << 16 | 0;
    };
    var In = Su;
    const vu = ()=>{
        let t, n = [];
        for(var e = 0; e < 256; e++){
            t = e;
            for(var r = 0; r < 8; r++)t = t & 1 ? 3988292384 ^ t >>> 1 : t >>> 1;
            n[e] = t;
        }
        return n;
    }, xu = new Uint32Array(vu()), Iu = (t, n, e, r)=>{
        const i = xu, a = r + e;
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
    const { _tr_init: Au, _tr_stored_block: gi, _tr_flush_block: Bu, _tr_tally: ft, _tr_align: Tu } = ku, { Z_NO_FLUSH: ut, Z_PARTIAL_FLUSH: Uu, Z_FULL_FLUSH: Cu, Z_FINISH: He, Z_BLOCK: Za, Z_OK: ke, Z_STREAM_END: $a, Z_STREAM_ERROR: Ge, Z_DATA_ERROR: Ru, Z_BUF_ERROR: Yr, Z_DEFAULT_COMPRESSION: Nu, Z_FILTERED: Ou, Z_HUFFMAN_ONLY: Yn, Z_RLE: Du, Z_FIXED: Fu, Z_DEFAULT_STRATEGY: Hu, Z_UNKNOWN: zu, Z_DEFLATED: Sr } = Rn, Zu = 9, $u = 15, Lu = 8, Mu = 29, Pu = 256, mi = Pu + 1 + Mu, Wu = 30, Vu = 19, Yu = 2 * mi + 1, Gu = 15, J = 3, lt = 258, je = lt + J + 1, ju = 32, Kt = 42, Di = 57, bi = 69, yi = 73, Ei = 91, ki = 103, Et = 113, hn = 666, ve = 1, Jt = 2, It = 3, en = 4, Ku = 3, kt = (t, n)=>(t.msg = xt[n], n), La = (t)=>t * 2 - (t > 4 ? 9 : 0), ot = (t)=>{
        let n = t.length;
        for(; --n >= 0;)t[n] = 0;
    }, qu = (t)=>{
        let n, e, r, i = t.w_size;
        n = t.hash_size, r = n;
        do e = t.head[--r], t.head[r] = e >= i ? e - i : 0;
        while (--n);
        n = i, r = n;
        do e = t.prev[--r], t.prev[r] = e >= i ? e - i : 0;
        while (--n);
    };
    let Xu = (t, n, e)=>(n << t.hash_shift ^ e) & t.hash_mask, ht = Xu;
    const Ce = (t)=>{
        const n = t.state;
        let e = n.pending;
        e > t.avail_out && (e = t.avail_out), e !== 0 && (t.output.set(n.pending_buf.subarray(n.pending_out, n.pending_out + e), t.next_out), t.next_out += e, n.pending_out += e, t.total_out += e, t.avail_out -= e, n.pending -= e, n.pending === 0 && (n.pending_out = 0));
    }, Oe = (t, n)=>{
        Bu(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, n), t.block_start = t.strstart, Ce(t.strm);
    }, ne = (t, n)=>{
        t.pending_buf[t.pending++] = n;
    }, on = (t, n)=>{
        t.pending_buf[t.pending++] = n >>> 8 & 255, t.pending_buf[t.pending++] = n & 255;
    }, Si = (t, n, e, r)=>{
        let i = t.avail_in;
        return i > r && (i = r), i === 0 ? 0 : (t.avail_in -= i, n.set(t.input.subarray(t.next_in, t.next_in + i), e), t.state.wrap === 1 ? t.adler = In(t.adler, n, i, e) : t.state.wrap === 2 && (t.adler = ye(t.adler, n, i, e)), t.next_in += i, t.total_in += i, i);
    }, zo = (t, n)=>{
        let e = t.max_chain_length, r = t.strstart, i, a, s = t.prev_length, o = t.nice_match;
        const d = t.strstart > t.w_size - je ? t.strstart - (t.w_size - je) : 0, l = t.window, u = t.w_mask, m = t.prev, w = t.strstart + lt;
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
        while ((n = m[n & u]) > d && --e !== 0);
        return s <= t.lookahead ? s : t.lookahead;
    }, qt = (t)=>{
        const n = t.w_size;
        let e, r, i;
        do {
            if (r = t.window_size - t.lookahead - t.strstart, t.strstart >= n + (n - je) && (t.window.set(t.window.subarray(n, n + n - r), 0), t.match_start -= n, t.strstart -= n, t.block_start -= n, t.insert > t.strstart && (t.insert = t.strstart), qu(t), r += n), t.strm.avail_in === 0) break;
            if (e = Si(t.strm, t.window, t.strstart + t.lookahead, r), t.lookahead += e, t.lookahead + t.insert >= J) for(i = t.strstart - t.insert, t.ins_h = t.window[i], t.ins_h = ht(t, t.ins_h, t.window[i + 1]); t.insert && (t.ins_h = ht(t, t.ins_h, t.window[i + J - 1]), t.prev[i & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = i, i++, t.insert--, !(t.lookahead + t.insert < J)););
        }while (t.lookahead < je && t.strm.avail_in !== 0);
    }, Zo = (t, n)=>{
        let e = t.pending_buf_size - 5 > t.w_size ? t.w_size : t.pending_buf_size - 5, r, i, a, s = 0, o = t.strm.avail_in;
        do {
            if (r = 65535, a = t.bi_valid + 42 >> 3, t.strm.avail_out < a || (a = t.strm.avail_out - a, i = t.strstart - t.block_start, r > i + t.strm.avail_in && (r = i + t.strm.avail_in), r > a && (r = a), r < e && (r === 0 && n !== He || n === ut || r !== i + t.strm.avail_in))) break;
            s = n === He && r === i + t.strm.avail_in ? 1 : 0, gi(t, 0, 0, s), t.pending_buf[t.pending - 4] = r, t.pending_buf[t.pending - 3] = r >> 8, t.pending_buf[t.pending - 2] = ~r, t.pending_buf[t.pending - 1] = ~r >> 8, Ce(t.strm), i && (i > r && (i = r), t.strm.output.set(t.window.subarray(t.block_start, t.block_start + i), t.strm.next_out), t.strm.next_out += i, t.strm.avail_out -= i, t.strm.total_out += i, t.block_start += i, r -= i), r && (Si(t.strm, t.strm.output, t.strm.next_out, r), t.strm.next_out += r, t.strm.avail_out -= r, t.strm.total_out += r);
        }while (s === 0);
        return o -= t.strm.avail_in, o && (o >= t.w_size ? (t.matches = 2, t.window.set(t.strm.input.subarray(t.strm.next_in - t.w_size, t.strm.next_in), 0), t.strstart = t.w_size, t.insert = t.strstart) : (t.window_size - t.strstart <= o && (t.strstart -= t.w_size, t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0), t.matches < 2 && t.matches++, t.insert > t.strstart && (t.insert = t.strstart)), t.window.set(t.strm.input.subarray(t.strm.next_in - o, t.strm.next_in), t.strstart), t.strstart += o, t.insert += o > t.w_size - t.insert ? t.w_size - t.insert : o), t.block_start = t.strstart), t.high_water < t.strstart && (t.high_water = t.strstart), s ? en : n !== ut && n !== He && t.strm.avail_in === 0 && t.strstart === t.block_start ? Jt : (a = t.window_size - t.strstart, t.strm.avail_in > a && t.block_start >= t.w_size && (t.block_start -= t.w_size, t.strstart -= t.w_size, t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0), t.matches < 2 && t.matches++, a += t.w_size, t.insert > t.strstart && (t.insert = t.strstart)), a > t.strm.avail_in && (a = t.strm.avail_in), a && (Si(t.strm, t.window, t.strstart, a), t.strstart += a, t.insert += a > t.w_size - t.insert ? t.w_size - t.insert : a), t.high_water < t.strstart && (t.high_water = t.strstart), a = t.bi_valid + 42 >> 3, a = t.pending_buf_size - a > 65535 ? 65535 : t.pending_buf_size - a, e = a > t.w_size ? t.w_size : a, i = t.strstart - t.block_start, (i >= e || (i || n === He) && n !== ut && t.strm.avail_in === 0 && i <= a) && (r = i > a ? a : i, s = n === He && t.strm.avail_in === 0 && r === i ? 1 : 0, gi(t, t.block_start, r, s), t.block_start += r, Ce(t.strm)), s ? It : ve);
    }, Gr = (t, n)=>{
        let e, r;
        for(;;){
            if (t.lookahead < je) {
                if (qt(t), t.lookahead < je && n === ut) return ve;
                if (t.lookahead === 0) break;
            }
            if (e = 0, t.lookahead >= J && (t.ins_h = ht(t, t.ins_h, t.window[t.strstart + J - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), e !== 0 && t.strstart - e <= t.w_size - je && (t.match_length = zo(t, e)), t.match_length >= J) if (r = ft(t, t.strstart - t.match_start, t.match_length - J), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= J) {
                t.match_length--;
                do t.strstart++, t.ins_h = ht(t, t.ins_h, t.window[t.strstart + J - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart;
                while (--t.match_length !== 0);
                t.strstart++;
            } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = ht(t, t.ins_h, t.window[t.strstart + 1]);
            else r = ft(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
            if (r && (Oe(t, !1), t.strm.avail_out === 0)) return ve;
        }
        return t.insert = t.strstart < J - 1 ? t.strstart : J - 1, n === He ? (Oe(t, !0), t.strm.avail_out === 0 ? It : en) : t.sym_next && (Oe(t, !1), t.strm.avail_out === 0) ? ve : Jt;
    }, Ht = (t, n)=>{
        let e, r, i;
        for(;;){
            if (t.lookahead < je) {
                if (qt(t), t.lookahead < je && n === ut) return ve;
                if (t.lookahead === 0) break;
            }
            if (e = 0, t.lookahead >= J && (t.ins_h = ht(t, t.ins_h, t.window[t.strstart + J - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = J - 1, e !== 0 && t.prev_length < t.max_lazy_match && t.strstart - e <= t.w_size - je && (t.match_length = zo(t, e), t.match_length <= 5 && (t.strategy === Ou || t.match_length === J && t.strstart - t.match_start > 4096) && (t.match_length = J - 1)), t.prev_length >= J && t.match_length <= t.prev_length) {
                i = t.strstart + t.lookahead - J, r = ft(t, t.strstart - 1 - t.prev_match, t.prev_length - J), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
                do ++t.strstart <= i && (t.ins_h = ht(t, t.ins_h, t.window[t.strstart + J - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart);
                while (--t.prev_length !== 0);
                if (t.match_available = 0, t.match_length = J - 1, t.strstart++, r && (Oe(t, !1), t.strm.avail_out === 0)) return ve;
            } else if (t.match_available) {
                if (r = ft(t, 0, t.window[t.strstart - 1]), r && Oe(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0) return ve;
            } else t.match_available = 1, t.strstart++, t.lookahead--;
        }
        return t.match_available && (r = ft(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < J - 1 ? t.strstart : J - 1, n === He ? (Oe(t, !0), t.strm.avail_out === 0 ? It : en) : t.sym_next && (Oe(t, !1), t.strm.avail_out === 0) ? ve : Jt;
    }, Qu = (t, n)=>{
        let e, r, i, a;
        const s = t.window;
        for(;;){
            if (t.lookahead <= lt) {
                if (qt(t), t.lookahead <= lt && n === ut) return ve;
                if (t.lookahead === 0) break;
            }
            if (t.match_length = 0, t.lookahead >= J && t.strstart > 0 && (i = t.strstart - 1, r = s[i], r === s[++i] && r === s[++i] && r === s[++i])) {
                a = t.strstart + lt;
                do ;
                while (r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && i < a);
                t.match_length = lt - (a - i), t.match_length > t.lookahead && (t.match_length = t.lookahead);
            }
            if (t.match_length >= J ? (e = ft(t, 1, t.match_length - J), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (e = ft(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), e && (Oe(t, !1), t.strm.avail_out === 0)) return ve;
        }
        return t.insert = 0, n === He ? (Oe(t, !0), t.strm.avail_out === 0 ? It : en) : t.sym_next && (Oe(t, !1), t.strm.avail_out === 0) ? ve : Jt;
    }, Ju = (t, n)=>{
        let e;
        for(;;){
            if (t.lookahead === 0 && (qt(t), t.lookahead === 0)) {
                if (n === ut) return ve;
                break;
            }
            if (t.match_length = 0, e = ft(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, e && (Oe(t, !1), t.strm.avail_out === 0)) return ve;
        }
        return t.insert = 0, n === He ? (Oe(t, !0), t.strm.avail_out === 0 ? It : en) : t.sym_next && (Oe(t, !1), t.strm.avail_out === 0) ? ve : Jt;
    };
    function Pe(t, n, e, r, i) {
        this.good_length = t, this.max_lazy = n, this.nice_length = e, this.max_chain = r, this.func = i;
    }
    const dn = [
        new Pe(0, 0, 0, 0, Zo),
        new Pe(4, 4, 8, 4, Gr),
        new Pe(4, 5, 16, 8, Gr),
        new Pe(4, 6, 32, 32, Gr),
        new Pe(4, 4, 16, 16, Ht),
        new Pe(8, 16, 32, 32, Ht),
        new Pe(8, 16, 128, 128, Ht),
        new Pe(8, 32, 128, 256, Ht),
        new Pe(32, 128, 258, 1024, Ht),
        new Pe(32, 258, 258, 4096, Ht)
    ], eh = (t)=>{
        t.window_size = 2 * t.w_size, ot(t.head), t.max_lazy_match = dn[t.level].max_lazy, t.good_match = dn[t.level].good_length, t.nice_match = dn[t.level].nice_length, t.max_chain_length = dn[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = J - 1, t.match_available = 0, t.ins_h = 0;
    };
    function th() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = Sr, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(Yu * 2), this.dyn_dtree = new Uint16Array((2 * Wu + 1) * 2), this.bl_tree = new Uint16Array((2 * Vu + 1) * 2), ot(this.dyn_ltree), ot(this.dyn_dtree), ot(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(Gu + 1), this.heap = new Uint16Array(2 * mi + 1), ot(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(2 * mi + 1), ot(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
    }
    const Nn = (t)=>{
        if (!t) return 1;
        const n = t.state;
        return !n || n.strm !== t || n.status !== Kt && n.status !== Di && n.status !== bi && n.status !== yi && n.status !== Ei && n.status !== ki && n.status !== Et && n.status !== hn ? 1 : 0;
    }, $o = (t)=>{
        if (Nn(t)) return kt(t, Ge);
        t.total_in = t.total_out = 0, t.data_type = zu;
        const n = t.state;
        return n.pending = 0, n.pending_out = 0, n.wrap < 0 && (n.wrap = -n.wrap), n.status = n.wrap === 2 ? Di : n.wrap ? Kt : Et, t.adler = n.wrap === 2 ? 0 : 1, n.last_flush = -2, Au(n), ke;
    }, Lo = (t)=>{
        const n = $o(t);
        return n === ke && eh(t.state), n;
    }, nh = (t, n)=>Nn(t) || t.state.wrap !== 2 ? Ge : (t.state.gzhead = n, ke), Mo = (t, n, e, r, i, a)=>{
        if (!t) return Ge;
        let s = 1;
        if (n === Nu && (n = 6), r < 0 ? (s = 0, r = -r) : r > 15 && (s = 2, r -= 16), i < 1 || i > Zu || e !== Sr || r < 8 || r > 15 || n < 0 || n > 9 || a < 0 || a > Fu || r === 8 && s !== 1) return kt(t, Ge);
        r === 8 && (r = 9);
        const o = new th;
        return t.state = o, o.strm = t, o.status = Kt, o.wrap = s, o.gzhead = null, o.w_bits = r, o.w_size = 1 << o.w_bits, o.w_mask = o.w_size - 1, o.hash_bits = i + 7, o.hash_size = 1 << o.hash_bits, o.hash_mask = o.hash_size - 1, o.hash_shift = ~~((o.hash_bits + J - 1) / J), o.window = new Uint8Array(o.w_size * 2), o.head = new Uint16Array(o.hash_size), o.prev = new Uint16Array(o.w_size), o.lit_bufsize = 1 << i + 6, o.pending_buf_size = o.lit_bufsize * 4, o.pending_buf = new Uint8Array(o.pending_buf_size), o.sym_buf = o.lit_bufsize, o.sym_end = (o.lit_bufsize - 1) * 3, o.level = n, o.strategy = a, o.method = e, Lo(t);
    }, rh = (t, n)=>Mo(t, n, Sr, $u, Lu, Hu), ih = (t, n)=>{
        if (Nn(t) || n > Za || n < 0) return t ? kt(t, Ge) : Ge;
        const e = t.state;
        if (!t.output || t.avail_in !== 0 && !t.input || e.status === hn && n !== He) return kt(t, t.avail_out === 0 ? Yr : Ge);
        const r = e.last_flush;
        if (e.last_flush = n, e.pending !== 0) {
            if (Ce(t), t.avail_out === 0) return e.last_flush = -1, ke;
        } else if (t.avail_in === 0 && La(n) <= La(r) && n !== He) return kt(t, Yr);
        if (e.status === hn && t.avail_in !== 0) return kt(t, Yr);
        if (e.status === Kt && e.wrap === 0 && (e.status = Et), e.status === Kt) {
            let i = Sr + (e.w_bits - 8 << 4) << 8, a = -1;
            if (e.strategy >= Yn || e.level < 2 ? a = 0 : e.level < 6 ? a = 1 : e.level === 6 ? a = 2 : a = 3, i |= a << 6, e.strstart !== 0 && (i |= ju), i += 31 - i % 31, on(e, i), e.strstart !== 0 && (on(e, t.adler >>> 16), on(e, t.adler & 65535)), t.adler = 1, e.status = Et, Ce(t), e.pending !== 0) return e.last_flush = -1, ke;
        }
        if (e.status === Di) {
            if (t.adler = 0, ne(e, 31), ne(e, 139), ne(e, 8), e.gzhead) ne(e, (e.gzhead.text ? 1 : 0) + (e.gzhead.hcrc ? 2 : 0) + (e.gzhead.extra ? 4 : 0) + (e.gzhead.name ? 8 : 0) + (e.gzhead.comment ? 16 : 0)), ne(e, e.gzhead.time & 255), ne(e, e.gzhead.time >> 8 & 255), ne(e, e.gzhead.time >> 16 & 255), ne(e, e.gzhead.time >> 24 & 255), ne(e, e.level === 9 ? 2 : e.strategy >= Yn || e.level < 2 ? 4 : 0), ne(e, e.gzhead.os & 255), e.gzhead.extra && e.gzhead.extra.length && (ne(e, e.gzhead.extra.length & 255), ne(e, e.gzhead.extra.length >> 8 & 255)), e.gzhead.hcrc && (t.adler = ye(t.adler, e.pending_buf, e.pending, 0)), e.gzindex = 0, e.status = bi;
            else if (ne(e, 0), ne(e, 0), ne(e, 0), ne(e, 0), ne(e, 0), ne(e, e.level === 9 ? 2 : e.strategy >= Yn || e.level < 2 ? 4 : 0), ne(e, Ku), e.status = Et, Ce(t), e.pending !== 0) return e.last_flush = -1, ke;
        }
        if (e.status === bi) {
            if (e.gzhead.extra) {
                let i = e.pending, a = (e.gzhead.extra.length & 65535) - e.gzindex;
                for(; e.pending + a > e.pending_buf_size;){
                    let o = e.pending_buf_size - e.pending;
                    if (e.pending_buf.set(e.gzhead.extra.subarray(e.gzindex, e.gzindex + o), e.pending), e.pending = e.pending_buf_size, e.gzhead.hcrc && e.pending > i && (t.adler = ye(t.adler, e.pending_buf, e.pending - i, i)), e.gzindex += o, Ce(t), e.pending !== 0) return e.last_flush = -1, ke;
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
                        if (e.gzhead.hcrc && e.pending > i && (t.adler = ye(t.adler, e.pending_buf, e.pending - i, i)), Ce(t), e.pending !== 0) return e.last_flush = -1, ke;
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
                        if (e.gzhead.hcrc && e.pending > i && (t.adler = ye(t.adler, e.pending_buf, e.pending - i, i)), Ce(t), e.pending !== 0) return e.last_flush = -1, ke;
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
                if (e.pending + 2 > e.pending_buf_size && (Ce(t), e.pending !== 0)) return e.last_flush = -1, ke;
                ne(e, t.adler & 255), ne(e, t.adler >> 8 & 255), t.adler = 0;
            }
            if (e.status = Et, Ce(t), e.pending !== 0) return e.last_flush = -1, ke;
        }
        if (t.avail_in !== 0 || e.lookahead !== 0 || n !== ut && e.status !== hn) {
            let i = e.level === 0 ? Zo(e, n) : e.strategy === Yn ? Ju(e, n) : e.strategy === Du ? Qu(e, n) : dn[e.level].func(e, n);
            if ((i === It || i === en) && (e.status = hn), i === ve || i === It) return t.avail_out === 0 && (e.last_flush = -1), ke;
            if (i === Jt && (n === Uu ? Tu(e) : n !== Za && (gi(e, 0, 0, !1), n === Cu && (ot(e.head), e.lookahead === 0 && (e.strstart = 0, e.block_start = 0, e.insert = 0))), Ce(t), t.avail_out === 0)) return e.last_flush = -1, ke;
        }
        return n !== He ? ke : e.wrap <= 0 ? $a : (e.wrap === 2 ? (ne(e, t.adler & 255), ne(e, t.adler >> 8 & 255), ne(e, t.adler >> 16 & 255), ne(e, t.adler >> 24 & 255), ne(e, t.total_in & 255), ne(e, t.total_in >> 8 & 255), ne(e, t.total_in >> 16 & 255), ne(e, t.total_in >> 24 & 255)) : (on(e, t.adler >>> 16), on(e, t.adler & 65535)), Ce(t), e.wrap > 0 && (e.wrap = -e.wrap), e.pending !== 0 ? ke : $a);
    }, ah = (t)=>{
        if (Nn(t)) return Ge;
        const n = t.state.status;
        return t.state = null, n === Et ? kt(t, Ru) : ke;
    }, sh = (t, n)=>{
        let e = n.length;
        if (Nn(t)) return Ge;
        const r = t.state, i = r.wrap;
        if (i === 2 || i === 1 && r.status !== Kt || r.lookahead) return Ge;
        if (i === 1 && (t.adler = In(t.adler, n, e, 0)), r.wrap = 0, e >= r.w_size) {
            i === 0 && (ot(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0);
            let d = new Uint8Array(r.w_size);
            d.set(n.subarray(e - r.w_size, e), 0), n = d, e = r.w_size;
        }
        const a = t.avail_in, s = t.next_in, o = t.input;
        for(t.avail_in = e, t.next_in = 0, t.input = n, qt(r); r.lookahead >= J;){
            let d = r.strstart, l = r.lookahead - (J - 1);
            do r.ins_h = ht(r, r.ins_h, r.window[d + J - 1]), r.prev[d & r.w_mask] = r.head[r.ins_h], r.head[r.ins_h] = d, d++;
            while (--l);
            r.strstart = d, r.lookahead = J - 1, qt(r);
        }
        return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = J - 1, r.match_available = 0, t.next_in = s, t.input = o, t.avail_in = a, r.wrap = i, ke;
    };
    var oh = rh, lh = Mo, ch = Lo, fh = $o, uh = nh, hh = ih, dh = ah, _h = sh, ph = "pako deflate (from Nodeca project)", gn = {
        deflateInit: oh,
        deflateInit2: lh,
        deflateReset: ch,
        deflateResetKeep: fh,
        deflateSetHeader: uh,
        deflate: hh,
        deflateEnd: dh,
        deflateSetDictionary: _h,
        deflateInfo: ph
    };
    const wh = (t, n)=>Object.prototype.hasOwnProperty.call(t, n);
    var gh = function(t) {
        const n = Array.prototype.slice.call(arguments, 1);
        for(; n.length;){
            const e = n.shift();
            if (e) {
                if (typeof e != "object") throw new TypeError(e + "must be non-object");
                for(const r in e)wh(e, r) && (t[r] = e[r]);
            }
        }
        return t;
    }, mh = (t)=>{
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
        flattenChunks: mh
    };
    let Po = !0;
    try {
        String.fromCharCode.apply(null, new Uint8Array(1));
    } catch  {
        Po = !1;
    }
    const An = new Uint8Array(256);
    for(let t = 0; t < 256; t++)An[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
    An[254] = An[254] = 1;
    var bh = (t)=>{
        if (typeof TextEncoder == "function" && TextEncoder.prototype.encode) return new TextEncoder().encode(t);
        let n, e, r, i, a, s = t.length, o = 0;
        for(i = 0; i < s; i++)e = t.charCodeAt(i), (e & 64512) === 55296 && i + 1 < s && (r = t.charCodeAt(i + 1), (r & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (r - 56320), i++)), o += e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4;
        for(n = new Uint8Array(o), a = 0, i = 0; a < o; i++)e = t.charCodeAt(i), (e & 64512) === 55296 && i + 1 < s && (r = t.charCodeAt(i + 1), (r & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (r - 56320), i++)), e < 128 ? n[a++] = e : e < 2048 ? (n[a++] = 192 | e >>> 6, n[a++] = 128 | e & 63) : e < 65536 ? (n[a++] = 224 | e >>> 12, n[a++] = 128 | e >>> 6 & 63, n[a++] = 128 | e & 63) : (n[a++] = 240 | e >>> 18, n[a++] = 128 | e >>> 12 & 63, n[a++] = 128 | e >>> 6 & 63, n[a++] = 128 | e & 63);
        return n;
    };
    const yh = (t, n)=>{
        if (n < 65534 && t.subarray && Po) return String.fromCharCode.apply(null, t.length === n ? t : t.subarray(0, n));
        let e = "";
        for(let r = 0; r < n; r++)e += String.fromCharCode(t[r]);
        return e;
    };
    var Eh = (t, n)=>{
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
            let o = An[s];
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
        return yh(a, i);
    }, kh = (t, n)=>{
        n = n || t.length, n > t.length && (n = t.length);
        let e = n - 1;
        for(; e >= 0 && (t[e] & 192) === 128;)e--;
        return e < 0 || e === 0 ? n : e + An[t[e]] > n ? e : n;
    }, Bn = {
        string2buf: bh,
        buf2string: Eh,
        utf8border: kh
    };
    function Sh() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
    }
    var Wo = Sh;
    const Vo = Object.prototype.toString, { Z_NO_FLUSH: vh, Z_SYNC_FLUSH: xh, Z_FULL_FLUSH: Ih, Z_FINISH: Ah, Z_OK: wr, Z_STREAM_END: Bh, Z_DEFAULT_COMPRESSION: Th, Z_DEFAULT_STRATEGY: Uh, Z_DEFLATED: Ch } = Rn;
    function On(t) {
        this.options = vr.assign({
            level: Th,
            method: Ch,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: Uh
        }, t || {});
        let n = this.options;
        n.raw && n.windowBits > 0 ? n.windowBits = -n.windowBits : n.gzip && n.windowBits > 0 && n.windowBits < 16 && (n.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Wo, this.strm.avail_out = 0;
        let e = gn.deflateInit2(this.strm, n.level, n.method, n.windowBits, n.memLevel, n.strategy);
        if (e !== wr) throw new Error(xt[e]);
        if (n.header && gn.deflateSetHeader(this.strm, n.header), n.dictionary) {
            let r;
            if (typeof n.dictionary == "string" ? r = Bn.string2buf(n.dictionary) : Vo.call(n.dictionary) === "[object ArrayBuffer]" ? r = new Uint8Array(n.dictionary) : r = n.dictionary, e = gn.deflateSetDictionary(this.strm, r), e !== wr) throw new Error(xt[e]);
            this._dict_set = !0;
        }
    }
    On.prototype.push = function(t, n) {
        const e = this.strm, r = this.options.chunkSize;
        let i, a;
        if (this.ended) return !1;
        for(n === ~~n ? a = n : a = n === !0 ? Ah : vh, typeof t == "string" ? e.input = Bn.string2buf(t) : Vo.call(t) === "[object ArrayBuffer]" ? e.input = new Uint8Array(t) : e.input = t, e.next_in = 0, e.avail_in = e.input.length;;){
            if (e.avail_out === 0 && (e.output = new Uint8Array(r), e.next_out = 0, e.avail_out = r), (a === xh || a === Ih) && e.avail_out <= 6) {
                this.onData(e.output.subarray(0, e.next_out)), e.avail_out = 0;
                continue;
            }
            if (i = gn.deflate(e, a), i === Bh) return e.next_out > 0 && this.onData(e.output.subarray(0, e.next_out)), i = gn.deflateEnd(this.strm), this.onEnd(i), this.ended = !0, i === wr;
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
    function Rh(t, n) {
        return n = n || {}, n.raw = !0, Fi(t, n);
    }
    function Nh(t, n) {
        return n = n || {}, n.gzip = !0, Fi(t, n);
    }
    var Oh = On, Dh = Fi, Fh = Rh, Hh = Nh, zh = {
        Deflate: Oh,
        deflate: Dh,
        deflateRaw: Fh,
        gzip: Hh
    };
    const Gn = 16209, Zh = 16191;
    var $h = function(n, e) {
        let r, i, a, s, o, d, l, u, m, w, p, k, x, A, B, D, U, g, F, V, T, P, z, R;
        const H = n.state;
        r = n.next_in, z = n.input, i = r + (n.avail_in - 5), a = n.next_out, R = n.output, s = a - (e - n.avail_out), o = a + (n.avail_out - 257), d = H.dmax, l = H.wsize, u = H.whave, m = H.wnext, w = H.window, p = H.hold, k = H.bits, x = H.lencode, A = H.distcode, B = (1 << H.lenbits) - 1, D = (1 << H.distbits) - 1;
        e: do {
            k < 15 && (p += z[r++] << k, k += 8, p += z[r++] << k, k += 8), U = x[p & B];
            t: for(;;){
                if (g = U >>> 24, p >>>= g, k -= g, g = U >>> 16 & 255, g === 0) R[a++] = U & 65535;
                else if (g & 16) {
                    F = U & 65535, g &= 15, g && (k < g && (p += z[r++] << k, k += 8), F += p & (1 << g) - 1, p >>>= g, k -= g), k < 15 && (p += z[r++] << k, k += 8, p += z[r++] << k, k += 8), U = A[p & D];
                    n: for(;;){
                        if (g = U >>> 24, p >>>= g, k -= g, g = U >>> 16 & 255, g & 16) {
                            if (V = U & 65535, g &= 15, k < g && (p += z[r++] << k, k += 8, k < g && (p += z[r++] << k, k += 8)), V += p & (1 << g) - 1, V > d) {
                                n.msg = "invalid distance too far back", H.mode = Gn;
                                break e;
                            }
                            if (p >>>= g, k -= g, g = a - s, V > g) {
                                if (g = V - g, g > u && H.sane) {
                                    n.msg = "invalid distance too far back", H.mode = Gn;
                                    break e;
                                }
                                if (T = 0, P = w, m === 0) {
                                    if (T += l - g, g < F) {
                                        F -= g;
                                        do R[a++] = w[T++];
                                        while (--g);
                                        T = a - V, P = R;
                                    }
                                } else if (m < g) {
                                    if (T += l + m - g, g -= m, g < F) {
                                        F -= g;
                                        do R[a++] = w[T++];
                                        while (--g);
                                        if (T = 0, m < F) {
                                            g = m, F -= g;
                                            do R[a++] = w[T++];
                                            while (--g);
                                            T = a - V, P = R;
                                        }
                                    }
                                } else if (T += m - g, g < F) {
                                    F -= g;
                                    do R[a++] = w[T++];
                                    while (--g);
                                    T = a - V, P = R;
                                }
                                for(; F > 2;)R[a++] = P[T++], R[a++] = P[T++], R[a++] = P[T++], F -= 3;
                                F && (R[a++] = P[T++], F > 1 && (R[a++] = P[T++]));
                            } else {
                                T = a - V;
                                do R[a++] = R[T++], R[a++] = R[T++], R[a++] = R[T++], F -= 3;
                                while (F > 2);
                                F && (R[a++] = R[T++], F > 1 && (R[a++] = R[T++]));
                            }
                        } else if (g & 64) {
                            n.msg = "invalid distance code", H.mode = Gn;
                            break e;
                        } else {
                            U = A[(U & 65535) + (p & (1 << g) - 1)];
                            continue n;
                        }
                        break;
                    }
                } else if (g & 64) if (g & 32) {
                    H.mode = Zh;
                    break e;
                } else {
                    n.msg = "invalid literal/length code", H.mode = Gn;
                    break e;
                }
                else {
                    U = x[(U & 65535) + (p & (1 << g) - 1)];
                    continue t;
                }
                break;
            }
        }while (r < i && a < o);
        F = k >> 3, r -= F, k -= F << 3, p &= (1 << k) - 1, n.next_in = r, n.next_out = a, n.avail_in = r < i ? 5 + (i - r) : 5 - (r - i), n.avail_out = a < o ? 257 + (o - a) : 257 - (a - o), H.hold = p, H.bits = k;
    };
    const zt = 15, Ma = 852, Pa = 592, Wa = 0, jr = 1, Va = 2, Lh = new Uint16Array([
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
    ]), Mh = new Uint8Array([
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
    ]), Ph = new Uint16Array([
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
    ]), Wh = new Uint8Array([
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
    ]), Vh = (t, n, e, r, i, a, s, o)=>{
        const d = o.bits;
        let l = 0, u = 0, m = 0, w = 0, p = 0, k = 0, x = 0, A = 0, B = 0, D = 0, U, g, F, V, T, P = null, z;
        const R = new Uint16Array(zt + 1), H = new Uint16Array(zt + 1);
        let ae = null, S, $, O;
        for(l = 0; l <= zt; l++)R[l] = 0;
        for(u = 0; u < r; u++)R[n[e + u]]++;
        for(p = d, w = zt; w >= 1 && R[w] === 0; w--);
        if (p > w && (p = w), w === 0) return i[a++] = 1 << 24 | 64 << 16 | 0, i[a++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
        for(m = 1; m < w && R[m] === 0; m++);
        for(p < m && (p = m), A = 1, l = 1; l <= zt; l++)if (A <<= 1, A -= R[l], A < 0) return -1;
        if (A > 0 && (t === Wa || w !== 1)) return -1;
        for(H[1] = 0, l = 1; l < zt; l++)H[l + 1] = H[l] + R[l];
        for(u = 0; u < r; u++)n[e + u] !== 0 && (s[H[n[e + u]]++] = u);
        if (t === Wa ? (P = ae = s, z = 20) : t === jr ? (P = Lh, ae = Mh, z = 257) : (P = Ph, ae = Wh, z = 0), D = 0, u = 0, l = m, T = a, k = p, x = 0, F = -1, B = 1 << p, V = B - 1, t === jr && B > Ma || t === Va && B > Pa) return 1;
        for(;;){
            S = l - x, s[u] + 1 < z ? ($ = 0, O = s[u]) : s[u] >= z ? ($ = ae[s[u] - z], O = P[s[u] - z]) : ($ = 96, O = 0), U = 1 << l - x, g = 1 << k, m = g;
            do g -= U, i[T + (D >> x) + g] = S << 24 | $ << 16 | O | 0;
            while (g !== 0);
            for(U = 1 << l - 1; D & U;)U >>= 1;
            if (U !== 0 ? (D &= U - 1, D += U) : D = 0, u++, --R[l] === 0) {
                if (l === w) break;
                l = n[e + s[u]];
            }
            if (l > p && (D & V) !== F) {
                for(x === 0 && (x = p), T += m, k = l - x, A = 1 << k; k + x < w && (A -= R[k + x], !(A <= 0));)k++, A <<= 1;
                if (B += 1 << k, t === jr && B > Ma || t === Va && B > Pa) return 1;
                F = D & V, i[F] = p << 24 | k << 16 | T - a | 0;
            }
        }
        return D !== 0 && (i[T + D] = l - x << 24 | 64 << 16 | 0), o.bits = p, 0;
    };
    var mn = Vh;
    const Yh = 0, Yo = 1, Go = 2, { Z_FINISH: Ya, Z_BLOCK: Gh, Z_TREES: jn, Z_OK: At, Z_STREAM_END: jh, Z_NEED_DICT: Kh, Z_STREAM_ERROR: Ze, Z_DATA_ERROR: jo, Z_MEM_ERROR: Ko, Z_BUF_ERROR: qh, Z_DEFLATED: Ga } = Rn, xr = 16180, ja = 16181, Ka = 16182, qa = 16183, Xa = 16184, Qa = 16185, Ja = 16186, es = 16187, ts = 16188, ns = 16189, gr = 16190, Je = 16191, Kr = 16192, rs = 16193, qr = 16194, is = 16195, as = 16196, ss = 16197, os = 16198, Kn = 16199, qn = 16200, ls = 16201, cs = 16202, fs = 16203, us = 16204, hs = 16205, Xr = 16206, ds = 16207, _s = 16208, he = 16209, qo = 16210, Xo = 16211, Xh = 852, Qh = 592, Jh = 15, ed = Jh, ps = (t)=>(t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
    function td() {
        this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
    }
    const Tt = (t)=>{
        if (!t) return 1;
        const n = t.state;
        return !n || n.strm !== t || n.mode < xr || n.mode > Xo ? 1 : 0;
    }, Qo = (t)=>{
        if (Tt(t)) return Ze;
        const n = t.state;
        return t.total_in = t.total_out = n.total = 0, t.msg = "", n.wrap && (t.adler = n.wrap & 1), n.mode = xr, n.last = 0, n.havedict = 0, n.flags = -1, n.dmax = 32768, n.head = null, n.hold = 0, n.bits = 0, n.lencode = n.lendyn = new Int32Array(Xh), n.distcode = n.distdyn = new Int32Array(Qh), n.sane = 1, n.back = -1, At;
    }, Jo = (t)=>{
        if (Tt(t)) return Ze;
        const n = t.state;
        return n.wsize = 0, n.whave = 0, n.wnext = 0, Qo(t);
    }, el = (t, n)=>{
        let e;
        if (Tt(t)) return Ze;
        const r = t.state;
        return n < 0 ? (e = 0, n = -n) : (e = (n >> 4) + 5, n < 48 && (n &= 15)), n && (n < 8 || n > 15) ? Ze : (r.window !== null && r.wbits !== n && (r.window = null), r.wrap = e, r.wbits = n, Jo(t));
    }, tl = (t, n)=>{
        if (!t) return Ze;
        const e = new td;
        t.state = e, e.strm = t, e.window = null, e.mode = xr;
        const r = el(t, n);
        return r !== At && (t.state = null), r;
    }, nd = (t)=>tl(t, ed);
    let ws = !0, Qr, Jr;
    const rd = (t)=>{
        if (ws) {
            Qr = new Int32Array(512), Jr = new Int32Array(32);
            let n = 0;
            for(; n < 144;)t.lens[n++] = 8;
            for(; n < 256;)t.lens[n++] = 9;
            for(; n < 280;)t.lens[n++] = 7;
            for(; n < 288;)t.lens[n++] = 8;
            for(mn(Yo, t.lens, 0, 288, Qr, 0, t.work, {
                bits: 9
            }), n = 0; n < 32;)t.lens[n++] = 5;
            mn(Go, t.lens, 0, 32, Jr, 0, t.work, {
                bits: 5
            }), ws = !1;
        }
        t.lencode = Qr, t.lenbits = 9, t.distcode = Jr, t.distbits = 5;
    }, nl = (t, n, e, r)=>{
        let i;
        const a = t.state;
        return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Uint8Array(a.wsize)), r >= a.wsize ? (a.window.set(n.subarray(e - a.wsize, e), 0), a.wnext = 0, a.whave = a.wsize) : (i = a.wsize - a.wnext, i > r && (i = r), a.window.set(n.subarray(e - r, e - r + i), a.wnext), r -= i, r ? (a.window.set(n.subarray(e - r, e), 0), a.wnext = r, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0;
    }, id = (t, n)=>{
        let e, r, i, a, s, o, d, l, u, m, w, p, k, x, A = 0, B, D, U, g, F, V, T, P;
        const z = new Uint8Array(4);
        let R, H;
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
        if (Tt(t) || !t.output || !t.input && t.avail_in !== 0) return Ze;
        e = t.state, e.mode === Je && (e.mode = Kr), s = t.next_out, i = t.output, d = t.avail_out, a = t.next_in, r = t.input, o = t.avail_in, l = e.hold, u = e.bits, m = o, w = d, P = At;
        e: for(;;)switch(e.mode){
            case xr:
                if (e.wrap === 0) {
                    e.mode = Kr;
                    break;
                }
                for(; u < 16;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (e.wrap & 2 && l === 35615) {
                    e.wbits === 0 && (e.wbits = 15), e.check = 0, z[0] = l & 255, z[1] = l >>> 8 & 255, e.check = ye(e.check, z, 2, 0), l = 0, u = 0, e.mode = ja;
                    break;
                }
                if (e.head && (e.head.done = !1), !(e.wrap & 1) || (((l & 255) << 8) + (l >> 8)) % 31) {
                    t.msg = "incorrect header check", e.mode = he;
                    break;
                }
                if ((l & 15) !== Ga) {
                    t.msg = "unknown compression method", e.mode = he;
                    break;
                }
                if (l >>>= 4, u -= 4, T = (l & 15) + 8, e.wbits === 0 && (e.wbits = T), T > 15 || T > e.wbits) {
                    t.msg = "invalid window size", e.mode = he;
                    break;
                }
                e.dmax = 1 << e.wbits, e.flags = 0, t.adler = e.check = 1, e.mode = l & 512 ? ns : Je, l = 0, u = 0;
                break;
            case ja:
                for(; u < 16;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (e.flags = l, (e.flags & 255) !== Ga) {
                    t.msg = "unknown compression method", e.mode = he;
                    break;
                }
                if (e.flags & 57344) {
                    t.msg = "unknown header flags set", e.mode = he;
                    break;
                }
                e.head && (e.head.text = l >> 8 & 1), e.flags & 512 && e.wrap & 4 && (z[0] = l & 255, z[1] = l >>> 8 & 255, e.check = ye(e.check, z, 2, 0)), l = 0, u = 0, e.mode = Ka;
            case Ka:
                for(; u < 32;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                e.head && (e.head.time = l), e.flags & 512 && e.wrap & 4 && (z[0] = l & 255, z[1] = l >>> 8 & 255, z[2] = l >>> 16 & 255, z[3] = l >>> 24 & 255, e.check = ye(e.check, z, 4, 0)), l = 0, u = 0, e.mode = qa;
            case qa:
                for(; u < 16;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                e.head && (e.head.xflags = l & 255, e.head.os = l >> 8), e.flags & 512 && e.wrap & 4 && (z[0] = l & 255, z[1] = l >>> 8 & 255, e.check = ye(e.check, z, 2, 0)), l = 0, u = 0, e.mode = Xa;
            case Xa:
                if (e.flags & 1024) {
                    for(; u < 16;){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    e.length = l, e.head && (e.head.extra_len = l), e.flags & 512 && e.wrap & 4 && (z[0] = l & 255, z[1] = l >>> 8 & 255, e.check = ye(e.check, z, 2, 0)), l = 0, u = 0;
                } else e.head && (e.head.extra = null);
                e.mode = Qa;
            case Qa:
                if (e.flags & 1024 && (p = e.length, p > o && (p = o), p && (e.head && (T = e.head.extra_len - e.length, e.head.extra || (e.head.extra = new Uint8Array(e.head.extra_len)), e.head.extra.set(r.subarray(a, a + p), T)), e.flags & 512 && e.wrap & 4 && (e.check = ye(e.check, r, p, a)), o -= p, a += p, e.length -= p), e.length)) break e;
                e.length = 0, e.mode = Ja;
            case Ja:
                if (e.flags & 2048) {
                    if (o === 0) break e;
                    p = 0;
                    do T = r[a + p++], e.head && T && e.length < 65536 && (e.head.name += String.fromCharCode(T));
                    while (T && p < o);
                    if (e.flags & 512 && e.wrap & 4 && (e.check = ye(e.check, r, p, a)), o -= p, a += p, T) break e;
                } else e.head && (e.head.name = null);
                e.length = 0, e.mode = es;
            case es:
                if (e.flags & 4096) {
                    if (o === 0) break e;
                    p = 0;
                    do T = r[a + p++], e.head && T && e.length < 65536 && (e.head.comment += String.fromCharCode(T));
                    while (T && p < o);
                    if (e.flags & 512 && e.wrap & 4 && (e.check = ye(e.check, r, p, a)), o -= p, a += p, T) break e;
                } else e.head && (e.head.comment = null);
                e.mode = ts;
            case ts:
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
                e.head && (e.head.hcrc = e.flags >> 9 & 1, e.head.done = !0), t.adler = e.check = 0, e.mode = Je;
                break;
            case ns:
                for(; u < 32;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                t.adler = e.check = ps(l), l = 0, u = 0, e.mode = gr;
            case gr:
                if (e.havedict === 0) return t.next_out = s, t.avail_out = d, t.next_in = a, t.avail_in = o, e.hold = l, e.bits = u, Kh;
                t.adler = e.check = 1, e.mode = Je;
            case Je:
                if (n === Gh || n === jn) break e;
            case Kr:
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
                        e.mode = rs;
                        break;
                    case 1:
                        if (rd(e), e.mode = Kn, n === jn) {
                            l >>>= 2, u -= 2;
                            break e;
                        }
                        break;
                    case 2:
                        e.mode = as;
                        break;
                    case 3:
                        t.msg = "invalid block type", e.mode = he;
                }
                l >>>= 2, u -= 2;
                break;
            case rs:
                for(l >>>= u & 7, u -= u & 7; u < 32;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if ((l & 65535) !== (l >>> 16 ^ 65535)) {
                    t.msg = "invalid stored block lengths", e.mode = he;
                    break;
                }
                if (e.length = l & 65535, l = 0, u = 0, e.mode = qr, n === jn) break e;
            case qr:
                e.mode = is;
            case is:
                if (p = e.length, p) {
                    if (p > o && (p = o), p > d && (p = d), p === 0) break e;
                    i.set(r.subarray(a, a + p), s), o -= p, a += p, d -= p, s += p, e.length -= p;
                    break;
                }
                e.mode = Je;
                break;
            case as:
                for(; u < 14;){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (e.nlen = (l & 31) + 257, l >>>= 5, u -= 5, e.ndist = (l & 31) + 1, l >>>= 5, u -= 5, e.ncode = (l & 15) + 4, l >>>= 4, u -= 4, e.nlen > 286 || e.ndist > 30) {
                    t.msg = "too many length or distance symbols", e.mode = he;
                    break;
                }
                e.have = 0, e.mode = ss;
            case ss:
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
                }, P = mn(Yh, e.lens, 0, 19, e.lencode, 0, e.work, R), e.lenbits = R.bits, P) {
                    t.msg = "invalid code lengths set", e.mode = he;
                    break;
                }
                e.have = 0, e.mode = os;
            case os:
                for(; e.have < e.nlen + e.ndist;){
                    for(; A = e.lencode[l & (1 << e.lenbits) - 1], B = A >>> 24, D = A >>> 16 & 255, U = A & 65535, !(B <= u);){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    if (U < 16) l >>>= B, u -= B, e.lens[e.have++] = U;
                    else {
                        if (U === 16) {
                            for(H = B + 2; u < H;){
                                if (o === 0) break e;
                                o--, l += r[a++] << u, u += 8;
                            }
                            if (l >>>= B, u -= B, e.have === 0) {
                                t.msg = "invalid bit length repeat", e.mode = he;
                                break;
                            }
                            T = e.lens[e.have - 1], p = 3 + (l & 3), l >>>= 2, u -= 2;
                        } else if (U === 17) {
                            for(H = B + 3; u < H;){
                                if (o === 0) break e;
                                o--, l += r[a++] << u, u += 8;
                            }
                            l >>>= B, u -= B, T = 0, p = 3 + (l & 7), l >>>= 3, u -= 3;
                        } else {
                            for(H = B + 7; u < H;){
                                if (o === 0) break e;
                                o--, l += r[a++] << u, u += 8;
                            }
                            l >>>= B, u -= B, T = 0, p = 11 + (l & 127), l >>>= 7, u -= 7;
                        }
                        if (e.have + p > e.nlen + e.ndist) {
                            t.msg = "invalid bit length repeat", e.mode = he;
                            break;
                        }
                        for(; p--;)e.lens[e.have++] = T;
                    }
                }
                if (e.mode === he) break;
                if (e.lens[256] === 0) {
                    t.msg = "invalid code -- missing end-of-block", e.mode = he;
                    break;
                }
                if (e.lenbits = 9, R = {
                    bits: e.lenbits
                }, P = mn(Yo, e.lens, 0, e.nlen, e.lencode, 0, e.work, R), e.lenbits = R.bits, P) {
                    t.msg = "invalid literal/lengths set", e.mode = he;
                    break;
                }
                if (e.distbits = 6, e.distcode = e.distdyn, R = {
                    bits: e.distbits
                }, P = mn(Go, e.lens, e.nlen, e.ndist, e.distcode, 0, e.work, R), e.distbits = R.bits, P) {
                    t.msg = "invalid distances set", e.mode = he;
                    break;
                }
                if (e.mode = Kn, n === jn) break e;
            case Kn:
                e.mode = qn;
            case qn:
                if (o >= 6 && d >= 258) {
                    t.next_out = s, t.avail_out = d, t.next_in = a, t.avail_in = o, e.hold = l, e.bits = u, $h(t, w), s = t.next_out, i = t.output, d = t.avail_out, a = t.next_in, r = t.input, o = t.avail_in, l = e.hold, u = e.bits, e.mode === Je && (e.back = -1);
                    break;
                }
                for(e.back = 0; A = e.lencode[l & (1 << e.lenbits) - 1], B = A >>> 24, D = A >>> 16 & 255, U = A & 65535, !(B <= u);){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (D && !(D & 240)) {
                    for(g = B, F = D, V = U; A = e.lencode[V + ((l & (1 << g + F) - 1) >> g)], B = A >>> 24, D = A >>> 16 & 255, U = A & 65535, !(g + B <= u);){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    l >>>= g, u -= g, e.back += g;
                }
                if (l >>>= B, u -= B, e.back += B, e.length = U, D === 0) {
                    e.mode = hs;
                    break;
                }
                if (D & 32) {
                    e.back = -1, e.mode = Je;
                    break;
                }
                if (D & 64) {
                    t.msg = "invalid literal/length code", e.mode = he;
                    break;
                }
                e.extra = D & 15, e.mode = ls;
            case ls:
                if (e.extra) {
                    for(H = e.extra; u < H;){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    e.length += l & (1 << e.extra) - 1, l >>>= e.extra, u -= e.extra, e.back += e.extra;
                }
                e.was = e.length, e.mode = cs;
            case cs:
                for(; A = e.distcode[l & (1 << e.distbits) - 1], B = A >>> 24, D = A >>> 16 & 255, U = A & 65535, !(B <= u);){
                    if (o === 0) break e;
                    o--, l += r[a++] << u, u += 8;
                }
                if (!(D & 240)) {
                    for(g = B, F = D, V = U; A = e.distcode[V + ((l & (1 << g + F) - 1) >> g)], B = A >>> 24, D = A >>> 16 & 255, U = A & 65535, !(g + B <= u);){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    l >>>= g, u -= g, e.back += g;
                }
                if (l >>>= B, u -= B, e.back += B, D & 64) {
                    t.msg = "invalid distance code", e.mode = he;
                    break;
                }
                e.offset = U, e.extra = D & 15, e.mode = fs;
            case fs:
                if (e.extra) {
                    for(H = e.extra; u < H;){
                        if (o === 0) break e;
                        o--, l += r[a++] << u, u += 8;
                    }
                    e.offset += l & (1 << e.extra) - 1, l >>>= e.extra, u -= e.extra, e.back += e.extra;
                }
                if (e.offset > e.dmax) {
                    t.msg = "invalid distance too far back", e.mode = he;
                    break;
                }
                e.mode = us;
            case us:
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
            case hs:
                if (d === 0) break e;
                i[s++] = e.length, d--, e.mode = qn;
                break;
            case Xr:
                if (e.wrap) {
                    for(; u < 32;){
                        if (o === 0) break e;
                        o--, l |= r[a++] << u, u += 8;
                    }
                    if (w -= d, t.total_out += w, e.total += w, e.wrap & 4 && w && (t.adler = e.check = e.flags ? ye(e.check, i, w, s - w) : In(e.check, i, w, s - w)), w = d, e.wrap & 4 && (e.flags ? l : ps(l)) !== e.check) {
                        t.msg = "incorrect data check", e.mode = he;
                        break;
                    }
                    l = 0, u = 0;
                }
                e.mode = ds;
            case ds:
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
                e.mode = _s;
            case _s:
                P = jh;
                break e;
            case he:
                P = jo;
                break e;
            case qo:
                return Ko;
            case Xo:
            default:
                return Ze;
        }
        return t.next_out = s, t.avail_out = d, t.next_in = a, t.avail_in = o, e.hold = l, e.bits = u, (e.wsize || w !== t.avail_out && e.mode < he && (e.mode < Xr || n !== Ya)) && nl(t, t.output, t.next_out, w - t.avail_out), m -= t.avail_in, w -= t.avail_out, t.total_in += m, t.total_out += w, e.total += w, e.wrap & 4 && w && (t.adler = e.check = e.flags ? ye(e.check, i, w, t.next_out - w) : In(e.check, i, w, t.next_out - w)), t.data_type = e.bits + (e.last ? 64 : 0) + (e.mode === Je ? 128 : 0) + (e.mode === Kn || e.mode === qr ? 256 : 0), (m === 0 && w === 0 || n === Ya) && P === At && (P = qh), P;
    }, ad = (t)=>{
        if (Tt(t)) return Ze;
        let n = t.state;
        return n.window && (n.window = null), t.state = null, At;
    }, sd = (t, n)=>{
        if (Tt(t)) return Ze;
        const e = t.state;
        return e.wrap & 2 ? (e.head = n, n.done = !1, At) : Ze;
    }, od = (t, n)=>{
        const e = n.length;
        let r, i, a;
        return Tt(t) || (r = t.state, r.wrap !== 0 && r.mode !== gr) ? Ze : r.mode === gr && (i = 1, i = In(i, n, e, 0), i !== r.check) ? jo : (a = nl(t, n, e, e), a ? (r.mode = qo, Ko) : (r.havedict = 1, At));
    };
    var ld = Jo, cd = el, fd = Qo, ud = nd, hd = tl, dd = id, _d = ad, pd = sd, wd = od, gd = "pako inflate (from Nodeca project)", tt = {
        inflateReset: ld,
        inflateReset2: cd,
        inflateResetKeep: fd,
        inflateInit: ud,
        inflateInit2: hd,
        inflate: dd,
        inflateEnd: _d,
        inflateGetHeader: pd,
        inflateSetDictionary: wd,
        inflateInfo: gd
    };
    function md() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
    }
    var bd = md;
    const rl = Object.prototype.toString, { Z_NO_FLUSH: yd, Z_FINISH: Ed, Z_OK: Tn, Z_STREAM_END: ei, Z_NEED_DICT: ti, Z_STREAM_ERROR: kd, Z_DATA_ERROR: gs, Z_MEM_ERROR: Sd } = Rn;
    function Dn(t) {
        this.options = vr.assign({
            chunkSize: 1024 * 64,
            windowBits: 15,
            to: ""
        }, t || {});
        const n = this.options;
        n.raw && n.windowBits >= 0 && n.windowBits < 16 && (n.windowBits = -n.windowBits, n.windowBits === 0 && (n.windowBits = -15)), n.windowBits >= 0 && n.windowBits < 16 && !(t && t.windowBits) && (n.windowBits += 32), n.windowBits > 15 && n.windowBits < 48 && (n.windowBits & 15 || (n.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Wo, this.strm.avail_out = 0;
        let e = tt.inflateInit2(this.strm, n.windowBits);
        if (e !== Tn) throw new Error(xt[e]);
        if (this.header = new bd, tt.inflateGetHeader(this.strm, this.header), n.dictionary && (typeof n.dictionary == "string" ? n.dictionary = Bn.string2buf(n.dictionary) : rl.call(n.dictionary) === "[object ArrayBuffer]" && (n.dictionary = new Uint8Array(n.dictionary)), n.raw && (e = tt.inflateSetDictionary(this.strm, n.dictionary), e !== Tn))) throw new Error(xt[e]);
    }
    Dn.prototype.push = function(t, n) {
        const e = this.strm, r = this.options.chunkSize, i = this.options.dictionary;
        let a, s, o;
        if (this.ended) return !1;
        for(n === ~~n ? s = n : s = n === !0 ? Ed : yd, rl.call(t) === "[object ArrayBuffer]" ? e.input = new Uint8Array(t) : e.input = t, e.next_in = 0, e.avail_in = e.input.length;;){
            for(e.avail_out === 0 && (e.output = new Uint8Array(r), e.next_out = 0, e.avail_out = r), a = tt.inflate(e, s), a === ti && i && (a = tt.inflateSetDictionary(e, i), a === Tn ? a = tt.inflate(e, s) : a === gs && (a = ti)); e.avail_in > 0 && a === ei && e.state.wrap > 0 && t[e.next_in] !== 0;)tt.inflateReset(e), a = tt.inflate(e, s);
            switch(a){
                case kd:
                case gs:
                case ti:
                case Sd:
                    return this.onEnd(a), this.ended = !0, !1;
            }
            if (o = e.avail_out, e.next_out && (e.avail_out === 0 || a === ei)) if (this.options.to === "string") {
                let d = Bn.utf8border(e.output, e.next_out), l = e.next_out - d, u = Bn.buf2string(e.output, d);
                e.next_out = l, e.avail_out = r - l, l && e.output.set(e.output.subarray(d, d + l), 0), this.onData(u);
            } else this.onData(e.output.length === e.next_out ? e.output : e.output.subarray(0, e.next_out));
            if (!(a === Tn && o === 0)) {
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
        t === Tn && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = vr.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
    };
    function Hi(t, n) {
        const e = new Dn(n);
        if (e.push(t), e.err) throw e.msg || xt[e.err];
        return e.result;
    }
    function vd(t, n) {
        return n = n || {}, n.raw = !0, Hi(t, n);
    }
    var xd = Dn, Id = Hi, Ad = vd, Bd = Hi, Td = {
        Inflate: xd,
        inflate: Id,
        inflateRaw: Ad,
        ungzip: Bd
    };
    const { Deflate: Ud, deflate: Cd, deflateRaw: Rd, gzip: Nd } = zh, { Inflate: Od, inflate: Dd, inflateRaw: Fd, ungzip: Hd } = Td;
    var zd = Ud, Zd = Cd, $d = Rd, Ld = Nd, Md = Od, Pd = Dd, Wd = Fd, Vd = Hd, Yd = Rn, Gd = {
        Deflate: zd,
        deflate: Zd,
        deflateRaw: $d,
        gzip: Ld,
        Inflate: Md,
        inflate: Pd,
        inflateRaw: Wd,
        ungzip: Vd,
        constants: Yd
    };
    async function jd(t, n) {
        let e;
        if (n) {
            const o = t ? "-threads" : "", d = n.split("/").slice(0, -1).join("/"), l = n.split("/").pop(), [u, ...m] = l.split(".");
            e = `${d}/${u}${o}.${m.join(".")}`;
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
        return a[0] === 31 && a[1] === 139 && a[2] === 8 ? Gd.ungzip(a).buffer : a;
    }
    async function il(t = 32, n, e = qe()("bb.js:fetch_mat")) {
        const r = yo(), i = r ? await Kd(e) : 1, a = Math.min(t, i, 32);
        e(`Fetching bb wasm from ${n ?? "default location"}`);
        const s = await jd(r, n);
        e(`Compiling bb wasm of ${s.byteLength} bytes`);
        const o = await WebAssembly.compile(s);
        return e("Compilation of bb wasm complete"), {
            module: o,
            threads: a
        };
    }
    async function Kd(t) {
        if (typeof navigator < "u" && navigator.hardwareConcurrency) return navigator.hardwareConcurrency;
        try {
            return (await Promise.resolve().then(me.t.bind(me, 733, 23))).cpus().length;
        } catch (n) {
            return t(`Could not detect environment to query number of threads. Falling back to one thread. Error: ${n.message ?? n}`), 1;
        }
    }
    const qd = 16, ms = 32;
    function Xd(t, n) {
        const e = t.slice(0, n * ms);
        return {
            proof: t.slice(n * ms),
            publicInputs: e
        };
    }
    function Qd(t, n) {
        return Uint8Array.from([
            ...t,
            ...n
        ]);
    }
    function Jd(t) {
        const e = [];
        for(let r = 0; r < t.length; r += 32){
            const i = t.slice(r, r + 32);
            e.push(i);
        }
        return e.map(n_);
    }
    function e_(t) {
        const n = t.map(r_);
        return t_(n);
    }
    function t_(t) {
        const n = t.reduce((i, a)=>i + a.length, 0), e = new Uint8Array(n);
        let r = 0;
        for (const i of t)e.set(i, r), r += i.length;
        return e;
    }
    function n_(t) {
        const n = [];
        return t.forEach(function(e) {
            let r = e.toString(16);
            r.length % 2 && (r = "0" + r), n.push(r);
        }), "0x" + n.join("");
    }
    function r_(t) {
        const n = BigInt(t).toString(16).padStart(64, "0"), e = n.length / 2, r = new Uint8Array(e);
        let i = 0, a = 0;
        for(; i < e;)r[i] = parseInt(n.slice(a, a + 2), 16), i += 1, a += 2;
        return r;
    }
    var Ne = Uint8Array, bn = Uint16Array, i_ = Int32Array, al = new Ne([
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
    ]), sl = new Ne([
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
    ]), a_ = new Ne([
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
    ]), ol = function(t, n) {
        for(var e = new bn(31), r = 0; r < 31; ++r)e[r] = n += 1 << t[r - 1];
        for(var i = new i_(e[30]), r = 1; r < 30; ++r)for(var a = e[r]; a < e[r + 1]; ++a)i[a] = a - e[r] << 5 | r;
        return {
            b: e,
            r: i
        };
    }, ll = ol(al, 2), cl = ll.b, s_ = ll.r;
    cl[28] = 258, s_[258] = 28;
    var o_ = ol(sl, 0), l_ = o_.b, fl = new bn(32768);
    for(var ce = 0; ce < 32768; ++ce){
        var st = (ce & 43690) >> 1 | (ce & 21845) << 1;
        st = (st & 52428) >> 2 | (st & 13107) << 2, st = (st & 61680) >> 4 | (st & 3855) << 4, fl[ce] = ((st & 65280) >> 8 | (st & 255) << 8) >> 1;
    }
    var yn = function(t, n, e) {
        for(var r = t.length, i = 0, a = new bn(n); i < r; ++i)t[i] && ++a[t[i] - 1];
        var s = new bn(n);
        for(i = 1; i < n; ++i)s[i] = s[i - 1] + a[i - 1] << 1;
        var o;
        {
            o = new bn(1 << n);
            var d = 15 - n;
            for(i = 0; i < r; ++i)if (t[i]) for(var l = i << 4 | t[i], u = n - t[i], m = s[t[i] - 1]++ << u, w = m | (1 << u) - 1; m <= w; ++m)o[fl[m] >> d] = l;
        }
        return o;
    }, Fn = new Ne(288);
    for(var ce = 0; ce < 144; ++ce)Fn[ce] = 8;
    for(var ce = 144; ce < 256; ++ce)Fn[ce] = 9;
    for(var ce = 256; ce < 280; ++ce)Fn[ce] = 7;
    for(var ce = 280; ce < 288; ++ce)Fn[ce] = 8;
    var ul = new Ne(32);
    for(var ce = 0; ce < 32; ++ce)ul[ce] = 5;
    var c_ = yn(Fn, 9), f_ = yn(ul, 5), ni = function(t) {
        for(var n = t[0], e = 1; e < t.length; ++e)t[e] > n && (n = t[e]);
        return n;
    }, $e = function(t, n, e) {
        var r = n / 8 | 0;
        return (t[r] | t[r + 1] << 8) >> (n & 7) & e;
    }, ri = function(t, n) {
        var e = n / 8 | 0;
        return (t[e] | t[e + 1] << 8 | t[e + 2] << 16) >> (n & 7);
    }, u_ = function(t) {
        return (t + 7) / 8 | 0;
    }, h_ = function(t, n, e) {
        return (e == null || e > t.length) && (e = t.length), new Ne(t.subarray(n, e));
    }, d_ = [
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
        var r = new Error(n || d_[t]);
        if (r.code = t, Error.captureStackTrace && Error.captureStackTrace(r, Re), !e) throw r;
        return r;
    }, zi = function(t, n, e, r) {
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
        }, u = n.f || 0, m = n.p || 0, w = n.b || 0, p = n.l, k = n.d, x = n.m, A = n.n, B = i * 8;
        do {
            if (!p) {
                u = $e(t, m, 1);
                var D = $e(t, m + 1, 3);
                if (m += 3, D) if (D == 1) p = c_, k = f_, x = 9, A = 5;
                else if (D == 2) {
                    var V = $e(t, m, 31) + 257, T = $e(t, m + 10, 15) + 4, P = V + $e(t, m + 5, 31) + 1;
                    m += 14;
                    for(var z = new Ne(P), R = new Ne(19), H = 0; H < T; ++H)R[a_[H]] = $e(t, m + H * 3, 7);
                    m += T * 3;
                    for(var ae = ni(R), S = (1 << ae) - 1, $ = yn(R, ae), H = 0; H < P;){
                        var O = $[$e(t, m, S)];
                        m += O & 15;
                        var U = O >> 4;
                        if (U < 16) z[H++] = U;
                        else {
                            var N = 0, L = 0;
                            for(U == 16 ? (L = 3 + $e(t, m, 3), m += 2, N = z[H - 1]) : U == 17 ? (L = 3 + $e(t, m, 7), m += 3) : U == 18 && (L = 11 + $e(t, m, 127), m += 7); L--;)z[H++] = N;
                        }
                    }
                    var Y = z.subarray(0, V), W = z.subarray(V);
                    x = ni(Y), A = ni(W), p = yn(Y, x), k = yn(W, A);
                } else Re(1);
                else {
                    var U = u_(m) + 4, g = t[U - 4] | t[U - 3] << 8, F = U + g;
                    if (F > i) {
                        d && Re(0);
                        break;
                    }
                    o && l(w + g), e.set(t.subarray(U, F), w), n.b = w += g, n.p = m = F * 8, n.f = u;
                    continue;
                }
                if (m > B) {
                    d && Re(0);
                    break;
                }
            }
            o && l(w + 131072);
            for(var G = (1 << x) - 1, q = (1 << A) - 1, j = m;; j = m){
                var N = p[ri(t, m) & G], te = N >> 4;
                if (m += N & 15, m > B) {
                    d && Re(0);
                    break;
                }
                if (N || Re(2), te < 256) e[w++] = te;
                else if (te == 256) {
                    j = m, p = null;
                    break;
                } else {
                    var xe = te - 254;
                    if (te > 264) {
                        var H = te - 257, Ie = al[H];
                        xe = $e(t, m, (1 << Ie) - 1) + cl[H], m += Ie;
                    }
                    var Ut = k[ri(t, m) & q], Ct = Ut >> 4;
                    Ut || Re(3), m += Ut & 15;
                    var W = l_[Ct];
                    if (Ct > 3) {
                        var Ie = sl[Ct];
                        W += ri(t, m) & (1 << Ie) - 1, m += Ie;
                    }
                    if (m > B) {
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
            n.l = p, n.p = j, n.b = w, n.f = u, p && (u = 1, n.m = x, n.d = k, n.n = A);
        }while (!u);
        return w != e.length && s ? h_(e, 0, w) : e.subarray(0, w);
    }, __ = new Ne(0), p_ = function(t) {
        (t[0] != 31 || t[1] != 139 || t[2] != 8) && Re(6, "invalid gzip data");
        var n = t[3], e = 10;
        n & 4 && (e += (t[10] | t[11] << 8) + 2);
        for(var r = (n >> 3 & 1) + (n >> 4 & 1); r > 0; r -= !t[e++]);
        return e + (n & 2);
    }, w_ = function(t) {
        var n = t.length;
        return (t[n - 4] | t[n - 3] << 8 | t[n - 2] << 16 | t[n - 1] << 24) >>> 0;
    }, g_ = function(t, n) {
        return ((t[0] & 15) != 8 || t[0] >> 4 > 7 || (t[0] << 8 | t[1]) % 31) && Re(6, "invalid zlib data"), (t[1] >> 5 & 1) == 1 && Re(6, "invalid zlib data: " + (t[1] & 32 ? "need" : "unexpected") + " dictionary"), (t[1] >> 3 & 4) + 2;
    };
    function m_(t, n) {
        return zi(t, {
            i: 2
        }, n, n);
    }
    function b_(t, n) {
        var e = p_(t);
        return e + 8 > t.length && Re(6, "invalid gzip data"), zi(t.subarray(e, -8), {
            i: 2
        }, new Ne(w_(t)), n);
    }
    function y_(t, n) {
        return zi(t.subarray(g_(t), -4), {
            i: 2
        }, n, n);
    }
    function hl(t, n) {
        return t[0] == 31 && t[1] == 139 && t[2] == 8 ? b_(t, n) : (t[0] & 15) != 8 || t[0] >> 4 > 7 || (t[0] << 8 | t[1]) % 31 ? m_(t, n) : y_(t, n);
    }
    typeof TextEncoder < "u" && new TextEncoder;
    var E_ = typeof TextDecoder < "u" && new TextDecoder, k_ = 0;
    try {
        E_.decode(__, {
            stream: !0
        }), k_ = 1;
    } catch  {}
    var bs = me(287).hp, vi;
    try {
        vi = new TextDecoder;
    } catch  {}
    var M, Ke, y = 0, le = {}, ee, ct, De = 0, Ye = 0, Ee, rt, Ue = [], Q, ys = {
        useRecords: !1,
        mapsAsObjects: !0
    };
    class dl {
    }
    const _l = new dl;
    _l.name = "MessagePack 0xC1";
    var dt = !1, pl = 2, S_;
    try {
        new Function("");
    } catch  {
        pl = 1 / 0;
    }
    class Un {
        constructor(n){
            n && (n.useRecords === !1 && n.mapsAsObjects === void 0 && (n.mapsAsObjects = !0), n.sequential && n.trusted !== !1 && (n.trusted = !0, !n.structures && n.useRecords != !1 && (n.structures = [], n.maxSharedStructures || (n.maxSharedStructures = 0))), n.structures ? n.structures.sharedLength = n.structures.length : n.getStructures && ((n.structures = []).uninitialized = !0, n.structures.sharedLength = 0), n.int64AsNumber && (n.int64AsType = "number")), Object.assign(this, n);
        }
        unpack(n, e) {
            if (M) return El(()=>(Ii(), this ? this.unpack(n, e) : Un.prototype.unpack.call(ys, n, e)));
            !n.buffer && n.constructor === ArrayBuffer && (n = typeof bs < "u" ? bs.from(n) : new Uint8Array(n)), typeof e == "object" ? (Ke = e.end || n.length, y = e.start || 0) : (y = 0, Ke = e > -1 ? e : n.length), Ye = 0, ct = null, Ee = null, M = n;
            try {
                Q = n.dataView || (n.dataView = new DataView(n.buffer, n.byteOffset, n.byteLength));
            } catch (r) {
                throw M = null, n instanceof Uint8Array ? r : new Error("Source must be a Uint8Array or Buffer but was a " + (n && typeof n == "object" ? n.constructor.name : typeof n));
            }
            if (this instanceof Un) {
                if (le = this, this.structures) return ee = this.structures, Xn(e);
                (!ee || ee.length > 0) && (ee = []);
            } else le = ys, (!ee || ee.length > 0) && (ee = []);
            return Xn(e);
        }
        unpackMultiple(n, e) {
            let r, i = 0;
            try {
                dt = !0;
                let a = n.length, s = this ? this.unpack(n, a) : Ir.unpack(n, a);
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
                dt = !1, Ii();
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
            if (le.randomAccessStructure && M[y] < 64 && M[y] >= 32 && S_ || (n = ge()), Ee && (y = Ee.postBundlePosition, Ee = null), dt && (ee.restoreStructures = null), y == Ke) ee && ee.restoreStructures && Es(), ee = null, M = null, rt && (rt = null);
            else {
                if (y > Ke) throw new Error("Unexpected end of MessagePack data");
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
            throw ee && ee.restoreStructures && Es(), Ii(), (n instanceof RangeError || n.message.startsWith("Unexpected end of buffer") || y > Ke) && (n.incomplete = !0), n;
        }
    }
    function Es() {
        for(let t in ee.restoreStructures)ee[t] = ee.restoreStructures[t];
        ee.restoreStructures = null;
    }
    function ge() {
        let t = M[y++];
        if (t < 160) if (t < 128) {
            if (t < 64) return t;
            {
                let n = ee[t & 63] || le.getStructures && wl()[t & 63];
                return n ? (n.read || (n.read = Zi(n, t & 63)), n.read()) : t;
            }
        } else if (t < 144) if (t -= 128, le.mapsAsObjects) {
            let n = {};
            for(let e = 0; e < t; e++){
                let r = ml();
                r === "__proto__" && (r = "__proto_"), n[r] = ge();
            }
            return n;
        } else {
            let n = new Map;
            for(let e = 0; e < t; e++)n.set(ge(), ge());
            return n;
        }
        else {
            t -= 144;
            let n = new Array(t);
            for(let e = 0; e < t; e++)n[e] = ge();
            return le.freezeData ? Object.freeze(n) : n;
        }
        else if (t < 192) {
            let n = t - 160;
            if (Ye >= y) return ct.slice(y - De, (y += n) - De);
            if (Ye == 0 && Ke < 140) {
                let e = n < 16 ? $i(n) : gl(n);
                if (e != null) return e;
            }
            return xi(n);
        } else {
            let n;
            switch(t){
                case 192:
                    return null;
                case 193:
                    return Ee ? (n = ge(), n > 0 ? Ee[1].slice(Ee.position1, Ee.position1 += n) : Ee[0].slice(Ee.position0, Ee.position0 -= n)) : _l;
                case 194:
                    return !1;
                case 195:
                    return !0;
                case 196:
                    if (n = M[y++], n === void 0) throw new Error("Unexpected end of buffer");
                    return ii(n);
                case 197:
                    return n = Q.getUint16(y), y += 2, ii(n);
                case 198:
                    return n = Q.getUint32(y), y += 4, ii(n);
                case 199:
                    return wt(M[y++]);
                case 200:
                    return n = Q.getUint16(y), y += 2, wt(n);
                case 201:
                    return n = Q.getUint32(y), y += 4, wt(n);
                case 202:
                    if (n = Q.getFloat32(y), le.useFloat32 > 2) {
                        let e = Li[(M[y] & 127) << 1 | M[y + 1] >> 7];
                        return y += 4, (e * n + (n > 0 ? .5 : -.5) >> 0) / e;
                    }
                    return y += 4, n;
                case 203:
                    return n = Q.getFloat64(y), y += 8, n;
                case 204:
                    return M[y++];
                case 205:
                    return n = Q.getUint16(y), y += 2, n;
                case 206:
                    return n = Q.getUint32(y), y += 4, n;
                case 207:
                    return le.int64AsType === "number" ? (n = Q.getUint32(y) * 4294967296, n += Q.getUint32(y + 4)) : le.int64AsType === "string" ? n = Q.getBigUint64(y).toString() : le.int64AsType === "auto" ? (n = Q.getBigUint64(y), n <= BigInt(2) << BigInt(52) && (n = Number(n))) : n = Q.getBigUint64(y), y += 8, n;
                case 208:
                    return Q.getInt8(y++);
                case 209:
                    return n = Q.getInt16(y), y += 2, n;
                case 210:
                    return n = Q.getInt32(y), y += 4, n;
                case 211:
                    return le.int64AsType === "number" ? (n = Q.getInt32(y) * 4294967296, n += Q.getUint32(y + 4)) : le.int64AsType === "string" ? n = Q.getBigInt64(y).toString() : le.int64AsType === "auto" ? (n = Q.getBigInt64(y), n >= BigInt(-2) << BigInt(52) && n <= BigInt(2) << BigInt(52) && (n = Number(n))) : n = Q.getBigInt64(y), y += 8, n;
                case 212:
                    if (n = M[y++], n == 114) return As(M[y++] & 63);
                    {
                        let e = Ue[n];
                        if (e) return e.read ? (y++, e.read(ge())) : e.noBuffer ? (y++, e()) : e(M.subarray(y, ++y));
                        throw new Error("Unknown extension " + n);
                    }
                case 213:
                    return n = M[y], n == 114 ? (y++, As(M[y++] & 63, M[y++])) : wt(2);
                case 214:
                    return wt(4);
                case 215:
                    return wt(8);
                case 216:
                    return wt(16);
                case 217:
                    return n = M[y++], Ye >= y ? ct.slice(y - De, (y += n) - De) : x_(n);
                case 218:
                    return n = Q.getUint16(y), y += 2, Ye >= y ? ct.slice(y - De, (y += n) - De) : I_(n);
                case 219:
                    return n = Q.getUint32(y), y += 4, Ye >= y ? ct.slice(y - De, (y += n) - De) : A_(n);
                case 220:
                    return n = Q.getUint16(y), y += 2, Ss(n);
                case 221:
                    return n = Q.getUint32(y), y += 4, Ss(n);
                case 222:
                    return n = Q.getUint16(y), y += 2, vs(n);
                case 223:
                    return n = Q.getUint32(y), y += 4, vs(n);
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
    const v_ = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
    function Zi(t, n) {
        function e() {
            if (e.count++ > pl) {
                let i = t.read = new Function("r", "return function(){return " + (le.freezeData ? "Object.freeze" : "") + "({" + t.map((a)=>a === "__proto__" ? "__proto_:r()" : v_.test(a) ? a + ":r()" : "[" + JSON.stringify(a) + "]:r()").join(",") + "})}")(ge);
                return t.highByte === 0 && (t.read = ks(n, t.read)), i();
            }
            let r = {};
            for(let i = 0, a = t.length; i < a; i++){
                let s = t[i];
                s === "__proto__" && (s = "__proto_"), r[s] = ge();
            }
            return le.freezeData ? Object.freeze(r) : r;
        }
        return e.count = 0, t.highByte === 0 ? ks(n, e) : e;
    }
    const ks = (t, n)=>function() {
            let e = M[y++];
            if (e === 0) return n();
            let r = t < 32 ? -(t + (e << 5)) : t + (e << 5), i = ee[r] || wl()[r];
            if (!i) throw new Error("Record id is not defined for " + r);
            return i.read || (i.read = Zi(i, t)), i.read();
        };
    function wl() {
        let t = El(()=>(M = null, le.getStructures()));
        return ee = le._mergeStructures(t, ee);
    }
    var xi = Hn, x_ = Hn, I_ = Hn, A_ = Hn;
    function Hn(t) {
        let n;
        if (t < 16 && (n = $i(t))) return n;
        if (t > 64 && vi) return vi.decode(M.subarray(y, y += t));
        const e = y + t, r = [];
        for(n = ""; y < e;){
            const i = M[y++];
            if (!(i & 128)) r.push(i);
            else if ((i & 224) === 192) {
                const a = M[y++] & 63;
                r.push((i & 31) << 6 | a);
            } else if ((i & 240) === 224) {
                const a = M[y++] & 63, s = M[y++] & 63;
                r.push((i & 31) << 12 | a << 6 | s);
            } else if ((i & 248) === 240) {
                const a = M[y++] & 63, s = M[y++] & 63, o = M[y++] & 63;
                let d = (i & 7) << 18 | a << 12 | s << 6 | o;
                d > 65535 && (d -= 65536, r.push(d >>> 10 & 1023 | 55296), d = 56320 | d & 1023), r.push(d);
            } else r.push(i);
            r.length >= 4096 && (n += be.apply(String, r), r.length = 0);
        }
        return r.length > 0 && (n += be.apply(String, r)), n;
    }
    function Ss(t) {
        let n = new Array(t);
        for(let e = 0; e < t; e++)n[e] = ge();
        return le.freezeData ? Object.freeze(n) : n;
    }
    function vs(t) {
        if (le.mapsAsObjects) {
            let n = {};
            for(let e = 0; e < t; e++){
                let r = ml();
                r === "__proto__" && (r = "__proto_"), n[r] = ge();
            }
            return n;
        } else {
            let n = new Map;
            for(let e = 0; e < t; e++)n.set(ge(), ge());
            return n;
        }
    }
    var be = String.fromCharCode;
    function gl(t) {
        let n = y, e = new Array(t);
        for(let r = 0; r < t; r++){
            const i = M[y++];
            if ((i & 128) > 0) {
                y = n;
                return;
            }
            e[r] = i;
        }
        return be.apply(String, e);
    }
    function $i(t) {
        if (t < 4) if (t < 2) {
            if (t === 0) return "";
            {
                let n = M[y++];
                if ((n & 128) > 1) {
                    y -= 1;
                    return;
                }
                return be(n);
            }
        } else {
            let n = M[y++], e = M[y++];
            if ((n & 128) > 0 || (e & 128) > 0) {
                y -= 2;
                return;
            }
            if (t < 3) return be(n, e);
            let r = M[y++];
            if ((r & 128) > 0) {
                y -= 3;
                return;
            }
            return be(n, e, r);
        }
        else {
            let n = M[y++], e = M[y++], r = M[y++], i = M[y++];
            if ((n & 128) > 0 || (e & 128) > 0 || (r & 128) > 0 || (i & 128) > 0) {
                y -= 4;
                return;
            }
            if (t < 6) {
                if (t === 4) return be(n, e, r, i);
                {
                    let a = M[y++];
                    if ((a & 128) > 0) {
                        y -= 5;
                        return;
                    }
                    return be(n, e, r, i, a);
                }
            } else if (t < 8) {
                let a = M[y++], s = M[y++];
                if ((a & 128) > 0 || (s & 128) > 0) {
                    y -= 6;
                    return;
                }
                if (t < 7) return be(n, e, r, i, a, s);
                let o = M[y++];
                if ((o & 128) > 0) {
                    y -= 7;
                    return;
                }
                return be(n, e, r, i, a, s, o);
            } else {
                let a = M[y++], s = M[y++], o = M[y++], d = M[y++];
                if ((a & 128) > 0 || (s & 128) > 0 || (o & 128) > 0 || (d & 128) > 0) {
                    y -= 8;
                    return;
                }
                if (t < 10) {
                    if (t === 8) return be(n, e, r, i, a, s, o, d);
                    {
                        let l = M[y++];
                        if ((l & 128) > 0) {
                            y -= 9;
                            return;
                        }
                        return be(n, e, r, i, a, s, o, d, l);
                    }
                } else if (t < 12) {
                    let l = M[y++], u = M[y++];
                    if ((l & 128) > 0 || (u & 128) > 0) {
                        y -= 10;
                        return;
                    }
                    if (t < 11) return be(n, e, r, i, a, s, o, d, l, u);
                    let m = M[y++];
                    if ((m & 128) > 0) {
                        y -= 11;
                        return;
                    }
                    return be(n, e, r, i, a, s, o, d, l, u, m);
                } else {
                    let l = M[y++], u = M[y++], m = M[y++], w = M[y++];
                    if ((l & 128) > 0 || (u & 128) > 0 || (m & 128) > 0 || (w & 128) > 0) {
                        y -= 12;
                        return;
                    }
                    if (t < 14) {
                        if (t === 12) return be(n, e, r, i, a, s, o, d, l, u, m, w);
                        {
                            let p = M[y++];
                            if ((p & 128) > 0) {
                                y -= 13;
                                return;
                            }
                            return be(n, e, r, i, a, s, o, d, l, u, m, w, p);
                        }
                    } else {
                        let p = M[y++], k = M[y++];
                        if ((p & 128) > 0 || (k & 128) > 0) {
                            y -= 14;
                            return;
                        }
                        if (t < 15) return be(n, e, r, i, a, s, o, d, l, u, m, w, p, k);
                        let x = M[y++];
                        if ((x & 128) > 0) {
                            y -= 15;
                            return;
                        }
                        return be(n, e, r, i, a, s, o, d, l, u, m, w, p, k, x);
                    }
                }
            }
        }
    }
    function xs() {
        let t = M[y++], n;
        if (t < 192) n = t - 160;
        else switch(t){
            case 217:
                n = M[y++];
                break;
            case 218:
                n = Q.getUint16(y), y += 2;
                break;
            case 219:
                n = Q.getUint32(y), y += 4;
                break;
            default:
                throw new Error("Expected string");
        }
        return Hn(n);
    }
    function ii(t) {
        return le.copyBuffers ? Uint8Array.prototype.slice.call(M, y, y += t) : M.subarray(y, y += t);
    }
    function wt(t) {
        let n = M[y++];
        if (Ue[n]) {
            let e;
            return Ue[n](M.subarray(y, e = y += t), (r)=>{
                y = r;
                try {
                    return ge();
                } finally{
                    y = e;
                }
            });
        } else throw new Error("Unknown extension type " + n);
    }
    var Is = new Array(4096);
    function ml() {
        let t = M[y++];
        if (t >= 160 && t < 192) {
            if (t = t - 160, Ye >= y) return ct.slice(y - De, (y += t) - De);
            if (!(Ye == 0 && Ke < 180)) return xi(t);
        } else return y--, bl(ge());
        let n = (t << 5 ^ (t > 1 ? Q.getUint16(y) : t > 0 ? M[y] : 0)) & 4095, e = Is[n], r = y, i = y + t - 3, a, s = 0;
        if (e && e.bytes == t) {
            for(; r < i;){
                if (a = Q.getUint32(r), a != e[s++]) {
                    r = 1879048192;
                    break;
                }
                r += 4;
            }
            for(i += 3; r < i;)if (a = M[r++], a != e[s++]) {
                r = 1879048192;
                break;
            }
            if (r === i) return y = r, e.string;
            i -= 3, r = y;
        }
        for(e = [], Is[n] = e, e.bytes = t; r < i;)a = Q.getUint32(r), e.push(a), r += 4;
        for(i += 3; r < i;)a = M[r++], e.push(a);
        let o = t < 16 ? $i(t) : gl(t);
        return o != null ? e.string = o : e.string = xi(t);
    }
    function bl(t) {
        if (typeof t == "string") return t;
        if (typeof t == "number" || typeof t == "boolean" || typeof t == "bigint") return t.toString();
        if (t == null) return t + "";
        throw new Error("Invalid property type for record", typeof t);
    }
    const As = (t, n)=>{
        let e = ge().map(bl), r = t;
        n !== void 0 && (t = t < 32 ? -((n << 5) + t) : (n << 5) + t, e.highByte = n);
        let i = ee[t];
        return i && (i.isShared || dt) && ((ee.restoreStructures || (ee.restoreStructures = []))[t] = i), ee[t] = e, e.read = Zi(e, r), e.read();
    };
    Ue[0] = ()=>{};
    Ue[0].noBuffer = !0;
    Ue[66] = (t)=>{
        let n = t.length, e = BigInt(t[0] & 128 ? t[0] - 256 : t[0]);
        for(let r = 1; r < n; r++)e <<= BigInt(8), e += BigInt(t[r]);
        return e;
    };
    let B_ = {
        Error,
        TypeError,
        ReferenceError
    };
    Ue[101] = ()=>{
        let t = ge();
        return (B_[t[0]] || Error)(t[1], {
            cause: t[2]
        });
    };
    Ue[105] = (t)=>{
        if (le.structuredClone === !1) throw new Error("Structured clone extension is disabled");
        let n = Q.getUint32(y - 4);
        rt || (rt = new Map);
        let e = M[y], r;
        e >= 144 && e < 160 || e == 220 || e == 221 ? r = [] : r = {};
        let i = {
            target: r
        };
        rt.set(n, i);
        let a = ge();
        return i.used ? Object.assign(r, a) : (i.target = a, a);
    };
    Ue[112] = (t)=>{
        if (le.structuredClone === !1) throw new Error("Structured clone extension is disabled");
        let n = Q.getUint32(y - 4), e = rt.get(n);
        return e.used = !0, e.target;
    };
    Ue[115] = ()=>new Set(ge());
    const yl = [
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
    let T_ = typeof globalThis == "object" ? globalThis : window;
    Ue[116] = (t)=>{
        let n = t[0], e = yl[n];
        if (!e) {
            if (n === 16) {
                let r = new ArrayBuffer(t.length - 1);
                return new Uint8Array(r).set(t.subarray(1)), r;
            }
            throw new Error("Could not find typed array for code " + n);
        }
        return new T_[e](Uint8Array.prototype.slice.call(t, 1).buffer);
    };
    Ue[120] = ()=>{
        let t = ge();
        return new RegExp(t[0], t[1]);
    };
    const U_ = [];
    Ue[98] = (t)=>{
        let n = (t[0] << 24) + (t[1] << 16) + (t[2] << 8) + t[3], e = y;
        return y += n - t.length, Ee = U_, Ee = [
            xs(),
            xs()
        ], Ee.position0 = 0, Ee.position1 = 0, Ee.postBundlePosition = y, y = e, ge();
    };
    Ue[255] = (t)=>t.length == 4 ? new Date((t[0] * 16777216 + (t[1] << 16) + (t[2] << 8) + t[3]) * 1e3) : t.length == 8 ? new Date(((t[0] << 22) + (t[1] << 14) + (t[2] << 6) + (t[3] >> 2)) / 1e6 + ((t[3] & 3) * 4294967296 + t[4] * 16777216 + (t[5] << 16) + (t[6] << 8) + t[7]) * 1e3) : t.length == 12 ? new Date(((t[0] << 24) + (t[1] << 16) + (t[2] << 8) + t[3]) / 1e6 + ((t[4] & 128 ? -281474976710656 : 0) + t[6] * 1099511627776 + t[7] * 4294967296 + t[8] * 16777216 + (t[9] << 16) + (t[10] << 8) + t[11]) * 1e3) : new Date("invalid");
    function El(t) {
        let n = Ke, e = y, r = De, i = Ye, a = ct, s = rt, o = Ee, d = new Uint8Array(M.slice(0, Ke)), l = ee, u = ee.slice(0, ee.length), m = le, w = dt, p = t();
        return Ke = n, y = e, De = r, Ye = i, ct = a, rt = s, Ee = o, M = d, dt = w, ee = l, ee.splice(0, ee.length, ...u), le = m, Q = new DataView(M.buffer, M.byteOffset, M.byteLength), p;
    }
    function Ii() {
        M = null, rt = null, ee = null;
    }
    const Li = new Array(147);
    for(let t = 0; t < 256; t++)Li[t] = +("1e" + Math.floor(45.15 - t * .30103));
    var Ir = new Un({
        useRecords: !1
    });
    Ir.unpack;
    Ir.unpackMultiple;
    Ir.unpack;
    let C_ = new Float32Array(1);
    new Uint8Array(C_.buffer, 0, 4);
    var Ar = me(287).hp;
    let or;
    try {
        or = new TextEncoder;
    } catch  {}
    let Ai, kl;
    const Br = typeof Ar < "u", Qn = Br ? function(t) {
        return Ar.allocUnsafeSlow(t);
    } : Uint8Array, Sl = Br ? Ar : Uint8Array, Bs = Br ? 4294967296 : 2144337920;
    let v, ln, oe, E = 0, Se, de = null, R_;
    const N_ = 21760, O_ = /[\u0080-\uFFFF]/, Zt = Symbol("record-id");
    class D_ extends Un {
        constructor(n){
            super(n), this.offset = 0;
            let e, r, i, a, s = Sl.prototype.utf8Write ? function(S, $) {
                return v.utf8Write(S, $, v.byteLength - $);
            } : or && or.encodeInto ? function(S, $) {
                return or.encodeInto(S, v.subarray($)).written;
            } : !1, o = this;
            n || (n = {});
            let d = n && n.sequential, l = n.structures || n.saveStructures, u = n.maxSharedStructures;
            if (u == null && (u = l ? 32 : 0), u > 8160) throw new Error("Maximum maxSharedStructure is 8160");
            n.structuredClone && n.moreTypes == null && (this.moreTypes = !0);
            let m = n.maxOwnStructures;
            m == null && (m = l ? 32 : 64), !this.structures && n.useRecords != !1 && (this.structures = []);
            let w = u > 32 || m + u > 64, p = u + 64, k = u + m + 64;
            if (k > 8256) throw new Error("Maximum maxSharedStructure + maxOwnStructure is 8192");
            let x = [], A = 0, B = 0;
            this.pack = this.encode = function(S, $) {
                if (v || (v = new Qn(8192), oe = v.dataView || (v.dataView = new DataView(v.buffer, 0, 8192)), E = 0), Se = v.length - 10, Se - E < 2048 ? (v = new Qn(v.length), oe = v.dataView || (v.dataView = new DataView(v.buffer, 0, v.length)), Se = v.length - 10, E = 0) : E = E + 7 & 2147483640, e = E, $ & L_ && (E += $ & 255), a = o.structuredClone ? new Map : null, o.bundleStrings && typeof S != "string" ? (de = [], de.size = 1 / 0) : de = null, i = o.structures, i) {
                    i.uninitialized && (i = o._mergeStructures(o.getStructures()));
                    let N = i.sharedLength || 0;
                    if (N > u) throw new Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to " + i.sharedLength);
                    if (!i.transitions) {
                        i.transitions = Object.create(null);
                        for(let L = 0; L < N; L++){
                            let Y = i[L];
                            if (!Y) continue;
                            let W, G = i.transitions;
                            for(let q = 0, j = Y.length; q < j; q++){
                                let te = Y[q];
                                W = G[te], W || (W = G[te] = Object.create(null)), G = W;
                            }
                            G[Zt] = L + 64;
                        }
                        this.lastNamedStructuresLength = N;
                    }
                    d || (i.nextId = N + 64);
                }
                r && (r = !1);
                let O;
                try {
                    o.randomAccessStructure && S && S.constructor && S.constructor === Object ? ae(S) : g(S);
                    let N = de;
                    if (de && Cs(e, g, 0), a && a.idsToInsert) {
                        let L = a.idsToInsert.sort((q, j)=>q.offset > j.offset ? 1 : -1), Y = L.length, W = -1;
                        for(; N && Y > 0;){
                            let q = L[--Y].offset + e;
                            q < N.stringsPosition + e && W === -1 && (W = 0), q > N.position + e ? W >= 0 && (W += 6) : (W >= 0 && (oe.setUint32(N.position + e, oe.getUint32(N.position + e) + W), W = -1), N = N.previous, Y++);
                        }
                        W >= 0 && N && oe.setUint32(N.position + e, oe.getUint32(N.position + e) + W), E += L.length * 6, E > Se && z(E), o.offset = E;
                        let G = H_(v.subarray(e, E), L);
                        return a = null, G;
                    }
                    return o.offset = E, $ & Z_ ? (v.start = e, v.end = E, v) : v.subarray(e, E);
                } catch (N) {
                    throw O = N, N;
                } finally{
                    if (i && (D(), r && o.saveStructures)) {
                        let N = i.sharedLength || 0, L = v.subarray(e, E), Y = z_(i, o);
                        if (!O) return o.saveStructures(Y, Y.isCompatible) === !1 ? o.pack(S, $) : (o.lastNamedStructuresLength = N, v.length > 1073741824 && (v = null), L);
                    }
                    v.length > 1073741824 && (v = null), $ & $_ && (E = e);
                }
            };
            const D = ()=>{
                B < 10 && B++;
                let S = i.sharedLength || 0;
                if (i.length > S && !d && (i.length = S), A > 1e4) i.transitions = null, B = 0, A = 0, x.length > 0 && (x = []);
                else if (x.length > 0 && !d) {
                    for(let $ = 0, O = x.length; $ < O; $++)x[$][Zt] = 0;
                    x = [];
                }
            }, U = (S)=>{
                var $ = S.length;
                $ < 16 ? v[E++] = 144 | $ : $ < 65536 ? (v[E++] = 220, v[E++] = $ >> 8, v[E++] = $ & 255) : (v[E++] = 221, oe.setUint32(E, $), E += 4);
                for(let O = 0; O < $; O++)g(S[O]);
            }, g = (S)=>{
                E > Se && (v = z(E));
                var $ = typeof S, O;
                if ($ === "string") {
                    let N = S.length;
                    if (de && N >= 4 && N < 4096) {
                        if ((de.size += N) > N_) {
                            let G, q = (de[0] ? de[0].length * 3 + de[1].length : 0) + 10;
                            E + q > Se && (v = z(E + q));
                            let j;
                            de.position ? (j = de, v[E] = 200, E += 3, v[E++] = 98, G = E - e, E += 4, Cs(e, g, 0), oe.setUint16(G + e - 3, E - e - G)) : (v[E++] = 214, v[E++] = 98, G = E - e, E += 4), de = [
                                "",
                                ""
                            ], de.previous = j, de.size = 0, de.position = G;
                        }
                        let W = O_.test(S);
                        de[W ? 0 : 1] += S, v[E++] = 193, g(W ? -N : N);
                        return;
                    }
                    let L;
                    N < 32 ? L = 1 : N < 256 ? L = 2 : N < 65536 ? L = 3 : L = 5;
                    let Y = N * 3;
                    if (E + Y > Se && (v = z(E + Y)), N < 64 || !s) {
                        let W, G, q, j = E + L;
                        for(W = 0; W < N; W++)G = S.charCodeAt(W), G < 128 ? v[j++] = G : G < 2048 ? (v[j++] = G >> 6 | 192, v[j++] = G & 63 | 128) : (G & 64512) === 55296 && ((q = S.charCodeAt(W + 1)) & 64512) === 56320 ? (G = 65536 + ((G & 1023) << 10) + (q & 1023), W++, v[j++] = G >> 18 | 240, v[j++] = G >> 12 & 63 | 128, v[j++] = G >> 6 & 63 | 128, v[j++] = G & 63 | 128) : (v[j++] = G >> 12 | 224, v[j++] = G >> 6 & 63 | 128, v[j++] = G & 63 | 128);
                        O = j - E - L;
                    } else O = s(S, E + L);
                    O < 32 ? v[E++] = 160 | O : O < 256 ? (L < 2 && v.copyWithin(E + 2, E + 1, E + 1 + O), v[E++] = 217, v[E++] = O) : O < 65536 ? (L < 3 && v.copyWithin(E + 3, E + 2, E + 2 + O), v[E++] = 218, v[E++] = O >> 8, v[E++] = O & 255) : (L < 5 && v.copyWithin(E + 5, E + 3, E + 3 + O), v[E++] = 219, oe.setUint32(E, O), E += 4), E += O;
                } else if ($ === "number") if (S >>> 0 === S) S < 32 || S < 128 && this.useRecords === !1 || S < 64 && !this.randomAccessStructure ? v[E++] = S : S < 256 ? (v[E++] = 204, v[E++] = S) : S < 65536 ? (v[E++] = 205, v[E++] = S >> 8, v[E++] = S & 255) : (v[E++] = 206, oe.setUint32(E, S), E += 4);
                else if (S >> 0 === S) S >= -32 ? v[E++] = 256 + S : S >= -128 ? (v[E++] = 208, v[E++] = S + 256) : S >= -32768 ? (v[E++] = 209, oe.setInt16(E, S), E += 2) : (v[E++] = 210, oe.setInt32(E, S), E += 4);
                else {
                    let N;
                    if ((N = this.useFloat32) > 0 && S < 4294967296 && S >= -2147483648) {
                        v[E++] = 202, oe.setFloat32(E, S);
                        let L;
                        if (N < 4 || (L = S * Li[(v[E] & 127) << 1 | v[E + 1] >> 7]) >> 0 === L) {
                            E += 4;
                            return;
                        } else E--;
                    }
                    v[E++] = 203, oe.setFloat64(E, S), E += 8;
                }
                else if ($ === "object" || $ === "function") if (!S) v[E++] = 192;
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
                    if (N === Object) P(S);
                    else if (N === Array) U(S);
                    else if (N === Map) if (this.mapAsEmptyObject) v[E++] = 128;
                    else {
                        O = S.size, O < 16 ? v[E++] = 128 | O : O < 65536 ? (v[E++] = 222, v[E++] = O >> 8, v[E++] = O & 255) : (v[E++] = 223, oe.setUint32(E, O), E += 4);
                        for (let [L, Y] of S)g(L), g(Y);
                    }
                    else {
                        for(let L = 0, Y = Ai.length; L < Y; L++){
                            let W = kl[L];
                            if (S instanceof W) {
                                let G = Ai[L];
                                if (G.write) {
                                    G.type && (v[E++] = 212, v[E++] = G.type, v[E++] = 0);
                                    let Ie = G.write.call(this, S);
                                    Ie === S ? Array.isArray(S) ? U(S) : P(S) : g(Ie);
                                    return;
                                }
                                let q = v, j = oe, te = E;
                                v = null;
                                let xe;
                                try {
                                    xe = G.pack.call(this, S, (Ie)=>(v = q, q = null, E += Ie, E > Se && z(E), {
                                            target: v,
                                            targetView: oe,
                                            position: E - Ie
                                        }), g);
                                } finally{
                                    q && (v = q, oe = j, E = te, Se = v.length - 10);
                                }
                                xe && (xe.length + E > Se && z(xe.length + E), E = F_(xe, v, E, G.type));
                                return;
                            }
                        }
                        if (Array.isArray(S)) U(S);
                        else {
                            if (S.toJSON) {
                                const L = S.toJSON();
                                if (L !== S) return g(L);
                            }
                            if ($ === "function") return g(this.writeFunction && this.writeFunction(S));
                            P(S);
                        }
                    }
                }
                else if ($ === "boolean") v[E++] = S ? 195 : 194;
                else if ($ === "bigint") {
                    if (S < BigInt(1) << BigInt(63) && S >= -(BigInt(1) << BigInt(63))) v[E++] = 211, oe.setBigInt64(E, S);
                    else if (S < BigInt(1) << BigInt(64) && S > 0) v[E++] = 207, oe.setBigUint64(E, S);
                    else if (this.largeBigIntToFloat) v[E++] = 203, oe.setFloat64(E, Number(S));
                    else {
                        if (this.largeBigIntToString) return g(S.toString());
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
                } else if ($ === "undefined") this.encodeUndefinedAsNil ? v[E++] = 192 : (v[E++] = 212, v[E++] = 0, v[E++] = 0);
                else throw new Error("Unknown type: " + $);
            }, F = this.variableMapSize || this.coercibleKeyAsNumber || this.skipValues ? (S)=>{
                let $;
                if (this.skipValues) {
                    $ = [];
                    for(let L in S)(typeof S.hasOwnProperty != "function" || S.hasOwnProperty(L)) && !this.skipValues.includes(S[L]) && $.push(L);
                } else $ = Object.keys(S);
                let O = $.length;
                O < 16 ? v[E++] = 128 | O : O < 65536 ? (v[E++] = 222, v[E++] = O >> 8, v[E++] = O & 255) : (v[E++] = 223, oe.setUint32(E, O), E += 4);
                let N;
                if (this.coercibleKeyAsNumber) for(let L = 0; L < O; L++){
                    N = $[L];
                    let Y = Number(N);
                    g(isNaN(Y) ? N : Y), g(S[N]);
                }
                else for(let L = 0; L < O; L++)g(N = $[L]), g(S[N]);
            } : (S)=>{
                v[E++] = 222;
                let $ = E - e;
                E += 2;
                let O = 0;
                for(let N in S)(typeof S.hasOwnProperty != "function" || S.hasOwnProperty(N)) && (g(N), g(S[N]), O++);
                if (O > 65535) throw new Error('Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object');
                v[$++ + e] = O >> 8, v[$ + e] = O & 255;
            }, V = this.useRecords === !1 ? F : n.progressiveRecords && !w ? (S)=>{
                let $, O = i.transitions || (i.transitions = Object.create(null)), N = E++ - e, L;
                for(let Y in S)if (typeof S.hasOwnProperty != "function" || S.hasOwnProperty(Y)) {
                    if ($ = O[Y], $) O = $;
                    else {
                        let W = Object.keys(S), G = O;
                        O = i.transitions;
                        let q = 0;
                        for(let j = 0, te = W.length; j < te; j++){
                            let xe = W[j];
                            $ = O[xe], $ || ($ = O[xe] = Object.create(null), q++), O = $;
                        }
                        N + e + 1 == E ? (E--, R(O, W, q)) : H(O, W, N, q), L = !0, O = G[Y];
                    }
                    g(S[Y]);
                }
                if (!L) {
                    let Y = O[Zt];
                    Y ? v[N + e] = Y : H(O, Object.keys(S), N, 0);
                }
            } : (S)=>{
                let $, O = i.transitions || (i.transitions = Object.create(null)), N = 0;
                for(let Y in S)(typeof S.hasOwnProperty != "function" || S.hasOwnProperty(Y)) && ($ = O[Y], $ || ($ = O[Y] = Object.create(null), N++), O = $);
                let L = O[Zt];
                L ? L >= 96 && w ? (v[E++] = ((L -= 96) & 31) + 96, v[E++] = L >> 5) : v[E++] = L : R(O, O.__keys__ || Object.keys(S), N);
                for(let Y in S)(typeof S.hasOwnProperty != "function" || S.hasOwnProperty(Y)) && g(S[Y]);
            }, T = typeof this.useRecords == "function" && this.useRecords, P = T ? (S)=>{
                T(S) ? V(S) : F(S);
            } : V, z = (S)=>{
                let $;
                if (S > 16777216) {
                    if (S - e > Bs) throw new Error("Packed buffer would be larger than maximum buffer size");
                    $ = Math.min(Bs, Math.round(Math.max((S - e) * (S > 67108864 ? 1.25 : 2), 4194304) / 4096) * 4096);
                } else $ = (Math.max(S - e << 2, v.length - 1) >> 12) + 1 << 12;
                let O = new Qn($);
                return oe = O.dataView || (O.dataView = new DataView(O.buffer, 0, $)), S = Math.min(S, v.length), v.copy ? v.copy(O, 0, e, S) : O.set(v.slice(e, S)), E -= e, e = 0, Se = O.length - 10, v = O;
            }, R = (S, $, O)=>{
                let N = i.nextId;
                N || (N = 64), N < p && this.shouldShareStructure && !this.shouldShareStructure($) ? (N = i.nextOwnId, N < k || (N = p), i.nextOwnId = N + 1) : (N >= k && (N = p), i.nextId = N + 1);
                let L = $.highByte = N >= 96 && w ? N - 96 >> 5 : -1;
                S[Zt] = N, S.__keys__ = $, i[N - 64] = $, N < p ? ($.isShared = !0, i.sharedLength = N - 63, r = !0, L >= 0 ? (v[E++] = (N & 31) + 96, v[E++] = L) : v[E++] = N) : (L >= 0 ? (v[E++] = 213, v[E++] = 114, v[E++] = (N & 31) + 96, v[E++] = L) : (v[E++] = 212, v[E++] = 114, v[E++] = N), O && (A += B * O), x.length >= m && (x.shift()[Zt] = 0), x.push(S), g($));
            }, H = (S, $, O, N)=>{
                let L = v, Y = E, W = Se, G = e;
                v = ln, E = 0, e = 0, v || (ln = v = new Qn(8192)), Se = v.length - 10, R(S, $, N), ln = v;
                let q = E;
                if (v = L, E = Y, Se = W, e = G, q > 1) {
                    let j = E + q - 1;
                    j > Se && z(j);
                    let te = O + e;
                    v.copyWithin(te + q, te + 1, E), v.set(ln.slice(0, q), te), E = j;
                } else v[O + e] = ln[0];
            }, ae = (S)=>{
                let $ = R_(S, v, e, E, i, z, (O, N, L)=>{
                    if (L) return r = !0;
                    E = N;
                    let Y = v;
                    return g(O), D(), Y !== v ? {
                        position: E,
                        targetView: oe,
                        target: v
                    } : E;
                }, this);
                if ($ === 0) return P(S);
                E = $;
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
    kl = [
        Date,
        Set,
        Error,
        RegExp,
        ArrayBuffer,
        Object.getPrototypeOf(Uint8Array.prototype).constructor,
        dl
    ];
    Ai = [
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
                this.moreTypes ? Ts(t, 16, n) : Us(Br ? Ar.from(t) : new Uint8Array(t), n);
            }
        },
        {
            pack (t, n) {
                let e = t.constructor;
                e !== Sl && this.moreTypes ? Ts(t, yl.indexOf(e.name), n) : Us(t, n);
            }
        },
        {
            pack (t, n) {
                let { target: e, position: r } = n(1);
                e[r] = 193;
            }
        }
    ];
    function Ts(t, n, e, r) {
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
    function H_(t, n) {
        let e, r = n.length * 6, i = t.length - r;
        for(; e = n.pop();){
            let a = e.offset, s = e.id;
            t.copyWithin(a + r, a, i), r -= 6;
            let o = a + r;
            t[o++] = 214, t[o++] = 105, t[o++] = s >> 24, t[o++] = s >> 16 & 255, t[o++] = s >> 8 & 255, t[o++] = s & 255, i = a;
        }
        return t;
    }
    function Cs(t, n, e) {
        if (de.length > 0) {
            oe.setUint32(de.position + t, E + e - de.position - t), de.stringsPosition = E - t;
            let r = de;
            de = null, n(r[0]), n(r[1]);
        }
    }
    function z_(t, n) {
        return t.isCompatible = (e)=>{
            let r = !e || (n.lastNamedStructuresLength || 0) === e.length;
            return r || n._mergeStructures(e), r;
        }, t;
    }
    let vl = new D_({
        useRecords: !1
    });
    vl.pack;
    vl.pack;
    const Z_ = 512, $_ = 1024, L_ = 2048;
    var Rs = me(287).hp;
    class M_ {
        constructor(n, e = {
            threads: 1
        }, r = {
            recursive: !1
        }){
            this.backendOptions = e, this.circuitOptions = r, this.acirUncompressedBytecode = P_(n);
        }
        async instantiate() {
            if (!this.api) {
                const n = await Mi.new(this.backendOptions);
                await n.acirInitSRS(this.acirUncompressedBytecode, this.circuitOptions.recursive, !0), this.api = n;
            }
        }
        async generateProof(n, e) {
            await this.instantiate();
            const i = await (e?.keccak ? this.api.acirProveUltraKeccakHonk.bind(this.api) : e?.keccakZK ? this.api.acirProveUltraKeccakZKHonk.bind(this.api) : e?.starknet ? this.api.acirProveUltraStarknetHonk.bind(this.api) : this.api.acirProveUltraHonk.bind(this.api))(this.acirUncompressedBytecode, hl(n)), s = await (e?.keccak ? this.api.acirWriteVkUltraKeccakHonk.bind(this.api) : e?.keccakZK ? this.api.acirWriteVkUltraKeccakZKHonk.bind(this.api) : e?.starknet ? this.api.acirWriteVkUltraStarknetHonk.bind(this.api) : this.api.acirWriteVkUltraHonk.bind(this.api))(this.acirUncompressedBytecode), o = await this.api.acirVkAsFieldsUltraHonk(new nt(s)), l = Number(o[1].toString()) - qd, { proof: u, publicInputs: m } = Xd(i, l), w = Jd(m);
            return {
                proof: u,
                publicInputs: w
            };
        }
        async verifyProof(n, e) {
            await this.instantiate();
            const r = Qd(e_(n.publicInputs), n.proof), i = e?.keccak ? this.api.acirWriteVkUltraKeccakHonk.bind(this.api) : e?.keccakZK ? this.api.acirWriteVkUltraKeccakZKHonk.bind(this.api) : e?.starknet ? this.api.acirWriteVkUltraStarknetHonk.bind(this.api) : this.api.acirWriteVkUltraHonk.bind(this.api), a = e?.keccak ? this.api.acirVerifyUltraKeccakHonk.bind(this.api) : e?.keccakZK ? this.api.acirVerifyUltraKeccakZKHonk.bind(this.api) : e?.starknet ? this.api.acirVerifyUltraStarknetHonk.bind(this.api) : this.api.acirVerifyUltraHonk.bind(this.api), s = await i(this.acirUncompressedBytecode);
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
    function P_(t) {
        const n = W_(t);
        return hl(n);
    }
    function W_(t) {
        if (typeof Rs < "u") {
            const n = Rs.from(t, "base64");
            return new Uint8Array(n.buffer, n.byteOffset, n.byteLength);
        } else {
            if (typeof atob == "function") return Uint8Array.from(atob(t), (n)=>n.charCodeAt(0));
            throw new Error("No implementation found for base64 decoding.");
        }
    }
    class Mi extends Wf {
        constructor(n, e, r){
            super(e), this.worker = n, this.options = r;
        }
        static async new(n = {}) {
            const e = await jf(), r = Eo(e), { module: i, threads: a } = await il(n.threads, n.wasmPath, n.logger);
            return await r.init(i, a, _o(n.logger ?? qe()("bb.js:bb_wasm_async")), n.memory?.initial, n.memory?.maximum), new Mi(e, r, n);
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
    let ai, Jn;
    Bi = class extends Vf {
        constructor(n){
            super(n);
        }
        static async new(n, e = qe()("bb.js:bb_wasm_sync")) {
            const r = new kr, { module: i, threads: a } = await il(1, n, e);
            return await r.init(i, a, e), new Bi(r);
        }
        static async initSingleton(n, e = qe()("bb.js:bb_wasm_sync")) {
            return ai || (ai = Bi.new(n, e)), Jn = await ai, Jn;
        }
        static getSingleton() {
            if (!Jn) throw new Error("First call BarretenbergSync.initSingleton() on @aztec/bb.js module.");
            return Jn;
        }
        getWasm() {
            return this.wasm;
        }
    };
    const V_ = "1.0.0-beta.9+6abff2f16e1c1314ba30708d1cf032a536de3d19", Y_ = "10721732967084593846", G_ = {
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
            }
        ],
        return_type: null,
        error_types: {
            "17843811134343075018": {
                error_kind: "string",
                string: "Stack too deep"
            }
        }
    }, j_ = "H4sIAAAAAAAA/+1dCZfUxhEu2AV7DQuYy445Eg4n5kis7tbRTWJYJ1yJORIDTsyR0GqpzU1ibieG5XD8r3kpPbegRzs4IaqeZ61b7xVVO7tb6q/1TX1VYnZmCXx3fIv2uYunnV8CC4/2sTnnk34Hm6LLlSz11rnO+fVdAFMBAYgkT9O64DUTTCdclTJL0qzMJZMsk1nFpRC1TGWhSlUkiqWiZjZTwrpk6/73XOa/5GLrCTd2koRYAWEIscH5jRCYECsICbGBkBAbCTe2uehvos14+/gitxR1oRirpMgSVeRc4QryIhPMGpYZbatCaanKujalUCoRNldZwU0ucpvqTD/v5GO6sFltta4KKzABz7Ri0orEGFkVQghrjC4L/LZRiWVpVUtWGpNxaZUSWfWc9vomCwifpVrLXBfClFKLNONZnZVlXeV1KkrNmJK1zBObWaGyhOfSFqyyaaZYWdVpwrvr44mqjC0tx3+ywiqbJynuTFoVTJvcaisLjqe0pkiTwiRpXeac6ZzLwmjDeB4aL6+sLFWa1JlUSZ0iHYuiTjJRCKvrXGlWFVmK11RkNW6KTMo8z1VapHj9uanMguvBa1NJWbFM5UVpMlFKiXvD66RiucxzhlhNmWtteCWszGqOOIu6tiU3TCHZQuBd7nI1cVOUn7t4vRdv8OKNLiZcB6fG1eR7B+1dtJ/AZFV+GsIU9fec39QFQF3UfQB9i/p7QFfUN8EwVX4lhCHEZue3QGBCrCQkxGZCQmyBqPJU2EfyRZVf1CrfFOVWzTd58WYv3gLDUPmtaD9F+xlMVuWXQZiivs357V0A1EXdB9C3qG8DuqK+HYap8rMQhhA7nN8JgQkxS0iIHYSE2AlR5amwj+SLKr+oVb4pyq2ab/fiHV68E4ah8u+j/RztFzBZlV8OYYr6B87v6gKgLuo+gL5F/QOgK+q7YJgqvwrCEGK383sgMCFWERJiNyEh9kBUeSrsI/miyi9qlW+Kcqvmu7x4txfvgWGo/F60X6L9Ciar8m9AmKL+YZuzC4C6qPsA+hb1D4GuqCcwTJVfDWEIwZznEJgQqwkJwQgJwSGqPBX2kXxR5Re1yjdFuVXzxIuZF3MYhsoLtBQtg8mq/JsQpqjnzhddANRF3QfQt6jnQFfUCximyq+BMISQzisITIg1hISQhIRQEFWeCvtIvqjyi1rlm6LcqnnhxdKLFQxD5feh/RrtNzBZlZ+BMEX9I+f3dwFQF3UfQN+i/hHQFfX9MEyVfxvCEOJAZ53BCPE2ISEOEBJiDqLKU2EfyRdVflGrfFOUWzXf78UHvHgOhqHyH6P9Fu13MFmVfwvCFPWDzh/qAqAu6j6AvkX9INAV9UMwTJVfC2EIcdj5IxCYEGsJCXGYkBBHIKo8FfaRfFHlF7XKN0W5VfNDXnzYi4/AMFT+KNrv0f4Ak1X5jyFMUf/E+WNdANRF3QfQt6h/AnRF/RgMU+WPQhhCHHf+BAQmxFFCQhwnJMQJoFf51d4+vsgdVX5RqzwzaWq5zjieXTKknZYCF5AhC00tS2QnS3jabACGkqmyrLTNNNeVlij2csH6hNZ1LfI6TznHHgH/b4nlgiPWTCldq7pEUhiU9EJLo3iitUASyVIqk1k8efCuJq8QFcsTk0vEibzLM5ubMi0Yx8tQJ7gHyqZCyOYipZpxo5CSlnNb5tiLLFhfZorEiFKZpEIup4YlSS00L0orjBFFA8pKU1UqReaYNJH4dOGiKtI8ReA2dnH98b7lcjVxI7ptt3bMi191D+e4F5/w4nHdIOG60xBd30m0P6L9CSbb9QkII/KfOn+qC4Ba5H0AfUX+U6AT+VMwzK5vH4QhxGnnz0BgQuwjJMRpQkKcgdj1UWEfyRe7vtj1xa5vsF1fI7ptt3bKi1/1KtzTXnzGi8e9nodw3UG6vs/Q/oz2F5hs1/c+hBH59n0+z3YBUIu8D6CvyH8OdCJ/FobZ9e2FMIQ45/x5CEyIvYSEOEdIiPMQuz4q7CP5YtcXu77Y9Q2262tEt+3WznrxNhj/PirnvPi8F4/7i2zCdQfp+i6g/RXtbzDZru8dCCPyF53XXQDUIu8D6CvyF4FO5DUMs+vbCmEIUTpvIDAhthISoiQkhIHY9VFhH8kXu77Y9cWub7Bd30V42a1pL37VO+GXXmy8eNx76hKuO0jXV6HVaBYm2/V9BmFE/gvnL3UBUIu8D6CvyH8BdCJ/CSbT9S0l3k/CN2AK9jYPl52/0t2M6YFsRl+iXiYk6hWYDFGpK9dJCEOuq85f6wKgrlwnCQlxlZAQ12CYlYvwz82D/VHbdedvdDeDunKF2oy+RL1OSNQbQNuLxjna5YtzdJyj4xw92Dm6GWPa+feSF1/24itefNWLr3nxdS++AcOYo2+i/R3tHzDZObqCMA3Dl87f6gKg7kZ9AH1F/kugE/lbMMxulPADhoN9jOFt5+90N4O6Gw21GX2JepuQqHdgMkSlrlwXIAy57jp/rwuAunJdICTEXUJC3INhVi7Cj1ML9qEt951/0N0M6soVajP6EvU+IVEfAG0vGudoly/O0XGOjnP0YOfoZoxp599bXnzbi+948V0vvufF9734AQxjjv4K7Z9o/4LJztFfQZiG4WvnH3YBUHejPoC+Iv810In8Q5hMNzqU0THpdwyiS37k/Hz3Ii2PF+m1c1F274+A7ok9D5N5YlNX+psQhvSPnX/SBUBd6W8SEuIxISGewDAr/Q/0lUeDeF3BU+efdS8SdaX/sV2kvk/sp0D3xH5GhzHep4F4nybep4n3aRbDfZpmTG7vrzz04kdePO/Fj734iRc/9eJnMIz7NN+g/RvtWxg9uv8p1FfHCNfNviHcAx/zDDHmJYSY422M18sVh4HXOxqutgPZGuen3GPNNW6uTbOn7Xv+N+degbYSbRZtFXzXCza/23zK0Vp4OTA3R5PfHzj8x5tjq/Ptc3Cp931K7s90zkuZXyZpMTMGH+H6xUxnL0PsT5szQP7kDZfn4Dws4IV/3ln3tX/joP2dhoOr4GW82vud5jjk5V7S+d7hMecNiRk5kbX5pwPkx4OvG7P+9lwr3B69676eGvOz/nNhmfcz464LjHlsyZg83b31r+Oc80wI7HxxqrGVFVmheIltf46Tji1ymVYW+8KqqFmqBVd1gZOdrGucIk2RWxyQctvFuvR7sM1+zxpnx+D19699Tk/Pj2Kfc48nPQ5sn1/031Mu/zJYuN/++Zd1fn6L+9rvaX0cc//nOm2hmRXa4vRVVTh5rO3kB2/Pmn36D+e/wViUoQAA", K_ = "pdfdbrMwDAbge8kxB7Hz5/RWpmliHZuQEK1YO+nT1Hv/kuUN2zSBED0pdYqfmmD351O9dM/Xt6d+fD29q8PDp3qe+mHo356G07G99KcxrX4qnR/IqwM3ikI5iDqYdIjqYBvF6Qx7uzWqpj1dpq7LWT+cpJ/bqRsv6jBeh6FRH+1w/Trp/dyOX8dLO6VXdaO68SUdE/jaD11+dmu+s/VyqmhGsrCf0yn8yqflfG8t8r0ze/KFar7Irvx68UEvvv/K9VM0BgBFa2fB6e2C9bPg9gn8XYNzS0JYFqKvu0Ba0xIgywCzCAQ2Pxsh/hLiiiBcO4HF0ZJAK/tgSUcQlhzvItjUfrLs4z6C3d0EhQ3E2m7GeSs40h7BpE6AYIjMLsHSLES6W7BLgl7rS1M/n9JtCTuGK3X2LBi7OFy8Np/E9WYQhcXxYrp7vpjvHrD8UXLngK0S2wZsndg0YOvEpgFb3c5tE7ZGbByxdWLTjG0ndg2Z1XNzWpY9Q2btPGQ2/P4OfExRe+ynP7+QKJVN6ZB/DpXIlMjmL/BGubLoy2IokZQollOoMnAIEEEiUASLgBE0AkfwGB7XuuAxPIbH8Bgew2N4DM/AM/BMvVB4Bp6BZ+AZeAaegWd13uB0TB7nmBEbxMkz6T5Zh3WP9YBYEMdynoPn4Dl4Dp6D5+A5eA6eg+fgeXgenofn4XmL2CH2iANigRPLetBlPRBiRmwQW8SoL6C+EIoTBOuxrAvqE9QnqE9Qn6A+QX3iiyPZSx0uub486B/t1LfPQ5d7OXf7dTzW1k7h5d+5vlL/Hpyn07F7uU5dHoMf/xHS40N6R46Ptzwq/wE=", q_ = {
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
//
// ledger_seq is exposed as public input to tie proof to specific snapshot
// Freshness / anti-replay semantics enforced by Soroban contract (Layer 2)
//
// Contract (off-circuit) checks R >= L by reading reserves live from ledger

use dep::std;

global N: u32 = 8;            // Number of holders (power of 2). Scale up for production (8 = demo).
global TREE: u32 = 2 * N - 1; // Nodes in heap-indexed tree
global MAX_BITS: u32 = 120;   // Upper bound for each balance (fits in i128 contract type)

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
    // Private inputs (never leave the prover)
    balances: [Field; N],
    salts: [Field; N],
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
}

#[test]
fn test_well_formed_tree_sums() {
    // Example balances (8 holders). Sum is 400000.
    let balances = [100000, 50000, 25000, 75000, 30000, 20000, 60000, 40000];
    let salts = [1, 2, 3, 4, 5, 6, 7, 8];

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

    main(node_hash[0], 400000, 58204113, balances, salts);
}
`,
            path: "/mnt/c/Users/CarlosIsraelJiménezJ/Documents/Stellar/Veraz/circuits/solvency/src/main.nr"
        }
    }, X_ = [
        "main"
    ], Q_ = [
        "decompose_hint"
    ], Ns = {
        noir_version: V_,
        hash: Y_,
        abi: G_,
        bytecode: j_,
        debug_symbols: K_,
        file_map: q_,
        names: X_,
        brillig_names: Q_
    }, Os = 8;
    async function J_({ balances: t, salts: n, ledgerSeq: e }) {
        if (t.length !== Os) throw new Error(`El circuito requiere exactamente ${Os} balances. Recibidos: ${t.length}.`);
        console.log("🌳 Calculando Merkle sum-tree...");
        const { buildMerkleTree: r } = await si(async ()=>{
            const { buildMerkleTree: p } = await import("./merkle-BsrW8myZ.js");
            return {
                buildMerkleTree: p
            };
        }, __vite__mapDeps([0,1,2]), import.meta.url), { root: i, totalSum: a } = await r(t, n);
        console.log("  root:", i), console.log("  totalSum:", a);
        const s = {
            root: i,
            total_liabilities: a,
            ledger_seq: String(e),
            balances: t,
            salts: n
        };
        console.log("⚙️  Ejecutando circuito Noir...");
        const o = new Ef(Ns);
        let d;
        try {
            ({ witness: d } = await o.execute(s));
        } catch (p) {
            throw new Error(`El circuito rechazó los inputs (root o total incorrecto): ${p.message}`);
        }
        console.log("🔐 Generando prueba UltraHonk con Keccak (10–30s)...");
        const l = new M_(Ns.bytecode), { proof: u, publicInputs: m } = await l.generateProof(d, {
            keccak: !0
        });
        console.log("  proof.length:", u.length), console.log("  publicInputs raw type:", m?.constructor?.name, "length:", m?.length);
        const w = e1(m, i, a, e);
        if (w.length !== 96) throw new Error(`Public inputs tienen ${w.length} bytes, se esperan 96.`);
        return n1(w), {
            proof: new Uint8Array(u),
            publicInputs: w
        };
    }
    function e1(t, n, e, r) {
        if (t instanceof Uint8Array && t.length >= 96) return console.log("✅ public_inputs: usando los 96 bytes de bb.js directamente"), t.slice(0, 96);
        if (Array.isArray(t) && t.length >= 3) {
            console.log("ℹ️  public_inputs: convirtiendo array de fields a 96 bytes");
            const i = new Uint8Array(96);
            return t.slice(0, 3).forEach((a, s)=>{
                const o = xl(a);
                for(let d = 0; d < 32; d++)i[s * 32 + d] = parseInt(o.slice(d * 2, d * 2 + 2), 16);
            }), i;
        }
        return console.warn("⚠️  public_inputs: construyendo manualmente desde root/L/seq"), t1(n, e, r);
    }
    function t1(t, n, e) {
        const r = new Uint8Array(96), i = xl(t);
        for(let o = 0; o < 32; o++)r[o] = parseInt(i.slice(o * 2, o * 2 + 2), 16);
        const a = BigInt(n);
        for(let o = 0; o < 16; o++)r[48 + o] = Number(a >> BigInt((15 - o) * 8) & 0xffn);
        const s = Number(e);
        return r[92] = s >>> 24 & 255, r[93] = s >>> 16 & 255, r[94] = s >>> 8 & 255, r[95] = s & 255, r;
    }
    function xl(t) {
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
    function n1(t) {
        const n = Array.from(t.slice(0, 32)).map((s)=>s.toString(16).padStart(2, "0")).join(""), e = t.slice(48, 64), r = t.slice(92, 96);
        let i = 0n;
        for (const s of e)i = i << 8n | BigInt(s);
        const a = r[0] << 24 | r[1] << 16 | r[2] << 8 | r[3];
        console.log("📦 Public inputs formateados (96 bytes):"), console.log(`  root (bytes 0-31):        0x${n.slice(0, 16)}…`), console.log(`  L    (bytes 48-63):       ${i}`), console.log(`  seq  (bytes 92-95):       ${a}`);
    }
    a1 = Object.freeze(Object.defineProperty({
        __proto__: null,
        generateSolvencyProof: J_
    }, Symbol.toStringTag, {
        value: "Module"
    }));
});
export { Bi as B, K as F, a1 as p, __tla };
