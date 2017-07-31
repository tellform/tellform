"use strict";

!function(a, b, c) {
    function d(a) {
        return function() {
            var b, c = arguments[0];
            for (b = "[" + (a ? a + ":" : "") + c + "] http://errors.angularjs.org/1.4.14/" + (a ? a + "/" : "") + c, 
            c = 1; c < arguments.length; c++) {
                b = b + (1 == c ? "?" : "&") + "p" + (c - 1) + "=";
                var d, e = encodeURIComponent;
                d = arguments[c], d = "function" == typeof d ? d.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof d ? "undefined" : "string" != typeof d ? JSON.stringify(d) : d, 
                b += e(d);
            }
            return Error(b);
        };
    }
    function e(a) {
        if (null == a || B(a)) return !1;
        if (ed(a) || w(a) || Qc && a instanceof Qc) return !0;
        var b = "length" in Object(a) && a.length;
        return x(b) && (0 <= b && (b - 1 in a || a instanceof Array) || "function" == typeof a.item);
    }
    function f(a, b, c) {
        var d, g;
        if (a) if (z(a)) for (d in a) "prototype" == d || "length" == d || "name" == d || a.hasOwnProperty && !a.hasOwnProperty(d) || b.call(c, a[d], d, a); else if (ed(a) || e(a)) {
            var h = "object" != typeof a;
            for (d = 0, g = a.length; d < g; d++) (h || d in a) && b.call(c, a[d], d, a);
        } else if (a.forEach && a.forEach !== f) a.forEach(b, c, a); else if (v(a)) for (d in a) b.call(c, a[d], d, a); else if ("function" == typeof a.hasOwnProperty) for (d in a) a.hasOwnProperty(d) && b.call(c, a[d], d, a); else for (d in a) Vc.call(a, d) && b.call(c, a[d], d, a);
        return a;
    }
    function g(a, b, c) {
        for (var d = Object.keys(a).sort(), e = 0; e < d.length; e++) b.call(c, a[d[e]], d[e]);
        return d;
    }
    function h(a) {
        return function(b, c) {
            a(c, b);
        };
    }
    function i() {
        return ++cd;
    }
    function j(a, b, c) {
        for (var d = a.$$hashKey, e = 0, f = b.length; e < f; ++e) {
            var g = b[e];
            if (u(g) || z(g)) for (var h = Object.keys(g), i = 0, k = h.length; i < k; i++) {
                var l = h[i], m = g[l];
                c && u(m) ? y(m) ? a[l] = new Date(m.valueOf()) : A(m) ? a[l] = new RegExp(m) : m.nodeName ? a[l] = m.cloneNode(!0) : F(m) ? a[l] = m.clone() : (u(a[l]) || (a[l] = ed(m) ? [] : {}), 
                j(a[l], [ m ], !0)) : a[l] = m;
            }
        }
        return d ? a.$$hashKey = d : delete a.$$hashKey, a;
    }
    function k(a) {
        return j(a, Xc.call(arguments, 1), !1);
    }
    function l(a) {
        return j(a, Xc.call(arguments, 1), !0);
    }
    function m(a) {
        return parseInt(a, 10);
    }
    function n(a, b) {
        return k(Object.create(a), b);
    }
    function o() {}
    function p(a) {
        return a;
    }
    function q(a) {
        return function() {
            return a;
        };
    }
    function r(a) {
        return z(a.toString) && a.toString !== $c;
    }
    function s(a) {
        return "undefined" == typeof a;
    }
    function t(a) {
        return "undefined" != typeof a;
    }
    function u(a) {
        return null !== a && "object" == typeof a;
    }
    function v(a) {
        return null !== a && "object" == typeof a && !_c(a);
    }
    function w(a) {
        return "string" == typeof a;
    }
    function x(a) {
        return "number" == typeof a;
    }
    function y(a) {
        return "[object Date]" === $c.call(a);
    }
    function z(a) {
        return "function" == typeof a;
    }
    function A(a) {
        return "[object RegExp]" === $c.call(a);
    }
    function B(a) {
        return a && a.window === a;
    }
    function C(a) {
        return a && a.$evalAsync && a.$watch;
    }
    function D(a) {
        return "boolean" == typeof a;
    }
    function E(a) {
        return a && x(a.length) && fd.test($c.call(a));
    }
    function F(a) {
        return !(!a || !(a.nodeName || a.prop && a.attr && a.find));
    }
    function G(a) {
        var b = {};
        a = a.split(",");
        var c;
        for (c = 0; c < a.length; c++) b[a[c]] = !0;
        return b;
    }
    function H(a) {
        return Uc(a.nodeName || a[0] && a[0].nodeName);
    }
    function I(a, b) {
        var c = a.indexOf(b);
        return 0 <= c && a.splice(c, 1), c;
    }
    function J(a, b) {
        function c(a, b) {
            var c, e = b.$$hashKey;
            if (ed(a)) {
                c = 0;
                for (var f = a.length; c < f; c++) b.push(d(a[c]));
            } else if (v(a)) for (c in a) b[c] = d(a[c]); else if (a && "function" == typeof a.hasOwnProperty) for (c in a) a.hasOwnProperty(c) && (b[c] = d(a[c])); else for (c in a) Vc.call(a, c) && (b[c] = d(a[c]));
            return e ? b.$$hashKey = e : delete b.$$hashKey, b;
        }
        function d(a) {
            if (!u(a)) return a;
            var b = e.indexOf(a);
            if (-1 !== b) return g[b];
            if (B(a) || C(a)) throw ad("cpws");
            var d, b = !1;
            return ed(a) ? (d = [], b = !0) : E(a) ? d = new a.constructor(a) : y(a) ? d = new Date(a.getTime()) : A(a) ? (d = new RegExp(a.source, a.toString().match(/[^\/]*$/)[0]), 
            d.lastIndex = a.lastIndex) : "[object Blob]" === $c.call(a) ? d = new a.constructor([ a ], {
                type: a.type
            }) : z(a.cloneNode) ? d = a.cloneNode(!0) : (d = Object.create(_c(a)), b = !0), 
            e.push(a), g.push(d), b ? c(a, d) : d;
        }
        var e = [], g = [];
        if (b) {
            if (E(b)) throw ad("cpta");
            if (a === b) throw ad("cpi");
            return ed(b) ? b.length = 0 : f(b, function(a, c) {
                "$$hashKey" !== c && delete b[c];
            }), e.push(a), g.push(b), c(a, b);
        }
        return d(a);
    }
    function K(a, b) {
        if (ed(a)) {
            b = b || [];
            for (var c = 0, d = a.length; c < d; c++) b[c] = a[c];
        } else if (u(a)) for (c in b = b || {}, a) "$" === c.charAt(0) && "$" === c.charAt(1) || (b[c] = a[c]);
        return b || a;
    }
    function L(a, b) {
        if (a === b) return !0;
        if (null === a || null === b) return !1;
        if (a !== a && b !== b) return !0;
        var c, d = typeof a;
        if (d == typeof b && "object" == d) {
            if (!ed(a)) {
                if (y(a)) return !!y(b) && L(a.getTime(), b.getTime());
                if (A(a)) return !!A(b) && a.toString() == b.toString();
                if (C(a) || C(b) || B(a) || B(b) || ed(b) || y(b) || A(b)) return !1;
                d = ja();
                for (c in a) if ("$" !== c.charAt(0) && !z(a[c])) {
                    if (!L(a[c], b[c])) return !1;
                    d[c] = !0;
                }
                for (c in b) if (!(c in d) && "$" !== c.charAt(0) && t(b[c]) && !z(b[c])) return !1;
                return !0;
            }
            if (!ed(b)) return !1;
            if ((d = a.length) == b.length) {
                for (c = 0; c < d; c++) if (!L(a[c], b[c])) return !1;
                return !0;
            }
        }
        return !1;
    }
    function M(a, b, c) {
        return a.concat(Xc.call(b, c));
    }
    function N(a, b) {
        var c = 2 < arguments.length ? Xc.call(arguments, 2) : [];
        return !z(b) || b instanceof RegExp ? b : c.length ? function() {
            return arguments.length ? b.apply(a, M(c, arguments, 0)) : b.apply(a, c);
        } : function() {
            return arguments.length ? b.apply(a, arguments) : b.call(a);
        };
    }
    function O(a, d) {
        var e = d;
        return "string" == typeof a && "$" === a.charAt(0) && "$" === a.charAt(1) ? e = c : B(d) ? e = "$WINDOW" : d && b === d ? e = "$DOCUMENT" : C(d) && (e = "$SCOPE"), 
        e;
    }
    function P(a, b) {
        return s(a) ? c : (x(b) || (b = b ? 2 : null), JSON.stringify(a, O, b));
    }
    function Q(a) {
        return w(a) ? JSON.parse(a) : a;
    }
    function R(a, b) {
        a = a.replace(kd, "");
        var c = Date.parse("Jan 01, 1970 00:00:00 " + a) / 6e4;
        return isNaN(c) ? b : c;
    }
    function S(a, b, c) {
        c = c ? -1 : 1;
        var d = a.getTimezoneOffset();
        return b = R(b, d), c *= b - d, a = new Date(a.getTime()), a.setMinutes(a.getMinutes() + c), 
        a;
    }
    function T(a) {
        a = Qc(a).clone();
        try {
            a.empty();
        } catch (b) {}
        var c = Qc("<div>").append(a).html();
        try {
            return a[0].nodeType === od ? Uc(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
                return "<" + Uc(b);
            });
        } catch (d) {
            return Uc(c);
        }
    }
    function U(a) {
        try {
            return decodeURIComponent(a);
        } catch (b) {}
    }
    function V(a) {
        var b = {};
        return f((a || "").split("&"), function(a) {
            var c, d, e;
            a && (d = a = a.replace(/\+/g, "%20"), c = a.indexOf("="), -1 !== c && (d = a.substring(0, c), 
            e = a.substring(c + 1)), d = U(d), t(d) && (e = !t(e) || U(e), Vc.call(b, d) ? ed(b[d]) ? b[d].push(e) : b[d] = [ b[d], e ] : b[d] = e));
        }), b;
    }
    function W(a) {
        var b = [];
        return f(a, function(a, c) {
            ed(a) ? f(a, function(a) {
                b.push(Y(c, !0) + (!0 === a ? "" : "=" + Y(a, !0)));
            }) : b.push(Y(c, !0) + (!0 === a ? "" : "=" + Y(a, !0)));
        }), b.length ? b.join("&") : "";
    }
    function X(a) {
        return Y(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
    }
    function Y(a, b) {
        return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, b ? "%20" : "+");
    }
    function Z(a, b) {
        var c, d, e = ld.length;
        for (d = 0; d < e; ++d) if (c = ld[d] + b, w(c = a.getAttribute(c))) return c;
        return null;
    }
    function $(a, b) {
        var c, d, e = {};
        f(ld, function(b) {
            b += "app", !c && a.hasAttribute && a.hasAttribute(b) && (c = a, d = a.getAttribute(b));
        }), f(ld, function(b) {
            b += "app";
            var e;
            !c && (e = a.querySelector("[" + b.replace(":", "\\:") + "]")) && (c = e, d = e.getAttribute(b));
        }), c && (e.strictDi = null !== Z(c, "strict-di"), b(c, d ? [ d ] : [], e));
    }
    function _(c, d, e) {
        u(e) || (e = {}), e = k({
            strictDi: !1
        }, e);
        var g = function() {
            if (c = Qc(c), c.injector()) {
                var a = c[0] === b ? "document" : T(c);
                throw ad("btstrpd", a.replace(/</, "&lt;").replace(/>/, "&gt;"));
            }
            return d = d || [], d.unshift([ "$provide", function(a) {
                a.value("$rootElement", c);
            } ]), e.debugInfoEnabled && d.push([ "$compileProvider", function(a) {
                a.debugInfoEnabled(!0);
            } ]), d.unshift("ng"), a = Oa(d, e.strictDi), a.invoke([ "$rootScope", "$rootElement", "$compile", "$injector", function(a, b, c, d) {
                a.$apply(function() {
                    b.data("$injector", d), c(b)(a);
                });
            } ]), a;
        }, h = /^NG_ENABLE_DEBUG_INFO!/, i = /^NG_DEFER_BOOTSTRAP!/;
        return a && h.test(a.name) && (e.debugInfoEnabled = !0, a.name = a.name.replace(h, "")), 
        a && !i.test(a.name) ? g() : (a.name = a.name.replace(i, ""), bd.resumeBootstrap = function(a) {
            return f(a, function(a) {
                d.push(a);
            }), g();
        }, void (z(bd.resumeDeferredBootstrap) && bd.resumeDeferredBootstrap()));
    }
    function aa() {
        a.name = "NG_ENABLE_DEBUG_INFO!" + a.name, a.location.reload();
    }
    function ba(a) {
        if (a = bd.element(a).injector(), !a) throw ad("test");
        return a.get("$$testability");
    }
    function ca(a, b) {
        return b = b || "_", a.replace(md, function(a, c) {
            return (c ? b : "") + a.toLowerCase();
        });
    }
    function da() {
        var b;
        if (!nd) {
            var d = jd();
            (Rc = s(d) ? a.jQuery : d ? a[d] : c) && Rc.fn.on ? (Qc = Rc, k(Rc.fn, {
                scope: Cd.scope,
                isolateScope: Cd.isolateScope,
                controller: Cd.controller,
                injector: Cd.injector,
                inheritedData: Cd.inheritedData
            }), b = Rc.cleanData, Rc.cleanData = function(a) {
                var c;
                if (dd) dd = !1; else for (var d, e = 0; null != (d = a[e]); e++) (c = Rc._data(d, "events")) && c.$destroy && Rc(d).triggerHandler("$destroy");
                b(a);
            }) : Qc = qa, bd.element = Qc, nd = !0;
        }
    }
    function ea(a, b, c) {
        if (!a) throw ad("areq", b || "?", c || "required");
        return a;
    }
    function fa(a, b, c) {
        return c && ed(a) && (a = a[a.length - 1]), ea(z(a), b, "not a function, got " + (a && "object" == typeof a ? a.constructor.name || "Object" : typeof a)), 
        a;
    }
    function ga(a, b) {
        if ("hasOwnProperty" === a) throw ad("badname", b);
    }
    function ha(a, b, c) {
        if (!b) return a;
        b = b.split(".");
        for (var d, e = a, f = b.length, g = 0; g < f; g++) d = b[g], a && (a = (e = a)[d]);
        return !c && z(a) ? N(e, a) : a;
    }
    function ia(a) {
        for (var b, c = a[0], d = a[a.length - 1], e = 1; c !== d && (c = c.nextSibling); e++) (b || a[e] !== c) && (b || (b = Qc(Xc.call(a, 0, e))), 
        b.push(c));
        return b || a;
    }
    function ja() {
        return Object.create(null);
    }
    function ka(a) {
        function b(a, b, c) {
            return a[b] || (a[b] = c());
        }
        var c = d("$injector"), e = d("ng");
        return a = b(a, "angular", Object), a.$$minErr = a.$$minErr || d, b(a, "module", function() {
            var a = {};
            return function(d, f, g) {
                if ("hasOwnProperty" === d) throw e("badname", "module");
                return f && a.hasOwnProperty(d) && (a[d] = null), b(a, d, function() {
                    function a(a, b, c, d) {
                        return d || (d = e), function() {
                            return d[c || "push"]([ a, b, arguments ]), k;
                        };
                    }
                    function b(a, b) {
                        return function(c, f) {
                            return f && z(f) && (f.$$moduleName = d), e.push([ a, b, arguments ]), k;
                        };
                    }
                    if (!f) throw c("nomod", d);
                    var e = [], h = [], i = [], j = a("$injector", "invoke", "push", h), k = {
                        _invokeQueue: e,
                        _configBlocks: h,
                        _runBlocks: i,
                        requires: f,
                        name: d,
                        provider: b("$provide", "provider"),
                        factory: b("$provide", "factory"),
                        service: b("$provide", "service"),
                        value: a("$provide", "value"),
                        constant: a("$provide", "constant", "unshift"),
                        decorator: b("$provide", "decorator"),
                        animation: b("$animateProvider", "register"),
                        filter: b("$filterProvider", "register"),
                        controller: b("$controllerProvider", "register"),
                        directive: b("$compileProvider", "directive"),
                        config: j,
                        run: function(a) {
                            return i.push(a), this;
                        }
                    };
                    return g && j(g), k;
                });
            };
        });
    }
    function la(b) {
        k(b, {
            bootstrap: _,
            copy: J,
            extend: k,
            merge: l,
            equals: L,
            element: Qc,
            forEach: f,
            injector: Oa,
            noop: o,
            bind: N,
            toJson: P,
            fromJson: Q,
            identity: p,
            isUndefined: s,
            isDefined: t,
            isString: w,
            isFunction: z,
            isObject: u,
            isNumber: x,
            isElement: F,
            isArray: ed,
            version: pd,
            isDate: y,
            lowercase: Uc,
            uppercase: Wc,
            callbacks: {
                counter: 0
            },
            getTestability: ba,
            $$minErr: d,
            $$csp: id,
            reloadWithDebugInfo: aa
        }), (Sc = ka(a))("ng", [ "ngLocale" ], [ "$provide", function(a) {
            a.provider({
                $$sanitizeUri: Yb
            }), a.provider("$compile", Xa).directive({
                a: Ee,
                input: Ve,
                textarea: Ve,
                form: Ie,
                script: Kf,
                select: Nf,
                style: Pf,
                option: Of,
                ngBind: Ye,
                ngBindHtml: $e,
                ngBindTemplate: Ze,
                ngClass: af,
                ngClassEven: cf,
                ngClassOdd: bf,
                ngCloak: df,
                ngController: ef,
                ngForm: Je,
                ngHide: Ef,
                ngIf: hf,
                ngInclude: jf,
                ngInit: lf,
                ngNonBindable: xf,
                ngPluralize: Bf,
                ngRepeat: Cf,
                ngShow: Df,
                ngStyle: Ff,
                ngSwitch: Gf,
                ngSwitchWhen: Hf,
                ngSwitchDefault: If,
                ngOptions: Af,
                ngTransclude: Jf,
                ngModel: uf,
                ngList: mf,
                ngChange: _e,
                pattern: Rf,
                ngPattern: Rf,
                required: Qf,
                ngRequired: Qf,
                minlength: Tf,
                ngMinlength: Tf,
                maxlength: Sf,
                ngMaxlength: Sf,
                ngValue: Xe,
                ngModelOptions: wf
            }).directive({
                ngInclude: kf
            }).directive(Fe).directive(ff), a.provider({
                $anchorScroll: Pa,
                $animate: Pd,
                $animateCss: Sd,
                $$animateJs: Nd,
                $$animateQueue: Od,
                $$AnimateRunner: Rd,
                $$animateAsyncRun: Qd,
                $browser: Ua,
                $cacheFactory: Va,
                $controller: _a,
                $document: ab,
                $exceptionHandler: bb,
                $filter: kc,
                $$forceReflow: Xd,
                $interpolate: nb,
                $interval: ob,
                $http: jb,
                $httpParamSerializer: db,
                $httpParamSerializerJQLike: eb,
                $httpBackend: lb,
                $xhrFactory: kb,
                $location: Ab,
                $log: Bb,
                $parse: Sb,
                $rootScope: Xb,
                $q: Tb,
                $$q: Ub,
                $sce: ac,
                $sceDelegate: _b,
                $sniffer: bc,
                $templateCache: Wa,
                $templateRequest: cc,
                $$testability: dc,
                $timeout: ec,
                $window: hc,
                $$rAF: Wb,
                $$jqLite: Ka,
                $$HashMap: Gd,
                $$cookieReader: jc
            });
        } ]);
    }
    function ma(a) {
        return a.replace(sd, function(a, b, c, d) {
            return d ? c.toUpperCase() : c;
        }).replace(td, "Moz$1");
    }
    function na(a) {
        return a = a.nodeType, 1 === a || !a || 9 === a;
    }
    function oa(a, b) {
        var c, d, e = b.createDocumentFragment(), g = [];
        if (xd.test(a)) {
            for (c = c || e.appendChild(b.createElement("div")), d = (yd.exec(a) || [ "", "" ])[1].toLowerCase(), 
            d = Ad[d] || Ad._default, c.innerHTML = d[1] + a.replace(zd, "<$1></$2>") + d[2], 
            d = d[0]; d--; ) c = c.lastChild;
            g = M(g, c.childNodes), c = e.firstChild, c.textContent = "";
        } else g.push(b.createTextNode(a));
        return e.textContent = "", e.innerHTML = "", f(g, function(a) {
            e.appendChild(a);
        }), e;
    }
    function pa(a, b) {
        var c = a.parentNode;
        c && c.replaceChild(b, a), b.appendChild(a);
    }
    function qa(a) {
        if (a instanceof qa) return a;
        var c;
        if (w(a) && (a = gd(a), c = !0), !(this instanceof qa)) {
            if (c && "<" != a.charAt(0)) throw vd("nosel");
            return new qa(a);
        }
        if (c) {
            c = b;
            var d;
            a = (d = wd.exec(a)) ? [ c.createElement(d[1]) ] : (d = oa(a, c)) ? d.childNodes : [];
        }
        Aa(this, a);
    }
    function ra(a) {
        return a.cloneNode(!0);
    }
    function sa(a, b) {
        if (b || ua(a), a.querySelectorAll) for (var c = a.querySelectorAll("*"), d = 0, e = c.length; d < e; d++) ua(c[d]);
    }
    function ta(a, b, c, d) {
        if (t(d)) throw vd("offargs");
        var e = (d = va(a)) && d.events, g = d && d.handle;
        if (g) if (b) {
            var h = function(b) {
                var d = e[b];
                t(c) && I(d || [], c), t(c) && d && 0 < d.length || (a.removeEventListener(b, g, !1), 
                delete e[b]);
            };
            f(b.split(" "), function(a) {
                h(a), ud[a] && h(ud[a]);
            });
        } else for (b in e) "$destroy" !== b && a.removeEventListener(b, g, !1), delete e[b];
    }
    function ua(a, b) {
        var d = a.ng339, e = d && qd[d];
        e && (b ? delete e.data[b] : (e.handle && (e.events.$destroy && e.handle({}, "$destroy"), 
        ta(a)), delete qd[d], a.ng339 = c));
    }
    function va(a, b) {
        var d = a.ng339, d = d && qd[d];
        return b && !d && (a.ng339 = d = ++rd, d = qd[d] = {
            events: {},
            data: {},
            handle: c
        }), d;
    }
    function wa(a, b, c) {
        if (na(a)) {
            var d = t(c), e = !d && b && !u(b), f = !b;
            if (a = (a = va(a, !e)) && a.data, d) a[b] = c; else {
                if (f) return a;
                if (e) return a && a[b];
                k(a, b);
            }
        }
    }
    function xa(a, b) {
        return !!a.getAttribute && -1 < (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ");
    }
    function ya(a, b) {
        b && a.setAttribute && f(b.split(" "), function(b) {
            a.setAttribute("class", gd((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + gd(b) + " ", " ")));
        });
    }
    function za(a, b) {
        if (b && a.setAttribute) {
            var c = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            f(b.split(" "), function(a) {
                a = gd(a), -1 === c.indexOf(" " + a + " ") && (c += a + " ");
            }), a.setAttribute("class", gd(c));
        }
    }
    function Aa(a, b) {
        if (b) if (b.nodeType) a[a.length++] = b; else {
            var c = b.length;
            if ("number" == typeof c && b.window !== b) {
                if (c) for (var d = 0; d < c; d++) a[a.length++] = b[d];
            } else a[a.length++] = b;
        }
    }
    function Ba(a, b) {
        return Ca(a, "$" + (b || "ngController") + "Controller");
    }
    function Ca(a, b, c) {
        for (9 == a.nodeType && (a = a.documentElement), b = ed(b) ? b : [ b ]; a; ) {
            for (var d = 0, e = b.length; d < e; d++) if (t(c = Qc.data(a, b[d]))) return c;
            a = a.parentNode || 11 === a.nodeType && a.host;
        }
    }
    function Da(a) {
        for (sa(a, !0); a.firstChild; ) a.removeChild(a.firstChild);
    }
    function Ea(a, b) {
        b || sa(a);
        var c = a.parentNode;
        c && c.removeChild(a);
    }
    function Fa(b, c) {
        c = c || a, "complete" === c.document.readyState ? c.setTimeout(b) : Qc(c).on("load", b);
    }
    function Ga(a, b) {
        var c = Dd[b.toLowerCase()];
        return c && Ed[H(a)] && c;
    }
    function Ha(a, b) {
        var c = function(c, d) {
            c.isDefaultPrevented = function() {
                return c.defaultPrevented;
            };
            var e = b[d || c.type], f = e ? e.length : 0;
            if (f) {
                if (s(c.immediatePropagationStopped)) {
                    var g = c.stopImmediatePropagation;
                    c.stopImmediatePropagation = function() {
                        c.immediatePropagationStopped = !0, c.stopPropagation && c.stopPropagation(), g && g.call(c);
                    };
                }
                c.isImmediatePropagationStopped = function() {
                    return !0 === c.immediatePropagationStopped;
                };
                var h = e.specialHandlerWrapper || Ia;
                1 < f && (e = K(e));
                for (var i = 0; i < f; i++) c.isImmediatePropagationStopped() || h(a, c, e[i]);
            }
        };
        return c.elem = a, c;
    }
    function Ia(a, b, c) {
        c.call(a, b);
    }
    function Ja(a, b, c) {
        var d = b.relatedTarget;
        d && (d === a || Bd.call(a, d)) || c.call(a, b);
    }
    function Ka() {
        this.$get = function() {
            return k(qa, {
                hasClass: function(a, b) {
                    return a.attr && (a = a[0]), xa(a, b);
                },
                addClass: function(a, b) {
                    return a.attr && (a = a[0]), za(a, b);
                },
                removeClass: function(a, b) {
                    return a.attr && (a = a[0]), ya(a, b);
                }
            });
        };
    }
    function La(a, b) {
        var c = a && a.$$hashKey;
        return c ? ("function" == typeof c && (c = a.$$hashKey()), c) : (c = typeof a, c = "function" == c || "object" == c && null !== a ? a.$$hashKey = c + ":" + (b || i)() : c + ":" + a);
    }
    function Ma(a, b) {
        if (b) {
            var c = 0;
            this.nextUid = function() {
                return ++c;
            };
        }
        f(a, this.put, this);
    }
    function Na(a) {
        return (a = a.toString().replace(Kd, "").match(Hd)) ? "function(" + (a[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn";
    }
    function Oa(a, b) {
        function d(a) {
            return function(b, c) {
                return u(b) ? void f(b, h(a)) : a(b, c);
            };
        }
        function e(a, b) {
            if (ga(a, "service"), (z(b) || ed(b)) && (b = p.instantiate(b)), !b.$get) throw Ld("pget", a);
            return o[a + "Provider"] = b;
        }
        function g(a, b) {
            return function() {
                var c = t.invoke(b, this);
                if (s(c)) throw Ld("undef", a);
                return c;
            };
        }
        function i(a, b, c) {
            return e(a, {
                $get: !1 !== c ? g(a, b) : b
            });
        }
        function j(a) {
            ea(s(a) || ed(a), "modulesToLoad", "not an array");
            var b, c = [];
            return f(a, function(a) {
                function d(a) {
                    var b, c;
                    for (b = 0, c = a.length; b < c; b++) {
                        var d = a[b], e = p.get(d[0]);
                        e[d[1]].apply(e, d[2]);
                    }
                }
                if (!n.get(a)) {
                    n.put(a, !0);
                    try {
                        w(a) ? (b = Sc(a), c = c.concat(j(b.requires)).concat(b._runBlocks), d(b._invokeQueue), 
                        d(b._configBlocks)) : z(a) ? c.push(p.invoke(a)) : ed(a) ? c.push(p.invoke(a)) : fa(a, "module");
                    } catch (e) {
                        throw ed(a) && (a = a[a.length - 1]), e.message && e.stack && -1 == e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), 
                        Ld("modulerr", a, e.stack || e.message || e);
                    }
                }
            }), c;
        }
        function k(a, c) {
            function d(b, d) {
                if (a.hasOwnProperty(b)) {
                    if (a[b] === l) throw Ld("cdep", b + " <- " + m.join(" <- "));
                    return a[b];
                }
                try {
                    return m.unshift(b), a[b] = l, a[b] = c(b, d);
                } catch (e) {
                    throw a[b] === l && delete a[b], e;
                } finally {
                    m.shift();
                }
            }
            function e(a, c, e, f) {
                "string" == typeof e && (f = e, e = null);
                var g, h, i, j = [], k = Oa.$$annotate(a, b, f);
                for (h = 0, g = k.length; h < g; h++) {
                    if (i = k[h], "string" != typeof i) throw Ld("itkn", i);
                    j.push(e && e.hasOwnProperty(i) ? e[i] : d(i, f));
                }
                return ed(a) && (a = a[g]), a.apply(c, j);
            }
            return {
                invoke: e,
                instantiate: function(a, b, c) {
                    var d = Object.create((ed(a) ? a[a.length - 1] : a).prototype || null);
                    return a = e(a, d, b, c), u(a) || z(a) ? a : d;
                },
                get: d,
                annotate: Oa.$$annotate,
                has: function(b) {
                    return o.hasOwnProperty(b + "Provider") || a.hasOwnProperty(b);
                }
            };
        }
        b = !0 === b;
        var l = {}, m = [], n = new Ma([], (!0)), o = {
            $provide: {
                provider: d(e),
                factory: d(i),
                service: d(function(a, b) {
                    return i(a, [ "$injector", function(a) {
                        return a.instantiate(b);
                    } ]);
                }),
                value: d(function(a, b) {
                    return i(a, q(b), !1);
                }),
                constant: d(function(a, b) {
                    ga(a, "constant"), o[a] = b, r[a] = b;
                }),
                decorator: function(a, b) {
                    var c = p.get(a + "Provider"), d = c.$get;
                    c.$get = function() {
                        var a = t.invoke(d, c);
                        return t.invoke(b, null, {
                            $delegate: a
                        });
                    };
                }
            }
        }, p = o.$injector = k(o, function(a, b) {
            throw bd.isString(b) && m.push(b), Ld("unpr", m.join(" <- "));
        }), r = {}, t = r.$injector = k(r, function(a, b) {
            var d = p.get(a + "Provider", b);
            return t.invoke(d.$get, d, c, a);
        });
        return f(j(a), function(a) {
            a && t.invoke(a);
        }), t;
    }
    function Pa() {
        var a = !0;
        this.disableAutoScrolling = function() {
            a = !1;
        }, this.$get = [ "$window", "$location", "$rootScope", function(b, c, d) {
            function e(a) {
                var b = null;
                return Array.prototype.some.call(a, function(a) {
                    if ("a" === H(a)) return b = a, !0;
                }), b;
            }
            function f(a) {
                if (a) {
                    a.scrollIntoView();
                    var c;
                    c = g.yOffset, z(c) ? c = c() : F(c) ? (c = c[0], c = "fixed" !== b.getComputedStyle(c).position ? 0 : c.getBoundingClientRect().bottom) : x(c) || (c = 0), 
                    c && (a = a.getBoundingClientRect().top, b.scrollBy(0, a - c));
                } else b.scrollTo(0, 0);
            }
            function g(a) {
                a = w(a) ? a : c.hash();
                var b;
                a ? (b = h.getElementById(a)) ? f(b) : (b = e(h.getElementsByName(a))) ? f(b) : "top" === a && f(null) : f(null);
            }
            var h = b.document;
            return a && d.$watch(function() {
                return c.hash();
            }, function(a, b) {
                a === b && "" === a || Fa(function() {
                    d.$evalAsync(g);
                });
            }), g;
        } ];
    }
    function Qa(a, b) {
        return a || b ? a ? b ? (ed(a) && (a = a.join(" ")), ed(b) && (b = b.join(" ")), 
        a + " " + b) : a : b : "";
    }
    function Ra(a) {
        w(a) && (a = a.split(" "));
        var b = ja();
        return f(a, function(a) {
            a.length && (b[a] = !0);
        }), b;
    }
    function Sa(a) {
        return u(a) ? a : {};
    }
    function Ta(a, b, c, d) {
        function e(a) {
            try {
                a.apply(null, Xc.call(arguments, 1));
            } finally {
                if (q--, 0 === q) for (;r.length; ) try {
                    r.pop()();
                } catch (b) {
                    c.error(b);
                }
            }
        }
        function g() {
            x = null, h(), i();
        }
        function h() {
            a: {
                try {
                    t = l.state;
                    break a;
                } catch (a) {}
                t = void 0;
            }
            t = s(t) ? null : t, L(t, A) && (t = A), A = t;
        }
        function i() {
            v === j.url() && u === t || (v = j.url(), u = t, f(y, function(a) {
                a(j.url(), t);
            }));
        }
        var j = this, k = a.location, l = a.history, m = a.setTimeout, n = a.clearTimeout, p = {};
        j.isMock = !1;
        var q = 0, r = [];
        j.$$completeOutstandingRequest = e, j.$$incOutstandingRequestCount = function() {
            q++;
        }, j.notifyWhenNoOutstandingRequests = function(a) {
            0 === q ? a() : r.push(a);
        };
        var t, u, v = k.href, w = b.find("base"), x = null;
        h(), u = t, j.url = function(b, c, e) {
            if (s(e) && (e = null), k !== a.location && (k = a.location), l !== a.history && (l = a.history), 
            b) {
                var f = u === e;
                if (v === b && (!d.history || f)) return j;
                var g = v && tb(v) === tb(b);
                return v = b, u = e, !d.history || g && f ? (g && !x || (x = b), c ? k.replace(b) : g ? (c = k, 
                e = b.indexOf("#"), e = -1 === e ? "" : b.substr(e), c.hash = e) : k.href = b, k.href !== b && (x = b)) : (l[c ? "replaceState" : "pushState"](e, "", b), 
                h(), u = t), j;
            }
            return x || k.href.replace(/%27/g, "'");
        }, j.state = function() {
            return t;
        };
        var y = [], z = !1, A = null;
        j.onUrlChange = function(b) {
            return z || (d.history && Qc(a).on("popstate", g), Qc(a).on("hashchange", g), z = !0), 
            y.push(b), b;
        }, j.$$applicationDestroyed = function() {
            Qc(a).off("hashchange popstate", g);
        }, j.$$checkUrlChange = i, j.baseHref = function() {
            var a = w.attr("href");
            return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : "";
        }, j.defer = function(a, b) {
            var c;
            return q++, c = m(function() {
                delete p[c], e(a);
            }, b || 0), p[c] = !0, c;
        }, j.defer.cancel = function(a) {
            return !!p[a] && (delete p[a], n(a), e(o), !0);
        };
    }
    function Ua() {
        this.$get = [ "$window", "$log", "$sniffer", "$document", function(a, b, c, d) {
            return new Ta(a, d, b, c);
        } ];
    }
    function Va() {
        this.$get = function() {
            function a(a, c) {
                function e(a) {
                    a != m && (n ? n == a && (n = a.n) : n = a, f(a.n, a.p), f(a, m), m = a, m.n = null);
                }
                function f(a, b) {
                    a != b && (a && (a.p = b), b && (b.n = a));
                }
                if (a in b) throw d("$cacheFactory")("iid", a);
                var g = 0, h = k({}, c, {
                    id: a
                }), i = ja(), j = c && c.capacity || Number.MAX_VALUE, l = ja(), m = null, n = null;
                return b[a] = {
                    put: function(a, b) {
                        if (!s(b)) {
                            if (j < Number.MAX_VALUE) {
                                var c = l[a] || (l[a] = {
                                    key: a
                                });
                                e(c);
                            }
                            return a in i || g++, i[a] = b, g > j && this.remove(n.key), b;
                        }
                    },
                    get: function(a) {
                        if (j < Number.MAX_VALUE) {
                            var b = l[a];
                            if (!b) return;
                            e(b);
                        }
                        return i[a];
                    },
                    remove: function(a) {
                        if (j < Number.MAX_VALUE) {
                            var b = l[a];
                            if (!b) return;
                            b == m && (m = b.p), b == n && (n = b.n), f(b.n, b.p), delete l[a];
                        }
                        a in i && (delete i[a], g--);
                    },
                    removeAll: function() {
                        i = ja(), g = 0, l = ja(), m = n = null;
                    },
                    destroy: function() {
                        l = h = i = null, delete b[a];
                    },
                    info: function() {
                        return k({}, h, {
                            size: g
                        });
                    }
                };
            }
            var b = {};
            return a.info = function() {
                var a = {};
                return f(b, function(b, c) {
                    a[c] = b.info();
                }), a;
            }, a.get = function(a) {
                return b[a];
            }, a;
        };
    }
    function Wa() {
        this.$get = [ "$cacheFactory", function(a) {
            return a("templates");
        } ];
    }
    function Xa(a, d) {
        function e(a, b, c) {
            var d = /^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/, e = ja();
            return f(a, function(a, f) {
                if (a in x) e[f] = x[a]; else {
                    var g = a.match(d);
                    if (!g) throw Td("iscp", b, f, a, c ? "controller bindings definition" : "isolate scope definition");
                    e[f] = {
                        mode: g[1][0],
                        collection: "*" === g[2],
                        optional: "?" === g[3],
                        attrName: g[4] || f
                    }, g[4] && (x[a] = e[f]);
                }
            }), e;
        }
        function g(a) {
            var b = a.charAt(0);
            if (!b || b !== Uc(b)) throw Td("baddir", a);
            if (a !== a.trim()) throw Td("baddir", a);
        }
        var i = {}, j = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/, l = /(([\w\-]+)(?:\:([^;]+))?;?)/, m = G("ngSrc,ngSrcset,src,srcset"), r = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/, v = /^(on[a-z]+|formaction)$/, x = ja();
        this.directive = function A(b, c) {
            return ga(b, "directive"), w(b) ? (g(b), ea(c, "directiveFactory"), i.hasOwnProperty(b) || (i[b] = [], 
            a.factory(b + "Directive", [ "$injector", "$exceptionHandler", function(a, c) {
                var d = [];
                return f(i[b], function(e, f) {
                    try {
                        var g = a.invoke(e);
                        z(g) ? g = {
                            compile: q(g)
                        } : !g.compile && g.link && (g.compile = q(g.link)), g.priority = g.priority || 0, 
                        g.index = f, g.name = g.name || b, g.require = g.require || g.controller && g.name, 
                        g.restrict = g.restrict || "EA", g.$$moduleName = e.$$moduleName, d.push(g);
                    } catch (h) {
                        c(h);
                    }
                }), d;
            } ])), i[b].push(c)) : f(b, h(A)), this;
        }, this.aHrefSanitizationWhitelist = function(a) {
            return t(a) ? (d.aHrefSanitizationWhitelist(a), this) : d.aHrefSanitizationWhitelist();
        }, this.imgSrcSanitizationWhitelist = function(a) {
            return t(a) ? (d.imgSrcSanitizationWhitelist(a), this) : d.imgSrcSanitizationWhitelist();
        };
        var y = !0;
        this.debugInfoEnabled = function(a) {
            return t(a) ? (y = a, this) : y;
        }, this.$get = [ "$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$sce", "$animate", "$$sanitizeUri", function(a, d, g, h, q, x, A, B, E, F) {
            function G(a, b) {
                try {
                    a.addClass(b);
                } catch (c) {}
            }
            function J(a, c, d, e, f) {
                a instanceof Qc || (a = Qc(a));
                for (var g = /\S+/, h = 0, i = a.length; h < i; h++) {
                    var j = a[h];
                    j.nodeType === od && j.nodeValue.match(g) && pa(j, a[h] = b.createElement("span"));
                }
                var k = K(a, c, a, d, e, f);
                J.$$addScopeClass(a);
                var l = null;
                return function(b, c, d) {
                    ea(b, "scope"), f && f.needsNewScope && (b = b.$parent.$new()), d = d || {};
                    var e = d.parentBoundTranscludeFn, g = d.transcludeControllers;
                    if (d = d.futureParentElement, e && e.$$boundTransclude && (e = e.$$boundTransclude), 
                    l || (l = (d = d && d[0]) && "foreignobject" !== H(d) && d.toString().match(/SVG/) ? "svg" : "html"), 
                    d = "html" !== l ? Qc($(l, Qc("<div>").append(a).html())) : c ? Cd.clone.call(a) : a, 
                    g) for (var h in g) d.data("$" + h + "Controller", g[h].instance);
                    return J.$$addScopeInfo(d, b), c && c(d, b), k && k(b, d, d, e), d;
                };
            }
            function K(a, b, d, e, f, g) {
                function h(a, d, e, f) {
                    var g, h, i, j, k, l, o;
                    if (m) for (o = Array(d.length), j = 0; j < n.length; j += 3) g = n[j], o[g] = d[g]; else o = d;
                    for (j = 0, k = n.length; j < k; ) h = o[n[j++]], d = n[j++], g = n[j++], d ? (d.scope ? (i = a.$new(), 
                    J.$$addScopeInfo(Qc(h), i)) : i = a, l = d.transcludeOnThisElement ? M(a, d.transclude, f) : !d.templateOnThisElement && f ? f : !f && b ? M(a, b) : null, 
                    d(g, i, h, e, l)) : g && g(a, h.childNodes, c, f);
                }
                for (var i, j, k, l, m, n = [], o = 0; o < a.length; o++) i = new ha(), j = N(a[o], [], i, 0 === o ? e : c, f), 
                (g = j.length ? Q(j, a[o], i, b, d, null, [], [], g) : null) && g.scope && J.$$addScopeClass(i.$$element), 
                i = g && g.terminal || !(k = a[o].childNodes) || !k.length ? null : K(k, g ? (g.transcludeOnThisElement || !g.templateOnThisElement) && g.transclude : b), 
                (g || i) && (n.push(o, g, i), l = !0, m = m || g), g = null;
                return l ? h : null;
            }
            function M(a, b, c) {
                return function(d, e, f, g, h) {
                    return d || (d = a.$new(!1, h), d.$$transcluded = !0), b(d, e, {
                        parentBoundTranscludeFn: c,
                        transcludeControllers: f,
                        futureParentElement: g
                    });
                };
            }
            function N(a, b, c, d, e) {
                var f, g = c.$attr;
                switch (a.nodeType) {
                  case 1:
                    f = H(a), S(b, Ya(f), "E", d, e);
                    for (var h, i, k, m, n = a.attributes, o = 0, p = n && n.length; o < p; o++) {
                        var q = !1, r = !1;
                        h = n[o], i = h.name, k = gd(h.value), h = Ya(i), (m = ma.test(h)) && (i = i.replace(Ud, "").substr(8).replace(/_(.)/g, function(a, b) {
                            return b.toUpperCase();
                        })), (h = h.match(na)) && U(h[1]) && (q = i, r = i.substr(0, i.length - 5) + "end", 
                        i = i.substr(0, i.length - 6)), h = Ya(i.toLowerCase()), g[h] = i, !m && c.hasOwnProperty(h) || (c[h] = k, 
                        Ga(a, h) && (c[h] = !0)), aa(a, b, k, h, m), S(b, h, "A", d, e, q, r);
                    }
                    if ("input" === f && "hidden" === a.getAttribute("type") && a.setAttribute("autocomplete", "off"), 
                    a = a.className, u(a) && (a = a.animVal), w(a) && "" !== a) for (;f = l.exec(a); ) h = Ya(f[2]), 
                    S(b, h, "C", d, e) && (c[h] = gd(f[3])), a = a.substr(f.index + f[0].length);
                    break;

                  case od:
                    if (11 === Pc) for (;a.parentNode && a.nextSibling && a.nextSibling.nodeType === od; ) a.nodeValue += a.nextSibling.nodeValue, 
                    a.parentNode.removeChild(a.nextSibling);
                    Z(b, a.nodeValue);
                    break;

                  case 8:
                    try {
                        (f = j.exec(a.nodeValue)) && (h = Ya(f[1]), S(b, h, "M", d, e) && (c[h] = gd(f[2])));
                    } catch (s) {}
                }
                return b.sort(X), b;
            }
            function O(a, b, c) {
                var d = [], e = 0;
                if (b && a.hasAttribute && a.hasAttribute(b)) {
                    do {
                        if (!a) throw Td("uterdir", b, c);
                        1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--), d.push(a), 
                        a = a.nextSibling;
                    } while (0 < e);
                } else d.push(a);
                return Qc(d);
            }
            function P(a, b, c) {
                return function(d, e, f, g, h) {
                    return e = O(e[0], b, c), a(d, e, f, g, h);
                };
            }
            function Q(a, d, e, f, h, i, j, k, l) {
                function m(a, b, c, d) {
                    a && (c && (a = P(a, c, d)), a.require = q.require, a.directiveName = s, (D === q || q.$$isolateScope) && (a = da(a, {
                        isolateScope: !0
                    })), j.push(a)), b && (c && (b = P(b, c, d)), b.require = q.require, b.directiveName = s, 
                    (D === q || q.$$isolateScope) && (b = da(b, {
                        isolateScope: !0
                    })), k.push(b));
                }
                function n(a, b, c, d) {
                    var e;
                    if (w(b)) {
                        var f = b.match(r);
                        b = b.substring(f[0].length);
                        var g = f[1] || f[3], f = "?" === f[2];
                        if ("^^" === g ? c = c.parent() : e = (e = d && d[b]) && e.instance, e || (d = "$" + b + "Controller", 
                        e = g ? c.inheritedData(d) : c.data(d)), !e && !f) throw Td("ctreq", b, a);
                    } else if (ed(b)) for (e = [], g = 0, f = b.length; g < f; g++) e[g] = n(a, b[g], c, d);
                    return e || null;
                }
                function o(a, b, c, d, e, f) {
                    var g, h = ja();
                    for (g in d) {
                        var i = d[g], j = {
                            $scope: i === D || i.$$isolateScope ? e : f,
                            $element: a,
                            $attrs: b,
                            $transclude: c
                        }, k = i.controller;
                        "@" == k && (k = b[i.name]), j = x(k, j, !0, i.controllerAs), h[i.name] = j, a.data("$" + i.name + "Controller", j.instance);
                    }
                    return h;
                }
                function p(a, b, f, g, h) {
                    function i(a, b, d) {
                        var e;
                        return C(a) || (d = b, b = a, a = c), I && (e = q), d || (d = I ? s.parent() : s), 
                        h(a, b, e, d, y);
                    }
                    var l, m, p, q, r, s, t;
                    d === f ? (g = e, s = e.$$element) : (s = Qc(f), g = new ha(s, e)), p = b, D ? m = b.$new(!0) : A && (p = b.$parent), 
                    h && (r = i, r.$$boundTransclude = h), B && (q = o(s, g, r, B, m, b)), D && (J.$$addScopeInfo(s, m, !0, !(E && (E === D || E === D.$$originalDirective))), 
                    J.$$addScopeClass(s, !0), m.$$isolateBindings = D.$$isolateBindings, (t = ga(b, g, m, m.$$isolateBindings, D)) && m.$on("$destroy", t));
                    for (var u in q) {
                        t = B[u];
                        var v = q[u], w = t.$$bindings.bindToController;
                        v.identifier && w && (l = ga(p, g, v.instance, w, t));
                        var x = v();
                        x !== v.instance && (v.instance = x, s.data("$" + t.name + "Controller", x), l && l(), 
                        l = ga(p, g, v.instance, w, t));
                    }
                    for (M = 0, Q = j.length; M < Q; M++) l = j[M], fa(l, l.isolateScope ? m : b, s, g, l.require && n(l.directiveName, l.require, s, q), r);
                    var y = b;
                    for (D && (D.template || null === D.templateUrl) && (y = m), a && a(y, f.childNodes, c, h), 
                    M = k.length - 1; 0 <= M; M--) l = k[M], fa(l, l.isolateScope ? m : b, s, g, l.require && n(l.directiveName, l.require, s, q), r);
                }
                l = l || {};
                for (var q, s, t, v, y = -Number.MAX_VALUE, A = l.newScopeDirective, B = l.controllerDirectives, D = l.newIsolateScopeDirective, E = l.templateDirective, F = l.nonTlbTranscludeDirective, G = !1, H = !1, I = l.hasElementTranscludeDirective, K = e.$$element = Qc(d), L = f, M = 0, Q = a.length; M < Q; M++) {
                    q = a[M];
                    var S = q.$$start, U = q.$$end;
                    if (S && (K = O(d, S, U)), t = c, y > q.priority) break;
                    if ((t = q.scope) && (q.templateUrl || (u(t) ? (Y("new/isolated scope", D || A, q, K), 
                    D = q) : Y("new/isolated scope", D, q, K)), A = A || q), s = q.name, !q.templateUrl && q.controller && (t = q.controller, 
                    B = B || ja(), Y("'" + s + "' controller", B[s], q, K), B[s] = q), (t = q.transclude) && (G = !0, 
                    q.$$tlb || (Y("transclusion", F, q, K), F = q), "element" == t ? (I = !0, y = q.priority, 
                    t = K, K = e.$$element = Qc(b.createComment(" " + s + ": " + e[s] + " ")), d = K[0], 
                    ba(h, Xc.call(t, 0), d), L = J(t, f, y, i && i.name, {
                        nonTlbTranscludeDirective: F
                    })) : (t = Qc(ra(d)).contents(), K.empty(), L = J(t, f, c, c, {
                        needsNewScope: q.$$isolateScope || q.$$newScope
                    }))), q.template) if (H = !0, Y("template", E, q, K), E = q, t = z(q.template) ? q.template(K, e) : q.template, 
                    t = la(t), q.replace) {
                        if (i = q, t = xd.test(t) ? $a($(q.templateNamespace, gd(t))) : [], d = t[0], 1 != t.length || 1 !== d.nodeType) throw Td("tplrt", s, "");
                        ba(h, K, d), t = {
                            $attr: {}
                        };
                        var X = N(d, [], t), Z = a.splice(M + 1, a.length - (M + 1));
                        (D || A) && R(X, D, A), a = a.concat(X).concat(Z), V(e, t), Q = a.length;
                    } else K.html(t);
                    if (q.templateUrl) H = !0, Y("template", E, q, K), E = q, q.replace && (i = q), 
                    p = W(a.splice(M, a.length - M), K, e, h, G && L, j, k, {
                        controllerDirectives: B,
                        newScopeDirective: A !== q && A,
                        newIsolateScopeDirective: D,
                        templateDirective: E,
                        nonTlbTranscludeDirective: F
                    }), Q = a.length; else if (q.compile) try {
                        v = q.compile(K, e, L), z(v) ? m(null, v, S, U) : v && m(v.pre, v.post, S, U);
                    } catch (_) {
                        g(_, T(K));
                    }
                    q.terminal && (p.terminal = !0, y = Math.max(y, q.priority));
                }
                return p.scope = A && !0 === A.scope, p.transcludeOnThisElement = G, p.templateOnThisElement = H, 
                p.transclude = L, l.hasElementTranscludeDirective = I, p;
            }
            function R(a, b, c) {
                for (var d = 0, e = a.length; d < e; d++) a[d] = n(a[d], {
                    $$isolateScope: b,
                    $$newScope: c
                });
            }
            function S(b, c, d, f, h, j, k) {
                if (c === h) return null;
                if (h = null, i.hasOwnProperty(c)) {
                    var l;
                    c = a.get(c + "Directive");
                    for (var m = 0, o = c.length; m < o; m++) try {
                        if (l = c[m], (s(f) || f > l.priority) && -1 != l.restrict.indexOf(d)) {
                            if (j && (l = n(l, {
                                $$start: j,
                                $$end: k
                            })), !l.$$bindings) {
                                var p = l, q = l, r = l.name, t = {
                                    isolateScope: null,
                                    bindToController: null
                                };
                                if (u(q.scope) && (!0 === q.bindToController ? (t.bindToController = e(q.scope, r, !0), 
                                t.isolateScope = {}) : t.isolateScope = e(q.scope, r, !1)), u(q.bindToController) && (t.bindToController = e(q.bindToController, r, !0)), 
                                u(t.bindToController)) {
                                    var v = q.controller, x = q.controllerAs;
                                    if (!v) throw Td("noctrl", r);
                                    var y;
                                    a: {
                                        var q = v, z = x;
                                        if (z && w(z)) y = z; else {
                                            if (w(q)) {
                                                var A = Wd.exec(q);
                                                if (A) {
                                                    y = A[3];
                                                    break a;
                                                }
                                            }
                                            y = void 0;
                                        }
                                    }
                                    if (!y) throw Td("noident", r);
                                }
                                var B = p.$$bindings = t;
                                u(B.isolateScope) && (l.$$isolateBindings = B.isolateScope);
                            }
                            b.push(l), h = l;
                        }
                    } catch (C) {
                        g(C);
                    }
                }
                return h;
            }
            function U(b) {
                if (i.hasOwnProperty(b)) for (var c = a.get(b + "Directive"), d = 0, e = c.length; d < e; d++) if (b = c[d], 
                b.multiElement) return !0;
                return !1;
            }
            function V(a, b) {
                var c = b.$attr, d = a.$attr, e = a.$$element;
                f(a, function(d, e) {
                    "$" != e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]), 
                    a.$set(e, d, !0, c[e]));
                }), f(b, function(b, f) {
                    "class" == f ? (G(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), 
                    a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, 
                    d[f] = c[f]);
                });
            }
            function W(a, b, c, d, e, g, i, j) {
                var k, l, m = [], o = b[0], p = a.shift(), q = n(p, {
                    templateUrl: null,
                    transclude: null,
                    replace: null,
                    $$originalDirective: p
                }), r = z(p.templateUrl) ? p.templateUrl(b, c) : p.templateUrl, s = p.templateNamespace;
                return b.empty(), h(r).then(function(h) {
                    var n, t;
                    if (h = la(h), p.replace) {
                        if (h = xd.test(h) ? $a($(s, gd(h))) : [], n = h[0], 1 != h.length || 1 !== n.nodeType) throw Td("tplrt", p.name, r);
                        h = {
                            $attr: {}
                        }, ba(d, b, n);
                        var v = N(n, [], h);
                        u(p.scope) && R(v, !0), a = v.concat(a), V(c, h);
                    } else n = o, b.html(h);
                    for (a.unshift(q), k = Q(a, n, c, e, b, p, g, i, j), f(d, function(a, c) {
                        a == n && (d[c] = b[0]);
                    }), l = K(b[0].childNodes, e); m.length; ) {
                        h = m.shift(), t = m.shift();
                        var w = m.shift(), x = m.shift(), v = b[0];
                        if (!h.$$destroyed) {
                            if (t !== o) {
                                var y = t.className;
                                j.hasElementTranscludeDirective && p.replace || (v = ra(n)), ba(w, Qc(t), v), G(Qc(v), y);
                            }
                            t = k.transcludeOnThisElement ? M(h, k.transclude, x) : x, k(l, h, v, d, t);
                        }
                    }
                    m = null;
                }), function(a, b, c, d, e) {
                    a = e, b.$$destroyed || (m ? m.push(b, c, d, a) : (k.transcludeOnThisElement && (a = M(b, k.transclude, e)), 
                    k(l, b, c, d, a)));
                };
            }
            function X(a, b) {
                var c = b.priority - a.priority;
                return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index;
            }
            function Y(a, b, c, d) {
                function e(a) {
                    return a ? " (module: " + a + ")" : "";
                }
                if (b) throw Td("multidir", b.name, e(b.$$moduleName), c.name, e(c.$$moduleName), a, T(d));
            }
            function Z(a, b) {
                var c = d(b, !0);
                c && a.push({
                    priority: 0,
                    compile: function(a) {
                        a = a.parent();
                        var b = !!a.length;
                        return b && J.$$addBindingClass(a), function(a, d) {
                            var e = d.parent();
                            b || J.$$addBindingClass(e), J.$$addBindingInfo(e, c.expressions), a.$watch(c, function(a) {
                                d[0].nodeValue = a;
                            });
                        };
                    }
                });
            }
            function $(a, c) {
                switch (a = Uc(a || "html")) {
                  case "svg":
                  case "math":
                    var d = b.createElement("div");
                    return d.innerHTML = "<" + a + ">" + c + "</" + a + ">", d.childNodes[0].childNodes;

                  default:
                    return c;
                }
            }
            function _(a, b) {
                if ("srcdoc" == b) return B.HTML;
                var c = H(a);
                return "xlinkHref" == b || "form" == c && "action" == b || "img" != c && ("src" == b || "ngSrc" == b) ? B.RESOURCE_URL : void 0;
            }
            function aa(a, b, c, e, f) {
                var g = _(a, e);
                f = m[e] || f;
                var h = d(c, !0, g, f);
                if (h) {
                    if ("multiple" === e && "select" === H(a)) throw Td("selmulti", T(a));
                    b.push({
                        priority: 100,
                        compile: function() {
                            return {
                                pre: function(a, b, i) {
                                    if (b = i.$$observers || (i.$$observers = ja()), v.test(e)) throw Td("nodomevents");
                                    var j = i[e];
                                    j !== c && (h = j && d(j, !0, g, f), c = j), h && (i[e] = h(a), (b[e] || (b[e] = [])).$$inter = !0, 
                                    (i.$$observers && i.$$observers[e].$$scope || a).$watch(h, function(a, b) {
                                        "class" === e && a != b ? i.$updateClass(a, b) : i.$set(e, a);
                                    }));
                                }
                            };
                        }
                    });
                }
            }
            function ba(a, c, d) {
                var e, f, g = c[0], h = c.length, i = g.parentNode;
                if (a) for (e = 0, f = a.length; e < f; e++) if (a[e] == g) {
                    a[e++] = d, f = e + h - 1;
                    for (var j = a.length; e < j; e++, f++) f < j ? a[e] = a[f] : delete a[e];
                    a.length -= h - 1, a.context === g && (a.context = d);
                    break;
                }
                for (i && i.replaceChild(d, g), a = b.createDocumentFragment(), a.appendChild(g), 
                Qc.hasData(g) && (Qc.data(d, Qc.data(g)), Rc ? (dd = !0, Rc.cleanData([ g ])) : delete Qc.cache[g[Qc.expando]]), 
                g = 1, h = c.length; g < h; g++) i = c[g], Qc(i).remove(), a.appendChild(i), delete c[g];
                c[0] = d, c.length = 1;
            }
            function da(a, b) {
                return k(function() {
                    return a.apply(null, arguments);
                }, a, b);
            }
            function fa(a, b, c, d, e, f) {
                try {
                    a(b, c, d, e, f);
                } catch (h) {
                    g(h, T(c));
                }
            }
            function ga(a, b, c, e, g) {
                var h = [];
                return f(e, function(e, f) {
                    var i, j, k, l, m = e.attrName, n = e.optional;
                    switch (e.mode) {
                      case "@":
                        n || Vc.call(b, m) || (c[f] = b[m] = void 0), b.$observe(m, function(a) {
                            w(a) && (c[f] = a);
                        }), b.$$observers[m].$$scope = a, i = b[m], w(i) ? c[f] = d(i)(a) : D(i) && (c[f] = i);
                        break;

                      case "=":
                        if (!Vc.call(b, m)) {
                            if (n) break;
                            b[m] = void 0;
                        }
                        if (n && !b[m]) break;
                        j = q(b[m]), l = j.literal ? L : function(a, b) {
                            return a === b || a !== a && b !== b;
                        }, k = j.assign || function() {
                            throw i = c[f] = j(a), Td("nonassign", b[m], m, g.name);
                        }, i = c[f] = j(a), n = function(b) {
                            return l(b, c[f]) || (l(b, i) ? k(a, b = c[f]) : c[f] = b), i = b;
                        }, n.$stateful = !0, n = e.collection ? a.$watchCollection(b[m], n) : a.$watch(q(b[m], n), null, j.literal), 
                        h.push(n);
                        break;

                      case "&":
                        if (j = b.hasOwnProperty(m) ? q(b[m]) : o, j === o && n) break;
                        c[f] = function(b) {
                            return j(a, b);
                        };
                    }
                }), h.length && function() {
                    for (var a = 0, b = h.length; a < b; ++a) h[a]();
                };
            }
            var ha = function(a, b) {
                if (b) {
                    var c, d, e, f = Object.keys(b);
                    for (c = 0, d = f.length; c < d; c++) e = f[c], this[e] = b[e];
                } else this.$attr = {};
                this.$$element = a;
            };
            ha.prototype = {
                $normalize: Ya,
                $addClass: function(a) {
                    a && 0 < a.length && E.addClass(this.$$element, a);
                },
                $removeClass: function(a) {
                    a && 0 < a.length && E.removeClass(this.$$element, a);
                },
                $updateClass: function(a, b) {
                    var c = Za(a, b);
                    c && c.length && E.addClass(this.$$element, c), (c = Za(b, a)) && c.length && E.removeClass(this.$$element, c);
                },
                $set: function(a, b, c, d) {
                    var e = Ga(this.$$element[0], a), h = Fd[a], i = a;
                    if (e ? (this.$$element.prop(a, b), d = e) : h && (this[h] = b, i = h), this[a] = b, 
                    d ? this.$attr[a] = d : (d = this.$attr[a]) || (this.$attr[a] = d = ca(a, "-")), 
                    e = H(this.$$element), "a" === e && "href" === a || "img" === e && "src" === a) this[a] = b = F(b, "src" === a); else if ("img" === e && "srcset" === a && t(b)) {
                        for (var e = "", h = gd(b), j = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, j = /\s/.test(h) ? j : /(,)/, h = h.split(j), j = Math.floor(h.length / 2), k = 0; k < j; k++) var l = 2 * k, e = e + F(gd(h[l]), !0), e = e + (" " + gd(h[l + 1]));
                        h = gd(h[2 * k]).split(/\s/), e += F(gd(h[0]), !0), 2 === h.length && (e += " " + gd(h[1])), 
                        this[a] = b = e;
                    }
                    !1 !== c && (null === b || s(b) ? this.$$element.removeAttr(d) : this.$$element.attr(d, b)), 
                    (a = this.$$observers) && f(a[i], function(a) {
                        try {
                            a(b);
                        } catch (c) {
                            g(c);
                        }
                    });
                },
                $observe: function(a, b) {
                    var c = this, d = c.$$observers || (c.$$observers = ja()), e = d[a] || (d[a] = []);
                    return e.push(b), A.$evalAsync(function() {
                        e.$$inter || !c.hasOwnProperty(a) || s(c[a]) || b(c[a]);
                    }), function() {
                        I(e, b);
                    };
                }
            };
            var ia = d.startSymbol(), ka = d.endSymbol(), la = "{{" == ia && "}}" == ka ? p : function(a) {
                return a.replace(/\{\{/g, ia).replace(/}}/g, ka);
            }, ma = /^ngAttr[A-Z]/, na = /^(.+)Start$/;
            return J.$$addBindingInfo = y ? function(a, b) {
                var c = a.data("$binding") || [];
                ed(b) ? c = c.concat(b) : c.push(b), a.data("$binding", c);
            } : o, J.$$addBindingClass = y ? function(a) {
                G(a, "ng-binding");
            } : o, J.$$addScopeInfo = y ? function(a, b, c, d) {
                a.data(c ? d ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope", b);
            } : o, J.$$addScopeClass = y ? function(a, b) {
                G(a, b ? "ng-isolate-scope" : "ng-scope");
            } : o, J;
        } ];
    }
    function Ya(a) {
        return ma(a.replace(Ud, ""));
    }
    function Za(a, b) {
        var c = "", d = a.split(/\s+/), e = b.split(/\s+/), f = 0;
        a: for (;f < d.length; f++) {
            for (var g = d[f], h = 0; h < e.length; h++) if (g == e[h]) continue a;
            c += (0 < c.length ? " " : "") + g;
        }
        return c;
    }
    function $a(a) {
        a = Qc(a);
        var b = a.length;
        if (1 >= b) return a;
        for (;b--; ) 8 === a[b].nodeType && Yc.call(a, b, 1);
        return a;
    }
    function _a() {
        var a = {}, b = !1;
        this.register = function(b, c) {
            ga(b, "controller"), u(b) ? k(a, b) : a[b] = c;
        }, this.allowGlobals = function() {
            b = !0;
        }, this.$get = [ "$injector", "$window", function(e, f) {
            function g(a, b, c, e) {
                if (!a || !u(a.$scope)) throw d("$controller")("noscp", e, b);
                a.$scope[b] = c;
            }
            return function(d, h, i, j) {
                var l, m, n;
                if (i = !0 === i, j && w(j) && (n = j), w(d)) {
                    if (j = d.match(Wd), !j) throw Vd("ctrlfmt", d);
                    m = j[1], n = n || j[3], d = a.hasOwnProperty(m) ? a[m] : ha(h.$scope, m, !0) || (b ? ha(f, m, !0) : c), 
                    fa(d, m, !0);
                }
                return i ? (i = (ed(d) ? d[d.length - 1] : d).prototype, l = Object.create(i || null), 
                n && g(h, n, l, m || d.name), k(function() {
                    var a = e.invoke(d, l, h, m);
                    return a !== l && (u(a) || z(a)) && (l = a, n && g(h, n, l, m || d.name)), l;
                }, {
                    instance: l,
                    identifier: n
                })) : (l = e.instantiate(d, h, m), n && g(h, n, l, m || d.name), l);
            };
        } ];
    }
    function ab() {
        this.$get = [ "$window", function(a) {
            return Qc(a.document);
        } ];
    }
    function bb() {
        this.$get = [ "$log", function(a) {
            return function(b, c) {
                a.error.apply(a, arguments);
            };
        } ];
    }
    function cb(a) {
        return u(a) ? y(a) ? a.toISOString() : P(a) : a;
    }
    function db() {
        this.$get = function() {
            return function(a) {
                if (!a) return "";
                var b = [];
                return g(a, function(a, c) {
                    null === a || s(a) || (ed(a) ? f(a, function(a, d) {
                        b.push(Y(c) + "=" + Y(cb(a)));
                    }) : b.push(Y(c) + "=" + Y(cb(a))));
                }), b.join("&");
            };
        };
    }
    function eb() {
        this.$get = function() {
            return function(a) {
                function b(a, d, e) {
                    null === a || s(a) || (ed(a) ? f(a, function(a, c) {
                        b(a, d + "[" + (u(a) ? c : "") + "]");
                    }) : u(a) && !y(a) ? g(a, function(a, c) {
                        b(a, d + (e ? "" : "[") + c + (e ? "" : "]"));
                    }) : c.push(Y(d) + "=" + Y(cb(a))));
                }
                if (!a) return "";
                var c = [];
                return b(a, "", !0), c.join("&");
            };
        };
    }
    function fb(a, b) {
        if (w(a)) {
            var c = a.replace(ae, "").trim();
            if (c) {
                var d = b("Content-Type");
                (d = d && 0 === d.indexOf(Yd)) || (d = (d = c.match($d)) && _d[d[0]].test(c)), d && (a = Q(c));
            }
        }
        return a;
    }
    function gb(a) {
        var b, c = ja();
        return w(a) ? f(a.split("\n"), function(a) {
            b = a.indexOf(":");
            var d = Uc(gd(a.substr(0, b)));
            a = gd(a.substr(b + 1)), d && (c[d] = c[d] ? c[d] + ", " + a : a);
        }) : u(a) && f(a, function(a, b) {
            var d = Uc(b), e = gd(a);
            d && (c[d] = c[d] ? c[d] + ", " + e : e);
        }), c;
    }
    function hb(a) {
        var b;
        return function(c) {
            return b || (b = gb(a)), c ? (c = b[Uc(c)], void 0 === c && (c = null), c) : b;
        };
    }
    function ib(a, b, c, d) {
        return z(d) ? d(a, b, c) : (f(d, function(d) {
            a = d(a, b, c);
        }), a);
    }
    function jb() {
        var a = this.defaults = {
            transformResponse: [ fb ],
            transformRequest: [ function(a) {
                return u(a) && "[object File]" !== $c.call(a) && "[object Blob]" !== $c.call(a) && "[object FormData]" !== $c.call(a) ? P(a) : a;
            } ],
            headers: {
                common: {
                    Accept: "application/json, text/plain, */*"
                },
                post: K(Zd),
                put: K(Zd),
                patch: K(Zd)
            },
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            paramSerializer: "$httpParamSerializer"
        }, b = !1;
        this.useApplyAsync = function(a) {
            return t(a) ? (b = !!a, this) : b;
        };
        var e = !0;
        this.useLegacyPromiseExtensions = function(a) {
            return t(a) ? (e = !!a, this) : e;
        };
        var g = this.interceptors = [];
        this.$get = [ "$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", function(h, i, j, l, m, n) {
            function o(b) {
                function g(a) {
                    var b = k({}, a);
                    return b.data = ib(a.data, a.headers, a.status, i.transformResponse), a = a.status, 
                    200 <= a && 300 > a ? b : m.reject(b);
                }
                function h(a, b) {
                    var c, d = {};
                    return f(a, function(a, e) {
                        z(a) ? (c = a(b), null != c && (d[e] = c)) : d[e] = a;
                    }), d;
                }
                if (!bd.isObject(b)) throw d("$http")("badreq", b);
                if (!w(b.url)) throw d("$http")("badreq", b.url);
                var i = k({
                    method: "get",
                    transformRequest: a.transformRequest,
                    transformResponse: a.transformResponse,
                    paramSerializer: a.paramSerializer
                }, b);
                i.headers = function(b) {
                    var c, d, e, f = a.headers, g = k({}, b.headers), f = k({}, f.common, f[Uc(b.method)]);
                    a: for (c in f) {
                        d = Uc(c);
                        for (e in g) if (Uc(e) === d) continue a;
                        g[c] = f[c];
                    }
                    return h(g, K(b));
                }(b), i.method = Wc(i.method), i.paramSerializer = w(i.paramSerializer) ? n.get(i.paramSerializer) : i.paramSerializer;
                var j = [ function(b) {
                    var d = b.headers, e = ib(b.data, hb(d), c, b.transformRequest);
                    return s(e) && f(d, function(a, b) {
                        "content-type" === Uc(b) && delete d[b];
                    }), s(b.withCredentials) && !s(a.withCredentials) && (b.withCredentials = a.withCredentials), 
                    p(b, e).then(g, g);
                }, c ], l = m.when(i);
                for (f(v, function(a) {
                    (a.request || a.requestError) && j.unshift(a.request, a.requestError), (a.response || a.responseError) && j.push(a.response, a.responseError);
                }); j.length; ) {
                    b = j.shift();
                    var o = j.shift(), l = l.then(b, o);
                }
                return e ? (l.success = function(a) {
                    return fa(a, "fn"), l.then(function(b) {
                        a(b.data, b.status, b.headers, i);
                    }), l;
                }, l.error = function(a) {
                    return fa(a, "fn"), l.then(null, function(b) {
                        a(b.data, b.status, b.headers, i);
                    }), l;
                }) : (l.success = ce("success"), l.error = ce("error")), l;
            }
            function p(d, e) {
                function f(a, c, d, e) {
                    function f() {
                        g(c, a, d, e);
                    }
                    n && (200 <= a && 300 > a ? n.put(y, [ a, c, gb(d), e ]) : n.remove(y)), b ? l.$applyAsync(f) : (f(), 
                    l.$$phase || l.$apply());
                }
                function g(a, b, c, e) {
                    b = -1 <= b ? b : 0, (200 <= b && 300 > b ? v.resolve : v.reject)({
                        data: a,
                        status: b,
                        headers: hb(c),
                        config: d,
                        statusText: e
                    });
                }
                function j(a) {
                    g(a.data, a.status, K(a.headers()), a.statusText);
                }
                function k() {
                    var a = o.pendingRequests.indexOf(d);
                    -1 !== a && o.pendingRequests.splice(a, 1);
                }
                var n, p, v = m.defer(), w = v.promise, x = d.headers, y = q(d.url, d.paramSerializer(d.params));
                return o.pendingRequests.push(d), w.then(k, k), !d.cache && !a.cache || !1 === d.cache || "GET" !== d.method && "JSONP" !== d.method || (n = u(d.cache) ? d.cache : u(a.cache) ? a.cache : r), 
                n && (p = n.get(y), t(p) ? p && z(p.then) ? p.then(j, j) : ed(p) ? g(p[1], p[0], K(p[2]), p[3]) : g(p, 200, {}, "OK") : n.put(y, w)), 
                s(p) && ((p = gc(d.url) ? i()[d.xsrfCookieName || a.xsrfCookieName] : c) && (x[d.xsrfHeaderName || a.xsrfHeaderName] = p), 
                h(d.method, y, e, f, x, d.timeout, d.withCredentials, d.responseType)), w;
            }
            function q(a, b) {
                return 0 < b.length && (a += (-1 == a.indexOf("?") ? "?" : "&") + b), a;
            }
            var r = j("$http");
            a.paramSerializer = w(a.paramSerializer) ? n.get(a.paramSerializer) : a.paramSerializer;
            var v = [];
            return f(g, function(a) {
                v.unshift(w(a) ? n.get(a) : n.invoke(a));
            }), o.pendingRequests = [], function(a) {
                f(arguments, function(a) {
                    o[a] = function(b, c) {
                        return o(k({}, c || {}, {
                            method: a,
                            url: b
                        }));
                    };
                });
            }("get", "delete", "head", "jsonp"), function(a) {
                f(arguments, function(a) {
                    o[a] = function(b, c, d) {
                        return o(k({}, d || {}, {
                            method: a,
                            url: b,
                            data: c
                        }));
                    };
                });
            }("post", "put", "patch"), o.defaults = a, o;
        } ];
    }
    function kb() {
        this.$get = function() {
            return function() {
                return new a.XMLHttpRequest();
            };
        };
    }
    function lb() {
        this.$get = [ "$browser", "$window", "$document", "$xhrFactory", function(a, b, c, d) {
            return mb(a, d, a.defer, b.angular.callbacks, c[0]);
        } ];
    }
    function mb(a, b, c, d, e) {
        function g(a, b, c) {
            var f = e.createElement("script"), g = null;
            return f.type = "text/javascript", f.src = a, f.async = !0, g = function(a) {
                f.removeEventListener("load", g, !1), f.removeEventListener("error", g, !1), e.body.removeChild(f), 
                f = null;
                var h = -1, i = "unknown";
                a && ("load" !== a.type || d[b].called || (a = {
                    type: "error"
                }), i = a.type, h = "error" === a.type ? 404 : 200), c && c(h, i);
            }, f.addEventListener("load", g, !1), f.addEventListener("error", g, !1), e.body.appendChild(f), 
            g;
        }
        return function(e, h, i, j, k, l, m, n) {
            function p() {
                u && u(), v && v.abort();
            }
            function q(b, d, e, f, g) {
                t(x) && c.cancel(x), u = v = null, b(d, e, f, g), a.$$completeOutstandingRequest(o);
            }
            if (a.$$incOutstandingRequestCount(), h = h || a.url(), "jsonp" == Uc(e)) {
                var r = "_" + (d.counter++).toString(36);
                d[r] = function(a) {
                    d[r].data = a, d[r].called = !0;
                };
                var u = g(h.replace("JSON_CALLBACK", "angular.callbacks." + r), r, function(a, b) {
                    q(j, a, d[r].data, "", b), d[r] = o;
                });
            } else {
                var v = b(e, h);
                if (v.open(e, h, !0), f(k, function(a, b) {
                    t(a) && v.setRequestHeader(b, a);
                }), v.onload = function() {
                    var a = v.statusText || "", b = "response" in v ? v.response : v.responseText, c = 1223 === v.status ? 204 : v.status;
                    0 === c && (c = b ? 200 : "file" == fc(h).protocol ? 404 : 0), q(j, c, b, v.getAllResponseHeaders(), a);
                }, e = function() {
                    q(j, -1, null, null, "");
                }, v.onerror = e, v.onabort = e, m && (v.withCredentials = !0), n) try {
                    v.responseType = n;
                } catch (w) {
                    if ("json" !== n) throw w;
                }
                v.send(s(i) ? null : i);
            }
            if (0 < l) var x = c(p, l); else l && z(l.then) && l.then(p);
        };
    }
    function nb() {
        var a = "{{", b = "}}";
        this.startSymbol = function(b) {
            return b ? (a = b, this) : a;
        }, this.endSymbol = function(a) {
            return a ? (b = a, this) : b;
        }, this.$get = [ "$parse", "$exceptionHandler", "$sce", function(c, d, e) {
            function f(a) {
                return "\\\\\\" + a;
            }
            function g(c) {
                return c.replace(l, a).replace(m, b);
            }
            function h(f, h, l, m) {
                function n(a) {
                    try {
                        var b = a;
                        a = l ? e.getTrusted(l, b) : e.valueOf(b);
                        var c;
                        if (m && !t(a)) c = a; else if (null == a) c = ""; else {
                            switch (typeof a) {
                              case "string":
                                break;

                              case "number":
                                a = "" + a;
                                break;

                              default:
                                a = P(a);
                            }
                            c = a;
                        }
                        return c;
                    } catch (g) {
                        d(de.interr(f, g));
                    }
                }
                m = !!m;
                for (var o, p, q = 0, r = [], u = [], v = f.length, w = [], x = []; q < v; ) {
                    if (-1 == (o = f.indexOf(a, q)) || -1 == (p = f.indexOf(b, o + i))) {
                        q !== v && w.push(g(f.substring(q)));
                        break;
                    }
                    q !== o && w.push(g(f.substring(q, o))), q = f.substring(o + i, p), r.push(q), u.push(c(q, n)), 
                    q = p + j, x.push(w.length), w.push("");
                }
                if (l && 1 < w.length && de.throwNoconcat(f), !h || r.length) {
                    var y = function(a) {
                        for (var b = 0, c = r.length; b < c; b++) {
                            if (m && s(a[b])) return;
                            w[x[b]] = a[b];
                        }
                        return w.join("");
                    };
                    return k(function(a) {
                        var b = 0, c = r.length, e = Array(c);
                        try {
                            for (;b < c; b++) e[b] = u[b](a);
                            return y(e);
                        } catch (g) {
                            d(de.interr(f, g));
                        }
                    }, {
                        exp: f,
                        expressions: r,
                        $$watchDelegate: function(a, b) {
                            var c;
                            return a.$watchGroup(u, function(d, e) {
                                var f = y(d);
                                z(b) && b.call(this, f, d !== e ? c : f, a), c = f;
                            });
                        }
                    });
                }
            }
            var i = a.length, j = b.length, l = new RegExp(a.replace(/./g, f), "g"), m = new RegExp(b.replace(/./g, f), "g");
            return h.startSymbol = function() {
                return a;
            }, h.endSymbol = function() {
                return b;
            }, h;
        } ];
    }
    function ob() {
        this.$get = [ "$rootScope", "$window", "$q", "$$q", function(a, b, c, d) {
            function e(e, g, h, i) {
                var j = 4 < arguments.length, k = j ? Xc.call(arguments, 4) : [], l = b.setInterval, m = b.clearInterval, n = 0, o = t(i) && !i, p = (o ? d : c).defer(), q = p.promise;
                return h = t(h) ? h : 0, q.then(null, null, j ? function() {
                    e.apply(null, k);
                } : e), q.$$intervalId = l(function() {
                    p.notify(n++), 0 < h && n >= h && (p.resolve(n), m(q.$$intervalId), delete f[q.$$intervalId]), 
                    o || a.$apply();
                }, g), f[q.$$intervalId] = p, q;
            }
            var f = {};
            return e.cancel = function(a) {
                return !!(a && a.$$intervalId in f) && (f[a.$$intervalId].reject("canceled"), b.clearInterval(a.$$intervalId), 
                delete f[a.$$intervalId], !0);
            }, e;
        } ];
    }
    function pb(a) {
        a = a.split("/");
        for (var b = a.length; b--; ) a[b] = X(a[b]);
        return a.join("/");
    }
    function qb(a, b) {
        var c = fc(a);
        b.$$protocol = c.protocol, b.$$host = c.hostname, b.$$port = m(c.port) || fe[c.protocol] || null;
    }
    function rb(a, b) {
        var c = "/" !== a.charAt(0);
        c && (a = "/" + a);
        var d = fc(a);
        b.$$path = decodeURIComponent(c && "/" === d.pathname.charAt(0) ? d.pathname.substring(1) : d.pathname), 
        b.$$search = V(d.search), b.$$hash = decodeURIComponent(d.hash), b.$$path && "/" != b.$$path.charAt(0) && (b.$$path = "/" + b.$$path);
    }
    function sb(a, b) {
        if (0 === b.indexOf(a)) return b.substr(a.length);
    }
    function tb(a) {
        var b = a.indexOf("#");
        return -1 == b ? a : a.substr(0, b);
    }
    function ub(a) {
        return a.replace(/(#.+)|#$/, "$1");
    }
    function vb(a, b, c) {
        this.$$html5 = !0, c = c || "", qb(a, this), this.$$parse = function(a) {
            var c = sb(b, a);
            if (!w(c)) throw ge("ipthprfx", a, b);
            rb(c, this), this.$$path || (this.$$path = "/"), this.$$compose();
        }, this.$$compose = function() {
            var a = W(this.$$search), c = this.$$hash ? "#" + X(this.$$hash) : "";
            this.$$url = pb(this.$$path) + (a ? "?" + a : "") + c, this.$$absUrl = b + this.$$url.substr(1);
        }, this.$$parseLinkUrl = function(d, e) {
            if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;
            var f, g;
            return t(f = sb(a, d)) ? (g = f, g = t(f = sb(c, f)) ? b + (sb("/", f) || f) : a + g) : t(f = sb(b, d)) ? g = b + f : b == d + "/" && (g = b), 
            g && this.$$parse(g), !!g;
        };
    }
    function wb(a, b, c) {
        qb(a, this), this.$$parse = function(d) {
            var e, f = sb(a, d) || sb(b, d);
            s(f) || "#" !== f.charAt(0) ? this.$$html5 ? e = f : (e = "", s(f) && (a = d, this.replace())) : (e = sb(c, f), 
            s(e) && (e = f)), rb(e, this), d = this.$$path;
            var f = a, g = /^\/[A-Z]:(\/.*)/;
            0 === e.indexOf(f) && (e = e.replace(f, "")), g.exec(e) || (d = (e = g.exec(d)) ? e[1] : d), 
            this.$$path = d, this.$$compose();
        }, this.$$compose = function() {
            var b = W(this.$$search), d = this.$$hash ? "#" + X(this.$$hash) : "";
            this.$$url = pb(this.$$path) + (b ? "?" + b : "") + d, this.$$absUrl = a + (this.$$url ? c + this.$$url : "");
        }, this.$$parseLinkUrl = function(b, c) {
            return tb(a) == tb(b) && (this.$$parse(b), !0);
        };
    }
    function xb(a, b, c) {
        this.$$html5 = !0, wb.apply(this, arguments), this.$$parseLinkUrl = function(d, e) {
            if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;
            var f, g;
            return a == tb(d) ? f = d : (g = sb(b, d)) ? f = a + c + g : b === d + "/" && (f = b), 
            f && this.$$parse(f), !!f;
        }, this.$$compose = function() {
            var b = W(this.$$search), d = this.$$hash ? "#" + X(this.$$hash) : "";
            this.$$url = pb(this.$$path) + (b ? "?" + b : "") + d, this.$$absUrl = a + c + this.$$url;
        };
    }
    function yb(a) {
        return function() {
            return this[a];
        };
    }
    function zb(a, b) {
        return function(c) {
            return s(c) ? this[a] : (this[a] = b(c), this.$$compose(), this);
        };
    }
    function Ab() {
        var a = "", b = {
            enabled: !1,
            requireBase: !0,
            rewriteLinks: !0
        };
        this.hashPrefix = function(b) {
            return t(b) ? (a = b, this) : a;
        }, this.html5Mode = function(a) {
            return D(a) ? (b.enabled = a, this) : u(a) ? (D(a.enabled) && (b.enabled = a.enabled), 
            D(a.requireBase) && (b.requireBase = a.requireBase), D(a.rewriteLinks) && (b.rewriteLinks = a.rewriteLinks), 
            this) : b;
        }, this.$get = [ "$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function(c, d, e, f, g) {
            function h(a, b, c) {
                var e = j.url(), f = j.$$state;
                try {
                    d.url(a, b, c), j.$$state = d.state();
                } catch (g) {
                    throw j.url(e), j.$$state = f, g;
                }
            }
            function i(a, b) {
                c.$broadcast("$locationChangeSuccess", j.absUrl(), a, j.$$state, b);
            }
            var j, k;
            k = d.baseHref();
            var l, m = d.url();
            if (b.enabled) {
                if (!k && b.requireBase) throw ge("nobase");
                l = m.substring(0, m.indexOf("/", m.indexOf("//") + 2)) + (k || "/"), k = e.history ? vb : xb;
            } else l = tb(m), k = wb;
            var n = l.substr(0, tb(l).lastIndexOf("/") + 1);
            j = new k(l, n, "#" + a), j.$$parseLinkUrl(m, m), j.$$state = d.state();
            var o = /^\s*(javascript|mailto):/i;
            f.on("click", function(a) {
                if (b.rewriteLinks && !a.ctrlKey && !a.metaKey && !a.shiftKey && 2 != a.which && 2 != a.button) {
                    for (var e = Qc(a.target); "a" !== H(e[0]); ) if (e[0] === f[0] || !(e = e.parent())[0]) return;
                    var h = e.prop("href"), i = e.attr("href") || e.attr("xlink:href");
                    u(h) && "[object SVGAnimatedString]" === h.toString() && (h = fc(h.animVal).href), 
                    o.test(h) || !h || e.attr("target") || a.isDefaultPrevented() || !j.$$parseLinkUrl(h, i) || (a.preventDefault(), 
                    j.absUrl() != d.url() && (c.$apply(), g.angular["ff-684208-preventDefault"] = !0));
                }
            }), ub(j.absUrl()) != ub(m) && d.url(j.absUrl(), !0);
            var p = !0;
            return d.onUrlChange(function(a, b) {
                s(sb(n, a)) ? g.location.href = a : (c.$evalAsync(function() {
                    var d, e = j.absUrl(), f = j.$$state;
                    a = ub(a), j.$$parse(a), j.$$state = b, d = c.$broadcast("$locationChangeStart", a, e, b, f).defaultPrevented, 
                    j.absUrl() === a && (d ? (j.$$parse(e), j.$$state = f, h(e, !1, f)) : (p = !1, i(e, f)));
                }), c.$$phase || c.$digest());
            }), c.$watch(function() {
                var a = ub(d.url()), b = ub(j.absUrl()), f = d.state(), g = j.$$replace, k = a !== b || j.$$html5 && e.history && f !== j.$$state;
                (p || k) && (p = !1, c.$evalAsync(function() {
                    var b = j.absUrl(), d = c.$broadcast("$locationChangeStart", b, a, j.$$state, f).defaultPrevented;
                    j.absUrl() === b && (d ? (j.$$parse(a), j.$$state = f) : (k && h(b, g, f === j.$$state ? null : j.$$state), 
                    i(a, f)));
                })), j.$$replace = !1;
            }), j;
        } ];
    }
    function Bb() {
        var a = !0, b = this;
        this.debugEnabled = function(b) {
            return t(b) ? (a = b, this) : a;
        }, this.$get = [ "$window", function(c) {
            function d(a) {
                return a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)), 
                a;
            }
            function e(a) {
                var b = c.console || {}, e = b[a] || b.log || o;
                a = !1;
                try {
                    a = !!e.apply;
                } catch (g) {}
                return a ? function() {
                    var a = [];
                    return f(arguments, function(b) {
                        a.push(d(b));
                    }), e.apply(b, a);
                } : function(a, b) {
                    e(a, null == b ? "" : b);
                };
            }
            return {
                log: e("log"),
                info: e("info"),
                warn: e("warn"),
                error: e("error"),
                debug: function() {
                    var c = e("debug");
                    return function() {
                        a && c.apply(b, arguments);
                    };
                }()
            };
        } ];
    }
    function Cb(a, b) {
        if ("__defineGetter__" === a || "__defineSetter__" === a || "__lookupGetter__" === a || "__lookupSetter__" === a || "__proto__" === a) throw ie("isecfld", b);
        return a;
    }
    function Db(a, b) {
        if (a += "", !w(a)) throw ie("iseccst", b);
        return a;
    }
    function Eb(a, b) {
        if (a) {
            if (a.constructor === a) throw ie("isecfn", b);
            if (a.window === a) throw ie("isecwindow", b);
            if (a.children && (a.nodeName || a.prop && a.attr && a.find)) throw ie("isecdom", b);
            if (a === Object) throw ie("isecobj", b);
        }
        return a;
    }
    function Fb(a, b) {
        if (a) {
            if (a.constructor === a) throw ie("isecfn", b);
            if (a === je || a === ke || a === le) throw ie("isecff", b);
        }
    }
    function Gb(a, b) {
        if (a && (a === (0).constructor || a === (!1).constructor || a === "".constructor || a === {}.constructor || a === [].constructor || a === Function.constructor)) throw ie("isecaf", b);
    }
    function Hb(a, b) {
        return "undefined" != typeof a ? a : b;
    }
    function Ib(a, b) {
        return "undefined" == typeof a ? b : "undefined" == typeof b ? a : a + b;
    }
    function Jb(a, b) {
        var c, d;
        switch (a.type) {
          case pe.Program:
            c = !0, f(a.body, function(a) {
                Jb(a.expression, b), c = c && a.expression.constant;
            }), a.constant = c;
            break;

          case pe.Literal:
            a.constant = !0, a.toWatch = [];
            break;

          case pe.UnaryExpression:
            Jb(a.argument, b), a.constant = a.argument.constant, a.toWatch = a.argument.toWatch;
            break;

          case pe.BinaryExpression:
            Jb(a.left, b), Jb(a.right, b), a.constant = a.left.constant && a.right.constant, 
            a.toWatch = a.left.toWatch.concat(a.right.toWatch);
            break;

          case pe.LogicalExpression:
            Jb(a.left, b), Jb(a.right, b), a.constant = a.left.constant && a.right.constant, 
            a.toWatch = a.constant ? [] : [ a ];
            break;

          case pe.ConditionalExpression:
            Jb(a.test, b), Jb(a.alternate, b), Jb(a.consequent, b), a.constant = a.test.constant && a.alternate.constant && a.consequent.constant, 
            a.toWatch = a.constant ? [] : [ a ];
            break;

          case pe.Identifier:
            a.constant = !1, a.toWatch = [ a ];
            break;

          case pe.MemberExpression:
            Jb(a.object, b), a.computed && Jb(a.property, b), a.constant = a.object.constant && (!a.computed || a.property.constant), 
            a.toWatch = [ a ];
            break;

          case pe.CallExpression:
            c = !!a.filter && !b(a.callee.name).$stateful, d = [], f(a.arguments, function(a) {
                Jb(a, b), c = c && a.constant, a.constant || d.push.apply(d, a.toWatch);
            }), a.constant = c, a.toWatch = a.filter && !b(a.callee.name).$stateful ? d : [ a ];
            break;

          case pe.AssignmentExpression:
            Jb(a.left, b), Jb(a.right, b), a.constant = a.left.constant && a.right.constant, 
            a.toWatch = [ a ];
            break;

          case pe.ArrayExpression:
            c = !0, d = [], f(a.elements, function(a) {
                Jb(a, b), c = c && a.constant, a.constant || d.push.apply(d, a.toWatch);
            }), a.constant = c, a.toWatch = d;
            break;

          case pe.ObjectExpression:
            c = !0, d = [], f(a.properties, function(a) {
                Jb(a.value, b), c = c && a.value.constant, a.value.constant || d.push.apply(d, a.value.toWatch);
            }), a.constant = c, a.toWatch = d;
            break;

          case pe.ThisExpression:
            a.constant = !1, a.toWatch = [];
        }
    }
    function Kb(a) {
        if (1 == a.length) {
            a = a[0].expression;
            var b = a.toWatch;
            return 1 !== b.length ? b : b[0] !== a ? b : c;
        }
    }
    function Lb(a) {
        return a.type === pe.Identifier || a.type === pe.MemberExpression;
    }
    function Mb(a) {
        if (1 === a.body.length && Lb(a.body[0].expression)) return {
            type: pe.AssignmentExpression,
            left: a.body[0].expression,
            right: {
                type: pe.NGValueParameter
            },
            operator: "="
        };
    }
    function Nb(a) {
        return 0 === a.body.length || 1 === a.body.length && (a.body[0].expression.type === pe.Literal || a.body[0].expression.type === pe.ArrayExpression || a.body[0].expression.type === pe.ObjectExpression);
    }
    function Ob(a, b) {
        this.astBuilder = a, this.$filter = b;
    }
    function Pb(a, b) {
        this.astBuilder = a, this.$filter = b;
    }
    function Qb(a) {
        return "constructor" == a;
    }
    function Rb(a) {
        return z(a.valueOf) ? a.valueOf() : re.call(a);
    }
    function Sb() {
        var a = ja(), b = ja();
        this.$get = [ "$filter", function(d) {
            function e(c, e, f) {
                var h, n, s;
                switch (f = f || r, typeof c) {
                  case "string":
                    s = c = c.trim();
                    var t = f ? b : a;
                    if (h = t[s], !h) {
                        ":" === c.charAt(0) && ":" === c.charAt(1) && (n = !0, c = c.substring(2)), h = f ? q : p;
                        var u = new oe(h);
                        h = new qe(u, d, h).parse(c), h.constant ? h.$$watchDelegate = l : n ? h.$$watchDelegate = h.literal ? k : j : h.inputs && (h.$$watchDelegate = i), 
                        f && (h = g(h)), t[s] = h;
                    }
                    return m(h, e);

                  case "function":
                    return m(c, e);

                  default:
                    return m(o, e);
                }
            }
            function g(a) {
                function b(b, c, d, e) {
                    var f = r;
                    r = !0;
                    try {
                        return a(b, c, d, e);
                    } finally {
                        r = f;
                    }
                }
                if (!a) return a;
                b.$$watchDelegate = a.$$watchDelegate, b.assign = g(a.assign), b.constant = a.constant, 
                b.literal = a.literal;
                for (var c = 0; a.inputs && c < a.inputs.length; ++c) a.inputs[c] = g(a.inputs[c]);
                return b.inputs = a.inputs, b;
            }
            function h(a, b) {
                return null == a || null == b ? a === b : ("object" != typeof a || (a = Rb(a), "object" != typeof a)) && (a === b || a !== a && b !== b);
            }
            function i(a, b, d, e, f) {
                var g, i = e.inputs;
                if (1 === i.length) {
                    var j = h, i = i[0];
                    return a.$watch(function(a) {
                        var b = i(a);
                        return h(b, j) || (g = e(a, c, c, [ b ]), j = b && Rb(b)), g;
                    }, b, d, f);
                }
                for (var k = [], l = [], m = 0, n = i.length; m < n; m++) k[m] = h, l[m] = null;
                return a.$watch(function(a) {
                    for (var b = !1, d = 0, f = i.length; d < f; d++) {
                        var j = i[d](a);
                        (b || (b = !h(j, k[d]))) && (l[d] = j, k[d] = j && Rb(j));
                    }
                    return b && (g = e(a, c, c, l)), g;
                }, b, d, f);
            }
            function j(a, b, c, d) {
                var e, f;
                return e = a.$watch(function(a) {
                    return d(a);
                }, function(a, c, d) {
                    f = a, z(b) && b.apply(this, arguments), t(a) && d.$$postDigest(function() {
                        t(f) && e();
                    });
                }, c);
            }
            function k(a, b, c, d) {
                function e(a) {
                    var b = !0;
                    return f(a, function(a) {
                        t(a) || (b = !1);
                    }), b;
                }
                var g, h;
                return g = a.$watch(function(a) {
                    return d(a);
                }, function(a, c, d) {
                    h = a, z(b) && b.call(this, a, c, d), e(a) && d.$$postDigest(function() {
                        e(h) && g();
                    });
                }, c);
            }
            function l(a, b, c, d) {
                var e;
                return e = a.$watch(function(a) {
                    return d(a);
                }, function(a, c, d) {
                    z(b) && b.apply(this, arguments), e();
                }, c);
            }
            function m(a, b) {
                if (!b) return a;
                var c = a.$$watchDelegate, d = !1, c = c !== k && c !== j ? function(c, e, f, g) {
                    return f = d && g ? g[0] : a(c, e, f, g), b(f, c, e);
                } : function(c, d, e, f) {
                    return e = a(c, d, e, f), c = b(e, c, d), t(e) ? c : e;
                };
                return a.$$watchDelegate && a.$$watchDelegate !== i ? c.$$watchDelegate = a.$$watchDelegate : b.$stateful || (c.$$watchDelegate = i, 
                d = !a.inputs, c.inputs = a.inputs ? a.inputs : [ a ]), c;
            }
            var n = id().noUnsafeEval, p = {
                csp: n,
                expensiveChecks: !1
            }, q = {
                csp: n,
                expensiveChecks: !0
            }, r = !1;
            return e.$$runningExpensiveChecks = function() {
                return r;
            }, e;
        } ];
    }
    function Tb() {
        this.$get = [ "$rootScope", "$exceptionHandler", function(a, b) {
            return Vb(function(b) {
                a.$evalAsync(b);
            }, b);
        } ];
    }
    function Ub() {
        this.$get = [ "$browser", "$exceptionHandler", function(a, b) {
            return Vb(function(b) {
                a.defer(b);
            }, b);
        } ];
    }
    function Vb(a, b) {
        function e(a, b, c) {
            function d(b) {
                return function(c) {
                    e || (e = !0, b.call(a, c));
                };
            }
            var e = !1;
            return [ d(b), d(c) ];
        }
        function g() {
            this.$$state = {
                status: 0
            };
        }
        function h(a, b) {
            return function(c) {
                b.call(a, c);
            };
        }
        function i(d) {
            !d.processScheduled && d.pending && (d.processScheduled = !0, a(function() {
                var a, e, f;
                f = d.pending, d.processScheduled = !1, d.pending = c;
                for (var g = 0, h = f.length; g < h; ++g) {
                    e = f[g][0], a = f[g][d.status];
                    try {
                        z(a) ? e.resolve(a(d.value)) : 1 === d.status ? e.resolve(d.value) : e.reject(d.value);
                    } catch (i) {
                        e.reject(i), b(i);
                    }
                }
            }));
        }
        function j() {
            this.promise = new g(), this.resolve = h(this, this.resolve), this.reject = h(this, this.reject), 
            this.notify = h(this, this.notify);
        }
        var l = d("$q", TypeError);
        k(g.prototype, {
            then: function(a, b, c) {
                if (s(a) && s(b) && s(c)) return this;
                var d = new j();
                return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([ d, a, b, c ]), 
                0 < this.$$state.status && i(this.$$state), d.promise;
            },
            "catch": function(a) {
                return this.then(null, a);
            },
            "finally": function(a, b) {
                return this.then(function(b) {
                    return n(b, !0, a);
                }, function(b) {
                    return n(b, !1, a);
                }, b);
            }
        }), k(j.prototype, {
            resolve: function(a) {
                this.promise.$$state.status || (a === this.promise ? this.$$reject(l("qcycle", a)) : this.$$resolve(a));
            },
            $$resolve: function(a) {
                var c, d;
                d = e(this, this.$$resolve, this.$$reject);
                try {
                    (u(a) || z(a)) && (c = a && a.then), z(c) ? (this.promise.$$state.status = -1, c.call(a, d[0], d[1], this.notify)) : (this.promise.$$state.value = a, 
                    this.promise.$$state.status = 1, i(this.promise.$$state));
                } catch (f) {
                    d[1](f), b(f);
                }
            },
            reject: function(a) {
                this.promise.$$state.status || this.$$reject(a);
            },
            $$reject: function(a) {
                this.promise.$$state.value = a, this.promise.$$state.status = 2, i(this.promise.$$state);
            },
            notify: function(c) {
                var d = this.promise.$$state.pending;
                0 >= this.promise.$$state.status && d && d.length && a(function() {
                    for (var a, e, f = 0, g = d.length; f < g; f++) {
                        e = d[f][0], a = d[f][3];
                        try {
                            e.notify(z(a) ? a(c) : c);
                        } catch (h) {
                            b(h);
                        }
                    }
                });
            }
        });
        var m = function(a, b) {
            var c = new j();
            return b ? c.resolve(a) : c.reject(a), c.promise;
        }, n = function(a, b, c) {
            var d = null;
            try {
                z(c) && (d = c());
            } catch (e) {
                return m(e, !1);
            }
            return d && z(d.then) ? d.then(function() {
                return m(a, b);
            }, function(a) {
                return m(a, !1);
            }) : m(a, b);
        }, o = function(a, b, c, d) {
            var e = new j();
            return e.resolve(a), e.promise.then(b, c, d);
        }, p = function q(a) {
            if (!z(a)) throw l("norslvr", a);
            if (!(this instanceof q)) return new q(a);
            var b = new j();
            return a(function(a) {
                b.resolve(a);
            }, function(a) {
                b.reject(a);
            }), b.promise;
        };
        return p.defer = function() {
            return new j();
        }, p.reject = function(a) {
            var b = new j();
            return b.reject(a), b.promise;
        }, p.when = o, p.resolve = o, p.all = function(a) {
            var b = new j(), c = 0, d = ed(a) ? [] : {};
            return f(a, function(a, e) {
                c++, o(a).then(function(a) {
                    d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d));
                }, function(a) {
                    d.hasOwnProperty(e) || b.reject(a);
                });
            }), 0 === c && b.resolve(d), b.promise;
        }, p;
    }
    function Wb() {
        this.$get = [ "$window", "$timeout", function(a, b) {
            var c = a.requestAnimationFrame || a.webkitRequestAnimationFrame, d = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.webkitCancelRequestAnimationFrame, e = !!c, f = e ? function(a) {
                var b = c(a);
                return function() {
                    d(b);
                };
            } : function(a) {
                var c = b(a, 16.66, !1);
                return function() {
                    b.cancel(c);
                };
            };
            return f.supported = e, f;
        } ];
    }
    function Xb() {
        function a(a) {
            function b() {
                this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, 
                this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$id = ++cd, 
                this.$$ChildScope = null;
            }
            return b.prototype = a, b;
        }
        var b = 10, c = d("$rootScope"), g = null, h = null;
        this.digestTtl = function(a) {
            return arguments.length && (b = a), b;
        }, this.$get = [ "$injector", "$exceptionHandler", "$parse", "$browser", function(d, i, j, k) {
            function l(a) {
                a.currentScope.$$destroyed = !0;
            }
            function m(a) {
                9 === Pc && (a.$$childHead && m(a.$$childHead), a.$$nextSibling && m(a.$$nextSibling)), 
                a.$parent = a.$$nextSibling = a.$$prevSibling = a.$$childHead = a.$$childTail = a.$root = a.$$watchers = null;
            }
            function n() {
                this.$id = ++cd, this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, 
                this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, 
                this.$$watchersCount = 0, this.$$isolateBindings = null;
            }
            function p(a) {
                if (x.$$phase) throw c("inprog", x.$$phase);
                x.$$phase = a;
            }
            function q(a, b) {
                do a.$$watchersCount += b; while (a = a.$parent);
            }
            function r(a, b, c) {
                do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c]; while (a = a.$parent);
            }
            function t() {}
            function v() {
                for (;B.length; ) try {
                    B.shift()();
                } catch (a) {
                    i(a);
                }
                h = null;
            }
            function w() {
                null === h && (h = k.defer(function() {
                    x.$apply(v);
                }));
            }
            n.prototype = {
                constructor: n,
                $new: function(b, c) {
                    var d;
                    return c = c || this, b ? (d = new n(), d.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = a(this)), 
                    d = new this.$$ChildScope()), d.$parent = c, d.$$prevSibling = c.$$childTail, c.$$childHead ? (c.$$childTail.$$nextSibling = d, 
                    c.$$childTail = d) : c.$$childHead = c.$$childTail = d, (b || c != this) && d.$on("$destroy", l), 
                    d;
                },
                $watch: function(a, b, c, d) {
                    var e = j(a);
                    if (e.$$watchDelegate) return e.$$watchDelegate(this, b, c, e, a);
                    var f = this, h = f.$$watchers, i = {
                        fn: b,
                        last: t,
                        get: e,
                        exp: d || a,
                        eq: !!c
                    };
                    return g = null, z(b) || (i.fn = o), h || (h = f.$$watchers = []), h.unshift(i), 
                    q(this, 1), function() {
                        0 <= I(h, i) && q(f, -1), g = null;
                    };
                },
                $watchGroup: function(a, b) {
                    function c() {
                        i = !1, j ? (j = !1, b(e, e, h)) : b(e, d, h);
                    }
                    var d = Array(a.length), e = Array(a.length), g = [], h = this, i = !1, j = !0;
                    if (!a.length) {
                        var k = !0;
                        return h.$evalAsync(function() {
                            k && b(e, e, h);
                        }), function() {
                            k = !1;
                        };
                    }
                    return 1 === a.length ? this.$watch(a[0], function(a, c, f) {
                        e[0] = a, d[0] = c, b(e, a === c ? e : d, f);
                    }) : (f(a, function(a, b) {
                        var f = h.$watch(a, function(a, f) {
                            e[b] = a, d[b] = f, i || (i = !0, h.$evalAsync(c));
                        });
                        g.push(f);
                    }), function() {
                        for (;g.length; ) g.shift()();
                    });
                },
                $watchCollection: function(a, b) {
                    function c(a) {
                        d = a;
                        var b, c, g, h;
                        if (!s(d)) {
                            if (u(d)) if (e(d)) for (f !== m && (f = m, p = f.length = 0, k++), a = d.length, 
                            p !== a && (k++, f.length = p = a), b = 0; b < a; b++) h = f[b], g = d[b], c = h !== h && g !== g, 
                            c || h === g || (k++, f[b] = g); else {
                                f !== n && (f = n = {}, p = 0, k++), a = 0;
                                for (b in d) Vc.call(d, b) && (a++, g = d[b], h = f[b], b in f ? (c = h !== h && g !== g, 
                                c || h === g || (k++, f[b] = g)) : (p++, f[b] = g, k++));
                                if (p > a) for (b in k++, f) Vc.call(d, b) || (p--, delete f[b]);
                            } else f !== d && (f = d, k++);
                            return k;
                        }
                    }
                    c.$stateful = !0;
                    var d, f, g, h = this, i = 1 < b.length, k = 0, l = j(a, c), m = [], n = {}, o = !0, p = 0;
                    return this.$watch(l, function() {
                        if (o ? (o = !1, b(d, d, h)) : b(d, g, h), i) if (u(d)) if (e(d)) {
                            g = Array(d.length);
                            for (var a = 0; a < d.length; a++) g[a] = d[a];
                        } else for (a in g = {}, d) Vc.call(d, a) && (g[a] = d[a]); else g = d;
                    });
                },
                $digest: function() {
                    var a, d, e, f, j, l, m, n, o, q, r, s = b, u = [];
                    p("$digest"), k.$$checkUrlChange(), this === x && null !== h && (k.defer.cancel(h), 
                    v()), g = null;
                    do {
                        for (n = !1, o = this; y.length; ) {
                            try {
                                r = y.shift(), r.scope.$eval(r.expression, r.locals);
                            } catch (w) {
                                i(w);
                            }
                            g = null;
                        }
                        a: do {
                            if (l = o.$$watchers) for (m = l.length; m--; ) try {
                                if (a = l[m]) if (j = a.get, (d = j(o)) === (e = a.last) || (a.eq ? L(d, e) : "number" == typeof d && "number" == typeof e && isNaN(d) && isNaN(e))) {
                                    if (a === g) {
                                        n = !1;
                                        break a;
                                    }
                                } else n = !0, g = a, a.last = a.eq ? J(d, null) : d, f = a.fn, f(d, e === t ? d : e, o), 
                                5 > s && (q = 4 - s, u[q] || (u[q] = []), u[q].push({
                                    msg: z(a.exp) ? "fn: " + (a.exp.name || a.exp.toString()) : a.exp,
                                    newVal: d,
                                    oldVal: e
                                }));
                            } catch (B) {
                                i(B);
                            }
                            if (!(l = o.$$watchersCount && o.$$childHead || o !== this && o.$$nextSibling)) for (;o !== this && !(l = o.$$nextSibling); ) o = o.$parent;
                        } while (o = l);
                        if ((n || y.length) && !s--) throw x.$$phase = null, c("infdig", b, u);
                    } while (n || y.length);
                    for (x.$$phase = null; A.length; ) try {
                        A.shift()();
                    } catch (C) {
                        i(C);
                    }
                },
                $destroy: function() {
                    if (!this.$$destroyed) {
                        var a = this.$parent;
                        this.$broadcast("$destroy"), this.$$destroyed = !0, this === x && k.$$applicationDestroyed(), 
                        q(this, -this.$$watchersCount);
                        for (var b in this.$$listenerCount) r(this, this.$$listenerCount[b], b);
                        a && a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a && a.$$childTail == this && (a.$$childTail = this.$$prevSibling), 
                        this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), 
                        this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = o, 
                        this.$on = this.$watch = this.$watchGroup = function() {
                            return o;
                        }, this.$$listeners = {}, this.$$nextSibling = null, m(this);
                    }
                },
                $eval: function(a, b) {
                    return j(a)(this, b);
                },
                $evalAsync: function(a, b) {
                    x.$$phase || y.length || k.defer(function() {
                        y.length && x.$digest();
                    }), y.push({
                        scope: this,
                        expression: j(a),
                        locals: b
                    });
                },
                $$postDigest: function(a) {
                    A.push(a);
                },
                $apply: function(a) {
                    try {
                        p("$apply");
                        try {
                            return this.$eval(a);
                        } finally {
                            x.$$phase = null;
                        }
                    } catch (b) {
                        i(b);
                    } finally {
                        try {
                            x.$digest();
                        } catch (c) {
                            throw i(c), c;
                        }
                    }
                },
                $applyAsync: function(a) {
                    function b() {
                        c.$eval(a);
                    }
                    var c = this;
                    a && B.push(b), a = j(a), w();
                },
                $on: function(a, b) {
                    var c = this.$$listeners[a];
                    c || (this.$$listeners[a] = c = []), c.push(b);
                    var d = this;
                    do d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++; while (d = d.$parent);
                    var e = this;
                    return function() {
                        var d = c.indexOf(b);
                        -1 !== d && (c[d] = null, r(e, 1, a));
                    };
                },
                $emit: function(a, b) {
                    var c, d, e, f = [], g = this, h = !1, j = {
                        name: a,
                        targetScope: g,
                        stopPropagation: function() {
                            h = !0;
                        },
                        preventDefault: function() {
                            j.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    }, k = M([ j ], arguments, 1);
                    do {
                        for (c = g.$$listeners[a] || f, j.currentScope = g, d = 0, e = c.length; d < e; d++) if (c[d]) try {
                            c[d].apply(null, k);
                        } catch (l) {
                            i(l);
                        } else c.splice(d, 1), d--, e--;
                        if (h) return j.currentScope = null, j;
                        g = g.$parent;
                    } while (g);
                    return j.currentScope = null, j;
                },
                $broadcast: function(a, b) {
                    var c = this, d = this, e = {
                        name: a,
                        targetScope: this,
                        preventDefault: function() {
                            e.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    };
                    if (!this.$$listenerCount[a]) return e;
                    for (var f, g, h = M([ e ], arguments, 1); c = d; ) {
                        for (e.currentScope = c, d = c.$$listeners[a] || [], f = 0, g = d.length; f < g; f++) if (d[f]) try {
                            d[f].apply(null, h);
                        } catch (j) {
                            i(j);
                        } else d.splice(f, 1), f--, g--;
                        if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== this && c.$$nextSibling)) for (;c !== this && !(d = c.$$nextSibling); ) c = c.$parent;
                    }
                    return e.currentScope = null, e;
                }
            };
            var x = new n(), y = x.$$asyncQueue = [], A = x.$$postDigestQueue = [], B = x.$$applyAsyncQueue = [];
            return x;
        } ];
    }
    function Yb() {
        var a = /^\s*(https?|ftp|mailto|tel|file):/, b = /^\s*((https?|ftp|file|blob):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function(b) {
            return t(b) ? (a = b, this) : a;
        }, this.imgSrcSanitizationWhitelist = function(a) {
            return t(a) ? (b = a, this) : b;
        }, this.$get = function() {
            return function(c, d) {
                var e, f = d ? b : a;
                return e = fc(c).href, "" === e || e.match(f) ? c : "unsafe:" + e;
            };
        };
    }
    function Zb(a) {
        if ("self" === a) return a;
        if (w(a)) {
            if (-1 < a.indexOf("***")) throw se("iwcard", a);
            return a = hd(a).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + a + "$");
        }
        if (A(a)) return new RegExp("^" + a.source + "$");
        throw se("imatcher");
    }
    function $b(a) {
        var b = [];
        return t(a) && f(a, function(a) {
            b.push(Zb(a));
        }), b;
    }
    function _b() {
        this.SCE_CONTEXTS = te;
        var a = [ "self" ], b = [];
        this.resourceUrlWhitelist = function(b) {
            return arguments.length && (a = $b(b)), a;
        }, this.resourceUrlBlacklist = function(a) {
            return arguments.length && (b = $b(a)), b;
        }, this.$get = [ "$injector", function(c) {
            function d(a, b) {
                return "self" === a ? gc(b) : !!a.exec(b.href);
            }
            function e(a) {
                var b = function(a) {
                    this.$$unwrapTrustedValue = function() {
                        return a;
                    };
                };
                return a && (b.prototype = new a()), b.prototype.valueOf = function() {
                    return this.$$unwrapTrustedValue();
                }, b.prototype.toString = function() {
                    return this.$$unwrapTrustedValue().toString();
                }, b;
            }
            var f = function(a) {
                throw se("unsafe");
            };
            c.has("$sanitize") && (f = c.get("$sanitize"));
            var g = e(), h = {};
            return h[te.HTML] = e(g), h[te.CSS] = e(g), h[te.URL] = e(g), h[te.JS] = e(g), h[te.RESOURCE_URL] = e(h[te.URL]), 
            {
                trustAs: function(a, b) {
                    var c = h.hasOwnProperty(a) ? h[a] : null;
                    if (!c) throw se("icontext", a, b);
                    if (null === b || s(b) || "" === b) return b;
                    if ("string" != typeof b) throw se("itype", a);
                    return new c(b);
                },
                getTrusted: function(c, e) {
                    if (null === e || s(e) || "" === e) return e;
                    var g = h.hasOwnProperty(c) ? h[c] : null;
                    if (g && e instanceof g) return e.$$unwrapTrustedValue();
                    if (c === te.RESOURCE_URL) {
                        var i, j, g = fc(e.toString()), k = !1;
                        for (i = 0, j = a.length; i < j; i++) if (d(a[i], g)) {
                            k = !0;
                            break;
                        }
                        if (k) for (i = 0, j = b.length; i < j; i++) if (d(b[i], g)) {
                            k = !1;
                            break;
                        }
                        if (k) return e;
                        throw se("insecurl", e.toString());
                    }
                    if (c === te.HTML) return f(e);
                    throw se("unsafe");
                },
                valueOf: function(a) {
                    return a instanceof g ? a.$$unwrapTrustedValue() : a;
                }
            };
        } ];
    }
    function ac() {
        var a = !0;
        this.enabled = function(b) {
            return arguments.length && (a = !!b), a;
        }, this.$get = [ "$parse", "$sceDelegate", function(b, c) {
            if (a && 8 > Pc) throw se("iequirks");
            var d = K(te);
            d.isEnabled = function() {
                return a;
            }, d.trustAs = c.trustAs, d.getTrusted = c.getTrusted, d.valueOf = c.valueOf, a || (d.trustAs = d.getTrusted = function(a, b) {
                return b;
            }, d.valueOf = p), d.parseAs = function(a, c) {
                var e = b(c);
                return e.literal && e.constant ? e : b(c, function(b) {
                    return d.getTrusted(a, b);
                });
            };
            var e = d.parseAs, g = d.getTrusted, h = d.trustAs;
            return f(te, function(a, b) {
                var c = Uc(b);
                d[ma("parse_as_" + c)] = function(b) {
                    return e(a, b);
                }, d[ma("get_trusted_" + c)] = function(b) {
                    return g(a, b);
                }, d[ma("trust_as_" + c)] = function(b) {
                    return h(a, b);
                };
            }), d;
        } ];
    }
    function bc() {
        this.$get = [ "$window", "$document", function(a, b) {
            var c, d = {}, e = m((/android (\d+)/.exec(Uc((a.navigator || {}).userAgent)) || [])[1]), f = /Boxee/i.test((a.navigator || {}).userAgent), g = b[0] || {}, h = /^(Moz|webkit|ms)(?=[A-Z])/, i = g.body && g.body.style, j = !1, k = !1;
            if (i) {
                for (var l in i) if (j = h.exec(l)) {
                    c = j[0], c = c.substr(0, 1).toUpperCase() + c.substr(1);
                    break;
                }
                c || (c = "WebkitOpacity" in i && "webkit"), j = !!("transition" in i || c + "Transition" in i), 
                k = !!("animation" in i || c + "Animation" in i), !e || j && k || (j = w(i.webkitTransition), 
                k = w(i.webkitAnimation));
            }
            return {
                history: !(!a.history || !a.history.pushState || 4 > e || f),
                hasEvent: function(a) {
                    if ("input" === a && 11 >= Pc) return !1;
                    if (s(d[a])) {
                        var b = g.createElement("div");
                        d[a] = "on" + a in b;
                    }
                    return d[a];
                },
                csp: id(),
                vendorPrefix: c,
                transitions: j,
                animations: k,
                android: e
            };
        } ];
    }
    function cc() {
        this.$get = [ "$templateCache", "$http", "$q", "$sce", function(a, b, c, d) {
            function e(f, g) {
                e.totalPendingRequests++, w(f) && !s(a.get(f)) || (f = d.getTrustedResourceUrl(f));
                var h = b.defaults && b.defaults.transformResponse;
                return ed(h) ? h = h.filter(function(a) {
                    return a !== fb;
                }) : h === fb && (h = null), b.get(f, {
                    cache: a,
                    transformResponse: h
                })["finally"](function() {
                    e.totalPendingRequests--;
                }).then(function(b) {
                    return a.put(f, b.data), b.data;
                }, function(a) {
                    if (!g) throw Td("tpload", f, a.status, a.statusText);
                    return c.reject(a);
                });
            }
            return e.totalPendingRequests = 0, e;
        } ];
    }
    function dc() {
        this.$get = [ "$rootScope", "$browser", "$location", function(a, b, c) {
            return {
                findBindings: function(a, b, c) {
                    a = a.getElementsByClassName("ng-binding");
                    var d = [];
                    return f(a, function(a) {
                        var e = bd.element(a).data("$binding");
                        e && f(e, function(e) {
                            c ? new RegExp("(^|\\s)" + hd(b) + "(\\s|\\||$)").test(e) && d.push(a) : -1 != e.indexOf(b) && d.push(a);
                        });
                    }), d;
                },
                findModels: function(a, b, c) {
                    for (var d = [ "ng-", "data-ng-", "ng\\:" ], e = 0; e < d.length; ++e) {
                        var f = a.querySelectorAll("[" + d[e] + "model" + (c ? "=" : "*=") + '"' + b + '"]');
                        if (f.length) return f;
                    }
                },
                getLocation: function() {
                    return c.url();
                },
                setLocation: function(b) {
                    b !== c.url() && (c.url(b), a.$digest());
                },
                whenStable: function(a) {
                    b.notifyWhenNoOutstandingRequests(a);
                }
            };
        } ];
    }
    function ec() {
        this.$get = [ "$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function(a, b, c, d, e) {
            function f(f, h, i) {
                z(f) || (i = h, h = f, f = o);
                var j, k = Xc.call(arguments, 3), l = t(i) && !i, m = (l ? d : c).defer(), n = m.promise;
                return j = b.defer(function() {
                    try {
                        m.resolve(f.apply(null, k));
                    } catch (b) {
                        m.reject(b), e(b);
                    } finally {
                        delete g[n.$$timeoutId];
                    }
                    l || a.$apply();
                }, h), n.$$timeoutId = j, g[j] = m, n;
            }
            var g = {};
            return f.cancel = function(a) {
                return !!(a && a.$$timeoutId in g) && (g[a.$$timeoutId].reject("canceled"), delete g[a.$$timeoutId], 
                b.defer.cancel(a.$$timeoutId));
            }, f;
        } ];
    }
    function fc(a) {
        return Pc && (ue.setAttribute("href", a), a = ue.href), ue.setAttribute("href", a), 
        {
            href: ue.href,
            protocol: ue.protocol ? ue.protocol.replace(/:$/, "") : "",
            host: ue.host,
            search: ue.search ? ue.search.replace(/^\?/, "") : "",
            hash: ue.hash ? ue.hash.replace(/^#/, "") : "",
            hostname: ue.hostname,
            port: ue.port,
            pathname: "/" === ue.pathname.charAt(0) ? ue.pathname : "/" + ue.pathname
        };
    }
    function gc(a) {
        return a = w(a) ? fc(a) : a, a.protocol === ve.protocol && a.host === ve.host;
    }
    function hc() {
        this.$get = q(a);
    }
    function ic(a) {
        function b(a) {
            try {
                return decodeURIComponent(a);
            } catch (b) {
                return a;
            }
        }
        var c = a[0] || {}, d = {}, e = "";
        return function() {
            var a, f, g, h, i;
            if (a = c.cookie || "", a !== e) for (e = a, a = e.split("; "), d = {}, g = 0; g < a.length; g++) f = a[g], 
            h = f.indexOf("="), 0 < h && (i = b(f.substring(0, h)), s(d[i]) && (d[i] = b(f.substring(h + 1))));
            return d;
        };
    }
    function jc() {
        this.$get = ic;
    }
    function kc(a) {
        function b(c, d) {
            if (u(c)) {
                var e = {};
                return f(c, function(a, c) {
                    e[c] = b(c, a);
                }), e;
            }
            return a.factory(c + "Filter", d);
        }
        this.register = b, this.$get = [ "$injector", function(a) {
            return function(b) {
                return a.get(b + "Filter");
            };
        } ], b("currency", pc), b("date", Ac), b("filter", lc), b("json", Bc), b("limitTo", Cc), 
        b("lowercase", Ce), b("number", qc), b("orderBy", Dc), b("uppercase", De);
    }
    function lc() {
        return function(a, b, c) {
            if (!e(a)) {
                if (null == a) return a;
                throw d("filter")("notarray", a);
            }
            var f;
            switch (oc(b)) {
              case "function":
                break;

              case "boolean":
              case "null":
              case "number":
              case "string":
                f = !0;

              case "object":
                b = mc(b, c, f);
                break;

              default:
                return a;
            }
            return Array.prototype.filter.call(a, b);
        };
    }
    function mc(a, b, c) {
        var d = u(a) && "$" in a;
        return !0 === b ? b = L : z(b) || (b = function(a, b) {
            return !s(a) && (null === a || null === b ? a === b : !(u(b) || u(a) && !r(a)) && (a = Uc("" + a), 
            b = Uc("" + b), -1 !== a.indexOf(b)));
        }), function(e) {
            return d && !u(e) ? nc(e, a.$, b, !1) : nc(e, a, b, c);
        };
    }
    function nc(a, b, c, d, e) {
        var f = oc(a), g = oc(b);
        if ("string" === g && "!" === b.charAt(0)) return !nc(a, b.substring(1), c, d);
        if (ed(a)) return a.some(function(a) {
            return nc(a, b, c, d);
        });
        switch (f) {
          case "object":
            var h;
            if (d) {
                for (h in a) if ("$" !== h.charAt(0) && nc(a[h], b, c, !0)) return !0;
                return !e && nc(a, b, c, !1);
            }
            if ("object" === g) {
                for (h in b) if (e = b[h], !z(e) && !s(e) && (f = "$" === h, !nc(f ? a : a[h], e, c, f, f))) return !1;
                return !0;
            }
            return c(a, b);

          case "function":
            return !1;

          default:
            return c(a, b);
        }
    }
    function oc(a) {
        return null === a ? "null" : typeof a;
    }
    function pc(a) {
        var b = a.NUMBER_FORMATS;
        return function(a, c, d) {
            return s(c) && (c = b.CURRENCY_SYM), s(d) && (d = b.PATTERNS[1].maxFrac), null == a ? a : tc(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, d).replace(/\u00A4/g, c);
        };
    }
    function qc(a) {
        var b = a.NUMBER_FORMATS;
        return function(a, c) {
            return null == a ? a : tc(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c);
        };
    }
    function rc(a) {
        var b, c, d, e, f, g = 0;
        for (-1 < (c = a.indexOf(xe)) && (a = a.replace(xe, "")), 0 < (d = a.search(/e/i)) ? (0 > c && (c = d), 
        c += +a.slice(d + 1), a = a.substring(0, d)) : 0 > c && (c = a.length), d = 0; a.charAt(d) == ye; d++) ;
        if (d == (f = a.length)) b = [ 0 ], c = 1; else {
            for (f--; a.charAt(f) == ye; ) f--;
            for (c -= d, b = [], e = 0; d <= f; d++, e++) b[e] = +a.charAt(d);
        }
        return c > we && (b = b.splice(0, we - 1), g = c - 1, c = 1), {
            d: b,
            e: g,
            i: c
        };
    }
    function sc(a, b, c, d) {
        var e = a.d, f = e.length - a.i;
        if (b = s(b) ? Math.min(Math.max(c, f), d) : +b, c = b + a.i, d = e[c], 0 < c) e.splice(c); else {
            a.i = 1, e.length = c = b + 1;
            for (var g = 0; g < c; g++) e[g] = 0;
        }
        for (5 <= d && e[c - 1]++; f < b; f++) e.push(0);
        (b = e.reduceRight(function(a, b, c, d) {
            return b += a, d[c] = b % 10, Math.floor(b / 10);
        }, 0)) && (e.unshift(b), a.i++);
    }
    function tc(a, b, c, d, e) {
        if (!w(a) && !x(a) || isNaN(a)) return "";
        var f = !isFinite(a), g = !1, h = Math.abs(a) + "", i = "";
        if (f) i = "∞"; else {
            for (g = rc(h), sc(g, e, b.minFrac, b.maxFrac), i = g.d, h = g.i, e = g.e, f = [], 
            g = i.reduce(function(a, b) {
                return a && !b;
            }, !0); 0 > h; ) i.unshift(0), h++;
            for (0 < h ? f = i.splice(h, i.length) : (f = i, i = [ 0 ]), h = [], i.length >= b.lgSize && h.unshift(i.splice(-b.lgSize, i.length).join("")); i.length > b.gSize; ) h.unshift(i.splice(-b.gSize, i.length).join(""));
            i.length && h.unshift(i.join("")), i = h.join(c), f.length && (i += d + f.join("")), 
            e && (i += "e+" + e);
        }
        return 0 > a && !g ? b.negPre + i + b.negSuf : b.posPre + i + b.posSuf;
    }
    function uc(a, b, c) {
        var d = "";
        for (0 > a && (d = "-", a = -a), a = "" + a; a.length < b; ) a = ye + a;
        return c && (a = a.substr(a.length - b)), d + a;
    }
    function vc(a, b, c, d) {
        return c = c || 0, function(e) {
            return e = e["get" + a](), (0 < c || e > -c) && (e += c), 0 === e && -12 == c && (e = 12), 
            uc(e, b, d);
        };
    }
    function wc(a, b) {
        return function(c, d) {
            var e = c["get" + a](), f = Wc(b ? "SHORT" + a : a);
            return d[f][e];
        };
    }
    function xc(a) {
        var b = new Date(a, 0, 1).getDay();
        return new Date(a, 0, (4 >= b ? 5 : 12) - b);
    }
    function yc(a) {
        return function(b) {
            var c = xc(b.getFullYear());
            return b = +new Date(b.getFullYear(), b.getMonth(), b.getDate() + (4 - b.getDay())) - +c, 
            b = 1 + Math.round(b / 6048e5), uc(b, a);
        };
    }
    function zc(a, b) {
        return 0 >= a.getFullYear() ? b.ERAS[0] : b.ERAS[1];
    }
    function Ac(a) {
        function b(a) {
            var b;
            if (b = a.match(c)) {
                a = new Date(0);
                var d = 0, e = 0, f = b[8] ? a.setUTCFullYear : a.setFullYear, g = b[8] ? a.setUTCHours : a.setHours;
                b[9] && (d = m(b[9] + b[10]), e = m(b[9] + b[11])), f.call(a, m(b[1]), m(b[2]) - 1, m(b[3])), 
                d = m(b[4] || 0) - d, e = m(b[5] || 0) - e, f = m(b[6] || 0), b = Math.round(1e3 * parseFloat("0." + (b[7] || 0))), 
                g.call(a, d, e, f, b);
            }
            return a;
        }
        var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(c, d, e) {
            var g, h, i = "", j = [];
            if (d = d || "mediumDate", d = a.DATETIME_FORMATS[d] || d, w(c) && (c = Be.test(c) ? m(c) : b(c)), 
            x(c) && (c = new Date(c)), !y(c) || !isFinite(c.getTime())) return c;
            for (;d; ) (h = Ae.exec(d)) ? (j = M(j, h, 1), d = j.pop()) : (j.push(d), d = null);
            var k = c.getTimezoneOffset();
            return e && (k = R(e, k), c = S(c, e, !0)), f(j, function(b) {
                g = ze[b], i += g ? g(c, a.DATETIME_FORMATS, k) : "''" === b ? "'" : b.replace(/(^'|'$)/g, "").replace(/''/g, "'");
            }), i;
        };
    }
    function Bc() {
        return function(a, b) {
            return s(b) && (b = 2), P(a, b);
        };
    }
    function Cc() {
        return function(a, b, c) {
            return b = 1 / 0 === Math.abs(Number(b)) ? Number(b) : m(b), isNaN(b) ? a : (x(a) && (a = a.toString()), 
            ed(a) || w(a) ? (c = !c || isNaN(c) ? 0 : m(c), c = 0 > c ? Math.max(0, a.length + c) : c, 
            0 <= b ? a.slice(c, c + b) : 0 === c ? a.slice(b, a.length) : a.slice(Math.max(0, c + b), c)) : a);
        };
    }
    function Dc(a) {
        function b(b, c) {
            return c = c ? -1 : 1, b.map(function(b) {
                var d = 1, e = p;
                if (z(b)) e = b; else if (w(b) && ("+" != b.charAt(0) && "-" != b.charAt(0) || (d = "-" == b.charAt(0) ? -1 : 1, 
                b = b.substring(1)), "" !== b && (e = a(b), e.constant))) var f = e(), e = function(a) {
                    return a[f];
                };
                return {
                    get: e,
                    descending: d * c
                };
            });
        }
        function c(a) {
            switch (typeof a) {
              case "number":
              case "boolean":
              case "string":
                return !0;

              default:
                return !1;
            }
        }
        return function(a, d, f) {
            if (!e(a)) return a;
            ed(d) || (d = [ d ]), 0 === d.length && (d = [ "+" ]);
            var g = b(d, f);
            return g.push({
                get: function() {
                    return {};
                },
                descending: f ? -1 : 1
            }), a = Array.prototype.map.call(a, function(a, b) {
                return {
                    value: a,
                    predicateValues: g.map(function(d) {
                        var e = d.get(a);
                        return d = typeof e, null === e ? (d = "string", e = "null") : "string" === d ? e = e.toLowerCase() : "object" === d && ("function" == typeof e.valueOf && (e = e.valueOf(), 
                        c(e)) || r(e) && (e = e.toString(), c(e)) || (e = b)), {
                            value: e,
                            type: d
                        };
                    })
                };
            }), a.sort(function(a, b) {
                for (var c = 0, d = 0, e = g.length; d < e; ++d) {
                    var c = a.predicateValues[d], f = b.predicateValues[d], h = 0;
                    if (c.type === f.type ? c.value !== f.value && (h = c.value < f.value ? -1 : 1) : h = c.type < f.type ? -1 : 1, 
                    c = h * g[d].descending) break;
                }
                return c;
            }), a = a.map(function(a) {
                return a.value;
            });
        };
    }
    function Ec(a) {
        return z(a) && (a = {
            link: a
        }), a.restrict = a.restrict || "AC", q(a);
    }
    function Fc(a, b, d, e, g) {
        var h = this, i = [];
        h.$error = {}, h.$$success = {}, h.$pending = c, h.$name = g(b.name || b.ngForm || "")(d), 
        h.$dirty = !1, h.$pristine = !0, h.$valid = !0, h.$invalid = !1, h.$submitted = !1, 
        h.$$parentForm = Ge, h.$rollbackViewValue = function() {
            f(i, function(a) {
                a.$rollbackViewValue();
            });
        }, h.$commitViewValue = function() {
            f(i, function(a) {
                a.$commitViewValue();
            });
        }, h.$addControl = function(a) {
            ga(a.$name, "input"), i.push(a), a.$name && (h[a.$name] = a), a.$$parentForm = h;
        }, h.$$renameControl = function(a, b) {
            var c = a.$name;
            h[c] === a && delete h[c], h[b] = a, a.$name = b;
        }, h.$removeControl = function(a) {
            a.$name && h[a.$name] === a && delete h[a.$name], f(h.$pending, function(b, c) {
                h.$setValidity(c, null, a);
            }), f(h.$error, function(b, c) {
                h.$setValidity(c, null, a);
            }), f(h.$$success, function(b, c) {
                h.$setValidity(c, null, a);
            }), I(i, a), a.$$parentForm = Ge;
        }, Nc({
            ctrl: this,
            $element: a,
            set: function(a, b, c) {
                var d = a[b];
                d ? -1 === d.indexOf(c) && d.push(c) : a[b] = [ c ];
            },
            unset: function(a, b, c) {
                var d = a[b];
                d && (I(d, c), 0 === d.length && delete a[b]);
            },
            $animate: e
        }), h.$setDirty = function() {
            e.removeClass(a, pf), e.addClass(a, qf), h.$dirty = !0, h.$pristine = !1, h.$$parentForm.$setDirty();
        }, h.$setPristine = function() {
            e.setClass(a, pf, qf + " ng-submitted"), h.$dirty = !1, h.$pristine = !0, h.$submitted = !1, 
            f(i, function(a) {
                a.$setPristine();
            });
        }, h.$setUntouched = function() {
            f(i, function(a) {
                a.$setUntouched();
            });
        }, h.$setSubmitted = function() {
            e.addClass(a, "ng-submitted"), h.$submitted = !0, h.$$parentForm.$setSubmitted();
        };
    }
    function Gc(a) {
        a.$formatters.push(function(b) {
            return a.$isEmpty(b) ? b : b.toString();
        });
    }
    function Hc(a, b, c, d, e, f) {
        var g = Uc(b[0].type);
        if (!e.android) {
            var h = !1;
            b.on("compositionstart", function(a) {
                h = !0;
            }), b.on("compositionend", function() {
                h = !1, j();
            });
        }
        var i, j = function(a) {
            if (i && (f.defer.cancel(i), i = null), !h) {
                var e = b.val();
                a = a && a.type, "password" === g || c.ngTrim && "false" === c.ngTrim || (e = gd(e)), 
                (d.$viewValue !== e || "" === e && d.$$hasNativeValidators) && d.$setViewValue(e, a);
            }
        };
        if (e.hasEvent("input")) b.on("input", j); else {
            var k = function(a, b, c) {
                i || (i = f.defer(function() {
                    i = null, b && b.value === c || j(a);
                }));
            };
            b.on("keydown", function(a) {
                var b = a.keyCode;
                91 === b || 15 < b && 19 > b || 37 <= b && 40 >= b || k(a, this, this.value);
            }), e.hasEvent("paste") && b.on("paste cut", k);
        }
        b.on("change", j), Te[g] && d.$$hasNativeValidators && g === c.type && b.on("keydown wheel mousedown", function(a) {
            if (!i) {
                var b = this.validity, c = b.badInput, d = b.typeMismatch;
                i = f.defer(function() {
                    i = null, b.badInput === c && b.typeMismatch === d || j(a);
                });
            }
        }), d.$render = function() {
            var a = d.$isEmpty(d.$viewValue) ? "" : d.$viewValue;
            b.val() !== a && b.val(a);
        };
    }
    function Ic(a, b) {
        return function(c, d) {
            var e, g;
            if (y(c)) return c;
            if (w(c)) {
                if ('"' == c.charAt(0) && '"' == c.charAt(c.length - 1) && (c = c.substring(1, c.length - 1)), 
                Ke.test(c)) return new Date(c);
                if (a.lastIndex = 0, e = a.exec(c)) return e.shift(), g = d ? {
                    yyyy: d.getFullYear(),
                    MM: d.getMonth() + 1,
                    dd: d.getDate(),
                    HH: d.getHours(),
                    mm: d.getMinutes(),
                    ss: d.getSeconds(),
                    sss: d.getMilliseconds() / 1e3
                } : {
                    yyyy: 1970,
                    MM: 1,
                    dd: 1,
                    HH: 0,
                    mm: 0,
                    ss: 0,
                    sss: 0
                }, f(e, function(a, c) {
                    c < b.length && (g[b[c]] = +a);
                }), new Date(g.yyyy, g.MM - 1, g.dd, g.HH, g.mm, g.ss || 0, 1e3 * g.sss || 0);
            }
            return NaN;
        };
    }
    function Jc(a, b, d, e) {
        return function(f, g, h, i, j, k, l) {
            function m(a) {
                return a && !(a.getTime && a.getTime() !== a.getTime());
            }
            function n(a) {
                return t(a) && !y(a) ? d(a) || c : a;
            }
            Kc(f, g, h, i), Hc(f, g, h, i, j, k);
            var o, p = i && i.$options && i.$options.timezone;
            if (i.$$parserName = a, i.$parsers.push(function(a) {
                return i.$isEmpty(a) ? null : b.test(a) ? (a = d(a, o), p && (a = S(a, p)), a) : c;
            }), i.$formatters.push(function(a) {
                if (a && !y(a)) throw sf("datefmt", a);
                return m(a) ? ((o = a) && p && (o = S(o, p, !0)), l("date")(a, e, p)) : (o = null, 
                "");
            }), t(h.min) || h.ngMin) {
                var q;
                i.$validators.min = function(a) {
                    return !m(a) || s(q) || d(a) >= q;
                }, h.$observe("min", function(a) {
                    q = n(a), i.$validate();
                });
            }
            if (t(h.max) || h.ngMax) {
                var r;
                i.$validators.max = function(a) {
                    return !m(a) || s(r) || d(a) <= r;
                }, h.$observe("max", function(a) {
                    r = n(a), i.$validate();
                });
            }
        };
    }
    function Kc(a, b, d, e) {
        (e.$$hasNativeValidators = u(b[0].validity)) && e.$parsers.push(function(a) {
            var d = b.prop("validity") || {};
            return d.badInput && !d.typeMismatch ? c : a;
        });
    }
    function Lc(a, b, c, d, e) {
        if (t(d)) {
            if (a = a(d), !a.constant) throw sf("constexpr", c, d);
            return a(b);
        }
        return e;
    }
    function Mc(a, b) {
        return a = "ngClass" + a, [ "$animate", function(c) {
            function d(a, b) {
                var c = [], d = 0;
                a: for (;d < a.length; d++) {
                    for (var e = a[d], f = 0; f < b.length; f++) if (e == b[f]) continue a;
                    c.push(e);
                }
                return c;
            }
            function e(a) {
                var b = [];
                return ed(a) ? (f(a, function(a) {
                    b = b.concat(e(a));
                }), b) : w(a) ? a.split(" ") : u(a) ? (f(a, function(a, c) {
                    a && (b = b.concat(c.split(" ")));
                }), b) : a;
            }
            return {
                restrict: "AC",
                link: function(g, h, i) {
                    function j(a) {
                        a = k(a, 1), i.$addClass(a);
                    }
                    function k(a, b) {
                        var c = h.data("$classCounts") || ja(), d = [];
                        return f(a, function(a) {
                            (0 < b || c[a]) && (c[a] = (c[a] || 0) + b, c[a] === +(0 < b) && d.push(a));
                        }), h.data("$classCounts", c), d.join(" ");
                    }
                    function l(a, b) {
                        var e = d(b, a), f = d(a, b), e = k(e, 1), f = k(f, -1);
                        e && e.length && c.addClass(h, e), f && f.length && c.removeClass(h, f);
                    }
                    function m(a) {
                        if (!0 === b || g.$index % 2 === b) {
                            var c = e(a || []);
                            if (n) {
                                if (!L(a, n)) {
                                    var d = e(n);
                                    l(d, c);
                                }
                            } else j(c);
                        }
                        n = ed(a) ? a.map(function(a) {
                            return K(a);
                        }) : K(a);
                    }
                    var n;
                    g.$watch(i[a], m, !0), i.$observe("class", function(b) {
                        m(g.$eval(i[a]));
                    }), "ngClass" !== a && g.$watch("$index", function(c, d) {
                        var f = 1 & c;
                        if (f !== (1 & d)) {
                            var h = e(g.$eval(i[a]));
                            f === b ? j(h) : (f = k(h, -1), i.$removeClass(f));
                        }
                    });
                }
            };
        } ];
    }
    function Nc(a) {
        function b(a, b) {
            b && !g[a] ? (j.addClass(f, a), g[a] = !0) : !b && g[a] && (j.removeClass(f, a), 
            g[a] = !1);
        }
        function d(a, c) {
            a = a ? "-" + ca(a, "-") : "", b(nf + a, !0 === c), b(of + a, !1 === c);
        }
        var e = a.ctrl, f = a.$element, g = {}, h = a.set, i = a.unset, j = a.$animate;
        g[of] = !(g[nf] = f.hasClass(nf)), e.$setValidity = function(a, f, g) {
            s(f) ? (e.$pending || (e.$pending = {}), h(e.$pending, a, g)) : (e.$pending && i(e.$pending, a, g), 
            Oc(e.$pending) && (e.$pending = c)), D(f) ? f ? (i(e.$error, a, g), h(e.$$success, a, g)) : (h(e.$error, a, g), 
            i(e.$$success, a, g)) : (i(e.$error, a, g), i(e.$$success, a, g)), e.$pending ? (b(rf, !0), 
            e.$valid = e.$invalid = c, d("", null)) : (b(rf, !1), e.$valid = Oc(e.$error), e.$invalid = !e.$valid, 
            d("", e.$valid)), f = e.$pending && e.$pending[a] ? c : !e.$error[a] && (!!e.$$success[a] || null), 
            d(a, f), e.$$parentForm.$setValidity(a, f, e);
        };
    }
    function Oc(a) {
        if (a) for (var b in a) if (a.hasOwnProperty(b)) return !1;
        return !0;
    }
    var Pc, Qc, Rc, Sc, Tc = /^\/(.+)\/([a-z]*)$/, Uc = function(a) {
        return w(a) ? a.toLowerCase() : a;
    }, Vc = Object.prototype.hasOwnProperty, Wc = function(a) {
        return w(a) ? a.toUpperCase() : a;
    }, Xc = [].slice, Yc = [].splice, Zc = [].push, $c = Object.prototype.toString, _c = Object.getPrototypeOf, ad = d("ng"), bd = a.angular || (a.angular = {}), cd = 0;
    Pc = b.documentMode, o.$inject = [], p.$inject = [];
    var dd, ed = Array.isArray, fd = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/, gd = function(a) {
        return w(a) ? a.trim() : a;
    }, hd = function(a) {
        return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
    }, id = function() {
        if (!t(id.rules)) {
            var a = b.querySelector("[ng-csp]") || b.querySelector("[data-ng-csp]");
            if (a) {
                var c = a.getAttribute("ng-csp") || a.getAttribute("data-ng-csp");
                id.rules = {
                    noUnsafeEval: !c || -1 !== c.indexOf("no-unsafe-eval"),
                    noInlineStyle: !c || -1 !== c.indexOf("no-inline-style")
                };
            } else {
                a = id;
                try {
                    new Function(""), c = !1;
                } catch (d) {
                    c = !0;
                }
                a.rules = {
                    noUnsafeEval: c,
                    noInlineStyle: !1
                };
            }
        }
        return id.rules;
    }, jd = function() {
        if (t(jd.name_)) return jd.name_;
        var a, c, d, e, f = ld.length;
        for (c = 0; c < f; ++c) if (d = ld[c], a = b.querySelector("[" + d.replace(":", "\\:") + "jq]")) {
            e = a.getAttribute(d + "jq");
            break;
        }
        return jd.name_ = e;
    }, kd = /:/g, ld = [ "ng-", "data-ng-", "ng:", "x-ng-" ], md = /[A-Z]/g, nd = !1, od = 3, pd = {
        full: "1.4.14",
        major: 1,
        minor: 4,
        dot: 14,
        codeName: "material-distinction"
    };
    qa.expando = "ng339";
    var qd = qa.cache = {}, rd = 1;
    qa._data = function(a) {
        return this.cache[a[this.expando]] || {};
    };
    var sd = /([\:\-\_]+(.))/g, td = /^moz([A-Z])/, ud = {
        mouseleave: "mouseout",
        mouseenter: "mouseover"
    }, vd = d("jqLite"), wd = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, xd = /<|&#?\w+;/, yd = /<([\w:-]+)/, zd = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, Ad = {
        option: [ 1, '<select multiple="multiple">', "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    Ad.optgroup = Ad.option, Ad.tbody = Ad.tfoot = Ad.colgroup = Ad.caption = Ad.thead, 
    Ad.th = Ad.td;
    var Bd = Node.prototype.contains || function(a) {
        return !!(16 & this.compareDocumentPosition(a));
    }, Cd = qa.prototype = {
        ready: function(c) {
            function d() {
                e || (e = !0, c());
            }
            var e = !1;
            "complete" === b.readyState ? setTimeout(d) : (this.on("DOMContentLoaded", d), qa(a).on("load", d));
        },
        toString: function() {
            var a = [];
            return f(this, function(b) {
                a.push("" + b);
            }), "[" + a.join(", ") + "]";
        },
        eq: function(a) {
            return Qc(0 <= a ? this[a] : this[this.length + a]);
        },
        length: 0,
        push: Zc,
        sort: [].sort,
        splice: [].splice
    }, Dd = {};
    f("multiple selected checked disabled readOnly required open".split(" "), function(a) {
        Dd[Uc(a)] = a;
    });
    var Ed = {};
    f("input select option textarea button form details".split(" "), function(a) {
        Ed[a] = !0;
    });
    var Fd = {
        ngMinlength: "minlength",
        ngMaxlength: "maxlength",
        ngMin: "min",
        ngMax: "max",
        ngPattern: "pattern"
    };
    f({
        data: wa,
        removeData: ua,
        hasData: function(a) {
            for (var b in qd[a.ng339]) return !0;
            return !1;
        }
    }, function(a, b) {
        qa[b] = a;
    }), f({
        data: wa,
        inheritedData: Ca,
        scope: function(a) {
            return Qc.data(a, "$scope") || Ca(a.parentNode || a, [ "$isolateScope", "$scope" ]);
        },
        isolateScope: function(a) {
            return Qc.data(a, "$isolateScope") || Qc.data(a, "$isolateScopeNoTemplate");
        },
        controller: Ba,
        injector: function(a) {
            return Ca(a, "$injector");
        },
        removeAttr: function(a, b) {
            a.removeAttribute(b);
        },
        hasClass: xa,
        css: function(a, b, c) {
            return b = ma(b), t(c) ? void (a.style[b] = c) : a.style[b];
        },
        attr: function(a, b, d) {
            var e = a.nodeType;
            if (e !== od && 2 !== e && 8 !== e) if (e = Uc(b), Dd[e]) {
                if (!t(d)) return a[b] || (a.attributes.getNamedItem(b) || o).specified ? e : c;
                d ? (a[b] = !0, a.setAttribute(b, e)) : (a[b] = !1, a.removeAttribute(e));
            } else if (t(d)) a.setAttribute(b, d); else if (a.getAttribute) return a = a.getAttribute(b, 2), 
            null === a ? c : a;
        },
        prop: function(a, b, c) {
            return t(c) ? void (a[b] = c) : a[b];
        },
        text: function() {
            function a(a, b) {
                if (s(b)) {
                    var c = a.nodeType;
                    return 1 === c || c === od ? a.textContent : "";
                }
                a.textContent = b;
            }
            return a.$dv = "", a;
        }(),
        val: function(a, b) {
            if (s(b)) {
                if (a.multiple && "select" === H(a)) {
                    var c = [];
                    return f(a.options, function(a) {
                        a.selected && c.push(a.value || a.text);
                    }), 0 === c.length ? null : c;
                }
                return a.value;
            }
            a.value = b;
        },
        html: function(a, b) {
            return s(b) ? a.innerHTML : (sa(a, !0), void (a.innerHTML = b));
        },
        empty: Da
    }, function(a, b) {
        qa.prototype[b] = function(b, c) {
            var d, e, f = this.length;
            if (a !== Da && s(2 == a.length && a !== xa && a !== Ba ? b : c)) {
                if (u(b)) {
                    for (d = 0; d < f; d++) if (a === wa) a(this[d], b); else for (e in b) a(this[d], e, b[e]);
                    return this;
                }
                for (d = a.$dv, f = s(d) ? Math.min(f, 1) : f, e = 0; e < f; e++) {
                    var g = a(this[e], b, c);
                    d = d ? d + g : g;
                }
                return d;
            }
            for (d = 0; d < f; d++) a(this[d], b, c);
            return this;
        };
    }), f({
        removeData: ua,
        on: function(a, b, d, e) {
            if (t(e)) throw vd("onargs");
            if (na(a)) {
                e = va(a, !0);
                var f = e.events, g = e.handle;
                g || (g = e.handle = Ha(a, f)), e = 0 <= b.indexOf(" ") ? b.split(" ") : [ b ];
                for (var h = e.length, i = function(b, c, e) {
                    var h = f[b];
                    h || (h = f[b] = [], h.specialHandlerWrapper = c, "$destroy" === b || e || a.addEventListener(b, g, !1)), 
                    h.push(d);
                }; h--; ) b = e[h], ud[b] ? (i(ud[b], Ja), i(b, c, !0)) : i(b);
            }
        },
        off: ta,
        one: function(a, b, c) {
            a = Qc(a), a.on(b, function d() {
                a.off(b, c), a.off(b, d);
            }), a.on(b, c);
        },
        replaceWith: function(a, b) {
            var c, d = a.parentNode;
            sa(a), f(new qa(b), function(b) {
                c ? d.insertBefore(b, c.nextSibling) : d.replaceChild(b, a), c = b;
            });
        },
        children: function(a) {
            var b = [];
            return f(a.childNodes, function(a) {
                1 === a.nodeType && b.push(a);
            }), b;
        },
        contents: function(a) {
            return a.contentDocument || a.childNodes || [];
        },
        append: function(a, b) {
            var c = a.nodeType;
            if (1 === c || 11 === c) {
                b = new qa(b);
                for (var c = 0, d = b.length; c < d; c++) a.appendChild(b[c]);
            }
        },
        prepend: function(a, b) {
            if (1 === a.nodeType) {
                var c = a.firstChild;
                f(new qa(b), function(b) {
                    a.insertBefore(b, c);
                });
            }
        },
        wrap: function(a, b) {
            pa(a, Qc(b).eq(0).clone()[0]);
        },
        remove: Ea,
        detach: function(a) {
            Ea(a, !0);
        },
        after: function(a, b) {
            var c = a, d = a.parentNode;
            b = new qa(b);
            for (var e = 0, f = b.length; e < f; e++) {
                var g = b[e];
                d.insertBefore(g, c.nextSibling), c = g;
            }
        },
        addClass: za,
        removeClass: ya,
        toggleClass: function(a, b, c) {
            b && f(b.split(" "), function(b) {
                var d = c;
                s(d) && (d = !xa(a, b)), (d ? za : ya)(a, b);
            });
        },
        parent: function(a) {
            return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
        },
        next: function(a) {
            return a.nextElementSibling;
        },
        find: function(a, b) {
            return a.getElementsByTagName ? a.getElementsByTagName(b) : [];
        },
        clone: ra,
        triggerHandler: function(a, b, c) {
            var d, e, g = b.type || b, h = va(a);
            (h = (h = h && h.events) && h[g]) && (d = {
                preventDefault: function() {
                    this.defaultPrevented = !0;
                },
                isDefaultPrevented: function() {
                    return !0 === this.defaultPrevented;
                },
                stopImmediatePropagation: function() {
                    this.immediatePropagationStopped = !0;
                },
                isImmediatePropagationStopped: function() {
                    return !0 === this.immediatePropagationStopped;
                },
                stopPropagation: o,
                type: g,
                target: a
            }, b.type && (d = k(d, b)), b = K(h), e = c ? [ d ].concat(c) : [ d ], f(b, function(b) {
                d.isImmediatePropagationStopped() || b.apply(a, e);
            }));
        }
    }, function(a, b) {
        qa.prototype[b] = function(b, c, d) {
            for (var e, f = 0, g = this.length; f < g; f++) s(e) ? (e = a(this[f], b, c, d), 
            t(e) && (e = Qc(e))) : Aa(e, a(this[f], b, c, d));
            return t(e) ? e : this;
        }, qa.prototype.bind = qa.prototype.on, qa.prototype.unbind = qa.prototype.off;
    }), Ma.prototype = {
        put: function(a, b) {
            this[La(a, this.nextUid)] = b;
        },
        get: function(a) {
            return this[La(a, this.nextUid)];
        },
        remove: function(a) {
            var b = this[a = La(a, this.nextUid)];
            return delete this[a], b;
        }
    };
    var Gd = [ function() {
        this.$get = [ function() {
            return Ma;
        } ];
    } ], Hd = /^[^\(]*\(\s*([^\)]*)\)/m, Id = /,/, Jd = /^\s*(_?)(\S+?)\1\s*$/, Kd = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, Ld = d("$injector");
    Oa.$$annotate = function(a, b, c) {
        var d;
        if ("function" == typeof a) {
            if (!(d = a.$inject)) {
                if (d = [], a.length) {
                    if (b) throw w(c) && c || (c = a.name || Na(a)), Ld("strictdi", c);
                    b = a.toString().replace(Kd, ""), b = b.match(Hd), f(b[1].split(Id), function(a) {
                        a.replace(Jd, function(a, b, c) {
                            d.push(c);
                        });
                    });
                }
                a.$inject = d;
            }
        } else ed(a) ? (b = a.length - 1, fa(a[b], "fn"), d = a.slice(0, b)) : fa(a, "fn", !0);
        return d;
    };
    var Md = d("$animate"), Nd = function() {
        this.$get = function() {};
    }, Od = function() {
        var a = new Ma(), b = [];
        this.$get = [ "$$AnimateRunner", "$rootScope", function(c, d) {
            function e(a, b, c) {
                var d = !1;
                return b && (b = w(b) ? b.split(" ") : ed(b) ? b : [], f(b, function(b) {
                    b && (d = !0, a[b] = c);
                })), d;
            }
            function g() {
                f(b, function(b) {
                    var c = a.get(b);
                    if (c) {
                        var d = Ra(b.attr("class")), e = "", g = "";
                        f(c, function(a, b) {
                            a !== !!d[b] && (a ? e += (e.length ? " " : "") + b : g += (g.length ? " " : "") + b);
                        }), f(b, function(a) {
                            e && za(a, e), g && ya(a, g);
                        }), a.remove(b);
                    }
                }), b.length = 0;
            }
            return {
                enabled: o,
                on: o,
                off: o,
                pin: o,
                push: function(f, h, i, j) {
                    return j && j(), i = i || {}, i.from && f.css(i.from), i.to && f.css(i.to), (i.addClass || i.removeClass) && (h = i.addClass, 
                    j = i.removeClass, i = a.get(f) || {}, h = e(i, h, !0), j = e(i, j, !1), (h || j) && (a.put(f, i), 
                    b.push(f), 1 === b.length && d.$$postDigest(g))), f = new c(), f.complete(), f;
                }
            };
        } ];
    }, Pd = [ "$provide", function(a) {
        var b = this;
        this.$$registeredAnimations = Object.create(null), this.register = function(c, d) {
            if (c && "." !== c.charAt(0)) throw Md("notcsel", c);
            var e = c + "-animation";
            b.$$registeredAnimations[c.substr(1)] = e, a.factory(e, d);
        }, this.classNameFilter = function(a) {
            if (1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null) && /(\s+|\/)ng-animate(\s+|\/)/.test(this.$$classNameFilter.toString())) throw Md("nongcls", "ng-animate");
            return this.$$classNameFilter;
        }, this.$get = [ "$$animateQueue", function(a) {
            function b(a, b, c) {
                if (c) {
                    var d;
                    a: {
                        for (d = 0; d < c.length; d++) {
                            var e = c[d];
                            if (1 === e.nodeType) {
                                d = e;
                                break a;
                            }
                        }
                        d = void 0;
                    }
                    !d || d.parentNode || d.previousElementSibling || (c = null);
                }
                c ? c.after(a) : b.prepend(a);
            }
            return {
                on: a.on,
                off: a.off,
                pin: a.pin,
                enabled: a.enabled,
                cancel: function(a) {
                    a.end && a.end();
                },
                enter: function(c, d, e, f) {
                    return d = d && Qc(d), e = e && Qc(e), d = d || e.parent(), b(c, d, e), a.push(c, "enter", Sa(f));
                },
                move: function(c, d, e, f) {
                    return d = d && Qc(d), e = e && Qc(e), d = d || e.parent(), b(c, d, e), a.push(c, "move", Sa(f));
                },
                leave: function(b, c) {
                    return a.push(b, "leave", Sa(c), function() {
                        b.remove();
                    });
                },
                addClass: function(b, c, d) {
                    return d = Sa(d), d.addClass = Qa(d.addclass, c), a.push(b, "addClass", d);
                },
                removeClass: function(b, c, d) {
                    return d = Sa(d), d.removeClass = Qa(d.removeClass, c), a.push(b, "removeClass", d);
                },
                setClass: function(b, c, d, e) {
                    return e = Sa(e), e.addClass = Qa(e.addClass, c), e.removeClass = Qa(e.removeClass, d), 
                    a.push(b, "setClass", e);
                },
                animate: function(b, c, d, e, f) {
                    return f = Sa(f), f.from = f.from ? k(f.from, c) : c, f.to = f.to ? k(f.to, d) : d, 
                    f.tempClasses = Qa(f.tempClasses, e || "ng-inline-animate"), a.push(b, "animate", f);
                }
            };
        } ];
    } ], Qd = function() {
        this.$get = [ "$$rAF", function(a) {
            function b(b) {
                c.push(b), 1 < c.length || a(function() {
                    for (var a = 0; a < c.length; a++) c[a]();
                    c = [];
                });
            }
            var c = [];
            return function() {
                var a = !1;
                return b(function() {
                    a = !0;
                }), function(c) {
                    a ? c() : b(c);
                };
            };
        } ];
    }, Rd = function() {
        this.$get = [ "$q", "$sniffer", "$$animateAsyncRun", "$document", "$timeout", function(a, b, c, d, e) {
            function g(a) {
                this.setHost(a);
                var b = c();
                this._doneCallbacks = [], this._tick = function(a) {
                    var c = d[0];
                    c && c.hidden ? e(a, 0, !1) : b(a);
                }, this._state = 0;
            }
            return g.chain = function(a, b) {
                function c() {
                    d === a.length ? b(!0) : a[d](function(a) {
                        !1 === a ? b(!1) : (d++, c());
                    });
                }
                var d = 0;
                c();
            }, g.all = function(a, b) {
                function c(c) {
                    e = e && c, ++d === a.length && b(e);
                }
                var d = 0, e = !0;
                f(a, function(a) {
                    a.done(c);
                });
            }, g.prototype = {
                setHost: function(a) {
                    this.host = a || {};
                },
                done: function(a) {
                    2 === this._state ? a() : this._doneCallbacks.push(a);
                },
                progress: o,
                getPromise: function() {
                    if (!this.promise) {
                        var b = this;
                        this.promise = a(function(a, c) {
                            b.done(function(b) {
                                !1 === b ? c() : a();
                            });
                        });
                    }
                    return this.promise;
                },
                then: function(a, b) {
                    return this.getPromise().then(a, b);
                },
                "catch": function(a) {
                    return this.getPromise()["catch"](a);
                },
                "finally": function(a) {
                    return this.getPromise()["finally"](a);
                },
                pause: function() {
                    this.host.pause && this.host.pause();
                },
                resume: function() {
                    this.host.resume && this.host.resume();
                },
                end: function() {
                    this.host.end && this.host.end(), this._resolve(!0);
                },
                cancel: function() {
                    this.host.cancel && this.host.cancel(), this._resolve(!1);
                },
                complete: function(a) {
                    var b = this;
                    0 === b._state && (b._state = 1, b._tick(function() {
                        b._resolve(a);
                    }));
                },
                _resolve: function(a) {
                    2 !== this._state && (f(this._doneCallbacks, function(b) {
                        b(a);
                    }), this._doneCallbacks.length = 0, this._state = 2);
                }
            }, g;
        } ];
    }, Sd = function() {
        this.$get = [ "$$rAF", "$q", "$$AnimateRunner", function(a, b, c) {
            return function(b, d) {
                function e() {
                    return a(function() {
                        f.addClass && (b.addClass(f.addClass), f.addClass = null), f.removeClass && (b.removeClass(f.removeClass), 
                        f.removeClass = null), f.to && (b.css(f.to), f.to = null), g || h.complete(), g = !0;
                    }), h;
                }
                var f = d || {};
                f.$$prepared || (f = J(f)), f.cleanupStyles && (f.from = f.to = null), f.from && (b.css(f.from), 
                f.from = null);
                var g, h = new c();
                return {
                    start: e,
                    end: e
                };
            };
        } ];
    }, Td = d("$compile");
    Xa.$inject = [ "$provide", "$$sanitizeUriProvider" ];
    var Ud = /^((?:x|data)[\:\-_])/i, Vd = d("$controller"), Wd = /^(\S+)(\s+as\s+([\w$]+))?$/, Xd = function() {
        this.$get = [ "$document", function(a) {
            return function(b) {
                return b ? !b.nodeType && b instanceof Qc && (b = b[0]) : b = a[0].body, b.offsetWidth + 1;
            };
        } ];
    }, Yd = "application/json", Zd = {
        "Content-Type": Yd + ";charset=utf-8"
    }, $d = /^\[|^\{(?!\{)/, _d = {
        "[": /]$/,
        "{": /}$/
    }, ae = /^\)\]\}',?\n/, be = d("$http"), ce = function(a) {
        return function() {
            throw be("legacy", a);
        };
    }, de = bd.$interpolateMinErr = d("$interpolate");
    de.throwNoconcat = function(a) {
        throw de("noconcat", a);
    }, de.interr = function(a, b) {
        return de("interr", a, b.toString());
    };
    var ee = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, fe = {
        http: 80,
        https: 443,
        ftp: 21
    }, ge = d("$location"), he = {
        $$html5: !1,
        $$replace: !1,
        absUrl: yb("$$absUrl"),
        url: function(a) {
            if (s(a)) return this.$$url;
            var b = ee.exec(a);
            return (b[1] || "" === a) && this.path(decodeURIComponent(b[1])), (b[2] || b[1] || "" === a) && this.search(b[3] || ""), 
            this.hash(b[5] || ""), this;
        },
        protocol: yb("$$protocol"),
        host: yb("$$host"),
        port: yb("$$port"),
        path: zb("$$path", function(a) {
            return a = null !== a ? a.toString() : "", "/" == a.charAt(0) ? a : "/" + a;
        }),
        search: function(a, b) {
            switch (arguments.length) {
              case 0:
                return this.$$search;

              case 1:
                if (w(a) || x(a)) a = a.toString(), this.$$search = V(a); else {
                    if (!u(a)) throw ge("isrcharg");
                    a = J(a, {}), f(a, function(b, c) {
                        null == b && delete a[c];
                    }), this.$$search = a;
                }
                break;

              default:
                s(b) || null === b ? delete this.$$search[a] : this.$$search[a] = b;
            }
            return this.$$compose(), this;
        },
        hash: zb("$$hash", function(a) {
            return null !== a ? a.toString() : "";
        }),
        replace: function() {
            return this.$$replace = !0, this;
        }
    };
    f([ xb, wb, vb ], function(a) {
        a.prototype = Object.create(he), a.prototype.state = function(b) {
            if (!arguments.length) return this.$$state;
            if (a !== vb || !this.$$html5) throw ge("nostate");
            return this.$$state = s(b) ? null : b, this;
        };
    });
    var ie = d("$parse"), je = Function.prototype.call, ke = Function.prototype.apply, le = Function.prototype.bind, me = ja();
    f("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function(a) {
        me[a] = !0;
    });
    var ne = {
        n: "\n",
        f: "\f",
        r: "\r",
        t: "\t",
        v: "\x0B",
        "'": "'",
        '"': '"'
    }, oe = function(a) {
        this.options = a;
    };
    oe.prototype = {
        constructor: oe,
        lex: function(a) {
            for (this.text = a, this.index = 0, this.tokens = []; this.index < this.text.length; ) if (a = this.text.charAt(this.index), 
            '"' === a || "'" === a) this.readString(a); else if (this.isNumber(a) || "." === a && this.isNumber(this.peek())) this.readNumber(); else if (this.isIdent(a)) this.readIdent(); else if (this.is(a, "(){}[].,;:?")) this.tokens.push({
                index: this.index,
                text: a
            }), this.index++; else if (this.isWhitespace(a)) this.index++; else {
                var b = a + this.peek(), c = b + this.peek(2), d = me[b], e = me[c];
                me[a] || d || e ? (a = e ? c : d ? b : a, this.tokens.push({
                    index: this.index,
                    text: a,
                    operator: !0
                }), this.index += a.length) : this.throwError("Unexpected next character ", this.index, this.index + 1);
            }
            return this.tokens;
        },
        is: function(a, b) {
            return -1 !== b.indexOf(a);
        },
        peek: function(a) {
            return a = a || 1, this.index + a < this.text.length && this.text.charAt(this.index + a);
        },
        isNumber: function(a) {
            return "0" <= a && "9" >= a && "string" == typeof a;
        },
        isWhitespace: function(a) {
            return " " === a || "\r" === a || "\t" === a || "\n" === a || "\x0B" === a || " " === a;
        },
        isIdent: function(a) {
            return "a" <= a && "z" >= a || "A" <= a && "Z" >= a || "_" === a || "$" === a;
        },
        isExpOperator: function(a) {
            return "-" === a || "+" === a || this.isNumber(a);
        },
        throwError: function(a, b, c) {
            throw c = c || this.index, b = t(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, c) + "]" : " " + c, 
            ie("lexerr", a, b, this.text);
        },
        readNumber: function() {
            for (var a = "", b = this.index; this.index < this.text.length; ) {
                var c = Uc(this.text.charAt(this.index));
                if ("." == c || this.isNumber(c)) a += c; else {
                    var d = this.peek();
                    if ("e" == c && this.isExpOperator(d)) a += c; else if (this.isExpOperator(c) && d && this.isNumber(d) && "e" == a.charAt(a.length - 1)) a += c; else {
                        if (!this.isExpOperator(c) || d && this.isNumber(d) || "e" != a.charAt(a.length - 1)) break;
                        this.throwError("Invalid exponent");
                    }
                }
                this.index++;
            }
            this.tokens.push({
                index: b,
                text: a,
                constant: !0,
                value: Number(a)
            });
        },
        readIdent: function() {
            for (var a = this.index; this.index < this.text.length; ) {
                var b = this.text.charAt(this.index);
                if (!this.isIdent(b) && !this.isNumber(b)) break;
                this.index++;
            }
            this.tokens.push({
                index: a,
                text: this.text.slice(a, this.index),
                identifier: !0
            });
        },
        readString: function(a) {
            var b = this.index;
            this.index++;
            for (var c = "", d = a, e = !1; this.index < this.text.length; ) {
                var f = this.text.charAt(this.index), d = d + f;
                if (e) "u" === f ? (e = this.text.substring(this.index + 1, this.index + 5), e.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + e + "]"), 
                this.index += 4, c += String.fromCharCode(parseInt(e, 16))) : c += ne[f] || f, e = !1; else if ("\\" === f) e = !0; else {
                    if (f === a) return this.index++, void this.tokens.push({
                        index: b,
                        text: d,
                        constant: !0,
                        value: c
                    });
                    c += f;
                }
                this.index++;
            }
            this.throwError("Unterminated quote", b);
        }
    };
    var pe = function(a, b) {
        this.lexer = a, this.options = b;
    };
    pe.Program = "Program", pe.ExpressionStatement = "ExpressionStatement", pe.AssignmentExpression = "AssignmentExpression", 
    pe.ConditionalExpression = "ConditionalExpression", pe.LogicalExpression = "LogicalExpression", 
    pe.BinaryExpression = "BinaryExpression", pe.UnaryExpression = "UnaryExpression", 
    pe.CallExpression = "CallExpression", pe.MemberExpression = "MemberExpression", 
    pe.Identifier = "Identifier", pe.Literal = "Literal", pe.ArrayExpression = "ArrayExpression", 
    pe.Property = "Property", pe.ObjectExpression = "ObjectExpression", pe.ThisExpression = "ThisExpression", 
    pe.NGValueParameter = "NGValueParameter", pe.prototype = {
        ast: function(a) {
            return this.text = a, this.tokens = this.lexer.lex(a), a = this.program(), 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), 
            a;
        },
        program: function() {
            for (var a = []; ;) if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.expressionStatement()), 
            !this.expect(";")) return {
                type: pe.Program,
                body: a
            };
        },
        expressionStatement: function() {
            return {
                type: pe.ExpressionStatement,
                expression: this.filterChain()
            };
        },
        filterChain: function() {
            for (var a = this.expression(); this.expect("|"); ) a = this.filter(a);
            return a;
        },
        expression: function() {
            return this.assignment();
        },
        assignment: function() {
            var a = this.ternary();
            return this.expect("=") && (a = {
                type: pe.AssignmentExpression,
                left: a,
                right: this.assignment(),
                operator: "="
            }), a;
        },
        ternary: function() {
            var a, b, c = this.logicalOR();
            return this.expect("?") && (a = this.expression(), this.consume(":")) ? (b = this.expression(), 
            {
                type: pe.ConditionalExpression,
                test: c,
                alternate: a,
                consequent: b
            }) : c;
        },
        logicalOR: function() {
            for (var a = this.logicalAND(); this.expect("||"); ) a = {
                type: pe.LogicalExpression,
                operator: "||",
                left: a,
                right: this.logicalAND()
            };
            return a;
        },
        logicalAND: function() {
            for (var a = this.equality(); this.expect("&&"); ) a = {
                type: pe.LogicalExpression,
                operator: "&&",
                left: a,
                right: this.equality()
            };
            return a;
        },
        equality: function() {
            for (var a, b = this.relational(); a = this.expect("==", "!=", "===", "!=="); ) b = {
                type: pe.BinaryExpression,
                operator: a.text,
                left: b,
                right: this.relational()
            };
            return b;
        },
        relational: function() {
            for (var a, b = this.additive(); a = this.expect("<", ">", "<=", ">="); ) b = {
                type: pe.BinaryExpression,
                operator: a.text,
                left: b,
                right: this.additive()
            };
            return b;
        },
        additive: function() {
            for (var a, b = this.multiplicative(); a = this.expect("+", "-"); ) b = {
                type: pe.BinaryExpression,
                operator: a.text,
                left: b,
                right: this.multiplicative()
            };
            return b;
        },
        multiplicative: function() {
            for (var a, b = this.unary(); a = this.expect("*", "/", "%"); ) b = {
                type: pe.BinaryExpression,
                operator: a.text,
                left: b,
                right: this.unary()
            };
            return b;
        },
        unary: function() {
            var a;
            return (a = this.expect("+", "-", "!")) ? {
                type: pe.UnaryExpression,
                operator: a.text,
                prefix: !0,
                argument: this.unary()
            } : this.primary();
        },
        primary: function() {
            var a;
            this.expect("(") ? (a = this.filterChain(), this.consume(")")) : this.expect("[") ? a = this.arrayDeclaration() : this.expect("{") ? a = this.object() : this.constants.hasOwnProperty(this.peek().text) ? a = J(this.constants[this.consume().text]) : this.peek().identifier ? a = this.identifier() : this.peek().constant ? a = this.constant() : this.throwError("not a primary expression", this.peek());
            for (var b; b = this.expect("(", "[", "."); ) "(" === b.text ? (a = {
                type: pe.CallExpression,
                callee: a,
                arguments: this.parseArguments()
            }, this.consume(")")) : "[" === b.text ? (a = {
                type: pe.MemberExpression,
                object: a,
                property: this.expression(),
                computed: !0
            }, this.consume("]")) : "." === b.text ? a = {
                type: pe.MemberExpression,
                object: a,
                property: this.identifier(),
                computed: !1
            } : this.throwError("IMPOSSIBLE");
            return a;
        },
        filter: function(a) {
            a = [ a ];
            for (var b = {
                type: pe.CallExpression,
                callee: this.identifier(),
                arguments: a,
                filter: !0
            }; this.expect(":"); ) a.push(this.expression());
            return b;
        },
        parseArguments: function() {
            var a = [];
            if (")" !== this.peekToken().text) do a.push(this.expression()); while (this.expect(","));
            return a;
        },
        identifier: function() {
            var a = this.consume();
            return a.identifier || this.throwError("is not a valid identifier", a), {
                type: pe.Identifier,
                name: a.text
            };
        },
        constant: function() {
            return {
                type: pe.Literal,
                value: this.consume().value
            };
        },
        arrayDeclaration: function() {
            var a = [];
            if ("]" !== this.peekToken().text) do {
                if (this.peek("]")) break;
                a.push(this.expression());
            } while (this.expect(","));
            return this.consume("]"), {
                type: pe.ArrayExpression,
                elements: a
            };
        },
        object: function() {
            var a, b = [];
            if ("}" !== this.peekToken().text) do {
                if (this.peek("}")) break;
                a = {
                    type: pe.Property,
                    kind: "init"
                }, this.peek().constant ? a.key = this.constant() : this.peek().identifier ? a.key = this.identifier() : this.throwError("invalid key", this.peek()), 
                this.consume(":"), a.value = this.expression(), b.push(a);
            } while (this.expect(","));
            return this.consume("}"), {
                type: pe.ObjectExpression,
                properties: b
            };
        },
        throwError: function(a, b) {
            throw ie("syntax", b.text, a, b.index + 1, this.text, this.text.substring(b.index));
        },
        consume: function(a) {
            if (0 === this.tokens.length) throw ie("ueoe", this.text);
            var b = this.expect(a);
            return b || this.throwError("is unexpected, expecting [" + a + "]", this.peek()), 
            b;
        },
        peekToken: function() {
            if (0 === this.tokens.length) throw ie("ueoe", this.text);
            return this.tokens[0];
        },
        peek: function(a, b, c, d) {
            return this.peekAhead(0, a, b, c, d);
        },
        peekAhead: function(a, b, c, d, e) {
            if (this.tokens.length > a) {
                a = this.tokens[a];
                var f = a.text;
                if (f === b || f === c || f === d || f === e || !(b || c || d || e)) return a;
            }
            return !1;
        },
        expect: function(a, b, c, d) {
            return !!(a = this.peek(a, b, c, d)) && (this.tokens.shift(), a);
        },
        constants: {
            "true": {
                type: pe.Literal,
                value: !0
            },
            "false": {
                type: pe.Literal,
                value: !1
            },
            "null": {
                type: pe.Literal,
                value: null
            },
            undefined: {
                type: pe.Literal,
                value: c
            },
            "this": {
                type: pe.ThisExpression
            }
        }
    }, Ob.prototype = {
        compile: function(a, b) {
            var d = this, e = this.astBuilder.ast(a);
            this.state = {
                nextId: 0,
                filters: {},
                expensiveChecks: b,
                fn: {
                    vars: [],
                    body: [],
                    own: {}
                },
                assign: {
                    vars: [],
                    body: [],
                    own: {}
                },
                inputs: []
            }, Jb(e, d.$filter);
            var g, h = "";
            return this.stage = "assign", (g = Mb(e)) && (this.state.computing = "assign", h = this.nextId(), 
            this.recurse(g, h), this.return_(h), h = "fn.assign=" + this.generateFunction("assign", "s,v,l")), 
            g = Kb(e.body), d.stage = "inputs", f(g, function(a, b) {
                var c = "fn" + b;
                d.state[c] = {
                    vars: [],
                    body: [],
                    own: {}
                }, d.state.computing = c;
                var e = d.nextId();
                d.recurse(a, e), d.return_(e), d.state.inputs.push(c), a.watchId = b;
            }), this.state.computing = "fn", this.stage = "main", this.recurse(e), h = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + h + this.watchFns() + "return fn;", 
            h = new Function("$filter", "ensureSafeMemberName", "ensureSafeObject", "ensureSafeFunction", "getStringValue", "ensureSafeAssignContext", "ifDefined", "plus", "text", h)(this.$filter, Cb, Eb, Fb, Db, Gb, Hb, Ib, a), 
            this.state = this.stage = c, h.literal = Nb(e), h.constant = e.constant, h;
        },
        USE: "use",
        STRICT: "strict",
        watchFns: function() {
            var a = [], b = this.state.inputs, c = this;
            return f(b, function(b) {
                a.push("var " + b + "=" + c.generateFunction(b, "s"));
            }), b.length && a.push("fn.inputs=[" + b.join(",") + "];"), a.join("");
        },
        generateFunction: function(a, b) {
            return "function(" + b + "){" + this.varsPrefix(a) + this.body(a) + "};";
        },
        filterPrefix: function() {
            var a = [], b = this;
            return f(this.state.filters, function(c, d) {
                a.push(c + "=$filter(" + b.escape(d) + ")");
            }), a.length ? "var " + a.join(",") + ";" : "";
        },
        varsPrefix: function(a) {
            return this.state[a].vars.length ? "var " + this.state[a].vars.join(",") + ";" : "";
        },
        body: function(a) {
            return this.state[a].body.join("");
        },
        recurse: function(a, b, d, e, g, h) {
            var i, j, k, l, m = this;
            if (e = e || o, !h && t(a.watchId)) b = b || this.nextId(), this.if_("i", this.lazyAssign(b, this.computedMember("i", a.watchId)), this.lazyRecurse(a, b, d, e, g, !0)); else switch (a.type) {
              case pe.Program:
                f(a.body, function(b, d) {
                    m.recurse(b.expression, c, c, function(a) {
                        j = a;
                    }), d !== a.body.length - 1 ? m.current().body.push(j, ";") : m.return_(j);
                });
                break;

              case pe.Literal:
                l = this.escape(a.value), this.assign(b, l), e(l);
                break;

              case pe.UnaryExpression:
                this.recurse(a.argument, c, c, function(a) {
                    j = a;
                }), l = a.operator + "(" + this.ifDefined(j, 0) + ")", this.assign(b, l), e(l);
                break;

              case pe.BinaryExpression:
                this.recurse(a.left, c, c, function(a) {
                    i = a;
                }), this.recurse(a.right, c, c, function(a) {
                    j = a;
                }), l = "+" === a.operator ? this.plus(i, j) : "-" === a.operator ? this.ifDefined(i, 0) + a.operator + this.ifDefined(j, 0) : "(" + i + ")" + a.operator + "(" + j + ")", 
                this.assign(b, l), e(l);
                break;

              case pe.LogicalExpression:
                b = b || this.nextId(), m.recurse(a.left, b), m.if_("&&" === a.operator ? b : m.not(b), m.lazyRecurse(a.right, b)), 
                e(b);
                break;

              case pe.ConditionalExpression:
                b = b || this.nextId(), m.recurse(a.test, b), m.if_(b, m.lazyRecurse(a.alternate, b), m.lazyRecurse(a.consequent, b)), 
                e(b);
                break;

              case pe.Identifier:
                b = b || this.nextId(), d && (d.context = "inputs" === m.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", a.name) + "?l:s"), 
                d.computed = !1, d.name = a.name), Cb(a.name), m.if_("inputs" === m.stage || m.not(m.getHasOwnProperty("l", a.name)), function() {
                    m.if_("inputs" === m.stage || "s", function() {
                        g && 1 !== g && m.if_(m.not(m.nonComputedMember("s", a.name)), m.lazyAssign(m.nonComputedMember("s", a.name), "{}")), 
                        m.assign(b, m.nonComputedMember("s", a.name));
                    });
                }, b && m.lazyAssign(b, m.nonComputedMember("l", a.name))), (m.state.expensiveChecks || Qb(a.name)) && m.addEnsureSafeObject(b), 
                e(b);
                break;

              case pe.MemberExpression:
                i = d && (d.context = this.nextId()) || this.nextId(), b = b || this.nextId(), m.recurse(a.object, i, c, function() {
                    m.if_(m.notNull(i), function() {
                        g && 1 !== g && m.addEnsureSafeAssignContext(i), a.computed ? (j = m.nextId(), m.recurse(a.property, j), 
                        m.getStringValue(j), m.addEnsureSafeMemberName(j), g && 1 !== g && m.if_(m.not(m.computedMember(i, j)), m.lazyAssign(m.computedMember(i, j), "{}")), 
                        l = m.ensureSafeObject(m.computedMember(i, j)), m.assign(b, l), d && (d.computed = !0, 
                        d.name = j)) : (Cb(a.property.name), g && 1 !== g && m.if_(m.not(m.nonComputedMember(i, a.property.name)), m.lazyAssign(m.nonComputedMember(i, a.property.name), "{}")), 
                        l = m.nonComputedMember(i, a.property.name), (m.state.expensiveChecks || Qb(a.property.name)) && (l = m.ensureSafeObject(l)), 
                        m.assign(b, l), d && (d.computed = !1, d.name = a.property.name));
                    }, function() {
                        m.assign(b, "undefined");
                    }), e(b);
                }, !!g);
                break;

              case pe.CallExpression:
                b = b || this.nextId(), a.filter ? (j = m.filter(a.callee.name), k = [], f(a.arguments, function(a) {
                    var b = m.nextId();
                    m.recurse(a, b), k.push(b);
                }), l = j + "(" + k.join(",") + ")", m.assign(b, l), e(b)) : (j = m.nextId(), i = {}, 
                k = [], m.recurse(a.callee, j, i, function() {
                    m.if_(m.notNull(j), function() {
                        m.addEnsureSafeFunction(j), f(a.arguments, function(a) {
                            m.recurse(a, m.nextId(), c, function(a) {
                                k.push(m.ensureSafeObject(a));
                            });
                        }), i.name ? (m.state.expensiveChecks || m.addEnsureSafeObject(i.context), l = m.member(i.context, i.name, i.computed) + "(" + k.join(",") + ")") : l = j + "(" + k.join(",") + ")", 
                        l = m.ensureSafeObject(l), m.assign(b, l);
                    }, function() {
                        m.assign(b, "undefined");
                    }), e(b);
                }));
                break;

              case pe.AssignmentExpression:
                if (j = this.nextId(), i = {}, !Lb(a.left)) throw ie("lval");
                this.recurse(a.left, c, i, function() {
                    m.if_(m.notNull(i.context), function() {
                        m.recurse(a.right, j), m.addEnsureSafeObject(m.member(i.context, i.name, i.computed)), 
                        m.addEnsureSafeAssignContext(i.context), l = m.member(i.context, i.name, i.computed) + a.operator + j, 
                        m.assign(b, l), e(b || l);
                    });
                }, 1);
                break;

              case pe.ArrayExpression:
                k = [], f(a.elements, function(a) {
                    m.recurse(a, m.nextId(), c, function(a) {
                        k.push(a);
                    });
                }), l = "[" + k.join(",") + "]", this.assign(b, l), e(l);
                break;

              case pe.ObjectExpression:
                k = [], f(a.properties, function(a) {
                    m.recurse(a.value, m.nextId(), c, function(b) {
                        k.push(m.escape(a.key.type === pe.Identifier ? a.key.name : "" + a.key.value) + ":" + b);
                    });
                }), l = "{" + k.join(",") + "}", this.assign(b, l), e(l);
                break;

              case pe.ThisExpression:
                this.assign(b, "s"), e("s");
                break;

              case pe.NGValueParameter:
                this.assign(b, "v"), e("v");
            }
        },
        getHasOwnProperty: function(a, b) {
            var c = a + "." + b, d = this.current().own;
            return d.hasOwnProperty(c) || (d[c] = this.nextId(!1, a + "&&(" + this.escape(b) + " in " + a + ")")), 
            d[c];
        },
        assign: function(a, b) {
            if (a) return this.current().body.push(a, "=", b, ";"), a;
        },
        filter: function(a) {
            return this.state.filters.hasOwnProperty(a) || (this.state.filters[a] = this.nextId(!0)), 
            this.state.filters[a];
        },
        ifDefined: function(a, b) {
            return "ifDefined(" + a + "," + this.escape(b) + ")";
        },
        plus: function(a, b) {
            return "plus(" + a + "," + b + ")";
        },
        return_: function(a) {
            this.current().body.push("return ", a, ";");
        },
        if_: function(a, b, c) {
            if (!0 === a) b(); else {
                var d = this.current().body;
                d.push("if(", a, "){"), b(), d.push("}"), c && (d.push("else{"), c(), d.push("}"));
            }
        },
        not: function(a) {
            return "!(" + a + ")";
        },
        notNull: function(a) {
            return a + "!=null";
        },
        nonComputedMember: function(a, b) {
            return a + "." + b;
        },
        computedMember: function(a, b) {
            return a + "[" + b + "]";
        },
        member: function(a, b, c) {
            return c ? this.computedMember(a, b) : this.nonComputedMember(a, b);
        },
        addEnsureSafeObject: function(a) {
            this.current().body.push(this.ensureSafeObject(a), ";");
        },
        addEnsureSafeMemberName: function(a) {
            this.current().body.push(this.ensureSafeMemberName(a), ";");
        },
        addEnsureSafeFunction: function(a) {
            this.current().body.push(this.ensureSafeFunction(a), ";");
        },
        addEnsureSafeAssignContext: function(a) {
            this.current().body.push(this.ensureSafeAssignContext(a), ";");
        },
        ensureSafeObject: function(a) {
            return "ensureSafeObject(" + a + ",text)";
        },
        ensureSafeMemberName: function(a) {
            return "ensureSafeMemberName(" + a + ",text)";
        },
        ensureSafeFunction: function(a) {
            return "ensureSafeFunction(" + a + ",text)";
        },
        getStringValue: function(a) {
            this.assign(a, "getStringValue(" + a + ",text)");
        },
        ensureSafeAssignContext: function(a) {
            return "ensureSafeAssignContext(" + a + ",text)";
        },
        lazyRecurse: function(a, b, c, d, e, f) {
            var g = this;
            return function() {
                g.recurse(a, b, c, d, e, f);
            };
        },
        lazyAssign: function(a, b) {
            var c = this;
            return function() {
                c.assign(a, b);
            };
        },
        stringEscapeRegex: /[^ a-zA-Z0-9]/g,
        stringEscapeFn: function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        },
        escape: function(a) {
            if (w(a)) return "'" + a.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
            if (x(a)) return a.toString();
            if (!0 === a) return "true";
            if (!1 === a) return "false";
            if (null === a) return "null";
            if ("undefined" == typeof a) return "undefined";
            throw ie("esc");
        },
        nextId: function(a, b) {
            var c = "v" + this.state.nextId++;
            return a || this.current().vars.push(c + (b ? "=" + b : "")), c;
        },
        current: function() {
            return this.state[this.state.computing];
        }
    }, Pb.prototype = {
        compile: function(a, b) {
            var c = this, d = this.astBuilder.ast(a);
            this.expression = a, this.expensiveChecks = b, Jb(d, c.$filter);
            var e, g;
            (e = Mb(d)) && (g = this.recurse(e)), e = Kb(d.body);
            var h;
            e && (h = [], f(e, function(a, b) {
                var d = c.recurse(a);
                a.input = d, h.push(d), a.watchId = b;
            }));
            var i = [];
            return f(d.body, function(a) {
                i.push(c.recurse(a.expression));
            }), e = 0 === d.body.length ? function() {} : 1 === d.body.length ? i[0] : function(a, b) {
                var c;
                return f(i, function(d) {
                    c = d(a, b);
                }), c;
            }, g && (e.assign = function(a, b, c) {
                return g(a, c, b);
            }), h && (e.inputs = h), e.literal = Nb(d), e.constant = d.constant, e;
        },
        recurse: function(a, b, d) {
            var e, g, h, i = this;
            if (a.input) return this.inputs(a.input, a.watchId);
            switch (a.type) {
              case pe.Literal:
                return this.value(a.value, b);

              case pe.UnaryExpression:
                return g = this.recurse(a.argument), this["unary" + a.operator](g, b);

              case pe.BinaryExpression:
                return e = this.recurse(a.left), g = this.recurse(a.right), this["binary" + a.operator](e, g, b);

              case pe.LogicalExpression:
                return e = this.recurse(a.left), g = this.recurse(a.right), this["binary" + a.operator](e, g, b);

              case pe.ConditionalExpression:
                return this["ternary?:"](this.recurse(a.test), this.recurse(a.alternate), this.recurse(a.consequent), b);

              case pe.Identifier:
                return Cb(a.name, i.expression), i.identifier(a.name, i.expensiveChecks || Qb(a.name), b, d, i.expression);

              case pe.MemberExpression:
                return e = this.recurse(a.object, !1, !!d), a.computed || (Cb(a.property.name, i.expression), 
                g = a.property.name), a.computed && (g = this.recurse(a.property)), a.computed ? this.computedMember(e, g, b, d, i.expression) : this.nonComputedMember(e, g, i.expensiveChecks, b, d, i.expression);

              case pe.CallExpression:
                return h = [], f(a.arguments, function(a) {
                    h.push(i.recurse(a));
                }), a.filter && (g = this.$filter(a.callee.name)), a.filter || (g = this.recurse(a.callee, !0)), 
                a.filter ? function(a, d, e, f) {
                    for (var i = [], j = 0; j < h.length; ++j) i.push(h[j](a, d, e, f));
                    return a = g.apply(c, i, f), b ? {
                        context: c,
                        name: c,
                        value: a
                    } : a;
                } : function(a, c, d, e) {
                    var f, j = g(a, c, d, e);
                    if (null != j.value) {
                        Eb(j.context, i.expression), Fb(j.value, i.expression), f = [];
                        for (var k = 0; k < h.length; ++k) f.push(Eb(h[k](a, c, d, e), i.expression));
                        f = Eb(j.value.apply(j.context, f), i.expression);
                    }
                    return b ? {
                        value: f
                    } : f;
                };

              case pe.AssignmentExpression:
                return e = this.recurse(a.left, !0, 1), g = this.recurse(a.right), function(a, c, d, f) {
                    var h = e(a, c, d, f);
                    return a = g(a, c, d, f), Eb(h.value, i.expression), Gb(h.context), h.context[h.name] = a, 
                    b ? {
                        value: a
                    } : a;
                };

              case pe.ArrayExpression:
                return h = [], f(a.elements, function(a) {
                    h.push(i.recurse(a));
                }), function(a, c, d, e) {
                    for (var f = [], g = 0; g < h.length; ++g) f.push(h[g](a, c, d, e));
                    return b ? {
                        value: f
                    } : f;
                };

              case pe.ObjectExpression:
                return h = [], f(a.properties, function(a) {
                    h.push({
                        key: a.key.type === pe.Identifier ? a.key.name : "" + a.key.value,
                        value: i.recurse(a.value)
                    });
                }), function(a, c, d, e) {
                    for (var f = {}, g = 0; g < h.length; ++g) f[h[g].key] = h[g].value(a, c, d, e);
                    return b ? {
                        value: f
                    } : f;
                };

              case pe.ThisExpression:
                return function(a) {
                    return b ? {
                        value: a
                    } : a;
                };

              case pe.NGValueParameter:
                return function(a, c, d, e) {
                    return b ? {
                        value: d
                    } : d;
                };
            }
        },
        "unary+": function(a, b) {
            return function(c, d, e, f) {
                return c = a(c, d, e, f), c = t(c) ? +c : 0, b ? {
                    value: c
                } : c;
            };
        },
        "unary-": function(a, b) {
            return function(c, d, e, f) {
                return c = a(c, d, e, f), c = t(c) ? -c : 0, b ? {
                    value: c
                } : c;
            };
        },
        "unary!": function(a, b) {
            return function(c, d, e, f) {
                return c = !a(c, d, e, f), b ? {
                    value: c
                } : c;
            };
        },
        "binary+": function(a, b, c) {
            return function(d, e, f, g) {
                var h = a(d, e, f, g);
                return d = b(d, e, f, g), h = Ib(h, d), c ? {
                    value: h
                } : h;
            };
        },
        "binary-": function(a, b, c) {
            return function(d, e, f, g) {
                var h = a(d, e, f, g);
                return d = b(d, e, f, g), h = (t(h) ? h : 0) - (t(d) ? d : 0), c ? {
                    value: h
                } : h;
            };
        },
        "binary*": function(a, b, c) {
            return function(d, e, f, g) {
                return d = a(d, e, f, g) * b(d, e, f, g), c ? {
                    value: d
                } : d;
            };
        },
        "binary/": function(a, b, c) {
            return function(d, e, f, g) {
                return d = a(d, e, f, g) / b(d, e, f, g), c ? {
                    value: d
                } : d;
            };
        },
        "binary%": function(a, b, c) {
            return function(d, e, f, g) {
                return d = a(d, e, f, g) % b(d, e, f, g), c ? {
                    value: d
                } : d;
            };
        },
        "binary===": function(a, b, c) {
            return function(d, e, f, g) {
                return d = a(d, e, f, g) === b(d, e, f, g), c ? {
                    value: d
                } : d;
            };
        },
        "binary!==": function(a, b, c) {
            return function(d, e, f, g) {
                return d = a(d, e, f, g) !== b(d, e, f, g), c ? {
                    value: d
                } : d;
            };
        },
        "binary==": function(a, b, c) {
            return function(d, e, f, g) {
                return d = a(d, e, f, g) == b(d, e, f, g), c ? {
                    value: d
                } : d;
            };
        },
        "binary!=": function(a, b, c) {
            return function(d, e, f, g) {
                return d = a(d, e, f, g) != b(d, e, f, g), c ? {
                    value: d
                } : d;
            };
        },
        "binary<": function(a, b, c) {
            return function(d, e, f, g) {
                return d = a(d, e, f, g) < b(d, e, f, g), c ? {
                    value: d
                } : d;
            };
        },
        "binary>": function(a, b, c) {
            return function(d, e, f, g) {
                return d = a(d, e, f, g) > b(d, e, f, g), c ? {
                    value: d
                } : d;
            };
        },
        "binary<=": function(a, b, c) {
            return function(d, e, f, g) {
                return d = a(d, e, f, g) <= b(d, e, f, g), c ? {
                    value: d
                } : d;
            };
        },
        "binary>=": function(a, b, c) {
            return function(d, e, f, g) {
                return d = a(d, e, f, g) >= b(d, e, f, g), c ? {
                    value: d
                } : d;
            };
        },
        "binary&&": function(a, b, c) {
            return function(d, e, f, g) {
                return d = a(d, e, f, g) && b(d, e, f, g), c ? {
                    value: d
                } : d;
            };
        },
        "binary||": function(a, b, c) {
            return function(d, e, f, g) {
                return d = a(d, e, f, g) || b(d, e, f, g), c ? {
                    value: d
                } : d;
            };
        },
        "ternary?:": function(a, b, c, d) {
            return function(e, f, g, h) {
                return e = a(e, f, g, h) ? b(e, f, g, h) : c(e, f, g, h), d ? {
                    value: e
                } : e;
            };
        },
        value: function(a, b) {
            return function() {
                return b ? {
                    context: c,
                    name: c,
                    value: a
                } : a;
            };
        },
        identifier: function(a, b, d, e, f) {
            return function(g, h, i, j) {
                return g = h && a in h ? h : g, e && 1 !== e && g && !g[a] && (g[a] = {}), h = g ? g[a] : c, 
                b && Eb(h, f), d ? {
                    context: g,
                    name: a,
                    value: h
                } : h;
            };
        },
        computedMember: function(a, b, c, d, e) {
            return function(f, g, h, i) {
                var j, k, l = a(f, g, h, i);
                return null != l && (j = b(f, g, h, i), j = Db(j), Cb(j, e), d && 1 !== d && (Gb(l), 
                l && !l[j] && (l[j] = {})), k = l[j], Eb(k, e)), c ? {
                    context: l,
                    name: j,
                    value: k
                } : k;
            };
        },
        nonComputedMember: function(a, b, d, e, f, g) {
            return function(h, i, j, k) {
                return h = a(h, i, j, k), f && 1 !== f && (Gb(h), h && !h[b] && (h[b] = {})), i = null != h ? h[b] : c, 
                (d || Qb(b)) && Eb(i, g), e ? {
                    context: h,
                    name: b,
                    value: i
                } : i;
            };
        },
        inputs: function(a, b) {
            return function(c, d, e, f) {
                return f ? f[b] : a(c, d, e);
            };
        }
    };
    var qe = function(a, b, c) {
        this.lexer = a, this.$filter = b, this.options = c, this.ast = new pe(this.lexer), 
        this.astCompiler = c.csp ? new Pb(this.ast, b) : new Ob(this.ast, b);
    };
    qe.prototype = {
        constructor: qe,
        parse: function(a) {
            return this.astCompiler.compile(a, this.options.expensiveChecks);
        }
    };
    var re = Object.prototype.valueOf, se = d("$sce"), te = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
    }, Td = d("$compile"), ue = b.createElement("a"), ve = fc(a.location.href);
    ic.$inject = [ "$document" ], kc.$inject = [ "$provide" ];
    var we = 22, xe = ".", ye = "0";
    pc.$inject = [ "$locale" ], qc.$inject = [ "$locale" ];
    var ze = {
        yyyy: vc("FullYear", 4),
        yy: vc("FullYear", 2, 0, !0),
        y: vc("FullYear", 1),
        MMMM: wc("Month"),
        MMM: wc("Month", !0),
        MM: vc("Month", 2, 1),
        M: vc("Month", 1, 1),
        dd: vc("Date", 2),
        d: vc("Date", 1),
        HH: vc("Hours", 2),
        H: vc("Hours", 1),
        hh: vc("Hours", 2, -12),
        h: vc("Hours", 1, -12),
        mm: vc("Minutes", 2),
        m: vc("Minutes", 1),
        ss: vc("Seconds", 2),
        s: vc("Seconds", 1),
        sss: vc("Milliseconds", 3),
        EEEE: wc("Day"),
        EEE: wc("Day", !0),
        a: function(a, b) {
            return 12 > a.getHours() ? b.AMPMS[0] : b.AMPMS[1];
        },
        Z: function(a, b, c) {
            return a = -1 * c, a = (0 <= a ? "+" : "") + (uc(Math[0 < a ? "floor" : "ceil"](a / 60), 2) + uc(Math.abs(a % 60), 2));
        },
        ww: yc(2),
        w: yc(1),
        G: zc,
        GG: zc,
        GGG: zc,
        GGGG: function(a, b) {
            return 0 >= a.getFullYear() ? b.ERANAMES[0] : b.ERANAMES[1];
        }
    }, Ae = /((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/, Be = /^\-?\d+$/;
    Ac.$inject = [ "$locale" ];
    var Ce = q(Uc), De = q(Wc);
    Dc.$inject = [ "$parse" ];
    var Ee = q({
        restrict: "E",
        compile: function(a, b) {
            if (!b.href && !b.xlinkHref) return function(a, b) {
                if ("a" === b[0].nodeName.toLowerCase()) {
                    var c = "[object SVGAnimatedString]" === $c.call(b.prop("href")) ? "xlink:href" : "href";
                    b.on("click", function(a) {
                        b.attr(c) || a.preventDefault();
                    });
                }
            };
        }
    }), Fe = {};
    f(Dd, function(a, b) {
        function c(a, c, e) {
            a.$watch(e[d], function(a) {
                e.$set(b, !!a);
            });
        }
        if ("multiple" != a) {
            var d = Ya("ng-" + b), e = c;
            "checked" === a && (e = function(a, b, e) {
                e.ngModel !== e[d] && c(a, b, e);
            }), Fe[d] = function() {
                return {
                    restrict: "A",
                    priority: 100,
                    link: e
                };
            };
        }
    }), f(Fd, function(a, b) {
        Fe[b] = function() {
            return {
                priority: 100,
                link: function(a, c, d) {
                    return "ngPattern" === b && "/" == d.ngPattern.charAt(0) && (c = d.ngPattern.match(Tc)) ? void d.$set("ngPattern", new RegExp(c[1], c[2])) : void a.$watch(d[b], function(a) {
                        d.$set(b, a);
                    });
                }
            };
        };
    }), f([ "src", "srcset", "href" ], function(a) {
        var b = Ya("ng-" + a);
        Fe[b] = function() {
            return {
                priority: 99,
                link: function(c, d, e) {
                    var f = a, g = a;
                    "href" === a && "[object SVGAnimatedString]" === $c.call(d.prop("href")) && (g = "xlinkHref", 
                    e.$attr[g] = "xlink:href", f = null), e.$observe(b, function(b) {
                        b ? (e.$set(g, b), Pc && f && d.prop(f, e[g])) : "href" === a && e.$set(g, null);
                    });
                }
            };
        };
    });
    var Ge = {
        $addControl: o,
        $$renameControl: function(a, b) {
            a.$name = b;
        },
        $removeControl: o,
        $setValidity: o,
        $setDirty: o,
        $setPristine: o,
        $setSubmitted: o
    };
    Fc.$inject = [ "$element", "$attrs", "$scope", "$animate", "$interpolate" ];
    var He = function(a) {
        return [ "$timeout", "$parse", function(b, d) {
            function e(a) {
                return "" === a ? d('this[""]').assign : d(a).assign || o;
            }
            return {
                name: "form",
                restrict: a ? "EAC" : "E",
                require: [ "form", "^^?form" ],
                controller: Fc,
                compile: function(d, f) {
                    d.addClass(pf).addClass(nf);
                    var g = f.name ? "name" : !(!a || !f.ngForm) && "ngForm";
                    return {
                        pre: function(a, d, f, h) {
                            var i = h[0];
                            if (!("action" in f)) {
                                var j = function(b) {
                                    a.$apply(function() {
                                        i.$commitViewValue(), i.$setSubmitted();
                                    }), b.preventDefault();
                                };
                                d[0].addEventListener("submit", j, !1), d.on("$destroy", function() {
                                    b(function() {
                                        d[0].removeEventListener("submit", j, !1);
                                    }, 0, !1);
                                });
                            }
                            (h[1] || i.$$parentForm).$addControl(i);
                            var l = g ? e(i.$name) : o;
                            g && (l(a, i), f.$observe(g, function(b) {
                                i.$name !== b && (l(a, c), i.$$parentForm.$$renameControl(i, b), (l = e(i.$name))(a, i));
                            })), d.on("$destroy", function() {
                                i.$$parentForm.$removeControl(i), l(a, c), k(i, Ge);
                            });
                        }
                    };
                }
            };
        } ];
    }, Ie = He(), Je = He(!0), Ke = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/, Le = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:\/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i, Me = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, Ne = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, Oe = /^(\d{4})-(\d{2})-(\d{2})$/, Pe = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, Qe = /^(\d{4})-W(\d\d)$/, Re = /^(\d{4})-(\d\d)$/, Se = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, Te = ja();
    f([ "date", "datetime-local", "month", "time", "week" ], function(a) {
        Te[a] = !0;
    });
    var Ue = {
        text: function(a, b, c, d, e, f) {
            Hc(a, b, c, d, e, f), Gc(d);
        },
        date: Jc("date", Oe, Ic(Oe, [ "yyyy", "MM", "dd" ]), "yyyy-MM-dd"),
        "datetime-local": Jc("datetimelocal", Pe, Ic(Pe, "yyyy MM dd HH mm ss sss".split(" ")), "yyyy-MM-ddTHH:mm:ss.sss"),
        time: Jc("time", Se, Ic(Se, [ "HH", "mm", "ss", "sss" ]), "HH:mm:ss.sss"),
        week: Jc("week", Qe, function(a, b) {
            if (y(a)) return a;
            if (w(a)) {
                Qe.lastIndex = 0;
                var c = Qe.exec(a);
                if (c) {
                    var d = +c[1], e = +c[2], f = c = 0, g = 0, h = 0, i = xc(d), e = 7 * (e - 1);
                    return b && (c = b.getHours(), f = b.getMinutes(), g = b.getSeconds(), h = b.getMilliseconds()), 
                    new Date(d, 0, i.getDate() + e, c, f, g, h);
                }
            }
            return NaN;
        }, "yyyy-Www"),
        month: Jc("month", Re, Ic(Re, [ "yyyy", "MM" ]), "yyyy-MM"),
        number: function(a, b, d, e, f, g) {
            if (Kc(a, b, d, e), Hc(a, b, d, e, f, g), e.$$parserName = "number", e.$parsers.push(function(a) {
                return e.$isEmpty(a) ? null : Ne.test(a) ? parseFloat(a) : c;
            }), e.$formatters.push(function(a) {
                if (!e.$isEmpty(a)) {
                    if (!x(a)) throw sf("numfmt", a);
                    a = a.toString();
                }
                return a;
            }), t(d.min) || d.ngMin) {
                var h;
                e.$validators.min = function(a) {
                    return e.$isEmpty(a) || s(h) || a >= h;
                }, d.$observe("min", function(a) {
                    t(a) && !x(a) && (a = parseFloat(a, 10)), h = x(a) && !isNaN(a) ? a : c, e.$validate();
                });
            }
            if (t(d.max) || d.ngMax) {
                var i;
                e.$validators.max = function(a) {
                    return e.$isEmpty(a) || s(i) || a <= i;
                }, d.$observe("max", function(a) {
                    t(a) && !x(a) && (a = parseFloat(a, 10)), i = x(a) && !isNaN(a) ? a : c, e.$validate();
                });
            }
        },
        url: function(a, b, c, d, e, f) {
            Hc(a, b, c, d, e, f), Gc(d), d.$$parserName = "url", d.$validators.url = function(a, b) {
                var c = a || b;
                return d.$isEmpty(c) || Le.test(c);
            };
        },
        email: function(a, b, c, d, e, f) {
            Hc(a, b, c, d, e, f), Gc(d), d.$$parserName = "email", d.$validators.email = function(a, b) {
                var c = a || b;
                return d.$isEmpty(c) || Me.test(c);
            };
        },
        radio: function(a, b, c, d) {
            s(c.name) && b.attr("name", ++cd), b.on("click", function(a) {
                b[0].checked && d.$setViewValue(c.value, a && a.type);
            }), d.$render = function() {
                b[0].checked = c.value == d.$viewValue;
            }, c.$observe("value", d.$render);
        },
        checkbox: function(a, b, c, d, e, f, g, h) {
            var i = Lc(h, a, "ngTrueValue", c.ngTrueValue, !0), j = Lc(h, a, "ngFalseValue", c.ngFalseValue, !1);
            b.on("click", function(a) {
                d.$setViewValue(b[0].checked, a && a.type);
            }), d.$render = function() {
                b[0].checked = d.$viewValue;
            }, d.$isEmpty = function(a) {
                return !1 === a;
            }, d.$formatters.push(function(a) {
                return L(a, i);
            }), d.$parsers.push(function(a) {
                return a ? i : j;
            });
        },
        hidden: o,
        button: o,
        submit: o,
        reset: o,
        file: o
    }, Ve = [ "$browser", "$sniffer", "$filter", "$parse", function(a, b, c, d) {
        return {
            restrict: "E",
            require: [ "?ngModel" ],
            link: {
                pre: function(e, f, g, h) {
                    h[0] && (Ue[Uc(g.type)] || Ue.text)(e, f, g, h[0], b, a, c, d);
                }
            }
        };
    } ], We = /^(true|false|\d+)$/, Xe = function() {
        return {
            restrict: "A",
            priority: 100,
            compile: function(a, b) {
                return We.test(b.ngValue) ? function(a, b, c) {
                    c.$set("value", a.$eval(c.ngValue));
                } : function(a, b, c) {
                    a.$watch(c.ngValue, function(a) {
                        c.$set("value", a);
                    });
                };
            }
        };
    }, Ye = [ "$compile", function(a) {
        return {
            restrict: "AC",
            compile: function(b) {
                return a.$$addBindingClass(b), function(b, c, d) {
                    a.$$addBindingInfo(c, d.ngBind), c = c[0], b.$watch(d.ngBind, function(a) {
                        c.textContent = s(a) ? "" : a;
                    });
                };
            }
        };
    } ], Ze = [ "$interpolate", "$compile", function(a, b) {
        return {
            compile: function(c) {
                return b.$$addBindingClass(c), function(c, d, e) {
                    c = a(d.attr(e.$attr.ngBindTemplate)), b.$$addBindingInfo(d, c.expressions), d = d[0], 
                    e.$observe("ngBindTemplate", function(a) {
                        d.textContent = s(a) ? "" : a;
                    });
                };
            }
        };
    } ], $e = [ "$sce", "$parse", "$compile", function(a, b, c) {
        return {
            restrict: "A",
            compile: function(d, e) {
                var f = b(e.ngBindHtml), g = b(e.ngBindHtml, function(b) {
                    return a.valueOf(b);
                });
                return c.$$addBindingClass(d), function(b, d, e) {
                    c.$$addBindingInfo(d, e.ngBindHtml), b.$watch(g, function() {
                        var c = f(b);
                        d.html(a.getTrustedHtml(c) || "");
                    });
                };
            }
        };
    } ], _e = q({
        restrict: "A",
        require: "ngModel",
        link: function(a, b, c, d) {
            d.$viewChangeListeners.push(function() {
                a.$eval(c.ngChange);
            });
        }
    }), af = Mc("", !0), bf = Mc("Odd", 0), cf = Mc("Even", 1), df = Ec({
        compile: function(a, b) {
            b.$set("ngCloak", c), a.removeClass("ng-cloak");
        }
    }), ef = [ function() {
        return {
            restrict: "A",
            scope: !0,
            controller: "@",
            priority: 500
        };
    } ], ff = {}, gf = {
        blur: !0,
        focus: !0
    };
    f("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(a) {
        var b = Ya("ng-" + a);
        ff[b] = [ "$parse", "$rootScope", function(c, d) {
            return {
                restrict: "A",
                compile: function(e, f) {
                    var g = c(f[b], null, !0);
                    return function(b, c) {
                        c.on(a, function(c) {
                            var e = function() {
                                g(b, {
                                    $event: c
                                });
                            };
                            gf[a] && d.$$phase ? b.$evalAsync(e) : b.$apply(e);
                        });
                    };
                }
            };
        } ];
    });
    var hf = [ "$animate", function(a) {
        return {
            multiElement: !0,
            transclude: "element",
            priority: 600,
            terminal: !0,
            restrict: "A",
            $$tlb: !0,
            link: function(c, d, e, f, g) {
                var h, i, j;
                c.$watch(e.ngIf, function(c) {
                    c ? i || g(function(c, f) {
                        i = f, c[c.length++] = b.createComment(" end ngIf: " + e.ngIf + " "), h = {
                            clone: c
                        }, a.enter(c, d.parent(), d);
                    }) : (j && (j.remove(), j = null), i && (i.$destroy(), i = null), h && (j = ia(h.clone), 
                    a.leave(j).then(function() {
                        j = null;
                    }), h = null));
                });
            }
        };
    } ], jf = [ "$templateRequest", "$anchorScroll", "$animate", function(a, b, c) {
        return {
            restrict: "ECA",
            priority: 400,
            terminal: !0,
            transclude: "element",
            controller: bd.noop,
            compile: function(d, e) {
                var f = e.ngInclude || e.src, g = e.onload || "", h = e.autoscroll;
                return function(d, e, i, j, k) {
                    var l, m, n, o = 0, p = function() {
                        m && (m.remove(), m = null), l && (l.$destroy(), l = null), n && (c.leave(n).then(function() {
                            m = null;
                        }), m = n, n = null);
                    };
                    d.$watch(f, function(f) {
                        var i = function() {
                            !t(h) || h && !d.$eval(h) || b();
                        }, m = ++o;
                        f ? (a(f, !0).then(function(a) {
                            if (!d.$$destroyed && m === o) {
                                var b = d.$new();
                                j.template = a, a = k(b, function(a) {
                                    p(), c.enter(a, null, e).then(i);
                                }), l = b, n = a, l.$emit("$includeContentLoaded", f), d.$eval(g);
                            }
                        }, function() {
                            d.$$destroyed || m !== o || (p(), d.$emit("$includeContentError", f));
                        }), d.$emit("$includeContentRequested", f)) : (p(), j.template = null);
                    });
                };
            }
        };
    } ], kf = [ "$compile", function(a) {
        return {
            restrict: "ECA",
            priority: -400,
            require: "ngInclude",
            link: function(c, d, e, f) {
                /SVG/.test(d[0].toString()) ? (d.empty(), a(oa(f.template, b).childNodes)(c, function(a) {
                    d.append(a);
                }, {
                    futureParentElement: d
                })) : (d.html(f.template), a(d.contents())(c));
            }
        };
    } ], lf = Ec({
        priority: 450,
        compile: function() {
            return {
                pre: function(a, b, c) {
                    a.$eval(c.ngInit);
                }
            };
        }
    }), mf = function() {
        return {
            restrict: "A",
            priority: 100,
            require: "ngModel",
            link: function(a, b, d, e) {
                var g = b.attr(d.$attr.ngList) || ", ", h = "false" !== d.ngTrim, i = h ? gd(g) : g;
                e.$parsers.push(function(a) {
                    if (!s(a)) {
                        var b = [];
                        return a && f(a.split(i), function(a) {
                            a && b.push(h ? gd(a) : a);
                        }), b;
                    }
                }), e.$formatters.push(function(a) {
                    return ed(a) ? a.join(g) : c;
                }), e.$isEmpty = function(a) {
                    return !a || !a.length;
                };
            }
        };
    }, nf = "ng-valid", of = "ng-invalid", pf = "ng-pristine", qf = "ng-dirty", rf = "ng-pending", sf = d("ngModel"), tf = [ "$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function(a, b, d, e, g, h, i, j, k, l) {
        this.$modelValue = this.$viewValue = Number.NaN, this.$$rawModelValue = c, this.$validators = {}, 
        this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], 
        this.$untouched = !0, this.$touched = !1, this.$pristine = !0, this.$dirty = !1, 
        this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, this.$pending = c, 
        this.$name = l(d.name || "", !1)(a), this.$$parentForm = Ge;
        var m, n = g(d.ngModel), p = n.assign, q = n, r = p, u = null, v = this;
        this.$$setOptions = function(a) {
            if ((v.$options = a) && a.getterSetter) {
                var b = g(d.ngModel + "()"), c = g(d.ngModel + "($$$p)");
                q = function(a) {
                    var c = n(a);
                    return z(c) && (c = b(a)), c;
                }, r = function(a, b) {
                    z(n(a)) ? c(a, {
                        $$$p: v.$modelValue
                    }) : p(a, v.$modelValue);
                };
            } else if (!n.assign) throw sf("nonassign", d.ngModel, T(e));
        }, this.$render = o, this.$isEmpty = function(a) {
            return s(a) || "" === a || null === a || a !== a;
        };
        var w = 0;
        Nc({
            ctrl: this,
            $element: e,
            set: function(a, b) {
                a[b] = !0;
            },
            unset: function(a, b) {
                delete a[b];
            },
            $animate: h
        }), this.$setPristine = function() {
            v.$dirty = !1, v.$pristine = !0, h.removeClass(e, qf), h.addClass(e, pf);
        }, this.$setDirty = function() {
            v.$dirty = !0, v.$pristine = !1, h.removeClass(e, pf), h.addClass(e, qf), v.$$parentForm.$setDirty();
        }, this.$setUntouched = function() {
            v.$touched = !1, v.$untouched = !0, h.setClass(e, "ng-untouched", "ng-touched");
        }, this.$setTouched = function() {
            v.$touched = !0, v.$untouched = !1, h.setClass(e, "ng-touched", "ng-untouched");
        }, this.$rollbackViewValue = function() {
            i.cancel(u), v.$viewValue = v.$$lastCommittedViewValue, v.$render();
        }, this.$validate = function() {
            if (!x(v.$modelValue) || !isNaN(v.$modelValue)) {
                var a = v.$$rawModelValue, b = v.$valid, d = v.$modelValue, e = v.$options && v.$options.allowInvalid;
                v.$$runValidators(a, v.$$lastCommittedViewValue, function(f) {
                    e || b === f || (v.$modelValue = f ? a : c, v.$modelValue !== d && v.$$writeModelToScope());
                });
            }
        }, this.$$runValidators = function(a, b, d) {
            function e() {
                var c = !0;
                return f(v.$validators, function(d, e) {
                    var f = d(a, b);
                    c = c && f, h(e, f);
                }), !!c || (f(v.$asyncValidators, function(a, b) {
                    h(b, null);
                }), !1);
            }
            function g() {
                var d = [], e = !0;
                f(v.$asyncValidators, function(f, g) {
                    var i = f(a, b);
                    if (!i || !z(i.then)) throw sf("nopromise", i);
                    h(g, c), d.push(i.then(function() {
                        h(g, !0);
                    }, function(a) {
                        e = !1, h(g, !1);
                    }));
                }), d.length ? k.all(d).then(function() {
                    i(e);
                }, o) : i(!0);
            }
            function h(a, b) {
                j === w && v.$setValidity(a, b);
            }
            function i(a) {
                j === w && d(a);
            }
            w++;
            var j = w;
            (function() {
                var a = v.$$parserName || "parse";
                return s(m) ? (h(a, null), !0) : (m || (f(v.$validators, function(a, b) {
                    h(b, null);
                }), f(v.$asyncValidators, function(a, b) {
                    h(b, null);
                })), h(a, m), m);
            })() && e() ? g() : i(!1);
        }, this.$commitViewValue = function() {
            var a = v.$viewValue;
            i.cancel(u), (v.$$lastCommittedViewValue !== a || "" === a && v.$$hasNativeValidators) && (v.$$lastCommittedViewValue = a, 
            v.$pristine && this.$setDirty(), this.$$parseAndValidate());
        }, this.$$parseAndValidate = function() {
            var b = v.$$lastCommittedViewValue;
            if (m = !s(b) || c) for (var d = 0; d < v.$parsers.length; d++) if (b = v.$parsers[d](b), 
            s(b)) {
                m = !1;
                break;
            }
            x(v.$modelValue) && isNaN(v.$modelValue) && (v.$modelValue = q(a));
            var e = v.$modelValue, f = v.$options && v.$options.allowInvalid;
            v.$$rawModelValue = b, f && (v.$modelValue = b, v.$modelValue !== e && v.$$writeModelToScope()), 
            v.$$runValidators(b, v.$$lastCommittedViewValue, function(a) {
                f || (v.$modelValue = a ? b : c, v.$modelValue !== e && v.$$writeModelToScope());
            });
        }, this.$$writeModelToScope = function() {
            r(a, v.$modelValue), f(v.$viewChangeListeners, function(a) {
                try {
                    a();
                } catch (c) {
                    b(c);
                }
            });
        }, this.$setViewValue = function(a, b) {
            v.$viewValue = a, v.$options && !v.$options.updateOnDefault || v.$$debounceViewValueCommit(b);
        }, this.$$debounceViewValueCommit = function(b) {
            var c = 0, d = v.$options;
            d && t(d.debounce) && (d = d.debounce, x(d) ? c = d : x(d[b]) ? c = d[b] : x(d["default"]) && (c = d["default"])), 
            i.cancel(u), c ? u = i(function() {
                v.$commitViewValue();
            }, c) : j.$$phase ? v.$commitViewValue() : a.$apply(function() {
                v.$commitViewValue();
            });
        }, a.$watch(function() {
            var b = q(a);
            if (b !== v.$modelValue && (v.$modelValue === v.$modelValue || b === b)) {
                v.$modelValue = v.$$rawModelValue = b, m = c;
                for (var d = v.$formatters, e = d.length, f = b; e--; ) f = d[e](f);
                v.$viewValue !== f && (v.$viewValue = v.$$lastCommittedViewValue = f, v.$render(), 
                v.$$runValidators(b, f, o));
            }
            return b;
        });
    } ], uf = [ "$rootScope", function(a) {
        return {
            restrict: "A",
            require: [ "ngModel", "^?form", "^?ngModelOptions" ],
            controller: tf,
            priority: 1,
            compile: function(b) {
                return b.addClass(pf).addClass("ng-untouched").addClass(nf), {
                    pre: function(a, b, c, d) {
                        var e = d[0];
                        b = d[1] || e.$$parentForm, e.$$setOptions(d[2] && d[2].$options), b.$addControl(e), 
                        c.$observe("name", function(a) {
                            e.$name !== a && e.$$parentForm.$$renameControl(e, a);
                        }), a.$on("$destroy", function() {
                            e.$$parentForm.$removeControl(e);
                        });
                    },
                    post: function(b, c, d, e) {
                        var f = e[0];
                        f.$options && f.$options.updateOn && c.on(f.$options.updateOn, function(a) {
                            f.$$debounceViewValueCommit(a && a.type);
                        }), c.on("blur", function(c) {
                            f.$touched || (a.$$phase ? b.$evalAsync(f.$setTouched) : b.$apply(f.$setTouched));
                        });
                    }
                };
            }
        };
    } ], vf = /(\s+|^)default(\s+|$)/, wf = function() {
        return {
            restrict: "A",
            controller: [ "$scope", "$attrs", function(a, b) {
                var c = this;
                this.$options = J(a.$eval(b.ngModelOptions)), t(this.$options.updateOn) ? (this.$options.updateOnDefault = !1, 
                this.$options.updateOn = gd(this.$options.updateOn.replace(vf, function() {
                    return c.$options.updateOnDefault = !0, " ";
                }))) : this.$options.updateOnDefault = !0;
            } ]
        };
    }, xf = Ec({
        terminal: !0,
        priority: 1e3
    }), yf = d("ngOptions"), zf = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, Af = [ "$compile", "$parse", function(a, c) {
        function d(a, b, d) {
            function f(a, b, c, d, e) {
                this.selectValue = a, this.viewValue = b, this.label = c, this.group = d, this.disabled = e;
            }
            function g(a) {
                var b;
                if (!j && e(a)) b = a; else {
                    b = [];
                    for (var c in a) a.hasOwnProperty(c) && "$" !== c.charAt(0) && b.push(c);
                }
                return b;
            }
            var h = a.match(zf);
            if (!h) throw yf("iexp", a, T(b));
            var i = h[5] || h[7], j = h[6];
            a = / as /.test(h[0]) && h[1];
            var k = h[9];
            b = c(h[2] ? h[1] : i);
            var l = a && c(a) || b, m = k && c(k), n = k ? function(a, b) {
                return m(d, b);
            } : function(a) {
                return La(a);
            }, o = function(a, b) {
                return n(a, u(a, b));
            }, p = c(h[2] || h[1]), q = c(h[3] || ""), r = c(h[4] || ""), s = c(h[8]), t = {}, u = j ? function(a, b) {
                return t[j] = b, t[i] = a, t;
            } : function(a) {
                return t[i] = a, t;
            };
            return {
                trackBy: k,
                getTrackByValue: o,
                getWatchables: c(s, function(a) {
                    var b = [];
                    a = a || [];
                    for (var c = g(a), e = c.length, f = 0; f < e; f++) {
                        var i = a === c ? f : c[f], j = u(a[i], i), i = n(a[i], j);
                        b.push(i), (h[2] || h[1]) && (i = p(d, j), b.push(i)), h[4] && (j = r(d, j), b.push(j));
                    }
                    return b;
                }),
                getOptions: function() {
                    for (var a = [], b = {}, c = s(d) || [], e = g(c), h = e.length, i = 0; i < h; i++) {
                        var j = c === e ? i : e[i], m = u(c[j], j), t = l(d, m), j = n(t, m), v = p(d, m), w = q(d, m), m = r(d, m), t = new f(j, t, v, w, m);
                        a.push(t), b[j] = t;
                    }
                    return {
                        items: a,
                        selectValueMap: b,
                        getOptionFromViewValue: function(a) {
                            return b[o(a)];
                        },
                        getViewValueFromOption: function(a) {
                            return k ? bd.copy(a.viewValue) : a.viewValue;
                        }
                    };
                }
            };
        }
        var g = b.createElement("option"), h = b.createElement("optgroup");
        return {
            restrict: "A",
            terminal: !0,
            require: [ "select", "?ngModel" ],
            link: {
                pre: function(a, b, c, d) {
                    d[0].registerOption = o;
                },
                post: function(b, c, e, i) {
                    function j(a, b) {
                        a.element = b, b.disabled = a.disabled, a.label !== b.label && (b.label = a.label, 
                        b.textContent = a.label), a.value !== b.value && (b.value = a.selectValue);
                    }
                    function k(a, b, c, d) {
                        return b && Uc(b.nodeName) === c ? c = b : (c = d.cloneNode(!1), b ? a.insertBefore(c, b) : a.appendChild(c)), 
                        c;
                    }
                    function l(a) {
                        for (var b; a; ) b = a.nextSibling, Ea(a), a = b;
                    }
                    function m(a) {
                        var b = p && p[0], c = v && v[0];
                        if (b || c) for (;a && (a === b || a === c || 8 === a.nodeType || "option" === H(a) && "" === a.value); ) a = a.nextSibling;
                        return a;
                    }
                    function n() {
                        var a = w && q.readValue();
                        w = x.getOptions();
                        var b = {}, d = c[0].firstChild;
                        if (u && c.prepend(p), d = m(d), w.items.forEach(function(a) {
                            var e, f;
                            a.group ? (e = b[a.group], e || (e = k(c[0], d, "optgroup", h), d = e.nextSibling, 
                            e.label = a.group, e = b[a.group] = {
                                groupElement: e,
                                currentOptionElement: e.firstChild
                            }), f = k(e.groupElement, e.currentOptionElement, "option", g), j(a, f), e.currentOptionElement = f.nextSibling) : (f = k(c[0], d, "option", g), 
                            j(a, f), d = f.nextSibling);
                        }), Object.keys(b).forEach(function(a) {
                            l(b[a].currentOptionElement);
                        }), l(d), o.$render(), !o.$isEmpty(a)) {
                            var e = q.readValue();
                            (x.trackBy || r ? L(a, e) : a === e) || (o.$setViewValue(e), o.$render());
                        }
                    }
                    var o = i[1];
                    if (o) {
                        var p, q = i[0], r = e.multiple;
                        i = 0;
                        for (var s = c.children(), t = s.length; i < t; i++) if ("" === s[i].value) {
                            p = s.eq(i);
                            break;
                        }
                        var u = !!p, v = Qc(g.cloneNode(!1));
                        v.val("?");
                        var w, x = d(e.ngOptions, c, b);
                        r ? (o.$isEmpty = function(a) {
                            return !a || 0 === a.length;
                        }, q.writeValue = function(a) {
                            w.items.forEach(function(a) {
                                a.element.selected = !1;
                            }), a && a.forEach(function(a) {
                                (a = w.getOptionFromViewValue(a)) && !a.disabled && (a.element.selected = !0);
                            });
                        }, q.readValue = function() {
                            var a = c.val() || [], b = [];
                            return f(a, function(a) {
                                (a = w.selectValueMap[a]) && !a.disabled && b.push(w.getViewValueFromOption(a));
                            }), b;
                        }, x.trackBy && b.$watchCollection(function() {
                            if (ed(o.$viewValue)) return o.$viewValue.map(function(a) {
                                return x.getTrackByValue(a);
                            });
                        }, function() {
                            o.$render();
                        })) : (q.writeValue = function(a) {
                            var b = w.getOptionFromViewValue(a);
                            b && !b.disabled ? (c[0].value !== b.selectValue && (v.remove(), u || p.remove(), 
                            c[0].value = b.selectValue, b.element.selected = !0), b.element.setAttribute("selected", "selected")) : null === a || u ? (v.remove(), 
                            u || c.prepend(p), c.val(""), p.prop("selected", !0), p.attr("selected", !0)) : (u || p.remove(), 
                            c.prepend(v), c.val("?"), v.prop("selected", !0), v.attr("selected", !0));
                        }, q.readValue = function() {
                            var a = w.selectValueMap[c.val()];
                            return a && !a.disabled ? (u || p.remove(), v.remove(), w.getViewValueFromOption(a)) : null;
                        }, x.trackBy && b.$watch(function() {
                            return x.getTrackByValue(o.$viewValue);
                        }, function() {
                            o.$render();
                        })), u ? (p.remove(), a(p)(b), p.removeClass("ng-scope")) : p = Qc(g.cloneNode(!1)), 
                        n(), b.$watchCollection(x.getWatchables, n);
                    }
                }
            }
        };
    } ], Bf = [ "$locale", "$interpolate", "$log", function(a, b, c) {
        var d = /{}/g, e = /^when(Minus)?(.+)$/;
        return {
            link: function(g, h, i) {
                function j(a) {
                    h.text(a || "");
                }
                var k, l = i.count, m = i.$attr.when && h.attr(i.$attr.when), n = i.offset || 0, p = g.$eval(m) || {}, q = {}, r = b.startSymbol(), t = b.endSymbol(), u = r + l + "-" + n + t, v = bd.noop;
                f(i, function(a, b) {
                    var c = e.exec(b);
                    c && (c = (c[1] ? "-" : "") + Uc(c[2]), p[c] = h.attr(i.$attr[b]));
                }), f(p, function(a, c) {
                    q[c] = b(a.replace(d, u));
                }), g.$watch(l, function(b) {
                    var d = parseFloat(b), e = isNaN(d);
                    e || d in p || (d = a.pluralCat(d - n)), d === k || e && x(k) && isNaN(k) || (v(), 
                    e = q[d], s(e) ? (null != b && c.debug("ngPluralize: no rule defined for '" + d + "' in " + m), 
                    v = o, j()) : v = g.$watch(e, j), k = d);
                });
            }
        };
    } ], Cf = [ "$parse", "$animate", function(a, g) {
        var h = d("ngRepeat"), i = function(a, b, c, d, e, f, g) {
            a[c] = d, e && (a[e] = f), a.$index = b, a.$first = 0 === b, a.$last = b === g - 1, 
            a.$middle = !(a.$first || a.$last), a.$odd = !(a.$even = 0 === (1 & b));
        };
        return {
            restrict: "A",
            multiElement: !0,
            transclude: "element",
            priority: 1e3,
            terminal: !0,
            $$tlb: !0,
            compile: function(d, j) {
                var k = j.ngRepeat, l = b.createComment(" end ngRepeat: " + k + " "), m = k.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                if (!m) throw h("iexp", k);
                var n = m[1], o = m[2], p = m[3], q = m[4], m = n.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);
                if (!m) throw h("iidexp", n);
                var r = m[3] || m[1], s = m[2];
                if (p && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(p) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(p))) throw h("badident", p);
                var t, u, v, w, x = {
                    $id: La
                };
                return q ? t = a(q) : (v = function(a, b) {
                    return La(b);
                }, w = function(a) {
                    return a;
                }), function(a, b, d, j, m) {
                    t && (u = function(b, c, d) {
                        return s && (x[s] = b), x[r] = c, x.$index = d, t(a, x);
                    });
                    var n = ja();
                    a.$watchCollection(o, function(d) {
                        var j, o, q, t, x, y, z, A, B, C, D = b[0], E = ja();
                        if (p && (a[p] = d), e(d)) A = d, o = u || v; else for (C in o = u || w, A = [], 
                        d) Vc.call(d, C) && "$" !== C.charAt(0) && A.push(C);
                        for (t = A.length, C = Array(t), j = 0; j < t; j++) if (x = d === A ? j : A[j], 
                        y = d[x], z = o(x, y, j), n[z]) B = n[z], delete n[z], E[z] = B, C[j] = B; else {
                            if (E[z]) throw f(C, function(a) {
                                a && a.scope && (n[a.id] = a);
                            }), h("dupes", k, z, y);
                            C[j] = {
                                id: z,
                                scope: c,
                                clone: c
                            }, E[z] = !0;
                        }
                        for (q in n) {
                            if (B = n[q], z = ia(B.clone), g.leave(z), z[0].parentNode) for (j = 0, o = z.length; j < o; j++) z[j].$$NG_REMOVED = !0;
                            B.scope.$destroy();
                        }
                        for (j = 0; j < t; j++) if (x = d === A ? j : A[j], y = d[x], B = C[j], B.scope) {
                            q = D;
                            do q = q.nextSibling; while (q && q.$$NG_REMOVED);
                            B.clone[0] != q && g.move(ia(B.clone), null, D), D = B.clone[B.clone.length - 1], 
                            i(B.scope, j, r, y, s, x, t);
                        } else m(function(a, b) {
                            B.scope = b;
                            var c = l.cloneNode(!1);
                            a[a.length++] = c, g.enter(a, null, D), D = c, B.clone = a, E[B.id] = B, i(B.scope, j, r, y, s, x, t);
                        });
                        n = E;
                    });
                };
            }
        };
    } ], Df = [ "$animate", function(a) {
        return {
            restrict: "A",
            multiElement: !0,
            link: function(b, c, d) {
                b.$watch(d.ngShow, function(b) {
                    a[b ? "removeClass" : "addClass"](c, "ng-hide", {
                        tempClasses: "ng-hide-animate"
                    });
                });
            }
        };
    } ], Ef = [ "$animate", function(a) {
        return {
            restrict: "A",
            multiElement: !0,
            link: function(b, c, d) {
                b.$watch(d.ngHide, function(b) {
                    a[b ? "addClass" : "removeClass"](c, "ng-hide", {
                        tempClasses: "ng-hide-animate"
                    });
                });
            }
        };
    } ], Ff = Ec(function(a, b, c) {
        a.$watch(c.ngStyle, function(a, c) {
            c && a !== c && f(c, function(a, c) {
                b.css(c, "");
            }), a && b.css(a);
        }, !0);
    }), Gf = [ "$animate", function(a) {
        return {
            require: "ngSwitch",
            controller: [ "$scope", function() {
                this.cases = {};
            } ],
            link: function(c, d, e, g) {
                var h = [], i = [], j = [], k = [], l = function(a, b) {
                    return function() {
                        a.splice(b, 1);
                    };
                };
                c.$watch(e.ngSwitch || e.on, function(c) {
                    var d, e;
                    for (d = 0, e = j.length; d < e; ++d) a.cancel(j[d]);
                    for (d = j.length = 0, e = k.length; d < e; ++d) {
                        var m = ia(i[d].clone);
                        k[d].$destroy(), (j[d] = a.leave(m)).then(l(j, d));
                    }
                    i.length = 0, k.length = 0, (h = g.cases["!" + c] || g.cases["?"]) && f(h, function(c) {
                        c.transclude(function(d, e) {
                            k.push(e);
                            var f = c.element;
                            d[d.length++] = b.createComment(" end ngSwitchWhen: "), i.push({
                                clone: d
                            }), a.enter(d, f.parent(), f);
                        });
                    });
                });
            }
        };
    } ], Hf = Ec({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function(a, b, c, d, e) {
            d.cases["!" + c.ngSwitchWhen] = d.cases["!" + c.ngSwitchWhen] || [], d.cases["!" + c.ngSwitchWhen].push({
                transclude: e,
                element: b
            });
        }
    }), If = Ec({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function(a, b, c, d, e) {
            d.cases["?"] = d.cases["?"] || [], d.cases["?"].push({
                transclude: e,
                element: b
            });
        }
    }), Jf = Ec({
        restrict: "EAC",
        link: function(a, b, c, e, f) {
            if (!f) throw d("ngTransclude")("orphan", T(b));
            f(function(a) {
                b.empty(), b.append(a);
            });
        }
    }), Kf = [ "$templateCache", function(a) {
        return {
            restrict: "E",
            terminal: !0,
            compile: function(b, c) {
                "text/ng-template" == c.type && a.put(c.id, b[0].text);
            }
        };
    } ], Lf = {
        $setViewValue: o,
        $render: o
    }, Mf = [ "$element", "$scope", "$attrs", function(a, d, e) {
        var f = this, g = new Ma();
        f.ngModelCtrl = Lf, f.unknownOption = Qc(b.createElement("option")), f.renderUnknownOption = function(b) {
            b = "? " + La(b) + " ?", f.unknownOption.val(b), a.prepend(f.unknownOption), a.val(b);
        }, d.$on("$destroy", function() {
            f.renderUnknownOption = o;
        }), f.removeUnknownOption = function() {
            f.unknownOption.parent() && f.unknownOption.remove();
        }, f.readValue = function() {
            return f.removeUnknownOption(), a.val();
        }, f.writeValue = function(b) {
            f.hasOption(b) ? (f.removeUnknownOption(), a.val(b), "" === b && f.emptyOption.prop("selected", !0)) : null == b && f.emptyOption ? (f.removeUnknownOption(), 
            a.val("")) : f.renderUnknownOption(b);
        }, f.addOption = function(a, b) {
            if (8 !== b[0].nodeType) {
                ga(a, '"option value"'), "" === a && (f.emptyOption = b);
                var c = g.get(a) || 0;
                g.put(a, c + 1), f.ngModelCtrl.$render(), b[0].hasAttribute("selected") && (b[0].selected = !0);
            }
        }, f.removeOption = function(a) {
            var b = g.get(a);
            b && (1 === b ? (g.remove(a), "" === a && (f.emptyOption = c)) : g.put(a, b - 1));
        }, f.hasOption = function(a) {
            return !!g.get(a);
        }, f.registerOption = function(a, b, c, d, e) {
            if (d) {
                var g;
                c.$observe("value", function(a) {
                    t(g) && f.removeOption(g), g = a, f.addOption(a, b);
                });
            } else e ? a.$watch(e, function(a, d) {
                c.$set("value", a), d !== a && f.removeOption(d), f.addOption(a, b);
            }) : f.addOption(c.value, b);
            b.on("$destroy", function() {
                f.removeOption(c.value), f.ngModelCtrl.$render();
            });
        };
    } ], Nf = function() {
        return {
            restrict: "E",
            require: [ "select", "?ngModel" ],
            controller: Mf,
            priority: 1,
            link: {
                pre: function(a, b, c, d) {
                    var e = d[1];
                    if (e) {
                        var g = d[0];
                        if (g.ngModelCtrl = e, b.on("change", function() {
                            a.$apply(function() {
                                e.$setViewValue(g.readValue());
                            });
                        }), c.multiple) {
                            g.readValue = function() {
                                var a = [];
                                return f(b.find("option"), function(b) {
                                    b.selected && a.push(b.value);
                                }), a;
                            }, g.writeValue = function(a) {
                                var c = new Ma(a);
                                f(b.find("option"), function(a) {
                                    a.selected = t(c.get(a.value));
                                });
                            };
                            var h, i = NaN;
                            a.$watch(function() {
                                i !== e.$viewValue || L(h, e.$viewValue) || (h = K(e.$viewValue), e.$render()), 
                                i = e.$viewValue;
                            }), e.$isEmpty = function(a) {
                                return !a || 0 === a.length;
                            };
                        }
                    }
                },
                post: function(a, b, c, d) {
                    var e = d[1];
                    if (e) {
                        var f = d[0];
                        e.$render = function() {
                            f.writeValue(e.$viewValue);
                        };
                    }
                }
            }
        };
    }, Of = [ "$interpolate", function(a) {
        return {
            restrict: "E",
            priority: 100,
            compile: function(b, c) {
                if (t(c.value)) var d = a(c.value, !0); else {
                    var e = a(b.text(), !0);
                    e || c.$set("value", b.text());
                }
                return function(a, b, c) {
                    var f = b.parent();
                    (f = f.data("$selectController") || f.parent().data("$selectController")) && f.registerOption(a, b, c, d, e);
                };
            }
        };
    } ], Pf = q({
        restrict: "E",
        terminal: !1
    }), Qf = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(a, b, c, d) {
                d && (c.required = !0, d.$validators.required = function(a, b) {
                    return !c.required || !d.$isEmpty(b);
                }, c.$observe("required", function() {
                    d.$validate();
                }));
            }
        };
    }, Rf = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(a, b, e, f) {
                if (f) {
                    var g, h = e.ngPattern || e.pattern;
                    e.$observe("pattern", function(a) {
                        if (w(a) && 0 < a.length && (a = new RegExp("^" + a + "$")), a && !a.test) throw d("ngPattern")("noregexp", h, a, T(b));
                        g = a || c, f.$validate();
                    }), f.$validators.pattern = function(a, b) {
                        return f.$isEmpty(b) || s(g) || g.test(b);
                    };
                }
            }
        };
    }, Sf = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(a, b, c, d) {
                if (d) {
                    var e = -1;
                    c.$observe("maxlength", function(a) {
                        a = m(a), e = isNaN(a) ? -1 : a, d.$validate();
                    }), d.$validators.maxlength = function(a, b) {
                        return 0 > e || d.$isEmpty(b) || b.length <= e;
                    };
                }
            }
        };
    }, Tf = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(a, b, c, d) {
                if (d) {
                    var e = 0;
                    c.$observe("minlength", function(a) {
                        e = m(a) || 0, d.$validate();
                    }), d.$validators.minlength = function(a, b) {
                        return d.$isEmpty(b) || b.length >= e;
                    };
                }
            }
        };
    };
    a.angular.bootstrap ? a.console && console.log("WARNING: Tried to load angular more than once.") : (da(), 
    la(bd), bd.module("ngLocale", [], [ "$provide", function(a) {
        function b(a) {
            a += "";
            var b = a.indexOf(".");
            return -1 == b ? 0 : a.length - b - 1;
        }
        a.value("$locale", {
            DATETIME_FORMATS: {
                AMPMS: [ "AM", "PM" ],
                DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                ERANAMES: [ "Before Christ", "Anno Domini" ],
                ERAS: [ "BC", "AD" ],
                FIRSTDAYOFWEEK: 6,
                MONTH: "January February March April May June July August September October November December".split(" "),
                SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
                SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                STANDALONEMONTH: "January February March April May June July August September October November December".split(" "),
                WEEKENDRANGE: [ 5, 6 ],
                fullDate: "EEEE, MMMM d, y",
                longDate: "MMMM d, y",
                medium: "MMM d, y h:mm:ss a",
                mediumDate: "MMM d, y",
                mediumTime: "h:mm:ss a",
                "short": "M/d/yy h:mm a",
                shortDate: "M/d/yy",
                shortTime: "h:mm a"
            },
            NUMBER_FORMATS: {
                CURRENCY_SYM: "$",
                DECIMAL_SEP: ".",
                GROUP_SEP: ",",
                PATTERNS: [ {
                    gSize: 3,
                    lgSize: 3,
                    maxFrac: 3,
                    minFrac: 0,
                    minInt: 1,
                    negPre: "-",
                    negSuf: "",
                    posPre: "",
                    posSuf: ""
                }, {
                    gSize: 3,
                    lgSize: 3,
                    maxFrac: 2,
                    minFrac: 2,
                    minInt: 1,
                    negPre: "-¤",
                    negSuf: "",
                    posPre: "¤",
                    posSuf: ""
                } ]
            },
            id: "en-us",
            localeID: "en_US",
            pluralCat: function(a, d) {
                var e = 0 | a, f = d;
                return c === f && (f = Math.min(b(a), 3)), Math.pow(10, f), 1 == e && 0 == f ? "one" : "other";
            }
        });
    } ]), Qc(b).ready(function() {
        $(b, _);
    }));
}(window, document), !window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');

var duScrollDefaultEasing = function(a) {
    return .5 > a ? Math.pow(2 * a, 2) / 2 : 1 - Math.pow(2 * (1 - a), 2) / 2;
}, duScroll = angular.module("duScroll", [ "duScroll.scrollspy", "duScroll.smoothScroll", "duScroll.scrollContainer", "duScroll.spyContext", "duScroll.scrollHelpers" ]).value("duScrollDuration", 350).value("duScrollSpyWait", 100).value("duScrollGreedy", !1).value("duScrollOffset", 0).value("duScrollEasing", duScrollDefaultEasing).value("duScrollCancelOnEvents", "scroll mousedown mousewheel touchmove keydown").value("duScrollBottomSpy", !1).value("duScrollActiveClass", "active");

"undefined" != typeof module && module && module.exports && (module.exports = duScroll), 
angular.module("duScroll.scrollHelpers", [ "duScroll.requestAnimation" ]).run([ "$window", "$q", "cancelAnimation", "requestAnimation", "duScrollEasing", "duScrollDuration", "duScrollOffset", "duScrollCancelOnEvents", function(a, b, c, d, e, f, g, h) {
    var i = {}, j = function(a) {
        return "undefined" != typeof HTMLDocument && a instanceof HTMLDocument || a.nodeType && a.nodeType === a.DOCUMENT_NODE;
    }, k = function(a) {
        return "undefined" != typeof HTMLElement && a instanceof HTMLElement || a.nodeType && a.nodeType === a.ELEMENT_NODE;
    }, l = function(a) {
        return k(a) || j(a) ? a : a[0];
    };
    i.duScrollTo = function(b, c, d, e) {
        var f;
        if (angular.isElement(b) ? f = this.duScrollToElement : angular.isDefined(d) && (f = this.duScrollToAnimated), 
        f) return f.apply(this, arguments);
        var g = l(this);
        return j(g) ? a.scrollTo(b, c) : (g.scrollLeft = b, void (g.scrollTop = c));
    };
    var m, n;
    i.duScrollToAnimated = function(a, f, g, i) {
        g && !i && (i = e);
        var j = this.duScrollLeft(), k = this.duScrollTop(), l = Math.round(a - j), o = Math.round(f - k), p = null, q = 0, r = this, s = function(a) {
            (!a || q && a.which > 0) && (h && r.unbind(h, s), c(m), n.reject(), m = null);
        };
        if (m && s(), n = b.defer(), 0 === g || !l && !o) return 0 === g && r.duScrollTo(a, f), 
        n.resolve(), n.promise;
        var t = function(a) {
            null === p && (p = a), q = a - p;
            var b = q >= g ? 1 : i(q / g);
            r.scrollTo(j + Math.ceil(l * b), k + Math.ceil(o * b)), 1 > b ? m = d(t) : (h && r.unbind(h, s), 
            m = null, n.resolve());
        };
        return r.duScrollTo(j, k), h && r.bind(h, s), m = d(t), n.promise;
    }, i.duScrollToElement = function(a, b, c, d) {
        var e = l(this);
        (!angular.isNumber(b) || isNaN(b)) && (b = g);
        var f = this.duScrollTop() + l(a).getBoundingClientRect().top - b;
        return k(e) && (f -= e.getBoundingClientRect().top), this.duScrollTo(0, f, c, d);
    }, i.duScrollLeft = function(b, c, d) {
        if (angular.isNumber(b)) return this.duScrollTo(b, this.duScrollTop(), c, d);
        var e = l(this);
        return j(e) ? a.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft : e.scrollLeft;
    }, i.duScrollTop = function(b, c, d) {
        if (angular.isNumber(b)) return this.duScrollTo(this.duScrollLeft(), b, c, d);
        var e = l(this);
        return j(e) ? a.scrollY || document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop;
    }, i.duScrollToElementAnimated = function(a, b, c, d) {
        return this.duScrollToElement(a, b, c || f, d);
    }, i.duScrollTopAnimated = function(a, b, c) {
        return this.duScrollTop(a, b || f, c);
    }, i.duScrollLeftAnimated = function(a, b, c) {
        return this.duScrollLeft(a, b || f, c);
    }, angular.forEach(i, function(a, b) {
        angular.element.prototype[b] = a;
        var c = b.replace(/^duScroll/, "scroll");
        angular.isUndefined(angular.element.prototype[c]) && (angular.element.prototype[c] = a);
    });
} ]), angular.module("duScroll.polyfill", []).factory("polyfill", [ "$window", function(a) {
    var b = [ "webkit", "moz", "o", "ms" ];
    return function(c, d) {
        if (a[c]) return a[c];
        for (var e, f = c.substr(0, 1).toUpperCase() + c.substr(1), g = 0; g < b.length; g++) if (e = b[g] + f, 
        a[e]) return a[e];
        return d;
    };
} ]), angular.module("duScroll.requestAnimation", [ "duScroll.polyfill" ]).factory("requestAnimation", [ "polyfill", "$timeout", function(a, b) {
    var c = 0, d = function(a, d) {
        var e = new Date().getTime(), f = Math.max(0, 16 - (e - c)), g = b(function() {
            a(e + f);
        }, f);
        return c = e + f, g;
    };
    return a("requestAnimationFrame", d);
} ]).factory("cancelAnimation", [ "polyfill", "$timeout", function(a, b) {
    var c = function(a) {
        b.cancel(a);
    };
    return a("cancelAnimationFrame", c);
} ]), angular.module("duScroll.spyAPI", [ "duScroll.scrollContainerAPI" ]).factory("spyAPI", [ "$rootScope", "$timeout", "$window", "$document", "scrollContainerAPI", "duScrollGreedy", "duScrollSpyWait", "duScrollBottomSpy", "duScrollActiveClass", function(a, b, c, d, e, f, g, h, i) {
    var j = function(e) {
        var j = !1, k = !1, l = function() {
            k = !1;
            var b, g = e.container, j = g[0], l = 0;
            if ("undefined" != typeof HTMLElement && j instanceof HTMLElement || j.nodeType && j.nodeType === j.ELEMENT_NODE) l = j.getBoundingClientRect().top, 
            b = Math.round(j.scrollTop + j.clientHeight) >= j.scrollHeight; else {
                var m = d[0].body.scrollHeight || d[0].documentElement.scrollHeight;
                b = Math.round(c.pageYOffset + c.innerHeight) >= m;
            }
            var n, o, p, q, r, s, t = h && b ? "bottom" : "top";
            for (q = e.spies, o = e.currentlyActive, p = void 0, n = 0; n < q.length; n++) r = q[n], 
            s = r.getTargetPosition(), s && (h && b || s.top + r.offset - l < 20 && (f || -1 * s.top + l) < s.height) && (!p || p[t] < s[t]) && (p = {
                spy: r
            }, p[t] = s[t]);
            p && (p = p.spy), o === p || f && !p || (o && (o.$element.removeClass(i), a.$broadcast("duScrollspy:becameInactive", o.$element, angular.element(o.getTargetElement()))), 
            p && (p.$element.addClass(i), a.$broadcast("duScrollspy:becameActive", p.$element, angular.element(p.getTargetElement()))), 
            e.currentlyActive = p);
        };
        return g ? function() {
            j ? k = !0 : (l(), j = b(function() {
                j = !1, k && l();
            }, g, !1));
        } : l;
    }, k = {}, l = function(a) {
        var b = a.$id, c = {
            spies: []
        };
        return c.handler = j(c), k[b] = c, a.$on("$destroy", function() {
            m(a);
        }), b;
    }, m = function(a) {
        var b = a.$id, c = k[b], d = c.container;
        d && d.off("scroll", c.handler), delete k[b];
    }, n = l(a), o = function(a) {
        return k[a.$id] ? k[a.$id] : a.$parent ? o(a.$parent) : k[n];
    }, p = function(a) {
        var b, c, d = a.$scope;
        if (d) return o(d);
        for (c in k) if (b = k[c], -1 !== b.spies.indexOf(a)) return b;
    }, q = function(a) {
        for (;a.parentNode; ) if (a = a.parentNode, a === document) return !0;
        return !1;
    }, r = function(a) {
        var b = p(a);
        b && (b.spies.push(a), b.container && q(b.container) || (b.container && b.container.off("scroll", b.handler), 
        b.container = e.getContainer(a.$scope), b.container.on("scroll", b.handler).triggerHandler("scroll")));
    }, s = function(b) {
        var c = p(b);
        b === c.currentlyActive && (a.$broadcast("duScrollspy:becameInactive", c.currentlyActive.$element), 
        c.currentlyActive = null);
        var d = c.spies.indexOf(b);
        -1 !== d && c.spies.splice(d, 1), b.$element = null;
    };
    return {
        addSpy: r,
        removeSpy: s,
        createContext: l,
        destroyContext: m,
        getContextForScope: o
    };
} ]), angular.module("duScroll.scrollContainerAPI", []).factory("scrollContainerAPI", [ "$document", function(a) {
    var b = {}, c = function(a, c) {
        var d = a.$id;
        return b[d] = c, d;
    }, d = function(a) {
        return b[a.$id] ? a.$id : a.$parent ? d(a.$parent) : void 0;
    }, e = function(c) {
        var e = d(c);
        return e ? b[e] : a;
    }, f = function(a) {
        var c = d(a);
        c && delete b[c];
    };
    return {
        getContainerId: d,
        getContainer: e,
        setContainer: c,
        removeContainer: f
    };
} ]), angular.module("duScroll.smoothScroll", [ "duScroll.scrollHelpers", "duScroll.scrollContainerAPI" ]).directive("duSmoothScroll", [ "duScrollDuration", "duScrollOffset", "scrollContainerAPI", function(a, b, c) {
    return {
        link: function(d, e, f) {
            e.on("click", function(e) {
                if (f.href && -1 !== f.href.indexOf("#") || "" !== f.duSmoothScroll) {
                    var g = f.href ? f.href.replace(/.*(?=#[^\s]+$)/, "").substring(1) : f.duSmoothScroll, h = document.getElementById(g) || document.getElementsByName(g)[0];
                    if (h && h.getBoundingClientRect) {
                        e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault();
                        var i = f.offset ? parseInt(f.offset, 10) : b, j = f.duration ? parseInt(f.duration, 10) : a, k = c.getContainer(d);
                        k.duScrollToElement(angular.element(h), isNaN(i) ? 0 : i, isNaN(j) ? 0 : j);
                    }
                }
            });
        }
    };
} ]), angular.module("duScroll.spyContext", [ "duScroll.spyAPI" ]).directive("duSpyContext", [ "spyAPI", function(a) {
    return {
        restrict: "A",
        scope: !0,
        compile: function(b, c, d) {
            return {
                pre: function(b, c, d, e) {
                    a.createContext(b);
                }
            };
        }
    };
} ]), angular.module("duScroll.scrollContainer", [ "duScroll.scrollContainerAPI" ]).directive("duScrollContainer", [ "scrollContainerAPI", function(a) {
    return {
        restrict: "A",
        scope: !0,
        compile: function(b, c, d) {
            return {
                pre: function(b, c, d, e) {
                    d.$observe("duScrollContainer", function(d) {
                        angular.isString(d) && (d = document.getElementById(d)), d = angular.isElement(d) ? angular.element(d) : c, 
                        a.setContainer(b, d), b.$on("$destroy", function() {
                            a.removeContainer(b);
                        });
                    });
                }
            };
        }
    };
} ]), angular.module("duScroll.scrollspy", [ "duScroll.spyAPI" ]).directive("duScrollspy", [ "spyAPI", "duScrollOffset", "$timeout", "$rootScope", function(a, b, c, d) {
    var e = function(a, b, c, d) {
        angular.isElement(a) ? this.target = a : angular.isString(a) && (this.targetId = a), 
        this.$scope = b, this.$element = c, this.offset = d;
    };
    return e.prototype.getTargetElement = function() {
        return !this.target && this.targetId && (this.target = document.getElementById(this.targetId) || document.getElementsByName(this.targetId)[0]), 
        this.target;
    }, e.prototype.getTargetPosition = function() {
        var a = this.getTargetElement();
        return a ? a.getBoundingClientRect() : void 0;
    }, e.prototype.flushTargetCache = function() {
        this.targetId && (this.target = void 0);
    }, {
        link: function(f, g, h) {
            var i, j = h.ngHref || h.href;
            if (j && -1 !== j.indexOf("#") ? i = j.replace(/.*(?=#[^\s]+$)/, "").substring(1) : h.duScrollspy ? i = h.duScrollspy : h.duSmoothScroll && (i = h.duSmoothScroll), 
            i) {
                var k = c(function() {
                    var c = new e(i, f, g, (-(h.offset ? parseInt(h.offset, 10) : b)));
                    a.addSpy(c), f.$on("$locationChangeSuccess", c.flushTargetCache.bind(c));
                    var j = d.$on("$stateChangeSuccess", c.flushTargetCache.bind(c));
                    f.$on("$destroy", function() {
                        a.removeSpy(c), j();
                    });
                }, 0, !1);
                f.$on("$destroy", function() {
                    c.cancel(k);
                });
            }
        }
    };
} ]), !function() {
    var a = {
        TAB: 9,
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        HOME: 36,
        END: 35,
        BACKSPACE: 8,
        DELETE: 46,
        COMMAND: 91,
        MAP: {
            91: "COMMAND",
            8: "BACKSPACE",
            9: "TAB",
            13: "ENTER",
            16: "SHIFT",
            17: "CTRL",
            18: "ALT",
            19: "PAUSEBREAK",
            20: "CAPSLOCK",
            27: "ESC",
            32: "SPACE",
            33: "PAGE_UP",
            34: "PAGE_DOWN",
            35: "END",
            36: "HOME",
            37: "LEFT",
            38: "UP",
            39: "RIGHT",
            40: "DOWN",
            43: "+",
            44: "PRINTSCREEN",
            45: "INSERT",
            46: "DELETE",
            48: "0",
            49: "1",
            50: "2",
            51: "3",
            52: "4",
            53: "5",
            54: "6",
            55: "7",
            56: "8",
            57: "9",
            59: ";",
            61: "=",
            65: "A",
            66: "B",
            67: "C",
            68: "D",
            69: "E",
            70: "F",
            71: "G",
            72: "H",
            73: "I",
            74: "J",
            75: "K",
            76: "L",
            77: "M",
            78: "N",
            79: "O",
            80: "P",
            81: "Q",
            82: "R",
            83: "S",
            84: "T",
            85: "U",
            86: "V",
            87: "W",
            88: "X",
            89: "Y",
            90: "Z",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
            106: "*",
            107: "+",
            109: "-",
            110: ".",
            111: "/",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            144: "NUMLOCK",
            145: "SCROLLLOCK",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'"
        },
        isControl: function(b) {
            var c = b.which;
            switch (c) {
              case a.COMMAND:
              case a.SHIFT:
              case a.CTRL:
              case a.ALT:
                return !0;
            }
            return !!(b.metaKey || b.ctrlKey || b.altKey);
        },
        isFunctionKey: function(a) {
            return a = a.which ? a.which : a, a >= 112 && 123 >= a;
        },
        isVerticalMovement: function(b) {
            return ~[ a.UP, a.DOWN ].indexOf(b);
        },
        isHorizontalMovement: function(b) {
            return ~[ a.LEFT, a.RIGHT, a.BACKSPACE, a.DELETE ].indexOf(b);
        },
        toSeparator: function(b) {
            var c = {
                ENTER: "\n",
                TAB: "\t",
                SPACE: " "
            }[b];
            return c ? c : a[b] ? void 0 : b;
        }
    };
    void 0 === angular.element.prototype.querySelectorAll && (angular.element.prototype.querySelectorAll = function(a) {
        return angular.element(this[0].querySelectorAll(a));
    }), void 0 === angular.element.prototype.closest && (angular.element.prototype.closest = function(a) {
        for (var b = this[0], c = b.matches || b.webkitMatchesSelector || b.mozMatchesSelector || b.msMatchesSelector; b; ) {
            if (c.bind(b)(a)) return b;
            b = b.parentElement;
        }
        return !1;
    });
    var b = 0, c = angular.module("ui.select", []).constant("uiSelectConfig", {
        theme: "bootstrap",
        searchEnabled: !0,
        sortable: !1,
        placeholder: "",
        refreshDelay: 1e3,
        closeOnSelect: !0,
        skipFocusser: !1,
        dropdownPosition: "auto",
        removeSelected: !0,
        generateId: function() {
            return b++;
        },
        appendToBody: !1
    }).service("uiSelectMinErr", function() {
        var a = angular.$$minErr("ui.select");
        return function() {
            var b = a.apply(this, arguments), c = b.message.replace(new RegExp("\nhttp://errors.angularjs.org/.*"), "");
            return new Error(c);
        };
    }).directive("uisTranscludeAppend", function() {
        return {
            link: function(a, b, c, d, e) {
                e(a, function(a) {
                    b.append(a);
                });
            }
        };
    }).filter("highlight", function() {
        function a(a) {
            return ("" + a).replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        }
        return function(b, c) {
            return c && b ? ("" + b).replace(new RegExp(a(c), "gi"), '<span class="ui-select-highlight">$&</span>') : b;
        };
    }).factory("uisOffset", [ "$document", "$window", function(a, b) {
        return function(c) {
            var d = c[0].getBoundingClientRect();
            return {
                width: d.width || c.prop("offsetWidth"),
                height: d.height || c.prop("offsetHeight"),
                top: d.top + (b.pageYOffset || a[0].documentElement.scrollTop),
                left: d.left + (b.pageXOffset || a[0].documentElement.scrollLeft)
            };
        };
    } ]);
    c.directive("uiSelectChoices", [ "uiSelectConfig", "uisRepeatParser", "uiSelectMinErr", "$compile", "$window", function(a, b, c, d, e) {
        return {
            restrict: "EA",
            require: "^uiSelect",
            replace: !0,
            transclude: !0,
            templateUrl: function(b) {
                b.addClass("ui-select-choices");
                var c = b.parent().attr("theme") || a.theme;
                return c + "/choices.tpl.html";
            },
            compile: function(d, f) {
                if (!f.repeat) throw c("repeat", "Expected 'repeat' expression.");
                var g = f.groupBy, h = f.groupFilter;
                if (g) {
                    var i = d.querySelectorAll(".ui-select-choices-group");
                    if (1 !== i.length) throw c("rows", "Expected 1 .ui-select-choices-group but got '{0}'.", i.length);
                    i.attr("ng-repeat", b.getGroupNgRepeatExpression());
                }
                var j = b.parse(f.repeat), k = d.querySelectorAll(".ui-select-choices-row");
                if (1 !== k.length) throw c("rows", "Expected 1 .ui-select-choices-row but got '{0}'.", k.length);
                k.attr("ng-repeat", j.repeatExpression(g)).attr("ng-if", "$select.open");
                var l = d.querySelectorAll(".ui-select-choices-row-inner");
                if (1 !== l.length) throw c("rows", "Expected 1 .ui-select-choices-row-inner but got '{0}'.", l.length);
                l.attr("uis-transclude-append", "");
                var m = e.document.addEventListener ? k : l;
                return m.attr("ng-click", "$select.select(" + j.itemName + ",$select.skipFocusser,$event)"), 
                function(b, c, d, e) {
                    e.parseRepeatAttr(d.repeat, g, h), e.disableChoiceExpression = d.uiDisableChoice, 
                    e.onHighlightCallback = d.onHighlight, e.dropdownPosition = d.position ? d.position.toLowerCase() : a.dropdownPosition, 
                    b.$on("$destroy", function() {
                        k.remove();
                    }), b.$watch("$select.search", function(a) {
                        a && !e.open && e.multiple && e.activate(!1, !0), e.activeIndex = e.tagging.isActivated ? -1 : 0, 
                        !d.minimumInputLength || e.search.length >= d.minimumInputLength ? e.refresh(d.refresh) : e.items = [];
                    }), d.$observe("refreshDelay", function() {
                        var c = b.$eval(d.refreshDelay);
                        e.refreshDelay = void 0 !== c ? c : a.refreshDelay;
                    });
                };
            }
        };
    } ]), c.controller("uiSelectCtrl", [ "$scope", "$element", "$timeout", "$filter", "$$uisDebounce", "uisRepeatParser", "uiSelectMinErr", "uiSelectConfig", "$parse", "$injector", "$window", function(b, c, d, e, f, g, h, i, j, k, l) {
        function m(a, b, c) {
            if (a.findIndex) return a.findIndex(b, c);
            for (var d, e = Object(a), f = e.length >>> 0, g = 0; f > g; g++) if (d = e[g], 
            b.call(c, d, g, e)) return g;
            return -1;
        }
        function n() {
            (s.resetSearchInput || void 0 === s.resetSearchInput && i.resetSearchInput) && (s.search = t, 
            s.selected && s.items.length && !s.multiple && (s.activeIndex = m(s.items, function(a) {
                return angular.equals(this, a);
            }, s.selected)));
        }
        function o() {
            (s.setSearchToAnswer || void 0 === s.setSearchToAnswer && i.setSearchToAnswer) && (console.log("searchBy: " + s.searchBy), 
            s.searchBy && (console.log("_setSearchToAnswer"), s.resetSearchInput = !1, s.search = s.selected[s.searchBy]));
        }
        function p(a, b) {
            var c, d, e = [];
            for (c = 0; c < b.length; c++) for (d = 0; d < a.length; d++) a[d].name == [ b[c] ] && e.push(a[d]);
            return e;
        }
        function q(b) {
            var c = !0;
            switch (b) {
              case a.DOWN:
                !s.open && s.multiple ? s.activate(!1, !0) : s.activeIndex < s.items.length - 1 && s.activeIndex++;
                break;

              case a.UP:
                !s.open && s.multiple ? s.activate(!1, !0) : (s.activeIndex > 0 || 0 === s.search.length && s.tagging.isActivated && s.activeIndex > -1) && s.activeIndex--;
                break;

              case a.TAB:
                s.multiple && !s.open || s.select(s.items[s.activeIndex], !0);
                break;

              case a.ENTER:
                s.open && (s.tagging.isActivated || s.activeIndex >= 0) ? s.select(s.items[s.activeIndex], s.skipFocusser) : s.activate(!1, !0);
                break;

              case a.ESC:
                s.close();
                break;

              default:
                c = !1;
            }
            return c;
        }
        function r() {
            var a = c.querySelectorAll(".ui-select-choices-content"), b = a.querySelectorAll(".ui-select-choices-row");
            if (b.length < 1) throw h("choices", "Expected multiple .ui-select-choices-row but got '{0}'.", b.length);
            if (!(s.activeIndex < 0)) {
                var d = b[s.activeIndex], e = d.offsetTop + d.clientHeight - a[0].scrollTop, f = a[0].offsetHeight;
                e > f ? a[0].scrollTop += e - f : e < d.clientHeight && (s.isGrouped && 0 === s.activeIndex ? a[0].scrollTop = 0 : a[0].scrollTop -= d.clientHeight - e);
            }
        }
        var s = this, t = "";
        if (s.placeholder = i.placeholder, s.searchEnabled = i.searchEnabled, s.sortable = i.sortable, 
        s.refreshDelay = i.refreshDelay, s.paste = i.paste, s.removeSelected = i.removeSelected, 
        s.closeOnSelect = !0, s.skipFocusser = !1, s.search = t, s.activeIndex = 0, s.items = [], 
        s.open = !1, s.focus = !1, s.disabled = !1, s.selected = void 0, s.dropdownPosition = "auto", 
        s.focusser = void 0, s.resetSearchInput = !0, s.setSearchToAnswer = !1, s.searchBy = void 0, 
        s.multiple = void 0, s.disableChoiceExpression = void 0, s.tagging = {
            isActivated: !1,
            fct: void 0
        }, s.taggingTokens = {
            isActivated: !1,
            tokens: void 0
        }, s.lockChoiceExpression = void 0, s.clickTriggeredSelect = !1, s.$filter = e, 
        s.$element = c, s.$animate = function() {
            try {
                return k.get("$animate");
            } catch (a) {
                return null;
            }
        }(), s.searchInput = c.querySelectorAll("input.ui-select-search"), 1 !== s.searchInput.length) throw h("searchInput", "Expected 1 input.ui-select-search but got '{0}'.", s.searchInput.length);
        s.isEmpty = function() {
            return angular.isUndefined(s.selected) || null === s.selected || "" === s.selected || s.multiple && 0 === s.selected.length;
        }, s.activate = function(a, e) {
            if (!s.disabled && !s.open) {
                e || n(), b.$broadcast("uis:activate"), s.open = !0, s.activeIndex = s.activeIndex >= s.items.length ? 0 : s.activeIndex, 
                -1 === s.activeIndex && s.taggingLabel !== !1 && (s.activeIndex = 0);
                var f = c.querySelectorAll(".ui-select-choices-content"), g = c.querySelectorAll(".ui-select-search");
                if (s.$animate && s.$animate.on && s.$animate.enabled(f[0])) {
                    var h = function(b, c) {
                        "start" === c && 0 === s.items.length ? (s.$animate.off("removeClass", g[0], h), 
                        d(function() {
                            s.focusSearchInput(a);
                        })) : "close" === c && (s.$animate.off("enter", f[0], h), d(function() {
                            s.focusSearchInput(a);
                        }));
                    };
                    s.items.length > 0 ? s.$animate.on("enter", f[0], h) : s.$animate.on("removeClass", g[0], h);
                } else d(function() {
                    s.focusSearchInput(a), !s.tagging.isActivated && s.items.length > 1 && r();
                });
            }
        }, s.focusSearchInput = function(a) {
            s.search = a || s.search, s.searchInput[0].focus();
        }, s.findGroupByName = function(a) {
            return s.groups && s.groups.filter(function(b) {
                return b.name === a;
            })[0];
        }, s.parseRepeatAttr = function(a, c, d) {
            function e(a) {
                var e = b.$eval(c);
                if (s.groups = [], angular.forEach(a, function(a) {
                    var b = angular.isFunction(e) ? e(a) : a[e], c = s.findGroupByName(b);
                    c ? c.items.push(a) : s.groups.push({
                        name: b,
                        items: [ a ]
                    });
                }), d) {
                    var f = b.$eval(d);
                    angular.isFunction(f) ? s.groups = f(s.groups) : angular.isArray(f) && (s.groups = p(s.groups, f));
                }
                s.items = [], s.groups.forEach(function(a) {
                    s.items = s.items.concat(a.items);
                });
            }
            function f(a) {
                s.items = a;
            }
            s.setItemsFn = c ? e : f, s.parserResult = g.parse(a), s.isGrouped = !!c, s.itemProperty = s.parserResult.itemName;
            var i = s.parserResult.source, k = function() {
                var a = i(b);
                b.$uisSource = Object.keys(a).map(function(b) {
                    var c = {};
                    return c[s.parserResult.keyName] = b, c.value = a[b], c;
                });
            };
            s.parserResult.keyName && (k(), s.parserResult.source = j("$uisSource" + s.parserResult.filters), 
            b.$watch(i, function(a, b) {
                a !== b && k();
            }, !0)), s.refreshItems = function(a) {
                a = a || s.parserResult.source(b);
                var c = s.selected;
                if (s.isEmpty() || angular.isArray(c) && !c.length || !s.removeSelected) s.setItemsFn(a); else if (void 0 !== a) {
                    var d = a.filter(function(a) {
                        return angular.isArray(c) ? c.every(function(b) {
                            return !angular.equals(a, b);
                        }) : !angular.equals(a, c);
                    });
                    s.setItemsFn(d);
                }
                "auto" !== s.dropdownPosition && "up" !== s.dropdownPosition || b.calculateDropdownPos(), 
                b.$broadcast("uis:refresh");
            }, b.$watchCollection(s.parserResult.source, function(a) {
                if (void 0 === a || null === a) s.items = []; else {
                    if (!angular.isArray(a)) throw h("items", "Expected an array but got '{0}'.", a);
                    s.refreshItems(a), angular.isDefined(s.ngModel.$modelValue) && (s.ngModel.$modelValue = null);
                }
            });
        };
        var u;
        s.refresh = function(a) {
            void 0 !== a && (u && d.cancel(u), u = d(function() {
                b.$eval(a);
            }, s.refreshDelay));
        }, s.isActive = function(a) {
            if (!s.open) return !1;
            var b = s.items.indexOf(a[s.itemProperty]), c = b == s.activeIndex;
            return !(!c || 0 > b) && (c && !angular.isUndefined(s.onHighlightCallback) && a.$eval(s.onHighlightCallback), 
            c);
        };
        var v = function(a) {
            return s.selected && angular.isArray(s.selected) && s.selected.filter(function(b) {
                return angular.equals(b, a);
            }).length > 0;
        };
        s.isDisabled = function(a) {
            if (s.open) {
                var b, c = s.items.indexOf(a[s.itemProperty]), d = !1;
                return c >= 0 && (!angular.isUndefined(s.disableChoiceExpression) || s.multiple) && (b = s.items[c], 
                d = !!a.$eval(s.disableChoiceExpression) || v(b), b._uiSelectChoiceDisabled = d), 
                d;
            }
        }, s.select = function(a, c, e) {
            if (void 0 === a || !a._uiSelectChoiceDisabled) {
                if (!s.items && !s.search && !s.tagging.isActivated) return;
                if (!a || !a._uiSelectChoiceDisabled) {
                    if (s.tagging.isActivated) {
                        if (s.taggingLabel === !1) if (s.activeIndex < 0) {
                            if (a = void 0 !== s.tagging.fct ? s.tagging.fct(s.search) : s.search, !a || angular.equals(s.items[0], a)) return;
                        } else a = s.items[s.activeIndex]; else if (0 === s.activeIndex) {
                            if (void 0 === a) return;
                            if (void 0 !== s.tagging.fct && "string" == typeof a) {
                                if (a = s.tagging.fct(a), !a) return;
                            } else "string" == typeof a && (a = a.replace(s.taggingLabel, "").trim());
                        }
                        if (v(a)) return void s.close(c);
                    }
                    b.$broadcast("uis:select", a);
                    var f = {};
                    f[s.parserResult.itemName] = a, d(function() {
                        s.onSelectCallback(b, {
                            $item: a,
                            $model: s.parserResult.modelMapper(b, f)
                        });
                    }), s.closeOnSelect && s.close(c), e && "click" === e.type && (s.clickTriggeredSelect = !0);
                }
            }
        }, s.close = function(a) {
            s.open && (s.ngModel && s.ngModel.$setTouched && s.ngModel.$setTouched(), n(), o(), 
            s.open = !1, b.$broadcast("uis:close", a));
        }, s.setFocus = function() {
            s.focus || s.focusInput[0].focus();
        }, s.clear = function(a) {
            s.select(void 0), a.stopPropagation(), d(function() {
                s.focusser[0].focus();
            }, 0, !1);
        }, s.toggle = function(a) {
            s.open ? (s.close(), a.preventDefault(), a.stopPropagation()) : s.activate();
        }, s.isLocked = function(a, b) {
            var c, d = s.selected[b];
            return d && !angular.isUndefined(s.lockChoiceExpression) && (c = !!a.$eval(s.lockChoiceExpression), 
            d._uiSelectChoiceLocked = c), c;
        };
        var w = null, x = !1;
        s.sizeSearchInput = function() {
            var a = s.searchInput[0], c = s.searchInput.parent().parent()[0], e = function() {
                return c.clientWidth * !!a.offsetParent;
            }, f = function(b) {
                if (0 === b) return !1;
                var c = b - a.offsetLeft - 10;
                return 50 > c && (c = b), s.searchInput.css("width", c + "px"), !0;
            };
            s.searchInput.css("width", "10px"), d(function() {
                null !== w || f(e()) || (w = b.$watch(function() {
                    x || (x = !0, b.$$postDigest(function() {
                        x = !1, f(e()) && (w(), w = null);
                    }));
                }, angular.noop));
            });
        }, s.searchInput.on("keydown", function(c) {
            var e = c.which;
            ~[ a.ENTER, a.ESC ].indexOf(e) && (c.preventDefault(), c.stopPropagation()), b.$apply(function() {
                var b = !1;
                if ((s.items.length > 0 || s.tagging.isActivated) && (q(e), s.taggingTokens.isActivated)) {
                    for (var f = 0; f < s.taggingTokens.tokens.length; f++) s.taggingTokens.tokens[f] === a.MAP[c.keyCode] && s.search.length > 0 && (b = !0);
                    b && d(function() {
                        s.searchInput.triggerHandler("tagged");
                        var b = s.search.replace(a.MAP[c.keyCode], "").trim();
                        s.tagging.fct && (b = s.tagging.fct(b)), b && s.select(b, !0);
                    });
                }
            }), a.isVerticalMovement(e) && s.items.length > 0 && r(), e !== a.ENTER && e !== a.ESC || (c.preventDefault(), 
            c.stopPropagation());
        }), s.searchInput.on("paste", function(b) {
            var c;
            if (c = window.clipboardData && window.clipboardData.getData ? window.clipboardData.getData("Text") : (b.originalEvent || b).clipboardData.getData("text/plain"), 
            c = s.search + c, c && c.length > 0) if (s.taggingTokens.isActivated) {
                for (var d = [], e = 0; e < s.taggingTokens.tokens.length; e++) {
                    var f = a.toSeparator(s.taggingTokens.tokens[e]) || s.taggingTokens.tokens[e];
                    if (c.indexOf(f) > -1) {
                        d = c.split(f);
                        break;
                    }
                }
                if (0 === d.length && (d = [ c ]), d.length > 0) {
                    var g = s.search;
                    angular.forEach(d, function(a) {
                        var b = s.tagging.fct ? s.tagging.fct(a) : a;
                        b && s.select(b, !0);
                    }), s.search = g || t, b.preventDefault(), b.stopPropagation();
                }
            } else s.paste && (s.paste(c), s.search = t, b.preventDefault(), b.stopPropagation());
        }), s.searchInput.on("tagged", function() {
            d(function() {
                n();
            });
        });
        var y = f(function() {
            s.sizeSearchInput();
        }, 50);
        angular.element(l).bind("resize", y), b.$on("$destroy", function() {
            s.searchInput.off("keyup keydown tagged blur paste"), angular.element(l).off("resize", y);
        });
    } ]), c.directive("uiSelect", [ "$document", "uiSelectConfig", "uiSelectMinErr", "uisOffset", "$compile", "$parse", "$timeout", function(a, b, c, d, e, f, g) {
        return {
            restrict: "EA",
            templateUrl: function(a, c) {
                var d = c.theme || b.theme;
                return d + (angular.isDefined(c.multiple) ? "/select-multiple.tpl.html" : "/select.tpl.html");
            },
            replace: !0,
            transclude: !0,
            require: [ "uiSelect", "^ngModel" ],
            scope: !0,
            controller: "uiSelectCtrl",
            controllerAs: "$select",
            compile: function(e, h) {
                var i = /{(.*)}\s*{(.*)}/.exec(h.ngClass);
                if (i) {
                    var j = "{" + i[1] + ", " + i[2] + "}";
                    h.ngClass = j, e.attr("ng-class", j);
                }
                return angular.isDefined(h.multiple) ? e.append("<ui-select-multiple/>").removeAttr("multiple") : e.append("<ui-select-single/>"), 
                h.inputId && (e.querySelectorAll("input.ui-select-search")[0].id = h.inputId), function(e, h, i, j, k) {
                    function l(a) {
                        if (o.open) {
                            var b = !1;
                            if (b = window.jQuery ? window.jQuery.contains(h[0], a.target) : h[0].contains(a.target), 
                            !b && !o.clickTriggeredSelect) {
                                var c;
                                if (o.skipFocusser) c = !0; else {
                                    var d = [ "input", "button", "textarea", "select" ], f = angular.element(a.target).controller("uiSelect");
                                    c = f && f !== o, c || (c = ~d.indexOf(a.target.tagName.toLowerCase()));
                                }
                                o.close(c), e.$digest();
                            }
                            o.clickTriggeredSelect = !1;
                        }
                    }
                    function m() {
                        var b = d(h);
                        r = angular.element('<div class="ui-select-placeholder"></div>'), r[0].style.width = b.width + "px", 
                        r[0].style.height = b.height + "px", h.after(r), s = h[0].style.width, a.find("body").append(h), 
                        h[0].style.position = "absolute", h[0].style.left = b.left + "px", h[0].style.top = b.top + "px", 
                        h[0].style.width = b.width + "px";
                    }
                    function n() {
                        null !== r && (r.replaceWith(h), r = null, h[0].style.position = "", h[0].style.left = "", 
                        h[0].style.top = "", h[0].style.width = s, o.setFocus());
                    }
                    var o = j[0], p = j[1];
                    o.generatedId = b.generateId(), o.baseTitle = i.title || "Select box", o.focusserTitle = o.baseTitle + " focus", 
                    o.focusserId = "focusser-" + o.generatedId, o.closeOnSelect = function() {
                        return angular.isDefined(i.closeOnSelect) ? f(i.closeOnSelect)() : b.closeOnSelect;
                    }(), e.$watch("skipFocusser", function() {
                        var a = e.$eval(i.skipFocusser);
                        o.skipFocusser = void 0 !== a ? a : b.skipFocusser;
                    }), o.onSelectCallback = f(i.onSelect), o.onRemoveCallback = f(i.onRemove), o.ngModel = p, 
                    o.choiceGrouped = function(a) {
                        return o.isGrouped && a && a.name;
                    }, i.tabindex && i.$observe("tabindex", function(a) {
                        o.focusInput.attr("tabindex", a), h.removeAttr("tabindex");
                    }), e.$watch("searchEnabled", function() {
                        var a = e.$eval(i.searchEnabled);
                        o.searchEnabled = void 0 !== a ? a : b.searchEnabled;
                    }), e.$watch("sortable", function() {
                        var a = e.$eval(i.sortable);
                        o.sortable = void 0 !== a ? a : b.sortable;
                    }), i.$observe("limit", function() {
                        o.limit = angular.isDefined(i.limit) ? parseInt(i.limit, 10) : void 0;
                    }), e.$watch("removeSelected", function() {
                        var a = e.$eval(i.removeSelected);
                        o.removeSelected = void 0 !== a ? a : b.removeSelected;
                    }), i.$observe("disabled", function() {
                        o.disabled = void 0 !== i.disabled && i.disabled;
                    }), i.$observe("resetSearchInput", function() {
                        var a = e.$eval(i.resetSearchInput);
                        o.resetSearchInput = void 0 === a || a;
                    }), i.$observe("setSearchToAnswer", function() {
                        var a = e.$eval(i.setSearchToAnswer);
                        o.setSearchToAnswer = void 0 === a || a;
                    }), i.$observe("searchBy", function() {
                        o.searchBy = i.searchBy;
                    }), i.$observe("paste", function() {
                        o.paste = e.$eval(i.paste);
                    }), i.$observe("tagging", function() {
                        if (void 0 !== i.tagging) {
                            var a = e.$eval(i.tagging);
                            o.tagging = {
                                isActivated: !0,
                                fct: a !== !0 ? a : void 0
                            };
                        } else o.tagging = {
                            isActivated: !1,
                            fct: void 0
                        };
                    }), i.$observe("taggingLabel", function() {
                        void 0 !== i.tagging && ("false" === i.taggingLabel ? o.taggingLabel = !1 : o.taggingLabel = void 0 !== i.taggingLabel ? i.taggingLabel : "(new)");
                    }), i.$observe("taggingTokens", function() {
                        if (void 0 !== i.tagging) {
                            var a = void 0 !== i.taggingTokens ? i.taggingTokens.split("|") : [ ",", "ENTER" ];
                            o.taggingTokens = {
                                isActivated: !0,
                                tokens: a
                            };
                        }
                    }), angular.isDefined(i.autofocus) && g(function() {
                        o.setFocus();
                    }), angular.isDefined(i.focusOn) && e.$on(i.focusOn, function() {
                        g(function() {
                            o.setFocus();
                        });
                    }), a.on("click", l), e.$on("$destroy", function() {
                        a.off("click", l);
                    }), k(e, function(a) {
                        var b = angular.element("<div>").append(a), d = b.querySelectorAll(".ui-select-match");
                        if (d.removeAttr("ui-select-match"), d.removeAttr("data-ui-select-match"), 1 !== d.length) throw c("transcluded", "Expected 1 .ui-select-match but got '{0}'.", d.length);
                        h.querySelectorAll(".ui-select-match").replaceWith(d);
                        var e = b.querySelectorAll(".ui-select-choices");
                        if (e.removeAttr("ui-select-choices"), e.removeAttr("data-ui-select-choices"), 1 !== e.length) throw c("transcluded", "Expected 1 .ui-select-choices but got '{0}'.", e.length);
                        h.querySelectorAll(".ui-select-choices").replaceWith(e);
                        var f = b.querySelectorAll(".ui-select-no-choice");
                        f.removeAttr("ui-select-no-choice"), f.removeAttr("data-ui-select-no-choice"), 1 == f.length && h.querySelectorAll(".ui-select-no-choice").replaceWith(f);
                    });
                    var q = e.$eval(i.appendToBody);
                    (void 0 !== q ? q : b.appendToBody) && (e.$watch("$select.open", function(a) {
                        a ? m() : n();
                    }), e.$on("$destroy", function() {
                        n();
                    }));
                    var r = null, s = "", t = null, u = "direction-up";
                    e.$watch("$select.open", function() {
                        "auto" !== o.dropdownPosition && "up" !== o.dropdownPosition || e.calculateDropdownPos();
                    });
                    var v = function(a, b) {
                        a = a || d(h), b = b || d(t), t[0].style.position = "absolute", t[0].style.top = -1 * b.height + "px", 
                        h.addClass(u);
                    }, w = function(a, b) {
                        h.removeClass(u), a = a || d(h), b = b || d(t), t[0].style.position = "", t[0].style.top = "";
                    }, x = function() {
                        g(function() {
                            if ("up" === o.dropdownPosition) v(); else {
                                h.removeClass(u);
                                var b = d(h), c = d(t), e = a[0].documentElement.scrollTop || a[0].body.scrollTop;
                                b.top + b.height + c.height > e + a[0].documentElement.clientHeight ? v(b, c) : w(b, c);
                            }
                            t[0].style.opacity = 1;
                        });
                    };
                    e.calculateDropdownPos = function() {
                        if (o.open) {
                            if (t = angular.element(h).querySelectorAll(".ui-select-dropdown"), 0 === t.length) return;
                            if (t[0].style.opacity = 0, !d(t).height && o.$animate && o.$animate.on && o.$animate.enabled(t)) {
                                var a = !0;
                                o.$animate.on("enter", t, function(b, c) {
                                    "close" === c && a && (x(), a = !1);
                                });
                            } else x();
                        } else {
                            if (null === t || 0 === t.length) return;
                            t[0].style.opacity = 0, t[0].style.position = "", t[0].style.top = "", h.removeClass(u);
                        }
                    };
                };
            }
        };
    } ]), c.directive("uiSelectMatch", [ "uiSelectConfig", function(a) {
        function b(a, b) {
            return a[0].hasAttribute(b) ? a.attr(b) : a[0].hasAttribute("data-" + b) ? a.attr("data-" + b) : a[0].hasAttribute("x-" + b) ? a.attr("x-" + b) : void 0;
        }
        return {
            restrict: "EA",
            require: "^uiSelect",
            replace: !0,
            transclude: !0,
            templateUrl: function(c) {
                c.addClass("ui-select-match");
                var d = c.parent(), e = b(d, "theme") || a.theme, f = angular.isDefined(b(d, "multiple"));
                return e + (f ? "/match-multiple.tpl.html" : "/match.tpl.html");
            },
            link: function(b, c, d, e) {
                function f(a) {
                    e.allowClear = !!angular.isDefined(a) && ("" === a || "true" === a.toLowerCase());
                }
                e.lockChoiceExpression = d.uiLockChoice, d.$observe("placeholder", function(b) {
                    e.placeholder = void 0 !== b ? b : a.placeholder;
                }), d.$observe("allowClear", f), f(d.allowClear), e.multiple && e.sizeSearchInput();
            }
        };
    } ]), c.directive("uiSelectMultiple", [ "uiSelectMinErr", "$timeout", function(b, c) {
        return {
            restrict: "EA",
            require: [ "^uiSelect", "^ngModel" ],
            controller: [ "$scope", "$timeout", function(a, b) {
                var c, d = this, e = a.$select;
                angular.isUndefined(e.selected) && (e.selected = []), a.$evalAsync(function() {
                    c = a.ngModel;
                }), d.activeMatchIndex = -1, d.updateModel = function() {
                    c.$setViewValue(Date.now()), d.refreshComponent();
                }, d.refreshComponent = function() {
                    e.refreshItems(), e.sizeSearchInput();
                }, d.removeChoice = function(c) {
                    var f = e.selected[c];
                    if (!f._uiSelectChoiceLocked) {
                        var g = {};
                        g[e.parserResult.itemName] = f, e.selected.splice(c, 1), d.activeMatchIndex = -1, 
                        e.sizeSearchInput(), b(function() {
                            e.onRemoveCallback(a, {
                                $item: f,
                                $model: e.parserResult.modelMapper(a, g)
                            });
                        }), d.updateModel();
                    }
                }, d.getPlaceholder = function() {
                    return e.selected && e.selected.length ? void 0 : e.placeholder;
                };
            } ],
            controllerAs: "$selectMultiple",
            link: function(d, e, f, g) {
                function h(a) {
                    return angular.isNumber(a.selectionStart) ? a.selectionStart : a.value.length;
                }
                function i(b) {
                    function c() {
                        switch (b) {
                          case a.LEFT:
                            return ~n.activeMatchIndex ? k : g;

                          case a.RIGHT:
                            return ~n.activeMatchIndex && i !== g ? j : (l.activate(), !1);

                          case a.BACKSPACE:
                            return ~n.activeMatchIndex ? (n.removeChoice(i), k) : g;

                          case a.DELETE:
                            return !!~n.activeMatchIndex && (n.removeChoice(n.activeMatchIndex), i);
                        }
                    }
                    var d = h(l.searchInput[0]), e = l.selected.length, f = 0, g = e - 1, i = n.activeMatchIndex, j = n.activeMatchIndex + 1, k = n.activeMatchIndex - 1, m = i;
                    return !(d > 0 || l.search.length && b == a.RIGHT) && (l.close(), m = c(), l.selected.length && m !== !1 ? n.activeMatchIndex = Math.min(g, Math.max(f, m)) : n.activeMatchIndex = -1, 
                    !0);
                }
                function j(a) {
                    if (void 0 === a || void 0 === l.search) return !1;
                    var b = a.filter(function(a) {
                        return void 0 !== l.search.toUpperCase() && void 0 !== a && a.toUpperCase() === l.search.toUpperCase();
                    }).length > 0;
                    return b;
                }
                function k(a, b) {
                    var c = -1;
                    if (angular.isArray(a)) for (var d = angular.copy(a), e = 0; e < d.length; e++) if (void 0 === l.tagging.fct) d[e] + " " + l.taggingLabel === b && (c = e); else {
                        var f = d[e];
                        angular.isObject(f) && (f.isTag = !0), angular.equals(f, b) && (c = e);
                    }
                    return c;
                }
                var l = g[0], m = d.ngModel = g[1], n = d.$selectMultiple;
                l.multiple = !0, l.focusInput = l.searchInput, m.$isEmpty = function(a) {
                    return !a || 0 === a.length;
                }, m.$parsers.unshift(function() {
                    for (var a, b = {}, c = [], e = l.selected.length - 1; e >= 0; e--) b = {}, b[l.parserResult.itemName] = l.selected[e], 
                    a = l.parserResult.modelMapper(d, b), c.unshift(a);
                    return c;
                }), m.$formatters.unshift(function(a) {
                    var b, c = l.parserResult && l.parserResult.source(d, {
                        $select: {
                            search: ""
                        }
                    }), e = {};
                    if (!c) return a;
                    var f = [], g = function(a, c) {
                        if (a && a.length) {
                            for (var g = a.length - 1; g >= 0; g--) {
                                if (e[l.parserResult.itemName] = a[g], b = l.parserResult.modelMapper(d, e), l.parserResult.trackByExp) {
                                    var h = /(\w*)\./.exec(l.parserResult.trackByExp), i = /\.([^\s]+)/.exec(l.parserResult.trackByExp);
                                    if (h && h.length > 0 && h[1] == l.parserResult.itemName && i && i.length > 0 && b[i[1]] == c[i[1]]) return f.unshift(a[g]), 
                                    !0;
                                }
                                if (angular.equals(b, c)) return f.unshift(a[g]), !0;
                            }
                            return !1;
                        }
                    };
                    if (!a) return f;
                    for (var h = a.length - 1; h >= 0; h--) g(l.selected, a[h]) || g(c, a[h]) || f.unshift(a[h]);
                    return f;
                }), d.$watchCollection(function() {
                    return m.$modelValue;
                }, function(a, b) {
                    b != a && (angular.isDefined(m.$modelValue) && (m.$modelValue = null), n.refreshComponent());
                }), m.$render = function() {
                    if (!angular.isArray(m.$viewValue)) {
                        if (!angular.isUndefined(m.$viewValue) && null !== m.$viewValue) throw b("multiarr", "Expected model value to be array but got '{0}'", m.$viewValue);
                        l.selected = [];
                    }
                    l.selected = m.$viewValue, n.refreshComponent(), d.$evalAsync();
                }, d.$on("uis:select", function(a, b) {
                    l.selected.length >= l.limit || (l.selected.push(b), n.updateModel());
                }), d.$on("uis:activate", function() {
                    n.activeMatchIndex = -1;
                }), d.$watch("$select.disabled", function(a, b) {
                    b && !a && l.sizeSearchInput();
                }), l.searchInput.on("keydown", function(b) {
                    var c = b.which;
                    d.$apply(function() {
                        var d = !1;
                        a.isHorizontalMovement(c) && (d = i(c)), d && c != a.TAB && (b.preventDefault(), 
                        b.stopPropagation());
                    });
                }), l.searchInput.on("keyup", function(b) {
                    if (a.isVerticalMovement(b.which) || d.$evalAsync(function() {
                        l.activeIndex = l.taggingLabel === !1 ? -1 : 0;
                    }), l.tagging.isActivated && l.search.length > 0) {
                        if (b.which === a.TAB || a.isControl(b) || a.isFunctionKey(b) || b.which === a.ESC || a.isVerticalMovement(b.which)) return;
                        if (l.activeIndex = l.taggingLabel === !1 ? -1 : 0, l.taggingLabel === !1) return;
                        var c, e, f, g, h = angular.copy(l.items), i = angular.copy(l.items), m = !1, n = -1;
                        if (void 0 !== l.tagging.fct) {
                            if (f = l.$filter("filter")(h, {
                                isTag: !0
                            }), f.length > 0 && (g = f[0]), h.length > 0 && g && (m = !0, h = h.slice(1, h.length), 
                            i = i.slice(1, i.length)), c = l.tagging.fct(l.search), i.some(function(a) {
                                return angular.equals(a, c);
                            }) || l.selected.some(function(a) {
                                return angular.equals(a, c);
                            })) return void d.$evalAsync(function() {
                                l.activeIndex = 0, l.items = h;
                            });
                            c && (c.isTag = !0);
                        } else {
                            if (f = l.$filter("filter")(h, function(a) {
                                return a.match(l.taggingLabel);
                            }), f.length > 0 && (g = f[0]), e = h[0], void 0 !== e && h.length > 0 && g && (m = !0, 
                            h = h.slice(1, h.length), i = i.slice(1, i.length)), c = l.search + " " + l.taggingLabel, 
                            k(l.selected, l.search) > -1) return;
                            if (j(i.concat(l.selected))) return void (m && (h = i, d.$evalAsync(function() {
                                l.activeIndex = 0, l.items = h;
                            })));
                            if (j(i)) return void (m && (l.items = i.slice(1, i.length)));
                        }
                        m && (n = k(l.selected, c)), n > -1 ? h = h.slice(n + 1, h.length - 1) : (h = [], 
                        c && h.push(c), h = h.concat(i)), d.$evalAsync(function() {
                            if (l.activeIndex = 0, l.items = h, l.isGrouped) {
                                var a = c ? h.slice(1) : h;
                                l.setItemsFn(a), c && (l.items.unshift(c), l.groups.unshift({
                                    name: "",
                                    items: [ c ],
                                    tagging: !0
                                }));
                            }
                        });
                    }
                }), l.searchInput.on("blur", function() {
                    c(function() {
                        n.activeMatchIndex = -1;
                    });
                });
            }
        };
    } ]), c.directive("uiSelectNoChoice", [ "uiSelectConfig", function(a) {
        return {
            restrict: "EA",
            require: "^uiSelect",
            replace: !0,
            transclude: !0,
            templateUrl: function(b) {
                b.addClass("ui-select-no-choice");
                var c = b.parent().attr("theme") || a.theme;
                return c + "/no-choice.tpl.html";
            }
        };
    } ]), c.directive("uiSelectSingle", [ "$timeout", "$compile", function(b, c) {
        return {
            restrict: "EA",
            require: [ "^uiSelect", "^ngModel" ],
            link: function(d, e, f, g) {
                var h = g[0], i = g[1];
                i.$parsers.unshift(function(a) {
                    var b, c = {};
                    return c[h.parserResult.itemName] = a, b = h.parserResult.modelMapper(d, c);
                }), i.$formatters.unshift(function(a) {
                    var b, c = h.parserResult && h.parserResult.source(d, {
                        $select: {
                            search: ""
                        }
                    }), e = {};
                    if (c) {
                        var f = function(c) {
                            return e[h.parserResult.itemName] = c, b = h.parserResult.modelMapper(d, e), b === a;
                        };
                        if (h.selected && f(h.selected)) return h.selected;
                        for (var g = c.length - 1; g >= 0; g--) if (f(c[g])) return c[g];
                    }
                    return a;
                }), d.$watch("$select.selected", function(a) {
                    i.$viewValue !== a && i.$setViewValue(a);
                }), i.$render = function() {
                    h.selected = i.$viewValue;
                }, d.$on("uis:select", function(a, b) {
                    h.selected = b;
                }), d.$on("uis:close", function(a, c) {
                    b(function() {
                        h.focusser.prop("disabled", !1), c || h.focusser[0].focus();
                    }, 0, !1);
                }), d.$on("uis:activate", function() {
                    j.prop("disabled", !0);
                });
                var j = angular.element("<input ng-disabled='$select.disabled' class='ui-select-focusser ui-select-offscreen' type='text' id='{{ $select.focusserId }}' aria-label='{{ $select.focusserTitle }}' aria-haspopup='true' role='button' />");
                c(j)(d), h.focusser = j, h.focusInput = j, e.parent().append(j), j.bind("focus", function() {
                    d.$evalAsync(function() {
                        h.focus = !0;
                    });
                }), j.bind("blur", function() {
                    d.$evalAsync(function() {
                        h.focus = !1;
                    });
                }), j.bind("keydown", function(b) {
                    return b.which === a.BACKSPACE ? (b.preventDefault(), b.stopPropagation(), h.select(void 0), 
                    void d.$apply()) : void (b.which === a.TAB || a.isControl(b) || a.isFunctionKey(b) || b.which === a.ESC || (b.which != a.DOWN && b.which != a.UP && b.which != a.ENTER && b.which != a.SPACE || (b.preventDefault(), 
                    b.stopPropagation(), h.activate()), d.$digest()));
                }), j.bind("keyup input", function(b) {
                    b.which === a.TAB || a.isControl(b) || a.isFunctionKey(b) || b.which === a.ESC || b.which == a.ENTER || b.which === a.BACKSPACE || (h.activate(j.val()), 
                    j.val(""), d.$digest());
                });
            }
        };
    } ]), c.directive("uiSelectSort", [ "$timeout", "uiSelectConfig", "uiSelectMinErr", function(a, b, c) {
        return {
            require: [ "^^uiSelect", "^ngModel" ],
            link: function(b, d, e, f) {
                if (null === b[e.uiSelectSort]) throw c("sort", "Expected a list to sort");
                var g = f[0], h = f[1], i = angular.extend({
                    axis: "horizontal"
                }, b.$eval(e.uiSelectSortOptions)), j = i.axis, k = "dragging", l = "dropping", m = "dropping-before", n = "dropping-after";
                b.$watch(function() {
                    return g.sortable;
                }, function(a) {
                    a ? d.attr("draggable", !0) : d.removeAttr("draggable");
                }), d.on("dragstart", function(a) {
                    d.addClass(k), (a.dataTransfer || a.originalEvent.dataTransfer).setData("text", b.$index.toString());
                }), d.on("dragend", function() {
                    q(k);
                });
                var o, p = function(a, b) {
                    this.splice(b, 0, this.splice(a, 1)[0]);
                }, q = function(a) {
                    angular.forEach(g.$element.querySelectorAll("." + a), function(b) {
                        angular.element(b).removeClass(a);
                    });
                }, r = function(a) {
                    a.preventDefault();
                    var b = "vertical" === j ? a.offsetY || a.layerY || (a.originalEvent ? a.originalEvent.offsetY : 0) : a.offsetX || a.layerX || (a.originalEvent ? a.originalEvent.offsetX : 0);
                    b < this["vertical" === j ? "offsetHeight" : "offsetWidth"] / 2 ? (q(n), d.addClass(m)) : (q(m), 
                    d.addClass(n));
                }, s = function(b) {
                    b.preventDefault();
                    var c = parseInt((b.dataTransfer || b.originalEvent.dataTransfer).getData("text"), 10);
                    a.cancel(o), o = a(function() {
                        t(c);
                    }, 20);
                }, t = function(a) {
                    var c = b.$eval(e.uiSelectSort), f = c[a], g = null;
                    g = d.hasClass(m) ? a < b.$index ? b.$index - 1 : b.$index : a < b.$index ? b.$index : b.$index + 1, 
                    p.apply(c, [ a, g ]), h.$setViewValue(Date.now()), b.$apply(function() {
                        b.$emit("uiSelectSort:change", {
                            array: c,
                            item: f,
                            from: a,
                            to: g
                        });
                    }), q(l), q(m), q(n), d.off("drop", s);
                };
                d.on("dragenter", function() {
                    d.hasClass(k) || (d.addClass(l), d.on("dragover", r), d.on("drop", s));
                }), d.on("dragleave", function(a) {
                    a.target == d && (q(l), q(m), q(n), d.off("dragover", r), d.off("drop", s));
                });
            }
        };
    } ]), c.factory("$$uisDebounce", [ "$timeout", function(a) {
        return function(b, c) {
            var d;
            return function() {
                var e = this, f = Array.prototype.slice.call(arguments);
                d && a.cancel(d), d = a(function() {
                    b.apply(e, f);
                }, c);
            };
        };
    } ]), c.service("uisRepeatParser", [ "uiSelectMinErr", "$parse", function(a, b) {
        var c = this;
        c.parse = function(c) {
            var d;
            if (d = c.match(/^\s*(?:([\s\S]+?)\s+as\s+)?(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(\s*[\s\S]+?)?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/), 
            !d) throw a("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", c);
            var e = d[5], f = "";
            if (d[3]) {
                e = d[5].replace(/(^\()|(\)$)/g, "");
                var g = d[5].match(/^\s*(?:[\s\S]+?)(?:[^\|]|\|\|)+([\s\S]*)\s*$/);
                g && g[1].trim() && (f = g[1], e = e.replace(f, ""));
            }
            return {
                itemName: d[4] || d[2],
                keyName: d[3],
                source: b(e),
                filters: f,
                trackByExp: d[6],
                modelMapper: b(d[1] || d[4] || d[2]),
                repeatExpression: function(a) {
                    var b = this.itemName + " in " + (a ? "$group.items" : "$select.items");
                    return this.trackByExp && (b += " track by " + this.trackByExp), b;
                }
            };
        }, c.getGroupNgRepeatExpression = function() {
            return "$group in $select.groups";
        };
    } ]);
}(), angular.module("ui.select").run([ "$templateCache", function(a) {
    a.put("bootstrap/choices.tpl.html", '<ul class="ui-select-choices ui-select-choices-content ui-select-dropdown dropdown-menu" role="listbox" ng-show="$select.open && $select.items.length > 0"><li class="ui-select-choices-group" id="ui-select-choices-{{ $select.generatedId }}"><div class="divider" ng-show="$select.isGrouped && $index > 0"></div><div ng-show="$select.isGrouped" class="ui-select-choices-group-label dropdown-header" ng-bind="$group.name"></div><div ng-attr-id="ui-select-choices-row-{{ $select.generatedId }}-{{$index}}" class="ui-select-choices-row" ng-class="{active: $select.isActive(this), disabled: $select.isDisabled(this)}" role="option"><a href="" class="ui-select-choices-row-inner"></a></div></li></ul>'), 
    a.put("bootstrap/match-multiple.tpl.html", '<span class="ui-select-match"><span ng-repeat="$item in $select.selected"><span class="ui-select-match-item btn btn-default btn-xs" tabindex="-1" type="button" ng-disabled="$select.disabled" ng-click="$selectMultiple.activeMatchIndex = $index;" ng-class="{\'btn-primary\':$selectMultiple.activeMatchIndex === $index, \'select-locked\':$select.isLocked(this, $index)}" ui-select-sort="$select.selected"><span class="close ui-select-match-close" ng-hide="$select.disabled" ng-click="$selectMultiple.removeChoice($index)">&nbsp;&times;</span> <span uis-transclude-append=""></span></span></span></span>'), 
    a.put("bootstrap/match.tpl.html", '<div class="ui-select-match" ng-hide="$select.open && $select.searchEnabled" ng-disabled="$select.disabled" ng-class="{\'btn-default-focus\':$select.focus}"><span tabindex="-1" class="btn btn-default form-control ui-select-toggle" aria-label="{{ $select.baseTitle }} activate" ng-disabled="$select.disabled" ng-click="$select.activate()" style="outline: 0;"><span ng-show="$select.isEmpty()" class="ui-select-placeholder text-muted">{{$select.placeholder}}</span> <span ng-hide="$select.isEmpty()" class="ui-select-match-text pull-left" ng-class="{\'ui-select-allow-clear\': $select.allowClear && !$select.isEmpty()}" ng-transclude=""></span> <i class="caret pull-right" ng-click="$select.toggle($event)"></i> <a ng-show="$select.allowClear && !$select.isEmpty() && ($select.disabled !== true)" aria-label="{{ $select.baseTitle }} clear" style="margin-right: 10px" ng-click="$select.clear($event)" class="btn btn-xs btn-link pull-right"><i class="glyphicon glyphicon-remove" aria-hidden="true"></i></a></span></div>'), 
    a.put("bootstrap/no-choice.tpl.html", '<ul class="ui-select-no-choice dropdown-menu" ng-show="$select.items.length == 0"><li ng-transclude=""></li></ul>'), 
    a.put("bootstrap/select-multiple.tpl.html", '<div class="ui-select-container ui-select-multiple ui-select-bootstrap dropdown form-control" ng-class="{open: $select.open}"><div><div class="ui-select-match"></div><input type="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="ui-select-search input-xs" placeholder="{{$selectMultiple.getPlaceholder()}}" ng-disabled="$select.disabled" ng-hide="$select.disabled" ng-click="$select.activate()" ng-model="$select.search" role="combobox" aria-label="{{ $select.baseTitle }}" ondrop="return false;"></div><div class="ui-select-choices"></div><div class="ui-select-no-choice"></div></div>'), 
    a.put("bootstrap/select.tpl.html", '<div class="ui-select-container ui-select-bootstrap dropdown" ng-class="{open: $select.open}"><div class="ui-select-match"></div><input type="search" autocomplete="off" tabindex="-1" aria-expanded="true" aria-label="{{ $select.baseTitle }}" aria-owns="ui-select-choices-{{ $select.generatedId }}" aria-activedescendant="ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}" class="form-control ui-select-search" placeholder="{{$select.placeholder}}" ng-model="$select.search" ng-show="$select.searchEnabled && $select.open"><div class="ui-select-choices"></div><div class="ui-select-no-choice"></div></div>'), 
    a.put("select2/choices.tpl.html", '<ul tabindex="-1" class="ui-select-choices ui-select-choices-content select2-results"><li class="ui-select-choices-group" ng-class="{\'select2-result-with-children\': $select.choiceGrouped($group) }"><div ng-show="$select.choiceGrouped($group)" class="ui-select-choices-group-label select2-result-label" ng-bind="$group.name"></div><ul role="listbox" id="ui-select-choices-{{ $select.generatedId }}" ng-class="{\'select2-result-sub\': $select.choiceGrouped($group), \'select2-result-single\': !$select.choiceGrouped($group) }"><li role="option" ng-attr-id="ui-select-choices-row-{{ $select.generatedId }}-{{$index}}" class="ui-select-choices-row" ng-class="{\'select2-highlighted\': $select.isActive(this), \'select2-disabled\': $select.isDisabled(this)}"><div class="select2-result-label ui-select-choices-row-inner"></div></li></ul></li></ul>'), 
    a.put("select2/match-multiple.tpl.html", '<span class="ui-select-match"><li class="ui-select-match-item select2-search-choice" ng-repeat="$item in $select.selected" ng-class="{\'select2-search-choice-focus\':$selectMultiple.activeMatchIndex === $index, \'select2-locked\':$select.isLocked(this, $index)}" ui-select-sort="$select.selected"><span uis-transclude-append=""></span> <a href="javascript:;" class="ui-select-match-close select2-search-choice-close" ng-click="$selectMultiple.removeChoice($index)" tabindex="-1"></a></li></span>'), 
    a.put("select2/match.tpl.html", '<a class="select2-choice ui-select-match" ng-class="{\'select2-default\': $select.isEmpty()}" ng-click="$select.toggle($event)" aria-label="{{ $select.baseTitle }} select"><span ng-show="$select.isEmpty()" class="select2-chosen">{{$select.placeholder}}</span> <span ng-hide="$select.isEmpty()" class="select2-chosen" ng-transclude=""></span> <abbr ng-if="$select.allowClear && !$select.isEmpty()" class="select2-search-choice-close" ng-click="$select.clear($event)"></abbr> <span class="select2-arrow ui-select-toggle"><b></b></span></a>'), 
    a.put("select2/select-multiple.tpl.html", '<div class="ui-select-container ui-select-multiple select2 select2-container select2-container-multi" ng-class="{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled}"><ul class="select2-choices"><span class="ui-select-match"></span><li class="select2-search-field"><input type="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="combobox" aria-expanded="true" aria-owns="ui-select-choices-{{ $select.generatedId }}" aria-label="{{ $select.baseTitle }}" aria-activedescendant="ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}" class="select2-input ui-select-search" placeholder="{{$selectMultiple.getPlaceholder()}}" ng-disabled="$select.disabled" ng-hide="$select.disabled" ng-model="$select.search" ng-click="$select.activate()" style="width: 34px;" ondrop="return false;"></li></ul><div class="ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active" ng-class="{\'select2-display-none\': !$select.open || $select.items.length === 0}"><div class="ui-select-choices"></div></div></div>'), 
    a.put("select2/select.tpl.html", '<div class="ui-select-container select2 select2-container" ng-class="{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled, \'select2-container-active\': $select.focus, \'select2-allowclear\': $select.allowClear && !$select.isEmpty()}"><div class="ui-select-match"></div><div class="ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active" ng-class="{\'select2-display-none\': !$select.open}"><div class="select2-search" ng-show="$select.searchEnabled"><input type="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="combobox" aria-expanded="true" aria-owns="ui-select-choices-{{ $select.generatedId }}" aria-label="{{ $select.baseTitle }}" aria-activedescendant="ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}" class="ui-select-search select2-input" ng-model="$select.search"></div><div class="ui-select-choices"></div></div></div>'), 
    a.put("selectize/choices.tpl.html", '<div ng-show="$select.open" class="ui-select-choices ui-select-dropdown selectize-dropdown single"><div class="ui-select-choices-content selectize-dropdown-content"><div class="ui-select-choices-group optgroup" role="listbox"><div ng-show="$select.isGrouped" class="ui-select-choices-group-label optgroup-header" ng-bind="$group.name"></div><div role="option" class="ui-select-choices-row" ng-class="{active: $select.isActive(this), disabled: $select.isDisabled(this)}"><div class="option ui-select-choices-row-inner" data-selectable=""></div></div></div></div></div>'), 
    a.put("selectize/match.tpl.html", '<div ng-hide="$select.searchEnabled && ($select.open || $select.isEmpty())" class="ui-select-match" ng-transclude=""></div>'), 
    a.put("selectize/select.tpl.html", '<div class="ui-select-container selectize-control single" ng-class="{\'open\': $select.open}"><div class="selectize-input" ng-class="{\'focus\': $select.open, \'disabled\': $select.disabled, \'selectize-focus\' : $select.focus}" ng-click="$select.open && !$select.searchEnabled ? $select.toggle($event) : $select.activate()" ng-focus"$select.open="" &&="" !$select.searchenabled="" ?="" $select.toggle($event)="" :="" $select.activate()"=""><div class="ui-select-match" ng-hide="$select.setSearchToAnswer"></div><input type="search" autocomplete="off" tabindex="-1" class="ui-select-search ui-select-toggle" ng-click="$select.toggle($event)" placeholder="{{$select.placeholder}}" ng-model="$select.search" ng-hide="(!$select.searchEnabled || ($select.selected && !$select.open)) && !$select.setSearchToAnswer" ng-disabled="$select.disabled" aria-label="{{ $select.baseTitle }}"></div><div class="ui-select-choices"></div></div>');
} ]), !function(a) {
    function b(b, c) {
        return {
            restrict: "A",
            scope: {
                isBusy: "=vBusy",
                busyLabel: "@vBusyLabel",
                busyText: "@vBusyText"
            },
            compile: function(b, d) {
                var e = a.element(b.find("span"));
                return e[0] || (b.html("<span>" + b.html() + "</span>"), e = a.element(b.find("span"))), 
                function(a, b) {
                    var f = e.html(), g = a.busyLabel || c.busyLabel, h = a.busyText;
                    a.$watch("isBusy", function(a) {
                        a ? (b.addClass(c.states.busy), e.html(g)) : (b.removeClass(c.states.busy), e.html(h || f));
                    }), d.$observe("vBusyLabel", function(a) {
                        g = a;
                    }), d.$observe("vBusyText", function(a) {
                        h = a;
                    });
                };
            }
        };
    }
    function c(b, c) {
        return {
            restrict: "A",
            link: function(d, e) {
                function f(c, d) {
                    var f, g, h = e[0].getBoundingClientRect(), i = e[0].querySelector("v-ripple");
                    a.element(i).remove(), i = b[0].createElement("v-ripple"), i.style.height = i.style.width = Math.max(h.width, h.height) + "px", 
                    e.append(i), g = c - h.left - i.offsetWidth / 2 - l[0].scrollLeft, f = d - h.top - i.offsetHeight / 2 - l[0].scrollTop, 
                    i.style.left = g + "px", i.style.top = f + "px";
                }
                function g(a) {
                    f(a.pageX, a.pageY), e.addClass(c.states.pressed), l.bind(k, h);
                }
                function h() {
                    e.removeClass(c.states.pressed), l.unbind(k, h);
                }
                var i = !("undefined" == typeof b[0].documentElement.ontouchstart), j = i ? "touchstart" : "mousedown", k = i ? "touchend" : "mouseup", l = a.element(b[0].body);
                e.bind(j, g);
            }
        };
    }
    a.module("vButton.config", []).constant("buttonConfig", {
        busyLabel: "Loading",
        states: {
            busy: "is-busy",
            pressed: "is-pressed"
        }
    }), a.module("vButton.directives", []), a.module("vButton", [ "vButton.config", "vButton.directives" ]), 
    a.module("vButton.directives").directive("vBusy", b), b.$inject = [ "$document", "buttonConfig" ], 
    a.module("vButton.directives").directive("vPressable", c), c.$inject = [ "$document", "buttonConfig" ];
}(angular), function(a, b, c) {
    function d(a, c) {
        c = c || {}, b.forEach(c, function(a, b) {
            delete c[b];
        });
        for (var d in a) !a.hasOwnProperty(d) || "$" === d.charAt(0) && "$" === d.charAt(1) || (c[d] = a[d]);
        return c;
    }
    var e = b.$$minErr("$resource"), f = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;
    b.module("ngResource", [ "ng" ]).provider("$resource", function() {
        var a = /^https?:\/\/[^\/]*/, g = this;
        this.defaults = {
            stripTrailingSlashes: !0,
            actions: {
                get: {
                    method: "GET"
                },
                save: {
                    method: "POST"
                },
                query: {
                    method: "GET",
                    isArray: !0
                },
                remove: {
                    method: "DELETE"
                },
                "delete": {
                    method: "DELETE"
                }
            }
        }, this.$get = [ "$http", "$log", "$q", function(h, i, j) {
            function k(a, b) {
                this.template = a, this.defaults = o({}, g.defaults, b), this.urlParams = {};
            }
            function l(a, r, s, t) {
                function u(a, d) {
                    var g = {};
                    return d = o({}, r, d), n(d, function(d, h) {
                        q(d) && (d = d());
                        var i;
                        if (d && d.charAt && "@" == d.charAt(0)) {
                            i = a;
                            var j = d.substr(1);
                            if (null == j || "" === j || "hasOwnProperty" === j || !f.test("." + j)) throw e("badmember", j);
                            for (var j = j.split("."), k = 0, l = j.length; k < l && b.isDefined(i); k++) {
                                var m = j[k];
                                i = null !== i ? i[m] : c;
                            }
                        } else i = d;
                        g[h] = i;
                    }), g;
                }
                function v(a) {
                    return a.resource;
                }
                function w(a) {
                    d(a || {}, this);
                }
                var x = new k(a, t);
                return s = o({}, g.defaults.actions, s), w.prototype.toJSON = function() {
                    var a = o({}, this);
                    return delete a.$promise, delete a.$resolved, a;
                }, n(s, function(a, f) {
                    var g = /^(POST|PUT|PATCH)$/i.test(a.method);
                    w[f] = function(k, l, r, s) {
                        var t, y, z, A = {};
                        switch (arguments.length) {
                          case 4:
                            z = s, y = r;

                          case 3:
                          case 2:
                            if (!q(l)) {
                                A = k, t = l, y = r;
                                break;
                            }
                            if (q(k)) {
                                y = k, z = l;
                                break;
                            }
                            y = l, z = r;

                          case 1:
                            q(k) ? y = k : g ? t = k : A = k;
                            break;

                          case 0:
                            break;

                          default:
                            throw e("badargs", arguments.length);
                        }
                        var B = this instanceof w, C = B ? t : a.isArray ? [] : new w(t), D = {}, E = a.interceptor && a.interceptor.response || v, F = a.interceptor && a.interceptor.responseError || c;
                        return n(a, function(a, c) {
                            switch (c) {
                              default:
                                D[c] = p(a);
                                break;

                              case "params":
                              case "isArray":
                              case "interceptor":
                                break;

                              case "timeout":
                                a && !b.isNumber(a) && i.debug("ngResource:\n  Only numeric values are allowed as `timeout`.\n  Promises are not supported in $resource, because the same value would be used for multiple requests.\n  If you need support for cancellable $resource actions, you should upgrade to version 1.5 or higher.");
                            }
                        }), g && (D.data = t), x.setUrlParams(D, o({}, u(t, a.params || {}), A), a.url), 
                        A = h(D).then(function(c) {
                            var g = c.data, h = C.$promise;
                            if (g) {
                                if (b.isArray(g) !== !!a.isArray) throw e("badcfg", f, a.isArray ? "array" : "object", b.isArray(g) ? "array" : "object", D.method, D.url);
                                a.isArray ? (C.length = 0, n(g, function(a) {
                                    "object" == typeof a ? C.push(new w(a)) : C.push(a);
                                })) : (d(g, C), C.$promise = h);
                            }
                            return C.$resolved = !0, c.resource = C, c;
                        }, function(a) {
                            return C.$resolved = !0, (z || m)(a), j.reject(a);
                        }), A = A.then(function(a) {
                            var b = E(a);
                            return (y || m)(b, a.headers), b;
                        }, F), B ? A : (C.$promise = A, C.$resolved = !1, C);
                    }, w.prototype["$" + f] = function(a, b, c) {
                        return q(a) && (c = b, b = a, a = {}), a = w[f].call(this, a, this, b, c), a.$promise || a;
                    };
                }), w.bind = function(b) {
                    return l(a, o({}, r, b), s);
                }, w;
            }
            var m = b.noop, n = b.forEach, o = b.extend, p = b.copy, q = b.isFunction;
            return k.prototype = {
                setUrlParams: function(c, d, f) {
                    var g, h, i = this, j = f || i.template, k = "", l = i.urlParams = {};
                    n(j.split(/\W/), function(a) {
                        if ("hasOwnProperty" === a) throw e("badname");
                        !/^\d+$/.test(a) && a && new RegExp("(^|[^\\\\]):" + a + "(\\W|$)").test(j) && (l[a] = !0);
                    }), j = j.replace(/\\:/g, ":"), j = j.replace(a, function(a) {
                        return k = a, "";
                    }), d = d || {}, n(i.urlParams, function(a, c) {
                        g = d.hasOwnProperty(c) ? d[c] : i.defaults[c], b.isDefined(g) && null !== g ? (h = encodeURIComponent(g).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "%20").replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+"), 
                        j = j.replace(new RegExp(":" + c + "(\\W|$)", "g"), function(a, b) {
                            return h + b;
                        })) : j = j.replace(new RegExp("(/?):" + c + "(\\W|$)", "g"), function(a, b, c) {
                            return "/" == c.charAt(0) ? c : b + c;
                        });
                    }), i.defaults.stripTrailingSlashes && (j = j.replace(/\/+$/, "") || "/"), j = j.replace(/\/\.(?=\w+($|\?))/, "."), 
                    c.url = k + j.replace(/\/\\\./, "/."), n(d, function(a, b) {
                        i.urlParams[b] || (c.params = c.params || {}, c.params[b] = a);
                    });
                }
            }, l;
        } ];
    });
}(window, window.angular), "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"), 
function(a, b, c) {
    function d(a, b) {
        return R(new (R(function() {}, {
            prototype: a
        }))(), b);
    }
    function e(a) {
        return Q(arguments, function(b) {
            b !== a && Q(b, function(b, c) {
                a.hasOwnProperty(c) || (a[c] = b);
            });
        }), a;
    }
    function f(a, b) {
        var c = [];
        for (var d in a.path) {
            if (a.path[d] !== b.path[d]) break;
            c.push(a.path[d]);
        }
        return c;
    }
    function g(a) {
        if (Object.keys) return Object.keys(a);
        var b = [];
        return Q(a, function(a, c) {
            b.push(c);
        }), b;
    }
    function h(a, b) {
        if (Array.prototype.indexOf) return a.indexOf(b, Number(arguments[2]) || 0);
        var c = a.length >>> 0, d = Number(arguments[2]) || 0;
        for (d = 0 > d ? Math.ceil(d) : Math.floor(d), 0 > d && (d += c); c > d; d++) if (d in a && a[d] === b) return d;
        return -1;
    }
    function i(a, b, c, d) {
        var e, i = f(c, d), j = {}, k = [];
        for (var l in i) if (i[l] && i[l].params && (e = g(i[l].params), e.length)) for (var m in e) h(k, e[m]) >= 0 || (k.push(e[m]), 
        j[e[m]] = a[e[m]]);
        return R({}, j, b);
    }
    function j(a, b, c) {
        if (!c) {
            c = [];
            for (var d in a) c.push(d);
        }
        for (var e = 0; e < c.length; e++) {
            var f = c[e];
            if (a[f] != b[f]) return !1;
        }
        return !0;
    }
    function k(a, b) {
        var c = {};
        return Q(a, function(a) {
            c[a] = b[a];
        }), c;
    }
    function l(a) {
        var b = {}, c = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
        return Q(c, function(c) {
            c in a && (b[c] = a[c]);
        }), b;
    }
    function m(a) {
        var b = {}, c = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
        for (var d in a) -1 == h(c, d) && (b[d] = a[d]);
        return b;
    }
    function n(a, b) {
        var c = P(a), d = c ? [] : {};
        return Q(a, function(a, e) {
            b(a, e) && (d[c ? d.length : e] = a);
        }), d;
    }
    function o(a, b) {
        var c = P(a) ? [] : {};
        return Q(a, function(a, d) {
            c[d] = b(a, d);
        }), c;
    }
    function p(a, b) {
        var d = 1, f = 2, i = {}, j = [], k = i, l = R(a.when(i), {
            $$promises: i,
            $$values: i
        });
        this.study = function(i) {
            function n(a, c) {
                if (s[c] !== f) {
                    if (r.push(c), s[c] === d) throw r.splice(0, h(r, c)), new Error("Cyclic dependency: " + r.join(" -> "));
                    if (s[c] = d, N(a)) q.push(c, [ function() {
                        return b.get(a);
                    } ], j); else {
                        var e = b.annotate(a);
                        Q(e, function(a) {
                            a !== c && i.hasOwnProperty(a) && n(i[a], a);
                        }), q.push(c, a, e);
                    }
                    r.pop(), s[c] = f;
                }
            }
            function o(a) {
                return O(a) && a.then && a.$$promises;
            }
            if (!O(i)) throw new Error("'invocables' must be an object");
            var p = g(i || {}), q = [], r = [], s = {};
            return Q(i, n), i = r = s = null, function(d, f, g) {
                function h() {
                    --u || (v || e(t, f.$$values), r.$$values = t, r.$$promises = r.$$promises || !0, 
                    delete r.$$inheritedValues, n.resolve(t));
                }
                function i(a) {
                    r.$$failure = a, n.reject(a);
                }
                function j(c, e, f) {
                    function j(a) {
                        l.reject(a), i(a);
                    }
                    function k() {
                        if (!L(r.$$failure)) try {
                            l.resolve(b.invoke(e, g, t)), l.promise.then(function(a) {
                                t[c] = a, h();
                            }, j);
                        } catch (a) {
                            j(a);
                        }
                    }
                    var l = a.defer(), m = 0;
                    Q(f, function(a) {
                        s.hasOwnProperty(a) && !d.hasOwnProperty(a) && (m++, s[a].then(function(b) {
                            t[a] = b, --m || k();
                        }, j));
                    }), m || k(), s[c] = l.promise;
                }
                if (o(d) && g === c && (g = f, f = d, d = null), d) {
                    if (!O(d)) throw new Error("'locals' must be an object");
                } else d = k;
                if (f) {
                    if (!o(f)) throw new Error("'parent' must be a promise returned by $resolve.resolve()");
                } else f = l;
                var n = a.defer(), r = n.promise, s = r.$$promises = {}, t = R({}, d), u = 1 + q.length / 3, v = !1;
                if (L(f.$$failure)) return i(f.$$failure), r;
                f.$$inheritedValues && e(t, m(f.$$inheritedValues, p)), R(s, f.$$promises), f.$$values ? (v = e(t, m(f.$$values, p)), 
                r.$$inheritedValues = m(f.$$values, p), h()) : (f.$$inheritedValues && (r.$$inheritedValues = m(f.$$inheritedValues, p)), 
                f.then(h, i));
                for (var w = 0, x = q.length; x > w; w += 3) d.hasOwnProperty(q[w]) ? h() : j(q[w], q[w + 1], q[w + 2]);
                return r;
            };
        }, this.resolve = function(a, b, c, d) {
            return this.study(a)(b, c, d);
        };
    }
    function q(a, b, c) {
        this.fromConfig = function(a, b, c) {
            return L(a.template) ? this.fromString(a.template, b) : L(a.templateUrl) ? this.fromUrl(a.templateUrl, b) : L(a.templateProvider) ? this.fromProvider(a.templateProvider, b, c) : null;
        }, this.fromString = function(a, b) {
            return M(a) ? a(b) : a;
        }, this.fromUrl = function(c, d) {
            return M(c) && (c = c(d)), null == c ? null : a.get(c, {
                cache: b,
                headers: {
                    Accept: "text/html"
                }
            }).then(function(a) {
                return a.data;
            });
        }, this.fromProvider = function(a, b, d) {
            return c.invoke(a, null, d || {
                params: b
            });
        };
    }
    function r(a, b, e) {
        function f(b, c, d, e) {
            if (q.push(b), o[b]) return o[b];
            if (!/^\w+([-.]+\w+)*(?:\[\])?$/.test(b)) throw new Error("Invalid parameter name '" + b + "' in pattern '" + a + "'");
            if (p[b]) throw new Error("Duplicate parameter name '" + b + "' in pattern '" + a + "'");
            return p[b] = new U.Param(b, c, d, e), p[b];
        }
        function g(a, b, c, d) {
            var e = [ "", "" ], f = a.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
            if (!b) return f;
            switch (c) {
              case !1:
                e = [ "(", ")" + (d ? "?" : "") ];
                break;

              case !0:
                f = f.replace(/\/$/, ""), e = [ "(?:/(", ")|/)?" ];
                break;

              default:
                e = [ "(" + c + "|", ")?" ];
            }
            return f + e[0] + b + e[1];
        }
        function h(e, f) {
            var g, h, i, j, k;
            return g = e[2] || e[3], k = b.params[g], i = a.substring(m, e.index), h = f ? e[4] : e[4] || ("*" == e[1] ? ".*" : null), 
            h && (j = U.type(h) || d(U.type("string"), {
                pattern: new RegExp(h, b.caseInsensitive ? "i" : c)
            })), {
                id: g,
                regexp: h,
                segment: i,
                type: j,
                cfg: k
            };
        }
        b = R({
            params: {}
        }, O(b) ? b : {});
        var i, j = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, k = /([:]?)([\w\[\].-]+)|\{([\w\[\].-]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, l = "^", m = 0, n = this.segments = [], o = e ? e.params : {}, p = this.params = e ? e.params.$$new() : new U.ParamSet(), q = [];
        this.source = a;
        for (var r, s, t; (i = j.exec(a)) && (r = h(i, !1), !(r.segment.indexOf("?") >= 0)); ) s = f(r.id, r.type, r.cfg, "path"), 
        l += g(r.segment, s.type.pattern.source, s.squash, s.isOptional), n.push(r.segment), 
        m = j.lastIndex;
        t = a.substring(m);
        var u = t.indexOf("?");
        if (u >= 0) {
            var v = this.sourceSearch = t.substring(u);
            if (t = t.substring(0, u), this.sourcePath = a.substring(0, m + u), v.length > 0) for (m = 0; i = k.exec(v); ) r = h(i, !0), 
            s = f(r.id, r.type, r.cfg, "search"), m = j.lastIndex;
        } else this.sourcePath = a, this.sourceSearch = "";
        l += g(t) + (b.strict === !1 ? "/?" : "") + "$", n.push(t), this.regexp = new RegExp(l, b.caseInsensitive ? "i" : c), 
        this.prefix = n[0], this.$$paramNames = q;
    }
    function s(a) {
        R(this, a);
    }
    function t() {
        function a(a) {
            return null != a ? a.toString().replace(/~/g, "~~").replace(/\//g, "~2F") : a;
        }
        function e(a) {
            return null != a ? a.toString().replace(/~2F/g, "/").replace(/~~/g, "~") : a;
        }
        function f() {
            return {
                strict: p,
                caseInsensitive: m
            };
        }
        function i(a) {
            return M(a) || P(a) && M(a[a.length - 1]);
        }
        function j() {
            for (;w.length; ) {
                var a = w.shift();
                if (a.pattern) throw new Error("You cannot override a type's .pattern at runtime.");
                b.extend(u[a.name], l.invoke(a.def));
            }
        }
        function k(a) {
            R(this, a || {});
        }
        U = this;
        var l, m = !1, p = !0, q = !1, u = {}, v = !0, w = [], x = {
            string: {
                encode: a,
                decode: e,
                is: function(a) {
                    return null == a || !L(a) || "string" == typeof a;
                },
                pattern: /[^\/]*/
            },
            "int": {
                encode: a,
                decode: function(a) {
                    return parseInt(a, 10);
                },
                is: function(a) {
                    return L(a) && this.decode(a.toString()) === a;
                },
                pattern: /\d+/
            },
            bool: {
                encode: function(a) {
                    return a ? 1 : 0;
                },
                decode: function(a) {
                    return 0 !== parseInt(a, 10);
                },
                is: function(a) {
                    return a === !0 || a === !1;
                },
                pattern: /0|1/
            },
            date: {
                encode: function(a) {
                    return this.is(a) ? [ a.getFullYear(), ("0" + (a.getMonth() + 1)).slice(-2), ("0" + a.getDate()).slice(-2) ].join("-") : c;
                },
                decode: function(a) {
                    if (this.is(a)) return a;
                    var b = this.capture.exec(a);
                    return b ? new Date(b[1], b[2] - 1, b[3]) : c;
                },
                is: function(a) {
                    return a instanceof Date && !isNaN(a.valueOf());
                },
                equals: function(a, b) {
                    return this.is(a) && this.is(b) && a.toISOString() === b.toISOString();
                },
                pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
                capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
            },
            json: {
                encode: b.toJson,
                decode: b.fromJson,
                is: b.isObject,
                equals: b.equals,
                pattern: /[^\/]*/
            },
            any: {
                encode: b.identity,
                decode: b.identity,
                equals: b.equals,
                pattern: /.*/
            }
        };
        t.$$getDefaultValue = function(a) {
            if (!i(a.value)) return a.value;
            if (!l) throw new Error("Injectable functions cannot be called at configuration time");
            return l.invoke(a.value);
        }, this.caseInsensitive = function(a) {
            return L(a) && (m = a), m;
        }, this.strictMode = function(a) {
            return L(a) && (p = a), p;
        }, this.defaultSquashPolicy = function(a) {
            if (!L(a)) return q;
            if (a !== !0 && a !== !1 && !N(a)) throw new Error("Invalid squash policy: " + a + ". Valid policies: false, true, arbitrary-string");
            return q = a, a;
        }, this.compile = function(a, b) {
            return new r(a, R(f(), b));
        }, this.isMatcher = function(a) {
            if (!O(a)) return !1;
            var b = !0;
            return Q(r.prototype, function(c, d) {
                M(c) && (b = b && L(a[d]) && M(a[d]));
            }), b;
        }, this.type = function(a, b, c) {
            if (!L(b)) return u[a];
            if (u.hasOwnProperty(a)) throw new Error("A type named '" + a + "' has already been defined.");
            return u[a] = new s(R({
                name: a
            }, b)), c && (w.push({
                name: a,
                def: c
            }), v || j()), this;
        }, Q(x, function(a, b) {
            u[b] = new s(R({
                name: b
            }, a));
        }), u = d(u, {}), this.$get = [ "$injector", function(a) {
            return l = a, v = !1, j(), Q(x, function(a, b) {
                u[b] || (u[b] = new s(a));
            }), this;
        } ], this.Param = function(a, d, e, f) {
            function j(a) {
                var b = O(a) ? g(a) : [], c = -1 === h(b, "value") && -1 === h(b, "type") && -1 === h(b, "squash") && -1 === h(b, "array");
                return c && (a = {
                    value: a
                }), a.$$fn = i(a.value) ? a.value : function() {
                    return a.value;
                }, a;
            }
            function k(c, d, e) {
                if (c.type && d) throw new Error("Param '" + a + "' has two type configurations.");
                return d ? d : c.type ? b.isString(c.type) ? u[c.type] : c.type instanceof s ? c.type : new s(c.type) : "config" === e ? u.any : u.string;
            }
            function m() {
                var b = {
                    array: "search" === f && "auto"
                }, c = a.match(/\[\]$/) ? {
                    array: !0
                } : {};
                return R(b, c, e).array;
            }
            function p(a, b) {
                var c = a.squash;
                if (!b || c === !1) return !1;
                if (!L(c) || null == c) return q;
                if (c === !0 || N(c)) return c;
                throw new Error("Invalid squash policy: '" + c + "'. Valid policies: false, true, or arbitrary string");
            }
            function r(a, b, d, e) {
                var f, g, i = [ {
                    from: "",
                    to: d || b ? c : ""
                }, {
                    from: null,
                    to: d || b ? c : ""
                } ];
                return f = P(a.replace) ? a.replace : [], N(e) && f.push({
                    from: e,
                    to: c
                }), g = o(f, function(a) {
                    return a.from;
                }), n(i, function(a) {
                    return -1 === h(g, a.from);
                }).concat(f);
            }
            function t() {
                if (!l) throw new Error("Injectable functions cannot be called at configuration time");
                var a = l.invoke(e.$$fn);
                if (null !== a && a !== c && !x.type.is(a)) throw new Error("Default value (" + a + ") for parameter '" + x.id + "' is not an instance of Type (" + x.type.name + ")");
                return a;
            }
            function v(a) {
                function b(a) {
                    return function(b) {
                        return b.from === a;
                    };
                }
                function c(a) {
                    var c = o(n(x.replace, b(a)), function(a) {
                        return a.to;
                    });
                    return c.length ? c[0] : a;
                }
                return a = c(a), L(a) ? x.type.$normalize(a) : t();
            }
            function w() {
                return "{Param:" + a + " " + d + " squash: '" + A + "' optional: " + z + "}";
            }
            var x = this;
            e = j(e), d = k(e, d, f);
            var y = m();
            d = y ? d.$asArray(y, "search" === f) : d, "string" !== d.name || y || "path" !== f || e.value !== c || (e.value = "");
            var z = e.value !== c, A = p(e, z), B = r(e, y, z, A);
            R(this, {
                id: a,
                type: d,
                location: f,
                array: y,
                squash: A,
                replace: B,
                isOptional: z,
                value: v,
                dynamic: c,
                config: e,
                toString: w
            });
        }, k.prototype = {
            $$new: function() {
                return d(this, R(new k(), {
                    $$parent: this
                }));
            },
            $$keys: function() {
                for (var a = [], b = [], c = this, d = g(k.prototype); c; ) b.push(c), c = c.$$parent;
                return b.reverse(), Q(b, function(b) {
                    Q(g(b), function(b) {
                        -1 === h(a, b) && -1 === h(d, b) && a.push(b);
                    });
                }), a;
            },
            $$values: function(a) {
                var b = {}, c = this;
                return Q(c.$$keys(), function(d) {
                    b[d] = c[d].value(a && a[d]);
                }), b;
            },
            $$equals: function(a, b) {
                var c = !0, d = this;
                return Q(d.$$keys(), function(e) {
                    var f = a && a[e], g = b && b[e];
                    d[e].type.equals(f, g) || (c = !1);
                }), c;
            },
            $$validates: function(a) {
                var d, e, f, g, h, i = this.$$keys();
                for (d = 0; d < i.length && (e = this[i[d]], f = a[i[d]], f !== c && null !== f || !e.isOptional); d++) {
                    if (g = e.type.$normalize(f), !e.type.is(g)) return !1;
                    if (h = e.type.encode(g), b.isString(h) && !e.type.pattern.exec(h)) return !1;
                }
                return !0;
            },
            $$parent: c
        }, this.ParamSet = k;
    }
    function u(a, d) {
        function e(a) {
            var b = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);
            return null != b ? b[1].replace(/\\(.)/g, "$1") : "";
        }
        function f(a, b) {
            return a.replace(/\$(\$|\d{1,2})/, function(a, c) {
                return b["$" === c ? 0 : Number(c)];
            });
        }
        function g(a, b, c) {
            if (!c) return !1;
            var d = a.invoke(b, b, {
                $match: c
            });
            return !L(d) || d;
        }
        function h(d, e, f, g, h) {
            function m(a, b, c) {
                return "/" === q ? a : b ? q.slice(0, -1) + a : c ? q.slice(1) + a : a;
            }
            function n(a) {
                function b(a) {
                    var b = a(f, d);
                    return !!b && (N(b) && d.replace().url(b), !0);
                }
                if (!a || !a.defaultPrevented) {
                    p && d.url() === p, p = c;
                    var e, g = j.length;
                    for (e = 0; g > e; e++) if (b(j[e])) return;
                    k && b(k);
                }
            }
            function o() {
                return i = i || e.$on("$locationChangeSuccess", n);
            }
            var p, q = g.baseHref(), r = d.url();
            return l || o(), {
                sync: function() {
                    n();
                },
                listen: function() {
                    return o();
                },
                update: function(a) {
                    return a ? void (r = d.url()) : void (d.url() !== r && (d.url(r), d.replace()));
                },
                push: function(a, b, e) {
                    var f = a.format(b || {});
                    null !== f && b && b["#"] && (f += "#" + b["#"]), d.url(f), p = e && e.$$avoidResync ? d.url() : c, 
                    e && e.replace && d.replace();
                },
                href: function(c, e, f) {
                    if (!c.validates(e)) return null;
                    var g = a.html5Mode();
                    b.isObject(g) && (g = g.enabled), g = g && h.history;
                    var i = c.format(e);
                    if (f = f || {}, g || null === i || (i = "#" + a.hashPrefix() + i), null !== i && e && e["#"] && (i += "#" + e["#"]), 
                    i = m(i, g, f.absolute), !f.absolute || !i) return i;
                    var j = !g && i ? "/" : "", k = d.port();
                    return k = 80 === k || 443 === k ? "" : ":" + k, [ d.protocol(), "://", d.host(), k, j, i ].join("");
                }
            };
        }
        var i, j = [], k = null, l = !1;
        this.rule = function(a) {
            if (!M(a)) throw new Error("'rule' must be a function");
            return j.push(a), this;
        }, this.otherwise = function(a) {
            if (N(a)) {
                var b = a;
                a = function() {
                    return b;
                };
            } else if (!M(a)) throw new Error("'rule' must be a function");
            return k = a, this;
        }, this.when = function(a, b) {
            var c, h = N(b);
            if (N(a) && (a = d.compile(a)), !h && !M(b) && !P(b)) throw new Error("invalid 'handler' in when()");
            var i = {
                matcher: function(a, b) {
                    return h && (c = d.compile(b), b = [ "$match", function(a) {
                        return c.format(a);
                    } ]), R(function(c, d) {
                        return g(c, b, a.exec(d.path(), d.search()));
                    }, {
                        prefix: N(a.prefix) ? a.prefix : ""
                    });
                },
                regex: function(a, b) {
                    if (a.global || a.sticky) throw new Error("when() RegExp must not be global or sticky");
                    return h && (c = b, b = [ "$match", function(a) {
                        return f(c, a);
                    } ]), R(function(c, d) {
                        return g(c, b, a.exec(d.path()));
                    }, {
                        prefix: e(a)
                    });
                }
            }, j = {
                matcher: d.isMatcher(a),
                regex: a instanceof RegExp
            };
            for (var k in j) if (j[k]) return this.rule(i[k](a, b));
            throw new Error("invalid 'what' in when()");
        }, this.deferIntercept = function(a) {
            a === c && (a = !0), l = a;
        }, this.$get = h, h.$inject = [ "$location", "$rootScope", "$injector", "$browser", "$sniffer" ];
    }
    function v(a, e) {
        function f(a) {
            return 0 === a.indexOf(".") || 0 === a.indexOf("^");
        }
        function m(a, b) {
            if (!a) return c;
            var d = N(a), e = d ? a : a.name, g = f(e);
            if (g) {
                if (!b) throw new Error("No reference point given for path '" + e + "'");
                b = m(b);
                for (var h = e.split("."), i = 0, j = h.length, k = b; j > i; i++) if ("" !== h[i] || 0 !== i) {
                    if ("^" !== h[i]) break;
                    if (!k.parent) throw new Error("Path '" + e + "' not valid for state '" + b.name + "'");
                    k = k.parent;
                } else k = b;
                h = h.slice(i).join("."), e = k.name + (k.name && h ? "." : "") + h;
            }
            var l = z[e];
            return !l || !d && (d || l !== a && l.self !== a) ? c : l;
        }
        function n(a, b) {
            A[a] || (A[a] = []), A[a].push(b);
        }
        function p(a) {
            for (var b = A[a] || []; b.length; ) q(b.shift());
        }
        function q(b) {
            b = d(b, {
                self: b,
                resolve: b.resolve || {},
                toString: function() {
                    return this.name;
                }
            });
            var c = b.name;
            if (!N(c) || c.indexOf("@") >= 0) throw new Error("State must have a valid name");
            if (z.hasOwnProperty(c)) throw new Error("State '" + c + "' is already defined");
            var e = -1 !== c.indexOf(".") ? c.substring(0, c.lastIndexOf(".")) : N(b.parent) ? b.parent : O(b.parent) && N(b.parent.name) ? b.parent.name : "";
            if (e && !z[e]) return n(e, b.self);
            for (var f in C) M(C[f]) && (b[f] = C[f](b, C.$delegates[f]));
            return z[c] = b, !b[B] && b.url && a.when(b.url, [ "$match", "$stateParams", function(a, c) {
                y.$current.navigable == b && j(a, c) || y.transitionTo(b, a, {
                    inherit: !0,
                    location: !1
                });
            } ]), p(c), b;
        }
        function r(a) {
            return a.indexOf("*") > -1;
        }
        function s(a) {
            for (var b = a.split("."), c = y.$current.name.split("."), d = 0, e = b.length; e > d; d++) "*" === b[d] && (c[d] = "*");
            return "**" === b[0] && (c = c.slice(h(c, b[1])), c.unshift("**")), "**" === b[b.length - 1] && (c.splice(h(c, b[b.length - 2]) + 1, Number.MAX_VALUE), 
            c.push("**")), b.length == c.length && c.join("") === b.join("");
        }
        function t(a, b) {
            return N(a) && !L(b) ? C[a] : M(b) && N(a) ? (C[a] && !C.$delegates[a] && (C.$delegates[a] = C[a]), 
            C[a] = b, this) : this;
        }
        function u(a, b) {
            return O(a) ? b = a : b.name = a, q(b), this;
        }
        function v(a, e, f, h, l, n, p, q, t) {
            function u(b, c, d, f) {
                var g = a.$broadcast("$stateNotFound", b, c, d);
                if (g.defaultPrevented) return p.update(), D;
                if (!g.retry) return null;
                if (f.$retry) return p.update(), E;
                var h = y.transition = e.when(g.retry);
                return h.then(function() {
                    return h !== y.transition ? A : (b.options.$retry = !0, y.transitionTo(b.to, b.toParams, b.options));
                }, function() {
                    return D;
                }), p.update(), h;
            }
            function v(a, c, d, g, i, j) {
                function m() {
                    var c = [];
                    return Q(a.views, function(d, e) {
                        var g = d.resolve && d.resolve !== a.resolve ? d.resolve : {};
                        g.$template = [ function() {
                            return f.load(e, {
                                view: d,
                                locals: i.globals,
                                params: n,
                                notify: j.notify
                            }) || "";
                        } ], c.push(l.resolve(g, i.globals, i.resolve, a).then(function(c) {
                            if (M(d.controllerProvider) || P(d.controllerProvider)) {
                                var f = b.extend({}, g, i.globals);
                                c.$$controller = h.invoke(d.controllerProvider, null, f);
                            } else c.$$controller = d.controller;
                            c.$$state = a, c.$$controllerAs = d.controllerAs, i[e] = c;
                        }));
                    }), e.all(c).then(function() {
                        return i.globals;
                    });
                }
                var n = d ? c : k(a.params.$$keys(), c), o = {
                    $stateParams: n
                };
                i.resolve = l.resolve(a.resolve, o, i.resolve, a);
                var p = [ i.resolve.then(function(a) {
                    i.globals = a;
                }) ];
                return g && p.push(g), e.all(p).then(m).then(function(a) {
                    return i;
                });
            }
            var A = e.reject(new Error("transition superseded")), C = e.reject(new Error("transition prevented")), D = e.reject(new Error("transition aborted")), E = e.reject(new Error("transition failed"));
            return x.locals = {
                resolve: null,
                globals: {
                    $stateParams: {}
                }
            }, y = {
                params: {},
                current: x.self,
                $current: x,
                transition: null
            }, y.reload = function(a) {
                return y.transitionTo(y.current, n, {
                    reload: a || !0,
                    inherit: !1,
                    notify: !0
                });
            }, y.go = function(a, b, c) {
                return y.transitionTo(a, b, R({
                    inherit: !0,
                    relative: y.$current
                }, c));
            }, y.transitionTo = function(b, c, f) {
                c = c || {}, f = R({
                    location: !0,
                    inherit: !1,
                    relative: null,
                    notify: !0,
                    reload: !1,
                    $retry: !1
                }, f || {});
                var g, j = y.$current, l = y.params, o = j.path, q = m(b, f.relative), r = c["#"];
                if (!L(q)) {
                    var s = {
                        to: b,
                        toParams: c,
                        options: f
                    }, t = u(s, j.self, l, f);
                    if (t) return t;
                    if (b = s.to, c = s.toParams, f = s.options, q = m(b, f.relative), !L(q)) {
                        if (!f.relative) throw new Error("No such state '" + b + "'");
                        throw new Error("Could not resolve '" + b + "' from state '" + f.relative + "'");
                    }
                }
                if (q[B]) throw new Error("Cannot transition to abstract state '" + b + "'");
                if (f.inherit && (c = i(n, c || {}, y.$current, q)), !q.params.$$validates(c)) return E;
                c = q.params.$$values(c), b = q;
                var z = b.path, D = 0, F = z[D], G = x.locals, H = [];
                if (f.reload) {
                    if (N(f.reload) || O(f.reload)) {
                        if (O(f.reload) && !f.reload.name) throw new Error("Invalid reload state object");
                        var I = f.reload === !0 ? o[0] : m(f.reload);
                        if (f.reload && !I) throw new Error("No such reload state '" + (N(f.reload) ? f.reload : f.reload.name) + "'");
                        for (;F && F === o[D] && F !== I; ) G = H[D] = F.locals, D++, F = z[D];
                    }
                } else for (;F && F === o[D] && F.ownParams.$$equals(c, l); ) G = H[D] = F.locals, 
                D++, F = z[D];
                if (w(b, c, j, l, G, f)) return r && (c["#"] = r), y.params = c, S(y.params, n), 
                S(k(b.params.$$keys(), n), b.locals.globals.$stateParams), f.location && b.navigable && b.navigable.url && (p.push(b.navigable.url, c, {
                    $$avoidResync: !0,
                    replace: "replace" === f.location
                }), p.update(!0)), y.transition = null, e.when(y.current);
                if (c = k(b.params.$$keys(), c || {}), r && (c["#"] = r), f.notify && a.$broadcast("$stateChangeStart", b.self, c, j.self, l, f).defaultPrevented) return a.$broadcast("$stateChangeCancel", b.self, c, j.self, l), 
                null == y.transition && p.update(), C;
                for (var J = e.when(G), K = D; K < z.length; K++, F = z[K]) G = H[K] = d(G), J = v(F, c, F === b, J, G, f);
                var M = y.transition = J.then(function() {
                    var d, e, g;
                    if (y.transition !== M) return A;
                    for (d = o.length - 1; d >= D; d--) g = o[d], g.self.onExit && h.invoke(g.self.onExit, g.self, g.locals.globals), 
                    g.locals = null;
                    for (d = D; d < z.length; d++) e = z[d], e.locals = H[d], e.self.onEnter && h.invoke(e.self.onEnter, e.self, e.locals.globals);
                    return y.transition !== M ? A : (y.$current = b, y.current = b.self, y.params = c, 
                    S(y.params, n), y.transition = null, f.location && b.navigable && p.push(b.navigable.url, b.navigable.locals.globals.$stateParams, {
                        $$avoidResync: !0,
                        replace: "replace" === f.location
                    }), f.notify && a.$broadcast("$stateChangeSuccess", b.self, c, j.self, l), p.update(!0), 
                    y.current);
                }, function(d) {
                    return y.transition !== M ? A : (y.transition = null, g = a.$broadcast("$stateChangeError", b.self, c, j.self, l, d), 
                    g.defaultPrevented || p.update(), e.reject(d));
                });
                return M;
            }, y.is = function(a, b, d) {
                d = R({
                    relative: y.$current
                }, d || {});
                var e = m(a, d.relative);
                return L(e) ? y.$current === e && (!b || j(e.params.$$values(b), n)) : c;
            }, y.includes = function(a, b, d) {
                if (d = R({
                    relative: y.$current
                }, d || {}), N(a) && r(a)) {
                    if (!s(a)) return !1;
                    a = y.$current.name;
                }
                var e = m(a, d.relative);
                return L(e) ? !!L(y.$current.includes[e.name]) && (!b || j(e.params.$$values(b), n, g(b))) : c;
            }, y.href = function(a, b, d) {
                d = R({
                    lossy: !0,
                    inherit: !0,
                    absolute: !1,
                    relative: y.$current
                }, d || {});
                var e = m(a, d.relative);
                if (!L(e)) return null;
                d.inherit && (b = i(n, b || {}, y.$current, e));
                var f = e && d.lossy ? e.navigable : e;
                return f && f.url !== c && null !== f.url ? p.href(f.url, k(e.params.$$keys().concat("#"), b || {}), {
                    absolute: d.absolute
                }) : null;
            }, y.get = function(a, b) {
                if (0 === arguments.length) return o(g(z), function(a) {
                    return z[a].self;
                });
                var c = m(a, b || y.$current);
                return c && c.self ? c.self : null;
            }, y;
        }
        function w(a, b, c, d, e, f) {
            function g(a, b, c) {
                function d(b) {
                    return "search" != a.params[b].location;
                }
                var e = a.params.$$keys().filter(d), f = l.apply({}, [ a.params ].concat(e)), g = new U.ParamSet(f);
                return g.$$equals(b, c);
            }
            return !(f.reload || a !== c || !(e === c.locals || a.self.reloadOnSearch === !1 && g(c, d, b))) || void 0;
        }
        var x, y, z = {}, A = {}, B = "abstract", C = {
            parent: function(a) {
                if (L(a.parent) && a.parent) return m(a.parent);
                var b = /^(.+)\.[^.]+$/.exec(a.name);
                return b ? m(b[1]) : x;
            },
            data: function(a) {
                return a.parent && a.parent.data && (a.data = a.self.data = d(a.parent.data, a.data)), 
                a.data;
            },
            url: function(a) {
                var b = a.url, c = {
                    params: a.params || {}
                };
                if (N(b)) return "^" == b.charAt(0) ? e.compile(b.substring(1), c) : (a.parent.navigable || x).url.concat(b, c);
                if (!b || e.isMatcher(b)) return b;
                throw new Error("Invalid url '" + b + "' in state '" + a + "'");
            },
            navigable: function(a) {
                return a.url ? a : a.parent ? a.parent.navigable : null;
            },
            ownParams: function(a) {
                var b = a.url && a.url.params || new U.ParamSet();
                return Q(a.params || {}, function(a, c) {
                    b[c] || (b[c] = new U.Param(c, null, a, "config"));
                }), b;
            },
            params: function(a) {
                var b = l(a.ownParams, a.ownParams.$$keys());
                return a.parent && a.parent.params ? R(a.parent.params.$$new(), b) : new U.ParamSet();
            },
            views: function(a) {
                var b = {};
                return Q(L(a.views) ? a.views : {
                    "": a
                }, function(c, d) {
                    d.indexOf("@") < 0 && (d += "@" + a.parent.name), b[d] = c;
                }), b;
            },
            path: function(a) {
                return a.parent ? a.parent.path.concat(a) : [];
            },
            includes: function(a) {
                var b = a.parent ? R({}, a.parent.includes) : {};
                return b[a.name] = !0, b;
            },
            $delegates: {}
        };
        x = q({
            name: "",
            url: "^",
            views: null,
            "abstract": !0
        }), x.navigable = null, this.decorator = t, this.state = u, this.$get = v, v.$inject = [ "$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$urlRouter", "$location", "$urlMatcherFactory" ];
    }
    function w() {
        function a(a, b) {
            return {
                load: function(a, c) {
                    var d, e = {
                        template: null,
                        controller: null,
                        view: null,
                        locals: null,
                        notify: !0,
                        async: !0,
                        params: {}
                    };
                    return c = R(e, c), c.view && (d = b.fromConfig(c.view, c.params, c.locals)), d;
                }
            };
        }
        this.$get = a, a.$inject = [ "$rootScope", "$templateFactory" ];
    }
    function x() {
        var a = !1;
        this.useAnchorScroll = function() {
            a = !0;
        }, this.$get = [ "$anchorScroll", "$timeout", function(b, c) {
            return a ? b : function(a) {
                return c(function() {
                    a[0].scrollIntoView();
                }, 0, !1);
            };
        } ];
    }
    function y(a, c, d, e) {
        function f() {
            return c.has ? function(a) {
                return c.has(a) ? c.get(a) : null;
            } : function(a) {
                try {
                    return c.get(a);
                } catch (b) {
                    return null;
                }
            };
        }
        function g(a, c) {
            function d(a) {
                return 1 === V && W >= 4 ? !!j.enabled(a) : 1 === V && W >= 2 ? !!j.enabled() : !!i;
            }
            var e = {
                enter: function(a, b, c) {
                    b.after(a), c();
                },
                leave: function(a, b) {
                    a.remove(), b();
                }
            };
            if (a.noanimation) return e;
            if (j) return {
                enter: function(a, c, f) {
                    d(a) ? b.version.minor > 2 ? j.enter(a, null, c).then(f) : j.enter(a, null, c, f) : e.enter(a, c, f);
                },
                leave: function(a, c) {
                    d(a) ? b.version.minor > 2 ? j.leave(a).then(c) : j.leave(a, c) : e.leave(a, c);
                }
            };
            if (i) {
                var f = i && i(c, a);
                return {
                    enter: function(a, b, c) {
                        f.enter(a, null, b), c();
                    },
                    leave: function(a, b) {
                        f.leave(a), b();
                    }
                };
            }
            return e;
        }
        var h = f(), i = h("$animator"), j = h("$animate"), k = {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            compile: function(c, f, h) {
                return function(c, f, i) {
                    function j() {
                        function a() {
                            b && b.remove(), c && c.$destroy();
                        }
                        var b = l, c = n;
                        c && (c._willBeDestroyed = !0), m ? (r.leave(m, function() {
                            a(), l = null;
                        }), l = m) : (a(), l = null), m = null, n = null;
                    }
                    function k(g) {
                        var k, l = A(c, i, f, e), s = l && a.$current && a.$current.locals[l];
                        if ((g || s !== o) && !c._willBeDestroyed) {
                            k = c.$new(), o = a.$current.locals[l], k.$emit("$viewContentLoading", l);
                            var t = h(k, function(a) {
                                r.enter(a, f, function() {
                                    n && n.$emit("$viewContentAnimationEnded"), (b.isDefined(q) && !q || c.$eval(q)) && d(a);
                                }), j();
                            });
                            m = t, n = k, n.$emit("$viewContentLoaded", l), n.$eval(p);
                        }
                    }
                    var l, m, n, o, p = i.onload || "", q = i.autoscroll, r = g(i, c);
                    c.$on("$stateChangeSuccess", function() {
                        k(!1);
                    }), k(!0);
                };
            }
        };
        return k;
    }
    function z(a, b, c, d) {
        return {
            restrict: "ECA",
            priority: -400,
            compile: function(e) {
                var f = e.html();
                return function(e, g, h) {
                    var i = c.$current, j = A(e, h, g, d), k = i && i.locals[j];
                    if (k) {
                        g.data("$uiView", {
                            name: j,
                            state: k.$$state
                        }), g.html(k.$template ? k.$template : f);
                        var l = a(g.contents());
                        if (k.$$controller) {
                            k.$scope = e, k.$element = g;
                            var m = b(k.$$controller, k);
                            k.$$controllerAs && (e[k.$$controllerAs] = m), g.data("$ngControllerController", m), 
                            g.children().data("$ngControllerController", m);
                        }
                        l(e);
                    }
                };
            }
        };
    }
    function A(a, b, c, d) {
        var e = d(b.uiView || b.name || "")(a), f = c.inheritedData("$uiView");
        return e.indexOf("@") >= 0 ? e : e + "@" + (f ? f.state.name : "");
    }
    function B(a, b) {
        var c, d = a.match(/^\s*({[^}]*})\s*$/);
        if (d && (a = b + "(" + d[1] + ")"), c = a.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/), 
        !c || 4 !== c.length) throw new Error("Invalid state ref '" + a + "'");
        return {
            state: c[1],
            paramExpr: c[3] || null
        };
    }
    function C(a) {
        var b = a.parent().inheritedData("$uiView");
        return b && b.state && b.state.name ? b.state : void 0;
    }
    function D(a) {
        var b = "[object SVGAnimatedString]" === Object.prototype.toString.call(a.prop("href")), c = "FORM" === a[0].nodeName;
        return {
            attr: c ? "action" : b ? "xlink:href" : "href",
            isAnchor: "A" === a.prop("tagName").toUpperCase(),
            clickable: !c
        };
    }
    function E(a, b, c, d, e) {
        return function(f) {
            var g = f.which || f.button, h = e();
            if (!(g > 1 || f.ctrlKey || f.metaKey || f.shiftKey || a.attr("target"))) {
                var i = c(function() {
                    b.go(h.state, h.params, h.options);
                });
                f.preventDefault();
                var j = d.isAnchor && !h.href ? 1 : 0;
                f.preventDefault = function() {
                    j-- <= 0 && c.cancel(i);
                };
            }
        };
    }
    function F(a, b) {
        return {
            relative: C(a) || b.$current,
            inherit: !0
        };
    }
    function G(a, c) {
        return {
            restrict: "A",
            require: [ "?^uiSrefActive", "?^uiSrefActiveEq" ],
            link: function(d, e, f, g) {
                var h = B(f.uiSref, a.current.name), i = {
                    state: h.state,
                    href: null,
                    params: null
                }, j = D(e), k = g[1] || g[0];
                i.options = R(F(e, a), f.uiSrefOpts ? d.$eval(f.uiSrefOpts) : {});
                var l = function(c) {
                    c && (i.params = b.copy(c)), i.href = a.href(h.state, i.params, i.options), k && k.$$addStateInfo(h.state, i.params), 
                    null !== i.href && f.$set(j.attr, i.href);
                };
                h.paramExpr && (d.$watch(h.paramExpr, function(a) {
                    a !== i.params && l(a);
                }, !0), i.params = b.copy(d.$eval(h.paramExpr))), l(), j.clickable && e.bind("click", E(e, a, c, j, function() {
                    return i;
                }));
            }
        };
    }
    function H(a, b) {
        return {
            restrict: "A",
            require: [ "?^uiSrefActive", "?^uiSrefActiveEq" ],
            link: function(c, d, e, f) {
                function g(b) {
                    l.state = b[0], l.params = b[1], l.options = b[2], l.href = a.href(l.state, l.params, l.options), 
                    i && i.$$addStateInfo(l.state, l.params), l.href && e.$set(h.attr, l.href);
                }
                var h = D(d), i = f[1] || f[0], j = [ e.uiState, e.uiStateParams || null, e.uiStateOpts || null ], k = "[" + j.map(function(a) {
                    return a || "null";
                }).join(", ") + "]", l = {
                    state: null,
                    params: null,
                    options: null,
                    href: null
                };
                c.$watch(k, g, !0), g(c.$eval(k)), h.clickable && d.bind("click", E(d, a, b, h, function() {
                    return l;
                }));
            }
        };
    }
    function I(a, b, c) {
        return {
            restrict: "A",
            controller: [ "$scope", "$element", "$attrs", "$timeout", function(b, d, e, f) {
                function g(b, c, e) {
                    var f = a.get(b, C(d)), g = h(b, c);
                    p.push({
                        state: f || {
                            name: b
                        },
                        params: c,
                        hash: g
                    }), q[g] = e;
                }
                function h(a, c) {
                    if (!N(a)) throw new Error("state should be a string");
                    return O(c) ? a + T(c) : (c = b.$eval(c), O(c) ? a + T(c) : a);
                }
                function i() {
                    for (var a = 0; a < p.length; a++) l(p[a].state, p[a].params) ? j(d, q[p[a].hash]) : k(d, q[p[a].hash]), 
                    m(p[a].state, p[a].params) ? j(d, n) : k(d, n);
                }
                function j(a, b) {
                    f(function() {
                        a.addClass(b);
                    });
                }
                function k(a, b) {
                    a.removeClass(b);
                }
                function l(b, c) {
                    return a.includes(b.name, c);
                }
                function m(b, c) {
                    return a.is(b.name, c);
                }
                var n, o, p = [], q = {};
                n = c(e.uiSrefActiveEq || "", !1)(b);
                try {
                    o = b.$eval(e.uiSrefActive);
                } catch (r) {}
                o = o || c(e.uiSrefActive || "", !1)(b), O(o) && Q(o, function(c, d) {
                    if (N(c)) {
                        var e = B(c, a.current.name);
                        g(e.state, b.$eval(e.paramExpr), d);
                    }
                }), this.$$addStateInfo = function(a, b) {
                    O(o) && p.length > 0 || (g(a, b, o), i());
                }, b.$on("$stateChangeSuccess", i), i();
            } ]
        };
    }
    function J(a) {
        var b = function(b, c) {
            return a.is(b, c);
        };
        return b.$stateful = !0, b;
    }
    function K(a) {
        var b = function(b, c, d) {
            return a.includes(b, c, d);
        };
        return b.$stateful = !0, b;
    }
    var L = b.isDefined, M = b.isFunction, N = b.isString, O = b.isObject, P = b.isArray, Q = b.forEach, R = b.extend, S = b.copy, T = b.toJson;
    b.module("ui.router.util", [ "ng" ]), b.module("ui.router.router", [ "ui.router.util" ]), 
    b.module("ui.router.state", [ "ui.router.router", "ui.router.util" ]), b.module("ui.router", [ "ui.router.state" ]), 
    b.module("ui.router.compat", [ "ui.router" ]), p.$inject = [ "$q", "$injector" ], 
    b.module("ui.router.util").service("$resolve", p), q.$inject = [ "$http", "$templateCache", "$injector" ], 
    b.module("ui.router.util").service("$templateFactory", q);
    var U;
    r.prototype.concat = function(a, b) {
        var c = {
            caseInsensitive: U.caseInsensitive(),
            strict: U.strictMode(),
            squash: U.defaultSquashPolicy()
        };
        return new r(this.sourcePath + a + this.sourceSearch, R(c, b), this);
    }, r.prototype.toString = function() {
        return this.source;
    }, r.prototype.exec = function(a, b) {
        function c(a) {
            function b(a) {
                return a.split("").reverse().join("");
            }
            function c(a) {
                return a.replace(/\\-/g, "-");
            }
            var d = b(a).split(/-(?!\\)/), e = o(d, b);
            return o(e, c).reverse();
        }
        var d = this.regexp.exec(a);
        if (!d) return null;
        b = b || {};
        var e, f, g, h = this.parameters(), i = h.length, j = this.segments.length - 1, k = {};
        if (j !== d.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");
        var l, m;
        for (e = 0; j > e; e++) {
            for (g = h[e], l = this.params[g], m = d[e + 1], f = 0; f < l.replace.length; f++) l.replace[f].from === m && (m = l.replace[f].to);
            m && l.array === !0 && (m = c(m)), L(m) && (m = l.type.decode(m)), k[g] = l.value(m);
        }
        for (;i > e; e++) {
            for (g = h[e], k[g] = this.params[g].value(b[g]), l = this.params[g], m = b[g], 
            f = 0; f < l.replace.length; f++) l.replace[f].from === m && (m = l.replace[f].to);
            L(m) && (m = l.type.decode(m)), k[g] = l.value(m);
        }
        return k;
    }, r.prototype.parameters = function(a) {
        return L(a) ? this.params[a] || null : this.$$paramNames;
    }, r.prototype.validates = function(a) {
        return this.params.$$validates(a);
    }, r.prototype.format = function(a) {
        function b(a) {
            return encodeURIComponent(a).replace(/-/g, function(a) {
                return "%5C%" + a.charCodeAt(0).toString(16).toUpperCase();
            });
        }
        a = a || {};
        var c = this.segments, d = this.parameters(), e = this.params;
        if (!this.validates(a)) return null;
        var f, g = !1, h = c.length - 1, i = d.length, j = c[0];
        for (f = 0; i > f; f++) {
            var k = h > f, l = d[f], m = e[l], n = m.value(a[l]), p = m.isOptional && m.type.equals(m.value(), n), q = !!p && m.squash, r = m.type.encode(n);
            if (k) {
                var s = c[f + 1], t = f + 1 === h;
                if (q === !1) null != r && (j += P(r) ? o(r, b).join("-") : encodeURIComponent(r)), 
                j += s; else if (q === !0) {
                    var u = j.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
                    j += s.match(u)[1];
                } else N(q) && (j += q + s);
                t && m.squash === !0 && "/" === j.slice(-1) && (j = j.slice(0, -1));
            } else {
                if (null == r || p && q !== !1) continue;
                if (P(r) || (r = [ r ]), 0 === r.length) continue;
                r = o(r, encodeURIComponent).join("&" + l + "="), j += (g ? "&" : "?") + (l + "=" + r), 
                g = !0;
            }
        }
        return j;
    }, s.prototype.is = function(a, b) {
        return !0;
    }, s.prototype.encode = function(a, b) {
        return a;
    }, s.prototype.decode = function(a, b) {
        return a;
    }, s.prototype.equals = function(a, b) {
        return a == b;
    }, s.prototype.$subPattern = function() {
        var a = this.pattern.toString();
        return a.substr(1, a.length - 2);
    }, s.prototype.pattern = /.*/, s.prototype.toString = function() {
        return "{Type:" + this.name + "}";
    }, s.prototype.$normalize = function(a) {
        return this.is(a) ? a : this.decode(a);
    }, s.prototype.$asArray = function(a, b) {
        function d(a, b) {
            function d(a, b) {
                return function() {
                    return a[b].apply(a, arguments);
                };
            }
            function e(a) {
                return P(a) ? a : L(a) ? [ a ] : [];
            }
            function f(a) {
                switch (a.length) {
                  case 0:
                    return c;

                  case 1:
                    return "auto" === b ? a[0] : a;

                  default:
                    return a;
                }
            }
            function g(a) {
                return !a;
            }
            function h(a, b) {
                return function(c) {
                    if (P(c) && 0 === c.length) return c;
                    c = e(c);
                    var d = o(c, a);
                    return b === !0 ? 0 === n(d, g).length : f(d);
                };
            }
            function i(a) {
                return function(b, c) {
                    var d = e(b), f = e(c);
                    if (d.length !== f.length) return !1;
                    for (var g = 0; g < d.length; g++) if (!a(d[g], f[g])) return !1;
                    return !0;
                };
            }
            this.encode = h(d(a, "encode")), this.decode = h(d(a, "decode")), this.is = h(d(a, "is"), !0), 
            this.equals = i(d(a, "equals")), this.pattern = a.pattern, this.$normalize = h(d(a, "$normalize")), 
            this.name = a.name, this.$arrayMode = b;
        }
        if (!a) return this;
        if ("auto" === a && !b) throw new Error("'auto' array mode is for query parameters only");
        return new d(this, a);
    }, b.module("ui.router.util").provider("$urlMatcherFactory", t), b.module("ui.router.util").run([ "$urlMatcherFactory", function(a) {} ]), 
    u.$inject = [ "$locationProvider", "$urlMatcherFactoryProvider" ], b.module("ui.router.router").provider("$urlRouter", u), 
    v.$inject = [ "$urlRouterProvider", "$urlMatcherFactoryProvider" ], b.module("ui.router.state").factory("$stateParams", function() {
        return {};
    }).provider("$state", v), w.$inject = [], b.module("ui.router.state").provider("$view", w), 
    b.module("ui.router.state").provider("$uiViewScroll", x);
    var V = b.version.major, W = b.version.minor;
    y.$inject = [ "$state", "$injector", "$uiViewScroll", "$interpolate" ], z.$inject = [ "$compile", "$controller", "$state", "$interpolate" ], 
    b.module("ui.router.state").directive("uiView", y), b.module("ui.router.state").directive("uiView", z), 
    G.$inject = [ "$state", "$timeout" ], H.$inject = [ "$state", "$timeout" ], I.$inject = [ "$state", "$stateParams", "$interpolate" ], 
    b.module("ui.router.state").directive("uiSref", G).directive("uiSrefActive", I).directive("uiSrefActiveEq", I).directive("uiState", H), 
    J.$inject = [ "$state" ], K.$inject = [ "$state" ], b.module("ui.router.state").filter("isState", J).filter("includedByState", K);
}(window, window.angular), angular.module("ui.bootstrap", [ "ui.bootstrap.tpls", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.dateparser", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdown", "ui.bootstrap.stackedMap", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead" ]), 
angular.module("ui.bootstrap.tpls", [ "template/accordion/accordion-group.html", "template/accordion/accordion.html", "template/alert/alert.html", "template/carousel/carousel.html", "template/carousel/slide.html", "template/datepicker/datepicker.html", "template/datepicker/day.html", "template/datepicker/month.html", "template/datepicker/popup.html", "template/datepicker/year.html", "template/modal/backdrop.html", "template/modal/window.html", "template/pagination/pager.html", "template/pagination/pagination.html", "template/tooltip/tooltip-html-popup.html", "template/tooltip/tooltip-popup.html", "template/tooltip/tooltip-template-popup.html", "template/popover/popover-html.html", "template/popover/popover-template.html", "template/popover/popover.html", "template/progressbar/bar.html", "template/progressbar/progress.html", "template/progressbar/progressbar.html", "template/rating/rating.html", "template/tabs/tab.html", "template/tabs/tabset.html", "template/timepicker/timepicker.html", "template/typeahead/typeahead-match.html", "template/typeahead/typeahead-popup.html" ]), 
angular.module("ui.bootstrap.collapse", []).directive("uibCollapse", [ "$animate", "$injector", function(a, b) {
    var c = b.has("$animateCss") ? b.get("$animateCss") : null;
    return {
        link: function(b, d, e) {
            function f() {
                d.removeClass("collapse").addClass("collapsing").attr("aria-expanded", !0).attr("aria-hidden", !1), 
                c ? c(d, {
                    addClass: "in",
                    easing: "ease",
                    to: {
                        height: d[0].scrollHeight + "px"
                    }
                }).start()["finally"](g) : a.addClass(d, "in", {
                    to: {
                        height: d[0].scrollHeight + "px"
                    }
                }).then(g);
            }
            function g() {
                d.removeClass("collapsing").addClass("collapse").css({
                    height: "auto"
                });
            }
            function h() {
                return d.hasClass("collapse") || d.hasClass("in") ? (d.css({
                    height: d[0].scrollHeight + "px"
                }).removeClass("collapse").addClass("collapsing").attr("aria-expanded", !1).attr("aria-hidden", !0), 
                void (c ? c(d, {
                    removeClass: "in",
                    to: {
                        height: "0"
                    }
                }).start()["finally"](i) : a.removeClass(d, "in", {
                    to: {
                        height: "0"
                    }
                }).then(i))) : i();
            }
            function i() {
                d.css({
                    height: "0"
                }), d.removeClass("collapsing").addClass("collapse");
            }
            b.$watch(e.uibCollapse, function(a) {
                a ? h() : f();
            });
        }
    };
} ]), angular.module("ui.bootstrap.collapse").value("$collapseSuppressWarning", !1).directive("collapse", [ "$animate", "$injector", "$log", "$collapseSuppressWarning", function(a, b, c, d) {
    var e = b.has("$animateCss") ? b.get("$animateCss") : null;
    return {
        link: function(b, f, g) {
            function h() {
                f.removeClass("collapse").addClass("collapsing").attr("aria-expanded", !0).attr("aria-hidden", !1), 
                e ? e(f, {
                    easing: "ease",
                    to: {
                        height: f[0].scrollHeight + "px"
                    }
                }).start().done(i) : a.animate(f, {}, {
                    height: f[0].scrollHeight + "px"
                }).then(i);
            }
            function i() {
                f.removeClass("collapsing").addClass("collapse in").css({
                    height: "auto"
                });
            }
            function j() {
                return f.hasClass("collapse") || f.hasClass("in") ? (f.css({
                    height: f[0].scrollHeight + "px"
                }).removeClass("collapse in").addClass("collapsing").attr("aria-expanded", !1).attr("aria-hidden", !0), 
                void (e ? e(f, {
                    to: {
                        height: "0"
                    }
                }).start().done(k) : a.animate(f, {}, {
                    height: "0"
                }).then(k))) : k();
            }
            function k() {
                f.css({
                    height: "0"
                }), f.removeClass("collapsing").addClass("collapse");
            }
            d || c.warn("collapse is now deprecated. Use uib-collapse instead."), b.$watch(g.collapse, function(a) {
                a ? j() : h();
            });
        }
    };
} ]), angular.module("ui.bootstrap.accordion", [ "ui.bootstrap.collapse" ]).constant("uibAccordionConfig", {
    closeOthers: !0
}).controller("UibAccordionController", [ "$scope", "$attrs", "uibAccordionConfig", function(a, b, c) {
    this.groups = [], this.closeOthers = function(d) {
        var e = angular.isDefined(b.closeOthers) ? a.$eval(b.closeOthers) : c.closeOthers;
        e && angular.forEach(this.groups, function(a) {
            a !== d && (a.isOpen = !1);
        });
    }, this.addGroup = function(a) {
        var b = this;
        this.groups.push(a), a.$on("$destroy", function(c) {
            b.removeGroup(a);
        });
    }, this.removeGroup = function(a) {
        var b = this.groups.indexOf(a);
        b !== -1 && this.groups.splice(b, 1);
    };
} ]).directive("uibAccordion", function() {
    return {
        controller: "UibAccordionController",
        controllerAs: "accordion",
        transclude: !0,
        templateUrl: function(a, b) {
            return b.templateUrl || "template/accordion/accordion.html";
        }
    };
}).directive("uibAccordionGroup", function() {
    return {
        require: "^uibAccordion",
        transclude: !0,
        replace: !0,
        templateUrl: function(a, b) {
            return b.templateUrl || "template/accordion/accordion-group.html";
        },
        scope: {
            heading: "@",
            isOpen: "=?",
            isDisabled: "=?"
        },
        controller: function() {
            this.setHeading = function(a) {
                this.heading = a;
            };
        },
        link: function(a, b, c, d) {
            d.addGroup(a), a.openClass = c.openClass || "panel-open", a.panelClass = c.panelClass, 
            a.$watch("isOpen", function(c) {
                b.toggleClass(a.openClass, !!c), c && d.closeOthers(a);
            }), a.toggleOpen = function(b) {
                a.isDisabled || b && 32 !== b.which || (a.isOpen = !a.isOpen);
            };
        }
    };
}).directive("uibAccordionHeading", function() {
    return {
        transclude: !0,
        template: "",
        replace: !0,
        require: "^uibAccordionGroup",
        link: function(a, b, c, d, e) {
            d.setHeading(e(a, angular.noop));
        }
    };
}).directive("uibAccordionTransclude", function() {
    return {
        require: [ "?^uibAccordionGroup", "?^accordionGroup" ],
        link: function(a, b, c, d) {
            d = d[0] ? d[0] : d[1], a.$watch(function() {
                return d[c.uibAccordionTransclude];
            }, function(a) {
                a && (b.find("span").html(""), b.find("span").append(a));
            });
        }
    };
}), angular.module("ui.bootstrap.accordion").value("$accordionSuppressWarning", !1).controller("AccordionController", [ "$scope", "$attrs", "$controller", "$log", "$accordionSuppressWarning", function(a, b, c, d, e) {
    e || d.warn("AccordionController is now deprecated. Use UibAccordionController instead."), 
    angular.extend(this, c("UibAccordionController", {
        $scope: a,
        $attrs: b
    }));
} ]).directive("accordion", [ "$log", "$accordionSuppressWarning", function(a, b) {
    return {
        restrict: "EA",
        controller: "AccordionController",
        controllerAs: "accordion",
        transclude: !0,
        replace: !1,
        templateUrl: function(a, b) {
            return b.templateUrl || "template/accordion/accordion.html";
        },
        link: function() {
            b || a.warn("accordion is now deprecated. Use uib-accordion instead.");
        }
    };
} ]).directive("accordionGroup", [ "$log", "$accordionSuppressWarning", function(a, b) {
    return {
        require: "^accordion",
        restrict: "EA",
        transclude: !0,
        replace: !0,
        templateUrl: function(a, b) {
            return b.templateUrl || "template/accordion/accordion-group.html";
        },
        scope: {
            heading: "@",
            isOpen: "=?",
            isDisabled: "=?"
        },
        controller: function() {
            this.setHeading = function(a) {
                this.heading = a;
            };
        },
        link: function(c, d, e, f) {
            b || a.warn("accordion-group is now deprecated. Use uib-accordion-group instead."), 
            f.addGroup(c), c.openClass = e.openClass || "panel-open", c.panelClass = e.panelClass, 
            c.$watch("isOpen", function(a) {
                d.toggleClass(c.openClass, !!a), a && f.closeOthers(c);
            }), c.toggleOpen = function(a) {
                c.isDisabled || a && 32 !== a.which || (c.isOpen = !c.isOpen);
            };
        }
    };
} ]).directive("accordionHeading", [ "$log", "$accordionSuppressWarning", function(a, b) {
    return {
        restrict: "EA",
        transclude: !0,
        template: "",
        replace: !0,
        require: "^accordionGroup",
        link: function(c, d, e, f, g) {
            b || a.warn("accordion-heading is now deprecated. Use uib-accordion-heading instead."), 
            f.setHeading(g(c, angular.noop));
        }
    };
} ]).directive("accordionTransclude", [ "$log", "$accordionSuppressWarning", function(a, b) {
    return {
        require: "^accordionGroup",
        link: function(c, d, e, f) {
            b || a.warn("accordion-transclude is now deprecated. Use uib-accordion-transclude instead."), 
            c.$watch(function() {
                return f[e.accordionTransclude];
            }, function(a) {
                a && (d.find("span").html(""), d.find("span").append(a));
            });
        }
    };
} ]), angular.module("ui.bootstrap.alert", []).controller("UibAlertController", [ "$scope", "$attrs", "$interpolate", "$timeout", function(a, b, c, d) {
    a.closeable = !!b.close;
    var e = angular.isDefined(b.dismissOnTimeout) ? c(b.dismissOnTimeout)(a.$parent) : null;
    e && d(function() {
        a.close();
    }, parseInt(e, 10));
} ]).directive("uibAlert", function() {
    return {
        controller: "UibAlertController",
        controllerAs: "alert",
        templateUrl: function(a, b) {
            return b.templateUrl || "template/alert/alert.html";
        },
        transclude: !0,
        replace: !0,
        scope: {
            type: "@",
            close: "&"
        }
    };
}), angular.module("ui.bootstrap.alert").value("$alertSuppressWarning", !1).controller("AlertController", [ "$scope", "$attrs", "$controller", "$log", "$alertSuppressWarning", function(a, b, c, d, e) {
    e || d.warn("AlertController is now deprecated. Use UibAlertController instead."), 
    angular.extend(this, c("UibAlertController", {
        $scope: a,
        $attrs: b
    }));
} ]).directive("alert", [ "$log", "$alertSuppressWarning", function(a, b) {
    return {
        controller: "AlertController",
        controllerAs: "alert",
        templateUrl: function(a, b) {
            return b.templateUrl || "template/alert/alert.html";
        },
        transclude: !0,
        replace: !0,
        scope: {
            type: "@",
            close: "&"
        },
        link: function() {
            b || a.warn("alert is now deprecated. Use uib-alert instead.");
        }
    };
} ]), angular.module("ui.bootstrap.buttons", []).constant("uibButtonConfig", {
    activeClass: "active",
    toggleEvent: "click"
}).controller("UibButtonsController", [ "uibButtonConfig", function(a) {
    this.activeClass = a.activeClass || "active", this.toggleEvent = a.toggleEvent || "click";
} ]).directive("uibBtnRadio", function() {
    return {
        require: [ "uibBtnRadio", "ngModel" ],
        controller: "UibButtonsController",
        controllerAs: "buttons",
        link: function(a, b, c, d) {
            var e = d[0], f = d[1];
            b.find("input").css({
                display: "none"
            }), f.$render = function() {
                b.toggleClass(e.activeClass, angular.equals(f.$modelValue, a.$eval(c.uibBtnRadio)));
            }, b.on(e.toggleEvent, function() {
                if (!c.disabled) {
                    var d = b.hasClass(e.activeClass);
                    d && !angular.isDefined(c.uncheckable) || a.$apply(function() {
                        f.$setViewValue(d ? null : a.$eval(c.uibBtnRadio)), f.$render();
                    });
                }
            });
        }
    };
}).directive("uibBtnCheckbox", function() {
    return {
        require: [ "uibBtnCheckbox", "ngModel" ],
        controller: "UibButtonsController",
        controllerAs: "button",
        link: function(a, b, c, d) {
            function e() {
                return g(c.btnCheckboxTrue, !0);
            }
            function f() {
                return g(c.btnCheckboxFalse, !1);
            }
            function g(b, c) {
                return angular.isDefined(b) ? a.$eval(b) : c;
            }
            var h = d[0], i = d[1];
            b.find("input").css({
                display: "none"
            }), i.$render = function() {
                b.toggleClass(h.activeClass, angular.equals(i.$modelValue, e()));
            }, b.on(h.toggleEvent, function() {
                c.disabled || a.$apply(function() {
                    i.$setViewValue(b.hasClass(h.activeClass) ? f() : e()), i.$render();
                });
            });
        }
    };
}), angular.module("ui.bootstrap.buttons").value("$buttonsSuppressWarning", !1).controller("ButtonsController", [ "$controller", "$log", "$buttonsSuppressWarning", function(a, b, c) {
    c || b.warn("ButtonsController is now deprecated. Use UibButtonsController instead."), 
    angular.extend(this, a("UibButtonsController"));
} ]).directive("btnRadio", [ "$log", "$buttonsSuppressWarning", function(a, b) {
    return {
        require: [ "btnRadio", "ngModel" ],
        controller: "ButtonsController",
        controllerAs: "buttons",
        link: function(c, d, e, f) {
            b || a.warn("btn-radio is now deprecated. Use uib-btn-radio instead.");
            var g = f[0], h = f[1];
            d.find("input").css({
                display: "none"
            }), h.$render = function() {
                d.toggleClass(g.activeClass, angular.equals(h.$modelValue, c.$eval(e.btnRadio)));
            }, d.bind(g.toggleEvent, function() {
                if (!e.disabled) {
                    var a = d.hasClass(g.activeClass);
                    a && !angular.isDefined(e.uncheckable) || c.$apply(function() {
                        h.$setViewValue(a ? null : c.$eval(e.btnRadio)), h.$render();
                    });
                }
            });
        }
    };
} ]).directive("btnCheckbox", [ "$document", "$log", "$buttonsSuppressWarning", function(a, b, c) {
    return {
        require: [ "btnCheckbox", "ngModel" ],
        controller: "ButtonsController",
        controllerAs: "button",
        link: function(d, e, f, g) {
            function h() {
                return j(f.btnCheckboxTrue, !0);
            }
            function i() {
                return j(f.btnCheckboxFalse, !1);
            }
            function j(a, b) {
                var c = d.$eval(a);
                return angular.isDefined(c) ? c : b;
            }
            c || b.warn("btn-checkbox is now deprecated. Use uib-btn-checkbox instead.");
            var k = g[0], l = g[1];
            e.find("input").css({
                display: "none"
            }), l.$render = function() {
                e.toggleClass(k.activeClass, angular.equals(l.$modelValue, h()));
            }, e.bind(k.toggleEvent, function() {
                f.disabled || d.$apply(function() {
                    l.$setViewValue(e.hasClass(k.activeClass) ? i() : h()), l.$render();
                });
            }), e.on("keypress", function(b) {
                f.disabled || 32 !== b.which || a[0].activeElement !== e[0] || d.$apply(function() {
                    l.$setViewValue(e.hasClass(k.activeClass) ? i() : h()), l.$render();
                });
            });
        }
    };
} ]), angular.module("ui.bootstrap.carousel", []).controller("UibCarouselController", [ "$scope", "$element", "$interval", "$animate", function(a, b, c, d) {
    function e(b, c, e) {
        s || (angular.extend(b, {
            direction: e,
            active: !0
        }), angular.extend(m.currentSlide || {}, {
            direction: e,
            active: !1
        }), d.enabled() && !a.noTransition && !a.$currentTransition && b.$element && m.slides.length > 1 && (b.$element.data(q, b.direction), 
        m.currentSlide && m.currentSlide.$element && m.currentSlide.$element.data(q, b.direction), 
        a.$currentTransition = !0, o ? d.on("addClass", b.$element, function(b, c) {
            "close" === c && (a.$currentTransition = null, d.off("addClass", b));
        }) : b.$element.one("$animate:close", function() {
            a.$currentTransition = null;
        })), m.currentSlide = b, r = c, g());
    }
    function f(a) {
        if (angular.isUndefined(n[a].index)) return n[a];
        var b;
        n.length;
        for (b = 0; b < n.length; ++b) if (n[b].index == a) return n[b];
    }
    function g() {
        h();
        var b = +a.interval;
        !isNaN(b) && b > 0 && (k = c(i, b));
    }
    function h() {
        k && (c.cancel(k), k = null);
    }
    function i() {
        var b = +a.interval;
        l && !isNaN(b) && b > 0 && n.length ? a.next() : a.pause();
    }
    function j(b) {
        b.length || (a.$currentTransition = null);
    }
    var k, l, m = this, n = m.slides = a.slides = [], o = angular.version.minor >= 4, p = "uib-noTransition", q = "uib-slideDirection", r = -1;
    m.currentSlide = null;
    var s = !1;
    m.select = a.select = function(b, c) {
        var d = a.indexOfSlide(b);
        void 0 === c && (c = d > m.getCurrentIndex() ? "next" : "prev"), b && b !== m.currentSlide && !a.$currentTransition && e(b, d, c);
    }, a.$on("$destroy", function() {
        s = !0;
    }), m.getCurrentIndex = function() {
        return m.currentSlide && angular.isDefined(m.currentSlide.index) ? +m.currentSlide.index : r;
    }, a.indexOfSlide = function(a) {
        return angular.isDefined(a.index) ? +a.index : n.indexOf(a);
    }, a.next = function() {
        var b = (m.getCurrentIndex() + 1) % n.length;
        return 0 === b && a.noWrap() ? void a.pause() : m.select(f(b), "next");
    }, a.prev = function() {
        var b = m.getCurrentIndex() - 1 < 0 ? n.length - 1 : m.getCurrentIndex() - 1;
        return a.noWrap() && b === n.length - 1 ? void a.pause() : m.select(f(b), "prev");
    }, a.isActive = function(a) {
        return m.currentSlide === a;
    }, a.$watch("interval", g), a.$watchCollection("slides", j), a.$on("$destroy", h), 
    a.play = function() {
        l || (l = !0, g());
    }, a.pause = function() {
        a.noPause || (l = !1, h());
    }, m.addSlide = function(b, c) {
        b.$element = c, n.push(b), 1 === n.length || b.active ? (m.select(n[n.length - 1]), 
        1 === n.length && a.play()) : b.active = !1;
    }, m.removeSlide = function(a) {
        angular.isDefined(a.index) && n.sort(function(a, b) {
            return +a.index > +b.index;
        });
        var b = n.indexOf(a);
        n.splice(b, 1), n.length > 0 && a.active ? b >= n.length ? m.select(n[b - 1]) : m.select(n[b]) : r > b && r--, 
        0 === n.length && (m.currentSlide = null);
    }, a.$watch("noTransition", function(a) {
        b.data(p, a);
    });
} ]).directive("uibCarousel", [ function() {
    return {
        transclude: !0,
        replace: !0,
        controller: "UibCarouselController",
        controllerAs: "carousel",
        require: "carousel",
        templateUrl: function(a, b) {
            return b.templateUrl || "template/carousel/carousel.html";
        },
        scope: {
            interval: "=",
            noTransition: "=",
            noPause: "=",
            noWrap: "&"
        }
    };
} ]).directive("uibSlide", function() {
    return {
        require: "^uibCarousel",
        restrict: "EA",
        transclude: !0,
        replace: !0,
        templateUrl: function(a, b) {
            return b.templateUrl || "template/carousel/slide.html";
        },
        scope: {
            active: "=?",
            actual: "=?",
            index: "=?"
        },
        link: function(a, b, c, d) {
            d.addSlide(a, b), a.$on("$destroy", function() {
                d.removeSlide(a);
            }), a.$watch("active", function(b) {
                b && d.select(a);
            });
        }
    };
}).animation(".item", [ "$injector", "$animate", function(a, b) {
    function c(a, b, c) {
        a.removeClass(b), c && c();
    }
    var d = "uib-noTransition", e = "uib-slideDirection", f = null;
    return a.has("$animateCss") && (f = a.get("$animateCss")), {
        beforeAddClass: function(a, g, h) {
            if ("active" == g && a.parent() && a.parent().parent() && !a.parent().parent().data(d)) {
                var i = !1, j = a.data(e), k = "next" == j ? "left" : "right", l = c.bind(this, a, k + " " + j, h);
                return a.addClass(j), f ? f(a, {
                    addClass: k
                }).start().done(l) : b.addClass(a, k).then(function() {
                    i || l(), h();
                }), function() {
                    i = !0;
                };
            }
            h();
        },
        beforeRemoveClass: function(a, g, h) {
            if ("active" === g && a.parent() && a.parent().parent() && !a.parent().parent().data(d)) {
                var i = !1, j = a.data(e), k = "next" == j ? "left" : "right", l = c.bind(this, a, k, h);
                return f ? f(a, {
                    addClass: k
                }).start().done(l) : b.addClass(a, k).then(function() {
                    i || l(), h();
                }), function() {
                    i = !0;
                };
            }
            h();
        }
    };
} ]), angular.module("ui.bootstrap.carousel").value("$carouselSuppressWarning", !1).controller("CarouselController", [ "$scope", "$element", "$controller", "$log", "$carouselSuppressWarning", function(a, b, c, d, e) {
    e || d.warn("CarouselController is now deprecated. Use UibCarouselController instead."), 
    angular.extend(this, c("UibCarouselController", {
        $scope: a,
        $element: b
    }));
} ]).directive("carousel", [ "$log", "$carouselSuppressWarning", function(a, b) {
    return {
        transclude: !0,
        replace: !0,
        controller: "CarouselController",
        controllerAs: "carousel",
        require: "carousel",
        templateUrl: function(a, b) {
            return b.templateUrl || "template/carousel/carousel.html";
        },
        scope: {
            interval: "=",
            noTransition: "=",
            noPause: "=",
            noWrap: "&"
        },
        link: function() {
            b || a.warn("carousel is now deprecated. Use uib-carousel instead.");
        }
    };
} ]).directive("slide", [ "$log", "$carouselSuppressWarning", function(a, b) {
    return {
        require: "^carousel",
        transclude: !0,
        replace: !0,
        templateUrl: function(a, b) {
            return b.templateUrl || "template/carousel/slide.html";
        },
        scope: {
            active: "=?",
            actual: "=?",
            index: "=?"
        },
        link: function(c, d, e, f) {
            b || a.warn("slide is now deprecated. Use uib-slide instead."), f.addSlide(c, d), 
            c.$on("$destroy", function() {
                f.removeSlide(c);
            }), c.$watch("active", function(a) {
                a && f.select(c);
            });
        }
    };
} ]), angular.module("ui.bootstrap.dateparser", []).service("uibDateParser", [ "$log", "$locale", "orderByFilter", function(a, b, c) {
    function d(a) {
        var b = [], d = a.split("");
        return angular.forEach(g, function(c, e) {
            var f = a.indexOf(e);
            if (f > -1) {
                a = a.split(""), d[f] = "(" + c.regex + ")", a[f] = "$";
                for (var g = f + 1, h = f + e.length; g < h; g++) d[g] = "", a[g] = "$";
                a = a.join(""), b.push({
                    index: f,
                    apply: c.apply
                });
            }
        }), {
            regex: new RegExp("^" + d.join("") + "$"),
            map: c(b, "index")
        };
    }
    function e(a, b, c) {
        return !(c < 1) && (1 === b && c > 28 ? 29 === c && (a % 4 === 0 && a % 100 !== 0 || a % 400 === 0) : 3 !== b && 5 !== b && 8 !== b && 10 !== b || c < 31);
    }
    var f, g, h = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
    this.init = function() {
        f = b.id, this.parsers = {}, g = {
            yyyy: {
                regex: "\\d{4}",
                apply: function(a) {
                    this.year = +a;
                }
            },
            yy: {
                regex: "\\d{2}",
                apply: function(a) {
                    this.year = +a + 2e3;
                }
            },
            y: {
                regex: "\\d{1,4}",
                apply: function(a) {
                    this.year = +a;
                }
            },
            MMMM: {
                regex: b.DATETIME_FORMATS.MONTH.join("|"),
                apply: function(a) {
                    this.month = b.DATETIME_FORMATS.MONTH.indexOf(a);
                }
            },
            MMM: {
                regex: b.DATETIME_FORMATS.SHORTMONTH.join("|"),
                apply: function(a) {
                    this.month = b.DATETIME_FORMATS.SHORTMONTH.indexOf(a);
                }
            },
            MM: {
                regex: "0[1-9]|1[0-2]",
                apply: function(a) {
                    this.month = a - 1;
                }
            },
            M: {
                regex: "[1-9]|1[0-2]",
                apply: function(a) {
                    this.month = a - 1;
                }
            },
            dd: {
                regex: "[0-2][0-9]{1}|3[0-1]{1}",
                apply: function(a) {
                    this.date = +a;
                }
            },
            d: {
                regex: "[1-2]?[0-9]{1}|3[0-1]{1}",
                apply: function(a) {
                    this.date = +a;
                }
            },
            EEEE: {
                regex: b.DATETIME_FORMATS.DAY.join("|")
            },
            EEE: {
                regex: b.DATETIME_FORMATS.SHORTDAY.join("|")
            },
            HH: {
                regex: "(?:0|1)[0-9]|2[0-3]",
                apply: function(a) {
                    this.hours = +a;
                }
            },
            hh: {
                regex: "0[0-9]|1[0-2]",
                apply: function(a) {
                    this.hours = +a;
                }
            },
            H: {
                regex: "1?[0-9]|2[0-3]",
                apply: function(a) {
                    this.hours = +a;
                }
            },
            h: {
                regex: "[0-9]|1[0-2]",
                apply: function(a) {
                    this.hours = +a;
                }
            },
            mm: {
                regex: "[0-5][0-9]",
                apply: function(a) {
                    this.minutes = +a;
                }
            },
            m: {
                regex: "[0-9]|[1-5][0-9]",
                apply: function(a) {
                    this.minutes = +a;
                }
            },
            sss: {
                regex: "[0-9][0-9][0-9]",
                apply: function(a) {
                    this.milliseconds = +a;
                }
            },
            ss: {
                regex: "[0-5][0-9]",
                apply: function(a) {
                    this.seconds = +a;
                }
            },
            s: {
                regex: "[0-9]|[1-5][0-9]",
                apply: function(a) {
                    this.seconds = +a;
                }
            },
            a: {
                regex: b.DATETIME_FORMATS.AMPMS.join("|"),
                apply: function(a) {
                    12 === this.hours && (this.hours = 0), "PM" === a && (this.hours += 12);
                }
            }
        };
    }, this.init(), this.parse = function(c, g, i) {
        if (!angular.isString(c) || !g) return c;
        g = b.DATETIME_FORMATS[g] || g, g = g.replace(h, "\\$&"), b.id !== f && this.init(), 
        this.parsers[g] || (this.parsers[g] = d(g));
        var j = this.parsers[g], k = j.regex, l = j.map, m = c.match(k);
        if (m && m.length) {
            var n, o;
            angular.isDate(i) && !isNaN(i.getTime()) ? n = {
                year: i.getFullYear(),
                month: i.getMonth(),
                date: i.getDate(),
                hours: i.getHours(),
                minutes: i.getMinutes(),
                seconds: i.getSeconds(),
                milliseconds: i.getMilliseconds()
            } : (i && a.warn("dateparser:", "baseDate is not a valid date"), n = {
                year: 1900,
                month: 0,
                date: 1,
                hours: 0,
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            });
            for (var p = 1, q = m.length; p < q; p++) {
                var r = l[p - 1];
                r.apply && r.apply.call(n, m[p]);
            }
            return e(n.year, n.month, n.date) && (angular.isDate(i) && !isNaN(i.getTime()) ? (o = new Date(i), 
            o.setFullYear(n.year, n.month, n.date, n.hours, n.minutes, n.seconds, n.milliseconds || 0)) : o = new Date(n.year, n.month, n.date, n.hours, n.minutes, n.seconds, n.milliseconds || 0)), 
            o;
        }
    };
} ]), angular.module("ui.bootstrap.dateparser").value("$dateParserSuppressWarning", !1).service("dateParser", [ "$log", "$dateParserSuppressWarning", "uibDateParser", function(a, b, c) {
    b || a.warn("dateParser is now deprecated. Use uibDateParser instead."), angular.extend(this, c);
} ]), angular.module("ui.bootstrap.position", []).factory("$uibPosition", [ "$document", "$window", function(a, b) {
    function c(a, c) {
        return a.currentStyle ? a.currentStyle[c] : b.getComputedStyle ? b.getComputedStyle(a)[c] : a.style[c];
    }
    function d(a) {
        return "static" === (c(a, "position") || "static");
    }
    var e = function(b) {
        for (var c = a[0], e = b.offsetParent || c; e && e !== c && d(e); ) e = e.offsetParent;
        return e || c;
    };
    return {
        position: function(b) {
            var c = this.offset(b), d = {
                top: 0,
                left: 0
            }, f = e(b[0]);
            f != a[0] && (d = this.offset(angular.element(f)), d.top += f.clientTop - f.scrollTop, 
            d.left += f.clientLeft - f.scrollLeft);
            var g = b[0].getBoundingClientRect();
            return {
                width: g.width || b.prop("offsetWidth"),
                height: g.height || b.prop("offsetHeight"),
                top: c.top - d.top,
                left: c.left - d.left
            };
        },
        offset: function(c) {
            var d = c[0].getBoundingClientRect();
            return {
                width: d.width || c.prop("offsetWidth"),
                height: d.height || c.prop("offsetHeight"),
                top: d.top + (b.pageYOffset || a[0].documentElement.scrollTop),
                left: d.left + (b.pageXOffset || a[0].documentElement.scrollLeft)
            };
        },
        positionElements: function(a, b, c, d) {
            var e, f, g, h, i = c.split("-"), j = i[0], k = i[1] || "center";
            e = d ? this.offset(a) : this.position(a), f = b.prop("offsetWidth"), g = b.prop("offsetHeight");
            var l = {
                center: function() {
                    return e.left + e.width / 2 - f / 2;
                },
                left: function() {
                    return e.left;
                },
                right: function() {
                    return e.left + e.width;
                }
            }, m = {
                center: function() {
                    return e.top + e.height / 2 - g / 2;
                },
                top: function() {
                    return e.top;
                },
                bottom: function() {
                    return e.top + e.height;
                }
            };
            switch (j) {
              case "right":
                h = {
                    top: m[k](),
                    left: l[j]()
                };
                break;

              case "left":
                h = {
                    top: m[k](),
                    left: e.left - f
                };
                break;

              case "bottom":
                h = {
                    top: m[j](),
                    left: l[k]()
                };
                break;

              default:
                h = {
                    top: e.top - g,
                    left: l[k]()
                };
            }
            return h;
        }
    };
} ]), angular.module("ui.bootstrap.position").value("$positionSuppressWarning", !1).service("$position", [ "$log", "$positionSuppressWarning", "$uibPosition", function(a, b, c) {
    b || a.warn("$position is now deprecated. Use $uibPosition instead."), angular.extend(this, c);
} ]), angular.module("ui.bootstrap.datepicker", [ "ui.bootstrap.dateparser", "ui.bootstrap.position" ]).value("$datepickerSuppressError", !1).constant("uibDatepickerConfig", {
    formatDay: "dd",
    formatMonth: "MMMM",
    formatYear: "yyyy",
    formatDayHeader: "EEE",
    formatDayTitle: "MMMM yyyy",
    formatMonthTitle: "yyyy",
    datepickerMode: "day",
    minMode: "day",
    maxMode: "year",
    showWeeks: !0,
    startingDay: 0,
    yearRange: 20,
    minDate: null,
    maxDate: null,
    shortcutPropagation: !1
}).controller("UibDatepickerController", [ "$scope", "$attrs", "$parse", "$interpolate", "$log", "dateFilter", "uibDatepickerConfig", "$datepickerSuppressError", function(a, b, c, d, e, f, g, h) {
    var i = this, j = {
        $setViewValue: angular.noop
    };
    this.modes = [ "day", "month", "year" ], angular.forEach([ "formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle", "showWeeks", "startingDay", "yearRange", "shortcutPropagation" ], function(c, e) {
        i[c] = angular.isDefined(b[c]) ? e < 6 ? d(b[c])(a.$parent) : a.$parent.$eval(b[c]) : g[c];
    }), angular.forEach([ "minDate", "maxDate" ], function(d) {
        b[d] ? a.$parent.$watch(c(b[d]), function(a) {
            i[d] = a ? new Date(a) : null, i.refreshView();
        }) : i[d] = g[d] ? new Date(g[d]) : null;
    }), angular.forEach([ "minMode", "maxMode" ], function(d) {
        b[d] ? a.$parent.$watch(c(b[d]), function(c) {
            i[d] = angular.isDefined(c) ? c : b[d], a[d] = i[d], ("minMode" == d && i.modes.indexOf(a.datepickerMode) < i.modes.indexOf(i[d]) || "maxMode" == d && i.modes.indexOf(a.datepickerMode) > i.modes.indexOf(i[d])) && (a.datepickerMode = i[d]);
        }) : (i[d] = g[d] || null, a[d] = i[d]);
    }), a.datepickerMode = a.datepickerMode || g.datepickerMode, a.uniqueId = "datepicker-" + a.$id + "-" + Math.floor(1e4 * Math.random()), 
    angular.isDefined(b.initDate) ? (this.activeDate = a.$parent.$eval(b.initDate) || new Date(), 
    a.$parent.$watch(b.initDate, function(a) {
        a && (j.$isEmpty(j.$modelValue) || j.$invalid) && (i.activeDate = a, i.refreshView());
    })) : this.activeDate = new Date(), a.isActive = function(b) {
        return 0 === i.compare(b.date, i.activeDate) && (a.activeDateId = b.uid, !0);
    }, this.init = function(a) {
        j = a, j.$render = function() {
            i.render();
        };
    }, this.render = function() {
        if (j.$viewValue) {
            var a = new Date(j.$viewValue), b = !isNaN(a);
            b ? this.activeDate = a : h || e.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
        }
        this.refreshView();
    }, this.refreshView = function() {
        if (this.element) {
            this._refreshView();
            var a = j.$viewValue ? new Date(j.$viewValue) : null;
            j.$setValidity("dateDisabled", !a || this.element && !this.isDisabled(a));
        }
    }, this.createDateObject = function(a, b) {
        var c = j.$viewValue ? new Date(j.$viewValue) : null;
        return {
            date: a,
            label: f(a, b),
            selected: c && 0 === this.compare(a, c),
            disabled: this.isDisabled(a),
            current: 0 === this.compare(a, new Date()),
            customClass: this.customClass(a)
        };
    }, this.isDisabled = function(c) {
        return this.minDate && this.compare(c, this.minDate) < 0 || this.maxDate && this.compare(c, this.maxDate) > 0 || b.dateDisabled && a.dateDisabled({
            date: c,
            mode: a.datepickerMode
        });
    }, this.customClass = function(b) {
        return a.customClass({
            date: b,
            mode: a.datepickerMode
        });
    }, this.split = function(a, b) {
        for (var c = []; a.length > 0; ) c.push(a.splice(0, b));
        return c;
    }, a.select = function(b) {
        if (a.datepickerMode === i.minMode) {
            var c = j.$viewValue ? new Date(j.$viewValue) : new Date(0, 0, 0, 0, 0, 0, 0);
            c.setFullYear(b.getFullYear(), b.getMonth(), b.getDate()), j.$setViewValue(c), j.$render();
        } else i.activeDate = b, a.datepickerMode = i.modes[i.modes.indexOf(a.datepickerMode) - 1];
    }, a.move = function(a) {
        var b = i.activeDate.getFullYear() + a * (i.step.years || 0), c = i.activeDate.getMonth() + a * (i.step.months || 0);
        i.activeDate.setFullYear(b, c, 1), i.refreshView();
    }, a.toggleMode = function(b) {
        b = b || 1, a.datepickerMode === i.maxMode && 1 === b || a.datepickerMode === i.minMode && b === -1 || (a.datepickerMode = i.modes[i.modes.indexOf(a.datepickerMode) + b]);
    }, a.keys = {
        13: "enter",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };
    var k = function() {
        i.element[0].focus();
    };
    a.$on("uib:datepicker.focus", k), a.keydown = function(b) {
        var c = a.keys[b.which];
        if (c && !b.shiftKey && !b.altKey) if (b.preventDefault(), i.shortcutPropagation || b.stopPropagation(), 
        "enter" === c || "space" === c) {
            if (i.isDisabled(i.activeDate)) return;
            a.select(i.activeDate);
        } else !b.ctrlKey || "up" !== c && "down" !== c ? (i.handleKeyDown(c, b), i.refreshView()) : a.toggleMode("up" === c ? 1 : -1);
    };
} ]).controller("UibDaypickerController", [ "$scope", "$element", "dateFilter", function(a, b, c) {
    function d(a, b) {
        return 1 !== b || a % 4 !== 0 || a % 100 === 0 && a % 400 !== 0 ? f[b] : 29;
    }
    function e(a) {
        var b = new Date(a);
        b.setDate(b.getDate() + 4 - (b.getDay() || 7));
        var c = b.getTime();
        return b.setMonth(0), b.setDate(1), Math.floor(Math.round((c - b) / 864e5) / 7) + 1;
    }
    var f = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    this.step = {
        months: 1
    }, this.element = b, this.init = function(b) {
        angular.extend(b, this), a.showWeeks = b.showWeeks, b.refreshView();
    }, this.getDates = function(a, b) {
        for (var c, d = new Array(b), e = new Date(a), f = 0; f < b; ) c = new Date(e), 
        d[f++] = c, e.setDate(e.getDate() + 1);
        return d;
    }, this._refreshView = function() {
        var b = this.activeDate.getFullYear(), d = this.activeDate.getMonth(), f = new Date(this.activeDate);
        f.setFullYear(b, d, 1);
        var g = this.startingDay - f.getDay(), h = g > 0 ? 7 - g : -g, i = new Date(f);
        h > 0 && i.setDate(-h + 1);
        for (var j = this.getDates(i, 42), k = 0; k < 42; k++) j[k] = angular.extend(this.createDateObject(j[k], this.formatDay), {
            secondary: j[k].getMonth() !== d,
            uid: a.uniqueId + "-" + k
        });
        a.labels = new Array(7);
        for (var l = 0; l < 7; l++) a.labels[l] = {
            abbr: c(j[l].date, this.formatDayHeader),
            full: c(j[l].date, "EEEE")
        };
        if (a.title = c(this.activeDate, this.formatDayTitle), a.rows = this.split(j, 7), 
        a.showWeeks) {
            a.weekNumbers = [];
            for (var m = (11 - this.startingDay) % 7, n = a.rows.length, o = 0; o < n; o++) a.weekNumbers.push(e(a.rows[o][m].date));
        }
    }, this.compare = function(a, b) {
        return new Date(a.getFullYear(), a.getMonth(), a.getDate()) - new Date(b.getFullYear(), b.getMonth(), b.getDate());
    }, this.handleKeyDown = function(a, b) {
        var c = this.activeDate.getDate();
        if ("left" === a) c -= 1; else if ("up" === a) c -= 7; else if ("right" === a) c += 1; else if ("down" === a) c += 7; else if ("pageup" === a || "pagedown" === a) {
            var e = this.activeDate.getMonth() + ("pageup" === a ? -1 : 1);
            this.activeDate.setMonth(e, 1), c = Math.min(d(this.activeDate.getFullYear(), this.activeDate.getMonth()), c);
        } else "home" === a ? c = 1 : "end" === a && (c = d(this.activeDate.getFullYear(), this.activeDate.getMonth()));
        this.activeDate.setDate(c);
    };
} ]).controller("UibMonthpickerController", [ "$scope", "$element", "dateFilter", function(a, b, c) {
    this.step = {
        years: 1
    }, this.element = b, this.init = function(a) {
        angular.extend(a, this), a.refreshView();
    }, this._refreshView = function() {
        for (var b, d = new Array(12), e = this.activeDate.getFullYear(), f = 0; f < 12; f++) b = new Date(this.activeDate), 
        b.setFullYear(e, f, 1), d[f] = angular.extend(this.createDateObject(b, this.formatMonth), {
            uid: a.uniqueId + "-" + f
        });
        a.title = c(this.activeDate, this.formatMonthTitle), a.rows = this.split(d, 3);
    }, this.compare = function(a, b) {
        return new Date(a.getFullYear(), a.getMonth()) - new Date(b.getFullYear(), b.getMonth());
    }, this.handleKeyDown = function(a, b) {
        var c = this.activeDate.getMonth();
        if ("left" === a) c -= 1; else if ("up" === a) c -= 3; else if ("right" === a) c += 1; else if ("down" === a) c += 3; else if ("pageup" === a || "pagedown" === a) {
            var d = this.activeDate.getFullYear() + ("pageup" === a ? -1 : 1);
            this.activeDate.setFullYear(d);
        } else "home" === a ? c = 0 : "end" === a && (c = 11);
        this.activeDate.setMonth(c);
    };
} ]).controller("UibYearpickerController", [ "$scope", "$element", "dateFilter", function(a, b, c) {
    function d(a) {
        return parseInt((a - 1) / e, 10) * e + 1;
    }
    var e;
    this.element = b, this.yearpickerInit = function() {
        e = this.yearRange, this.step = {
            years: e
        };
    }, this._refreshView = function() {
        for (var b, c = new Array(e), f = 0, g = d(this.activeDate.getFullYear()); f < e; f++) b = new Date(this.activeDate), 
        b.setFullYear(g + f, 0, 1), c[f] = angular.extend(this.createDateObject(b, this.formatYear), {
            uid: a.uniqueId + "-" + f
        });
        a.title = [ c[0].label, c[e - 1].label ].join(" - "), a.rows = this.split(c, 5);
    }, this.compare = function(a, b) {
        return a.getFullYear() - b.getFullYear();
    }, this.handleKeyDown = function(a, b) {
        var c = this.activeDate.getFullYear();
        "left" === a ? c -= 1 : "up" === a ? c -= 5 : "right" === a ? c += 1 : "down" === a ? c += 5 : "pageup" === a || "pagedown" === a ? c += ("pageup" === a ? -1 : 1) * this.step.years : "home" === a ? c = d(this.activeDate.getFullYear()) : "end" === a && (c = d(this.activeDate.getFullYear()) + e - 1), 
        this.activeDate.setFullYear(c);
    };
} ]).directive("uibDatepicker", function() {
    return {
        replace: !0,
        templateUrl: function(a, b) {
            return b.templateUrl || "template/datepicker/datepicker.html";
        },
        scope: {
            datepickerMode: "=?",
            dateDisabled: "&",
            customClass: "&",
            shortcutPropagation: "&?"
        },
        require: [ "uibDatepicker", "^ngModel" ],
        controller: "UibDatepickerController",
        controllerAs: "datepicker",
        link: function(a, b, c, d) {
            var e = d[0], f = d[1];
            e.init(f);
        }
    };
}).directive("uibDaypicker", function() {
    return {
        replace: !0,
        templateUrl: function(a, b) {
            return b.templateUrl || "template/datepicker/day.html";
        },
        require: [ "^?uibDatepicker", "uibDaypicker", "^?datepicker" ],
        controller: "UibDaypickerController",
        link: function(a, b, c, d) {
            var e = d[0] || d[2], f = d[1];
            f.init(e);
        }
    };
}).directive("uibMonthpicker", function() {
    return {
        replace: !0,
        templateUrl: function(a, b) {
            return b.templateUrl || "template/datepicker/month.html";
        },
        require: [ "^?uibDatepicker", "uibMonthpicker", "^?datepicker" ],
        controller: "UibMonthpickerController",
        link: function(a, b, c, d) {
            var e = d[0] || d[2], f = d[1];
            f.init(e);
        }
    };
}).directive("uibYearpicker", function() {
    return {
        replace: !0,
        templateUrl: function(a, b) {
            return b.templateUrl || "template/datepicker/year.html";
        },
        require: [ "^?uibDatepicker", "uibYearpicker", "^?datepicker" ],
        controller: "UibYearpickerController",
        link: function(a, b, c, d) {
            var e = d[0] || d[2];
            angular.extend(e, d[1]), e.yearpickerInit(), e.refreshView();
        }
    };
}).constant("uibDatepickerPopupConfig", {
    datepickerPopup: "yyyy-MM-dd",
    datepickerPopupTemplateUrl: "template/datepicker/popup.html",
    datepickerTemplateUrl: "template/datepicker/datepicker.html",
    html5Types: {
        date: "yyyy-MM-dd",
        "datetime-local": "yyyy-MM-ddTHH:mm:ss.sss",
        month: "yyyy-MM"
    },
    currentText: "Today",
    clearText: "Clear",
    closeText: "Done",
    closeOnDateSelection: !0,
    appendToBody: !1,
    showButtonBar: !0,
    onOpenFocus: !0
}).controller("UibDatepickerPopupController", [ "$scope", "$element", "$attrs", "$compile", "$parse", "$document", "$rootScope", "$uibPosition", "dateFilter", "uibDateParser", "uibDatepickerPopupConfig", "$timeout", function(a, b, c, d, e, f, g, h, i, j, k, l) {
    function m(a) {
        return a.replace(/([A-Z])/g, function(a) {
            return "-" + a.toLowerCase();
        });
    }
    function n(b) {
        angular.isNumber(b) && (b = new Date(b));
        {
            if (!b) return null;
            if (angular.isDate(b) && !isNaN(b)) return b;
            if (angular.isString(b)) {
                var c = j.parse(b, r, a.date);
                return isNaN(c) ? void 0 : c;
            }
        }
    }
    function o(a, b) {
        var d = a || b;
        if (!c.ngRequired && !d) return !0;
        if (angular.isNumber(d) && (d = new Date(d)), d) {
            if (angular.isDate(d) && !isNaN(d)) return !0;
            if (angular.isString(d)) {
                var e = j.parse(d, r);
                return !isNaN(e);
            }
            return !1;
        }
        return !0;
    }
    function p(c) {
        var d = A[0], e = b[0].contains(c.target), f = void 0 !== d.contains && d.contains(c.target);
        !a.isOpen || e || f || a.$apply(function() {
            a.isOpen = !1;
        });
    }
    function q(c) {
        27 === c.which && a.isOpen ? (c.preventDefault(), c.stopPropagation(), a.$apply(function() {
            a.isOpen = !1;
        }), b[0].focus()) : 40 !== c.which || a.isOpen || (c.preventDefault(), c.stopPropagation(), 
        a.$apply(function() {
            a.isOpen = !0;
        }));
    }
    var r, s, t, u, v, w, x, y, z, A, B = {}, C = !1;
    a.watchData = {}, this.init = function(h) {
        if (z = h, s = angular.isDefined(c.closeOnDateSelection) ? a.$parent.$eval(c.closeOnDateSelection) : k.closeOnDateSelection, 
        t = angular.isDefined(c.datepickerAppendToBody) ? a.$parent.$eval(c.datepickerAppendToBody) : k.appendToBody, 
        u = angular.isDefined(c.onOpenFocus) ? a.$parent.$eval(c.onOpenFocus) : k.onOpenFocus, 
        v = angular.isDefined(c.datepickerPopupTemplateUrl) ? c.datepickerPopupTemplateUrl : k.datepickerPopupTemplateUrl, 
        w = angular.isDefined(c.datepickerTemplateUrl) ? c.datepickerTemplateUrl : k.datepickerTemplateUrl, 
        a.showButtonBar = angular.isDefined(c.showButtonBar) ? a.$parent.$eval(c.showButtonBar) : k.showButtonBar, 
        k.html5Types[c.type] ? (r = k.html5Types[c.type], C = !0) : (r = c.datepickerPopup || c.uibDatepickerPopup || k.datepickerPopup, 
        c.$observe("uibDatepickerPopup", function(a, b) {
            var c = a || k.datepickerPopup;
            if (c !== r && (r = c, z.$modelValue = null, !r)) throw new Error("uibDatepickerPopup must have a date format specified.");
        })), !r) throw new Error("uibDatepickerPopup must have a date format specified.");
        if (C && c.datepickerPopup) throw new Error("HTML5 date input types do not support custom formats.");
        if (x = angular.element("<div uib-datepicker-popup-wrap><div uib-datepicker></div></div>"), 
        x.attr({
            "ng-model": "date",
            "ng-change": "dateSelection(date)",
            "template-url": v
        }), y = angular.element(x.children()[0]), y.attr("template-url", w), C && "month" === c.type && (y.attr("datepicker-mode", '"month"'), 
        y.attr("min-mode", "month")), c.datepickerOptions) {
            var l = a.$parent.$eval(c.datepickerOptions);
            l && l.initDate && (a.initDate = l.initDate, y.attr("init-date", "initDate"), delete l.initDate), 
            angular.forEach(l, function(a, b) {
                y.attr(m(b), a);
            });
        }
        angular.forEach([ "minMode", "maxMode", "minDate", "maxDate", "datepickerMode", "initDate", "shortcutPropagation" ], function(b) {
            if (c[b]) {
                var d = e(c[b]);
                if (a.$parent.$watch(d, function(c) {
                    a.watchData[b] = c, "minDate" !== b && "maxDate" !== b || (B[b] = new Date(c));
                }), y.attr(m(b), "watchData." + b), "datepickerMode" === b) {
                    var f = d.assign;
                    a.$watch("watchData." + b, function(b, c) {
                        angular.isFunction(f) && b !== c && f(a.$parent, b);
                    });
                }
            }
        }), c.dateDisabled && y.attr("date-disabled", "dateDisabled({ date: date, mode: mode })"), 
        c.showWeeks && y.attr("show-weeks", c.showWeeks), c.customClass && y.attr("custom-class", "customClass({ date: date, mode: mode })"), 
        C ? z.$formatters.push(function(b) {
            return a.date = b, b;
        }) : (z.$$parserName = "date", z.$validators.date = o, z.$parsers.unshift(n), z.$formatters.push(function(b) {
            return a.date = b, z.$isEmpty(b) ? b : i(b, r);
        })), z.$viewChangeListeners.push(function() {
            a.date = j.parse(z.$viewValue, r, a.date);
        }), b.bind("keydown", q), A = d(x)(a), x.remove(), t ? f.find("body").append(A) : b.after(A), 
        a.$on("$destroy", function() {
            a.isOpen === !0 && (g.$$phase || a.$apply(function() {
                a.isOpen = !1;
            })), A.remove(), b.unbind("keydown", q), f.unbind("click", p);
        });
    }, a.getText = function(b) {
        return a[b + "Text"] || k[b + "Text"];
    }, a.isDisabled = function(b) {
        return "today" === b && (b = new Date()), a.watchData.minDate && a.compare(b, B.minDate) < 0 || a.watchData.maxDate && a.compare(b, B.maxDate) > 0;
    }, a.compare = function(a, b) {
        return new Date(a.getFullYear(), a.getMonth(), a.getDate()) - new Date(b.getFullYear(), b.getMonth(), b.getDate());
    }, a.dateSelection = function(c) {
        angular.isDefined(c) && (a.date = c);
        var d = a.date ? i(a.date, r) : null;
        b.val(d), z.$setViewValue(d), s && (a.isOpen = !1, b[0].focus());
    }, a.keydown = function(c) {
        27 === c.which && (a.isOpen = !1, b[0].focus());
    }, a.select = function(b) {
        if ("today" === b) {
            var c = new Date();
            angular.isDate(a.date) ? (b = new Date(a.date), b.setFullYear(c.getFullYear(), c.getMonth(), c.getDate())) : b = new Date(c.setHours(0, 0, 0, 0));
        }
        a.dateSelection(b);
    }, a.close = function() {
        a.isOpen = !1, b[0].focus();
    }, a.$watch("isOpen", function(c) {
        c ? (a.position = t ? h.offset(b) : h.position(b), a.position.top = a.position.top + b.prop("offsetHeight"), 
        l(function() {
            u && a.$broadcast("uib:datepicker.focus"), f.bind("click", p);
        }, 0, !1)) : f.unbind("click", p);
    });
} ]).directive("uibDatepickerPopup", function() {
    return {
        require: [ "ngModel", "uibDatepickerPopup" ],
        controller: "UibDatepickerPopupController",
        scope: {
            isOpen: "=?",
            currentText: "@",
            clearText: "@",
            closeText: "@",
            dateDisabled: "&",
            customClass: "&"
        },
        link: function(a, b, c, d) {
            var e = d[0], f = d[1];
            f.init(e);
        }
    };
}).directive("uibDatepickerPopupWrap", function() {
    return {
        replace: !0,
        transclude: !0,
        templateUrl: function(a, b) {
            return b.templateUrl || "template/datepicker/popup.html";
        }
    };
}), angular.module("ui.bootstrap.datepicker").value("$datepickerSuppressWarning", !1).controller("DatepickerController", [ "$scope", "$attrs", "$parse", "$interpolate", "$log", "dateFilter", "uibDatepickerConfig", "$datepickerSuppressError", "$datepickerSuppressWarning", function(a, b, c, d, e, f, g, h, i) {
    i || e.warn("DatepickerController is now deprecated. Use UibDatepickerController instead.");
    var j = this, k = {
        $setViewValue: angular.noop
    };
    this.modes = [ "day", "month", "year" ], angular.forEach([ "formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle", "showWeeks", "startingDay", "yearRange", "shortcutPropagation" ], function(c, e) {
        j[c] = angular.isDefined(b[c]) ? e < 6 ? d(b[c])(a.$parent) : a.$parent.$eval(b[c]) : g[c];
    }), angular.forEach([ "minDate", "maxDate" ], function(d) {
        b[d] ? a.$parent.$watch(c(b[d]), function(a) {
            j[d] = a ? new Date(a) : null, j.refreshView();
        }) : j[d] = g[d] ? new Date(g[d]) : null;
    }), angular.forEach([ "minMode", "maxMode" ], function(d) {
        b[d] ? a.$parent.$watch(c(b[d]), function(c) {
            j[d] = angular.isDefined(c) ? c : b[d], a[d] = j[d], ("minMode" == d && j.modes.indexOf(a.datepickerMode) < j.modes.indexOf(j[d]) || "maxMode" == d && j.modes.indexOf(a.datepickerMode) > j.modes.indexOf(j[d])) && (a.datepickerMode = j[d]);
        }) : (j[d] = g[d] || null, a[d] = j[d]);
    }), a.datepickerMode = a.datepickerMode || g.datepickerMode, a.uniqueId = "datepicker-" + a.$id + "-" + Math.floor(1e4 * Math.random()), 
    angular.isDefined(b.initDate) ? (this.activeDate = a.$parent.$eval(b.initDate) || new Date(), 
    a.$parent.$watch(b.initDate, function(a) {
        a && (k.$isEmpty(k.$modelValue) || k.$invalid) && (j.activeDate = a, j.refreshView());
    })) : this.activeDate = new Date(), a.isActive = function(b) {
        return 0 === j.compare(b.date, j.activeDate) && (a.activeDateId = b.uid, !0);
    }, this.init = function(a) {
        k = a, k.$render = function() {
            j.render();
        };
    }, this.render = function() {
        if (k.$viewValue) {
            var a = new Date(k.$viewValue), b = !isNaN(a);
            b ? this.activeDate = a : h || e.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
        }
        this.refreshView();
    }, this.refreshView = function() {
        if (this.element) {
            this._refreshView();
            var a = k.$viewValue ? new Date(k.$viewValue) : null;
            k.$setValidity("dateDisabled", !a || this.element && !this.isDisabled(a));
        }
    }, this.createDateObject = function(a, b) {
        var c = k.$viewValue ? new Date(k.$viewValue) : null;
        return {
            date: a,
            label: f(a, b),
            selected: c && 0 === this.compare(a, c),
            disabled: this.isDisabled(a),
            current: 0 === this.compare(a, new Date()),
            customClass: this.customClass(a)
        };
    }, this.isDisabled = function(c) {
        return this.minDate && this.compare(c, this.minDate) < 0 || this.maxDate && this.compare(c, this.maxDate) > 0 || b.dateDisabled && a.dateDisabled({
            date: c,
            mode: a.datepickerMode
        });
    }, this.customClass = function(b) {
        return a.customClass({
            date: b,
            mode: a.datepickerMode
        });
    }, this.split = function(a, b) {
        for (var c = []; a.length > 0; ) c.push(a.splice(0, b));
        return c;
    }, this.fixTimeZone = function(a) {
        var b = a.getHours();
        a.setHours(23 === b ? b + 2 : 0);
    }, a.select = function(b) {
        if (a.datepickerMode === j.minMode) {
            var c = k.$viewValue ? new Date(k.$viewValue) : new Date(0, 0, 0, 0, 0, 0, 0);
            c.setFullYear(b.getFullYear(), b.getMonth(), b.getDate()), k.$setViewValue(c), k.$render();
        } else j.activeDate = b, a.datepickerMode = j.modes[j.modes.indexOf(a.datepickerMode) - 1];
    }, a.move = function(a) {
        var b = j.activeDate.getFullYear() + a * (j.step.years || 0), c = j.activeDate.getMonth() + a * (j.step.months || 0);
        j.activeDate.setFullYear(b, c, 1), j.refreshView();
    }, a.toggleMode = function(b) {
        b = b || 1, a.datepickerMode === j.maxMode && 1 === b || a.datepickerMode === j.minMode && b === -1 || (a.datepickerMode = j.modes[j.modes.indexOf(a.datepickerMode) + b]);
    }, a.keys = {
        13: "enter",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };
    var l = function() {
        j.element[0].focus();
    };
    a.$on("uib:datepicker.focus", l), a.keydown = function(b) {
        var c = a.keys[b.which];
        if (c && !b.shiftKey && !b.altKey) if (b.preventDefault(), j.shortcutPropagation || b.stopPropagation(), 
        "enter" === c || "space" === c) {
            if (j.isDisabled(j.activeDate)) return;
            a.select(j.activeDate);
        } else !b.ctrlKey || "up" !== c && "down" !== c ? (j.handleKeyDown(c, b), j.refreshView()) : a.toggleMode("up" === c ? 1 : -1);
    };
} ]).directive("datepicker", [ "$log", "$datepickerSuppressWarning", function(a, b) {
    return {
        replace: !0,
        templateUrl: function(a, b) {
            return b.templateUrl || "template/datepicker/datepicker.html";
        },
        scope: {
            datepickerMode: "=?",
            dateDisabled: "&",
            customClass: "&",
            shortcutPropagation: "&?"
        },
        require: [ "datepicker", "^ngModel" ],
        controller: "DatepickerController",
        controllerAs: "datepicker",
        link: function(c, d, e, f) {
            b || a.warn("datepicker is now deprecated. Use uib-datepicker instead.");
            var g = f[0], h = f[1];
            g.init(h);
        }
    };
} ]).directive("daypicker", [ "$log", "$datepickerSuppressWarning", function(a, b) {
    return {
        replace: !0,
        templateUrl: "template/datepicker/day.html",
        require: [ "^datepicker", "daypicker" ],
        controller: "UibDaypickerController",
        link: function(c, d, e, f) {
            b || a.warn("daypicker is now deprecated. Use uib-daypicker instead.");
            var g = f[0], h = f[1];
            h.init(g);
        }
    };
} ]).directive("monthpicker", [ "$log", "$datepickerSuppressWarning", function(a, b) {
    return {
        replace: !0,
        templateUrl: "template/datepicker/month.html",
        require: [ "^datepicker", "monthpicker" ],
        controller: "UibMonthpickerController",
        link: function(c, d, e, f) {
            b || a.warn("monthpicker is now deprecated. Use uib-monthpicker instead.");
            var g = f[0], h = f[1];
            h.init(g);
        }
    };
} ]).directive("yearpicker", [ "$log", "$datepickerSuppressWarning", function(a, b) {
    return {
        replace: !0,
        templateUrl: "template/datepicker/year.html",
        require: [ "^datepicker", "yearpicker" ],
        controller: "UibYearpickerController",
        link: function(c, d, e, f) {
            b || a.warn("yearpicker is now deprecated. Use uib-yearpicker instead.");
            var g = f[0];
            angular.extend(g, f[1]), g.yearpickerInit(), g.refreshView();
        }
    };
} ]).directive("datepickerPopup", [ "$log", "$datepickerSuppressWarning", function(a, b) {
    return {
        require: [ "ngModel", "datepickerPopup" ],
        controller: "UibDatepickerPopupController",
        scope: {
            isOpen: "=?",
            currentText: "@",
            clearText: "@",
            closeText: "@",
            dateDisabled: "&",
            customClass: "&"
        },
        link: function(c, d, e, f) {
            b || a.warn("datepicker-popup is now deprecated. Use uib-datepicker-popup instead.");
            var g = f[0], h = f[1];
            h.init(g);
        }
    };
} ]).directive("datepickerPopupWrap", [ "$log", "$datepickerSuppressWarning", function(a, b) {
    return {
        replace: !0,
        transclude: !0,
        templateUrl: function(a, b) {
            return b.templateUrl || "template/datepicker/popup.html";
        },
        link: function() {
            b || a.warn("datepicker-popup-wrap is now deprecated. Use uib-datepicker-popup-wrap instead.");
        }
    };
} ]), angular.module("ui.bootstrap.dropdown", [ "ui.bootstrap.position" ]).constant("uibDropdownConfig", {
    openClass: "open"
}).service("uibDropdownService", [ "$document", "$rootScope", function(a, b) {
    var c = null;
    this.open = function(b) {
        c || (a.bind("click", d), a.bind("keydown", e)), c && c !== b && (c.isOpen = !1), 
        c = b;
    }, this.close = function(b) {
        c === b && (c = null, a.unbind("click", d), a.unbind("keydown", e));
    };
    var d = function(a) {
        if (c && (!a || "disabled" !== c.getAutoClose())) {
            var d = c.getToggleElement();
            if (!(a && d && d[0].contains(a.target))) {
                var e = c.getDropdownElement();
                a && "outsideClick" === c.getAutoClose() && e && e[0].contains(a.target) || (c.isOpen = !1, 
                b.$$phase || c.$apply());
            }
        }
    }, e = function(a) {
        27 === a.which ? (c.focusToggleElement(), d()) : c.isKeynavEnabled() && /(38|40)/.test(a.which) && c.isOpen && (a.preventDefault(), 
        a.stopPropagation(), c.focusDropdownEntry(a.which));
    };
} ]).controller("UibDropdownController", [ "$scope", "$element", "$attrs", "$parse", "uibDropdownConfig", "uibDropdownService", "$animate", "$uibPosition", "$document", "$compile", "$templateRequest", function(a, b, c, d, e, f, g, h, i, j, k) {
    var l, m, n = this, o = a.$new(), p = e.openClass, q = angular.noop, r = c.onToggle ? d(c.onToggle) : angular.noop, s = !1, t = !1;
    b.addClass("dropdown"), this.init = function() {
        c.isOpen && (m = d(c.isOpen), q = m.assign, a.$watch(m, function(a) {
            o.isOpen = !!a;
        })), s = angular.isDefined(c.dropdownAppendToBody), t = angular.isDefined(c.uibKeyboardNav), 
        s && n.dropdownMenu && (i.find("body").append(n.dropdownMenu), b.on("$destroy", function() {
            n.dropdownMenu.remove();
        }));
    }, this.toggle = function(a) {
        return o.isOpen = arguments.length ? !!a : !o.isOpen;
    }, this.isOpen = function() {
        return o.isOpen;
    }, o.getToggleElement = function() {
        return n.toggleElement;
    }, o.getAutoClose = function() {
        return c.autoClose || "always";
    }, o.getElement = function() {
        return b;
    }, o.isKeynavEnabled = function() {
        return t;
    }, o.focusDropdownEntry = function(a) {
        var c = n.dropdownMenu ? angular.element(n.dropdownMenu).find("a") : angular.element(b).find("ul").eq(0).find("a");
        switch (a) {
          case 40:
            angular.isNumber(n.selectedOption) ? n.selectedOption = n.selectedOption === c.length - 1 ? n.selectedOption : n.selectedOption + 1 : n.selectedOption = 0;
            break;

          case 38:
            angular.isNumber(n.selectedOption) ? n.selectedOption = 0 === n.selectedOption ? 0 : n.selectedOption - 1 : n.selectedOption = c.length - 1;
        }
        c[n.selectedOption].focus();
    }, o.getDropdownElement = function() {
        return n.dropdownMenu;
    }, o.focusToggleElement = function() {
        n.toggleElement && n.toggleElement[0].focus();
    }, o.$watch("isOpen", function(c, d) {
        if (s && n.dropdownMenu) {
            var e = h.positionElements(b, n.dropdownMenu, "bottom-left", !0), i = {
                top: e.top + "px",
                display: c ? "block" : "none"
            }, m = n.dropdownMenu.hasClass("dropdown-menu-right");
            m ? (i.left = "auto", i.right = window.innerWidth - (e.left + b.prop("offsetWidth")) + "px") : (i.left = e.left + "px", 
            i.right = "auto"), n.dropdownMenu.css(i);
        }
        if (g[c ? "addClass" : "removeClass"](b, p).then(function() {
            angular.isDefined(c) && c !== d && r(a, {
                open: !!c
            });
        }), c) n.dropdownMenuTemplateUrl && k(n.dropdownMenuTemplateUrl).then(function(a) {
            l = o.$new(), j(a.trim())(l, function(a) {
                var b = a;
                n.dropdownMenu.replaceWith(b), n.dropdownMenu = b;
            });
        }), o.focusToggleElement(), f.open(o); else {
            if (n.dropdownMenuTemplateUrl) {
                l && l.$destroy();
                var t = angular.element('<ul class="dropdown-menu"></ul>');
                n.dropdownMenu.replaceWith(t), n.dropdownMenu = t;
            }
            f.close(o), n.selectedOption = null;
        }
        angular.isFunction(q) && q(a, c);
    }), a.$on("$locationChangeSuccess", function() {
        "disabled" !== o.getAutoClose() && (o.isOpen = !1);
    });
    var u = a.$on("$destroy", function() {
        o.$destroy();
    });
    o.$on("$destroy", u);
} ]).directive("uibDropdown", function() {
    return {
        controller: "UibDropdownController",
        link: function(a, b, c, d) {
            d.init();
        }
    };
}).directive("uibDropdownMenu", function() {
    return {
        restrict: "AC",
        require: "?^uibDropdown",
        link: function(a, b, c, d) {
            if (d && !angular.isDefined(c.dropdownNested)) {
                b.addClass("dropdown-menu");
                var e = c.templateUrl;
                e && (d.dropdownMenuTemplateUrl = e), d.dropdownMenu || (d.dropdownMenu = b);
            }
        }
    };
}).directive("uibKeyboardNav", function() {
    return {
        restrict: "A",
        require: "?^uibDropdown",
        link: function(a, b, c, d) {
            b.bind("keydown", function(a) {
                if ([ 38, 40 ].indexOf(a.which) !== -1) {
                    a.preventDefault(), a.stopPropagation();
                    var b = d.dropdownMenu.find("a");
                    switch (a.which) {
                      case 40:
                        angular.isNumber(d.selectedOption) ? d.selectedOption = d.selectedOption === b.length - 1 ? d.selectedOption : d.selectedOption + 1 : d.selectedOption = 0;
                        break;

                      case 38:
                        angular.isNumber(d.selectedOption) ? d.selectedOption = 0 === d.selectedOption ? 0 : d.selectedOption - 1 : d.selectedOption = b.length - 1;
                    }
                    b[d.selectedOption].focus();
                }
            });
        }
    };
}).directive("uibDropdownToggle", function() {
    return {
        require: "?^uibDropdown",
        link: function(a, b, c, d) {
            if (d) {
                b.addClass("dropdown-toggle"), d.toggleElement = b;
                var e = function(e) {
                    e.preventDefault(), b.hasClass("disabled") || c.disabled || a.$apply(function() {
                        d.toggle();
                    });
                };
                b.bind("click", e), b.attr({
                    "aria-haspopup": !0,
                    "aria-expanded": !1
                }), a.$watch(d.isOpen, function(a) {
                    b.attr("aria-expanded", !!a);
                }), a.$on("$destroy", function() {
                    b.unbind("click", e);
                });
            }
        }
    };
}), angular.module("ui.bootstrap.dropdown").value("$dropdownSuppressWarning", !1).service("dropdownService", [ "$log", "$dropdownSuppressWarning", "uibDropdownService", function(a, b, c) {
    b || a.warn("dropdownService is now deprecated. Use uibDropdownService instead."), 
    angular.extend(this, c);
} ]).controller("DropdownController", [ "$scope", "$element", "$attrs", "$parse", "uibDropdownConfig", "uibDropdownService", "$animate", "$uibPosition", "$document", "$compile", "$templateRequest", "$log", "$dropdownSuppressWarning", function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
    m || l.warn("DropdownController is now deprecated. Use UibDropdownController instead.");
    var n, o, p = this, q = a.$new(), r = e.openClass, s = angular.noop, t = c.onToggle ? d(c.onToggle) : angular.noop, u = !1, v = !1;
    b.addClass("dropdown"), this.init = function() {
        c.isOpen && (o = d(c.isOpen), s = o.assign, a.$watch(o, function(a) {
            q.isOpen = !!a;
        })), u = angular.isDefined(c.dropdownAppendToBody), v = angular.isDefined(c.uibKeyboardNav), 
        u && p.dropdownMenu && (i.find("body").append(p.dropdownMenu), b.on("$destroy", function() {
            p.dropdownMenu.remove();
        }));
    }, this.toggle = function(a) {
        return q.isOpen = arguments.length ? !!a : !q.isOpen;
    }, this.isOpen = function() {
        return q.isOpen;
    }, q.getToggleElement = function() {
        return p.toggleElement;
    }, q.getAutoClose = function() {
        return c.autoClose || "always";
    }, q.getElement = function() {
        return b;
    }, q.isKeynavEnabled = function() {
        return v;
    }, q.focusDropdownEntry = function(a) {
        var c = p.dropdownMenu ? angular.element(p.dropdownMenu).find("a") : angular.element(b).find("ul").eq(0).find("a");
        switch (a) {
          case 40:
            angular.isNumber(p.selectedOption) ? p.selectedOption = p.selectedOption === c.length - 1 ? p.selectedOption : p.selectedOption + 1 : p.selectedOption = 0;
            break;

          case 38:
            angular.isNumber(p.selectedOption) ? p.selectedOption = 0 === p.selectedOption ? 0 : p.selectedOption - 1 : p.selectedOption = c.length - 1;
        }
        c[p.selectedOption].focus();
    }, q.getDropdownElement = function() {
        return p.dropdownMenu;
    }, q.focusToggleElement = function() {
        p.toggleElement && p.toggleElement[0].focus();
    }, q.$watch("isOpen", function(c, d) {
        if (u && p.dropdownMenu) {
            var e = h.positionElements(b, p.dropdownMenu, "bottom-left", !0), i = {
                top: e.top + "px",
                display: c ? "block" : "none"
            }, l = p.dropdownMenu.hasClass("dropdown-menu-right");
            l ? (i.left = "auto", i.right = window.innerWidth - (e.left + b.prop("offsetWidth")) + "px") : (i.left = e.left + "px", 
            i.right = "auto"), p.dropdownMenu.css(i);
        }
        if (g[c ? "addClass" : "removeClass"](b, r).then(function() {
            angular.isDefined(c) && c !== d && t(a, {
                open: !!c
            });
        }), c) p.dropdownMenuTemplateUrl && k(p.dropdownMenuTemplateUrl).then(function(a) {
            n = q.$new(), j(a.trim())(n, function(a) {
                var b = a;
                p.dropdownMenu.replaceWith(b), p.dropdownMenu = b;
            });
        }), q.focusToggleElement(), f.open(q); else {
            if (p.dropdownMenuTemplateUrl) {
                n && n.$destroy();
                var m = angular.element('<ul class="dropdown-menu"></ul>');
                p.dropdownMenu.replaceWith(m), p.dropdownMenu = m;
            }
            f.close(q), p.selectedOption = null;
        }
        angular.isFunction(s) && s(a, c);
    }), a.$on("$locationChangeSuccess", function() {
        "disabled" !== q.getAutoClose() && (q.isOpen = !1);
    });
    var w = a.$on("$destroy", function() {
        q.$destroy();
    });
    q.$on("$destroy", w);
} ]).directive("dropdown", [ "$log", "$dropdownSuppressWarning", function(a, b) {
    return {
        controller: "DropdownController",
        link: function(c, d, e, f) {
            b || a.warn("dropdown is now deprecated. Use uib-dropdown instead."), f.init();
        }
    };
} ]).directive("dropdownMenu", [ "$log", "$dropdownSuppressWarning", function(a, b) {
    return {
        restrict: "AC",
        require: "?^dropdown",
        link: function(c, d, e, f) {
            if (f && !angular.isDefined(e.dropdownNested)) {
                b || a.warn("dropdown-menu is now deprecated. Use uib-dropdown-menu instead."), 
                d.addClass("dropdown-menu");
                var g = e.templateUrl;
                g && (f.dropdownMenuTemplateUrl = g), f.dropdownMenu || (f.dropdownMenu = d);
            }
        }
    };
} ]).directive("keyboardNav", [ "$log", "$dropdownSuppressWarning", function(a, b) {
    return {
        restrict: "A",
        require: "?^dropdown",
        link: function(c, d, e, f) {
            b || a.warn("keyboard-nav is now deprecated. Use uib-keyboard-nav instead."), d.bind("keydown", function(a) {
                if ([ 38, 40 ].indexOf(a.which) !== -1) {
                    a.preventDefault(), a.stopPropagation();
                    var b = f.dropdownMenu.find("a");
                    switch (a.which) {
                      case 40:
                        angular.isNumber(f.selectedOption) ? f.selectedOption = f.selectedOption === b.length - 1 ? f.selectedOption : f.selectedOption + 1 : f.selectedOption = 0;
                        break;

                      case 38:
                        angular.isNumber(f.selectedOption) ? f.selectedOption = 0 === f.selectedOption ? 0 : f.selectedOption - 1 : f.selectedOption = b.length - 1;
                    }
                    b[f.selectedOption].focus();
                }
            });
        }
    };
} ]).directive("dropdownToggle", [ "$log", "$dropdownSuppressWarning", function(a, b) {
    return {
        require: "?^dropdown",
        link: function(c, d, e, f) {
            if (b || a.warn("dropdown-toggle is now deprecated. Use uib-dropdown-toggle instead."), 
            f) {
                d.addClass("dropdown-toggle"), f.toggleElement = d;
                var g = function(a) {
                    a.preventDefault(), d.hasClass("disabled") || e.disabled || c.$apply(function() {
                        f.toggle();
                    });
                };
                d.bind("click", g), d.attr({
                    "aria-haspopup": !0,
                    "aria-expanded": !1
                }), c.$watch(f.isOpen, function(a) {
                    d.attr("aria-expanded", !!a);
                }), c.$on("$destroy", function() {
                    d.unbind("click", g);
                });
            }
        }
    };
} ]), angular.module("ui.bootstrap.stackedMap", []).factory("$$stackedMap", function() {
    return {
        createNew: function() {
            var a = [];
            return {
                add: function(b, c) {
                    a.push({
                        key: b,
                        value: c
                    });
                },
                get: function(b) {
                    for (var c = 0; c < a.length; c++) if (b == a[c].key) return a[c];
                },
                keys: function() {
                    for (var b = [], c = 0; c < a.length; c++) b.push(a[c].key);
                    return b;
                },
                top: function() {
                    return a[a.length - 1];
                },
                remove: function(b) {
                    for (var c = -1, d = 0; d < a.length; d++) if (b == a[d].key) {
                        c = d;
                        break;
                    }
                    return a.splice(c, 1)[0];
                },
                removeTop: function() {
                    return a.splice(a.length - 1, 1)[0];
                },
                length: function() {
                    return a.length;
                }
            };
        }
    };
}), angular.module("ui.bootstrap.modal", [ "ui.bootstrap.stackedMap" ]).factory("$$multiMap", function() {
    return {
        createNew: function() {
            var a = {};
            return {
                entries: function() {
                    return Object.keys(a).map(function(b) {
                        return {
                            key: b,
                            value: a[b]
                        };
                    });
                },
                get: function(b) {
                    return a[b];
                },
                hasKey: function(b) {
                    return !!a[b];
                },
                keys: function() {
                    return Object.keys(a);
                },
                put: function(b, c) {
                    a[b] || (a[b] = []), a[b].push(c);
                },
                remove: function(b, c) {
                    var d = a[b];
                    if (d) {
                        var e = d.indexOf(c);
                        e !== -1 && d.splice(e, 1), d.length || delete a[b];
                    }
                }
            };
        }
    };
}).directive("uibModalBackdrop", [ "$animate", "$injector", "$uibModalStack", function(a, b, c) {
    function d(b, d, f) {
        d.addClass("modal-backdrop"), f.modalInClass && (e ? e(d, {
            addClass: f.modalInClass
        }).start() : a.addClass(d, f.modalInClass), b.$on(c.NOW_CLOSING_EVENT, function(b, c) {
            var g = c();
            e ? e(d, {
                removeClass: f.modalInClass
            }).start().then(g) : a.removeClass(d, f.modalInClass).then(g);
        }));
    }
    var e = null;
    return b.has("$animateCss") && (e = b.get("$animateCss")), {
        replace: !0,
        templateUrl: "template/modal/backdrop.html",
        compile: function(a, b) {
            return a.addClass(b.backdropClass), d;
        }
    };
} ]).directive("uibModalWindow", [ "$uibModalStack", "$q", "$animate", "$injector", function(a, b, c, d) {
    var e = null;
    return d.has("$animateCss") && (e = d.get("$animateCss")), {
        scope: {
            index: "@"
        },
        replace: !0,
        transclude: !0,
        templateUrl: function(a, b) {
            return b.templateUrl || "template/modal/window.html";
        },
        link: function(d, f, g) {
            f.addClass(g.windowClass || ""), f.addClass(g.windowTopClass || ""), d.size = g.size, 
            d.close = function(b) {
                var c = a.getTop();
                c && c.value.backdrop && "static" !== c.value.backdrop && b.target === b.currentTarget && (b.preventDefault(), 
                b.stopPropagation(), a.dismiss(c.key, "backdrop click"));
            }, f.on("click", d.close), d.$isRendered = !0;
            var h = b.defer();
            g.$observe("modalRender", function(a) {
                "true" == a && h.resolve();
            }), h.promise.then(function() {
                var h = null;
                g.modalInClass && (h = e ? e(f, {
                    addClass: g.modalInClass
                }).start() : c.addClass(f, g.modalInClass), d.$on(a.NOW_CLOSING_EVENT, function(a, b) {
                    var d = b();
                    e ? e(f, {
                        removeClass: g.modalInClass
                    }).start().then(d) : c.removeClass(f, g.modalInClass).then(d);
                })), b.when(h).then(function() {
                    var a = f[0].querySelector("[autofocus]");
                    a ? a.focus() : f[0].focus();
                });
                var i = a.getTop();
                i && a.modalRendered(i.key);
            });
        }
    };
} ]).directive("uibModalAnimationClass", function() {
    return {
        compile: function(a, b) {
            b.modalAnimation && a.addClass(b.uibModalAnimationClass);
        }
    };
}).directive("uibModalTransclude", function() {
    return {
        link: function(a, b, c, d, e) {
            e(a.$parent, function(a) {
                b.empty(), b.append(a);
            });
        }
    };
}).factory("$uibModalStack", [ "$animate", "$timeout", "$document", "$compile", "$rootScope", "$q", "$injector", "$$multiMap", "$$stackedMap", function(a, b, c, d, e, f, g, h, i) {
    function j() {
        for (var a = -1, b = u.keys(), c = 0; c < b.length; c++) u.get(b[c]).value.backdrop && (a = c);
        return a;
    }
    function k(a, b) {
        var d = c.find("body").eq(0), e = u.get(a).value;
        u.remove(a), n(e.modalDomEl, e.modalScope, function() {
            var b = e.openedClass || t;
            v.remove(b, a), d.toggleClass(b, v.hasKey(b)), l(!0);
        }), m(), b && b.focus ? b.focus() : d.focus();
    }
    function l(a) {
        var b;
        u.length() > 0 && (b = u.top().value, b.modalDomEl.toggleClass(b.windowTopClass || "", a));
    }
    function m() {
        if (q && j() == -1) {
            var a = r;
            n(q, r, function() {
                a = null;
            }), q = void 0, r = void 0;
        }
    }
    function n(b, c, d) {
        function e() {
            e.done || (e.done = !0, p ? p(b, {
                event: "leave"
            }).start().then(function() {
                b.remove();
            }) : a.leave(b), c.$destroy(), d && d());
        }
        var g, h = null, i = function() {
            return g || (g = f.defer(), h = g.promise), function() {
                g.resolve();
            };
        };
        return c.$broadcast(w.NOW_CLOSING_EVENT, i), f.when(h).then(e);
    }
    function o(a, b, c) {
        return !a.value.modalScope.$broadcast("modal.closing", b, c).defaultPrevented;
    }
    var p = null;
    g.has("$animateCss") && (p = g.get("$animateCss"));
    var q, r, s, t = "modal-open", u = i.createNew(), v = h.createNew(), w = {
        NOW_CLOSING_EVENT: "modal.stack.now-closing"
    }, x = 0, y = "a[href], area[href], input:not([disabled]), button:not([disabled]),select:not([disabled]), textarea:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable=true]";
    return e.$watch(j, function(a) {
        r && (r.index = a);
    }), c.bind("keydown", function(a) {
        if (a.isDefaultPrevented()) return a;
        var b = u.top();
        if (b && b.value.keyboard) switch (a.which) {
          case 27:
            a.preventDefault(), e.$apply(function() {
                w.dismiss(b.key, "escape key press");
            });
            break;

          case 9:
            w.loadFocusElementList(b);
            var c = !1;
            a.shiftKey ? w.isFocusInFirstItem(a) && (c = w.focusLastFocusableElement()) : w.isFocusInLastItem(a) && (c = w.focusFirstFocusableElement()), 
            c && (a.preventDefault(), a.stopPropagation());
        }
    }), w.open = function(a, b) {
        var f = c[0].activeElement, g = b.openedClass || t;
        l(!1), u.add(a, {
            deferred: b.deferred,
            renderDeferred: b.renderDeferred,
            modalScope: b.scope,
            backdrop: b.backdrop,
            keyboard: b.keyboard,
            openedClass: b.openedClass,
            windowTopClass: b.windowTopClass
        }), v.put(g, a);
        var h = c.find("body").eq(0), i = j();
        if (i >= 0 && !q) {
            r = e.$new(!0), r.index = i;
            var k = angular.element('<div uib-modal-backdrop="modal-backdrop"></div>');
            k.attr("backdrop-class", b.backdropClass), b.animation && k.attr("modal-animation", "true"), 
            q = d(k)(r), h.append(q);
        }
        var m = angular.element('<div uib-modal-window="modal-window"></div>');
        m.attr({
            "template-url": b.windowTemplateUrl,
            "window-class": b.windowClass,
            "window-top-class": b.windowTopClass,
            size: b.size,
            index: u.length() - 1,
            animate: "animate"
        }).html(b.content), b.animation && m.attr("modal-animation", "true");
        var n = d(m)(b.scope);
        u.top().value.modalDomEl = n, u.top().value.modalOpener = f, h.append(n), h.addClass(g), 
        w.clearFocusListCache();
    }, w.close = function(a, b) {
        var c = u.get(a);
        return c && o(c, b, !0) ? (c.value.modalScope.$$uibDestructionScheduled = !0, c.value.deferred.resolve(b), 
        k(a, c.value.modalOpener), !0) : !c;
    }, w.dismiss = function(a, b) {
        var c = u.get(a);
        return c && o(c, b, !1) ? (c.value.modalScope.$$uibDestructionScheduled = !0, c.value.deferred.reject(b), 
        k(a, c.value.modalOpener), !0) : !c;
    }, w.dismissAll = function(a) {
        for (var b = this.getTop(); b && this.dismiss(b.key, a); ) b = this.getTop();
    }, w.getTop = function() {
        return u.top();
    }, w.modalRendered = function(a) {
        var b = u.get(a);
        b && b.value.renderDeferred.resolve();
    }, w.focusFirstFocusableElement = function() {
        return s.length > 0 && (s[0].focus(), !0);
    }, w.focusLastFocusableElement = function() {
        return s.length > 0 && (s[s.length - 1].focus(), !0);
    }, w.isFocusInFirstItem = function(a) {
        return s.length > 0 && (a.target || a.srcElement) == s[0];
    }, w.isFocusInLastItem = function(a) {
        return s.length > 0 && (a.target || a.srcElement) == s[s.length - 1];
    }, w.clearFocusListCache = function() {
        s = [], x = 0;
    }, w.loadFocusElementList = function(a) {
        if ((void 0 === s || !s.length) && a) {
            var b = a.value.modalDomEl;
            b && b.length && (s = b[0].querySelectorAll(y));
        }
    }, w;
} ]).provider("$uibModal", function() {
    var a = {
        options: {
            animation: !0,
            backdrop: !0,
            keyboard: !0
        },
        $get: [ "$injector", "$rootScope", "$q", "$templateRequest", "$controller", "$uibModalStack", "$modalSuppressWarning", "$log", function(b, c, d, e, f, g, h, i) {
            function j(a) {
                return a.template ? d.when(a.template) : e(angular.isFunction(a.templateUrl) ? a.templateUrl() : a.templateUrl);
            }
            function k(a) {
                var c = [];
                return angular.forEach(a, function(a) {
                    angular.isFunction(a) || angular.isArray(a) ? c.push(d.when(b.invoke(a))) : angular.isString(a) ? c.push(d.when(b.get(a))) : c.push(d.when(a));
                }), c;
            }
            var l = {}, m = null;
            return l.getPromiseChain = function() {
                return m;
            }, l.open = function(b) {
                function e() {
                    return r;
                }
                var l = d.defer(), n = d.defer(), o = d.defer(), p = {
                    result: l.promise,
                    opened: n.promise,
                    rendered: o.promise,
                    close: function(a) {
                        return g.close(p, a);
                    },
                    dismiss: function(a) {
                        return g.dismiss(p, a);
                    }
                };
                if (b = angular.extend({}, a.options, b), b.resolve = b.resolve || {}, !b.template && !b.templateUrl) throw new Error("One of template or templateUrl options is required.");
                var q, r = d.all([ j(b) ].concat(k(b.resolve)));
                return q = m = d.all([ m ]).then(e, e).then(function(a) {
                    var d = (b.scope || c).$new();
                    d.$close = p.close, d.$dismiss = p.dismiss, d.$on("$destroy", function() {
                        d.$$uibDestructionScheduled || d.$dismiss("$uibUnscheduledDestruction");
                    });
                    var e, j = {}, k = 1;
                    b.controller && (j.$scope = d, j.$uibModalInstance = p, Object.defineProperty(j, "$modalInstance", {
                        get: function() {
                            return h || i.warn("$modalInstance is now deprecated. Use $uibModalInstance instead."), 
                            p;
                        }
                    }), angular.forEach(b.resolve, function(b, c) {
                        j[c] = a[k++];
                    }), e = f(b.controller, j), b.controllerAs && (b.bindToController && angular.extend(e, d), 
                    d[b.controllerAs] = e)), g.open(p, {
                        scope: d,
                        deferred: l,
                        renderDeferred: o,
                        content: a[0],
                        animation: b.animation,
                        backdrop: b.backdrop,
                        keyboard: b.keyboard,
                        backdropClass: b.backdropClass,
                        windowTopClass: b.windowTopClass,
                        windowClass: b.windowClass,
                        windowTemplateUrl: b.windowTemplateUrl,
                        size: b.size,
                        openedClass: b.openedClass
                    }), n.resolve(!0);
                }, function(a) {
                    n.reject(a), l.reject(a);
                })["finally"](function() {
                    m === q && (m = null);
                }), p;
            }, l;
        } ]
    };
    return a;
}), angular.module("ui.bootstrap.modal").value("$modalSuppressWarning", !1).directive("modalBackdrop", [ "$animate", "$injector", "$modalStack", "$log", "$modalSuppressWarning", function(a, b, c, d, e) {
    function f(b, f, h) {
        e || d.warn("modal-backdrop is now deprecated. Use uib-modal-backdrop instead."), 
        f.addClass("modal-backdrop"), h.modalInClass && (g ? g(f, {
            addClass: h.modalInClass
        }).start() : a.addClass(f, h.modalInClass), b.$on(c.NOW_CLOSING_EVENT, function(b, c) {
            var d = c();
            g ? g(f, {
                removeClass: h.modalInClass
            }).start().then(d) : a.removeClass(f, h.modalInClass).then(d);
        }));
    }
    var g = null;
    return b.has("$animateCss") && (g = b.get("$animateCss")), {
        replace: !0,
        templateUrl: "template/modal/backdrop.html",
        compile: function(a, b) {
            return a.addClass(b.backdropClass), f;
        }
    };
} ]).directive("modalWindow", [ "$modalStack", "$q", "$animate", "$injector", "$log", "$modalSuppressWarning", function(a, b, c, d, e, f) {
    var g = null;
    return d.has("$animateCss") && (g = d.get("$animateCss")), {
        scope: {
            index: "@"
        },
        replace: !0,
        transclude: !0,
        templateUrl: function(a, b) {
            return b.templateUrl || "template/modal/window.html";
        },
        link: function(d, h, i) {
            f || e.warn("modal-window is now deprecated. Use uib-modal-window instead."), h.addClass(i.windowClass || ""), 
            h.addClass(i.windowTopClass || ""), d.size = i.size, d.close = function(b) {
                var c = a.getTop();
                c && c.value.backdrop && "static" !== c.value.backdrop && b.target === b.currentTarget && (b.preventDefault(), 
                b.stopPropagation(), a.dismiss(c.key, "backdrop click"));
            }, h.on("click", d.close), d.$isRendered = !0;
            var j = b.defer();
            i.$observe("modalRender", function(a) {
                "true" == a && j.resolve();
            }), j.promise.then(function() {
                var e = null;
                i.modalInClass && (e = g ? g(h, {
                    addClass: i.modalInClass
                }).start() : c.addClass(h, i.modalInClass), d.$on(a.NOW_CLOSING_EVENT, function(a, b) {
                    var d = b();
                    g ? g(h, {
                        removeClass: i.modalInClass
                    }).start().then(d) : c.removeClass(h, i.modalInClass).then(d);
                })), b.when(e).then(function() {
                    var a = h[0].querySelector("[autofocus]");
                    a ? a.focus() : h[0].focus();
                });
                var f = a.getTop();
                f && a.modalRendered(f.key);
            });
        }
    };
} ]).directive("modalAnimationClass", [ "$log", "$modalSuppressWarning", function(a, b) {
    return {
        compile: function(c, d) {
            b || a.warn("modal-animation-class is now deprecated. Use uib-modal-animation-class instead."), 
            d.modalAnimation && c.addClass(d.modalAnimationClass);
        }
    };
} ]).directive("modalTransclude", [ "$log", "$modalSuppressWarning", function(a, b) {
    return {
        link: function(c, d, e, f, g) {
            b || a.warn("modal-transclude is now deprecated. Use uib-modal-transclude instead."), 
            g(c.$parent, function(a) {
                d.empty(), d.append(a);
            });
        }
    };
} ]).service("$modalStack", [ "$animate", "$timeout", "$document", "$compile", "$rootScope", "$q", "$injector", "$$multiMap", "$$stackedMap", "$uibModalStack", "$log", "$modalSuppressWarning", function(a, b, c, d, e, f, g, h, i, j, k, l) {
    l || k.warn("$modalStack is now deprecated. Use $uibModalStack instead."), angular.extend(this, j);
} ]).provider("$modal", [ "$uibModalProvider", function(a) {
    angular.extend(this, a), this.$get = [ "$injector", "$log", "$modalSuppressWarning", function(b, c, d) {
        return d || c.warn("$modal is now deprecated. Use $uibModal instead."), b.invoke(a.$get);
    } ];
} ]), angular.module("ui.bootstrap.pagination", []).controller("UibPaginationController", [ "$scope", "$attrs", "$parse", function(a, b, c) {
    var d = this, e = {
        $setViewValue: angular.noop
    }, f = b.numPages ? c(b.numPages).assign : angular.noop;
    this.init = function(g, h) {
        e = g, this.config = h, e.$render = function() {
            d.render();
        }, b.itemsPerPage ? a.$parent.$watch(c(b.itemsPerPage), function(b) {
            d.itemsPerPage = parseInt(b, 10), a.totalPages = d.calculateTotalPages();
        }) : this.itemsPerPage = h.itemsPerPage, a.$watch("totalItems", function() {
            a.totalPages = d.calculateTotalPages();
        }), a.$watch("totalPages", function(b) {
            f(a.$parent, b), a.page > b ? a.selectPage(b) : e.$render();
        });
    }, this.calculateTotalPages = function() {
        var b = this.itemsPerPage < 1 ? 1 : Math.ceil(a.totalItems / this.itemsPerPage);
        return Math.max(b || 0, 1);
    }, this.render = function() {
        a.page = parseInt(e.$viewValue, 10) || 1;
    }, a.selectPage = function(b, c) {
        c && c.preventDefault();
        var d = !a.ngDisabled || !c;
        d && a.page !== b && b > 0 && b <= a.totalPages && (c && c.target && c.target.blur(), 
        e.$setViewValue(b), e.$render());
    }, a.getText = function(b) {
        return a[b + "Text"] || d.config[b + "Text"];
    }, a.noPrevious = function() {
        return 1 === a.page;
    }, a.noNext = function() {
        return a.page === a.totalPages;
    };
} ]).constant("uibPaginationConfig", {
    itemsPerPage: 10,
    boundaryLinks: !1,
    directionLinks: !0,
    firstText: "First",
    previousText: "Previous",
    nextText: "Next",
    lastText: "Last",
    rotate: !0
}).directive("uibPagination", [ "$parse", "uibPaginationConfig", function(a, b) {
    return {
        restrict: "EA",
        scope: {
            totalItems: "=",
            firstText: "@",
            previousText: "@",
            nextText: "@",
            lastText: "@",
            ngDisabled: "="
        },
        require: [ "uibPagination", "?ngModel" ],
        controller: "UibPaginationController",
        controllerAs: "pagination",
        templateUrl: function(a, b) {
            return b.templateUrl || "template/pagination/pagination.html";
        },
        replace: !0,
        link: function(c, d, e, f) {
            function g(a, b, c) {
                return {
                    number: a,
                    text: b,
                    active: c
                };
            }
            function h(a, b) {
                var c = [], d = 1, e = b, f = angular.isDefined(k) && k < b;
                f && (l ? (d = Math.max(a - Math.floor(k / 2), 1), e = d + k - 1, e > b && (e = b, 
                d = e - k + 1)) : (d = (Math.ceil(a / k) - 1) * k + 1, e = Math.min(d + k - 1, b)));
                for (var h = d; h <= e; h++) {
                    var i = g(h, h, h === a);
                    c.push(i);
                }
                if (f && !l) {
                    if (d > 1) {
                        var j = g(d - 1, "...", !1);
                        c.unshift(j);
                    }
                    if (e < b) {
                        var m = g(e + 1, "...", !1);
                        c.push(m);
                    }
                }
                return c;
            }
            var i = f[0], j = f[1];
            if (j) {
                var k = angular.isDefined(e.maxSize) ? c.$parent.$eval(e.maxSize) : b.maxSize, l = angular.isDefined(e.rotate) ? c.$parent.$eval(e.rotate) : b.rotate;
                c.boundaryLinks = angular.isDefined(e.boundaryLinks) ? c.$parent.$eval(e.boundaryLinks) : b.boundaryLinks, 
                c.directionLinks = angular.isDefined(e.directionLinks) ? c.$parent.$eval(e.directionLinks) : b.directionLinks, 
                i.init(j, b), e.maxSize && c.$parent.$watch(a(e.maxSize), function(a) {
                    k = parseInt(a, 10), i.render();
                });
                var m = i.render;
                i.render = function() {
                    m(), c.page > 0 && c.page <= c.totalPages && (c.pages = h(c.page, c.totalPages));
                };
            }
        }
    };
} ]).constant("uibPagerConfig", {
    itemsPerPage: 10,
    previousText: "« Previous",
    nextText: "Next »",
    align: !0
}).directive("uibPager", [ "uibPagerConfig", function(a) {
    return {
        restrict: "EA",
        scope: {
            totalItems: "=",
            previousText: "@",
            nextText: "@",
            ngDisabled: "="
        },
        require: [ "uibPager", "?ngModel" ],
        controller: "UibPaginationController",
        controllerAs: "pagination",
        templateUrl: function(a, b) {
            return b.templateUrl || "template/pagination/pager.html";
        },
        replace: !0,
        link: function(b, c, d, e) {
            var f = e[0], g = e[1];
            g && (b.align = angular.isDefined(d.align) ? b.$parent.$eval(d.align) : a.align, 
            f.init(g, a));
        }
    };
} ]), angular.module("ui.bootstrap.pagination").value("$paginationSuppressWarning", !1).controller("PaginationController", [ "$scope", "$attrs", "$parse", "$log", "$paginationSuppressWarning", function(a, b, c, d, e) {
    e || d.warn("PaginationController is now deprecated. Use UibPaginationController instead.");
    var f = this, g = {
        $setViewValue: angular.noop
    }, h = b.numPages ? c(b.numPages).assign : angular.noop;
    this.init = function(d, e) {
        g = d, this.config = e, g.$render = function() {
            f.render();
        }, b.itemsPerPage ? a.$parent.$watch(c(b.itemsPerPage), function(b) {
            f.itemsPerPage = parseInt(b, 10), a.totalPages = f.calculateTotalPages();
        }) : this.itemsPerPage = e.itemsPerPage, a.$watch("totalItems", function() {
            a.totalPages = f.calculateTotalPages();
        }), a.$watch("totalPages", function(b) {
            h(a.$parent, b), a.page > b ? a.selectPage(b) : g.$render();
        });
    }, this.calculateTotalPages = function() {
        var b = this.itemsPerPage < 1 ? 1 : Math.ceil(a.totalItems / this.itemsPerPage);
        return Math.max(b || 0, 1);
    }, this.render = function() {
        a.page = parseInt(g.$viewValue, 10) || 1;
    }, a.selectPage = function(b, c) {
        c && c.preventDefault();
        var d = !a.ngDisabled || !c;
        d && a.page !== b && b > 0 && b <= a.totalPages && (c && c.target && c.target.blur(), 
        g.$setViewValue(b), g.$render());
    }, a.getText = function(b) {
        return a[b + "Text"] || f.config[b + "Text"];
    }, a.noPrevious = function() {
        return 1 === a.page;
    }, a.noNext = function() {
        return a.page === a.totalPages;
    };
} ]).directive("pagination", [ "$parse", "uibPaginationConfig", "$log", "$paginationSuppressWarning", function(a, b, c, d) {
    return {
        restrict: "EA",
        scope: {
            totalItems: "=",
            firstText: "@",
            previousText: "@",
            nextText: "@",
            lastText: "@",
            ngDisabled: "="
        },
        require: [ "pagination", "?ngModel" ],
        controller: "PaginationController",
        controllerAs: "pagination",
        templateUrl: function(a, b) {
            return b.templateUrl || "template/pagination/pagination.html";
        },
        replace: !0,
        link: function(e, f, g, h) {
            function i(a, b, c) {
                return {
                    number: a,
                    text: b,
                    active: c
                };
            }
            function j(a, b) {
                var c = [], d = 1, e = b, f = angular.isDefined(m) && m < b;
                f && (n ? (d = Math.max(a - Math.floor(m / 2), 1), e = d + m - 1, e > b && (e = b, 
                d = e - m + 1)) : (d = (Math.ceil(a / m) - 1) * m + 1, e = Math.min(d + m - 1, b)));
                for (var g = d; g <= e; g++) {
                    var h = i(g, g, g === a);
                    c.push(h);
                }
                if (f && !n) {
                    if (d > 1) {
                        var j = i(d - 1, "...", !1);
                        c.unshift(j);
                    }
                    if (e < b) {
                        var k = i(e + 1, "...", !1);
                        c.push(k);
                    }
                }
                return c;
            }
            d || c.warn("pagination is now deprecated. Use uib-pagination instead.");
            var k = h[0], l = h[1];
            if (l) {
                var m = angular.isDefined(g.maxSize) ? e.$parent.$eval(g.maxSize) : b.maxSize, n = angular.isDefined(g.rotate) ? e.$parent.$eval(g.rotate) : b.rotate;
                e.boundaryLinks = angular.isDefined(g.boundaryLinks) ? e.$parent.$eval(g.boundaryLinks) : b.boundaryLinks, 
                e.directionLinks = angular.isDefined(g.directionLinks) ? e.$parent.$eval(g.directionLinks) : b.directionLinks, 
                k.init(l, b), g.maxSize && e.$parent.$watch(a(g.maxSize), function(a) {
                    m = parseInt(a, 10), k.render();
                });
                var o = k.render;
                k.render = function() {
                    o(), e.page > 0 && e.page <= e.totalPages && (e.pages = j(e.page, e.totalPages));
                };
            }
        }
    };
} ]).directive("pager", [ "uibPagerConfig", "$log", "$paginationSuppressWarning", function(a, b, c) {
    return {
        restrict: "EA",
        scope: {
            totalItems: "=",
            previousText: "@",
            nextText: "@",
            ngDisabled: "="
        },
        require: [ "pager", "?ngModel" ],
        controller: "PaginationController",
        controllerAs: "pagination",
        templateUrl: function(a, b) {
            return b.templateUrl || "template/pagination/pager.html";
        },
        replace: !0,
        link: function(d, e, f, g) {
            c || b.warn("pager is now deprecated. Use uib-pager instead.");
            var h = g[0], i = g[1];
            i && (d.align = angular.isDefined(f.align) ? d.$parent.$eval(f.align) : a.align, 
            h.init(i, a));
        }
    };
} ]), angular.module("ui.bootstrap.tooltip", [ "ui.bootstrap.position", "ui.bootstrap.stackedMap" ]).provider("$uibTooltip", function() {
    function a(a) {
        var b = /[A-Z]/g, c = "-";
        return a.replace(b, function(a, b) {
            return (b ? c : "") + a.toLowerCase();
        });
    }
    var b = {
        placement: "top",
        animation: !0,
        popupDelay: 0,
        popupCloseDelay: 0,
        useContentExp: !1
    }, c = {
        mouseenter: "mouseleave",
        click: "click",
        focus: "blur",
        none: ""
    }, d = {};
    this.options = function(a) {
        angular.extend(d, a);
    }, this.setTriggers = function(a) {
        angular.extend(c, a);
    }, this.$get = [ "$window", "$compile", "$timeout", "$document", "$uibPosition", "$interpolate", "$rootScope", "$parse", "$$stackedMap", function(e, f, g, h, i, j, k, l, m) {
        var n = m.createNew();
        return h.on("keypress", function(a) {
            if (27 === a.which) {
                var b = n.top();
                b && (b.value.close(), n.removeTop(), b = null);
            }
        }), function(e, k, m, o) {
            function p(a) {
                var b = (a || o.trigger || m).split(" "), d = b.map(function(a) {
                    return c[a] || a;
                });
                return {
                    show: b,
                    hide: d
                };
            }
            o = angular.extend({}, b, d, o);
            var q = a(e), r = j.startSymbol(), s = j.endSymbol(), t = "<div " + q + '-popup title="' + r + "title" + s + '" ' + (o.useContentExp ? 'content-exp="contentExp()" ' : 'content="' + r + "content" + s + '" ') + 'placement="' + r + "placement" + s + '" popup-class="' + r + "popupClass" + s + '" animation="animation" is-open="isOpen"origin-scope="origScope" style="visibility: hidden; display: block; top: -9999px; left: -9999px;"></div>';
            return {
                compile: function(a, b) {
                    var c = f(t);
                    return function(a, b, d, f) {
                        function j() {
                            L.isOpen ? q() : m();
                        }
                        function m() {
                            K && !a.$eval(d[k + "Enable"]) || (u(), x(), L.popupDelay ? F || (F = g(r, L.popupDelay, !1)) : r());
                        }
                        function q() {
                            s(), L.popupCloseDelay ? G || (G = g(t, L.popupCloseDelay, !1)) : t();
                        }
                        function r() {
                            return s(), u(), L.content ? (v(), void L.$evalAsync(function() {
                                L.isOpen = !0, y(!0), Q();
                            })) : angular.noop;
                        }
                        function s() {
                            F && (g.cancel(F), F = null), H && (g.cancel(H), H = null);
                        }
                        function t() {
                            s(), u(), L && L.$evalAsync(function() {
                                L.isOpen = !1, y(!1), L.animation ? E || (E = g(w, 150, !1)) : w();
                            });
                        }
                        function u() {
                            G && (g.cancel(G), G = null), E && (g.cancel(E), E = null);
                        }
                        function v() {
                            C || (D = L.$new(), C = c(D, function(a) {
                                I ? h.find("body").append(a) : b.after(a);
                            }), z());
                        }
                        function w() {
                            A(), E = null, C && (C.remove(), C = null), D && (D.$destroy(), D = null);
                        }
                        function x() {
                            L.title = d[k + "Title"], O ? L.content = O(a) : L.content = d[e], L.popupClass = d[k + "Class"], 
                            L.placement = angular.isDefined(d[k + "Placement"]) ? d[k + "Placement"] : o.placement;
                            var b = parseInt(d[k + "PopupDelay"], 10), c = parseInt(d[k + "PopupCloseDelay"], 10);
                            L.popupDelay = isNaN(b) ? o.popupDelay : b, L.popupCloseDelay = isNaN(c) ? o.popupCloseDelay : c;
                        }
                        function y(b) {
                            N && angular.isFunction(N.assign) && N.assign(a, b);
                        }
                        function z() {
                            P.length = 0, O ? (P.push(a.$watch(O, function(a) {
                                L.content = a, !a && L.isOpen && t();
                            })), P.push(D.$watch(function() {
                                M || (M = !0, D.$$postDigest(function() {
                                    M = !1, L && L.isOpen && Q();
                                }));
                            }))) : P.push(d.$observe(e, function(a) {
                                L.content = a, !a && L.isOpen ? t() : Q();
                            })), P.push(d.$observe(k + "Title", function(a) {
                                L.title = a, L.isOpen && Q();
                            })), P.push(d.$observe(k + "Placement", function(a) {
                                L.placement = a ? a : o.placement, L.isOpen && Q();
                            }));
                        }
                        function A() {
                            P.length && (angular.forEach(P, function(a) {
                                a();
                            }), P.length = 0);
                        }
                        function B() {
                            var a = d[k + "Trigger"];
                            R(), J = p(a), "none" !== J.show && J.show.forEach(function(a, c) {
                                a === J.hide[c] ? b[0].addEventListener(a, j) : a && (b[0].addEventListener(a, m), 
                                J.hide[c].split(" ").forEach(function(a) {
                                    b[0].addEventListener(a, q);
                                })), b.on("keypress", function(a) {
                                    27 === a.which && q();
                                });
                            });
                        }
                        var C, D, E, F, G, H, I = !!angular.isDefined(o.appendToBody) && o.appendToBody, J = p(void 0), K = angular.isDefined(d[k + "Enable"]), L = a.$new(!0), M = !1, N = !!angular.isDefined(d[k + "IsOpen"]) && l(d[k + "IsOpen"]), O = !!o.useContentExp && l(d[e]), P = [], Q = function() {
                            C && C.html() && (H || (H = g(function() {
                                C.css({
                                    top: 0,
                                    left: 0
                                });
                                var a = i.positionElements(b, C, L.placement, I);
                                a.top += "px", a.left += "px", a.visibility = "visible", C.css(a), H = null;
                            }, 0, !1)));
                        };
                        L.origScope = a, L.isOpen = !1, n.add(L, {
                            close: t
                        }), L.contentExp = function() {
                            return L.content;
                        }, d.$observe("disabled", function(a) {
                            a && s(), a && L.isOpen && t();
                        }), N && a.$watch(N, function(a) {
                            L && !a === L.isOpen && j();
                        });
                        var R = function() {
                            J.show.forEach(function(a) {
                                b.unbind(a, m);
                            }), J.hide.forEach(function(a) {
                                a.split(" ").forEach(function(a) {
                                    b[0].removeEventListener(a, q);
                                });
                            });
                        };
                        B();
                        var S = a.$eval(d[k + "Animation"]);
                        L.animation = angular.isDefined(S) ? !!S : o.animation;
                        var T = a.$eval(d[k + "AppendToBody"]);
                        I = angular.isDefined(T) ? T : I, I && a.$on("$locationChangeSuccess", function() {
                            L.isOpen && t();
                        }), a.$on("$destroy", function() {
                            s(), u(), R(), w(), n.remove(L), L = null;
                        });
                    };
                }
            };
        };
    } ];
}).directive("uibTooltipTemplateTransclude", [ "$animate", "$sce", "$compile", "$templateRequest", function(a, b, c, d) {
    return {
        link: function(e, f, g) {
            var h, i, j, k = e.$eval(g.tooltipTemplateTranscludeScope), l = 0, m = function() {
                i && (i.remove(), i = null), h && (h.$destroy(), h = null), j && (a.leave(j).then(function() {
                    i = null;
                }), i = j, j = null);
            };
            e.$watch(b.parseAsResourceUrl(g.uibTooltipTemplateTransclude), function(b) {
                var g = ++l;
                b ? (d(b, !0).then(function(d) {
                    if (g === l) {
                        var e = k.$new(), i = d, n = c(i)(e, function(b) {
                            m(), a.enter(b, f);
                        });
                        h = e, j = n, h.$emit("$includeContentLoaded", b);
                    }
                }, function() {
                    g === l && (m(), e.$emit("$includeContentError", b));
                }), e.$emit("$includeContentRequested", b)) : m();
            }), e.$on("$destroy", m);
        }
    };
} ]).directive("uibTooltipClasses", function() {
    return {
        restrict: "A",
        link: function(a, b, c) {
            a.placement && b.addClass(a.placement), a.popupClass && b.addClass(a.popupClass), 
            a.animation() && b.addClass(c.tooltipAnimationClass);
        }
    };
}).directive("uibTooltipPopup", function() {
    return {
        replace: !0,
        scope: {
            content: "@",
            placement: "@",
            popupClass: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/tooltip/tooltip-popup.html",
        link: function(a, b) {
            b.addClass("tooltip");
        }
    };
}).directive("uibTooltip", [ "$uibTooltip", function(a) {
    return a("uibTooltip", "tooltip", "mouseenter");
} ]).directive("uibTooltipTemplatePopup", function() {
    return {
        replace: !0,
        scope: {
            contentExp: "&",
            placement: "@",
            popupClass: "@",
            animation: "&",
            isOpen: "&",
            originScope: "&"
        },
        templateUrl: "template/tooltip/tooltip-template-popup.html",
        link: function(a, b) {
            b.addClass("tooltip");
        }
    };
}).directive("uibTooltipTemplate", [ "$uibTooltip", function(a) {
    return a("uibTooltipTemplate", "tooltip", "mouseenter", {
        useContentExp: !0
    });
} ]).directive("uibTooltipHtmlPopup", function() {
    return {
        replace: !0,
        scope: {
            contentExp: "&",
            placement: "@",
            popupClass: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/tooltip/tooltip-html-popup.html",
        link: function(a, b) {
            b.addClass("tooltip");
        }
    };
}).directive("uibTooltipHtml", [ "$uibTooltip", function(a) {
    return a("uibTooltipHtml", "tooltip", "mouseenter", {
        useContentExp: !0
    });
} ]), angular.module("ui.bootstrap.tooltip").value("$tooltipSuppressWarning", !1).provider("$tooltip", [ "$uibTooltipProvider", function(a) {
    angular.extend(this, a), this.$get = [ "$log", "$tooltipSuppressWarning", "$injector", function(b, c, d) {
        return c || b.warn("$tooltip is now deprecated. Use $uibTooltip instead."), d.invoke(a.$get);
    } ];
} ]).directive("tooltipTemplateTransclude", [ "$animate", "$sce", "$compile", "$templateRequest", "$log", "$tooltipSuppressWarning", function(a, b, c, d, e, f) {
    return {
        link: function(g, h, i) {
            f || e.warn("tooltip-template-transclude is now deprecated. Use uib-tooltip-template-transclude instead.");
            var j, k, l, m = g.$eval(i.tooltipTemplateTranscludeScope), n = 0, o = function() {
                k && (k.remove(), k = null), j && (j.$destroy(), j = null), l && (a.leave(l).then(function() {
                    k = null;
                }), k = l, l = null);
            };
            g.$watch(b.parseAsResourceUrl(i.tooltipTemplateTransclude), function(b) {
                var e = ++n;
                b ? (d(b, !0).then(function(d) {
                    if (e === n) {
                        var f = m.$new(), g = d, i = c(g)(f, function(b) {
                            o(), a.enter(b, h);
                        });
                        j = f, l = i, j.$emit("$includeContentLoaded", b);
                    }
                }, function() {
                    e === n && (o(), g.$emit("$includeContentError", b));
                }), g.$emit("$includeContentRequested", b)) : o();
            }), g.$on("$destroy", o);
        }
    };
} ]).directive("tooltipClasses", [ "$log", "$tooltipSuppressWarning", function(a, b) {
    return {
        restrict: "A",
        link: function(c, d, e) {
            b || a.warn("tooltip-classes is now deprecated. Use uib-tooltip-classes instead."), 
            c.placement && d.addClass(c.placement), c.popupClass && d.addClass(c.popupClass), 
            c.animation() && d.addClass(e.tooltipAnimationClass);
        }
    };
} ]).directive("tooltipPopup", [ "$log", "$tooltipSuppressWarning", function(a, b) {
    return {
        replace: !0,
        scope: {
            content: "@",
            placement: "@",
            popupClass: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/tooltip/tooltip-popup.html",
        link: function(c, d) {
            b || a.warn("tooltip-popup is now deprecated. Use uib-tooltip-popup instead."), 
            d.addClass("tooltip");
        }
    };
} ]).directive("tooltip", [ "$tooltip", function(a) {
    return a("tooltip", "tooltip", "mouseenter");
} ]).directive("tooltipTemplatePopup", [ "$log", "$tooltipSuppressWarning", function(a, b) {
    return {
        replace: !0,
        scope: {
            contentExp: "&",
            placement: "@",
            popupClass: "@",
            animation: "&",
            isOpen: "&",
            originScope: "&"
        },
        templateUrl: "template/tooltip/tooltip-template-popup.html",
        link: function(c, d) {
            b || a.warn("tooltip-template-popup is now deprecated. Use uib-tooltip-template-popup instead."), 
            d.addClass("tooltip");
        }
    };
} ]).directive("tooltipTemplate", [ "$tooltip", function(a) {
    return a("tooltipTemplate", "tooltip", "mouseenter", {
        useContentExp: !0
    });
} ]).directive("tooltipHtmlPopup", [ "$log", "$tooltipSuppressWarning", function(a, b) {
    return {
        replace: !0,
        scope: {
            contentExp: "&",
            placement: "@",
            popupClass: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/tooltip/tooltip-html-popup.html",
        link: function(c, d) {
            b || a.warn("tooltip-html-popup is now deprecated. Use uib-tooltip-html-popup instead."), 
            d.addClass("tooltip");
        }
    };
} ]).directive("tooltipHtml", [ "$tooltip", function(a) {
    return a("tooltipHtml", "tooltip", "mouseenter", {
        useContentExp: !0
    });
} ]), angular.module("ui.bootstrap.popover", [ "ui.bootstrap.tooltip" ]).directive("uibPopoverTemplatePopup", function() {
    return {
        replace: !0,
        scope: {
            title: "@",
            contentExp: "&",
            placement: "@",
            popupClass: "@",
            animation: "&",
            isOpen: "&",
            originScope: "&"
        },
        templateUrl: "template/popover/popover-template.html",
        link: function(a, b) {
            b.addClass("popover");
        }
    };
}).directive("uibPopoverTemplate", [ "$uibTooltip", function(a) {
    return a("uibPopoverTemplate", "popover", "click", {
        useContentExp: !0
    });
} ]).directive("uibPopoverHtmlPopup", function() {
    return {
        replace: !0,
        scope: {
            contentExp: "&",
            title: "@",
            placement: "@",
            popupClass: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/popover/popover-html.html",
        link: function(a, b) {
            b.addClass("popover");
        }
    };
}).directive("uibPopoverHtml", [ "$uibTooltip", function(a) {
    return a("uibPopoverHtml", "popover", "click", {
        useContentExp: !0
    });
} ]).directive("uibPopoverPopup", function() {
    return {
        replace: !0,
        scope: {
            title: "@",
            content: "@",
            placement: "@",
            popupClass: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/popover/popover.html",
        link: function(a, b) {
            b.addClass("popover");
        }
    };
}).directive("uibPopover", [ "$uibTooltip", function(a) {
    return a("uibPopover", "popover", "click");
} ]), angular.module("ui.bootstrap.popover").value("$popoverSuppressWarning", !1).directive("popoverTemplatePopup", [ "$log", "$popoverSuppressWarning", function(a, b) {
    return {
        replace: !0,
        scope: {
            title: "@",
            contentExp: "&",
            placement: "@",
            popupClass: "@",
            animation: "&",
            isOpen: "&",
            originScope: "&"
        },
        templateUrl: "template/popover/popover-template.html",
        link: function(c, d) {
            b || a.warn("popover-template-popup is now deprecated. Use uib-popover-template-popup instead."), 
            d.addClass("popover");
        }
    };
} ]).directive("popoverTemplate", [ "$tooltip", function(a) {
    return a("popoverTemplate", "popover", "click", {
        useContentExp: !0
    });
} ]).directive("popoverHtmlPopup", [ "$log", "$popoverSuppressWarning", function(a, b) {
    return {
        replace: !0,
        scope: {
            contentExp: "&",
            title: "@",
            placement: "@",
            popupClass: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/popover/popover-html.html",
        link: function(c, d) {
            b || a.warn("popover-html-popup is now deprecated. Use uib-popover-html-popup instead."), 
            d.addClass("popover");
        }
    };
} ]).directive("popoverHtml", [ "$tooltip", function(a) {
    return a("popoverHtml", "popover", "click", {
        useContentExp: !0
    });
} ]).directive("popoverPopup", [ "$log", "$popoverSuppressWarning", function(a, b) {
    return {
        replace: !0,
        scope: {
            title: "@",
            content: "@",
            placement: "@",
            popupClass: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/popover/popover.html",
        link: function(c, d) {
            b || a.warn("popover-popup is now deprecated. Use uib-popover-popup instead."), 
            d.addClass("popover");
        }
    };
} ]).directive("popover", [ "$tooltip", function(a) {
    return a("popover", "popover", "click");
} ]), angular.module("ui.bootstrap.progressbar", []).constant("uibProgressConfig", {
    animate: !0,
    max: 100
}).controller("UibProgressController", [ "$scope", "$attrs", "uibProgressConfig", function(a, b, c) {
    var d = this, e = angular.isDefined(b.animate) ? a.$parent.$eval(b.animate) : c.animate;
    this.bars = [], a.max = angular.isDefined(a.max) ? a.max : c.max, this.addBar = function(b, c, f) {
        e || c.css({
            transition: "none"
        }), this.bars.push(b), b.max = a.max, b.title = f && angular.isDefined(f.title) ? f.title : "progressbar", 
        b.$watch("value", function(a) {
            b.recalculatePercentage();
        }), b.recalculatePercentage = function() {
            var a = d.bars.reduce(function(a, b) {
                return b.percent = +(100 * b.value / b.max).toFixed(2), a + b.percent;
            }, 0);
            a > 100 && (b.percent -= a - 100);
        }, b.$on("$destroy", function() {
            c = null, d.removeBar(b);
        });
    }, this.removeBar = function(a) {
        this.bars.splice(this.bars.indexOf(a), 1), this.bars.forEach(function(a) {
            a.recalculatePercentage();
        });
    }, a.$watch("max", function(b) {
        d.bars.forEach(function(b) {
            b.max = a.max, b.recalculatePercentage();
        });
    });
} ]).directive("uibProgress", function() {
    return {
        replace: !0,
        transclude: !0,
        controller: "UibProgressController",
        require: "uibProgress",
        scope: {
            max: "=?"
        },
        templateUrl: "template/progressbar/progress.html"
    };
}).directive("uibBar", function() {
    return {
        replace: !0,
        transclude: !0,
        require: "^uibProgress",
        scope: {
            value: "=",
            type: "@"
        },
        templateUrl: "template/progressbar/bar.html",
        link: function(a, b, c, d) {
            d.addBar(a, b, c);
        }
    };
}).directive("uibProgressbar", function() {
    return {
        replace: !0,
        transclude: !0,
        controller: "UibProgressController",
        scope: {
            value: "=",
            max: "=?",
            type: "@"
        },
        templateUrl: "template/progressbar/progressbar.html",
        link: function(a, b, c, d) {
            d.addBar(a, angular.element(b.children()[0]), {
                title: c.title
            });
        }
    };
}), angular.module("ui.bootstrap.progressbar").value("$progressSuppressWarning", !1).controller("ProgressController", [ "$scope", "$attrs", "uibProgressConfig", "$log", "$progressSuppressWarning", function(a, b, c, d, e) {
    e || d.warn("ProgressController is now deprecated. Use UibProgressController instead.");
    var f = this, g = angular.isDefined(b.animate) ? a.$parent.$eval(b.animate) : c.animate;
    this.bars = [], a.max = angular.isDefined(a.max) ? a.max : c.max, this.addBar = function(b, c, d) {
        g || c.css({
            transition: "none"
        }), this.bars.push(b), b.max = a.max, b.title = d && angular.isDefined(d.title) ? d.title : "progressbar", 
        b.$watch("value", function(a) {
            b.recalculatePercentage();
        }), b.recalculatePercentage = function() {
            b.percent = +(100 * b.value / b.max).toFixed(2);
            var a = f.bars.reduce(function(a, b) {
                return a + b.percent;
            }, 0);
            a > 100 && (b.percent -= a - 100);
        }, b.$on("$destroy", function() {
            c = null, f.removeBar(b);
        });
    }, this.removeBar = function(a) {
        this.bars.splice(this.bars.indexOf(a), 1);
    }, a.$watch("max", function(b) {
        f.bars.forEach(function(b) {
            b.max = a.max, b.recalculatePercentage();
        });
    });
} ]).directive("progress", [ "$log", "$progressSuppressWarning", function(a, b) {
    return {
        replace: !0,
        transclude: !0,
        controller: "ProgressController",
        require: "progress",
        scope: {
            max: "=?",
            title: "@?"
        },
        templateUrl: "template/progressbar/progress.html",
        link: function() {
            b || a.warn("progress is now deprecated. Use uib-progress instead.");
        }
    };
} ]).directive("bar", [ "$log", "$progressSuppressWarning", function(a, b) {
    return {
        replace: !0,
        transclude: !0,
        require: "^progress",
        scope: {
            value: "=",
            type: "@"
        },
        templateUrl: "template/progressbar/bar.html",
        link: function(c, d, e, f) {
            b || a.warn("bar is now deprecated. Use uib-bar instead."), f.addBar(c, d);
        }
    };
} ]).directive("progressbar", [ "$log", "$progressSuppressWarning", function(a, b) {
    return {
        replace: !0,
        transclude: !0,
        controller: "ProgressController",
        scope: {
            value: "=",
            max: "=?",
            type: "@"
        },
        templateUrl: "template/progressbar/progressbar.html",
        link: function(c, d, e, f) {
            b || a.warn("progressbar is now deprecated. Use uib-progressbar instead."), f.addBar(c, angular.element(d.children()[0]), {
                title: e.title
            });
        }
    };
} ]), angular.module("ui.bootstrap.rating", []).constant("uibRatingConfig", {
    max: 5,
    stateOn: null,
    stateOff: null,
    titles: [ "one", "two", "three", "four", "five" ]
}).controller("UibRatingController", [ "$scope", "$attrs", "uibRatingConfig", function(a, b, c) {
    var d = {
        $setViewValue: angular.noop
    };
    this.init = function(e) {
        d = e, d.$render = this.render, d.$formatters.push(function(a) {
            return angular.isNumber(a) && a << 0 !== a && (a = Math.round(a)), a;
        }), this.stateOn = angular.isDefined(b.stateOn) ? a.$parent.$eval(b.stateOn) : c.stateOn, 
        this.stateOff = angular.isDefined(b.stateOff) ? a.$parent.$eval(b.stateOff) : c.stateOff;
        var f = angular.isDefined(b.titles) ? a.$parent.$eval(b.titles) : c.titles;
        this.titles = angular.isArray(f) && f.length > 0 ? f : c.titles;
        var g = angular.isDefined(b.ratingStates) ? a.$parent.$eval(b.ratingStates) : new Array(angular.isDefined(b.max) ? a.$parent.$eval(b.max) : c.max);
        a.range = this.buildTemplateObjects(g);
    }, this.buildTemplateObjects = function(a) {
        for (var b = 0, c = a.length; b < c; b++) a[b] = angular.extend({
            index: b
        }, {
            stateOn: this.stateOn,
            stateOff: this.stateOff,
            title: this.getTitle(b)
        }, a[b]);
        return a;
    }, this.getTitle = function(a) {
        return a >= this.titles.length ? a + 1 : this.titles[a];
    }, a.rate = function(b) {
        !a.readonly && b >= 0 && b <= a.range.length && (d.$setViewValue(d.$viewValue === b ? 0 : b), 
        d.$render());
    }, a.enter = function(b) {
        a.readonly || (a.value = b), a.onHover({
            value: b
        });
    }, a.reset = function() {
        a.value = d.$viewValue, a.onLeave();
    }, a.onKeydown = function(b) {
        /(37|38|39|40)/.test(b.which) && (b.preventDefault(), b.stopPropagation(), a.rate(a.value + (38 === b.which || 39 === b.which ? 1 : -1)));
    }, this.render = function() {
        a.value = d.$viewValue;
    };
} ]).directive("uibRating", function() {
    return {
        require: [ "uibRating", "ngModel" ],
        scope: {
            readonly: "=?",
            onHover: "&",
            onLeave: "&"
        },
        controller: "UibRatingController",
        templateUrl: "template/rating/rating.html",
        replace: !0,
        link: function(a, b, c, d) {
            var e = d[0], f = d[1];
            e.init(f);
        }
    };
}), angular.module("ui.bootstrap.rating").value("$ratingSuppressWarning", !1).controller("RatingController", [ "$scope", "$attrs", "$controller", "$log", "$ratingSuppressWarning", function(a, b, c, d, e) {
    e || d.warn("RatingController is now deprecated. Use UibRatingController instead."), 
    angular.extend(this, c("UibRatingController", {
        $scope: a,
        $attrs: b
    }));
} ]).directive("rating", [ "$log", "$ratingSuppressWarning", function(a, b) {
    return {
        require: [ "rating", "ngModel" ],
        scope: {
            readonly: "=?",
            onHover: "&",
            onLeave: "&"
        },
        controller: "RatingController",
        templateUrl: "template/rating/rating.html",
        replace: !0,
        link: function(c, d, e, f) {
            b || a.warn("rating is now deprecated. Use uib-rating instead.");
            var g = f[0], h = f[1];
            g.init(h);
        }
    };
} ]), angular.module("ui.bootstrap.tabs", []).controller("UibTabsetController", [ "$scope", function(a) {
    var b = this, c = b.tabs = a.tabs = [];
    b.select = function(a) {
        angular.forEach(c, function(b) {
            b.active && b !== a && (b.active = !1, b.onDeselect(), a.selectCalled = !1);
        }), a.active = !0, a.selectCalled || (a.onSelect(), a.selectCalled = !0);
    }, b.addTab = function(a) {
        c.push(a), 1 === c.length && a.active !== !1 ? a.active = !0 : a.active ? b.select(a) : a.active = !1;
    }, b.removeTab = function(a) {
        var e = c.indexOf(a);
        if (a.active && c.length > 1 && !d) {
            var f = e == c.length - 1 ? e - 1 : e + 1;
            b.select(c[f]);
        }
        c.splice(e, 1);
    };
    var d;
    a.$on("$destroy", function() {
        d = !0;
    });
} ]).directive("uibTabset", function() {
    return {
        restrict: "EA",
        transclude: !0,
        replace: !0,
        scope: {
            type: "@"
        },
        controller: "UibTabsetController",
        templateUrl: "template/tabs/tabset.html",
        link: function(a, b, c) {
            a.vertical = !!angular.isDefined(c.vertical) && a.$parent.$eval(c.vertical), a.justified = !!angular.isDefined(c.justified) && a.$parent.$eval(c.justified);
        }
    };
}).directive("uibTab", [ "$parse", function(a) {
    return {
        require: "^uibTabset",
        restrict: "EA",
        replace: !0,
        templateUrl: "template/tabs/tab.html",
        transclude: !0,
        scope: {
            active: "=?",
            heading: "@",
            onSelect: "&select",
            onDeselect: "&deselect"
        },
        controller: function() {},
        link: function(b, c, d, e, f) {
            b.$watch("active", function(a) {
                a && e.select(b);
            }), b.disabled = !1, d.disable && b.$parent.$watch(a(d.disable), function(a) {
                b.disabled = !!a;
            }), b.select = function() {
                b.disabled || (b.active = !0);
            }, e.addTab(b), b.$on("$destroy", function() {
                e.removeTab(b);
            }), b.$transcludeFn = f;
        }
    };
} ]).directive("uibTabHeadingTransclude", function() {
    return {
        restrict: "A",
        require: [ "?^uibTab", "?^tab" ],
        link: function(a, b) {
            a.$watch("headingElement", function(a) {
                a && (b.html(""), b.append(a));
            });
        }
    };
}).directive("uibTabContentTransclude", function() {
    function a(a) {
        return a.tagName && (a.hasAttribute("tab-heading") || a.hasAttribute("data-tab-heading") || a.hasAttribute("x-tab-heading") || a.hasAttribute("uib-tab-heading") || a.hasAttribute("data-uib-tab-heading") || a.hasAttribute("x-uib-tab-heading") || "tab-heading" === a.tagName.toLowerCase() || "data-tab-heading" === a.tagName.toLowerCase() || "x-tab-heading" === a.tagName.toLowerCase() || "uib-tab-heading" === a.tagName.toLowerCase() || "data-uib-tab-heading" === a.tagName.toLowerCase() || "x-uib-tab-heading" === a.tagName.toLowerCase());
    }
    return {
        restrict: "A",
        require: [ "?^uibTabset", "?^tabset" ],
        link: function(b, c, d) {
            var e = b.$eval(d.uibTabContentTransclude);
            e.$transcludeFn(e.$parent, function(b) {
                angular.forEach(b, function(b) {
                    a(b) ? e.headingElement = b : c.append(b);
                });
            });
        }
    };
}), angular.module("ui.bootstrap.tabs").value("$tabsSuppressWarning", !1).controller("TabsetController", [ "$scope", "$controller", "$log", "$tabsSuppressWarning", function(a, b, c, d) {
    d || c.warn("TabsetController is now deprecated. Use UibTabsetController instead."), 
    angular.extend(this, b("UibTabsetController", {
        $scope: a
    }));
} ]).directive("tabset", [ "$log", "$tabsSuppressWarning", function(a, b) {
    return {
        restrict: "EA",
        transclude: !0,
        replace: !0,
        scope: {
            type: "@"
        },
        controller: "TabsetController",
        templateUrl: "template/tabs/tabset.html",
        link: function(c, d, e) {
            b || a.warn("tabset is now deprecated. Use uib-tabset instead."), c.vertical = !!angular.isDefined(e.vertical) && c.$parent.$eval(e.vertical), 
            c.justified = !!angular.isDefined(e.justified) && c.$parent.$eval(e.justified);
        }
    };
} ]).directive("tab", [ "$parse", "$log", "$tabsSuppressWarning", function(a, b, c) {
    return {
        require: "^tabset",
        restrict: "EA",
        replace: !0,
        templateUrl: "template/tabs/tab.html",
        transclude: !0,
        scope: {
            active: "=?",
            heading: "@",
            onSelect: "&select",
            onDeselect: "&deselect"
        },
        controller: function() {},
        link: function(d, e, f, g, h) {
            c || b.warn("tab is now deprecated. Use uib-tab instead."), d.$watch("active", function(a) {
                a && g.select(d);
            }), d.disabled = !1, f.disable && d.$parent.$watch(a(f.disable), function(a) {
                d.disabled = !!a;
            }), d.select = function() {
                d.disabled || (d.active = !0);
            }, g.addTab(d), d.$on("$destroy", function() {
                g.removeTab(d);
            }), d.$transcludeFn = h;
        }
    };
} ]).directive("tabHeadingTransclude", [ "$log", "$tabsSuppressWarning", function(a, b) {
    return {
        restrict: "A",
        require: "^tab",
        link: function(c, d) {
            b || a.warn("tab-heading-transclude is now deprecated. Use uib-tab-heading-transclude instead."), 
            c.$watch("headingElement", function(a) {
                a && (d.html(""), d.append(a));
            });
        }
    };
} ]).directive("tabContentTransclude", [ "$log", "$tabsSuppressWarning", function(a, b) {
    function c(a) {
        return a.tagName && (a.hasAttribute("tab-heading") || a.hasAttribute("data-tab-heading") || a.hasAttribute("x-tab-heading") || "tab-heading" === a.tagName.toLowerCase() || "data-tab-heading" === a.tagName.toLowerCase() || "x-tab-heading" === a.tagName.toLowerCase());
    }
    return {
        restrict: "A",
        require: "^tabset",
        link: function(d, e, f) {
            b || a.warn("tab-content-transclude is now deprecated. Use uib-tab-content-transclude instead.");
            var g = d.$eval(f.tabContentTransclude);
            g.$transcludeFn(g.$parent, function(a) {
                angular.forEach(a, function(a) {
                    c(a) ? g.headingElement = a : e.append(a);
                });
            });
        }
    };
} ]), angular.module("ui.bootstrap.timepicker", []).constant("uibTimepickerConfig", {
    hourStep: 1,
    minuteStep: 1,
    showMeridian: !0,
    meridians: null,
    readonlyInput: !1,
    mousewheel: !0,
    arrowkeys: !0,
    showSpinners: !0
}).controller("UibTimepickerController", [ "$scope", "$element", "$attrs", "$parse", "$log", "$locale", "uibTimepickerConfig", function(a, b, c, d, e, f, g) {
    function h() {
        var b = parseInt(a.hours, 10), c = a.showMeridian ? b > 0 && b < 13 : b >= 0 && b < 24;
        if (c) return a.showMeridian && (12 === b && (b = 0), a.meridian === r[1] && (b += 12)), 
        b;
    }
    function i() {
        var b = parseInt(a.minutes, 10);
        return b >= 0 && b < 60 ? b : void 0;
    }
    function j(a) {
        return angular.isDefined(a) && a.toString().length < 2 ? "0" + a : a.toString();
    }
    function k(a) {
        l(), q.$setViewValue(new Date(p)), m(a);
    }
    function l() {
        q.$setValidity("time", !0), a.invalidHours = !1, a.invalidMinutes = !1;
    }
    function m(b) {
        var c = p.getHours(), d = p.getMinutes();
        a.showMeridian && (c = 0 === c || 12 === c ? 12 : c % 12), a.hours = "h" === b ? c : j(c), 
        "m" !== b && (a.minutes = j(d)), a.meridian = p.getHours() < 12 ? r[0] : r[1];
    }
    function n(a, b) {
        var c = new Date(a.getTime() + 6e4 * b), d = new Date(a);
        return d.setHours(c.getHours(), c.getMinutes()), d;
    }
    function o(a) {
        p = n(p, a), k();
    }
    var p = new Date(), q = {
        $setViewValue: angular.noop
    }, r = angular.isDefined(c.meridians) ? a.$parent.$eval(c.meridians) : g.meridians || f.DATETIME_FORMATS.AMPMS;
    a.tabindex = angular.isDefined(c.tabindex) ? c.tabindex : 0, b.removeAttr("tabindex"), 
    this.init = function(b, d) {
        q = b, q.$render = this.render, q.$formatters.unshift(function(a) {
            return a ? new Date(a) : null;
        });
        var e = d.eq(0), f = d.eq(1), h = angular.isDefined(c.mousewheel) ? a.$parent.$eval(c.mousewheel) : g.mousewheel;
        h && this.setupMousewheelEvents(e, f);
        var i = angular.isDefined(c.arrowkeys) ? a.$parent.$eval(c.arrowkeys) : g.arrowkeys;
        i && this.setupArrowkeyEvents(e, f), a.readonlyInput = angular.isDefined(c.readonlyInput) ? a.$parent.$eval(c.readonlyInput) : g.readonlyInput, 
        this.setupInputEvents(e, f);
    };
    var s = g.hourStep;
    c.hourStep && a.$parent.$watch(d(c.hourStep), function(a) {
        s = parseInt(a, 10);
    });
    var t = g.minuteStep;
    c.minuteStep && a.$parent.$watch(d(c.minuteStep), function(a) {
        t = parseInt(a, 10);
    });
    var u;
    a.$parent.$watch(d(c.min), function(a) {
        var b = new Date(a);
        u = isNaN(b) ? void 0 : b;
    });
    var v;
    a.$parent.$watch(d(c.max), function(a) {
        var b = new Date(a);
        v = isNaN(b) ? void 0 : b;
    }), a.noIncrementHours = function() {
        var a = n(p, 60 * s);
        return a > v || a < p && a < u;
    }, a.noDecrementHours = function() {
        var a = n(p, 60 * -s);
        return a < u || a > p && a > v;
    }, a.noIncrementMinutes = function() {
        var a = n(p, t);
        return a > v || a < p && a < u;
    }, a.noDecrementMinutes = function() {
        var a = n(p, -t);
        return a < u || a > p && a > v;
    }, a.noToggleMeridian = function() {
        return p.getHours() < 13 ? n(p, 720) > v : n(p, -720) < u;
    }, a.showMeridian = g.showMeridian, c.showMeridian && a.$parent.$watch(d(c.showMeridian), function(b) {
        if (a.showMeridian = !!b, q.$error.time) {
            var c = h(), d = i();
            angular.isDefined(c) && angular.isDefined(d) && (p.setHours(c), k());
        } else m();
    }), this.setupMousewheelEvents = function(b, c) {
        var d = function(a) {
            a.originalEvent && (a = a.originalEvent);
            var b = a.wheelDelta ? a.wheelDelta : -a.deltaY;
            return a.detail || b > 0;
        };
        b.bind("mousewheel wheel", function(b) {
            a.$apply(d(b) ? a.incrementHours() : a.decrementHours()), b.preventDefault();
        }), c.bind("mousewheel wheel", function(b) {
            a.$apply(d(b) ? a.incrementMinutes() : a.decrementMinutes()), b.preventDefault();
        });
    }, this.setupArrowkeyEvents = function(b, c) {
        b.bind("keydown", function(b) {
            38 === b.which ? (b.preventDefault(), a.incrementHours(), a.$apply()) : 40 === b.which && (b.preventDefault(), 
            a.decrementHours(), a.$apply());
        }), c.bind("keydown", function(b) {
            38 === b.which ? (b.preventDefault(), a.incrementMinutes(), a.$apply()) : 40 === b.which && (b.preventDefault(), 
            a.decrementMinutes(), a.$apply());
        });
    }, this.setupInputEvents = function(b, c) {
        if (a.readonlyInput) return a.updateHours = angular.noop, void (a.updateMinutes = angular.noop);
        var d = function(b, c) {
            q.$setViewValue(null), q.$setValidity("time", !1), angular.isDefined(b) && (a.invalidHours = b), 
            angular.isDefined(c) && (a.invalidMinutes = c);
        };
        a.updateHours = function() {
            var a = h(), b = i();
            angular.isDefined(a) && angular.isDefined(b) ? (p.setHours(a), p < u || p > v ? d(!0) : k("h")) : d(!0);
        }, b.bind("blur", function(b) {
            !a.invalidHours && a.hours < 10 && a.$apply(function() {
                a.hours = j(a.hours);
            });
        }), a.updateMinutes = function() {
            var a = i(), b = h();
            angular.isDefined(a) && angular.isDefined(b) ? (p.setMinutes(a), p < u || p > v ? d(void 0, !0) : k("m")) : d(void 0, !0);
        }, c.bind("blur", function(b) {
            !a.invalidMinutes && a.minutes < 10 && a.$apply(function() {
                a.minutes = j(a.minutes);
            });
        });
    }, this.render = function() {
        var b = q.$viewValue;
        isNaN(b) ? (q.$setValidity("time", !1), e.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : (b && (p = b), 
        p < u || p > v ? (q.$setValidity("time", !1), a.invalidHours = !0, a.invalidMinutes = !0) : l(), 
        m());
    }, a.showSpinners = angular.isDefined(c.showSpinners) ? a.$parent.$eval(c.showSpinners) : g.showSpinners, 
    a.incrementHours = function() {
        a.noIncrementHours() || o(60 * s);
    }, a.decrementHours = function() {
        a.noDecrementHours() || o(60 * -s);
    }, a.incrementMinutes = function() {
        a.noIncrementMinutes() || o(t);
    }, a.decrementMinutes = function() {
        a.noDecrementMinutes() || o(-t);
    }, a.toggleMeridian = function() {
        a.noToggleMeridian() || o(720 * (p.getHours() < 12 ? 1 : -1));
    };
} ]).directive("uibTimepicker", function() {
    return {
        restrict: "EA",
        require: [ "uibTimepicker", "?^ngModel" ],
        controller: "UibTimepickerController",
        controllerAs: "timepicker",
        replace: !0,
        scope: {},
        templateUrl: function(a, b) {
            return b.templateUrl || "template/timepicker/timepicker.html";
        },
        link: function(a, b, c, d) {
            var e = d[0], f = d[1];
            f && e.init(f, b.find("input"));
        }
    };
}), angular.module("ui.bootstrap.timepicker").value("$timepickerSuppressWarning", !1).controller("TimepickerController", [ "$scope", "$element", "$attrs", "$controller", "$log", "$timepickerSuppressWarning", function(a, b, c, d, e, f) {
    f || e.warn("TimepickerController is now deprecated. Use UibTimepickerController instead."), 
    angular.extend(this, d("UibTimepickerController", {
        $scope: a,
        $element: b,
        $attrs: c
    }));
} ]).directive("timepicker", [ "$log", "$timepickerSuppressWarning", function(a, b) {
    return {
        restrict: "EA",
        require: [ "timepicker", "?^ngModel" ],
        controller: "TimepickerController",
        controllerAs: "timepicker",
        replace: !0,
        scope: {},
        templateUrl: function(a, b) {
            return b.templateUrl || "template/timepicker/timepicker.html";
        },
        link: function(c, d, e, f) {
            b || a.warn("timepicker is now deprecated. Use uib-timepicker instead.");
            var g = f[0], h = f[1];
            h && g.init(h, d.find("input"));
        }
    };
} ]), angular.module("ui.bootstrap.typeahead", [ "ui.bootstrap.position" ]).factory("uibTypeaheadParser", [ "$parse", function(a) {
    var b = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
    return {
        parse: function(c) {
            var d = c.match(b);
            if (!d) throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "' + c + '".');
            return {
                itemName: d[3],
                source: a(d[4]),
                viewMapper: a(d[2] || d[1]),
                modelMapper: a(d[1])
            };
        }
    };
} ]).controller("UibTypeaheadController", [ "$scope", "$element", "$attrs", "$compile", "$parse", "$q", "$timeout", "$document", "$window", "$rootScope", "$uibPosition", "uibTypeaheadParser", function(a, b, c, d, e, f, g, h, i, j, k, l) {
    function m() {
        K.moveInProgress || (K.moveInProgress = !0, K.$digest()), S && g.cancel(S), S = g(function() {
            K.matches.length && n(), K.moveInProgress = !1;
        }, r);
    }
    function n() {
        K.position = C ? k.offset(b) : k.position(b), K.position.top += b.prop("offsetHeight");
    }
    var o, p, q = [ 9, 13, 27, 38, 40 ], r = 200, s = a.$eval(c.typeaheadMinLength);
    s || 0 === s || (s = 1);
    var t, u, v = a.$eval(c.typeaheadWaitMs) || 0, w = a.$eval(c.typeaheadEditable) !== !1, x = e(c.typeaheadLoading).assign || angular.noop, y = e(c.typeaheadOnSelect), z = !!angular.isDefined(c.typeaheadSelectOnBlur) && a.$eval(c.typeaheadSelectOnBlur), A = e(c.typeaheadNoResults).assign || angular.noop, B = c.typeaheadInputFormatter ? e(c.typeaheadInputFormatter) : void 0, C = !!c.typeaheadAppendToBody && a.$eval(c.typeaheadAppendToBody), D = c.typeaheadAppendToElementId || !1, E = a.$eval(c.typeaheadFocusFirst) !== !1, F = !!c.typeaheadSelectOnExact && a.$eval(c.typeaheadSelectOnExact), G = e(c.ngModel), H = e(c.ngModel + "($$$p)"), I = function(b, c) {
        return angular.isFunction(G(a)) && p && p.$options && p.$options.getterSetter ? H(b, {
            $$$p: c
        }) : G.assign(b, c);
    }, J = l.parse(c.uibTypeahead), K = a.$new(), L = a.$on("$destroy", function() {
        K.$destroy();
    });
    K.$on("$destroy", L);
    var M = "typeahead-" + K.$id + "-" + Math.floor(1e4 * Math.random());
    b.attr({
        "aria-autocomplete": "list",
        "aria-expanded": !1,
        "aria-owns": M
    });
    var N = angular.element("<div uib-typeahead-popup></div>");
    N.attr({
        id: M,
        matches: "matches",
        active: "activeIdx",
        select: "select(activeIdx)",
        "move-in-progress": "moveInProgress",
        query: "query",
        position: "position"
    }), angular.isDefined(c.typeaheadTemplateUrl) && N.attr("template-url", c.typeaheadTemplateUrl), 
    angular.isDefined(c.typeaheadPopupTemplateUrl) && N.attr("popup-template-url", c.typeaheadPopupTemplateUrl);
    var O = function() {
        K.matches = [], K.activeIdx = -1, b.attr("aria-expanded", !1);
    }, P = function(a) {
        return M + "-option-" + a;
    };
    K.$watch("activeIdx", function(a) {
        a < 0 ? b.removeAttr("aria-activedescendant") : b.attr("aria-activedescendant", P(a));
    });
    var Q = function(a, b) {
        return !!(K.matches.length > b && a) && a.toUpperCase() === K.matches[b].label.toUpperCase();
    }, R = function(c) {
        var d = {
            $viewValue: c
        };
        x(a, !0), A(a, !1), f.when(J.source(a, d)).then(function(e) {
            var f = c === o.$viewValue;
            if (f && t) if (e && e.length > 0) {
                K.activeIdx = E ? 0 : -1, A(a, !1), K.matches.length = 0;
                for (var g = 0; g < e.length; g++) d[J.itemName] = e[g], K.matches.push({
                    id: P(g),
                    label: J.viewMapper(K, d),
                    model: e[g]
                });
                K.query = c, n(), b.attr("aria-expanded", !0), F && 1 === K.matches.length && Q(c, 0) && K.select(0);
            } else O(), A(a, !0);
            f && x(a, !1);
        }, function() {
            O(), x(a, !1), A(a, !0);
        });
    };
    C && (angular.element(i).bind("resize", m), h.find("body").bind("scroll", m));
    var S;
    K.moveInProgress = !1, K.query = void 0;
    var T, U = function(a) {
        T = g(function() {
            R(a);
        }, v);
    }, V = function() {
        T && g.cancel(T);
    };
    O(), K.select = function(d) {
        var e, f, h = {};
        u = !0, h[J.itemName] = f = K.matches[d].model, e = J.modelMapper(a, h), I(a, e), 
        o.$setValidity("editable", !0), o.$setValidity("parse", !0), y(a, {
            $item: f,
            $model: e,
            $label: J.viewMapper(a, h)
        }), O(), K.$eval(c.typeaheadFocusOnSelect) !== !1 && g(function() {
            b[0].focus();
        }, 0, !1);
    }, b.bind("keydown", function(a) {
        if (0 !== K.matches.length && q.indexOf(a.which) !== -1) {
            if (K.activeIdx === -1 && (9 === a.which || 13 === a.which)) return O(), void K.$digest();
            a.preventDefault(), 40 === a.which ? (K.activeIdx = (K.activeIdx + 1) % K.matches.length, 
            K.$digest()) : 38 === a.which ? (K.activeIdx = (K.activeIdx > 0 ? K.activeIdx : K.matches.length) - 1, 
            K.$digest()) : 13 === a.which || 9 === a.which ? K.$apply(function() {
                K.select(K.activeIdx);
            }) : 27 === a.which && (a.stopPropagation(), O(), K.$digest());
        }
    }), b.bind("blur", function() {
        z && K.matches.length && K.activeIdx !== -1 && !u && (u = !0, K.$apply(function() {
            K.select(K.activeIdx);
        })), t = !1, u = !1;
    });
    var W = function(a) {
        b[0] !== a.target && 3 !== a.which && 0 !== K.matches.length && (O(), j.$$phase || K.$digest());
    };
    h.bind("click", W), a.$on("$destroy", function() {
        h.unbind("click", W), (C || D) && X.remove(), C && (angular.element(i).unbind("resize", m), 
        h.find("body").unbind("scroll", m)), N.remove();
    });
    var X = d(N)(K);
    C ? h.find("body").append(X) : D !== !1 ? angular.element(h[0].getElementById(D)).append(X) : b.after(X), 
    this.init = function(b, c) {
        o = b, p = c, o.$parsers.unshift(function(b) {
            return t = !0, 0 === s || b && b.length >= s ? v > 0 ? (V(), U(b)) : R(b) : (x(a, !1), 
            V(), O()), w ? b : b ? void o.$setValidity("editable", !1) : (o.$setValidity("editable", !0), 
            null);
        }), o.$formatters.push(function(b) {
            var c, d, e = {};
            return w || o.$setValidity("editable", !0), B ? (e.$model = b, B(a, e)) : (e[J.itemName] = b, 
            c = J.viewMapper(a, e), e[J.itemName] = void 0, d = J.viewMapper(a, e), c !== d ? c : b);
        });
    };
} ]).directive("uibTypeahead", function() {
    return {
        controller: "UibTypeaheadController",
        require: [ "ngModel", "^?ngModelOptions", "uibTypeahead" ],
        link: function(a, b, c, d) {
            d[2].init(d[0], d[1]);
        }
    };
}).directive("uibTypeaheadPopup", function() {
    return {
        scope: {
            matches: "=",
            query: "=",
            active: "=",
            position: "&",
            moveInProgress: "=",
            select: "&"
        },
        replace: !0,
        templateUrl: function(a, b) {
            return b.popupTemplateUrl || "template/typeahead/typeahead-popup.html";
        },
        link: function(a, b, c) {
            a.templateUrl = c.templateUrl, a.isOpen = function() {
                return a.matches.length > 0;
            }, a.isActive = function(b) {
                return a.active == b;
            }, a.selectActive = function(b) {
                a.active = b;
            }, a.selectMatch = function(b) {
                a.select({
                    activeIdx: b
                });
            };
        }
    };
}).directive("uibTypeaheadMatch", [ "$templateRequest", "$compile", "$parse", function(a, b, c) {
    return {
        scope: {
            index: "=",
            match: "=",
            query: "="
        },
        link: function(d, e, f) {
            var g = c(f.templateUrl)(d.$parent) || "template/typeahead/typeahead-match.html";
            a(g).then(function(a) {
                b(a.trim())(d, function(a) {
                    e.replaceWith(a);
                });
            });
        }
    };
} ]).filter("uibTypeaheadHighlight", [ "$sce", "$injector", "$log", function(a, b, c) {
    function d(a) {
        return a.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }
    function e(a) {
        return /<.*>/g.test(a);
    }
    var f;
    return f = b.has("$sanitize"), function(b, g) {
        return !f && e(b) && c.warn("Unsafe use of typeahead please use ngSanitize"), b = g ? ("" + b).replace(new RegExp(d(g), "gi"), "<strong>$&</strong>") : b, 
        f || (b = a.trustAsHtml(b)), b;
    };
} ]), angular.module("ui.bootstrap.typeahead").value("$typeaheadSuppressWarning", !1).service("typeaheadParser", [ "$parse", "uibTypeaheadParser", "$log", "$typeaheadSuppressWarning", function(a, b, c, d) {
    return d || c.warn("typeaheadParser is now deprecated. Use uibTypeaheadParser instead."), 
    b;
} ]).directive("typeahead", [ "$compile", "$parse", "$q", "$timeout", "$document", "$window", "$rootScope", "$uibPosition", "typeaheadParser", "$log", "$typeaheadSuppressWarning", function(a, b, c, d, e, f, g, h, i, j, k) {
    var l = [ 9, 13, 27, 38, 40 ], m = 200;
    return {
        require: [ "ngModel", "^?ngModelOptions" ],
        link: function(n, o, p, q) {
            function r() {
                N.moveInProgress || (N.moveInProgress = !0, N.$digest()), V && d.cancel(V), V = d(function() {
                    N.matches.length && s(), N.moveInProgress = !1;
                }, m);
            }
            function s() {
                N.position = F ? h.offset(o) : h.position(o), N.position.top += o.prop("offsetHeight");
            }
            k || j.warn("typeahead is now deprecated. Use uib-typeahead instead.");
            var t = q[0], u = q[1], v = n.$eval(p.typeaheadMinLength);
            v || 0 === v || (v = 1);
            var w, x, y = n.$eval(p.typeaheadWaitMs) || 0, z = n.$eval(p.typeaheadEditable) !== !1, A = b(p.typeaheadLoading).assign || angular.noop, B = b(p.typeaheadOnSelect), C = !!angular.isDefined(p.typeaheadSelectOnBlur) && n.$eval(p.typeaheadSelectOnBlur), D = b(p.typeaheadNoResults).assign || angular.noop, E = p.typeaheadInputFormatter ? b(p.typeaheadInputFormatter) : void 0, F = !!p.typeaheadAppendToBody && n.$eval(p.typeaheadAppendToBody), G = p.typeaheadAppendToElementId || !1, H = n.$eval(p.typeaheadFocusFirst) !== !1, I = !!p.typeaheadSelectOnExact && n.$eval(p.typeaheadSelectOnExact), J = b(p.ngModel), K = b(p.ngModel + "($$$p)"), L = function(a, b) {
                return angular.isFunction(J(n)) && u && u.$options && u.$options.getterSetter ? K(a, {
                    $$$p: b
                }) : J.assign(a, b);
            }, M = i.parse(p.typeahead), N = n.$new(), O = n.$on("$destroy", function() {
                N.$destroy();
            });
            N.$on("$destroy", O);
            var P = "typeahead-" + N.$id + "-" + Math.floor(1e4 * Math.random());
            o.attr({
                "aria-autocomplete": "list",
                "aria-expanded": !1,
                "aria-owns": P
            });
            var Q = angular.element("<div typeahead-popup></div>");
            Q.attr({
                id: P,
                matches: "matches",
                active: "activeIdx",
                select: "select(activeIdx)",
                "move-in-progress": "moveInProgress",
                query: "query",
                position: "position"
            }), angular.isDefined(p.typeaheadTemplateUrl) && Q.attr("template-url", p.typeaheadTemplateUrl), 
            angular.isDefined(p.typeaheadPopupTemplateUrl) && Q.attr("popup-template-url", p.typeaheadPopupTemplateUrl);
            var R = function() {
                N.matches = [], N.activeIdx = -1, o.attr("aria-expanded", !1);
            }, S = function(a) {
                return P + "-option-" + a;
            };
            N.$watch("activeIdx", function(a) {
                a < 0 ? o.removeAttr("aria-activedescendant") : o.attr("aria-activedescendant", S(a));
            });
            var T = function(a, b) {
                return !!(N.matches.length > b && a) && a.toUpperCase() === N.matches[b].label.toUpperCase();
            }, U = function(a) {
                var b = {
                    $viewValue: a
                };
                A(n, !0), D(n, !1), c.when(M.source(n, b)).then(function(c) {
                    var d = a === t.$viewValue;
                    if (d && w) if (c && c.length > 0) {
                        N.activeIdx = H ? 0 : -1, D(n, !1), N.matches.length = 0;
                        for (var e = 0; e < c.length; e++) b[M.itemName] = c[e], N.matches.push({
                            id: S(e),
                            label: M.viewMapper(N, b),
                            model: c[e]
                        });
                        N.query = a, s(), o.attr("aria-expanded", !0), I && 1 === N.matches.length && T(a, 0) && N.select(0);
                    } else R(), D(n, !0);
                    d && A(n, !1);
                }, function() {
                    R(), A(n, !1), D(n, !0);
                });
            };
            F && (angular.element(f).bind("resize", r), e.find("body").bind("scroll", r));
            var V;
            N.moveInProgress = !1, R(), N.query = void 0;
            var W, X = function(a) {
                W = d(function() {
                    U(a);
                }, y);
            }, Y = function() {
                W && d.cancel(W);
            };
            t.$parsers.unshift(function(a) {
                return w = !0, 0 === v || a && a.length >= v ? y > 0 ? (Y(), X(a)) : U(a) : (A(n, !1), 
                Y(), R()), z ? a : a ? void t.$setValidity("editable", !1) : (t.$setValidity("editable", !0), 
                null);
            }), t.$formatters.push(function(a) {
                var b, c, d = {};
                return z || t.$setValidity("editable", !0), E ? (d.$model = a, E(n, d)) : (d[M.itemName] = a, 
                b = M.viewMapper(n, d), d[M.itemName] = void 0, c = M.viewMapper(n, d), b !== c ? b : a);
            }), N.select = function(a) {
                var b, c, e = {};
                x = !0, e[M.itemName] = c = N.matches[a].model, b = M.modelMapper(n, e), L(n, b), 
                t.$setValidity("editable", !0), t.$setValidity("parse", !0), B(n, {
                    $item: c,
                    $model: b,
                    $label: M.viewMapper(n, e)
                }), R(), N.$eval(p.typeaheadFocusOnSelect) !== !1 && d(function() {
                    o[0].focus();
                }, 0, !1);
            }, o.bind("keydown", function(a) {
                if (0 !== N.matches.length && l.indexOf(a.which) !== -1) {
                    if (N.activeIdx === -1 && (9 === a.which || 13 === a.which)) return R(), void N.$digest();
                    a.preventDefault(), 40 === a.which ? (N.activeIdx = (N.activeIdx + 1) % N.matches.length, 
                    N.$digest()) : 38 === a.which ? (N.activeIdx = (N.activeIdx > 0 ? N.activeIdx : N.matches.length) - 1, 
                    N.$digest()) : 13 === a.which || 9 === a.which ? N.$apply(function() {
                        N.select(N.activeIdx);
                    }) : 27 === a.which && (a.stopPropagation(), R(), N.$digest());
                }
            }), o.bind("blur", function() {
                C && N.matches.length && N.activeIdx !== -1 && !x && (x = !0, N.$apply(function() {
                    N.select(N.activeIdx);
                })), w = !1, x = !1;
            });
            var Z = function(a) {
                o[0] !== a.target && 3 !== a.which && 0 !== N.matches.length && (R(), g.$$phase || N.$digest());
            };
            e.bind("click", Z), n.$on("$destroy", function() {
                e.unbind("click", Z), (F || G) && $.remove(), F && (angular.element(f).unbind("resize", r), 
                e.find("body").unbind("scroll", r)), Q.remove();
            });
            var $ = a(Q)(N);
            F ? e.find("body").append($) : G !== !1 ? angular.element(e[0].getElementById(G)).append($) : o.after($);
        }
    };
} ]).directive("typeaheadPopup", [ "$typeaheadSuppressWarning", "$log", function(a, b) {
    return {
        scope: {
            matches: "=",
            query: "=",
            active: "=",
            position: "&",
            moveInProgress: "=",
            select: "&"
        },
        replace: !0,
        templateUrl: function(a, b) {
            return b.popupTemplateUrl || "template/typeahead/typeahead-popup.html";
        },
        link: function(c, d, e) {
            a || b.warn("typeahead-popup is now deprecated. Use uib-typeahead-popup instead."), 
            c.templateUrl = e.templateUrl, c.isOpen = function() {
                return c.matches.length > 0;
            }, c.isActive = function(a) {
                return c.active == a;
            }, c.selectActive = function(a) {
                c.active = a;
            }, c.selectMatch = function(a) {
                c.select({
                    activeIdx: a
                });
            };
        }
    };
} ]).directive("typeaheadMatch", [ "$templateRequest", "$compile", "$parse", "$typeaheadSuppressWarning", "$log", function(a, b, c, d, e) {
    return {
        restrict: "EA",
        scope: {
            index: "=",
            match: "=",
            query: "="
        },
        link: function(f, g, h) {
            d || e.warn("typeahead-match is now deprecated. Use uib-typeahead-match instead.");
            var i = c(h.templateUrl)(f.$parent) || "template/typeahead/typeahead-match.html";
            a(i).then(function(a) {
                b(a.trim())(f, function(a) {
                    g.replaceWith(a);
                });
            });
        }
    };
} ]).filter("typeaheadHighlight", [ "$sce", "$injector", "$log", "$typeaheadSuppressWarning", function(a, b, c, d) {
    function e(a) {
        return a.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }
    function f(a) {
        return /<.*>/g.test(a);
    }
    var g;
    return g = b.has("$sanitize"), function(b, h) {
        return d || c.warn("typeaheadHighlight is now deprecated. Use uibTypeaheadHighlight instead."), 
        !g && f(b) && c.warn("Unsafe use of typeahead please use ngSanitize"), b = h ? ("" + b).replace(new RegExp(e(h), "gi"), "<strong>$&</strong>") : b, 
        g || (b = a.trustAsHtml(b)), b;
    };
} ]), angular.module("template/accordion/accordion-group.html", []).run([ "$templateCache", function(a) {
    a.put("template/accordion/accordion-group.html", '<div class="panel {{panelClass || \'panel-default\'}}">\n  <div class="panel-heading" ng-keypress="toggleOpen($event)">\n    <h4 class="panel-title">\n      <a href tabindex="0" class="accordion-toggle" ng-click="toggleOpen()" uib-accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n    </h4>\n  </div>\n  <div class="panel-collapse collapse" uib-collapse="!isOpen">\n\t  <div class="panel-body" ng-transclude></div>\n  </div>\n</div>\n');
} ]), angular.module("template/accordion/accordion.html", []).run([ "$templateCache", function(a) {
    a.put("template/accordion/accordion.html", '<div class="panel-group" ng-transclude></div>');
} ]), angular.module("template/alert/alert.html", []).run([ "$templateCache", function(a) {
    a.put("template/alert/alert.html", '<div class="alert" ng-class="[\'alert-\' + (type || \'warning\'), closeable ? \'alert-dismissible\' : null]" role="alert">\n    <button ng-show="closeable" type="button" class="close" ng-click="close({$event: $event})">\n        <span aria-hidden="true">&times;</span>\n        <span class="sr-only">Close</span>\n    </button>\n    <div ng-transclude></div>\n</div>\n');
} ]), angular.module("template/carousel/carousel.html", []).run([ "$templateCache", function(a) {
    a.put("template/carousel/carousel.html", '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n  <div class="carousel-inner" ng-transclude></div>\n  <a role="button" href class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1">\n    <span aria-hidden="true" class="glyphicon glyphicon-chevron-left"></span>\n    <span class="sr-only">previous</span>\n  </a>\n  <a role="button" href class="right carousel-control" ng-click="next()" ng-show="slides.length > 1">\n    <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>\n    <span class="sr-only">next</span>\n  </a>\n  <ol class="carousel-indicators" ng-show="slides.length > 1">\n    <li ng-repeat="slide in slides | orderBy:indexOfSlide track by $index" ng-class="{ active: isActive(slide) }" ng-click="select(slide)">\n      <span class="sr-only">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if="isActive(slide)">, currently active</span></span>\n    </li>\n  </ol>\n</div>');
} ]), angular.module("template/carousel/slide.html", []).run([ "$templateCache", function(a) {
    a.put("template/carousel/slide.html", '<div ng-class="{\n    \'active\': active\n  }" class="item text-center" ng-transclude></div>\n');
} ]), angular.module("template/datepicker/datepicker.html", []).run([ "$templateCache", function(a) {
    a.put("template/datepicker/datepicker.html", '<div ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n  <uib-daypicker ng-switch-when="day" tabindex="0"></uib-daypicker>\n  <uib-monthpicker ng-switch-when="month" tabindex="0"></uib-monthpicker>\n  <uib-yearpicker ng-switch-when="year" tabindex="0"></uib-yearpicker>\n</div>');
} ]), angular.module("template/datepicker/day.html", []).run([ "$templateCache", function(a) {
    a.put("template/datepicker/day.html", '<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{::5 + showWeeks}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-if="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in ::labels track by $index" class="text-center"><small aria-label="{{::label.full}}">{{::label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-if="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{::dt.uid}}" ng-class="::dt.customClass">\n        <button type="button" style="min-width:100%;" class="btn btn-default btn-sm" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="::{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n');
} ]), angular.module("template/datepicker/month.html", []).run([ "$templateCache", function(a) {
    a.put("template/datepicker/month.html", '<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{::dt.uid}}" ng-class="::dt.customClass">\n        <button type="button" style="min-width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n');
} ]), angular.module("template/datepicker/popup.html", []).run([ "$templateCache", function(a) {
    a.put("template/datepicker/popup.html", '<ul class="dropdown-menu" dropdown-nested ng-if="isOpen" style="display: block" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" ng-keydown="keydown($event)" ng-click="$event.stopPropagation()">\n\t<li ng-transclude></li>\n\t<li ng-if="showButtonBar" style="padding:10px 9px 2px">\n\t\t<span class="btn-group pull-left">\n\t\t\t<button type="button" class="btn btn-sm btn-info" ng-click="select(\'today\')" ng-disabled="isDisabled(\'today\')">{{ getText(\'current\') }}</button>\n\t\t\t<button type="button" class="btn btn-sm btn-danger" ng-click="select(null)">{{ getText(\'clear\') }}</button>\n\t\t</span>\n\t\t<button type="button" class="btn btn-sm btn-success pull-right" ng-click="close()">{{ getText(\'close\') }}</button>\n\t</li>\n</ul>\n');
} ]), angular.module("template/datepicker/year.html", []).run([ "$templateCache", function(a) {
    a.put("template/datepicker/year.html", '<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="3"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{::dt.uid}}" ng-class="::dt.customClass">\n        <button type="button" style="min-width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n');
} ]), angular.module("template/modal/backdrop.html", []).run([ "$templateCache", function(a) {
    a.put("template/modal/backdrop.html", '<div uib-modal-animation-class="fade"\n     modal-in-class="in"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n');
} ]), angular.module("template/modal/window.html", []).run([ "$templateCache", function(a) {
    a.put("template/modal/window.html", '<div modal-render="{{$isRendered}}" tabindex="-1" role="dialog" class="modal"\n    uib-modal-animation-class="fade"\n    modal-in-class="in"\n    ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}">\n    <div class="modal-dialog" ng-class="size ? \'modal-\' + size : \'\'"><div class="modal-content" uib-modal-transclude></div></div>\n</div>\n');
} ]), angular.module("template/pagination/pager.html", []).run([ "$templateCache", function(a) {
    a.put("template/pagination/pager.html", '<ul class="pager">\n  <li ng-class="{disabled: noPrevious()||ngDisabled, previous: align}"><a href ng-click="selectPage(page - 1, $event)">{{::getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext()||ngDisabled, next: align}"><a href ng-click="selectPage(page + 1, $event)">{{::getText(\'next\')}}</a></li>\n</ul>\n');
} ]), angular.module("template/pagination/pagination.html", []).run([ "$templateCache", function(a) {
    a.put("template/pagination/pagination.html", '<ul class="pagination">\n  <li ng-if="::boundaryLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-first"><a href ng-click="selectPage(1, $event)">{{::getText(\'first\')}}</a></li>\n  <li ng-if="::directionLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-prev"><a href ng-click="selectPage(page - 1, $event)">{{::getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active,disabled: ngDisabled&&!page.active}" class="pagination-page"><a href ng-click="selectPage(page.number, $event)">{{page.text}}</a></li>\n  <li ng-if="::directionLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-next"><a href ng-click="selectPage(page + 1, $event)">{{::getText(\'next\')}}</a></li>\n  <li ng-if="::boundaryLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-last"><a href ng-click="selectPage(totalPages, $event)">{{::getText(\'last\')}}</a></li>\n</ul>\n');
} ]), angular.module("template/tooltip/tooltip-html-popup.html", []).run([ "$templateCache", function(a) {
    a.put("template/tooltip/tooltip-html-popup.html", '<div\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind-html="contentExp()"></div>\n</div>\n');
} ]), angular.module("template/tooltip/tooltip-popup.html", []).run([ "$templateCache", function(a) {
    a.put("template/tooltip/tooltip-popup.html", '<div\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n');
} ]), angular.module("template/tooltip/tooltip-template-popup.html", []).run([ "$templateCache", function(a) {
    a.put("template/tooltip/tooltip-template-popup.html", '<div\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner"\n    uib-tooltip-template-transclude="contentExp()"\n    tooltip-template-transclude-scope="originScope()"></div>\n</div>\n');
} ]), angular.module("template/popover/popover-html.html", []).run([ "$templateCache", function(a) {
    a.put("template/popover/popover-html.html", '<div tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-if="title"></h3>\n      <div class="popover-content" ng-bind-html="contentExp()"></div>\n  </div>\n</div>\n');
} ]), angular.module("template/popover/popover-template.html", []).run([ "$templateCache", function(a) {
    a.put("template/popover/popover-template.html", '<div tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-if="title"></h3>\n      <div class="popover-content"\n        uib-tooltip-template-transclude="contentExp()"\n        tooltip-template-transclude-scope="originScope()"></div>\n  </div>\n</div>\n');
} ]), angular.module("template/popover/popover.html", []).run([ "$templateCache", function(a) {
    a.put("template/popover/popover.html", '<div tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-if="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n');
} ]), angular.module("template/progressbar/bar.html", []).run([ "$templateCache", function(a) {
    a.put("template/progressbar/bar.html", '<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" style="min-width: 0;" ng-transclude></div>\n');
} ]), angular.module("template/progressbar/progress.html", []).run([ "$templateCache", function(a) {
    a.put("template/progressbar/progress.html", '<div class="progress" ng-transclude aria-labelledby="{{::title}}"></div>');
} ]), angular.module("template/progressbar/progressbar.html", []).run([ "$templateCache", function(a) {
    a.put("template/progressbar/progressbar.html", '<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" style="min-width: 0;" ng-transclude></div>\n</div>\n');
} ]), angular.module("template/rating/rating.html", []).run([ "$templateCache", function(a) {
    a.put("template/rating/rating.html", '<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}">\n    <span ng-repeat-start="r in range track by $index" class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    <i ng-repeat-end ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')" ng-attr-title="{{r.title}}" aria-valuetext="{{r.title}}"></i>\n</span>\n');
} ]), angular.module("template/tabs/tab.html", []).run([ "$templateCache", function(a) {
    a.put("template/tabs/tab.html", '<li ng-class="{active: active, disabled: disabled}">\n  <a href ng-click="select()" uib-tab-heading-transclude>{{heading}}</a>\n</li>\n');
} ]), angular.module("template/tabs/tabset.html", []).run([ "$templateCache", function(a) {
    a.put("template/tabs/tabset.html", '<div>\n  <ul class="nav nav-{{type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         uib-tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n');
} ]), angular.module("template/timepicker/timepicker.html", []).run([ "$templateCache", function(a) {
    a.put("template/timepicker/timepicker.html", '<table>\n  <tbody>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td><a ng-click="incrementHours()" ng-class="{disabled: noIncrementHours()}" class="btn btn-link" ng-disabled="noIncrementHours()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td>&nbsp;</td>\n      <td><a ng-click="incrementMinutes()" ng-class="{disabled: noIncrementMinutes()}" class="btn btn-link" ng-disabled="noIncrementMinutes()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n    <tr>\n      <td class="form-group" ng-class="{\'has-error\': invalidHours}">\n        <input style="width:50px;" type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}">\n      </td>\n      <td>:</td>\n      <td class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n        <input style="width:50px;" type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}">\n      </td>\n      <td ng-show="showMeridian"><button type="button" ng-class="{disabled: noToggleMeridian()}" class="btn btn-default text-center" ng-click="toggleMeridian()" ng-disabled="noToggleMeridian()" tabindex="{{::tabindex}}">{{meridian}}</button></td>\n    </tr>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td><a ng-click="decrementHours()" ng-class="{disabled: noDecrementHours()}" class="btn btn-link" ng-disabled="noDecrementHours()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td>&nbsp;</td>\n      <td><a ng-click="decrementMinutes()" ng-class="{disabled: noDecrementMinutes()}" class="btn btn-link" ng-disabled="noDecrementMinutes()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n  </tbody>\n</table>\n');
} ]), angular.module("template/typeahead/typeahead-match.html", []).run([ "$templateCache", function(a) {
    a.put("template/typeahead/typeahead-match.html", '<a href tabindex="-1" ng-bind-html="match.label | uibTypeaheadHighlight:query"></a>\n');
} ]), angular.module("template/typeahead/typeahead-popup.html", []).run([ "$templateCache", function(a) {
    a.put("template/typeahead/typeahead-popup.html", '<ul class="dropdown-menu" ng-show="isOpen() && !moveInProgress" ng-style="{top: position().top+\'px\', left: position().left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{::match.id}}">\n        <div uib-typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n');
} ]), !angular.$$csp() && angular.element(document).find("head").prepend('<style type="text/css">.ng-animate.item:not(.left):not(.right){-webkit-transition:0s ease-in-out left;transition:0s ease-in-out left}</style>'), 
!function(a, b) {
    "function" == typeof define && define.amd ? define([], function() {
        return b();
    }) : "object" == typeof exports ? module.exports = b() : b();
}(this, function() {
    function a(a) {
        var b = a.storageKey(), c = a.storage(), d = function() {
            var d = a.preferredLanguage();
            angular.isString(d) ? a.use(d) : c.put(b, a.use());
        };
        d.displayName = "fallbackFromIncorrectStorageValue", c ? c.get(b) ? a.use(c.get(b))["catch"](d) : d() : angular.isString(a.preferredLanguage()) && a.use(a.preferredLanguage());
    }
    function b() {
        var a, b, c = null, d = !1, e = !1;
        b = {
            sanitize: function(a, b) {
                return "text" === b && (a = g(a)), a;
            },
            escape: function(a, b) {
                return "text" === b && (a = f(a)), a;
            },
            sanitizeParameters: function(a, b) {
                return "params" === b && (a = h(a, g)), a;
            },
            escapeParameters: function(a, b) {
                return "params" === b && (a = h(a, f)), a;
            }
        }, b.escaped = b.escapeParameters, this.addStrategy = function(a, c) {
            return b[a] = c, this;
        }, this.removeStrategy = function(a) {
            return delete b[a], this;
        }, this.useStrategy = function(a) {
            return d = !0, c = a, this;
        }, this.$get = [ "$injector", "$log", function(f, g) {
            var h = {}, i = function(a, c, d) {
                return angular.forEach(d, function(d) {
                    if (angular.isFunction(d)) a = d(a, c); else if (angular.isFunction(b[d])) a = b[d](a, c); else {
                        if (!angular.isString(b[d])) throw new Error("pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: '" + d + "'");
                        if (!h[b[d]]) try {
                            h[b[d]] = f.get(b[d]);
                        } catch (e) {
                            throw h[b[d]] = function() {}, new Error("pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: '" + d + "'");
                        }
                        a = h[b[d]](a, c);
                    }
                }), a;
            }, j = function() {
                d || e || (g.warn("pascalprecht.translate.$translateSanitization: No sanitization strategy has been configured. This can have serious security implications. See http://angular-translate.github.io/docs/#/guide/19_security for details."), 
                e = !0);
            };
            return f.has("$sanitize") && (a = f.get("$sanitize")), {
                useStrategy: function(a) {
                    return function(b) {
                        a.useStrategy(b);
                    };
                }(this),
                sanitize: function(a, b, d) {
                    if (c || j(), arguments.length < 3 && (d = c), !d) return a;
                    var e = angular.isArray(d) ? d : [ d ];
                    return i(a, b, e);
                }
            };
        } ];
        var f = function(a) {
            var b = angular.element("<div></div>");
            return b.text(a), b.html();
        }, g = function(b) {
            if (!a) throw new Error("pascalprecht.translate.$translateSanitization: Error cannot find $sanitize service. Either include the ngSanitize module (https://docs.angularjs.org/api/ngSanitize) or use a sanitization strategy which does not depend on $sanitize, such as 'escape'.");
            return a(b);
        }, h = function(a, b, c) {
            if (angular.isObject(a)) {
                var d = angular.isArray(a) ? [] : {};
                if (c) {
                    if (c.indexOf(a) > -1) throw new Error("pascalprecht.translate.$translateSanitization: Error cannot interpolate parameter due recursive object");
                } else c = [];
                return c.push(a), angular.forEach(a, function(a, e) {
                    d[e] = h(a, b, c);
                }), c.splice(-1, 1), d;
            }
            return angular.isNumber(a) ? a : b(a);
        };
    }
    function c(a, b, c, d) {
        var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = {}, v = [], w = a, x = [], y = "translate-cloak", z = !1, A = !1, B = ".", C = !1, D = 0, E = !0, F = "default", G = {
            "default": function(a) {
                return (a || "").split("-").join("_");
            },
            java: function(a) {
                var b = (a || "").split("-").join("_"), c = b.split("_");
                return c.length > 1 ? c[0].toLowerCase() + "_" + c[1].toUpperCase() : b;
            },
            bcp47: function(a) {
                var b = (a || "").split("_").join("-"), c = b.split("-");
                return c.length > 1 ? c[0].toLowerCase() + "-" + c[1].toUpperCase() : b;
            },
            "iso639-1": function(a) {
                var b = (a || "").split("_").join("-"), c = b.split("-");
                return c[0].toLowerCase();
            }
        }, H = "2.11.0", I = function() {
            if (angular.isFunction(d.getLocale)) return d.getLocale();
            var a, c, e = b.$get().navigator, f = [ "language", "browserLanguage", "systemLanguage", "userLanguage" ];
            if (angular.isArray(e.languages)) for (a = 0; a < e.languages.length; a++) if (c = e.languages[a], 
            c && c.length) return c;
            for (a = 0; a < f.length; a++) if (c = e[f[a]], c && c.length) return c;
            return null;
        };
        I.displayName = "angular-translate/service: getFirstBrowserLanguage";
        var J = function() {
            var a = I() || "";
            return G[F] && (a = G[F](a)), a;
        };
        J.displayName = "angular-translate/service: getLocale";
        var K = function(a, b) {
            for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
            return -1;
        }, L = function() {
            return this.toString().replace(/^\s+|\s+$/g, "");
        }, M = function(a) {
            if (a) {
                for (var b = [], c = angular.lowercase(a), d = 0, e = v.length; e > d; d++) b.push(angular.lowercase(v[d]));
                if (K(b, c) > -1) return a;
                if (f) {
                    var g;
                    for (var h in f) if (f.hasOwnProperty(h)) {
                        var i = !1, j = Object.prototype.hasOwnProperty.call(f, h) && angular.lowercase(h) === angular.lowercase(a);
                        if ("*" === h.slice(-1) && (i = h.slice(0, -1) === a.slice(0, h.length - 1)), (j || i) && (g = f[h], 
                        K(b, angular.lowercase(g)) > -1)) return g;
                    }
                }
                var k = a.split("_");
                return k.length > 1 && K(b, angular.lowercase(k[0])) > -1 ? k[0] : void 0;
            }
        }, N = function(a, b) {
            if (!a && !b) return u;
            if (a && !b) {
                if (angular.isString(a)) return u[a];
            } else angular.isObject(u[a]) || (u[a] = {}), angular.extend(u[a], O(b));
            return this;
        };
        this.translations = N, this.cloakClassName = function(a) {
            return a ? (y = a, this) : y;
        }, this.nestedObjectDelimeter = function(a) {
            return a ? (B = a, this) : B;
        };
        var O = function(a, b, c, d) {
            var e, f, g, h;
            b || (b = []), c || (c = {});
            for (e in a) Object.prototype.hasOwnProperty.call(a, e) && (h = a[e], angular.isObject(h) ? O(h, b.concat(e), c, e) : (f = b.length ? "" + b.join(B) + B + e : e, 
            b.length && e === d && (g = "" + b.join(B), c[g] = "@:" + f), c[f] = h));
            return c;
        };
        O.displayName = "flatObject", this.addInterpolation = function(a) {
            return x.push(a), this;
        }, this.useMessageFormatInterpolation = function() {
            return this.useInterpolation("$translateMessageFormatInterpolation");
        }, this.useInterpolation = function(a) {
            return n = a, this;
        }, this.useSanitizeValueStrategy = function(a) {
            return c.useStrategy(a), this;
        }, this.preferredLanguage = function(a) {
            return a ? (P(a), this) : e;
        };
        var P = function(a) {
            return a && (e = a), e;
        };
        this.translationNotFoundIndicator = function(a) {
            return this.translationNotFoundIndicatorLeft(a), this.translationNotFoundIndicatorRight(a), 
            this;
        }, this.translationNotFoundIndicatorLeft = function(a) {
            return a ? (q = a, this) : q;
        }, this.translationNotFoundIndicatorRight = function(a) {
            return a ? (r = a, this) : r;
        }, this.fallbackLanguage = function(a) {
            return Q(a), this;
        };
        var Q = function(a) {
            return a ? (angular.isString(a) ? (h = !0, g = [ a ]) : angular.isArray(a) && (h = !1, 
            g = a), angular.isString(e) && K(g, e) < 0 && g.push(e), this) : h ? g[0] : g;
        };
        this.use = function(a) {
            if (a) {
                if (!u[a] && !o) throw new Error("$translateProvider couldn't find translationTable for langKey: '" + a + "'");
                return i = a, this;
            }
            return i;
        }, this.resolveClientLocale = function() {
            return J();
        };
        var R = function(a) {
            return a ? (w = a, this) : l ? l + w : w;
        };
        this.storageKey = R, this.useUrlLoader = function(a, b) {
            return this.useLoader("$translateUrlLoader", angular.extend({
                url: a
            }, b));
        }, this.useStaticFilesLoader = function(a) {
            return this.useLoader("$translateStaticFilesLoader", a);
        }, this.useLoader = function(a, b) {
            return o = a, p = b || {}, this;
        }, this.useLocalStorage = function() {
            return this.useStorage("$translateLocalStorage");
        }, this.useCookieStorage = function() {
            return this.useStorage("$translateCookieStorage");
        }, this.useStorage = function(a) {
            return k = a, this;
        }, this.storagePrefix = function(a) {
            return a ? (l = a, this) : a;
        }, this.useMissingTranslationHandlerLog = function() {
            return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog");
        }, this.useMissingTranslationHandler = function(a) {
            return m = a, this;
        }, this.usePostCompiling = function(a) {
            return z = !!a, this;
        }, this.forceAsyncReload = function(a) {
            return A = !!a, this;
        }, this.uniformLanguageTag = function(a) {
            return a ? angular.isString(a) && (a = {
                standard: a
            }) : a = {}, F = a.standard, this;
        }, this.determinePreferredLanguage = function(a) {
            var b = a && angular.isFunction(a) ? a() : J();
            return e = v.length ? M(b) || b : b, this;
        }, this.registerAvailableLanguageKeys = function(a, b) {
            return a ? (v = a, b && (f = b), this) : v;
        }, this.useLoaderCache = function(a) {
            return a === !1 ? s = void 0 : a === !0 ? s = !0 : "undefined" == typeof a ? s = "$translationCache" : a && (s = a), 
            this;
        }, this.directivePriority = function(a) {
            return void 0 === a ? D : (D = a, this);
        }, this.statefulFilter = function(a) {
            return void 0 === a ? E : (E = a, this);
        }, this.postProcess = function(a) {
            return t = a ? a : void 0, this;
        }, this.$get = [ "$log", "$injector", "$rootScope", "$q", function(a, b, c, d) {
            var f, l, F, G = b.get(n || "$translateDefaultInterpolation"), I = !1, S = {}, T = {}, U = function(a, b, c, h, j) {
                !i && e && (i = e);
                var m = j && j !== i ? M(j) || j : i;
                if (j && ja(j), angular.isArray(a)) {
                    var n = function(a) {
                        for (var e = {}, f = [], g = function(a) {
                            var f = d.defer(), g = function(b) {
                                e[a] = b, f.resolve([ a, b ]);
                            };
                            return U(a, b, c, h, j).then(g, g), f.promise;
                        }, i = 0, k = a.length; k > i; i++) f.push(g(a[i]));
                        return d.all(f).then(function() {
                            return e;
                        });
                    };
                    return n(a);
                }
                var o = d.defer();
                a && (a = L.apply(a));
                var p = function() {
                    var a = e ? T[e] : T[m];
                    if (l = 0, k && !a) {
                        var b = f.get(w);
                        if (a = T[b], g && g.length) {
                            var c = K(g, b);
                            l = 0 === c ? 1 : 0, K(g, e) < 0 && g.push(e);
                        }
                    }
                    return a;
                }();
                if (p) {
                    var q = function() {
                        j || (m = i), fa(a, b, c, h, m).then(o.resolve, o.reject);
                    };
                    q.displayName = "promiseResolved", p["finally"](q);
                } else fa(a, b, c, h, m).then(o.resolve, o.reject);
                return o.promise;
            }, V = function(a) {
                return q && (a = [ q, a ].join(" ")), r && (a = [ a, r ].join(" ")), a;
            }, W = function(a) {
                i = a, k && f.put(U.storageKey(), i), c.$emit("$translateChangeSuccess", {
                    language: a
                }), G.setLocale(i);
                var b = function(a, b) {
                    S[b].setLocale(i);
                };
                b.displayName = "eachInterpolatorLocaleSetter", angular.forEach(S, b), c.$emit("$translateChangeEnd", {
                    language: a
                });
            }, X = function(a) {
                if (!a) throw "No language key specified for loading.";
                var e = d.defer();
                c.$emit("$translateLoadingStart", {
                    language: a
                }), I = !0;
                var f = s;
                "string" == typeof f && (f = b.get(f));
                var g = angular.extend({}, p, {
                    key: a,
                    $http: angular.extend({}, {
                        cache: f
                    }, p.$http)
                }), h = function(b) {
                    var d = {};
                    c.$emit("$translateLoadingSuccess", {
                        language: a
                    }), angular.isArray(b) ? angular.forEach(b, function(a) {
                        angular.extend(d, O(a));
                    }) : angular.extend(d, O(b)), I = !1, e.resolve({
                        key: a,
                        table: d
                    }), c.$emit("$translateLoadingEnd", {
                        language: a
                    });
                };
                h.displayName = "onLoaderSuccess";
                var i = function(a) {
                    c.$emit("$translateLoadingError", {
                        language: a
                    }), e.reject(a), c.$emit("$translateLoadingEnd", {
                        language: a
                    });
                };
                return i.displayName = "onLoaderError", b.get(o)(g).then(h, i), e.promise;
            };
            if (k && (f = b.get(k), !f.get || !f.put)) throw new Error("Couldn't use storage '" + k + "', missing get() or put() method!");
            if (x.length) {
                var Y = function(a) {
                    var c = b.get(a);
                    c.setLocale(e || i), S[c.getInterpolationIdentifier()] = c;
                };
                Y.displayName = "interpolationFactoryAdder", angular.forEach(x, Y);
            }
            var Z = function(a) {
                var b = d.defer();
                if (Object.prototype.hasOwnProperty.call(u, a)) b.resolve(u[a]); else if (T[a]) {
                    var c = function(a) {
                        N(a.key, a.table), b.resolve(a.table);
                    };
                    c.displayName = "translationTableResolver", T[a].then(c, b.reject);
                } else b.reject();
                return b.promise;
            }, $ = function(a, b, c, e) {
                var f = d.defer(), g = function(d) {
                    if (Object.prototype.hasOwnProperty.call(d, b)) {
                        e.setLocale(a);
                        var g = d[b];
                        if ("@:" === g.substr(0, 2)) $(a, g.substr(2), c, e).then(f.resolve, f.reject); else {
                            var h = e.interpolate(d[b], c);
                            h = ia(b, d[b], h, c, a), f.resolve(h);
                        }
                        e.setLocale(i);
                    } else f.reject();
                };
                return g.displayName = "fallbackTranslationResolver", Z(a).then(g, f.reject), f.promise;
            }, _ = function(a, b, c, d) {
                var e, f = u[a];
                if (f && Object.prototype.hasOwnProperty.call(f, b)) {
                    if (d.setLocale(a), e = d.interpolate(f[b], c), "@:" === e.substr(0, 2)) return _(a, e.substr(2), c, d);
                    d.setLocale(i);
                }
                return e;
            }, aa = function(a, c, d) {
                if (m) {
                    var e = b.get(m)(a, i, c, d);
                    return void 0 !== e ? e : a;
                }
                return a;
            }, ba = function(a, b, c, e, f) {
                var h = d.defer();
                if (a < g.length) {
                    var i = g[a];
                    $(i, b, c, e).then(function(a) {
                        h.resolve(a);
                    }, function() {
                        return ba(a + 1, b, c, e, f).then(h.resolve, h.reject);
                    });
                } else f ? h.resolve(f) : m ? h.resolve(aa(b, c)) : h.reject(aa(b, c));
                return h.promise;
            }, ca = function(a, b, c, d) {
                var e;
                if (a < g.length) {
                    var f = g[a];
                    e = _(f, b, c, d), e || (e = ca(a + 1, b, c, d));
                }
                return e;
            }, da = function(a, b, c, d) {
                return ba(F > 0 ? F : l, a, b, c, d);
            }, ea = function(a, b, c) {
                return ca(F > 0 ? F : l, a, b, c);
            }, fa = function(a, b, c, e, f) {
                var h = d.defer(), i = f ? u[f] : u, j = c ? S[c] : G;
                if (i && Object.prototype.hasOwnProperty.call(i, a)) {
                    var k = i[a];
                    if ("@:" === k.substr(0, 2)) U(k.substr(2), b, c, e, f).then(h.resolve, h.reject); else {
                        var l = j.interpolate(k, b);
                        l = ia(a, k, l, b, f), h.resolve(l);
                    }
                } else {
                    var n;
                    m && !I && (n = aa(a, b, e)), f && g && g.length ? da(a, b, j, e).then(function(a) {
                        h.resolve(a);
                    }, function(a) {
                        h.reject(V(a));
                    }) : m && !I && n ? e ? h.resolve(e) : h.resolve(n) : e ? h.resolve(e) : h.reject(V(a));
                }
                return h.promise;
            }, ga = function(a, b, c, d) {
                var e, f = d ? u[d] : u, h = G;
                if (S && Object.prototype.hasOwnProperty.call(S, c) && (h = S[c]), f && Object.prototype.hasOwnProperty.call(f, a)) {
                    var i = f[a];
                    e = "@:" === i.substr(0, 2) ? ga(i.substr(2), b, c, d) : h.interpolate(i, b);
                } else {
                    var j;
                    m && !I && (j = aa(a, b)), d && g && g.length ? (l = 0, e = ea(a, b, h)) : e = m && !I && j ? j : V(a);
                }
                return e;
            }, ha = function(a) {
                j === a && (j = void 0), T[a] = void 0;
            }, ia = function(a, c, d, e, f) {
                var g = t;
                return g && ("string" == typeof g && (g = b.get(g)), g) ? g(a, c, d, e, f) : d;
            }, ja = function(a) {
                u[a] || !o || T[a] || (T[a] = X(a).then(function(a) {
                    N(a.key, a.table);
                }));
            };
            U.preferredLanguage = function(a) {
                return a && P(a), e;
            }, U.cloakClassName = function() {
                return y;
            }, U.nestedObjectDelimeter = function() {
                return B;
            }, U.fallbackLanguage = function(a) {
                if (void 0 !== a && null !== a) {
                    if (Q(a), o && g && g.length) for (var b = 0, c = g.length; c > b; b++) T[g[b]] || (T[g[b]] = X(g[b]));
                    U.use(U.use());
                }
                return h ? g[0] : g;
            }, U.useFallbackLanguage = function(a) {
                if (void 0 !== a && null !== a) if (a) {
                    var b = K(g, a);
                    b > -1 && (F = b);
                } else F = 0;
            }, U.proposedLanguage = function() {
                return j;
            }, U.storage = function() {
                return f;
            }, U.negotiateLocale = M, U.use = function(a) {
                if (!a) return i;
                var b = d.defer();
                c.$emit("$translateChangeStart", {
                    language: a
                });
                var e = M(a);
                return v.length > 0 && !e ? d.reject(a) : (e && (a = e), j = a, !A && u[a] || !o || T[a] ? T[a] ? T[a].then(function(a) {
                    return j === a.key && W(a.key), b.resolve(a.key), a;
                }, function(a) {
                    return !i && g && g.length > 0 ? U.use(g[0]).then(b.resolve, b.reject) : b.reject(a);
                }) : (b.resolve(a), W(a)) : (T[a] = X(a).then(function(c) {
                    return N(c.key, c.table), b.resolve(c.key), j === a && W(c.key), c;
                }, function(a) {
                    return c.$emit("$translateChangeError", {
                        language: a
                    }), b.reject(a), c.$emit("$translateChangeEnd", {
                        language: a
                    }), d.reject(a);
                }), T[a]["finally"](function() {
                    ha(a);
                })), b.promise);
            }, U.resolveClientLocale = function() {
                return J();
            }, U.storageKey = function() {
                return R();
            }, U.isPostCompilingEnabled = function() {
                return z;
            }, U.isForceAsyncReloadEnabled = function() {
                return A;
            }, U.refresh = function(a) {
                function b() {
                    f.resolve(), c.$emit("$translateRefreshEnd", {
                        language: a
                    });
                }
                function e() {
                    f.reject(), c.$emit("$translateRefreshEnd", {
                        language: a
                    });
                }
                if (!o) throw new Error("Couldn't refresh translation table, no loader registered!");
                var f = d.defer();
                if (c.$emit("$translateRefreshStart", {
                    language: a
                }), a) if (u[a]) {
                    var h = function(c) {
                        N(c.key, c.table), a === i && W(i), b();
                    };
                    h.displayName = "refreshPostProcessor", X(a).then(h, e);
                } else e(); else {
                    var j = [], k = {};
                    if (g && g.length) for (var l = 0, m = g.length; m > l; l++) j.push(X(g[l])), k[g[l]] = !0;
                    i && !k[i] && j.push(X(i));
                    var n = function(a) {
                        u = {}, angular.forEach(a, function(a) {
                            N(a.key, a.table);
                        }), i && W(i), b();
                    };
                    n.displayName = "refreshPostProcessor", d.all(j).then(n, e);
                }
                return f.promise;
            }, U.instant = function(a, b, c, d) {
                var f = d && d !== i ? M(d) || d : i;
                if (null === a || angular.isUndefined(a)) return a;
                if (d && ja(d), angular.isArray(a)) {
                    for (var h = {}, j = 0, k = a.length; k > j; j++) h[a[j]] = U.instant(a[j], b, c, d);
                    return h;
                }
                if (angular.isString(a) && a.length < 1) return a;
                a && (a = L.apply(a));
                var l, n = [];
                e && n.push(e), f && n.push(f), g && g.length && (n = n.concat(g));
                for (var o = 0, p = n.length; p > o; o++) {
                    var s = n[o];
                    if (u[s] && "undefined" != typeof u[s][a] && (l = ga(a, b, c, f)), "undefined" != typeof l) break;
                }
                return l || "" === l || (q || r ? l = V(a) : (l = G.interpolate(a, b), m && !I && (l = aa(a, b)))), 
                l;
            }, U.versionInfo = function() {
                return H;
            }, U.loaderCache = function() {
                return s;
            }, U.directivePriority = function() {
                return D;
            }, U.statefulFilter = function() {
                return E;
            }, U.isReady = function() {
                return C;
            };
            var ka = d.defer();
            ka.promise.then(function() {
                C = !0;
            }), U.onReady = function(a) {
                var b = d.defer();
                return angular.isFunction(a) && b.promise.then(a), C ? b.resolve() : ka.promise.then(b.resolve), 
                b.promise;
            }, U.getAvailableLanguageKeys = function() {
                return v.length > 0 ? v : null;
            };
            var la = c.$on("$translateReady", function() {
                ka.resolve(), la(), la = null;
            }), ma = c.$on("$translateChangeEnd", function() {
                ka.resolve(), ma(), ma = null;
            });
            if (o) {
                if (angular.equals(u, {}) && U.use() && U.use(U.use()), g && g.length) for (var na = function(a) {
                    return N(a.key, a.table), c.$emit("$translateChangeEnd", {
                        language: a.key
                    }), a;
                }, oa = 0, pa = g.length; pa > oa; oa++) {
                    var qa = g[oa];
                    !A && u[qa] || (T[qa] = X(qa).then(na));
                }
            } else c.$emit("$translateReady", {
                language: U.use()
            });
            return U;
        } ];
    }
    function d(a, b) {
        var c, d = {}, e = "default";
        return d.setLocale = function(a) {
            c = a;
        }, d.getInterpolationIdentifier = function() {
            return e;
        }, d.useSanitizeValueStrategy = function(a) {
            return b.useStrategy(a), this;
        }, d.interpolate = function(c, d) {
            d = d || {}, d = b.sanitize(d, "params");
            var e = a(c)(d);
            return e = b.sanitize(e, "text");
        }, d;
    }
    function e(a, b, c, d, e, g) {
        var h = function() {
            return this.toString().replace(/^\s+|\s+$/g, "");
        };
        return {
            restrict: "AE",
            scope: !0,
            priority: a.directivePriority(),
            compile: function(b, i) {
                var j = i.translateValues ? i.translateValues : void 0, k = i.translateInterpolation ? i.translateInterpolation : void 0, l = b[0].outerHTML.match(/translate-value-+/i), m = "^(.*)(" + c.startSymbol() + ".*" + c.endSymbol() + ")(.*)", n = "^(.*)" + c.startSymbol() + "(.*)" + c.endSymbol() + "(.*)";
                return function(b, o, p) {
                    b.interpolateParams = {}, b.preText = "", b.postText = "", b.translateNamespace = f(b);
                    var q = {}, r = function(a, c, d) {
                        if (c.translateValues && angular.extend(a, e(c.translateValues)(b.$parent)), l) for (var f in d) if (Object.prototype.hasOwnProperty.call(c, f) && "translateValue" === f.substr(0, 14) && "translateValues" !== f) {
                            var g = angular.lowercase(f.substr(14, 1)) + f.substr(15);
                            a[g] = d[f];
                        }
                    }, s = function(a) {
                        if (angular.isFunction(s._unwatchOld) && (s._unwatchOld(), s._unwatchOld = void 0), 
                        angular.equals(a, "") || !angular.isDefined(a)) {
                            var d = h.apply(o.text()), e = d.match(m);
                            if (angular.isArray(e)) {
                                b.preText = e[1], b.postText = e[3], q.translate = c(e[2])(b.$parent);
                                var f = d.match(n);
                                angular.isArray(f) && f[2] && f[2].length && (s._unwatchOld = b.$watch(f[2], function(a) {
                                    q.translate = a, y();
                                }));
                            } else q.translate = d ? d : void 0;
                        } else q.translate = a;
                        y();
                    }, t = function(a) {
                        p.$observe(a, function(b) {
                            q[a] = b, y();
                        });
                    };
                    r(b.interpolateParams, p, i);
                    var u = !0;
                    p.$observe("translate", function(a) {
                        "undefined" == typeof a ? s("") : "" === a && u || (q.translate = a, y()), u = !1;
                    });
                    for (var v in p) p.hasOwnProperty(v) && "translateAttr" === v.substr(0, 13) && t(v);
                    if (p.$observe("translateDefault", function(a) {
                        b.defaultText = a, y();
                    }), j && p.$observe("translateValues", function(a) {
                        a && b.$parent.$watch(function() {
                            angular.extend(b.interpolateParams, e(a)(b.$parent));
                        });
                    }), l) {
                        var w = function(a) {
                            p.$observe(a, function(c) {
                                var d = angular.lowercase(a.substr(14, 1)) + a.substr(15);
                                b.interpolateParams[d] = c;
                            });
                        };
                        for (var x in p) Object.prototype.hasOwnProperty.call(p, x) && "translateValue" === x.substr(0, 14) && "translateValues" !== x && w(x);
                    }
                    var y = function() {
                        for (var a in q) q.hasOwnProperty(a) && void 0 !== q[a] && z(a, q[a], b, b.interpolateParams, b.defaultText, b.translateNamespace);
                    }, z = function(b, c, d, e, f, g) {
                        c ? (g && "." === c.charAt(0) && (c = g + c), a(c, e, k, f, d.translateLanguage).then(function(a) {
                            A(a, d, !0, b);
                        }, function(a) {
                            A(a, d, !1, b);
                        })) : A(c, d, !1, b);
                    }, A = function(b, c, e, f) {
                        if (e || "undefined" != typeof c.defaultText && (b = c.defaultText), "translate" === f) {
                            (e || !e && "undefined" == typeof p.translateKeepContent) && o.empty().append(c.preText + b + c.postText);
                            var g = a.isPostCompilingEnabled(), h = "undefined" != typeof i.translateCompile, j = h && "false" !== i.translateCompile;
                            (g && !h || j) && d(o.contents())(c);
                        } else {
                            var k = p.$attr[f];
                            "data-" === k.substr(0, 5) && (k = k.substr(5)), k = k.substr(15), o.attr(k, b);
                        }
                    };
                    (j || l || p.translateDefault) && b.$watch("interpolateParams", y, !0);
                    var B = b.$on("translateLanguageChanged", y), C = g.$on("$translateChangeSuccess", y);
                    o.text().length ? s(p.translate ? p.translate : "") : p.translate && s(p.translate), 
                    y(), b.$on("$destroy", function() {
                        B(), C();
                    });
                };
            }
        };
    }
    function f(a) {
        return a.translateNamespace ? a.translateNamespace : a.$parent ? f(a.$parent) : void 0;
    }
    function g(a, b) {
        return {
            compile: function(c) {
                var d = function() {
                    c.addClass(a.cloakClassName());
                }, e = function() {
                    c.removeClass(a.cloakClassName());
                };
                return a.onReady(function() {
                    e();
                }), d(), function(c, f, g) {
                    g.translateCloak && g.translateCloak.length && (g.$observe("translateCloak", function(b) {
                        a(b).then(e, d);
                    }), b.$on("$translateChangeSuccess", function() {
                        a(g.translateCloak).then(e, d);
                    }));
                };
            }
        };
    }
    function h() {
        return {
            restrict: "A",
            scope: !0,
            compile: function() {
                return {
                    pre: function(a, b, c) {
                        a.translateNamespace = f(a), a.translateNamespace && "." === c.translateNamespace.charAt(0) ? a.translateNamespace += c.translateNamespace : a.translateNamespace = c.translateNamespace;
                    }
                };
            }
        };
    }
    function f(a) {
        return a.translateNamespace ? a.translateNamespace : a.$parent ? f(a.$parent) : void 0;
    }
    function i() {
        return {
            restrict: "A",
            scope: !0,
            compile: function() {
                return function(a, b, c) {
                    c.$observe("translateLanguage", function(b) {
                        a.translateLanguage = b;
                    }), a.$watch("translateLanguage", function() {
                        a.$broadcast("translateLanguageChanged");
                    });
                };
            }
        };
    }
    function j(a, b) {
        var c = function(c, d, e, f) {
            return angular.isObject(d) || (d = a(d)(this)), b.instant(c, d, e, f);
        };
        return b.statefulFilter() && (c.$stateful = !0), c;
    }
    function k(a) {
        return a("translations");
    }
    return a.$inject = [ "$translate" ], c.$inject = [ "$STORAGE_KEY", "$windowProvider", "$translateSanitizationProvider", "pascalprechtTranslateOverrider" ], 
    d.$inject = [ "$interpolate", "$translateSanitization" ], e.$inject = [ "$translate", "$q", "$interpolate", "$compile", "$parse", "$rootScope" ], 
    g.$inject = [ "$translate", "$rootScope" ], j.$inject = [ "$parse", "$translate" ], 
    k.$inject = [ "$cacheFactory" ], angular.module("pascalprecht.translate", [ "ng" ]).run(a), 
    a.displayName = "runTranslate", angular.module("pascalprecht.translate").provider("$translateSanitization", b), 
    angular.module("pascalprecht.translate").constant("pascalprechtTranslateOverrider", {}).provider("$translate", c), 
    c.displayName = "displayName", angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation", d), 
    d.displayName = "$translateDefaultInterpolation", angular.module("pascalprecht.translate").constant("$STORAGE_KEY", "NG_TRANSLATE_LANG_KEY"), 
    angular.module("pascalprecht.translate").directive("translate", e), e.displayName = "translateDirective", 
    angular.module("pascalprecht.translate").directive("translateCloak", g), g.displayName = "translateCloakDirective", 
    angular.module("pascalprecht.translate").directive("translateNamespace", h), h.displayName = "translateNamespaceDirective", 
    angular.module("pascalprecht.translate").directive("translateLanguage", i), i.displayName = "translateLanguageDirective", 
    angular.module("pascalprecht.translate").filter("translate", j), j.displayName = "translateFilterFactory", 
    angular.module("pascalprecht.translate").factory("$translationCache", k), k.displayName = "$translationCache", 
    "pascalprecht.translate";
}), !function() {
    function a(a, b) {
        window.XMLHttpRequest.prototype[a] = b(window.XMLHttpRequest.prototype[a]);
    }
    function b(a, b, c) {
        try {
            Object.defineProperty(a, b, {
                get: c
            });
        } catch (d) {}
    }
    if (window.FileAPI || (window.FileAPI = {}), !window.XMLHttpRequest) throw "AJAX is not supported. XMLHttpRequest is not defined.";
    if (FileAPI.shouldLoad = !window.FormData || FileAPI.forceLoad, FileAPI.shouldLoad) {
        var c = function(a) {
            if (!a.__listeners) {
                a.upload || (a.upload = {}), a.__listeners = [];
                var b = a.upload.addEventListener;
                a.upload.addEventListener = function(c, d) {
                    a.__listeners[c] = d, b && b.apply(this, arguments);
                };
            }
        };
        a("open", function(a) {
            return function(b, d, e) {
                c(this), this.__url = d;
                try {
                    a.apply(this, [ b, d, e ]);
                } catch (f) {
                    f.message.indexOf("Access is denied") > -1 && (this.__origError = f, a.apply(this, [ b, "_fix_for_ie_crossdomain__", e ]));
                }
            };
        }), a("getResponseHeader", function(a) {
            return function(b) {
                return this.__fileApiXHR && this.__fileApiXHR.getResponseHeader ? this.__fileApiXHR.getResponseHeader(b) : null == a ? null : a.apply(this, [ b ]);
            };
        }), a("getAllResponseHeaders", function(a) {
            return function() {
                return this.__fileApiXHR && this.__fileApiXHR.getAllResponseHeaders ? this.__fileApiXHR.getAllResponseHeaders() : null == a ? null : a.apply(this);
            };
        }), a("abort", function(a) {
            return function() {
                return this.__fileApiXHR && this.__fileApiXHR.abort ? this.__fileApiXHR.abort() : null == a ? null : a.apply(this);
            };
        }), a("setRequestHeader", function(a) {
            return function(b, d) {
                if ("__setXHR_" === b) {
                    c(this);
                    var e = d(this);
                    e instanceof Function && e(this);
                } else this.__requestHeaders = this.__requestHeaders || {}, this.__requestHeaders[b] = d, 
                a.apply(this, arguments);
            };
        }), a("send", function(a) {
            return function() {
                var c = this;
                if (arguments[0] && arguments[0].__isFileAPIShim) {
                    var d = arguments[0], e = {
                        url: c.__url,
                        jsonp: !1,
                        cache: !0,
                        complete: function(a, d) {
                            a && angular.isString(a) && -1 !== a.indexOf("#2174") && (a = null), c.__completed = !0, 
                            !a && c.__listeners.load && c.__listeners.load({
                                type: "load",
                                loaded: c.__loaded,
                                total: c.__total,
                                target: c,
                                lengthComputable: !0
                            }), !a && c.__listeners.loadend && c.__listeners.loadend({
                                type: "loadend",
                                loaded: c.__loaded,
                                total: c.__total,
                                target: c,
                                lengthComputable: !0
                            }), "abort" === a && c.__listeners.abort && c.__listeners.abort({
                                type: "abort",
                                loaded: c.__loaded,
                                total: c.__total,
                                target: c,
                                lengthComputable: !0
                            }), void 0 !== d.status && b(c, "status", function() {
                                return 0 === d.status && a && "abort" !== a ? 500 : d.status;
                            }), void 0 !== d.statusText && b(c, "statusText", function() {
                                return d.statusText;
                            }), b(c, "readyState", function() {
                                return 4;
                            }), void 0 !== d.response && b(c, "response", function() {
                                return d.response;
                            });
                            var e = d.responseText || (a && 0 === d.status && "abort" !== a ? a : void 0);
                            b(c, "responseText", function() {
                                return e;
                            }), b(c, "response", function() {
                                return e;
                            }), a && b(c, "err", function() {
                                return a;
                            }), c.__fileApiXHR = d, c.onreadystatechange && c.onreadystatechange(), c.onload && c.onload();
                        },
                        progress: function(a) {
                            if (a.target = c, c.__listeners.progress && c.__listeners.progress(a), c.__total = a.total, 
                            c.__loaded = a.loaded, a.total === a.loaded) {
                                var b = this;
                                setTimeout(function() {
                                    c.__completed || (c.getAllResponseHeaders = function() {}, b.complete(null, {
                                        status: 204,
                                        statusText: "No Content"
                                    }));
                                }, FileAPI.noContentTimeout || 1e4);
                            }
                        },
                        headers: c.__requestHeaders
                    };
                    e.data = {}, e.files = {};
                    for (var f = 0; f < d.data.length; f++) {
                        var g = d.data[f];
                        null != g.val && null != g.val.name && null != g.val.size && null != g.val.type ? e.files[g.key] = g.val : e.data[g.key] = g.val;
                    }
                    setTimeout(function() {
                        if (!FileAPI.hasFlash) throw 'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';
                        c.__fileApiXHR = FileAPI.upload(e);
                    }, 1);
                } else {
                    if (this.__origError) throw this.__origError;
                    a.apply(c, arguments);
                }
            };
        }), window.XMLHttpRequest.__isFileAPIShim = !0, window.FormData = FormData = function() {
            return {
                append: function(a, b, c) {
                    b.__isFileAPIBlobShim && (b = b.data[0]), this.data.push({
                        key: a,
                        val: b,
                        name: c
                    });
                },
                data: [],
                __isFileAPIShim: !0
            };
        }, window.Blob = Blob = function(a) {
            return {
                data: a,
                __isFileAPIBlobShim: !0
            };
        };
    }
}(), function() {
    function a(a) {
        return "input" === a[0].tagName.toLowerCase() && a.attr("type") && "file" === a.attr("type").toLowerCase();
    }
    function b() {
        try {
            var a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            if (a) return !0;
        } catch (b) {
            if (void 0 !== navigator.mimeTypes["application/x-shockwave-flash"]) return !0;
        }
        return !1;
    }
    function c(a) {
        var b = 0, c = 0;
        if (window.jQuery) return jQuery(a).offset();
        if (a.offsetParent) do b += a.offsetLeft - a.scrollLeft, c += a.offsetTop - a.scrollTop, 
        a = a.offsetParent; while (a);
        return {
            left: b,
            top: c
        };
    }
    if (FileAPI.shouldLoad) {
        if (FileAPI.hasFlash = b(), FileAPI.forceLoad && (FileAPI.html5 = !1), !FileAPI.upload) {
            var d, e, f, g, h, i = document.createElement("script"), j = document.getElementsByTagName("script");
            if (window.FileAPI.jsUrl) d = window.FileAPI.jsUrl; else if (window.FileAPI.jsPath) e = window.FileAPI.jsPath; else for (f = 0; f < j.length; f++) if (h = j[f].src, 
            g = h.search(/\/ng\-file\-upload[\-a-zA-z0-9\.]*\.js/), g > -1) {
                e = h.substring(0, g + 1);
                break;
            }
            null == FileAPI.staticPath && (FileAPI.staticPath = e), i.setAttribute("src", d || e + "FileAPI.min.js"), 
            document.getElementsByTagName("head")[0].appendChild(i);
        }
        FileAPI.ngfFixIE = function(d, e, f) {
            if (!b()) throw 'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';
            var g = function() {
                var b = e.parent();
                d.attr("disabled") ? b && b.removeClass("js-fileapi-wrapper") : (e.attr("__ngf_flash_") || (e.unbind("change"), 
                e.unbind("click"), e.bind("change", function(a) {
                    h.apply(this, [ a ]), f.apply(this, [ a ]);
                }), e.attr("__ngf_flash_", "true")), b.addClass("js-fileapi-wrapper"), a(d) || (b.css("position", "absolute").css("top", c(d[0]).top + "px").css("left", c(d[0]).left + "px").css("width", d[0].offsetWidth + "px").css("height", d[0].offsetHeight + "px").css("filter", "alpha(opacity=0)").css("display", d.css("display")).css("overflow", "hidden").css("z-index", "900000").css("visibility", "visible"), 
                e.css("width", d[0].offsetWidth + "px").css("height", d[0].offsetHeight + "px").css("position", "absolute").css("top", "0px").css("left", "0px")));
            };
            d.bind("mouseenter", g);
            var h = function(a) {
                for (var b = FileAPI.getFiles(a), c = 0; c < b.length; c++) void 0 === b[c].size && (b[c].size = 0), 
                void 0 === b[c].name && (b[c].name = "file"), void 0 === b[c].type && (b[c].type = "undefined");
                a.target || (a.target = {}), a.target.files = b, a.target.files !== b && (a.__files_ = b), 
                (a.__files_ || a.target.files).item = function(b) {
                    return (a.__files_ || a.target.files)[b] || null;
                };
            };
        }, FileAPI.disableFileInput = function(a, b) {
            b ? a.removeClass("js-fileapi-wrapper") : a.addClass("js-fileapi-wrapper");
        };
    }
}(), window.FileReader || (window.FileReader = function() {
    var a = this, b = !1;
    this.listeners = {}, this.addEventListener = function(b, c) {
        a.listeners[b] = a.listeners[b] || [], a.listeners[b].push(c);
    }, this.removeEventListener = function(b, c) {
        a.listeners[b] && a.listeners[b].splice(a.listeners[b].indexOf(c), 1);
    }, this.dispatchEvent = function(b) {
        var c = a.listeners[b.type];
        if (c) for (var d = 0; d < c.length; d++) c[d].call(a, b);
    }, this.onabort = this.onerror = this.onload = this.onloadstart = this.onloadend = this.onprogress = null;
    var c = function(b, c) {
        var d = {
            type: b,
            target: a,
            loaded: c.loaded,
            total: c.total,
            error: c.error
        };
        return null != c.result && (d.target.result = c.result), d;
    }, d = function(d) {
        b || (b = !0, a.onloadstart && a.onloadstart(c("loadstart", d)));
        var e;
        "load" === d.type ? (a.onloadend && a.onloadend(c("loadend", d)), e = c("load", d), 
        a.onload && a.onload(e), a.dispatchEvent(e)) : "progress" === d.type ? (e = c("progress", d), 
        a.onprogress && a.onprogress(e), a.dispatchEvent(e)) : (e = c("error", d), a.onerror && a.onerror(e), 
        a.dispatchEvent(e));
    };
    this.readAsDataURL = function(a) {
        FileAPI.readAsDataURL(a, d);
    }, this.readAsText = function(a) {
        FileAPI.readAsText(a, d);
    };
}), !window.XMLHttpRequest || window.FileAPI && FileAPI.shouldLoad || (window.XMLHttpRequest.prototype.setRequestHeader = function(a) {
    return function(b, c) {
        if ("__setXHR_" === b) {
            var d = c(this);
            d instanceof Function && d(this);
        } else a.apply(this, arguments);
    };
}(window.XMLHttpRequest.prototype.setRequestHeader));

var ngFileUpload = angular.module("ngFileUpload", []);

ngFileUpload.version = "12.0.4", ngFileUpload.service("UploadBase", [ "$http", "$q", "$timeout", function(a, b, c) {
    function d(d) {
        function e(a) {
            j.notify && j.notify(a), k.progressFunc && c(function() {
                k.progressFunc(a);
            });
        }
        function h(a) {
            return null != d._start && g ? {
                loaded: a.loaded + d._start,
                total: d._file && d._file.size || a.total,
                type: a.type,
                config: d,
                lengthComputable: !0,
                target: a.target
            } : a;
        }
        function i() {
            a(d).then(function(a) {
                g && d._chunkSize && !d._finished && d._file ? (e({
                    loaded: d._end,
                    total: d._file && d._file.size,
                    config: d,
                    type: "progress"
                }), f.upload(d, !0)) : (d._finished && delete d._finished, j.resolve(a));
            }, function(a) {
                j.reject(a);
            }, function(a) {
                j.notify(a);
            });
        }
        d.method = d.method || "POST", d.headers = d.headers || {};
        var j = d._deferred = d._deferred || b.defer(), k = j.promise;
        return d.disableProgress || (d.headers.__setXHR_ = function() {
            return function(a) {
                a && a.upload && a.upload.addEventListener && (d.__XHR = a, d.xhrFn && d.xhrFn(a), 
                a.upload.addEventListener("progress", function(a) {
                    a.config = d, e(h(a));
                }, !1), a.upload.addEventListener("load", function(a) {
                    a.lengthComputable && (a.config = d, e(h(a)));
                }, !1));
            };
        }), g ? d._chunkSize && d._end && !d._finished ? (d._start = d._end, d._end += d._chunkSize, 
        i()) : d.resumeSizeUrl ? a.get(d.resumeSizeUrl).then(function(a) {
            d._start = d.resumeSizeResponseReader ? d.resumeSizeResponseReader(a.data) : parseInt((null == a.data.size ? a.data : a.data.size).toString()), 
            d._chunkSize && (d._end = d._start + d._chunkSize), i();
        }, function(a) {
            throw a;
        }) : d.resumeSize ? d.resumeSize().then(function(a) {
            d._start = a, i();
        }, function(a) {
            throw a;
        }) : (d._chunkSize && (d._start = 0, d._end = d._start + d._chunkSize), i()) : i(), 
        k.success = function(a) {
            return k.then(function(b) {
                a(b.data, b.status, b.headers, d);
            }), k;
        }, k.error = function(a) {
            return k.then(null, function(b) {
                a(b.data, b.status, b.headers, d);
            }), k;
        }, k.progress = function(a) {
            return k.progressFunc = a, k.then(null, null, function(b) {
                a(b);
            }), k;
        }, k.abort = k.pause = function() {
            return d.__XHR && c(function() {
                d.__XHR.abort();
            }), k;
        }, k.xhr = function(a) {
            return d.xhrFn = function(b) {
                return function() {
                    b && b.apply(k, arguments), a.apply(k, arguments);
                };
            }(d.xhrFn), k;
        }, f.promisesCount++, k["finally"](function() {
            f.promisesCount--;
        }), k;
    }
    function e(a) {
        var b = {};
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
        return b;
    }
    var f = this;
    f.promisesCount = 0, this.isResumeSupported = function() {
        return window.Blob && window.Blob.prototype.slice;
    };
    var g = this.isResumeSupported();
    this.isUploadInProgress = function() {
        return f.promisesCount > 0;
    }, this.rename = function(a, b) {
        return a.ngfName = b, a;
    }, this.jsonBlob = function(a) {
        null == a || angular.isString(a) || (a = JSON.stringify(a));
        var b = new window.Blob([ a ], {
            type: "application/json"
        });
        return b._ngfBlob = !0, b;
    }, this.json = function(a) {
        return angular.toJson(a);
    }, this.isFile = function(a) {
        return null != a && (a instanceof window.Blob || a.flashId && a.name && a.size);
    }, this.upload = function(a, b) {
        function c(b, c) {
            if (b._ngfBlob) return b;
            if (a._file = a._file || b, null != a._start && g) {
                a._end && a._end >= b.size && (a._finished = !0, a._end = b.size);
                var d = b.slice(a._start, a._end || b.size);
                return d.name = b.name, d.ngfName = b.ngfName, a._chunkSize && (c.append("_chunkSize", a._chunkSize), 
                c.append("_currentChunkSize", a._end - a._start), c.append("_chunkNumber", Math.floor(a._start / a._chunkSize)), 
                c.append("_totalSize", a._file.size)), d;
            }
            return b;
        }
        function h(b, d, e) {
            if (void 0 !== d) if (angular.isDate(d) && (d = d.toISOString()), angular.isString(d)) b.append(e, d); else if (f.isFile(d)) {
                var g = c(d, b), i = e.split(",");
                i[1] && (g.ngfName = i[1].replace(/^\s+|\s+$/g, ""), e = i[0]), a._fileKey = a._fileKey || e, 
                b.append(e, g, g.ngfName || g.name);
            } else if (angular.isObject(d)) {
                if (d.$$ngfCircularDetection) throw "ngFileUpload: Circular reference in config.data. Make sure specified data for Upload.upload() has no circular reference: " + e;
                d.$$ngfCircularDetection = !0;
                try {
                    for (var j in d) if (d.hasOwnProperty(j) && "$$ngfCircularDetection" !== j) {
                        var k = null == a.objectKey ? "[i]" : a.objectKey;
                        d.length && parseInt(j) > -1 && (k = null == a.arrayKey ? k : a.arrayKey), h(b, d[j], e + k.replace(/[ik]/g, j));
                    }
                } finally {
                    delete d.$$ngfCircularDetection;
                }
            } else b.append(e, d);
        }
        function i() {
            a._chunkSize = f.translateScalars(a.resumeChunkSize), a._chunkSize = a._chunkSize ? parseInt(a._chunkSize.toString()) : null, 
            a.headers = a.headers || {}, a.headers["Content-Type"] = void 0, a.transformRequest = a.transformRequest ? angular.isArray(a.transformRequest) ? a.transformRequest : [ a.transformRequest ] : [], 
            a.transformRequest.push(function(b) {
                var c, d = new window.FormData();
                b = b || a.fields || {}, a.file && (b.file = a.file);
                for (c in b) if (b.hasOwnProperty(c)) {
                    var e = b[c];
                    a.formDataAppender ? a.formDataAppender(d, c, e) : h(d, e, c);
                }
                return d;
            });
        }
        return b || (a = e(a)), a._isDigested || (a._isDigested = !0, i()), d(a);
    }, this.http = function(b) {
        return b = e(b), b.transformRequest = b.transformRequest || function(b) {
            return window.ArrayBuffer && b instanceof window.ArrayBuffer || b instanceof window.Blob ? b : a.defaults.transformRequest[0].apply(this, arguments);
        }, b._chunkSize = f.translateScalars(b.resumeChunkSize), b._chunkSize = b._chunkSize ? parseInt(b._chunkSize.toString()) : null, 
        d(b);
    }, this.translateScalars = function(a) {
        if (angular.isString(a)) {
            if (a.search(/kb/i) === a.length - 2) return parseFloat(1024 * a.substring(0, a.length - 2));
            if (a.search(/mb/i) === a.length - 2) return parseFloat(1048576 * a.substring(0, a.length - 2));
            if (a.search(/gb/i) === a.length - 2) return parseFloat(1073741824 * a.substring(0, a.length - 2));
            if (a.search(/b/i) === a.length - 1) return parseFloat(a.substring(0, a.length - 1));
            if (a.search(/s/i) === a.length - 1) return parseFloat(a.substring(0, a.length - 1));
            if (a.search(/m/i) === a.length - 1) return parseFloat(60 * a.substring(0, a.length - 1));
            if (a.search(/h/i) === a.length - 1) return parseFloat(3600 * a.substring(0, a.length - 1));
        }
        return a;
    }, this.urlToBlob = function(c) {
        var d = b.defer();
        return a({
            url: c,
            method: "get",
            responseType: "arraybuffer"
        }).then(function(a) {
            var b = new Uint8Array(a.data), c = a.headers("content-type") || "image/WebP", e = new window.Blob([ b ], {
                type: c
            });
            d.resolve(e);
        }, function(a) {
            d.reject(a);
        }), d.promise;
    }, this.setDefaults = function(a) {
        this.defaults = a || {};
    }, this.defaults = {}, this.version = ngFileUpload.version;
} ]), ngFileUpload.service("Upload", [ "$parse", "$timeout", "$compile", "$q", "UploadExif", function(a, b, c, d, e) {
    function f(a, b, c) {
        var e = [ i.emptyPromise() ];
        return angular.forEach(a, function(d, f) {
            0 === d.type.indexOf("image/jpeg") && i.attrGetter("ngfFixOrientation", b, c, {
                $file: d
            }) && e.push(i.happyPromise(i.applyExifRotation(d), d).then(function(b) {
                a.splice(f, 1, b);
            }));
        }), d.all(e);
    }
    function g(a, b, c) {
        var e = i.attrGetter("ngfResize", b, c);
        if (!e || !i.isResizeSupported() || !a.length) return i.emptyPromise();
        if (!(e instanceof Function)) return h(e, a, b, c);
        var f = d.defer();
        e(a).then(function(d) {
            h(d, a, b, c).then(function(a) {
                f.resolve(a);
            }, function(a) {
                f.reject(a);
            });
        }, function(a) {
            f.reject(a);
        });
    }
    function h(a, b, c, e) {
        function f(d, f) {
            if (0 === d.type.indexOf("image")) {
                if (a.pattern && !i.validatePattern(d, a.pattern)) return;
                var h = i.resize(d, a.width, a.height, a.quality, a.type, a.ratio, a.centerCrop, function(a, b) {
                    return i.attrGetter("ngfResizeIf", c, e, {
                        $width: a,
                        $height: b,
                        $file: d
                    });
                }, a.restoreExif !== !1);
                g.push(h), h.then(function(a) {
                    b.splice(f, 1, a);
                }, function(a) {
                    d.$error = "resize", d.$errorParam = (a ? (a.message ? a.message : a) + ": " : "") + (d && d.name);
                });
            }
        }
        for (var g = [ i.emptyPromise() ], h = 0; h < b.length; h++) f(b[h], h);
        return d.all(g);
    }
    var i = e;
    return i.getAttrWithDefaults = function(a, b) {
        if (null != a[b]) return a[b];
        var c = i.defaults[b];
        return null == c ? c : angular.isString(c) ? c : JSON.stringify(c);
    }, i.attrGetter = function(b, c, d, e) {
        var f = this.getAttrWithDefaults(c, b);
        if (!d) return f;
        try {
            return e ? a(f)(d, e) : a(f)(d);
        } catch (g) {
            if (b.search(/min|max|pattern/i)) return f;
            throw g;
        }
    }, i.shouldUpdateOn = function(a, b, c) {
        var d = i.attrGetter("ngModelOptions", b, c);
        return !d || !d.updateOn || d.updateOn.split(" ").indexOf(a) > -1;
    }, i.emptyPromise = function() {
        var a = d.defer(), c = arguments;
        return b(function() {
            a.resolve.apply(a, c);
        }), a.promise;
    }, i.rejectPromise = function() {
        var a = d.defer(), c = arguments;
        return b(function() {
            a.reject.apply(a, c);
        }), a.promise;
    }, i.happyPromise = function(a, c) {
        var e = d.defer();
        return a.then(function(a) {
            e.resolve(a);
        }, function(a) {
            b(function() {
                throw a;
            }), e.resolve(c);
        }), e.promise;
    }, i.updateModel = function(c, d, e, h, j, k, l) {
        function m(f, g, j, l, m) {
            d.$$ngfPrevValidFiles = f, d.$$ngfPrevInvalidFiles = g;
            var n = f && f.length ? f[0] : null, o = g && g.length ? g[0] : null;
            c && (i.applyModelValidation(c, f), c.$setViewValue(m ? n : f)), h && a(h)(e, {
                $files: f,
                $file: n,
                $newFiles: j,
                $duplicateFiles: l,
                $invalidFiles: g,
                $invalidFile: o,
                $event: k
            });
            var p = i.attrGetter("ngfModelInvalid", d);
            p && b(function() {
                a(p).assign(e, m ? o : g);
            }), b(function() {});
        }
        function n() {
            function a(a, b) {
                return a.name === b.name && (a.$ngfOrigSize || a.size) === (b.$ngfOrigSize || b.size) && a.type === b.type;
            }
            function b(b) {
                var c;
                for (c = 0; c < s.length; c++) if (a(b, s[c])) return !0;
                for (c = 0; c < t.length; c++) if (a(b, t[c])) return !0;
                return !1;
            }
            if (j) {
                r = [], u = [];
                for (var c = 0; c < j.length; c++) b(j[c]) ? u.push(j[c]) : r.push(j[c]);
            }
        }
        function o(a) {
            return angular.isArray(a) ? a : [ a ];
        }
        function p() {
            w = [], v = [], angular.forEach(r, function(a) {
                a.$error ? v.push(a) : w.push(a);
            });
        }
        function q() {
            function a() {
                b(function() {
                    m(x ? s.concat(w) : w, x ? t.concat(v) : v, j, u, y);
                }, A && A.debounce ? A.debounce.change || A.debounce : 0);
            }
            g(z ? r : w, d, e).then(function() {
                z ? i.validate(r, s.length, c, d, e).then(function() {
                    p(), a();
                }) : a();
            }, function(a) {
                throw "Could not resize files " + a;
            });
        }
        var r, s, t, u = [], v = [], w = [];
        s = d.$$ngfPrevValidFiles || [], t = d.$$ngfPrevInvalidFiles || [], c && c.$modelValue && (s = o(c.$modelValue));
        var x = i.attrGetter("ngfKeep", d, e);
        r = (j || []).slice(0), ("distinct" === x || i.attrGetter("ngfKeepDistinct", d, e) === !0) && n(d, e);
        var y = !x && !i.attrGetter("ngfMultiple", d, e) && !i.attrGetter("multiple", d);
        if (!x || r.length) {
            i.attrGetter("ngfBeforeModelChange", d, e, {
                $files: j,
                $file: j && j.length ? j[0] : null,
                $newFiles: r,
                $duplicateFiles: u,
                $event: k
            });
            var z = i.attrGetter("ngfValidateAfterResize", d, e), A = i.attrGetter("ngModelOptions", d, e);
            i.validate(r, s.length, c, d, e).then(function() {
                l ? m(r, [], j, u, y) : (A && A.allowInvalid || z ? w = r : p(), i.attrGetter("ngfFixOrientation", d, e) && i.isExifSupported() ? f(w, d, e).then(function() {
                    q();
                }) : q());
            });
        }
    }, i;
} ]), ngFileUpload.directive("ngfSelect", [ "$parse", "$timeout", "$compile", "Upload", function(a, b, c, d) {
    function e(a) {
        var b = a.match(/Android[^\d]*(\d+)\.(\d+)/);
        if (b && b.length > 2) {
            var c = d.defaults.androidFixMinorVersion || 4;
            return parseInt(b[1]) < 4 || parseInt(b[1]) === c && parseInt(b[2]) < c;
        }
        return -1 === a.indexOf("Chrome") && /.*Windows.*Safari.*/.test(a);
    }
    function f(a, b, c, d, f, h, i, j) {
        function k() {
            return "input" === b[0].tagName.toLowerCase() && c.type && "file" === c.type.toLowerCase();
        }
        function l() {
            return t("ngfChange") || t("ngfSelect");
        }
        function m(b) {
            if (j.shouldUpdateOn("change", c, a)) {
                for (var e = b.__files_ || b.target && b.target.files, f = [], g = 0; g < e.length; g++) f.push(e[g]);
                j.updateModel(d, c, a, l(), f.length ? f : null, b);
            }
        }
        function n(a) {
            if (b !== a) for (var c = 0; c < b[0].attributes.length; c++) {
                var d = b[0].attributes[c];
                "type" !== d.name && "class" !== d.name && "style" !== d.name && ((null == d.value || "" === d.value) && ("required" === d.name && (d.value = "required"), 
                "multiple" === d.name && (d.value = "multiple")), a.attr(d.name, "id" === d.name ? "ngf-" + d.value : d.value));
            }
        }
        function o() {
            if (k()) return b;
            var a = angular.element('<input type="file">');
            n(a);
            var c = angular.element("<label>upload</label>");
            return c.css("visibility", "hidden").css("position", "absolute").css("overflow", "hidden").css("width", "0px").css("height", "0px").css("border", "none").css("margin", "0px").css("padding", "0px").attr("tabindex", "-1"), 
            g.push({
                el: b,
                ref: c
            }), document.body.appendChild(c.append(a)[0]), a;
        }
        function p(c) {
            if (b.attr("disabled")) return !1;
            if (!t("ngfSelectDisabled", a)) {
                var d = q(c);
                if (null != d) return d;
                r(c);
                try {
                    k() || document.body.contains(w[0]) || (g.push({
                        el: b,
                        ref: w.parent()
                    }), document.body.appendChild(w.parent()[0]), w.bind("change", m));
                } catch (f) {}
                return e(navigator.userAgent) ? setTimeout(function() {
                    w[0].click();
                }, 0) : w[0].click(), !1;
            }
        }
        function q(a) {
            var b = a.changedTouches || a.originalEvent && a.originalEvent.changedTouches;
            if ("touchstart" === a.type) return v = b ? b[0].clientY : 0, !0;
            if (a.stopPropagation(), a.preventDefault(), "touchend" === a.type) {
                var c = b ? b[0].clientY : 0;
                if (Math.abs(c - v) > 20) return !1;
            }
        }
        function r(b) {
            j.shouldUpdateOn("click", c, a) && w.val() && (w.val(null), j.updateModel(d, c, a, l(), null, b, !0));
        }
        function s(a) {
            if (w && !w.attr("__ngf_ie10_Fix_")) {
                if (!w[0].parentNode) return void (w = null);
                a.preventDefault(), a.stopPropagation(), w.unbind("click");
                var b = w.clone();
                return w.replaceWith(b), w = b, w.attr("__ngf_ie10_Fix_", "true"), w.bind("change", m), 
                w.bind("click", s), w[0].click(), !1;
            }
            w.removeAttr("__ngf_ie10_Fix_");
        }
        var t = function(a, b) {
            return j.attrGetter(a, c, b);
        };
        j.registerModelChangeValidator(d, c, a);
        var u = [];
        u.push(a.$watch(t("ngfMultiple"), function() {
            w.attr("multiple", t("ngfMultiple", a));
        })), u.push(a.$watch(t("ngfCapture"), function() {
            w.attr("capture", t("ngfCapture", a));
        })), u.push(a.$watch(t("ngfAccept"), function() {
            w.attr("accept", t("ngfAccept", a));
        })), c.$observe("accept", function() {
            w.attr("accept", t("accept"));
        }), u.push(function() {
            c.$$observers && delete c.$$observers.accept;
        });
        var v = 0, w = b;
        k() || (w = o()), w.bind("change", m), k() ? b.bind("click", r) : b.bind("click touchstart touchend", p), 
        -1 !== navigator.appVersion.indexOf("MSIE 10") && w.bind("click", s), d && d.$formatters.push(function(a) {
            return (null == a || 0 === a.length) && w.val() && w.val(null), a;
        }), a.$on("$destroy", function() {
            k() || w.parent().remove(), angular.forEach(u, function(a) {
                a();
            });
        }), h(function() {
            for (var a = 0; a < g.length; a++) {
                var b = g[a];
                document.body.contains(b.el[0]) || (g.splice(a, 1), b.ref.remove());
            }
        }), window.FileAPI && window.FileAPI.ngfFixIE && window.FileAPI.ngfFixIE(b, w, m);
    }
    var g = [];
    return {
        restrict: "AEC",
        require: "?ngModel",
        link: function(e, g, h, i) {
            f(e, g, h, i, a, b, c, d);
        }
    };
} ]), function() {
    function a(a) {
        return "img" === a.tagName.toLowerCase() ? "image" : "audio" === a.tagName.toLowerCase() ? "audio" : "video" === a.tagName.toLowerCase() ? "video" : /./;
    }
    function b(b, c, d, e, f, g, h, i) {
        function j(a) {
            var g = b.attrGetter("ngfNoObjectUrl", f, d);
            b.dataUrl(a, g)["finally"](function() {
                c(function() {
                    var b = (g ? a.$ngfDataUrl : a.$ngfBlobUrl) || a.$ngfDataUrl;
                    i ? e.css("background-image", "url('" + (b || "") + "')") : e.attr("src", b), b ? e.removeClass("ng-hide") : e.addClass("ng-hide");
                });
            });
        }
        c(function() {
            var c = d.$watch(f[g], function(c) {
                var d = h;
                if ("ngfThumbnail" === g && (d || (d = {
                    width: e[0].clientWidth,
                    height: e[0].clientHeight
                }), 0 === d.width && window.getComputedStyle)) {
                    var f = getComputedStyle(e[0]);
                    d = {
                        width: parseInt(f.width.slice(0, -2)),
                        height: parseInt(f.height.slice(0, -2))
                    };
                }
                return angular.isString(c) ? (e.removeClass("ng-hide"), i ? e.css("background-image", "url('" + c + "')") : e.attr("src", c)) : void (!c || !c.type || 0 !== c.type.search(a(e[0])) || i && 0 !== c.type.indexOf("image") ? e.addClass("ng-hide") : d && b.isResizeSupported() ? b.resize(c, d.width, d.height, d.quality).then(function(a) {
                    j(a);
                }, function(a) {
                    throw a;
                }) : j(c));
            });
            d.$on("$destroy", function() {
                c();
            });
        });
    }
    ngFileUpload.service("UploadDataUrl", [ "UploadBase", "$timeout", "$q", function(a, b, c) {
        var d = a;
        return d.base64DataUrl = function(a) {
            if (angular.isArray(a)) {
                var b = c.defer(), e = 0;
                return angular.forEach(a, function(c) {
                    d.dataUrl(c, !0)["finally"](function() {
                        if (e++, e === a.length) {
                            var c = [];
                            angular.forEach(a, function(a) {
                                c.push(a.$ngfDataUrl);
                            }), b.resolve(c, a);
                        }
                    });
                }), b.promise;
            }
            return d.dataUrl(a, !0);
        }, d.dataUrl = function(a, e) {
            if (!a) return d.emptyPromise(a, a);
            if (e && null != a.$ngfDataUrl || !e && null != a.$ngfBlobUrl) return d.emptyPromise(e ? a.$ngfDataUrl : a.$ngfBlobUrl, a);
            var f = e ? a.$$ngfDataUrlPromise : a.$$ngfBlobUrlPromise;
            if (f) return f;
            var g = c.defer();
            return b(function() {
                if (window.FileReader && a && (!window.FileAPI || -1 === navigator.userAgent.indexOf("MSIE 8") || a.size < 2e4) && (!window.FileAPI || -1 === navigator.userAgent.indexOf("MSIE 9") || a.size < 4e6)) {
                    var c = window.URL || window.webkitURL;
                    if (c && c.createObjectURL && !e) {
                        var f;
                        try {
                            f = c.createObjectURL(a);
                        } catch (h) {
                            return void b(function() {
                                a.$ngfBlobUrl = "", g.reject();
                            });
                        }
                        b(function() {
                            if (a.$ngfBlobUrl = f, f) {
                                g.resolve(f, a), d.blobUrls = d.blobUrls || [], d.blobUrlsTotalSize = d.blobUrlsTotalSize || 0, 
                                d.blobUrls.push({
                                    url: f,
                                    size: a.size
                                }), d.blobUrlsTotalSize += a.size || 0;
                                for (var b = d.defaults.blobUrlsMaxMemory || 268435456, e = d.defaults.blobUrlsMaxQueueSize || 200; (d.blobUrlsTotalSize > b || d.blobUrls.length > e) && d.blobUrls.length > 1; ) {
                                    var h = d.blobUrls.splice(0, 1)[0];
                                    c.revokeObjectURL(h.url), d.blobUrlsTotalSize -= h.size;
                                }
                            }
                        });
                    } else {
                        var i = new FileReader();
                        i.onload = function(c) {
                            b(function() {
                                a.$ngfDataUrl = c.target.result, g.resolve(c.target.result, a), b(function() {
                                    delete a.$ngfDataUrl;
                                }, 1e3);
                            });
                        }, i.onerror = function() {
                            b(function() {
                                a.$ngfDataUrl = "", g.reject();
                            });
                        }, i.readAsDataURL(a);
                    }
                } else b(function() {
                    a[e ? "$ngfDataUrl" : "$ngfBlobUrl"] = "", g.reject();
                });
            }), f = e ? a.$$ngfDataUrlPromise = g.promise : a.$$ngfBlobUrlPromise = g.promise, 
            f["finally"](function() {
                delete a[e ? "$$ngfDataUrlPromise" : "$$ngfBlobUrlPromise"];
            }), f;
        }, d;
    } ]), ngFileUpload.directive("ngfSrc", [ "Upload", "$timeout", function(a, c) {
        return {
            restrict: "AE",
            link: function(d, e, f) {
                b(a, c, d, e, f, "ngfSrc", a.attrGetter("ngfResize", f, d), !1);
            }
        };
    } ]), ngFileUpload.directive("ngfBackground", [ "Upload", "$timeout", function(a, c) {
        return {
            restrict: "AE",
            link: function(d, e, f) {
                b(a, c, d, e, f, "ngfBackground", a.attrGetter("ngfResize", f, d), !0);
            }
        };
    } ]), ngFileUpload.directive("ngfThumbnail", [ "Upload", "$timeout", function(a, c) {
        return {
            restrict: "AE",
            link: function(d, e, f) {
                var g = a.attrGetter("ngfSize", f, d);
                b(a, c, d, e, f, "ngfThumbnail", g, a.attrGetter("ngfAsBackground", f, d));
            }
        };
    } ]), ngFileUpload.config([ "$compileProvider", function(a) {
        a.imgSrcSanitizationWhitelist && a.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|local|file|data|blob):/), 
        a.aHrefSanitizationWhitelist && a.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|local|file|data|blob):/);
    } ]), ngFileUpload.filter("ngfDataUrl", [ "UploadDataUrl", "$sce", function(a, b) {
        return function(c, d, e) {
            if (angular.isString(c)) return b.trustAsResourceUrl(c);
            var f = c && ((d ? c.$ngfDataUrl : c.$ngfBlobUrl) || c.$ngfDataUrl);
            return c && !f ? (!c.$ngfDataUrlFilterInProgress && angular.isObject(c) && (c.$ngfDataUrlFilterInProgress = !0, 
            a.dataUrl(c, d)), "") : (c && delete c.$ngfDataUrlFilterInProgress, (c && f ? e ? b.trustAsResourceUrl(f) : f : c) || "");
        };
    } ]);
}(), ngFileUpload.service("UploadValidate", [ "UploadDataUrl", "$q", "$timeout", function(a, b, c) {
    function d(a) {
        var b = "", c = [];
        if (a.length > 2 && "/" === a[0] && "/" === a[a.length - 1]) b = a.substring(1, a.length - 1); else {
            var e = a.split(",");
            if (e.length > 1) for (var f = 0; f < e.length; f++) {
                var g = d(e[f]);
                g.regexp ? (b += "(" + g.regexp + ")", f < e.length - 1 && (b += "|")) : c = c.concat(g.excludes);
            } else 0 === a.indexOf("!") ? c.push("^((?!" + d(a.substring(1)).regexp + ").)*$") : (0 === a.indexOf(".") && (a = "*" + a), 
            b = "^" + a.replace(new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]", "g"), "\\$&") + "$", 
            b = b.replace(/\\\*/g, ".*").replace(/\\\?/g, "."));
        }
        return {
            regexp: b,
            excludes: c
        };
    }
    function e(a, b) {
        null == b || a.$dirty || (a.$setDirty ? a.$setDirty() : a.$dirty = !0);
    }
    var f = a;
    return f.validatePattern = function(a, b) {
        if (!b) return !0;
        var c = d(b), e = !0;
        if (c.regexp && c.regexp.length) {
            var f = new RegExp(c.regexp, "i");
            e = null != a.type && f.test(a.type) || null != a.name && f.test(a.name);
        }
        for (var g = c.excludes.length; g--; ) {
            var h = new RegExp(c.excludes[g], "i");
            e = e && (null == a.type || h.test(a.type)) && (null == a.name || h.test(a.name));
        }
        return e;
    }, f.ratioToFloat = function(a) {
        var b = a.toString(), c = b.search(/[x:]/i);
        return b = c > -1 ? parseFloat(b.substring(0, c)) / parseFloat(b.substring(c + 1)) : parseFloat(b);
    }, f.registerModelChangeValidator = function(a, b, c) {
        a && a.$formatters.push(function(d) {
            a.$dirty && (d && !angular.isArray(d) && (d = [ d ]), f.validate(d, 0, a, b, c).then(function() {
                f.applyModelValidation(a, d);
            }));
        });
    }, f.applyModelValidation = function(a, b) {
        e(a, b), angular.forEach(a.$ngfValidations, function(b) {
            a.$setValidity(b.name, b.valid);
        });
    }, f.getValidationAttr = function(a, b, c, d, e) {
        var g = "ngf" + c[0].toUpperCase() + c.substr(1), h = f.attrGetter(g, a, b, {
            $file: e
        });
        if (null == h && (h = f.attrGetter("ngfValidate", a, b, {
            $file: e
        }))) {
            var i = (d || c).split(".");
            h = h[i[0]], i.length > 1 && (h = h && h[i[1]]);
        }
        return h;
    }, f.validate = function(a, c, d, e, g) {
        function h(b, c, h) {
            if (a) {
                for (var i = a.length, j = null; i--; ) {
                    var k = a[i];
                    if (k) {
                        var l = f.getValidationAttr(e, g, b, c, k);
                        null != l && (h(k, l, i) || (k.$error = b, (k.$errorMessages = k.$errorMessages || {})[b] = !0, 
                        k.$errorParam = l, a.splice(i, 1), j = !1));
                    }
                }
                null !== j && d.$ngfValidations.push({
                    name: b,
                    valid: j
                });
            }
        }
        function i(c, h, i, k, l) {
            function m(a, b, d) {
                null != d ? k(b, d).then(function(e) {
                    l(e, d) ? a.resolve() : (b.$error = c, (b.$errorMessages = b.$errorMessages || {})[c] = !0, 
                    b.$errorParam = d, a.reject());
                }, function() {
                    j("ngfValidateForce", {
                        $file: b
                    }) ? (b.$error = c, (b.$errorMessages = b.$errorMessages || {})[c] = !0, b.$errorParam = d, 
                    a.reject()) : a.resolve();
                }) : a.resolve();
            }
            var n = [ f.emptyPromise() ];
            return a ? (a = void 0 === a.length ? [ a ] : a, angular.forEach(a, function(a) {
                var d = b.defer();
                return n.push(d.promise), !i || null != a.type && 0 === a.type.search(i) ? void ("dimensions" === c && null != f.attrGetter("ngfDimensions", e) ? f.imageDimensions(a).then(function(b) {
                    m(d, a, j("ngfDimensions", {
                        $file: a,
                        $width: b.width,
                        $height: b.height
                    }));
                }, function() {
                    d.reject();
                }) : "duration" === c && null != f.attrGetter("ngfDuration", e) ? f.mediaDuration(a).then(function(b) {
                    m(d, a, j("ngfDuration", {
                        $file: a,
                        $duration: b
                    }));
                }, function() {
                    d.reject();
                }) : m(d, a, f.getValidationAttr(e, g, c, h, a))) : void d.resolve();
            }), b.all(n).then(function() {
                d.$ngfValidations.push({
                    name: c,
                    valid: !0
                });
            }, function() {
                d.$ngfValidations.push({
                    name: c,
                    valid: !1
                });
            })) : void 0;
        }
        d = d || {}, d.$ngfValidations = d.$ngfValidations || [], angular.forEach(d.$ngfValidations, function(a) {
            a.valid = !0;
        });
        var j = function(a, b) {
            return f.attrGetter(a, e, g, b);
        };
        if (null == a || 0 === a.length) return f.emptyPromise(d);
        a = void 0 === a.length ? [ a ] : a.slice(0), h("maxFiles", null, function(a, b, d) {
            return b > c + d;
        }), h("pattern", null, f.validatePattern), h("minSize", "size.min", function(a, b) {
            return a.size + .1 >= f.translateScalars(b);
        }), h("maxSize", "size.max", function(a, b) {
            return a.size - .1 <= f.translateScalars(b);
        });
        var k = 0;
        if (h("maxTotalSize", null, function(b, c) {
            return k += b.size, !(k > f.translateScalars(c)) || (a.splice(0, a.length), !1);
        }), h("validateFn", null, function(a, b) {
            return b === !0 || null === b || "" === b;
        }), !a.length) return f.emptyPromise(d, d.$ngfValidations);
        var l = b.defer(), m = [];
        return m.push(f.happyPromise(i("maxHeight", "height.max", /image/, this.imageDimensions, function(a, b) {
            return a.height <= b;
        }))), m.push(f.happyPromise(i("minHeight", "height.min", /image/, this.imageDimensions, function(a, b) {
            return a.height >= b;
        }))), m.push(f.happyPromise(i("maxWidth", "width.max", /image/, this.imageDimensions, function(a, b) {
            return a.width <= b;
        }))), m.push(f.happyPromise(i("minWidth", "width.min", /image/, this.imageDimensions, function(a, b) {
            return a.width >= b;
        }))), m.push(f.happyPromise(i("dimensions", null, /image/, function(a, b) {
            return f.emptyPromise(b);
        }, function(a) {
            return a;
        }))), m.push(f.happyPromise(i("ratio", null, /image/, this.imageDimensions, function(a, b) {
            for (var c = b.toString().split(","), d = !1, e = 0; e < c.length; e++) Math.abs(a.width / a.height - f.ratioToFloat(c[e])) < 1e-4 && (d = !0);
            return d;
        }))), m.push(f.happyPromise(i("maxRatio", "ratio.max", /image/, this.imageDimensions, function(a, b) {
            return a.width / a.height - f.ratioToFloat(b) < 1e-4;
        }))), m.push(f.happyPromise(i("minRatio", "ratio.min", /image/, this.imageDimensions, function(a, b) {
            return a.width / a.height - f.ratioToFloat(b) > -1e-4;
        }))), m.push(f.happyPromise(i("maxDuration", "duration.max", /audio|video/, this.mediaDuration, function(a, b) {
            return a <= f.translateScalars(b);
        }))), m.push(f.happyPromise(i("minDuration", "duration.min", /audio|video/, this.mediaDuration, function(a, b) {
            return a >= f.translateScalars(b);
        }))), m.push(f.happyPromise(i("duration", null, /audio|video/, function(a, b) {
            return f.emptyPromise(b);
        }, function(a) {
            return a;
        }))), m.push(f.happyPromise(i("validateAsyncFn", null, null, function(a, b) {
            return b;
        }, function(a) {
            return a === !0 || null === a || "" === a;
        }))), b.all(m).then(function() {
            l.resolve(d, d.$ngfValidations);
        });
    }, f.imageDimensions = function(a) {
        if (a.$ngfWidth && a.$ngfHeight) {
            var d = b.defer();
            return c(function() {
                d.resolve({
                    width: a.$ngfWidth,
                    height: a.$ngfHeight
                });
            }), d.promise;
        }
        if (a.$ngfDimensionPromise) return a.$ngfDimensionPromise;
        var e = b.defer();
        return c(function() {
            return 0 !== a.type.indexOf("image") ? void e.reject("not image") : void f.dataUrl(a).then(function(b) {
                function d() {
                    var b = h[0].clientWidth, c = h[0].clientHeight;
                    h.remove(), a.$ngfWidth = b, a.$ngfHeight = c, e.resolve({
                        width: b,
                        height: c
                    });
                }
                function f() {
                    h.remove(), e.reject("load error");
                }
                function g() {
                    c(function() {
                        h[0].parentNode && (h[0].clientWidth ? d() : i > 10 ? f() : g());
                    }, 1e3);
                }
                var h = angular.element("<img>").attr("src", b).css("visibility", "hidden").css("position", "fixed").css("max-width", "none !important").css("max-height", "none !important");
                h.on("load", d), h.on("error", f);
                var i = 0;
                g(), angular.element(document.getElementsByTagName("body")[0]).append(h);
            }, function() {
                e.reject("load error");
            });
        }), a.$ngfDimensionPromise = e.promise, a.$ngfDimensionPromise["finally"](function() {
            delete a.$ngfDimensionPromise;
        }), a.$ngfDimensionPromise;
    }, f.mediaDuration = function(a) {
        if (a.$ngfDuration) {
            var d = b.defer();
            return c(function() {
                d.resolve(a.$ngfDuration);
            }), d.promise;
        }
        if (a.$ngfDurationPromise) return a.$ngfDurationPromise;
        var e = b.defer();
        return c(function() {
            return 0 !== a.type.indexOf("audio") && 0 !== a.type.indexOf("video") ? void e.reject("not media") : void f.dataUrl(a).then(function(b) {
                function d() {
                    var b = h[0].duration;
                    a.$ngfDuration = b, h.remove(), e.resolve(b);
                }
                function f() {
                    h.remove(), e.reject("load error");
                }
                function g() {
                    c(function() {
                        h[0].parentNode && (h[0].duration ? d() : i > 10 ? f() : g());
                    }, 1e3);
                }
                var h = angular.element(0 === a.type.indexOf("audio") ? "<audio>" : "<video>").attr("src", b).css("visibility", "none").css("position", "fixed");
                h.on("loadedmetadata", d), h.on("error", f);
                var i = 0;
                g(), angular.element(document.body).append(h);
            }, function() {
                e.reject("load error");
            });
        }), a.$ngfDurationPromise = e.promise, a.$ngfDurationPromise["finally"](function() {
            delete a.$ngfDurationPromise;
        }), a.$ngfDurationPromise;
    }, f;
} ]), ngFileUpload.service("UploadResize", [ "UploadValidate", "$q", function(a, b) {
    var c = a, d = function(a, b, c, d, e) {
        var f = e ? Math.max(c / a, d / b) : Math.min(c / a, d / b);
        return {
            width: a * f,
            height: b * f,
            marginX: a * f - c,
            marginY: b * f - d
        };
    }, e = function(a, e, f, g, h, i, j, k) {
        var l = b.defer(), m = document.createElement("canvas"), n = document.createElement("img");
        return n.onload = function() {
            if (null != k && k(n.width, n.height) === !1) return void l.reject("resizeIf");
            try {
                if (i) {
                    var a = c.ratioToFloat(i), b = n.width / n.height;
                    a > b ? (e = n.width, f = e / a) : (f = n.height, e = f * a);
                }
                e || (e = n.width), f || (f = n.height);
                var o = d(n.width, n.height, e, f, j);
                m.width = Math.min(o.width, e), m.height = Math.min(o.height, f);
                var p = m.getContext("2d");
                p.drawImage(n, Math.min(0, -o.marginX / 2), Math.min(0, -o.marginY / 2), o.width, o.height), 
                l.resolve(m.toDataURL(h || "image/WebP", g || .934));
            } catch (q) {
                l.reject(q);
            }
        }, n.onerror = function() {
            l.reject();
        }, n.src = a, l.promise;
    };
    return c.dataUrltoBlob = function(a, b, c) {
        for (var d = a.split(","), e = d[0].match(/:(.*?);/)[1], f = atob(d[1]), g = f.length, h = new Uint8Array(g); g--; ) h[g] = f.charCodeAt(g);
        var i = new window.Blob([ h ], {
            type: e
        });
        return i.name = b, i.$ngfOrigSize = c, i;
    }, c.isResizeSupported = function() {
        var a = document.createElement("canvas");
        return window.atob && a.getContext && a.getContext("2d") && window.Blob;
    }, c.isResizeSupported() && Object.defineProperty(window.Blob.prototype, "name", {
        get: function() {
            return this.$ngfName;
        },
        set: function(a) {
            this.$ngfName = a;
        },
        configurable: !0
    }), c.resize = function(a, d, f, g, h, i, j, k, l) {
        if (0 !== a.type.indexOf("image")) return c.emptyPromise(a);
        var m = b.defer();
        return c.dataUrl(a, !0).then(function(b) {
            e(b, d, f, g, h || a.type, i, j, k).then(function(d) {
                if ("image/jpeg" === a.type && l) try {
                    d = c.restoreExif(b, d);
                } catch (e) {
                    setTimeout(function() {
                        throw e;
                    }, 1);
                }
                try {
                    var f = c.dataUrltoBlob(d, a.name, a.size);
                    m.resolve(f);
                } catch (e) {
                    m.reject(e);
                }
            }, function(b) {
                "resizeIf" === b && m.resolve(a), m.reject(b);
            });
        }, function(a) {
            m.reject(a);
        }), m.promise;
    }, c;
} ]), function() {
    function a(a, c, d, e, f, g, h, i, j, k) {
        function l() {
            return c.attr("disabled") || r("ngfDropDisabled", a);
        }
        function m(b, c) {
            i.updateModel(e, d, a, r("ngfChange") || r("ngfDrop"), b, c);
        }
        function n(b, c) {
            if (!i.shouldUpdateOn(b, d, a) || !c) return i.rejectPromise([]);
            var e = [];
            c.replace(/<(img src|img [^>]* src) *=\"([^\"]*)\"/gi, function(a, b, c) {
                e.push(c);
            });
            var f = [], g = [];
            if (e.length) {
                angular.forEach(e, function(a) {
                    f.push(i.urlToBlob(a).then(function(a) {
                        g.push(a);
                    }));
                });
                var h = k.defer();
                return k.all(f).then(function() {
                    h.resolve(g);
                }, function(a) {
                    h.reject(a);
                }), h.promise;
            }
            return i.emptyPromise();
        }
        function o(a, b, c, d) {
            var e = r("ngfDragOverClass", a, {
                $event: c
            }), f = "dragover";
            if (angular.isString(e)) f = e; else if (e && (e.delay && (v = e.delay), e.accept || e.reject)) {
                var g = c.dataTransfer.items;
                if (null != g && g.length) for (var h = e.pattern || r("ngfPattern", a, {
                    $event: c
                }), j = g.length; j--; ) {
                    if (!i.validatePattern(g[j], h)) {
                        f = e.reject;
                        break;
                    }
                    f = e.accept;
                } else f = e.accept;
            }
            d(f);
        }
        function p(b, c, e, f) {
            function g(a, b) {
                var c = k.defer();
                if (null != a) if (a.isDirectory) {
                    var d = [ i.emptyPromise() ];
                    if (m) {
                        var e = {
                            type: "directory"
                        };
                        e.name = e.path = (b || "") + a.name + a.name, n.push(e);
                    }
                    var f = a.createReader(), h = [], p = function() {
                        f.readEntries(function(e) {
                            try {
                                e.length ? (h = h.concat(Array.prototype.slice.call(e || [], 0)), p()) : (angular.forEach(h.slice(0), function(c) {
                                    n.length <= j && l >= o && d.push(g(c, (b ? b : "") + a.name + "/"));
                                }), k.all(d).then(function() {
                                    c.resolve();
                                }, function(a) {
                                    c.reject(a);
                                }));
                            } catch (f) {
                                c.reject(f);
                            }
                        }, function(a) {
                            c.reject(a);
                        });
                    };
                    p();
                } else a.file(function(a) {
                    try {
                        a.path = (b ? b : "") + a.name, m && (a = i.rename(a, a.path)), n.push(a), o += a.size, 
                        c.resolve();
                    } catch (d) {
                        c.reject(d);
                    }
                }, function(a) {
                    c.reject(a);
                });
                return c.promise;
            }
            var j = i.getValidationAttr(d, a, "maxFiles") || Number.MAX_VALUE, l = i.getValidationAttr(d, a, "maxTotalSize") || Number.MAX_VALUE, m = r("ngfIncludeDir", a), n = [], o = 0, p = [ i.emptyPromise() ];
            if (b && b.length > 0 && "file" !== h.protocol()) for (var q = 0; q < b.length; q++) {
                if (b[q].webkitGetAsEntry && b[q].webkitGetAsEntry() && b[q].webkitGetAsEntry().isDirectory) {
                    var s = b[q].webkitGetAsEntry();
                    if (s.isDirectory && !e) continue;
                    null != s && p.push(g(s));
                } else {
                    var t = b[q].getAsFile();
                    null != t && (n.push(t), o += t.size);
                }
                if (n.length > j || o > l || !f && n.length > 0) break;
            } else if (null != c) for (var u = 0; u < c.length; u++) {
                var v = c.item(u);
                if ((v.type || v.size > 0) && (n.push(v), o += v.size), n.length > j || o > l || !f && n.length > 0) break;
            }
            var w = k.defer();
            return k.all(p).then(function() {
                if (f || m || !n.length) w.resolve(n); else {
                    for (var a = 0; n[a] && "directory" === n[a].type; ) a++;
                    w.resolve([ n[a] ]);
                }
            }, function(a) {
                w.reject(a);
            }), w.promise;
        }
        var q = b(), r = function(a, b, c) {
            return i.attrGetter(a, d, b, c);
        };
        if (r("dropAvailable") && g(function() {
            a[r("dropAvailable")] ? a[r("dropAvailable")].value = q : a[r("dropAvailable")] = q;
        }), !q) return void (r("ngfHideOnDropNotAvailable", a) === !0 && c.css("display", "none"));
        null == r("ngfSelect") && i.registerModelChangeValidator(e, d, a);
        var s, t = null, u = f(r("ngfStopPropagation")), v = 1;
        c[0].addEventListener("dragover", function(b) {
            if (!l() && i.shouldUpdateOn("drop", d, a)) {
                if (b.preventDefault(), u(a) && b.stopPropagation(), navigator.userAgent.indexOf("Chrome") > -1) {
                    var e = b.dataTransfer.effectAllowed;
                    b.dataTransfer.dropEffect = "move" === e || "linkMove" === e ? "move" : "copy";
                }
                g.cancel(t), s || (s = "C", o(a, d, b, function(d) {
                    s = d, c.addClass(s), r("ngfDrag", a, {
                        $isDragging: !0,
                        $class: s,
                        $event: b
                    });
                }));
            }
        }, !1), c[0].addEventListener("dragenter", function(b) {
            !l() && i.shouldUpdateOn("drop", d, a) && (b.preventDefault(), u(a) && b.stopPropagation());
        }, !1), c[0].addEventListener("dragleave", function(b) {
            !l() && i.shouldUpdateOn("drop", d, a) && (b.preventDefault(), u(a) && b.stopPropagation(), 
            t = g(function() {
                s && c.removeClass(s), s = null, r("ngfDrag", a, {
                    $isDragging: !1,
                    $event: b
                });
            }, v || 100));
        }, !1), c[0].addEventListener("drop", function(b) {
            if (!l() && i.shouldUpdateOn("drop", d, a)) {
                b.preventDefault(), u(a) && b.stopPropagation(), s && c.removeClass(s), s = null;
                var e, f = b.dataTransfer.items;
                try {
                    e = b.dataTransfer && b.dataTransfer.getData && b.dataTransfer.getData("text/html");
                } catch (g) {}
                p(f, b.dataTransfer.files, r("ngfAllowDir", a) !== !1, r("multiple") || r("ngfMultiple", a)).then(function(a) {
                    a.length ? m(a, b) : n("dropUrl", e).then(function(a) {
                        m(a, b);
                    });
                });
            }
        }, !1), c[0].addEventListener("paste", function(b) {
            if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1 && r("ngfEnableFirefoxPaste", a) && b.preventDefault(), 
            !l() && i.shouldUpdateOn("paste", d, a)) {
                var c = [], e = b.clipboardData || b.originalEvent.clipboardData;
                if (e && e.items) for (var f = 0; f < e.items.length; f++) -1 !== e.items[f].type.indexOf("image") && c.push(e.items[f].getAsFile());
                c.length ? m(c, b) : n("pasteUrl", e).then(function(a) {
                    m(a, b);
                });
            }
        }, !1), navigator.userAgent.toLowerCase().indexOf("firefox") > -1 && r("ngfEnableFirefoxPaste", a) && (c.attr("contenteditable", !0), 
        c.on("keypress", function(a) {
            a.metaKey || a.ctrlKey || a.preventDefault();
        }));
    }
    function b() {
        var a = document.createElement("div");
        return "draggable" in a && "ondrop" in a && !/Edge\/12./i.test(navigator.userAgent);
    }
    ngFileUpload.directive("ngfDrop", [ "$parse", "$timeout", "$location", "Upload", "$http", "$q", function(b, c, d, e, f, g) {
        return {
            restrict: "AEC",
            require: "?ngModel",
            link: function(h, i, j, k) {
                a(h, i, j, k, b, c, d, e, f, g);
            }
        };
    } ]), ngFileUpload.directive("ngfNoFileDrop", function() {
        return function(a, c) {
            b() && c.css("display", "none");
        };
    }), ngFileUpload.directive("ngfDropAvailable", [ "$parse", "$timeout", "Upload", function(a, c, d) {
        return function(e, f, g) {
            if (b()) {
                var h = a(d.attrGetter("ngfDropAvailable", g));
                c(function() {
                    h(e), h.assign && h.assign(e, !0);
                });
            }
        };
    } ]);
}(), ngFileUpload.service("UploadExif", [ "UploadResize", "$q", function(a, b) {
    function c(a, b, c, d) {
        switch (b) {
          case 2:
            return a.transform(-1, 0, 0, 1, c, 0);

          case 3:
            return a.transform(-1, 0, 0, -1, c, d);

          case 4:
            return a.transform(1, 0, 0, -1, 0, d);

          case 5:
            return a.transform(0, 1, 1, 0, 0, 0);

          case 6:
            return a.transform(0, 1, -1, 0, d, 0);

          case 7:
            return a.transform(0, -1, -1, 0, d, c);

          case 8:
            return a.transform(0, -1, 1, 0, 0, c);
        }
    }
    function d(a) {
        for (var b = "", c = new Uint8Array(a), d = c.byteLength, e = 0; d > e; e++) b += String.fromCharCode(c[e]);
        return window.btoa(b);
    }
    var e = a;
    return e.isExifSupported = function() {
        return window.FileReader && new FileReader().readAsArrayBuffer && e.isResizeSupported();
    }, e.readOrientation = function(a) {
        var c = b.defer(), d = new FileReader(), e = a.slice ? a.slice(0, 65536) : a;
        return d.readAsArrayBuffer(e), d.onerror = function(a) {
            return c.reject(a);
        }, d.onload = function(a) {
            var b = {
                orientation: 1
            }, d = new DataView(this.result);
            if (65496 !== d.getUint16(0, !1)) return c.resolve(b);
            for (var e = d.byteLength, f = 2; e > f; ) {
                var g = d.getUint16(f, !1);
                if (f += 2, 65505 === g) {
                    if (1165519206 !== d.getUint32(f += 2, !1)) return c.resolve(b);
                    var h = 18761 === d.getUint16(f += 6, !1);
                    f += d.getUint32(f + 4, h);
                    var i = d.getUint16(f, h);
                    f += 2;
                    for (var j = 0; i > j; j++) if (274 === d.getUint16(f + 12 * j, h)) {
                        var k = d.getUint16(f + 12 * j + 8, h);
                        return k >= 2 && 8 >= k && (d.setUint16(f + 12 * j + 8, 1, h), b.fixedArrayBuffer = a.target.result), 
                        b.orientation = k, c.resolve(b);
                    }
                } else {
                    if (65280 !== (65280 & g)) break;
                    f += d.getUint16(f, !1);
                }
            }
            return c.resolve(b);
        }, c.promise;
    }, e.applyExifRotation = function(a) {
        if (0 !== a.type.indexOf("image/jpeg")) return e.emptyPromise(a);
        var f = b.defer();
        return e.readOrientation(a).then(function(b) {
            return b.orientation < 2 || b.orientation > 8 ? f.resolve(a) : void e.dataUrl(a, !0).then(function(g) {
                var h = document.createElement("canvas"), i = document.createElement("img");
                i.onload = function() {
                    try {
                        h.width = b.orientation > 4 ? i.height : i.width, h.height = b.orientation > 4 ? i.width : i.height;
                        var g = h.getContext("2d");
                        c(g, b.orientation, i.width, i.height), g.drawImage(i, 0, 0);
                        var j = h.toDataURL(a.type || "image/WebP", .934);
                        j = e.restoreExif(d(b.fixedArrayBuffer), j);
                        var k = e.dataUrltoBlob(j, a.name);
                        f.resolve(k);
                    } catch (l) {
                        return f.reject(l);
                    }
                }, i.onerror = function() {
                    f.reject();
                }, i.src = g;
            }, function(a) {
                f.reject(a);
            });
        }, function(a) {
            f.reject(a);
        }), f.promise;
    }, e.restoreExif = function(a, b) {
        var c = {};
        return c.KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", 
        c.encode64 = function(a) {
            var b, c, d, e, f, g = "", h = "", i = "", j = 0;
            do b = a[j++], c = a[j++], h = a[j++], d = b >> 2, e = (3 & b) << 4 | c >> 4, f = (15 & c) << 2 | h >> 6, 
            i = 63 & h, isNaN(c) ? f = i = 64 : isNaN(h) && (i = 64), g = g + this.KEY_STR.charAt(d) + this.KEY_STR.charAt(e) + this.KEY_STR.charAt(f) + this.KEY_STR.charAt(i), 
            b = c = h = "", d = e = f = i = ""; while (j < a.length);
            return g;
        }, c.restore = function(a, b) {
            a.match("data:image/jpeg;base64,") && (a = a.replace("data:image/jpeg;base64,", ""));
            var c = this.decode64(a), d = this.slice2Segments(c), e = this.exifManipulation(b, d);
            return "data:image/jpeg;base64," + this.encode64(e);
        }, c.exifManipulation = function(a, b) {
            var c = this.getExifArray(b), d = this.insertExif(a, c);
            return new Uint8Array(d);
        }, c.getExifArray = function(a) {
            for (var b, c = 0; c < a.length; c++) if (b = a[c], 255 === b[0] & 225 === b[1]) return b;
            return [];
        }, c.insertExif = function(a, b) {
            var c = a.replace("data:image/jpeg;base64,", ""), d = this.decode64(c), e = d.indexOf(255, 3), f = d.slice(0, e), g = d.slice(e), h = f;
            return h = h.concat(b), h = h.concat(g);
        }, c.slice2Segments = function(a) {
            for (var b = 0, c = []; !(255 === a[b] & 218 === a[b + 1]); ) {
                if (255 === a[b] & 216 === a[b + 1]) b += 2; else {
                    var d = 256 * a[b + 2] + a[b + 3], e = b + d + 2, f = a.slice(b, e);
                    c.push(f), b = e;
                }
                if (b > a.length) break;
            }
            return c;
        }, c.decode64 = function(a) {
            var b, c, d, e, f, g = "", h = "", i = 0, j = [], k = /[^A-Za-z0-9\+\/\=]/g;
            k.exec(a) && console.log("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, NaNExpect errors in decoding."), 
            a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            do d = this.KEY_STR.indexOf(a.charAt(i++)), e = this.KEY_STR.indexOf(a.charAt(i++)), 
            f = this.KEY_STR.indexOf(a.charAt(i++)), h = this.KEY_STR.indexOf(a.charAt(i++)), 
            b = d << 2 | e >> 4, c = (15 & e) << 4 | f >> 2, g = (3 & f) << 6 | h, j.push(b), 
            64 !== f && j.push(c), 64 !== h && j.push(g), b = c = g = "", d = e = f = h = ""; while (i < a.length);
            return j;
        }, c.restore(a, b);
    }, e;
} ]), "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.date"), 
function(a) {
    a.module("ui.date", []).constant("uiDateConfig", {}).constant("uiDateFormatConfig", "").factory("uiDateConverter", [ "uiDateFormatConfig", function(b) {
        function c(a, c) {
            if (a = a || b, c) {
                if (a) try {
                    return jQuery.datepicker.formatDate(a, c);
                } catch (d) {
                    return;
                }
                if (c.toISOString) return c.toISOString();
            }
            return null;
        }
        function d(c, d) {
            if (c = c || b, a.isDate(d) && !isNaN(d)) return d;
            if (a.isString(d)) {
                if (c) return jQuery.datepicker.parseDate(c, d);
                var e = new Date(d);
                return isNaN(e.getTime()) ? null : e;
            }
            return a.isNumber(d) ? new Date(d) : null;
        }
        return {
            stringToDate: d,
            dateToString: c
        };
    } ]).directive("uiDate", [ "uiDateConfig", "uiDateConverter", function(b, c) {
        return {
            require: "?ngModel",
            link: function(d, e, f, g) {
                var h = function() {
                    return a.extend({}, b, d.$eval(f.uiDate));
                }, i = function() {
                    function b() {
                        var b = [ "Hours", "Minutes", "Seconds", "Milliseconds" ], c = a.isDate(g.$modelValue), d = {};
                        c && g.$modelValue.toDateString() === e.datepicker("getDate").toDateString() || (c && a.forEach(b, function(a) {
                            d[a] = g.$modelValue["get" + a]();
                        }), g.$setViewValue(e.datepicker("getDate")), c && a.forEach(b, function(a) {
                            g.$viewValue["set" + a](d[a]);
                        }));
                    }
                    var i = !1, j = h();
                    if (g) {
                        var k = j.onSelect || a.noop;
                        j.onSelect = function(a, c) {
                            d.$apply(function() {
                                i = !0, b(), k(a, c), e.blur();
                            });
                        };
                        var l = j.beforeShow || a.noop;
                        j.beforeShow = function(a, b) {
                            i = !0, l(a, b);
                        };
                        var m = j.onClose || a.noop;
                        j.onClose = function(a, b) {
                            i = !1, m(a, b);
                        }, e.off("blur.datepicker").on("blur.datepicker", function() {
                            i || d.$apply(function() {
                                e.datepicker("setDate", e.datepicker("getDate")), b();
                            });
                        }), g.$validators.uiDateValidator = function(b, d) {
                            return a.isDate(c.stringToDate(f.uiDateFormat, d));
                        }, g.$parsers.push(function(a) {
                            return c.stringToDate(f.uiDateFormat, a);
                        }), g.$render = function() {
                            e.datepicker("setDate", g.$modelValue);
                        };
                    }
                    e.data("datepicker") ? (e.datepicker("option", j), e.datepicker("refresh")) : (e.datepicker(j), 
                    e.on("$destroy", function() {
                        e.datepicker("hide"), e.datepicker("destroy");
                    })), g && g.$render();
                };
                d.$watch(h, i, !0);
            }
        };
    } ]).directive("uiDateFormat", [ "uiDateConverter", function(a) {
        return {
            require: "ngModel",
            link: function(b, c, d, e) {
                var f = d.uiDateFormat;
                e.$formatters.unshift(function(b) {
                    return a.stringToDate(f, b);
                }), e.$parsers.push(function(b) {
                    return a.dateToString(f, b);
                });
            }
        };
    } ]);
}(angular), angular.module("angular-input-stars", []).service("FontAwesomeIcons", [ "$http", "$q", function(a, b) {
    this.get = function() {
        var c = b.defer();
        return a.get("https://raw.githubusercontent.com/FortAwesome/Font-Awesome/gh-pages/icons.yml").then(function(a) {
            for (var b = jsyaml.load(a.data), d = {
                iconMap: {},
                iconList: [],
                iconCategoryList: []
            }, e = b.icons, f = 0; f < e.length; f++) {
                d.iconMap[e[f].name] = e[f].id, d.iconList.push(e[f].name);
                for (var g = 0; g < e[f].categories.length; g++) d.iconCategoryList[e[f].categories[g]] || (d.iconCategoryList[e[f].categories[g]] = []), 
                d.iconCategoryList[e[f].categories[g]].push(e[f].name);
            }
            c.resolve(d);
        }, function(a) {
            var b = "Could not fetch FontAwesome Github Repo";
            a || (b = a.data || a), c.reject(b);
        }), c.promise;
    };
} ]).filter("toFaIcon", [ "FontAwesomeIcons", "$timeout", function(a, b) {
    var c = function(a, b) {
        var c = {
            full: "",
            empty: ""
        };
        return __indexOf.call(b.iconList, a) >= 0 ? (c.full = "fa-" + b.iconMap[a], c.empty = "fa-" + b.iconMap[a] + "-o", 
        "thumbs-up" == a || "thumbs-down" == a ? c.empty = "fa-" + b.iconMap[a].split("-")[0] + "-o-" + b.iconMap[a].split("-")[1] : "Smile Outlined" == a && (c.empty = "fa-frown-o"), 
        c) : (console.error("Error no shape of type: " + a + " for rating input"), c);
    };
    return function(a, b, d) {
        var e = c(a, d);
        return b ? e.empty : e.full;
    };
} ]).directive("inputStars", [ "$rootScope", "$filter", "FontAwesomeIcons", "$q", function(a, b, c, d) {
    function e(a, e, f, g) {
        var h = {};
        (function() {
            var a = d.defer();
            return c.get().then(function(b) {
                a.resolve(b);
            }, function(b) {
                a.reject(new Error("toShapeIcon Error: " + b));
            }), a.promise;
        })().then(function(c) {
            !function() {
                a.items = new Array((+f.max)), h.emptyIcon = b("toFaIcon")(f.iconEmpty, !0, c) || f.iconEmpty || "fa-stars-o", 
                h.iconHover = f.iconHover || "angular-input-stars-hover", h.fullIcon = b("toFaIcon")(f.iconFull, !1, c) || f.iconEmpty || "fa-stars", 
                h.iconBase = f.iconBase || "fa fa-fw", a.listClass = f.listClass || "angular-input-stars", 
                a.readonly = !(void 0 === f.readonly);
            }(), f.$observe("max", function(b) {
                a.items = new Array((+b));
            }), f.$observe("iconEmpty", function(a) {
                h.emptyIcon = b("toFaIcon")(a, !0, c) || a || "fa-stars-o";
            }), f.$observe("iconFull", function(a) {
                h.fullIcon = b("toFaIcon")(a, !1, c) || a || "fa-stars";
            }), g.$render = function() {
                a.last_value = g.$viewValue || 0;
            }, a.getClass = function(b) {
                return b >= a.last_value ? h.iconBase + " " + h.emptyIcon : h.iconBase + " " + h.fullIcon + " active ";
            }, a.unpaintStars = function(b, c) {
                a.paintStars(a.last_value - 1, c);
            }, a.paintStars = function(b, c) {
                if (!a.readonly) {
                    for (var d = e.find("li").find("i"), f = 0; f < d.length; f++) {
                        var g = angular.element(d[f]);
                        b >= f ? (g.removeClass(h.emptyIcon), g.addClass(h.fullIcon), g.addClass("active"), 
                        g.addClass(h.iconHover)) : (g.removeClass(h.fullIcon), g.removeClass("active"), 
                        g.removeClass(h.iconHover), g.addClass(h.emptyIcon));
                    }
                    !c && d.removeClass(h.iconHover);
                }
            }, a.setValue = function(b, c) {
                if (!a.readonly) {
                    var d = c.target;
                    c.pageX < d.getBoundingClientRect().left + d.offsetWidth / 2 ? a.last_value = b + 1 : a.last_value = b + 1, 
                    g.$setViewValue(a.last_value), f.onShapeClick && a.$eval(f.onStarClick);
                }
            };
        }, function(a) {
            console.error("angular-input-stars.js | " + a.message || a);
        });
    }
    var f = {
        restrict: "EA",
        replace: !0,
        template: '<ul ng-class="listClass"><li ng-touch="paintStars($index)" ng-mouseenter="paintStars($index, true)" ng-mouseleave="unpaintStars($index, false)" ng-repeat="item in items track by $index"><i  ng-class="getClass($index)" ng-click="setValue($index, $event)"></i></li></ul>',
        require: "ngModel",
        scope: !0,
        link: e
    };
    return f;
} ]), !function(a) {
    var b = "Compound", c = "Identifier", d = "MemberExpression", e = "Literal", f = "ThisExpression", g = "CallExpression", h = "UnaryExpression", i = "BinaryExpression", j = "LogicalExpression", k = "ConditionalExpression", l = "ArrayExpression", m = 46, n = 44, o = 39, p = 34, q = 40, r = 41, s = 91, t = 93, u = 63, v = 59, w = 58, x = function(a, b) {
        var c = new Error(a + " at character " + b);
        throw c.index = b, c.description = a, c;
    }, y = !0, z = {
        "-": y,
        "!": y,
        "~": y,
        "+": y
    }, A = {
        "||": 1,
        "&&": 2,
        "|": 3,
        "^": 4,
        "&": 5,
        "==": 6,
        "!=": 6,
        "===": 6,
        "!==": 6,
        "<": 7,
        ">": 7,
        "<=": 7,
        ">=": 7,
        "<<": 8,
        ">>": 8,
        ">>>": 8,
        "+": 9,
        "-": 9,
        "*": 10,
        "/": 10,
        "%": 10
    }, B = function(a) {
        var b, c = 0;
        for (var d in a) (b = d.length) > c && a.hasOwnProperty(d) && (c = b);
        return c;
    }, C = B(z), D = B(A), E = {
        "true": !0,
        "false": !1,
        "null": null
    }, F = "this", G = function(a) {
        return A[a] || 0;
    }, H = function(a, b, c) {
        var d = "||" === a || "&&" === a ? j : i;
        return {
            type: d,
            operator: a,
            left: b,
            right: c
        };
    }, I = function(a) {
        return a >= 48 && a <= 57;
    }, J = function(a) {
        return 36 === a || 95 === a || a >= 65 && a <= 90 || a >= 97 && a <= 122 || a >= 128 && !A[String.fromCharCode(a)];
    }, K = function(a) {
        return 36 === a || 95 === a || a >= 65 && a <= 90 || a >= 97 && a <= 122 || a >= 48 && a <= 57 || a >= 128 && !A[String.fromCharCode(a)];
    }, L = function(a) {
        for (var i, j, y = 0, B = a.charAt, L = a.charCodeAt, M = function(b) {
            return B.call(a, b);
        }, N = function(b) {
            return L.call(a, b);
        }, O = a.length, P = function() {
            for (var a = N(y); 32 === a || 9 === a; ) a = N(++y);
        }, Q = function() {
            var a, b, c = S();
            return P(), N(y) !== u ? c : (y++, a = Q(), a || x("Expected expression", y), P(), 
            N(y) === w ? (y++, b = Q(), b || x("Expected expression", y), {
                type: k,
                test: c,
                consequent: a,
                alternate: b
            }) : void x("Expected :", y));
        }, R = function() {
            P();
            for (var b = a.substr(y, D), c = b.length; c > 0; ) {
                if (A.hasOwnProperty(b)) return y += c, b;
                b = b.substr(0, --c);
            }
            return !1;
        }, S = function() {
            var a, b, c, d, e, f, g, h;
            if (f = T(), b = R(), !b) return f;
            for (e = {
                value: b,
                prec: G(b)
            }, g = T(), g || x("Expected expression after " + b, y), d = [ f, e, g ]; (b = R()) && (c = G(b), 
            0 !== c); ) {
                for (e = {
                    value: b,
                    prec: c
                }; d.length > 2 && c <= d[d.length - 2].prec; ) g = d.pop(), b = d.pop().value, 
                f = d.pop(), a = H(b, f, g), d.push(a);
                a = T(), a || x("Expected expression after " + b, y), d.push(e, a);
            }
            for (h = d.length - 1, a = d[h]; h > 1; ) a = H(d[h - 1].value, d[h - 2], a), h -= 2;
            return a;
        }, T = function() {
            var b, c, d;
            if (P(), b = N(y), I(b) || b === m) return U();
            if (b === o || b === p) return V();
            if (J(b) || b === q) return Y();
            if (b === s) return $();
            for (c = a.substr(y, C), d = c.length; d > 0; ) {
                if (z.hasOwnProperty(c)) return y += d, {
                    type: h,
                    operator: c,
                    argument: T(),
                    prefix: !0
                };
                c = c.substr(0, --d);
            }
            return !1;
        }, U = function() {
            for (var a, b, c = ""; I(N(y)); ) c += M(y++);
            if (N(y) === m) for (c += M(y++); I(N(y)); ) c += M(y++);
            if (a = M(y), "e" === a || "E" === a) {
                for (c += M(y++), a = M(y), "+" !== a && "-" !== a || (c += M(y++)); I(N(y)); ) c += M(y++);
                I(N(y - 1)) || x("Expected exponent (" + c + M(y) + ")", y);
            }
            return b = N(y), J(b) ? x("Variable names cannot start with a number (" + c + M(y) + ")", y) : b === m && x("Unexpected period", y), 
            {
                type: e,
                value: parseFloat(c),
                raw: c
            };
        }, V = function() {
            for (var a, b = "", c = M(y++), d = !1; y < O; ) {
                if (a = M(y++), a === c) {
                    d = !0;
                    break;
                }
                if ("\\" === a) switch (a = M(y++)) {
                  case "n":
                    b += "\n";
                    break;

                  case "r":
                    b += "\r";
                    break;

                  case "t":
                    b += "\t";
                    break;

                  case "b":
                    b += "\b";
                    break;

                  case "f":
                    b += "\f";
                    break;

                  case "v":
                    b += "\x0B";
                    break;

                  default:
                    b += "\\" + a;
                } else b += a;
            }
            return d || x('Unclosed quote after "' + b + '"', y), {
                type: e,
                value: b,
                raw: c + b + c
            };
        }, W = function() {
            var b, d = N(y), g = y;
            for (J(d) ? y++ : x("Unexpected " + M(y), y); y < O && (d = N(y), K(d)); ) y++;
            return b = a.slice(g, y), E.hasOwnProperty(b) ? {
                type: e,
                value: E[b],
                raw: b
            } : b === F ? {
                type: f
            } : {
                type: c,
                name: b
            };
        }, X = function(a) {
            for (var c, d, e = [], f = !1; y < O; ) {
                if (P(), c = N(y), c === a) {
                    f = !0, y++;
                    break;
                }
                c === n ? y++ : (d = Q(), d && d.type !== b || x("Expected comma", y), e.push(d));
            }
            return f || x("Expected " + String.fromCharCode(a), y), e;
        }, Y = function() {
            var a, b;
            for (a = N(y), b = a === q ? Z() : W(), P(), a = N(y); a === m || a === s || a === q; ) y++, 
            a === m ? (P(), b = {
                type: d,
                computed: !1,
                object: b,
                property: W()
            }) : a === s ? (b = {
                type: d,
                computed: !0,
                object: b,
                property: Q()
            }, P(), a = N(y), a !== t && x("Unclosed [", y), y++) : a === q && (b = {
                type: g,
                arguments: X(r),
                callee: b
            }), P(), a = N(y);
            return b;
        }, Z = function() {
            y++;
            var a = Q();
            return P(), N(y) === r ? (y++, a) : void x("Unclosed (", y);
        }, $ = function() {
            return y++, {
                type: l,
                elements: X(t)
            };
        }, _ = []; y < O; ) i = N(y), i === v || i === n ? y++ : (j = Q()) ? _.push(j) : y < O && x('Unexpected "' + M(y) + '"', y);
        return 1 === _.length ? _[0] : {
            type: b,
            body: _
        };
    };
    if (L.version = "0.3.1", L.toString = function() {
        return "JavaScript Expression Parser (JSEP) v" + L.version;
    }, L.addUnaryOp = function(a) {
        return C = Math.max(a.length, C), z[a] = y, this;
    }, L.addBinaryOp = function(a, b) {
        return D = Math.max(a.length, D), A[a] = b, this;
    }, L.addLiteral = function(a, b) {
        return E[a] = b, this;
    }, L.removeUnaryOp = function(a) {
        return delete z[a], a.length === C && (C = B(z)), this;
    }, L.removeBinaryOp = function(a) {
        return delete A[a], a.length === D && (D = B(A)), this;
    }, L.removeLiteral = function(a) {
        return delete E[a], this;
    }, "undefined" == typeof exports) {
        var M = a.jsep;
        a.jsep = L, L.noConflict = function() {
            return a.jsep === L && (a.jsep = M), L;
        };
    } else "undefined" != typeof module && module.exports ? exports = module.exports = L : exports.parse = L;
}(this), !function(a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a(); else if ("function" == typeof define && define.amd) define([], a); else {
        var b;
        b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, 
        b.Raven = a();
    }
}(function() {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j;
                }
                var k = c[g] = {
                    exports: {}
                };
                b[g][0].call(k.exports, function(a) {
                    var c = b[g][1][a];
                    return e(c ? c : a);
                }, k, k.exports, a, b, c, d);
            }
            return c[g].exports;
        }
        for (var f = "function" == typeof require && require, g = 0; d.length > g; g++) e(d[g]);
        return e;
    }({
        1: [ function(a, b, c) {
            function d(a) {
                this.name = "RavenConfigError", this.message = a;
            }
            d.prototype = new Error(), d.prototype.constructor = d, b.exports = d;
        }, {} ],
        2: [ function(a, b, c) {
            function d() {
                return +new Date();
            }
            function e() {
                this.a = !("object" != typeof JSON || !JSON.stringify), this.b = "undefined" != typeof document, 
                this.c = null, this.d = null, this.e = null, this.f = null, this.g = null, this.h = {}, 
                this.i = {
                    logger: "javascript",
                    ignoreErrors: [],
                    ignoreUrls: [],
                    whitelistUrls: [],
                    includePaths: [],
                    crossOrigin: "anonymous",
                    collectWindowErrors: !0,
                    maxMessageLength: 0,
                    stackTraceLimit: 50
                }, this.j = 0, this.k = !1, this.l = Error.stackTraceLimit, this.m = window.console || {}, 
                this.n = {}, this.o = [], this.p = d(), this.q = [];
                for (var a in this.m) this.n[a] = this.m[a];
            }
            var f = a(5), g = a(1), h = a(4), i = h.isFunction, j = h.isUndefined, k = h.isError, l = h.isEmptyObject, m = h.hasKey, n = h.joinRegExp, o = h.each, p = h.objectMerge, q = h.truncate, r = h.urlencode, s = h.uuid4, t = "source protocol user pass host port path".split(" "), u = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;
            e.prototype = {
                VERSION: "2.3.0",
                debug: !1,
                TraceKit: f,
                config: function(a, b) {
                    var c = this;
                    if (this.e) return this.r("error", "Error: Raven has already been configured"), 
                    this;
                    if (!a) return this;
                    b && o(b, function(a, b) {
                        "tags" === a || "extra" === a ? c.h[a] = b : c.i[a] = b;
                    });
                    var d = this.s(a), e = d.path.lastIndexOf("/"), g = d.path.substr(1, e);
                    return this.t = a, this.i.ignoreErrors.push(/^Script error\.?$/), this.i.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/), 
                    this.i.ignoreErrors = n(this.i.ignoreErrors), this.i.ignoreUrls = !!this.i.ignoreUrls.length && n(this.i.ignoreUrls), 
                    this.i.whitelistUrls = !!this.i.whitelistUrls.length && n(this.i.whitelistUrls), 
                    this.i.includePaths = n(this.i.includePaths), this.f = d.user, this.u = d.pass && d.pass.substr(1), 
                    this.g = d.path.substr(e + 1), this.e = this.v(d), this.w = this.e + "/" + g + "api/" + this.g + "/store/", 
                    this.i.fetchContext && (f.remoteFetching = !0), this.i.linesOfContext && (f.linesOfContext = this.i.linesOfContext), 
                    f.collectWindowErrors = !!this.i.collectWindowErrors, this;
                },
                install: function() {
                    var a = this;
                    return this.isSetup() && !this.k && (f.report.subscribe(function() {
                        a.x.apply(a, arguments);
                    }), this.y(), this.z(), this.k = !0), Error.stackTraceLimit = this.i.stackTraceLimit, 
                    this;
                },
                context: function(a, b, c) {
                    return i(a) && (c = b || [], b = a, a = void 0), this.wrap(a, b).apply(this, c);
                },
                wrap: function(a, b) {
                    function c() {
                        for (var c = [], e = arguments.length, f = !a || a && a.deep !== !1; e--; ) c[e] = f ? d.wrap(a, arguments[e]) : arguments[e];
                        try {
                            return b.apply(this, c);
                        } catch (g) {
                            throw d.A(), d.captureException(g, a), g;
                        }
                    }
                    var d = this;
                    if (j(b) && !i(a)) return a;
                    if (i(a) && (b = a, a = void 0), !i(b)) return b;
                    try {
                        if (b.B) return b;
                    } catch (e) {
                        return b;
                    }
                    if (b.C) return b.C;
                    for (var f in b) m(b, f) && (c[f] = b[f]);
                    return b.C = c, c.prototype = b.prototype, c.B = !0, c.D = b, c;
                },
                uninstall: function() {
                    return f.report.uninstall(), this.E(), Error.stackTraceLimit = this.l, this.k = !1, 
                    this;
                },
                captureException: function(a, b) {
                    if (!k(a)) return this.captureMessage(a, b);
                    this.c = a;
                    try {
                        var c = f.computeStackTrace(a);
                        this.F(c, b);
                    } catch (d) {
                        if (a !== d) throw d;
                    }
                    return this;
                },
                captureMessage: function(a, b) {
                    return this.i.ignoreErrors.test && this.i.ignoreErrors.test(a) ? void 0 : (this.G(p({
                        message: a + ""
                    }, b)), this);
                },
                addPlugin: function(a) {
                    var b = Array.prototype.slice.call(arguments, 1);
                    return this.o.push([ a, b ]), this.k && this.z(), this;
                },
                setUserContext: function(a) {
                    return this.h.user = a, this;
                },
                setExtraContext: function(a) {
                    return this.H("extra", a), this;
                },
                setTagsContext: function(a) {
                    return this.H("tags", a), this;
                },
                clearContext: function() {
                    return this.h = {}, this;
                },
                getContext: function() {
                    return JSON.parse(JSON.stringify(this.h));
                },
                setRelease: function(a) {
                    return this.i.release = a, this;
                },
                setDataCallback: function(a) {
                    return this.i.dataCallback = a, this;
                },
                setShouldSendCallback: function(a) {
                    return this.i.shouldSendCallback = a, this;
                },
                setTransport: function(a) {
                    return this.i.transport = a, this;
                },
                lastException: function() {
                    return this.c;
                },
                lastEventId: function() {
                    return this.d;
                },
                isSetup: function() {
                    return !!this.a && (!!this.e || (this.ravenNotConfiguredError || (this.ravenNotConfiguredError = !0, 
                    this.r("error", "Error: Raven has not been configured.")), !1));
                },
                afterLoad: function() {
                    var a = window.RavenConfig;
                    a && this.config(a.dsn, a.config).install();
                },
                showReportDialog: function(a) {
                    if (window.document) {
                        a = a || {};
                        var b = a.eventId || this.lastEventId();
                        if (!b) throw new g("Missing eventId");
                        var c = a.dsn || this.t;
                        if (!c) throw new g("Missing DSN");
                        var d = encodeURIComponent, e = "";
                        e += "?eventId=" + d(b), e += "&dsn=" + d(c);
                        var f = a.user || this.h.user;
                        f && (f.name && (e += "&name=" + d(f.name)), f.email && (e += "&email=" + d(f.email)));
                        var h = this.v(this.s(c)), i = document.createElement("script");
                        i.async = !0, i.src = h + "/api/embed/error-page/" + e, (document.head || document.body).appendChild(i);
                    }
                },
                A: function() {
                    var a = this;
                    this.j += 1, setTimeout(function() {
                        a.j -= 1;
                    });
                },
                I: function(a, b) {
                    var c, d;
                    if (this.b) {
                        b = b || {}, a = "raven" + a.substr(0, 1).toUpperCase() + a.substr(1), document.createEvent ? (c = document.createEvent("HTMLEvents"), 
                        c.initEvent(a, !0, !0)) : (c = document.createEventObject(), c.eventType = a);
                        for (d in b) m(b, d) && (c[d] = b[d]);
                        if (document.createEvent) document.dispatchEvent(c); else try {
                            document.fireEvent("on" + c.eventType.toLowerCase(), c);
                        } catch (e) {}
                    }
                },
                y: function() {
                    function a(a, b, d, e) {
                        var f = a[b];
                        a[b] = d(f), e || c.q.push([ a, b, f ]);
                    }
                    function b(a) {
                        return function(b, d) {
                            var e = [].slice.call(arguments), f = e[0];
                            return i(f) && (e[0] = c.wrap(f)), a.apply ? a.apply(this, e) : a(e[0], e[1]);
                        };
                    }
                    var c = this;
                    a(window, "setTimeout", b), a(window, "setInterval", b), window.requestAnimationFrame && a(window, "requestAnimationFrame", function(a) {
                        return function(b) {
                            return a(c.wrap(b));
                        };
                    }), "EventTarget Window Node ApplicationCache AudioTrackList ChannelMergerNode CryptoOperation EventSource FileReader HTMLUnknownElement IDBDatabase IDBRequest IDBTransaction KeyOperation MediaController MessagePort ModalWindow Notification SVGElementInstance Screen TextTrack TextTrackCue TextTrackList WebSocket WebSocketWorker Worker XMLHttpRequest XMLHttpRequestEventTarget XMLHttpRequestUpload".replace(/\w+/g, function(b) {
                        var d = window[b] && window[b].prototype;
                        d && d.hasOwnProperty && d.hasOwnProperty("addEventListener") && (a(d, "addEventListener", function(a) {
                            return function(b, d, e, f) {
                                try {
                                    d && d.handleEvent && (d.handleEvent = c.wrap(d.handleEvent));
                                } catch (g) {}
                                return a.call(this, b, c.wrap(d), e, f);
                            };
                        }), a(d, "removeEventListener", function(a) {
                            return function(b, c, d, e) {
                                return c = c && (c.C ? c.C : c), a.call(this, b, c, d, e);
                            };
                        }));
                    }), "XMLHttpRequest" in window && a(XMLHttpRequest.prototype, "send", function(b) {
                        return function(d) {
                            var e = this;
                            return "onreadystatechange onload onerror onprogress".replace(/\w+/g, function(b) {
                                b in e && "[object Function]" === Object.prototype.toString.call(e[b]) && a(e, b, function(a) {
                                    return c.wrap(a);
                                }, !0);
                            }), b.apply(this, arguments);
                        };
                    });
                    var d = window.jQuery || window.$;
                    d && d.fn && d.fn.ready && a(d.fn, "ready", function(a) {
                        return function(b) {
                            return a.call(this, c.wrap(b));
                        };
                    });
                },
                E: function() {
                    for (var a; this.q.length; ) {
                        a = this.q.shift();
                        var b = a[0], c = a[1], d = a[2];
                        b[c] = d;
                    }
                },
                z: function() {
                    var a = this;
                    o(this.o, function(b, c) {
                        var d = c[0], e = c[1];
                        d.apply(a, [ a ].concat(e));
                    });
                },
                s: function(a) {
                    var b = u.exec(a), c = {}, d = 7;
                    try {
                        for (;d--; ) c[t[d]] = b[d] || "";
                    } catch (e) {
                        throw new g("Invalid DSN: " + a);
                    }
                    if (c.pass && !this.i.allowSecretKey) throw new g("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
                    return c;
                },
                v: function(a) {
                    var b = "//" + a.host + (a.port ? ":" + a.port : "");
                    return a.protocol && (b = a.protocol + ":" + b), b;
                },
                x: function() {
                    this.j || this.F.apply(this, arguments);
                },
                F: function(a, b) {
                    var c = this, d = [];
                    a.stack && a.stack.length && o(a.stack, function(a, b) {
                        var e = c.J(b);
                        e && d.push(e);
                    }), this.I("handle", {
                        stackInfo: a,
                        options: b
                    }), this.K(a.name, a.message, a.url, a.lineno, d.slice(0, this.i.stackTraceLimit), b);
                },
                J: function(a) {
                    if (a.url) {
                        var b, c = {
                            filename: a.url,
                            lineno: a.line,
                            colno: a.column,
                            "function": a.func || "?"
                        }, d = this.L(a);
                        if (d) {
                            var e = [ "pre_context", "context_line", "post_context" ];
                            for (b = 3; b--; ) c[e[b]] = d[b];
                        }
                        return c.in_app = !(this.i.includePaths.test && !this.i.includePaths.test(c.filename) || /(Raven|TraceKit)\./.test(c["function"]) || /raven\.(min\.)?js$/.test(c.filename)), 
                        c;
                    }
                },
                L: function(a) {
                    if (a.context && this.i.fetchContext) {
                        for (var b = a.context, c = ~~(b.length / 2), d = b.length, e = !1; d--; ) if (b[d].length > 300) {
                            e = !0;
                            break;
                        }
                        if (e) {
                            if (j(a.column)) return;
                            return [ [], b[c].substr(a.column, 50), [] ];
                        }
                        return [ b.slice(0, c), b[c], b.slice(c + 1) ];
                    }
                },
                K: function(a, b, c, d, e, f) {
                    var g, h;
                    if ((!this.i.ignoreErrors.test || !this.i.ignoreErrors.test(b)) && (b += "", b = q(b, this.i.maxMessageLength), 
                    h = (a ? a + ": " : "") + b, h = q(h, this.i.maxMessageLength), e && e.length ? (c = e[0].filename || c, 
                    e.reverse(), g = {
                        frames: e
                    }) : c && (g = {
                        frames: [ {
                            filename: c,
                            lineno: d,
                            in_app: !0
                        } ]
                    }), (!this.i.ignoreUrls.test || !this.i.ignoreUrls.test(c)) && (!this.i.whitelistUrls.test || this.i.whitelistUrls.test(c)))) {
                        var i = p({
                            exception: {
                                values: [ {
                                    type: a,
                                    value: b,
                                    stacktrace: g
                                } ]
                            },
                            culprit: c,
                            message: h
                        }, f);
                        this.G(i);
                    }
                },
                M: function(a) {
                    var b = this.i.maxMessageLength;
                    if (a.message = q(a.message, b), a.exception) {
                        var c = a.exception.values[0];
                        c.value = q(c.value, b);
                    }
                    return a;
                },
                N: function() {
                    if (this.b && document.location && document.location.href) {
                        var a = {
                            headers: {
                                "User-Agent": navigator.userAgent
                            }
                        };
                        return a.url = document.location.href, document.referrer && (a.headers.Referer = document.referrer), 
                        a;
                    }
                },
                G: function(a) {
                    var b = this, c = this.i, e = {
                        project: this.g,
                        logger: c.logger,
                        platform: "javascript"
                    }, f = this.N();
                    if (f && (e.request = f), a = p(e, a), a.tags = p(p({}, this.h.tags), a.tags), a.extra = p(p({}, this.h.extra), a.extra), 
                    a.extra["session:duration"] = d() - this.p, l(a.tags) && delete a.tags, this.h.user && (a.user = this.h.user), 
                    c.release && (a.release = c.release), c.serverName && (a.server_name = c.serverName), 
                    i(c.dataCallback) && (a = c.dataCallback(a) || a), a && !l(a) && (!i(c.shouldSendCallback) || c.shouldSendCallback(a)) && (this.d = a.event_id || (a.event_id = s()), 
                    a = this.M(a), this.r("debug", "Raven about to send:", a), this.isSetup())) {
                        var g = {
                            sentry_version: "7",
                            sentry_client: "raven-js/" + this.VERSION,
                            sentry_key: this.f
                        };
                        this.u && (g.sentry_secret = this.u);
                        var h = this.w;
                        (c.transport || this.O).call(this, {
                            url: h,
                            auth: g,
                            data: a,
                            options: c,
                            onSuccess: function() {
                                b.I("success", {
                                    data: a,
                                    src: h
                                });
                            },
                            onError: function() {
                                b.I("failure", {
                                    data: a,
                                    src: h
                                });
                            }
                        });
                    }
                },
                P: function(a) {
                    a.auth.sentry_data = JSON.stringify(a.data);
                    var b = this.Q(), c = a.url + "?" + r(a.auth), d = a.options.crossOrigin;
                    (d || "" === d) && (b.crossOrigin = d), b.onload = a.onSuccess, b.onerror = b.onabort = a.onError, 
                    b.src = c;
                },
                R: function(a) {
                    function b() {
                        200 === c.status ? a.onSuccess && a.onSuccess() : a.onError && a.onError();
                    }
                    var c, d = a.url;
                    c = new XMLHttpRequest(), "withCredentials" in c ? c.onreadystatechange = function() {
                        4 === c.readyState && b();
                    } : (c = new XDomainRequest(), d = d.replace(/^https?:/, ""), c.onload = b), c.open("POST", d + "?" + r(a.auth)), 
                    c.send(JSON.stringify(a.data));
                },
                O: function(a) {
                    var b = "withCredentials" in new XMLHttpRequest() || "undefined" != typeof XDomainRequest;
                    return (b ? this.R : this.P)(a);
                },
                Q: function() {
                    return document.createElement("img");
                },
                r: function(a) {
                    this.n[a] && this.debug && Function.prototype.apply.call(this.n[a], this.m, [].slice.call(arguments, 1));
                },
                H: function(a, b) {
                    j(b) ? delete this.h[a] : this.h[a] = p(this.h[a] || {}, b);
                }
            }, e.prototype.setUser = e.prototype.setUserContext, e.prototype.setReleaseContext = e.prototype.setRelease, 
            b.exports = e;
        }, {
            1: 1,
            4: 4,
            5: 5
        } ],
        3: [ function(a, b, c) {
            var d = a(2), e = window.Raven, f = new d();
            f.noConflict = function() {
                return window.Raven = e, f;
            }, f.afterLoad(), b.exports = f;
        }, {
            2: 2
        } ],
        4: [ function(a, b, c) {
            function d(a) {
                return void 0 === a;
            }
            function e(a) {
                return "function" == typeof a;
            }
            function f(a) {
                return "[object String]" === q.toString.call(a);
            }
            function g(a) {
                return "object" == typeof a && null !== a;
            }
            function h(a) {
                for (var b in a) return !1;
                return !0;
            }
            function i(a) {
                var b = q.toString.call(a);
                return g(a) && "[object Error]" === b || "[object Exception]" === b || a instanceof Error;
            }
            function j(a, b) {
                var c, e;
                if (d(a.length)) for (c in a) m(a, c) && b.call(null, c, a[c]); else if (e = a.length) for (c = 0; e > c; c++) b.call(null, c, a[c]);
            }
            function k(a, b) {
                return b ? (j(b, function(b, c) {
                    a[b] = c;
                }), a) : a;
            }
            function l(a, b) {
                return !b || b >= a.length ? a : a.substr(0, b) + "…";
            }
            function m(a, b) {
                return q.hasOwnProperty.call(a, b);
            }
            function n(a) {
                for (var b, c = [], d = 0, e = a.length; e > d; d++) b = a[d], f(b) ? c.push(b.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : b && b.source && c.push(b.source);
                return new RegExp(c.join("|"), "i");
            }
            function o(a) {
                var b = [];
                return j(a, function(a, c) {
                    b.push(encodeURIComponent(a) + "=" + encodeURIComponent(c));
                }), b.join("&");
            }
            function p() {
                var a = window.crypto || window.msCrypto;
                if (!d(a) && a.getRandomValues) {
                    var b = new Uint16Array(8);
                    a.getRandomValues(b), b[3] = 4095 & b[3] | 16384, b[4] = 16383 & b[4] | 32768;
                    var c = function(a) {
                        for (var b = a.toString(16); 4 > b.length; ) b = "0" + b;
                        return b;
                    };
                    return c(b[0]) + c(b[1]) + c(b[2]) + c(b[3]) + c(b[4]) + c(b[5]) + c(b[6]) + c(b[7]);
                }
                return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                    var b = 16 * Math.random() | 0, c = "x" === a ? b : 3 & b | 8;
                    return c.toString(16);
                });
            }
            var q = Object.prototype;
            b.exports = {
                isUndefined: d,
                isFunction: e,
                isString: f,
                isObject: g,
                isEmptyObject: h,
                isError: i,
                each: j,
                objectMerge: k,
                truncate: l,
                hasKey: m,
                joinRegExp: n,
                urlencode: o,
                uuid4: p
            };
        }, {} ],
        5: [ function(a, b, c) {
            function d() {
                return "undefined" == typeof document ? "" : document.location.href;
            }
            var e = a(4), f = e.hasKey, g = e.isString, h = e.isUndefined, i = {
                remoteFetching: !1,
                collectWindowErrors: !0,
                linesOfContext: 7,
                debug: !1
            }, j = [].slice, k = "?", l = /^(?:Uncaught )?((?:Eval|Internal|Range|Reference|Syntax|Type|URI)Error)\: ?(.*)$/;
            i.report = function() {
                function a(a) {
                    k(), r.push(a);
                }
                function b(a) {
                    for (var b = r.length - 1; b >= 0; --b) r[b] === a && r.splice(b, 1);
                }
                function c() {
                    m(), r = [];
                }
                function e(a, b) {
                    var c = null;
                    if (!b || i.collectWindowErrors) {
                        for (var d in r) if (f(r, d)) try {
                            r[d].apply(null, [ a ].concat(j.call(arguments, 2)));
                        } catch (e) {
                            c = e;
                        }
                        if (c) throw c;
                    }
                }
                function h(a, b, c, f, h) {
                    var j = null;
                    if (u) i.computeStackTrace.augmentStackTraceWithInitialElement(u, b, c, a), n(); else if (h) j = i.computeStackTrace(h), 
                    e(j, !0); else {
                        var k = {
                            url: b,
                            line: c,
                            column: f
                        };
                        k.func = i.computeStackTrace.guessFunctionName(k.url, k.line), k.context = i.computeStackTrace.gatherContext(k.url, k.line);
                        var m, o = void 0, q = a;
                        if (g(a)) {
                            var m = a.match(l);
                            m && (o = m[1], q = m[2]);
                        }
                        j = {
                            name: o,
                            message: q,
                            url: d(),
                            stack: [ k ]
                        }, e(j, !0);
                    }
                    return !!p && p.apply(this, arguments);
                }
                function k() {
                    q || (p = window.onerror, window.onerror = h, q = !0);
                }
                function m() {
                    q && (window.onerror = p, q = !1, p = void 0);
                }
                function n() {
                    var a = u, b = s;
                    s = null, u = null, t = null, e.apply(null, [ a, !1 ].concat(b));
                }
                function o(a, b) {
                    var c = j.call(arguments, 1);
                    if (u) {
                        if (t === a) return;
                        n();
                    }
                    var d = i.computeStackTrace(a);
                    if (u = d, t = a, s = c, window.setTimeout(function() {
                        t === a && n();
                    }, d.incomplete ? 2e3 : 0), b !== !1) throw a;
                }
                var p, q, r = [], s = null, t = null, u = null;
                return o.subscribe = a, o.unsubscribe = b, o.uninstall = c, o;
            }(), i.computeStackTrace = function() {
                function a(a) {
                    if (!i.remoteFetching) return "";
                    try {
                        var b = function() {
                            try {
                                return new window.XMLHttpRequest();
                            } catch (a) {
                                return new window.ActiveXObject("Microsoft.XMLHTTP");
                            }
                        }, c = b();
                        return c.open("GET", a, !1), c.send(""), c.responseText;
                    } catch (d) {
                        return "";
                    }
                }
                function b(b) {
                    if (!g(b)) return [];
                    if (!f(v, b)) {
                        var c = "", d = "";
                        try {
                            d = document.domain;
                        } catch (e) {}
                        -1 !== b.indexOf(d) && (c = a(b)), v[b] = c ? c.split("\n") : [];
                    }
                    return v[b];
                }
                function c(a, c) {
                    var d, e = /function ([^(]*)\(([^)]*)\)/, f = /['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/, g = "", i = 10, j = b(a);
                    if (!j.length) return k;
                    for (var l = 0; i > l; ++l) if (g = j[c - l] + g, !h(g)) {
                        if (d = f.exec(g)) return d[1];
                        if (d = e.exec(g)) return d[1];
                    }
                    return k;
                }
                function e(a, c) {
                    var d = b(a);
                    if (!d.length) return null;
                    var e = [], f = Math.floor(i.linesOfContext / 2), g = f + i.linesOfContext % 2, j = Math.max(0, c - f - 1), k = Math.min(d.length, c + g - 1);
                    c -= 1;
                    for (var l = j; k > l; ++l) h(d[l]) || e.push(d[l]);
                    return e.length > 0 ? e : null;
                }
                function j(a) {
                    return a.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, "\\$&");
                }
                function l(a) {
                    return j(a).replace("<", "(?:<|&lt;)").replace(">", "(?:>|&gt;)").replace("&", "(?:&|&amp;)").replace('"', '(?:"|&quot;)').replace(/\s+/g, "\\s+");
                }
                function m(a, c) {
                    for (var d, e, f = 0, g = c.length; g > f; ++f) if ((d = b(c[f])).length && (d = d.join("\n"), 
                    e = a.exec(d))) return {
                        url: c[f],
                        line: d.substring(0, e.index).split("\n").length,
                        column: e.index - d.lastIndexOf("\n", e.index) - 1
                    };
                    return null;
                }
                function n(a, c, d) {
                    var e, f = b(c), g = new RegExp("\\b" + j(a) + "\\b");
                    return d -= 1, f && f.length > d && (e = g.exec(f[d])) ? e.index : null;
                }
                function o(a) {
                    if ("undefined" != typeof document) {
                        for (var b, c, d, e, f = [ window.location.href ], g = document.getElementsByTagName("script"), h = "" + a, i = /^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/, k = /^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/, n = 0; g.length > n; ++n) {
                            var o = g[n];
                            o.src && f.push(o.src);
                        }
                        if (d = i.exec(h)) {
                            var p = d[1] ? "\\s+" + d[1] : "", q = d[2].split(",").join("\\s*,\\s*");
                            b = j(d[3]).replace(/;$/, ";?"), c = new RegExp("function" + p + "\\s*\\(\\s*" + q + "\\s*\\)\\s*{\\s*" + b + "\\s*}");
                        } else c = new RegExp(j(h).replace(/\s+/g, "\\s+"));
                        if (e = m(c, f)) return e;
                        if (d = k.exec(h)) {
                            var r = d[1];
                            if (b = l(d[2]), c = new RegExp("on" + r + "=[\\'\"]\\s*" + b + "\\s*[\\'\"]", "i"), 
                            e = m(c, f[0])) return e;
                            if (c = new RegExp(b), e = m(c, f)) return e;
                        }
                        return null;
                    }
                }
                function p(a) {
                    if (!h(a.stack) && a.stack) {
                        for (var b, f, g = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|<anonymous>).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, i = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|\[native).*?)(?::(\d+))?(?::(\d+))?\s*$/i, j = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:ms-appx|https?|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, l = a.stack.split("\n"), m = [], o = /^(.*) is undefined$/.exec(a.message), p = 0, q = l.length; q > p; ++p) {
                            if (b = g.exec(l[p])) {
                                var r = b[2] && -1 !== b[2].indexOf("native");
                                f = {
                                    url: r ? null : b[2],
                                    func: b[1] || k,
                                    args: r ? [ b[2] ] : [],
                                    line: b[3] ? +b[3] : null,
                                    column: b[4] ? +b[4] : null
                                };
                            } else if (b = j.exec(l[p])) f = {
                                url: b[2],
                                func: b[1] || k,
                                args: [],
                                line: +b[3],
                                column: b[4] ? +b[4] : null
                            }; else {
                                if (!(b = i.exec(l[p]))) continue;
                                f = {
                                    url: b[3],
                                    func: b[1] || k,
                                    args: b[2] ? b[2].split(",") : [],
                                    line: b[4] ? +b[4] : null,
                                    column: b[5] ? +b[5] : null
                                };
                            }
                            !f.func && f.line && (f.func = c(f.url, f.line)), f.line && (f.context = e(f.url, f.line)), 
                            m.push(f);
                        }
                        return m.length ? (m[0].line && !m[0].column && o ? m[0].column = n(o[1], m[0].url, m[0].line) : m[0].column || h(a.columnNumber) || (m[0].column = a.columnNumber + 1), 
                        {
                            name: a.name,
                            message: a.message,
                            url: d(),
                            stack: m
                        }) : null;
                    }
                }
                function q(a) {
                    var b = a.stacktrace;
                    if (!h(a.stacktrace) && a.stacktrace) {
                        for (var f, g = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, i = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i, j = b.split("\n"), k = [], l = 0; j.length > l; l += 2) {
                            var m = null;
                            if ((f = g.exec(j[l])) ? m = {
                                url: f[2],
                                line: +f[1],
                                column: null,
                                func: f[3],
                                args: []
                            } : (f = i.exec(j[l])) && (m = {
                                url: f[6],
                                line: +f[1],
                                column: +f[2],
                                func: f[3] || f[4],
                                args: f[5] ? f[5].split(",") : []
                            }), m) {
                                if (!m.func && m.line && (m.func = c(m.url, m.line)), m.line) try {
                                    m.context = e(m.url, m.line);
                                } catch (n) {}
                                m.context || (m.context = [ j[l + 1] ]), k.push(m);
                            }
                        }
                        return k.length ? {
                            name: a.name,
                            message: a.message,
                            url: d(),
                            stack: k
                        } : null;
                    }
                }
                function r(a) {
                    var g = a.message.split("\n");
                    if (4 > g.length) return null;
                    var h, i = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i, j = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i, k = /^\s*Line (\d+) of function script\s*$/i, n = [], o = document.getElementsByTagName("script"), p = [];
                    for (var q in o) f(o, q) && !o[q].src && p.push(o[q]);
                    for (var r = 2; g.length > r; r += 2) {
                        var s = null;
                        if (h = i.exec(g[r])) s = {
                            url: h[2],
                            func: h[3],
                            args: [],
                            line: +h[1],
                            column: null
                        }; else if (h = j.exec(g[r])) {
                            s = {
                                url: h[3],
                                func: h[4],
                                args: [],
                                line: +h[1],
                                column: null
                            };
                            var t = +h[1], u = p[h[2] - 1];
                            if (u) {
                                var v = b(s.url);
                                if (v) {
                                    v = v.join("\n");
                                    var w = v.indexOf(u.innerText);
                                    w >= 0 && (s.line = t + v.substring(0, w).split("\n").length);
                                }
                            }
                        } else if (h = k.exec(g[r])) {
                            var x = window.location.href.replace(/#.*$/, ""), y = new RegExp(l(g[r + 1])), z = m(y, [ x ]);
                            s = {
                                url: x,
                                func: "",
                                args: [],
                                line: z ? z.line : h[1],
                                column: null
                            };
                        }
                        if (s) {
                            s.func || (s.func = c(s.url, s.line));
                            var A = e(s.url, s.line), B = A ? A[Math.floor(A.length / 2)] : null;
                            s.context = A && B.replace(/^\s*/, "") === g[r + 1].replace(/^\s*/, "") ? A : [ g[r + 1] ], 
                            n.push(s);
                        }
                    }
                    return n.length ? {
                        name: a.name,
                        message: g[0],
                        url: d(),
                        stack: n
                    } : null;
                }
                function s(a, b, d, f) {
                    var g = {
                        url: b,
                        line: d
                    };
                    if (g.url && g.line) {
                        a.incomplete = !1, g.func || (g.func = c(g.url, g.line)), g.context || (g.context = e(g.url, g.line));
                        var h = / '([^']+)' /.exec(f);
                        if (h && (g.column = n(h[1], g.url, g.line)), a.stack.length > 0 && a.stack[0].url === g.url) {
                            if (a.stack[0].line === g.line) return !1;
                            if (!a.stack[0].line && a.stack[0].func === g.func) return a.stack[0].line = g.line, 
                            a.stack[0].context = g.context, !1;
                        }
                        return a.stack.unshift(g), a.partial = !0, !0;
                    }
                    return a.incomplete = !0, !1;
                }
                function t(a, b) {
                    for (var e, f, g, h = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, j = [], l = {}, m = !1, p = t.caller; p && !m; p = p.caller) if (p !== u && p !== i.report) {
                        if (f = {
                            url: null,
                            func: k,
                            line: null,
                            column: null
                        }, p.name ? f.func = p.name : (e = h.exec(p.toString())) && (f.func = e[1]), "undefined" == typeof f.func) try {
                            f.func = e.input.substring(0, e.input.indexOf("{"));
                        } catch (q) {}
                        if (g = o(p)) {
                            f.url = g.url, f.line = g.line, f.func === k && (f.func = c(f.url, f.line));
                            var r = / '([^']+)' /.exec(a.message || a.description);
                            r && (f.column = n(r[1], g.url, g.line));
                        }
                        l["" + p] ? m = !0 : l["" + p] = !0, j.push(f);
                    }
                    b && j.splice(0, b);
                    var v = {
                        name: a.name,
                        message: a.message,
                        url: d(),
                        stack: j
                    };
                    return s(v, a.sourceURL || a.fileName, a.line || a.lineNumber, a.message || a.description), 
                    v;
                }
                function u(a, b) {
                    var c = null;
                    b = null == b ? 0 : +b;
                    try {
                        if (c = q(a)) return c;
                    } catch (e) {
                        if (i.debug) throw e;
                    }
                    try {
                        if (c = p(a)) return c;
                    } catch (e) {
                        if (i.debug) throw e;
                    }
                    try {
                        if (c = r(a)) return c;
                    } catch (e) {
                        if (i.debug) throw e;
                    }
                    try {
                        if (c = t(a, b + 1)) return c;
                    } catch (e) {
                        if (i.debug) throw e;
                    }
                    return {
                        name: a.name,
                        message: a.message,
                        url: d()
                    };
                }
                var v = {};
                return u.augmentStackTraceWithInitialElement = s, u.computeStackTraceFromStackProp = p, 
                u.guessFunctionName = c, u.gatherContext = e, u;
            }(), b.exports = i;
        }, {
            4: 4
        } ]
    }, {}, [ 3 ])(3);
}), function() {
    function a(a, b) {
        if (a !== b) {
            var c = null === a, d = a === u, e = a === a, f = null === b, g = b === u, h = b === b;
            if (a > b && !f || !e || c && !g && h || d && h) return 1;
            if (a < b && !c || !h || f && !d && e || g && e) return -1;
        }
        return 0;
    }
    function b(a, b, c) {
        for (var d = a.length, e = c ? d : -1; c ? e-- : ++e < d; ) if (b(a[e], e, a)) return e;
        return -1;
    }
    function c(a, b, c) {
        if (b !== b) return m(a, c);
        c -= 1;
        for (var d = a.length; ++c < d; ) if (a[c] === b) return c;
        return -1;
    }
    function d(a) {
        return "function" == typeof a || !1;
    }
    function e(a) {
        return null == a ? "" : a + "";
    }
    function f(a, b) {
        for (var c = -1, d = a.length; ++c < d && -1 < b.indexOf(a.charAt(c)); ) ;
        return c;
    }
    function g(a, b) {
        for (var c = a.length; c-- && -1 < b.indexOf(a.charAt(c)); ) ;
        return c;
    }
    function h(b, c) {
        return a(b.a, c.a) || b.b - c.b;
    }
    function i(a) {
        return Ja[a];
    }
    function j(a) {
        return Ka[a];
    }
    function k(a, b, c) {
        return b ? a = Na[a] : c && (a = Oa[a]), "\\" + a;
    }
    function l(a) {
        return "\\" + Oa[a];
    }
    function m(a, b, c) {
        var d = a.length;
        for (b += c ? 0 : -1; c ? b-- : ++b < d; ) {
            var e = a[b];
            if (e !== e) return b;
        }
        return -1;
    }
    function n(a) {
        return !!a && "object" == typeof a;
    }
    function o(a) {
        return 160 >= a && 9 <= a && 13 >= a || 32 == a || 160 == a || 5760 == a || 6158 == a || 8192 <= a && (8202 >= a || 8232 == a || 8233 == a || 8239 == a || 8287 == a || 12288 == a || 65279 == a);
    }
    function p(a, b) {
        for (var c = -1, d = a.length, e = -1, f = []; ++c < d; ) a[c] === b && (a[c] = N, 
        f[++e] = c);
        return f;
    }
    function q(a) {
        for (var b = -1, c = a.length; ++b < c && o(a.charCodeAt(b)); ) ;
        return b;
    }
    function r(a) {
        for (var b = a.length; b-- && o(a.charCodeAt(b)); ) ;
        return b;
    }
    function s(a) {
        return La[a];
    }
    function t(o) {
        function Ja(a) {
            if (n(a) && !(Bf(a) || a instanceof Ma)) {
                if (a instanceof La) return a;
                if (_d.call(a, "__chain__") && _d.call(a, "__wrapped__")) return Pc(a);
            }
            return new La(a);
        }
        function Ka() {}
        function La(a, b, c) {
            this.__wrapped__ = a, this.__actions__ = c || [], this.__chain__ = !!b;
        }
        function Ma(a) {
            this.__wrapped__ = a, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, 
            this.__iteratees__ = [], this.__takeCount__ = Ae, this.__views__ = [];
        }
        function Na() {
            this.__data__ = {};
        }
        function Oa(a) {
            var b = a ? a.length : 0;
            for (this.data = {
                hash: pe(null),
                set: new je()
            }; b--; ) this.push(a[b]);
        }
        function Pa(a, b) {
            var c = a.data;
            return ("string" == typeof b || pd(b) ? c.set.has(b) : c.hash[b]) ? 0 : -1;
        }
        function Qa(a, b) {
            var c = -1, d = a.length;
            for (b || (b = Nd(d)); ++c < d; ) b[c] = a[c];
            return b;
        }
        function Ra(a, b) {
            for (var c = -1, d = a.length; ++c < d && !1 !== b(a[c], c, a); ) ;
            return a;
        }
        function Sa(a, b) {
            for (var c = -1, d = a.length; ++c < d; ) if (!b(a[c], c, a)) return !1;
            return !0;
        }
        function Ta(a, b) {
            for (var c = -1, d = a.length, e = -1, f = []; ++c < d; ) {
                var g = a[c];
                b(g, c, a) && (f[++e] = g);
            }
            return f;
        }
        function Wa(a, b) {
            for (var c = -1, d = a.length, e = Nd(d); ++c < d; ) e[c] = b(a[c], c, a);
            return e;
        }
        function Xa(a, b) {
            for (var c = -1, d = b.length, e = a.length; ++c < d; ) a[e + c] = b[c];
            return a;
        }
        function Ya(a, b, c, d) {
            var e = -1, f = a.length;
            for (d && f && (c = a[++e]); ++e < f; ) c = b(c, a[e], e, a);
            return c;
        }
        function Za(a, b) {
            for (var c = -1, d = a.length; ++c < d; ) if (b(a[c], c, a)) return !0;
            return !1;
        }
        function $a(a, b, c, d) {
            return a !== u && _d.call(d, c) ? a : b;
        }
        function _a(a, b, c) {
            for (var d = -1, e = Mf(b), f = e.length; ++d < f; ) {
                var g = e[d], h = a[g], i = c(h, b[g], g, a, b);
                (i === i ? i === h : h !== h) && (h !== u || g in a) || (a[g] = i);
            }
            return a;
        }
        function ab(a, b) {
            return null == b ? a : cb(b, Mf(b), a);
        }
        function bb(a, b) {
            for (var c = -1, d = null == a, e = !d && Cc(a), f = e ? a.length : 0, g = b.length, h = Nd(g); ++c < g; ) {
                var i = b[c];
                h[c] = e ? Dc(i, f) ? a[i] : u : d ? u : a[i];
            }
            return h;
        }
        function cb(a, b, c) {
            c || (c = {});
            for (var d = -1, e = b.length; ++d < e; ) {
                var f = b[d];
                c[f] = a[f];
            }
            return c;
        }
        function db(a, b, c) {
            var d = typeof a;
            return "function" == d ? b === u ? a : Nb(a, b, c) : null == a ? Id : "object" == d ? ub(a) : b === u ? Md(a) : vb(a, b);
        }
        function eb(a, b, c, d, e, f, g) {
            var h;
            if (c && (h = e ? c(a, d, e) : c(a)), h !== u) return h;
            if (!pd(a)) return a;
            if (d = Bf(a)) {
                if (h = yc(a), !b) return Qa(a, h);
            } else {
                var i = be.call(a), j = i == T;
                if (i != V && i != O && (!j || e)) return Ia[i] ? Ac(a, i, b) : e ? a : {};
                if (h = zc(j ? {} : a), !b) return ab(h, a);
            }
            for (f || (f = []), g || (g = []), e = f.length; e--; ) if (f[e] == a) return g[e];
            return f.push(a), g.push(h), (d ? Ra : nb)(a, function(d, e) {
                h[e] = eb(d, b, c, e, a, f, g);
            }), h;
        }
        function fb(a, b, c) {
            if ("function" != typeof a) throw new Wd(M);
            return ke(function() {
                a.apply(u, c);
            }, b);
        }
        function gb(a, b) {
            var d = a ? a.length : 0, e = [];
            if (!d) return e;
            var f = -1, g = vc(), h = g === c, i = h && b.length >= J && pe && je ? new Oa(b) : null, j = b.length;
            i && (g = Pa, h = !1, b = i);
            a: for (;++f < d; ) if (i = a[f], h && i === i) {
                for (var k = j; k--; ) if (b[k] === i) continue a;
                e.push(i);
            } else 0 > g(b, i, 0) && e.push(i);
            return e;
        }
        function hb(a, b) {
            var c = !0;
            return He(a, function(a, d, e) {
                return c = !!b(a, d, e);
            }), c;
        }
        function ib(a, b, c, d) {
            var e = d, f = e;
            return He(a, function(a, g, h) {
                g = +b(a, g, h), (c(g, e) || g === d && g === f) && (e = g, f = a);
            }), f;
        }
        function jb(a, b) {
            var c = [];
            return He(a, function(a, d, e) {
                b(a, d, e) && c.push(a);
            }), c;
        }
        function kb(a, b, c, d) {
            var e;
            return c(a, function(a, c, f) {
                return b(a, c, f) ? (e = d ? c : a, !1) : void 0;
            }), e;
        }
        function lb(a, b, c, d) {
            d || (d = []);
            for (var e = -1, f = a.length; ++e < f; ) {
                var g = a[e];
                n(g) && Cc(g) && (c || Bf(g) || ld(g)) ? b ? lb(g, b, c, d) : Xa(d, g) : c || (d[d.length] = g);
            }
            return d;
        }
        function mb(a, b) {
            Je(a, b, Ad);
        }
        function nb(a, b) {
            return Je(a, b, Mf);
        }
        function ob(a, b) {
            return Ke(a, b, Mf);
        }
        function pb(a, b) {
            for (var c = -1, d = b.length, e = -1, f = []; ++c < d; ) {
                var g = b[c];
                od(a[g]) && (f[++e] = g);
            }
            return f;
        }
        function qb(a, b, c) {
            if (null != a) {
                c !== u && c in Nc(a) && (b = [ c ]), c = 0;
                for (var d = b.length; null != a && c < d; ) a = a[b[c++]];
                return c && c == d ? a : u;
            }
        }
        function rb(a, b, c, d, e, f) {
            if (a === b) a = !0; else if (null == a || null == b || !pd(a) && !n(b)) a = a !== a && b !== b; else a: {
                var g = rb, h = Bf(a), i = Bf(b), j = P, k = P;
                h || (j = be.call(a), j == O ? j = V : j != V && (h = vd(a))), i || (k = be.call(b), 
                k == O ? k = V : k != V && vd(b));
                var l = j == V, i = k == V, k = j == k;
                if (!k || h || l) {
                    if (!d && (j = l && _d.call(a, "__wrapped__"), i = i && _d.call(b, "__wrapped__"), 
                    j || i)) {
                        a = g(j ? a.value() : a, i ? b.value() : b, c, d, e, f);
                        break a;
                    }
                    if (k) {
                        for (e || (e = []), f || (f = []), j = e.length; j--; ) if (e[j] == a) {
                            a = f[j] == b;
                            break a;
                        }
                        e.push(a), f.push(b), a = (h ? qc : sc)(a, b, g, c, d, e, f), e.pop(), f.pop();
                    } else a = !1;
                } else a = rc(a, b, j);
            }
            return a;
        }
        function sb(a, b, c) {
            var d = b.length, e = d, f = !c;
            if (null == a) return !e;
            for (a = Nc(a); d--; ) {
                var g = b[d];
                if (f && g[2] ? g[1] !== a[g[0]] : !(g[0] in a)) return !1;
            }
            for (;++d < e; ) {
                var g = b[d], h = g[0], i = a[h], j = g[1];
                if (f && g[2]) {
                    if (i === u && !(h in a)) return !1;
                } else if (g = c ? c(i, j, h) : u, g === u ? !rb(j, i, c, !0) : !g) return !1;
            }
            return !0;
        }
        function tb(a, b) {
            var c = -1, d = Cc(a) ? Nd(a.length) : [];
            return He(a, function(a, e, f) {
                d[++c] = b(a, e, f);
            }), d;
        }
        function ub(a) {
            var b = wc(a);
            if (1 == b.length && b[0][2]) {
                var c = b[0][0], d = b[0][1];
                return function(a) {
                    return null != a && (a[c] === d && (d !== u || c in Nc(a)));
                };
            }
            return function(a) {
                return sb(a, b);
            };
        }
        function vb(a, b) {
            var c = Bf(a), d = Fc(a) && b === b && !pd(b), e = a + "";
            return a = Oc(a), function(f) {
                if (null == f) return !1;
                var g = e;
                if (f = Nc(f), !(!c && d || g in f)) {
                    if (f = 1 == a.length ? f : qb(f, Cb(a, 0, -1)), null == f) return !1;
                    g = Uc(a), f = Nc(f);
                }
                return f[g] === b ? b !== u || g in f : rb(b, f[g], u, !0);
            };
        }
        function wb(a, b, c, d, e) {
            if (!pd(a)) return a;
            var f = Cc(b) && (Bf(b) || vd(b)), g = f ? u : Mf(b);
            return Ra(g || b, function(h, i) {
                if (g && (i = h, h = b[i]), n(h)) {
                    d || (d = []), e || (e = []);
                    a: {
                        for (var j = i, k = d, l = e, m = k.length, o = b[j]; m--; ) if (k[m] == o) {
                            a[j] = l[m];
                            break a;
                        }
                        var m = a[j], p = c ? c(m, o, j, a, b) : u, q = p === u;
                        q && (p = o, Cc(o) && (Bf(o) || vd(o)) ? p = Bf(m) ? m : Cc(m) ? Qa(m) : [] : sd(o) || ld(o) ? p = ld(m) ? yd(m) : sd(m) ? m : {} : q = !1), 
                        k.push(o), l.push(p), q ? a[j] = wb(p, o, c, k, l) : (p === p ? p !== m : m === m) && (a[j] = p);
                    }
                } else j = a[i], k = c ? c(j, h, i, a, b) : u, (l = k === u) && (k = h), k === u && (!f || i in a) || !l && (k === k ? k === j : j !== j) || (a[i] = k);
            }), a;
        }
        function xb(a) {
            return function(b) {
                return null == b ? u : b[a];
            };
        }
        function yb(a) {
            var b = a + "";
            return a = Oc(a), function(c) {
                return qb(c, a, b);
            };
        }
        function zb(a, b) {
            for (var c = a ? b.length : 0; c--; ) {
                var d = b[c];
                if (d != e && Dc(d)) {
                    var e = d;
                    le.call(a, d, 1);
                }
            }
        }
        function Ab(a, b) {
            return a + qe(ye() * (b - a + 1));
        }
        function Bb(a, b, c, d, e) {
            return e(a, function(a, e, f) {
                c = d ? (d = !1, a) : b(c, a, e, f);
            }), c;
        }
        function Cb(a, b, c) {
            var d = -1, e = a.length;
            for (b = null == b ? 0 : +b || 0, 0 > b && (b = -b > e ? 0 : e + b), c = c === u || c > e ? e : +c || 0, 
            0 > c && (c += e), e = b > c ? 0 : c - b >>> 0, b >>>= 0, c = Nd(e); ++d < e; ) c[d] = a[d + b];
            return c;
        }
        function Db(a, b) {
            var c;
            return He(a, function(a, d, e) {
                return c = b(a, d, e), !c;
            }), !!c;
        }
        function Eb(a, b) {
            var c = a.length;
            for (a.sort(b); c--; ) a[c] = a[c].c;
            return a;
        }
        function Fb(b, c, d) {
            var e = tc(), f = -1;
            return c = Wa(c, function(a) {
                return e(a);
            }), b = tb(b, function(a) {
                return {
                    a: Wa(c, function(b) {
                        return b(a);
                    }),
                    b: ++f,
                    c: a
                };
            }), Eb(b, function(b, c) {
                var e;
                a: {
                    for (var f = -1, g = b.a, h = c.a, i = g.length, j = d.length; ++f < i; ) if (e = a(g[f], h[f])) {
                        if (f >= j) break a;
                        f = d[f], e *= "asc" === f || !0 === f ? 1 : -1;
                        break a;
                    }
                    e = b.b - c.b;
                }
                return e;
            });
        }
        function Gb(a, b) {
            var c = 0;
            return He(a, function(a, d, e) {
                c += +b(a, d, e) || 0;
            }), c;
        }
        function Hb(a, b) {
            var d = -1, e = vc(), f = a.length, g = e === c, h = g && f >= J, i = h && pe && je ? new Oa((void 0)) : null, j = [];
            i ? (e = Pa, g = !1) : (h = !1, i = b ? [] : j);
            a: for (;++d < f; ) {
                var k = a[d], l = b ? b(k, d, a) : k;
                if (g && k === k) {
                    for (var m = i.length; m--; ) if (i[m] === l) continue a;
                    b && i.push(l), j.push(k);
                } else 0 > e(i, l, 0) && ((b || h) && i.push(l), j.push(k));
            }
            return j;
        }
        function Ib(a, b) {
            for (var c = -1, d = b.length, e = Nd(d); ++c < d; ) e[c] = a[b[c]];
            return e;
        }
        function Jb(a, b, c, d) {
            for (var e = a.length, f = d ? e : -1; (d ? f-- : ++f < e) && b(a[f], f, a); ) ;
            return c ? Cb(a, d ? 0 : f, d ? f + 1 : e) : Cb(a, d ? f + 1 : 0, d ? e : f);
        }
        function Kb(a, b) {
            var c = a;
            c instanceof Ma && (c = c.value());
            for (var d = -1, e = b.length; ++d < e; ) var f = b[d], c = f.func.apply(f.thisArg, Xa([ c ], f.args));
            return c;
        }
        function Lb(a, b, c) {
            var d = 0, e = a ? a.length : d;
            if ("number" == typeof b && b === b && e <= Ce) {
                for (;d < e; ) {
                    var f = d + e >>> 1, g = a[f];
                    (c ? g <= b : g < b) && null !== g ? d = f + 1 : e = f;
                }
                return e;
            }
            return Mb(a, b, Id, c);
        }
        function Mb(a, b, c, d) {
            b = c(b);
            for (var e = 0, f = a ? a.length : 0, g = b !== b, h = null === b, i = b === u; e < f; ) {
                var j = qe((e + f) / 2), k = c(a[j]), l = k !== u, m = k === k;
                (g ? m || d : h ? m && l && (d || null != k) : i ? m && (d || l) : null == k ? 0 : d ? k <= b : k < b) ? e = j + 1 : f = j;
            }
            return ve(f, Be);
        }
        function Nb(a, b, c) {
            if ("function" != typeof a) return Id;
            if (b === u) return a;
            switch (c) {
              case 1:
                return function(c) {
                    return a.call(b, c);
                };

              case 3:
                return function(c, d, e) {
                    return a.call(b, c, d, e);
                };

              case 4:
                return function(c, d, e, f) {
                    return a.call(b, c, d, e, f);
                };

              case 5:
                return function(c, d, e, f, g) {
                    return a.call(b, c, d, e, f, g);
                };
            }
            return function() {
                return a.apply(b, arguments);
            };
        }
        function Ob(a) {
            var b = new ee(a.byteLength);
            return new me(b).set(new me(a)), b;
        }
        function Pb(a, b, c) {
            for (var d = c.length, e = -1, f = ue(a.length - d, 0), g = -1, h = b.length, i = Nd(h + f); ++g < h; ) i[g] = b[g];
            for (;++e < d; ) i[c[e]] = a[e];
            for (;f--; ) i[g++] = a[e++];
            return i;
        }
        function Qb(a, b, c) {
            for (var d = -1, e = c.length, f = -1, g = ue(a.length - e, 0), h = -1, i = b.length, j = Nd(g + i); ++f < g; ) j[f] = a[f];
            for (g = f; ++h < i; ) j[g + h] = b[h];
            for (;++d < e; ) j[g + c[d]] = a[f++];
            return j;
        }
        function Rb(a, b) {
            return function(c, d, e) {
                var f = b ? b() : {};
                if (d = tc(d, e, 3), Bf(c)) {
                    e = -1;
                    for (var g = c.length; ++e < g; ) {
                        var h = c[e];
                        a(f, h, d(h, e, c), c);
                    }
                } else He(c, function(b, c, e) {
                    a(f, b, d(b, c, e), e);
                });
                return f;
            };
        }
        function Sb(a) {
            return jd(function(b, c) {
                var d = -1, e = null == b ? 0 : c.length, f = 2 < e ? c[e - 2] : u, g = 2 < e ? c[2] : u, h = 1 < e ? c[e - 1] : u;
                for ("function" == typeof f ? (f = Nb(f, h, 5), e -= 2) : (f = "function" == typeof h ? h : u, 
                e -= f ? 1 : 0), g && Ec(c[0], c[1], g) && (f = 3 > e ? u : f, e = 1); ++d < e; ) (g = c[d]) && a(b, g, f);
                return b;
            });
        }
        function Tb(a, b) {
            return function(c, d) {
                var e = c ? Ne(c) : 0;
                if (!Hc(e)) return a(c, d);
                for (var f = b ? e : -1, g = Nc(c); (b ? f-- : ++f < e) && !1 !== d(g[f], f, g); ) ;
                return c;
            };
        }
        function Ub(a) {
            return function(b, c, d) {
                var e = Nc(b);
                d = d(b);
                for (var f = d.length, g = a ? f : -1; a ? g-- : ++g < f; ) {
                    var h = d[g];
                    if (!1 === c(e[h], h, e)) break;
                }
                return b;
            };
        }
        function Vb(a, b) {
            function c() {
                return (this && this !== Ua && this instanceof c ? d : a).apply(b, arguments);
            }
            var d = Xb(a);
            return c;
        }
        function Wb(a) {
            return function(b) {
                var c = -1;
                b = Gd(Dd(b));
                for (var d = b.length, e = ""; ++c < d; ) e = a(e, b[c], c);
                return e;
            };
        }
        function Xb(a) {
            return function() {
                var b = arguments;
                switch (b.length) {
                  case 0:
                    return new a();

                  case 1:
                    return new a(b[0]);

                  case 2:
                    return new a(b[0], b[1]);

                  case 3:
                    return new a(b[0], b[1], b[2]);

                  case 4:
                    return new a(b[0], b[1], b[2], b[3]);

                  case 5:
                    return new a(b[0], b[1], b[2], b[3], b[4]);

                  case 6:
                    return new a(b[0], b[1], b[2], b[3], b[4], b[5]);

                  case 7:
                    return new a(b[0], b[1], b[2], b[3], b[4], b[5], b[6]);
                }
                var c = Ge(a.prototype), b = a.apply(c, b);
                return pd(b) ? b : c;
            };
        }
        function Yb(a) {
            function b(c, d, e) {
                return e && Ec(c, d, e) && (d = u), c = pc(c, a, u, u, u, u, u, d), c.placeholder = b.placeholder, 
                c;
            }
            return b;
        }
        function Zb(a, b) {
            return jd(function(c) {
                var d = c[0];
                return null == d ? d : (c.push(b), a.apply(u, c));
            });
        }
        function $b(a, b) {
            return function(c, d, e) {
                if (e && Ec(c, d, e) && (d = u), d = tc(d, e, 3), 1 == d.length) {
                    e = c = Bf(c) ? c : Mc(c);
                    for (var f = d, g = -1, h = e.length, i = b, j = i; ++g < h; ) {
                        var k = e[g], l = +f(k);
                        a(l, i) && (i = l, j = k);
                    }
                    if (e = j, !c.length || e !== b) return e;
                }
                return ib(c, d, a, b);
            };
        }
        function _b(a, c) {
            return function(d, e, f) {
                return e = tc(e, f, 3), Bf(d) ? (e = b(d, e, c), -1 < e ? d[e] : u) : kb(d, e, a);
            };
        }
        function ac(a) {
            return function(c, d, e) {
                return c && c.length ? (d = tc(d, e, 3), b(c, d, a)) : -1;
            };
        }
        function bc(a) {
            return function(b, c, d) {
                return c = tc(c, d, 3), kb(b, c, a, !0);
            };
        }
        function cc(a) {
            return function() {
                for (var b, c = arguments.length, d = a ? c : -1, e = 0, f = Nd(c); a ? d-- : ++d < c; ) {
                    var g = f[e++] = arguments[d];
                    if ("function" != typeof g) throw new Wd(M);
                    !b && La.prototype.thru && "wrapper" == uc(g) && (b = new La([], (!0)));
                }
                for (d = b ? -1 : c; ++d < c; ) {
                    var g = f[d], e = uc(g), h = "wrapper" == e ? Me(g) : u;
                    b = h && Gc(h[0]) && h[1] == (D | z | B | E) && !h[4].length && 1 == h[9] ? b[uc(h[0])].apply(b, h[3]) : 1 == g.length && Gc(g) ? b[e]() : b.thru(g);
                }
                return function() {
                    var a = arguments, d = a[0];
                    if (b && 1 == a.length && Bf(d) && d.length >= J) return b.plant(d).value();
                    for (var e = 0, a = c ? f[e].apply(this, a) : d; ++e < c; ) a = f[e].call(this, a);
                    return a;
                };
            };
        }
        function dc(a, b) {
            return function(c, d, e) {
                return "function" == typeof d && e === u && Bf(c) ? a(c, d) : b(c, Nb(d, e, 3));
            };
        }
        function ec(a) {
            return function(b, c, d) {
                return ("function" != typeof c || d !== u) && (c = Nb(c, d, 3)), a(b, c, Ad);
            };
        }
        function fc(a) {
            return function(b, c, d) {
                return ("function" != typeof c || d !== u) && (c = Nb(c, d, 3)), a(b, c);
            };
        }
        function gc(a) {
            return function(b, c, d) {
                var e = {};
                return c = tc(c, d, 3), nb(b, function(b, d, f) {
                    f = c(b, d, f), d = a ? f : d, b = a ? b : f, e[d] = b;
                }), e;
            };
        }
        function hc(a) {
            return function(b, c, d) {
                return b = e(b), (a ? b : "") + lc(b, c, d) + (a ? "" : b);
            };
        }
        function ic(a) {
            var b = jd(function(c, d) {
                var e = p(d, b.placeholder);
                return pc(c, a, u, d, e);
            });
            return b;
        }
        function jc(a, b) {
            return function(c, d, e, f) {
                var g = 3 > arguments.length;
                return "function" == typeof d && f === u && Bf(c) ? a(c, d, e, g) : Bb(c, tc(d, f, 4), e, g, b);
            };
        }
        function kc(a, b, c, d, e, f, g, h, i, j) {
            function k() {
                for (var t = arguments.length, v = t, y = Nd(t); v--; ) y[v] = arguments[v];
                if (d && (y = Pb(y, d, e)), f && (y = Qb(y, f, g)), o || r) {
                    var v = k.placeholder, z = p(y, v), t = t - z.length;
                    if (t < j) {
                        var A = h ? Qa(h) : u, t = ue(j - t, 0), D = o ? z : u, z = o ? u : z, E = o ? y : u, y = o ? u : y;
                        return b |= o ? B : C, b &= ~(o ? C : B), q || (b &= ~(w | x)), y = [ a, b, c, E, D, y, z, A, i, t ], 
                        A = kc.apply(u, y), Gc(a) && Oe(A, y), A.placeholder = v, A;
                    }
                }
                if (v = m ? c : this, A = n ? v[a] : a, h) for (t = y.length, D = ve(h.length, t), 
                z = Qa(y); D--; ) E = h[D], y[D] = Dc(E, t) ? z[E] : u;
                return l && i < y.length && (y.length = i), this && this !== Ua && this instanceof k && (A = s || Xb(a)), 
                A.apply(v, y);
            }
            var l = b & D, m = b & w, n = b & x, o = b & z, q = b & y, r = b & A, s = n ? u : Xb(a);
            return k;
        }
        function lc(a, b, c) {
            return a = a.length, b = +b, a < b && se(b) ? (b -= a, c = null == c ? " " : c + "", 
            Ed(c, oe(b / c.length)).slice(0, b)) : "";
        }
        function mc(a, b, c, d) {
            function e() {
                for (var b = -1, h = arguments.length, i = -1, j = d.length, k = Nd(j + h); ++i < j; ) k[i] = d[i];
                for (;h--; ) k[i++] = arguments[++b];
                return (this && this !== Ua && this instanceof e ? g : a).apply(f ? c : this, k);
            }
            var f = b & w, g = Xb(a);
            return e;
        }
        function nc(a) {
            var b = Rd[a];
            return function(a, c) {
                return (c = c === u ? 0 : +c || 0) ? (c = he(10, c), b(a * c) / c) : b(a);
            };
        }
        function oc(a) {
            return function(b, c, d, e) {
                var f = tc(d);
                return null == d && f === db ? Lb(b, c, a) : Mb(b, c, f(d, e, 1), a);
            };
        }
        function pc(a, b, c, d, e, f, g, h) {
            var i = b & x;
            if (!i && "function" != typeof a) throw new Wd(M);
            var j = d ? d.length : 0;
            if (j || (b &= ~(B | C), d = e = u), j -= e ? e.length : 0, b & C) {
                var k = d, l = e;
                d = e = u;
            }
            var m = i ? u : Me(a);
            return c = [ a, b, c, d, e, k, l, f, g, h ], m && (d = c[1], b = m[1], h = d | b, 
            e = b == D && d == z || b == D && d == E && c[7].length <= m[8] || b == (D | E) && d == z, 
            (h < D || e) && (b & w && (c[2] = m[2], h |= d & w ? 0 : y), (d = m[3]) && (e = c[3], 
            c[3] = e ? Pb(e, d, m[4]) : Qa(d), c[4] = e ? p(c[3], N) : Qa(m[4])), (d = m[5]) && (e = c[5], 
            c[5] = e ? Qb(e, d, m[6]) : Qa(d), c[6] = e ? p(c[5], N) : Qa(m[6])), (d = m[7]) && (c[7] = Qa(d)), 
            b & D && (c[8] = null == c[8] ? m[8] : ve(c[8], m[8])), null == c[9] && (c[9] = m[9]), 
            c[0] = m[0], c[1] = h), b = c[1], h = c[9]), c[9] = null == h ? i ? 0 : a.length : ue(h - j, 0) || 0, 
            (m ? Le : Oe)(b == w ? Vb(c[0], c[2]) : b != B && b != (w | B) || c[4].length ? kc.apply(u, c) : mc.apply(u, c), c);
        }
        function qc(a, b, c, d, e, f, g) {
            var h = -1, i = a.length, j = b.length;
            if (i != j && (!e || j <= i)) return !1;
            for (;++h < i; ) {
                var k = a[h], j = b[h], l = d ? d(e ? j : k, e ? k : j, h) : u;
                if (l !== u) {
                    if (l) continue;
                    return !1;
                }
                if (e) {
                    if (!Za(b, function(a) {
                        return k === a || c(k, a, d, e, f, g);
                    })) return !1;
                } else if (k !== j && !c(k, j, d, e, f, g)) return !1;
            }
            return !0;
        }
        function rc(a, b, c) {
            switch (c) {
              case Q:
              case R:
                return +a == +b;

              case S:
                return a.name == b.name && a.message == b.message;

              case U:
                return a != +a ? b != +b : a == +b;

              case W:
              case X:
                return a == b + "";
            }
            return !1;
        }
        function sc(a, b, c, d, e, f, g) {
            var h = Mf(a), i = h.length, j = Mf(b).length;
            if (i != j && !e) return !1;
            for (j = i; j--; ) {
                var k = h[j];
                if (!(e ? k in b : _d.call(b, k))) return !1;
            }
            for (var l = e; ++j < i; ) {
                var k = h[j], m = a[k], n = b[k], o = d ? d(e ? n : m, e ? m : n, k) : u;
                if (o === u ? !c(m, n, d, e, f, g) : !o) return !1;
                l || (l = "constructor" == k);
            }
            return !(!l && (c = a.constructor, d = b.constructor, c != d && "constructor" in a && "constructor" in b && !("function" == typeof c && c instanceof c && "function" == typeof d && d instanceof d)));
        }
        function tc(a, b, c) {
            var d = Ja.callback || Hd, d = d === Hd ? db : d;
            return c ? d(a, b, c) : d;
        }
        function uc(a) {
            for (var b = a.name + "", c = Fe[b], d = c ? c.length : 0; d--; ) {
                var e = c[d], f = e.func;
                if (null == f || f == a) return e.name;
            }
            return b;
        }
        function vc(a, b, d) {
            var e = Ja.indexOf || Tc, e = e === Tc ? c : e;
            return a ? e(a, b, d) : e;
        }
        function wc(a) {
            a = Bd(a);
            for (var b = a.length; b--; ) {
                var c = a[b][1];
                a[b][2] = c === c && !pd(c);
            }
            return a;
        }
        function xc(a, b) {
            var c = null == a ? u : a[b];
            return qd(c) ? c : u;
        }
        function yc(a) {
            var b = a.length, c = new a.constructor(b);
            return b && "string" == typeof a[0] && _d.call(a, "index") && (c.index = a.index, 
            c.input = a.input), c;
        }
        function zc(a) {
            return a = a.constructor, "function" == typeof a && a instanceof a || (a = Td), 
            new a();
        }
        function Ac(a, b, c) {
            var d = a.constructor;
            switch (b) {
              case Y:
                return Ob(a);

              case Q:
              case R:
                return new d((+a));

              case Z:
              case $:
              case _:
              case aa:
              case ba:
              case ca:
              case da:
              case ea:
              case fa:
                return b = a.buffer, new d(c ? Ob(b) : b, a.byteOffset, a.length);

              case U:
              case X:
                return new d(a);

              case W:
                var e = new d(a.source, ya.exec(a));
                e.lastIndex = a.lastIndex;
            }
            return e;
        }
        function Bc(a, b, c) {
            return null == a || Fc(b, a) || (b = Oc(b), a = 1 == b.length ? a : qb(a, Cb(b, 0, -1)), 
            b = Uc(b)), b = null == a ? a : a[b], null == b ? u : b.apply(a, c);
        }
        function Cc(a) {
            return null != a && Hc(Ne(a));
        }
        function Dc(a, b) {
            return a = "number" == typeof a || Ba.test(a) ? +a : -1, b = null == b ? De : b, 
            -1 < a && 0 == a % 1 && a < b;
        }
        function Ec(a, b, c) {
            if (!pd(c)) return !1;
            var d = typeof b;
            return !!("number" == d ? Cc(c) && Dc(b, c.length) : "string" == d && b in c) && (b = c[b], 
            a === a ? a === b : b !== b);
        }
        function Fc(a, b) {
            var c = typeof a;
            return !!("string" == c && ra.test(a) || "number" == c) || !Bf(a) && (!qa.test(a) || null != b && a in Nc(b));
        }
        function Gc(a) {
            var b = uc(a), c = Ja[b];
            return "function" == typeof c && b in Ma.prototype && (a === c || (b = Me(c), !!b && a === b[0]));
        }
        function Hc(a) {
            return "number" == typeof a && -1 < a && 0 == a % 1 && a <= De;
        }
        function Ic(a, b) {
            return a === u ? b : Cf(a, b, Ic);
        }
        function Jc(a, b) {
            a = Nc(a);
            for (var c = -1, d = b.length, e = {}; ++c < d; ) {
                var f = b[c];
                f in a && (e[f] = a[f]);
            }
            return e;
        }
        function Kc(a, b) {
            var c = {};
            return mb(a, function(a, d, e) {
                b(a, d, e) && (c[d] = a);
            }), c;
        }
        function Lc(a) {
            for (var b = Ad(a), c = b.length, d = c && a.length, e = !!d && Hc(d) && (Bf(a) || ld(a)), f = -1, g = []; ++f < c; ) {
                var h = b[f];
                (e && Dc(h, d) || _d.call(a, h)) && g.push(h);
            }
            return g;
        }
        function Mc(a) {
            return null == a ? [] : Cc(a) ? pd(a) ? a : Td(a) : Cd(a);
        }
        function Nc(a) {
            return pd(a) ? a : Td(a);
        }
        function Oc(a) {
            if (Bf(a)) return a;
            var b = [];
            return e(a).replace(sa, function(a, c, d, e) {
                b.push(d ? e.replace(wa, "$1") : c || a);
            }), b;
        }
        function Pc(a) {
            return a instanceof Ma ? a.clone() : new La(a.__wrapped__, a.__chain__, Qa(a.__actions__));
        }
        function Qc(a, b, c) {
            return a && a.length ? ((c ? Ec(a, b, c) : null == b) && (b = 1), Cb(a, 0 > b ? 0 : b)) : [];
        }
        function Rc(a, b, c) {
            var d = a ? a.length : 0;
            return d ? ((c ? Ec(a, b, c) : null == b) && (b = 1), b = d - (+b || 0), Cb(a, 0, 0 > b ? 0 : b)) : [];
        }
        function Sc(a) {
            return a ? a[0] : u;
        }
        function Tc(a, b, d) {
            var e = a ? a.length : 0;
            if (!e) return -1;
            if ("number" == typeof d) d = 0 > d ? ue(e + d, 0) : d; else if (d) return d = Lb(a, b), 
            d < e && (b === b ? b === a[d] : a[d] !== a[d]) ? d : -1;
            return c(a, b, d || 0);
        }
        function Uc(a) {
            var b = a ? a.length : 0;
            return b ? a[b - 1] : u;
        }
        function Vc(a) {
            return Qc(a, 1);
        }
        function Wc(a, b, d, e) {
            if (!a || !a.length) return [];
            null != b && "boolean" != typeof b && (e = d, d = Ec(a, b, e) ? u : b, b = !1);
            var f = tc();
            if ((null != d || f !== db) && (d = f(d, e, 3)), b && vc() === c) {
                b = d;
                var g;
                d = -1, e = a.length;
                for (var f = -1, h = []; ++d < e; ) {
                    var i = a[d], j = b ? b(i, d, a) : i;
                    d && g === j || (g = j, h[++f] = i);
                }
                a = h;
            } else a = Hb(a, d);
            return a;
        }
        function Xc(a) {
            if (!a || !a.length) return [];
            var b = -1, c = 0;
            a = Ta(a, function(a) {
                return Cc(a) ? (c = ue(a.length, c), !0) : void 0;
            });
            for (var d = Nd(c); ++b < c; ) d[b] = Wa(a, xb(b));
            return d;
        }
        function Yc(a, b, c) {
            return a && a.length ? (a = Xc(a), null == b ? a : (b = Nb(b, c, 4), Wa(a, function(a) {
                return Ya(a, b, u, !0);
            }))) : [];
        }
        function Zc(a, b) {
            var c = -1, d = a ? a.length : 0, e = {};
            for (!d || b || Bf(a[0]) || (b = []); ++c < d; ) {
                var f = a[c];
                b ? e[f] = b[c] : f && (e[f[0]] = f[1]);
            }
            return e;
        }
        function $c(a) {
            return a = Ja(a), a.__chain__ = !0, a;
        }
        function _c(a, b, c) {
            return b.call(c, a);
        }
        function ad(a, b, c) {
            var d = Bf(a) ? Sa : hb;
            return c && Ec(a, b, c) && (b = u), ("function" != typeof b || c !== u) && (b = tc(b, c, 3)), 
            d(a, b);
        }
        function bd(a, b, c) {
            var d = Bf(a) ? Ta : jb;
            return b = tc(b, c, 3), d(a, b);
        }
        function cd(a, b, c, d) {
            var e = a ? Ne(a) : 0;
            return Hc(e) || (a = Cd(a), e = a.length), c = "number" != typeof c || d && Ec(b, c, d) ? 0 : 0 > c ? ue(e + c, 0) : c || 0, 
            "string" == typeof a || !Bf(a) && ud(a) ? c <= e && -1 < a.indexOf(b, c) : !!e && -1 < vc(a, b, c);
        }
        function dd(a, b, c) {
            var d = Bf(a) ? Wa : tb;
            return b = tc(b, c, 3), d(a, b);
        }
        function ed(a, b, c) {
            if (c ? Ec(a, b, c) : null == b) {
                a = Mc(a);
                var d = a.length;
                return 0 < d ? a[Ab(0, d - 1)] : u;
            }
            c = -1, a = xd(a);
            var d = a.length, e = d - 1;
            for (b = ve(0 > b ? 0 : +b || 0, d); ++c < b; ) {
                var d = Ab(c, e), f = a[d];
                a[d] = a[c], a[c] = f;
            }
            return a.length = b, a;
        }
        function fd(a, b, c) {
            var d = Bf(a) ? Za : Db;
            return c && Ec(a, b, c) && (b = u), ("function" != typeof b || c !== u) && (b = tc(b, c, 3)), 
            d(a, b);
        }
        function gd(a, b) {
            var c;
            if ("function" != typeof b) {
                if ("function" != typeof a) throw new Wd(M);
                var d = a;
                a = b, b = d;
            }
            return function() {
                return 0 < --a && (c = b.apply(this, arguments)), 1 >= a && (b = u), c;
            };
        }
        function hd(a, b, c) {
            function d(b, c) {
                c && fe(c), i = m = n = u, b && (o = nf(), j = a.apply(l, h), m || i || (h = l = u));
            }
            function e() {
                var a = b - (nf() - k);
                0 >= a || a > b ? d(n, i) : m = ke(e, a);
            }
            function f() {
                d(q, m);
            }
            function g() {
                if (h = arguments, k = nf(), l = this, n = q && (m || !r), !1 === p) var c = r && !m; else {
                    i || r || (o = k);
                    var d = p - (k - o), g = 0 >= d || d > p;
                    g ? (i && (i = fe(i)), o = k, j = a.apply(l, h)) : i || (i = ke(f, d));
                }
                return g && m ? m = fe(m) : m || b === p || (m = ke(e, b)), c && (g = !0, j = a.apply(l, h)), 
                !g || m || i || (h = l = u), j;
            }
            var h, i, j, k, l, m, n, o = 0, p = !1, q = !0;
            if ("function" != typeof a) throw new Wd(M);
            if (b = 0 > b ? 0 : +b || 0, !0 === c) var r = !0, q = !1; else pd(c) && (r = !!c.leading, 
            p = "maxWait" in c && ue(+c.maxWait || 0, b), q = "trailing" in c ? !!c.trailing : q);
            return g.cancel = function() {
                m && fe(m), i && fe(i), o = 0, i = m = n = u;
            }, g;
        }
        function id(a, b) {
            function c() {
                var d = arguments, e = b ? b.apply(this, d) : d[0], f = c.cache;
                return f.has(e) ? f.get(e) : (d = a.apply(this, d), c.cache = f.set(e, d), d);
            }
            if ("function" != typeof a || b && "function" != typeof b) throw new Wd(M);
            return c.cache = new id.Cache(), c;
        }
        function jd(a, b) {
            if ("function" != typeof a) throw new Wd(M);
            return b = ue(b === u ? a.length - 1 : +b || 0, 0), function() {
                for (var c = arguments, d = -1, e = ue(c.length - b, 0), f = Nd(e); ++d < e; ) f[d] = c[b + d];
                switch (b) {
                  case 0:
                    return a.call(this, f);

                  case 1:
                    return a.call(this, c[0], f);

                  case 2:
                    return a.call(this, c[0], c[1], f);
                }
                for (e = Nd(b + 1), d = -1; ++d < b; ) e[d] = c[d];
                return e[b] = f, a.apply(this, e);
            };
        }
        function kd(a, b) {
            return a > b;
        }
        function ld(a) {
            return n(a) && Cc(a) && _d.call(a, "callee") && !ie.call(a, "callee");
        }
        function md(a, b, c, d) {
            return d = (c = "function" == typeof c ? Nb(c, d, 3) : u) ? c(a, b) : u, d === u ? rb(a, b, c) : !!d;
        }
        function nd(a) {
            return n(a) && "string" == typeof a.message && be.call(a) == S;
        }
        function od(a) {
            return pd(a) && be.call(a) == T;
        }
        function pd(a) {
            var b = typeof a;
            return !!a && ("object" == b || "function" == b);
        }
        function qd(a) {
            return null != a && (od(a) ? de.test($d.call(a)) : n(a) && Aa.test(a));
        }
        function rd(a) {
            return "number" == typeof a || n(a) && be.call(a) == U;
        }
        function sd(a) {
            var b;
            if (!n(a) || be.call(a) != V || ld(a) || !(_d.call(a, "constructor") || (b = a.constructor, 
            "function" != typeof b || b instanceof b))) return !1;
            var c;
            return mb(a, function(a, b) {
                c = b;
            }), c === u || _d.call(a, c);
        }
        function td(a) {
            return pd(a) && be.call(a) == W;
        }
        function ud(a) {
            return "string" == typeof a || n(a) && be.call(a) == X;
        }
        function vd(a) {
            return n(a) && Hc(a.length) && !!Ha[be.call(a)];
        }
        function wd(a, b) {
            return a < b;
        }
        function xd(a) {
            var b = a ? Ne(a) : 0;
            return Hc(b) ? b ? Qa(a) : [] : Cd(a);
        }
        function yd(a) {
            return cb(a, Ad(a));
        }
        function zd(a) {
            return pb(a, Ad(a));
        }
        function Ad(a) {
            if (null == a) return [];
            pd(a) || (a = Td(a));
            for (var b = a.length, b = b && Hc(b) && (Bf(a) || ld(a)) && b || 0, c = a.constructor, d = -1, c = "function" == typeof c && c.prototype === a, e = Nd(b), f = 0 < b; ++d < b; ) e[d] = d + "";
            for (var g in a) f && Dc(g, b) || "constructor" == g && (c || !_d.call(a, g)) || e.push(g);
            return e;
        }
        function Bd(a) {
            a = Nc(a);
            for (var b = -1, c = Mf(a), d = c.length, e = Nd(d); ++b < d; ) {
                var f = c[b];
                e[b] = [ f, a[f] ];
            }
            return e;
        }
        function Cd(a) {
            return Ib(a, Mf(a));
        }
        function Dd(a) {
            return (a = e(a)) && a.replace(Ca, i).replace(va, "");
        }
        function Ed(a, b) {
            var c = "";
            if (a = e(a), b = +b, 1 > b || !a || !se(b)) return c;
            do b % 2 && (c += a), b = qe(b / 2), a += a; while (b);
            return c;
        }
        function Fd(a, b, c) {
            var d = a;
            return (a = e(a)) ? (c ? Ec(d, b, c) : null == b) ? a.slice(q(a), r(a) + 1) : (b += "", 
            a.slice(f(a, b), g(a, b) + 1)) : a;
        }
        function Gd(a, b, c) {
            return c && Ec(a, b, c) && (b = u), a = e(a), a.match(b || Fa) || [];
        }
        function Hd(a, b, c) {
            return c && Ec(a, b, c) && (b = u), n(a) ? Jd(a) : db(a, b);
        }
        function Id(a) {
            return a;
        }
        function Jd(a) {
            return ub(eb(a, !0));
        }
        function Kd(a, b, c) {
            if (null == c) {
                var d = pd(b), e = d ? Mf(b) : u;
                ((e = e && e.length ? pb(b, e) : u) ? e.length : d) || (e = !1, c = b, b = a, a = this);
            }
            e || (e = pb(b, Mf(b)));
            var f = !0, d = -1, g = od(a), h = e.length;
            !1 === c ? f = !1 : pd(c) && "chain" in c && (f = c.chain);
            for (;++d < h; ) {
                c = e[d];
                var i = b[c];
                a[c] = i, g && (a.prototype[c] = function(b) {
                    return function() {
                        var c = this.__chain__;
                        if (f || c) {
                            var d = a(this.__wrapped__);
                            return (d.__actions__ = Qa(this.__actions__)).push({
                                func: b,
                                args: arguments,
                                thisArg: a
                            }), d.__chain__ = c, d;
                        }
                        return b.apply(a, Xa([ this.value() ], arguments));
                    };
                }(i));
            }
            return a;
        }
        function Ld() {}
        function Md(a) {
            return Fc(a) ? xb(a) : yb(a);
        }
        o = o ? Va.defaults(Ua.Object(), o, Va.pick(Ua, Ga)) : Ua;
        var Nd = o.Array, Od = o.Date, Pd = o.Error, Qd = o.Function, Rd = o.Math, Sd = o.Number, Td = o.Object, Ud = o.RegExp, Vd = o.String, Wd = o.TypeError, Xd = Nd.prototype, Yd = Td.prototype, Zd = Vd.prototype, $d = Qd.prototype.toString, _d = Yd.hasOwnProperty, ae = 0, be = Yd.toString, ce = Ua._, de = Ud("^" + $d.call(_d).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), ee = o.ArrayBuffer, fe = o.clearTimeout, ge = o.parseFloat, he = Rd.pow, ie = Yd.propertyIsEnumerable, je = xc(o, "Set"), ke = o.setTimeout, le = Xd.splice, me = o.Uint8Array, ne = xc(o, "WeakMap"), oe = Rd.ceil, pe = xc(Td, "create"), qe = Rd.floor, re = xc(Nd, "isArray"), se = o.isFinite, te = xc(Td, "keys"), ue = Rd.max, ve = Rd.min, we = xc(Od, "now"), xe = o.parseInt, ye = Rd.random, ze = Sd.NEGATIVE_INFINITY, Ae = Sd.POSITIVE_INFINITY, Be = 4294967294, Ce = 2147483647, De = 9007199254740991, Ee = ne && new ne(), Fe = {};
        Ja.support = {}, Ja.templateSettings = {
            escape: na,
            evaluate: oa,
            interpolate: pa,
            variable: "",
            imports: {
                _: Ja
            }
        };
        var Ge = function() {
            function a() {}
            return function(b) {
                if (pd(b)) {
                    a.prototype = b;
                    var c = new a();
                    a.prototype = u;
                }
                return c || {};
            };
        }(), He = Tb(nb), Ie = Tb(ob, !0), Je = Ub(), Ke = Ub(!0), Le = Ee ? function(a, b) {
            return Ee.set(a, b), a;
        } : Id, Me = Ee ? function(a) {
            return Ee.get(a);
        } : Ld, Ne = xb("length"), Oe = function() {
            var a = 0, b = 0;
            return function(c, d) {
                var e = nf(), f = I - (e - b);
                if (b = e, 0 < f) {
                    if (++a >= H) return c;
                } else a = 0;
                return Le(c, d);
            };
        }(), Pe = jd(function(a, b) {
            return n(a) && Cc(a) ? gb(a, lb(b, !1, !0)) : [];
        }), Qe = ac(), Re = ac(!0), Se = jd(function(a) {
            for (var b = a.length, d = b, e = Nd(k), f = vc(), g = f === c, h = []; d--; ) {
                var i = a[d] = Cc(i = a[d]) ? i : [];
                e[d] = g && 120 <= i.length && pe && je ? new Oa(d && i) : null;
            }
            var g = a[0], j = -1, k = g ? g.length : 0, l = e[0];
            a: for (;++j < k; ) if (i = g[j], 0 > (l ? Pa(l, i) : f(h, i, 0))) {
                for (d = b; --d; ) {
                    var m = e[d];
                    if (0 > (m ? Pa(m, i) : f(a[d], i, 0))) continue a;
                }
                l && l.push(i), h.push(i);
            }
            return h;
        }), Te = jd(function(b, c) {
            c = lb(c);
            var d = bb(b, c);
            return zb(b, c.sort(a)), d;
        }), Ue = oc(), Ve = oc(!0), We = jd(function(a) {
            return Hb(lb(a, !1, !0));
        }), Xe = jd(function(a, b) {
            return Cc(a) ? gb(a, b) : [];
        }), Ye = jd(Xc), Ze = jd(function(a) {
            var b = a.length, c = 2 < b ? a[b - 2] : u, d = 1 < b ? a[b - 1] : u;
            return 2 < b && "function" == typeof c ? b -= 2 : (c = 1 < b && "function" == typeof d ? (--b, 
            d) : u, d = u), a.length = b, Yc(a, c, d);
        }), $e = jd(function(a) {
            return a = lb(a), this.thru(function(b) {
                b = Bf(b) ? b : [ Nc(b) ];
                for (var c = a, d = -1, e = b.length, f = -1, g = c.length, h = Nd(e + g); ++d < e; ) h[d] = b[d];
                for (;++f < g; ) h[d++] = c[f];
                return h;
            });
        }), _e = jd(function(a, b) {
            return bb(a, lb(b));
        }), af = Rb(function(a, b, c) {
            _d.call(a, c) ? ++a[c] : a[c] = 1;
        }), bf = _b(He), cf = _b(Ie, !0), df = dc(Ra, He), ef = dc(function(a, b) {
            for (var c = a.length; c-- && !1 !== b(a[c], c, a); ) ;
            return a;
        }, Ie), ff = Rb(function(a, b, c) {
            _d.call(a, c) ? a[c].push(b) : a[c] = [ b ];
        }), gf = Rb(function(a, b, c) {
            a[c] = b;
        }), hf = jd(function(a, b, c) {
            var d = -1, e = "function" == typeof b, f = Fc(b), g = Cc(a) ? Nd(a.length) : [];
            return He(a, function(a) {
                var h = e ? b : f && null != a ? a[b] : u;
                g[++d] = h ? h.apply(a, c) : Bc(a, b, c);
            }), g;
        }), jf = Rb(function(a, b, c) {
            a[c ? 0 : 1].push(b);
        }, function() {
            return [ [], [] ];
        }), kf = jc(Ya, He), lf = jc(function(a, b, c, d) {
            var e = a.length;
            for (d && e && (c = a[--e]); e--; ) c = b(c, a[e], e, a);
            return c;
        }, Ie), mf = jd(function(a, b) {
            if (null == a) return [];
            var c = b[2];
            return c && Ec(b[0], b[1], c) && (b.length = 1), Fb(a, lb(b), []);
        }), nf = we || function() {
            return new Od().getTime();
        }, of = jd(function(a, b, c) {
            var d = w;
            if (c.length) var e = p(c, of.placeholder), d = d | B;
            return pc(a, d, b, c, e);
        }), pf = jd(function(a, b) {
            b = b.length ? lb(b) : zd(a);
            for (var c = -1, d = b.length; ++c < d; ) {
                var e = b[c];
                a[e] = pc(a[e], w, a);
            }
            return a;
        }), qf = jd(function(a, b, c) {
            var d = w | x;
            if (c.length) var e = p(c, qf.placeholder), d = d | B;
            return pc(b, d, a, c, e);
        }), rf = Yb(z), sf = Yb(A), tf = jd(function(a, b) {
            return fb(a, 1, b);
        }), uf = jd(function(a, b, c) {
            return fb(a, b, c);
        }), vf = cc(), wf = cc(!0), xf = jd(function(a, b) {
            if (b = lb(b), "function" != typeof a || !Sa(b, d)) throw new Wd(M);
            var c = b.length;
            return jd(function(d) {
                for (var e = ve(d.length, c); e--; ) d[e] = b[e](d[e]);
                return a.apply(this, d);
            });
        }), yf = ic(B), zf = ic(C), Af = jd(function(a, b) {
            return pc(a, E, u, u, u, lb(b));
        }), Bf = re || function(a) {
            return n(a) && Hc(a.length) && be.call(a) == P;
        }, Cf = Sb(wb), Df = Sb(function(a, b, c) {
            return c ? _a(a, b, c) : ab(a, b);
        }), Ef = Zb(Df, function(a, b) {
            return a === u ? b : a;
        }), Ff = Zb(Cf, Ic), Gf = bc(nb), Hf = bc(ob), If = ec(Je), Jf = ec(Ke), Kf = fc(nb), Lf = fc(ob), Mf = te ? function(a) {
            var b = null == a ? u : a.constructor;
            return "function" == typeof b && b.prototype === a || "function" != typeof a && Cc(a) ? Lc(a) : pd(a) ? te(a) : [];
        } : Lc, Nf = gc(!0), Of = gc(), Pf = jd(function(a, b) {
            if (null == a) return {};
            if ("function" != typeof b[0]) return b = Wa(lb(b), Vd), Jc(a, gb(Ad(a), b));
            var c = Nb(b[0], b[1], 3);
            return Kc(a, function(a, b, d) {
                return !c(a, b, d);
            });
        }), Qf = jd(function(a, b) {
            return null == a ? {} : "function" == typeof b[0] ? Kc(a, Nb(b[0], b[1], 3)) : Jc(a, lb(b));
        }), Rf = Wb(function(a, b, c) {
            return b = b.toLowerCase(), a + (c ? b.charAt(0).toUpperCase() + b.slice(1) : b);
        }), Sf = Wb(function(a, b, c) {
            return a + (c ? "-" : "") + b.toLowerCase();
        }), Tf = hc(), Uf = hc(!0), Vf = Wb(function(a, b, c) {
            return a + (c ? "_" : "") + b.toLowerCase();
        }), Wf = Wb(function(a, b, c) {
            return a + (c ? " " : "") + (b.charAt(0).toUpperCase() + b.slice(1));
        }), Xf = jd(function(a, b) {
            try {
                return a.apply(u, b);
            } catch (c) {
                return nd(c) ? c : new Pd(c);
            }
        }), Yf = jd(function(a, b) {
            return function(c) {
                return Bc(c, a, b);
            };
        }), Zf = jd(function(a, b) {
            return function(c) {
                return Bc(a, c, b);
            };
        }), $f = nc("ceil"), _f = nc("floor"), ag = $b(kd, ze), bg = $b(wd, Ae), cg = nc("round");
        return Ja.prototype = Ka.prototype, La.prototype = Ge(Ka.prototype), La.prototype.constructor = La, 
        Ma.prototype = Ge(Ka.prototype), Ma.prototype.constructor = Ma, Na.prototype["delete"] = function(a) {
            return this.has(a) && delete this.__data__[a];
        }, Na.prototype.get = function(a) {
            return "__proto__" == a ? u : this.__data__[a];
        }, Na.prototype.has = function(a) {
            return "__proto__" != a && _d.call(this.__data__, a);
        }, Na.prototype.set = function(a, b) {
            return "__proto__" != a && (this.__data__[a] = b), this;
        }, Oa.prototype.push = function(a) {
            var b = this.data;
            "string" == typeof a || pd(a) ? b.set.add(a) : b.hash[a] = !0;
        }, id.Cache = Na, Ja.after = function(a, b) {
            if ("function" != typeof b) {
                if ("function" != typeof a) throw new Wd(M);
                var c = a;
                a = b, b = c;
            }
            return a = se(a = +a) ? a : 0, function() {
                return 1 > --a ? b.apply(this, arguments) : void 0;
            };
        }, Ja.ary = function(a, b, c) {
            return c && Ec(a, b, c) && (b = u), b = a && null == b ? a.length : ue(+b || 0, 0), 
            pc(a, D, u, u, u, u, b);
        }, Ja.assign = Df, Ja.at = _e, Ja.before = gd, Ja.bind = of, Ja.bindAll = pf, Ja.bindKey = qf, 
        Ja.callback = Hd, Ja.chain = $c, Ja.chunk = function(a, b, c) {
            b = (c ? Ec(a, b, c) : null == b) ? 1 : ue(qe(b) || 1, 1), c = 0;
            for (var d = a ? a.length : 0, e = -1, f = Nd(oe(d / b)); c < d; ) f[++e] = Cb(a, c, c += b);
            return f;
        }, Ja.compact = function(a) {
            for (var b = -1, c = a ? a.length : 0, d = -1, e = []; ++b < c; ) {
                var f = a[b];
                f && (e[++d] = f);
            }
            return e;
        }, Ja.constant = function(a) {
            return function() {
                return a;
            };
        }, Ja.countBy = af, Ja.create = function(a, b, c) {
            var d = Ge(a);
            return c && Ec(a, b, c) && (b = u), b ? ab(d, b) : d;
        }, Ja.curry = rf, Ja.curryRight = sf, Ja.debounce = hd, Ja.defaults = Ef, Ja.defaultsDeep = Ff, 
        Ja.defer = tf, Ja.delay = uf, Ja.difference = Pe, Ja.drop = Qc, Ja.dropRight = Rc, 
        Ja.dropRightWhile = function(a, b, c) {
            return a && a.length ? Jb(a, tc(b, c, 3), !0, !0) : [];
        }, Ja.dropWhile = function(a, b, c) {
            return a && a.length ? Jb(a, tc(b, c, 3), !0) : [];
        }, Ja.fill = function(a, b, c, d) {
            var e = a ? a.length : 0;
            if (!e) return [];
            for (c && "number" != typeof c && Ec(a, b, c) && (c = 0, d = e), e = a.length, c = null == c ? 0 : +c || 0, 
            0 > c && (c = -c > e ? 0 : e + c), d = d === u || d > e ? e : +d || 0, 0 > d && (d += e), 
            e = c > d ? 0 : d >>> 0, c >>>= 0; c < e; ) a[c++] = b;
            return a;
        }, Ja.filter = bd, Ja.flatten = function(a, b, c) {
            var d = a ? a.length : 0;
            return c && Ec(a, b, c) && (b = !1), d ? lb(a, b) : [];
        }, Ja.flattenDeep = function(a) {
            return a && a.length ? lb(a, !0) : [];
        }, Ja.flow = vf, Ja.flowRight = wf, Ja.forEach = df, Ja.forEachRight = ef, Ja.forIn = If, 
        Ja.forInRight = Jf, Ja.forOwn = Kf, Ja.forOwnRight = Lf, Ja.functions = zd, Ja.groupBy = ff, 
        Ja.indexBy = gf, Ja.initial = function(a) {
            return Rc(a, 1);
        }, Ja.intersection = Se, Ja.invert = function(a, b, c) {
            c && Ec(a, b, c) && (b = u), c = -1;
            for (var d = Mf(a), e = d.length, f = {}; ++c < e; ) {
                var g = d[c], h = a[g];
                b ? _d.call(f, h) ? f[h].push(g) : f[h] = [ g ] : f[h] = g;
            }
            return f;
        }, Ja.invoke = hf, Ja.keys = Mf, Ja.keysIn = Ad, Ja.map = dd, Ja.mapKeys = Nf, Ja.mapValues = Of, 
        Ja.matches = Jd, Ja.matchesProperty = function(a, b) {
            return vb(a, eb(b, !0));
        }, Ja.memoize = id, Ja.merge = Cf, Ja.method = Yf, Ja.methodOf = Zf, Ja.mixin = Kd, 
        Ja.modArgs = xf, Ja.negate = function(a) {
            if ("function" != typeof a) throw new Wd(M);
            return function() {
                return !a.apply(this, arguments);
            };
        }, Ja.omit = Pf, Ja.once = function(a) {
            return gd(2, a);
        }, Ja.pairs = Bd, Ja.partial = yf, Ja.partialRight = zf, Ja.partition = jf, Ja.pick = Qf, 
        Ja.pluck = function(a, b) {
            return dd(a, Md(b));
        }, Ja.property = Md, Ja.propertyOf = function(a) {
            return function(b) {
                return qb(a, Oc(b), b + "");
            };
        }, Ja.pull = function() {
            var a = arguments, b = a[0];
            if (!b || !b.length) return b;
            for (var c = 0, d = vc(), e = a.length; ++c < e; ) for (var f = 0, g = a[c]; -1 < (f = d(b, g, f)); ) le.call(b, f, 1);
            return b;
        }, Ja.pullAt = Te, Ja.range = function(a, b, c) {
            c && Ec(a, b, c) && (b = c = u), a = +a || 0, c = null == c ? 1 : +c || 0, null == b ? (b = a, 
            a = 0) : b = +b || 0;
            var d = -1;
            b = ue(oe((b - a) / (c || 1)), 0);
            for (var e = Nd(b); ++d < b; ) e[d] = a, a += c;
            return e;
        }, Ja.rearg = Af, Ja.reject = function(a, b, c) {
            var d = Bf(a) ? Ta : jb;
            return b = tc(b, c, 3), d(a, function(a, c, d) {
                return !b(a, c, d);
            });
        }, Ja.remove = function(a, b, c) {
            var d = [];
            if (!a || !a.length) return d;
            var e = -1, f = [], g = a.length;
            for (b = tc(b, c, 3); ++e < g; ) c = a[e], b(c, e, a) && (d.push(c), f.push(e));
            return zb(a, f), d;
        }, Ja.rest = Vc, Ja.restParam = jd, Ja.set = function(a, b, c) {
            if (null == a) return a;
            var d = b + "";
            b = null != a[d] || Fc(b, a) ? [ d ] : Oc(b);
            for (var d = -1, e = b.length, f = e - 1, g = a; null != g && ++d < e; ) {
                var h = b[d];
                pd(g) && (d == f ? g[h] = c : null == g[h] && (g[h] = Dc(b[d + 1]) ? [] : {})), 
                g = g[h];
            }
            return a;
        }, Ja.shuffle = function(a) {
            return ed(a, Ae);
        }, Ja.slice = function(a, b, c) {
            var d = a ? a.length : 0;
            return d ? (c && "number" != typeof c && Ec(a, b, c) && (b = 0, c = d), Cb(a, b, c)) : [];
        }, Ja.sortBy = function(a, b, c) {
            if (null == a) return [];
            c && Ec(a, b, c) && (b = u);
            var d = -1;
            return b = tc(b, c, 3), a = tb(a, function(a, c, e) {
                return {
                    a: b(a, c, e),
                    b: ++d,
                    c: a
                };
            }), Eb(a, h);
        }, Ja.sortByAll = mf, Ja.sortByOrder = function(a, b, c, d) {
            return null == a ? [] : (d && Ec(b, c, d) && (c = u), Bf(b) || (b = null == b ? [] : [ b ]), 
            Bf(c) || (c = null == c ? [] : [ c ]), Fb(a, b, c));
        }, Ja.spread = function(a) {
            if ("function" != typeof a) throw new Wd(M);
            return function(b) {
                return a.apply(this, b);
            };
        }, Ja.take = function(a, b, c) {
            return a && a.length ? ((c ? Ec(a, b, c) : null == b) && (b = 1), Cb(a, 0, 0 > b ? 0 : b)) : [];
        }, Ja.takeRight = function(a, b, c) {
            var d = a ? a.length : 0;
            return d ? ((c ? Ec(a, b, c) : null == b) && (b = 1), b = d - (+b || 0), Cb(a, 0 > b ? 0 : b)) : [];
        }, Ja.takeRightWhile = function(a, b, c) {
            return a && a.length ? Jb(a, tc(b, c, 3), !1, !0) : [];
        }, Ja.takeWhile = function(a, b, c) {
            return a && a.length ? Jb(a, tc(b, c, 3)) : [];
        }, Ja.tap = function(a, b, c) {
            return b.call(c, a), a;
        }, Ja.throttle = function(a, b, c) {
            var d = !0, e = !0;
            if ("function" != typeof a) throw new Wd(M);
            return !1 === c ? d = !1 : pd(c) && (d = "leading" in c ? !!c.leading : d, e = "trailing" in c ? !!c.trailing : e), 
            hd(a, b, {
                leading: d,
                maxWait: +b,
                trailing: e
            });
        }, Ja.thru = _c, Ja.times = function(a, b, c) {
            if (a = qe(a), 1 > a || !se(a)) return [];
            var d = -1, e = Nd(ve(a, 4294967295));
            for (b = Nb(b, c, 1); ++d < a; ) 4294967295 > d ? e[d] = b(d) : b(d);
            return e;
        }, Ja.toArray = xd, Ja.toPlainObject = yd, Ja.transform = function(a, b, c, d) {
            var e = Bf(a) || vd(a);
            return b = tc(b, d, 4), null == c && (e || pd(a) ? (d = a.constructor, c = e ? Bf(a) ? new d() : [] : Ge(od(d) ? d.prototype : u)) : c = {}), 
            (e ? Ra : nb)(a, function(a, d, e) {
                return b(c, a, d, e);
            }), c;
        }, Ja.union = We, Ja.uniq = Wc, Ja.unzip = Xc, Ja.unzipWith = Yc, Ja.values = Cd, 
        Ja.valuesIn = function(a) {
            return Ib(a, Ad(a));
        }, Ja.where = function(a, b) {
            return bd(a, ub(b));
        }, Ja.without = Xe, Ja.wrap = function(a, b) {
            return b = null == b ? Id : b, pc(b, B, u, [ a ], []);
        }, Ja.xor = function() {
            for (var a = -1, b = arguments.length; ++a < b; ) {
                var c = arguments[a];
                if (Cc(c)) var d = d ? Xa(gb(d, c), gb(c, d)) : c;
            }
            return d ? Hb(d) : [];
        }, Ja.zip = Ye, Ja.zipObject = Zc, Ja.zipWith = Ze, Ja.backflow = wf, Ja.collect = dd, 
        Ja.compose = wf, Ja.each = df, Ja.eachRight = ef, Ja.extend = Df, Ja.iteratee = Hd, 
        Ja.methods = zd, Ja.object = Zc, Ja.select = bd, Ja.tail = Vc, Ja.unique = Wc, Kd(Ja, Ja), 
        Ja.add = function(a, b) {
            return (+a || 0) + (+b || 0);
        }, Ja.attempt = Xf, Ja.camelCase = Rf, Ja.capitalize = function(a) {
            return (a = e(a)) && a.charAt(0).toUpperCase() + a.slice(1);
        }, Ja.ceil = $f, Ja.clone = function(a, b, c, d) {
            return b && "boolean" != typeof b && Ec(a, b, c) ? b = !1 : "function" == typeof b && (d = c, 
            c = b, b = !1), "function" == typeof c ? eb(a, b, Nb(c, d, 3)) : eb(a, b);
        }, Ja.cloneDeep = function(a, b, c) {
            return "function" == typeof b ? eb(a, !0, Nb(b, c, 3)) : eb(a, !0);
        }, Ja.deburr = Dd, Ja.endsWith = function(a, b, c) {
            a = e(a), b += "";
            var d = a.length;
            return c = c === u ? d : ve(0 > c ? 0 : +c || 0, d), c -= b.length, 0 <= c && a.indexOf(b, c) == c;
        }, Ja.escape = function(a) {
            return (a = e(a)) && ma.test(a) ? a.replace(ka, j) : a;
        }, Ja.escapeRegExp = function(a) {
            return (a = e(a)) && ua.test(a) ? a.replace(ta, k) : a || "(?:)";
        }, Ja.every = ad, Ja.find = bf, Ja.findIndex = Qe, Ja.findKey = Gf, Ja.findLast = cf, 
        Ja.findLastIndex = Re, Ja.findLastKey = Hf, Ja.findWhere = function(a, b) {
            return bf(a, ub(b));
        }, Ja.first = Sc, Ja.floor = _f, Ja.get = function(a, b, c) {
            return a = null == a ? u : qb(a, Oc(b), b + ""), a === u ? c : a;
        }, Ja.gt = kd, Ja.gte = function(a, b) {
            return a >= b;
        }, Ja.has = function(a, b) {
            if (null == a) return !1;
            var c = _d.call(a, b);
            if (!c && !Fc(b)) {
                if (b = Oc(b), a = 1 == b.length ? a : qb(a, Cb(b, 0, -1)), null == a) return !1;
                b = Uc(b), c = _d.call(a, b);
            }
            return c || Hc(a.length) && Dc(b, a.length) && (Bf(a) || ld(a));
        }, Ja.identity = Id, Ja.includes = cd, Ja.indexOf = Tc, Ja.inRange = function(a, b, c) {
            return b = +b || 0, c === u ? (c = b, b = 0) : c = +c || 0, a >= ve(b, c) && a < ue(b, c);
        }, Ja.isArguments = ld, Ja.isArray = Bf, Ja.isBoolean = function(a) {
            return !0 === a || !1 === a || n(a) && be.call(a) == Q;
        }, Ja.isDate = function(a) {
            return n(a) && be.call(a) == R;
        }, Ja.isElement = function(a) {
            return !!a && 1 === a.nodeType && n(a) && !sd(a);
        }, Ja.isEmpty = function(a) {
            return null == a || (Cc(a) && (Bf(a) || ud(a) || ld(a) || n(a) && od(a.splice)) ? !a.length : !Mf(a).length);
        }, Ja.isEqual = md, Ja.isError = nd, Ja.isFinite = function(a) {
            return "number" == typeof a && se(a);
        }, Ja.isFunction = od, Ja.isMatch = function(a, b, c, d) {
            return c = "function" == typeof c ? Nb(c, d, 3) : u, sb(a, wc(b), c);
        }, Ja.isNaN = function(a) {
            return rd(a) && a != +a;
        }, Ja.isNative = qd, Ja.isNull = function(a) {
            return null === a;
        }, Ja.isNumber = rd, Ja.isObject = pd, Ja.isPlainObject = sd, Ja.isRegExp = td, 
        Ja.isString = ud, Ja.isTypedArray = vd, Ja.isUndefined = function(a) {
            return a === u;
        }, Ja.kebabCase = Sf, Ja.last = Uc, Ja.lastIndexOf = function(a, b, c) {
            var d = a ? a.length : 0;
            if (!d) return -1;
            var e = d;
            if ("number" == typeof c) e = (0 > c ? ue(d + c, 0) : ve(c || 0, d - 1)) + 1; else if (c) return e = Lb(a, b, !0) - 1, 
            a = a[e], (b === b ? b === a : a !== a) ? e : -1;
            if (b !== b) return m(a, e, !0);
            for (;e--; ) if (a[e] === b) return e;
            return -1;
        }, Ja.lt = wd, Ja.lte = function(a, b) {
            return a <= b;
        }, Ja.max = ag, Ja.min = bg, Ja.noConflict = function() {
            return Ua._ = ce, this;
        }, Ja.noop = Ld, Ja.now = nf, Ja.pad = function(a, b, c) {
            a = e(a), b = +b;
            var d = a.length;
            return d < b && se(b) ? (d = (b - d) / 2, b = qe(d), d = oe(d), c = lc("", d, c), 
            c.slice(0, b) + a + c) : a;
        }, Ja.padLeft = Tf, Ja.padRight = Uf, Ja.parseInt = function(a, b, c) {
            return (c ? Ec(a, b, c) : null == b) ? b = 0 : b && (b = +b), a = Fd(a), xe(a, b || (za.test(a) ? 16 : 10));
        }, Ja.random = function(a, b, c) {
            c && Ec(a, b, c) && (b = c = u);
            var d = null == a, e = null == b;
            return null == c && (e && "boolean" == typeof a ? (c = a, a = 1) : "boolean" == typeof b && (c = b, 
            e = !0)), d && e && (b = 1, e = !1), a = +a || 0, e ? (b = a, a = 0) : b = +b || 0, 
            c || a % 1 || b % 1 ? (c = ye(), ve(a + c * (b - a + ge("1e-" + ((c + "").length - 1))), b)) : Ab(a, b);
        }, Ja.reduce = kf, Ja.reduceRight = lf, Ja.repeat = Ed, Ja.result = function(a, b, c) {
            var d = null == a ? u : a[b];
            return d === u && (null == a || Fc(b, a) || (b = Oc(b), a = 1 == b.length ? a : qb(a, Cb(b, 0, -1)), 
            d = null == a ? u : a[Uc(b)]), d = d === u ? c : d), od(d) ? d.call(a) : d;
        }, Ja.round = cg, Ja.runInContext = t, Ja.size = function(a) {
            var b = a ? Ne(a) : 0;
            return Hc(b) ? b : Mf(a).length;
        }, Ja.snakeCase = Vf, Ja.some = fd, Ja.sortedIndex = Ue, Ja.sortedLastIndex = Ve, 
        Ja.startCase = Wf, Ja.startsWith = function(a, b, c) {
            return a = e(a), c = null == c ? 0 : ve(0 > c ? 0 : +c || 0, a.length), a.lastIndexOf(b, c) == c;
        }, Ja.sum = function(a, b, c) {
            if (c && Ec(a, b, c) && (b = u), b = tc(b, c, 3), 1 == b.length) {
                a = Bf(a) ? a : Mc(a), c = a.length;
                for (var d = 0; c--; ) d += +b(a[c]) || 0;
                a = d;
            } else a = Gb(a, b);
            return a;
        }, Ja.template = function(a, b, c) {
            var d = Ja.templateSettings;
            c && Ec(a, b, c) && (b = c = u), a = e(a), b = _a(ab({}, c || b), d, $a), c = _a(ab({}, b.imports), d.imports, $a);
            var f, g, h = Mf(c), i = Ib(c, h), j = 0;
            c = b.interpolate || Da;
            var k = "__p+='";
            c = Ud((b.escape || Da).source + "|" + c.source + "|" + (c === pa ? xa : Da).source + "|" + (b.evaluate || Da).source + "|$", "g");
            var m = "sourceURL" in b ? "//# sourceURL=" + b.sourceURL + "\n" : "";
            if (a.replace(c, function(b, c, d, e, h, i) {
                return d || (d = e), k += a.slice(j, i).replace(Ea, l), c && (f = !0, k += "'+__e(" + c + ")+'"), 
                h && (g = !0, k += "';" + h + ";\n__p+='"), d && (k += "'+((__t=(" + d + "))==null?'':__t)+'"), 
                j = i + b.length, b;
            }), k += "';", (b = b.variable) || (k = "with(obj){" + k + "}"), k = (g ? k.replace(ga, "") : k).replace(ha, "$1").replace(ia, "$1;"), 
            k = "function(" + (b || "obj") + "){" + (b ? "" : "obj||(obj={});") + "var __t,__p=''" + (f ? ",__e=_.escape" : "") + (g ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}" : ";") + k + "return __p}", 
            b = Xf(function() {
                return Qd(h, m + "return " + k).apply(u, i);
            }), b.source = k, nd(b)) throw b;
            return b;
        }, Ja.trim = Fd, Ja.trimLeft = function(a, b, c) {
            var d = a;
            return (a = e(a)) ? a.slice((c ? Ec(d, b, c) : null == b) ? q(a) : f(a, b + "")) : a;
        }, Ja.trimRight = function(a, b, c) {
            var d = a;
            return (a = e(a)) ? (c ? Ec(d, b, c) : null == b) ? a.slice(0, r(a) + 1) : a.slice(0, g(a, b + "") + 1) : a;
        }, Ja.trunc = function(a, b, c) {
            c && Ec(a, b, c) && (b = u);
            var d = F;
            if (c = G, null != b) if (pd(b)) {
                var f = "separator" in b ? b.separator : f, d = "length" in b ? +b.length || 0 : d;
                c = "omission" in b ? e(b.omission) : c;
            } else d = +b || 0;
            if (a = e(a), d >= a.length) return a;
            if (d -= c.length, 1 > d) return c;
            if (b = a.slice(0, d), null == f) return b + c;
            if (td(f)) {
                if (a.slice(d).search(f)) {
                    var g, h = a.slice(0, d);
                    for (f.global || (f = Ud(f.source, (ya.exec(f) || "") + "g")), f.lastIndex = 0; a = f.exec(h); ) g = a.index;
                    b = b.slice(0, null == g ? d : g);
                }
            } else a.indexOf(f, d) != d && (f = b.lastIndexOf(f), -1 < f && (b = b.slice(0, f)));
            return b + c;
        }, Ja.unescape = function(a) {
            return (a = e(a)) && la.test(a) ? a.replace(ja, s) : a;
        }, Ja.uniqueId = function(a) {
            var b = ++ae;
            return e(a) + b;
        }, Ja.words = Gd, Ja.all = ad, Ja.any = fd, Ja.contains = cd, Ja.eq = md, Ja.detect = bf, 
        Ja.foldl = kf, Ja.foldr = lf, Ja.head = Sc, Ja.include = cd, Ja.inject = kf, Kd(Ja, function() {
            var a = {};
            return nb(Ja, function(b, c) {
                Ja.prototype[c] || (a[c] = b);
            }), a;
        }(), !1), Ja.sample = ed, Ja.prototype.sample = function(a) {
            return this.__chain__ || null != a ? this.thru(function(b) {
                return ed(b, a);
            }) : ed(this.value());
        }, Ja.VERSION = v, Ra("bind bindKey curry curryRight partial partialRight".split(" "), function(a) {
            Ja[a].placeholder = Ja;
        }), Ra([ "drop", "take" ], function(a, b) {
            Ma.prototype[a] = function(c) {
                var d = this.__filtered__;
                if (d && !b) return new Ma(this);
                c = null == c ? 1 : ue(qe(c) || 0, 0);
                var e = this.clone();
                return d ? e.__takeCount__ = ve(e.__takeCount__, c) : e.__views__.push({
                    size: c,
                    type: a + (0 > e.__dir__ ? "Right" : "")
                }), e;
            }, Ma.prototype[a + "Right"] = function(b) {
                return this.reverse()[a](b).reverse();
            };
        }), Ra([ "filter", "map", "takeWhile" ], function(a, b) {
            var c = b + 1, d = c != L;
            Ma.prototype[a] = function(a, b) {
                var e = this.clone();
                return e.__iteratees__.push({
                    iteratee: tc(a, b, 1),
                    type: c
                }), e.__filtered__ = e.__filtered__ || d, e;
            };
        }), Ra([ "first", "last" ], function(a, b) {
            var c = "take" + (b ? "Right" : "");
            Ma.prototype[a] = function() {
                return this[c](1).value()[0];
            };
        }), Ra([ "initial", "rest" ], function(a, b) {
            var c = "drop" + (b ? "" : "Right");
            Ma.prototype[a] = function() {
                return this.__filtered__ ? new Ma(this) : this[c](1);
            };
        }), Ra([ "pluck", "where" ], function(a, b) {
            var c = b ? "filter" : "map", d = b ? ub : Md;
            Ma.prototype[a] = function(a) {
                return this[c](d(a));
            };
        }), Ma.prototype.compact = function() {
            return this.filter(Id);
        }, Ma.prototype.reject = function(a, b) {
            return a = tc(a, b, 1), this.filter(function(b) {
                return !a(b);
            });
        }, Ma.prototype.slice = function(a, b) {
            a = null == a ? 0 : +a || 0;
            var c = this;
            return c.__filtered__ && (0 < a || 0 > b) ? new Ma(c) : (0 > a ? c = c.takeRight(-a) : a && (c = c.drop(a)), 
            b !== u && (b = +b || 0, c = 0 > b ? c.dropRight(-b) : c.take(b - a)), c);
        }, Ma.prototype.takeRightWhile = function(a, b) {
            return this.reverse().takeWhile(a, b).reverse();
        }, Ma.prototype.toArray = function() {
            return this.take(Ae);
        }, nb(Ma.prototype, function(a, b) {
            var c = /^(?:filter|map|reject)|While$/.test(b), d = /^(?:first|last)$/.test(b), e = Ja[d ? "take" + ("last" == b ? "Right" : "") : b];
            e && (Ja.prototype[b] = function() {
                function b(a) {
                    return d && g ? e(a, 1)[0] : e.apply(u, Xa([ a ], f));
                }
                var f = d ? [ 1 ] : arguments, g = this.__chain__, h = this.__wrapped__, i = !!this.__actions__.length, j = h instanceof Ma, k = f[0], l = j || Bf(h);
                return l && c && "function" == typeof k && 1 != k.length && (j = l = !1), k = {
                    func: _c,
                    args: [ b ],
                    thisArg: u
                }, i = j && !i, d && !g ? i ? (h = h.clone(), h.__actions__.push(k), a.call(h)) : e.call(u, this.value())[0] : !d && l ? (h = i ? h : new Ma(this), 
                h = a.apply(h, f), h.__actions__.push(k), new La(h, g)) : this.thru(b);
            });
        }), Ra("join pop push replace shift sort splice split unshift".split(" "), function(a) {
            var b = (/^(?:replace|split)$/.test(a) ? Zd : Xd)[a], c = /^(?:push|sort|unshift)$/.test(a) ? "tap" : "thru", d = /^(?:join|pop|replace|shift)$/.test(a);
            Ja.prototype[a] = function() {
                var a = arguments;
                return d && !this.__chain__ ? b.apply(this.value(), a) : this[c](function(c) {
                    return b.apply(c, a);
                });
            };
        }), nb(Ma.prototype, function(a, b) {
            var c = Ja[b];
            if (c) {
                var d = c.name + "";
                (Fe[d] || (Fe[d] = [])).push({
                    name: b,
                    func: c
                });
            }
        }), Fe[kc(u, x).name] = [ {
            name: "wrapper",
            func: u
        } ], Ma.prototype.clone = function() {
            var a = new Ma(this.__wrapped__);
            return a.__actions__ = Qa(this.__actions__), a.__dir__ = this.__dir__, a.__filtered__ = this.__filtered__, 
            a.__iteratees__ = Qa(this.__iteratees__), a.__takeCount__ = this.__takeCount__, 
            a.__views__ = Qa(this.__views__), a;
        }, Ma.prototype.reverse = function() {
            if (this.__filtered__) {
                var a = new Ma(this);
                a.__dir__ = -1, a.__filtered__ = !0;
            } else a = this.clone(), a.__dir__ *= -1;
            return a;
        }, Ma.prototype.value = function() {
            var a, b = this.__wrapped__.value(), c = this.__dir__, d = Bf(b), e = 0 > c, f = d ? b.length : 0;
            a = f;
            for (var g = this.__views__, h = 0, i = -1, j = g.length; ++i < j; ) {
                var k = g[i], l = k.size;
                switch (k.type) {
                  case "drop":
                    h += l;
                    break;

                  case "dropRight":
                    a -= l;
                    break;

                  case "take":
                    a = ve(a, h + l);
                    break;

                  case "takeRight":
                    h = ue(h, a - l);
                }
            }
            if (a = {
                start: h,
                end: a
            }, g = a.start, h = a.end, a = h - g, e = e ? h : g - 1, g = this.__iteratees__, 
            h = g.length, i = 0, j = ve(a, this.__takeCount__), !d || f < J || f == a && j == a) return Kb(b, this.__actions__);
            d = [];
            a: for (;a-- && i < j; ) {
                for (e += c, f = -1, k = b[e]; ++f < h; ) {
                    var m = g[f], l = m.type, m = m.iteratee(k);
                    if (l == L) k = m; else if (!m) {
                        if (l == K) continue a;
                        break a;
                    }
                }
                d[i++] = k;
            }
            return d;
        }, Ja.prototype.chain = function() {
            return $c(this);
        }, Ja.prototype.commit = function() {
            return new La(this.value(), this.__chain__);
        }, Ja.prototype.concat = $e, Ja.prototype.plant = function(a) {
            for (var b, c = this; c instanceof Ka; ) {
                var d = Pc(c);
                b ? e.__wrapped__ = d : b = d;
                var e = d, c = c.__wrapped__;
            }
            return e.__wrapped__ = a, b;
        }, Ja.prototype.reverse = function() {
            function a(a) {
                return a.reverse();
            }
            var b = this.__wrapped__;
            return b instanceof Ma ? (this.__actions__.length && (b = new Ma(this)), b = b.reverse(), 
            b.__actions__.push({
                func: _c,
                args: [ a ],
                thisArg: u
            }), new La(b, this.__chain__)) : this.thru(a);
        }, Ja.prototype.toString = function() {
            return this.value() + "";
        }, Ja.prototype.run = Ja.prototype.toJSON = Ja.prototype.valueOf = Ja.prototype.value = function() {
            return Kb(this.__wrapped__, this.__actions__);
        }, Ja.prototype.collect = Ja.prototype.map, Ja.prototype.head = Ja.prototype.first, 
        Ja.prototype.select = Ja.prototype.filter, Ja.prototype.tail = Ja.prototype.rest, 
        Ja;
    }
    var u, v = "3.10.1", w = 1, x = 2, y = 4, z = 8, A = 16, B = 32, C = 64, D = 128, E = 256, F = 30, G = "...", H = 150, I = 16, J = 200, K = 1, L = 2, M = "Expected a function", N = "__lodash_placeholder__", O = "[object Arguments]", P = "[object Array]", Q = "[object Boolean]", R = "[object Date]", S = "[object Error]", T = "[object Function]", U = "[object Number]", V = "[object Object]", W = "[object RegExp]", X = "[object String]", Y = "[object ArrayBuffer]", Z = "[object Float32Array]", $ = "[object Float64Array]", _ = "[object Int8Array]", aa = "[object Int16Array]", ba = "[object Int32Array]", ca = "[object Uint8Array]", da = "[object Uint8ClampedArray]", ea = "[object Uint16Array]", fa = "[object Uint32Array]", ga = /\b__p\+='';/g, ha = /\b(__p\+=)''\+/g, ia = /(__e\(.*?\)|\b__t\))\+'';/g, ja = /&(?:amp|lt|gt|quot|#39|#96);/g, ka = /[&<>"'`]/g, la = RegExp(ja.source), ma = RegExp(ka.source), na = /<%-([\s\S]+?)%>/g, oa = /<%([\s\S]+?)%>/g, pa = /<%=([\s\S]+?)%>/g, qa = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/, ra = /^\w*$/, sa = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g, ta = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g, ua = RegExp(ta.source), va = /[\u0300-\u036f\ufe20-\ufe23]/g, wa = /\\(\\)?/g, xa = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, ya = /\w*$/, za = /^0[xX]/, Aa = /^\[object .+?Constructor\]$/, Ba = /^\d+$/, Ca = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g, Da = /($^)/, Ea = /['\n\r\u2028\u2029\\]/g, Fa = RegExp("[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?=[A-Z\\xc0-\\xd6\\xd8-\\xde][a-z\\xdf-\\xf6\\xf8-\\xff]+)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+|[A-Z\\xc0-\\xd6\\xd8-\\xde]+|[0-9]+", "g"), Ga = "Array ArrayBuffer Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Math Number Object RegExp Set String _ clearTimeout isFinite parseFloat parseInt setTimeout TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap".split(" "), Ha = {};
    Ha[Z] = Ha[$] = Ha[_] = Ha[aa] = Ha[ba] = Ha[ca] = Ha[da] = Ha[ea] = Ha[fa] = !0, 
    Ha[O] = Ha[P] = Ha[Y] = Ha[Q] = Ha[R] = Ha[S] = Ha[T] = Ha["[object Map]"] = Ha[U] = Ha[V] = Ha[W] = Ha["[object Set]"] = Ha[X] = Ha["[object WeakMap]"] = !1;
    var Ia = {};
    Ia[O] = Ia[P] = Ia[Y] = Ia[Q] = Ia[R] = Ia[Z] = Ia[$] = Ia[_] = Ia[aa] = Ia[ba] = Ia[U] = Ia[V] = Ia[W] = Ia[X] = Ia[ca] = Ia[da] = Ia[ea] = Ia[fa] = !0, 
    Ia[S] = Ia[T] = Ia["[object Map]"] = Ia["[object Set]"] = Ia["[object WeakMap]"] = !1;
    var Ja = {
        "À": "A",
        "Á": "A",
        "Â": "A",
        "Ã": "A",
        "Ä": "A",
        "Å": "A",
        "à": "a",
        "á": "a",
        "â": "a",
        "ã": "a",
        "ä": "a",
        "å": "a",
        "Ç": "C",
        "ç": "c",
        "Ð": "D",
        "ð": "d",
        "È": "E",
        "É": "E",
        "Ê": "E",
        "Ë": "E",
        "è": "e",
        "é": "e",
        "ê": "e",
        "ë": "e",
        "Ì": "I",
        "Í": "I",
        "Î": "I",
        "Ï": "I",
        "ì": "i",
        "í": "i",
        "î": "i",
        "ï": "i",
        "Ñ": "N",
        "ñ": "n",
        "Ò": "O",
        "Ó": "O",
        "Ô": "O",
        "Õ": "O",
        "Ö": "O",
        "Ø": "O",
        "ò": "o",
        "ó": "o",
        "ô": "o",
        "õ": "o",
        "ö": "o",
        "ø": "o",
        "Ù": "U",
        "Ú": "U",
        "Û": "U",
        "Ü": "U",
        "ù": "u",
        "ú": "u",
        "û": "u",
        "ü": "u",
        "Ý": "Y",
        "ý": "y",
        "ÿ": "y",
        "Æ": "Ae",
        "æ": "ae",
        "Þ": "Th",
        "þ": "th",
        "ß": "ss"
    }, Ka = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "`": "&#96;"
    }, La = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'",
        "&#96;": "`"
    }, Ma = {
        "function": !0,
        object: !0
    }, Na = {
        0: "x30",
        1: "x31",
        2: "x32",
        3: "x33",
        4: "x34",
        5: "x35",
        6: "x36",
        7: "x37",
        8: "x38",
        9: "x39",
        A: "x41",
        B: "x42",
        C: "x43",
        D: "x44",
        E: "x45",
        F: "x46",
        a: "x61",
        b: "x62",
        c: "x63",
        d: "x64",
        e: "x65",
        f: "x66",
        n: "x6e",
        r: "x72",
        t: "x74",
        u: "x75",
        v: "x76",
        x: "x78"
    }, Oa = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, Pa = Ma[typeof exports] && exports && !exports.nodeType && exports, Qa = Ma[typeof module] && module && !module.nodeType && module, Ra = Ma[typeof self] && self && self.Object && self, Sa = Ma[typeof window] && window && window.Object && window, Ta = Qa && Qa.exports === Pa && Pa, Ua = Pa && Qa && "object" == typeof global && global && global.Object && global || Sa !== (this && this.window) && Sa || Ra || this, Va = t();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (Ua._ = Va, 
    define(function() {
        return Va;
    })) : Pa && Qa ? Ta ? (Qa.exports = Va)._ = Va : Pa._ = Va : Ua._ = Va;
}.call(this), function(a, b) {
    a(function() {
        function a(a, b) {
            return null != a && null != b && a.toLowerCase() === b.toLowerCase();
        }
        function c(a, b) {
            var c, d, e = a.length;
            if (!e || !b) return !1;
            for (c = b.toLowerCase(), d = 0; d < e; ++d) if (c === a[d].toLowerCase()) return !0;
            return !1;
        }
        function d(a) {
            for (var b in a) h.call(a, b) && (a[b] = new RegExp(a[b], "i"));
        }
        function e(a, b) {
            this.ua = a || "", this._cache = {}, this.maxPhoneWidth = b || 600;
        }
        var f = {};
        f.mobileDetectRules = {
            phones: {
                iPhone: "\\biPhone\\b|\\biPod\\b",
                BlackBerry: "BlackBerry|\\bBB10\\b|rim[0-9]+",
                HTC: "HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m",
                Nexus: "Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 6",
                Dell: "Dell.*Streak|Dell.*Aero|Dell.*Venue|DELL.*Venue Pro|Dell Flash|Dell Smoke|Dell Mini 3iX|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b",
                Motorola: "Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b",
                Samsung: "\\bSamsung\\b|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205|SM-G9350|SM-J120F",
                LG: "\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802|MS323)",
                Sony: "SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533",
                Asus: "Asus.*Galaxy|PadFone.*Mobile",
                NokiaLumia: "Lumia [0-9]{3,4}",
                Micromax: "Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b",
                Palm: "PalmSource|Palm",
                Vertu: "Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature",
                Pantech: "PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790",
                Fly: "IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250",
                Wiko: "KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA(?!nna)|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM",
                iMobile: "i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)",
                SimValley: "\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b",
                Wolfgang: "AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q",
                Alcatel: "Alcatel",
                Nintendo: "Nintendo 3DS",
                Amoi: "Amoi",
                INQ: "INQ",
                GenericPhone: "Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser"
            },
            tablets: {
                iPad: "iPad|iPad.*Mobile",
                NexusTablet: "Android.*Nexus[\\s]+(7|9|10)",
                SamsungTablet: "SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T815|SM-T360|SM-T533|SM-T113|SM-T335|SM-T715|SM-T560|SM-T670|SM-T677|SM-T377|SM-T567|SM-T357T|SM-T555|SM-T561|SM-T713|SM-T719|SM-T813|SM-T819|SM-T580|SM-T355Y|SM-T280",
                Kindle: "Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI|KFARWI)\\b",
                SurfaceTablet: "Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)",
                HPTablet: "HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10",
                AsusTablet: "^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K011 | K017 | K01E |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C|P01Y|PO1MA|P01Z",
                BlackBerryTablet: "PlayBook|RIM Tablet",
                HTCtablet: "HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410",
                MotorolaTablet: "xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617",
                NookTablet: "Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2",
                AcerTablet: "Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b|\\bA3-A20\\b|\\bA3-A30",
                ToshibaTablet: "Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO",
                LGTablet: "\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b",
                FujitsuTablet: "Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b",
                PrestigioTablet: "PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002",
                LenovoTablet: "Lenovo TAB|Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|YT3-X90L|YT3-X90F|YT3-X90X|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)",
                DellTablet: "Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7",
                YarvikTablet: "Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b",
                MedionTablet: "Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB",
                ArnovaTablet: "97G4|AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2",
                IntensoTablet: "INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004",
                IRUTablet: "M702pro",
                MegafonTablet: "MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b",
                EbodaTablet: "E-Boda (Supreme|Impresspeed|Izzycomm|Essential)",
                AllViewTablet: "Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)",
                ArchosTablet: "\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b",
                AinolTablet: "NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark",
                NokiaLumiaTablet: "Lumia 2520",
                SonyTablet: "Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP612|SOT31",
                PhilipsTablet: "\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b",
                CubeTablet: "Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT",
                CobyTablet: "MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010",
                MIDTablet: "M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733|MID4X10",
                MSITablet: "MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b",
                SMiTTablet: "Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)",
                RockChipTablet: "Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A",
                FlyTablet: "IQ310|Fly Vision",
                bqTablet: "Android.*(bq)?.*(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris [E|M]10)|Maxwell.*Lite|Maxwell.*Plus",
                HuaweiTablet: "MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim",
                NecTablet: "\\bN-06D|\\bN-08D",
                PantechTablet: "Pantech.*P4100",
                BronchoTablet: "Broncho.*(N701|N708|N802|a710)",
                VersusTablet: "TOUCHPAD.*[78910]|\\bTOUCHTAB\\b",
                ZyncTablet: "z1000|Z99 2G|z99|z930|z999|z990|z909|Z919|z900",
                PositivoTablet: "TB07STA|TB10STA|TB07FTA|TB10FTA",
                NabiTablet: "Android.*\\bNabi",
                KoboTablet: "Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build",
                DanewTablet: "DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b",
                TexetTablet: "NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE",
                PlaystationTablet: "Playstation.*(Portable|Vita)",
                TrekstorTablet: "ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab",
                PyleAudioTablet: "\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b",
                AdvanTablet: "Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ",
                DanyTechTablet: "Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1",
                GalapadTablet: "Android.*\\bG1\\b",
                MicromaxTablet: "Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b",
                KarbonnTablet: "Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b",
                AllFineTablet: "Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide",
                PROSCANTablet: "\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b",
                YONESTablet: "BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026",
                ChangJiaTablet: "TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503",
                GUTablet: "TX-A1301|TX-M9002|Q702|kf026",
                PointOfViewTablet: "TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10",
                OvermaxTablet: "OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)",
                HCLTablet: "HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync",
                DPSTablet: "DPS Dream 9|DPS Dual 7",
                VistureTablet: "V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10",
                CrestaTablet: "CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989",
                MediatekTablet: "\\bMT8125|MT8389|MT8135|MT8377\\b",
                ConcordeTablet: "Concorde([ ]+)?Tab|ConCorde ReadMan",
                GoCleverTablet: "GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042",
                ModecomTablet: "FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003",
                VoninoTablet: "\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b",
                ECSTablet: "V07OT2|TM105A|S10OT1|TR10CS1",
                StorexTablet: "eZee[_']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab",
                VodafoneTablet: "SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7|VF-1497",
                EssentielBTablet: "Smart[ ']?TAB[ ]+?[0-9]+|Family[ ']?TAB2",
                RossMoorTablet: "RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711",
                iMobileTablet: "i-mobile i-note",
                TolinoTablet: "tolino tab [0-9.]+|tolino shine",
                AudioSonicTablet: "\\bC-22Q|T7-QC|T-17B|T-17P\\b",
                AMPETablet: "Android.* A78 ",
                SkkTablet: "Android.* (SKYPAD|PHOENIX|CYCLOPS)",
                TecnoTablet: "TECNO P9",
                JXDTablet: "Android.* \\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b",
                iJoyTablet: "Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)",
                FX2Tablet: "FX2 PAD7|FX2 PAD10",
                XoroTablet: "KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151",
                ViewsonicTablet: "ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a",
                OdysTablet: "LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10",
                CaptivaTablet: "CAPTIVA PAD",
                IconbitTablet: "NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S",
                TeclastTablet: "T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi",
                OndaTablet: "\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+",
                JaytechTablet: "TPC-PA762",
                BlaupunktTablet: "Endeavour 800NG|Endeavour 1010",
                DigmaTablet: "\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b",
                EvolioTablet: "ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b",
                LavaTablet: "QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b",
                AocTablet: "MW0811|MW0812|MW0922|MTK8382|MW1031|MW0831|MW0821|MW0931|MW0712",
                MpmanTablet: "MP11 OCTA|MP10 OCTA|MPQC1114|MPQC1004|MPQC994|MPQC974|MPQC973|MPQC804|MPQC784|MPQC780|\\bMPG7\\b|MPDCG75|MPDCG71|MPDC1006|MP101DC|MPDC9000|MPDC905|MPDC706HD|MPDC706|MPDC705|MPDC110|MPDC100|MPDC99|MPDC97|MPDC88|MPDC8|MPDC77|MP709|MID701|MID711|MID170|MPDC703|MPQC1010",
                CelkonTablet: "CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b",
                WolderTablet: "miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b",
                MiTablet: "\\bMI PAD\\b|\\bHM NOTE 1W\\b",
                NibiruTablet: "Nibiru M1|Nibiru Jupiter One",
                NexoTablet: "NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI",
                LeaderTablet: "TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100",
                UbislateTablet: "UbiSlate[\\s]?7C",
                PocketBookTablet: "Pocketbook",
                KocasoTablet: "\\b(TB-1207)\\b",
                HisenseTablet: "\\b(F5281|E2371)\\b",
                Hudl: "Hudl HT7S3|Hudl 2",
                TelstraTablet: "T-Hub2",
                GenericTablet: "Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bTP750\\b"
            },
            oss: {
                AndroidOS: "Android",
                BlackBerryOS: "blackberry|\\bBB10\\b|rim tablet os",
                PalmOS: "PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino",
                SymbianOS: "Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b",
                WindowsMobileOS: "Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Window Mobile|Windows Phone [0-9.]+|WCE;",
                WindowsPhoneOS: "Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;",
                iOS: "\\biPhone.*Mobile|\\biPod|\\biPad",
                MeeGoOS: "MeeGo",
                MaemoOS: "Maemo",
                JavaOS: "J2ME/|\\bMIDP\\b|\\bCLDC\\b",
                webOS: "webOS|hpwOS",
                badaOS: "\\bBada\\b",
                BREWOS: "BREW"
            },
            uas: {
                Chrome: "\\bCrMo\\b|CriOS|Android.*Chrome/[.0-9]* (Mobile)?",
                Dolfin: "\\bDolfin\\b",
                Opera: "Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR/[0-9.]+|Coast/[0-9.]+",
                Skyfire: "Skyfire",
                Edge: "Mobile Safari/[.0-9]* Edge",
                IE: "IEMobile|MSIEMobile",
                Firefox: "fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS",
                Bolt: "bolt",
                TeaShark: "teashark",
                Blazer: "Blazer",
                Safari: "Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari",
                UCBrowser: "UC.*Browser|UCWEB",
                baiduboxapp: "baiduboxapp",
                baidubrowser: "baidubrowser",
                DiigoBrowser: "DiigoBrowser",
                Puffin: "Puffin",
                Mercury: "\\bMercury\\b",
                ObigoBrowser: "Obigo",
                NetFront: "NF-Browser",
                GenericBrowser: "NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger",
                PaleMoon: "Android.*PaleMoon|Mobile.*PaleMoon"
            },
            props: {
                Mobile: "Mobile/[VER]",
                Build: "Build/[VER]",
                Version: "Version/[VER]",
                VendorID: "VendorID/[VER]",
                iPad: "iPad.*CPU[a-z ]+[VER]",
                iPhone: "iPhone.*CPU[a-z ]+[VER]",
                iPod: "iPod.*CPU[a-z ]+[VER]",
                Kindle: "Kindle/[VER]",
                Chrome: [ "Chrome/[VER]", "CriOS/[VER]", "CrMo/[VER]" ],
                Coast: [ "Coast/[VER]" ],
                Dolfin: "Dolfin/[VER]",
                Firefox: [ "Firefox/[VER]", "FxiOS/[VER]" ],
                Fennec: "Fennec/[VER]",
                Edge: "Edge/[VER]",
                IE: [ "IEMobile/[VER];", "IEMobile [VER]", "MSIE [VER];", "Trident/[0-9.]+;.*rv:[VER]" ],
                NetFront: "NetFront/[VER]",
                NokiaBrowser: "NokiaBrowser/[VER]",
                Opera: [ " OPR/[VER]", "Opera Mini/[VER]", "Version/[VER]" ],
                "Opera Mini": "Opera Mini/[VER]",
                "Opera Mobi": "Version/[VER]",
                "UC Browser": "UC Browser[VER]",
                MQQBrowser: "MQQBrowser/[VER]",
                MicroMessenger: "MicroMessenger/[VER]",
                baiduboxapp: "baiduboxapp/[VER]",
                baidubrowser: "baidubrowser/[VER]",
                SamsungBrowser: "SamsungBrowser/[VER]",
                Iron: "Iron/[VER]",
                Safari: [ "Version/[VER]", "Safari/[VER]" ],
                Skyfire: "Skyfire/[VER]",
                Tizen: "Tizen/[VER]",
                Webkit: "webkit[ /][VER]",
                PaleMoon: "PaleMoon/[VER]",
                Gecko: "Gecko/[VER]",
                Trident: "Trident/[VER]",
                Presto: "Presto/[VER]",
                Goanna: "Goanna/[VER]",
                iOS: " \\bi?OS\\b [VER][ ;]{1}",
                Android: "Android [VER]",
                BlackBerry: [ "BlackBerry[\\w]+/[VER]", "BlackBerry.*Version/[VER]", "Version/[VER]" ],
                BREW: "BREW [VER]",
                Java: "Java/[VER]",
                "Windows Phone OS": [ "Windows Phone OS [VER]", "Windows Phone [VER]" ],
                "Windows Phone": "Windows Phone [VER]",
                "Windows CE": "Windows CE/[VER]",
                "Windows NT": "Windows NT [VER]",
                Symbian: [ "SymbianOS/[VER]", "Symbian/[VER]" ],
                webOS: [ "webOS/[VER]", "hpwOS/[VER];" ]
            },
            utils: {
                Bot: "Googlebot|facebookexternalhit|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|YandexMobileBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom",
                MobileBot: "Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker/M1A1-R2D2",
                DesktopMode: "WPDesktop",
                TV: "SonyDTV|HbbTV",
                WebKit: "(webkit)[ /]([\\w.]+)",
                Console: "\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|PLAYSTATION|Xbox)\\b",
                Watch: "SM-V700"
            }
        }, f.detectMobileBrowsers = {
            fullPattern: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
            shortPattern: /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            tabletPattern: /android|ipad|playbook|silk/i
        };
        var g, h = Object.prototype.hasOwnProperty;
        return f.FALLBACK_PHONE = "UnknownPhone", f.FALLBACK_TABLET = "UnknownTablet", f.FALLBACK_MOBILE = "UnknownMobile", 
        g = "isArray" in Array ? Array.isArray : function(a) {
            return "[object Array]" === Object.prototype.toString.call(a);
        }, function() {
            var a, b, c, e, i, j, k = f.mobileDetectRules;
            for (a in k.props) if (h.call(k.props, a)) {
                for (b = k.props[a], g(b) || (b = [ b ]), i = b.length, e = 0; e < i; ++e) c = b[e], 
                j = c.indexOf("[VER]"), j >= 0 && (c = c.substring(0, j) + "([\\w._\\+]+)" + c.substring(j + 5)), 
                b[e] = new RegExp(c, "i");
                k.props[a] = b;
            }
            d(k.oss), d(k.phones), d(k.tablets), d(k.uas), d(k.utils), k.oss0 = {
                WindowsPhoneOS: k.oss.WindowsPhoneOS,
                WindowsMobileOS: k.oss.WindowsMobileOS
            };
        }(), f.findMatch = function(a, b) {
            for (var c in a) if (h.call(a, c) && a[c].test(b)) return c;
            return null;
        }, f.findMatches = function(a, b) {
            var c = [];
            for (var d in a) h.call(a, d) && a[d].test(b) && c.push(d);
            return c;
        }, f.getVersionStr = function(a, b) {
            var c, d, e, g, i = f.mobileDetectRules.props;
            if (h.call(i, a)) for (c = i[a], e = c.length, d = 0; d < e; ++d) if (g = c[d].exec(b), 
            null !== g) return g[1];
            return null;
        }, f.getVersion = function(a, b) {
            var c = f.getVersionStr(a, b);
            return c ? f.prepareVersionNo(c) : NaN;
        }, f.prepareVersionNo = function(a) {
            var b;
            return b = a.split(/[a-z._ \/\-]/i), 1 === b.length && (a = b[0]), b.length > 1 && (a = b[0] + ".", 
            b.shift(), a += b.join("")), Number(a);
        }, f.isMobileFallback = function(a) {
            return f.detectMobileBrowsers.fullPattern.test(a) || f.detectMobileBrowsers.shortPattern.test(a.substr(0, 4));
        }, f.isTabletFallback = function(a) {
            return f.detectMobileBrowsers.tabletPattern.test(a);
        }, f.prepareDetectionCache = function(a, c, d) {
            if (a.mobile === b) {
                var g, h, i;
                return (h = f.findMatch(f.mobileDetectRules.tablets, c)) ? (a.mobile = a.tablet = h, 
                void (a.phone = null)) : (g = f.findMatch(f.mobileDetectRules.phones, c)) ? (a.mobile = a.phone = g, 
                void (a.tablet = null)) : void (f.isMobileFallback(c) ? (i = e.isPhoneSized(d), 
                i === b ? (a.mobile = f.FALLBACK_MOBILE, a.tablet = a.phone = null) : i ? (a.mobile = a.phone = f.FALLBACK_PHONE, 
                a.tablet = null) : (a.mobile = a.tablet = f.FALLBACK_TABLET, a.phone = null)) : f.isTabletFallback(c) ? (a.mobile = a.tablet = f.FALLBACK_TABLET, 
                a.phone = null) : a.mobile = a.tablet = a.phone = null);
            }
        }, f.mobileGrade = function(a) {
            var b = null !== a.mobile();
            return a.os("iOS") && a.version("iPad") >= 4.3 || a.os("iOS") && a.version("iPhone") >= 3.1 || a.os("iOS") && a.version("iPod") >= 3.1 || a.version("Android") > 2.1 && a.is("Webkit") || a.version("Windows Phone OS") >= 7 || a.is("BlackBerry") && a.version("BlackBerry") >= 6 || a.match("Playbook.*Tablet") || a.version("webOS") >= 1.4 && a.match("Palm|Pre|Pixi") || a.match("hp.*TouchPad") || a.is("Firefox") && a.version("Firefox") >= 12 || a.is("Chrome") && a.is("AndroidOS") && a.version("Android") >= 4 || a.is("Skyfire") && a.version("Skyfire") >= 4.1 && a.is("AndroidOS") && a.version("Android") >= 2.3 || a.is("Opera") && a.version("Opera Mobi") > 11 && a.is("AndroidOS") || a.is("MeeGoOS") || a.is("Tizen") || a.is("Dolfin") && a.version("Bada") >= 2 || (a.is("UC Browser") || a.is("Dolfin")) && a.version("Android") >= 2.3 || a.match("Kindle Fire") || a.is("Kindle") && a.version("Kindle") >= 3 || a.is("AndroidOS") && a.is("NookTablet") || a.version("Chrome") >= 11 && !b || a.version("Safari") >= 5 && !b || a.version("Firefox") >= 4 && !b || a.version("MSIE") >= 7 && !b || a.version("Opera") >= 10 && !b ? "A" : a.os("iOS") && a.version("iPad") < 4.3 || a.os("iOS") && a.version("iPhone") < 3.1 || a.os("iOS") && a.version("iPod") < 3.1 || a.is("Blackberry") && a.version("BlackBerry") >= 5 && a.version("BlackBerry") < 6 || a.version("Opera Mini") >= 5 && a.version("Opera Mini") <= 6.5 && (a.version("Android") >= 2.3 || a.is("iOS")) || a.match("NokiaN8|NokiaC7|N97.*Series60|Symbian/3") || a.version("Opera Mobi") >= 11 && a.is("SymbianOS") ? "B" : (a.version("BlackBerry") < 5 || a.match("MSIEMobile|Windows CE.*Mobile") || a.version("Windows Mobile") <= 5.2, 
            "C");
        }, f.detectOS = function(a) {
            return f.findMatch(f.mobileDetectRules.oss0, a) || f.findMatch(f.mobileDetectRules.oss, a);
        }, f.getDeviceSmallerSide = function() {
            return window.screen.width < window.screen.height ? window.screen.width : window.screen.height;
        }, e.prototype = {
            constructor: e,
            mobile: function() {
                return f.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.mobile;
            },
            phone: function() {
                return f.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.phone;
            },
            tablet: function() {
                return f.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.tablet;
            },
            userAgent: function() {
                return this._cache.userAgent === b && (this._cache.userAgent = f.findMatch(f.mobileDetectRules.uas, this.ua)), 
                this._cache.userAgent;
            },
            userAgents: function() {
                return this._cache.userAgents === b && (this._cache.userAgents = f.findMatches(f.mobileDetectRules.uas, this.ua)), 
                this._cache.userAgents;
            },
            os: function() {
                return this._cache.os === b && (this._cache.os = f.detectOS(this.ua)), this._cache.os;
            },
            version: function(a) {
                return f.getVersion(a, this.ua);
            },
            versionStr: function(a) {
                return f.getVersionStr(a, this.ua);
            },
            is: function(b) {
                return c(this.userAgents(), b) || a(b, this.os()) || a(b, this.phone()) || a(b, this.tablet()) || c(f.findMatches(f.mobileDetectRules.utils, this.ua), b);
            },
            match: function(a) {
                return a instanceof RegExp || (a = new RegExp(a, "i")), a.test(this.ua);
            },
            isPhoneSized: function(a) {
                return e.isPhoneSized(a || this.maxPhoneWidth);
            },
            mobileGrade: function() {
                return this._cache.grade === b && (this._cache.grade = f.mobileGrade(this)), this._cache.grade;
            }
        }, "undefined" != typeof window && window.screen ? e.isPhoneSized = function(a) {
            return a < 0 ? b : f.getDeviceSmallerSide() <= a;
        } : e.isPhoneSized = function() {}, e._impl = f, e.version = "1.3.5 2016-11-14", 
        e;
    });
}(function(a) {
    if ("undefined" != typeof module && module.exports) return function(a) {
        module.exports = a();
    };
    if ("function" == typeof define && define.amd) return define;
    if ("undefined" != typeof window) return function(a) {
        window.MobileDetect = a();
    };
    throw new Error("unknown environment");
}()), function(a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a(); else if ("function" == typeof define && define.amd) define([], a); else {
        var b;
        b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, 
        b.jsyaml = a();
    }
}(function() {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j;
                }
                var k = c[g] = {
                    exports: {}
                };
                b[g][0].call(k.exports, function(a) {
                    var c = b[g][1][a];
                    return e(c ? c : a);
                }, k, k.exports, a, b, c, d);
            }
            return c[g].exports;
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e;
    }({
        1: [ function(a, b, c) {
            function d(a) {
                return function() {
                    throw new Error("Function " + a + " is deprecated and cannot be used.");
                };
            }
            var e = a("./js-yaml/loader"), f = a("./js-yaml/dumper");
            b.exports.Type = a("./js-yaml/type"), b.exports.Schema = a("./js-yaml/schema"), 
            b.exports.FAILSAFE_SCHEMA = a("./js-yaml/schema/failsafe"), b.exports.JSON_SCHEMA = a("./js-yaml/schema/json"), 
            b.exports.CORE_SCHEMA = a("./js-yaml/schema/core"), b.exports.DEFAULT_SAFE_SCHEMA = a("./js-yaml/schema/default_safe"), 
            b.exports.DEFAULT_FULL_SCHEMA = a("./js-yaml/schema/default_full"), b.exports.load = e.load, 
            b.exports.loadAll = e.loadAll, b.exports.safeLoad = e.safeLoad, b.exports.safeLoadAll = e.safeLoadAll, 
            b.exports.dump = f.dump, b.exports.safeDump = f.safeDump, b.exports.YAMLException = a("./js-yaml/exception"), 
            b.exports.MINIMAL_SCHEMA = a("./js-yaml/schema/failsafe"), b.exports.SAFE_SCHEMA = a("./js-yaml/schema/default_safe"), 
            b.exports.DEFAULT_SCHEMA = a("./js-yaml/schema/default_full"), b.exports.scan = d("scan"), 
            b.exports.parse = d("parse"), b.exports.compose = d("compose"), b.exports.addConstructor = d("addConstructor");
        }, {
            "./js-yaml/dumper": 3,
            "./js-yaml/exception": 4,
            "./js-yaml/loader": 5,
            "./js-yaml/schema": 7,
            "./js-yaml/schema/core": 8,
            "./js-yaml/schema/default_full": 9,
            "./js-yaml/schema/default_safe": 10,
            "./js-yaml/schema/failsafe": 11,
            "./js-yaml/schema/json": 12,
            "./js-yaml/type": 13
        } ],
        2: [ function(a, b, c) {
            function d(a) {
                return "undefined" == typeof a || null === a;
            }
            function e(a) {
                return "object" == typeof a && null !== a;
            }
            function f(a) {
                return Array.isArray(a) ? a : d(a) ? [] : [ a ];
            }
            function g(a, b) {
                var c, d, e, f;
                if (b) for (f = Object.keys(b), c = 0, d = f.length; c < d; c += 1) e = f[c], a[e] = b[e];
                return a;
            }
            function h(a, b) {
                var c, d = "";
                for (c = 0; c < b; c += 1) d += a;
                return d;
            }
            function i(a) {
                return 0 === a && Number.NEGATIVE_INFINITY === 1 / a;
            }
            b.exports.isNothing = d, b.exports.isObject = e, b.exports.toArray = f, b.exports.repeat = h, 
            b.exports.isNegativeZero = i, b.exports.extend = g;
        }, {} ],
        3: [ function(a, b, c) {
            function d(a, b) {
                var c, d, e, f, g, h, i;
                if (null === b) return {};
                for (c = {}, d = Object.keys(b), e = 0, f = d.length; e < f; e += 1) g = d[e], h = String(b[g]), 
                "!!" === g.slice(0, 2) && (g = "tag:yaml.org,2002:" + g.slice(2)), i = a.compiledTypeMap[g], 
                i && J.call(i.styleAliases, h) && (h = i.styleAliases[h]), c[g] = h;
                return c;
            }
            function e(a) {
                var b, c, d;
                if (b = a.toString(16).toUpperCase(), a <= 255) c = "x", d = 2; else if (a <= 65535) c = "u", 
                d = 4; else {
                    if (!(a <= 4294967295)) throw new F("code point within a string may not be greater than 0xFFFFFFFF");
                    c = "U", d = 8;
                }
                return "\\" + c + E.repeat("0", d - b.length) + b;
            }
            function f(a) {
                this.schema = a.schema || G, this.indent = Math.max(1, a.indent || 2), this.skipInvalid = a.skipInvalid || !1, 
                this.flowLevel = E.isNothing(a.flowLevel) ? -1 : a.flowLevel, this.styleMap = d(this.schema, a.styles || null), 
                this.sortKeys = a.sortKeys || !1, this.lineWidth = a.lineWidth || 80, this.noRefs = a.noRefs || !1, 
                this.noCompatMode = a.noCompatMode || !1, this.implicitTypes = this.schema.compiledImplicit, 
                this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", 
                this.duplicates = [], this.usedDuplicates = null;
            }
            function g(a, b) {
                for (var c, d = E.repeat(" ", b), e = 0, f = -1, g = "", h = a.length; e < h; ) f = a.indexOf("\n", e), 
                f === -1 ? (c = a.slice(e), e = h) : (c = a.slice(e, f + 1), e = f + 1), c.length && "\n" !== c && (g += d), 
                g += c;
                return g;
            }
            function h(a, b) {
                return "\n" + E.repeat(" ", a.indent * b);
            }
            function i(a, b) {
                var c, d, e;
                for (c = 0, d = a.implicitTypes.length; c < d; c += 1) if (e = a.implicitTypes[c], 
                e.resolve(b)) return !0;
                return !1;
            }
            function j(a) {
                return a === M || a === K;
            }
            function k(a) {
                return 32 <= a && a <= 126 || 161 <= a && a <= 55295 && 8232 !== a && 8233 !== a || 57344 <= a && a <= 65533 && 65279 !== a || 65536 <= a && a <= 1114111;
            }
            function l(a) {
                return k(a) && 65279 !== a && a !== U && a !== $ && a !== _ && a !== ba && a !== da && a !== W && a !== P;
            }
            function m(a) {
                return k(a) && 65279 !== a && !j(a) && a !== V && a !== Y && a !== W && a !== U && a !== $ && a !== _ && a !== ba && a !== da && a !== P && a !== R && a !== T && a !== N && a !== ca && a !== X && a !== S && a !== O && a !== Q && a !== Z && a !== aa;
            }
            function n(a, b, c, d, e) {
                var f, g, h = !1, i = !1, n = d !== -1, o = -1, p = m(a.charCodeAt(0)) && !j(a.charCodeAt(a.length - 1));
                if (b) for (f = 0; f < a.length; f++) {
                    if (g = a.charCodeAt(f), !k(g)) return ka;
                    p = p && l(g);
                } else {
                    for (f = 0; f < a.length; f++) {
                        if (g = a.charCodeAt(f), g === L) h = !0, n && (i = i || f - o - 1 > d && " " !== a[o + 1], 
                        o = f); else if (!k(g)) return ka;
                        p = p && l(g);
                    }
                    i = i || n && f - o - 1 > d && " " !== a[o + 1];
                }
                return h || i ? " " === a[0] && c > 9 ? ka : i ? ja : ia : p && !e(a) ? ga : ha;
            }
            function o(a, b, c, d) {
                a.dump = function() {
                    function e(b) {
                        return i(a, b);
                    }
                    if (0 === b.length) return "''";
                    if (!a.noCompatMode && fa.indexOf(b) !== -1) return "'" + b + "'";
                    var f = a.indent * Math.max(1, c), h = a.lineWidth === -1 ? -1 : Math.max(Math.min(a.lineWidth, 40), a.lineWidth - f), j = d || a.flowLevel > -1 && c >= a.flowLevel;
                    switch (n(b, j, a.indent, h, e)) {
                      case ga:
                        return b;

                      case ha:
                        return "'" + b.replace(/'/g, "''") + "'";

                      case ia:
                        return "|" + p(b, a.indent) + q(g(b, f));

                      case ja:
                        return ">" + p(b, a.indent) + q(g(r(b, h), f));

                      case ka:
                        return '"' + t(b, h) + '"';

                      default:
                        throw new F("impossible error: invalid scalar style");
                    }
                }();
            }
            function p(a, b) {
                var c = " " === a[0] ? String(b) : "", d = "\n" === a[a.length - 1], e = d && ("\n" === a[a.length - 2] || "\n" === a), f = e ? "+" : d ? "" : "-";
                return c + f + "\n";
            }
            function q(a) {
                return "\n" === a[a.length - 1] ? a.slice(0, -1) : a;
            }
            function r(a, b) {
                for (var c, d, e = /(\n+)([^\n]*)/g, f = function() {
                    var c = a.indexOf("\n");
                    return c = c !== -1 ? c : a.length, e.lastIndex = c, s(a.slice(0, c), b);
                }(), g = "\n" === a[0] || " " === a[0]; d = e.exec(a); ) {
                    var h = d[1], i = d[2];
                    c = " " === i[0], f += h + (g || c || "" === i ? "" : "\n") + s(i, b), g = c;
                }
                return f;
            }
            function s(a, b) {
                if ("" === a || " " === a[0]) return a;
                for (var c, d, e = / [^ ]/g, f = 0, g = 0, h = 0, i = ""; c = e.exec(a); ) h = c.index, 
                h - f > b && (d = g > f ? g : h, i += "\n" + a.slice(f, d), f = d + 1), g = h;
                return i += "\n", i += a.length - f > b && g > f ? a.slice(f, g) + "\n" + a.slice(g + 1) : a.slice(f), 
                i.slice(1);
            }
            function t(a) {
                for (var b, c, d = "", f = 0; f < a.length; f++) b = a.charCodeAt(f), c = ea[b], 
                d += !c && k(b) ? a[f] : c || e(b);
                return d;
            }
            function u(a, b, c) {
                var d, e, f = "", g = a.tag;
                for (d = 0, e = c.length; d < e; d += 1) z(a, b, c[d], !1, !1) && (0 !== d && (f += ", "), 
                f += a.dump);
                a.tag = g, a.dump = "[" + f + "]";
            }
            function v(a, b, c, d) {
                var e, f, g = "", i = a.tag;
                for (e = 0, f = c.length; e < f; e += 1) z(a, b + 1, c[e], !0, !0) && (d && 0 === e || (g += h(a, b)), 
                g += "- " + a.dump);
                a.tag = i, a.dump = g || "[]";
            }
            function w(a, b, c) {
                var d, e, f, g, h, i = "", j = a.tag, k = Object.keys(c);
                for (d = 0, e = k.length; d < e; d += 1) h = "", 0 !== d && (h += ", "), f = k[d], 
                g = c[f], z(a, b, f, !1, !1) && (a.dump.length > 1024 && (h += "? "), h += a.dump + ": ", 
                z(a, b, g, !1, !1) && (h += a.dump, i += h));
                a.tag = j, a.dump = "{" + i + "}";
            }
            function x(a, b, c, d) {
                var e, f, g, i, j, k, l = "", m = a.tag, n = Object.keys(c);
                if (a.sortKeys === !0) n.sort(); else if ("function" == typeof a.sortKeys) n.sort(a.sortKeys); else if (a.sortKeys) throw new F("sortKeys must be a boolean or a function");
                for (e = 0, f = n.length; e < f; e += 1) k = "", d && 0 === e || (k += h(a, b)), 
                g = n[e], i = c[g], z(a, b + 1, g, !0, !0, !0) && (j = null !== a.tag && "?" !== a.tag || a.dump && a.dump.length > 1024, 
                j && (k += a.dump && L === a.dump.charCodeAt(0) ? "?" : "? "), k += a.dump, j && (k += h(a, b)), 
                z(a, b + 1, i, !0, j) && (k += a.dump && L === a.dump.charCodeAt(0) ? ":" : ": ", 
                k += a.dump, l += k));
                a.tag = m, a.dump = l || "{}";
            }
            function y(a, b, c) {
                var d, e, f, g, h, i;
                for (e = c ? a.explicitTypes : a.implicitTypes, f = 0, g = e.length; f < g; f += 1) if (h = e[f], 
                (h.instanceOf || h.predicate) && (!h.instanceOf || "object" == typeof b && b instanceof h.instanceOf) && (!h.predicate || h.predicate(b))) {
                    if (a.tag = c ? h.tag : "?", h.represent) {
                        if (i = a.styleMap[h.tag] || h.defaultStyle, "[object Function]" === I.call(h.represent)) d = h.represent(b, i); else {
                            if (!J.call(h.represent, i)) throw new F("!<" + h.tag + '> tag resolver accepts not "' + i + '" style');
                            d = h.represent[i](b, i);
                        }
                        a.dump = d;
                    }
                    return !0;
                }
                return !1;
            }
            function z(a, b, c, d, e, f) {
                a.tag = null, a.dump = c, y(a, c, !1) || y(a, c, !0);
                var g = I.call(a.dump);
                d && (d = a.flowLevel < 0 || a.flowLevel > b);
                var h, i, j = "[object Object]" === g || "[object Array]" === g;
                if (j && (h = a.duplicates.indexOf(c), i = h !== -1), (null !== a.tag && "?" !== a.tag || i || 2 !== a.indent && b > 0) && (e = !1), 
                i && a.usedDuplicates[h]) a.dump = "*ref_" + h; else {
                    if (j && i && !a.usedDuplicates[h] && (a.usedDuplicates[h] = !0), "[object Object]" === g) d && 0 !== Object.keys(a.dump).length ? (x(a, b, a.dump, e), 
                    i && (a.dump = "&ref_" + h + a.dump)) : (w(a, b, a.dump), i && (a.dump = "&ref_" + h + " " + a.dump)); else if ("[object Array]" === g) d && 0 !== a.dump.length ? (v(a, b, a.dump, e), 
                    i && (a.dump = "&ref_" + h + a.dump)) : (u(a, b, a.dump), i && (a.dump = "&ref_" + h + " " + a.dump)); else {
                        if ("[object String]" !== g) {
                            if (a.skipInvalid) return !1;
                            throw new F("unacceptable kind of an object to dump " + g);
                        }
                        "?" !== a.tag && o(a, a.dump, b, f);
                    }
                    null !== a.tag && "?" !== a.tag && (a.dump = "!<" + a.tag + "> " + a.dump);
                }
                return !0;
            }
            function A(a, b) {
                var c, d, e = [], f = [];
                for (B(a, e, f), c = 0, d = f.length; c < d; c += 1) b.duplicates.push(e[f[c]]);
                b.usedDuplicates = new Array(d);
            }
            function B(a, b, c) {
                var d, e, f;
                if (null !== a && "object" == typeof a) if (e = b.indexOf(a), e !== -1) c.indexOf(e) === -1 && c.push(e); else if (b.push(a), 
                Array.isArray(a)) for (e = 0, f = a.length; e < f; e += 1) B(a[e], b, c); else for (d = Object.keys(a), 
                e = 0, f = d.length; e < f; e += 1) B(a[d[e]], b, c);
            }
            function C(a, b) {
                b = b || {};
                var c = new f(b);
                return c.noRefs || A(a, c), z(c, 0, a, !0, !0) ? c.dump + "\n" : "";
            }
            function D(a, b) {
                return C(a, E.extend({
                    schema: H
                }, b));
            }
            var E = a("./common"), F = a("./exception"), G = a("./schema/default_full"), H = a("./schema/default_safe"), I = Object.prototype.toString, J = Object.prototype.hasOwnProperty, K = 9, L = 10, M = 32, N = 33, O = 34, P = 35, Q = 37, R = 38, S = 39, T = 42, U = 44, V = 45, W = 58, X = 62, Y = 63, Z = 64, $ = 91, _ = 93, aa = 96, ba = 123, ca = 124, da = 125, ea = {};
            ea[0] = "\\0", ea[7] = "\\a", ea[8] = "\\b", ea[9] = "\\t", ea[10] = "\\n", ea[11] = "\\v", 
            ea[12] = "\\f", ea[13] = "\\r", ea[27] = "\\e", ea[34] = '\\"', ea[92] = "\\\\", 
            ea[133] = "\\N", ea[160] = "\\_", ea[8232] = "\\L", ea[8233] = "\\P";
            var fa = [ "y", "Y", "yes", "Yes", "YES", "on", "On", "ON", "n", "N", "no", "No", "NO", "off", "Off", "OFF" ], ga = 1, ha = 2, ia = 3, ja = 4, ka = 5;
            b.exports.dump = C, b.exports.safeDump = D;
        }, {
            "./common": 2,
            "./exception": 4,
            "./schema/default_full": 9,
            "./schema/default_safe": 10
        } ],
        4: [ function(a, b, c) {
            function d(a, b) {
                Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "", 
                this.name = "YAMLException", this.reason = a, this.mark = b, this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : "");
            }
            d.prototype = Object.create(Error.prototype), d.prototype.constructor = d, d.prototype.toString = function(a) {
                var b = this.name + ": ";
                return b += this.reason || "(unknown reason)", !a && this.mark && (b += " " + this.mark.toString()), 
                b;
            }, b.exports = d;
        }, {} ],
        5: [ function(a, b, c) {
            function d(a) {
                return 10 === a || 13 === a;
            }
            function e(a) {
                return 9 === a || 32 === a;
            }
            function f(a) {
                return 9 === a || 32 === a || 10 === a || 13 === a;
            }
            function g(a) {
                return 44 === a || 91 === a || 93 === a || 123 === a || 125 === a;
            }
            function h(a) {
                var b;
                return 48 <= a && a <= 57 ? a - 48 : (b = 32 | a, 97 <= b && b <= 102 ? b - 97 + 10 : -1);
            }
            function i(a) {
                return 120 === a ? 2 : 117 === a ? 4 : 85 === a ? 8 : 0;
            }
            function j(a) {
                return 48 <= a && a <= 57 ? a - 48 : -1;
            }
            function k(a) {
                return 48 === a ? "\0" : 97 === a ? "" : 98 === a ? "\b" : 116 === a ? "\t" : 9 === a ? "\t" : 110 === a ? "\n" : 118 === a ? "\x0B" : 102 === a ? "\f" : 114 === a ? "\r" : 101 === a ? "" : 32 === a ? " " : 34 === a ? '"' : 47 === a ? "/" : 92 === a ? "\\" : 78 === a ? "" : 95 === a ? " " : 76 === a ? "\u2028" : 80 === a ? "\u2029" : "";
            }
            function l(a) {
                return a <= 65535 ? String.fromCharCode(a) : String.fromCharCode((a - 65536 >> 10) + 55296, (a - 65536 & 1023) + 56320);
            }
            function m(a, b) {
                this.input = a, this.filename = b.filename || null, this.schema = b.schema || S, 
                this.onWarning = b.onWarning || null, this.legacy = b.legacy || !1, this.json = b.json || !1, 
                this.listener = b.listener || null, this.implicitTypes = this.schema.compiledImplicit, 
                this.typeMap = this.schema.compiledTypeMap, this.length = a.length, this.position = 0, 
                this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.documents = [];
            }
            function n(a, b) {
                return new P(b, new Q(a.filename, a.input, a.position, a.line, a.position - a.lineStart));
            }
            function o(a, b) {
                throw n(a, b);
            }
            function p(a, b) {
                a.onWarning && a.onWarning.call(null, n(a, b));
            }
            function q(a, b, c, d) {
                var e, f, g, h;
                if (b < c) {
                    if (h = a.input.slice(b, c), d) for (e = 0, f = h.length; e < f; e += 1) g = h.charCodeAt(e), 
                    9 === g || 32 <= g && g <= 1114111 || o(a, "expected valid JSON character"); else _.test(h) && o(a, "the stream contains non-printable characters");
                    a.result += h;
                }
            }
            function r(a, b, c, d) {
                var e, f, g, h;
                for (O.isObject(c) || o(a, "cannot merge mappings; the provided source object is unacceptable"), 
                e = Object.keys(c), g = 0, h = e.length; g < h; g += 1) f = e[g], T.call(b, f) || (b[f] = c[f], 
                d[f] = !0);
            }
            function s(a, b, c, d, e, f) {
                var g, h;
                if (e = String(e), null === b && (b = {}), "tag:yaml.org,2002:merge" === d) if (Array.isArray(f)) for (g = 0, 
                h = f.length; g < h; g += 1) r(a, b, f[g], c); else r(a, b, f, c); else a.json || T.call(c, e) || !T.call(b, e) || o(a, "duplicated mapping key"), 
                b[e] = f, delete c[e];
                return b;
            }
            function t(a) {
                var b;
                b = a.input.charCodeAt(a.position), 10 === b ? a.position++ : 13 === b ? (a.position++, 
                10 === a.input.charCodeAt(a.position) && a.position++) : o(a, "a line break is expected"), 
                a.line += 1, a.lineStart = a.position;
            }
            function u(a, b, c) {
                for (var f = 0, g = a.input.charCodeAt(a.position); 0 !== g; ) {
                    for (;e(g); ) g = a.input.charCodeAt(++a.position);
                    if (b && 35 === g) do g = a.input.charCodeAt(++a.position); while (10 !== g && 13 !== g && 0 !== g);
                    if (!d(g)) break;
                    for (t(a), g = a.input.charCodeAt(a.position), f++, a.lineIndent = 0; 32 === g; ) a.lineIndent++, 
                    g = a.input.charCodeAt(++a.position);
                }
                return c !== -1 && 0 !== f && a.lineIndent < c && p(a, "deficient indentation"), 
                f;
            }
            function v(a) {
                var b, c = a.position;
                return b = a.input.charCodeAt(c), !(45 !== b && 46 !== b || b !== a.input.charCodeAt(c + 1) || b !== a.input.charCodeAt(c + 2) || (c += 3, 
                b = a.input.charCodeAt(c), 0 !== b && !f(b)));
            }
            function w(a, b) {
                1 === b ? a.result += " " : b > 1 && (a.result += O.repeat("\n", b - 1));
            }
            function x(a, b, c) {
                var h, i, j, k, l, m, n, o, p, r = a.kind, s = a.result;
                if (p = a.input.charCodeAt(a.position), f(p) || g(p) || 35 === p || 38 === p || 42 === p || 33 === p || 124 === p || 62 === p || 39 === p || 34 === p || 37 === p || 64 === p || 96 === p) return !1;
                if ((63 === p || 45 === p) && (i = a.input.charCodeAt(a.position + 1), f(i) || c && g(i))) return !1;
                for (a.kind = "scalar", a.result = "", j = k = a.position, l = !1; 0 !== p; ) {
                    if (58 === p) {
                        if (i = a.input.charCodeAt(a.position + 1), f(i) || c && g(i)) break;
                    } else if (35 === p) {
                        if (h = a.input.charCodeAt(a.position - 1), f(h)) break;
                    } else {
                        if (a.position === a.lineStart && v(a) || c && g(p)) break;
                        if (d(p)) {
                            if (m = a.line, n = a.lineStart, o = a.lineIndent, u(a, !1, -1), a.lineIndent >= b) {
                                l = !0, p = a.input.charCodeAt(a.position);
                                continue;
                            }
                            a.position = k, a.line = m, a.lineStart = n, a.lineIndent = o;
                            break;
                        }
                    }
                    l && (q(a, j, k, !1), w(a, a.line - m), j = k = a.position, l = !1), e(p) || (k = a.position + 1), 
                    p = a.input.charCodeAt(++a.position);
                }
                return q(a, j, k, !1), !!a.result || (a.kind = r, a.result = s, !1);
            }
            function y(a, b) {
                var c, e, f;
                if (c = a.input.charCodeAt(a.position), 39 !== c) return !1;
                for (a.kind = "scalar", a.result = "", a.position++, e = f = a.position; 0 !== (c = a.input.charCodeAt(a.position)); ) if (39 === c) {
                    if (q(a, e, a.position, !0), c = a.input.charCodeAt(++a.position), 39 !== c) return !0;
                    e = f = a.position, a.position++;
                } else d(c) ? (q(a, e, f, !0), w(a, u(a, !1, b)), e = f = a.position) : a.position === a.lineStart && v(a) ? o(a, "unexpected end of the document within a single quoted scalar") : (a.position++, 
                f = a.position);
                o(a, "unexpected end of the stream within a single quoted scalar");
            }
            function z(a, b) {
                var c, e, f, g, j, k;
                if (k = a.input.charCodeAt(a.position), 34 !== k) return !1;
                for (a.kind = "scalar", a.result = "", a.position++, c = e = a.position; 0 !== (k = a.input.charCodeAt(a.position)); ) {
                    if (34 === k) return q(a, c, a.position, !0), a.position++, !0;
                    if (92 === k) {
                        if (q(a, c, a.position, !0), k = a.input.charCodeAt(++a.position), d(k)) u(a, !1, b); else if (k < 256 && ea[k]) a.result += fa[k], 
                        a.position++; else if ((j = i(k)) > 0) {
                            for (f = j, g = 0; f > 0; f--) k = a.input.charCodeAt(++a.position), (j = h(k)) >= 0 ? g = (g << 4) + j : o(a, "expected hexadecimal character");
                            a.result += l(g), a.position++;
                        } else o(a, "unknown escape sequence");
                        c = e = a.position;
                    } else d(k) ? (q(a, c, e, !0), w(a, u(a, !1, b)), c = e = a.position) : a.position === a.lineStart && v(a) ? o(a, "unexpected end of the document within a double quoted scalar") : (a.position++, 
                    e = a.position);
                }
                o(a, "unexpected end of the stream within a double quoted scalar");
            }
            function A(a, b) {
                var c, d, e, g, h, i, j, k, l, m, n, p = !0, q = a.tag, r = a.anchor, t = {};
                if (n = a.input.charCodeAt(a.position), 91 === n) g = 93, j = !1, d = []; else {
                    if (123 !== n) return !1;
                    g = 125, j = !0, d = {};
                }
                for (null !== a.anchor && (a.anchorMap[a.anchor] = d), n = a.input.charCodeAt(++a.position); 0 !== n; ) {
                    if (u(a, !0, b), n = a.input.charCodeAt(a.position), n === g) return a.position++, 
                    a.tag = q, a.anchor = r, a.kind = j ? "mapping" : "sequence", a.result = d, !0;
                    p || o(a, "missed comma between flow collection entries"), l = k = m = null, h = i = !1, 
                    63 === n && (e = a.input.charCodeAt(a.position + 1), f(e) && (h = i = !0, a.position++, 
                    u(a, !0, b))), c = a.line, H(a, b, U, !1, !0), l = a.tag, k = a.result, u(a, !0, b), 
                    n = a.input.charCodeAt(a.position), !i && a.line !== c || 58 !== n || (h = !0, n = a.input.charCodeAt(++a.position), 
                    u(a, !0, b), H(a, b, U, !1, !0), m = a.result), j ? s(a, d, t, l, k, m) : h ? d.push(s(a, null, t, l, k, m)) : d.push(k), 
                    u(a, !0, b), n = a.input.charCodeAt(a.position), 44 === n ? (p = !0, n = a.input.charCodeAt(++a.position)) : p = !1;
                }
                o(a, "unexpected end of the stream within a flow collection");
            }
            function B(a, b) {
                var c, f, g, h, i = Y, k = !1, l = !1, m = b, n = 0, p = !1;
                if (h = a.input.charCodeAt(a.position), 124 === h) f = !1; else {
                    if (62 !== h) return !1;
                    f = !0;
                }
                for (a.kind = "scalar", a.result = ""; 0 !== h; ) if (h = a.input.charCodeAt(++a.position), 
                43 === h || 45 === h) Y === i ? i = 43 === h ? $ : Z : o(a, "repeat of a chomping mode identifier"); else {
                    if (!((g = j(h)) >= 0)) break;
                    0 === g ? o(a, "bad explicit indentation width of a block scalar; it cannot be less than one") : l ? o(a, "repeat of an indentation width identifier") : (m = b + g - 1, 
                    l = !0);
                }
                if (e(h)) {
                    do h = a.input.charCodeAt(++a.position); while (e(h));
                    if (35 === h) do h = a.input.charCodeAt(++a.position); while (!d(h) && 0 !== h);
                }
                for (;0 !== h; ) {
                    for (t(a), a.lineIndent = 0, h = a.input.charCodeAt(a.position); (!l || a.lineIndent < m) && 32 === h; ) a.lineIndent++, 
                    h = a.input.charCodeAt(++a.position);
                    if (!l && a.lineIndent > m && (m = a.lineIndent), d(h)) n++; else {
                        if (a.lineIndent < m) {
                            i === $ ? a.result += O.repeat("\n", k ? 1 + n : n) : i === Y && k && (a.result += "\n");
                            break;
                        }
                        for (f ? e(h) ? (p = !0, a.result += O.repeat("\n", k ? 1 + n : n)) : p ? (p = !1, 
                        a.result += O.repeat("\n", n + 1)) : 0 === n ? k && (a.result += " ") : a.result += O.repeat("\n", n) : a.result += O.repeat("\n", k ? 1 + n : n), 
                        k = !0, l = !0, n = 0, c = a.position; !d(h) && 0 !== h; ) h = a.input.charCodeAt(++a.position);
                        q(a, c, a.position, !1);
                    }
                }
                return !0;
            }
            function C(a, b) {
                var c, d, e, g = a.tag, h = a.anchor, i = [], j = !1;
                for (null !== a.anchor && (a.anchorMap[a.anchor] = i), e = a.input.charCodeAt(a.position); 0 !== e && 45 === e && (d = a.input.charCodeAt(a.position + 1), 
                f(d)); ) if (j = !0, a.position++, u(a, !0, -1) && a.lineIndent <= b) i.push(null), 
                e = a.input.charCodeAt(a.position); else if (c = a.line, H(a, b, W, !1, !0), i.push(a.result), 
                u(a, !0, -1), e = a.input.charCodeAt(a.position), (a.line === c || a.lineIndent > b) && 0 !== e) o(a, "bad indentation of a sequence entry"); else if (a.lineIndent < b) break;
                return !!j && (a.tag = g, a.anchor = h, a.kind = "sequence", a.result = i, !0);
            }
            function D(a, b, c) {
                var d, g, h, i, j = a.tag, k = a.anchor, l = {}, m = {}, n = null, p = null, q = null, r = !1, t = !1;
                for (null !== a.anchor && (a.anchorMap[a.anchor] = l), i = a.input.charCodeAt(a.position); 0 !== i; ) {
                    if (d = a.input.charCodeAt(a.position + 1), h = a.line, 63 !== i && 58 !== i || !f(d)) {
                        if (!H(a, c, V, !1, !0)) break;
                        if (a.line === h) {
                            for (i = a.input.charCodeAt(a.position); e(i); ) i = a.input.charCodeAt(++a.position);
                            if (58 === i) i = a.input.charCodeAt(++a.position), f(i) || o(a, "a whitespace character is expected after the key-value separator within a block mapping"), 
                            r && (s(a, l, m, n, p, null), n = p = q = null), t = !0, r = !1, g = !1, n = a.tag, 
                            p = a.result; else {
                                if (!t) return a.tag = j, a.anchor = k, !0;
                                o(a, "can not read an implicit mapping pair; a colon is missed");
                            }
                        } else {
                            if (!t) return a.tag = j, a.anchor = k, !0;
                            o(a, "can not read a block mapping entry; a multiline key may not be an implicit key");
                        }
                    } else 63 === i ? (r && (s(a, l, m, n, p, null), n = p = q = null), t = !0, r = !0, 
                    g = !0) : r ? (r = !1, g = !0) : o(a, "incomplete explicit mapping pair; a key node is missed"), 
                    a.position += 1, i = d;
                    if ((a.line === h || a.lineIndent > b) && (H(a, b, X, !0, g) && (r ? p = a.result : q = a.result), 
                    r || (s(a, l, m, n, p, q), n = p = q = null), u(a, !0, -1), i = a.input.charCodeAt(a.position)), 
                    a.lineIndent > b && 0 !== i) o(a, "bad indentation of a mapping entry"); else if (a.lineIndent < b) break;
                }
                return r && s(a, l, m, n, p, null), t && (a.tag = j, a.anchor = k, a.kind = "mapping", 
                a.result = l), t;
            }
            function E(a) {
                var b, c, d, e, g = !1, h = !1;
                if (e = a.input.charCodeAt(a.position), 33 !== e) return !1;
                if (null !== a.tag && o(a, "duplication of a tag property"), e = a.input.charCodeAt(++a.position), 
                60 === e ? (g = !0, e = a.input.charCodeAt(++a.position)) : 33 === e ? (h = !0, 
                c = "!!", e = a.input.charCodeAt(++a.position)) : c = "!", b = a.position, g) {
                    do e = a.input.charCodeAt(++a.position); while (0 !== e && 62 !== e);
                    a.position < a.length ? (d = a.input.slice(b, a.position), e = a.input.charCodeAt(++a.position)) : o(a, "unexpected end of the stream within a verbatim tag");
                } else {
                    for (;0 !== e && !f(e); ) 33 === e && (h ? o(a, "tag suffix cannot contain exclamation marks") : (c = a.input.slice(b - 1, a.position + 1), 
                    ca.test(c) || o(a, "named tag handle cannot contain such characters"), h = !0, b = a.position + 1)), 
                    e = a.input.charCodeAt(++a.position);
                    d = a.input.slice(b, a.position), ba.test(d) && o(a, "tag suffix cannot contain flow indicator characters");
                }
                return d && !da.test(d) && o(a, "tag name cannot contain such characters: " + d), 
                g ? a.tag = d : T.call(a.tagMap, c) ? a.tag = a.tagMap[c] + d : "!" === c ? a.tag = "!" + d : "!!" === c ? a.tag = "tag:yaml.org,2002:" + d : o(a, 'undeclared tag handle "' + c + '"'), 
                !0;
            }
            function F(a) {
                var b, c;
                if (c = a.input.charCodeAt(a.position), 38 !== c) return !1;
                for (null !== a.anchor && o(a, "duplication of an anchor property"), c = a.input.charCodeAt(++a.position), 
                b = a.position; 0 !== c && !f(c) && !g(c); ) c = a.input.charCodeAt(++a.position);
                return a.position === b && o(a, "name of an anchor node must contain at least one character"), 
                a.anchor = a.input.slice(b, a.position), !0;
            }
            function G(a) {
                var b, c, d;
                if (d = a.input.charCodeAt(a.position), 42 !== d) return !1;
                for (d = a.input.charCodeAt(++a.position), b = a.position; 0 !== d && !f(d) && !g(d); ) d = a.input.charCodeAt(++a.position);
                return a.position === b && o(a, "name of an alias node must contain at least one character"), 
                c = a.input.slice(b, a.position), a.anchorMap.hasOwnProperty(c) || o(a, 'unidentified alias "' + c + '"'), 
                a.result = a.anchorMap[c], u(a, !0, -1), !0;
            }
            function H(a, b, c, d, e) {
                var f, g, h, i, j, k, l, m, n = 1, p = !1, q = !1;
                if (null !== a.listener && a.listener("open", a), a.tag = null, a.anchor = null, 
                a.kind = null, a.result = null, f = g = h = X === c || W === c, d && u(a, !0, -1) && (p = !0, 
                a.lineIndent > b ? n = 1 : a.lineIndent === b ? n = 0 : a.lineIndent < b && (n = -1)), 
                1 === n) for (;E(a) || F(a); ) u(a, !0, -1) ? (p = !0, h = f, a.lineIndent > b ? n = 1 : a.lineIndent === b ? n = 0 : a.lineIndent < b && (n = -1)) : h = !1;
                if (h && (h = p || e), 1 !== n && X !== c || (l = U === c || V === c ? b : b + 1, 
                m = a.position - a.lineStart, 1 === n ? h && (C(a, m) || D(a, m, l)) || A(a, l) ? q = !0 : (g && B(a, l) || y(a, l) || z(a, l) ? q = !0 : G(a) ? (q = !0, 
                null === a.tag && null === a.anchor || o(a, "alias node should not have any properties")) : x(a, l, U === c) && (q = !0, 
                null === a.tag && (a.tag = "?")), null !== a.anchor && (a.anchorMap[a.anchor] = a.result)) : 0 === n && (q = h && C(a, m))), 
                null !== a.tag && "!" !== a.tag) if ("?" === a.tag) {
                    for (i = 0, j = a.implicitTypes.length; i < j; i += 1) if (k = a.implicitTypes[i], 
                    k.resolve(a.result)) {
                        a.result = k.construct(a.result), a.tag = k.tag, null !== a.anchor && (a.anchorMap[a.anchor] = a.result);
                        break;
                    }
                } else T.call(a.typeMap, a.tag) ? (k = a.typeMap[a.tag], null !== a.result && k.kind !== a.kind && o(a, "unacceptable node kind for !<" + a.tag + '> tag; it should be "' + k.kind + '", not "' + a.kind + '"'), 
                k.resolve(a.result) ? (a.result = k.construct(a.result), null !== a.anchor && (a.anchorMap[a.anchor] = a.result)) : o(a, "cannot resolve a node with !<" + a.tag + "> explicit tag")) : o(a, "unknown tag !<" + a.tag + ">");
                return null !== a.listener && a.listener("close", a), null !== a.tag || null !== a.anchor || q;
            }
            function I(a) {
                var b, c, g, h, i = a.position, j = !1;
                for (a.version = null, a.checkLineBreaks = a.legacy, a.tagMap = {}, a.anchorMap = {}; 0 !== (h = a.input.charCodeAt(a.position)) && (u(a, !0, -1), 
                h = a.input.charCodeAt(a.position), !(a.lineIndent > 0 || 37 !== h)); ) {
                    for (j = !0, h = a.input.charCodeAt(++a.position), b = a.position; 0 !== h && !f(h); ) h = a.input.charCodeAt(++a.position);
                    for (c = a.input.slice(b, a.position), g = [], c.length < 1 && o(a, "directive name must not be less than one character in length"); 0 !== h; ) {
                        for (;e(h); ) h = a.input.charCodeAt(++a.position);
                        if (35 === h) {
                            do h = a.input.charCodeAt(++a.position); while (0 !== h && !d(h));
                            break;
                        }
                        if (d(h)) break;
                        for (b = a.position; 0 !== h && !f(h); ) h = a.input.charCodeAt(++a.position);
                        g.push(a.input.slice(b, a.position));
                    }
                    0 !== h && t(a), T.call(ha, c) ? ha[c](a, c, g) : p(a, 'unknown document directive "' + c + '"');
                }
                return u(a, !0, -1), 0 === a.lineIndent && 45 === a.input.charCodeAt(a.position) && 45 === a.input.charCodeAt(a.position + 1) && 45 === a.input.charCodeAt(a.position + 2) ? (a.position += 3, 
                u(a, !0, -1)) : j && o(a, "directives end mark is expected"), H(a, a.lineIndent - 1, X, !1, !0), 
                u(a, !0, -1), a.checkLineBreaks && aa.test(a.input.slice(i, a.position)) && p(a, "non-ASCII line breaks are interpreted as content"), 
                a.documents.push(a.result), a.position === a.lineStart && v(a) ? void (46 === a.input.charCodeAt(a.position) && (a.position += 3, 
                u(a, !0, -1))) : void (a.position < a.length - 1 && o(a, "end of the stream or a document separator is expected"));
            }
            function J(a, b) {
                a = String(a), b = b || {}, 0 !== a.length && (10 !== a.charCodeAt(a.length - 1) && 13 !== a.charCodeAt(a.length - 1) && (a += "\n"), 
                65279 === a.charCodeAt(0) && (a = a.slice(1)));
                var c = new m(a, b);
                for (c.input += "\0"; 32 === c.input.charCodeAt(c.position); ) c.lineIndent += 1, 
                c.position += 1;
                for (;c.position < c.length - 1; ) I(c);
                return c.documents;
            }
            function K(a, b, c) {
                var d, e, f = J(a, c);
                for (d = 0, e = f.length; d < e; d += 1) b(f[d]);
            }
            function L(a, b) {
                var c = J(a, b);
                if (0 !== c.length) {
                    if (1 === c.length) return c[0];
                    throw new P("expected a single document in the stream, but found more");
                }
            }
            function M(a, b, c) {
                K(a, b, O.extend({
                    schema: R
                }, c));
            }
            function N(a, b) {
                return L(a, O.extend({
                    schema: R
                }, b));
            }
            for (var O = a("./common"), P = a("./exception"), Q = a("./mark"), R = a("./schema/default_safe"), S = a("./schema/default_full"), T = Object.prototype.hasOwnProperty, U = 1, V = 2, W = 3, X = 4, Y = 1, Z = 2, $ = 3, _ = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, aa = /[\x85\u2028\u2029]/, ba = /[,\[\]\{\}]/, ca = /^(?:!|!!|![a-z\-]+!)$/i, da = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i, ea = new Array(256), fa = new Array(256), ga = 0; ga < 256; ga++) ea[ga] = k(ga) ? 1 : 0, 
            fa[ga] = k(ga);
            var ha = {
                YAML: function(a, b, c) {
                    var d, e, f;
                    null !== a.version && o(a, "duplication of %YAML directive"), 1 !== c.length && o(a, "YAML directive accepts exactly one argument"), 
                    d = /^([0-9]+)\.([0-9]+)$/.exec(c[0]), null === d && o(a, "ill-formed argument of the YAML directive"), 
                    e = parseInt(d[1], 10), f = parseInt(d[2], 10), 1 !== e && o(a, "unacceptable YAML version of the document"), 
                    a.version = c[0], a.checkLineBreaks = f < 2, 1 !== f && 2 !== f && p(a, "unsupported YAML version of the document");
                },
                TAG: function(a, b, c) {
                    var d, e;
                    2 !== c.length && o(a, "TAG directive accepts exactly two arguments"), d = c[0], 
                    e = c[1], ca.test(d) || o(a, "ill-formed tag handle (first argument) of the TAG directive"), 
                    T.call(a.tagMap, d) && o(a, 'there is a previously declared suffix for "' + d + '" tag handle'), 
                    da.test(e) || o(a, "ill-formed tag prefix (second argument) of the TAG directive"), 
                    a.tagMap[d] = e;
                }
            };
            b.exports.loadAll = K, b.exports.load = L, b.exports.safeLoadAll = M, b.exports.safeLoad = N;
        }, {
            "./common": 2,
            "./exception": 4,
            "./mark": 6,
            "./schema/default_full": 9,
            "./schema/default_safe": 10
        } ],
        6: [ function(a, b, c) {
            function d(a, b, c, d, e) {
                this.name = a, this.buffer = b, this.position = c, this.line = d, this.column = e;
            }
            var e = a("./common");
            d.prototype.getSnippet = function(a, b) {
                var c, d, f, g, h;
                if (!this.buffer) return null;
                for (a = a || 4, b = b || 75, c = "", d = this.position; d > 0 && "\0\r\n\u2028\u2029".indexOf(this.buffer.charAt(d - 1)) === -1; ) if (d -= 1, 
                this.position - d > b / 2 - 1) {
                    c = " ... ", d += 5;
                    break;
                }
                for (f = "", g = this.position; g < this.buffer.length && "\0\r\n\u2028\u2029".indexOf(this.buffer.charAt(g)) === -1; ) if (g += 1, 
                g - this.position > b / 2 - 1) {
                    f = " ... ", g -= 5;
                    break;
                }
                return h = this.buffer.slice(d, g), e.repeat(" ", a) + c + h + f + "\n" + e.repeat(" ", a + this.position - d + c.length) + "^";
            }, d.prototype.toString = function(a) {
                var b, c = "";
                return this.name && (c += 'in "' + this.name + '" '), c += "at line " + (this.line + 1) + ", column " + (this.column + 1), 
                a || (b = this.getSnippet(), b && (c += ":\n" + b)), c;
            }, b.exports = d;
        }, {
            "./common": 2
        } ],
        7: [ function(a, b, c) {
            function d(a, b, c) {
                var e = [];
                return a.include.forEach(function(a) {
                    c = d(a, b, c);
                }), a[b].forEach(function(a) {
                    c.forEach(function(b, c) {
                        b.tag === a.tag && e.push(c);
                    }), c.push(a);
                }), c.filter(function(a, b) {
                    return e.indexOf(b) === -1;
                });
            }
            function e() {
                function a(a) {
                    d[a.tag] = a;
                }
                var b, c, d = {};
                for (b = 0, c = arguments.length; b < c; b += 1) arguments[b].forEach(a);
                return d;
            }
            function f(a) {
                this.include = a.include || [], this.implicit = a.implicit || [], this.explicit = a.explicit || [], 
                this.implicit.forEach(function(a) {
                    if (a.loadKind && "scalar" !== a.loadKind) throw new h("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
                }), this.compiledImplicit = d(this, "implicit", []), this.compiledExplicit = d(this, "explicit", []), 
                this.compiledTypeMap = e(this.compiledImplicit, this.compiledExplicit);
            }
            var g = a("./common"), h = a("./exception"), i = a("./type");
            f.DEFAULT = null, f.create = function() {
                var a, b;
                switch (arguments.length) {
                  case 1:
                    a = f.DEFAULT, b = arguments[0];
                    break;

                  case 2:
                    a = arguments[0], b = arguments[1];
                    break;

                  default:
                    throw new h("Wrong number of arguments for Schema.create function");
                }
                if (a = g.toArray(a), b = g.toArray(b), !a.every(function(a) {
                    return a instanceof f;
                })) throw new h("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
                if (!b.every(function(a) {
                    return a instanceof i;
                })) throw new h("Specified list of YAML types (or a single Type object) contains a non-Type object.");
                return new f({
                    include: a,
                    explicit: b
                });
            }, b.exports = f;
        }, {
            "./common": 2,
            "./exception": 4,
            "./type": 13
        } ],
        8: [ function(a, b, c) {
            var d = a("../schema");
            b.exports = new d({
                include: [ a("./json") ]
            });
        }, {
            "../schema": 7,
            "./json": 12
        } ],
        9: [ function(a, b, c) {
            var d = a("../schema");
            b.exports = d.DEFAULT = new d({
                include: [ a("./default_safe") ],
                explicit: [ a("../type/js/undefined"), a("../type/js/regexp"), a("../type/js/function") ]
            });
        }, {
            "../schema": 7,
            "../type/js/function": 18,
            "../type/js/regexp": 19,
            "../type/js/undefined": 20,
            "./default_safe": 10
        } ],
        10: [ function(a, b, c) {
            var d = a("../schema");
            b.exports = new d({
                include: [ a("./core") ],
                implicit: [ a("../type/timestamp"), a("../type/merge") ],
                explicit: [ a("../type/binary"), a("../type/omap"), a("../type/pairs"), a("../type/set") ]
            });
        }, {
            "../schema": 7,
            "../type/binary": 14,
            "../type/merge": 22,
            "../type/omap": 24,
            "../type/pairs": 25,
            "../type/set": 27,
            "../type/timestamp": 29,
            "./core": 8
        } ],
        11: [ function(a, b, c) {
            var d = a("../schema");
            b.exports = new d({
                explicit: [ a("../type/str"), a("../type/seq"), a("../type/map") ]
            });
        }, {
            "../schema": 7,
            "../type/map": 21,
            "../type/seq": 26,
            "../type/str": 28
        } ],
        12: [ function(a, b, c) {
            var d = a("../schema");
            b.exports = new d({
                include: [ a("./failsafe") ],
                implicit: [ a("../type/null"), a("../type/bool"), a("../type/int"), a("../type/float") ]
            });
        }, {
            "../schema": 7,
            "../type/bool": 15,
            "../type/float": 16,
            "../type/int": 17,
            "../type/null": 23,
            "./failsafe": 11
        } ],
        13: [ function(a, b, c) {
            function d(a) {
                var b = {};
                return null !== a && Object.keys(a).forEach(function(c) {
                    a[c].forEach(function(a) {
                        b[String(a)] = c;
                    });
                }), b;
            }
            function e(a, b) {
                if (b = b || {}, Object.keys(b).forEach(function(b) {
                    if (g.indexOf(b) === -1) throw new f('Unknown option "' + b + '" is met in definition of "' + a + '" YAML type.');
                }), this.tag = a, this.kind = b.kind || null, this.resolve = b.resolve || function() {
                    return !0;
                }, this.construct = b.construct || function(a) {
                    return a;
                }, this.instanceOf = b.instanceOf || null, this.predicate = b.predicate || null, 
                this.represent = b.represent || null, this.defaultStyle = b.defaultStyle || null, 
                this.styleAliases = d(b.styleAliases || null), h.indexOf(this.kind) === -1) throw new f('Unknown kind "' + this.kind + '" is specified for "' + a + '" YAML type.');
            }
            var f = a("./exception"), g = [ "kind", "resolve", "construct", "instanceOf", "predicate", "represent", "defaultStyle", "styleAliases" ], h = [ "scalar", "sequence", "mapping" ];
            b.exports = e;
        }, {
            "./exception": 4
        } ],
        14: [ function(a, b, c) {
            function d(a) {
                if (null === a) return !1;
                var b, c, d = 0, e = a.length, f = l;
                for (c = 0; c < e; c++) if (b = f.indexOf(a.charAt(c)), !(b > 64)) {
                    if (b < 0) return !1;
                    d += 6;
                }
                return d % 8 === 0;
            }
            function e(a) {
                var b, c, d = a.replace(/[\r\n=]/g, ""), e = d.length, f = l, g = 0, i = [];
                for (b = 0; b < e; b++) b % 4 === 0 && b && (i.push(g >> 16 & 255), i.push(g >> 8 & 255), 
                i.push(255 & g)), g = g << 6 | f.indexOf(d.charAt(b));
                return c = e % 4 * 6, 0 === c ? (i.push(g >> 16 & 255), i.push(g >> 8 & 255), i.push(255 & g)) : 18 === c ? (i.push(g >> 10 & 255), 
                i.push(g >> 2 & 255)) : 12 === c && i.push(g >> 4 & 255), h ? new h(i) : i;
            }
            function f(a) {
                var b, c, d = "", e = 0, f = a.length, g = l;
                for (b = 0; b < f; b++) b % 3 === 0 && b && (d += g[e >> 18 & 63], d += g[e >> 12 & 63], 
                d += g[e >> 6 & 63], d += g[63 & e]), e = (e << 8) + a[b];
                return c = f % 3, 0 === c ? (d += g[e >> 18 & 63], d += g[e >> 12 & 63], d += g[e >> 6 & 63], 
                d += g[63 & e]) : 2 === c ? (d += g[e >> 10 & 63], d += g[e >> 4 & 63], d += g[e << 2 & 63], 
                d += g[64]) : 1 === c && (d += g[e >> 2 & 63], d += g[e << 4 & 63], d += g[64], 
                d += g[64]), d;
            }
            function g(a) {
                return h && h.isBuffer(a);
            }
            var h;
            try {
                var i = a;
                h = i("buffer").Buffer;
            } catch (j) {}
            var k = a("../type"), l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
            b.exports = new k("tag:yaml.org,2002:binary", {
                kind: "scalar",
                resolve: d,
                construct: e,
                predicate: g,
                represent: f
            });
        }, {
            "../type": 13
        } ],
        15: [ function(a, b, c) {
            function d(a) {
                if (null === a) return !1;
                var b = a.length;
                return 4 === b && ("true" === a || "True" === a || "TRUE" === a) || 5 === b && ("false" === a || "False" === a || "FALSE" === a);
            }
            function e(a) {
                return "true" === a || "True" === a || "TRUE" === a;
            }
            function f(a) {
                return "[object Boolean]" === Object.prototype.toString.call(a);
            }
            var g = a("../type");
            b.exports = new g("tag:yaml.org,2002:bool", {
                kind: "scalar",
                resolve: d,
                construct: e,
                predicate: f,
                represent: {
                    lowercase: function(a) {
                        return a ? "true" : "false";
                    },
                    uppercase: function(a) {
                        return a ? "TRUE" : "FALSE";
                    },
                    camelcase: function(a) {
                        return a ? "True" : "False";
                    }
                },
                defaultStyle: "lowercase"
            });
        }, {
            "../type": 13
        } ],
        16: [ function(a, b, c) {
            function d(a) {
                return null !== a && !!j.test(a);
            }
            function e(a) {
                var b, c, d, e;
                return b = a.replace(/_/g, "").toLowerCase(), c = "-" === b[0] ? -1 : 1, e = [], 
                "+-".indexOf(b[0]) >= 0 && (b = b.slice(1)), ".inf" === b ? 1 === c ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : ".nan" === b ? NaN : b.indexOf(":") >= 0 ? (b.split(":").forEach(function(a) {
                    e.unshift(parseFloat(a, 10));
                }), b = 0, d = 1, e.forEach(function(a) {
                    b += a * d, d *= 60;
                }), c * b) : c * parseFloat(b, 10);
            }
            function f(a, b) {
                var c;
                if (isNaN(a)) switch (b) {
                  case "lowercase":
                    return ".nan";

                  case "uppercase":
                    return ".NAN";

                  case "camelcase":
                    return ".NaN";
                } else if (Number.POSITIVE_INFINITY === a) switch (b) {
                  case "lowercase":
                    return ".inf";

                  case "uppercase":
                    return ".INF";

                  case "camelcase":
                    return ".Inf";
                } else if (Number.NEGATIVE_INFINITY === a) switch (b) {
                  case "lowercase":
                    return "-.inf";

                  case "uppercase":
                    return "-.INF";

                  case "camelcase":
                    return "-.Inf";
                } else if (h.isNegativeZero(a)) return "-0.0";
                return c = a.toString(10), k.test(c) ? c.replace("e", ".e") : c;
            }
            function g(a) {
                return "[object Number]" === Object.prototype.toString.call(a) && (a % 1 !== 0 || h.isNegativeZero(a));
            }
            var h = a("../common"), i = a("../type"), j = new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)\\.[0-9_]*(?:[eE][-+][0-9]+)?|\\.[0-9_]+(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"), k = /^[-+]?[0-9]+e/;
            b.exports = new i("tag:yaml.org,2002:float", {
                kind: "scalar",
                resolve: d,
                construct: e,
                predicate: g,
                represent: f,
                defaultStyle: "lowercase"
            });
        }, {
            "../common": 2,
            "../type": 13
        } ],
        17: [ function(a, b, c) {
            function d(a) {
                return 48 <= a && a <= 57 || 65 <= a && a <= 70 || 97 <= a && a <= 102;
            }
            function e(a) {
                return 48 <= a && a <= 55;
            }
            function f(a) {
                return 48 <= a && a <= 57;
            }
            function g(a) {
                if (null === a) return !1;
                var b, c = a.length, g = 0, h = !1;
                if (!c) return !1;
                if (b = a[g], "-" !== b && "+" !== b || (b = a[++g]), "0" === b) {
                    if (g + 1 === c) return !0;
                    if (b = a[++g], "b" === b) {
                        for (g++; g < c; g++) if (b = a[g], "_" !== b) {
                            if ("0" !== b && "1" !== b) return !1;
                            h = !0;
                        }
                        return h;
                    }
                    if ("x" === b) {
                        for (g++; g < c; g++) if (b = a[g], "_" !== b) {
                            if (!d(a.charCodeAt(g))) return !1;
                            h = !0;
                        }
                        return h;
                    }
                    for (;g < c; g++) if (b = a[g], "_" !== b) {
                        if (!e(a.charCodeAt(g))) return !1;
                        h = !0;
                    }
                    return h;
                }
                for (;g < c; g++) if (b = a[g], "_" !== b) {
                    if (":" === b) break;
                    if (!f(a.charCodeAt(g))) return !1;
                    h = !0;
                }
                return !!h && (":" !== b || /^(:[0-5]?[0-9])+$/.test(a.slice(g)));
            }
            function h(a) {
                var b, c, d = a, e = 1, f = [];
                return d.indexOf("_") !== -1 && (d = d.replace(/_/g, "")), b = d[0], "-" !== b && "+" !== b || ("-" === b && (e = -1), 
                d = d.slice(1), b = d[0]), "0" === d ? 0 : "0" === b ? "b" === d[1] ? e * parseInt(d.slice(2), 2) : "x" === d[1] ? e * parseInt(d, 16) : e * parseInt(d, 8) : d.indexOf(":") !== -1 ? (d.split(":").forEach(function(a) {
                    f.unshift(parseInt(a, 10));
                }), d = 0, c = 1, f.forEach(function(a) {
                    d += a * c, c *= 60;
                }), e * d) : e * parseInt(d, 10);
            }
            function i(a) {
                return "[object Number]" === Object.prototype.toString.call(a) && a % 1 === 0 && !j.isNegativeZero(a);
            }
            var j = a("../common"), k = a("../type");
            b.exports = new k("tag:yaml.org,2002:int", {
                kind: "scalar",
                resolve: g,
                construct: h,
                predicate: i,
                represent: {
                    binary: function(a) {
                        return "0b" + a.toString(2);
                    },
                    octal: function(a) {
                        return "0" + a.toString(8);
                    },
                    decimal: function(a) {
                        return a.toString(10);
                    },
                    hexadecimal: function(a) {
                        return "0x" + a.toString(16).toUpperCase();
                    }
                },
                defaultStyle: "decimal",
                styleAliases: {
                    binary: [ 2, "bin" ],
                    octal: [ 8, "oct" ],
                    decimal: [ 10, "dec" ],
                    hexadecimal: [ 16, "hex" ]
                }
            });
        }, {
            "../common": 2,
            "../type": 13
        } ],
        18: [ function(a, b, c) {
            function d(a) {
                if (null === a) return !1;
                try {
                    var b = "(" + a + ")", c = h.parse(b, {
                        range: !0
                    });
                    return "Program" === c.type && 1 === c.body.length && "ExpressionStatement" === c.body[0].type && "FunctionExpression" === c.body[0].expression.type;
                } catch (d) {
                    return !1;
                }
            }
            function e(a) {
                var b, c = "(" + a + ")", d = h.parse(c, {
                    range: !0
                }), e = [];
                if ("Program" !== d.type || 1 !== d.body.length || "ExpressionStatement" !== d.body[0].type || "FunctionExpression" !== d.body[0].expression.type) throw new Error("Failed to resolve function");
                return d.body[0].expression.params.forEach(function(a) {
                    e.push(a.name);
                }), b = d.body[0].expression.body.range, new Function(e, c.slice(b[0] + 1, b[1] - 1));
            }
            function f(a) {
                return a.toString();
            }
            function g(a) {
                return "[object Function]" === Object.prototype.toString.call(a);
            }
            var h;
            try {
                var i = a;
                h = i("esprima");
            } catch (j) {
                "undefined" != typeof window && (h = window.esprima);
            }
            var k = a("../../type");
            b.exports = new k("tag:yaml.org,2002:js/function", {
                kind: "scalar",
                resolve: d,
                construct: e,
                predicate: g,
                represent: f
            });
        }, {
            "../../type": 13
        } ],
        19: [ function(a, b, c) {
            function d(a) {
                if (null === a) return !1;
                if (0 === a.length) return !1;
                var b = a, c = /\/([gim]*)$/.exec(a), d = "";
                if ("/" === b[0]) {
                    if (c && (d = c[1]), d.length > 3) return !1;
                    if ("/" !== b[b.length - d.length - 1]) return !1;
                }
                return !0;
            }
            function e(a) {
                var b = a, c = /\/([gim]*)$/.exec(a), d = "";
                return "/" === b[0] && (c && (d = c[1]), b = b.slice(1, b.length - d.length - 1)), 
                new RegExp(b, d);
            }
            function f(a) {
                var b = "/" + a.source + "/";
                return a.global && (b += "g"), a.multiline && (b += "m"), a.ignoreCase && (b += "i"), 
                b;
            }
            function g(a) {
                return "[object RegExp]" === Object.prototype.toString.call(a);
            }
            var h = a("../../type");
            b.exports = new h("tag:yaml.org,2002:js/regexp", {
                kind: "scalar",
                resolve: d,
                construct: e,
                predicate: g,
                represent: f
            });
        }, {
            "../../type": 13
        } ],
        20: [ function(a, b, c) {
            function d() {
                return !0;
            }
            function e() {}
            function f() {
                return "";
            }
            function g(a) {
                return "undefined" == typeof a;
            }
            var h = a("../../type");
            b.exports = new h("tag:yaml.org,2002:js/undefined", {
                kind: "scalar",
                resolve: d,
                construct: e,
                predicate: g,
                represent: f
            });
        }, {
            "../../type": 13
        } ],
        21: [ function(a, b, c) {
            var d = a("../type");
            b.exports = new d("tag:yaml.org,2002:map", {
                kind: "mapping",
                construct: function(a) {
                    return null !== a ? a : {};
                }
            });
        }, {
            "../type": 13
        } ],
        22: [ function(a, b, c) {
            function d(a) {
                return "<<" === a || null === a;
            }
            var e = a("../type");
            b.exports = new e("tag:yaml.org,2002:merge", {
                kind: "scalar",
                resolve: d
            });
        }, {
            "../type": 13
        } ],
        23: [ function(a, b, c) {
            function d(a) {
                if (null === a) return !0;
                var b = a.length;
                return 1 === b && "~" === a || 4 === b && ("null" === a || "Null" === a || "NULL" === a);
            }
            function e() {
                return null;
            }
            function f(a) {
                return null === a;
            }
            var g = a("../type");
            b.exports = new g("tag:yaml.org,2002:null", {
                kind: "scalar",
                resolve: d,
                construct: e,
                predicate: f,
                represent: {
                    canonical: function() {
                        return "~";
                    },
                    lowercase: function() {
                        return "null";
                    },
                    uppercase: function() {
                        return "NULL";
                    },
                    camelcase: function() {
                        return "Null";
                    }
                },
                defaultStyle: "lowercase"
            });
        }, {
            "../type": 13
        } ],
        24: [ function(a, b, c) {
            function d(a) {
                if (null === a) return !0;
                var b, c, d, e, f, i = [], j = a;
                for (b = 0, c = j.length; b < c; b += 1) {
                    if (d = j[b], f = !1, "[object Object]" !== h.call(d)) return !1;
                    for (e in d) if (g.call(d, e)) {
                        if (f) return !1;
                        f = !0;
                    }
                    if (!f) return !1;
                    if (i.indexOf(e) !== -1) return !1;
                    i.push(e);
                }
                return !0;
            }
            function e(a) {
                return null !== a ? a : [];
            }
            var f = a("../type"), g = Object.prototype.hasOwnProperty, h = Object.prototype.toString;
            b.exports = new f("tag:yaml.org,2002:omap", {
                kind: "sequence",
                resolve: d,
                construct: e
            });
        }, {
            "../type": 13
        } ],
        25: [ function(a, b, c) {
            function d(a) {
                if (null === a) return !0;
                var b, c, d, e, f, h = a;
                for (f = new Array(h.length), b = 0, c = h.length; b < c; b += 1) {
                    if (d = h[b], "[object Object]" !== g.call(d)) return !1;
                    if (e = Object.keys(d), 1 !== e.length) return !1;
                    f[b] = [ e[0], d[e[0]] ];
                }
                return !0;
            }
            function e(a) {
                if (null === a) return [];
                var b, c, d, e, f, g = a;
                for (f = new Array(g.length), b = 0, c = g.length; b < c; b += 1) d = g[b], e = Object.keys(d), 
                f[b] = [ e[0], d[e[0]] ];
                return f;
            }
            var f = a("../type"), g = Object.prototype.toString;
            b.exports = new f("tag:yaml.org,2002:pairs", {
                kind: "sequence",
                resolve: d,
                construct: e
            });
        }, {
            "../type": 13
        } ],
        26: [ function(a, b, c) {
            var d = a("../type");
            b.exports = new d("tag:yaml.org,2002:seq", {
                kind: "sequence",
                construct: function(a) {
                    return null !== a ? a : [];
                }
            });
        }, {
            "../type": 13
        } ],
        27: [ function(a, b, c) {
            function d(a) {
                if (null === a) return !0;
                var b, c = a;
                for (b in c) if (g.call(c, b) && null !== c[b]) return !1;
                return !0;
            }
            function e(a) {
                return null !== a ? a : {};
            }
            var f = a("../type"), g = Object.prototype.hasOwnProperty;
            b.exports = new f("tag:yaml.org,2002:set", {
                kind: "mapping",
                resolve: d,
                construct: e
            });
        }, {
            "../type": 13
        } ],
        28: [ function(a, b, c) {
            var d = a("../type");
            b.exports = new d("tag:yaml.org,2002:str", {
                kind: "scalar",
                construct: function(a) {
                    return null !== a ? a : "";
                }
            });
        }, {
            "../type": 13
        } ],
        29: [ function(a, b, c) {
            function d(a) {
                return null !== a && (null !== h.exec(a) || null !== i.exec(a));
            }
            function e(a) {
                var b, c, d, e, f, g, j, k, l, m, n = 0, o = null;
                if (b = h.exec(a), null === b && (b = i.exec(a)), null === b) throw new Error("Date resolve error");
                if (c = +b[1], d = +b[2] - 1, e = +b[3], !b[4]) return new Date(Date.UTC(c, d, e));
                if (f = +b[4], g = +b[5], j = +b[6], b[7]) {
                    for (n = b[7].slice(0, 3); n.length < 3; ) n += "0";
                    n = +n;
                }
                return b[9] && (k = +b[10], l = +(b[11] || 0), o = 6e4 * (60 * k + l), "-" === b[9] && (o = -o)), 
                m = new Date(Date.UTC(c, d, e, f, g, j, n)), o && m.setTime(m.getTime() - o), m;
            }
            function f(a) {
                return a.toISOString();
            }
            var g = a("../type"), h = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"), i = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
            b.exports = new g("tag:yaml.org,2002:timestamp", {
                kind: "scalar",
                resolve: d,
                construct: e,
                instanceOf: Date,
                represent: f
            });
        }, {
            "../type": 13
        } ],
        "/": [ function(a, b, c) {
            var d = a("./lib/js-yaml.js");
            b.exports = d;
        }, {
            "./lib/js-yaml.js": 1
        } ]
    }, {}, [])("/");
}), function(a, b, c) {
    function d(a) {
        var c = [];
        return i(c, b.noop).chars(a), c.join("");
    }
    function e(a, c) {
        var d, e = {}, f = a.split(",");
        for (d = 0; d < f.length; d++) e[c ? b.lowercase(f[d]) : f[d]] = !0;
        return e;
    }
    function f(a, c) {
        function d(a, d, f, h) {
            if (d = b.lowercase(d), w[d]) for (;s.last() && x[s.last()]; ) e("", s.last());
            v[d] && s.last() == d && e("", d), (h = u[d] || !!h) || s.push(d);
            var i = {};
            f.replace(m, function(a, b, c, d, e) {
                i[b] = g(c || d || e || "");
            }), c.start && c.start(d, i, h);
        }
        function e(a, d) {
            var e, f = 0;
            if (d = b.lowercase(d)) for (f = s.length - 1; 0 <= f && s[f] != d; f--) ;
            if (0 <= f) {
                for (e = s.length - 1; e >= f; e--) c.end && c.end(s[e]);
                s.length = f;
            }
        }
        "string" != typeof a && (a = null === a || "undefined" == typeof a ? "" : "" + a);
        var f, h, i, s = [], t = a;
        for (s.last = function() {
            return s[s.length - 1];
        }; a; ) {
            if (i = "", h = !0, s.last() && y[s.last()] ? (a = a.replace(new RegExp("([\\W\\w]*)<\\s*\\/\\s*" + s.last() + "[^>]*>", "i"), function(a, b) {
                return b = b.replace(p, "$1").replace(r, "$1"), c.chars && c.chars(g(b)), "";
            }), e("", s.last())) : (0 === a.indexOf("<!--") ? (f = a.indexOf("--", 4), 0 <= f && a.lastIndexOf("-->", f) === f && (c.comment && c.comment(a.substring(4, f)), 
            a = a.substring(f + 3), h = !1)) : q.test(a) ? (f = a.match(q)) && (a = a.replace(f[0], ""), 
            h = !1) : o.test(a) ? (f = a.match(l)) && (a = a.substring(f[0].length), f[0].replace(l, e), 
            h = !1) : n.test(a) && ((f = a.match(k)) ? (f[4] && (a = a.substring(f[0].length), 
            f[0].replace(k, d)), h = !1) : (i += "<", a = a.substring(1))), h && (f = a.indexOf("<"), 
            i += 0 > f ? a : a.substring(0, f), a = 0 > f ? "" : a.substring(f), c.chars && c.chars(g(i)))), 
            a == t) throw j("badparse", a);
            t = a;
        }
        e();
    }
    function g(a) {
        return a ? (C.innerHTML = a.replace(/</g, "&lt;"), C.textContent) : "";
    }
    function h(a) {
        return a.replace(/&/g, "&amp;").replace(s, function(a) {
            var b = a.charCodeAt(0);
            return a = a.charCodeAt(1), "&#" + (1024 * (b - 55296) + (a - 56320) + 65536) + ";";
        }).replace(t, function(a) {
            return "&#" + a.charCodeAt(0) + ";";
        }).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function i(a, c) {
        var d = !1, e = b.bind(a, a.push);
        return {
            start: function(a, f, g) {
                a = b.lowercase(a), !d && y[a] && (d = a), d || !0 !== z[a] || (e("<"), e(a), b.forEach(f, function(d, f) {
                    var g = b.lowercase(f), i = "img" === a && "src" === g || "background" === g;
                    !0 !== B[g] || !0 === A[g] && !c(d, i) || (e(" "), e(f), e('="'), e(h(d)), e('"'));
                }), e(g ? "/>" : ">"));
            },
            end: function(a) {
                a = b.lowercase(a), d || !0 !== z[a] || (e("</"), e(a), e(">")), a == d && (d = !1);
            },
            chars: function(a) {
                d || e(h(a));
            }
        };
    }
    var j = b.$$minErr("$sanitize"), k = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/, l = /^<\/\s*([\w:-]+)[^>]*>/, m = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, n = /^</, o = /^<\//, p = /\x3c!--(.*?)--\x3e/g, q = /<!DOCTYPE([^>]*?)>/i, r = /<!\[CDATA\[(.*?)]]\x3e/g, s = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, t = /([^\#-~| |!])/g, u = e("area,br,col,hr,img,wbr");
    a = e("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), c = e("rp,rt");
    var v = b.extend({}, c, a), w = b.extend({}, a, e("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")), x = b.extend({}, c, e("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var"));
    a = e("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan,use");
    var y = e("script,style"), z = b.extend({}, u, w, x, v, a), A = e("background,cite,href,longdesc,src,usemap,xlink:href");
    a = e("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"), 
    c = e("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan", !0);
    var B = b.extend({}, A, c, a), C = document.createElement("pre");
    b.module("ngSanitize", []).provider("$sanitize", function() {
        this.$get = [ "$$sanitizeUri", function(a) {
            return function(b) {
                var c = [];
                return f(b, i(c, function(b, c) {
                    return !/^unsafe/.test(a(b, c));
                })), c.join("");
            };
        } ];
    }), b.module("ngSanitize").filter("linky", [ "$sanitize", function(a) {
        var c = /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i, e = /^mailto:/i;
        return function(f, g) {
            function h(a) {
                a && n.push(d(a));
            }
            function i(a, c) {
                n.push("<a "), b.isDefined(g) && n.push('target="', g, '" '), n.push('href="', a.replace(/"/g, "&quot;"), '">'), 
                h(c), n.push("</a>");
            }
            if (!f) return f;
            for (var j, k, l, m = f, n = []; j = m.match(c); ) k = j[0], j[2] || j[4] || (k = (j[3] ? "http://" : "mailto:") + k), 
            l = j.index, h(m.substr(0, l)), i(k, j[0].replace(e, "")), m = m.substring(l + j[0].length);
            return h(m), a(n.join(""));
        };
    } ]);
}(window, window.angular);