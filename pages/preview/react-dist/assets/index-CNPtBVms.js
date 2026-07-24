(function(){const S=document.createElement("link").relList;if(S&&S.supports&&S.supports("modulepreload"))return;for(const M of document.querySelectorAll('link[rel="modulepreload"]'))_(M);new MutationObserver(M=>{for(const N of M)if(N.type==="childList")for(const V of N.addedNodes)V.tagName==="LINK"&&V.rel==="modulepreload"&&_(V)}).observe(document,{childList:!0,subtree:!0});function D(M){const N={};return M.integrity&&(N.integrity=M.integrity),M.referrerPolicy&&(N.referrerPolicy=M.referrerPolicy),M.crossOrigin==="use-credentials"?N.credentials="include":M.crossOrigin==="anonymous"?N.credentials="omit":N.credentials="same-origin",N}function _(M){if(M.ep)return;M.ep=!0;const N=D(M);fetch(M.href,N)}})();var io={exports:{}},mn={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wv;function e1(){if(wv)return mn;wv=1;var v=Symbol.for("react.transitional.element"),S=Symbol.for("react.fragment");function D(_,M,N){var V=null;if(N!==void 0&&(V=""+N),M.key!==void 0&&(V=""+M.key),"key"in M){N={};for(var j in M)j!=="key"&&(N[j]=M[j])}else N=M;return M=N.ref,{$$typeof:v,type:_,key:V,ref:M!==void 0?M:null,props:N}}return mn.Fragment=S,mn.jsx=D,mn.jsxs=D,mn}var mv;function t1(){return mv||(mv=1,io.exports=e1()),io.exports}var c=t1(),oo={exports:{}},kn={},co={exports:{}},ro={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kv;function n1(){return kv||(kv=1,(function(v){function S(m,L){var q=m.length;m.push(L);s:for(;0<q;){var ds=q-1>>>1,rs=m[ds];if(0<M(rs,L))m[ds]=L,m[q]=rs,q=ds;else break s}}function D(m){return m.length===0?null:m[0]}function _(m){if(m.length===0)return null;var L=m[0],q=m.pop();if(q!==L){m[0]=q;s:for(var ds=0,rs=m.length,u=rs>>>1;ds<u;){var x=2*(ds+1)-1,B=m[x],A=x+1,Y=m[A];if(0>M(B,q))A<rs&&0>M(Y,B)?(m[ds]=Y,m[A]=q,ds=A):(m[ds]=B,m[x]=q,ds=x);else if(A<rs&&0>M(Y,q))m[ds]=Y,m[A]=q,ds=A;else break s}}return L}function M(m,L){var q=m.sortIndex-L.sortIndex;return q!==0?q:m.id-L.id}if(v.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var N=performance;v.unstable_now=function(){return N.now()}}else{var V=Date,j=V.now();v.unstable_now=function(){return V.now()-j}}var E=[],C=[],U=1,O=null,P=3,As=!1,Us=!1,Os=!1,Ba=!1,Is=typeof setTimeout=="function"?setTimeout:null,Fa=typeof clearTimeout=="function"?clearTimeout:null,zs=typeof setImmediate<"u"?setImmediate:null;function ia(m){for(var L=D(C);L!==null;){if(L.callback===null)_(C);else if(L.startTime<=m)_(C),L.sortIndex=L.expirationTime,S(E,L);else break;L=D(C)}}function ya(m){if(Os=!1,ia(m),!Us)if(D(E)!==null)Us=!0,Rs||(Rs=!0,Zs());else{var L=D(C);L!==null&&ga(ya,L.startTime-m)}}var Rs=!1,W=-1,qs=5,xa=-1;function qe(){return Ba?!0:!(v.unstable_now()-xa<qs)}function Ca(){if(Ba=!1,Rs){var m=v.unstable_now();xa=m;var L=!0;try{s:{Us=!1,Os&&(Os=!1,Fa(W),W=-1),As=!0;var q=P;try{a:{for(ia(m),O=D(E);O!==null&&!(O.expirationTime>m&&qe());){var ds=O.callback;if(typeof ds=="function"){O.callback=null,P=O.priorityLevel;var rs=ds(O.expirationTime<=m);if(m=v.unstable_now(),typeof rs=="function"){O.callback=rs,ia(m),L=!0;break a}O===D(E)&&_(E),ia(m)}else _(E);O=D(E)}if(O!==null)L=!0;else{var u=D(C);u!==null&&ga(ya,u.startTime-m),L=!1}}break s}finally{O=null,P=q,As=!1}L=void 0}}finally{L?Zs():Rs=!1}}}var Zs;if(typeof zs=="function")Zs=function(){zs(Ca)};else if(typeof MessageChannel<"u"){var ke=new MessageChannel,Ea=ke.port2;ke.port1.onmessage=Ca,Zs=function(){Ea.postMessage(null)}}else Zs=function(){Is(Ca,0)};function ga(m,L){W=Is(function(){m(v.unstable_now())},L)}v.unstable_IdlePriority=5,v.unstable_ImmediatePriority=1,v.unstable_LowPriority=4,v.unstable_NormalPriority=3,v.unstable_Profiling=null,v.unstable_UserBlockingPriority=2,v.unstable_cancelCallback=function(m){m.callback=null},v.unstable_forceFrameRate=function(m){0>m||125<m?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):qs=0<m?Math.floor(1e3/m):5},v.unstable_getCurrentPriorityLevel=function(){return P},v.unstable_next=function(m){switch(P){case 1:case 2:case 3:var L=3;break;default:L=P}var q=P;P=L;try{return m()}finally{P=q}},v.unstable_requestPaint=function(){Ba=!0},v.unstable_runWithPriority=function(m,L){switch(m){case 1:case 2:case 3:case 4:case 5:break;default:m=3}var q=P;P=m;try{return L()}finally{P=q}},v.unstable_scheduleCallback=function(m,L,q){var ds=v.unstable_now();switch(typeof q=="object"&&q!==null?(q=q.delay,q=typeof q=="number"&&0<q?ds+q:ds):q=ds,m){case 1:var rs=-1;break;case 2:rs=250;break;case 5:rs=1073741823;break;case 4:rs=1e4;break;default:rs=5e3}return rs=q+rs,m={id:U++,callback:L,priorityLevel:m,startTime:q,expirationTime:rs,sortIndex:-1},q>ds?(m.sortIndex=q,S(C,m),D(E)===null&&m===D(C)&&(Os?(Fa(W),W=-1):Os=!0,ga(ya,q-ds))):(m.sortIndex=rs,S(E,m),Us||As||(Us=!0,Rs||(Rs=!0,Zs()))),m},v.unstable_shouldYield=qe,v.unstable_wrapCallback=function(m){var L=P;return function(){var q=P;P=L;try{return m.apply(this,arguments)}finally{P=q}}}})(ro)),ro}var yv;function l1(){return yv||(yv=1,co.exports=n1()),co.exports}var uo={exports:{}},Z={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xv;function d1(){if(xv)return Z;xv=1;var v=Symbol.for("react.transitional.element"),S=Symbol.for("react.portal"),D=Symbol.for("react.fragment"),_=Symbol.for("react.strict_mode"),M=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),V=Symbol.for("react.context"),j=Symbol.for("react.forward_ref"),E=Symbol.for("react.suspense"),C=Symbol.for("react.memo"),U=Symbol.for("react.lazy"),O=Symbol.for("react.activity"),P=Symbol.iterator;function As(u){return u===null||typeof u!="object"?null:(u=P&&u[P]||u["@@iterator"],typeof u=="function"?u:null)}var Us={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Os=Object.assign,Ba={};function Is(u,x,B){this.props=u,this.context=x,this.refs=Ba,this.updater=B||Us}Is.prototype.isReactComponent={},Is.prototype.setState=function(u,x){if(typeof u!="object"&&typeof u!="function"&&u!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,u,x,"setState")},Is.prototype.forceUpdate=function(u){this.updater.enqueueForceUpdate(this,u,"forceUpdate")};function Fa(){}Fa.prototype=Is.prototype;function zs(u,x,B){this.props=u,this.context=x,this.refs=Ba,this.updater=B||Us}var ia=zs.prototype=new Fa;ia.constructor=zs,Os(ia,Is.prototype),ia.isPureReactComponent=!0;var ya=Array.isArray;function Rs(){}var W={H:null,A:null,T:null,S:null},qs=Object.prototype.hasOwnProperty;function xa(u,x,B){var A=B.ref;return{$$typeof:v,type:u,key:x,ref:A!==void 0?A:null,props:B}}function qe(u,x){return xa(u.type,x,u.props)}function Ca(u){return typeof u=="object"&&u!==null&&u.$$typeof===v}function Zs(u){var x={"=":"=0",":":"=2"};return"$"+u.replace(/[=:]/g,function(B){return x[B]})}var ke=/\/+/g;function Ea(u,x){return typeof u=="object"&&u!==null&&u.key!=null?Zs(""+u.key):x.toString(36)}function ga(u){switch(u.status){case"fulfilled":return u.value;case"rejected":throw u.reason;default:switch(typeof u.status=="string"?u.then(Rs,Rs):(u.status="pending",u.then(function(x){u.status==="pending"&&(u.status="fulfilled",u.value=x)},function(x){u.status==="pending"&&(u.status="rejected",u.reason=x)})),u.status){case"fulfilled":return u.value;case"rejected":throw u.reason}}throw u}function m(u,x,B,A,Y){var Q=typeof u;(Q==="undefined"||Q==="boolean")&&(u=null);var ts=!1;if(u===null)ts=!0;else switch(Q){case"bigint":case"string":case"number":ts=!0;break;case"object":switch(u.$$typeof){case v:case S:ts=!0;break;case U:return ts=u._init,m(ts(u._payload),x,B,A,Y)}}if(ts)return Y=Y(u),ts=A===""?"."+Ea(u,0):A,ya(Y)?(B="",ts!=null&&(B=ts.replace(ke,"$&/")+"/"),m(Y,x,B,"",function(Mt){return Mt})):Y!=null&&(Ca(Y)&&(Y=qe(Y,B+(Y.key==null||u&&u.key===Y.key?"":(""+Y.key).replace(ke,"$&/")+"/")+ts)),x.push(Y)),1;ts=0;var Hs=A===""?".":A+":";if(ya(u))for(var bs=0;bs<u.length;bs++)A=u[bs],Q=Hs+Ea(A,bs),ts+=m(A,x,B,Q,Y);else if(bs=As(u),typeof bs=="function")for(u=bs.call(u),bs=0;!(A=u.next()).done;)A=A.value,Q=Hs+Ea(A,bs++),ts+=m(A,x,B,Q,Y);else if(Q==="object"){if(typeof u.then=="function")return m(ga(u),x,B,A,Y);throw x=String(u),Error("Objects are not valid as a React child (found: "+(x==="[object Object]"?"object with keys {"+Object.keys(u).join(", ")+"}":x)+"). If you meant to render a collection of children, use an array instead.")}return ts}function L(u,x,B){if(u==null)return u;var A=[],Y=0;return m(u,A,"","",function(Q){return x.call(B,Q,Y++)}),A}function q(u){if(u._status===-1){var x=u._result;x=x(),x.then(function(B){(u._status===0||u._status===-1)&&(u._status=1,u._result=B)},function(B){(u._status===0||u._status===-1)&&(u._status=2,u._result=B)}),u._status===-1&&(u._status=0,u._result=x)}if(u._status===1)return u._result.default;throw u._result}var ds=typeof reportError=="function"?reportError:function(u){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var x=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof u=="object"&&u!==null&&typeof u.message=="string"?String(u.message):String(u),error:u});if(!window.dispatchEvent(x))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",u);return}console.error(u)},rs={map:L,forEach:function(u,x,B){L(u,function(){x.apply(this,arguments)},B)},count:function(u){var x=0;return L(u,function(){x++}),x},toArray:function(u){return L(u,function(x){return x})||[]},only:function(u){if(!Ca(u))throw Error("React.Children.only expected to receive a single React element child.");return u}};return Z.Activity=O,Z.Children=rs,Z.Component=Is,Z.Fragment=D,Z.Profiler=M,Z.PureComponent=zs,Z.StrictMode=_,Z.Suspense=E,Z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=W,Z.__COMPILER_RUNTIME={__proto__:null,c:function(u){return W.H.useMemoCache(u)}},Z.cache=function(u){return function(){return u.apply(null,arguments)}},Z.cacheSignal=function(){return null},Z.cloneElement=function(u,x,B){if(u==null)throw Error("The argument must be a React element, but you passed "+u+".");var A=Os({},u.props),Y=u.key;if(x!=null)for(Q in x.key!==void 0&&(Y=""+x.key),x)!qs.call(x,Q)||Q==="key"||Q==="__self"||Q==="__source"||Q==="ref"&&x.ref===void 0||(A[Q]=x[Q]);var Q=arguments.length-2;if(Q===1)A.children=B;else if(1<Q){for(var ts=Array(Q),Hs=0;Hs<Q;Hs++)ts[Hs]=arguments[Hs+2];A.children=ts}return xa(u.type,Y,A)},Z.createContext=function(u){return u={$$typeof:V,_currentValue:u,_currentValue2:u,_threadCount:0,Provider:null,Consumer:null},u.Provider=u,u.Consumer={$$typeof:N,_context:u},u},Z.createElement=function(u,x,B){var A,Y={},Q=null;if(x!=null)for(A in x.key!==void 0&&(Q=""+x.key),x)qs.call(x,A)&&A!=="key"&&A!=="__self"&&A!=="__source"&&(Y[A]=x[A]);var ts=arguments.length-2;if(ts===1)Y.children=B;else if(1<ts){for(var Hs=Array(ts),bs=0;bs<ts;bs++)Hs[bs]=arguments[bs+2];Y.children=Hs}if(u&&u.defaultProps)for(A in ts=u.defaultProps,ts)Y[A]===void 0&&(Y[A]=ts[A]);return xa(u,Q,Y)},Z.createRef=function(){return{current:null}},Z.forwardRef=function(u){return{$$typeof:j,render:u}},Z.isValidElement=Ca,Z.lazy=function(u){return{$$typeof:U,_payload:{_status:-1,_result:u},_init:q}},Z.memo=function(u,x){return{$$typeof:C,type:u,compare:x===void 0?null:x}},Z.startTransition=function(u){var x=W.T,B={};W.T=B;try{var A=u(),Y=W.S;Y!==null&&Y(B,A),typeof A=="object"&&A!==null&&typeof A.then=="function"&&A.then(Rs,ds)}catch(Q){ds(Q)}finally{x!==null&&B.types!==null&&(x.types=B.types),W.T=x}},Z.unstable_useCacheRefresh=function(){return W.H.useCacheRefresh()},Z.use=function(u){return W.H.use(u)},Z.useActionState=function(u,x,B){return W.H.useActionState(u,x,B)},Z.useCallback=function(u,x){return W.H.useCallback(u,x)},Z.useContext=function(u){return W.H.useContext(u)},Z.useDebugValue=function(){},Z.useDeferredValue=function(u,x){return W.H.useDeferredValue(u,x)},Z.useEffect=function(u,x){return W.H.useEffect(u,x)},Z.useEffectEvent=function(u){return W.H.useEffectEvent(u)},Z.useId=function(){return W.H.useId()},Z.useImperativeHandle=function(u,x,B){return W.H.useImperativeHandle(u,x,B)},Z.useInsertionEffect=function(u,x){return W.H.useInsertionEffect(u,x)},Z.useLayoutEffect=function(u,x){return W.H.useLayoutEffect(u,x)},Z.useMemo=function(u,x){return W.H.useMemo(u,x)},Z.useOptimistic=function(u,x){return W.H.useOptimistic(u,x)},Z.useReducer=function(u,x,B){return W.H.useReducer(u,x,B)},Z.useRef=function(u){return W.H.useRef(u)},Z.useState=function(u){return W.H.useState(u)},Z.useSyncExternalStore=function(u,x,B){return W.H.useSyncExternalStore(u,x,B)},Z.useTransition=function(){return W.H.useTransition()},Z.version="19.2.7",Z}var Cv;function bo(){return Cv||(Cv=1,uo.exports=d1()),uo.exports}var vo={exports:{}},Ns={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sv;function i1(){if(Sv)return Ns;Sv=1;var v=bo();function S(E){var C="https://react.dev/errors/"+E;if(1<arguments.length){C+="?args[]="+encodeURIComponent(arguments[1]);for(var U=2;U<arguments.length;U++)C+="&args[]="+encodeURIComponent(arguments[U])}return"Minified React error #"+E+"; visit "+C+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function D(){}var _={d:{f:D,r:function(){throw Error(S(522))},D,C:D,L:D,m:D,X:D,S:D,M:D},p:0,findDOMNode:null},M=Symbol.for("react.portal");function N(E,C,U){var O=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:M,key:O==null?null:""+O,children:E,containerInfo:C,implementation:U}}var V=v.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function j(E,C){if(E==="font")return"";if(typeof C=="string")return C==="use-credentials"?C:""}return Ns.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=_,Ns.createPortal=function(E,C){var U=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!C||C.nodeType!==1&&C.nodeType!==9&&C.nodeType!==11)throw Error(S(299));return N(E,C,null,U)},Ns.flushSync=function(E){var C=V.T,U=_.p;try{if(V.T=null,_.p=2,E)return E()}finally{V.T=C,_.p=U,_.d.f()}},Ns.preconnect=function(E,C){typeof E=="string"&&(C?(C=C.crossOrigin,C=typeof C=="string"?C==="use-credentials"?C:"":void 0):C=null,_.d.C(E,C))},Ns.prefetchDNS=function(E){typeof E=="string"&&_.d.D(E)},Ns.preinit=function(E,C){if(typeof E=="string"&&C&&typeof C.as=="string"){var U=C.as,O=j(U,C.crossOrigin),P=typeof C.integrity=="string"?C.integrity:void 0,As=typeof C.fetchPriority=="string"?C.fetchPriority:void 0;U==="style"?_.d.S(E,typeof C.precedence=="string"?C.precedence:void 0,{crossOrigin:O,integrity:P,fetchPriority:As}):U==="script"&&_.d.X(E,{crossOrigin:O,integrity:P,fetchPriority:As,nonce:typeof C.nonce=="string"?C.nonce:void 0})}},Ns.preinitModule=function(E,C){if(typeof E=="string")if(typeof C=="object"&&C!==null){if(C.as==null||C.as==="script"){var U=j(C.as,C.crossOrigin);_.d.M(E,{crossOrigin:U,integrity:typeof C.integrity=="string"?C.integrity:void 0,nonce:typeof C.nonce=="string"?C.nonce:void 0})}}else C==null&&_.d.M(E)},Ns.preload=function(E,C){if(typeof E=="string"&&typeof C=="object"&&C!==null&&typeof C.as=="string"){var U=C.as,O=j(U,C.crossOrigin);_.d.L(E,U,{crossOrigin:O,integrity:typeof C.integrity=="string"?C.integrity:void 0,nonce:typeof C.nonce=="string"?C.nonce:void 0,type:typeof C.type=="string"?C.type:void 0,fetchPriority:typeof C.fetchPriority=="string"?C.fetchPriority:void 0,referrerPolicy:typeof C.referrerPolicy=="string"?C.referrerPolicy:void 0,imageSrcSet:typeof C.imageSrcSet=="string"?C.imageSrcSet:void 0,imageSizes:typeof C.imageSizes=="string"?C.imageSizes:void 0,media:typeof C.media=="string"?C.media:void 0})}},Ns.preloadModule=function(E,C){if(typeof E=="string")if(C){var U=j(C.as,C.crossOrigin);_.d.m(E,{as:typeof C.as=="string"&&C.as!=="script"?C.as:void 0,crossOrigin:U,integrity:typeof C.integrity=="string"?C.integrity:void 0})}else _.d.m(E)},Ns.requestFormReset=function(E){_.d.r(E)},Ns.unstable_batchedUpdates=function(E,C){return E(C)},Ns.useFormState=function(E,C,U){return V.H.useFormState(E,C,U)},Ns.useFormStatus=function(){return V.H.useHostTransitionStatus()},Ns.version="19.2.7",Ns}var Mv;function o1(){if(Mv)return vo.exports;Mv=1;function v(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(v)}catch(S){console.error(S)}}return v(),vo.exports=i1(),vo.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dv;function c1(){if(Dv)return kn;Dv=1;var v=l1(),S=bo(),D=o1();function _(s){var a="https://react.dev/errors/"+s;if(1<arguments.length){a+="?args[]="+encodeURIComponent(arguments[1]);for(var e=2;e<arguments.length;e++)a+="&args[]="+encodeURIComponent(arguments[e])}return"Minified React error #"+s+"; visit "+a+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function M(s){return!(!s||s.nodeType!==1&&s.nodeType!==9&&s.nodeType!==11)}function N(s){var a=s,e=s;if(s.alternate)for(;a.return;)a=a.return;else{s=a;do a=s,(a.flags&4098)!==0&&(e=a.return),s=a.return;while(s)}return a.tag===3?e:null}function V(s){if(s.tag===13){var a=s.memoizedState;if(a===null&&(s=s.alternate,s!==null&&(a=s.memoizedState)),a!==null)return a.dehydrated}return null}function j(s){if(s.tag===31){var a=s.memoizedState;if(a===null&&(s=s.alternate,s!==null&&(a=s.memoizedState)),a!==null)return a.dehydrated}return null}function E(s){if(N(s)!==s)throw Error(_(188))}function C(s){var a=s.alternate;if(!a){if(a=N(s),a===null)throw Error(_(188));return a!==s?null:s}for(var e=s,t=a;;){var n=e.return;if(n===null)break;var l=n.alternate;if(l===null){if(t=n.return,t!==null){e=t;continue}break}if(n.child===l.child){for(l=n.child;l;){if(l===e)return E(n),s;if(l===t)return E(n),a;l=l.sibling}throw Error(_(188))}if(e.return!==t.return)e=n,t=l;else{for(var d=!1,i=n.child;i;){if(i===e){d=!0,e=n,t=l;break}if(i===t){d=!0,t=n,e=l;break}i=i.sibling}if(!d){for(i=l.child;i;){if(i===e){d=!0,e=l,t=n;break}if(i===t){d=!0,t=l,e=n;break}i=i.sibling}if(!d)throw Error(_(189))}}if(e.alternate!==t)throw Error(_(190))}if(e.tag!==3)throw Error(_(188));return e.stateNode.current===e?s:a}function U(s){var a=s.tag;if(a===5||a===26||a===27||a===6)return s;for(s=s.child;s!==null;){if(a=U(s),a!==null)return a;s=s.sibling}return null}var O=Object.assign,P=Symbol.for("react.element"),As=Symbol.for("react.transitional.element"),Us=Symbol.for("react.portal"),Os=Symbol.for("react.fragment"),Ba=Symbol.for("react.strict_mode"),Is=Symbol.for("react.profiler"),Fa=Symbol.for("react.consumer"),zs=Symbol.for("react.context"),ia=Symbol.for("react.forward_ref"),ya=Symbol.for("react.suspense"),Rs=Symbol.for("react.suspense_list"),W=Symbol.for("react.memo"),qs=Symbol.for("react.lazy"),xa=Symbol.for("react.activity"),qe=Symbol.for("react.memo_cache_sentinel"),Ca=Symbol.iterator;function Zs(s){return s===null||typeof s!="object"?null:(s=Ca&&s[Ca]||s["@@iterator"],typeof s=="function"?s:null)}var ke=Symbol.for("react.client.reference");function Ea(s){if(s==null)return null;if(typeof s=="function")return s.$$typeof===ke?null:s.displayName||s.name||null;if(typeof s=="string")return s;switch(s){case Os:return"Fragment";case Is:return"Profiler";case Ba:return"StrictMode";case ya:return"Suspense";case Rs:return"SuspenseList";case xa:return"Activity"}if(typeof s=="object")switch(s.$$typeof){case Us:return"Portal";case zs:return s.displayName||"Context";case Fa:return(s._context.displayName||"Context")+".Consumer";case ia:var a=s.render;return s=s.displayName,s||(s=a.displayName||a.name||"",s=s!==""?"ForwardRef("+s+")":"ForwardRef"),s;case W:return a=s.displayName||null,a!==null?a:Ea(s.type)||"Memo";case qs:a=s._payload,s=s._init;try{return Ea(s(a))}catch{}}return null}var ga=Array.isArray,m=S.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,L=D.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,q={pending:!1,data:null,method:null,action:null},ds=[],rs=-1;function u(s){return{current:s}}function x(s){0>rs||(s.current=ds[rs],ds[rs]=null,rs--)}function B(s,a){rs++,ds[rs]=s.current,s.current=a}var A=u(null),Y=u(null),Q=u(null),ts=u(null);function Hs(s,a){switch(B(Q,a),B(Y,s),B(A,null),a.nodeType){case 9:case 11:s=(s=a.documentElement)&&(s=s.namespaceURI)?Zu(s):0;break;default:if(s=a.tagName,a=a.namespaceURI)a=Zu(a),s=Yu(a,s);else switch(s){case"svg":s=1;break;case"math":s=2;break;default:s=0}}x(A),B(A,s)}function bs(){x(A),x(Y),x(Q)}function Mt(s){s.memoizedState!==null&&B(ts,s);var a=A.current,e=Yu(a,s.type);a!==e&&(B(Y,s),B(A,e))}function xn(s){Y.current===s&&(x(A),x(Y)),ts.current===s&&(x(ts),hn._currentValue=q)}var Zl,go;function ye(s){if(Zl===void 0)try{throw Error()}catch(e){var a=e.stack.trim().match(/\n( *(at )?)/);Zl=a&&a[1]||"",go=-1<e.stack.indexOf(`
    at`)?" (<anonymous>)":-1<e.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Zl+s+go}var Yl=!1;function Gl(s,a){if(!s||Yl)return"";Yl=!0;var e=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var t={DetermineComponentFrameRoot:function(){try{if(a){var y=function(){throw Error()};if(Object.defineProperty(y.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(y,[])}catch(g){var b=g}Reflect.construct(s,[],y)}else{try{y.call()}catch(g){b=g}s.call(y.prototype)}}else{try{throw Error()}catch(g){b=g}(y=s())&&typeof y.catch=="function"&&y.catch(function(){})}}catch(g){if(g&&b&&typeof g.stack=="string")return[g.stack,b.stack]}return[null,null]}};t.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var n=Object.getOwnPropertyDescriptor(t.DetermineComponentFrameRoot,"name");n&&n.configurable&&Object.defineProperty(t.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var l=t.DetermineComponentFrameRoot(),d=l[0],i=l[1];if(d&&i){var o=d.split(`
`),h=i.split(`
`);for(n=t=0;t<o.length&&!o[t].includes("DetermineComponentFrameRoot");)t++;for(;n<h.length&&!h[n].includes("DetermineComponentFrameRoot");)n++;if(t===o.length||n===h.length)for(t=o.length-1,n=h.length-1;1<=t&&0<=n&&o[t]!==h[n];)n--;for(;1<=t&&0<=n;t--,n--)if(o[t]!==h[n]){if(t!==1||n!==1)do if(t--,n--,0>n||o[t]!==h[n]){var w=`
`+o[t].replace(" at new "," at ");return s.displayName&&w.includes("<anonymous>")&&(w=w.replace("<anonymous>",s.displayName)),w}while(1<=t&&0<=n);break}}}finally{Yl=!1,Error.prepareStackTrace=e}return(e=s?s.displayName||s.name:"")?ye(e):""}function zv(s,a){switch(s.tag){case 26:case 27:case 5:return ye(s.type);case 16:return ye("Lazy");case 13:return s.child!==a&&a!==null?ye("Suspense Fallback"):ye("Suspense");case 19:return ye("SuspenseList");case 0:case 15:return Gl(s.type,!1);case 11:return Gl(s.type.render,!1);case 1:return Gl(s.type,!0);case 31:return ye("Activity");default:return""}}function wo(s){try{var a="",e=null;do a+=zv(s,e),e=s,s=s.return;while(s);return a}catch(t){return`
Error generating stack: `+t.message+`
`+t.stack}}var Xl=Object.prototype.hasOwnProperty,Ql=v.unstable_scheduleCallback,Kl=v.unstable_cancelCallback,Nv=v.unstable_shouldYield,Ov=v.unstable_requestPaint,Ws=v.unstable_now,Hv=v.unstable_getCurrentPriorityLevel,mo=v.unstable_ImmediatePriority,ko=v.unstable_UserBlockingPriority,Cn=v.unstable_NormalPriority,Vv=v.unstable_LowPriority,yo=v.unstable_IdlePriority,jv=v.log,Uv=v.unstable_setDisableYieldValue,Dt=null,$s=null;function Ia(s){if(typeof jv=="function"&&Uv(s),$s&&typeof $s.setStrictMode=="function")try{$s.setStrictMode(Dt,s)}catch{}}var Ps=Math.clz32?Math.clz32:Zv,Rv=Math.log,qv=Math.LN2;function Zv(s){return s>>>=0,s===0?32:31-(Rv(s)/qv|0)|0}var Sn=256,Mn=262144,Dn=4194304;function xe(s){var a=s&42;if(a!==0)return a;switch(s&-s){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return s&261888;case 262144:case 524288:case 1048576:case 2097152:return s&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return s&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return s}}function Ln(s,a,e){var t=s.pendingLanes;if(t===0)return 0;var n=0,l=s.suspendedLanes,d=s.pingedLanes;s=s.warmLanes;var i=t&134217727;return i!==0?(t=i&~l,t!==0?n=xe(t):(d&=i,d!==0?n=xe(d):e||(e=i&~s,e!==0&&(n=xe(e))))):(i=t&~l,i!==0?n=xe(i):d!==0?n=xe(d):e||(e=t&~s,e!==0&&(n=xe(e)))),n===0?0:a!==0&&a!==n&&(a&l)===0&&(l=n&-n,e=a&-a,l>=e||l===32&&(e&4194048)!==0)?a:n}function Lt(s,a){return(s.pendingLanes&~(s.suspendedLanes&~s.pingedLanes)&a)===0}function Yv(s,a){switch(s){case 1:case 2:case 4:case 8:case 64:return a+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function xo(){var s=Dn;return Dn<<=1,(Dn&62914560)===0&&(Dn=4194304),s}function Jl(s){for(var a=[],e=0;31>e;e++)a.push(s);return a}function Bt(s,a){s.pendingLanes|=a,a!==268435456&&(s.suspendedLanes=0,s.pingedLanes=0,s.warmLanes=0)}function Gv(s,a,e,t,n,l){var d=s.pendingLanes;s.pendingLanes=e,s.suspendedLanes=0,s.pingedLanes=0,s.warmLanes=0,s.expiredLanes&=e,s.entangledLanes&=e,s.errorRecoveryDisabledLanes&=e,s.shellSuspendCounter=0;var i=s.entanglements,o=s.expirationTimes,h=s.hiddenUpdates;for(e=d&~e;0<e;){var w=31-Ps(e),y=1<<w;i[w]=0,o[w]=-1;var b=h[w];if(b!==null)for(h[w]=null,w=0;w<b.length;w++){var g=b[w];g!==null&&(g.lane&=-536870913)}e&=~y}t!==0&&Co(s,t,0),l!==0&&n===0&&s.tag!==0&&(s.suspendedLanes|=l&~(d&~a))}function Co(s,a,e){s.pendingLanes|=a,s.suspendedLanes&=~a;var t=31-Ps(a);s.entangledLanes|=a,s.entanglements[t]=s.entanglements[t]|1073741824|e&261930}function So(s,a){var e=s.entangledLanes|=a;for(s=s.entanglements;e;){var t=31-Ps(e),n=1<<t;n&a|s[t]&a&&(s[t]|=a),e&=~n}}function Mo(s,a){var e=a&-a;return e=(e&42)!==0?1:Fl(e),(e&(s.suspendedLanes|a))!==0?0:e}function Fl(s){switch(s){case 2:s=1;break;case 8:s=4;break;case 32:s=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:s=128;break;case 268435456:s=134217728;break;default:s=0}return s}function Il(s){return s&=-s,2<s?8<s?(s&134217727)!==0?32:268435456:8:2}function Do(){var s=L.p;return s!==0?s:(s=window.event,s===void 0?32:vv(s.type))}function Lo(s,a){var e=L.p;try{return L.p=s,a()}finally{L.p=e}}var Wa=Math.random().toString(36).slice(2),Ds="__reactFiber$"+Wa,Ys="__reactProps$"+Wa,Ze="__reactContainer$"+Wa,Wl="__reactEvents$"+Wa,Xv="__reactListeners$"+Wa,Qv="__reactHandles$"+Wa,Bo="__reactResources$"+Wa,Et="__reactMarker$"+Wa;function $l(s){delete s[Ds],delete s[Ys],delete s[Wl],delete s[Xv],delete s[Qv]}function Ye(s){var a=s[Ds];if(a)return a;for(var e=s.parentNode;e;){if(a=e[Ze]||e[Ds]){if(e=a.alternate,a.child!==null||e!==null&&e.child!==null)for(s=Iu(s);s!==null;){if(e=s[Ds])return e;s=Iu(s)}return a}s=e,e=s.parentNode}return null}function Ge(s){if(s=s[Ds]||s[Ze]){var a=s.tag;if(a===5||a===6||a===13||a===31||a===26||a===27||a===3)return s}return null}function Tt(s){var a=s.tag;if(a===5||a===26||a===27||a===6)return s.stateNode;throw Error(_(33))}function Xe(s){var a=s[Bo];return a||(a=s[Bo]={hoistableStyles:new Map,hoistableScripts:new Map}),a}function Ss(s){s[Et]=!0}var Eo=new Set,To={};function Ce(s,a){Qe(s,a),Qe(s+"Capture",a)}function Qe(s,a){for(To[s]=a,s=0;s<a.length;s++)Eo.add(a[s])}var Kv=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Ao={},zo={};function Jv(s){return Xl.call(zo,s)?!0:Xl.call(Ao,s)?!1:Kv.test(s)?zo[s]=!0:(Ao[s]=!0,!1)}function Bn(s,a,e){if(Jv(a))if(e===null)s.removeAttribute(a);else{switch(typeof e){case"undefined":case"function":case"symbol":s.removeAttribute(a);return;case"boolean":var t=a.toLowerCase().slice(0,5);if(t!=="data-"&&t!=="aria-"){s.removeAttribute(a);return}}s.setAttribute(a,""+e)}}function En(s,a,e){if(e===null)s.removeAttribute(a);else{switch(typeof e){case"undefined":case"function":case"symbol":case"boolean":s.removeAttribute(a);return}s.setAttribute(a,""+e)}}function Ta(s,a,e,t){if(t===null)s.removeAttribute(e);else{switch(typeof t){case"undefined":case"function":case"symbol":case"boolean":s.removeAttribute(e);return}s.setAttributeNS(a,e,""+t)}}function oa(s){switch(typeof s){case"bigint":case"boolean":case"number":case"string":case"undefined":return s;case"object":return s;default:return""}}function No(s){var a=s.type;return(s=s.nodeName)&&s.toLowerCase()==="input"&&(a==="checkbox"||a==="radio")}function Fv(s,a,e){var t=Object.getOwnPropertyDescriptor(s.constructor.prototype,a);if(!s.hasOwnProperty(a)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var n=t.get,l=t.set;return Object.defineProperty(s,a,{configurable:!0,get:function(){return n.call(this)},set:function(d){e=""+d,l.call(this,d)}}),Object.defineProperty(s,a,{enumerable:t.enumerable}),{getValue:function(){return e},setValue:function(d){e=""+d},stopTracking:function(){s._valueTracker=null,delete s[a]}}}}function Pl(s){if(!s._valueTracker){var a=No(s)?"checked":"value";s._valueTracker=Fv(s,a,""+s[a])}}function Oo(s){if(!s)return!1;var a=s._valueTracker;if(!a)return!0;var e=a.getValue(),t="";return s&&(t=No(s)?s.checked?"true":"false":s.value),s=t,s!==e?(a.setValue(s),!0):!1}function Tn(s){if(s=s||(typeof document<"u"?document:void 0),typeof s>"u")return null;try{return s.activeElement||s.body}catch{return s.body}}var Iv=/[\n"\\]/g;function ca(s){return s.replace(Iv,function(a){return"\\"+a.charCodeAt(0).toString(16)+" "})}function sd(s,a,e,t,n,l,d,i){s.name="",d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"?s.type=d:s.removeAttribute("type"),a!=null?d==="number"?(a===0&&s.value===""||s.value!=a)&&(s.value=""+oa(a)):s.value!==""+oa(a)&&(s.value=""+oa(a)):d!=="submit"&&d!=="reset"||s.removeAttribute("value"),a!=null?ad(s,d,oa(a)):e!=null?ad(s,d,oa(e)):t!=null&&s.removeAttribute("value"),n==null&&l!=null&&(s.defaultChecked=!!l),n!=null&&(s.checked=n&&typeof n!="function"&&typeof n!="symbol"),i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"?s.name=""+oa(i):s.removeAttribute("name")}function Ho(s,a,e,t,n,l,d,i){if(l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"&&(s.type=l),a!=null||e!=null){if(!(l!=="submit"&&l!=="reset"||a!=null)){Pl(s);return}e=e!=null?""+oa(e):"",a=a!=null?""+oa(a):e,i||a===s.value||(s.value=a),s.defaultValue=a}t=t??n,t=typeof t!="function"&&typeof t!="symbol"&&!!t,s.checked=i?s.checked:!!t,s.defaultChecked=!!t,d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(s.name=d),Pl(s)}function ad(s,a,e){a==="number"&&Tn(s.ownerDocument)===s||s.defaultValue===""+e||(s.defaultValue=""+e)}function Ke(s,a,e,t){if(s=s.options,a){a={};for(var n=0;n<e.length;n++)a["$"+e[n]]=!0;for(e=0;e<s.length;e++)n=a.hasOwnProperty("$"+s[e].value),s[e].selected!==n&&(s[e].selected=n),n&&t&&(s[e].defaultSelected=!0)}else{for(e=""+oa(e),a=null,n=0;n<s.length;n++){if(s[n].value===e){s[n].selected=!0,t&&(s[n].defaultSelected=!0);return}a!==null||s[n].disabled||(a=s[n])}a!==null&&(a.selected=!0)}}function Vo(s,a,e){if(a!=null&&(a=""+oa(a),a!==s.value&&(s.value=a),e==null)){s.defaultValue!==a&&(s.defaultValue=a);return}s.defaultValue=e!=null?""+oa(e):""}function jo(s,a,e,t){if(a==null){if(t!=null){if(e!=null)throw Error(_(92));if(ga(t)){if(1<t.length)throw Error(_(93));t=t[0]}e=t}e==null&&(e=""),a=e}e=oa(a),s.defaultValue=e,t=s.textContent,t===e&&t!==""&&t!==null&&(s.value=t),Pl(s)}function Je(s,a){if(a){var e=s.firstChild;if(e&&e===s.lastChild&&e.nodeType===3){e.nodeValue=a;return}}s.textContent=a}var Wv=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Uo(s,a,e){var t=a.indexOf("--")===0;e==null||typeof e=="boolean"||e===""?t?s.setProperty(a,""):a==="float"?s.cssFloat="":s[a]="":t?s.setProperty(a,e):typeof e!="number"||e===0||Wv.has(a)?a==="float"?s.cssFloat=e:s[a]=(""+e).trim():s[a]=e+"px"}function Ro(s,a,e){if(a!=null&&typeof a!="object")throw Error(_(62));if(s=s.style,e!=null){for(var t in e)!e.hasOwnProperty(t)||a!=null&&a.hasOwnProperty(t)||(t.indexOf("--")===0?s.setProperty(t,""):t==="float"?s.cssFloat="":s[t]="");for(var n in a)t=a[n],a.hasOwnProperty(n)&&e[n]!==t&&Uo(s,n,t)}else for(var l in a)a.hasOwnProperty(l)&&Uo(s,l,a[l])}function ed(s){if(s.indexOf("-")===-1)return!1;switch(s){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var $v=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Pv=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function An(s){return Pv.test(""+s)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":s}function Aa(){}var td=null;function nd(s){return s=s.target||s.srcElement||window,s.correspondingUseElement&&(s=s.correspondingUseElement),s.nodeType===3?s.parentNode:s}var Fe=null,Ie=null;function qo(s){var a=Ge(s);if(a&&(s=a.stateNode)){var e=s[Ys]||null;s:switch(s=a.stateNode,a.type){case"input":if(sd(s,e.value,e.defaultValue,e.defaultValue,e.checked,e.defaultChecked,e.type,e.name),a=e.name,e.type==="radio"&&a!=null){for(e=s;e.parentNode;)e=e.parentNode;for(e=e.querySelectorAll('input[name="'+ca(""+a)+'"][type="radio"]'),a=0;a<e.length;a++){var t=e[a];if(t!==s&&t.form===s.form){var n=t[Ys]||null;if(!n)throw Error(_(90));sd(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name)}}for(a=0;a<e.length;a++)t=e[a],t.form===s.form&&Oo(t)}break s;case"textarea":Vo(s,e.value,e.defaultValue);break s;case"select":a=e.value,a!=null&&Ke(s,!!e.multiple,a,!1)}}}var ld=!1;function Zo(s,a,e){if(ld)return s(a,e);ld=!0;try{var t=s(a);return t}finally{if(ld=!1,(Fe!==null||Ie!==null)&&(wl(),Fe&&(a=Fe,s=Ie,Ie=Fe=null,qo(a),s)))for(a=0;a<s.length;a++)qo(s[a])}}function At(s,a){var e=s.stateNode;if(e===null)return null;var t=e[Ys]||null;if(t===null)return null;e=t[a];s:switch(a){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(t=!t.disabled)||(s=s.type,t=!(s==="button"||s==="input"||s==="select"||s==="textarea")),s=!t;break s;default:s=!1}if(s)return null;if(e&&typeof e!="function")throw Error(_(231,a,typeof e));return e}var za=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),dd=!1;if(za)try{var zt={};Object.defineProperty(zt,"passive",{get:function(){dd=!0}}),window.addEventListener("test",zt,zt),window.removeEventListener("test",zt,zt)}catch{dd=!1}var $a=null,id=null,zn=null;function Yo(){if(zn)return zn;var s,a=id,e=a.length,t,n="value"in $a?$a.value:$a.textContent,l=n.length;for(s=0;s<e&&a[s]===n[s];s++);var d=e-s;for(t=1;t<=d&&a[e-t]===n[l-t];t++);return zn=n.slice(s,1<t?1-t:void 0)}function Nn(s){var a=s.keyCode;return"charCode"in s?(s=s.charCode,s===0&&a===13&&(s=13)):s=a,s===10&&(s=13),32<=s||s===13?s:0}function On(){return!0}function Go(){return!1}function Gs(s){function a(e,t,n,l,d){this._reactName=e,this._targetInst=n,this.type=t,this.nativeEvent=l,this.target=d,this.currentTarget=null;for(var i in s)s.hasOwnProperty(i)&&(e=s[i],this[i]=e?e(l):l[i]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?On:Go,this.isPropagationStopped=Go,this}return O(a.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!="unknown"&&(e.returnValue=!1),this.isDefaultPrevented=On)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!="unknown"&&(e.cancelBubble=!0),this.isPropagationStopped=On)},persist:function(){},isPersistent:On}),a}var Se={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(s){return s.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Hn=Gs(Se),Nt=O({},Se,{view:0,detail:0}),sp=Gs(Nt),od,cd,Ot,Vn=O({},Nt,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ud,button:0,buttons:0,relatedTarget:function(s){return s.relatedTarget===void 0?s.fromElement===s.srcElement?s.toElement:s.fromElement:s.relatedTarget},movementX:function(s){return"movementX"in s?s.movementX:(s!==Ot&&(Ot&&s.type==="mousemove"?(od=s.screenX-Ot.screenX,cd=s.screenY-Ot.screenY):cd=od=0,Ot=s),od)},movementY:function(s){return"movementY"in s?s.movementY:cd}}),Xo=Gs(Vn),ap=O({},Vn,{dataTransfer:0}),ep=Gs(ap),tp=O({},Nt,{relatedTarget:0}),rd=Gs(tp),np=O({},Se,{animationName:0,elapsedTime:0,pseudoElement:0}),lp=Gs(np),dp=O({},Se,{clipboardData:function(s){return"clipboardData"in s?s.clipboardData:window.clipboardData}}),ip=Gs(dp),op=O({},Se,{data:0}),Qo=Gs(op),cp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},rp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},up={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function vp(s){var a=this.nativeEvent;return a.getModifierState?a.getModifierState(s):(s=up[s])?!!a[s]:!1}function ud(){return vp}var pp=O({},Nt,{key:function(s){if(s.key){var a=cp[s.key]||s.key;if(a!=="Unidentified")return a}return s.type==="keypress"?(s=Nn(s),s===13?"Enter":String.fromCharCode(s)):s.type==="keydown"||s.type==="keyup"?rp[s.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ud,charCode:function(s){return s.type==="keypress"?Nn(s):0},keyCode:function(s){return s.type==="keydown"||s.type==="keyup"?s.keyCode:0},which:function(s){return s.type==="keypress"?Nn(s):s.type==="keydown"||s.type==="keyup"?s.keyCode:0}}),_p=Gs(pp),fp=O({},Vn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ko=Gs(fp),hp=O({},Nt,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ud}),bp=Gs(hp),gp=O({},Se,{propertyName:0,elapsedTime:0,pseudoElement:0}),wp=Gs(gp),mp=O({},Vn,{deltaX:function(s){return"deltaX"in s?s.deltaX:"wheelDeltaX"in s?-s.wheelDeltaX:0},deltaY:function(s){return"deltaY"in s?s.deltaY:"wheelDeltaY"in s?-s.wheelDeltaY:"wheelDelta"in s?-s.wheelDelta:0},deltaZ:0,deltaMode:0}),kp=Gs(mp),yp=O({},Se,{newState:0,oldState:0}),xp=Gs(yp),Cp=[9,13,27,32],vd=za&&"CompositionEvent"in window,Ht=null;za&&"documentMode"in document&&(Ht=document.documentMode);var Sp=za&&"TextEvent"in window&&!Ht,Jo=za&&(!vd||Ht&&8<Ht&&11>=Ht),Fo=" ",Io=!1;function Wo(s,a){switch(s){case"keyup":return Cp.indexOf(a.keyCode)!==-1;case"keydown":return a.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $o(s){return s=s.detail,typeof s=="object"&&"data"in s?s.data:null}var We=!1;function Mp(s,a){switch(s){case"compositionend":return $o(a);case"keypress":return a.which!==32?null:(Io=!0,Fo);case"textInput":return s=a.data,s===Fo&&Io?null:s;default:return null}}function Dp(s,a){if(We)return s==="compositionend"||!vd&&Wo(s,a)?(s=Yo(),zn=id=$a=null,We=!1,s):null;switch(s){case"paste":return null;case"keypress":if(!(a.ctrlKey||a.altKey||a.metaKey)||a.ctrlKey&&a.altKey){if(a.char&&1<a.char.length)return a.char;if(a.which)return String.fromCharCode(a.which)}return null;case"compositionend":return Jo&&a.locale!=="ko"?null:a.data;default:return null}}var Lp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Po(s){var a=s&&s.nodeName&&s.nodeName.toLowerCase();return a==="input"?!!Lp[s.type]:a==="textarea"}function sc(s,a,e,t){Fe?Ie?Ie.push(t):Ie=[t]:Fe=t,a=Ml(a,"onChange"),0<a.length&&(e=new Hn("onChange","change",null,e,t),s.push({event:e,listeners:a}))}var Vt=null,jt=null;function Bp(s){Hu(s,0)}function jn(s){var a=Tt(s);if(Oo(a))return s}function ac(s,a){if(s==="change")return a}var ec=!1;if(za){var pd;if(za){var _d="oninput"in document;if(!_d){var tc=document.createElement("div");tc.setAttribute("oninput","return;"),_d=typeof tc.oninput=="function"}pd=_d}else pd=!1;ec=pd&&(!document.documentMode||9<document.documentMode)}function nc(){Vt&&(Vt.detachEvent("onpropertychange",lc),jt=Vt=null)}function lc(s){if(s.propertyName==="value"&&jn(jt)){var a=[];sc(a,jt,s,nd(s)),Zo(Bp,a)}}function Ep(s,a,e){s==="focusin"?(nc(),Vt=a,jt=e,Vt.attachEvent("onpropertychange",lc)):s==="focusout"&&nc()}function Tp(s){if(s==="selectionchange"||s==="keyup"||s==="keydown")return jn(jt)}function Ap(s,a){if(s==="click")return jn(a)}function zp(s,a){if(s==="input"||s==="change")return jn(a)}function Np(s,a){return s===a&&(s!==0||1/s===1/a)||s!==s&&a!==a}var sa=typeof Object.is=="function"?Object.is:Np;function Ut(s,a){if(sa(s,a))return!0;if(typeof s!="object"||s===null||typeof a!="object"||a===null)return!1;var e=Object.keys(s),t=Object.keys(a);if(e.length!==t.length)return!1;for(t=0;t<e.length;t++){var n=e[t];if(!Xl.call(a,n)||!sa(s[n],a[n]))return!1}return!0}function dc(s){for(;s&&s.firstChild;)s=s.firstChild;return s}function ic(s,a){var e=dc(s);s=0;for(var t;e;){if(e.nodeType===3){if(t=s+e.textContent.length,s<=a&&t>=a)return{node:e,offset:a-s};s=t}s:{for(;e;){if(e.nextSibling){e=e.nextSibling;break s}e=e.parentNode}e=void 0}e=dc(e)}}function oc(s,a){return s&&a?s===a?!0:s&&s.nodeType===3?!1:a&&a.nodeType===3?oc(s,a.parentNode):"contains"in s?s.contains(a):s.compareDocumentPosition?!!(s.compareDocumentPosition(a)&16):!1:!1}function cc(s){s=s!=null&&s.ownerDocument!=null&&s.ownerDocument.defaultView!=null?s.ownerDocument.defaultView:window;for(var a=Tn(s.document);a instanceof s.HTMLIFrameElement;){try{var e=typeof a.contentWindow.location.href=="string"}catch{e=!1}if(e)s=a.contentWindow;else break;a=Tn(s.document)}return a}function fd(s){var a=s&&s.nodeName&&s.nodeName.toLowerCase();return a&&(a==="input"&&(s.type==="text"||s.type==="search"||s.type==="tel"||s.type==="url"||s.type==="password")||a==="textarea"||s.contentEditable==="true")}var Op=za&&"documentMode"in document&&11>=document.documentMode,$e=null,hd=null,Rt=null,bd=!1;function rc(s,a,e){var t=e.window===e?e.document:e.nodeType===9?e:e.ownerDocument;bd||$e==null||$e!==Tn(t)||(t=$e,"selectionStart"in t&&fd(t)?t={start:t.selectionStart,end:t.selectionEnd}:(t=(t.ownerDocument&&t.ownerDocument.defaultView||window).getSelection(),t={anchorNode:t.anchorNode,anchorOffset:t.anchorOffset,focusNode:t.focusNode,focusOffset:t.focusOffset}),Rt&&Ut(Rt,t)||(Rt=t,t=Ml(hd,"onSelect"),0<t.length&&(a=new Hn("onSelect","select",null,a,e),s.push({event:a,listeners:t}),a.target=$e)))}function Me(s,a){var e={};return e[s.toLowerCase()]=a.toLowerCase(),e["Webkit"+s]="webkit"+a,e["Moz"+s]="moz"+a,e}var Pe={animationend:Me("Animation","AnimationEnd"),animationiteration:Me("Animation","AnimationIteration"),animationstart:Me("Animation","AnimationStart"),transitionrun:Me("Transition","TransitionRun"),transitionstart:Me("Transition","TransitionStart"),transitioncancel:Me("Transition","TransitionCancel"),transitionend:Me("Transition","TransitionEnd")},gd={},uc={};za&&(uc=document.createElement("div").style,"AnimationEvent"in window||(delete Pe.animationend.animation,delete Pe.animationiteration.animation,delete Pe.animationstart.animation),"TransitionEvent"in window||delete Pe.transitionend.transition);function De(s){if(gd[s])return gd[s];if(!Pe[s])return s;var a=Pe[s],e;for(e in a)if(a.hasOwnProperty(e)&&e in uc)return gd[s]=a[e];return s}var vc=De("animationend"),pc=De("animationiteration"),_c=De("animationstart"),Hp=De("transitionrun"),Vp=De("transitionstart"),jp=De("transitioncancel"),fc=De("transitionend"),hc=new Map,wd="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");wd.push("scrollEnd");function wa(s,a){hc.set(s,a),Ce(a,[s])}var Un=typeof reportError=="function"?reportError:function(s){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var a=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof s=="object"&&s!==null&&typeof s.message=="string"?String(s.message):String(s),error:s});if(!window.dispatchEvent(a))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",s);return}console.error(s)},ra=[],st=0,md=0;function Rn(){for(var s=st,a=md=st=0;a<s;){var e=ra[a];ra[a++]=null;var t=ra[a];ra[a++]=null;var n=ra[a];ra[a++]=null;var l=ra[a];if(ra[a++]=null,t!==null&&n!==null){var d=t.pending;d===null?n.next=n:(n.next=d.next,d.next=n),t.pending=n}l!==0&&bc(e,n,l)}}function qn(s,a,e,t){ra[st++]=s,ra[st++]=a,ra[st++]=e,ra[st++]=t,md|=t,s.lanes|=t,s=s.alternate,s!==null&&(s.lanes|=t)}function kd(s,a,e,t){return qn(s,a,e,t),Zn(s)}function Le(s,a){return qn(s,null,null,a),Zn(s)}function bc(s,a,e){s.lanes|=e;var t=s.alternate;t!==null&&(t.lanes|=e);for(var n=!1,l=s.return;l!==null;)l.childLanes|=e,t=l.alternate,t!==null&&(t.childLanes|=e),l.tag===22&&(s=l.stateNode,s===null||s._visibility&1||(n=!0)),s=l,l=l.return;return s.tag===3?(l=s.stateNode,n&&a!==null&&(n=31-Ps(e),s=l.hiddenUpdates,t=s[n],t===null?s[n]=[a]:t.push(a),a.lane=e|536870912),l):null}function Zn(s){if(50<cn)throw cn=0,Ei=null,Error(_(185));for(var a=s.return;a!==null;)s=a,a=s.return;return s.tag===3?s.stateNode:null}var at={};function Up(s,a,e,t){this.tag=s,this.key=e,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=a,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=t,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function aa(s,a,e,t){return new Up(s,a,e,t)}function yd(s){return s=s.prototype,!(!s||!s.isReactComponent)}function Na(s,a){var e=s.alternate;return e===null?(e=aa(s.tag,a,s.key,s.mode),e.elementType=s.elementType,e.type=s.type,e.stateNode=s.stateNode,e.alternate=s,s.alternate=e):(e.pendingProps=a,e.type=s.type,e.flags=0,e.subtreeFlags=0,e.deletions=null),e.flags=s.flags&65011712,e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,a=s.dependencies,e.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext},e.sibling=s.sibling,e.index=s.index,e.ref=s.ref,e.refCleanup=s.refCleanup,e}function gc(s,a){s.flags&=65011714;var e=s.alternate;return e===null?(s.childLanes=0,s.lanes=a,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,s.type=e.type,a=e.dependencies,s.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext}),s}function Yn(s,a,e,t,n,l){var d=0;if(t=s,typeof s=="function")yd(s)&&(d=1);else if(typeof s=="string")d=G_(s,e,A.current)?26:s==="html"||s==="head"||s==="body"?27:5;else s:switch(s){case xa:return s=aa(31,e,a,n),s.elementType=xa,s.lanes=l,s;case Os:return Be(e.children,n,l,a);case Ba:d=8,n|=24;break;case Is:return s=aa(12,e,a,n|2),s.elementType=Is,s.lanes=l,s;case ya:return s=aa(13,e,a,n),s.elementType=ya,s.lanes=l,s;case Rs:return s=aa(19,e,a,n),s.elementType=Rs,s.lanes=l,s;default:if(typeof s=="object"&&s!==null)switch(s.$$typeof){case zs:d=10;break s;case Fa:d=9;break s;case ia:d=11;break s;case W:d=14;break s;case qs:d=16,t=null;break s}d=29,e=Error(_(130,s===null?"null":typeof s,"")),t=null}return a=aa(d,e,a,n),a.elementType=s,a.type=t,a.lanes=l,a}function Be(s,a,e,t){return s=aa(7,s,t,a),s.lanes=e,s}function xd(s,a,e){return s=aa(6,s,null,a),s.lanes=e,s}function wc(s){var a=aa(18,null,null,0);return a.stateNode=s,a}function Cd(s,a,e){return a=aa(4,s.children!==null?s.children:[],s.key,a),a.lanes=e,a.stateNode={containerInfo:s.containerInfo,pendingChildren:null,implementation:s.implementation},a}var mc=new WeakMap;function ua(s,a){if(typeof s=="object"&&s!==null){var e=mc.get(s);return e!==void 0?e:(a={value:s,source:a,stack:wo(a)},mc.set(s,a),a)}return{value:s,source:a,stack:wo(a)}}var et=[],tt=0,Gn=null,qt=0,va=[],pa=0,Pa=null,Sa=1,Ma="";function Oa(s,a){et[tt++]=qt,et[tt++]=Gn,Gn=s,qt=a}function kc(s,a,e){va[pa++]=Sa,va[pa++]=Ma,va[pa++]=Pa,Pa=s;var t=Sa;s=Ma;var n=32-Ps(t)-1;t&=~(1<<n),e+=1;var l=32-Ps(a)+n;if(30<l){var d=n-n%5;l=(t&(1<<d)-1).toString(32),t>>=d,n-=d,Sa=1<<32-Ps(a)+n|e<<n|t,Ma=l+s}else Sa=1<<l|e<<n|t,Ma=s}function Sd(s){s.return!==null&&(Oa(s,1),kc(s,1,0))}function Md(s){for(;s===Gn;)Gn=et[--tt],et[tt]=null,qt=et[--tt],et[tt]=null;for(;s===Pa;)Pa=va[--pa],va[pa]=null,Ma=va[--pa],va[pa]=null,Sa=va[--pa],va[pa]=null}function yc(s,a){va[pa++]=Sa,va[pa++]=Ma,va[pa++]=Pa,Sa=a.id,Ma=a.overflow,Pa=s}var Ls=null,vs=null,$=!1,se=null,_a=!1,Dd=Error(_(519));function ae(s){var a=Error(_(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Zt(ua(a,s)),Dd}function xc(s){var a=s.stateNode,e=s.type,t=s.memoizedProps;switch(a[Ds]=s,a[Ys]=t,e){case"dialog":J("cancel",a),J("close",a);break;case"iframe":case"object":case"embed":J("load",a);break;case"video":case"audio":for(e=0;e<un.length;e++)J(un[e],a);break;case"source":J("error",a);break;case"img":case"image":case"link":J("error",a),J("load",a);break;case"details":J("toggle",a);break;case"input":J("invalid",a),Ho(a,t.value,t.defaultValue,t.checked,t.defaultChecked,t.type,t.name,!0);break;case"select":J("invalid",a);break;case"textarea":J("invalid",a),jo(a,t.value,t.defaultValue,t.children)}e=t.children,typeof e!="string"&&typeof e!="number"&&typeof e!="bigint"||a.textContent===""+e||t.suppressHydrationWarning===!0||Ru(a.textContent,e)?(t.popover!=null&&(J("beforetoggle",a),J("toggle",a)),t.onScroll!=null&&J("scroll",a),t.onScrollEnd!=null&&J("scrollend",a),t.onClick!=null&&(a.onclick=Aa),a=!0):a=!1,a||ae(s,!0)}function Cc(s){for(Ls=s.return;Ls;)switch(Ls.tag){case 5:case 31:case 13:_a=!1;return;case 27:case 3:_a=!0;return;default:Ls=Ls.return}}function nt(s){if(s!==Ls)return!1;if(!$)return Cc(s),$=!0,!1;var a=s.tag,e;if((e=a!==3&&a!==27)&&((e=a===5)&&(e=s.type,e=!(e!=="form"&&e!=="button")||Xi(s.type,s.memoizedProps)),e=!e),e&&vs&&ae(s),Cc(s),a===13){if(s=s.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(_(317));vs=Fu(s)}else if(a===31){if(s=s.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(_(317));vs=Fu(s)}else a===27?(a=vs,fe(s.type)?(s=Ii,Ii=null,vs=s):vs=a):vs=Ls?ha(s.stateNode.nextSibling):null;return!0}function Ee(){vs=Ls=null,$=!1}function Ld(){var s=se;return s!==null&&(Js===null?Js=s:Js.push.apply(Js,s),se=null),s}function Zt(s){se===null?se=[s]:se.push(s)}var Bd=u(null),Te=null,Ha=null;function ee(s,a,e){B(Bd,a._currentValue),a._currentValue=e}function Va(s){s._currentValue=Bd.current,x(Bd)}function Ed(s,a,e){for(;s!==null;){var t=s.alternate;if((s.childLanes&a)!==a?(s.childLanes|=a,t!==null&&(t.childLanes|=a)):t!==null&&(t.childLanes&a)!==a&&(t.childLanes|=a),s===e)break;s=s.return}}function Td(s,a,e,t){var n=s.child;for(n!==null&&(n.return=s);n!==null;){var l=n.dependencies;if(l!==null){var d=n.child;l=l.firstContext;s:for(;l!==null;){var i=l;l=n;for(var o=0;o<a.length;o++)if(i.context===a[o]){l.lanes|=e,i=l.alternate,i!==null&&(i.lanes|=e),Ed(l.return,e,s),t||(d=null);break s}l=i.next}}else if(n.tag===18){if(d=n.return,d===null)throw Error(_(341));d.lanes|=e,l=d.alternate,l!==null&&(l.lanes|=e),Ed(d,e,s),d=null}else d=n.child;if(d!==null)d.return=n;else for(d=n;d!==null;){if(d===s){d=null;break}if(n=d.sibling,n!==null){n.return=d.return,d=n;break}d=d.return}n=d}}function lt(s,a,e,t){s=null;for(var n=a,l=!1;n!==null;){if(!l){if((n.flags&524288)!==0)l=!0;else if((n.flags&262144)!==0)break}if(n.tag===10){var d=n.alternate;if(d===null)throw Error(_(387));if(d=d.memoizedProps,d!==null){var i=n.type;sa(n.pendingProps.value,d.value)||(s!==null?s.push(i):s=[i])}}else if(n===ts.current){if(d=n.alternate,d===null)throw Error(_(387));d.memoizedState.memoizedState!==n.memoizedState.memoizedState&&(s!==null?s.push(hn):s=[hn])}n=n.return}s!==null&&Td(a,s,e,t),a.flags|=262144}function Xn(s){for(s=s.firstContext;s!==null;){if(!sa(s.context._currentValue,s.memoizedValue))return!0;s=s.next}return!1}function Ae(s){Te=s,Ha=null,s=s.dependencies,s!==null&&(s.firstContext=null)}function Bs(s){return Sc(Te,s)}function Qn(s,a){return Te===null&&Ae(s),Sc(s,a)}function Sc(s,a){var e=a._currentValue;if(a={context:a,memoizedValue:e,next:null},Ha===null){if(s===null)throw Error(_(308));Ha=a,s.dependencies={lanes:0,firstContext:a},s.flags|=524288}else Ha=Ha.next=a;return e}var Rp=typeof AbortController<"u"?AbortController:function(){var s=[],a=this.signal={aborted:!1,addEventListener:function(e,t){s.push(t)}};this.abort=function(){a.aborted=!0,s.forEach(function(e){return e()})}},qp=v.unstable_scheduleCallback,Zp=v.unstable_NormalPriority,ms={$$typeof:zs,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ad(){return{controller:new Rp,data:new Map,refCount:0}}function Yt(s){s.refCount--,s.refCount===0&&qp(Zp,function(){s.controller.abort()})}var Gt=null,zd=0,dt=0,it=null;function Yp(s,a){if(Gt===null){var e=Gt=[];zd=0,dt=Hi(),it={status:"pending",value:void 0,then:function(t){e.push(t)}}}return zd++,a.then(Mc,Mc),a}function Mc(){if(--zd===0&&Gt!==null){it!==null&&(it.status="fulfilled");var s=Gt;Gt=null,dt=0,it=null;for(var a=0;a<s.length;a++)(0,s[a])()}}function Gp(s,a){var e=[],t={status:"pending",value:null,reason:null,then:function(n){e.push(n)}};return s.then(function(){t.status="fulfilled",t.value=a;for(var n=0;n<e.length;n++)(0,e[n])(a)},function(n){for(t.status="rejected",t.reason=n,n=0;n<e.length;n++)(0,e[n])(void 0)}),t}var Dc=m.S;m.S=function(s,a){ru=Ws(),typeof a=="object"&&a!==null&&typeof a.then=="function"&&Yp(s,a),Dc!==null&&Dc(s,a)};var ze=u(null);function Nd(){var s=ze.current;return s!==null?s:us.pooledCache}function Kn(s,a){a===null?B(ze,ze.current):B(ze,a.pool)}function Lc(){var s=Nd();return s===null?null:{parent:ms._currentValue,pool:s}}var ot=Error(_(460)),Od=Error(_(474)),Jn=Error(_(542)),Fn={then:function(){}};function Bc(s){return s=s.status,s==="fulfilled"||s==="rejected"}function Ec(s,a,e){switch(e=s[e],e===void 0?s.push(a):e!==a&&(a.then(Aa,Aa),a=e),a.status){case"fulfilled":return a.value;case"rejected":throw s=a.reason,Ac(s),s;default:if(typeof a.status=="string")a.then(Aa,Aa);else{if(s=us,s!==null&&100<s.shellSuspendCounter)throw Error(_(482));s=a,s.status="pending",s.then(function(t){if(a.status==="pending"){var n=a;n.status="fulfilled",n.value=t}},function(t){if(a.status==="pending"){var n=a;n.status="rejected",n.reason=t}})}switch(a.status){case"fulfilled":return a.value;case"rejected":throw s=a.reason,Ac(s),s}throw Oe=a,ot}}function Ne(s){try{var a=s._init;return a(s._payload)}catch(e){throw e!==null&&typeof e=="object"&&typeof e.then=="function"?(Oe=e,ot):e}}var Oe=null;function Tc(){if(Oe===null)throw Error(_(459));var s=Oe;return Oe=null,s}function Ac(s){if(s===ot||s===Jn)throw Error(_(483))}var ct=null,Xt=0;function In(s){var a=Xt;return Xt+=1,ct===null&&(ct=[]),Ec(ct,s,a)}function Qt(s,a){a=a.props.ref,s.ref=a!==void 0?a:null}function Wn(s,a){throw a.$$typeof===P?Error(_(525)):(s=Object.prototype.toString.call(a),Error(_(31,s==="[object Object]"?"object with keys {"+Object.keys(a).join(", ")+"}":s)))}function zc(s){function a(p,r){if(s){var f=p.deletions;f===null?(p.deletions=[r],p.flags|=16):f.push(r)}}function e(p,r){if(!s)return null;for(;r!==null;)a(p,r),r=r.sibling;return null}function t(p){for(var r=new Map;p!==null;)p.key!==null?r.set(p.key,p):r.set(p.index,p),p=p.sibling;return r}function n(p,r){return p=Na(p,r),p.index=0,p.sibling=null,p}function l(p,r,f){return p.index=f,s?(f=p.alternate,f!==null?(f=f.index,f<r?(p.flags|=67108866,r):f):(p.flags|=67108866,r)):(p.flags|=1048576,r)}function d(p){return s&&p.alternate===null&&(p.flags|=67108866),p}function i(p,r,f,k){return r===null||r.tag!==6?(r=xd(f,p.mode,k),r.return=p,r):(r=n(r,f),r.return=p,r)}function o(p,r,f,k){var H=f.type;return H===Os?w(p,r,f.props.children,k,f.key):r!==null&&(r.elementType===H||typeof H=="object"&&H!==null&&H.$$typeof===qs&&Ne(H)===r.type)?(r=n(r,f.props),Qt(r,f),r.return=p,r):(r=Yn(f.type,f.key,f.props,null,p.mode,k),Qt(r,f),r.return=p,r)}function h(p,r,f,k){return r===null||r.tag!==4||r.stateNode.containerInfo!==f.containerInfo||r.stateNode.implementation!==f.implementation?(r=Cd(f,p.mode,k),r.return=p,r):(r=n(r,f.children||[]),r.return=p,r)}function w(p,r,f,k,H){return r===null||r.tag!==7?(r=Be(f,p.mode,k,H),r.return=p,r):(r=n(r,f),r.return=p,r)}function y(p,r,f){if(typeof r=="string"&&r!==""||typeof r=="number"||typeof r=="bigint")return r=xd(""+r,p.mode,f),r.return=p,r;if(typeof r=="object"&&r!==null){switch(r.$$typeof){case As:return f=Yn(r.type,r.key,r.props,null,p.mode,f),Qt(f,r),f.return=p,f;case Us:return r=Cd(r,p.mode,f),r.return=p,r;case qs:return r=Ne(r),y(p,r,f)}if(ga(r)||Zs(r))return r=Be(r,p.mode,f,null),r.return=p,r;if(typeof r.then=="function")return y(p,In(r),f);if(r.$$typeof===zs)return y(p,Qn(p,r),f);Wn(p,r)}return null}function b(p,r,f,k){var H=r!==null?r.key:null;if(typeof f=="string"&&f!==""||typeof f=="number"||typeof f=="bigint")return H!==null?null:i(p,r,""+f,k);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case As:return f.key===H?o(p,r,f,k):null;case Us:return f.key===H?h(p,r,f,k):null;case qs:return f=Ne(f),b(p,r,f,k)}if(ga(f)||Zs(f))return H!==null?null:w(p,r,f,k,null);if(typeof f.then=="function")return b(p,r,In(f),k);if(f.$$typeof===zs)return b(p,r,Qn(p,f),k);Wn(p,f)}return null}function g(p,r,f,k,H){if(typeof k=="string"&&k!==""||typeof k=="number"||typeof k=="bigint")return p=p.get(f)||null,i(r,p,""+k,H);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case As:return p=p.get(k.key===null?f:k.key)||null,o(r,p,k,H);case Us:return p=p.get(k.key===null?f:k.key)||null,h(r,p,k,H);case qs:return k=Ne(k),g(p,r,f,k,H)}if(ga(k)||Zs(k))return p=p.get(f)||null,w(r,p,k,H,null);if(typeof k.then=="function")return g(p,r,f,In(k),H);if(k.$$typeof===zs)return g(p,r,f,Qn(r,k),H);Wn(r,k)}return null}function T(p,r,f,k){for(var H=null,ss=null,z=r,X=r=0,I=null;z!==null&&X<f.length;X++){z.index>X?(I=z,z=null):I=z.sibling;var as=b(p,z,f[X],k);if(as===null){z===null&&(z=I);break}s&&z&&as.alternate===null&&a(p,z),r=l(as,r,X),ss===null?H=as:ss.sibling=as,ss=as,z=I}if(X===f.length)return e(p,z),$&&Oa(p,X),H;if(z===null){for(;X<f.length;X++)z=y(p,f[X],k),z!==null&&(r=l(z,r,X),ss===null?H=z:ss.sibling=z,ss=z);return $&&Oa(p,X),H}for(z=t(z);X<f.length;X++)I=g(z,p,X,f[X],k),I!==null&&(s&&I.alternate!==null&&z.delete(I.key===null?X:I.key),r=l(I,r,X),ss===null?H=I:ss.sibling=I,ss=I);return s&&z.forEach(function(me){return a(p,me)}),$&&Oa(p,X),H}function R(p,r,f,k){if(f==null)throw Error(_(151));for(var H=null,ss=null,z=r,X=r=0,I=null,as=f.next();z!==null&&!as.done;X++,as=f.next()){z.index>X?(I=z,z=null):I=z.sibling;var me=b(p,z,as.value,k);if(me===null){z===null&&(z=I);break}s&&z&&me.alternate===null&&a(p,z),r=l(me,r,X),ss===null?H=me:ss.sibling=me,ss=me,z=I}if(as.done)return e(p,z),$&&Oa(p,X),H;if(z===null){for(;!as.done;X++,as=f.next())as=y(p,as.value,k),as!==null&&(r=l(as,r,X),ss===null?H=as:ss.sibling=as,ss=as);return $&&Oa(p,X),H}for(z=t(z);!as.done;X++,as=f.next())as=g(z,p,X,as.value,k),as!==null&&(s&&as.alternate!==null&&z.delete(as.key===null?X:as.key),r=l(as,r,X),ss===null?H=as:ss.sibling=as,ss=as);return s&&z.forEach(function(a1){return a(p,a1)}),$&&Oa(p,X),H}function cs(p,r,f,k){if(typeof f=="object"&&f!==null&&f.type===Os&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case As:s:{for(var H=f.key;r!==null;){if(r.key===H){if(H=f.type,H===Os){if(r.tag===7){e(p,r.sibling),k=n(r,f.props.children),k.return=p,p=k;break s}}else if(r.elementType===H||typeof H=="object"&&H!==null&&H.$$typeof===qs&&Ne(H)===r.type){e(p,r.sibling),k=n(r,f.props),Qt(k,f),k.return=p,p=k;break s}e(p,r);break}else a(p,r);r=r.sibling}f.type===Os?(k=Be(f.props.children,p.mode,k,f.key),k.return=p,p=k):(k=Yn(f.type,f.key,f.props,null,p.mode,k),Qt(k,f),k.return=p,p=k)}return d(p);case Us:s:{for(H=f.key;r!==null;){if(r.key===H)if(r.tag===4&&r.stateNode.containerInfo===f.containerInfo&&r.stateNode.implementation===f.implementation){e(p,r.sibling),k=n(r,f.children||[]),k.return=p,p=k;break s}else{e(p,r);break}else a(p,r);r=r.sibling}k=Cd(f,p.mode,k),k.return=p,p=k}return d(p);case qs:return f=Ne(f),cs(p,r,f,k)}if(ga(f))return T(p,r,f,k);if(Zs(f)){if(H=Zs(f),typeof H!="function")throw Error(_(150));return f=H.call(f),R(p,r,f,k)}if(typeof f.then=="function")return cs(p,r,In(f),k);if(f.$$typeof===zs)return cs(p,r,Qn(p,f),k);Wn(p,f)}return typeof f=="string"&&f!==""||typeof f=="number"||typeof f=="bigint"?(f=""+f,r!==null&&r.tag===6?(e(p,r.sibling),k=n(r,f),k.return=p,p=k):(e(p,r),k=xd(f,p.mode,k),k.return=p,p=k),d(p)):e(p,r)}return function(p,r,f,k){try{Xt=0;var H=cs(p,r,f,k);return ct=null,H}catch(z){if(z===ot||z===Jn)throw z;var ss=aa(29,z,null,p.mode);return ss.lanes=k,ss.return=p,ss}finally{}}}var He=zc(!0),Nc=zc(!1),te=!1;function Hd(s){s.updateQueue={baseState:s.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Vd(s,a){s=s.updateQueue,a.updateQueue===s&&(a.updateQueue={baseState:s.baseState,firstBaseUpdate:s.firstBaseUpdate,lastBaseUpdate:s.lastBaseUpdate,shared:s.shared,callbacks:null})}function ne(s){return{lane:s,tag:0,payload:null,callback:null,next:null}}function le(s,a,e){var t=s.updateQueue;if(t===null)return null;if(t=t.shared,(es&2)!==0){var n=t.pending;return n===null?a.next=a:(a.next=n.next,n.next=a),t.pending=a,a=Zn(s),bc(s,null,e),a}return qn(s,t,a,e),Zn(s)}function Kt(s,a,e){if(a=a.updateQueue,a!==null&&(a=a.shared,(e&4194048)!==0)){var t=a.lanes;t&=s.pendingLanes,e|=t,a.lanes=e,So(s,e)}}function jd(s,a){var e=s.updateQueue,t=s.alternate;if(t!==null&&(t=t.updateQueue,e===t)){var n=null,l=null;if(e=e.firstBaseUpdate,e!==null){do{var d={lane:e.lane,tag:e.tag,payload:e.payload,callback:null,next:null};l===null?n=l=d:l=l.next=d,e=e.next}while(e!==null);l===null?n=l=a:l=l.next=a}else n=l=a;e={baseState:t.baseState,firstBaseUpdate:n,lastBaseUpdate:l,shared:t.shared,callbacks:t.callbacks},s.updateQueue=e;return}s=e.lastBaseUpdate,s===null?e.firstBaseUpdate=a:s.next=a,e.lastBaseUpdate=a}var Ud=!1;function Jt(){if(Ud){var s=it;if(s!==null)throw s}}function Ft(s,a,e,t){Ud=!1;var n=s.updateQueue;te=!1;var l=n.firstBaseUpdate,d=n.lastBaseUpdate,i=n.shared.pending;if(i!==null){n.shared.pending=null;var o=i,h=o.next;o.next=null,d===null?l=h:d.next=h,d=o;var w=s.alternate;w!==null&&(w=w.updateQueue,i=w.lastBaseUpdate,i!==d&&(i===null?w.firstBaseUpdate=h:i.next=h,w.lastBaseUpdate=o))}if(l!==null){var y=n.baseState;d=0,w=h=o=null,i=l;do{var b=i.lane&-536870913,g=b!==i.lane;if(g?(F&b)===b:(t&b)===b){b!==0&&b===dt&&(Ud=!0),w!==null&&(w=w.next={lane:0,tag:i.tag,payload:i.payload,callback:null,next:null});s:{var T=s,R=i;b=a;var cs=e;switch(R.tag){case 1:if(T=R.payload,typeof T=="function"){y=T.call(cs,y,b);break s}y=T;break s;case 3:T.flags=T.flags&-65537|128;case 0:if(T=R.payload,b=typeof T=="function"?T.call(cs,y,b):T,b==null)break s;y=O({},y,b);break s;case 2:te=!0}}b=i.callback,b!==null&&(s.flags|=64,g&&(s.flags|=8192),g=n.callbacks,g===null?n.callbacks=[b]:g.push(b))}else g={lane:b,tag:i.tag,payload:i.payload,callback:i.callback,next:null},w===null?(h=w=g,o=y):w=w.next=g,d|=b;if(i=i.next,i===null){if(i=n.shared.pending,i===null)break;g=i,i=g.next,g.next=null,n.lastBaseUpdate=g,n.shared.pending=null}}while(!0);w===null&&(o=y),n.baseState=o,n.firstBaseUpdate=h,n.lastBaseUpdate=w,l===null&&(n.shared.lanes=0),re|=d,s.lanes=d,s.memoizedState=y}}function Oc(s,a){if(typeof s!="function")throw Error(_(191,s));s.call(a)}function Hc(s,a){var e=s.callbacks;if(e!==null)for(s.callbacks=null,s=0;s<e.length;s++)Oc(e[s],a)}var rt=u(null),$n=u(0);function Vc(s,a){s=Qa,B($n,s),B(rt,a),Qa=s|a.baseLanes}function Rd(){B($n,Qa),B(rt,rt.current)}function qd(){Qa=$n.current,x(rt),x($n)}var ea=u(null),fa=null;function de(s){var a=s.alternate;B(gs,gs.current&1),B(ea,s),fa===null&&(a===null||rt.current!==null||a.memoizedState!==null)&&(fa=s)}function Zd(s){B(gs,gs.current),B(ea,s),fa===null&&(fa=s)}function jc(s){s.tag===22?(B(gs,gs.current),B(ea,s),fa===null&&(fa=s)):ie()}function ie(){B(gs,gs.current),B(ea,ea.current)}function ta(s){x(ea),fa===s&&(fa=null),x(gs)}var gs=u(0);function Pn(s){for(var a=s;a!==null;){if(a.tag===13){var e=a.memoizedState;if(e!==null&&(e=e.dehydrated,e===null||Ji(e)||Fi(e)))return a}else if(a.tag===19&&(a.memoizedProps.revealOrder==="forwards"||a.memoizedProps.revealOrder==="backwards"||a.memoizedProps.revealOrder==="unstable_legacy-backwards"||a.memoizedProps.revealOrder==="together")){if((a.flags&128)!==0)return a}else if(a.child!==null){a.child.return=a,a=a.child;continue}if(a===s)break;for(;a.sibling===null;){if(a.return===null||a.return===s)return null;a=a.return}a.sibling.return=a.return,a=a.sibling}return null}var ja=0,G=null,is=null,ks=null,sl=!1,ut=!1,Ve=!1,al=0,It=0,vt=null,Xp=0;function fs(){throw Error(_(321))}function Yd(s,a){if(a===null)return!1;for(var e=0;e<a.length&&e<s.length;e++)if(!sa(s[e],a[e]))return!1;return!0}function Gd(s,a,e,t,n,l){return ja=l,G=a,a.memoizedState=null,a.updateQueue=null,a.lanes=0,m.H=s===null||s.memoizedState===null?kr:li,Ve=!1,l=e(t,n),Ve=!1,ut&&(l=Rc(a,e,t,n)),Uc(s),l}function Uc(s){m.H=Pt;var a=is!==null&&is.next!==null;if(ja=0,ks=is=G=null,sl=!1,It=0,vt=null,a)throw Error(_(300));s===null||ys||(s=s.dependencies,s!==null&&Xn(s)&&(ys=!0))}function Rc(s,a,e,t){G=s;var n=0;do{if(ut&&(vt=null),It=0,ut=!1,25<=n)throw Error(_(301));if(n+=1,ks=is=null,s.updateQueue!=null){var l=s.updateQueue;l.lastEffect=null,l.events=null,l.stores=null,l.memoCache!=null&&(l.memoCache.index=0)}m.H=yr,l=a(e,t)}while(ut);return l}function Qp(){var s=m.H,a=s.useState()[0];return a=typeof a.then=="function"?Wt(a):a,s=s.useState()[0],(is!==null?is.memoizedState:null)!==s&&(G.flags|=1024),a}function Xd(){var s=al!==0;return al=0,s}function Qd(s,a,e){a.updateQueue=s.updateQueue,a.flags&=-2053,s.lanes&=~e}function Kd(s){if(sl){for(s=s.memoizedState;s!==null;){var a=s.queue;a!==null&&(a.pending=null),s=s.next}sl=!1}ja=0,ks=is=G=null,ut=!1,It=al=0,vt=null}function Vs(){var s={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ks===null?G.memoizedState=ks=s:ks=ks.next=s,ks}function ws(){if(is===null){var s=G.alternate;s=s!==null?s.memoizedState:null}else s=is.next;var a=ks===null?G.memoizedState:ks.next;if(a!==null)ks=a,is=s;else{if(s===null)throw G.alternate===null?Error(_(467)):Error(_(310));is=s,s={memoizedState:is.memoizedState,baseState:is.baseState,baseQueue:is.baseQueue,queue:is.queue,next:null},ks===null?G.memoizedState=ks=s:ks=ks.next=s}return ks}function el(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Wt(s){var a=It;return It+=1,vt===null&&(vt=[]),s=Ec(vt,s,a),a=G,(ks===null?a.memoizedState:ks.next)===null&&(a=a.alternate,m.H=a===null||a.memoizedState===null?kr:li),s}function tl(s){if(s!==null&&typeof s=="object"){if(typeof s.then=="function")return Wt(s);if(s.$$typeof===zs)return Bs(s)}throw Error(_(438,String(s)))}function Jd(s){var a=null,e=G.updateQueue;if(e!==null&&(a=e.memoCache),a==null){var t=G.alternate;t!==null&&(t=t.updateQueue,t!==null&&(t=t.memoCache,t!=null&&(a={data:t.data.map(function(n){return n.slice()}),index:0})))}if(a==null&&(a={data:[],index:0}),e===null&&(e=el(),G.updateQueue=e),e.memoCache=a,e=a.data[a.index],e===void 0)for(e=a.data[a.index]=Array(s),t=0;t<s;t++)e[t]=qe;return a.index++,e}function Ua(s,a){return typeof a=="function"?a(s):a}function nl(s){var a=ws();return Fd(a,is,s)}function Fd(s,a,e){var t=s.queue;if(t===null)throw Error(_(311));t.lastRenderedReducer=e;var n=s.baseQueue,l=t.pending;if(l!==null){if(n!==null){var d=n.next;n.next=l.next,l.next=d}a.baseQueue=n=l,t.pending=null}if(l=s.baseState,n===null)s.memoizedState=l;else{a=n.next;var i=d=null,o=null,h=a,w=!1;do{var y=h.lane&-536870913;if(y!==h.lane?(F&y)===y:(ja&y)===y){var b=h.revertLane;if(b===0)o!==null&&(o=o.next={lane:0,revertLane:0,gesture:null,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),y===dt&&(w=!0);else if((ja&b)===b){h=h.next,b===dt&&(w=!0);continue}else y={lane:0,revertLane:h.revertLane,gesture:null,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null},o===null?(i=o=y,d=l):o=o.next=y,G.lanes|=b,re|=b;y=h.action,Ve&&e(l,y),l=h.hasEagerState?h.eagerState:e(l,y)}else b={lane:y,revertLane:h.revertLane,gesture:h.gesture,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null},o===null?(i=o=b,d=l):o=o.next=b,G.lanes|=y,re|=y;h=h.next}while(h!==null&&h!==a);if(o===null?d=l:o.next=i,!sa(l,s.memoizedState)&&(ys=!0,w&&(e=it,e!==null)))throw e;s.memoizedState=l,s.baseState=d,s.baseQueue=o,t.lastRenderedState=l}return n===null&&(t.lanes=0),[s.memoizedState,t.dispatch]}function Id(s){var a=ws(),e=a.queue;if(e===null)throw Error(_(311));e.lastRenderedReducer=s;var t=e.dispatch,n=e.pending,l=a.memoizedState;if(n!==null){e.pending=null;var d=n=n.next;do l=s(l,d.action),d=d.next;while(d!==n);sa(l,a.memoizedState)||(ys=!0),a.memoizedState=l,a.baseQueue===null&&(a.baseState=l),e.lastRenderedState=l}return[l,t]}function qc(s,a,e){var t=G,n=ws(),l=$;if(l){if(e===void 0)throw Error(_(407));e=e()}else e=a();var d=!sa((is||n).memoizedState,e);if(d&&(n.memoizedState=e,ys=!0),n=n.queue,Pd(Gc.bind(null,t,n,s),[s]),n.getSnapshot!==a||d||ks!==null&&ks.memoizedState.tag&1){if(t.flags|=2048,pt(9,{destroy:void 0},Yc.bind(null,t,n,e,a),null),us===null)throw Error(_(349));l||(ja&127)!==0||Zc(t,a,e)}return e}function Zc(s,a,e){s.flags|=16384,s={getSnapshot:a,value:e},a=G.updateQueue,a===null?(a=el(),G.updateQueue=a,a.stores=[s]):(e=a.stores,e===null?a.stores=[s]:e.push(s))}function Yc(s,a,e,t){a.value=e,a.getSnapshot=t,Xc(a)&&Qc(s)}function Gc(s,a,e){return e(function(){Xc(a)&&Qc(s)})}function Xc(s){var a=s.getSnapshot;s=s.value;try{var e=a();return!sa(s,e)}catch{return!0}}function Qc(s){var a=Le(s,2);a!==null&&Fs(a,s,2)}function Wd(s){var a=Vs();if(typeof s=="function"){var e=s;if(s=e(),Ve){Ia(!0);try{e()}finally{Ia(!1)}}}return a.memoizedState=a.baseState=s,a.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ua,lastRenderedState:s},a}function Kc(s,a,e,t){return s.baseState=e,Fd(s,is,typeof t=="function"?t:Ua)}function Kp(s,a,e,t,n){if(il(s))throw Error(_(485));if(s=a.action,s!==null){var l={payload:n,action:s,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(d){l.listeners.push(d)}};m.T!==null?e(!0):l.isTransition=!1,t(l),e=a.pending,e===null?(l.next=a.pending=l,Jc(a,l)):(l.next=e.next,a.pending=e.next=l)}}function Jc(s,a){var e=a.action,t=a.payload,n=s.state;if(a.isTransition){var l=m.T,d={};m.T=d;try{var i=e(n,t),o=m.S;o!==null&&o(d,i),Fc(s,a,i)}catch(h){$d(s,a,h)}finally{l!==null&&d.types!==null&&(l.types=d.types),m.T=l}}else try{l=e(n,t),Fc(s,a,l)}catch(h){$d(s,a,h)}}function Fc(s,a,e){e!==null&&typeof e=="object"&&typeof e.then=="function"?e.then(function(t){Ic(s,a,t)},function(t){return $d(s,a,t)}):Ic(s,a,e)}function Ic(s,a,e){a.status="fulfilled",a.value=e,Wc(a),s.state=e,a=s.pending,a!==null&&(e=a.next,e===a?s.pending=null:(e=e.next,a.next=e,Jc(s,e)))}function $d(s,a,e){var t=s.pending;if(s.pending=null,t!==null){t=t.next;do a.status="rejected",a.reason=e,Wc(a),a=a.next;while(a!==t)}s.action=null}function Wc(s){s=s.listeners;for(var a=0;a<s.length;a++)(0,s[a])()}function $c(s,a){return a}function Pc(s,a){if($){var e=us.formState;if(e!==null){s:{var t=G;if($){if(vs){a:{for(var n=vs,l=_a;n.nodeType!==8;){if(!l){n=null;break a}if(n=ha(n.nextSibling),n===null){n=null;break a}}l=n.data,n=l==="F!"||l==="F"?n:null}if(n){vs=ha(n.nextSibling),t=n.data==="F!";break s}}ae(t)}t=!1}t&&(a=e[0])}}return e=Vs(),e.memoizedState=e.baseState=a,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:$c,lastRenderedState:a},e.queue=t,e=gr.bind(null,G,t),t.dispatch=e,t=Wd(!1),l=ni.bind(null,G,!1,t.queue),t=Vs(),n={state:a,dispatch:null,action:s,pending:null},t.queue=n,e=Kp.bind(null,G,n,l,e),n.dispatch=e,t.memoizedState=s,[a,e,!1]}function sr(s){var a=ws();return ar(a,is,s)}function ar(s,a,e){if(a=Fd(s,a,$c)[0],s=nl(Ua)[0],typeof a=="object"&&a!==null&&typeof a.then=="function")try{var t=Wt(a)}catch(d){throw d===ot?Jn:d}else t=a;a=ws();var n=a.queue,l=n.dispatch;return e!==a.memoizedState&&(G.flags|=2048,pt(9,{destroy:void 0},Jp.bind(null,n,e),null)),[t,l,s]}function Jp(s,a){s.action=a}function er(s){var a=ws(),e=is;if(e!==null)return ar(a,e,s);ws(),a=a.memoizedState,e=ws();var t=e.queue.dispatch;return e.memoizedState=s,[a,t,!1]}function pt(s,a,e,t){return s={tag:s,create:e,deps:t,inst:a,next:null},a=G.updateQueue,a===null&&(a=el(),G.updateQueue=a),e=a.lastEffect,e===null?a.lastEffect=s.next=s:(t=e.next,e.next=s,s.next=t,a.lastEffect=s),s}function tr(){return ws().memoizedState}function ll(s,a,e,t){var n=Vs();G.flags|=s,n.memoizedState=pt(1|a,{destroy:void 0},e,t===void 0?null:t)}function dl(s,a,e,t){var n=ws();t=t===void 0?null:t;var l=n.memoizedState.inst;is!==null&&t!==null&&Yd(t,is.memoizedState.deps)?n.memoizedState=pt(a,l,e,t):(G.flags|=s,n.memoizedState=pt(1|a,l,e,t))}function nr(s,a){ll(8390656,8,s,a)}function Pd(s,a){dl(2048,8,s,a)}function Fp(s){G.flags|=4;var a=G.updateQueue;if(a===null)a=el(),G.updateQueue=a,a.events=[s];else{var e=a.events;e===null?a.events=[s]:e.push(s)}}function lr(s){var a=ws().memoizedState;return Fp({ref:a,nextImpl:s}),function(){if((es&2)!==0)throw Error(_(440));return a.impl.apply(void 0,arguments)}}function dr(s,a){return dl(4,2,s,a)}function ir(s,a){return dl(4,4,s,a)}function or(s,a){if(typeof a=="function"){s=s();var e=a(s);return function(){typeof e=="function"?e():a(null)}}if(a!=null)return s=s(),a.current=s,function(){a.current=null}}function cr(s,a,e){e=e!=null?e.concat([s]):null,dl(4,4,or.bind(null,a,s),e)}function si(){}function rr(s,a){var e=ws();a=a===void 0?null:a;var t=e.memoizedState;return a!==null&&Yd(a,t[1])?t[0]:(e.memoizedState=[s,a],s)}function ur(s,a){var e=ws();a=a===void 0?null:a;var t=e.memoizedState;if(a!==null&&Yd(a,t[1]))return t[0];if(t=s(),Ve){Ia(!0);try{s()}finally{Ia(!1)}}return e.memoizedState=[t,a],t}function ai(s,a,e){return e===void 0||(ja&1073741824)!==0&&(F&261930)===0?s.memoizedState=a:(s.memoizedState=e,s=vu(),G.lanes|=s,re|=s,e)}function vr(s,a,e,t){return sa(e,a)?e:rt.current!==null?(s=ai(s,e,t),sa(s,a)||(ys=!0),s):(ja&42)===0||(ja&1073741824)!==0&&(F&261930)===0?(ys=!0,s.memoizedState=e):(s=vu(),G.lanes|=s,re|=s,a)}function pr(s,a,e,t,n){var l=L.p;L.p=l!==0&&8>l?l:8;var d=m.T,i={};m.T=i,ni(s,!1,a,e);try{var o=n(),h=m.S;if(h!==null&&h(i,o),o!==null&&typeof o=="object"&&typeof o.then=="function"){var w=Gp(o,t);$t(s,a,w,da(s))}else $t(s,a,t,da(s))}catch(y){$t(s,a,{then:function(){},status:"rejected",reason:y},da())}finally{L.p=l,d!==null&&i.types!==null&&(d.types=i.types),m.T=d}}function Ip(){}function ei(s,a,e,t){if(s.tag!==5)throw Error(_(476));var n=_r(s).queue;pr(s,n,a,q,e===null?Ip:function(){return fr(s),e(t)})}function _r(s){var a=s.memoizedState;if(a!==null)return a;a={memoizedState:q,baseState:q,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ua,lastRenderedState:q},next:null};var e={};return a.next={memoizedState:e,baseState:e,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ua,lastRenderedState:e},next:null},s.memoizedState=a,s=s.alternate,s!==null&&(s.memoizedState=a),a}function fr(s){var a=_r(s);a.next===null&&(a=s.alternate.memoizedState),$t(s,a.next.queue,{},da())}function ti(){return Bs(hn)}function hr(){return ws().memoizedState}function br(){return ws().memoizedState}function Wp(s){for(var a=s.return;a!==null;){switch(a.tag){case 24:case 3:var e=da();s=ne(e);var t=le(a,s,e);t!==null&&(Fs(t,a,e),Kt(t,a,e)),a={cache:Ad()},s.payload=a;return}a=a.return}}function $p(s,a,e){var t=da();e={lane:t,revertLane:0,gesture:null,action:e,hasEagerState:!1,eagerState:null,next:null},il(s)?wr(a,e):(e=kd(s,a,e,t),e!==null&&(Fs(e,s,t),mr(e,a,t)))}function gr(s,a,e){var t=da();$t(s,a,e,t)}function $t(s,a,e,t){var n={lane:t,revertLane:0,gesture:null,action:e,hasEagerState:!1,eagerState:null,next:null};if(il(s))wr(a,n);else{var l=s.alternate;if(s.lanes===0&&(l===null||l.lanes===0)&&(l=a.lastRenderedReducer,l!==null))try{var d=a.lastRenderedState,i=l(d,e);if(n.hasEagerState=!0,n.eagerState=i,sa(i,d))return qn(s,a,n,0),us===null&&Rn(),!1}catch{}finally{}if(e=kd(s,a,n,t),e!==null)return Fs(e,s,t),mr(e,a,t),!0}return!1}function ni(s,a,e,t){if(t={lane:2,revertLane:Hi(),gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null},il(s)){if(a)throw Error(_(479))}else a=kd(s,e,t,2),a!==null&&Fs(a,s,2)}function il(s){var a=s.alternate;return s===G||a!==null&&a===G}function wr(s,a){ut=sl=!0;var e=s.pending;e===null?a.next=a:(a.next=e.next,e.next=a),s.pending=a}function mr(s,a,e){if((e&4194048)!==0){var t=a.lanes;t&=s.pendingLanes,e|=t,a.lanes=e,So(s,e)}}var Pt={readContext:Bs,use:tl,useCallback:fs,useContext:fs,useEffect:fs,useImperativeHandle:fs,useLayoutEffect:fs,useInsertionEffect:fs,useMemo:fs,useReducer:fs,useRef:fs,useState:fs,useDebugValue:fs,useDeferredValue:fs,useTransition:fs,useSyncExternalStore:fs,useId:fs,useHostTransitionStatus:fs,useFormState:fs,useActionState:fs,useOptimistic:fs,useMemoCache:fs,useCacheRefresh:fs};Pt.useEffectEvent=fs;var kr={readContext:Bs,use:tl,useCallback:function(s,a){return Vs().memoizedState=[s,a===void 0?null:a],s},useContext:Bs,useEffect:nr,useImperativeHandle:function(s,a,e){e=e!=null?e.concat([s]):null,ll(4194308,4,or.bind(null,a,s),e)},useLayoutEffect:function(s,a){return ll(4194308,4,s,a)},useInsertionEffect:function(s,a){ll(4,2,s,a)},useMemo:function(s,a){var e=Vs();a=a===void 0?null:a;var t=s();if(Ve){Ia(!0);try{s()}finally{Ia(!1)}}return e.memoizedState=[t,a],t},useReducer:function(s,a,e){var t=Vs();if(e!==void 0){var n=e(a);if(Ve){Ia(!0);try{e(a)}finally{Ia(!1)}}}else n=a;return t.memoizedState=t.baseState=n,s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:s,lastRenderedState:n},t.queue=s,s=s.dispatch=$p.bind(null,G,s),[t.memoizedState,s]},useRef:function(s){var a=Vs();return s={current:s},a.memoizedState=s},useState:function(s){s=Wd(s);var a=s.queue,e=gr.bind(null,G,a);return a.dispatch=e,[s.memoizedState,e]},useDebugValue:si,useDeferredValue:function(s,a){var e=Vs();return ai(e,s,a)},useTransition:function(){var s=Wd(!1);return s=pr.bind(null,G,s.queue,!0,!1),Vs().memoizedState=s,[!1,s]},useSyncExternalStore:function(s,a,e){var t=G,n=Vs();if($){if(e===void 0)throw Error(_(407));e=e()}else{if(e=a(),us===null)throw Error(_(349));(F&127)!==0||Zc(t,a,e)}n.memoizedState=e;var l={value:e,getSnapshot:a};return n.queue=l,nr(Gc.bind(null,t,l,s),[s]),t.flags|=2048,pt(9,{destroy:void 0},Yc.bind(null,t,l,e,a),null),e},useId:function(){var s=Vs(),a=us.identifierPrefix;if($){var e=Ma,t=Sa;e=(t&~(1<<32-Ps(t)-1)).toString(32)+e,a="_"+a+"R_"+e,e=al++,0<e&&(a+="H"+e.toString(32)),a+="_"}else e=Xp++,a="_"+a+"r_"+e.toString(32)+"_";return s.memoizedState=a},useHostTransitionStatus:ti,useFormState:Pc,useActionState:Pc,useOptimistic:function(s){var a=Vs();a.memoizedState=a.baseState=s;var e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return a.queue=e,a=ni.bind(null,G,!0,e),e.dispatch=a,[s,a]},useMemoCache:Jd,useCacheRefresh:function(){return Vs().memoizedState=Wp.bind(null,G)},useEffectEvent:function(s){var a=Vs(),e={impl:s};return a.memoizedState=e,function(){if((es&2)!==0)throw Error(_(440));return e.impl.apply(void 0,arguments)}}},li={readContext:Bs,use:tl,useCallback:rr,useContext:Bs,useEffect:Pd,useImperativeHandle:cr,useInsertionEffect:dr,useLayoutEffect:ir,useMemo:ur,useReducer:nl,useRef:tr,useState:function(){return nl(Ua)},useDebugValue:si,useDeferredValue:function(s,a){var e=ws();return vr(e,is.memoizedState,s,a)},useTransition:function(){var s=nl(Ua)[0],a=ws().memoizedState;return[typeof s=="boolean"?s:Wt(s),a]},useSyncExternalStore:qc,useId:hr,useHostTransitionStatus:ti,useFormState:sr,useActionState:sr,useOptimistic:function(s,a){var e=ws();return Kc(e,is,s,a)},useMemoCache:Jd,useCacheRefresh:br};li.useEffectEvent=lr;var yr={readContext:Bs,use:tl,useCallback:rr,useContext:Bs,useEffect:Pd,useImperativeHandle:cr,useInsertionEffect:dr,useLayoutEffect:ir,useMemo:ur,useReducer:Id,useRef:tr,useState:function(){return Id(Ua)},useDebugValue:si,useDeferredValue:function(s,a){var e=ws();return is===null?ai(e,s,a):vr(e,is.memoizedState,s,a)},useTransition:function(){var s=Id(Ua)[0],a=ws().memoizedState;return[typeof s=="boolean"?s:Wt(s),a]},useSyncExternalStore:qc,useId:hr,useHostTransitionStatus:ti,useFormState:er,useActionState:er,useOptimistic:function(s,a){var e=ws();return is!==null?Kc(e,is,s,a):(e.baseState=s,[s,e.queue.dispatch])},useMemoCache:Jd,useCacheRefresh:br};yr.useEffectEvent=lr;function di(s,a,e,t){a=s.memoizedState,e=e(t,a),e=e==null?a:O({},a,e),s.memoizedState=e,s.lanes===0&&(s.updateQueue.baseState=e)}var ii={enqueueSetState:function(s,a,e){s=s._reactInternals;var t=da(),n=ne(t);n.payload=a,e!=null&&(n.callback=e),a=le(s,n,t),a!==null&&(Fs(a,s,t),Kt(a,s,t))},enqueueReplaceState:function(s,a,e){s=s._reactInternals;var t=da(),n=ne(t);n.tag=1,n.payload=a,e!=null&&(n.callback=e),a=le(s,n,t),a!==null&&(Fs(a,s,t),Kt(a,s,t))},enqueueForceUpdate:function(s,a){s=s._reactInternals;var e=da(),t=ne(e);t.tag=2,a!=null&&(t.callback=a),a=le(s,t,e),a!==null&&(Fs(a,s,e),Kt(a,s,e))}};function xr(s,a,e,t,n,l,d){return s=s.stateNode,typeof s.shouldComponentUpdate=="function"?s.shouldComponentUpdate(t,l,d):a.prototype&&a.prototype.isPureReactComponent?!Ut(e,t)||!Ut(n,l):!0}function Cr(s,a,e,t){s=a.state,typeof a.componentWillReceiveProps=="function"&&a.componentWillReceiveProps(e,t),typeof a.UNSAFE_componentWillReceiveProps=="function"&&a.UNSAFE_componentWillReceiveProps(e,t),a.state!==s&&ii.enqueueReplaceState(a,a.state,null)}function je(s,a){var e=a;if("ref"in a){e={};for(var t in a)t!=="ref"&&(e[t]=a[t])}if(s=s.defaultProps){e===a&&(e=O({},e));for(var n in s)e[n]===void 0&&(e[n]=s[n])}return e}function Sr(s){Un(s)}function Mr(s){console.error(s)}function Dr(s){Un(s)}function ol(s,a){try{var e=s.onUncaughtError;e(a.value,{componentStack:a.stack})}catch(t){setTimeout(function(){throw t})}}function Lr(s,a,e){try{var t=s.onCaughtError;t(e.value,{componentStack:e.stack,errorBoundary:a.tag===1?a.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function oi(s,a,e){return e=ne(e),e.tag=3,e.payload={element:null},e.callback=function(){ol(s,a)},e}function Br(s){return s=ne(s),s.tag=3,s}function Er(s,a,e,t){var n=e.type.getDerivedStateFromError;if(typeof n=="function"){var l=t.value;s.payload=function(){return n(l)},s.callback=function(){Lr(a,e,t)}}var d=e.stateNode;d!==null&&typeof d.componentDidCatch=="function"&&(s.callback=function(){Lr(a,e,t),typeof n!="function"&&(ue===null?ue=new Set([this]):ue.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})})}function Pp(s,a,e,t,n){if(e.flags|=32768,t!==null&&typeof t=="object"&&typeof t.then=="function"){if(a=e.alternate,a!==null&&lt(a,e,n,!0),e=ea.current,e!==null){switch(e.tag){case 31:case 13:return fa===null?ml():e.alternate===null&&hs===0&&(hs=3),e.flags&=-257,e.flags|=65536,e.lanes=n,t===Fn?e.flags|=16384:(a=e.updateQueue,a===null?e.updateQueue=new Set([t]):a.add(t),zi(s,t,n)),!1;case 22:return e.flags|=65536,t===Fn?e.flags|=16384:(a=e.updateQueue,a===null?(a={transitions:null,markerInstances:null,retryQueue:new Set([t])},e.updateQueue=a):(e=a.retryQueue,e===null?a.retryQueue=new Set([t]):e.add(t)),zi(s,t,n)),!1}throw Error(_(435,e.tag))}return zi(s,t,n),ml(),!1}if($)return a=ea.current,a!==null?((a.flags&65536)===0&&(a.flags|=256),a.flags|=65536,a.lanes=n,t!==Dd&&(s=Error(_(422),{cause:t}),Zt(ua(s,e)))):(t!==Dd&&(a=Error(_(423),{cause:t}),Zt(ua(a,e))),s=s.current.alternate,s.flags|=65536,n&=-n,s.lanes|=n,t=ua(t,e),n=oi(s.stateNode,t,n),jd(s,n),hs!==4&&(hs=2)),!1;var l=Error(_(520),{cause:t});if(l=ua(l,e),on===null?on=[l]:on.push(l),hs!==4&&(hs=2),a===null)return!0;t=ua(t,e),e=a;do{switch(e.tag){case 3:return e.flags|=65536,s=n&-n,e.lanes|=s,s=oi(e.stateNode,t,s),jd(e,s),!1;case 1:if(a=e.type,l=e.stateNode,(e.flags&128)===0&&(typeof a.getDerivedStateFromError=="function"||l!==null&&typeof l.componentDidCatch=="function"&&(ue===null||!ue.has(l))))return e.flags|=65536,n&=-n,e.lanes|=n,n=Br(n),Er(n,s,e,t),jd(e,n),!1}e=e.return}while(e!==null);return!1}var ci=Error(_(461)),ys=!1;function Es(s,a,e,t){a.child=s===null?Nc(a,null,e,t):He(a,s.child,e,t)}function Tr(s,a,e,t,n){e=e.render;var l=a.ref;if("ref"in t){var d={};for(var i in t)i!=="ref"&&(d[i]=t[i])}else d=t;return Ae(a),t=Gd(s,a,e,d,l,n),i=Xd(),s!==null&&!ys?(Qd(s,a,n),Ra(s,a,n)):($&&i&&Sd(a),a.flags|=1,Es(s,a,t,n),a.child)}function Ar(s,a,e,t,n){if(s===null){var l=e.type;return typeof l=="function"&&!yd(l)&&l.defaultProps===void 0&&e.compare===null?(a.tag=15,a.type=l,zr(s,a,l,t,n)):(s=Yn(e.type,null,t,a,a.mode,n),s.ref=a.ref,s.return=a,a.child=s)}if(l=s.child,!bi(s,n)){var d=l.memoizedProps;if(e=e.compare,e=e!==null?e:Ut,e(d,t)&&s.ref===a.ref)return Ra(s,a,n)}return a.flags|=1,s=Na(l,t),s.ref=a.ref,s.return=a,a.child=s}function zr(s,a,e,t,n){if(s!==null){var l=s.memoizedProps;if(Ut(l,t)&&s.ref===a.ref)if(ys=!1,a.pendingProps=t=l,bi(s,n))(s.flags&131072)!==0&&(ys=!0);else return a.lanes=s.lanes,Ra(s,a,n)}return ri(s,a,e,t,n)}function Nr(s,a,e,t){var n=t.children,l=s!==null?s.memoizedState:null;if(s===null&&a.stateNode===null&&(a.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.mode==="hidden"){if((a.flags&128)!==0){if(l=l!==null?l.baseLanes|e:e,s!==null){for(t=a.child=s.child,n=0;t!==null;)n=n|t.lanes|t.childLanes,t=t.sibling;t=n&~l}else t=0,a.child=null;return Or(s,a,l,e,t)}if((e&536870912)!==0)a.memoizedState={baseLanes:0,cachePool:null},s!==null&&Kn(a,l!==null?l.cachePool:null),l!==null?Vc(a,l):Rd(),jc(a);else return t=a.lanes=536870912,Or(s,a,l!==null?l.baseLanes|e:e,e,t)}else l!==null?(Kn(a,l.cachePool),Vc(a,l),ie(),a.memoizedState=null):(s!==null&&Kn(a,null),Rd(),ie());return Es(s,a,n,e),a.child}function sn(s,a){return s!==null&&s.tag===22||a.stateNode!==null||(a.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.sibling}function Or(s,a,e,t,n){var l=Nd();return l=l===null?null:{parent:ms._currentValue,pool:l},a.memoizedState={baseLanes:e,cachePool:l},s!==null&&Kn(a,null),Rd(),jc(a),s!==null&&lt(s,a,t,!0),a.childLanes=n,null}function cl(s,a){return a=ul({mode:a.mode,children:a.children},s.mode),a.ref=s.ref,s.child=a,a.return=s,a}function Hr(s,a,e){return He(a,s.child,null,e),s=cl(a,a.pendingProps),s.flags|=2,ta(a),a.memoizedState=null,s}function s_(s,a,e){var t=a.pendingProps,n=(a.flags&128)!==0;if(a.flags&=-129,s===null){if($){if(t.mode==="hidden")return s=cl(a,t),a.lanes=536870912,sn(null,s);if(Zd(a),(s=vs)?(s=Ju(s,_a),s=s!==null&&s.data==="&"?s:null,s!==null&&(a.memoizedState={dehydrated:s,treeContext:Pa!==null?{id:Sa,overflow:Ma}:null,retryLane:536870912,hydrationErrors:null},e=wc(s),e.return=a,a.child=e,Ls=a,vs=null)):s=null,s===null)throw ae(a);return a.lanes=536870912,null}return cl(a,t)}var l=s.memoizedState;if(l!==null){var d=l.dehydrated;if(Zd(a),n)if(a.flags&256)a.flags&=-257,a=Hr(s,a,e);else if(a.memoizedState!==null)a.child=s.child,a.flags|=128,a=null;else throw Error(_(558));else if(ys||lt(s,a,e,!1),n=(e&s.childLanes)!==0,ys||n){if(t=us,t!==null&&(d=Mo(t,e),d!==0&&d!==l.retryLane))throw l.retryLane=d,Le(s,d),Fs(t,s,d),ci;ml(),a=Hr(s,a,e)}else s=l.treeContext,vs=ha(d.nextSibling),Ls=a,$=!0,se=null,_a=!1,s!==null&&yc(a,s),a=cl(a,t),a.flags|=4096;return a}return s=Na(s.child,{mode:t.mode,children:t.children}),s.ref=a.ref,a.child=s,s.return=a,s}function rl(s,a){var e=a.ref;if(e===null)s!==null&&s.ref!==null&&(a.flags|=4194816);else{if(typeof e!="function"&&typeof e!="object")throw Error(_(284));(s===null||s.ref!==e)&&(a.flags|=4194816)}}function ri(s,a,e,t,n){return Ae(a),e=Gd(s,a,e,t,void 0,n),t=Xd(),s!==null&&!ys?(Qd(s,a,n),Ra(s,a,n)):($&&t&&Sd(a),a.flags|=1,Es(s,a,e,n),a.child)}function Vr(s,a,e,t,n,l){return Ae(a),a.updateQueue=null,e=Rc(a,t,e,n),Uc(s),t=Xd(),s!==null&&!ys?(Qd(s,a,l),Ra(s,a,l)):($&&t&&Sd(a),a.flags|=1,Es(s,a,e,l),a.child)}function jr(s,a,e,t,n){if(Ae(a),a.stateNode===null){var l=at,d=e.contextType;typeof d=="object"&&d!==null&&(l=Bs(d)),l=new e(t,l),a.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,l.updater=ii,a.stateNode=l,l._reactInternals=a,l=a.stateNode,l.props=t,l.state=a.memoizedState,l.refs={},Hd(a),d=e.contextType,l.context=typeof d=="object"&&d!==null?Bs(d):at,l.state=a.memoizedState,d=e.getDerivedStateFromProps,typeof d=="function"&&(di(a,e,d,t),l.state=a.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(d=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),d!==l.state&&ii.enqueueReplaceState(l,l.state,null),Ft(a,t,l,n),Jt(),l.state=a.memoizedState),typeof l.componentDidMount=="function"&&(a.flags|=4194308),t=!0}else if(s===null){l=a.stateNode;var i=a.memoizedProps,o=je(e,i);l.props=o;var h=l.context,w=e.contextType;d=at,typeof w=="object"&&w!==null&&(d=Bs(w));var y=e.getDerivedStateFromProps;w=typeof y=="function"||typeof l.getSnapshotBeforeUpdate=="function",i=a.pendingProps!==i,w||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i||h!==d)&&Cr(a,l,t,d),te=!1;var b=a.memoizedState;l.state=b,Ft(a,t,l,n),Jt(),h=a.memoizedState,i||b!==h||te?(typeof y=="function"&&(di(a,e,y,t),h=a.memoizedState),(o=te||xr(a,e,o,t,b,h,d))?(w||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(a.flags|=4194308)):(typeof l.componentDidMount=="function"&&(a.flags|=4194308),a.memoizedProps=t,a.memoizedState=h),l.props=t,l.state=h,l.context=d,t=o):(typeof l.componentDidMount=="function"&&(a.flags|=4194308),t=!1)}else{l=a.stateNode,Vd(s,a),d=a.memoizedProps,w=je(e,d),l.props=w,y=a.pendingProps,b=l.context,h=e.contextType,o=at,typeof h=="object"&&h!==null&&(o=Bs(h)),i=e.getDerivedStateFromProps,(h=typeof i=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(d!==y||b!==o)&&Cr(a,l,t,o),te=!1,b=a.memoizedState,l.state=b,Ft(a,t,l,n),Jt();var g=a.memoizedState;d!==y||b!==g||te||s!==null&&s.dependencies!==null&&Xn(s.dependencies)?(typeof i=="function"&&(di(a,e,i,t),g=a.memoizedState),(w=te||xr(a,e,w,t,b,g,o)||s!==null&&s.dependencies!==null&&Xn(s.dependencies))?(h||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(t,g,o),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(t,g,o)),typeof l.componentDidUpdate=="function"&&(a.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(a.flags|=1024)):(typeof l.componentDidUpdate!="function"||d===s.memoizedProps&&b===s.memoizedState||(a.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||d===s.memoizedProps&&b===s.memoizedState||(a.flags|=1024),a.memoizedProps=t,a.memoizedState=g),l.props=t,l.state=g,l.context=o,t=w):(typeof l.componentDidUpdate!="function"||d===s.memoizedProps&&b===s.memoizedState||(a.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||d===s.memoizedProps&&b===s.memoizedState||(a.flags|=1024),t=!1)}return l=t,rl(s,a),t=(a.flags&128)!==0,l||t?(l=a.stateNode,e=t&&typeof e.getDerivedStateFromError!="function"?null:l.render(),a.flags|=1,s!==null&&t?(a.child=He(a,s.child,null,n),a.child=He(a,null,e,n)):Es(s,a,e,n),a.memoizedState=l.state,s=a.child):s=Ra(s,a,n),s}function Ur(s,a,e,t){return Ee(),a.flags|=256,Es(s,a,e,t),a.child}var ui={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function vi(s){return{baseLanes:s,cachePool:Lc()}}function pi(s,a,e){return s=s!==null?s.childLanes&~e:0,a&&(s|=la),s}function Rr(s,a,e){var t=a.pendingProps,n=!1,l=(a.flags&128)!==0,d;if((d=l)||(d=s!==null&&s.memoizedState===null?!1:(gs.current&2)!==0),d&&(n=!0,a.flags&=-129),d=(a.flags&32)!==0,a.flags&=-33,s===null){if($){if(n?de(a):ie(),(s=vs)?(s=Ju(s,_a),s=s!==null&&s.data!=="&"?s:null,s!==null&&(a.memoizedState={dehydrated:s,treeContext:Pa!==null?{id:Sa,overflow:Ma}:null,retryLane:536870912,hydrationErrors:null},e=wc(s),e.return=a,a.child=e,Ls=a,vs=null)):s=null,s===null)throw ae(a);return Fi(s)?a.lanes=32:a.lanes=536870912,null}var i=t.children;return t=t.fallback,n?(ie(),n=a.mode,i=ul({mode:"hidden",children:i},n),t=Be(t,n,e,null),i.return=a,t.return=a,i.sibling=t,a.child=i,t=a.child,t.memoizedState=vi(e),t.childLanes=pi(s,d,e),a.memoizedState=ui,sn(null,t)):(de(a),_i(a,i))}var o=s.memoizedState;if(o!==null&&(i=o.dehydrated,i!==null)){if(l)a.flags&256?(de(a),a.flags&=-257,a=fi(s,a,e)):a.memoizedState!==null?(ie(),a.child=s.child,a.flags|=128,a=null):(ie(),i=t.fallback,n=a.mode,t=ul({mode:"visible",children:t.children},n),i=Be(i,n,e,null),i.flags|=2,t.return=a,i.return=a,t.sibling=i,a.child=t,He(a,s.child,null,e),t=a.child,t.memoizedState=vi(e),t.childLanes=pi(s,d,e),a.memoizedState=ui,a=sn(null,t));else if(de(a),Fi(i)){if(d=i.nextSibling&&i.nextSibling.dataset,d)var h=d.dgst;d=h,t=Error(_(419)),t.stack="",t.digest=d,Zt({value:t,source:null,stack:null}),a=fi(s,a,e)}else if(ys||lt(s,a,e,!1),d=(e&s.childLanes)!==0,ys||d){if(d=us,d!==null&&(t=Mo(d,e),t!==0&&t!==o.retryLane))throw o.retryLane=t,Le(s,t),Fs(d,s,t),ci;Ji(i)||ml(),a=fi(s,a,e)}else Ji(i)?(a.flags|=192,a.child=s.child,a=null):(s=o.treeContext,vs=ha(i.nextSibling),Ls=a,$=!0,se=null,_a=!1,s!==null&&yc(a,s),a=_i(a,t.children),a.flags|=4096);return a}return n?(ie(),i=t.fallback,n=a.mode,o=s.child,h=o.sibling,t=Na(o,{mode:"hidden",children:t.children}),t.subtreeFlags=o.subtreeFlags&65011712,h!==null?i=Na(h,i):(i=Be(i,n,e,null),i.flags|=2),i.return=a,t.return=a,t.sibling=i,a.child=t,sn(null,t),t=a.child,i=s.child.memoizedState,i===null?i=vi(e):(n=i.cachePool,n!==null?(o=ms._currentValue,n=n.parent!==o?{parent:o,pool:o}:n):n=Lc(),i={baseLanes:i.baseLanes|e,cachePool:n}),t.memoizedState=i,t.childLanes=pi(s,d,e),a.memoizedState=ui,sn(s.child,t)):(de(a),e=s.child,s=e.sibling,e=Na(e,{mode:"visible",children:t.children}),e.return=a,e.sibling=null,s!==null&&(d=a.deletions,d===null?(a.deletions=[s],a.flags|=16):d.push(s)),a.child=e,a.memoizedState=null,e)}function _i(s,a){return a=ul({mode:"visible",children:a},s.mode),a.return=s,s.child=a}function ul(s,a){return s=aa(22,s,null,a),s.lanes=0,s}function fi(s,a,e){return He(a,s.child,null,e),s=_i(a,a.pendingProps.children),s.flags|=2,a.memoizedState=null,s}function qr(s,a,e){s.lanes|=a;var t=s.alternate;t!==null&&(t.lanes|=a),Ed(s.return,a,e)}function hi(s,a,e,t,n,l){var d=s.memoizedState;d===null?s.memoizedState={isBackwards:a,rendering:null,renderingStartTime:0,last:t,tail:e,tailMode:n,treeForkCount:l}:(d.isBackwards=a,d.rendering=null,d.renderingStartTime=0,d.last=t,d.tail=e,d.tailMode=n,d.treeForkCount=l)}function Zr(s,a,e){var t=a.pendingProps,n=t.revealOrder,l=t.tail;t=t.children;var d=gs.current,i=(d&2)!==0;if(i?(d=d&1|2,a.flags|=128):d&=1,B(gs,d),Es(s,a,t,e),t=$?qt:0,!i&&s!==null&&(s.flags&128)!==0)s:for(s=a.child;s!==null;){if(s.tag===13)s.memoizedState!==null&&qr(s,e,a);else if(s.tag===19)qr(s,e,a);else if(s.child!==null){s.child.return=s,s=s.child;continue}if(s===a)break s;for(;s.sibling===null;){if(s.return===null||s.return===a)break s;s=s.return}s.sibling.return=s.return,s=s.sibling}switch(n){case"forwards":for(e=a.child,n=null;e!==null;)s=e.alternate,s!==null&&Pn(s)===null&&(n=e),e=e.sibling;e=n,e===null?(n=a.child,a.child=null):(n=e.sibling,e.sibling=null),hi(a,!1,n,e,l,t);break;case"backwards":case"unstable_legacy-backwards":for(e=null,n=a.child,a.child=null;n!==null;){if(s=n.alternate,s!==null&&Pn(s)===null){a.child=n;break}s=n.sibling,n.sibling=e,e=n,n=s}hi(a,!0,e,null,l,t);break;case"together":hi(a,!1,null,null,void 0,t);break;default:a.memoizedState=null}return a.child}function Ra(s,a,e){if(s!==null&&(a.dependencies=s.dependencies),re|=a.lanes,(e&a.childLanes)===0)if(s!==null){if(lt(s,a,e,!1),(e&a.childLanes)===0)return null}else return null;if(s!==null&&a.child!==s.child)throw Error(_(153));if(a.child!==null){for(s=a.child,e=Na(s,s.pendingProps),a.child=e,e.return=a;s.sibling!==null;)s=s.sibling,e=e.sibling=Na(s,s.pendingProps),e.return=a;e.sibling=null}return a.child}function bi(s,a){return(s.lanes&a)!==0?!0:(s=s.dependencies,!!(s!==null&&Xn(s)))}function a_(s,a,e){switch(a.tag){case 3:Hs(a,a.stateNode.containerInfo),ee(a,ms,s.memoizedState.cache),Ee();break;case 27:case 5:Mt(a);break;case 4:Hs(a,a.stateNode.containerInfo);break;case 10:ee(a,a.type,a.memoizedProps.value);break;case 31:if(a.memoizedState!==null)return a.flags|=128,Zd(a),null;break;case 13:var t=a.memoizedState;if(t!==null)return t.dehydrated!==null?(de(a),a.flags|=128,null):(e&a.child.childLanes)!==0?Rr(s,a,e):(de(a),s=Ra(s,a,e),s!==null?s.sibling:null);de(a);break;case 19:var n=(s.flags&128)!==0;if(t=(e&a.childLanes)!==0,t||(lt(s,a,e,!1),t=(e&a.childLanes)!==0),n){if(t)return Zr(s,a,e);a.flags|=128}if(n=a.memoizedState,n!==null&&(n.rendering=null,n.tail=null,n.lastEffect=null),B(gs,gs.current),t)break;return null;case 22:return a.lanes=0,Nr(s,a,e,a.pendingProps);case 24:ee(a,ms,s.memoizedState.cache)}return Ra(s,a,e)}function Yr(s,a,e){if(s!==null)if(s.memoizedProps!==a.pendingProps)ys=!0;else{if(!bi(s,e)&&(a.flags&128)===0)return ys=!1,a_(s,a,e);ys=(s.flags&131072)!==0}else ys=!1,$&&(a.flags&1048576)!==0&&kc(a,qt,a.index);switch(a.lanes=0,a.tag){case 16:s:{var t=a.pendingProps;if(s=Ne(a.elementType),a.type=s,typeof s=="function")yd(s)?(t=je(s,t),a.tag=1,a=jr(null,a,s,t,e)):(a.tag=0,a=ri(null,a,s,t,e));else{if(s!=null){var n=s.$$typeof;if(n===ia){a.tag=11,a=Tr(null,a,s,t,e);break s}else if(n===W){a.tag=14,a=Ar(null,a,s,t,e);break s}}throw a=Ea(s)||s,Error(_(306,a,""))}}return a;case 0:return ri(s,a,a.type,a.pendingProps,e);case 1:return t=a.type,n=je(t,a.pendingProps),jr(s,a,t,n,e);case 3:s:{if(Hs(a,a.stateNode.containerInfo),s===null)throw Error(_(387));t=a.pendingProps;var l=a.memoizedState;n=l.element,Vd(s,a),Ft(a,t,null,e);var d=a.memoizedState;if(t=d.cache,ee(a,ms,t),t!==l.cache&&Td(a,[ms],e,!0),Jt(),t=d.element,l.isDehydrated)if(l={element:t,isDehydrated:!1,cache:d.cache},a.updateQueue.baseState=l,a.memoizedState=l,a.flags&256){a=Ur(s,a,t,e);break s}else if(t!==n){n=ua(Error(_(424)),a),Zt(n),a=Ur(s,a,t,e);break s}else{switch(s=a.stateNode.containerInfo,s.nodeType){case 9:s=s.body;break;default:s=s.nodeName==="HTML"?s.ownerDocument.body:s}for(vs=ha(s.firstChild),Ls=a,$=!0,se=null,_a=!0,e=Nc(a,null,t,e),a.child=e;e;)e.flags=e.flags&-3|4096,e=e.sibling}else{if(Ee(),t===n){a=Ra(s,a,e);break s}Es(s,a,t,e)}a=a.child}return a;case 26:return rl(s,a),s===null?(e=sv(a.type,null,a.pendingProps,null))?a.memoizedState=e:$||(e=a.type,s=a.pendingProps,t=Dl(Q.current).createElement(e),t[Ds]=a,t[Ys]=s,Ts(t,e,s),Ss(t),a.stateNode=t):a.memoizedState=sv(a.type,s.memoizedProps,a.pendingProps,s.memoizedState),null;case 27:return Mt(a),s===null&&$&&(t=a.stateNode=Wu(a.type,a.pendingProps,Q.current),Ls=a,_a=!0,n=vs,fe(a.type)?(Ii=n,vs=ha(t.firstChild)):vs=n),Es(s,a,a.pendingProps.children,e),rl(s,a),s===null&&(a.flags|=4194304),a.child;case 5:return s===null&&$&&((n=t=vs)&&(t=T_(t,a.type,a.pendingProps,_a),t!==null?(a.stateNode=t,Ls=a,vs=ha(t.firstChild),_a=!1,n=!0):n=!1),n||ae(a)),Mt(a),n=a.type,l=a.pendingProps,d=s!==null?s.memoizedProps:null,t=l.children,Xi(n,l)?t=null:d!==null&&Xi(n,d)&&(a.flags|=32),a.memoizedState!==null&&(n=Gd(s,a,Qp,null,null,e),hn._currentValue=n),rl(s,a),Es(s,a,t,e),a.child;case 6:return s===null&&$&&((s=e=vs)&&(e=A_(e,a.pendingProps,_a),e!==null?(a.stateNode=e,Ls=a,vs=null,s=!0):s=!1),s||ae(a)),null;case 13:return Rr(s,a,e);case 4:return Hs(a,a.stateNode.containerInfo),t=a.pendingProps,s===null?a.child=He(a,null,t,e):Es(s,a,t,e),a.child;case 11:return Tr(s,a,a.type,a.pendingProps,e);case 7:return Es(s,a,a.pendingProps,e),a.child;case 8:return Es(s,a,a.pendingProps.children,e),a.child;case 12:return Es(s,a,a.pendingProps.children,e),a.child;case 10:return t=a.pendingProps,ee(a,a.type,t.value),Es(s,a,t.children,e),a.child;case 9:return n=a.type._context,t=a.pendingProps.children,Ae(a),n=Bs(n),t=t(n),a.flags|=1,Es(s,a,t,e),a.child;case 14:return Ar(s,a,a.type,a.pendingProps,e);case 15:return zr(s,a,a.type,a.pendingProps,e);case 19:return Zr(s,a,e);case 31:return s_(s,a,e);case 22:return Nr(s,a,e,a.pendingProps);case 24:return Ae(a),t=Bs(ms),s===null?(n=Nd(),n===null&&(n=us,l=Ad(),n.pooledCache=l,l.refCount++,l!==null&&(n.pooledCacheLanes|=e),n=l),a.memoizedState={parent:t,cache:n},Hd(a),ee(a,ms,n)):((s.lanes&e)!==0&&(Vd(s,a),Ft(a,null,null,e),Jt()),n=s.memoizedState,l=a.memoizedState,n.parent!==t?(n={parent:t,cache:t},a.memoizedState=n,a.lanes===0&&(a.memoizedState=a.updateQueue.baseState=n),ee(a,ms,t)):(t=l.cache,ee(a,ms,t),t!==n.cache&&Td(a,[ms],e,!0))),Es(s,a,a.pendingProps.children,e),a.child;case 29:throw a.pendingProps}throw Error(_(156,a.tag))}function qa(s){s.flags|=4}function gi(s,a,e,t,n){if((a=(s.mode&32)!==0)&&(a=!1),a){if(s.flags|=16777216,(n&335544128)===n)if(s.stateNode.complete)s.flags|=8192;else if(hu())s.flags|=8192;else throw Oe=Fn,Od}else s.flags&=-16777217}function Gr(s,a){if(a.type!=="stylesheet"||(a.state.loading&4)!==0)s.flags&=-16777217;else if(s.flags|=16777216,!lv(a))if(hu())s.flags|=8192;else throw Oe=Fn,Od}function vl(s,a){a!==null&&(s.flags|=4),s.flags&16384&&(a=s.tag!==22?xo():536870912,s.lanes|=a,bt|=a)}function an(s,a){if(!$)switch(s.tailMode){case"hidden":a=s.tail;for(var e=null;a!==null;)a.alternate!==null&&(e=a),a=a.sibling;e===null?s.tail=null:e.sibling=null;break;case"collapsed":e=s.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?a||s.tail===null?s.tail=null:s.tail.sibling=null:t.sibling=null}}function ps(s){var a=s.alternate!==null&&s.alternate.child===s.child,e=0,t=0;if(a)for(var n=s.child;n!==null;)e|=n.lanes|n.childLanes,t|=n.subtreeFlags&65011712,t|=n.flags&65011712,n.return=s,n=n.sibling;else for(n=s.child;n!==null;)e|=n.lanes|n.childLanes,t|=n.subtreeFlags,t|=n.flags,n.return=s,n=n.sibling;return s.subtreeFlags|=t,s.childLanes=e,a}function e_(s,a,e){var t=a.pendingProps;switch(Md(a),a.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ps(a),null;case 1:return ps(a),null;case 3:return e=a.stateNode,t=null,s!==null&&(t=s.memoizedState.cache),a.memoizedState.cache!==t&&(a.flags|=2048),Va(ms),bs(),e.pendingContext&&(e.context=e.pendingContext,e.pendingContext=null),(s===null||s.child===null)&&(nt(a)?qa(a):s===null||s.memoizedState.isDehydrated&&(a.flags&256)===0||(a.flags|=1024,Ld())),ps(a),null;case 26:var n=a.type,l=a.memoizedState;return s===null?(qa(a),l!==null?(ps(a),Gr(a,l)):(ps(a),gi(a,n,null,t,e))):l?l!==s.memoizedState?(qa(a),ps(a),Gr(a,l)):(ps(a),a.flags&=-16777217):(s=s.memoizedProps,s!==t&&qa(a),ps(a),gi(a,n,s,t,e)),null;case 27:if(xn(a),e=Q.current,n=a.type,s!==null&&a.stateNode!=null)s.memoizedProps!==t&&qa(a);else{if(!t){if(a.stateNode===null)throw Error(_(166));return ps(a),null}s=A.current,nt(a)?xc(a):(s=Wu(n,t,e),a.stateNode=s,qa(a))}return ps(a),null;case 5:if(xn(a),n=a.type,s!==null&&a.stateNode!=null)s.memoizedProps!==t&&qa(a);else{if(!t){if(a.stateNode===null)throw Error(_(166));return ps(a),null}if(l=A.current,nt(a))xc(a);else{var d=Dl(Q.current);switch(l){case 1:l=d.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:l=d.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":l=d.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":l=d.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":l=d.createElement("div"),l.innerHTML="<script><\/script>",l=l.removeChild(l.firstChild);break;case"select":l=typeof t.is=="string"?d.createElement("select",{is:t.is}):d.createElement("select"),t.multiple?l.multiple=!0:t.size&&(l.size=t.size);break;default:l=typeof t.is=="string"?d.createElement(n,{is:t.is}):d.createElement(n)}}l[Ds]=a,l[Ys]=t;s:for(d=a.child;d!==null;){if(d.tag===5||d.tag===6)l.appendChild(d.stateNode);else if(d.tag!==4&&d.tag!==27&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===a)break s;for(;d.sibling===null;){if(d.return===null||d.return===a)break s;d=d.return}d.sibling.return=d.return,d=d.sibling}a.stateNode=l;s:switch(Ts(l,n,t),n){case"button":case"input":case"select":case"textarea":t=!!t.autoFocus;break s;case"img":t=!0;break s;default:t=!1}t&&qa(a)}}return ps(a),gi(a,a.type,s===null?null:s.memoizedProps,a.pendingProps,e),null;case 6:if(s&&a.stateNode!=null)s.memoizedProps!==t&&qa(a);else{if(typeof t!="string"&&a.stateNode===null)throw Error(_(166));if(s=Q.current,nt(a)){if(s=a.stateNode,e=a.memoizedProps,t=null,n=Ls,n!==null)switch(n.tag){case 27:case 5:t=n.memoizedProps}s[Ds]=a,s=!!(s.nodeValue===e||t!==null&&t.suppressHydrationWarning===!0||Ru(s.nodeValue,e)),s||ae(a,!0)}else s=Dl(s).createTextNode(t),s[Ds]=a,a.stateNode=s}return ps(a),null;case 31:if(e=a.memoizedState,s===null||s.memoizedState!==null){if(t=nt(a),e!==null){if(s===null){if(!t)throw Error(_(318));if(s=a.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(_(557));s[Ds]=a}else Ee(),(a.flags&128)===0&&(a.memoizedState=null),a.flags|=4;ps(a),s=!1}else e=Ld(),s!==null&&s.memoizedState!==null&&(s.memoizedState.hydrationErrors=e),s=!0;if(!s)return a.flags&256?(ta(a),a):(ta(a),null);if((a.flags&128)!==0)throw Error(_(558))}return ps(a),null;case 13:if(t=a.memoizedState,s===null||s.memoizedState!==null&&s.memoizedState.dehydrated!==null){if(n=nt(a),t!==null&&t.dehydrated!==null){if(s===null){if(!n)throw Error(_(318));if(n=a.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(_(317));n[Ds]=a}else Ee(),(a.flags&128)===0&&(a.memoizedState=null),a.flags|=4;ps(a),n=!1}else n=Ld(),s!==null&&s.memoizedState!==null&&(s.memoizedState.hydrationErrors=n),n=!0;if(!n)return a.flags&256?(ta(a),a):(ta(a),null)}return ta(a),(a.flags&128)!==0?(a.lanes=e,a):(e=t!==null,s=s!==null&&s.memoizedState!==null,e&&(t=a.child,n=null,t.alternate!==null&&t.alternate.memoizedState!==null&&t.alternate.memoizedState.cachePool!==null&&(n=t.alternate.memoizedState.cachePool.pool),l=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(l=t.memoizedState.cachePool.pool),l!==n&&(t.flags|=2048)),e!==s&&e&&(a.child.flags|=8192),vl(a,a.updateQueue),ps(a),null);case 4:return bs(),s===null&&Ri(a.stateNode.containerInfo),ps(a),null;case 10:return Va(a.type),ps(a),null;case 19:if(x(gs),t=a.memoizedState,t===null)return ps(a),null;if(n=(a.flags&128)!==0,l=t.rendering,l===null)if(n)an(t,!1);else{if(hs!==0||s!==null&&(s.flags&128)!==0)for(s=a.child;s!==null;){if(l=Pn(s),l!==null){for(a.flags|=128,an(t,!1),s=l.updateQueue,a.updateQueue=s,vl(a,s),a.subtreeFlags=0,s=e,e=a.child;e!==null;)gc(e,s),e=e.sibling;return B(gs,gs.current&1|2),$&&Oa(a,t.treeForkCount),a.child}s=s.sibling}t.tail!==null&&Ws()>bl&&(a.flags|=128,n=!0,an(t,!1),a.lanes=4194304)}else{if(!n)if(s=Pn(l),s!==null){if(a.flags|=128,n=!0,s=s.updateQueue,a.updateQueue=s,vl(a,s),an(t,!0),t.tail===null&&t.tailMode==="hidden"&&!l.alternate&&!$)return ps(a),null}else 2*Ws()-t.renderingStartTime>bl&&e!==536870912&&(a.flags|=128,n=!0,an(t,!1),a.lanes=4194304);t.isBackwards?(l.sibling=a.child,a.child=l):(s=t.last,s!==null?s.sibling=l:a.child=l,t.last=l)}return t.tail!==null?(s=t.tail,t.rendering=s,t.tail=s.sibling,t.renderingStartTime=Ws(),s.sibling=null,e=gs.current,B(gs,n?e&1|2:e&1),$&&Oa(a,t.treeForkCount),s):(ps(a),null);case 22:case 23:return ta(a),qd(),t=a.memoizedState!==null,s!==null?s.memoizedState!==null!==t&&(a.flags|=8192):t&&(a.flags|=8192),t?(e&536870912)!==0&&(a.flags&128)===0&&(ps(a),a.subtreeFlags&6&&(a.flags|=8192)):ps(a),e=a.updateQueue,e!==null&&vl(a,e.retryQueue),e=null,s!==null&&s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(e=s.memoizedState.cachePool.pool),t=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(t=a.memoizedState.cachePool.pool),t!==e&&(a.flags|=2048),s!==null&&x(ze),null;case 24:return e=null,s!==null&&(e=s.memoizedState.cache),a.memoizedState.cache!==e&&(a.flags|=2048),Va(ms),ps(a),null;case 25:return null;case 30:return null}throw Error(_(156,a.tag))}function t_(s,a){switch(Md(a),a.tag){case 1:return s=a.flags,s&65536?(a.flags=s&-65537|128,a):null;case 3:return Va(ms),bs(),s=a.flags,(s&65536)!==0&&(s&128)===0?(a.flags=s&-65537|128,a):null;case 26:case 27:case 5:return xn(a),null;case 31:if(a.memoizedState!==null){if(ta(a),a.alternate===null)throw Error(_(340));Ee()}return s=a.flags,s&65536?(a.flags=s&-65537|128,a):null;case 13:if(ta(a),s=a.memoizedState,s!==null&&s.dehydrated!==null){if(a.alternate===null)throw Error(_(340));Ee()}return s=a.flags,s&65536?(a.flags=s&-65537|128,a):null;case 19:return x(gs),null;case 4:return bs(),null;case 10:return Va(a.type),null;case 22:case 23:return ta(a),qd(),s!==null&&x(ze),s=a.flags,s&65536?(a.flags=s&-65537|128,a):null;case 24:return Va(ms),null;case 25:return null;default:return null}}function Xr(s,a){switch(Md(a),a.tag){case 3:Va(ms),bs();break;case 26:case 27:case 5:xn(a);break;case 4:bs();break;case 31:a.memoizedState!==null&&ta(a);break;case 13:ta(a);break;case 19:x(gs);break;case 10:Va(a.type);break;case 22:case 23:ta(a),qd(),s!==null&&x(ze);break;case 24:Va(ms)}}function en(s,a){try{var e=a.updateQueue,t=e!==null?e.lastEffect:null;if(t!==null){var n=t.next;e=n;do{if((e.tag&s)===s){t=void 0;var l=e.create,d=e.inst;t=l(),d.destroy=t}e=e.next}while(e!==n)}}catch(i){ls(a,a.return,i)}}function oe(s,a,e){try{var t=a.updateQueue,n=t!==null?t.lastEffect:null;if(n!==null){var l=n.next;t=l;do{if((t.tag&s)===s){var d=t.inst,i=d.destroy;if(i!==void 0){d.destroy=void 0,n=a;var o=e,h=i;try{h()}catch(w){ls(n,o,w)}}}t=t.next}while(t!==l)}}catch(w){ls(a,a.return,w)}}function Qr(s){var a=s.updateQueue;if(a!==null){var e=s.stateNode;try{Hc(a,e)}catch(t){ls(s,s.return,t)}}}function Kr(s,a,e){e.props=je(s.type,s.memoizedProps),e.state=s.memoizedState;try{e.componentWillUnmount()}catch(t){ls(s,a,t)}}function tn(s,a){try{var e=s.ref;if(e!==null){switch(s.tag){case 26:case 27:case 5:var t=s.stateNode;break;case 30:t=s.stateNode;break;default:t=s.stateNode}typeof e=="function"?s.refCleanup=e(t):e.current=t}}catch(n){ls(s,a,n)}}function Da(s,a){var e=s.ref,t=s.refCleanup;if(e!==null)if(typeof t=="function")try{t()}catch(n){ls(s,a,n)}finally{s.refCleanup=null,s=s.alternate,s!=null&&(s.refCleanup=null)}else if(typeof e=="function")try{e(null)}catch(n){ls(s,a,n)}else e.current=null}function Jr(s){var a=s.type,e=s.memoizedProps,t=s.stateNode;try{s:switch(a){case"button":case"input":case"select":case"textarea":e.autoFocus&&t.focus();break s;case"img":e.src?t.src=e.src:e.srcSet&&(t.srcset=e.srcSet)}}catch(n){ls(s,s.return,n)}}function wi(s,a,e){try{var t=s.stateNode;S_(t,s.type,e,a),t[Ys]=a}catch(n){ls(s,s.return,n)}}function Fr(s){return s.tag===5||s.tag===3||s.tag===26||s.tag===27&&fe(s.type)||s.tag===4}function mi(s){s:for(;;){for(;s.sibling===null;){if(s.return===null||Fr(s.return))return null;s=s.return}for(s.sibling.return=s.return,s=s.sibling;s.tag!==5&&s.tag!==6&&s.tag!==18;){if(s.tag===27&&fe(s.type)||s.flags&2||s.child===null||s.tag===4)continue s;s.child.return=s,s=s.child}if(!(s.flags&2))return s.stateNode}}function ki(s,a,e){var t=s.tag;if(t===5||t===6)s=s.stateNode,a?(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e).insertBefore(s,a):(a=e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.appendChild(s),e=e._reactRootContainer,e!=null||a.onclick!==null||(a.onclick=Aa));else if(t!==4&&(t===27&&fe(s.type)&&(e=s.stateNode,a=null),s=s.child,s!==null))for(ki(s,a,e),s=s.sibling;s!==null;)ki(s,a,e),s=s.sibling}function pl(s,a,e){var t=s.tag;if(t===5||t===6)s=s.stateNode,a?e.insertBefore(s,a):e.appendChild(s);else if(t!==4&&(t===27&&fe(s.type)&&(e=s.stateNode),s=s.child,s!==null))for(pl(s,a,e),s=s.sibling;s!==null;)pl(s,a,e),s=s.sibling}function Ir(s){var a=s.stateNode,e=s.memoizedProps;try{for(var t=s.type,n=a.attributes;n.length;)a.removeAttributeNode(n[0]);Ts(a,t,e),a[Ds]=s,a[Ys]=e}catch(l){ls(s,s.return,l)}}var Za=!1,xs=!1,yi=!1,Wr=typeof WeakSet=="function"?WeakSet:Set,Ms=null;function n_(s,a){if(s=s.containerInfo,Yi=Nl,s=cc(s),fd(s)){if("selectionStart"in s)var e={start:s.selectionStart,end:s.selectionEnd};else s:{e=(e=s.ownerDocument)&&e.defaultView||window;var t=e.getSelection&&e.getSelection();if(t&&t.rangeCount!==0){e=t.anchorNode;var n=t.anchorOffset,l=t.focusNode;t=t.focusOffset;try{e.nodeType,l.nodeType}catch{e=null;break s}var d=0,i=-1,o=-1,h=0,w=0,y=s,b=null;a:for(;;){for(var g;y!==e||n!==0&&y.nodeType!==3||(i=d+n),y!==l||t!==0&&y.nodeType!==3||(o=d+t),y.nodeType===3&&(d+=y.nodeValue.length),(g=y.firstChild)!==null;)b=y,y=g;for(;;){if(y===s)break a;if(b===e&&++h===n&&(i=d),b===l&&++w===t&&(o=d),(g=y.nextSibling)!==null)break;y=b,b=y.parentNode}y=g}e=i===-1||o===-1?null:{start:i,end:o}}else e=null}e=e||{start:0,end:0}}else e=null;for(Gi={focusedElem:s,selectionRange:e},Nl=!1,Ms=a;Ms!==null;)if(a=Ms,s=a.child,(a.subtreeFlags&1028)!==0&&s!==null)s.return=a,Ms=s;else for(;Ms!==null;){switch(a=Ms,l=a.alternate,s=a.flags,a.tag){case 0:if((s&4)!==0&&(s=a.updateQueue,s=s!==null?s.events:null,s!==null))for(e=0;e<s.length;e++)n=s[e],n.ref.impl=n.nextImpl;break;case 11:case 15:break;case 1:if((s&1024)!==0&&l!==null){s=void 0,e=a,n=l.memoizedProps,l=l.memoizedState,t=e.stateNode;try{var T=je(e.type,n);s=t.getSnapshotBeforeUpdate(T,l),t.__reactInternalSnapshotBeforeUpdate=s}catch(R){ls(e,e.return,R)}}break;case 3:if((s&1024)!==0){if(s=a.stateNode.containerInfo,e=s.nodeType,e===9)Ki(s);else if(e===1)switch(s.nodeName){case"HEAD":case"HTML":case"BODY":Ki(s);break;default:s.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((s&1024)!==0)throw Error(_(163))}if(s=a.sibling,s!==null){s.return=a.return,Ms=s;break}Ms=a.return}}function $r(s,a,e){var t=e.flags;switch(e.tag){case 0:case 11:case 15:Ga(s,e),t&4&&en(5,e);break;case 1:if(Ga(s,e),t&4)if(s=e.stateNode,a===null)try{s.componentDidMount()}catch(d){ls(e,e.return,d)}else{var n=je(e.type,a.memoizedProps);a=a.memoizedState;try{s.componentDidUpdate(n,a,s.__reactInternalSnapshotBeforeUpdate)}catch(d){ls(e,e.return,d)}}t&64&&Qr(e),t&512&&tn(e,e.return);break;case 3:if(Ga(s,e),t&64&&(s=e.updateQueue,s!==null)){if(a=null,e.child!==null)switch(e.child.tag){case 27:case 5:a=e.child.stateNode;break;case 1:a=e.child.stateNode}try{Hc(s,a)}catch(d){ls(e,e.return,d)}}break;case 27:a===null&&t&4&&Ir(e);case 26:case 5:Ga(s,e),a===null&&t&4&&Jr(e),t&512&&tn(e,e.return);break;case 12:Ga(s,e);break;case 31:Ga(s,e),t&4&&au(s,e);break;case 13:Ga(s,e),t&4&&eu(s,e),t&64&&(s=e.memoizedState,s!==null&&(s=s.dehydrated,s!==null&&(e=p_.bind(null,e),z_(s,e))));break;case 22:if(t=e.memoizedState!==null||Za,!t){a=a!==null&&a.memoizedState!==null||xs,n=Za;var l=xs;Za=t,(xs=a)&&!l?Xa(s,e,(e.subtreeFlags&8772)!==0):Ga(s,e),Za=n,xs=l}break;case 30:break;default:Ga(s,e)}}function Pr(s){var a=s.alternate;a!==null&&(s.alternate=null,Pr(a)),s.child=null,s.deletions=null,s.sibling=null,s.tag===5&&(a=s.stateNode,a!==null&&$l(a)),s.stateNode=null,s.return=null,s.dependencies=null,s.memoizedProps=null,s.memoizedState=null,s.pendingProps=null,s.stateNode=null,s.updateQueue=null}var _s=null,Xs=!1;function Ya(s,a,e){for(e=e.child;e!==null;)su(s,a,e),e=e.sibling}function su(s,a,e){if($s&&typeof $s.onCommitFiberUnmount=="function")try{$s.onCommitFiberUnmount(Dt,e)}catch{}switch(e.tag){case 26:xs||Da(e,a),Ya(s,a,e),e.memoizedState?e.memoizedState.count--:e.stateNode&&(e=e.stateNode,e.parentNode.removeChild(e));break;case 27:xs||Da(e,a);var t=_s,n=Xs;fe(e.type)&&(_s=e.stateNode,Xs=!1),Ya(s,a,e),pn(e.stateNode),_s=t,Xs=n;break;case 5:xs||Da(e,a);case 6:if(t=_s,n=Xs,_s=null,Ya(s,a,e),_s=t,Xs=n,_s!==null)if(Xs)try{(_s.nodeType===9?_s.body:_s.nodeName==="HTML"?_s.ownerDocument.body:_s).removeChild(e.stateNode)}catch(l){ls(e,a,l)}else try{_s.removeChild(e.stateNode)}catch(l){ls(e,a,l)}break;case 18:_s!==null&&(Xs?(s=_s,Qu(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,e.stateNode),St(s)):Qu(_s,e.stateNode));break;case 4:t=_s,n=Xs,_s=e.stateNode.containerInfo,Xs=!0,Ya(s,a,e),_s=t,Xs=n;break;case 0:case 11:case 14:case 15:oe(2,e,a),xs||oe(4,e,a),Ya(s,a,e);break;case 1:xs||(Da(e,a),t=e.stateNode,typeof t.componentWillUnmount=="function"&&Kr(e,a,t)),Ya(s,a,e);break;case 21:Ya(s,a,e);break;case 22:xs=(t=xs)||e.memoizedState!==null,Ya(s,a,e),xs=t;break;default:Ya(s,a,e)}}function au(s,a){if(a.memoizedState===null&&(s=a.alternate,s!==null&&(s=s.memoizedState,s!==null))){s=s.dehydrated;try{St(s)}catch(e){ls(a,a.return,e)}}}function eu(s,a){if(a.memoizedState===null&&(s=a.alternate,s!==null&&(s=s.memoizedState,s!==null&&(s=s.dehydrated,s!==null))))try{St(s)}catch(e){ls(a,a.return,e)}}function l_(s){switch(s.tag){case 31:case 13:case 19:var a=s.stateNode;return a===null&&(a=s.stateNode=new Wr),a;case 22:return s=s.stateNode,a=s._retryCache,a===null&&(a=s._retryCache=new Wr),a;default:throw Error(_(435,s.tag))}}function _l(s,a){var e=l_(s);a.forEach(function(t){if(!e.has(t)){e.add(t);var n=__.bind(null,s,t);t.then(n,n)}})}function Qs(s,a){var e=a.deletions;if(e!==null)for(var t=0;t<e.length;t++){var n=e[t],l=s,d=a,i=d;s:for(;i!==null;){switch(i.tag){case 27:if(fe(i.type)){_s=i.stateNode,Xs=!1;break s}break;case 5:_s=i.stateNode,Xs=!1;break s;case 3:case 4:_s=i.stateNode.containerInfo,Xs=!0;break s}i=i.return}if(_s===null)throw Error(_(160));su(l,d,n),_s=null,Xs=!1,l=n.alternate,l!==null&&(l.return=null),n.return=null}if(a.subtreeFlags&13886)for(a=a.child;a!==null;)tu(a,s),a=a.sibling}var ma=null;function tu(s,a){var e=s.alternate,t=s.flags;switch(s.tag){case 0:case 11:case 14:case 15:Qs(a,s),Ks(s),t&4&&(oe(3,s,s.return),en(3,s),oe(5,s,s.return));break;case 1:Qs(a,s),Ks(s),t&512&&(xs||e===null||Da(e,e.return)),t&64&&Za&&(s=s.updateQueue,s!==null&&(t=s.callbacks,t!==null&&(e=s.shared.hiddenCallbacks,s.shared.hiddenCallbacks=e===null?t:e.concat(t))));break;case 26:var n=ma;if(Qs(a,s),Ks(s),t&512&&(xs||e===null||Da(e,e.return)),t&4){var l=e!==null?e.memoizedState:null;if(t=s.memoizedState,e===null)if(t===null)if(s.stateNode===null){s:{t=s.type,e=s.memoizedProps,n=n.ownerDocument||n;a:switch(t){case"title":l=n.getElementsByTagName("title")[0],(!l||l[Et]||l[Ds]||l.namespaceURI==="http://www.w3.org/2000/svg"||l.hasAttribute("itemprop"))&&(l=n.createElement(t),n.head.insertBefore(l,n.querySelector("head > title"))),Ts(l,t,e),l[Ds]=s,Ss(l),t=l;break s;case"link":var d=tv("link","href",n).get(t+(e.href||""));if(d){for(var i=0;i<d.length;i++)if(l=d[i],l.getAttribute("href")===(e.href==null||e.href===""?null:e.href)&&l.getAttribute("rel")===(e.rel==null?null:e.rel)&&l.getAttribute("title")===(e.title==null?null:e.title)&&l.getAttribute("crossorigin")===(e.crossOrigin==null?null:e.crossOrigin)){d.splice(i,1);break a}}l=n.createElement(t),Ts(l,t,e),n.head.appendChild(l);break;case"meta":if(d=tv("meta","content",n).get(t+(e.content||""))){for(i=0;i<d.length;i++)if(l=d[i],l.getAttribute("content")===(e.content==null?null:""+e.content)&&l.getAttribute("name")===(e.name==null?null:e.name)&&l.getAttribute("property")===(e.property==null?null:e.property)&&l.getAttribute("http-equiv")===(e.httpEquiv==null?null:e.httpEquiv)&&l.getAttribute("charset")===(e.charSet==null?null:e.charSet)){d.splice(i,1);break a}}l=n.createElement(t),Ts(l,t,e),n.head.appendChild(l);break;default:throw Error(_(468,t))}l[Ds]=s,Ss(l),t=l}s.stateNode=t}else nv(n,s.type,s.stateNode);else s.stateNode=ev(n,t,s.memoizedProps);else l!==t?(l===null?e.stateNode!==null&&(e=e.stateNode,e.parentNode.removeChild(e)):l.count--,t===null?nv(n,s.type,s.stateNode):ev(n,t,s.memoizedProps)):t===null&&s.stateNode!==null&&wi(s,s.memoizedProps,e.memoizedProps)}break;case 27:Qs(a,s),Ks(s),t&512&&(xs||e===null||Da(e,e.return)),e!==null&&t&4&&wi(s,s.memoizedProps,e.memoizedProps);break;case 5:if(Qs(a,s),Ks(s),t&512&&(xs||e===null||Da(e,e.return)),s.flags&32){n=s.stateNode;try{Je(n,"")}catch(T){ls(s,s.return,T)}}t&4&&s.stateNode!=null&&(n=s.memoizedProps,wi(s,n,e!==null?e.memoizedProps:n)),t&1024&&(yi=!0);break;case 6:if(Qs(a,s),Ks(s),t&4){if(s.stateNode===null)throw Error(_(162));t=s.memoizedProps,e=s.stateNode;try{e.nodeValue=t}catch(T){ls(s,s.return,T)}}break;case 3:if(El=null,n=ma,ma=Ll(a.containerInfo),Qs(a,s),ma=n,Ks(s),t&4&&e!==null&&e.memoizedState.isDehydrated)try{St(a.containerInfo)}catch(T){ls(s,s.return,T)}yi&&(yi=!1,nu(s));break;case 4:t=ma,ma=Ll(s.stateNode.containerInfo),Qs(a,s),Ks(s),ma=t;break;case 12:Qs(a,s),Ks(s);break;case 31:Qs(a,s),Ks(s),t&4&&(t=s.updateQueue,t!==null&&(s.updateQueue=null,_l(s,t)));break;case 13:Qs(a,s),Ks(s),s.child.flags&8192&&s.memoizedState!==null!=(e!==null&&e.memoizedState!==null)&&(hl=Ws()),t&4&&(t=s.updateQueue,t!==null&&(s.updateQueue=null,_l(s,t)));break;case 22:n=s.memoizedState!==null;var o=e!==null&&e.memoizedState!==null,h=Za,w=xs;if(Za=h||n,xs=w||o,Qs(a,s),xs=w,Za=h,Ks(s),t&8192)s:for(a=s.stateNode,a._visibility=n?a._visibility&-2:a._visibility|1,n&&(e===null||o||Za||xs||Ue(s)),e=null,a=s;;){if(a.tag===5||a.tag===26){if(e===null){o=e=a;try{if(l=o.stateNode,n)d=l.style,typeof d.setProperty=="function"?d.setProperty("display","none","important"):d.display="none";else{i=o.stateNode;var y=o.memoizedProps.style,b=y!=null&&y.hasOwnProperty("display")?y.display:null;i.style.display=b==null||typeof b=="boolean"?"":(""+b).trim()}}catch(T){ls(o,o.return,T)}}}else if(a.tag===6){if(e===null){o=a;try{o.stateNode.nodeValue=n?"":o.memoizedProps}catch(T){ls(o,o.return,T)}}}else if(a.tag===18){if(e===null){o=a;try{var g=o.stateNode;n?Ku(g,!0):Ku(o.stateNode,!1)}catch(T){ls(o,o.return,T)}}}else if((a.tag!==22&&a.tag!==23||a.memoizedState===null||a===s)&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===s)break s;for(;a.sibling===null;){if(a.return===null||a.return===s)break s;e===a&&(e=null),a=a.return}e===a&&(e=null),a.sibling.return=a.return,a=a.sibling}t&4&&(t=s.updateQueue,t!==null&&(e=t.retryQueue,e!==null&&(t.retryQueue=null,_l(s,e))));break;case 19:Qs(a,s),Ks(s),t&4&&(t=s.updateQueue,t!==null&&(s.updateQueue=null,_l(s,t)));break;case 30:break;case 21:break;default:Qs(a,s),Ks(s)}}function Ks(s){var a=s.flags;if(a&2){try{for(var e,t=s.return;t!==null;){if(Fr(t)){e=t;break}t=t.return}if(e==null)throw Error(_(160));switch(e.tag){case 27:var n=e.stateNode,l=mi(s);pl(s,l,n);break;case 5:var d=e.stateNode;e.flags&32&&(Je(d,""),e.flags&=-33);var i=mi(s);pl(s,i,d);break;case 3:case 4:var o=e.stateNode.containerInfo,h=mi(s);ki(s,h,o);break;default:throw Error(_(161))}}catch(w){ls(s,s.return,w)}s.flags&=-3}a&4096&&(s.flags&=-4097)}function nu(s){if(s.subtreeFlags&1024)for(s=s.child;s!==null;){var a=s;nu(a),a.tag===5&&a.flags&1024&&a.stateNode.reset(),s=s.sibling}}function Ga(s,a){if(a.subtreeFlags&8772)for(a=a.child;a!==null;)$r(s,a.alternate,a),a=a.sibling}function Ue(s){for(s=s.child;s!==null;){var a=s;switch(a.tag){case 0:case 11:case 14:case 15:oe(4,a,a.return),Ue(a);break;case 1:Da(a,a.return);var e=a.stateNode;typeof e.componentWillUnmount=="function"&&Kr(a,a.return,e),Ue(a);break;case 27:pn(a.stateNode);case 26:case 5:Da(a,a.return),Ue(a);break;case 22:a.memoizedState===null&&Ue(a);break;case 30:Ue(a);break;default:Ue(a)}s=s.sibling}}function Xa(s,a,e){for(e=e&&(a.subtreeFlags&8772)!==0,a=a.child;a!==null;){var t=a.alternate,n=s,l=a,d=l.flags;switch(l.tag){case 0:case 11:case 15:Xa(n,l,e),en(4,l);break;case 1:if(Xa(n,l,e),t=l,n=t.stateNode,typeof n.componentDidMount=="function")try{n.componentDidMount()}catch(h){ls(t,t.return,h)}if(t=l,n=t.updateQueue,n!==null){var i=t.stateNode;try{var o=n.shared.hiddenCallbacks;if(o!==null)for(n.shared.hiddenCallbacks=null,n=0;n<o.length;n++)Oc(o[n],i)}catch(h){ls(t,t.return,h)}}e&&d&64&&Qr(l),tn(l,l.return);break;case 27:Ir(l);case 26:case 5:Xa(n,l,e),e&&t===null&&d&4&&Jr(l),tn(l,l.return);break;case 12:Xa(n,l,e);break;case 31:Xa(n,l,e),e&&d&4&&au(n,l);break;case 13:Xa(n,l,e),e&&d&4&&eu(n,l);break;case 22:l.memoizedState===null&&Xa(n,l,e),tn(l,l.return);break;case 30:break;default:Xa(n,l,e)}a=a.sibling}}function xi(s,a){var e=null;s!==null&&s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(e=s.memoizedState.cachePool.pool),s=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(s=a.memoizedState.cachePool.pool),s!==e&&(s!=null&&s.refCount++,e!=null&&Yt(e))}function Ci(s,a){s=null,a.alternate!==null&&(s=a.alternate.memoizedState.cache),a=a.memoizedState.cache,a!==s&&(a.refCount++,s!=null&&Yt(s))}function ka(s,a,e,t){if(a.subtreeFlags&10256)for(a=a.child;a!==null;)lu(s,a,e,t),a=a.sibling}function lu(s,a,e,t){var n=a.flags;switch(a.tag){case 0:case 11:case 15:ka(s,a,e,t),n&2048&&en(9,a);break;case 1:ka(s,a,e,t);break;case 3:ka(s,a,e,t),n&2048&&(s=null,a.alternate!==null&&(s=a.alternate.memoizedState.cache),a=a.memoizedState.cache,a!==s&&(a.refCount++,s!=null&&Yt(s)));break;case 12:if(n&2048){ka(s,a,e,t),s=a.stateNode;try{var l=a.memoizedProps,d=l.id,i=l.onPostCommit;typeof i=="function"&&i(d,a.alternate===null?"mount":"update",s.passiveEffectDuration,-0)}catch(o){ls(a,a.return,o)}}else ka(s,a,e,t);break;case 31:ka(s,a,e,t);break;case 13:ka(s,a,e,t);break;case 23:break;case 22:l=a.stateNode,d=a.alternate,a.memoizedState!==null?l._visibility&2?ka(s,a,e,t):nn(s,a):l._visibility&2?ka(s,a,e,t):(l._visibility|=2,_t(s,a,e,t,(a.subtreeFlags&10256)!==0||!1)),n&2048&&xi(d,a);break;case 24:ka(s,a,e,t),n&2048&&Ci(a.alternate,a);break;default:ka(s,a,e,t)}}function _t(s,a,e,t,n){for(n=n&&((a.subtreeFlags&10256)!==0||!1),a=a.child;a!==null;){var l=s,d=a,i=e,o=t,h=d.flags;switch(d.tag){case 0:case 11:case 15:_t(l,d,i,o,n),en(8,d);break;case 23:break;case 22:var w=d.stateNode;d.memoizedState!==null?w._visibility&2?_t(l,d,i,o,n):nn(l,d):(w._visibility|=2,_t(l,d,i,o,n)),n&&h&2048&&xi(d.alternate,d);break;case 24:_t(l,d,i,o,n),n&&h&2048&&Ci(d.alternate,d);break;default:_t(l,d,i,o,n)}a=a.sibling}}function nn(s,a){if(a.subtreeFlags&10256)for(a=a.child;a!==null;){var e=s,t=a,n=t.flags;switch(t.tag){case 22:nn(e,t),n&2048&&xi(t.alternate,t);break;case 24:nn(e,t),n&2048&&Ci(t.alternate,t);break;default:nn(e,t)}a=a.sibling}}var ln=8192;function ft(s,a,e){if(s.subtreeFlags&ln)for(s=s.child;s!==null;)du(s,a,e),s=s.sibling}function du(s,a,e){switch(s.tag){case 26:ft(s,a,e),s.flags&ln&&s.memoizedState!==null&&X_(e,ma,s.memoizedState,s.memoizedProps);break;case 5:ft(s,a,e);break;case 3:case 4:var t=ma;ma=Ll(s.stateNode.containerInfo),ft(s,a,e),ma=t;break;case 22:s.memoizedState===null&&(t=s.alternate,t!==null&&t.memoizedState!==null?(t=ln,ln=16777216,ft(s,a,e),ln=t):ft(s,a,e));break;default:ft(s,a,e)}}function iu(s){var a=s.alternate;if(a!==null&&(s=a.child,s!==null)){a.child=null;do a=s.sibling,s.sibling=null,s=a;while(s!==null)}}function dn(s){var a=s.deletions;if((s.flags&16)!==0){if(a!==null)for(var e=0;e<a.length;e++){var t=a[e];Ms=t,cu(t,s)}iu(s)}if(s.subtreeFlags&10256)for(s=s.child;s!==null;)ou(s),s=s.sibling}function ou(s){switch(s.tag){case 0:case 11:case 15:dn(s),s.flags&2048&&oe(9,s,s.return);break;case 3:dn(s);break;case 12:dn(s);break;case 22:var a=s.stateNode;s.memoizedState!==null&&a._visibility&2&&(s.return===null||s.return.tag!==13)?(a._visibility&=-3,fl(s)):dn(s);break;default:dn(s)}}function fl(s){var a=s.deletions;if((s.flags&16)!==0){if(a!==null)for(var e=0;e<a.length;e++){var t=a[e];Ms=t,cu(t,s)}iu(s)}for(s=s.child;s!==null;){switch(a=s,a.tag){case 0:case 11:case 15:oe(8,a,a.return),fl(a);break;case 22:e=a.stateNode,e._visibility&2&&(e._visibility&=-3,fl(a));break;default:fl(a)}s=s.sibling}}function cu(s,a){for(;Ms!==null;){var e=Ms;switch(e.tag){case 0:case 11:case 15:oe(8,e,a);break;case 23:case 22:if(e.memoizedState!==null&&e.memoizedState.cachePool!==null){var t=e.memoizedState.cachePool.pool;t!=null&&t.refCount++}break;case 24:Yt(e.memoizedState.cache)}if(t=e.child,t!==null)t.return=e,Ms=t;else s:for(e=s;Ms!==null;){t=Ms;var n=t.sibling,l=t.return;if(Pr(t),t===e){Ms=null;break s}if(n!==null){n.return=l,Ms=n;break s}Ms=l}}}var d_={getCacheForType:function(s){var a=Bs(ms),e=a.data.get(s);return e===void 0&&(e=s(),a.data.set(s,e)),e},cacheSignal:function(){return Bs(ms).controller.signal}},i_=typeof WeakMap=="function"?WeakMap:Map,es=0,us=null,K=null,F=0,ns=0,na=null,ce=!1,ht=!1,Si=!1,Qa=0,hs=0,re=0,Re=0,Mi=0,la=0,bt=0,on=null,Js=null,Di=!1,hl=0,ru=0,bl=1/0,gl=null,ue=null,Cs=0,ve=null,gt=null,Ka=0,Li=0,Bi=null,uu=null,cn=0,Ei=null;function da(){return(es&2)!==0&&F!==0?F&-F:m.T!==null?Hi():Do()}function vu(){if(la===0)if((F&536870912)===0||$){var s=Mn;Mn<<=1,(Mn&3932160)===0&&(Mn=262144),la=s}else la=536870912;return s=ea.current,s!==null&&(s.flags|=32),la}function Fs(s,a,e){(s===us&&(ns===2||ns===9)||s.cancelPendingCommit!==null)&&(wt(s,0),pe(s,F,la,!1)),Bt(s,e),((es&2)===0||s!==us)&&(s===us&&((es&2)===0&&(Re|=e),hs===4&&pe(s,F,la,!1)),La(s))}function pu(s,a,e){if((es&6)!==0)throw Error(_(327));var t=!e&&(a&127)===0&&(a&s.expiredLanes)===0||Lt(s,a),n=t?r_(s,a):Ai(s,a,!0),l=t;do{if(n===0){ht&&!t&&pe(s,a,0,!1);break}else{if(e=s.current.alternate,l&&!o_(e)){n=Ai(s,a,!1),l=!1;continue}if(n===2){if(l=a,s.errorRecoveryDisabledLanes&l)var d=0;else d=s.pendingLanes&-536870913,d=d!==0?d:d&536870912?536870912:0;if(d!==0){a=d;s:{var i=s;n=on;var o=i.current.memoizedState.isDehydrated;if(o&&(wt(i,d).flags|=256),d=Ai(i,d,!1),d!==2){if(Si&&!o){i.errorRecoveryDisabledLanes|=l,Re|=l,n=4;break s}l=Js,Js=n,l!==null&&(Js===null?Js=l:Js.push.apply(Js,l))}n=d}if(l=!1,n!==2)continue}}if(n===1){wt(s,0),pe(s,a,0,!0);break}s:{switch(t=s,l=n,l){case 0:case 1:throw Error(_(345));case 4:if((a&4194048)!==a)break;case 6:pe(t,a,la,!ce);break s;case 2:Js=null;break;case 3:case 5:break;default:throw Error(_(329))}if((a&62914560)===a&&(n=hl+300-Ws(),10<n)){if(pe(t,a,la,!ce),Ln(t,0,!0)!==0)break s;Ka=a,t.timeoutHandle=Gu(_u.bind(null,t,e,Js,gl,Di,a,la,Re,bt,ce,l,"Throttled",-0,0),n);break s}_u(t,e,Js,gl,Di,a,la,Re,bt,ce,l,null,-0,0)}}break}while(!0);La(s)}function _u(s,a,e,t,n,l,d,i,o,h,w,y,b,g){if(s.timeoutHandle=-1,y=a.subtreeFlags,y&8192||(y&16785408)===16785408){y={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Aa},du(a,l,y);var T=(l&62914560)===l?hl-Ws():(l&4194048)===l?ru-Ws():0;if(T=Q_(y,T),T!==null){Ka=l,s.cancelPendingCommit=T(yu.bind(null,s,a,l,e,t,n,d,i,o,w,y,null,b,g)),pe(s,l,d,!h);return}}yu(s,a,l,e,t,n,d,i,o)}function o_(s){for(var a=s;;){var e=a.tag;if((e===0||e===11||e===15)&&a.flags&16384&&(e=a.updateQueue,e!==null&&(e=e.stores,e!==null)))for(var t=0;t<e.length;t++){var n=e[t],l=n.getSnapshot;n=n.value;try{if(!sa(l(),n))return!1}catch{return!1}}if(e=a.child,a.subtreeFlags&16384&&e!==null)e.return=a,a=e;else{if(a===s)break;for(;a.sibling===null;){if(a.return===null||a.return===s)return!0;a=a.return}a.sibling.return=a.return,a=a.sibling}}return!0}function pe(s,a,e,t){a&=~Mi,a&=~Re,s.suspendedLanes|=a,s.pingedLanes&=~a,t&&(s.warmLanes|=a),t=s.expirationTimes;for(var n=a;0<n;){var l=31-Ps(n),d=1<<l;t[l]=-1,n&=~d}e!==0&&Co(s,e,a)}function wl(){return(es&6)===0?(rn(0),!1):!0}function Ti(){if(K!==null){if(ns===0)var s=K.return;else s=K,Ha=Te=null,Kd(s),ct=null,Xt=0,s=K;for(;s!==null;)Xr(s.alternate,s),s=s.return;K=null}}function wt(s,a){var e=s.timeoutHandle;e!==-1&&(s.timeoutHandle=-1,L_(e)),e=s.cancelPendingCommit,e!==null&&(s.cancelPendingCommit=null,e()),Ka=0,Ti(),us=s,K=e=Na(s.current,null),F=a,ns=0,na=null,ce=!1,ht=Lt(s,a),Si=!1,bt=la=Mi=Re=re=hs=0,Js=on=null,Di=!1,(a&8)!==0&&(a|=a&32);var t=s.entangledLanes;if(t!==0)for(s=s.entanglements,t&=a;0<t;){var n=31-Ps(t),l=1<<n;a|=s[n],t&=~l}return Qa=a,Rn(),e}function fu(s,a){G=null,m.H=Pt,a===ot||a===Jn?(a=Tc(),ns=3):a===Od?(a=Tc(),ns=4):ns=a===ci?8:a!==null&&typeof a=="object"&&typeof a.then=="function"?6:1,na=a,K===null&&(hs=1,ol(s,ua(a,s.current)))}function hu(){var s=ea.current;return s===null?!0:(F&4194048)===F?fa===null:(F&62914560)===F||(F&536870912)!==0?s===fa:!1}function bu(){var s=m.H;return m.H=Pt,s===null?Pt:s}function gu(){var s=m.A;return m.A=d_,s}function ml(){hs=4,ce||(F&4194048)!==F&&ea.current!==null||(ht=!0),(re&134217727)===0&&(Re&134217727)===0||us===null||pe(us,F,la,!1)}function Ai(s,a,e){var t=es;es|=2;var n=bu(),l=gu();(us!==s||F!==a)&&(gl=null,wt(s,a)),a=!1;var d=hs;s:do try{if(ns!==0&&K!==null){var i=K,o=na;switch(ns){case 8:Ti(),d=6;break s;case 3:case 2:case 9:case 6:ea.current===null&&(a=!0);var h=ns;if(ns=0,na=null,mt(s,i,o,h),e&&ht){d=0;break s}break;default:h=ns,ns=0,na=null,mt(s,i,o,h)}}c_(),d=hs;break}catch(w){fu(s,w)}while(!0);return a&&s.shellSuspendCounter++,Ha=Te=null,es=t,m.H=n,m.A=l,K===null&&(us=null,F=0,Rn()),d}function c_(){for(;K!==null;)wu(K)}function r_(s,a){var e=es;es|=2;var t=bu(),n=gu();us!==s||F!==a?(gl=null,bl=Ws()+500,wt(s,a)):ht=Lt(s,a);s:do try{if(ns!==0&&K!==null){a=K;var l=na;a:switch(ns){case 1:ns=0,na=null,mt(s,a,l,1);break;case 2:case 9:if(Bc(l)){ns=0,na=null,mu(a);break}a=function(){ns!==2&&ns!==9||us!==s||(ns=7),La(s)},l.then(a,a);break s;case 3:ns=7;break s;case 4:ns=5;break s;case 7:Bc(l)?(ns=0,na=null,mu(a)):(ns=0,na=null,mt(s,a,l,7));break;case 5:var d=null;switch(K.tag){case 26:d=K.memoizedState;case 5:case 27:var i=K;if(d?lv(d):i.stateNode.complete){ns=0,na=null;var o=i.sibling;if(o!==null)K=o;else{var h=i.return;h!==null?(K=h,kl(h)):K=null}break a}}ns=0,na=null,mt(s,a,l,5);break;case 6:ns=0,na=null,mt(s,a,l,6);break;case 8:Ti(),hs=6;break s;default:throw Error(_(462))}}u_();break}catch(w){fu(s,w)}while(!0);return Ha=Te=null,m.H=t,m.A=n,es=e,K!==null?0:(us=null,F=0,Rn(),hs)}function u_(){for(;K!==null&&!Nv();)wu(K)}function wu(s){var a=Yr(s.alternate,s,Qa);s.memoizedProps=s.pendingProps,a===null?kl(s):K=a}function mu(s){var a=s,e=a.alternate;switch(a.tag){case 15:case 0:a=Vr(e,a,a.pendingProps,a.type,void 0,F);break;case 11:a=Vr(e,a,a.pendingProps,a.type.render,a.ref,F);break;case 5:Kd(a);default:Xr(e,a),a=K=gc(a,Qa),a=Yr(e,a,Qa)}s.memoizedProps=s.pendingProps,a===null?kl(s):K=a}function mt(s,a,e,t){Ha=Te=null,Kd(a),ct=null,Xt=0;var n=a.return;try{if(Pp(s,n,a,e,F)){hs=1,ol(s,ua(e,s.current)),K=null;return}}catch(l){if(n!==null)throw K=n,l;hs=1,ol(s,ua(e,s.current)),K=null;return}a.flags&32768?($||t===1?s=!0:ht||(F&536870912)!==0?s=!1:(ce=s=!0,(t===2||t===9||t===3||t===6)&&(t=ea.current,t!==null&&t.tag===13&&(t.flags|=16384))),ku(a,s)):kl(a)}function kl(s){var a=s;do{if((a.flags&32768)!==0){ku(a,ce);return}s=a.return;var e=e_(a.alternate,a,Qa);if(e!==null){K=e;return}if(a=a.sibling,a!==null){K=a;return}K=a=s}while(a!==null);hs===0&&(hs=5)}function ku(s,a){do{var e=t_(s.alternate,s);if(e!==null){e.flags&=32767,K=e;return}if(e=s.return,e!==null&&(e.flags|=32768,e.subtreeFlags=0,e.deletions=null),!a&&(s=s.sibling,s!==null)){K=s;return}K=s=e}while(s!==null);hs=6,K=null}function yu(s,a,e,t,n,l,d,i,o){s.cancelPendingCommit=null;do yl();while(Cs!==0);if((es&6)!==0)throw Error(_(327));if(a!==null){if(a===s.current)throw Error(_(177));if(l=a.lanes|a.childLanes,l|=md,Gv(s,e,l,d,i,o),s===us&&(K=us=null,F=0),gt=a,ve=s,Ka=e,Li=l,Bi=n,uu=t,(a.subtreeFlags&10256)!==0||(a.flags&10256)!==0?(s.callbackNode=null,s.callbackPriority=0,f_(Cn,function(){return Du(),null})):(s.callbackNode=null,s.callbackPriority=0),t=(a.flags&13878)!==0,(a.subtreeFlags&13878)!==0||t){t=m.T,m.T=null,n=L.p,L.p=2,d=es,es|=4;try{n_(s,a,e)}finally{es=d,L.p=n,m.T=t}}Cs=1,xu(),Cu(),Su()}}function xu(){if(Cs===1){Cs=0;var s=ve,a=gt,e=(a.flags&13878)!==0;if((a.subtreeFlags&13878)!==0||e){e=m.T,m.T=null;var t=L.p;L.p=2;var n=es;es|=4;try{tu(a,s);var l=Gi,d=cc(s.containerInfo),i=l.focusedElem,o=l.selectionRange;if(d!==i&&i&&i.ownerDocument&&oc(i.ownerDocument.documentElement,i)){if(o!==null&&fd(i)){var h=o.start,w=o.end;if(w===void 0&&(w=h),"selectionStart"in i)i.selectionStart=h,i.selectionEnd=Math.min(w,i.value.length);else{var y=i.ownerDocument||document,b=y&&y.defaultView||window;if(b.getSelection){var g=b.getSelection(),T=i.textContent.length,R=Math.min(o.start,T),cs=o.end===void 0?R:Math.min(o.end,T);!g.extend&&R>cs&&(d=cs,cs=R,R=d);var p=ic(i,R),r=ic(i,cs);if(p&&r&&(g.rangeCount!==1||g.anchorNode!==p.node||g.anchorOffset!==p.offset||g.focusNode!==r.node||g.focusOffset!==r.offset)){var f=y.createRange();f.setStart(p.node,p.offset),g.removeAllRanges(),R>cs?(g.addRange(f),g.extend(r.node,r.offset)):(f.setEnd(r.node,r.offset),g.addRange(f))}}}}for(y=[],g=i;g=g.parentNode;)g.nodeType===1&&y.push({element:g,left:g.scrollLeft,top:g.scrollTop});for(typeof i.focus=="function"&&i.focus(),i=0;i<y.length;i++){var k=y[i];k.element.scrollLeft=k.left,k.element.scrollTop=k.top}}Nl=!!Yi,Gi=Yi=null}finally{es=n,L.p=t,m.T=e}}s.current=a,Cs=2}}function Cu(){if(Cs===2){Cs=0;var s=ve,a=gt,e=(a.flags&8772)!==0;if((a.subtreeFlags&8772)!==0||e){e=m.T,m.T=null;var t=L.p;L.p=2;var n=es;es|=4;try{$r(s,a.alternate,a)}finally{es=n,L.p=t,m.T=e}}Cs=3}}function Su(){if(Cs===4||Cs===3){Cs=0,Ov();var s=ve,a=gt,e=Ka,t=uu;(a.subtreeFlags&10256)!==0||(a.flags&10256)!==0?Cs=5:(Cs=0,gt=ve=null,Mu(s,s.pendingLanes));var n=s.pendingLanes;if(n===0&&(ue=null),Il(e),a=a.stateNode,$s&&typeof $s.onCommitFiberRoot=="function")try{$s.onCommitFiberRoot(Dt,a,void 0,(a.current.flags&128)===128)}catch{}if(t!==null){a=m.T,n=L.p,L.p=2,m.T=null;try{for(var l=s.onRecoverableError,d=0;d<t.length;d++){var i=t[d];l(i.value,{componentStack:i.stack})}}finally{m.T=a,L.p=n}}(Ka&3)!==0&&yl(),La(s),n=s.pendingLanes,(e&261930)!==0&&(n&42)!==0?s===Ei?cn++:(cn=0,Ei=s):cn=0,rn(0)}}function Mu(s,a){(s.pooledCacheLanes&=a)===0&&(a=s.pooledCache,a!=null&&(s.pooledCache=null,Yt(a)))}function yl(){return xu(),Cu(),Su(),Du()}function Du(){if(Cs!==5)return!1;var s=ve,a=Li;Li=0;var e=Il(Ka),t=m.T,n=L.p;try{L.p=32>e?32:e,m.T=null,e=Bi,Bi=null;var l=ve,d=Ka;if(Cs=0,gt=ve=null,Ka=0,(es&6)!==0)throw Error(_(331));var i=es;if(es|=4,ou(l.current),lu(l,l.current,d,e),es=i,rn(0,!1),$s&&typeof $s.onPostCommitFiberRoot=="function")try{$s.onPostCommitFiberRoot(Dt,l)}catch{}return!0}finally{L.p=n,m.T=t,Mu(s,a)}}function Lu(s,a,e){a=ua(e,a),a=oi(s.stateNode,a,2),s=le(s,a,2),s!==null&&(Bt(s,2),La(s))}function ls(s,a,e){if(s.tag===3)Lu(s,s,e);else for(;a!==null;){if(a.tag===3){Lu(a,s,e);break}else if(a.tag===1){var t=a.stateNode;if(typeof a.type.getDerivedStateFromError=="function"||typeof t.componentDidCatch=="function"&&(ue===null||!ue.has(t))){s=ua(e,s),e=Br(2),t=le(a,e,2),t!==null&&(Er(e,t,a,s),Bt(t,2),La(t));break}}a=a.return}}function zi(s,a,e){var t=s.pingCache;if(t===null){t=s.pingCache=new i_;var n=new Set;t.set(a,n)}else n=t.get(a),n===void 0&&(n=new Set,t.set(a,n));n.has(e)||(Si=!0,n.add(e),s=v_.bind(null,s,a,e),a.then(s,s))}function v_(s,a,e){var t=s.pingCache;t!==null&&t.delete(a),s.pingedLanes|=s.suspendedLanes&e,s.warmLanes&=~e,us===s&&(F&e)===e&&(hs===4||hs===3&&(F&62914560)===F&&300>Ws()-hl?(es&2)===0&&wt(s,0):Mi|=e,bt===F&&(bt=0)),La(s)}function Bu(s,a){a===0&&(a=xo()),s=Le(s,a),s!==null&&(Bt(s,a),La(s))}function p_(s){var a=s.memoizedState,e=0;a!==null&&(e=a.retryLane),Bu(s,e)}function __(s,a){var e=0;switch(s.tag){case 31:case 13:var t=s.stateNode,n=s.memoizedState;n!==null&&(e=n.retryLane);break;case 19:t=s.stateNode;break;case 22:t=s.stateNode._retryCache;break;default:throw Error(_(314))}t!==null&&t.delete(a),Bu(s,e)}function f_(s,a){return Ql(s,a)}var xl=null,kt=null,Ni=!1,Cl=!1,Oi=!1,_e=0;function La(s){s!==kt&&s.next===null&&(kt===null?xl=kt=s:kt=kt.next=s),Cl=!0,Ni||(Ni=!0,b_())}function rn(s,a){if(!Oi&&Cl){Oi=!0;do for(var e=!1,t=xl;t!==null;){if(s!==0){var n=t.pendingLanes;if(n===0)var l=0;else{var d=t.suspendedLanes,i=t.pingedLanes;l=(1<<31-Ps(42|s)+1)-1,l&=n&~(d&~i),l=l&201326741?l&201326741|1:l?l|2:0}l!==0&&(e=!0,zu(t,l))}else l=F,l=Ln(t,t===us?l:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),(l&3)===0||Lt(t,l)||(e=!0,zu(t,l));t=t.next}while(e);Oi=!1}}function h_(){Eu()}function Eu(){Cl=Ni=!1;var s=0;_e!==0&&D_()&&(s=_e);for(var a=Ws(),e=null,t=xl;t!==null;){var n=t.next,l=Tu(t,a);l===0?(t.next=null,e===null?xl=n:e.next=n,n===null&&(kt=e)):(e=t,(s!==0||(l&3)!==0)&&(Cl=!0)),t=n}Cs!==0&&Cs!==5||rn(s),_e!==0&&(_e=0)}function Tu(s,a){for(var e=s.suspendedLanes,t=s.pingedLanes,n=s.expirationTimes,l=s.pendingLanes&-62914561;0<l;){var d=31-Ps(l),i=1<<d,o=n[d];o===-1?((i&e)===0||(i&t)!==0)&&(n[d]=Yv(i,a)):o<=a&&(s.expiredLanes|=i),l&=~i}if(a=us,e=F,e=Ln(s,s===a?e:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),t=s.callbackNode,e===0||s===a&&(ns===2||ns===9)||s.cancelPendingCommit!==null)return t!==null&&t!==null&&Kl(t),s.callbackNode=null,s.callbackPriority=0;if((e&3)===0||Lt(s,e)){if(a=e&-e,a===s.callbackPriority)return a;switch(t!==null&&Kl(t),Il(e)){case 2:case 8:e=ko;break;case 32:e=Cn;break;case 268435456:e=yo;break;default:e=Cn}return t=Au.bind(null,s),e=Ql(e,t),s.callbackPriority=a,s.callbackNode=e,a}return t!==null&&t!==null&&Kl(t),s.callbackPriority=2,s.callbackNode=null,2}function Au(s,a){if(Cs!==0&&Cs!==5)return s.callbackNode=null,s.callbackPriority=0,null;var e=s.callbackNode;if(yl()&&s.callbackNode!==e)return null;var t=F;return t=Ln(s,s===us?t:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),t===0?null:(pu(s,t,a),Tu(s,Ws()),s.callbackNode!=null&&s.callbackNode===e?Au.bind(null,s):null)}function zu(s,a){if(yl())return null;pu(s,a,!0)}function b_(){B_(function(){(es&6)!==0?Ql(mo,h_):Eu()})}function Hi(){if(_e===0){var s=dt;s===0&&(s=Sn,Sn<<=1,(Sn&261888)===0&&(Sn=256)),_e=s}return _e}function Nu(s){return s==null||typeof s=="symbol"||typeof s=="boolean"?null:typeof s=="function"?s:An(""+s)}function Ou(s,a){var e=a.ownerDocument.createElement("input");return e.name=a.name,e.value=a.value,s.id&&e.setAttribute("form",s.id),a.parentNode.insertBefore(e,a),s=new FormData(s),e.parentNode.removeChild(e),s}function g_(s,a,e,t,n){if(a==="submit"&&e&&e.stateNode===n){var l=Nu((n[Ys]||null).action),d=t.submitter;d&&(a=(a=d[Ys]||null)?Nu(a.formAction):d.getAttribute("formAction"),a!==null&&(l=a,d=null));var i=new Hn("action","action",null,t,n);s.push({event:i,listeners:[{instance:null,listener:function(){if(t.defaultPrevented){if(_e!==0){var o=d?Ou(n,d):new FormData(n);ei(e,{pending:!0,data:o,method:n.method,action:l},null,o)}}else typeof l=="function"&&(i.preventDefault(),o=d?Ou(n,d):new FormData(n),ei(e,{pending:!0,data:o,method:n.method,action:l},l,o))},currentTarget:n}]})}}for(var Vi=0;Vi<wd.length;Vi++){var ji=wd[Vi],w_=ji.toLowerCase(),m_=ji[0].toUpperCase()+ji.slice(1);wa(w_,"on"+m_)}wa(vc,"onAnimationEnd"),wa(pc,"onAnimationIteration"),wa(_c,"onAnimationStart"),wa("dblclick","onDoubleClick"),wa("focusin","onFocus"),wa("focusout","onBlur"),wa(Hp,"onTransitionRun"),wa(Vp,"onTransitionStart"),wa(jp,"onTransitionCancel"),wa(fc,"onTransitionEnd"),Qe("onMouseEnter",["mouseout","mouseover"]),Qe("onMouseLeave",["mouseout","mouseover"]),Qe("onPointerEnter",["pointerout","pointerover"]),Qe("onPointerLeave",["pointerout","pointerover"]),Ce("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ce("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ce("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ce("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ce("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ce("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var un="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),k_=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(un));function Hu(s,a){a=(a&4)!==0;for(var e=0;e<s.length;e++){var t=s[e],n=t.event;t=t.listeners;s:{var l=void 0;if(a)for(var d=t.length-1;0<=d;d--){var i=t[d],o=i.instance,h=i.currentTarget;if(i=i.listener,o!==l&&n.isPropagationStopped())break s;l=i,n.currentTarget=h;try{l(n)}catch(w){Un(w)}n.currentTarget=null,l=o}else for(d=0;d<t.length;d++){if(i=t[d],o=i.instance,h=i.currentTarget,i=i.listener,o!==l&&n.isPropagationStopped())break s;l=i,n.currentTarget=h;try{l(n)}catch(w){Un(w)}n.currentTarget=null,l=o}}}}function J(s,a){var e=a[Wl];e===void 0&&(e=a[Wl]=new Set);var t=s+"__bubble";e.has(t)||(Vu(a,s,2,!1),e.add(t))}function Ui(s,a,e){var t=0;a&&(t|=4),Vu(e,s,t,a)}var Sl="_reactListening"+Math.random().toString(36).slice(2);function Ri(s){if(!s[Sl]){s[Sl]=!0,Eo.forEach(function(e){e!=="selectionchange"&&(k_.has(e)||Ui(e,!1,s),Ui(e,!0,s))});var a=s.nodeType===9?s:s.ownerDocument;a===null||a[Sl]||(a[Sl]=!0,Ui("selectionchange",!1,a))}}function Vu(s,a,e,t){switch(vv(a)){case 2:var n=F_;break;case 8:n=I_;break;default:n=ao}e=n.bind(null,a,e,s),n=void 0,!dd||a!=="touchstart"&&a!=="touchmove"&&a!=="wheel"||(n=!0),t?n!==void 0?s.addEventListener(a,e,{capture:!0,passive:n}):s.addEventListener(a,e,!0):n!==void 0?s.addEventListener(a,e,{passive:n}):s.addEventListener(a,e,!1)}function qi(s,a,e,t,n){var l=t;if((a&1)===0&&(a&2)===0&&t!==null)s:for(;;){if(t===null)return;var d=t.tag;if(d===3||d===4){var i=t.stateNode.containerInfo;if(i===n)break;if(d===4)for(d=t.return;d!==null;){var o=d.tag;if((o===3||o===4)&&d.stateNode.containerInfo===n)return;d=d.return}for(;i!==null;){if(d=Ye(i),d===null)return;if(o=d.tag,o===5||o===6||o===26||o===27){t=l=d;continue s}i=i.parentNode}}t=t.return}Zo(function(){var h=l,w=nd(e),y=[];s:{var b=hc.get(s);if(b!==void 0){var g=Hn,T=s;switch(s){case"keypress":if(Nn(e)===0)break s;case"keydown":case"keyup":g=_p;break;case"focusin":T="focus",g=rd;break;case"focusout":T="blur",g=rd;break;case"beforeblur":case"afterblur":g=rd;break;case"click":if(e.button===2)break s;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=Xo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=ep;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=bp;break;case vc:case pc:case _c:g=lp;break;case fc:g=wp;break;case"scroll":case"scrollend":g=sp;break;case"wheel":g=kp;break;case"copy":case"cut":case"paste":g=ip;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=Ko;break;case"toggle":case"beforetoggle":g=xp}var R=(a&4)!==0,cs=!R&&(s==="scroll"||s==="scrollend"),p=R?b!==null?b+"Capture":null:b;R=[];for(var r=h,f;r!==null;){var k=r;if(f=k.stateNode,k=k.tag,k!==5&&k!==26&&k!==27||f===null||p===null||(k=At(r,p),k!=null&&R.push(vn(r,k,f))),cs)break;r=r.return}0<R.length&&(b=new g(b,T,null,e,w),y.push({event:b,listeners:R}))}}if((a&7)===0){s:{if(b=s==="mouseover"||s==="pointerover",g=s==="mouseout"||s==="pointerout",b&&e!==td&&(T=e.relatedTarget||e.fromElement)&&(Ye(T)||T[Ze]))break s;if((g||b)&&(b=w.window===w?w:(b=w.ownerDocument)?b.defaultView||b.parentWindow:window,g?(T=e.relatedTarget||e.toElement,g=h,T=T?Ye(T):null,T!==null&&(cs=N(T),R=T.tag,T!==cs||R!==5&&R!==27&&R!==6)&&(T=null)):(g=null,T=h),g!==T)){if(R=Xo,k="onMouseLeave",p="onMouseEnter",r="mouse",(s==="pointerout"||s==="pointerover")&&(R=Ko,k="onPointerLeave",p="onPointerEnter",r="pointer"),cs=g==null?b:Tt(g),f=T==null?b:Tt(T),b=new R(k,r+"leave",g,e,w),b.target=cs,b.relatedTarget=f,k=null,Ye(w)===h&&(R=new R(p,r+"enter",T,e,w),R.target=f,R.relatedTarget=cs,k=R),cs=k,g&&T)a:{for(R=y_,p=g,r=T,f=0,k=p;k;k=R(k))f++;k=0;for(var H=r;H;H=R(H))k++;for(;0<f-k;)p=R(p),f--;for(;0<k-f;)r=R(r),k--;for(;f--;){if(p===r||r!==null&&p===r.alternate){R=p;break a}p=R(p),r=R(r)}R=null}else R=null;g!==null&&ju(y,b,g,R,!1),T!==null&&cs!==null&&ju(y,cs,T,R,!0)}}s:{if(b=h?Tt(h):window,g=b.nodeName&&b.nodeName.toLowerCase(),g==="select"||g==="input"&&b.type==="file")var ss=ac;else if(Po(b))if(ec)ss=zp;else{ss=Tp;var z=Ep}else g=b.nodeName,!g||g.toLowerCase()!=="input"||b.type!=="checkbox"&&b.type!=="radio"?h&&ed(h.elementType)&&(ss=ac):ss=Ap;if(ss&&(ss=ss(s,h))){sc(y,ss,e,w);break s}z&&z(s,b,h),s==="focusout"&&h&&b.type==="number"&&h.memoizedProps.value!=null&&ad(b,"number",b.value)}switch(z=h?Tt(h):window,s){case"focusin":(Po(z)||z.contentEditable==="true")&&($e=z,hd=h,Rt=null);break;case"focusout":Rt=hd=$e=null;break;case"mousedown":bd=!0;break;case"contextmenu":case"mouseup":case"dragend":bd=!1,rc(y,e,w);break;case"selectionchange":if(Op)break;case"keydown":case"keyup":rc(y,e,w)}var X;if(vd)s:{switch(s){case"compositionstart":var I="onCompositionStart";break s;case"compositionend":I="onCompositionEnd";break s;case"compositionupdate":I="onCompositionUpdate";break s}I=void 0}else We?Wo(s,e)&&(I="onCompositionEnd"):s==="keydown"&&e.keyCode===229&&(I="onCompositionStart");I&&(Jo&&e.locale!=="ko"&&(We||I!=="onCompositionStart"?I==="onCompositionEnd"&&We&&(X=Yo()):($a=w,id="value"in $a?$a.value:$a.textContent,We=!0)),z=Ml(h,I),0<z.length&&(I=new Qo(I,s,null,e,w),y.push({event:I,listeners:z}),X?I.data=X:(X=$o(e),X!==null&&(I.data=X)))),(X=Sp?Mp(s,e):Dp(s,e))&&(I=Ml(h,"onBeforeInput"),0<I.length&&(z=new Qo("onBeforeInput","beforeinput",null,e,w),y.push({event:z,listeners:I}),z.data=X)),g_(y,s,h,e,w)}Hu(y,a)})}function vn(s,a,e){return{instance:s,listener:a,currentTarget:e}}function Ml(s,a){for(var e=a+"Capture",t=[];s!==null;){var n=s,l=n.stateNode;if(n=n.tag,n!==5&&n!==26&&n!==27||l===null||(n=At(s,e),n!=null&&t.unshift(vn(s,n,l)),n=At(s,a),n!=null&&t.push(vn(s,n,l))),s.tag===3)return t;s=s.return}return[]}function y_(s){if(s===null)return null;do s=s.return;while(s&&s.tag!==5&&s.tag!==27);return s||null}function ju(s,a,e,t,n){for(var l=a._reactName,d=[];e!==null&&e!==t;){var i=e,o=i.alternate,h=i.stateNode;if(i=i.tag,o!==null&&o===t)break;i!==5&&i!==26&&i!==27||h===null||(o=h,n?(h=At(e,l),h!=null&&d.unshift(vn(e,h,o))):n||(h=At(e,l),h!=null&&d.push(vn(e,h,o)))),e=e.return}d.length!==0&&s.push({event:a,listeners:d})}var x_=/\r\n?/g,C_=/\u0000|\uFFFD/g;function Uu(s){return(typeof s=="string"?s:""+s).replace(x_,`
`).replace(C_,"")}function Ru(s,a){return a=Uu(a),Uu(s)===a}function os(s,a,e,t,n,l){switch(e){case"children":typeof t=="string"?a==="body"||a==="textarea"&&t===""||Je(s,t):(typeof t=="number"||typeof t=="bigint")&&a!=="body"&&Je(s,""+t);break;case"className":En(s,"class",t);break;case"tabIndex":En(s,"tabindex",t);break;case"dir":case"role":case"viewBox":case"width":case"height":En(s,e,t);break;case"style":Ro(s,t,l);break;case"data":if(a!=="object"){En(s,"data",t);break}case"src":case"href":if(t===""&&(a!=="a"||e!=="href")){s.removeAttribute(e);break}if(t==null||typeof t=="function"||typeof t=="symbol"||typeof t=="boolean"){s.removeAttribute(e);break}t=An(""+t),s.setAttribute(e,t);break;case"action":case"formAction":if(typeof t=="function"){s.setAttribute(e,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof l=="function"&&(e==="formAction"?(a!=="input"&&os(s,a,"name",n.name,n,null),os(s,a,"formEncType",n.formEncType,n,null),os(s,a,"formMethod",n.formMethod,n,null),os(s,a,"formTarget",n.formTarget,n,null)):(os(s,a,"encType",n.encType,n,null),os(s,a,"method",n.method,n,null),os(s,a,"target",n.target,n,null)));if(t==null||typeof t=="symbol"||typeof t=="boolean"){s.removeAttribute(e);break}t=An(""+t),s.setAttribute(e,t);break;case"onClick":t!=null&&(s.onclick=Aa);break;case"onScroll":t!=null&&J("scroll",s);break;case"onScrollEnd":t!=null&&J("scrollend",s);break;case"dangerouslySetInnerHTML":if(t!=null){if(typeof t!="object"||!("__html"in t))throw Error(_(61));if(e=t.__html,e!=null){if(n.children!=null)throw Error(_(60));s.innerHTML=e}}break;case"multiple":s.multiple=t&&typeof t!="function"&&typeof t!="symbol";break;case"muted":s.muted=t&&typeof t!="function"&&typeof t!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(t==null||typeof t=="function"||typeof t=="boolean"||typeof t=="symbol"){s.removeAttribute("xlink:href");break}e=An(""+t),s.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",e);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":t!=null&&typeof t!="function"&&typeof t!="symbol"?s.setAttribute(e,""+t):s.removeAttribute(e);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":t&&typeof t!="function"&&typeof t!="symbol"?s.setAttribute(e,""):s.removeAttribute(e);break;case"capture":case"download":t===!0?s.setAttribute(e,""):t!==!1&&t!=null&&typeof t!="function"&&typeof t!="symbol"?s.setAttribute(e,t):s.removeAttribute(e);break;case"cols":case"rows":case"size":case"span":t!=null&&typeof t!="function"&&typeof t!="symbol"&&!isNaN(t)&&1<=t?s.setAttribute(e,t):s.removeAttribute(e);break;case"rowSpan":case"start":t==null||typeof t=="function"||typeof t=="symbol"||isNaN(t)?s.removeAttribute(e):s.setAttribute(e,t);break;case"popover":J("beforetoggle",s),J("toggle",s),Bn(s,"popover",t);break;case"xlinkActuate":Ta(s,"http://www.w3.org/1999/xlink","xlink:actuate",t);break;case"xlinkArcrole":Ta(s,"http://www.w3.org/1999/xlink","xlink:arcrole",t);break;case"xlinkRole":Ta(s,"http://www.w3.org/1999/xlink","xlink:role",t);break;case"xlinkShow":Ta(s,"http://www.w3.org/1999/xlink","xlink:show",t);break;case"xlinkTitle":Ta(s,"http://www.w3.org/1999/xlink","xlink:title",t);break;case"xlinkType":Ta(s,"http://www.w3.org/1999/xlink","xlink:type",t);break;case"xmlBase":Ta(s,"http://www.w3.org/XML/1998/namespace","xml:base",t);break;case"xmlLang":Ta(s,"http://www.w3.org/XML/1998/namespace","xml:lang",t);break;case"xmlSpace":Ta(s,"http://www.w3.org/XML/1998/namespace","xml:space",t);break;case"is":Bn(s,"is",t);break;case"innerText":case"textContent":break;default:(!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(e=$v.get(e)||e,Bn(s,e,t))}}function Zi(s,a,e,t,n,l){switch(e){case"style":Ro(s,t,l);break;case"dangerouslySetInnerHTML":if(t!=null){if(typeof t!="object"||!("__html"in t))throw Error(_(61));if(e=t.__html,e!=null){if(n.children!=null)throw Error(_(60));s.innerHTML=e}}break;case"children":typeof t=="string"?Je(s,t):(typeof t=="number"||typeof t=="bigint")&&Je(s,""+t);break;case"onScroll":t!=null&&J("scroll",s);break;case"onScrollEnd":t!=null&&J("scrollend",s);break;case"onClick":t!=null&&(s.onclick=Aa);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!To.hasOwnProperty(e))s:{if(e[0]==="o"&&e[1]==="n"&&(n=e.endsWith("Capture"),a=e.slice(2,n?e.length-7:void 0),l=s[Ys]||null,l=l!=null?l[e]:null,typeof l=="function"&&s.removeEventListener(a,l,n),typeof t=="function")){typeof l!="function"&&l!==null&&(e in s?s[e]=null:s.hasAttribute(e)&&s.removeAttribute(e)),s.addEventListener(a,t,n);break s}e in s?s[e]=t:t===!0?s.setAttribute(e,""):Bn(s,e,t)}}}function Ts(s,a,e){switch(a){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":J("error",s),J("load",s);var t=!1,n=!1,l;for(l in e)if(e.hasOwnProperty(l)){var d=e[l];if(d!=null)switch(l){case"src":t=!0;break;case"srcSet":n=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(_(137,a));default:os(s,a,l,d,e,null)}}n&&os(s,a,"srcSet",e.srcSet,e,null),t&&os(s,a,"src",e.src,e,null);return;case"input":J("invalid",s);var i=l=d=n=null,o=null,h=null;for(t in e)if(e.hasOwnProperty(t)){var w=e[t];if(w!=null)switch(t){case"name":n=w;break;case"type":d=w;break;case"checked":o=w;break;case"defaultChecked":h=w;break;case"value":l=w;break;case"defaultValue":i=w;break;case"children":case"dangerouslySetInnerHTML":if(w!=null)throw Error(_(137,a));break;default:os(s,a,t,w,e,null)}}Ho(s,l,i,o,h,d,n,!1);return;case"select":J("invalid",s),t=d=l=null;for(n in e)if(e.hasOwnProperty(n)&&(i=e[n],i!=null))switch(n){case"value":l=i;break;case"defaultValue":d=i;break;case"multiple":t=i;default:os(s,a,n,i,e,null)}a=l,e=d,s.multiple=!!t,a!=null?Ke(s,!!t,a,!1):e!=null&&Ke(s,!!t,e,!0);return;case"textarea":J("invalid",s),l=n=t=null;for(d in e)if(e.hasOwnProperty(d)&&(i=e[d],i!=null))switch(d){case"value":t=i;break;case"defaultValue":n=i;break;case"children":l=i;break;case"dangerouslySetInnerHTML":if(i!=null)throw Error(_(91));break;default:os(s,a,d,i,e,null)}jo(s,t,n,l);return;case"option":for(o in e)if(e.hasOwnProperty(o)&&(t=e[o],t!=null))switch(o){case"selected":s.selected=t&&typeof t!="function"&&typeof t!="symbol";break;default:os(s,a,o,t,e,null)}return;case"dialog":J("beforetoggle",s),J("toggle",s),J("cancel",s),J("close",s);break;case"iframe":case"object":J("load",s);break;case"video":case"audio":for(t=0;t<un.length;t++)J(un[t],s);break;case"image":J("error",s),J("load",s);break;case"details":J("toggle",s);break;case"embed":case"source":case"link":J("error",s),J("load",s);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(h in e)if(e.hasOwnProperty(h)&&(t=e[h],t!=null))switch(h){case"children":case"dangerouslySetInnerHTML":throw Error(_(137,a));default:os(s,a,h,t,e,null)}return;default:if(ed(a)){for(w in e)e.hasOwnProperty(w)&&(t=e[w],t!==void 0&&Zi(s,a,w,t,e,void 0));return}}for(i in e)e.hasOwnProperty(i)&&(t=e[i],t!=null&&os(s,a,i,t,e,null))}function S_(s,a,e,t){switch(a){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var n=null,l=null,d=null,i=null,o=null,h=null,w=null;for(g in e){var y=e[g];if(e.hasOwnProperty(g)&&y!=null)switch(g){case"checked":break;case"value":break;case"defaultValue":o=y;default:t.hasOwnProperty(g)||os(s,a,g,null,t,y)}}for(var b in t){var g=t[b];if(y=e[b],t.hasOwnProperty(b)&&(g!=null||y!=null))switch(b){case"type":l=g;break;case"name":n=g;break;case"checked":h=g;break;case"defaultChecked":w=g;break;case"value":d=g;break;case"defaultValue":i=g;break;case"children":case"dangerouslySetInnerHTML":if(g!=null)throw Error(_(137,a));break;default:g!==y&&os(s,a,b,g,t,y)}}sd(s,d,i,o,h,w,l,n);return;case"select":g=d=i=b=null;for(l in e)if(o=e[l],e.hasOwnProperty(l)&&o!=null)switch(l){case"value":break;case"multiple":g=o;default:t.hasOwnProperty(l)||os(s,a,l,null,t,o)}for(n in t)if(l=t[n],o=e[n],t.hasOwnProperty(n)&&(l!=null||o!=null))switch(n){case"value":b=l;break;case"defaultValue":i=l;break;case"multiple":d=l;default:l!==o&&os(s,a,n,l,t,o)}a=i,e=d,t=g,b!=null?Ke(s,!!e,b,!1):!!t!=!!e&&(a!=null?Ke(s,!!e,a,!0):Ke(s,!!e,e?[]:"",!1));return;case"textarea":g=b=null;for(i in e)if(n=e[i],e.hasOwnProperty(i)&&n!=null&&!t.hasOwnProperty(i))switch(i){case"value":break;case"children":break;default:os(s,a,i,null,t,n)}for(d in t)if(n=t[d],l=e[d],t.hasOwnProperty(d)&&(n!=null||l!=null))switch(d){case"value":b=n;break;case"defaultValue":g=n;break;case"children":break;case"dangerouslySetInnerHTML":if(n!=null)throw Error(_(91));break;default:n!==l&&os(s,a,d,n,t,l)}Vo(s,b,g);return;case"option":for(var T in e)if(b=e[T],e.hasOwnProperty(T)&&b!=null&&!t.hasOwnProperty(T))switch(T){case"selected":s.selected=!1;break;default:os(s,a,T,null,t,b)}for(o in t)if(b=t[o],g=e[o],t.hasOwnProperty(o)&&b!==g&&(b!=null||g!=null))switch(o){case"selected":s.selected=b&&typeof b!="function"&&typeof b!="symbol";break;default:os(s,a,o,b,t,g)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var R in e)b=e[R],e.hasOwnProperty(R)&&b!=null&&!t.hasOwnProperty(R)&&os(s,a,R,null,t,b);for(h in t)if(b=t[h],g=e[h],t.hasOwnProperty(h)&&b!==g&&(b!=null||g!=null))switch(h){case"children":case"dangerouslySetInnerHTML":if(b!=null)throw Error(_(137,a));break;default:os(s,a,h,b,t,g)}return;default:if(ed(a)){for(var cs in e)b=e[cs],e.hasOwnProperty(cs)&&b!==void 0&&!t.hasOwnProperty(cs)&&Zi(s,a,cs,void 0,t,b);for(w in t)b=t[w],g=e[w],!t.hasOwnProperty(w)||b===g||b===void 0&&g===void 0||Zi(s,a,w,b,t,g);return}}for(var p in e)b=e[p],e.hasOwnProperty(p)&&b!=null&&!t.hasOwnProperty(p)&&os(s,a,p,null,t,b);for(y in t)b=t[y],g=e[y],!t.hasOwnProperty(y)||b===g||b==null&&g==null||os(s,a,y,b,t,g)}function qu(s){switch(s){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function M_(){if(typeof performance.getEntriesByType=="function"){for(var s=0,a=0,e=performance.getEntriesByType("resource"),t=0;t<e.length;t++){var n=e[t],l=n.transferSize,d=n.initiatorType,i=n.duration;if(l&&i&&qu(d)){for(d=0,i=n.responseEnd,t+=1;t<e.length;t++){var o=e[t],h=o.startTime;if(h>i)break;var w=o.transferSize,y=o.initiatorType;w&&qu(y)&&(o=o.responseEnd,d+=w*(o<i?1:(i-h)/(o-h)))}if(--t,a+=8*(l+d)/(n.duration/1e3),s++,10<s)break}}if(0<s)return a/s/1e6}return navigator.connection&&(s=navigator.connection.downlink,typeof s=="number")?s:5}var Yi=null,Gi=null;function Dl(s){return s.nodeType===9?s:s.ownerDocument}function Zu(s){switch(s){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Yu(s,a){if(s===0)switch(a){case"svg":return 1;case"math":return 2;default:return 0}return s===1&&a==="foreignObject"?0:s}function Xi(s,a){return s==="textarea"||s==="noscript"||typeof a.children=="string"||typeof a.children=="number"||typeof a.children=="bigint"||typeof a.dangerouslySetInnerHTML=="object"&&a.dangerouslySetInnerHTML!==null&&a.dangerouslySetInnerHTML.__html!=null}var Qi=null;function D_(){var s=window.event;return s&&s.type==="popstate"?s===Qi?!1:(Qi=s,!0):(Qi=null,!1)}var Gu=typeof setTimeout=="function"?setTimeout:void 0,L_=typeof clearTimeout=="function"?clearTimeout:void 0,Xu=typeof Promise=="function"?Promise:void 0,B_=typeof queueMicrotask=="function"?queueMicrotask:typeof Xu<"u"?function(s){return Xu.resolve(null).then(s).catch(E_)}:Gu;function E_(s){setTimeout(function(){throw s})}function fe(s){return s==="head"}function Qu(s,a){var e=a,t=0;do{var n=e.nextSibling;if(s.removeChild(e),n&&n.nodeType===8)if(e=n.data,e==="/$"||e==="/&"){if(t===0){s.removeChild(n),St(a);return}t--}else if(e==="$"||e==="$?"||e==="$~"||e==="$!"||e==="&")t++;else if(e==="html")pn(s.ownerDocument.documentElement);else if(e==="head"){e=s.ownerDocument.head,pn(e);for(var l=e.firstChild;l;){var d=l.nextSibling,i=l.nodeName;l[Et]||i==="SCRIPT"||i==="STYLE"||i==="LINK"&&l.rel.toLowerCase()==="stylesheet"||e.removeChild(l),l=d}}else e==="body"&&pn(s.ownerDocument.body);e=n}while(e);St(a)}function Ku(s,a){var e=s;s=0;do{var t=e.nextSibling;if(e.nodeType===1?a?(e._stashedDisplay=e.style.display,e.style.display="none"):(e.style.display=e._stashedDisplay||"",e.getAttribute("style")===""&&e.removeAttribute("style")):e.nodeType===3&&(a?(e._stashedText=e.nodeValue,e.nodeValue=""):e.nodeValue=e._stashedText||""),t&&t.nodeType===8)if(e=t.data,e==="/$"){if(s===0)break;s--}else e!=="$"&&e!=="$?"&&e!=="$~"&&e!=="$!"||s++;e=t}while(e)}function Ki(s){var a=s.firstChild;for(a&&a.nodeType===10&&(a=a.nextSibling);a;){var e=a;switch(a=a.nextSibling,e.nodeName){case"HTML":case"HEAD":case"BODY":Ki(e),$l(e);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(e.rel.toLowerCase()==="stylesheet")continue}s.removeChild(e)}}function T_(s,a,e,t){for(;s.nodeType===1;){var n=e;if(s.nodeName.toLowerCase()!==a.toLowerCase()){if(!t&&(s.nodeName!=="INPUT"||s.type!=="hidden"))break}else if(t){if(!s[Et])switch(a){case"meta":if(!s.hasAttribute("itemprop"))break;return s;case"link":if(l=s.getAttribute("rel"),l==="stylesheet"&&s.hasAttribute("data-precedence"))break;if(l!==n.rel||s.getAttribute("href")!==(n.href==null||n.href===""?null:n.href)||s.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin)||s.getAttribute("title")!==(n.title==null?null:n.title))break;return s;case"style":if(s.hasAttribute("data-precedence"))break;return s;case"script":if(l=s.getAttribute("src"),(l!==(n.src==null?null:n.src)||s.getAttribute("type")!==(n.type==null?null:n.type)||s.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin))&&l&&s.hasAttribute("async")&&!s.hasAttribute("itemprop"))break;return s;default:return s}}else if(a==="input"&&s.type==="hidden"){var l=n.name==null?null:""+n.name;if(n.type==="hidden"&&s.getAttribute("name")===l)return s}else return s;if(s=ha(s.nextSibling),s===null)break}return null}function A_(s,a,e){if(a==="")return null;for(;s.nodeType!==3;)if((s.nodeType!==1||s.nodeName!=="INPUT"||s.type!=="hidden")&&!e||(s=ha(s.nextSibling),s===null))return null;return s}function Ju(s,a){for(;s.nodeType!==8;)if((s.nodeType!==1||s.nodeName!=="INPUT"||s.type!=="hidden")&&!a||(s=ha(s.nextSibling),s===null))return null;return s}function Ji(s){return s.data==="$?"||s.data==="$~"}function Fi(s){return s.data==="$!"||s.data==="$?"&&s.ownerDocument.readyState!=="loading"}function z_(s,a){var e=s.ownerDocument;if(s.data==="$~")s._reactRetry=a;else if(s.data!=="$?"||e.readyState!=="loading")a();else{var t=function(){a(),e.removeEventListener("DOMContentLoaded",t)};e.addEventListener("DOMContentLoaded",t),s._reactRetry=t}}function ha(s){for(;s!=null;s=s.nextSibling){var a=s.nodeType;if(a===1||a===3)break;if(a===8){if(a=s.data,a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"||a==="F!"||a==="F")break;if(a==="/$"||a==="/&")return null}}return s}var Ii=null;function Fu(s){s=s.nextSibling;for(var a=0;s;){if(s.nodeType===8){var e=s.data;if(e==="/$"||e==="/&"){if(a===0)return ha(s.nextSibling);a--}else e!=="$"&&e!=="$!"&&e!=="$?"&&e!=="$~"&&e!=="&"||a++}s=s.nextSibling}return null}function Iu(s){s=s.previousSibling;for(var a=0;s;){if(s.nodeType===8){var e=s.data;if(e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"){if(a===0)return s;a--}else e!=="/$"&&e!=="/&"||a++}s=s.previousSibling}return null}function Wu(s,a,e){switch(a=Dl(e),s){case"html":if(s=a.documentElement,!s)throw Error(_(452));return s;case"head":if(s=a.head,!s)throw Error(_(453));return s;case"body":if(s=a.body,!s)throw Error(_(454));return s;default:throw Error(_(451))}}function pn(s){for(var a=s.attributes;a.length;)s.removeAttributeNode(a[0]);$l(s)}var ba=new Map,$u=new Set;function Ll(s){return typeof s.getRootNode=="function"?s.getRootNode():s.nodeType===9?s:s.ownerDocument}var Ja=L.d;L.d={f:N_,r:O_,D:H_,C:V_,L:j_,m:U_,X:q_,S:R_,M:Z_};function N_(){var s=Ja.f(),a=wl();return s||a}function O_(s){var a=Ge(s);a!==null&&a.tag===5&&a.type==="form"?fr(a):Ja.r(s)}var yt=typeof document>"u"?null:document;function Pu(s,a,e){var t=yt;if(t&&typeof a=="string"&&a){var n=ca(a);n='link[rel="'+s+'"][href="'+n+'"]',typeof e=="string"&&(n+='[crossorigin="'+e+'"]'),$u.has(n)||($u.add(n),s={rel:s,crossOrigin:e,href:a},t.querySelector(n)===null&&(a=t.createElement("link"),Ts(a,"link",s),Ss(a),t.head.appendChild(a)))}}function H_(s){Ja.D(s),Pu("dns-prefetch",s,null)}function V_(s,a){Ja.C(s,a),Pu("preconnect",s,a)}function j_(s,a,e){Ja.L(s,a,e);var t=yt;if(t&&s&&a){var n='link[rel="preload"][as="'+ca(a)+'"]';a==="image"&&e&&e.imageSrcSet?(n+='[imagesrcset="'+ca(e.imageSrcSet)+'"]',typeof e.imageSizes=="string"&&(n+='[imagesizes="'+ca(e.imageSizes)+'"]')):n+='[href="'+ca(s)+'"]';var l=n;switch(a){case"style":l=xt(s);break;case"script":l=Ct(s)}ba.has(l)||(s=O({rel:"preload",href:a==="image"&&e&&e.imageSrcSet?void 0:s,as:a},e),ba.set(l,s),t.querySelector(n)!==null||a==="style"&&t.querySelector(_n(l))||a==="script"&&t.querySelector(fn(l))||(a=t.createElement("link"),Ts(a,"link",s),Ss(a),t.head.appendChild(a)))}}function U_(s,a){Ja.m(s,a);var e=yt;if(e&&s){var t=a&&typeof a.as=="string"?a.as:"script",n='link[rel="modulepreload"][as="'+ca(t)+'"][href="'+ca(s)+'"]',l=n;switch(t){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":l=Ct(s)}if(!ba.has(l)&&(s=O({rel:"modulepreload",href:s},a),ba.set(l,s),e.querySelector(n)===null)){switch(t){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(e.querySelector(fn(l)))return}t=e.createElement("link"),Ts(t,"link",s),Ss(t),e.head.appendChild(t)}}}function R_(s,a,e){Ja.S(s,a,e);var t=yt;if(t&&s){var n=Xe(t).hoistableStyles,l=xt(s);a=a||"default";var d=n.get(l);if(!d){var i={loading:0,preload:null};if(d=t.querySelector(_n(l)))i.loading=5;else{s=O({rel:"stylesheet",href:s,"data-precedence":a},e),(e=ba.get(l))&&Wi(s,e);var o=d=t.createElement("link");Ss(o),Ts(o,"link",s),o._p=new Promise(function(h,w){o.onload=h,o.onerror=w}),o.addEventListener("load",function(){i.loading|=1}),o.addEventListener("error",function(){i.loading|=2}),i.loading|=4,Bl(d,a,t)}d={type:"stylesheet",instance:d,count:1,state:i},n.set(l,d)}}}function q_(s,a){Ja.X(s,a);var e=yt;if(e&&s){var t=Xe(e).hoistableScripts,n=Ct(s),l=t.get(n);l||(l=e.querySelector(fn(n)),l||(s=O({src:s,async:!0},a),(a=ba.get(n))&&$i(s,a),l=e.createElement("script"),Ss(l),Ts(l,"link",s),e.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},t.set(n,l))}}function Z_(s,a){Ja.M(s,a);var e=yt;if(e&&s){var t=Xe(e).hoistableScripts,n=Ct(s),l=t.get(n);l||(l=e.querySelector(fn(n)),l||(s=O({src:s,async:!0,type:"module"},a),(a=ba.get(n))&&$i(s,a),l=e.createElement("script"),Ss(l),Ts(l,"link",s),e.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},t.set(n,l))}}function sv(s,a,e,t){var n=(n=Q.current)?Ll(n):null;if(!n)throw Error(_(446));switch(s){case"meta":case"title":return null;case"style":return typeof e.precedence=="string"&&typeof e.href=="string"?(a=xt(e.href),e=Xe(n).hoistableStyles,t=e.get(a),t||(t={type:"style",instance:null,count:0,state:null},e.set(a,t)),t):{type:"void",instance:null,count:0,state:null};case"link":if(e.rel==="stylesheet"&&typeof e.href=="string"&&typeof e.precedence=="string"){s=xt(e.href);var l=Xe(n).hoistableStyles,d=l.get(s);if(d||(n=n.ownerDocument||n,d={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},l.set(s,d),(l=n.querySelector(_n(s)))&&!l._p&&(d.instance=l,d.state.loading=5),ba.has(s)||(e={rel:"preload",as:"style",href:e.href,crossOrigin:e.crossOrigin,integrity:e.integrity,media:e.media,hrefLang:e.hrefLang,referrerPolicy:e.referrerPolicy},ba.set(s,e),l||Y_(n,s,e,d.state))),a&&t===null)throw Error(_(528,""));return d}if(a&&t!==null)throw Error(_(529,""));return null;case"script":return a=e.async,e=e.src,typeof e=="string"&&a&&typeof a!="function"&&typeof a!="symbol"?(a=Ct(e),e=Xe(n).hoistableScripts,t=e.get(a),t||(t={type:"script",instance:null,count:0,state:null},e.set(a,t)),t):{type:"void",instance:null,count:0,state:null};default:throw Error(_(444,s))}}function xt(s){return'href="'+ca(s)+'"'}function _n(s){return'link[rel="stylesheet"]['+s+"]"}function av(s){return O({},s,{"data-precedence":s.precedence,precedence:null})}function Y_(s,a,e,t){s.querySelector('link[rel="preload"][as="style"]['+a+"]")?t.loading=1:(a=s.createElement("link"),t.preload=a,a.addEventListener("load",function(){return t.loading|=1}),a.addEventListener("error",function(){return t.loading|=2}),Ts(a,"link",e),Ss(a),s.head.appendChild(a))}function Ct(s){return'[src="'+ca(s)+'"]'}function fn(s){return"script[async]"+s}function ev(s,a,e){if(a.count++,a.instance===null)switch(a.type){case"style":var t=s.querySelector('style[data-href~="'+ca(e.href)+'"]');if(t)return a.instance=t,Ss(t),t;var n=O({},e,{"data-href":e.href,"data-precedence":e.precedence,href:null,precedence:null});return t=(s.ownerDocument||s).createElement("style"),Ss(t),Ts(t,"style",n),Bl(t,e.precedence,s),a.instance=t;case"stylesheet":n=xt(e.href);var l=s.querySelector(_n(n));if(l)return a.state.loading|=4,a.instance=l,Ss(l),l;t=av(e),(n=ba.get(n))&&Wi(t,n),l=(s.ownerDocument||s).createElement("link"),Ss(l);var d=l;return d._p=new Promise(function(i,o){d.onload=i,d.onerror=o}),Ts(l,"link",t),a.state.loading|=4,Bl(l,e.precedence,s),a.instance=l;case"script":return l=Ct(e.src),(n=s.querySelector(fn(l)))?(a.instance=n,Ss(n),n):(t=e,(n=ba.get(l))&&(t=O({},e),$i(t,n)),s=s.ownerDocument||s,n=s.createElement("script"),Ss(n),Ts(n,"link",t),s.head.appendChild(n),a.instance=n);case"void":return null;default:throw Error(_(443,a.type))}else a.type==="stylesheet"&&(a.state.loading&4)===0&&(t=a.instance,a.state.loading|=4,Bl(t,e.precedence,s));return a.instance}function Bl(s,a,e){for(var t=e.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),n=t.length?t[t.length-1]:null,l=n,d=0;d<t.length;d++){var i=t[d];if(i.dataset.precedence===a)l=i;else if(l!==n)break}l?l.parentNode.insertBefore(s,l.nextSibling):(a=e.nodeType===9?e.head:e,a.insertBefore(s,a.firstChild))}function Wi(s,a){s.crossOrigin==null&&(s.crossOrigin=a.crossOrigin),s.referrerPolicy==null&&(s.referrerPolicy=a.referrerPolicy),s.title==null&&(s.title=a.title)}function $i(s,a){s.crossOrigin==null&&(s.crossOrigin=a.crossOrigin),s.referrerPolicy==null&&(s.referrerPolicy=a.referrerPolicy),s.integrity==null&&(s.integrity=a.integrity)}var El=null;function tv(s,a,e){if(El===null){var t=new Map,n=El=new Map;n.set(e,t)}else n=El,t=n.get(e),t||(t=new Map,n.set(e,t));if(t.has(s))return t;for(t.set(s,null),e=e.getElementsByTagName(s),n=0;n<e.length;n++){var l=e[n];if(!(l[Et]||l[Ds]||s==="link"&&l.getAttribute("rel")==="stylesheet")&&l.namespaceURI!=="http://www.w3.org/2000/svg"){var d=l.getAttribute(a)||"";d=s+d;var i=t.get(d);i?i.push(l):t.set(d,[l])}}return t}function nv(s,a,e){s=s.ownerDocument||s,s.head.insertBefore(e,a==="title"?s.querySelector("head > title"):null)}function G_(s,a,e){if(e===1||a.itemProp!=null)return!1;switch(s){case"meta":case"title":return!0;case"style":if(typeof a.precedence!="string"||typeof a.href!="string"||a.href==="")break;return!0;case"link":if(typeof a.rel!="string"||typeof a.href!="string"||a.href===""||a.onLoad||a.onError)break;switch(a.rel){case"stylesheet":return s=a.disabled,typeof a.precedence=="string"&&s==null;default:return!0}case"script":if(a.async&&typeof a.async!="function"&&typeof a.async!="symbol"&&!a.onLoad&&!a.onError&&a.src&&typeof a.src=="string")return!0}return!1}function lv(s){return!(s.type==="stylesheet"&&(s.state.loading&3)===0)}function X_(s,a,e,t){if(e.type==="stylesheet"&&(typeof t.media!="string"||matchMedia(t.media).matches!==!1)&&(e.state.loading&4)===0){if(e.instance===null){var n=xt(t.href),l=a.querySelector(_n(n));if(l){a=l._p,a!==null&&typeof a=="object"&&typeof a.then=="function"&&(s.count++,s=Tl.bind(s),a.then(s,s)),e.state.loading|=4,e.instance=l,Ss(l);return}l=a.ownerDocument||a,t=av(t),(n=ba.get(n))&&Wi(t,n),l=l.createElement("link"),Ss(l);var d=l;d._p=new Promise(function(i,o){d.onload=i,d.onerror=o}),Ts(l,"link",t),e.instance=l}s.stylesheets===null&&(s.stylesheets=new Map),s.stylesheets.set(e,a),(a=e.state.preload)&&(e.state.loading&3)===0&&(s.count++,e=Tl.bind(s),a.addEventListener("load",e),a.addEventListener("error",e))}}var Pi=0;function Q_(s,a){return s.stylesheets&&s.count===0&&zl(s,s.stylesheets),0<s.count||0<s.imgCount?function(e){var t=setTimeout(function(){if(s.stylesheets&&zl(s,s.stylesheets),s.unsuspend){var l=s.unsuspend;s.unsuspend=null,l()}},6e4+a);0<s.imgBytes&&Pi===0&&(Pi=62500*M_());var n=setTimeout(function(){if(s.waitingForImages=!1,s.count===0&&(s.stylesheets&&zl(s,s.stylesheets),s.unsuspend)){var l=s.unsuspend;s.unsuspend=null,l()}},(s.imgBytes>Pi?50:800)+a);return s.unsuspend=e,function(){s.unsuspend=null,clearTimeout(t),clearTimeout(n)}}:null}function Tl(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)zl(this,this.stylesheets);else if(this.unsuspend){var s=this.unsuspend;this.unsuspend=null,s()}}}var Al=null;function zl(s,a){s.stylesheets=null,s.unsuspend!==null&&(s.count++,Al=new Map,a.forEach(K_,s),Al=null,Tl.call(s))}function K_(s,a){if(!(a.state.loading&4)){var e=Al.get(s);if(e)var t=e.get(null);else{e=new Map,Al.set(s,e);for(var n=s.querySelectorAll("link[data-precedence],style[data-precedence]"),l=0;l<n.length;l++){var d=n[l];(d.nodeName==="LINK"||d.getAttribute("media")!=="not all")&&(e.set(d.dataset.precedence,d),t=d)}t&&e.set(null,t)}n=a.instance,d=n.getAttribute("data-precedence"),l=e.get(d)||t,l===t&&e.set(null,n),e.set(d,n),this.count++,t=Tl.bind(this),n.addEventListener("load",t),n.addEventListener("error",t),l?l.parentNode.insertBefore(n,l.nextSibling):(s=s.nodeType===9?s.head:s,s.insertBefore(n,s.firstChild)),a.state.loading|=4}}var hn={$$typeof:zs,Provider:null,Consumer:null,_currentValue:q,_currentValue2:q,_threadCount:0};function J_(s,a,e,t,n,l,d,i,o){this.tag=1,this.containerInfo=s,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Jl(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Jl(0),this.hiddenUpdates=Jl(null),this.identifierPrefix=t,this.onUncaughtError=n,this.onCaughtError=l,this.onRecoverableError=d,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.incompleteTransitions=new Map}function dv(s,a,e,t,n,l,d,i,o,h,w,y){return s=new J_(s,a,e,d,o,h,w,y,i),a=1,l===!0&&(a|=24),l=aa(3,null,null,a),s.current=l,l.stateNode=s,a=Ad(),a.refCount++,s.pooledCache=a,a.refCount++,l.memoizedState={element:t,isDehydrated:e,cache:a},Hd(l),s}function iv(s){return s?(s=at,s):at}function ov(s,a,e,t,n,l){n=iv(n),t.context===null?t.context=n:t.pendingContext=n,t=ne(a),t.payload={element:e},l=l===void 0?null:l,l!==null&&(t.callback=l),e=le(s,t,a),e!==null&&(Fs(e,s,a),Kt(e,s,a))}function cv(s,a){if(s=s.memoizedState,s!==null&&s.dehydrated!==null){var e=s.retryLane;s.retryLane=e!==0&&e<a?e:a}}function so(s,a){cv(s,a),(s=s.alternate)&&cv(s,a)}function rv(s){if(s.tag===13||s.tag===31){var a=Le(s,67108864);a!==null&&Fs(a,s,67108864),so(s,67108864)}}function uv(s){if(s.tag===13||s.tag===31){var a=da();a=Fl(a);var e=Le(s,a);e!==null&&Fs(e,s,a),so(s,a)}}var Nl=!0;function F_(s,a,e,t){var n=m.T;m.T=null;var l=L.p;try{L.p=2,ao(s,a,e,t)}finally{L.p=l,m.T=n}}function I_(s,a,e,t){var n=m.T;m.T=null;var l=L.p;try{L.p=8,ao(s,a,e,t)}finally{L.p=l,m.T=n}}function ao(s,a,e,t){if(Nl){var n=eo(t);if(n===null)qi(s,a,t,Ol,e),pv(s,t);else if($_(n,s,a,e,t))t.stopPropagation();else if(pv(s,t),a&4&&-1<W_.indexOf(s)){for(;n!==null;){var l=Ge(n);if(l!==null)switch(l.tag){case 3:if(l=l.stateNode,l.current.memoizedState.isDehydrated){var d=xe(l.pendingLanes);if(d!==0){var i=l;for(i.pendingLanes|=2,i.entangledLanes|=2;d;){var o=1<<31-Ps(d);i.entanglements[1]|=o,d&=~o}La(l),(es&6)===0&&(bl=Ws()+500,rn(0))}}break;case 31:case 13:i=Le(l,2),i!==null&&Fs(i,l,2),wl(),so(l,2)}if(l=eo(t),l===null&&qi(s,a,t,Ol,e),l===n)break;n=l}n!==null&&t.stopPropagation()}else qi(s,a,t,null,e)}}function eo(s){return s=nd(s),to(s)}var Ol=null;function to(s){if(Ol=null,s=Ye(s),s!==null){var a=N(s);if(a===null)s=null;else{var e=a.tag;if(e===13){if(s=V(a),s!==null)return s;s=null}else if(e===31){if(s=j(a),s!==null)return s;s=null}else if(e===3){if(a.stateNode.current.memoizedState.isDehydrated)return a.tag===3?a.stateNode.containerInfo:null;s=null}else a!==s&&(s=null)}}return Ol=s,null}function vv(s){switch(s){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Hv()){case mo:return 2;case ko:return 8;case Cn:case Vv:return 32;case yo:return 268435456;default:return 32}default:return 32}}var no=!1,he=null,be=null,ge=null,bn=new Map,gn=new Map,we=[],W_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function pv(s,a){switch(s){case"focusin":case"focusout":he=null;break;case"dragenter":case"dragleave":be=null;break;case"mouseover":case"mouseout":ge=null;break;case"pointerover":case"pointerout":bn.delete(a.pointerId);break;case"gotpointercapture":case"lostpointercapture":gn.delete(a.pointerId)}}function wn(s,a,e,t,n,l){return s===null||s.nativeEvent!==l?(s={blockedOn:a,domEventName:e,eventSystemFlags:t,nativeEvent:l,targetContainers:[n]},a!==null&&(a=Ge(a),a!==null&&rv(a)),s):(s.eventSystemFlags|=t,a=s.targetContainers,n!==null&&a.indexOf(n)===-1&&a.push(n),s)}function $_(s,a,e,t,n){switch(a){case"focusin":return he=wn(he,s,a,e,t,n),!0;case"dragenter":return be=wn(be,s,a,e,t,n),!0;case"mouseover":return ge=wn(ge,s,a,e,t,n),!0;case"pointerover":var l=n.pointerId;return bn.set(l,wn(bn.get(l)||null,s,a,e,t,n)),!0;case"gotpointercapture":return l=n.pointerId,gn.set(l,wn(gn.get(l)||null,s,a,e,t,n)),!0}return!1}function _v(s){var a=Ye(s.target);if(a!==null){var e=N(a);if(e!==null){if(a=e.tag,a===13){if(a=V(e),a!==null){s.blockedOn=a,Lo(s.priority,function(){uv(e)});return}}else if(a===31){if(a=j(e),a!==null){s.blockedOn=a,Lo(s.priority,function(){uv(e)});return}}else if(a===3&&e.stateNode.current.memoizedState.isDehydrated){s.blockedOn=e.tag===3?e.stateNode.containerInfo:null;return}}}s.blockedOn=null}function Hl(s){if(s.blockedOn!==null)return!1;for(var a=s.targetContainers;0<a.length;){var e=eo(s.nativeEvent);if(e===null){e=s.nativeEvent;var t=new e.constructor(e.type,e);td=t,e.target.dispatchEvent(t),td=null}else return a=Ge(e),a!==null&&rv(a),s.blockedOn=e,!1;a.shift()}return!0}function fv(s,a,e){Hl(s)&&e.delete(a)}function P_(){no=!1,he!==null&&Hl(he)&&(he=null),be!==null&&Hl(be)&&(be=null),ge!==null&&Hl(ge)&&(ge=null),bn.forEach(fv),gn.forEach(fv)}function Vl(s,a){s.blockedOn===a&&(s.blockedOn=null,no||(no=!0,v.unstable_scheduleCallback(v.unstable_NormalPriority,P_)))}var jl=null;function hv(s){jl!==s&&(jl=s,v.unstable_scheduleCallback(v.unstable_NormalPriority,function(){jl===s&&(jl=null);for(var a=0;a<s.length;a+=3){var e=s[a],t=s[a+1],n=s[a+2];if(typeof t!="function"){if(to(t||e)===null)continue;break}var l=Ge(e);l!==null&&(s.splice(a,3),a-=3,ei(l,{pending:!0,data:n,method:e.method,action:t},t,n))}}))}function St(s){function a(o){return Vl(o,s)}he!==null&&Vl(he,s),be!==null&&Vl(be,s),ge!==null&&Vl(ge,s),bn.forEach(a),gn.forEach(a);for(var e=0;e<we.length;e++){var t=we[e];t.blockedOn===s&&(t.blockedOn=null)}for(;0<we.length&&(e=we[0],e.blockedOn===null);)_v(e),e.blockedOn===null&&we.shift();if(e=(s.ownerDocument||s).$$reactFormReplay,e!=null)for(t=0;t<e.length;t+=3){var n=e[t],l=e[t+1],d=n[Ys]||null;if(typeof l=="function")d||hv(e);else if(d){var i=null;if(l&&l.hasAttribute("formAction")){if(n=l,d=l[Ys]||null)i=d.formAction;else if(to(n)!==null)continue}else i=d.action;typeof i=="function"?e[t+1]=i:(e.splice(t,3),t-=3),hv(e)}}}function bv(){function s(l){l.canIntercept&&l.info==="react-transition"&&l.intercept({handler:function(){return new Promise(function(d){return n=d})},focusReset:"manual",scroll:"manual"})}function a(){n!==null&&(n(),n=null),t||setTimeout(e,20)}function e(){if(!t&&!navigation.transition){var l=navigation.currentEntry;l&&l.url!=null&&navigation.navigate(l.url,{state:l.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var t=!1,n=null;return navigation.addEventListener("navigate",s),navigation.addEventListener("navigatesuccess",a),navigation.addEventListener("navigateerror",a),setTimeout(e,100),function(){t=!0,navigation.removeEventListener("navigate",s),navigation.removeEventListener("navigatesuccess",a),navigation.removeEventListener("navigateerror",a),n!==null&&(n(),n=null)}}}function lo(s){this._internalRoot=s}Ul.prototype.render=lo.prototype.render=function(s){var a=this._internalRoot;if(a===null)throw Error(_(409));var e=a.current,t=da();ov(e,t,s,a,null,null)},Ul.prototype.unmount=lo.prototype.unmount=function(){var s=this._internalRoot;if(s!==null){this._internalRoot=null;var a=s.containerInfo;ov(s.current,2,null,s,null,null),wl(),a[Ze]=null}};function Ul(s){this._internalRoot=s}Ul.prototype.unstable_scheduleHydration=function(s){if(s){var a=Do();s={blockedOn:null,target:s,priority:a};for(var e=0;e<we.length&&a!==0&&a<we[e].priority;e++);we.splice(e,0,s),e===0&&_v(s)}};var gv=S.version;if(gv!=="19.2.7")throw Error(_(527,gv,"19.2.7"));L.findDOMNode=function(s){var a=s._reactInternals;if(a===void 0)throw typeof s.render=="function"?Error(_(188)):(s=Object.keys(s).join(","),Error(_(268,s)));return s=C(a),s=s!==null?U(s):null,s=s===null?null:s.stateNode,s};var s1={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:m,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Rl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Rl.isDisabled&&Rl.supportsFiber)try{Dt=Rl.inject(s1),$s=Rl}catch{}}return kn.createRoot=function(s,a){if(!M(s))throw Error(_(299));var e=!1,t="",n=Sr,l=Mr,d=Dr;return a!=null&&(a.unstable_strictMode===!0&&(e=!0),a.identifierPrefix!==void 0&&(t=a.identifierPrefix),a.onUncaughtError!==void 0&&(n=a.onUncaughtError),a.onCaughtError!==void 0&&(l=a.onCaughtError),a.onRecoverableError!==void 0&&(d=a.onRecoverableError)),a=dv(s,1,!1,null,null,e,t,null,n,l,d,bv),s[Ze]=a.current,Ri(s),new lo(a)},kn.hydrateRoot=function(s,a,e){if(!M(s))throw Error(_(299));var t=!1,n="",l=Sr,d=Mr,i=Dr,o=null;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(n=e.identifierPrefix),e.onUncaughtError!==void 0&&(l=e.onUncaughtError),e.onCaughtError!==void 0&&(d=e.onCaughtError),e.onRecoverableError!==void 0&&(i=e.onRecoverableError),e.formState!==void 0&&(o=e.formState)),a=dv(s,1,!0,a,e??null,t,n,o,l,d,i,bv),a.context=iv(null),e=a.current,t=da(),t=Fl(t),n=ne(t),n.callback=null,le(e,n,t),e=t,a.current.lanes=e,Bt(a,e),La(a),s[Ze]=a.current,Ri(s),new Ul(a)},kn.version="19.2.7",kn}var Lv;function r1(){if(Lv)return oo.exports;Lv=1;function v(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(v)}catch(S){console.error(S)}}return v(),oo.exports=c1(),oo.exports}var u1=r1(),js=bo();const v1=[{id:"buttons",title:"Buttons",desc:"Trigger actions, submit forms, and navigate flows. Use one primary action per view: secondary and invisible variants for supporting actions.",html:`<section class="ds-chapter ds-tab-panel">
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
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5.5 8 3.5 10 5.5"/><path d="M6 10.5 8 12.5 10 10.5"/></svg></span>
    <span class="tds-sort-button__trigger-default">Sort</span>
  </button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Sort · open</span>
<div class="tds-sort-button">
  <button type="button" class="tds-btn tds-btn--md tds-btn--secondary">
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5.5 8 3.5 10 5.5"/><path d="M6 10.5 8 12.5 10 10.5"/></svg></span>
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
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5.5 8 3.5 10 5.5"/><path d="M6 10.5 8 12.5 10 10.5"/></svg></span>
    <span class="tds-sort-button__trigger-label"><span class="tds-sort-button__trigger-prefix">Sort:</span><span class="tds-sort-button__trigger-value">Name A → Z</span></span>
  </button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Sort · selected · open</span>
<div class="tds-sort-button tds-sort-button--selected">
  <button type="button" class="tds-btn tds-btn--md tds-btn--secondary">
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5.5 8 3.5 10 5.5"/><path d="M6 10.5 8 12.5 10 10.5"/></svg></span>
    <span class="tds-sort-button__trigger-label"><span class="tds-sort-button__trigger-prefix">Sort:</span><span class="tds-sort-button__trigger-value">Name A → Z</span></span>
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
              <div class="tds-action-list-item" role="option" data-value="Ontario">Ontario</div>
              <div class="tds-action-list-item" role="option" data-value="British Columbia">British Columbia</div>
              <div class="tds-action-list-item" role="option" data-value="Alberta">Alberta</div>
              <div class="tds-action-list-item" role="option" data-value="Quebec">Quebec</div>
              <div class="tds-action-list-item" role="option" data-value="Manitoba">Manitoba</div>
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
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Filled</span>
          <div class="tds-date-picker-range tds-date-picker-range--interactive" data-date-picker-range data-size="lg" data-start="03/01/2021" data-end="03/20/2021">
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
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Error</span>
          <div class="tds-date-picker-range tds-date-picker-range--interactive tds-date-picker-range--invalid" data-date-picker-range data-size="lg">
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
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Disabled</span>
          <div class="tds-date-picker-range tds-date-picker-range--disabled">
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
        <div class="ds-state-demo">
          <span class="ds-state-demo__label">Read-only</span>
          <div class="tds-date-picker-range tds-date-picker-range--readonly">
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
        <div class="ds-showcase__canvas">
<div class="card" style="max-width: 280px; padding: 8px;">
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
            <span>Canada</span>
          </div>
          <div class="tds-action-list-item">
            <span class="tds-action-list-item__check"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg></span>
            <span>United States</span>
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
            <span>Australia (unavailable)</span>
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
</section>`}],ql=[{id:"buttons",label:"Buttons",icon:"buttons"},{id:"inputs",label:"Inputs",icon:"inputs"},{id:"controls",label:"Controls",icon:"controls"},{id:"tags",label:"Tags",icon:"tags"},{id:"navigation",label:"Navigation",icon:"navigation"},{id:"disclosure",label:"Disclosure",icon:"disclosure"},{id:"data",label:"Data",icon:"data"},{id:"typography",label:"Typography",icon:"typography"},{id:"tokens",label:"Tokens",icon:"tokens"},{id:"tracker",label:"Tracker",icon:"tracker"}],p1=ql.map(v=>v.id),_1=[{title:"Token-driven",body:"Colors, type, and spacing from tokens.css. Never hard-code hex values."},{title:"Figma parity",body:"Every tds- class traces to a component in Trulioo ADS 2026."},{title:"Copy & ship",body:"Grab the markup from each demo and drop it into your feature branch."}],Tv={buttons:'<rect fill="none" stroke="currentColor" stroke-width="2" x="2" y="7" width="20" height="10" rx="2"/>',inputs:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M7 22h1a4 4 0 0 0 4-4v-1"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M7 2h1a4 4 0 0 1 4 4v1"/>',controls:'<rect fill="none" stroke="currentColor" stroke-width="2" x="2" y="6" width="20" height="12" rx="6"/><circle cx="8" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="2"/>',tags:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" stroke="none"/>',navigation:'<rect fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" x="3" y="3" width="18" height="18" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 3v18"/>',disclosure:'<rect fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" x="3" y="3" width="18" height="18" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M3 9h18"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m9 15 3 3 3-3"/>',data:'<rect fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" x="3" y="3" width="18" height="18" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M3 9h18M3 15h18M12 3v18"/>',typography:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 7V4h16v3"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 20h6"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 4v16"/>',tokens:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5S13 7 12 2c-1 5-2 6.4-4 8.5S5 17 5 15a7 7 0 0 0 7 7z"/>',tracker:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 19V5"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M10 19V9"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16 19v-6"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M22 19V11"/>'};function f1({name:v}){return c.jsx("svg",{className:"tds-preview__nav-glyph",width:"16",height:"16",viewBox:"0 0 24 24","aria-hidden":"true",dangerouslySetInnerHTML:{__html:Tv[v]??""}})}function h1(){return c.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"tds-preview__icon-sprite","aria-hidden":"true",focusable:"false",children:Object.entries(Tv).map(([v,S])=>c.jsx("symbol",{id:`pr-i-${v}`,viewBox:"0 0 24 24",dangerouslySetInnerHTML:{__html:S}},v))})}function b1({activeTab:v,isHome:S,isOpen:D,onSelect:_,onHome:M,onToggle:N}){return c.jsxs("aside",{className:"tds-preview__sidebar","aria-label":"Component navigation","data-expanded":D,children:[c.jsxs("div",{className:"tds-preview__sidebar-inner",children:[c.jsxs("button",{type:"button",className:"tds-preview__brand",onClick:M,"aria-current":S?"page":void 0,children:[c.jsx("span",{className:"tds-preview__brand-mark",children:"TDS"}),c.jsxs("span",{className:"tds-preview__brand-text",children:[c.jsx("span",{className:"tds-preview__brand-name",children:"Trulioo DS"}),c.jsx("span",{className:"tds-preview__brand-tag",children:"Component reference"})]})]}),c.jsx("p",{className:"tds-preview__nav-label",children:"Components"}),c.jsx("nav",{className:"tds-preview__nav",role:"tablist","aria-label":"Components",children:ql.map(V=>{const j=!S&&V.id===v;return c.jsxs("button",{type:"button",className:`tds-preview__nav-link${j?" is-active":""}`,role:"tab",id:`tab-${V.id}`,"aria-selected":j,tabIndex:j?0:-1,"aria-label":V.label,title:V.label,onClick:()=>_(V.id),children:[c.jsx("span",{className:"tds-preview__nav-icon","aria-hidden":"true",children:c.jsx(f1,{name:V.icon})}),c.jsx("span",{className:"tds-preview__nav-label-text",children:V.label})]},V.id)})}),c.jsxs("div",{className:"tds-preview__sidebar-footer",children:[c.jsxs("p",{children:["Synced from"," ",c.jsx("a",{href:"https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026",target:"_blank",rel:"noopener noreferrer",children:"Figma ADS 2026"})]}),c.jsxs("p",{className:"tds-preview__sidebar-note",children:["Classes use the ",c.jsx("code",{children:"tds-"})," prefix."]})]})]}),c.jsx("button",{type:"button",className:"tds-preview__sidebar-toggle",onClick:N,"aria-label":"Collapse sidebar","aria-expanded":D,children:c.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14","aria-hidden":"true",children:c.jsx("path",{d:"M9 3L4 7l5 4",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]})}function g1({activeLabel:v,activeTab:S,isHome:D,sidebarOpen:_,onSelect:M,onHome:N,onToggleSidebar:V}){return c.jsxs("header",{className:"tds-preview__topbar",children:[c.jsxs("div",{className:"tds-preview__topbar-row",children:[c.jsx("button",{type:"button",className:"tds-preview__topbar-menu",onClick:V,"aria-label":_?"Close sidebar":"Open sidebar","aria-expanded":_,children:c.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:c.jsx("path",{d:"M2.5 4h11M2.5 8h11M2.5 12h11",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}),c.jsxs("button",{type:"button",className:"tds-preview__topbar-brand",onClick:N,children:[c.jsx("span",{className:"tds-preview__topbar-mark",children:"TDS"}),c.jsx("span",{className:"tds-preview__topbar-title",children:D?"Overview":v})]})]}),c.jsx("nav",{className:"tds-preview__mobile-tabs",role:"tablist","aria-label":"Components",children:ql.map(j=>{const E=!D&&j.id===S;return c.jsx("button",{type:"button",className:`tds-preview__mobile-tab${E?" is-active":""}`,role:"tab","aria-selected":E,onClick:()=>M(j.id),children:j.label},j.id)})})]})}function w1({features:v,onExplore:S}){return c.jsxs("section",{className:"tds-preview__hero",children:[c.jsxs("div",{className:"tds-preview__hero-orbs","aria-hidden":"true",children:[c.jsx("div",{className:"tds-preview__hero-orb tds-preview__hero-orb--1"}),c.jsx("div",{className:"tds-preview__hero-orb tds-preview__hero-orb--2"}),c.jsx("div",{className:"tds-preview__hero-orb tds-preview__hero-orb--3"})]}),c.jsxs("div",{className:"tds-preview__hero-inner",children:[c.jsxs("div",{className:"tds-preview__hero-badge",children:[c.jsx("span",{className:"tds-preview__hero-badge-dot","aria-hidden":"true"}),"For product & engineering teams"]}),c.jsxs("h1",{className:"tds-preview__hero-title",children:["Build with",c.jsx("br",{}),c.jsx("span",{className:"tds-preview__hero-title-accent",children:"clarity."})]}),c.jsx("p",{className:"tds-preview__hero-lead",children:"A living reference for the Trulioo component library: what each piece does, when to use it, and the exact class names to apply. Pure CSS, mapped 1:1 from Figma."}),c.jsxs("div",{className:"tds-preview__hero-actions",children:[c.jsxs("button",{type:"button",className:"tds-preview__hero-cta",onClick:S,children:["Explore components",c.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:c.jsx("path",{d:"M3 8h10M9 4l4 4-4 4",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]}),c.jsx("a",{href:"https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026",target:"_blank",rel:"noopener noreferrer",className:"tds-preview__hero-secondary",children:"Open in Figma"})]}),c.jsxs("div",{className:"tds-preview__hero-highlights",children:[c.jsx("p",{className:"tds-preview__hero-highlights-label",children:"Get the highlights."}),c.jsx("div",{className:"tds-preview__hero-grid",children:v.map((D,_)=>c.jsxs("article",{className:"tds-preview__hero-card",style:{animationDelay:`${240+_*80}ms`},children:[c.jsx("strong",{children:D.title}),c.jsx("span",{children:D.body})]},D.title))})]})]})]})}function Av({title:v,desc:S,eyebrow:D="Component family"}){return c.jsxs("header",{className:"tds-preview__chapter-header",children:[c.jsx("p",{className:"tds-preview__chapter-eyebrow",children:D}),c.jsx("h1",{className:"tds-preview__chapter-title",children:v}),c.jsx("p",{className:"tds-preview__chapter-desc",children:S})]})}function m1({section:v,active:S}){const D=v.html.replace(/\.\.\/\.\.\/assets\//g,"/assets/");return c.jsxs("div",{className:`tds-preview__panel${S?" is-active":""}`,role:"tabpanel",id:v.id,"aria-labelledby":`tab-${v.id}`,hidden:!S,children:[c.jsx(Av,{title:v.title,desc:v.desc}),c.jsx("div",{className:"tds-preview__demos",dangerouslySetInnerHTML:{__html:D}})]})}const k1="2026-07-24T19:13:58.905Z",y1={totalComponents:49,cssDone:45,cssPartial:0,cssNotStarted:3,figmaDone:49,figmaEligible:49,figmaDonePercent:100,adoption:{preview:{used:41,total:44,percent:93},bv:{used:14,total:44,percent:32},dv:{used:15,total:44,percent:34}}},x1=JSON.parse('[{"id":"button","name":"Button","category":"Core Controls","figmaStatus":"Done","figmaVariants":72,"cssFile":"button/button.css","classPrefixes":["tds-btn"],"figmaNodeId":"96:2225","notes":"4 variants x 3 sizes x 5 states + alignment; loading boolean with spinner","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"icon-button","name":"IconButton","category":"Core Controls","figmaStatus":"Done","figmaVariants":168,"cssFile":"icon-button/icon-button.css","classPrefixes":["tds-icon-btn"],"figmaNodeId":"1371:22653","notes":"4 variants x 3 sizes x 7 states x 2 shapes; loading swaps icon for .tds-spinner--xs","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"button-group","name":"ButtonGroup","category":"Core Controls","figmaStatus":"Done","figmaVariants":15,"cssFile":"button-group/button-group.css","classPrefixes":["tds-button-group"],"subComponents":"Button, IconButton","figmaNodeId":"1952:33320","notes":"Segmented control; iconButtons, buttons, or mixed; count 2–5","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"spinner","name":"Spinner","category":"Core Controls","figmaStatus":"Done","figmaVariants":8,"cssFile":"spinner/spinner.css","classPrefixes":["tds-spinner","tds-spinner-block"],"figmaNodeId":"2092:18230","notes":"5 sizes (xs–xl); optional label block; used by Button and IconButton loading","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"button-menu","name":"ButtonMenu","category":"Core Controls","figmaStatus":"Done","figmaVariants":12,"cssFile":"button-menu/button-menu.css","classPrefixes":["tds-button-menu"],"subComponents":"DropdownPanel","figmaNodeId":"832:13390","notes":"Uses dropdown-panel for menu","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"switch","name":"Switch","category":"Core Controls","figmaStatus":"Done","figmaVariants":8,"cssFile":"switch/switch.css","classPrefixes":["tds-switch"],"figmaNodeId":"96:3234","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"checkbox","name":"Checkbox","category":"Core Controls","figmaStatus":"Done","figmaVariants":6,"cssFile":"checkbox/checkbox.css","classPrefixes":["tds-checkbox"],"figmaNodeId":"299:12998","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"dismiss-action","name":"DismissAction","category":"Core Controls","figmaStatus":"Done","figmaVariants":12,"cssFile":"dismiss-action/dismiss-action.css","classPrefixes":["tds-dismiss"],"figmaNodeId":"331:8149","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"text-input","name":"TextInput","category":"Form Inputs","figmaStatus":"Done","figmaVariants":97,"cssFile":"text-input/text-input.css","classPrefixes":["tds-text-input"],"subComponents":"FieldLabel, FieldCaption, FieldValidation","figmaNodeId":"96:3268","notes":"Imports shared atoms via @import","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":false},{"id":"select","name":"Select","category":"Form Inputs","figmaStatus":"Done","figmaVariants":30,"cssFile":"select/select.css","classPrefixes":["tds-select","tds-combobox"],"subComponents":"FieldLabel, FieldCaption, FieldValidation, Caret, DropdownPanel, Tag","figmaNodeId":"96:1624","notes":"Includes combobox variant","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"date-picker","name":"DatePicker","category":"Form Inputs","figmaStatus":"Done","cssFile":"date-picker/date-picker.css","classPrefixes":["tds-date-picker","tds-date-picker-range"],"subComponents":"FieldLabel, FieldCaption, FieldValidation","figmaNodeId":"1632:29292","notes":"Single and range calendar variants","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"radio","name":"Radio","category":"Form Inputs","figmaStatus":"Done","figmaVariants":6,"cssFile":"_shared/radio/radio.css","classPrefixes":["tds-radio"],"figmaNodeId":"100:4253","notes":"Shared atom","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"radio-group","name":"RadioGroup","category":"Form Inputs","figmaStatus":"Done","figmaVariants":6,"cssFile":"radio-group/radio-group.css","classPrefixes":["tds-radio-group"],"subComponents":"Radio","figmaNodeId":"100:4222","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"radio-card","name":"RadioCard","category":"Form Inputs","figmaStatus":"Done","figmaVariants":2,"cssFile":"radio-card/radio-card.css","classPrefixes":["tds-radio-card"],"subComponents":"Radio, Checkbox","figmaNodeId":"359:3332","notes":"single-selection (radio) or multi-selection (checkbox)","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"field-label","name":"FieldLabel","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":2,"cssFile":"_shared/field-label/field-label.css","classPrefixes":["tds-field-label"],"figmaNodeId":"107:2085","notes":"Used by TextInput, Select","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":false},{"id":"field-caption","name":"FieldCaption","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":0,"cssFile":"_shared/field-caption/field-caption.css","classPrefixes":["tds-field-caption"],"notes":"Used by TextInput, Select","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"field-validation","name":"FieldValidation","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":2,"cssFile":"_shared/field-validation/field-validation.css","classPrefixes":["tds-field-validation"],"figmaNodeId":"107:2078","notes":"Used by TextInput, Select","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":false},{"id":"caret","name":"Caret","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":3,"cssFile":"_shared/caret/caret.css","classPrefixes":["tds-caret"],"figmaNodeId":"640:9140","notes":"Used by Select, Tooltip","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"dropdown-panel","name":"DropdownPanel","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":12,"cssFile":"_shared/dropdown-panel/dropdown-panel.css","classPrefixes":["tds-dropdown-panel"],"subComponents":"ActionListItem","figmaNodeId":"320:21652","notes":"Positioning rules — (1) content-sized, (2) start/end align with auto-flip, (3) min-width = trigger, (4) viewport overflow clamp. Used by Select, ButtonMenu, FilterButton, SortButton","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"tag","name":"Tag","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":112,"cssFile":"_shared/tag/tag.css","classPrefixes":["tds-tag"],"figmaNodeId":"331:8199","notes":"Used by Select, Accordion","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"ai-tag","name":"AITag","category":"Data Display","figmaStatus":"Done","figmaVariants":4,"cssFile":"ai-tag/ai-tag.css","classPrefixes":["tds-ai-tag"],"figmaNodeId":"1821:33907","notes":"TruAI badge; sparkles icon always required","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"side-nav","name":"SideNav","category":"Navigation","figmaStatus":"Done","figmaVariants":3,"cssFile":"side-nav/side-nav.css","classPrefixes":["tds-side-nav","tds-side-nav-preview"],"subComponents":"NavItem, NavList, SubItem, UserProfile","figmaNodeId":"1188:10384","notes":"3 modes: expanded, collapsed, mobile","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"nav-item","name":"NavItem","category":"Navigation","figmaStatus":"Done","figmaVariants":15,"cssFile":"side-nav/nav-item/nav-item.css","classPrefixes":["tds-side-nav__nav-item"],"notes":"Nested under side-nav/","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"nav-list","name":"NavList","category":"Navigation","figmaStatus":"Done","figmaVariants":0,"cssFile":"side-nav/nav-list/nav-list.css","classPrefixes":["tds-nav-list"],"notes":"Nested under side-nav/","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"tabs","name":"Tabs","category":"Navigation","figmaStatus":"Done","figmaVariants":10,"cssFile":"tabs/tabs.css","classPrefixes":["tds-tabs"],"subComponents":"TabItem","figmaNodeId":"405:8964","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"tab-item","name":"TabItem","category":"Navigation","figmaStatus":"Done","figmaVariants":4,"cssFile":"tabs/tab-item/tab-item.css","classPrefixes":["tds-tab-item"],"figmaNodeId":"403:5492","notes":"Nested under tabs/","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"filter-tab","name":"FilterTabs","category":"Navigation","figmaStatus":"Done","figmaVariants":3,"cssFile":"filter-tab/filter-tab.css","classPrefixes":["tds-filter-tab","tds-filter-tabs"],"subComponents":"FilterTabsItem","figmaNodeId":"844:6968","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"breadcrumb","name":"Breadcrumb","category":"Navigation","figmaStatus":"Done","cssFile":"breadcrumb/breadcrumb.css","classPrefixes":["tds-breadcrumbs","tds-breadcrumb-item"],"figmaNodeId":"1596:23587","notes":"BreadCrumbs container, item, and divider","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"filter-tab-2","name":"FilterTabsItem","category":"Navigation","figmaStatus":"Done","figmaVariants":12,"cssFile":"filter-tab/filter-tab.css","notes":"Shares CSS file with FilterTabs; adoption tracked on FilterTabs","classPrefixes":[],"cssStatus":"Done","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"data-table","name":"DataTable","category":"Data Display","figmaStatus":"Done","figmaVariants":12,"cssFile":"data-table/data-table.css","classPrefixes":["tds-data-table","tds-data-table-container"],"subComponents":"ColumnHeaderCell, Row, Header, SortButton, Signals, SectionHeader","figmaNodeId":"884:13685","notes":"Complex composite with many sub-components","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"data-field","name":"DataField","category":"Data Display","figmaStatus":"Done","figmaVariants":24,"cssFile":"data-field/data-field.css","classPrefixes":["tds-data-field"],"figmaNodeId":"856:13029","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"counter-label","name":"CounterLabel","category":"Data Display","figmaStatus":"Done","figmaVariants":24,"cssFile":"counter-label/counter-label.css","classPrefixes":["tds-counter"],"figmaNodeId":"409:9115","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"section-header","name":"SectionHeader","category":"Data Display","figmaStatus":"Done","figmaVariants":32,"cssFile":"section-header/section-header.css","classPrefixes":["tds-section-header"],"figmaNodeId":"1816:29234","notes":"Groups table sections; composes Tag, Counter, Button","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"dismiss-issue-badge","name":"DismissIssueBadge","category":"Data Display","figmaStatus":"Done","figmaVariants":12,"cssFile":"dismiss-issue-badge/dismiss-issue-badge.css","classPrefixes":["tds-dismiss-badge"],"figmaNodeId":"331:8174","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"flag-icon","name":"CountryFlag","category":"Data Display","figmaStatus":"Done","figmaVariants":255,"cssFile":"flag-icon/flag-icon.css","classPrefixes":["fi","tds-select__country-flag"],"figmaNodeId":"299:8750","notes":"255 country codes","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"action-list-item","name":"ActionListItem","category":"Data Display","figmaStatus":"Done","figmaVariants":0,"cssFile":"action-list-item/action-list-item.css","classPrefixes":["tds-action-list-item"],"notes":"Used inside DropdownPanel","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":true},{"id":"stat-card","name":"StatCard","category":"Data Display","figmaStatus":"Done","figmaVariants":2,"cssFile":"stat-card/stat-card.css","classPrefixes":["tds-stat-card"],"figmaNodeId":"915:9281","cssStatus":"Done","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"tooltip","name":"Tooltip","category":"Feedback","figmaStatus":"Done","figmaVariants":16,"cssFile":"tooltip/tooltip.css","classPrefixes":["tds-tooltip"],"subComponents":"Caret","figmaNodeId":"1054:18565","notes":"Body + Caret sub-components","cssStatus":"Done","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"announcement","name":"Announcement","category":"Feedback","figmaStatus":"Done","figmaVariants":10,"cssFile":"announcement/announcement.css","classPrefixes":["tds-announcement"],"figmaNodeId":"866:13118","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":true},{"id":"accordion","name":"Accordion","category":"Containers","figmaStatus":"Done","figmaVariants":102,"cssFile":"accordion/accordion.css","classPrefixes":["tds-accordion"],"subComponents":"Tag, CounterLabel, DataFieldList","figmaNodeId":"810:5659","notes":"Complex component with many states","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"progress-indicator","name":"ProgressIndicator","category":"Progress","figmaStatus":"Done","figmaVariants":18,"cssFile":"progress-indicator/progress-indicator.css","classPrefixes":["tds-progress-indicator"],"subComponents":"_ProgressIndicatorItem","figmaNodeId":"1242:22104","notes":"Horizontal step progress","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":true},{"id":"step-progress","name":"StepProgress","category":"Progress","figmaStatus":"Done","figmaVariants":7,"classPrefixes":[],"subComponents":"_StepProgressItem","figmaNodeId":"1264:24192","notes":"Figma only, CSS pending","cssStatus":"Not Started","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"listed-progress-item","name":"ListedProgressItem","category":"Progress","figmaStatus":"Done","figmaVariants":6,"classPrefixes":[],"subComponents":"Button, Link, IconButton, Tag","figmaNodeId":"1267:24260","notes":"Figma only, CSS pending","cssStatus":"Not Started","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"score-gauge","name":"ScoreGauge","category":"Scoring","figmaStatus":"Done","figmaVariants":0,"cssFile":"score-gauge/score-gauge.css","classPrefixes":["score-gauge"],"notes":"SVG-based, has JS + React variants","cssStatus":"Done","usedInPreview":false,"usedInBV":false,"usedInDV":true},{"id":"score-card","name":"ScoreCard","category":"Scoring","figmaStatus":"Done","figmaVariants":3,"classPrefixes":[],"subComponents":"ScoreGauge","figmaNodeId":"916:9298","notes":"CSS pending","cssStatus":"Not Started","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"risk-category-card","name":"RiskCategoryCard","category":"Scoring","figmaStatus":"Done","figmaVariants":3,"cssFile":"risk-category-card/risk-category-card.css","classPrefixes":["tds-risk-category-card"],"figmaNodeId":"920:9307","notes":"Category title, risk tag, signal count, and score out of 100","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"font-awesome-icon","name":"FontAwesome Icon","category":"Utility","figmaStatus":"Done","figmaVariants":42,"classPrefixes":[],"figmaNodeId":"544:9787","notes":"Icon system, no standalone CSS","cssStatus":"N/A","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"filter-button","name":"FilterButton","category":"Utility","figmaStatus":"Done","figmaVariants":6,"cssFile":"filter-button/filter-button.css","classPrefixes":["tds-filter-button"],"subComponents":"DropdownPanel, CounterLabel","figmaNodeId":"836:13511","notes":"Selected trigger shows value + xmark clear; counter only with 2+ active filters (+N); clear resets all selections via tds-filter-clear","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"sort-button","name":"SortButton","category":"Utility","figmaStatus":"Done","figmaVariants":4,"cssFile":"data-table/sort-button/sort-button.css","classPrefixes":["tds-sort-button"],"subComponents":"DropdownPanel","figmaNodeId":"2191:46183","notes":"Selected trigger shows sort value + xmark clear; open selected reverts label to Sort; clear resets via tds-sort-clear","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false}]'),C1=[{name:"Dialog / Modal",category:"Feedback",priority:"High",description:"Overlay dialog with backdrop, header, body, footer actions",dependsOn:"Button, DismissAction",notes:"Common pattern in KYB flows"},{name:"Toast / Snackbar",category:"Feedback",priority:"High",description:"Temporary notification bar with auto-dismiss",dependsOn:"DismissAction",notes:"For success/error feedback"},{name:"Alert / InlineNotification",category:"Feedback",priority:"High",description:"Persistent inline message with icon and dismiss",dependsOn:"DismissAction",notes:"Replaces Announcement for inline use"},{name:"Badge",category:"Data Display",priority:"High",description:"Small count or status indicator on icons/avatars",notes:"Needed for nav items, notifications"},{name:"Avatar",category:"Data Display",priority:"High",description:"User/entity photo or initials circle",notes:"Used in SideNav UserProfile, comments"},{name:"Pagination",category:"Navigation",priority:"High",description:"Page navigation with prev/next and page numbers",dependsOn:"Button, IconButton",notes:"Used with DataTable"},{name:"Skeleton / Loading",category:"Feedback",priority:"Medium",description:"Shimmer placeholder for loading states",notes:"For progressive content loading"},{name:"Popover",category:"Feedback",priority:"Medium",description:"Anchored floating content panel (non-modal)",dependsOn:"Caret, DropdownPanel",notes:"For rich hover/click content"},{name:"Card",category:"Containers",priority:"Medium",description:"Bordered content container with header and actions",notes:"General-purpose content wrapper"},{name:"Divider",category:"Utility",priority:"Medium",description:"Horizontal or vertical separator line",notes:"For section separation"},{name:"Textarea",category:"Form Inputs",priority:"Medium",description:"Multi-line text input with auto-resize",dependsOn:"FieldLabel, FieldCaption, FieldValidation",notes:"For notes, comments"},{name:"SearchInput",category:"Form Inputs",priority:"Medium",description:"Text input with search icon and clear action",dependsOn:"TextInput, DismissAction",notes:"For filtering lists/tables"},{name:"Slider / RangeInput",category:"Form Inputs",priority:"Low",description:"Continuous or stepped range selector",notes:"For score thresholds"},{name:"FileUpload",category:"Form Inputs",priority:"Low",description:"Drag-and-drop or click-to-browse file input",dependsOn:"Button",notes:"For document upload flows"},{name:"ProgressBar",category:"Progress",priority:"Low",description:"Linear determinate/indeterminate progress",notes:"For upload/processing progress"},{name:"EmptyState",category:"Feedback",priority:"Low",description:"Illustration + message for zero-data scenarios",dependsOn:"Button",notes:"For empty tables, search results"},{name:"TopNav / AppBar",category:"Navigation",priority:"Low",description:"Horizontal top navigation bar",dependsOn:"Button, Avatar, Badge",notes:"If app needs a top bar"},{name:"SegmentedControl",category:"Core Controls",priority:"Low",description:"Toggle between 2–5 mutually exclusive options",notes:"Alternative to Tabs for settings"},{name:"Timeline",category:"Data Display",priority:"Low",description:"Vertical timeline with events and connectors",notes:"For entity history/audit trail"},{name:"TreeView",category:"Navigation",priority:"Low",description:"Hierarchical collapsible list",notes:"For nested entity structures"}],S1=["Unlisted component folder in Components/: risk-category-strip"],M1={lastBuiltAt:k1,summary:y1,components:x1,planned:C1,warnings:S1},D1=M1;function yn({value:v,max:S=100,label:D,tone:_="brand",size:M="sm"}){const N=S>0?Math.min(100,Math.round(v/S*100)):0;return c.jsx("div",{className:`tds-preview__tracker-progress tds-preview__tracker-progress--${_} tds-preview__tracker-progress--${M}`,role:"progressbar","aria-valuenow":N,"aria-valuemin":0,"aria-valuemax":100,"aria-label":D,children:c.jsx("div",{className:"tds-preview__tracker-progress-fill",style:{width:`${N}%`}})})}function L1({segments:v,total:S,label:D}){const _=S>0?S:1;return c.jsxs("div",{className:"tds-preview__tracker-segmented",role:"img","aria-label":D,children:[c.jsx("div",{className:"tds-preview__tracker-segmented-track",children:v.map(M=>{const N=M.value/_*100;return N<=0?null:c.jsx("div",{className:`tds-preview__tracker-segment tds-preview__tracker-segment--${M.tone}`,style:{width:`${N}%`},title:`${M.label}: ${M.value}`},M.label)})}),c.jsx("ul",{className:"tds-preview__tracker-segmented-legend",children:v.map(M=>c.jsxs("li",{className:`tds-preview__tracker-stat-chip tds-preview__tracker-stat-chip--${M.tone}`,children:[c.jsx("span",{className:"tds-preview__tracker-stat-chip-value",children:M.value}),c.jsx("span",{className:"tds-preview__tracker-stat-chip-label",children:M.label})]},M.label))})]})}function B1(v){return v>=1?"positive":v>=.5?"intermediate":v>0?"brand":"neutral"}function Bv({title:v,description:S,rows:D,valueSuffix:_="",showPercent:M=!0,compact:N=!1}){return c.jsxs("article",{className:`tds-preview__tracker-chart${N?" tds-preview__tracker-chart--compact":""}`,children:[c.jsxs("header",{className:"tds-preview__tracker-chart-header",children:[c.jsx("h4",{className:"tds-preview__tracker-chart-title",children:v}),S&&c.jsx("p",{className:"tds-preview__tracker-chart-lead",children:S})]}),c.jsx("ul",{className:"tds-preview__tracker-bar-chart",children:D.map(V=>{const j=V.max>0?Math.min(100,Math.round(V.value/V.max*100)):0,E=V.tone??B1(V.value/V.max);return c.jsxs("li",{className:"tds-preview__tracker-bar-row",children:[c.jsxs("div",{className:"tds-preview__tracker-bar-head",children:[c.jsx("span",{className:"tds-preview__tracker-bar-label",children:V.label}),c.jsxs("span",{className:"tds-preview__tracker-bar-value",children:[M&&c.jsxs("strong",{className:"tds-preview__tracker-bar-percent",children:[j,"%"]}),(V.meta||!M)&&c.jsxs("span",{className:"tds-preview__tracker-bar-detail",children:[!M&&c.jsxs(c.Fragment,{children:[V.value,_]}),V.meta&&c.jsxs("span",{className:"tds-preview__tracker-bar-meta",children:[!M&&_?" · ":"",V.meta]})]})]})]}),c.jsx("div",{className:"tds-preview__tracker-bar-track","aria-hidden":"true",children:c.jsx("div",{className:`tds-preview__tracker-bar-fill tds-preview__tracker-bar-fill--${E}`,style:{width:`${j}%`}})})]},V.label)})})]})}function E1({summary:v}){return c.jsxs("div",{className:"tds-preview__tracker-metrics",children:[c.jsxs("article",{className:"tds-preview__tracker-metric",children:[c.jsx("span",{className:"tds-preview__tracker-metric-label",children:"CSS built"}),c.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[v.cssDone,c.jsxs("span",{className:"tds-preview__tracker-metric-total",children:[" / ",v.totalComponents]})]}),c.jsx(yn,{value:v.cssDone,max:v.totalComponents,label:`CSS built: ${v.cssDone} of ${v.totalComponents}`,tone:"positive"}),c.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:[v.cssPartial," partial · ",v.cssNotStarted," not started"]})]}),c.jsxs("article",{className:"tds-preview__tracker-metric",children:[c.jsx("span",{className:"tds-preview__tracker-metric-label",children:"Figma complete"}),c.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[v.figmaDonePercent,"%"]}),c.jsx(yn,{value:v.figmaDonePercent,label:`Figma complete: ${v.figmaDonePercent}%`,tone:"positive"}),c.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:[v.figmaDone," of ",v.figmaEligible," components"]})]}),c.jsxs("article",{className:"tds-preview__tracker-metric",children:[c.jsx("span",{className:"tds-preview__tracker-metric-label",children:"Preview adoption"}),c.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[v.adoption.preview.percent,"%"]}),c.jsx(yn,{value:v.adoption.preview.percent,label:`Preview adoption: ${v.adoption.preview.percent}%`,tone:"positive"}),c.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:[v.adoption.preview.used," of ",v.adoption.preview.total," built"]})]}),c.jsxs("article",{className:"tds-preview__tracker-metric",children:[c.jsx("span",{className:"tds-preview__tracker-metric-label",children:"BV adoption"}),c.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[v.adoption.bv.percent,"%"]}),c.jsx(yn,{value:v.adoption.bv.percent,label:`BV adoption: ${v.adoption.bv.percent}%`,tone:"intermediate"}),c.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:[v.adoption.bv.used," of ",v.adoption.bv.total," built"]})]}),c.jsxs("article",{className:"tds-preview__tracker-metric",children:[c.jsx("span",{className:"tds-preview__tracker-metric-label",children:"DV adoption"}),c.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[v.adoption.dv.percent,"%"]}),c.jsx(yn,{value:v.adoption.dv.percent,label:`DV adoption: ${v.adoption.dv.percent}%`,tone:"brand"}),c.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:[v.adoption.dv.used," of ",v.adoption.dv.total," built"]})]})]})}function T1(v,S){return v.filter(D=>D.cssStatus===S).length}function A1(v){const S=["High","Medium","Low"],D=new Map;for(const M of v)D.set(M.priority,(D.get(M.priority)??0)+1);const _={High:"negative",Medium:"intermediate",Low:"neutral"};return S.filter(M=>D.has(M)).map(M=>({label:M,value:D.get(M)??0,max:v.length,meta:`${D.get(M)??0} items`,tone:_[M]}))}function z1({summary:v,components:S,planned:D}){const _=js.useMemo(()=>T1(S,"N/A"),[S]),M=js.useMemo(()=>[{label:"Done",value:v.cssDone,tone:"positive"},{label:"Partial",value:v.cssPartial,tone:"intermediate"},{label:"Not started",value:v.cssNotStarted,tone:"negative"},{label:"N/A",value:_,tone:"neutral"}],[v.cssDone,v.cssPartial,v.cssNotStarted,_]),N=js.useMemo(()=>[{label:"Preview",value:v.adoption.preview.percent,max:100,meta:`${v.adoption.preview.used}/${v.adoption.preview.total} used`,tone:"positive"},{label:"Bank verification",value:v.adoption.bv.percent,max:100,meta:`${v.adoption.bv.used}/${v.adoption.bv.total} used`,tone:"intermediate"},{label:"Document verification",value:v.adoption.dv.percent,max:100,meta:`${v.adoption.dv.used}/${v.adoption.dv.total} used`,tone:"brand"}],[v.adoption]),V=js.useMemo(()=>A1(D),[D]);return c.jsx("div",{className:"tds-preview__tracker-charts","aria-label":"Progress charts",children:c.jsxs("div",{className:"tds-preview__tracker-charts-layout",children:[c.jsxs("article",{className:"tds-preview__tracker-chart",children:[c.jsx("h3",{className:"tds-preview__tracker-chart-title",children:"Build status"}),c.jsxs("p",{className:"tds-preview__tracker-chart-lead",children:[v.cssDone," of ",v.totalComponents," components have finished CSS"]}),c.jsx(L1,{segments:M,total:v.totalComponents,label:`CSS build status: ${v.cssDone} done, ${v.cssPartial} partial, ${v.cssNotStarted} not started, ${_} not applicable`})]}),c.jsxs("div",{className:"tds-preview__tracker-charts-pair",children:[c.jsx(Bv,{title:"Adoption by page",description:"Share of built components used on each demo page",rows:N}),D.length>0&&c.jsx(Bv,{title:"Backlog by priority",description:`${D.length} components queued`,rows:V,showPercent:!0})]})]})})}function ho({title:v,desc:S,actions:D,children:_}){return c.jsxs("section",{className:"tds-preview__tracker-showcase",children:[c.jsxs("header",{className:"tds-preview__tracker-showcase__head",children:[c.jsxs("div",{className:"tds-preview__tracker-showcase__copy",children:[c.jsx("h2",{className:"tds-preview__tracker-showcase__title",children:v}),S&&c.jsx("p",{className:"tds-preview__tracker-showcase__desc",children:S})]}),D&&c.jsx("div",{className:"tds-preview__tracker-showcase__actions",children:D})]}),c.jsx("div",{className:"tds-preview__tracker-showcase__body",children:_})]})}function Ev({status:v}){const S=v.toLowerCase().replace(/\s+/g,"-");return c.jsx("span",{className:`tds-preview__tracker-pill tds-preview__tracker-pill--${S}`,children:v})}function po({used:v}){return c.jsxs("span",{className:`tds-preview__tracker-use${v?" is-yes":""}`,"aria-label":v?"Used":"Not used",children:[c.jsx("span",{className:"tds-preview__tracker-use-dot","aria-hidden":"true"}),v?"Used":"—"]})}function N1({components:v}){const[S,D]=js.useState(""),[_,M]=js.useState("all"),N=js.useMemo(()=>{const j=S.trim().toLowerCase();return v.filter(E=>{var O;const C=!j||E.name.toLowerCase().includes(j)||E.category.toLowerCase().includes(j)||((O=E.cssFile)==null?void 0:O.toLowerCase().includes(j)),U=_==="all"||E.cssStatus===_||E.figmaStatus===_;return C&&U})},[v,S,_]),V=c.jsxs("div",{className:"tds-preview__tracker-filters",children:[c.jsx("input",{type:"search",className:"tds-preview__tracker-search",placeholder:"Search components...",value:S,onChange:j=>D(j.target.value),"aria-label":"Search components"}),c.jsxs("select",{className:"tds-preview__tracker-select",value:_,onChange:j=>M(j.target.value),"aria-label":"Filter by status",children:[c.jsx("option",{value:"all",children:"All statuses"}),c.jsx("option",{value:"Done",children:"CSS Done"}),c.jsx("option",{value:"Partial",children:"Partial"}),c.jsx("option",{value:"Not Started",children:"Not started"}),c.jsx("option",{value:"Missing",children:"Missing"}),c.jsx("option",{value:"N/A",children:"N/A"})]})]});return c.jsxs(ho,{title:"Built components",desc:`${v.length} components in the library with Figma, CSS, and page adoption status.`,actions:V,children:[c.jsx("div",{className:"tds-preview__tracker-canvas",children:c.jsx("div",{className:"tds-preview__tracker-table-wrap",children:c.jsxs("table",{className:"tds-preview__tracker-table",children:[c.jsx("thead",{children:c.jsxs("tr",{children:[c.jsx("th",{scope:"col",children:"Component"}),c.jsx("th",{scope:"col",children:"Category"}),c.jsx("th",{scope:"col",children:"Figma"}),c.jsx("th",{scope:"col",children:"CSS"}),c.jsx("th",{scope:"col",children:"Preview"}),c.jsx("th",{scope:"col",children:"BV"}),c.jsx("th",{scope:"col",children:"DV"})]})}),c.jsx("tbody",{children:N.map(j=>c.jsxs("tr",{children:[c.jsxs("th",{scope:"row",children:[c.jsx("span",{className:"tds-preview__tracker-name",children:j.name}),j.cssFile&&c.jsx("code",{className:"tds-preview__tracker-file",children:j.cssFile})]}),c.jsx("td",{children:j.category}),c.jsx("td",{children:c.jsx(Ev,{status:j.figmaStatus})}),c.jsx("td",{children:c.jsx(Ev,{status:j.cssStatus})}),c.jsx("td",{children:c.jsx(po,{used:j.usedInPreview})}),c.jsx("td",{children:c.jsx(po,{used:j.usedInBV})}),c.jsx("td",{children:c.jsx(po,{used:j.usedInDV})})]},j.id))})]})})}),c.jsxs("p",{className:"tds-preview__tracker-table-meta",children:["Showing ",N.length," of ",v.length," components"]})]})}function O1(v){return v.toLowerCase().replace(/\s+/g,"-")}function H1({planned:v}){return c.jsx("div",{className:"tds-preview__tracker-planned-grid",children:v.map(S=>c.jsxs("article",{className:"tds-preview__tracker-planned-card",children:[c.jsxs("div",{className:"tds-preview__tracker-planned-card-head",children:[c.jsx("h3",{className:"tds-preview__tracker-planned-name",children:S.name}),c.jsx("span",{className:`tds-preview__tracker-priority tds-preview__tracker-priority--${O1(S.priority)}`,children:S.priority})]}),c.jsx("p",{className:"tds-preview__tracker-planned-category",children:S.category}),S.description&&c.jsx("p",{className:"tds-preview__tracker-planned-desc",children:S.description}),S.dependsOn&&c.jsxs("p",{className:"tds-preview__tracker-planned-meta",children:["Depends on: ",S.dependsOn]})]},S.name))})}function V1(v){return new Date(v).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"})}function j1(){const{summary:v,components:S,planned:D,lastBuiltAt:_,warnings:M}=D1;return c.jsxs("div",{className:"tds-preview__panel is-active",role:"tabpanel",id:"tracker",children:[c.jsx(Av,{eyebrow:"Build progress",title:"Component tracker",desc:`Live status from Components/ and adoption across Preview, BV, and DV demo pages. Last updated ${V1(_)}.`}),c.jsxs(ho,{title:"At a glance",desc:"CSS build completion, page adoption, and category coverage — regenerated on every preview build.",children:[c.jsx(E1,{summary:v}),c.jsx(z1,{summary:v,components:S,planned:D})]}),c.jsx(N1,{components:S}),D.length>0&&c.jsx(ho,{title:"Planned backlog",desc:"Upcoming components tracked in data/component-tracker.yaml.",children:c.jsx(H1,{planned:D})}),M.length>0&&c.jsxs("aside",{className:"tds-preview__tracker-warnings","aria-label":"Tracker warnings",children:[c.jsx("h3",{className:"tds-preview__tracker-showcase__title",children:"Build warnings"}),c.jsx("ul",{children:M.map(N=>c.jsx("li",{children:N},N))})]})]})}const U1=`(function initPreviewInteractionCore() {
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
    const menu = select.querySelector('.tds-select__menu');
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
    if (e.target.closest('.tds-select--interactive')) return;
    closeAllSelectMenus();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllSelectMenus();
  });
})();

