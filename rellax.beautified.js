!function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof module && module.exports ? module.exports = t() : e.Rellax = t();
}(this, function() {
    var w = function(e, t) {
        "use strict";
        var x = Object.create(w.prototype), l = 0, b = 0, d = 0, T = 0, p = [], o = !0, n = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(e) {
            setTimeout(e, 1e3 / 60);
        }, c = window.transformProp || function() {
            var e = document.createElement("div");
            if (null === e.style.transform) {
                var t = [ "Webkit", "Moz", "ms" ];
                for (var o in t) if (void 0 !== e.style[t[o] + "Transform"]) return t[o] + "Transform";
            }
            return "transform";
        }();
        x.options = {
            speed: -2,
            center: !1,
            wrapper: null,
            round: !0,
            vertical: !0,
            horizontal: !1,
            callback: function() {}
        }, t && Object.keys(t).forEach(function(e) {
            x.options[e] = t[e];
        }), e || (e = ".rellax");
        var r = "string" == typeof e ? document.querySelectorAll(e) : [ e ];
        if (!(0 < r.length)) throw new Error("The elements you're trying to select don't exist.");
        if (x.elems = r, x.options.wrapper && !x.options.wrapper.nodeType) {
            var i = document.querySelector(x.options.wrapper);
            if (!i) throw new Error("The wrapper you're trying to use don't exist.");
            x.options.wrapper = i;
        }
        var s = function() {
            for (var e = 0; e < p.length; e++) x.elems[e].style.cssText = p[e].style;
            p = [], b = window.innerHeight, T = window.innerWidth, u(), function() {
                for (var e = 0; e < x.elems.length; e++) {
                    var t = a(x.elems[e]);
                    p.push(t);
                }
            }(), o && (window.addEventListener("resize", s), o = !1), m();
        }, a = function(e) {
            var t = e.getAttribute("data-rellax-percentage"), o = e.getAttribute("data-rellax-speed"), n = e.getAttribute("data-rellax-zindex") || 0, r = x.options.wrapper ? x.options.wrapper.scrollTop : window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop, i = x.options.vertical && (t || x.options.center) ? r : 0, s = x.options.horizontal && (t || x.options.center) ? window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft : 0, a = i + e.getBoundingClientRect().top, l = e.clientHeight || e.offsetHeight || e.scrollHeight, d = s + e.getBoundingClientRect().left, p = e.clientWidth || e.offsetWidth || e.scrollWidth, c = t || (i - a + b) / (l + b), u = t || (s - d + T) / (p + T);
            x.options.center && (c = u = .5);
            var f = o || x.options.speed, m = z(u, c, f), w = e.style.cssText, h = "";
            if (0 <= w.indexOf("transform")) {
                var y = w.indexOf("transform"), g = w.slice(y), v = g.indexOf(";");
                h = v ? " " + g.slice(11, v).replace(/\s/g, "") : " " + g.slice(11).replace(/\s/g, "");
            }
            return {
                baseX: m.x,
                baseY: m.y,
                top: a,
                left: d,
                height: l,
                width: p,
                speed: f,
                style: w,
                transform: h,
                zindex: n
            };
        }, u = function() {
            var e = l, t = d;
            return l = x.options.wrapper ? x.options.wrapper.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset, 
            d = x.options.wrapper ? x.options.wrapper.scrollLeft : (document.documentElement || document.body.parentNode || document.body).scrollLeft || window.pageXOffset, 
            !(e == l || !x.options.vertical) || !(t == d || !x.options.horizontal);
        }, z = function(e, t, o) {
            var n = {}, r = o * (100 * (1 - e)), i = o * (100 * (1 - t));
            return n.x = x.options.round ? Math.round(r) : Math.round(100 * r) / 100, n.y = x.options.round ? Math.round(i) : Math.round(100 * i) / 100, 
            n;
        }, f = function() {
            u() && !1 === o && m(), n(f);
        }, m = function() {
            for (var e, t = 0; t < x.elems.length; t++) {
                var o = (l - p[t].top + b) / (p[t].height + b), n = (d - p[t].left + T) / (p[t].width + T), r = (e = z(n, o, p[t].speed)).y - p[t].baseY, i = e.x - p[t].baseX, s = p[t].zindex, a = "translate3d(" + (x.options.horizontal ? i : "0") + "px," + (x.options.vertical ? r : "0") + "px," + s + "px) " + p[t].transform;
                x.elems[t].style[c] = a;
            }
            x.options.callback(e);
        };
        return x.destroy = function() {
            for (var e = 0; e < x.elems.length; e++) x.elems[e].style.cssText = p[e].style;
            o || (window.removeEventListener("resize", s), o = !0);
        }, s(), f(), x.refresh = s, x;
    };
    return w;
});