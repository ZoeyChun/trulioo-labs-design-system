(function(){const S=document.createElement("link").relList;if(S&&S.supports&&S.supports("modulepreload"))return;for(const M of document.querySelectorAll('link[rel="modulepreload"]'))_(M);new MutationObserver(M=>{for(const N of M)if(N.type==="childList")for(const V of N.addedNodes)V.tagName==="LINK"&&V.rel==="modulepreload"&&_(V)}).observe(document,{childList:!0,subtree:!0});function T(M){const N={};return M.integrity&&(N.integrity=M.integrity),M.referrerPolicy&&(N.referrerPolicy=M.referrerPolicy),M.crossOrigin==="use-credentials"?N.credentials="include":M.crossOrigin==="anonymous"?N.credentials="omit":N.credentials="same-origin",N}function _(M){if(M.ep)return;M.ep=!0;const N=T(M);fetch(M.href,N)}})();var io={exports:{}},mn={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gv;function e1(){if(gv)return mn;gv=1;var v=Symbol.for("react.transitional.element"),S=Symbol.for("react.fragment");function T(_,M,N){var V=null;if(N!==void 0&&(V=""+N),M.key!==void 0&&(V=""+M.key),"key"in M){N={};for(var j in M)j!=="key"&&(N[j]=M[j])}else N=M;return M=N.ref,{$$typeof:v,type:_,key:V,ref:M!==void 0?M:null,props:N}}return mn.Fragment=S,mn.jsx=T,mn.jsxs=T,mn}var wv;function n1(){return wv||(wv=1,io.exports=e1()),io.exports}var c=n1(),oo={exports:{}},Z={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mv;function l1(){if(mv)return Z;mv=1;var v=Symbol.for("react.transitional.element"),S=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),_=Symbol.for("react.strict_mode"),M=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),V=Symbol.for("react.context"),j=Symbol.for("react.forward_ref"),L=Symbol.for("react.suspense"),C=Symbol.for("react.memo"),U=Symbol.for("react.lazy"),H=Symbol.for("react.activity"),P=Symbol.iterator;function Es(u){return u===null||typeof u!="object"?null:(u=P&&u[P]||u["@@iterator"],typeof u=="function"?u:null)}var Us={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Hs=Object.assign,Ta={};function Is(u,x,D){this.props=u,this.context=x,this.refs=Ta,this.updater=D||Us}Is.prototype.isReactComponent={},Is.prototype.setState=function(u,x){if(typeof u!="object"&&typeof u!="function"&&u!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,u,x,"setState")},Is.prototype.forceUpdate=function(u){this.updater.enqueueForceUpdate(this,u,"forceUpdate")};function Fa(){}Fa.prototype=Is.prototype;function zs(u,x,D){this.props=u,this.context=x,this.refs=Ta,this.updater=D||Us}var da=zs.prototype=new Fa;da.constructor=zs,Hs(da,Is.prototype),da.isPureReactComponent=!0;var ya=Array.isArray;function Rs(){}var W={H:null,A:null,T:null,S:null},qs=Object.prototype.hasOwnProperty;function xa(u,x,D){var E=D.ref;return{$$typeof:v,type:u,key:x,ref:E!==void 0?E:null,props:D}}function qt(u,x){return xa(u.type,x,u.props)}function Ca(u){return typeof u=="object"&&u!==null&&u.$$typeof===v}function Zs(u){var x={"=":"=0",":":"=2"};return"$"+u.replace(/[=:]/g,function(D){return x[D]})}var kt=/\/+/g;function La(u,x){return typeof u=="object"&&u!==null&&u.key!=null?Zs(""+u.key):x.toString(36)}function ga(u){switch(u.status){case"fulfilled":return u.value;case"rejected":throw u.reason;default:switch(typeof u.status=="string"?u.then(Rs,Rs):(u.status="pending",u.then(function(x){u.status==="pending"&&(u.status="fulfilled",u.value=x)},function(x){u.status==="pending"&&(u.status="rejected",u.reason=x)})),u.status){case"fulfilled":return u.value;case"rejected":throw u.reason}}throw u}function m(u,x,D,E,Y){var Q=typeof u;(Q==="undefined"||Q==="boolean")&&(u=null);var es=!1;if(u===null)es=!0;else switch(Q){case"bigint":case"string":case"number":es=!0;break;case"object":switch(u.$$typeof){case v:case S:es=!0;break;case U:return es=u._init,m(es(u._payload),x,D,E,Y)}}if(es)return Y=Y(u),es=E===""?"."+La(u,0):E,ya(Y)?(D="",es!=null&&(D=es.replace(kt,"$&/")+"/"),m(Y,x,D,"",function(Me){return Me})):Y!=null&&(Ca(Y)&&(Y=qt(Y,D+(Y.key==null||u&&u.key===Y.key?"":(""+Y.key).replace(kt,"$&/")+"/")+es)),x.push(Y)),1;es=0;var Os=E===""?".":E+":";if(ya(u))for(var bs=0;bs<u.length;bs++)E=u[bs],Q=Os+La(E,bs),es+=m(E,x,D,Q,Y);else if(bs=Es(u),typeof bs=="function")for(u=bs.call(u),bs=0;!(E=u.next()).done;)E=E.value,Q=Os+La(E,bs++),es+=m(E,x,D,Q,Y);else if(Q==="object"){if(typeof u.then=="function")return m(ga(u),x,D,E,Y);throw x=String(u),Error("Objects are not valid as a React child (found: "+(x==="[object Object]"?"object with keys {"+Object.keys(u).join(", ")+"}":x)+"). If you meant to render a collection of children, use an array instead.")}return es}function B(u,x,D){if(u==null)return u;var E=[],Y=0;return m(u,E,"","",function(Q){return x.call(D,Q,Y++)}),E}function q(u){if(u._status===-1){var x=u._result;x=x(),x.then(function(D){(u._status===0||u._status===-1)&&(u._status=1,u._result=D)},function(D){(u._status===0||u._status===-1)&&(u._status=2,u._result=D)}),u._status===-1&&(u._status=0,u._result=x)}if(u._status===1)return u._result.default;throw u._result}var is=typeof reportError=="function"?reportError:function(u){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var x=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof u=="object"&&u!==null&&typeof u.message=="string"?String(u.message):String(u),error:u});if(!window.dispatchEvent(x))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",u);return}console.error(u)},rs={map:B,forEach:function(u,x,D){B(u,function(){x.apply(this,arguments)},D)},count:function(u){var x=0;return B(u,function(){x++}),x},toArray:function(u){return B(u,function(x){return x})||[]},only:function(u){if(!Ca(u))throw Error("React.Children.only expected to receive a single React element child.");return u}};return Z.Activity=H,Z.Children=rs,Z.Component=Is,Z.Fragment=T,Z.Profiler=M,Z.PureComponent=zs,Z.StrictMode=_,Z.Suspense=L,Z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=W,Z.__COMPILER_RUNTIME={__proto__:null,c:function(u){return W.H.useMemoCache(u)}},Z.cache=function(u){return function(){return u.apply(null,arguments)}},Z.cacheSignal=function(){return null},Z.cloneElement=function(u,x,D){if(u==null)throw Error("The argument must be a React element, but you passed "+u+".");var E=Hs({},u.props),Y=u.key;if(x!=null)for(Q in x.key!==void 0&&(Y=""+x.key),x)!qs.call(x,Q)||Q==="key"||Q==="__self"||Q==="__source"||Q==="ref"&&x.ref===void 0||(E[Q]=x[Q]);var Q=arguments.length-2;if(Q===1)E.children=D;else if(1<Q){for(var es=Array(Q),Os=0;Os<Q;Os++)es[Os]=arguments[Os+2];E.children=es}return xa(u.type,Y,E)},Z.createContext=function(u){return u={$$typeof:V,_currentValue:u,_currentValue2:u,_threadCount:0,Provider:null,Consumer:null},u.Provider=u,u.Consumer={$$typeof:N,_context:u},u},Z.createElement=function(u,x,D){var E,Y={},Q=null;if(x!=null)for(E in x.key!==void 0&&(Q=""+x.key),x)qs.call(x,E)&&E!=="key"&&E!=="__self"&&E!=="__source"&&(Y[E]=x[E]);var es=arguments.length-2;if(es===1)Y.children=D;else if(1<es){for(var Os=Array(es),bs=0;bs<es;bs++)Os[bs]=arguments[bs+2];Y.children=Os}if(u&&u.defaultProps)for(E in es=u.defaultProps,es)Y[E]===void 0&&(Y[E]=es[E]);return xa(u,Q,Y)},Z.createRef=function(){return{current:null}},Z.forwardRef=function(u){return{$$typeof:j,render:u}},Z.isValidElement=Ca,Z.lazy=function(u){return{$$typeof:U,_payload:{_status:-1,_result:u},_init:q}},Z.memo=function(u,x){return{$$typeof:C,type:u,compare:x===void 0?null:x}},Z.startTransition=function(u){var x=W.T,D={};W.T=D;try{var E=u(),Y=W.S;Y!==null&&Y(D,E),typeof E=="object"&&E!==null&&typeof E.then=="function"&&E.then(Rs,is)}catch(Q){is(Q)}finally{x!==null&&D.types!==null&&(x.types=D.types),W.T=x}},Z.unstable_useCacheRefresh=function(){return W.H.useCacheRefresh()},Z.use=function(u){return W.H.use(u)},Z.useActionState=function(u,x,D){return W.H.useActionState(u,x,D)},Z.useCallback=function(u,x){return W.H.useCallback(u,x)},Z.useContext=function(u){return W.H.useContext(u)},Z.useDebugValue=function(){},Z.useDeferredValue=function(u,x){return W.H.useDeferredValue(u,x)},Z.useEffect=function(u,x){return W.H.useEffect(u,x)},Z.useEffectEvent=function(u){return W.H.useEffectEvent(u)},Z.useId=function(){return W.H.useId()},Z.useImperativeHandle=function(u,x,D){return W.H.useImperativeHandle(u,x,D)},Z.useInsertionEffect=function(u,x){return W.H.useInsertionEffect(u,x)},Z.useLayoutEffect=function(u,x){return W.H.useLayoutEffect(u,x)},Z.useMemo=function(u,x){return W.H.useMemo(u,x)},Z.useOptimistic=function(u,x){return W.H.useOptimistic(u,x)},Z.useReducer=function(u,x,D){return W.H.useReducer(u,x,D)},Z.useRef=function(u){return W.H.useRef(u)},Z.useState=function(u){return W.H.useState(u)},Z.useSyncExternalStore=function(u,x,D){return W.H.useSyncExternalStore(u,x,D)},Z.useTransition=function(){return W.H.useTransition()},Z.version="19.2.7",Z}var kv;function fo(){return kv||(kv=1,oo.exports=l1()),oo.exports}var js=fo(),co={exports:{}},kn={},ro={exports:{}},uo={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yv;function i1(){return yv||(yv=1,(function(v){function S(m,B){var q=m.length;m.push(B);s:for(;0<q;){var is=q-1>>>1,rs=m[is];if(0<M(rs,B))m[is]=B,m[q]=rs,q=is;else break s}}function T(m){return m.length===0?null:m[0]}function _(m){if(m.length===0)return null;var B=m[0],q=m.pop();if(q!==B){m[0]=q;s:for(var is=0,rs=m.length,u=rs>>>1;is<u;){var x=2*(is+1)-1,D=m[x],E=x+1,Y=m[E];if(0>M(D,q))E<rs&&0>M(Y,D)?(m[is]=Y,m[E]=q,is=E):(m[is]=D,m[x]=q,is=x);else if(E<rs&&0>M(Y,q))m[is]=Y,m[E]=q,is=E;else break s}}return B}function M(m,B){var q=m.sortIndex-B.sortIndex;return q!==0?q:m.id-B.id}if(v.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var N=performance;v.unstable_now=function(){return N.now()}}else{var V=Date,j=V.now();v.unstable_now=function(){return V.now()-j}}var L=[],C=[],U=1,H=null,P=3,Es=!1,Us=!1,Hs=!1,Ta=!1,Is=typeof setTimeout=="function"?setTimeout:null,Fa=typeof clearTimeout=="function"?clearTimeout:null,zs=typeof setImmediate<"u"?setImmediate:null;function da(m){for(var B=T(C);B!==null;){if(B.callback===null)_(C);else if(B.startTime<=m)_(C),B.sortIndex=B.expirationTime,S(L,B);else break;B=T(C)}}function ya(m){if(Hs=!1,da(m),!Us)if(T(L)!==null)Us=!0,Rs||(Rs=!0,Zs());else{var B=T(C);B!==null&&ga(ya,B.startTime-m)}}var Rs=!1,W=-1,qs=5,xa=-1;function qt(){return Ta?!0:!(v.unstable_now()-xa<qs)}function Ca(){if(Ta=!1,Rs){var m=v.unstable_now();xa=m;var B=!0;try{s:{Us=!1,Hs&&(Hs=!1,Fa(W),W=-1),Es=!0;var q=P;try{a:{for(da(m),H=T(L);H!==null&&!(H.expirationTime>m&&qt());){var is=H.callback;if(typeof is=="function"){H.callback=null,P=H.priorityLevel;var rs=is(H.expirationTime<=m);if(m=v.unstable_now(),typeof rs=="function"){H.callback=rs,da(m),B=!0;break a}H===T(L)&&_(L),da(m)}else _(L);H=T(L)}if(H!==null)B=!0;else{var u=T(C);u!==null&&ga(ya,u.startTime-m),B=!1}}break s}finally{H=null,P=q,Es=!1}B=void 0}}finally{B?Zs():Rs=!1}}}var Zs;if(typeof zs=="function")Zs=function(){zs(Ca)};else if(typeof MessageChannel<"u"){var kt=new MessageChannel,La=kt.port2;kt.port1.onmessage=Ca,Zs=function(){La.postMessage(null)}}else Zs=function(){Is(Ca,0)};function ga(m,B){W=Is(function(){m(v.unstable_now())},B)}v.unstable_IdlePriority=5,v.unstable_ImmediatePriority=1,v.unstable_LowPriority=4,v.unstable_NormalPriority=3,v.unstable_Profiling=null,v.unstable_UserBlockingPriority=2,v.unstable_cancelCallback=function(m){m.callback=null},v.unstable_forceFrameRate=function(m){0>m||125<m?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):qs=0<m?Math.floor(1e3/m):5},v.unstable_getCurrentPriorityLevel=function(){return P},v.unstable_next=function(m){switch(P){case 1:case 2:case 3:var B=3;break;default:B=P}var q=P;P=B;try{return m()}finally{P=q}},v.unstable_requestPaint=function(){Ta=!0},v.unstable_runWithPriority=function(m,B){switch(m){case 1:case 2:case 3:case 4:case 5:break;default:m=3}var q=P;P=m;try{return B()}finally{P=q}},v.unstable_scheduleCallback=function(m,B,q){var is=v.unstable_now();switch(typeof q=="object"&&q!==null?(q=q.delay,q=typeof q=="number"&&0<q?is+q:is):q=is,m){case 1:var rs=-1;break;case 2:rs=250;break;case 5:rs=1073741823;break;case 4:rs=1e4;break;default:rs=5e3}return rs=q+rs,m={id:U++,callback:B,priorityLevel:m,startTime:q,expirationTime:rs,sortIndex:-1},q>is?(m.sortIndex=q,S(C,m),T(L)===null&&m===T(C)&&(Hs?(Fa(W),W=-1):Hs=!0,ga(ya,q-is))):(m.sortIndex=rs,S(L,m),Us||Es||(Us=!0,Rs||(Rs=!0,Zs()))),m},v.unstable_shouldYield=qt,v.unstable_wrapCallback=function(m){var B=P;return function(){var q=P;P=B;try{return m.apply(this,arguments)}finally{P=q}}}})(uo)),uo}var xv;function d1(){return xv||(xv=1,ro.exports=i1()),ro.exports}var vo={exports:{}},Ns={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cv;function o1(){if(Cv)return Ns;Cv=1;var v=fo();function S(L){var C="https://react.dev/errors/"+L;if(1<arguments.length){C+="?args[]="+encodeURIComponent(arguments[1]);for(var U=2;U<arguments.length;U++)C+="&args[]="+encodeURIComponent(arguments[U])}return"Minified React error #"+L+"; visit "+C+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function T(){}var _={d:{f:T,r:function(){throw Error(S(522))},D:T,C:T,L:T,m:T,X:T,S:T,M:T},p:0,findDOMNode:null},M=Symbol.for("react.portal");function N(L,C,U){var H=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:M,key:H==null?null:""+H,children:L,containerInfo:C,implementation:U}}var V=v.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function j(L,C){if(L==="font")return"";if(typeof C=="string")return C==="use-credentials"?C:""}return Ns.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=_,Ns.createPortal=function(L,C){var U=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!C||C.nodeType!==1&&C.nodeType!==9&&C.nodeType!==11)throw Error(S(299));return N(L,C,null,U)},Ns.flushSync=function(L){var C=V.T,U=_.p;try{if(V.T=null,_.p=2,L)return L()}finally{V.T=C,_.p=U,_.d.f()}},Ns.preconnect=function(L,C){typeof L=="string"&&(C?(C=C.crossOrigin,C=typeof C=="string"?C==="use-credentials"?C:"":void 0):C=null,_.d.C(L,C))},Ns.prefetchDNS=function(L){typeof L=="string"&&_.d.D(L)},Ns.preinit=function(L,C){if(typeof L=="string"&&C&&typeof C.as=="string"){var U=C.as,H=j(U,C.crossOrigin),P=typeof C.integrity=="string"?C.integrity:void 0,Es=typeof C.fetchPriority=="string"?C.fetchPriority:void 0;U==="style"?_.d.S(L,typeof C.precedence=="string"?C.precedence:void 0,{crossOrigin:H,integrity:P,fetchPriority:Es}):U==="script"&&_.d.X(L,{crossOrigin:H,integrity:P,fetchPriority:Es,nonce:typeof C.nonce=="string"?C.nonce:void 0})}},Ns.preinitModule=function(L,C){if(typeof L=="string")if(typeof C=="object"&&C!==null){if(C.as==null||C.as==="script"){var U=j(C.as,C.crossOrigin);_.d.M(L,{crossOrigin:U,integrity:typeof C.integrity=="string"?C.integrity:void 0,nonce:typeof C.nonce=="string"?C.nonce:void 0})}}else C==null&&_.d.M(L)},Ns.preload=function(L,C){if(typeof L=="string"&&typeof C=="object"&&C!==null&&typeof C.as=="string"){var U=C.as,H=j(U,C.crossOrigin);_.d.L(L,U,{crossOrigin:H,integrity:typeof C.integrity=="string"?C.integrity:void 0,nonce:typeof C.nonce=="string"?C.nonce:void 0,type:typeof C.type=="string"?C.type:void 0,fetchPriority:typeof C.fetchPriority=="string"?C.fetchPriority:void 0,referrerPolicy:typeof C.referrerPolicy=="string"?C.referrerPolicy:void 0,imageSrcSet:typeof C.imageSrcSet=="string"?C.imageSrcSet:void 0,imageSizes:typeof C.imageSizes=="string"?C.imageSizes:void 0,media:typeof C.media=="string"?C.media:void 0})}},Ns.preloadModule=function(L,C){if(typeof L=="string")if(C){var U=j(C.as,C.crossOrigin);_.d.m(L,{as:typeof C.as=="string"&&C.as!=="script"?C.as:void 0,crossOrigin:U,integrity:typeof C.integrity=="string"?C.integrity:void 0})}else _.d.m(L)},Ns.requestFormReset=function(L){_.d.r(L)},Ns.unstable_batchedUpdates=function(L,C){return L(C)},Ns.useFormState=function(L,C,U){return V.H.useFormState(L,C,U)},Ns.useFormStatus=function(){return V.H.useHostTransitionStatus()},Ns.version="19.2.7",Ns}var Sv;function c1(){if(Sv)return vo.exports;Sv=1;function v(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(v)}catch(S){console.error(S)}}return v(),vo.exports=o1(),vo.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mv;function r1(){if(Mv)return kn;Mv=1;var v=d1(),S=fo(),T=c1();function _(s){var a="https://react.dev/errors/"+s;if(1<arguments.length){a+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)a+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+s+"; visit "+a+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function M(s){return!(!s||s.nodeType!==1&&s.nodeType!==9&&s.nodeType!==11)}function N(s){var a=s,t=s;if(s.alternate)for(;a.return;)a=a.return;else{s=a;do a=s,(a.flags&4098)!==0&&(t=a.return),s=a.return;while(s)}return a.tag===3?t:null}function V(s){if(s.tag===13){var a=s.memoizedState;if(a===null&&(s=s.alternate,s!==null&&(a=s.memoizedState)),a!==null)return a.dehydrated}return null}function j(s){if(s.tag===31){var a=s.memoizedState;if(a===null&&(s=s.alternate,s!==null&&(a=s.memoizedState)),a!==null)return a.dehydrated}return null}function L(s){if(N(s)!==s)throw Error(_(188))}function C(s){var a=s.alternate;if(!a){if(a=N(s),a===null)throw Error(_(188));return a!==s?null:s}for(var t=s,e=a;;){var n=t.return;if(n===null)break;var l=n.alternate;if(l===null){if(e=n.return,e!==null){t=e;continue}break}if(n.child===l.child){for(l=n.child;l;){if(l===t)return L(n),s;if(l===e)return L(n),a;l=l.sibling}throw Error(_(188))}if(t.return!==e.return)t=n,e=l;else{for(var i=!1,d=n.child;d;){if(d===t){i=!0,t=n,e=l;break}if(d===e){i=!0,e=n,t=l;break}d=d.sibling}if(!i){for(d=l.child;d;){if(d===t){i=!0,t=l,e=n;break}if(d===e){i=!0,e=l,t=n;break}d=d.sibling}if(!i)throw Error(_(189))}}if(t.alternate!==e)throw Error(_(190))}if(t.tag!==3)throw Error(_(188));return t.stateNode.current===t?s:a}function U(s){var a=s.tag;if(a===5||a===26||a===27||a===6)return s;for(s=s.child;s!==null;){if(a=U(s),a!==null)return a;s=s.sibling}return null}var H=Object.assign,P=Symbol.for("react.element"),Es=Symbol.for("react.transitional.element"),Us=Symbol.for("react.portal"),Hs=Symbol.for("react.fragment"),Ta=Symbol.for("react.strict_mode"),Is=Symbol.for("react.profiler"),Fa=Symbol.for("react.consumer"),zs=Symbol.for("react.context"),da=Symbol.for("react.forward_ref"),ya=Symbol.for("react.suspense"),Rs=Symbol.for("react.suspense_list"),W=Symbol.for("react.memo"),qs=Symbol.for("react.lazy"),xa=Symbol.for("react.activity"),qt=Symbol.for("react.memo_cache_sentinel"),Ca=Symbol.iterator;function Zs(s){return s===null||typeof s!="object"?null:(s=Ca&&s[Ca]||s["@@iterator"],typeof s=="function"?s:null)}var kt=Symbol.for("react.client.reference");function La(s){if(s==null)return null;if(typeof s=="function")return s.$$typeof===kt?null:s.displayName||s.name||null;if(typeof s=="string")return s;switch(s){case Hs:return"Fragment";case Is:return"Profiler";case Ta:return"StrictMode";case ya:return"Suspense";case Rs:return"SuspenseList";case xa:return"Activity"}if(typeof s=="object")switch(s.$$typeof){case Us:return"Portal";case zs:return s.displayName||"Context";case Fa:return(s._context.displayName||"Context")+".Consumer";case da:var a=s.render;return s=s.displayName,s||(s=a.displayName||a.name||"",s=s!==""?"ForwardRef("+s+")":"ForwardRef"),s;case W:return a=s.displayName||null,a!==null?a:La(s.type)||"Memo";case qs:a=s._payload,s=s._init;try{return La(s(a))}catch{}}return null}var ga=Array.isArray,m=S.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,B=T.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,q={pending:!1,data:null,method:null,action:null},is=[],rs=-1;function u(s){return{current:s}}function x(s){0>rs||(s.current=is[rs],is[rs]=null,rs--)}function D(s,a){rs++,is[rs]=s.current,s.current=a}var E=u(null),Y=u(null),Q=u(null),es=u(null);function Os(s,a){switch(D(Q,a),D(Y,s),D(E,null),a.nodeType){case 9:case 11:s=(s=a.documentElement)&&(s=s.namespaceURI)?qu(s):0;break;default:if(s=a.tagName,a=a.namespaceURI)a=qu(a),s=Zu(a,s);else switch(s){case"svg":s=1;break;case"math":s=2;break;default:s=0}}x(E),D(E,s)}function bs(){x(E),x(Y),x(Q)}function Me(s){s.memoizedState!==null&&D(es,s);var a=E.current,t=Zu(a,s.type);a!==t&&(D(Y,s),D(E,t))}function xn(s){Y.current===s&&(x(E),x(Y)),es.current===s&&(x(es),fn._currentValue=q)}var Zl,bo;function yt(s){if(Zl===void 0)try{throw Error()}catch(t){var a=t.stack.trim().match(/\n( *(at )?)/);Zl=a&&a[1]||"",bo=-1<t.stack.indexOf(`
    at`)?" (<anonymous>)":-1<t.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Zl+s+bo}var Yl=!1;function Gl(s,a){if(!s||Yl)return"";Yl=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var e={DetermineComponentFrameRoot:function(){try{if(a){var y=function(){throw Error()};if(Object.defineProperty(y.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(y,[])}catch(g){var b=g}Reflect.construct(s,[],y)}else{try{y.call()}catch(g){b=g}s.call(y.prototype)}}else{try{throw Error()}catch(g){b=g}(y=s())&&typeof y.catch=="function"&&y.catch(function(){})}}catch(g){if(g&&b&&typeof g.stack=="string")return[g.stack,b.stack]}return[null,null]}};e.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var n=Object.getOwnPropertyDescriptor(e.DetermineComponentFrameRoot,"name");n&&n.configurable&&Object.defineProperty(e.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var l=e.DetermineComponentFrameRoot(),i=l[0],d=l[1];if(i&&d){var o=i.split(`
`),f=d.split(`
`);for(n=e=0;e<o.length&&!o[e].includes("DetermineComponentFrameRoot");)e++;for(;n<f.length&&!f[n].includes("DetermineComponentFrameRoot");)n++;if(e===o.length||n===f.length)for(e=o.length-1,n=f.length-1;1<=e&&0<=n&&o[e]!==f[n];)n--;for(;1<=e&&0<=n;e--,n--)if(o[e]!==f[n]){if(e!==1||n!==1)do if(e--,n--,0>n||o[e]!==f[n]){var w=`
`+o[e].replace(" at new "," at ");return s.displayName&&w.includes("<anonymous>")&&(w=w.replace("<anonymous>",s.displayName)),w}while(1<=e&&0<=n);break}}}finally{Yl=!1,Error.prepareStackTrace=t}return(t=s?s.displayName||s.name:"")?yt(t):""}function Nv(s,a){switch(s.tag){case 26:case 27:case 5:return yt(s.type);case 16:return yt("Lazy");case 13:return s.child!==a&&a!==null?yt("Suspense Fallback"):yt("Suspense");case 19:return yt("SuspenseList");case 0:case 15:return Gl(s.type,!1);case 11:return Gl(s.type.render,!1);case 1:return Gl(s.type,!0);case 31:return yt("Activity");default:return""}}function go(s){try{var a="",t=null;do a+=Nv(s,t),t=s,s=s.return;while(s);return a}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Xl=Object.prototype.hasOwnProperty,Ql=v.unstable_scheduleCallback,Kl=v.unstable_cancelCallback,Hv=v.unstable_shouldYield,Ov=v.unstable_requestPaint,Ws=v.unstable_now,Vv=v.unstable_getCurrentPriorityLevel,wo=v.unstable_ImmediatePriority,mo=v.unstable_UserBlockingPriority,Cn=v.unstable_NormalPriority,jv=v.unstable_LowPriority,ko=v.unstable_IdlePriority,Uv=v.log,Rv=v.unstable_setDisableYieldValue,Be=null,$s=null;function Ia(s){if(typeof Uv=="function"&&Rv(s),$s&&typeof $s.setStrictMode=="function")try{$s.setStrictMode(Be,s)}catch{}}var Ps=Math.clz32?Math.clz32:Yv,qv=Math.log,Zv=Math.LN2;function Yv(s){return s>>>=0,s===0?32:31-(qv(s)/Zv|0)|0}var Sn=256,Mn=262144,Bn=4194304;function xt(s){var a=s&42;if(a!==0)return a;switch(s&-s){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return s&261888;case 262144:case 524288:case 1048576:case 2097152:return s&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return s&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return s}}function Dn(s,a,t){var e=s.pendingLanes;if(e===0)return 0;var n=0,l=s.suspendedLanes,i=s.pingedLanes;s=s.warmLanes;var d=e&134217727;return d!==0?(e=d&~l,e!==0?n=xt(e):(i&=d,i!==0?n=xt(i):t||(t=d&~s,t!==0&&(n=xt(t))))):(d=e&~l,d!==0?n=xt(d):i!==0?n=xt(i):t||(t=e&~s,t!==0&&(n=xt(t)))),n===0?0:a!==0&&a!==n&&(a&l)===0&&(l=n&-n,t=a&-a,l>=t||l===32&&(t&4194048)!==0)?a:n}function De(s,a){return(s.pendingLanes&~(s.suspendedLanes&~s.pingedLanes)&a)===0}function Gv(s,a){switch(s){case 1:case 2:case 4:case 8:case 64:return a+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function yo(){var s=Bn;return Bn<<=1,(Bn&62914560)===0&&(Bn=4194304),s}function Jl(s){for(var a=[],t=0;31>t;t++)a.push(s);return a}function Te(s,a){s.pendingLanes|=a,a!==268435456&&(s.suspendedLanes=0,s.pingedLanes=0,s.warmLanes=0)}function Xv(s,a,t,e,n,l){var i=s.pendingLanes;s.pendingLanes=t,s.suspendedLanes=0,s.pingedLanes=0,s.warmLanes=0,s.expiredLanes&=t,s.entangledLanes&=t,s.errorRecoveryDisabledLanes&=t,s.shellSuspendCounter=0;var d=s.entanglements,o=s.expirationTimes,f=s.hiddenUpdates;for(t=i&~t;0<t;){var w=31-Ps(t),y=1<<w;d[w]=0,o[w]=-1;var b=f[w];if(b!==null)for(f[w]=null,w=0;w<b.length;w++){var g=b[w];g!==null&&(g.lane&=-536870913)}t&=~y}e!==0&&xo(s,e,0),l!==0&&n===0&&s.tag!==0&&(s.suspendedLanes|=l&~(i&~a))}function xo(s,a,t){s.pendingLanes|=a,s.suspendedLanes&=~a;var e=31-Ps(a);s.entangledLanes|=a,s.entanglements[e]=s.entanglements[e]|1073741824|t&261930}function Co(s,a){var t=s.entangledLanes|=a;for(s=s.entanglements;t;){var e=31-Ps(t),n=1<<e;n&a|s[e]&a&&(s[e]|=a),t&=~n}}function So(s,a){var t=a&-a;return t=(t&42)!==0?1:Fl(t),(t&(s.suspendedLanes|a))!==0?0:t}function Fl(s){switch(s){case 2:s=1;break;case 8:s=4;break;case 32:s=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:s=128;break;case 268435456:s=134217728;break;default:s=0}return s}function Il(s){return s&=-s,2<s?8<s?(s&134217727)!==0?32:268435456:8:2}function Mo(){var s=B.p;return s!==0?s:(s=window.event,s===void 0?32:uv(s.type))}function Bo(s,a){var t=B.p;try{return B.p=s,a()}finally{B.p=t}}var Wa=Math.random().toString(36).slice(2),Bs="__reactFiber$"+Wa,Ys="__reactProps$"+Wa,Zt="__reactContainer$"+Wa,Wl="__reactEvents$"+Wa,Qv="__reactListeners$"+Wa,Kv="__reactHandles$"+Wa,Do="__reactResources$"+Wa,Le="__reactMarker$"+Wa;function $l(s){delete s[Bs],delete s[Ys],delete s[Wl],delete s[Qv],delete s[Kv]}function Yt(s){var a=s[Bs];if(a)return a;for(var t=s.parentNode;t;){if(a=t[Zt]||t[Bs]){if(t=a.alternate,a.child!==null||t!==null&&t.child!==null)for(s=Fu(s);s!==null;){if(t=s[Bs])return t;s=Fu(s)}return a}s=t,t=s.parentNode}return null}function Gt(s){if(s=s[Bs]||s[Zt]){var a=s.tag;if(a===5||a===6||a===13||a===31||a===26||a===27||a===3)return s}return null}function Ae(s){var a=s.tag;if(a===5||a===26||a===27||a===6)return s.stateNode;throw Error(_(33))}function Xt(s){var a=s[Do];return a||(a=s[Do]={hoistableStyles:new Map,hoistableScripts:new Map}),a}function Ss(s){s[Le]=!0}var To=new Set,Lo={};function Ct(s,a){Qt(s,a),Qt(s+"Capture",a)}function Qt(s,a){for(Lo[s]=a,s=0;s<a.length;s++)To.add(a[s])}var Jv=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Ao={},Eo={};function Fv(s){return Xl.call(Eo,s)?!0:Xl.call(Ao,s)?!1:Jv.test(s)?Eo[s]=!0:(Ao[s]=!0,!1)}function Tn(s,a,t){if(Fv(a))if(t===null)s.removeAttribute(a);else{switch(typeof t){case"undefined":case"function":case"symbol":s.removeAttribute(a);return;case"boolean":var e=a.toLowerCase().slice(0,5);if(e!=="data-"&&e!=="aria-"){s.removeAttribute(a);return}}s.setAttribute(a,""+t)}}function Ln(s,a,t){if(t===null)s.removeAttribute(a);else{switch(typeof t){case"undefined":case"function":case"symbol":case"boolean":s.removeAttribute(a);return}s.setAttribute(a,""+t)}}function Aa(s,a,t,e){if(e===null)s.removeAttribute(t);else{switch(typeof e){case"undefined":case"function":case"symbol":case"boolean":s.removeAttribute(t);return}s.setAttributeNS(a,t,""+e)}}function oa(s){switch(typeof s){case"bigint":case"boolean":case"number":case"string":case"undefined":return s;case"object":return s;default:return""}}function zo(s){var a=s.type;return(s=s.nodeName)&&s.toLowerCase()==="input"&&(a==="checkbox"||a==="radio")}function Iv(s,a,t){var e=Object.getOwnPropertyDescriptor(s.constructor.prototype,a);if(!s.hasOwnProperty(a)&&typeof e<"u"&&typeof e.get=="function"&&typeof e.set=="function"){var n=e.get,l=e.set;return Object.defineProperty(s,a,{configurable:!0,get:function(){return n.call(this)},set:function(i){t=""+i,l.call(this,i)}}),Object.defineProperty(s,a,{enumerable:e.enumerable}),{getValue:function(){return t},setValue:function(i){t=""+i},stopTracking:function(){s._valueTracker=null,delete s[a]}}}}function Pl(s){if(!s._valueTracker){var a=zo(s)?"checked":"value";s._valueTracker=Iv(s,a,""+s[a])}}function No(s){if(!s)return!1;var a=s._valueTracker;if(!a)return!0;var t=a.getValue(),e="";return s&&(e=zo(s)?s.checked?"true":"false":s.value),s=e,s!==t?(a.setValue(s),!0):!1}function An(s){if(s=s||(typeof document<"u"?document:void 0),typeof s>"u")return null;try{return s.activeElement||s.body}catch{return s.body}}var Wv=/[\n"\\]/g;function ca(s){return s.replace(Wv,function(a){return"\\"+a.charCodeAt(0).toString(16)+" "})}function si(s,a,t,e,n,l,i,d){s.name="",i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"?s.type=i:s.removeAttribute("type"),a!=null?i==="number"?(a===0&&s.value===""||s.value!=a)&&(s.value=""+oa(a)):s.value!==""+oa(a)&&(s.value=""+oa(a)):i!=="submit"&&i!=="reset"||s.removeAttribute("value"),a!=null?ai(s,i,oa(a)):t!=null?ai(s,i,oa(t)):e!=null&&s.removeAttribute("value"),n==null&&l!=null&&(s.defaultChecked=!!l),n!=null&&(s.checked=n&&typeof n!="function"&&typeof n!="symbol"),d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"?s.name=""+oa(d):s.removeAttribute("name")}function Ho(s,a,t,e,n,l,i,d){if(l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"&&(s.type=l),a!=null||t!=null){if(!(l!=="submit"&&l!=="reset"||a!=null)){Pl(s);return}t=t!=null?""+oa(t):"",a=a!=null?""+oa(a):t,d||a===s.value||(s.value=a),s.defaultValue=a}e=e??n,e=typeof e!="function"&&typeof e!="symbol"&&!!e,s.checked=d?s.checked:!!e,s.defaultChecked=!!e,i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(s.name=i),Pl(s)}function ai(s,a,t){a==="number"&&An(s.ownerDocument)===s||s.defaultValue===""+t||(s.defaultValue=""+t)}function Kt(s,a,t,e){if(s=s.options,a){a={};for(var n=0;n<t.length;n++)a["$"+t[n]]=!0;for(t=0;t<s.length;t++)n=a.hasOwnProperty("$"+s[t].value),s[t].selected!==n&&(s[t].selected=n),n&&e&&(s[t].defaultSelected=!0)}else{for(t=""+oa(t),a=null,n=0;n<s.length;n++){if(s[n].value===t){s[n].selected=!0,e&&(s[n].defaultSelected=!0);return}a!==null||s[n].disabled||(a=s[n])}a!==null&&(a.selected=!0)}}function Oo(s,a,t){if(a!=null&&(a=""+oa(a),a!==s.value&&(s.value=a),t==null)){s.defaultValue!==a&&(s.defaultValue=a);return}s.defaultValue=t!=null?""+oa(t):""}function Vo(s,a,t,e){if(a==null){if(e!=null){if(t!=null)throw Error(_(92));if(ga(e)){if(1<e.length)throw Error(_(93));e=e[0]}t=e}t==null&&(t=""),a=t}t=oa(a),s.defaultValue=t,e=s.textContent,e===t&&e!==""&&e!==null&&(s.value=e),Pl(s)}function Jt(s,a){if(a){var t=s.firstChild;if(t&&t===s.lastChild&&t.nodeType===3){t.nodeValue=a;return}}s.textContent=a}var $v=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function jo(s,a,t){var e=a.indexOf("--")===0;t==null||typeof t=="boolean"||t===""?e?s.setProperty(a,""):a==="float"?s.cssFloat="":s[a]="":e?s.setProperty(a,t):typeof t!="number"||t===0||$v.has(a)?a==="float"?s.cssFloat=t:s[a]=(""+t).trim():s[a]=t+"px"}function Uo(s,a,t){if(a!=null&&typeof a!="object")throw Error(_(62));if(s=s.style,t!=null){for(var e in t)!t.hasOwnProperty(e)||a!=null&&a.hasOwnProperty(e)||(e.indexOf("--")===0?s.setProperty(e,""):e==="float"?s.cssFloat="":s[e]="");for(var n in a)e=a[n],a.hasOwnProperty(n)&&t[n]!==e&&jo(s,n,e)}else for(var l in a)a.hasOwnProperty(l)&&jo(s,l,a[l])}function ti(s){if(s.indexOf("-")===-1)return!1;switch(s){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Pv=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),sp=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function En(s){return sp.test(""+s)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":s}function Ea(){}var ei=null;function ni(s){return s=s.target||s.srcElement||window,s.correspondingUseElement&&(s=s.correspondingUseElement),s.nodeType===3?s.parentNode:s}var Ft=null,It=null;function Ro(s){var a=Gt(s);if(a&&(s=a.stateNode)){var t=s[Ys]||null;s:switch(s=a.stateNode,a.type){case"input":if(si(s,t.value,t.defaultValue,t.defaultValue,t.checked,t.defaultChecked,t.type,t.name),a=t.name,t.type==="radio"&&a!=null){for(t=s;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll('input[name="'+ca(""+a)+'"][type="radio"]'),a=0;a<t.length;a++){var e=t[a];if(e!==s&&e.form===s.form){var n=e[Ys]||null;if(!n)throw Error(_(90));si(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name)}}for(a=0;a<t.length;a++)e=t[a],e.form===s.form&&No(e)}break s;case"textarea":Oo(s,t.value,t.defaultValue);break s;case"select":a=t.value,a!=null&&Kt(s,!!t.multiple,a,!1)}}}var li=!1;function qo(s,a,t){if(li)return s(a,t);li=!0;try{var e=s(a);return e}finally{if(li=!1,(Ft!==null||It!==null)&&(wl(),Ft&&(a=Ft,s=It,It=Ft=null,Ro(a),s)))for(a=0;a<s.length;a++)Ro(s[a])}}function Ee(s,a){var t=s.stateNode;if(t===null)return null;var e=t[Ys]||null;if(e===null)return null;t=e[a];s:switch(a){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(e=!e.disabled)||(s=s.type,e=!(s==="button"||s==="input"||s==="select"||s==="textarea")),s=!e;break s;default:s=!1}if(s)return null;if(t&&typeof t!="function")throw Error(_(231,a,typeof t));return t}var za=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ii=!1;if(za)try{var ze={};Object.defineProperty(ze,"passive",{get:function(){ii=!0}}),window.addEventListener("test",ze,ze),window.removeEventListener("test",ze,ze)}catch{ii=!1}var $a=null,di=null,zn=null;function Zo(){if(zn)return zn;var s,a=di,t=a.length,e,n="value"in $a?$a.value:$a.textContent,l=n.length;for(s=0;s<t&&a[s]===n[s];s++);var i=t-s;for(e=1;e<=i&&a[t-e]===n[l-e];e++);return zn=n.slice(s,1<e?1-e:void 0)}function Nn(s){var a=s.keyCode;return"charCode"in s?(s=s.charCode,s===0&&a===13&&(s=13)):s=a,s===10&&(s=13),32<=s||s===13?s:0}function Hn(){return!0}function Yo(){return!1}function Gs(s){function a(t,e,n,l,i){this._reactName=t,this._targetInst=n,this.type=e,this.nativeEvent=l,this.target=i,this.currentTarget=null;for(var d in s)s.hasOwnProperty(d)&&(t=s[d],this[d]=t?t(l):l[d]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Hn:Yo,this.isPropagationStopped=Yo,this}return H(a.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Hn)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Hn)},persist:function(){},isPersistent:Hn}),a}var St={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(s){return s.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},On=Gs(St),Ne=H({},St,{view:0,detail:0}),ap=Gs(Ne),oi,ci,He,Vn=H({},Ne,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ui,button:0,buttons:0,relatedTarget:function(s){return s.relatedTarget===void 0?s.fromElement===s.srcElement?s.toElement:s.fromElement:s.relatedTarget},movementX:function(s){return"movementX"in s?s.movementX:(s!==He&&(He&&s.type==="mousemove"?(oi=s.screenX-He.screenX,ci=s.screenY-He.screenY):ci=oi=0,He=s),oi)},movementY:function(s){return"movementY"in s?s.movementY:ci}}),Go=Gs(Vn),tp=H({},Vn,{dataTransfer:0}),ep=Gs(tp),np=H({},Ne,{relatedTarget:0}),ri=Gs(np),lp=H({},St,{animationName:0,elapsedTime:0,pseudoElement:0}),ip=Gs(lp),dp=H({},St,{clipboardData:function(s){return"clipboardData"in s?s.clipboardData:window.clipboardData}}),op=Gs(dp),cp=H({},St,{data:0}),Xo=Gs(cp),rp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},up={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},vp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function pp(s){var a=this.nativeEvent;return a.getModifierState?a.getModifierState(s):(s=vp[s])?!!a[s]:!1}function ui(){return pp}var _p=H({},Ne,{key:function(s){if(s.key){var a=rp[s.key]||s.key;if(a!=="Unidentified")return a}return s.type==="keypress"?(s=Nn(s),s===13?"Enter":String.fromCharCode(s)):s.type==="keydown"||s.type==="keyup"?up[s.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ui,charCode:function(s){return s.type==="keypress"?Nn(s):0},keyCode:function(s){return s.type==="keydown"||s.type==="keyup"?s.keyCode:0},which:function(s){return s.type==="keypress"?Nn(s):s.type==="keydown"||s.type==="keyup"?s.keyCode:0}}),hp=Gs(_p),fp=H({},Vn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Qo=Gs(fp),bp=H({},Ne,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ui}),gp=Gs(bp),wp=H({},St,{propertyName:0,elapsedTime:0,pseudoElement:0}),mp=Gs(wp),kp=H({},Vn,{deltaX:function(s){return"deltaX"in s?s.deltaX:"wheelDeltaX"in s?-s.wheelDeltaX:0},deltaY:function(s){return"deltaY"in s?s.deltaY:"wheelDeltaY"in s?-s.wheelDeltaY:"wheelDelta"in s?-s.wheelDelta:0},deltaZ:0,deltaMode:0}),yp=Gs(kp),xp=H({},St,{newState:0,oldState:0}),Cp=Gs(xp),Sp=[9,13,27,32],vi=za&&"CompositionEvent"in window,Oe=null;za&&"documentMode"in document&&(Oe=document.documentMode);var Mp=za&&"TextEvent"in window&&!Oe,Ko=za&&(!vi||Oe&&8<Oe&&11>=Oe),Jo=" ",Fo=!1;function Io(s,a){switch(s){case"keyup":return Sp.indexOf(a.keyCode)!==-1;case"keydown":return a.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Wo(s){return s=s.detail,typeof s=="object"&&"data"in s?s.data:null}var Wt=!1;function Bp(s,a){switch(s){case"compositionend":return Wo(a);case"keypress":return a.which!==32?null:(Fo=!0,Jo);case"textInput":return s=a.data,s===Jo&&Fo?null:s;default:return null}}function Dp(s,a){if(Wt)return s==="compositionend"||!vi&&Io(s,a)?(s=Zo(),zn=di=$a=null,Wt=!1,s):null;switch(s){case"paste":return null;case"keypress":if(!(a.ctrlKey||a.altKey||a.metaKey)||a.ctrlKey&&a.altKey){if(a.char&&1<a.char.length)return a.char;if(a.which)return String.fromCharCode(a.which)}return null;case"compositionend":return Ko&&a.locale!=="ko"?null:a.data;default:return null}}var Tp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function $o(s){var a=s&&s.nodeName&&s.nodeName.toLowerCase();return a==="input"?!!Tp[s.type]:a==="textarea"}function Po(s,a,t,e){Ft?It?It.push(e):It=[e]:Ft=e,a=Ml(a,"onChange"),0<a.length&&(t=new On("onChange","change",null,t,e),s.push({event:t,listeners:a}))}var Ve=null,je=null;function Lp(s){Hu(s,0)}function jn(s){var a=Ae(s);if(No(a))return s}function sc(s,a){if(s==="change")return a}var ac=!1;if(za){var pi;if(za){var _i="oninput"in document;if(!_i){var tc=document.createElement("div");tc.setAttribute("oninput","return;"),_i=typeof tc.oninput=="function"}pi=_i}else pi=!1;ac=pi&&(!document.documentMode||9<document.documentMode)}function ec(){Ve&&(Ve.detachEvent("onpropertychange",nc),je=Ve=null)}function nc(s){if(s.propertyName==="value"&&jn(je)){var a=[];Po(a,je,s,ni(s)),qo(Lp,a)}}function Ap(s,a,t){s==="focusin"?(ec(),Ve=a,je=t,Ve.attachEvent("onpropertychange",nc)):s==="focusout"&&ec()}function Ep(s){if(s==="selectionchange"||s==="keyup"||s==="keydown")return jn(je)}function zp(s,a){if(s==="click")return jn(a)}function Np(s,a){if(s==="input"||s==="change")return jn(a)}function Hp(s,a){return s===a&&(s!==0||1/s===1/a)||s!==s&&a!==a}var sa=typeof Object.is=="function"?Object.is:Hp;function Ue(s,a){if(sa(s,a))return!0;if(typeof s!="object"||s===null||typeof a!="object"||a===null)return!1;var t=Object.keys(s),e=Object.keys(a);if(t.length!==e.length)return!1;for(e=0;e<t.length;e++){var n=t[e];if(!Xl.call(a,n)||!sa(s[n],a[n]))return!1}return!0}function lc(s){for(;s&&s.firstChild;)s=s.firstChild;return s}function ic(s,a){var t=lc(s);s=0;for(var e;t;){if(t.nodeType===3){if(e=s+t.textContent.length,s<=a&&e>=a)return{node:t,offset:a-s};s=e}s:{for(;t;){if(t.nextSibling){t=t.nextSibling;break s}t=t.parentNode}t=void 0}t=lc(t)}}function dc(s,a){return s&&a?s===a?!0:s&&s.nodeType===3?!1:a&&a.nodeType===3?dc(s,a.parentNode):"contains"in s?s.contains(a):s.compareDocumentPosition?!!(s.compareDocumentPosition(a)&16):!1:!1}function oc(s){s=s!=null&&s.ownerDocument!=null&&s.ownerDocument.defaultView!=null?s.ownerDocument.defaultView:window;for(var a=An(s.document);a instanceof s.HTMLIFrameElement;){try{var t=typeof a.contentWindow.location.href=="string"}catch{t=!1}if(t)s=a.contentWindow;else break;a=An(s.document)}return a}function hi(s){var a=s&&s.nodeName&&s.nodeName.toLowerCase();return a&&(a==="input"&&(s.type==="text"||s.type==="search"||s.type==="tel"||s.type==="url"||s.type==="password")||a==="textarea"||s.contentEditable==="true")}var Op=za&&"documentMode"in document&&11>=document.documentMode,$t=null,fi=null,Re=null,bi=!1;function cc(s,a,t){var e=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;bi||$t==null||$t!==An(e)||(e=$t,"selectionStart"in e&&hi(e)?e={start:e.selectionStart,end:e.selectionEnd}:(e=(e.ownerDocument&&e.ownerDocument.defaultView||window).getSelection(),e={anchorNode:e.anchorNode,anchorOffset:e.anchorOffset,focusNode:e.focusNode,focusOffset:e.focusOffset}),Re&&Ue(Re,e)||(Re=e,e=Ml(fi,"onSelect"),0<e.length&&(a=new On("onSelect","select",null,a,t),s.push({event:a,listeners:e}),a.target=$t)))}function Mt(s,a){var t={};return t[s.toLowerCase()]=a.toLowerCase(),t["Webkit"+s]="webkit"+a,t["Moz"+s]="moz"+a,t}var Pt={animationend:Mt("Animation","AnimationEnd"),animationiteration:Mt("Animation","AnimationIteration"),animationstart:Mt("Animation","AnimationStart"),transitionrun:Mt("Transition","TransitionRun"),transitionstart:Mt("Transition","TransitionStart"),transitioncancel:Mt("Transition","TransitionCancel"),transitionend:Mt("Transition","TransitionEnd")},gi={},rc={};za&&(rc=document.createElement("div").style,"AnimationEvent"in window||(delete Pt.animationend.animation,delete Pt.animationiteration.animation,delete Pt.animationstart.animation),"TransitionEvent"in window||delete Pt.transitionend.transition);function Bt(s){if(gi[s])return gi[s];if(!Pt[s])return s;var a=Pt[s],t;for(t in a)if(a.hasOwnProperty(t)&&t in rc)return gi[s]=a[t];return s}var uc=Bt("animationend"),vc=Bt("animationiteration"),pc=Bt("animationstart"),Vp=Bt("transitionrun"),jp=Bt("transitionstart"),Up=Bt("transitioncancel"),_c=Bt("transitionend"),hc=new Map,wi="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");wi.push("scrollEnd");function wa(s,a){hc.set(s,a),Ct(a,[s])}var Un=typeof reportError=="function"?reportError:function(s){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var a=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof s=="object"&&s!==null&&typeof s.message=="string"?String(s.message):String(s),error:s});if(!window.dispatchEvent(a))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",s);return}console.error(s)},ra=[],se=0,mi=0;function Rn(){for(var s=se,a=mi=se=0;a<s;){var t=ra[a];ra[a++]=null;var e=ra[a];ra[a++]=null;var n=ra[a];ra[a++]=null;var l=ra[a];if(ra[a++]=null,e!==null&&n!==null){var i=e.pending;i===null?n.next=n:(n.next=i.next,i.next=n),e.pending=n}l!==0&&fc(t,n,l)}}function qn(s,a,t,e){ra[se++]=s,ra[se++]=a,ra[se++]=t,ra[se++]=e,mi|=e,s.lanes|=e,s=s.alternate,s!==null&&(s.lanes|=e)}function ki(s,a,t,e){return qn(s,a,t,e),Zn(s)}function Dt(s,a){return qn(s,null,null,a),Zn(s)}function fc(s,a,t){s.lanes|=t;var e=s.alternate;e!==null&&(e.lanes|=t);for(var n=!1,l=s.return;l!==null;)l.childLanes|=t,e=l.alternate,e!==null&&(e.childLanes|=t),l.tag===22&&(s=l.stateNode,s===null||s._visibility&1||(n=!0)),s=l,l=l.return;return s.tag===3?(l=s.stateNode,n&&a!==null&&(n=31-Ps(t),s=l.hiddenUpdates,e=s[n],e===null?s[n]=[a]:e.push(a),a.lane=t|536870912),l):null}function Zn(s){if(50<cn)throw cn=0,Ld=null,Error(_(185));for(var a=s.return;a!==null;)s=a,a=s.return;return s.tag===3?s.stateNode:null}var ae={};function Rp(s,a,t,e){this.tag=s,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=a,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=e,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function aa(s,a,t,e){return new Rp(s,a,t,e)}function yi(s){return s=s.prototype,!(!s||!s.isReactComponent)}function Na(s,a){var t=s.alternate;return t===null?(t=aa(s.tag,a,s.key,s.mode),t.elementType=s.elementType,t.type=s.type,t.stateNode=s.stateNode,t.alternate=s,s.alternate=t):(t.pendingProps=a,t.type=s.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=s.flags&65011712,t.childLanes=s.childLanes,t.lanes=s.lanes,t.child=s.child,t.memoizedProps=s.memoizedProps,t.memoizedState=s.memoizedState,t.updateQueue=s.updateQueue,a=s.dependencies,t.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext},t.sibling=s.sibling,t.index=s.index,t.ref=s.ref,t.refCleanup=s.refCleanup,t}function bc(s,a){s.flags&=65011714;var t=s.alternate;return t===null?(s.childLanes=0,s.lanes=a,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=t.childLanes,s.lanes=t.lanes,s.child=t.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=t.memoizedProps,s.memoizedState=t.memoizedState,s.updateQueue=t.updateQueue,s.type=t.type,a=t.dependencies,s.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext}),s}function Yn(s,a,t,e,n,l){var i=0;if(e=s,typeof s=="function")yi(s)&&(i=1);else if(typeof s=="string")i=X_(s,t,E.current)?26:s==="html"||s==="head"||s==="body"?27:5;else s:switch(s){case xa:return s=aa(31,t,a,n),s.elementType=xa,s.lanes=l,s;case Hs:return Tt(t.children,n,l,a);case Ta:i=8,n|=24;break;case Is:return s=aa(12,t,a,n|2),s.elementType=Is,s.lanes=l,s;case ya:return s=aa(13,t,a,n),s.elementType=ya,s.lanes=l,s;case Rs:return s=aa(19,t,a,n),s.elementType=Rs,s.lanes=l,s;default:if(typeof s=="object"&&s!==null)switch(s.$$typeof){case zs:i=10;break s;case Fa:i=9;break s;case da:i=11;break s;case W:i=14;break s;case qs:i=16,e=null;break s}i=29,t=Error(_(130,s===null?"null":typeof s,"")),e=null}return a=aa(i,t,a,n),a.elementType=s,a.type=e,a.lanes=l,a}function Tt(s,a,t,e){return s=aa(7,s,e,a),s.lanes=t,s}function xi(s,a,t){return s=aa(6,s,null,a),s.lanes=t,s}function gc(s){var a=aa(18,null,null,0);return a.stateNode=s,a}function Ci(s,a,t){return a=aa(4,s.children!==null?s.children:[],s.key,a),a.lanes=t,a.stateNode={containerInfo:s.containerInfo,pendingChildren:null,implementation:s.implementation},a}var wc=new WeakMap;function ua(s,a){if(typeof s=="object"&&s!==null){var t=wc.get(s);return t!==void 0?t:(a={value:s,source:a,stack:go(a)},wc.set(s,a),a)}return{value:s,source:a,stack:go(a)}}var te=[],ee=0,Gn=null,qe=0,va=[],pa=0,Pa=null,Sa=1,Ma="";function Ha(s,a){te[ee++]=qe,te[ee++]=Gn,Gn=s,qe=a}function mc(s,a,t){va[pa++]=Sa,va[pa++]=Ma,va[pa++]=Pa,Pa=s;var e=Sa;s=Ma;var n=32-Ps(e)-1;e&=~(1<<n),t+=1;var l=32-Ps(a)+n;if(30<l){var i=n-n%5;l=(e&(1<<i)-1).toString(32),e>>=i,n-=i,Sa=1<<32-Ps(a)+n|t<<n|e,Ma=l+s}else Sa=1<<l|t<<n|e,Ma=s}function Si(s){s.return!==null&&(Ha(s,1),mc(s,1,0))}function Mi(s){for(;s===Gn;)Gn=te[--ee],te[ee]=null,qe=te[--ee],te[ee]=null;for(;s===Pa;)Pa=va[--pa],va[pa]=null,Ma=va[--pa],va[pa]=null,Sa=va[--pa],va[pa]=null}function kc(s,a){va[pa++]=Sa,va[pa++]=Ma,va[pa++]=Pa,Sa=a.id,Ma=a.overflow,Pa=s}var Ds=null,vs=null,$=!1,st=null,_a=!1,Bi=Error(_(519));function at(s){var a=Error(_(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ze(ua(a,s)),Bi}function yc(s){var a=s.stateNode,t=s.type,e=s.memoizedProps;switch(a[Bs]=s,a[Ys]=e,t){case"dialog":J("cancel",a),J("close",a);break;case"iframe":case"object":case"embed":J("load",a);break;case"video":case"audio":for(t=0;t<un.length;t++)J(un[t],a);break;case"source":J("error",a);break;case"img":case"image":case"link":J("error",a),J("load",a);break;case"details":J("toggle",a);break;case"input":J("invalid",a),Ho(a,e.value,e.defaultValue,e.checked,e.defaultChecked,e.type,e.name,!0);break;case"select":J("invalid",a);break;case"textarea":J("invalid",a),Vo(a,e.value,e.defaultValue,e.children)}t=e.children,typeof t!="string"&&typeof t!="number"&&typeof t!="bigint"||a.textContent===""+t||e.suppressHydrationWarning===!0||Uu(a.textContent,t)?(e.popover!=null&&(J("beforetoggle",a),J("toggle",a)),e.onScroll!=null&&J("scroll",a),e.onScrollEnd!=null&&J("scrollend",a),e.onClick!=null&&(a.onclick=Ea),a=!0):a=!1,a||at(s,!0)}function xc(s){for(Ds=s.return;Ds;)switch(Ds.tag){case 5:case 31:case 13:_a=!1;return;case 27:case 3:_a=!0;return;default:Ds=Ds.return}}function ne(s){if(s!==Ds)return!1;if(!$)return xc(s),$=!0,!1;var a=s.tag,t;if((t=a!==3&&a!==27)&&((t=a===5)&&(t=s.type,t=!(t!=="form"&&t!=="button")||Xd(s.type,s.memoizedProps)),t=!t),t&&vs&&at(s),xc(s),a===13){if(s=s.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(_(317));vs=Ju(s)}else if(a===31){if(s=s.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(_(317));vs=Ju(s)}else a===27?(a=vs,ht(s.type)?(s=Id,Id=null,vs=s):vs=a):vs=Ds?fa(s.stateNode.nextSibling):null;return!0}function Lt(){vs=Ds=null,$=!1}function Di(){var s=st;return s!==null&&(Js===null?Js=s:Js.push.apply(Js,s),st=null),s}function Ze(s){st===null?st=[s]:st.push(s)}var Ti=u(null),At=null,Oa=null;function tt(s,a,t){D(Ti,a._currentValue),a._currentValue=t}function Va(s){s._currentValue=Ti.current,x(Ti)}function Li(s,a,t){for(;s!==null;){var e=s.alternate;if((s.childLanes&a)!==a?(s.childLanes|=a,e!==null&&(e.childLanes|=a)):e!==null&&(e.childLanes&a)!==a&&(e.childLanes|=a),s===t)break;s=s.return}}function Ai(s,a,t,e){var n=s.child;for(n!==null&&(n.return=s);n!==null;){var l=n.dependencies;if(l!==null){var i=n.child;l=l.firstContext;s:for(;l!==null;){var d=l;l=n;for(var o=0;o<a.length;o++)if(d.context===a[o]){l.lanes|=t,d=l.alternate,d!==null&&(d.lanes|=t),Li(l.return,t,s),e||(i=null);break s}l=d.next}}else if(n.tag===18){if(i=n.return,i===null)throw Error(_(341));i.lanes|=t,l=i.alternate,l!==null&&(l.lanes|=t),Li(i,t,s),i=null}else i=n.child;if(i!==null)i.return=n;else for(i=n;i!==null;){if(i===s){i=null;break}if(n=i.sibling,n!==null){n.return=i.return,i=n;break}i=i.return}n=i}}function le(s,a,t,e){s=null;for(var n=a,l=!1;n!==null;){if(!l){if((n.flags&524288)!==0)l=!0;else if((n.flags&262144)!==0)break}if(n.tag===10){var i=n.alternate;if(i===null)throw Error(_(387));if(i=i.memoizedProps,i!==null){var d=n.type;sa(n.pendingProps.value,i.value)||(s!==null?s.push(d):s=[d])}}else if(n===es.current){if(i=n.alternate,i===null)throw Error(_(387));i.memoizedState.memoizedState!==n.memoizedState.memoizedState&&(s!==null?s.push(fn):s=[fn])}n=n.return}s!==null&&Ai(a,s,t,e),a.flags|=262144}function Xn(s){for(s=s.firstContext;s!==null;){if(!sa(s.context._currentValue,s.memoizedValue))return!0;s=s.next}return!1}function Et(s){At=s,Oa=null,s=s.dependencies,s!==null&&(s.firstContext=null)}function Ts(s){return Cc(At,s)}function Qn(s,a){return At===null&&Et(s),Cc(s,a)}function Cc(s,a){var t=a._currentValue;if(a={context:a,memoizedValue:t,next:null},Oa===null){if(s===null)throw Error(_(308));Oa=a,s.dependencies={lanes:0,firstContext:a},s.flags|=524288}else Oa=Oa.next=a;return t}var qp=typeof AbortController<"u"?AbortController:function(){var s=[],a=this.signal={aborted:!1,addEventListener:function(t,e){s.push(e)}};this.abort=function(){a.aborted=!0,s.forEach(function(t){return t()})}},Zp=v.unstable_scheduleCallback,Yp=v.unstable_NormalPriority,ms={$$typeof:zs,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ei(){return{controller:new qp,data:new Map,refCount:0}}function Ye(s){s.refCount--,s.refCount===0&&Zp(Yp,function(){s.controller.abort()})}var Ge=null,zi=0,ie=0,de=null;function Gp(s,a){if(Ge===null){var t=Ge=[];zi=0,ie=Od(),de={status:"pending",value:void 0,then:function(e){t.push(e)}}}return zi++,a.then(Sc,Sc),a}function Sc(){if(--zi===0&&Ge!==null){de!==null&&(de.status="fulfilled");var s=Ge;Ge=null,ie=0,de=null;for(var a=0;a<s.length;a++)(0,s[a])()}}function Xp(s,a){var t=[],e={status:"pending",value:null,reason:null,then:function(n){t.push(n)}};return s.then(function(){e.status="fulfilled",e.value=a;for(var n=0;n<t.length;n++)(0,t[n])(a)},function(n){for(e.status="rejected",e.reason=n,n=0;n<t.length;n++)(0,t[n])(void 0)}),e}var Mc=m.S;m.S=function(s,a){cu=Ws(),typeof a=="object"&&a!==null&&typeof a.then=="function"&&Gp(s,a),Mc!==null&&Mc(s,a)};var zt=u(null);function Ni(){var s=zt.current;return s!==null?s:us.pooledCache}function Kn(s,a){a===null?D(zt,zt.current):D(zt,a.pool)}function Bc(){var s=Ni();return s===null?null:{parent:ms._currentValue,pool:s}}var oe=Error(_(460)),Hi=Error(_(474)),Jn=Error(_(542)),Fn={then:function(){}};function Dc(s){return s=s.status,s==="fulfilled"||s==="rejected"}function Tc(s,a,t){switch(t=s[t],t===void 0?s.push(a):t!==a&&(a.then(Ea,Ea),a=t),a.status){case"fulfilled":return a.value;case"rejected":throw s=a.reason,Ac(s),s;default:if(typeof a.status=="string")a.then(Ea,Ea);else{if(s=us,s!==null&&100<s.shellSuspendCounter)throw Error(_(482));s=a,s.status="pending",s.then(function(e){if(a.status==="pending"){var n=a;n.status="fulfilled",n.value=e}},function(e){if(a.status==="pending"){var n=a;n.status="rejected",n.reason=e}})}switch(a.status){case"fulfilled":return a.value;case"rejected":throw s=a.reason,Ac(s),s}throw Ht=a,oe}}function Nt(s){try{var a=s._init;return a(s._payload)}catch(t){throw t!==null&&typeof t=="object"&&typeof t.then=="function"?(Ht=t,oe):t}}var Ht=null;function Lc(){if(Ht===null)throw Error(_(459));var s=Ht;return Ht=null,s}function Ac(s){if(s===oe||s===Jn)throw Error(_(483))}var ce=null,Xe=0;function In(s){var a=Xe;return Xe+=1,ce===null&&(ce=[]),Tc(ce,s,a)}function Qe(s,a){a=a.props.ref,s.ref=a!==void 0?a:null}function Wn(s,a){throw a.$$typeof===P?Error(_(525)):(s=Object.prototype.toString.call(a),Error(_(31,s==="[object Object]"?"object with keys {"+Object.keys(a).join(", ")+"}":s)))}function Ec(s){function a(p,r){if(s){var h=p.deletions;h===null?(p.deletions=[r],p.flags|=16):h.push(r)}}function t(p,r){if(!s)return null;for(;r!==null;)a(p,r),r=r.sibling;return null}function e(p){for(var r=new Map;p!==null;)p.key!==null?r.set(p.key,p):r.set(p.index,p),p=p.sibling;return r}function n(p,r){return p=Na(p,r),p.index=0,p.sibling=null,p}function l(p,r,h){return p.index=h,s?(h=p.alternate,h!==null?(h=h.index,h<r?(p.flags|=67108866,r):h):(p.flags|=67108866,r)):(p.flags|=1048576,r)}function i(p){return s&&p.alternate===null&&(p.flags|=67108866),p}function d(p,r,h,k){return r===null||r.tag!==6?(r=xi(h,p.mode,k),r.return=p,r):(r=n(r,h),r.return=p,r)}function o(p,r,h,k){var O=h.type;return O===Hs?w(p,r,h.props.children,k,h.key):r!==null&&(r.elementType===O||typeof O=="object"&&O!==null&&O.$$typeof===qs&&Nt(O)===r.type)?(r=n(r,h.props),Qe(r,h),r.return=p,r):(r=Yn(h.type,h.key,h.props,null,p.mode,k),Qe(r,h),r.return=p,r)}function f(p,r,h,k){return r===null||r.tag!==4||r.stateNode.containerInfo!==h.containerInfo||r.stateNode.implementation!==h.implementation?(r=Ci(h,p.mode,k),r.return=p,r):(r=n(r,h.children||[]),r.return=p,r)}function w(p,r,h,k,O){return r===null||r.tag!==7?(r=Tt(h,p.mode,k,O),r.return=p,r):(r=n(r,h),r.return=p,r)}function y(p,r,h){if(typeof r=="string"&&r!==""||typeof r=="number"||typeof r=="bigint")return r=xi(""+r,p.mode,h),r.return=p,r;if(typeof r=="object"&&r!==null){switch(r.$$typeof){case Es:return h=Yn(r.type,r.key,r.props,null,p.mode,h),Qe(h,r),h.return=p,h;case Us:return r=Ci(r,p.mode,h),r.return=p,r;case qs:return r=Nt(r),y(p,r,h)}if(ga(r)||Zs(r))return r=Tt(r,p.mode,h,null),r.return=p,r;if(typeof r.then=="function")return y(p,In(r),h);if(r.$$typeof===zs)return y(p,Qn(p,r),h);Wn(p,r)}return null}function b(p,r,h,k){var O=r!==null?r.key:null;if(typeof h=="string"&&h!==""||typeof h=="number"||typeof h=="bigint")return O!==null?null:d(p,r,""+h,k);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Es:return h.key===O?o(p,r,h,k):null;case Us:return h.key===O?f(p,r,h,k):null;case qs:return h=Nt(h),b(p,r,h,k)}if(ga(h)||Zs(h))return O!==null?null:w(p,r,h,k,null);if(typeof h.then=="function")return b(p,r,In(h),k);if(h.$$typeof===zs)return b(p,r,Qn(p,h),k);Wn(p,h)}return null}function g(p,r,h,k,O){if(typeof k=="string"&&k!==""||typeof k=="number"||typeof k=="bigint")return p=p.get(h)||null,d(r,p,""+k,O);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Es:return p=p.get(k.key===null?h:k.key)||null,o(r,p,k,O);case Us:return p=p.get(k.key===null?h:k.key)||null,f(r,p,k,O);case qs:return k=Nt(k),g(p,r,h,k,O)}if(ga(k)||Zs(k))return p=p.get(h)||null,w(r,p,k,O,null);if(typeof k.then=="function")return g(p,r,h,In(k),O);if(k.$$typeof===zs)return g(p,r,h,Qn(r,k),O);Wn(r,k)}return null}function A(p,r,h,k){for(var O=null,ss=null,z=r,X=r=0,I=null;z!==null&&X<h.length;X++){z.index>X?(I=z,z=null):I=z.sibling;var as=b(p,z,h[X],k);if(as===null){z===null&&(z=I);break}s&&z&&as.alternate===null&&a(p,z),r=l(as,r,X),ss===null?O=as:ss.sibling=as,ss=as,z=I}if(X===h.length)return t(p,z),$&&Ha(p,X),O;if(z===null){for(;X<h.length;X++)z=y(p,h[X],k),z!==null&&(r=l(z,r,X),ss===null?O=z:ss.sibling=z,ss=z);return $&&Ha(p,X),O}for(z=e(z);X<h.length;X++)I=g(z,p,X,h[X],k),I!==null&&(s&&I.alternate!==null&&z.delete(I.key===null?X:I.key),r=l(I,r,X),ss===null?O=I:ss.sibling=I,ss=I);return s&&z.forEach(function(mt){return a(p,mt)}),$&&Ha(p,X),O}function R(p,r,h,k){if(h==null)throw Error(_(151));for(var O=null,ss=null,z=r,X=r=0,I=null,as=h.next();z!==null&&!as.done;X++,as=h.next()){z.index>X?(I=z,z=null):I=z.sibling;var mt=b(p,z,as.value,k);if(mt===null){z===null&&(z=I);break}s&&z&&mt.alternate===null&&a(p,z),r=l(mt,r,X),ss===null?O=mt:ss.sibling=mt,ss=mt,z=I}if(as.done)return t(p,z),$&&Ha(p,X),O;if(z===null){for(;!as.done;X++,as=h.next())as=y(p,as.value,k),as!==null&&(r=l(as,r,X),ss===null?O=as:ss.sibling=as,ss=as);return $&&Ha(p,X),O}for(z=e(z);!as.done;X++,as=h.next())as=g(z,p,X,as.value,k),as!==null&&(s&&as.alternate!==null&&z.delete(as.key===null?X:as.key),r=l(as,r,X),ss===null?O=as:ss.sibling=as,ss=as);return s&&z.forEach(function(t1){return a(p,t1)}),$&&Ha(p,X),O}function cs(p,r,h,k){if(typeof h=="object"&&h!==null&&h.type===Hs&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case Es:s:{for(var O=h.key;r!==null;){if(r.key===O){if(O=h.type,O===Hs){if(r.tag===7){t(p,r.sibling),k=n(r,h.props.children),k.return=p,p=k;break s}}else if(r.elementType===O||typeof O=="object"&&O!==null&&O.$$typeof===qs&&Nt(O)===r.type){t(p,r.sibling),k=n(r,h.props),Qe(k,h),k.return=p,p=k;break s}t(p,r);break}else a(p,r);r=r.sibling}h.type===Hs?(k=Tt(h.props.children,p.mode,k,h.key),k.return=p,p=k):(k=Yn(h.type,h.key,h.props,null,p.mode,k),Qe(k,h),k.return=p,p=k)}return i(p);case Us:s:{for(O=h.key;r!==null;){if(r.key===O)if(r.tag===4&&r.stateNode.containerInfo===h.containerInfo&&r.stateNode.implementation===h.implementation){t(p,r.sibling),k=n(r,h.children||[]),k.return=p,p=k;break s}else{t(p,r);break}else a(p,r);r=r.sibling}k=Ci(h,p.mode,k),k.return=p,p=k}return i(p);case qs:return h=Nt(h),cs(p,r,h,k)}if(ga(h))return A(p,r,h,k);if(Zs(h)){if(O=Zs(h),typeof O!="function")throw Error(_(150));return h=O.call(h),R(p,r,h,k)}if(typeof h.then=="function")return cs(p,r,In(h),k);if(h.$$typeof===zs)return cs(p,r,Qn(p,h),k);Wn(p,h)}return typeof h=="string"&&h!==""||typeof h=="number"||typeof h=="bigint"?(h=""+h,r!==null&&r.tag===6?(t(p,r.sibling),k=n(r,h),k.return=p,p=k):(t(p,r),k=xi(h,p.mode,k),k.return=p,p=k),i(p)):t(p,r)}return function(p,r,h,k){try{Xe=0;var O=cs(p,r,h,k);return ce=null,O}catch(z){if(z===oe||z===Jn)throw z;var ss=aa(29,z,null,p.mode);return ss.lanes=k,ss.return=p,ss}finally{}}}var Ot=Ec(!0),zc=Ec(!1),et=!1;function Oi(s){s.updateQueue={baseState:s.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Vi(s,a){s=s.updateQueue,a.updateQueue===s&&(a.updateQueue={baseState:s.baseState,firstBaseUpdate:s.firstBaseUpdate,lastBaseUpdate:s.lastBaseUpdate,shared:s.shared,callbacks:null})}function nt(s){return{lane:s,tag:0,payload:null,callback:null,next:null}}function lt(s,a,t){var e=s.updateQueue;if(e===null)return null;if(e=e.shared,(ts&2)!==0){var n=e.pending;return n===null?a.next=a:(a.next=n.next,n.next=a),e.pending=a,a=Zn(s),fc(s,null,t),a}return qn(s,e,a,t),Zn(s)}function Ke(s,a,t){if(a=a.updateQueue,a!==null&&(a=a.shared,(t&4194048)!==0)){var e=a.lanes;e&=s.pendingLanes,t|=e,a.lanes=t,Co(s,t)}}function ji(s,a){var t=s.updateQueue,e=s.alternate;if(e!==null&&(e=e.updateQueue,t===e)){var n=null,l=null;if(t=t.firstBaseUpdate,t!==null){do{var i={lane:t.lane,tag:t.tag,payload:t.payload,callback:null,next:null};l===null?n=l=i:l=l.next=i,t=t.next}while(t!==null);l===null?n=l=a:l=l.next=a}else n=l=a;t={baseState:e.baseState,firstBaseUpdate:n,lastBaseUpdate:l,shared:e.shared,callbacks:e.callbacks},s.updateQueue=t;return}s=t.lastBaseUpdate,s===null?t.firstBaseUpdate=a:s.next=a,t.lastBaseUpdate=a}var Ui=!1;function Je(){if(Ui){var s=de;if(s!==null)throw s}}function Fe(s,a,t,e){Ui=!1;var n=s.updateQueue;et=!1;var l=n.firstBaseUpdate,i=n.lastBaseUpdate,d=n.shared.pending;if(d!==null){n.shared.pending=null;var o=d,f=o.next;o.next=null,i===null?l=f:i.next=f,i=o;var w=s.alternate;w!==null&&(w=w.updateQueue,d=w.lastBaseUpdate,d!==i&&(d===null?w.firstBaseUpdate=f:d.next=f,w.lastBaseUpdate=o))}if(l!==null){var y=n.baseState;i=0,w=f=o=null,d=l;do{var b=d.lane&-536870913,g=b!==d.lane;if(g?(F&b)===b:(e&b)===b){b!==0&&b===ie&&(Ui=!0),w!==null&&(w=w.next={lane:0,tag:d.tag,payload:d.payload,callback:null,next:null});s:{var A=s,R=d;b=a;var cs=t;switch(R.tag){case 1:if(A=R.payload,typeof A=="function"){y=A.call(cs,y,b);break s}y=A;break s;case 3:A.flags=A.flags&-65537|128;case 0:if(A=R.payload,b=typeof A=="function"?A.call(cs,y,b):A,b==null)break s;y=H({},y,b);break s;case 2:et=!0}}b=d.callback,b!==null&&(s.flags|=64,g&&(s.flags|=8192),g=n.callbacks,g===null?n.callbacks=[b]:g.push(b))}else g={lane:b,tag:d.tag,payload:d.payload,callback:d.callback,next:null},w===null?(f=w=g,o=y):w=w.next=g,i|=b;if(d=d.next,d===null){if(d=n.shared.pending,d===null)break;g=d,d=g.next,g.next=null,n.lastBaseUpdate=g,n.shared.pending=null}}while(!0);w===null&&(o=y),n.baseState=o,n.firstBaseUpdate=f,n.lastBaseUpdate=w,l===null&&(n.shared.lanes=0),rt|=i,s.lanes=i,s.memoizedState=y}}function Nc(s,a){if(typeof s!="function")throw Error(_(191,s));s.call(a)}function Hc(s,a){var t=s.callbacks;if(t!==null)for(s.callbacks=null,s=0;s<t.length;s++)Nc(t[s],a)}var re=u(null),$n=u(0);function Oc(s,a){s=Qa,D($n,s),D(re,a),Qa=s|a.baseLanes}function Ri(){D($n,Qa),D(re,re.current)}function qi(){Qa=$n.current,x(re),x($n)}var ta=u(null),ha=null;function it(s){var a=s.alternate;D(gs,gs.current&1),D(ta,s),ha===null&&(a===null||re.current!==null||a.memoizedState!==null)&&(ha=s)}function Zi(s){D(gs,gs.current),D(ta,s),ha===null&&(ha=s)}function Vc(s){s.tag===22?(D(gs,gs.current),D(ta,s),ha===null&&(ha=s)):dt()}function dt(){D(gs,gs.current),D(ta,ta.current)}function ea(s){x(ta),ha===s&&(ha=null),x(gs)}var gs=u(0);function Pn(s){for(var a=s;a!==null;){if(a.tag===13){var t=a.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||Jd(t)||Fd(t)))return a}else if(a.tag===19&&(a.memoizedProps.revealOrder==="forwards"||a.memoizedProps.revealOrder==="backwards"||a.memoizedProps.revealOrder==="unstable_legacy-backwards"||a.memoizedProps.revealOrder==="together")){if((a.flags&128)!==0)return a}else if(a.child!==null){a.child.return=a,a=a.child;continue}if(a===s)break;for(;a.sibling===null;){if(a.return===null||a.return===s)return null;a=a.return}a.sibling.return=a.return,a=a.sibling}return null}var ja=0,G=null,ds=null,ks=null,sl=!1,ue=!1,Vt=!1,al=0,Ie=0,ve=null,Qp=0;function hs(){throw Error(_(321))}function Yi(s,a){if(a===null)return!1;for(var t=0;t<a.length&&t<s.length;t++)if(!sa(s[t],a[t]))return!1;return!0}function Gi(s,a,t,e,n,l){return ja=l,G=a,a.memoizedState=null,a.updateQueue=null,a.lanes=0,m.H=s===null||s.memoizedState===null?mr:ld,Vt=!1,l=t(e,n),Vt=!1,ue&&(l=Uc(a,t,e,n)),jc(s),l}function jc(s){m.H=Pe;var a=ds!==null&&ds.next!==null;if(ja=0,ks=ds=G=null,sl=!1,Ie=0,ve=null,a)throw Error(_(300));s===null||ys||(s=s.dependencies,s!==null&&Xn(s)&&(ys=!0))}function Uc(s,a,t,e){G=s;var n=0;do{if(ue&&(ve=null),Ie=0,ue=!1,25<=n)throw Error(_(301));if(n+=1,ks=ds=null,s.updateQueue!=null){var l=s.updateQueue;l.lastEffect=null,l.events=null,l.stores=null,l.memoCache!=null&&(l.memoCache.index=0)}m.H=kr,l=a(t,e)}while(ue);return l}function Kp(){var s=m.H,a=s.useState()[0];return a=typeof a.then=="function"?We(a):a,s=s.useState()[0],(ds!==null?ds.memoizedState:null)!==s&&(G.flags|=1024),a}function Xi(){var s=al!==0;return al=0,s}function Qi(s,a,t){a.updateQueue=s.updateQueue,a.flags&=-2053,s.lanes&=~t}function Ki(s){if(sl){for(s=s.memoizedState;s!==null;){var a=s.queue;a!==null&&(a.pending=null),s=s.next}sl=!1}ja=0,ks=ds=G=null,ue=!1,Ie=al=0,ve=null}function Vs(){var s={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ks===null?G.memoizedState=ks=s:ks=ks.next=s,ks}function ws(){if(ds===null){var s=G.alternate;s=s!==null?s.memoizedState:null}else s=ds.next;var a=ks===null?G.memoizedState:ks.next;if(a!==null)ks=a,ds=s;else{if(s===null)throw G.alternate===null?Error(_(467)):Error(_(310));ds=s,s={memoizedState:ds.memoizedState,baseState:ds.baseState,baseQueue:ds.baseQueue,queue:ds.queue,next:null},ks===null?G.memoizedState=ks=s:ks=ks.next=s}return ks}function tl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function We(s){var a=Ie;return Ie+=1,ve===null&&(ve=[]),s=Tc(ve,s,a),a=G,(ks===null?a.memoizedState:ks.next)===null&&(a=a.alternate,m.H=a===null||a.memoizedState===null?mr:ld),s}function el(s){if(s!==null&&typeof s=="object"){if(typeof s.then=="function")return We(s);if(s.$$typeof===zs)return Ts(s)}throw Error(_(438,String(s)))}function Ji(s){var a=null,t=G.updateQueue;if(t!==null&&(a=t.memoCache),a==null){var e=G.alternate;e!==null&&(e=e.updateQueue,e!==null&&(e=e.memoCache,e!=null&&(a={data:e.data.map(function(n){return n.slice()}),index:0})))}if(a==null&&(a={data:[],index:0}),t===null&&(t=tl(),G.updateQueue=t),t.memoCache=a,t=a.data[a.index],t===void 0)for(t=a.data[a.index]=Array(s),e=0;e<s;e++)t[e]=qt;return a.index++,t}function Ua(s,a){return typeof a=="function"?a(s):a}function nl(s){var a=ws();return Fi(a,ds,s)}function Fi(s,a,t){var e=s.queue;if(e===null)throw Error(_(311));e.lastRenderedReducer=t;var n=s.baseQueue,l=e.pending;if(l!==null){if(n!==null){var i=n.next;n.next=l.next,l.next=i}a.baseQueue=n=l,e.pending=null}if(l=s.baseState,n===null)s.memoizedState=l;else{a=n.next;var d=i=null,o=null,f=a,w=!1;do{var y=f.lane&-536870913;if(y!==f.lane?(F&y)===y:(ja&y)===y){var b=f.revertLane;if(b===0)o!==null&&(o=o.next={lane:0,revertLane:0,gesture:null,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null}),y===ie&&(w=!0);else if((ja&b)===b){f=f.next,b===ie&&(w=!0);continue}else y={lane:0,revertLane:f.revertLane,gesture:null,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null},o===null?(d=o=y,i=l):o=o.next=y,G.lanes|=b,rt|=b;y=f.action,Vt&&t(l,y),l=f.hasEagerState?f.eagerState:t(l,y)}else b={lane:y,revertLane:f.revertLane,gesture:f.gesture,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null},o===null?(d=o=b,i=l):o=o.next=b,G.lanes|=y,rt|=y;f=f.next}while(f!==null&&f!==a);if(o===null?i=l:o.next=d,!sa(l,s.memoizedState)&&(ys=!0,w&&(t=de,t!==null)))throw t;s.memoizedState=l,s.baseState=i,s.baseQueue=o,e.lastRenderedState=l}return n===null&&(e.lanes=0),[s.memoizedState,e.dispatch]}function Ii(s){var a=ws(),t=a.queue;if(t===null)throw Error(_(311));t.lastRenderedReducer=s;var e=t.dispatch,n=t.pending,l=a.memoizedState;if(n!==null){t.pending=null;var i=n=n.next;do l=s(l,i.action),i=i.next;while(i!==n);sa(l,a.memoizedState)||(ys=!0),a.memoizedState=l,a.baseQueue===null&&(a.baseState=l),t.lastRenderedState=l}return[l,e]}function Rc(s,a,t){var e=G,n=ws(),l=$;if(l){if(t===void 0)throw Error(_(407));t=t()}else t=a();var i=!sa((ds||n).memoizedState,t);if(i&&(n.memoizedState=t,ys=!0),n=n.queue,Pi(Yc.bind(null,e,n,s),[s]),n.getSnapshot!==a||i||ks!==null&&ks.memoizedState.tag&1){if(e.flags|=2048,pe(9,{destroy:void 0},Zc.bind(null,e,n,t,a),null),us===null)throw Error(_(349));l||(ja&127)!==0||qc(e,a,t)}return t}function qc(s,a,t){s.flags|=16384,s={getSnapshot:a,value:t},a=G.updateQueue,a===null?(a=tl(),G.updateQueue=a,a.stores=[s]):(t=a.stores,t===null?a.stores=[s]:t.push(s))}function Zc(s,a,t,e){a.value=t,a.getSnapshot=e,Gc(a)&&Xc(s)}function Yc(s,a,t){return t(function(){Gc(a)&&Xc(s)})}function Gc(s){var a=s.getSnapshot;s=s.value;try{var t=a();return!sa(s,t)}catch{return!0}}function Xc(s){var a=Dt(s,2);a!==null&&Fs(a,s,2)}function Wi(s){var a=Vs();if(typeof s=="function"){var t=s;if(s=t(),Vt){Ia(!0);try{t()}finally{Ia(!1)}}}return a.memoizedState=a.baseState=s,a.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ua,lastRenderedState:s},a}function Qc(s,a,t,e){return s.baseState=t,Fi(s,ds,typeof e=="function"?e:Ua)}function Jp(s,a,t,e,n){if(dl(s))throw Error(_(485));if(s=a.action,s!==null){var l={payload:n,action:s,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(i){l.listeners.push(i)}};m.T!==null?t(!0):l.isTransition=!1,e(l),t=a.pending,t===null?(l.next=a.pending=l,Kc(a,l)):(l.next=t.next,a.pending=t.next=l)}}function Kc(s,a){var t=a.action,e=a.payload,n=s.state;if(a.isTransition){var l=m.T,i={};m.T=i;try{var d=t(n,e),o=m.S;o!==null&&o(i,d),Jc(s,a,d)}catch(f){$i(s,a,f)}finally{l!==null&&i.types!==null&&(l.types=i.types),m.T=l}}else try{l=t(n,e),Jc(s,a,l)}catch(f){$i(s,a,f)}}function Jc(s,a,t){t!==null&&typeof t=="object"&&typeof t.then=="function"?t.then(function(e){Fc(s,a,e)},function(e){return $i(s,a,e)}):Fc(s,a,t)}function Fc(s,a,t){a.status="fulfilled",a.value=t,Ic(a),s.state=t,a=s.pending,a!==null&&(t=a.next,t===a?s.pending=null:(t=t.next,a.next=t,Kc(s,t)))}function $i(s,a,t){var e=s.pending;if(s.pending=null,e!==null){e=e.next;do a.status="rejected",a.reason=t,Ic(a),a=a.next;while(a!==e)}s.action=null}function Ic(s){s=s.listeners;for(var a=0;a<s.length;a++)(0,s[a])()}function Wc(s,a){return a}function $c(s,a){if($){var t=us.formState;if(t!==null){s:{var e=G;if($){if(vs){a:{for(var n=vs,l=_a;n.nodeType!==8;){if(!l){n=null;break a}if(n=fa(n.nextSibling),n===null){n=null;break a}}l=n.data,n=l==="F!"||l==="F"?n:null}if(n){vs=fa(n.nextSibling),e=n.data==="F!";break s}}at(e)}e=!1}e&&(a=t[0])}}return t=Vs(),t.memoizedState=t.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wc,lastRenderedState:a},t.queue=e,t=br.bind(null,G,e),e.dispatch=t,e=Wi(!1),l=nd.bind(null,G,!1,e.queue),e=Vs(),n={state:a,dispatch:null,action:s,pending:null},e.queue=n,t=Jp.bind(null,G,n,l,t),n.dispatch=t,e.memoizedState=s,[a,t,!1]}function Pc(s){var a=ws();return sr(a,ds,s)}function sr(s,a,t){if(a=Fi(s,a,Wc)[0],s=nl(Ua)[0],typeof a=="object"&&a!==null&&typeof a.then=="function")try{var e=We(a)}catch(i){throw i===oe?Jn:i}else e=a;a=ws();var n=a.queue,l=n.dispatch;return t!==a.memoizedState&&(G.flags|=2048,pe(9,{destroy:void 0},Fp.bind(null,n,t),null)),[e,l,s]}function Fp(s,a){s.action=a}function ar(s){var a=ws(),t=ds;if(t!==null)return sr(a,t,s);ws(),a=a.memoizedState,t=ws();var e=t.queue.dispatch;return t.memoizedState=s,[a,e,!1]}function pe(s,a,t,e){return s={tag:s,create:t,deps:e,inst:a,next:null},a=G.updateQueue,a===null&&(a=tl(),G.updateQueue=a),t=a.lastEffect,t===null?a.lastEffect=s.next=s:(e=t.next,t.next=s,s.next=e,a.lastEffect=s),s}function tr(){return ws().memoizedState}function ll(s,a,t,e){var n=Vs();G.flags|=s,n.memoizedState=pe(1|a,{destroy:void 0},t,e===void 0?null:e)}function il(s,a,t,e){var n=ws();e=e===void 0?null:e;var l=n.memoizedState.inst;ds!==null&&e!==null&&Yi(e,ds.memoizedState.deps)?n.memoizedState=pe(a,l,t,e):(G.flags|=s,n.memoizedState=pe(1|a,l,t,e))}function er(s,a){ll(8390656,8,s,a)}function Pi(s,a){il(2048,8,s,a)}function Ip(s){G.flags|=4;var a=G.updateQueue;if(a===null)a=tl(),G.updateQueue=a,a.events=[s];else{var t=a.events;t===null?a.events=[s]:t.push(s)}}function nr(s){var a=ws().memoizedState;return Ip({ref:a,nextImpl:s}),function(){if((ts&2)!==0)throw Error(_(440));return a.impl.apply(void 0,arguments)}}function lr(s,a){return il(4,2,s,a)}function ir(s,a){return il(4,4,s,a)}function dr(s,a){if(typeof a=="function"){s=s();var t=a(s);return function(){typeof t=="function"?t():a(null)}}if(a!=null)return s=s(),a.current=s,function(){a.current=null}}function or(s,a,t){t=t!=null?t.concat([s]):null,il(4,4,dr.bind(null,a,s),t)}function sd(){}function cr(s,a){var t=ws();a=a===void 0?null:a;var e=t.memoizedState;return a!==null&&Yi(a,e[1])?e[0]:(t.memoizedState=[s,a],s)}function rr(s,a){var t=ws();a=a===void 0?null:a;var e=t.memoizedState;if(a!==null&&Yi(a,e[1]))return e[0];if(e=s(),Vt){Ia(!0);try{s()}finally{Ia(!1)}}return t.memoizedState=[e,a],e}function ad(s,a,t){return t===void 0||(ja&1073741824)!==0&&(F&261930)===0?s.memoizedState=a:(s.memoizedState=t,s=uu(),G.lanes|=s,rt|=s,t)}function ur(s,a,t,e){return sa(t,a)?t:re.current!==null?(s=ad(s,t,e),sa(s,a)||(ys=!0),s):(ja&42)===0||(ja&1073741824)!==0&&(F&261930)===0?(ys=!0,s.memoizedState=t):(s=uu(),G.lanes|=s,rt|=s,a)}function vr(s,a,t,e,n){var l=B.p;B.p=l!==0&&8>l?l:8;var i=m.T,d={};m.T=d,nd(s,!1,a,t);try{var o=n(),f=m.S;if(f!==null&&f(d,o),o!==null&&typeof o=="object"&&typeof o.then=="function"){var w=Xp(o,e);$e(s,a,w,ia(s))}else $e(s,a,e,ia(s))}catch(y){$e(s,a,{then:function(){},status:"rejected",reason:y},ia())}finally{B.p=l,i!==null&&d.types!==null&&(i.types=d.types),m.T=i}}function Wp(){}function td(s,a,t,e){if(s.tag!==5)throw Error(_(476));var n=pr(s).queue;vr(s,n,a,q,t===null?Wp:function(){return _r(s),t(e)})}function pr(s){var a=s.memoizedState;if(a!==null)return a;a={memoizedState:q,baseState:q,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ua,lastRenderedState:q},next:null};var t={};return a.next={memoizedState:t,baseState:t,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ua,lastRenderedState:t},next:null},s.memoizedState=a,s=s.alternate,s!==null&&(s.memoizedState=a),a}function _r(s){var a=pr(s);a.next===null&&(a=s.alternate.memoizedState),$e(s,a.next.queue,{},ia())}function ed(){return Ts(fn)}function hr(){return ws().memoizedState}function fr(){return ws().memoizedState}function $p(s){for(var a=s.return;a!==null;){switch(a.tag){case 24:case 3:var t=ia();s=nt(t);var e=lt(a,s,t);e!==null&&(Fs(e,a,t),Ke(e,a,t)),a={cache:Ei()},s.payload=a;return}a=a.return}}function Pp(s,a,t){var e=ia();t={lane:e,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null},dl(s)?gr(a,t):(t=ki(s,a,t,e),t!==null&&(Fs(t,s,e),wr(t,a,e)))}function br(s,a,t){var e=ia();$e(s,a,t,e)}function $e(s,a,t,e){var n={lane:e,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null};if(dl(s))gr(a,n);else{var l=s.alternate;if(s.lanes===0&&(l===null||l.lanes===0)&&(l=a.lastRenderedReducer,l!==null))try{var i=a.lastRenderedState,d=l(i,t);if(n.hasEagerState=!0,n.eagerState=d,sa(d,i))return qn(s,a,n,0),us===null&&Rn(),!1}catch{}finally{}if(t=ki(s,a,n,e),t!==null)return Fs(t,s,e),wr(t,a,e),!0}return!1}function nd(s,a,t,e){if(e={lane:2,revertLane:Od(),gesture:null,action:e,hasEagerState:!1,eagerState:null,next:null},dl(s)){if(a)throw Error(_(479))}else a=ki(s,t,e,2),a!==null&&Fs(a,s,2)}function dl(s){var a=s.alternate;return s===G||a!==null&&a===G}function gr(s,a){ue=sl=!0;var t=s.pending;t===null?a.next=a:(a.next=t.next,t.next=a),s.pending=a}function wr(s,a,t){if((t&4194048)!==0){var e=a.lanes;e&=s.pendingLanes,t|=e,a.lanes=t,Co(s,t)}}var Pe={readContext:Ts,use:el,useCallback:hs,useContext:hs,useEffect:hs,useImperativeHandle:hs,useLayoutEffect:hs,useInsertionEffect:hs,useMemo:hs,useReducer:hs,useRef:hs,useState:hs,useDebugValue:hs,useDeferredValue:hs,useTransition:hs,useSyncExternalStore:hs,useId:hs,useHostTransitionStatus:hs,useFormState:hs,useActionState:hs,useOptimistic:hs,useMemoCache:hs,useCacheRefresh:hs};Pe.useEffectEvent=hs;var mr={readContext:Ts,use:el,useCallback:function(s,a){return Vs().memoizedState=[s,a===void 0?null:a],s},useContext:Ts,useEffect:er,useImperativeHandle:function(s,a,t){t=t!=null?t.concat([s]):null,ll(4194308,4,dr.bind(null,a,s),t)},useLayoutEffect:function(s,a){return ll(4194308,4,s,a)},useInsertionEffect:function(s,a){ll(4,2,s,a)},useMemo:function(s,a){var t=Vs();a=a===void 0?null:a;var e=s();if(Vt){Ia(!0);try{s()}finally{Ia(!1)}}return t.memoizedState=[e,a],e},useReducer:function(s,a,t){var e=Vs();if(t!==void 0){var n=t(a);if(Vt){Ia(!0);try{t(a)}finally{Ia(!1)}}}else n=a;return e.memoizedState=e.baseState=n,s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:s,lastRenderedState:n},e.queue=s,s=s.dispatch=Pp.bind(null,G,s),[e.memoizedState,s]},useRef:function(s){var a=Vs();return s={current:s},a.memoizedState=s},useState:function(s){s=Wi(s);var a=s.queue,t=br.bind(null,G,a);return a.dispatch=t,[s.memoizedState,t]},useDebugValue:sd,useDeferredValue:function(s,a){var t=Vs();return ad(t,s,a)},useTransition:function(){var s=Wi(!1);return s=vr.bind(null,G,s.queue,!0,!1),Vs().memoizedState=s,[!1,s]},useSyncExternalStore:function(s,a,t){var e=G,n=Vs();if($){if(t===void 0)throw Error(_(407));t=t()}else{if(t=a(),us===null)throw Error(_(349));(F&127)!==0||qc(e,a,t)}n.memoizedState=t;var l={value:t,getSnapshot:a};return n.queue=l,er(Yc.bind(null,e,l,s),[s]),e.flags|=2048,pe(9,{destroy:void 0},Zc.bind(null,e,l,t,a),null),t},useId:function(){var s=Vs(),a=us.identifierPrefix;if($){var t=Ma,e=Sa;t=(e&~(1<<32-Ps(e)-1)).toString(32)+t,a="_"+a+"R_"+t,t=al++,0<t&&(a+="H"+t.toString(32)),a+="_"}else t=Qp++,a="_"+a+"r_"+t.toString(32)+"_";return s.memoizedState=a},useHostTransitionStatus:ed,useFormState:$c,useActionState:$c,useOptimistic:function(s){var a=Vs();a.memoizedState=a.baseState=s;var t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return a.queue=t,a=nd.bind(null,G,!0,t),t.dispatch=a,[s,a]},useMemoCache:Ji,useCacheRefresh:function(){return Vs().memoizedState=$p.bind(null,G)},useEffectEvent:function(s){var a=Vs(),t={impl:s};return a.memoizedState=t,function(){if((ts&2)!==0)throw Error(_(440));return t.impl.apply(void 0,arguments)}}},ld={readContext:Ts,use:el,useCallback:cr,useContext:Ts,useEffect:Pi,useImperativeHandle:or,useInsertionEffect:lr,useLayoutEffect:ir,useMemo:rr,useReducer:nl,useRef:tr,useState:function(){return nl(Ua)},useDebugValue:sd,useDeferredValue:function(s,a){var t=ws();return ur(t,ds.memoizedState,s,a)},useTransition:function(){var s=nl(Ua)[0],a=ws().memoizedState;return[typeof s=="boolean"?s:We(s),a]},useSyncExternalStore:Rc,useId:hr,useHostTransitionStatus:ed,useFormState:Pc,useActionState:Pc,useOptimistic:function(s,a){var t=ws();return Qc(t,ds,s,a)},useMemoCache:Ji,useCacheRefresh:fr};ld.useEffectEvent=nr;var kr={readContext:Ts,use:el,useCallback:cr,useContext:Ts,useEffect:Pi,useImperativeHandle:or,useInsertionEffect:lr,useLayoutEffect:ir,useMemo:rr,useReducer:Ii,useRef:tr,useState:function(){return Ii(Ua)},useDebugValue:sd,useDeferredValue:function(s,a){var t=ws();return ds===null?ad(t,s,a):ur(t,ds.memoizedState,s,a)},useTransition:function(){var s=Ii(Ua)[0],a=ws().memoizedState;return[typeof s=="boolean"?s:We(s),a]},useSyncExternalStore:Rc,useId:hr,useHostTransitionStatus:ed,useFormState:ar,useActionState:ar,useOptimistic:function(s,a){var t=ws();return ds!==null?Qc(t,ds,s,a):(t.baseState=s,[s,t.queue.dispatch])},useMemoCache:Ji,useCacheRefresh:fr};kr.useEffectEvent=nr;function id(s,a,t,e){a=s.memoizedState,t=t(e,a),t=t==null?a:H({},a,t),s.memoizedState=t,s.lanes===0&&(s.updateQueue.baseState=t)}var dd={enqueueSetState:function(s,a,t){s=s._reactInternals;var e=ia(),n=nt(e);n.payload=a,t!=null&&(n.callback=t),a=lt(s,n,e),a!==null&&(Fs(a,s,e),Ke(a,s,e))},enqueueReplaceState:function(s,a,t){s=s._reactInternals;var e=ia(),n=nt(e);n.tag=1,n.payload=a,t!=null&&(n.callback=t),a=lt(s,n,e),a!==null&&(Fs(a,s,e),Ke(a,s,e))},enqueueForceUpdate:function(s,a){s=s._reactInternals;var t=ia(),e=nt(t);e.tag=2,a!=null&&(e.callback=a),a=lt(s,e,t),a!==null&&(Fs(a,s,t),Ke(a,s,t))}};function yr(s,a,t,e,n,l,i){return s=s.stateNode,typeof s.shouldComponentUpdate=="function"?s.shouldComponentUpdate(e,l,i):a.prototype&&a.prototype.isPureReactComponent?!Ue(t,e)||!Ue(n,l):!0}function xr(s,a,t,e){s=a.state,typeof a.componentWillReceiveProps=="function"&&a.componentWillReceiveProps(t,e),typeof a.UNSAFE_componentWillReceiveProps=="function"&&a.UNSAFE_componentWillReceiveProps(t,e),a.state!==s&&dd.enqueueReplaceState(a,a.state,null)}function jt(s,a){var t=a;if("ref"in a){t={};for(var e in a)e!=="ref"&&(t[e]=a[e])}if(s=s.defaultProps){t===a&&(t=H({},t));for(var n in s)t[n]===void 0&&(t[n]=s[n])}return t}function Cr(s){Un(s)}function Sr(s){console.error(s)}function Mr(s){Un(s)}function ol(s,a){try{var t=s.onUncaughtError;t(a.value,{componentStack:a.stack})}catch(e){setTimeout(function(){throw e})}}function Br(s,a,t){try{var e=s.onCaughtError;e(t.value,{componentStack:t.stack,errorBoundary:a.tag===1?a.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function od(s,a,t){return t=nt(t),t.tag=3,t.payload={element:null},t.callback=function(){ol(s,a)},t}function Dr(s){return s=nt(s),s.tag=3,s}function Tr(s,a,t,e){var n=t.type.getDerivedStateFromError;if(typeof n=="function"){var l=e.value;s.payload=function(){return n(l)},s.callback=function(){Br(a,t,e)}}var i=t.stateNode;i!==null&&typeof i.componentDidCatch=="function"&&(s.callback=function(){Br(a,t,e),typeof n!="function"&&(ut===null?ut=new Set([this]):ut.add(this));var d=e.stack;this.componentDidCatch(e.value,{componentStack:d!==null?d:""})})}function s_(s,a,t,e,n){if(t.flags|=32768,e!==null&&typeof e=="object"&&typeof e.then=="function"){if(a=t.alternate,a!==null&&le(a,t,n,!0),t=ta.current,t!==null){switch(t.tag){case 31:case 13:return ha===null?ml():t.alternate===null&&fs===0&&(fs=3),t.flags&=-257,t.flags|=65536,t.lanes=n,e===Fn?t.flags|=16384:(a=t.updateQueue,a===null?t.updateQueue=new Set([e]):a.add(e),zd(s,e,n)),!1;case 22:return t.flags|=65536,e===Fn?t.flags|=16384:(a=t.updateQueue,a===null?(a={transitions:null,markerInstances:null,retryQueue:new Set([e])},t.updateQueue=a):(t=a.retryQueue,t===null?a.retryQueue=new Set([e]):t.add(e)),zd(s,e,n)),!1}throw Error(_(435,t.tag))}return zd(s,e,n),ml(),!1}if($)return a=ta.current,a!==null?((a.flags&65536)===0&&(a.flags|=256),a.flags|=65536,a.lanes=n,e!==Bi&&(s=Error(_(422),{cause:e}),Ze(ua(s,t)))):(e!==Bi&&(a=Error(_(423),{cause:e}),Ze(ua(a,t))),s=s.current.alternate,s.flags|=65536,n&=-n,s.lanes|=n,e=ua(e,t),n=od(s.stateNode,e,n),ji(s,n),fs!==4&&(fs=2)),!1;var l=Error(_(520),{cause:e});if(l=ua(l,t),on===null?on=[l]:on.push(l),fs!==4&&(fs=2),a===null)return!0;e=ua(e,t),t=a;do{switch(t.tag){case 3:return t.flags|=65536,s=n&-n,t.lanes|=s,s=od(t.stateNode,e,s),ji(t,s),!1;case 1:if(a=t.type,l=t.stateNode,(t.flags&128)===0&&(typeof a.getDerivedStateFromError=="function"||l!==null&&typeof l.componentDidCatch=="function"&&(ut===null||!ut.has(l))))return t.flags|=65536,n&=-n,t.lanes|=n,n=Dr(n),Tr(n,s,t,e),ji(t,n),!1}t=t.return}while(t!==null);return!1}var cd=Error(_(461)),ys=!1;function Ls(s,a,t,e){a.child=s===null?zc(a,null,t,e):Ot(a,s.child,t,e)}function Lr(s,a,t,e,n){t=t.render;var l=a.ref;if("ref"in e){var i={};for(var d in e)d!=="ref"&&(i[d]=e[d])}else i=e;return Et(a),e=Gi(s,a,t,i,l,n),d=Xi(),s!==null&&!ys?(Qi(s,a,n),Ra(s,a,n)):($&&d&&Si(a),a.flags|=1,Ls(s,a,e,n),a.child)}function Ar(s,a,t,e,n){if(s===null){var l=t.type;return typeof l=="function"&&!yi(l)&&l.defaultProps===void 0&&t.compare===null?(a.tag=15,a.type=l,Er(s,a,l,e,n)):(s=Yn(t.type,null,e,a,a.mode,n),s.ref=a.ref,s.return=a,a.child=s)}if(l=s.child,!bd(s,n)){var i=l.memoizedProps;if(t=t.compare,t=t!==null?t:Ue,t(i,e)&&s.ref===a.ref)return Ra(s,a,n)}return a.flags|=1,s=Na(l,e),s.ref=a.ref,s.return=a,a.child=s}function Er(s,a,t,e,n){if(s!==null){var l=s.memoizedProps;if(Ue(l,e)&&s.ref===a.ref)if(ys=!1,a.pendingProps=e=l,bd(s,n))(s.flags&131072)!==0&&(ys=!0);else return a.lanes=s.lanes,Ra(s,a,n)}return rd(s,a,t,e,n)}function zr(s,a,t,e){var n=e.children,l=s!==null?s.memoizedState:null;if(s===null&&a.stateNode===null&&(a.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.mode==="hidden"){if((a.flags&128)!==0){if(l=l!==null?l.baseLanes|t:t,s!==null){for(e=a.child=s.child,n=0;e!==null;)n=n|e.lanes|e.childLanes,e=e.sibling;e=n&~l}else e=0,a.child=null;return Nr(s,a,l,t,e)}if((t&536870912)!==0)a.memoizedState={baseLanes:0,cachePool:null},s!==null&&Kn(a,l!==null?l.cachePool:null),l!==null?Oc(a,l):Ri(),Vc(a);else return e=a.lanes=536870912,Nr(s,a,l!==null?l.baseLanes|t:t,t,e)}else l!==null?(Kn(a,l.cachePool),Oc(a,l),dt(),a.memoizedState=null):(s!==null&&Kn(a,null),Ri(),dt());return Ls(s,a,n,t),a.child}function sn(s,a){return s!==null&&s.tag===22||a.stateNode!==null||(a.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.sibling}function Nr(s,a,t,e,n){var l=Ni();return l=l===null?null:{parent:ms._currentValue,pool:l},a.memoizedState={baseLanes:t,cachePool:l},s!==null&&Kn(a,null),Ri(),Vc(a),s!==null&&le(s,a,e,!0),a.childLanes=n,null}function cl(s,a){return a=ul({mode:a.mode,children:a.children},s.mode),a.ref=s.ref,s.child=a,a.return=s,a}function Hr(s,a,t){return Ot(a,s.child,null,t),s=cl(a,a.pendingProps),s.flags|=2,ea(a),a.memoizedState=null,s}function a_(s,a,t){var e=a.pendingProps,n=(a.flags&128)!==0;if(a.flags&=-129,s===null){if($){if(e.mode==="hidden")return s=cl(a,e),a.lanes=536870912,sn(null,s);if(Zi(a),(s=vs)?(s=Ku(s,_a),s=s!==null&&s.data==="&"?s:null,s!==null&&(a.memoizedState={dehydrated:s,treeContext:Pa!==null?{id:Sa,overflow:Ma}:null,retryLane:536870912,hydrationErrors:null},t=gc(s),t.return=a,a.child=t,Ds=a,vs=null)):s=null,s===null)throw at(a);return a.lanes=536870912,null}return cl(a,e)}var l=s.memoizedState;if(l!==null){var i=l.dehydrated;if(Zi(a),n)if(a.flags&256)a.flags&=-257,a=Hr(s,a,t);else if(a.memoizedState!==null)a.child=s.child,a.flags|=128,a=null;else throw Error(_(558));else if(ys||le(s,a,t,!1),n=(t&s.childLanes)!==0,ys||n){if(e=us,e!==null&&(i=So(e,t),i!==0&&i!==l.retryLane))throw l.retryLane=i,Dt(s,i),Fs(e,s,i),cd;ml(),a=Hr(s,a,t)}else s=l.treeContext,vs=fa(i.nextSibling),Ds=a,$=!0,st=null,_a=!1,s!==null&&kc(a,s),a=cl(a,e),a.flags|=4096;return a}return s=Na(s.child,{mode:e.mode,children:e.children}),s.ref=a.ref,a.child=s,s.return=a,s}function rl(s,a){var t=a.ref;if(t===null)s!==null&&s.ref!==null&&(a.flags|=4194816);else{if(typeof t!="function"&&typeof t!="object")throw Error(_(284));(s===null||s.ref!==t)&&(a.flags|=4194816)}}function rd(s,a,t,e,n){return Et(a),t=Gi(s,a,t,e,void 0,n),e=Xi(),s!==null&&!ys?(Qi(s,a,n),Ra(s,a,n)):($&&e&&Si(a),a.flags|=1,Ls(s,a,t,n),a.child)}function Or(s,a,t,e,n,l){return Et(a),a.updateQueue=null,t=Uc(a,e,t,n),jc(s),e=Xi(),s!==null&&!ys?(Qi(s,a,l),Ra(s,a,l)):($&&e&&Si(a),a.flags|=1,Ls(s,a,t,l),a.child)}function Vr(s,a,t,e,n){if(Et(a),a.stateNode===null){var l=ae,i=t.contextType;typeof i=="object"&&i!==null&&(l=Ts(i)),l=new t(e,l),a.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,l.updater=dd,a.stateNode=l,l._reactInternals=a,l=a.stateNode,l.props=e,l.state=a.memoizedState,l.refs={},Oi(a),i=t.contextType,l.context=typeof i=="object"&&i!==null?Ts(i):ae,l.state=a.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(id(a,t,i,e),l.state=a.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(i=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),i!==l.state&&dd.enqueueReplaceState(l,l.state,null),Fe(a,e,l,n),Je(),l.state=a.memoizedState),typeof l.componentDidMount=="function"&&(a.flags|=4194308),e=!0}else if(s===null){l=a.stateNode;var d=a.memoizedProps,o=jt(t,d);l.props=o;var f=l.context,w=t.contextType;i=ae,typeof w=="object"&&w!==null&&(i=Ts(w));var y=t.getDerivedStateFromProps;w=typeof y=="function"||typeof l.getSnapshotBeforeUpdate=="function",d=a.pendingProps!==d,w||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(d||f!==i)&&xr(a,l,e,i),et=!1;var b=a.memoizedState;l.state=b,Fe(a,e,l,n),Je(),f=a.memoizedState,d||b!==f||et?(typeof y=="function"&&(id(a,t,y,e),f=a.memoizedState),(o=et||yr(a,t,o,e,b,f,i))?(w||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(a.flags|=4194308)):(typeof l.componentDidMount=="function"&&(a.flags|=4194308),a.memoizedProps=e,a.memoizedState=f),l.props=e,l.state=f,l.context=i,e=o):(typeof l.componentDidMount=="function"&&(a.flags|=4194308),e=!1)}else{l=a.stateNode,Vi(s,a),i=a.memoizedProps,w=jt(t,i),l.props=w,y=a.pendingProps,b=l.context,f=t.contextType,o=ae,typeof f=="object"&&f!==null&&(o=Ts(f)),d=t.getDerivedStateFromProps,(f=typeof d=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==y||b!==o)&&xr(a,l,e,o),et=!1,b=a.memoizedState,l.state=b,Fe(a,e,l,n),Je();var g=a.memoizedState;i!==y||b!==g||et||s!==null&&s.dependencies!==null&&Xn(s.dependencies)?(typeof d=="function"&&(id(a,t,d,e),g=a.memoizedState),(w=et||yr(a,t,w,e,b,g,o)||s!==null&&s.dependencies!==null&&Xn(s.dependencies))?(f||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(e,g,o),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(e,g,o)),typeof l.componentDidUpdate=="function"&&(a.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(a.flags|=1024)):(typeof l.componentDidUpdate!="function"||i===s.memoizedProps&&b===s.memoizedState||(a.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===s.memoizedProps&&b===s.memoizedState||(a.flags|=1024),a.memoizedProps=e,a.memoizedState=g),l.props=e,l.state=g,l.context=o,e=w):(typeof l.componentDidUpdate!="function"||i===s.memoizedProps&&b===s.memoizedState||(a.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===s.memoizedProps&&b===s.memoizedState||(a.flags|=1024),e=!1)}return l=e,rl(s,a),e=(a.flags&128)!==0,l||e?(l=a.stateNode,t=e&&typeof t.getDerivedStateFromError!="function"?null:l.render(),a.flags|=1,s!==null&&e?(a.child=Ot(a,s.child,null,n),a.child=Ot(a,null,t,n)):Ls(s,a,t,n),a.memoizedState=l.state,s=a.child):s=Ra(s,a,n),s}function jr(s,a,t,e){return Lt(),a.flags|=256,Ls(s,a,t,e),a.child}var ud={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function vd(s){return{baseLanes:s,cachePool:Bc()}}function pd(s,a,t){return s=s!==null?s.childLanes&~t:0,a&&(s|=la),s}function Ur(s,a,t){var e=a.pendingProps,n=!1,l=(a.flags&128)!==0,i;if((i=l)||(i=s!==null&&s.memoizedState===null?!1:(gs.current&2)!==0),i&&(n=!0,a.flags&=-129),i=(a.flags&32)!==0,a.flags&=-33,s===null){if($){if(n?it(a):dt(),(s=vs)?(s=Ku(s,_a),s=s!==null&&s.data!=="&"?s:null,s!==null&&(a.memoizedState={dehydrated:s,treeContext:Pa!==null?{id:Sa,overflow:Ma}:null,retryLane:536870912,hydrationErrors:null},t=gc(s),t.return=a,a.child=t,Ds=a,vs=null)):s=null,s===null)throw at(a);return Fd(s)?a.lanes=32:a.lanes=536870912,null}var d=e.children;return e=e.fallback,n?(dt(),n=a.mode,d=ul({mode:"hidden",children:d},n),e=Tt(e,n,t,null),d.return=a,e.return=a,d.sibling=e,a.child=d,e=a.child,e.memoizedState=vd(t),e.childLanes=pd(s,i,t),a.memoizedState=ud,sn(null,e)):(it(a),_d(a,d))}var o=s.memoizedState;if(o!==null&&(d=o.dehydrated,d!==null)){if(l)a.flags&256?(it(a),a.flags&=-257,a=hd(s,a,t)):a.memoizedState!==null?(dt(),a.child=s.child,a.flags|=128,a=null):(dt(),d=e.fallback,n=a.mode,e=ul({mode:"visible",children:e.children},n),d=Tt(d,n,t,null),d.flags|=2,e.return=a,d.return=a,e.sibling=d,a.child=e,Ot(a,s.child,null,t),e=a.child,e.memoizedState=vd(t),e.childLanes=pd(s,i,t),a.memoizedState=ud,a=sn(null,e));else if(it(a),Fd(d)){if(i=d.nextSibling&&d.nextSibling.dataset,i)var f=i.dgst;i=f,e=Error(_(419)),e.stack="",e.digest=i,Ze({value:e,source:null,stack:null}),a=hd(s,a,t)}else if(ys||le(s,a,t,!1),i=(t&s.childLanes)!==0,ys||i){if(i=us,i!==null&&(e=So(i,t),e!==0&&e!==o.retryLane))throw o.retryLane=e,Dt(s,e),Fs(i,s,e),cd;Jd(d)||ml(),a=hd(s,a,t)}else Jd(d)?(a.flags|=192,a.child=s.child,a=null):(s=o.treeContext,vs=fa(d.nextSibling),Ds=a,$=!0,st=null,_a=!1,s!==null&&kc(a,s),a=_d(a,e.children),a.flags|=4096);return a}return n?(dt(),d=e.fallback,n=a.mode,o=s.child,f=o.sibling,e=Na(o,{mode:"hidden",children:e.children}),e.subtreeFlags=o.subtreeFlags&65011712,f!==null?d=Na(f,d):(d=Tt(d,n,t,null),d.flags|=2),d.return=a,e.return=a,e.sibling=d,a.child=e,sn(null,e),e=a.child,d=s.child.memoizedState,d===null?d=vd(t):(n=d.cachePool,n!==null?(o=ms._currentValue,n=n.parent!==o?{parent:o,pool:o}:n):n=Bc(),d={baseLanes:d.baseLanes|t,cachePool:n}),e.memoizedState=d,e.childLanes=pd(s,i,t),a.memoizedState=ud,sn(s.child,e)):(it(a),t=s.child,s=t.sibling,t=Na(t,{mode:"visible",children:e.children}),t.return=a,t.sibling=null,s!==null&&(i=a.deletions,i===null?(a.deletions=[s],a.flags|=16):i.push(s)),a.child=t,a.memoizedState=null,t)}function _d(s,a){return a=ul({mode:"visible",children:a},s.mode),a.return=s,s.child=a}function ul(s,a){return s=aa(22,s,null,a),s.lanes=0,s}function hd(s,a,t){return Ot(a,s.child,null,t),s=_d(a,a.pendingProps.children),s.flags|=2,a.memoizedState=null,s}function Rr(s,a,t){s.lanes|=a;var e=s.alternate;e!==null&&(e.lanes|=a),Li(s.return,a,t)}function fd(s,a,t,e,n,l){var i=s.memoizedState;i===null?s.memoizedState={isBackwards:a,rendering:null,renderingStartTime:0,last:e,tail:t,tailMode:n,treeForkCount:l}:(i.isBackwards=a,i.rendering=null,i.renderingStartTime=0,i.last=e,i.tail=t,i.tailMode=n,i.treeForkCount=l)}function qr(s,a,t){var e=a.pendingProps,n=e.revealOrder,l=e.tail;e=e.children;var i=gs.current,d=(i&2)!==0;if(d?(i=i&1|2,a.flags|=128):i&=1,D(gs,i),Ls(s,a,e,t),e=$?qe:0,!d&&s!==null&&(s.flags&128)!==0)s:for(s=a.child;s!==null;){if(s.tag===13)s.memoizedState!==null&&Rr(s,t,a);else if(s.tag===19)Rr(s,t,a);else if(s.child!==null){s.child.return=s,s=s.child;continue}if(s===a)break s;for(;s.sibling===null;){if(s.return===null||s.return===a)break s;s=s.return}s.sibling.return=s.return,s=s.sibling}switch(n){case"forwards":for(t=a.child,n=null;t!==null;)s=t.alternate,s!==null&&Pn(s)===null&&(n=t),t=t.sibling;t=n,t===null?(n=a.child,a.child=null):(n=t.sibling,t.sibling=null),fd(a,!1,n,t,l,e);break;case"backwards":case"unstable_legacy-backwards":for(t=null,n=a.child,a.child=null;n!==null;){if(s=n.alternate,s!==null&&Pn(s)===null){a.child=n;break}s=n.sibling,n.sibling=t,t=n,n=s}fd(a,!0,t,null,l,e);break;case"together":fd(a,!1,null,null,void 0,e);break;default:a.memoizedState=null}return a.child}function Ra(s,a,t){if(s!==null&&(a.dependencies=s.dependencies),rt|=a.lanes,(t&a.childLanes)===0)if(s!==null){if(le(s,a,t,!1),(t&a.childLanes)===0)return null}else return null;if(s!==null&&a.child!==s.child)throw Error(_(153));if(a.child!==null){for(s=a.child,t=Na(s,s.pendingProps),a.child=t,t.return=a;s.sibling!==null;)s=s.sibling,t=t.sibling=Na(s,s.pendingProps),t.return=a;t.sibling=null}return a.child}function bd(s,a){return(s.lanes&a)!==0?!0:(s=s.dependencies,!!(s!==null&&Xn(s)))}function t_(s,a,t){switch(a.tag){case 3:Os(a,a.stateNode.containerInfo),tt(a,ms,s.memoizedState.cache),Lt();break;case 27:case 5:Me(a);break;case 4:Os(a,a.stateNode.containerInfo);break;case 10:tt(a,a.type,a.memoizedProps.value);break;case 31:if(a.memoizedState!==null)return a.flags|=128,Zi(a),null;break;case 13:var e=a.memoizedState;if(e!==null)return e.dehydrated!==null?(it(a),a.flags|=128,null):(t&a.child.childLanes)!==0?Ur(s,a,t):(it(a),s=Ra(s,a,t),s!==null?s.sibling:null);it(a);break;case 19:var n=(s.flags&128)!==0;if(e=(t&a.childLanes)!==0,e||(le(s,a,t,!1),e=(t&a.childLanes)!==0),n){if(e)return qr(s,a,t);a.flags|=128}if(n=a.memoizedState,n!==null&&(n.rendering=null,n.tail=null,n.lastEffect=null),D(gs,gs.current),e)break;return null;case 22:return a.lanes=0,zr(s,a,t,a.pendingProps);case 24:tt(a,ms,s.memoizedState.cache)}return Ra(s,a,t)}function Zr(s,a,t){if(s!==null)if(s.memoizedProps!==a.pendingProps)ys=!0;else{if(!bd(s,t)&&(a.flags&128)===0)return ys=!1,t_(s,a,t);ys=(s.flags&131072)!==0}else ys=!1,$&&(a.flags&1048576)!==0&&mc(a,qe,a.index);switch(a.lanes=0,a.tag){case 16:s:{var e=a.pendingProps;if(s=Nt(a.elementType),a.type=s,typeof s=="function")yi(s)?(e=jt(s,e),a.tag=1,a=Vr(null,a,s,e,t)):(a.tag=0,a=rd(null,a,s,e,t));else{if(s!=null){var n=s.$$typeof;if(n===da){a.tag=11,a=Lr(null,a,s,e,t);break s}else if(n===W){a.tag=14,a=Ar(null,a,s,e,t);break s}}throw a=La(s)||s,Error(_(306,a,""))}}return a;case 0:return rd(s,a,a.type,a.pendingProps,t);case 1:return e=a.type,n=jt(e,a.pendingProps),Vr(s,a,e,n,t);case 3:s:{if(Os(a,a.stateNode.containerInfo),s===null)throw Error(_(387));e=a.pendingProps;var l=a.memoizedState;n=l.element,Vi(s,a),Fe(a,e,null,t);var i=a.memoizedState;if(e=i.cache,tt(a,ms,e),e!==l.cache&&Ai(a,[ms],t,!0),Je(),e=i.element,l.isDehydrated)if(l={element:e,isDehydrated:!1,cache:i.cache},a.updateQueue.baseState=l,a.memoizedState=l,a.flags&256){a=jr(s,a,e,t);break s}else if(e!==n){n=ua(Error(_(424)),a),Ze(n),a=jr(s,a,e,t);break s}else{switch(s=a.stateNode.containerInfo,s.nodeType){case 9:s=s.body;break;default:s=s.nodeName==="HTML"?s.ownerDocument.body:s}for(vs=fa(s.firstChild),Ds=a,$=!0,st=null,_a=!0,t=zc(a,null,e,t),a.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling}else{if(Lt(),e===n){a=Ra(s,a,t);break s}Ls(s,a,e,t)}a=a.child}return a;case 26:return rl(s,a),s===null?(t=Pu(a.type,null,a.pendingProps,null))?a.memoizedState=t:$||(t=a.type,s=a.pendingProps,e=Bl(Q.current).createElement(t),e[Bs]=a,e[Ys]=s,As(e,t,s),Ss(e),a.stateNode=e):a.memoizedState=Pu(a.type,s.memoizedProps,a.pendingProps,s.memoizedState),null;case 27:return Me(a),s===null&&$&&(e=a.stateNode=Iu(a.type,a.pendingProps,Q.current),Ds=a,_a=!0,n=vs,ht(a.type)?(Id=n,vs=fa(e.firstChild)):vs=n),Ls(s,a,a.pendingProps.children,t),rl(s,a),s===null&&(a.flags|=4194304),a.child;case 5:return s===null&&$&&((n=e=vs)&&(e=E_(e,a.type,a.pendingProps,_a),e!==null?(a.stateNode=e,Ds=a,vs=fa(e.firstChild),_a=!1,n=!0):n=!1),n||at(a)),Me(a),n=a.type,l=a.pendingProps,i=s!==null?s.memoizedProps:null,e=l.children,Xd(n,l)?e=null:i!==null&&Xd(n,i)&&(a.flags|=32),a.memoizedState!==null&&(n=Gi(s,a,Kp,null,null,t),fn._currentValue=n),rl(s,a),Ls(s,a,e,t),a.child;case 6:return s===null&&$&&((s=t=vs)&&(t=z_(t,a.pendingProps,_a),t!==null?(a.stateNode=t,Ds=a,vs=null,s=!0):s=!1),s||at(a)),null;case 13:return Ur(s,a,t);case 4:return Os(a,a.stateNode.containerInfo),e=a.pendingProps,s===null?a.child=Ot(a,null,e,t):Ls(s,a,e,t),a.child;case 11:return Lr(s,a,a.type,a.pendingProps,t);case 7:return Ls(s,a,a.pendingProps,t),a.child;case 8:return Ls(s,a,a.pendingProps.children,t),a.child;case 12:return Ls(s,a,a.pendingProps.children,t),a.child;case 10:return e=a.pendingProps,tt(a,a.type,e.value),Ls(s,a,e.children,t),a.child;case 9:return n=a.type._context,e=a.pendingProps.children,Et(a),n=Ts(n),e=e(n),a.flags|=1,Ls(s,a,e,t),a.child;case 14:return Ar(s,a,a.type,a.pendingProps,t);case 15:return Er(s,a,a.type,a.pendingProps,t);case 19:return qr(s,a,t);case 31:return a_(s,a,t);case 22:return zr(s,a,t,a.pendingProps);case 24:return Et(a),e=Ts(ms),s===null?(n=Ni(),n===null&&(n=us,l=Ei(),n.pooledCache=l,l.refCount++,l!==null&&(n.pooledCacheLanes|=t),n=l),a.memoizedState={parent:e,cache:n},Oi(a),tt(a,ms,n)):((s.lanes&t)!==0&&(Vi(s,a),Fe(a,null,null,t),Je()),n=s.memoizedState,l=a.memoizedState,n.parent!==e?(n={parent:e,cache:e},a.memoizedState=n,a.lanes===0&&(a.memoizedState=a.updateQueue.baseState=n),tt(a,ms,e)):(e=l.cache,tt(a,ms,e),e!==n.cache&&Ai(a,[ms],t,!0))),Ls(s,a,a.pendingProps.children,t),a.child;case 29:throw a.pendingProps}throw Error(_(156,a.tag))}function qa(s){s.flags|=4}function gd(s,a,t,e,n){if((a=(s.mode&32)!==0)&&(a=!1),a){if(s.flags|=16777216,(n&335544128)===n)if(s.stateNode.complete)s.flags|=8192;else if(hu())s.flags|=8192;else throw Ht=Fn,Hi}else s.flags&=-16777217}function Yr(s,a){if(a.type!=="stylesheet"||(a.state.loading&4)!==0)s.flags&=-16777217;else if(s.flags|=16777216,!nv(a))if(hu())s.flags|=8192;else throw Ht=Fn,Hi}function vl(s,a){a!==null&&(s.flags|=4),s.flags&16384&&(a=s.tag!==22?yo():536870912,s.lanes|=a,be|=a)}function an(s,a){if(!$)switch(s.tailMode){case"hidden":a=s.tail;for(var t=null;a!==null;)a.alternate!==null&&(t=a),a=a.sibling;t===null?s.tail=null:t.sibling=null;break;case"collapsed":t=s.tail;for(var e=null;t!==null;)t.alternate!==null&&(e=t),t=t.sibling;e===null?a||s.tail===null?s.tail=null:s.tail.sibling=null:e.sibling=null}}function ps(s){var a=s.alternate!==null&&s.alternate.child===s.child,t=0,e=0;if(a)for(var n=s.child;n!==null;)t|=n.lanes|n.childLanes,e|=n.subtreeFlags&65011712,e|=n.flags&65011712,n.return=s,n=n.sibling;else for(n=s.child;n!==null;)t|=n.lanes|n.childLanes,e|=n.subtreeFlags,e|=n.flags,n.return=s,n=n.sibling;return s.subtreeFlags|=e,s.childLanes=t,a}function e_(s,a,t){var e=a.pendingProps;switch(Mi(a),a.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ps(a),null;case 1:return ps(a),null;case 3:return t=a.stateNode,e=null,s!==null&&(e=s.memoizedState.cache),a.memoizedState.cache!==e&&(a.flags|=2048),Va(ms),bs(),t.pendingContext&&(t.context=t.pendingContext,t.pendingContext=null),(s===null||s.child===null)&&(ne(a)?qa(a):s===null||s.memoizedState.isDehydrated&&(a.flags&256)===0||(a.flags|=1024,Di())),ps(a),null;case 26:var n=a.type,l=a.memoizedState;return s===null?(qa(a),l!==null?(ps(a),Yr(a,l)):(ps(a),gd(a,n,null,e,t))):l?l!==s.memoizedState?(qa(a),ps(a),Yr(a,l)):(ps(a),a.flags&=-16777217):(s=s.memoizedProps,s!==e&&qa(a),ps(a),gd(a,n,s,e,t)),null;case 27:if(xn(a),t=Q.current,n=a.type,s!==null&&a.stateNode!=null)s.memoizedProps!==e&&qa(a);else{if(!e){if(a.stateNode===null)throw Error(_(166));return ps(a),null}s=E.current,ne(a)?yc(a):(s=Iu(n,e,t),a.stateNode=s,qa(a))}return ps(a),null;case 5:if(xn(a),n=a.type,s!==null&&a.stateNode!=null)s.memoizedProps!==e&&qa(a);else{if(!e){if(a.stateNode===null)throw Error(_(166));return ps(a),null}if(l=E.current,ne(a))yc(a);else{var i=Bl(Q.current);switch(l){case 1:l=i.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:l=i.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":l=i.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":l=i.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":l=i.createElement("div"),l.innerHTML="<script><\/script>",l=l.removeChild(l.firstChild);break;case"select":l=typeof e.is=="string"?i.createElement("select",{is:e.is}):i.createElement("select"),e.multiple?l.multiple=!0:e.size&&(l.size=e.size);break;default:l=typeof e.is=="string"?i.createElement(n,{is:e.is}):i.createElement(n)}}l[Bs]=a,l[Ys]=e;s:for(i=a.child;i!==null;){if(i.tag===5||i.tag===6)l.appendChild(i.stateNode);else if(i.tag!==4&&i.tag!==27&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===a)break s;for(;i.sibling===null;){if(i.return===null||i.return===a)break s;i=i.return}i.sibling.return=i.return,i=i.sibling}a.stateNode=l;s:switch(As(l,n,e),n){case"button":case"input":case"select":case"textarea":e=!!e.autoFocus;break s;case"img":e=!0;break s;default:e=!1}e&&qa(a)}}return ps(a),gd(a,a.type,s===null?null:s.memoizedProps,a.pendingProps,t),null;case 6:if(s&&a.stateNode!=null)s.memoizedProps!==e&&qa(a);else{if(typeof e!="string"&&a.stateNode===null)throw Error(_(166));if(s=Q.current,ne(a)){if(s=a.stateNode,t=a.memoizedProps,e=null,n=Ds,n!==null)switch(n.tag){case 27:case 5:e=n.memoizedProps}s[Bs]=a,s=!!(s.nodeValue===t||e!==null&&e.suppressHydrationWarning===!0||Uu(s.nodeValue,t)),s||at(a,!0)}else s=Bl(s).createTextNode(e),s[Bs]=a,a.stateNode=s}return ps(a),null;case 31:if(t=a.memoizedState,s===null||s.memoizedState!==null){if(e=ne(a),t!==null){if(s===null){if(!e)throw Error(_(318));if(s=a.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(_(557));s[Bs]=a}else Lt(),(a.flags&128)===0&&(a.memoizedState=null),a.flags|=4;ps(a),s=!1}else t=Di(),s!==null&&s.memoizedState!==null&&(s.memoizedState.hydrationErrors=t),s=!0;if(!s)return a.flags&256?(ea(a),a):(ea(a),null);if((a.flags&128)!==0)throw Error(_(558))}return ps(a),null;case 13:if(e=a.memoizedState,s===null||s.memoizedState!==null&&s.memoizedState.dehydrated!==null){if(n=ne(a),e!==null&&e.dehydrated!==null){if(s===null){if(!n)throw Error(_(318));if(n=a.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(_(317));n[Bs]=a}else Lt(),(a.flags&128)===0&&(a.memoizedState=null),a.flags|=4;ps(a),n=!1}else n=Di(),s!==null&&s.memoizedState!==null&&(s.memoizedState.hydrationErrors=n),n=!0;if(!n)return a.flags&256?(ea(a),a):(ea(a),null)}return ea(a),(a.flags&128)!==0?(a.lanes=t,a):(t=e!==null,s=s!==null&&s.memoizedState!==null,t&&(e=a.child,n=null,e.alternate!==null&&e.alternate.memoizedState!==null&&e.alternate.memoizedState.cachePool!==null&&(n=e.alternate.memoizedState.cachePool.pool),l=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),l!==n&&(e.flags|=2048)),t!==s&&t&&(a.child.flags|=8192),vl(a,a.updateQueue),ps(a),null);case 4:return bs(),s===null&&Rd(a.stateNode.containerInfo),ps(a),null;case 10:return Va(a.type),ps(a),null;case 19:if(x(gs),e=a.memoizedState,e===null)return ps(a),null;if(n=(a.flags&128)!==0,l=e.rendering,l===null)if(n)an(e,!1);else{if(fs!==0||s!==null&&(s.flags&128)!==0)for(s=a.child;s!==null;){if(l=Pn(s),l!==null){for(a.flags|=128,an(e,!1),s=l.updateQueue,a.updateQueue=s,vl(a,s),a.subtreeFlags=0,s=t,t=a.child;t!==null;)bc(t,s),t=t.sibling;return D(gs,gs.current&1|2),$&&Ha(a,e.treeForkCount),a.child}s=s.sibling}e.tail!==null&&Ws()>bl&&(a.flags|=128,n=!0,an(e,!1),a.lanes=4194304)}else{if(!n)if(s=Pn(l),s!==null){if(a.flags|=128,n=!0,s=s.updateQueue,a.updateQueue=s,vl(a,s),an(e,!0),e.tail===null&&e.tailMode==="hidden"&&!l.alternate&&!$)return ps(a),null}else 2*Ws()-e.renderingStartTime>bl&&t!==536870912&&(a.flags|=128,n=!0,an(e,!1),a.lanes=4194304);e.isBackwards?(l.sibling=a.child,a.child=l):(s=e.last,s!==null?s.sibling=l:a.child=l,e.last=l)}return e.tail!==null?(s=e.tail,e.rendering=s,e.tail=s.sibling,e.renderingStartTime=Ws(),s.sibling=null,t=gs.current,D(gs,n?t&1|2:t&1),$&&Ha(a,e.treeForkCount),s):(ps(a),null);case 22:case 23:return ea(a),qi(),e=a.memoizedState!==null,s!==null?s.memoizedState!==null!==e&&(a.flags|=8192):e&&(a.flags|=8192),e?(t&536870912)!==0&&(a.flags&128)===0&&(ps(a),a.subtreeFlags&6&&(a.flags|=8192)):ps(a),t=a.updateQueue,t!==null&&vl(a,t.retryQueue),t=null,s!==null&&s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(t=s.memoizedState.cachePool.pool),e=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(e=a.memoizedState.cachePool.pool),e!==t&&(a.flags|=2048),s!==null&&x(zt),null;case 24:return t=null,s!==null&&(t=s.memoizedState.cache),a.memoizedState.cache!==t&&(a.flags|=2048),Va(ms),ps(a),null;case 25:return null;case 30:return null}throw Error(_(156,a.tag))}function n_(s,a){switch(Mi(a),a.tag){case 1:return s=a.flags,s&65536?(a.flags=s&-65537|128,a):null;case 3:return Va(ms),bs(),s=a.flags,(s&65536)!==0&&(s&128)===0?(a.flags=s&-65537|128,a):null;case 26:case 27:case 5:return xn(a),null;case 31:if(a.memoizedState!==null){if(ea(a),a.alternate===null)throw Error(_(340));Lt()}return s=a.flags,s&65536?(a.flags=s&-65537|128,a):null;case 13:if(ea(a),s=a.memoizedState,s!==null&&s.dehydrated!==null){if(a.alternate===null)throw Error(_(340));Lt()}return s=a.flags,s&65536?(a.flags=s&-65537|128,a):null;case 19:return x(gs),null;case 4:return bs(),null;case 10:return Va(a.type),null;case 22:case 23:return ea(a),qi(),s!==null&&x(zt),s=a.flags,s&65536?(a.flags=s&-65537|128,a):null;case 24:return Va(ms),null;case 25:return null;default:return null}}function Gr(s,a){switch(Mi(a),a.tag){case 3:Va(ms),bs();break;case 26:case 27:case 5:xn(a);break;case 4:bs();break;case 31:a.memoizedState!==null&&ea(a);break;case 13:ea(a);break;case 19:x(gs);break;case 10:Va(a.type);break;case 22:case 23:ea(a),qi(),s!==null&&x(zt);break;case 24:Va(ms)}}function tn(s,a){try{var t=a.updateQueue,e=t!==null?t.lastEffect:null;if(e!==null){var n=e.next;t=n;do{if((t.tag&s)===s){e=void 0;var l=t.create,i=t.inst;e=l(),i.destroy=e}t=t.next}while(t!==n)}}catch(d){ls(a,a.return,d)}}function ot(s,a,t){try{var e=a.updateQueue,n=e!==null?e.lastEffect:null;if(n!==null){var l=n.next;e=l;do{if((e.tag&s)===s){var i=e.inst,d=i.destroy;if(d!==void 0){i.destroy=void 0,n=a;var o=t,f=d;try{f()}catch(w){ls(n,o,w)}}}e=e.next}while(e!==l)}}catch(w){ls(a,a.return,w)}}function Xr(s){var a=s.updateQueue;if(a!==null){var t=s.stateNode;try{Hc(a,t)}catch(e){ls(s,s.return,e)}}}function Qr(s,a,t){t.props=jt(s.type,s.memoizedProps),t.state=s.memoizedState;try{t.componentWillUnmount()}catch(e){ls(s,a,e)}}function en(s,a){try{var t=s.ref;if(t!==null){switch(s.tag){case 26:case 27:case 5:var e=s.stateNode;break;case 30:e=s.stateNode;break;default:e=s.stateNode}typeof t=="function"?s.refCleanup=t(e):t.current=e}}catch(n){ls(s,a,n)}}function Ba(s,a){var t=s.ref,e=s.refCleanup;if(t!==null)if(typeof e=="function")try{e()}catch(n){ls(s,a,n)}finally{s.refCleanup=null,s=s.alternate,s!=null&&(s.refCleanup=null)}else if(typeof t=="function")try{t(null)}catch(n){ls(s,a,n)}else t.current=null}function Kr(s){var a=s.type,t=s.memoizedProps,e=s.stateNode;try{s:switch(a){case"button":case"input":case"select":case"textarea":t.autoFocus&&e.focus();break s;case"img":t.src?e.src=t.src:t.srcSet&&(e.srcset=t.srcSet)}}catch(n){ls(s,s.return,n)}}function wd(s,a,t){try{var e=s.stateNode;M_(e,s.type,t,a),e[Ys]=a}catch(n){ls(s,s.return,n)}}function Jr(s){return s.tag===5||s.tag===3||s.tag===26||s.tag===27&&ht(s.type)||s.tag===4}function md(s){s:for(;;){for(;s.sibling===null;){if(s.return===null||Jr(s.return))return null;s=s.return}for(s.sibling.return=s.return,s=s.sibling;s.tag!==5&&s.tag!==6&&s.tag!==18;){if(s.tag===27&&ht(s.type)||s.flags&2||s.child===null||s.tag===4)continue s;s.child.return=s,s=s.child}if(!(s.flags&2))return s.stateNode}}function kd(s,a,t){var e=s.tag;if(e===5||e===6)s=s.stateNode,a?(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t).insertBefore(s,a):(a=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.appendChild(s),t=t._reactRootContainer,t!=null||a.onclick!==null||(a.onclick=Ea));else if(e!==4&&(e===27&&ht(s.type)&&(t=s.stateNode,a=null),s=s.child,s!==null))for(kd(s,a,t),s=s.sibling;s!==null;)kd(s,a,t),s=s.sibling}function pl(s,a,t){var e=s.tag;if(e===5||e===6)s=s.stateNode,a?t.insertBefore(s,a):t.appendChild(s);else if(e!==4&&(e===27&&ht(s.type)&&(t=s.stateNode),s=s.child,s!==null))for(pl(s,a,t),s=s.sibling;s!==null;)pl(s,a,t),s=s.sibling}function Fr(s){var a=s.stateNode,t=s.memoizedProps;try{for(var e=s.type,n=a.attributes;n.length;)a.removeAttributeNode(n[0]);As(a,e,t),a[Bs]=s,a[Ys]=t}catch(l){ls(s,s.return,l)}}var Za=!1,xs=!1,yd=!1,Ir=typeof WeakSet=="function"?WeakSet:Set,Ms=null;function l_(s,a){if(s=s.containerInfo,Yd=Nl,s=oc(s),hi(s)){if("selectionStart"in s)var t={start:s.selectionStart,end:s.selectionEnd};else s:{t=(t=s.ownerDocument)&&t.defaultView||window;var e=t.getSelection&&t.getSelection();if(e&&e.rangeCount!==0){t=e.anchorNode;var n=e.anchorOffset,l=e.focusNode;e=e.focusOffset;try{t.nodeType,l.nodeType}catch{t=null;break s}var i=0,d=-1,o=-1,f=0,w=0,y=s,b=null;a:for(;;){for(var g;y!==t||n!==0&&y.nodeType!==3||(d=i+n),y!==l||e!==0&&y.nodeType!==3||(o=i+e),y.nodeType===3&&(i+=y.nodeValue.length),(g=y.firstChild)!==null;)b=y,y=g;for(;;){if(y===s)break a;if(b===t&&++f===n&&(d=i),b===l&&++w===e&&(o=i),(g=y.nextSibling)!==null)break;y=b,b=y.parentNode}y=g}t=d===-1||o===-1?null:{start:d,end:o}}else t=null}t=t||{start:0,end:0}}else t=null;for(Gd={focusedElem:s,selectionRange:t},Nl=!1,Ms=a;Ms!==null;)if(a=Ms,s=a.child,(a.subtreeFlags&1028)!==0&&s!==null)s.return=a,Ms=s;else for(;Ms!==null;){switch(a=Ms,l=a.alternate,s=a.flags,a.tag){case 0:if((s&4)!==0&&(s=a.updateQueue,s=s!==null?s.events:null,s!==null))for(t=0;t<s.length;t++)n=s[t],n.ref.impl=n.nextImpl;break;case 11:case 15:break;case 1:if((s&1024)!==0&&l!==null){s=void 0,t=a,n=l.memoizedProps,l=l.memoizedState,e=t.stateNode;try{var A=jt(t.type,n);s=e.getSnapshotBeforeUpdate(A,l),e.__reactInternalSnapshotBeforeUpdate=s}catch(R){ls(t,t.return,R)}}break;case 3:if((s&1024)!==0){if(s=a.stateNode.containerInfo,t=s.nodeType,t===9)Kd(s);else if(t===1)switch(s.nodeName){case"HEAD":case"HTML":case"BODY":Kd(s);break;default:s.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((s&1024)!==0)throw Error(_(163))}if(s=a.sibling,s!==null){s.return=a.return,Ms=s;break}Ms=a.return}}function Wr(s,a,t){var e=t.flags;switch(t.tag){case 0:case 11:case 15:Ga(s,t),e&4&&tn(5,t);break;case 1:if(Ga(s,t),e&4)if(s=t.stateNode,a===null)try{s.componentDidMount()}catch(i){ls(t,t.return,i)}else{var n=jt(t.type,a.memoizedProps);a=a.memoizedState;try{s.componentDidUpdate(n,a,s.__reactInternalSnapshotBeforeUpdate)}catch(i){ls(t,t.return,i)}}e&64&&Xr(t),e&512&&en(t,t.return);break;case 3:if(Ga(s,t),e&64&&(s=t.updateQueue,s!==null)){if(a=null,t.child!==null)switch(t.child.tag){case 27:case 5:a=t.child.stateNode;break;case 1:a=t.child.stateNode}try{Hc(s,a)}catch(i){ls(t,t.return,i)}}break;case 27:a===null&&e&4&&Fr(t);case 26:case 5:Ga(s,t),a===null&&e&4&&Kr(t),e&512&&en(t,t.return);break;case 12:Ga(s,t);break;case 31:Ga(s,t),e&4&&su(s,t);break;case 13:Ga(s,t),e&4&&au(s,t),e&64&&(s=t.memoizedState,s!==null&&(s=s.dehydrated,s!==null&&(t=__.bind(null,t),N_(s,t))));break;case 22:if(e=t.memoizedState!==null||Za,!e){a=a!==null&&a.memoizedState!==null||xs,n=Za;var l=xs;Za=e,(xs=a)&&!l?Xa(s,t,(t.subtreeFlags&8772)!==0):Ga(s,t),Za=n,xs=l}break;case 30:break;default:Ga(s,t)}}function $r(s){var a=s.alternate;a!==null&&(s.alternate=null,$r(a)),s.child=null,s.deletions=null,s.sibling=null,s.tag===5&&(a=s.stateNode,a!==null&&$l(a)),s.stateNode=null,s.return=null,s.dependencies=null,s.memoizedProps=null,s.memoizedState=null,s.pendingProps=null,s.stateNode=null,s.updateQueue=null}var _s=null,Xs=!1;function Ya(s,a,t){for(t=t.child;t!==null;)Pr(s,a,t),t=t.sibling}function Pr(s,a,t){if($s&&typeof $s.onCommitFiberUnmount=="function")try{$s.onCommitFiberUnmount(Be,t)}catch{}switch(t.tag){case 26:xs||Ba(t,a),Ya(s,a,t),t.memoizedState?t.memoizedState.count--:t.stateNode&&(t=t.stateNode,t.parentNode.removeChild(t));break;case 27:xs||Ba(t,a);var e=_s,n=Xs;ht(t.type)&&(_s=t.stateNode,Xs=!1),Ya(s,a,t),pn(t.stateNode),_s=e,Xs=n;break;case 5:xs||Ba(t,a);case 6:if(e=_s,n=Xs,_s=null,Ya(s,a,t),_s=e,Xs=n,_s!==null)if(Xs)try{(_s.nodeType===9?_s.body:_s.nodeName==="HTML"?_s.ownerDocument.body:_s).removeChild(t.stateNode)}catch(l){ls(t,a,l)}else try{_s.removeChild(t.stateNode)}catch(l){ls(t,a,l)}break;case 18:_s!==null&&(Xs?(s=_s,Xu(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,t.stateNode),Se(s)):Xu(_s,t.stateNode));break;case 4:e=_s,n=Xs,_s=t.stateNode.containerInfo,Xs=!0,Ya(s,a,t),_s=e,Xs=n;break;case 0:case 11:case 14:case 15:ot(2,t,a),xs||ot(4,t,a),Ya(s,a,t);break;case 1:xs||(Ba(t,a),e=t.stateNode,typeof e.componentWillUnmount=="function"&&Qr(t,a,e)),Ya(s,a,t);break;case 21:Ya(s,a,t);break;case 22:xs=(e=xs)||t.memoizedState!==null,Ya(s,a,t),xs=e;break;default:Ya(s,a,t)}}function su(s,a){if(a.memoizedState===null&&(s=a.alternate,s!==null&&(s=s.memoizedState,s!==null))){s=s.dehydrated;try{Se(s)}catch(t){ls(a,a.return,t)}}}function au(s,a){if(a.memoizedState===null&&(s=a.alternate,s!==null&&(s=s.memoizedState,s!==null&&(s=s.dehydrated,s!==null))))try{Se(s)}catch(t){ls(a,a.return,t)}}function i_(s){switch(s.tag){case 31:case 13:case 19:var a=s.stateNode;return a===null&&(a=s.stateNode=new Ir),a;case 22:return s=s.stateNode,a=s._retryCache,a===null&&(a=s._retryCache=new Ir),a;default:throw Error(_(435,s.tag))}}function _l(s,a){var t=i_(s);a.forEach(function(e){if(!t.has(e)){t.add(e);var n=h_.bind(null,s,e);e.then(n,n)}})}function Qs(s,a){var t=a.deletions;if(t!==null)for(var e=0;e<t.length;e++){var n=t[e],l=s,i=a,d=i;s:for(;d!==null;){switch(d.tag){case 27:if(ht(d.type)){_s=d.stateNode,Xs=!1;break s}break;case 5:_s=d.stateNode,Xs=!1;break s;case 3:case 4:_s=d.stateNode.containerInfo,Xs=!0;break s}d=d.return}if(_s===null)throw Error(_(160));Pr(l,i,n),_s=null,Xs=!1,l=n.alternate,l!==null&&(l.return=null),n.return=null}if(a.subtreeFlags&13886)for(a=a.child;a!==null;)tu(a,s),a=a.sibling}var ma=null;function tu(s,a){var t=s.alternate,e=s.flags;switch(s.tag){case 0:case 11:case 14:case 15:Qs(a,s),Ks(s),e&4&&(ot(3,s,s.return),tn(3,s),ot(5,s,s.return));break;case 1:Qs(a,s),Ks(s),e&512&&(xs||t===null||Ba(t,t.return)),e&64&&Za&&(s=s.updateQueue,s!==null&&(e=s.callbacks,e!==null&&(t=s.shared.hiddenCallbacks,s.shared.hiddenCallbacks=t===null?e:t.concat(e))));break;case 26:var n=ma;if(Qs(a,s),Ks(s),e&512&&(xs||t===null||Ba(t,t.return)),e&4){var l=t!==null?t.memoizedState:null;if(e=s.memoizedState,t===null)if(e===null)if(s.stateNode===null){s:{e=s.type,t=s.memoizedProps,n=n.ownerDocument||n;a:switch(e){case"title":l=n.getElementsByTagName("title")[0],(!l||l[Le]||l[Bs]||l.namespaceURI==="http://www.w3.org/2000/svg"||l.hasAttribute("itemprop"))&&(l=n.createElement(e),n.head.insertBefore(l,n.querySelector("head > title"))),As(l,e,t),l[Bs]=s,Ss(l),e=l;break s;case"link":var i=tv("link","href",n).get(e+(t.href||""));if(i){for(var d=0;d<i.length;d++)if(l=i[d],l.getAttribute("href")===(t.href==null||t.href===""?null:t.href)&&l.getAttribute("rel")===(t.rel==null?null:t.rel)&&l.getAttribute("title")===(t.title==null?null:t.title)&&l.getAttribute("crossorigin")===(t.crossOrigin==null?null:t.crossOrigin)){i.splice(d,1);break a}}l=n.createElement(e),As(l,e,t),n.head.appendChild(l);break;case"meta":if(i=tv("meta","content",n).get(e+(t.content||""))){for(d=0;d<i.length;d++)if(l=i[d],l.getAttribute("content")===(t.content==null?null:""+t.content)&&l.getAttribute("name")===(t.name==null?null:t.name)&&l.getAttribute("property")===(t.property==null?null:t.property)&&l.getAttribute("http-equiv")===(t.httpEquiv==null?null:t.httpEquiv)&&l.getAttribute("charset")===(t.charSet==null?null:t.charSet)){i.splice(d,1);break a}}l=n.createElement(e),As(l,e,t),n.head.appendChild(l);break;default:throw Error(_(468,e))}l[Bs]=s,Ss(l),e=l}s.stateNode=e}else ev(n,s.type,s.stateNode);else s.stateNode=av(n,e,s.memoizedProps);else l!==e?(l===null?t.stateNode!==null&&(t=t.stateNode,t.parentNode.removeChild(t)):l.count--,e===null?ev(n,s.type,s.stateNode):av(n,e,s.memoizedProps)):e===null&&s.stateNode!==null&&wd(s,s.memoizedProps,t.memoizedProps)}break;case 27:Qs(a,s),Ks(s),e&512&&(xs||t===null||Ba(t,t.return)),t!==null&&e&4&&wd(s,s.memoizedProps,t.memoizedProps);break;case 5:if(Qs(a,s),Ks(s),e&512&&(xs||t===null||Ba(t,t.return)),s.flags&32){n=s.stateNode;try{Jt(n,"")}catch(A){ls(s,s.return,A)}}e&4&&s.stateNode!=null&&(n=s.memoizedProps,wd(s,n,t!==null?t.memoizedProps:n)),e&1024&&(yd=!0);break;case 6:if(Qs(a,s),Ks(s),e&4){if(s.stateNode===null)throw Error(_(162));e=s.memoizedProps,t=s.stateNode;try{t.nodeValue=e}catch(A){ls(s,s.return,A)}}break;case 3:if(Ll=null,n=ma,ma=Dl(a.containerInfo),Qs(a,s),ma=n,Ks(s),e&4&&t!==null&&t.memoizedState.isDehydrated)try{Se(a.containerInfo)}catch(A){ls(s,s.return,A)}yd&&(yd=!1,eu(s));break;case 4:e=ma,ma=Dl(s.stateNode.containerInfo),Qs(a,s),Ks(s),ma=e;break;case 12:Qs(a,s),Ks(s);break;case 31:Qs(a,s),Ks(s),e&4&&(e=s.updateQueue,e!==null&&(s.updateQueue=null,_l(s,e)));break;case 13:Qs(a,s),Ks(s),s.child.flags&8192&&s.memoizedState!==null!=(t!==null&&t.memoizedState!==null)&&(fl=Ws()),e&4&&(e=s.updateQueue,e!==null&&(s.updateQueue=null,_l(s,e)));break;case 22:n=s.memoizedState!==null;var o=t!==null&&t.memoizedState!==null,f=Za,w=xs;if(Za=f||n,xs=w||o,Qs(a,s),xs=w,Za=f,Ks(s),e&8192)s:for(a=s.stateNode,a._visibility=n?a._visibility&-2:a._visibility|1,n&&(t===null||o||Za||xs||Ut(s)),t=null,a=s;;){if(a.tag===5||a.tag===26){if(t===null){o=t=a;try{if(l=o.stateNode,n)i=l.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none";else{d=o.stateNode;var y=o.memoizedProps.style,b=y!=null&&y.hasOwnProperty("display")?y.display:null;d.style.display=b==null||typeof b=="boolean"?"":(""+b).trim()}}catch(A){ls(o,o.return,A)}}}else if(a.tag===6){if(t===null){o=a;try{o.stateNode.nodeValue=n?"":o.memoizedProps}catch(A){ls(o,o.return,A)}}}else if(a.tag===18){if(t===null){o=a;try{var g=o.stateNode;n?Qu(g,!0):Qu(o.stateNode,!1)}catch(A){ls(o,o.return,A)}}}else if((a.tag!==22&&a.tag!==23||a.memoizedState===null||a===s)&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===s)break s;for(;a.sibling===null;){if(a.return===null||a.return===s)break s;t===a&&(t=null),a=a.return}t===a&&(t=null),a.sibling.return=a.return,a=a.sibling}e&4&&(e=s.updateQueue,e!==null&&(t=e.retryQueue,t!==null&&(e.retryQueue=null,_l(s,t))));break;case 19:Qs(a,s),Ks(s),e&4&&(e=s.updateQueue,e!==null&&(s.updateQueue=null,_l(s,e)));break;case 30:break;case 21:break;default:Qs(a,s),Ks(s)}}function Ks(s){var a=s.flags;if(a&2){try{for(var t,e=s.return;e!==null;){if(Jr(e)){t=e;break}e=e.return}if(t==null)throw Error(_(160));switch(t.tag){case 27:var n=t.stateNode,l=md(s);pl(s,l,n);break;case 5:var i=t.stateNode;t.flags&32&&(Jt(i,""),t.flags&=-33);var d=md(s);pl(s,d,i);break;case 3:case 4:var o=t.stateNode.containerInfo,f=md(s);kd(s,f,o);break;default:throw Error(_(161))}}catch(w){ls(s,s.return,w)}s.flags&=-3}a&4096&&(s.flags&=-4097)}function eu(s){if(s.subtreeFlags&1024)for(s=s.child;s!==null;){var a=s;eu(a),a.tag===5&&a.flags&1024&&a.stateNode.reset(),s=s.sibling}}function Ga(s,a){if(a.subtreeFlags&8772)for(a=a.child;a!==null;)Wr(s,a.alternate,a),a=a.sibling}function Ut(s){for(s=s.child;s!==null;){var a=s;switch(a.tag){case 0:case 11:case 14:case 15:ot(4,a,a.return),Ut(a);break;case 1:Ba(a,a.return);var t=a.stateNode;typeof t.componentWillUnmount=="function"&&Qr(a,a.return,t),Ut(a);break;case 27:pn(a.stateNode);case 26:case 5:Ba(a,a.return),Ut(a);break;case 22:a.memoizedState===null&&Ut(a);break;case 30:Ut(a);break;default:Ut(a)}s=s.sibling}}function Xa(s,a,t){for(t=t&&(a.subtreeFlags&8772)!==0,a=a.child;a!==null;){var e=a.alternate,n=s,l=a,i=l.flags;switch(l.tag){case 0:case 11:case 15:Xa(n,l,t),tn(4,l);break;case 1:if(Xa(n,l,t),e=l,n=e.stateNode,typeof n.componentDidMount=="function")try{n.componentDidMount()}catch(f){ls(e,e.return,f)}if(e=l,n=e.updateQueue,n!==null){var d=e.stateNode;try{var o=n.shared.hiddenCallbacks;if(o!==null)for(n.shared.hiddenCallbacks=null,n=0;n<o.length;n++)Nc(o[n],d)}catch(f){ls(e,e.return,f)}}t&&i&64&&Xr(l),en(l,l.return);break;case 27:Fr(l);case 26:case 5:Xa(n,l,t),t&&e===null&&i&4&&Kr(l),en(l,l.return);break;case 12:Xa(n,l,t);break;case 31:Xa(n,l,t),t&&i&4&&su(n,l);break;case 13:Xa(n,l,t),t&&i&4&&au(n,l);break;case 22:l.memoizedState===null&&Xa(n,l,t),en(l,l.return);break;case 30:break;default:Xa(n,l,t)}a=a.sibling}}function xd(s,a){var t=null;s!==null&&s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(t=s.memoizedState.cachePool.pool),s=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(s=a.memoizedState.cachePool.pool),s!==t&&(s!=null&&s.refCount++,t!=null&&Ye(t))}function Cd(s,a){s=null,a.alternate!==null&&(s=a.alternate.memoizedState.cache),a=a.memoizedState.cache,a!==s&&(a.refCount++,s!=null&&Ye(s))}function ka(s,a,t,e){if(a.subtreeFlags&10256)for(a=a.child;a!==null;)nu(s,a,t,e),a=a.sibling}function nu(s,a,t,e){var n=a.flags;switch(a.tag){case 0:case 11:case 15:ka(s,a,t,e),n&2048&&tn(9,a);break;case 1:ka(s,a,t,e);break;case 3:ka(s,a,t,e),n&2048&&(s=null,a.alternate!==null&&(s=a.alternate.memoizedState.cache),a=a.memoizedState.cache,a!==s&&(a.refCount++,s!=null&&Ye(s)));break;case 12:if(n&2048){ka(s,a,t,e),s=a.stateNode;try{var l=a.memoizedProps,i=l.id,d=l.onPostCommit;typeof d=="function"&&d(i,a.alternate===null?"mount":"update",s.passiveEffectDuration,-0)}catch(o){ls(a,a.return,o)}}else ka(s,a,t,e);break;case 31:ka(s,a,t,e);break;case 13:ka(s,a,t,e);break;case 23:break;case 22:l=a.stateNode,i=a.alternate,a.memoizedState!==null?l._visibility&2?ka(s,a,t,e):nn(s,a):l._visibility&2?ka(s,a,t,e):(l._visibility|=2,_e(s,a,t,e,(a.subtreeFlags&10256)!==0||!1)),n&2048&&xd(i,a);break;case 24:ka(s,a,t,e),n&2048&&Cd(a.alternate,a);break;default:ka(s,a,t,e)}}function _e(s,a,t,e,n){for(n=n&&((a.subtreeFlags&10256)!==0||!1),a=a.child;a!==null;){var l=s,i=a,d=t,o=e,f=i.flags;switch(i.tag){case 0:case 11:case 15:_e(l,i,d,o,n),tn(8,i);break;case 23:break;case 22:var w=i.stateNode;i.memoizedState!==null?w._visibility&2?_e(l,i,d,o,n):nn(l,i):(w._visibility|=2,_e(l,i,d,o,n)),n&&f&2048&&xd(i.alternate,i);break;case 24:_e(l,i,d,o,n),n&&f&2048&&Cd(i.alternate,i);break;default:_e(l,i,d,o,n)}a=a.sibling}}function nn(s,a){if(a.subtreeFlags&10256)for(a=a.child;a!==null;){var t=s,e=a,n=e.flags;switch(e.tag){case 22:nn(t,e),n&2048&&xd(e.alternate,e);break;case 24:nn(t,e),n&2048&&Cd(e.alternate,e);break;default:nn(t,e)}a=a.sibling}}var ln=8192;function he(s,a,t){if(s.subtreeFlags&ln)for(s=s.child;s!==null;)lu(s,a,t),s=s.sibling}function lu(s,a,t){switch(s.tag){case 26:he(s,a,t),s.flags&ln&&s.memoizedState!==null&&Q_(t,ma,s.memoizedState,s.memoizedProps);break;case 5:he(s,a,t);break;case 3:case 4:var e=ma;ma=Dl(s.stateNode.containerInfo),he(s,a,t),ma=e;break;case 22:s.memoizedState===null&&(e=s.alternate,e!==null&&e.memoizedState!==null?(e=ln,ln=16777216,he(s,a,t),ln=e):he(s,a,t));break;default:he(s,a,t)}}function iu(s){var a=s.alternate;if(a!==null&&(s=a.child,s!==null)){a.child=null;do a=s.sibling,s.sibling=null,s=a;while(s!==null)}}function dn(s){var a=s.deletions;if((s.flags&16)!==0){if(a!==null)for(var t=0;t<a.length;t++){var e=a[t];Ms=e,ou(e,s)}iu(s)}if(s.subtreeFlags&10256)for(s=s.child;s!==null;)du(s),s=s.sibling}function du(s){switch(s.tag){case 0:case 11:case 15:dn(s),s.flags&2048&&ot(9,s,s.return);break;case 3:dn(s);break;case 12:dn(s);break;case 22:var a=s.stateNode;s.memoizedState!==null&&a._visibility&2&&(s.return===null||s.return.tag!==13)?(a._visibility&=-3,hl(s)):dn(s);break;default:dn(s)}}function hl(s){var a=s.deletions;if((s.flags&16)!==0){if(a!==null)for(var t=0;t<a.length;t++){var e=a[t];Ms=e,ou(e,s)}iu(s)}for(s=s.child;s!==null;){switch(a=s,a.tag){case 0:case 11:case 15:ot(8,a,a.return),hl(a);break;case 22:t=a.stateNode,t._visibility&2&&(t._visibility&=-3,hl(a));break;default:hl(a)}s=s.sibling}}function ou(s,a){for(;Ms!==null;){var t=Ms;switch(t.tag){case 0:case 11:case 15:ot(8,t,a);break;case 23:case 22:if(t.memoizedState!==null&&t.memoizedState.cachePool!==null){var e=t.memoizedState.cachePool.pool;e!=null&&e.refCount++}break;case 24:Ye(t.memoizedState.cache)}if(e=t.child,e!==null)e.return=t,Ms=e;else s:for(t=s;Ms!==null;){e=Ms;var n=e.sibling,l=e.return;if($r(e),e===t){Ms=null;break s}if(n!==null){n.return=l,Ms=n;break s}Ms=l}}}var d_={getCacheForType:function(s){var a=Ts(ms),t=a.data.get(s);return t===void 0&&(t=s(),a.data.set(s,t)),t},cacheSignal:function(){return Ts(ms).controller.signal}},o_=typeof WeakMap=="function"?WeakMap:Map,ts=0,us=null,K=null,F=0,ns=0,na=null,ct=!1,fe=!1,Sd=!1,Qa=0,fs=0,rt=0,Rt=0,Md=0,la=0,be=0,on=null,Js=null,Bd=!1,fl=0,cu=0,bl=1/0,gl=null,ut=null,Cs=0,vt=null,ge=null,Ka=0,Dd=0,Td=null,ru=null,cn=0,Ld=null;function ia(){return(ts&2)!==0&&F!==0?F&-F:m.T!==null?Od():Mo()}function uu(){if(la===0)if((F&536870912)===0||$){var s=Mn;Mn<<=1,(Mn&3932160)===0&&(Mn=262144),la=s}else la=536870912;return s=ta.current,s!==null&&(s.flags|=32),la}function Fs(s,a,t){(s===us&&(ns===2||ns===9)||s.cancelPendingCommit!==null)&&(we(s,0),pt(s,F,la,!1)),Te(s,t),((ts&2)===0||s!==us)&&(s===us&&((ts&2)===0&&(Rt|=t),fs===4&&pt(s,F,la,!1)),Da(s))}function vu(s,a,t){if((ts&6)!==0)throw Error(_(327));var e=!t&&(a&127)===0&&(a&s.expiredLanes)===0||De(s,a),n=e?u_(s,a):Ed(s,a,!0),l=e;do{if(n===0){fe&&!e&&pt(s,a,0,!1);break}else{if(t=s.current.alternate,l&&!c_(t)){n=Ed(s,a,!1),l=!1;continue}if(n===2){if(l=a,s.errorRecoveryDisabledLanes&l)var i=0;else i=s.pendingLanes&-536870913,i=i!==0?i:i&536870912?536870912:0;if(i!==0){a=i;s:{var d=s;n=on;var o=d.current.memoizedState.isDehydrated;if(o&&(we(d,i).flags|=256),i=Ed(d,i,!1),i!==2){if(Sd&&!o){d.errorRecoveryDisabledLanes|=l,Rt|=l,n=4;break s}l=Js,Js=n,l!==null&&(Js===null?Js=l:Js.push.apply(Js,l))}n=i}if(l=!1,n!==2)continue}}if(n===1){we(s,0),pt(s,a,0,!0);break}s:{switch(e=s,l=n,l){case 0:case 1:throw Error(_(345));case 4:if((a&4194048)!==a)break;case 6:pt(e,a,la,!ct);break s;case 2:Js=null;break;case 3:case 5:break;default:throw Error(_(329))}if((a&62914560)===a&&(n=fl+300-Ws(),10<n)){if(pt(e,a,la,!ct),Dn(e,0,!0)!==0)break s;Ka=a,e.timeoutHandle=Yu(pu.bind(null,e,t,Js,gl,Bd,a,la,Rt,be,ct,l,"Throttled",-0,0),n);break s}pu(e,t,Js,gl,Bd,a,la,Rt,be,ct,l,null,-0,0)}}break}while(!0);Da(s)}function pu(s,a,t,e,n,l,i,d,o,f,w,y,b,g){if(s.timeoutHandle=-1,y=a.subtreeFlags,y&8192||(y&16785408)===16785408){y={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ea},lu(a,l,y);var A=(l&62914560)===l?fl-Ws():(l&4194048)===l?cu-Ws():0;if(A=K_(y,A),A!==null){Ka=l,s.cancelPendingCommit=A(ku.bind(null,s,a,l,t,e,n,i,d,o,w,y,null,b,g)),pt(s,l,i,!f);return}}ku(s,a,l,t,e,n,i,d,o)}function c_(s){for(var a=s;;){var t=a.tag;if((t===0||t===11||t===15)&&a.flags&16384&&(t=a.updateQueue,t!==null&&(t=t.stores,t!==null)))for(var e=0;e<t.length;e++){var n=t[e],l=n.getSnapshot;n=n.value;try{if(!sa(l(),n))return!1}catch{return!1}}if(t=a.child,a.subtreeFlags&16384&&t!==null)t.return=a,a=t;else{if(a===s)break;for(;a.sibling===null;){if(a.return===null||a.return===s)return!0;a=a.return}a.sibling.return=a.return,a=a.sibling}}return!0}function pt(s,a,t,e){a&=~Md,a&=~Rt,s.suspendedLanes|=a,s.pingedLanes&=~a,e&&(s.warmLanes|=a),e=s.expirationTimes;for(var n=a;0<n;){var l=31-Ps(n),i=1<<l;e[l]=-1,n&=~i}t!==0&&xo(s,t,a)}function wl(){return(ts&6)===0?(rn(0),!1):!0}function Ad(){if(K!==null){if(ns===0)var s=K.return;else s=K,Oa=At=null,Ki(s),ce=null,Xe=0,s=K;for(;s!==null;)Gr(s.alternate,s),s=s.return;K=null}}function we(s,a){var t=s.timeoutHandle;t!==-1&&(s.timeoutHandle=-1,T_(t)),t=s.cancelPendingCommit,t!==null&&(s.cancelPendingCommit=null,t()),Ka=0,Ad(),us=s,K=t=Na(s.current,null),F=a,ns=0,na=null,ct=!1,fe=De(s,a),Sd=!1,be=la=Md=Rt=rt=fs=0,Js=on=null,Bd=!1,(a&8)!==0&&(a|=a&32);var e=s.entangledLanes;if(e!==0)for(s=s.entanglements,e&=a;0<e;){var n=31-Ps(e),l=1<<n;a|=s[n],e&=~l}return Qa=a,Rn(),t}function _u(s,a){G=null,m.H=Pe,a===oe||a===Jn?(a=Lc(),ns=3):a===Hi?(a=Lc(),ns=4):ns=a===cd?8:a!==null&&typeof a=="object"&&typeof a.then=="function"?6:1,na=a,K===null&&(fs=1,ol(s,ua(a,s.current)))}function hu(){var s=ta.current;return s===null?!0:(F&4194048)===F?ha===null:(F&62914560)===F||(F&536870912)!==0?s===ha:!1}function fu(){var s=m.H;return m.H=Pe,s===null?Pe:s}function bu(){var s=m.A;return m.A=d_,s}function ml(){fs=4,ct||(F&4194048)!==F&&ta.current!==null||(fe=!0),(rt&134217727)===0&&(Rt&134217727)===0||us===null||pt(us,F,la,!1)}function Ed(s,a,t){var e=ts;ts|=2;var n=fu(),l=bu();(us!==s||F!==a)&&(gl=null,we(s,a)),a=!1;var i=fs;s:do try{if(ns!==0&&K!==null){var d=K,o=na;switch(ns){case 8:Ad(),i=6;break s;case 3:case 2:case 9:case 6:ta.current===null&&(a=!0);var f=ns;if(ns=0,na=null,me(s,d,o,f),t&&fe){i=0;break s}break;default:f=ns,ns=0,na=null,me(s,d,o,f)}}r_(),i=fs;break}catch(w){_u(s,w)}while(!0);return a&&s.shellSuspendCounter++,Oa=At=null,ts=e,m.H=n,m.A=l,K===null&&(us=null,F=0,Rn()),i}function r_(){for(;K!==null;)gu(K)}function u_(s,a){var t=ts;ts|=2;var e=fu(),n=bu();us!==s||F!==a?(gl=null,bl=Ws()+500,we(s,a)):fe=De(s,a);s:do try{if(ns!==0&&K!==null){a=K;var l=na;a:switch(ns){case 1:ns=0,na=null,me(s,a,l,1);break;case 2:case 9:if(Dc(l)){ns=0,na=null,wu(a);break}a=function(){ns!==2&&ns!==9||us!==s||(ns=7),Da(s)},l.then(a,a);break s;case 3:ns=7;break s;case 4:ns=5;break s;case 7:Dc(l)?(ns=0,na=null,wu(a)):(ns=0,na=null,me(s,a,l,7));break;case 5:var i=null;switch(K.tag){case 26:i=K.memoizedState;case 5:case 27:var d=K;if(i?nv(i):d.stateNode.complete){ns=0,na=null;var o=d.sibling;if(o!==null)K=o;else{var f=d.return;f!==null?(K=f,kl(f)):K=null}break a}}ns=0,na=null,me(s,a,l,5);break;case 6:ns=0,na=null,me(s,a,l,6);break;case 8:Ad(),fs=6;break s;default:throw Error(_(462))}}v_();break}catch(w){_u(s,w)}while(!0);return Oa=At=null,m.H=e,m.A=n,ts=t,K!==null?0:(us=null,F=0,Rn(),fs)}function v_(){for(;K!==null&&!Hv();)gu(K)}function gu(s){var a=Zr(s.alternate,s,Qa);s.memoizedProps=s.pendingProps,a===null?kl(s):K=a}function wu(s){var a=s,t=a.alternate;switch(a.tag){case 15:case 0:a=Or(t,a,a.pendingProps,a.type,void 0,F);break;case 11:a=Or(t,a,a.pendingProps,a.type.render,a.ref,F);break;case 5:Ki(a);default:Gr(t,a),a=K=bc(a,Qa),a=Zr(t,a,Qa)}s.memoizedProps=s.pendingProps,a===null?kl(s):K=a}function me(s,a,t,e){Oa=At=null,Ki(a),ce=null,Xe=0;var n=a.return;try{if(s_(s,n,a,t,F)){fs=1,ol(s,ua(t,s.current)),K=null;return}}catch(l){if(n!==null)throw K=n,l;fs=1,ol(s,ua(t,s.current)),K=null;return}a.flags&32768?($||e===1?s=!0:fe||(F&536870912)!==0?s=!1:(ct=s=!0,(e===2||e===9||e===3||e===6)&&(e=ta.current,e!==null&&e.tag===13&&(e.flags|=16384))),mu(a,s)):kl(a)}function kl(s){var a=s;do{if((a.flags&32768)!==0){mu(a,ct);return}s=a.return;var t=e_(a.alternate,a,Qa);if(t!==null){K=t;return}if(a=a.sibling,a!==null){K=a;return}K=a=s}while(a!==null);fs===0&&(fs=5)}function mu(s,a){do{var t=n_(s.alternate,s);if(t!==null){t.flags&=32767,K=t;return}if(t=s.return,t!==null&&(t.flags|=32768,t.subtreeFlags=0,t.deletions=null),!a&&(s=s.sibling,s!==null)){K=s;return}K=s=t}while(s!==null);fs=6,K=null}function ku(s,a,t,e,n,l,i,d,o){s.cancelPendingCommit=null;do yl();while(Cs!==0);if((ts&6)!==0)throw Error(_(327));if(a!==null){if(a===s.current)throw Error(_(177));if(l=a.lanes|a.childLanes,l|=mi,Xv(s,t,l,i,d,o),s===us&&(K=us=null,F=0),ge=a,vt=s,Ka=t,Dd=l,Td=n,ru=e,(a.subtreeFlags&10256)!==0||(a.flags&10256)!==0?(s.callbackNode=null,s.callbackPriority=0,f_(Cn,function(){return Mu(),null})):(s.callbackNode=null,s.callbackPriority=0),e=(a.flags&13878)!==0,(a.subtreeFlags&13878)!==0||e){e=m.T,m.T=null,n=B.p,B.p=2,i=ts,ts|=4;try{l_(s,a,t)}finally{ts=i,B.p=n,m.T=e}}Cs=1,yu(),xu(),Cu()}}function yu(){if(Cs===1){Cs=0;var s=vt,a=ge,t=(a.flags&13878)!==0;if((a.subtreeFlags&13878)!==0||t){t=m.T,m.T=null;var e=B.p;B.p=2;var n=ts;ts|=4;try{tu(a,s);var l=Gd,i=oc(s.containerInfo),d=l.focusedElem,o=l.selectionRange;if(i!==d&&d&&d.ownerDocument&&dc(d.ownerDocument.documentElement,d)){if(o!==null&&hi(d)){var f=o.start,w=o.end;if(w===void 0&&(w=f),"selectionStart"in d)d.selectionStart=f,d.selectionEnd=Math.min(w,d.value.length);else{var y=d.ownerDocument||document,b=y&&y.defaultView||window;if(b.getSelection){var g=b.getSelection(),A=d.textContent.length,R=Math.min(o.start,A),cs=o.end===void 0?R:Math.min(o.end,A);!g.extend&&R>cs&&(i=cs,cs=R,R=i);var p=ic(d,R),r=ic(d,cs);if(p&&r&&(g.rangeCount!==1||g.anchorNode!==p.node||g.anchorOffset!==p.offset||g.focusNode!==r.node||g.focusOffset!==r.offset)){var h=y.createRange();h.setStart(p.node,p.offset),g.removeAllRanges(),R>cs?(g.addRange(h),g.extend(r.node,r.offset)):(h.setEnd(r.node,r.offset),g.addRange(h))}}}}for(y=[],g=d;g=g.parentNode;)g.nodeType===1&&y.push({element:g,left:g.scrollLeft,top:g.scrollTop});for(typeof d.focus=="function"&&d.focus(),d=0;d<y.length;d++){var k=y[d];k.element.scrollLeft=k.left,k.element.scrollTop=k.top}}Nl=!!Yd,Gd=Yd=null}finally{ts=n,B.p=e,m.T=t}}s.current=a,Cs=2}}function xu(){if(Cs===2){Cs=0;var s=vt,a=ge,t=(a.flags&8772)!==0;if((a.subtreeFlags&8772)!==0||t){t=m.T,m.T=null;var e=B.p;B.p=2;var n=ts;ts|=4;try{Wr(s,a.alternate,a)}finally{ts=n,B.p=e,m.T=t}}Cs=3}}function Cu(){if(Cs===4||Cs===3){Cs=0,Ov();var s=vt,a=ge,t=Ka,e=ru;(a.subtreeFlags&10256)!==0||(a.flags&10256)!==0?Cs=5:(Cs=0,ge=vt=null,Su(s,s.pendingLanes));var n=s.pendingLanes;if(n===0&&(ut=null),Il(t),a=a.stateNode,$s&&typeof $s.onCommitFiberRoot=="function")try{$s.onCommitFiberRoot(Be,a,void 0,(a.current.flags&128)===128)}catch{}if(e!==null){a=m.T,n=B.p,B.p=2,m.T=null;try{for(var l=s.onRecoverableError,i=0;i<e.length;i++){var d=e[i];l(d.value,{componentStack:d.stack})}}finally{m.T=a,B.p=n}}(Ka&3)!==0&&yl(),Da(s),n=s.pendingLanes,(t&261930)!==0&&(n&42)!==0?s===Ld?cn++:(cn=0,Ld=s):cn=0,rn(0)}}function Su(s,a){(s.pooledCacheLanes&=a)===0&&(a=s.pooledCache,a!=null&&(s.pooledCache=null,Ye(a)))}function yl(){return yu(),xu(),Cu(),Mu()}function Mu(){if(Cs!==5)return!1;var s=vt,a=Dd;Dd=0;var t=Il(Ka),e=m.T,n=B.p;try{B.p=32>t?32:t,m.T=null,t=Td,Td=null;var l=vt,i=Ka;if(Cs=0,ge=vt=null,Ka=0,(ts&6)!==0)throw Error(_(331));var d=ts;if(ts|=4,du(l.current),nu(l,l.current,i,t),ts=d,rn(0,!1),$s&&typeof $s.onPostCommitFiberRoot=="function")try{$s.onPostCommitFiberRoot(Be,l)}catch{}return!0}finally{B.p=n,m.T=e,Su(s,a)}}function Bu(s,a,t){a=ua(t,a),a=od(s.stateNode,a,2),s=lt(s,a,2),s!==null&&(Te(s,2),Da(s))}function ls(s,a,t){if(s.tag===3)Bu(s,s,t);else for(;a!==null;){if(a.tag===3){Bu(a,s,t);break}else if(a.tag===1){var e=a.stateNode;if(typeof a.type.getDerivedStateFromError=="function"||typeof e.componentDidCatch=="function"&&(ut===null||!ut.has(e))){s=ua(t,s),t=Dr(2),e=lt(a,t,2),e!==null&&(Tr(t,e,a,s),Te(e,2),Da(e));break}}a=a.return}}function zd(s,a,t){var e=s.pingCache;if(e===null){e=s.pingCache=new o_;var n=new Set;e.set(a,n)}else n=e.get(a),n===void 0&&(n=new Set,e.set(a,n));n.has(t)||(Sd=!0,n.add(t),s=p_.bind(null,s,a,t),a.then(s,s))}function p_(s,a,t){var e=s.pingCache;e!==null&&e.delete(a),s.pingedLanes|=s.suspendedLanes&t,s.warmLanes&=~t,us===s&&(F&t)===t&&(fs===4||fs===3&&(F&62914560)===F&&300>Ws()-fl?(ts&2)===0&&we(s,0):Md|=t,be===F&&(be=0)),Da(s)}function Du(s,a){a===0&&(a=yo()),s=Dt(s,a),s!==null&&(Te(s,a),Da(s))}function __(s){var a=s.memoizedState,t=0;a!==null&&(t=a.retryLane),Du(s,t)}function h_(s,a){var t=0;switch(s.tag){case 31:case 13:var e=s.stateNode,n=s.memoizedState;n!==null&&(t=n.retryLane);break;case 19:e=s.stateNode;break;case 22:e=s.stateNode._retryCache;break;default:throw Error(_(314))}e!==null&&e.delete(a),Du(s,t)}function f_(s,a){return Ql(s,a)}var xl=null,ke=null,Nd=!1,Cl=!1,Hd=!1,_t=0;function Da(s){s!==ke&&s.next===null&&(ke===null?xl=ke=s:ke=ke.next=s),Cl=!0,Nd||(Nd=!0,g_())}function rn(s,a){if(!Hd&&Cl){Hd=!0;do for(var t=!1,e=xl;e!==null;){if(s!==0){var n=e.pendingLanes;if(n===0)var l=0;else{var i=e.suspendedLanes,d=e.pingedLanes;l=(1<<31-Ps(42|s)+1)-1,l&=n&~(i&~d),l=l&201326741?l&201326741|1:l?l|2:0}l!==0&&(t=!0,Eu(e,l))}else l=F,l=Dn(e,e===us?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),(l&3)===0||De(e,l)||(t=!0,Eu(e,l));e=e.next}while(t);Hd=!1}}function b_(){Tu()}function Tu(){Cl=Nd=!1;var s=0;_t!==0&&D_()&&(s=_t);for(var a=Ws(),t=null,e=xl;e!==null;){var n=e.next,l=Lu(e,a);l===0?(e.next=null,t===null?xl=n:t.next=n,n===null&&(ke=t)):(t=e,(s!==0||(l&3)!==0)&&(Cl=!0)),e=n}Cs!==0&&Cs!==5||rn(s),_t!==0&&(_t=0)}function Lu(s,a){for(var t=s.suspendedLanes,e=s.pingedLanes,n=s.expirationTimes,l=s.pendingLanes&-62914561;0<l;){var i=31-Ps(l),d=1<<i,o=n[i];o===-1?((d&t)===0||(d&e)!==0)&&(n[i]=Gv(d,a)):o<=a&&(s.expiredLanes|=d),l&=~d}if(a=us,t=F,t=Dn(s,s===a?t:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),e=s.callbackNode,t===0||s===a&&(ns===2||ns===9)||s.cancelPendingCommit!==null)return e!==null&&e!==null&&Kl(e),s.callbackNode=null,s.callbackPriority=0;if((t&3)===0||De(s,t)){if(a=t&-t,a===s.callbackPriority)return a;switch(e!==null&&Kl(e),Il(t)){case 2:case 8:t=mo;break;case 32:t=Cn;break;case 268435456:t=ko;break;default:t=Cn}return e=Au.bind(null,s),t=Ql(t,e),s.callbackPriority=a,s.callbackNode=t,a}return e!==null&&e!==null&&Kl(e),s.callbackPriority=2,s.callbackNode=null,2}function Au(s,a){if(Cs!==0&&Cs!==5)return s.callbackNode=null,s.callbackPriority=0,null;var t=s.callbackNode;if(yl()&&s.callbackNode!==t)return null;var e=F;return e=Dn(s,s===us?e:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),e===0?null:(vu(s,e,a),Lu(s,Ws()),s.callbackNode!=null&&s.callbackNode===t?Au.bind(null,s):null)}function Eu(s,a){if(yl())return null;vu(s,a,!0)}function g_(){L_(function(){(ts&6)!==0?Ql(wo,b_):Tu()})}function Od(){if(_t===0){var s=ie;s===0&&(s=Sn,Sn<<=1,(Sn&261888)===0&&(Sn=256)),_t=s}return _t}function zu(s){return s==null||typeof s=="symbol"||typeof s=="boolean"?null:typeof s=="function"?s:En(""+s)}function Nu(s,a){var t=a.ownerDocument.createElement("input");return t.name=a.name,t.value=a.value,s.id&&t.setAttribute("form",s.id),a.parentNode.insertBefore(t,a),s=new FormData(s),t.parentNode.removeChild(t),s}function w_(s,a,t,e,n){if(a==="submit"&&t&&t.stateNode===n){var l=zu((n[Ys]||null).action),i=e.submitter;i&&(a=(a=i[Ys]||null)?zu(a.formAction):i.getAttribute("formAction"),a!==null&&(l=a,i=null));var d=new On("action","action",null,e,n);s.push({event:d,listeners:[{instance:null,listener:function(){if(e.defaultPrevented){if(_t!==0){var o=i?Nu(n,i):new FormData(n);td(t,{pending:!0,data:o,method:n.method,action:l},null,o)}}else typeof l=="function"&&(d.preventDefault(),o=i?Nu(n,i):new FormData(n),td(t,{pending:!0,data:o,method:n.method,action:l},l,o))},currentTarget:n}]})}}for(var Vd=0;Vd<wi.length;Vd++){var jd=wi[Vd],m_=jd.toLowerCase(),k_=jd[0].toUpperCase()+jd.slice(1);wa(m_,"on"+k_)}wa(uc,"onAnimationEnd"),wa(vc,"onAnimationIteration"),wa(pc,"onAnimationStart"),wa("dblclick","onDoubleClick"),wa("focusin","onFocus"),wa("focusout","onBlur"),wa(Vp,"onTransitionRun"),wa(jp,"onTransitionStart"),wa(Up,"onTransitionCancel"),wa(_c,"onTransitionEnd"),Qt("onMouseEnter",["mouseout","mouseover"]),Qt("onMouseLeave",["mouseout","mouseover"]),Qt("onPointerEnter",["pointerout","pointerover"]),Qt("onPointerLeave",["pointerout","pointerover"]),Ct("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ct("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ct("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ct("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ct("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ct("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var un="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),y_=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(un));function Hu(s,a){a=(a&4)!==0;for(var t=0;t<s.length;t++){var e=s[t],n=e.event;e=e.listeners;s:{var l=void 0;if(a)for(var i=e.length-1;0<=i;i--){var d=e[i],o=d.instance,f=d.currentTarget;if(d=d.listener,o!==l&&n.isPropagationStopped())break s;l=d,n.currentTarget=f;try{l(n)}catch(w){Un(w)}n.currentTarget=null,l=o}else for(i=0;i<e.length;i++){if(d=e[i],o=d.instance,f=d.currentTarget,d=d.listener,o!==l&&n.isPropagationStopped())break s;l=d,n.currentTarget=f;try{l(n)}catch(w){Un(w)}n.currentTarget=null,l=o}}}}function J(s,a){var t=a[Wl];t===void 0&&(t=a[Wl]=new Set);var e=s+"__bubble";t.has(e)||(Ou(a,s,2,!1),t.add(e))}function Ud(s,a,t){var e=0;a&&(e|=4),Ou(t,s,e,a)}var Sl="_reactListening"+Math.random().toString(36).slice(2);function Rd(s){if(!s[Sl]){s[Sl]=!0,To.forEach(function(t){t!=="selectionchange"&&(y_.has(t)||Ud(t,!1,s),Ud(t,!0,s))});var a=s.nodeType===9?s:s.ownerDocument;a===null||a[Sl]||(a[Sl]=!0,Ud("selectionchange",!1,a))}}function Ou(s,a,t,e){switch(uv(a)){case 2:var n=I_;break;case 8:n=W_;break;default:n=ao}t=n.bind(null,a,t,s),n=void 0,!ii||a!=="touchstart"&&a!=="touchmove"&&a!=="wheel"||(n=!0),e?n!==void 0?s.addEventListener(a,t,{capture:!0,passive:n}):s.addEventListener(a,t,!0):n!==void 0?s.addEventListener(a,t,{passive:n}):s.addEventListener(a,t,!1)}function qd(s,a,t,e,n){var l=e;if((a&1)===0&&(a&2)===0&&e!==null)s:for(;;){if(e===null)return;var i=e.tag;if(i===3||i===4){var d=e.stateNode.containerInfo;if(d===n)break;if(i===4)for(i=e.return;i!==null;){var o=i.tag;if((o===3||o===4)&&i.stateNode.containerInfo===n)return;i=i.return}for(;d!==null;){if(i=Yt(d),i===null)return;if(o=i.tag,o===5||o===6||o===26||o===27){e=l=i;continue s}d=d.parentNode}}e=e.return}qo(function(){var f=l,w=ni(t),y=[];s:{var b=hc.get(s);if(b!==void 0){var g=On,A=s;switch(s){case"keypress":if(Nn(t)===0)break s;case"keydown":case"keyup":g=hp;break;case"focusin":A="focus",g=ri;break;case"focusout":A="blur",g=ri;break;case"beforeblur":case"afterblur":g=ri;break;case"click":if(t.button===2)break s;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=Go;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=ep;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=gp;break;case uc:case vc:case pc:g=ip;break;case _c:g=mp;break;case"scroll":case"scrollend":g=ap;break;case"wheel":g=yp;break;case"copy":case"cut":case"paste":g=op;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=Qo;break;case"toggle":case"beforetoggle":g=Cp}var R=(a&4)!==0,cs=!R&&(s==="scroll"||s==="scrollend"),p=R?b!==null?b+"Capture":null:b;R=[];for(var r=f,h;r!==null;){var k=r;if(h=k.stateNode,k=k.tag,k!==5&&k!==26&&k!==27||h===null||p===null||(k=Ee(r,p),k!=null&&R.push(vn(r,k,h))),cs)break;r=r.return}0<R.length&&(b=new g(b,A,null,t,w),y.push({event:b,listeners:R}))}}if((a&7)===0){s:{if(b=s==="mouseover"||s==="pointerover",g=s==="mouseout"||s==="pointerout",b&&t!==ei&&(A=t.relatedTarget||t.fromElement)&&(Yt(A)||A[Zt]))break s;if((g||b)&&(b=w.window===w?w:(b=w.ownerDocument)?b.defaultView||b.parentWindow:window,g?(A=t.relatedTarget||t.toElement,g=f,A=A?Yt(A):null,A!==null&&(cs=N(A),R=A.tag,A!==cs||R!==5&&R!==27&&R!==6)&&(A=null)):(g=null,A=f),g!==A)){if(R=Go,k="onMouseLeave",p="onMouseEnter",r="mouse",(s==="pointerout"||s==="pointerover")&&(R=Qo,k="onPointerLeave",p="onPointerEnter",r="pointer"),cs=g==null?b:Ae(g),h=A==null?b:Ae(A),b=new R(k,r+"leave",g,t,w),b.target=cs,b.relatedTarget=h,k=null,Yt(w)===f&&(R=new R(p,r+"enter",A,t,w),R.target=h,R.relatedTarget=cs,k=R),cs=k,g&&A)a:{for(R=x_,p=g,r=A,h=0,k=p;k;k=R(k))h++;k=0;for(var O=r;O;O=R(O))k++;for(;0<h-k;)p=R(p),h--;for(;0<k-h;)r=R(r),k--;for(;h--;){if(p===r||r!==null&&p===r.alternate){R=p;break a}p=R(p),r=R(r)}R=null}else R=null;g!==null&&Vu(y,b,g,R,!1),A!==null&&cs!==null&&Vu(y,cs,A,R,!0)}}s:{if(b=f?Ae(f):window,g=b.nodeName&&b.nodeName.toLowerCase(),g==="select"||g==="input"&&b.type==="file")var ss=sc;else if($o(b))if(ac)ss=Np;else{ss=Ep;var z=Ap}else g=b.nodeName,!g||g.toLowerCase()!=="input"||b.type!=="checkbox"&&b.type!=="radio"?f&&ti(f.elementType)&&(ss=sc):ss=zp;if(ss&&(ss=ss(s,f))){Po(y,ss,t,w);break s}z&&z(s,b,f),s==="focusout"&&f&&b.type==="number"&&f.memoizedProps.value!=null&&ai(b,"number",b.value)}switch(z=f?Ae(f):window,s){case"focusin":($o(z)||z.contentEditable==="true")&&($t=z,fi=f,Re=null);break;case"focusout":Re=fi=$t=null;break;case"mousedown":bi=!0;break;case"contextmenu":case"mouseup":case"dragend":bi=!1,cc(y,t,w);break;case"selectionchange":if(Op)break;case"keydown":case"keyup":cc(y,t,w)}var X;if(vi)s:{switch(s){case"compositionstart":var I="onCompositionStart";break s;case"compositionend":I="onCompositionEnd";break s;case"compositionupdate":I="onCompositionUpdate";break s}I=void 0}else Wt?Io(s,t)&&(I="onCompositionEnd"):s==="keydown"&&t.keyCode===229&&(I="onCompositionStart");I&&(Ko&&t.locale!=="ko"&&(Wt||I!=="onCompositionStart"?I==="onCompositionEnd"&&Wt&&(X=Zo()):($a=w,di="value"in $a?$a.value:$a.textContent,Wt=!0)),z=Ml(f,I),0<z.length&&(I=new Xo(I,s,null,t,w),y.push({event:I,listeners:z}),X?I.data=X:(X=Wo(t),X!==null&&(I.data=X)))),(X=Mp?Bp(s,t):Dp(s,t))&&(I=Ml(f,"onBeforeInput"),0<I.length&&(z=new Xo("onBeforeInput","beforeinput",null,t,w),y.push({event:z,listeners:I}),z.data=X)),w_(y,s,f,t,w)}Hu(y,a)})}function vn(s,a,t){return{instance:s,listener:a,currentTarget:t}}function Ml(s,a){for(var t=a+"Capture",e=[];s!==null;){var n=s,l=n.stateNode;if(n=n.tag,n!==5&&n!==26&&n!==27||l===null||(n=Ee(s,t),n!=null&&e.unshift(vn(s,n,l)),n=Ee(s,a),n!=null&&e.push(vn(s,n,l))),s.tag===3)return e;s=s.return}return[]}function x_(s){if(s===null)return null;do s=s.return;while(s&&s.tag!==5&&s.tag!==27);return s||null}function Vu(s,a,t,e,n){for(var l=a._reactName,i=[];t!==null&&t!==e;){var d=t,o=d.alternate,f=d.stateNode;if(d=d.tag,o!==null&&o===e)break;d!==5&&d!==26&&d!==27||f===null||(o=f,n?(f=Ee(t,l),f!=null&&i.unshift(vn(t,f,o))):n||(f=Ee(t,l),f!=null&&i.push(vn(t,f,o)))),t=t.return}i.length!==0&&s.push({event:a,listeners:i})}var C_=/\r\n?/g,S_=/\u0000|\uFFFD/g;function ju(s){return(typeof s=="string"?s:""+s).replace(C_,`
`).replace(S_,"")}function Uu(s,a){return a=ju(a),ju(s)===a}function os(s,a,t,e,n,l){switch(t){case"children":typeof e=="string"?a==="body"||a==="textarea"&&e===""||Jt(s,e):(typeof e=="number"||typeof e=="bigint")&&a!=="body"&&Jt(s,""+e);break;case"className":Ln(s,"class",e);break;case"tabIndex":Ln(s,"tabindex",e);break;case"dir":case"role":case"viewBox":case"width":case"height":Ln(s,t,e);break;case"style":Uo(s,e,l);break;case"data":if(a!=="object"){Ln(s,"data",e);break}case"src":case"href":if(e===""&&(a!=="a"||t!=="href")){s.removeAttribute(t);break}if(e==null||typeof e=="function"||typeof e=="symbol"||typeof e=="boolean"){s.removeAttribute(t);break}e=En(""+e),s.setAttribute(t,e);break;case"action":case"formAction":if(typeof e=="function"){s.setAttribute(t,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof l=="function"&&(t==="formAction"?(a!=="input"&&os(s,a,"name",n.name,n,null),os(s,a,"formEncType",n.formEncType,n,null),os(s,a,"formMethod",n.formMethod,n,null),os(s,a,"formTarget",n.formTarget,n,null)):(os(s,a,"encType",n.encType,n,null),os(s,a,"method",n.method,n,null),os(s,a,"target",n.target,n,null)));if(e==null||typeof e=="symbol"||typeof e=="boolean"){s.removeAttribute(t);break}e=En(""+e),s.setAttribute(t,e);break;case"onClick":e!=null&&(s.onclick=Ea);break;case"onScroll":e!=null&&J("scroll",s);break;case"onScrollEnd":e!=null&&J("scrollend",s);break;case"dangerouslySetInnerHTML":if(e!=null){if(typeof e!="object"||!("__html"in e))throw Error(_(61));if(t=e.__html,t!=null){if(n.children!=null)throw Error(_(60));s.innerHTML=t}}break;case"multiple":s.multiple=e&&typeof e!="function"&&typeof e!="symbol";break;case"muted":s.muted=e&&typeof e!="function"&&typeof e!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(e==null||typeof e=="function"||typeof e=="boolean"||typeof e=="symbol"){s.removeAttribute("xlink:href");break}t=En(""+e),s.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",t);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":e!=null&&typeof e!="function"&&typeof e!="symbol"?s.setAttribute(t,""+e):s.removeAttribute(t);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":e&&typeof e!="function"&&typeof e!="symbol"?s.setAttribute(t,""):s.removeAttribute(t);break;case"capture":case"download":e===!0?s.setAttribute(t,""):e!==!1&&e!=null&&typeof e!="function"&&typeof e!="symbol"?s.setAttribute(t,e):s.removeAttribute(t);break;case"cols":case"rows":case"size":case"span":e!=null&&typeof e!="function"&&typeof e!="symbol"&&!isNaN(e)&&1<=e?s.setAttribute(t,e):s.removeAttribute(t);break;case"rowSpan":case"start":e==null||typeof e=="function"||typeof e=="symbol"||isNaN(e)?s.removeAttribute(t):s.setAttribute(t,e);break;case"popover":J("beforetoggle",s),J("toggle",s),Tn(s,"popover",e);break;case"xlinkActuate":Aa(s,"http://www.w3.org/1999/xlink","xlink:actuate",e);break;case"xlinkArcrole":Aa(s,"http://www.w3.org/1999/xlink","xlink:arcrole",e);break;case"xlinkRole":Aa(s,"http://www.w3.org/1999/xlink","xlink:role",e);break;case"xlinkShow":Aa(s,"http://www.w3.org/1999/xlink","xlink:show",e);break;case"xlinkTitle":Aa(s,"http://www.w3.org/1999/xlink","xlink:title",e);break;case"xlinkType":Aa(s,"http://www.w3.org/1999/xlink","xlink:type",e);break;case"xmlBase":Aa(s,"http://www.w3.org/XML/1998/namespace","xml:base",e);break;case"xmlLang":Aa(s,"http://www.w3.org/XML/1998/namespace","xml:lang",e);break;case"xmlSpace":Aa(s,"http://www.w3.org/XML/1998/namespace","xml:space",e);break;case"is":Tn(s,"is",e);break;case"innerText":case"textContent":break;default:(!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(t=Pv.get(t)||t,Tn(s,t,e))}}function Zd(s,a,t,e,n,l){switch(t){case"style":Uo(s,e,l);break;case"dangerouslySetInnerHTML":if(e!=null){if(typeof e!="object"||!("__html"in e))throw Error(_(61));if(t=e.__html,t!=null){if(n.children!=null)throw Error(_(60));s.innerHTML=t}}break;case"children":typeof e=="string"?Jt(s,e):(typeof e=="number"||typeof e=="bigint")&&Jt(s,""+e);break;case"onScroll":e!=null&&J("scroll",s);break;case"onScrollEnd":e!=null&&J("scrollend",s);break;case"onClick":e!=null&&(s.onclick=Ea);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Lo.hasOwnProperty(t))s:{if(t[0]==="o"&&t[1]==="n"&&(n=t.endsWith("Capture"),a=t.slice(2,n?t.length-7:void 0),l=s[Ys]||null,l=l!=null?l[t]:null,typeof l=="function"&&s.removeEventListener(a,l,n),typeof e=="function")){typeof l!="function"&&l!==null&&(t in s?s[t]=null:s.hasAttribute(t)&&s.removeAttribute(t)),s.addEventListener(a,e,n);break s}t in s?s[t]=e:e===!0?s.setAttribute(t,""):Tn(s,t,e)}}}function As(s,a,t){switch(a){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":J("error",s),J("load",s);var e=!1,n=!1,l;for(l in t)if(t.hasOwnProperty(l)){var i=t[l];if(i!=null)switch(l){case"src":e=!0;break;case"srcSet":n=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(_(137,a));default:os(s,a,l,i,t,null)}}n&&os(s,a,"srcSet",t.srcSet,t,null),e&&os(s,a,"src",t.src,t,null);return;case"input":J("invalid",s);var d=l=i=n=null,o=null,f=null;for(e in t)if(t.hasOwnProperty(e)){var w=t[e];if(w!=null)switch(e){case"name":n=w;break;case"type":i=w;break;case"checked":o=w;break;case"defaultChecked":f=w;break;case"value":l=w;break;case"defaultValue":d=w;break;case"children":case"dangerouslySetInnerHTML":if(w!=null)throw Error(_(137,a));break;default:os(s,a,e,w,t,null)}}Ho(s,l,d,o,f,i,n,!1);return;case"select":J("invalid",s),e=i=l=null;for(n in t)if(t.hasOwnProperty(n)&&(d=t[n],d!=null))switch(n){case"value":l=d;break;case"defaultValue":i=d;break;case"multiple":e=d;default:os(s,a,n,d,t,null)}a=l,t=i,s.multiple=!!e,a!=null?Kt(s,!!e,a,!1):t!=null&&Kt(s,!!e,t,!0);return;case"textarea":J("invalid",s),l=n=e=null;for(i in t)if(t.hasOwnProperty(i)&&(d=t[i],d!=null))switch(i){case"value":e=d;break;case"defaultValue":n=d;break;case"children":l=d;break;case"dangerouslySetInnerHTML":if(d!=null)throw Error(_(91));break;default:os(s,a,i,d,t,null)}Vo(s,e,n,l);return;case"option":for(o in t)if(t.hasOwnProperty(o)&&(e=t[o],e!=null))switch(o){case"selected":s.selected=e&&typeof e!="function"&&typeof e!="symbol";break;default:os(s,a,o,e,t,null)}return;case"dialog":J("beforetoggle",s),J("toggle",s),J("cancel",s),J("close",s);break;case"iframe":case"object":J("load",s);break;case"video":case"audio":for(e=0;e<un.length;e++)J(un[e],s);break;case"image":J("error",s),J("load",s);break;case"details":J("toggle",s);break;case"embed":case"source":case"link":J("error",s),J("load",s);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(f in t)if(t.hasOwnProperty(f)&&(e=t[f],e!=null))switch(f){case"children":case"dangerouslySetInnerHTML":throw Error(_(137,a));default:os(s,a,f,e,t,null)}return;default:if(ti(a)){for(w in t)t.hasOwnProperty(w)&&(e=t[w],e!==void 0&&Zd(s,a,w,e,t,void 0));return}}for(d in t)t.hasOwnProperty(d)&&(e=t[d],e!=null&&os(s,a,d,e,t,null))}function M_(s,a,t,e){switch(a){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var n=null,l=null,i=null,d=null,o=null,f=null,w=null;for(g in t){var y=t[g];if(t.hasOwnProperty(g)&&y!=null)switch(g){case"checked":break;case"value":break;case"defaultValue":o=y;default:e.hasOwnProperty(g)||os(s,a,g,null,e,y)}}for(var b in e){var g=e[b];if(y=t[b],e.hasOwnProperty(b)&&(g!=null||y!=null))switch(b){case"type":l=g;break;case"name":n=g;break;case"checked":f=g;break;case"defaultChecked":w=g;break;case"value":i=g;break;case"defaultValue":d=g;break;case"children":case"dangerouslySetInnerHTML":if(g!=null)throw Error(_(137,a));break;default:g!==y&&os(s,a,b,g,e,y)}}si(s,i,d,o,f,w,l,n);return;case"select":g=i=d=b=null;for(l in t)if(o=t[l],t.hasOwnProperty(l)&&o!=null)switch(l){case"value":break;case"multiple":g=o;default:e.hasOwnProperty(l)||os(s,a,l,null,e,o)}for(n in e)if(l=e[n],o=t[n],e.hasOwnProperty(n)&&(l!=null||o!=null))switch(n){case"value":b=l;break;case"defaultValue":d=l;break;case"multiple":i=l;default:l!==o&&os(s,a,n,l,e,o)}a=d,t=i,e=g,b!=null?Kt(s,!!t,b,!1):!!e!=!!t&&(a!=null?Kt(s,!!t,a,!0):Kt(s,!!t,t?[]:"",!1));return;case"textarea":g=b=null;for(d in t)if(n=t[d],t.hasOwnProperty(d)&&n!=null&&!e.hasOwnProperty(d))switch(d){case"value":break;case"children":break;default:os(s,a,d,null,e,n)}for(i in e)if(n=e[i],l=t[i],e.hasOwnProperty(i)&&(n!=null||l!=null))switch(i){case"value":b=n;break;case"defaultValue":g=n;break;case"children":break;case"dangerouslySetInnerHTML":if(n!=null)throw Error(_(91));break;default:n!==l&&os(s,a,i,n,e,l)}Oo(s,b,g);return;case"option":for(var A in t)if(b=t[A],t.hasOwnProperty(A)&&b!=null&&!e.hasOwnProperty(A))switch(A){case"selected":s.selected=!1;break;default:os(s,a,A,null,e,b)}for(o in e)if(b=e[o],g=t[o],e.hasOwnProperty(o)&&b!==g&&(b!=null||g!=null))switch(o){case"selected":s.selected=b&&typeof b!="function"&&typeof b!="symbol";break;default:os(s,a,o,b,e,g)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var R in t)b=t[R],t.hasOwnProperty(R)&&b!=null&&!e.hasOwnProperty(R)&&os(s,a,R,null,e,b);for(f in e)if(b=e[f],g=t[f],e.hasOwnProperty(f)&&b!==g&&(b!=null||g!=null))switch(f){case"children":case"dangerouslySetInnerHTML":if(b!=null)throw Error(_(137,a));break;default:os(s,a,f,b,e,g)}return;default:if(ti(a)){for(var cs in t)b=t[cs],t.hasOwnProperty(cs)&&b!==void 0&&!e.hasOwnProperty(cs)&&Zd(s,a,cs,void 0,e,b);for(w in e)b=e[w],g=t[w],!e.hasOwnProperty(w)||b===g||b===void 0&&g===void 0||Zd(s,a,w,b,e,g);return}}for(var p in t)b=t[p],t.hasOwnProperty(p)&&b!=null&&!e.hasOwnProperty(p)&&os(s,a,p,null,e,b);for(y in e)b=e[y],g=t[y],!e.hasOwnProperty(y)||b===g||b==null&&g==null||os(s,a,y,b,e,g)}function Ru(s){switch(s){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function B_(){if(typeof performance.getEntriesByType=="function"){for(var s=0,a=0,t=performance.getEntriesByType("resource"),e=0;e<t.length;e++){var n=t[e],l=n.transferSize,i=n.initiatorType,d=n.duration;if(l&&d&&Ru(i)){for(i=0,d=n.responseEnd,e+=1;e<t.length;e++){var o=t[e],f=o.startTime;if(f>d)break;var w=o.transferSize,y=o.initiatorType;w&&Ru(y)&&(o=o.responseEnd,i+=w*(o<d?1:(d-f)/(o-f)))}if(--e,a+=8*(l+i)/(n.duration/1e3),s++,10<s)break}}if(0<s)return a/s/1e6}return navigator.connection&&(s=navigator.connection.downlink,typeof s=="number")?s:5}var Yd=null,Gd=null;function Bl(s){return s.nodeType===9?s:s.ownerDocument}function qu(s){switch(s){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Zu(s,a){if(s===0)switch(a){case"svg":return 1;case"math":return 2;default:return 0}return s===1&&a==="foreignObject"?0:s}function Xd(s,a){return s==="textarea"||s==="noscript"||typeof a.children=="string"||typeof a.children=="number"||typeof a.children=="bigint"||typeof a.dangerouslySetInnerHTML=="object"&&a.dangerouslySetInnerHTML!==null&&a.dangerouslySetInnerHTML.__html!=null}var Qd=null;function D_(){var s=window.event;return s&&s.type==="popstate"?s===Qd?!1:(Qd=s,!0):(Qd=null,!1)}var Yu=typeof setTimeout=="function"?setTimeout:void 0,T_=typeof clearTimeout=="function"?clearTimeout:void 0,Gu=typeof Promise=="function"?Promise:void 0,L_=typeof queueMicrotask=="function"?queueMicrotask:typeof Gu<"u"?function(s){return Gu.resolve(null).then(s).catch(A_)}:Yu;function A_(s){setTimeout(function(){throw s})}function ht(s){return s==="head"}function Xu(s,a){var t=a,e=0;do{var n=t.nextSibling;if(s.removeChild(t),n&&n.nodeType===8)if(t=n.data,t==="/$"||t==="/&"){if(e===0){s.removeChild(n),Se(a);return}e--}else if(t==="$"||t==="$?"||t==="$~"||t==="$!"||t==="&")e++;else if(t==="html")pn(s.ownerDocument.documentElement);else if(t==="head"){t=s.ownerDocument.head,pn(t);for(var l=t.firstChild;l;){var i=l.nextSibling,d=l.nodeName;l[Le]||d==="SCRIPT"||d==="STYLE"||d==="LINK"&&l.rel.toLowerCase()==="stylesheet"||t.removeChild(l),l=i}}else t==="body"&&pn(s.ownerDocument.body);t=n}while(t);Se(a)}function Qu(s,a){var t=s;s=0;do{var e=t.nextSibling;if(t.nodeType===1?a?(t._stashedDisplay=t.style.display,t.style.display="none"):(t.style.display=t._stashedDisplay||"",t.getAttribute("style")===""&&t.removeAttribute("style")):t.nodeType===3&&(a?(t._stashedText=t.nodeValue,t.nodeValue=""):t.nodeValue=t._stashedText||""),e&&e.nodeType===8)if(t=e.data,t==="/$"){if(s===0)break;s--}else t!=="$"&&t!=="$?"&&t!=="$~"&&t!=="$!"||s++;t=e}while(t)}function Kd(s){var a=s.firstChild;for(a&&a.nodeType===10&&(a=a.nextSibling);a;){var t=a;switch(a=a.nextSibling,t.nodeName){case"HTML":case"HEAD":case"BODY":Kd(t),$l(t);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(t.rel.toLowerCase()==="stylesheet")continue}s.removeChild(t)}}function E_(s,a,t,e){for(;s.nodeType===1;){var n=t;if(s.nodeName.toLowerCase()!==a.toLowerCase()){if(!e&&(s.nodeName!=="INPUT"||s.type!=="hidden"))break}else if(e){if(!s[Le])switch(a){case"meta":if(!s.hasAttribute("itemprop"))break;return s;case"link":if(l=s.getAttribute("rel"),l==="stylesheet"&&s.hasAttribute("data-precedence"))break;if(l!==n.rel||s.getAttribute("href")!==(n.href==null||n.href===""?null:n.href)||s.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin)||s.getAttribute("title")!==(n.title==null?null:n.title))break;return s;case"style":if(s.hasAttribute("data-precedence"))break;return s;case"script":if(l=s.getAttribute("src"),(l!==(n.src==null?null:n.src)||s.getAttribute("type")!==(n.type==null?null:n.type)||s.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin))&&l&&s.hasAttribute("async")&&!s.hasAttribute("itemprop"))break;return s;default:return s}}else if(a==="input"&&s.type==="hidden"){var l=n.name==null?null:""+n.name;if(n.type==="hidden"&&s.getAttribute("name")===l)return s}else return s;if(s=fa(s.nextSibling),s===null)break}return null}function z_(s,a,t){if(a==="")return null;for(;s.nodeType!==3;)if((s.nodeType!==1||s.nodeName!=="INPUT"||s.type!=="hidden")&&!t||(s=fa(s.nextSibling),s===null))return null;return s}function Ku(s,a){for(;s.nodeType!==8;)if((s.nodeType!==1||s.nodeName!=="INPUT"||s.type!=="hidden")&&!a||(s=fa(s.nextSibling),s===null))return null;return s}function Jd(s){return s.data==="$?"||s.data==="$~"}function Fd(s){return s.data==="$!"||s.data==="$?"&&s.ownerDocument.readyState!=="loading"}function N_(s,a){var t=s.ownerDocument;if(s.data==="$~")s._reactRetry=a;else if(s.data!=="$?"||t.readyState!=="loading")a();else{var e=function(){a(),t.removeEventListener("DOMContentLoaded",e)};t.addEventListener("DOMContentLoaded",e),s._reactRetry=e}}function fa(s){for(;s!=null;s=s.nextSibling){var a=s.nodeType;if(a===1||a===3)break;if(a===8){if(a=s.data,a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"||a==="F!"||a==="F")break;if(a==="/$"||a==="/&")return null}}return s}var Id=null;function Ju(s){s=s.nextSibling;for(var a=0;s;){if(s.nodeType===8){var t=s.data;if(t==="/$"||t==="/&"){if(a===0)return fa(s.nextSibling);a--}else t!=="$"&&t!=="$!"&&t!=="$?"&&t!=="$~"&&t!=="&"||a++}s=s.nextSibling}return null}function Fu(s){s=s.previousSibling;for(var a=0;s;){if(s.nodeType===8){var t=s.data;if(t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"){if(a===0)return s;a--}else t!=="/$"&&t!=="/&"||a++}s=s.previousSibling}return null}function Iu(s,a,t){switch(a=Bl(t),s){case"html":if(s=a.documentElement,!s)throw Error(_(452));return s;case"head":if(s=a.head,!s)throw Error(_(453));return s;case"body":if(s=a.body,!s)throw Error(_(454));return s;default:throw Error(_(451))}}function pn(s){for(var a=s.attributes;a.length;)s.removeAttributeNode(a[0]);$l(s)}var ba=new Map,Wu=new Set;function Dl(s){return typeof s.getRootNode=="function"?s.getRootNode():s.nodeType===9?s:s.ownerDocument}var Ja=B.d;B.d={f:H_,r:O_,D:V_,C:j_,L:U_,m:R_,X:Z_,S:q_,M:Y_};function H_(){var s=Ja.f(),a=wl();return s||a}function O_(s){var a=Gt(s);a!==null&&a.tag===5&&a.type==="form"?_r(a):Ja.r(s)}var ye=typeof document>"u"?null:document;function $u(s,a,t){var e=ye;if(e&&typeof a=="string"&&a){var n=ca(a);n='link[rel="'+s+'"][href="'+n+'"]',typeof t=="string"&&(n+='[crossorigin="'+t+'"]'),Wu.has(n)||(Wu.add(n),s={rel:s,crossOrigin:t,href:a},e.querySelector(n)===null&&(a=e.createElement("link"),As(a,"link",s),Ss(a),e.head.appendChild(a)))}}function V_(s){Ja.D(s),$u("dns-prefetch",s,null)}function j_(s,a){Ja.C(s,a),$u("preconnect",s,a)}function U_(s,a,t){Ja.L(s,a,t);var e=ye;if(e&&s&&a){var n='link[rel="preload"][as="'+ca(a)+'"]';a==="image"&&t&&t.imageSrcSet?(n+='[imagesrcset="'+ca(t.imageSrcSet)+'"]',typeof t.imageSizes=="string"&&(n+='[imagesizes="'+ca(t.imageSizes)+'"]')):n+='[href="'+ca(s)+'"]';var l=n;switch(a){case"style":l=xe(s);break;case"script":l=Ce(s)}ba.has(l)||(s=H({rel:"preload",href:a==="image"&&t&&t.imageSrcSet?void 0:s,as:a},t),ba.set(l,s),e.querySelector(n)!==null||a==="style"&&e.querySelector(_n(l))||a==="script"&&e.querySelector(hn(l))||(a=e.createElement("link"),As(a,"link",s),Ss(a),e.head.appendChild(a)))}}function R_(s,a){Ja.m(s,a);var t=ye;if(t&&s){var e=a&&typeof a.as=="string"?a.as:"script",n='link[rel="modulepreload"][as="'+ca(e)+'"][href="'+ca(s)+'"]',l=n;switch(e){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":l=Ce(s)}if(!ba.has(l)&&(s=H({rel:"modulepreload",href:s},a),ba.set(l,s),t.querySelector(n)===null)){switch(e){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(t.querySelector(hn(l)))return}e=t.createElement("link"),As(e,"link",s),Ss(e),t.head.appendChild(e)}}}function q_(s,a,t){Ja.S(s,a,t);var e=ye;if(e&&s){var n=Xt(e).hoistableStyles,l=xe(s);a=a||"default";var i=n.get(l);if(!i){var d={loading:0,preload:null};if(i=e.querySelector(_n(l)))d.loading=5;else{s=H({rel:"stylesheet",href:s,"data-precedence":a},t),(t=ba.get(l))&&Wd(s,t);var o=i=e.createElement("link");Ss(o),As(o,"link",s),o._p=new Promise(function(f,w){o.onload=f,o.onerror=w}),o.addEventListener("load",function(){d.loading|=1}),o.addEventListener("error",function(){d.loading|=2}),d.loading|=4,Tl(i,a,e)}i={type:"stylesheet",instance:i,count:1,state:d},n.set(l,i)}}}function Z_(s,a){Ja.X(s,a);var t=ye;if(t&&s){var e=Xt(t).hoistableScripts,n=Ce(s),l=e.get(n);l||(l=t.querySelector(hn(n)),l||(s=H({src:s,async:!0},a),(a=ba.get(n))&&$d(s,a),l=t.createElement("script"),Ss(l),As(l,"link",s),t.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},e.set(n,l))}}function Y_(s,a){Ja.M(s,a);var t=ye;if(t&&s){var e=Xt(t).hoistableScripts,n=Ce(s),l=e.get(n);l||(l=t.querySelector(hn(n)),l||(s=H({src:s,async:!0,type:"module"},a),(a=ba.get(n))&&$d(s,a),l=t.createElement("script"),Ss(l),As(l,"link",s),t.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},e.set(n,l))}}function Pu(s,a,t,e){var n=(n=Q.current)?Dl(n):null;if(!n)throw Error(_(446));switch(s){case"meta":case"title":return null;case"style":return typeof t.precedence=="string"&&typeof t.href=="string"?(a=xe(t.href),t=Xt(n).hoistableStyles,e=t.get(a),e||(e={type:"style",instance:null,count:0,state:null},t.set(a,e)),e):{type:"void",instance:null,count:0,state:null};case"link":if(t.rel==="stylesheet"&&typeof t.href=="string"&&typeof t.precedence=="string"){s=xe(t.href);var l=Xt(n).hoistableStyles,i=l.get(s);if(i||(n=n.ownerDocument||n,i={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},l.set(s,i),(l=n.querySelector(_n(s)))&&!l._p&&(i.instance=l,i.state.loading=5),ba.has(s)||(t={rel:"preload",as:"style",href:t.href,crossOrigin:t.crossOrigin,integrity:t.integrity,media:t.media,hrefLang:t.hrefLang,referrerPolicy:t.referrerPolicy},ba.set(s,t),l||G_(n,s,t,i.state))),a&&e===null)throw Error(_(528,""));return i}if(a&&e!==null)throw Error(_(529,""));return null;case"script":return a=t.async,t=t.src,typeof t=="string"&&a&&typeof a!="function"&&typeof a!="symbol"?(a=Ce(t),t=Xt(n).hoistableScripts,e=t.get(a),e||(e={type:"script",instance:null,count:0,state:null},t.set(a,e)),e):{type:"void",instance:null,count:0,state:null};default:throw Error(_(444,s))}}function xe(s){return'href="'+ca(s)+'"'}function _n(s){return'link[rel="stylesheet"]['+s+"]"}function sv(s){return H({},s,{"data-precedence":s.precedence,precedence:null})}function G_(s,a,t,e){s.querySelector('link[rel="preload"][as="style"]['+a+"]")?e.loading=1:(a=s.createElement("link"),e.preload=a,a.addEventListener("load",function(){return e.loading|=1}),a.addEventListener("error",function(){return e.loading|=2}),As(a,"link",t),Ss(a),s.head.appendChild(a))}function Ce(s){return'[src="'+ca(s)+'"]'}function hn(s){return"script[async]"+s}function av(s,a,t){if(a.count++,a.instance===null)switch(a.type){case"style":var e=s.querySelector('style[data-href~="'+ca(t.href)+'"]');if(e)return a.instance=e,Ss(e),e;var n=H({},t,{"data-href":t.href,"data-precedence":t.precedence,href:null,precedence:null});return e=(s.ownerDocument||s).createElement("style"),Ss(e),As(e,"style",n),Tl(e,t.precedence,s),a.instance=e;case"stylesheet":n=xe(t.href);var l=s.querySelector(_n(n));if(l)return a.state.loading|=4,a.instance=l,Ss(l),l;e=sv(t),(n=ba.get(n))&&Wd(e,n),l=(s.ownerDocument||s).createElement("link"),Ss(l);var i=l;return i._p=new Promise(function(d,o){i.onload=d,i.onerror=o}),As(l,"link",e),a.state.loading|=4,Tl(l,t.precedence,s),a.instance=l;case"script":return l=Ce(t.src),(n=s.querySelector(hn(l)))?(a.instance=n,Ss(n),n):(e=t,(n=ba.get(l))&&(e=H({},t),$d(e,n)),s=s.ownerDocument||s,n=s.createElement("script"),Ss(n),As(n,"link",e),s.head.appendChild(n),a.instance=n);case"void":return null;default:throw Error(_(443,a.type))}else a.type==="stylesheet"&&(a.state.loading&4)===0&&(e=a.instance,a.state.loading|=4,Tl(e,t.precedence,s));return a.instance}function Tl(s,a,t){for(var e=t.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),n=e.length?e[e.length-1]:null,l=n,i=0;i<e.length;i++){var d=e[i];if(d.dataset.precedence===a)l=d;else if(l!==n)break}l?l.parentNode.insertBefore(s,l.nextSibling):(a=t.nodeType===9?t.head:t,a.insertBefore(s,a.firstChild))}function Wd(s,a){s.crossOrigin==null&&(s.crossOrigin=a.crossOrigin),s.referrerPolicy==null&&(s.referrerPolicy=a.referrerPolicy),s.title==null&&(s.title=a.title)}function $d(s,a){s.crossOrigin==null&&(s.crossOrigin=a.crossOrigin),s.referrerPolicy==null&&(s.referrerPolicy=a.referrerPolicy),s.integrity==null&&(s.integrity=a.integrity)}var Ll=null;function tv(s,a,t){if(Ll===null){var e=new Map,n=Ll=new Map;n.set(t,e)}else n=Ll,e=n.get(t),e||(e=new Map,n.set(t,e));if(e.has(s))return e;for(e.set(s,null),t=t.getElementsByTagName(s),n=0;n<t.length;n++){var l=t[n];if(!(l[Le]||l[Bs]||s==="link"&&l.getAttribute("rel")==="stylesheet")&&l.namespaceURI!=="http://www.w3.org/2000/svg"){var i=l.getAttribute(a)||"";i=s+i;var d=e.get(i);d?d.push(l):e.set(i,[l])}}return e}function ev(s,a,t){s=s.ownerDocument||s,s.head.insertBefore(t,a==="title"?s.querySelector("head > title"):null)}function X_(s,a,t){if(t===1||a.itemProp!=null)return!1;switch(s){case"meta":case"title":return!0;case"style":if(typeof a.precedence!="string"||typeof a.href!="string"||a.href==="")break;return!0;case"link":if(typeof a.rel!="string"||typeof a.href!="string"||a.href===""||a.onLoad||a.onError)break;switch(a.rel){case"stylesheet":return s=a.disabled,typeof a.precedence=="string"&&s==null;default:return!0}case"script":if(a.async&&typeof a.async!="function"&&typeof a.async!="symbol"&&!a.onLoad&&!a.onError&&a.src&&typeof a.src=="string")return!0}return!1}function nv(s){return!(s.type==="stylesheet"&&(s.state.loading&3)===0)}function Q_(s,a,t,e){if(t.type==="stylesheet"&&(typeof e.media!="string"||matchMedia(e.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var n=xe(e.href),l=a.querySelector(_n(n));if(l){a=l._p,a!==null&&typeof a=="object"&&typeof a.then=="function"&&(s.count++,s=Al.bind(s),a.then(s,s)),t.state.loading|=4,t.instance=l,Ss(l);return}l=a.ownerDocument||a,e=sv(e),(n=ba.get(n))&&Wd(e,n),l=l.createElement("link"),Ss(l);var i=l;i._p=new Promise(function(d,o){i.onload=d,i.onerror=o}),As(l,"link",e),t.instance=l}s.stylesheets===null&&(s.stylesheets=new Map),s.stylesheets.set(t,a),(a=t.state.preload)&&(t.state.loading&3)===0&&(s.count++,t=Al.bind(s),a.addEventListener("load",t),a.addEventListener("error",t))}}var Pd=0;function K_(s,a){return s.stylesheets&&s.count===0&&zl(s,s.stylesheets),0<s.count||0<s.imgCount?function(t){var e=setTimeout(function(){if(s.stylesheets&&zl(s,s.stylesheets),s.unsuspend){var l=s.unsuspend;s.unsuspend=null,l()}},6e4+a);0<s.imgBytes&&Pd===0&&(Pd=62500*B_());var n=setTimeout(function(){if(s.waitingForImages=!1,s.count===0&&(s.stylesheets&&zl(s,s.stylesheets),s.unsuspend)){var l=s.unsuspend;s.unsuspend=null,l()}},(s.imgBytes>Pd?50:800)+a);return s.unsuspend=t,function(){s.unsuspend=null,clearTimeout(e),clearTimeout(n)}}:null}function Al(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)zl(this,this.stylesheets);else if(this.unsuspend){var s=this.unsuspend;this.unsuspend=null,s()}}}var El=null;function zl(s,a){s.stylesheets=null,s.unsuspend!==null&&(s.count++,El=new Map,a.forEach(J_,s),El=null,Al.call(s))}function J_(s,a){if(!(a.state.loading&4)){var t=El.get(s);if(t)var e=t.get(null);else{t=new Map,El.set(s,t);for(var n=s.querySelectorAll("link[data-precedence],style[data-precedence]"),l=0;l<n.length;l++){var i=n[l];(i.nodeName==="LINK"||i.getAttribute("media")!=="not all")&&(t.set(i.dataset.precedence,i),e=i)}e&&t.set(null,e)}n=a.instance,i=n.getAttribute("data-precedence"),l=t.get(i)||e,l===e&&t.set(null,n),t.set(i,n),this.count++,e=Al.bind(this),n.addEventListener("load",e),n.addEventListener("error",e),l?l.parentNode.insertBefore(n,l.nextSibling):(s=s.nodeType===9?s.head:s,s.insertBefore(n,s.firstChild)),a.state.loading|=4}}var fn={$$typeof:zs,Provider:null,Consumer:null,_currentValue:q,_currentValue2:q,_threadCount:0};function F_(s,a,t,e,n,l,i,d,o){this.tag=1,this.containerInfo=s,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Jl(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Jl(0),this.hiddenUpdates=Jl(null),this.identifierPrefix=e,this.onUncaughtError=n,this.onCaughtError=l,this.onRecoverableError=i,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.incompleteTransitions=new Map}function lv(s,a,t,e,n,l,i,d,o,f,w,y){return s=new F_(s,a,t,i,o,f,w,y,d),a=1,l===!0&&(a|=24),l=aa(3,null,null,a),s.current=l,l.stateNode=s,a=Ei(),a.refCount++,s.pooledCache=a,a.refCount++,l.memoizedState={element:e,isDehydrated:t,cache:a},Oi(l),s}function iv(s){return s?(s=ae,s):ae}function dv(s,a,t,e,n,l){n=iv(n),e.context===null?e.context=n:e.pendingContext=n,e=nt(a),e.payload={element:t},l=l===void 0?null:l,l!==null&&(e.callback=l),t=lt(s,e,a),t!==null&&(Fs(t,s,a),Ke(t,s,a))}function ov(s,a){if(s=s.memoizedState,s!==null&&s.dehydrated!==null){var t=s.retryLane;s.retryLane=t!==0&&t<a?t:a}}function so(s,a){ov(s,a),(s=s.alternate)&&ov(s,a)}function cv(s){if(s.tag===13||s.tag===31){var a=Dt(s,67108864);a!==null&&Fs(a,s,67108864),so(s,67108864)}}function rv(s){if(s.tag===13||s.tag===31){var a=ia();a=Fl(a);var t=Dt(s,a);t!==null&&Fs(t,s,a),so(s,a)}}var Nl=!0;function I_(s,a,t,e){var n=m.T;m.T=null;var l=B.p;try{B.p=2,ao(s,a,t,e)}finally{B.p=l,m.T=n}}function W_(s,a,t,e){var n=m.T;m.T=null;var l=B.p;try{B.p=8,ao(s,a,t,e)}finally{B.p=l,m.T=n}}function ao(s,a,t,e){if(Nl){var n=to(e);if(n===null)qd(s,a,e,Hl,t),vv(s,e);else if(P_(n,s,a,t,e))e.stopPropagation();else if(vv(s,e),a&4&&-1<$_.indexOf(s)){for(;n!==null;){var l=Gt(n);if(l!==null)switch(l.tag){case 3:if(l=l.stateNode,l.current.memoizedState.isDehydrated){var i=xt(l.pendingLanes);if(i!==0){var d=l;for(d.pendingLanes|=2,d.entangledLanes|=2;i;){var o=1<<31-Ps(i);d.entanglements[1]|=o,i&=~o}Da(l),(ts&6)===0&&(bl=Ws()+500,rn(0))}}break;case 31:case 13:d=Dt(l,2),d!==null&&Fs(d,l,2),wl(),so(l,2)}if(l=to(e),l===null&&qd(s,a,e,Hl,t),l===n)break;n=l}n!==null&&e.stopPropagation()}else qd(s,a,e,null,t)}}function to(s){return s=ni(s),eo(s)}var Hl=null;function eo(s){if(Hl=null,s=Yt(s),s!==null){var a=N(s);if(a===null)s=null;else{var t=a.tag;if(t===13){if(s=V(a),s!==null)return s;s=null}else if(t===31){if(s=j(a),s!==null)return s;s=null}else if(t===3){if(a.stateNode.current.memoizedState.isDehydrated)return a.tag===3?a.stateNode.containerInfo:null;s=null}else a!==s&&(s=null)}}return Hl=s,null}function uv(s){switch(s){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Vv()){case wo:return 2;case mo:return 8;case Cn:case jv:return 32;case ko:return 268435456;default:return 32}default:return 32}}var no=!1,ft=null,bt=null,gt=null,bn=new Map,gn=new Map,wt=[],$_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function vv(s,a){switch(s){case"focusin":case"focusout":ft=null;break;case"dragenter":case"dragleave":bt=null;break;case"mouseover":case"mouseout":gt=null;break;case"pointerover":case"pointerout":bn.delete(a.pointerId);break;case"gotpointercapture":case"lostpointercapture":gn.delete(a.pointerId)}}function wn(s,a,t,e,n,l){return s===null||s.nativeEvent!==l?(s={blockedOn:a,domEventName:t,eventSystemFlags:e,nativeEvent:l,targetContainers:[n]},a!==null&&(a=Gt(a),a!==null&&cv(a)),s):(s.eventSystemFlags|=e,a=s.targetContainers,n!==null&&a.indexOf(n)===-1&&a.push(n),s)}function P_(s,a,t,e,n){switch(a){case"focusin":return ft=wn(ft,s,a,t,e,n),!0;case"dragenter":return bt=wn(bt,s,a,t,e,n),!0;case"mouseover":return gt=wn(gt,s,a,t,e,n),!0;case"pointerover":var l=n.pointerId;return bn.set(l,wn(bn.get(l)||null,s,a,t,e,n)),!0;case"gotpointercapture":return l=n.pointerId,gn.set(l,wn(gn.get(l)||null,s,a,t,e,n)),!0}return!1}function pv(s){var a=Yt(s.target);if(a!==null){var t=N(a);if(t!==null){if(a=t.tag,a===13){if(a=V(t),a!==null){s.blockedOn=a,Bo(s.priority,function(){rv(t)});return}}else if(a===31){if(a=j(t),a!==null){s.blockedOn=a,Bo(s.priority,function(){rv(t)});return}}else if(a===3&&t.stateNode.current.memoizedState.isDehydrated){s.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}s.blockedOn=null}function Ol(s){if(s.blockedOn!==null)return!1;for(var a=s.targetContainers;0<a.length;){var t=to(s.nativeEvent);if(t===null){t=s.nativeEvent;var e=new t.constructor(t.type,t);ei=e,t.target.dispatchEvent(e),ei=null}else return a=Gt(t),a!==null&&cv(a),s.blockedOn=t,!1;a.shift()}return!0}function _v(s,a,t){Ol(s)&&t.delete(a)}function s1(){no=!1,ft!==null&&Ol(ft)&&(ft=null),bt!==null&&Ol(bt)&&(bt=null),gt!==null&&Ol(gt)&&(gt=null),bn.forEach(_v),gn.forEach(_v)}function Vl(s,a){s.blockedOn===a&&(s.blockedOn=null,no||(no=!0,v.unstable_scheduleCallback(v.unstable_NormalPriority,s1)))}var jl=null;function hv(s){jl!==s&&(jl=s,v.unstable_scheduleCallback(v.unstable_NormalPriority,function(){jl===s&&(jl=null);for(var a=0;a<s.length;a+=3){var t=s[a],e=s[a+1],n=s[a+2];if(typeof e!="function"){if(eo(e||t)===null)continue;break}var l=Gt(t);l!==null&&(s.splice(a,3),a-=3,td(l,{pending:!0,data:n,method:t.method,action:e},e,n))}}))}function Se(s){function a(o){return Vl(o,s)}ft!==null&&Vl(ft,s),bt!==null&&Vl(bt,s),gt!==null&&Vl(gt,s),bn.forEach(a),gn.forEach(a);for(var t=0;t<wt.length;t++){var e=wt[t];e.blockedOn===s&&(e.blockedOn=null)}for(;0<wt.length&&(t=wt[0],t.blockedOn===null);)pv(t),t.blockedOn===null&&wt.shift();if(t=(s.ownerDocument||s).$$reactFormReplay,t!=null)for(e=0;e<t.length;e+=3){var n=t[e],l=t[e+1],i=n[Ys]||null;if(typeof l=="function")i||hv(t);else if(i){var d=null;if(l&&l.hasAttribute("formAction")){if(n=l,i=l[Ys]||null)d=i.formAction;else if(eo(n)!==null)continue}else d=i.action;typeof d=="function"?t[e+1]=d:(t.splice(e,3),e-=3),hv(t)}}}function fv(){function s(l){l.canIntercept&&l.info==="react-transition"&&l.intercept({handler:function(){return new Promise(function(i){return n=i})},focusReset:"manual",scroll:"manual"})}function a(){n!==null&&(n(),n=null),e||setTimeout(t,20)}function t(){if(!e&&!navigation.transition){var l=navigation.currentEntry;l&&l.url!=null&&navigation.navigate(l.url,{state:l.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var e=!1,n=null;return navigation.addEventListener("navigate",s),navigation.addEventListener("navigatesuccess",a),navigation.addEventListener("navigateerror",a),setTimeout(t,100),function(){e=!0,navigation.removeEventListener("navigate",s),navigation.removeEventListener("navigatesuccess",a),navigation.removeEventListener("navigateerror",a),n!==null&&(n(),n=null)}}}function lo(s){this._internalRoot=s}Ul.prototype.render=lo.prototype.render=function(s){var a=this._internalRoot;if(a===null)throw Error(_(409));var t=a.current,e=ia();dv(t,e,s,a,null,null)},Ul.prototype.unmount=lo.prototype.unmount=function(){var s=this._internalRoot;if(s!==null){this._internalRoot=null;var a=s.containerInfo;dv(s.current,2,null,s,null,null),wl(),a[Zt]=null}};function Ul(s){this._internalRoot=s}Ul.prototype.unstable_scheduleHydration=function(s){if(s){var a=Mo();s={blockedOn:null,target:s,priority:a};for(var t=0;t<wt.length&&a!==0&&a<wt[t].priority;t++);wt.splice(t,0,s),t===0&&pv(s)}};var bv=S.version;if(bv!=="19.2.7")throw Error(_(527,bv,"19.2.7"));B.findDOMNode=function(s){var a=s._reactInternals;if(a===void 0)throw typeof s.render=="function"?Error(_(188)):(s=Object.keys(s).join(","),Error(_(268,s)));return s=C(a),s=s!==null?U(s):null,s=s===null?null:s.stateNode,s};var a1={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:m,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Rl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Rl.isDisabled&&Rl.supportsFiber)try{Be=Rl.inject(a1),$s=Rl}catch{}}return kn.createRoot=function(s,a){if(!M(s))throw Error(_(299));var t=!1,e="",n=Cr,l=Sr,i=Mr;return a!=null&&(a.unstable_strictMode===!0&&(t=!0),a.identifierPrefix!==void 0&&(e=a.identifierPrefix),a.onUncaughtError!==void 0&&(n=a.onUncaughtError),a.onCaughtError!==void 0&&(l=a.onCaughtError),a.onRecoverableError!==void 0&&(i=a.onRecoverableError)),a=lv(s,1,!1,null,null,t,e,null,n,l,i,fv),s[Zt]=a.current,Rd(s),new lo(a)},kn.hydrateRoot=function(s,a,t){if(!M(s))throw Error(_(299));var e=!1,n="",l=Cr,i=Sr,d=Mr,o=null;return t!=null&&(t.unstable_strictMode===!0&&(e=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onUncaughtError!==void 0&&(l=t.onUncaughtError),t.onCaughtError!==void 0&&(i=t.onCaughtError),t.onRecoverableError!==void 0&&(d=t.onRecoverableError),t.formState!==void 0&&(o=t.formState)),a=lv(s,1,!0,a,t??null,e,n,o,l,i,d,fv),a.context=iv(null),t=a.current,e=ia(),e=Fl(e),n=nt(e),n.callback=null,lt(t,n,e),t=e,a.current.lanes=t,Te(a,t),Da(a),s[Zt]=a.current,Rd(s),new Ul(a)},kn.version="19.2.7",kn}var Bv;function u1(){if(Bv)return co.exports;Bv=1;function v(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(v)}catch(S){console.error(S)}}return v(),co.exports=r1(),co.exports}var v1=u1();const p1=[{id:"buttons",title:"Buttons",desc:"Trigger actions, submit forms, and navigate flows. Use one primary action per view: secondary and invisible variants for supporting actions.",html:`<section class="ds-chapter ds-tab-panel is-active" id="buttons" role="tabpanel" aria-labelledby="tab-buttons">
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
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6h8M4 10h8M6 3v10M10 3v10"/></svg></span>
    <span class="tds-sort-button__trigger-default">Sort</span>
  </button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Sort · open</span>
<div class="tds-sort-button">
  <button type="button" class="tds-btn tds-btn--md tds-btn--secondary">
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6h8M4 10h8M6 3v10M10 3v10"/></svg></span>
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
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6h8M4 10h8M6 3v10M10 3v10"/></svg></span>
    <span class="tds-sort-button__trigger-label"><span class="tds-sort-button__trigger-prefix">Sort:</span><span class="tds-sort-button__trigger-value">Name A → Z</span></span>
  </button>
</div></div>
        <div class="ds-state-demo"><span class="ds-state-demo__label">Sort · selected · open</span>
<div class="tds-sort-button tds-sort-button--selected">
  <button type="button" class="tds-btn tds-btn--md tds-btn--secondary">
    <span class="tds-btn__leading-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6h8M4 10h8M6 3v10M10 3v10"/></svg></span>
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
    </section>`},{id:"inputs",title:"Inputs",desc:"Collect and validate business data. Pair labels with fields, surface errors inline, and prefer large fields for high-stakes KYB forms.",html:`<section class="ds-chapter ds-tab-panel" id="inputs" role="tabpanel" aria-labelledby="tab-inputs" hidden>
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
    </section>`},{id:"controls",title:"Controls",desc:"Binary and single-select choices: checkboxes, radios, switches, and radio cards. Entire rows should be clickable, not just the control.",html:`<section class="ds-chapter ds-tab-panel" id="controls" role="tabpanel" aria-labelledby="tab-controls" hidden>
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
    </section>`},{id:"tags",title:"Tags & Counters",desc:"Compact status indicators and numeric badges. Use semantic colors for risk states; counters annotate tabs, filters, and buttons.",html:`<section class="ds-chapter ds-tab-panel" id="tags" role="tabpanel" aria-labelledby="tab-tags" hidden>
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
    </section>`},{id:"navigation",title:"Navigation",desc:"Wayfinding across workspaces: tabs, filter chips, nav lists, breadcrumbs, and dropdown panels. Keep hierarchy flat and scannable.",html:`<section class="ds-chapter ds-tab-panel" id="navigation" role="tabpanel" aria-labelledby="tab-navigation" hidden>
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

      </section>`},{id:"disclosure",title:"Accordion",desc:"Expandable sections for progressive disclosure: KYB entity details, verification steps, and nested metadata. Tags and counter sit in the trailing group with action and chevron.",html:`<section class="ds-chapter ds-tab-panel" id="disclosure" role="tabpanel" aria-labelledby="tab-disclosure" hidden>
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

      </section>`},{id:"data",title:"Data tables",desc:"Dense entity lists with sortable columns, row actions, and skeleton loading. Tables scroll horizontally on narrow viewports.",html:`<section class="ds-chapter ds-tab-panel" id="data" role="tabpanel" aria-labelledby="tab-data" hidden>
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

      </section>`},{id:"typography",title:"Typography",desc:"Figma text styles mapped to utility classes. Inter for UI, Tobias for display.",html:`<section class="ds-chapter ds-tab-panel" id="typography" role="tabpanel" aria-labelledby="tab-typography" hidden>
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
    </section>`},{id:"tokens",title:"Design tokens",desc:"Reference documentation for color, typography, spacing, radius, and elevation tokens. Source of truth: <code>tokens/tokens.css</code> and Figma ADS 2026.",html:`<section class="ds-chapter ds-tab-panel" id="tokens" role="tabpanel" aria-labelledby="tab-tokens" hidden>
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
</section>`}],ql=[{id:"buttons",label:"Buttons",icon:"buttons"},{id:"inputs",label:"Inputs",icon:"inputs"},{id:"controls",label:"Controls",icon:"controls"},{id:"tags",label:"Tags",icon:"tags"},{id:"navigation",label:"Navigation",icon:"navigation"},{id:"disclosure",label:"Disclosure",icon:"disclosure"},{id:"data",label:"Data",icon:"data"},{id:"typography",label:"Typography",icon:"typography"},{id:"tokens",label:"Tokens",icon:"tokens"},{id:"tracker",label:"Tracker",icon:"tracker"}],_1=ql.map(v=>v.id),h1=[{title:"Token-driven",body:"Colors, type, and spacing from tokens.css. Never hard-code hex values."},{title:"Figma parity",body:"Every tds- class traces to a component in Trulioo ADS 2026."},{title:"Copy & ship",body:"Grab the markup from each demo and drop it into your feature branch."}],Ev={buttons:'<rect fill="none" stroke="currentColor" stroke-width="2" x="2" y="7" width="20" height="10" rx="2"/>',inputs:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M7 22h1a4 4 0 0 0 4-4v-1"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M7 2h1a4 4 0 0 1 4 4v1"/>',controls:'<rect fill="none" stroke="currentColor" stroke-width="2" x="2" y="6" width="20" height="12" rx="6"/><circle cx="8" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="2"/>',tags:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" stroke="none"/>',navigation:'<rect fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" x="3" y="3" width="18" height="18" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 3v18"/>',disclosure:'<rect fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" x="3" y="3" width="18" height="18" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M3 9h18"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m9 15 3 3 3-3"/>',data:'<rect fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" x="3" y="3" width="18" height="18" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M3 9h18M3 15h18M12 3v18"/>',typography:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 7V4h16v3"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 20h6"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 4v16"/>',tokens:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5S13 7 12 2c-1 5-2 6.4-4 8.5S5 17 5 15a7 7 0 0 0 7 7z"/>',tracker:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 19V5"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M10 19V9"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16 19v-6"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M22 19V11"/>'};function f1({name:v}){return c.jsx("svg",{className:"tds-preview__nav-glyph",width:"16",height:"16",viewBox:"0 0 24 24","aria-hidden":"true",dangerouslySetInnerHTML:{__html:Ev[v]??""}})}function b1(){return c.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"tds-preview__icon-sprite","aria-hidden":"true",focusable:"false",children:Object.entries(Ev).map(([v,S])=>c.jsx("symbol",{id:`pr-i-${v}`,viewBox:"0 0 24 24",dangerouslySetInnerHTML:{__html:S}},v))})}function g1({activeTab:v,isHome:S,isOpen:T,onSelect:_,onHome:M,onToggle:N}){return c.jsxs("aside",{className:"tds-preview__sidebar","aria-label":"Component navigation","data-expanded":T,children:[c.jsxs("div",{className:"tds-preview__sidebar-inner",children:[c.jsxs("button",{type:"button",className:"tds-preview__brand",onClick:M,"aria-current":S?"page":void 0,children:[c.jsx("span",{className:"tds-preview__brand-mark",children:"TDS"}),c.jsxs("span",{className:"tds-preview__brand-text",children:[c.jsx("span",{className:"tds-preview__brand-name",children:"Trulioo DS"}),c.jsx("span",{className:"tds-preview__brand-tag",children:"Component reference"})]})]}),c.jsx("p",{className:"tds-preview__nav-label",children:"Components"}),c.jsx("nav",{className:"tds-preview__nav",role:"tablist","aria-label":"Components",children:ql.map(V=>{const j=!S&&V.id===v;return c.jsxs("button",{type:"button",className:`tds-preview__nav-link${j?" is-active":""}`,role:"tab",id:`tab-${V.id}`,"aria-selected":j,tabIndex:j?0:-1,"aria-label":V.label,title:V.label,onClick:()=>_(V.id),children:[c.jsx("span",{className:"tds-preview__nav-icon","aria-hidden":"true",children:c.jsx(f1,{name:V.icon})}),c.jsx("span",{className:"tds-preview__nav-label-text",children:V.label})]},V.id)})}),c.jsxs("div",{className:"tds-preview__sidebar-footer",children:[c.jsxs("p",{children:["Synced from"," ",c.jsx("a",{href:"https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026",target:"_blank",rel:"noopener noreferrer",children:"Figma ADS 2026"})]}),c.jsxs("p",{className:"tds-preview__sidebar-note",children:["Classes use the ",c.jsx("code",{children:"tds-"})," prefix."]})]})]}),c.jsx("button",{type:"button",className:"tds-preview__sidebar-toggle",onClick:N,"aria-label":"Collapse sidebar","aria-expanded":T,children:c.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14","aria-hidden":"true",children:c.jsx("path",{d:"M9 3L4 7l5 4",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]})}function w1({activeLabel:v,activeTab:S,isHome:T,sidebarOpen:_,onSelect:M,onHome:N,onToggleSidebar:V}){return c.jsxs("header",{className:"tds-preview__topbar",children:[c.jsxs("div",{className:"tds-preview__topbar-row",children:[c.jsx("button",{type:"button",className:"tds-preview__topbar-menu",onClick:V,"aria-label":_?"Close sidebar":"Open sidebar","aria-expanded":_,children:c.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:c.jsx("path",{d:"M2.5 4h11M2.5 8h11M2.5 12h11",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}),c.jsxs("button",{type:"button",className:"tds-preview__topbar-brand",onClick:N,children:[c.jsx("span",{className:"tds-preview__topbar-mark",children:"TDS"}),c.jsx("span",{className:"tds-preview__topbar-title",children:T?"Overview":v})]})]}),c.jsx("nav",{className:"tds-preview__mobile-tabs",role:"tablist","aria-label":"Components",children:ql.map(j=>{const L=!T&&j.id===S;return c.jsx("button",{type:"button",className:`tds-preview__mobile-tab${L?" is-active":""}`,role:"tab","aria-selected":L,onClick:()=>M(j.id),children:j.label},j.id)})})]})}function m1({features:v,onExplore:S}){return c.jsxs("section",{className:"tds-preview__hero",children:[c.jsxs("div",{className:"tds-preview__hero-orbs","aria-hidden":"true",children:[c.jsx("div",{className:"tds-preview__hero-orb tds-preview__hero-orb--1"}),c.jsx("div",{className:"tds-preview__hero-orb tds-preview__hero-orb--2"}),c.jsx("div",{className:"tds-preview__hero-orb tds-preview__hero-orb--3"})]}),c.jsxs("div",{className:"tds-preview__hero-inner",children:[c.jsxs("div",{className:"tds-preview__hero-badge",children:[c.jsx("span",{className:"tds-preview__hero-badge-dot","aria-hidden":"true"}),"For product & engineering teams"]}),c.jsxs("h1",{className:"tds-preview__hero-title",children:["Build with",c.jsx("br",{}),c.jsx("span",{className:"tds-preview__hero-title-accent",children:"clarity."})]}),c.jsx("p",{className:"tds-preview__hero-lead",children:"A living reference for the Trulioo component library: what each piece does, when to use it, and the exact class names to apply. Pure CSS, mapped 1:1 from Figma."}),c.jsxs("div",{className:"tds-preview__hero-actions",children:[c.jsxs("button",{type:"button",className:"tds-preview__hero-cta",onClick:S,children:["Explore components",c.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:c.jsx("path",{d:"M3 8h10M9 4l4 4-4 4",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]}),c.jsx("a",{href:"https://www.figma.com/design/aMXWPoPQ94hxTKOhUngOih/Trulioo-ADS---2026",target:"_blank",rel:"noopener noreferrer",className:"tds-preview__hero-secondary",children:"Open in Figma"})]}),c.jsxs("div",{className:"tds-preview__hero-highlights",children:[c.jsx("p",{className:"tds-preview__hero-highlights-label",children:"Get the highlights."}),c.jsx("div",{className:"tds-preview__hero-grid",children:v.map((T,_)=>c.jsxs("article",{className:"tds-preview__hero-card",style:{animationDelay:`${240+_*80}ms`},children:[c.jsx("strong",{children:T.title}),c.jsx("span",{children:T.body})]},T.title))})]})]})]})}function zv({title:v,desc:S,eyebrow:T="Component family"}){return c.jsxs("header",{className:"tds-preview__chapter-header",children:[c.jsx("p",{className:"tds-preview__chapter-eyebrow",children:T}),c.jsx("h1",{className:"tds-preview__chapter-title",children:v}),c.jsx("p",{className:"tds-preview__chapter-desc",children:S})]})}function k1({section:v,active:S}){return c.jsxs("div",{className:`tds-preview__panel${S?" is-active":""}`,role:"tabpanel",id:v.id,"aria-labelledby":`tab-${v.id}`,hidden:!S,children:[c.jsx(zv,{title:v.title,desc:v.desc}),c.jsx("div",{className:"tds-preview__demos",dangerouslySetInnerHTML:{__html:v.html}})]})}const y1="2026-07-23T19:54:52.519Z",x1={totalComponents:49,cssDone:45,cssPartial:0,cssNotStarted:3,figmaDone:49,figmaEligible:49,figmaDonePercent:100,adoption:{preview:{used:41,total:44,percent:93},bv:{used:14,total:44,percent:32},dv:{used:15,total:44,percent:34}}},C1=JSON.parse('[{"id":"button","name":"Button","category":"Core Controls","figmaStatus":"Done","figmaVariants":72,"cssFile":"button/button.css","classPrefixes":["tds-btn"],"figmaNodeId":"96:2225","notes":"4 variants x 3 sizes x 5 states + alignment; loading boolean with spinner","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"icon-button","name":"IconButton","category":"Core Controls","figmaStatus":"Done","figmaVariants":168,"cssFile":"icon-button/icon-button.css","classPrefixes":["tds-icon-btn"],"figmaNodeId":"1371:22653","notes":"4 variants x 3 sizes x 7 states x 2 shapes; loading swaps icon for .tds-spinner--xs","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"button-group","name":"ButtonGroup","category":"Core Controls","figmaStatus":"Done","figmaVariants":15,"cssFile":"button-group/button-group.css","classPrefixes":["tds-button-group"],"subComponents":"Button, IconButton","figmaNodeId":"1952:33320","notes":"Segmented control; iconButtons, buttons, or mixed; count 2–5","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"spinner","name":"Spinner","category":"Core Controls","figmaStatus":"Done","figmaVariants":8,"cssFile":"spinner/spinner.css","classPrefixes":["tds-spinner","tds-spinner-block"],"figmaNodeId":"2092:18230","notes":"5 sizes (xs–xl); optional label block; used by Button and IconButton loading","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"button-menu","name":"ButtonMenu","category":"Core Controls","figmaStatus":"Done","figmaVariants":12,"cssFile":"button-menu/button-menu.css","classPrefixes":["tds-button-menu"],"subComponents":"DropdownPanel","figmaNodeId":"832:13390","notes":"Uses dropdown-panel for menu","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"switch","name":"Switch","category":"Core Controls","figmaStatus":"Done","figmaVariants":8,"cssFile":"switch/switch.css","classPrefixes":["tds-switch"],"figmaNodeId":"96:3234","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"checkbox","name":"Checkbox","category":"Core Controls","figmaStatus":"Done","figmaVariants":6,"cssFile":"checkbox/checkbox.css","classPrefixes":["tds-checkbox"],"figmaNodeId":"299:12998","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"dismiss-action","name":"DismissAction","category":"Core Controls","figmaStatus":"Done","figmaVariants":12,"cssFile":"dismiss-action/dismiss-action.css","classPrefixes":["tds-dismiss"],"figmaNodeId":"331:8149","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"text-input","name":"TextInput","category":"Form Inputs","figmaStatus":"Done","figmaVariants":97,"cssFile":"text-input/text-input.css","classPrefixes":["tds-text-input"],"subComponents":"FieldLabel, FieldCaption, FieldValidation","figmaNodeId":"96:3268","notes":"Imports shared atoms via @import","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":false},{"id":"select","name":"Select","category":"Form Inputs","figmaStatus":"Done","figmaVariants":30,"cssFile":"select/select.css","classPrefixes":["tds-select","tds-combobox"],"subComponents":"FieldLabel, FieldCaption, FieldValidation, Caret, DropdownPanel, Tag","figmaNodeId":"96:1624","notes":"Includes combobox variant","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"date-picker","name":"DatePicker","category":"Form Inputs","figmaStatus":"Done","cssFile":"date-picker/date-picker.css","classPrefixes":["tds-date-picker","tds-date-picker-range"],"subComponents":"FieldLabel, FieldCaption, FieldValidation","figmaNodeId":"1632:29292","notes":"Single and range calendar variants","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"radio","name":"Radio","category":"Form Inputs","figmaStatus":"Done","figmaVariants":6,"cssFile":"_shared/radio/radio.css","classPrefixes":["tds-radio"],"figmaNodeId":"100:4253","notes":"Shared atom","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"radio-group","name":"RadioGroup","category":"Form Inputs","figmaStatus":"Done","figmaVariants":6,"cssFile":"radio-group/radio-group.css","classPrefixes":["tds-radio-group"],"subComponents":"Radio","figmaNodeId":"100:4222","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"radio-card","name":"RadioCard","category":"Form Inputs","figmaStatus":"Done","figmaVariants":2,"cssFile":"radio-card/radio-card.css","classPrefixes":["tds-radio-card"],"subComponents":"Radio, Checkbox","figmaNodeId":"359:3332","notes":"single-selection (radio) or multi-selection (checkbox)","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"field-label","name":"FieldLabel","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":2,"cssFile":"_shared/field-label/field-label.css","classPrefixes":["tds-field-label"],"figmaNodeId":"107:2085","notes":"Used by TextInput, Select","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":false},{"id":"field-caption","name":"FieldCaption","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":0,"cssFile":"_shared/field-caption/field-caption.css","classPrefixes":["tds-field-caption"],"notes":"Used by TextInput, Select","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"field-validation","name":"FieldValidation","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":2,"cssFile":"_shared/field-validation/field-validation.css","classPrefixes":["tds-field-validation"],"figmaNodeId":"107:2078","notes":"Used by TextInput, Select","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":false},{"id":"caret","name":"Caret","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":3,"cssFile":"_shared/caret/caret.css","classPrefixes":["tds-caret"],"figmaNodeId":"640:9140","notes":"Used by Select, Tooltip","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"dropdown-panel","name":"DropdownPanel","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":12,"cssFile":"_shared/dropdown-panel/dropdown-panel.css","classPrefixes":["tds-dropdown-panel"],"subComponents":"ActionListItem","figmaNodeId":"320:21652","notes":"Positioning rules — (1) content-sized, (2) start/end align with auto-flip, (3) min-width = trigger, (4) viewport overflow clamp. Used by Select, ButtonMenu, FilterButton, SortButton","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"tag","name":"Tag","category":"Shared Atoms","figmaStatus":"Done","figmaVariants":112,"cssFile":"_shared/tag/tag.css","classPrefixes":["tds-tag"],"figmaNodeId":"331:8199","notes":"Used by Select, Accordion","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"ai-tag","name":"AITag","category":"Data Display","figmaStatus":"Done","figmaVariants":4,"cssFile":"ai-tag/ai-tag.css","classPrefixes":["tds-ai-tag"],"figmaNodeId":"1821:33907","notes":"TruAI badge; sparkles icon always required","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"side-nav","name":"SideNav","category":"Navigation","figmaStatus":"Done","figmaVariants":3,"cssFile":"side-nav/side-nav.css","classPrefixes":["tds-side-nav","tds-side-nav-preview"],"subComponents":"NavItem, NavList, SubItem, UserProfile","figmaNodeId":"1188:10384","notes":"3 modes: expanded, collapsed, mobile","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"nav-item","name":"NavItem","category":"Navigation","figmaStatus":"Done","figmaVariants":15,"cssFile":"side-nav/nav-item/nav-item.css","classPrefixes":["tds-side-nav__nav-item"],"notes":"Nested under side-nav/","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"nav-list","name":"NavList","category":"Navigation","figmaStatus":"Done","figmaVariants":0,"cssFile":"side-nav/nav-list/nav-list.css","classPrefixes":["tds-nav-list"],"notes":"Nested under side-nav/","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"tabs","name":"Tabs","category":"Navigation","figmaStatus":"Done","figmaVariants":10,"cssFile":"tabs/tabs.css","classPrefixes":["tds-tabs"],"subComponents":"TabItem","figmaNodeId":"405:8964","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"tab-item","name":"TabItem","category":"Navigation","figmaStatus":"Done","figmaVariants":4,"cssFile":"tabs/tab-item/tab-item.css","classPrefixes":["tds-tab-item"],"figmaNodeId":"403:5492","notes":"Nested under tabs/","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"filter-tab","name":"FilterTabs","category":"Navigation","figmaStatus":"Done","figmaVariants":3,"cssFile":"filter-tab/filter-tab.css","classPrefixes":["tds-filter-tab","tds-filter-tabs"],"subComponents":"FilterTabsItem","figmaNodeId":"844:6968","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"breadcrumb","name":"Breadcrumb","category":"Navigation","figmaStatus":"Done","cssFile":"breadcrumb/breadcrumb.css","classPrefixes":["tds-breadcrumbs","tds-breadcrumb-item"],"figmaNodeId":"1596:23587","notes":"BreadCrumbs container, item, and divider","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"filter-tab-2","name":"FilterTabsItem","category":"Navigation","figmaStatus":"Done","figmaVariants":12,"cssFile":"filter-tab/filter-tab.css","notes":"Shares CSS file with FilterTabs; adoption tracked on FilterTabs","classPrefixes":[],"cssStatus":"Done","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"data-table","name":"DataTable","category":"Data Display","figmaStatus":"Done","figmaVariants":12,"cssFile":"data-table/data-table.css","classPrefixes":["tds-data-table","tds-data-table-container"],"subComponents":"ColumnHeaderCell, Row, Header, SortButton, Signals, SectionHeader","figmaNodeId":"884:13685","notes":"Complex composite with many sub-components","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"data-field","name":"DataField","category":"Data Display","figmaStatus":"Done","figmaVariants":24,"cssFile":"data-field/data-field.css","classPrefixes":["tds-data-field"],"figmaNodeId":"856:13029","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"counter-label","name":"CounterLabel","category":"Data Display","figmaStatus":"Done","figmaVariants":24,"cssFile":"counter-label/counter-label.css","classPrefixes":["tds-counter"],"figmaNodeId":"409:9115","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"section-header","name":"SectionHeader","category":"Data Display","figmaStatus":"Done","figmaVariants":32,"cssFile":"section-header/section-header.css","classPrefixes":["tds-section-header"],"figmaNodeId":"1816:29234","notes":"Groups table sections; composes Tag, Counter, Button","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"dismiss-issue-badge","name":"DismissIssueBadge","category":"Data Display","figmaStatus":"Done","figmaVariants":12,"cssFile":"dismiss-issue-badge/dismiss-issue-badge.css","classPrefixes":["tds-dismiss-badge"],"figmaNodeId":"331:8174","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"flag-icon","name":"CountryFlag","category":"Data Display","figmaStatus":"Done","figmaVariants":255,"cssFile":"flag-icon/flag-icon.css","classPrefixes":["fi","tds-select__country-flag"],"figmaNodeId":"299:8750","notes":"255 country codes","cssStatus":"Done","usedInPreview":true,"usedInBV":true,"usedInDV":true},{"id":"action-list-item","name":"ActionListItem","category":"Data Display","figmaStatus":"Done","figmaVariants":0,"cssFile":"action-list-item/action-list-item.css","classPrefixes":["tds-action-list-item"],"notes":"Used inside DropdownPanel","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":true},{"id":"stat-card","name":"StatCard","category":"Data Display","figmaStatus":"Done","figmaVariants":2,"cssFile":"stat-card/stat-card.css","classPrefixes":["tds-stat-card"],"figmaNodeId":"915:9281","cssStatus":"Done","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"tooltip","name":"Tooltip","category":"Feedback","figmaStatus":"Done","figmaVariants":16,"cssFile":"tooltip/tooltip.css","classPrefixes":["tds-tooltip"],"subComponents":"Caret","figmaNodeId":"1054:18565","notes":"Body + Caret sub-components","cssStatus":"Done","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"announcement","name":"Announcement","category":"Feedback","figmaStatus":"Done","figmaVariants":10,"cssFile":"announcement/announcement.css","classPrefixes":["tds-announcement"],"figmaNodeId":"866:13118","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":true},{"id":"accordion","name":"Accordion","category":"Containers","figmaStatus":"Done","figmaVariants":102,"cssFile":"accordion/accordion.css","classPrefixes":["tds-accordion"],"subComponents":"Tag, CounterLabel, DataFieldList","figmaNodeId":"810:5659","notes":"Complex component with many states","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"progress-indicator","name":"ProgressIndicator","category":"Progress","figmaStatus":"Done","figmaVariants":18,"cssFile":"progress-indicator/progress-indicator.css","classPrefixes":["tds-progress-indicator"],"subComponents":"_ProgressIndicatorItem","figmaNodeId":"1242:22104","notes":"Horizontal step progress","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":true},{"id":"step-progress","name":"StepProgress","category":"Progress","figmaStatus":"Done","figmaVariants":7,"classPrefixes":[],"subComponents":"_StepProgressItem","figmaNodeId":"1264:24192","notes":"Figma only, CSS pending","cssStatus":"Not Started","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"listed-progress-item","name":"ListedProgressItem","category":"Progress","figmaStatus":"Done","figmaVariants":6,"classPrefixes":[],"subComponents":"Button, Link, IconButton, Tag","figmaNodeId":"1267:24260","notes":"Figma only, CSS pending","cssStatus":"Not Started","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"score-gauge","name":"ScoreGauge","category":"Scoring","figmaStatus":"Done","figmaVariants":0,"cssFile":"score-gauge/score-gauge.css","classPrefixes":["score-gauge"],"notes":"SVG-based, has JS + React variants","cssStatus":"Done","usedInPreview":false,"usedInBV":false,"usedInDV":true},{"id":"score-card","name":"ScoreCard","category":"Scoring","figmaStatus":"Done","figmaVariants":3,"classPrefixes":[],"subComponents":"ScoreGauge","figmaNodeId":"916:9298","notes":"CSS pending","cssStatus":"Not Started","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"risk-category-card","name":"RiskCategoryCard","category":"Scoring","figmaStatus":"Done","figmaVariants":3,"cssFile":"risk-category-card/risk-category-card.css","classPrefixes":["tds-risk-category-card"],"figmaNodeId":"920:9307","notes":"Category title, risk tag, signal count, and score out of 100","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"font-awesome-icon","name":"FontAwesome Icon","category":"Utility","figmaStatus":"Done","figmaVariants":42,"classPrefixes":[],"figmaNodeId":"544:9787","notes":"Icon system, no standalone CSS","cssStatus":"N/A","usedInPreview":false,"usedInBV":false,"usedInDV":false},{"id":"filter-button","name":"FilterButton","category":"Utility","figmaStatus":"Done","figmaVariants":6,"cssFile":"filter-button/filter-button.css","classPrefixes":["tds-filter-button"],"subComponents":"DropdownPanel, CounterLabel","figmaNodeId":"836:13511","notes":"Selected trigger shows value + xmark clear; counter only with 2+ active filters (+N); clear resets all selections via tds-filter-clear","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false},{"id":"sort-button","name":"SortButton","category":"Utility","figmaStatus":"Done","figmaVariants":4,"cssFile":"data-table/sort-button/sort-button.css","classPrefixes":["tds-sort-button"],"subComponents":"DropdownPanel","figmaNodeId":"2191:46183","notes":"Selected trigger shows sort value + xmark clear; open selected reverts label to Sort; clear resets via tds-sort-clear","cssStatus":"Done","usedInPreview":true,"usedInBV":false,"usedInDV":false}]'),S1=[{name:"Dialog / Modal",category:"Feedback",priority:"High",description:"Overlay dialog with backdrop, header, body, footer actions",dependsOn:"Button, DismissAction",notes:"Common pattern in KYB flows"},{name:"Toast / Snackbar",category:"Feedback",priority:"High",description:"Temporary notification bar with auto-dismiss",dependsOn:"DismissAction",notes:"For success/error feedback"},{name:"Alert / InlineNotification",category:"Feedback",priority:"High",description:"Persistent inline message with icon and dismiss",dependsOn:"DismissAction",notes:"Replaces Announcement for inline use"},{name:"Badge",category:"Data Display",priority:"High",description:"Small count or status indicator on icons/avatars",notes:"Needed for nav items, notifications"},{name:"Avatar",category:"Data Display",priority:"High",description:"User/entity photo or initials circle",notes:"Used in SideNav UserProfile, comments"},{name:"Pagination",category:"Navigation",priority:"High",description:"Page navigation with prev/next and page numbers",dependsOn:"Button, IconButton",notes:"Used with DataTable"},{name:"Skeleton / Loading",category:"Feedback",priority:"Medium",description:"Shimmer placeholder for loading states",notes:"For progressive content loading"},{name:"Popover",category:"Feedback",priority:"Medium",description:"Anchored floating content panel (non-modal)",dependsOn:"Caret, DropdownPanel",notes:"For rich hover/click content"},{name:"Card",category:"Containers",priority:"Medium",description:"Bordered content container with header and actions",notes:"General-purpose content wrapper"},{name:"Divider",category:"Utility",priority:"Medium",description:"Horizontal or vertical separator line",notes:"For section separation"},{name:"Textarea",category:"Form Inputs",priority:"Medium",description:"Multi-line text input with auto-resize",dependsOn:"FieldLabel, FieldCaption, FieldValidation",notes:"For notes, comments"},{name:"SearchInput",category:"Form Inputs",priority:"Medium",description:"Text input with search icon and clear action",dependsOn:"TextInput, DismissAction",notes:"For filtering lists/tables"},{name:"Slider / RangeInput",category:"Form Inputs",priority:"Low",description:"Continuous or stepped range selector",notes:"For score thresholds"},{name:"FileUpload",category:"Form Inputs",priority:"Low",description:"Drag-and-drop or click-to-browse file input",dependsOn:"Button",notes:"For document upload flows"},{name:"ProgressBar",category:"Progress",priority:"Low",description:"Linear determinate/indeterminate progress",notes:"For upload/processing progress"},{name:"EmptyState",category:"Feedback",priority:"Low",description:"Illustration + message for zero-data scenarios",dependsOn:"Button",notes:"For empty tables, search results"},{name:"TopNav / AppBar",category:"Navigation",priority:"Low",description:"Horizontal top navigation bar",dependsOn:"Button, Avatar, Badge",notes:"If app needs a top bar"},{name:"SegmentedControl",category:"Core Controls",priority:"Low",description:"Toggle between 2–5 mutually exclusive options",notes:"Alternative to Tabs for settings"},{name:"Timeline",category:"Data Display",priority:"Low",description:"Vertical timeline with events and connectors",notes:"For entity history/audit trail"},{name:"TreeView",category:"Navigation",priority:"Low",description:"Hierarchical collapsible list",notes:"For nested entity structures"}],M1=["Unlisted component folder in Components/: risk-category-strip"],B1={lastBuiltAt:y1,summary:x1,components:C1,planned:S1,warnings:M1},D1=B1;function yn({value:v,max:S=100,label:T,tone:_="brand",size:M="sm"}){const N=S>0?Math.min(100,Math.round(v/S*100)):0;return c.jsx("div",{className:`tds-preview__tracker-progress tds-preview__tracker-progress--${_} tds-preview__tracker-progress--${M}`,role:"progressbar","aria-valuenow":N,"aria-valuemin":0,"aria-valuemax":100,"aria-label":T,children:c.jsx("div",{className:"tds-preview__tracker-progress-fill",style:{width:`${N}%`}})})}function T1({segments:v,total:S,label:T}){const _=S>0?S:1;return c.jsxs("div",{className:"tds-preview__tracker-segmented",role:"img","aria-label":T,children:[c.jsx("div",{className:"tds-preview__tracker-segmented-track",children:v.map(M=>{const N=M.value/_*100;return N<=0?null:c.jsx("div",{className:`tds-preview__tracker-segment tds-preview__tracker-segment--${M.tone}`,style:{width:`${N}%`},title:`${M.label}: ${M.value}`},M.label)})}),c.jsx("ul",{className:"tds-preview__tracker-segmented-legend",children:v.map(M=>c.jsxs("li",{className:`tds-preview__tracker-stat-chip tds-preview__tracker-stat-chip--${M.tone}`,children:[c.jsx("span",{className:"tds-preview__tracker-stat-chip-value",children:M.value}),c.jsx("span",{className:"tds-preview__tracker-stat-chip-label",children:M.label})]},M.label))})]})}function L1(v){return v>=1?"positive":v>=.5?"intermediate":v>0?"brand":"neutral"}function Dv({title:v,description:S,rows:T,valueSuffix:_="",showPercent:M=!0,compact:N=!1}){return c.jsxs("article",{className:`tds-preview__tracker-chart${N?" tds-preview__tracker-chart--compact":""}`,children:[c.jsxs("header",{className:"tds-preview__tracker-chart-header",children:[c.jsx("h4",{className:"tds-preview__tracker-chart-title",children:v}),S&&c.jsx("p",{className:"tds-preview__tracker-chart-lead",children:S})]}),c.jsx("ul",{className:"tds-preview__tracker-bar-chart",children:T.map(V=>{const j=V.max>0?Math.min(100,Math.round(V.value/V.max*100)):0,L=V.tone??L1(V.value/V.max);return c.jsxs("li",{className:"tds-preview__tracker-bar-row",children:[c.jsxs("div",{className:"tds-preview__tracker-bar-head",children:[c.jsx("span",{className:"tds-preview__tracker-bar-label",children:V.label}),c.jsxs("span",{className:"tds-preview__tracker-bar-value",children:[M&&c.jsxs("strong",{className:"tds-preview__tracker-bar-percent",children:[j,"%"]}),(V.meta||!M)&&c.jsxs("span",{className:"tds-preview__tracker-bar-detail",children:[!M&&c.jsxs(c.Fragment,{children:[V.value,_]}),V.meta&&c.jsxs("span",{className:"tds-preview__tracker-bar-meta",children:[!M&&_?" · ":"",V.meta]})]})]})]}),c.jsx("div",{className:"tds-preview__tracker-bar-track","aria-hidden":"true",children:c.jsx("div",{className:`tds-preview__tracker-bar-fill tds-preview__tracker-bar-fill--${L}`,style:{width:`${j}%`}})})]},V.label)})})]})}function A1({summary:v}){return c.jsxs("div",{className:"tds-preview__tracker-metrics",children:[c.jsxs("article",{className:"tds-preview__tracker-metric",children:[c.jsx("span",{className:"tds-preview__tracker-metric-label",children:"CSS built"}),c.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[v.cssDone,c.jsxs("span",{className:"tds-preview__tracker-metric-total",children:[" / ",v.totalComponents]})]}),c.jsx(yn,{value:v.cssDone,max:v.totalComponents,label:`CSS built: ${v.cssDone} of ${v.totalComponents}`,tone:"positive"}),c.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:[v.cssPartial," partial · ",v.cssNotStarted," not started"]})]}),c.jsxs("article",{className:"tds-preview__tracker-metric",children:[c.jsx("span",{className:"tds-preview__tracker-metric-label",children:"Figma complete"}),c.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[v.figmaDonePercent,"%"]}),c.jsx(yn,{value:v.figmaDonePercent,label:`Figma complete: ${v.figmaDonePercent}%`,tone:"positive"}),c.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:[v.figmaDone," of ",v.figmaEligible," components"]})]}),c.jsxs("article",{className:"tds-preview__tracker-metric",children:[c.jsx("span",{className:"tds-preview__tracker-metric-label",children:"Preview adoption"}),c.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[v.adoption.preview.percent,"%"]}),c.jsx(yn,{value:v.adoption.preview.percent,label:`Preview adoption: ${v.adoption.preview.percent}%`,tone:"positive"}),c.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:[v.adoption.preview.used," of ",v.adoption.preview.total," built"]})]}),c.jsxs("article",{className:"tds-preview__tracker-metric",children:[c.jsx("span",{className:"tds-preview__tracker-metric-label",children:"BV adoption"}),c.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[v.adoption.bv.percent,"%"]}),c.jsx(yn,{value:v.adoption.bv.percent,label:`BV adoption: ${v.adoption.bv.percent}%`,tone:"intermediate"}),c.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:[v.adoption.bv.used," of ",v.adoption.bv.total," built"]})]}),c.jsxs("article",{className:"tds-preview__tracker-metric",children:[c.jsx("span",{className:"tds-preview__tracker-metric-label",children:"DV adoption"}),c.jsxs("strong",{className:"tds-preview__tracker-metric-value",children:[v.adoption.dv.percent,"%"]}),c.jsx(yn,{value:v.adoption.dv.percent,label:`DV adoption: ${v.adoption.dv.percent}%`,tone:"brand"}),c.jsxs("span",{className:"tds-preview__tracker-metric-meta",children:[v.adoption.dv.used," of ",v.adoption.dv.total," built"]})]})]})}function E1(v,S){return v.filter(T=>T.cssStatus===S).length}function z1(v){const S=["High","Medium","Low"],T=new Map;for(const M of v)T.set(M.priority,(T.get(M.priority)??0)+1);const _={High:"negative",Medium:"intermediate",Low:"neutral"};return S.filter(M=>T.has(M)).map(M=>({label:M,value:T.get(M)??0,max:v.length,meta:`${T.get(M)??0} items`,tone:_[M]}))}function N1({summary:v,components:S,planned:T}){const _=js.useMemo(()=>E1(S,"N/A"),[S]),M=js.useMemo(()=>[{label:"Done",value:v.cssDone,tone:"positive"},{label:"Partial",value:v.cssPartial,tone:"intermediate"},{label:"Not started",value:v.cssNotStarted,tone:"negative"},{label:"N/A",value:_,tone:"neutral"}],[v.cssDone,v.cssPartial,v.cssNotStarted,_]),N=js.useMemo(()=>[{label:"Preview",value:v.adoption.preview.percent,max:100,meta:`${v.adoption.preview.used}/${v.adoption.preview.total} used`,tone:"positive"},{label:"Bank verification",value:v.adoption.bv.percent,max:100,meta:`${v.adoption.bv.used}/${v.adoption.bv.total} used`,tone:"intermediate"},{label:"Document verification",value:v.adoption.dv.percent,max:100,meta:`${v.adoption.dv.used}/${v.adoption.dv.total} used`,tone:"brand"}],[v.adoption]),V=js.useMemo(()=>z1(T),[T]);return c.jsx("div",{className:"tds-preview__tracker-charts","aria-label":"Progress charts",children:c.jsxs("div",{className:"tds-preview__tracker-charts-layout",children:[c.jsxs("article",{className:"tds-preview__tracker-chart",children:[c.jsx("h3",{className:"tds-preview__tracker-chart-title",children:"Build status"}),c.jsxs("p",{className:"tds-preview__tracker-chart-lead",children:[v.cssDone," of ",v.totalComponents," components have finished CSS"]}),c.jsx(T1,{segments:M,total:v.totalComponents,label:`CSS build status: ${v.cssDone} done, ${v.cssPartial} partial, ${v.cssNotStarted} not started, ${_} not applicable`})]}),c.jsxs("div",{className:"tds-preview__tracker-charts-pair",children:[c.jsx(Dv,{title:"Adoption by page",description:"Share of built components used on each demo page",rows:N}),T.length>0&&c.jsx(Dv,{title:"Backlog by priority",description:`${T.length} components queued`,rows:V,showPercent:!0})]})]})})}function ho({title:v,desc:S,actions:T,children:_}){return c.jsxs("section",{className:"tds-preview__tracker-showcase",children:[c.jsxs("header",{className:"tds-preview__tracker-showcase__head",children:[c.jsxs("div",{className:"tds-preview__tracker-showcase__copy",children:[c.jsx("h2",{className:"tds-preview__tracker-showcase__title",children:v}),S&&c.jsx("p",{className:"tds-preview__tracker-showcase__desc",children:S})]}),T&&c.jsx("div",{className:"tds-preview__tracker-showcase__actions",children:T})]}),c.jsx("div",{className:"tds-preview__tracker-showcase__body",children:_})]})}function Tv({status:v}){const S=v.toLowerCase().replace(/\s+/g,"-");return c.jsx("span",{className:`tds-preview__tracker-pill tds-preview__tracker-pill--${S}`,children:v})}function po({used:v}){return c.jsxs("span",{className:`tds-preview__tracker-use${v?" is-yes":""}`,"aria-label":v?"Used":"Not used",children:[c.jsx("span",{className:"tds-preview__tracker-use-dot","aria-hidden":"true"}),v?"Used":"—"]})}function H1({components:v}){const[S,T]=js.useState(""),[_,M]=js.useState("all"),N=js.useMemo(()=>{const j=S.trim().toLowerCase();return v.filter(L=>{var H;const C=!j||L.name.toLowerCase().includes(j)||L.category.toLowerCase().includes(j)||((H=L.cssFile)==null?void 0:H.toLowerCase().includes(j)),U=_==="all"||L.cssStatus===_||L.figmaStatus===_;return C&&U})},[v,S,_]),V=c.jsxs("div",{className:"tds-preview__tracker-filters",children:[c.jsx("input",{type:"search",className:"tds-preview__tracker-search",placeholder:"Search components...",value:S,onChange:j=>T(j.target.value),"aria-label":"Search components"}),c.jsxs("select",{className:"tds-preview__tracker-select",value:_,onChange:j=>M(j.target.value),"aria-label":"Filter by status",children:[c.jsx("option",{value:"all",children:"All statuses"}),c.jsx("option",{value:"Done",children:"CSS Done"}),c.jsx("option",{value:"Partial",children:"Partial"}),c.jsx("option",{value:"Not Started",children:"Not started"}),c.jsx("option",{value:"Missing",children:"Missing"}),c.jsx("option",{value:"N/A",children:"N/A"})]})]});return c.jsxs(ho,{title:"Built components",desc:`${v.length} components in the library with Figma, CSS, and page adoption status.`,actions:V,children:[c.jsx("div",{className:"tds-preview__tracker-canvas",children:c.jsx("div",{className:"tds-preview__tracker-table-wrap",children:c.jsxs("table",{className:"tds-preview__tracker-table",children:[c.jsx("thead",{children:c.jsxs("tr",{children:[c.jsx("th",{scope:"col",children:"Component"}),c.jsx("th",{scope:"col",children:"Category"}),c.jsx("th",{scope:"col",children:"Figma"}),c.jsx("th",{scope:"col",children:"CSS"}),c.jsx("th",{scope:"col",children:"Preview"}),c.jsx("th",{scope:"col",children:"BV"}),c.jsx("th",{scope:"col",children:"DV"})]})}),c.jsx("tbody",{children:N.map(j=>c.jsxs("tr",{children:[c.jsxs("th",{scope:"row",children:[c.jsx("span",{className:"tds-preview__tracker-name",children:j.name}),j.cssFile&&c.jsx("code",{className:"tds-preview__tracker-file",children:j.cssFile})]}),c.jsx("td",{children:j.category}),c.jsx("td",{children:c.jsx(Tv,{status:j.figmaStatus})}),c.jsx("td",{children:c.jsx(Tv,{status:j.cssStatus})}),c.jsx("td",{children:c.jsx(po,{used:j.usedInPreview})}),c.jsx("td",{children:c.jsx(po,{used:j.usedInBV})}),c.jsx("td",{children:c.jsx(po,{used:j.usedInDV})})]},j.id))})]})})}),c.jsxs("p",{className:"tds-preview__tracker-table-meta",children:["Showing ",N.length," of ",v.length," components"]})]})}function O1(v){return v.toLowerCase().replace(/\s+/g,"-")}function V1({planned:v}){return c.jsx("div",{className:"tds-preview__tracker-planned-grid",children:v.map(S=>c.jsxs("article",{className:"tds-preview__tracker-planned-card",children:[c.jsxs("div",{className:"tds-preview__tracker-planned-card-head",children:[c.jsx("h3",{className:"tds-preview__tracker-planned-name",children:S.name}),c.jsx("span",{className:`tds-preview__tracker-priority tds-preview__tracker-priority--${O1(S.priority)}`,children:S.priority})]}),c.jsx("p",{className:"tds-preview__tracker-planned-category",children:S.category}),S.description&&c.jsx("p",{className:"tds-preview__tracker-planned-desc",children:S.description}),S.dependsOn&&c.jsxs("p",{className:"tds-preview__tracker-planned-meta",children:["Depends on: ",S.dependsOn]})]},S.name))})}function j1(v){return new Date(v).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"})}function U1(){const{summary:v,components:S,planned:T,lastBuiltAt:_,warnings:M}=D1;return c.jsxs("div",{className:"tds-preview__panel is-active",role:"tabpanel",id:"tracker",children:[c.jsx(zv,{eyebrow:"Build progress",title:"Component tracker",desc:`Live status from Components/ and adoption across Preview, BV, and DV demo pages. Last updated ${j1(_)}.`}),c.jsxs(ho,{title:"At a glance",desc:"CSS build completion, page adoption, and category coverage — regenerated on every preview build.",children:[c.jsx(A1,{summary:v}),c.jsx(N1,{summary:v,components:S,planned:T})]}),c.jsx(H1,{components:S}),T.length>0&&c.jsx(ho,{title:"Planned backlog",desc:"Upcoming components tracked in data/component-tracker.yaml.",children:c.jsx(V1,{planned:T})}),M.length>0&&c.jsxs("aside",{className:"tds-preview__tracker-warnings","aria-label":"Tracker warnings",children:[c.jsx("h3",{className:"tds-preview__tracker-showcase__title",children:"Build warnings"}),c.jsx("ul",{children:M.map(N=>c.jsx("li",{children:N},N))})]})]})}const R1=`function toggleAccordion(header) {
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

document.querySelectorAll('.tds-select--interactive').forEach(select => {
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

document.addEventListener('click', (e) => {
  if (e.target.closest('.tds-select--interactive')) return;
  closeAllSelectMenus();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllSelectMenus();
});

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
document.getElementById('indet-cb').indeterminate = true;
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
});`,q1=`/**
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
`;let Lv=!1;function Av(v){const S=document.createElement("script");S.textContent=v,document.body.appendChild(S),S.remove()}function Z1(){js.useEffect(()=>{Lv||(Lv=!0,Av(q1),Av(R1))},[])}function _o(){const v=window.location.hash.replace("#","");return!v||v==="home"?null:_1.includes(v)?v:null}function Y1(){var C;const[v,S]=js.useState(_o),[T,_]=js.useState(()=>_o()!==null),M=js.useRef(null),N=v===null,V=((C=ql.find(U=>U.id===v))==null?void 0:C.label)??"Overview",j=js.useCallback((U,{updateHash:H=!0,scrollTop:P=!0}={})=>{var Es;S(U),H&&window.location.hash!==`#${U}`&&history.replaceState(null,"",`#${U}`),P&&((Es=M.current)==null||Es.scrollTo({top:0,behavior:"instant"}),window.scrollTo(0,0))},[]),L=js.useCallback(({updateHash:U=!0,scrollTop:H=!0}={})=>{var P;S(null),U&&window.location.hash!==""&&window.location.hash!=="#home"&&history.replaceState(null,"",window.location.pathname+window.location.search),H&&((P=M.current)==null||P.scrollTo({top:0,behavior:"instant"}),window.scrollTo(0,0))},[]);return js.useEffect(()=>{const U=()=>{var P;const H=_o();S(H),(P=M.current)==null||P.scrollTo({top:0,behavior:"instant"})};return window.addEventListener("hashchange",U),()=>window.removeEventListener("hashchange",U)},[]),Z1(),c.jsxs("div",{className:`tds-preview${N?" tds-preview--home":" tds-preview--docs"}${T?"":" tds-preview--sidebar-closed"}`,children:[c.jsx(b1,{}),c.jsx(g1,{activeTab:v,isHome:N,isOpen:T,onSelect:j,onHome:L,onToggle:()=>_(U=>!U)}),c.jsx("div",{className:"tds-preview__shell",children:c.jsxs("div",{className:"tds-preview__workspace",children:[c.jsx(w1,{activeLabel:V,activeTab:v,isHome:N,sidebarOpen:T,onSelect:j,onHome:L,onToggleSidebar:()=>_(U=>!U)}),c.jsxs("main",{className:"tds-preview__main",ref:M,children:[c.jsxs("div",{className:"tds-preview__content",children:[N&&c.jsx(m1,{features:h1,onExplore:()=>j("buttons")}),c.jsxs("div",{className:"tds-preview__panels","aria-hidden":N,children:[p1.map(U=>c.jsx(k1,{section:U,active:!N&&U.id===v},U.id)),!N&&v==="tracker"&&c.jsx(U1,{})]})]}),c.jsxs("footer",{className:"tds-preview__footer",children:[c.jsx("span",{children:"Trulioo Design System · ADS 2026"}),!N&&c.jsx("a",{href:"../index.html",className:"tds-preview__footer-link",children:"Classic preview"})]})]})]})})]})}v1.createRoot(document.getElementById("root")).render(c.jsx(js.StrictMode,{children:c.jsx(Y1,{})}));
