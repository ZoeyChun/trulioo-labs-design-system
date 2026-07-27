(function(){const S=document.createElement("link").relList;if(S&&S.supports&&S.supports("modulepreload"))return;for(const M of document.querySelectorAll('link[rel="modulepreload"]'))_(M);new MutationObserver(M=>{for(const N of M)if(N.type==="childList")for(const V of N.addedNodes)V.tagName==="LINK"&&V.rel==="modulepreload"&&_(V)}).observe(document,{childList:!0,subtree:!0});function D(M){const N={};return M.integrity&&(N.integrity=M.integrity),M.referrerPolicy&&(N.referrerPolicy=M.referrerPolicy),M.crossOrigin==="use-credentials"?N.credentials="include":M.crossOrigin==="anonymous"?N.credentials="omit":N.credentials="same-origin",N}function _(M){if(M.ep)return;M.ep=!0;const N=D(M);fetch(M.href,N)}})();var oo={exports:{}},wn={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mv;function a1(){if(mv)return wn;mv=1;var v=Symbol.for("react.transitional.element"),S=Symbol.for("react.fragment");function D(_,M,N){var V=null;if(N!==void 0&&(V=""+N),M.key!==void 0&&(V=""+M.key),"key"in M){N={};for(var j in M)j!=="key"&&(N[j]=M[j])}else N=M;return M=N.ref,{$$typeof:v,type:_,key:V,ref:M!==void 0?M:null,props:N}}return wn.Fragment=S,wn.jsx=D,wn.jsxs=D,wn}var wv;function n1(){return wv||(wv=1,oo.exports=a1()),oo.exports}var c=n1(),co={exports:{}},kn={},ro={exports:{}},uo={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kv;function l1(){return kv||(kv=1,(function(v){function S(w,L){var q=w.length;w.push(L);s:for(;0<q;){var is=q-1>>>1,rs=w[is];if(0<M(rs,L))w[is]=L,w[q]=rs,q=is;else break s}}function D(w){return w.length===0?null:w[0]}function _(w){if(w.length===0)return null;var L=w[0],q=w.pop();if(q!==L){w[0]=q;s:for(var is=0,rs=w.length,u=rs>>>1;is<u;){var x=2*(is+1)-1,B=w[x],A=x+1,Y=w[A];if(0>M(B,q))A<rs&&0>M(Y,B)?(w[is]=Y,w[A]=q,is=A):(w[is]=B,w[x]=q,is=x);else if(A<rs&&0>M(Y,q))w[is]=Y,w[A]=q,is=A;else break s}}return L}function M(w,L){var q=w.sortIndex-L.sortIndex;return q!==0?q:w.id-L.id}if(v.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var N=performance;v.unstable_now=function(){return N.now()}}else{var V=Date,j=V.now();v.unstable_now=function(){return V.now()-j}}var T=[],C=[],R=1,O=null,$=3,As=!1,Rs=!1,Os=!1,Bt=!1,Is=typeof setTimeout=="function"?setTimeout:null,Jt=typeof clearTimeout=="function"?clearTimeout:null,zs=typeof setImmediate<"u"?setImmediate:null;function dt(w){for(var L=D(C);L!==null;){if(L.callback===null)_(C);else if(L.startTime<=w)_(C),L.sortIndex=L.expirationTime,S(T,L);else break;L=D(C)}}function yt(w){if(Os=!1,dt(w),!Rs)if(D(T)!==null)Rs=!0,Us||(Us=!0,Zs());else{var L=D(C);L!==null&&bt(yt,L.startTime-w)}}var Us=!1,W=-1,qs=5,xt=-1;function qe(){return Bt?!0:!(v.unstable_now()-xt<qs)}function Ct(){if(Bt=!1,Us){var w=v.unstable_now();xt=w;var L=!0;try{s:{Rs=!1,Os&&(Os=!1,Jt(W),W=-1),As=!0;var q=$;try{t:{for(dt(w),O=D(T);O!==null&&!(O.expirationTime>w&&qe());){var is=O.callback;if(typeof is=="function"){O.callback=null,$=O.priorityLevel;var rs=is(O.expirationTime<=w);if(w=v.unstable_now(),typeof rs=="function"){O.callback=rs,dt(w),L=!0;break t}O===D(T)&&_(T),dt(w)}else _(T);O=D(T)}if(O!==null)L=!0;else{var u=D(C);u!==null&&bt(yt,u.startTime-w),L=!1}}break s}finally{O=null,$=q,As=!1}L=void 0}}finally{L?Zs():Us=!1}}}var Zs;if(typeof zs=="function")Zs=function(){zs(Ct)};else if(typeof MessageChannel<"u"){var ke=new MessageChannel,Tt=ke.port2;ke.port1.onmessage=Ct,Zs=function(){Tt.postMessage(null)}}else Zs=function(){Is(Ct,0)};function bt(w,L){W=Is(function(){w(v.unstable_now())},L)}v.unstable_IdlePriority=5,v.unstable_ImmediatePriority=1,v.unstable_LowPriority=4,v.unstable_NormalPriority=3,v.unstable_Profiling=null,v.unstable_UserBlockingPriority=2,v.unstable_cancelCallback=function(w){w.callback=null},v.unstable_forceFrameRate=function(w){0>w||125<w?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):qs=0<w?Math.floor(1e3/w):5},v.unstable_getCurrentPriorityLevel=function(){return $},v.unstable_next=function(w){switch($){case 1:case 2:case 3:var L=3;break;default:L=$}var q=$;$=L;try{return w()}finally{$=q}},v.unstable_requestPaint=function(){Bt=!0},v.unstable_runWithPriority=function(w,L){switch(w){case 1:case 2:case 3:case 4:case 5:break;default:w=3}var q=$;$=w;try{return L()}finally{$=q}},v.unstable_scheduleCallback=function(w,L,q){var is=v.unstable_now();switch(typeof q=="object"&&q!==null?(q=q.delay,q=typeof q=="number"&&0<q?is+q:is):q=is,w){case 1:var rs=-1;break;case 2:rs=250;break;case 5:rs=1073741823;break;case 4:rs=1e4;break;default:rs=5e3}return rs=q+rs,w={id:R++,callback:L,priorityLevel:w,startTime:q,expirationTime:rs,sortIndex:-1},q>is?(w.sortIndex=q,S(C,w),D(T)===null&&w===D(C)&&(Os?(Jt(W),W=-1):Os=!0,bt(yt,q-is))):(w.sortIndex=rs,S(T,w),Rs||As||(Rs=!0,Us||(Us=!0,Zs()))),w},v.unstable_shouldYield=qe,v.unstable_wrapCallback=function(w){var L=$;return function(){var q=$;$=L;try{return w.apply(this,arguments)}finally{$=q}}}})(uo)),uo}var yv;function i1(){return yv||(yv=1,ro.exports=l1()),ro.exports}var vo={exports:{}},Z={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xv;function d1(){if(xv)return Z;xv=1;var v=Symbol.for("react.transitional.element"),S=Symbol.for("react.portal"),D=Symbol.for("react.fragment"),_=Symbol.for("react.strict_mode"),M=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),V=Symbol.for("react.context"),j=Symbol.for("react.forward_ref"),T=Symbol.for("react.suspense"),C=Symbol.for("react.memo"),R=Symbol.for("react.lazy"),O=Symbol.for("react.activity"),$=Symbol.iterator;function As(u){return u===null||typeof u!="object"?null:(u=$&&u[$]||u["@@iterator"],typeof u=="function"?u:null)}var Rs={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Os=Object.assign,Bt={};function Is(u,x,B){this.props=u,this.context=x,this.refs=Bt,this.updater=B||Rs}Is.prototype.isReactComponent={},Is.prototype.setState=function(u,x){if(typeof u!="object"&&typeof u!="function"&&u!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,u,x,"setState")},Is.prototype.forceUpdate=function(u){this.updater.enqueueForceUpdate(this,u,"forceUpdate")};function Jt(){}Jt.prototype=Is.prototype;function zs(u,x,B){this.props=u,this.context=x,this.refs=Bt,this.updater=B||Rs}var dt=zs.prototype=new Jt;dt.constructor=zs,Os(dt,Is.prototype),dt.isPureReactComponent=!0;var yt=Array.isArray;function Us(){}var W={H:null,A:null,T:null,S:null},qs=Object.prototype.hasOwnProperty;function xt(u,x,B){var A=B.ref;return{$$typeof:v,type:u,key:x,ref:A!==void 0?A:null,props:B}}function qe(u,x){return xt(u.type,x,u.props)}function Ct(u){return typeof u=="object"&&u!==null&&u.$$typeof===v}function Zs(u){var x={"=":"=0",":":"=2"};return"$"+u.replace(/[=:]/g,function(B){return x[B]})}var ke=/\/+/g;function Tt(u,x){return typeof u=="object"&&u!==null&&u.key!=null?Zs(""+u.key):x.toString(36)}function bt(u){switch(u.status){case"fulfilled":return u.value;case"rejected":throw u.reason;default:switch(typeof u.status=="string"?u.then(Us,Us):(u.status="pending",u.then(function(x){u.status==="pending"&&(u.status="fulfilled",u.value=x)},function(x){u.status==="pending"&&(u.status="rejected",u.reason=x)})),u.status){case"fulfilled":return u.value;case"rejected":throw u.reason}}throw u}function w(u,x,B,A,Y){var Q=typeof u;(Q==="undefined"||Q==="boolean")&&(u=null);var as=!1;if(u===null)as=!0;else switch(Q){case"bigint":case"string":case"number":as=!0;break;case"object":switch(u.$$typeof){case v:case S:as=!0;break;case R:return as=u._init,w(as(u._payload),x,B,A,Y)}}if(as)return Y=Y(u),as=A===""?"."+Tt(u,0):A,yt(Y)?(B="",as!=null&&(B=as.replace(ke,"$&/")+"/"),w(Y,x,B,"",function(Ma){return Ma})):Y!=null&&(Ct(Y)&&(Y=qe(Y,B+(Y.key==null||u&&u.key===Y.key?"":(""+Y.key).replace(ke,"$&/")+"/")+as)),x.push(Y)),1;as=0;var Hs=A===""?".":A+":";if(yt(u))for(var gs=0;gs<u.length;gs++)A=u[gs],Q=Hs+Tt(A,gs),as+=w(A,x,B,Q,Y);else if(gs=As(u),typeof gs=="function")for(u=gs.call(u),gs=0;!(A=u.next()).done;)A=A.value,Q=Hs+Tt(A,gs++),as+=w(A,x,B,Q,Y);else if(Q==="object"){if(typeof u.then=="function")return w(bt(u),x,B,A,Y);throw x=String(u),Error("Objects are not valid as a React child (found: "+(x==="[object Object]"?"object with keys {"+Object.keys(u).join(", ")+"}":x)+"). If you meant to render a collection of children, use an array instead.")}return as}function L(u,x,B){if(u==null)return u;var A=[],Y=0;return w(u,A,"","",function(Q){return x.call(B,Q,Y++)}),A}function q(u){if(u._status===-1){var x=u._result;x=x(),x.then(function(B){(u._status===0||u._status===-1)&&(u._status=1,u._result=B)},function(B){(u._status===0||u._status===-1)&&(u._status=2,u._result=B)}),u._status===-1&&(u._status=0,u._result=x)}if(u._status===1)return u._result.default;throw u._result}var is=typeof reportError=="function"?reportError:function(u){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var x=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof u=="object"&&u!==null&&typeof u.message=="string"?String(u.message):String(u),error:u});if(!window.dispatchEvent(x))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",u);return}console.error(u)},rs={map:L,forEach:function(u,x,B){L(u,function(){x.apply(this,arguments)},B)},count:function(u){var x=0;return L(u,function(){x++}),x},toArray:function(u){return L(u,function(x){return x})||[]},only:function(u){if(!Ct(u))throw Error("React.Children.only expected to receive a single React element child.");return u}};return Z.Activity=O,Z.Children=rs,Z.Component=Is,Z.Fragment=D,Z.Profiler=M,Z.PureComponent=zs,Z.StrictMode=_,Z.Suspense=T,Z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=W,Z.__COMPILER_RUNTIME={__proto__:null,c:function(u){return W.H.useMemoCache(u)}},Z.cache=function(u){return function(){return u.apply(null,arguments)}},Z.cacheSignal=function(){return null},Z.cloneElement=function(u,x,B){if(u==null)throw Error("The argument must be a React element, but you passed "+u+".");var A=Os({},u.props),Y=u.key;if(x!=null)for(Q in x.key!==void 0&&(Y=""+x.key),x)!qs.call(x,Q)||Q==="key"||Q==="__self"||Q==="__source"||Q==="ref"&&x.ref===void 0||(A[Q]=x[Q]);var Q=arguments.length-2;if(Q===1)A.children=B;else if(1<Q){for(var as=Array(Q),Hs=0;Hs<Q;Hs++)as[Hs]=arguments[Hs+2];A.children=as}return xt(u.type,Y,A)},Z.createContext=function(u){return u={$$typeof:V,_currentValue:u,_currentValue2:u,_threadCount:0,Provider:null,Consumer:null},u.Provider=u,u.Consumer={$$typeof:N,_context:u},u},Z.createElement=function(u,x,B){var A,Y={},Q=null;if(x!=null)for(A in x.key!==void 0&&(Q=""+x.key),x)qs.call(x,A)&&A!=="key"&&A!=="__self"&&A!=="__source"&&(Y[A]=x[A]);var as=arguments.length-2;if(as===1)Y.children=B;else if(1<as){for(var Hs=Array(as),gs=0;gs<as;gs++)Hs[gs]=arguments[gs+2];Y.children=Hs}if(u&&u.defaultProps)for(A in as=u.defaultProps,as)Y[A]===void 0&&(Y[A]=as[A]);return xt(u,Q,Y)},Z.createRef=function(){return{current:null}},Z.forwardRef=function(u){return{$$typeof:j,render:u}},Z.isValidElement=Ct,Z.lazy=function(u){return{$$typeof:R,_payload:{_status:-1,_result:u},_init:q}},Z.memo=function(u,x){return{$$typeof:C,type:u,compare:x===void 0?null:x}},Z.startTransition=function(u){var x=W.T,B={};W.T=B;try{var A=u(),Y=W.S;Y!==null&&Y(B,A),typeof A=="object"&&A!==null&&typeof A.then=="function"&&A.then(Us,is)}catch(Q){is(Q)}finally{x!==null&&B.types!==null&&(x.types=B.types),W.T=x}},Z.unstable_useCacheRefresh=function(){return W.H.useCacheRefresh()},Z.use=function(u){return W.H.use(u)},Z.useActionState=function(u,x,B){return W.H.useActionState(u,x,B)},Z.useCallback=function(u,x){return W.H.useCallback(u,x)},Z.useContext=function(u){return W.H.useContext(u)},Z.useDebugValue=function(){},Z.useDeferredValue=function(u,x){return W.H.useDeferredValue(u,x)},Z.useEffect=function(u,x){return W.H.useEffect(u,x)},Z.useEffectEvent=function(u){return W.H.useEffectEvent(u)},Z.useId=function(){return W.H.useId()},Z.useImperativeHandle=function(u,x,B){return W.H.useImperativeHandle(u,x,B)},Z.useInsertionEffect=function(u,x){return W.H.useInsertionEffect(u,x)},Z.useLayoutEffect=function(u,x){return W.H.useLayoutEffect(u,x)},Z.useMemo=function(u,x){return W.H.useMemo(u,x)},Z.useOptimistic=function(u,x){return W.H.useOptimistic(u,x)},Z.useReducer=function(u,x,B){return W.H.useReducer(u,x,B)},Z.useRef=function(u){return W.H.useRef(u)},Z.useState=function(u){return W.H.useState(u)},Z.useSyncExternalStore=function(u,x,B){return W.H.useSyncExternalStore(u,x,B)},Z.useTransition=function(){return W.H.useTransition()},Z.version="19.2.7",Z}var Cv;function go(){return Cv||(Cv=1,vo.exports=d1()),vo.exports}var po={exports:{}},Ns={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sv;function o1(){if(Sv)return Ns;Sv=1;var v=go();function S(T){var C="https://react.dev/errors/"+T;if(1<arguments.length){C+="?args[]="+encodeURIComponent(arguments[1]);for(var R=2;R<arguments.length;R++)C+="&args[]="+encodeURIComponent(arguments[R])}return"Minified React error #"+T+"; visit "+C+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function D(){}var _={d:{f:D,r:function(){throw Error(S(522))},D,C:D,L:D,m:D,X:D,S:D,M:D},p:0,findDOMNode:null},M=Symbol.for("react.portal");function N(T,C,R){var O=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:M,key:O==null?null:""+O,children:T,containerInfo:C,implementation:R}}var V=v.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function j(T,C){if(T==="font")return"";if(typeof C=="string")return C==="use-credentials"?C:""}return Ns.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=_,Ns.createPortal=function(T,C){var R=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!C||C.nodeType!==1&&C.nodeType!==9&&C.nodeType!==11)throw Error(S(299));return N(T,C,null,R)},Ns.flushSync=function(T){var C=V.T,R=_.p;try{if(V.T=null,_.p=2,T)return T()}finally{V.T=C,_.p=R,_.d.f()}},Ns.preconnect=function(T,C){typeof T=="string"&&(C?(C=C.crossOrigin,C=typeof C=="string"?C==="use-credentials"?C:"":void 0):C=null,_.d.C(T,C))},Ns.prefetchDNS=function(T){typeof T=="string"&&_.d.D(T)},Ns.preinit=function(T,C){if(typeof T=="string"&&C&&typeof C.as=="string"){var R=C.as,O=j(R,C.crossOrigin),$=typeof C.integrity=="string"?C.integrity:void 0,As=typeof C.fetchPriority=="string"?C.fetchPriority:void 0;R==="style"?_.d.S(T,typeof C.precedence=="string"?C.precedence:void 0,{crossOrigin:O,integrity:$,fetchPriority:As}):R==="script"&&_.d.X(T,{crossOrigin:O,integrity:$,fetchPriority:As,nonce:typeof C.nonce=="string"?C.nonce:void 0})}},Ns.preinitModule=function(T,C){if(typeof T=="string")if(typeof C=="object"&&C!==null){if(C.as==null||C.as==="script"){var R=j(C.as,C.crossOrigin);_.d.M(T,{crossOrigin:R,integrity:typeof C.integrity=="string"?C.integrity:void 0,nonce:typeof C.nonce=="string"?C.nonce:void 0})}}else C==null&&_.d.M(T)},Ns.preload=function(T,C){if(typeof T=="string"&&typeof C=="object"&&C!==null&&typeof C.as=="string"){var R=C.as,O=j(R,C.crossOrigin);_.d.L(T,R,{crossOrigin:O,integrity:typeof C.integrity=="string"?C.integrity:void 0,nonce:typeof C.nonce=="string"?C.nonce:void 0,type:typeof C.type=="string"?C.type:void 0,fetchPriority:typeof C.fetchPriority=="string"?C.fetchPriority:void 0,referrerPolicy:typeof C.referrerPolicy=="string"?C.referrerPolicy:void 0,imageSrcSet:typeof C.imageSrcSet=="string"?C.imageSrcSet:void 0,imageSizes:typeof C.imageSizes=="string"?C.imageSizes:void 0,media:typeof C.media=="string"?C.media:void 0})}},Ns.preloadModule=function(T,C){if(typeof T=="string")if(C){var R=j(C.as,C.crossOrigin);_.d.m(T,{as:typeof C.as=="string"&&C.as!=="script"?C.as:void 0,crossOrigin:R,integrity:typeof C.integrity=="string"?C.integrity:void 0})}else _.d.m(T)},Ns.requestFormReset=function(T){_.d.r(T)},Ns.unstable_batchedUpdates=function(T,C){return T(C)},Ns.useFormState=function(T,C,R){return V.H.useFormState(T,C,R)},Ns.useFormStatus=function(){return V.H.useHostTransitionStatus()},Ns.version="19.2.7",Ns}var Mv;function c1(){if(Mv)return po.exports;Mv=1;function v(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(v)}catch(S){console.error(S)}}return v(),po.exports=o1(),po.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dv;function r1(){if(Dv)return kn;Dv=1;var v=i1(),S=go(),D=c1();function _(s){var t="https://react.dev/errors/"+s;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var e=2;e<arguments.length;e++)t+="&args[]="+encodeURIComponent(arguments[e])}return"Minified React error #"+s+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function M(s){return!(!s||s.nodeType!==1&&s.nodeType!==9&&s.nodeType!==11)}function N(s){var t=s,e=s;if(s.alternate)for(;t.return;)t=t.return;else{s=t;do t=s,(t.flags&4098)!==0&&(e=t.return),s=t.return;while(s)}return t.tag===3?e:null}function V(s){if(s.tag===13){var t=s.memoizedState;if(t===null&&(s=s.alternate,s!==null&&(t=s.memoizedState)),t!==null)return t.dehydrated}return null}function j(s){if(s.tag===31){var t=s.memoizedState;if(t===null&&(s=s.alternate,s!==null&&(t=s.memoizedState)),t!==null)return t.dehydrated}return null}function T(s){if(N(s)!==s)throw Error(_(188))}function C(s){var t=s.alternate;if(!t){if(t=N(s),t===null)throw Error(_(188));return t!==s?null:s}for(var e=s,a=t;;){var n=e.return;if(n===null)break;var l=n.alternate;if(l===null){if(a=n.return,a!==null){e=a;continue}break}if(n.child===l.child){for(l=n.child;l;){if(l===e)return T(n),s;if(l===a)return T(n),t;l=l.sibling}throw Error(_(188))}if(e.return!==a.return)e=n,a=l;else{for(var i=!1,d=n.child;d;){if(d===e){i=!0,e=n,a=l;break}if(d===a){i=!0,a=n,e=l;break}d=d.sibling}if(!i){for(d=l.child;d;){if(d===e){i=!0,e=l,a=n;break}if(d===a){i=!0,a=l,e=n;break}d=d.sibling}if(!i)throw Error(_(189))}}if(e.alternate!==a)throw Error(_(190))}if(e.tag!==3)throw Error(_(188));return e.stateNode.current===e?s:t}function R(s){var t=s.tag;if(t===5||t===26||t===27||t===6)return s;for(s=s.child;s!==null;){if(t=R(s),t!==null)return t;s=s.sibling}return null}var O=Object.assign,$=Symbol.for("react.element"),As=Symbol.for("react.transitional.element"),Rs=Symbol.for("react.portal"),Os=Symbol.for("react.fragment"),Bt=Symbol.for("react.strict_mode"),Is=Symbol.for("react.profiler"),Jt=Symbol.for("react.consumer"),zs=Symbol.for("react.context"),dt=Symbol.for("react.forward_ref"),yt=Symbol.for("react.suspense"),Us=Symbol.for("react.suspense_list"),W=Symbol.for("react.memo"),qs=Symbol.for("react.lazy"),xt=Symbol.for("react.activity"),qe=Symbol.for("react.memo_cache_sentinel"),Ct=Symbol.iterator;function Zs(s){return s===null||typeof s!="object"?null:(s=Ct&&s[Ct]||s["@@iterator"],typeof s=="function"?s:null)}var ke=Symbol.for("react.client.reference");function Tt(s){if(s==null)return null;if(typeof s=="function")return s.$$typeof===ke?null:s.displayName||s.name||null;if(typeof s=="string")return s;switch(s){case Os:return"Fragment";case Is:return"Profiler";case Bt:return"StrictMode";case yt:return"Suspense";case Us:return"SuspenseList";case xt:return"Activity"}if(typeof s=="object")switch(s.$$typeof){case Rs:return"Portal";case zs:return s.displayName||"Context";case Jt:return(s._context.displayName||"Context")+".Consumer";case dt:var t=s.render;return s=s.displayName,s||(s=t.displayName||t.name||"",s=s!==""?"ForwardRef("+s+")":"ForwardRef"),s;case W:return t=s.displayName||null,t!==null?t:Tt(s.type)||"Memo";case qs:t=s._payload,s=s._init;try{return Tt(s(t))}catch{}}return null}var bt=Array.isArray,w=S.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,L=D.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,q={pending:!1,data:null,method:null,action:null},is=[],rs=-1;function u(s){return{current:s}}function x(s){0>rs||(s.current=is[rs],is[rs]=null,rs--)}function B(s,t){rs++,is[rs]=s.current,s.current=t}var A=u(null),Y=u(null),Q=u(null),as=u(null);function Hs(s,t){switch(B(Q,t),B(Y,s),B(A,null),t.nodeType){case 9:case 11:s=(s=t.documentElement)&&(s=s.namespaceURI)?Zu(s):0;break;default:if(s=t.tagName,t=t.namespaceURI)t=Zu(t),s=Yu(t,s);else switch(s){case"svg":s=1;break;case"math":s=2;break;default:s=0}}x(A),B(A,s)}function gs(){x(A),x(Y),x(Q)}function Ma(s){s.memoizedState!==null&&B(as,s);var t=A.current,e=Yu(t,s.type);t!==e&&(B(Y,s),B(A,e))}function xn(s){Y.current===s&&(x(A),x(Y)),as.current===s&&(x(as),hn._currentValue=q)}var Yl,bo;function ye(s){if(Yl===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Yl=t&&t[1]||"",bo=-1<e.stack.indexOf(`
    at`)?" (<anonymous>)":-1<e.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Yl+s+bo}var Gl=!1;function Xl(s,t){if(!s||Gl)return"";Gl=!0;var e=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(t){var y=function(){throw Error()};if(Object.defineProperty(y.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(y,[])}catch(b){var g=b}Reflect.construct(s,[],y)}else{try{y.call()}catch(b){g=b}s.call(y.prototype)}}else{try{throw Error()}catch(b){g=b}(y=s())&&typeof y.catch=="function"&&y.catch(function(){})}}catch(b){if(b&&g&&typeof b.stack=="string")return[b.stack,g.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var n=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");n&&n.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var l=a.DetermineComponentFrameRoot(),i=l[0],d=l[1];if(i&&d){var o=i.split(`
`),h=d.split(`
`);for(n=a=0;a<o.length&&!o[a].includes("DetermineComponentFrameRoot");)a++;for(;n<h.length&&!h[n].includes("DetermineComponentFrameRoot");)n++;if(a===o.length||n===h.length)for(a=o.length-1,n=h.length-1;1<=a&&0<=n&&o[a]!==h[n];)n--;for(;1<=a&&0<=n;a--,n--)if(o[a]!==h[n]){if(a!==1||n!==1)do if(a--,n--,0>n||o[a]!==h[n]){var m=`
`+o[a].replace(" at new "," at ");return s.displayName&&m.includes("<anonymous>")&&(m=m.replace("<anonymous>",s.displayName)),m}while(1<=a&&0<=n);break}}}finally{Gl=!1,Error.prepareStackTrace=e}return(e=s?s.displayName||s.name:"")?ye(e):""}function Nv(s,t){switch(s.tag){case 26:case 27:case 5:return ye(s.type);case 16:return ye("Lazy");case 13:return s.child!==t&&t!==null?ye("Suspense Fallback"):ye("Suspense");case 19:return ye("SuspenseList");case 0:case 15:return Xl(s.type,!1);case 11:return Xl(s.type.render,!1);case 1:return Xl(s.type,!0);case 31:return ye("Activity");default:return""}}function mo(s){try{var t="",e=null;do t+=Nv(s,e),e=s,s=s.return;while(s);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var Ql=Object.prototype.hasOwnProperty,Kl=v.unstable_scheduleCallback,Fl=v.unstable_cancelCallback,Ov=v.unstable_shouldYield,Hv=v.unstable_requestPaint,Ws=v.unstable_now,Vv=v.unstable_getCurrentPriorityLevel,wo=v.unstable_ImmediatePriority,ko=v.unstable_UserBlockingPriority,Cn=v.unstable_NormalPriority,jv=v.unstable_LowPriority,yo=v.unstable_IdlePriority,Rv=v.log,Uv=v.unstable_setDisableYieldValue,Da=null,Ps=null;function It(s){if(typeof Rv=="function"&&Uv(s),Ps&&typeof Ps.setStrictMode=="function")try{Ps.setStrictMode(Da,s)}catch{}}var $s=Math.clz32?Math.clz32:Yv,qv=Math.log,Zv=Math.LN2;function Yv(s){return s>>>=0,s===0?32:31-(qv(s)/Zv|0)|0}var Sn=256,Mn=262144,Dn=4194304;function xe(s){var t=s&42;if(t!==0)return t;switch(s&-s){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return s&261888;case 262144:case 524288:case 1048576:case 2097152:return s&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return s&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return s}}function Ln(s,t,e){var a=s.pendingLanes;if(a===0)return 0;var n=0,l=s.suspendedLanes,i=s.pingedLanes;s=s.warmLanes;var d=a&134217727;return d!==0?(a=d&~l,a!==0?n=xe(a):(i&=d,i!==0?n=xe(i):e||(e=d&~s,e!==0&&(n=xe(e))))):(d=a&~l,d!==0?n=xe(d):i!==0?n=xe(i):e||(e=a&~s,e!==0&&(n=xe(e)))),n===0?0:t!==0&&t!==n&&(t&l)===0&&(l=n&-n,e=t&-t,l>=e||l===32&&(e&4194048)!==0)?t:n}function La(s,t){return(s.pendingLanes&~(s.suspendedLanes&~s.pingedLanes)&t)===0}function Gv(s,t){switch(s){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function xo(){var s=Dn;return Dn<<=1,(Dn&62914560)===0&&(Dn=4194304),s}function Jl(s){for(var t=[],e=0;31>e;e++)t.push(s);return t}function Ba(s,t){s.pendingLanes|=t,t!==268435456&&(s.suspendedLanes=0,s.pingedLanes=0,s.warmLanes=0)}function Xv(s,t,e,a,n,l){var i=s.pendingLanes;s.pendingLanes=e,s.suspendedLanes=0,s.pingedLanes=0,s.warmLanes=0,s.expiredLanes&=e,s.entangledLanes&=e,s.errorRecoveryDisabledLanes&=e,s.shellSuspendCounter=0;var d=s.entanglements,o=s.expirationTimes,h=s.hiddenUpdates;for(e=i&~e;0<e;){var m=31-$s(e),y=1<<m;d[m]=0,o[m]=-1;var g=h[m];if(g!==null)for(h[m]=null,m=0;m<g.length;m++){var b=g[m];b!==null&&(b.lane&=-536870913)}e&=~y}a!==0&&Co(s,a,0),l!==0&&n===0&&s.tag!==0&&(s.suspendedLanes|=l&~(i&~t))}function Co(s,t,e){s.pendingLanes|=t,s.suspendedLanes&=~t;var a=31-$s(t);s.entangledLanes|=t,s.entanglements[a]=s.entanglements[a]|1073741824|e&261930}function So(s,t){var e=s.entangledLanes|=t;for(s=s.entanglements;e;){var a=31-$s(e),n=1<<a;n&t|s[a]&t&&(s[a]|=t),e&=~n}}function Mo(s,t){var e=t&-t;return e=(e&42)!==0?1:Il(e),(e&(s.suspendedLanes|t))!==0?0:e}function Il(s){switch(s){case 2:s=1;break;case 8:s=4;break;case 32:s=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:s=128;break;case 268435456:s=134217728;break;default:s=0}return s}function Wl(s){return s&=-s,2<s?8<s?(s&134217727)!==0?32:268435456:8:2}function Do(){var s=L.p;return s!==0?s:(s=window.event,s===void 0?32:vv(s.type))}function Lo(s,t){var e=L.p;try{return L.p=s,t()}finally{L.p=e}}var Wt=Math.random().toString(36).slice(2),Ds="__reactFiber$"+Wt,Ys="__reactProps$"+Wt,Ze="__reactContainer$"+Wt,Pl="__reactEvents$"+Wt,Qv="__reactListeners$"+Wt,Kv="__reactHandles$"+Wt,Bo="__reactResources$"+Wt,Ta="__reactMarker$"+Wt;function $l(s){delete s[Ds],delete s[Ys],delete s[Pl],delete s[Qv],delete s[Kv]}function Ye(s){var t=s[Ds];if(t)return t;for(var e=s.parentNode;e;){if(t=e[Ze]||e[Ds]){if(e=t.alternate,t.child!==null||e!==null&&e.child!==null)for(s=Iu(s);s!==null;){if(e=s[Ds])return e;s=Iu(s)}return t}s=e,e=s.parentNode}return null}function Ge(s){if(s=s[Ds]||s[Ze]){var t=s.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return s}return null}function Ea(s){var t=s.tag;if(t===5||t===26||t===27||t===6)return s.stateNode;throw Error(_(33))}function Xe(s){var t=s[Bo];return t||(t=s[Bo]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ss(s){s[Ta]=!0}var To=new Set,Eo={};function Ce(s,t){Qe(s,t),Qe(s+"Capture",t)}function Qe(s,t){for(Eo[s]=t,s=0;s<t.length;s++)To.add(t[s])}var Fv=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Ao={},zo={};function Jv(s){return Ql.call(zo,s)?!0:Ql.call(Ao,s)?!1:Fv.test(s)?zo[s]=!0:(Ao[s]=!0,!1)}function Bn(s,t,e){if(Jv(t))if(e===null)s.removeAttribute(t);else{switch(typeof e){case"undefined":case"function":case"symbol":s.removeAttribute(t);return;case"boolean":var a=t.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){s.removeAttribute(t);return}}s.setAttribute(t,""+e)}}function Tn(s,t,e){if(e===null)s.removeAttribute(t);else{switch(typeof e){case"undefined":case"function":case"symbol":case"boolean":s.removeAttribute(t);return}s.setAttribute(t,""+e)}}function Et(s,t,e,a){if(a===null)s.removeAttribute(e);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":s.removeAttribute(e);return}s.setAttributeNS(t,e,""+a)}}function ot(s){switch(typeof s){case"bigint":case"boolean":case"number":case"string":case"undefined":return s;case"object":return s;default:return""}}function No(s){var t=s.type;return(s=s.nodeName)&&s.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Iv(s,t,e){var a=Object.getOwnPropertyDescriptor(s.constructor.prototype,t);if(!s.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var n=a.get,l=a.set;return Object.defineProperty(s,t,{configurable:!0,get:function(){return n.call(this)},set:function(i){e=""+i,l.call(this,i)}}),Object.defineProperty(s,t,{enumerable:a.enumerable}),{getValue:function(){return e},setValue:function(i){e=""+i},stopTracking:function(){s._valueTracker=null,delete s[t]}}}}function si(s){if(!s._valueTracker){var t=No(s)?"checked":"value";s._valueTracker=Iv(s,t,""+s[t])}}function Oo(s){if(!s)return!1;var t=s._valueTracker;if(!t)return!0;var e=t.getValue(),a="";return s&&(a=No(s)?s.checked?"true":"false":s.value),s=a,s!==e?(t.setValue(s),!0):!1}function En(s){if(s=s||(typeof document<"u"?document:void 0),typeof s>"u")return null;try{return s.activeElement||s.body}catch{return s.body}}var Wv=/[\n"\\]/g;function ct(s){return s.replace(Wv,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function ti(s,t,e,a,n,l,i,d){s.name="",i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"?s.type=i:s.removeAttribute("type"),t!=null?i==="number"?(t===0&&s.value===""||s.value!=t)&&(s.value=""+ot(t)):s.value!==""+ot(t)&&(s.value=""+ot(t)):i!=="submit"&&i!=="reset"||s.removeAttribute("value"),t!=null?ei(s,i,ot(t)):e!=null?ei(s,i,ot(e)):a!=null&&s.removeAttribute("value"),n==null&&l!=null&&(s.defaultChecked=!!l),n!=null&&(s.checked=n&&typeof n!="function"&&typeof n!="symbol"),d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"?s.name=""+ot(d):s.removeAttribute("name")}function Ho(s,t,e,a,n,l,i,d){if(l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"&&(s.type=l),t!=null||e!=null){if(!(l!=="submit"&&l!=="reset"||t!=null)){si(s);return}e=e!=null?""+ot(e):"",t=t!=null?""+ot(t):e,d||t===s.value||(s.value=t),s.defaultValue=t}a=a??n,a=typeof a!="function"&&typeof a!="symbol"&&!!a,s.checked=d?s.checked:!!a,s.defaultChecked=!!a,i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(s.name=i),si(s)}function ei(s,t,e){t==="number"&&En(s.ownerDocument)===s||s.defaultValue===""+e||(s.defaultValue=""+e)}function Ke(s,t,e,a){if(s=s.options,t){t={};for(var n=0;n<e.length;n++)t["$"+e[n]]=!0;for(e=0;e<s.length;e++)n=t.hasOwnProperty("$"+s[e].value),s[e].selected!==n&&(s[e].selected=n),n&&a&&(s[e].defaultSelected=!0)}else{for(e=""+ot(e),t=null,n=0;n<s.length;n++){if(s[n].value===e){s[n].selected=!0,a&&(s[n].defaultSelected=!0);return}t!==null||s[n].disabled||(t=s[n])}t!==null&&(t.selected=!0)}}function Vo(s,t,e){if(t!=null&&(t=""+ot(t),t!==s.value&&(s.value=t),e==null)){s.defaultValue!==t&&(s.defaultValue=t);return}s.defaultValue=e!=null?""+ot(e):""}function jo(s,t,e,a){if(t==null){if(a!=null){if(e!=null)throw Error(_(92));if(bt(a)){if(1<a.length)throw Error(_(93));a=a[0]}e=a}e==null&&(e=""),t=e}e=ot(t),s.defaultValue=e,a=s.textContent,a===e&&a!==""&&a!==null&&(s.value=a),si(s)}function Fe(s,t){if(t){var e=s.firstChild;if(e&&e===s.lastChild&&e.nodeType===3){e.nodeValue=t;return}}s.textContent=t}var Pv=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ro(s,t,e){var a=t.indexOf("--")===0;e==null||typeof e=="boolean"||e===""?a?s.setProperty(t,""):t==="float"?s.cssFloat="":s[t]="":a?s.setProperty(t,e):typeof e!="number"||e===0||Pv.has(t)?t==="float"?s.cssFloat=e:s[t]=(""+e).trim():s[t]=e+"px"}function Uo(s,t,e){if(t!=null&&typeof t!="object")throw Error(_(62));if(s=s.style,e!=null){for(var a in e)!e.hasOwnProperty(a)||t!=null&&t.hasOwnProperty(a)||(a.indexOf("--")===0?s.setProperty(a,""):a==="float"?s.cssFloat="":s[a]="");for(var n in t)a=t[n],t.hasOwnProperty(n)&&e[n]!==a&&Ro(s,n,a)}else for(var l in t)t.hasOwnProperty(l)&&Ro(s,l,t[l])}function ai(s){if(s.indexOf("-")===-1)return!1;switch(s){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var $v=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),sp=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function An(s){return sp.test(""+s)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":s}function At(){}var ni=null;function li(s){return s=s.target||s.srcElement||window,s.correspondingUseElement&&(s=s.correspondingUseElement),s.nodeType===3?s.parentNode:s}var Je=null,Ie=null;function qo(s){var t=Ge(s);if(t&&(s=t.stateNode)){var e=s[Ys]||null;s:switch(s=t.stateNode,t.type){case"input":if(ti(s,e.value,e.defaultValue,e.defaultValue,e.checked,e.defaultChecked,e.type,e.name),t=e.name,e.type==="radio"&&t!=null){for(e=s;e.parentNode;)e=e.parentNode;for(e=e.querySelectorAll('input[name="'+ct(""+t)+'"][type="radio"]'),t=0;t<e.length;t++){var a=e[t];if(a!==s&&a.form===s.form){var n=a[Ys]||null;if(!n)throw Error(_(90));ti(a,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name)}}for(t=0;t<e.length;t++)a=e[t],a.form===s.form&&Oo(a)}break s;case"textarea":Vo(s,e.value,e.defaultValue);break s;case"select":t=e.value,t!=null&&Ke(s,!!e.multiple,t,!1)}}}var ii=!1;function Zo(s,t,e){if(ii)return s(t,e);ii=!0;try{var a=s(t);return a}finally{if(ii=!1,(Je!==null||Ie!==null)&&(ml(),Je&&(t=Je,s=Ie,Ie=Je=null,qo(t),s)))for(t=0;t<s.length;t++)qo(s[t])}}function Aa(s,t){var e=s.stateNode;if(e===null)return null;var a=e[Ys]||null;if(a===null)return null;e=a[t];s:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(s=s.type,a=!(s==="button"||s==="input"||s==="select"||s==="textarea")),s=!a;break s;default:s=!1}if(s)return null;if(e&&typeof e!="function")throw Error(_(231,t,typeof e));return e}var zt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),di=!1;if(zt)try{var za={};Object.defineProperty(za,"passive",{get:function(){di=!0}}),window.addEventListener("test",za,za),window.removeEventListener("test",za,za)}catch{di=!1}var Pt=null,oi=null,zn=null;function Yo(){if(zn)return zn;var s,t=oi,e=t.length,a,n="value"in Pt?Pt.value:Pt.textContent,l=n.length;for(s=0;s<e&&t[s]===n[s];s++);var i=e-s;for(a=1;a<=i&&t[e-a]===n[l-a];a++);return zn=n.slice(s,1<a?1-a:void 0)}function Nn(s){var t=s.keyCode;return"charCode"in s?(s=s.charCode,s===0&&t===13&&(s=13)):s=t,s===10&&(s=13),32<=s||s===13?s:0}function On(){return!0}function Go(){return!1}function Gs(s){function t(e,a,n,l,i){this._reactName=e,this._targetInst=n,this.type=a,this.nativeEvent=l,this.target=i,this.currentTarget=null;for(var d in s)s.hasOwnProperty(d)&&(e=s[d],this[d]=e?e(l):l[d]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?On:Go,this.isPropagationStopped=Go,this}return O(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!="unknown"&&(e.returnValue=!1),this.isDefaultPrevented=On)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!="unknown"&&(e.cancelBubble=!0),this.isPropagationStopped=On)},persist:function(){},isPersistent:On}),t}var Se={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(s){return s.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Hn=Gs(Se),Na=O({},Se,{view:0,detail:0}),tp=Gs(Na),ci,ri,Oa,Vn=O({},Na,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:vi,button:0,buttons:0,relatedTarget:function(s){return s.relatedTarget===void 0?s.fromElement===s.srcElement?s.toElement:s.fromElement:s.relatedTarget},movementX:function(s){return"movementX"in s?s.movementX:(s!==Oa&&(Oa&&s.type==="mousemove"?(ci=s.screenX-Oa.screenX,ri=s.screenY-Oa.screenY):ri=ci=0,Oa=s),ci)},movementY:function(s){return"movementY"in s?s.movementY:ri}}),Xo=Gs(Vn),ep=O({},Vn,{dataTransfer:0}),ap=Gs(ep),np=O({},Na,{relatedTarget:0}),ui=Gs(np),lp=O({},Se,{animationName:0,elapsedTime:0,pseudoElement:0}),ip=Gs(lp),dp=O({},Se,{clipboardData:function(s){return"clipboardData"in s?s.clipboardData:window.clipboardData}}),op=Gs(dp),cp=O({},Se,{data:0}),Qo=Gs(cp),rp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},up={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},vp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function pp(s){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(s):(s=vp[s])?!!t[s]:!1}function vi(){return pp}var _p=O({},Na,{key:function(s){if(s.key){var t=rp[s.key]||s.key;if(t!=="Unidentified")return t}return s.type==="keypress"?(s=Nn(s),s===13?"Enter":String.fromCharCode(s)):s.type==="keydown"||s.type==="keyup"?up[s.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:vi,charCode:function(s){return s.type==="keypress"?Nn(s):0},keyCode:function(s){return s.type==="keydown"||s.type==="keyup"?s.keyCode:0},which:function(s){return s.type==="keypress"?Nn(s):s.type==="keydown"||s.type==="keyup"?s.keyCode:0}}),fp=Gs(_p),hp=O({},Vn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ko=Gs(hp),gp=O({},Na,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:vi}),bp=Gs(gp),mp=O({},Se,{propertyName:0,elapsedTime:0,pseudoElement:0}),wp=Gs(mp),kp=O({},Vn,{deltaX:function(s){return"deltaX"in s?s.deltaX:"wheelDeltaX"in s?-s.wheelDeltaX:0},deltaY:function(s){return"deltaY"in s?s.deltaY:"wheelDeltaY"in s?-s.wheelDeltaY:"wheelDelta"in s?-s.wheelDelta:0},deltaZ:0,deltaMode:0}),yp=Gs(kp),xp=O({},Se,{newState:0,oldState:0}),Cp=Gs(xp),Sp=[9,13,27,32],pi=zt&&"CompositionEvent"in window,Ha=null;zt&&"documentMode"in document&&(Ha=document.documentMode);var Mp=zt&&"TextEvent"in window&&!Ha,Fo=zt&&(!pi||Ha&&8<Ha&&11>=Ha),Jo=" ",Io=!1;function Wo(s,t){switch(s){case"keyup":return Sp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Po(s){return s=s.detail,typeof s=="object"&&"data"in s?s.data:null}var We=!1;function Dp(s,t){switch(s){case"compositionend":return Po(t);case"keypress":return t.which!==32?null:(Io=!0,Jo);case"textInput":return s=t.data,s===Jo&&Io?null:s;default:return null}}function Lp(s,t){if(We)return s==="compositionend"||!pi&&Wo(s,t)?(s=Yo(),zn=oi=Pt=null,We=!1,s):null;switch(s){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Fo&&t.locale!=="ko"?null:t.data;default:return null}}var Bp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function $o(s){var t=s&&s.nodeName&&s.nodeName.toLowerCase();return t==="input"?!!Bp[s.type]:t==="textarea"}function sc(s,t,e,a){Je?Ie?Ie.push(a):Ie=[a]:Je=a,t=Ml(t,"onChange"),0<t.length&&(e=new Hn("onChange","change",null,e,a),s.push({event:e,listeners:t}))}var Va=null,ja=null;function Tp(s){Hu(s,0)}function jn(s){var t=Ea(s);if(Oo(t))return s}function tc(s,t){if(s==="change")return t}var ec=!1;if(zt){var _i;if(zt){var fi="oninput"in document;if(!fi){var ac=document.createElement("div");ac.setAttribute("oninput","return;"),fi=typeof ac.oninput=="function"}_i=fi}else _i=!1;ec=_i&&(!document.documentMode||9<document.documentMode)}function nc(){Va&&(Va.detachEvent("onpropertychange",lc),ja=Va=null)}function lc(s){if(s.propertyName==="value"&&jn(ja)){var t=[];sc(t,ja,s,li(s)),Zo(Tp,t)}}function Ep(s,t,e){s==="focusin"?(nc(),Va=t,ja=e,Va.attachEvent("onpropertychange",lc)):s==="focusout"&&nc()}function Ap(s){if(s==="selectionchange"||s==="keyup"||s==="keydown")return jn(ja)}function zp(s,t){if(s==="click")return jn(t)}function Np(s,t){if(s==="input"||s==="change")return jn(t)}function Op(s,t){return s===t&&(s!==0||1/s===1/t)||s!==s&&t!==t}var st=typeof Object.is=="function"?Object.is:Op;function Ra(s,t){if(st(s,t))return!0;if(typeof s!="object"||s===null||typeof t!="object"||t===null)return!1;var e=Object.keys(s),a=Object.keys(t);if(e.length!==a.length)return!1;for(a=0;a<e.length;a++){var n=e[a];if(!Ql.call(t,n)||!st(s[n],t[n]))return!1}return!0}function ic(s){for(;s&&s.firstChild;)s=s.firstChild;return s}function dc(s,t){var e=ic(s);s=0;for(var a;e;){if(e.nodeType===3){if(a=s+e.textContent.length,s<=t&&a>=t)return{node:e,offset:t-s};s=a}s:{for(;e;){if(e.nextSibling){e=e.nextSibling;break s}e=e.parentNode}e=void 0}e=ic(e)}}function oc(s,t){return s&&t?s===t?!0:s&&s.nodeType===3?!1:t&&t.nodeType===3?oc(s,t.parentNode):"contains"in s?s.contains(t):s.compareDocumentPosition?!!(s.compareDocumentPosition(t)&16):!1:!1}function cc(s){s=s!=null&&s.ownerDocument!=null&&s.ownerDocument.defaultView!=null?s.ownerDocument.defaultView:window;for(var t=En(s.document);t instanceof s.HTMLIFrameElement;){try{var e=typeof t.contentWindow.location.href=="string"}catch{e=!1}if(e)s=t.contentWindow;else break;t=En(s.document)}return t}function hi(s){var t=s&&s.nodeName&&s.nodeName.toLowerCase();return t&&(t==="input"&&(s.type==="text"||s.type==="search"||s.type==="tel"||s.type==="url"||s.type==="password")||t==="textarea"||s.contentEditable==="true")}var Hp=zt&&"documentMode"in document&&11>=document.documentMode,Pe=null,gi=null,Ua=null,bi=!1;function rc(s,t,e){var a=e.window===e?e.document:e.nodeType===9?e:e.ownerDocument;bi||Pe==null||Pe!==En(a)||(a=Pe,"selectionStart"in a&&hi(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Ua&&Ra(Ua,a)||(Ua=a,a=Ml(gi,"onSelect"),0<a.length&&(t=new Hn("onSelect","select",null,t,e),s.push({event:t,listeners:a}),t.target=Pe)))}function Me(s,t){var e={};return e[s.toLowerCase()]=t.toLowerCase(),e["Webkit"+s]="webkit"+t,e["Moz"+s]="moz"+t,e}var $e={animationend:Me("Animation","AnimationEnd"),animationiteration:Me("Animation","AnimationIteration"),animationstart:Me("Animation","AnimationStart"),transitionrun:Me("Transition","TransitionRun"),transitionstart:Me("Transition","TransitionStart"),transitioncancel:Me("Transition","TransitionCancel"),transitionend:Me("Transition","TransitionEnd")},mi={},uc={};zt&&(uc=document.createElement("div").style,"AnimationEvent"in window||(delete $e.animationend.animation,delete $e.animationiteration.animation,delete $e.animationstart.animation),"TransitionEvent"in window||delete $e.transitionend.transition);function De(s){if(mi[s])return mi[s];if(!$e[s])return s;var t=$e[s],e;for(e in t)if(t.hasOwnProperty(e)&&e in uc)return mi[s]=t[e];return s}var vc=De("animationend"),pc=De("animationiteration"),_c=De("animationstart"),Vp=De("transitionrun"),jp=De("transitionstart"),Rp=De("transitioncancel"),fc=De("transitionend"),hc=new Map,wi="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");wi.push("scrollEnd");function mt(s,t){hc.set(s,t),Ce(t,[s])}var Rn=typeof reportError=="function"?reportError:function(s){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof s=="object"&&s!==null&&typeof s.message=="string"?String(s.message):String(s),error:s});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",s);return}console.error(s)},rt=[],sa=0,ki=0;function Un(){for(var s=sa,t=ki=sa=0;t<s;){var e=rt[t];rt[t++]=null;var a=rt[t];rt[t++]=null;var n=rt[t];rt[t++]=null;var l=rt[t];if(rt[t++]=null,a!==null&&n!==null){var i=a.pending;i===null?n.next=n:(n.next=i.next,i.next=n),a.pending=n}l!==0&&gc(e,n,l)}}function qn(s,t,e,a){rt[sa++]=s,rt[sa++]=t,rt[sa++]=e,rt[sa++]=a,ki|=a,s.lanes|=a,s=s.alternate,s!==null&&(s.lanes|=a)}function yi(s,t,e,a){return qn(s,t,e,a),Zn(s)}function Le(s,t){return qn(s,null,null,t),Zn(s)}function gc(s,t,e){s.lanes|=e;var a=s.alternate;a!==null&&(a.lanes|=e);for(var n=!1,l=s.return;l!==null;)l.childLanes|=e,a=l.alternate,a!==null&&(a.childLanes|=e),l.tag===22&&(s=l.stateNode,s===null||s._visibility&1||(n=!0)),s=l,l=l.return;return s.tag===3?(l=s.stateNode,n&&t!==null&&(n=31-$s(e),s=l.hiddenUpdates,a=s[n],a===null?s[n]=[t]:a.push(t),t.lane=e|536870912),l):null}function Zn(s){if(50<cn)throw cn=0,Ed=null,Error(_(185));for(var t=s.return;t!==null;)s=t,t=s.return;return s.tag===3?s.stateNode:null}var ta={};function Up(s,t,e,a){this.tag=s,this.key=e,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function tt(s,t,e,a){return new Up(s,t,e,a)}function xi(s){return s=s.prototype,!(!s||!s.isReactComponent)}function Nt(s,t){var e=s.alternate;return e===null?(e=tt(s.tag,t,s.key,s.mode),e.elementType=s.elementType,e.type=s.type,e.stateNode=s.stateNode,e.alternate=s,s.alternate=e):(e.pendingProps=t,e.type=s.type,e.flags=0,e.subtreeFlags=0,e.deletions=null),e.flags=s.flags&65011712,e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,t=s.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},e.sibling=s.sibling,e.index=s.index,e.ref=s.ref,e.refCleanup=s.refCleanup,e}function bc(s,t){s.flags&=65011714;var e=s.alternate;return e===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,s.type=e.type,t=e.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),s}function Yn(s,t,e,a,n,l){var i=0;if(a=s,typeof s=="function")xi(s)&&(i=1);else if(typeof s=="string")i=X_(s,e,A.current)?26:s==="html"||s==="head"||s==="body"?27:5;else s:switch(s){case xt:return s=tt(31,e,t,n),s.elementType=xt,s.lanes=l,s;case Os:return Be(e.children,n,l,t);case Bt:i=8,n|=24;break;case Is:return s=tt(12,e,t,n|2),s.elementType=Is,s.lanes=l,s;case yt:return s=tt(13,e,t,n),s.elementType=yt,s.lanes=l,s;case Us:return s=tt(19,e,t,n),s.elementType=Us,s.lanes=l,s;default:if(typeof s=="object"&&s!==null)switch(s.$$typeof){case zs:i=10;break s;case Jt:i=9;break s;case dt:i=11;break s;case W:i=14;break s;case qs:i=16,a=null;break s}i=29,e=Error(_(130,s===null?"null":typeof s,"")),a=null}return t=tt(i,e,t,n),t.elementType=s,t.type=a,t.lanes=l,t}function Be(s,t,e,a){return s=tt(7,s,a,t),s.lanes=e,s}function Ci(s,t,e){return s=tt(6,s,null,t),s.lanes=e,s}function mc(s){var t=tt(18,null,null,0);return t.stateNode=s,t}function Si(s,t,e){return t=tt(4,s.children!==null?s.children:[],s.key,t),t.lanes=e,t.stateNode={containerInfo:s.containerInfo,pendingChildren:null,implementation:s.implementation},t}var wc=new WeakMap;function ut(s,t){if(typeof s=="object"&&s!==null){var e=wc.get(s);return e!==void 0?e:(t={value:s,source:t,stack:mo(t)},wc.set(s,t),t)}return{value:s,source:t,stack:mo(t)}}var ea=[],aa=0,Gn=null,qa=0,vt=[],pt=0,$t=null,St=1,Mt="";function Ot(s,t){ea[aa++]=qa,ea[aa++]=Gn,Gn=s,qa=t}function kc(s,t,e){vt[pt++]=St,vt[pt++]=Mt,vt[pt++]=$t,$t=s;var a=St;s=Mt;var n=32-$s(a)-1;a&=~(1<<n),e+=1;var l=32-$s(t)+n;if(30<l){var i=n-n%5;l=(a&(1<<i)-1).toString(32),a>>=i,n-=i,St=1<<32-$s(t)+n|e<<n|a,Mt=l+s}else St=1<<l|e<<n|a,Mt=s}function Mi(s){s.return!==null&&(Ot(s,1),kc(s,1,0))}function Di(s){for(;s===Gn;)Gn=ea[--aa],ea[aa]=null,qa=ea[--aa],ea[aa]=null;for(;s===$t;)$t=vt[--pt],vt[pt]=null,Mt=vt[--pt],vt[pt]=null,St=vt[--pt],vt[pt]=null}function yc(s,t){vt[pt++]=St,vt[pt++]=Mt,vt[pt++]=$t,St=t.id,Mt=t.overflow,$t=s}var Ls=null,vs=null,P=!1,se=null,_t=!1,Li=Error(_(519));function te(s){var t=Error(_(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Za(ut(t,s)),Li}function xc(s){var t=s.stateNode,e=s.type,a=s.memoizedProps;switch(t[Ds]=s,t[Ys]=a,e){case"dialog":F("cancel",t),F("close",t);break;case"iframe":case"object":case"embed":F("load",t);break;case"video":case"audio":for(e=0;e<un.length;e++)F(un[e],t);break;case"source":F("error",t);break;case"img":case"image":case"link":F("error",t),F("load",t);break;case"details":F("toggle",t);break;case"input":F("invalid",t),Ho(t,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":F("invalid",t);break;case"textarea":F("invalid",t),jo(t,a.value,a.defaultValue,a.children)}e=a.children,typeof e!="string"&&typeof e!="number"&&typeof e!="bigint"||t.textContent===""+e||a.suppressHydrationWarning===!0||Uu(t.textContent,e)?(a.popover!=null&&(F("beforetoggle",t),F("toggle",t)),a.onScroll!=null&&F("scroll",t),a.onScrollEnd!=null&&F("scrollend",t),a.onClick!=null&&(t.onclick=At),t=!0):t=!1,t||te(s,!0)}function Cc(s){for(Ls=s.return;Ls;)switch(Ls.tag){case 5:case 31:case 13:_t=!1;return;case 27:case 3:_t=!0;return;default:Ls=Ls.return}}function na(s){if(s!==Ls)return!1;if(!P)return Cc(s),P=!0,!1;var t=s.tag,e;if((e=t!==3&&t!==27)&&((e=t===5)&&(e=s.type,e=!(e!=="form"&&e!=="button")||Qd(s.type,s.memoizedProps)),e=!e),e&&vs&&te(s),Cc(s),t===13){if(s=s.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(_(317));vs=Ju(s)}else if(t===31){if(s=s.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(_(317));vs=Ju(s)}else t===27?(t=vs,fe(s.type)?(s=Wd,Wd=null,vs=s):vs=t):vs=Ls?ht(s.stateNode.nextSibling):null;return!0}function Te(){vs=Ls=null,P=!1}function Bi(){var s=se;return s!==null&&(Fs===null?Fs=s:Fs.push.apply(Fs,s),se=null),s}function Za(s){se===null?se=[s]:se.push(s)}var Ti=u(null),Ee=null,Ht=null;function ee(s,t,e){B(Ti,t._currentValue),t._currentValue=e}function Vt(s){s._currentValue=Ti.current,x(Ti)}function Ei(s,t,e){for(;s!==null;){var a=s.alternate;if((s.childLanes&t)!==t?(s.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),s===e)break;s=s.return}}function Ai(s,t,e,a){var n=s.child;for(n!==null&&(n.return=s);n!==null;){var l=n.dependencies;if(l!==null){var i=n.child;l=l.firstContext;s:for(;l!==null;){var d=l;l=n;for(var o=0;o<t.length;o++)if(d.context===t[o]){l.lanes|=e,d=l.alternate,d!==null&&(d.lanes|=e),Ei(l.return,e,s),a||(i=null);break s}l=d.next}}else if(n.tag===18){if(i=n.return,i===null)throw Error(_(341));i.lanes|=e,l=i.alternate,l!==null&&(l.lanes|=e),Ei(i,e,s),i=null}else i=n.child;if(i!==null)i.return=n;else for(i=n;i!==null;){if(i===s){i=null;break}if(n=i.sibling,n!==null){n.return=i.return,i=n;break}i=i.return}n=i}}function la(s,t,e,a){s=null;for(var n=t,l=!1;n!==null;){if(!l){if((n.flags&524288)!==0)l=!0;else if((n.flags&262144)!==0)break}if(n.tag===10){var i=n.alternate;if(i===null)throw Error(_(387));if(i=i.memoizedProps,i!==null){var d=n.type;st(n.pendingProps.value,i.value)||(s!==null?s.push(d):s=[d])}}else if(n===as.current){if(i=n.alternate,i===null)throw Error(_(387));i.memoizedState.memoizedState!==n.memoizedState.memoizedState&&(s!==null?s.push(hn):s=[hn])}n=n.return}s!==null&&Ai(t,s,e,a),t.flags|=262144}function Xn(s){for(s=s.firstContext;s!==null;){if(!st(s.context._currentValue,s.memoizedValue))return!0;s=s.next}return!1}function Ae(s){Ee=s,Ht=null,s=s.dependencies,s!==null&&(s.firstContext=null)}function Bs(s){return Sc(Ee,s)}function Qn(s,t){return Ee===null&&Ae(s),Sc(s,t)}function Sc(s,t){var e=t._currentValue;if(t={context:t,memoizedValue:e,next:null},Ht===null){if(s===null)throw Error(_(308));Ht=t,s.dependencies={lanes:0,firstContext:t},s.flags|=524288}else Ht=Ht.next=t;return e}var qp=typeof AbortController<"u"?AbortController:function(){var s=[],t=this.signal={aborted:!1,addEventListener:function(e,a){s.push(a)}};this.abort=function(){t.aborted=!0,s.forEach(function(e){return e()})}},Zp=v.unstable_scheduleCallback,Yp=v.unstable_NormalPriority,ws={$$typeof:zs,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function zi(){return{controller:new qp,data:new Map,refCount:0}}function Ya(s){s.refCount--,s.refCount===0&&Zp(Yp,function(){s.controller.abort()})}var Ga=null,Ni=0,ia=0,da=null;function Gp(s,t){if(Ga===null){var e=Ga=[];Ni=0,ia=Vd(),da={status:"pending",value:void 0,then:function(a){e.push(a)}}}return Ni++,t.then(Mc,Mc),t}function Mc(){if(--Ni===0&&Ga!==null){da!==null&&(da.status="fulfilled");var s=Ga;Ga=null,ia=0,da=null;for(var t=0;t<s.length;t++)(0,s[t])()}}function Xp(s,t){var e=[],a={status:"pending",value:null,reason:null,then:function(n){e.push(n)}};return s.then(function(){a.status="fulfilled",a.value=t;for(var n=0;n<e.length;n++)(0,e[n])(t)},function(n){for(a.status="rejected",a.reason=n,n=0;n<e.length;n++)(0,e[n])(void 0)}),a}var Dc=w.S;w.S=function(s,t){ru=Ws(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&Gp(s,t),Dc!==null&&Dc(s,t)};var ze=u(null);function Oi(){var s=ze.current;return s!==null?s:us.pooledCache}function Kn(s,t){t===null?B(ze,ze.current):B(ze,t.pool)}function Lc(){var s=Oi();return s===null?null:{parent:ws._currentValue,pool:s}}var oa=Error(_(460)),Hi=Error(_(474)),Fn=Error(_(542)),Jn={then:function(){}};function Bc(s){return s=s.status,s==="fulfilled"||s==="rejected"}function Tc(s,t,e){switch(e=s[e],e===void 0?s.push(t):e!==t&&(t.then(At,At),t=e),t.status){case"fulfilled":return t.value;case"rejected":throw s=t.reason,Ac(s),s;default:if(typeof t.status=="string")t.then(At,At);else{if(s=us,s!==null&&100<s.shellSuspendCounter)throw Error(_(482));s=t,s.status="pending",s.then(function(a){if(t.status==="pending"){var n=t;n.status="fulfilled",n.value=a}},function(a){if(t.status==="pending"){var n=t;n.status="rejected",n.reason=a}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw s=t.reason,Ac(s),s}throw Oe=t,oa}}function Ne(s){try{var t=s._init;return t(s._payload)}catch(e){throw e!==null&&typeof e=="object"&&typeof e.then=="function"?(Oe=e,oa):e}}var Oe=null;function Ec(){if(Oe===null)throw Error(_(459));var s=Oe;return Oe=null,s}function Ac(s){if(s===oa||s===Fn)throw Error(_(483))}var ca=null,Xa=0;function In(s){var t=Xa;return Xa+=1,ca===null&&(ca=[]),Tc(ca,s,t)}function Qa(s,t){t=t.props.ref,s.ref=t!==void 0?t:null}function Wn(s,t){throw t.$$typeof===$?Error(_(525)):(s=Object.prototype.toString.call(t),Error(_(31,s==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":s)))}function zc(s){function t(p,r){if(s){var f=p.deletions;f===null?(p.deletions=[r],p.flags|=16):f.push(r)}}function e(p,r){if(!s)return null;for(;r!==null;)t(p,r),r=r.sibling;return null}function a(p){for(var r=new Map;p!==null;)p.key!==null?r.set(p.key,p):r.set(p.index,p),p=p.sibling;return r}function n(p,r){return p=Nt(p,r),p.index=0,p.sibling=null,p}function l(p,r,f){return p.index=f,s?(f=p.alternate,f!==null?(f=f.index,f<r?(p.flags|=67108866,r):f):(p.flags|=67108866,r)):(p.flags|=1048576,r)}function i(p){return s&&p.alternate===null&&(p.flags|=67108866),p}function d(p,r,f,k){return r===null||r.tag!==6?(r=Ci(f,p.mode,k),r.return=p,r):(r=n(r,f),r.return=p,r)}function o(p,r,f,k){var H=f.type;return H===Os?m(p,r,f.props.children,k,f.key):r!==null&&(r.elementType===H||typeof H=="object"&&H!==null&&H.$$typeof===qs&&Ne(H)===r.type)?(r=n(r,f.props),Qa(r,f),r.return=p,r):(r=Yn(f.type,f.key,f.props,null,p.mode,k),Qa(r,f),r.return=p,r)}function h(p,r,f,k){return r===null||r.tag!==4||r.stateNode.containerInfo!==f.containerInfo||r.stateNode.implementation!==f.implementation?(r=Si(f,p.mode,k),r.return=p,r):(r=n(r,f.children||[]),r.return=p,r)}function m(p,r,f,k,H){return r===null||r.tag!==7?(r=Be(f,p.mode,k,H),r.return=p,r):(r=n(r,f),r.return=p,r)}function y(p,r,f){if(typeof r=="string"&&r!==""||typeof r=="number"||typeof r=="bigint")return r=Ci(""+r,p.mode,f),r.return=p,r;if(typeof r=="object"&&r!==null){switch(r.$$typeof){case As:return f=Yn(r.type,r.key,r.props,null,p.mode,f),Qa(f,r),f.return=p,f;case Rs:return r=Si(r,p.mode,f),r.return=p,r;case qs:return r=Ne(r),y(p,r,f)}if(bt(r)||Zs(r))return r=Be(r,p.mode,f,null),r.return=p,r;if(typeof r.then=="function")return y(p,In(r),f);if(r.$$typeof===zs)return y(p,Qn(p,r),f);Wn(p,r)}return null}function g(p,r,f,k){var H=r!==null?r.key:null;if(typeof f=="string"&&f!==""||typeof f=="number"||typeof f=="bigint")return H!==null?null:d(p,r,""+f,k);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case As:return f.key===H?o(p,r,f,k):null;case Rs:return f.key===H?h(p,r,f,k):null;case qs:return f=Ne(f),g(p,r,f,k)}if(bt(f)||Zs(f))return H!==null?null:m(p,r,f,k,null);if(typeof f.then=="function")return g(p,r,In(f),k);if(f.$$typeof===zs)return g(p,r,Qn(p,f),k);Wn(p,f)}return null}function b(p,r,f,k,H){if(typeof k=="string"&&k!==""||typeof k=="number"||typeof k=="bigint")return p=p.get(f)||null,d(r,p,""+k,H);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case As:return p=p.get(k.key===null?f:k.key)||null,o(r,p,k,H);case Rs:return p=p.get(k.key===null?f:k.key)||null,h(r,p,k,H);case qs:return k=Ne(k),b(p,r,f,k,H)}if(bt(k)||Zs(k))return p=p.get(f)||null,m(r,p,k,H,null);if(typeof k.then=="function")return b(p,r,f,In(k),H);if(k.$$typeof===zs)return b(p,r,f,Qn(r,k),H);Wn(r,k)}return null}function E(p,r,f,k){for(var H=null,ss=null,z=r,X=r=0,I=null;z!==null&&X<f.length;X++){z.index>X?(I=z,z=null):I=z.sibling;var ts=g(p,z,f[X],k);if(ts===null){z===null&&(z=I);break}s&&z&&ts.alternate===null&&t(p,z),r=l(ts,r,X),ss===null?H=ts:ss.sibling=ts,ss=ts,z=I}if(X===f.length)return e(p,z),P&&Ot(p,X),H;if(z===null){for(;X<f.length;X++)z=y(p,f[X],k),z!==null&&(r=l(z,r,X),ss===null?H=z:ss.sibling=z,ss=z);return P&&Ot(p,X),H}for(z=a(z);X<f.length;X++)I=b(z,p,X,f[X],k),I!==null&&(s&&I.alternate!==null&&z.delete(I.key===null?X:I.key),r=l(I,r,X),ss===null?H=I:ss.sibling=I,ss=I);return s&&z.forEach(function(we){return t(p,we)}),P&&Ot(p,X),H}function U(p,r,f,k){if(f==null)throw Error(_(151));for(var H=null,ss=null,z=r,X=r=0,I=null,ts=f.next();z!==null&&!ts.done;X++,ts=f.next()){z.index>X?(I=z,z=null):I=z.sibling;var we=g(p,z,ts.value,k);if(we===null){z===null&&(z=I);break}s&&z&&we.alternate===null&&t(p,z),r=l(we,r,X),ss===null?H=we:ss.sibling=we,ss=we,z=I}if(ts.done)return e(p,z),P&&Ot(p,X),H;if(z===null){for(;!ts.done;X++,ts=f.next())ts=y(p,ts.value,k),ts!==null&&(r=l(ts,r,X),ss===null?H=ts:ss.sibling=ts,ss=ts);return P&&Ot(p,X),H}for(z=a(z);!ts.done;X++,ts=f.next())ts=b(z,p,X,ts.value,k),ts!==null&&(s&&ts.alternate!==null&&z.delete(ts.key===null?X:ts.key),r=l(ts,r,X),ss===null?H=ts:ss.sibling=ts,ss=ts);return s&&z.forEach(function(e1){return t(p,e1)}),P&&Ot(p,X),H}function cs(p,r,f,k){if(typeof f=="object"&&f!==null&&f.type===Os&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case As:s:{for(var H=f.key;r!==null;){if(r.key===H){if(H=f.type,H===Os){if(r.tag===7){e(p,r.sibling),k=n(r,f.props.children),k.return=p,p=k;break s}}else if(r.elementType===H||typeof H=="object"&&H!==null&&H.$$typeof===qs&&Ne(H)===r.type){e(p,r.sibling),k=n(r,f.props),Qa(k,f),k.return=p,p=k;break s}e(p,r);break}else t(p,r);r=r.sibling}f.type===Os?(k=Be(f.props.children,p.mode,k,f.key),k.return=p,p=k):(k=Yn(f.type,f.key,f.props,null,p.mode,k),Qa(k,f),k.return=p,p=k)}return i(p);case Rs:s:{for(H=f.key;r!==null;){if(r.key===H)if(r.tag===4&&r.stateNode.containerInfo===f.containerInfo&&r.stateNode.implementation===f.implementation){e(p,r.sibling),k=n(r,f.children||[]),k.return=p,p=k;break s}else{e(p,r);break}else t(p,r);r=r.sibling}k=Si(f,p.mode,k),k.return=p,p=k}return i(p);case qs:return f=Ne(f),cs(p,r,f,k)}if(bt(f))return E(p,r,f,k);if(Zs(f)){if(H=Zs(f),typeof H!="function")throw Error(_(150));return f=H.call(f),U(p,r,f,k)}if(typeof f.then=="function")return cs(p,r,In(f),k);if(f.$$typeof===zs)return cs(p,r,Qn(p,f),k);Wn(p,f)}return typeof f=="string"&&f!==""||typeof f=="number"||typeof f=="bigint"?(f=""+f,r!==null&&r.tag===6?(e(p,r.sibling),k=n(r,f),k.return=p,p=k):(e(p,r),k=Ci(f,p.mode,k),k.return=p,p=k),i(p)):e(p,r)}return function(p,r,f,k){try{Xa=0;var H=cs(p,r,f,k);return ca=null,H}catch(z){if(z===oa||z===Fn)throw z;var ss=tt(29,z,null,p.mode);return ss.lanes=k,ss.return=p,ss}finally{}}}var He=zc(!0),Nc=zc(!1),ae=!1;function Vi(s){s.updateQueue={baseState:s.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ji(s,t){s=s.updateQueue,t.updateQueue===s&&(t.updateQueue={baseState:s.baseState,firstBaseUpdate:s.firstBaseUpdate,lastBaseUpdate:s.lastBaseUpdate,shared:s.shared,callbacks:null})}function ne(s){return{lane:s,tag:0,payload:null,callback:null,next:null}}function le(s,t,e){var a=s.updateQueue;if(a===null)return null;if(a=a.shared,(es&2)!==0){var n=a.pending;return n===null?t.next=t:(t.next=n.next,n.next=t),a.pending=t,t=Zn(s),gc(s,null,e),t}return qn(s,a,t,e),Zn(s)}function Ka(s,t,e){if(t=t.updateQueue,t!==null&&(t=t.shared,(e&4194048)!==0)){var a=t.lanes;a&=s.pendingLanes,e|=a,t.lanes=e,So(s,e)}}function Ri(s,t){var e=s.updateQueue,a=s.alternate;if(a!==null&&(a=a.updateQueue,e===a)){var n=null,l=null;if(e=e.firstBaseUpdate,e!==null){do{var i={lane:e.lane,tag:e.tag,payload:e.payload,callback:null,next:null};l===null?n=l=i:l=l.next=i,e=e.next}while(e!==null);l===null?n=l=t:l=l.next=t}else n=l=t;e={baseState:a.baseState,firstBaseUpdate:n,lastBaseUpdate:l,shared:a.shared,callbacks:a.callbacks},s.updateQueue=e;return}s=e.lastBaseUpdate,s===null?e.firstBaseUpdate=t:s.next=t,e.lastBaseUpdate=t}var Ui=!1;function Fa(){if(Ui){var s=da;if(s!==null)throw s}}function Ja(s,t,e,a){Ui=!1;var n=s.updateQueue;ae=!1;var l=n.firstBaseUpdate,i=n.lastBaseUpdate,d=n.shared.pending;if(d!==null){n.shared.pending=null;var o=d,h=o.next;o.next=null,i===null?l=h:i.next=h,i=o;var m=s.alternate;m!==null&&(m=m.updateQueue,d=m.lastBaseUpdate,d!==i&&(d===null?m.firstBaseUpdate=h:d.next=h,m.lastBaseUpdate=o))}if(l!==null){var y=n.baseState;i=0,m=h=o=null,d=l;do{var g=d.lane&-536870913,b=g!==d.lane;if(b?(J&g)===g:(a&g)===g){g!==0&&g===ia&&(Ui=!0),m!==null&&(m=m.next={lane:0,tag:d.tag,payload:d.payload,callback:null,next:null});s:{var E=s,U=d;g=t;var cs=e;switch(U.tag){case 1:if(E=U.payload,typeof E=="function"){y=E.call(cs,y,g);break s}y=E;break s;case 3:E.flags=E.flags&-65537|128;case 0:if(E=U.payload,g=typeof E=="function"?E.call(cs,y,g):E,g==null)break s;y=O({},y,g);break s;case 2:ae=!0}}g=d.callback,g!==null&&(s.flags|=64,b&&(s.flags|=8192),b=n.callbacks,b===null?n.callbacks=[g]:b.push(g))}else b={lane:g,tag:d.tag,payload:d.payload,callback:d.callback,next:null},m===null?(h=m=b,o=y):m=m.next=b,i|=g;if(d=d.next,d===null){if(d=n.shared.pending,d===null)break;b=d,d=b.next,b.next=null,n.lastBaseUpdate=b,n.shared.pending=null}}while(!0);m===null&&(o=y),n.baseState=o,n.firstBaseUpdate=h,n.lastBaseUpdate=m,l===null&&(n.shared.lanes=0),re|=i,s.lanes=i,s.memoizedState=y}}function Oc(s,t){if(typeof s!="function")throw Error(_(191,s));s.call(t)}function Hc(s,t){var e=s.callbacks;if(e!==null)for(s.callbacks=null,s=0;s<e.length;s++)Oc(e[s],t)}var ra=u(null),Pn=u(0);function Vc(s,t){s=Qt,B(Pn,s),B(ra,t),Qt=s|t.baseLanes}function qi(){B(Pn,Qt),B(ra,ra.current)}function Zi(){Qt=Pn.current,x(ra),x(Pn)}var et=u(null),ft=null;function ie(s){var t=s.alternate;B(bs,bs.current&1),B(et,s),ft===null&&(t===null||ra.current!==null||t.memoizedState!==null)&&(ft=s)}function Yi(s){B(bs,bs.current),B(et,s),ft===null&&(ft=s)}function jc(s){s.tag===22?(B(bs,bs.current),B(et,s),ft===null&&(ft=s)):de()}function de(){B(bs,bs.current),B(et,et.current)}function at(s){x(et),ft===s&&(ft=null),x(bs)}var bs=u(0);function $n(s){for(var t=s;t!==null;){if(t.tag===13){var e=t.memoizedState;if(e!==null&&(e=e.dehydrated,e===null||Jd(e)||Id(e)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===s)break;for(;t.sibling===null;){if(t.return===null||t.return===s)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var jt=0,G=null,ds=null,ks=null,sl=!1,ua=!1,Ve=!1,tl=0,Ia=0,va=null,Qp=0;function fs(){throw Error(_(321))}function Gi(s,t){if(t===null)return!1;for(var e=0;e<t.length&&e<s.length;e++)if(!st(s[e],t[e]))return!1;return!0}function Xi(s,t,e,a,n,l){return jt=l,G=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,w.H=s===null||s.memoizedState===null?kr:id,Ve=!1,l=e(a,n),Ve=!1,ua&&(l=Uc(t,e,a,n)),Rc(s),l}function Rc(s){w.H=$a;var t=ds!==null&&ds.next!==null;if(jt=0,ks=ds=G=null,sl=!1,Ia=0,va=null,t)throw Error(_(300));s===null||ys||(s=s.dependencies,s!==null&&Xn(s)&&(ys=!0))}function Uc(s,t,e,a){G=s;var n=0;do{if(ua&&(va=null),Ia=0,ua=!1,25<=n)throw Error(_(301));if(n+=1,ks=ds=null,s.updateQueue!=null){var l=s.updateQueue;l.lastEffect=null,l.events=null,l.stores=null,l.memoCache!=null&&(l.memoCache.index=0)}w.H=yr,l=t(e,a)}while(ua);return l}function Kp(){var s=w.H,t=s.useState()[0];return t=typeof t.then=="function"?Wa(t):t,s=s.useState()[0],(ds!==null?ds.memoizedState:null)!==s&&(G.flags|=1024),t}function Qi(){var s=tl!==0;return tl=0,s}function Ki(s,t,e){t.updateQueue=s.updateQueue,t.flags&=-2053,s.lanes&=~e}function Fi(s){if(sl){for(s=s.memoizedState;s!==null;){var t=s.queue;t!==null&&(t.pending=null),s=s.next}sl=!1}jt=0,ks=ds=G=null,ua=!1,Ia=tl=0,va=null}function Vs(){var s={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ks===null?G.memoizedState=ks=s:ks=ks.next=s,ks}function ms(){if(ds===null){var s=G.alternate;s=s!==null?s.memoizedState:null}else s=ds.next;var t=ks===null?G.memoizedState:ks.next;if(t!==null)ks=t,ds=s;else{if(s===null)throw G.alternate===null?Error(_(467)):Error(_(310));ds=s,s={memoizedState:ds.memoizedState,baseState:ds.baseState,baseQueue:ds.baseQueue,queue:ds.queue,next:null},ks===null?G.memoizedState=ks=s:ks=ks.next=s}return ks}function el(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Wa(s){var t=Ia;return Ia+=1,va===null&&(va=[]),s=Tc(va,s,t),t=G,(ks===null?t.memoizedState:ks.next)===null&&(t=t.alternate,w.H=t===null||t.memoizedState===null?kr:id),s}function al(s){if(s!==null&&typeof s=="object"){if(typeof s.then=="function")return Wa(s);if(s.$$typeof===zs)return Bs(s)}throw Error(_(438,String(s)))}function Ji(s){var t=null,e=G.updateQueue;if(e!==null&&(t=e.memoCache),t==null){var a=G.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(t={data:a.data.map(function(n){return n.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),e===null&&(e=el(),G.updateQueue=e),e.memoCache=t,e=t.data[t.index],e===void 0)for(e=t.data[t.index]=Array(s),a=0;a<s;a++)e[a]=qe;return t.index++,e}function Rt(s,t){return typeof t=="function"?t(s):t}function nl(s){var t=ms();return Ii(t,ds,s)}function Ii(s,t,e){var a=s.queue;if(a===null)throw Error(_(311));a.lastRenderedReducer=e;var n=s.baseQueue,l=a.pending;if(l!==null){if(n!==null){var i=n.next;n.next=l.next,l.next=i}t.baseQueue=n=l,a.pending=null}if(l=s.baseState,n===null)s.memoizedState=l;else{t=n.next;var d=i=null,o=null,h=t,m=!1;do{var y=h.lane&-536870913;if(y!==h.lane?(J&y)===y:(jt&y)===y){var g=h.revertLane;if(g===0)o!==null&&(o=o.next={lane:0,revertLane:0,gesture:null,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),y===ia&&(m=!0);else if((jt&g)===g){h=h.next,g===ia&&(m=!0);continue}else y={lane:0,revertLane:h.revertLane,gesture:null,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null},o===null?(d=o=y,i=l):o=o.next=y,G.lanes|=g,re|=g;y=h.action,Ve&&e(l,y),l=h.hasEagerState?h.eagerState:e(l,y)}else g={lane:y,revertLane:h.revertLane,gesture:h.gesture,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null},o===null?(d=o=g,i=l):o=o.next=g,G.lanes|=y,re|=y;h=h.next}while(h!==null&&h!==t);if(o===null?i=l:o.next=d,!st(l,s.memoizedState)&&(ys=!0,m&&(e=da,e!==null)))throw e;s.memoizedState=l,s.baseState=i,s.baseQueue=o,a.lastRenderedState=l}return n===null&&(a.lanes=0),[s.memoizedState,a.dispatch]}function Wi(s){var t=ms(),e=t.queue;if(e===null)throw Error(_(311));e.lastRenderedReducer=s;var a=e.dispatch,n=e.pending,l=t.memoizedState;if(n!==null){e.pending=null;var i=n=n.next;do l=s(l,i.action),i=i.next;while(i!==n);st(l,t.memoizedState)||(ys=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),e.lastRenderedState=l}return[l,a]}function qc(s,t,e){var a=G,n=ms(),l=P;if(l){if(e===void 0)throw Error(_(407));e=e()}else e=t();var i=!st((ds||n).memoizedState,e);if(i&&(n.memoizedState=e,ys=!0),n=n.queue,sd(Gc.bind(null,a,n,s),[s]),n.getSnapshot!==t||i||ks!==null&&ks.memoizedState.tag&1){if(a.flags|=2048,pa(9,{destroy:void 0},Yc.bind(null,a,n,e,t),null),us===null)throw Error(_(349));l||(jt&127)!==0||Zc(a,t,e)}return e}function Zc(s,t,e){s.flags|=16384,s={getSnapshot:t,value:e},t=G.updateQueue,t===null?(t=el(),G.updateQueue=t,t.stores=[s]):(e=t.stores,e===null?t.stores=[s]:e.push(s))}function Yc(s,t,e,a){t.value=e,t.getSnapshot=a,Xc(t)&&Qc(s)}function Gc(s,t,e){return e(function(){Xc(t)&&Qc(s)})}function Xc(s){var t=s.getSnapshot;s=s.value;try{var e=t();return!st(s,e)}catch{return!0}}function Qc(s){var t=Le(s,2);t!==null&&Js(t,s,2)}function Pi(s){var t=Vs();if(typeof s=="function"){var e=s;if(s=e(),Ve){It(!0);try{e()}finally{It(!1)}}}return t.memoizedState=t.baseState=s,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Rt,lastRenderedState:s},t}function Kc(s,t,e,a){return s.baseState=e,Ii(s,ds,typeof a=="function"?a:Rt)}function Fp(s,t,e,a,n){if(dl(s))throw Error(_(485));if(s=t.action,s!==null){var l={payload:n,action:s,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(i){l.listeners.push(i)}};w.T!==null?e(!0):l.isTransition=!1,a(l),e=t.pending,e===null?(l.next=t.pending=l,Fc(t,l)):(l.next=e.next,t.pending=e.next=l)}}function Fc(s,t){var e=t.action,a=t.payload,n=s.state;if(t.isTransition){var l=w.T,i={};w.T=i;try{var d=e(n,a),o=w.S;o!==null&&o(i,d),Jc(s,t,d)}catch(h){$i(s,t,h)}finally{l!==null&&i.types!==null&&(l.types=i.types),w.T=l}}else try{l=e(n,a),Jc(s,t,l)}catch(h){$i(s,t,h)}}function Jc(s,t,e){e!==null&&typeof e=="object"&&typeof e.then=="function"?e.then(function(a){Ic(s,t,a)},function(a){return $i(s,t,a)}):Ic(s,t,e)}function Ic(s,t,e){t.status="fulfilled",t.value=e,Wc(t),s.state=e,t=s.pending,t!==null&&(e=t.next,e===t?s.pending=null:(e=e.next,t.next=e,Fc(s,e)))}function $i(s,t,e){var a=s.pending;if(s.pending=null,a!==null){a=a.next;do t.status="rejected",t.reason=e,Wc(t),t=t.next;while(t!==a)}s.action=null}function Wc(s){s=s.listeners;for(var t=0;t<s.length;t++)(0,s[t])()}function Pc(s,t){return t}function $c(s,t){if(P){var e=us.formState;if(e!==null){s:{var a=G;if(P){if(vs){t:{for(var n=vs,l=_t;n.nodeType!==8;){if(!l){n=null;break t}if(n=ht(n.nextSibling),n===null){n=null;break t}}l=n.data,n=l==="F!"||l==="F"?n:null}if(n){vs=ht(n.nextSibling),a=n.data==="F!";break s}}te(a)}a=!1}a&&(t=e[0])}}return e=Vs(),e.memoizedState=e.baseState=t,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Pc,lastRenderedState:t},e.queue=a,e=br.bind(null,G,a),a.dispatch=e,a=Pi(!1),l=ld.bind(null,G,!1,a.queue),a=Vs(),n={state:t,dispatch:null,action:s,pending:null},a.queue=n,e=Fp.bind(null,G,n,l,e),n.dispatch=e,a.memoizedState=s,[t,e,!1]}function sr(s){var t=ms();return tr(t,ds,s)}function tr(s,t,e){if(t=Ii(s,t,Pc)[0],s=nl(Rt)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var a=Wa(t)}catch(i){throw i===oa?Fn:i}else a=t;t=ms();var n=t.queue,l=n.dispatch;return e!==t.memoizedState&&(G.flags|=2048,pa(9,{destroy:void 0},Jp.bind(null,n,e),null)),[a,l,s]}function Jp(s,t){s.action=t}function er(s){var t=ms(),e=ds;if(e!==null)return tr(t,e,s);ms(),t=t.memoizedState,e=ms();var a=e.queue.dispatch;return e.memoizedState=s,[t,a,!1]}function pa(s,t,e,a){return s={tag:s,create:e,deps:a,inst:t,next:null},t=G.updateQueue,t===null&&(t=el(),G.updateQueue=t),e=t.lastEffect,e===null?t.lastEffect=s.next=s:(a=e.next,e.next=s,s.next=a,t.lastEffect=s),s}function ar(){return ms().memoizedState}function ll(s,t,e,a){var n=Vs();G.flags|=s,n.memoizedState=pa(1|t,{destroy:void 0},e,a===void 0?null:a)}function il(s,t,e,a){var n=ms();a=a===void 0?null:a;var l=n.memoizedState.inst;ds!==null&&a!==null&&Gi(a,ds.memoizedState.deps)?n.memoizedState=pa(t,l,e,a):(G.flags|=s,n.memoizedState=pa(1|t,l,e,a))}function nr(s,t){ll(8390656,8,s,t)}function sd(s,t){il(2048,8,s,t)}function Ip(s){G.flags|=4;var t=G.updateQueue;if(t===null)t=el(),G.updateQueue=t,t.events=[s];else{var e=t.events;e===null?t.events=[s]:e.push(s)}}function lr(s){var t=ms().memoizedState;return Ip({ref:t,nextImpl:s}),function(){if((es&2)!==0)throw Error(_(440));return t.impl.apply(void 0,arguments)}}function ir(s,t){return il(4,2,s,t)}function dr(s,t){return il(4,4,s,t)}function or(s,t){if(typeof t=="function"){s=s();var e=t(s);return function(){typeof e=="function"?e():t(null)}}if(t!=null)return s=s(),t.current=s,function(){t.current=null}}function cr(s,t,e){e=e!=null?e.concat([s]):null,il(4,4,or.bind(null,t,s),e)}function td(){}function rr(s,t){var e=ms();t=t===void 0?null:t;var a=e.memoizedState;return t!==null&&Gi(t,a[1])?a[0]:(e.memoizedState=[s,t],s)}function ur(s,t){var e=ms();t=t===void 0?null:t;var a=e.memoizedState;if(t!==null&&Gi(t,a[1]))return a[0];if(a=s(),Ve){It(!0);try{s()}finally{It(!1)}}return e.memoizedState=[a,t],a}function ed(s,t,e){return e===void 0||(jt&1073741824)!==0&&(J&261930)===0?s.memoizedState=t:(s.memoizedState=e,s=vu(),G.lanes|=s,re|=s,e)}function vr(s,t,e,a){return st(e,t)?e:ra.current!==null?(s=ed(s,e,a),st(s,t)||(ys=!0),s):(jt&42)===0||(jt&1073741824)!==0&&(J&261930)===0?(ys=!0,s.memoizedState=e):(s=vu(),G.lanes|=s,re|=s,t)}function pr(s,t,e,a,n){var l=L.p;L.p=l!==0&&8>l?l:8;var i=w.T,d={};w.T=d,ld(s,!1,t,e);try{var o=n(),h=w.S;if(h!==null&&h(d,o),o!==null&&typeof o=="object"&&typeof o.then=="function"){var m=Xp(o,a);Pa(s,t,m,it(s))}else Pa(s,t,a,it(s))}catch(y){Pa(s,t,{then:function(){},status:"rejected",reason:y},it())}finally{L.p=l,i!==null&&d.types!==null&&(i.types=d.types),w.T=i}}function Wp(){}function ad(s,t,e,a){if(s.tag!==5)throw Error(_(476));var n=_r(s).queue;pr(s,n,t,q,e===null?Wp:function(){return fr(s),e(a)})}function _r(s){var t=s.memoizedState;if(t!==null)return t;t={memoizedState:q,baseState:q,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Rt,lastRenderedState:q},next:null};var e={};return t.next={memoizedState:e,baseState:e,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Rt,lastRenderedState:e},next:null},s.memoizedState=t,s=s.alternate,s!==null&&(s.memoizedState=t),t}function fr(s){var t=_r(s);t.next===null&&(t=s.alternate.memoizedState),Pa(s,t.next.queue,{},it())}function nd(){return Bs(hn)}function hr(){return ms().memoizedState}function gr(){return ms().memoizedState}function Pp(s){for(var t=s.return;t!==null;){switch(t.tag){case 24:case 3:var e=it();s=ne(e);var a=le(t,s,e);a!==null&&(Js(a,t,e),Ka(a,t,e)),t={cache:zi()},s.payload=t;return}t=t.return}}function $p(s,t,e){var a=it();e={lane:a,revertLane:0,gesture:null,action:e,hasEagerState:!1,eagerState:null,next:null},dl(s)?mr(t,e):(e=yi(s,t,e,a),e!==null&&(Js(e,s,a),wr(e,t,a)))}function br(s,t,e){var a=it();Pa(s,t,e,a)}function Pa(s,t,e,a){var n={lane:a,revertLane:0,gesture:null,action:e,hasEagerState:!1,eagerState:null,next:null};if(dl(s))mr(t,n);else{var l=s.alternate;if(s.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var i=t.lastRenderedState,d=l(i,e);if(n.hasEagerState=!0,n.eagerState=d,st(d,i))return qn(s,t,n,0),us===null&&Un(),!1}catch{}finally{}if(e=yi(s,t,n,a),e!==null)return Js(e,s,a),wr(e,t,a),!0}return!1}function ld(s,t,e,a){if(a={lane:2,revertLane:Vd(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},dl(s)){if(t)throw Error(_(479))}else t=yi(s,e,a,2),t!==null&&Js(t,s,2)}function dl(s){var t=s.alternate;return s===G||t!==null&&t===G}function mr(s,t){ua=sl=!0;var e=s.pending;e===null?t.next=t:(t.next=e.next,e.next=t),s.pending=t}function wr(s,t,e){if((e&4194048)!==0){var a=t.lanes;a&=s.pendingLanes,e|=a,t.lanes=e,So(s,e)}}var $a={readContext:Bs,use:al,useCallback:fs,useContext:fs,useEffect:fs,useImperativeHandle:fs,useLayoutEffect:fs,useInsertionEffect:fs,useMemo:fs,useReducer:fs,useRef:fs,useState:fs,useDebugValue:fs,useDeferredValue:fs,useTransition:fs,useSyncExternalStore:fs,useId:fs,useHostTransitionStatus:fs,useFormState:fs,useActionState:fs,useOptimistic:fs,useMemoCache:fs,useCacheRefresh:fs};$a.useEffectEvent=fs;var kr={readContext:Bs,use:al,useCallback:function(s,t){return Vs().memoizedState=[s,t===void 0?null:t],s},useContext:Bs,useEffect:nr,useImperativeHandle:function(s,t,e){e=e!=null?e.concat([s]):null,ll(4194308,4,or.bind(null,t,s),e)},useLayoutEffect:function(s,t){return ll(4194308,4,s,t)},useInsertionEffect:function(s,t){ll(4,2,s,t)},useMemo:function(s,t){var e=Vs();t=t===void 0?null:t;var a=s();if(Ve){It(!0);try{s()}finally{It(!1)}}return e.memoizedState=[a,t],a},useReducer:function(s,t,e){var a=Vs();if(e!==void 0){var n=e(t);if(Ve){It(!0);try{e(t)}finally{It(!1)}}}else n=t;return a.memoizedState=a.baseState=n,s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:s,lastRenderedState:n},a.queue=s,s=s.dispatch=$p.bind(null,G,s),[a.memoizedState,s]},useRef:function(s){var t=Vs();return s={current:s},t.memoizedState=s},useState:function(s){s=Pi(s);var t=s.queue,e=br.bind(null,G,t);return t.dispatch=e,[s.memoizedState,e]},useDebugValue:td,useDeferredValue:function(s,t){var e=Vs();return ed(e,s,t)},useTransition:function(){var s=Pi(!1);return s=pr.bind(null,G,s.queue,!0,!1),Vs().memoizedState=s,[!1,s]},useSyncExternalStore:function(s,t,e){var a=G,n=Vs();if(P){if(e===void 0)throw Error(_(407));e=e()}else{if(e=t(),us===null)throw Error(_(349));(J&127)!==0||Zc(a,t,e)}n.memoizedState=e;var l={value:e,getSnapshot:t};return n.queue=l,nr(Gc.bind(null,a,l,s),[s]),a.flags|=2048,pa(9,{destroy:void 0},Yc.bind(null,a,l,e,t),null),e},useId:function(){var s=Vs(),t=us.identifierPrefix;if(P){var e=Mt,a=St;e=(a&~(1<<32-$s(a)-1)).toString(32)+e,t="_"+t+"R_"+e,e=tl++,0<e&&(t+="H"+e.toString(32)),t+="_"}else e=Qp++,t="_"+t+"r_"+e.toString(32)+"_";return s.memoizedState=t},useHostTransitionStatus:nd,useFormState:$c,useActionState:$c,useOptimistic:function(s){var t=Vs();t.memoizedState=t.baseState=s;var e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=e,t=ld.bind(null,G,!0,e),e.dispatch=t,[s,t]},useMemoCache:Ji,useCacheRefresh:function(){return Vs().memoizedState=Pp.bind(null,G)},useEffectEvent:function(s){var t=Vs(),e={impl:s};return t.memoizedState=e,function(){if((es&2)!==0)throw Error(_(440));return e.impl.apply(void 0,arguments)}}},id={readContext:Bs,use:al,useCallback:rr,useContext:Bs,useEffect:sd,useImperativeHandle:cr,useInsertionEffect:ir,useLayoutEffect:dr,useMemo:ur,useReducer:nl,useRef:ar,useState:function(){return nl(Rt)},useDebugValue:td,useDeferredValue:function(s,t){var e=ms();return vr(e,ds.memoizedState,s,t)},useTransition:function(){var s=nl(Rt)[0],t=ms().memoizedState;return[typeof s=="boolean"?s:Wa(s),t]},useSyncExternalStore:qc,useId:hr,useHostTransitionStatus:nd,useFormState:sr,useActionState:sr,useOptimistic:function(s,t){var e=ms();return Kc(e,ds,s,t)},useMemoCache:Ji,useCacheRefresh:gr};id.useEffectEvent=lr;var yr={readContext:Bs,use:al,useCallback:rr,useContext:Bs,useEffect:sd,useImperativeHandle:cr,useInsertionEffect:ir,useLayoutEffect:dr,useMemo:ur,useReducer:Wi,useRef:ar,useState:function(){return Wi(Rt)},useDebugValue:td,useDeferredValue:function(s,t){var e=ms();return ds===null?ed(e,s,t):vr(e,ds.memoizedState,s,t)},useTransition:function(){var s=Wi(Rt)[0],t=ms().memoizedState;return[typeof s=="boolean"?s:Wa(s),t]},useSyncExternalStore:qc,useId:hr,useHostTransitionStatus:nd,useFormState:er,useActionState:er,useOptimistic:function(s,t){var e=ms();return ds!==null?Kc(e,ds,s,t):(e.baseState=s,[s,e.queue.dispatch])},useMemoCache:Ji,useCacheRefresh:gr};yr.useEffectEvent=lr;function dd(s,t,e,a){t=s.memoizedState,e=e(a,t),e=e==null?t:O({},t,e),s.memoizedState=e,s.lanes===0&&(s.updateQueue.baseState=e)}var od={enqueueSetState:function(s,t,e){s=s._reactInternals;var a=it(),n=ne(a);n.payload=t,e!=null&&(n.callback=e),t=le(s,n,a),t!==null&&(Js(t,s,a),Ka(t,s,a))},enqueueReplaceState:function(s,t,e){s=s._reactInternals;var a=it(),n=ne(a);n.tag=1,n.payload=t,e!=null&&(n.callback=e),t=le(s,n,a),t!==null&&(Js(t,s,a),Ka(t,s,a))},enqueueForceUpdate:function(s,t){s=s._reactInternals;var e=it(),a=ne(e);a.tag=2,t!=null&&(a.callback=t),t=le(s,a,e),t!==null&&(Js(t,s,e),Ka(t,s,e))}};function xr(s,t,e,a,n,l,i){return s=s.stateNode,typeof s.shouldComponentUpdate=="function"?s.shouldComponentUpdate(a,l,i):t.prototype&&t.prototype.isPureReactComponent?!Ra(e,a)||!Ra(n,l):!0}function Cr(s,t,e,a){s=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(e,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(e,a),t.state!==s&&od.enqueueReplaceState(t,t.state,null)}function je(s,t){var e=t;if("ref"in t){e={};for(var a in t)a!=="ref"&&(e[a]=t[a])}if(s=s.defaultProps){e===t&&(e=O({},e));for(var n in s)e[n]===void 0&&(e[n]=s[n])}return e}function Sr(s){Rn(s)}function Mr(s){console.error(s)}function Dr(s){Rn(s)}function ol(s,t){try{var e=s.onUncaughtError;e(t.value,{componentStack:t.stack})}catch(a){setTimeout(function(){throw a})}}function Lr(s,t,e){try{var a=s.onCaughtError;a(e.value,{componentStack:e.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function cd(s,t,e){return e=ne(e),e.tag=3,e.payload={element:null},e.callback=function(){ol(s,t)},e}function Br(s){return s=ne(s),s.tag=3,s}function Tr(s,t,e,a){var n=e.type.getDerivedStateFromError;if(typeof n=="function"){var l=a.value;s.payload=function(){return n(l)},s.callback=function(){Lr(t,e,a)}}var i=e.stateNode;i!==null&&typeof i.componentDidCatch=="function"&&(s.callback=function(){Lr(t,e,a),typeof n!="function"&&(ue===null?ue=new Set([this]):ue.add(this));var d=a.stack;this.componentDidCatch(a.value,{componentStack:d!==null?d:""})})}function s_(s,t,e,a,n){if(e.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(t=e.alternate,t!==null&&la(t,e,n,!0),e=et.current,e!==null){switch(e.tag){case 31:case 13:return ft===null?wl():e.alternate===null&&hs===0&&(hs=3),e.flags&=-257,e.flags|=65536,e.lanes=n,a===Jn?e.flags|=16384:(t=e.updateQueue,t===null?e.updateQueue=new Set([a]):t.add(a),Nd(s,a,n)),!1;case 22:return e.flags|=65536,a===Jn?e.flags|=16384:(t=e.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([a])},e.updateQueue=t):(e=t.retryQueue,e===null?t.retryQueue=new Set([a]):e.add(a)),Nd(s,a,n)),!1}throw Error(_(435,e.tag))}return Nd(s,a,n),wl(),!1}if(P)return t=et.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=n,a!==Li&&(s=Error(_(422),{cause:a}),Za(ut(s,e)))):(a!==Li&&(t=Error(_(423),{cause:a}),Za(ut(t,e))),s=s.current.alternate,s.flags|=65536,n&=-n,s.lanes|=n,a=ut(a,e),n=cd(s.stateNode,a,n),Ri(s,n),hs!==4&&(hs=2)),!1;var l=Error(_(520),{cause:a});if(l=ut(l,e),on===null?on=[l]:on.push(l),hs!==4&&(hs=2),t===null)return!0;a=ut(a,e),e=t;do{switch(e.tag){case 3:return e.flags|=65536,s=n&-n,e.lanes|=s,s=cd(e.stateNode,a,s),Ri(e,s),!1;case 1:if(t=e.type,l=e.stateNode,(e.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||l!==null&&typeof l.componentDidCatch=="function"&&(ue===null||!ue.has(l))))return e.flags|=65536,n&=-n,e.lanes|=n,n=Br(n),Tr(n,s,e,a),Ri(e,n),!1}e=e.return}while(e!==null);return!1}var rd=Error(_(461)),ys=!1;function Ts(s,t,e,a){t.child=s===null?Nc(t,null,e,a):He(t,s.child,e,a)}function Er(s,t,e,a,n){e=e.render;var l=t.ref;if("ref"in a){var i={};for(var d in a)d!=="ref"&&(i[d]=a[d])}else i=a;return Ae(t),a=Xi(s,t,e,i,l,n),d=Qi(),s!==null&&!ys?(Ki(s,t,n),Ut(s,t,n)):(P&&d&&Mi(t),t.flags|=1,Ts(s,t,a,n),t.child)}function Ar(s,t,e,a,n){if(s===null){var l=e.type;return typeof l=="function"&&!xi(l)&&l.defaultProps===void 0&&e.compare===null?(t.tag=15,t.type=l,zr(s,t,l,a,n)):(s=Yn(e.type,null,a,t,t.mode,n),s.ref=t.ref,s.return=t,t.child=s)}if(l=s.child,!bd(s,n)){var i=l.memoizedProps;if(e=e.compare,e=e!==null?e:Ra,e(i,a)&&s.ref===t.ref)return Ut(s,t,n)}return t.flags|=1,s=Nt(l,a),s.ref=t.ref,s.return=t,t.child=s}function zr(s,t,e,a,n){if(s!==null){var l=s.memoizedProps;if(Ra(l,a)&&s.ref===t.ref)if(ys=!1,t.pendingProps=a=l,bd(s,n))(s.flags&131072)!==0&&(ys=!0);else return t.lanes=s.lanes,Ut(s,t,n)}return ud(s,t,e,a,n)}function Nr(s,t,e,a){var n=a.children,l=s!==null?s.memoizedState:null;if(s===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((t.flags&128)!==0){if(l=l!==null?l.baseLanes|e:e,s!==null){for(a=t.child=s.child,n=0;a!==null;)n=n|a.lanes|a.childLanes,a=a.sibling;a=n&~l}else a=0,t.child=null;return Or(s,t,l,e,a)}if((e&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},s!==null&&Kn(t,l!==null?l.cachePool:null),l!==null?Vc(t,l):qi(),jc(t);else return a=t.lanes=536870912,Or(s,t,l!==null?l.baseLanes|e:e,e,a)}else l!==null?(Kn(t,l.cachePool),Vc(t,l),de(),t.memoizedState=null):(s!==null&&Kn(t,null),qi(),de());return Ts(s,t,n,e),t.child}function sn(s,t){return s!==null&&s.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Or(s,t,e,a,n){var l=Oi();return l=l===null?null:{parent:ws._currentValue,pool:l},t.memoizedState={baseLanes:e,cachePool:l},s!==null&&Kn(t,null),qi(),jc(t),s!==null&&la(s,t,a,!0),t.childLanes=n,null}function cl(s,t){return t=ul({mode:t.mode,children:t.children},s.mode),t.ref=s.ref,s.child=t,t.return=s,t}function Hr(s,t,e){return He(t,s.child,null,e),s=cl(t,t.pendingProps),s.flags|=2,at(t),t.memoizedState=null,s}function t_(s,t,e){var a=t.pendingProps,n=(t.flags&128)!==0;if(t.flags&=-129,s===null){if(P){if(a.mode==="hidden")return s=cl(t,a),t.lanes=536870912,sn(null,s);if(Yi(t),(s=vs)?(s=Fu(s,_t),s=s!==null&&s.data==="&"?s:null,s!==null&&(t.memoizedState={dehydrated:s,treeContext:$t!==null?{id:St,overflow:Mt}:null,retryLane:536870912,hydrationErrors:null},e=mc(s),e.return=t,t.child=e,Ls=t,vs=null)):s=null,s===null)throw te(t);return t.lanes=536870912,null}return cl(t,a)}var l=s.memoizedState;if(l!==null){var i=l.dehydrated;if(Yi(t),n)if(t.flags&256)t.flags&=-257,t=Hr(s,t,e);else if(t.memoizedState!==null)t.child=s.child,t.flags|=128,t=null;else throw Error(_(558));else if(ys||la(s,t,e,!1),n=(e&s.childLanes)!==0,ys||n){if(a=us,a!==null&&(i=Mo(a,e),i!==0&&i!==l.retryLane))throw l.retryLane=i,Le(s,i),Js(a,s,i),rd;wl(),t=Hr(s,t,e)}else s=l.treeContext,vs=ht(i.nextSibling),Ls=t,P=!0,se=null,_t=!1,s!==null&&yc(t,s),t=cl(t,a),t.flags|=4096;return t}return s=Nt(s.child,{mode:a.mode,children:a.children}),s.ref=t.ref,t.child=s,s.return=t,s}function rl(s,t){var e=t.ref;if(e===null)s!==null&&s.ref!==null&&(t.flags|=4194816);else{if(typeof e!="function"&&typeof e!="object")throw Error(_(284));(s===null||s.ref!==e)&&(t.flags|=4194816)}}function ud(s,t,e,a,n){return Ae(t),e=Xi(s,t,e,a,void 0,n),a=Qi(),s!==null&&!ys?(Ki(s,t,n),Ut(s,t,n)):(P&&a&&Mi(t),t.flags|=1,Ts(s,t,e,n),t.child)}function Vr(s,t,e,a,n,l){return Ae(t),t.updateQueue=null,e=Uc(t,a,e,n),Rc(s),a=Qi(),s!==null&&!ys?(Ki(s,t,l),Ut(s,t,l)):(P&&a&&Mi(t),t.flags|=1,Ts(s,t,e,l),t.child)}function jr(s,t,e,a,n){if(Ae(t),t.stateNode===null){var l=ta,i=e.contextType;typeof i=="object"&&i!==null&&(l=Bs(i)),l=new e(a,l),t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,l.updater=od,t.stateNode=l,l._reactInternals=t,l=t.stateNode,l.props=a,l.state=t.memoizedState,l.refs={},Vi(t),i=e.contextType,l.context=typeof i=="object"&&i!==null?Bs(i):ta,l.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(dd(t,e,i,a),l.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(i=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),i!==l.state&&od.enqueueReplaceState(l,l.state,null),Ja(t,a,l,n),Fa(),l.state=t.memoizedState),typeof l.componentDidMount=="function"&&(t.flags|=4194308),a=!0}else if(s===null){l=t.stateNode;var d=t.memoizedProps,o=je(e,d);l.props=o;var h=l.context,m=e.contextType;i=ta,typeof m=="object"&&m!==null&&(i=Bs(m));var y=e.getDerivedStateFromProps;m=typeof y=="function"||typeof l.getSnapshotBeforeUpdate=="function",d=t.pendingProps!==d,m||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(d||h!==i)&&Cr(t,l,a,i),ae=!1;var g=t.memoizedState;l.state=g,Ja(t,a,l,n),Fa(),h=t.memoizedState,d||g!==h||ae?(typeof y=="function"&&(dd(t,e,y,a),h=t.memoizedState),(o=ae||xr(t,e,o,a,g,h,i))?(m||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=h),l.props=a,l.state=h,l.context=i,a=o):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{l=t.stateNode,ji(s,t),i=t.memoizedProps,m=je(e,i),l.props=m,y=t.pendingProps,g=l.context,h=e.contextType,o=ta,typeof h=="object"&&h!==null&&(o=Bs(h)),d=e.getDerivedStateFromProps,(h=typeof d=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==y||g!==o)&&Cr(t,l,a,o),ae=!1,g=t.memoizedState,l.state=g,Ja(t,a,l,n),Fa();var b=t.memoizedState;i!==y||g!==b||ae||s!==null&&s.dependencies!==null&&Xn(s.dependencies)?(typeof d=="function"&&(dd(t,e,d,a),b=t.memoizedState),(m=ae||xr(t,e,m,a,g,b,o)||s!==null&&s.dependencies!==null&&Xn(s.dependencies))?(h||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(a,b,o),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(a,b,o)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||i===s.memoizedProps&&g===s.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===s.memoizedProps&&g===s.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=b),l.props=a,l.state=b,l.context=o,a=m):(typeof l.componentDidUpdate!="function"||i===s.memoizedProps&&g===s.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===s.memoizedProps&&g===s.memoizedState||(t.flags|=1024),a=!1)}return l=a,rl(s,t),a=(t.flags&128)!==0,l||a?(l=t.stateNode,e=a&&typeof e.getDerivedStateFromError!="function"?null:l.render(),t.flags|=1,s!==null&&a?(t.child=He(t,s.child,null,n),t.child=He(t,null,e,n)):Ts(s,t,e,n),t.memoizedState=l.state,s=t.child):s=Ut(s,t,n),s}function Rr(s,t,e,a){return Te(),t.flags|=256,Ts(s,t,e,a),t.child}var vd={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function pd(s){return{baseLanes:s,cachePool:Lc()}}function _d(s,t,e){return s=s!==null?s.childLanes&~e:0,t&&(s|=lt),s}function Ur(s,t,e){var a=t.pendingProps,n=!1,l=(t.flags&128)!==0,i;if((i=l)||(i=s!==null&&s.memoizedState===null?!1:(bs.current&2)!==0),i&&(n=!0,t.flags&=-129),i=(t.flags&32)!==0,t.flags&=-33,s===null){if(P){if(n?ie(t):de(),(s=vs)?(s=Fu(s,_t),s=s!==null&&s.data!=="&"?s:null,s!==null&&(t.memoizedState={dehydrated:s,treeContext:$t!==null?{id:St,overflow:Mt}:null,retryLane:536870912,hydrationErrors:null},e=mc(s),e.return=t,t.child=e,Ls=t,vs=null)):s=null,s===null)throw te(t);return Id(s)?t.lanes=32:t.lanes=536870912,null}var d=a.children;return a=a.fallback,n?(de(),n=t.mode,d=ul({mode:"hidden",children:d},n),a=Be(a,n,e,null),d.return=t,a.return=t,d.sibling=a,t.child=d,a=t.child,a.memoizedState=pd(e),a.childLanes=_d(s,i,e),t.memoizedState=vd,sn(null,a)):(ie(t),fd(t,d))}var o=s.memoizedState;if(o!==null&&(d=o.dehydrated,d!==null)){if(l)t.flags&256?(ie(t),t.flags&=-257,t=hd(s,t,e)):t.memoizedState!==null?(de(),t.child=s.child,t.flags|=128,t=null):(de(),d=a.fallback,n=t.mode,a=ul({mode:"visible",children:a.children},n),d=Be(d,n,e,null),d.flags|=2,a.return=t,d.return=t,a.sibling=d,t.child=a,He(t,s.child,null,e),a=t.child,a.memoizedState=pd(e),a.childLanes=_d(s,i,e),t.memoizedState=vd,t=sn(null,a));else if(ie(t),Id(d)){if(i=d.nextSibling&&d.nextSibling.dataset,i)var h=i.dgst;i=h,a=Error(_(419)),a.stack="",a.digest=i,Za({value:a,source:null,stack:null}),t=hd(s,t,e)}else if(ys||la(s,t,e,!1),i=(e&s.childLanes)!==0,ys||i){if(i=us,i!==null&&(a=Mo(i,e),a!==0&&a!==o.retryLane))throw o.retryLane=a,Le(s,a),Js(i,s,a),rd;Jd(d)||wl(),t=hd(s,t,e)}else Jd(d)?(t.flags|=192,t.child=s.child,t=null):(s=o.treeContext,vs=ht(d.nextSibling),Ls=t,P=!0,se=null,_t=!1,s!==null&&yc(t,s),t=fd(t,a.children),t.flags|=4096);return t}return n?(de(),d=a.fallback,n=t.mode,o=s.child,h=o.sibling,a=Nt(o,{mode:"hidden",children:a.children}),a.subtreeFlags=o.subtreeFlags&65011712,h!==null?d=Nt(h,d):(d=Be(d,n,e,null),d.flags|=2),d.return=t,a.return=t,a.sibling=d,t.child=a,sn(null,a),a=t.child,d=s.child.memoizedState,d===null?d=pd(e):(n=d.cachePool,n!==null?(o=ws._currentValue,n=n.parent!==o?{parent:o,pool:o}:n):n=Lc(),d={baseLanes:d.baseLanes|e,cachePool:n}),a.memoizedState=d,a.childLanes=_d(s,i,e),t.memoizedState=vd,sn(s.child,a)):(ie(t),e=s.child,s=e.sibling,e=Nt(e,{mode:"visible",children:a.children}),e.return=t,e.sibling=null,s!==null&&(i=t.deletions,i===null?(t.deletions=[s],t.flags|=16):i.push(s)),t.child=e,t.memoizedState=null,e)}function fd(s,t){return t=ul({mode:"visible",children:t},s.mode),t.return=s,s.child=t}function ul(s,t){return s=tt(22,s,null,t),s.lanes=0,s}function hd(s,t,e){return He(t,s.child,null,e),s=fd(t,t.pendingProps.children),s.flags|=2,t.memoizedState=null,s}function qr(s,t,e){s.lanes|=t;var a=s.alternate;a!==null&&(a.lanes|=t),Ei(s.return,t,e)}function gd(s,t,e,a,n,l){var i=s.memoizedState;i===null?s.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:e,tailMode:n,treeForkCount:l}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=a,i.tail=e,i.tailMode=n,i.treeForkCount=l)}function Zr(s,t,e){var a=t.pendingProps,n=a.revealOrder,l=a.tail;a=a.children;var i=bs.current,d=(i&2)!==0;if(d?(i=i&1|2,t.flags|=128):i&=1,B(bs,i),Ts(s,t,a,e),a=P?qa:0,!d&&s!==null&&(s.flags&128)!==0)s:for(s=t.child;s!==null;){if(s.tag===13)s.memoizedState!==null&&qr(s,e,t);else if(s.tag===19)qr(s,e,t);else if(s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break s;for(;s.sibling===null;){if(s.return===null||s.return===t)break s;s=s.return}s.sibling.return=s.return,s=s.sibling}switch(n){case"forwards":for(e=t.child,n=null;e!==null;)s=e.alternate,s!==null&&$n(s)===null&&(n=e),e=e.sibling;e=n,e===null?(n=t.child,t.child=null):(n=e.sibling,e.sibling=null),gd(t,!1,n,e,l,a);break;case"backwards":case"unstable_legacy-backwards":for(e=null,n=t.child,t.child=null;n!==null;){if(s=n.alternate,s!==null&&$n(s)===null){t.child=n;break}s=n.sibling,n.sibling=e,e=n,n=s}gd(t,!0,e,null,l,a);break;case"together":gd(t,!1,null,null,void 0,a);break;default:t.memoizedState=null}return t.child}function Ut(s,t,e){if(s!==null&&(t.dependencies=s.dependencies),re|=t.lanes,(e&t.childLanes)===0)if(s!==null){if(la(s,t,e,!1),(e&t.childLanes)===0)return null}else return null;if(s!==null&&t.child!==s.child)throw Error(_(153));if(t.child!==null){for(s=t.child,e=Nt(s,s.pendingProps),t.child=e,e.return=t;s.sibling!==null;)s=s.sibling,e=e.sibling=Nt(s,s.pendingProps),e.return=t;e.sibling=null}return t.child}function bd(s,t){return(s.lanes&t)!==0?!0:(s=s.dependencies,!!(s!==null&&Xn(s)))}function e_(s,t,e){switch(t.tag){case 3:Hs(t,t.stateNode.containerInfo),ee(t,ws,s.memoizedState.cache),Te();break;case 27:case 5:Ma(t);break;case 4:Hs(t,t.stateNode.containerInfo);break;case 10:ee(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Yi(t),null;break;case 13:var a=t.memoizedState;if(a!==null)return a.dehydrated!==null?(ie(t),t.flags|=128,null):(e&t.child.childLanes)!==0?Ur(s,t,e):(ie(t),s=Ut(s,t,e),s!==null?s.sibling:null);ie(t);break;case 19:var n=(s.flags&128)!==0;if(a=(e&t.childLanes)!==0,a||(la(s,t,e,!1),a=(e&t.childLanes)!==0),n){if(a)return Zr(s,t,e);t.flags|=128}if(n=t.memoizedState,n!==null&&(n.rendering=null,n.tail=null,n.lastEffect=null),B(bs,bs.current),a)break;return null;case 22:return t.lanes=0,Nr(s,t,e,t.pendingProps);case 24:ee(t,ws,s.memoizedState.cache)}return Ut(s,t,e)}function Yr(s,t,e){if(s!==null)if(s.memoizedProps!==t.pendingProps)ys=!0;else{if(!bd(s,e)&&(t.flags&128)===0)return ys=!1,e_(s,t,e);ys=(s.flags&131072)!==0}else ys=!1,P&&(t.flags&1048576)!==0&&kc(t,qa,t.index);switch(t.lanes=0,t.tag){case 16:s:{var a=t.pendingProps;if(s=Ne(t.elementType),t.type=s,typeof s=="function")xi(s)?(a=je(s,a),t.tag=1,t=jr(null,t,s,a,e)):(t.tag=0,t=ud(null,t,s,a,e));else{if(s!=null){var n=s.$$typeof;if(n===dt){t.tag=11,t=Er(null,t,s,a,e);break s}else if(n===W){t.tag=14,t=Ar(null,t,s,a,e);break s}}throw t=Tt(s)||s,Error(_(306,t,""))}}return t;case 0:return ud(s,t,t.type,t.pendingProps,e);case 1:return a=t.type,n=je(a,t.pendingProps),jr(s,t,a,n,e);case 3:s:{if(Hs(t,t.stateNode.containerInfo),s===null)throw Error(_(387));a=t.pendingProps;var l=t.memoizedState;n=l.element,ji(s,t),Ja(t,a,null,e);var i=t.memoizedState;if(a=i.cache,ee(t,ws,a),a!==l.cache&&Ai(t,[ws],e,!0),Fa(),a=i.element,l.isDehydrated)if(l={element:a,isDehydrated:!1,cache:i.cache},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){t=Rr(s,t,a,e);break s}else if(a!==n){n=ut(Error(_(424)),t),Za(n),t=Rr(s,t,a,e);break s}else{switch(s=t.stateNode.containerInfo,s.nodeType){case 9:s=s.body;break;default:s=s.nodeName==="HTML"?s.ownerDocument.body:s}for(vs=ht(s.firstChild),Ls=t,P=!0,se=null,_t=!0,e=Nc(t,null,a,e),t.child=e;e;)e.flags=e.flags&-3|4096,e=e.sibling}else{if(Te(),a===n){t=Ut(s,t,e);break s}Ts(s,t,a,e)}t=t.child}return t;case 26:return rl(s,t),s===null?(e=sv(t.type,null,t.pendingProps,null))?t.memoizedState=e:P||(e=t.type,s=t.pendingProps,a=Dl(Q.current).createElement(e),a[Ds]=t,a[Ys]=s,Es(a,e,s),Ss(a),t.stateNode=a):t.memoizedState=sv(t.type,s.memoizedProps,t.pendingProps,s.memoizedState),null;case 27:return Ma(t),s===null&&P&&(a=t.stateNode=Wu(t.type,t.pendingProps,Q.current),Ls=t,_t=!0,n=vs,fe(t.type)?(Wd=n,vs=ht(a.firstChild)):vs=n),Ts(s,t,t.pendingProps.children,e),rl(s,t),s===null&&(t.flags|=4194304),t.child;case 5:return s===null&&P&&((n=a=vs)&&(a=A_(a,t.type,t.pendingProps,_t),a!==null?(t.stateNode=a,Ls=t,vs=ht(a.firstChild),_t=!1,n=!0):n=!1),n||te(t)),Ma(t),n=t.type,l=t.pendingProps,i=s!==null?s.memoizedProps:null,a=l.children,Qd(n,l)?a=null:i!==null&&Qd(n,i)&&(t.flags|=32),t.memoizedState!==null&&(n=Xi(s,t,Kp,null,null,e),hn._currentValue=n),rl(s,t),Ts(s,t,a,e),t.child;case 6:return s===null&&P&&((s=e=vs)&&(e=z_(e,t.pendingProps,_t),e!==null?(t.stateNode=e,Ls=t,vs=null,s=!0):s=!1),s||te(t)),null;case 13:return Ur(s,t,e);case 4:return Hs(t,t.stateNode.containerInfo),a=t.pendingProps,s===null?t.child=He(t,null,a,e):Ts(s,t,a,e),t.child;case 11:return Er(s,t,t.type,t.pendingProps,e);case 7:return Ts(s,t,t.pendingProps,e),t.child;case 8:return Ts(s,t,t.pendingProps.children,e),t.child;case 12:return Ts(s,t,t.pendingProps.children,e),t.child;case 10:return a=t.pendingProps,ee(t,t.type,a.value),Ts(s,t,a.children,e),t.child;case 9:return n=t.type._context,a=t.pendingProps.children,Ae(t),n=Bs(n),a=a(n),t.flags|=1,Ts(s,t,a,e),t.child;case 14:return Ar(s,t,t.type,t.pendingProps,e);case 15:return zr(s,t,t.type,t.pendingProps,e);case 19:return Zr(s,t,e);case 31:return t_(s,t,e);case 22:return Nr(s,t,e,t.pendingProps);case 24:return Ae(t),a=Bs(ws),s===null?(n=Oi(),n===null&&(n=us,l=zi(),n.pooledCache=l,l.refCount++,l!==null&&(n.pooledCacheLanes|=e),n=l),t.memoizedState={parent:a,cache:n},Vi(t),ee(t,ws,n)):((s.lanes&e)!==0&&(ji(s,t),Ja(t,null,null,e),Fa()),n=s.memoizedState,l=t.memoizedState,n.parent!==a?(n={parent:a,cache:a},t.memoizedState=n,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=n),ee(t,ws,a)):(a=l.cache,ee(t,ws,a),a!==n.cache&&Ai(t,[ws],e,!0))),Ts(s,t,t.pendingProps.children,e),t.child;case 29:throw t.pendingProps}throw Error(_(156,t.tag))}function qt(s){s.flags|=4}function md(s,t,e,a,n){if((t=(s.mode&32)!==0)&&(t=!1),t){if(s.flags|=16777216,(n&335544128)===n)if(s.stateNode.complete)s.flags|=8192;else if(hu())s.flags|=8192;else throw Oe=Jn,Hi}else s.flags&=-16777217}function Gr(s,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)s.flags&=-16777217;else if(s.flags|=16777216,!lv(t))if(hu())s.flags|=8192;else throw Oe=Jn,Hi}function vl(s,t){t!==null&&(s.flags|=4),s.flags&16384&&(t=s.tag!==22?xo():536870912,s.lanes|=t,ga|=t)}function tn(s,t){if(!P)switch(s.tailMode){case"hidden":t=s.tail;for(var e=null;t!==null;)t.alternate!==null&&(e=t),t=t.sibling;e===null?s.tail=null:e.sibling=null;break;case"collapsed":e=s.tail;for(var a=null;e!==null;)e.alternate!==null&&(a=e),e=e.sibling;a===null?t||s.tail===null?s.tail=null:s.tail.sibling=null:a.sibling=null}}function ps(s){var t=s.alternate!==null&&s.alternate.child===s.child,e=0,a=0;if(t)for(var n=s.child;n!==null;)e|=n.lanes|n.childLanes,a|=n.subtreeFlags&65011712,a|=n.flags&65011712,n.return=s,n=n.sibling;else for(n=s.child;n!==null;)e|=n.lanes|n.childLanes,a|=n.subtreeFlags,a|=n.flags,n.return=s,n=n.sibling;return s.subtreeFlags|=a,s.childLanes=e,t}function a_(s,t,e){var a=t.pendingProps;switch(Di(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ps(t),null;case 1:return ps(t),null;case 3:return e=t.stateNode,a=null,s!==null&&(a=s.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Vt(ws),gs(),e.pendingContext&&(e.context=e.pendingContext,e.pendingContext=null),(s===null||s.child===null)&&(na(t)?qt(t):s===null||s.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Bi())),ps(t),null;case 26:var n=t.type,l=t.memoizedState;return s===null?(qt(t),l!==null?(ps(t),Gr(t,l)):(ps(t),md(t,n,null,a,e))):l?l!==s.memoizedState?(qt(t),ps(t),Gr(t,l)):(ps(t),t.flags&=-16777217):(s=s.memoizedProps,s!==a&&qt(t),ps(t),md(t,n,s,a,e)),null;case 27:if(xn(t),e=Q.current,n=t.type,s!==null&&t.stateNode!=null)s.memoizedProps!==a&&qt(t);else{if(!a){if(t.stateNode===null)throw Error(_(166));return ps(t),null}s=A.current,na(t)?xc(t):(s=Wu(n,a,e),t.stateNode=s,qt(t))}return ps(t),null;case 5:if(xn(t),n=t.type,s!==null&&t.stateNode!=null)s.memoizedProps!==a&&qt(t);else{if(!a){if(t.stateNode===null)throw Error(_(166));return ps(t),null}if(l=A.current,na(t))xc(t);else{var i=Dl(Q.current);switch(l){case 1:l=i.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:l=i.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":l=i.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":l=i.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":l=i.createElement("div"),l.innerHTML="<script><\/script>",l=l.removeChild(l.firstChild);break;case"select":l=typeof a.is=="string"?i.createElement("select",{is:a.is}):i.createElement("select"),a.multiple?l.multiple=!0:a.size&&(l.size=a.size);break;default:l=typeof a.is=="string"?i.createElement(n,{is:a.is}):i.createElement(n)}}l[Ds]=t,l[Ys]=a;s:for(i=t.child;i!==null;){if(i.tag===5||i.tag===6)l.appendChild(i.stateNode);else if(i.tag!==4&&i.tag!==27&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break s;for(;i.sibling===null;){if(i.return===null||i.return===t)break s;i=i.return}i.sibling.return=i.return,i=i.sibling}t.stateNode=l;s:switch(Es(l,n,a),n){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break s;case"img":a=!0;break s;default:a=!1}a&&qt(t)}}return ps(t),md(t,t.type,s===null?null:s.memoizedProps,t.pendingProps,e),null;case 6:if(s&&t.stateNode!=null)s.memoizedProps!==a&&qt(t);else{if(typeof a!="string"&&t.stateNode===null)throw Error(_(166));if(s=Q.current,na(t)){if(s=t.stateNode,e=t.memoizedProps,a=null,n=Ls,n!==null)switch(n.tag){case 27:case 5:a=n.memoizedProps}s[Ds]=t,s=!!(s.nodeValue===e||a!==null&&a.suppressHydrationWarning===!0||Uu(s.nodeValue,e)),s||te(t,!0)}else s=Dl(s).createTextNode(a),s[Ds]=t,t.stateNode=s}return ps(t),null;case 31:if(e=t.memoizedState,s===null||s.memoizedState!==null){if(a=na(t),e!==null){if(s===null){if(!a)throw Error(_(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(_(557));s[Ds]=t}else Te(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ps(t),s=!1}else e=Bi(),s!==null&&s.memoizedState!==null&&(s.memoizedState.hydrationErrors=e),s=!0;if(!s)return t.flags&256?(at(t),t):(at(t),null);if((t.flags&128)!==0)throw Error(_(558))}return ps(t),null;case 13:if(a=t.memoizedState,s===null||s.memoizedState!==null&&s.memoizedState.dehydrated!==null){if(n=na(t),a!==null&&a.dehydrated!==null){if(s===null){if(!n)throw Error(_(318));if(n=t.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(_(317));n[Ds]=t}else Te(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ps(t),n=!1}else n=Bi(),s!==null&&s.memoizedState!==null&&(s.memoizedState.hydrationErrors=n),n=!0;if(!n)return t.flags&256?(at(t),t):(at(t),null)}return at(t),(t.flags&128)!==0?(t.lanes=e,t):(e=a!==null,s=s!==null&&s.memoizedState!==null,e&&(a=t.child,n=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(n=a.alternate.memoizedState.cachePool.pool),l=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(l=a.memoizedState.cachePool.pool),l!==n&&(a.flags|=2048)),e!==s&&e&&(t.child.flags|=8192),vl(t,t.updateQueue),ps(t),null);case 4:return gs(),s===null&&qd(t.stateNode.containerInfo),ps(t),null;case 10:return Vt(t.type),ps(t),null;case 19:if(x(bs),a=t.memoizedState,a===null)return ps(t),null;if(n=(t.flags&128)!==0,l=a.rendering,l===null)if(n)tn(a,!1);else{if(hs!==0||s!==null&&(s.flags&128)!==0)for(s=t.child;s!==null;){if(l=$n(s),l!==null){for(t.flags|=128,tn(a,!1),s=l.updateQueue,t.updateQueue=s,vl(t,s),t.subtreeFlags=0,s=e,e=t.child;e!==null;)bc(e,s),e=e.sibling;return B(bs,bs.current&1|2),P&&Ot(t,a.treeForkCount),t.child}s=s.sibling}a.tail!==null&&Ws()>gl&&(t.flags|=128,n=!0,tn(a,!1),t.lanes=4194304)}else{if(!n)if(s=$n(l),s!==null){if(t.flags|=128,n=!0,s=s.updateQueue,t.updateQueue=s,vl(t,s),tn(a,!0),a.tail===null&&a.tailMode==="hidden"&&!l.alternate&&!P)return ps(t),null}else 2*Ws()-a.renderingStartTime>gl&&e!==536870912&&(t.flags|=128,n=!0,tn(a,!1),t.lanes=4194304);a.isBackwards?(l.sibling=t.child,t.child=l):(s=a.last,s!==null?s.sibling=l:t.child=l,a.last=l)}return a.tail!==null?(s=a.tail,a.rendering=s,a.tail=s.sibling,a.renderingStartTime=Ws(),s.sibling=null,e=bs.current,B(bs,n?e&1|2:e&1),P&&Ot(t,a.treeForkCount),s):(ps(t),null);case 22:case 23:return at(t),Zi(),a=t.memoizedState!==null,s!==null?s.memoizedState!==null!==a&&(t.flags|=8192):a&&(t.flags|=8192),a?(e&536870912)!==0&&(t.flags&128)===0&&(ps(t),t.subtreeFlags&6&&(t.flags|=8192)):ps(t),e=t.updateQueue,e!==null&&vl(t,e.retryQueue),e=null,s!==null&&s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(e=s.memoizedState.cachePool.pool),a=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),a!==e&&(t.flags|=2048),s!==null&&x(ze),null;case 24:return e=null,s!==null&&(e=s.memoizedState.cache),t.memoizedState.cache!==e&&(t.flags|=2048),Vt(ws),ps(t),null;case 25:return null;case 30:return null}throw Error(_(156,t.tag))}function n_(s,t){switch(Di(t),t.tag){case 1:return s=t.flags,s&65536?(t.flags=s&-65537|128,t):null;case 3:return Vt(ws),gs(),s=t.flags,(s&65536)!==0&&(s&128)===0?(t.flags=s&-65537|128,t):null;case 26:case 27:case 5:return xn(t),null;case 31:if(t.memoizedState!==null){if(at(t),t.alternate===null)throw Error(_(340));Te()}return s=t.flags,s&65536?(t.flags=s&-65537|128,t):null;case 13:if(at(t),s=t.memoizedState,s!==null&&s.dehydrated!==null){if(t.alternate===null)throw Error(_(340));Te()}return s=t.flags,s&65536?(t.flags=s&-65537|128,t):null;case 19:return x(bs),null;case 4:return gs(),null;case 10:return Vt(t.type),null;case 22:case 23:return at(t),Zi(),s!==null&&x(ze),s=t.flags,s&65536?(t.flags=s&-65537|128,t):null;case 24:return Vt(ws),null;case 25:return null;default:return null}}function Xr(s,t){switch(Di(t),t.tag){case 3:Vt(ws),gs();break;case 26:case 27:case 5:xn(t);break;case 4:gs();break;case 31:t.memoizedState!==null&&at(t);break;case 13:at(t);break;case 19:x(bs);break;case 10:Vt(t.type);break;case 22:case 23:at(t),Zi(),s!==null&&x(ze);break;case 24:Vt(ws)}}function en(s,t){try{var e=t.updateQueue,a=e!==null?e.lastEffect:null;if(a!==null){var n=a.next;e=n;do{if((e.tag&s)===s){a=void 0;var l=e.create,i=e.inst;a=l(),i.destroy=a}e=e.next}while(e!==n)}}catch(d){ls(t,t.return,d)}}function oe(s,t,e){try{var a=t.updateQueue,n=a!==null?a.lastEffect:null;if(n!==null){var l=n.next;a=l;do{if((a.tag&s)===s){var i=a.inst,d=i.destroy;if(d!==void 0){i.destroy=void 0,n=t;var o=e,h=d;try{h()}catch(m){ls(n,o,m)}}}a=a.next}while(a!==l)}}catch(m){ls(t,t.return,m)}}function Qr(s){var t=s.updateQueue;if(t!==null){var e=s.stateNode;try{Hc(t,e)}catch(a){ls(s,s.return,a)}}}function Kr(s,t,e){e.props=je(s.type,s.memoizedProps),e.state=s.memoizedState;try{e.componentWillUnmount()}catch(a){ls(s,t,a)}}function an(s,t){try{var e=s.ref;if(e!==null){switch(s.tag){case 26:case 27:case 5:var a=s.stateNode;break;case 30:a=s.stateNode;break;default:a=s.stateNode}typeof e=="function"?s.refCleanup=e(a):e.current=a}}catch(n){ls(s,t,n)}}function Dt(s,t){var e=s.ref,a=s.refCleanup;if(e!==null)if(typeof a=="function")try{a()}catch(n){ls(s,t,n)}finally{s.refCleanup=null,s=s.alternate,s!=null&&(s.refCleanup=null)}else if(typeof e=="function")try{e(null)}catch(n){ls(s,t,n)}else e.current=null}function Fr(s){var t=s.type,e=s.memoizedProps,a=s.stateNode;try{s:switch(t){case"button":case"input":case"select":case"textarea":e.autoFocus&&a.focus();break s;case"img":e.src?a.src=e.src:e.srcSet&&(a.srcset=e.srcSet)}}catch(n){ls(s,s.return,n)}}function wd(s,t,e){try{var a=s.stateNode;M_(a,s.type,e,t),a[Ys]=t}catch(n){ls(s,s.return,n)}}function Jr(s){return s.tag===5||s.tag===3||s.tag===26||s.tag===27&&fe(s.type)||s.tag===4}function kd(s){s:for(;;){for(;s.sibling===null;){if(s.return===null||Jr(s.return))return null;s=s.return}for(s.sibling.return=s.return,s=s.sibling;s.tag!==5&&s.tag!==6&&s.tag!==18;){if(s.tag===27&&fe(s.type)||s.flags&2||s.child===null||s.tag===4)continue s;s.child.return=s,s=s.child}if(!(s.flags&2))return s.stateNode}}function yd(s,t,e){var a=s.tag;if(a===5||a===6)s=s.stateNode,t?(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e).insertBefore(s,t):(t=e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,t.appendChild(s),e=e._reactRootContainer,e!=null||t.onclick!==null||(t.onclick=At));else if(a!==4&&(a===27&&fe(s.type)&&(e=s.stateNode,t=null),s=s.child,s!==null))for(yd(s,t,e),s=s.sibling;s!==null;)yd(s,t,e),s=s.sibling}function pl(s,t,e){var a=s.tag;if(a===5||a===6)s=s.stateNode,t?e.insertBefore(s,t):e.appendChild(s);else if(a!==4&&(a===27&&fe(s.type)&&(e=s.stateNode),s=s.child,s!==null))for(pl(s,t,e),s=s.sibling;s!==null;)pl(s,t,e),s=s.sibling}function Ir(s){var t=s.stateNode,e=s.memoizedProps;try{for(var a=s.type,n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Es(t,a,e),t[Ds]=s,t[Ys]=e}catch(l){ls(s,s.return,l)}}var Zt=!1,xs=!1,xd=!1,Wr=typeof WeakSet=="function"?WeakSet:Set,Ms=null;function l_(s,t){if(s=s.containerInfo,Gd=Nl,s=cc(s),hi(s)){if("selectionStart"in s)var e={start:s.selectionStart,end:s.selectionEnd};else s:{e=(e=s.ownerDocument)&&e.defaultView||window;var a=e.getSelection&&e.getSelection();if(a&&a.rangeCount!==0){e=a.anchorNode;var n=a.anchorOffset,l=a.focusNode;a=a.focusOffset;try{e.nodeType,l.nodeType}catch{e=null;break s}var i=0,d=-1,o=-1,h=0,m=0,y=s,g=null;t:for(;;){for(var b;y!==e||n!==0&&y.nodeType!==3||(d=i+n),y!==l||a!==0&&y.nodeType!==3||(o=i+a),y.nodeType===3&&(i+=y.nodeValue.length),(b=y.firstChild)!==null;)g=y,y=b;for(;;){if(y===s)break t;if(g===e&&++h===n&&(d=i),g===l&&++m===a&&(o=i),(b=y.nextSibling)!==null)break;y=g,g=y.parentNode}y=b}e=d===-1||o===-1?null:{start:d,end:o}}else e=null}e=e||{start:0,end:0}}else e=null;for(Xd={focusedElem:s,selectionRange:e},Nl=!1,Ms=t;Ms!==null;)if(t=Ms,s=t.child,(t.subtreeFlags&1028)!==0&&s!==null)s.return=t,Ms=s;else for(;Ms!==null;){switch(t=Ms,l=t.alternate,s=t.flags,t.tag){case 0:if((s&4)!==0&&(s=t.updateQueue,s=s!==null?s.events:null,s!==null))for(e=0;e<s.length;e++)n=s[e],n.ref.impl=n.nextImpl;break;case 11:case 15:break;case 1:if((s&1024)!==0&&l!==null){s=void 0,e=t,n=l.memoizedProps,l=l.memoizedState,a=e.stateNode;try{var E=je(e.type,n);s=a.getSnapshotBeforeUpdate(E,l),a.__reactInternalSnapshotBeforeUpdate=s}catch(U){ls(e,e.return,U)}}break;case 3:if((s&1024)!==0){if(s=t.stateNode.containerInfo,e=s.nodeType,e===9)Fd(s);else if(e===1)switch(s.nodeName){case"HEAD":case"HTML":case"BODY":Fd(s);break;default:s.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((s&1024)!==0)throw Error(_(163))}if(s=t.sibling,s!==null){s.return=t.return,Ms=s;break}Ms=t.return}}function Pr(s,t,e){var a=e.flags;switch(e.tag){case 0:case 11:case 15:Gt(s,e),a&4&&en(5,e);break;case 1:if(Gt(s,e),a&4)if(s=e.stateNode,t===null)try{s.componentDidMount()}catch(i){ls(e,e.return,i)}else{var n=je(e.type,t.memoizedProps);t=t.memoizedState;try{s.componentDidUpdate(n,t,s.__reactInternalSnapshotBeforeUpdate)}catch(i){ls(e,e.return,i)}}a&64&&Qr(e),a&512&&an(e,e.return);break;case 3:if(Gt(s,e),a&64&&(s=e.updateQueue,s!==null)){if(t=null,e.child!==null)switch(e.child.tag){case 27:case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}try{Hc(s,t)}catch(i){ls(e,e.return,i)}}break;case 27:t===null&&a&4&&Ir(e);case 26:case 5:Gt(s,e),t===null&&a&4&&Fr(e),a&512&&an(e,e.return);break;case 12:Gt(s,e);break;case 31:Gt(s,e),a&4&&tu(s,e);break;case 13:Gt(s,e),a&4&&eu(s,e),a&64&&(s=e.memoizedState,s!==null&&(s=s.dehydrated,s!==null&&(e=__.bind(null,e),N_(s,e))));break;case 22:if(a=e.memoizedState!==null||Zt,!a){t=t!==null&&t.memoizedState!==null||xs,n=Zt;var l=xs;Zt=a,(xs=t)&&!l?Xt(s,e,(e.subtreeFlags&8772)!==0):Gt(s,e),Zt=n,xs=l}break;case 30:break;default:Gt(s,e)}}function $r(s){var t=s.alternate;t!==null&&(s.alternate=null,$r(t)),s.child=null,s.deletions=null,s.sibling=null,s.tag===5&&(t=s.stateNode,t!==null&&$l(t)),s.stateNode=null,s.return=null,s.dependencies=null,s.memoizedProps=null,s.memoizedState=null,s.pendingProps=null,s.stateNode=null,s.updateQueue=null}var _s=null,Xs=!1;function Yt(s,t,e){for(e=e.child;e!==null;)su(s,t,e),e=e.sibling}function su(s,t,e){if(Ps&&typeof Ps.onCommitFiberUnmount=="function")try{Ps.onCommitFiberUnmount(Da,e)}catch{}switch(e.tag){case 26:xs||Dt(e,t),Yt(s,t,e),e.memoizedState?e.memoizedState.count--:e.stateNode&&(e=e.stateNode,e.parentNode.removeChild(e));break;case 27:xs||Dt(e,t);var a=_s,n=Xs;fe(e.type)&&(_s=e.stateNode,Xs=!1),Yt(s,t,e),pn(e.stateNode),_s=a,Xs=n;break;case 5:xs||Dt(e,t);case 6:if(a=_s,n=Xs,_s=null,Yt(s,t,e),_s=a,Xs=n,_s!==null)if(Xs)try{(_s.nodeType===9?_s.body:_s.nodeName==="HTML"?_s.ownerDocument.body:_s).removeChild(e.stateNode)}catch(l){ls(e,t,l)}else try{_s.removeChild(e.stateNode)}catch(l){ls(e,t,l)}break;case 18:_s!==null&&(Xs?(s=_s,Qu(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,e.stateNode),Sa(s)):Qu(_s,e.stateNode));break;case 4:a=_s,n=Xs,_s=e.stateNode.containerInfo,Xs=!0,Yt(s,t,e),_s=a,Xs=n;break;case 0:case 11:case 14:case 15:oe(2,e,t),xs||oe(4,e,t),Yt(s,t,e);break;case 1:xs||(Dt(e,t),a=e.stateNode,typeof a.componentWillUnmount=="function"&&Kr(e,t,a)),Yt(s,t,e);break;case 21:Yt(s,t,e);break;case 22:xs=(a=xs)||e.memoizedState!==null,Yt(s,t,e),xs=a;break;default:Yt(s,t,e)}}function tu(s,t){if(t.memoizedState===null&&(s=t.alternate,s!==null&&(s=s.memoizedState,s!==null))){s=s.dehydrated;try{Sa(s)}catch(e){ls(t,t.return,e)}}}function eu(s,t){if(t.memoizedState===null&&(s=t.alternate,s!==null&&(s=s.memoizedState,s!==null&&(s=s.dehydrated,s!==null))))try{Sa(s)}catch(e){ls(t,t.return,e)}}function i_(s){switch(s.tag){case 31:case 13:case 19:var t=s.stateNode;return t===null&&(t=s.stateNode=new Wr),t;case 22:return s=s.stateNode,t=s._retryCache,t===null&&(t=s._retryCache=new Wr),t;default:throw Error(_(435,s.tag))}}function _l(s,t){var e=i_(s);t.forEach(function(a){if(!e.has(a)){e.add(a);var n=f_.bind(null,s,a);a.then(n,n)}})}function Qs(s,t){var e=t.deletions;if(e!==null)for(var a=0;a<e.length;a++){var n=e[a],l=s,i=t,d=i;s:for(;d!==null;){switch(d.tag){case 27:if(fe(d.type)){_s=d.stateNode,Xs=!1;break s}break;case 5:_s=d.stateNode,Xs=!1;break s;case 3:case 4:_s=d.stateNode.containerInfo,Xs=!0;break s}d=d.return}if(_s===null)throw Error(_(160));su(l,i,n),_s=null,Xs=!1,l=n.alternate,l!==null&&(l.return=null),n.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)au(t,s),t=t.sibling}var wt=null;function au(s,t){var e=s.alternate,a=s.flags;switch(s.tag){case 0:case 11:case 14:case 15:Qs(t,s),Ks(s),a&4&&(oe(3,s,s.return),en(3,s),oe(5,s,s.return));break;case 1:Qs(t,s),Ks(s),a&512&&(xs||e===null||Dt(e,e.return)),a&64&&Zt&&(s=s.updateQueue,s!==null&&(a=s.callbacks,a!==null&&(e=s.shared.hiddenCallbacks,s.shared.hiddenCallbacks=e===null?a:e.concat(a))));break;case 26:var n=wt;if(Qs(t,s),Ks(s),a&512&&(xs||e===null||Dt(e,e.return)),a&4){var l=e!==null?e.memoizedState:null;if(a=s.memoizedState,e===null)if(a===null)if(s.stateNode===null){s:{a=s.type,e=s.memoizedProps,n=n.ownerDocument||n;t:switch(a){case"title":l=n.getElementsByTagName("title")[0],(!l||l[Ta]||l[Ds]||l.namespaceURI==="http://www.w3.org/2000/svg"||l.hasAttribute("itemprop"))&&(l=n.createElement(a),n.head.insertBefore(l,n.querySelector("head > title"))),Es(l,a,e),l[Ds]=s,Ss(l),a=l;break s;case"link":var i=av("link","href",n).get(a+(e.href||""));if(i){for(var d=0;d<i.length;d++)if(l=i[d],l.getAttribute("href")===(e.href==null||e.href===""?null:e.href)&&l.getAttribute("rel")===(e.rel==null?null:e.rel)&&l.getAttribute("title")===(e.title==null?null:e.title)&&l.getAttribute("crossorigin")===(e.crossOrigin==null?null:e.crossOrigin)){i.splice(d,1);break t}}l=n.createElement(a),Es(l,a,e),n.head.appendChild(l);break;case"meta":if(i=av("meta","content",n).get(a+(e.content||""))){for(d=0;d<i.length;d++)if(l=i[d],l.getAttribute("content")===(e.content==null?null:""+e.content)&&l.getAttribute("name")===(e.name==null?null:e.name)&&l.getAttribute("property")===(e.property==null?null:e.property)&&l.getAttribute("http-equiv")===(e.httpEquiv==null?null:e.httpEquiv)&&l.getAttribute("charset")===(e.charSet==null?null:e.charSet)){i.splice(d,1);break t}}l=n.createElement(a),Es(l,a,e),n.head.appendChild(l);break;default:throw Error(_(468,a))}l[Ds]=s,Ss(l),a=l}s.stateNode=a}else nv(n,s.type,s.stateNode);else s.stateNode=ev(n,a,s.memoizedProps);else l!==a?(l===null?e.stateNode!==null&&(e=e.stateNode,e.parentNode.removeChild(e)):l.count--,a===null?nv(n,s.type,s.stateNode):ev(n,a,s.memoizedProps)):a===null&&s.stateNode!==null&&wd(s,s.memoizedProps,e.memoizedProps)}break;case 27:Qs(t,s),Ks(s),a&512&&(xs||e===null||Dt(e,e.return)),e!==null&&a&4&&wd(s,s.memoizedProps,e.memoizedProps);break;case 5:if(Qs(t,s),Ks(s),a&512&&(xs||e===null||Dt(e,e.return)),s.flags&32){n=s.stateNode;try{Fe(n,"")}catch(E){ls(s,s.return,E)}}a&4&&s.stateNode!=null&&(n=s.memoizedProps,wd(s,n,e!==null?e.memoizedProps:n)),a&1024&&(xd=!0);break;case 6:if(Qs(t,s),Ks(s),a&4){if(s.stateNode===null)throw Error(_(162));a=s.memoizedProps,e=s.stateNode;try{e.nodeValue=a}catch(E){ls(s,s.return,E)}}break;case 3:if(Tl=null,n=wt,wt=Ll(t.containerInfo),Qs(t,s),wt=n,Ks(s),a&4&&e!==null&&e.memoizedState.isDehydrated)try{Sa(t.containerInfo)}catch(E){ls(s,s.return,E)}xd&&(xd=!1,nu(s));break;case 4:a=wt,wt=Ll(s.stateNode.containerInfo),Qs(t,s),Ks(s),wt=a;break;case 12:Qs(t,s),Ks(s);break;case 31:Qs(t,s),Ks(s),a&4&&(a=s.updateQueue,a!==null&&(s.updateQueue=null,_l(s,a)));break;case 13:Qs(t,s),Ks(s),s.child.flags&8192&&s.memoizedState!==null!=(e!==null&&e.memoizedState!==null)&&(hl=Ws()),a&4&&(a=s.updateQueue,a!==null&&(s.updateQueue=null,_l(s,a)));break;case 22:n=s.memoizedState!==null;var o=e!==null&&e.memoizedState!==null,h=Zt,m=xs;if(Zt=h||n,xs=m||o,Qs(t,s),xs=m,Zt=h,Ks(s),a&8192)s:for(t=s.stateNode,t._visibility=n?t._visibility&-2:t._visibility|1,n&&(e===null||o||Zt||xs||Re(s)),e=null,t=s;;){if(t.tag===5||t.tag===26){if(e===null){o=e=t;try{if(l=o.stateNode,n)i=l.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none";else{d=o.stateNode;var y=o.memoizedProps.style,g=y!=null&&y.hasOwnProperty("display")?y.display:null;d.style.display=g==null||typeof g=="boolean"?"":(""+g).trim()}}catch(E){ls(o,o.return,E)}}}else if(t.tag===6){if(e===null){o=t;try{o.stateNode.nodeValue=n?"":o.memoizedProps}catch(E){ls(o,o.return,E)}}}else if(t.tag===18){if(e===null){o=t;try{var b=o.stateNode;n?Ku(b,!0):Ku(o.stateNode,!1)}catch(E){ls(o,o.return,E)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===s)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===s)break s;for(;t.sibling===null;){if(t.return===null||t.return===s)break s;e===t&&(e=null),t=t.return}e===t&&(e=null),t.sibling.return=t.return,t=t.sibling}a&4&&(a=s.updateQueue,a!==null&&(e=a.retryQueue,e!==null&&(a.retryQueue=null,_l(s,e))));break;case 19:Qs(t,s),Ks(s),a&4&&(a=s.updateQueue,a!==null&&(s.updateQueue=null,_l(s,a)));break;case 30:break;case 21:break;default:Qs(t,s),Ks(s)}}function Ks(s){var t=s.flags;if(t&2){try{for(var e,a=s.return;a!==null;){if(Jr(a)){e=a;break}a=a.return}if(e==null)throw Error(_(160));switch(e.tag){case 27:var n=e.stateNode,l=kd(s);pl(s,l,n);break;case 5:var i=e.stateNode;e.flags&32&&(Fe(i,""),e.flags&=-33);var d=kd(s);pl(s,d,i);break;case 3:case 4:var o=e.stateNode.containerInfo,h=kd(s);yd(s,h,o);break;default:throw Error(_(161))}}catch(m){ls(s,s.return,m)}s.flags&=-3}t&4096&&(s.flags&=-4097)}function nu(s){if(s.subtreeFlags&1024)for(s=s.child;s!==null;){var t=s;nu(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),s=s.sibling}}function Gt(s,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Pr(s,t.alternate,t),t=t.sibling}function Re(s){for(s=s.child;s!==null;){var t=s;switch(t.tag){case 0:case 11:case 14:case 15:oe(4,t,t.return),Re(t);break;case 1:Dt(t,t.return);var e=t.stateNode;typeof e.componentWillUnmount=="function"&&Kr(t,t.return,e),Re(t);break;case 27:pn(t.stateNode);case 26:case 5:Dt(t,t.return),Re(t);break;case 22:t.memoizedState===null&&Re(t);break;case 30:Re(t);break;default:Re(t)}s=s.sibling}}function Xt(s,t,e){for(e=e&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var a=t.alternate,n=s,l=t,i=l.flags;switch(l.tag){case 0:case 11:case 15:Xt(n,l,e),en(4,l);break;case 1:if(Xt(n,l,e),a=l,n=a.stateNode,typeof n.componentDidMount=="function")try{n.componentDidMount()}catch(h){ls(a,a.return,h)}if(a=l,n=a.updateQueue,n!==null){var d=a.stateNode;try{var o=n.shared.hiddenCallbacks;if(o!==null)for(n.shared.hiddenCallbacks=null,n=0;n<o.length;n++)Oc(o[n],d)}catch(h){ls(a,a.return,h)}}e&&i&64&&Qr(l),an(l,l.return);break;case 27:Ir(l);case 26:case 5:Xt(n,l,e),e&&a===null&&i&4&&Fr(l),an(l,l.return);break;case 12:Xt(n,l,e);break;case 31:Xt(n,l,e),e&&i&4&&tu(n,l);break;case 13:Xt(n,l,e),e&&i&4&&eu(n,l);break;case 22:l.memoizedState===null&&Xt(n,l,e),an(l,l.return);break;case 30:break;default:Xt(n,l,e)}t=t.sibling}}function Cd(s,t){var e=null;s!==null&&s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(e=s.memoizedState.cachePool.pool),s=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(s=t.memoizedState.cachePool.pool),s!==e&&(s!=null&&s.refCount++,e!=null&&Ya(e))}function Sd(s,t){s=null,t.alternate!==null&&(s=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==s&&(t.refCount++,s!=null&&Ya(s))}function kt(s,t,e,a){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)lu(s,t,e,a),t=t.sibling}function lu(s,t,e,a){var n=t.flags;switch(t.tag){case 0:case 11:case 15:kt(s,t,e,a),n&2048&&en(9,t);break;case 1:kt(s,t,e,a);break;case 3:kt(s,t,e,a),n&2048&&(s=null,t.alternate!==null&&(s=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==s&&(t.refCount++,s!=null&&Ya(s)));break;case 12:if(n&2048){kt(s,t,e,a),s=t.stateNode;try{var l=t.memoizedProps,i=l.id,d=l.onPostCommit;typeof d=="function"&&d(i,t.alternate===null?"mount":"update",s.passiveEffectDuration,-0)}catch(o){ls(t,t.return,o)}}else kt(s,t,e,a);break;case 31:kt(s,t,e,a);break;case 13:kt(s,t,e,a);break;case 23:break;case 22:l=t.stateNode,i=t.alternate,t.memoizedState!==null?l._visibility&2?kt(s,t,e,a):nn(s,t):l._visibility&2?kt(s,t,e,a):(l._visibility|=2,_a(s,t,e,a,(t.subtreeFlags&10256)!==0||!1)),n&2048&&Cd(i,t);break;case 24:kt(s,t,e,a),n&2048&&Sd(t.alternate,t);break;default:kt(s,t,e,a)}}function _a(s,t,e,a,n){for(n=n&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var l=s,i=t,d=e,o=a,h=i.flags;switch(i.tag){case 0:case 11:case 15:_a(l,i,d,o,n),en(8,i);break;case 23:break;case 22:var m=i.stateNode;i.memoizedState!==null?m._visibility&2?_a(l,i,d,o,n):nn(l,i):(m._visibility|=2,_a(l,i,d,o,n)),n&&h&2048&&Cd(i.alternate,i);break;case 24:_a(l,i,d,o,n),n&&h&2048&&Sd(i.alternate,i);break;default:_a(l,i,d,o,n)}t=t.sibling}}function nn(s,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var e=s,a=t,n=a.flags;switch(a.tag){case 22:nn(e,a),n&2048&&Cd(a.alternate,a);break;case 24:nn(e,a),n&2048&&Sd(a.alternate,a);break;default:nn(e,a)}t=t.sibling}}var ln=8192;function fa(s,t,e){if(s.subtreeFlags&ln)for(s=s.child;s!==null;)iu(s,t,e),s=s.sibling}function iu(s,t,e){switch(s.tag){case 26:fa(s,t,e),s.flags&ln&&s.memoizedState!==null&&Q_(e,wt,s.memoizedState,s.memoizedProps);break;case 5:fa(s,t,e);break;case 3:case 4:var a=wt;wt=Ll(s.stateNode.containerInfo),fa(s,t,e),wt=a;break;case 22:s.memoizedState===null&&(a=s.alternate,a!==null&&a.memoizedState!==null?(a=ln,ln=16777216,fa(s,t,e),ln=a):fa(s,t,e));break;default:fa(s,t,e)}}function du(s){var t=s.alternate;if(t!==null&&(s=t.child,s!==null)){t.child=null;do t=s.sibling,s.sibling=null,s=t;while(s!==null)}}function dn(s){var t=s.deletions;if((s.flags&16)!==0){if(t!==null)for(var e=0;e<t.length;e++){var a=t[e];Ms=a,cu(a,s)}du(s)}if(s.subtreeFlags&10256)for(s=s.child;s!==null;)ou(s),s=s.sibling}function ou(s){switch(s.tag){case 0:case 11:case 15:dn(s),s.flags&2048&&oe(9,s,s.return);break;case 3:dn(s);break;case 12:dn(s);break;case 22:var t=s.stateNode;s.memoizedState!==null&&t._visibility&2&&(s.return===null||s.return.tag!==13)?(t._visibility&=-3,fl(s)):dn(s);break;default:dn(s)}}function fl(s){var t=s.deletions;if((s.flags&16)!==0){if(t!==null)for(var e=0;e<t.length;e++){var a=t[e];Ms=a,cu(a,s)}du(s)}for(s=s.child;s!==null;){switch(t=s,t.tag){case 0:case 11:case 15:oe(8,t,t.return),fl(t);break;case 22:e=t.stateNode,e._visibility&2&&(e._visibility&=-3,fl(t));break;default:fl(t)}s=s.sibling}}function cu(s,t){for(;Ms!==null;){var e=Ms;switch(e.tag){case 0:case 11:case 15:oe(8,e,t);break;case 23:case 22:if(e.memoizedState!==null&&e.memoizedState.cachePool!==null){var a=e.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:Ya(e.memoizedState.cache)}if(a=e.child,a!==null)a.return=e,Ms=a;else s:for(e=s;Ms!==null;){a=Ms;var n=a.sibling,l=a.return;if($r(a),a===e){Ms=null;break s}if(n!==null){n.return=l,Ms=n;break s}Ms=l}}}var d_={getCacheForType:function(s){var t=Bs(ws),e=t.data.get(s);return e===void 0&&(e=s(),t.data.set(s,e)),e},cacheSignal:function(){return Bs(ws).controller.signal}},o_=typeof WeakMap=="function"?WeakMap:Map,es=0,us=null,K=null,J=0,ns=0,nt=null,ce=!1,ha=!1,Md=!1,Qt=0,hs=0,re=0,Ue=0,Dd=0,lt=0,ga=0,on=null,Fs=null,Ld=!1,hl=0,ru=0,gl=1/0,bl=null,ue=null,Cs=0,ve=null,ba=null,Kt=0,Bd=0,Td=null,uu=null,cn=0,Ed=null;function it(){return(es&2)!==0&&J!==0?J&-J:w.T!==null?Vd():Do()}function vu(){if(lt===0)if((J&536870912)===0||P){var s=Mn;Mn<<=1,(Mn&3932160)===0&&(Mn=262144),lt=s}else lt=536870912;return s=et.current,s!==null&&(s.flags|=32),lt}function Js(s,t,e){(s===us&&(ns===2||ns===9)||s.cancelPendingCommit!==null)&&(ma(s,0),pe(s,J,lt,!1)),Ba(s,e),((es&2)===0||s!==us)&&(s===us&&((es&2)===0&&(Ue|=e),hs===4&&pe(s,J,lt,!1)),Lt(s))}function pu(s,t,e){if((es&6)!==0)throw Error(_(327));var a=!e&&(t&127)===0&&(t&s.expiredLanes)===0||La(s,t),n=a?u_(s,t):zd(s,t,!0),l=a;do{if(n===0){ha&&!a&&pe(s,t,0,!1);break}else{if(e=s.current.alternate,l&&!c_(e)){n=zd(s,t,!1),l=!1;continue}if(n===2){if(l=t,s.errorRecoveryDisabledLanes&l)var i=0;else i=s.pendingLanes&-536870913,i=i!==0?i:i&536870912?536870912:0;if(i!==0){t=i;s:{var d=s;n=on;var o=d.current.memoizedState.isDehydrated;if(o&&(ma(d,i).flags|=256),i=zd(d,i,!1),i!==2){if(Md&&!o){d.errorRecoveryDisabledLanes|=l,Ue|=l,n=4;break s}l=Fs,Fs=n,l!==null&&(Fs===null?Fs=l:Fs.push.apply(Fs,l))}n=i}if(l=!1,n!==2)continue}}if(n===1){ma(s,0),pe(s,t,0,!0);break}s:{switch(a=s,l=n,l){case 0:case 1:throw Error(_(345));case 4:if((t&4194048)!==t)break;case 6:pe(a,t,lt,!ce);break s;case 2:Fs=null;break;case 3:case 5:break;default:throw Error(_(329))}if((t&62914560)===t&&(n=hl+300-Ws(),10<n)){if(pe(a,t,lt,!ce),Ln(a,0,!0)!==0)break s;Kt=t,a.timeoutHandle=Gu(_u.bind(null,a,e,Fs,bl,Ld,t,lt,Ue,ga,ce,l,"Throttled",-0,0),n);break s}_u(a,e,Fs,bl,Ld,t,lt,Ue,ga,ce,l,null,-0,0)}}break}while(!0);Lt(s)}function _u(s,t,e,a,n,l,i,d,o,h,m,y,g,b){if(s.timeoutHandle=-1,y=t.subtreeFlags,y&8192||(y&16785408)===16785408){y={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:At},iu(t,l,y);var E=(l&62914560)===l?hl-Ws():(l&4194048)===l?ru-Ws():0;if(E=K_(y,E),E!==null){Kt=l,s.cancelPendingCommit=E(yu.bind(null,s,t,l,e,a,n,i,d,o,m,y,null,g,b)),pe(s,l,i,!h);return}}yu(s,t,l,e,a,n,i,d,o)}function c_(s){for(var t=s;;){var e=t.tag;if((e===0||e===11||e===15)&&t.flags&16384&&(e=t.updateQueue,e!==null&&(e=e.stores,e!==null)))for(var a=0;a<e.length;a++){var n=e[a],l=n.getSnapshot;n=n.value;try{if(!st(l(),n))return!1}catch{return!1}}if(e=t.child,t.subtreeFlags&16384&&e!==null)e.return=t,t=e;else{if(t===s)break;for(;t.sibling===null;){if(t.return===null||t.return===s)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function pe(s,t,e,a){t&=~Dd,t&=~Ue,s.suspendedLanes|=t,s.pingedLanes&=~t,a&&(s.warmLanes|=t),a=s.expirationTimes;for(var n=t;0<n;){var l=31-$s(n),i=1<<l;a[l]=-1,n&=~i}e!==0&&Co(s,e,t)}function ml(){return(es&6)===0?(rn(0),!1):!0}function Ad(){if(K!==null){if(ns===0)var s=K.return;else s=K,Ht=Ee=null,Fi(s),ca=null,Xa=0,s=K;for(;s!==null;)Xr(s.alternate,s),s=s.return;K=null}}function ma(s,t){var e=s.timeoutHandle;e!==-1&&(s.timeoutHandle=-1,B_(e)),e=s.cancelPendingCommit,e!==null&&(s.cancelPendingCommit=null,e()),Kt=0,Ad(),us=s,K=e=Nt(s.current,null),J=t,ns=0,nt=null,ce=!1,ha=La(s,t),Md=!1,ga=lt=Dd=Ue=re=hs=0,Fs=on=null,Ld=!1,(t&8)!==0&&(t|=t&32);var a=s.entangledLanes;if(a!==0)for(s=s.entanglements,a&=t;0<a;){var n=31-$s(a),l=1<<n;t|=s[n],a&=~l}return Qt=t,Un(),e}function fu(s,t){G=null,w.H=$a,t===oa||t===Fn?(t=Ec(),ns=3):t===Hi?(t=Ec(),ns=4):ns=t===rd?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,nt=t,K===null&&(hs=1,ol(s,ut(t,s.current)))}function hu(){var s=et.current;return s===null?!0:(J&4194048)===J?ft===null:(J&62914560)===J||(J&536870912)!==0?s===ft:!1}function gu(){var s=w.H;return w.H=$a,s===null?$a:s}function bu(){var s=w.A;return w.A=d_,s}function wl(){hs=4,ce||(J&4194048)!==J&&et.current!==null||(ha=!0),(re&134217727)===0&&(Ue&134217727)===0||us===null||pe(us,J,lt,!1)}function zd(s,t,e){var a=es;es|=2;var n=gu(),l=bu();(us!==s||J!==t)&&(bl=null,ma(s,t)),t=!1;var i=hs;s:do try{if(ns!==0&&K!==null){var d=K,o=nt;switch(ns){case 8:Ad(),i=6;break s;case 3:case 2:case 9:case 6:et.current===null&&(t=!0);var h=ns;if(ns=0,nt=null,wa(s,d,o,h),e&&ha){i=0;break s}break;default:h=ns,ns=0,nt=null,wa(s,d,o,h)}}r_(),i=hs;break}catch(m){fu(s,m)}while(!0);return t&&s.shellSuspendCounter++,Ht=Ee=null,es=a,w.H=n,w.A=l,K===null&&(us=null,J=0,Un()),i}function r_(){for(;K!==null;)mu(K)}function u_(s,t){var e=es;es|=2;var a=gu(),n=bu();us!==s||J!==t?(bl=null,gl=Ws()+500,ma(s,t)):ha=La(s,t);s:do try{if(ns!==0&&K!==null){t=K;var l=nt;t:switch(ns){case 1:ns=0,nt=null,wa(s,t,l,1);break;case 2:case 9:if(Bc(l)){ns=0,nt=null,wu(t);break}t=function(){ns!==2&&ns!==9||us!==s||(ns=7),Lt(s)},l.then(t,t);break s;case 3:ns=7;break s;case 4:ns=5;break s;case 7:Bc(l)?(ns=0,nt=null,wu(t)):(ns=0,nt=null,wa(s,t,l,7));break;case 5:var i=null;switch(K.tag){case 26:i=K.memoizedState;case 5:case 27:var d=K;if(i?lv(i):d.stateNode.complete){ns=0,nt=null;var o=d.sibling;if(o!==null)K=o;else{var h=d.return;h!==null?(K=h,kl(h)):K=null}break t}}ns=0,nt=null,wa(s,t,l,5);break;case 6:ns=0,nt=null,wa(s,t,l,6);break;case 8:Ad(),hs=6;break s;default:throw Error(_(462))}}v_();break}catch(m){fu(s,m)}while(!0);return Ht=Ee=null,w.H=a,w.A=n,es=e,K!==null?0:(us=null,J=0,Un(),hs)}function v_(){for(;K!==null&&!Ov();)mu(K)}function mu(s){var t=Yr(s.alternate,s,Qt);s.memoizedProps=s.pendingProps,t===null?kl(s):K=t}function wu(s){var t=s,e=t.alternate;switch(t.tag){case 15:case 0:t=Vr(e,t,t.pendingProps,t.type,void 0,J);break;case 11:t=Vr(e,t,t.pendingProps,t.type.render,t.ref,J);break;case 5:Fi(t);default:Xr(e,t),t=K=bc(t,Qt),t=Yr(e,t,Qt)}s.memoizedProps=s.pendingProps,t===null?kl(s):K=t}function wa(s,t,e,a){Ht=Ee=null,Fi(t),ca=null,Xa=0;var n=t.return;try{if(s_(s,n,t,e,J)){hs=1,ol(s,ut(e,s.current)),K=null;return}}catch(l){if(n!==null)throw K=n,l;hs=1,ol(s,ut(e,s.current)),K=null;return}t.flags&32768?(P||a===1?s=!0:ha||(J&536870912)!==0?s=!1:(ce=s=!0,(a===2||a===9||a===3||a===6)&&(a=et.current,a!==null&&a.tag===13&&(a.flags|=16384))),ku(t,s)):kl(t)}function kl(s){var t=s;do{if((t.flags&32768)!==0){ku(t,ce);return}s=t.return;var e=a_(t.alternate,t,Qt);if(e!==null){K=e;return}if(t=t.sibling,t!==null){K=t;return}K=t=s}while(t!==null);hs===0&&(hs=5)}function ku(s,t){do{var e=n_(s.alternate,s);if(e!==null){e.flags&=32767,K=e;return}if(e=s.return,e!==null&&(e.flags|=32768,e.subtreeFlags=0,e.deletions=null),!t&&(s=s.sibling,s!==null)){K=s;return}K=s=e}while(s!==null);hs=6,K=null}function yu(s,t,e,a,n,l,i,d,o){s.cancelPendingCommit=null;do yl();while(Cs!==0);if((es&6)!==0)throw Error(_(327));if(t!==null){if(t===s.current)throw Error(_(177));if(l=t.lanes|t.childLanes,l|=ki,Xv(s,e,l,i,d,o),s===us&&(K=us=null,J=0),ba=t,ve=s,Kt=e,Bd=l,Td=n,uu=a,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(s.callbackNode=null,s.callbackPriority=0,h_(Cn,function(){return Du(),null})):(s.callbackNode=null,s.callbackPriority=0),a=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||a){a=w.T,w.T=null,n=L.p,L.p=2,i=es,es|=4;try{l_(s,t,e)}finally{es=i,L.p=n,w.T=a}}Cs=1,xu(),Cu(),Su()}}function xu(){if(Cs===1){Cs=0;var s=ve,t=ba,e=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||e){e=w.T,w.T=null;var a=L.p;L.p=2;var n=es;es|=4;try{au(t,s);var l=Xd,i=cc(s.containerInfo),d=l.focusedElem,o=l.selectionRange;if(i!==d&&d&&d.ownerDocument&&oc(d.ownerDocument.documentElement,d)){if(o!==null&&hi(d)){var h=o.start,m=o.end;if(m===void 0&&(m=h),"selectionStart"in d)d.selectionStart=h,d.selectionEnd=Math.min(m,d.value.length);else{var y=d.ownerDocument||document,g=y&&y.defaultView||window;if(g.getSelection){var b=g.getSelection(),E=d.textContent.length,U=Math.min(o.start,E),cs=o.end===void 0?U:Math.min(o.end,E);!b.extend&&U>cs&&(i=cs,cs=U,U=i);var p=dc(d,U),r=dc(d,cs);if(p&&r&&(b.rangeCount!==1||b.anchorNode!==p.node||b.anchorOffset!==p.offset||b.focusNode!==r.node||b.focusOffset!==r.offset)){var f=y.createRange();f.setStart(p.node,p.offset),b.removeAllRanges(),U>cs?(b.addRange(f),b.extend(r.node,r.offset)):(f.setEnd(r.node,r.offset),b.addRange(f))}}}}for(y=[],b=d;b=b.parentNode;)b.nodeType===1&&y.push({element:b,left:b.scrollLeft,top:b.scrollTop});for(typeof d.focus=="function"&&d.focus(),d=0;d<y.length;d++){var k=y[d];k.element.scrollLeft=k.left,k.element.scrollTop=k.top}}Nl=!!Gd,Xd=Gd=null}finally{es=n,L.p=a,w.T=e}}s.current=t,Cs=2}}function Cu(){if(Cs===2){Cs=0;var s=ve,t=ba,e=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||e){e=w.T,w.T=null;var a=L.p;L.p=2;var n=es;es|=4;try{Pr(s,t.alternate,t)}finally{es=n,L.p=a,w.T=e}}Cs=3}}function Su(){if(Cs===4||Cs===3){Cs=0,Hv();var s=ve,t=ba,e=Kt,a=uu;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Cs=5:(Cs=0,ba=ve=null,Mu(s,s.pendingLanes));var n=s.pendingLanes;if(n===0&&(ue=null),Wl(e),t=t.stateNode,Ps&&typeof Ps.onCommitFiberRoot=="function")try{Ps.onCommitFiberRoot(Da,t,void 0,(t.current.flags&128)===128)}catch{}if(a!==null){t=w.T,n=L.p,L.p=2,w.T=null;try{for(var l=s.onRecoverableError,i=0;i<a.length;i++){var d=a[i];l(d.value,{componentStack:d.stack})}}finally{w.T=t,L.p=n}}(Kt&3)!==0&&yl(),Lt(s),n=s.pendingLanes,(e&261930)!==0&&(n&42)!==0?s===Ed?cn++:(cn=0,Ed=s):cn=0,rn(0)}}function Mu(s,t){(s.pooledCacheLanes&=t)===0&&(t=s.pooledCache,t!=null&&(s.pooledCache=null,Ya(t)))}function yl(){return xu(),Cu(),Su(),Du()}function Du(){if(Cs!==5)return!1;var s=ve,t=Bd;Bd=0;var e=Wl(Kt),a=w.T,n=L.p;try{L.p=32>e?32:e,w.T=null,e=Td,Td=null;var l=ve,i=Kt;if(Cs=0,ba=ve=null,Kt=0,(es&6)!==0)throw Error(_(331));var d=es;if(es|=4,ou(l.current),lu(l,l.current,i,e),es=d,rn(0,!1),Ps&&typeof Ps.onPostCommitFiberRoot=="function")try{Ps.onPostCommitFiberRoot(Da,l)}catch{}return!0}finally{L.p=n,w.T=a,Mu(s,t)}}function Lu(s,t,e){t=ut(e,t),t=cd(s.stateNode,t,2),s=le(s,t,2),s!==null&&(Ba(s,2),Lt(s))}function ls(s,t,e){if(s.tag===3)Lu(s,s,e);else for(;t!==null;){if(t.tag===3){Lu(t,s,e);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(ue===null||!ue.has(a))){s=ut(e,s),e=Br(2),a=le(t,e,2),a!==null&&(Tr(e,a,t,s),Ba(a,2),Lt(a));break}}t=t.return}}function Nd(s,t,e){var a=s.pingCache;if(a===null){a=s.pingCache=new o_;var n=new Set;a.set(t,n)}else n=a.get(t),n===void 0&&(n=new Set,a.set(t,n));n.has(e)||(Md=!0,n.add(e),s=p_.bind(null,s,t,e),t.then(s,s))}function p_(s,t,e){var a=s.pingCache;a!==null&&a.delete(t),s.pingedLanes|=s.suspendedLanes&e,s.warmLanes&=~e,us===s&&(J&e)===e&&(hs===4||hs===3&&(J&62914560)===J&&300>Ws()-hl?(es&2)===0&&ma(s,0):Dd|=e,ga===J&&(ga=0)),Lt(s)}function Bu(s,t){t===0&&(t=xo()),s=Le(s,t),s!==null&&(Ba(s,t),Lt(s))}function __(s){var t=s.memoizedState,e=0;t!==null&&(e=t.retryLane),Bu(s,e)}function f_(s,t){var e=0;switch(s.tag){case 31:case 13:var a=s.stateNode,n=s.memoizedState;n!==null&&(e=n.retryLane);break;case 19:a=s.stateNode;break;case 22:a=s.stateNode._retryCache;break;default:throw Error(_(314))}a!==null&&a.delete(t),Bu(s,e)}function h_(s,t){return Kl(s,t)}var xl=null,ka=null,Od=!1,Cl=!1,Hd=!1,_e=0;function Lt(s){s!==ka&&s.next===null&&(ka===null?xl=ka=s:ka=ka.next=s),Cl=!0,Od||(Od=!0,b_())}function rn(s,t){if(!Hd&&Cl){Hd=!0;do for(var e=!1,a=xl;a!==null;){if(s!==0){var n=a.pendingLanes;if(n===0)var l=0;else{var i=a.suspendedLanes,d=a.pingedLanes;l=(1<<31-$s(42|s)+1)-1,l&=n&~(i&~d),l=l&201326741?l&201326741|1:l?l|2:0}l!==0&&(e=!0,zu(a,l))}else l=J,l=Ln(a,a===us?l:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(l&3)===0||La(a,l)||(e=!0,zu(a,l));a=a.next}while(e);Hd=!1}}function g_(){Tu()}function Tu(){Cl=Od=!1;var s=0;_e!==0&&L_()&&(s=_e);for(var t=Ws(),e=null,a=xl;a!==null;){var n=a.next,l=Eu(a,t);l===0?(a.next=null,e===null?xl=n:e.next=n,n===null&&(ka=e)):(e=a,(s!==0||(l&3)!==0)&&(Cl=!0)),a=n}Cs!==0&&Cs!==5||rn(s),_e!==0&&(_e=0)}function Eu(s,t){for(var e=s.suspendedLanes,a=s.pingedLanes,n=s.expirationTimes,l=s.pendingLanes&-62914561;0<l;){var i=31-$s(l),d=1<<i,o=n[i];o===-1?((d&e)===0||(d&a)!==0)&&(n[i]=Gv(d,t)):o<=t&&(s.expiredLanes|=d),l&=~d}if(t=us,e=J,e=Ln(s,s===t?e:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),a=s.callbackNode,e===0||s===t&&(ns===2||ns===9)||s.cancelPendingCommit!==null)return a!==null&&a!==null&&Fl(a),s.callbackNode=null,s.callbackPriority=0;if((e&3)===0||La(s,e)){if(t=e&-e,t===s.callbackPriority)return t;switch(a!==null&&Fl(a),Wl(e)){case 2:case 8:e=ko;break;case 32:e=Cn;break;case 268435456:e=yo;break;default:e=Cn}return a=Au.bind(null,s),e=Kl(e,a),s.callbackPriority=t,s.callbackNode=e,t}return a!==null&&a!==null&&Fl(a),s.callbackPriority=2,s.callbackNode=null,2}function Au(s,t){if(Cs!==0&&Cs!==5)return s.callbackNode=null,s.callbackPriority=0,null;var e=s.callbackNode;if(yl()&&s.callbackNode!==e)return null;var a=J;return a=Ln(s,s===us?a:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),a===0?null:(pu(s,a,t),Eu(s,Ws()),s.callbackNode!=null&&s.callbackNode===e?Au.bind(null,s):null)}function zu(s,t){if(yl())return null;pu(s,t,!0)}function b_(){T_(function(){(es&6)!==0?Kl(wo,g_):Tu()})}function Vd(){if(_e===0){var s=ia;s===0&&(s=Sn,Sn<<=1,(Sn&261888)===0&&(Sn=256)),_e=s}return _e}function Nu(s){return s==null||typeof s=="symbol"||typeof s=="boolean"?null:typeof s=="function"?s:An(""+s)}function Ou(s,t){var e=t.ownerDocument.createElement("input");return e.name=t.name,e.value=t.value,s.id&&e.setAttribute("form",s.id),t.parentNode.insertBefore(e,t),s=new FormData(s),e.parentNode.removeChild(e),s}function m_(s,t,e,a,n){if(t==="submit"&&e&&e.stateNode===n){var l=Nu((n[Ys]||null).action),i=a.submitter;i&&(t=(t=i[Ys]||null)?Nu(t.formAction):i.getAttribute("formAction"),t!==null&&(l=t,i=null));var d=new Hn("action","action",null,a,n);s.push({event:d,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(_e!==0){var o=i?Ou(n,i):new FormData(n);ad(e,{pending:!0,data:o,method:n.method,action:l},null,o)}}else typeof l=="function"&&(d.preventDefault(),o=i?Ou(n,i):new FormData(n),ad(e,{pending:!0,data:o,method:n.method,action:l},l,o))},currentTarget:n}]})}}for(var jd=0;jd<wi.length;jd++){var Rd=wi[jd],w_=Rd.toLowerCase(),k_=Rd[0].toUpperCase()+Rd.slice(1);mt(w_,"on"+k_)}mt(vc,"onAnimationEnd"),mt(pc,"onAnimationIteration"),mt(_c,"onAnimationStart"),mt("dblclick","onDoubleClick"),mt("focusin","onFocus"),mt("focusout","onBlur"),mt(Vp,"onTransitionRun"),mt(jp,"onTransitionStart"),mt(Rp,"onTransitionCancel"),mt(fc,"onTransitionEnd"),Qe("onMouseEnter",["mouseout","mouseover"]),Qe("onMouseLeave",["mouseout","mouseover"]),Qe("onPointerEnter",["pointerout","pointerover"]),Qe("onPointerLeave",["pointerout","pointerover"]),Ce("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ce("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ce("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ce("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ce("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ce("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var un="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),y_=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(un));function Hu(s,t){t=(t&4)!==0;for(var e=0;e<s.length;e++){var a=s[e],n=a.event;a=a.listeners;s:{var l=void 0;if(t)for(var i=a.length-1;0<=i;i--){var d=a[i],o=d.instance,h=d.currentTarget;if(d=d.listener,o!==l&&n.isPropagationStopped())break s;l=d,n.currentTarget=h;try{l(n)}catch(m){Rn(m)}n.currentTarget=null,l=o}else for(i=0;i<a.length;i++){if(d=a[i],o=d.instance,h=d.currentTarget,d=d.listener,o!==l&&n.isPropagationStopped())break s;l=d,n.currentTarget=h;try{l(n)}catch(m){Rn(m)}n.currentTarget=null,l=o}}}}function F(s,t){var e=t[Pl];e===void 0&&(e=t[Pl]=new Set);var a=s+"__bubble";e.has(a)||(Vu(t,s,2,!1),e.add(a))}function Ud(s,t,e){var a=0;t&&(a|=4),Vu(e,s,a,t)}var Sl="_reactListening"+Math.random().toString(36).slice(2);function qd(s){if(!s[Sl]){s[Sl]=!0,To.forEach(function(e){e!=="selectionchange"&&(y_.has(e)||Ud(e,!1,s),Ud(e,!0,s))});var t=s.nodeType===9?s:s.ownerDocument;t===null||t[Sl]||(t[Sl]=!0,Ud("selectionchange",!1,t))}}function Vu(s,t,e,a){switch(vv(t)){case 2:var n=I_;break;case 8:n=W_;break;default:n=eo}e=n.bind(null,t,e,s),n=void 0,!di||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(n=!0),a?n!==void 0?s.addEventListener(t,e,{capture:!0,passive:n}):s.addEventListener(t,e,!0):n!==void 0?s.addEventListener(t,e,{passive:n}):s.addEventListener(t,e,!1)}function Zd(s,t,e,a,n){var l=a;if((t&1)===0&&(t&2)===0&&a!==null)s:for(;;){if(a===null)return;var i=a.tag;if(i===3||i===4){var d=a.stateNode.containerInfo;if(d===n)break;if(i===4)for(i=a.return;i!==null;){var o=i.tag;if((o===3||o===4)&&i.stateNode.containerInfo===n)return;i=i.return}for(;d!==null;){if(i=Ye(d),i===null)return;if(o=i.tag,o===5||o===6||o===26||o===27){a=l=i;continue s}d=d.parentNode}}a=a.return}Zo(function(){var h=l,m=li(e),y=[];s:{var g=hc.get(s);if(g!==void 0){var b=Hn,E=s;switch(s){case"keypress":if(Nn(e)===0)break s;case"keydown":case"keyup":b=fp;break;case"focusin":E="focus",b=ui;break;case"focusout":E="blur",b=ui;break;case"beforeblur":case"afterblur":b=ui;break;case"click":if(e.button===2)break s;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":b=Xo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":b=ap;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":b=bp;break;case vc:case pc:case _c:b=ip;break;case fc:b=wp;break;case"scroll":case"scrollend":b=tp;break;case"wheel":b=yp;break;case"copy":case"cut":case"paste":b=op;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":b=Ko;break;case"toggle":case"beforetoggle":b=Cp}var U=(t&4)!==0,cs=!U&&(s==="scroll"||s==="scrollend"),p=U?g!==null?g+"Capture":null:g;U=[];for(var r=h,f;r!==null;){var k=r;if(f=k.stateNode,k=k.tag,k!==5&&k!==26&&k!==27||f===null||p===null||(k=Aa(r,p),k!=null&&U.push(vn(r,k,f))),cs)break;r=r.return}0<U.length&&(g=new b(g,E,null,e,m),y.push({event:g,listeners:U}))}}if((t&7)===0){s:{if(g=s==="mouseover"||s==="pointerover",b=s==="mouseout"||s==="pointerout",g&&e!==ni&&(E=e.relatedTarget||e.fromElement)&&(Ye(E)||E[Ze]))break s;if((b||g)&&(g=m.window===m?m:(g=m.ownerDocument)?g.defaultView||g.parentWindow:window,b?(E=e.relatedTarget||e.toElement,b=h,E=E?Ye(E):null,E!==null&&(cs=N(E),U=E.tag,E!==cs||U!==5&&U!==27&&U!==6)&&(E=null)):(b=null,E=h),b!==E)){if(U=Xo,k="onMouseLeave",p="onMouseEnter",r="mouse",(s==="pointerout"||s==="pointerover")&&(U=Ko,k="onPointerLeave",p="onPointerEnter",r="pointer"),cs=b==null?g:Ea(b),f=E==null?g:Ea(E),g=new U(k,r+"leave",b,e,m),g.target=cs,g.relatedTarget=f,k=null,Ye(m)===h&&(U=new U(p,r+"enter",E,e,m),U.target=f,U.relatedTarget=cs,k=U),cs=k,b&&E)t:{for(U=x_,p=b,r=E,f=0,k=p;k;k=U(k))f++;k=0;for(var H=r;H;H=U(H))k++;for(;0<f-k;)p=U(p),f--;for(;0<k-f;)r=U(r),k--;for(;f--;){if(p===r||r!==null&&p===r.alternate){U=p;break t}p=U(p),r=U(r)}U=null}else U=null;b!==null&&ju(y,g,b,U,!1),E!==null&&cs!==null&&ju(y,cs,E,U,!0)}}s:{if(g=h?Ea(h):window,b=g.nodeName&&g.nodeName.toLowerCase(),b==="select"||b==="input"&&g.type==="file")var ss=tc;else if($o(g))if(ec)ss=Np;else{ss=Ap;var z=Ep}else b=g.nodeName,!b||b.toLowerCase()!=="input"||g.type!=="checkbox"&&g.type!=="radio"?h&&ai(h.elementType)&&(ss=tc):ss=zp;if(ss&&(ss=ss(s,h))){sc(y,ss,e,m);break s}z&&z(s,g,h),s==="focusout"&&h&&g.type==="number"&&h.memoizedProps.value!=null&&ei(g,"number",g.value)}switch(z=h?Ea(h):window,s){case"focusin":($o(z)||z.contentEditable==="true")&&(Pe=z,gi=h,Ua=null);break;case"focusout":Ua=gi=Pe=null;break;case"mousedown":bi=!0;break;case"contextmenu":case"mouseup":case"dragend":bi=!1,rc(y,e,m);break;case"selectionchange":if(Hp)break;case"keydown":case"keyup":rc(y,e,m)}var X;if(pi)s:{switch(s){case"compositionstart":var I="onCompositionStart";break s;case"compositionend":I="onCompositionEnd";break s;case"compositionupdate":I="onCompositionUpdate";break s}I=void 0}else We?Wo(s,e)&&(I="onCompositionEnd"):s==="keydown"&&e.keyCode===229&&(I="onCompositionStart");I&&(Fo&&e.locale!=="ko"&&(We||I!=="onCompositionStart"?I==="onCompositionEnd"&&We&&(X=Yo()):(Pt=m,oi="value"in Pt?Pt.value:Pt.textContent,We=!0)),z=Ml(h,I),0<z.length&&(I=new Qo(I,s,null,e,m),y.push({event:I,listeners:z}),X?I.data=X:(X=Po(e),X!==null&&(I.data=X)))),(X=Mp?Dp(s,e):Lp(s,e))&&(I=Ml(h,"onBeforeInput"),0<I.length&&(z=new Qo("onBeforeInput","beforeinput",null,e,m),y.push({event:z,listeners:I}),z.data=X)),m_(y,s,h,e,m)}Hu(y,t)})}function vn(s,t,e){return{instance:s,listener:t,currentTarget:e}}function Ml(s,t){for(var e=t+"Capture",a=[];s!==null;){var n=s,l=n.stateNode;if(n=n.tag,n!==5&&n!==26&&n!==27||l===null||(n=Aa(s,e),n!=null&&a.unshift(vn(s,n,l)),n=Aa(s,t),n!=null&&a.push(vn(s,n,l))),s.tag===3)return a;s=s.return}return[]}function x_(s){if(s===null)return null;do s=s.return;while(s&&s.tag!==5&&s.tag!==27);return s||null}function ju(s,t,e,a,n){for(var l=t._reactName,i=[];e!==null&&e!==a;){var d=e,o=d.alternate,h=d.stateNode;if(d=d.tag,o!==null&&o===a)break;d!==5&&d!==26&&d!==27||h===null||(o=h,n?(h=Aa(e,l),h!=null&&i.unshift(vn(e,h,o))):n||(h=Aa(e,l),h!=null&&i.push(vn(e,h,o)))),e=e.return}i.length!==0&&s.push({event:t,listeners:i})}var C_=/\r\n?/g,S_=/\u0000|\uFFFD/g;function Ru(s){return(typeof s=="string"?s:""+s).replace(C_,`
`).replace(S_,"")}function Uu(s,t){return t=Ru(t),Ru(s)===t}function os(s,t,e,a,n,l){switch(e){case"children":typeof a=="string"?t==="body"||t==="textarea"&&a===""||Fe(s,a):(typeof a=="number"||typeof a=="bigint")&&t!=="body"&&Fe(s,""+a);break;case"className":Tn(s,"class",a);break;case"tabIndex":Tn(s,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Tn(s,e,a);break;case"style":Uo(s,a,l);break;case"data":if(t!=="object"){Tn(s,"data",a);break}case"src":case"href":if(a===""&&(t!=="a"||e!=="href")){s.removeAttribute(e);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){s.removeAttribute(e);break}a=An(""+a),s.setAttribute(e,a);break;case"action":case"formAction":if(typeof a=="function"){s.setAttribute(e,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof l=="function"&&(e==="formAction"?(t!=="input"&&os(s,t,"name",n.name,n,null),os(s,t,"formEncType",n.formEncType,n,null),os(s,t,"formMethod",n.formMethod,n,null),os(s,t,"formTarget",n.formTarget,n,null)):(os(s,t,"encType",n.encType,n,null),os(s,t,"method",n.method,n,null),os(s,t,"target",n.target,n,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){s.removeAttribute(e);break}a=An(""+a),s.setAttribute(e,a);break;case"onClick":a!=null&&(s.onclick=At);break;case"onScroll":a!=null&&F("scroll",s);break;case"onScrollEnd":a!=null&&F("scrollend",s);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(_(61));if(e=a.__html,e!=null){if(n.children!=null)throw Error(_(60));s.innerHTML=e}}break;case"multiple":s.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":s.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){s.removeAttribute("xlink:href");break}e=An(""+a),s.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",e);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?s.setAttribute(e,""+a):s.removeAttribute(e);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?s.setAttribute(e,""):s.removeAttribute(e);break;case"capture":case"download":a===!0?s.setAttribute(e,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?s.setAttribute(e,a):s.removeAttribute(e);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?s.setAttribute(e,a):s.removeAttribute(e);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?s.removeAttribute(e):s.setAttribute(e,a);break;case"popover":F("beforetoggle",s),F("toggle",s),Bn(s,"popover",a);break;case"xlinkActuate":Et(s,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":Et(s,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":Et(s,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":Et(s,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":Et(s,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":Et(s,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":Et(s,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":Et(s,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":Et(s,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Bn(s,"is",a);break;case"innerText":case"textContent":break;default:(!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(e=$v.get(e)||e,Bn(s,e,a))}}function Yd(s,t,e,a,n,l){switch(e){case"style":Uo(s,a,l);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(_(61));if(e=a.__html,e!=null){if(n.children!=null)throw Error(_(60));s.innerHTML=e}}break;case"children":typeof a=="string"?Fe(s,a):(typeof a=="number"||typeof a=="bigint")&&Fe(s,""+a);break;case"onScroll":a!=null&&F("scroll",s);break;case"onScrollEnd":a!=null&&F("scrollend",s);break;case"onClick":a!=null&&(s.onclick=At);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Eo.hasOwnProperty(e))s:{if(e[0]==="o"&&e[1]==="n"&&(n=e.endsWith("Capture"),t=e.slice(2,n?e.length-7:void 0),l=s[Ys]||null,l=l!=null?l[e]:null,typeof l=="function"&&s.removeEventListener(t,l,n),typeof a=="function")){typeof l!="function"&&l!==null&&(e in s?s[e]=null:s.hasAttribute(e)&&s.removeAttribute(e)),s.addEventListener(t,a,n);break s}e in s?s[e]=a:a===!0?s.setAttribute(e,""):Bn(s,e,a)}}}function Es(s,t,e){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":F("error",s),F("load",s);var a=!1,n=!1,l;for(l in e)if(e.hasOwnProperty(l)){var i=e[l];if(i!=null)switch(l){case"src":a=!0;break;case"srcSet":n=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(_(137,t));default:os(s,t,l,i,e,null)}}n&&os(s,t,"srcSet",e.srcSet,e,null),a&&os(s,t,"src",e.src,e,null);return;case"input":F("invalid",s);var d=l=i=n=null,o=null,h=null;for(a in e)if(e.hasOwnProperty(a)){var m=e[a];if(m!=null)switch(a){case"name":n=m;break;case"type":i=m;break;case"checked":o=m;break;case"defaultChecked":h=m;break;case"value":l=m;break;case"defaultValue":d=m;break;case"children":case"dangerouslySetInnerHTML":if(m!=null)throw Error(_(137,t));break;default:os(s,t,a,m,e,null)}}Ho(s,l,d,o,h,i,n,!1);return;case"select":F("invalid",s),a=i=l=null;for(n in e)if(e.hasOwnProperty(n)&&(d=e[n],d!=null))switch(n){case"value":l=d;break;case"defaultValue":i=d;break;case"multiple":a=d;default:os(s,t,n,d,e,null)}t=l,e=i,s.multiple=!!a,t!=null?Ke(s,!!a,t,!1):e!=null&&Ke(s,!!a,e,!0);return;case"textarea":F("invalid",s),l=n=a=null;for(i in e)if(e.hasOwnProperty(i)&&(d=e[i],d!=null))switch(i){case"value":a=d;break;case"defaultValue":n=d;break;case"children":l=d;break;case"dangerouslySetInnerHTML":if(d!=null)throw Error(_(91));break;default:os(s,t,i,d,e,null)}jo(s,a,n,l);return;case"option":for(o in e)if(e.hasOwnProperty(o)&&(a=e[o],a!=null))switch(o){case"selected":s.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:os(s,t,o,a,e,null)}return;case"dialog":F("beforetoggle",s),F("toggle",s),F("cancel",s),F("close",s);break;case"iframe":case"object":F("load",s);break;case"video":case"audio":for(a=0;a<un.length;a++)F(un[a],s);break;case"image":F("error",s),F("load",s);break;case"details":F("toggle",s);break;case"embed":case"source":case"link":F("error",s),F("load",s);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(h in e)if(e.hasOwnProperty(h)&&(a=e[h],a!=null))switch(h){case"children":case"dangerouslySetInnerHTML":throw Error(_(137,t));default:os(s,t,h,a,e,null)}return;default:if(ai(t)){for(m in e)e.hasOwnProperty(m)&&(a=e[m],a!==void 0&&Yd(s,t,m,a,e,void 0));return}}for(d in e)e.hasOwnProperty(d)&&(a=e[d],a!=null&&os(s,t,d,a,e,null))}function M_(s,t,e,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var n=null,l=null,i=null,d=null,o=null,h=null,m=null;for(b in e){var y=e[b];if(e.hasOwnProperty(b)&&y!=null)switch(b){case"checked":break;case"value":break;case"defaultValue":o=y;default:a.hasOwnProperty(b)||os(s,t,b,null,a,y)}}for(var g in a){var b=a[g];if(y=e[g],a.hasOwnProperty(g)&&(b!=null||y!=null))switch(g){case"type":l=b;break;case"name":n=b;break;case"checked":h=b;break;case"defaultChecked":m=b;break;case"value":i=b;break;case"defaultValue":d=b;break;case"children":case"dangerouslySetInnerHTML":if(b!=null)throw Error(_(137,t));break;default:b!==y&&os(s,t,g,b,a,y)}}ti(s,i,d,o,h,m,l,n);return;case"select":b=i=d=g=null;for(l in e)if(o=e[l],e.hasOwnProperty(l)&&o!=null)switch(l){case"value":break;case"multiple":b=o;default:a.hasOwnProperty(l)||os(s,t,l,null,a,o)}for(n in a)if(l=a[n],o=e[n],a.hasOwnProperty(n)&&(l!=null||o!=null))switch(n){case"value":g=l;break;case"defaultValue":d=l;break;case"multiple":i=l;default:l!==o&&os(s,t,n,l,a,o)}t=d,e=i,a=b,g!=null?Ke(s,!!e,g,!1):!!a!=!!e&&(t!=null?Ke(s,!!e,t,!0):Ke(s,!!e,e?[]:"",!1));return;case"textarea":b=g=null;for(d in e)if(n=e[d],e.hasOwnProperty(d)&&n!=null&&!a.hasOwnProperty(d))switch(d){case"value":break;case"children":break;default:os(s,t,d,null,a,n)}for(i in a)if(n=a[i],l=e[i],a.hasOwnProperty(i)&&(n!=null||l!=null))switch(i){case"value":g=n;break;case"defaultValue":b=n;break;case"children":break;case"dangerouslySetInnerHTML":if(n!=null)throw Error(_(91));break;default:n!==l&&os(s,t,i,n,a,l)}Vo(s,g,b);return;case"option":for(var E in e)if(g=e[E],e.hasOwnProperty(E)&&g!=null&&!a.hasOwnProperty(E))switch(E){case"selected":s.selected=!1;break;default:os(s,t,E,null,a,g)}for(o in a)if(g=a[o],b=e[o],a.hasOwnProperty(o)&&g!==b&&(g!=null||b!=null))switch(o){case"selected":s.selected=g&&typeof g!="function"&&typeof g!="symbol";break;default:os(s,t,o,g,a,b)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var U in e)g=e[U],e.hasOwnProperty(U)&&g!=null&&!a.hasOwnProperty(U)&&os(s,t,U,null,a,g);for(h in a)if(g=a[h],b=e[h],a.hasOwnProperty(h)&&g!==b&&(g!=null||b!=null))switch(h){case"children":case"dangerouslySetInnerHTML":if(g!=null)throw Error(_(137,t));break;default:os(s,t,h,g,a,b)}return;default:if(ai(t)){for(var cs in e)g=e[cs],e.hasOwnProperty(cs)&&g!==void 0&&!a.hasOwnProperty(cs)&&Yd(s,t,cs,void 0,a,g);for(m in a)g=a[m],b=e[m],!a.hasOwnProperty(m)||g===b||g===void 0&&b===void 0||Yd(s,t,m,g,a,b);return}}for(var p in e)g=e[p],e.hasOwnProperty(p)&&g!=null&&!a.hasOwnProperty(p)&&os(s,t,p,null,a,g);for(y in a)g=a[y],b=e[y],!a.hasOwnProperty(y)||g===b||g==null&&b==null||os(s,t,y,g,a,b)}function qu(s){switch(s){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function D_(){if(typeof performance.getEntriesByType=="function"){for(var s=0,t=0,e=performance.getEntriesByType("resource"),a=0;a<e.length;a++){var n=e[a],l=n.transferSize,i=n.initiatorType,d=n.duration;if(l&&d&&qu(i)){for(i=0,d=n.responseEnd,a+=1;a<e.length;a++){var o=e[a],h=o.startTime;if(h>d)break;var m=o.transferSize,y=o.initiatorType;m&&qu(y)&&(o=o.responseEnd,i+=m*(o<d?1:(d-h)/(o-h)))}if(--a,t+=8*(l+i)/(n.duration/1e3),s++,10<s)break}}if(0<s)return t/s/1e6}return navigator.connection&&(s=navigator.connection.downlink,typeof s=="number")?s:5}var Gd=null,Xd=null;function Dl(s){return s.nodeType===9?s:s.ownerDocument}function Zu(s){switch(s){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Yu(s,t){if(s===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return s===1&&t==="foreignObject"?0:s}function Qd(s,t){return s==="textarea"||s==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Kd=null;function L_(){var s=window.event;return s&&s.type==="popstate"?s===Kd?!1:(Kd=s,!0):(Kd=null,!1)}var Gu=typeof setTimeout=="function"?setTimeout:void 0,B_=typeof clearTimeout=="function"?clearTimeout:void 0,Xu=typeof Promise=="function"?Promise:void 0,T_=typeof queueMicrotask=="function"?queueMicrotask:typeof Xu<"u"?function(s){return Xu.resolve(null).then(s).catch(E_)}:Gu;function E_(s){setTimeout(function(){throw s})}function fe(s){return s==="head"}function Qu(s,t){var e=t,a=0;do{var n=e.nextSibling;if(s.removeChild(e),n&&n.nodeType===8)if(e=n.data,e==="/$"||e==="/&"){if(a===0){s.removeChild(n),Sa(t);return}a--}else if(e==="$"||e==="$?"||e==="$~"||e==="$!"||e==="&")a++;else if(e==="html")pn(s.ownerDocument.documentElement);else if(e==="head"){e=s.ownerDocument.head,pn(e);for(var l=e.firstChild;l;){var i=l.nextSibling,d=l.nodeName;l[Ta]||d==="SCRIPT"||d==="STYLE"||d==="LINK"&&l.rel.toLowerCase()==="stylesheet"||e.removeChild(l),l=i}}else e==="body"&&pn(s.ownerDocument.body);e=n}while(e);Sa(t)}function Ku(s,t){var e=s;s=0;do{var a=e.nextSibling;if(e.nodeType===1?t?(e._stashedDisplay=e.style.display,e.style.display="none"):(e.style.display=e._stashedDisplay||"",e.getAttribute("style")===""&&e.removeAttribute("style")):e.nodeType===3&&(t?(e._stashedText=e.nodeValue,e.nodeValue=""):e.nodeValue=e._stashedText||""),a&&a.nodeType===8)if(e=a.data,e==="/$"){if(s===0)break;s--}else e!=="$"&&e!=="$?"&&e!=="$~"&&e!=="$!"||s++;e=a}while(e)}function Fd(s){var t=s.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var e=t;switch(t=t.nextSibling,e.nodeName){case"HTML":case"HEAD":case"BODY":Fd(e),$l(e);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(e.rel.toLowerCase()==="stylesheet")continue}s.removeChild(e)}}function A_(s,t,e,a){for(;s.nodeType===1;){var n=e;if(s.nodeName.toLowerCase()!==t.toLowerCase()){if(!a&&(s.nodeName!=="INPUT"||s.type!=="hidden"))break}else if(a){if(!s[Ta])switch(t){case"meta":if(!s.hasAttribute("itemprop"))break;return s;case"link":if(l=s.getAttribute("rel"),l==="stylesheet"&&s.hasAttribute("data-precedence"))break;if(l!==n.rel||s.getAttribute("href")!==(n.href==null||n.href===""?null:n.href)||s.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin)||s.getAttribute("title")!==(n.title==null?null:n.title))break;return s;case"style":if(s.hasAttribute("data-precedence"))break;return s;case"script":if(l=s.getAttribute("src"),(l!==(n.src==null?null:n.src)||s.getAttribute("type")!==(n.type==null?null:n.type)||s.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin))&&l&&s.hasAttribute("async")&&!s.hasAttribute("itemprop"))break;return s;default:return s}}else if(t==="input"&&s.type==="hidden"){var l=n.name==null?null:""+n.name;if(n.type==="hidden"&&s.getAttribute("name")===l)return s}else return s;if(s=ht(s.nextSibling),s===null)break}return null}function z_(s,t,e){if(t==="")return null;for(;s.nodeType!==3;)if((s.nodeType!==1||s.nodeName!=="INPUT"||s.type!=="hidden")&&!e||(s=ht(s.nextSibling),s===null))return null;return s}function Fu(s,t){for(;s.nodeType!==8;)if((s.nodeType!==1||s.nodeName!=="INPUT"||s.type!=="hidden")&&!t||(s=ht(s.nextSibling),s===null))return null;return s}function Jd(s){return s.data==="$?"||s.data==="$~"}function Id(s){return s.data==="$!"||s.data==="$?"&&s.ownerDocument.readyState!=="loading"}function N_(s,t){var e=s.ownerDocument;if(s.data==="$~")s._reactRetry=t;else if(s.data!=="$?"||e.readyState!=="loading")t();else{var a=function(){t(),e.removeEventListener("DOMContentLoaded",a)};e.addEventListener("DOMContentLoaded",a),s._reactRetry=a}}function ht(s){for(;s!=null;s=s.nextSibling){var t=s.nodeType;if(t===1||t===3)break;if(t===8){if(t=s.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return s}var Wd=null;function Ju(s){s=s.nextSibling;for(var t=0;s;){if(s.nodeType===8){var e=s.data;if(e==="/$"||e==="/&"){if(t===0)return ht(s.nextSibling);t--}else e!=="$"&&e!=="$!"&&e!=="$?"&&e!=="$~"&&e!=="&"||t++}s=s.nextSibling}return null}function Iu(s){s=s.previousSibling;for(var t=0;s;){if(s.nodeType===8){var e=s.data;if(e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"){if(t===0)return s;t--}else e!=="/$"&&e!=="/&"||t++}s=s.previousSibling}return null}function Wu(s,t,e){switch(t=Dl(e),s){case"html":if(s=t.documentElement,!s)throw Error(_(452));return s;case"head":if(s=t.head,!s)throw Error(_(453));return s;case"body":if(s=t.body,!s)throw Error(_(454));return s;default:throw Error(_(451))}}function pn(s){for(var t=s.attributes;t.length;)s.removeAttributeNode(t[0]);$l(s)}var gt=new Map,Pu=new Set;function Ll(s){return typeof s.getRootNode=="function"?s.getRootNode():s.nodeType===9?s:s.ownerDocument}var Ft=L.d;L.d={f:O_,r:H_,D:V_,C:j_,L:R_,m:U_,X:Z_,S:q_,M:Y_};function O_(){var s=Ft.f(),t=ml();return s||t}function H_(s){var t=Ge(s);t!==null&&t.tag===5&&t.type==="form"?fr(t):Ft.r(s)}var ya=typeof document>"u"?null:document;function $u(s,t,e){var a=ya;if(a&&typeof t=="string"&&t){var n=ct(t);n='link[rel="'+s+'"][href="'+n+'"]',typeof e=="string"&&(n+='[crossorigin="'+e+'"]'),Pu.has(n)||(Pu.add(n),s={rel:s,crossOrigin:e,href:t},a.querySelector(n)===null&&(t=a.createElement("link"),Es(t,"link",s),Ss(t),a.head.appendChild(t)))}}function V_(s){Ft.D(s),$u("dns-prefetch",s,null)}function j_(s,t){Ft.C(s,t),$u("preconnect",s,t)}function R_(s,t,e){Ft.L(s,t,e);var a=ya;if(a&&s&&t){var n='link[rel="preload"][as="'+ct(t)+'"]';t==="image"&&e&&e.imageSrcSet?(n+='[imagesrcset="'+ct(e.imageSrcSet)+'"]',typeof e.imageSizes=="string"&&(n+='[imagesizes="'+ct(e.imageSizes)+'"]')):n+='[href="'+ct(s)+'"]';var l=n;switch(t){case"style":l=xa(s);break;case"script":l=Ca(s)}gt.has(l)||(s=O({rel:"preload",href:t==="image"&&e&&e.imageSrcSet?void 0:s,as:t},e),gt.set(l,s),a.querySelector(n)!==null||t==="style"&&a.querySelector(_n(l))||t==="script"&&a.querySelector(fn(l))||(t=a.createElement("link"),Es(t,"link",s),Ss(t),a.head.appendChild(t)))}}function U_(s,t){Ft.m(s,t);var e=ya;if(e&&s){var a=t&&typeof t.as=="string"?t.as:"script",n='link[rel="modulepreload"][as="'+ct(a)+'"][href="'+ct(s)+'"]',l=n;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":l=Ca(s)}if(!gt.has(l)&&(s=O({rel:"modulepreload",href:s},t),gt.set(l,s),e.querySelector(n)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(e.querySelector(fn(l)))return}a=e.createElement("link"),Es(a,"link",s),Ss(a),e.head.appendChild(a)}}}function q_(s,t,e){Ft.S(s,t,e);var a=ya;if(a&&s){var n=Xe(a).hoistableStyles,l=xa(s);t=t||"default";var i=n.get(l);if(!i){var d={loading:0,preload:null};if(i=a.querySelector(_n(l)))d.loading=5;else{s=O({rel:"stylesheet",href:s,"data-precedence":t},e),(e=gt.get(l))&&Pd(s,e);var o=i=a.createElement("link");Ss(o),Es(o,"link",s),o._p=new Promise(function(h,m){o.onload=h,o.onerror=m}),o.addEventListener("load",function(){d.loading|=1}),o.addEventListener("error",function(){d.loading|=2}),d.loading|=4,Bl(i,t,a)}i={type:"stylesheet",instance:i,count:1,state:d},n.set(l,i)}}}function Z_(s,t){Ft.X(s,t);var e=ya;if(e&&s){var a=Xe(e).hoistableScripts,n=Ca(s),l=a.get(n);l||(l=e.querySelector(fn(n)),l||(s=O({src:s,async:!0},t),(t=gt.get(n))&&$d(s,t),l=e.createElement("script"),Ss(l),Es(l,"link",s),e.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},a.set(n,l))}}function Y_(s,t){Ft.M(s,t);var e=ya;if(e&&s){var a=Xe(e).hoistableScripts,n=Ca(s),l=a.get(n);l||(l=e.querySelector(fn(n)),l||(s=O({src:s,async:!0,type:"module"},t),(t=gt.get(n))&&$d(s,t),l=e.createElement("script"),Ss(l),Es(l,"link",s),e.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},a.set(n,l))}}function sv(s,t,e,a){var n=(n=Q.current)?Ll(n):null;if(!n)throw Error(_(446));switch(s){case"meta":case"title":return null;case"style":return typeof e.precedence=="string"&&typeof e.href=="string"?(t=xa(e.href),e=Xe(n).hoistableStyles,a=e.get(t),a||(a={type:"style",instance:null,count:0,state:null},e.set(t,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(e.rel==="stylesheet"&&typeof e.href=="string"&&typeof e.precedence=="string"){s=xa(e.href);var l=Xe(n).hoistableStyles,i=l.get(s);if(i||(n=n.ownerDocument||n,i={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},l.set(s,i),(l=n.querySelector(_n(s)))&&!l._p&&(i.instance=l,i.state.loading=5),gt.has(s)||(e={rel:"preload",as:"style",href:e.href,crossOrigin:e.crossOrigin,integrity:e.integrity,media:e.media,hrefLang:e.hrefLang,referrerPolicy:e.referrerPolicy},gt.set(s,e),l||G_(n,s,e,i.state))),t&&a===null)throw Error(_(528,""));return i}if(t&&a!==null)throw Error(_(529,""));return null;case"script":return t=e.async,e=e.src,typeof e=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Ca(e),e=Xe(n).hoistableScripts,a=e.get(t),a||(a={type:"script",instance:null,count:0,state:null},e.set(t,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(_(444,s))}}function xa(s){return'href="'+ct(s)+'"'}function _n(s){return'link[rel="stylesheet"]['+s+"]"}function tv(s){return O({},s,{"data-precedence":s.precedence,precedence:null})}function G_(s,t,e,a){s.querySelector('link[rel="preload"][as="style"]['+t+"]")?a.loading=1:(t=s.createElement("link"),a.preload=t,t.addEventListener("load",function(){return a.loading|=1}),t.addEventListener("error",function(){return a.loading|=2}),Es(t,"link",e),Ss(t),s.head.appendChild(t))}function Ca(s){return'[src="'+ct(s)+'"]'}function fn(s){return"script[async]"+s}function ev(s,t,e){if(t.count++,t.instance===null)switch(t.type){case"style":var a=s.querySelector('style[data-href~="'+ct(e.href)+'"]');if(a)return t.instance=a,Ss(a),a;var n=O({},e,{"data-href":e.href,"data-precedence":e.precedence,href:null,precedence:null});return a=(s.ownerDocument||s).createElement("style"),Ss(a),Es(a,"style",n),Bl(a,e.precedence,s),t.instance=a;case"stylesheet":n=xa(e.href);var l=s.querySelector(_n(n));if(l)return t.state.loading|=4,t.instance=l,Ss(l),l;a=tv(e),(n=gt.get(n))&&Pd(a,n),l=(s.ownerDocument||s).createElement("link"),Ss(l);var i=l;return i._p=new Promise(function(d,o){i.onload=d,i.onerror=o}),Es(l,"link",a),t.state.loading|=4,Bl(l,e.precedence,s),t.instance=l;case"script":return l=Ca(e.src),(n=s.querySelector(fn(l)))?(t.instance=n,Ss(n),n):(a=e,(n=gt.get(l))&&(a=O({},e),$d(a,n)),s=s.ownerDocument||s,n=s.createElement("script"),Ss(n),Es(n,"link",a),s.head.appendChild(n),t.instance=n);case"void":return null;default:throw Error(_(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(a=t.instance,t.state.loading|=4,Bl(a,e.precedence,s));return t.instance}function Bl(s,t,e){for(var a=e.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),n=a.length?a[a.length-1]:null,l=n,i=0;i<a.length;i++){var d=a[i];if(d.dataset.precedence===t)l=d;else if(l!==n)break}l?l.parentNode.insertBefore(s,l.nextSibling):(t=e.nodeType===9?e.head:e,t.insertBefore(s,t.firstChild))}function Pd(s,t){s.crossOrigin==null&&(s.crossOrigin=t.crossOrigin),s.referrerPolicy==null&&(s.referrerPolicy=t.referrerPolicy),s.title==null&&(s.title=t.title)}function $d(s,t){s.crossOrigin==null&&(s.crossOrigin=t.crossOrigin),s.referrerPolicy==null&&(s.referrerPolicy=t.referrerPolicy),s.integrity==null&&(s.integrity=t.integrity)}var Tl=null;function av(s,t,e){if(Tl===null){var a=new Map,n=Tl=new Map;n.set(e,a)}else n=Tl,a=n.get(e),a||(a=new Map,n.set(e,a));if(a.has(s))return a;for(a.set(s,null),e=e.getElementsByTagName(s),n=0;n<e.length;n++){var l=e[n];if(!(l[Ta]||l[Ds]||s==="link"&&l.getAttribute("rel")==="stylesheet")&&l.namespaceURI!=="http://www.w3.org/2000/svg"){var i=l.getAttribute(t)||"";i=s+i;var d=a.get(i);d?d.push(l):a.set(i,[l])}}return a}function nv(s,t,e){s=s.ownerDocument||s,s.head.insertBefore(e,t==="title"?s.querySelector("head > title"):null)}function X_(s,t,e){if(e===1||t.itemProp!=null)return!1;switch(s){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return s=t.disabled,typeof t.precedence=="string"&&s==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function lv(s){return!(s.type==="stylesheet"&&(s.state.loading&3)===0)}function Q_(s,t,e,a){if(e.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(e.state.loading&4)===0){if(e.instance===null){var n=xa(a.href),l=t.querySelector(_n(n));if(l){t=l._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(s.count++,s=El.bind(s),t.then(s,s)),e.state.loading|=4,e.instance=l,Ss(l);return}l=t.ownerDocument||t,a=tv(a),(n=gt.get(n))&&Pd(a,n),l=l.createElement("link"),Ss(l);var i=l;i._p=new Promise(function(d,o){i.onload=d,i.onerror=o}),Es(l,"link",a),e.instance=l}s.stylesheets===null&&(s.stylesheets=new Map),s.stylesheets.set(e,t),(t=e.state.preload)&&(e.state.loading&3)===0&&(s.count++,e=El.bind(s),t.addEventListener("load",e),t.addEventListener("error",e))}}var so=0;function K_(s,t){return s.stylesheets&&s.count===0&&zl(s,s.stylesheets),0<s.count||0<s.imgCount?function(e){var a=setTimeout(function(){if(s.stylesheets&&zl(s,s.stylesheets),s.unsuspend){var l=s.unsuspend;s.unsuspend=null,l()}},6e4+t);0<s.imgBytes&&so===0&&(so=62500*D_());var n=setTimeout(function(){if(s.waitingForImages=!1,s.count===0&&(s.stylesheets&&zl(s,s.stylesheets),s.unsuspend)){var l=s.unsuspend;s.unsuspend=null,l()}},(s.imgBytes>so?50:800)+t);return s.unsuspend=e,function(){s.unsuspend=null,clearTimeout(a),clearTimeout(n)}}:null}function El(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)zl(this,this.stylesheets);else if(this.unsuspend){var s=this.unsuspend;this.unsuspend=null,s()}}}var Al=null;function zl(s,t){s.stylesheets=null,s.unsuspend!==null&&(s.count++,Al=new Map,t.forEach(F_,s),Al=null,El.call(s))}function F_(s,t){if(!(t.state.loading&4)){var e=Al.get(s);if(e)var a=e.get(null);else{e=new Map,Al.set(s,e);for(var n=s.querySelectorAll("link[data-precedence],style[data-precedence]"),l=0;l<n.length;l++){var i=n[l];(i.nodeName==="LINK"||i.getAttribute("media")!=="not all")&&(e.set(i.dataset.precedence,i),a=i)}a&&e.set(null,a)}n=t.instance,i=n.getAttribute("data-precedence"),l=e.get(i)||a,l===a&&e.set(null,n),e.set(i,n),this.count++,a=El.bind(this),n.addEventListener("load",a),n.addEventListener("error",a),l?l.parentNode.insertBefore(n,l.nextSibling):(s=s.nodeType===9?s.head:s,s.insertBefore(n,s.firstChild)),t.state.loading|=4}}var hn={$$typeof:zs,Provider:null,Consumer:null,_currentValue:q,_currentValue2:q,_threadCount:0};function J_(s,t,e,a,n,l,i,d,o){this.tag=1,this.containerInfo=s,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Jl(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Jl(0),this.hiddenUpdates=Jl(null),this.identifierPrefix=a,this.onUncaughtError=n,this.onCaughtError=l,this.onRecoverableError=i,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.incompleteTransitions=new Map}function iv(s,t,e,a,n,l,i,d,o,h,m,y){return s=new J_(s,t,e,i,o,h,m,y,d),t=1,l===!0&&(t|=24),l=tt(3,null,null,t),s.current=l,l.stateNode=s,t=zi(),t.refCount++,s.pooledCache=t,t.refCount++,l.memoizedState={element:a,isDehydrated:e,cache:t},Vi(l),s}function dv(s){return s?(s=ta,s):ta}function ov(s,t,e,a,n,l){n=dv(n),a.context===null?a.context=n:a.pendingContext=n,a=ne(t),a.payload={element:e},l=l===void 0?null:l,l!==null&&(a.callback=l),e=le(s,a,t),e!==null&&(Js(e,s,t),Ka(e,s,t))}function cv(s,t){if(s=s.memoizedState,s!==null&&s.dehydrated!==null){var e=s.retryLane;s.retryLane=e!==0&&e<t?e:t}}function to(s,t){cv(s,t),(s=s.alternate)&&cv(s,t)}function rv(s){if(s.tag===13||s.tag===31){var t=Le(s,67108864);t!==null&&Js(t,s,67108864),to(s,67108864)}}function uv(s){if(s.tag===13||s.tag===31){var t=it();t=Il(t);var e=Le(s,t);e!==null&&Js(e,s,t),to(s,t)}}var Nl=!0;function I_(s,t,e,a){var n=w.T;w.T=null;var l=L.p;try{L.p=2,eo(s,t,e,a)}finally{L.p=l,w.T=n}}function W_(s,t,e,a){var n=w.T;w.T=null;var l=L.p;try{L.p=8,eo(s,t,e,a)}finally{L.p=l,w.T=n}}function eo(s,t,e,a){if(Nl){var n=ao(a);if(n===null)Zd(s,t,a,Ol,e),pv(s,a);else if($_(n,s,t,e,a))a.stopPropagation();else if(pv(s,a),t&4&&-1<P_.indexOf(s)){for(;n!==null;){var l=Ge(n);if(l!==null)switch(l.tag){case 3:if(l=l.stateNode,l.current.memoizedState.isDehydrated){var i=xe(l.pendingLanes);if(i!==0){var d=l;for(d.pendingLanes|=2,d.entangledLanes|=2;i;){var o=1<<31-$s(i);d.entanglements[1]|=o,i&=~o}Lt(l),(es&6)===0&&(gl=Ws()+500,rn(0))}}break;case 31:case 13:d=Le(l,2),d!==null&&Js(d,l,2),ml(),to(l,2)}if(l=ao(a),l===null&&Zd(s,t,a,Ol,e),l===n)break;n=l}n!==null&&a.stopPropagation()}else Zd(s,t,a,null,e)}}function ao(s){return s=li(s),no(s)}var Ol=null;function no(s){if(Ol=null,s=Ye(s),s!==null){var t=N(s);if(t===null)s=null;else{var e=t.tag;if(e===13){if(s=V(t),s!==null)return s;s=null}else if(e===31){if(s=j(t),s!==null)return s;s=null}else if(e===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;s=null}else t!==s&&(s=null)}}return Ol=s,null}function vv(s){switch(s){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Vv()){case wo:return 2;case ko:return 8;case Cn:case jv:return 32;case yo:return 268435456;default:return 32}default:return 32}}var lo=!1,he=null,ge=null,be=null,gn=new Map,bn=new Map,me=[],P_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function pv(s,t){switch(s){case"focusin":case"focusout":he=null;break;case"dragenter":case"dragleave":ge=null;break;case"mouseover":case"mouseout":be=null;break;case"pointerover":case"pointerout":gn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":bn.delete(t.pointerId)}}function mn(s,t,e,a,n,l){return s===null||s.nativeEvent!==l?(s={blockedOn:t,domEventName:e,eventSystemFlags:a,nativeEvent:l,targetContainers:[n]},t!==null&&(t=Ge(t),t!==null&&rv(t)),s):(s.eventSystemFlags|=a,t=s.targetContainers,n!==null&&t.indexOf(n)===-1&&t.push(n),s)}function $_(s,t,e,a,n){switch(t){case"focusin":return he=mn(he,s,t,e,a,n),!0;case"dragenter":return ge=mn(ge,s,t,e,a,n),!0;case"mouseover":return be=mn(be,s,t,e,a,n),!0;case"pointerover":var l=n.pointerId;return gn.set(l,mn(gn.get(l)||null,s,t,e,a,n)),!0;case"gotpointercapture":return l=n.pointerId,bn.set(l,mn(bn.get(l)||null,s,t,e,a,n)),!0}return!1}function _v(s){var t=Ye(s.target);if(t!==null){var e=N(t);if(e!==null){if(t=e.tag,t===13){if(t=V(e),t!==null){s.blockedOn=t,Lo(s.priority,function(){uv(e)});return}}else if(t===31){if(t=j(e),t!==null){s.blockedOn=t,Lo(s.priority,function(){uv(e)});return}}else if(t===3&&e.stateNode.current.memoizedState.isDehydrated){s.blockedOn=e.tag===3?e.stateNode.containerInfo:null;return}}}s.blockedOn=null}function Hl(s){if(s.blockedOn!==null)return!1;for(var t=s.targetContainers;0<t.length;){var e=ao(s.nativeEvent);if(e===null){e=s.nativeEvent;var a=new e.constructor(e.type,e);ni=a,e.target.dispatchEvent(a),ni=null}else return t=Ge(e),t!==null&&rv(t),s.blockedOn=e,!1;t.shift()}return!0}function fv(s,t,e){Hl(s)&&e.delete(t)}function s1(){lo=!1,he!==null&&Hl(he)&&(he=null),ge!==null&&Hl(ge)&&(ge=null),be!==null&&Hl(be)&&(be=null),gn.forEach(fv),bn.forEach(fv)}function Vl(s,t){s.blockedOn===t&&(s.blockedOn=null,lo||(lo=!0,v.unstable_scheduleCallback(v.unstable_NormalPriority,s1)))}var jl=null;function hv(s){jl!==s&&(jl=s,v.unstable_scheduleCallback(v.unstable_NormalPriority,function(){jl===s&&(jl=null);for(var t=0;t<s.length;t+=3){var e=s[t],a=s[t+1],n=s[t+2];if(typeof a!="function"){if(no(a||e)===null)continue;break}var l=Ge(e);l!==null&&(s.splice(t,3),t-=3,ad(l,{pending:!0,data:n,method:e.method,action:a},a,n))}}))}function Sa(s){function t(o){return Vl(o,s)}he!==null&&Vl(he,s),ge!==null&&Vl(ge,s),be!==null&&Vl(be,s),gn.forEach(t),bn.forEach(t);for(var e=0;e<me.length;e++){var a=me[e];a.blockedOn===s&&(a.blockedOn=null)}for(;0<me.length&&(e=me[0],e.blockedOn===null);)_v(e),e.blockedOn===null&&me.shift();if(e=(s.ownerDocument||s).$$reactFormReplay,e!=null)for(a=0;a<e.length;a+=3){var n=e[a],l=e[a+1],i=n[Ys]||null;if(typeof l=="function")i||hv(e);else if(i){var d=null;if(l&&l.hasAttribute("formAction")){if(n=l,i=l[Ys]||null)d=i.formAction;else if(no(n)!==null)continue}else d=i.action;typeof d=="function"?e[a+1]=d:(e.splice(a,3),a-=3),hv(e)}}}function gv(){function s(l){l.canIntercept&&l.info==="react-transition"&&l.intercept({handler:function(){return new Promise(function(i){return n=i})},focusReset:"manual",scroll:"manual"})}function t(){n!==null&&(n(),n=null),a||setTimeout(e,20)}function e(){if(!a&&!navigation.transition){var l=navigation.currentEntry;l&&l.url!=null&&navigation.navigate(l.url,{state:l.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,n=null;return navigation.addEventListener("navigate",s),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(e,100),function(){a=!0,navigation.removeEventListener("navigate",s),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),n!==null&&(n(),n=null)}}}function io(s){this._internalRoot=s}Rl.prototype.render=io.prototype.render=function(s){var t=this._internalRoot;if(t===null)throw Error(_(409));var e=t.current,a=it();ov(e,a,s,t,null,null)},Rl.prototype.unmount=io.prototype.unmount=function(){var s=this._internalRoot;if(s!==null){this._internalRoot=null;var t=s.containerInfo;ov(s.current,2,null,s,null,null),ml(),t[Ze]=null}};function Rl(s){this._internalRoot=s}Rl.prototype.unstable_scheduleHydration=function(s){if(s){var t=Do();s={blockedOn:null,target:s,priority:t};for(var e=0;e<me.length&&t!==0&&t<me[e].priority;e++);me.splice(e,0,s),e===0&&_v(s)}};var bv=S.version;if(bv!=="19.2.7")throw Error(_(527,bv,"19.2.7"));L.findDOMNode=function(s){var t=s._reactInternals;if(t===void 0)throw typeof s.render=="function"?Error(_(188)):(s=Object.keys(s).join(","),Error(_(268,s)));return s=C(t),s=s!==null?R(s):null,s=s===null?null:s.stateNode,s};var t1={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:w,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ul=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ul.isDisabled&&Ul.supportsFiber)try{Da=Ul.inject(t1),Ps=Ul}catch{}}return kn.createRoot=function(s,t){if(!M(s))throw Error(_(299));var e=!1,a="",n=Sr,l=Mr,i=Dr;return t!=null&&(t.unstable_strictMode===!0&&(e=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onUncaughtError!==void 0&&(n=t.onUncaughtError),t.onCaughtError!==void 0&&(l=t.onCaughtError),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=iv(s,1,!1,null,null,e,a,null,n,l,i,gv),s[Ze]=t.current,qd(s),new io(t)},kn.hydrateRoot=function(s,t,e){if(!M(s))throw Error(_(299));var a=!1,n="",l=Sr,i=Mr,d=Dr,o=null;return e!=null&&(e.unstable_strictMode===!0&&(a=!0),e.identifierPrefix!==void 0&&(n=e.identifierPrefix),e.onUncaughtError!==void 0&&(l=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(d=e.onRecoverableError),e.formState!==void 0&&(o=e.formState)),t=iv(s,1,!0,t,e??null,a,n,o,l,i,d,gv),t.context=dv(null),e=t.current,a=it(),a=Il(a),n=ne(a),n.callback=null,le(e,n,a),e=a,t.current.lanes=e,Ba(t,e),Lt(t),s[Ze]=t.current,qd(s),new Rl(t)},kn.version="19.2.7",kn}var Lv;function u1(){if(Lv)return co.exports;Lv=1;function v(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(v)}catch(S){console.error(S)}}return v(),co.exports=r1(),co.exports}var v1=u1(),js=go();const p1=[{id:"buttons",title:"Buttons",desc:"Trigger actions, submit forms, and navigate flows. Use one primary action per view: secondary and invisible variants for supporting actions.",html:`<section class="ds-chapter ds-tab-panel">
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
    <button type="button" class="tds-action-list-item" role="menuitem">Action list item</button>
    <button type="button" class="tds-action-list-item" role="menuitem">Action list item</button>
    <button type="button" class="tds-action-list-item" role="menuitem">Action list item</button>
    <button type="button" class="tds-action-list-item" role="menuitem">Action list item</button>
    <button type="button" class="tds-action-list-item" role="menuitem">Action list item</button>
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
              <label class="tds-action-list-item"><input type="checkbox" class="tds-checkbox" value="Active"><span>Active</span></label>
              <label class="tds-action-list-item"><input type="checkbox" class="tds-checkbox" value="Pending"><span>Pending</span></label>
              <label class="tds-action-list-item"><input type="checkbox" class="tds-checkbox" value="Suspended"><span>Suspended</span></label>
              <label class="tds-action-list-item"><input type="checkbox" class="tds-checkbox" value="Closed"><span>Closed</span></label>
              <label class="tds-action-list-item"><input type="checkbox" class="tds-checkbox" value="Under review"><span>Under review</span></label>
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
                <span>Business verification</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="Identity check">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" stroke-width="1.25"/><path d="M3 13.5c0-2.5 2.2-4 5-4s5 1.5 5 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
                <span>Identity check</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="Document review">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 2h6l3 3v9a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.25"/><path d="M10 2v3h3M6 8h4M6 11h4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
                <span>Document review</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="AML screening">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.25"/><path d="M8 5v4M8 11h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>
                <span>AML screening</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="Ongoing monitoring">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.25"/><path d="M8 4.5V8l2.5 1.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg></span>
                <span>Ongoing monitoring</span>
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
                <span>Canada</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="United States">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><span class="fi fi-us"></span></span>
                <span>United States</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="United Kingdom">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><span class="fi fi-gb"></span></span>
                <span>United Kingdom</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="France">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><span class="fi fi-fr"></span></span>
                <span>France</span>
              </div>
              <div class="tds-action-list-item" role="option" data-value="Germany">
                <span class="tds-action-list-item__leading-visual" aria-hidden="true"><span class="fi fi-de"></span></span>
                <span>Germany</span>
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
          <div class="tds-action-list-item"><span>Dashboard</span></div>
          <div class="tds-action-list-item"><span>Verifications</span></div>
          <div class="tds-action-list-item"><span>Entities</span></div>
          <div class="tds-action-list-item"><span>Reports</span></div>
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
          <div class="tds-action-list-item"><span>Edit profile</span></div>
          <div class="tds-action-list-item"><span>View history</span></div>
          <div class="tds-dropdown-panel__divider"></div>
          <div class="tds-action-list-item" style="color: var(--text-negative);"><span>Delete</span></div>
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
          <div class="tds-dropdown-panel__header">Filter by status</div>
          <label class="tds-action-list-item">
            <input type="checkbox" class="tds-checkbox" checked>
            <span>Verified</span>
          </label>
          <label class="tds-action-list-item">
            <input type="checkbox" class="tds-checkbox" checked>
            <span>Pending</span>
          </label>
          <label class="tds-action-list-item">
            <input type="checkbox" class="tds-checkbox">
            <span>Rejected</span>
          </label>
          <label class="tds-action-list-item">
            <input type="checkbox" class="tds-checkbox">
            <span>Draft</span>
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
            <span>Date created</span>
          </label>
          <label class="tds-action-list-item">
            <input type="radio" name="dd-radio" class="tds-radio">
            <span>Name (A–Z)</span>
          </label>
          <label class="tds-action-list-item">
            <input type="radio" name="dd-radio" class="tds-radio">
            <span>Risk level</span>
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
            <span>Neutral</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual"><svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><circle cx="10.5" cy="6.5" r="1" fill="currentColor"/><path d="M5 11c.8-1.2 2-1.8 3-1.8s2.2.6 3 1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
            <span>Sad</span>
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
            <span>Teal</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual"><span style="display:block;width:14px;height:14px;border-radius:3px;background:var(--color-violet-60);"></span></span>
            <span>Violet</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual"><span style="display:block;width:14px;height:14px;border-radius:3px;background:var(--color-amber-border);"></span></span>
            <span>Amber</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual"><span style="display:block;width:14px;height:14px;border-radius:3px;background:var(--color-red-border);"></span></span>
            <span>Red</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual"><span style="display:block;width:14px;height:14px;border-radius:3px;background:var(--color-green-border);"></span></span>
            <span>Green</span>
          </div>
        </div>

        <div class="tds-dropdown-panel" style="width: 220px;">
          <div class="tds-dropdown-panel__header">Region</div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual"><span class="fi fi-ca"></span></span>
            <span>Canada</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual"><span class="fi fi-us"></span></span>
            <span>United States</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__leading-visual"><span class="fi fi-gb"></span></span>
            <span>United Kingdom</span>
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
</section>`}],Zl=[{id:"buttons",label:"Buttons",icon:"buttons"},{id:"inputs",label:"Inputs",icon:"inputs"},{id:"controls",label:"Controls",icon:"controls"},{id:"tags",label:"Tags",icon:"tags"},{id:"navigation",label:"Navigation",icon:"navigation"},{id:"disclosure",label:"Disclosure",icon:"disclosure"},{id:"data",label:"Data",icon:"data"},{id:"typography",label:"Typography",icon:"typography"},{id:"tokens",label:"Tokens",icon:"tokens"},{id:"tracker",label:"Tracker",icon:"tracker"}],_1=Zl.map(v=>v.id),f1=[{title:"Token-driven",body:"Colors, type, and spacing from tokens.css. Never hard-code hex values."},{title:"Figma parity",body:"Every tds- class traces to a component in Trulioo ADS 2026."},{title:"Copy & ship",body:"Grab the markup from each demo and drop it into your feature branch."}],Av={buttons:'<rect fill="none" stroke="currentColor" stroke-width="2" x="2" y="7" width="20" height="10" rx="2"/>',inputs:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M7 22h1a4 4 0 0 0 4-4v-1"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M7 2h1a4 4 0 0 1 4 4v1"/>',controls:'<rect fill="none" stroke="currentColor" stroke-width="2" x="2" y="6" width="20" height="12" rx="6"/><circle cx="8" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="2"/>',tags:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" stroke="none"/>',navigation:'<rect fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" x="3" y="3" width="18" height="18" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 3v18"/>',disclosure:'<rect fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" x="3" y="3" width="18" height="18" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M3 9h18"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m9 15 3 3 3-3"/>',data:'<rect fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" x="3" y="3" width="18" height="18" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M3 9h18M3 15h18M12 3v18"/>',typography:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 7V4h16v3"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 20h6"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 4v16"/>',tokens:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5S13 7 12 2c-1 5-2 6.4-4 8.5S5 17 5 15a7 7 0 0 0 7 7z"/>',tracker:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 19V5"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M10 19V9"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16 19v-6"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M22 19V11"/>'};function h1({name:v}){return c.jsx("svg",{className:"tds-preview__nav-glyph",width:"16",height:"16",viewBox:"0 0 24 24","aria-hidden":"true",dangerouslySetInnerHTML:{__html:Av[v]??""}})}function g1(){return c.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"tds-preview__icon-sprite","aria-hidden":"true",focusable:"false",children:Object.entries(Av).map(([v,S])=>c.jsx("symbol",{id:`pr-i-${v}`,viewBox:"0 0 24 24",dangerouslySetInnerHTML:{__html:S}},v))})}function b1({activeTab:v,isHome:S,isOpen:D,onSelect:_,onHome:M,onToggle:N}){return c.jsxs("aside",{className:"tds-preview__sidebar","aria-label":"Component navigation","data-expanded":D,children:[c.jsxs("div",{className:"tds-preview__sidebar-inner",children:[c.jsxs("button",{type:"button",className:"tds-preview__brand",onClick:M,"aria-current":S?"page":void 0,children:[c.jsx("span",{className:"tds-preview__brand-mark",children:"TDS"}),c.jsxs("span",{className:"tds-preview__brand-text",children:[c.jsx("span",{className:"tds-preview__brand-name",children:"Trulioo DS"}),c.jsx("span",{className:"tds-preview__brand-tag",children:"Component reference"})]})]}),c.jsx("p",{className:"tds-preview__nav-label",children:"Components"}),c.jsx("nav",{className:"tds-preview__nav",role:"tablist","aria-label":"Components",children:Zl.map(V=>{const j=!S&&V.id===v;return c.jsxs("button",{type:"button",className:`tds-preview__nav-link${j?" is-active":""}`,role:"tab",id:`tab-${V.id}`,"aria-selected":j,tabIndex:j?0:-1,"aria-label":V.label,title:V.label,onClick:()=>_(V.id),children:[c.jsx("span",{className:"tds-preview__nav-icon","aria-hidden":"true",children:c.jsx(h1,{name:V.icon})}),c.jsx("span",{className:"tds-preview__nav-label-text",children:V.label})]},V.id)})}),c.jsxs("div",{className:"tds-preview__sidebar-footer",children:[c.jsxs("p",{children:["Synced from"," ",c.jsx("a",{href:"https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026",target:"_blank",rel:"noopener noreferrer",children:"Figma ADS 2026"})]}),c.jsxs("p",{className:"tds-preview__sidebar-note",children:["Classes use the ",c.jsx("code",{children:"tds-"})," prefix."]})]})]}),c.jsx("button",{type:"button",className:"tds-preview__sidebar-toggle",onClick:N,"aria-label":"Collapse sidebar","aria-expanded":D,children:c.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14","aria-hidden":"true",children:c.jsx("path",{d:"M9 3L4 7l5 4",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]})}function m1({activeLabel:v,activeTab:S,isHome:D,sidebarOpen:_,onSelect:M,onHome:N,onToggleSidebar:V}){return c.jsxs("header",{className:"tds-preview__topbar",children:[c.jsxs("div",{className:"tds-preview__topbar-row",children:[c.jsx("button",{type:"button",className:"tds-preview__topbar-menu",onClick:V,"aria-label":_?"Close sidebar":"Open sidebar","aria-expanded":_,children:c.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:c.jsx("path",{d:"M2.5 4h11M2.5 8h11M2.5 12h11",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}),c.jsxs("button",{type:"button",className:"tds-preview__topbar-brand",onClick:N,children:[c.jsx("span",{className:"tds-preview__topbar-mark",children:"TDS"}),c.jsx("span",{className:"tds-preview__topbar-title",children:D?"Overview":v})]})]}),c.jsx("nav",{className:"tds-preview__mobile-tabs",role:"tablist","aria-label":"Components",children:Zl.map(j=>{const T=!D&&j.id===S;return c.jsx("button",{type:"button",className:`tds-preview__mobile-tab${T?" is-active":""}`,role:"tab","aria-selected":T,onClick:()=>M(j.id),children:j.label},j.id)})})]})}function w1({features:v,onExplore:S}){return c.jsxs("section",{className:"tds-preview__hero",children:[c.jsxs("div",{className:"tds-preview__hero-orbs","aria-hidden":"true",children:[c.jsx("div",{className:"tds-preview__hero-orb tds-preview__hero-orb--1"}),c.jsx("div",{className:"tds-preview__hero-orb tds-preview__hero-orb--2"}),c.jsx("div",{className:"tds-preview__hero-orb tds-preview__hero-orb--3"})]}),c.jsxs("div",{className:"tds-preview__hero-inner",children:[c.jsxs("div",{className:"tds-preview__hero-badge",children:[c.jsx("span",{className:"tds-preview__hero-badge-dot","aria-hidden":"true"}),"For product & engineering teams"]}),c.jsxs("h1",{className:"tds-preview__hero-title",children:["Build with",c.jsx("br",{}),c.jsx("span",{className:"tds-preview__hero-title-accent",children:"clarity."})]}),c.jsx("p",{className:"tds-preview__hero-lead",children:"A living reference for the Trulioo component library: what each piece does, when to use it, and the exact class names to apply. Pure CSS, mapped 1:1 from Figma."}),c.jsxs("div",{className:"tds-preview__hero-actions",children:[c.jsxs("button",{type:"button",className:"tds-preview__hero-cta",onClick:S,children:["Explore components",c.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:c.jsx("path",{d:"M3 8h10M9 4l4 4-4 4",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]}),c.jsx("a",{href:"https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026",target:"_blank",rel:"noopener noreferrer",className:"tds-preview__hero-secondary",children:"Open in Figma"})]}),c.jsxs("div",{className:"tds-preview__hero-highlights",children:[c.jsx("p",{className:"tds-preview__hero-highlights-label",children:"Get the highlights."}),c.jsx("div",{className:"tds-preview__hero-grid",children:v.map((D,_)=>c.jsxs("article",{className:"tds-preview__hero-card",style:{animationDelay:`${240+_*80}ms`},children:[c.jsx("strong",{children:D.title}),c.jsx("span",{children:D.body})]},D.title))})]})]})]})}function zv({title:v,desc:S,eyebrow:D="Component family"}){return c.jsxs("header",{className:"tds-preview__chapter-header",children:[c.jsx("p",{className:"tds-preview__chapter-eyebrow",children:D}),c.jsx("h1",{className:"tds-preview__chapter-title",children:v}),c.jsx("p",{className:"tds-preview__chapter-desc",children:S})]})}function k1({section:v,active:S}){const D=v.html.replace(/\.\.\/\.\.\/assets\//g,"/assets/");return c.jsxs("div",{className:`tds-preview__panel${S?" is-active":""}`,role:"tabpanel",id:v.id,"aria-labelledby":`tab-${v.id}`,hidden:!S,children:[c.jsx(zv,{title:v.title,desc:v.desc}),c.jsx("div",{className:"tds-preview__demos",dangerouslySetInnerHTML:{__html:D}})]})}const y1="2026-07-27T17:59:12.176Z",x1={totalComponents:50,cssDone:46,cssPartial:0,cssNotStarted:3,figmaDone:50,figmaEligible:50,figmaDonePercent:100,adoption:{preview:{used:42,total:45,percent:93},bv:{used:14,total:45,percent:31},dv:{used:15,total:45,percent:33}}},C1=JSON.parse('[{"id":"button","name":"Button","category":"Core Controls","figmaStatus":"Done","figmaVariants":72,"cssFile":"button/button.css","classPrefixes":["tds-btn"],"figmaNodeId":"96:2225","notes":"4 variants x 3 sizes x 5 states + alignment; loading boolean with spinner","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"icon-button","name":"IconButton","category":"Core Controls","figmaStatus":"Done","figmaVariants":168,"cssFile":"icon-button/icon-button.css","classPrefixes":["tds-icon-btn"],"figmaNodeId":"1371:22653","notes":"4 variants x 3 sizes x 7 states x 2 shapes; loading swaps icon for .tds-spinner--xs","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"button-group","name":"ButtonGroup","category":"Core Controls","figmaStatus":"Done","figmaVariants":15,"cssFile":"button-group/button-group.css","classPrefixes":["tds-button-group"],"subComponents":"Button, IconButton","figmaNodeId":"1952:33320","notes":"Segmented control; iconButtons, buttons, or mixed; count 2–5","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"spinner","name":"Spinner","category":"Core Controls","figmaStatus":"Done","figmaVariants":8,"cssFile":"spinner/spinner.css","classPrefixes":["tds-spinner","tds-spinner-block"],"figmaNodeId":"2092:18230","notes":"5 sizes (xs–xl); optional label block; used by Button and IconButton loading","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"button-menu","name":"ButtonMenu","category":"Core Controls","figmaStatus":"Done","figmaVariants":12,"cssFile":"button-menu/button-menu.css","classPrefixes":["tds-button-menu"],"subComponents":"DropdownPanel","figmaNodeId":"832:13390","notes":"Uses dropdown-panel for menu","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"switch","name":"Switch","category":"Core Controls","figmaStatus":"Done","figmaVariants":8,"cssFile":"switch/switch.css","classPrefixes":["tds-switch"],"figmaNodeId":"96:3234","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"checkbox","name":"Checkbox","category":"Core Controls","figmaStatus":"Done","figmaVariants":6,"cssFile":"checkbox/checkbox.css","classPrefixes":["tds-checkbox"],"figmaNodeId":"299:12998","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"dismiss-action","name":"DismissAction","category":"Core Controls","figmaStatus":"Done","figmaVariants":12,"cssFile":"dismiss-action/dismiss-action.css","classPrefixes":["tds-dismiss"],"figmaNodeId":"331:8149","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"text-input","name":"TextInput","category":"Form Inputs","figmaStatus":"Done","figmaVariants":97,"cssFile":"text-input/text-input.css","classPrefixes":["tds-text-input"],"subComponents":"FieldLabel, FieldCaption, FieldValidation","figmaNodeId":"96:3268","notes":"Imports shared atoms via @import","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":false},{"id":"select","name":"Select","category":"Form Inputs","figmaStatus":"Done","figmaVariants":30,"cssFile":"select/select.css","classPrefixes":["tds-select","tds-combobox"],"subComponents":"FieldLabel, FieldCaption, FieldValidation, Caret, DropdownPanel, Tag","figmaNodeId":"96:1624","notes":"Includes combobox variant","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"date-picker","name":"DatePicker","category":"Form Inputs","figmaStatus":"Done","cssFile":"date-picker/date-picker.css","classPrefixes":["tds-date-picker","tds-date-picker-range"],"subComponents":"FieldLabel, FieldCaption, FieldValidation","figmaNodeId":"1632:29292","notes":"Single and range calendar variants","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"radio","name":"Radio","category":"Form Inputs","figmaStatus":"Done","figmaVariants":6,"cssFile":"_shared/radio/radio.css","classPrefixes":["tds-radio"],"figmaNodeId":"100:4253","notes":"Shared atom","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"radio-group","name":"RadioGroup","category":"Form Inputs","figmaStatus":"Done","figmaVariants":6,"cssFile":"radio-group/radio-group.css","classPrefixes":["tds-radio-group"],"subComponents":"Radio","figmaNodeId":"100:4222","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"radio-card","name":"RadioCard","category":"Form Inputs","figmaStatus":"Done","figmaVariants":2,"cssFile":"radio-card/radio-card.css","classPrefixes":["tds-radio-card"],"subComponents":"Radio, Checkbox","figmaNodeId":"359:3332","notes":"single-selection (radio) or multi-selection (checkbox)","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"field-label","name":"FieldLabel","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":2,"cssFile":"_shared/field-label/field-label.css","classPrefixes":["tds-field-label"],"figmaNodeId":"107:2085","notes":"Used by TextInput, Select","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":false},{"id":"field-caption","name":"FieldCaption","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":0,"cssFile":"_shared/field-caption/field-caption.css","classPrefixes":["tds-field-caption"],"notes":"Used by TextInput, Select","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"field-validation","name":"FieldValidation","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":2,"cssFile":"_shared/field-validation/field-validation.css","classPrefixes":["tds-field-validation"],"figmaNodeId":"107:2078","notes":"Used by TextInput, Select","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":false},{"id":"caret","name":"Caret","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":3,"cssFile":"_shared/caret/caret.css","classPrefixes":["tds-caret"],"figmaNodeId":"640:9140","notes":"Used by Select, Tooltip","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"dropdown-panel","name":"DropdownPanel","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":12,"cssFile":"_shared/dropdown-panel/dropdown-panel.css","classPrefixes":["tds-dropdown-panel"],"subComponents":"ActionListItem","figmaNodeId":"320:21652","notes":"MenuType text|multiSelect|icon|flag; GroupHeading caption header + optional Clear all link; 30px items at 4px inset. Positioning via dropdown-panel.js. Used by Select, ButtonMenu, FilterButton, SortButton","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"tag","name":"Tag","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":112,"cssFile":"_shared/tag/tag.css","classPrefixes":["tds-tag"],"figmaNodeId":"331:8199","notes":"Used by Select, Accordion","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"ai-tag","name":"AITag","category":"Data Display","figmaStatus":"Done","figmaVariants":4,"cssFile":"ai-tag/ai-tag.css","classPrefixes":["tds-ai-tag"],"figmaNodeId":"1821:33907","notes":"TruAI badge; sparkles icon always required","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"side-nav","name":"SideNav","category":"Navigation","figmaStatus":"Done","figmaVariants":3,"cssFile":"side-nav/side-nav.css","classPrefixes":["tds-side-nav","tds-side-nav-preview"],"subComponents":"NavItem, NavList, SubItem, UserProfile","figmaNodeId":"1188:10384","notes":"3 modes: expanded, collapsed, mobile","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"nav-item","name":"NavItem","category":"Navigation","figmaStatus":"Done","figmaVariants":15,"cssFile":"side-nav/nav-item/nav-item.css","classPrefixes":["tds-side-nav__nav-item"],"notes":"Nested under side-nav/","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"nav-list","name":"NavList","category":"Navigation","figmaStatus":"Done","figmaVariants":0,"cssFile":"side-nav/nav-list/nav-list.css","classPrefixes":["tds-nav-list"],"notes":"Nested under side-nav/","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"tabs","name":"Tabs","category":"Navigation","figmaStatus":"Done","figmaVariants":10,"cssFile":"tabs/tabs.css","classPrefixes":["tds-tabs"],"subComponents":"TabItem","figmaNodeId":"405:8964","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"tab-item","name":"TabItem","category":"Navigation","figmaStatus":"Done","figmaVariants":4,"cssFile":"tabs/tab-item/tab-item.css","classPrefixes":["tds-tab-item"],"figmaNodeId":"403:5492","notes":"Nested under tabs/","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"filter-tab","name":"FilterTabs","category":"Navigation","figmaStatus":"Done","figmaVariants":3,"cssFile":"filter-tab/filter-tab.css","classPrefixes":["tds-filter-tab","tds-filter-tabs"],"subComponents":"FilterTabsItem","figmaNodeId":"844:6968","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"breadcrumb","name":"Breadcrumb","category":"Navigation","figmaStatus":"Done","cssFile":"breadcrumb/breadcrumb.css","classPrefixes":["tds-breadcrumbs","tds-breadcrumb-item"],"figmaNodeId":"1596:23587","notes":"BreadCrumbs container, item, and divider","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"filter-tab-2","name":"FilterTabsItem","category":"Navigation","figmaStatus":"Done","figmaVariants":12,"cssFile":"filter-tab/filter-tab.css","notes":"Shares CSS file with FilterTabs; adoption tracked on FilterTabs","classPrefixes":[],"cssStatus":"Done","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"data-table","name":"DataTable","category":"Data Display","figmaStatus":"Done","figmaVariants":12,"cssFile":"data-table/data-table.css","classPrefixes":["tds-data-table","tds-data-table-container"],"subComponents":"ColumnHeaderCell, Row, Header, SortButton, Signals, SectionHeader","figmaNodeId":"884:13685","notes":"Complex composite with many sub-components","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"data-field","name":"DataField","category":"Data Display","figmaStatus":"Done","figmaVariants":24,"cssFile":"data-field/data-field.css","classPrefixes":["tds-data-field"],"figmaNodeId":"856:13029","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"counter-label","name":"CounterLabel","category":"Data Display","figmaStatus":"Done","figmaVariants":24,"cssFile":"counter-label/counter-label.css","classPrefixes":["tds-counter"],"figmaNodeId":"409:9115","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"section-header","name":"SectionHeader","category":"Data Display","figmaStatus":"Done","figmaVariants":32,"cssFile":"section-header/section-header.css","classPrefixes":["tds-section-header"],"figmaNodeId":"1816:29234","notes":"Groups table sections; composes Tag, Counter, Button","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"dismiss-issue-badge","name":"DismissIssueBadge","category":"Data Display","figmaStatus":"Done","figmaVariants":12,"cssFile":"dismiss-issue-badge/dismiss-issue-badge.css","classPrefixes":["tds-dismiss-badge"],"figmaNodeId":"331:8174","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"flag-icon","name":"CountryFlag","category":"Data Display","figmaStatus":"Done","figmaVariants":255,"cssFile":"flag-icon/flag-icon.css","classPrefixes":["fi","tds-select__country-flag"],"figmaNodeId":"299:8750","notes":"255 country codes","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"action-list-item","name":"ActionListItem","category":"Data Display","figmaStatus":"Done","figmaVariants":0,"cssFile":"action-list-item/action-list-item.css","classPrefixes":["tds-action-list-item"],"notes":"Used inside DropdownPanel","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":true},{"id":"stat-card","name":"StatCard","category":"Data Display","figmaStatus":"Done","figmaVariants":2,"cssFile":"stat-card/stat-card.css","classPrefixes":["tds-stat-card"],"figmaNodeId":"915:9281","cssStatus":"Done","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"tooltip","name":"Tooltip","category":"Feedback","figmaStatus":"Done","figmaVariants":16,"cssFile":"tooltip/tooltip.css","classPrefixes":["tds-tooltip"],"subComponents":"Caret","figmaNodeId":"1054:18565","notes":"Body + Caret sub-components","cssStatus":"Done","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"announcement","name":"Announcement","category":"Feedback","figmaStatus":"Done","figmaVariants":10,"cssFile":"announcement/announcement.css","classPrefixes":["tds-announcement"],"figmaNodeId":"866:13118","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":true},{"id":"accordion","name":"Accordion","category":"Containers","figmaStatus":"Done","figmaVariants":102,"cssFile":"accordion/accordion.css","classPrefixes":["tds-accordion"],"subComponents":"Tag, CounterLabel, DataFieldList","figmaNodeId":"810:5659","notes":"Complex component with many states","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"dialog","name":"Dialog","category":"Feedback","figmaStatus":"Done","figmaVariants":35,"cssFile":"dialog/dialog.css","classPrefixes":["tds-dialog"],"subComponents":"Button, IconButton","figmaNodeId":"1654:27850","notes":"Center sizes sm–xl, left/right drawers, bottom sheet, full screen; header badge + trailing slots; footer label/caption + up to 3 buttons","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"progress-indicator","name":"ProgressIndicator","category":"Progress","figmaStatus":"Done","figmaVariants":18,"cssFile":"progress-indicator/progress-indicator.css","classPrefixes":["tds-progress-indicator"],"subComponents":"_ProgressIndicatorItem","figmaNodeId":"1242:22104","notes":"Horizontal step progress","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":true},{"id":"step-progress","name":"StepProgress","category":"Progress","figmaStatus":"Done","figmaVariants":7,"classPrefixes":[],"subComponents":"_StepProgressItem","figmaNodeId":"1264:24192","notes":"Figma only, CSS pending","cssStatus":"Not Started","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"listed-progress-item","name":"ListedProgressItem","category":"Progress","figmaStatus":"Done","figmaVariants":6,"classPrefixes":[],"subComponents":"Button, Link, IconButton, Tag","figmaNodeId":"1267:24260","notes":"Figma only, CSS pending","cssStatus":"Not Started","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"score-gauge","name":"ScoreGauge","category":"Scoring","figmaStatus":"Done","figmaVariants":0,"cssFile":"score-gauge/score-gauge.css","classPrefixes":["score-gauge"],"notes":"SVG-based, has JS + React variants","cssStatus":"Done","usedInPreview":false,"usedInBV":false,"usedInDV":true},{"id":"score-card","name":"ScoreCard","category":"Scoring","figmaStatus":"Done","figmaVariants":3,"classPrefixes":[],"subComponents":"ScoreGauge","figmaNodeId":"916:9298","notes":"CSS pending","cssStatus":"Not Started","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"risk-category-card","name":"RiskCategoryCard","category":"Scoring","figmaStatus":"Done","figmaVariants":3,"cssFile":"risk-category-card/risk-category-card.css","classPrefixes":["tds-risk-category-card"],"figmaNodeId":"920:9307","notes":"Category title, risk tag, signal count, and score out of 100","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"font-awesome-icon","name":"FontAwesome Icon","category":"Utility","figmaStatus":"Done","figmaVariants":42,"classPrefixes":[],"figmaNodeId":"544:9787","notes":"Icon system, no standalone CSS","cssStatus":"N/A","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"filter-button","name":"FilterButton","category":"Utility","figmaStatus":"Done","figmaVariants":6,"cssFile":"filter-button/filter-button.css","classPrefixes":["tds-filter-button"],"subComponents":"DropdownPanel, CounterLabel","figmaNodeId":"836:13511","notes":"Selected trigger shows value + xmark clear; counter only with 2+ active filters (+N); clear resets all selections via tds-filter-clear","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"sort-button","name":"SortButton","category":"Utility","figmaStatus":"Done","figmaVariants":4,"cssFile":"data-table/sort-button/sort-button.css","classPrefixes":["tds-sort-button"],"subComponents":"DropdownPanel","figmaNodeId":"2191:46183","notes":"Selected trigger shows sort value + xmark clear; open selected reverts label to Sort; clear resets via tds-sort-clear","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false}]'),S1=[{name:"Toast / Snackbar",category:"Feedback",priority:"High",description:"Temporary notification bar with auto-dismiss",dependsOn:"DismissAction",notes:"For success/error feedback"},{name:"Alert / InlineNotification",category:"Feedback",priority:"High",description:"Persistent inline message with icon and dismiss",dependsOn:"DismissAction",notes:"Replaces Announcement for inline use"},{name:"Badge",category:"Data Display",priority:"High",description:"Small count or status indicator on icons/avatars",notes:"Needed for nav items, notifications"},{name:"Avatar",category:"Data Display",priority:"High",description:"User/entity photo or initials circle",notes:"Used in SideNav UserProfile, comments"},{name:"Pagination",category:"Navigation",priority:"High",description:"Page navigation with prev/next and page numbers",dependsOn:"Button, IconButton",notes:"Used with DataTable"},{name:"Skeleton / Loading",category:"Feedback",priority:"Medium",description:"Shimmer placeholder for loading states",notes:"For progressive content loading"},{name:"Popover",category:"Feedback",priority:"Medium",description:"Anchored floating content panel (non-modal)",dependsOn:"Caret, DropdownPanel",notes:"For rich hover/click content"},{name:"Card",category:"Containers",priority:"Medium",description:"Bordered content container with header and actions",notes:"General-purpose content wrapper"},{name:"Divider",category:"Utility",priority:"Medium",description:"Horizontal or vertical separator line",notes:"For section separation"},{name:"Textarea",category:"Form Inputs",priority:"Medium",description:"Multi-line text input with auto-resize",dependsOn:"FieldLabel, FieldCaption, FieldValidation",notes:"For notes, comments"},{name:"SearchInput",category:"Form Inputs",priority:"Medium",description:"Text input with search icon and clear action",dependsOn:"TextInput, DismissAction",notes:"For filtering lists/tables"},{name:"Slider / RangeInput",category:"Form Inputs",priority:"Low",description:"Continuous or stepped range selector",notes:"For score thresholds"},{name:"FileUpload",category:"Form Inputs",priority:"Low",description:"Drag-and-drop or click-to-browse file input",dependsOn:"Button",notes:"For document upload flows"},{name:"ProgressBar",category:"Progress",priority:"Low",description:"Linear determinate/indeterminate progress",notes:"For upload/processing progress"},{name:"EmptyState",category:"Feedback",priority:"Low",description:"Illustration + message for zero-data scenarios",dependsOn:"Button",notes:"For empty tables, search results"},{name:"TopNav / AppBar",category:"Navigation",priority:"Low",description:"Horizontal top navigation bar",dependsOn:"Button, Avatar, Badge",notes:"If app needs a top bar"},{name:"SegmentedControl",category:"Core Controls",priority:"Low",description:"Toggle between 2–5 mutually exclusive options",notes:"Alternative to Tabs for settings"},{name:"Timeline",category:"Data Display",priority:"Low",description:"Vertical timeline with events and connectors",notes:"For entity history/audit trail"},{name:"TreeView",category:"Navigation",priority:"Low",description:"Hierarchical collapsible list",notes:"For nested entity structures"}],M1=["Unlisted component folder in Components/: risk-category-strip"],D1={lastBuiltAt:y1,summary:x1,components:C1,planned:S1,warnings:M1},L1=D1;function yn({value:v,max:S=100,label:D,tone:_="brand",size:M="sm"}){const N=S>0?Math.min(100,Math.round(v/S*100)):0;return c.jsx("div",{className:`tds-preview__tracker-progress tds-preview__tracker-progress--${_} tds-preview__tracker-progress--${M}`,role:"progressbar","aria-valuenow":N,"aria-valuemin":0,"aria-valuemax":100,"aria-label":D,children:c.jsx("div",{className:"tds-preview__tracker-progress-fill",style:{width:`${N}%`}})})}function B1({segments:v,total:S,label:D}){const _=S>0?S:1;return c.jsxs("div",{className:"tds-preview__tracker-segmented",role:"img","aria-label":D,children:[c.jsx("div",{className:"tds-preview__tracker-segmented-track",children:v.map(M=>{const N=M.value/_*100;return N<=0?null:c.jsx("div",{className:`tds-preview__tracker-segment tds-preview__tracker-segment--${M.tone}`,style:{width:`${N}%`},title:`${M.label}: ${M.value}`},M.label)})}),c.jsx("ul",{className:"tds-preview__tracker-segmented-legend",children:v.map(M=>c.jsxs("li",{className:`tds-preview__tracker-stat-chip tds-preview__tracker-stat-chip--${M.tone}`,children:[c.jsx("span",{className:"tds-preview__tracker-stat-chip-value",children:M.value}),c.jsx("span",{className:"tds-preview__tracker-stat-chip-label",children:M.label})]},M.label))})]})}function T1(v){return v>=1?"positive":v>=.5?"intermediate":v>0?"brand":"neutral"}function Bv({title:v,description:S,rows:D,valueSuffix:_="",showPercent:M=!0,compact:N=!1}){return c.jsxs("article",{className:`tds-preview__tracker-chart${N?" tds-preview__tracker-chart--compact":""}`,children:[c.jsxs("header",{className:"tds-preview__tracker-chart-header",children:[c.jsx("h4",{className:"tds-preview__tracker-chart-title",children:v}),S&&c.jsx("p",{className:"tds-preview__tracker-chart-lead",children:S})]}),c.jsx("ul",{className:"tds-preview__tracker-bar-chart",children:D.map(V=>{const j=V.max>0?Math.min(100,Math.round(V.value/V.max*100)):0,T=V.tone??T1(V.value/V.max);return c.jsxs("li",{className:"tds-preview__tracker-bar-row",children:[c.jsxs("div",{className:"tds-preview__tracker-bar-head",children:[c.jsx("span",{className:"tds-preview__tracker-bar-label",children:V.label}),c.jsxs("span",{className:"tds-preview__tracker-bar-value",children:[M&&c.jsxs("strong",{className:"tds-preview__tracker-bar-percent",children:[j,"%"]}),(V.meta||!M)&&c.jsxs("span",{className:"tds-preview__tracker-bar-detail",children:[!M&&c.jsxs(c.Fragment,{children:[V.value,_]}),V.meta&&c.jsxs("span",{className:"tds-preview__tracker-bar-meta",children:[!M&&_?" · ":"",V.meta]})]})]})]}),c.jsx("div",{className:"tds-preview__tracker-bar-track","aria-hidden":"true",children:c.jsx("div",{className:`tds-preview__tracker-bar-fill tds-preview__tracker-bar-fill--${T}`,style:{width:`${j}%`}})})]},V.label)})})]})}function E1({summary:v}){return c.jsxs("div",{className:"tds-preview__tracker-metrics",children:[c.jsxs("article",{className:"tds-preview__tracker-metric",children:[c.jsx("span",{className:"tds-preview__tracker-metric-label",children:"CSS built"}),c.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[v.cssDone,c.jsxs("span",{className:"tds-preview__tracker-metric-total",children:[" / ",v.totalComponents]})]}),c.jsx(yn,{value:v.cssDone,max:v.totalComponents,label:`CSS built: ${v.cssDone} of ${v.totalComponents}`,tone:"positive"}),c.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:[v.cssPartial," partial · ",v.cssNotStarted," not started"]})]}),c.jsxs("article",{className:"tds-preview__tracker-metric",children:[c.jsx("span",{className:"tds-preview__tracker-metric-label",children:"Figma complete"}),c.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[v.figmaDonePercent,"%"]}),c.jsx(yn,{value:v.figmaDonePercent,label:`Figma complete: ${v.figmaDonePercent}%`,tone:"positive"}),c.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:[v.figmaDone," of ",v.figmaEligible," components"]})]}),c.jsxs("article",{className:"tds-preview__tracker-metric",children:[c.jsx("span",{className:"tds-preview__tracker-metric-label",children:"Preview adoption"}),c.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[v.adoption.preview.percent,"%"]}),c.jsx(yn,{value:v.adoption.preview.percent,label:`Preview adoption: ${v.adoption.preview.percent}%`,tone:"positive"}),c.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:[v.adoption.preview.used," of ",v.adoption.preview.total," built"]})]}),c.jsxs("article",{className:"tds-preview__tracker-metric",children:[c.jsx("span",{className:"tds-preview__tracker-metric-label",children:"BV adoption"}),c.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[v.adoption.bv.percent,"%"]}),c.jsx(yn,{value:v.adoption.bv.percent,label:`BV adoption: ${v.adoption.bv.percent}%`,tone:"intermediate"}),c.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:[v.adoption.bv.used," of ",v.adoption.bv.total," built"]})]}),c.jsxs("article",{className:"tds-preview__tracker-metric",children:[c.jsx("span",{className:"tds-preview__tracker-metric-label",children:"DV adoption"}),c.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[v.adoption.dv.percent,"%"]}),c.jsx(yn,{value:v.adoption.dv.percent,label:`DV adoption: ${v.adoption.dv.percent}%`,tone:"brand"}),c.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:[v.adoption.dv.used," of ",v.adoption.dv.total," built"]})]})]})}function A1(v,S){return v.filter(D=>D.cssStatus===S).length}function z1(v){const S=["High","Medium","Low"],D=new Map;for(const M of v)D.set(M.priority,(D.get(M.priority)??0)+1);const _={High:"negative",Medium:"intermediate",Low:"neutral"};return S.filter(M=>D.has(M)).map(M=>({label:M,value:D.get(M)??0,max:v.length,meta:`${D.get(M)??0} items`,tone:_[M]}))}function N1({summary:v,components:S,planned:D}){const _=js.useMemo(()=>A1(S,"N/A"),[S]),M=js.useMemo(()=>[{label:"Done",value:v.cssDone,tone:"positive"},{label:"Partial",value:v.cssPartial,tone:"intermediate"},{label:"Not started",value:v.cssNotStarted,tone:"negative"},{label:"N/A",value:_,tone:"neutral"}],[v.cssDone,v.cssPartial,v.cssNotStarted,_]),N=js.useMemo(()=>[{label:"Preview",value:v.adoption.preview.percent,max:100,meta:`${v.adoption.preview.used}/${v.adoption.preview.total} used`,tone:"positive"},{label:"Bank verification",value:v.adoption.bv.percent,max:100,meta:`${v.adoption.bv.used}/${v.adoption.bv.total} used`,tone:"intermediate"},{label:"Document verification",value:v.adoption.dv.percent,max:100,meta:`${v.adoption.dv.used}/${v.adoption.dv.total} used`,tone:"brand"}],[v.adoption]),V=js.useMemo(()=>z1(D),[D]);return c.jsx("div",{className:"tds-preview__tracker-charts","aria-label":"Progress charts",children:c.jsxs("div",{className:"tds-preview__tracker-charts-layout",children:[c.jsxs("article",{className:"tds-preview__tracker-chart",children:[c.jsx("h3",{className:"tds-preview__tracker-chart-title",children:"Build status"}),c.jsxs("p",{className:"tds-preview__tracker-chart-lead",children:[v.cssDone," of ",v.totalComponents," components have finished CSS"]}),c.jsx(B1,{segments:M,total:v.totalComponents,label:`CSS build status: ${v.cssDone} done, ${v.cssPartial} partial, ${v.cssNotStarted} not started, ${_} not applicable`})]}),c.jsxs("div",{className:"tds-preview__tracker-charts-pair",children:[c.jsx(Bv,{title:"Adoption by page",description:"Share of built components used on each demo page",rows:N}),D.length>0&&c.jsx(Bv,{title:"Backlog by priority",description:`${D.length} components queued`,rows:V,showPercent:!0})]})]})})}function ho({title:v,desc:S,actions:D,children:_}){return c.jsxs("section",{className:"tds-preview__tracker-showcase",children:[c.jsxs("header",{className:"tds-preview__tracker-showcase__head",children:[c.jsxs("div",{className:"tds-preview__tracker-showcase__copy",children:[c.jsx("h2",{className:"tds-preview__tracker-showcase__title",children:v}),S&&c.jsx("p",{className:"tds-preview__tracker-showcase__desc",children:S})]}),D&&c.jsx("div",{className:"tds-preview__tracker-showcase__actions",children:D})]}),c.jsx("div",{className:"tds-preview__tracker-showcase__body",children:_})]})}function Tv({status:v}){const S=v.toLowerCase().replace(/\s+/g,"-");return c.jsx("span",{className:`tds-preview__tracker-pill tds-preview__tracker-pill--${S}`,children:v})}function _o({used:v}){return c.jsxs("span",{className:`tds-preview__tracker-use${v?" is-yes":""}`,"aria-label":v?"Used":"Not used",children:[c.jsx("span",{className:"tds-preview__tracker-use-dot","aria-hidden":"true"}),v?"Used":"—"]})}function O1({components:v}){const[S,D]=js.useState(""),[_,M]=js.useState("all"),N=js.useMemo(()=>{const j=S.trim().toLowerCase();return v.filter(T=>{var O;const C=!j||T.name.toLowerCase().includes(j)||T.category.toLowerCase().includes(j)||((O=T.cssFile)==null?void 0:O.toLowerCase().includes(j)),R=_==="all"||T.cssStatus===_||T.figmaStatus===_;return C&&R})},[v,S,_]),V=c.jsxs("div",{className:"tds-preview__tracker-filters",children:[c.jsx("input",{type:"search",className:"tds-preview__tracker-search",placeholder:"Search components...",value:S,onChange:j=>D(j.target.value),"aria-label":"Search components"}),c.jsxs("select",{className:"tds-preview__tracker-select",value:_,onChange:j=>M(j.target.value),"aria-label":"Filter by status",children:[c.jsx("option",{value:"all",children:"All statuses"}),c.jsx("option",{value:"Done",children:"CSS Done"}),c.jsx("option",{value:"Partial",children:"Partial"}),c.jsx("option",{value:"Not Started",children:"Not started"}),c.jsx("option",{value:"Missing",children:"Missing"}),c.jsx("option",{value:"N/A",children:"N/A"})]})]});return c.jsxs(ho,{title:"Built components",desc:`${v.length} components in the library with Figma, CSS, and page adoption status.`,actions:V,children:[c.jsx("div",{className:"tds-preview__tracker-canvas",children:c.jsx("div",{className:"tds-preview__tracker-table-wrap",children:c.jsxs("table",{className:"tds-preview__tracker-table",children:[c.jsx("thead",{children:c.jsxs("tr",{children:[c.jsx("th",{scope:"col",children:"Component"}),c.jsx("th",{scope:"col",children:"Category"}),c.jsx("th",{scope:"col",children:"Figma"}),c.jsx("th",{scope:"col",children:"CSS"}),c.jsx("th",{scope:"col",children:"Preview"}),c.jsx("th",{scope:"col",children:"BV"}),c.jsx("th",{scope:"col",children:"DV"})]})}),c.jsx("tbody",{children:N.map(j=>c.jsxs("tr",{children:[c.jsxs("th",{scope:"row",children:[c.jsx("span",{className:"tds-preview__tracker-name",children:j.name}),j.cssFile&&c.jsx("code",{className:"tds-preview__tracker-file",children:j.cssFile})]}),c.jsx("td",{children:j.category}),c.jsx("td",{children:c.jsx(Tv,{status:j.figmaStatus})}),c.jsx("td",{children:c.jsx(Tv,{status:j.cssStatus})}),c.jsx("td",{children:c.jsx(_o,{used:j.usedInPreview})}),c.jsx("td",{children:c.jsx(_o,{used:j.usedInBV})}),c.jsx("td",{children:c.jsx(_o,{used:j.usedInDV})})]},j.id))})]})})}),c.jsxs("p",{className:"tds-preview__tracker-table-meta",children:["Showing ",N.length," of ",v.length," components"]})]})}function H1(v){return v.toLowerCase().replace(/\s+/g,"-")}function V1({planned:v}){return c.jsx("div",{className:"tds-preview__tracker-planned-grid",children:v.map(S=>c.jsxs("article",{className:"tds-preview__tracker-planned-card",children:[c.jsxs("div",{className:"tds-preview__tracker-planned-card-head",children:[c.jsx("h3",{className:"tds-preview__tracker-planned-name",children:S.name}),c.jsx("span",{className:`tds-preview__tracker-priority tds-preview__tracker-priority--${H1(S.priority)}`,children:S.priority})]}),c.jsx("p",{className:"tds-preview__tracker-planned-category",children:S.category}),S.description&&c.jsx("p",{className:"tds-preview__tracker-planned-desc",children:S.description}),S.dependsOn&&c.jsxs("p",{className:"tds-preview__tracker-planned-meta",children:["Depends on: ",S.dependsOn]})]},S.name))})}function j1(v){return new Date(v).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"})}function R1(){const{summary:v,components:S,planned:D,lastBuiltAt:_,warnings:M}=L1;return c.jsxs("div",{className:"tds-preview__panel is-active",role:"tabpanel",id:"tracker",children:[c.jsx(zv,{eyebrow:"Build progress",title:"Component tracker",desc:`Live status from Components/ and adoption across Preview, BV, and DV demo pages. Last updated ${j1(_)}.`}),c.jsxs(ho,{title:"At a glance",desc:"CSS build completion, page adoption, and category coverage — regenerated on every preview build.",children:[c.jsx(E1,{summary:v}),c.jsx(N1,{summary:v,components:S,planned:D})]}),c.jsx(O1,{components:S}),D.length>0&&c.jsx(ho,{title:"Planned backlog",desc:"Upcoming components tracked in data/component-tracker.yaml.",children:c.jsx(V1,{planned:D})}),M.length>0&&c.jsxs("aside",{className:"tds-preview__tracker-warnings","aria-label":"Tracker warnings",children:[c.jsx("h3",{className:"tds-preview__tracker-showcase__title",children:"Build warnings"}),c.jsx("ul",{children:M.map(N=>c.jsx("li",{children:N},N))})]})]})}const U1=`(function initPreviewInteractionCore() {
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
window.initPreviewDropdownMenus?.();`,q1=`/**
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

    var defaultItem = panel.querySelector("[data-tds-filter-default]");
    var menuButtons = panel.querySelectorAll("button.tds-action-list-item");

    menuButtons.forEach(function (item) {
      var selected = defaultItem ? item === defaultItem : item === menuButtons[0];
      item.classList.toggle("tds-action-list-item--selected", selected);
      if (item.hasAttribute("aria-checked")) {
        item.setAttribute("aria-checked", selected ? "true" : "false");
      }
      if (item.hasAttribute("aria-selected")) {
        item.setAttribute("aria-selected", selected ? "true" : "false");
      }
    });

    panel.querySelectorAll("input[type='checkbox']").forEach(function (input) {
      input.checked = input.defaultChecked;
    });
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
`,Z1=`/**
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
`,Y1=`/**
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
`;function ql(v){const S=document.createElement("script");S.textContent=v,document.body.appendChild(S),S.remove()}function Ev(){var v,S,D;(v=window.initPreviewSelects)==null||v.call(window),(S=window.initPreviewDropdownMenus)==null||S.call(window),(D=window.initDatePickers)==null||D.call(window)}function G1(v){js.useEffect(()=>{window.__tdsPreviewScriptsLoaded||(window.__tdsPreviewScriptsLoaded=!0,ql(q1),ql(Z1),ql(Y1),ql(U1),requestAnimationFrame(()=>{Ev()}))},[]),js.useEffect(()=>{const S=requestAnimationFrame(()=>{Ev()});return()=>cancelAnimationFrame(S)},[v])}function fo(){const v=window.location.hash.replace("#","");return!v||v==="home"?null:_1.includes(v)?v:null}function X1(){var C;const[v,S]=js.useState(fo),[D,_]=js.useState(()=>fo()!==null),M=js.useRef(null),N=v===null,V=((C=Zl.find(R=>R.id===v))==null?void 0:C.label)??"Overview",j=js.useCallback((R,{updateHash:O=!0,scrollTop:$=!0}={})=>{var As;S(R),O&&window.location.hash!==`#${R}`&&history.replaceState(null,"",`#${R}`),$&&((As=M.current)==null||As.scrollTo({top:0,behavior:"instant"}),window.scrollTo(0,0))},[]),T=js.useCallback(({updateHash:R=!0,scrollTop:O=!0}={})=>{var $;S(null),R&&window.location.hash!==""&&window.location.hash!=="#home"&&history.replaceState(null,"",window.location.pathname+window.location.search),O&&(($=M.current)==null||$.scrollTo({top:0,behavior:"instant"}),window.scrollTo(0,0))},[]);return js.useEffect(()=>{const R=()=>{var $;const O=fo();S(O),($=M.current)==null||$.scrollTo({top:0,behavior:"instant"})};return window.addEventListener("hashchange",R),()=>window.removeEventListener("hashchange",R)},[]),G1(v),c.jsxs("div",{className:`tds-preview${N?" tds-preview--home":" tds-preview--docs"}${D?"":" tds-preview--sidebar-closed"}`,children:[c.jsx(g1,{}),c.jsx(b1,{activeTab:v,isHome:N,isOpen:D,onSelect:j,onHome:T,onToggle:()=>_(R=>!R)}),c.jsx("div",{className:"tds-preview__shell",children:c.jsxs("div",{className:"tds-preview__workspace",children:[c.jsx(m1,{activeLabel:V,activeTab:v,isHome:N,sidebarOpen:D,onSelect:j,onHome:T,onToggleSidebar:()=>_(R=>!R)}),c.jsxs("main",{className:"tds-preview__main",ref:M,children:[c.jsxs("div",{className:"tds-preview__content",children:[N&&c.jsx(w1,{features:f1,onExplore:()=>j("buttons")}),c.jsxs("div",{className:"tds-preview__panels","aria-hidden":N,children:[p1.map(R=>c.jsx(k1,{section:R,active:!N&&R.id===v},R.id)),!N&&v==="tracker"&&c.jsx(R1,{})]})]}),c.jsxs("footer",{className:"tds-preview__footer",children:[c.jsx("span",{children:"Trulioo Design System · ADS 2026"}),!N&&c.jsx("a",{href:"../index.html",className:"tds-preview__footer-link",children:"Classic preview"})]})]})]})})]})}v1.createRoot(document.getElementById("root")).render(c.jsx(X1,{}));
