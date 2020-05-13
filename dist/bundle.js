import t from"react";import{Form as e,Field as r,FormSpy as n}from"react-final-form";import o from"final-form-arrays";import{Form as a}from"react-bootstrap";import{FieldArray as i}from"react-final-form-arrays";function u(){return(u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}).apply(this,arguments)}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */var c=function(t,e){return(c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)};var s=function(){return(s=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};var f=function(t,e){for(var r=-1,n=null==t?0:t.length,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o};var l=function(){this.__data__=[],this.size=0};var v=function(t,e){return t===e||t!=t&&e!=e};var p=function(t,e){for(var r=t.length;r--;)if(v(t[r][0],e))return r;return-1},d=Array.prototype.splice;var y=function(t){var e=this.__data__,r=p(e,t);return!(r<0)&&(r==e.length-1?e.pop():d.call(e,r,1),--this.size,!0)};var h=function(t){var e=this.__data__,r=p(e,t);return r<0?void 0:e[r][1]};var b=function(t){return p(this.__data__,t)>-1};var m=function(t,e){var r=this.__data__,n=p(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this};function j(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}j.prototype.clear=l,j.prototype.delete=y,j.prototype.get=h,j.prototype.has=b,j.prototype.set=m;var g=j;var _=function(){this.__data__=new g,this.size=0};var w=function(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r};var O=function(t){return this.__data__.get(t)};var A=function(t){return this.__data__.has(t)},E="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function F(t,e){return t(e={exports:{}},e.exports),e.exports}var S="object"==typeof E&&E&&E.Object===Object&&E,P="object"==typeof self&&self&&self.Object===Object&&self,N=S||P||Function("return this")(),x=N.Symbol,k=Object.prototype,z=k.hasOwnProperty,T=k.toString,C=x?x.toStringTag:void 0;var I=function(t){var e=z.call(t,C),r=t[C];try{t[C]=void 0;var n=!0}catch(t){}var o=T.call(t);return n&&(e?t[C]=r:delete t[C]),o},B=Object.prototype.toString;var M=function(t){return B.call(t)},U=x?x.toStringTag:void 0;var D=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":U&&U in Object(t)?I(t):M(t)};var L=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)};var $,W=function(t){if(!L(t))return!1;var e=D(t);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e},q=N["__core-js_shared__"],V=($=/[^.]+$/.exec(q&&q.keys&&q.keys.IE_PROTO||""))?"Symbol(src)_1."+$:"";var R=function(t){return!!V&&V in t},G=Function.prototype.toString;var Z=function(t){if(null!=t){try{return G.call(t)}catch(t){}try{return t+""}catch(t){}}return""},H=/^\[object .+?Constructor\]$/,J=Function.prototype,K=Object.prototype,Q=J.toString,X=K.hasOwnProperty,Y=RegExp("^"+Q.call(X).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var tt=function(t){return!(!L(t)||R(t))&&(W(t)?Y:H).test(Z(t))};var et=function(t,e){return null==t?void 0:t[e]};var rt=function(t,e){var r=et(t,e);return tt(r)?r:void 0},nt=rt(N,"Map"),ot=rt(Object,"create");var at=function(){this.__data__=ot?ot(null):{},this.size=0};var it=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},ut=Object.prototype.hasOwnProperty;var ct=function(t){var e=this.__data__;if(ot){var r=e[t];return"__lodash_hash_undefined__"===r?void 0:r}return ut.call(e,t)?e[t]:void 0},st=Object.prototype.hasOwnProperty;var ft=function(t){var e=this.__data__;return ot?void 0!==e[t]:st.call(e,t)};var lt=function(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=ot&&void 0===e?"__lodash_hash_undefined__":e,this};function vt(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}vt.prototype.clear=at,vt.prototype.delete=it,vt.prototype.get=ct,vt.prototype.has=ft,vt.prototype.set=lt;var pt=vt;var dt=function(){this.size=0,this.__data__={hash:new pt,map:new(nt||g),string:new pt}};var yt=function(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t};var ht=function(t,e){var r=t.__data__;return yt(e)?r["string"==typeof e?"string":"hash"]:r.map};var bt=function(t){var e=ht(this,t).delete(t);return this.size-=e?1:0,e};var mt=function(t){return ht(this,t).get(t)};var jt=function(t){return ht(this,t).has(t)};var gt=function(t,e){var r=ht(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this};function _t(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}_t.prototype.clear=dt,_t.prototype.delete=bt,_t.prototype.get=mt,_t.prototype.has=jt,_t.prototype.set=gt;var wt=_t;var Ot=function(t,e){var r=this.__data__;if(r instanceof g){var n=r.__data__;if(!nt||n.length<199)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new wt(n)}return r.set(t,e),this.size=r.size,this};function At(t){var e=this.__data__=new g(t);this.size=e.size}At.prototype.clear=_,At.prototype.delete=w,At.prototype.get=O,At.prototype.has=A,At.prototype.set=Ot;var Et=At;var Ft=function(t,e){for(var r=-1,n=null==t?0:t.length;++r<n&&!1!==e(t[r],r,t););return t},St=function(){try{var t=rt(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();var Pt=function(t,e,r){"__proto__"==e&&St?St(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r},Nt=Object.prototype.hasOwnProperty;var xt=function(t,e,r){var n=t[e];Nt.call(t,e)&&v(n,r)&&(void 0!==r||e in t)||Pt(t,e,r)};var kt=function(t,e,r,n){var o=!r;r||(r={});for(var a=-1,i=e.length;++a<i;){var u=e[a],c=n?n(r[u],t[u],u,r,t):void 0;void 0===c&&(c=t[u]),o?Pt(r,u,c):xt(r,u,c)}return r};var zt=function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n};var Tt=function(t){return null!=t&&"object"==typeof t};var Ct=function(t){return Tt(t)&&"[object Arguments]"==D(t)},It=Object.prototype,Bt=It.hasOwnProperty,Mt=It.propertyIsEnumerable,Ut=Ct(function(){return arguments}())?Ct:function(t){return Tt(t)&&Bt.call(t,"callee")&&!Mt.call(t,"callee")},Dt=Array.isArray;var Lt=function(){return!1},$t=F((function(t,e){var r=e&&!e.nodeType&&e,n=r&&t&&!t.nodeType&&t,o=n&&n.exports===r?N.Buffer:void 0,a=(o?o.isBuffer:void 0)||Lt;t.exports=a})),Wt=/^(?:0|[1-9]\d*)$/;var qt=function(t,e){var r=typeof t;return!!(e=null==e?9007199254740991:e)&&("number"==r||"symbol"!=r&&Wt.test(t))&&t>-1&&t%1==0&&t<e};var Vt=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991},Rt={};Rt["[object Float32Array]"]=Rt["[object Float64Array]"]=Rt["[object Int8Array]"]=Rt["[object Int16Array]"]=Rt["[object Int32Array]"]=Rt["[object Uint8Array]"]=Rt["[object Uint8ClampedArray]"]=Rt["[object Uint16Array]"]=Rt["[object Uint32Array]"]=!0,Rt["[object Arguments]"]=Rt["[object Array]"]=Rt["[object ArrayBuffer]"]=Rt["[object Boolean]"]=Rt["[object DataView]"]=Rt["[object Date]"]=Rt["[object Error]"]=Rt["[object Function]"]=Rt["[object Map]"]=Rt["[object Number]"]=Rt["[object Object]"]=Rt["[object RegExp]"]=Rt["[object Set]"]=Rt["[object String]"]=Rt["[object WeakMap]"]=!1;var Gt=function(t){return Tt(t)&&Vt(t.length)&&!!Rt[D(t)]};var Zt=function(t){return function(e){return t(e)}},Ht=F((function(t,e){var r=e&&!e.nodeType&&e,n=r&&t&&!t.nodeType&&t,o=n&&n.exports===r&&S.process,a=function(){try{var t=n&&n.require&&n.require("util").types;return t||o&&o.binding&&o.binding("util")}catch(t){}}();t.exports=a})),Jt=Ht&&Ht.isTypedArray,Kt=Jt?Zt(Jt):Gt,Qt=Object.prototype.hasOwnProperty;var Xt=function(t,e){var r=Dt(t),n=!r&&Ut(t),o=!r&&!n&&$t(t),a=!r&&!n&&!o&&Kt(t),i=r||n||o||a,u=i?zt(t.length,String):[],c=u.length;for(var s in t)!e&&!Qt.call(t,s)||i&&("length"==s||o&&("offset"==s||"parent"==s)||a&&("buffer"==s||"byteLength"==s||"byteOffset"==s)||qt(s,c))||u.push(s);return u},Yt=Object.prototype;var te=function(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||Yt)};var ee=function(t,e){return function(r){return t(e(r))}},re=ee(Object.keys,Object),ne=Object.prototype.hasOwnProperty;var oe=function(t){if(!te(t))return re(t);var e=[];for(var r in Object(t))ne.call(t,r)&&"constructor"!=r&&e.push(r);return e};var ae=function(t){return null!=t&&Vt(t.length)&&!W(t)};var ie=function(t){return ae(t)?Xt(t):oe(t)};var ue=function(t,e){return t&&kt(e,ie(e),t)};var ce=function(t){var e=[];if(null!=t)for(var r in Object(t))e.push(r);return e},se=Object.prototype.hasOwnProperty;var fe=function(t){if(!L(t))return ce(t);var e=te(t),r=[];for(var n in t)("constructor"!=n||!e&&se.call(t,n))&&r.push(n);return r};var le=function(t){return ae(t)?Xt(t,!0):fe(t)};var ve=function(t,e){return t&&kt(e,le(e),t)},pe=F((function(t,e){var r=e&&!e.nodeType&&e,n=r&&t&&!t.nodeType&&t,o=n&&n.exports===r?N.Buffer:void 0,a=o?o.allocUnsafe:void 0;t.exports=function(t,e){if(e)return t.slice();var r=t.length,n=a?a(r):new t.constructor(r);return t.copy(n),n}}));var de=function(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e};var ye=function(t,e){for(var r=-1,n=null==t?0:t.length,o=0,a=[];++r<n;){var i=t[r];e(i,r,t)&&(a[o++]=i)}return a};var he=function(){return[]},be=Object.prototype.propertyIsEnumerable,me=Object.getOwnPropertySymbols,je=me?function(t){return null==t?[]:(t=Object(t),ye(me(t),(function(e){return be.call(t,e)})))}:he;var ge=function(t,e){return kt(t,je(t),e)};var _e=function(t,e){for(var r=-1,n=e.length,o=t.length;++r<n;)t[o+r]=e[r];return t},we=ee(Object.getPrototypeOf,Object),Oe=Object.getOwnPropertySymbols?function(t){for(var e=[];t;)_e(e,je(t)),t=we(t);return e}:he;var Ae=function(t,e){return kt(t,Oe(t),e)};var Ee=function(t,e,r){var n=e(t);return Dt(t)?n:_e(n,r(t))};var Fe=function(t){return Ee(t,ie,je)};var Se=function(t){return Ee(t,le,Oe)},Pe=rt(N,"DataView"),Ne=rt(N,"Promise"),xe=rt(N,"Set"),ke=rt(N,"WeakMap"),ze=Z(Pe),Te=Z(nt),Ce=Z(Ne),Ie=Z(xe),Be=Z(ke),Me=D;(Pe&&"[object DataView]"!=Me(new Pe(new ArrayBuffer(1)))||nt&&"[object Map]"!=Me(new nt)||Ne&&"[object Promise]"!=Me(Ne.resolve())||xe&&"[object Set]"!=Me(new xe)||ke&&"[object WeakMap]"!=Me(new ke))&&(Me=function(t){var e=D(t),r="[object Object]"==e?t.constructor:void 0,n=r?Z(r):"";if(n)switch(n){case ze:return"[object DataView]";case Te:return"[object Map]";case Ce:return"[object Promise]";case Ie:return"[object Set]";case Be:return"[object WeakMap]"}return e});var Ue=Me,De=Object.prototype.hasOwnProperty;var Le=function(t){var e=t.length,r=new t.constructor(e);return e&&"string"==typeof t[0]&&De.call(t,"index")&&(r.index=t.index,r.input=t.input),r},$e=N.Uint8Array;var We=function(t){var e=new t.constructor(t.byteLength);return new $e(e).set(new $e(t)),e};var qe=function(t,e){var r=e?We(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)},Ve=/\w*$/;var Re=function(t){var e=new t.constructor(t.source,Ve.exec(t));return e.lastIndex=t.lastIndex,e},Ge=x?x.prototype:void 0,Ze=Ge?Ge.valueOf:void 0;var He=function(t){return Ze?Object(Ze.call(t)):{}};var Je=function(t,e){var r=e?We(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)};var Ke=function(t,e,r){var n=t.constructor;switch(e){case"[object ArrayBuffer]":return We(t);case"[object Boolean]":case"[object Date]":return new n(+t);case"[object DataView]":return qe(t,r);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return Je(t,r);case"[object Map]":return new n;case"[object Number]":case"[object String]":return new n(t);case"[object RegExp]":return Re(t);case"[object Set]":return new n;case"[object Symbol]":return He(t)}},Qe=Object.create,Xe=function(){function t(){}return function(e){if(!L(e))return{};if(Qe)return Qe(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}();var Ye=function(t){return"function"!=typeof t.constructor||te(t)?{}:Xe(we(t))};var tr=function(t){return Tt(t)&&"[object Map]"==Ue(t)},er=Ht&&Ht.isMap,rr=er?Zt(er):tr;var nr=function(t){return Tt(t)&&"[object Set]"==Ue(t)},or=Ht&&Ht.isSet,ar=or?Zt(or):nr,ir={};ir["[object Arguments]"]=ir["[object Array]"]=ir["[object ArrayBuffer]"]=ir["[object DataView]"]=ir["[object Boolean]"]=ir["[object Date]"]=ir["[object Float32Array]"]=ir["[object Float64Array]"]=ir["[object Int8Array]"]=ir["[object Int16Array]"]=ir["[object Int32Array]"]=ir["[object Map]"]=ir["[object Number]"]=ir["[object Object]"]=ir["[object RegExp]"]=ir["[object Set]"]=ir["[object String]"]=ir["[object Symbol]"]=ir["[object Uint8Array]"]=ir["[object Uint8ClampedArray]"]=ir["[object Uint16Array]"]=ir["[object Uint32Array]"]=!0,ir["[object Error]"]=ir["[object Function]"]=ir["[object WeakMap]"]=!1;var ur=function t(e,r,n,o,a,i){var u,c=1&r,s=2&r,f=4&r;if(n&&(u=a?n(e,o,a,i):n(e)),void 0!==u)return u;if(!L(e))return e;var l=Dt(e);if(l){if(u=Le(e),!c)return de(e,u)}else{var v=Ue(e),p="[object Function]"==v||"[object GeneratorFunction]"==v;if($t(e))return pe(e,c);if("[object Object]"==v||"[object Arguments]"==v||p&&!a){if(u=s||p?{}:Ye(e),!c)return s?Ae(e,ve(u,e)):ge(e,ue(u,e))}else{if(!ir[v])return a?e:{};u=Ke(e,v,c)}}i||(i=new Et);var d=i.get(e);if(d)return d;i.set(e,u),ar(e)?e.forEach((function(o){u.add(t(o,r,n,o,e,i))})):rr(e)&&e.forEach((function(o,a){u.set(a,t(o,r,n,a,e,i))}));var y=f?s?Se:Fe:s?keysIn:ie,h=l?void 0:y(e);return Ft(h||e,(function(o,a){h&&(o=e[a=o]),xt(u,a,t(o,r,n,a,e,i))})),u};var cr=function(t){return"symbol"==typeof t||Tt(t)&&"[object Symbol]"==D(t)},sr=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,fr=/^\w*$/;var lr=function(t,e){if(Dt(t))return!1;var r=typeof t;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=t&&!cr(t))||(fr.test(t)||!sr.test(t)||null!=e&&t in Object(e))};function vr(t,e){if("function"!=typeof t||null!=e&&"function"!=typeof e)throw new TypeError("Expected a function");var r=function(){var n=arguments,o=e?e.apply(this,n):n[0],a=r.cache;if(a.has(o))return a.get(o);var i=t.apply(this,n);return r.cache=a.set(o,i)||a,i};return r.cache=new(vr.Cache||wt),r}vr.Cache=wt;var pr=vr;var dr=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,yr=/\\(\\)?/g,hr=function(t){var e=pr(t,(function(t){return 500===r.size&&r.clear(),t})),r=e.cache;return e}((function(t){var e=[];return 46===t.charCodeAt(0)&&e.push(""),t.replace(dr,(function(t,r,n,o){e.push(n?o.replace(yr,"$1"):r||t)})),e})),br=x?x.prototype:void 0,mr=br?br.toString:void 0;var jr=function t(e){if("string"==typeof e)return e;if(Dt(e))return f(e,t)+"";if(cr(e))return mr?mr.call(e):"";var r=e+"";return"0"==r&&1/e==-1/0?"-0":r};var gr=function(t){return null==t?"":jr(t)};var _r=function(t,e){return Dt(t)?t:lr(t,e)?[t]:hr(gr(t))};var wr=function(t){var e=null==t?0:t.length;return e?t[e-1]:void 0};var Or=function(t){if("string"==typeof t||cr(t))return t;var e=t+"";return"0"==e&&1/t==-1/0?"-0":e};var Ar=function(t,e){for(var r=0,n=(e=_r(e,t)).length;null!=t&&r<n;)t=t[Or(e[r++])];return r&&r==n?t:void 0};var Er=function(t,e,r){var n=-1,o=t.length;e<0&&(e=-e>o?0:o+e),(r=r>o?o:r)<0&&(r+=o),o=e>r?0:r-e>>>0,e>>>=0;for(var a=Array(o);++n<o;)a[n]=t[n+e];return a};var Fr=function(t,e){return e.length<2?t:Ar(t,Er(e,0,-1))};var Sr=function(t,e){return e=_r(e,t),null==(t=Fr(t,e))||delete t[Or(wr(e))]},Pr=Function.prototype,Nr=Object.prototype,xr=Pr.toString,kr=Nr.hasOwnProperty,zr=xr.call(Object);var Tr=function(t){if(!Tt(t)||"[object Object]"!=D(t))return!1;var e=we(t);if(null===e)return!0;var r=kr.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&xr.call(r)==zr};var Cr=function(t){return Tr(t)?void 0:t},Ir=x?x.isConcatSpreadable:void 0;var Br=function(t){return Dt(t)||Ut(t)||!!(Ir&&t&&t[Ir])};var Mr=function t(e,r,n,o,a){var i=-1,u=e.length;for(n||(n=Br),a||(a=[]);++i<u;){var c=e[i];r>0&&n(c)?r>1?t(c,r-1,n,o,a):_e(a,c):o||(a[a.length]=c)}return a};var Ur=function(t){return(null==t?0:t.length)?Mr(t,1):[]};var Dr=function(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)},Lr=Math.max;var $r=function(t,e,r){return e=Lr(void 0===e?t.length-1:e,0),function(){for(var n=arguments,o=-1,a=Lr(n.length-e,0),i=Array(a);++o<a;)i[o]=n[e+o];o=-1;for(var u=Array(e+1);++o<e;)u[o]=n[o];return u[e]=r(i),Dr(t,this,u)}};var Wr=function(t){return function(){return t}};var qr=function(t){return t},Vr=St?function(t,e){return St(t,"toString",{configurable:!0,enumerable:!1,value:Wr(e),writable:!0})}:qr,Rr=Date.now;var Gr=function(t){var e=0,r=0;return function(){var n=Rr(),o=16-(n-r);if(r=n,o>0){if(++e>=800)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}(Vr);var Zr=function(t){return Gr($r(t,void 0,Ur),t+"")}((function(t,e){var r={};if(null==t)return r;var n=!1;e=f(e,(function(e){return e=_r(e,t),n||(n=e.length>1),e})),kt(t,Se(t),r),n&&(r=ur(r,7,Cr));for(var o=e.length;o--;)Sr(r,e[o]);return r}));var Hr=function(t,e,r){(void 0!==r&&!v(t[e],r)||void 0===r&&!(e in t))&&Pt(t,e,r)};var Jr=function(t){return function(e,r,n){for(var o=-1,a=Object(e),i=n(e),u=i.length;u--;){var c=i[t?u:++o];if(!1===r(a[c],c,a))break}return e}}();var Kr=function(t){return Tt(t)&&ae(t)};var Qr=function(t,e){if(("constructor"!==e||"function"!=typeof t[e])&&"__proto__"!=e)return t[e]};var Xr=function(t){return kt(t,le(t))};var Yr=function(t,e,r,n,o,a,i){var u=Qr(t,r),c=Qr(e,r),s=i.get(c);if(s)Hr(t,r,s);else{var f=a?a(u,c,r+"",t,e,i):void 0,l=void 0===f;if(l){var v=Dt(c),p=!v&&$t(c),d=!v&&!p&&Kt(c);f=c,v||p||d?Dt(u)?f=u:Kr(u)?f=de(u):p?(l=!1,f=pe(c,!0)):d?(l=!1,f=Je(c,!0)):f=[]:Tr(c)||Ut(c)?(f=u,Ut(u)?f=Xr(u):L(u)&&!W(u)||(f=Ye(c))):l=!1}l&&(i.set(c,f),o(f,c,n,a,i),i.delete(c)),Hr(t,r,f)}};var tn=function t(e,r,n,o,a){e!==r&&Jr(r,(function(i,u){if(a||(a=new Et),L(i))Yr(e,r,u,n,t,o,a);else{var c=o?o(Qr(e,u),i,u+"",e,r,a):void 0;void 0===c&&(c=i),Hr(e,u,c)}}),le)};var en=function(t,e){return Gr($r(t,e,qr),t+"")};var rn=function(t,e,r){if(!L(r))return!1;var n=typeof e;return!!("number"==n?ae(r)&&qt(e,r.length):"string"==n&&e in r)&&v(r[e],t)};var nn=function(t){return en((function(e,r){var n=-1,o=r.length,a=o>1?r[o-1]:void 0,i=o>2?r[2]:void 0;for(a=t.length>3&&"function"==typeof a?(o--,a):void 0,i&&rn(r[0],r[1],i)&&(a=o<3?void 0:a,o=1),e=Object(e);++n<o;){var u=r[n];u&&t(e,u,n,a)}return e}))}((function(t,e,r){tn(t,e,r)})),on=Object.prototype.hasOwnProperty;var an=function(t){if(null==t)return!0;if(ae(t)&&(Dt(t)||"string"==typeof t||"function"==typeof t.splice||$t(t)||Kt(t)||Ut(t)))return!t.length;var e=Ue(t);if("[object Map]"==e||"[object Set]"==e)return!t.size;if(te(t))return!oe(t).length;for(var r in t)if(on.call(t,r))return!1;return!0},un=function(t){var e=Zr(t,["fields"]);if(t.fields)return Array.isArray(t.fields)?t:(e.fields=[],Object.keys(t.fields).forEach((function(r){e.fields.push(Object.assign({},s({},t.fields[r],{name:r})))})),e);throw Error("The provided entity doesn't contain a name")},cn=function(t,e,r){var n=this;this.layoutFields=[],this.fields={},this.arrayField={},this.parseEntity=function(t,e,r){var o=n.getEntity(t);if(!o)throw new Error("Provided property entityName: "+t+", does not exist in the provided schema");e&&o.layouts?n.getLayoutFields(o,e):o.fields&&(n.getFields(o,!1,r),n.pushAndEmptyFields())},this.pushAndEmptyFields=function(t){n.parsedSchema.push({orientation:t||"vertical",fields:n.fields}),n.fields={}},this.getEntity=function(t){return n.schema.entities.find((function(e){return e.name===t}))},this.getFields=function(t,e,r,o){if(t.fields){var a=t.fields;r||n.fieldNameStack.push(t.name),a.forEach((function(e,r){var i,u,c=o?e.name:n.getName(Array.isArray(a)?e.name:r);if("entity"===e.type){if(!e.entityName)throw new Error("Please provide entityName for a field type of entity for field with name: "+e.name);an(n.fields)||n.pushAndEmptyFields(t.orientation),n.parseEntity(e.entityName,e.layoutName,!1)}else if("array"===e.type){if(an(n.fields)||n.pushAndEmptyFields(t.orientation),!e.entityName)throw new Error("Please provide entityName for a field type of entity for field with name: "+e.name);Object.assign(n.fields,((i={})[c]=s({},e,{arrayFields:n.getArrayFields(e.entityName,e.layoutName)}),i))}else Object.assign(o?n.arrayField:n.fields,((u={})[c]=s({},e),u)),o&&Object.assign(n.arrayField,{orientation:t.orientation})})),n.fieldNameStack.pop()}},this.getArrayFields=function(t,e){var r=n.getEntity(t);if(!r)throw new Error("Provided property entityName: "+t+", does not exist in the provided schema");e?n.getLayoutFields(r,e,!0):n.getFields(r,!0,!0,!0);var o=Object.assign({},n.arrayField);return n.arrayField={},o},this.getName=function(t){return n.fieldNameStack.length?n.fieldNameStack.reduce((function(t,e){return t+"."+e}))+"."+t:t},this.getLayoutFields=function(t,e,r){var o=t.layouts&&t.layouts.find((function(t){return t.name===e}));if(!o)throw new Error("Provided layoutName: "+e+", isn't provided in the schema");o.groups?o.groups.forEach((function(e){n.generateLayoutFields(e,t,r)})):n.generateLayoutFields(o,t,r)},this.generateLayoutFields=function(t,e,r){var o=[];t.fields.forEach((function(t){o.push(nn(t,e.fields.find((function(e){return e.name===t.name}))||{}))}));var a=Object.assign({},Zr(e,["layouts"]));Object.assign(a,{fields:o,orientation:t.orientation}),n.getFields(a,!0,!1,r)},this.schema=function(t){var e={};if(Object.assign(e,t),t.entities)return Array.isArray(t.entities)?(e.entities=[],t.entities.forEach((function(t){var r=un(t);e.entities.push(Object.assign({},s({},r)))})),e):(e.entities=[],Object.keys(t.entities).forEach((function(r){var n=un(t.entities[r]);e.entities.push(Object.assign({},s({},n,{name:r})))})),e);throw Error("Cannot find any entity passed in the provided schema")}(t),this.fieldNameStack=[],this.parsedSchema=[],this.subscribedFields=[],this.parseEntity(e,r,!0),this.fields={}},sn=F((function(t){
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
!function(){var e={}.hasOwnProperty;function r(){for(var t=[],n=0;n<arguments.length;n++){var o=arguments[n];if(o){var a=typeof o;if("string"===a||"number"===a)t.push(o);else if(Array.isArray(o)&&o.length){var i=r.apply(null,o);i&&t.push(i)}else if("object"===a)for(var u in o)e.call(o,u)&&o[u]&&t.push(u)}}return t.join(" ")}t.exports?(r.default=r,t.exports=r):window.classNames=r}()})),fn=function(e){var r=e.input,n=e.meta;return t.createElement("div",{className:sn({"d-none":!1===e.visible},{"d-flex":!0===e.visible||void 0===e.visible||"function"==typeof e.visible},"row-12 justify-content-between mb-3 w-auto h-10")},t.createElement("label",null,e.displayName),t.createElement("div",{className:"col-9"},t.createElement("input",{name:r.name,type:r.type,onChange:r.onChange,onBlur:r.onBlur,onFocus:r.onFocus,className:sn("rounded form-control",{"is-invalid":!n.valid},{disabled:e.disabled},{"d-none":!1===e.visible}),value:r.value}),n.error&&n.touched&&t.createElement("p",null,Array.isArray(n.error)?n.error[n.error.length-1]:n.error)))},ln=function(e){var r=e.input;e.meta;return t.createElement("div",{className:"d-flex row-12 justify-content-between mb-3 "},t.createElement(a.Label,null,e.displayName),t.createElement("select",{name:e.displayName,onChange:e.input.onChange,onFocus:r.onFocus,onBlur:r.onBlur,defaultValue:"",value:r.value,className:sn("rounded form-control col-9 bg-light",{disabled:e.disabled})},e.enum&&e.enum.map((function(e){return t.createElement("option",{value:e},e)})),e.options&&e.options.map((function(e){return t.createElement("option",{value:e.label||e.value},e.text)}))))},vn=function(t,e){if(Object.assign(e,{text:fn,select:ln}),t.component&&("function"==typeof t.component||"object"==typeof t.component))return t.component;if(t.component&&"string"==typeof t.component&&e&&e.hasOwnProperty(t.component))return e[t.component];if(t.component&&e&&!e.hasOwnProperty(t.component))throw new Error("Provided component "+t.component+" isn't provided in the component factory");return function(t){var e=t.field;switch(e.type){case"string":return e.options||e.enum?ln:fn;case"number":default:return fn}}({field:t})};var pn=function(t,e,r){var n=null==t?void 0:Ar(t,e);return void 0===n?r:n},dn={},yn=function(t,e,r){if("function"!=typeof t)return t;try{return t(hn(r,e.values),e,e.values)}catch(e){return t}},hn=function(t,e){var r=t.split(".");return r.pop(),pn(e,r)||e},bn={evaluator:function(t,e){return t(e,e.value)},formState:dn,updateFormState:function(t){(dn=t).form.getFieldState("name")},metaDataEvaluator:function(t,e,r){var n=t;return Object.keys(t).forEach((function(o){var a;Object.assign(n,((a={})[o]=yn(t[o],e,r),a))})),n},getFieldState:function(t){var e=dn.form.getFieldState(t);return e&&"asd"===e.value?"WHEEEWWWW":"nope"},getLocalModel:hn,fieldPropertyCheck:function(t){for(var e in t)if("function"==typeof t[e])return!0;return!1}},mn=function(t){return t.match('/^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/')?void 0:"Please enter a valid email"},jn=function(t){return t?void 0:"The field cannot be empty"},gn=function(t,e,r,n,o,a){if(t&&Object.keys(t).length){var i=void 0;t.required&&(i=_n("required",r));try{return i||(t.error?t.error(bn.getLocalModel(a,n),o,n):void 0)}catch(t){throw new Error(t)}}},_n=function(t,e){switch(t){case"required":return jn(e);case"email":return mn(e)}},wn=function(t,e,r){r.changeValue(e,t[0],(function(e){return function(e){var r=e.split("-"),n=new Date(parseInt(r[0]),parseInt(r[1])-1,parseInt(r[2]));if(!t[1])return n.toDateString();switch(t[1]){case"epoch":return n.getTime();case"UTC":return n.toUTCString();case"ISO":return n.toISOString();default:return n.getTime()}}(e)}))},On=function(a){function f(){var c=null!==a&&a.apply(this,arguments)||this;return c.render=function(){var n=c.props,a=n.schema,i=n.entityName,f=n.layoutName,l=(n.bottomBar,n.formProps),v=new cn(a,i,f).parsedSchema;return t.createElement("div",{className:"container-fluid form-builder"},t.createElement(e,u({},l,{mutators:s({},o,{date:wn}),render:function(e){return c.formProps=e,t.createElement("form",{onSubmit:e.handleSubmit},c.getFields(v),t.createElement(r,{name:"bottomBar",component:c.props.bottomBar,key:"bottomBar"}))}})))},c.getFields=function(e,r){if(Array.isArray(e))return e.map((function(e){return t.createElement("div",{className:sn("vertical"===e.orientation?"col":"row")},Object.keys(e.fields).map((function(t){return c.renderField(e.fields[t],t,r)})))}));if("object"==typeof e&&r){var n=e.orientation,o=Zr(e,["orientation"]);return t.createElement("div",{className:"vertical"===n?"verticalLayout":"horizontalLayout"},Object.keys(o).map((function(t){return c.renderField(o[t],t,r)})))}},c.renderField=function(e,o,a){var s=c.props.componentFactory,f=e.required||e.error?{error:e.error||e.validate,required:e.required||!1}:{};return bn.fieldPropertyCheck(e)?t.createElement(n,{render:function(n){var i=bn.metaDataEvaluator(Zr(e,["error"]),n,o);return t.createElement(r,u({name:a&&a.name?a.name+"."+o:o,component:vn(i,s),key:o,validate:function(t,e,r){return gn(f,0,t,e,r,o)},mutators:c.formProps.mutators},Zr(i,["validate","name","component"])))}}):"array"===e.type?t.createElement("div",{className:"m-20",key:o},t.createElement("label",null,t.createElement("b",null,e.displayName)),t.createElement(i,{name:o,render:function(t){return t.fields.map((function(t){return c.getFields(e.arrayFields,{name:t})}))}}),t.createElement("div",{className:"d-flex mb-10 row-12"},t.createElement("button",{type:"button",className:"btn btn-outline-primary w-20 mr-20",onClick:function(){return c.formProps.form.mutators.push(o,void 0)}},e.addText?e.addText:"Add +"),t.createElement("button",{type:"button",className:"btn btn-outline-danger mr-20 w-20",onClick:function(){return c.formProps.form.mutators.pop(o,void 0)}},e.addText?e.addText:"Delete -"))):t.createElement(r,u({name:a&&a.name?a.name+"."+o:o,component:vn(e,s),key:o,validate:function(t,e,r){return gn(f,0,t,e,r,o)},mutators:c.formProps.mutators},Zr(e,["validate","name","component"])))},c}return function(t,e){function r(){this.constructor=t}c(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}(f,a),f}(t.PureComponent);export default On;