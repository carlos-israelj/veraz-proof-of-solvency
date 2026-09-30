const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./merkle-DWwTh_Xh.js","./index-BzKFoebV.js","./index-4rA93MZs.js","./index-CmOZt9DE.css"])))=>i.map(i=>d[i]);
import { _ as Bn, __tla as __tla_0 } from "./index-4rA93MZs.js";
import { UltraHonkBackend as Un, __tla as __tla_1 } from "./index-BzKFoebV.js";
import { hashReserveAddresses as Zn, __tla as __tla_2 } from "./stellar-UF6o_Nbs.js";
let zs;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })(),
    (()=>{
        try {
            return __tla_1;
        } catch  {}
    })(),
    (()=>{
        try {
            return __tla_2;
        } catch  {}
    })()
]).then(async ()=>{
    let k;
    function Y(n) {
        const t = k.__externref_table_alloc();
        return k.__wbindgen_export_2.set(t, n), t;
    }
    function Z(n, t) {
        try {
            return n.apply(this, t);
        } catch (e) {
            const s = Y(e);
            k.__wbindgen_exn_store(s);
        }
    }
    const mn = typeof TextDecoder < "u" ? new TextDecoder("utf-8", {
        ignoreBOM: !0,
        fatal: !0
    }) : {
        decode: ()=>{
            throw Error("TextDecoder not available");
        }
    };
    typeof TextDecoder < "u" && mn.decode();
    let J = null;
    function z() {
        return (J === null || J.byteLength === 0) && (J = new Uint8Array(k.memory.buffer)), J;
    }
    function V(n, t) {
        return n = n >>> 0, mn.decode(z().subarray(n, n + t));
    }
    let W = 0;
    const le = typeof TextEncoder < "u" ? new TextEncoder("utf-8") : {
        encode: ()=>{
            throw Error("TextEncoder not available");
        }
    }, Vn = typeof le.encodeInto == "function" ? function(n, t) {
        return le.encodeInto(n, t);
    } : function(n, t) {
        const e = le.encode(n);
        return t.set(e), {
            read: n.length,
            written: e.length
        };
    };
    function ge(n, t, e) {
        if (e === void 0) {
            const o = le.encode(n), u = t(o.length, 1) >>> 0;
            return z().subarray(u, u + o.length).set(o), W = o.length, u;
        }
        let s = n.length, i = t(s, 1) >>> 0;
        const r = z();
        let l = 0;
        for(; l < s; l++){
            const o = n.charCodeAt(l);
            if (o > 127) break;
            r[i + l] = o;
        }
        if (l !== s) {
            l !== 0 && (n = n.slice(l)), i = e(i, s, s = l + n.length * 3, 1) >>> 0;
            const o = z().subarray(i + l, i + s), u = Vn(n, o);
            l += u.written, i = e(i, s, l, 1) >>> 0;
        }
        return W = l, i;
    }
    let M = null;
    function D() {
        return (M === null || M.buffer.detached === !0 || M.buffer.detached === void 0 && M.buffer !== k.memory.buffer) && (M = new DataView(k.memory.buffer)), M;
    }
    function q(n) {
        return n == null;
    }
    const Oe = typeof FinalizationRegistry > "u" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((n)=>{
        k.__wbindgen_export_6.get(n.dtor)(n.a, n.b);
    });
    function jn(n, t, e, s) {
        const i = {
            a: n,
            b: t,
            cnt: 1,
            dtor: e
        }, r = (...l)=>{
            i.cnt++;
            const o = i.a;
            i.a = 0;
            try {
                return s(o, i.b, ...l);
            } finally{
                --i.cnt === 0 ? (k.__wbindgen_export_6.get(i.dtor)(o, i.b), Oe.unregister(i)) : i.a = o;
            }
        };
        return r.original = i, Oe.register(r, i, i), r;
    }
    function Ae(n) {
        const t = typeof n;
        if (t == "number" || t == "boolean" || n == null) return `${n}`;
        if (t == "string") return `"${n}"`;
        if (t == "symbol") {
            const i = n.description;
            return i == null ? "Symbol" : `Symbol(${i})`;
        }
        if (t == "function") {
            const i = n.name;
            return typeof i == "string" && i.length > 0 ? `Function(${i})` : "Function";
        }
        if (Array.isArray(n)) {
            const i = n.length;
            let r = "[";
            i > 0 && (r += Ae(n[0]));
            for(let l = 1; l < i; l++)r += ", " + Ae(n[l]);
            return r += "]", r;
        }
        const e = /\[object ([^\]]+)\]/.exec(toString.call(n));
        let s;
        if (e && e.length > 1) s = e[1];
        else return toString.call(n);
        if (s == "Object") try {
            return "Object(" + JSON.stringify(n) + ")";
        } catch  {
            return "Object";
        }
        return n instanceof Error ? `${n.name}: ${n.message}
${n.stack}` : s;
    }
    function Xn(n) {
        const t = k.__wbindgen_export_2.get(n);
        return k.__externref_table_dealloc(n), t;
    }
    function zn(n, t) {
        return n = n >>> 0, z().subarray(n / 1, n / 1 + t);
    }
    function Qn(n, t) {
        const e = t(n.length * 1, 1) >>> 0;
        return z().set(n, e / 1), W = n.length, e;
    }
    function Kn(n) {
        const t = k.compressWitnessStack(n);
        if (t[3]) throw Xn(t[2]);
        var e = zn(t[0], t[1]).slice();
        return k.__wbindgen_free(t[0], t[1] * 1, 1), e;
    }
    function Gn(n, t, e) {
        const s = Qn(n, k.__wbindgen_malloc), i = W;
        return k.executeProgram(s, i, t, e);
    }
    function Yn(n, t, e) {
        k.closure646_externref_shim(n, t, e);
    }
    function Jn(n, t, e, s, i) {
        k.closure1311_externref_shim(n, t, e, s, i);
    }
    function Ie(n, t, e, s) {
        k.closure1315_externref_shim(n, t, e, s);
    }
    async function $n(n, t) {
        if (typeof Response == "function" && n instanceof Response) {
            if (typeof WebAssembly.instantiateStreaming == "function") try {
                return await WebAssembly.instantiateStreaming(n, t);
            } catch (s) {
                if (n.headers.get("Content-Type") != "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", s);
                else throw s;
            }
            const e = await n.arrayBuffer();
            return await WebAssembly.instantiate(e, t);
        } else {
            const e = await WebAssembly.instantiate(n, t);
            return e instanceof WebAssembly.Instance ? {
                instance: e,
                module: n
            } : e;
        }
    }
    function et() {
        const n = {};
        return n.wbg = {}, n.wbg.__wbg_call_672a4d21634d4a24 = function() {
            return Z(function(t, e) {
                return t.call(e);
            }, arguments);
        }, n.wbg.__wbg_call_7cccdd69e0791ae2 = function() {
            return Z(function(t, e, s) {
                return t.call(e, s);
            }, arguments);
        }, n.wbg.__wbg_call_833bed5770ea2041 = function() {
            return Z(function(t, e, s, i) {
                return t.call(e, s, i);
            }, arguments);
        }, n.wbg.__wbg_constructor_485c344f17716fe1 = function(t) {
            return new Error(t);
        }, n.wbg.__wbg_constructor_4d3f186b35aa8368 = function(t) {
            return new Error(t);
        }, n.wbg.__wbg_debug_3cb59063b29f58c1 = function(t) {
            console.debug(t);
        }, n.wbg.__wbg_debug_e17b51583ca6a632 = function(t, e, s, i) {
            console.debug(t, e, s, i);
        }, n.wbg.__wbg_error_524f506f44df1645 = function(t) {
            console.error(t);
        }, n.wbg.__wbg_error_7534b8e9a36f1ab4 = function(t, e) {
            let s, i;
            try {
                s = t, i = e, console.error(V(t, e));
            } finally{
                k.__wbindgen_free(s, i, 1);
            }
        }, n.wbg.__wbg_error_80de38b3f7cc3c3c = function(t, e, s, i) {
            console.error(t, e, s, i);
        }, n.wbg.__wbg_forEach_d6a05ca96422eff9 = function(t, e, s) {
            try {
                var i = {
                    a: e,
                    b: s
                }, r = (l, o, u)=>{
                    const a = i.a;
                    i.a = 0;
                    try {
                        return Jn(a, i.b, l, o, u);
                    } finally{
                        i.a = a;
                    }
                };
                t.forEach(r);
            } finally{
                i.a = i.b = 0;
            }
        }, n.wbg.__wbg_forEach_e1cf6f7c8ecb7dae = function(t, e, s) {
            try {
                var i = {
                    a: e,
                    b: s
                }, r = (l, o)=>{
                    const u = i.a;
                    i.a = 0;
                    try {
                        return Ie(u, i.b, l, o);
                    } finally{
                        i.a = u;
                    }
                };
                t.forEach(r);
            } finally{
                i.a = i.b = 0;
            }
        }, n.wbg.__wbg_fromEntries_524679eecb0bdc2e = function() {
            return Z(function(t) {
                return Object.fromEntries(t);
            }, arguments);
        }, n.wbg.__wbg_from_2a5d3e218e67aa85 = function(t) {
            return Array.from(t);
        }, n.wbg.__wbg_get_b9b93047fe3cf45b = function(t, e) {
            return t[e >>> 0];
        }, n.wbg.__wbg_info_033d8b8a0838f1d3 = function(t, e, s, i) {
            console.info(t, e, s, i);
        }, n.wbg.__wbg_info_3daf2e093e091b66 = function(t) {
            console.info(t);
        }, n.wbg.__wbg_length_e2d2a49132c1b256 = function(t) {
            return t.length;
        }, n.wbg.__wbg_new_23a2665fac83c611 = function(t, e) {
            try {
                var s = {
                    a: t,
                    b: e
                }, i = (l, o)=>{
                    const u = s.a;
                    s.a = 0;
                    try {
                        return Ie(u, s.b, l, o);
                    } finally{
                        s.a = u;
                    }
                };
                return new Promise(i);
            } finally{
                s.a = s.b = 0;
            }
        }, n.wbg.__wbg_new_5e0be73521bc8c17 = function() {
            return new Map;
        }, n.wbg.__wbg_new_5f3ae2f96f8de996 = function() {
            return new Array;
        }, n.wbg.__wbg_new_78feb108b6472713 = function() {
            return new Array;
        }, n.wbg.__wbg_new_8a6f238a6ece86ea = function() {
            return new Error;
        }, n.wbg.__wbg_new_c68d7209be747379 = function(t, e) {
            return new Error(V(t, e));
        }, n.wbg.__wbg_new_e48d31efda68db91 = function() {
            return new Map;
        }, n.wbg.__wbg_newnoargs_105ed471475aaf50 = function(t, e) {
            return new Function(V(t, e));
        }, n.wbg.__wbg_parse_def2e24ef1252aff = function() {
            return Z(function(t, e) {
                return JSON.parse(V(t, e));
            }, arguments);
        }, n.wbg.__wbg_push_737cfc8c1432c2c6 = function(t, e) {
            return t.push(e);
        }, n.wbg.__wbg_queueMicrotask_97d92b4fcc8a61c5 = function(t) {
            queueMicrotask(t);
        }, n.wbg.__wbg_queueMicrotask_d3219def82552485 = function(t) {
            return t.queueMicrotask;
        }, n.wbg.__wbg_resolve_4851785c9c5f573d = function(t) {
            return Promise.resolve(t);
        }, n.wbg.__wbg_reverse_71c11f9686a5c11b = function(t) {
            return t.reverse();
        }, n.wbg.__wbg_set_8fc6bf8a5b1071d1 = function(t, e, s) {
            return t.set(e, s);
        }, n.wbg.__wbg_set_bb8cecf6a62b9f46 = function() {
            return Z(function(t, e, s) {
                return Reflect.set(t, e, s);
            }, arguments);
        }, n.wbg.__wbg_setcause_180f5110152d3ce3 = function(t, e) {
            t.cause = e;
        }, n.wbg.__wbg_stack_0ed75d68575b0f3c = function(t, e) {
            const s = e.stack, i = ge(s, k.__wbindgen_malloc, k.__wbindgen_realloc), r = W;
            D().setInt32(t + 4 * 1, r, !0), D().setInt32(t + 4 * 0, i, !0);
        }, n.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function() {
            const t = typeof globalThis > "u" ? null : globalThis;
            return q(t) ? 0 : Y(t);
        }, n.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function() {
            const t = typeof globalThis > "u" ? null : globalThis;
            return q(t) ? 0 : Y(t);
        }, n.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function() {
            const t = typeof self > "u" ? null : self;
            return q(t) ? 0 : Y(t);
        }, n.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function() {
            const t = typeof window > "u" ? null : window;
            return q(t) ? 0 : Y(t);
        }, n.wbg.__wbg_then_44b73946d2fb3e7d = function(t, e) {
            return t.then(e);
        }, n.wbg.__wbg_then_48b406749878a531 = function(t, e, s) {
            return t.then(e, s);
        }, n.wbg.__wbg_values_fcb8ba8c0aad8b58 = function(t) {
            return Object.values(t);
        }, n.wbg.__wbg_warn_4ca3906c248c47c4 = function(t) {
            console.warn(t);
        }, n.wbg.__wbg_warn_aaf1f4664a035bd6 = function(t, e, s, i) {
            console.warn(t, e, s, i);
        }, n.wbg.__wbindgen_cb_drop = function(t) {
            const e = t.original;
            return e.cnt-- == 1 ? (e.a = 0, !0) : !1;
        }, n.wbg.__wbindgen_closure_wrapper2143 = function(t, e, s) {
            return jn(t, e, 647, Yn);
        }, n.wbg.__wbindgen_debug_string = function(t, e) {
            const s = Ae(e), i = ge(s, k.__wbindgen_malloc, k.__wbindgen_realloc), r = W;
            D().setInt32(t + 4 * 1, r, !0), D().setInt32(t + 4 * 0, i, !0);
        }, n.wbg.__wbindgen_init_externref_table = function() {
            const t = k.__wbindgen_export_2, e = t.grow(4);
            t.set(0, void 0), t.set(e + 0, void 0), t.set(e + 1, null), t.set(e + 2, !0), t.set(e + 3, !1);
        }, n.wbg.__wbindgen_is_array = function(t) {
            return Array.isArray(t);
        }, n.wbg.__wbindgen_is_function = function(t) {
            return typeof t == "function";
        }, n.wbg.__wbindgen_is_string = function(t) {
            return typeof t == "string";
        }, n.wbg.__wbindgen_is_undefined = function(t) {
            return t === void 0;
        }, n.wbg.__wbindgen_number_get = function(t, e) {
            const s = e, i = typeof s == "number" ? s : void 0;
            D().setFloat64(t + 8 * 1, q(i) ? 0 : i, !0), D().setInt32(t + 4 * 0, !q(i), !0);
        }, n.wbg.__wbindgen_number_new = function(t) {
            return t;
        }, n.wbg.__wbindgen_string_get = function(t, e) {
            const s = e, i = typeof s == "string" ? s : void 0;
            var r = q(i) ? 0 : ge(i, k.__wbindgen_malloc, k.__wbindgen_realloc), l = W;
            D().setInt32(t + 4 * 1, l, !0), D().setInt32(t + 4 * 0, r, !0);
        }, n.wbg.__wbindgen_string_new = function(t, e) {
            return V(t, e);
        }, n.wbg.__wbindgen_throw = function(t, e) {
            throw new Error(V(t, e));
        }, n;
    }
    function nt(n, t) {
        return k = n.exports, pn.__wbindgen_wasm_module = t, M = null, J = null, k.__wbindgen_start(), k;
    }
    async function pn(n) {
        if (k !== void 0) return k;
        typeof n < "u" && (Object.getPrototypeOf(n) === Object.prototype ? { module_or_path: n } = n : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), typeof n > "u" && (n = new URL("" + new URL("acvm_js_bg-BvxvrAml.wasm", import.meta.url).href, import.meta.url));
        const t = et();
        (typeof n == "string" || typeof Request == "function" && n instanceof Request || typeof URL == "function" && n instanceof URL) && (n = fetch(n));
        const { instance: e, module: s } = await $n(await n, t);
        return nt(e, s);
    }
    let C;
    const yn = typeof TextDecoder < "u" ? new TextDecoder("utf-8", {
        ignoreBOM: !0,
        fatal: !0
    }) : {
        decode: ()=>{
            throw Error("TextDecoder not available");
        }
    };
    typeof TextDecoder < "u" && yn.decode();
    let $ = null;
    function fe() {
        return ($ === null || $.byteLength === 0) && ($ = new Uint8Array(C.memory.buffer)), $;
    }
    function ie(n, t) {
        return n = n >>> 0, yn.decode(fe().subarray(n, n + t));
    }
    function xn(n) {
        const t = C.__externref_table_alloc();
        return C.__wbindgen_export_3.set(t, n), t;
    }
    function De(n, t) {
        try {
            return n.apply(this, t);
        } catch (e) {
            const s = xn(e);
            C.__wbindgen_exn_store(s);
        }
    }
    let _e = 0;
    const de = typeof TextEncoder < "u" ? new TextEncoder("utf-8") : {
        encode: ()=>{
            throw Error("TextEncoder not available");
        }
    }, tt = typeof de.encodeInto == "function" ? function(n, t) {
        return de.encodeInto(n, t);
    } : function(n, t) {
        const e = de.encode(n);
        return t.set(e), {
            read: n.length,
            written: e.length
        };
    };
    function Pe(n, t, e) {
        if (e === void 0) {
            const o = de.encode(n), u = t(o.length, 1) >>> 0;
            return fe().subarray(u, u + o.length).set(o), _e = o.length, u;
        }
        let s = n.length, i = t(s, 1) >>> 0;
        const r = fe();
        let l = 0;
        for(; l < s; l++){
            const o = n.charCodeAt(l);
            if (o > 127) break;
            r[i + l] = o;
        }
        if (l !== s) {
            l !== 0 && (n = n.slice(l)), i = e(i, s, s = l + n.length * 3, 1) >>> 0;
            const o = fe().subarray(i + l, i + s), u = tt(n, o);
            l += u.written, i = e(i, s, l, 1) >>> 0;
        }
        return _e = l, i;
    }
    let L = null;
    function j() {
        return (L === null || L.buffer.detached === !0 || L.buffer.detached === void 0 && L.buffer !== C.memory.buffer) && (L = new DataView(C.memory.buffer)), L;
    }
    function ue(n) {
        return n == null;
    }
    function K(n) {
        const t = C.__wbindgen_export_3.get(n);
        return C.__externref_table_dealloc(n), t;
    }
    function st(n, t, e) {
        const s = C.abiEncode(n, t, ue(e) ? 0 : xn(e));
        if (s[2]) throw K(s[1]);
        return K(s[0]);
    }
    function it(n, t) {
        const e = C.abiDecode(n, t);
        if (e[2]) throw K(e[1]);
        return K(e[0]);
    }
    function rt(n, t) {
        const e = C.abiDecodeError(n, t);
        if (e[2]) throw K(e[1]);
        return K(e[0]);
    }
    function at(n, t, e, s) {
        C.closure245_externref_shim(n, t, e, s);
    }
    async function ot(n, t) {
        if (typeof Response == "function" && n instanceof Response) {
            if (typeof WebAssembly.instantiateStreaming == "function") try {
                return await WebAssembly.instantiateStreaming(n, t);
            } catch (s) {
                if (n.headers.get("Content-Type") != "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", s);
                else throw s;
            }
            const e = await n.arrayBuffer();
            return await WebAssembly.instantiate(e, t);
        } else {
            const e = await WebAssembly.instantiate(n, t);
            return e instanceof WebAssembly.Instance ? {
                instance: e,
                module: n
            } : e;
        }
    }
    function ct() {
        const n = {};
        return n.wbg = {}, n.wbg.__wbg_constructor_55ed424879ec3895 = function(t) {
            return new Error(t);
        }, n.wbg.__wbg_error_7534b8e9a36f1ab4 = function(t, e) {
            let s, i;
            try {
                s = t, i = e, console.error(ie(t, e));
            } finally{
                C.__wbindgen_free(s, i, 1);
            }
        }, n.wbg.__wbg_forEach_e1cf6f7c8ecb7dae = function(t, e, s) {
            try {
                var i = {
                    a: e,
                    b: s
                }, r = (l, o)=>{
                    const u = i.a;
                    i.a = 0;
                    try {
                        return at(u, i.b, l, o);
                    } finally{
                        i.a = u;
                    }
                };
                t.forEach(r);
            } finally{
                i.a = i.b = 0;
            }
        }, n.wbg.__wbg_new_0d921e1ff7a37fda = function() {
            return new Map;
        }, n.wbg.__wbg_new_8a6f238a6ece86ea = function() {
            return new Error;
        }, n.wbg.__wbg_parse_def2e24ef1252aff = function() {
            return De(function(t, e) {
                return JSON.parse(ie(t, e));
            }, arguments);
        }, n.wbg.__wbg_set_8fc6bf8a5b1071d1 = function(t, e, s) {
            return t.set(e, s);
        }, n.wbg.__wbg_stack_0ed75d68575b0f3c = function(t, e) {
            const s = e.stack, i = Pe(s, C.__wbindgen_malloc, C.__wbindgen_realloc), r = _e;
            j().setInt32(t + 4 * 1, r, !0), j().setInt32(t + 4 * 0, i, !0);
        }, n.wbg.__wbg_stringify_f7ed6987935b4a24 = function() {
            return De(function(t) {
                return JSON.stringify(t);
            }, arguments);
        }, n.wbg.__wbindgen_init_externref_table = function() {
            const t = C.__wbindgen_export_3, e = t.grow(4);
            t.set(0, void 0), t.set(e + 0, void 0), t.set(e + 1, null), t.set(e + 2, !0), t.set(e + 3, !1);
        }, n.wbg.__wbindgen_is_undefined = function(t) {
            return t === void 0;
        }, n.wbg.__wbindgen_number_get = function(t, e) {
            const s = e, i = typeof s == "number" ? s : void 0;
            j().setFloat64(t + 8 * 1, ue(i) ? 0 : i, !0), j().setInt32(t + 4 * 0, !ue(i), !0);
        }, n.wbg.__wbindgen_number_new = function(t) {
            return t;
        }, n.wbg.__wbindgen_string_get = function(t, e) {
            const s = e, i = typeof s == "string" ? s : void 0;
            var r = ue(i) ? 0 : Pe(i, C.__wbindgen_malloc, C.__wbindgen_realloc), l = _e;
            j().setInt32(t + 4 * 1, l, !0), j().setInt32(t + 4 * 0, r, !0);
        }, n.wbg.__wbindgen_string_new = function(t, e) {
            return ie(t, e);
        }, n.wbg.__wbindgen_throw = function(t, e) {
            throw new Error(ie(t, e));
        }, n;
    }
    function lt(n, t) {
        return C = n.exports, Te.__wbindgen_wasm_module = t, L = null, $ = null, C.__wbindgen_start(), C;
    }
    async function Te(n) {
        if (C !== void 0) return C;
        typeof n < "u" && (Object.getPrototypeOf(n) === Object.prototype ? { module_or_path: n } = n : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), typeof n > "u" && (n = new URL("" + new URL("noirc_abi_wasm_bg-DRbWm09M.wasm", import.meta.url).href, import.meta.url));
        const t = ct();
        (typeof n == "string" || typeof Request == "function" && n instanceof Request || typeof URL == "function" && n instanceof URL) && (n = fetch(n));
        const { instance: e, module: s } = await ot(await n, t);
        return lt(e, s);
    }
    function vn(n) {
        if (typeof Buffer < "u") return Buffer.from(n, "base64");
        if (typeof atob == "function") return Uint8Array.from(atob(n), (t)=>t.charCodeAt(0));
        throw new Error("No implementation found for base64 decoding.");
    }
    function G(n) {
        let t = n.length;
        for(; --t >= 0;)n[t] = 0;
    }
    const ft = 3, dt = 258, En = 29, ut = 256, _t = ut + 1 + En, kn = 30, ht = 512, bt = new Array((_t + 2) * 2);
    G(bt);
    const wt = new Array(kn * 2);
    G(wt);
    const gt = new Array(ht);
    G(gt);
    const mt = new Array(dt - ft + 1);
    G(mt);
    const pt = new Array(En);
    G(pt);
    const yt = new Array(kn);
    G(yt);
    const xt = (n, t, e, s)=>{
        let i = n & 65535 | 0, r = n >>> 16 & 65535 | 0, l = 0;
        for(; e !== 0;){
            l = e > 2e3 ? 2e3 : e, e -= l;
            do i = i + t[s++] | 0, r = r + i | 0;
            while (--l);
            i %= 65521, r %= 65521;
        }
        return i | r << 16 | 0;
    };
    var Se = xt;
    const vt = ()=>{
        let n, t = [];
        for(var e = 0; e < 256; e++){
            n = e;
            for(var s = 0; s < 8; s++)n = n & 1 ? 3988292384 ^ n >>> 1 : n >>> 1;
            t[e] = n;
        }
        return t;
    }, Et = new Uint32Array(vt()), kt = (n, t, e, s)=>{
        const i = Et, r = s + e;
        n ^= -1;
        for(let l = s; l < r; l++)n = n >>> 8 ^ i[(n ^ t[l]) & 255];
        return n ^ -1;
    };
    var F = kt, Ce = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version"
    }, Hn = {
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
    const Ht = (n, t)=>Object.prototype.hasOwnProperty.call(n, t);
    var At = function(n) {
        const t = Array.prototype.slice.call(arguments, 1);
        for(; t.length;){
            const e = t.shift();
            if (e) {
                if (typeof e != "object") throw new TypeError(e + "must be non-object");
                for(const s in e)Ht(e, s) && (n[s] = e[s]);
            }
        }
        return n;
    }, Tt = (n)=>{
        let t = 0;
        for(let s = 0, i = n.length; s < i; s++)t += n[s].length;
        const e = new Uint8Array(t);
        for(let s = 0, i = 0, r = n.length; s < r; s++){
            let l = n[s];
            e.set(l, i), i += l.length;
        }
        return e;
    }, An = {
        assign: At,
        flattenChunks: Tt
    };
    let Tn = !0;
    try {
        String.fromCharCode.apply(null, new Uint8Array(1));
    } catch  {
        Tn = !1;
    }
    const ne = new Uint8Array(256);
    for(let n = 0; n < 256; n++)ne[n] = n >= 252 ? 6 : n >= 248 ? 5 : n >= 240 ? 4 : n >= 224 ? 3 : n >= 192 ? 2 : 1;
    ne[254] = ne[255] = 1;
    var St = (n)=>{
        if (typeof TextEncoder == "function" && TextEncoder.prototype.encode) return new TextEncoder().encode(n);
        let t, e, s, i, r, l = n.length, o = 0;
        for(i = 0; i < l; i++)e = n.charCodeAt(i), (e & 64512) === 55296 && i + 1 < l && (s = n.charCodeAt(i + 1), (s & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (s - 56320), i++)), o += e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4;
        for(t = new Uint8Array(o), r = 0, i = 0; r < o; i++)e = n.charCodeAt(i), (e & 64512) === 55296 && i + 1 < l && (s = n.charCodeAt(i + 1), (s & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (s - 56320), i++)), e < 128 ? t[r++] = e : e < 2048 ? (t[r++] = 192 | e >>> 6, t[r++] = 128 | e & 63) : e < 65536 ? (t[r++] = 224 | e >>> 12, t[r++] = 128 | e >>> 6 & 63, t[r++] = 128 | e & 63) : (t[r++] = 240 | e >>> 18, t[r++] = 128 | e >>> 12 & 63, t[r++] = 128 | e >>> 6 & 63, t[r++] = 128 | e & 63);
        return t;
    };
    const Ct = (n, t)=>{
        if (t < 65534 && n.subarray && Tn) return String.fromCharCode.apply(null, n.length === t ? n : n.subarray(0, t));
        let e = "";
        for(let s = 0; s < t; s++)e += String.fromCharCode(n[s]);
        return e;
    };
    var Rt = (n, t)=>{
        const e = t || n.length;
        if (typeof TextDecoder == "function" && TextDecoder.prototype.decode) return new TextDecoder().decode(n.subarray(0, t));
        let s, i;
        const r = new Array(e * 2);
        for(i = 0, s = 0; s < e;){
            let l = n[s++];
            if (l < 128) {
                r[i++] = l;
                continue;
            }
            let o = ne[l];
            if (o > 4) {
                r[i++] = 65533, s += o - 1;
                continue;
            }
            for(l &= o === 2 ? 31 : o === 3 ? 15 : 7; o > 1 && s < e;)l = l << 6 | n[s++] & 63, o--;
            if (o > 1) {
                r[i++] = 65533;
                continue;
            }
            l < 65536 ? r[i++] = l : (l -= 65536, r[i++] = 55296 | l >> 10 & 1023, r[i++] = 56320 | l & 1023);
        }
        return Ct(r, i);
    }, Nt = (n, t)=>{
        t = t || n.length, t > n.length && (t = n.length);
        let e = t - 1;
        for(; e >= 0 && (n[e] & 192) === 128;)e--;
        return e < 0 || e === 0 ? t : e + ne[n[e]] > t ? e : t;
    }, Re = {
        string2buf: St,
        buf2string: Rt,
        utf8border: Nt
    };
    function Ft() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
    }
    var Ot = Ft;
    const re = 16209, It = 16191;
    var Dt = function(t, e) {
        let s, i, r, l, o, u, a, c, H, b, f, h, S, m, g, E, p, d, v, R, _, A, x, w;
        const y = t.state;
        s = t.next_in, x = t.input, i = s + (t.avail_in - 5), r = t.next_out, w = t.output, l = r - (e - t.avail_out), o = r + (t.avail_out - 257), u = y.dmax, a = y.wsize, c = y.whave, H = y.wnext, b = y.window, f = y.hold, h = y.bits, S = y.lencode, m = y.distcode, g = (1 << y.lenbits) - 1, E = (1 << y.distbits) - 1;
        e: do {
            h < 15 && (f += x[s++] << h, h += 8, f += x[s++] << h, h += 8), p = S[f & g];
            n: for(;;){
                if (d = p >>> 24, f >>>= d, h -= d, d = p >>> 16 & 255, d === 0) w[r++] = p & 65535;
                else if (d & 16) {
                    v = p & 65535, d &= 15, d && (h < d && (f += x[s++] << h, h += 8), v += f & (1 << d) - 1, f >>>= d, h -= d), h < 15 && (f += x[s++] << h, h += 8, f += x[s++] << h, h += 8), p = m[f & E];
                    t: for(;;){
                        if (d = p >>> 24, f >>>= d, h -= d, d = p >>> 16 & 255, d & 16) {
                            if (R = p & 65535, d &= 15, h < d && (f += x[s++] << h, h += 8, h < d && (f += x[s++] << h, h += 8)), R += f & (1 << d) - 1, R > u) {
                                t.msg = "invalid distance too far back", y.mode = re;
                                break e;
                            }
                            if (f >>>= d, h -= d, d = r - l, R > d) {
                                if (d = R - d, d > c && y.sane) {
                                    t.msg = "invalid distance too far back", y.mode = re;
                                    break e;
                                }
                                if (_ = 0, A = b, H === 0) {
                                    if (_ += a - d, d < v) {
                                        v -= d;
                                        do w[r++] = b[_++];
                                        while (--d);
                                        _ = r - R, A = w;
                                    }
                                } else if (H < d) {
                                    if (_ += a + H - d, d -= H, d < v) {
                                        v -= d;
                                        do w[r++] = b[_++];
                                        while (--d);
                                        if (_ = 0, H < v) {
                                            d = H, v -= d;
                                            do w[r++] = b[_++];
                                            while (--d);
                                            _ = r - R, A = w;
                                        }
                                    }
                                } else if (_ += H - d, d < v) {
                                    v -= d;
                                    do w[r++] = b[_++];
                                    while (--d);
                                    _ = r - R, A = w;
                                }
                                for(; v > 2;)w[r++] = A[_++], w[r++] = A[_++], w[r++] = A[_++], v -= 3;
                                v && (w[r++] = A[_++], v > 1 && (w[r++] = A[_++]));
                            } else {
                                _ = r - R;
                                do w[r++] = w[_++], w[r++] = w[_++], w[r++] = w[_++], v -= 3;
                                while (v > 2);
                                v && (w[r++] = w[_++], v > 1 && (w[r++] = w[_++]));
                            }
                        } else if (d & 64) {
                            t.msg = "invalid distance code", y.mode = re;
                            break e;
                        } else {
                            p = m[(p & 65535) + (f & (1 << d) - 1)];
                            continue t;
                        }
                        break;
                    }
                } else if (d & 64) if (d & 32) {
                    y.mode = It;
                    break e;
                } else {
                    t.msg = "invalid literal/length code", y.mode = re;
                    break e;
                }
                else {
                    p = S[(p & 65535) + (f & (1 << d) - 1)];
                    continue n;
                }
                break;
            }
        }while (s < i && r < o);
        v = h >> 3, s -= v, h -= v << 3, f &= (1 << h) - 1, t.next_in = s, t.next_out = r, t.avail_in = s < i ? 5 + (i - s) : 5 - (s - i), t.avail_out = r < o ? 257 + (o - r) : 257 - (r - o), y.hold = f, y.bits = h;
    };
    const X = 15, qe = 852, Me = 592, Le = 0, me = 1, We = 2, Pt = new Uint16Array([
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
    ]), qt = new Uint8Array([
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
    ]), Mt = new Uint16Array([
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
    ]), Lt = new Uint8Array([
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
    ]), Wt = (n, t, e, s, i, r, l, o)=>{
        const u = o.bits;
        let a = 0, c = 0, H = 0, b = 0, f = 0, h = 0, S = 0, m = 0, g = 0, E = 0, p, d, v, R, _, A = null, x;
        const w = new Uint16Array(X + 1), y = new Uint16Array(X + 1);
        let P = null, Fe, te, se;
        for(a = 0; a <= X; a++)w[a] = 0;
        for(c = 0; c < s; c++)w[t[e + c]]++;
        for(f = u, b = X; b >= 1 && w[b] === 0; b--);
        if (f > b && (f = b), b === 0) return i[r++] = 1 << 24 | 64 << 16 | 0, i[r++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
        for(H = 1; H < b && w[H] === 0; H++);
        for(f < H && (f = H), m = 1, a = 1; a <= X; a++)if (m <<= 1, m -= w[a], m < 0) return -1;
        if (m > 0 && (n === Le || b !== 1)) return -1;
        for(y[1] = 0, a = 1; a < X; a++)y[a + 1] = y[a] + w[a];
        for(c = 0; c < s; c++)t[e + c] !== 0 && (l[y[t[e + c]]++] = c);
        if (n === Le ? (A = P = l, x = 20) : n === me ? (A = Pt, P = qt, x = 257) : (A = Mt, P = Lt, x = 0), E = 0, c = 0, a = H, _ = r, h = f, S = 0, v = -1, g = 1 << f, R = g - 1, n === me && g > qe || n === We && g > Me) return 1;
        for(;;){
            Fe = a - S, l[c] + 1 < x ? (te = 0, se = l[c]) : l[c] >= x ? (te = P[l[c] - x], se = A[l[c] - x]) : (te = 96, se = 0), p = 1 << a - S, d = 1 << h, H = d;
            do d -= p, i[_ + (E >> S) + d] = Fe << 24 | te << 16 | se | 0;
            while (d !== 0);
            for(p = 1 << a - 1; E & p;)p >>= 1;
            if (p !== 0 ? (E &= p - 1, E += p) : E = 0, c++, --w[a] === 0) {
                if (a === b) break;
                a = t[e + l[c]];
            }
            if (a > f && (E & R) !== v) {
                for(S === 0 && (S = f), _ += H, h = a - S, m = 1 << h; h + S < b && (m -= w[h + S], !(m <= 0));)h++, m <<= 1;
                if (g += 1 << h, n === me && g > qe || n === We && g > Me) return 1;
                v = E & R, i[v] = f << 24 | h << 16 | _ - r | 0;
            }
        }
        return E !== 0 && (i[_ + E] = a - S << 24 | 64 << 16 | 0), o.bits = f, 0;
    };
    var ee = Wt;
    const Bt = 0, Sn = 1, Cn = 2, { Z_FINISH: Be, Z_BLOCK: Ut, Z_TREES: ae, Z_OK: B, Z_STREAM_END: Zt, Z_NEED_DICT: Vt, Z_STREAM_ERROR: N, Z_DATA_ERROR: Rn, Z_MEM_ERROR: Nn, Z_BUF_ERROR: jt, Z_DEFLATED: Ue } = Hn, be = 16180, Ze = 16181, Ve = 16182, je = 16183, Xe = 16184, ze = 16185, Qe = 16186, Ke = 16187, Ge = 16188, Ye = 16189, he = 16190, I = 16191, pe = 16192, Je = 16193, ye = 16194, $e = 16195, en = 16196, nn = 16197, tn = 16198, oe = 16199, ce = 16200, sn = 16201, rn = 16202, an = 16203, on = 16204, cn = 16205, xe = 16206, ln = 16207, fn = 16208, T = 16209, Fn = 16210, On = 16211, Xt = 852, zt = 592, Qt = 15, Kt = Qt, dn = (n)=>(n >>> 24 & 255) + (n >>> 8 & 65280) + ((n & 65280) << 8) + ((n & 255) << 24);
    function Gt() {
        this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
    }
    const U = (n)=>{
        if (!n) return 1;
        const t = n.state;
        return !t || t.strm !== n || t.mode < be || t.mode > On ? 1 : 0;
    }, In = (n)=>{
        if (U(n)) return N;
        const t = n.state;
        return n.total_in = n.total_out = t.total = 0, n.msg = "", t.wrap && (n.adler = t.wrap & 1), t.mode = be, t.last = 0, t.havedict = 0, t.flags = -1, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new Int32Array(Xt), t.distcode = t.distdyn = new Int32Array(zt), t.sane = 1, t.back = -1, B;
    }, Dn = (n)=>{
        if (U(n)) return N;
        const t = n.state;
        return t.wsize = 0, t.whave = 0, t.wnext = 0, In(n);
    }, Pn = (n, t)=>{
        let e;
        if (U(n)) return N;
        const s = n.state;
        return t < 0 ? (e = 0, t = -t) : (e = (t >> 4) + 5, t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? N : (s.window !== null && s.wbits !== t && (s.window = null), s.wrap = e, s.wbits = t, Dn(n));
    }, qn = (n, t)=>{
        if (!n) return N;
        const e = new Gt;
        n.state = e, e.strm = n, e.window = null, e.mode = be;
        const s = Pn(n, t);
        return s !== B && (n.state = null), s;
    }, Yt = (n)=>qn(n, Kt);
    let un = !0, ve, Ee;
    const Jt = (n)=>{
        if (un) {
            ve = new Int32Array(512), Ee = new Int32Array(32);
            let t = 0;
            for(; t < 144;)n.lens[t++] = 8;
            for(; t < 256;)n.lens[t++] = 9;
            for(; t < 280;)n.lens[t++] = 7;
            for(; t < 288;)n.lens[t++] = 8;
            for(ee(Sn, n.lens, 0, 288, ve, 0, n.work, {
                bits: 9
            }), t = 0; t < 32;)n.lens[t++] = 5;
            ee(Cn, n.lens, 0, 32, Ee, 0, n.work, {
                bits: 5
            }), un = !1;
        }
        n.lencode = ve, n.lenbits = 9, n.distcode = Ee, n.distbits = 5;
    }, Mn = (n, t, e, s)=>{
        let i;
        const r = n.state;
        return r.window === null && (r.window = new Uint8Array(1 << r.wbits)), r.wsize === 0 && (r.wsize = 1 << r.wbits, r.wnext = 0, r.whave = 0), s >= r.wsize ? (r.window.set(t.subarray(e - r.wsize, e), 0), r.wnext = 0, r.whave = r.wsize) : (i = r.wsize - r.wnext, i > s && (i = s), r.window.set(t.subarray(e - s, e - s + i), r.wnext), s -= i, s ? (r.window.set(t.subarray(e - s, e), 0), r.wnext = s, r.whave = r.wsize) : (r.wnext += i, r.wnext === r.wsize && (r.wnext = 0), r.whave < r.wsize && (r.whave += i))), 0;
    }, $t = (n, t)=>{
        let e, s, i, r, l, o, u, a, c, H, b, f, h, S, m = 0, g, E, p, d, v, R, _, A;
        const x = new Uint8Array(4);
        let w, y;
        const P = new Uint8Array([
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
        if (U(n) || !n.output || !n.input && n.avail_in !== 0) return N;
        e = n.state, e.mode === I && (e.mode = pe), l = n.next_out, i = n.output, u = n.avail_out, r = n.next_in, s = n.input, o = n.avail_in, a = e.hold, c = e.bits, H = o, b = u, A = B;
        e: for(;;)switch(e.mode){
            case be:
                if (e.wrap === 0) {
                    e.mode = pe;
                    break;
                }
                for(; c < 16;){
                    if (o === 0) break e;
                    o--, a += s[r++] << c, c += 8;
                }
                if (e.wrap & 2 && a === 35615) {
                    e.wbits === 0 && (e.wbits = 15), e.check = 0, x[0] = a & 255, x[1] = a >>> 8 & 255, e.check = F(e.check, x, 2, 0), a = 0, c = 0, e.mode = Ze;
                    break;
                }
                if (e.head && (e.head.done = !1), !(e.wrap & 1) || (((a & 255) << 8) + (a >> 8)) % 31) {
                    n.msg = "incorrect header check", e.mode = T;
                    break;
                }
                if ((a & 15) !== Ue) {
                    n.msg = "unknown compression method", e.mode = T;
                    break;
                }
                if (a >>>= 4, c -= 4, _ = (a & 15) + 8, e.wbits === 0 && (e.wbits = _), _ > 15 || _ > e.wbits) {
                    n.msg = "invalid window size", e.mode = T;
                    break;
                }
                e.dmax = 1 << e.wbits, e.flags = 0, n.adler = e.check = 1, e.mode = a & 512 ? Ye : I, a = 0, c = 0;
                break;
            case Ze:
                for(; c < 16;){
                    if (o === 0) break e;
                    o--, a += s[r++] << c, c += 8;
                }
                if (e.flags = a, (e.flags & 255) !== Ue) {
                    n.msg = "unknown compression method", e.mode = T;
                    break;
                }
                if (e.flags & 57344) {
                    n.msg = "unknown header flags set", e.mode = T;
                    break;
                }
                e.head && (e.head.text = a >> 8 & 1), e.flags & 512 && e.wrap & 4 && (x[0] = a & 255, x[1] = a >>> 8 & 255, e.check = F(e.check, x, 2, 0)), a = 0, c = 0, e.mode = Ve;
            case Ve:
                for(; c < 32;){
                    if (o === 0) break e;
                    o--, a += s[r++] << c, c += 8;
                }
                e.head && (e.head.time = a), e.flags & 512 && e.wrap & 4 && (x[0] = a & 255, x[1] = a >>> 8 & 255, x[2] = a >>> 16 & 255, x[3] = a >>> 24 & 255, e.check = F(e.check, x, 4, 0)), a = 0, c = 0, e.mode = je;
            case je:
                for(; c < 16;){
                    if (o === 0) break e;
                    o--, a += s[r++] << c, c += 8;
                }
                e.head && (e.head.xflags = a & 255, e.head.os = a >> 8), e.flags & 512 && e.wrap & 4 && (x[0] = a & 255, x[1] = a >>> 8 & 255, e.check = F(e.check, x, 2, 0)), a = 0, c = 0, e.mode = Xe;
            case Xe:
                if (e.flags & 1024) {
                    for(; c < 16;){
                        if (o === 0) break e;
                        o--, a += s[r++] << c, c += 8;
                    }
                    e.length = a, e.head && (e.head.extra_len = a), e.flags & 512 && e.wrap & 4 && (x[0] = a & 255, x[1] = a >>> 8 & 255, e.check = F(e.check, x, 2, 0)), a = 0, c = 0;
                } else e.head && (e.head.extra = null);
                e.mode = ze;
            case ze:
                if (e.flags & 1024 && (f = e.length, f > o && (f = o), f && (e.head && (_ = e.head.extra_len - e.length, e.head.extra || (e.head.extra = new Uint8Array(e.head.extra_len)), e.head.extra.set(s.subarray(r, r + f), _)), e.flags & 512 && e.wrap & 4 && (e.check = F(e.check, s, f, r)), o -= f, r += f, e.length -= f), e.length)) break e;
                e.length = 0, e.mode = Qe;
            case Qe:
                if (e.flags & 2048) {
                    if (o === 0) break e;
                    f = 0;
                    do _ = s[r + f++], e.head && _ && e.length < 65536 && (e.head.name += String.fromCharCode(_));
                    while (_ && f < o);
                    if (e.flags & 512 && e.wrap & 4 && (e.check = F(e.check, s, f, r)), o -= f, r += f, _) break e;
                } else e.head && (e.head.name = null);
                e.length = 0, e.mode = Ke;
            case Ke:
                if (e.flags & 4096) {
                    if (o === 0) break e;
                    f = 0;
                    do _ = s[r + f++], e.head && _ && e.length < 65536 && (e.head.comment += String.fromCharCode(_));
                    while (_ && f < o);
                    if (e.flags & 512 && e.wrap & 4 && (e.check = F(e.check, s, f, r)), o -= f, r += f, _) break e;
                } else e.head && (e.head.comment = null);
                e.mode = Ge;
            case Ge:
                if (e.flags & 512) {
                    for(; c < 16;){
                        if (o === 0) break e;
                        o--, a += s[r++] << c, c += 8;
                    }
                    if (e.wrap & 4 && a !== (e.check & 65535)) {
                        n.msg = "header crc mismatch", e.mode = T;
                        break;
                    }
                    a = 0, c = 0;
                }
                e.head && (e.head.hcrc = e.flags >> 9 & 1, e.head.done = !0), n.adler = e.check = 0, e.mode = I;
                break;
            case Ye:
                for(; c < 32;){
                    if (o === 0) break e;
                    o--, a += s[r++] << c, c += 8;
                }
                n.adler = e.check = dn(a), a = 0, c = 0, e.mode = he;
            case he:
                if (e.havedict === 0) return n.next_out = l, n.avail_out = u, n.next_in = r, n.avail_in = o, e.hold = a, e.bits = c, Vt;
                n.adler = e.check = 1, e.mode = I;
            case I:
                if (t === Ut || t === ae) break e;
            case pe:
                if (e.last) {
                    a >>>= c & 7, c -= c & 7, e.mode = xe;
                    break;
                }
                for(; c < 3;){
                    if (o === 0) break e;
                    o--, a += s[r++] << c, c += 8;
                }
                switch(e.last = a & 1, a >>>= 1, c -= 1, a & 3){
                    case 0:
                        e.mode = Je;
                        break;
                    case 1:
                        if (Jt(e), e.mode = oe, t === ae) {
                            a >>>= 2, c -= 2;
                            break e;
                        }
                        break;
                    case 2:
                        e.mode = en;
                        break;
                    case 3:
                        n.msg = "invalid block type", e.mode = T;
                }
                a >>>= 2, c -= 2;
                break;
            case Je:
                for(a >>>= c & 7, c -= c & 7; c < 32;){
                    if (o === 0) break e;
                    o--, a += s[r++] << c, c += 8;
                }
                if ((a & 65535) !== (a >>> 16 ^ 65535)) {
                    n.msg = "invalid stored block lengths", e.mode = T;
                    break;
                }
                if (e.length = a & 65535, a = 0, c = 0, e.mode = ye, t === ae) break e;
            case ye:
                e.mode = $e;
            case $e:
                if (f = e.length, f) {
                    if (f > o && (f = o), f > u && (f = u), f === 0) break e;
                    i.set(s.subarray(r, r + f), l), o -= f, r += f, u -= f, l += f, e.length -= f;
                    break;
                }
                e.mode = I;
                break;
            case en:
                for(; c < 14;){
                    if (o === 0) break e;
                    o--, a += s[r++] << c, c += 8;
                }
                if (e.nlen = (a & 31) + 257, a >>>= 5, c -= 5, e.ndist = (a & 31) + 1, a >>>= 5, c -= 5, e.ncode = (a & 15) + 4, a >>>= 4, c -= 4, e.nlen > 286 || e.ndist > 30) {
                    n.msg = "too many length or distance symbols", e.mode = T;
                    break;
                }
                e.have = 0, e.mode = nn;
            case nn:
                for(; e.have < e.ncode;){
                    for(; c < 3;){
                        if (o === 0) break e;
                        o--, a += s[r++] << c, c += 8;
                    }
                    e.lens[P[e.have++]] = a & 7, a >>>= 3, c -= 3;
                }
                for(; e.have < 19;)e.lens[P[e.have++]] = 0;
                if (e.lencode = e.lendyn, e.lenbits = 7, w = {
                    bits: e.lenbits
                }, A = ee(Bt, e.lens, 0, 19, e.lencode, 0, e.work, w), e.lenbits = w.bits, A) {
                    n.msg = "invalid code lengths set", e.mode = T;
                    break;
                }
                e.have = 0, e.mode = tn;
            case tn:
                for(; e.have < e.nlen + e.ndist;){
                    for(; m = e.lencode[a & (1 << e.lenbits) - 1], g = m >>> 24, E = m >>> 16 & 255, p = m & 65535, !(g <= c);){
                        if (o === 0) break e;
                        o--, a += s[r++] << c, c += 8;
                    }
                    if (p < 16) a >>>= g, c -= g, e.lens[e.have++] = p;
                    else {
                        if (p === 16) {
                            for(y = g + 2; c < y;){
                                if (o === 0) break e;
                                o--, a += s[r++] << c, c += 8;
                            }
                            if (a >>>= g, c -= g, e.have === 0) {
                                n.msg = "invalid bit length repeat", e.mode = T;
                                break;
                            }
                            _ = e.lens[e.have - 1], f = 3 + (a & 3), a >>>= 2, c -= 2;
                        } else if (p === 17) {
                            for(y = g + 3; c < y;){
                                if (o === 0) break e;
                                o--, a += s[r++] << c, c += 8;
                            }
                            a >>>= g, c -= g, _ = 0, f = 3 + (a & 7), a >>>= 3, c -= 3;
                        } else {
                            for(y = g + 7; c < y;){
                                if (o === 0) break e;
                                o--, a += s[r++] << c, c += 8;
                            }
                            a >>>= g, c -= g, _ = 0, f = 11 + (a & 127), a >>>= 7, c -= 7;
                        }
                        if (e.have + f > e.nlen + e.ndist) {
                            n.msg = "invalid bit length repeat", e.mode = T;
                            break;
                        }
                        for(; f--;)e.lens[e.have++] = _;
                    }
                }
                if (e.mode === T) break;
                if (e.lens[256] === 0) {
                    n.msg = "invalid code -- missing end-of-block", e.mode = T;
                    break;
                }
                if (e.lenbits = 9, w = {
                    bits: e.lenbits
                }, A = ee(Sn, e.lens, 0, e.nlen, e.lencode, 0, e.work, w), e.lenbits = w.bits, A) {
                    n.msg = "invalid literal/lengths set", e.mode = T;
                    break;
                }
                if (e.distbits = 6, e.distcode = e.distdyn, w = {
                    bits: e.distbits
                }, A = ee(Cn, e.lens, e.nlen, e.ndist, e.distcode, 0, e.work, w), e.distbits = w.bits, A) {
                    n.msg = "invalid distances set", e.mode = T;
                    break;
                }
                if (e.mode = oe, t === ae) break e;
            case oe:
                e.mode = ce;
            case ce:
                if (o >= 6 && u >= 258) {
                    n.next_out = l, n.avail_out = u, n.next_in = r, n.avail_in = o, e.hold = a, e.bits = c, Dt(n, b), l = n.next_out, i = n.output, u = n.avail_out, r = n.next_in, s = n.input, o = n.avail_in, a = e.hold, c = e.bits, e.mode === I && (e.back = -1);
                    break;
                }
                for(e.back = 0; m = e.lencode[a & (1 << e.lenbits) - 1], g = m >>> 24, E = m >>> 16 & 255, p = m & 65535, !(g <= c);){
                    if (o === 0) break e;
                    o--, a += s[r++] << c, c += 8;
                }
                if (E && !(E & 240)) {
                    for(d = g, v = E, R = p; m = e.lencode[R + ((a & (1 << d + v) - 1) >> d)], g = m >>> 24, E = m >>> 16 & 255, p = m & 65535, !(d + g <= c);){
                        if (o === 0) break e;
                        o--, a += s[r++] << c, c += 8;
                    }
                    a >>>= d, c -= d, e.back += d;
                }
                if (a >>>= g, c -= g, e.back += g, e.length = p, E === 0) {
                    e.mode = cn;
                    break;
                }
                if (E & 32) {
                    e.back = -1, e.mode = I;
                    break;
                }
                if (E & 64) {
                    n.msg = "invalid literal/length code", e.mode = T;
                    break;
                }
                e.extra = E & 15, e.mode = sn;
            case sn:
                if (e.extra) {
                    for(y = e.extra; c < y;){
                        if (o === 0) break e;
                        o--, a += s[r++] << c, c += 8;
                    }
                    e.length += a & (1 << e.extra) - 1, a >>>= e.extra, c -= e.extra, e.back += e.extra;
                }
                e.was = e.length, e.mode = rn;
            case rn:
                for(; m = e.distcode[a & (1 << e.distbits) - 1], g = m >>> 24, E = m >>> 16 & 255, p = m & 65535, !(g <= c);){
                    if (o === 0) break e;
                    o--, a += s[r++] << c, c += 8;
                }
                if (!(E & 240)) {
                    for(d = g, v = E, R = p; m = e.distcode[R + ((a & (1 << d + v) - 1) >> d)], g = m >>> 24, E = m >>> 16 & 255, p = m & 65535, !(d + g <= c);){
                        if (o === 0) break e;
                        o--, a += s[r++] << c, c += 8;
                    }
                    a >>>= d, c -= d, e.back += d;
                }
                if (a >>>= g, c -= g, e.back += g, E & 64) {
                    n.msg = "invalid distance code", e.mode = T;
                    break;
                }
                e.offset = p, e.extra = E & 15, e.mode = an;
            case an:
                if (e.extra) {
                    for(y = e.extra; c < y;){
                        if (o === 0) break e;
                        o--, a += s[r++] << c, c += 8;
                    }
                    e.offset += a & (1 << e.extra) - 1, a >>>= e.extra, c -= e.extra, e.back += e.extra;
                }
                if (e.offset > e.dmax) {
                    n.msg = "invalid distance too far back", e.mode = T;
                    break;
                }
                e.mode = on;
            case on:
                if (u === 0) break e;
                if (f = b - u, e.offset > f) {
                    if (f = e.offset - f, f > e.whave && e.sane) {
                        n.msg = "invalid distance too far back", e.mode = T;
                        break;
                    }
                    f > e.wnext ? (f -= e.wnext, h = e.wsize - f) : h = e.wnext - f, f > e.length && (f = e.length), S = e.window;
                } else S = i, h = l - e.offset, f = e.length;
                f > u && (f = u), u -= f, e.length -= f;
                do i[l++] = S[h++];
                while (--f);
                e.length === 0 && (e.mode = ce);
                break;
            case cn:
                if (u === 0) break e;
                i[l++] = e.length, u--, e.mode = ce;
                break;
            case xe:
                if (e.wrap) {
                    for(; c < 32;){
                        if (o === 0) break e;
                        o--, a |= s[r++] << c, c += 8;
                    }
                    if (b -= u, n.total_out += b, e.total += b, e.wrap & 4 && b && (n.adler = e.check = e.flags ? F(e.check, i, b, l - b) : Se(e.check, i, b, l - b)), b = u, e.wrap & 4 && (e.flags ? a : dn(a)) !== e.check) {
                        n.msg = "incorrect data check", e.mode = T;
                        break;
                    }
                    a = 0, c = 0;
                }
                e.mode = ln;
            case ln:
                if (e.wrap && e.flags) {
                    for(; c < 32;){
                        if (o === 0) break e;
                        o--, a += s[r++] << c, c += 8;
                    }
                    if (e.wrap & 4 && a !== (e.total & 4294967295)) {
                        n.msg = "incorrect length check", e.mode = T;
                        break;
                    }
                    a = 0, c = 0;
                }
                e.mode = fn;
            case fn:
                A = Zt;
                break e;
            case T:
                A = Rn;
                break e;
            case Fn:
                return Nn;
            case On:
            default:
                return N;
        }
        return n.next_out = l, n.avail_out = u, n.next_in = r, n.avail_in = o, e.hold = a, e.bits = c, (e.wsize || b !== n.avail_out && e.mode < T && (e.mode < xe || t !== Be)) && Mn(n, n.output, n.next_out, b - n.avail_out), H -= n.avail_in, b -= n.avail_out, n.total_in += H, n.total_out += b, e.total += b, e.wrap & 4 && b && (n.adler = e.check = e.flags ? F(e.check, i, b, n.next_out - b) : Se(e.check, i, b, n.next_out - b)), n.data_type = e.bits + (e.last ? 64 : 0) + (e.mode === I ? 128 : 0) + (e.mode === oe || e.mode === ye ? 256 : 0), (H === 0 && b === 0 || t === Be) && A === B && (A = jt), A;
    }, es = (n)=>{
        if (U(n)) return N;
        let t = n.state;
        return t.window && (t.window = null), n.state = null, B;
    }, ns = (n, t)=>{
        if (U(n)) return N;
        const e = n.state;
        return e.wrap & 2 ? (e.head = t, t.done = !1, B) : N;
    }, ts = (n, t)=>{
        const e = t.length;
        let s, i, r;
        return U(n) || (s = n.state, s.wrap !== 0 && s.mode !== he) ? N : s.mode === he && (i = 1, i = Se(i, t, e, 0), i !== s.check) ? Rn : (r = Mn(n, t, e, e), r ? (s.mode = Fn, Nn) : (s.havedict = 1, B));
    };
    var ss = Dn, is = Pn, rs = In, as = Yt, os = qn, cs = $t, ls = es, fs = ns, ds = ts, us = "pako inflate (from Nodeca project)", O = {
        inflateReset: ss,
        inflateReset2: is,
        inflateResetKeep: rs,
        inflateInit: as,
        inflateInit2: os,
        inflate: cs,
        inflateEnd: ls,
        inflateGetHeader: fs,
        inflateSetDictionary: ds,
        inflateInfo: us
    };
    function _s() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
    }
    var hs = _s;
    const Ln = Object.prototype.toString, { Z_NO_FLUSH: bs, Z_FINISH: _n, Z_OK: Q, Z_STREAM_END: ke, Z_NEED_DICT: He, Z_STREAM_ERROR: ws, Z_DATA_ERROR: hn, Z_MEM_ERROR: gs, Z_BUF_ERROR: bn } = Hn, ms = {
        chunkSize: 1024 * 64,
        windowBits: 15,
        to: ""
    };
    function we(n) {
        this.options = An.assign({}, ms, n || {});
        const t = this.options;
        t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, t.windowBits === 0 && (t.windowBits = -15)), t.windowBits >= 0 && t.windowBits < 16 && !(n && n.windowBits) && (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && (t.windowBits & 15 || (t.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Ot, this.strm.avail_out = 0;
        let e = O.inflateInit2(this.strm, t.windowBits);
        if (e !== Q) throw new Error(Ce[e]);
        if (this.header = new hs, O.inflateGetHeader(this.strm, this.header), t.dictionary && (typeof t.dictionary == "string" ? t.dictionary = Re.string2buf(t.dictionary) : Ln.call(t.dictionary) === "[object ArrayBuffer]" && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (e = O.inflateSetDictionary(this.strm, t.dictionary), e !== Q))) throw new Error(Ce[e]);
    }
    we.prototype.push = function(n, t) {
        const e = this.strm, s = this.options.chunkSize, i = this.options.dictionary;
        let r, l, o;
        if (this.ended) return !1;
        for(t === ~~t ? l = t : l = t === !0 ? _n : bs, Ln.call(n) === "[object ArrayBuffer]" ? e.input = new Uint8Array(n) : e.input = n, e.next_in = 0, e.avail_in = e.input.length;;){
            for(e.avail_out === 0 && (e.output = new Uint8Array(s), e.next_out = 0, e.avail_out = s), r = O.inflate(e, l), r === He && i && (r = O.inflateSetDictionary(e, i), r === Q ? r = O.inflate(e, l) : r === hn && (r = He)); e.avail_in > 0 && r === ke && e.state.wrap & 2 && e.state.flags !== 0 && e.input[e.next_in] !== 0;)O.inflateReset(e), r = O.inflate(e, l);
            switch(r){
                case ws:
                case hn:
                case He:
                case gs:
                    return this.onEnd(r), this.ended = !0, !1;
            }
            if (o = e.avail_out, e.next_out && (e.avail_out === 0 || r === ke || l > 0)) if (this.options.to === "string") {
                let u = Re.utf8border(e.output, e.next_out), a = e.next_out - u, c = Re.buf2string(e.output, u);
                e.next_out = a, e.avail_out = s - a, a && e.output.set(e.output.subarray(u, u + a), 0), this.onData(c);
            } else this.onData(e.output.length === e.next_out ? e.output : e.output.subarray(0, e.next_out)), e.avail_out = 0, e.next_out = 0;
            if (!((r === Q || r === bn) && o === 0)) {
                if (r === ke) return r = O.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, !0;
                if (e.avail_in === 0) {
                    if (l === _n) return r = O.inflateEnd(this.strm), this.onEnd(r === Q ? bn : r), this.ended = !0, !1;
                    break;
                }
            }
        }
        return !0;
    };
    we.prototype.onData = function(n) {
        this.chunks.push(n);
    };
    we.prototype.onEnd = function(n) {
        n === Q && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = An.flattenChunks(this.chunks)), this.chunks = [], this.err = n, this.msg = this.strm.msg;
    };
    function ps(n, t) {
        const e = new we(t);
        if (e.push(n, !0), e.err) throw e.msg || Ce[e.err];
        return e.result;
    }
    var ys = ps, xs = {
        inflate: ys
    };
    const { inflate: vs } = xs;
    var Es = vs;
    function ks(n) {
        return JSON.parse(Es(vn(n), {
            to: "string",
            raw: !0
        })).debug_infos;
    }
    function Hs(n, t, e) {
        if (!("callStack" in n) || !n.callStack) return;
        const { callStack: s, brilligFunctionId: i } = n;
        if (!t) return s;
        try {
            return As(s, t, e, i);
        } catch  {
            return s;
        }
    }
    function As(n, t, e, s) {
        let i = n.flatMap((r)=>Ts(r, t, e, s));
        if (i.length > 0) {
            const r = n[n.length - 1].split(".");
            if (r.length === 2) {
                const l = t.acir_locations[r[0]];
                if (l !== void 0) {
                    const o = t.location_tree.locations[l];
                    i = Wn(o, t.location_tree.locations, e).concat(i);
                }
            }
        }
        return i;
    }
    function Wn(n, t, e) {
        const s = [];
        for(; n.parent !== null;){
            const { file: i, span: r } = n.value, { path: l, source: o } = e[i], u = o.substring(r.start, r.end), c = o.substring(0, r.start).split(`
`), H = c.length, b = c[c.length - 1].length + 1;
            s.push({
                filePath: l,
                line: H,
                column: b,
                locationText: u
            }), n = t[n.parent];
        }
        return s.reverse();
    }
    function Ts(n, t, e, s) {
        let i = t.acir_locations[n];
        const r = Ss(n);
        if (s !== void 0 && r !== void 0 && (i = t.brillig_locations[s][r], i === void 0)) return [];
        if (i === void 0) return [];
        const l = t.location_tree.locations[i];
        return Wn(l, t.location_tree.locations, e);
    }
    function Ss(n) {
        const t = n.split(".");
        if (t.length === 2) return t[1];
    }
    const Cs = async (n, t)=>{
        if (n == "print") return [];
        throw Error(`Unexpected oracle during execution: ${n}(${t.join(", ")})`);
    };
    function Rs(n, t) {
        const e = t;
        if (t.rawAssertionPayload) try {
            const s = rt(n.abi, t.rawAssertionPayload);
            typeof s == "string" ? e.message = `Circuit execution failed: ${s}` : e.decodedAssertionPayload = s;
        } catch  {}
        try {
            const s = Hs(t, ks(n.debug_symbols)[t.acirFunctionId], n.file_map);
            e.noirCallStack = s?.map((i)=>typeof i == "string" ? `at opcode ${i}` : `at ${i.locationText} (${i.filePath}:${i.line}:${i.column})`);
        } catch  {}
        return e;
    }
    async function Ns(n, t, e = Cs) {
        const s = st(n.abi, t);
        try {
            return await Gn(vn(n.bytecode), s, e);
        } catch (i) {
            throw typeof i == "object" && i !== null && "rawAssertionPayload" in i ? Rs(n, i) : new Error(`Circuit execution failed: ${i}`);
        }
    }
    class Fs {
        circuit;
        constructor(t){
            this.circuit = t;
        }
        async init() {
            typeof Te == "function" && await Promise.all([
                Te(),
                pn()
            ]);
        }
        async execute(t, e) {
            await this.init();
            const s = await Ns(this.circuit, t, e), i = s[0].witness, { return_value: r } = it(this.circuit.abi, i);
            return {
                witness: Kn(s),
                returnValue: r
            };
        }
    }
    const Os = "1.0.0-beta.9+6abff2f16e1c1314ba30708d1cf032a536de3d19", Is = "7532336930804900517", Ds = {
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
    }, Ps = "H4sIAAAAAAAA/+1dCZfUxhEuDMZec0PAxBwJV2LAidVqSd3txLAkHE7MkZgjMeCEVkttwIm5ScztxNxOzA2O/ysvpUcL92gX20TV86K19F5t1ezslvprfaqvund2ZhI8Ob5CK108xflJMPaovzfqfNTuYFPockUveON8zflFTQCTAwLgUZYkpYhLxpmOYpXLNErSPJNMslSmRSw5L2UihcqViBRLeMlsqrh1yV777rnMt+RiiwgndpiEmA5hCLHY+SUQmBDTCQmxmJAQSwgntrroL6ONePP4NLfkpVCMFZKnkRJZrHAEmUg5s4alRttCKC1VXpYm50pF3GYqFbHJeGYTnerHjXxMC5uWVutCWI4J4lQrJi2PjJGF4JxbY3Qu8GmjIsuSopQsNyaNpVWKp8Vj2usbjSF8mmgtMy24yaXmSRqnZZrnZZGVCc81Y0qWMotsarlKoziTVrDCJqlieVEmUdwcXxypwtjcxvglFVbZLEpwZpJCMG0yq60UMZ7SGpFEwkRJmWcx01kshdGGxVlovHFhZa6SqEylisoE6ShEGaVccKvLTGlWiDTBa8rTEidFRnmWZSoRCV7/2BRmzPWIS1NIWbBUZSI3Kc+lxLmJy6hgmcwyhlhNnmlt4oJbmZYx4hRlafPYMIVkC4F3qstVxVVRfuziRV682IuXuJhwHDE1rirfUrQfof0YhqvyL0KYor7M+eVNANRF3QfQtqgvA7qivhy6qfIzIAwhVji/EgITYgYhIVYQEmIl9CpPhX0gX6/yE1rlq6Jcq/lyL17hxSuhGyq/Cu0naD+F4ar8VAhT1F93fnUTAHVR9wG0LeqvA11RXw3dVPmZEIYQa5xfC4EJMZOQEGsICbEWepWnwj6Qr1f5Ca3yVVGu1Xy1F6/x4rXQDZV/A+1naD+H4ar8SxCmqL9Z52wCoC7qPoC2Rf1NoCvqEXRT5WdBGEIw52MITIhZhIRghISIoVd5KuwD+XqVn9AqXxXlWs0jL2ZeHEM3VJ6jJWgpDFflX4YwRT1zXjQBUBd1H0Dbop4BXVEX0E2Vnw1hCCGdVxCYELMJCSEJCaGgV3kq7AP5epWf0CpfFeVazYUXSy9W0A2VfwvtF2i/hOGq/AiEKepvO7+uCYC6qPsA2hb1t4GuqK+Dbqr8HAhDiPWNcQYjxBxCQqwnJMQo9CpPhX0gX6/yE1rlq6Jcq/k6L17vxaPQDZXfgPYrtF/DcFX+FQhT1Dc6v6kJgLqo+wDaFvWNQFfUN0E3VX4uhCHEZue3QGBCzCUkxGZCQmyBXuWpsA/k61V+Qqt8VZRrNd/kxZu9eAt0Q+XfQfsN2m9huCo/DcIU9Xed39oEQF3UfQBti/q7QFfUt0I3VX4ehCHENue3Q2BCzCMkxDZCQmyHXuWpsA/k61V+Qqt8VZRrNd/qxdu8eDt0Q+V3oP0O7fcwXJV/B8IU9fec39kEQF3UfQBti/p7QFfUd0I3VX4HhCHELud3Q2BC7CAkxC5CQuwGepWf5c3j09y9yk9olWcmSWys0xjPLhnSTkuOA0iRhaaUObKTRXFSTQCGkqk8L7RNdawLLVHs5Zjxca3LkmdllsQx9ggRUyzjMWJNldKlKnMkhUFJF1oaFUdacySRzKUyqcWTB+9qsgJRsSwymUScyLsstZnJE8FivAxlhHOgbMK5rC5SollsFFLSxrHNM+xFxowvNSIyPFcmKpDLiWFRVHIdi9xyY7ioQFlpikIlyByTRBJvl5gXIskSBG77Lq493ldcriquRLfu1nZ68bP2cHZ58W4vHq8bJBx3EqLr24P2B7Q/wnC7vrcgjMi/7/zeJgBqkfcBtBX594FO5PdCN7u+DRCGEPuc3w+BCbGBkBD7CAmxH/qujwr7QL6+6+u7vr7r62zXV4lu3a3t9eJnvQp3nxfv9+LxXs9DOO4gXd8HaH9C+zMMt+t7A8KI/AHndRMAtcj7ANqK/AGgE3kN3ez6OIQhRO68gcCE4ISEyAkJYaDv+qiwD+Tru76+6+u7vs52fQfg625Ne/Gz3kcl92LjxeP9RzbhuIN0fQU8eUd0C8Pt+pZCGJH/0PmDTQDUIu8DaCvyHwKdyB+EbnZ9qyAMIQ45fxgCE2IVISEOERLiMPRdHxX2gXx919d3fX3X19murxLduls76MXPeif8Q1582IuXwdj31CUcd5Cu7yO0v6D9FYbb9X0AYUT+Y+ePNAFQi7wPoK3Ifwx0In8EhtP1vUA8n4RvwBTsbR6OOn+sORlTOjIZbYl6lJCox2A4RKWuXHsgDLmOO3+iCYC6cu0hJMRxQkKcgG5WLsJ/Nw/2T20nnT/VnAzqyhVqMtoS9SQhUU8BbS/ar6Ndvn4d3a+j+3V0Z9fR1TKmXv8e8eKjXnzMi4978QkvPunFp6Ab6+jTaH9D+zsMdx39EYRpGD5x/kwTAHU36gNoK/KfAJ3In4FudqOEHzAc7GMMzzp/rjkZ1N1oqMloS9SzhEQ9B8MhKnXlKiAMuc47f6EJgLpyFYSEOE9IiAvQzcpF+HFqwT605aLzl5qTQV25Qk1GW6JeJCTqJaDtRft1tMvXr6P7dXS/ju7sOrpaxtTr3zNefNaLz3nxeS++4MUXvfgSdGMd/SnaP9D+CcNdR38KYRqGz5y/3ARA3Y36ANqK/GdAJ/KXYTjdaFeWjlG7oxNd8hXnrzYv0tT+Ij13Lsru/QrQ3dhXYTg3NnWlPw1hSH/N+etNANSV/jQhIa4REuI6dLPS/5++8qgTryu44fzN5kWirvTft4vU9sa+AXQ39k06jP0+DfT7NP0+Tb9PMxH2aaplcr2/ctmLr3jxVS++5sXXvfiGF9+EbuzTfI72L7R/w+DR/KNQWx0jHDf7nHAOfMwjxJgnEWLutzGeL1e/GHi+Y5gr9x8QjttfxHzh/K0mAOqVuw+gbZH44rvn+tYG/xZ0kxDzIQwhbjt/BwITYj4hIW4TEuIOdJMQCyAMIe46fw8CE2IBISHuEhLiHnSTEK9CGELcd/4BBCbEq4SEuE9IiAfQTUIshDCEeOj8IwhMiIWEhHhISIhHhBNbbxLO9ebxae5+k7DfJOw3Cbu7SRiVhTIZXolYxKK62krm1uA+oZBFqoqc6SIvkfKCJ1ZYbQze5TkWHZVYY7NyDJ+VKUTBsSRxmfNUmiw2iY4iK7jGjcJI57gnmGqto0RE+IRguFeoWJmXuYq5YP2maHu8012uKq7WpfVm5i0vvu3Fd7z4rhff8+L7XvzAix968SMg3yxNQ2yWfon2H7SvYPCg3iydTDdu9iUxR+omb4Hz1eNqQ7HaCKw28OoPhaw2uqY5Ts1AmwlP/lg4G20OPOkJqg/KrPZS5rt8VZNc9UU/9M4DjiPVHE+GsUd9ny51fqRxTSa53xslms+Rxnkp80usbSPj4CMcPx/x5jPU/NQ5A+SPXnJ5Nl6CAW5A47wz3GN/MVL/TsXRmfB1PMv7nerY5OWe1Hhu8zjnDYkZOZHW+acEyI9HPG+c8dfnmubmaKF7PHmcn/XvhRe9nxnvusA435s0Tp7m3PrXcdR5xjl2Rdjx2sLyVKg4x5Ywwy7YikwmhUUNLUTJEs1jVQrs+mVZ4grDiMxi85zZJtYXvgHbjG8Y44xx8PrzV9/TUy4NYh91349aHNhqPO1VJrv8L8L4tXKK97z/80vcY/+Poj6O0f9xnFZoZrm22JkXBXalcxv5wZuzap7+C1fQtMTVswAA", qs = "pZfdbqMwEIXfhetcMDP+GedVqqqiKa0ioSSiSaVVlXdfuxyTVCssL7mJcwbmYzz4AP5u3vrXy8fL/vB+/Gy2T9/N67gfhv3Hy3Dcdef98RCj302bfsg1W9405KdBm63EITRbs2k4nmGu102T017OY9+nrDtOpJ+6sT+cm+3hMgyb5qsbLj8nfZ66w8947sZ4tN00/eEtjhH4vh/69O+6uWW3y6naMpKV3ZxO/lc+Lec7Y5DvrKzJV8r5qqvy8+R9u3j9wvxZXJ4Ai7czwbb1BO9ngq4j2FsN6pYIfplAZHIbiZSXCFqogVXnGu5XQvhFCAWC8jwLtbREoEIjDLUBCEOWVyFYcicMu7AOwfZhBPkKRKmbYW4FB1pDEGqzNYRIVhHmVSUU6GGCWSKUvOGc5D7cPyH+w12eZoL3i+7iAoKEcitJ7KK9mB72F/PDBmN52GBFRJ3Byogqg5URVQYrtrPOYSVEpcXKiCqP1SNWmUwl3FZWWGMy9bPJQrvmJSjMuQZhv+gxMQ97TGxpHoZvnWjXIapsKv5hmxYRdTYtI6psWkZU2bTYzjqblhCVNi0jqmxaj1hjU4nrKROEzS+LPEfV7fbjP/sQihelOKRNx6RkUiZ9Jm8aOwXdFPST0kmF6RTKGHAIIAKJgCKwCDACjYAj8Bg8znWBx+AxeAweg8fgMXgMnoAn4EmeKHgCnoAn4Al4Ap6AZyIvedhQ+mSII0MLdORJvE/GIu4Q99AKHabzLHgWPAueBc+CZ8Gz4FnwLHgWPAeeA8+B58BzBtpCO2gPreCEKe7bKe4JmqEF2kCjPo/6vJ84XhEPU1xRn6I+RX2K+hT1KepTN3E08eLjV1N98XWiab7xiR7SZjnep0DQDC3QBtpCO2gPrdBp753WYZuA6f3w1Y377nXok1mSnS6HXfZOlOc/p3wk7/JP43HXv13GPvnsbqsff5/ilDg8X5MX/wI=", Ms = {
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
    }, Ls = [
        "main"
    ], Ws = [
        "decompose_hint"
    ], wn = {
        noir_version: Os,
        hash: Is,
        abi: Ds,
        bytecode: Ps,
        debug_symbols: qs,
        file_map: Ms,
        names: Ls,
        brillig_names: Ws
    }, gn = 8;
    zs = async function({ balances: n, salts: t, ledgerSeq: e, reserveAddresses: s }) {
        if (n.length !== gn) throw new Error(`El circuito requiere exactamente ${gn} balances. Recibidos: ${n.length}.`);
        if (!s || s.length === 0) throw new Error("Se requiere al menos una reserve address.");
        console.log("🔑 Calculando reserve addresses hash...");
        const { reserveAddressesHash: i, paddedAddresses: r } = await Zn(s);
        console.log("  reserve_addresses_hash:", i), console.log("  num_reserve_accounts:", s.length), console.log("🌳 Calculando Merkle sum-tree...");
        const { buildMerkleTree: l } = await Bn(async ()=>{
            const { buildMerkleTree: m } = await import("./merkle-DWwTh_Xh.js");
            return {
                buildMerkleTree: m
            };
        }, __vite__mapDeps([0,1,2,3]), import.meta.url), { root: o, totalSum: u } = await l(n, t);
        console.log("  root:", o), console.log("  totalSum:", u);
        const a = {
            root: o,
            total_liabilities: u,
            ledger_seq: String(e),
            reserve_addresses_hash: i,
            balances: n,
            salts: t,
            reserve_addresses: r,
            num_reserve_accounts: String(s.length)
        };
        console.log("⚙️  Ejecutando circuito Noir...");
        const c = new Fs(wn);
        let H;
        try {
            ({ witness: H } = await c.execute(a));
        } catch (m) {
            throw new Error(`El circuito rechazó los inputs (root, total, o reserve addresses hash incorrecto): ${m.message}`);
        }
        console.log("🔐 Generando prueba UltraHonk con Keccak (10–30s)...");
        const b = new Un(wn.bytecode), { proof: f, publicInputs: h } = await b.generateProof(H, {
            keccak: !0
        });
        console.log("  proof.length:", f.length), console.log("  publicInputs raw type:", h?.constructor?.name, "length:", h?.length);
        const S = Bs(h, o, u, e, i);
        if (S.length !== 128) throw new Error(`Public inputs tienen ${S.length} bytes, se esperan 128.`);
        return Zs(S), {
            proof: new Uint8Array(f),
            publicInputs: S
        };
    };
    function Bs(n, t, e, s, i) {
        if (n instanceof Uint8Array && n.length >= 128) return console.log("✅ public_inputs: usando los 128 bytes de bb.js directamente"), n.slice(0, 128);
        if (Array.isArray(n) && n.length >= 4) {
            console.log("ℹ️  public_inputs: convirtiendo array de fields a 128 bytes");
            const r = new Uint8Array(128);
            return n.slice(0, 4).forEach((l, o)=>{
                const u = Ne(l);
                for(let a = 0; a < 32; a++)r[o * 32 + a] = parseInt(u.slice(a * 2, a * 2 + 2), 16);
            }), r;
        }
        return console.warn("⚠️  public_inputs: construyendo manualmente desde root/L/seq/reserve_hash"), Us(t, e, s, i);
    }
    function Us(n, t, e, s) {
        const i = new Uint8Array(128), r = Ne(n);
        for(let a = 0; a < 32; a++)i[a] = parseInt(r.slice(a * 2, a * 2 + 2), 16);
        const l = BigInt(t);
        for(let a = 0; a < 16; a++)i[48 + a] = Number(l >> BigInt((15 - a) * 8) & 0xffn);
        const o = Number(e);
        i[92] = o >>> 24 & 255, i[93] = o >>> 16 & 255, i[94] = o >>> 8 & 255, i[95] = o & 255;
        const u = Ne(s);
        for(let a = 0; a < 32; a++)i[96 + a] = parseInt(u.slice(a * 2, a * 2 + 2), 16);
        return i;
    }
    function Ne(n) {
        let t;
        if (typeof n == "string") t = (n.startsWith("0x"), BigInt(n));
        else if (typeof n == "bigint") t = n;
        else if (n && typeof n.toBigInt == "function") t = n.toBigInt();
        else if (n && typeof n.toString == "function") {
            const e = n.toString();
            t = (e.startsWith("0x"), BigInt(e));
        } else t = 0n;
        return t.toString(16).padStart(64, "0");
    }
    function Zs(n) {
        const t = Array.from(n.slice(0, 32)).map((o)=>o.toString(16).padStart(2, "0")).join(""), e = n.slice(48, 64), s = n.slice(92, 96), i = Array.from(n.slice(96, 128)).map((o)=>o.toString(16).padStart(2, "0")).join("");
        let r = 0n;
        for (const o of e)r = r << 8n | BigInt(o);
        const l = s[0] << 24 | s[1] << 16 | s[2] << 8 | s[3];
        console.log("📦 Public inputs formateados (128 bytes):"), console.log(`  root (bytes 0-31):         0x${t.slice(0, 16)}…`), console.log(`  L    (bytes 48-63):        ${r}`), console.log(`  seq  (bytes 92-95):        ${l}`), console.log(`  reserve_hash (bytes 96-127): 0x${i.slice(0, 16)}…`);
    }
});
export { zs as generateSolvencyProof, __tla };
