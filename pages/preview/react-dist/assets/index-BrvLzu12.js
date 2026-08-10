(function(){const M=document.createElement("link").relList;if(M&&M.supports&&M.supports("modulepreload"))return;for(const D of document.querySelectorAll('link[rel="modulepreload"]'))_(D);new MutationObserver(D=>{for(const N of D)if(N.type==="childList")for(const O of N.addedNodes)O.tagName==="LINK"&&O.rel==="modulepreload"&&_(O)}).observe(document,{childList:!0,subtree:!0});function L(D){const N={};return D.integrity&&(N.integrity=D.integrity),D.referrerPolicy&&(N.referrerPolicy=D.referrerPolicy),D.crossOrigin==="use-credentials"?N.credentials="include":D.crossOrigin==="anonymous"?N.credentials="omit":N.credentials="same-origin",N}function _(D){if(D.ep)return;D.ep=!0;const N=L(D);fetch(D.href,N)}})();var oo={exports:{}},wn={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bp;function a1(){if(bp)return wn;bp=1;var p=Symbol.for("react.transitional.element"),M=Symbol.for("react.fragment");function L(_,D,N){var O=null;if(N!==void 0&&(O=""+N),D.key!==void 0&&(O=""+D.key),"key"in D){N={};for(var W in D)W!=="key"&&(N[W]=D[W])}else N=D;return D=N.ref,{$$typeof:p,type:_,key:O,ref:D!==void 0?D:null,props:N}}return wn.Fragment=M,wn.jsx=L,wn.jsxs=L,wn}var mp;function n1(){return mp||(mp=1,oo.exports=a1()),oo.exports}var r=n1(),co={exports:{}},kn={},ro={exports:{}},uo={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wp;function l1(){return wp||(wp=1,(function(p){function M(w,T){var U=w.length;w.push(T);s:for(;0<U;){var is=U-1>>>1,rs=w[is];if(0<D(rs,T))w[is]=T,w[U]=rs,U=is;else break s}}function L(w){return w.length===0?null:w[0]}function _(w){if(w.length===0)return null;var T=w[0],U=w.pop();if(U!==T){w[0]=U;s:for(var is=0,rs=w.length,u=rs>>>1;is<u;){var C=2*(is+1)-1,E=w[C],B=C+1,Z=w[B];if(0>D(E,U))B<rs&&0>D(Z,E)?(w[is]=Z,w[B]=U,is=B):(w[is]=E,w[C]=U,is=C);else if(B<rs&&0>D(Z,U))w[is]=Z,w[B]=U,is=B;else break s}}return T}function D(w,T){var U=w.sortIndex-T.sortIndex;return U!==0?U:w.id-T.id}if(p.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var N=performance;p.unstable_now=function(){return N.now()}}else{var O=Date,W=O.now();p.unstable_now=function(){return O.now()-W}}var S=[],x=[],V=1,H=null,I=3,Bs=!1,Rs=!1,Hs=!1,Te=!1,Ws=typeof setTimeout=="function"?setTimeout:null,Je=typeof clearTimeout=="function"?clearTimeout:null,zs=typeof setImmediate<"u"?setImmediate:null;function de(w){for(var T=L(x);T!==null;){if(T.callback===null)_(x);else if(T.startTime<=w)_(x),T.sortIndex=T.expirationTime,M(S,T);else break;T=L(x)}}function ye(w){if(Hs=!1,de(w),!Rs)if(L(S)!==null)Rs=!0,Us||(Us=!0,Zs());else{var T=L(x);T!==null&&be(ye,T.startTime-w)}}var Us=!1,P=-1,qs=5,xe=-1;function qt(){return Te?!0:!(p.unstable_now()-xe<qs)}function Ce(){if(Te=!1,Us){var w=p.unstable_now();xe=w;var T=!0;try{s:{Rs=!1,Hs&&(Hs=!1,Je(P),P=-1),Bs=!0;var U=I;try{e:{for(de(w),H=L(S);H!==null&&!(H.expirationTime>w&&qt());){var is=H.callback;if(typeof is=="function"){H.callback=null,I=H.priorityLevel;var rs=is(H.expirationTime<=w);if(w=p.unstable_now(),typeof rs=="function"){H.callback=rs,de(w),T=!0;break e}H===L(S)&&_(S),de(w)}else _(S);H=L(S)}if(H!==null)T=!0;else{var u=L(x);u!==null&&be(ye,u.startTime-w),T=!1}}break s}finally{H=null,I=U,Bs=!1}T=void 0}}finally{T?Zs():Us=!1}}}var Zs;if(typeof zs=="function")Zs=function(){zs(Ce)};else if(typeof MessageChannel<"u"){var kt=new MessageChannel,Ee=kt.port2;kt.port1.onmessage=Ce,Zs=function(){Ee.postMessage(null)}}else Zs=function(){Ws(Ce,0)};function be(w,T){P=Ws(function(){w(p.unstable_now())},T)}p.unstable_IdlePriority=5,p.unstable_ImmediatePriority=1,p.unstable_LowPriority=4,p.unstable_NormalPriority=3,p.unstable_Profiling=null,p.unstable_UserBlockingPriority=2,p.unstable_cancelCallback=function(w){w.callback=null},p.unstable_forceFrameRate=function(w){0>w||125<w?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):qs=0<w?Math.floor(1e3/w):5},p.unstable_getCurrentPriorityLevel=function(){return I},p.unstable_next=function(w){switch(I){case 1:case 2:case 3:var T=3;break;default:T=I}var U=I;I=T;try{return w()}finally{I=U}},p.unstable_requestPaint=function(){Te=!0},p.unstable_runWithPriority=function(w,T){switch(w){case 1:case 2:case 3:case 4:case 5:break;default:w=3}var U=I;I=w;try{return T()}finally{I=U}},p.unstable_scheduleCallback=function(w,T,U){var is=p.unstable_now();switch(typeof U=="object"&&U!==null?(U=U.delay,U=typeof U=="number"&&0<U?is+U:is):U=is,w){case 1:var rs=-1;break;case 2:rs=250;break;case 5:rs=1073741823;break;case 4:rs=1e4;break;default:rs=5e3}return rs=U+rs,w={id:V++,callback:T,priorityLevel:w,startTime:U,expirationTime:rs,sortIndex:-1},U>is?(w.sortIndex=U,M(x,w),L(S)===null&&w===L(x)&&(Hs?(Je(P),P=-1):Hs=!0,be(ye,U-is))):(w.sortIndex=rs,M(S,w),Rs||Bs||(Rs=!0,Us||(Us=!0,Zs()))),w},p.unstable_shouldYield=qt,p.unstable_wrapCallback=function(w){var T=I;return function(){var U=I;I=T;try{return w.apply(this,arguments)}finally{I=U}}}})(uo)),uo}var kp;function i1(){return kp||(kp=1,ro.exports=l1()),ro.exports}var po={exports:{}},q={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yp;function d1(){if(yp)return q;yp=1;var p=Symbol.for("react.transitional.element"),M=Symbol.for("react.portal"),L=Symbol.for("react.fragment"),_=Symbol.for("react.strict_mode"),D=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),O=Symbol.for("react.context"),W=Symbol.for("react.forward_ref"),S=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),V=Symbol.for("react.lazy"),H=Symbol.for("react.activity"),I=Symbol.iterator;function Bs(u){return u===null||typeof u!="object"?null:(u=I&&u[I]||u["@@iterator"],typeof u=="function"?u:null)}var Rs={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Hs=Object.assign,Te={};function Ws(u,C,E){this.props=u,this.context=C,this.refs=Te,this.updater=E||Rs}Ws.prototype.isReactComponent={},Ws.prototype.setState=function(u,C){if(typeof u!="object"&&typeof u!="function"&&u!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,u,C,"setState")},Ws.prototype.forceUpdate=function(u){this.updater.enqueueForceUpdate(this,u,"forceUpdate")};function Je(){}Je.prototype=Ws.prototype;function zs(u,C,E){this.props=u,this.context=C,this.refs=Te,this.updater=E||Rs}var de=zs.prototype=new Je;de.constructor=zs,Hs(de,Ws.prototype),de.isPureReactComponent=!0;var ye=Array.isArray;function Us(){}var P={H:null,A:null,T:null,S:null},qs=Object.prototype.hasOwnProperty;function xe(u,C,E){var B=E.ref;return{$$typeof:p,type:u,key:C,ref:B!==void 0?B:null,props:E}}function qt(u,C){return xe(u.type,C,u.props)}function Ce(u){return typeof u=="object"&&u!==null&&u.$$typeof===p}function Zs(u){var C={"=":"=0",":":"=2"};return"$"+u.replace(/[=:]/g,function(E){return C[E]})}var kt=/\/+/g;function Ee(u,C){return typeof u=="object"&&u!==null&&u.key!=null?Zs(""+u.key):C.toString(36)}function be(u){switch(u.status){case"fulfilled":return u.value;case"rejected":throw u.reason;default:switch(typeof u.status=="string"?u.then(Us,Us):(u.status="pending",u.then(function(C){u.status==="pending"&&(u.status="fulfilled",u.value=C)},function(C){u.status==="pending"&&(u.status="rejected",u.reason=C)})),u.status){case"fulfilled":return u.value;case"rejected":throw u.reason}}throw u}function w(u,C,E,B,Z){var X=typeof u;(X==="undefined"||X==="boolean")&&(u=null);var as=!1;if(u===null)as=!0;else switch(X){case"bigint":case"string":case"number":as=!0;break;case"object":switch(u.$$typeof){case p:case M:as=!0;break;case V:return as=u._init,w(as(u._payload),C,E,B,Z)}}if(as)return Z=Z(u),as=B===""?"."+Ee(u,0):B,ye(Z)?(E="",as!=null&&(E=as.replace(kt,"$&/")+"/"),w(Z,C,E,"",function(Ma){return Ma})):Z!=null&&(Ce(Z)&&(Z=qt(Z,E+(Z.key==null||u&&u.key===Z.key?"":(""+Z.key).replace(kt,"$&/")+"/")+as)),C.push(Z)),1;as=0;var Os=B===""?".":B+":";if(ye(u))for(var gs=0;gs<u.length;gs++)B=u[gs],X=Os+Ee(B,gs),as+=w(B,C,E,X,Z);else if(gs=Bs(u),typeof gs=="function")for(u=gs.call(u),gs=0;!(B=u.next()).done;)B=B.value,X=Os+Ee(B,gs++),as+=w(B,C,E,X,Z);else if(X==="object"){if(typeof u.then=="function")return w(be(u),C,E,B,Z);throw C=String(u),Error("Objects are not valid as a React child (found: "+(C==="[object Object]"?"object with keys {"+Object.keys(u).join(", ")+"}":C)+"). If you meant to render a collection of children, use an array instead.")}return as}function T(u,C,E){if(u==null)return u;var B=[],Z=0;return w(u,B,"","",function(X){return C.call(E,X,Z++)}),B}function U(u){if(u._status===-1){var C=u._result;C=C(),C.then(function(E){(u._status===0||u._status===-1)&&(u._status=1,u._result=E)},function(E){(u._status===0||u._status===-1)&&(u._status=2,u._result=E)}),u._status===-1&&(u._status=0,u._result=C)}if(u._status===1)return u._result.default;throw u._result}var is=typeof reportError=="function"?reportError:function(u){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var C=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof u=="object"&&u!==null&&typeof u.message=="string"?String(u.message):String(u),error:u});if(!window.dispatchEvent(C))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",u);return}console.error(u)},rs={map:T,forEach:function(u,C,E){T(u,function(){C.apply(this,arguments)},E)},count:function(u){var C=0;return T(u,function(){C++}),C},toArray:function(u){return T(u,function(C){return C})||[]},only:function(u){if(!Ce(u))throw Error("React.Children.only expected to receive a single React element child.");return u}};return q.Activity=H,q.Children=rs,q.Component=Ws,q.Fragment=L,q.Profiler=D,q.PureComponent=zs,q.StrictMode=_,q.Suspense=S,q.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=P,q.__COMPILER_RUNTIME={__proto__:null,c:function(u){return P.H.useMemoCache(u)}},q.cache=function(u){return function(){return u.apply(null,arguments)}},q.cacheSignal=function(){return null},q.cloneElement=function(u,C,E){if(u==null)throw Error("The argument must be a React element, but you passed "+u+".");var B=Hs({},u.props),Z=u.key;if(C!=null)for(X in C.key!==void 0&&(Z=""+C.key),C)!qs.call(C,X)||X==="key"||X==="__self"||X==="__source"||X==="ref"&&C.ref===void 0||(B[X]=C[X]);var X=arguments.length-2;if(X===1)B.children=E;else if(1<X){for(var as=Array(X),Os=0;Os<X;Os++)as[Os]=arguments[Os+2];B.children=as}return xe(u.type,Z,B)},q.createContext=function(u){return u={$$typeof:O,_currentValue:u,_currentValue2:u,_threadCount:0,Provider:null,Consumer:null},u.Provider=u,u.Consumer={$$typeof:N,_context:u},u},q.createElement=function(u,C,E){var B,Z={},X=null;if(C!=null)for(B in C.key!==void 0&&(X=""+C.key),C)qs.call(C,B)&&B!=="key"&&B!=="__self"&&B!=="__source"&&(Z[B]=C[B]);var as=arguments.length-2;if(as===1)Z.children=E;else if(1<as){for(var Os=Array(as),gs=0;gs<as;gs++)Os[gs]=arguments[gs+2];Z.children=Os}if(u&&u.defaultProps)for(B in as=u.defaultProps,as)Z[B]===void 0&&(Z[B]=as[B]);return xe(u,X,Z)},q.createRef=function(){return{current:null}},q.forwardRef=function(u){return{$$typeof:W,render:u}},q.isValidElement=Ce,q.lazy=function(u){return{$$typeof:V,_payload:{_status:-1,_result:u},_init:U}},q.memo=function(u,C){return{$$typeof:x,type:u,compare:C===void 0?null:C}},q.startTransition=function(u){var C=P.T,E={};P.T=E;try{var B=u(),Z=P.S;Z!==null&&Z(E,B),typeof B=="object"&&B!==null&&typeof B.then=="function"&&B.then(Us,is)}catch(X){is(X)}finally{C!==null&&E.types!==null&&(C.types=E.types),P.T=C}},q.unstable_useCacheRefresh=function(){return P.H.useCacheRefresh()},q.use=function(u){return P.H.use(u)},q.useActionState=function(u,C,E){return P.H.useActionState(u,C,E)},q.useCallback=function(u,C){return P.H.useCallback(u,C)},q.useContext=function(u){return P.H.useContext(u)},q.useDebugValue=function(){},q.useDeferredValue=function(u,C){return P.H.useDeferredValue(u,C)},q.useEffect=function(u,C){return P.H.useEffect(u,C)},q.useEffectEvent=function(u){return P.H.useEffectEvent(u)},q.useId=function(){return P.H.useId()},q.useImperativeHandle=function(u,C,E){return P.H.useImperativeHandle(u,C,E)},q.useInsertionEffect=function(u,C){return P.H.useInsertionEffect(u,C)},q.useLayoutEffect=function(u,C){return P.H.useLayoutEffect(u,C)},q.useMemo=function(u,C){return P.H.useMemo(u,C)},q.useOptimistic=function(u,C){return P.H.useOptimistic(u,C)},q.useReducer=function(u,C,E){return P.H.useReducer(u,C,E)},q.useRef=function(u){return P.H.useRef(u)},q.useState=function(u){return P.H.useState(u)},q.useSyncExternalStore=function(u,C,E){return P.H.useSyncExternalStore(u,C,E)},q.useTransition=function(){return P.H.useTransition()},q.version="19.2.7",q}var xp;function ho(){return xp||(xp=1,po.exports=d1()),po.exports}var vo={exports:{}},Ns={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cp;function o1(){if(Cp)return Ns;Cp=1;var p=ho();function M(S){var x="https://react.dev/errors/"+S;if(1<arguments.length){x+="?args[]="+encodeURIComponent(arguments[1]);for(var V=2;V<arguments.length;V++)x+="&args[]="+encodeURIComponent(arguments[V])}return"Minified React error #"+S+"; visit "+x+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function L(){}var _={d:{f:L,r:function(){throw Error(M(522))},D:L,C:L,L,m:L,X:L,S:L,M:L},p:0,findDOMNode:null},D=Symbol.for("react.portal");function N(S,x,V){var H=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:D,key:H==null?null:""+H,children:S,containerInfo:x,implementation:V}}var O=p.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function W(S,x){if(S==="font")return"";if(typeof x=="string")return x==="use-credentials"?x:""}return Ns.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=_,Ns.createPortal=function(S,x){var V=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!x||x.nodeType!==1&&x.nodeType!==9&&x.nodeType!==11)throw Error(M(299));return N(S,x,null,V)},Ns.flushSync=function(S){var x=O.T,V=_.p;try{if(O.T=null,_.p=2,S)return S()}finally{O.T=x,_.p=V,_.d.f()}},Ns.preconnect=function(S,x){typeof S=="string"&&(x?(x=x.crossOrigin,x=typeof x=="string"?x==="use-credentials"?x:"":void 0):x=null,_.d.C(S,x))},Ns.prefetchDNS=function(S){typeof S=="string"&&_.d.D(S)},Ns.preinit=function(S,x){if(typeof S=="string"&&x&&typeof x.as=="string"){var V=x.as,H=W(V,x.crossOrigin),I=typeof x.integrity=="string"?x.integrity:void 0,Bs=typeof x.fetchPriority=="string"?x.fetchPriority:void 0;V==="style"?_.d.S(S,typeof x.precedence=="string"?x.precedence:void 0,{crossOrigin:H,integrity:I,fetchPriority:Bs}):V==="script"&&_.d.X(S,{crossOrigin:H,integrity:I,fetchPriority:Bs,nonce:typeof x.nonce=="string"?x.nonce:void 0})}},Ns.preinitModule=function(S,x){if(typeof S=="string")if(typeof x=="object"&&x!==null){if(x.as==null||x.as==="script"){var V=W(x.as,x.crossOrigin);_.d.M(S,{crossOrigin:V,integrity:typeof x.integrity=="string"?x.integrity:void 0,nonce:typeof x.nonce=="string"?x.nonce:void 0})}}else x==null&&_.d.M(S)},Ns.preload=function(S,x){if(typeof S=="string"&&typeof x=="object"&&x!==null&&typeof x.as=="string"){var V=x.as,H=W(V,x.crossOrigin);_.d.L(S,V,{crossOrigin:H,integrity:typeof x.integrity=="string"?x.integrity:void 0,nonce:typeof x.nonce=="string"?x.nonce:void 0,type:typeof x.type=="string"?x.type:void 0,fetchPriority:typeof x.fetchPriority=="string"?x.fetchPriority:void 0,referrerPolicy:typeof x.referrerPolicy=="string"?x.referrerPolicy:void 0,imageSrcSet:typeof x.imageSrcSet=="string"?x.imageSrcSet:void 0,imageSizes:typeof x.imageSizes=="string"?x.imageSizes:void 0,media:typeof x.media=="string"?x.media:void 0})}},Ns.preloadModule=function(S,x){if(typeof S=="string")if(x){var V=W(x.as,x.crossOrigin);_.d.m(S,{as:typeof x.as=="string"&&x.as!=="script"?x.as:void 0,crossOrigin:V,integrity:typeof x.integrity=="string"?x.integrity:void 0})}else _.d.m(S)},Ns.requestFormReset=function(S){_.d.r(S)},Ns.unstable_batchedUpdates=function(S,x){return S(x)},Ns.useFormState=function(S,x,V){return O.H.useFormState(S,x,V)},Ns.useFormStatus=function(){return O.H.useHostTransitionStatus()},Ns.version="19.2.7",Ns}var Sp;function c1(){if(Sp)return vo.exports;Sp=1;function p(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(p)}catch(M){console.error(M)}}return p(),vo.exports=o1(),vo.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mp;function r1(){if(Mp)return kn;Mp=1;var p=i1(),M=ho(),L=c1();function _(s){var e="https://react.dev/errors/"+s;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+s+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function D(s){return!(!s||s.nodeType!==1&&s.nodeType!==9&&s.nodeType!==11)}function N(s){var e=s,t=s;if(s.alternate)for(;e.return;)e=e.return;else{s=e;do e=s,(e.flags&4098)!==0&&(t=e.return),s=e.return;while(s)}return e.tag===3?t:null}function O(s){if(s.tag===13){var e=s.memoizedState;if(e===null&&(s=s.alternate,s!==null&&(e=s.memoizedState)),e!==null)return e.dehydrated}return null}function W(s){if(s.tag===31){var e=s.memoizedState;if(e===null&&(s=s.alternate,s!==null&&(e=s.memoizedState)),e!==null)return e.dehydrated}return null}function S(s){if(N(s)!==s)throw Error(_(188))}function x(s){var e=s.alternate;if(!e){if(e=N(s),e===null)throw Error(_(188));return e!==s?null:s}for(var t=s,a=e;;){var n=t.return;if(n===null)break;var l=n.alternate;if(l===null){if(a=n.return,a!==null){t=a;continue}break}if(n.child===l.child){for(l=n.child;l;){if(l===t)return S(n),s;if(l===a)return S(n),e;l=l.sibling}throw Error(_(188))}if(t.return!==a.return)t=n,a=l;else{for(var i=!1,d=n.child;d;){if(d===t){i=!0,t=n,a=l;break}if(d===a){i=!0,a=n,t=l;break}d=d.sibling}if(!i){for(d=l.child;d;){if(d===t){i=!0,t=l,a=n;break}if(d===a){i=!0,a=l,t=n;break}d=d.sibling}if(!i)throw Error(_(189))}}if(t.alternate!==a)throw Error(_(190))}if(t.tag!==3)throw Error(_(188));return t.stateNode.current===t?s:e}function V(s){var e=s.tag;if(e===5||e===26||e===27||e===6)return s;for(s=s.child;s!==null;){if(e=V(s),e!==null)return e;s=s.sibling}return null}var H=Object.assign,I=Symbol.for("react.element"),Bs=Symbol.for("react.transitional.element"),Rs=Symbol.for("react.portal"),Hs=Symbol.for("react.fragment"),Te=Symbol.for("react.strict_mode"),Ws=Symbol.for("react.profiler"),Je=Symbol.for("react.consumer"),zs=Symbol.for("react.context"),de=Symbol.for("react.forward_ref"),ye=Symbol.for("react.suspense"),Us=Symbol.for("react.suspense_list"),P=Symbol.for("react.memo"),qs=Symbol.for("react.lazy"),xe=Symbol.for("react.activity"),qt=Symbol.for("react.memo_cache_sentinel"),Ce=Symbol.iterator;function Zs(s){return s===null||typeof s!="object"?null:(s=Ce&&s[Ce]||s["@@iterator"],typeof s=="function"?s:null)}var kt=Symbol.for("react.client.reference");function Ee(s){if(s==null)return null;if(typeof s=="function")return s.$$typeof===kt?null:s.displayName||s.name||null;if(typeof s=="string")return s;switch(s){case Hs:return"Fragment";case Ws:return"Profiler";case Te:return"StrictMode";case ye:return"Suspense";case Us:return"SuspenseList";case xe:return"Activity"}if(typeof s=="object")switch(s.$$typeof){case Rs:return"Portal";case zs:return s.displayName||"Context";case Je:return(s._context.displayName||"Context")+".Consumer";case de:var e=s.render;return s=s.displayName,s||(s=e.displayName||e.name||"",s=s!==""?"ForwardRef("+s+")":"ForwardRef"),s;case P:return e=s.displayName||null,e!==null?e:Ee(s.type)||"Memo";case qs:e=s._payload,s=s._init;try{return Ee(s(e))}catch{}}return null}var be=Array.isArray,w=M.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,T=L.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,U={pending:!1,data:null,method:null,action:null},is=[],rs=-1;function u(s){return{current:s}}function C(s){0>rs||(s.current=is[rs],is[rs]=null,rs--)}function E(s,e){rs++,is[rs]=s.current,s.current=e}var B=u(null),Z=u(null),X=u(null),as=u(null);function Os(s,e){switch(E(X,e),E(Z,s),E(B,null),e.nodeType){case 9:case 11:s=(s=e.documentElement)&&(s=s.namespaceURI)?qu(s):0;break;default:if(s=e.tagName,e=e.namespaceURI)e=qu(e),s=Zu(e,s);else switch(s){case"svg":s=1;break;case"math":s=2;break;default:s=0}}C(B),E(B,s)}function gs(){C(B),C(Z),C(X)}function Ma(s){s.memoizedState!==null&&E(as,s);var e=B.current,t=Zu(e,s.type);e!==t&&(E(Z,s),E(B,t))}function yn(s){Z.current===s&&(C(B),C(Z)),as.current===s&&(C(as),hn._currentValue=U)}var Yl,go;function yt(s){if(Yl===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);Yl=e&&e[1]||"",go=-1<t.stack.indexOf(`
    at`)?" (<anonymous>)":-1<t.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Yl+s+go}var Gl=!1;function Xl(s,e){if(!s||Gl)return"";Gl=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(e){var y=function(){throw Error()};if(Object.defineProperty(y.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(y,[])}catch(b){var g=b}Reflect.construct(s,[],y)}else{try{y.call()}catch(b){g=b}s.call(y.prototype)}}else{try{throw Error()}catch(b){g=b}(y=s())&&typeof y.catch=="function"&&y.catch(function(){})}}catch(b){if(b&&g&&typeof b.stack=="string")return[b.stack,g.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var n=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");n&&n.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var l=a.DetermineComponentFrameRoot(),i=l[0],d=l[1];if(i&&d){var o=i.split(`
`),h=d.split(`
`);for(n=a=0;a<o.length&&!o[a].includes("DetermineComponentFrameRoot");)a++;for(;n<h.length&&!h[n].includes("DetermineComponentFrameRoot");)n++;if(a===o.length||n===h.length)for(a=o.length-1,n=h.length-1;1<=a&&0<=n&&o[a]!==h[n];)n--;for(;1<=a&&0<=n;a--,n--)if(o[a]!==h[n]){if(a!==1||n!==1)do if(a--,n--,0>n||o[a]!==h[n]){var m=`
`+o[a].replace(" at new "," at ");return s.displayName&&m.includes("<anonymous>")&&(m=m.replace("<anonymous>",s.displayName)),m}while(1<=a&&0<=n);break}}}finally{Gl=!1,Error.prepareStackTrace=t}return(t=s?s.displayName||s.name:"")?yt(t):""}function Np(s,e){switch(s.tag){case 26:case 27:case 5:return yt(s.type);case 16:return yt("Lazy");case 13:return s.child!==e&&e!==null?yt("Suspense Fallback"):yt("Suspense");case 19:return yt("SuspenseList");case 0:case 15:return Xl(s.type,!1);case 11:return Xl(s.type.render,!1);case 1:return Xl(s.type,!0);case 31:return yt("Activity");default:return""}}function bo(s){try{var e="",t=null;do e+=Np(s,t),t=s,s=s.return;while(s);return e}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var Ql=Object.prototype.hasOwnProperty,Kl=p.unstable_scheduleCallback,Fl=p.unstable_cancelCallback,Hp=p.unstable_shouldYield,Op=p.unstable_requestPaint,Is=p.unstable_now,jp=p.unstable_getCurrentPriorityLevel,mo=p.unstable_ImmediatePriority,wo=p.unstable_UserBlockingPriority,xn=p.unstable_NormalPriority,Vp=p.unstable_LowPriority,ko=p.unstable_IdlePriority,Rp=p.log,Up=p.unstable_setDisableYieldValue,Da=null,Ps=null;function We(s){if(typeof Rp=="function"&&Up(s),Ps&&typeof Ps.setStrictMode=="function")try{Ps.setStrictMode(Da,s)}catch{}}var $s=Math.clz32?Math.clz32:Yp,qp=Math.log,Zp=Math.LN2;function Yp(s){return s>>>=0,s===0?32:31-(qp(s)/Zp|0)|0}var Cn=256,Sn=262144,Mn=4194304;function xt(s){var e=s&42;if(e!==0)return e;switch(s&-s){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return s&261888;case 262144:case 524288:case 1048576:case 2097152:return s&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return s&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return s}}function Dn(s,e,t){var a=s.pendingLanes;if(a===0)return 0;var n=0,l=s.suspendedLanes,i=s.pingedLanes;s=s.warmLanes;var d=a&134217727;return d!==0?(a=d&~l,a!==0?n=xt(a):(i&=d,i!==0?n=xt(i):t||(t=d&~s,t!==0&&(n=xt(t))))):(d=a&~l,d!==0?n=xt(d):i!==0?n=xt(i):t||(t=a&~s,t!==0&&(n=xt(t)))),n===0?0:e!==0&&e!==n&&(e&l)===0&&(l=n&-n,t=e&-e,l>=t||l===32&&(t&4194048)!==0)?e:n}function La(s,e){return(s.pendingLanes&~(s.suspendedLanes&~s.pingedLanes)&e)===0}function Gp(s,e){switch(s){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function yo(){var s=Mn;return Mn<<=1,(Mn&62914560)===0&&(Mn=4194304),s}function Jl(s){for(var e=[],t=0;31>t;t++)e.push(s);return e}function Ta(s,e){s.pendingLanes|=e,e!==268435456&&(s.suspendedLanes=0,s.pingedLanes=0,s.warmLanes=0)}function Xp(s,e,t,a,n,l){var i=s.pendingLanes;s.pendingLanes=t,s.suspendedLanes=0,s.pingedLanes=0,s.warmLanes=0,s.expiredLanes&=t,s.entangledLanes&=t,s.errorRecoveryDisabledLanes&=t,s.shellSuspendCounter=0;var d=s.entanglements,o=s.expirationTimes,h=s.hiddenUpdates;for(t=i&~t;0<t;){var m=31-$s(t),y=1<<m;d[m]=0,o[m]=-1;var g=h[m];if(g!==null)for(h[m]=null,m=0;m<g.length;m++){var b=g[m];b!==null&&(b.lane&=-536870913)}t&=~y}a!==0&&xo(s,a,0),l!==0&&n===0&&s.tag!==0&&(s.suspendedLanes|=l&~(i&~e))}function xo(s,e,t){s.pendingLanes|=e,s.suspendedLanes&=~e;var a=31-$s(e);s.entangledLanes|=e,s.entanglements[a]=s.entanglements[a]|1073741824|t&261930}function Co(s,e){var t=s.entangledLanes|=e;for(s=s.entanglements;t;){var a=31-$s(t),n=1<<a;n&e|s[a]&e&&(s[a]|=e),t&=~n}}function So(s,e){var t=e&-e;return t=(t&42)!==0?1:Wl(t),(t&(s.suspendedLanes|e))!==0?0:t}function Wl(s){switch(s){case 2:s=1;break;case 8:s=4;break;case 32:s=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:s=128;break;case 268435456:s=134217728;break;default:s=0}return s}function Il(s){return s&=-s,2<s?8<s?(s&134217727)!==0?32:268435456:8:2}function Mo(){var s=T.p;return s!==0?s:(s=window.event,s===void 0?32:up(s.type))}function Do(s,e){var t=T.p;try{return T.p=s,e()}finally{T.p=t}}var Ie=Math.random().toString(36).slice(2),Ds="__reactFiber$"+Ie,Ys="__reactProps$"+Ie,Zt="__reactContainer$"+Ie,Pl="__reactEvents$"+Ie,Qp="__reactListeners$"+Ie,Kp="__reactHandles$"+Ie,Lo="__reactResources$"+Ie,Ea="__reactMarker$"+Ie;function $l(s){delete s[Ds],delete s[Ys],delete s[Pl],delete s[Qp],delete s[Kp]}function Yt(s){var e=s[Ds];if(e)return e;for(var t=s.parentNode;t;){if(e=t[Zt]||t[Ds]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(s=Ju(s);s!==null;){if(t=s[Ds])return t;s=Ju(s)}return e}s=t,t=s.parentNode}return null}function Gt(s){if(s=s[Ds]||s[Zt]){var e=s.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return s}return null}function Aa(s){var e=s.tag;if(e===5||e===26||e===27||e===6)return s.stateNode;throw Error(_(33))}function Xt(s){var e=s[Lo];return e||(e=s[Lo]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Ss(s){s[Ea]=!0}var To=new Set,Eo={};function Ct(s,e){Qt(s,e),Qt(s+"Capture",e)}function Qt(s,e){for(Eo[s]=e,s=0;s<e.length;s++)To.add(e[s])}var Fp=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Ao={},Bo={};function Jp(s){return Ql.call(Bo,s)?!0:Ql.call(Ao,s)?!1:Fp.test(s)?Bo[s]=!0:(Ao[s]=!0,!1)}function Ln(s,e,t){if(Jp(e))if(t===null)s.removeAttribute(e);else{switch(typeof t){case"undefined":case"function":case"symbol":s.removeAttribute(e);return;case"boolean":var a=e.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){s.removeAttribute(e);return}}s.setAttribute(e,""+t)}}function Tn(s,e,t){if(t===null)s.removeAttribute(e);else{switch(typeof t){case"undefined":case"function":case"symbol":case"boolean":s.removeAttribute(e);return}s.setAttribute(e,""+t)}}function Ae(s,e,t,a){if(a===null)s.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":s.removeAttribute(t);return}s.setAttributeNS(e,t,""+a)}}function oe(s){switch(typeof s){case"bigint":case"boolean":case"number":case"string":case"undefined":return s;case"object":return s;default:return""}}function zo(s){var e=s.type;return(s=s.nodeName)&&s.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Wp(s,e,t){var a=Object.getOwnPropertyDescriptor(s.constructor.prototype,e);if(!s.hasOwnProperty(e)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var n=a.get,l=a.set;return Object.defineProperty(s,e,{configurable:!0,get:function(){return n.call(this)},set:function(i){t=""+i,l.call(this,i)}}),Object.defineProperty(s,e,{enumerable:a.enumerable}),{getValue:function(){return t},setValue:function(i){t=""+i},stopTracking:function(){s._valueTracker=null,delete s[e]}}}}function si(s){if(!s._valueTracker){var e=zo(s)?"checked":"value";s._valueTracker=Wp(s,e,""+s[e])}}function No(s){if(!s)return!1;var e=s._valueTracker;if(!e)return!0;var t=e.getValue(),a="";return s&&(a=zo(s)?s.checked?"true":"false":s.value),s=a,s!==t?(e.setValue(s),!0):!1}function En(s){if(s=s||(typeof document<"u"?document:void 0),typeof s>"u")return null;try{return s.activeElement||s.body}catch{return s.body}}var Ip=/[\n"\\]/g;function ce(s){return s.replace(Ip,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function ei(s,e,t,a,n,l,i,d){s.name="",i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"?s.type=i:s.removeAttribute("type"),e!=null?i==="number"?(e===0&&s.value===""||s.value!=e)&&(s.value=""+oe(e)):s.value!==""+oe(e)&&(s.value=""+oe(e)):i!=="submit"&&i!=="reset"||s.removeAttribute("value"),e!=null?ti(s,i,oe(e)):t!=null?ti(s,i,oe(t)):a!=null&&s.removeAttribute("value"),n==null&&l!=null&&(s.defaultChecked=!!l),n!=null&&(s.checked=n&&typeof n!="function"&&typeof n!="symbol"),d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"?s.name=""+oe(d):s.removeAttribute("name")}function Ho(s,e,t,a,n,l,i,d){if(l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"&&(s.type=l),e!=null||t!=null){if(!(l!=="submit"&&l!=="reset"||e!=null)){si(s);return}t=t!=null?""+oe(t):"",e=e!=null?""+oe(e):t,d||e===s.value||(s.value=e),s.defaultValue=e}a=a??n,a=typeof a!="function"&&typeof a!="symbol"&&!!a,s.checked=d?s.checked:!!a,s.defaultChecked=!!a,i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(s.name=i),si(s)}function ti(s,e,t){e==="number"&&En(s.ownerDocument)===s||s.defaultValue===""+t||(s.defaultValue=""+t)}function Kt(s,e,t,a){if(s=s.options,e){e={};for(var n=0;n<t.length;n++)e["$"+t[n]]=!0;for(t=0;t<s.length;t++)n=e.hasOwnProperty("$"+s[t].value),s[t].selected!==n&&(s[t].selected=n),n&&a&&(s[t].defaultSelected=!0)}else{for(t=""+oe(t),e=null,n=0;n<s.length;n++){if(s[n].value===t){s[n].selected=!0,a&&(s[n].defaultSelected=!0);return}e!==null||s[n].disabled||(e=s[n])}e!==null&&(e.selected=!0)}}function Oo(s,e,t){if(e!=null&&(e=""+oe(e),e!==s.value&&(s.value=e),t==null)){s.defaultValue!==e&&(s.defaultValue=e);return}s.defaultValue=t!=null?""+oe(t):""}function jo(s,e,t,a){if(e==null){if(a!=null){if(t!=null)throw Error(_(92));if(be(a)){if(1<a.length)throw Error(_(93));a=a[0]}t=a}t==null&&(t=""),e=t}t=oe(e),s.defaultValue=t,a=s.textContent,a===t&&a!==""&&a!==null&&(s.value=a),si(s)}function Ft(s,e){if(e){var t=s.firstChild;if(t&&t===s.lastChild&&t.nodeType===3){t.nodeValue=e;return}}s.textContent=e}var Pp=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Vo(s,e,t){var a=e.indexOf("--")===0;t==null||typeof t=="boolean"||t===""?a?s.setProperty(e,""):e==="float"?s.cssFloat="":s[e]="":a?s.setProperty(e,t):typeof t!="number"||t===0||Pp.has(e)?e==="float"?s.cssFloat=t:s[e]=(""+t).trim():s[e]=t+"px"}function Ro(s,e,t){if(e!=null&&typeof e!="object")throw Error(_(62));if(s=s.style,t!=null){for(var a in t)!t.hasOwnProperty(a)||e!=null&&e.hasOwnProperty(a)||(a.indexOf("--")===0?s.setProperty(a,""):a==="float"?s.cssFloat="":s[a]="");for(var n in e)a=e[n],e.hasOwnProperty(n)&&t[n]!==a&&Vo(s,n,a)}else for(var l in e)e.hasOwnProperty(l)&&Vo(s,l,e[l])}function ai(s){if(s.indexOf("-")===-1)return!1;switch(s){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var $p=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),sv=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function An(s){return sv.test(""+s)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":s}function Be(){}var ni=null;function li(s){return s=s.target||s.srcElement||window,s.correspondingUseElement&&(s=s.correspondingUseElement),s.nodeType===3?s.parentNode:s}var Jt=null,Wt=null;function Uo(s){var e=Gt(s);if(e&&(s=e.stateNode)){var t=s[Ys]||null;s:switch(s=e.stateNode,e.type){case"input":if(ei(s,t.value,t.defaultValue,t.defaultValue,t.checked,t.defaultChecked,t.type,t.name),e=t.name,t.type==="radio"&&e!=null){for(t=s;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll('input[name="'+ce(""+e)+'"][type="radio"]'),e=0;e<t.length;e++){var a=t[e];if(a!==s&&a.form===s.form){var n=a[Ys]||null;if(!n)throw Error(_(90));ei(a,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name)}}for(e=0;e<t.length;e++)a=t[e],a.form===s.form&&No(a)}break s;case"textarea":Oo(s,t.value,t.defaultValue);break s;case"select":e=t.value,e!=null&&Kt(s,!!t.multiple,e,!1)}}}var ii=!1;function qo(s,e,t){if(ii)return s(e,t);ii=!0;try{var a=s(e);return a}finally{if(ii=!1,(Jt!==null||Wt!==null)&&(bl(),Jt&&(e=Jt,s=Wt,Wt=Jt=null,Uo(e),s)))for(e=0;e<s.length;e++)Uo(s[e])}}function Ba(s,e){var t=s.stateNode;if(t===null)return null;var a=t[Ys]||null;if(a===null)return null;t=a[e];s:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(s=s.type,a=!(s==="button"||s==="input"||s==="select"||s==="textarea")),s=!a;break s;default:s=!1}if(s)return null;if(t&&typeof t!="function")throw Error(_(231,e,typeof t));return t}var ze=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),di=!1;if(ze)try{var za={};Object.defineProperty(za,"passive",{get:function(){di=!0}}),window.addEventListener("test",za,za),window.removeEventListener("test",za,za)}catch{di=!1}var Pe=null,oi=null,Bn=null;function Zo(){if(Bn)return Bn;var s,e=oi,t=e.length,a,n="value"in Pe?Pe.value:Pe.textContent,l=n.length;for(s=0;s<t&&e[s]===n[s];s++);var i=t-s;for(a=1;a<=i&&e[t-a]===n[l-a];a++);return Bn=n.slice(s,1<a?1-a:void 0)}function zn(s){var e=s.keyCode;return"charCode"in s?(s=s.charCode,s===0&&e===13&&(s=13)):s=e,s===10&&(s=13),32<=s||s===13?s:0}function Nn(){return!0}function Yo(){return!1}function Gs(s){function e(t,a,n,l,i){this._reactName=t,this._targetInst=n,this.type=a,this.nativeEvent=l,this.target=i,this.currentTarget=null;for(var d in s)s.hasOwnProperty(d)&&(t=s[d],this[d]=t?t(l):l[d]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Nn:Yo,this.isPropagationStopped=Yo,this}return H(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Nn)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Nn)},persist:function(){},isPersistent:Nn}),e}var St={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(s){return s.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Hn=Gs(St),Na=H({},St,{view:0,detail:0}),ev=Gs(Na),ci,ri,Ha,On=H({},Na,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:pi,button:0,buttons:0,relatedTarget:function(s){return s.relatedTarget===void 0?s.fromElement===s.srcElement?s.toElement:s.fromElement:s.relatedTarget},movementX:function(s){return"movementX"in s?s.movementX:(s!==Ha&&(Ha&&s.type==="mousemove"?(ci=s.screenX-Ha.screenX,ri=s.screenY-Ha.screenY):ri=ci=0,Ha=s),ci)},movementY:function(s){return"movementY"in s?s.movementY:ri}}),Go=Gs(On),tv=H({},On,{dataTransfer:0}),av=Gs(tv),nv=H({},Na,{relatedTarget:0}),ui=Gs(nv),lv=H({},St,{animationName:0,elapsedTime:0,pseudoElement:0}),iv=Gs(lv),dv=H({},St,{clipboardData:function(s){return"clipboardData"in s?s.clipboardData:window.clipboardData}}),ov=Gs(dv),cv=H({},St,{data:0}),Xo=Gs(cv),rv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},uv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},pv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function vv(s){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(s):(s=pv[s])?!!e[s]:!1}function pi(){return vv}var _v=H({},Na,{key:function(s){if(s.key){var e=rv[s.key]||s.key;if(e!=="Unidentified")return e}return s.type==="keypress"?(s=zn(s),s===13?"Enter":String.fromCharCode(s)):s.type==="keydown"||s.type==="keyup"?uv[s.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:pi,charCode:function(s){return s.type==="keypress"?zn(s):0},keyCode:function(s){return s.type==="keydown"||s.type==="keyup"?s.keyCode:0},which:function(s){return s.type==="keypress"?zn(s):s.type==="keydown"||s.type==="keyup"?s.keyCode:0}}),fv=Gs(_v),hv=H({},On,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Qo=Gs(hv),gv=H({},Na,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:pi}),bv=Gs(gv),mv=H({},St,{propertyName:0,elapsedTime:0,pseudoElement:0}),wv=Gs(mv),kv=H({},On,{deltaX:function(s){return"deltaX"in s?s.deltaX:"wheelDeltaX"in s?-s.wheelDeltaX:0},deltaY:function(s){return"deltaY"in s?s.deltaY:"wheelDeltaY"in s?-s.wheelDeltaY:"wheelDelta"in s?-s.wheelDelta:0},deltaZ:0,deltaMode:0}),yv=Gs(kv),xv=H({},St,{newState:0,oldState:0}),Cv=Gs(xv),Sv=[9,13,27,32],vi=ze&&"CompositionEvent"in window,Oa=null;ze&&"documentMode"in document&&(Oa=document.documentMode);var Mv=ze&&"TextEvent"in window&&!Oa,Ko=ze&&(!vi||Oa&&8<Oa&&11>=Oa),Fo=" ",Jo=!1;function Wo(s,e){switch(s){case"keyup":return Sv.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Io(s){return s=s.detail,typeof s=="object"&&"data"in s?s.data:null}var It=!1;function Dv(s,e){switch(s){case"compositionend":return Io(e);case"keypress":return e.which!==32?null:(Jo=!0,Fo);case"textInput":return s=e.data,s===Fo&&Jo?null:s;default:return null}}function Lv(s,e){if(It)return s==="compositionend"||!vi&&Wo(s,e)?(s=Zo(),Bn=oi=Pe=null,It=!1,s):null;switch(s){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Ko&&e.locale!=="ko"?null:e.data;default:return null}}var Tv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Po(s){var e=s&&s.nodeName&&s.nodeName.toLowerCase();return e==="input"?!!Tv[s.type]:e==="textarea"}function $o(s,e,t,a){Jt?Wt?Wt.push(a):Wt=[a]:Jt=a,e=Sl(e,"onChange"),0<e.length&&(t=new Hn("onChange","change",null,t,a),s.push({event:t,listeners:e}))}var ja=null,Va=null;function Ev(s){Hu(s,0)}function jn(s){var e=Aa(s);if(No(e))return s}function sc(s,e){if(s==="change")return e}var ec=!1;if(ze){var _i;if(ze){var fi="oninput"in document;if(!fi){var tc=document.createElement("div");tc.setAttribute("oninput","return;"),fi=typeof tc.oninput=="function"}_i=fi}else _i=!1;ec=_i&&(!document.documentMode||9<document.documentMode)}function ac(){ja&&(ja.detachEvent("onpropertychange",nc),Va=ja=null)}function nc(s){if(s.propertyName==="value"&&jn(Va)){var e=[];$o(e,Va,s,li(s)),qo(Ev,e)}}function Av(s,e,t){s==="focusin"?(ac(),ja=e,Va=t,ja.attachEvent("onpropertychange",nc)):s==="focusout"&&ac()}function Bv(s){if(s==="selectionchange"||s==="keyup"||s==="keydown")return jn(Va)}function zv(s,e){if(s==="click")return jn(e)}function Nv(s,e){if(s==="input"||s==="change")return jn(e)}function Hv(s,e){return s===e&&(s!==0||1/s===1/e)||s!==s&&e!==e}var se=typeof Object.is=="function"?Object.is:Hv;function Ra(s,e){if(se(s,e))return!0;if(typeof s!="object"||s===null||typeof e!="object"||e===null)return!1;var t=Object.keys(s),a=Object.keys(e);if(t.length!==a.length)return!1;for(a=0;a<t.length;a++){var n=t[a];if(!Ql.call(e,n)||!se(s[n],e[n]))return!1}return!0}function lc(s){for(;s&&s.firstChild;)s=s.firstChild;return s}function ic(s,e){var t=lc(s);s=0;for(var a;t;){if(t.nodeType===3){if(a=s+t.textContent.length,s<=e&&a>=e)return{node:t,offset:e-s};s=a}s:{for(;t;){if(t.nextSibling){t=t.nextSibling;break s}t=t.parentNode}t=void 0}t=lc(t)}}function dc(s,e){return s&&e?s===e?!0:s&&s.nodeType===3?!1:e&&e.nodeType===3?dc(s,e.parentNode):"contains"in s?s.contains(e):s.compareDocumentPosition?!!(s.compareDocumentPosition(e)&16):!1:!1}function oc(s){s=s!=null&&s.ownerDocument!=null&&s.ownerDocument.defaultView!=null?s.ownerDocument.defaultView:window;for(var e=En(s.document);e instanceof s.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)s=e.contentWindow;else break;e=En(s.document)}return e}function hi(s){var e=s&&s.nodeName&&s.nodeName.toLowerCase();return e&&(e==="input"&&(s.type==="text"||s.type==="search"||s.type==="tel"||s.type==="url"||s.type==="password")||e==="textarea"||s.contentEditable==="true")}var Ov=ze&&"documentMode"in document&&11>=document.documentMode,Pt=null,gi=null,Ua=null,bi=!1;function cc(s,e,t){var a=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;bi||Pt==null||Pt!==En(a)||(a=Pt,"selectionStart"in a&&hi(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Ua&&Ra(Ua,a)||(Ua=a,a=Sl(gi,"onSelect"),0<a.length&&(e=new Hn("onSelect","select",null,e,t),s.push({event:e,listeners:a}),e.target=Pt)))}function Mt(s,e){var t={};return t[s.toLowerCase()]=e.toLowerCase(),t["Webkit"+s]="webkit"+e,t["Moz"+s]="moz"+e,t}var $t={animationend:Mt("Animation","AnimationEnd"),animationiteration:Mt("Animation","AnimationIteration"),animationstart:Mt("Animation","AnimationStart"),transitionrun:Mt("Transition","TransitionRun"),transitionstart:Mt("Transition","TransitionStart"),transitioncancel:Mt("Transition","TransitionCancel"),transitionend:Mt("Transition","TransitionEnd")},mi={},rc={};ze&&(rc=document.createElement("div").style,"AnimationEvent"in window||(delete $t.animationend.animation,delete $t.animationiteration.animation,delete $t.animationstart.animation),"TransitionEvent"in window||delete $t.transitionend.transition);function Dt(s){if(mi[s])return mi[s];if(!$t[s])return s;var e=$t[s],t;for(t in e)if(e.hasOwnProperty(t)&&t in rc)return mi[s]=e[t];return s}var uc=Dt("animationend"),pc=Dt("animationiteration"),vc=Dt("animationstart"),jv=Dt("transitionrun"),Vv=Dt("transitionstart"),Rv=Dt("transitioncancel"),_c=Dt("transitionend"),fc=new Map,wi="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");wi.push("scrollEnd");function me(s,e){fc.set(s,e),Ct(e,[s])}var Vn=typeof reportError=="function"?reportError:function(s){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof s=="object"&&s!==null&&typeof s.message=="string"?String(s.message):String(s),error:s});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",s);return}console.error(s)},re=[],sa=0,ki=0;function Rn(){for(var s=sa,e=ki=sa=0;e<s;){var t=re[e];re[e++]=null;var a=re[e];re[e++]=null;var n=re[e];re[e++]=null;var l=re[e];if(re[e++]=null,a!==null&&n!==null){var i=a.pending;i===null?n.next=n:(n.next=i.next,i.next=n),a.pending=n}l!==0&&hc(t,n,l)}}function Un(s,e,t,a){re[sa++]=s,re[sa++]=e,re[sa++]=t,re[sa++]=a,ki|=a,s.lanes|=a,s=s.alternate,s!==null&&(s.lanes|=a)}function yi(s,e,t,a){return Un(s,e,t,a),qn(s)}function Lt(s,e){return Un(s,null,null,e),qn(s)}function hc(s,e,t){s.lanes|=t;var a=s.alternate;a!==null&&(a.lanes|=t);for(var n=!1,l=s.return;l!==null;)l.childLanes|=t,a=l.alternate,a!==null&&(a.childLanes|=t),l.tag===22&&(s=l.stateNode,s===null||s._visibility&1||(n=!0)),s=l,l=l.return;return s.tag===3?(l=s.stateNode,n&&e!==null&&(n=31-$s(t),s=l.hiddenUpdates,a=s[n],a===null?s[n]=[e]:a.push(e),e.lane=t|536870912),l):null}function qn(s){if(50<cn)throw cn=0,Ad=null,Error(_(185));for(var e=s.return;e!==null;)s=e,e=s.return;return s.tag===3?s.stateNode:null}var ea={};function Uv(s,e,t,a){this.tag=s,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ee(s,e,t,a){return new Uv(s,e,t,a)}function xi(s){return s=s.prototype,!(!s||!s.isReactComponent)}function Ne(s,e){var t=s.alternate;return t===null?(t=ee(s.tag,e,s.key,s.mode),t.elementType=s.elementType,t.type=s.type,t.stateNode=s.stateNode,t.alternate=s,s.alternate=t):(t.pendingProps=e,t.type=s.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=s.flags&65011712,t.childLanes=s.childLanes,t.lanes=s.lanes,t.child=s.child,t.memoizedProps=s.memoizedProps,t.memoizedState=s.memoizedState,t.updateQueue=s.updateQueue,e=s.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=s.sibling,t.index=s.index,t.ref=s.ref,t.refCleanup=s.refCleanup,t}function gc(s,e){s.flags&=65011714;var t=s.alternate;return t===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=t.childLanes,s.lanes=t.lanes,s.child=t.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=t.memoizedProps,s.memoizedState=t.memoizedState,s.updateQueue=t.updateQueue,s.type=t.type,e=t.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),s}function Zn(s,e,t,a,n,l){var i=0;if(a=s,typeof s=="function")xi(s)&&(i=1);else if(typeof s=="string")i=X_(s,t,B.current)?26:s==="html"||s==="head"||s==="body"?27:5;else s:switch(s){case xe:return s=ee(31,t,e,n),s.elementType=xe,s.lanes=l,s;case Hs:return Tt(t.children,n,l,e);case Te:i=8,n|=24;break;case Ws:return s=ee(12,t,e,n|2),s.elementType=Ws,s.lanes=l,s;case ye:return s=ee(13,t,e,n),s.elementType=ye,s.lanes=l,s;case Us:return s=ee(19,t,e,n),s.elementType=Us,s.lanes=l,s;default:if(typeof s=="object"&&s!==null)switch(s.$$typeof){case zs:i=10;break s;case Je:i=9;break s;case de:i=11;break s;case P:i=14;break s;case qs:i=16,a=null;break s}i=29,t=Error(_(130,s===null?"null":typeof s,"")),a=null}return e=ee(i,t,e,n),e.elementType=s,e.type=a,e.lanes=l,e}function Tt(s,e,t,a){return s=ee(7,s,a,e),s.lanes=t,s}function Ci(s,e,t){return s=ee(6,s,null,e),s.lanes=t,s}function bc(s){var e=ee(18,null,null,0);return e.stateNode=s,e}function Si(s,e,t){return e=ee(4,s.children!==null?s.children:[],s.key,e),e.lanes=t,e.stateNode={containerInfo:s.containerInfo,pendingChildren:null,implementation:s.implementation},e}var mc=new WeakMap;function ue(s,e){if(typeof s=="object"&&s!==null){var t=mc.get(s);return t!==void 0?t:(e={value:s,source:e,stack:bo(e)},mc.set(s,e),e)}return{value:s,source:e,stack:bo(e)}}var ta=[],aa=0,Yn=null,qa=0,pe=[],ve=0,$e=null,Se=1,Me="";function He(s,e){ta[aa++]=qa,ta[aa++]=Yn,Yn=s,qa=e}function wc(s,e,t){pe[ve++]=Se,pe[ve++]=Me,pe[ve++]=$e,$e=s;var a=Se;s=Me;var n=32-$s(a)-1;a&=~(1<<n),t+=1;var l=32-$s(e)+n;if(30<l){var i=n-n%5;l=(a&(1<<i)-1).toString(32),a>>=i,n-=i,Se=1<<32-$s(e)+n|t<<n|a,Me=l+s}else Se=1<<l|t<<n|a,Me=s}function Mi(s){s.return!==null&&(He(s,1),wc(s,1,0))}function Di(s){for(;s===Yn;)Yn=ta[--aa],ta[aa]=null,qa=ta[--aa],ta[aa]=null;for(;s===$e;)$e=pe[--ve],pe[ve]=null,Me=pe[--ve],pe[ve]=null,Se=pe[--ve],pe[ve]=null}function kc(s,e){pe[ve++]=Se,pe[ve++]=Me,pe[ve++]=$e,Se=e.id,Me=e.overflow,$e=s}var Ls=null,ps=null,$=!1,st=null,_e=!1,Li=Error(_(519));function et(s){var e=Error(_(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Za(ue(e,s)),Li}function yc(s){var e=s.stateNode,t=s.type,a=s.memoizedProps;switch(e[Ds]=s,e[Ys]=a,t){case"dialog":K("cancel",e),K("close",e);break;case"iframe":case"object":case"embed":K("load",e);break;case"video":case"audio":for(t=0;t<un.length;t++)K(un[t],e);break;case"source":K("error",e);break;case"img":case"image":case"link":K("error",e),K("load",e);break;case"details":K("toggle",e);break;case"input":K("invalid",e),Ho(e,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":K("invalid",e);break;case"textarea":K("invalid",e),jo(e,a.value,a.defaultValue,a.children)}t=a.children,typeof t!="string"&&typeof t!="number"&&typeof t!="bigint"||e.textContent===""+t||a.suppressHydrationWarning===!0||Ru(e.textContent,t)?(a.popover!=null&&(K("beforetoggle",e),K("toggle",e)),a.onScroll!=null&&K("scroll",e),a.onScrollEnd!=null&&K("scrollend",e),a.onClick!=null&&(e.onclick=Be),e=!0):e=!1,e||et(s,!0)}function xc(s){for(Ls=s.return;Ls;)switch(Ls.tag){case 5:case 31:case 13:_e=!1;return;case 27:case 3:_e=!0;return;default:Ls=Ls.return}}function na(s){if(s!==Ls)return!1;if(!$)return xc(s),$=!0,!1;var e=s.tag,t;if((t=e!==3&&e!==27)&&((t=e===5)&&(t=s.type,t=!(t!=="form"&&t!=="button")||Qd(s.type,s.memoizedProps)),t=!t),t&&ps&&et(s),xc(s),e===13){if(s=s.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(_(317));ps=Fu(s)}else if(e===31){if(s=s.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(_(317));ps=Fu(s)}else e===27?(e=ps,ft(s.type)?(s=Id,Id=null,ps=s):ps=e):ps=Ls?he(s.stateNode.nextSibling):null;return!0}function Et(){ps=Ls=null,$=!1}function Ti(){var s=st;return s!==null&&(Fs===null?Fs=s:Fs.push.apply(Fs,s),st=null),s}function Za(s){st===null?st=[s]:st.push(s)}var Ei=u(null),At=null,Oe=null;function tt(s,e,t){E(Ei,e._currentValue),e._currentValue=t}function je(s){s._currentValue=Ei.current,C(Ei)}function Ai(s,e,t){for(;s!==null;){var a=s.alternate;if((s.childLanes&e)!==e?(s.childLanes|=e,a!==null&&(a.childLanes|=e)):a!==null&&(a.childLanes&e)!==e&&(a.childLanes|=e),s===t)break;s=s.return}}function Bi(s,e,t,a){var n=s.child;for(n!==null&&(n.return=s);n!==null;){var l=n.dependencies;if(l!==null){var i=n.child;l=l.firstContext;s:for(;l!==null;){var d=l;l=n;for(var o=0;o<e.length;o++)if(d.context===e[o]){l.lanes|=t,d=l.alternate,d!==null&&(d.lanes|=t),Ai(l.return,t,s),a||(i=null);break s}l=d.next}}else if(n.tag===18){if(i=n.return,i===null)throw Error(_(341));i.lanes|=t,l=i.alternate,l!==null&&(l.lanes|=t),Ai(i,t,s),i=null}else i=n.child;if(i!==null)i.return=n;else for(i=n;i!==null;){if(i===s){i=null;break}if(n=i.sibling,n!==null){n.return=i.return,i=n;break}i=i.return}n=i}}function la(s,e,t,a){s=null;for(var n=e,l=!1;n!==null;){if(!l){if((n.flags&524288)!==0)l=!0;else if((n.flags&262144)!==0)break}if(n.tag===10){var i=n.alternate;if(i===null)throw Error(_(387));if(i=i.memoizedProps,i!==null){var d=n.type;se(n.pendingProps.value,i.value)||(s!==null?s.push(d):s=[d])}}else if(n===as.current){if(i=n.alternate,i===null)throw Error(_(387));i.memoizedState.memoizedState!==n.memoizedState.memoizedState&&(s!==null?s.push(hn):s=[hn])}n=n.return}s!==null&&Bi(e,s,t,a),e.flags|=262144}function Gn(s){for(s=s.firstContext;s!==null;){if(!se(s.context._currentValue,s.memoizedValue))return!0;s=s.next}return!1}function Bt(s){At=s,Oe=null,s=s.dependencies,s!==null&&(s.firstContext=null)}function Ts(s){return Cc(At,s)}function Xn(s,e){return At===null&&Bt(s),Cc(s,e)}function Cc(s,e){var t=e._currentValue;if(e={context:e,memoizedValue:t,next:null},Oe===null){if(s===null)throw Error(_(308));Oe=e,s.dependencies={lanes:0,firstContext:e},s.flags|=524288}else Oe=Oe.next=e;return t}var qv=typeof AbortController<"u"?AbortController:function(){var s=[],e=this.signal={aborted:!1,addEventListener:function(t,a){s.push(a)}};this.abort=function(){e.aborted=!0,s.forEach(function(t){return t()})}},Zv=p.unstable_scheduleCallback,Yv=p.unstable_NormalPriority,ws={$$typeof:zs,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function zi(){return{controller:new qv,data:new Map,refCount:0}}function Ya(s){s.refCount--,s.refCount===0&&Zv(Yv,function(){s.controller.abort()})}var Ga=null,Ni=0,ia=0,da=null;function Gv(s,e){if(Ga===null){var t=Ga=[];Ni=0,ia=jd(),da={status:"pending",value:void 0,then:function(a){t.push(a)}}}return Ni++,e.then(Sc,Sc),e}function Sc(){if(--Ni===0&&Ga!==null){da!==null&&(da.status="fulfilled");var s=Ga;Ga=null,ia=0,da=null;for(var e=0;e<s.length;e++)(0,s[e])()}}function Xv(s,e){var t=[],a={status:"pending",value:null,reason:null,then:function(n){t.push(n)}};return s.then(function(){a.status="fulfilled",a.value=e;for(var n=0;n<t.length;n++)(0,t[n])(e)},function(n){for(a.status="rejected",a.reason=n,n=0;n<t.length;n++)(0,t[n])(void 0)}),a}var Mc=w.S;w.S=function(s,e){cu=Is(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Gv(s,e),Mc!==null&&Mc(s,e)};var zt=u(null);function Hi(){var s=zt.current;return s!==null?s:us.pooledCache}function Qn(s,e){e===null?E(zt,zt.current):E(zt,e.pool)}function Dc(){var s=Hi();return s===null?null:{parent:ws._currentValue,pool:s}}var oa=Error(_(460)),Oi=Error(_(474)),Kn=Error(_(542)),Fn={then:function(){}};function Lc(s){return s=s.status,s==="fulfilled"||s==="rejected"}function Tc(s,e,t){switch(t=s[t],t===void 0?s.push(e):t!==e&&(e.then(Be,Be),e=t),e.status){case"fulfilled":return e.value;case"rejected":throw s=e.reason,Ac(s),s;default:if(typeof e.status=="string")e.then(Be,Be);else{if(s=us,s!==null&&100<s.shellSuspendCounter)throw Error(_(482));s=e,s.status="pending",s.then(function(a){if(e.status==="pending"){var n=e;n.status="fulfilled",n.value=a}},function(a){if(e.status==="pending"){var n=e;n.status="rejected",n.reason=a}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw s=e.reason,Ac(s),s}throw Ht=e,oa}}function Nt(s){try{var e=s._init;return e(s._payload)}catch(t){throw t!==null&&typeof t=="object"&&typeof t.then=="function"?(Ht=t,oa):t}}var Ht=null;function Ec(){if(Ht===null)throw Error(_(459));var s=Ht;return Ht=null,s}function Ac(s){if(s===oa||s===Kn)throw Error(_(483))}var ca=null,Xa=0;function Jn(s){var e=Xa;return Xa+=1,ca===null&&(ca=[]),Tc(ca,s,e)}function Qa(s,e){e=e.props.ref,s.ref=e!==void 0?e:null}function Wn(s,e){throw e.$$typeof===I?Error(_(525)):(s=Object.prototype.toString.call(e),Error(_(31,s==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":s)))}function Bc(s){function e(v,c){if(s){var f=v.deletions;f===null?(v.deletions=[c],v.flags|=16):f.push(c)}}function t(v,c){if(!s)return null;for(;c!==null;)e(v,c),c=c.sibling;return null}function a(v){for(var c=new Map;v!==null;)v.key!==null?c.set(v.key,v):c.set(v.index,v),v=v.sibling;return c}function n(v,c){return v=Ne(v,c),v.index=0,v.sibling=null,v}function l(v,c,f){return v.index=f,s?(f=v.alternate,f!==null?(f=f.index,f<c?(v.flags|=67108866,c):f):(v.flags|=67108866,c)):(v.flags|=1048576,c)}function i(v){return s&&v.alternate===null&&(v.flags|=67108866),v}function d(v,c,f,k){return c===null||c.tag!==6?(c=Ci(f,v.mode,k),c.return=v,c):(c=n(c,f),c.return=v,c)}function o(v,c,f,k){var j=f.type;return j===Hs?m(v,c,f.props.children,k,f.key):c!==null&&(c.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===qs&&Nt(j)===c.type)?(c=n(c,f.props),Qa(c,f),c.return=v,c):(c=Zn(f.type,f.key,f.props,null,v.mode,k),Qa(c,f),c.return=v,c)}function h(v,c,f,k){return c===null||c.tag!==4||c.stateNode.containerInfo!==f.containerInfo||c.stateNode.implementation!==f.implementation?(c=Si(f,v.mode,k),c.return=v,c):(c=n(c,f.children||[]),c.return=v,c)}function m(v,c,f,k,j){return c===null||c.tag!==7?(c=Tt(f,v.mode,k,j),c.return=v,c):(c=n(c,f),c.return=v,c)}function y(v,c,f){if(typeof c=="string"&&c!==""||typeof c=="number"||typeof c=="bigint")return c=Ci(""+c,v.mode,f),c.return=v,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case Bs:return f=Zn(c.type,c.key,c.props,null,v.mode,f),Qa(f,c),f.return=v,f;case Rs:return c=Si(c,v.mode,f),c.return=v,c;case qs:return c=Nt(c),y(v,c,f)}if(be(c)||Zs(c))return c=Tt(c,v.mode,f,null),c.return=v,c;if(typeof c.then=="function")return y(v,Jn(c),f);if(c.$$typeof===zs)return y(v,Xn(v,c),f);Wn(v,c)}return null}function g(v,c,f,k){var j=c!==null?c.key:null;if(typeof f=="string"&&f!==""||typeof f=="number"||typeof f=="bigint")return j!==null?null:d(v,c,""+f,k);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Bs:return f.key===j?o(v,c,f,k):null;case Rs:return f.key===j?h(v,c,f,k):null;case qs:return f=Nt(f),g(v,c,f,k)}if(be(f)||Zs(f))return j!==null?null:m(v,c,f,k,null);if(typeof f.then=="function")return g(v,c,Jn(f),k);if(f.$$typeof===zs)return g(v,c,Xn(v,f),k);Wn(v,f)}return null}function b(v,c,f,k,j){if(typeof k=="string"&&k!==""||typeof k=="number"||typeof k=="bigint")return v=v.get(f)||null,d(c,v,""+k,j);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Bs:return v=v.get(k.key===null?f:k.key)||null,o(c,v,k,j);case Rs:return v=v.get(k.key===null?f:k.key)||null,h(c,v,k,j);case qs:return k=Nt(k),b(v,c,f,k,j)}if(be(k)||Zs(k))return v=v.get(f)||null,m(c,v,k,j,null);if(typeof k.then=="function")return b(v,c,f,Jn(k),j);if(k.$$typeof===zs)return b(v,c,f,Xn(c,k),j);Wn(c,k)}return null}function A(v,c,f,k){for(var j=null,ss=null,z=c,G=c=0,J=null;z!==null&&G<f.length;G++){z.index>G?(J=z,z=null):J=z.sibling;var es=g(v,z,f[G],k);if(es===null){z===null&&(z=J);break}s&&z&&es.alternate===null&&e(v,z),c=l(es,c,G),ss===null?j=es:ss.sibling=es,ss=es,z=J}if(G===f.length)return t(v,z),$&&He(v,G),j;if(z===null){for(;G<f.length;G++)z=y(v,f[G],k),z!==null&&(c=l(z,c,G),ss===null?j=z:ss.sibling=z,ss=z);return $&&He(v,G),j}for(z=a(z);G<f.length;G++)J=b(z,v,G,f[G],k),J!==null&&(s&&J.alternate!==null&&z.delete(J.key===null?G:J.key),c=l(J,c,G),ss===null?j=J:ss.sibling=J,ss=J);return s&&z.forEach(function(wt){return e(v,wt)}),$&&He(v,G),j}function R(v,c,f,k){if(f==null)throw Error(_(151));for(var j=null,ss=null,z=c,G=c=0,J=null,es=f.next();z!==null&&!es.done;G++,es=f.next()){z.index>G?(J=z,z=null):J=z.sibling;var wt=g(v,z,es.value,k);if(wt===null){z===null&&(z=J);break}s&&z&&wt.alternate===null&&e(v,z),c=l(wt,c,G),ss===null?j=wt:ss.sibling=wt,ss=wt,z=J}if(es.done)return t(v,z),$&&He(v,G),j;if(z===null){for(;!es.done;G++,es=f.next())es=y(v,es.value,k),es!==null&&(c=l(es,c,G),ss===null?j=es:ss.sibling=es,ss=es);return $&&He(v,G),j}for(z=a(z);!es.done;G++,es=f.next())es=b(z,v,G,es.value,k),es!==null&&(s&&es.alternate!==null&&z.delete(es.key===null?G:es.key),c=l(es,c,G),ss===null?j=es:ss.sibling=es,ss=es);return s&&z.forEach(function(t1){return e(v,t1)}),$&&He(v,G),j}function cs(v,c,f,k){if(typeof f=="object"&&f!==null&&f.type===Hs&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case Bs:s:{for(var j=f.key;c!==null;){if(c.key===j){if(j=f.type,j===Hs){if(c.tag===7){t(v,c.sibling),k=n(c,f.props.children),k.return=v,v=k;break s}}else if(c.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===qs&&Nt(j)===c.type){t(v,c.sibling),k=n(c,f.props),Qa(k,f),k.return=v,v=k;break s}t(v,c);break}else e(v,c);c=c.sibling}f.type===Hs?(k=Tt(f.props.children,v.mode,k,f.key),k.return=v,v=k):(k=Zn(f.type,f.key,f.props,null,v.mode,k),Qa(k,f),k.return=v,v=k)}return i(v);case Rs:s:{for(j=f.key;c!==null;){if(c.key===j)if(c.tag===4&&c.stateNode.containerInfo===f.containerInfo&&c.stateNode.implementation===f.implementation){t(v,c.sibling),k=n(c,f.children||[]),k.return=v,v=k;break s}else{t(v,c);break}else e(v,c);c=c.sibling}k=Si(f,v.mode,k),k.return=v,v=k}return i(v);case qs:return f=Nt(f),cs(v,c,f,k)}if(be(f))return A(v,c,f,k);if(Zs(f)){if(j=Zs(f),typeof j!="function")throw Error(_(150));return f=j.call(f),R(v,c,f,k)}if(typeof f.then=="function")return cs(v,c,Jn(f),k);if(f.$$typeof===zs)return cs(v,c,Xn(v,f),k);Wn(v,f)}return typeof f=="string"&&f!==""||typeof f=="number"||typeof f=="bigint"?(f=""+f,c!==null&&c.tag===6?(t(v,c.sibling),k=n(c,f),k.return=v,v=k):(t(v,c),k=Ci(f,v.mode,k),k.return=v,v=k),i(v)):t(v,c)}return function(v,c,f,k){try{Xa=0;var j=cs(v,c,f,k);return ca=null,j}catch(z){if(z===oa||z===Kn)throw z;var ss=ee(29,z,null,v.mode);return ss.lanes=k,ss.return=v,ss}finally{}}}var Ot=Bc(!0),zc=Bc(!1),at=!1;function ji(s){s.updateQueue={baseState:s.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Vi(s,e){s=s.updateQueue,e.updateQueue===s&&(e.updateQueue={baseState:s.baseState,firstBaseUpdate:s.firstBaseUpdate,lastBaseUpdate:s.lastBaseUpdate,shared:s.shared,callbacks:null})}function nt(s){return{lane:s,tag:0,payload:null,callback:null,next:null}}function lt(s,e,t){var a=s.updateQueue;if(a===null)return null;if(a=a.shared,(ts&2)!==0){var n=a.pending;return n===null?e.next=e:(e.next=n.next,n.next=e),a.pending=e,e=qn(s),hc(s,null,t),e}return Un(s,a,e,t),qn(s)}function Ka(s,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194048)!==0)){var a=e.lanes;a&=s.pendingLanes,t|=a,e.lanes=t,Co(s,t)}}function Ri(s,e){var t=s.updateQueue,a=s.alternate;if(a!==null&&(a=a.updateQueue,t===a)){var n=null,l=null;if(t=t.firstBaseUpdate,t!==null){do{var i={lane:t.lane,tag:t.tag,payload:t.payload,callback:null,next:null};l===null?n=l=i:l=l.next=i,t=t.next}while(t!==null);l===null?n=l=e:l=l.next=e}else n=l=e;t={baseState:a.baseState,firstBaseUpdate:n,lastBaseUpdate:l,shared:a.shared,callbacks:a.callbacks},s.updateQueue=t;return}s=t.lastBaseUpdate,s===null?t.firstBaseUpdate=e:s.next=e,t.lastBaseUpdate=e}var Ui=!1;function Fa(){if(Ui){var s=da;if(s!==null)throw s}}function Ja(s,e,t,a){Ui=!1;var n=s.updateQueue;at=!1;var l=n.firstBaseUpdate,i=n.lastBaseUpdate,d=n.shared.pending;if(d!==null){n.shared.pending=null;var o=d,h=o.next;o.next=null,i===null?l=h:i.next=h,i=o;var m=s.alternate;m!==null&&(m=m.updateQueue,d=m.lastBaseUpdate,d!==i&&(d===null?m.firstBaseUpdate=h:d.next=h,m.lastBaseUpdate=o))}if(l!==null){var y=n.baseState;i=0,m=h=o=null,d=l;do{var g=d.lane&-536870913,b=g!==d.lane;if(b?(F&g)===g:(a&g)===g){g!==0&&g===ia&&(Ui=!0),m!==null&&(m=m.next={lane:0,tag:d.tag,payload:d.payload,callback:null,next:null});s:{var A=s,R=d;g=e;var cs=t;switch(R.tag){case 1:if(A=R.payload,typeof A=="function"){y=A.call(cs,y,g);break s}y=A;break s;case 3:A.flags=A.flags&-65537|128;case 0:if(A=R.payload,g=typeof A=="function"?A.call(cs,y,g):A,g==null)break s;y=H({},y,g);break s;case 2:at=!0}}g=d.callback,g!==null&&(s.flags|=64,b&&(s.flags|=8192),b=n.callbacks,b===null?n.callbacks=[g]:b.push(g))}else b={lane:g,tag:d.tag,payload:d.payload,callback:d.callback,next:null},m===null?(h=m=b,o=y):m=m.next=b,i|=g;if(d=d.next,d===null){if(d=n.shared.pending,d===null)break;b=d,d=b.next,b.next=null,n.lastBaseUpdate=b,n.shared.pending=null}}while(!0);m===null&&(o=y),n.baseState=o,n.firstBaseUpdate=h,n.lastBaseUpdate=m,l===null&&(n.shared.lanes=0),rt|=i,s.lanes=i,s.memoizedState=y}}function Nc(s,e){if(typeof s!="function")throw Error(_(191,s));s.call(e)}function Hc(s,e){var t=s.callbacks;if(t!==null)for(s.callbacks=null,s=0;s<t.length;s++)Nc(t[s],e)}var ra=u(null),In=u(0);function Oc(s,e){s=Qe,E(In,s),E(ra,e),Qe=s|e.baseLanes}function qi(){E(In,Qe),E(ra,ra.current)}function Zi(){Qe=In.current,C(ra),C(In)}var te=u(null),fe=null;function it(s){var e=s.alternate;E(bs,bs.current&1),E(te,s),fe===null&&(e===null||ra.current!==null||e.memoizedState!==null)&&(fe=s)}function Yi(s){E(bs,bs.current),E(te,s),fe===null&&(fe=s)}function jc(s){s.tag===22?(E(bs,bs.current),E(te,s),fe===null&&(fe=s)):dt()}function dt(){E(bs,bs.current),E(te,te.current)}function ae(s){C(te),fe===s&&(fe=null),C(bs)}var bs=u(0);function Pn(s){for(var e=s;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||Jd(t)||Wd(t)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===s)break;for(;e.sibling===null;){if(e.return===null||e.return===s)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ve=0,Y=null,ds=null,ks=null,$n=!1,ua=!1,jt=!1,sl=0,Wa=0,pa=null,Qv=0;function fs(){throw Error(_(321))}function Gi(s,e){if(e===null)return!1;for(var t=0;t<e.length&&t<s.length;t++)if(!se(s[t],e[t]))return!1;return!0}function Xi(s,e,t,a,n,l){return Ve=l,Y=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,w.H=s===null||s.memoizedState===null?wr:id,jt=!1,l=t(a,n),jt=!1,ua&&(l=Rc(e,t,a,n)),Vc(s),l}function Vc(s){w.H=$a;var e=ds!==null&&ds.next!==null;if(Ve=0,ks=ds=Y=null,$n=!1,Wa=0,pa=null,e)throw Error(_(300));s===null||ys||(s=s.dependencies,s!==null&&Gn(s)&&(ys=!0))}function Rc(s,e,t,a){Y=s;var n=0;do{if(ua&&(pa=null),Wa=0,ua=!1,25<=n)throw Error(_(301));if(n+=1,ks=ds=null,s.updateQueue!=null){var l=s.updateQueue;l.lastEffect=null,l.events=null,l.stores=null,l.memoCache!=null&&(l.memoCache.index=0)}w.H=kr,l=e(t,a)}while(ua);return l}function Kv(){var s=w.H,e=s.useState()[0];return e=typeof e.then=="function"?Ia(e):e,s=s.useState()[0],(ds!==null?ds.memoizedState:null)!==s&&(Y.flags|=1024),e}function Qi(){var s=sl!==0;return sl=0,s}function Ki(s,e,t){e.updateQueue=s.updateQueue,e.flags&=-2053,s.lanes&=~t}function Fi(s){if($n){for(s=s.memoizedState;s!==null;){var e=s.queue;e!==null&&(e.pending=null),s=s.next}$n=!1}Ve=0,ks=ds=Y=null,ua=!1,Wa=sl=0,pa=null}function js(){var s={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ks===null?Y.memoizedState=ks=s:ks=ks.next=s,ks}function ms(){if(ds===null){var s=Y.alternate;s=s!==null?s.memoizedState:null}else s=ds.next;var e=ks===null?Y.memoizedState:ks.next;if(e!==null)ks=e,ds=s;else{if(s===null)throw Y.alternate===null?Error(_(467)):Error(_(310));ds=s,s={memoizedState:ds.memoizedState,baseState:ds.baseState,baseQueue:ds.baseQueue,queue:ds.queue,next:null},ks===null?Y.memoizedState=ks=s:ks=ks.next=s}return ks}function el(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ia(s){var e=Wa;return Wa+=1,pa===null&&(pa=[]),s=Tc(pa,s,e),e=Y,(ks===null?e.memoizedState:ks.next)===null&&(e=e.alternate,w.H=e===null||e.memoizedState===null?wr:id),s}function tl(s){if(s!==null&&typeof s=="object"){if(typeof s.then=="function")return Ia(s);if(s.$$typeof===zs)return Ts(s)}throw Error(_(438,String(s)))}function Ji(s){var e=null,t=Y.updateQueue;if(t!==null&&(e=t.memoCache),e==null){var a=Y.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(e={data:a.data.map(function(n){return n.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),t===null&&(t=el(),Y.updateQueue=t),t.memoCache=e,t=e.data[e.index],t===void 0)for(t=e.data[e.index]=Array(s),a=0;a<s;a++)t[a]=qt;return e.index++,t}function Re(s,e){return typeof e=="function"?e(s):e}function al(s){var e=ms();return Wi(e,ds,s)}function Wi(s,e,t){var a=s.queue;if(a===null)throw Error(_(311));a.lastRenderedReducer=t;var n=s.baseQueue,l=a.pending;if(l!==null){if(n!==null){var i=n.next;n.next=l.next,l.next=i}e.baseQueue=n=l,a.pending=null}if(l=s.baseState,n===null)s.memoizedState=l;else{e=n.next;var d=i=null,o=null,h=e,m=!1;do{var y=h.lane&-536870913;if(y!==h.lane?(F&y)===y:(Ve&y)===y){var g=h.revertLane;if(g===0)o!==null&&(o=o.next={lane:0,revertLane:0,gesture:null,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),y===ia&&(m=!0);else if((Ve&g)===g){h=h.next,g===ia&&(m=!0);continue}else y={lane:0,revertLane:h.revertLane,gesture:null,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null},o===null?(d=o=y,i=l):o=o.next=y,Y.lanes|=g,rt|=g;y=h.action,jt&&t(l,y),l=h.hasEagerState?h.eagerState:t(l,y)}else g={lane:y,revertLane:h.revertLane,gesture:h.gesture,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null},o===null?(d=o=g,i=l):o=o.next=g,Y.lanes|=y,rt|=y;h=h.next}while(h!==null&&h!==e);if(o===null?i=l:o.next=d,!se(l,s.memoizedState)&&(ys=!0,m&&(t=da,t!==null)))throw t;s.memoizedState=l,s.baseState=i,s.baseQueue=o,a.lastRenderedState=l}return n===null&&(a.lanes=0),[s.memoizedState,a.dispatch]}function Ii(s){var e=ms(),t=e.queue;if(t===null)throw Error(_(311));t.lastRenderedReducer=s;var a=t.dispatch,n=t.pending,l=e.memoizedState;if(n!==null){t.pending=null;var i=n=n.next;do l=s(l,i.action),i=i.next;while(i!==n);se(l,e.memoizedState)||(ys=!0),e.memoizedState=l,e.baseQueue===null&&(e.baseState=l),t.lastRenderedState=l}return[l,a]}function Uc(s,e,t){var a=Y,n=ms(),l=$;if(l){if(t===void 0)throw Error(_(407));t=t()}else t=e();var i=!se((ds||n).memoizedState,t);if(i&&(n.memoizedState=t,ys=!0),n=n.queue,sd(Yc.bind(null,a,n,s),[s]),n.getSnapshot!==e||i||ks!==null&&ks.memoizedState.tag&1){if(a.flags|=2048,va(9,{destroy:void 0},Zc.bind(null,a,n,t,e),null),us===null)throw Error(_(349));l||(Ve&127)!==0||qc(a,e,t)}return t}function qc(s,e,t){s.flags|=16384,s={getSnapshot:e,value:t},e=Y.updateQueue,e===null?(e=el(),Y.updateQueue=e,e.stores=[s]):(t=e.stores,t===null?e.stores=[s]:t.push(s))}function Zc(s,e,t,a){e.value=t,e.getSnapshot=a,Gc(e)&&Xc(s)}function Yc(s,e,t){return t(function(){Gc(e)&&Xc(s)})}function Gc(s){var e=s.getSnapshot;s=s.value;try{var t=e();return!se(s,t)}catch{return!0}}function Xc(s){var e=Lt(s,2);e!==null&&Js(e,s,2)}function Pi(s){var e=js();if(typeof s=="function"){var t=s;if(s=t(),jt){We(!0);try{t()}finally{We(!1)}}}return e.memoizedState=e.baseState=s,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Re,lastRenderedState:s},e}function Qc(s,e,t,a){return s.baseState=t,Wi(s,ds,typeof a=="function"?a:Re)}function Fv(s,e,t,a,n){if(il(s))throw Error(_(485));if(s=e.action,s!==null){var l={payload:n,action:s,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(i){l.listeners.push(i)}};w.T!==null?t(!0):l.isTransition=!1,a(l),t=e.pending,t===null?(l.next=e.pending=l,Kc(e,l)):(l.next=t.next,e.pending=t.next=l)}}function Kc(s,e){var t=e.action,a=e.payload,n=s.state;if(e.isTransition){var l=w.T,i={};w.T=i;try{var d=t(n,a),o=w.S;o!==null&&o(i,d),Fc(s,e,d)}catch(h){$i(s,e,h)}finally{l!==null&&i.types!==null&&(l.types=i.types),w.T=l}}else try{l=t(n,a),Fc(s,e,l)}catch(h){$i(s,e,h)}}function Fc(s,e,t){t!==null&&typeof t=="object"&&typeof t.then=="function"?t.then(function(a){Jc(s,e,a)},function(a){return $i(s,e,a)}):Jc(s,e,t)}function Jc(s,e,t){e.status="fulfilled",e.value=t,Wc(e),s.state=t,e=s.pending,e!==null&&(t=e.next,t===e?s.pending=null:(t=t.next,e.next=t,Kc(s,t)))}function $i(s,e,t){var a=s.pending;if(s.pending=null,a!==null){a=a.next;do e.status="rejected",e.reason=t,Wc(e),e=e.next;while(e!==a)}s.action=null}function Wc(s){s=s.listeners;for(var e=0;e<s.length;e++)(0,s[e])()}function Ic(s,e){return e}function Pc(s,e){if($){var t=us.formState;if(t!==null){s:{var a=Y;if($){if(ps){e:{for(var n=ps,l=_e;n.nodeType!==8;){if(!l){n=null;break e}if(n=he(n.nextSibling),n===null){n=null;break e}}l=n.data,n=l==="F!"||l==="F"?n:null}if(n){ps=he(n.nextSibling),a=n.data==="F!";break s}}et(a)}a=!1}a&&(e=t[0])}}return t=js(),t.memoizedState=t.baseState=e,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ic,lastRenderedState:e},t.queue=a,t=gr.bind(null,Y,a),a.dispatch=t,a=Pi(!1),l=ld.bind(null,Y,!1,a.queue),a=js(),n={state:e,dispatch:null,action:s,pending:null},a.queue=n,t=Fv.bind(null,Y,n,l,t),n.dispatch=t,a.memoizedState=s,[e,t,!1]}function $c(s){var e=ms();return sr(e,ds,s)}function sr(s,e,t){if(e=Wi(s,e,Ic)[0],s=al(Re)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var a=Ia(e)}catch(i){throw i===oa?Kn:i}else a=e;e=ms();var n=e.queue,l=n.dispatch;return t!==e.memoizedState&&(Y.flags|=2048,va(9,{destroy:void 0},Jv.bind(null,n,t),null)),[a,l,s]}function Jv(s,e){s.action=e}function er(s){var e=ms(),t=ds;if(t!==null)return sr(e,t,s);ms(),e=e.memoizedState,t=ms();var a=t.queue.dispatch;return t.memoizedState=s,[e,a,!1]}function va(s,e,t,a){return s={tag:s,create:t,deps:a,inst:e,next:null},e=Y.updateQueue,e===null&&(e=el(),Y.updateQueue=e),t=e.lastEffect,t===null?e.lastEffect=s.next=s:(a=t.next,t.next=s,s.next=a,e.lastEffect=s),s}function tr(){return ms().memoizedState}function nl(s,e,t,a){var n=js();Y.flags|=s,n.memoizedState=va(1|e,{destroy:void 0},t,a===void 0?null:a)}function ll(s,e,t,a){var n=ms();a=a===void 0?null:a;var l=n.memoizedState.inst;ds!==null&&a!==null&&Gi(a,ds.memoizedState.deps)?n.memoizedState=va(e,l,t,a):(Y.flags|=s,n.memoizedState=va(1|e,l,t,a))}function ar(s,e){nl(8390656,8,s,e)}function sd(s,e){ll(2048,8,s,e)}function Wv(s){Y.flags|=4;var e=Y.updateQueue;if(e===null)e=el(),Y.updateQueue=e,e.events=[s];else{var t=e.events;t===null?e.events=[s]:t.push(s)}}function nr(s){var e=ms().memoizedState;return Wv({ref:e,nextImpl:s}),function(){if((ts&2)!==0)throw Error(_(440));return e.impl.apply(void 0,arguments)}}function lr(s,e){return ll(4,2,s,e)}function ir(s,e){return ll(4,4,s,e)}function dr(s,e){if(typeof e=="function"){s=s();var t=e(s);return function(){typeof t=="function"?t():e(null)}}if(e!=null)return s=s(),e.current=s,function(){e.current=null}}function or(s,e,t){t=t!=null?t.concat([s]):null,ll(4,4,dr.bind(null,e,s),t)}function ed(){}function cr(s,e){var t=ms();e=e===void 0?null:e;var a=t.memoizedState;return e!==null&&Gi(e,a[1])?a[0]:(t.memoizedState=[s,e],s)}function rr(s,e){var t=ms();e=e===void 0?null:e;var a=t.memoizedState;if(e!==null&&Gi(e,a[1]))return a[0];if(a=s(),jt){We(!0);try{s()}finally{We(!1)}}return t.memoizedState=[a,e],a}function td(s,e,t){return t===void 0||(Ve&1073741824)!==0&&(F&261930)===0?s.memoizedState=e:(s.memoizedState=t,s=uu(),Y.lanes|=s,rt|=s,t)}function ur(s,e,t,a){return se(t,e)?t:ra.current!==null?(s=td(s,t,a),se(s,e)||(ys=!0),s):(Ve&42)===0||(Ve&1073741824)!==0&&(F&261930)===0?(ys=!0,s.memoizedState=t):(s=uu(),Y.lanes|=s,rt|=s,e)}function pr(s,e,t,a,n){var l=T.p;T.p=l!==0&&8>l?l:8;var i=w.T,d={};w.T=d,ld(s,!1,e,t);try{var o=n(),h=w.S;if(h!==null&&h(d,o),o!==null&&typeof o=="object"&&typeof o.then=="function"){var m=Xv(o,a);Pa(s,e,m,ie(s))}else Pa(s,e,a,ie(s))}catch(y){Pa(s,e,{then:function(){},status:"rejected",reason:y},ie())}finally{T.p=l,i!==null&&d.types!==null&&(i.types=d.types),w.T=i}}function Iv(){}function ad(s,e,t,a){if(s.tag!==5)throw Error(_(476));var n=vr(s).queue;pr(s,n,e,U,t===null?Iv:function(){return _r(s),t(a)})}function vr(s){var e=s.memoizedState;if(e!==null)return e;e={memoizedState:U,baseState:U,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Re,lastRenderedState:U},next:null};var t={};return e.next={memoizedState:t,baseState:t,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Re,lastRenderedState:t},next:null},s.memoizedState=e,s=s.alternate,s!==null&&(s.memoizedState=e),e}function _r(s){var e=vr(s);e.next===null&&(e=s.alternate.memoizedState),Pa(s,e.next.queue,{},ie())}function nd(){return Ts(hn)}function fr(){return ms().memoizedState}function hr(){return ms().memoizedState}function Pv(s){for(var e=s.return;e!==null;){switch(e.tag){case 24:case 3:var t=ie();s=nt(t);var a=lt(e,s,t);a!==null&&(Js(a,e,t),Ka(a,e,t)),e={cache:zi()},s.payload=e;return}e=e.return}}function $v(s,e,t){var a=ie();t={lane:a,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null},il(s)?br(e,t):(t=yi(s,e,t,a),t!==null&&(Js(t,s,a),mr(t,e,a)))}function gr(s,e,t){var a=ie();Pa(s,e,t,a)}function Pa(s,e,t,a){var n={lane:a,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null};if(il(s))br(e,n);else{var l=s.alternate;if(s.lanes===0&&(l===null||l.lanes===0)&&(l=e.lastRenderedReducer,l!==null))try{var i=e.lastRenderedState,d=l(i,t);if(n.hasEagerState=!0,n.eagerState=d,se(d,i))return Un(s,e,n,0),us===null&&Rn(),!1}catch{}finally{}if(t=yi(s,e,n,a),t!==null)return Js(t,s,a),mr(t,e,a),!0}return!1}function ld(s,e,t,a){if(a={lane:2,revertLane:jd(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},il(s)){if(e)throw Error(_(479))}else e=yi(s,t,a,2),e!==null&&Js(e,s,2)}function il(s){var e=s.alternate;return s===Y||e!==null&&e===Y}function br(s,e){ua=$n=!0;var t=s.pending;t===null?e.next=e:(e.next=t.next,t.next=e),s.pending=e}function mr(s,e,t){if((t&4194048)!==0){var a=e.lanes;a&=s.pendingLanes,t|=a,e.lanes=t,Co(s,t)}}var $a={readContext:Ts,use:tl,useCallback:fs,useContext:fs,useEffect:fs,useImperativeHandle:fs,useLayoutEffect:fs,useInsertionEffect:fs,useMemo:fs,useReducer:fs,useRef:fs,useState:fs,useDebugValue:fs,useDeferredValue:fs,useTransition:fs,useSyncExternalStore:fs,useId:fs,useHostTransitionStatus:fs,useFormState:fs,useActionState:fs,useOptimistic:fs,useMemoCache:fs,useCacheRefresh:fs};$a.useEffectEvent=fs;var wr={readContext:Ts,use:tl,useCallback:function(s,e){return js().memoizedState=[s,e===void 0?null:e],s},useContext:Ts,useEffect:ar,useImperativeHandle:function(s,e,t){t=t!=null?t.concat([s]):null,nl(4194308,4,dr.bind(null,e,s),t)},useLayoutEffect:function(s,e){return nl(4194308,4,s,e)},useInsertionEffect:function(s,e){nl(4,2,s,e)},useMemo:function(s,e){var t=js();e=e===void 0?null:e;var a=s();if(jt){We(!0);try{s()}finally{We(!1)}}return t.memoizedState=[a,e],a},useReducer:function(s,e,t){var a=js();if(t!==void 0){var n=t(e);if(jt){We(!0);try{t(e)}finally{We(!1)}}}else n=e;return a.memoizedState=a.baseState=n,s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:s,lastRenderedState:n},a.queue=s,s=s.dispatch=$v.bind(null,Y,s),[a.memoizedState,s]},useRef:function(s){var e=js();return s={current:s},e.memoizedState=s},useState:function(s){s=Pi(s);var e=s.queue,t=gr.bind(null,Y,e);return e.dispatch=t,[s.memoizedState,t]},useDebugValue:ed,useDeferredValue:function(s,e){var t=js();return td(t,s,e)},useTransition:function(){var s=Pi(!1);return s=pr.bind(null,Y,s.queue,!0,!1),js().memoizedState=s,[!1,s]},useSyncExternalStore:function(s,e,t){var a=Y,n=js();if($){if(t===void 0)throw Error(_(407));t=t()}else{if(t=e(),us===null)throw Error(_(349));(F&127)!==0||qc(a,e,t)}n.memoizedState=t;var l={value:t,getSnapshot:e};return n.queue=l,ar(Yc.bind(null,a,l,s),[s]),a.flags|=2048,va(9,{destroy:void 0},Zc.bind(null,a,l,t,e),null),t},useId:function(){var s=js(),e=us.identifierPrefix;if($){var t=Me,a=Se;t=(a&~(1<<32-$s(a)-1)).toString(32)+t,e="_"+e+"R_"+t,t=sl++,0<t&&(e+="H"+t.toString(32)),e+="_"}else t=Qv++,e="_"+e+"r_"+t.toString(32)+"_";return s.memoizedState=e},useHostTransitionStatus:nd,useFormState:Pc,useActionState:Pc,useOptimistic:function(s){var e=js();e.memoizedState=e.baseState=s;var t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=t,e=ld.bind(null,Y,!0,t),t.dispatch=e,[s,e]},useMemoCache:Ji,useCacheRefresh:function(){return js().memoizedState=Pv.bind(null,Y)},useEffectEvent:function(s){var e=js(),t={impl:s};return e.memoizedState=t,function(){if((ts&2)!==0)throw Error(_(440));return t.impl.apply(void 0,arguments)}}},id={readContext:Ts,use:tl,useCallback:cr,useContext:Ts,useEffect:sd,useImperativeHandle:or,useInsertionEffect:lr,useLayoutEffect:ir,useMemo:rr,useReducer:al,useRef:tr,useState:function(){return al(Re)},useDebugValue:ed,useDeferredValue:function(s,e){var t=ms();return ur(t,ds.memoizedState,s,e)},useTransition:function(){var s=al(Re)[0],e=ms().memoizedState;return[typeof s=="boolean"?s:Ia(s),e]},useSyncExternalStore:Uc,useId:fr,useHostTransitionStatus:nd,useFormState:$c,useActionState:$c,useOptimistic:function(s,e){var t=ms();return Qc(t,ds,s,e)},useMemoCache:Ji,useCacheRefresh:hr};id.useEffectEvent=nr;var kr={readContext:Ts,use:tl,useCallback:cr,useContext:Ts,useEffect:sd,useImperativeHandle:or,useInsertionEffect:lr,useLayoutEffect:ir,useMemo:rr,useReducer:Ii,useRef:tr,useState:function(){return Ii(Re)},useDebugValue:ed,useDeferredValue:function(s,e){var t=ms();return ds===null?td(t,s,e):ur(t,ds.memoizedState,s,e)},useTransition:function(){var s=Ii(Re)[0],e=ms().memoizedState;return[typeof s=="boolean"?s:Ia(s),e]},useSyncExternalStore:Uc,useId:fr,useHostTransitionStatus:nd,useFormState:er,useActionState:er,useOptimistic:function(s,e){var t=ms();return ds!==null?Qc(t,ds,s,e):(t.baseState=s,[s,t.queue.dispatch])},useMemoCache:Ji,useCacheRefresh:hr};kr.useEffectEvent=nr;function dd(s,e,t,a){e=s.memoizedState,t=t(a,e),t=t==null?e:H({},e,t),s.memoizedState=t,s.lanes===0&&(s.updateQueue.baseState=t)}var od={enqueueSetState:function(s,e,t){s=s._reactInternals;var a=ie(),n=nt(a);n.payload=e,t!=null&&(n.callback=t),e=lt(s,n,a),e!==null&&(Js(e,s,a),Ka(e,s,a))},enqueueReplaceState:function(s,e,t){s=s._reactInternals;var a=ie(),n=nt(a);n.tag=1,n.payload=e,t!=null&&(n.callback=t),e=lt(s,n,a),e!==null&&(Js(e,s,a),Ka(e,s,a))},enqueueForceUpdate:function(s,e){s=s._reactInternals;var t=ie(),a=nt(t);a.tag=2,e!=null&&(a.callback=e),e=lt(s,a,t),e!==null&&(Js(e,s,t),Ka(e,s,t))}};function yr(s,e,t,a,n,l,i){return s=s.stateNode,typeof s.shouldComponentUpdate=="function"?s.shouldComponentUpdate(a,l,i):e.prototype&&e.prototype.isPureReactComponent?!Ra(t,a)||!Ra(n,l):!0}function xr(s,e,t,a){s=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,a),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,a),e.state!==s&&od.enqueueReplaceState(e,e.state,null)}function Vt(s,e){var t=e;if("ref"in e){t={};for(var a in e)a!=="ref"&&(t[a]=e[a])}if(s=s.defaultProps){t===e&&(t=H({},t));for(var n in s)t[n]===void 0&&(t[n]=s[n])}return t}function Cr(s){Vn(s)}function Sr(s){console.error(s)}function Mr(s){Vn(s)}function dl(s,e){try{var t=s.onUncaughtError;t(e.value,{componentStack:e.stack})}catch(a){setTimeout(function(){throw a})}}function Dr(s,e,t){try{var a=s.onCaughtError;a(t.value,{componentStack:t.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function cd(s,e,t){return t=nt(t),t.tag=3,t.payload={element:null},t.callback=function(){dl(s,e)},t}function Lr(s){return s=nt(s),s.tag=3,s}function Tr(s,e,t,a){var n=t.type.getDerivedStateFromError;if(typeof n=="function"){var l=a.value;s.payload=function(){return n(l)},s.callback=function(){Dr(e,t,a)}}var i=t.stateNode;i!==null&&typeof i.componentDidCatch=="function"&&(s.callback=function(){Dr(e,t,a),typeof n!="function"&&(ut===null?ut=new Set([this]):ut.add(this));var d=a.stack;this.componentDidCatch(a.value,{componentStack:d!==null?d:""})})}function s_(s,e,t,a,n){if(t.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(e=t.alternate,e!==null&&la(e,t,n,!0),t=te.current,t!==null){switch(t.tag){case 31:case 13:return fe===null?ml():t.alternate===null&&hs===0&&(hs=3),t.flags&=-257,t.flags|=65536,t.lanes=n,a===Fn?t.flags|=16384:(e=t.updateQueue,e===null?t.updateQueue=new Set([a]):e.add(a),Nd(s,a,n)),!1;case 22:return t.flags|=65536,a===Fn?t.flags|=16384:(e=t.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([a])},t.updateQueue=e):(t=e.retryQueue,t===null?e.retryQueue=new Set([a]):t.add(a)),Nd(s,a,n)),!1}throw Error(_(435,t.tag))}return Nd(s,a,n),ml(),!1}if($)return e=te.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=n,a!==Li&&(s=Error(_(422),{cause:a}),Za(ue(s,t)))):(a!==Li&&(e=Error(_(423),{cause:a}),Za(ue(e,t))),s=s.current.alternate,s.flags|=65536,n&=-n,s.lanes|=n,a=ue(a,t),n=cd(s.stateNode,a,n),Ri(s,n),hs!==4&&(hs=2)),!1;var l=Error(_(520),{cause:a});if(l=ue(l,t),on===null?on=[l]:on.push(l),hs!==4&&(hs=2),e===null)return!0;a=ue(a,t),t=e;do{switch(t.tag){case 3:return t.flags|=65536,s=n&-n,t.lanes|=s,s=cd(t.stateNode,a,s),Ri(t,s),!1;case 1:if(e=t.type,l=t.stateNode,(t.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||l!==null&&typeof l.componentDidCatch=="function"&&(ut===null||!ut.has(l))))return t.flags|=65536,n&=-n,t.lanes|=n,n=Lr(n),Tr(n,s,t,a),Ri(t,n),!1}t=t.return}while(t!==null);return!1}var rd=Error(_(461)),ys=!1;function Es(s,e,t,a){e.child=s===null?zc(e,null,t,a):Ot(e,s.child,t,a)}function Er(s,e,t,a,n){t=t.render;var l=e.ref;if("ref"in a){var i={};for(var d in a)d!=="ref"&&(i[d]=a[d])}else i=a;return Bt(e),a=Xi(s,e,t,i,l,n),d=Qi(),s!==null&&!ys?(Ki(s,e,n),Ue(s,e,n)):($&&d&&Mi(e),e.flags|=1,Es(s,e,a,n),e.child)}function Ar(s,e,t,a,n){if(s===null){var l=t.type;return typeof l=="function"&&!xi(l)&&l.defaultProps===void 0&&t.compare===null?(e.tag=15,e.type=l,Br(s,e,l,a,n)):(s=Zn(t.type,null,a,e,e.mode,n),s.ref=e.ref,s.return=e,e.child=s)}if(l=s.child,!bd(s,n)){var i=l.memoizedProps;if(t=t.compare,t=t!==null?t:Ra,t(i,a)&&s.ref===e.ref)return Ue(s,e,n)}return e.flags|=1,s=Ne(l,a),s.ref=e.ref,s.return=e,e.child=s}function Br(s,e,t,a,n){if(s!==null){var l=s.memoizedProps;if(Ra(l,a)&&s.ref===e.ref)if(ys=!1,e.pendingProps=a=l,bd(s,n))(s.flags&131072)!==0&&(ys=!0);else return e.lanes=s.lanes,Ue(s,e,n)}return ud(s,e,t,a,n)}function zr(s,e,t,a){var n=a.children,l=s!==null?s.memoizedState:null;if(s===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((e.flags&128)!==0){if(l=l!==null?l.baseLanes|t:t,s!==null){for(a=e.child=s.child,n=0;a!==null;)n=n|a.lanes|a.childLanes,a=a.sibling;a=n&~l}else a=0,e.child=null;return Nr(s,e,l,t,a)}if((t&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},s!==null&&Qn(e,l!==null?l.cachePool:null),l!==null?Oc(e,l):qi(),jc(e);else return a=e.lanes=536870912,Nr(s,e,l!==null?l.baseLanes|t:t,t,a)}else l!==null?(Qn(e,l.cachePool),Oc(e,l),dt(),e.memoizedState=null):(s!==null&&Qn(e,null),qi(),dt());return Es(s,e,n,t),e.child}function sn(s,e){return s!==null&&s.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Nr(s,e,t,a,n){var l=Hi();return l=l===null?null:{parent:ws._currentValue,pool:l},e.memoizedState={baseLanes:t,cachePool:l},s!==null&&Qn(e,null),qi(),jc(e),s!==null&&la(s,e,a,!0),e.childLanes=n,null}function ol(s,e){return e=rl({mode:e.mode,children:e.children},s.mode),e.ref=s.ref,s.child=e,e.return=s,e}function Hr(s,e,t){return Ot(e,s.child,null,t),s=ol(e,e.pendingProps),s.flags|=2,ae(e),e.memoizedState=null,s}function e_(s,e,t){var a=e.pendingProps,n=(e.flags&128)!==0;if(e.flags&=-129,s===null){if($){if(a.mode==="hidden")return s=ol(e,a),e.lanes=536870912,sn(null,s);if(Yi(e),(s=ps)?(s=Ku(s,_e),s=s!==null&&s.data==="&"?s:null,s!==null&&(e.memoizedState={dehydrated:s,treeContext:$e!==null?{id:Se,overflow:Me}:null,retryLane:536870912,hydrationErrors:null},t=bc(s),t.return=e,e.child=t,Ls=e,ps=null)):s=null,s===null)throw et(e);return e.lanes=536870912,null}return ol(e,a)}var l=s.memoizedState;if(l!==null){var i=l.dehydrated;if(Yi(e),n)if(e.flags&256)e.flags&=-257,e=Hr(s,e,t);else if(e.memoizedState!==null)e.child=s.child,e.flags|=128,e=null;else throw Error(_(558));else if(ys||la(s,e,t,!1),n=(t&s.childLanes)!==0,ys||n){if(a=us,a!==null&&(i=So(a,t),i!==0&&i!==l.retryLane))throw l.retryLane=i,Lt(s,i),Js(a,s,i),rd;ml(),e=Hr(s,e,t)}else s=l.treeContext,ps=he(i.nextSibling),Ls=e,$=!0,st=null,_e=!1,s!==null&&kc(e,s),e=ol(e,a),e.flags|=4096;return e}return s=Ne(s.child,{mode:a.mode,children:a.children}),s.ref=e.ref,e.child=s,s.return=e,s}function cl(s,e){var t=e.ref;if(t===null)s!==null&&s.ref!==null&&(e.flags|=4194816);else{if(typeof t!="function"&&typeof t!="object")throw Error(_(284));(s===null||s.ref!==t)&&(e.flags|=4194816)}}function ud(s,e,t,a,n){return Bt(e),t=Xi(s,e,t,a,void 0,n),a=Qi(),s!==null&&!ys?(Ki(s,e,n),Ue(s,e,n)):($&&a&&Mi(e),e.flags|=1,Es(s,e,t,n),e.child)}function Or(s,e,t,a,n,l){return Bt(e),e.updateQueue=null,t=Rc(e,a,t,n),Vc(s),a=Qi(),s!==null&&!ys?(Ki(s,e,l),Ue(s,e,l)):($&&a&&Mi(e),e.flags|=1,Es(s,e,t,l),e.child)}function jr(s,e,t,a,n){if(Bt(e),e.stateNode===null){var l=ea,i=t.contextType;typeof i=="object"&&i!==null&&(l=Ts(i)),l=new t(a,l),e.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,l.updater=od,e.stateNode=l,l._reactInternals=e,l=e.stateNode,l.props=a,l.state=e.memoizedState,l.refs={},ji(e),i=t.contextType,l.context=typeof i=="object"&&i!==null?Ts(i):ea,l.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(dd(e,t,i,a),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(i=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),i!==l.state&&od.enqueueReplaceState(l,l.state,null),Ja(e,a,l,n),Fa(),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308),a=!0}else if(s===null){l=e.stateNode;var d=e.memoizedProps,o=Vt(t,d);l.props=o;var h=l.context,m=t.contextType;i=ea,typeof m=="object"&&m!==null&&(i=Ts(m));var y=t.getDerivedStateFromProps;m=typeof y=="function"||typeof l.getSnapshotBeforeUpdate=="function",d=e.pendingProps!==d,m||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(d||h!==i)&&xr(e,l,a,i),at=!1;var g=e.memoizedState;l.state=g,Ja(e,a,l,n),Fa(),h=e.memoizedState,d||g!==h||at?(typeof y=="function"&&(dd(e,t,y,a),h=e.memoizedState),(o=at||yr(e,t,o,a,g,h,i))?(m||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(e.flags|=4194308)):(typeof l.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=a,e.memoizedState=h),l.props=a,l.state=h,l.context=i,a=o):(typeof l.componentDidMount=="function"&&(e.flags|=4194308),a=!1)}else{l=e.stateNode,Vi(s,e),i=e.memoizedProps,m=Vt(t,i),l.props=m,y=e.pendingProps,g=l.context,h=t.contextType,o=ea,typeof h=="object"&&h!==null&&(o=Ts(h)),d=t.getDerivedStateFromProps,(h=typeof d=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==y||g!==o)&&xr(e,l,a,o),at=!1,g=e.memoizedState,l.state=g,Ja(e,a,l,n),Fa();var b=e.memoizedState;i!==y||g!==b||at||s!==null&&s.dependencies!==null&&Gn(s.dependencies)?(typeof d=="function"&&(dd(e,t,d,a),b=e.memoizedState),(m=at||yr(e,t,m,a,g,b,o)||s!==null&&s.dependencies!==null&&Gn(s.dependencies))?(h||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(a,b,o),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(a,b,o)),typeof l.componentDidUpdate=="function"&&(e.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof l.componentDidUpdate!="function"||i===s.memoizedProps&&g===s.memoizedState||(e.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===s.memoizedProps&&g===s.memoizedState||(e.flags|=1024),e.memoizedProps=a,e.memoizedState=b),l.props=a,l.state=b,l.context=o,a=m):(typeof l.componentDidUpdate!="function"||i===s.memoizedProps&&g===s.memoizedState||(e.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===s.memoizedProps&&g===s.memoizedState||(e.flags|=1024),a=!1)}return l=a,cl(s,e),a=(e.flags&128)!==0,l||a?(l=e.stateNode,t=a&&typeof t.getDerivedStateFromError!="function"?null:l.render(),e.flags|=1,s!==null&&a?(e.child=Ot(e,s.child,null,n),e.child=Ot(e,null,t,n)):Es(s,e,t,n),e.memoizedState=l.state,s=e.child):s=Ue(s,e,n),s}function Vr(s,e,t,a){return Et(),e.flags|=256,Es(s,e,t,a),e.child}var pd={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function vd(s){return{baseLanes:s,cachePool:Dc()}}function _d(s,e,t){return s=s!==null?s.childLanes&~t:0,e&&(s|=le),s}function Rr(s,e,t){var a=e.pendingProps,n=!1,l=(e.flags&128)!==0,i;if((i=l)||(i=s!==null&&s.memoizedState===null?!1:(bs.current&2)!==0),i&&(n=!0,e.flags&=-129),i=(e.flags&32)!==0,e.flags&=-33,s===null){if($){if(n?it(e):dt(),(s=ps)?(s=Ku(s,_e),s=s!==null&&s.data!=="&"?s:null,s!==null&&(e.memoizedState={dehydrated:s,treeContext:$e!==null?{id:Se,overflow:Me}:null,retryLane:536870912,hydrationErrors:null},t=bc(s),t.return=e,e.child=t,Ls=e,ps=null)):s=null,s===null)throw et(e);return Wd(s)?e.lanes=32:e.lanes=536870912,null}var d=a.children;return a=a.fallback,n?(dt(),n=e.mode,d=rl({mode:"hidden",children:d},n),a=Tt(a,n,t,null),d.return=e,a.return=e,d.sibling=a,e.child=d,a=e.child,a.memoizedState=vd(t),a.childLanes=_d(s,i,t),e.memoizedState=pd,sn(null,a)):(it(e),fd(e,d))}var o=s.memoizedState;if(o!==null&&(d=o.dehydrated,d!==null)){if(l)e.flags&256?(it(e),e.flags&=-257,e=hd(s,e,t)):e.memoizedState!==null?(dt(),e.child=s.child,e.flags|=128,e=null):(dt(),d=a.fallback,n=e.mode,a=rl({mode:"visible",children:a.children},n),d=Tt(d,n,t,null),d.flags|=2,a.return=e,d.return=e,a.sibling=d,e.child=a,Ot(e,s.child,null,t),a=e.child,a.memoizedState=vd(t),a.childLanes=_d(s,i,t),e.memoizedState=pd,e=sn(null,a));else if(it(e),Wd(d)){if(i=d.nextSibling&&d.nextSibling.dataset,i)var h=i.dgst;i=h,a=Error(_(419)),a.stack="",a.digest=i,Za({value:a,source:null,stack:null}),e=hd(s,e,t)}else if(ys||la(s,e,t,!1),i=(t&s.childLanes)!==0,ys||i){if(i=us,i!==null&&(a=So(i,t),a!==0&&a!==o.retryLane))throw o.retryLane=a,Lt(s,a),Js(i,s,a),rd;Jd(d)||ml(),e=hd(s,e,t)}else Jd(d)?(e.flags|=192,e.child=s.child,e=null):(s=o.treeContext,ps=he(d.nextSibling),Ls=e,$=!0,st=null,_e=!1,s!==null&&kc(e,s),e=fd(e,a.children),e.flags|=4096);return e}return n?(dt(),d=a.fallback,n=e.mode,o=s.child,h=o.sibling,a=Ne(o,{mode:"hidden",children:a.children}),a.subtreeFlags=o.subtreeFlags&65011712,h!==null?d=Ne(h,d):(d=Tt(d,n,t,null),d.flags|=2),d.return=e,a.return=e,a.sibling=d,e.child=a,sn(null,a),a=e.child,d=s.child.memoizedState,d===null?d=vd(t):(n=d.cachePool,n!==null?(o=ws._currentValue,n=n.parent!==o?{parent:o,pool:o}:n):n=Dc(),d={baseLanes:d.baseLanes|t,cachePool:n}),a.memoizedState=d,a.childLanes=_d(s,i,t),e.memoizedState=pd,sn(s.child,a)):(it(e),t=s.child,s=t.sibling,t=Ne(t,{mode:"visible",children:a.children}),t.return=e,t.sibling=null,s!==null&&(i=e.deletions,i===null?(e.deletions=[s],e.flags|=16):i.push(s)),e.child=t,e.memoizedState=null,t)}function fd(s,e){return e=rl({mode:"visible",children:e},s.mode),e.return=s,s.child=e}function rl(s,e){return s=ee(22,s,null,e),s.lanes=0,s}function hd(s,e,t){return Ot(e,s.child,null,t),s=fd(e,e.pendingProps.children),s.flags|=2,e.memoizedState=null,s}function Ur(s,e,t){s.lanes|=e;var a=s.alternate;a!==null&&(a.lanes|=e),Ai(s.return,e,t)}function gd(s,e,t,a,n,l){var i=s.memoizedState;i===null?s.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:a,tail:t,tailMode:n,treeForkCount:l}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=a,i.tail=t,i.tailMode=n,i.treeForkCount=l)}function qr(s,e,t){var a=e.pendingProps,n=a.revealOrder,l=a.tail;a=a.children;var i=bs.current,d=(i&2)!==0;if(d?(i=i&1|2,e.flags|=128):i&=1,E(bs,i),Es(s,e,a,t),a=$?qa:0,!d&&s!==null&&(s.flags&128)!==0)s:for(s=e.child;s!==null;){if(s.tag===13)s.memoizedState!==null&&Ur(s,t,e);else if(s.tag===19)Ur(s,t,e);else if(s.child!==null){s.child.return=s,s=s.child;continue}if(s===e)break s;for(;s.sibling===null;){if(s.return===null||s.return===e)break s;s=s.return}s.sibling.return=s.return,s=s.sibling}switch(n){case"forwards":for(t=e.child,n=null;t!==null;)s=t.alternate,s!==null&&Pn(s)===null&&(n=t),t=t.sibling;t=n,t===null?(n=e.child,e.child=null):(n=t.sibling,t.sibling=null),gd(e,!1,n,t,l,a);break;case"backwards":case"unstable_legacy-backwards":for(t=null,n=e.child,e.child=null;n!==null;){if(s=n.alternate,s!==null&&Pn(s)===null){e.child=n;break}s=n.sibling,n.sibling=t,t=n,n=s}gd(e,!0,t,null,l,a);break;case"together":gd(e,!1,null,null,void 0,a);break;default:e.memoizedState=null}return e.child}function Ue(s,e,t){if(s!==null&&(e.dependencies=s.dependencies),rt|=e.lanes,(t&e.childLanes)===0)if(s!==null){if(la(s,e,t,!1),(t&e.childLanes)===0)return null}else return null;if(s!==null&&e.child!==s.child)throw Error(_(153));if(e.child!==null){for(s=e.child,t=Ne(s,s.pendingProps),e.child=t,t.return=e;s.sibling!==null;)s=s.sibling,t=t.sibling=Ne(s,s.pendingProps),t.return=e;t.sibling=null}return e.child}function bd(s,e){return(s.lanes&e)!==0?!0:(s=s.dependencies,!!(s!==null&&Gn(s)))}function t_(s,e,t){switch(e.tag){case 3:Os(e,e.stateNode.containerInfo),tt(e,ws,s.memoizedState.cache),Et();break;case 27:case 5:Ma(e);break;case 4:Os(e,e.stateNode.containerInfo);break;case 10:tt(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,Yi(e),null;break;case 13:var a=e.memoizedState;if(a!==null)return a.dehydrated!==null?(it(e),e.flags|=128,null):(t&e.child.childLanes)!==0?Rr(s,e,t):(it(e),s=Ue(s,e,t),s!==null?s.sibling:null);it(e);break;case 19:var n=(s.flags&128)!==0;if(a=(t&e.childLanes)!==0,a||(la(s,e,t,!1),a=(t&e.childLanes)!==0),n){if(a)return qr(s,e,t);e.flags|=128}if(n=e.memoizedState,n!==null&&(n.rendering=null,n.tail=null,n.lastEffect=null),E(bs,bs.current),a)break;return null;case 22:return e.lanes=0,zr(s,e,t,e.pendingProps);case 24:tt(e,ws,s.memoizedState.cache)}return Ue(s,e,t)}function Zr(s,e,t){if(s!==null)if(s.memoizedProps!==e.pendingProps)ys=!0;else{if(!bd(s,t)&&(e.flags&128)===0)return ys=!1,t_(s,e,t);ys=(s.flags&131072)!==0}else ys=!1,$&&(e.flags&1048576)!==0&&wc(e,qa,e.index);switch(e.lanes=0,e.tag){case 16:s:{var a=e.pendingProps;if(s=Nt(e.elementType),e.type=s,typeof s=="function")xi(s)?(a=Vt(s,a),e.tag=1,e=jr(null,e,s,a,t)):(e.tag=0,e=ud(null,e,s,a,t));else{if(s!=null){var n=s.$$typeof;if(n===de){e.tag=11,e=Er(null,e,s,a,t);break s}else if(n===P){e.tag=14,e=Ar(null,e,s,a,t);break s}}throw e=Ee(s)||s,Error(_(306,e,""))}}return e;case 0:return ud(s,e,e.type,e.pendingProps,t);case 1:return a=e.type,n=Vt(a,e.pendingProps),jr(s,e,a,n,t);case 3:s:{if(Os(e,e.stateNode.containerInfo),s===null)throw Error(_(387));a=e.pendingProps;var l=e.memoizedState;n=l.element,Vi(s,e),Ja(e,a,null,t);var i=e.memoizedState;if(a=i.cache,tt(e,ws,a),a!==l.cache&&Bi(e,[ws],t,!0),Fa(),a=i.element,l.isDehydrated)if(l={element:a,isDehydrated:!1,cache:i.cache},e.updateQueue.baseState=l,e.memoizedState=l,e.flags&256){e=Vr(s,e,a,t);break s}else if(a!==n){n=ue(Error(_(424)),e),Za(n),e=Vr(s,e,a,t);break s}else{switch(s=e.stateNode.containerInfo,s.nodeType){case 9:s=s.body;break;default:s=s.nodeName==="HTML"?s.ownerDocument.body:s}for(ps=he(s.firstChild),Ls=e,$=!0,st=null,_e=!0,t=zc(e,null,a,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling}else{if(Et(),a===n){e=Ue(s,e,t);break s}Es(s,e,a,t)}e=e.child}return e;case 26:return cl(s,e),s===null?(t=$u(e.type,null,e.pendingProps,null))?e.memoizedState=t:$||(t=e.type,s=e.pendingProps,a=Ml(X.current).createElement(t),a[Ds]=e,a[Ys]=s,As(a,t,s),Ss(a),e.stateNode=a):e.memoizedState=$u(e.type,s.memoizedProps,e.pendingProps,s.memoizedState),null;case 27:return Ma(e),s===null&&$&&(a=e.stateNode=Wu(e.type,e.pendingProps,X.current),Ls=e,_e=!0,n=ps,ft(e.type)?(Id=n,ps=he(a.firstChild)):ps=n),Es(s,e,e.pendingProps.children,t),cl(s,e),s===null&&(e.flags|=4194304),e.child;case 5:return s===null&&$&&((n=a=ps)&&(a=B_(a,e.type,e.pendingProps,_e),a!==null?(e.stateNode=a,Ls=e,ps=he(a.firstChild),_e=!1,n=!0):n=!1),n||et(e)),Ma(e),n=e.type,l=e.pendingProps,i=s!==null?s.memoizedProps:null,a=l.children,Qd(n,l)?a=null:i!==null&&Qd(n,i)&&(e.flags|=32),e.memoizedState!==null&&(n=Xi(s,e,Kv,null,null,t),hn._currentValue=n),cl(s,e),Es(s,e,a,t),e.child;case 6:return s===null&&$&&((s=t=ps)&&(t=z_(t,e.pendingProps,_e),t!==null?(e.stateNode=t,Ls=e,ps=null,s=!0):s=!1),s||et(e)),null;case 13:return Rr(s,e,t);case 4:return Os(e,e.stateNode.containerInfo),a=e.pendingProps,s===null?e.child=Ot(e,null,a,t):Es(s,e,a,t),e.child;case 11:return Er(s,e,e.type,e.pendingProps,t);case 7:return Es(s,e,e.pendingProps,t),e.child;case 8:return Es(s,e,e.pendingProps.children,t),e.child;case 12:return Es(s,e,e.pendingProps.children,t),e.child;case 10:return a=e.pendingProps,tt(e,e.type,a.value),Es(s,e,a.children,t),e.child;case 9:return n=e.type._context,a=e.pendingProps.children,Bt(e),n=Ts(n),a=a(n),e.flags|=1,Es(s,e,a,t),e.child;case 14:return Ar(s,e,e.type,e.pendingProps,t);case 15:return Br(s,e,e.type,e.pendingProps,t);case 19:return qr(s,e,t);case 31:return e_(s,e,t);case 22:return zr(s,e,t,e.pendingProps);case 24:return Bt(e),a=Ts(ws),s===null?(n=Hi(),n===null&&(n=us,l=zi(),n.pooledCache=l,l.refCount++,l!==null&&(n.pooledCacheLanes|=t),n=l),e.memoizedState={parent:a,cache:n},ji(e),tt(e,ws,n)):((s.lanes&t)!==0&&(Vi(s,e),Ja(e,null,null,t),Fa()),n=s.memoizedState,l=e.memoizedState,n.parent!==a?(n={parent:a,cache:a},e.memoizedState=n,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=n),tt(e,ws,a)):(a=l.cache,tt(e,ws,a),a!==n.cache&&Bi(e,[ws],t,!0))),Es(s,e,e.pendingProps.children,t),e.child;case 29:throw e.pendingProps}throw Error(_(156,e.tag))}function qe(s){s.flags|=4}function md(s,e,t,a,n){if((e=(s.mode&32)!==0)&&(e=!1),e){if(s.flags|=16777216,(n&335544128)===n)if(s.stateNode.complete)s.flags|=8192;else if(fu())s.flags|=8192;else throw Ht=Fn,Oi}else s.flags&=-16777217}function Yr(s,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)s.flags&=-16777217;else if(s.flags|=16777216,!np(e))if(fu())s.flags|=8192;else throw Ht=Fn,Oi}function ul(s,e){e!==null&&(s.flags|=4),s.flags&16384&&(e=s.tag!==22?yo():536870912,s.lanes|=e,ga|=e)}function en(s,e){if(!$)switch(s.tailMode){case"hidden":e=s.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?s.tail=null:t.sibling=null;break;case"collapsed":t=s.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e||s.tail===null?s.tail=null:s.tail.sibling=null:a.sibling=null}}function vs(s){var e=s.alternate!==null&&s.alternate.child===s.child,t=0,a=0;if(e)for(var n=s.child;n!==null;)t|=n.lanes|n.childLanes,a|=n.subtreeFlags&65011712,a|=n.flags&65011712,n.return=s,n=n.sibling;else for(n=s.child;n!==null;)t|=n.lanes|n.childLanes,a|=n.subtreeFlags,a|=n.flags,n.return=s,n=n.sibling;return s.subtreeFlags|=a,s.childLanes=t,e}function a_(s,e,t){var a=e.pendingProps;switch(Di(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return vs(e),null;case 1:return vs(e),null;case 3:return t=e.stateNode,a=null,s!==null&&(a=s.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),je(ws),gs(),t.pendingContext&&(t.context=t.pendingContext,t.pendingContext=null),(s===null||s.child===null)&&(na(e)?qe(e):s===null||s.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Ti())),vs(e),null;case 26:var n=e.type,l=e.memoizedState;return s===null?(qe(e),l!==null?(vs(e),Yr(e,l)):(vs(e),md(e,n,null,a,t))):l?l!==s.memoizedState?(qe(e),vs(e),Yr(e,l)):(vs(e),e.flags&=-16777217):(s=s.memoizedProps,s!==a&&qe(e),vs(e),md(e,n,s,a,t)),null;case 27:if(yn(e),t=X.current,n=e.type,s!==null&&e.stateNode!=null)s.memoizedProps!==a&&qe(e);else{if(!a){if(e.stateNode===null)throw Error(_(166));return vs(e),null}s=B.current,na(e)?yc(e):(s=Wu(n,a,t),e.stateNode=s,qe(e))}return vs(e),null;case 5:if(yn(e),n=e.type,s!==null&&e.stateNode!=null)s.memoizedProps!==a&&qe(e);else{if(!a){if(e.stateNode===null)throw Error(_(166));return vs(e),null}if(l=B.current,na(e))yc(e);else{var i=Ml(X.current);switch(l){case 1:l=i.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:l=i.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":l=i.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":l=i.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":l=i.createElement("div"),l.innerHTML="<script><\/script>",l=l.removeChild(l.firstChild);break;case"select":l=typeof a.is=="string"?i.createElement("select",{is:a.is}):i.createElement("select"),a.multiple?l.multiple=!0:a.size&&(l.size=a.size);break;default:l=typeof a.is=="string"?i.createElement(n,{is:a.is}):i.createElement(n)}}l[Ds]=e,l[Ys]=a;s:for(i=e.child;i!==null;){if(i.tag===5||i.tag===6)l.appendChild(i.stateNode);else if(i.tag!==4&&i.tag!==27&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break s;for(;i.sibling===null;){if(i.return===null||i.return===e)break s;i=i.return}i.sibling.return=i.return,i=i.sibling}e.stateNode=l;s:switch(As(l,n,a),n){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break s;case"img":a=!0;break s;default:a=!1}a&&qe(e)}}return vs(e),md(e,e.type,s===null?null:s.memoizedProps,e.pendingProps,t),null;case 6:if(s&&e.stateNode!=null)s.memoizedProps!==a&&qe(e);else{if(typeof a!="string"&&e.stateNode===null)throw Error(_(166));if(s=X.current,na(e)){if(s=e.stateNode,t=e.memoizedProps,a=null,n=Ls,n!==null)switch(n.tag){case 27:case 5:a=n.memoizedProps}s[Ds]=e,s=!!(s.nodeValue===t||a!==null&&a.suppressHydrationWarning===!0||Ru(s.nodeValue,t)),s||et(e,!0)}else s=Ml(s).createTextNode(a),s[Ds]=e,e.stateNode=s}return vs(e),null;case 31:if(t=e.memoizedState,s===null||s.memoizedState!==null){if(a=na(e),t!==null){if(s===null){if(!a)throw Error(_(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(_(557));s[Ds]=e}else Et(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;vs(e),s=!1}else t=Ti(),s!==null&&s.memoizedState!==null&&(s.memoizedState.hydrationErrors=t),s=!0;if(!s)return e.flags&256?(ae(e),e):(ae(e),null);if((e.flags&128)!==0)throw Error(_(558))}return vs(e),null;case 13:if(a=e.memoizedState,s===null||s.memoizedState!==null&&s.memoizedState.dehydrated!==null){if(n=na(e),a!==null&&a.dehydrated!==null){if(s===null){if(!n)throw Error(_(318));if(n=e.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(_(317));n[Ds]=e}else Et(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;vs(e),n=!1}else n=Ti(),s!==null&&s.memoizedState!==null&&(s.memoizedState.hydrationErrors=n),n=!0;if(!n)return e.flags&256?(ae(e),e):(ae(e),null)}return ae(e),(e.flags&128)!==0?(e.lanes=t,e):(t=a!==null,s=s!==null&&s.memoizedState!==null,t&&(a=e.child,n=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(n=a.alternate.memoizedState.cachePool.pool),l=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(l=a.memoizedState.cachePool.pool),l!==n&&(a.flags|=2048)),t!==s&&t&&(e.child.flags|=8192),ul(e,e.updateQueue),vs(e),null);case 4:return gs(),s===null&&qd(e.stateNode.containerInfo),vs(e),null;case 10:return je(e.type),vs(e),null;case 19:if(C(bs),a=e.memoizedState,a===null)return vs(e),null;if(n=(e.flags&128)!==0,l=a.rendering,l===null)if(n)en(a,!1);else{if(hs!==0||s!==null&&(s.flags&128)!==0)for(s=e.child;s!==null;){if(l=Pn(s),l!==null){for(e.flags|=128,en(a,!1),s=l.updateQueue,e.updateQueue=s,ul(e,s),e.subtreeFlags=0,s=t,t=e.child;t!==null;)gc(t,s),t=t.sibling;return E(bs,bs.current&1|2),$&&He(e,a.treeForkCount),e.child}s=s.sibling}a.tail!==null&&Is()>hl&&(e.flags|=128,n=!0,en(a,!1),e.lanes=4194304)}else{if(!n)if(s=Pn(l),s!==null){if(e.flags|=128,n=!0,s=s.updateQueue,e.updateQueue=s,ul(e,s),en(a,!0),a.tail===null&&a.tailMode==="hidden"&&!l.alternate&&!$)return vs(e),null}else 2*Is()-a.renderingStartTime>hl&&t!==536870912&&(e.flags|=128,n=!0,en(a,!1),e.lanes=4194304);a.isBackwards?(l.sibling=e.child,e.child=l):(s=a.last,s!==null?s.sibling=l:e.child=l,a.last=l)}return a.tail!==null?(s=a.tail,a.rendering=s,a.tail=s.sibling,a.renderingStartTime=Is(),s.sibling=null,t=bs.current,E(bs,n?t&1|2:t&1),$&&He(e,a.treeForkCount),s):(vs(e),null);case 22:case 23:return ae(e),Zi(),a=e.memoizedState!==null,s!==null?s.memoizedState!==null!==a&&(e.flags|=8192):a&&(e.flags|=8192),a?(t&536870912)!==0&&(e.flags&128)===0&&(vs(e),e.subtreeFlags&6&&(e.flags|=8192)):vs(e),t=e.updateQueue,t!==null&&ul(e,t.retryQueue),t=null,s!==null&&s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(t=s.memoizedState.cachePool.pool),a=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),a!==t&&(e.flags|=2048),s!==null&&C(zt),null;case 24:return t=null,s!==null&&(t=s.memoizedState.cache),e.memoizedState.cache!==t&&(e.flags|=2048),je(ws),vs(e),null;case 25:return null;case 30:return null}throw Error(_(156,e.tag))}function n_(s,e){switch(Di(e),e.tag){case 1:return s=e.flags,s&65536?(e.flags=s&-65537|128,e):null;case 3:return je(ws),gs(),s=e.flags,(s&65536)!==0&&(s&128)===0?(e.flags=s&-65537|128,e):null;case 26:case 27:case 5:return yn(e),null;case 31:if(e.memoizedState!==null){if(ae(e),e.alternate===null)throw Error(_(340));Et()}return s=e.flags,s&65536?(e.flags=s&-65537|128,e):null;case 13:if(ae(e),s=e.memoizedState,s!==null&&s.dehydrated!==null){if(e.alternate===null)throw Error(_(340));Et()}return s=e.flags,s&65536?(e.flags=s&-65537|128,e):null;case 19:return C(bs),null;case 4:return gs(),null;case 10:return je(e.type),null;case 22:case 23:return ae(e),Zi(),s!==null&&C(zt),s=e.flags,s&65536?(e.flags=s&-65537|128,e):null;case 24:return je(ws),null;case 25:return null;default:return null}}function Gr(s,e){switch(Di(e),e.tag){case 3:je(ws),gs();break;case 26:case 27:case 5:yn(e);break;case 4:gs();break;case 31:e.memoizedState!==null&&ae(e);break;case 13:ae(e);break;case 19:C(bs);break;case 10:je(e.type);break;case 22:case 23:ae(e),Zi(),s!==null&&C(zt);break;case 24:je(ws)}}function tn(s,e){try{var t=e.updateQueue,a=t!==null?t.lastEffect:null;if(a!==null){var n=a.next;t=n;do{if((t.tag&s)===s){a=void 0;var l=t.create,i=t.inst;a=l(),i.destroy=a}t=t.next}while(t!==n)}}catch(d){ls(e,e.return,d)}}function ot(s,e,t){try{var a=e.updateQueue,n=a!==null?a.lastEffect:null;if(n!==null){var l=n.next;a=l;do{if((a.tag&s)===s){var i=a.inst,d=i.destroy;if(d!==void 0){i.destroy=void 0,n=e;var o=t,h=d;try{h()}catch(m){ls(n,o,m)}}}a=a.next}while(a!==l)}}catch(m){ls(e,e.return,m)}}function Xr(s){var e=s.updateQueue;if(e!==null){var t=s.stateNode;try{Hc(e,t)}catch(a){ls(s,s.return,a)}}}function Qr(s,e,t){t.props=Vt(s.type,s.memoizedProps),t.state=s.memoizedState;try{t.componentWillUnmount()}catch(a){ls(s,e,a)}}function an(s,e){try{var t=s.ref;if(t!==null){switch(s.tag){case 26:case 27:case 5:var a=s.stateNode;break;case 30:a=s.stateNode;break;default:a=s.stateNode}typeof t=="function"?s.refCleanup=t(a):t.current=a}}catch(n){ls(s,e,n)}}function De(s,e){var t=s.ref,a=s.refCleanup;if(t!==null)if(typeof a=="function")try{a()}catch(n){ls(s,e,n)}finally{s.refCleanup=null,s=s.alternate,s!=null&&(s.refCleanup=null)}else if(typeof t=="function")try{t(null)}catch(n){ls(s,e,n)}else t.current=null}function Kr(s){var e=s.type,t=s.memoizedProps,a=s.stateNode;try{s:switch(e){case"button":case"input":case"select":case"textarea":t.autoFocus&&a.focus();break s;case"img":t.src?a.src=t.src:t.srcSet&&(a.srcset=t.srcSet)}}catch(n){ls(s,s.return,n)}}function wd(s,e,t){try{var a=s.stateNode;M_(a,s.type,t,e),a[Ys]=e}catch(n){ls(s,s.return,n)}}function Fr(s){return s.tag===5||s.tag===3||s.tag===26||s.tag===27&&ft(s.type)||s.tag===4}function kd(s){s:for(;;){for(;s.sibling===null;){if(s.return===null||Fr(s.return))return null;s=s.return}for(s.sibling.return=s.return,s=s.sibling;s.tag!==5&&s.tag!==6&&s.tag!==18;){if(s.tag===27&&ft(s.type)||s.flags&2||s.child===null||s.tag===4)continue s;s.child.return=s,s=s.child}if(!(s.flags&2))return s.stateNode}}function yd(s,e,t){var a=s.tag;if(a===5||a===6)s=s.stateNode,e?(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t).insertBefore(s,e):(e=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,e.appendChild(s),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=Be));else if(a!==4&&(a===27&&ft(s.type)&&(t=s.stateNode,e=null),s=s.child,s!==null))for(yd(s,e,t),s=s.sibling;s!==null;)yd(s,e,t),s=s.sibling}function pl(s,e,t){var a=s.tag;if(a===5||a===6)s=s.stateNode,e?t.insertBefore(s,e):t.appendChild(s);else if(a!==4&&(a===27&&ft(s.type)&&(t=s.stateNode),s=s.child,s!==null))for(pl(s,e,t),s=s.sibling;s!==null;)pl(s,e,t),s=s.sibling}function Jr(s){var e=s.stateNode,t=s.memoizedProps;try{for(var a=s.type,n=e.attributes;n.length;)e.removeAttributeNode(n[0]);As(e,a,t),e[Ds]=s,e[Ys]=t}catch(l){ls(s,s.return,l)}}var Ze=!1,xs=!1,xd=!1,Wr=typeof WeakSet=="function"?WeakSet:Set,Ms=null;function l_(s,e){if(s=s.containerInfo,Gd=zl,s=oc(s),hi(s)){if("selectionStart"in s)var t={start:s.selectionStart,end:s.selectionEnd};else s:{t=(t=s.ownerDocument)&&t.defaultView||window;var a=t.getSelection&&t.getSelection();if(a&&a.rangeCount!==0){t=a.anchorNode;var n=a.anchorOffset,l=a.focusNode;a=a.focusOffset;try{t.nodeType,l.nodeType}catch{t=null;break s}var i=0,d=-1,o=-1,h=0,m=0,y=s,g=null;e:for(;;){for(var b;y!==t||n!==0&&y.nodeType!==3||(d=i+n),y!==l||a!==0&&y.nodeType!==3||(o=i+a),y.nodeType===3&&(i+=y.nodeValue.length),(b=y.firstChild)!==null;)g=y,y=b;for(;;){if(y===s)break e;if(g===t&&++h===n&&(d=i),g===l&&++m===a&&(o=i),(b=y.nextSibling)!==null)break;y=g,g=y.parentNode}y=b}t=d===-1||o===-1?null:{start:d,end:o}}else t=null}t=t||{start:0,end:0}}else t=null;for(Xd={focusedElem:s,selectionRange:t},zl=!1,Ms=e;Ms!==null;)if(e=Ms,s=e.child,(e.subtreeFlags&1028)!==0&&s!==null)s.return=e,Ms=s;else for(;Ms!==null;){switch(e=Ms,l=e.alternate,s=e.flags,e.tag){case 0:if((s&4)!==0&&(s=e.updateQueue,s=s!==null?s.events:null,s!==null))for(t=0;t<s.length;t++)n=s[t],n.ref.impl=n.nextImpl;break;case 11:case 15:break;case 1:if((s&1024)!==0&&l!==null){s=void 0,t=e,n=l.memoizedProps,l=l.memoizedState,a=t.stateNode;try{var A=Vt(t.type,n);s=a.getSnapshotBeforeUpdate(A,l),a.__reactInternalSnapshotBeforeUpdate=s}catch(R){ls(t,t.return,R)}}break;case 3:if((s&1024)!==0){if(s=e.stateNode.containerInfo,t=s.nodeType,t===9)Fd(s);else if(t===1)switch(s.nodeName){case"HEAD":case"HTML":case"BODY":Fd(s);break;default:s.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((s&1024)!==0)throw Error(_(163))}if(s=e.sibling,s!==null){s.return=e.return,Ms=s;break}Ms=e.return}}function Ir(s,e,t){var a=t.flags;switch(t.tag){case 0:case 11:case 15:Ge(s,t),a&4&&tn(5,t);break;case 1:if(Ge(s,t),a&4)if(s=t.stateNode,e===null)try{s.componentDidMount()}catch(i){ls(t,t.return,i)}else{var n=Vt(t.type,e.memoizedProps);e=e.memoizedState;try{s.componentDidUpdate(n,e,s.__reactInternalSnapshotBeforeUpdate)}catch(i){ls(t,t.return,i)}}a&64&&Xr(t),a&512&&an(t,t.return);break;case 3:if(Ge(s,t),a&64&&(s=t.updateQueue,s!==null)){if(e=null,t.child!==null)switch(t.child.tag){case 27:case 5:e=t.child.stateNode;break;case 1:e=t.child.stateNode}try{Hc(s,e)}catch(i){ls(t,t.return,i)}}break;case 27:e===null&&a&4&&Jr(t);case 26:case 5:Ge(s,t),e===null&&a&4&&Kr(t),a&512&&an(t,t.return);break;case 12:Ge(s,t);break;case 31:Ge(s,t),a&4&&su(s,t);break;case 13:Ge(s,t),a&4&&eu(s,t),a&64&&(s=t.memoizedState,s!==null&&(s=s.dehydrated,s!==null&&(t=__.bind(null,t),N_(s,t))));break;case 22:if(a=t.memoizedState!==null||Ze,!a){e=e!==null&&e.memoizedState!==null||xs,n=Ze;var l=xs;Ze=a,(xs=e)&&!l?Xe(s,t,(t.subtreeFlags&8772)!==0):Ge(s,t),Ze=n,xs=l}break;case 30:break;default:Ge(s,t)}}function Pr(s){var e=s.alternate;e!==null&&(s.alternate=null,Pr(e)),s.child=null,s.deletions=null,s.sibling=null,s.tag===5&&(e=s.stateNode,e!==null&&$l(e)),s.stateNode=null,s.return=null,s.dependencies=null,s.memoizedProps=null,s.memoizedState=null,s.pendingProps=null,s.stateNode=null,s.updateQueue=null}var _s=null,Xs=!1;function Ye(s,e,t){for(t=t.child;t!==null;)$r(s,e,t),t=t.sibling}function $r(s,e,t){if(Ps&&typeof Ps.onCommitFiberUnmount=="function")try{Ps.onCommitFiberUnmount(Da,t)}catch{}switch(t.tag){case 26:xs||De(t,e),Ye(s,e,t),t.memoizedState?t.memoizedState.count--:t.stateNode&&(t=t.stateNode,t.parentNode.removeChild(t));break;case 27:xs||De(t,e);var a=_s,n=Xs;ft(t.type)&&(_s=t.stateNode,Xs=!1),Ye(s,e,t),vn(t.stateNode),_s=a,Xs=n;break;case 5:xs||De(t,e);case 6:if(a=_s,n=Xs,_s=null,Ye(s,e,t),_s=a,Xs=n,_s!==null)if(Xs)try{(_s.nodeType===9?_s.body:_s.nodeName==="HTML"?_s.ownerDocument.body:_s).removeChild(t.stateNode)}catch(l){ls(t,e,l)}else try{_s.removeChild(t.stateNode)}catch(l){ls(t,e,l)}break;case 18:_s!==null&&(Xs?(s=_s,Xu(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,t.stateNode),Sa(s)):Xu(_s,t.stateNode));break;case 4:a=_s,n=Xs,_s=t.stateNode.containerInfo,Xs=!0,Ye(s,e,t),_s=a,Xs=n;break;case 0:case 11:case 14:case 15:ot(2,t,e),xs||ot(4,t,e),Ye(s,e,t);break;case 1:xs||(De(t,e),a=t.stateNode,typeof a.componentWillUnmount=="function"&&Qr(t,e,a)),Ye(s,e,t);break;case 21:Ye(s,e,t);break;case 22:xs=(a=xs)||t.memoizedState!==null,Ye(s,e,t),xs=a;break;default:Ye(s,e,t)}}function su(s,e){if(e.memoizedState===null&&(s=e.alternate,s!==null&&(s=s.memoizedState,s!==null))){s=s.dehydrated;try{Sa(s)}catch(t){ls(e,e.return,t)}}}function eu(s,e){if(e.memoizedState===null&&(s=e.alternate,s!==null&&(s=s.memoizedState,s!==null&&(s=s.dehydrated,s!==null))))try{Sa(s)}catch(t){ls(e,e.return,t)}}function i_(s){switch(s.tag){case 31:case 13:case 19:var e=s.stateNode;return e===null&&(e=s.stateNode=new Wr),e;case 22:return s=s.stateNode,e=s._retryCache,e===null&&(e=s._retryCache=new Wr),e;default:throw Error(_(435,s.tag))}}function vl(s,e){var t=i_(s);e.forEach(function(a){if(!t.has(a)){t.add(a);var n=f_.bind(null,s,a);a.then(n,n)}})}function Qs(s,e){var t=e.deletions;if(t!==null)for(var a=0;a<t.length;a++){var n=t[a],l=s,i=e,d=i;s:for(;d!==null;){switch(d.tag){case 27:if(ft(d.type)){_s=d.stateNode,Xs=!1;break s}break;case 5:_s=d.stateNode,Xs=!1;break s;case 3:case 4:_s=d.stateNode.containerInfo,Xs=!0;break s}d=d.return}if(_s===null)throw Error(_(160));$r(l,i,n),_s=null,Xs=!1,l=n.alternate,l!==null&&(l.return=null),n.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)tu(e,s),e=e.sibling}var we=null;function tu(s,e){var t=s.alternate,a=s.flags;switch(s.tag){case 0:case 11:case 14:case 15:Qs(e,s),Ks(s),a&4&&(ot(3,s,s.return),tn(3,s),ot(5,s,s.return));break;case 1:Qs(e,s),Ks(s),a&512&&(xs||t===null||De(t,t.return)),a&64&&Ze&&(s=s.updateQueue,s!==null&&(a=s.callbacks,a!==null&&(t=s.shared.hiddenCallbacks,s.shared.hiddenCallbacks=t===null?a:t.concat(a))));break;case 26:var n=we;if(Qs(e,s),Ks(s),a&512&&(xs||t===null||De(t,t.return)),a&4){var l=t!==null?t.memoizedState:null;if(a=s.memoizedState,t===null)if(a===null)if(s.stateNode===null){s:{a=s.type,t=s.memoizedProps,n=n.ownerDocument||n;e:switch(a){case"title":l=n.getElementsByTagName("title")[0],(!l||l[Ea]||l[Ds]||l.namespaceURI==="http://www.w3.org/2000/svg"||l.hasAttribute("itemprop"))&&(l=n.createElement(a),n.head.insertBefore(l,n.querySelector("head > title"))),As(l,a,t),l[Ds]=s,Ss(l),a=l;break s;case"link":var i=tp("link","href",n).get(a+(t.href||""));if(i){for(var d=0;d<i.length;d++)if(l=i[d],l.getAttribute("href")===(t.href==null||t.href===""?null:t.href)&&l.getAttribute("rel")===(t.rel==null?null:t.rel)&&l.getAttribute("title")===(t.title==null?null:t.title)&&l.getAttribute("crossorigin")===(t.crossOrigin==null?null:t.crossOrigin)){i.splice(d,1);break e}}l=n.createElement(a),As(l,a,t),n.head.appendChild(l);break;case"meta":if(i=tp("meta","content",n).get(a+(t.content||""))){for(d=0;d<i.length;d++)if(l=i[d],l.getAttribute("content")===(t.content==null?null:""+t.content)&&l.getAttribute("name")===(t.name==null?null:t.name)&&l.getAttribute("property")===(t.property==null?null:t.property)&&l.getAttribute("http-equiv")===(t.httpEquiv==null?null:t.httpEquiv)&&l.getAttribute("charset")===(t.charSet==null?null:t.charSet)){i.splice(d,1);break e}}l=n.createElement(a),As(l,a,t),n.head.appendChild(l);break;default:throw Error(_(468,a))}l[Ds]=s,Ss(l),a=l}s.stateNode=a}else ap(n,s.type,s.stateNode);else s.stateNode=ep(n,a,s.memoizedProps);else l!==a?(l===null?t.stateNode!==null&&(t=t.stateNode,t.parentNode.removeChild(t)):l.count--,a===null?ap(n,s.type,s.stateNode):ep(n,a,s.memoizedProps)):a===null&&s.stateNode!==null&&wd(s,s.memoizedProps,t.memoizedProps)}break;case 27:Qs(e,s),Ks(s),a&512&&(xs||t===null||De(t,t.return)),t!==null&&a&4&&wd(s,s.memoizedProps,t.memoizedProps);break;case 5:if(Qs(e,s),Ks(s),a&512&&(xs||t===null||De(t,t.return)),s.flags&32){n=s.stateNode;try{Ft(n,"")}catch(A){ls(s,s.return,A)}}a&4&&s.stateNode!=null&&(n=s.memoizedProps,wd(s,n,t!==null?t.memoizedProps:n)),a&1024&&(xd=!0);break;case 6:if(Qs(e,s),Ks(s),a&4){if(s.stateNode===null)throw Error(_(162));a=s.memoizedProps,t=s.stateNode;try{t.nodeValue=a}catch(A){ls(s,s.return,A)}}break;case 3:if(Tl=null,n=we,we=Dl(e.containerInfo),Qs(e,s),we=n,Ks(s),a&4&&t!==null&&t.memoizedState.isDehydrated)try{Sa(e.containerInfo)}catch(A){ls(s,s.return,A)}xd&&(xd=!1,au(s));break;case 4:a=we,we=Dl(s.stateNode.containerInfo),Qs(e,s),Ks(s),we=a;break;case 12:Qs(e,s),Ks(s);break;case 31:Qs(e,s),Ks(s),a&4&&(a=s.updateQueue,a!==null&&(s.updateQueue=null,vl(s,a)));break;case 13:Qs(e,s),Ks(s),s.child.flags&8192&&s.memoizedState!==null!=(t!==null&&t.memoizedState!==null)&&(fl=Is()),a&4&&(a=s.updateQueue,a!==null&&(s.updateQueue=null,vl(s,a)));break;case 22:n=s.memoizedState!==null;var o=t!==null&&t.memoizedState!==null,h=Ze,m=xs;if(Ze=h||n,xs=m||o,Qs(e,s),xs=m,Ze=h,Ks(s),a&8192)s:for(e=s.stateNode,e._visibility=n?e._visibility&-2:e._visibility|1,n&&(t===null||o||Ze||xs||Rt(s)),t=null,e=s;;){if(e.tag===5||e.tag===26){if(t===null){o=t=e;try{if(l=o.stateNode,n)i=l.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none";else{d=o.stateNode;var y=o.memoizedProps.style,g=y!=null&&y.hasOwnProperty("display")?y.display:null;d.style.display=g==null||typeof g=="boolean"?"":(""+g).trim()}}catch(A){ls(o,o.return,A)}}}else if(e.tag===6){if(t===null){o=e;try{o.stateNode.nodeValue=n?"":o.memoizedProps}catch(A){ls(o,o.return,A)}}}else if(e.tag===18){if(t===null){o=e;try{var b=o.stateNode;n?Qu(b,!0):Qu(o.stateNode,!1)}catch(A){ls(o,o.return,A)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===s)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===s)break s;for(;e.sibling===null;){if(e.return===null||e.return===s)break s;t===e&&(t=null),e=e.return}t===e&&(t=null),e.sibling.return=e.return,e=e.sibling}a&4&&(a=s.updateQueue,a!==null&&(t=a.retryQueue,t!==null&&(a.retryQueue=null,vl(s,t))));break;case 19:Qs(e,s),Ks(s),a&4&&(a=s.updateQueue,a!==null&&(s.updateQueue=null,vl(s,a)));break;case 30:break;case 21:break;default:Qs(e,s),Ks(s)}}function Ks(s){var e=s.flags;if(e&2){try{for(var t,a=s.return;a!==null;){if(Fr(a)){t=a;break}a=a.return}if(t==null)throw Error(_(160));switch(t.tag){case 27:var n=t.stateNode,l=kd(s);pl(s,l,n);break;case 5:var i=t.stateNode;t.flags&32&&(Ft(i,""),t.flags&=-33);var d=kd(s);pl(s,d,i);break;case 3:case 4:var o=t.stateNode.containerInfo,h=kd(s);yd(s,h,o);break;default:throw Error(_(161))}}catch(m){ls(s,s.return,m)}s.flags&=-3}e&4096&&(s.flags&=-4097)}function au(s){if(s.subtreeFlags&1024)for(s=s.child;s!==null;){var e=s;au(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),s=s.sibling}}function Ge(s,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)Ir(s,e.alternate,e),e=e.sibling}function Rt(s){for(s=s.child;s!==null;){var e=s;switch(e.tag){case 0:case 11:case 14:case 15:ot(4,e,e.return),Rt(e);break;case 1:De(e,e.return);var t=e.stateNode;typeof t.componentWillUnmount=="function"&&Qr(e,e.return,t),Rt(e);break;case 27:vn(e.stateNode);case 26:case 5:De(e,e.return),Rt(e);break;case 22:e.memoizedState===null&&Rt(e);break;case 30:Rt(e);break;default:Rt(e)}s=s.sibling}}function Xe(s,e,t){for(t=t&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var a=e.alternate,n=s,l=e,i=l.flags;switch(l.tag){case 0:case 11:case 15:Xe(n,l,t),tn(4,l);break;case 1:if(Xe(n,l,t),a=l,n=a.stateNode,typeof n.componentDidMount=="function")try{n.componentDidMount()}catch(h){ls(a,a.return,h)}if(a=l,n=a.updateQueue,n!==null){var d=a.stateNode;try{var o=n.shared.hiddenCallbacks;if(o!==null)for(n.shared.hiddenCallbacks=null,n=0;n<o.length;n++)Nc(o[n],d)}catch(h){ls(a,a.return,h)}}t&&i&64&&Xr(l),an(l,l.return);break;case 27:Jr(l);case 26:case 5:Xe(n,l,t),t&&a===null&&i&4&&Kr(l),an(l,l.return);break;case 12:Xe(n,l,t);break;case 31:Xe(n,l,t),t&&i&4&&su(n,l);break;case 13:Xe(n,l,t),t&&i&4&&eu(n,l);break;case 22:l.memoizedState===null&&Xe(n,l,t),an(l,l.return);break;case 30:break;default:Xe(n,l,t)}e=e.sibling}}function Cd(s,e){var t=null;s!==null&&s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(t=s.memoizedState.cachePool.pool),s=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),s!==t&&(s!=null&&s.refCount++,t!=null&&Ya(t))}function Sd(s,e){s=null,e.alternate!==null&&(s=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==s&&(e.refCount++,s!=null&&Ya(s))}function ke(s,e,t,a){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)nu(s,e,t,a),e=e.sibling}function nu(s,e,t,a){var n=e.flags;switch(e.tag){case 0:case 11:case 15:ke(s,e,t,a),n&2048&&tn(9,e);break;case 1:ke(s,e,t,a);break;case 3:ke(s,e,t,a),n&2048&&(s=null,e.alternate!==null&&(s=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==s&&(e.refCount++,s!=null&&Ya(s)));break;case 12:if(n&2048){ke(s,e,t,a),s=e.stateNode;try{var l=e.memoizedProps,i=l.id,d=l.onPostCommit;typeof d=="function"&&d(i,e.alternate===null?"mount":"update",s.passiveEffectDuration,-0)}catch(o){ls(e,e.return,o)}}else ke(s,e,t,a);break;case 31:ke(s,e,t,a);break;case 13:ke(s,e,t,a);break;case 23:break;case 22:l=e.stateNode,i=e.alternate,e.memoizedState!==null?l._visibility&2?ke(s,e,t,a):nn(s,e):l._visibility&2?ke(s,e,t,a):(l._visibility|=2,_a(s,e,t,a,(e.subtreeFlags&10256)!==0||!1)),n&2048&&Cd(i,e);break;case 24:ke(s,e,t,a),n&2048&&Sd(e.alternate,e);break;default:ke(s,e,t,a)}}function _a(s,e,t,a,n){for(n=n&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var l=s,i=e,d=t,o=a,h=i.flags;switch(i.tag){case 0:case 11:case 15:_a(l,i,d,o,n),tn(8,i);break;case 23:break;case 22:var m=i.stateNode;i.memoizedState!==null?m._visibility&2?_a(l,i,d,o,n):nn(l,i):(m._visibility|=2,_a(l,i,d,o,n)),n&&h&2048&&Cd(i.alternate,i);break;case 24:_a(l,i,d,o,n),n&&h&2048&&Sd(i.alternate,i);break;default:_a(l,i,d,o,n)}e=e.sibling}}function nn(s,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var t=s,a=e,n=a.flags;switch(a.tag){case 22:nn(t,a),n&2048&&Cd(a.alternate,a);break;case 24:nn(t,a),n&2048&&Sd(a.alternate,a);break;default:nn(t,a)}e=e.sibling}}var ln=8192;function fa(s,e,t){if(s.subtreeFlags&ln)for(s=s.child;s!==null;)lu(s,e,t),s=s.sibling}function lu(s,e,t){switch(s.tag){case 26:fa(s,e,t),s.flags&ln&&s.memoizedState!==null&&Q_(t,we,s.memoizedState,s.memoizedProps);break;case 5:fa(s,e,t);break;case 3:case 4:var a=we;we=Dl(s.stateNode.containerInfo),fa(s,e,t),we=a;break;case 22:s.memoizedState===null&&(a=s.alternate,a!==null&&a.memoizedState!==null?(a=ln,ln=16777216,fa(s,e,t),ln=a):fa(s,e,t));break;default:fa(s,e,t)}}function iu(s){var e=s.alternate;if(e!==null&&(s=e.child,s!==null)){e.child=null;do e=s.sibling,s.sibling=null,s=e;while(s!==null)}}function dn(s){var e=s.deletions;if((s.flags&16)!==0){if(e!==null)for(var t=0;t<e.length;t++){var a=e[t];Ms=a,ou(a,s)}iu(s)}if(s.subtreeFlags&10256)for(s=s.child;s!==null;)du(s),s=s.sibling}function du(s){switch(s.tag){case 0:case 11:case 15:dn(s),s.flags&2048&&ot(9,s,s.return);break;case 3:dn(s);break;case 12:dn(s);break;case 22:var e=s.stateNode;s.memoizedState!==null&&e._visibility&2&&(s.return===null||s.return.tag!==13)?(e._visibility&=-3,_l(s)):dn(s);break;default:dn(s)}}function _l(s){var e=s.deletions;if((s.flags&16)!==0){if(e!==null)for(var t=0;t<e.length;t++){var a=e[t];Ms=a,ou(a,s)}iu(s)}for(s=s.child;s!==null;){switch(e=s,e.tag){case 0:case 11:case 15:ot(8,e,e.return),_l(e);break;case 22:t=e.stateNode,t._visibility&2&&(t._visibility&=-3,_l(e));break;default:_l(e)}s=s.sibling}}function ou(s,e){for(;Ms!==null;){var t=Ms;switch(t.tag){case 0:case 11:case 15:ot(8,t,e);break;case 23:case 22:if(t.memoizedState!==null&&t.memoizedState.cachePool!==null){var a=t.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:Ya(t.memoizedState.cache)}if(a=t.child,a!==null)a.return=t,Ms=a;else s:for(t=s;Ms!==null;){a=Ms;var n=a.sibling,l=a.return;if(Pr(a),a===t){Ms=null;break s}if(n!==null){n.return=l,Ms=n;break s}Ms=l}}}var d_={getCacheForType:function(s){var e=Ts(ws),t=e.data.get(s);return t===void 0&&(t=s(),e.data.set(s,t)),t},cacheSignal:function(){return Ts(ws).controller.signal}},o_=typeof WeakMap=="function"?WeakMap:Map,ts=0,us=null,Q=null,F=0,ns=0,ne=null,ct=!1,ha=!1,Md=!1,Qe=0,hs=0,rt=0,Ut=0,Dd=0,le=0,ga=0,on=null,Fs=null,Ld=!1,fl=0,cu=0,hl=1/0,gl=null,ut=null,Cs=0,pt=null,ba=null,Ke=0,Td=0,Ed=null,ru=null,cn=0,Ad=null;function ie(){return(ts&2)!==0&&F!==0?F&-F:w.T!==null?jd():Mo()}function uu(){if(le===0)if((F&536870912)===0||$){var s=Sn;Sn<<=1,(Sn&3932160)===0&&(Sn=262144),le=s}else le=536870912;return s=te.current,s!==null&&(s.flags|=32),le}function Js(s,e,t){(s===us&&(ns===2||ns===9)||s.cancelPendingCommit!==null)&&(ma(s,0),vt(s,F,le,!1)),Ta(s,t),((ts&2)===0||s!==us)&&(s===us&&((ts&2)===0&&(Ut|=t),hs===4&&vt(s,F,le,!1)),Le(s))}function pu(s,e,t){if((ts&6)!==0)throw Error(_(327));var a=!t&&(e&127)===0&&(e&s.expiredLanes)===0||La(s,e),n=a?u_(s,e):zd(s,e,!0),l=a;do{if(n===0){ha&&!a&&vt(s,e,0,!1);break}else{if(t=s.current.alternate,l&&!c_(t)){n=zd(s,e,!1),l=!1;continue}if(n===2){if(l=e,s.errorRecoveryDisabledLanes&l)var i=0;else i=s.pendingLanes&-536870913,i=i!==0?i:i&536870912?536870912:0;if(i!==0){e=i;s:{var d=s;n=on;var o=d.current.memoizedState.isDehydrated;if(o&&(ma(d,i).flags|=256),i=zd(d,i,!1),i!==2){if(Md&&!o){d.errorRecoveryDisabledLanes|=l,Ut|=l,n=4;break s}l=Fs,Fs=n,l!==null&&(Fs===null?Fs=l:Fs.push.apply(Fs,l))}n=i}if(l=!1,n!==2)continue}}if(n===1){ma(s,0),vt(s,e,0,!0);break}s:{switch(a=s,l=n,l){case 0:case 1:throw Error(_(345));case 4:if((e&4194048)!==e)break;case 6:vt(a,e,le,!ct);break s;case 2:Fs=null;break;case 3:case 5:break;default:throw Error(_(329))}if((e&62914560)===e&&(n=fl+300-Is(),10<n)){if(vt(a,e,le,!ct),Dn(a,0,!0)!==0)break s;Ke=e,a.timeoutHandle=Yu(vu.bind(null,a,t,Fs,gl,Ld,e,le,Ut,ga,ct,l,"Throttled",-0,0),n);break s}vu(a,t,Fs,gl,Ld,e,le,Ut,ga,ct,l,null,-0,0)}}break}while(!0);Le(s)}function vu(s,e,t,a,n,l,i,d,o,h,m,y,g,b){if(s.timeoutHandle=-1,y=e.subtreeFlags,y&8192||(y&16785408)===16785408){y={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Be},lu(e,l,y);var A=(l&62914560)===l?fl-Is():(l&4194048)===l?cu-Is():0;if(A=K_(y,A),A!==null){Ke=l,s.cancelPendingCommit=A(ku.bind(null,s,e,l,t,a,n,i,d,o,m,y,null,g,b)),vt(s,l,i,!h);return}}ku(s,e,l,t,a,n,i,d,o)}function c_(s){for(var e=s;;){var t=e.tag;if((t===0||t===11||t===15)&&e.flags&16384&&(t=e.updateQueue,t!==null&&(t=t.stores,t!==null)))for(var a=0;a<t.length;a++){var n=t[a],l=n.getSnapshot;n=n.value;try{if(!se(l(),n))return!1}catch{return!1}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===s)break;for(;e.sibling===null;){if(e.return===null||e.return===s)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function vt(s,e,t,a){e&=~Dd,e&=~Ut,s.suspendedLanes|=e,s.pingedLanes&=~e,a&&(s.warmLanes|=e),a=s.expirationTimes;for(var n=e;0<n;){var l=31-$s(n),i=1<<l;a[l]=-1,n&=~i}t!==0&&xo(s,t,e)}function bl(){return(ts&6)===0?(rn(0),!1):!0}function Bd(){if(Q!==null){if(ns===0)var s=Q.return;else s=Q,Oe=At=null,Fi(s),ca=null,Xa=0,s=Q;for(;s!==null;)Gr(s.alternate,s),s=s.return;Q=null}}function ma(s,e){var t=s.timeoutHandle;t!==-1&&(s.timeoutHandle=-1,T_(t)),t=s.cancelPendingCommit,t!==null&&(s.cancelPendingCommit=null,t()),Ke=0,Bd(),us=s,Q=t=Ne(s.current,null),F=e,ns=0,ne=null,ct=!1,ha=La(s,e),Md=!1,ga=le=Dd=Ut=rt=hs=0,Fs=on=null,Ld=!1,(e&8)!==0&&(e|=e&32);var a=s.entangledLanes;if(a!==0)for(s=s.entanglements,a&=e;0<a;){var n=31-$s(a),l=1<<n;e|=s[n],a&=~l}return Qe=e,Rn(),t}function _u(s,e){Y=null,w.H=$a,e===oa||e===Kn?(e=Ec(),ns=3):e===Oi?(e=Ec(),ns=4):ns=e===rd?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,ne=e,Q===null&&(hs=1,dl(s,ue(e,s.current)))}function fu(){var s=te.current;return s===null?!0:(F&4194048)===F?fe===null:(F&62914560)===F||(F&536870912)!==0?s===fe:!1}function hu(){var s=w.H;return w.H=$a,s===null?$a:s}function gu(){var s=w.A;return w.A=d_,s}function ml(){hs=4,ct||(F&4194048)!==F&&te.current!==null||(ha=!0),(rt&134217727)===0&&(Ut&134217727)===0||us===null||vt(us,F,le,!1)}function zd(s,e,t){var a=ts;ts|=2;var n=hu(),l=gu();(us!==s||F!==e)&&(gl=null,ma(s,e)),e=!1;var i=hs;s:do try{if(ns!==0&&Q!==null){var d=Q,o=ne;switch(ns){case 8:Bd(),i=6;break s;case 3:case 2:case 9:case 6:te.current===null&&(e=!0);var h=ns;if(ns=0,ne=null,wa(s,d,o,h),t&&ha){i=0;break s}break;default:h=ns,ns=0,ne=null,wa(s,d,o,h)}}r_(),i=hs;break}catch(m){_u(s,m)}while(!0);return e&&s.shellSuspendCounter++,Oe=At=null,ts=a,w.H=n,w.A=l,Q===null&&(us=null,F=0,Rn()),i}function r_(){for(;Q!==null;)bu(Q)}function u_(s,e){var t=ts;ts|=2;var a=hu(),n=gu();us!==s||F!==e?(gl=null,hl=Is()+500,ma(s,e)):ha=La(s,e);s:do try{if(ns!==0&&Q!==null){e=Q;var l=ne;e:switch(ns){case 1:ns=0,ne=null,wa(s,e,l,1);break;case 2:case 9:if(Lc(l)){ns=0,ne=null,mu(e);break}e=function(){ns!==2&&ns!==9||us!==s||(ns=7),Le(s)},l.then(e,e);break s;case 3:ns=7;break s;case 4:ns=5;break s;case 7:Lc(l)?(ns=0,ne=null,mu(e)):(ns=0,ne=null,wa(s,e,l,7));break;case 5:var i=null;switch(Q.tag){case 26:i=Q.memoizedState;case 5:case 27:var d=Q;if(i?np(i):d.stateNode.complete){ns=0,ne=null;var o=d.sibling;if(o!==null)Q=o;else{var h=d.return;h!==null?(Q=h,wl(h)):Q=null}break e}}ns=0,ne=null,wa(s,e,l,5);break;case 6:ns=0,ne=null,wa(s,e,l,6);break;case 8:Bd(),hs=6;break s;default:throw Error(_(462))}}p_();break}catch(m){_u(s,m)}while(!0);return Oe=At=null,w.H=a,w.A=n,ts=t,Q!==null?0:(us=null,F=0,Rn(),hs)}function p_(){for(;Q!==null&&!Hp();)bu(Q)}function bu(s){var e=Zr(s.alternate,s,Qe);s.memoizedProps=s.pendingProps,e===null?wl(s):Q=e}function mu(s){var e=s,t=e.alternate;switch(e.tag){case 15:case 0:e=Or(t,e,e.pendingProps,e.type,void 0,F);break;case 11:e=Or(t,e,e.pendingProps,e.type.render,e.ref,F);break;case 5:Fi(e);default:Gr(t,e),e=Q=gc(e,Qe),e=Zr(t,e,Qe)}s.memoizedProps=s.pendingProps,e===null?wl(s):Q=e}function wa(s,e,t,a){Oe=At=null,Fi(e),ca=null,Xa=0;var n=e.return;try{if(s_(s,n,e,t,F)){hs=1,dl(s,ue(t,s.current)),Q=null;return}}catch(l){if(n!==null)throw Q=n,l;hs=1,dl(s,ue(t,s.current)),Q=null;return}e.flags&32768?($||a===1?s=!0:ha||(F&536870912)!==0?s=!1:(ct=s=!0,(a===2||a===9||a===3||a===6)&&(a=te.current,a!==null&&a.tag===13&&(a.flags|=16384))),wu(e,s)):wl(e)}function wl(s){var e=s;do{if((e.flags&32768)!==0){wu(e,ct);return}s=e.return;var t=a_(e.alternate,e,Qe);if(t!==null){Q=t;return}if(e=e.sibling,e!==null){Q=e;return}Q=e=s}while(e!==null);hs===0&&(hs=5)}function wu(s,e){do{var t=n_(s.alternate,s);if(t!==null){t.flags&=32767,Q=t;return}if(t=s.return,t!==null&&(t.flags|=32768,t.subtreeFlags=0,t.deletions=null),!e&&(s=s.sibling,s!==null)){Q=s;return}Q=s=t}while(s!==null);hs=6,Q=null}function ku(s,e,t,a,n,l,i,d,o){s.cancelPendingCommit=null;do kl();while(Cs!==0);if((ts&6)!==0)throw Error(_(327));if(e!==null){if(e===s.current)throw Error(_(177));if(l=e.lanes|e.childLanes,l|=ki,Xp(s,t,l,i,d,o),s===us&&(Q=us=null,F=0),ba=e,pt=s,Ke=t,Td=l,Ed=n,ru=a,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(s.callbackNode=null,s.callbackPriority=0,h_(xn,function(){return Mu(),null})):(s.callbackNode=null,s.callbackPriority=0),a=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||a){a=w.T,w.T=null,n=T.p,T.p=2,i=ts,ts|=4;try{l_(s,e,t)}finally{ts=i,T.p=n,w.T=a}}Cs=1,yu(),xu(),Cu()}}function yu(){if(Cs===1){Cs=0;var s=pt,e=ba,t=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||t){t=w.T,w.T=null;var a=T.p;T.p=2;var n=ts;ts|=4;try{tu(e,s);var l=Xd,i=oc(s.containerInfo),d=l.focusedElem,o=l.selectionRange;if(i!==d&&d&&d.ownerDocument&&dc(d.ownerDocument.documentElement,d)){if(o!==null&&hi(d)){var h=o.start,m=o.end;if(m===void 0&&(m=h),"selectionStart"in d)d.selectionStart=h,d.selectionEnd=Math.min(m,d.value.length);else{var y=d.ownerDocument||document,g=y&&y.defaultView||window;if(g.getSelection){var b=g.getSelection(),A=d.textContent.length,R=Math.min(o.start,A),cs=o.end===void 0?R:Math.min(o.end,A);!b.extend&&R>cs&&(i=cs,cs=R,R=i);var v=ic(d,R),c=ic(d,cs);if(v&&c&&(b.rangeCount!==1||b.anchorNode!==v.node||b.anchorOffset!==v.offset||b.focusNode!==c.node||b.focusOffset!==c.offset)){var f=y.createRange();f.setStart(v.node,v.offset),b.removeAllRanges(),R>cs?(b.addRange(f),b.extend(c.node,c.offset)):(f.setEnd(c.node,c.offset),b.addRange(f))}}}}for(y=[],b=d;b=b.parentNode;)b.nodeType===1&&y.push({element:b,left:b.scrollLeft,top:b.scrollTop});for(typeof d.focus=="function"&&d.focus(),d=0;d<y.length;d++){var k=y[d];k.element.scrollLeft=k.left,k.element.scrollTop=k.top}}zl=!!Gd,Xd=Gd=null}finally{ts=n,T.p=a,w.T=t}}s.current=e,Cs=2}}function xu(){if(Cs===2){Cs=0;var s=pt,e=ba,t=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||t){t=w.T,w.T=null;var a=T.p;T.p=2;var n=ts;ts|=4;try{Ir(s,e.alternate,e)}finally{ts=n,T.p=a,w.T=t}}Cs=3}}function Cu(){if(Cs===4||Cs===3){Cs=0,Op();var s=pt,e=ba,t=Ke,a=ru;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?Cs=5:(Cs=0,ba=pt=null,Su(s,s.pendingLanes));var n=s.pendingLanes;if(n===0&&(ut=null),Il(t),e=e.stateNode,Ps&&typeof Ps.onCommitFiberRoot=="function")try{Ps.onCommitFiberRoot(Da,e,void 0,(e.current.flags&128)===128)}catch{}if(a!==null){e=w.T,n=T.p,T.p=2,w.T=null;try{for(var l=s.onRecoverableError,i=0;i<a.length;i++){var d=a[i];l(d.value,{componentStack:d.stack})}}finally{w.T=e,T.p=n}}(Ke&3)!==0&&kl(),Le(s),n=s.pendingLanes,(t&261930)!==0&&(n&42)!==0?s===Ad?cn++:(cn=0,Ad=s):cn=0,rn(0)}}function Su(s,e){(s.pooledCacheLanes&=e)===0&&(e=s.pooledCache,e!=null&&(s.pooledCache=null,Ya(e)))}function kl(){return yu(),xu(),Cu(),Mu()}function Mu(){if(Cs!==5)return!1;var s=pt,e=Td;Td=0;var t=Il(Ke),a=w.T,n=T.p;try{T.p=32>t?32:t,w.T=null,t=Ed,Ed=null;var l=pt,i=Ke;if(Cs=0,ba=pt=null,Ke=0,(ts&6)!==0)throw Error(_(331));var d=ts;if(ts|=4,du(l.current),nu(l,l.current,i,t),ts=d,rn(0,!1),Ps&&typeof Ps.onPostCommitFiberRoot=="function")try{Ps.onPostCommitFiberRoot(Da,l)}catch{}return!0}finally{T.p=n,w.T=a,Su(s,e)}}function Du(s,e,t){e=ue(t,e),e=cd(s.stateNode,e,2),s=lt(s,e,2),s!==null&&(Ta(s,2),Le(s))}function ls(s,e,t){if(s.tag===3)Du(s,s,t);else for(;e!==null;){if(e.tag===3){Du(e,s,t);break}else if(e.tag===1){var a=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(ut===null||!ut.has(a))){s=ue(t,s),t=Lr(2),a=lt(e,t,2),a!==null&&(Tr(t,a,e,s),Ta(a,2),Le(a));break}}e=e.return}}function Nd(s,e,t){var a=s.pingCache;if(a===null){a=s.pingCache=new o_;var n=new Set;a.set(e,n)}else n=a.get(e),n===void 0&&(n=new Set,a.set(e,n));n.has(t)||(Md=!0,n.add(t),s=v_.bind(null,s,e,t),e.then(s,s))}function v_(s,e,t){var a=s.pingCache;a!==null&&a.delete(e),s.pingedLanes|=s.suspendedLanes&t,s.warmLanes&=~t,us===s&&(F&t)===t&&(hs===4||hs===3&&(F&62914560)===F&&300>Is()-fl?(ts&2)===0&&ma(s,0):Dd|=t,ga===F&&(ga=0)),Le(s)}function Lu(s,e){e===0&&(e=yo()),s=Lt(s,e),s!==null&&(Ta(s,e),Le(s))}function __(s){var e=s.memoizedState,t=0;e!==null&&(t=e.retryLane),Lu(s,t)}function f_(s,e){var t=0;switch(s.tag){case 31:case 13:var a=s.stateNode,n=s.memoizedState;n!==null&&(t=n.retryLane);break;case 19:a=s.stateNode;break;case 22:a=s.stateNode._retryCache;break;default:throw Error(_(314))}a!==null&&a.delete(e),Lu(s,t)}function h_(s,e){return Kl(s,e)}var yl=null,ka=null,Hd=!1,xl=!1,Od=!1,_t=0;function Le(s){s!==ka&&s.next===null&&(ka===null?yl=ka=s:ka=ka.next=s),xl=!0,Hd||(Hd=!0,b_())}function rn(s,e){if(!Od&&xl){Od=!0;do for(var t=!1,a=yl;a!==null;){if(s!==0){var n=a.pendingLanes;if(n===0)var l=0;else{var i=a.suspendedLanes,d=a.pingedLanes;l=(1<<31-$s(42|s)+1)-1,l&=n&~(i&~d),l=l&201326741?l&201326741|1:l?l|2:0}l!==0&&(t=!0,Bu(a,l))}else l=F,l=Dn(a,a===us?l:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(l&3)===0||La(a,l)||(t=!0,Bu(a,l));a=a.next}while(t);Od=!1}}function g_(){Tu()}function Tu(){xl=Hd=!1;var s=0;_t!==0&&L_()&&(s=_t);for(var e=Is(),t=null,a=yl;a!==null;){var n=a.next,l=Eu(a,e);l===0?(a.next=null,t===null?yl=n:t.next=n,n===null&&(ka=t)):(t=a,(s!==0||(l&3)!==0)&&(xl=!0)),a=n}Cs!==0&&Cs!==5||rn(s),_t!==0&&(_t=0)}function Eu(s,e){for(var t=s.suspendedLanes,a=s.pingedLanes,n=s.expirationTimes,l=s.pendingLanes&-62914561;0<l;){var i=31-$s(l),d=1<<i,o=n[i];o===-1?((d&t)===0||(d&a)!==0)&&(n[i]=Gp(d,e)):o<=e&&(s.expiredLanes|=d),l&=~d}if(e=us,t=F,t=Dn(s,s===e?t:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),a=s.callbackNode,t===0||s===e&&(ns===2||ns===9)||s.cancelPendingCommit!==null)return a!==null&&a!==null&&Fl(a),s.callbackNode=null,s.callbackPriority=0;if((t&3)===0||La(s,t)){if(e=t&-t,e===s.callbackPriority)return e;switch(a!==null&&Fl(a),Il(t)){case 2:case 8:t=wo;break;case 32:t=xn;break;case 268435456:t=ko;break;default:t=xn}return a=Au.bind(null,s),t=Kl(t,a),s.callbackPriority=e,s.callbackNode=t,e}return a!==null&&a!==null&&Fl(a),s.callbackPriority=2,s.callbackNode=null,2}function Au(s,e){if(Cs!==0&&Cs!==5)return s.callbackNode=null,s.callbackPriority=0,null;var t=s.callbackNode;if(kl()&&s.callbackNode!==t)return null;var a=F;return a=Dn(s,s===us?a:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),a===0?null:(pu(s,a,e),Eu(s,Is()),s.callbackNode!=null&&s.callbackNode===t?Au.bind(null,s):null)}function Bu(s,e){if(kl())return null;pu(s,e,!0)}function b_(){E_(function(){(ts&6)!==0?Kl(mo,g_):Tu()})}function jd(){if(_t===0){var s=ia;s===0&&(s=Cn,Cn<<=1,(Cn&261888)===0&&(Cn=256)),_t=s}return _t}function zu(s){return s==null||typeof s=="symbol"||typeof s=="boolean"?null:typeof s=="function"?s:An(""+s)}function Nu(s,e){var t=e.ownerDocument.createElement("input");return t.name=e.name,t.value=e.value,s.id&&t.setAttribute("form",s.id),e.parentNode.insertBefore(t,e),s=new FormData(s),t.parentNode.removeChild(t),s}function m_(s,e,t,a,n){if(e==="submit"&&t&&t.stateNode===n){var l=zu((n[Ys]||null).action),i=a.submitter;i&&(e=(e=i[Ys]||null)?zu(e.formAction):i.getAttribute("formAction"),e!==null&&(l=e,i=null));var d=new Hn("action","action",null,a,n);s.push({event:d,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(_t!==0){var o=i?Nu(n,i):new FormData(n);ad(t,{pending:!0,data:o,method:n.method,action:l},null,o)}}else typeof l=="function"&&(d.preventDefault(),o=i?Nu(n,i):new FormData(n),ad(t,{pending:!0,data:o,method:n.method,action:l},l,o))},currentTarget:n}]})}}for(var Vd=0;Vd<wi.length;Vd++){var Rd=wi[Vd],w_=Rd.toLowerCase(),k_=Rd[0].toUpperCase()+Rd.slice(1);me(w_,"on"+k_)}me(uc,"onAnimationEnd"),me(pc,"onAnimationIteration"),me(vc,"onAnimationStart"),me("dblclick","onDoubleClick"),me("focusin","onFocus"),me("focusout","onBlur"),me(jv,"onTransitionRun"),me(Vv,"onTransitionStart"),me(Rv,"onTransitionCancel"),me(_c,"onTransitionEnd"),Qt("onMouseEnter",["mouseout","mouseover"]),Qt("onMouseLeave",["mouseout","mouseover"]),Qt("onPointerEnter",["pointerout","pointerover"]),Qt("onPointerLeave",["pointerout","pointerover"]),Ct("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ct("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ct("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ct("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ct("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ct("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var un="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),y_=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(un));function Hu(s,e){e=(e&4)!==0;for(var t=0;t<s.length;t++){var a=s[t],n=a.event;a=a.listeners;s:{var l=void 0;if(e)for(var i=a.length-1;0<=i;i--){var d=a[i],o=d.instance,h=d.currentTarget;if(d=d.listener,o!==l&&n.isPropagationStopped())break s;l=d,n.currentTarget=h;try{l(n)}catch(m){Vn(m)}n.currentTarget=null,l=o}else for(i=0;i<a.length;i++){if(d=a[i],o=d.instance,h=d.currentTarget,d=d.listener,o!==l&&n.isPropagationStopped())break s;l=d,n.currentTarget=h;try{l(n)}catch(m){Vn(m)}n.currentTarget=null,l=o}}}}function K(s,e){var t=e[Pl];t===void 0&&(t=e[Pl]=new Set);var a=s+"__bubble";t.has(a)||(Ou(e,s,2,!1),t.add(a))}function Ud(s,e,t){var a=0;e&&(a|=4),Ou(t,s,a,e)}var Cl="_reactListening"+Math.random().toString(36).slice(2);function qd(s){if(!s[Cl]){s[Cl]=!0,To.forEach(function(t){t!=="selectionchange"&&(y_.has(t)||Ud(t,!1,s),Ud(t,!0,s))});var e=s.nodeType===9?s:s.ownerDocument;e===null||e[Cl]||(e[Cl]=!0,Ud("selectionchange",!1,e))}}function Ou(s,e,t,a){switch(up(e)){case 2:var n=W_;break;case 8:n=I_;break;default:n=to}t=n.bind(null,e,t,s),n=void 0,!di||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(n=!0),a?n!==void 0?s.addEventListener(e,t,{capture:!0,passive:n}):s.addEventListener(e,t,!0):n!==void 0?s.addEventListener(e,t,{passive:n}):s.addEventListener(e,t,!1)}function Zd(s,e,t,a,n){var l=a;if((e&1)===0&&(e&2)===0&&a!==null)s:for(;;){if(a===null)return;var i=a.tag;if(i===3||i===4){var d=a.stateNode.containerInfo;if(d===n)break;if(i===4)for(i=a.return;i!==null;){var o=i.tag;if((o===3||o===4)&&i.stateNode.containerInfo===n)return;i=i.return}for(;d!==null;){if(i=Yt(d),i===null)return;if(o=i.tag,o===5||o===6||o===26||o===27){a=l=i;continue s}d=d.parentNode}}a=a.return}qo(function(){var h=l,m=li(t),y=[];s:{var g=fc.get(s);if(g!==void 0){var b=Hn,A=s;switch(s){case"keypress":if(zn(t)===0)break s;case"keydown":case"keyup":b=fv;break;case"focusin":A="focus",b=ui;break;case"focusout":A="blur",b=ui;break;case"beforeblur":case"afterblur":b=ui;break;case"click":if(t.button===2)break s;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":b=Go;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":b=av;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":b=bv;break;case uc:case pc:case vc:b=iv;break;case _c:b=wv;break;case"scroll":case"scrollend":b=ev;break;case"wheel":b=yv;break;case"copy":case"cut":case"paste":b=ov;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":b=Qo;break;case"toggle":case"beforetoggle":b=Cv}var R=(e&4)!==0,cs=!R&&(s==="scroll"||s==="scrollend"),v=R?g!==null?g+"Capture":null:g;R=[];for(var c=h,f;c!==null;){var k=c;if(f=k.stateNode,k=k.tag,k!==5&&k!==26&&k!==27||f===null||v===null||(k=Ba(c,v),k!=null&&R.push(pn(c,k,f))),cs)break;c=c.return}0<R.length&&(g=new b(g,A,null,t,m),y.push({event:g,listeners:R}))}}if((e&7)===0){s:{if(g=s==="mouseover"||s==="pointerover",b=s==="mouseout"||s==="pointerout",g&&t!==ni&&(A=t.relatedTarget||t.fromElement)&&(Yt(A)||A[Zt]))break s;if((b||g)&&(g=m.window===m?m:(g=m.ownerDocument)?g.defaultView||g.parentWindow:window,b?(A=t.relatedTarget||t.toElement,b=h,A=A?Yt(A):null,A!==null&&(cs=N(A),R=A.tag,A!==cs||R!==5&&R!==27&&R!==6)&&(A=null)):(b=null,A=h),b!==A)){if(R=Go,k="onMouseLeave",v="onMouseEnter",c="mouse",(s==="pointerout"||s==="pointerover")&&(R=Qo,k="onPointerLeave",v="onPointerEnter",c="pointer"),cs=b==null?g:Aa(b),f=A==null?g:Aa(A),g=new R(k,c+"leave",b,t,m),g.target=cs,g.relatedTarget=f,k=null,Yt(m)===h&&(R=new R(v,c+"enter",A,t,m),R.target=f,R.relatedTarget=cs,k=R),cs=k,b&&A)e:{for(R=x_,v=b,c=A,f=0,k=v;k;k=R(k))f++;k=0;for(var j=c;j;j=R(j))k++;for(;0<f-k;)v=R(v),f--;for(;0<k-f;)c=R(c),k--;for(;f--;){if(v===c||c!==null&&v===c.alternate){R=v;break e}v=R(v),c=R(c)}R=null}else R=null;b!==null&&ju(y,g,b,R,!1),A!==null&&cs!==null&&ju(y,cs,A,R,!0)}}s:{if(g=h?Aa(h):window,b=g.nodeName&&g.nodeName.toLowerCase(),b==="select"||b==="input"&&g.type==="file")var ss=sc;else if(Po(g))if(ec)ss=Nv;else{ss=Bv;var z=Av}else b=g.nodeName,!b||b.toLowerCase()!=="input"||g.type!=="checkbox"&&g.type!=="radio"?h&&ai(h.elementType)&&(ss=sc):ss=zv;if(ss&&(ss=ss(s,h))){$o(y,ss,t,m);break s}z&&z(s,g,h),s==="focusout"&&h&&g.type==="number"&&h.memoizedProps.value!=null&&ti(g,"number",g.value)}switch(z=h?Aa(h):window,s){case"focusin":(Po(z)||z.contentEditable==="true")&&(Pt=z,gi=h,Ua=null);break;case"focusout":Ua=gi=Pt=null;break;case"mousedown":bi=!0;break;case"contextmenu":case"mouseup":case"dragend":bi=!1,cc(y,t,m);break;case"selectionchange":if(Ov)break;case"keydown":case"keyup":cc(y,t,m)}var G;if(vi)s:{switch(s){case"compositionstart":var J="onCompositionStart";break s;case"compositionend":J="onCompositionEnd";break s;case"compositionupdate":J="onCompositionUpdate";break s}J=void 0}else It?Wo(s,t)&&(J="onCompositionEnd"):s==="keydown"&&t.keyCode===229&&(J="onCompositionStart");J&&(Ko&&t.locale!=="ko"&&(It||J!=="onCompositionStart"?J==="onCompositionEnd"&&It&&(G=Zo()):(Pe=m,oi="value"in Pe?Pe.value:Pe.textContent,It=!0)),z=Sl(h,J),0<z.length&&(J=new Xo(J,s,null,t,m),y.push({event:J,listeners:z}),G?J.data=G:(G=Io(t),G!==null&&(J.data=G)))),(G=Mv?Dv(s,t):Lv(s,t))&&(J=Sl(h,"onBeforeInput"),0<J.length&&(z=new Xo("onBeforeInput","beforeinput",null,t,m),y.push({event:z,listeners:J}),z.data=G)),m_(y,s,h,t,m)}Hu(y,e)})}function pn(s,e,t){return{instance:s,listener:e,currentTarget:t}}function Sl(s,e){for(var t=e+"Capture",a=[];s!==null;){var n=s,l=n.stateNode;if(n=n.tag,n!==5&&n!==26&&n!==27||l===null||(n=Ba(s,t),n!=null&&a.unshift(pn(s,n,l)),n=Ba(s,e),n!=null&&a.push(pn(s,n,l))),s.tag===3)return a;s=s.return}return[]}function x_(s){if(s===null)return null;do s=s.return;while(s&&s.tag!==5&&s.tag!==27);return s||null}function ju(s,e,t,a,n){for(var l=e._reactName,i=[];t!==null&&t!==a;){var d=t,o=d.alternate,h=d.stateNode;if(d=d.tag,o!==null&&o===a)break;d!==5&&d!==26&&d!==27||h===null||(o=h,n?(h=Ba(t,l),h!=null&&i.unshift(pn(t,h,o))):n||(h=Ba(t,l),h!=null&&i.push(pn(t,h,o)))),t=t.return}i.length!==0&&s.push({event:e,listeners:i})}var C_=/\r\n?/g,S_=/\u0000|\uFFFD/g;function Vu(s){return(typeof s=="string"?s:""+s).replace(C_,`
`).replace(S_,"")}function Ru(s,e){return e=Vu(e),Vu(s)===e}function os(s,e,t,a,n,l){switch(t){case"children":typeof a=="string"?e==="body"||e==="textarea"&&a===""||Ft(s,a):(typeof a=="number"||typeof a=="bigint")&&e!=="body"&&Ft(s,""+a);break;case"className":Tn(s,"class",a);break;case"tabIndex":Tn(s,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Tn(s,t,a);break;case"style":Ro(s,a,l);break;case"data":if(e!=="object"){Tn(s,"data",a);break}case"src":case"href":if(a===""&&(e!=="a"||t!=="href")){s.removeAttribute(t);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){s.removeAttribute(t);break}a=An(""+a),s.setAttribute(t,a);break;case"action":case"formAction":if(typeof a=="function"){s.setAttribute(t,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof l=="function"&&(t==="formAction"?(e!=="input"&&os(s,e,"name",n.name,n,null),os(s,e,"formEncType",n.formEncType,n,null),os(s,e,"formMethod",n.formMethod,n,null),os(s,e,"formTarget",n.formTarget,n,null)):(os(s,e,"encType",n.encType,n,null),os(s,e,"method",n.method,n,null),os(s,e,"target",n.target,n,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){s.removeAttribute(t);break}a=An(""+a),s.setAttribute(t,a);break;case"onClick":a!=null&&(s.onclick=Be);break;case"onScroll":a!=null&&K("scroll",s);break;case"onScrollEnd":a!=null&&K("scrollend",s);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(_(61));if(t=a.__html,t!=null){if(n.children!=null)throw Error(_(60));s.innerHTML=t}}break;case"multiple":s.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":s.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){s.removeAttribute("xlink:href");break}t=An(""+a),s.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",t);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?s.setAttribute(t,""+a):s.removeAttribute(t);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?s.setAttribute(t,""):s.removeAttribute(t);break;case"capture":case"download":a===!0?s.setAttribute(t,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?s.setAttribute(t,a):s.removeAttribute(t);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?s.setAttribute(t,a):s.removeAttribute(t);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?s.removeAttribute(t):s.setAttribute(t,a);break;case"popover":K("beforetoggle",s),K("toggle",s),Ln(s,"popover",a);break;case"xlinkActuate":Ae(s,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":Ae(s,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":Ae(s,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":Ae(s,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":Ae(s,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":Ae(s,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":Ae(s,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":Ae(s,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":Ae(s,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Ln(s,"is",a);break;case"innerText":case"textContent":break;default:(!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(t=$p.get(t)||t,Ln(s,t,a))}}function Yd(s,e,t,a,n,l){switch(t){case"style":Ro(s,a,l);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(_(61));if(t=a.__html,t!=null){if(n.children!=null)throw Error(_(60));s.innerHTML=t}}break;case"children":typeof a=="string"?Ft(s,a):(typeof a=="number"||typeof a=="bigint")&&Ft(s,""+a);break;case"onScroll":a!=null&&K("scroll",s);break;case"onScrollEnd":a!=null&&K("scrollend",s);break;case"onClick":a!=null&&(s.onclick=Be);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Eo.hasOwnProperty(t))s:{if(t[0]==="o"&&t[1]==="n"&&(n=t.endsWith("Capture"),e=t.slice(2,n?t.length-7:void 0),l=s[Ys]||null,l=l!=null?l[t]:null,typeof l=="function"&&s.removeEventListener(e,l,n),typeof a=="function")){typeof l!="function"&&l!==null&&(t in s?s[t]=null:s.hasAttribute(t)&&s.removeAttribute(t)),s.addEventListener(e,a,n);break s}t in s?s[t]=a:a===!0?s.setAttribute(t,""):Ln(s,t,a)}}}function As(s,e,t){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":K("error",s),K("load",s);var a=!1,n=!1,l;for(l in t)if(t.hasOwnProperty(l)){var i=t[l];if(i!=null)switch(l){case"src":a=!0;break;case"srcSet":n=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(_(137,e));default:os(s,e,l,i,t,null)}}n&&os(s,e,"srcSet",t.srcSet,t,null),a&&os(s,e,"src",t.src,t,null);return;case"input":K("invalid",s);var d=l=i=n=null,o=null,h=null;for(a in t)if(t.hasOwnProperty(a)){var m=t[a];if(m!=null)switch(a){case"name":n=m;break;case"type":i=m;break;case"checked":o=m;break;case"defaultChecked":h=m;break;case"value":l=m;break;case"defaultValue":d=m;break;case"children":case"dangerouslySetInnerHTML":if(m!=null)throw Error(_(137,e));break;default:os(s,e,a,m,t,null)}}Ho(s,l,d,o,h,i,n,!1);return;case"select":K("invalid",s),a=i=l=null;for(n in t)if(t.hasOwnProperty(n)&&(d=t[n],d!=null))switch(n){case"value":l=d;break;case"defaultValue":i=d;break;case"multiple":a=d;default:os(s,e,n,d,t,null)}e=l,t=i,s.multiple=!!a,e!=null?Kt(s,!!a,e,!1):t!=null&&Kt(s,!!a,t,!0);return;case"textarea":K("invalid",s),l=n=a=null;for(i in t)if(t.hasOwnProperty(i)&&(d=t[i],d!=null))switch(i){case"value":a=d;break;case"defaultValue":n=d;break;case"children":l=d;break;case"dangerouslySetInnerHTML":if(d!=null)throw Error(_(91));break;default:os(s,e,i,d,t,null)}jo(s,a,n,l);return;case"option":for(o in t)if(t.hasOwnProperty(o)&&(a=t[o],a!=null))switch(o){case"selected":s.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:os(s,e,o,a,t,null)}return;case"dialog":K("beforetoggle",s),K("toggle",s),K("cancel",s),K("close",s);break;case"iframe":case"object":K("load",s);break;case"video":case"audio":for(a=0;a<un.length;a++)K(un[a],s);break;case"image":K("error",s),K("load",s);break;case"details":K("toggle",s);break;case"embed":case"source":case"link":K("error",s),K("load",s);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(h in t)if(t.hasOwnProperty(h)&&(a=t[h],a!=null))switch(h){case"children":case"dangerouslySetInnerHTML":throw Error(_(137,e));default:os(s,e,h,a,t,null)}return;default:if(ai(e)){for(m in t)t.hasOwnProperty(m)&&(a=t[m],a!==void 0&&Yd(s,e,m,a,t,void 0));return}}for(d in t)t.hasOwnProperty(d)&&(a=t[d],a!=null&&os(s,e,d,a,t,null))}function M_(s,e,t,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var n=null,l=null,i=null,d=null,o=null,h=null,m=null;for(b in t){var y=t[b];if(t.hasOwnProperty(b)&&y!=null)switch(b){case"checked":break;case"value":break;case"defaultValue":o=y;default:a.hasOwnProperty(b)||os(s,e,b,null,a,y)}}for(var g in a){var b=a[g];if(y=t[g],a.hasOwnProperty(g)&&(b!=null||y!=null))switch(g){case"type":l=b;break;case"name":n=b;break;case"checked":h=b;break;case"defaultChecked":m=b;break;case"value":i=b;break;case"defaultValue":d=b;break;case"children":case"dangerouslySetInnerHTML":if(b!=null)throw Error(_(137,e));break;default:b!==y&&os(s,e,g,b,a,y)}}ei(s,i,d,o,h,m,l,n);return;case"select":b=i=d=g=null;for(l in t)if(o=t[l],t.hasOwnProperty(l)&&o!=null)switch(l){case"value":break;case"multiple":b=o;default:a.hasOwnProperty(l)||os(s,e,l,null,a,o)}for(n in a)if(l=a[n],o=t[n],a.hasOwnProperty(n)&&(l!=null||o!=null))switch(n){case"value":g=l;break;case"defaultValue":d=l;break;case"multiple":i=l;default:l!==o&&os(s,e,n,l,a,o)}e=d,t=i,a=b,g!=null?Kt(s,!!t,g,!1):!!a!=!!t&&(e!=null?Kt(s,!!t,e,!0):Kt(s,!!t,t?[]:"",!1));return;case"textarea":b=g=null;for(d in t)if(n=t[d],t.hasOwnProperty(d)&&n!=null&&!a.hasOwnProperty(d))switch(d){case"value":break;case"children":break;default:os(s,e,d,null,a,n)}for(i in a)if(n=a[i],l=t[i],a.hasOwnProperty(i)&&(n!=null||l!=null))switch(i){case"value":g=n;break;case"defaultValue":b=n;break;case"children":break;case"dangerouslySetInnerHTML":if(n!=null)throw Error(_(91));break;default:n!==l&&os(s,e,i,n,a,l)}Oo(s,g,b);return;case"option":for(var A in t)if(g=t[A],t.hasOwnProperty(A)&&g!=null&&!a.hasOwnProperty(A))switch(A){case"selected":s.selected=!1;break;default:os(s,e,A,null,a,g)}for(o in a)if(g=a[o],b=t[o],a.hasOwnProperty(o)&&g!==b&&(g!=null||b!=null))switch(o){case"selected":s.selected=g&&typeof g!="function"&&typeof g!="symbol";break;default:os(s,e,o,g,a,b)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var R in t)g=t[R],t.hasOwnProperty(R)&&g!=null&&!a.hasOwnProperty(R)&&os(s,e,R,null,a,g);for(h in a)if(g=a[h],b=t[h],a.hasOwnProperty(h)&&g!==b&&(g!=null||b!=null))switch(h){case"children":case"dangerouslySetInnerHTML":if(g!=null)throw Error(_(137,e));break;default:os(s,e,h,g,a,b)}return;default:if(ai(e)){for(var cs in t)g=t[cs],t.hasOwnProperty(cs)&&g!==void 0&&!a.hasOwnProperty(cs)&&Yd(s,e,cs,void 0,a,g);for(m in a)g=a[m],b=t[m],!a.hasOwnProperty(m)||g===b||g===void 0&&b===void 0||Yd(s,e,m,g,a,b);return}}for(var v in t)g=t[v],t.hasOwnProperty(v)&&g!=null&&!a.hasOwnProperty(v)&&os(s,e,v,null,a,g);for(y in a)g=a[y],b=t[y],!a.hasOwnProperty(y)||g===b||g==null&&b==null||os(s,e,y,g,a,b)}function Uu(s){switch(s){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function D_(){if(typeof performance.getEntriesByType=="function"){for(var s=0,e=0,t=performance.getEntriesByType("resource"),a=0;a<t.length;a++){var n=t[a],l=n.transferSize,i=n.initiatorType,d=n.duration;if(l&&d&&Uu(i)){for(i=0,d=n.responseEnd,a+=1;a<t.length;a++){var o=t[a],h=o.startTime;if(h>d)break;var m=o.transferSize,y=o.initiatorType;m&&Uu(y)&&(o=o.responseEnd,i+=m*(o<d?1:(d-h)/(o-h)))}if(--a,e+=8*(l+i)/(n.duration/1e3),s++,10<s)break}}if(0<s)return e/s/1e6}return navigator.connection&&(s=navigator.connection.downlink,typeof s=="number")?s:5}var Gd=null,Xd=null;function Ml(s){return s.nodeType===9?s:s.ownerDocument}function qu(s){switch(s){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Zu(s,e){if(s===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return s===1&&e==="foreignObject"?0:s}function Qd(s,e){return s==="textarea"||s==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Kd=null;function L_(){var s=window.event;return s&&s.type==="popstate"?s===Kd?!1:(Kd=s,!0):(Kd=null,!1)}var Yu=typeof setTimeout=="function"?setTimeout:void 0,T_=typeof clearTimeout=="function"?clearTimeout:void 0,Gu=typeof Promise=="function"?Promise:void 0,E_=typeof queueMicrotask=="function"?queueMicrotask:typeof Gu<"u"?function(s){return Gu.resolve(null).then(s).catch(A_)}:Yu;function A_(s){setTimeout(function(){throw s})}function ft(s){return s==="head"}function Xu(s,e){var t=e,a=0;do{var n=t.nextSibling;if(s.removeChild(t),n&&n.nodeType===8)if(t=n.data,t==="/$"||t==="/&"){if(a===0){s.removeChild(n),Sa(e);return}a--}else if(t==="$"||t==="$?"||t==="$~"||t==="$!"||t==="&")a++;else if(t==="html")vn(s.ownerDocument.documentElement);else if(t==="head"){t=s.ownerDocument.head,vn(t);for(var l=t.firstChild;l;){var i=l.nextSibling,d=l.nodeName;l[Ea]||d==="SCRIPT"||d==="STYLE"||d==="LINK"&&l.rel.toLowerCase()==="stylesheet"||t.removeChild(l),l=i}}else t==="body"&&vn(s.ownerDocument.body);t=n}while(t);Sa(e)}function Qu(s,e){var t=s;s=0;do{var a=t.nextSibling;if(t.nodeType===1?e?(t._stashedDisplay=t.style.display,t.style.display="none"):(t.style.display=t._stashedDisplay||"",t.getAttribute("style")===""&&t.removeAttribute("style")):t.nodeType===3&&(e?(t._stashedText=t.nodeValue,t.nodeValue=""):t.nodeValue=t._stashedText||""),a&&a.nodeType===8)if(t=a.data,t==="/$"){if(s===0)break;s--}else t!=="$"&&t!=="$?"&&t!=="$~"&&t!=="$!"||s++;t=a}while(t)}function Fd(s){var e=s.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var t=e;switch(e=e.nextSibling,t.nodeName){case"HTML":case"HEAD":case"BODY":Fd(t),$l(t);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(t.rel.toLowerCase()==="stylesheet")continue}s.removeChild(t)}}function B_(s,e,t,a){for(;s.nodeType===1;){var n=t;if(s.nodeName.toLowerCase()!==e.toLowerCase()){if(!a&&(s.nodeName!=="INPUT"||s.type!=="hidden"))break}else if(a){if(!s[Ea])switch(e){case"meta":if(!s.hasAttribute("itemprop"))break;return s;case"link":if(l=s.getAttribute("rel"),l==="stylesheet"&&s.hasAttribute("data-precedence"))break;if(l!==n.rel||s.getAttribute("href")!==(n.href==null||n.href===""?null:n.href)||s.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin)||s.getAttribute("title")!==(n.title==null?null:n.title))break;return s;case"style":if(s.hasAttribute("data-precedence"))break;return s;case"script":if(l=s.getAttribute("src"),(l!==(n.src==null?null:n.src)||s.getAttribute("type")!==(n.type==null?null:n.type)||s.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin))&&l&&s.hasAttribute("async")&&!s.hasAttribute("itemprop"))break;return s;default:return s}}else if(e==="input"&&s.type==="hidden"){var l=n.name==null?null:""+n.name;if(n.type==="hidden"&&s.getAttribute("name")===l)return s}else return s;if(s=he(s.nextSibling),s===null)break}return null}function z_(s,e,t){if(e==="")return null;for(;s.nodeType!==3;)if((s.nodeType!==1||s.nodeName!=="INPUT"||s.type!=="hidden")&&!t||(s=he(s.nextSibling),s===null))return null;return s}function Ku(s,e){for(;s.nodeType!==8;)if((s.nodeType!==1||s.nodeName!=="INPUT"||s.type!=="hidden")&&!e||(s=he(s.nextSibling),s===null))return null;return s}function Jd(s){return s.data==="$?"||s.data==="$~"}function Wd(s){return s.data==="$!"||s.data==="$?"&&s.ownerDocument.readyState!=="loading"}function N_(s,e){var t=s.ownerDocument;if(s.data==="$~")s._reactRetry=e;else if(s.data!=="$?"||t.readyState!=="loading")e();else{var a=function(){e(),t.removeEventListener("DOMContentLoaded",a)};t.addEventListener("DOMContentLoaded",a),s._reactRetry=a}}function he(s){for(;s!=null;s=s.nextSibling){var e=s.nodeType;if(e===1||e===3)break;if(e===8){if(e=s.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return s}var Id=null;function Fu(s){s=s.nextSibling;for(var e=0;s;){if(s.nodeType===8){var t=s.data;if(t==="/$"||t==="/&"){if(e===0)return he(s.nextSibling);e--}else t!=="$"&&t!=="$!"&&t!=="$?"&&t!=="$~"&&t!=="&"||e++}s=s.nextSibling}return null}function Ju(s){s=s.previousSibling;for(var e=0;s;){if(s.nodeType===8){var t=s.data;if(t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"){if(e===0)return s;e--}else t!=="/$"&&t!=="/&"||e++}s=s.previousSibling}return null}function Wu(s,e,t){switch(e=Ml(t),s){case"html":if(s=e.documentElement,!s)throw Error(_(452));return s;case"head":if(s=e.head,!s)throw Error(_(453));return s;case"body":if(s=e.body,!s)throw Error(_(454));return s;default:throw Error(_(451))}}function vn(s){for(var e=s.attributes;e.length;)s.removeAttributeNode(e[0]);$l(s)}var ge=new Map,Iu=new Set;function Dl(s){return typeof s.getRootNode=="function"?s.getRootNode():s.nodeType===9?s:s.ownerDocument}var Fe=T.d;T.d={f:H_,r:O_,D:j_,C:V_,L:R_,m:U_,X:Z_,S:q_,M:Y_};function H_(){var s=Fe.f(),e=bl();return s||e}function O_(s){var e=Gt(s);e!==null&&e.tag===5&&e.type==="form"?_r(e):Fe.r(s)}var ya=typeof document>"u"?null:document;function Pu(s,e,t){var a=ya;if(a&&typeof e=="string"&&e){var n=ce(e);n='link[rel="'+s+'"][href="'+n+'"]',typeof t=="string"&&(n+='[crossorigin="'+t+'"]'),Iu.has(n)||(Iu.add(n),s={rel:s,crossOrigin:t,href:e},a.querySelector(n)===null&&(e=a.createElement("link"),As(e,"link",s),Ss(e),a.head.appendChild(e)))}}function j_(s){Fe.D(s),Pu("dns-prefetch",s,null)}function V_(s,e){Fe.C(s,e),Pu("preconnect",s,e)}function R_(s,e,t){Fe.L(s,e,t);var a=ya;if(a&&s&&e){var n='link[rel="preload"][as="'+ce(e)+'"]';e==="image"&&t&&t.imageSrcSet?(n+='[imagesrcset="'+ce(t.imageSrcSet)+'"]',typeof t.imageSizes=="string"&&(n+='[imagesizes="'+ce(t.imageSizes)+'"]')):n+='[href="'+ce(s)+'"]';var l=n;switch(e){case"style":l=xa(s);break;case"script":l=Ca(s)}ge.has(l)||(s=H({rel:"preload",href:e==="image"&&t&&t.imageSrcSet?void 0:s,as:e},t),ge.set(l,s),a.querySelector(n)!==null||e==="style"&&a.querySelector(_n(l))||e==="script"&&a.querySelector(fn(l))||(e=a.createElement("link"),As(e,"link",s),Ss(e),a.head.appendChild(e)))}}function U_(s,e){Fe.m(s,e);var t=ya;if(t&&s){var a=e&&typeof e.as=="string"?e.as:"script",n='link[rel="modulepreload"][as="'+ce(a)+'"][href="'+ce(s)+'"]',l=n;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":l=Ca(s)}if(!ge.has(l)&&(s=H({rel:"modulepreload",href:s},e),ge.set(l,s),t.querySelector(n)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(t.querySelector(fn(l)))return}a=t.createElement("link"),As(a,"link",s),Ss(a),t.head.appendChild(a)}}}function q_(s,e,t){Fe.S(s,e,t);var a=ya;if(a&&s){var n=Xt(a).hoistableStyles,l=xa(s);e=e||"default";var i=n.get(l);if(!i){var d={loading:0,preload:null};if(i=a.querySelector(_n(l)))d.loading=5;else{s=H({rel:"stylesheet",href:s,"data-precedence":e},t),(t=ge.get(l))&&Pd(s,t);var o=i=a.createElement("link");Ss(o),As(o,"link",s),o._p=new Promise(function(h,m){o.onload=h,o.onerror=m}),o.addEventListener("load",function(){d.loading|=1}),o.addEventListener("error",function(){d.loading|=2}),d.loading|=4,Ll(i,e,a)}i={type:"stylesheet",instance:i,count:1,state:d},n.set(l,i)}}}function Z_(s,e){Fe.X(s,e);var t=ya;if(t&&s){var a=Xt(t).hoistableScripts,n=Ca(s),l=a.get(n);l||(l=t.querySelector(fn(n)),l||(s=H({src:s,async:!0},e),(e=ge.get(n))&&$d(s,e),l=t.createElement("script"),Ss(l),As(l,"link",s),t.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},a.set(n,l))}}function Y_(s,e){Fe.M(s,e);var t=ya;if(t&&s){var a=Xt(t).hoistableScripts,n=Ca(s),l=a.get(n);l||(l=t.querySelector(fn(n)),l||(s=H({src:s,async:!0,type:"module"},e),(e=ge.get(n))&&$d(s,e),l=t.createElement("script"),Ss(l),As(l,"link",s),t.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},a.set(n,l))}}function $u(s,e,t,a){var n=(n=X.current)?Dl(n):null;if(!n)throw Error(_(446));switch(s){case"meta":case"title":return null;case"style":return typeof t.precedence=="string"&&typeof t.href=="string"?(e=xa(t.href),t=Xt(n).hoistableStyles,a=t.get(e),a||(a={type:"style",instance:null,count:0,state:null},t.set(e,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(t.rel==="stylesheet"&&typeof t.href=="string"&&typeof t.precedence=="string"){s=xa(t.href);var l=Xt(n).hoistableStyles,i=l.get(s);if(i||(n=n.ownerDocument||n,i={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},l.set(s,i),(l=n.querySelector(_n(s)))&&!l._p&&(i.instance=l,i.state.loading=5),ge.has(s)||(t={rel:"preload",as:"style",href:t.href,crossOrigin:t.crossOrigin,integrity:t.integrity,media:t.media,hrefLang:t.hrefLang,referrerPolicy:t.referrerPolicy},ge.set(s,t),l||G_(n,s,t,i.state))),e&&a===null)throw Error(_(528,""));return i}if(e&&a!==null)throw Error(_(529,""));return null;case"script":return e=t.async,t=t.src,typeof t=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Ca(t),t=Xt(n).hoistableScripts,a=t.get(e),a||(a={type:"script",instance:null,count:0,state:null},t.set(e,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(_(444,s))}}function xa(s){return'href="'+ce(s)+'"'}function _n(s){return'link[rel="stylesheet"]['+s+"]"}function sp(s){return H({},s,{"data-precedence":s.precedence,precedence:null})}function G_(s,e,t,a){s.querySelector('link[rel="preload"][as="style"]['+e+"]")?a.loading=1:(e=s.createElement("link"),a.preload=e,e.addEventListener("load",function(){return a.loading|=1}),e.addEventListener("error",function(){return a.loading|=2}),As(e,"link",t),Ss(e),s.head.appendChild(e))}function Ca(s){return'[src="'+ce(s)+'"]'}function fn(s){return"script[async]"+s}function ep(s,e,t){if(e.count++,e.instance===null)switch(e.type){case"style":var a=s.querySelector('style[data-href~="'+ce(t.href)+'"]');if(a)return e.instance=a,Ss(a),a;var n=H({},t,{"data-href":t.href,"data-precedence":t.precedence,href:null,precedence:null});return a=(s.ownerDocument||s).createElement("style"),Ss(a),As(a,"style",n),Ll(a,t.precedence,s),e.instance=a;case"stylesheet":n=xa(t.href);var l=s.querySelector(_n(n));if(l)return e.state.loading|=4,e.instance=l,Ss(l),l;a=sp(t),(n=ge.get(n))&&Pd(a,n),l=(s.ownerDocument||s).createElement("link"),Ss(l);var i=l;return i._p=new Promise(function(d,o){i.onload=d,i.onerror=o}),As(l,"link",a),e.state.loading|=4,Ll(l,t.precedence,s),e.instance=l;case"script":return l=Ca(t.src),(n=s.querySelector(fn(l)))?(e.instance=n,Ss(n),n):(a=t,(n=ge.get(l))&&(a=H({},t),$d(a,n)),s=s.ownerDocument||s,n=s.createElement("script"),Ss(n),As(n,"link",a),s.head.appendChild(n),e.instance=n);case"void":return null;default:throw Error(_(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(a=e.instance,e.state.loading|=4,Ll(a,t.precedence,s));return e.instance}function Ll(s,e,t){for(var a=t.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),n=a.length?a[a.length-1]:null,l=n,i=0;i<a.length;i++){var d=a[i];if(d.dataset.precedence===e)l=d;else if(l!==n)break}l?l.parentNode.insertBefore(s,l.nextSibling):(e=t.nodeType===9?t.head:t,e.insertBefore(s,e.firstChild))}function Pd(s,e){s.crossOrigin==null&&(s.crossOrigin=e.crossOrigin),s.referrerPolicy==null&&(s.referrerPolicy=e.referrerPolicy),s.title==null&&(s.title=e.title)}function $d(s,e){s.crossOrigin==null&&(s.crossOrigin=e.crossOrigin),s.referrerPolicy==null&&(s.referrerPolicy=e.referrerPolicy),s.integrity==null&&(s.integrity=e.integrity)}var Tl=null;function tp(s,e,t){if(Tl===null){var a=new Map,n=Tl=new Map;n.set(t,a)}else n=Tl,a=n.get(t),a||(a=new Map,n.set(t,a));if(a.has(s))return a;for(a.set(s,null),t=t.getElementsByTagName(s),n=0;n<t.length;n++){var l=t[n];if(!(l[Ea]||l[Ds]||s==="link"&&l.getAttribute("rel")==="stylesheet")&&l.namespaceURI!=="http://www.w3.org/2000/svg"){var i=l.getAttribute(e)||"";i=s+i;var d=a.get(i);d?d.push(l):a.set(i,[l])}}return a}function ap(s,e,t){s=s.ownerDocument||s,s.head.insertBefore(t,e==="title"?s.querySelector("head > title"):null)}function X_(s,e,t){if(t===1||e.itemProp!=null)return!1;switch(s){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return s=e.disabled,typeof e.precedence=="string"&&s==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function np(s){return!(s.type==="stylesheet"&&(s.state.loading&3)===0)}function Q_(s,e,t,a){if(t.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var n=xa(a.href),l=e.querySelector(_n(n));if(l){e=l._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(s.count++,s=El.bind(s),e.then(s,s)),t.state.loading|=4,t.instance=l,Ss(l);return}l=e.ownerDocument||e,a=sp(a),(n=ge.get(n))&&Pd(a,n),l=l.createElement("link"),Ss(l);var i=l;i._p=new Promise(function(d,o){i.onload=d,i.onerror=o}),As(l,"link",a),t.instance=l}s.stylesheets===null&&(s.stylesheets=new Map),s.stylesheets.set(t,e),(e=t.state.preload)&&(t.state.loading&3)===0&&(s.count++,t=El.bind(s),e.addEventListener("load",t),e.addEventListener("error",t))}}var so=0;function K_(s,e){return s.stylesheets&&s.count===0&&Bl(s,s.stylesheets),0<s.count||0<s.imgCount?function(t){var a=setTimeout(function(){if(s.stylesheets&&Bl(s,s.stylesheets),s.unsuspend){var l=s.unsuspend;s.unsuspend=null,l()}},6e4+e);0<s.imgBytes&&so===0&&(so=62500*D_());var n=setTimeout(function(){if(s.waitingForImages=!1,s.count===0&&(s.stylesheets&&Bl(s,s.stylesheets),s.unsuspend)){var l=s.unsuspend;s.unsuspend=null,l()}},(s.imgBytes>so?50:800)+e);return s.unsuspend=t,function(){s.unsuspend=null,clearTimeout(a),clearTimeout(n)}}:null}function El(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Bl(this,this.stylesheets);else if(this.unsuspend){var s=this.unsuspend;this.unsuspend=null,s()}}}var Al=null;function Bl(s,e){s.stylesheets=null,s.unsuspend!==null&&(s.count++,Al=new Map,e.forEach(F_,s),Al=null,El.call(s))}function F_(s,e){if(!(e.state.loading&4)){var t=Al.get(s);if(t)var a=t.get(null);else{t=new Map,Al.set(s,t);for(var n=s.querySelectorAll("link[data-precedence],style[data-precedence]"),l=0;l<n.length;l++){var i=n[l];(i.nodeName==="LINK"||i.getAttribute("media")!=="not all")&&(t.set(i.dataset.precedence,i),a=i)}a&&t.set(null,a)}n=e.instance,i=n.getAttribute("data-precedence"),l=t.get(i)||a,l===a&&t.set(null,n),t.set(i,n),this.count++,a=El.bind(this),n.addEventListener("load",a),n.addEventListener("error",a),l?l.parentNode.insertBefore(n,l.nextSibling):(s=s.nodeType===9?s.head:s,s.insertBefore(n,s.firstChild)),e.state.loading|=4}}var hn={$$typeof:zs,Provider:null,Consumer:null,_currentValue:U,_currentValue2:U,_threadCount:0};function J_(s,e,t,a,n,l,i,d,o){this.tag=1,this.containerInfo=s,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Jl(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Jl(0),this.hiddenUpdates=Jl(null),this.identifierPrefix=a,this.onUncaughtError=n,this.onCaughtError=l,this.onRecoverableError=i,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.incompleteTransitions=new Map}function lp(s,e,t,a,n,l,i,d,o,h,m,y){return s=new J_(s,e,t,i,o,h,m,y,d),e=1,l===!0&&(e|=24),l=ee(3,null,null,e),s.current=l,l.stateNode=s,e=zi(),e.refCount++,s.pooledCache=e,e.refCount++,l.memoizedState={element:a,isDehydrated:t,cache:e},ji(l),s}function ip(s){return s?(s=ea,s):ea}function dp(s,e,t,a,n,l){n=ip(n),a.context===null?a.context=n:a.pendingContext=n,a=nt(e),a.payload={element:t},l=l===void 0?null:l,l!==null&&(a.callback=l),t=lt(s,a,e),t!==null&&(Js(t,s,e),Ka(t,s,e))}function op(s,e){if(s=s.memoizedState,s!==null&&s.dehydrated!==null){var t=s.retryLane;s.retryLane=t!==0&&t<e?t:e}}function eo(s,e){op(s,e),(s=s.alternate)&&op(s,e)}function cp(s){if(s.tag===13||s.tag===31){var e=Lt(s,67108864);e!==null&&Js(e,s,67108864),eo(s,67108864)}}function rp(s){if(s.tag===13||s.tag===31){var e=ie();e=Wl(e);var t=Lt(s,e);t!==null&&Js(t,s,e),eo(s,e)}}var zl=!0;function W_(s,e,t,a){var n=w.T;w.T=null;var l=T.p;try{T.p=2,to(s,e,t,a)}finally{T.p=l,w.T=n}}function I_(s,e,t,a){var n=w.T;w.T=null;var l=T.p;try{T.p=8,to(s,e,t,a)}finally{T.p=l,w.T=n}}function to(s,e,t,a){if(zl){var n=ao(a);if(n===null)Zd(s,e,a,Nl,t),pp(s,a);else if($_(n,s,e,t,a))a.stopPropagation();else if(pp(s,a),e&4&&-1<P_.indexOf(s)){for(;n!==null;){var l=Gt(n);if(l!==null)switch(l.tag){case 3:if(l=l.stateNode,l.current.memoizedState.isDehydrated){var i=xt(l.pendingLanes);if(i!==0){var d=l;for(d.pendingLanes|=2,d.entangledLanes|=2;i;){var o=1<<31-$s(i);d.entanglements[1]|=o,i&=~o}Le(l),(ts&6)===0&&(hl=Is()+500,rn(0))}}break;case 31:case 13:d=Lt(l,2),d!==null&&Js(d,l,2),bl(),eo(l,2)}if(l=ao(a),l===null&&Zd(s,e,a,Nl,t),l===n)break;n=l}n!==null&&a.stopPropagation()}else Zd(s,e,a,null,t)}}function ao(s){return s=li(s),no(s)}var Nl=null;function no(s){if(Nl=null,s=Yt(s),s!==null){var e=N(s);if(e===null)s=null;else{var t=e.tag;if(t===13){if(s=O(e),s!==null)return s;s=null}else if(t===31){if(s=W(e),s!==null)return s;s=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;s=null}else e!==s&&(s=null)}}return Nl=s,null}function up(s){switch(s){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(jp()){case mo:return 2;case wo:return 8;case xn:case Vp:return 32;case ko:return 268435456;default:return 32}default:return 32}}var lo=!1,ht=null,gt=null,bt=null,gn=new Map,bn=new Map,mt=[],P_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function pp(s,e){switch(s){case"focusin":case"focusout":ht=null;break;case"dragenter":case"dragleave":gt=null;break;case"mouseover":case"mouseout":bt=null;break;case"pointerover":case"pointerout":gn.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":bn.delete(e.pointerId)}}function mn(s,e,t,a,n,l){return s===null||s.nativeEvent!==l?(s={blockedOn:e,domEventName:t,eventSystemFlags:a,nativeEvent:l,targetContainers:[n]},e!==null&&(e=Gt(e),e!==null&&cp(e)),s):(s.eventSystemFlags|=a,e=s.targetContainers,n!==null&&e.indexOf(n)===-1&&e.push(n),s)}function $_(s,e,t,a,n){switch(e){case"focusin":return ht=mn(ht,s,e,t,a,n),!0;case"dragenter":return gt=mn(gt,s,e,t,a,n),!0;case"mouseover":return bt=mn(bt,s,e,t,a,n),!0;case"pointerover":var l=n.pointerId;return gn.set(l,mn(gn.get(l)||null,s,e,t,a,n)),!0;case"gotpointercapture":return l=n.pointerId,bn.set(l,mn(bn.get(l)||null,s,e,t,a,n)),!0}return!1}function vp(s){var e=Yt(s.target);if(e!==null){var t=N(e);if(t!==null){if(e=t.tag,e===13){if(e=O(t),e!==null){s.blockedOn=e,Do(s.priority,function(){rp(t)});return}}else if(e===31){if(e=W(t),e!==null){s.blockedOn=e,Do(s.priority,function(){rp(t)});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){s.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}s.blockedOn=null}function Hl(s){if(s.blockedOn!==null)return!1;for(var e=s.targetContainers;0<e.length;){var t=ao(s.nativeEvent);if(t===null){t=s.nativeEvent;var a=new t.constructor(t.type,t);ni=a,t.target.dispatchEvent(a),ni=null}else return e=Gt(t),e!==null&&cp(e),s.blockedOn=t,!1;e.shift()}return!0}function _p(s,e,t){Hl(s)&&t.delete(e)}function s1(){lo=!1,ht!==null&&Hl(ht)&&(ht=null),gt!==null&&Hl(gt)&&(gt=null),bt!==null&&Hl(bt)&&(bt=null),gn.forEach(_p),bn.forEach(_p)}function Ol(s,e){s.blockedOn===e&&(s.blockedOn=null,lo||(lo=!0,p.unstable_scheduleCallback(p.unstable_NormalPriority,s1)))}var jl=null;function fp(s){jl!==s&&(jl=s,p.unstable_scheduleCallback(p.unstable_NormalPriority,function(){jl===s&&(jl=null);for(var e=0;e<s.length;e+=3){var t=s[e],a=s[e+1],n=s[e+2];if(typeof a!="function"){if(no(a||t)===null)continue;break}var l=Gt(t);l!==null&&(s.splice(e,3),e-=3,ad(l,{pending:!0,data:n,method:t.method,action:a},a,n))}}))}function Sa(s){function e(o){return Ol(o,s)}ht!==null&&Ol(ht,s),gt!==null&&Ol(gt,s),bt!==null&&Ol(bt,s),gn.forEach(e),bn.forEach(e);for(var t=0;t<mt.length;t++){var a=mt[t];a.blockedOn===s&&(a.blockedOn=null)}for(;0<mt.length&&(t=mt[0],t.blockedOn===null);)vp(t),t.blockedOn===null&&mt.shift();if(t=(s.ownerDocument||s).$$reactFormReplay,t!=null)for(a=0;a<t.length;a+=3){var n=t[a],l=t[a+1],i=n[Ys]||null;if(typeof l=="function")i||fp(t);else if(i){var d=null;if(l&&l.hasAttribute("formAction")){if(n=l,i=l[Ys]||null)d=i.formAction;else if(no(n)!==null)continue}else d=i.action;typeof d=="function"?t[a+1]=d:(t.splice(a,3),a-=3),fp(t)}}}function hp(){function s(l){l.canIntercept&&l.info==="react-transition"&&l.intercept({handler:function(){return new Promise(function(i){return n=i})},focusReset:"manual",scroll:"manual"})}function e(){n!==null&&(n(),n=null),a||setTimeout(t,20)}function t(){if(!a&&!navigation.transition){var l=navigation.currentEntry;l&&l.url!=null&&navigation.navigate(l.url,{state:l.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,n=null;return navigation.addEventListener("navigate",s),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(t,100),function(){a=!0,navigation.removeEventListener("navigate",s),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),n!==null&&(n(),n=null)}}}function io(s){this._internalRoot=s}Vl.prototype.render=io.prototype.render=function(s){var e=this._internalRoot;if(e===null)throw Error(_(409));var t=e.current,a=ie();dp(t,a,s,e,null,null)},Vl.prototype.unmount=io.prototype.unmount=function(){var s=this._internalRoot;if(s!==null){this._internalRoot=null;var e=s.containerInfo;dp(s.current,2,null,s,null,null),bl(),e[Zt]=null}};function Vl(s){this._internalRoot=s}Vl.prototype.unstable_scheduleHydration=function(s){if(s){var e=Mo();s={blockedOn:null,target:s,priority:e};for(var t=0;t<mt.length&&e!==0&&e<mt[t].priority;t++);mt.splice(t,0,s),t===0&&vp(s)}};var gp=M.version;if(gp!=="19.2.7")throw Error(_(527,gp,"19.2.7"));T.findDOMNode=function(s){var e=s._reactInternals;if(e===void 0)throw typeof s.render=="function"?Error(_(188)):(s=Object.keys(s).join(","),Error(_(268,s)));return s=x(e),s=s!==null?V(s):null,s=s===null?null:s.stateNode,s};var e1={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:w,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Rl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Rl.isDisabled&&Rl.supportsFiber)try{Da=Rl.inject(e1),Ps=Rl}catch{}}return kn.createRoot=function(s,e){if(!D(s))throw Error(_(299));var t=!1,a="",n=Cr,l=Sr,i=Mr;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(a=e.identifierPrefix),e.onUncaughtError!==void 0&&(n=e.onUncaughtError),e.onCaughtError!==void 0&&(l=e.onCaughtError),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=lp(s,1,!1,null,null,t,a,null,n,l,i,hp),s[Zt]=e.current,qd(s),new io(e)},kn.hydrateRoot=function(s,e,t){if(!D(s))throw Error(_(299));var a=!1,n="",l=Cr,i=Sr,d=Mr,o=null;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onUncaughtError!==void 0&&(l=t.onUncaughtError),t.onCaughtError!==void 0&&(i=t.onCaughtError),t.onRecoverableError!==void 0&&(d=t.onRecoverableError),t.formState!==void 0&&(o=t.formState)),e=lp(s,1,!0,e,t??null,a,n,o,l,i,d,hp),e.context=ip(null),t=e.current,a=ie(),a=Wl(a),n=nt(a),n.callback=null,lt(t,n,a),t=a,e.current.lanes=t,Ta(e,t),Le(e),s[Zt]=e.current,qd(s),new Vl(e)},kn.version="19.2.7",kn}var Dp;function u1(){if(Dp)return co.exports;Dp=1;function p(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(p)}catch(M){console.error(M)}}return p(),co.exports=r1(),co.exports}var p1=u1(),Vs=ho();const v1=[{id:"buttons",title:"Buttons",desc:"Trigger actions, submit forms, and navigate flows. Use one primary action per view: secondary and invisible variants for supporting actions.",html:`<section class="ds-chapter ds-tab-panel">
      <header class="ds-chapter__header">
        <h2 class="ds-chapter__title">Buttons</h2>
        <p class="ds-chapter__desc">Trigger actions, submit forms, and navigate flows. Use one primary action per view: secondary and invisible variants for supporting actions.</p>
      </header>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Variants</h3>
          <p class="ds-showcase__desc">Primary for the main CTA. Secondary for alternatives. Danger for destructive actions. Invisible for tertiary toolbar actions.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-btn--{primary|secondary|danger|invisible}</code>
            <span class="ds-tag">Required</span>
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row">
        <button class="tds-btn tds-btn--lg tds-btn--primary">Button</button>
        <button class="tds-btn tds-btn--lg tds-btn--secondary">Button</button>
        <button class="tds-btn tds-btn--lg tds-btn--danger">Button</button>
        <button class="tds-btn tds-btn--lg tds-btn--invisible">Button</button>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Sizes</h3>
          <p class="ds-showcase__desc">Small fits dense tables and chips. Medium is the default. Large for hero actions and full-width mobile CTAs.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-btn--{sm|md|lg}</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row">
        <button class="tds-btn tds-btn--sm tds-btn--primary">Small 24px</button>
        <button class="tds-btn tds-btn--md tds-btn--primary">Medium 32px</button>
        <button class="tds-btn tds-btn--lg tds-btn--primary">Large 42px</button>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">States</h3>
          <p class="ds-showcase__desc">Disabled blocks interaction. Inactive shows a selected-but-muted filter state: text stays muted on hover.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-btn--inactive · :disabled</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="ds-matrix">
  <span class="ds-matrix__corner"></span>
  <span class="ds-matrix__colhead">Default</span>
  <span class="ds-matrix__colhead">Focused</span>
  <span class="ds-matrix__colhead">Disabled</span>
  <span class="ds-matrix__colhead">Inactive</span>

  <span class="ds-matrix__rowhead">Primary</span>
  <span class="ds-matrix__cell"><button class="tds-btn tds-btn--lg tds-btn--primary">Button</button></span>
  <span class="ds-matrix__cell"><button class="tds-btn tds-btn--lg tds-btn--primary tds-btn--focus">Button</button></span>
  <span class="ds-matrix__cell"><button class="tds-btn tds-btn--lg tds-btn--primary" disabled>Button</button></span>
  <span class="ds-matrix__cell"><button class="tds-btn tds-btn--lg tds-btn--primary tds-btn--inactive">Button</button></span>

  <span class="ds-matrix__rowhead">Secondary</span>
  <span class="ds-matrix__cell"><button class="tds-btn tds-btn--lg tds-btn--secondary">Button</button></span>
  <span class="ds-matrix__cell"><button class="tds-btn tds-btn--lg tds-btn--secondary tds-btn--focus">Button</button></span>
  <span class="ds-matrix__cell"><button class="tds-btn tds-btn--lg tds-btn--secondary" disabled>Button</button></span>
  <span class="ds-matrix__cell"><button class="tds-btn tds-btn--lg tds-btn--secondary tds-btn--inactive">Button</button></span>

  <span class="ds-matrix__rowhead">Danger</span>
  <span class="ds-matrix__cell"><button class="tds-btn tds-btn--lg tds-btn--danger">Button</button></span>
  <span class="ds-matrix__cell"><button class="tds-btn tds-btn--lg tds-btn--danger tds-btn--focus">Button</button></span>
  <span class="ds-matrix__cell"><button class="tds-btn tds-btn--lg tds-btn--danger" disabled>Button</button></span>
  <span class="ds-matrix__cell"><button class="tds-btn tds-btn--lg tds-btn--danger tds-btn--inactive">Button</button></span>

  <span class="ds-matrix__rowhead">Invisible</span>
  <span class="ds-matrix__cell"><button class="tds-btn tds-btn--lg tds-btn--invisible">Button</button></span>
  <span class="ds-matrix__cell"><button class="tds-btn tds-btn--lg tds-btn--invisible tds-btn--focus">Button</button></span>
  <span class="ds-matrix__cell"><button class="tds-btn tds-btn--lg tds-btn--invisible" disabled>Button</button></span>
  <span class="ds-matrix__cell"><button class="tds-btn tds-btn--lg tds-btn--invisible tds-btn--inactive">Button</button></span>
</div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">With counter &amp; icons</h3>
          <p class="ds-showcase__desc">Optional boolean slots on the Button component: leadingVisual, counter, trailingVisual, and dropdown. All can be combined on one button.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">leadingVisual · counter · trailingVisual · dropdown</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row">
        <button class="tds-btn tds-btn--lg tds-btn--secondary">
          <span class="tds-btn__leading-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
          Button
        </button>
        <button class="tds-btn tds-btn--lg tds-btn--secondary">
          Button
          <span class="tds-btn__counter">20</span>
        </button>
        <button class="tds-btn tds-btn--lg tds-btn--secondary">
          Button
          <span class="tds-btn__trailing-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
        </button>
        <button class="tds-btn tds-btn--lg tds-btn--secondary">
          Button
          <span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span>
        </button>
      </div>
      <div class="spacer--sm"></div>
      <div class="row">
        <button class="tds-btn tds-btn--lg tds-btn--secondary">
          <span class="tds-btn__leading-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
          Button
          <span class="tds-btn__counter">20</span>
          <span class="tds-btn__trailing-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
          <span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span>
        </button>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Loading</h3>
          <p class="ds-showcase__desc">Spinner boolean replaces trailing slots while an action is pending (Figma 96:2225).</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-btn--loading · .tds-spinner--sm</code>
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row">
        <button class="tds-btn tds-btn--lg tds-btn--secondary tds-btn--loading" aria-busy="true">
          Button
          <span class="tds-spinner tds-spinner--sm" aria-hidden="true"></span>
        </button>
        <button class="tds-btn tds-btn--md tds-btn--primary tds-btn--loading" aria-busy="true">
          Button
          <span class="tds-spinner tds-spinner--sm" aria-hidden="true"></span>
        </button>
        <button class="tds-btn tds-btn--sm tds-btn--danger tds-btn--loading" aria-busy="true">
          Button
          <span class="tds-spinner tds-spinner--sm" aria-hidden="true"></span>
        </button>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Button group</h3>
          <p class="ds-showcase__desc">Segmented control on a neutral track: iconButtons, buttons, and mixed types (Figma 1952:33320).</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-button-group · count 2–5</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid" style="grid-template-columns: 1fr; gap: var(--spacing-16);">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Icon buttons · 3</span>
<div class="tds-button-group" role="group" aria-label="Icon button group">
  <button type="button" class="tds-icon-btn tds-icon-btn--sm tds-icon-btn--secondary" aria-label="First"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button>
  <button type="button" class="tds-icon-btn tds-icon-btn--sm tds-icon-btn--invisible" aria-label="Selected"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button>
  <button type="button" class="tds-icon-btn tds-icon-btn--sm tds-icon-btn--secondary" aria-label="Third"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Buttons · 3</span>
<div class="tds-button-group" role="group" aria-label="Button group">
  <button type="button" class="tds-btn tds-btn--sm tds-btn--secondary">Button</button>
  <button type="button" class="tds-btn tds-btn--sm tds-btn--invisible">Button</button>
  <button type="button" class="tds-btn tds-btn--sm tds-btn--secondary">Button</button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Mixed · 2</span>
<div class="tds-button-group" role="group" aria-label="Mixed button group">
  <button type="button" class="tds-btn tds-btn--sm tds-btn--secondary">Button</button>
  <button type="button" class="tds-icon-btn tds-icon-btn--sm tds-icon-btn--invisible" aria-label="Selected"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button>
</div></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Segmented control</h3>
          <p class="ds-showcase__desc">Pick one choice from a linear set of closely related options: text labels, icon-only, medium and small sizes (Figma 3367:27333).</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-segmented-control · .tds-segmented-control--{sm|icon-only}</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid" style="grid-template-columns: 1fr; gap: var(--spacing-16);">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Text · medium · 2 items</span>
<div class="tds-segmented-control" role="group" aria-label="Document view">
  <button type="button" class="tds-segmented-control__item tds-segmented-control__item--selected" aria-pressed="true"><span class="tds-segmented-control__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1.5H4.5A1.5 1.5 0 0 0 3 3v10a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 13 13V5.5L9 1.5Z" stroke="currentColor" stroke-width="1.25"/><path d="M9 1.5V5.5H13" stroke="currentColor" stroke-width="1.25"/><path d="M6.5 8.5 5 10l1.5 1.5M9.5 8.5 11 10l-1.5 1.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg></span><span class="tds-segmented-control__label">One</span></button>
  <button type="button" class="tds-segmented-control__item" aria-pressed="false"><span class="tds-segmented-control__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1.5H4.5A1.5 1.5 0 0 0 3 3v10a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 13 13V5.5L9 1.5Z" stroke="currentColor" stroke-width="1.25"/><path d="M9 1.5V5.5H13" stroke="currentColor" stroke-width="1.25"/><path d="M5.5 8.5h5M5.5 10.5h5M5.5 12.5h3" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg></span><span class="tds-segmented-control__label">Two</span></button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Text · medium · 3 items</span>
<div class="tds-segmented-control" role="group" aria-label="Range">
  <button type="button" class="tds-segmented-control__item" aria-pressed="false"><span class="tds-segmented-control__label">Day</span></button>
  <button type="button" class="tds-segmented-control__item tds-segmented-control__item--selected" aria-pressed="true"><span class="tds-segmented-control__label">Week</span></button>
  <button type="button" class="tds-segmented-control__item" aria-pressed="false"><span class="tds-segmented-control__label">Month</span></button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Icon only · medium · 3 items</span>
<div class="tds-segmented-control tds-segmented-control--icon-only" role="group" aria-label="Layout">
  <button type="button" class="tds-segmented-control__item" aria-label="List" aria-pressed="false"><span class="tds-segmented-control__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span></button>
  <button type="button" class="tds-segmented-control__item tds-segmented-control__item--selected" aria-label="Grid" aria-pressed="true"><span class="tds-segmented-control__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" stroke="currentColor" stroke-width="1.25"/><rect x="9" y="2.5" width="4.5" height="4.5" rx="1" stroke="currentColor" stroke-width="1.25"/><rect x="2.5" y="9" width="4.5" height="4.5" rx="1" stroke="currentColor" stroke-width="1.25"/><rect x="9" y="9" width="4.5" height="4.5" rx="1" stroke="currentColor" stroke-width="1.25"/></svg></span></button>
  <button type="button" class="tds-segmented-control__item" aria-label="Chart" aria-pressed="false"><span class="tds-segmented-control__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12.5V8.5M7 12.5V5.5M11 12.5V3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span></button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Text · small · 2 items</span>
<div class="tds-segmented-control tds-segmented-control--sm" role="group" aria-label="Sort direction">
  <button type="button" class="tds-segmented-control__item tds-segmented-control__item--selected" aria-pressed="true"><span class="tds-segmented-control__label">Asc</span></button>
  <button type="button" class="tds-segmented-control__item" aria-pressed="false"><span class="tds-segmented-control__label">Desc</span></button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Item states</span>
<div class="tds-segmented-control" role="group" aria-label="Segment states">
  <button type="button" class="tds-segmented-control__item tds-segmented-control__item--selected" aria-pressed="true"><span class="tds-segmented-control__label">Selected</span></button>
  <button type="button" class="tds-segmented-control__item tds-segmented-control__item--hover-demo" aria-pressed="false"><span class="tds-segmented-control__label">Hover</span></button>
  <button type="button" class="tds-segmented-control__item tds-segmented-control__item--pressed-demo" aria-pressed="false"><span class="tds-segmented-control__label">Pressed</span></button>
  <button type="button" class="tds-segmented-control__item" aria-pressed="false"><span class="tds-segmented-control__label">Rest</span></button>
</div></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Spinner</h3>
          <p class="ds-showcase__desc">Standalone loading indicator: four sizes with optional label (Figma 2092:18230).</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-spinner--{xs|sm|md|lg|xl} · .tds-spinner--negative · .tds-spinner-block</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid">
        <div class="ds-state-demo"><span class="ds-state-demo__label">XSmall</span><span class="tds-spinner tds-spinner--xs" role="status" aria-label="Loading"></span></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Small</span><span class="tds-spinner tds-spinner--sm" role="status" aria-label="Loading"></span></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Medium</span><span class="tds-spinner tds-spinner--md" role="status" aria-label="Loading"></span></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Large</span><span class="tds-spinner tds-spinner--lg" role="status" aria-label="Loading"></span></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">XLarge</span><span class="tds-spinner tds-spinner--xl" role="status" aria-label="Loading"></span></div>
        <div class="ds-state-demo" style="grid-column: 1 / -1;"><span class="ds-state-demo__label">Negative tone</span><span class="tds-spinner tds-spinner--md tds-spinner--negative" role="status" aria-label="Loading"></span></div>
        <div class="ds-state-demo" style="grid-column: 1 / -1;"><span class="ds-state-demo__label">With label</span>
<div class="tds-spinner-block tds-spinner-block--md">
  <span class="tds-spinner tds-spinner--md" aria-hidden="true"></span>
  <span class="tds-spinner-block__label">Loading…</span>
</div></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Button menu</h3>
          <p class="ds-showcase__desc">Button trigger with action list dropdown: 4px gap to panel (Figma 832:13390).</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-button-menu</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--spacing-24);">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Closed</span>
<div class="tds-button-menu">
  <button type="button" class="tds-btn tds-btn--md tds-btn--secondary">
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><circle cx="5.5" cy="6.5" r=".75" fill="currentColor"/><circle cx="10.5" cy="6.5" r=".75" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke-linecap="round"/></svg></span>
    Button
  </button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Open · secondary</span>
<div class="tds-button-menu">
  <button type="button" class="tds-btn tds-btn--md tds-btn--secondary">
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><circle cx="5.5" cy="6.5" r=".75" fill="currentColor"/><circle cx="10.5" cy="6.5" r=".75" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke-linecap="round"/></svg></span>
    Button
  </button>
  <div class="tds-dropdown-panel" role="menu">
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Action list item</span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Action list item</span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Action list item</span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Action list item</span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Action list item</span></button>
  </div>
</div></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Sort &amp; filter buttons</h3>
          <p class="ds-showcase__desc">Toolbar controls with leading icons and sort/filter dropdown panels (Figma 836:12519 · 836:13511). Filter selected state shows the active value with a clear icon; multi-select adds a +N counter badge.</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-sort-button · .tds-filter-button · .tds-filter-button--{selected|multi|open}</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid ds-state-grid--dropdown-specimens">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Sort · default</span>
<div class="tds-sort-button">
  <button type="button" class="tds-btn tds-btn--md tds-btn--secondary">
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none"><path d="M8.8916 5.61523C8.67676 5.80859 8.35449 5.80859 8.16113 5.61523C7.94629 5.42188 7.94629 5.07812 8.16113 4.88477L10.3955 2.65039C10.5889 2.45703 10.9111 2.45703 11.1045 2.65039L13.3389 4.88477C13.5537 5.07812 13.5537 5.42188 13.3389 5.61523C13.1455 5.80859 12.8232 5.80859 12.6299 5.61523L11.2764 4.26172V12.9844C11.2764 13.2637 11.04 13.5 10.7607 13.5C10.46 13.5 10.2451 13.2637 10.2451 12.9844V4.26172L8.8916 5.61523ZM3.3916 10.3848L4.74512 11.7383V3.01562C4.74512 2.73633 4.95996 2.5 5.26074 2.5C5.54004 2.5 5.77637 2.73633 5.77637 3.01562V11.7383L7.12988 10.3848C7.32324 10.1914 7.64551 10.1914 7.83887 10.3848C8.05371 10.5781 8.05371 10.9219 7.83887 11.1152L5.60449 13.3496C5.41113 13.543 5.08887 13.543 4.89551 13.3496L2.66113 11.1152C2.44629 10.9219 2.44629 10.5781 2.66113 10.3848C2.85449 10.1914 3.17676 10.1914 3.37012 10.3848H3.3916Z" fill="currentColor"/></svg></span>
    <span class="tds-sort-button__trigger-default">Sort</span>
  </button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Sort · open</span>
<div class="tds-sort-button">
  <button type="button" class="tds-btn tds-btn--md tds-btn--secondary">
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none"><path d="M8.8916 5.61523C8.67676 5.80859 8.35449 5.80859 8.16113 5.61523C7.94629 5.42188 7.94629 5.07812 8.16113 4.88477L10.3955 2.65039C10.5889 2.45703 10.9111 2.45703 11.1045 2.65039L13.3389 4.88477C13.5537 5.07812 13.5537 5.42188 13.3389 5.61523C13.1455 5.80859 12.8232 5.80859 12.6299 5.61523L11.2764 4.26172V12.9844C11.2764 13.2637 11.04 13.5 10.7607 13.5C10.46 13.5 10.2451 13.2637 10.2451 12.9844V4.26172L8.8916 5.61523ZM3.3916 10.3848L4.74512 11.7383V3.01562C4.74512 2.73633 4.95996 2.5 5.26074 2.5C5.54004 2.5 5.77637 2.73633 5.77637 3.01562V11.7383L7.12988 10.3848C7.32324 10.1914 7.64551 10.1914 7.83887 10.3848C8.05371 10.5781 8.05371 10.9219 7.83887 11.1152L5.60449 13.3496C5.41113 13.543 5.08887 13.543 4.89551 13.3496L2.66113 11.1152C2.44629 10.9219 2.44629 10.5781 2.66113 10.3848C2.85449 10.1914 3.17676 10.1914 3.37012 10.3848H3.3916Z" fill="currentColor"/></svg></span>
    <span class="tds-sort-button__trigger-default">Sort</span>
  </button>
  <div class="tds-dropdown-panel" role="menu">
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Name A → Z</span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Name Z → A</span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Date (Newest)</span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Date (Oldest)</span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Risk level</span></button>
  </div>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Sort · selected</span>
<div class="tds-sort-button tds-sort-button--selected">
  <button type="button" class="tds-btn tds-btn--md tds-btn--secondary">
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none"><path d="M8.8916 5.61523C8.67676 5.80859 8.35449 5.80859 8.16113 5.61523C7.94629 5.42188 7.94629 5.07812 8.16113 4.88477L10.3955 2.65039C10.5889 2.45703 10.9111 2.45703 11.1045 2.65039L13.3389 4.88477C13.5537 5.07812 13.5537 5.42188 13.3389 5.61523C13.1455 5.80859 12.8232 5.80859 12.6299 5.61523L11.2764 4.26172V12.9844C11.2764 13.2637 11.04 13.5 10.7607 13.5C10.46 13.5 10.2451 13.2637 10.2451 12.9844V4.26172L8.8916 5.61523ZM3.3916 10.3848L4.74512 11.7383V3.01562C4.74512 2.73633 4.95996 2.5 5.26074 2.5C5.54004 2.5 5.77637 2.73633 5.77637 3.01562V11.7383L7.12988 10.3848C7.32324 10.1914 7.64551 10.1914 7.83887 10.3848C8.05371 10.5781 8.05371 10.9219 7.83887 11.1152L5.60449 13.3496C5.41113 13.543 5.08887 13.543 4.89551 13.3496L2.66113 11.1152C2.44629 10.9219 2.44629 10.5781 2.66113 10.3848C2.85449 10.1914 3.17676 10.1914 3.37012 10.3848H3.3916Z" fill="currentColor"/></svg></span>
    <span class="tds-sort-button__trigger-default">Sort</span>
    <span class="tds-sort-button__trigger-label"><span class="tds-sort-button__trigger-prefix">Sort:</span><span class="tds-sort-button__trigger-value">Name A → Z</span></span>
    <span class="tds-btn__trailing-icon tds-sort-button__clear" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg></span>
  </button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Sort · selected · open</span>
<div class="tds-sort-button tds-sort-button--selected">
  <button type="button" class="tds-btn tds-btn--md tds-btn--secondary">
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none"><path d="M8.8916 5.61523C8.67676 5.80859 8.35449 5.80859 8.16113 5.61523C7.94629 5.42188 7.94629 5.07812 8.16113 4.88477L10.3955 2.65039C10.5889 2.45703 10.9111 2.45703 11.1045 2.65039L13.3389 4.88477C13.5537 5.07812 13.5537 5.42188 13.3389 5.61523C13.1455 5.80859 12.8232 5.80859 12.6299 5.61523L11.2764 4.26172V12.9844C11.2764 13.2637 11.04 13.5 10.7607 13.5C10.46 13.5 10.2451 13.2637 10.2451 12.9844V4.26172L8.8916 5.61523ZM3.3916 10.3848L4.74512 11.7383V3.01562C4.74512 2.73633 4.95996 2.5 5.26074 2.5C5.54004 2.5 5.77637 2.73633 5.77637 3.01562V11.7383L7.12988 10.3848C7.32324 10.1914 7.64551 10.1914 7.83887 10.3848C8.05371 10.5781 8.05371 10.9219 7.83887 11.1152L5.60449 13.3496C5.41113 13.543 5.08887 13.543 4.89551 13.3496L2.66113 11.1152C2.44629 10.9219 2.44629 10.5781 2.66113 10.3848C2.85449 10.1914 3.17676 10.1914 3.37012 10.3848H3.3916Z" fill="currentColor"/></svg></span>
    <span class="tds-sort-button__trigger-default">Sort</span>
    <span class="tds-sort-button__trigger-label"><span class="tds-sort-button__trigger-prefix">Sort:</span><span class="tds-sort-button__trigger-value">Name A → Z</span></span>
    <span class="tds-btn__trailing-icon tds-sort-button__clear" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg></span>
  </button>
  <div class="tds-dropdown-panel" role="menu">
    <button type="button" class="tds-action-list-item tds-action-list-item--selected" role="menuitem"><span class="tds-action-list-item__label">Name A → Z</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Name Z → A</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Date (Newest)</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Date (Oldest)</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Risk level</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
  </div>
</div></div>
      </div>
      <div class="spacer--md"></div>
<div class="ds-state-grid ds-state-grid--dropdown-specimens">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Filter · default</span>
<div class="tds-filter-button">
  <button type="button" class="tds-btn tds-btn--md tds-btn--secondary">
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2.5 4h11M4.5 8h7M6.5 12h3"/></svg></span>
    <span class="tds-filter-button__trigger-default">Filter</span>
    <span class="tds-filter-button__trigger-value">Verified</span>
  </button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Filter · open</span>
<div class="tds-filter-button tds-filter-button--open">
  <button type="button" class="tds-btn tds-btn--md tds-btn--secondary">
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2.5 4h11M4.5 8h7M6.5 12h3"/></svg></span>
    <span class="tds-filter-button__trigger-default">Filter</span>
    <span class="tds-filter-button__trigger-value">Verified</span>
  </button>
  <div class="tds-dropdown-panel" role="menu">
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">All statuses</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Verified</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Pending</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Failed</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Flagged</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
  </div>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Filter · selected</span>
<div class="tds-filter-button tds-filter-button--selected">
  <button type="button" class="tds-btn tds-btn--md tds-btn--secondary">
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2.5 4h11M4.5 8h7M6.5 12h3"/></svg></span>
    <span class="tds-filter-button__trigger-default">Filter</span>
    <span class="tds-filter-button__trigger-value">Verified</span>
    <span class="tds-btn__trailing-icon tds-filter-button__clear" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg></span>
  </button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Filter · selected · open</span>
<div class="tds-filter-button tds-filter-button--selected tds-filter-button--open">
  <button type="button" class="tds-btn tds-btn--md tds-btn--secondary">
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2.5 4h11M4.5 8h7M6.5 12h3"/></svg></span>
    <span class="tds-filter-button__trigger-default">Filter</span>
    <span class="tds-filter-button__trigger-value">Verified</span>
    <span class="tds-btn__trailing-icon tds-filter-button__clear" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg></span>
  </button>
  <div class="tds-dropdown-panel" role="menu">
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">All statuses</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
    <button type="button" class="tds-action-list-item tds-action-list-item--selected" role="menuitem" aria-checked="true"><span class="tds-action-list-item__label">Verified</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Pending</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Failed</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Flagged</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
  </div>
</div></div>
      </div>
      <div class="spacer--md"></div>
<div class="ds-state-grid ds-state-grid--dropdown-specimens">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Filter · multi</span>
<div class="tds-filter-button tds-filter-button--selected tds-filter-button--multi">
  <button type="button" class="tds-btn tds-btn--md tds-btn--secondary">
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2.5 4h11M4.5 8h7M6.5 12h3"/></svg></span>
    <span class="tds-filter-button__trigger-default">Filter</span>
    <span class="tds-filter-button__trigger-value">Verified</span>
    <span class="tds-counter tds-counter--primary tds-counter--sm tds-filter-button__counter">+1</span>
    <span class="tds-btn__trailing-icon tds-filter-button__clear" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg></span>
  </button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Filter · multi · open</span>
<div class="tds-filter-button tds-filter-button--selected tds-filter-button--multi tds-filter-button--open">
  <button type="button" class="tds-btn tds-btn--md tds-btn--secondary">
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2.5 4h11M4.5 8h7M6.5 12h3"/></svg></span>
    <span class="tds-filter-button__trigger-default">Filter</span>
    <span class="tds-filter-button__trigger-value">Verified</span>
    <span class="tds-counter tds-counter--primary tds-counter--sm tds-filter-button__counter">+1</span>
    <span class="tds-btn__trailing-icon tds-filter-button__clear" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg></span>
  </button>
  <div class="tds-dropdown-panel" role="menu">
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">All statuses</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
    <button type="button" class="tds-action-list-item tds-action-list-item--selected" role="menuitem" aria-checked="true"><span class="tds-action-list-item__label">Verified</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
    <button type="button" class="tds-action-list-item tds-action-list-item--selected" role="menuitem" aria-checked="true"><span class="tds-action-list-item__label">Pending</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Failed</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
    <button type="button" class="tds-action-list-item" role="menuitem"><span class="tds-action-list-item__label">Flagged</span><span class="tds-action-list-item__trailing-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span></button>
  </div>
</div></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Icon button</h3>
          <p class="ds-showcase__desc">Compact icon-only actions for toolbars, tables, and inline controls. Always pair with <code>aria-label</code>: there is no visible text label.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-icon-btn--{secondary|primary|danger|invisible} · .tds-icon-btn--{sm|md|lg} · .tds-icon-btn--circular</code>
            <span class="ds-tag">Figma 1371:22653</span>
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row">
        <button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--secondary" aria-label="Secondary action"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button>
        <button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--primary" aria-label="Primary action"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button>
        <button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--danger" aria-label="Danger action"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button>
        <button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--invisible" aria-label="Invisible action"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button>
      </div>
      <div class="spacer--sm"></div>
      <div class="row">
        <button type="button" class="tds-icon-btn tds-icon-btn--sm tds-icon-btn--secondary" aria-label="Small"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button>
        <button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--secondary" aria-label="Medium"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button>
        <button type="button" class="tds-icon-btn tds-icon-btn--lg tds-icon-btn--secondary" aria-label="Large"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button>
        <button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--secondary tds-icon-btn--circular" aria-label="Circular"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Icon button states</h3>
          <p class="ds-showcase__desc">Disabled blocks interaction. Inactive shows a muted selected state. Loading swaps the icon for <code>.tds-spinner--xs</code> and sets <code>aria-busy</code>.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-icon-btn--focus · .tds-icon-btn--inactive · .tds-icon-btn--loading · .tds-spinner--xs</code>
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="ds-matrix ds-matrix--5col">
  <span class="ds-matrix__corner"></span>
  <span class="ds-matrix__colhead">Default</span>
  <span class="ds-matrix__colhead">Focused</span>
  <span class="ds-matrix__colhead">Disabled</span>
  <span class="ds-matrix__colhead">Inactive</span>
  <span class="ds-matrix__colhead">Loading</span>

  <span class="ds-matrix__rowhead">Primary</span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--primary" aria-label="Primary default"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button></span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--primary tds-icon-btn--focus" aria-label="Primary focused"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button></span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--primary" disabled aria-label="Primary disabled"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button></span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--primary tds-icon-btn--inactive" aria-label="Primary inactive"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button></span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--primary tds-icon-btn--loading" aria-busy="true" aria-label="Primary loading"><span class="tds-spinner tds-spinner--xs" aria-hidden="true"></span></button></span>

  <span class="ds-matrix__rowhead">Secondary</span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--secondary" aria-label="Secondary default"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button></span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--secondary tds-icon-btn--focus" aria-label="Secondary focused"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button></span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--secondary" disabled aria-label="Secondary disabled"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button></span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--secondary tds-icon-btn--inactive" aria-label="Secondary inactive"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button></span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--secondary tds-icon-btn--loading" aria-busy="true" aria-label="Secondary loading"><span class="tds-spinner tds-spinner--xs" aria-hidden="true"></span></button></span>

  <span class="ds-matrix__rowhead">Danger</span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--danger" aria-label="Danger"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button></span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--danger tds-icon-btn--focus" aria-label="Danger focused"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button></span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--danger" disabled aria-label="Danger disabled"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button></span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--danger tds-icon-btn--inactive" aria-label="Danger inactive"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button></span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--danger tds-icon-btn--loading" aria-busy="true" aria-label="Danger loading"><span class="tds-spinner tds-spinner--xs" aria-hidden="true"></span></button></span>

  <span class="ds-matrix__rowhead">Invisible</span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--invisible" aria-label="Invisible"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button></span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--invisible tds-icon-btn--focus" aria-label="Invisible focused"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button></span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--invisible" disabled aria-label="Invisible disabled"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button></span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--invisible tds-icon-btn--inactive" aria-label="Invisible inactive"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span></button></span>
  <span class="ds-matrix__cell"><button type="button" class="tds-icon-btn tds-icon-btn--md tds-icon-btn--invisible tds-icon-btn--loading" aria-busy="true" aria-label="Invisible loading"><span class="tds-spinner tds-spinner--xs" aria-hidden="true"></span></button></span>
</div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Dismiss actions</h3>
          <p class="ds-showcase__desc">Icon-only close buttons for modals, drawers, and dismissible panels.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-dismiss--{sm|md|lg}</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row">
        <button class="tds-dismiss tds-dismiss--sm" aria-label="Close">
          <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>
        </button>
        <button class="tds-dismiss tds-dismiss--md" aria-label="Close">
          <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>
        </button>
        <button class="tds-dismiss tds-dismiss--lg" aria-label="Close">
          <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>
        </button>
        <button class="tds-dismiss tds-dismiss--md" disabled aria-label="Close disabled">
          <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>
        </button>
        <button class="tds-dismiss tds-dismiss--md tds-dismiss--selected" aria-label="Selected">
          <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>
        </button>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Dismiss issue badge</h3>
          <p class="ds-showcase__desc">Inline close affordance on tags and compact badges: black on light surfaces, white on dark.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-dismiss-badge--{sm|md|lg}</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row" style="background: var(--surface-neutral-03); padding: 12px; border-radius: 8px;">
        <button class="tds-dismiss-badge tds-dismiss-badge--sm tds-dismiss-badge--black" aria-label="Close">
          <svg style="width:8px;height:8px" viewBox="0 0 8 8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 1l6 6M7 1l-6 6"/></svg>
        </button>
        <button class="tds-dismiss-badge tds-dismiss-badge--md tds-dismiss-badge--black" aria-label="Close">
          <svg style="width:10px;height:10px" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 1l8 8M9 1l-8 8"/></svg>
        </button>
        <button class="tds-dismiss-badge tds-dismiss-badge--lg tds-dismiss-badge--black" aria-label="Close">
          <svg style="width:12px;height:12px" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 1l10 10M11 1l-10 10"/></svg>
        </button>
      </div>
      <div class="spacer--sm"></div>
      <div class="row" style="background: var(--surface-inverse); padding: 12px; border-radius: 8px;">
        <button class="tds-dismiss-badge tds-dismiss-badge--sm tds-dismiss-badge--white" aria-label="Close">
          <svg style="width:8px;height:8px" viewBox="0 0 8 8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 1l6 6M7 1l-6 6"/></svg>
        </button>
        <button class="tds-dismiss-badge tds-dismiss-badge--md tds-dismiss-badge--white" aria-label="Close">
          <svg style="width:10px;height:10px" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 1l8 8M9 1l-8 8"/></svg>
        </button>
        <button class="tds-dismiss-badge tds-dismiss-badge--lg tds-dismiss-badge--white" aria-label="Close">
          <svg style="width:12px;height:12px" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 1l10 10M11 1l-10 10"/></svg>
        </button>
      </div>
        </div>
      </article>

      </article>
    </section>`},{id:"inputs",title:"Inputs",desc:"Collect and validate business data. Pair labels with fields, surface errors inline, and prefer large fields for high-stakes KYB forms.",html:`<section class="ds-chapter ds-tab-panel">
      <header class="ds-chapter__header">
        <h2 class="ds-chapter__title">Inputs</h2>
        <p class="ds-chapter__desc">Collect and validate business data. Pair labels with fields, surface errors inline, and prefer large fields for high-stakes KYB forms.</p>
      </header>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Text input sizes</h3>
          <p class="ds-showcase__desc">Three field heights. Form labels inside inputs use label/sm (12px medium).</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-text-input__field--{sm|md|lg}</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="grid-3">
        <div class="tds-text-input">
          <label class="tds-field-label">Label text</label>
          <div class="tds-text-input__field tds-text-input__field--sm">
            <input class="tds-text-input__native" type="text" placeholder="Placeholder">
          </div>
        </div>
        <div class="tds-text-input">
          <label class="tds-field-label">Label text</label>
          <div class="tds-text-input__field tds-text-input__field--md">
            <input class="tds-text-input__native" type="text" placeholder="Placeholder">
          </div>
        </div>
        <div class="tds-text-input">
          <label class="tds-field-label">Label text</label>
          <div class="tds-text-input__field tds-text-input__field--lg">
            <input class="tds-text-input__native" type="text" placeholder="Placeholder">
          </div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">States</h3>
          <p class="ds-showcase__desc">Rest, focus, filled, validation, disabled, and read-only at large (40px) field height. Caption can appear alongside validation when both helper text and an error apply.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-text-input__field--lg · --invalid · --success</code>
            <span class="ds-tag">Recommended</span>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid">
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Default</span>
          <div class="tds-text-input">
          <label class="tds-field-label">Label text</label>
          <div class="tds-text-input__field tds-text-input__field--lg">
            <input class="tds-text-input__native" type="text" placeholder="Placeholder">
          </div>
        </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Focused</span>
          <div class="tds-text-input">
          <label class="tds-field-label">Label text</label>
          <div class="tds-text-input__field tds-text-input__field--lg tds-text-input__field--focus">
            <input class="tds-text-input__native" type="text" placeholder="Placeholder">
          </div>
        </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Filled</span>
          <div class="tds-text-input">
          <label class="tds-field-label">Label text</label>
          <div class="tds-text-input__field tds-text-input__field--lg">
            <input class="tds-text-input__native" type="text" value="Value">
          </div>
        </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Invalid</span>
          <div class="tds-text-input tds-text-input--invalid">
          <label class="tds-field-label">Label text</label>
          <div class="tds-text-input__field tds-text-input__field--lg">
            <input class="tds-text-input__native" type="text" placeholder="Placeholder">
          </div>
          <span class="tds-field-validation tds-field-validation--error">
            <span class="tds-field-validation__icon" aria-hidden="true"><svg viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 11.375C2.4707 11.375 0 8.9043 0 5.875C0 2.8457 2.4707 0.375 5.5 0.375C8.5293 0.375 11 2.8457 11 5.875C11 8.9043 8.5293 11.375 5.5 11.375ZM5.5 1.40625C3.0293 1.40625 1.03125 3.4043 1.03125 5.875C1.03125 8.3457 3.0293 10.3438 5.5 10.3438C7.9707 10.3438 9.96875 8.3457 9.96875 5.875C9.96875 3.4043 7.9707 1.40625 5.5 1.40625ZM5.5 8.625C5.11328 8.625 4.8125 8.32422 4.8125 7.9375C4.8125 7.55078 5.11328 7.25 5.5 7.25C5.88672 7.25 6.1875 7.55078 6.1875 7.9375C6.1875 8.32422 5.88672 8.625 5.5 8.625ZM5.5 3.125C5.88672 3.125 6.20898 3.46875 6.16602 3.85547L6.01562 6.08984C5.99414 6.34766 5.7793 6.5625 5.5 6.5625C5.24219 6.5625 5.00586 6.34766 4.98438 6.08984L4.83398 3.85547C4.79102 3.46875 5.11328 3.125 5.5 3.125Z" fill="currentColor"/></svg></span>
            Validation message
          </span>
        </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Invalid + caption</span>
          <div class="tds-text-input tds-text-input--invalid">
          <label class="tds-field-label">Label text</label>
          <div class="tds-text-input__field tds-text-input__field--lg">
            <input class="tds-text-input__native" type="text" placeholder="Placeholder" aria-invalid="true" aria-describedby="text-input-invalid-error text-input-invalid-caption">
          </div>
          <div class="tds-text-input__footer">
          <span class="tds-field-validation tds-field-validation--error" id="text-input-invalid-error">
            <span class="tds-field-validation__icon" aria-hidden="true"><svg viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 11.375C2.4707 11.375 0 8.9043 0 5.875C0 2.8457 2.4707 0.375 5.5 0.375C8.5293 0.375 11 2.8457 11 5.875C11 8.9043 8.5293 11.375 5.5 11.375ZM5.5 1.40625C3.0293 1.40625 1.03125 3.4043 1.03125 5.875C1.03125 8.3457 3.0293 10.3438 5.5 10.3438C7.9707 10.3438 9.96875 8.3457 9.96875 5.875C9.96875 3.4043 7.9707 1.40625 5.5 1.40625ZM5.5 8.625C5.11328 8.625 4.8125 8.32422 4.8125 7.9375C4.8125 7.55078 5.11328 7.25 5.5 7.25C5.88672 7.25 6.1875 7.55078 6.1875 7.9375C6.1875 8.32422 5.88672 8.625 5.5 8.625ZM5.5 3.125C5.88672 3.125 6.20898 3.46875 6.16602 3.85547L6.01562 6.08984C5.99414 6.34766 5.7793 6.5625 5.5 6.5625C5.24219 6.5625 5.00586 6.34766 4.98438 6.08984L4.83398 3.85547C4.79102 3.46875 5.11328 3.125 5.5 3.125Z" fill="currentColor"/></svg></span>
            Validation message
          </span>
          <span class="tds-field-caption" id="text-input-invalid-caption">Caption text</span>
          </div>
        </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Success</span>
          <div class="tds-text-input tds-text-input--success">
          <label class="tds-field-label">Label text</label>
          <div class="tds-text-input__field tds-text-input__field--lg">
            <input class="tds-text-input__native" type="text" placeholder="Placeholder">
          </div>
          <span class="tds-field-validation tds-field-validation--success">
            <span class="tds-field-validation__icon" aria-hidden="true"><svg viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 11.375C2.4707 11.375 0 8.9043 0 5.875C0 2.8457 2.4707 0.375 5.5 0.375C8.5293 0.375 11 2.8457 11 5.875C11 8.9043 8.5293 11.375 5.5 11.375ZM5.5 1.40625C3.0293 1.40625 1.03125 3.4043 1.03125 5.875C1.03125 8.3457 3.0293 10.3438 5.5 10.3438C7.9707 10.3438 9.96875 8.3457 9.96875 5.875C9.96875 3.4043 7.9707 1.40625 5.5 1.40625ZM7.02539 4.02734C7.19727 3.79102 7.51953 3.74805 7.73438 3.91992C7.9707 4.07031 8.01367 4.39258 7.86328 4.62891L5.2207 8.23828C5.13477 8.36719 5.00586 8.43164 4.85547 8.45312C4.70508 8.45312 4.55469 8.41016 4.44727 8.30273L3.24414 7.09961C3.05078 6.90625 3.05078 6.58398 3.24414 6.36914C3.45898 6.17578 3.78125 6.17578 3.97461 6.36914L4.74805 7.14258L7.02539 4.02734Z" fill="currentColor"/></svg></span>
            Validation message
          </span>
        </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Disabled</span>
          <div class="tds-text-input tds-text-input--disabled">
          <label class="tds-field-label">Label text</label>
          <div class="tds-text-input__field tds-text-input__field--lg">
            <input class="tds-text-input__native" type="text" value="Disabled" disabled>
          </div>
        </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Read-only</span>
          <div class="tds-text-input tds-text-input--readonly">
          <label class="tds-field-label">Label text</label>
          <div class="tds-text-input__field tds-text-input__field--lg">
            <input class="tds-text-input__native" type="text" value="Value" readonly>
          </div>
        </div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Textarea</h3>
          <p class="ds-showcase__desc">Multi-line text field with resize grip, validation, caption, and disabled states (Figma 3358:26529).</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-textarea · .tds-textarea--{invalid|success|disabled|contrast}</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--spacing-24);">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Default</span>
<div class="tds-textarea" style="max-width: 280px;">
  <label class="tds-field-label">Label text</label>
  <div class="tds-textarea__field">
    <textarea class="tds-textarea__native" rows="3" placeholder="Placeholder"></textarea>
    <span class="tds-textarea__grip" aria-hidden="true"><svg viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 0.5 0.5 4.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/><path d="M4.5 2.5 2.5 4.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg></span>
  </div>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Filled</span>
<div class="tds-textarea" style="max-width: 280px;">
  <label class="tds-field-label">Label text</label>
  <div class="tds-textarea__field">
    <textarea class="tds-textarea__native" rows="3">Value</textarea>
    <span class="tds-textarea__grip" aria-hidden="true"><svg viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 0.5 0.5 4.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/><path d="M4.5 2.5 2.5 4.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg></span>
  </div>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Focused</span>
<div class="tds-textarea" style="max-width: 280px;">
  <label class="tds-field-label">Label text</label>
  <div class="tds-textarea__field tds-textarea__field--focus">
    <textarea class="tds-textarea__native" rows="3" placeholder="Placeholder"></textarea>
    <span class="tds-textarea__grip" aria-hidden="true"><svg viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 0.5 0.5 4.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/><path d="M4.5 2.5 2.5 4.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg></span>
  </div>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Disabled</span>
<div class="tds-textarea tds-textarea--disabled" style="max-width: 280px;">
  <label class="tds-field-label tds-field-label--disabled">Label text</label>
  <div class="tds-textarea__field">
    <textarea class="tds-textarea__native" rows="3" placeholder="Placeholder" disabled></textarea>
    <span class="tds-textarea__grip" aria-hidden="true"><svg viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 0.5 0.5 4.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/><path d="M4.5 2.5 2.5 4.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg></span>
  </div>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Error</span>
<div class="tds-textarea tds-textarea--invalid" style="max-width: 280px;">
  <label class="tds-field-label">Label text</label>
  <div class="tds-textarea__field">
    <textarea class="tds-textarea__native" rows="3" placeholder="Placeholder" aria-invalid="true" aria-describedby="textarea-error-msg"></textarea>
    <span class="tds-textarea__grip" aria-hidden="true"><svg viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 0.5 0.5 4.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/><path d="M4.5 2.5 2.5 4.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg></span>
  </div>
  <div class="tds-textarea__footer">
    <span class="tds-field-validation tds-field-validation--error" id="textarea-error-msg">
      <span class="tds-field-validation__icon" aria-hidden="true"><svg viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 11.375C2.4707 11.375 0 8.9043 0 5.875C0 2.8457 2.4707 0.375 5.5 0.375C8.5293 0.375 11 2.8457 11 5.875C11 8.9043 8.5293 11.375 5.5 11.375ZM5.5 1.40625C3.0293 1.40625 1.03125 3.4043 1.03125 5.875C1.03125 8.3457 3.0293 10.3438 5.5 10.3438C7.9707 10.3438 9.96875 8.3457 9.96875 5.875C9.96875 3.4043 7.9707 1.40625 5.5 1.40625ZM5.5 8.625C5.11328 8.625 4.8125 8.32422 4.8125 7.9375C4.8125 7.55078 5.11328 7.25 5.5 7.25C5.88672 7.25 6.1875 7.55078 6.1875 7.9375C6.1875 8.32422 5.88672 8.625 5.5 8.625ZM5.5 3.125C5.88672 3.125 6.20898 3.46875 6.16602 3.85547L6.01562 6.08984C5.99414 6.34766 5.7793 6.5625 5.5 6.5625C5.24219 6.5625 5.00586 6.34766 4.98438 6.08984L4.83398 3.85547C4.79102 3.46875 5.11328 3.125 5.5 3.125Z" fill="currentColor"/></svg></span>
      Validation message
    </span>
  </div>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Success</span>
<div class="tds-textarea tds-textarea--success" style="max-width: 280px;">
  <label class="tds-field-label">Label text</label>
  <div class="tds-textarea__field">
    <textarea class="tds-textarea__native" rows="3">Value</textarea>
    <span class="tds-textarea__grip" aria-hidden="true"><svg viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 0.5 0.5 4.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/><path d="M4.5 2.5 2.5 4.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg></span>
  </div>
  <div class="tds-textarea__footer">
    <span class="tds-field-validation tds-field-validation--success">
      <span class="tds-field-validation__icon" aria-hidden="true"><svg viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 11.375C2.4707 11.375 0 8.9043 0 5.875C0 2.8457 2.4707 0.375 5.5 0.375C8.5293 0.375 11 2.8457 11 5.875C11 8.9043 8.5293 11.375 5.5 11.375ZM7.89062 4.89062C8.15234 4.62891 8.15234 4.19141 7.89062 3.92969C7.62891 3.66797 7.19141 3.66797 6.92969 3.92969L4.8125 6.04688L3.94531 5.17969C3.68359 4.91797 3.24609 4.91797 2.98438 5.17969C2.72266 5.44141 2.72266 5.87891 2.98438 6.14062L4.35938 7.51562C4.62109 7.77734 5.05859 7.77734 5.32031 7.51562L7.89062 4.89062Z" fill="currentColor"/></svg></span>
      Validation message
    </span>
    <p class="tds-field-caption">Caption text</p>
  </div>
</div></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Inset variant</h3>
          <p class="ds-showcase__desc">Recessed surface with leadingVisual and trailingAction boolean slots from the component.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-text-input--inset · leadingVisual · trailingAction</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid">
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Leading icon</span>
          <div class="tds-text-input tds-text-input--inset">
          <label class="tds-field-label">Label text</label>
          <div class="tds-text-input__field">
            <span class="tds-text-input__leading-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>
            <input class="tds-text-input__native" type="text" placeholder="Placeholder">
          </div>
        </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Trailing action</span>
          <div class="tds-text-input tds-text-input--inset">
          <label class="tds-field-label">Label text</label>
          <div class="tds-text-input__field">
            <input class="tds-text-input__native" type="text" value="Value">
            <button type="button" class="tds-text-input__trailing-action" aria-label="Clear">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.25"/><path d="M6 6l4 4M10 6l-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>
            </button>
          </div>
        </div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Caption</h3>
          <p class="ds-showcase__desc">Helper text below the field: use for format hints, not validation errors.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-field-caption</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div style="max-width: 400px;">
        <div class="tds-text-input">
          <label class="tds-field-label">Label text</label>
          <div class="tds-text-input__field">
            <input class="tds-text-input__native" type="text" placeholder="Placeholder">
          </div>
          <span class="tds-field-caption">Caption text</span>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Select sizes</h3>
          <p class="ds-showcase__desc">Three trigger heights: small (28px), medium (32px), large (40px). Figma boolean props: size.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-select__trigger--{sm|md|lg}</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="grid-3">
        <div class="tds-select">
          <label class="tds-field-label">Label text</label>
          <div class="tds-select__trigger tds-select__trigger--sm" role="combobox" aria-expanded="false">
            <span class="tds-select__value tds-select__placeholder">Placeholder</span>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </div>
        </div>
        <div class="tds-select">
          <label class="tds-field-label">Label text</label>
          <div class="tds-select__trigger tds-select__trigger--md" role="combobox" aria-expanded="false">
            <span class="tds-select__value tds-select__placeholder">Placeholder</span>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </div>
        </div>
        <div class="tds-select">
          <label class="tds-field-label">Label text</label>
          <div class="tds-select__trigger tds-select__trigger--lg" role="combobox" aria-expanded="false">
            <span class="tds-select__value tds-select__placeholder">Placeholder</span>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Select states</h3>
          <p class="ds-showcase__desc">Rest, focus, filled, validation, and disabled at large size. Figma props: state · validation.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-select__trigger--lg · --focus · --invalid · --success · --disabled</code>
            <span class="ds-tag">Recommended</span>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid">
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Default</span>
          <div class="tds-select">
          <label class="tds-field-label">Label text</label>
          <div class="tds-select__trigger tds-select__trigger--lg" role="combobox" aria-expanded="false">
            <span class="tds-select__value tds-select__placeholder">Placeholder</span>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </div>
        </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Focused</span>
          <div class="tds-select">
          <label class="tds-field-label">Label text</label>
          <div class="tds-select__trigger tds-select__trigger--lg tds-select__trigger--focus" role="combobox" aria-expanded="false">
            <span class="tds-select__value tds-select__placeholder">Placeholder</span>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </div>
        </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Filled</span>
          <div class="tds-select">
          <label class="tds-field-label">Label text</label>
          <div class="tds-select__trigger tds-select__trigger--lg" role="combobox" aria-expanded="false">
            <span class="tds-select__value">Selected value</span>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </div>
        </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Invalid</span>
          <div class="tds-select tds-select--invalid">
          <label class="tds-field-label">Label text</label>
          <div class="tds-select__trigger tds-select__trigger--lg" role="combobox" aria-expanded="false" aria-invalid="true">
            <span class="tds-select__value">Selected value</span>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </div>
          <span class="tds-field-validation tds-field-validation--error">
            <span class="tds-field-validation__icon" aria-hidden="true"><svg viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 11.375C2.4707 11.375 0 8.9043 0 5.875C0 2.8457 2.4707 0.375 5.5 0.375C8.5293 0.375 11 2.8457 11 5.875C11 8.9043 8.5293 11.375 5.5 11.375ZM5.5 1.40625C3.0293 1.40625 1.03125 3.4043 1.03125 5.875C1.03125 8.3457 3.0293 10.3438 5.5 10.3438C7.9707 10.3438 9.96875 8.3457 9.96875 5.875C9.96875 3.4043 7.9707 1.40625 5.5 1.40625ZM5.5 8.625C5.11328 8.625 4.8125 8.32422 4.8125 7.9375C4.8125 7.55078 5.11328 7.25 5.5 7.25C5.88672 7.25 6.1875 7.55078 6.1875 7.9375C6.1875 8.32422 5.88672 8.625 5.5 8.625ZM5.5 3.125C5.88672 3.125 6.20898 3.46875 6.16602 3.85547L6.01562 6.08984C5.99414 6.34766 5.7793 6.5625 5.5 6.5625C5.24219 6.5625 5.00586 6.34766 4.98438 6.08984L4.83398 3.85547C4.79102 3.46875 5.11328 3.125 5.5 3.125Z" fill="currentColor"/></svg></span>
            Validation message
          </span>
        </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Invalid + caption</span>
          <div class="tds-select tds-select--invalid">
          <label class="tds-field-label">Label text</label>
          <div class="tds-select__trigger tds-select__trigger--lg" role="combobox" aria-expanded="false" aria-invalid="true" aria-describedby="select-invalid-error select-invalid-caption">
            <span class="tds-select__value">Selected value</span>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </div>
          <div class="tds-select__footer">
          <span class="tds-field-validation tds-field-validation--error" id="select-invalid-error">
            <span class="tds-field-validation__icon" aria-hidden="true"><svg viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 11.375C2.4707 11.375 0 8.9043 0 5.875C0 2.8457 2.4707 0.375 5.5 0.375C8.5293 0.375 11 2.8457 11 5.875C11 8.9043 8.5293 11.375 5.5 11.375ZM5.5 1.40625C3.0293 1.40625 1.03125 3.4043 1.03125 5.875C1.03125 8.3457 3.0293 10.3438 5.5 10.3438C7.9707 10.3438 9.96875 8.3457 9.96875 5.875C9.96875 3.4043 7.9707 1.40625 5.5 1.40625ZM5.5 8.625C5.11328 8.625 4.8125 8.32422 4.8125 7.9375C4.8125 7.55078 5.11328 7.25 5.5 7.25C5.88672 7.25 6.1875 7.55078 6.1875 7.9375C6.1875 8.32422 5.88672 8.625 5.5 8.625ZM5.5 3.125C5.88672 3.125 6.20898 3.46875 6.16602 3.85547L6.01562 6.08984C5.99414 6.34766 5.7793 6.5625 5.5 6.5625C5.24219 6.5625 5.00586 6.34766 4.98438 6.08984L4.83398 3.85547C4.79102 3.46875 5.11328 3.125 5.5 3.125Z" fill="currentColor"/></svg></span>
            Validation message
          </span>
          <span class="tds-field-caption" id="select-invalid-caption">Caption text</span>
          </div>
        </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Success</span>
          <div class="tds-select tds-select--success">
          <label class="tds-field-label">Label text</label>
          <div class="tds-select__trigger tds-select__trigger--lg" role="combobox" aria-expanded="false">
            <span class="tds-select__value">Selected value</span>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </div>
          <span class="tds-field-validation tds-field-validation--success">
            <span class="tds-field-validation__icon" aria-hidden="true"><svg viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 11.375C2.4707 11.375 0 8.9043 0 5.875C0 2.8457 2.4707 0.375 5.5 0.375C8.5293 0.375 11 2.8457 11 5.875C11 8.9043 8.5293 11.375 5.5 11.375ZM5.5 1.40625C3.0293 1.40625 1.03125 3.4043 1.03125 5.875C1.03125 8.3457 3.0293 10.3438 5.5 10.3438C7.9707 10.3438 9.96875 8.3457 9.96875 5.875C9.96875 3.4043 7.9707 1.40625 5.5 1.40625ZM7.02539 4.02734C7.19727 3.79102 7.51953 3.74805 7.73438 3.91992C7.9707 4.07031 8.01367 4.39258 7.86328 4.62891L5.2207 8.23828C5.13477 8.36719 5.00586 8.43164 4.85547 8.45312C4.70508 8.45312 4.55469 8.41016 4.44727 8.30273L3.24414 7.09961C3.05078 6.90625 3.05078 6.58398 3.24414 6.36914C3.45898 6.17578 3.78125 6.17578 3.97461 6.36914L4.74805 7.14258L7.02539 4.02734Z" fill="currentColor"/></svg></span>
            Validation message
          </span>
        </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Disabled</span>
          <div class="tds-select tds-select--disabled">
          <label class="tds-field-label tds-field-label--disabled">Label text</label>
          <div class="tds-select__trigger tds-select__trigger--lg" role="combobox" aria-expanded="false" aria-disabled="true">
            <span class="tds-select__value">Selected value</span>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </div>
        </div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Select properties</h3>
          <p class="ds-showcase__desc">Figma boolean slots at large (40px): icon, countryFlag, tag, subtext, caption, fullWidth.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-select__trigger--lg · icon · countryFlag · tag · subtext · caption · fullWidth</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid">
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Icon</span>
          <div class="tds-select">
          <label class="tds-field-label">Label text</label>
          <div class="tds-select__trigger tds-select__trigger--lg" role="combobox" aria-expanded="false">
            <span class="tds-select__leading-visual" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.25"/><circle cx="6" cy="6.5" r="0.75" fill="currentColor"/><circle cx="10" cy="6.5" r="0.75" fill="currentColor"/><path d="M5.5 10c.75 1.1 1.75 1.6 2.5 1.6s1.75-.5 2.5-1.6" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg></span>
            <span class="tds-select__value">Selected value</span>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </div>
        </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Country flag</span>
          <div class="tds-select">
          <label class="tds-field-label">Label text</label>
          <div class="tds-select__trigger tds-select__trigger--lg" role="combobox" aria-expanded="false">
            <span class="tds-select__country-flag" aria-hidden="true"><span class="fi fi-ca"></span></span>
            <span class="tds-select__value">Canada</span>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </div>
        </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Tag</span>
          <div class="tds-select">
          <label class="tds-field-label">Label text</label>
          <div class="tds-select__trigger tds-select__trigger--lg" role="combobox" aria-expanded="false">
            <span class="tds-select__value">Selected value</span>
            <div class="tds-select__trailing-group">
              <span class="tds-tag tds-tag--sm">Label</span>
              <span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span>
            </div>
          </div>
        </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Subtext</span>
          <div class="tds-select">
          <label class="tds-field-label">Label text</label>
          <div class="tds-select__trigger tds-select__trigger--lg" role="combobox" aria-expanded="false">
            <div class="tds-select__text-wrapper">
              <span class="tds-select__value">Selected value</span>
              <span class="tds-select__subtext">Subtext</span>
            </div>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </div>
        </div>
        </div>
        <div class="ds-state-demo" style="grid-column: 1 / -1;">
          <span class="ds-state-demo__label">Caption · Full width</span>
          <div class="tds-select tds-select--full-width">
          <label class="tds-field-label">Label text</label>
          <div class="tds-select__trigger tds-select__trigger--lg" role="combobox" aria-expanded="false">
            <span class="tds-select__leading-visual" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.25"/><circle cx="6" cy="6.5" r="0.75" fill="currentColor"/><circle cx="10" cy="6.5" r="0.75" fill="currentColor"/><path d="M5.5 10c.75 1.1 1.75 1.6 2.5 1.6s1.75-.5 2.5-1.6" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg></span>
            <span class="tds-select__country-flag" aria-hidden="true"><span class="fi fi-ca"></span></span>
            <div class="tds-select__text-wrapper">
              <span class="tds-select__value">Selected value</span>
              <span class="tds-select__subtext">Subtext</span>
            </div>
            <div class="tds-select__trailing-group">
              <span class="tds-tag tds-tag--sm">Label</span>
              <span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span>
            </div>
          </div>
          <span class="tds-field-caption">Caption text</span>
        </div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Select with menu</h3>
          <p class="ds-showcase__desc">Click a field to open DropdownPanel (320:21652). Five variants: text, multiSelect, icon, flag, and recommended tag on menu items.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-select--interactive · .tds-select__menu · menuType</code>
            <span class="ds-tag">Interactive</span>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid ds-showcase__canvas--menu">
<div class="grid-2">
        <!-- menuType=text -->
        <div class="tds-select tds-select--interactive" data-menu-type="text">
          <label class="tds-field-label" id="select-province-label">Province</label>
          <button type="button" class="tds-select__trigger tds-select__trigger--lg" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="select-province-label">
            <span class="tds-select__value tds-select__placeholder" data-placeholder="Select province">Select province</span>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </button>
          <div class="tds-select__menu" role="listbox" hidden>
            <div class="tds-dropdown-panel">
              <div class="tds-action-list-item" role="option" data-value="Ontario"><span class="tds-action-list-item__label">Ontario</span></div>
              <div class="tds-action-list-item" role="option" data-value="British Columbia"><span class="tds-action-list-item__label">British Columbia</span></div>
              <div class="tds-action-list-item" role="option" data-value="Alberta"><span class="tds-action-list-item__label">Alberta</span></div>
              <div class="tds-action-list-item" role="option" data-value="Quebec"><span class="tds-action-list-item__label">Quebec</span></div>
              <div class="tds-action-list-item" role="option" data-value="Manitoba"><span class="tds-action-list-item__label">Manitoba</span></div>
            </div>
          </div>
        </div>

        <!-- menuType=multiSelect -->
        <div class="tds-select tds-select--interactive" data-menu-type="multiSelect">
          <label class="tds-field-label" id="select-status-label">Status</label>
          <button type="button" class="tds-select__trigger tds-select__trigger--lg" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="select-status-label">
            <span class="tds-select__value tds-select__placeholder" data-placeholder="Select status">Select status</span>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </button>
          <div class="tds-select__menu" role="listbox" aria-multiselectable="true" hidden>
            <div class="tds-dropdown-panel">
              <button type="button" class="tds-dropdown-panel__header-link">Clear all</button>
              <label class="tds-action-list-item"><input type="checkbox" class="tds-checkbox" value="Active"><span class="tds-action-list-item__label">Active</span></label>
              <label class="tds-action-list-item"><input type="checkbox" class="tds-checkbox" value="Pending"><span class="tds-action-list-item__label">Pending</span></label>
              <label class="tds-action-list-item"><input type="checkbox" class="tds-checkbox" value="Suspended"><span class="tds-action-list-item__label">Suspended</span></label>
              <label class="tds-action-list-item"><input type="checkbox" class="tds-checkbox" value="Closed"><span class="tds-action-list-item__label">Closed</span></label>
              <label class="tds-action-list-item"><input type="checkbox" class="tds-checkbox" value="Under review"><span class="tds-action-list-item__label">Under review</span></label>
            </div>
          </div>
        </div>

        <!-- menuType=icon -->
        <div class="tds-select tds-select--interactive" data-menu-type="icon">
          <label class="tds-field-label" id="select-verification-label">Verification type</label>
          <button type="button" class="tds-select__trigger tds-select__trigger--lg" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="select-verification-label">
            <span class="tds-select__value tds-select__placeholder" data-placeholder="Select type">Select type</span>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </button>
          <div class="tds-select__menu" role="listbox" hidden>
            <div class="tds-dropdown-panel">
              <div class="tds-action-list-item" role="option" data-value="Business verification">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="12" height="10" rx="1" stroke="currentColor" stroke-width="1.25"/><path d="M5 4V3a3 3 0 016 0v1" stroke="currentColor" stroke-width="1.25"/></svg></span>
                <span class="tds-action-list-item__label">Business verification</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="Identity check">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" stroke-width="1.25"/><path d="M3 13.5c0-2.5 2.2-4 5-4s5 1.5 5 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
                <span class="tds-action-list-item__label">Identity check</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="Document review">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 2h6l3 3v9a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.25"/><path d="M10 2v3h3M6 8h4M6 11h4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
                <span class="tds-action-list-item__label">Document review</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="AML screening">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.25"/><path d="M8 5v4M8 11h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>
                <span class="tds-action-list-item__label">AML screening</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="Ongoing monitoring">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.25"/><path d="M8 4.5V8l2.5 1.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
                <span class="tds-action-list-item__label">Ongoing monitoring</span>
              </div>
            </div>
          </div>
        </div>

        <!-- menuType=flag -->
        <div class="tds-select tds-select--interactive" data-menu-type="flag">
          <label class="tds-field-label" id="select-country-label">Country</label>
          <button type="button" class="tds-select__trigger tds-select__trigger--lg" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="select-country-label">
            <span class="tds-select__value tds-select__placeholder" data-placeholder="Select country">Select country</span>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </button>
          <div class="tds-select__menu" role="listbox" hidden>
            <div class="tds-dropdown-panel">
              <div class="tds-action-list-item" role="option" data-value="Canada">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><span class="fi fi-ca"></span></span>
                <span class="tds-action-list-item__label">Canada</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="United States">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><span class="fi fi-us"></span></span>
                <span class="tds-action-list-item__label">United States</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="United Kingdom">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><span class="fi fi-gb"></span></span>
                <span class="tds-action-list-item__label">United Kingdom</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="France">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><span class="fi fi-fr"></span></span>
                <span class="tds-action-list-item__label">France</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="Germany">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><span class="fi fi-de"></span></span>
                <span class="tds-action-list-item__label">Germany</span>
              </div>
            </div>
          </div>
        </div>

        <!-- menuType=recommended -->
        <div class="tds-select tds-select--interactive" data-menu-type="recommended">
          <label class="tds-field-label" id="select-package-label">Verification package</label>
          <button type="button" class="tds-select__trigger tds-select__trigger--lg" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="select-package-label">
            <span class="tds-select__value tds-select__placeholder" data-placeholder="Select package">Select package</span>
            <div class="tds-select__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true"><svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z" fill="currentColor"/><path d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z" fill="currentColor"/></svg></span></div>
          </button>
          <div class="tds-select__menu" role="listbox" hidden>
            <div class="tds-dropdown-panel">
              <div class="tds-action-list-item" role="option" data-value="Essentials">
                <span class="tds-action-list-item__label">Essentials</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="Standard KYB">
                <span class="tds-action-list-item__label">Standard KYB</span>
                <span class="tds-action-list-item__trailing-visual" aria-hidden="true">
                  <span class="tds-tag tds-tag--sm tds-tag--default">Recommended</span>
                </span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="Enhanced due diligence">
                <span class="tds-action-list-item__label">Enhanced due diligence</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="Enterprise">
                <span class="tds-action-list-item__label">Enterprise</span>
                <span class="tds-action-list-item__trailing-visual" aria-hidden="true">
                  <span class="tds-tag tds-tag--sm tds-tag--default">Recommended</span>
                </span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="Custom">
                <span class="tds-action-list-item__label">Custom</span>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Field label & validation</h3>
          <p class="ds-showcase__desc">Standalone labels for non-input contexts. Validation messages include status icon and semantic color.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-field-label · .tds-field-validation · .tds-field-caption</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row">
        <label class="tds-field-label">Label text</label>
        <label class="tds-field-label">Label text <span class="tds-field-label__required">*</span></label>
        <label class="tds-field-label tds-field-label--disabled">Label text</label>
      </div>
      <div class="spacer--sm"></div>
      <div class="row">
        <span class="tds-field-validation tds-field-validation--error">
          <span class="tds-field-validation__icon" aria-hidden="true"><svg viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 11.375C2.4707 11.375 0 8.9043 0 5.875C0 2.8457 2.4707 0.375 5.5 0.375C8.5293 0.375 11 2.8457 11 5.875C11 8.9043 8.5293 11.375 5.5 11.375ZM5.5 1.40625C3.0293 1.40625 1.03125 3.4043 1.03125 5.875C1.03125 8.3457 3.0293 10.3438 5.5 10.3438C7.9707 10.3438 9.96875 8.3457 9.96875 5.875C9.96875 3.4043 7.9707 1.40625 5.5 1.40625ZM5.5 8.625C5.11328 8.625 4.8125 8.32422 4.8125 7.9375C4.8125 7.55078 5.11328 7.25 5.5 7.25C5.88672 7.25 6.1875 7.55078 6.1875 7.9375C6.1875 8.32422 5.88672 8.625 5.5 8.625ZM5.5 3.125C5.88672 3.125 6.20898 3.46875 6.16602 3.85547L6.01562 6.08984C5.99414 6.34766 5.7793 6.5625 5.5 6.5625C5.24219 6.5625 5.00586 6.34766 4.98438 6.08984L4.83398 3.85547C4.79102 3.46875 5.11328 3.125 5.5 3.125Z" fill="currentColor"/></svg></span>
          Validation message
        </span>
        <span class="tds-field-validation tds-field-validation--success">
          <span class="tds-field-validation__icon" aria-hidden="true"><svg viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 11.375C2.4707 11.375 0 8.9043 0 5.875C0 2.8457 2.4707 0.375 5.5 0.375C8.5293 0.375 11 2.8457 11 5.875C11 8.9043 8.5293 11.375 5.5 11.375ZM5.5 1.40625C3.0293 1.40625 1.03125 3.4043 1.03125 5.875C1.03125 8.3457 3.0293 10.3438 5.5 10.3438C7.9707 10.3438 9.96875 8.3457 9.96875 5.875C9.96875 3.4043 7.9707 1.40625 5.5 1.40625ZM7.02539 4.02734C7.19727 3.79102 7.51953 3.74805 7.73438 3.91992C7.9707 4.07031 8.01367 4.39258 7.86328 4.62891L5.2207 8.23828C5.13477 8.36719 5.00586 8.43164 4.85547 8.45312C4.70508 8.45312 4.55469 8.41016 4.44727 8.30273L3.24414 7.09961C3.05078 6.90625 3.05078 6.58398 3.24414 6.36914C3.45898 6.17578 3.78125 6.17578 3.97461 6.36914L4.74805 7.14258L7.02539 4.02734Z" fill="currentColor"/></svg></span>
          Validation message
        </span>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Date picker: single calendar</h3>
          <p class="ds-showcase__desc">Click the field to open the calendar and select a date. States match Figma 1632:29292: enabled, filled, error, disabled, read-only.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-date-picker · .tds-date-picker--open · .tds-date-picker__calendar</code>
            <span class="ds-tag">Interactive</span>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid">
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Enabled · empty</span>
          <div class="tds-date-picker" data-date-picker data-size="lg">
            <label class="tds-field-label">Label</label>
            <button type="button" class="tds-date-picker__field tds-date-picker__field--lg" aria-haspopup="dialog" aria-expanded="false">
              <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
              <span class="tds-date-picker__value tds-date-picker__placeholder">mm/dd/yyyy</span>
            </button>
          </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Filled</span>
          <div class="tds-date-picker" data-date-picker data-size="lg" data-value="03/13/2021">
            <label class="tds-field-label">Label</label>
            <button type="button" class="tds-date-picker__field tds-date-picker__field--lg" aria-haspopup="dialog" aria-expanded="false">
              <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
              <span class="tds-date-picker__value">03/13/2021</span>
            </button>
          </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Error</span>
          <div class="tds-date-picker tds-date-picker--invalid" data-date-picker data-size="lg">
            <label class="tds-field-label">Label</label>
            <button type="button" class="tds-date-picker__field tds-date-picker__field--lg" aria-haspopup="dialog" aria-expanded="false" aria-invalid="true">
              <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
              <span class="tds-date-picker__value tds-date-picker__placeholder">mm/dd/yyyy</span>
            </button>
            <span class="tds-field-validation tds-field-validation--error"><span class="tds-field-validation__icon" aria-hidden="true"><svg viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 11.375C2.4707 11.375 0 8.9043 0 5.875C0 2.8457 2.4707 0.375 5.5 0.375C8.5293 0.375 11 2.8457 11 5.875C11 8.9043 8.5293 11.375 5.5 11.375ZM5.5 1.40625C3.0293 1.40625 1.03125 3.4043 1.03125 5.875C1.03125 8.3457 3.0293 10.3438 5.5 10.3438C7.9707 10.3438 9.96875 8.3457 9.96875 5.875C9.96875 3.4043 7.9707 1.40625 5.5 1.40625ZM5.5 8.625C5.11328 8.625 4.8125 8.32422 4.8125 7.9375C4.8125 7.55078 5.11328 7.25 5.5 7.25C5.88672 7.25 6.1875 7.55078 6.1875 7.9375C6.1875 8.32422 5.88672 8.625 5.5 8.625ZM5.5 3.125C5.88672 3.125 6.20898 3.46875 6.16602 3.85547L6.01562 6.08984C5.99414 6.34766 5.7793 6.5625 5.5 6.5625C5.24219 6.5625 5.00586 6.34766 4.98438 6.08984L4.83398 3.85547C4.79102 3.46875 5.11328 3.125 5.5 3.125Z" fill="currentColor"/></svg></span>Validation message</span>
          </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Disabled</span>
          <div class="tds-date-picker tds-date-picker--disabled">
            <label class="tds-field-label">Label</label>
            <button type="button" class="tds-date-picker__field tds-date-picker__field--lg" disabled aria-haspopup="dialog" aria-expanded="false">
              <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
              <span class="tds-date-picker__value tds-date-picker__placeholder">mm/dd/yyyy</span>
            </button>
          </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Read-only</span>
          <div class="tds-date-picker tds-date-picker--readonly">
            <label class="tds-field-label">Label</label>
            <div class="tds-date-picker__field tds-date-picker__field--lg" aria-readonly="true">
              <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
              <span class="tds-date-picker__value">03/13/2021</span>
            </div>
          </div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Date picker: single sizes</h3>
          <p class="ds-showcase__desc">Small (28px), medium (32px), and large (40px) field heights: all interactive.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-date-picker__field--{sm|md|lg}</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="grid-3">
        <div class="tds-date-picker" data-date-picker data-size="sm">
          <label class="tds-field-label">Label</label>
          <button type="button" class="tds-date-picker__field tds-date-picker__field--sm" aria-haspopup="dialog" aria-expanded="false">
            <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
            <span class="tds-date-picker__value tds-date-picker__placeholder">mm/dd/yyyy</span>
          </button>
        </div>
        <div class="tds-date-picker" data-date-picker data-size="md">
          <label class="tds-field-label">Label</label>
          <button type="button" class="tds-date-picker__field tds-date-picker__field--md" aria-haspopup="dialog" aria-expanded="false">
            <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
            <span class="tds-date-picker__value tds-date-picker__placeholder">mm/dd/yyyy</span>
          </button>
        </div>
        <div class="tds-date-picker" data-date-picker data-size="lg">
          <label class="tds-field-label">Label</label>
          <button type="button" class="tds-date-picker__field tds-date-picker__field--lg" aria-haspopup="dialog" aria-expanded="false">
            <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
            <span class="tds-date-picker__value tds-date-picker__placeholder">mm/dd/yyyy</span>
          </button>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Date picker: range calendar</h3>
          <p class="ds-showcase__desc">Two linked fields share one calendar: click start, pick a date, then pick end. Range highlights in teal (Figma 1632:29424).</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-date-picker-range · .tds-date-picker-range--interactive</code>
            <span class="ds-tag">Interactive</span>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid">
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Enabled · empty</span>
          <div class="tds-date-picker-range tds-date-picker-range--interactive" data-date-picker-range data-size="lg">
            <div class="tds-date-picker-range__fields">
            <div class="tds-date-picker" data-date-picker-part="start">
              <label class="tds-field-label">Label</label>
              <button type="button" class="tds-date-picker__field tds-date-picker__field--lg" aria-haspopup="dialog" aria-expanded="false">
                <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
                <span class="tds-date-picker__value tds-date-picker__placeholder">mm/dd/yyyy</span>
              </button>
            </div>
            <div class="tds-date-picker" data-date-picker-part="end">
              <label class="tds-field-label">Label</label>
              <button type="button" class="tds-date-picker__field tds-date-picker__field--lg" aria-haspopup="dialog" aria-expanded="false">
                <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
                <span class="tds-date-picker__value tds-date-picker__placeholder">mm/dd/yyyy</span>
              </button>
            </div>
            </div>
          </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Filled</span>
          <div class="tds-date-picker-range tds-date-picker-range--interactive" data-date-picker-range data-size="lg" data-start="03/01/2021" data-end="03/20/2021">
            <div class="tds-date-picker-range__fields">
            <div class="tds-date-picker" data-date-picker-part="start">
              <label class="tds-field-label">Label</label>
              <button type="button" class="tds-date-picker__field tds-date-picker__field--lg" aria-haspopup="dialog" aria-expanded="false">
                <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
                <span class="tds-date-picker__value">03/01/2021</span>
              </button>
            </div>
            <div class="tds-date-picker" data-date-picker-part="end">
              <label class="tds-field-label">Label</label>
              <button type="button" class="tds-date-picker__field tds-date-picker__field--lg" aria-haspopup="dialog" aria-expanded="false">
                <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
                <span class="tds-date-picker__value">03/20/2021</span>
              </button>
            </div>
            </div>
          </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Error</span>
          <div class="tds-date-picker-range tds-date-picker-range--interactive tds-date-picker-range--invalid" data-date-picker-range data-size="lg">
            <div class="tds-date-picker-range__fields">
            <div class="tds-date-picker" data-date-picker-part="start">
              <label class="tds-field-label">Label</label>
              <button type="button" class="tds-date-picker__field tds-date-picker__field--lg" aria-haspopup="dialog" aria-expanded="false" aria-invalid="true">
                <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
                <span class="tds-date-picker__value tds-date-picker__placeholder">mm/dd/yyyy</span>
              </button>
            </div>
            <div class="tds-date-picker" data-date-picker-part="end">
              <label class="tds-field-label">Label</label>
              <button type="button" class="tds-date-picker__field tds-date-picker__field--lg" aria-haspopup="dialog" aria-expanded="false" aria-invalid="true">
                <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
                <span class="tds-date-picker__value tds-date-picker__placeholder">mm/dd/yyyy</span>
              </button>
            </div>
            </div>
          </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Disabled</span>
          <div class="tds-date-picker-range tds-date-picker-range--disabled">
            <div class="tds-date-picker-range__fields">
            <div class="tds-date-picker tds-date-picker--disabled" data-date-picker-part="start">
              <label class="tds-field-label">Label</label>
              <button type="button" class="tds-date-picker__field tds-date-picker__field--lg" disabled aria-haspopup="dialog" aria-expanded="false">
                <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
                <span class="tds-date-picker__value tds-date-picker__placeholder">mm/dd/yyyy</span>
              </button>
            </div>
            <div class="tds-date-picker tds-date-picker--disabled" data-date-picker-part="end">
              <label class="tds-field-label">Label</label>
              <button type="button" class="tds-date-picker__field tds-date-picker__field--lg" disabled aria-haspopup="dialog" aria-expanded="false">
                <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
                <span class="tds-date-picker__value tds-date-picker__placeholder">mm/dd/yyyy</span>
              </button>
            </div>
            </div>
          </div>
        </div>
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Read-only</span>
          <div class="tds-date-picker-range tds-date-picker-range--readonly">
            <div class="tds-date-picker-range__fields">
            <div class="tds-date-picker tds-date-picker--readonly" data-date-picker-part="start">
              <label class="tds-field-label">Label</label>
              <div class="tds-date-picker__field tds-date-picker__field--lg" aria-readonly="true">
                <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
                <span class="tds-date-picker__value">03/01/2021</span>
              </div>
            </div>
            <div class="tds-date-picker tds-date-picker--readonly" data-date-picker-part="end">
              <label class="tds-field-label">Label</label>
              <div class="tds-date-picker__field tds-date-picker__field--lg" aria-readonly="true">
                <span class="tds-date-picker__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 6.5h12M5.5 1.75V4M10.5 1.75V4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
                <span class="tds-date-picker__value">03/20/2021</span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </article>
      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Calendar day item states</h3>
          <p class="ds-showcase__desc">40×40 day cells: enabled, hover, focus, selected, today, in-range, outside month, disabled (Figma 1632:29116).</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-date-picker__day--{selected|today|in-range|outside|disabled|focus}</code>
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row" style="flex-wrap: wrap; gap: 8px;">
        <button type="button" class="tds-date-picker__day">13</button>
        <button type="button" class="tds-date-picker__day tds-date-picker__day--hover-demo">13</button>
        <button type="button" class="tds-date-picker__day tds-date-picker__day--focus">13</button>
        <button type="button" class="tds-date-picker__day tds-date-picker__day--selected">13</button>
        <button type="button" class="tds-date-picker__day tds-date-picker__day--today">13</button>
        <button type="button" class="tds-date-picker__day tds-date-picker__day--in-range">13</button>
        <button type="button" class="tds-date-picker__day tds-date-picker__day--in-range tds-date-picker__day--range-end-hover">13</button>
        <button type="button" class="tds-date-picker__day tds-date-picker__day--outside">13</button>
        <button type="button" class="tds-date-picker__day tds-date-picker__day--disabled" disabled>13</button>
      </div>
        </div>
      </article>
    </section>`},{id:"controls",title:"Controls",desc:"Binary and single-select choices: checkboxes, radios, switches, and radio cards. Entire rows should be clickable, not just the control.",html:`<section class="ds-chapter ds-tab-panel">
      <header class="ds-chapter__header">
        <h2 class="ds-chapter__title">Controls</h2>
        <p class="ds-chapter__desc">Binary and single-select choices: checkboxes, radios, switches, and radio cards. Entire rows should be clickable, not just the control.</p>
      </header>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Checkbox</h3>
          <p class="ds-showcase__desc">Multi-select and boolean toggles. Support indeterminate for partial selections.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-checkbox</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:14px"><input type="checkbox" class="tds-checkbox"> Unchecked</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:14px"><input type="checkbox" class="tds-checkbox" checked> Checked</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:14px;color:var(--text-disabled)"><input type="checkbox" class="tds-checkbox" disabled> Disabled</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:14px;color:var(--text-disabled)"><input type="checkbox" class="tds-checkbox" checked disabled> Checked disabled</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:14px;color:var(--text-disabled)"><input type="checkbox" class="tds-checkbox" id="indet-cb-dis" disabled> Indeterminate disabled</label>
      </div>
      <div class="spacer--sm"></div>
      <div class="row">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:14px"><input type="checkbox" class="tds-checkbox" id="indet-cb"> Indeterminate</label>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Radio</h3>
          <p class="ds-showcase__desc">Mutually exclusive options. Always group with a shared name attribute.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-radio</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:14px"><input type="radio" name="demo-radio" class="tds-radio"> Option A</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:14px"><input type="radio" name="demo-radio" class="tds-radio" checked> Option B</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:14px;color:var(--text-disabled)"><input type="radio" name="radio-dis" class="tds-radio" disabled> Disabled</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:14px;color:var(--text-disabled)"><input type="radio" name="radio-dis2" class="tds-radio" checked disabled> Checked disabled</label>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Radio group</h3>
          <p class="ds-showcase__desc">Stacked options with optional captions: ideal for verification type pickers.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-radio-group</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="card" style="max-width: 360px;">
        <div class="tds-radio-group">
          <label class="tds-radio-group__item">
            <input type="radio" name="rg" class="tds-radio" checked>
            <div class="tds-radio-group__content">
              <div class="tds-radio-group__label">Individual verification</div>
              <div class="tds-radio-group__caption">Verify a single person's identity</div>
            </div>
          </label>
          <label class="tds-radio-group__item">
            <input type="radio" name="rg" class="tds-radio">
            <div class="tds-radio-group__content">
              <div class="tds-radio-group__label">Business verification</div>
              <div class="tds-radio-group__caption">Verify a registered business entity</div>
            </div>
          </label>
          <label class="tds-radio-group__item tds-radio-group__item--disabled">
            <input type="radio" name="rg" class="tds-radio" disabled>
            <div class="tds-radio-group__content">
              <div class="tds-radio-group__label">Document verification</div>
              <div class="tds-radio-group__caption">Coming soon</div>
            </div>
          </label>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Switch sizes</h3>
          <p class="ds-showcase__desc">Immediate on/off settings. Medium for forms; small for compact settings rows.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-switch__track--{md|sm}</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row">
        <label class="tds-switch" onclick="toggleSwitch(this)">
          <span class="tds-switch__label-group">
            Label
            <span class="tds-switch__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
          </span>
          <div class="tds-switch__track tds-switch__track--md tds-switch__track--on" role="switch" aria-checked="true">
            <span class="tds-switch__indicator" aria-hidden="true"></span>
            <span class="tds-switch__handle" aria-hidden="true"></span>
          </div>
        </label>
        <label class="tds-switch" onclick="toggleSwitch(this)">
          <span class="tds-switch__label-group">
            Label
            <span class="tds-switch__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
          </span>
          <div class="tds-switch__track tds-switch__track--md" role="switch" aria-checked="false">
            <span class="tds-switch__indicator" aria-hidden="true"></span>
            <span class="tds-switch__handle" aria-hidden="true"></span>
          </div>
        </label>
        <label class="tds-switch" onclick="toggleSwitch(this)">
          <span class="tds-switch__label-group">
            Label
            <span class="tds-switch__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
          </span>
          <div class="tds-switch__track tds-switch__track--sm tds-switch__track--on" role="switch" aria-checked="true">
            <span class="tds-switch__indicator" aria-hidden="true"></span>
            <span class="tds-switch__handle" aria-hidden="true"></span>
          </div>
        </label>
        <label class="tds-switch" onclick="toggleSwitch(this)">
          <span class="tds-switch__label-group">
            Label
            <span class="tds-switch__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
          </span>
          <div class="tds-switch__track tds-switch__track--sm" role="switch" aria-checked="false">
            <span class="tds-switch__indicator" aria-hidden="true"></span>
            <span class="tds-switch__handle" aria-hidden="true"></span>
          </div>
        </label>
        <label class="tds-switch tds-switch--disabled">
          <span class="tds-switch__label-group">
            Label
            <span class="tds-switch__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
          </span>
          <div class="tds-switch__track tds-switch__track--md tds-switch__track--on" role="switch" aria-checked="true">
            <span class="tds-switch__indicator" aria-hidden="true"></span>
            <span class="tds-switch__handle" aria-hidden="true"></span>
          </div>
        </label>
        <label class="tds-switch tds-switch--disabled">
          <span class="tds-switch__label-group">
            Label
            <span class="tds-switch__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
          </span>
          <div class="tds-switch__track tds-switch__track--md" role="switch" aria-checked="false">
            <span class="tds-switch__indicator" aria-hidden="true"></span>
            <span class="tds-switch__handle" aria-hidden="true"></span>
          </div>
        </label>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Radio card with description</h3>
          <p class="ds-showcase__desc">Selectable cards for high-consideration choices. Entire card is clickable.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-radio-card</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="grid-2">
        <div class="tds-radio-card tds-radio-card--selected" onclick="document.querySelectorAll('[data-rc-group=g1]').forEach(c=>{c.classList.remove('tds-radio-card--selected');c.querySelector('input').checked=false;});this.classList.add('tds-radio-card--selected');this.querySelector('input').checked=true;" data-rc-group="g1">
          <input type="radio" name="plan" class="tds-radio" checked>
          <div class="tds-radio-card__content">
            <div class="tds-radio-card__label-row">
              <span class="tds-radio-card__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
              <div class="tds-radio-card__label">Standard verification</div>
            </div>
            <div class="tds-radio-card__description">Basic identity and business verification with document checks</div>
          </div>
        </div>
        <div class="tds-radio-card" onclick="document.querySelectorAll('[data-rc-group=g1]').forEach(c=>{c.classList.remove('tds-radio-card--selected');c.querySelector('input').checked=false;});this.classList.add('tds-radio-card--selected');this.querySelector('input').checked=true;" data-rc-group="g1">
          <input type="radio" name="plan" class="tds-radio">
          <div class="tds-radio-card__content">
            <div class="tds-radio-card__label-row">
              <span class="tds-radio-card__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
              <div class="tds-radio-card__label">Enhanced due diligence</div>
            </div>
            <div class="tds-radio-card__description">Full KYB with UBO analysis, AML screening, and ongoing monitoring</div>
          </div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Radio card without description</h3>
          <p class="ds-showcase__desc">Compact card variant when the label alone is sufficient.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-radio-card</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="grid-2">
        <div class="tds-radio-card tds-radio-card--selected" onclick="document.querySelectorAll('[data-rc-group=g2]').forEach(c=>{c.classList.remove('tds-radio-card--selected');c.querySelector('input').checked=false;});this.classList.add('tds-radio-card--selected');this.querySelector('input').checked=true;" data-rc-group="g2">
          <input type="radio" name="plan2" class="tds-radio" checked>
          <div class="tds-radio-card__content">
            <div class="tds-radio-card__label-row">
              <span class="tds-radio-card__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
              <div class="tds-radio-card__label">Automated review</div>
            </div>
          </div>
        </div>
        <div class="tds-radio-card" onclick="document.querySelectorAll('[data-rc-group=g2]').forEach(c=>{c.classList.remove('tds-radio-card--selected');c.querySelector('input').checked=false;});this.classList.add('tds-radio-card--selected');this.querySelector('input').checked=true;" data-rc-group="g2">
          <input type="radio" name="plan2" class="tds-radio">
          <div class="tds-radio-card__content">
            <div class="tds-radio-card__label-row">
              <span class="tds-radio-card__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
              <div class="tds-radio-card__label">Manual review</div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Radio card multi-selection</h3>
          <p class="ds-showcase__desc">Checkbox control for multi-select lists: same card layout as single-selection (Figma 359:3332).</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-radio-card · .tds-checkbox</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="grid-2">
        <div class="tds-radio-card tds-radio-card--selected" onclick="this.classList.toggle('tds-radio-card--selected');this.querySelector('input').checked=!this.querySelector('input').checked;">
          <input type="checkbox" class="tds-checkbox" checked>
          <div class="tds-radio-card__content">
            <div class="tds-radio-card__label-row">
              <span class="tds-radio-card__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
              <div class="tds-radio-card__label">Document verification</div>
            </div>
            <div class="tds-radio-card__description">Verify identity documents against trusted sources</div>
          </div>
        </div>
        <div class="tds-radio-card" onclick="this.classList.toggle('tds-radio-card--selected');this.querySelector('input').checked=!this.querySelector('input').checked;">
          <input type="checkbox" class="tds-checkbox">
          <div class="tds-radio-card__content">
            <div class="tds-radio-card__label-row">
              <span class="tds-radio-card__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
              <div class="tds-radio-card__label">AML screening</div>
            </div>
            <div class="tds-radio-card__description">Screen against sanctions, PEP, and adverse media lists</div>
          </div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Announcement</h3>
          <p class="ds-showcase__desc">Inline messaging with semantic surfaces, optional actions, and dismiss (Figma 866:13118).</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-announcement--{variant}--{stacked|inline}</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid" style="grid-template-columns: 1fr; gap: var(--spacing-16);">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Warning · stacked</span>
<div class="tds-announcement tds-announcement--warning" role="status">
  <span class="tds-announcement__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M8 2.5 14 13.5H2L8 2.5z"/><path d="M8 6.5v3.5" stroke-linecap="round"/><circle cx="8" cy="11.75" r=".6" fill="currentColor"/></svg></span>
  <div class="tds-announcement__content">
    <p class="tds-announcement__title">Title</p>
    <p class="tds-announcement__message">Message text goes here.</p>
    <div class="tds-announcement__actions">
      <button type="button" class="tds-btn tds-btn--md tds-btn--secondary">Button</button>
      <button type="button" class="tds-btn tds-btn--md tds-btn--invisible">Button</button>
    </div>
  </div>
  <button type="button" class="tds-dismiss tds-dismiss--sm tds-announcement__dismiss" aria-label="Dismiss"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Success · inline</span>
<div class="tds-announcement tds-announcement--success tds-announcement--inline" role="status">
  <span class="tds-announcement__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M5.5 8.5 7 10l3.5-4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
  <div class="tds-announcement__content">
    <p class="tds-announcement__title">Title</p>
    <p class="tds-announcement__message">Message text goes here.</p>
    <div class="tds-announcement__actions"><button type="button" class="tds-btn tds-btn--md tds-btn--invisible">Button</button></div>
  </div>
  <button type="button" class="tds-dismiss tds-dismiss--sm tds-announcement__dismiss" aria-label="Dismiss"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Error · stacked</span>
<div class="tds-announcement tds-announcement--error" role="alert">
  <span class="tds-announcement__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M8 1.5 14.5 8 8 14.5 1.5 8 8 1.5z"/><path d="M8 5.5v3.5" stroke-linecap="round"/><circle cx="8" cy="11.25" r=".6" fill="currentColor"/></svg></span>
  <div class="tds-announcement__content">
    <p class="tds-announcement__title">Verification failed</p>
    <p class="tds-announcement__message">Business registry could not be reached. Retry or upload documents manually.</p>
  </div>
  <button type="button" class="tds-dismiss tds-dismiss--sm tds-announcement__dismiss" aria-label="Dismiss"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>
</div></div>
      </div>
        </div>
      </article>
    </section>`},{id:"tags",title:"Tags & Counters",desc:"Compact status indicators and numeric badges. Use semantic colors for risk states; counters annotate tabs, filters, and buttons.",html:`<section class="ds-chapter ds-tab-panel">
      <header class="ds-chapter__header">
        <h2 class="ds-chapter__title">Tags & Counters</h2>
        <p class="ds-chapter__desc">Compact status indicators and numeric badges. Use semantic colors for risk states; counters annotate tabs, filters, and buttons.</p>
      </header>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Tag sizes</h3>
          <p class="ds-showcase__desc">Scale with density of the surrounding UI.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-tag--{sm|md|lg|xl}</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row">
        <span class="tds-tag tds-tag--sm tds-tag--positive">Small 20px</span>
        <span class="tds-tag tds-tag--md tds-tag--positive">Medium 24px</span>
        <span class="tds-tag tds-tag--lg tds-tag--positive">Large 26px</span>
        <span class="tds-tag tds-tag--xl tds-tag--positive">XLarge 28px</span>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Tag types</h3>
          <p class="ds-showcase__desc">Semantic backgrounds for verification status: default, positive, intermediate, negative.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-tag--{default|positive|intermediate|negative}</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row">
        <span class="tds-tag tds-tag--md tds-tag--default">Default</span>
        <span class="tds-tag tds-tag--md tds-tag--positive">Verified</span>
        <span class="tds-tag tds-tag--md tds-tag--intermediate">Pending</span>
        <span class="tds-tag tds-tag--md tds-tag--negative">Rejected</span>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Removable tags</h3>
          <p class="ds-showcase__desc">Add a dismiss button: hit area scales with tag size.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-tag--removable</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row">
        <span class="tds-tag tds-tag--md tds-tag--default tds-tag--removable">Ontario<button class="tds-tag__remove" aria-label="Remove"><svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 2l6 6M8 2l-6 6"/></svg></button></span>
        <span class="tds-tag tds-tag--md tds-tag--positive tds-tag--removable">Verified<button class="tds-tag__remove" aria-label="Remove"><svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 2l6 6M8 2l-6 6"/></svg></button></span>
        <span class="tds-tag tds-tag--md tds-tag--intermediate tds-tag--removable">Pending<button class="tds-tag__remove" aria-label="Remove"><svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 2l6 6M8 2l-6 6"/></svg></button></span>
        <span class="tds-tag tds-tag--md tds-tag--negative tds-tag--removable">Rejected<button class="tds-tag__remove" aria-label="Remove"><svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 2l6 6M8 2l-6 6"/></svg></button></span>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Tags with leading visual</h3>
          <p class="ds-showcase__desc">Icon or avatar before the label for quick visual scanning.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-tag__leading-visual</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row">
        <span class="tds-tag tds-tag--md tds-tag--default">
          <span class="tds-tag__leading-visual"><svg class="icon--sm" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="4"/></svg></span>
          Active
        </span>
        <span class="tds-tag tds-tag--md tds-tag--positive">
          <span class="tds-tag__leading-visual"><svg class="icon--sm" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="4"/></svg></span>
          Verified
        </span>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">AI tag</h3>
          <p class="ds-showcase__desc">TruAI badge with required sparkles icon: small and medium sizes, rest and hover states (Figma 1821:33907).</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-ai-tag · .tds-ai-tag--{sm|md}</code></div>
        </div>
        <div class="ds-showcase__canvas">
<div class="ds-state-grid" style="grid-template-columns: repeat(2, auto); gap: var(--spacing-24); justify-content: start;">
            <div class="ds-state-demo"><span class="ds-state-demo__label">Small · rest</span><span class="tds-ai-tag tds-ai-tag--sm"><span class="tds-ai-tag__icon" aria-hidden="true"><svg class="icon" viewBox="0 0 12.375 12.375" fill="none"><path d="M8.42188 1.82617L9.625 1.375L10.0762 0.150391C10.1191 0.0644531 10.2051 0 10.3125 0C10.4199 0 10.5059 0.0644531 10.5488 0.150391L11 1.375L12.2246 1.82617C12.3105 1.86914 12.375 1.95508 12.375 2.0625C12.375 2.16992 12.3105 2.25586 12.2246 2.29883L11 2.75L10.5488 3.97461C10.5059 4.06055 10.4199 4.125 10.3125 4.125C10.2051 4.125 10.1191 4.06055 10.0762 3.97461L9.625 2.75L8.42188 2.29883C8.31445 2.25586 8.25 2.16992 8.25 2.0625C8.25 1.95508 8.31445 1.86914 8.42188 1.82617ZM4.44727 2.25586H4.42578L5.58594 4.72656L8.05664 5.88672C8.16406 5.92969 8.25 6.05859 8.25 6.1875C8.25 6.31641 8.16406 6.44531 8.05664 6.50977L5.58594 7.64844L4.42578 10.1191C4.38281 10.2266 4.25391 10.3125 4.125 10.3125C3.99609 10.3125 3.86719 10.2266 3.80273 10.1191L2.66406 7.64844L0.193359 6.50977C0.0859375 6.44531 0 6.31641 0 6.1875C0 6.05859 0.0859375 5.92969 0.193359 5.86523L2.66406 4.72656L3.82422 2.25586C3.86719 2.14844 3.99609 2.0625 4.125 2.0625C4.25391 2.0625 4.38281 2.14844 4.44727 2.25586ZM8.9375 9.625L9.38867 8.42188C9.43164 8.31445 9.51758 8.25 9.625 8.25C9.73242 8.25 9.81836 8.31445 9.86133 8.42188L10.3125 9.625L11.5371 10.0762C11.623 10.1191 11.6875 10.2051 11.6875 10.3125C11.6875 10.4199 11.623 10.5059 11.5371 10.5488L10.3125 11L9.86133 12.2246C9.81836 12.3105 9.73242 12.375 9.625 12.375C9.51758 12.375 9.43164 12.3105 9.38867 12.2246L8.9375 11L7.73438 10.5488C7.62695 10.5059 7.5625 10.4199 7.5625 10.3125C7.5625 10.2051 7.62695 10.1191 7.73438 10.0762L8.9375 9.625Z" fill="currentColor"/></svg></span><span class="tds-ai-tag__label">TruAI</span></span></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Small · hover</span><span class="tds-ai-tag tds-ai-tag--sm tds-ai-tag--hover-demo"><span class="tds-ai-tag__icon" aria-hidden="true"><svg class="icon" viewBox="0 0 12.375 12.375" fill="none"><path d="M8.42188 1.82617L9.625 1.375L10.0762 0.150391C10.1191 0.0644531 10.2051 0 10.3125 0C10.4199 0 10.5059 0.0644531 10.5488 0.150391L11 1.375L12.2246 1.82617C12.3105 1.86914 12.375 1.95508 12.375 2.0625C12.375 2.16992 12.3105 2.25586 12.2246 2.29883L11 2.75L10.5488 3.97461C10.5059 4.06055 10.4199 4.125 10.3125 4.125C10.2051 4.125 10.1191 4.06055 10.0762 3.97461L9.625 2.75L8.42188 2.29883C8.31445 2.25586 8.25 2.16992 8.25 2.0625C8.25 1.95508 8.31445 1.86914 8.42188 1.82617ZM4.44727 2.25586H4.42578L5.58594 4.72656L8.05664 5.88672C8.16406 5.92969 8.25 6.05859 8.25 6.1875C8.25 6.31641 8.16406 6.44531 8.05664 6.50977L5.58594 7.64844L4.42578 10.1191C4.38281 10.2266 4.25391 10.3125 4.125 10.3125C3.99609 10.3125 3.86719 10.2266 3.80273 10.1191L2.66406 7.64844L0.193359 6.50977C0.0859375 6.44531 0 6.31641 0 6.1875C0 6.05859 0.0859375 5.92969 0.193359 5.86523L2.66406 4.72656L3.82422 2.25586C3.86719 2.14844 3.99609 2.0625 4.125 2.0625C4.25391 2.0625 4.38281 2.14844 4.44727 2.25586ZM8.9375 9.625L9.38867 8.42188C9.43164 8.31445 9.51758 8.25 9.625 8.25C9.73242 8.25 9.81836 8.31445 9.86133 8.42188L10.3125 9.625L11.5371 10.0762C11.623 10.1191 11.6875 10.2051 11.6875 10.3125C11.6875 10.4199 11.623 10.5059 11.5371 10.5488L10.3125 11L9.86133 12.2246C9.81836 12.3105 9.73242 12.375 9.625 12.375C9.51758 12.375 9.43164 12.3105 9.38867 12.2246L8.9375 11L7.73438 10.5488C7.62695 10.5059 7.5625 10.4199 7.5625 10.3125C7.5625 10.2051 7.62695 10.1191 7.73438 10.0762L8.9375 9.625Z" fill="currentColor"/></svg></span><span class="tds-ai-tag__label">TruAI</span></span></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Medium · rest</span><span class="tds-ai-tag tds-ai-tag--md"><span class="tds-ai-tag__icon" aria-hidden="true"><svg class="icon" viewBox="0 0 12.375 12.375" fill="none"><path d="M8.42188 1.82617L9.625 1.375L10.0762 0.150391C10.1191 0.0644531 10.2051 0 10.3125 0C10.4199 0 10.5059 0.0644531 10.5488 0.150391L11 1.375L12.2246 1.82617C12.3105 1.86914 12.375 1.95508 12.375 2.0625C12.375 2.16992 12.3105 2.25586 12.2246 2.29883L11 2.75L10.5488 3.97461C10.5059 4.06055 10.4199 4.125 10.3125 4.125C10.2051 4.125 10.1191 4.06055 10.0762 3.97461L9.625 2.75L8.42188 2.29883C8.31445 2.25586 8.25 2.16992 8.25 2.0625C8.25 1.95508 8.31445 1.86914 8.42188 1.82617ZM4.44727 2.25586H4.42578L5.58594 4.72656L8.05664 5.88672C8.16406 5.92969 8.25 6.05859 8.25 6.1875C8.25 6.31641 8.16406 6.44531 8.05664 6.50977L5.58594 7.64844L4.42578 10.1191C4.38281 10.2266 4.25391 10.3125 4.125 10.3125C3.99609 10.3125 3.86719 10.2266 3.80273 10.1191L2.66406 7.64844L0.193359 6.50977C0.0859375 6.44531 0 6.31641 0 6.1875C0 6.05859 0.0859375 5.92969 0.193359 5.86523L2.66406 4.72656L3.82422 2.25586C3.86719 2.14844 3.99609 2.0625 4.125 2.0625C4.25391 2.0625 4.38281 2.14844 4.44727 2.25586ZM8.9375 9.625L9.38867 8.42188C9.43164 8.31445 9.51758 8.25 9.625 8.25C9.73242 8.25 9.81836 8.31445 9.86133 8.42188L10.3125 9.625L11.5371 10.0762C11.623 10.1191 11.6875 10.2051 11.6875 10.3125C11.6875 10.4199 11.623 10.5059 11.5371 10.5488L10.3125 11L9.86133 12.2246C9.81836 12.3105 9.73242 12.375 9.625 12.375C9.51758 12.375 9.43164 12.3105 9.38867 12.2246L8.9375 11L7.73438 10.5488C7.62695 10.5059 7.5625 10.4199 7.5625 10.3125C7.5625 10.2051 7.62695 10.1191 7.73438 10.0762L8.9375 9.625Z" fill="currentColor"/></svg></span><span class="tds-ai-tag__label">TruAI</span></span></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Medium · hover</span><span class="tds-ai-tag tds-ai-tag--md tds-ai-tag--hover-demo"><span class="tds-ai-tag__icon" aria-hidden="true"><svg class="icon" viewBox="0 0 12.375 12.375" fill="none"><path d="M8.42188 1.82617L9.625 1.375L10.0762 0.150391C10.1191 0.0644531 10.2051 0 10.3125 0C10.4199 0 10.5059 0.0644531 10.5488 0.150391L11 1.375L12.2246 1.82617C12.3105 1.86914 12.375 1.95508 12.375 2.0625C12.375 2.16992 12.3105 2.25586 12.2246 2.29883L11 2.75L10.5488 3.97461C10.5059 4.06055 10.4199 4.125 10.3125 4.125C10.2051 4.125 10.1191 4.06055 10.0762 3.97461L9.625 2.75L8.42188 2.29883C8.31445 2.25586 8.25 2.16992 8.25 2.0625C8.25 1.95508 8.31445 1.86914 8.42188 1.82617ZM4.44727 2.25586H4.42578L5.58594 4.72656L8.05664 5.88672C8.16406 5.92969 8.25 6.05859 8.25 6.1875C8.25 6.31641 8.16406 6.44531 8.05664 6.50977L5.58594 7.64844L4.42578 10.1191C4.38281 10.2266 4.25391 10.3125 4.125 10.3125C3.99609 10.3125 3.86719 10.2266 3.80273 10.1191L2.66406 7.64844L0.193359 6.50977C0.0859375 6.44531 0 6.31641 0 6.1875C0 6.05859 0.0859375 5.92969 0.193359 5.86523L2.66406 4.72656L3.82422 2.25586C3.86719 2.14844 3.99609 2.0625 4.125 2.0625C4.25391 2.0625 4.38281 2.14844 4.44727 2.25586ZM8.9375 9.625L9.38867 8.42188C9.43164 8.31445 9.51758 8.25 9.625 8.25C9.73242 8.25 9.81836 8.31445 9.86133 8.42188L10.3125 9.625L11.5371 10.0762C11.623 10.1191 11.6875 10.2051 11.6875 10.3125C11.6875 10.4199 11.623 10.5059 11.5371 10.5488L10.3125 11L9.86133 12.2246C9.81836 12.3105 9.73242 12.375 9.625 12.375C9.51758 12.375 9.43164 12.3105 9.38867 12.2246L8.9375 11L7.73438 10.5488C7.62695 10.5059 7.5625 10.4199 7.5625 10.3125C7.5625 10.2051 7.62695 10.1191 7.73438 10.0762L8.9375 9.625Z" fill="currentColor"/></svg></span><span class="tds-ai-tag__label">TruAI</span></span></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Interactive</span><button type="button" class="tds-ai-tag tds-ai-tag--md"><span class="tds-ai-tag__icon" aria-hidden="true"><svg class="icon" viewBox="0 0 12.375 12.375" fill="none"><path d="M8.42188 1.82617L9.625 1.375L10.0762 0.150391C10.1191 0.0644531 10.2051 0 10.3125 0C10.4199 0 10.5059 0.0644531 10.5488 0.150391L11 1.375L12.2246 1.82617C12.3105 1.86914 12.375 1.95508 12.375 2.0625C12.375 2.16992 12.3105 2.25586 12.2246 2.29883L11 2.75L10.5488 3.97461C10.5059 4.06055 10.4199 4.125 10.3125 4.125C10.2051 4.125 10.1191 4.06055 10.0762 3.97461L9.625 2.75L8.42188 2.29883C8.31445 2.25586 8.25 2.16992 8.25 2.0625C8.25 1.95508 8.31445 1.86914 8.42188 1.82617ZM4.44727 2.25586H4.42578L5.58594 4.72656L8.05664 5.88672C8.16406 5.92969 8.25 6.05859 8.25 6.1875C8.25 6.31641 8.16406 6.44531 8.05664 6.50977L5.58594 7.64844L4.42578 10.1191C4.38281 10.2266 4.25391 10.3125 4.125 10.3125C3.99609 10.3125 3.86719 10.2266 3.80273 10.1191L2.66406 7.64844L0.193359 6.50977C0.0859375 6.44531 0 6.31641 0 6.1875C0 6.05859 0.0859375 5.92969 0.193359 5.86523L2.66406 4.72656L3.82422 2.25586C3.86719 2.14844 3.99609 2.0625 4.125 2.0625C4.25391 2.0625 4.38281 2.14844 4.44727 2.25586ZM8.9375 9.625L9.38867 8.42188C9.43164 8.31445 9.51758 8.25 9.625 8.25C9.73242 8.25 9.81836 8.31445 9.86133 8.42188L10.3125 9.625L11.5371 10.0762C11.623 10.1191 11.6875 10.2051 11.6875 10.3125C11.6875 10.4199 11.623 10.5059 11.5371 10.5488L10.3125 11L9.86133 12.2246C9.81836 12.3105 9.73242 12.375 9.625 12.375C9.51758 12.375 9.43164 12.3105 9.38867 12.2246L8.9375 11L7.73438 10.5488C7.62695 10.5059 7.5625 10.4199 7.5625 10.3125C7.5625 10.2051 7.62695 10.1191 7.73438 10.0762L8.9375 9.625Z" fill="currentColor"/></svg></span><span class="tds-ai-tag__label">TruAI</span></button></div>
          </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Counter label: Primary</h3>
          <p class="ds-showcase__desc">High-emphasis count on teal background: alerts, notifications.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-counter--primary</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row">
        <span class="tds-counter tds-counter--sm tds-counter--primary">12</span>
        <span class="tds-counter tds-counter--md tds-counter--primary">24</span>
        <span class="tds-counter tds-counter--lg tds-counter--primary">108</span>
        <span class="tds-counter tds-counter--md tds-counter--primary tds-counter--positive">3</span>
        <span class="tds-counter tds-counter--md tds-counter--primary tds-counter--intermediate">7</span>
        <span class="tds-counter tds-counter--md tds-counter--primary tds-counter--negative">2</span>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Counter label: Secondary</h3>
          <p class="ds-showcase__desc">Neutral count for filters and secondary metrics.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-counter--secondary</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row">
        <span class="tds-counter tds-counter--sm tds-counter--secondary">12</span>
        <span class="tds-counter tds-counter--md tds-counter--secondary">24</span>
        <span class="tds-counter tds-counter--lg tds-counter--secondary">108</span>
        <span class="tds-counter tds-counter--md tds-counter--secondary tds-counter--positive">3</span>
        <span class="tds-counter tds-counter--md tds-counter--secondary tds-counter--intermediate">7</span>
        <span class="tds-counter tds-counter--md tds-counter--secondary tds-counter--negative">2</span>
      </div>
        </div>
      </article>
    </section>`},{id:"navigation",title:"Navigation",desc:"Wayfinding across workspaces: tabs, filter chips, nav lists, breadcrumbs, and dropdown panels. Keep hierarchy flat and scannable.",html:`<section class="ds-chapter ds-tab-panel">
      <header class="ds-chapter__header">
        <h2 class="ds-chapter__title">Navigation</h2>
        <p class="ds-chapter__desc">Wayfinding across workspaces: tabs, filter chips, nav lists, breadcrumbs, and dropdown panels. Keep hierarchy flat and scannable.</p>
      </header>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Breadcrumbs</h3>
          <p class="ds-showcase__desc">Hierarchical path navigation: link items use body/xs in teal; current page uses body/xs in default text. Divider is “/” in icon-faint (Figma 1596:23587).</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-breadcrumbs · .tds-breadcrumb-item · .tds-breadcrumb-divider</code>
            <span class="ds-tag">New</span>
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div style="display: flex; flex-direction: column; gap: 16px;">
        <nav class="tds-breadcrumbs" aria-label="Breadcrumb">
          <a href="#" class="tds-breadcrumb-item">One</a>
          <span class="tds-breadcrumb-divider" aria-hidden="true">/</span>
          <span class="tds-breadcrumb-item tds-breadcrumb-item--current" aria-current="page">Current page</span>
        </nav>
        <nav class="tds-breadcrumbs" aria-label="Breadcrumb">
          <a href="#" class="tds-breadcrumb-item">One</a>
          <span class="tds-breadcrumb-divider" aria-hidden="true">/</span>
          <a href="#" class="tds-breadcrumb-item">Two</a>
          <span class="tds-breadcrumb-divider" aria-hidden="true">/</span>
          <span class="tds-breadcrumb-item tds-breadcrumb-item--current" aria-current="page">Current page</span>
        </nav>
        <nav class="tds-breadcrumbs" aria-label="Breadcrumb">
          <a href="#" class="tds-breadcrumb-item">One</a>
          <span class="tds-breadcrumb-divider" aria-hidden="true">/</span>
          <a href="#" class="tds-breadcrumb-item">Two</a>
          <span class="tds-breadcrumb-divider" aria-hidden="true">/</span>
          <a href="#" class="tds-breadcrumb-item">Three</a>
          <span class="tds-breadcrumb-divider" aria-hidden="true">/</span>
          <span class="tds-breadcrumb-item tds-breadcrumb-item--current" aria-current="page">Current page</span>
        </nav>
        <nav class="tds-breadcrumbs" aria-label="Breadcrumb">
          <a href="#" class="tds-breadcrumb-item">One</a>
          <span class="tds-breadcrumb-divider" aria-hidden="true">/</span>
          <a href="#" class="tds-breadcrumb-item">Two</a>
          <span class="tds-breadcrumb-divider" aria-hidden="true">/</span>
          <a href="#" class="tds-breadcrumb-item">Three</a>
          <span class="tds-breadcrumb-divider" aria-hidden="true">/</span>
          <a href="#" class="tds-breadcrumb-item">Four</a>
          <span class="tds-breadcrumb-divider" aria-hidden="true">/</span>
          <span class="tds-breadcrumb-item tds-breadcrumb-item--current" aria-current="page">Current page</span>
        </nav>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Tab item states</h3>
          <p class="ds-showcase__desc">Default, hover, active, and disabled: Inter 14/18 medium (500) with a 3px teal indicator.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-tab-item · .tds-tab-item__indicator</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="row">
        <button class="tds-tab-item">
          <span class="tds-tab-item__content">Tab Label</span>
        <span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
        <button class="tds-tab-item tds-tab-item--hover-demo">
          <span class="tds-tab-item__content">Tab Label</span>
          <span class="tds-tab-item__indicator" aria-hidden="true"></span>
        </button>
        <button class="tds-tab-item tds-tab-item--active">
          <span class="tds-tab-item__content">Tab Label</span>
          <span class="tds-tab-item__indicator" aria-hidden="true"></span>
        </button>
        <button class="tds-tab-item tds-tab-item--disabled" disabled>
          <span class="tds-tab-item__content">Tab Label</span>
        <span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Tabs</h3>
          <p class="ds-showcase__desc">Section switcher: label/md medium with a 3px interactive underline. Include <code class="ds-api">.tds-tab-item__indicator</code> on every tab for consistent height (Figma 405:8964).</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-tabs · .tds-tab-item</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div style="display: flex; flex-direction: column; gap: var(--spacing-32); width: 100%;">
        <div class="tds-tabs">
          <div class="tds-tabs__row">
            <div class="tds-tabs__list">
              <button type="button" class="tds-tab-item tds-tab-item--active" role="tab" aria-selected="true"><span class="tds-tab-item__content">Tab 1</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 2</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
            </div>
          </div>
          <div class="tds-tabs__divider" aria-hidden="true"></div>
        </div>
        <div class="tds-tabs">
          <div class="tds-tabs__row">
            <div class="tds-tabs__list">
              <button type="button" class="tds-tab-item tds-tab-item--active" role="tab" aria-selected="true"><span class="tds-tab-item__content">Tab 1</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 2</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 3</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
            </div>
          </div>
          <div class="tds-tabs__divider" aria-hidden="true"></div>
        </div>
        <div class="tds-tabs">
          <div class="tds-tabs__row">
            <div class="tds-tabs__list">
              <button type="button" class="tds-tab-item tds-tab-item--active" role="tab" aria-selected="true"><span class="tds-tab-item__content">Tab 1</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 2</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 3</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 4</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
            </div>
          </div>
          <div class="tds-tabs__divider" aria-hidden="true"></div>
        </div>
        <div class="tds-tabs">
          <div class="tds-tabs__row">
            <div class="tds-tabs__list">
              <button type="button" class="tds-tab-item tds-tab-item--active" role="tab" aria-selected="true"><span class="tds-tab-item__content">Overview</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Documents</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Activity <span class="tds-tab-item__counter">14</span></span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item tds-tab-item--disabled" role="tab" aria-selected="false" disabled><span class="tds-tab-item__content">Settings</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
            </div>
          </div>
          <div class="tds-tabs__divider" aria-hidden="true"></div>
        </div>
        <div class="tds-tabs">
          <div class="tds-tabs__row">
            <div class="tds-tabs__list">
              <button type="button" class="tds-tab-item tds-tab-item--active" role="tab" aria-selected="true"><span class="tds-tab-item__content">Tab 1</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 2</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 3</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 4</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 5</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 6</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
            </div>
          </div>
          <div class="tds-tabs__divider" aria-hidden="true"></div>
        </div>
        <div class="tds-tabs">
          <div class="tds-tabs__row">
            <div class="tds-tabs__list">
              <button type="button" class="tds-tab-item tds-tab-item--active" role="tab" aria-selected="true"><span class="tds-tab-item__content">Tab 1</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 2</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 3</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 4</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 5</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 6</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 7</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 8</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 9</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Tab 10</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
            </div>
          </div>
          <div class="tds-tabs__divider" aria-hidden="true"></div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Tabs with overflow scroll</h3>
          <p class="ds-showcase__desc">Left and right scroll buttons appear when the tab list overflows. Use <code class="ds-api">.tds-tabs__overflow-btn--elevated</code> on the right control for 4+ tabs (Figma 405:8964).</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-tabs__overflow-btn</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="tds-tabs tds-tabs--scrollable" style="max-width: 420px;" data-tabs-scrollable>
          <div class="tds-tabs__row">
            <button type="button" class="tds-tabs__overflow-btn" aria-label="Scroll tabs left" data-tabs-scroll="left"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3.5 5.5 8 10 12.5"/></svg></button>
            <div class="tds-tabs__list" role="tablist" aria-label="Overflow tabs">
              <button type="button" class="tds-tab-item tds-tab-item--active" role="tab" aria-selected="true"><span class="tds-tab-item__content">Overview</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Documents</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Activity <span class="tds-tab-item__counter">14</span></span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Ownership</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Signals</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item" role="tab" aria-selected="false"><span class="tds-tab-item__content">Risk</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
              <button type="button" class="tds-tab-item tds-tab-item--disabled" role="tab" aria-selected="false" disabled><span class="tds-tab-item__content">Settings</span><span class="tds-tab-item__indicator" aria-hidden="true"></span></button>
            </div>
            <button type="button" class="tds-tabs__overflow-btn tds-tabs__overflow-btn--elevated tds-tabs__overflow-btn--visible" aria-label="Scroll tabs right" data-tabs-scroll="right"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5"/></svg></button>
          </div>
          <div class="tds-tabs__divider" aria-hidden="true"></div>
        </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Filter tabs</h3>
          <p class="ds-showcase__desc">Pill filters with CounterLabel: selected uses label/sm medium on interactive fill; unselected uses body/xs on transparent (Figma 844:6968).</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-filter-tabs · .tds-filter-tab</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="tds-filter-tabs" role="tablist" aria-label="Status filters">
        <button type="button" class="tds-filter-tab tds-filter-tab--selected" role="tab" aria-selected="true">All <span class="tds-counter tds-counter--secondary tds-counter--sm">12</span></button>
        <button type="button" class="tds-filter-tab" role="tab" aria-selected="false">Active <span class="tds-counter tds-counter--secondary tds-counter--sm">8</span></button>
        <button type="button" class="tds-filter-tab" role="tab" aria-selected="false">Archived</button>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Nav list</h3>
          <p class="ds-showcase__desc">Sidebar navigation with group headings, descriptions, and active indicator bar.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-nav-list · .tds-nav-item</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="card" style="max-width: 280px; padding: 0;">
        <div class="tds-nav-list">
          <div class="tds-nav-list__heading">Workspace</div>
          <button type="button" class="tds-nav-item tds-nav-item--active">
            <span class="tds-nav-item__current-selection"></span>
            <span>Dashboard</span>
          </button>
          <button type="button" class="tds-nav-item">
            <span>Verifications</span>
            <span class="tds-nav-item__trailing-visual"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 4l4 4-4 4"/></svg></span>
          </button>
          <button type="button" class="tds-nav-item">
            <div class="tds-nav-item__content">
              <span class="tds-nav-item__label">Entities</span>
              <span class="tds-nav-item__description">Manage business entities</span>
            </div>
          </button>
          <div class="tds-nav-list__divider"></div>
          <div class="tds-nav-list__heading">Settings</div>
          <button type="button" class="tds-nav-item tds-nav-item--disabled" disabled><span>Archived</span></button>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Nav item sizes</h3>
          <p class="ds-showcase__desc">Match list density to the container: sidebars use md, nested lists use sm.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-nav-item--{sm|md|lg}</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--white">
<div class="tds-dropdown-panel" style="width: 280px;">
        <button type="button" class="tds-nav-item tds-nav-item--sm"><span>Small 30px</span></button>
        <button type="button" class="tds-nav-item tds-nav-item--md"><span>Medium 34px</span></button>
        <button type="button" class="tds-nav-item tds-nav-item--lg"><span>Large 38px</span></button>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Collapsible nav list</h3>
          <p class="ds-showcase__desc">Expandable sections for grouped navigation.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-nav-list__collapse-trigger</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="card" style="max-width: 280px; padding: 0;">
        <div class="tds-nav-list">
          <button class="tds-nav-list__collapse-trigger" aria-expanded="true" onclick="var c=this.nextElementSibling;var expanded=this.getAttribute('aria-expanded')==='true';this.setAttribute('aria-expanded',!expanded);expanded?c.setAttribute('hidden',''):c.removeAttribute('hidden')">
            <span>Verification types</span>
            <span class="tds-nav-list__collapse-icon"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span>
          </button>
          <div class="tds-nav-list__collapse-content">
            <button type="button" class="tds-nav-item tds-nav-item--sm tds-nav-item--active"><span>KYB</span></button>
            <button type="button" class="tds-nav-item tds-nav-item--sm"><span>KYC</span></button>
            <button type="button" class="tds-nav-item tds-nav-item--sm"><span>AML</span></button>
          </div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Dropdown panel: Figma variants</h3>
          <p class="ds-showcase__desc">DropdownPanel (320:21652) at 172px: menuType text, multiSelect, icon, and flag with section header and Clear all link.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-dropdown-panel · menuType</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--white">
<div class="ds-state-grid ds-state-grid--dropdown-specimens">
        <div class="ds-state-demo"><span class="ds-state-demo__label">menuType=text</span>
        <div class="tds-dropdown-panel" style="width: 172px;">
          <div class="tds-action-list-item"><span class="tds-action-list-item__label">Action list item</span></div>
          <div class="tds-action-list-item"><span class="tds-action-list-item__label">Action list item</span></div>
          <div class="tds-action-list-item"><span class="tds-action-list-item__label">Action list item</span></div>
          <div class="tds-action-list-item"><span class="tds-action-list-item__label">Action list item</span></div>
          <div class="tds-action-list-item"><span class="tds-action-list-item__label">Action list item</span></div>
        </div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">menuType=multiSelect</span>
        <div class="tds-dropdown-panel" style="width: 172px;">
          <button type="button" class="tds-dropdown-panel__header-link">Clear all</button>
          <div class="tds-dropdown-panel__header">Section header</div>
          <label class="tds-action-list-item"><input type="checkbox" class="tds-checkbox"><span class="tds-action-list-item__label">Action list item</span></label>
          <label class="tds-action-list-item"><input type="checkbox" class="tds-checkbox"><span class="tds-action-list-item__label">Action list item</span></label>
          <label class="tds-action-list-item"><input type="checkbox" class="tds-checkbox"><span class="tds-action-list-item__label">Action list item</span></label>
          <label class="tds-action-list-item"><input type="checkbox" class="tds-checkbox"><span class="tds-action-list-item__label">Action list item</span></label>
          <label class="tds-action-list-item"><input type="checkbox" class="tds-checkbox"><span class="tds-action-list-item__label">Action list item</span></label>
        </div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">menuType=icon</span>
        <div class="tds-dropdown-panel" style="width: 172px;">
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
            <span class="tds-action-list-item__label">Action list item</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
            <span class="tds-action-list-item__label">Action list item</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
            <span class="tds-action-list-item__label">Action list item</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
            <span class="tds-action-list-item__label">Action list item</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
            <span class="tds-action-list-item__label">Action list item</span>
          </div>
        </div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">menuType=flag</span>
        <div class="tds-dropdown-panel" style="width: 172px;">
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual" aria-hidden="true"><span class="fi fi-ca"></span></span>
            <span class="tds-action-list-item__label">Action list item</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual" aria-hidden="true"><span class="fi fi-us"></span></span>
            <span class="tds-action-list-item__label">Action list item</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual" aria-hidden="true"><span class="fi fi-gb"></span></span>
            <span class="tds-action-list-item__label">Action list item</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual" aria-hidden="true"><span class="fi fi-fr"></span></span>
            <span class="tds-action-list-item__label">Action list item</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual" aria-hidden="true"><span class="fi fi-de"></span></span>
            <span class="tds-action-list-item__label">Action list item</span>
          </div>
        </div></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Dropdown panel: Plain list</h3>
          <p class="ds-showcase__desc">Simple action menu: one tap per item.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-dropdown-panel</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--white">
<div class="row" style="align-items: flex-start; gap: 24px; flex-wrap: wrap;">
        <div class="tds-dropdown-panel" style="width: 200px;">
          <div class="tds-action-list-item"><span class="tds-action-list-item__label">Dashboard</span></div>
          <div class="tds-action-list-item"><span class="tds-action-list-item__label">Verifications</span></div>
          <div class="tds-action-list-item"><span class="tds-action-list-item__label">Entities</span></div>
          <div class="tds-action-list-item"><span class="tds-action-list-item__label">Reports</span></div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Dropdown panel: With header & divider</h3>
          <p class="ds-showcase__desc">Grouped actions with a labeled header and destructive item separated by divider.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-dropdown-panel__header</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--white">
<div class="row" style="align-items: flex-start; gap: 24px;">
        <div class="tds-dropdown-panel" style="width: 220px;">
          <div class="tds-dropdown-panel__header">Actions</div>
          <div class="tds-action-list-item"><span class="tds-action-list-item__label">Edit profile</span></div>
          <div class="tds-action-list-item"><span class="tds-action-list-item__label">View history</span></div>
          <div class="tds-dropdown-panel__divider"></div>
          <div class="tds-action-list-item" style="color: var(--text-negative);"><span class="tds-action-list-item__label">Delete</span></div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Dropdown panel: Single-select (checkmark)</h3>
          <p class="ds-showcase__desc">One selection with visible checkmark. Use for country or sort pickers.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-action-list-item--selected</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--white">
<div class="row" style="align-items: flex-start; gap: 24px;">
        <div class="tds-dropdown-panel" style="width: 220px;">
          <div class="tds-dropdown-panel__header">Select country</div>
          <div class="tds-action-list-item tds-action-list-item--selected">
            <span class="tds-action-list-item__check"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span>
            <span class="tds-action-list-item__label">Canada</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__check"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span>
            <span class="tds-action-list-item__label">United States</span>
          </div>
          <div class="tds-dropdown-panel__divider"></div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__check"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span>
            <div class="tds-action-list-item__content">
              <span class="tds-action-list-item__label">United Kingdom</span>
              <span class="tds-action-list-item__description">Requires enhanced verification</span>
            </div>
          </div>
          <div class="tds-action-list-item tds-action-list-item--disabled">
            <span class="tds-action-list-item__check"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span>
            <span class="tds-action-list-item__label">Australia (unavailable)</span>
          </div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Dropdown panel: With checkboxes (multi-select)</h3>
          <p class="ds-showcase__desc">Filter multiple values: entire row is a label, not just the checkbox.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">label.tds-action-list-item</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--white">
<div class="row" style="align-items: flex-start; gap: 24px;">
        <div class="tds-dropdown-panel" style="width: 240px;">
          <button type="button" class="tds-dropdown-panel__header-link">Clear all</button>
          <div class="tds-dropdown-panel__header">Filter by status</div>
          <label class="tds-action-list-item">
            <input type="checkbox" class="tds-checkbox" checked>
            <span class="tds-action-list-item__label">Verified</span>
          </label>
          <label class="tds-action-list-item">
            <input type="checkbox" class="tds-checkbox" checked>
            <span class="tds-action-list-item__label">Pending</span>
          </label>
          <label class="tds-action-list-item">
            <input type="checkbox" class="tds-checkbox">
            <span class="tds-action-list-item__label">Rejected</span>
          </label>
          <label class="tds-action-list-item">
            <input type="checkbox" class="tds-checkbox">
            <span class="tds-action-list-item__label">Draft</span>
          </label>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Dropdown panel: With radio buttons (single-select)</h3>
          <p class="ds-showcase__desc">Radio list inside a panel: label wraps the full row for larger hit targets.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">label.tds-action-list-item</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--white">
<div class="row" style="align-items: flex-start; gap: 24px;">
        <div class="tds-dropdown-panel" style="width: 240px;">
          <div class="tds-dropdown-panel__header">Sort by</div>
          <label class="tds-action-list-item tds-action-list-item--selected">
            <input type="radio" name="dd-radio" class="tds-radio" checked>
            <span class="tds-action-list-item__label">Date created</span>
          </label>
          <label class="tds-action-list-item">
            <input type="radio" name="dd-radio" class="tds-radio">
            <span class="tds-action-list-item__label">Name (A–Z)</span>
          </label>
          <label class="tds-action-list-item">
            <input type="radio" name="dd-radio" class="tds-radio">
            <span class="tds-action-list-item__label">Risk level</span>
          </label>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Dropdown panel: With leading icons</h3>
          <p class="ds-showcase__desc">Icon reinforces meaning before the label text.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-action-list-item__leading-visual</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--white">
<div class="row" style="align-items: flex-start; gap: 24px;">
        <div class="tds-dropdown-panel" style="width: 240px;">
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
            <span>Happy</span>
          </div>
          <div class="tds-action-list-item tds-action-list-item--selected">
            <span class="tds-action-list-item__leading-visual"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5.5 10h5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
            <span class="tds-action-list-item__label">Neutral</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 11c.8-1.2 2-1.8 3-1.8s2.2.6 3 1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
            <span class="tds-action-list-item__label">Sad</span>
          </div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Dropdown panel: With colored leading visuals</h3>
          <p class="ds-showcase__desc">Swatches and flags as leading visuals for color/region pickers.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-action-list-item__leading-visual</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--white">
<div class="row" style="align-items: flex-start; gap: 24px;">
        <div class="tds-dropdown-panel" style="width: 220px;">
          <div class="tds-dropdown-panel__header">Label color</div>
          <div class="tds-action-list-item tds-action-list-item--selected">
            <span class="tds-action-list-item__leading-visual"><span style="display:block;width:14px;height:14px;border-radius:3px;background:var(--color-teal-60);"></span></span>
            <span class="tds-action-list-item__label">Teal</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual"><span style="display:block;width:14px;height:14px;border-radius:3px;background:var(--color-violet-60);"></span></span>
            <span class="tds-action-list-item__label">Violet</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual"><span style="display:block;width:14px;height:14px;border-radius:3px;background:var(--color-amber-border);"></span></span>
            <span class="tds-action-list-item__label">Amber</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual"><span style="display:block;width:14px;height:14px;border-radius:3px;background:var(--color-red-border);"></span></span>
            <span class="tds-action-list-item__label">Red</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual"><span style="display:block;width:14px;height:14px;border-radius:3px;background:var(--color-green-border);"></span></span>
            <span class="tds-action-list-item__label">Green</span>
          </div>
        </div>

        <div class="tds-dropdown-panel" style="width: 220px;">
          <div class="tds-dropdown-panel__header">Region</div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual"><span class="fi fi-ca"></span></span>
            <span class="tds-action-list-item__label">Canada</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual"><span class="fi fi-us"></span></span>
            <span class="tds-action-list-item__label">United States</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual"><span class="fi fi-gb"></span></span>
            <span class="tds-action-list-item__label">United Kingdom</span>
          </div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Progress indicator: item states</h3>
          <p class="ds-showcase__desc">Individual step anatomy with progress line, numbered badge, heading, and optional caption (Figma 1238:21018).</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-progress-indicator__item--{state}</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--spacing-24);">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Incomplete</span>
<ol class="tds-progress-indicator tds-progress-indicator--horizontal" aria-label="Step states">
  <li class="tds-progress-indicator__item tds-progress-indicator__item--incomplete">
    <div class="tds-progress-indicator__line" aria-hidden="true"></div>
    <div class="tds-progress-indicator__content">
      <div class="tds-progress-indicator__label-row">
        <span class="tds-progress-indicator__icon" aria-hidden="true"><span class="tds-progress-indicator__icon-badge">1</span></span>
        <span class="tds-progress-indicator__title">Step</span>
      </div>
      <p class="tds-progress-indicator__caption">Optional label</p>
    </div>
  </li>
</ol></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Current</span>
<ol class="tds-progress-indicator tds-progress-indicator--horizontal" aria-label="Step states">
  <li class="tds-progress-indicator__item tds-progress-indicator__item--current">
    <div class="tds-progress-indicator__line" aria-hidden="true"></div>
    <div class="tds-progress-indicator__content">
      <div class="tds-progress-indicator__label-row">
        <span class="tds-progress-indicator__icon" aria-hidden="true"><span class="tds-progress-indicator__icon-badge">1</span></span>
        <span class="tds-progress-indicator__title">Step</span>
      </div>
      <p class="tds-progress-indicator__caption">Optional label</p>
    </div>
  </li>
</ol></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Completed</span>
<ol class="tds-progress-indicator tds-progress-indicator--horizontal" aria-label="Step states">
  <li class="tds-progress-indicator__item tds-progress-indicator__item--completed">
    <div class="tds-progress-indicator__line" aria-hidden="true"></div>
    <div class="tds-progress-indicator__content">
      <div class="tds-progress-indicator__label-row">
        <span class="tds-progress-indicator__icon" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.707 7.293-5.5 5.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414L8.5 10.586l4.793-4.793a1 1 0 0 1 1.414 1.414z"/></svg></span>
        <span class="tds-progress-indicator__title">Step</span>
      </div>
      <p class="tds-progress-indicator__caption">Optional label</p>
    </div>
  </li>
</ol></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Error</span>
<ol class="tds-progress-indicator tds-progress-indicator--horizontal" aria-label="Step states">
  <li class="tds-progress-indicator__item tds-progress-indicator__item--error">
    <div class="tds-progress-indicator__line" aria-hidden="true"></div>
    <div class="tds-progress-indicator__content">
      <div class="tds-progress-indicator__label-row">
        <span class="tds-progress-indicator__icon" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 14H9v-2h2v2zm0-4H9V5h2v5z"/></svg></span>
        <span class="tds-progress-indicator__title">Step</span>
      </div>
      <p class="tds-progress-indicator__caption">Optional label</p>
    </div>
  </li>
</ol></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Disabled</span>
<ol class="tds-progress-indicator tds-progress-indicator--horizontal" aria-label="Step states">
  <li class="tds-progress-indicator__item tds-progress-indicator__item--disabled">
    <div class="tds-progress-indicator__line" aria-hidden="true"></div>
    <div class="tds-progress-indicator__content">
      <div class="tds-progress-indicator__label-row">
        <span class="tds-progress-indicator__icon" aria-hidden="true"><span class="tds-progress-indicator__icon-badge">1</span></span>
        <span class="tds-progress-indicator__title">Step</span>
      </div>
      <p class="tds-progress-indicator__caption">Optional label</p>
    </div>
  </li>
</ol></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Skeleton</span>
<ol class="tds-progress-indicator tds-progress-indicator--horizontal" aria-label="Step states">
  <li class="tds-progress-indicator__item tds-progress-indicator__item--skeleton">
    <div class="tds-progress-indicator__line" aria-hidden="true"></div>
    <div class="tds-progress-indicator__content">
      <div class="tds-progress-indicator__label-row">
        <span class="tds-progress-indicator__icon" aria-hidden="true"><span class="tds-progress-indicator__icon-badge"></span></span>
        <span class="tds-progress-indicator__skeleton-title" aria-hidden="true"></span>
      </div>
      <p class="tds-progress-indicator__caption">Optional label</p>
    </div>
  </li>
</ol></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Progress indicator: horizontal</h3>
          <p class="ds-showcase__desc">Multi-step KYB flow with 4 steps: completed, current, and upcoming (Figma 1242:22104).</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-progress-indicator--horizontal</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--white">
<ol class="tds-progress-indicator tds-progress-indicator--horizontal" aria-label="KYB verification progress">
  <li class="tds-progress-indicator__item tds-progress-indicator__item--completed">
    <div class="tds-progress-indicator__line" aria-hidden="true"></div>
    <div class="tds-progress-indicator__content">
      <div class="tds-progress-indicator__label-row">
        <span class="tds-progress-indicator__icon" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.707 7.293-5.5 5.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414L8.5 10.586l4.793-4.793a1 1 0 0 1 1.414 1.414z"/></svg></span>
        <span class="tds-progress-indicator__title">Business details</span>
      </div>
      <p class="tds-progress-indicator__caption">Entity information</p>
    </div>
  </li>
  <li class="tds-progress-indicator__item tds-progress-indicator__item--current" aria-current="step">
    <div class="tds-progress-indicator__line" aria-hidden="true"></div>
    <div class="tds-progress-indicator__content">
      <div class="tds-progress-indicator__label-row">
        <span class="tds-progress-indicator__icon" aria-hidden="true"><span class="tds-progress-indicator__icon-badge">2</span></span>
        <span class="tds-progress-indicator__title">Ownership</span>
      </div>
      <p class="tds-progress-indicator__caption">UBO verification</p>
    </div>
  </li>
  <li class="tds-progress-indicator__item tds-progress-indicator__item--incomplete">
    <div class="tds-progress-indicator__line" aria-hidden="true"></div>
    <div class="tds-progress-indicator__content">
      <div class="tds-progress-indicator__label-row">
        <span class="tds-progress-indicator__icon" aria-hidden="true"><span class="tds-progress-indicator__icon-badge">3</span></span>
        <span class="tds-progress-indicator__title">Documents</span>
      </div>
      <p class="tds-progress-indicator__caption">Upload filings</p>
    </div>
  </li>
  <li class="tds-progress-indicator__item tds-progress-indicator__item--incomplete">
    <div class="tds-progress-indicator__line" aria-hidden="true"></div>
    <div class="tds-progress-indicator__content">
      <div class="tds-progress-indicator__label-row">
        <span class="tds-progress-indicator__icon" aria-hidden="true"><span class="tds-progress-indicator__icon-badge">4</span></span>
        <span class="tds-progress-indicator__title">Review</span>
      </div>
      <p class="tds-progress-indicator__caption">Final decision</p>
    </div>
  </li>
</ol>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Progress indicator: vertical</h3>
          <p class="ds-showcase__desc">Vertical layout for sidebar or narrow panels: same states and anatomy.</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-progress-indicator--vertical</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--white">
<ol class="tds-progress-indicator tds-progress-indicator--vertical" aria-label="KYB verification progress">
  <li class="tds-progress-indicator__item tds-progress-indicator__item--completed">
    <div class="tds-progress-indicator__line" aria-hidden="true"></div>
    <div class="tds-progress-indicator__content">
      <div class="tds-progress-indicator__label-row">
        <span class="tds-progress-indicator__icon" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.707 7.293-5.5 5.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414L8.5 10.586l4.793-4.793a1 1 0 0 1 1.414 1.414z"/></svg></span>
        <span class="tds-progress-indicator__title">Business details</span>
      </div>
      <p class="tds-progress-indicator__caption">Entity information</p>
    </div>
  </li>
  <li class="tds-progress-indicator__item tds-progress-indicator__item--current" aria-current="step">
    <div class="tds-progress-indicator__line" aria-hidden="true"></div>
    <div class="tds-progress-indicator__content">
      <div class="tds-progress-indicator__label-row">
        <span class="tds-progress-indicator__icon" aria-hidden="true"><span class="tds-progress-indicator__icon-badge">2</span></span>
        <span class="tds-progress-indicator__title">Ownership</span>
      </div>
      <p class="tds-progress-indicator__caption">UBO verification</p>
    </div>
  </li>
  <li class="tds-progress-indicator__item tds-progress-indicator__item--error">
    <div class="tds-progress-indicator__line" aria-hidden="true"></div>
    <div class="tds-progress-indicator__content">
      <div class="tds-progress-indicator__label-row">
        <span class="tds-progress-indicator__icon" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 14H9v-2h2v2zm0-4H9V5h2v5z"/></svg></span>
        <span class="tds-progress-indicator__title">Documents</span>
      </div>
      <p class="tds-progress-indicator__caption">Upload required</p>
    </div>
  </li>
  <li class="tds-progress-indicator__item tds-progress-indicator__item--disabled">
    <div class="tds-progress-indicator__line" aria-hidden="true"></div>
    <div class="tds-progress-indicator__content">
      <div class="tds-progress-indicator__label-row">
        <span class="tds-progress-indicator__icon" aria-hidden="true"><span class="tds-progress-indicator__icon-badge">4</span></span>
        <span class="tds-progress-indicator__title">Review</span>
      </div>
      <p class="tds-progress-indicator__caption">Final decision</p>
    </div>
  </li>
</ol>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Side nav: Nav item</h3>
          <p class="ds-showcase__desc">Top-level items: default and active (expanded) with optional chevron for expandable groups.</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-side-nav__nav-item</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--flush">
<div class="ds-state-grid" style="grid-template-columns: 1fr; gap: var(--spacing-16); max-width: 240px;">
            <div class="ds-state-demo"><span class="ds-state-demo__label">Default</span><button type="button" class="tds-side-nav__nav-item"><span class="tds-side-nav__nav-item-label"><span class="tds-side-nav__nav-item-icon"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6.5 8 2l5.5 4.5V13a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V6.5z"/><path d="M6 14V9h4v5"/></svg></span><span class="tds-side-nav__nav-item-text">Home</span></span></button></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Hover</span><button type="button" class="tds-side-nav__nav-item tds-side-nav__nav-item--hover-demo"><span class="tds-side-nav__nav-item-label"><span class="tds-side-nav__nav-item-icon"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6.5 8 2l5.5 4.5V13a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V6.5z"/><path d="M6 14V9h4v5"/></svg></span><span class="tds-side-nav__nav-item-text">Home</span></span></button></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Active · expanded</span><button type="button" class="tds-side-nav__nav-item tds-side-nav__nav-item--active" aria-current="page"><span class="tds-side-nav__nav-item-label"><span class="tds-side-nav__nav-item-icon"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 2.5h4l1 3h2.5v2H2.5v-2H5l1-3zM4.5 9.5h7v4.5h-7V9.5z"/></svg></span><span class="tds-side-nav__nav-item-text">Labs</span></span><span class="tds-side-nav__nav-item-chevron"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 10l4-4 4 4"/></svg></span></button></div>
          </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Side nav: Sub item</h3>
          <p class="ds-showcase__desc">Nested items under an expanded group: default, hover, and selected states.</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-side-nav__sub-item</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--flush">
<div class="ds-state-grid" style="grid-template-columns: 1fr; gap: var(--spacing-16); max-width: 200px;">
            <div class="ds-state-demo"><span class="ds-state-demo__label">Default</span><button type="button" class="tds-side-nav__sub-item"><span class="tds-side-nav__sub-item-icon"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="6.5 6.5 18.0 19.0" fill="none" aria-hidden="true"> <path d="M13.5 14.5C14.875 14.5 16 13.375 16 12C16 10.625 14.875 9.5 13.5 9.5C12.125 9.5 11 10.625 11 12C11 13.375 12.125 14.5 13.5 14.5ZM13.5 8C15.7188 8 17.5 9.78125 17.5 12C17.5 14.2188 15.7188 16 13.5 16C11.2812 16 9.5 14.2188 9.5 12C9.5 9.78125 11.2812 8 13.5 8ZM12.5 19C10.2812 19 8.5 20.7812 8.5 23V23.25C8.5 23.6562 8.15625 24 7.75 24C7.34375 24 7 23.6562 7 23.25V23C7 19.9688 9.46875 17.5 12.5 17.5H14.5C17.5312 17.5 20 19.9688 20 23V23.25C20 23.6562 19.6562 24 19.25 24C18.8438 24 18.5 23.6562 18.5 23.25V23C18.5 20.7812 16.7188 19 14.5 19H12.5ZM17.7188 15.5312C18.0625 15.125 18.3125 14.7188 18.5312 14.25C18.8125 14.4062 19.1562 14.5 19.5 14.5C20.5938 14.5 21.5 13.5938 21.5 12.5C21.5 11.4062 20.5938 10.5 19.5 10.5C19.25 10.5 19.0312 10.5312 18.8125 10.625C18.6875 10.125 18.5 9.65625 18.25 9.21875C18.6562 9.09375 19.0625 9 19.5 9C21.4375 9 23 10.5625 23 12.5C23 14.4375 21.4375 16 19.5 16C18.8438 16 18.25 15.8125 17.7188 15.5312ZM20.625 19.5938C20.2812 19 19.875 18.4688 19.4062 18H19.75C22.6562 18 25 20.3438 25 23.25C25 23.6562 24.6562 24 24.25 24C23.8438 24 23.5 23.6562 23.5 23.25C23.5 21.4688 22.2812 20 20.625 19.5938Z" fill="currentColor"/> </svg></span><span class="tds-side-nav__sub-item-text">UBO Agent</span></button></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Hover</span><button type="button" class="tds-side-nav__sub-item tds-side-nav__sub-item--hover-demo"><span class="tds-side-nav__sub-item-icon"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="6.5 6.5 18.0 19.0" fill="none" aria-hidden="true"> <path d="M13.5 14.5C14.875 14.5 16 13.375 16 12C16 10.625 14.875 9.5 13.5 9.5C12.125 9.5 11 10.625 11 12C11 13.375 12.125 14.5 13.5 14.5ZM13.5 8C15.7188 8 17.5 9.78125 17.5 12C17.5 14.2188 15.7188 16 13.5 16C11.2812 16 9.5 14.2188 9.5 12C9.5 9.78125 11.2812 8 13.5 8ZM12.5 19C10.2812 19 8.5 20.7812 8.5 23V23.25C8.5 23.6562 8.15625 24 7.75 24C7.34375 24 7 23.6562 7 23.25V23C7 19.9688 9.46875 17.5 12.5 17.5H14.5C17.5312 17.5 20 19.9688 20 23V23.25C20 23.6562 19.6562 24 19.25 24C18.8438 24 18.5 23.6562 18.5 23.25V23C18.5 20.7812 16.7188 19 14.5 19H12.5ZM17.7188 15.5312C18.0625 15.125 18.3125 14.7188 18.5312 14.25C18.8125 14.4062 19.1562 14.5 19.5 14.5C20.5938 14.5 21.5 13.5938 21.5 12.5C21.5 11.4062 20.5938 10.5 19.5 10.5C19.25 10.5 19.0312 10.5312 18.8125 10.625C18.6875 10.125 18.5 9.65625 18.25 9.21875C18.6562 9.09375 19.0625 9 19.5 9C21.4375 9 23 10.5625 23 12.5C23 14.4375 21.4375 16 19.5 16C18.8438 16 18.25 15.8125 17.7188 15.5312ZM20.625 19.5938C20.2812 19 19.875 18.4688 19.4062 18H19.75C22.6562 18 25 20.3438 25 23.25C25 23.6562 24.6562 24 24.25 24C23.8438 24 23.5 23.6562 23.5 23.25C23.5 21.4688 22.2812 20 20.625 19.5938Z" fill="currentColor"/> </svg></span><span class="tds-side-nav__sub-item-text">UBO Agent</span></button></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Selected</span><button type="button" class="tds-side-nav__sub-item tds-side-nav__sub-item--selected" aria-current="page"><span class="tds-side-nav__sub-item-icon"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="6.5 6.5 18.0 19.0" fill="none" aria-hidden="true"> <path d="M13.5 14.5C14.875 14.5 16 13.375 16 12C16 10.625 14.875 9.5 13.5 9.5C12.125 9.5 11 10.625 11 12C11 13.375 12.125 14.5 13.5 14.5ZM13.5 8C15.7188 8 17.5 9.78125 17.5 12C17.5 14.2188 15.7188 16 13.5 16C11.2812 16 9.5 14.2188 9.5 12C9.5 9.78125 11.2812 8 13.5 8ZM12.5 19C10.2812 19 8.5 20.7812 8.5 23V23.25C8.5 23.6562 8.15625 24 7.75 24C7.34375 24 7 23.6562 7 23.25V23C7 19.9688 9.46875 17.5 12.5 17.5H14.5C17.5312 17.5 20 19.9688 20 23V23.25C20 23.6562 19.6562 24 19.25 24C18.8438 24 18.5 23.6562 18.5 23.25V23C18.5 20.7812 16.7188 19 14.5 19H12.5ZM17.7188 15.5312C18.0625 15.125 18.3125 14.7188 18.5312 14.25C18.8125 14.4062 19.1562 14.5 19.5 14.5C20.5938 14.5 21.5 13.5938 21.5 12.5C21.5 11.4062 20.5938 10.5 19.5 10.5C19.25 10.5 19.0312 10.5312 18.8125 10.625C18.6875 10.125 18.5 9.65625 18.25 9.21875C18.6562 9.09375 19.0625 9 19.5 9C21.4375 9 23 10.5625 23 12.5C23 14.4375 21.4375 16 19.5 16C18.8438 16 18.25 15.8125 17.7188 15.5312ZM20.625 19.5938C20.2812 19 19.875 18.4688 19.4062 18H19.75C22.6562 18 25 20.3438 25 23.25C25 23.6562 24.6562 24 24.25 24C23.8438 24 23.5 23.6562 23.5 23.25C23.5 21.4688 22.2812 20 20.625 19.5938Z" fill="currentColor"/> </svg></span><span class="tds-side-nav__sub-item-text">UBO Agent</span></button></div>
          </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Side nav: Section title &amp; divider</h3>
          <p class="ds-showcase__desc">Uppercase group labels and subtle dividers between nested sections.</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-side-nav__section-title · __divider</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--flush">
<div style="max-width: 200px; display: flex; flex-direction: column; gap: var(--spacing-12);">
            <div class="tds-side-nav__section-title">KYB</div>
            <hr class="tds-side-nav__divider">
            <div class="tds-side-nav__section-title">KYC</div>
          </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Side nav: User profile</h3>
          <p class="ds-showcase__desc">Expanded card with name and email, or collapsed avatar-only in the rail.</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-side-nav__profile</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--flush">
<div class="ds-state-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-16);">
            <div class="ds-state-demo"><span class="ds-state-demo__label">Expanded</span><button type="button" class="tds-side-nav__profile"><span class="tds-side-nav__avatar">JD</span><span class="tds-side-nav__profile-info"><span class="tds-side-nav__profile-name-row"><span class="tds-side-nav__profile-name">John Doe</span><span class="tds-side-nav__profile-chevron"><svg class="icon icon--sm" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 4l4 4-4 4"/></svg></span></span><span class="tds-side-nav__profile-email">johndoe@acmeinc.com</span></span></button></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Collapsed</span><button type="button" class="tds-side-nav__profile tds-side-nav__profile--collapsed"><span class="tds-side-nav__avatar">JD</span></button></div>
          </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Side nav: Expanded</h3>
          <p class="ds-showcase__desc">Full workspace rail with brand header, expandable Labs group, KYB/KYC sections, and profile footer (Figma 1187:10323).</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-side-nav · .tds-side-nav--expanded</code>
            <span class="ds-tag">Live example</span>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--side-nav">
<div class="tds-side-nav-preview">
<aside class="tds-side-nav tds-side-nav--demo-figma">
  <div class="tds-side-nav__header">
    <button type="button" class="tds-side-nav__brand" aria-expanded="true">
      <span class="tds-side-nav__logo"><img src="../../assets/trulioo-logo-mark.svg" alt="Trulioo" width="40" height="40"></span>
      <span class="tds-side-nav__brand-expanded">
        <span class="tds-side-nav__brand-logo"><img src="../../assets/trulioo-labs-logo.svg" alt="Trulioo Labs" width="152" height="24"></span>
      </span>
    </button>
  </div>
  <div class="tds-side-nav__main">
    <div class="tds-side-nav__nav-stack">
      <button type="button" class="tds-side-nav__nav-item"><span class="tds-side-nav__nav-item-label"><span class="tds-side-nav__nav-item-icon"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6.5 8 2l5.5 4.5V13a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V6.5z"/><path d="M6 14V9h4v5"/></svg></span><span class="tds-side-nav__nav-item-text">Home</span></span></button>
      <div class="tds-side-nav__nav-group">
        <button type="button" class="tds-side-nav__nav-item tds-side-nav__nav-item--active" aria-current="page" aria-expanded="true"><span class="tds-side-nav__nav-item-label"><span class="tds-side-nav__nav-item-icon"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 2.5h4l1 3h2.5v2H2.5v-2H5l1-3zM4.5 9.5h7v4.5h-7V9.5z"/></svg></span><span class="tds-side-nav__nav-item-text">Labs</span></span><span class="tds-side-nav__nav-item-chevron"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 10l4-4 4 4"/></svg></span></button>
        <div class="tds-side-nav__sub-nav">
          <div class="tds-side-nav__section">
            <div class="tds-side-nav__section-title">KYB</div>
            <div class="tds-side-nav__section-items">
              <button type="button" class="tds-side-nav__sub-item"><span class="tds-side-nav__sub-item-icon"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="6.5 6.5 18.0 19.0" fill="none" aria-hidden="true"> <path d="M13.5 14.5C14.875 14.5 16 13.375 16 12C16 10.625 14.875 9.5 13.5 9.5C12.125 9.5 11 10.625 11 12C11 13.375 12.125 14.5 13.5 14.5ZM13.5 8C15.7188 8 17.5 9.78125 17.5 12C17.5 14.2188 15.7188 16 13.5 16C11.2812 16 9.5 14.2188 9.5 12C9.5 9.78125 11.2812 8 13.5 8ZM12.5 19C10.2812 19 8.5 20.7812 8.5 23V23.25C8.5 23.6562 8.15625 24 7.75 24C7.34375 24 7 23.6562 7 23.25V23C7 19.9688 9.46875 17.5 12.5 17.5H14.5C17.5312 17.5 20 19.9688 20 23V23.25C20 23.6562 19.6562 24 19.25 24C18.8438 24 18.5 23.6562 18.5 23.25V23C18.5 20.7812 16.7188 19 14.5 19H12.5ZM17.7188 15.5312C18.0625 15.125 18.3125 14.7188 18.5312 14.25C18.8125 14.4062 19.1562 14.5 19.5 14.5C20.5938 14.5 21.5 13.5938 21.5 12.5C21.5 11.4062 20.5938 10.5 19.5 10.5C19.25 10.5 19.0312 10.5312 18.8125 10.625C18.6875 10.125 18.5 9.65625 18.25 9.21875C18.6562 9.09375 19.0625 9 19.5 9C21.4375 9 23 10.5625 23 12.5C23 14.4375 21.4375 16 19.5 16C18.8438 16 18.25 15.8125 17.7188 15.5312ZM20.625 19.5938C20.2812 19 19.875 18.4688 19.4062 18H19.75C22.6562 18 25 20.3438 25 23.25C25 23.6562 24.6562 24 24.25 24C23.8438 24 23.5 23.6562 23.5 23.25C23.5 21.4688 22.2812 20 20.625 19.5938Z" fill="currentColor"/> </svg></span><span class="tds-side-nav__sub-item-text">UBO Agent</span></button>
              <button type="button" class="tds-side-nav__sub-item"><span class="tds-side-nav__sub-item-icon"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="7.5 7.5 17.0 17.0" fill="none" aria-hidden="true"> <path d="M12 9.5C11.7188 9.5 11.5 9.71875 11.5 10V22C11.5 22.2812 11.7188 22.5 12 22.5H20C20.2812 22.5 20.5 22.2812 20.5 22V14.5H17.75C16.5 14.5 15.5 13.5 15.5 12.25V9.5H12ZM17 10.125V12.25C17 12.6562 17.3438 13 17.75 13H19.875L17 10.125ZM12 8H16.1875C16.7188 8 17.2188 8.21875 17.5938 8.59375L21.4062 12.4062C21.7812 12.7812 22 13.3125 22 13.8438V22C22 23.0938 21.0938 24 20 24H12C10.9062 24 10 23.0938 10 22V10C10 8.90625 10.9062 8 12 8ZM18.2188 18C18.2188 18.4688 18.0938 18.9375 17.875 19.3125L19.0312 20.4688C19.3125 20.7812 19.3125 21.25 19.0312 21.5312C18.75 21.8438 18.25 21.8438 17.9688 21.5312L16.8125 20.375C16.4062 20.5938 15.9688 20.7188 15.5 20.7188C14 20.7188 12.8125 19.5 12.8125 18C12.8125 16.5 14 15.3125 15.5 15.3125C17 15.3125 18.2188 16.5 18.2188 18ZM15.5 16.6875C14.7812 16.6875 14.1875 17.2812 14.1875 18C14.1875 18.7188 14.7812 19.3125 15.5 19.3125C16.2188 19.3125 16.8125 18.7188 16.8125 18C16.8125 17.2812 16.2188 16.6875 15.5 16.6875Z" fill="currentColor"/> </svg></span><span class="tds-side-nav__sub-item-text">Policy Review</span></button>
              <button type="button" class="tds-side-nav__sub-item"><span class="tds-side-nav__sub-item-icon"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="7.5 7.5 17.0625 17.0625" fill="none" aria-hidden="true"> <path d="M19.5 14.5C19.5 11.75 17.25 9.5 14.5 9.5C11.75 9.5 9.5 11.75 9.5 14.5C9.5 17.25 11.75 19.5 14.5 19.5C17.25 19.5 19.5 17.25 19.5 14.5ZM18.5312 19.5938C17.4375 20.4688 16.0312 21 14.5 21C10.9062 21 8 18.0938 8 14.5C8 10.9062 10.9062 8 14.5 8C18.0938 8 21 10.9062 21 14.5C21 16.0312 20.4688 17.4375 19.5938 18.5312L23.7812 22.7188C24.0625 23 24.0625 23.5 23.7812 23.7812C23.5 24.0625 23 24.0625 22.7188 23.7812L18.5312 19.5938Z" fill="currentColor"/> </svg></span><span class="tds-side-nav__sub-item-text">Deep Search</span></button>
            </div>
          </div>
          <hr class="tds-side-nav__divider">
          <div class="tds-side-nav__section">
            <div class="tds-side-nav__section-title">KYC</div>
            <div class="tds-side-nav__section-items">
              <button type="button" class="tds-side-nav__sub-item tds-side-nav__sub-item--selected" aria-current="page"><span class="tds-side-nav__sub-item-icon"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="7.5 7.5 17.0 17.0" fill="none" aria-hidden="true"> <path d="M16.1875 8C16.7188 8 17.2188 8.21875 17.5938 8.59375L21.4062 12.4062C21.7812 12.7812 22 13.3125 22 13.8125V22C22 23.0938 21.0938 24 20 24H12C10.9062 24 10 23.0938 10 22V10C10 8.90625 10.9062 8 12 8H16.1875ZM12 9.5C11.7188 9.5 11.5 9.71875 11.5 10V22C11.5 22.2812 11.7188 22.5 12 22.5H20C20.2812 22.5 20.5 22.2812 20.5 22V14.5H17.75C16.5 14.5 15.5 13.5 15.5 12.25V9.5H12ZM17.1562 16.25C17.4062 15.9062 17.875 15.8438 18.1875 16.0938C18.5312 16.3125 18.5938 16.7812 18.375 17.125L15.9688 20.4062C15.8438 20.5938 15.6562 20.6875 15.4375 20.7188C15.2188 20.7188 15 20.625 14.8438 20.4688L13.7188 19.3125C13.4375 19.0312 13.4375 18.5312 13.7188 18.25C14.0312 17.9688 14.5 17.9688 14.7812 18.2812L15.2812 18.7812L17.1562 16.25ZM17 12.25C17 12.6562 17.3438 13 17.75 13H19.875L17 10.125V12.25Z" fill="currentColor"/> </svg></span><span class="tds-side-nav__sub-item-text">Document Verification</span></button>
              <button type="button" class="tds-side-nav__sub-item"><span class="tds-side-nav__sub-item-icon"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="7.71875 7.4375 16.84375 17.0625" fill="none" aria-hidden="true"> <path d="M16.4062 8.375L23.6562 13.125C23.9375 13.3125 24.0625 13.6562 23.9688 13.9688C23.875 14.2812 23.5938 14.5 23.25 14.5H22V19.5H22.25C22.6562 19.5 23 19.8438 23 20.25C23 20.6562 22.6562 21 22.25 21H9.75C9.34375 21 9 20.6562 9 20.25C9 19.8438 9.34375 19.5 9.75 19.5H10V14.5H8.75C8.40625 14.5 8.125 14.2812 8.03125 13.9688C7.9375 13.6562 8.0625 13.3125 8.34375 13.125L15.5938 8.375C15.8438 8.21875 16.1562 8.21875 16.4062 8.375ZM13.5 19.5V14.5H11.5V19.5H13.5ZM17 19.5V14.5H15V19.5H17ZM20.5 19.5V14.5H18.5V19.5H20.5ZM15.125 13C15.0625 12.8438 15 12.6875 15 12.5C15 11.9375 15.4375 11.5 16 11.5C16.5625 11.5 17 11.9375 17 12.5C17 12.6875 16.9375 12.8438 16.875 13H20.75L16 9.90625L11.25 13H15.125ZM8 23.25C8 22.8438 8.34375 22.5 8.75 22.5H23.25C23.6562 22.5 24 22.8438 24 23.25C24 23.6562 23.6562 24 23.25 24H8.75C8.34375 24 8 23.6562 8 23.25Z" fill="currentColor"/> </svg></span><span class="tds-side-nav__sub-item-text">Bank Verification</span></button>
              <button type="button" class="tds-side-nav__sub-item"><span class="tds-side-nav__sub-item-icon"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="6.5 6.5 19.0 19.0" fill="none" aria-hidden="true"> <path d="M8.5 21C8.5 21.2812 8.71875 21.5 9 21.5H10C10 20.125 11.125 19 12.5 19H14.5C15.875 19 17 20.125 17 21.5H23C23.2812 21.5 23.5 21.2812 23.5 21V13H8.5V21ZM9 9H23C24.0938 9 25 9.90625 25 11V21C25 22.0938 24.0938 23 23 23H9C7.90625 23 7 22.0938 7 21V11C7 9.90625 7.90625 9 9 9ZM13.5 17.75C12.5312 17.75 11.75 16.9688 11.75 16C11.75 15.0312 12.5312 14.25 13.5 14.25C14.4688 14.25 15.25 15.0312 15.25 16C15.25 16.9688 14.4688 17.75 13.5 17.75ZM18.75 14.5H21.25C21.6562 14.5 22 14.8438 22 15.25C22 15.6562 21.6562 16 21.25 16H18.75C18.3438 16 18 15.6562 18 15.25C18 14.8438 18.3438 14.5 18.75 14.5ZM18.75 17.5H21.25C21.6562 17.5 22 17.8438 22 18.25C22 18.6562 21.6562 19 21.25 19H18.75C18.3438 19 18 18.6562 18 18.25C18 17.8438 18.3438 17.5 18.75 17.5Z" fill="currentColor"/> </svg></span><span class="tds-side-nav__sub-item-text">Electronic ID</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button type="button" class="tds-side-nav__collapse-bar" aria-label="Collapse sidebar"><svg class="icon icon--sm" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M10 4 6 8l4 4M6 4 2 8l4 4"/></svg><span class="tds-side-nav__collapse-label text-label-sm-uppercase">Hide Sidebar</span></button>
  <div class="tds-side-nav__footer">
    <button type="button" class="tds-side-nav__profile"><span class="tds-side-nav__avatar">JD</span><span class="tds-side-nav__profile-info"><span class="tds-side-nav__profile-name-row"><span class="tds-side-nav__profile-name">Jane Doe</span><span class="tds-side-nav__profile-chevron"><svg class="icon icon--sm" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 4l4 4-4 4"/></svg></span></span><span class="tds-side-nav__profile-email">janedoe@trulioo.com</span></span></button>
  </div>
</aside>
</div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Side nav: Collapsed</h3>
          <p class="ds-showcase__desc">72px icon rail: logo, active nav pill, and avatar footer (Figma 1188:10370).</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-side-nav--collapsed</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--side-nav">
<div class="tds-side-nav-preview tds-side-nav-preview--collapsed">
<aside class="tds-side-nav tds-side-nav--collapsed tds-side-nav--demo-figma">
  <div class="tds-side-nav__header">
    <button type="button" class="tds-side-nav__brand" aria-expanded="false">
      <span class="tds-side-nav__logo"><img src="../../assets/trulioo-logo-mark.svg" alt="Trulioo" width="40" height="40"></span>
      <span class="tds-side-nav__brand-expanded">
        <span class="tds-side-nav__brand-logo"><img src="../../assets/trulioo-labs-logo.svg" alt="Trulioo Labs" width="152" height="24"></span>
      </span>
    </button>
  </div>
  <div class="tds-side-nav__main">
    <div class="tds-side-nav__icon-rail">
      <button type="button" class="tds-side-nav__icon-button" aria-label="Home"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6.5 8 2l5.5 4.5V13a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V6.5z"/><path d="M6 14V9h4v5"/></svg></button>
      <button type="button" class="tds-side-nav__icon-button tds-side-nav__icon-button--active" aria-current="page" aria-label="Labs"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 2.5h4l1 3h2.5v2H2.5v-2H5l1-3zM4.5 9.5h7v4.5h-7V9.5z"/></svg></button>
    </div>
  </div>
  <button type="button" class="tds-side-nav__collapse-bar" aria-label="Expand sidebar"><svg class="icon icon--sm" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 4l4 4-4 4M10 4l4 4-4 4"/></svg><span class="tds-side-nav__collapse-label text-label-sm-uppercase">Hide Sidebar</span></button>
  <div class="tds-side-nav__footer">
    <button type="button" class="tds-side-nav__profile tds-side-nav__profile--collapsed"><span class="tds-side-nav__avatar">JD</span></button>
  </div>
</aside>
</div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Side nav: Collapsed hover tooltip</h3>
          <p class="ds-showcase__desc">Icon rail with inverse tooltip on hover (Figma 1201:10370).</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-side-nav__tooltip</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--side-nav ds-showcase__canvas--side-nav-tooltip">
<div class="tds-side-nav-preview tds-side-nav-preview--tooltip">
<aside class="tds-side-nav tds-side-nav--collapsed tds-side-nav--demo-tooltip">
  <div class="tds-side-nav__main">
    <div class="tds-side-nav__icon-rail">
      <button type="button" class="tds-side-nav__icon-button" aria-label="Home">
        <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6.5 8 2l5.5 4.5V13a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V6.5z"/><path d="M6 14V9h4v5"/></svg>
        <span class="tds-side-nav__tooltip tds-side-nav__tooltip--demo"><span class="tds-side-nav__tooltip-caret"></span><span class="tds-side-nav__tooltip-body">Home</span></span>
      </button>
      <button type="button" class="tds-side-nav__icon-button tds-side-nav__icon-button--active" aria-label="Labs">
        <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 2.5h4l1 3h2.5v2H2.5v-2H5l1-3zM4.5 9.5h7v4.5h-7V9.5z"/></svg>
        <span class="tds-side-nav__tooltip tds-side-nav__tooltip--demo"><span class="tds-side-nav__tooltip-caret"></span><span class="tds-side-nav__tooltip-body">Labs</span></span>
      </button>
    </div>
  </div>
</aside>
</div>
        </div>
      </article>      </article>

      </section>`},{id:"disclosure",title:"Accordion",desc:"Expandable sections for progressive disclosure: KYB entity details, verification steps, and nested metadata. Tags and counter sit in the trailing group with action and chevron.",html:`<section class="ds-chapter ds-tab-panel">
      <header class="ds-chapter__header">
        <h2 class="ds-chapter__title">Accordion</h2>
        <p class="ds-chapter__desc">Expandable sections for progressive disclosure: KYB entity details, verification steps, and nested metadata. Tags and counter sit in the trailing group with action and chevron.</p>
      </header>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Anatomy</h3>
          <p class="ds-showcase__desc">Boolean slots from Figma: leadingIcon (left), tags · action · trailingIcon · counter · chevron (right).</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-accordion · __header · __content</code>
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div style="max-width: 600px;">
        <div class="tds-accordion tds-accordion--md tds-accordion--expanded">
          <button type="button" class="tds-accordion__header" aria-expanded="true" onclick="toggleAccordion(this)">
            <span class="tds-accordion__leading">
              <span class="tds-accordion__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.25v3.5M8 5.5h.01" stroke-linecap="round"/></svg></span>
              <span class="tds-accordion__title">Accordion title</span>
            </span>
            <span class="tds-accordion__trailing">
              <span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span>
              <a href="#" class="tds-accordion__action" onclick="event.stopPropagation()">Action</a>
              <span class="tds-accordion__action-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 2.5h7v7M13.5 2.5 7.5 8.5M9.5 13.5h-7v-7"/></svg></span>
              <span class="tds-accordion__counter"><span class="tds-counter tds-counter--primary tds-counter--sm">20</span></span>
              <span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span>
            </span>
          </button>
          <div class="tds-accordion__content">
            <p class="tds-accordion__body">Expanded content goes here.</p>
          </div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Sizes</h3>
          <p class="ds-showcase__desc">Small (12px pad), medium (16px), large (20px): title scales heading/xs → heading/sm → heading/md.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-accordion--{sm|md|lg}</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid" style="grid-template-columns: 1fr; gap: var(--spacing-16);">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Small</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--sm"><button type="button" class="tds-accordion__header" aria-expanded="false" onclick="toggleAccordion(this)"><span class="tds-accordion__leading"><span class="tds-accordion__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.25v3.5M8 5.5h.01" stroke-linecap="round"/></svg></span><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span><a href="#" class="tds-accordion__action" onclick="event.stopPropagation()">Action</a><span class="tds-accordion__action-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 2.5h7v7M13.5 2.5 7.5 8.5M9.5 13.5h-7v-7"/></svg></span><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Medium</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md"><button type="button" class="tds-accordion__header" aria-expanded="false" onclick="toggleAccordion(this)"><span class="tds-accordion__leading"><span class="tds-accordion__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.25v3.5M8 5.5h.01" stroke-linecap="round"/></svg></span><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span><a href="#" class="tds-accordion__action" onclick="event.stopPropagation()">Action</a><span class="tds-accordion__action-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 2.5h7v7M13.5 2.5 7.5 8.5M9.5 13.5h-7v-7"/></svg></span><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Large</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--lg"><button type="button" class="tds-accordion__header" aria-expanded="false" onclick="toggleAccordion(this)"><span class="tds-accordion__leading"><span class="tds-accordion__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.25v3.5M8 5.5h.01" stroke-linecap="round"/></svg></span><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span><a href="#" class="tds-accordion__action" onclick="event.stopPropagation()">Action</a><span class="tds-accordion__action-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 2.5h7v7M13.5 2.5 7.5 8.5M9.5 13.5h-7v-7"/></svg></span><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Interaction states</h3>
          <p class="ds-showcase__desc">Enabled, hover, and focused at medium size: collapsed and expanded pairs. Focus uses 2px teal border.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">:hover · :focus-within · .tds-accordion--expanded</code>
            <span class="ds-tag">Recommended</span>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--spacing-16);">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Enabled · collapsed</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md"><button type="button" class="tds-accordion__header" aria-expanded="false"><span class="tds-accordion__leading"><span class="tds-accordion__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.25v3.5M8 5.5h.01" stroke-linecap="round"/></svg></span><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span><span class="tds-accordion__action">Action</span><span class="tds-accordion__action-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 2.5h7v7M13.5 2.5 7.5 8.5M9.5 13.5h-7v-7"/></svg></span><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Enabled · expanded</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md tds-accordion--expanded"><button type="button" class="tds-accordion__header" aria-expanded="true"><span class="tds-accordion__leading"><span class="tds-accordion__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.25v3.5M8 5.5h.01" stroke-linecap="round"/></svg></span><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span><span class="tds-accordion__action">Action</span><span class="tds-accordion__action-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 2.5h7v7M13.5 2.5 7.5 8.5M9.5 13.5h-7v-7"/></svg></span><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Hover · collapsed</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md tds-accordion--hover-demo"><button type="button" class="tds-accordion__header" aria-expanded="false"><span class="tds-accordion__leading"><span class="tds-accordion__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.25v3.5M8 5.5h.01" stroke-linecap="round"/></svg></span><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span><span class="tds-accordion__action">Action</span><span class="tds-accordion__action-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 2.5h7v7M13.5 2.5 7.5 8.5M9.5 13.5h-7v-7"/></svg></span><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Hover · expanded</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md tds-accordion--expanded tds-accordion--hover-demo"><button type="button" class="tds-accordion__header" aria-expanded="true"><span class="tds-accordion__leading"><span class="tds-accordion__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.25v3.5M8 5.5h.01" stroke-linecap="round"/></svg></span><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span><span class="tds-accordion__action">Action</span><span class="tds-accordion__action-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 2.5h7v7M13.5 2.5 7.5 8.5M9.5 13.5h-7v-7"/></svg></span><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Focused · collapsed</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md tds-accordion--focused"><button type="button" class="tds-accordion__header" aria-expanded="false"><span class="tds-accordion__leading"><span class="tds-accordion__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.25v3.5M8 5.5h.01" stroke-linecap="round"/></svg></span><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span><span class="tds-accordion__action">Action</span><span class="tds-accordion__action-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 2.5h7v7M13.5 2.5 7.5 8.5M9.5 13.5h-7v-7"/></svg></span><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Focused · expanded</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md tds-accordion--expanded tds-accordion--focused"><button type="button" class="tds-accordion__header" aria-expanded="true"><span class="tds-accordion__leading"><span class="tds-accordion__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.25v3.5M8 5.5h.01" stroke-linecap="round"/></svg></span><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span><span class="tds-accordion__action">Action</span><span class="tds-accordion__action-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 2.5h7v7M13.5 2.5 7.5 8.5M9.5 13.5h-7v-7"/></svg></span><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Disabled</h3>
          <p class="ds-showcase__desc">Non-interactive: muted title, tag, action, and icons. Content remains visible when expanded.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-accordion--disabled</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Collapsed</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md tds-accordion--disabled"><button type="button" class="tds-accordion__header" aria-expanded="false" disabled><span class="tds-accordion__leading"><span class="tds-accordion__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.25v3.5M8 5.5h.01" stroke-linecap="round"/></svg></span><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span><span class="tds-accordion__action">Action</span><span class="tds-accordion__action-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 2.5h7v7M13.5 2.5 7.5 8.5M9.5 13.5h-7v-7"/></svg></span><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Expanded</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md tds-accordion--disabled tds-accordion--expanded"><button type="button" class="tds-accordion__header" aria-expanded="true" disabled><span class="tds-accordion__leading"><span class="tds-accordion__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.25v3.5M8 5.5h.01" stroke-linecap="round"/></svg></span><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span><span class="tds-accordion__action">Action</span><span class="tds-accordion__action-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 2.5h7v7M13.5 2.5 7.5 8.5M9.5 13.5h-7v-7"/></svg></span><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
      </div>
        </div>
      </article>

<article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Skeleton loading</h3>
          <p class="ds-showcase__desc">Placeholder bars while section data loads: collapsed hides content panel; expanded shows content skeleton lines.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-accordion--skeleton</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Collapsed</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md tds-accordion--skeleton"><div class="tds-accordion__header"><span class="tds-accordion__leading"><span class="tds-accordion__skeleton-bar tds-accordion__skeleton-bar--icon"></span><span class="tds-accordion__skeleton-bar tds-accordion__skeleton-bar--title"></span></span><span class="tds-accordion__trailing"><span class="tds-accordion__skeleton-bar tds-accordion__skeleton-bar--action"></span></span></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Expanded</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md tds-accordion--skeleton tds-accordion--expanded"><div class="tds-accordion__header"><span class="tds-accordion__leading"><span class="tds-accordion__skeleton-bar tds-accordion__skeleton-bar--icon"></span><span class="tds-accordion__skeleton-bar tds-accordion__skeleton-bar--title"></span></span><span class="tds-accordion__trailing"><span class="tds-accordion__skeleton-bar tds-accordion__skeleton-bar--action"></span></span></div><div class="tds-accordion__content"><span class="tds-accordion__skeleton-bar tds-accordion__skeleton-bar--line"></span><span class="tds-accordion__skeleton-bar tds-accordion__skeleton-bar--line-short"></span></div></div></div></div>
      </div>
        </div>
      </article>


      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Tag counts</h3>
          <p class="ds-showcase__desc">Tags group in the trailing slot: supports 1, 2, or 3 labels with 8px gap.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-accordion__tags</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid" style="grid-template-columns: 1fr; gap: var(--spacing-16);">
        <div class="ds-state-demo"><span class="ds-state-demo__label">1 tag</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md"><button type="button" class="tds-accordion__header" aria-expanded="false"><span class="tds-accordion__leading"><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">2 tags</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md"><button type="button" class="tds-accordion__header" aria-expanded="false"><span class="tds-accordion__leading"><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">3 tags</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md"><button type="button" class="tds-accordion__header" aria-expanded="false"><span class="tds-accordion__leading"><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span><span class="tds-tag tds-tag--sm tds-tag--default">Label</span><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Configuration variants</h3>
          <p class="ds-showcase__desc">Mix optional slots: title-only, with tag, with external action, or full header chrome.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">leadingIcon · tags · action · trailingIcon · counter</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid" style="grid-template-columns: 1fr; gap: var(--spacing-16);">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Title + chevron only</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md"><button type="button" class="tds-accordion__header" aria-expanded="false" onclick="toggleAccordion(this)"><span class="tds-accordion__leading"><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Icon + title + trailing tag</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md"><button type="button" class="tds-accordion__header" aria-expanded="false" onclick="toggleAccordion(this)"><span class="tds-accordion__leading"><span class="tds-accordion__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.25v3.5M8 5.5h.01" stroke-linecap="round"/></svg></span><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Title + external action</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md"><button type="button" class="tds-accordion__header" aria-expanded="false" onclick="toggleAccordion(this)"><span class="tds-accordion__leading"><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><a href="#" class="tds-accordion__action" onclick="event.stopPropagation()">Action</a><span class="tds-accordion__action-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 2.5h7v7M13.5 2.5 7.5 8.5M9.5 13.5h-7v-7"/></svg></span><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Full configuration</span><div style="max-width: 600px;"><div class="tds-accordion tds-accordion--md"><button type="button" class="tds-accordion__header" aria-expanded="false" onclick="toggleAccordion(this)"><span class="tds-accordion__leading"><span class="tds-accordion__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.25v3.5M8 5.5h.01" stroke-linecap="round"/></svg></span><span class="tds-accordion__title">Accordion title</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span><a href="#" class="tds-accordion__action" onclick="event.stopPropagation()">Action</a><span class="tds-accordion__action-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 2.5h7v7M13.5 2.5 7.5 8.5M9.5 13.5h-7v-7"/></svg></span><span class="tds-accordion__counter"><span class="tds-counter tds-counter--primary tds-counter--sm">20</span></span><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span></button><div class="tds-accordion__content"><p class="tds-accordion__body">Expanded content goes here.</p></div></div></div></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">KYB use cases</h3>
          <p class="ds-showcase__desc">Stacked accordions on an entity detail page: verification status, ownership, and async loading.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">Interactive · click header to expand</code>
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div style="max-width: 600px; display: flex; flex-direction: column; gap: var(--spacing-8);">
        <div class="tds-accordion tds-accordion--md tds-accordion--expanded">
          <button type="button" class="tds-accordion__header" aria-expanded="true" onclick="toggleAccordion(this)">
            <span class="tds-accordion__leading">
              <span class="tds-accordion__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M8 1.5l1.8 3.7 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6L8 1.5z"/></svg></span>
              <span class="tds-accordion__title">Business verification</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--positive">Verified</span></span>
              <span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span>
            </span>
          </button>
          <div class="tds-accordion__content">
            <p class="tds-accordion__body">Maple Leaf Logistics Inc. is registered in Ontario with an active CRA business number. Last verified 14 Jun 2026.</p>
          </div>
        </div>
        <div class="tds-accordion tds-accordion--md">
          <button type="button" class="tds-accordion__header" aria-expanded="false" onclick="toggleAccordion(this)">
            <span class="tds-accordion__leading">
              <span class="tds-accordion__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="6" cy="5" r="2.5"/><path d="M1.5 14c0-2.5 2-4.5 4.5-4.5S10.5 11.5 10.5 14M11 6.5h3M12.5 5v3"/></svg></span>
              <span class="tds-accordion__title">Beneficial owners</span></span><span class="tds-accordion__trailing"><span class="tds-accordion__tags"><span class="tds-tag tds-tag--sm tds-tag--default">4 UBOs</span></span>
              <a href="#" class="tds-accordion__action" onclick="event.stopPropagation()">View registry</a>
              <span class="tds-accordion__action-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 2.5h7v7M13.5 2.5 7.5 8.5M9.5 13.5h-7v-7"/></svg></span>
              <span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span>
            </span>
          </button>
          <div class="tds-accordion__content">
            <p class="tds-accordion__body">Sarah Chen (42%), James O'Brien (31%), Northstar Holdings Ltd. (18%), and Priya Sharma (9%): all screened against PEP and sanctions lists.</p>
          </div>
        </div>
        <div class="tds-accordion tds-accordion--md tds-accordion--skeleton">
          <div class="tds-accordion__header">
            <span class="tds-accordion__leading">
              <span class="tds-accordion__skeleton-bar tds-accordion__skeleton-bar--icon"></span>
              <span class="tds-accordion__skeleton-bar tds-accordion__skeleton-bar--title"></span>
            </span>
            <span class="tds-accordion__trailing">
              <span class="tds-accordion__skeleton-bar tds-accordion__skeleton-bar--action"></span>
            </span>
          </div>
        </div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Data field</h3>
          <p class="ds-showcase__desc">Label/value pairs for entity metadata: vertical and horizontal layouts (Figma 856:13029).</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-data-field--{vertical|horizontal}</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--spacing-24);">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Vertical</span>
<div class="tds-data-field">
  <p class="tds-data-field__label">Legal name</p>
  <div class="tds-data-field__content"><div class="tds-data-field__value-row"><p class="tds-data-field__value">Maple Leaf Logistics Inc.</p></div></div>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Vertical + description</span>
<div class="tds-data-field">
  <p class="tds-data-field__label">Business number</p>
  <div class="tds-data-field__content">
    <div class="tds-data-field__value-row"><p class="tds-data-field__value">123456789 RC0001</p></div>
    <p class="tds-data-field__description">CRA registration confirmed 14 Jun 2026.</p>
  </div>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Horizontal</span>
<div class="tds-data-field tds-data-field--horizontal">
  <div class="tds-data-field__label-row"><p class="tds-data-field__label">Province</p></div>
  <div class="tds-data-field__content"><div class="tds-data-field__value-row"><p class="tds-data-field__value">Ontario</p></div></div>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Horizontal + tag</span>
<div class="tds-data-field tds-data-field--horizontal">
  <div class="tds-data-field__label-row"><p class="tds-data-field__label">Risk level</p></div>
  <div class="tds-data-field__content"><div class="tds-data-field__value-row"><p class="tds-data-field__value">Medium</p><span class="tds-tag tds-tag--sm tds-tag--intermediate">Review</span></div></div>
</div></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Accordion / DataFieldList</h3>
          <p class="ds-showcase__desc">Horizontal data fields inside accordion content with optional dividers (Figma 1034:11268).</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-accordion__data-field-list</code></div>
        </div>
        <div class="ds-showcase__canvas">
<div style="max-width: 516px;">
  <div class="tds-accordion tds-accordion--md tds-accordion--expanded">
    <button type="button" class="tds-accordion__header" aria-expanded="true">
      <span class="tds-accordion__leading"><span class="tds-accordion__title">Entity details</span></span>
      <span class="tds-accordion__trailing"><span class="tds-accordion__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg></span></span>
    </button>
    <div class="tds-accordion__content">
      <div class="tds-accordion__data-field-list">
        <div class="tds-data-field tds-data-field--horizontal"><div class="tds-data-field__label-row"><p class="tds-data-field__label">Legal name</p></div><div class="tds-data-field__content"><div class="tds-data-field__value-row"><p class="tds-data-field__value">Maple Leaf Logistics Inc.</p></div></div></div>
        <hr class="tds-accordion__data-field-divider">
        <div class="tds-data-field tds-data-field--horizontal"><div class="tds-data-field__label-row"><p class="tds-data-field__label">Jurisdiction</p></div><div class="tds-data-field__content"><div class="tds-data-field__value-row"><p class="tds-data-field__value">Ontario, Canada</p></div></div></div>
        <hr class="tds-accordion__data-field-divider">
        <div class="tds-data-field tds-data-field--horizontal"><div class="tds-data-field__label-row"><p class="tds-data-field__label">Incorporated</p></div><div class="tds-data-field__content"><div class="tds-data-field__value-row"><p class="tds-data-field__value">12 Mar 2018</p></div></div></div>
      </div>
    </div>
  </div>
</div>
        </div>
      </article>

      <header class="ds-chapter__header">
        <h2 class="ds-chapter__title">Dialog</h2>
        <p class="ds-chapter__desc">Overlay panels with backdrop, header slots, scrollable body, and footer actions: centered modals, edge drawers, bottom sheets, and full-screen layouts for KYB confirmations and detail views.</p>
      </header>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Anatomy</h3>
          <p class="ds-showcase__desc">Header (title, optional badge, trailing actions, dismiss), scrollable body, and footer with optional label/caption plus up to three buttons.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-dialog · __header · __body · __footer</code>
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div class="tds-dialog tds-dialog--inline tds-dialog--center tds-dialog--md" role="presentation">
  <div class="tds-dialog__backdrop">
    <div class="tds-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="dialog-anatomy-title">
      <header class="tds-dialog__header">
        <div class="tds-dialog__header-row">
          <button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md" aria-label="Information"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.25v3.5M8 5.5h.01" stroke-linecap="round"/></svg></span></button>
          <h2 class="tds-dialog__title" id="dialog-anatomy-title">Dialog title</h2>
          <span class="tds-dialog__badge">Badge</span>
          <span class="tds-dialog__header-actions">
            <button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md" aria-label="More options"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="currentColor"><circle cx="3.5" cy="8" r="1.25"/><circle cx="8" cy="8" r="1.25"/><circle cx="12.5" cy="8" r="1.25"/></svg></span></button>
            <button type="button" class="tds-btn tds-btn--secondary tds-btn--sm">Button</button>
            <button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss dialog"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button>
          </span>
        </div>
        <div class="tds-dialog__divider" role="presentation"></div>
      </header>
      <div class="tds-dialog__body">
        <p class="tds-dialog__text">Dialog content goes here. Use the body slot for forms, entity summaries, or verification details.</p>
      </div>
      <footer class="tds-dialog__footer">
        <div class="tds-dialog__divider" role="presentation"></div>
        <div class="tds-dialog__footer-row">
          <div class="tds-dialog__footer-meta">
            <p class="tds-dialog__footer-label">Footer label</p>
            <p class="tds-dialog__footer-caption">Optional caption text</p>
          </div>
          <div class="tds-dialog__actions">
            <button type="button" class="tds-btn tds-btn--invisible tds-btn--md">Button</button>
            <button type="button" class="tds-btn tds-btn--secondary tds-btn--md">Button</button>
            <button type="button" class="tds-btn tds-btn--primary tds-btn--md">Button</button>
          </div>
        </div>
      </footer>
    </div>
  </div>
</div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Center sizes</h3>
          <p class="ds-showcase__desc">Small (320px), medium (480px), large (640px), and xlarge (960px) centered modals with 12px corner radius and elevation-xl shadow.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-dialog--{sm|md|lg|xl}.tds-dialog--center</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--spacing-24);">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Small · 320px</span>
<div class="tds-dialog tds-dialog--inline tds-dialog--center tds-dialog--sm" role="presentation"><div class="tds-dialog__backdrop"><div class="tds-dialog__panel" role="dialog" aria-labelledby="dialog-sm-title"><header class="tds-dialog__header"><div class="tds-dialog__header-row"><h2 class="tds-dialog__title" id="dialog-sm-title">Dialog title</h2><button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button></div><div class="tds-dialog__divider" role="presentation"></div></header><div class="tds-dialog__body"><p class="tds-dialog__text">Compact confirmation or alert copy.</p></div><footer class="tds-dialog__footer"><div class="tds-dialog__divider" role="presentation"></div><div class="tds-dialog__footer-row tds-dialog__footer-row--actions-only"><div class="tds-dialog__actions"><button type="button" class="tds-btn tds-btn--secondary tds-btn--md">Cancel</button><button type="button" class="tds-btn tds-btn--primary tds-btn--md">Confirm</button></div></div></footer></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Medium · 480px</span>
<div class="tds-dialog tds-dialog--inline tds-dialog--center tds-dialog--md" role="presentation"><div class="tds-dialog__backdrop"><div class="tds-dialog__panel" role="dialog" aria-labelledby="dialog-md-title"><header class="tds-dialog__header"><div class="tds-dialog__header-row"><h2 class="tds-dialog__title" id="dialog-md-title">Dialog title</h2><button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button></div><div class="tds-dialog__divider" role="presentation"></div></header><div class="tds-dialog__body"><p class="tds-dialog__text">Default size for forms and entity detail summaries.</p></div><footer class="tds-dialog__footer"><div class="tds-dialog__divider" role="presentation"></div><div class="tds-dialog__footer-row tds-dialog__footer-row--actions-only"><div class="tds-dialog__actions"><button type="button" class="tds-btn tds-btn--primary tds-btn--md">Save</button></div></div></footer></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Large · 640px</span>
<div class="tds-dialog tds-dialog--inline tds-dialog--center tds-dialog--lg" role="presentation"><div class="tds-dialog__backdrop"><div class="tds-dialog__panel" role="dialog" aria-labelledby="dialog-lg-title"><header class="tds-dialog__header"><div class="tds-dialog__header-row"><h2 class="tds-dialog__title" id="dialog-lg-title">Dialog title</h2><button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button></div><div class="tds-dialog__divider" role="presentation"></div></header><div class="tds-dialog__body"><p class="tds-dialog__text">Wider layout for multi-column content or data tables inside the dialog body.</p></div><footer class="tds-dialog__footer"><div class="tds-dialog__divider" role="presentation"></div><div class="tds-dialog__footer-row tds-dialog__footer-row--actions-only"><div class="tds-dialog__actions"><button type="button" class="tds-btn tds-btn--primary tds-btn--md">Continue</button></div></div></footer></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Xlarge · 960px</span>
<div class="tds-dialog tds-dialog--inline tds-dialog--center tds-dialog--xl" role="presentation"><div class="tds-dialog__backdrop"><div class="tds-dialog__panel" role="dialog" aria-labelledby="dialog-xl-title"><header class="tds-dialog__header"><div class="tds-dialog__header-row"><h2 class="tds-dialog__title" id="dialog-xl-title">Dialog title</h2><button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button></div><div class="tds-dialog__divider" role="presentation"></div></header><div class="tds-dialog__body"><p class="tds-dialog__text">Maximum width for rich workflows: document review, ownership graphs, or multi-step KYB flows.</p></div><footer class="tds-dialog__footer"><div class="tds-dialog__divider" role="presentation"></div><div class="tds-dialog__footer-row tds-dialog__footer-row--actions-only"><div class="tds-dialog__actions"><button type="button" class="tds-btn tds-btn--primary tds-btn--md">Review</button></div></div></footer></div></div></div></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Positions</h3>
          <p class="ds-showcase__desc">Left/right drawers (296–640px by size), bottom sheet (full width), and full-screen takeover. Drawers are full viewport height with square corners.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-dialog--{left|right|bottom|full|center}</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--spacing-24);">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Left drawer · sm</span>
<div class="tds-dialog tds-dialog--inline tds-dialog--left tds-dialog--sm" role="presentation"><div class="tds-dialog__backdrop"><div class="tds-dialog__panel" role="dialog" aria-labelledby="dialog-left-title"><header class="tds-dialog__header"><div class="tds-dialog__header-row"><h2 class="tds-dialog__title" id="dialog-left-title">Dialog title</h2><button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button></div><div class="tds-dialog__divider" role="presentation"></div></header><div class="tds-dialog__body"><p class="tds-dialog__text">Filters or navigation panel anchored to the left edge.</p></div><footer class="tds-dialog__footer"><div class="tds-dialog__divider" role="presentation"></div><div class="tds-dialog__footer-row tds-dialog__footer-row--actions-only"><div class="tds-dialog__actions"><button type="button" class="tds-btn tds-btn--primary tds-btn--md">Apply</button></div></div></footer></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Right drawer · md</span>
<div class="tds-dialog tds-dialog--inline tds-dialog--right tds-dialog--md" role="presentation"><div class="tds-dialog__backdrop"><div class="tds-dialog__panel" role="dialog" aria-labelledby="dialog-right-title"><header class="tds-dialog__header"><div class="tds-dialog__header-row"><h2 class="tds-dialog__title" id="dialog-right-title">Entity details</h2><button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button></div><div class="tds-dialog__divider" role="presentation"></div></header><div class="tds-dialog__body"><p class="tds-dialog__text">Detail panel for UBO profiles, document metadata, or audit trails.</p></div><footer class="tds-dialog__footer"><div class="tds-dialog__divider" role="presentation"></div><div class="tds-dialog__footer-row tds-dialog__footer-row--actions-only"><div class="tds-dialog__actions"><button type="button" class="tds-btn tds-btn--secondary tds-btn--md">Close</button></div></div></footer></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Bottom sheet</span>
<div class="tds-dialog tds-dialog--inline tds-dialog--bottom tds-dialog--md" role="presentation"><div class="tds-dialog__backdrop"><div class="tds-dialog__panel" role="dialog" aria-labelledby="dialog-bottom-title"><header class="tds-dialog__header"><div class="tds-dialog__header-row"><h2 class="tds-dialog__title" id="dialog-bottom-title">Consent required</h2><button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button></div><div class="tds-dialog__divider" role="presentation"></div></header><div class="tds-dialog__body"><p class="tds-dialog__text">Mobile-friendly sheet anchored to the bottom with rounded top corners.</p></div><footer class="tds-dialog__footer"><div class="tds-dialog__divider" role="presentation"></div><div class="tds-dialog__footer-row tds-dialog__footer-row--actions-only"><div class="tds-dialog__actions"><button type="button" class="tds-btn tds-btn--primary tds-btn--md">Accept</button></div></div></footer></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Full screen</span>
<div class="tds-dialog tds-dialog--inline tds-dialog--full tds-dialog--full" role="presentation"><div class="tds-dialog__backdrop"><div class="tds-dialog__panel" role="dialog" aria-labelledby="dialog-full-title"><header class="tds-dialog__header"><div class="tds-dialog__header-row"><h2 class="tds-dialog__title" id="dialog-full-title">Document review</h2><button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button></div><div class="tds-dialog__divider" role="presentation"></div></header><div class="tds-dialog__body"><p class="tds-dialog__text">Immersive full-viewport layout for document viewers and multi-step wizards.</p></div><footer class="tds-dialog__footer"><div class="tds-dialog__divider" role="presentation"></div><div class="tds-dialog__footer-row tds-dialog__footer-row--actions-only"><div class="tds-dialog__actions"><button type="button" class="tds-btn tds-btn--primary tds-btn--md">Approve</button></div></div></footer></div></div></div></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Header &amp; footer variants</h3>
          <p class="ds-showcase__desc">Boolean slots from Figma: leading icon, badge, trailing icon/button; footer label, caption, and one to three action buttons.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">__badge · __header-actions · __footer-meta · __actions</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--grid">
<div class="ds-state-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--spacing-24);">
        <div class="ds-state-demo"><span class="ds-state-demo__label">Title + dismiss only</span>
<div class="tds-dialog tds-dialog--inline tds-dialog--center tds-dialog--sm" role="presentation"><div class="tds-dialog__backdrop"><div class="tds-dialog__panel" role="dialog" aria-labelledby="dialog-h1-title"><header class="tds-dialog__header"><div class="tds-dialog__header-row"><h2 class="tds-dialog__title" id="dialog-h1-title">Dialog title</h2><button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button></div><div class="tds-dialog__divider" role="presentation"></div></header><div class="tds-dialog__body"><p class="tds-dialog__text">Minimal header configuration.</p></div><footer class="tds-dialog__footer"><div class="tds-dialog__divider" role="presentation"></div><div class="tds-dialog__footer-row tds-dialog__footer-row--actions-only"><div class="tds-dialog__actions"><button type="button" class="tds-btn tds-btn--primary tds-btn--md">OK</button></div></div></footer></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Title + badge</span>
<div class="tds-dialog tds-dialog--inline tds-dialog--center tds-dialog--sm" role="presentation"><div class="tds-dialog__backdrop"><div class="tds-dialog__panel" role="dialog" aria-labelledby="dialog-h2-title"><header class="tds-dialog__header"><div class="tds-dialog__header-row"><h2 class="tds-dialog__title" id="dialog-h2-title">Verification</h2><span class="tds-dialog__badge">Pending</span><button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button></div><div class="tds-dialog__divider" role="presentation"></div></header><div class="tds-dialog__body"><p class="tds-dialog__text">Status badge beside the title.</p></div><footer class="tds-dialog__footer"><div class="tds-dialog__divider" role="presentation"></div><div class="tds-dialog__footer-row tds-dialog__footer-row--actions-only"><div class="tds-dialog__actions"><button type="button" class="tds-btn tds-btn--primary tds-btn--md">Review</button></div></div></footer></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Footer · 2 buttons</span>
<div class="tds-dialog tds-dialog--inline tds-dialog--center tds-dialog--sm" role="presentation"><div class="tds-dialog__backdrop"><div class="tds-dialog__panel" role="dialog" aria-labelledby="dialog-f2-title"><header class="tds-dialog__header"><div class="tds-dialog__header-row"><h2 class="tds-dialog__title" id="dialog-f2-title">Remove entity?</h2><button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button></div><div class="tds-dialog__divider" role="presentation"></div></header><div class="tds-dialog__body"><p class="tds-dialog__text">This action cannot be undone.</p></div><footer class="tds-dialog__footer"><div class="tds-dialog__divider" role="presentation"></div><div class="tds-dialog__footer-row"><div class="tds-dialog__footer-meta"><p class="tds-dialog__footer-label">Maple Leaf Logistics Inc.</p><p class="tds-dialog__footer-caption">Entity ID 8842-KYB</p></div><div class="tds-dialog__actions"><button type="button" class="tds-btn tds-btn--secondary tds-btn--md">Cancel</button><button type="button" class="tds-btn tds-btn--danger tds-btn--md">Remove</button></div></div></footer></div></div></div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Footer · 3 buttons</span>
<div class="tds-dialog tds-dialog--inline tds-dialog--center tds-dialog--md" role="presentation"><div class="tds-dialog__backdrop"><div class="tds-dialog__panel" role="dialog" aria-labelledby="dialog-f3-title"><header class="tds-dialog__header"><div class="tds-dialog__header-row"><h2 class="tds-dialog__title" id="dialog-f3-title">Submit verification</h2><button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button></div><div class="tds-dialog__divider" role="presentation"></div></header><div class="tds-dialog__body"><p class="tds-dialog__text">Save as draft, discard changes, or submit for review.</p></div><footer class="tds-dialog__footer"><div class="tds-dialog__divider" role="presentation"></div><div class="tds-dialog__footer-row"><div class="tds-dialog__footer-meta"><p class="tds-dialog__footer-label">3 checks pending</p><p class="tds-dialog__footer-caption">Ownership, address, and document match</p></div><div class="tds-dialog__actions"><button type="button" class="tds-btn tds-btn--invisible tds-btn--md">Discard</button><button type="button" class="tds-btn tds-btn--secondary tds-btn--md">Save draft</button><button type="button" class="tds-btn tds-btn--primary tds-btn--md">Submit</button></div></div></footer></div></div></div></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">KYB use cases</h3>
          <p class="ds-showcase__desc">Live modal interaction: open from a trigger, dismiss via X, backdrop click, or Escape. Confirm destructive actions and review entity details in a right drawer.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">data-dialog-open · .tds-dialog__dismiss · Escape</code>
            <span class="ds-tag">Interactive</span>
          </div>
        </div>
        <div class="ds-showcase__canvas">
<div style="display: flex; flex-wrap: wrap; gap: var(--spacing-12);">
  <button type="button" class="tds-btn tds-btn--danger tds-btn--md" data-dialog-open="dialog-delete-entity">Delete entity</button>
  <button type="button" class="tds-btn tds-btn--secondary tds-btn--md" data-dialog-open="dialog-entity-drawer">View entity details</button>
</div>

<div class="tds-dialog tds-dialog--center tds-dialog--sm" id="dialog-delete-entity" role="presentation" hidden>
  <div class="tds-dialog__backdrop">
    <div class="tds-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="dialog-delete-title" tabindex="-1">
      <header class="tds-dialog__header">
        <div class="tds-dialog__header-row">
          <h2 class="tds-dialog__title" id="dialog-delete-title">Delete entity?</h2>
          <button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss dialog"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button>
        </div>
        <div class="tds-dialog__divider" role="presentation"></div>
      </header>
      <div class="tds-dialog__body">
        <p class="tds-dialog__text">Removing <strong>Maple Leaf Logistics Inc.</strong> will permanently delete all verification history, documents, and beneficial-owner records associated with this entity.</p>
      </div>
      <footer class="tds-dialog__footer">
        <div class="tds-dialog__divider" role="presentation"></div>
        <div class="tds-dialog__footer-row">
          <div class="tds-dialog__footer-meta">
            <p class="tds-dialog__footer-label">This action cannot be undone</p>
            <p class="tds-dialog__footer-caption">Entity ID 8842-KYB · Created 12 Mar 2018</p>
          </div>
          <div class="tds-dialog__actions">
            <button type="button" class="tds-btn tds-btn--secondary tds-btn--md" data-dialog-close>Cancel</button>
            <button type="button" class="tds-btn tds-btn--danger tds-btn--md" data-dialog-close>Delete entity</button>
          </div>
        </div>
      </footer>
    </div>
  </div>
</div>

<div class="tds-dialog tds-dialog--right tds-dialog--md" id="dialog-entity-drawer" role="presentation" hidden>
  <div class="tds-dialog__backdrop">
    <div class="tds-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="dialog-drawer-title" tabindex="-1">
      <header class="tds-dialog__header">
        <div class="tds-dialog__header-row">
          <h2 class="tds-dialog__title" id="dialog-drawer-title">Maple Leaf Logistics Inc.</h2>
          <span class="tds-dialog__badge">Verified</span>
          <button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss dialog"><span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span></button>
        </div>
        <div class="tds-dialog__divider" role="presentation"></div>
      </header>
      <div class="tds-dialog__body">
        <p class="tds-dialog__text"><strong>Legal name</strong><br>Maple Leaf Logistics Inc.</p>
        <p class="tds-dialog__text"><strong>Jurisdiction</strong><br>Ontario, Canada</p>
        <p class="tds-dialog__text"><strong>Business number</strong><br>123456789 RC0001</p>
        <p class="tds-dialog__text"><strong>Beneficial owners</strong><br>4 UBOs screened: last updated 14 Jun 2026</p>
      </div>
      <footer class="tds-dialog__footer">
        <div class="tds-dialog__divider" role="presentation"></div>
        <div class="tds-dialog__footer-row tds-dialog__footer-row--actions-only">
          <div class="tds-dialog__actions">
            <button type="button" class="tds-btn tds-btn--secondary tds-btn--md" data-dialog-close>Close</button>
            <button type="button" class="tds-btn tds-btn--primary tds-btn--md">Open full profile</button>
          </div>
        </div>
      </footer>
    </div>
  </div>
</div>
        </div>
      </article>

      </section>`},{id:"data",title:"Data tables",desc:"Dense entity lists with sortable columns, row actions, and skeleton loading. Tables scroll horizontally on narrow viewports.",html:`<section class="ds-chapter ds-tab-panel">
      <header class="ds-chapter__header">
        <h2 class="ds-chapter__title">Data tables</h2>
        <p class="ds-chapter__desc">Dense entity lists with sortable columns, row actions, and skeleton loading. Tables scroll horizontally on narrow viewports.</p>
      </header>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Section header</h3>
          <p class="ds-showcase__desc">Borderless tinted bar for grouping table sections: optional icon, subtext, tag, counter, and action button (Figma 1816:29234).</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-section-header</code></div>
        </div>
        <div class="ds-showcase__canvas">
<div class="ds-state-grid" style="grid-template-columns: 1fr; gap: var(--spacing-16);">
            <div class="ds-state-demo"><span class="ds-state-demo__label">Title only</span><div class="tds-section-header"><div class="tds-section-header__left"><div class="tds-section-header__title-stack"><p class="tds-section-header__title">Section Title</p></div></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Title + subtext</span><div class="tds-section-header"><div class="tds-section-header__left"><div class="tds-section-header__title-stack"><p class="tds-section-header__title">Section Title</p><p class="tds-section-header__subtext">Description text</p></div></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Title + tag</span><div class="tds-section-header"><div class="tds-section-header__left"><div class="tds-section-header__title-stack"><p class="tds-section-header__title">Section Title</p></div><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Title + counter</span><div class="tds-section-header"><div class="tds-section-header__left"><div class="tds-section-header__title-stack"><p class="tds-section-header__title">Section Title</p></div><span class="tds-counter tds-counter--primary tds-counter--sm">20</span></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Title + leading icon</span><div class="tds-section-header"><div class="tds-section-header__left"><span class="tds-section-header__icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M5.5 10.5c.8 1 1.6 1.5 2.5 1.5s1.7-.5 2.5-1.5" stroke-linecap="round"/><circle cx="6" cy="6.5" r=".75" fill="currentColor" stroke="none"/><circle cx="10" cy="6.5" r=".75" fill="currentColor" stroke="none"/></svg></span><div class="tds-section-header__title-stack"><p class="tds-section-header__title">Section Title</p></div></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Title + button</span><div class="tds-section-header"><div class="tds-section-header__left"><div class="tds-section-header__title-stack"><p class="tds-section-header__title">Section Title</p></div></div><div class="tds-section-header__right"><button type="button" class="tds-btn tds-btn--secondary tds-btn--sm">Button</button></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Full configuration</span><div class="tds-section-header"><div class="tds-section-header__left"><span class="tds-section-header__icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><path d="M5.5 10.5c.8 1 1.6 1.5 2.5 1.5s1.7-.5 2.5-1.5" stroke-linecap="round"/><circle cx="6" cy="6.5" r=".75" fill="currentColor" stroke="none"/><circle cx="10" cy="6.5" r=".75" fill="currentColor" stroke="none"/></svg></span><div class="tds-section-header__title-stack"><p class="tds-section-header__title">Section Title</p><p class="tds-section-header__subtext">Description text</p></div><span class="tds-tag tds-tag--sm tds-tag--default">Label</span><span class="tds-counter tds-counter--primary tds-counter--sm">20</span></div><div class="tds-section-header__right"><button type="button" class="tds-btn tds-btn--secondary tds-btn--sm">Button</button></div></div></div>
          </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Table header</h3>
          <p class="ds-showcase__desc">Title, subtitle, toolbar actions, and optional filter row: seven Figma combinations.</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-data-table__header</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--flush">
<div class="ds-state-grid" style="grid-template-columns: 1fr; gap: var(--spacing-16);">
            <div class="ds-state-demo"><span class="ds-state-demo__label">Title only</span><div class="tds-data-table-container"><div class="tds-data-table__header"><div class="tds-data-table__header-text"><div class="tds-data-table__header-title">Repositories</div></div></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Title + subtitle</span><div class="tds-data-table-container"><div class="tds-data-table__header tds-data-table__header--stacked"><div class="tds-data-table__header-text"><div class="tds-data-table__header-title">Repositories</div><div class="tds-data-table__header-subtitle">A subtitle could appear here to give extra context to the data.</div></div></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Title + subtitle + actions</span><div class="tds-data-table-container"><div class="tds-data-table__header tds-data-table__header--stacked"><div class="tds-data-table__header-toolbar"><div class="tds-data-table__header-text"><div class="tds-data-table__header-title">Repositories</div></div><div class="tds-data-table__header-actions"><button type="button" class="tds-data-table__header-icon-btn" aria-label="Download"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 2.5v7M5.5 7 8 9.5 10.5 7M3 12.5h10"/></svg></button><button type="button" class="tds-data-table__header-icon-btn" aria-label="Add"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 3v10M3 8h10"/></svg></button></div></div><hr class="tds-data-table__header-divider"><div class="tds-data-table__header-subtitle">A subtitle could appear here to give extra context to the data.</div></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Title + subtitle + actions + filter</span><div class="tds-data-table-container"><div class="tds-data-table__header tds-data-table__header--stacked"><div class="tds-data-table__header-toolbar"><div class="tds-data-table__header-text"><div class="tds-data-table__header-title">Repositories</div></div><div class="tds-data-table__header-filter-actions"><button type="button" class="tds-data-table__header-icon-btn" aria-label="Download"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 2.5v7M5.5 7 8 9.5 10.5 7M3 12.5h10"/></svg></button><button type="button" class="tds-data-table__header-icon-btn" aria-label="Add"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 3v10M3 8h10"/></svg></button></div></div><hr class="tds-data-table__header-divider"><div class="tds-data-table__header-subtitle">A subtitle could appear here to give extra context to the data.</div><div class="tds-data-table__header-filter-row"><div class="tds-text-input tds-text-input--full-width"><div class="tds-text-input__field tds-text-input__field--md"><span class="tds-text-input__leading-visual"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5 14 14"/></svg></span><input class="tds-text-input__native" type="search" placeholder="Search or filter" aria-label="Search or filter"></div></div></div></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Filter only</span><div class="tds-data-table-container"><div class="tds-data-table__header tds-data-table__header--stacked tds-data-table__header--toolbar-only"><div class="tds-data-table__header-filter-row"><div class="tds-text-input tds-text-input--full-width"><div class="tds-text-input__field tds-text-input__field--md"><span class="tds-text-input__leading-visual"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5 14 14"/></svg></span><input class="tds-text-input__native" type="search" placeholder="Search or filter" aria-label="Search or filter"></div></div></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Filter + actions</span><div class="tds-data-table-container"><div class="tds-data-table__header tds-data-table__header--stacked tds-data-table__header--toolbar-only"><div class="tds-data-table__header-toolbar"><div class="tds-data-table__header-filter-row"><div class="tds-text-input tds-text-input--full-width"><div class="tds-text-input__field tds-text-input__field--md"><span class="tds-text-input__leading-visual"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5 14 14"/></svg></span><input class="tds-text-input__native" type="search" placeholder="Search or filter" aria-label="Search or filter"></div></div></div><div class="tds-data-table__header-filter-actions"><button type="button" class="tds-data-table__header-icon-btn" aria-label="Download"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 2.5v7M5.5 7 8 9.5 10.5 7M3 12.5h10"/></svg></button><button type="button" class="tds-data-table__header-icon-btn" aria-label="Add"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 3v10M3 8h10"/></svg></button></div></div></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Actions only</span><div class="tds-data-table-container"><div class="tds-data-table__header tds-data-table__header--toolbar-only"><div class="tds-data-table__header-actions" style="margin-left: auto;"><button type="button" class="tds-data-table__header-icon-btn" aria-label="Download"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 2.5v7M5.5 7 8 9.5 10.5 7M3 12.5h10"/></svg></button><button type="button" class="tds-data-table__header-icon-btn" aria-label="Add"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 3v10M3 8h10"/></svg></button></div></div></div></div>
          </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Column header cell</h3>
          <p class="ds-showcase__desc">Sort none, ascending, descending: plus empty and checkbox column types.</p>
          <div class="ds-showcase__meta"><code class="ds-api">th[aria-sort] · .tds-data-table__checkbox-cell</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--flush">
<div class="ds-state-grid">
            <div class="ds-state-demo"><span class="ds-state-demo__label">Sort none</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><thead><tr><th aria-sort="none">Design infrastructure</th></tr></thead></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Sort ascending</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><thead><tr><th aria-sort="ascending">Design infrastructure <span class="tds-data-table__sort-icon"><svg class="icon icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3l4 5H4l4-5z"/></svg></span></th></tr></thead></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Sort descending</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><thead><tr><th aria-sort="descending">Design infrastructure <span class="tds-data-table__sort-icon"><svg class="icon icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 13l-4-5h8l-4 5z"/></svg></span></th></tr></thead></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Empty column</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><thead><tr><th class="tds-data-table__actions-col" aria-hidden="true"></th></tr></thead></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Checkbox column</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><thead><tr><th class="tds-data-table__checkbox-cell"><input type="checkbox" class="tds-checkbox" aria-label="Select all rows"></th></tr></thead></table></div></div></div>
          </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Text cell</h3>
          <p class="ds-showcase__desc">Default, placeholder, loading, and subtext: left and right aligned.</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-data-table__text-cell</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--flush">
<div class="ds-state-grid">
            <div class="ds-state-demo"><span class="ds-state-demo__label">Default · left</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td class="tds-data-table__text-cell"><span class="tds-data-table__cell-inner"><span class="tds-data-table__cell-leading-visual"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>Design infrastructure</span></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Default · right</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td class="tds-data-table__text-cell" data-align="right"><span class="tds-data-table__cell-inner"><span class="tds-data-table__cell-leading-visual"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>Design infrastructure</span></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Placeholder · left</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td class="tds-data-table__text-cell"><span class="tds-data-table__cell-inner"><span class="tds-data-table__cell-leading-visual"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span><span class="tds-data-table__cell-placeholder">Data unavailable</span></span></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Placeholder · right</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td class="tds-data-table__text-cell" data-align="right"><span class="tds-data-table__cell-inner"><span class="tds-data-table__cell-leading-visual"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span><span class="tds-data-table__cell-placeholder">Data unavailable</span></span></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Loading · left</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td class="tds-data-table__text-cell tds-data-table__text-cell--loading"><div class="tds-data-table__skeleton" style="width: 132px;"></div></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Loading · right</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td class="tds-data-table__text-cell tds-data-table__text-cell--loading" data-align="right"><div class="tds-data-table__skeleton" style="width: 132px; margin-left: auto;"></div></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Subtext · left</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td class="tds-data-table__text-cell tds-data-table__text-cell--subtext"><span class="tds-data-table__cell-inner"><span class="tds-data-table__cell-leading-visual"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span><span class="tds-data-table__cell-text-stack"><span>Design infrastructure</span><span class="tds-data-table__cell-subtext">Secondary text</span></span></span></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Subtext · right</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td class="tds-data-table__text-cell tds-data-table__text-cell--subtext" data-align="right"><span class="tds-data-table__cell-inner"><span class="tds-data-table__cell-leading-visual"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span><span class="tds-data-table__cell-text-stack"><span>Design infrastructure</span><span class="tds-data-table__cell-subtext">Secondary text</span></span></span></td></tr></tbody></table></div></div></div>
          </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Row header, checkbox, label &amp; actions</h3>
          <p class="ds-showcase__desc">Supporting cell types for selection, tags, and per-row controls.</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-data-table__row-header · __signals · __label-cell · __actions-cell</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--flush">
<div class="ds-state-grid">
            <div class="ds-state-demo"><span class="ds-state-demo__label">Row header</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td><span class="tds-data-table__row-header">Design infrastructure</span></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Checkbox</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td class="tds-data-table__checkbox-cell"><input type="checkbox" class="tds-checkbox" aria-label="Select row"></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Label cell</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td><span class="tds-data-table__label-cell"><span class="tds-tag tds-tag--sm tds-tag--default">Label</span><span class="tds-tag tds-tag--sm tds-tag--default">Label</span><span class="tds-tag tds-tag--sm tds-tag--default">Label</span></span></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Label cell · loading</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td><div class="tds-data-table__skeleton" style="width: 132px; height: 24px;"></div></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Actions · 1</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td data-align="right"><span class="tds-data-table__actions-cell"><button type="button" class="tds-data-table__action-icon" aria-label="Edit"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 2.5a1.4 1.4 0 0 1 2 2L5.5 12.5 3 13l.5-2.5L11.5 2.5z"/></svg></button></span></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Actions · 2</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td data-align="right"><span class="tds-data-table__actions-cell"><button type="button" class="tds-data-table__action-icon" aria-label="Edit"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 2.5a1.4 1.4 0 0 1 2 2L5.5 12.5 3 13l.5-2.5L11.5 2.5z"/></svg></button><button type="button" class="tds-data-table__action-icon" aria-label="More"><svg class="icon" viewBox="0 0 16 16" fill="currentColor"><circle cx="3" cy="8" r="1.25"/><circle cx="8" cy="8" r="1.25"/><circle cx="13" cy="8" r="1.25"/></svg></button></span></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Signals · negative</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td><span class="tds-data-table__signals tds-data-table__signals--negative"><span class="tds-data-table__signals-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/><path d="m5.5 5.5 5 5M10.5 5.5l-5 5" stroke-linecap="round"/></svg></span>Label</span></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Signals · positive</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td><span class="tds-data-table__signals tds-data-table__signals--positive"><span class="tds-data-table__signals-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/><path d="M5.5 8.5 7 10l3.5-4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Label</span></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Signals · intermediate</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td><span class="tds-data-table__signals tds-data-table__signals--intermediate"><span class="tds-data-table__signals-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/><path d="M8 5.5v3.5" stroke-linecap="round"/><circle cx="8" cy="11.25" r=".6" fill="currentColor"/></svg></span>Label</span></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Actions · 3+</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--cells-demo"><tbody><tr><td data-align="right"><span class="tds-data-table__actions-cell"><button type="button" class="tds-data-table__action-icon" aria-label="Edit"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 2.5a1.4 1.4 0 0 1 2 2L5.5 12.5 3 13l.5-2.5L11.5 2.5z"/></svg></button><button type="button" class="tds-data-table__action-icon" aria-label="More"><svg class="icon" viewBox="0 0 16 16" fill="currentColor"><circle cx="3" cy="8" r="1.25"/><circle cx="8" cy="8" r="1.25"/><circle cx="13" cy="8" r="1.25"/></svg></button></span></td></tr></tbody></table></div></div></div>
          </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Table footer</h3>
          <p class="ds-showcase__desc">Row counter and pagination controls.</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-data-table__footer</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--flush">
<div class="tds-data-table-container">
            <div class="tds-data-table__footer">
              <div class="tds-data-table__footer-counter">20&ndash;30 of 40</div>
              <div class="tds-data-table__footer-pagination">
                <div class="tds-data-table__pagination">
                  <button type="button" class="tds-data-table__pagination-direction"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M10 4l-4 4 4 4"/></svg> Previous</button>
                  <div class="tds-data-table__pagination-pages"><button type="button" class="tds-data-table__pagination-page">1</button><button type="button" class="tds-data-table__pagination-page tds-data-table__pagination-page--active">9</button><button type="button" class="tds-data-table__pagination-page">10</button></div>
                  <button type="button" class="tds-data-table__pagination-direction">Next <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 4l4 4-4 4"/></svg></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>


      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Ownership table</h3>
          <p class="ds-showcase__desc">Borderless container: tinted column header and row dividers only (Figma 884:13685).</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-data-table-container · .tds-data-table</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--table">
<div class="tds-data-table-container">
      <div class="tds-data-table__wrapper">
      <table class="tds-data-table">
        <thead>
          <tr>
            <th aria-sort="none">Name</th>
            <th aria-sort="none">Ownership</th>
            <th aria-sort="none">Address</th>
            <th aria-sort="none">Screening Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tds-data-table__text-cell tds-data-table__text-cell--subtext"><span class="tds-data-table__cell-inner"><span class="tds-data-table__cell-text-stack"><span>James Morton</span><span class="tds-data-table__cell-subtext">Secondary text</span></span></span></td>
            <td class="tds-data-table__text-cell">65%</td>
            <td class="tds-data-table__text-cell">71 Queen Victoria St, San Francisco</td>
            <td><span class="tds-data-table__label-cell"><span class="tds-tag tds-tag--md tds-tag--positive">Clear</span></span></td>
          </tr>
          <tr>
            <td class="tds-data-table__text-cell tds-data-table__text-cell--subtext"><span class="tds-data-table__cell-inner"><span class="tds-data-table__cell-text-stack"><span>Walter Decosta</span><span class="tds-data-table__cell-subtext">Secondary text</span></span></span></td>
            <td class="tds-data-table__text-cell">35%</td>
            <td class="tds-data-table__text-cell">71 Queen Victoria St, San Francisco</td>
            <td><span class="tds-data-table__label-cell"><span class="tds-tag tds-tag--md tds-tag--negative">2 more entities connected</span></span></td>
          </tr>
        </tbody>
      </table>
      </div>
</div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Repositories table</h3>
          <p class="ds-showcase__desc">Default density: 3 columns, row actions, and pagination footer (Figma 884:13677). No container border.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-data-table-container · .tds-data-table</code>
            <span class="ds-tag">Live example</span>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--table">
<div class="tds-data-table-container">
      <div class="tds-data-table__header">
        <div class="tds-data-table__header-text">
          <div class="tds-data-table__header-title">Repositories</div>
        </div>
      </div>
      <div class="tds-data-table__wrapper">
      <table class="tds-data-table">
        <thead>
          <tr>
            <th aria-sort="none">Design infrastructure</th>
            <th aria-sort="none">Design infrastructure</th>
            <th aria-sort="none">Design infrastructure</th>
            <th class="tds-data-table__actions-col" aria-hidden="true"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tds-data-table__text-cell">Design infrastructure</td>
            <td class="tds-data-table__text-cell">Design infrastructure</td>
            <td class="tds-data-table__text-cell">Design infrastructure</td>
            <td data-align="right">
              <span class="tds-data-table__actions-cell">
                <button type="button" class="tds-data-table__action-icon" aria-label="Edit row"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 2.5a1.4 1.4 0 0 1 2 2L5.5 12.5 3 13l.5-2.5L11.5 2.5z"/></svg></button>
              </span>
            </td>
          </tr>
          <tr>
            <td class="tds-data-table__text-cell">Design infrastructure</td>
            <td class="tds-data-table__text-cell">Design infrastructure</td>
            <td class="tds-data-table__text-cell">Design infrastructure</td>
            <td data-align="right">
              <span class="tds-data-table__actions-cell">
                <button type="button" class="tds-data-table__action-icon" aria-label="Edit row"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 2.5a1.4 1.4 0 0 1 2 2L5.5 12.5 3 13l.5-2.5L11.5 2.5z"/></svg></button>
              </span>
            </td>
          </tr>
          <tr>
            <td class="tds-data-table__text-cell">Design infrastructure</td>
            <td class="tds-data-table__text-cell">Design infrastructure</td>
            <td class="tds-data-table__text-cell">Design infrastructure</td>
            <td data-align="right">
              <span class="tds-data-table__actions-cell">
                <button type="button" class="tds-data-table__action-icon" aria-label="Edit row"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 2.5a1.4 1.4 0 0 1 2 2L5.5 12.5 3 13l.5-2.5L11.5 2.5z"/></svg></button>
              </span>
            </td>
          </tr>
          <tr>
            <td class="tds-data-table__text-cell">Design infrastructure</td>
            <td class="tds-data-table__text-cell">Design infrastructure</td>
            <td class="tds-data-table__text-cell">Design infrastructure</td>
            <td data-align="right">
              <span class="tds-data-table__actions-cell">
                <button type="button" class="tds-data-table__action-icon" aria-label="Edit row"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 2.5a1.4 1.4 0 0 1 2 2L5.5 12.5 3 13l.5-2.5L11.5 2.5z"/></svg></button>
              </span>
            </td>
          </tr>
          <tr>
            <td class="tds-data-table__text-cell">Design infrastructure</td>
            <td class="tds-data-table__text-cell">Design infrastructure</td>
            <td class="tds-data-table__text-cell">Design infrastructure</td>
            <td data-align="right">
              <span class="tds-data-table__actions-cell">
                <button type="button" class="tds-data-table__action-icon" aria-label="Edit row"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 2.5a1.4 1.4 0 0 1 2 2L5.5 12.5 3 13l.5-2.5L11.5 2.5z"/></svg></button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="tds-data-table__footer">
        <div class="tds-data-table__footer-counter">20&ndash;30 of 40</div>
        <div class="tds-data-table__footer-pagination">
          <div class="tds-data-table__pagination">
            <button type="button" class="tds-data-table__pagination-direction">
              <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M10 4l-4 4 4 4"/></svg>
              Previous
            </button>
            <div class="tds-data-table__pagination-pages" id="pagination-pages">
              <button type="button" class="tds-data-table__pagination-page" data-page="1">1</button><button type="button" class="tds-data-table__pagination-page" data-page="2">2</button><button type="button" class="tds-data-table__pagination-page" data-page="3">3</button><button type="button" class="tds-data-table__pagination-page" data-page="4">4</button><button type="button" class="tds-data-table__pagination-page" data-page="5">5</button><button type="button" class="tds-data-table__pagination-page" data-page="6">6</button><button type="button" class="tds-data-table__pagination-page" data-page="7">7</button><button type="button" class="tds-data-table__pagination-page" data-page="8">8</button><button type="button" class="tds-data-table__pagination-page tds-data-table__pagination-page--active" data-page="9">9</button><button type="button" class="tds-data-table__pagination-page" data-page="10">10</button>
            </div>
            <button type="button" class="tds-data-table__pagination-direction">
              Next
              <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 4l4 4-4 4"/></svg>
            </button>
          </div>
        </div>
      </div>
</div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Row density</h3>
          <p class="ds-showcase__desc">Compact (34px), default (50px), and comfort (66px) row heights: Figma boolean: density.</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-data-table--{compact|comfort}</code></div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--flush">
<div class="ds-state-grid" style="grid-template-columns: 1fr; gap: var(--spacing-16);">
            <div class="ds-state-demo"><span class="ds-state-demo__label">Compact</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--compact"><thead><tr><th>Column</th><th>Column</th><th>Column</th><th class="tds-data-table__actions-col" aria-hidden="true"></th></tr></thead><tbody><tr><td class="tds-data-table__text-cell">Design infrastructure</td><td class="tds-data-table__text-cell">Design infrastructure</td><td class="tds-data-table__text-cell">Design infrastructure</td><td data-align="right"><span class="tds-data-table__actions-cell"><button type="button" class="tds-data-table__action-icon" aria-label="Edit"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 2.5a1.4 1.4 0 0 1 2 2L5.5 12.5 3 13l.5-2.5L11.5 2.5z"/></svg></button></span></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Default</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table"><thead><tr><th>Column</th><th>Column</th><th>Column</th><th class="tds-data-table__actions-col" aria-hidden="true"></th></tr></thead><tbody><tr><td class="tds-data-table__text-cell">Design infrastructure</td><td class="tds-data-table__text-cell">Design infrastructure</td><td class="tds-data-table__text-cell">Design infrastructure</td><td data-align="right"><span class="tds-data-table__actions-cell"><button type="button" class="tds-data-table__action-icon" aria-label="Edit"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 2.5a1.4 1.4 0 0 1 2 2L5.5 12.5 3 13l.5-2.5L11.5 2.5z"/></svg></button></span></td></tr></tbody></table></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Comfort</span><div class="tds-data-table-container"><div class="tds-data-table__wrapper"><table class="tds-data-table tds-data-table--comfort"><thead><tr><th>Column</th><th>Column</th><th>Column</th><th class="tds-data-table__actions-col" aria-hidden="true"></th></tr></thead><tbody><tr><td class="tds-data-table__text-cell">Design infrastructure</td><td class="tds-data-table__text-cell">Design infrastructure</td><td class="tds-data-table__text-cell">Design infrastructure</td><td data-align="right"><span class="tds-data-table__actions-cell"><button type="button" class="tds-data-table__action-icon" aria-label="Edit"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 2.5a1.4 1.4 0 0 1 2 2L5.5 12.5 3 13l.5-2.5L11.5 2.5z"/></svg></button></span></td></tr></tbody></table></div></div></div>
          </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Skeleton loading</h3>
          <p class="ds-showcase__desc">Placeholder rows while data fetches: mirror the live table column structure.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.tds-data-table__skeleton</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--flush">
<div class="tds-data-table-container">
        <div class="tds-data-table__wrapper">
        <table class="tds-data-table">
          <thead>
            <tr>
              <th>Design infrastructure</th>
              <th>Design infrastructure</th>
              <th>Design infrastructure</th>
              <th class="tds-data-table__actions-col" aria-hidden="true"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="tds-data-table__text-cell"><div class="tds-data-table__skeleton" style="width: 180px;"></div></td>
              <td class="tds-data-table__text-cell"><div class="tds-data-table__skeleton" style="width: 180px;"></div></td>
              <td class="tds-data-table__text-cell"><div class="tds-data-table__skeleton" style="width: 180px;"></div></td>
              <td data-align="right"><div class="tds-data-table__skeleton" style="width: 16px; height: 16px; margin-left: auto;"></div></td>
            </tr>
            <tr>
              <td class="tds-data-table__text-cell"><div class="tds-data-table__skeleton" style="width: 160px;"></div></td>
              <td class="tds-data-table__text-cell"><div class="tds-data-table__skeleton" style="width: 160px;"></div></td>
              <td class="tds-data-table__text-cell"><div class="tds-data-table__skeleton" style="width: 160px;"></div></td>
              <td data-align="right"><div class="tds-data-table__skeleton" style="width: 16px; height: 16px; margin-left: auto;"></div></td>
            </tr>
            <tr>
              <td class="tds-data-table__text-cell"><div class="tds-data-table__skeleton" style="width: 200px;"></div></td>
              <td class="tds-data-table__text-cell"><div class="tds-data-table__skeleton" style="width: 200px;"></div></td>
              <td class="tds-data-table__text-cell"><div class="tds-data-table__skeleton" style="width: 200px;"></div></td>
              <td data-align="right"><div class="tds-data-table__skeleton" style="width: 16px; height: 16px; margin-left: auto;"></div></td>
            </tr>
          </tbody>
        </table>
        </div>
</div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Risk category card</h3>
          <p class="ds-showcase__desc">Compact risk summary: category title, risk tag, signal count, and score out of 100 (Figma 920:9307).</p>
          <div class="ds-showcase__meta"><code class="ds-api">.tds-risk-category-card</code></div>
        </div>
        <div class="ds-showcase__canvas">
<div class="ds-state-grid" style="grid-template-columns: repeat(auto-fit, minmax(284px, 1fr)); gap: var(--spacing-16);">
            <div class="ds-state-demo"><span class="ds-state-demo__label">High risk</span><div class="tds-risk-category-card"><div class="tds-risk-category-card__title-row"><p class="tds-risk-category-card__title">Sanctions</p><span class="tds-tag tds-tag--xl tds-tag--negative">High Risk</span></div><div class="tds-risk-category-card__details-row"><div class="tds-risk-category-card__signals"><span class="tds-risk-category-card__icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2.5 14 13.5H2L8 2.5z"/><path d="M8 6.5v2.5"/><circle cx="8" cy="11.75" r="0.55" fill="currentColor" stroke="none"/></svg></span><p class="tds-risk-category-card__signal-count">3 signals</p></div><div class="tds-risk-category-card__score-group"><p class="tds-risk-category-card__score">82</p><p class="tds-risk-category-card__score-suffix">/100</p></div></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Medium risk</span><div class="tds-risk-category-card"><div class="tds-risk-category-card__title-row"><p class="tds-risk-category-card__title">Adverse media</p><span class="tds-tag tds-tag--md tds-tag--intermediate">Medium Risk</span></div><div class="tds-risk-category-card__details-row"><div class="tds-risk-category-card__signals"><span class="tds-risk-category-card__icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2.5 14 13.5H2L8 2.5z"/><path d="M8 6.5v2.5"/><circle cx="8" cy="11.75" r="0.55" fill="currentColor" stroke="none"/></svg></span><p class="tds-risk-category-card__signal-count">1 signal</p></div><div class="tds-risk-category-card__score-group"><p class="tds-risk-category-card__score">45</p><p class="tds-risk-category-card__score-suffix">/100</p></div></div></div></div>
            <div class="ds-state-demo"><span class="ds-state-demo__label">Low risk</span><div class="tds-risk-category-card"><div class="tds-risk-category-card__title-row"><p class="tds-risk-category-card__title">Identity</p><span class="tds-tag tds-tag--xl tds-tag--positive">Low Risk</span></div><div class="tds-risk-category-card__details-row"><div class="tds-risk-category-card__signals"><span class="tds-risk-category-card__icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2.5 14 13.5H2L8 2.5z"/><path d="M8 6.5v2.5"/><circle cx="8" cy="11.75" r="0.55" fill="currentColor" stroke="none"/></svg></span><p class="tds-risk-category-card__signal-count">0 signals</p></div><div class="tds-risk-category-card__score-group"><p class="tds-risk-category-card__score">12</p><p class="tds-risk-category-card__score-suffix">/100</p></div></div></div></div>
          </div>
        </div>
      </article>

      </section>`},{id:"typography",title:"Typography",desc:"Figma text styles mapped to utility classes. Inter for UI, Tobias for display.",html:`<section class="ds-chapter ds-tab-panel">
      <header class="ds-chapter__header">
        <h2 class="ds-chapter__title">Typography</h2>
        <p class="ds-chapter__desc">Figma text styles mapped to utility classes. Inter for UI, Tobias for display.</p>
      </header>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Font families</h3>
          <p class="ds-showcase__desc">Inter is self-hosted and used on macOS and Windows: no system font fallbacks. Tobias is reserved for marketing-scale display type.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">--font-family · --font-family-display</code>
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--white">
<div class="type-specimen">
        <div class="type-specimen__row"><span style="font-family: var(--font-family); font-size: var(--font-size-lg); line-height: var(--line-height-lg);">Inter: The quick brown fox</span><span class="type-specimen__meta">UI · body, label, heading</span></div>
        <div class="type-specimen__row"><span class="text-display-sm">Tobias: The quick brown fox</span><span class="type-specimen__meta">Display · marketing headlines</span></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Display  · Tobias</h3>
          
          <div class="ds-showcase__meta">
            <code class="ds-api">.text-display-*</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--white">
<div class="type-specimen">
        <div class="type-specimen__row"><span class="text-display-3xl">Display 3XL</span><span class="type-specimen__meta">76px / 86px · Regular</span></div>
        <div class="type-specimen__row"><span class="text-display-2xl">Display 2XL</span><span class="type-specimen__meta">60px / 70px · Regular</span></div>
        <div class="type-specimen__row"><span class="text-display-xl">Display XL</span><span class="type-specimen__meta">54px / 64px · Regular</span></div>
        <div class="type-specimen__row"><span class="text-display-lg">Display Large</span><span class="type-specimen__meta">48px / 56px · Regular</span></div>
        <div class="type-specimen__row"><span class="text-display-md">Display Medium</span><span class="type-specimen__meta">42px / 50px · Regular</span></div>
        <div class="type-specimen__row"><span class="text-display-sm">Display Small</span><span class="type-specimen__meta">36px / 44px · Regular</span></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Headings  · Inter Semibold</h3>
          
          <div class="ds-showcase__meta">
            <code class="ds-api">.text-heading-*</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--white">
<div class="type-specimen">
        <div class="type-specimen__row"><span class="text-heading-3xl">Heading 3XL</span><span class="type-specimen__meta">32px / 36px · 600</span></div>
        <div class="type-specimen__row"><span class="text-heading-2xl">Heading 2XL</span><span class="type-specimen__meta">28px / 30px · 600</span></div>
        <div class="type-specimen__row"><span class="text-heading-xl">Heading XL</span><span class="type-specimen__meta">24px / 26px · 600</span></div>
        <div class="type-specimen__row"><span class="text-heading-lg">Heading Large</span><span class="type-specimen__meta">20px / 24px · 600</span></div>
        <div class="type-specimen__row"><span class="text-heading-md">Heading Medium</span><span class="type-specimen__meta">18px / 22px · 600</span></div>
        <div class="type-specimen__row"><span class="text-heading-sm">Heading Small</span><span class="type-specimen__meta">16px / 20px · 600</span></div>
        <div class="type-specimen__row"><span class="text-heading-xs">Heading XS</span><span class="type-specimen__meta">14px / 18px · 600</span></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Body  · Inter Regular</h3>
          
          <div class="ds-showcase__meta">
            <code class="ds-api">.text-body-*</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--white">
<div class="type-specimen">
        <div class="type-specimen__row"><span class="text-body-lg">Body Large</span><span class="type-specimen__meta">18px / 22px · 400</span></div>
        <div class="type-specimen__row"><span class="text-body-md">Body Medium</span><span class="type-specimen__meta">16px / 20px · 400</span></div>
        <div class="type-specimen__row"><span class="text-body-sm">Body Small</span><span class="type-specimen__meta">14px / 18px · 400</span></div>
        <div class="type-specimen__row"><span class="text-body-xs">Body XS</span><span class="type-specimen__meta">12px / 16px · 400</span></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Labels  · Inter Medium</h3>
          
          <div class="ds-showcase__meta">
            <code class="ds-api">.text-label-*</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--white">
<div class="type-specimen">
        <div class="type-specimen__row"><span class="text-label-lg">Label Large</span><span class="type-specimen__meta">16px / 22px · 500</span></div>
        <div class="type-specimen__row"><span class="text-label-md">Label Medium</span><span class="type-specimen__meta">14px / 18px · 500</span></div>
        <div class="type-specimen__row"><span class="text-label-sm">Label Small</span><span class="type-specimen__meta">12px / 16px · 500</span></div>
        <div class="type-specimen__row"><span class="text-label-sm-uppercase">Label SM Uppercase</span><span class="type-specimen__meta">12px / 16px · 500 · 0.5px tracking</span></div>
        <div class="type-specimen__row"><span class="text-label-md-uppercase">Label MD Uppercase</span><span class="type-specimen__meta">14px / 18px · 500 · 0.5px tracking</span></div>
      </div>
        </div>
      </article>

      <article class="ds-showcase">
        <div class="ds-showcase__head">
          <h3 class="ds-showcase__title">Numbers</h3>
          <p class="ds-showcase__desc">Large stat displays: verification scores, counts.</p>
          <div class="ds-showcase__meta">
            <code class="ds-api">.text-numbers-xl</code>
            
          </div>
        </div>
        <div class="ds-showcase__canvas ds-showcase__canvas--white">
<div class="type-specimen">
        <div class="type-specimen__row"><span class="text-numbers-xl">128</span><span class="type-specimen__meta">64px / 61px · Regular</span></div>
      </div>
        </div>
      </article>
    </section>`},{id:"tokens",title:"Design tokens",desc:"Reference documentation for color, typography, spacing, radius, and elevation tokens. Source of truth: <code>tokens/tokens.css</code> and Figma ADS 2026.",html:`<section class="ds-chapter ds-tab-panel">
  <header class="ds-chapter__header">
    <h2 class="ds-chapter__title">Design tokens</h2>
    <p class="ds-chapter__desc">Reference documentation for color, typography, spacing, radius, and elevation tokens. Source of truth: <code>tokens/tokens.css</code> and Figma ADS 2026.</p>
    <div class="ds-token-doc-meta">
      <span><strong>Contributors:</strong> Zoey, Ecem, Mandeep</span>
      <span><strong>Last updated:</strong> 2026-06-30</span>
    </div>
  </header>

<nav class="ds-token-tabs" role="tablist" aria-label="Token categories">
    <button type="button" class="ds-token-tabs__btn is-active" role="tab" id="token-tab-core-colors" data-token-tab="core-colors" aria-selected="true" aria-controls="token-panel-core-colors" tabindex="0">Core colors</button>
    <button type="button" class="ds-token-tabs__btn" role="tab" id="token-tab-color-tokens" data-token-tab="color-tokens" aria-selected="false" aria-controls="token-panel-color-tokens" tabindex="-1">Color tokens</button>
    <button type="button" class="ds-token-tabs__btn" role="tab" id="token-tab-typography-tokens" data-token-tab="typography-tokens" aria-selected="false" aria-controls="token-panel-typography-tokens" tabindex="-1">Typography tokens</button>
    <button type="button" class="ds-token-tabs__btn" role="tab" id="token-tab-spacing-radius-tokens" data-token-tab="spacing-radius-tokens" aria-selected="false" aria-controls="token-panel-spacing-radius-tokens" tabindex="-1">Spacing &amp; radius tokens</button>
    <button type="button" class="ds-token-tabs__btn" role="tab" id="token-tab-elevation-tokens" data-token-tab="elevation-tokens" aria-selected="false" aria-controls="token-panel-elevation-tokens" tabindex="-1">Elevation tokens</button>
  </nav>

  <div class="ds-token-panels">
<div class="ds-token-panel is-active" id="token-panel-core-colors" role="tabpanel" aria-labelledby="token-tab-core-colors">
<article class="ds-showcase" id="token-doc-core-colors">
  <div class="ds-showcase__head">
    <h3 class="ds-showcase__title">Core colors</h3>
    <p class="ds-showcase__desc">Raw color palette for the Trulioo design system. These are the foundational primitives: use semantic tokens in production.</p>
    <div class="ds-showcase__meta">
      <code class="ds-api">tokens/tokens.css</code>
      <a class="ds-token-figma-link" href="https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026?node-id=84-418" target="_blank" rel="noopener noreferrer">View in Figma</a>
    </div>
  </div>
  <div class="ds-showcase__canvas ds-showcase__canvas--flush ds-showcase__canvas--token-doc">
    <div class="ds-token-table">
      <div class="ds-token-table__head"><span>Token</span><span>Hex</span><span>Preview</span></div>
      <div class="ds-token-group-label">Teal</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/teal/10</span>
    <code class="ds-token-row__var">var(--color-teal-10)</code>
  </div>
  <div class="ds-token-row__usage">#e6f8f4</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-teal-10)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#e6f8f4</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/teal/20</span>
    <code class="ds-token-row__var">var(--color-teal-20)</code>
  </div>
  <div class="ds-token-row__usage">#c2ede4</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-teal-20)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#c2ede4</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/teal/30</span>
    <code class="ds-token-row__var">var(--color-teal-30)</code>
  </div>
  <div class="ds-token-row__usage">#8ed8ca</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-teal-30)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#8ed8ca</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/teal/40</span>
    <code class="ds-token-row__var">var(--color-teal-40)</code>
  </div>
  <div class="ds-token-row__usage">#5ac0ae</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-teal-40)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#5ac0ae</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/teal/50</span>
    <code class="ds-token-row__var">var(--color-teal-50)</code>
  </div>
  <div class="ds-token-row__usage">#2ea892</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-teal-50)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#2ea892</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/teal/60</span>
    <code class="ds-token-row__var">var(--color-teal-60)</code>
  </div>
  <div class="ds-token-row__usage">#0e8a78</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-teal-60)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#0e8a78</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/teal/70</span>
    <code class="ds-token-row__var">var(--color-teal-70)</code>
  </div>
  <div class="ds-token-row__usage">#006b5c</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-teal-70)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#006b5c</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/teal/80</span>
    <code class="ds-token-row__var">var(--color-teal-80)</code>
  </div>
  <div class="ds-token-row__usage">#004c45</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-teal-80)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#004c45</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/teal/90</span>
    <code class="ds-token-row__var">var(--color-teal-90)</code>
  </div>
  <div class="ds-token-row__usage">#003530</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-teal-90)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#003530</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/teal/100</span>
    <code class="ds-token-row__var">var(--color-teal-100)</code>
  </div>
  <div class="ds-token-row__usage">#00201e</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-teal-100)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#00201e</span>
  </div>
</div><div class="ds-token-group-label">Violet</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/violet/10</span>
    <code class="ds-token-row__var">var(--color-violet-10)</code>
  </div>
  <div class="ds-token-row__usage">#f5eefb</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-violet-10)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#f5eefb</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/violet/20</span>
    <code class="ds-token-row__var">var(--color-violet-20)</code>
  </div>
  <div class="ds-token-row__usage">#e8d8f5</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-violet-20)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#e8d8f5</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/violet/30</span>
    <code class="ds-token-row__var">var(--color-violet-30)</code>
  </div>
  <div class="ds-token-row__usage">#dcc0f5</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-violet-30)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#dcc0f5</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/violet/40</span>
    <code class="ds-token-row__var">var(--color-violet-40)</code>
  </div>
  <div class="ds-token-row__usage">#c8a0ea</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-violet-40)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#c8a0ea</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/violet/50</span>
    <code class="ds-token-row__var">var(--color-violet-50)</code>
  </div>
  <div class="ds-token-row__usage">#b080dc</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-violet-50)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#b080dc</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/violet/60</span>
    <code class="ds-token-row__var">var(--color-violet-60)</code>
  </div>
  <div class="ds-token-row__usage">#9460c8</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-violet-60)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#9460c8</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/violet/70</span>
    <code class="ds-token-row__var">var(--color-violet-70)</code>
  </div>
  <div class="ds-token-row__usage">#7840a8</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-violet-70)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#7840a8</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/violet/80</span>
    <code class="ds-token-row__var">var(--color-violet-80)</code>
  </div>
  <div class="ds-token-row__usage">#592d80</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-violet-80)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#592d80</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/violet/90</span>
    <code class="ds-token-row__var">var(--color-violet-90)</code>
  </div>
  <div class="ds-token-row__usage">#3d1d60</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-violet-90)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#3d1d60</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/violet/100</span>
    <code class="ds-token-row__var">var(--color-violet-100)</code>
  </div>
  <div class="ds-token-row__usage">#2e1548</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-violet-100)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#2e1548</span>
  </div>
</div><div class="ds-token-group-label">Neutral</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/neutral/10</span>
    <code class="ds-token-row__var">var(--color-neutral-10)</code>
  </div>
  <div class="ds-token-row__usage">#f4f6f4</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-neutral-10)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#f4f6f4</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/neutral/15</span>
    <code class="ds-token-row__var">var(--color-neutral-15)</code>
  </div>
  <div class="ds-token-row__usage">#e8ede8</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-neutral-15)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#e8ede8</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/neutral/20</span>
    <code class="ds-token-row__var">var(--color-neutral-20)</code>
  </div>
  <div class="ds-token-row__usage">#dde2de</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-neutral-20)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#dde2de</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/neutral/30</span>
    <code class="ds-token-row__var">var(--color-neutral-30)</code>
  </div>
  <div class="ds-token-row__usage">#c5cec8</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-neutral-30)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#c5cec8</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/neutral/40</span>
    <code class="ds-token-row__var">var(--color-neutral-40)</code>
  </div>
  <div class="ds-token-row__usage">#a8b4ac</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-neutral-40)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#a8b4ac</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/neutral/50</span>
    <code class="ds-token-row__var">var(--color-neutral-50)</code>
  </div>
  <div class="ds-token-row__usage">#8a9a90</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-neutral-50)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#8a9a90</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/neutral/60</span>
    <code class="ds-token-row__var">var(--color-neutral-60)</code>
  </div>
  <div class="ds-token-row__usage">#617269</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-neutral-60)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#617269</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/neutral/70</span>
    <code class="ds-token-row__var">var(--color-neutral-70)</code>
  </div>
  <div class="ds-token-row__usage">#526660</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-neutral-70)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#526660</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/neutral/80</span>
    <code class="ds-token-row__var">var(--color-neutral-80)</code>
  </div>
  <div class="ds-token-row__usage">#3d524d</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-neutral-80)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#3d524d</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/neutral/90</span>
    <code class="ds-token-row__var">var(--color-neutral-90)</code>
  </div>
  <div class="ds-token-row__usage">#2a3f3b</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-neutral-90)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#2a3f3b</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/neutral/100</span>
    <code class="ds-token-row__var">var(--color-neutral-100)</code>
  </div>
  <div class="ds-token-row__usage">#172d2d</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-neutral-100)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#172d2d</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/white</span>
    <code class="ds-token-row__var">var(--color-white)</code>
  </div>
  <div class="ds-token-row__usage">#ffffff</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-white)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#ffffff</span>
  </div>
</div><div class="ds-token-group-label">Status</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/red/border</span>
    <code class="ds-token-row__var">var(--color-red-border)</code>
  </div>
  <div class="ds-token-row__usage">#db2b2b</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-red-border)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#db2b2b</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/red/bg</span>
    <code class="ds-token-row__var">var(--color-red-bg)</code>
  </div>
  <div class="ds-token-row__usage">#fff1f1</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-red-bg)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#fff1f1</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/red/text</span>
    <code class="ds-token-row__var">var(--color-red-text)</code>
  </div>
  <div class="ds-token-row__usage">#ba151d</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-red-text)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#ba151d</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/amber/border</span>
    <code class="ds-token-row__var">var(--color-amber-border)</code>
  </div>
  <div class="ds-token-row__usage">#d8a13b</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-amber-border)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#d8a13b</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/amber/bg</span>
    <code class="ds-token-row__var">var(--color-amber-bg)</code>
  </div>
  <div class="ds-token-row__usage">#fff4db</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-amber-bg)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#fff4db</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/amber/text</span>
    <code class="ds-token-row__var">var(--color-amber-text)</code>
  </div>
  <div class="ds-token-row__usage">#775516</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-amber-text)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#775516</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/amber/icon</span>
    <code class="ds-token-row__var">var(--color-amber-icon)</code>
  </div>
  <div class="ds-token-row__usage">#b07a1a</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-amber-icon)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#b07a1a</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/green/border</span>
    <code class="ds-token-row__var">var(--color-green-border)</code>
  </div>
  <div class="ds-token-row__usage">#6fb38a</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-green-border)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#6fb38a</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/green/bg</span>
    <code class="ds-token-row__var">var(--color-green-bg)</code>
  </div>
  <div class="ds-token-row__usage">#eaf7f0</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-green-bg)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#eaf7f0</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/green/text</span>
    <code class="ds-token-row__var">var(--color-green-text)</code>
  </div>
  <div class="ds-token-row__usage">#166534</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-green-text)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#166534</span>
  </div>
</div><div class="ds-token-row ds-token-row--core">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">color/green/icon</span>
    <code class="ds-token-row__var">var(--color-green-icon)</code>
  </div>
  <div class="ds-token-row__usage">#3d8b5e</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--color-green-icon)" aria-hidden="true"></span>
    <span class="ds-token-row__hex">#3d8b5e</span>
  </div>
</div>
    </div>
  </div>
</article>
</div>

<div class="ds-token-panel" id="token-panel-color-tokens" role="tabpanel" aria-labelledby="token-tab-color-tokens" hidden>
<article class="ds-showcase" id="token-doc-color-tokens">
  <div class="ds-showcase__head">
    <h3 class="ds-showcase__title">Color tokens</h3>
    <p class="ds-showcase__desc">Semantic color variables for the Trulioo design system. All tokens alias Core primitives and are scoped for specific use cases.</p>
    <div class="ds-showcase__meta">
      <code class="ds-api">tokens/tokens.css</code>
      <a class="ds-token-figma-link" href="https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026?node-id=84-418" target="_blank" rel="noopener noreferrer">View in Figma</a>
    </div>
  </div>
  <div class="ds-showcase__canvas ds-showcase__canvas--flush ds-showcase__canvas--token-doc">
    <div class="ds-token-table">
      <div class="ds-token-table__head ds-token-table__head--color"><span>Token</span><span>Usage</span><span>Light mode</span></div>
      <div class="ds-token-group-label">Text</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">text/default</span>
    <span class="ds-token-row__alias">→ neutral/100</span>
  </div>
  <div class="ds-token-row__usage">Main text color for headings, paragraphs, and data values</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--text-default)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#172d2d</span>
      <code class="ds-token-row__var">var(--text-default)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">text/description</span>
    <span class="ds-token-row__alias">→ neutral/70</span>
  </div>
  <div class="ds-token-row__usage">Supporting text for secondary details and helper text</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--text-description)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#526660</span>
      <code class="ds-token-row__var">var(--text-description)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">text/caption</span>
    <span class="ds-token-row__alias">→ neutral/60</span>
  </div>
  <div class="ds-token-row__usage">Smallest text for timestamps, units, and metadata</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--text-caption)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#617269</span>
      <code class="ds-token-row__var">var(--text-caption)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">text/placeholder</span>
    <span class="ds-token-row__alias">→ neutral/50</span>
  </div>
  <div class="ds-token-row__usage">Field labels, category headers, and input placeholder text</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--text-placeholder)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#8a9a90</span>
      <code class="ds-token-row__var">var(--text-placeholder)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">text/inverse</span>
    <span class="ds-token-row__alias">→ white</span>
  </div>
  <div class="ds-token-row__usage">Text on dark or colored backgrounds</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--text-inverse)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#ffffff</span>
      <code class="ds-token-row__var">var(--text-inverse)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">text/disabled</span>
    <span class="ds-token-row__alias">→ neutral/50</span>
  </div>
  <div class="ds-token-row__usage">Text in disabled or inactive states</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--text-disabled)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#8a9a90</span>
      <code class="ds-token-row__var">var(--text-disabled)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">text/link</span>
    <span class="ds-token-row__alias">→ teal/70</span>
  </div>
  <div class="ds-token-row__usage">Hyperlink and link text color</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--text-link)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#006b5c</span>
      <code class="ds-token-row__var">var(--text-link)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">text/negative</span>
    <span class="ds-token-row__alias">→ red/text</span>
  </div>
  <div class="ds-token-row__usage">Error messages and destructive status text</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--text-negative)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#ba151d</span>
      <code class="ds-token-row__var">var(--text-negative)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">text/intermediate</span>
    <span class="ds-token-row__alias">→ amber/text</span>
  </div>
  <div class="ds-token-row__usage">Warning and pending status text</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--text-intermediate)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#775516</span>
      <code class="ds-token-row__var">var(--text-intermediate)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">text/positive</span>
    <span class="ds-token-row__alias">→ green/text</span>
  </div>
  <div class="ds-token-row__usage">Success and verified status text</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--text-positive)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#166534</span>
      <code class="ds-token-row__var">var(--text-positive)</code>
    </div>
  </div>
</div><div class="ds-token-group-label">Surface</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">surface/neutral/01</span>
    <span class="ds-token-row__alias">→ white</span>
  </div>
  <div class="ds-token-row__usage">Primary page and card backgrounds</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--surface-neutral-01)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#ffffff</span>
      <code class="ds-token-row__var">var(--surface-neutral-01)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">surface/neutral/02</span>
    <span class="ds-token-row__alias">→ neutral/10</span>
  </div>
  <div class="ds-token-row__usage">Subtle section backgrounds and table stripes</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--surface-neutral-02)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#f4f6f4</span>
      <code class="ds-token-row__var">var(--surface-neutral-02)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">surface/neutral/03</span>
    <span class="ds-token-row__alias">→ neutral/15</span>
  </div>
  <div class="ds-token-row__usage">Secondary containers and grouped panels</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--surface-neutral-03)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#e8ede8</span>
      <code class="ds-token-row__var">var(--surface-neutral-03)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">surface/neutral/04</span>
    <span class="ds-token-row__alias">→ neutral/20</span>
  </div>
  <div class="ds-token-row__usage">Tertiary surfaces and inset areas</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--surface-neutral-04)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#dde2de</span>
      <code class="ds-token-row__var">var(--surface-neutral-04)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">surface/disabled</span>
    <span class="ds-token-row__alias">→ neutral/20</span>
  </div>
  <div class="ds-token-row__usage">Disabled input and control backgrounds</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--surface-disabled)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#dde2de</span>
      <code class="ds-token-row__var">var(--surface-disabled)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">surface/hover</span>
    <span class="ds-token-row__alias">→ neutral/10</span>
  </div>
  <div class="ds-token-row__usage">Hover state for list rows and menu items</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--surface-hover)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#f4f6f4</span>
      <code class="ds-token-row__var">var(--surface-hover)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">surface/selected</span>
    <span class="ds-token-row__alias">→ teal/10</span>
  </div>
  <div class="ds-token-row__usage">Selected rows, tabs, and filter chips</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--surface-selected)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#e6f8f4</span>
      <code class="ds-token-row__var">var(--surface-selected)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">surface/overlay</span>
    <span class="ds-token-row__alias">#171c1a @ 50%</span>
  </div>
  <div class="ds-token-row__usage">Modal and drawer backdrop scrim</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--surface-overlay)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#171c1a @ 50%</span>
      <code class="ds-token-row__var">var(--surface-overlay)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">surface/inverse</span>
    <span class="ds-token-row__alias">→ neutral/100</span>
  </div>
  <div class="ds-token-row__usage">Dark toolbars, inverse headers, and footers</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--surface-inverse)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#172d2d</span>
      <code class="ds-token-row__var">var(--surface-inverse)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">surface/negative</span>
    <span class="ds-token-row__alias">→ red/bg</span>
  </div>
  <div class="ds-token-row__usage">Error alert and validation message backgrounds</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--surface-negative)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#fff1f1</span>
      <code class="ds-token-row__var">var(--surface-negative)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">surface/intermediate</span>
    <span class="ds-token-row__alias">→ amber/bg</span>
  </div>
  <div class="ds-token-row__usage">Warning alert backgrounds</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--surface-intermediate)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#fff4db</span>
      <code class="ds-token-row__var">var(--surface-intermediate)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">surface/positive</span>
    <span class="ds-token-row__alias">→ green/bg</span>
  </div>
  <div class="ds-token-row__usage">Success alert and verified state backgrounds</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--surface-positive)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#eaf7f0</span>
      <code class="ds-token-row__var">var(--surface-positive)</code>
    </div>
  </div>
</div><div class="ds-token-group-label">Border</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">border/subtle</span>
    <span class="ds-token-row__alias">→ neutral/20</span>
  </div>
  <div class="ds-token-row__usage">Default borders on cards, inputs, and dividers</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--border-subtle)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#dde2de</span>
      <code class="ds-token-row__var">var(--border-subtle)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">border/strong</span>
    <span class="ds-token-row__alias">→ neutral/30</span>
  </div>
  <div class="ds-token-row__usage">Emphasized borders on inputs and data cells</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--border-strong)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#c5cec8</span>
      <code class="ds-token-row__var">var(--border-strong)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">border/interactive</span>
    <span class="ds-token-row__alias">→ teal/80</span>
  </div>
  <div class="ds-token-row__usage">Interactive control outlines and selected borders</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--border-interactive)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#004c45</span>
      <code class="ds-token-row__var">var(--border-interactive)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">border/divider</span>
    <span class="ds-token-row__alias">→ neutral/15</span>
  </div>
  <div class="ds-token-row__usage">Section dividers and list separators</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--border-divider)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#e8ede8</span>
      <code class="ds-token-row__var">var(--border-divider)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">border/disabled</span>
    <span class="ds-token-row__alias">→ neutral/30</span>
  </div>
  <div class="ds-token-row__usage">Disabled control borders</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--border-disabled)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#c5cec8</span>
      <code class="ds-token-row__var">var(--border-disabled)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">border/focus</span>
    <span class="ds-token-row__alias">→ teal/60</span>
  </div>
  <div class="ds-token-row__usage">Focus rings on interactive elements</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--border-focus)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#0e8a78</span>
      <code class="ds-token-row__var">var(--border-focus)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">border/selected</span>
    <span class="ds-token-row__alias">→ teal/80</span>
  </div>
  <div class="ds-token-row__usage">Selected item borders</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--border-selected)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#004c45</span>
      <code class="ds-token-row__var">var(--border-selected)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">border/negative</span>
    <span class="ds-token-row__alias">→ red/border</span>
  </div>
  <div class="ds-token-row__usage">Error state borders</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--border-negative)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#db2b2b</span>
      <code class="ds-token-row__var">var(--border-negative)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">border/intermediate</span>
    <span class="ds-token-row__alias">→ amber/border</span>
  </div>
  <div class="ds-token-row__usage">Warning state borders</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--border-intermediate)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#d8a13b</span>
      <code class="ds-token-row__var">var(--border-intermediate)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">border/positive</span>
    <span class="ds-token-row__alias">→ green/border</span>
  </div>
  <div class="ds-token-row__usage">Success state borders</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--border-positive)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#6fb38a</span>
      <code class="ds-token-row__var">var(--border-positive)</code>
    </div>
  </div>
</div><div class="ds-token-group-label">Interactive</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">interactive/default</span>
    <span class="ds-token-row__alias">→ teal/80</span>
  </div>
  <div class="ds-token-row__usage">Primary button and link fill</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--interactive-default)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#004c45</span>
      <code class="ds-token-row__var">var(--interactive-default)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">interactive/hover</span>
    <span class="ds-token-row__alias">→ teal/90</span>
  </div>
  <div class="ds-token-row__usage">Primary button hover fill</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--interactive-hover)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#003530</span>
      <code class="ds-token-row__var">var(--interactive-hover)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">interactive/active</span>
    <span class="ds-token-row__alias">→ teal/100</span>
  </div>
  <div class="ds-token-row__usage">Primary button pressed fill</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--interactive-active)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#00201e</span>
      <code class="ds-token-row__var">var(--interactive-active)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">interactive/subtle</span>
    <span class="ds-token-row__alias">→ teal/10</span>
  </div>
  <div class="ds-token-row__usage">Subtle interactive backgrounds and chips</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--interactive-subtle)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#e6f8f4</span>
      <code class="ds-token-row__var">var(--interactive-subtle)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">interactive/disabled</span>
    <span class="ds-token-row__alias">→ neutral/40</span>
  </div>
  <div class="ds-token-row__usage">Disabled interactive control fill</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--interactive-disabled)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#a8b4ac</span>
      <code class="ds-token-row__var">var(--interactive-disabled)</code>
    </div>
  </div>
</div><div class="ds-token-group-label">Icon</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">icon/default</span>
    <span class="ds-token-row__alias">→ neutral/100</span>
  </div>
  <div class="ds-token-row__usage">Default icon color on light surfaces</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--icon-default)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#172d2d</span>
      <code class="ds-token-row__var">var(--icon-default)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">icon/muted</span>
    <span class="ds-token-row__alias">→ neutral/70</span>
  </div>
  <div class="ds-token-row__usage">Secondary icons in toolbars and metadata</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--icon-muted)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#526660</span>
      <code class="ds-token-row__var">var(--icon-muted)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">icon/faint</span>
    <span class="ds-token-row__alias">→ neutral/60</span>
  </div>
  <div class="ds-token-row__usage">Decorative and low-emphasis icons</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--icon-faint)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#617269</span>
      <code class="ds-token-row__var">var(--icon-faint)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">icon/disabled</span>
    <span class="ds-token-row__alias">→ neutral/50</span>
  </div>
  <div class="ds-token-row__usage">Icons in disabled states</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--icon-disabled)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#8a9a90</span>
      <code class="ds-token-row__var">var(--icon-disabled)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">icon/inverse</span>
    <span class="ds-token-row__alias">→ white</span>
  </div>
  <div class="ds-token-row__usage">Icons on dark or colored backgrounds</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--icon-inverse)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#ffffff</span>
      <code class="ds-token-row__var">var(--icon-inverse)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">icon/interactive</span>
    <span class="ds-token-row__alias">→ teal/80</span>
  </div>
  <div class="ds-token-row__usage">Interactive icon buttons and links</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--icon-interactive)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#004c45</span>
      <code class="ds-token-row__var">var(--icon-interactive)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">icon/negative</span>
    <span class="ds-token-row__alias">→ red/border</span>
  </div>
  <div class="ds-token-row__usage">Error and destructive action icons</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--icon-negative)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#db2b2b</span>
      <code class="ds-token-row__var">var(--icon-negative)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">icon/intermediate</span>
    <span class="ds-token-row__alias">→ amber/icon</span>
  </div>
  <div class="ds-token-row__usage">Warning status icons</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--icon-intermediate)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#b07a1a</span>
      <code class="ds-token-row__var">var(--icon-intermediate)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">icon/positive</span>
    <span class="ds-token-row__alias">→ green/icon</span>
  </div>
  <div class="ds-token-row__usage">Success and verified status icons</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--icon-positive)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#3d8b5e</span>
      <code class="ds-token-row__var">var(--icon-positive)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">icon/ai</span>
    <span class="ds-token-row__alias">→ violet/80</span>
  </div>
  <div class="ds-token-row__usage">AI and Labs feature accent icons</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--icon-ai)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#592d80</span>
      <code class="ds-token-row__var">var(--icon-ai)</code>
    </div>
  </div>
</div><div class="ds-token-group-label">AI</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">ai/accent</span>
    <span class="ds-token-row__alias">→ violet/80</span>
  </div>
  <div class="ds-token-row__usage">AI feature accent color</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--ai-accent)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#592d80</span>
      <code class="ds-token-row__var">var(--ai-accent)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">ai/surface</span>
    <span class="ds-token-row__alias">→ violet/10</span>
  </div>
  <div class="ds-token-row__usage">AI panel and badge backgrounds</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--ai-surface)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#f5eefb</span>
      <code class="ds-token-row__var">var(--ai-surface)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">ai/badge</span>
    <span class="ds-token-row__alias">→ violet/30</span>
  </div>
  <div class="ds-token-row__usage">AI badge fill</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--ai-badge)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#dcc0f5</span>
      <code class="ds-token-row__var">var(--ai-badge)</code>
    </div>
  </div>
</div><div class="ds-token-row">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">ai/hover</span>
    <span class="ds-token-row__alias">→ violet/20</span>
  </div>
  <div class="ds-token-row__usage">AI interactive hover background</div>
  <div class="ds-token-row__preview">
    <span class="ds-token-swatch" style="background: var(--ai-hover)" aria-hidden="true"></span>
    <div class="ds-token-row__values">
      <span class="ds-token-row__hex">#e8d8f5</span>
      <code class="ds-token-row__var">var(--ai-hover)</code>
    </div>
  </div>
</div>
    </div>
  </div>
</article>
</div>

<div class="ds-token-panel" id="token-panel-typography-tokens" role="tabpanel" aria-labelledby="token-tab-typography-tokens" hidden>
<article class="ds-showcase" id="token-doc-typography-tokens">
  <div class="ds-showcase__head">
    <h3 class="ds-showcase__title">Typography tokens</h3>
    <p class="ds-showcase__desc">Font families, sizes, weights, and line heights used across the system.</p>
    <div class="ds-showcase__meta">
      <code class="ds-api">tokens/tokens.css</code>
      <a class="ds-token-figma-link" href="https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026?node-id=84-418" target="_blank" rel="noopener noreferrer">View in Figma</a>
    </div>
  </div>
  <div class="ds-showcase__canvas ds-showcase__canvas--flush ds-showcase__canvas--token-doc">
    <div class="ds-token-table">
      <div class="ds-token-table__head ds-token-table__head--3"><span>Token</span><span>Value</span><span>Notes</span></div>
      <div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/family</span>
    <code class="ds-token-row__var">var(--font-family)</code>
  </div>
  <div class="ds-token-row__usage">&quot;Inter&quot;, sans-serif</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/family/display</span>
    <code class="ds-token-row__var">var(--font-family-display)</code>
  </div>
  <div class="ds-token-row__usage">&quot;Tobias&quot;, Georgia, &quot;Times New Roman&quot;, serif</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/family/mono</span>
    <code class="ds-token-row__var">var(--font-family-mono)</code>
  </div>
  <div class="ds-token-row__usage">&quot;SF Mono&quot;, &quot;JetBrains Mono&quot;, &quot;DM Mono&quot;, &quot;Fira Code&quot;, monospace</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">text/tab/default</span>
    <code class="ds-token-row__var">var(--text-tab-default)</code>
  </div>
  <div class="ds-token-row__usage">#666666</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">text/tab/disabled</span>
    <code class="ds-token-row__var">var(--text-tab-disabled)</code>
  </div>
  <div class="ds-token-row__usage">#b3b3b3</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/size/xs</span>
    <code class="ds-token-row__var">var(--font-size-xs)</code>
  </div>
  <div class="ds-token-row__usage">0.75rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">12px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/size/sm</span>
    <code class="ds-token-row__var">var(--font-size-sm)</code>
  </div>
  <div class="ds-token-row__usage">0.875rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">14px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/size/md</span>
    <code class="ds-token-row__var">var(--font-size-md)</code>
  </div>
  <div class="ds-token-row__usage">1rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">16px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/size/lg</span>
    <code class="ds-token-row__var">var(--font-size-lg)</code>
  </div>
  <div class="ds-token-row__usage">1.125rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">18px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/size/xl</span>
    <code class="ds-token-row__var">var(--font-size-xl)</code>
  </div>
  <div class="ds-token-row__usage">1.25rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">20px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/size/2xl</span>
    <code class="ds-token-row__var">var(--font-size-2xl)</code>
  </div>
  <div class="ds-token-row__usage">1.5rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">24px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/size/3xl</span>
    <code class="ds-token-row__var">var(--font-size-3xl)</code>
  </div>
  <div class="ds-token-row__usage">1.75rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">28px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/size/4xl</span>
    <code class="ds-token-row__var">var(--font-size-4xl)</code>
  </div>
  <div class="ds-token-row__usage">2rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">32px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/size/display/sm</span>
    <code class="ds-token-row__var">var(--font-size-display-sm)</code>
  </div>
  <div class="ds-token-row__usage">2.25rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">36px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/size/display/md</span>
    <code class="ds-token-row__var">var(--font-size-display-md)</code>
  </div>
  <div class="ds-token-row__usage">2.625rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">42px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/size/display/lg</span>
    <code class="ds-token-row__var">var(--font-size-display-lg)</code>
  </div>
  <div class="ds-token-row__usage">3rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">48px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/size/display/xl</span>
    <code class="ds-token-row__var">var(--font-size-display-xl)</code>
  </div>
  <div class="ds-token-row__usage">3.375rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">54px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/size/display/2xl</span>
    <code class="ds-token-row__var">var(--font-size-display-2xl)</code>
  </div>
  <div class="ds-token-row__usage">3.75rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">60px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/size/display/3xl</span>
    <code class="ds-token-row__var">var(--font-size-display-3xl)</code>
  </div>
  <div class="ds-token-row__usage">4.75rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">76px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">line/height/xs</span>
    <code class="ds-token-row__var">var(--line-height-xs)</code>
  </div>
  <div class="ds-token-row__usage">1rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">16px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">line/height/sm</span>
    <code class="ds-token-row__var">var(--line-height-sm)</code>
  </div>
  <div class="ds-token-row__usage">1.125rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">18px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">line/height/md</span>
    <code class="ds-token-row__var">var(--line-height-md)</code>
  </div>
  <div class="ds-token-row__usage">1.25rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">20px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">line/height/lg</span>
    <code class="ds-token-row__var">var(--line-height-lg)</code>
  </div>
  <div class="ds-token-row__usage">1.375rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">22px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">line/height/xl</span>
    <code class="ds-token-row__var">var(--line-height-xl)</code>
  </div>
  <div class="ds-token-row__usage">1.5rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">24px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">line/height/2xl</span>
    <code class="ds-token-row__var">var(--line-height-2xl)</code>
  </div>
  <div class="ds-token-row__usage">1.625rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">26px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">line/height/3xl</span>
    <code class="ds-token-row__var">var(--line-height-3xl)</code>
  </div>
  <div class="ds-token-row__usage">1.875rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">30px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">line/height/4xl</span>
    <code class="ds-token-row__var">var(--line-height-4xl)</code>
  </div>
  <div class="ds-token-row__usage">2.25rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">36px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">line/height/5xl</span>
    <code class="ds-token-row__var">var(--line-height-5xl)</code>
  </div>
  <div class="ds-token-row__usage">2.5rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">40px</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/weight/light</span>
    <code class="ds-token-row__var">var(--font-weight-light)</code>
  </div>
  <div class="ds-token-row__usage">300</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/weight/regular</span>
    <code class="ds-token-row__var">var(--font-weight-regular)</code>
  </div>
  <div class="ds-token-row__usage">400</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/weight/medium</span>
    <code class="ds-token-row__var">var(--font-weight-medium)</code>
  </div>
  <div class="ds-token-row__usage">500</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/weight/semibold</span>
    <code class="ds-token-row__var">var(--font-weight-semibold)</code>
  </div>
  <div class="ds-token-row__usage">600</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/weight/bold</span>
    <code class="ds-token-row__var">var(--font-weight-bold)</code>
  </div>
  <div class="ds-token-row__usage">700</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/weight/figma</span>
    <code class="ds-token-row__var">var(--font-weight-figma)</code>
  </div>
  <div class="ds-token-row__usage">500</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/variation/figma/medium</span>
    <code class="ds-token-row__var">var(--font-variation-figma-medium)</code>
  </div>
  <div class="ds-token-row__usage">&quot;wght&quot; 500</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">font/variation/figma/semibold</span>
    <code class="ds-token-row__var">var(--font-variation-figma-semibold)</code>
  </div>
  <div class="ds-token-row__usage">&quot;wght&quot; 600</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div>
    </div>
  </div>
</article>
</div>

<div class="ds-token-panel" id="token-panel-spacing-radius-tokens" role="tabpanel" aria-labelledby="token-tab-spacing-radius-tokens" hidden>
<article class="ds-showcase" id="token-doc-spacing-radius-tokens">
  <div class="ds-showcase__head">
    <h3 class="ds-showcase__title">Spacing &amp; radius tokens</h3>
    <p class="ds-showcase__desc">Spacing and border radius variables for consistent layout. Core tokens define raw values; semantic tokens alias them for specific use cases.</p>
    <div class="ds-showcase__meta">
      <code class="ds-api">tokens/tokens.css</code>
      <a class="ds-token-figma-link" href="https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026?node-id=84-418" target="_blank" rel="noopener noreferrer">View in Figma</a>
    </div>
  </div>
  <div class="ds-showcase__canvas ds-showcase__canvas--flush ds-showcase__canvas--token-doc">
    <div class="ds-token-table">
      <div class="ds-token-table__head ds-token-table__head--3"><span>Token</span><span>Value</span><span>Notes</span></div>
      <div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">spacing/2</span>
    <code class="ds-token-row__var">var(--spacing-2)</code>
  </div>
  <div class="ds-token-row__usage">0.125rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--spacing-2)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">spacing/4</span>
    <code class="ds-token-row__var">var(--spacing-4)</code>
  </div>
  <div class="ds-token-row__usage">0.25rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--spacing-4)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">spacing/8</span>
    <code class="ds-token-row__var">var(--spacing-8)</code>
  </div>
  <div class="ds-token-row__usage">0.5rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--spacing-8)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">spacing/12</span>
    <code class="ds-token-row__var">var(--spacing-12)</code>
  </div>
  <div class="ds-token-row__usage">0.75rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--spacing-12)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">spacing/16</span>
    <code class="ds-token-row__var">var(--spacing-16)</code>
  </div>
  <div class="ds-token-row__usage">1rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--spacing-16)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">spacing/24</span>
    <code class="ds-token-row__var">var(--spacing-24)</code>
  </div>
  <div class="ds-token-row__usage">1.5rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--spacing-24)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">spacing/32</span>
    <code class="ds-token-row__var">var(--spacing-32)</code>
  </div>
  <div class="ds-token-row__usage">2rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--spacing-32)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">spacing/40</span>
    <code class="ds-token-row__var">var(--spacing-40)</code>
  </div>
  <div class="ds-token-row__usage">2.5rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--spacing-40)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">spacing/48</span>
    <code class="ds-token-row__var">var(--spacing-48)</code>
  </div>
  <div class="ds-token-row__usage">3rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--spacing-48)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">spacing/64</span>
    <code class="ds-token-row__var">var(--spacing-64)</code>
  </div>
  <div class="ds-token-row__usage">4rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--spacing-64)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">spacing/80</span>
    <code class="ds-token-row__var">var(--spacing-80)</code>
  </div>
  <div class="ds-token-row__usage">5rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--spacing-80)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">spacing/96</span>
    <code class="ds-token-row__var">var(--spacing-96)</code>
  </div>
  <div class="ds-token-row__usage">6rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--spacing-96)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">spacing/160</span>
    <code class="ds-token-row__var">var(--spacing-160)</code>
  </div>
  <div class="ds-token-row__usage">10rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--spacing-160)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">spacing/200</span>
    <code class="ds-token-row__var">var(--spacing-200)</code>
  </div>
  <div class="ds-token-row__usage">12.5rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--spacing-200)"></span></div>
</div><div class="ds-token-group-label">Padding</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">padding/xs</span>
    <code class="ds-token-row__var">var(--padding-xs)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-4)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--padding-xs)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">padding/sm</span>
    <code class="ds-token-row__var">var(--padding-sm)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-8)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--padding-sm)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">padding/md</span>
    <code class="ds-token-row__var">var(--padding-md)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-12)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--padding-md)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">padding/lg</span>
    <code class="ds-token-row__var">var(--padding-lg)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-16)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--padding-lg)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">padding/xl</span>
    <code class="ds-token-row__var">var(--padding-xl)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-24)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--padding-xl)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">padding/2xl</span>
    <code class="ds-token-row__var">var(--padding-2xl)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-32)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--padding-2xl)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">padding/3xl</span>
    <code class="ds-token-row__var">var(--padding-3xl)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-40)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--padding-3xl)"></span></div>
</div><div class="ds-token-group-label">Gap</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">gap/xs</span>
    <code class="ds-token-row__var">var(--gap-xs)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-4)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--gap-xs)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">gap/sm</span>
    <code class="ds-token-row__var">var(--gap-sm)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-8)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--gap-sm)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">gap/md</span>
    <code class="ds-token-row__var">var(--gap-md)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-12)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--gap-md)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">gap/lg</span>
    <code class="ds-token-row__var">var(--gap-lg)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-16)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--gap-lg)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">gap/xl</span>
    <code class="ds-token-row__var">var(--gap-xl)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-24)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--gap-xl)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">gap/2xl</span>
    <code class="ds-token-row__var">var(--gap-2xl)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-32)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--gap-2xl)"></span></div>
</div><div class="ds-token-group-label">Margin</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">margin/sm</span>
    <code class="ds-token-row__var">var(--margin-sm)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-16)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--margin-sm)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">margin/md</span>
    <code class="ds-token-row__var">var(--margin-md)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-24)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--margin-md)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">margin/lg</span>
    <code class="ds-token-row__var">var(--margin-lg)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-32)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--margin-lg)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">margin/xl</span>
    <code class="ds-token-row__var">var(--margin-xl)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-48)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--margin-xl)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">margin/2xl</span>
    <code class="ds-token-row__var">var(--margin-2xl)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-64)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--margin-2xl)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">margin/3xl</span>
    <code class="ds-token-row__var">var(--margin-3xl)</code>
  </div>
  <div class="ds-token-row__usage">var(--spacing-96)</div>
  <div class="ds-token-row__preview"><span class="ds-token-spacing-preview" style="width: var(--margin-3xl)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">radius/none</span>
    <code class="ds-token-row__var">var(--radius-none)</code>
  </div>
  <div class="ds-token-row__usage">0</div>
  <div class="ds-token-row__preview"><span class="ds-token-radius-preview" style="border-radius: var(--radius-none)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">radius/xs</span>
    <code class="ds-token-row__var">var(--radius-xs)</code>
  </div>
  <div class="ds-token-row__usage">0.125rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-radius-preview" style="border-radius: var(--radius-xs)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">radius/sm</span>
    <code class="ds-token-row__var">var(--radius-sm)</code>
  </div>
  <div class="ds-token-row__usage">0.25rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-radius-preview" style="border-radius: var(--radius-sm)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">radius/md</span>
    <code class="ds-token-row__var">var(--radius-md)</code>
  </div>
  <div class="ds-token-row__usage">0.375rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-radius-preview" style="border-radius: var(--radius-md)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">radius/lg</span>
    <code class="ds-token-row__var">var(--radius-lg)</code>
  </div>
  <div class="ds-token-row__usage">0.5rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-radius-preview" style="border-radius: var(--radius-lg)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">radius/xl</span>
    <code class="ds-token-row__var">var(--radius-xl)</code>
  </div>
  <div class="ds-token-row__usage">0.75rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-radius-preview" style="border-radius: var(--radius-xl)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">radius/2xl</span>
    <code class="ds-token-row__var">var(--radius-2xl)</code>
  </div>
  <div class="ds-token-row__usage">1rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-radius-preview" style="border-radius: var(--radius-2xl)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">radius/3xl</span>
    <code class="ds-token-row__var">var(--radius-3xl)</code>
  </div>
  <div class="ds-token-row__usage">1.5rem</div>
  <div class="ds-token-row__preview"><span class="ds-token-radius-preview" style="border-radius: var(--radius-3xl)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">radius/full</span>
    <code class="ds-token-row__var">var(--radius-full)</code>
  </div>
  <div class="ds-token-row__usage">9999px</div>
  <div class="ds-token-row__preview"><span class="ds-token-radius-preview" style="border-radius: var(--radius-full)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">radius/button</span>
    <code class="ds-token-row__var">var(--radius-button)</code>
  </div>
  <div class="ds-token-row__usage">var(--radius-md)</div>
  <div class="ds-token-row__preview"><span class="ds-token-radius-preview" style="border-radius: var(--radius-button)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">radius/card</span>
    <code class="ds-token-row__var">var(--radius-card)</code>
  </div>
  <div class="ds-token-row__usage">var(--radius-lg)</div>
  <div class="ds-token-row__preview"><span class="ds-token-radius-preview" style="border-radius: var(--radius-card)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">radius/modal</span>
    <code class="ds-token-row__var">var(--radius-modal)</code>
  </div>
  <div class="ds-token-row__usage">var(--radius-xl)</div>
  <div class="ds-token-row__preview"><span class="ds-token-radius-preview" style="border-radius: var(--radius-modal)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">radius/section</span>
    <code class="ds-token-row__var">var(--radius-section)</code>
  </div>
  <div class="ds-token-row__usage">var(--radius-2xl)</div>
  <div class="ds-token-row__preview"><span class="ds-token-radius-preview" style="border-radius: var(--radius-section)"></span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">radius/badge</span>
    <code class="ds-token-row__var">var(--radius-badge)</code>
  </div>
  <div class="ds-token-row__usage">var(--radius-full)</div>
  <div class="ds-token-row__preview"><span class="ds-token-radius-preview" style="border-radius: var(--radius-badge)"></span></div>
</div>
    </div>
  </div>
</article>
</div>

<div class="ds-token-panel" id="token-panel-elevation-tokens" role="tabpanel" aria-labelledby="token-tab-elevation-tokens" hidden>
<article class="ds-showcase" id="token-doc-elevation-tokens">
  <div class="ds-showcase__head">
    <h3 class="ds-showcase__title">Elevation tokens</h3>
    <p class="ds-showcase__desc">Box shadow tokens for elevation and depth.</p>
    <div class="ds-showcase__meta">
      <code class="ds-api">tokens/tokens.css</code>
      <a class="ds-token-figma-link" href="https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026?node-id=84-418" target="_blank" rel="noopener noreferrer">View in Figma</a>
    </div>
  </div>
  <div class="ds-showcase__canvas ds-showcase__canvas--flush ds-showcase__canvas--token-doc">
    <div class="ds-token-table">
      <div class="ds-token-table__head ds-token-table__head--4"><span>Token</span><span>Usage</span><span>Preview</span></div>
      <div class="ds-token-row ds-token-row--elevation">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">elevation/xs</span>
    <code class="ds-token-row__var">var(--elevation-xs)</code>
  </div>
  <div class="ds-token-row__usage">Subtle lift: toggles, chips, inline cards</div>
  <div class="ds-token-row__preview"><span class="ds-token-elevation-preview" style="box-shadow: var(--elevation-xs)"></span></div>
</div><div class="ds-token-row ds-token-row--elevation">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">elevation/sm</span>
    <code class="ds-token-row__var">var(--elevation-sm)</code>
  </div>
  <div class="ds-token-row__usage">Default cards, dropdowns, popovers</div>
  <div class="ds-token-row__preview"><span class="ds-token-elevation-preview" style="box-shadow: var(--elevation-sm)"></span></div>
</div><div class="ds-token-row ds-token-row--elevation">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">elevation/md</span>
    <code class="ds-token-row__var">var(--elevation-md)</code>
  </div>
  <div class="ds-token-row__usage">Hover cards, raised panels, tooltips</div>
  <div class="ds-token-row__preview"><span class="ds-token-elevation-preview" style="box-shadow: var(--elevation-md)"></span></div>
</div><div class="ds-token-row ds-token-row--elevation">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">elevation/lg</span>
    <code class="ds-token-row__var">var(--elevation-lg)</code>
  </div>
  <div class="ds-token-row__usage">Drawers, sidebars, floating action buttons</div>
  <div class="ds-token-row__preview"><span class="ds-token-elevation-preview" style="box-shadow: var(--elevation-lg)"></span></div>
</div><div class="ds-token-row ds-token-row--elevation">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">elevation/xl</span>
    <code class="ds-token-row__var">var(--elevation-xl)</code>
  </div>
  <div class="ds-token-row__usage">Modals and elevated dialogs</div>
  <div class="ds-token-row__preview"><span class="ds-token-elevation-preview" style="box-shadow: var(--elevation-xl)"></span></div>
</div><div class="ds-token-row ds-token-row--elevation">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">elevation/2xl</span>
    <code class="ds-token-row__var">var(--elevation-2xl)</code>
  </div>
  <div class="ds-token-row__usage">Maximum elevation for overlays</div>
  <div class="ds-token-row__preview"><span class="ds-token-elevation-preview" style="box-shadow: var(--elevation-2xl)"></span></div>
</div><div class="ds-token-group-label">Component shadows</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">shadow/button/resting</span>
    <code class="ds-token-row__var">var(--shadow-button-resting)</code>
  </div>
  <div class="ds-token-row__usage">0 1px 0 rgba(31, 35, 40, 0.04)</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">shadow/button/elevated</span>
    <code class="ds-token-row__var">var(--shadow-button-elevated)</code>
  </div>
  <div class="ds-token-row__usage">0 1px 1px rgba(0, 0, 0, 0.04), 0 1px 1.5px rgba(0, 0, 0, 0.06)</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">shadow/inset</span>
    <code class="ds-token-row__var">var(--shadow-inset)</code>
  </div>
  <div class="ds-token-row__usage">inset 0 1px 0 rgba(31, 35, 40, 0.04)</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">shadow/switch/handle</span>
    <code class="ds-token-row__var">var(--shadow-switch-handle)</code>
  </div>
  <div class="ds-token-row__usage">0 2px 4px rgba(140, 149, 159, 0.15)</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">overlay/on/interactive</span>
    <code class="ds-token-row__var">var(--overlay-on-interactive)</code>
  </div>
  <div class="ds-token-row__usage">rgba(255, 255, 255, 0.2)</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div><div class="ds-token-row ds-token-row--simple">
  <div class="ds-token-row__token">
    <span class="ds-token-row__name">overlay/on/neutral</span>
    <code class="ds-token-row__var">var(--overlay-on-neutral)</code>
  </div>
  <div class="ds-token-row__usage">rgba(0, 0, 0, 0.1)</div>
  <div class="ds-token-row__preview"><span class="ds-token-row__meta">Design token</span></div>
</div>
    </div>
  </div>
</article>
</div>
  </div>
</section>`}],Zl=[{id:"buttons",label:"Buttons",icon:"buttons"},{id:"inputs",label:"Inputs",icon:"inputs"},{id:"controls",label:"Controls",icon:"controls"},{id:"tags",label:"Tags",icon:"tags"},{id:"navigation",label:"Navigation",icon:"navigation"},{id:"disclosure",label:"Disclosure",icon:"disclosure"},{id:"data",label:"Data",icon:"data"},{id:"typography",label:"Typography",icon:"typography"},{id:"tokens",label:"Tokens",icon:"tokens"},{id:"tracker",label:"Tracker",icon:"tracker"}],_1=Zl.map(p=>p.id),f1=[{title:"Token-driven",body:"Colors, type, and spacing from tokens.css. Never hard-code hex values."},{title:"Figma parity",body:"Every tds- class traces to a component in Trulioo ADS 2026."},{title:"Copy & ship",body:"Grab the markup from each demo and drop it into your feature branch."}],Bp={buttons:'<rect fill="none" stroke="currentColor" stroke-width="2" x="2" y="7" width="20" height="10" rx="2"/>',inputs:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M7 22h1a4 4 0 0 0 4-4v-1"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M7 2h1a4 4 0 0 1 4 4v1"/>',controls:'<rect fill="none" stroke="currentColor" stroke-width="2" x="2" y="6" width="20" height="12" rx="6"/><circle cx="8" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="2"/>',tags:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" stroke="none"/>',navigation:'<rect fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" x="3" y="3" width="18" height="18" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 3v18"/>',disclosure:'<rect fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" x="3" y="3" width="18" height="18" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M3 9h18"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m9 15 3 3 3-3"/>',data:'<rect fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" x="3" y="3" width="18" height="18" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M3 9h18M3 15h18M12 3v18"/>',typography:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 7V4h16v3"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 20h6"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 4v16"/>',tokens:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5S13 7 12 2c-1 5-2 6.4-4 8.5S5 17 5 15a7 7 0 0 0 7 7z"/>',tracker:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 19V5"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M10 19V9"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16 19v-6"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M22 19V11"/>'};function h1({name:p}){return r.jsx("svg",{className:"tds-preview__nav-glyph",width:"16",height:"16",viewBox:"0 0 24 24","aria-hidden":"true",dangerouslySetInnerHTML:{__html:Bp[p]??""}})}function g1(){return r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"tds-preview__icon-sprite","aria-hidden":"true",focusable:"false",children:Object.entries(Bp).map(([p,M])=>r.jsx("symbol",{id:`pr-i-${p}`,viewBox:"0 0 24 24",dangerouslySetInnerHTML:{__html:M}},p))})}function b1({activeTab:p,isHome:M,isOpen:L,onSelect:_,onHome:D,onToggle:N}){return r.jsxs("aside",{className:"tds-preview__sidebar","aria-label":"Component navigation","data-expanded":L,children:[r.jsxs("div",{className:"tds-preview__sidebar-inner",children:[r.jsxs("button",{type:"button",className:"tds-preview__brand",onClick:D,"aria-current":M?"page":void 0,children:[r.jsx("span",{className:"tds-preview__brand-mark",children:"TDS"}),r.jsxs("span",{className:"tds-preview__brand-text",children:[r.jsx("span",{className:"tds-preview__brand-name",children:"Trulioo DS"}),r.jsx("span",{className:"tds-preview__brand-tag",children:"Component reference"})]})]}),r.jsx("p",{className:"tds-preview__nav-label",children:"Components"}),r.jsx("nav",{className:"tds-preview__nav",role:"tablist","aria-label":"Components",children:Zl.map(O=>{const W=!M&&O.id===p;return r.jsxs("button",{type:"button",className:`tds-preview__nav-link${W?" is-active":""}`,role:"tab",id:`tab-${O.id}`,"aria-selected":W,tabIndex:W?0:-1,"aria-label":O.label,title:O.label,onClick:()=>_(O.id),children:[r.jsx("span",{className:"tds-preview__nav-icon","aria-hidden":"true",children:r.jsx(h1,{name:O.icon})}),r.jsx("span",{className:"tds-preview__nav-label-text",children:O.label})]},O.id)})}),r.jsxs("div",{className:"tds-preview__sidebar-footer",children:[r.jsxs("p",{children:["Synced from"," ",r.jsx("a",{href:"https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026",target:"_blank",rel:"noopener noreferrer",children:"Figma ADS 2026"})]}),r.jsxs("p",{className:"tds-preview__sidebar-note",children:["Classes use the ",r.jsx("code",{children:"tds-"})," prefix."]})]})]}),r.jsx("button",{type:"button",className:"tds-preview__sidebar-toggle",onClick:N,"aria-label":"Collapse sidebar","aria-expanded":L,children:r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14","aria-hidden":"true",children:r.jsx("path",{d:"M9 3L4 7l5 4",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]})}function m1({activeLabel:p,activeTab:M,isHome:L,sidebarOpen:_,onSelect:D,onHome:N,onToggleSidebar:O}){return r.jsxs("header",{className:"tds-preview__topbar",children:[r.jsxs("div",{className:"tds-preview__topbar-row",children:[r.jsx("button",{type:"button",className:"tds-preview__topbar-menu",onClick:O,"aria-label":_?"Close sidebar":"Open sidebar","aria-expanded":_,children:r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:r.jsx("path",{d:"M2.5 4h11M2.5 8h11M2.5 12h11",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}),r.jsxs("button",{type:"button",className:"tds-preview__topbar-brand",onClick:N,children:[r.jsx("span",{className:"tds-preview__topbar-mark",children:"TDS"}),r.jsx("span",{className:"tds-preview__topbar-title",children:L?"Overview":p})]})]}),r.jsx("nav",{className:"tds-preview__mobile-tabs",role:"tablist","aria-label":"Components",children:Zl.map(W=>{const S=!L&&W.id===M;return r.jsx("button",{type:"button",className:`tds-preview__mobile-tab${S?" is-active":""}`,role:"tab","aria-selected":S,onClick:()=>D(W.id),children:W.label},W.id)})})]})}function w1({features:p,onExplore:M}){return r.jsxs("section",{className:"tds-preview__hero",children:[r.jsxs("div",{className:"tds-preview__hero-orbs","aria-hidden":"true",children:[r.jsx("div",{className:"tds-preview__hero-orb tds-preview__hero-orb--1"}),r.jsx("div",{className:"tds-preview__hero-orb tds-preview__hero-orb--2"}),r.jsx("div",{className:"tds-preview__hero-orb tds-preview__hero-orb--3"})]}),r.jsxs("div",{className:"tds-preview__hero-inner",children:[r.jsxs("div",{className:"tds-preview__hero-badge",children:[r.jsx("span",{className:"tds-preview__hero-badge-dot","aria-hidden":"true"}),"For product & engineering teams"]}),r.jsxs("h1",{className:"tds-preview__hero-title",children:["Build with",r.jsx("br",{}),r.jsx("span",{className:"tds-preview__hero-title-accent",children:"clarity."})]}),r.jsx("p",{className:"tds-preview__hero-lead",children:"A living reference for the Trulioo component library: what each piece does, when to use it, and the exact class names to apply. Pure CSS, mapped 1:1 from Figma."}),r.jsxs("div",{className:"tds-preview__hero-actions",children:[r.jsxs("button",{type:"button",className:"tds-preview__hero-cta",onClick:M,children:["Explore components",r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:r.jsx("path",{d:"M3 8h10M9 4l4 4-4 4",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]}),r.jsx("a",{href:"https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026",target:"_blank",rel:"noopener noreferrer",className:"tds-preview__hero-secondary",children:"Open in Figma"})]}),r.jsxs("div",{className:"tds-preview__hero-highlights",children:[r.jsx("p",{className:"tds-preview__hero-highlights-label",children:"Get the highlights."}),r.jsx("div",{className:"tds-preview__hero-grid",children:p.map((L,_)=>r.jsxs("article",{className:"tds-preview__hero-card",style:{animationDelay:`${240+_*80}ms`},children:[r.jsx("strong",{children:L.title}),r.jsx("span",{children:L.body})]},L.title))})]})]})]})}function zp({title:p,desc:M,eyebrow:L="Component family"}){return r.jsxs("header",{className:"tds-preview__chapter-header",children:[r.jsx("p",{className:"tds-preview__chapter-eyebrow",children:L}),r.jsx("h1",{className:"tds-preview__chapter-title",children:p}),r.jsx("p",{className:"tds-preview__chapter-desc",children:M})]})}function k1({section:p,active:M}){const L=p.html.replace(/\.\.\/\.\.\/assets\//g,"/assets/");return r.jsxs("div",{className:`tds-preview__panel${M?" is-active":""}`,role:"tabpanel",id:p.id,"aria-labelledby":`tab-${p.id}`,hidden:!M,children:[r.jsx(zp,{title:p.title,desc:p.desc}),r.jsx("div",{className:"tds-preview__demos",dangerouslySetInnerHTML:{__html:L}})]})}const y1="2026-08-10T16:23:24.652Z",x1={totalComponents:52,cssDone:48,cssPartial:0,cssNotStarted:3,figmaDone:52,figmaEligible:52,figmaDonePercent:100,demoPageCount:8,avgAdoptionPercent:33,builtForAdoption:47},C1=[{id:"bank-verification",label:"Bank Verification",path:"pages/bank-verification",used:14,total:47,percent:30},{id:"preview",label:"Component preview",path:"pages/preview",used:44,total:47,percent:94},{id:"document-verification",label:"Document Verification",path:"pages/document-verification",used:15,total:47,percent:32},{id:"electronic-id",label:"Electronic Id",path:"pages/electronic-id",used:12,total:47,percent:26},{id:"experiments-ubo-graph",label:"Experiments · Ubo Graph",path:"pages/Experiments/ubo-graph",used:1,total:47,percent:2},{id:"kyb-results",label:"KYB Results",path:"pages/KYB Results",used:23,total:47,percent:49},{id:"kyc-form",label:"Kyc Form",path:"pages/kyc-form",used:13,total:47,percent:28},{id:"unified-intelligence-home",label:"Unified Intelligence Home",path:"pages/unified-intelligence-home",used:3,total:47,percent:6}],S1=JSON.parse('[{"id":"button","name":"Button","category":"Core Controls","figmaStatus":"Done","figmaVariants":72,"cssFile":"button/button.css","classPrefixes":["tds-btn"],"figmaNodeId":"96:2225","notes":"4 variants x 3 sizes x 5 states + alignment; loading boolean with spinner","cssStatus":"Done","usedInPages":{"bank-verification":true,"preview":true,"document-verification":true,"electronic-id":true,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":true,"unified-intelligence-home":false}},{"id":"icon-button","name":"IconButton","category":"Core Controls","figmaStatus":"Done","figmaVariants":168,"cssFile":"icon-button/icon-button.css","classPrefixes":["tds-icon-btn"],"figmaNodeId":"1371:22653","notes":"4 variants x 3 sizes x 7 states x 2 shapes; loading swaps icon for .tds-spinner--xs","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"button-group","name":"ButtonGroup","category":"Core Controls","figmaStatus":"Done","figmaVariants":15,"cssFile":"button-group/button-group.css","classPrefixes":["tds-button-group"],"subComponents":"Button, IconButton","figmaNodeId":"1952:33320","notes":"Segmented control; iconButtons, buttons, or mixed; count 2–5","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"segmented-control","name":"SegmentedControl","category":"Core Controls","figmaStatus":"Done","figmaVariants":18,"cssFile":"segmented-control/segmented-control.css","classPrefixes":["tds-segmented-control"],"figmaNodeId":"3367:27333","notes":"Text or icon-only segments; medium and small; 2–6 items on neutral track","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"spinner","name":"Spinner","category":"Core Controls","figmaStatus":"Done","figmaVariants":8,"cssFile":"spinner/spinner.css","classPrefixes":["tds-spinner","tds-spinner-block"],"figmaNodeId":"2092:18230","notes":"5 sizes (xs–xl); optional label block; used by Button and IconButton loading","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"button-menu","name":"ButtonMenu","category":"Core Controls","figmaStatus":"Done","figmaVariants":12,"cssFile":"button-menu/button-menu.css","classPrefixes":["tds-button-menu"],"subComponents":"DropdownPanel","figmaNodeId":"832:13390","notes":"Uses dropdown-panel for menu","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":false,"unified-intelligence-home":false}},{"id":"switch","name":"Switch","category":"Core Controls","figmaStatus":"Done","figmaVariants":8,"cssFile":"switch/switch.css","classPrefixes":["tds-switch"],"figmaNodeId":"96:3234","cssStatus":"Done","usedInPages":{"bank-verification":true,"preview":true,"document-verification":true,"electronic-id":true,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"checkbox","name":"Checkbox","category":"Core Controls","figmaStatus":"Done","figmaVariants":6,"cssFile":"checkbox/checkbox.css","classPrefixes":["tds-checkbox"],"figmaNodeId":"299:12998","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":true,"unified-intelligence-home":false}},{"id":"dismiss-action","name":"DismissAction","category":"Core Controls","figmaStatus":"Done","figmaVariants":12,"cssFile":"dismiss-action/dismiss-action.css","classPrefixes":["tds-dismiss"],"figmaNodeId":"331:8149","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"text-input","name":"TextInput","category":"Form Inputs","figmaStatus":"Done","figmaVariants":97,"cssFile":"text-input/text-input.css","classPrefixes":["tds-text-input"],"subComponents":"FieldLabel, FieldCaption, FieldValidation","figmaNodeId":"96:3268","notes":"Imports shared atoms via @import","cssStatus":"Done","usedInPages":{"bank-verification":true,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":true,"unified-intelligence-home":false}},{"id":"textarea","name":"Textarea","category":"Form Inputs","figmaStatus":"Done","figmaVariants":10,"cssFile":"textarea/textarea.css","classPrefixes":["tds-textarea"],"subComponents":"FieldLabel, FieldCaption, FieldValidation","figmaNodeId":"3358:26529","notes":"Multi-line field with resize grip, validation, and caption","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"select","name":"Select","category":"Form Inputs","figmaStatus":"Done","figmaVariants":30,"cssFile":"select/select.css","classPrefixes":["tds-select","tds-combobox"],"subComponents":"FieldLabel, FieldCaption, FieldValidation, Caret, DropdownPanel, Tag","figmaNodeId":"96:1624","notes":"Includes combobox variant","cssStatus":"Done","usedInPages":{"bank-verification":true,"preview":true,"document-verification":true,"electronic-id":true,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":true,"unified-intelligence-home":false}},{"id":"date-picker","name":"DatePicker","category":"Form Inputs","figmaStatus":"Done","cssFile":"date-picker/date-picker.css","classPrefixes":["tds-date-picker","tds-date-picker-range"],"subComponents":"FieldLabel, FieldCaption, FieldValidation","figmaNodeId":"1632:29292","notes":"Single and range calendar variants","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":true,"unified-intelligence-home":false}},{"id":"radio","name":"Radio","category":"Form Inputs","figmaStatus":"Done","figmaVariants":6,"cssFile":"_shared/radio/radio.css","classPrefixes":["tds-radio"],"figmaNodeId":"100:4253","notes":"Shared atom","cssStatus":"Done","usedInPages":{"bank-verification":true,"preview":true,"document-verification":true,"electronic-id":true,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"radio-group","name":"RadioGroup","category":"Form Inputs","figmaStatus":"Done","figmaVariants":6,"cssFile":"radio-group/radio-group.css","classPrefixes":["tds-radio-group"],"subComponents":"Radio","figmaNodeId":"100:4222","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"radio-card","name":"RadioCard","category":"Form Inputs","figmaStatus":"Done","figmaVariants":2,"cssFile":"radio-card/radio-card.css","classPrefixes":["tds-radio-card"],"subComponents":"Radio, Checkbox","figmaNodeId":"359:3332","notes":"single-selection (radio) or multi-selection (checkbox)","cssStatus":"Done","usedInPages":{"bank-verification":true,"preview":true,"document-verification":true,"electronic-id":true,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"field-label","name":"FieldLabel","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":2,"cssFile":"_shared/field-label/field-label.css","classPrefixes":["tds-field-label"],"figmaNodeId":"107:2085","notes":"Used by TextInput, Select","cssStatus":"Done","usedInPages":{"bank-verification":true,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":true,"unified-intelligence-home":false}},{"id":"field-caption","name":"FieldCaption","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":0,"cssFile":"_shared/field-caption/field-caption.css","classPrefixes":["tds-field-caption"],"notes":"Used by TextInput, Select","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"field-validation","name":"FieldValidation","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":2,"cssFile":"_shared/field-validation/field-validation.css","classPrefixes":["tds-field-validation"],"figmaNodeId":"107:2078","notes":"Used by TextInput, Select","cssStatus":"Done","usedInPages":{"bank-verification":true,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"caret","name":"Caret","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":3,"cssFile":"_shared/caret/caret.css","classPrefixes":["tds-caret"],"figmaNodeId":"640:9140","notes":"Used by Select, Tooltip","cssStatus":"Done","usedInPages":{"bank-verification":true,"preview":true,"document-verification":true,"electronic-id":true,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":true,"unified-intelligence-home":false}},{"id":"dropdown-panel","name":"DropdownPanel","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":12,"cssFile":"_shared/dropdown-panel/dropdown-panel.css","classPrefixes":["tds-dropdown-panel"],"subComponents":"ActionListItem","figmaNodeId":"320:21652","notes":"MenuType text|multiSelect|icon|flag; GroupHeading caption header + optional Clear all link; 30px items at 4px inset. Positioning via dropdown-panel.js. Used by Select, ButtonMenu, FilterButton, SortButton","cssStatus":"Done","usedInPages":{"bank-verification":true,"preview":true,"document-verification":true,"electronic-id":true,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":true,"unified-intelligence-home":false}},{"id":"tag","name":"Tag","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":112,"cssFile":"_shared/tag/tag.css","classPrefixes":["tds-tag"],"figmaNodeId":"331:8199","notes":"Used by Select, Accordion","cssStatus":"Done","usedInPages":{"bank-verification":true,"preview":true,"document-verification":true,"electronic-id":true,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":false,"unified-intelligence-home":false}},{"id":"ai-tag","name":"AITag","category":"Data Display","figmaStatus":"Done","figmaVariants":4,"cssFile":"ai-tag/ai-tag.css","classPrefixes":["tds-ai-tag"],"figmaNodeId":"1821:33907","notes":"TruAI badge; sparkles icon always required","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":false,"unified-intelligence-home":false}},{"id":"side-nav","name":"SideNav","category":"Navigation","figmaStatus":"Done","figmaVariants":3,"cssFile":"side-nav/side-nav.css","classPrefixes":["tds-side-nav","tds-side-nav-preview"],"subComponents":"NavItem, NavList, SubItem, UserProfile","figmaNodeId":"1188:10384","notes":"3 modes: expanded, collapsed, mobile","cssStatus":"Done","usedInPages":{"bank-verification":true,"preview":true,"document-verification":true,"electronic-id":true,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":true,"unified-intelligence-home":true}},{"id":"nav-item","name":"NavItem","category":"Navigation","figmaStatus":"Done","figmaVariants":15,"cssFile":"side-nav/nav-item/nav-item.css","classPrefixes":["tds-side-nav__nav-item"],"notes":"Nested under side-nav/","cssStatus":"Done","usedInPages":{"bank-verification":true,"preview":true,"document-verification":true,"electronic-id":true,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":true,"unified-intelligence-home":true}},{"id":"nav-list","name":"NavList","category":"Navigation","figmaStatus":"Done","figmaVariants":0,"cssFile":"side-nav/nav-list/nav-list.css","classPrefixes":["tds-nav-list"],"notes":"Nested under side-nav/","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"tabs","name":"Tabs","category":"Navigation","figmaStatus":"Done","figmaVariants":10,"cssFile":"tabs/tabs.css","classPrefixes":["tds-tabs"],"subComponents":"TabItem","figmaNodeId":"405:8964","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":false,"unified-intelligence-home":false}},{"id":"tab-item","name":"TabItem","category":"Navigation","figmaStatus":"Done","figmaVariants":4,"cssFile":"tabs/tab-item/tab-item.css","classPrefixes":["tds-tab-item"],"figmaNodeId":"403:5492","notes":"Nested under tabs/","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":false,"unified-intelligence-home":false}},{"id":"filter-tab","name":"FilterTabs","category":"Navigation","figmaStatus":"Done","figmaVariants":3,"cssFile":"filter-tab/filter-tab.css","classPrefixes":["tds-filter-tab","tds-filter-tabs"],"subComponents":"FilterTabsItem","figmaNodeId":"844:6968","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":false,"unified-intelligence-home":false}},{"id":"breadcrumb","name":"Breadcrumb","category":"Navigation","figmaStatus":"Done","cssFile":"breadcrumb/breadcrumb.css","classPrefixes":["tds-breadcrumbs","tds-breadcrumb-item"],"figmaNodeId":"1596:23587","notes":"BreadCrumbs container, item, and divider","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"filter-tab-2","name":"FilterTabsItem","category":"Navigation","figmaStatus":"Done","figmaVariants":12,"cssFile":"filter-tab/filter-tab.css","notes":"Shares CSS file with FilterTabs; adoption tracked on FilterTabs","classPrefixes":[],"cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":false,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"data-table","name":"DataTable","category":"Data Display","figmaStatus":"Done","figmaVariants":12,"cssFile":"data-table/data-table.css","classPrefixes":["tds-data-table","tds-data-table-container"],"subComponents":"ColumnHeaderCell, Row, Header, SortButton, Signals, SectionHeader","figmaNodeId":"884:13685","notes":"Complex composite with many sub-components","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":false,"unified-intelligence-home":false}},{"id":"data-field","name":"DataField","category":"Data Display","figmaStatus":"Done","figmaVariants":24,"cssFile":"data-field/data-field.css","classPrefixes":["tds-data-field"],"figmaNodeId":"856:13029","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":false,"unified-intelligence-home":false}},{"id":"counter-label","name":"CounterLabel","category":"Data Display","figmaStatus":"Done","figmaVariants":24,"cssFile":"counter-label/counter-label.css","classPrefixes":["tds-counter"],"figmaNodeId":"409:9115","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":false,"unified-intelligence-home":false}},{"id":"section-header","name":"SectionHeader","category":"Data Display","figmaStatus":"Done","figmaVariants":32,"cssFile":"section-header/section-header.css","classPrefixes":["tds-section-header"],"figmaNodeId":"1816:29234","notes":"Groups table sections; composes Tag, Counter, Button","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":false,"unified-intelligence-home":false}},{"id":"dismiss-issue-badge","name":"DismissIssueBadge","category":"Data Display","figmaStatus":"Done","figmaVariants":12,"cssFile":"dismiss-issue-badge/dismiss-issue-badge.css","classPrefixes":["tds-dismiss-badge"],"figmaNodeId":"331:8174","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"flag-icon","name":"CountryFlag","category":"Data Display","figmaStatus":"Done","figmaVariants":255,"cssFile":"flag-icon/flag-icon.css","classPrefixes":["fi","tds-select__country-flag"],"figmaNodeId":"299:8750","notes":"255 country codes","cssStatus":"Done","usedInPages":{"bank-verification":true,"preview":true,"document-verification":true,"electronic-id":true,"experiments-ubo-graph":true,"kyb-results":true,"kyc-form":true,"unified-intelligence-home":true}},{"id":"action-list-item","name":"ActionListItem","category":"Data Display","figmaStatus":"Done","figmaVariants":0,"cssFile":"action-list-item/action-list-item.css","classPrefixes":["tds-action-list-item"],"notes":"Used inside DropdownPanel","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":true,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":true,"unified-intelligence-home":false}},{"id":"stat-card","name":"StatCard","category":"Data Display","figmaStatus":"Done","figmaVariants":2,"cssFile":"stat-card/stat-card.css","classPrefixes":["tds-stat-card"],"figmaNodeId":"915:9281","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":false,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":false,"unified-intelligence-home":false}},{"id":"tooltip","name":"Tooltip","category":"Feedback","figmaStatus":"Done","figmaVariants":16,"cssFile":"tooltip/tooltip.css","classPrefixes":["tds-tooltip"],"subComponents":"Caret","figmaNodeId":"1054:18565","notes":"Body + Caret sub-components","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":false,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"announcement","name":"Announcement","category":"Feedback","figmaStatus":"Done","figmaVariants":10,"cssFile":"announcement/announcement.css","classPrefixes":["tds-announcement"],"figmaNodeId":"866:13118","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":true,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":false,"unified-intelligence-home":false}},{"id":"accordion","name":"Accordion","category":"Containers","figmaStatus":"Done","figmaVariants":102,"cssFile":"accordion/accordion.css","classPrefixes":["tds-accordion"],"subComponents":"Tag, CounterLabel, DataFieldList","figmaNodeId":"810:5659","notes":"Complex component with many states","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":false,"unified-intelligence-home":false}},{"id":"dialog","name":"Dialog","category":"Feedback","figmaStatus":"Done","figmaVariants":35,"cssFile":"dialog/dialog.css","classPrefixes":["tds-dialog"],"subComponents":"Button, IconButton","figmaNodeId":"1654:27850","notes":"Center sizes sm–xl, left/right drawers, bottom sheet, full screen; header badge + trailing slots; footer label/caption + up to 3 buttons","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"progress-indicator","name":"ProgressIndicator","category":"Progress","figmaStatus":"Done","figmaVariants":18,"cssFile":"progress-indicator/progress-indicator.css","classPrefixes":["tds-progress-indicator"],"subComponents":"_ProgressIndicatorItem","figmaNodeId":"1242:22104","notes":"Horizontal step progress","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":true,"electronic-id":true,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":true,"unified-intelligence-home":false}},{"id":"step-progress","name":"StepProgress","category":"Progress","figmaStatus":"Done","figmaVariants":7,"classPrefixes":[],"subComponents":"_StepProgressItem","figmaNodeId":"1264:24192","notes":"Figma only, CSS pending","cssStatus":"Not Started","usedInPages":{"bank-verification":false,"preview":false,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"listed-progress-item","name":"ListedProgressItem","category":"Progress","figmaStatus":"Done","figmaVariants":6,"classPrefixes":[],"subComponents":"Button, Link, IconButton, Tag","figmaNodeId":"1267:24260","notes":"Figma only, CSS pending","cssStatus":"Not Started","usedInPages":{"bank-verification":false,"preview":false,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"score-gauge","name":"ScoreGauge","category":"Scoring","figmaStatus":"Done","figmaVariants":0,"cssFile":"score-gauge/score-gauge.css","classPrefixes":["score-gauge"],"notes":"SVG-based, has JS + React variants","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":false,"document-verification":true,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"score-card","name":"ScoreCard","category":"Scoring","figmaStatus":"Done","figmaVariants":3,"classPrefixes":[],"subComponents":"ScoreGauge","figmaNodeId":"916:9298","notes":"CSS pending","cssStatus":"Not Started","usedInPages":{"bank-verification":false,"preview":false,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"risk-category-card","name":"RiskCategoryCard","category":"Scoring","figmaStatus":"Done","figmaVariants":3,"cssFile":"risk-category-card/risk-category-card.css","classPrefixes":["tds-risk-category-card"],"figmaNodeId":"920:9307","notes":"Category title, risk tag, signal count, and score out of 100","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"font-awesome-icon","name":"FontAwesome Icon","category":"Utility","figmaStatus":"Done","figmaVariants":42,"classPrefixes":[],"figmaNodeId":"544:9787","notes":"Icon system, no standalone CSS","cssStatus":"N/A","usedInPages":{"bank-verification":false,"preview":false,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":false,"kyc-form":false,"unified-intelligence-home":false}},{"id":"filter-button","name":"FilterButton","category":"Utility","figmaStatus":"Done","figmaVariants":6,"cssFile":"filter-button/filter-button.css","classPrefixes":["tds-filter-button"],"subComponents":"DropdownPanel, CounterLabel","figmaNodeId":"836:13511","notes":"Selected trigger shows value + xmark clear; counter only with 2+ active filters (+N); clear resets all selections via tds-filter-clear","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":false,"unified-intelligence-home":false}},{"id":"sort-button","name":"SortButton","category":"Utility","figmaStatus":"Done","figmaVariants":4,"cssFile":"data-table/sort-button/sort-button.css","classPrefixes":["tds-sort-button"],"subComponents":"DropdownPanel","figmaNodeId":"2191:46183","notes":"Selected trigger shows sort value + xmark clear; open selected reverts label to Sort; clear resets via tds-sort-clear","cssStatus":"Done","usedInPages":{"bank-verification":false,"preview":true,"document-verification":false,"electronic-id":false,"experiments-ubo-graph":false,"kyb-results":true,"kyc-form":false,"unified-intelligence-home":false}}]'),M1=[{name:"Toast / Snackbar",category:"Feedback",priority:"High",description:"Temporary notification bar with auto-dismiss",dependsOn:"DismissAction",notes:"For success/error feedback"},{name:"Alert / InlineNotification",category:"Feedback",priority:"High",description:"Persistent inline message with icon and dismiss",dependsOn:"DismissAction",notes:"Replaces Announcement for inline use"},{name:"Badge",category:"Data Display",priority:"High",description:"Small count or status indicator on icons/avatars",notes:"Needed for nav items, notifications"},{name:"Avatar",category:"Data Display",priority:"High",description:"User/entity photo or initials circle",notes:"Used in SideNav UserProfile, comments"},{name:"Pagination",category:"Navigation",priority:"High",description:"Page navigation with prev/next and page numbers",dependsOn:"Button, IconButton",notes:"Used with DataTable"},{name:"Skeleton / Loading",category:"Feedback",priority:"Medium",description:"Shimmer placeholder for loading states",notes:"For progressive content loading"},{name:"Popover",category:"Feedback",priority:"Medium",description:"Anchored floating content panel (non-modal)",dependsOn:"Caret, DropdownPanel",notes:"For rich hover/click content"},{name:"Card",category:"Containers",priority:"Medium",description:"Bordered content container with header and actions",notes:"General-purpose content wrapper"},{name:"Divider",category:"Utility",priority:"Medium",description:"Horizontal or vertical separator line",notes:"For section separation"},{name:"SearchInput",category:"Form Inputs",priority:"Medium",description:"Text input with search icon and clear action",dependsOn:"TextInput, DismissAction",notes:"For filtering lists/tables"},{name:"Slider / RangeInput",category:"Form Inputs",priority:"Low",description:"Continuous or stepped range selector",notes:"For score thresholds"},{name:"FileUpload",category:"Form Inputs",priority:"Low",description:"Drag-and-drop or click-to-browse file input",dependsOn:"Button",notes:"For document upload flows"},{name:"ProgressBar",category:"Progress",priority:"Low",description:"Linear determinate/indeterminate progress",notes:"For upload/processing progress"},{name:"EmptyState",category:"Feedback",priority:"Low",description:"Illustration + message for zero-data scenarios",dependsOn:"Button",notes:"For empty tables, search results"},{name:"TopNav / AppBar",category:"Navigation",priority:"Low",description:"Horizontal top navigation bar",dependsOn:"Button, Avatar, Badge",notes:"If app needs a top bar"},{name:"Timeline",category:"Data Display",priority:"Low",description:"Vertical timeline with events and connectors",notes:"For entity history/audit trail"},{name:"TreeView",category:"Navigation",priority:"Low",description:"Hierarchical collapsible list",notes:"For nested entity structures"}],D1=["Unlisted component folder in Components/: risk-category-strip"],L1={lastBuiltAt:y1,summary:x1,pages:C1,components:S1,planned:M1,warnings:D1},T1=L1;function Ul({value:p,max:M=100,label:L,tone:_="brand",size:D="sm"}){const N=M>0?Math.min(100,Math.round(p/M*100)):0;return r.jsx("div",{className:`tds-preview__tracker-progress tds-preview__tracker-progress--${_} tds-preview__tracker-progress--${D}`,role:"progressbar","aria-valuenow":N,"aria-valuemin":0,"aria-valuemax":100,"aria-label":L,children:r.jsx("div",{className:"tds-preview__tracker-progress-fill",style:{width:`${N}%`}})})}function E1({segments:p,total:M,label:L}){const _=M>0?M:1;return r.jsxs("div",{className:"tds-preview__tracker-segmented",role:"img","aria-label":L,children:[r.jsx("div",{className:"tds-preview__tracker-segmented-track",children:p.map(D=>{const N=D.value/_*100;return N<=0?null:r.jsx("div",{className:`tds-preview__tracker-segment tds-preview__tracker-segment--${D.tone}`,style:{width:`${N}%`},title:`${D.label}: ${D.value}`},D.label)})}),r.jsx("ul",{className:"tds-preview__tracker-segmented-legend",children:p.map(D=>r.jsxs("li",{className:`tds-preview__tracker-stat-chip tds-preview__tracker-stat-chip--${D.tone}`,children:[r.jsx("span",{className:"tds-preview__tracker-stat-chip-value",children:D.value}),r.jsx("span",{className:"tds-preview__tracker-stat-chip-label",children:D.label})]},D.label))})]})}function A1(p){return p>=1?"positive":p>=.5?"intermediate":p>0?"brand":"neutral"}function Lp({title:p,description:M,rows:L,valueSuffix:_="",showPercent:D=!0,compact:N=!1}){return r.jsxs("article",{className:`tds-preview__tracker-chart${N?" tds-preview__tracker-chart--compact":""}`,children:[r.jsxs("header",{className:"tds-preview__tracker-chart-header",children:[r.jsx("h4",{className:"tds-preview__tracker-chart-title",children:p}),M&&r.jsx("p",{className:"tds-preview__tracker-chart-lead",children:M})]}),r.jsx("ul",{className:"tds-preview__tracker-bar-chart",children:L.map(O=>{const W=O.max>0?Math.min(100,Math.round(O.value/O.max*100)):0,S=O.tone??A1(O.value/O.max);return r.jsxs("li",{className:"tds-preview__tracker-bar-row",children:[r.jsxs("div",{className:"tds-preview__tracker-bar-head",children:[r.jsx("span",{className:"tds-preview__tracker-bar-label",children:O.label}),r.jsxs("span",{className:"tds-preview__tracker-bar-value",children:[D&&r.jsxs("strong",{className:"tds-preview__tracker-bar-percent",children:[W,"%"]}),(O.meta||!D)&&r.jsxs("span",{className:"tds-preview__tracker-bar-detail",children:[!D&&r.jsxs(r.Fragment,{children:[O.value,_]}),O.meta&&r.jsxs("span",{className:"tds-preview__tracker-bar-meta",children:[!D&&_?" · ":"",O.meta]})]})]})]}),r.jsx("div",{className:"tds-preview__tracker-bar-track","aria-hidden":"true",children:r.jsx("div",{className:`tds-preview__tracker-bar-fill tds-preview__tracker-bar-fill--${S}`,style:{width:`${W}%`}})})]},O.label)})})]})}function B1({summary:p}){return r.jsxs("div",{className:"tds-preview__tracker-metrics",children:[r.jsxs("article",{className:"tds-preview__tracker-metric",children:[r.jsx("span",{className:"tds-preview__tracker-metric-label",children:"CSS built"}),r.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[p.cssDone,r.jsxs("span",{className:"tds-preview__tracker-metric-total",children:[" / ",p.totalComponents]})]}),r.jsx(Ul,{value:p.cssDone,max:p.totalComponents,label:`CSS built: ${p.cssDone} of ${p.totalComponents}`,tone:"positive"}),r.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:[p.cssPartial," partial · ",p.cssNotStarted," not started"]})]}),r.jsxs("article",{className:"tds-preview__tracker-metric",children:[r.jsx("span",{className:"tds-preview__tracker-metric-label",children:"Figma complete"}),r.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[p.figmaDonePercent,"%"]}),r.jsx(Ul,{value:p.figmaDonePercent,label:`Figma complete: ${p.figmaDonePercent}%`,tone:"positive"}),r.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:[p.figmaDone," of ",p.figmaEligible," components"]})]}),r.jsxs("article",{className:"tds-preview__tracker-metric",children:[r.jsx("span",{className:"tds-preview__tracker-metric-label",children:"Demo pages"}),r.jsx("strong",{className:"tds-preview__tracker-metric-value",children:p.demoPageCount}),r.jsx(Ul,{value:p.demoPageCount,max:Math.max(p.demoPageCount,1),label:`Demo pages tracked: ${p.demoPageCount}`,tone:"intermediate"}),r.jsx("span",{className:"tds-preview__tracker-metric-meta",children:"Auto-discovered under pages/"})]}),r.jsxs("article",{className:"tds-preview__tracker-metric",children:[r.jsx("span",{className:"tds-preview__tracker-metric-label",children:"Avg DS adoption"}),r.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[p.avgAdoptionPercent,"%"]}),r.jsx(Ul,{value:p.avgAdoptionPercent,label:`Average DS adoption: ${p.avgAdoptionPercent}%`,tone:"brand"}),r.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:["Across ",p.builtForAdoption," built components"]})]})]})}const Tp=["positive","intermediate","brand","neutral"];function z1(p,M){return p.filter(L=>L.cssStatus===M).length}function N1(p){const M=["High","Medium","Low"],L=new Map;for(const D of p)L.set(D.priority,(L.get(D.priority)??0)+1);const _={High:"negative",Medium:"intermediate",Low:"neutral"};return M.filter(D=>L.has(D)).map(D=>({label:D,value:L.get(D)??0,max:p.length,meta:`${L.get(D)??0} items`,tone:_[D]}))}function H1({summary:p,components:M,pages:L,planned:_}){const D=Vs.useMemo(()=>z1(M,"N/A"),[M]),N=Vs.useMemo(()=>[{label:"Done",value:p.cssDone,tone:"positive"},{label:"Partial",value:p.cssPartial,tone:"intermediate"},{label:"Not started",value:p.cssNotStarted,tone:"negative"},{label:"N/A",value:D,tone:"neutral"}],[p.cssDone,p.cssPartial,p.cssNotStarted,D]),O=Vs.useMemo(()=>L.map((S,x)=>({label:S.label,value:S.percent,max:100,meta:`${S.used}/${S.total} used`,tone:Tp[x%Tp.length]})),[L]),W=Vs.useMemo(()=>N1(_),[_]);return r.jsx("div",{className:"tds-preview__tracker-charts","aria-label":"Progress charts",children:r.jsxs("div",{className:"tds-preview__tracker-charts-layout",children:[r.jsxs("article",{className:"tds-preview__tracker-chart",children:[r.jsx("h3",{className:"tds-preview__tracker-chart-title",children:"Build status"}),r.jsxs("p",{className:"tds-preview__tracker-chart-lead",children:[p.cssDone," of ",p.totalComponents," components have finished CSS"]}),r.jsx(E1,{segments:N,total:p.totalComponents,label:`CSS build status: ${p.cssDone} done, ${p.cssPartial} partial, ${p.cssNotStarted} not started, ${D} not applicable`})]}),r.jsxs("div",{className:"tds-preview__tracker-charts-pair",children:[r.jsx(Lp,{title:"DS consumption by page",description:"Share of built components used on each demo under pages/",rows:O}),_.length>0&&r.jsx(Lp,{title:"Backlog by priority",description:`${_.length} components queued`,rows:W,showPercent:!0})]})]})})}function fo({title:p,desc:M,actions:L,children:_}){return r.jsxs("section",{className:"tds-preview__tracker-showcase",children:[r.jsxs("header",{className:"tds-preview__tracker-showcase__head",children:[r.jsxs("div",{className:"tds-preview__tracker-showcase__copy",children:[r.jsx("h2",{className:"tds-preview__tracker-showcase__title",children:p}),M&&r.jsx("p",{className:"tds-preview__tracker-showcase__desc",children:M})]}),L&&r.jsx("div",{className:"tds-preview__tracker-showcase__actions",children:L})]}),r.jsx("div",{className:"tds-preview__tracker-showcase__body",children:_})]})}function O1(p){return p==="Component preview"?"Preview":p.startsWith("Experiments · ")?p.replace("Experiments · ","Exp · "):p.length>16?`${p.slice(0,15)}…`:p}function Ep({status:p}){const M=p.toLowerCase().replace(/\s+/g,"-");return r.jsx("span",{className:`tds-preview__tracker-pill tds-preview__tracker-pill--${M}`,children:p})}function j1({used:p}){return r.jsxs("span",{className:`tds-preview__tracker-use${p?" is-yes":""}`,"aria-label":p?"Used":"Not used",children:[r.jsx("span",{className:"tds-preview__tracker-use-dot","aria-hidden":"true"}),p?"Used":"—"]})}function V1({components:p,pages:M}){const[L,_]=Vs.useState(""),[D,N]=Vs.useState("all"),O=Vs.useMemo(()=>{const S=L.trim().toLowerCase();return p.filter(x=>{var I;const V=!S||x.name.toLowerCase().includes(S)||x.category.toLowerCase().includes(S)||((I=x.cssFile)==null?void 0:I.toLowerCase().includes(S)),H=D==="all"||x.cssStatus===D||x.figmaStatus===D;return V&&H})},[p,L,D]),W=r.jsxs("div",{className:"tds-preview__tracker-filters",children:[r.jsx("input",{type:"search",className:"tds-preview__tracker-search",placeholder:"Search components...",value:L,onChange:S=>_(S.target.value),"aria-label":"Search components"}),r.jsxs("select",{className:"tds-preview__tracker-select",value:D,onChange:S=>N(S.target.value),"aria-label":"Filter by status",children:[r.jsx("option",{value:"all",children:"All statuses"}),r.jsx("option",{value:"Done",children:"CSS Done"}),r.jsx("option",{value:"Partial",children:"Partial"}),r.jsx("option",{value:"Not Started",children:"Not started"}),r.jsx("option",{value:"Missing",children:"Missing"}),r.jsx("option",{value:"N/A",children:"N/A"})]})]});return r.jsxs(fo,{title:"Built components",desc:`${p.length} components with Figma, CSS, and DS consumption across ${M.length} demo pages.`,actions:W,children:[r.jsx("div",{className:"tds-preview__tracker-canvas",children:r.jsx("div",{className:"tds-preview__tracker-table-wrap",children:r.jsxs("table",{className:"tds-preview__tracker-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{scope:"col",children:"Component"}),r.jsx("th",{scope:"col",children:"Category"}),r.jsx("th",{scope:"col",children:"Figma"}),r.jsx("th",{scope:"col",children:"CSS"}),M.map(S=>r.jsx("th",{scope:"col",title:`${S.label} (${S.path})`,children:O1(S.label)},S.id))]})}),r.jsx("tbody",{children:O.map(S=>r.jsxs("tr",{children:[r.jsxs("th",{scope:"row",children:[r.jsx("span",{className:"tds-preview__tracker-name",children:S.name}),S.cssFile&&r.jsx("code",{className:"tds-preview__tracker-file",children:S.cssFile})]}),r.jsx("td",{children:S.category}),r.jsx("td",{children:r.jsx(Ep,{status:S.figmaStatus})}),r.jsx("td",{children:r.jsx(Ep,{status:S.cssStatus})}),M.map(x=>r.jsx("td",{children:r.jsx(j1,{used:!!S.usedInPages[x.id]})},x.id))]},S.id))})]})})}),r.jsxs("p",{className:"tds-preview__tracker-table-meta",children:["Showing ",O.length," of ",p.length," components · ",M.length," demo pages under pages/"]})]})}function R1(p){return p.toLowerCase().replace(/\s+/g,"-")}function U1({planned:p}){return r.jsx("div",{className:"tds-preview__tracker-planned-grid",children:p.map(M=>r.jsxs("article",{className:"tds-preview__tracker-planned-card",children:[r.jsxs("div",{className:"tds-preview__tracker-planned-card-head",children:[r.jsx("h3",{className:"tds-preview__tracker-planned-name",children:M.name}),r.jsx("span",{className:`tds-preview__tracker-priority tds-preview__tracker-priority--${R1(M.priority)}`,children:M.priority})]}),r.jsx("p",{className:"tds-preview__tracker-planned-category",children:M.category}),M.description&&r.jsx("p",{className:"tds-preview__tracker-planned-desc",children:M.description}),M.dependsOn&&r.jsxs("p",{className:"tds-preview__tracker-planned-meta",children:["Depends on: ",M.dependsOn]})]},M.name))})}function q1(p){return new Date(p).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"})}function Z1(){const{summary:p,pages:M,components:L,planned:_,lastBuiltAt:D,warnings:N}=T1;return r.jsxs("div",{className:"tds-preview__panel is-active",role:"tabpanel",id:"tracker",children:[r.jsx(zp,{eyebrow:"Build progress",title:"Component tracker",desc:`CSS build status from Components/ and DS consumption across every demo under pages/. Last updated ${q1(D)}.`}),r.jsxs(fo,{title:"At a glance",desc:"CSS build completion, per-page DS adoption, and category coverage — regenerated on every preview build.",children:[r.jsx(B1,{summary:p}),r.jsx(H1,{summary:p,components:L,pages:M,planned:_})]}),r.jsx(V1,{components:L,pages:M}),_.length>0&&r.jsx(fo,{title:"Planned backlog",desc:"Upcoming components tracked in data/component-tracker.yaml.",children:r.jsx(U1,{planned:_})}),N.length>0&&r.jsxs("aside",{className:"tds-preview__tracker-warnings","aria-label":"Tracker warnings",children:[r.jsx("h3",{className:"tds-preview__tracker-showcase__title",children:"Build warnings"}),r.jsx("ul",{children:N.map(O=>r.jsx("li",{children:O},O))})]})]})}const Y1=`(function initPreviewInteractionCore() {
  if (window.__tdsPreviewInteractionCoreInit) return;
  window.__tdsPreviewInteractionCoreInit = true;

function toggleAccordion(header) {
  const accordion = header.closest('.tds-accordion');
  if (!accordion || accordion.classList.contains('tds-accordion--disabled') || accordion.classList.contains('tds-accordion--skeleton')) return;
  const expanded = accordion.classList.toggle('tds-accordion--expanded');
  header.setAttribute('aria-expanded', expanded ? 'true' : 'false');
}

function toggleSwitch(label) {
  const track = label.querySelector('.tds-switch__track');
  if (!track || label.classList.contains('tds-switch--disabled')) return;
  const on = track.getAttribute('aria-checked') === 'true';
  track.setAttribute('aria-checked', on ? 'false' : 'true');
  track.classList.toggle('tds-switch__track--on', !on);
}

(function initTokenSubTabs() {
  const root = document.getElementById("tokens");
  if (!root) return;

  const TOKEN_TAB_IDS = Array.from(root.querySelectorAll(".ds-token-tabs__btn[data-token-tab]")).map(
    (tab) => tab.dataset.tokenTab
  );
  if (!TOKEN_TAB_IDS.length) return;

  const tabs = root.querySelectorAll(".ds-token-tabs__btn[data-token-tab]");
  const panels = root.querySelectorAll(".ds-token-panel");

  function tabFor(id) {
    return root.querySelector(\`.ds-token-tabs__btn[data-token-tab="\${id}"]\`);
  }

  function activateTokenTab(id, { scrollTop = true } = {}) {
    if (!TOKEN_TAB_IDS.includes(id)) id = TOKEN_TAB_IDS[0];

    tabs.forEach((tab) => {
      const active = tab.dataset.tokenTab === id;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.setAttribute("tabindex", active ? "0" : "-1");
    });

    panels.forEach((panel) => {
      const active = panel.id === \`token-panel-\${id}\`;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });

    if (scrollTop) {
      const main = document.querySelector(".ds-main");
      if (main) main.scrollTop = 0;
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateTokenTab(tab.dataset.tokenTab));

    tab.addEventListener("keydown", (e) => {
      const idx = TOKEN_TAB_IDS.indexOf(tab.dataset.tokenTab);
      if (idx < 0) return;

      let next = idx;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next = (idx + 1) % TOKEN_TAB_IDS.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        next = (idx - 1 + TOKEN_TAB_IDS.length) % TOKEN_TAB_IDS.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = TOKEN_TAB_IDS.length - 1;
      } else {
        return;
      }

      const nextTab = tabFor(TOKEN_TAB_IDS[next]);
      nextTab?.focus();
      activateTokenTab(TOKEN_TAB_IDS[next]);
    });
  });

  activateTokenTab(TOKEN_TAB_IDS[0], { scrollTop: false });
})();

// Interactive tabs
document.querySelectorAll('.tds-tabs').forEach(tabs => {
  tabs.querySelectorAll('.tds-tab-item:not(.tds-tab-item--disabled)').forEach(tab => {
    tab.addEventListener('click', () => {
      const list = tab.closest('.tds-tabs__list') || tabs;
      list.querySelectorAll('.tds-tab-item').forEach(t => {
        t.classList.remove('tds-tab-item--active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('tds-tab-item--active');
      tab.setAttribute('aria-selected', 'true');
    });
  });
});

// Scrollable tabs overflow controls
document.querySelectorAll('.tds-tabs:has(.tds-tabs__overflow-btn), [data-tabs-scrollable]').forEach(tabs => {
  const list = tabs.querySelector('.tds-tabs__list');
  const leftBtn = tabs.querySelector('[data-tabs-scroll="left"]');
  const rightBtn = tabs.querySelector('[data-tabs-scroll="right"]');
  if (!list || !leftBtn || !rightBtn) return;

  const updateOverflowButtons = () => {
    const canScrollLeft = list.scrollLeft > 1;
    const canScrollRight = list.scrollLeft + list.clientWidth < list.scrollWidth - 1;
    leftBtn.classList.toggle('tds-tabs__overflow-btn--visible', canScrollLeft);
    rightBtn.classList.toggle('tds-tabs__overflow-btn--visible', canScrollRight);
    leftBtn.tabIndex = canScrollLeft ? 0 : -1;
    rightBtn.tabIndex = canScrollRight ? 0 : -1;
  };

  const scrollTabs = (direction) => {
    list.scrollBy({
      left: direction === 'left' ? -list.clientWidth * 0.6 : list.clientWidth * 0.6,
      behavior: 'smooth',
    });
  };

  leftBtn.addEventListener('click', () => scrollTabs('left'));
  rightBtn.addEventListener('click', () => scrollTabs('right'));
  list.addEventListener('scroll', updateOverflowButtons, { passive: true });
  window.addEventListener('resize', updateOverflowButtons);
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(updateOverflowButtons).observe(list);
  }
  updateOverflowButtons();
});

// Interactive filter tabs
document.querySelectorAll('.tds-filter-tabs').forEach(tabs => {
  tabs.querySelectorAll('.tds-filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.querySelectorAll('.tds-filter-tab').forEach(t => t.classList.remove('tds-filter-tab--selected'));
      tab.classList.add('tds-filter-tab--selected');
    });
  });
});

// Interactive action list items (standalone panels only)
document.querySelectorAll('.tds-dropdown-panel').forEach(panel => {
  if (panel.closest('.tds-select--interactive')) return;
  const hasRadio = panel.querySelector('input[type="radio"]');
  const hasCheckbox = panel.querySelector('input[type="checkbox"]');

  panel.querySelectorAll('.tds-action-list-item:not(.tds-action-list-item--disabled)').forEach(item => {
    item.addEventListener('click', () => {
      if (hasCheckbox) return;
      panel.querySelectorAll('.tds-action-list-item').forEach(i => i.classList.remove('tds-action-list-item--selected'));
      item.classList.add('tds-action-list-item--selected');
    });
  });

  if (hasRadio) {
    panel.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', () => {
        panel.querySelectorAll('label.tds-action-list-item').forEach(i => i.classList.remove('tds-action-list-item--selected'));
        radio.closest('label.tds-action-list-item')?.classList.add('tds-action-list-item--selected');
      });
    });
  }
});

})();

// Interactive selects with dropdown menus
function closeAllSelectMenus(except) {
  document.querySelectorAll('.tds-select--interactive.tds-select--open').forEach(select => {
    if (select === except) return;
    select.classList.remove('tds-select--open');
    const trigger = select.querySelector('.tds-select__trigger');
    const menu = select.__tdsSelectMenu || select.querySelector('.tds-select__menu');
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.classList.remove('tds-select__trigger--focus');
    }
    if (menu) {
      menu.setAttribute('hidden', '');
      if (window.TdsDropdownPanel) TdsDropdownPanel.close(menu);
    }
  });
}

function initPreviewSelects(root) {
  const scope = root || document;
  scope.querySelectorAll('.tds-select--interactive').forEach(select => {
  if (select.dataset.previewSelectBound) return;
  select.dataset.previewSelectBound = '1';

  const trigger = select.querySelector('.tds-select__trigger');
  const menu = select.querySelector('.tds-select__menu');
  select.__tdsSelectMenu = menu;
  const valueEl = select.querySelector('.tds-select__value');
  const menuType = select.dataset.menuType || 'text';
  const placeholder = valueEl?.dataset.placeholder || 'Placeholder';

  if (!trigger || !menu || select.classList.contains('tds-select--disabled')) return;

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = select.classList.contains('tds-select--open');
    closeAllSelectMenus();
    if (!isOpen) {
      select.classList.add('tds-select--open');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('tds-select__trigger--focus');
      menu.removeAttribute('hidden');
      if (window.TdsDropdownPanel) {
        TdsDropdownPanel.open(trigger, menu, {
          align: 'start',
          onClose: () => {
            select.classList.remove('tds-select--open');
            trigger.setAttribute('aria-expanded', 'false');
            trigger.classList.remove('tds-select__trigger--focus');
            menu.setAttribute('hidden', '');
          },
        });
      }
    }
  });

  function closeSelectMenu() {
    if (window.TdsDropdownPanel) TdsDropdownPanel.close(menu);
    else {
      select.classList.remove('tds-select--open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.classList.remove('tds-select__trigger--focus');
      menu.setAttribute('hidden', '');
    }
  }

  function syncSelectTriggerTag(item) {
    const trailingGroup = trigger.querySelector('.tds-select__trailing-group');
    if (!trailingGroup) return;
    const caret = trailingGroup.querySelector('.tds-caret');
    const existingTag = trailingGroup.querySelector('.tds-select__tag');
    const menuTag = item.querySelector('.tds-action-list-item__trailing-visual .tds-tag');

    if (menuTag && caret) {
      const tag = menuTag.cloneNode(true);
      tag.classList.add('tds-select__tag');
      tag.setAttribute('aria-hidden', 'true');
      if (existingTag) existingTag.replaceWith(tag);
      else trailingGroup.insertBefore(tag, caret);
    } else if (existingTag) {
      existingTag.remove();
    }
  }

  if (menuType === 'multiSelect') {
    menu.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        const checked = [...menu.querySelectorAll('input[type="checkbox"]:checked')];
        if (!valueEl) return;
        if (checked.length === 0) {
          valueEl.textContent = placeholder;
          valueEl.classList.add('tds-select__placeholder');
        } else if (checked.length === 1) {
          valueEl.textContent = checked[0].value;
          valueEl.classList.remove('tds-select__placeholder');
        } else {
          valueEl.textContent = checked.length + ' selected';
          valueEl.classList.remove('tds-select__placeholder');
        }
      });
    });
    menu.querySelectorAll('label.tds-action-list-item').forEach(label => {
      label.addEventListener('click', (e) => e.stopPropagation());
    });
    return;
  }

  menu.querySelectorAll('.tds-action-list-item:not(.tds-action-list-item--disabled)').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = item.dataset.value
        || item.querySelector('.tds-action-list-item__label')?.textContent.trim()
        || item.textContent.trim();
      menu.querySelectorAll('.tds-action-list-item').forEach(i => i.classList.remove('tds-action-list-item--selected'));
      item.classList.add('tds-action-list-item--selected');
      if (valueEl) {
        valueEl.textContent = val;
        valueEl.classList.remove('tds-select__placeholder');
      }

      if (menuType === 'icon') {
        const icon = item.querySelector('.tds-action-list-item__leading-visual');
        let slot = select.querySelector('.tds-select__leading-visual');
        if (icon) {
          if (!slot) {
            slot = document.createElement('span');
            slot.className = 'tds-select__leading-visual';
            slot.setAttribute('aria-hidden', 'true');
            trigger.insertBefore(slot, valueEl);
          }
          slot.hidden = false;
          slot.removeAttribute('hidden');
          slot.innerHTML = icon.innerHTML;
        }
      }

      if (menuType === 'flag') {
        const flag = item.querySelector('.tds-action-list-item__leading-visual');
        let slot = select.querySelector('.tds-select__country-flag');
        if (flag) {
          if (!slot) {
            slot = document.createElement('span');
            slot.className = 'tds-select__country-flag';
            slot.setAttribute('aria-hidden', 'true');
            trigger.insertBefore(slot, valueEl);
          }
          slot.hidden = false;
          slot.removeAttribute('hidden');
          slot.innerHTML = flag.innerHTML;
        }
      }

      if (menuType === 'recommended') {
        syncSelectTriggerTag(item);
      }

      closeSelectMenu();
    });
  });
  });
}

window.initPreviewSelects = initPreviewSelects;

(function initPreviewSelectGlobalListeners() {
  if (window.__tdsPreviewSelectListeners) return;
  window.__tdsPreviewSelectListeners = true;

  document.addEventListener('click', (e) => {
    if (e.target.closest('.tds-select--interactive, .tds-select__menu')) return;
    closeAllSelectMenus();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllSelectMenus();
  });
})();

initPreviewSelects();

function initPreviewDropdownMenus(root) {
  if (window.TdsDropdownPanel) {
    window.TdsDropdownPanel.initMenus(root || document);
  }
}
window.initPreviewDropdownMenus = initPreviewDropdownMenus;
initPreviewDropdownMenus();

(function initPreviewInteractionTail() {
  if (window.__tdsPreviewInteractionTailInit) return;
  window.__tdsPreviewInteractionTailInit = true;

// Interactive nav items
document.querySelectorAll('.tds-nav-list').forEach(list => {
  list.querySelectorAll('.tds-nav-item:not(.tds-nav-item--disabled):not(:disabled)').forEach(item => {
    item.addEventListener('click', () => {
      list.querySelectorAll('.tds-nav-item').forEach(i => i.classList.remove('tds-nav-item--active'));
      item.classList.add('tds-nav-item--active');
    });
  });
});

// Set indeterminate checkbox
const indetCb = document.getElementById('indet-cb');
if (indetCb) indetCb.indeterminate = true;
const indetCbDis = document.getElementById('indet-cb-dis');
if (indetCbDis) indetCbDis.indeterminate = true;

// Pagination interaction
document.querySelectorAll('#pagination-pages .tds-data-table__pagination-page').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#pagination-pages .tds-data-table__pagination-page').forEach(b => {
      b.classList.remove('tds-data-table__pagination-page--active');
    });
    btn.classList.add('tds-data-table__pagination-page--active');
  });
});

})();

window.initPreviewSelects?.();
window.initPreviewDropdownMenus?.();`,G1=`/**
 * TdsDropdownPanel — viewport-aware positioning for floating dropdown panels.
 * Used by ButtonMenu, FilterButton, SortButton, Select, and Combobox menus.
 *
 * Positioning rules:
 * 1. Content sizing — panels size to their content by default (width: max-content).
 * 2. Alignment — align to the trigger start or end edge; flip to the other edge
 *    when the preferred side would overflow the viewport.
 * 3. Minimum width — panel min-width equals the triggering component width.
 * 4. Overflow — when wider than the viewport, clamp width (never below min-width)
 *    and adjust horizontal alignment to stay as visible as possible.
 */
(function (global) {
  "use strict";

  var VIEWPORT_CLASS = "tds-dropdown-panel--viewport";
  var MENU_SELECTOR = ".tds-button-menu, .tds-filter-button, .tds-sort-button";
  var DEFAULT_VIEWPORT_PAD = 16;
  var DEFAULT_GAP = 4;
  var DEFAULT_MAX_HEIGHT = 316;
  var MIN_HEIGHT = 160;

  var openEntries = [];
  var globalBound = false;
  var portalHosts = new WeakMap();

  function portalToBody(element) {
    if (portalHosts.has(element)) return;
    var parent = element.parentNode;
    if (!parent) return;
    portalHosts.set(element, {
      parent: parent,
      nextSibling: element.nextSibling,
    });
    document.body.appendChild(element);
  }

  function restorePortal(element) {
    var state = portalHosts.get(element);
    if (!state) return;
    if (state.nextSibling && state.nextSibling.parentNode === state.parent) {
      state.parent.insertBefore(element, state.nextSibling);
    } else {
      state.parent.appendChild(element);
    }
    portalHosts.delete(element);
  }

  function getScrollAncestors(el) {
    var ancestors = [];
    var node = el.parentElement;
    while (node && node !== document.documentElement) {
      var style = getComputedStyle(node);
      var overflow = style.overflow + style.overflowX + style.overflowY;
      if (/auto|scroll|overlay/.test(overflow)) {
        ancestors.push(node);
      }
      node = node.parentElement;
    }
    return ancestors;
  }

  function bindScrollListeners(entry) {
    unbindScrollListeners(entry);
    var nodes = getScrollAncestors(entry.trigger);
    entry.scrollTargets = nodes;
    entry.onScroll = function () {
      positionInViewport(entry.trigger, entry.element, entry.options);
    };
    nodes.forEach(function (node) {
      node.addEventListener("scroll", entry.onScroll, { passive: true });
    });
  }

  function unbindScrollListeners(entry) {
    if (!entry.scrollTargets || !entry.onScroll) return;
    entry.scrollTargets.forEach(function (node) {
      node.removeEventListener("scroll", entry.onScroll);
    });
    entry.scrollTargets = null;
    entry.onScroll = null;
  }

  function getAlign(menu) {
    if (menu.dataset.dropdownAlign === "start" || menu.dataset.dropdownAlign === "end") {
      return menu.dataset.dropdownAlign;
    }
    if (menu.classList.contains("tds-sort-button")) return "end";
    return "start";
  }

  function resolveHorizontalLeft(triggerRect, panelWidth, preferredAlign, viewportPad) {
    var viewportRight = window.innerWidth - viewportPad;
    var startLeft = triggerRect.left;
    var endLeft = triggerRect.right - panelWidth;

    function fits(left) {
      return left >= viewportPad && left + panelWidth <= viewportRight;
    }

    function overflowAmount(left) {
      return Math.max(0, viewportPad - left) + Math.max(0, left + panelWidth - viewportRight);
    }

    var preferredLeft = preferredAlign === "end" ? endLeft : startLeft;
    var alternateLeft = preferredAlign === "end" ? startLeft : endLeft;

    if (fits(preferredLeft)) return preferredLeft;
    if (fits(alternateLeft)) return alternateLeft;

    var left = overflowAmount(startLeft) <= overflowAmount(endLeft) ? startLeft : endLeft;
    if (left + panelWidth > viewportRight) left = viewportRight - panelWidth;
    if (left < viewportPad) left = viewportPad;

    return left;
  }

  function getMenuPanel(element) {
    if (
      element.classList.contains("tds-select__menu") ||
      element.classList.contains("tds-combobox__menu")
    ) {
      return element.querySelector(".tds-dropdown-panel");
    }
    return null;
  }

  /** Ancestors with filter/transform/backdrop-filter make fixed coords relative to them, not the viewport. */
  function getFixedContainingBlock(element) {
    var node = element.parentElement;
    while (node && node !== document.documentElement) {
      var style = getComputedStyle(node);
      if (
        style.transform !== "none" ||
        style.perspective !== "none" ||
        style.filter !== "none" ||
        (style.backdropFilter && style.backdropFilter !== "none") ||
        (style.webkitBackdropFilter && style.webkitBackdropFilter !== "none") ||
        style.contain === "paint" ||
        style.contain === "strict" ||
        style.contain === "content"
      ) {
        return node;
      }
      node = node.parentElement;
    }
    return null;
  }

  function toFixedPositionCoords(viewportLeft, viewportTop, element) {
    var block = getFixedContainingBlock(element);
    if (!block) return { left: viewportLeft, top: viewportTop };
    var rect = block.getBoundingClientRect();
    return {
      left: viewportLeft - rect.left,
      top: viewportTop - rect.top,
    };
  }

  function resetSizing(element) {
    if (!element) return;
    element.style.width = "";
    element.style.minWidth = "";
    element.style.maxWidth = "";
    element.style.maxHeight = "";
  }

  function resetPosition(element) {
    if (!element) return;
    var panel = getMenuPanel(element);

    element.classList.remove(VIEWPORT_CLASS);
    element.style.position = "";
    element.style.display = "";
    element.style.top = "";
    element.style.left = "";
    element.style.right = "";
    element.style.bottom = "";
    element.style.visibility = "";
    resetSizing(element);
    resetSizing(panel);
  }

  function untrack(element) {
    openEntries = openEntries.filter(function (entry) {
      if (entry.element !== element) return true;
      unbindScrollListeners(entry);
      resetPosition(entry.element);
      restorePortal(entry.element);
      return false;
    });
  }

  function positionInViewport(trigger, element, options) {
    if (!trigger || !element) return;

    options = options || {};
    var viewportPad = options.viewportPad != null ? options.viewportPad : DEFAULT_VIEWPORT_PAD;
    var gap = options.gap != null ? options.gap : DEFAULT_GAP;
    var align = options.align || "start";
    var maxHeight = options.maxHeight != null ? options.maxHeight : DEFAULT_MAX_HEIGHT;
    var minTriggerWidth = options.minTriggerWidth !== false;

    var triggerRect = trigger.getBoundingClientRect();
    var maxAllowedWidth = window.innerWidth - viewportPad * 2;
    var triggerWidth = Math.max(triggerRect.width, 0);
    var panel = getMenuPanel(element);
    var sizeEl = panel || element;

    element.classList.add(VIEWPORT_CLASS);
    element.style.position = "fixed";
    element.style.display = "block";
    element.style.visibility = "hidden";
    element.style.top = "0px";
    element.style.left = "0px";
    element.style.right = "auto";
    element.style.bottom = "auto";
    resetSizing(element);
    resetSizing(panel);

    sizeEl.style.width = "";
    sizeEl.style.minWidth = minTriggerWidth ? triggerWidth + "px" : "";
    sizeEl.style.maxWidth = maxAllowedWidth + "px";
    sizeEl.style.maxHeight = maxHeight + "px";

    var naturalWidth = sizeEl.offsetWidth;
    var minWidth = minTriggerWidth ? triggerWidth : 0;
    var panelWidth = Math.max(minWidth, Math.min(naturalWidth, maxAllowedWidth));

    var left = resolveHorizontalLeft(triggerRect, panelWidth, align, viewportPad);

    var topBelow = triggerRect.bottom + gap;
    var availableBelow = window.innerHeight - viewportPad - topBelow;
    var availableAbove = triggerRect.top - viewportPad - gap;
    var maxH = Math.min(maxHeight, Math.max(MIN_HEIGHT, availableBelow));

    if (panelWidth < naturalWidth) {
      sizeEl.style.width = Math.round(panelWidth) + "px";
    } else {
      sizeEl.style.width = "";
    }

    var panelHeight = element.offsetHeight;
    var viewportTop = topBelow;
    if (panelHeight > availableBelow && availableAbove > availableBelow) {
      maxH = Math.min(maxHeight, Math.max(MIN_HEIGHT, availableAbove));
      sizeEl.style.maxHeight = Math.round(maxH) + "px";
      panelHeight = Math.min(element.offsetHeight, maxH);
      viewportTop = Math.max(viewportPad, triggerRect.top - gap - panelHeight);
    } else {
      sizeEl.style.maxHeight = Math.round(maxH) + "px";
    }

    if (portalHosts.has(element)) {
      element.style.left = Math.round(left) + "px";
      element.style.top = Math.round(viewportTop) + "px";
    } else {
      var coords = toFixedPositionCoords(left, viewportTop, element);
      element.style.left = Math.round(coords.left) + "px";
      element.style.top = Math.round(coords.top) + "px";
    }

    element.style.visibility = "";
  }

  function open(trigger, element, options) {
    untrack(element);
    portalToBody(element);
    positionInViewport(trigger, element, options);
    var entry = {
      trigger: trigger,
      element: element,
      options: options || {},
      onClose: options.onClose,
    };
    bindScrollListeners(entry);
    openEntries.push(entry);
  }

  function closeEntry(entry) {
    unbindScrollListeners(entry);
    if (entry.onClose) entry.onClose();
    resetPosition(entry.element);
    restorePortal(entry.element);
  }

  function close(element) {
    openEntries = openEntries.filter(function (entry) {
      if (entry.element === element) {
        closeEntry(entry);
        return false;
      }
      return true;
    });
  }

  function closeAll(exceptElement) {
    openEntries.slice().forEach(function (entry) {
      if (exceptElement && entry.element === exceptElement) return;
      closeEntry(entry);
    });
    openEntries = exceptElement
      ? openEntries.filter(function (entry) {
          return entry.element === exceptElement;
        })
      : [];
  }

  function repositionAll() {
    openEntries.slice().forEach(function (entry) {
      positionInViewport(entry.trigger, entry.element, entry.options);
    });
  }

  function bindGlobalListeners() {
    if (globalBound) return;
    globalBound = true;

    document.addEventListener("click", function (event) {
      if (event.target.closest(MENU_SELECTOR)) return;
      if (event.target.closest(".tds-select--interactive")) return;
      if (event.target.closest(".tds-combobox--interactive")) return;
      if (event.target.closest(".tds-select__menu, .tds-combobox__menu")) return;
      if (event.target.closest(".tds-dropdown-panel--viewport")) return;
      closeAll();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeAll();
    });

    window.addEventListener("resize", repositionAll);
  }

  function setToolbarMenuOpenState(menu, isOpen) {
    if (menu && menu.classList.contains("tds-filter-button")) {
      menu.classList.toggle("tds-filter-button--open", isOpen);
    }
    if (menu && menu.classList.contains("tds-sort-button")) {
      menu.classList.toggle("tds-sort-button--open", isOpen);
    }
  }

  function resetFilterButtonSelections(menu, panel) {
    menu.classList.remove("tds-filter-button--selected", "tds-filter-button--multi");
    setToolbarMenuOpenState(menu, false);

    var menuButtons = panel.querySelectorAll("button.tds-action-list-item");

    menuButtons.forEach(function (item) {
      item.classList.remove("tds-action-list-item--selected");
      if (item.hasAttribute("aria-checked")) {
        item.setAttribute("aria-checked", "false");
      }
      if (item.hasAttribute("aria-selected")) {
        item.setAttribute("aria-selected", "false");
      }
    });

    panel.querySelectorAll("input[type='checkbox']").forEach(function (input) {
      input.checked = false;
    });

    var valueLabel = menu.querySelector(".tds-filter-button__trigger-value");
    if (valueLabel) valueLabel.textContent = "";
    var counter = menu.querySelector(".tds-filter-button__counter");
    if (counter) counter.textContent = "";
  }

  function resetSortButtonSelections(menu, panel) {
    menu.classList.remove("tds-sort-button--selected");
    setToolbarMenuOpenState(menu, false);

    panel.querySelectorAll("button.tds-action-list-item").forEach(function (item) {
      item.classList.remove("tds-action-list-item--selected");
      if (item.hasAttribute("aria-checked")) {
        item.setAttribute("aria-checked", "false");
      }
      if (item.hasAttribute("aria-selected")) {
        item.setAttribute("aria-selected", "false");
      }
    });
  }

  function handleFilterButtonClear(event, menu, panel) {
    event.preventDefault();
    event.stopPropagation();
    close(panel);
    resetFilterButtonSelections(menu, panel);
    menu.dispatchEvent(new CustomEvent("tds-filter-clear", { bubbles: true }));
  }

  function handleSortButtonClear(event, menu, panel) {
    event.preventDefault();
    event.stopPropagation();
    close(panel);
    resetSortButtonSelections(menu, panel);
    menu.dispatchEvent(new CustomEvent("tds-sort-clear", { bubbles: true }));
  }

  function initMenus(root, options) {
    options = options || {};
    bindGlobalListeners();

    (root || document).querySelectorAll(MENU_SELECTOR).forEach(function (menu) {
      if (menu.dataset.tdsDropdownBound) return;

      var trigger = menu.querySelector("button[aria-haspopup='menu']");
      var panel = menu.querySelector(".tds-dropdown-panel");
      if (!trigger || !panel) return;

      /* Preserve static open-state specimens in the component docs grid. */
      if (menu.closest(".ds-state-grid--dropdown-specimens") && !panel.hasAttribute("hidden")) {
        return;
      }

      menu.dataset.tdsDropdownBound = "1";
      if (menu.classList.contains("tds-sort-button")) {
        panel.classList.add("tds-dropdown-panel--sort-menu");
      }
      if (menu.classList.contains("tds-filter-button")) {
        panel.classList.add("tds-dropdown-panel--filter-menu");
      }
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");

      trigger.addEventListener("click", function (event) {
        if (event.target.closest(".tds-filter-button__clear, .tds-sort-button__clear")) return;
        event.stopPropagation();
        var isOpen = !panel.hidden;

        closeAll();

        if (isOpen) {
          close(panel);
          return;
        }

        panel.hidden = false;
        trigger.setAttribute("aria-expanded", "true");
        setToolbarMenuOpenState(menu, true);
        open(trigger, panel, {
          align: getAlign(menu),
          viewportPad: options.viewportPad,
          gap: options.gap,
          maxHeight: options.maxHeight,
          onClose: function () {
            panel.hidden = true;
            trigger.setAttribute("aria-expanded", "false");
            setToolbarMenuOpenState(menu, false);
          },
        });
      });

      menu.querySelectorAll("button.tds-action-list-item").forEach(function (item) {
        item.addEventListener("click", function () {
          close(panel);
        });
      });

      if (menu.classList.contains("tds-filter-button")) {
        var filterClearEl = menu.querySelector(".tds-filter-button__clear");
        if (filterClearEl && !filterClearEl.dataset.tdsClearBound) {
          filterClearEl.dataset.tdsClearBound = "1";
          filterClearEl.addEventListener("mousedown", function (event) {
            event.stopPropagation();
          });
          filterClearEl.addEventListener("click", function (event) {
            handleFilterButtonClear(event, menu, panel);
          });
        }
      }

      if (menu.classList.contains("tds-sort-button")) {
        var sortClearEl = menu.querySelector(".tds-sort-button__clear");
        if (sortClearEl && !sortClearEl.dataset.tdsClearBound) {
          sortClearEl.dataset.tdsClearBound = "1";
          sortClearEl.addEventListener("mousedown", function (event) {
            event.stopPropagation();
          });
          sortClearEl.addEventListener("click", function (event) {
            handleSortButtonClear(event, menu, panel);
          });
        }
      }
    });
  }

  global.TdsDropdownPanel = {
    open: open,
    close: close,
    closeAll: closeAll,
    resetPosition: resetPosition,
    positionInViewport: positionInViewport,
    repositionAll: repositionAll,
    initMenus: initMenus,
  };
})(typeof window !== "undefined" ? window : globalThis);
`,X1=`/**
 * TDS DatePicker — single and range calendar interactions for preview demos.
 */
(function () {
  "use strict";

  var MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  var PLACEHOLDER = "mm/dd/yyyy";
  var CHEVRON_LEFT =
    '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 8L10 3L10.7 3.7L6.4 8L10.7 12.3L10 13L5 8Z" fill="currentColor"/></svg>';
  var CHEVRON_RIGHT =
    '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M11 8L6 3L5.3 3.7L9.6 8L5.3 12.3L6 13L11 8Z" fill="currentColor"/></svg>';

  var openContext = null;
  var globalBound = false;
  var FLOATING_CLASS = "tds-date-picker__calendar--floating";
  var CALENDAR_GAP = 4;
  var VIEWPORT_PAD = 16;
  var portalHosts = new WeakMap();

  function portalCalendar(calendar, host) {
    if (portalHosts.has(calendar)) return;
    portalHosts.set(calendar, {
      host: host,
      nextSibling: calendar.nextSibling,
    });
    document.body.appendChild(calendar);
  }

  function restoreCalendarPortal(calendar) {
    var state = portalHosts.get(calendar);
    if (!state) return;
    var parent = state.host;
    if (state.nextSibling && state.nextSibling.parentNode === parent) {
      parent.insertBefore(calendar, state.nextSibling);
    } else {
      parent.appendChild(calendar);
    }
    portalHosts.delete(calendar);
  }

  function getScrollAncestors(el) {
    var ancestors = [];
    var node = el.parentElement;
    while (node && node !== document.documentElement) {
      var style = getComputedStyle(node);
      var overflow = style.overflow + style.overflowX + style.overflowY;
      if (/auto|scroll|overlay/.test(overflow)) {
        ancestors.push(node);
      }
      node = node.parentElement;
    }
    return ancestors;
  }

  function positionFloatingCalendar(anchor, calendar) {
    var rect = anchor.getBoundingClientRect();
    calendar.style.position = "fixed";
    calendar.style.visibility = "hidden";
    calendar.style.left = "-9999px";
    calendar.style.top = "0px";
    var calWidth = calendar.offsetWidth || 288;
    var calHeight = calendar.offsetHeight || 320;
    var left = rect.left;
    if (left + calWidth > window.innerWidth - VIEWPORT_PAD) {
      left = window.innerWidth - VIEWPORT_PAD - calWidth;
    }
    if (left < VIEWPORT_PAD) left = VIEWPORT_PAD;
    var top = rect.bottom + CALENDAR_GAP;
    if (
      top + calHeight > window.innerHeight - VIEWPORT_PAD &&
      rect.top - CALENDAR_GAP - calHeight > VIEWPORT_PAD
    ) {
      top = rect.top - CALENDAR_GAP - calHeight;
    }
    if (top < VIEWPORT_PAD) top = VIEWPORT_PAD;
    if (top + calHeight > window.innerHeight - VIEWPORT_PAD) {
      top = Math.max(VIEWPORT_PAD, window.innerHeight - VIEWPORT_PAD - calHeight);
    }
    calendar.style.left = Math.round(left) + "px";
    calendar.style.top = Math.round(top) + "px";
    calendar.style.visibility = "";
  }

  function bindFloatingListeners(context) {
    unbindFloatingListeners(context);
    context.onScroll = function () {
      positionFloatingCalendar(context.anchor, context.calendar);
    };
    context.scrollTargets = getScrollAncestors(context.anchor);
    context.scrollTargets.forEach(function (node) {
      node.addEventListener("scroll", context.onScroll, { passive: true });
    });
    window.addEventListener("resize", context.onScroll);
  }

  function unbindFloatingListeners(context) {
    if (!context || !context.onScroll) return;
    if (context.scrollTargets) {
      context.scrollTargets.forEach(function (node) {
        node.removeEventListener("scroll", context.onScroll);
      });
    }
    window.removeEventListener("resize", context.onScroll);
    context.onScroll = null;
    context.scrollTargets = null;
  }

  function showFloatingCalendar(anchor, calendar, host, closeFn) {
    portalCalendar(calendar, host);
    calendar.classList.add(FLOATING_CLASS);
    calendar.hidden = false;
    positionFloatingCalendar(anchor, calendar);
    requestAnimationFrame(function () {
      if (!calendar.hidden) positionFloatingCalendar(anchor, calendar);
    });
    openContext = {
      close: closeFn,
      anchor: anchor,
      calendar: calendar,
      host: host,
    };
    bindFloatingListeners(openContext);
  }

  function hideFloatingCalendar(calendar, host) {
    if (openContext) unbindFloatingListeners(openContext);
    calendar.hidden = true;
    calendar.classList.remove(FLOATING_CLASS);
    calendar.style.position = "";
    calendar.style.left = "";
    calendar.style.top = "";
    calendar.style.visibility = "";
    restoreCalendarPortal(calendar);
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function dateKey(date) {
    return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
  }

  function parseDateKey(key) {
    var parts = key.split("-");
    if (parts.length !== 3) return null;
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  function formatDate(date) {
    return pad(date.getMonth() + 1) + "/" + pad(date.getDate()) + "/" + date.getFullYear();
  }

  function parseDate(str) {
    if (!str) return null;
    var parts = str.split("/");
    if (parts.length !== 3) return null;
    var month = Number(parts[0]) - 1;
    var day = Number(parts[1]);
    var year = Number(parts[2]);
    var date = new Date(year, month, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      return null;
    }
    return date;
  }

  function sameDay(a, b) {
    return (
      a &&
      b &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function compareDays(a, b) {
    return startOfDay(a).getTime() - startOfDay(b).getTime();
  }

  function setFieldValue(field, valueEl, date) {
    if (!valueEl) return;
    if (date) {
      valueEl.textContent = formatDate(date);
      valueEl.classList.remove("tds-date-picker__placeholder");
    } else {
      valueEl.textContent = PLACEHOLDER;
      valueEl.classList.add("tds-date-picker__placeholder");
    }
  }

  function createCalendar(label) {
    var calendar = document.createElement("div");
    calendar.className = "tds-date-picker__calendar";
    calendar.setAttribute("role", "dialog");
    calendar.setAttribute("aria-label", label || "Choose date");
    calendar.hidden = true;
    calendar.innerHTML =
      '<div class="tds-date-picker__header">' +
      '<button type="button" class="tds-date-picker__nav" data-date-picker-prev aria-label="Previous month">' +
      CHEVRON_LEFT +
      "</button>" +
      '<div class="tds-date-picker__title">' +
      '<span class="tds-date-picker__month"></span>' +
      '<span class="tds-date-picker__year"></span>' +
      "</div>" +
      '<button type="button" class="tds-date-picker__nav" data-date-picker-next aria-label="Next month">' +
      CHEVRON_RIGHT +
      "</button>" +
      "</div>" +
      '<div class="tds-date-picker__weekdays" aria-hidden="true">' +
      ["S", "M", "T", "W", "T", "F", "S"]
        .map(function (day) {
          return (
            '<span class="tds-date-picker__day tds-date-picker__day--weekday">' +
            day +
            "</span>"
          );
        })
        .join("") +
      "</div>" +
      '<div class="tds-date-picker__weeks"></div>';
    return calendar;
  }

  function buildMonthGrid(viewDate) {
    var year = viewDate.getFullYear();
    var month = viewDate.getMonth();
    var first = new Date(year, month, 1);
    var startOffset = first.getDay();
    var gridStart = new Date(year, month, 1 - startOffset);
    var weeks = [];

    for (var w = 0; w < 6; w += 1) {
      var days = [];
      for (var d = 0; d < 7; d += 1) {
        days.push(new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + w * 7 + d));
      }
      weeks.push(days);
    }
    return weeks;
  }

  function renderCalendar(calendar, state) {
    var monthEl = calendar.querySelector(".tds-date-picker__month");
    var yearEl = calendar.querySelector(".tds-date-picker__year");
    var weeksEl = calendar.querySelector(".tds-date-picker__weeks");
    var today = startOfDay(new Date());
    var viewDate = state.viewDate;
    var weeks = buildMonthGrid(viewDate);

    monthEl.textContent = MONTHS[viewDate.getMonth()];
    yearEl.textContent = String(viewDate.getFullYear());

    weeksEl.innerHTML = weeks
      .map(function (week) {
        return (
          '<div class="tds-date-picker__week">' +
          week
            .map(function (date) {
              var outside = date.getMonth() !== viewDate.getMonth();
              var classes = ["tds-date-picker__day"];
              if (outside) classes.push("tds-date-picker__day--outside");

              if (sameDay(date, today)) classes.push("tds-date-picker__day--today");

              if (state.mode === "single" && sameDay(date, state.selected)) {
                classes.push("tds-date-picker__day--selected");
              }

              if (state.mode === "range" && state.rangeStart && state.rangeEnd) {
                var start = compareDays(date, state.rangeStart);
                var end = compareDays(date, state.rangeEnd);
                if (start >= 0 && end <= 0) {
                  classes.push("tds-date-picker__day--in-range");
                  if (sameDay(date, state.rangeStart)) {
                    classes.push("tds-date-picker__day--range-start", "tds-date-picker__day--selected");
                  }
                  if (sameDay(date, state.rangeEnd)) {
                    classes.push("tds-date-picker__day--range-end", "tds-date-picker__day--selected");
                  }
                }
              } else if (state.mode === "range" && state.rangeStart && !state.rangeEnd) {
                if (sameDay(date, state.rangeStart)) {
                  classes.push("tds-date-picker__day--selected", "tds-date-picker__day--range-start");
                } else if (state.hoverEnd) {
                  var lo =
                    compareDays(state.rangeStart, state.hoverEnd) <= 0
                      ? state.rangeStart
                      : state.hoverEnd;
                  var hi =
                    compareDays(state.rangeStart, state.hoverEnd) <= 0
                      ? state.hoverEnd
                      : state.rangeStart;
                  var pos = compareDays(date, lo);
                  var posEnd = compareDays(date, hi);
                  if (pos >= 0 && posEnd <= 0) {
                    classes.push("tds-date-picker__day--in-range");
                    if (sameDay(date, lo)) classes.push("tds-date-picker__day--range-start");
                    if (sameDay(date, hi)) classes.push("tds-date-picker__day--range-end");
                  }
                }
              }

              return (
                '<button type="button" class="' +
                classes.join(" ") +
                '" data-date="' +
                dateKey(date) +
                '">' +
                date.getDate() +
                "</button>"
              );
            })
            .join("") +
          "</div>"
        );
      })
      .join("");
  }

  function closeOpenPicker() {
    if (!openContext) return;
    openContext.close();
    openContext = null;
  }

  function initSinglePicker(picker) {
    if (picker.dataset.datePickerBound) return;
    if (picker.closest("[data-date-picker-range]")) return;

    if (
      picker.classList.contains("tds-date-picker--disabled") ||
      picker.classList.contains("tds-date-picker--readonly")
    ) {
      return;
    }

    picker.dataset.datePickerBound = "1";

    var field = picker.querySelector(".tds-date-picker__field");
    var valueEl = picker.querySelector(".tds-date-picker__value");
    if (!field || !valueEl || field.tagName !== "BUTTON") return;

    var selected = parseDate(picker.dataset.value || valueEl.textContent.trim());
    if (selected) setFieldValue(field, valueEl, selected);

    var viewDate = selected ? new Date(selected) : new Date();
    var calendar = picker.querySelector(".tds-date-picker__calendar");
    if (!calendar) {
      calendar = createCalendar(picker.dataset.calendarLabel || "Choose date");
      picker.appendChild(calendar);
    }

    var state = {
      mode: "single",
      viewDate: new Date(viewDate),
      selected: selected,
    };

    function render() {
      renderCalendar(calendar, state);
    }

    function handleDayClick(btn) {
      var date = parseDateKey(btn.dataset.date);
      if (!date) return;
      state.selected = date;
      state.viewDate = new Date(date);
      setFieldValue(field, valueEl, date);
      render();
      close();
    }

    calendar.querySelector(".tds-date-picker__weeks").onclick = function (e) {
      var btn = e.target.closest("[data-date]");
      if (!btn || btn.disabled) return;
      e.stopPropagation();
      handleDayClick(btn);
    };

    function open() {
      closeOpenPicker();
      picker.classList.add("tds-date-picker--open");
      field.classList.add("tds-date-picker__field--focus");
      field.setAttribute("aria-expanded", "true");
      if (state.selected) state.viewDate = new Date(state.selected);
      render();
      calendar.hidden = false;
      openContext = { close: close };
    }

    function close() {
      picker.classList.remove("tds-date-picker--open");
      field.classList.remove("tds-date-picker__field--focus");
      field.setAttribute("aria-expanded", "false");
      calendar.hidden = true;
      if (openContext && openContext.close === close) openContext = null;
    }

    field.addEventListener("click", function (e) {
      e.stopPropagation();
      if (picker.classList.contains("tds-date-picker--open")) close();
      else open();
    });

    calendar.querySelector("[data-date-picker-prev]").addEventListener("click", function (e) {
      e.stopPropagation();
      state.viewDate = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth() - 1, 1);
      render();
    });

    calendar.querySelector("[data-date-picker-next]").addEventListener("click", function (e) {
      e.stopPropagation();
      state.viewDate = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth() + 1, 1);
      render();
    });

    calendar.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  function initRangePicker(range) {
    if (range.dataset.datePickerRangeBound) return;

    if (
      range.classList.contains("tds-date-picker-range--disabled") ||
      range.classList.contains("tds-date-picker-range--readonly")
    ) {
      return;
    }

    range.dataset.datePickerRangeBound = "1";

    var startPicker = range.querySelector('[data-date-picker-part="start"]');
    var endPicker = range.querySelector('[data-date-picker-part="end"]');
    if (!startPicker || !endPicker) return;

    var startField = startPicker.querySelector(".tds-date-picker__field");
    var endField = endPicker.querySelector(".tds-date-picker__field");
    var startValue = startPicker.querySelector(".tds-date-picker__value");
    var endValue = endPicker.querySelector(".tds-date-picker__value");
    if (!startField || !endField || !startValue || !endValue) return;

    var rangeStart = parseDate(range.dataset.start || startValue.textContent.trim());
    var rangeEnd = parseDate(range.dataset.end || endValue.textContent.trim());
    if (rangeStart) setFieldValue(startField, startValue, rangeStart);
    if (rangeEnd) setFieldValue(endField, endValue, rangeEnd);

    var viewDate = rangeStart || rangeEnd || new Date();
    var fieldsRow = range.querySelector(".tds-date-picker-range__fields");
    var calendar = range.querySelector(".tds-date-picker__calendar");
    if (!calendar) {
      calendar = createCalendar("Choose date range");
      calendar.classList.add("tds-date-picker-range__calendar");
      if (fieldsRow && fieldsRow.nextSibling) {
        range.insertBefore(calendar, fieldsRow.nextSibling);
      } else if (fieldsRow) {
        range.appendChild(calendar);
      } else {
        range.appendChild(calendar);
      }
    }

    var activePart = "start";
    var state = {
      mode: "range",
      viewDate: new Date(viewDate),
      rangeStart: rangeStart,
      rangeEnd: rangeEnd,
      hoverEnd: null,
    };

    function render() {
      renderCalendar(calendar, state);
    }

    function handleRangeDayClick(btn) {
      var date = parseDateKey(btn.dataset.date);
      if (!date) return;

      if (!state.rangeStart || (state.rangeStart && state.rangeEnd)) {
        state.rangeStart = date;
        state.rangeEnd = null;
        activePart = "end";
        setFieldValue(startField, startValue, date);
        setFieldValue(endField, endValue, null);
      } else {
        if (compareDays(date, state.rangeStart) < 0) {
          state.rangeEnd = state.rangeStart;
          state.rangeStart = date;
        } else {
          state.rangeEnd = date;
        }
        setFieldValue(startField, startValue, state.rangeStart);
        setFieldValue(endField, endValue, state.rangeEnd);
        state.hoverEnd = null;
        state.viewDate = new Date(date);
        render();
        close();
        return;
      }

      state.hoverEnd = null;
      state.viewDate = new Date(date);
      render();
    }

    var weeksEl = calendar.querySelector(".tds-date-picker__weeks");
    weeksEl.onmouseover = function (e) {
      var btn = e.target.closest("[data-date]");
      if (!btn || !state.rangeStart || state.rangeEnd) return;
      state.hoverEnd = parseDateKey(btn.dataset.date);
      render();
    };

    weeksEl.onclick = function (e) {
      var btn = e.target.closest("[data-date]");
      if (!btn) return;
      e.stopPropagation();
      handleRangeDayClick(btn);
    };

    function setActivePicker(part) {
      activePart = part;
      startPicker.classList.toggle("tds-date-picker--open", part === "start");
      endPicker.classList.toggle("tds-date-picker--open", part === "end");
      startField.classList.toggle("tds-date-picker__field--focus", part === "start");
      endField.classList.toggle("tds-date-picker__field--focus", part === "end");
      startField.setAttribute("aria-expanded", part === "start" ? "true" : "false");
      endField.setAttribute("aria-expanded", part === "end" ? "true" : "false");
    }

    function open(part) {
      closeOpenPicker();
      var nextPart = part || activePart;
      setActivePicker(nextPart);
      if (nextPart === "start" && state.rangeStart) state.viewDate = new Date(state.rangeStart);
      if (nextPart === "end" && state.rangeEnd) state.viewDate = new Date(state.rangeEnd);
      render();
      calendar.hidden = false;
      range.classList.add("tds-date-picker-range--open");
      openContext = { close: close };
    }

    function close() {
      startPicker.classList.remove("tds-date-picker--open");
      endPicker.classList.remove("tds-date-picker--open");
      startField.classList.remove("tds-date-picker__field--focus");
      endField.classList.remove("tds-date-picker__field--focus");
      startField.setAttribute("aria-expanded", "false");
      endField.setAttribute("aria-expanded", "false");
      calendar.hidden = true;
      range.classList.remove("tds-date-picker-range--open");
      state.hoverEnd = null;
      if (openContext && openContext.close === close) openContext = null;
    }

    startField.addEventListener("click", function (e) {
      e.stopPropagation();
      if (!calendar.hidden && activePart === "start") close();
      else if (!calendar.hidden && activePart === "end") {
        setActivePicker("start");
        if (state.rangeStart) state.viewDate = new Date(state.rangeStart);
        render();
      } else open("start");
    });

    endField.addEventListener("click", function (e) {
      e.stopPropagation();
      if (!calendar.hidden && activePart === "end") close();
      else if (!calendar.hidden && activePart === "start") {
        setActivePicker("end");
        if (state.rangeEnd) state.viewDate = new Date(state.rangeEnd);
        render();
      } else open("end");
    });

    calendar.querySelector("[data-date-picker-prev]").addEventListener("click", function (e) {
      e.stopPropagation();
      state.viewDate = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth() - 1, 1);
      render();
    });

    calendar.querySelector("[data-date-picker-next]").addEventListener("click", function (e) {
      e.stopPropagation();
      state.viewDate = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth() + 1, 1);
      render();
    });

    calendar.addEventListener("mouseleave", function () {
      if (!state.rangeEnd) {
        state.hoverEnd = null;
        render();
      }
    });

    calendar.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  function initDatePickers(root) {
    var scope = root || document;
    scope.querySelectorAll("[data-date-picker]").forEach(initSinglePicker);
    scope.querySelectorAll("[data-date-picker-range]").forEach(initRangePicker);
  }

  initDatePickers(document);

  if (!globalBound) {
    globalBound = true;

    document.addEventListener("click", function (event) {
      if (event.target.closest(".tds-date-picker, .tds-date-picker-range, .tds-date-picker__calendar")) {
        return;
      }
      closeOpenPicker();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeOpenPicker();
    });
  }

  window.initDatePickers = initDatePickers;
})();
`,Q1=`/**
 * Dialog — open/close for preview and consuming apps.
 * Triggers: [data-dialog-open="dialog-id"]
 * Close: .tds-dialog__dismiss, [data-dialog-close], backdrop click, Escape
 */
(function initTdsDialog() {
  if (window.__tdsDialogInit) return;
  window.__tdsDialogInit = true;

  const DISMISS_SVG =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg>';

  function isLiveDialog(dialog) {
    return dialog && !dialog.classList.contains("tds-dialog--inline");
  }

  function syncBodyScrollLock() {
    const hasOpenLive = document.querySelector(".tds-dialog:not([hidden]):not(.tds-dialog--inline)");
    document.body.classList.toggle("tds-dialog-open", Boolean(hasOpenLive));
  }

  function openDialog(id) {
    const dialog = document.getElementById(id);
    if (!dialog || !isLiveDialog(dialog)) return;
    dialog.hidden = false;
    syncBodyScrollLock();
    const focusTarget =
      dialog.querySelector(".tds-dialog__dismiss") ||
      dialog.querySelector(".tds-dialog__actions .tds-btn") ||
      dialog.querySelector(".tds-dialog__panel");
    focusTarget?.focus?.();
  }

  function closeDialog(dialog) {
    if (!dialog || !isLiveDialog(dialog)) return;
    dialog.hidden = true;
    syncBodyScrollLock();
  }

  document.addEventListener("click", (event) => {
    const openTrigger = event.target.closest("[data-dialog-open]");
    if (openTrigger) {
      event.preventDefault();
      openDialog(openTrigger.getAttribute("data-dialog-open"));
      return;
    }

    const closeTrigger = event.target.closest(".tds-dialog__dismiss, [data-dialog-close]");
    if (closeTrigger) {
      const dialog = closeTrigger.closest(".tds-dialog");
      if (isLiveDialog(dialog)) {
        event.preventDefault();
        closeDialog(dialog);
      }
      return;
    }

    if (event.target.classList.contains("tds-dialog__backdrop")) {
      const dialog = event.target.closest(".tds-dialog");
      if (isLiveDialog(dialog) && dialog.dataset.backdropClose !== "false") {
        closeDialog(dialog);
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const openDialogEl = document.querySelector(".tds-dialog:not([hidden]):not(.tds-dialog--inline)");
    if (openDialogEl) {
      event.preventDefault();
      closeDialog(openDialogEl);
    }
  });

  window.openTdsDialog = openDialog;
  window.closeTdsDialog = closeDialog;
  window.TdsDialogDismissIcon = DISMISS_SVG;
})();
`;function ql(p){const M=document.createElement("script");M.textContent=p,document.body.appendChild(M),M.remove()}function Ap(){var p,M,L;(p=window.initPreviewSelects)==null||p.call(window),(M=window.initPreviewDropdownMenus)==null||M.call(window),(L=window.initDatePickers)==null||L.call(window)}function K1(p){Vs.useEffect(()=>{window.__tdsPreviewScriptsLoaded||(window.__tdsPreviewScriptsLoaded=!0,ql(G1),ql(X1),ql(Q1),ql(Y1),requestAnimationFrame(()=>{Ap()}))},[]),Vs.useEffect(()=>{const M=requestAnimationFrame(()=>{Ap()});return()=>cancelAnimationFrame(M)},[p])}function _o(){const p=window.location.hash.replace("#","");return!p||p==="home"?null:_1.includes(p)?p:null}function F1(){var x;const[p,M]=Vs.useState(_o),[L,_]=Vs.useState(()=>_o()!==null),D=Vs.useRef(null),N=p===null,O=((x=Zl.find(V=>V.id===p))==null?void 0:x.label)??"Overview",W=Vs.useCallback((V,{updateHash:H=!0,scrollTop:I=!0}={})=>{var Bs;M(V),H&&window.location.hash!==`#${V}`&&history.replaceState(null,"",`#${V}`),I&&((Bs=D.current)==null||Bs.scrollTo({top:0,behavior:"instant"}),window.scrollTo(0,0))},[]),S=Vs.useCallback(({updateHash:V=!0,scrollTop:H=!0}={})=>{var I;M(null),V&&window.location.hash!==""&&window.location.hash!=="#home"&&history.replaceState(null,"",window.location.pathname+window.location.search),H&&((I=D.current)==null||I.scrollTo({top:0,behavior:"instant"}),window.scrollTo(0,0))},[]);return Vs.useEffect(()=>{const V=()=>{var I;const H=_o();M(H),(I=D.current)==null||I.scrollTo({top:0,behavior:"instant"})};return window.addEventListener("hashchange",V),()=>window.removeEventListener("hashchange",V)},[]),K1(p),r.jsxs("div",{className:`tds-preview${N?" tds-preview--home":" tds-preview--docs"}${L?"":" tds-preview--sidebar-closed"}`,children:[r.jsx(g1,{}),r.jsx(b1,{activeTab:p,isHome:N,isOpen:L,onSelect:W,onHome:S,onToggle:()=>_(V=>!V)}),r.jsx("div",{className:"tds-preview__shell",children:r.jsxs("div",{className:"tds-preview__workspace",children:[r.jsx(m1,{activeLabel:O,activeTab:p,isHome:N,sidebarOpen:L,onSelect:W,onHome:S,onToggleSidebar:()=>_(V=>!V)}),r.jsxs("main",{className:"tds-preview__main",ref:D,children:[r.jsxs("div",{className:"tds-preview__content",children:[N&&r.jsx(w1,{features:f1,onExplore:()=>W("buttons")}),r.jsxs("div",{className:"tds-preview__panels","aria-hidden":N,children:[v1.map(V=>r.jsx(k1,{section:V,active:!N&&V.id===p},V.id)),!N&&p==="tracker"&&r.jsx(Z1,{})]})]}),r.jsxs("footer",{className:"tds-preview__footer",children:[r.jsx("span",{children:"Trulioo Design System · ADS 2026"}),!N&&r.jsx("a",{href:"../index.html",className:"tds-preview__footer-link",children:"Classic preview"})]})]})]})})]})}p1.createRoot(document.getElementById("root")).render(r.jsx(F1,{}));