initPreviewSelects();

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

window.initPreviewSelects?.();`,R1=`/**
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
      return entry.element !== element;
    });
    resetPosition(element);
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

    element.style.left = Math.round(left) + "px";
    element.style.top = Math.round(topBelow) + "px";

    var panelHeight = element.offsetHeight;
    if (panelHeight > availableBelow && availableAbove > availableBelow) {
      maxH = Math.min(maxHeight, Math.max(MIN_HEIGHT, availableAbove));
      sizeEl.style.maxHeight = Math.round(maxH) + "px";
      panelHeight = Math.min(element.offsetHeight, maxH);
      element.style.top = Math.round(Math.max(viewportPad, triggerRect.top - gap - panelHeight)) + "px";
    } else {
      sizeEl.style.maxHeight = Math.round(maxH) + "px";
    }

    element.style.visibility = "";
  }

  function open(trigger, element, options) {
    untrack(element);
    positionInViewport(trigger, element, options);
    openEntries.push({
      trigger: trigger,
      element: element,
      options: options || {},
      onClose: options.onClose,
    });
  }

  function closeEntry(entry) {
    if (entry.onClose) entry.onClose();
    resetPosition(entry.element);
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
      closeAll();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeAll();
    });

    window.addEventListener("resize", repositionAll);
    window.addEventListener("scroll", repositionAll, true);
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

    var defaultItem = panel.querySelector("[data-tds-sort-default]");
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

      menu.dataset.tdsDropdownBound = "1";
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");

      trigger.addEventListener("click", function (event) {
        if (event.target.closest(".tds-filter-button__clear, .tds-sort-button__clear")) return;
        event.stopPropagation();
        var isOpen = !panel.hidden;

        document.querySelectorAll(MENU_SELECTOR).forEach(function (other) {
          if (other === menu) return;
          var otherPanel = other.querySelector(".tds-dropdown-panel");
          if (otherPanel) close(otherPanel);
        });

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
`,q1=`/**
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
      calendar.hidden = false;
      if (state.selected) state.viewDate = new Date(state.selected);
      render();
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
    var calendar = range.querySelector(".tds-date-picker__calendar");
    if (!calendar) {
      calendar = createCalendar("Choose date range");
      calendar.classList.add("tds-date-picker-range__calendar");
      range.appendChild(calendar);
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
      setActivePicker(part || activePart);
      calendar.hidden = false;
      if (part === "start" && state.rangeStart) state.viewDate = new Date(state.rangeStart);
      if (part === "end" && state.rangeEnd) state.viewDate = new Date(state.rangeEnd);
      render();
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
      state.hoverEnd = null;
      if (openContext && openContext.close === close) openContext = null;
    }

    startField.addEventListener("click", function (e) {
      e.stopPropagation();
      if (!calendar.hidden && activePart === "start") close();
      else open("start");
    });

    endField.addEventListener("click", function (e) {
      e.stopPropagation();
      if (!calendar.hidden && activePart === "end") close();
      else open("end");
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

  document.querySelectorAll("[data-date-picker]").forEach(initSinglePicker);
  document.querySelectorAll("[data-date-picker-range]").forEach(initRangePicker);

  if (!globalBound) {
    globalBound = true;

    document.addEventListener("click", function () {
      closeOpenPicker();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeOpenPicker();
    });
  }
})();
`;function _o(v){const S=document.createElement("script");S.textContent=v,document.body.appendChild(S),S.remove()}function Z1(v){js.useEffect(()=>{window.__tdsPreviewScriptsLoaded||(window.__tdsPreviewScriptsLoaded=!0,_o(R1),_o(q1),_o(U1))},[]),js.useEffect(()=>{const S=requestAnimationFrame(()=>{var D;(D=window.initPreviewSelects)==null||D.call(window)});return()=>cancelAnimationFrame(S)},[v])}function fo(){const v=window.location.hash.replace("#","");return!v||v==="home"?null:p1.includes(v)?v:null}function Y1(){var C;const[v,S]=js.useState(fo),[D,_]=js.useState(()=>fo()!==null),M=js.useRef(null),N=v===null,V=((C=ql.find(U=>U.id===v))==null?void 0:C.label)??"Overview",j=js.useCallback((U,{updateHash:O=!0,scrollTop:P=!0}={})=>{var As;S(U),O&&window.location.hash!==`#${U}`&&history.replaceState(null,"",`#${U}`),P&&((As=M.current)==null||As.scrollTo({top:0,behavior:"instant"}),window.scrollTo(0,0))},[]),E=js.useCallback(({updateHash:U=!0,scrollTop:O=!0}={})=>{var P;S(null),U&&window.location.hash!==""&&window.location.hash!=="#home"&&history.replaceState(null,"",window.location.pathname+window.location.search),O&&((P=M.current)==null||P.scrollTo({top:0,behavior:"instant"}),window.scrollTo(0,0))},[]);return js.useEffect(()=>{const U=()=>{var P;const O=fo();S(O),(P=M.current)==null||P.scrollTo({top:0,behavior:"instant"})};return window.addEventListener("hashchange",U),()=>window.removeEventListener("hashchange",U)},[]),Z1(v),c.jsxs("div",{className:`tds-preview${N?" tds-preview--home":" tds-preview--docs"}${D?"":" tds-preview--sidebar-closed"}`,children:[c.jsx(h1,{}),c.jsx(b1,{activeTab:v,isHome:N,isOpen:D,onSelect:j,onHome:E,onToggle:()=>_(U=>!U)}),c.jsx("div",{className:"tds-preview__shell",children:c.jsxs("div",{className:"tds-preview__workspace",children:[c.jsx(g1,{activeLabel:V,activeTab:v,isHome:N,sidebarOpen:D,onSelect:j,onHome:E,onToggleSidebar:()=>_(U=>!U)}),c.jsxs("main",{className:"tds-preview__main",ref:M,children:[c.jsxs("div",{className:"tds-preview__content",children:[N&&c.jsx(w1,{features:_1,onExplore:()=>j("buttons")}),c.jsxs("div",{className:"tds-preview__panels","aria-hidden":N,children:[v1.map(U=>c.jsx(m1,{section:U,active:!N&&U.id===v},U.id)),!N&&v==="tracker"&&c.jsx(j1,{})]})]}),c.jsxs("footer",{className:"tds-preview__footer",children:[c.jsx("span",{children:"Trulioo Design System · ADS 2026"}),!N&&c.jsx("a",{href:"../index.html",className:"tds-preview__footer-link",children:"Classic preview"})]})]})]})})]})}u1.createRoot(document.getElementById("root")).render(c.jsx(Y1,{}));
