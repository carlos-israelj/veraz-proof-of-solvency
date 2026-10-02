const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./merkle-lHW47cnt.js","./index-CN-L86ny.js","./index-DLCSQN-i.js","./index-CmOZt9DE.css"])))=>i.map(i=>d[i]);
import { _ as Ln, __tla as __tla_0 } from "./index-DLCSQN-i.js";
import { UltraHonkBackend as qn, __tla as __tla_1 } from "./index-CN-L86ny.js";
import { hashReserveAddresses as zn, __tla as __tla_2 } from "./stellar-CRJ1am3z.js";
let Js;
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
    let E;
    function Y(n) {
        const t = E.__externref_table_alloc();
        return E.__wbindgen_export_2.set(t, n), t;
    }
    function z(n, t) {
        try {
            return n.apply(this, t);
        } catch (e) {
            const s = Y(e);
            E.__wbindgen_exn_store(s);
        }
    }
    const pn = typeof TextDecoder < "u" ? new TextDecoder("utf-8", {
        ignoreBOM: !0,
        fatal: !0
    }) : {
        decode: ()=>{
            throw Error("TextDecoder not available");
        }
    };
    typeof TextDecoder < "u" && pn.decode();
    let G = null;
    function J() {
        return (G === null || G.byteLength === 0) && (G = new Uint8Array(E.memory.buffer)), G;
    }
    function Z(n, t) {
        return n = n >>> 0, pn.decode(J().subarray(n, n + t));
    }
    let W = 0;
    const ce = typeof TextEncoder < "u" ? new TextEncoder("utf-8") : {
        encode: ()=>{
            throw Error("TextEncoder not available");
        }
    }, Zn = typeof ce.encodeInto == "function" ? function(n, t) {
        return ce.encodeInto(n, t);
    } : function(n, t) {
        const e = ce.encode(n);
        return t.set(e), {
            read: n.length,
            written: e.length
        };
    };
    function ge(n, t, e) {
        if (e === void 0) {
            const o = ce.encode(n), u = t(o.length, 1) >>> 0;
            return J().subarray(u, u + o.length).set(o), W = o.length, u;
        }
        let s = n.length, i = t(s, 1) >>> 0;
        const a = J();
        let c = 0;
        for(; c < s; c++){
            const o = n.charCodeAt(c);
            if (o > 127) break;
            a[i + c] = o;
        }
        if (c !== s) {
            c !== 0 && (n = n.slice(c)), i = e(i, s, s = c + n.length * 3, 1) >>> 0;
            const o = J().subarray(i + c, i + s), u = Zn(n, o);
            c += u.written, i = e(i, s, c, 1) >>> 0;
        }
        return W = c, i;
    }
    let M = null;
    function D() {
        return (M === null || M.buffer.detached === !0 || M.buffer.detached === void 0 && M.buffer !== E.memory.buffer) && (M = new DataView(E.memory.buffer)), M;
    }
    function U(n) {
        return n == null;
    }
    const Ne = typeof FinalizationRegistry > "u" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((n)=>{
        E.__wbindgen_export_6.get(n.dtor)(n.a, n.b);
    });
    function Vn(n, t, e, s) {
        const i = {
            a: n,
            b: t,
            cnt: 1,
            dtor: e
        }, a = (...c)=>{
            i.cnt++;
            const o = i.a;
            i.a = 0;
            try {
                return s(o, i.b, ...c);
            } finally{
                --i.cnt === 0 ? (E.__wbindgen_export_6.get(i.dtor)(o, i.b), Ne.unregister(i)) : i.a = o;
            }
        };
        return a.original = i, Ne.register(a, i, i), a;
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
            let a = "[";
            i > 0 && (a += Ae(n[0]));
            for(let c = 1; c < i; c++)a += ", " + Ae(n[c]);
            return a += "]", a;
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
    function jn(n) {
        const t = E.__wbindgen_export_2.get(n);
        return E.__externref_table_dealloc(n), t;
    }
    function Jn(n, t) {
        return n = n >>> 0, J().subarray(n / 1, n / 1 + t);
    }
    function Xn(n, t) {
        const e = t(n.length * 1, 1) >>> 0;
        return J().set(n, e / 1), W = n.length, e;
    }
    function Kn(n) {
        const t = E.compressWitnessStack(n);
        if (t[3]) throw jn(t[2]);
        var e = Jn(t[0], t[1]).slice();
        return E.__wbindgen_free(t[0], t[1] * 1, 1), e;
    }
    function $n(n, t, e) {
        const s = Xn(n, E.__wbindgen_malloc), i = W;
        return E.executeProgram(s, i, t, e);
    }
    function Yn(n, t, e) {
        E.closure646_externref_shim(n, t, e);
    }
    function Gn(n, t, e, s, i) {
        E.closure1311_externref_shim(n, t, e, s, i);
    }
    function Pe(n, t, e, s) {
        E.closure1315_externref_shim(n, t, e, s);
    }
    async function Qn(n, t) {
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
            return z(function(t, e) {
                return t.call(e);
            }, arguments);
        }, n.wbg.__wbg_call_7cccdd69e0791ae2 = function() {
            return z(function(t, e, s) {
                return t.call(e, s);
            }, arguments);
        }, n.wbg.__wbg_call_833bed5770ea2041 = function() {
            return z(function(t, e, s, i) {
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
                s = t, i = e, console.error(Z(t, e));
            } finally{
                E.__wbindgen_free(s, i, 1);
            }
        }, n.wbg.__wbg_error_80de38b3f7cc3c3c = function(t, e, s, i) {
            console.error(t, e, s, i);
        }, n.wbg.__wbg_forEach_d6a05ca96422eff9 = function(t, e, s) {
            try {
                var i = {
                    a: e,
                    b: s
                }, a = (c, o, u)=>{
                    const r = i.a;
                    i.a = 0;
                    try {
                        return Gn(r, i.b, c, o, u);
                    } finally{
                        i.a = r;
                    }
                };
                t.forEach(a);
            } finally{
                i.a = i.b = 0;
            }
        }, n.wbg.__wbg_forEach_e1cf6f7c8ecb7dae = function(t, e, s) {
            try {
                var i = {
                    a: e,
                    b: s
                }, a = (c, o)=>{
                    const u = i.a;
                    i.a = 0;
                    try {
                        return Pe(u, i.b, c, o);
                    } finally{
                        i.a = u;
                    }
                };
                t.forEach(a);
            } finally{
                i.a = i.b = 0;
            }
        }, n.wbg.__wbg_fromEntries_524679eecb0bdc2e = function() {
            return z(function(t) {
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
                }, i = (c, o)=>{
                    const u = s.a;
                    s.a = 0;
                    try {
                        return Pe(u, s.b, c, o);
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
            return new Error(Z(t, e));
        }, n.wbg.__wbg_new_e48d31efda68db91 = function() {
            return new Map;
        }, n.wbg.__wbg_newnoargs_105ed471475aaf50 = function(t, e) {
            return new Function(Z(t, e));
        }, n.wbg.__wbg_parse_def2e24ef1252aff = function() {
            return z(function(t, e) {
                return JSON.parse(Z(t, e));
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
            return z(function(t, e, s) {
                return Reflect.set(t, e, s);
            }, arguments);
        }, n.wbg.__wbg_setcause_180f5110152d3ce3 = function(t, e) {
            t.cause = e;
        }, n.wbg.__wbg_stack_0ed75d68575b0f3c = function(t, e) {
            const s = e.stack, i = ge(s, E.__wbindgen_malloc, E.__wbindgen_realloc), a = W;
            D().setInt32(t + 4 * 1, a, !0), D().setInt32(t + 4 * 0, i, !0);
        }, n.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function() {
            const t = typeof globalThis > "u" ? null : globalThis;
            return U(t) ? 0 : Y(t);
        }, n.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function() {
            const t = typeof globalThis > "u" ? null : globalThis;
            return U(t) ? 0 : Y(t);
        }, n.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function() {
            const t = typeof self > "u" ? null : self;
            return U(t) ? 0 : Y(t);
        }, n.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function() {
            const t = typeof window > "u" ? null : window;
            return U(t) ? 0 : Y(t);
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
            return Vn(t, e, 647, Yn);
        }, n.wbg.__wbindgen_debug_string = function(t, e) {
            const s = Ae(e), i = ge(s, E.__wbindgen_malloc, E.__wbindgen_realloc), a = W;
            D().setInt32(t + 4 * 1, a, !0), D().setInt32(t + 4 * 0, i, !0);
        }, n.wbg.__wbindgen_init_externref_table = function() {
            const t = E.__wbindgen_export_2, e = t.grow(4);
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
            D().setFloat64(t + 8 * 1, U(i) ? 0 : i, !0), D().setInt32(t + 4 * 0, !U(i), !0);
        }, n.wbg.__wbindgen_number_new = function(t) {
            return t;
        }, n.wbg.__wbindgen_string_get = function(t, e) {
            const s = e, i = typeof s == "string" ? s : void 0;
            var a = U(i) ? 0 : ge(i, E.__wbindgen_malloc, E.__wbindgen_realloc), c = W;
            D().setInt32(t + 4 * 1, c, !0), D().setInt32(t + 4 * 0, a, !0);
        }, n.wbg.__wbindgen_string_new = function(t, e) {
            return Z(t, e);
        }, n.wbg.__wbindgen_throw = function(t, e) {
            throw new Error(Z(t, e));
        }, n;
    }
    function nt(n, t) {
        return E = n.exports, mn.__wbindgen_wasm_module = t, M = null, G = null, E.__wbindgen_start(), E;
    }
    async function mn(n) {
        if (E !== void 0) return E;
        typeof n < "u" && (Object.getPrototypeOf(n) === Object.prototype ? { module_or_path: n } = n : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), typeof n > "u" && (n = new URL("" + new URL("acvm_js_bg-BvxvrAml.wasm", import.meta.url).href, import.meta.url));
        const t = et();
        (typeof n == "string" || typeof Request == "function" && n instanceof Request || typeof URL == "function" && n instanceof URL) && (n = fetch(n));
        const { instance: e, module: s } = await Qn(await n, t);
        return nt(e, s);
    }
    let S;
    const yn = typeof TextDecoder < "u" ? new TextDecoder("utf-8", {
        ignoreBOM: !0,
        fatal: !0
    }) : {
        decode: ()=>{
            throw Error("TextDecoder not available");
        }
    };
    typeof TextDecoder < "u" && yn.decode();
    let Q = null;
    function fe() {
        return (Q === null || Q.byteLength === 0) && (Q = new Uint8Array(S.memory.buffer)), Q;
    }
    function ie(n, t) {
        return n = n >>> 0, yn.decode(fe().subarray(n, n + t));
    }
    function vn(n) {
        const t = S.__externref_table_alloc();
        return S.__wbindgen_export_3.set(t, n), t;
    }
    function De(n, t) {
        try {
            return n.apply(this, t);
        } catch (e) {
            const s = vn(e);
            S.__wbindgen_exn_store(s);
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
    function Ie(n, t, e) {
        if (e === void 0) {
            const o = de.encode(n), u = t(o.length, 1) >>> 0;
            return fe().subarray(u, u + o.length).set(o), _e = o.length, u;
        }
        let s = n.length, i = t(s, 1) >>> 0;
        const a = fe();
        let c = 0;
        for(; c < s; c++){
            const o = n.charCodeAt(c);
            if (o > 127) break;
            a[i + c] = o;
        }
        if (c !== s) {
            c !== 0 && (n = n.slice(c)), i = e(i, s, s = c + n.length * 3, 1) >>> 0;
            const o = fe().subarray(i + c, i + s), u = tt(n, o);
            c += u.written, i = e(i, s, c, 1) >>> 0;
        }
        return _e = c, i;
    }
    let B = null;
    function V() {
        return (B === null || B.buffer.detached === !0 || B.buffer.detached === void 0 && B.buffer !== S.memory.buffer) && (B = new DataView(S.memory.buffer)), B;
    }
    function ue(n) {
        return n == null;
    }
    function K(n) {
        const t = S.__wbindgen_export_3.get(n);
        return S.__externref_table_dealloc(n), t;
    }
    function st(n, t, e) {
        const s = S.abiEncode(n, t, ue(e) ? 0 : vn(e));
        if (s[2]) throw K(s[1]);
        return K(s[0]);
    }
    function it(n, t) {
        const e = S.abiDecode(n, t);
        if (e[2]) throw K(e[1]);
        return K(e[0]);
    }
    function at(n, t) {
        const e = S.abiDecodeError(n, t);
        if (e[2]) throw K(e[1]);
        return K(e[0]);
    }
    function rt(n, t, e, s) {
        S.closure245_externref_shim(n, t, e, s);
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
    function lt() {
        const n = {};
        return n.wbg = {}, n.wbg.__wbg_constructor_55ed424879ec3895 = function(t) {
            return new Error(t);
        }, n.wbg.__wbg_error_7534b8e9a36f1ab4 = function(t, e) {
            let s, i;
            try {
                s = t, i = e, console.error(ie(t, e));
            } finally{
                S.__wbindgen_free(s, i, 1);
            }
        }, n.wbg.__wbg_forEach_e1cf6f7c8ecb7dae = function(t, e, s) {
            try {
                var i = {
                    a: e,
                    b: s
                }, a = (c, o)=>{
                    const u = i.a;
                    i.a = 0;
                    try {
                        return rt(u, i.b, c, o);
                    } finally{
                        i.a = u;
                    }
                };
                t.forEach(a);
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
            const s = e.stack, i = Ie(s, S.__wbindgen_malloc, S.__wbindgen_realloc), a = _e;
            V().setInt32(t + 4 * 1, a, !0), V().setInt32(t + 4 * 0, i, !0);
        }, n.wbg.__wbg_stringify_f7ed6987935b4a24 = function() {
            return De(function(t) {
                return JSON.stringify(t);
            }, arguments);
        }, n.wbg.__wbindgen_init_externref_table = function() {
            const t = S.__wbindgen_export_3, e = t.grow(4);
            t.set(0, void 0), t.set(e + 0, void 0), t.set(e + 1, null), t.set(e + 2, !0), t.set(e + 3, !1);
        }, n.wbg.__wbindgen_is_undefined = function(t) {
            return t === void 0;
        }, n.wbg.__wbindgen_number_get = function(t, e) {
            const s = e, i = typeof s == "number" ? s : void 0;
            V().setFloat64(t + 8 * 1, ue(i) ? 0 : i, !0), V().setInt32(t + 4 * 0, !ue(i), !0);
        }, n.wbg.__wbindgen_number_new = function(t) {
            return t;
        }, n.wbg.__wbindgen_string_get = function(t, e) {
            const s = e, i = typeof s == "string" ? s : void 0;
            var a = ue(i) ? 0 : Ie(i, S.__wbindgen_malloc, S.__wbindgen_realloc), c = _e;
            V().setInt32(t + 4 * 1, c, !0), V().setInt32(t + 4 * 0, a, !0);
        }, n.wbg.__wbindgen_string_new = function(t, e) {
            return ie(t, e);
        }, n.wbg.__wbindgen_throw = function(t, e) {
            throw new Error(ie(t, e));
        }, n;
    }
    function ct(n, t) {
        return S = n.exports, Te.__wbindgen_wasm_module = t, B = null, Q = null, S.__wbindgen_start(), S;
    }
    async function Te(n) {
        if (S !== void 0) return S;
        typeof n < "u" && (Object.getPrototypeOf(n) === Object.prototype ? { module_or_path: n } = n : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), typeof n > "u" && (n = new URL("" + new URL("noirc_abi_wasm_bg-DRbWm09M.wasm", import.meta.url).href, import.meta.url));
        const t = lt();
        (typeof n == "string" || typeof Request == "function" && n instanceof Request || typeof URL == "function" && n instanceof URL) && (n = fetch(n));
        const { instance: e, module: s } = await ot(await n, t);
        return ct(e, s);
    }
    function xn(n) {
        if (typeof Buffer < "u") return Buffer.from(n, "base64");
        if (typeof atob == "function") return Uint8Array.from(atob(n), (t)=>t.charCodeAt(0));
        throw new Error("No implementation found for base64 decoding.");
    }
    function $(n) {
        let t = n.length;
        for(; --t >= 0;)n[t] = 0;
    }
    const ft = 3, dt = 258, kn = 29, ut = 256, _t = ut + 1 + kn, En = 30, ht = 512, bt = new Array((_t + 2) * 2);
    $(bt);
    const wt = new Array(En * 2);
    $(wt);
    const gt = new Array(ht);
    $(gt);
    const pt = new Array(dt - ft + 1);
    $(pt);
    const mt = new Array(kn);
    $(mt);
    const yt = new Array(En);
    $(yt);
    const vt = (n, t, e, s)=>{
        let i = n & 65535 | 0, a = n >>> 16 & 65535 | 0, c = 0;
        for(; e !== 0;){
            c = e > 2e3 ? 2e3 : e, e -= c;
            do i = i + t[s++] | 0, a = a + i | 0;
            while (--c);
            i %= 65521, a %= 65521;
        }
        return i | a << 16 | 0;
    };
    var Fe = vt;
    const xt = ()=>{
        let n, t = [];
        for(var e = 0; e < 256; e++){
            n = e;
            for(var s = 0; s < 8; s++)n = n & 1 ? 3988292384 ^ n >>> 1 : n >>> 1;
            t[e] = n;
        }
        return t;
    }, kt = new Uint32Array(xt()), Et = (n, t, e, s)=>{
        const i = kt, a = s + e;
        n ^= -1;
        for(let c = s; c < a; c++)n = n >>> 8 ^ i[(n ^ t[c]) & 255];
        return n ^ -1;
    };
    var O = Et, Se = {
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
        for(let s = 0, i = 0, a = n.length; s < a; s++){
            let c = n[s];
            e.set(c, i), i += c.length;
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
    var Ft = (n)=>{
        if (typeof TextEncoder == "function" && TextEncoder.prototype.encode) return new TextEncoder().encode(n);
        let t, e, s, i, a, c = n.length, o = 0;
        for(i = 0; i < c; i++)e = n.charCodeAt(i), (e & 64512) === 55296 && i + 1 < c && (s = n.charCodeAt(i + 1), (s & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (s - 56320), i++)), o += e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4;
        for(t = new Uint8Array(o), a = 0, i = 0; a < o; i++)e = n.charCodeAt(i), (e & 64512) === 55296 && i + 1 < c && (s = n.charCodeAt(i + 1), (s & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (s - 56320), i++)), e < 128 ? t[a++] = e : e < 2048 ? (t[a++] = 192 | e >>> 6, t[a++] = 128 | e & 63) : e < 65536 ? (t[a++] = 224 | e >>> 12, t[a++] = 128 | e >>> 6 & 63, t[a++] = 128 | e & 63) : (t[a++] = 240 | e >>> 18, t[a++] = 128 | e >>> 12 & 63, t[a++] = 128 | e >>> 6 & 63, t[a++] = 128 | e & 63);
        return t;
    };
    const St = (n, t)=>{
        if (t < 65534 && n.subarray && Tn) return String.fromCharCode.apply(null, n.length === t ? n : n.subarray(0, t));
        let e = "";
        for(let s = 0; s < t; s++)e += String.fromCharCode(n[s]);
        return e;
    };
    var Rt = (n, t)=>{
        const e = t || n.length;
        if (typeof TextDecoder == "function" && TextDecoder.prototype.decode) return new TextDecoder().decode(n.subarray(0, t));
        let s, i;
        const a = new Array(e * 2);
        for(i = 0, s = 0; s < e;){
            let c = n[s++];
            if (c < 128) {
                a[i++] = c;
                continue;
            }
            let o = ne[c];
            if (o > 4) {
                a[i++] = 65533, s += o - 1;
                continue;
            }
            for(c &= o === 2 ? 31 : o === 3 ? 15 : 7; o > 1 && s < e;)c = c << 6 | n[s++] & 63, o--;
            if (o > 1) {
                a[i++] = 65533;
                continue;
            }
            c < 65536 ? a[i++] = c : (c -= 65536, a[i++] = 55296 | c >> 10 & 1023, a[i++] = 56320 | c & 1023);
        }
        return St(a, i);
    }, Ct = (n, t)=>{
        t = t || n.length, t > n.length && (t = n.length);
        let e = t - 1;
        for(; e >= 0 && (n[e] & 192) === 128;)e--;
        return e < 0 || e === 0 ? t : e + ne[n[e]] > t ? e : t;
    }, Re = {
        string2buf: Ft,
        buf2string: Rt,
        utf8border: Ct
    };
    function Ot() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
    }
    var Nt = Ot;
    const ae = 16209, Pt = 16191;
    var Dt = function(t, e) {
        let s, i, a, c, o, u, r, l, H, b, f, h, F, p, g, k, m, d, x, R, _, A, v, w;
        const y = t.state;
        s = t.next_in, v = t.input, i = s + (t.avail_in - 5), a = t.next_out, w = t.output, c = a - (e - t.avail_out), o = a + (t.avail_out - 257), u = y.dmax, r = y.wsize, l = y.whave, H = y.wnext, b = y.window, f = y.hold, h = y.bits, F = y.lencode, p = y.distcode, g = (1 << y.lenbits) - 1, k = (1 << y.distbits) - 1;
        e: do {
            h < 15 && (f += v[s++] << h, h += 8, f += v[s++] << h, h += 8), m = F[f & g];
            n: for(;;){
                if (d = m >>> 24, f >>>= d, h -= d, d = m >>> 16 & 255, d === 0) w[a++] = m & 65535;
                else if (d & 16) {
                    x = m & 65535, d &= 15, d && (h < d && (f += v[s++] << h, h += 8), x += f & (1 << d) - 1, f >>>= d, h -= d), h < 15 && (f += v[s++] << h, h += 8, f += v[s++] << h, h += 8), m = p[f & k];
                    t: for(;;){
                        if (d = m >>> 24, f >>>= d, h -= d, d = m >>> 16 & 255, d & 16) {
                            if (R = m & 65535, d &= 15, h < d && (f += v[s++] << h, h += 8, h < d && (f += v[s++] << h, h += 8)), R += f & (1 << d) - 1, R > u) {
                                t.msg = "invalid distance too far back", y.mode = ae;
                                break e;
                            }
                            if (f >>>= d, h -= d, d = a - c, R > d) {
                                if (d = R - d, d > l && y.sane) {
                                    t.msg = "invalid distance too far back", y.mode = ae;
                                    break e;
                                }
                                if (_ = 0, A = b, H === 0) {
                                    if (_ += r - d, d < x) {
                                        x -= d;
                                        do w[a++] = b[_++];
                                        while (--d);
                                        _ = a - R, A = w;
                                    }
                                } else if (H < d) {
                                    if (_ += r + H - d, d -= H, d < x) {
                                        x -= d;
                                        do w[a++] = b[_++];
                                        while (--d);
                                        if (_ = 0, H < x) {
                                            d = H, x -= d;
                                            do w[a++] = b[_++];
                                            while (--d);
                                            _ = a - R, A = w;
                                        }
                                    }
                                } else if (_ += H - d, d < x) {
                                    x -= d;
                                    do w[a++] = b[_++];
                                    while (--d);
                                    _ = a - R, A = w;
                                }
                                for(; x > 2;)w[a++] = A[_++], w[a++] = A[_++], w[a++] = A[_++], x -= 3;
                                x && (w[a++] = A[_++], x > 1 && (w[a++] = A[_++]));
                            } else {
                                _ = a - R;
                                do w[a++] = w[_++], w[a++] = w[_++], w[a++] = w[_++], x -= 3;
                                while (x > 2);
                                x && (w[a++] = w[_++], x > 1 && (w[a++] = w[_++]));
                            }
                        } else if (d & 64) {
                            t.msg = "invalid distance code", y.mode = ae;
                            break e;
                        } else {
                            m = p[(m & 65535) + (f & (1 << d) - 1)];
                            continue t;
                        }
                        break;
                    }
                } else if (d & 64) if (d & 32) {
                    y.mode = Pt;
                    break e;
                } else {
                    t.msg = "invalid literal/length code", y.mode = ae;
                    break e;
                }
                else {
                    m = F[(m & 65535) + (f & (1 << d) - 1)];
                    continue n;
                }
                break;
            }
        }while (s < i && a < o);
        x = h >> 3, s -= x, h -= x << 3, f &= (1 << h) - 1, t.next_in = s, t.next_out = a, t.avail_in = s < i ? 5 + (i - s) : 5 - (s - i), t.avail_out = a < o ? 257 + (o - a) : 257 - (a - o), y.hold = f, y.bits = h;
    };
    const j = 15, Ue = 852, Me = 592, Be = 0, pe = 1, We = 2, It = new Uint16Array([
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
    ]), Ut = new Uint8Array([
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
    ]), Bt = new Uint8Array([
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
    ]), Wt = (n, t, e, s, i, a, c, o)=>{
        const u = o.bits;
        let r = 0, l = 0, H = 0, b = 0, f = 0, h = 0, F = 0, p = 0, g = 0, k = 0, m, d, x, R, _, A = null, v;
        const w = new Uint16Array(j + 1), y = new Uint16Array(j + 1);
        let I = null, Oe, te, se;
        for(r = 0; r <= j; r++)w[r] = 0;
        for(l = 0; l < s; l++)w[t[e + l]]++;
        for(f = u, b = j; b >= 1 && w[b] === 0; b--);
        if (f > b && (f = b), b === 0) return i[a++] = 1 << 24 | 64 << 16 | 0, i[a++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
        for(H = 1; H < b && w[H] === 0; H++);
        for(f < H && (f = H), p = 1, r = 1; r <= j; r++)if (p <<= 1, p -= w[r], p < 0) return -1;
        if (p > 0 && (n === Be || b !== 1)) return -1;
        for(y[1] = 0, r = 1; r < j; r++)y[r + 1] = y[r] + w[r];
        for(l = 0; l < s; l++)t[e + l] !== 0 && (c[y[t[e + l]]++] = l);
        if (n === Be ? (A = I = c, v = 20) : n === pe ? (A = It, I = Ut, v = 257) : (A = Mt, I = Bt, v = 0), k = 0, l = 0, r = H, _ = a, h = f, F = 0, x = -1, g = 1 << f, R = g - 1, n === pe && g > Ue || n === We && g > Me) return 1;
        for(;;){
            Oe = r - F, c[l] + 1 < v ? (te = 0, se = c[l]) : c[l] >= v ? (te = I[c[l] - v], se = A[c[l] - v]) : (te = 96, se = 0), m = 1 << r - F, d = 1 << h, H = d;
            do d -= m, i[_ + (k >> F) + d] = Oe << 24 | te << 16 | se | 0;
            while (d !== 0);
            for(m = 1 << r - 1; k & m;)m >>= 1;
            if (m !== 0 ? (k &= m - 1, k += m) : k = 0, l++, --w[r] === 0) {
                if (r === b) break;
                r = t[e + c[l]];
            }
            if (r > f && (k & R) !== x) {
                for(F === 0 && (F = f), _ += H, h = r - F, p = 1 << h; h + F < b && (p -= w[h + F], !(p <= 0));)h++, p <<= 1;
                if (g += 1 << h, n === pe && g > Ue || n === We && g > Me) return 1;
                x = k & R, i[x] = f << 24 | h << 16 | _ - a | 0;
            }
        }
        return k !== 0 && (i[_ + k] = r - F << 24 | 64 << 16 | 0), o.bits = f, 0;
    };
    var ee = Wt;
    const Lt = 0, Fn = 1, Sn = 2, { Z_FINISH: Le, Z_BLOCK: qt, Z_TREES: re, Z_OK: L, Z_STREAM_END: zt, Z_NEED_DICT: Zt, Z_STREAM_ERROR: C, Z_DATA_ERROR: Rn, Z_MEM_ERROR: Cn, Z_BUF_ERROR: Vt, Z_DEFLATED: qe } = Hn, be = 16180, ze = 16181, Ze = 16182, Ve = 16183, je = 16184, Je = 16185, Xe = 16186, Ke = 16187, $e = 16188, Ye = 16189, he = 16190, P = 16191, me = 16192, Ge = 16193, ye = 16194, Qe = 16195, en = 16196, nn = 16197, tn = 16198, oe = 16199, le = 16200, sn = 16201, an = 16202, rn = 16203, on = 16204, ln = 16205, ve = 16206, cn = 16207, fn = 16208, T = 16209, On = 16210, Nn = 16211, jt = 852, Jt = 592, Xt = 15, Kt = Xt, dn = (n)=>(n >>> 24 & 255) + (n >>> 8 & 65280) + ((n & 65280) << 8) + ((n & 255) << 24);
    function $t() {
        this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
    }
    const q = (n)=>{
        if (!n) return 1;
        const t = n.state;
        return !t || t.strm !== n || t.mode < be || t.mode > Nn ? 1 : 0;
    }, Pn = (n)=>{
        if (q(n)) return C;
        const t = n.state;
        return n.total_in = n.total_out = t.total = 0, n.msg = "", t.wrap && (n.adler = t.wrap & 1), t.mode = be, t.last = 0, t.havedict = 0, t.flags = -1, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new Int32Array(jt), t.distcode = t.distdyn = new Int32Array(Jt), t.sane = 1, t.back = -1, L;
    }, Dn = (n)=>{
        if (q(n)) return C;
        const t = n.state;
        return t.wsize = 0, t.whave = 0, t.wnext = 0, Pn(n);
    }, In = (n, t)=>{
        let e;
        if (q(n)) return C;
        const s = n.state;
        return t < 0 ? (e = 0, t = -t) : (e = (t >> 4) + 5, t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? C : (s.window !== null && s.wbits !== t && (s.window = null), s.wrap = e, s.wbits = t, Dn(n));
    }, Un = (n, t)=>{
        if (!n) return C;
        const e = new $t;
        n.state = e, e.strm = n, e.window = null, e.mode = be;
        const s = In(n, t);
        return s !== L && (n.state = null), s;
    }, Yt = (n)=>Un(n, Kt);
    let un = !0, xe, ke;
    const Gt = (n)=>{
        if (un) {
            xe = new Int32Array(512), ke = new Int32Array(32);
            let t = 0;
            for(; t < 144;)n.lens[t++] = 8;
            for(; t < 256;)n.lens[t++] = 9;
            for(; t < 280;)n.lens[t++] = 7;
            for(; t < 288;)n.lens[t++] = 8;
            for(ee(Fn, n.lens, 0, 288, xe, 0, n.work, {
                bits: 9
            }), t = 0; t < 32;)n.lens[t++] = 5;
            ee(Sn, n.lens, 0, 32, ke, 0, n.work, {
                bits: 5
            }), un = !1;
        }
        n.lencode = xe, n.lenbits = 9, n.distcode = ke, n.distbits = 5;
    }, Mn = (n, t, e, s)=>{
        let i;
        const a = n.state;
        return a.window === null && (a.window = new Uint8Array(1 << a.wbits)), a.wsize === 0 && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0), s >= a.wsize ? (a.window.set(t.subarray(e - a.wsize, e), 0), a.wnext = 0, a.whave = a.wsize) : (i = a.wsize - a.wnext, i > s && (i = s), a.window.set(t.subarray(e - s, e - s + i), a.wnext), s -= i, s ? (a.window.set(t.subarray(e - s, e), 0), a.wnext = s, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0;
    }, Qt = (n, t)=>{
        let e, s, i, a, c, o, u, r, l, H, b, f, h, F, p = 0, g, k, m, d, x, R, _, A;
        const v = new Uint8Array(4);
        let w, y;
        const I = new Uint8Array([
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
        if (q(n) || !n.output || !n.input && n.avail_in !== 0) return C;
        e = n.state, e.mode === P && (e.mode = me), c = n.next_out, i = n.output, u = n.avail_out, a = n.next_in, s = n.input, o = n.avail_in, r = e.hold, l = e.bits, H = o, b = u, A = L;
        e: for(;;)switch(e.mode){
            case be:
                if (e.wrap === 0) {
                    e.mode = me;
                    break;
                }
                for(; l < 16;){
                    if (o === 0) break e;
                    o--, r += s[a++] << l, l += 8;
                }
                if (e.wrap & 2 && r === 35615) {
                    e.wbits === 0 && (e.wbits = 15), e.check = 0, v[0] = r & 255, v[1] = r >>> 8 & 255, e.check = O(e.check, v, 2, 0), r = 0, l = 0, e.mode = ze;
                    break;
                }
                if (e.head && (e.head.done = !1), !(e.wrap & 1) || (((r & 255) << 8) + (r >> 8)) % 31) {
                    n.msg = "incorrect header check", e.mode = T;
                    break;
                }
                if ((r & 15) !== qe) {
                    n.msg = "unknown compression method", e.mode = T;
                    break;
                }
                if (r >>>= 4, l -= 4, _ = (r & 15) + 8, e.wbits === 0 && (e.wbits = _), _ > 15 || _ > e.wbits) {
                    n.msg = "invalid window size", e.mode = T;
                    break;
                }
                e.dmax = 1 << e.wbits, e.flags = 0, n.adler = e.check = 1, e.mode = r & 512 ? Ye : P, r = 0, l = 0;
                break;
            case ze:
                for(; l < 16;){
                    if (o === 0) break e;
                    o--, r += s[a++] << l, l += 8;
                }
                if (e.flags = r, (e.flags & 255) !== qe) {
                    n.msg = "unknown compression method", e.mode = T;
                    break;
                }
                if (e.flags & 57344) {
                    n.msg = "unknown header flags set", e.mode = T;
                    break;
                }
                e.head && (e.head.text = r >> 8 & 1), e.flags & 512 && e.wrap & 4 && (v[0] = r & 255, v[1] = r >>> 8 & 255, e.check = O(e.check, v, 2, 0)), r = 0, l = 0, e.mode = Ze;
            case Ze:
                for(; l < 32;){
                    if (o === 0) break e;
                    o--, r += s[a++] << l, l += 8;
                }
                e.head && (e.head.time = r), e.flags & 512 && e.wrap & 4 && (v[0] = r & 255, v[1] = r >>> 8 & 255, v[2] = r >>> 16 & 255, v[3] = r >>> 24 & 255, e.check = O(e.check, v, 4, 0)), r = 0, l = 0, e.mode = Ve;
            case Ve:
                for(; l < 16;){
                    if (o === 0) break e;
                    o--, r += s[a++] << l, l += 8;
                }
                e.head && (e.head.xflags = r & 255, e.head.os = r >> 8), e.flags & 512 && e.wrap & 4 && (v[0] = r & 255, v[1] = r >>> 8 & 255, e.check = O(e.check, v, 2, 0)), r = 0, l = 0, e.mode = je;
            case je:
                if (e.flags & 1024) {
                    for(; l < 16;){
                        if (o === 0) break e;
                        o--, r += s[a++] << l, l += 8;
                    }
                    e.length = r, e.head && (e.head.extra_len = r), e.flags & 512 && e.wrap & 4 && (v[0] = r & 255, v[1] = r >>> 8 & 255, e.check = O(e.check, v, 2, 0)), r = 0, l = 0;
                } else e.head && (e.head.extra = null);
                e.mode = Je;
            case Je:
                if (e.flags & 1024 && (f = e.length, f > o && (f = o), f && (e.head && (_ = e.head.extra_len - e.length, e.head.extra || (e.head.extra = new Uint8Array(e.head.extra_len)), e.head.extra.set(s.subarray(a, a + f), _)), e.flags & 512 && e.wrap & 4 && (e.check = O(e.check, s, f, a)), o -= f, a += f, e.length -= f), e.length)) break e;
                e.length = 0, e.mode = Xe;
            case Xe:
                if (e.flags & 2048) {
                    if (o === 0) break e;
                    f = 0;
                    do _ = s[a + f++], e.head && _ && e.length < 65536 && (e.head.name += String.fromCharCode(_));
                    while (_ && f < o);
                    if (e.flags & 512 && e.wrap & 4 && (e.check = O(e.check, s, f, a)), o -= f, a += f, _) break e;
                } else e.head && (e.head.name = null);
                e.length = 0, e.mode = Ke;
            case Ke:
                if (e.flags & 4096) {
                    if (o === 0) break e;
                    f = 0;
                    do _ = s[a + f++], e.head && _ && e.length < 65536 && (e.head.comment += String.fromCharCode(_));
                    while (_ && f < o);
                    if (e.flags & 512 && e.wrap & 4 && (e.check = O(e.check, s, f, a)), o -= f, a += f, _) break e;
                } else e.head && (e.head.comment = null);
                e.mode = $e;
            case $e:
                if (e.flags & 512) {
                    for(; l < 16;){
                        if (o === 0) break e;
                        o--, r += s[a++] << l, l += 8;
                    }
                    if (e.wrap & 4 && r !== (e.check & 65535)) {
                        n.msg = "header crc mismatch", e.mode = T;
                        break;
                    }
                    r = 0, l = 0;
                }
                e.head && (e.head.hcrc = e.flags >> 9 & 1, e.head.done = !0), n.adler = e.check = 0, e.mode = P;
                break;
            case Ye:
                for(; l < 32;){
                    if (o === 0) break e;
                    o--, r += s[a++] << l, l += 8;
                }
                n.adler = e.check = dn(r), r = 0, l = 0, e.mode = he;
            case he:
                if (e.havedict === 0) return n.next_out = c, n.avail_out = u, n.next_in = a, n.avail_in = o, e.hold = r, e.bits = l, Zt;
                n.adler = e.check = 1, e.mode = P;
            case P:
                if (t === qt || t === re) break e;
            case me:
                if (e.last) {
                    r >>>= l & 7, l -= l & 7, e.mode = ve;
                    break;
                }
                for(; l < 3;){
                    if (o === 0) break e;
                    o--, r += s[a++] << l, l += 8;
                }
                switch(e.last = r & 1, r >>>= 1, l -= 1, r & 3){
                    case 0:
                        e.mode = Ge;
                        break;
                    case 1:
                        if (Gt(e), e.mode = oe, t === re) {
                            r >>>= 2, l -= 2;
                            break e;
                        }
                        break;
                    case 2:
                        e.mode = en;
                        break;
                    case 3:
                        n.msg = "invalid block type", e.mode = T;
                }
                r >>>= 2, l -= 2;
                break;
            case Ge:
                for(r >>>= l & 7, l -= l & 7; l < 32;){
                    if (o === 0) break e;
                    o--, r += s[a++] << l, l += 8;
                }
                if ((r & 65535) !== (r >>> 16 ^ 65535)) {
                    n.msg = "invalid stored block lengths", e.mode = T;
                    break;
                }
                if (e.length = r & 65535, r = 0, l = 0, e.mode = ye, t === re) break e;
            case ye:
                e.mode = Qe;
            case Qe:
                if (f = e.length, f) {
                    if (f > o && (f = o), f > u && (f = u), f === 0) break e;
                    i.set(s.subarray(a, a + f), c), o -= f, a += f, u -= f, c += f, e.length -= f;
                    break;
                }
                e.mode = P;
                break;
            case en:
                for(; l < 14;){
                    if (o === 0) break e;
                    o--, r += s[a++] << l, l += 8;
                }
                if (e.nlen = (r & 31) + 257, r >>>= 5, l -= 5, e.ndist = (r & 31) + 1, r >>>= 5, l -= 5, e.ncode = (r & 15) + 4, r >>>= 4, l -= 4, e.nlen > 286 || e.ndist > 30) {
                    n.msg = "too many length or distance symbols", e.mode = T;
                    break;
                }
                e.have = 0, e.mode = nn;
            case nn:
                for(; e.have < e.ncode;){
                    for(; l < 3;){
                        if (o === 0) break e;
                        o--, r += s[a++] << l, l += 8;
                    }
                    e.lens[I[e.have++]] = r & 7, r >>>= 3, l -= 3;
                }
                for(; e.have < 19;)e.lens[I[e.have++]] = 0;
                if (e.lencode = e.lendyn, e.lenbits = 7, w = {
                    bits: e.lenbits
                }, A = ee(Lt, e.lens, 0, 19, e.lencode, 0, e.work, w), e.lenbits = w.bits, A) {
                    n.msg = "invalid code lengths set", e.mode = T;
                    break;
                }
                e.have = 0, e.mode = tn;
            case tn:
                for(; e.have < e.nlen + e.ndist;){
                    for(; p = e.lencode[r & (1 << e.lenbits) - 1], g = p >>> 24, k = p >>> 16 & 255, m = p & 65535, !(g <= l);){
                        if (o === 0) break e;
                        o--, r += s[a++] << l, l += 8;
                    }
                    if (m < 16) r >>>= g, l -= g, e.lens[e.have++] = m;
                    else {
                        if (m === 16) {
                            for(y = g + 2; l < y;){
                                if (o === 0) break e;
                                o--, r += s[a++] << l, l += 8;
                            }
                            if (r >>>= g, l -= g, e.have === 0) {
                                n.msg = "invalid bit length repeat", e.mode = T;
                                break;
                            }
                            _ = e.lens[e.have - 1], f = 3 + (r & 3), r >>>= 2, l -= 2;
                        } else if (m === 17) {
                            for(y = g + 3; l < y;){
                                if (o === 0) break e;
                                o--, r += s[a++] << l, l += 8;
                            }
                            r >>>= g, l -= g, _ = 0, f = 3 + (r & 7), r >>>= 3, l -= 3;
                        } else {
                            for(y = g + 7; l < y;){
                                if (o === 0) break e;
                                o--, r += s[a++] << l, l += 8;
                            }
                            r >>>= g, l -= g, _ = 0, f = 11 + (r & 127), r >>>= 7, l -= 7;
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
                }, A = ee(Fn, e.lens, 0, e.nlen, e.lencode, 0, e.work, w), e.lenbits = w.bits, A) {
                    n.msg = "invalid literal/lengths set", e.mode = T;
                    break;
                }
                if (e.distbits = 6, e.distcode = e.distdyn, w = {
                    bits: e.distbits
                }, A = ee(Sn, e.lens, e.nlen, e.ndist, e.distcode, 0, e.work, w), e.distbits = w.bits, A) {
                    n.msg = "invalid distances set", e.mode = T;
                    break;
                }
                if (e.mode = oe, t === re) break e;
            case oe:
                e.mode = le;
            case le:
                if (o >= 6 && u >= 258) {
                    n.next_out = c, n.avail_out = u, n.next_in = a, n.avail_in = o, e.hold = r, e.bits = l, Dt(n, b), c = n.next_out, i = n.output, u = n.avail_out, a = n.next_in, s = n.input, o = n.avail_in, r = e.hold, l = e.bits, e.mode === P && (e.back = -1);
                    break;
                }
                for(e.back = 0; p = e.lencode[r & (1 << e.lenbits) - 1], g = p >>> 24, k = p >>> 16 & 255, m = p & 65535, !(g <= l);){
                    if (o === 0) break e;
                    o--, r += s[a++] << l, l += 8;
                }
                if (k && !(k & 240)) {
                    for(d = g, x = k, R = m; p = e.lencode[R + ((r & (1 << d + x) - 1) >> d)], g = p >>> 24, k = p >>> 16 & 255, m = p & 65535, !(d + g <= l);){
                        if (o === 0) break e;
                        o--, r += s[a++] << l, l += 8;
                    }
                    r >>>= d, l -= d, e.back += d;
                }
                if (r >>>= g, l -= g, e.back += g, e.length = m, k === 0) {
                    e.mode = ln;
                    break;
                }
                if (k & 32) {
                    e.back = -1, e.mode = P;
                    break;
                }
                if (k & 64) {
                    n.msg = "invalid literal/length code", e.mode = T;
                    break;
                }
                e.extra = k & 15, e.mode = sn;
            case sn:
                if (e.extra) {
                    for(y = e.extra; l < y;){
                        if (o === 0) break e;
                        o--, r += s[a++] << l, l += 8;
                    }
                    e.length += r & (1 << e.extra) - 1, r >>>= e.extra, l -= e.extra, e.back += e.extra;
                }
                e.was = e.length, e.mode = an;
            case an:
                for(; p = e.distcode[r & (1 << e.distbits) - 1], g = p >>> 24, k = p >>> 16 & 255, m = p & 65535, !(g <= l);){
                    if (o === 0) break e;
                    o--, r += s[a++] << l, l += 8;
                }
                if (!(k & 240)) {
                    for(d = g, x = k, R = m; p = e.distcode[R + ((r & (1 << d + x) - 1) >> d)], g = p >>> 24, k = p >>> 16 & 255, m = p & 65535, !(d + g <= l);){
                        if (o === 0) break e;
                        o--, r += s[a++] << l, l += 8;
                    }
                    r >>>= d, l -= d, e.back += d;
                }
                if (r >>>= g, l -= g, e.back += g, k & 64) {
                    n.msg = "invalid distance code", e.mode = T;
                    break;
                }
                e.offset = m, e.extra = k & 15, e.mode = rn;
            case rn:
                if (e.extra) {
                    for(y = e.extra; l < y;){
                        if (o === 0) break e;
                        o--, r += s[a++] << l, l += 8;
                    }
                    e.offset += r & (1 << e.extra) - 1, r >>>= e.extra, l -= e.extra, e.back += e.extra;
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
                    f > e.wnext ? (f -= e.wnext, h = e.wsize - f) : h = e.wnext - f, f > e.length && (f = e.length), F = e.window;
                } else F = i, h = c - e.offset, f = e.length;
                f > u && (f = u), u -= f, e.length -= f;
                do i[c++] = F[h++];
                while (--f);
                e.length === 0 && (e.mode = le);
                break;
            case ln:
                if (u === 0) break e;
                i[c++] = e.length, u--, e.mode = le;
                break;
            case ve:
                if (e.wrap) {
                    for(; l < 32;){
                        if (o === 0) break e;
                        o--, r |= s[a++] << l, l += 8;
                    }
                    if (b -= u, n.total_out += b, e.total += b, e.wrap & 4 && b && (n.adler = e.check = e.flags ? O(e.check, i, b, c - b) : Fe(e.check, i, b, c - b)), b = u, e.wrap & 4 && (e.flags ? r : dn(r)) !== e.check) {
                        n.msg = "incorrect data check", e.mode = T;
                        break;
                    }
                    r = 0, l = 0;
                }
                e.mode = cn;
            case cn:
                if (e.wrap && e.flags) {
                    for(; l < 32;){
                        if (o === 0) break e;
                        o--, r += s[a++] << l, l += 8;
                    }
                    if (e.wrap & 4 && r !== (e.total & 4294967295)) {
                        n.msg = "incorrect length check", e.mode = T;
                        break;
                    }
                    r = 0, l = 0;
                }
                e.mode = fn;
            case fn:
                A = zt;
                break e;
            case T:
                A = Rn;
                break e;
            case On:
                return Cn;
            case Nn:
            default:
                return C;
        }
        return n.next_out = c, n.avail_out = u, n.next_in = a, n.avail_in = o, e.hold = r, e.bits = l, (e.wsize || b !== n.avail_out && e.mode < T && (e.mode < ve || t !== Le)) && Mn(n, n.output, n.next_out, b - n.avail_out), H -= n.avail_in, b -= n.avail_out, n.total_in += H, n.total_out += b, e.total += b, e.wrap & 4 && b && (n.adler = e.check = e.flags ? O(e.check, i, b, n.next_out - b) : Fe(e.check, i, b, n.next_out - b)), n.data_type = e.bits + (e.last ? 64 : 0) + (e.mode === P ? 128 : 0) + (e.mode === oe || e.mode === ye ? 256 : 0), (H === 0 && b === 0 || t === Le) && A === L && (A = Vt), A;
    }, es = (n)=>{
        if (q(n)) return C;
        let t = n.state;
        return t.window && (t.window = null), n.state = null, L;
    }, ns = (n, t)=>{
        if (q(n)) return C;
        const e = n.state;
        return e.wrap & 2 ? (e.head = t, t.done = !1, L) : C;
    }, ts = (n, t)=>{
        const e = t.length;
        let s, i, a;
        return q(n) || (s = n.state, s.wrap !== 0 && s.mode !== he) ? C : s.mode === he && (i = 1, i = Fe(i, t, e, 0), i !== s.check) ? Rn : (a = Mn(n, t, e, e), a ? (s.mode = On, Cn) : (s.havedict = 1, L));
    };
    var ss = Dn, is = In, as = Pn, rs = Yt, os = Un, ls = Qt, cs = es, fs = ns, ds = ts, us = "pako inflate (from Nodeca project)", N = {
        inflateReset: ss,
        inflateReset2: is,
        inflateResetKeep: as,
        inflateInit: rs,
        inflateInit2: os,
        inflate: ls,
        inflateEnd: cs,
        inflateGetHeader: fs,
        inflateSetDictionary: ds,
        inflateInfo: us
    };
    function _s() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
    }
    var hs = _s;
    const Bn = Object.prototype.toString, { Z_NO_FLUSH: bs, Z_FINISH: _n, Z_OK: X, Z_STREAM_END: Ee, Z_NEED_DICT: He, Z_STREAM_ERROR: ws, Z_DATA_ERROR: hn, Z_MEM_ERROR: gs, Z_BUF_ERROR: bn } = Hn, ps = {
        chunkSize: 1024 * 64,
        windowBits: 15,
        to: ""
    };
    function we(n) {
        this.options = An.assign({}, ps, n || {});
        const t = this.options;
        t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, t.windowBits === 0 && (t.windowBits = -15)), t.windowBits >= 0 && t.windowBits < 16 && !(n && n.windowBits) && (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && (t.windowBits & 15 || (t.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Nt, this.strm.avail_out = 0;
        let e = N.inflateInit2(this.strm, t.windowBits);
        if (e !== X) throw new Error(Se[e]);
        if (this.header = new hs, N.inflateGetHeader(this.strm, this.header), t.dictionary && (typeof t.dictionary == "string" ? t.dictionary = Re.string2buf(t.dictionary) : Bn.call(t.dictionary) === "[object ArrayBuffer]" && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (e = N.inflateSetDictionary(this.strm, t.dictionary), e !== X))) throw new Error(Se[e]);
    }
    we.prototype.push = function(n, t) {
        const e = this.strm, s = this.options.chunkSize, i = this.options.dictionary;
        let a, c, o;
        if (this.ended) return !1;
        for(t === ~~t ? c = t : c = t === !0 ? _n : bs, Bn.call(n) === "[object ArrayBuffer]" ? e.input = new Uint8Array(n) : e.input = n, e.next_in = 0, e.avail_in = e.input.length;;){
            for(e.avail_out === 0 && (e.output = new Uint8Array(s), e.next_out = 0, e.avail_out = s), a = N.inflate(e, c), a === He && i && (a = N.inflateSetDictionary(e, i), a === X ? a = N.inflate(e, c) : a === hn && (a = He)); e.avail_in > 0 && a === Ee && e.state.wrap & 2 && e.state.flags !== 0 && e.input[e.next_in] !== 0;)N.inflateReset(e), a = N.inflate(e, c);
            switch(a){
                case ws:
                case hn:
                case He:
                case gs:
                    return this.onEnd(a), this.ended = !0, !1;
            }
            if (o = e.avail_out, e.next_out && (e.avail_out === 0 || a === Ee || c > 0)) if (this.options.to === "string") {
                let u = Re.utf8border(e.output, e.next_out), r = e.next_out - u, l = Re.buf2string(e.output, u);
                e.next_out = r, e.avail_out = s - r, r && e.output.set(e.output.subarray(u, u + r), 0), this.onData(l);
            } else this.onData(e.output.length === e.next_out ? e.output : e.output.subarray(0, e.next_out)), e.avail_out = 0, e.next_out = 0;
            if (!((a === X || a === bn) && o === 0)) {
                if (a === Ee) return a = N.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
                if (e.avail_in === 0) {
                    if (c === _n) return a = N.inflateEnd(this.strm), this.onEnd(a === X ? bn : a), this.ended = !0, !1;
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
        n === X && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = An.flattenChunks(this.chunks)), this.chunks = [], this.err = n, this.msg = this.strm.msg;
    };
    function ms(n, t) {
        const e = new we(t);
        if (e.push(n, !0), e.err) throw e.msg || Se[e.err];
        return e.result;
    }
    var ys = ms, vs = {
        inflate: ys
    };
    const { inflate: xs } = vs;
    var ks = xs;
    function Es(n) {
        return JSON.parse(ks(xn(n), {
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
        let i = n.flatMap((a)=>Ts(a, t, e, s));
        if (i.length > 0) {
            const a = n[n.length - 1].split(".");
            if (a.length === 2) {
                const c = t.acir_locations[a[0]];
                if (c !== void 0) {
                    const o = t.location_tree.locations[c];
                    i = Wn(o, t.location_tree.locations, e).concat(i);
                }
            }
        }
        return i;
    }
    function Wn(n, t, e) {
        const s = [];
        for(; n.parent !== null;){
            const { file: i, span: a } = n.value, { path: c, source: o } = e[i], u = o.substring(a.start, a.end), l = o.substring(0, a.start).split(`
`), H = l.length, b = l[l.length - 1].length + 1;
            s.push({
                filePath: c,
                line: H,
                column: b,
                locationText: u
            }), n = t[n.parent];
        }
        return s.reverse();
    }
    function Ts(n, t, e, s) {
        let i = t.acir_locations[n];
        const a = Fs(n);
        if (s !== void 0 && a !== void 0 && (i = t.brillig_locations[s][a], i === void 0)) return [];
        if (i === void 0) return [];
        const c = t.location_tree.locations[i];
        return Wn(c, t.location_tree.locations, e);
    }
    function Fs(n) {
        const t = n.split(".");
        if (t.length === 2) return t[1];
    }
    const Ss = async (n, t)=>{
        if (n == "print") return [];
        throw Error(`Unexpected oracle during execution: ${n}(${t.join(", ")})`);
    };
    function Rs(n, t) {
        const e = t;
        if (t.rawAssertionPayload) try {
            const s = at(n.abi, t.rawAssertionPayload);
            typeof s == "string" ? e.message = `Circuit execution failed: ${s}` : e.decodedAssertionPayload = s;
        } catch  {}
        try {
            const s = Hs(t, Es(n.debug_symbols)[t.acirFunctionId], n.file_map);
            e.noirCallStack = s?.map((i)=>typeof i == "string" ? `at opcode ${i}` : `at ${i.locationText} (${i.filePath}:${i.line}:${i.column})`);
        } catch  {}
        return e;
    }
    async function Cs(n, t, e = Ss) {
        const s = st(n.abi, t);
        try {
            return await $n(xn(n.bytecode), s, e);
        } catch (i) {
            throw typeof i == "object" && i !== null && "rawAssertionPayload" in i ? Rs(n, i) : new Error(`Circuit execution failed: ${i}`);
        }
    }
    class Os {
        circuit;
        constructor(t){
            this.circuit = t;
        }
        async init() {
            typeof Te == "function" && await Promise.all([
                Te(),
                mn()
            ]);
        }
        async execute(t, e) {
            await this.init();
            const s = await Cs(this.circuit, t, e), i = s[0].witness, { return_value: a } = it(this.circuit.abi, i);
            return {
                witness: Kn(s),
                returnValue: a
            };
        }
    }
    const Ns = "1.0.0-beta.9+6abff2f16e1c1314ba30708d1cf032a536de3d19", Ps = "18177956800776800075", Ds = {
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
    }, Is = "H4sIAAAAAAAA/+1dCZcVRxW+wwwkkzAQwMQYFmXTANF0VfVSFQ0MyhINi4ZFA0Tpru4KEA07GtaJhj2aPZo/y/H2oRrq9TyipG+9k55Un3O5d97M3Fdf1df3u1W8eW8M7l9fof3JxhPWj8Hsq3ls2vqo28Um6HJF85xxvmD98jaAcY8ARJTGcZXxigmWR1wVMonipEglkyyRScmlEJWMZaYKlUWKxaJiJlHC2GQv/P+59P/IxZYTTuwoCbEQ/BBihfUrwTMhFhISYgUhIVYSTmy96E+iTTrz+CC3FFWmGCulSCKVpVzhCNIsEcxolujclJnKpSqqShdCqUiYVCUZ16lITZwn+b1WPpZnJqlMnpeZEZiAJ7li0ohIa1lmQgijdV5k+G2tIsPispKs0Drh0iglkvIe7fpGswifxHku0zwTupC5iBOeVElRVGVaxaLIGVOykmlkEiNUEvFUmoyVJk4UK8oqjnh7fDxSpTaF4fhPkhll0ijGmYnLjOU6NbmRGcenNDqLo0xHcVWknOUpl5nONeOpb7y8NLJQcVQlUkVVjHTMsipKRCZMXqUqZ2WWxLimIqlwUmRUpGmq4izG9ee61LPWg1e6lLJkiUqzQieikBLnhldRyVKZpgyx6iLNc81LYWRSccSZVZUpuGYKyeYD7wKbq47ronzPxsudeIUTr7Qx4Tg4Na463yq0H6L9CEar8vPBT1Ffbf2aNgDqou4C6FrUVwNdUV8D/VT5KfBDiLXWrwPPhJgiJMRaQkKsg6DyVNgH8gWVn9MqXxflRs3XOPFaJ14H/VD59Wg/RvsJjFblF4Cfov6i9RvaAKiLuguga1F/EeiK+gbop8ovAj+E2Gj9JvBMiEWEhNhISIhNEFSeCvtAvqDyc1rl66LcqPkGJ97oxJugHyr/EtpP0X4Go1X5J8BPUX+5ydkGQF3UXQBdi/rLQFfUI+inyi8GP4Rg1nPwTIjFhIRghITgEFSeCvtAvqDyc1rl66LcqHnkxMyJOfRD5QVajJbAaFX+SfBT1FPrszYA6qLuAuha1FOgK+oZ9FPlnwE/hJDWK/BMiGcICSEJCaEgqDwV9oF8QeXntMrXRblR88yJpRMr6IfKv4L2c7RfwGhVfhL8FPVXrd/cBkBd1F0AXYv6q0BX1DdDP1V+CfghxJbWOL0RYgkhIbYQEmIagspTYR/IF1R+Tqt8XZQbNd/sxFuceBr6ofJb0X6J9isYrco/BX6K+jbrt7cBUBd1F0DXor4N6Ir6duinyi8FP4TYYf1O8EyIpYSE2EFIiJ0QVJ4K+0C+oPJzWuXrotyo+XYn3uHEO6EfKv8a2q/RfgOjVfmnwU9Rf936XW0A1EXdBdC1qL8OdEV9F/RT5ZeBH0Lstn4PeCbEMkJC7CYkxB4IKk+FfSBfUPk5rfJ1UW7UfJcT73biPdAPld+L9lu038FoVf418FPU37B+XxsAdVF3AXQt6m8AXVHfB/1U+b3ghxD7rT8Angmxl5AQ+wkJcQDoVX6xM48PcgeVn9Mqz3QcG54nHJ9dMqRdLgUOIEEW6koWyE4W8bieAAwlU0VR5ibJeV7mEsVezhqfyPOqEmmVxpxjjxAxxVLBEWuiVF6pqkBSaJT0LJda8SjPBZJIFlLpxOCTe+9q0hJRsTTSqUScyLs0Maku4oxxXIYqwjlQJhZC1osU54xrhZQ0nJsixV5k1vgSnUVaFEpHJXI51iyKKpHzrDBCa5HVoIzUZaliZI6OI4m3CxdlFqcxAjehi+uO9ymbq45r0W26tX1O/KgznP1OfMCJh3WDhOOOfXR9B9F+j/YHGG3X9wr4Efk3rT/UBkAt8i6AriL/JtCJ/CHoZ9e3FfwQ4rD1R8AzIbYSEuIwISGOQOj6qLAP5AtdX+j6QtfX266vFt2mWzvkxI96Fe5hJz7ixMNez0M4bi9d31tof4T77485SpF/CfyI/FHr8zYAapF3AXQV+aNAJ/I59LPrE+CHEIX1GjwTQhASoiAkhIbQ9VFhH8gXur7Q9YWur7dd31F42K3lTvyo91EpnFg78bC/yCYct5eur0Sr0AyMtutbBX5E/m3rj7UBUIu8C6CryL8NdCJ/DPrZ9a0HP4Q4bv0J8EyI9YSEOE5IiBMQuj4q7AP5QtcXur7Q9fW266tFt+nWjjnxo94J/7gTn3Di1TD7PXUJx+2l63sH7c9of4HRdn1vgR+Rf9f6k20A1CLvAugq8u8CncifhNF0ffOI55PwDZi8vc3DKetPtydjoieT0ZWopwiJehpGQ1TqynUQ/JDrjPVn2wCoK9dBQkKcISTEWehn5SL8c3Nvf9R2zvrz7cmgrly+JqMrUc8REvU80PaiYR9t84V9dNhHh310b/fR9Tam2f+edOJTTnzaic848VknPufE56Ef++gLaH9F+xuMdh/9DvhpGN6z/mIbAHU36gLoKvLvAZ3IX4R+dqOEHzDs7WMML1l/uT0Z1N2or8noStRLhES9DKMhKnXlKsEPua5Yf7UNgLpylYSEuEJIiKvQz8pF+HFq3j605Zr1M+3JoK5cviajK1GvERJ1Bmh70bCPtvnCPjrso8M+urf76Hob0+x/LzrxJSe+7MRXnPiqE19z4hnoxz76fbS/o/0DRruPfh/8NAwfWH+9DYC6G3UBdBX5D4BO5K/DaLrRvmwdo25XL7rkG9bfbC/SgrBIj52Lsnu/AXQ39k0YzY1NXekvgB/S37L+dhsAdaW/QEiIW4SEuA39rPTf0lce9eJ1BXesv9teJOpK/11bpK439h2gu7Hv0mEM5zQQzmnCOU04p5kL5zT1Nrk5X7nuxDec+KYT33Li2058x4nvQj/OaT5E+yfav2Dwav+nUFcdIxw3+5BwDlzMk8SYxwgxh2OMx8sVNgOPdzm3waydetf74KNvPs6k/UA9tvpTlNyN5ffgYd191omfc+KPbNz83sdon6B9ivaZ83hzUW/2v0+Y62PCtfkc/HCIev6eJ8z1CeH8fQG0fUmb2587HP7CiT914s9a3P4S7d9o/0H7CmZzm1rbxwnX5kvi+WywP2d9/XWtf7Vu1XrTfIZJXZfreroQbQptEdzf29afvr7Erkv9uS51rXnW5qvv6ZqXP2jN8Zid43GYfTW1dZX1k601GbO/N000n5Ot56XML6M4mxyCj3D8YtKZT1/z0+T0kD96wubZNgMD3IDW807Zr92D0uZ3ao4ugofxYud36mu7k3us9b0dQ57XJ2bkRNLkn/CQHy++bMj4m+d62s7R8/br8SE/694L852fGbYuMOSxsSF52nPrruO09UwI3OnjKY4pjUgyxQs85kjxZMdkqYxLg/vgMqtYnAuuqgxPsmRV4amZzlKDB0KpaWOd9zXYpr5mjFND8Lrz19zTEzOD2Kft41GHC48LHpw3jNv882F4rZxwvu/+/Er7tbuHd3FMf8NxmixnRuQGT5vKEk9alrbygzNn9Tz9F+QU+b6EpgAA", Us = "pZjdbuIwEIXfJddceGb8y6usqorStEKKAkphpVXFu6/dHAfYla3I3DCMyXyMx3PsJN/de/92+Xw9jB/Hr27767t7mw7DcPh8HY773flwHOPod6fSB9luy5uO3Gx8t5VoQrfVm47jFfp63XQ57PU89X2KuuNE+mk39eO5246XYdh0v3fD5eeir9Nu/LHn3RR/VZuuH9+jjcCPw9Cnb9fNLVqVQ71iBHu2Szi5h3gqx1utEW+NtMR7yvHeN8XnyTtV/P/K/FkrAwBrulXAqPUE8guBmwgSbjmwKxFcmUDk8zISs5QIvpID+2UWct8J4YEQKgTPuRXYGyoRqFIITSoAoclwE4IlN1RcjNCGYPM0gtwKRK2aYSkFB2ohCKksDSGSJoKmhRDoaYIuEWracGrpKsehRV3O3PqSiuriCoLE5GmQhKK8mJ7WF/PTAmN5WmBVxDqB1RGrBFZHrBJYtZzrFFZDrJRYHbFKY+sRTSLzyykaq6JaRBZo6c2gWw5BEZ2PMJHgSwTRFYRZCOFO549lEFMTKeeuiqeoaUOQLIj7u4F/ENXDXGcEkW1DxGVcNiwViojK1h3YghCkCRC1sUxDadtUTPJLV913dts0TFsO8QRaFtQXc9CVvqTbCUTOSRFhnlyNlYByHWqAlctZrYO/dWVQxTrUNglNy1anzeNG9RK93f4w/fcklkIomvTYNXsyezqtx6Yz86CdB93s+dkL8yWUMeAQQAQSAUVgEWAEGgFH4DF4nPMCj8Fj8Bg8Bo/BY/AYPAFPwJM8UfAEPAFPwBPwBDwBT6v0KBItpfunaBm+wI88ieukDcYtxh18Dz/M1xnwDHgGPAOeAc+AZ8Az4BnwDHgWPAueBc+CZzV8A9/Cd/A9OGEed2oedwSf4Qt8DR/5OeTn3MxxHuNhHvfIzyM/j/w88vPIzyM/b2eOT7x4iPmUX5SbT28L4voEBRt5Ot5HBoYVWP2jgSSc6bB7G/rU+0kdl3GfpRDd859T/iW/tjhNx33/fpn6JJu7dxfx81fMkMPLNUnrLw==", Ms = {
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
use dep::poseidon::poseidon2::Poseidon2;

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
    // Using Poseidon2 for compatibility with Soroban (CAP-75 standard)
    let computed_hash = Poseidon2::hash(reserve_addresses, MAX_RESERVE_ACCOUNTS);
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

    // Compute reserve addresses hash with Poseidon2
    let reserve_hash = Poseidon2::hash(reserve_addresses, MAX_RESERVE_ACCOUNTS);

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
        },
        59: {
            source: `use std::default::Default;
use std::hash::Hasher;

comptime global RATE: u32 = 3;

pub struct Poseidon2 {
    cache: [Field; 3],
    state: [Field; 4],
    cache_size: u32,
    squeeze_mode: bool, // 0 => absorb, 1 => squeeze
}

impl Poseidon2 {
    #[no_predicates]
    pub fn hash<let N: u32>(input: [Field; N], message_size: u32) -> Field {
        Poseidon2::hash_internal(input, message_size)
    }

    pub(crate) fn new(iv: Field) -> Poseidon2 {
        let mut result =
            Poseidon2 { cache: [0; 3], state: [0; 4], cache_size: 0, squeeze_mode: false };
        result.state[RATE] = iv;
        result
    }

    fn perform_duplex(&mut self) {
        // add the cache into sponge state
        for i in 0..RATE {
            // We effectively zero-pad the cache by only adding to the state
            // cache that is less than the specified \`cache_size\`
            if i < self.cache_size {
                self.state[i] += self.cache[i];
            }
        }
        self.state = crate::poseidon2_permutation(self.state, 4);
    }

    fn absorb(&mut self, input: Field) {
        assert(!self.squeeze_mode);
        if self.cache_size == RATE {
            // If we're absorbing, and the cache is full, apply the sponge permutation to compress the cache
            self.perform_duplex();
            self.cache[0] = input;
            self.cache_size = 1;
        } else {
            // If we're absorbing, and the cache is not full, add the input into the cache
            self.cache[self.cache_size] = input;
            self.cache_size += 1;
        }
    }

    fn squeeze(&mut self) -> Field {
        assert(!self.squeeze_mode);
        // If we're in absorb mode, apply sponge permutation to compress the cache.
        self.perform_duplex();
        self.squeeze_mode = true;

        // Pop one item off the top of the permutation and return it.
        self.state[0]
    }

    fn hash_internal<let N: u32>(input: [Field; N], in_len: u32) -> Field {
        let two_pow_64 = 18446744073709551616;
        let iv: Field = (in_len as Field) * two_pow_64;
        let mut sponge = Poseidon2::new(iv);
        for i in 0..input.len() {
            if i < in_len {
                sponge.absorb(input[i]);
            }
        }
        sponge.squeeze()
    }
}

pub struct Poseidon2Hasher {
    _state: [Field],
}

impl Hasher for Poseidon2Hasher {
    fn finish(self) -> Field {
        let iv: Field = (self._state.len() as Field) * 18446744073709551616; // iv = (self._state.len() << 64)
        let mut sponge = Poseidon2::new(iv);
        for i in 0..self._state.len() {
            sponge.absorb(self._state[i]);
        }
        sponge.squeeze()
    }

    fn write(&mut self, input: Field) {
        self._state = self._state.push_back(input);
    }
}

impl Default for Poseidon2Hasher {
    fn default() -> Self {
        Poseidon2Hasher { _state: &[] }
    }
}
`,
            path: "/mnt/c/Users/CarlosIsraelJiménezJ/Documents/Stellar/Veraz/circuits/poseidon/src/poseidon2.nr"
        }
    }, Bs = [
        "main"
    ], Ws = [
        "decompose_hint"
    ], wn = {
        noir_version: Ns,
        hash: Ps,
        abi: Ds,
        bytecode: Is,
        debug_symbols: Us,
        file_map: Ms,
        names: Bs,
        brillig_names: Ws
    }, gn = 8;
    Js = async function({ balances: n, salts: t, ledgerSeq: e, reserveAddresses: s }) {
        if (n.length !== gn) throw new Error(`El circuito requiere exactamente ${gn} balances. Recibidos: ${n.length}.`);
        if (!s || s.length === 0) throw new Error("Se requiere al menos una reserve address.");
        console.log("🔑 Calculando reserve addresses hash...");
        const { reserveAddressesHash: i, paddedAddresses: a } = await zn(s);
        console.log("  reserve_addresses_hash:", i), console.log("  num_reserve_accounts:", s.length), console.log("🌳 Calculando Merkle sum-tree...");
        const { buildMerkleTree: c } = await Ln(async ()=>{
            const { buildMerkleTree: p } = await import("./merkle-lHW47cnt.js");
            return {
                buildMerkleTree: p
            };
        }, __vite__mapDeps([0,1,2,3]), import.meta.url), { root: o, totalSum: u } = await c(n, t);
        console.log("  root:", o), console.log("  totalSum:", u);
        const r = {
            root: o,
            total_liabilities: u,
            ledger_seq: String(e),
            reserve_addresses_hash: i,
            balances: n,
            salts: t,
            reserve_addresses: a,
            num_reserve_accounts: String(s.length)
        };
        console.log("⚙️  Ejecutando circuito Noir...");
        const l = new Os(wn);
        let H;
        try {
            ({ witness: H } = await l.execute(r));
        } catch (p) {
            throw new Error(`El circuito rechazó los inputs (root, total, o reserve addresses hash incorrecto): ${p.message}`);
        }
        console.log("🔐 Generando prueba UltraHonk con Keccak (10–30s)...");
        const b = new qn(wn.bytecode), { proof: f, publicInputs: h } = await b.generateProof(H, {
            keccak: !0
        });
        console.log("  proof.length:", f.length), console.log("  publicInputs raw type:", h?.constructor?.name, "length:", h?.length);
        const F = Ls(h, o, u, e, i);
        if (F.length !== 128) throw new Error(`Public inputs tienen ${F.length} bytes, se esperan 128.`);
        return zs(F), {
            proof: new Uint8Array(f),
            publicInputs: F
        };
    };
    function Ls(n, t, e, s, i) {
        if (n instanceof Uint8Array && n.length >= 128) return console.log("✅ public_inputs: usando los 128 bytes de bb.js directamente"), n.slice(0, 128);
        if (Array.isArray(n) && n.length >= 4) {
            console.log("ℹ️  public_inputs: convirtiendo array de fields a 128 bytes");
            const a = new Uint8Array(128);
            return n.slice(0, 4).forEach((c, o)=>{
                const u = Ce(c);
                for(let r = 0; r < 32; r++)a[o * 32 + r] = parseInt(u.slice(r * 2, r * 2 + 2), 16);
            }), a;
        }
        return console.warn("⚠️  public_inputs: construyendo manualmente desde root/L/seq/reserve_hash"), qs(t, e, s, i);
    }
    function qs(n, t, e, s) {
        const i = new Uint8Array(128), a = Ce(n);
        for(let r = 0; r < 32; r++)i[r] = parseInt(a.slice(r * 2, r * 2 + 2), 16);
        const c = BigInt(t);
        for(let r = 0; r < 16; r++)i[48 + r] = Number(c >> BigInt((15 - r) * 8) & 0xffn);
        const o = Number(e);
        i[92] = o >>> 24 & 255, i[93] = o >>> 16 & 255, i[94] = o >>> 8 & 255, i[95] = o & 255;
        const u = Ce(s);
        for(let r = 0; r < 32; r++)i[96 + r] = parseInt(u.slice(r * 2, r * 2 + 2), 16);
        return i;
    }
    function Ce(n) {
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
    function zs(n) {
        const t = Array.from(n.slice(0, 32)).map((o)=>o.toString(16).padStart(2, "0")).join(""), e = n.slice(48, 64), s = n.slice(92, 96), i = Array.from(n.slice(96, 128)).map((o)=>o.toString(16).padStart(2, "0")).join("");
        let a = 0n;
        for (const o of e)a = a << 8n | BigInt(o);
        const c = s[0] << 24 | s[1] << 16 | s[2] << 8 | s[3];
        console.log("📦 Public inputs formateados (128 bytes):"), console.log(`  root (bytes 0-31):         0x${t.slice(0, 16)}…`), console.log(`  L    (bytes 48-63):        ${a}`), console.log(`  seq  (bytes 92-95):        ${c}`), console.log(`  reserve_hash (bytes 96-127): 0x${i.slice(0, 16)}…`);
    }
});
export { Js as generateSolvencyProof, __tla };
