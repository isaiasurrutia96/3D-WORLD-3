var xc=Object.defineProperty;var Mc=(i,e,t)=>e in i?xc(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var z=(i,e,t)=>Mc(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Io="180",Sc=0,aa=1,yc=2,El=1,Tl=2,vn=3,Nn=0,Lt=1,on=2,Sn=0,Zn=1,kr=2,la=3,ca=4,bc=5,jn=100,Ec=101,Tc=102,wc=103,Ac=104,Rc=200,Cc=201,Pc=202,Lc=203,Hr=204,Vr=205,Dc=206,Ic=207,Uc=208,Fc=209,Nc=210,Oc=211,Bc=212,zc=213,kc=214,Gr=0,Wr=1,Xr=2,yi=3,qr=4,Yr=5,jr=6,Kr=7,wl=0,Hc=1,Vc=2,Fn=0,Al=1,Rl=2,Cl=3,Uo=4,Pl=5,Ll=6,Dl=7,Il=300,bi=301,Ei=302,$r=303,Jr=304,js=306,Zr=1e3,$n=1001,Qr=1002,en=1003,Gc=1004,as=1005,an=1006,er=1007,Jn=1008,cn=1009,Ul=1010,Fl=1011,Ki=1012,Fo=1013,Qn=1014,Mn=1015,yn=1016,No=1017,Oo=1018,$i=1020,Nl=35902,Ol=35899,Bl=1021,zl=1022,Qt=1023,Ji=1026,Zi=1027,kl=1028,Bo=1029,Hl=1030,zo=1031,ko=1033,Bs=33776,zs=33777,ks=33778,Hs=33779,eo=35840,to=35841,no=35842,io=35843,so=36196,ro=37492,oo=37496,ao=37808,lo=37809,co=37810,ho=37811,uo=37812,fo=37813,po=37814,mo=37815,go=37816,_o=37817,vo=37818,xo=37819,Mo=37820,So=37821,yo=36492,bo=36494,Eo=36495,To=36283,wo=36284,Ao=36285,Ro=36286,Wc=3200,Xc=3201,Vl=0,qc=1,In="",Ht="srgb",Ti="srgb-linear",Ws="linear",Je="srgb",ni=7680,ha=519,Yc=512,jc=513,Kc=514,Gl=515,$c=516,Jc=517,Zc=518,Qc=519,ua=35044,da="300 es",ln=2e3,Xs=2001;class Ri{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Tt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fa=1234567;const Xi=Math.PI/180,Qi=180/Math.PI;function Ci(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Tt[i&255]+Tt[i>>8&255]+Tt[i>>16&255]+Tt[i>>24&255]+"-"+Tt[e&255]+Tt[e>>8&255]+"-"+Tt[e>>16&15|64]+Tt[e>>24&255]+"-"+Tt[t&63|128]+Tt[t>>8&255]+"-"+Tt[t>>16&255]+Tt[t>>24&255]+Tt[n&255]+Tt[n>>8&255]+Tt[n>>16&255]+Tt[n>>24&255]).toLowerCase()}function Oe(i,e,t){return Math.max(e,Math.min(t,i))}function Ho(i,e){return(i%e+e)%e}function eh(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function th(i,e,t){return i!==e?(t-i)/(e-i):0}function qi(i,e,t){return(1-t)*i+t*e}function nh(i,e,t,n){return qi(i,e,1-Math.exp(-t*n))}function ih(i,e=1){return e-Math.abs(Ho(i,e*2)-e)}function sh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function rh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function oh(i,e){return i+Math.floor(Math.random()*(e-i+1))}function ah(i,e){return i+Math.random()*(e-i)}function lh(i){return i*(.5-Math.random())}function ch(i){i!==void 0&&(fa=i);let e=fa+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function hh(i){return i*Xi}function uh(i){return i*Qi}function dh(i){return(i&i-1)===0&&i!==0}function fh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ph(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function mh(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),f=o((e-n)/2),m=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,l*u,l*f,a*c);break;case"YZY":i.set(l*f,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*f,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*m,a*c);break;case"YXY":i.set(l*m,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*m,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function xi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ct(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ue={DEG2RAD:Xi,RAD2DEG:Qi,generateUUID:Ci,clamp:Oe,euclideanModulo:Ho,mapLinear:eh,inverseLerp:th,lerp:qi,damp:nh,pingpong:ih,smoothstep:sh,smootherstep:rh,randInt:oh,randFloat:ah,randFloatSpread:lh,seededRandom:ch,degToRad:hh,radToDeg:uh,isPowerOfTwo:dh,ceilPowerOfTwo:fh,floorPowerOfTwo:ph,setQuaternionFromProperEuler:mh,normalize:Ct,denormalize:xi};class be{constructor(e=0,t=0){be.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Oe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Oe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ns{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],m=r[o+1],g=r[o+2],S=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=S;return}if(u!==S||l!==f||c!==m||h!==g){let p=1-a;const d=l*f+c*m+h*g+u*S,T=d>=0?1:-1,E=1-d*d;if(E>Number.EPSILON){const R=Math.sqrt(E),A=Math.atan2(R,d*T);p=Math.sin(p*A)/R,a=Math.sin(a*A)/R}const v=a*T;if(l=l*p+f*v,c=c*p+m*v,h=h*p+g*v,u=u*p+S*v,p===1-a){const R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],f=r[o+1],m=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*m-c*f,e[t+1]=l*g+h*f+c*u-a*m,e[t+2]=c*g+h*m+a*f-l*u,e[t+3]=h*g-a*u-l*f-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),f=l(n/2),m=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u-f*m*g;break;case"YXZ":this._x=f*h*u+c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u+f*m*g;break;case"ZXY":this._x=f*h*u-c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u-f*m*g;break;case"ZYX":this._x=f*h*u-c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u+f*m*g;break;case"YZX":this._x=f*h*u+c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u-f*m*g;break;case"XZY":this._x=f*h*u-c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(o-s)*m}else if(n>a&&n>u){const m=2*Math.sqrt(1+n-a-u);this._w=(h-l)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+c)/m}else if(a>u){const m=2*Math.sqrt(1+a-n-u);this._w=(r-c)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+u-n-a);this._w=(o-s)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Oe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*n+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,f=Math.sin(t*h)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(pa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(pa.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this.z=Oe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this.z=Oe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Oe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return tr.copy(this).projectOnVector(e),this.sub(tr)}reflect(e){return this.sub(tr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Oe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const tr=new L,pa=new ns;class ke{constructor(e,t,n,s,r,o,a,l,c){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],m=n[5],g=n[8],S=s[0],p=s[3],d=s[6],T=s[1],E=s[4],v=s[7],R=s[2],A=s[5],C=s[8];return r[0]=o*S+a*T+l*R,r[3]=o*p+a*E+l*A,r[6]=o*d+a*v+l*C,r[1]=c*S+h*T+u*R,r[4]=c*p+h*E+u*A,r[7]=c*d+h*v+u*C,r[2]=f*S+m*T+g*R,r[5]=f*p+m*E+g*A,r[8]=f*d+m*v+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,f=a*l-h*r,m=c*r-o*l,g=t*u+n*f+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/g;return e[0]=u*S,e[1]=(s*c-h*n)*S,e[2]=(a*n-s*o)*S,e[3]=f*S,e[4]=(h*t-s*l)*S,e[5]=(s*r-a*t)*S,e[6]=m*S,e[7]=(n*l-c*t)*S,e[8]=(o*t-n*r)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(nr.makeScale(e,t)),this}rotate(e){return this.premultiply(nr.makeRotation(-e)),this}translate(e,t){return this.premultiply(nr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const nr=new ke;function Wl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function qs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function gh(){const i=qs("canvas");return i.style.display="block",i}const ma={};function es(i){i in ma||(ma[i]=!0,console.warn(i))}function _h(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const ga=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_a=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function vh(){const i={enabled:!0,workingColorSpace:Ti,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Je&&(s.r=bn(s.r),s.g=bn(s.g),s.b=bn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Je&&(s.r=Si(s.r),s.g=Si(s.g),s.b=Si(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===In?Ws:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return es("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return es("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ti]:{primaries:e,whitePoint:n,transfer:Ws,toXYZ:ga,fromXYZ:_a,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ht},outputColorSpaceConfig:{drawingBufferColorSpace:Ht}},[Ht]:{primaries:e,whitePoint:n,transfer:Je,toXYZ:ga,fromXYZ:_a,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ht}}}),i}const Ye=vh();function bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Si(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ii;class xh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ii===void 0&&(ii=qs("canvas")),ii.width=e.width,ii.height=e.height;const s=ii.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ii}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=qs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=bn(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(bn(t[n]/255)*255):t[n]=bn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Mh=0;class Vo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mh++}),this.uuid=Ci(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ir(s[o].image)):r.push(ir(s[o]))}else r=ir(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ir(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?xh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Sh=0;const sr=new L;class Dt extends Ri{constructor(e=Dt.DEFAULT_IMAGE,t=Dt.DEFAULT_MAPPING,n=$n,s=$n,r=an,o=Jn,a=Qt,l=cn,c=Dt.DEFAULT_ANISOTROPY,h=In){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sh++}),this.uuid=Ci(),this.name="",this.source=new Vo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new be(0,0),this.repeat=new be(1,1),this.center=new be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(sr).x}get height(){return this.source.getSize(sr).y}get depth(){return this.source.getSize(sr).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Il)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Zr:e.x=e.x-Math.floor(e.x);break;case $n:e.x=e.x<0?0:1;break;case Qr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Zr:e.y=e.y-Math.floor(e.y);break;case $n:e.y=e.y<0?0:1;break;case Qr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Dt.DEFAULT_IMAGE=null;Dt.DEFAULT_MAPPING=Il;Dt.DEFAULT_ANISOTROPY=1;class ut{constructor(e=0,t=0,n=0,s=1){ut.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],f=l[1],m=l[5],g=l[9],S=l[2],p=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-S)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+S)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,v=(m+1)/2,R=(d+1)/2,A=(h+f)/4,C=(u+S)/4,F=(g+p)/4;return E>v&&E>R?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=A/n,r=C/n):v>R?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=A/s,r=F/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=C/r,s=F/r),this.set(n,s,r,t),this}let T=Math.sqrt((p-g)*(p-g)+(u-S)*(u-S)+(f-h)*(f-h));return Math.abs(T)<.001&&(T=1),this.x=(p-g)/T,this.y=(u-S)/T,this.z=(f-h)/T,this.w=Math.acos((c+m+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this.z=Oe(this.z,e.z,t.z),this.w=Oe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this.z=Oe(this.z,e,t),this.w=Oe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Oe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class yh extends Ri{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new Dt(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:an,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Vo(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class tn extends yh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Xl extends Dt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=en,this.minFilter=en,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class bh extends Dt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=en,this.minFilter=en,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jt{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint($t.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint($t.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=$t.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,$t):$t.fromBufferAttribute(r,o),$t.applyMatrix4(e.matrixWorld),this.expandByPoint($t);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ls.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ls.copy(n.boundingBox)),ls.applyMatrix4(e.matrixWorld),this.union(ls)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$t),$t.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ui),cs.subVectors(this.max,Ui),si.subVectors(e.a,Ui),ri.subVectors(e.b,Ui),oi.subVectors(e.c,Ui),En.subVectors(ri,si),Tn.subVectors(oi,ri),zn.subVectors(si,oi);let t=[0,-En.z,En.y,0,-Tn.z,Tn.y,0,-zn.z,zn.y,En.z,0,-En.x,Tn.z,0,-Tn.x,zn.z,0,-zn.x,-En.y,En.x,0,-Tn.y,Tn.x,0,-zn.y,zn.x,0];return!rr(t,si,ri,oi,cs)||(t=[1,0,0,0,1,0,0,0,1],!rr(t,si,ri,oi,cs))?!1:(hs.crossVectors(En,Tn),t=[hs.x,hs.y,hs.z],rr(t,si,ri,oi,cs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$t).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($t).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(dn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const dn=[new L,new L,new L,new L,new L,new L,new L,new L],$t=new L,ls=new jt,si=new L,ri=new L,oi=new L,En=new L,Tn=new L,zn=new L,Ui=new L,cs=new L,hs=new L,kn=new L;function rr(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){kn.fromArray(i,r);const a=s.x*Math.abs(kn.x)+s.y*Math.abs(kn.y)+s.z*Math.abs(kn.z),l=e.dot(kn),c=t.dot(kn),h=n.dot(kn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Eh=new jt,Fi=new L,or=new L;class is{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Eh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fi.subVectors(e,this.center);const t=Fi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Fi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(or.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fi.copy(e.center).add(or)),this.expandByPoint(Fi.copy(e.center).sub(or))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const fn=new L,ar=new L,us=new L,wn=new L,lr=new L,ds=new L,cr=new L;class Go{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fn.copy(this.origin).addScaledVector(this.direction,t),fn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ar.copy(e).add(t).multiplyScalar(.5),us.copy(t).sub(e).normalize(),wn.copy(this.origin).sub(ar);const r=e.distanceTo(t)*.5,o=-this.direction.dot(us),a=wn.dot(this.direction),l=-wn.dot(us),c=wn.lengthSq(),h=Math.abs(1-o*o);let u,f,m,g;if(h>0)if(u=o*l-a,f=o*a-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const S=1/h;u*=S,f*=S,m=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),m=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),m=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),m=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ar).addScaledVector(us,f),m}intersectSphere(e,t){fn.subVectors(e.center,this.origin);const n=fn.dot(this.direction),s=fn.dot(fn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,fn)!==null}intersectTriangle(e,t,n,s,r){lr.subVectors(t,e),ds.subVectors(n,e),cr.crossVectors(lr,ds);let o=this.direction.dot(cr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;wn.subVectors(this.origin,e);const l=a*this.direction.dot(ds.crossVectors(wn,ds));if(l<0)return null;const c=a*this.direction.dot(lr.cross(wn));if(c<0||l+c>o)return null;const h=-a*wn.dot(cr);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class dt{constructor(e,t,n,s,r,o,a,l,c,h,u,f,m,g,S,p){dt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,h,u,f,m,g,S,p)}set(e,t,n,s,r,o,a,l,c,h,u,f,m,g,S,p){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=m,d[7]=g,d[11]=S,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new dt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/ai.setFromMatrixColumn(e,0).length(),r=1/ai.setFromMatrixColumn(e,1).length(),o=1/ai.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=o*h,m=o*u,g=a*h,S=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=m+g*c,t[5]=f-S*c,t[9]=-a*l,t[2]=S-f*c,t[6]=g+m*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*h,m=l*u,g=c*h,S=c*u;t[0]=f+S*a,t[4]=g*a-m,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=m*a-g,t[6]=S+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*h,m=l*u,g=c*h,S=c*u;t[0]=f-S*a,t[4]=-o*u,t[8]=g+m*a,t[1]=m+g*a,t[5]=o*h,t[9]=S-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*h,m=o*u,g=a*h,S=a*u;t[0]=l*h,t[4]=g*c-m,t[8]=f*c+S,t[1]=l*u,t[5]=S*c+f,t[9]=m*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,m=o*c,g=a*l,S=a*c;t[0]=l*h,t[4]=S-f*u,t[8]=g*u+m,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=m*u+g,t[10]=f-S*u}else if(e.order==="XZY"){const f=o*l,m=o*c,g=a*l,S=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=f*u+S,t[5]=o*h,t[9]=m*u-g,t[2]=g*u-m,t[6]=a*h,t[10]=S*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Th,e,wh)}lookAt(e,t,n){const s=this.elements;return zt.subVectors(e,t),zt.lengthSq()===0&&(zt.z=1),zt.normalize(),An.crossVectors(n,zt),An.lengthSq()===0&&(Math.abs(n.z)===1?zt.x+=1e-4:zt.z+=1e-4,zt.normalize(),An.crossVectors(n,zt)),An.normalize(),fs.crossVectors(zt,An),s[0]=An.x,s[4]=fs.x,s[8]=zt.x,s[1]=An.y,s[5]=fs.y,s[9]=zt.y,s[2]=An.z,s[6]=fs.z,s[10]=zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],m=n[13],g=n[2],S=n[6],p=n[10],d=n[14],T=n[3],E=n[7],v=n[11],R=n[15],A=s[0],C=s[4],F=s[8],b=s[12],y=s[1],I=s[5],D=s[9],k=s[13],X=s[2],q=s[6],Y=s[10],Z=s[14],W=s[3],oe=s[7],de=s[11],Ae=s[15];return r[0]=o*A+a*y+l*X+c*W,r[4]=o*C+a*I+l*q+c*oe,r[8]=o*F+a*D+l*Y+c*de,r[12]=o*b+a*k+l*Z+c*Ae,r[1]=h*A+u*y+f*X+m*W,r[5]=h*C+u*I+f*q+m*oe,r[9]=h*F+u*D+f*Y+m*de,r[13]=h*b+u*k+f*Z+m*Ae,r[2]=g*A+S*y+p*X+d*W,r[6]=g*C+S*I+p*q+d*oe,r[10]=g*F+S*D+p*Y+d*de,r[14]=g*b+S*k+p*Z+d*Ae,r[3]=T*A+E*y+v*X+R*W,r[7]=T*C+E*I+v*q+R*oe,r[11]=T*F+E*D+v*Y+R*de,r[15]=T*b+E*k+v*Z+R*Ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],f=e[10],m=e[14],g=e[3],S=e[7],p=e[11],d=e[15];return g*(+r*l*u-s*c*u-r*a*f+n*c*f+s*a*m-n*l*m)+S*(+t*l*m-t*c*f+r*o*f-s*o*m+s*c*h-r*l*h)+p*(+t*c*u-t*a*m-r*o*u+n*o*m+r*a*h-n*c*h)+d*(-s*a*h-t*l*u+t*a*f+s*o*u-n*o*f+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],f=e[10],m=e[11],g=e[12],S=e[13],p=e[14],d=e[15],T=u*p*c-S*f*c+S*l*m-a*p*m-u*l*d+a*f*d,E=g*f*c-h*p*c-g*l*m+o*p*m+h*l*d-o*f*d,v=h*S*c-g*u*c+g*a*m-o*S*m-h*a*d+o*u*d,R=g*u*l-h*S*l-g*a*f+o*S*f+h*a*p-o*u*p,A=t*T+n*E+s*v+r*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/A;return e[0]=T*C,e[1]=(S*f*r-u*p*r-S*s*m+n*p*m+u*s*d-n*f*d)*C,e[2]=(a*p*r-S*l*r+S*s*c-n*p*c-a*s*d+n*l*d)*C,e[3]=(u*l*r-a*f*r-u*s*c+n*f*c+a*s*m-n*l*m)*C,e[4]=E*C,e[5]=(h*p*r-g*f*r+g*s*m-t*p*m-h*s*d+t*f*d)*C,e[6]=(g*l*r-o*p*r-g*s*c+t*p*c+o*s*d-t*l*d)*C,e[7]=(o*f*r-h*l*r+h*s*c-t*f*c-o*s*m+t*l*m)*C,e[8]=v*C,e[9]=(g*u*r-h*S*r-g*n*m+t*S*m+h*n*d-t*u*d)*C,e[10]=(o*S*r-g*a*r+g*n*c-t*S*c-o*n*d+t*a*d)*C,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*m-t*a*m)*C,e[12]=R*C,e[13]=(h*S*s-g*u*s+g*n*f-t*S*f-h*n*p+t*u*p)*C,e[14]=(g*a*s-o*S*s-g*n*l+t*S*l+o*n*p-t*a*p)*C,e[15]=(o*u*s-h*a*s+h*n*l-t*u*l-o*n*f+t*a*f)*C,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,f=r*c,m=r*h,g=r*u,S=o*h,p=o*u,d=a*u,T=l*c,E=l*h,v=l*u,R=n.x,A=n.y,C=n.z;return s[0]=(1-(S+d))*R,s[1]=(m+v)*R,s[2]=(g-E)*R,s[3]=0,s[4]=(m-v)*A,s[5]=(1-(f+d))*A,s[6]=(p+T)*A,s[7]=0,s[8]=(g+E)*C,s[9]=(p-T)*C,s[10]=(1-(f+S))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=ai.set(s[0],s[1],s[2]).length();const o=ai.set(s[4],s[5],s[6]).length(),a=ai.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Jt.copy(this);const c=1/r,h=1/o,u=1/a;return Jt.elements[0]*=c,Jt.elements[1]*=c,Jt.elements[2]*=c,Jt.elements[4]*=h,Jt.elements[5]*=h,Jt.elements[6]*=h,Jt.elements[8]*=u,Jt.elements[9]*=u,Jt.elements[10]*=u,t.setFromRotationMatrix(Jt),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=ln,l=!1){const c=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),m=(n+s)/(n-s);let g,S;if(l)g=r/(o-r),S=o*r/(o-r);else if(a===ln)g=-(o+r)/(o-r),S=-2*o*r/(o-r);else if(a===Xs)g=-o/(o-r),S=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=ln,l=!1){const c=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),m=-(n+s)/(n-s);let g,S;if(l)g=1/(o-r),S=o/(o-r);else if(a===ln)g=-2/(o-r),S=-(o+r)/(o-r);else if(a===Xs)g=-1/(o-r),S=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ai=new L,Jt=new dt,Th=new L(0,0,0),wh=new L(1,1,1),An=new L,fs=new L,zt=new L,va=new dt,xa=new ns;class hn{constructor(e=0,t=0,n=0,s=hn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(Oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Oe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Oe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Oe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Oe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return va.makeRotationFromQuaternion(e),this.setFromRotationMatrix(va,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xa.setFromEuler(this),this.setFromQuaternion(xa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hn.DEFAULT_ORDER="XYZ";class Wo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ah=0;const Ma=new L,li=new ns,pn=new dt,ps=new L,Ni=new L,Rh=new L,Ch=new ns,Sa=new L(1,0,0),ya=new L(0,1,0),ba=new L(0,0,1),Ea={type:"added"},Ph={type:"removed"},ci={type:"childadded",child:null},hr={type:"childremoved",child:null};class mt extends Ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ah++}),this.uuid=Ci(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new L,t=new hn,n=new ns,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new dt},normalMatrix:{value:new ke}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return li.setFromAxisAngle(e,t),this.quaternion.multiply(li),this}rotateOnWorldAxis(e,t){return li.setFromAxisAngle(e,t),this.quaternion.premultiply(li),this}rotateX(e){return this.rotateOnAxis(Sa,e)}rotateY(e){return this.rotateOnAxis(ya,e)}rotateZ(e){return this.rotateOnAxis(ba,e)}translateOnAxis(e,t){return Ma.copy(e).applyQuaternion(this.quaternion),this.position.add(Ma.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Sa,e)}translateY(e){return this.translateOnAxis(ya,e)}translateZ(e){return this.translateOnAxis(ba,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ps.copy(e):ps.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ni.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(Ni,ps,this.up):pn.lookAt(ps,Ni,this.up),this.quaternion.setFromRotationMatrix(pn),s&&(pn.extractRotation(s.matrixWorld),li.setFromRotationMatrix(pn),this.quaternion.premultiply(li.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ea),ci.child=e,this.dispatchEvent(ci),ci.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ph),hr.child=e,this.dispatchEvent(hr),hr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(pn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ea),ci.child=e,this.dispatchEvent(ci),ci.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ni,e,Rh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ni,Ch,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),m=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}mt.DEFAULT_UP=new L(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Zt=new L,mn=new L,ur=new L,gn=new L,hi=new L,ui=new L,Ta=new L,dr=new L,fr=new L,pr=new L,mr=new ut,gr=new ut,_r=new ut;class Yt{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Zt.subVectors(e,t),s.cross(Zt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Zt.subVectors(s,t),mn.subVectors(n,t),ur.subVectors(e,t);const o=Zt.dot(Zt),a=Zt.dot(mn),l=Zt.dot(ur),c=mn.dot(mn),h=mn.dot(ur),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,m=(c*l-a*h)*f,g=(o*h-a*l)*f;return r.set(1-m-g,g,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,gn)===null?!1:gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,gn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,gn.x),l.addScaledVector(o,gn.y),l.addScaledVector(a,gn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return mr.setScalar(0),gr.setScalar(0),_r.setScalar(0),mr.fromBufferAttribute(e,t),gr.fromBufferAttribute(e,n),_r.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(mr,r.x),o.addScaledVector(gr,r.y),o.addScaledVector(_r,r.z),o}static isFrontFacing(e,t,n,s){return Zt.subVectors(n,t),mn.subVectors(e,t),Zt.cross(mn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zt.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),Zt.cross(mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Yt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Yt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Yt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Yt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Yt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;hi.subVectors(s,n),ui.subVectors(r,n),dr.subVectors(e,n);const l=hi.dot(dr),c=ui.dot(dr);if(l<=0&&c<=0)return t.copy(n);fr.subVectors(e,s);const h=hi.dot(fr),u=ui.dot(fr);if(h>=0&&u<=h)return t.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(hi,o);pr.subVectors(e,r);const m=hi.dot(pr),g=ui.dot(pr);if(g>=0&&m<=g)return t.copy(r);const S=m*c-l*g;if(S<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(ui,a);const p=h*g-m*u;if(p<=0&&u-h>=0&&m-g>=0)return Ta.subVectors(r,s),a=(u-h)/(u-h+(m-g)),t.copy(s).addScaledVector(Ta,a);const d=1/(p+S+f);return o=S*d,a=f*d,t.copy(n).addScaledVector(hi,o).addScaledVector(ui,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ql={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Rn={h:0,s:0,l:0},ms={h:0,s:0,l:0};function vr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ee{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ye.workingColorSpace){if(e=Ho(e,1),t=Oe(t,0,1),n=Oe(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=vr(o,r,e+1/3),this.g=vr(o,r,e),this.b=vr(o,r,e-1/3)}return Ye.colorSpaceToWorking(this,s),this}setStyle(e,t=Ht){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ht){const n=ql[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bn(e.r),this.g=bn(e.g),this.b=bn(e.b),this}copyLinearToSRGB(e){return this.r=Si(e.r),this.g=Si(e.g),this.b=Si(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ht){return Ye.workingToColorSpace(wt.copy(this),e),Math.round(Oe(wt.r*255,0,255))*65536+Math.round(Oe(wt.g*255,0,255))*256+Math.round(Oe(wt.b*255,0,255))}getHexString(e=Ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(wt.copy(this),t);const n=wt.r,s=wt.g,r=wt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(wt.copy(this),t),e.r=wt.r,e.g=wt.g,e.b=wt.b,e}getStyle(e=Ht){Ye.workingToColorSpace(wt.copy(this),e);const t=wt.r,n=wt.g,s=wt.b;return e!==Ht?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Rn),this.setHSL(Rn.h+e,Rn.s+t,Rn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Rn),e.getHSL(ms);const n=qi(Rn.h,ms.h,t),s=qi(Rn.s,ms.s,t),r=qi(Rn.l,ms.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wt=new Ee;Ee.NAMES=ql;let Lh=0;class Pi extends Ri{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lh++}),this.uuid=Ci(),this.name="",this.type="Material",this.blending=Zn,this.side=Nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hr,this.blendDst=Vr,this.blendEquation=jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ee(0,0,0),this.blendAlpha=0,this.depthFunc=yi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ha,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ni,this.stencilZFail=ni,this.stencilZPass=ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Zn&&(n.blending=this.blending),this.side!==Nn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Hr&&(n.blendSrc=this.blendSrc),this.blendDst!==Vr&&(n.blendDst=this.blendDst),this.blendEquation!==jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==yi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ha&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ni&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ni&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ni&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ks extends Pi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const pt=new L,gs=new be;let Dh=0;class Vt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Dh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ua,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)gs.fromBufferAttribute(this,t),gs.applyMatrix3(e),this.setXY(t,gs.x,gs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix3(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix4(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyNormalMatrix(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.transformDirection(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=xi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),s=Ct(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),s=Ct(s,this.array),r=Ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ua&&(e.usage=this.usage),e}}class Yl extends Vt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class jl extends Vt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class gt extends Vt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Ih=0;const Xt=new dt,xr=new mt,di=new L,kt=new jt,Oi=new jt,Mt=new L;class Nt extends Ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ih++}),this.uuid=Ci(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wl(e)?jl:Yl)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Xt.makeRotationFromQuaternion(e),this.applyMatrix4(Xt),this}rotateX(e){return Xt.makeRotationX(e),this.applyMatrix4(Xt),this}rotateY(e){return Xt.makeRotationY(e),this.applyMatrix4(Xt),this}rotateZ(e){return Xt.makeRotationZ(e),this.applyMatrix4(Xt),this}translate(e,t,n){return Xt.makeTranslation(e,t,n),this.applyMatrix4(Xt),this}scale(e,t,n){return Xt.makeScale(e,t,n),this.applyMatrix4(Xt),this}lookAt(e){return xr.lookAt(e),xr.updateMatrix(),this.applyMatrix4(xr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(di).negate(),this.translate(di.x,di.y,di.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new gt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new jt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];kt.setFromBufferAttribute(r),this.morphTargetsRelative?(Mt.addVectors(this.boundingBox.min,kt.min),this.boundingBox.expandByPoint(Mt),Mt.addVectors(this.boundingBox.max,kt.max),this.boundingBox.expandByPoint(Mt)):(this.boundingBox.expandByPoint(kt.min),this.boundingBox.expandByPoint(kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new is);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(kt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Oi.setFromBufferAttribute(a),this.morphTargetsRelative?(Mt.addVectors(kt.min,Oi.min),kt.expandByPoint(Mt),Mt.addVectors(kt.max,Oi.max),kt.expandByPoint(Mt)):(kt.expandByPoint(Oi.min),kt.expandByPoint(Oi.max))}kt.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Mt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Mt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Mt.fromBufferAttribute(a,c),l&&(di.fromBufferAttribute(e,c),Mt.add(di)),s=Math.max(s,n.distanceToSquared(Mt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Vt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let F=0;F<n.count;F++)a[F]=new L,l[F]=new L;const c=new L,h=new L,u=new L,f=new be,m=new be,g=new be,S=new L,p=new L;function d(F,b,y){c.fromBufferAttribute(n,F),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,y),f.fromBufferAttribute(r,F),m.fromBufferAttribute(r,b),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),m.sub(f),g.sub(f);const I=1/(m.x*g.y-g.x*m.y);isFinite(I)&&(S.copy(h).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(I),p.copy(u).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(I),a[F].add(S),a[b].add(S),a[y].add(S),l[F].add(p),l[b].add(p),l[y].add(p))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let F=0,b=T.length;F<b;++F){const y=T[F],I=y.start,D=y.count;for(let k=I,X=I+D;k<X;k+=3)d(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const E=new L,v=new L,R=new L,A=new L;function C(F){R.fromBufferAttribute(s,F),A.copy(R);const b=a[F];E.copy(b),E.sub(R.multiplyScalar(R.dot(b))).normalize(),v.crossVectors(A,b);const I=v.dot(l[F])<0?-1:1;o.setXYZW(F,E.x,E.y,E.z,I)}for(let F=0,b=T.length;F<b;++F){const y=T[F],I=y.start,D=y.count;for(let k=I,X=I+D;k<X;k+=3)C(e.getX(k+0)),C(e.getX(k+1)),C(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Vt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,u=new L;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),S=e.getX(f+1),p=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,S),o.fromBufferAttribute(t,p),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,S),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(S,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=t.count;f<m;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Mt.fromBufferAttribute(e,t),Mt.normalize(),e.setXYZ(t,Mt.x,Mt.y,Mt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let m=0,g=0;for(let S=0,p=l.length;S<p;S++){a.isInterleavedBufferAttribute?m=l[S]*a.data.stride+a.offset:m=l[S]*h;for(let d=0;d<h;d++)f[g++]=c[m++]}return new Vt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Nt,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],m=e(f,n);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const m=c[u];h.push(m.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,m=u.length;f<m;f++)h.push(u[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const wa=new dt,Hn=new Go,_s=new is,Aa=new L,vs=new L,xs=new L,Ms=new L,Mr=new L,Ss=new L,Ra=new L,ys=new L;class Ze extends mt{constructor(e=new Nt,t=new Ks){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Ss.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(Mr.fromBufferAttribute(u,e),o?Ss.addScaledVector(Mr,h):Ss.addScaledVector(Mr.sub(t),h))}t.add(Ss)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_s.copy(n.boundingSphere),_s.applyMatrix4(r),Hn.copy(e.ray).recast(e.near),!(_s.containsPoint(Hn.origin)===!1&&(Hn.intersectSphere(_s,Aa)===null||Hn.origin.distanceToSquared(Aa)>(e.far-e.near)**2))&&(wa.copy(r).invert(),Hn.copy(e.ray).applyMatrix4(wa),!(n.boundingBox!==null&&Hn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Hn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,S=f.length;g<S;g++){const p=f[g],d=o[p.materialIndex],T=Math.max(p.start,m.start),E=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let v=T,R=E;v<R;v+=3){const A=a.getX(v),C=a.getX(v+1),F=a.getX(v+2);s=bs(this,d,e,n,c,h,u,A,C,F),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),S=Math.min(a.count,m.start+m.count);for(let p=g,d=S;p<d;p+=3){const T=a.getX(p),E=a.getX(p+1),v=a.getX(p+2);s=bs(this,o,e,n,c,h,u,T,E,v),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,S=f.length;g<S;g++){const p=f[g],d=o[p.materialIndex],T=Math.max(p.start,m.start),E=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let v=T,R=E;v<R;v+=3){const A=v,C=v+1,F=v+2;s=bs(this,d,e,n,c,h,u,A,C,F),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),S=Math.min(l.count,m.start+m.count);for(let p=g,d=S;p<d;p+=3){const T=p,E=p+1,v=p+2;s=bs(this,o,e,n,c,h,u,T,E,v),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function Uh(i,e,t,n,s,r,o,a){let l;if(e.side===Lt?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===Nn,a),l===null)return null;ys.copy(a),ys.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ys);return c<t.near||c>t.far?null:{distance:c,point:ys.clone(),object:i}}function bs(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,vs),i.getVertexPosition(l,xs),i.getVertexPosition(c,Ms);const h=Uh(i,e,t,n,vs,xs,Ms,Ra);if(h){const u=new L;Yt.getBarycoord(Ra,vs,xs,Ms,u),s&&(h.uv=Yt.getInterpolatedAttribute(s,a,l,c,u,new be)),r&&(h.uv1=Yt.getInterpolatedAttribute(r,a,l,c,u,new be)),o&&(h.normal=Yt.getInterpolatedAttribute(o,a,l,c,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new L,materialIndex:0};Yt.getNormal(vs,xs,Ms,f.normal),h.face=f,h.barycoord=u}return h}class It extends Nt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,m=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(h,3)),this.setAttribute("uv",new gt(u,2));function g(S,p,d,T,E,v,R,A,C,F,b){const y=v/C,I=R/F,D=v/2,k=R/2,X=A/2,q=C+1,Y=F+1;let Z=0,W=0;const oe=new L;for(let de=0;de<Y;de++){const Ae=de*I-k;for(let Ge=0;Ge<q;Ge++){const tt=Ge*y-D;oe[S]=tt*T,oe[p]=Ae*E,oe[d]=X,c.push(oe.x,oe.y,oe.z),oe[S]=0,oe[p]=0,oe[d]=A>0?1:-1,h.push(oe.x,oe.y,oe.z),u.push(Ge/C),u.push(1-de/F),Z+=1}}for(let de=0;de<F;de++)for(let Ae=0;Ae<C;Ae++){const Ge=f+Ae+q*de,tt=f+Ae+q*(de+1),st=f+(Ae+1)+q*(de+1),Ke=f+(Ae+1)+q*de;l.push(Ge,tt,Ke),l.push(tt,st,Ke),W+=6}a.addGroup(m,W,b),m+=W,f+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new It(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function wi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Pt(i){const e={};for(let t=0;t<i.length;t++){const n=wi(i[t]);for(const s in n)e[s]=n[s]}return e}function Fh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Kl(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const ts={clone:wi,merge:Pt};var Nh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Oh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bt extends Pi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nh,this.fragmentShader=Oh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=wi(e.uniforms),this.uniformsGroups=Fh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class $l extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Cn=new L,Ca=new be,Pa=new be;class qt extends $l{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Qi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Xi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qi*2*Math.atan(Math.tan(Xi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Cn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Cn.x,Cn.y).multiplyScalar(-e/Cn.z),Cn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Cn.x,Cn.y).multiplyScalar(-e/Cn.z)}getViewSize(e,t){return this.getViewBounds(e,Ca,Pa),t.subVectors(Pa,Ca)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Xi*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const fi=-90,pi=1;class Bh extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new qt(fi,pi,e,t);s.layers=this.layers,this.add(s);const r=new qt(fi,pi,e,t);r.layers=this.layers,this.add(r);const o=new qt(fi,pi,e,t);o.layers=this.layers,this.add(o);const a=new qt(fi,pi,e,t);a.layers=this.layers,this.add(a);const l=new qt(fi,pi,e,t);l.layers=this.layers,this.add(l);const c=new qt(fi,pi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Xs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const S=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=S,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,f,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Jl extends Dt{constructor(e=[],t=bi,n,s,r,o,a,l,c,h){super(e,t,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class zh extends tn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Jl(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new It(5,5,5),r=new bt({name:"CubemapFromEquirect",uniforms:wi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Lt,blending:Sn});r.uniforms.tEquirect.value=t;const o=new Ze(s,r),a=t.minFilter;return t.minFilter===Jn&&(t.minFilter=an),new Bh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}class yt extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const kh={type:"move"};class Sr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const S of e.hand.values()){const p=t.getJointPose(S,n),d=this._getHandJoint(c,S);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(kh)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new yt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Xo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ee(e),this.density=t}clone(){return new Xo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Hh extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hn,this.environmentIntensity=1,this.environmentRotation=new hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const yr=new L,Vh=new L,Gh=new ke;class Dn{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=yr.subVectors(n,t).cross(Vh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(yr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Gh.getNormalMatrix(e),s=this.coplanarPoint(yr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Vn=new is,Wh=new be(.5,.5),Es=new L;class qo{constructor(e=new Dn,t=new Dn,n=new Dn,s=new Dn,r=new Dn,o=new Dn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ln,n=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],m=r[7],g=r[8],S=r[9],p=r[10],d=r[11],T=r[12],E=r[13],v=r[14],R=r[15];if(s[0].setComponents(c-o,m-h,d-g,R-T).normalize(),s[1].setComponents(c+o,m+h,d+g,R+T).normalize(),s[2].setComponents(c+a,m+u,d+S,R+E).normalize(),s[3].setComponents(c-a,m-u,d-S,R-E).normalize(),n)s[4].setComponents(l,f,p,v).normalize(),s[5].setComponents(c-l,m-f,d-p,R-v).normalize();else if(s[4].setComponents(c-l,m-f,d-p,R-v).normalize(),t===ln)s[5].setComponents(c+l,m+f,d+p,R+v).normalize();else if(t===Xs)s[5].setComponents(l,f,p,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vn)}intersectsSprite(e){Vn.center.set(0,0,0);const t=Wh.distanceTo(e.center);return Vn.radius=.7071067811865476+t,Vn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Es.x=s.normal.x>0?e.max.x:e.min.x,Es.y=s.normal.y>0?e.max.y:e.min.y,Es.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Es)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Zl extends Pi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const La=new dt,Co=new Go,Ts=new is,ws=new L;class Xh extends mt{constructor(e=new Nt,t=new Zl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ts.copy(n.boundingSphere),Ts.applyMatrix4(s),Ts.radius+=r,e.ray.intersectsSphere(Ts)===!1)return;La.copy(s).invert(),Co.copy(e.ray).applyMatrix4(La);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let g=f,S=m;g<S;g++){const p=c.getX(g);ws.fromBufferAttribute(u,p),Da(ws,p,l,s,e,t,this)}}else{const f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let g=f,S=m;g<S;g++)ws.fromBufferAttribute(u,g),Da(ws,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Da(i,e,t,n,s,r,o){const a=Co.distanceSqToPoint(i);if(a<t){const l=new L;Co.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class qh extends Dt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ql extends Dt{constructor(e,t,n=Qn,s,r,o,a=en,l=en,c,h=Ji,u=1){if(h!==Ji&&h!==Zi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:u};super(f,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Vo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class ec extends Dt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class $s extends Nt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],m=[];let g=0;const S=[],p=n/2;let d=0;T(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new gt(u,3)),this.setAttribute("normal",new gt(f,3)),this.setAttribute("uv",new gt(m,2));function T(){const v=new L,R=new L;let A=0;const C=(t-e)/n;for(let F=0;F<=r;F++){const b=[],y=F/r,I=y*(t-e)+e;for(let D=0;D<=s;D++){const k=D/s,X=k*l+a,q=Math.sin(X),Y=Math.cos(X);R.x=I*q,R.y=-y*n+p,R.z=I*Y,u.push(R.x,R.y,R.z),v.set(q,C,Y).normalize(),f.push(v.x,v.y,v.z),m.push(k,1-y),b.push(g++)}S.push(b)}for(let F=0;F<s;F++)for(let b=0;b<r;b++){const y=S[b][F],I=S[b+1][F],D=S[b+1][F+1],k=S[b][F+1];(e>0||b!==0)&&(h.push(y,I,k),A+=3),(t>0||b!==r-1)&&(h.push(I,D,k),A+=3)}c.addGroup(d,A,0),d+=A}function E(v){const R=g,A=new be,C=new L;let F=0;const b=v===!0?e:t,y=v===!0?1:-1;for(let D=1;D<=s;D++)u.push(0,p*y,0),f.push(0,y,0),m.push(.5,.5),g++;const I=g;for(let D=0;D<=s;D++){const X=D/s*l+a,q=Math.cos(X),Y=Math.sin(X);C.x=b*Y,C.y=p*y,C.z=b*q,u.push(C.x,C.y,C.z),f.push(0,y,0),A.x=q*.5+.5,A.y=Y*.5*y+.5,m.push(A.x,A.y),g++}for(let D=0;D<s;D++){const k=R+D,X=I+D;v===!0?h.push(X,X+1,k):h.push(X+1,X,k),F+=3}c.addGroup(d,F,v===!0?1:2),d+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ss extends Nt{constructor(e=[new be(0,-.5),new be(.5,0),new be(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Oe(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/t,u=new L,f=new be,m=new L,g=new L,S=new L;let p=0,d=0;for(let T=0;T<=e.length-1;T++)switch(T){case 0:p=e[T+1].x-e[T].x,d=e[T+1].y-e[T].y,m.x=d*1,m.y=-p,m.z=d*0,S.copy(m),m.normalize(),l.push(m.x,m.y,m.z);break;case e.length-1:l.push(S.x,S.y,S.z);break;default:p=e[T+1].x-e[T].x,d=e[T+1].y-e[T].y,m.x=d*1,m.y=-p,m.z=d*0,g.copy(m),m.x+=S.x,m.y+=S.y,m.z+=S.z,m.normalize(),l.push(m.x,m.y,m.z),S.copy(g)}for(let T=0;T<=t;T++){const E=n+T*h*s,v=Math.sin(E),R=Math.cos(E);for(let A=0;A<=e.length-1;A++){u.x=e[A].x*v,u.y=e[A].y,u.z=e[A].x*R,o.push(u.x,u.y,u.z),f.x=T/t,f.y=A/(e.length-1),a.push(f.x,f.y);const C=l[3*A+0]*v,F=l[3*A+1],b=l[3*A+0]*R;c.push(C,F,b)}}for(let T=0;T<t;T++)for(let E=0;E<e.length-1;E++){const v=E+T*e.length,R=v,A=v+e.length,C=v+e.length+1,F=v+1;r.push(R,A,F),r.push(C,F,A)}this.setIndex(r),this.setAttribute("position",new gt(o,3)),this.setAttribute("uv",new gt(a,2)),this.setAttribute("normal",new gt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ss(e.points,e.segments,e.phiStart,e.phiLength)}}class ei extends Nt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=e/a,f=t/l,m=[],g=[],S=[],p=[];for(let d=0;d<h;d++){const T=d*f-o;for(let E=0;E<c;E++){const v=E*u-r;g.push(v,-T,0),S.push(0,0,1),p.push(E/a),p.push(1-d/l)}}for(let d=0;d<l;d++)for(let T=0;T<a;T++){const E=T+c*d,v=T+c*(d+1),R=T+1+c*(d+1),A=T+1+c*d;m.push(E,v,A),m.push(v,R,A)}this.setIndex(m),this.setAttribute("position",new gt(g,3)),this.setAttribute("normal",new gt(S,3)),this.setAttribute("uv",new gt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ei(e.width,e.height,e.widthSegments,e.heightSegments)}}class xn extends Nt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new L,f=new L,m=[],g=[],S=[],p=[];for(let d=0;d<=n;d++){const T=[],E=d/n;let v=0;d===0&&o===0?v=.5/t:d===n&&l===Math.PI&&(v=-.5/t);for(let R=0;R<=t;R++){const A=R/t;u.x=-e*Math.cos(s+A*r)*Math.sin(o+E*a),u.y=e*Math.cos(o+E*a),u.z=e*Math.sin(s+A*r)*Math.sin(o+E*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),S.push(f.x,f.y,f.z),p.push(A+v,1-E),T.push(c++)}h.push(T)}for(let d=0;d<n;d++)for(let T=0;T<t;T++){const E=h[d][T+1],v=h[d][T],R=h[d+1][T],A=h[d+1][T+1];(d!==0||o>0)&&m.push(E,v,A),(d!==n-1||l<Math.PI)&&m.push(v,R,A)}this.setIndex(m),this.setAttribute("position",new gt(g,3)),this.setAttribute("normal",new gt(S,3)),this.setAttribute("uv",new gt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Yh extends bt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Kt extends Pi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vl,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class jh extends Pi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Kh extends Pi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Yo extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ee(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class $h extends Yo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ee(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const br=new dt,Ia=new L,Ua=new L;class Jh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new be(512,512),this.mapType=cn,this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qo,this._frameExtents=new be(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ia.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ia),Ua.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ua),t.updateMatrixWorld(),br.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(br,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(br)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class jo extends $l{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Zh extends Jh{constructor(){super(new jo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Fa extends Yo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new Zh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Qh extends Yo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class eu extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class tc{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const Na=new L,As=new L,mi=new L,gi=new L,Er=new L,tu=new L,nu=new L;class nc{constructor(e=new L,t=new L){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Na.subVectors(e,this.start),As.subVectors(this.end,this.start);const n=As.dot(As);let r=As.dot(Na)/n;return t&&(r=Oe(r,0,1)),r}closestPointToPoint(e,t,n){const s=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=tu,n=nu){const s=10000000000000001e-32;let r,o;const a=this.start,l=e.start,c=this.end,h=e.end;mi.subVectors(c,a),gi.subVectors(h,l),Er.subVectors(a,l);const u=mi.dot(mi),f=gi.dot(gi),m=gi.dot(Er);if(u<=s&&f<=s)return t.copy(a),n.copy(l),t.sub(n),t.dot(t);if(u<=s)r=0,o=m/f,o=Oe(o,0,1);else{const g=mi.dot(Er);if(f<=s)o=0,r=Oe(-g/u,0,1);else{const S=mi.dot(gi),p=u*f-S*S;p!==0?r=Oe((S*m-g*f)/p,0,1):r=0,o=(S*r+m)/f,o<0?(o=0,r=Oe(-g/u,0,1)):o>1&&(o=1,r=Oe((S-g)/u,0,1))}}return t.copy(a).add(mi.multiplyScalar(r)),n.copy(l).add(gi.multiplyScalar(o)),t.sub(n),t.dot(t)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function Oa(i,e,t,n){const s=iu(n);switch(t){case Bl:return i*e;case kl:return i*e/s.components*s.byteLength;case Bo:return i*e/s.components*s.byteLength;case Hl:return i*e*2/s.components*s.byteLength;case zo:return i*e*2/s.components*s.byteLength;case zl:return i*e*3/s.components*s.byteLength;case Qt:return i*e*4/s.components*s.byteLength;case ko:return i*e*4/s.components*s.byteLength;case Bs:case zs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ks:case Hs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case to:case io:return Math.max(i,16)*Math.max(e,8)/4;case eo:case no:return Math.max(i,8)*Math.max(e,8)/2;case so:case ro:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case oo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ao:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case lo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case co:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ho:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case uo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case fo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case po:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case mo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case go:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case _o:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case vo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case xo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Mo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case So:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case yo:case bo:case Eo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case To:case wo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ao:case Ro:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function iu(i){switch(i){case cn:case Ul:return{byteLength:1,components:1};case Ki:case Fl:case yn:return{byteLength:2,components:1};case No:case Oo:return{byteLength:2,components:4};case Qn:case Fo:case Mn:return{byteLength:4,components:1};case Nl:case Ol:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Io}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Io);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ic(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function su(i){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),a.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((m,g)=>m.start-g.start);let f=0;for(let m=1;m<u.length;m++){const g=u[f],S=u[m];S.start<=g.start+g.count+1?g.count=Math.max(g.count,S.start+S.count-g.start):(++f,u[f]=S)}u.length=f+1;for(let m=0,g=u.length;m<g;m++){const S=u[m];i.bufferSubData(c,S.start*h.BYTES_PER_ELEMENT,h,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var ru=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ou=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,au=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,du=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,pu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,mu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_u=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,vu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,xu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Mu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Su=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Eu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Tu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Au=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Ru=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Cu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Pu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Lu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Du=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Iu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Uu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Fu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Nu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ou=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Bu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,zu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ku=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Wu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Yu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ju=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ku=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$u=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ju=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Zu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ed=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,td=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,nd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,id=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,sd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,rd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,od=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ad=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ld=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ud=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,dd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,pd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,md=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_d=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Md=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Sd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,bd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ed=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Td=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ad=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Rd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ld=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Dd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Id=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ud=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Fd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Od=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,kd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Hd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Vd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Gd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Wd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,qd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,jd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Kd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$d=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Qd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ef=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,sf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,of=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,af=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,df=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ff=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,pf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,mf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_f=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Mf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ef=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,wf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Af=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Pf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Df=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,If=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Uf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ff=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Of=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:ru,alphahash_pars_fragment:ou,alphamap_fragment:au,alphamap_pars_fragment:lu,alphatest_fragment:cu,alphatest_pars_fragment:hu,aomap_fragment:uu,aomap_pars_fragment:du,batching_pars_vertex:fu,batching_vertex:pu,begin_vertex:mu,beginnormal_vertex:gu,bsdfs:_u,iridescence_fragment:vu,bumpmap_pars_fragment:xu,clipping_planes_fragment:Mu,clipping_planes_pars_fragment:Su,clipping_planes_pars_vertex:yu,clipping_planes_vertex:bu,color_fragment:Eu,color_pars_fragment:Tu,color_pars_vertex:wu,color_vertex:Au,common:Ru,cube_uv_reflection_fragment:Cu,defaultnormal_vertex:Pu,displacementmap_pars_vertex:Lu,displacementmap_vertex:Du,emissivemap_fragment:Iu,emissivemap_pars_fragment:Uu,colorspace_fragment:Fu,colorspace_pars_fragment:Nu,envmap_fragment:Ou,envmap_common_pars_fragment:Bu,envmap_pars_fragment:zu,envmap_pars_vertex:ku,envmap_physical_pars_fragment:Ju,envmap_vertex:Hu,fog_vertex:Vu,fog_pars_vertex:Gu,fog_fragment:Wu,fog_pars_fragment:Xu,gradientmap_pars_fragment:qu,lightmap_pars_fragment:Yu,lights_lambert_fragment:ju,lights_lambert_pars_fragment:Ku,lights_pars_begin:$u,lights_toon_fragment:Zu,lights_toon_pars_fragment:Qu,lights_phong_fragment:ed,lights_phong_pars_fragment:td,lights_physical_fragment:nd,lights_physical_pars_fragment:id,lights_fragment_begin:sd,lights_fragment_maps:rd,lights_fragment_end:od,logdepthbuf_fragment:ad,logdepthbuf_pars_fragment:ld,logdepthbuf_pars_vertex:cd,logdepthbuf_vertex:hd,map_fragment:ud,map_pars_fragment:dd,map_particle_fragment:fd,map_particle_pars_fragment:pd,metalnessmap_fragment:md,metalnessmap_pars_fragment:gd,morphinstance_vertex:_d,morphcolor_vertex:vd,morphnormal_vertex:xd,morphtarget_pars_vertex:Md,morphtarget_vertex:Sd,normal_fragment_begin:yd,normal_fragment_maps:bd,normal_pars_fragment:Ed,normal_pars_vertex:Td,normal_vertex:wd,normalmap_pars_fragment:Ad,clearcoat_normal_fragment_begin:Rd,clearcoat_normal_fragment_maps:Cd,clearcoat_pars_fragment:Pd,iridescence_pars_fragment:Ld,opaque_fragment:Dd,packing:Id,premultiplied_alpha_fragment:Ud,project_vertex:Fd,dithering_fragment:Nd,dithering_pars_fragment:Od,roughnessmap_fragment:Bd,roughnessmap_pars_fragment:zd,shadowmap_pars_fragment:kd,shadowmap_pars_vertex:Hd,shadowmap_vertex:Vd,shadowmask_pars_fragment:Gd,skinbase_vertex:Wd,skinning_pars_vertex:Xd,skinning_vertex:qd,skinnormal_vertex:Yd,specularmap_fragment:jd,specularmap_pars_fragment:Kd,tonemapping_fragment:$d,tonemapping_pars_fragment:Jd,transmission_fragment:Zd,transmission_pars_fragment:Qd,uv_pars_fragment:ef,uv_pars_vertex:tf,uv_vertex:nf,worldpos_vertex:sf,background_vert:rf,background_frag:of,backgroundCube_vert:af,backgroundCube_frag:lf,cube_vert:cf,cube_frag:hf,depth_vert:uf,depth_frag:df,distanceRGBA_vert:ff,distanceRGBA_frag:pf,equirect_vert:mf,equirect_frag:gf,linedashed_vert:_f,linedashed_frag:vf,meshbasic_vert:xf,meshbasic_frag:Mf,meshlambert_vert:Sf,meshlambert_frag:yf,meshmatcap_vert:bf,meshmatcap_frag:Ef,meshnormal_vert:Tf,meshnormal_frag:wf,meshphong_vert:Af,meshphong_frag:Rf,meshphysical_vert:Cf,meshphysical_frag:Pf,meshtoon_vert:Lf,meshtoon_frag:Df,points_vert:If,points_frag:Uf,shadow_vert:Ff,shadow_frag:Nf,sprite_vert:Of,sprite_frag:Bf},le={common:{diffuse:{value:new Ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Ee(16777215)},opacity:{value:1},center:{value:new be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},rn={basic:{uniforms:Pt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Pt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Ee(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Pt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Ee(0)},specular:{value:new Ee(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Pt([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new Ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Pt([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new Ee(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Pt([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Pt([le.points,le.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Pt([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Pt([le.common,le.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Pt([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Pt([le.sprite,le.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:Pt([le.common,le.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:Pt([le.lights,le.fog,{color:{value:new Ee(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};rn.physical={uniforms:Pt([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Ee(0)},specularColor:{value:new Ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Rs={r:0,b:0,g:0},Gn=new hn,zf=new dt;function kf(i,e,t,n,s,r,o){const a=new Ee(0);let l=r===!0?0:1,c,h,u=null,f=0,m=null;function g(E){let v=E.isScene===!0?E.background:null;return v&&v.isTexture&&(v=(E.backgroundBlurriness>0?t:e).get(v)),v}function S(E){let v=!1;const R=g(E);R===null?d(a,l):R&&R.isColor&&(d(R,1),v=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(E,v){const R=g(v);R&&(R.isCubeTexture||R.mapping===js)?(h===void 0&&(h=new Ze(new It(1,1,1),new bt({name:"BackgroundCubeMaterial",uniforms:wi(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:Lt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,C,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Gn.copy(v.backgroundRotation),Gn.x*=-1,Gn.y*=-1,Gn.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Gn.y*=-1,Gn.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(zf.makeRotationFromEuler(Gn)),h.material.toneMapped=Ye.getTransfer(R.colorSpace)!==Je,(u!==R||f!==R.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,u=R,f=R.version,m=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new Ze(new ei(2,2),new bt({name:"BackgroundMaterial",uniforms:wi(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Ye.getTransfer(R.colorSpace)!==Je,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||f!==R.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,u=R,f=R.version,m=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function d(E,v){E.getRGB(Rs,Kl(i)),n.buffers.color.setClear(Rs.r,Rs.g,Rs.b,v,o)}function T(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,v=1){a.set(E),l=v,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,d(a,l)},render:S,addToRenderList:p,dispose:T}}function Hf(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(y,I,D,k,X){let q=!1;const Y=u(k,D,I);r!==Y&&(r=Y,c(r.object)),q=m(y,k,D,X),q&&g(y,k,D,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,v(y,I,D,k),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,I,D){const k=D.wireframe===!0;let X=n[y.id];X===void 0&&(X={},n[y.id]=X);let q=X[I.id];q===void 0&&(q={},X[I.id]=q);let Y=q[k];return Y===void 0&&(Y=f(l()),q[k]=Y),Y}function f(y){const I=[],D=[],k=[];for(let X=0;X<t;X++)I[X]=0,D[X]=0,k[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:D,attributeDivisors:k,object:y,attributes:{},index:null}}function m(y,I,D,k){const X=r.attributes,q=I.attributes;let Y=0;const Z=D.getAttributes();for(const W in Z)if(Z[W].location>=0){const de=X[W];let Ae=q[W];if(Ae===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(Ae=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(Ae=y.instanceColor)),de===void 0||de.attribute!==Ae||Ae&&de.data!==Ae.data)return!0;Y++}return r.attributesNum!==Y||r.index!==k}function g(y,I,D,k){const X={},q=I.attributes;let Y=0;const Z=D.getAttributes();for(const W in Z)if(Z[W].location>=0){let de=q[W];de===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(de=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(de=y.instanceColor));const Ae={};Ae.attribute=de,de&&de.data&&(Ae.data=de.data),X[W]=Ae,Y++}r.attributes=X,r.attributesNum=Y,r.index=k}function S(){const y=r.newAttributes;for(let I=0,D=y.length;I<D;I++)y[I]=0}function p(y){d(y,0)}function d(y,I){const D=r.newAttributes,k=r.enabledAttributes,X=r.attributeDivisors;D[y]=1,k[y]===0&&(i.enableVertexAttribArray(y),k[y]=1),X[y]!==I&&(i.vertexAttribDivisor(y,I),X[y]=I)}function T(){const y=r.newAttributes,I=r.enabledAttributes;for(let D=0,k=I.length;D<k;D++)I[D]!==y[D]&&(i.disableVertexAttribArray(D),I[D]=0)}function E(y,I,D,k,X,q,Y){Y===!0?i.vertexAttribIPointer(y,I,D,X,q):i.vertexAttribPointer(y,I,D,k,X,q)}function v(y,I,D,k){S();const X=k.attributes,q=D.getAttributes(),Y=I.defaultAttributeValues;for(const Z in q){const W=q[Z];if(W.location>=0){let oe=X[Z];if(oe===void 0&&(Z==="instanceMatrix"&&y.instanceMatrix&&(oe=y.instanceMatrix),Z==="instanceColor"&&y.instanceColor&&(oe=y.instanceColor)),oe!==void 0){const de=oe.normalized,Ae=oe.itemSize,Ge=e.get(oe);if(Ge===void 0)continue;const tt=Ge.buffer,st=Ge.type,Ke=Ge.bytesPerElement,$=st===i.INT||st===i.UNSIGNED_INT||oe.gpuType===Fo;if(oe.isInterleavedBufferAttribute){const ee=oe.data,me=ee.stride,Fe=oe.offset;if(ee.isInstancedInterleavedBuffer){for(let we=0;we<W.locationSize;we++)d(W.location+we,ee.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let we=0;we<W.locationSize;we++)p(W.location+we);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let we=0;we<W.locationSize;we++)E(W.location+we,Ae/W.locationSize,st,de,me*Ke,(Fe+Ae/W.locationSize*we)*Ke,$)}else{if(oe.isInstancedBufferAttribute){for(let ee=0;ee<W.locationSize;ee++)d(W.location+ee,oe.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ee=0;ee<W.locationSize;ee++)p(W.location+ee);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let ee=0;ee<W.locationSize;ee++)E(W.location+ee,Ae/W.locationSize,st,de,Ae*Ke,Ae/W.locationSize*ee*Ke,$)}}else if(Y!==void 0){const de=Y[Z];if(de!==void 0)switch(de.length){case 2:i.vertexAttrib2fv(W.location,de);break;case 3:i.vertexAttrib3fv(W.location,de);break;case 4:i.vertexAttrib4fv(W.location,de);break;default:i.vertexAttrib1fv(W.location,de)}}}}T()}function R(){F();for(const y in n){const I=n[y];for(const D in I){const k=I[D];for(const X in k)h(k[X].object),delete k[X];delete I[D]}delete n[y]}}function A(y){if(n[y.id]===void 0)return;const I=n[y.id];for(const D in I){const k=I[D];for(const X in k)h(k[X].object),delete k[X];delete I[D]}delete n[y.id]}function C(y){for(const I in n){const D=n[I];if(D[y.id]===void 0)continue;const k=D[y.id];for(const X in k)h(k[X].object),delete k[X];delete D[y.id]}}function F(){b(),o=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:F,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:S,enableAttribute:p,disableUnusedAttributes:T}}function Vf(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let m=0;for(let g=0;g<u;g++)m+=h[g];t.update(m,n,1)}function l(c,h,u,f){if(u===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let S=0;S<u;S++)g+=h[S]*f[S];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Gf(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==Qt&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const F=C===yn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==cn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Mn&&!F)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:m,maxVertexTextures:g,maxTextureSize:S,maxCubemapSize:p,maxAttributes:d,maxVertexUniforms:T,maxVaryings:E,maxFragmentUniforms:v,vertexTextures:R,maxSamples:A}}function Wf(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new Dn,a=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const m=u.length!==0||f||n!==0||s;return s=f,n=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,m){const g=u.clippingPlanes,S=u.clipIntersection,p=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!p)r?h(null):c();else{const T=r?0:n,E=T*4;let v=d.clippingState||null;l.value=v,v=h(g,f,E,m);for(let R=0;R!==E;++R)v[R]=t[R];d.clippingState=v,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,m,g){const S=u!==null?u.length:0;let p=null;if(S!==0){if(p=l.value,g!==!0||p===null){const d=m+S*4,T=f.matrixWorldInverse;a.getNormalMatrix(T),(p===null||p.length<d)&&(p=new Float32Array(d));for(let E=0,v=m;E!==S;++E,v+=4)o.copy(u[E]).applyMatrix4(T,a),o.normal.toArray(p,v),p[v+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,p}}function Xf(i){let e=new WeakMap;function t(o,a){return a===$r?o.mapping=bi:a===Jr&&(o.mapping=Ei),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===$r||a===Jr)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new zh(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const Mi=4,Ba=[.125,.215,.35,.446,.526,.582],Kn=20,Tr=new jo,za=new Ee;let wr=null,Ar=0,Rr=0,Cr=!1;const Yn=(1+Math.sqrt(5))/2,_i=1/Yn,ka=[new L(-Yn,_i,0),new L(Yn,_i,0),new L(-_i,0,Yn),new L(_i,0,Yn),new L(0,Yn,-_i),new L(0,Yn,_i),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],qf=new L;class Ha{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:o=256,position:a=qf}=r;wr=this._renderer.getRenderTarget(),Ar=this._renderer.getActiveCubeFace(),Rr=this._renderer.getActiveMipmapLevel(),Cr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ga(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(wr,Ar,Rr),this._renderer.xr.enabled=Cr,e.scissorTest=!1,Cs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===bi||e.mapping===Ei?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),wr=this._renderer.getRenderTarget(),Ar=this._renderer.getActiveCubeFace(),Rr=this._renderer.getActiveMipmapLevel(),Cr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:an,minFilter:an,generateMipmaps:!1,type:yn,format:Qt,colorSpace:Ti,depthBuffer:!1},s=Va(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Va(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Yf(r)),this._blurMaterial=jf(r,e,t)}return s}_compileMaterial(e){const t=new Ze(this._lodPlanes[0],e);this._renderer.compile(t,Tr)}_sceneToCubeUV(e,t,n,s,r){const l=new qt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,m=u.toneMapping;u.getClearColor(za),u.toneMapping=Fn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const S=new Ks({name:"PMREM.Background",side:Lt,depthWrite:!1,depthTest:!1}),p=new Ze(new It,S);let d=!1;const T=e.background;T?T.isColor&&(S.color.copy(T),e.background=null,d=!0):(S.color.copy(za),d=!0);for(let E=0;E<6;E++){const v=E%3;v===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):v===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));const R=this._cubeSize;Cs(s,v*R,E>2?R:0,R,R),u.setRenderTarget(s),d&&u.render(p,l),u.render(e,l)}p.geometry.dispose(),p.material.dispose(),u.toneMapping=m,u.autoClear=f,e.background=T}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===bi||e.mapping===Ei;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wa()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ga());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ze(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Cs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Tr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=ka[(s-r-1)%ka.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ze(this._lodPlanes[s],c),f=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Kn-1),S=r/g,p=isFinite(r)?1+Math.floor(h*S):Kn;p>Kn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Kn}`);const d=[];let T=0;for(let C=0;C<Kn;++C){const F=C/S,b=Math.exp(-F*F/2);d.push(b),C===0?T+=b:C<p&&(T+=2*b)}for(let C=0;C<d.length;C++)d[C]=d[C]/T;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:E}=this;f.dTheta.value=g,f.mipInt.value=E-n;const v=this._sizeLods[s],R=3*v*(s>E-Mi?s-E+Mi:0),A=4*(this._cubeSize-v);Cs(t,R,A,3*v,2*v),l.setRenderTarget(t),l.render(u,Tr)}}function Yf(i){const e=[],t=[],n=[];let s=i;const r=i-Mi+1+Ba.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>i-Mi?l=Ba[o-i+Mi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,g=6,S=3,p=2,d=1,T=new Float32Array(S*g*m),E=new Float32Array(p*g*m),v=new Float32Array(d*g*m);for(let A=0;A<m;A++){const C=A%3*2/3-1,F=A>2?0:-1,b=[C,F,0,C+2/3,F,0,C+2/3,F+1,0,C,F,0,C+2/3,F+1,0,C,F+1,0];T.set(b,S*g*A),E.set(f,p*g*A);const y=[A,A,A,A,A,A];v.set(y,d*g*A)}const R=new Nt;R.setAttribute("position",new Vt(T,S)),R.setAttribute("uv",new Vt(E,p)),R.setAttribute("faceIndex",new Vt(v,d)),e.push(R),s>Mi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Va(i,e,t){const n=new tn(i,e,t);return n.texture.mapping=js,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Cs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function jf(i,e,t){const n=new Float32Array(Kn),s=new L(0,1,0);return new bt({name:"SphericalGaussianBlur",defines:{n:Kn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function Ga(){return new bt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function Wa(){return new bt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function Ko(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Kf(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===$r||l===Jr,h=l===bi||l===Ei;if(c||h){let u=e.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Ha(i)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const m=a.image;return c&&m&&m.height>0||h&&m&&s(m)?(t===null&&(t=new Ha(i)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function $f(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&es("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Jf(i,e,t,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];const m=r.get(f);m&&(e.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const m in f)e.update(f[m],i.ARRAY_BUFFER)}function c(u){const f=[],m=u.index,g=u.attributes.position;let S=0;if(m!==null){const T=m.array;S=m.version;for(let E=0,v=T.length;E<v;E+=3){const R=T[E+0],A=T[E+1],C=T[E+2];f.push(R,A,A,C,C,R)}}else if(g!==void 0){const T=g.array;S=g.version;for(let E=0,v=T.length/3-1;E<v;E+=3){const R=E+0,A=E+1,C=E+2;f.push(R,A,A,C,C,R)}}else return;const p=new(Wl(f)?jl:Yl)(f,1);p.version=S;const d=r.get(u);d&&e.remove(d),r.set(u,p)}function h(u){const f=r.get(u);if(f){const m=u.index;m!==null&&f.version<m.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Zf(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,m){i.drawElements(n,m,r,f*o),t.update(m,n,1)}function c(f,m,g){g!==0&&(i.drawElementsInstanced(n,m,r,f*o,g),t.update(m,n,g))}function h(f,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,f,0,g);let p=0;for(let d=0;d<g;d++)p+=m[d];t.update(p,n,1)}function u(f,m,g,S){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<f.length;d++)c(f[d]/o,m[d],S[d]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,r,f,0,S,0,g);let d=0;for(let T=0;T<g;T++)d+=m[T]*S[T];t.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Qf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function ep(i,e,t){const n=new WeakMap,s=new ut;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let y=function(){F.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var m=y;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,S=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],T=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),S===!0&&(v=2),p===!0&&(v=3);let R=a.attributes.position.count*v,A=1;R>e.maxTextureSize&&(A=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const C=new Float32Array(R*A*4*u),F=new Xl(C,R,A,u);F.type=Mn,F.needsUpdate=!0;const b=v*4;for(let I=0;I<u;I++){const D=d[I],k=T[I],X=E[I],q=R*A*4*I;for(let Y=0;Y<D.count;Y++){const Z=Y*b;g===!0&&(s.fromBufferAttribute(D,Y),C[q+Z+0]=s.x,C[q+Z+1]=s.y,C[q+Z+2]=s.z,C[q+Z+3]=0),S===!0&&(s.fromBufferAttribute(k,Y),C[q+Z+4]=s.x,C[q+Z+5]=s.y,C[q+Z+6]=s.z,C[q+Z+7]=0),p===!0&&(s.fromBufferAttribute(X,Y),C[q+Z+8]=s.x,C[q+Z+9]=s.y,C[q+Z+10]=s.z,C[q+Z+11]=X.itemSize===4?s.w:1)}}f={count:u,texture:F,size:new be(R,A)},n.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const S=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",S),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function tp(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}const sc=new Dt,Xa=new Ql(1,1),rc=new Xl,oc=new bh,ac=new Jl,qa=[],Ya=[],ja=new Float32Array(16),Ka=new Float32Array(9),$a=new Float32Array(4);function Li(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=qa[s];if(r===void 0&&(r=new Float32Array(s),qa[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function _t(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Js(i,e){let t=Ya[e];t===void 0&&(t=new Int32Array(e),Ya[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function np(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function ip(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2fv(this.addr,e),vt(t,e)}}function sp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(_t(t,e))return;i.uniform3fv(this.addr,e),vt(t,e)}}function rp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4fv(this.addr,e),vt(t,e)}}function op(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,n))return;$a.set(n),i.uniformMatrix2fv(this.addr,!1,$a),vt(t,n)}}function ap(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,n))return;Ka.set(n),i.uniformMatrix3fv(this.addr,!1,Ka),vt(t,n)}}function lp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,n))return;ja.set(n),i.uniformMatrix4fv(this.addr,!1,ja),vt(t,n)}}function cp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function hp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2iv(this.addr,e),vt(t,e)}}function up(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3iv(this.addr,e),vt(t,e)}}function dp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4iv(this.addr,e),vt(t,e)}}function fp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function pp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2uiv(this.addr,e),vt(t,e)}}function mp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3uiv(this.addr,e),vt(t,e)}}function gp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4uiv(this.addr,e),vt(t,e)}}function _p(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Xa.compareFunction=Gl,r=Xa):r=sc,t.setTexture2D(e||r,s)}function vp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||oc,s)}function xp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||ac,s)}function Mp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||rc,s)}function Sp(i){switch(i){case 5126:return np;case 35664:return ip;case 35665:return sp;case 35666:return rp;case 35674:return op;case 35675:return ap;case 35676:return lp;case 5124:case 35670:return cp;case 35667:case 35671:return hp;case 35668:case 35672:return up;case 35669:case 35673:return dp;case 5125:return fp;case 36294:return pp;case 36295:return mp;case 36296:return gp;case 35678:case 36198:case 36298:case 36306:case 35682:return _p;case 35679:case 36299:case 36307:return vp;case 35680:case 36300:case 36308:case 36293:return xp;case 36289:case 36303:case 36311:case 36292:return Mp}}function yp(i,e){i.uniform1fv(this.addr,e)}function bp(i,e){const t=Li(e,this.size,2);i.uniform2fv(this.addr,t)}function Ep(i,e){const t=Li(e,this.size,3);i.uniform3fv(this.addr,t)}function Tp(i,e){const t=Li(e,this.size,4);i.uniform4fv(this.addr,t)}function wp(i,e){const t=Li(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Ap(i,e){const t=Li(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Rp(i,e){const t=Li(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Cp(i,e){i.uniform1iv(this.addr,e)}function Pp(i,e){i.uniform2iv(this.addr,e)}function Lp(i,e){i.uniform3iv(this.addr,e)}function Dp(i,e){i.uniform4iv(this.addr,e)}function Ip(i,e){i.uniform1uiv(this.addr,e)}function Up(i,e){i.uniform2uiv(this.addr,e)}function Fp(i,e){i.uniform3uiv(this.addr,e)}function Np(i,e){i.uniform4uiv(this.addr,e)}function Op(i,e,t){const n=this.cache,s=e.length,r=Js(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),vt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||sc,r[o])}function Bp(i,e,t){const n=this.cache,s=e.length,r=Js(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),vt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||oc,r[o])}function zp(i,e,t){const n=this.cache,s=e.length,r=Js(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),vt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||ac,r[o])}function kp(i,e,t){const n=this.cache,s=e.length,r=Js(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),vt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||rc,r[o])}function Hp(i){switch(i){case 5126:return yp;case 35664:return bp;case 35665:return Ep;case 35666:return Tp;case 35674:return wp;case 35675:return Ap;case 35676:return Rp;case 5124:case 35670:return Cp;case 35667:case 35671:return Pp;case 35668:case 35672:return Lp;case 35669:case 35673:return Dp;case 5125:return Ip;case 36294:return Up;case 36295:return Fp;case 36296:return Np;case 35678:case 36198:case 36298:case 36306:case 35682:return Op;case 35679:case 36299:case 36307:return Bp;case 35680:case 36300:case 36308:case 36293:return zp;case 36289:case 36303:case 36311:case 36292:return kp}}class Vp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Sp(t.type)}}class Gp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Hp(t.type)}}class Wp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Pr=/(\w+)(\])?(\[|\.)?/g;function Ja(i,e){i.seq.push(e),i.map[e.id]=e}function Xp(i,e,t){const n=i.name,s=n.length;for(Pr.lastIndex=0;;){const r=Pr.exec(n),o=Pr.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Ja(t,c===void 0?new Vp(a,i,e):new Gp(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Wp(a),Ja(t,u)),t=u}}}class Vs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Xp(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function Za(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const qp=37297;let Yp=0;function jp(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Qa=new ke;function Kp(i){Ye._getMatrix(Qa,Ye.workingColorSpace,i);const e=`mat3( ${Qa.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(i)){case Ws:return[e,"LinearTransferOETF"];case Je:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function el(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+jp(i.getShaderSource(e),a)}else return r}function $p(i,e){const t=Kp(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Jp(i,e){let t;switch(e){case Al:t="Linear";break;case Rl:t="Reinhard";break;case Cl:t="Cineon";break;case Uo:t="ACESFilmic";break;case Ll:t="AgX";break;case Dl:t="Neutral";break;case Pl:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ps=new L;function Zp(){Ye.getLuminanceCoefficients(Ps);const i=Ps.x.toFixed(4),e=Ps.y.toFixed(4),t=Ps.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Qp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wi).join(`
`)}function em(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function tm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Wi(i){return i!==""}function tl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function nl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const nm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Po(i){return i.replace(nm,sm)}const im=new Map;function sm(i,e){let t=Ve[e];if(t===void 0){const n=im.get(e);if(n!==void 0)t=Ve[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Po(t)}const rm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function il(i){return i.replace(rm,om)}function om(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function sl(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function am(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===El?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Tl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===vn&&(e="SHADOWMAP_TYPE_VSM"),e}function lm(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case bi:case Ei:e="ENVMAP_TYPE_CUBE";break;case js:e="ENVMAP_TYPE_CUBE_UV";break}return e}function cm(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ei:e="ENVMAP_MODE_REFRACTION";break}return e}function hm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case wl:e="ENVMAP_BLENDING_MULTIPLY";break;case Hc:e="ENVMAP_BLENDING_MIX";break;case Vc:e="ENVMAP_BLENDING_ADD";break}return e}function um(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function dm(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=am(t),c=lm(t),h=cm(t),u=hm(t),f=um(t),m=Qp(t),g=em(r),S=s.createProgram();let p,d,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Wi).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Wi).join(`
`),d.length>0&&(d+=`
`)):(p=[sl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wi).join(`
`),d=[sl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Fn?"#define TONE_MAPPING":"",t.toneMapping!==Fn?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Fn?Jp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,$p("linearToOutputTexel",t.outputColorSpace),Zp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Wi).join(`
`)),o=Po(o),o=tl(o,t),o=nl(o,t),a=Po(a),a=tl(a,t),a=nl(a,t),o=il(o),a=il(a),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",t.glslVersion===da?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===da?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const E=T+p+o,v=T+d+a,R=Za(s,s.VERTEX_SHADER,E),A=Za(s,s.FRAGMENT_SHADER,v);s.attachShader(S,R),s.attachShader(S,A),t.index0AttributeName!==void 0?s.bindAttribLocation(S,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function C(I){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(S)||"",k=s.getShaderInfoLog(R)||"",X=s.getShaderInfoLog(A)||"",q=D.trim(),Y=k.trim(),Z=X.trim();let W=!0,oe=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,S,R,A);else{const de=el(s,R,"vertex"),Ae=el(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+q+`
`+de+`
`+Ae)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(Y===""||Z==="")&&(oe=!1);oe&&(I.diagnostics={runnable:W,programLog:q,vertexShader:{log:Y,prefix:p},fragmentShader:{log:Z,prefix:d}})}s.deleteShader(R),s.deleteShader(A),F=new Vs(s,S),b=tm(s,S)}let F;this.getUniforms=function(){return F===void 0&&C(this),F};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(S,qp)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Yp++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=R,this.fragmentShader=A,this}let fm=0;class pm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new mm(e),t.set(e,n)),n}}class mm{constructor(e){this.id=fm++,this.code=e,this.usedTimes=0}}function gm(i,e,t,n,s,r,o){const a=new Wo,l=new pm,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let m=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function S(b){return c.add(b),b===0?"uv":`uv${b}`}function p(b,y,I,D,k){const X=D.fog,q=k.geometry,Y=b.isMeshStandardMaterial?D.environment:null,Z=(b.isMeshStandardMaterial?t:e).get(b.envMap||Y),W=Z&&Z.mapping===js?Z.image.height:null,oe=g[b.type];b.precision!==null&&(m=s.getMaxPrecision(b.precision),m!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",m,"instead."));const de=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Ae=de!==void 0?de.length:0;let Ge=0;q.morphAttributes.position!==void 0&&(Ge=1),q.morphAttributes.normal!==void 0&&(Ge=2),q.morphAttributes.color!==void 0&&(Ge=3);let tt,st,Ke,$;if(oe){const $e=rn[oe];tt=$e.vertexShader,st=$e.fragmentShader}else tt=b.vertexShader,st=b.fragmentShader,l.update(b),Ke=l.getVertexShaderID(b),$=l.getFragmentShaderID(b);const ee=i.getRenderTarget(),me=i.state.buffers.depth.getReversed(),Fe=k.isInstancedMesh===!0,we=k.isBatchedMesh===!0,Xe=!!b.map,Et=!!b.matcap,P=!!Z,rt=!!b.aoMap,Be=!!b.lightMap,De=!!b.bumpMap,ve=!!b.normalMap,ot=!!b.displacementMap,xe=!!b.emissiveMap,He=!!b.metalnessMap,xt=!!b.roughnessMap,ft=b.anisotropy>0,w=b.clearcoat>0,_=b.dispersion>0,B=b.iridescence>0,K=b.sheen>0,Q=b.transmission>0,j=ft&&!!b.anisotropyMap,Te=w&&!!b.clearcoatMap,re=w&&!!b.clearcoatNormalMap,Me=w&&!!b.clearcoatRoughnessMap,Se=B&&!!b.iridescenceMap,ie=B&&!!b.iridescenceThicknessMap,ue=K&&!!b.sheenColorMap,Le=K&&!!b.sheenRoughnessMap,ye=!!b.specularMap,ce=!!b.specularColorMap,ze=!!b.specularIntensityMap,U=Q&&!!b.transmissionMap,se=Q&&!!b.thicknessMap,ae=!!b.gradientMap,pe=!!b.alphaMap,te=b.alphaTest>0,J=!!b.alphaHash,_e=!!b.extensions;let Ne=Fn;b.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Ne=i.toneMapping);const nt={shaderID:oe,shaderType:b.type,shaderName:b.name,vertexShader:tt,fragmentShader:st,defines:b.defines,customVertexShaderID:Ke,customFragmentShaderID:$,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:m,batching:we,batchingColor:we&&k._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&k.instanceColor!==null,instancingMorph:Fe&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ee===null?i.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Ti,alphaToCoverage:!!b.alphaToCoverage,map:Xe,matcap:Et,envMap:P,envMapMode:P&&Z.mapping,envMapCubeUVHeight:W,aoMap:rt,lightMap:Be,bumpMap:De,normalMap:ve,displacementMap:f&&ot,emissiveMap:xe,normalMapObjectSpace:ve&&b.normalMapType===qc,normalMapTangentSpace:ve&&b.normalMapType===Vl,metalnessMap:He,roughnessMap:xt,anisotropy:ft,anisotropyMap:j,clearcoat:w,clearcoatMap:Te,clearcoatNormalMap:re,clearcoatRoughnessMap:Me,dispersion:_,iridescence:B,iridescenceMap:Se,iridescenceThicknessMap:ie,sheen:K,sheenColorMap:ue,sheenRoughnessMap:Le,specularMap:ye,specularColorMap:ce,specularIntensityMap:ze,transmission:Q,transmissionMap:U,thicknessMap:se,gradientMap:ae,opaque:b.transparent===!1&&b.blending===Zn&&b.alphaToCoverage===!1,alphaMap:pe,alphaTest:te,alphaHash:J,combine:b.combine,mapUv:Xe&&S(b.map.channel),aoMapUv:rt&&S(b.aoMap.channel),lightMapUv:Be&&S(b.lightMap.channel),bumpMapUv:De&&S(b.bumpMap.channel),normalMapUv:ve&&S(b.normalMap.channel),displacementMapUv:ot&&S(b.displacementMap.channel),emissiveMapUv:xe&&S(b.emissiveMap.channel),metalnessMapUv:He&&S(b.metalnessMap.channel),roughnessMapUv:xt&&S(b.roughnessMap.channel),anisotropyMapUv:j&&S(b.anisotropyMap.channel),clearcoatMapUv:Te&&S(b.clearcoatMap.channel),clearcoatNormalMapUv:re&&S(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Me&&S(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&S(b.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&S(b.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&S(b.sheenColorMap.channel),sheenRoughnessMapUv:Le&&S(b.sheenRoughnessMap.channel),specularMapUv:ye&&S(b.specularMap.channel),specularColorMapUv:ce&&S(b.specularColorMap.channel),specularIntensityMapUv:ze&&S(b.specularIntensityMap.channel),transmissionMapUv:U&&S(b.transmissionMap.channel),thicknessMapUv:se&&S(b.thicknessMap.channel),alphaMapUv:pe&&S(b.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(ve||ft),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!q.attributes.uv&&(Xe||pe),fog:!!X,useFog:b.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:me,skinning:k.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Ae,morphTextureStride:Ge,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ne,decodeVideoTexture:Xe&&b.map.isVideoTexture===!0&&Ye.getTransfer(b.map.colorSpace)===Je,decodeVideoTextureEmissive:xe&&b.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(b.emissiveMap.colorSpace)===Je,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===on,flipSided:b.side===Lt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:_e&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&b.extensions.multiDraw===!0||we)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return nt.vertexUv1s=c.has(1),nt.vertexUv2s=c.has(2),nt.vertexUv3s=c.has(3),c.clear(),nt}function d(b){const y=[];if(b.shaderID?y.push(b.shaderID):(y.push(b.customVertexShaderID),y.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)y.push(I),y.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(T(y,b),E(y,b),y.push(i.outputColorSpace)),y.push(b.customProgramCacheKey),y.join()}function T(b,y){b.push(y.precision),b.push(y.outputColorSpace),b.push(y.envMapMode),b.push(y.envMapCubeUVHeight),b.push(y.mapUv),b.push(y.alphaMapUv),b.push(y.lightMapUv),b.push(y.aoMapUv),b.push(y.bumpMapUv),b.push(y.normalMapUv),b.push(y.displacementMapUv),b.push(y.emissiveMapUv),b.push(y.metalnessMapUv),b.push(y.roughnessMapUv),b.push(y.anisotropyMapUv),b.push(y.clearcoatMapUv),b.push(y.clearcoatNormalMapUv),b.push(y.clearcoatRoughnessMapUv),b.push(y.iridescenceMapUv),b.push(y.iridescenceThicknessMapUv),b.push(y.sheenColorMapUv),b.push(y.sheenRoughnessMapUv),b.push(y.specularMapUv),b.push(y.specularColorMapUv),b.push(y.specularIntensityMapUv),b.push(y.transmissionMapUv),b.push(y.thicknessMapUv),b.push(y.combine),b.push(y.fogExp2),b.push(y.sizeAttenuation),b.push(y.morphTargetsCount),b.push(y.morphAttributeCount),b.push(y.numDirLights),b.push(y.numPointLights),b.push(y.numSpotLights),b.push(y.numSpotLightMaps),b.push(y.numHemiLights),b.push(y.numRectAreaLights),b.push(y.numDirLightShadows),b.push(y.numPointLightShadows),b.push(y.numSpotLightShadows),b.push(y.numSpotLightShadowsWithMaps),b.push(y.numLightProbes),b.push(y.shadowMapType),b.push(y.toneMapping),b.push(y.numClippingPlanes),b.push(y.numClipIntersection),b.push(y.depthPacking)}function E(b,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),b.push(a.mask)}function v(b){const y=g[b.type];let I;if(y){const D=rn[y];I=ts.clone(D.uniforms)}else I=b.uniforms;return I}function R(b,y){let I;for(let D=0,k=h.length;D<k;D++){const X=h[D];if(X.cacheKey===y){I=X,++I.usedTimes;break}}return I===void 0&&(I=new dm(i,y,b,r),h.push(I)),I}function A(b){if(--b.usedTimes===0){const y=h.indexOf(b);h[y]=h[h.length-1],h.pop(),b.destroy()}}function C(b){l.remove(b)}function F(){l.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:v,acquireProgram:R,releaseProgram:A,releaseShaderCache:C,programs:h,dispose:F}}function _m(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function vm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function rl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ol(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,f,m,g,S,p){let d=i[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:m,groupOrder:g,renderOrder:u.renderOrder,z:S,group:p},i[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=m,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=S,d.group=p),e++,d}function a(u,f,m,g,S,p){const d=o(u,f,m,g,S,p);m.transmission>0?n.push(d):m.transparent===!0?s.push(d):t.push(d)}function l(u,f,m,g,S,p){const d=o(u,f,m,g,S,p);m.transmission>0?n.unshift(d):m.transparent===!0?s.unshift(d):t.unshift(d)}function c(u,f){t.length>1&&t.sort(u||vm),n.length>1&&n.sort(f||rl),s.length>1&&s.sort(f||rl)}function h(){for(let u=e,f=i.length;u<f;u++){const m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function xm(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new ol,i.set(n,[o])):s>=r.length?(o=new ol,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Mm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ee};break;case"SpotLight":t={position:new L,direction:new L,color:new Ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ee,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ee,groundColor:new Ee};break;case"RectAreaLight":t={color:new Ee,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function Sm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let ym=0;function bm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Em(i){const e=new Mm,t=Sm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const s=new L,r=new dt,o=new dt;function a(c){let h=0,u=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let m=0,g=0,S=0,p=0,d=0,T=0,E=0,v=0,R=0,A=0,C=0;c.sort(bm);for(let b=0,y=c.length;b<y;b++){const I=c[b],D=I.color,k=I.intensity,X=I.distance,q=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=D.r*k,u+=D.g*k,f+=D.b*k;else if(I.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(I.sh.coefficients[Y],k);C++}else if(I.isDirectionalLight){const Y=e.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const Z=I.shadow,W=t.get(I);W.shadowIntensity=Z.intensity,W.shadowBias=Z.bias,W.shadowNormalBias=Z.normalBias,W.shadowRadius=Z.radius,W.shadowMapSize=Z.mapSize,n.directionalShadow[m]=W,n.directionalShadowMap[m]=q,n.directionalShadowMatrix[m]=I.shadow.matrix,T++}n.directional[m]=Y,m++}else if(I.isSpotLight){const Y=e.get(I);Y.position.setFromMatrixPosition(I.matrixWorld),Y.color.copy(D).multiplyScalar(k),Y.distance=X,Y.coneCos=Math.cos(I.angle),Y.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Y.decay=I.decay,n.spot[S]=Y;const Z=I.shadow;if(I.map&&(n.spotLightMap[R]=I.map,R++,Z.updateMatrices(I),I.castShadow&&A++),n.spotLightMatrix[S]=Z.matrix,I.castShadow){const W=t.get(I);W.shadowIntensity=Z.intensity,W.shadowBias=Z.bias,W.shadowNormalBias=Z.normalBias,W.shadowRadius=Z.radius,W.shadowMapSize=Z.mapSize,n.spotShadow[S]=W,n.spotShadowMap[S]=q,v++}S++}else if(I.isRectAreaLight){const Y=e.get(I);Y.color.copy(D).multiplyScalar(k),Y.halfWidth.set(I.width*.5,0,0),Y.halfHeight.set(0,I.height*.5,0),n.rectArea[p]=Y,p++}else if(I.isPointLight){const Y=e.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),Y.distance=I.distance,Y.decay=I.decay,I.castShadow){const Z=I.shadow,W=t.get(I);W.shadowIntensity=Z.intensity,W.shadowBias=Z.bias,W.shadowNormalBias=Z.normalBias,W.shadowRadius=Z.radius,W.shadowMapSize=Z.mapSize,W.shadowCameraNear=Z.camera.near,W.shadowCameraFar=Z.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=I.shadow.matrix,E++}n.point[g]=Y,g++}else if(I.isHemisphereLight){const Y=e.get(I);Y.skyColor.copy(I.color).multiplyScalar(k),Y.groundColor.copy(I.groundColor).multiplyScalar(k),n.hemi[d]=Y,d++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=le.LTC_FLOAT_1,n.rectAreaLTC2=le.LTC_FLOAT_2):(n.rectAreaLTC1=le.LTC_HALF_1,n.rectAreaLTC2=le.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const F=n.hash;(F.directionalLength!==m||F.pointLength!==g||F.spotLength!==S||F.rectAreaLength!==p||F.hemiLength!==d||F.numDirectionalShadows!==T||F.numPointShadows!==E||F.numSpotShadows!==v||F.numSpotMaps!==R||F.numLightProbes!==C)&&(n.directional.length=m,n.spot.length=S,n.rectArea.length=p,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=v+R-A,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,F.directionalLength=m,F.pointLength=g,F.spotLength=S,F.rectAreaLength=p,F.hemiLength=d,F.numDirectionalShadows=T,F.numPointShadows=E,F.numSpotShadows=v,F.numSpotMaps=R,F.numLightProbes=C,n.version=ym++)}function l(c,h){let u=0,f=0,m=0,g=0,S=0;const p=h.matrixWorldInverse;for(let d=0,T=c.length;d<T;d++){const E=c[d];if(E.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(p),u++}else if(E.isSpotLight){const v=n.spot[m];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(p),m++}else if(E.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(p),o.identity(),r.copy(E.matrixWorld),r.premultiply(p),o.extractRotation(r),v.halfWidth.set(E.width*.5,0,0),v.halfHeight.set(0,E.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(p),f++}else if(E.isHemisphereLight){const v=n.hemi[S];v.direction.setFromMatrixPosition(E.matrixWorld),v.direction.transformDirection(p),S++}}}return{setup:a,setupView:l,state:n}}function al(i){const e=new Em(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Tm(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new al(i),e.set(s,[a])):r>=o.length?(a=new al(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const wm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Am=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Rm(i,e,t){let n=new qo;const s=new be,r=new be,o=new ut,a=new jh({depthPacking:Xc}),l=new Kh,c={},h=t.maxTextureSize,u={[Nn]:Lt,[Lt]:Nn,[on]:on},f=new bt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new be},radius:{value:4}},vertexShader:wm,fragmentShader:Am}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new Nt;g.setAttribute("position",new Vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Ze(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=El;let d=this.type;this.render=function(A,C,F){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const b=i.getRenderTarget(),y=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),D=i.state;D.setBlending(Sn),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const k=d!==vn&&this.type===vn,X=d===vn&&this.type!==vn;for(let q=0,Y=A.length;q<Y;q++){const Z=A[q],W=Z.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const oe=W.getFrameExtents();if(s.multiply(oe),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/oe.x),s.x=r.x*oe.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/oe.y),s.y=r.y*oe.y,W.mapSize.y=r.y)),W.map===null||k===!0||X===!0){const Ae=this.type!==vn?{minFilter:en,magFilter:en}:{};W.map!==null&&W.map.dispose(),W.map=new tn(s.x,s.y,Ae),W.map.texture.name=Z.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const de=W.getViewportCount();for(let Ae=0;Ae<de;Ae++){const Ge=W.getViewport(Ae);o.set(r.x*Ge.x,r.y*Ge.y,r.x*Ge.z,r.y*Ge.w),D.viewport(o),W.updateMatrices(Z,Ae),n=W.getFrustum(),v(C,F,W.camera,Z,this.type)}W.isPointLightShadow!==!0&&this.type===vn&&T(W,F),W.needsUpdate=!1}d=this.type,p.needsUpdate=!1,i.setRenderTarget(b,y,I)};function T(A,C){const F=e.update(S);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new tn(s.x,s.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(C,null,F,f,S,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(C,null,F,m,S,null)}function E(A,C,F,b){let y=null;const I=F.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(I!==void 0)y=I;else if(y=F.isPointLight===!0?l:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const D=y.uuid,k=C.uuid;let X=c[D];X===void 0&&(X={},c[D]=X);let q=X[k];q===void 0&&(q=y.clone(),X[k]=q,C.addEventListener("dispose",R)),y=q}if(y.visible=C.visible,y.wireframe=C.wireframe,b===vn?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:u[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,F.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const D=i.properties.get(y);D.light=F}return y}function v(A,C,F,b,y){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===vn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,A.matrixWorld);const k=e.update(A),X=A.material;if(Array.isArray(X)){const q=k.groups;for(let Y=0,Z=q.length;Y<Z;Y++){const W=q[Y],oe=X[W.materialIndex];if(oe&&oe.visible){const de=E(A,oe,b,y);A.onBeforeShadow(i,A,C,F,k,de,W),i.renderBufferDirect(F,null,k,de,A,W),A.onAfterShadow(i,A,C,F,k,de,W)}}}else if(X.visible){const q=E(A,X,b,y);A.onBeforeShadow(i,A,C,F,k,q,null),i.renderBufferDirect(F,null,k,q,A,null),A.onAfterShadow(i,A,C,F,k,q,null)}}const D=A.children;for(let k=0,X=D.length;k<X;k++)v(D[k],C,F,b,y)}function R(A){A.target.removeEventListener("dispose",R);for(const F in c){const b=c[F],y=A.target.uuid;y in b&&(b[y].dispose(),delete b[y])}}}const Cm={[Gr]:Wr,[Xr]:jr,[qr]:Kr,[yi]:Yr,[Wr]:Gr,[jr]:Xr,[Kr]:qr,[Yr]:yi};function Pm(i,e){function t(){let U=!1;const se=new ut;let ae=null;const pe=new ut(0,0,0,0);return{setMask:function(te){ae!==te&&!U&&(i.colorMask(te,te,te,te),ae=te)},setLocked:function(te){U=te},setClear:function(te,J,_e,Ne,nt){nt===!0&&(te*=Ne,J*=Ne,_e*=Ne),se.set(te,J,_e,Ne),pe.equals(se)===!1&&(i.clearColor(te,J,_e,Ne),pe.copy(se))},reset:function(){U=!1,ae=null,pe.set(-1,0,0,0)}}}function n(){let U=!1,se=!1,ae=null,pe=null,te=null;return{setReversed:function(J){if(se!==J){const _e=e.get("EXT_clip_control");J?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),se=J;const Ne=te;te=null,this.setClear(Ne)}},getReversed:function(){return se},setTest:function(J){J?ee(i.DEPTH_TEST):me(i.DEPTH_TEST)},setMask:function(J){ae!==J&&!U&&(i.depthMask(J),ae=J)},setFunc:function(J){if(se&&(J=Cm[J]),pe!==J){switch(J){case Gr:i.depthFunc(i.NEVER);break;case Wr:i.depthFunc(i.ALWAYS);break;case Xr:i.depthFunc(i.LESS);break;case yi:i.depthFunc(i.LEQUAL);break;case qr:i.depthFunc(i.EQUAL);break;case Yr:i.depthFunc(i.GEQUAL);break;case jr:i.depthFunc(i.GREATER);break;case Kr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=J}},setLocked:function(J){U=J},setClear:function(J){te!==J&&(se&&(J=1-J),i.clearDepth(J),te=J)},reset:function(){U=!1,ae=null,pe=null,te=null,se=!1}}}function s(){let U=!1,se=null,ae=null,pe=null,te=null,J=null,_e=null,Ne=null,nt=null;return{setTest:function($e){U||($e?ee(i.STENCIL_TEST):me(i.STENCIL_TEST))},setMask:function($e){se!==$e&&!U&&(i.stencilMask($e),se=$e)},setFunc:function($e,un,nn){(ae!==$e||pe!==un||te!==nn)&&(i.stencilFunc($e,un,nn),ae=$e,pe=un,te=nn)},setOp:function($e,un,nn){(J!==$e||_e!==un||Ne!==nn)&&(i.stencilOp($e,un,nn),J=$e,_e=un,Ne=nn)},setLocked:function($e){U=$e},setClear:function($e){nt!==$e&&(i.clearStencil($e),nt=$e)},reset:function(){U=!1,se=null,ae=null,pe=null,te=null,J=null,_e=null,Ne=null,nt=null}}}const r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,m=[],g=null,S=!1,p=null,d=null,T=null,E=null,v=null,R=null,A=null,C=new Ee(0,0,0),F=0,b=!1,y=null,I=null,D=null,k=null,X=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,Z=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(W)[1]),Y=Z>=1):W.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Y=Z>=2);let oe=null,de={};const Ae=i.getParameter(i.SCISSOR_BOX),Ge=i.getParameter(i.VIEWPORT),tt=new ut().fromArray(Ae),st=new ut().fromArray(Ge);function Ke(U,se,ae,pe){const te=new Uint8Array(4),J=i.createTexture();i.bindTexture(U,J),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _e=0;_e<ae;_e++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,te):i.texImage2D(se+_e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,te);return J}const $={};$[i.TEXTURE_2D]=Ke(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=Ke(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[i.TEXTURE_2D_ARRAY]=Ke(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=Ke(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ee(i.DEPTH_TEST),o.setFunc(yi),De(!1),ve(aa),ee(i.CULL_FACE),rt(Sn);function ee(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function me(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Fe(U,se){return u[U]!==se?(i.bindFramebuffer(U,se),u[U]=se,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=se),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=se),!0):!1}function we(U,se){let ae=m,pe=!1;if(U){ae=f.get(se),ae===void 0&&(ae=[],f.set(se,ae));const te=U.textures;if(ae.length!==te.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let J=0,_e=te.length;J<_e;J++)ae[J]=i.COLOR_ATTACHMENT0+J;ae.length=te.length,pe=!0}}else ae[0]!==i.BACK&&(ae[0]=i.BACK,pe=!0);pe&&i.drawBuffers(ae)}function Xe(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const Et={[jn]:i.FUNC_ADD,[Ec]:i.FUNC_SUBTRACT,[Tc]:i.FUNC_REVERSE_SUBTRACT};Et[wc]=i.MIN,Et[Ac]=i.MAX;const P={[Rc]:i.ZERO,[Cc]:i.ONE,[Pc]:i.SRC_COLOR,[Hr]:i.SRC_ALPHA,[Nc]:i.SRC_ALPHA_SATURATE,[Uc]:i.DST_COLOR,[Dc]:i.DST_ALPHA,[Lc]:i.ONE_MINUS_SRC_COLOR,[Vr]:i.ONE_MINUS_SRC_ALPHA,[Fc]:i.ONE_MINUS_DST_COLOR,[Ic]:i.ONE_MINUS_DST_ALPHA,[Oc]:i.CONSTANT_COLOR,[Bc]:i.ONE_MINUS_CONSTANT_COLOR,[zc]:i.CONSTANT_ALPHA,[kc]:i.ONE_MINUS_CONSTANT_ALPHA};function rt(U,se,ae,pe,te,J,_e,Ne,nt,$e){if(U===Sn){S===!0&&(me(i.BLEND),S=!1);return}if(S===!1&&(ee(i.BLEND),S=!0),U!==bc){if(U!==p||$e!==b){if((d!==jn||v!==jn)&&(i.blendEquation(i.FUNC_ADD),d=jn,v=jn),$e)switch(U){case Zn:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kr:i.blendFunc(i.ONE,i.ONE);break;case la:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ca:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Zn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case la:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ca:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}T=null,E=null,R=null,A=null,C.set(0,0,0),F=0,p=U,b=$e}return}te=te||se,J=J||ae,_e=_e||pe,(se!==d||te!==v)&&(i.blendEquationSeparate(Et[se],Et[te]),d=se,v=te),(ae!==T||pe!==E||J!==R||_e!==A)&&(i.blendFuncSeparate(P[ae],P[pe],P[J],P[_e]),T=ae,E=pe,R=J,A=_e),(Ne.equals(C)===!1||nt!==F)&&(i.blendColor(Ne.r,Ne.g,Ne.b,nt),C.copy(Ne),F=nt),p=U,b=!1}function Be(U,se){U.side===on?me(i.CULL_FACE):ee(i.CULL_FACE);let ae=U.side===Lt;se&&(ae=!ae),De(ae),U.blending===Zn&&U.transparent===!1?rt(Sn):rt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);const pe=U.stencilWrite;a.setTest(pe),pe&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),xe(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ee(i.SAMPLE_ALPHA_TO_COVERAGE):me(i.SAMPLE_ALPHA_TO_COVERAGE)}function De(U){y!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),y=U)}function ve(U){U!==Sc?(ee(i.CULL_FACE),U!==I&&(U===aa?i.cullFace(i.BACK):U===yc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):me(i.CULL_FACE),I=U}function ot(U){U!==D&&(Y&&i.lineWidth(U),D=U)}function xe(U,se,ae){U?(ee(i.POLYGON_OFFSET_FILL),(k!==se||X!==ae)&&(i.polygonOffset(se,ae),k=se,X=ae)):me(i.POLYGON_OFFSET_FILL)}function He(U){U?ee(i.SCISSOR_TEST):me(i.SCISSOR_TEST)}function xt(U){U===void 0&&(U=i.TEXTURE0+q-1),oe!==U&&(i.activeTexture(U),oe=U)}function ft(U,se,ae){ae===void 0&&(oe===null?ae=i.TEXTURE0+q-1:ae=oe);let pe=de[ae];pe===void 0&&(pe={type:void 0,texture:void 0},de[ae]=pe),(pe.type!==U||pe.texture!==se)&&(oe!==ae&&(i.activeTexture(ae),oe=ae),i.bindTexture(U,se||$[U]),pe.type=U,pe.texture=se)}function w(){const U=de[oe];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function B(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function j(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Te(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function re(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Me(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Se(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ie(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ue(U){tt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),tt.copy(U))}function Le(U){st.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),st.copy(U))}function ye(U,se){let ae=c.get(se);ae===void 0&&(ae=new WeakMap,c.set(se,ae));let pe=ae.get(U);pe===void 0&&(pe=i.getUniformBlockIndex(se,U.name),ae.set(U,pe))}function ce(U,se){const pe=c.get(se).get(U);l.get(se)!==pe&&(i.uniformBlockBinding(se,pe,U.__bindingPointIndex),l.set(se,pe))}function ze(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},oe=null,de={},u={},f=new WeakMap,m=[],g=null,S=!1,p=null,d=null,T=null,E=null,v=null,R=null,A=null,C=new Ee(0,0,0),F=0,b=!1,y=null,I=null,D=null,k=null,X=null,tt.set(0,0,i.canvas.width,i.canvas.height),st.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ee,disable:me,bindFramebuffer:Fe,drawBuffers:we,useProgram:Xe,setBlending:rt,setMaterial:Be,setFlipSided:De,setCullFace:ve,setLineWidth:ot,setPolygonOffset:xe,setScissorTest:He,activeTexture:xt,bindTexture:ft,unbindTexture:w,compressedTexImage2D:_,compressedTexImage3D:B,texImage2D:Se,texImage3D:ie,updateUBOMapping:ye,uniformBlockBinding:ce,texStorage2D:re,texStorage3D:Me,texSubImage2D:K,texSubImage3D:Q,compressedTexSubImage2D:j,compressedTexSubImage3D:Te,scissor:ue,viewport:Le,reset:ze}}function Lm(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new be,h=new WeakMap;let u;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,_){return m?new OffscreenCanvas(w,_):qs("canvas")}function S(w,_,B){let K=1;const Q=ft(w);if((Q.width>B||Q.height>B)&&(K=B/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const j=Math.floor(K*Q.width),Te=Math.floor(K*Q.height);u===void 0&&(u=g(j,Te));const re=_?g(j,Te):u;return re.width=j,re.height=Te,re.getContext("2d").drawImage(w,0,0,j,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+j+"x"+Te+")."),re}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function p(w){return w.generateMipmaps}function d(w){i.generateMipmap(w)}function T(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(w,_,B,K,Q=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let j=_;if(_===i.RED&&(B===i.FLOAT&&(j=i.R32F),B===i.HALF_FLOAT&&(j=i.R16F),B===i.UNSIGNED_BYTE&&(j=i.R8)),_===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.R8UI),B===i.UNSIGNED_SHORT&&(j=i.R16UI),B===i.UNSIGNED_INT&&(j=i.R32UI),B===i.BYTE&&(j=i.R8I),B===i.SHORT&&(j=i.R16I),B===i.INT&&(j=i.R32I)),_===i.RG&&(B===i.FLOAT&&(j=i.RG32F),B===i.HALF_FLOAT&&(j=i.RG16F),B===i.UNSIGNED_BYTE&&(j=i.RG8)),_===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RG8UI),B===i.UNSIGNED_SHORT&&(j=i.RG16UI),B===i.UNSIGNED_INT&&(j=i.RG32UI),B===i.BYTE&&(j=i.RG8I),B===i.SHORT&&(j=i.RG16I),B===i.INT&&(j=i.RG32I)),_===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RGB8UI),B===i.UNSIGNED_SHORT&&(j=i.RGB16UI),B===i.UNSIGNED_INT&&(j=i.RGB32UI),B===i.BYTE&&(j=i.RGB8I),B===i.SHORT&&(j=i.RGB16I),B===i.INT&&(j=i.RGB32I)),_===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),B===i.UNSIGNED_INT&&(j=i.RGBA32UI),B===i.BYTE&&(j=i.RGBA8I),B===i.SHORT&&(j=i.RGBA16I),B===i.INT&&(j=i.RGBA32I)),_===i.RGB&&(B===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),_===i.RGBA){const Te=Q?Ws:Ye.getTransfer(K);B===i.FLOAT&&(j=i.RGBA32F),B===i.HALF_FLOAT&&(j=i.RGBA16F),B===i.UNSIGNED_BYTE&&(j=Te===Je?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function v(w,_){let B;return w?_===null||_===Qn||_===$i?B=i.DEPTH24_STENCIL8:_===Mn?B=i.DEPTH32F_STENCIL8:_===Ki&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Qn||_===$i?B=i.DEPTH_COMPONENT24:_===Mn?B=i.DEPTH_COMPONENT32F:_===Ki&&(B=i.DEPTH_COMPONENT16),B}function R(w,_){return p(w)===!0||w.isFramebufferTexture&&w.minFilter!==en&&w.minFilter!==an?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function A(w){const _=w.target;_.removeEventListener("dispose",A),F(_),_.isVideoTexture&&h.delete(_)}function C(w){const _=w.target;_.removeEventListener("dispose",C),y(_)}function F(w){const _=n.get(w);if(_.__webglInit===void 0)return;const B=w.source,K=f.get(B);if(K){const Q=K[_.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&b(w),Object.keys(K).length===0&&f.delete(B)}n.remove(w)}function b(w){const _=n.get(w);i.deleteTexture(_.__webglTexture);const B=w.source,K=f.get(B);delete K[_.__cacheKey],o.memory.textures--}function y(w){const _=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(_.__webglFramebuffer[K]))for(let Q=0;Q<_.__webglFramebuffer[K].length;Q++)i.deleteFramebuffer(_.__webglFramebuffer[K][Q]);else i.deleteFramebuffer(_.__webglFramebuffer[K]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[K])}else{if(Array.isArray(_.__webglFramebuffer))for(let K=0;K<_.__webglFramebuffer.length;K++)i.deleteFramebuffer(_.__webglFramebuffer[K]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let K=0;K<_.__webglColorRenderbuffer.length;K++)_.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[K]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const B=w.textures;for(let K=0,Q=B.length;K<Q;K++){const j=n.get(B[K]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),o.memory.textures--),n.remove(B[K])}n.remove(w)}let I=0;function D(){I=0}function k(){const w=I;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),I+=1,w}function X(w){const _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function q(w,_){const B=n.get(w);if(w.isVideoTexture&&He(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&B.__version!==w.version){const K=w.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(B,w,_);return}}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+_)}function Y(w,_){const B=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){$(B,w,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+_)}function Z(w,_){const B=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){$(B,w,_);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+_)}function W(w,_){const B=n.get(w);if(w.version>0&&B.__version!==w.version){ee(B,w,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+_)}const oe={[Zr]:i.REPEAT,[$n]:i.CLAMP_TO_EDGE,[Qr]:i.MIRRORED_REPEAT},de={[en]:i.NEAREST,[Gc]:i.NEAREST_MIPMAP_NEAREST,[as]:i.NEAREST_MIPMAP_LINEAR,[an]:i.LINEAR,[er]:i.LINEAR_MIPMAP_NEAREST,[Jn]:i.LINEAR_MIPMAP_LINEAR},Ae={[Yc]:i.NEVER,[Qc]:i.ALWAYS,[jc]:i.LESS,[Gl]:i.LEQUAL,[Kc]:i.EQUAL,[Zc]:i.GEQUAL,[$c]:i.GREATER,[Jc]:i.NOTEQUAL};function Ge(w,_){if(_.type===Mn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===an||_.magFilter===er||_.magFilter===as||_.magFilter===Jn||_.minFilter===an||_.minFilter===er||_.minFilter===as||_.minFilter===Jn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,oe[_.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,oe[_.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,oe[_.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,de[_.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,de[_.minFilter]),_.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,Ae[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===en||_.minFilter!==as&&_.minFilter!==Jn||_.type===Mn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function tt(w,_){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",A));const K=_.source;let Q=f.get(K);Q===void 0&&(Q={},f.set(K,Q));const j=X(_);if(j!==w.__cacheKey){Q[j]===void 0&&(Q[j]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),Q[j].usedTimes++;const Te=Q[w.__cacheKey];Te!==void 0&&(Q[w.__cacheKey].usedTimes--,Te.usedTimes===0&&b(_)),w.__cacheKey=j,w.__webglTexture=Q[j].texture}return B}function st(w,_,B){return Math.floor(Math.floor(w/B)/_)}function Ke(w,_,B,K){const j=w.updateRanges;if(j.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,B,K,_.data);else{j.sort((ie,ue)=>ie.start-ue.start);let Te=0;for(let ie=1;ie<j.length;ie++){const ue=j[Te],Le=j[ie],ye=ue.start+ue.count,ce=st(Le.start,_.width,4),ze=st(ue.start,_.width,4);Le.start<=ye+1&&ce===ze&&st(Le.start+Le.count-1,_.width,4)===ce?ue.count=Math.max(ue.count,Le.start+Le.count-ue.start):(++Te,j[Te]=Le)}j.length=Te+1;const re=i.getParameter(i.UNPACK_ROW_LENGTH),Me=i.getParameter(i.UNPACK_SKIP_PIXELS),Se=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let ie=0,ue=j.length;ie<ue;ie++){const Le=j[ie],ye=Math.floor(Le.start/4),ce=Math.ceil(Le.count/4),ze=ye%_.width,U=Math.floor(ye/_.width),se=ce,ae=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,ze),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,ze,U,se,ae,B,K,_.data)}w.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,re),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Me),i.pixelStorei(i.UNPACK_SKIP_ROWS,Se)}}function $(w,_,B){let K=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(K=i.TEXTURE_3D);const Q=tt(w,_),j=_.source;t.bindTexture(K,w.__webglTexture,i.TEXTURE0+B);const Te=n.get(j);if(j.version!==Te.__version||Q===!0){t.activeTexture(i.TEXTURE0+B);const re=Ye.getPrimaries(Ye.workingColorSpace),Me=_.colorSpace===In?null:Ye.getPrimaries(_.colorSpace),Se=_.colorSpace===In||re===Me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);let ie=S(_.image,!1,s.maxTextureSize);ie=xt(_,ie);const ue=r.convert(_.format,_.colorSpace),Le=r.convert(_.type);let ye=E(_.internalFormat,ue,Le,_.colorSpace,_.isVideoTexture);Ge(K,_);let ce;const ze=_.mipmaps,U=_.isVideoTexture!==!0,se=Te.__version===void 0||Q===!0,ae=j.dataReady,pe=R(_,ie);if(_.isDepthTexture)ye=v(_.format===Zi,_.type),se&&(U?t.texStorage2D(i.TEXTURE_2D,1,ye,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,ye,ie.width,ie.height,0,ue,Le,null));else if(_.isDataTexture)if(ze.length>0){U&&se&&t.texStorage2D(i.TEXTURE_2D,pe,ye,ze[0].width,ze[0].height);for(let te=0,J=ze.length;te<J;te++)ce=ze[te],U?ae&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,ce.width,ce.height,ue,Le,ce.data):t.texImage2D(i.TEXTURE_2D,te,ye,ce.width,ce.height,0,ue,Le,ce.data);_.generateMipmaps=!1}else U?(se&&t.texStorage2D(i.TEXTURE_2D,pe,ye,ie.width,ie.height),ae&&Ke(_,ie,ue,Le)):t.texImage2D(i.TEXTURE_2D,0,ye,ie.width,ie.height,0,ue,Le,ie.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){U&&se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,ye,ze[0].width,ze[0].height,ie.depth);for(let te=0,J=ze.length;te<J;te++)if(ce=ze[te],_.format!==Qt)if(ue!==null)if(U){if(ae)if(_.layerUpdates.size>0){const _e=Oa(ce.width,ce.height,_.format,_.type);for(const Ne of _.layerUpdates){const nt=ce.data.subarray(Ne*_e/ce.data.BYTES_PER_ELEMENT,(Ne+1)*_e/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,Ne,ce.width,ce.height,1,ue,nt)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,ce.width,ce.height,ie.depth,ue,ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,te,ye,ce.width,ce.height,ie.depth,0,ce.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?ae&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,ce.width,ce.height,ie.depth,ue,Le,ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,te,ye,ce.width,ce.height,ie.depth,0,ue,Le,ce.data)}else{U&&se&&t.texStorage2D(i.TEXTURE_2D,pe,ye,ze[0].width,ze[0].height);for(let te=0,J=ze.length;te<J;te++)ce=ze[te],_.format!==Qt?ue!==null?U?ae&&t.compressedTexSubImage2D(i.TEXTURE_2D,te,0,0,ce.width,ce.height,ue,ce.data):t.compressedTexImage2D(i.TEXTURE_2D,te,ye,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?ae&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,ce.width,ce.height,ue,Le,ce.data):t.texImage2D(i.TEXTURE_2D,te,ye,ce.width,ce.height,0,ue,Le,ce.data)}else if(_.isDataArrayTexture)if(U){if(se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,ye,ie.width,ie.height,ie.depth),ae)if(_.layerUpdates.size>0){const te=Oa(ie.width,ie.height,_.format,_.type);for(const J of _.layerUpdates){const _e=ie.data.subarray(J*te/ie.data.BYTES_PER_ELEMENT,(J+1)*te/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,ie.width,ie.height,1,ue,Le,_e)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,ue,Le,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ye,ie.width,ie.height,ie.depth,0,ue,Le,ie.data);else if(_.isData3DTexture)U?(se&&t.texStorage3D(i.TEXTURE_3D,pe,ye,ie.width,ie.height,ie.depth),ae&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,ue,Le,ie.data)):t.texImage3D(i.TEXTURE_3D,0,ye,ie.width,ie.height,ie.depth,0,ue,Le,ie.data);else if(_.isFramebufferTexture){if(se)if(U)t.texStorage2D(i.TEXTURE_2D,pe,ye,ie.width,ie.height);else{let te=ie.width,J=ie.height;for(let _e=0;_e<pe;_e++)t.texImage2D(i.TEXTURE_2D,_e,ye,te,J,0,ue,Le,null),te>>=1,J>>=1}}else if(ze.length>0){if(U&&se){const te=ft(ze[0]);t.texStorage2D(i.TEXTURE_2D,pe,ye,te.width,te.height)}for(let te=0,J=ze.length;te<J;te++)ce=ze[te],U?ae&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,ue,Le,ce):t.texImage2D(i.TEXTURE_2D,te,ye,ue,Le,ce);_.generateMipmaps=!1}else if(U){if(se){const te=ft(ie);t.texStorage2D(i.TEXTURE_2D,pe,ye,te.width,te.height)}ae&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ue,Le,ie)}else t.texImage2D(i.TEXTURE_2D,0,ye,ue,Le,ie);p(_)&&d(K),Te.__version=j.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function ee(w,_,B){if(_.image.length!==6)return;const K=tt(w,_),Q=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+B);const j=n.get(Q);if(Q.version!==j.__version||K===!0){t.activeTexture(i.TEXTURE0+B);const Te=Ye.getPrimaries(Ye.workingColorSpace),re=_.colorSpace===In?null:Ye.getPrimaries(_.colorSpace),Me=_.colorSpace===In||Te===re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const Se=_.isCompressedTexture||_.image[0].isCompressedTexture,ie=_.image[0]&&_.image[0].isDataTexture,ue=[];for(let J=0;J<6;J++)!Se&&!ie?ue[J]=S(_.image[J],!0,s.maxCubemapSize):ue[J]=ie?_.image[J].image:_.image[J],ue[J]=xt(_,ue[J]);const Le=ue[0],ye=r.convert(_.format,_.colorSpace),ce=r.convert(_.type),ze=E(_.internalFormat,ye,ce,_.colorSpace),U=_.isVideoTexture!==!0,se=j.__version===void 0||K===!0,ae=Q.dataReady;let pe=R(_,Le);Ge(i.TEXTURE_CUBE_MAP,_);let te;if(Se){U&&se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,ze,Le.width,Le.height);for(let J=0;J<6;J++){te=ue[J].mipmaps;for(let _e=0;_e<te.length;_e++){const Ne=te[_e];_.format!==Qt?ye!==null?U?ae&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,_e,0,0,Ne.width,Ne.height,ye,Ne.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,_e,ze,Ne.width,Ne.height,0,Ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,_e,0,0,Ne.width,Ne.height,ye,ce,Ne.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,_e,ze,Ne.width,Ne.height,0,ye,ce,Ne.data)}}}else{if(te=_.mipmaps,U&&se){te.length>0&&pe++;const J=ft(ue[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,ze,J.width,J.height)}for(let J=0;J<6;J++)if(ie){U?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ue[J].width,ue[J].height,ye,ce,ue[J].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,ze,ue[J].width,ue[J].height,0,ye,ce,ue[J].data);for(let _e=0;_e<te.length;_e++){const nt=te[_e].image[J].image;U?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,_e+1,0,0,nt.width,nt.height,ye,ce,nt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,_e+1,ze,nt.width,nt.height,0,ye,ce,nt.data)}}else{U?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ye,ce,ue[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,ze,ye,ce,ue[J]);for(let _e=0;_e<te.length;_e++){const Ne=te[_e];U?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,_e+1,0,0,ye,ce,Ne.image[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,_e+1,ze,ye,ce,Ne.image[J])}}}p(_)&&d(i.TEXTURE_CUBE_MAP),j.__version=Q.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function me(w,_,B,K,Q,j){const Te=r.convert(B.format,B.colorSpace),re=r.convert(B.type),Me=E(B.internalFormat,Te,re,B.colorSpace),Se=n.get(_),ie=n.get(B);if(ie.__renderTarget=_,!Se.__hasExternalTextures){const ue=Math.max(1,_.width>>j),Le=Math.max(1,_.height>>j);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,j,Me,ue,Le,_.depth,0,Te,re,null):t.texImage2D(Q,j,Me,ue,Le,0,Te,re,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),xe(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Q,ie.__webglTexture,0,ot(_)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,Q,ie.__webglTexture,j),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Fe(w,_,B){if(i.bindRenderbuffer(i.RENDERBUFFER,w),_.depthBuffer){const K=_.depthTexture,Q=K&&K.isDepthTexture?K.type:null,j=v(_.stencilBuffer,Q),Te=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=ot(_);xe(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re,j,_.width,_.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,re,j,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,j,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Te,i.RENDERBUFFER,w)}else{const K=_.textures;for(let Q=0;Q<K.length;Q++){const j=K[Q],Te=r.convert(j.format,j.colorSpace),re=r.convert(j.type),Me=E(j.internalFormat,Te,re,j.colorSpace),Se=ot(_);B&&xe(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Se,Me,_.width,_.height):xe(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Se,Me,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Me,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function we(w,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(_.depthTexture);K.__renderTarget=_,(!K.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q(_.depthTexture,0);const Q=K.__webglTexture,j=ot(_);if(_.depthTexture.format===Ji)xe(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(_.depthTexture.format===Zi)xe(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Xe(w){const _=n.get(w),B=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){const K=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),K){const Q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),_.__depthDisposeCallback=Q}_.__boundDepthTexture=K}if(w.depthTexture&&!_.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");const K=w.texture.mipmaps;K&&K.length>0?we(_.__webglFramebuffer[0],w):we(_.__webglFramebuffer,w)}else if(B){_.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[K]),_.__webglDepthbuffer[K]===void 0)_.__webglDepthbuffer[K]=i.createRenderbuffer(),Fe(_.__webglDepthbuffer[K],w,!1);else{const Q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=_.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,j)}}else{const K=w.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Fe(_.__webglDepthbuffer,w,!1);else{const Q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,j)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Et(w,_,B){const K=n.get(w);_!==void 0&&me(K.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Xe(w)}function P(w){const _=w.texture,B=n.get(w),K=n.get(_);w.addEventListener("dispose",C);const Q=w.textures,j=w.isWebGLCubeRenderTarget===!0,Te=Q.length>1;if(Te||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=_.version,o.memory.textures++),j){B.__webglFramebuffer=[];for(let re=0;re<6;re++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[re]=[];for(let Me=0;Me<_.mipmaps.length;Me++)B.__webglFramebuffer[re][Me]=i.createFramebuffer()}else B.__webglFramebuffer[re]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let re=0;re<_.mipmaps.length;re++)B.__webglFramebuffer[re]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Te)for(let re=0,Me=Q.length;re<Me;re++){const Se=n.get(Q[re]);Se.__webglTexture===void 0&&(Se.__webglTexture=i.createTexture(),o.memory.textures++)}if(w.samples>0&&xe(w)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let re=0;re<Q.length;re++){const Me=Q[re];B.__webglColorRenderbuffer[re]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[re]);const Se=r.convert(Me.format,Me.colorSpace),ie=r.convert(Me.type),ue=E(Me.internalFormat,Se,ie,Me.colorSpace,w.isXRRenderTarget===!0),Le=ot(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Le,ue,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,B.__webglColorRenderbuffer[re])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Fe(B.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),Ge(i.TEXTURE_CUBE_MAP,_);for(let re=0;re<6;re++)if(_.mipmaps&&_.mipmaps.length>0)for(let Me=0;Me<_.mipmaps.length;Me++)me(B.__webglFramebuffer[re][Me],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Me);else me(B.__webglFramebuffer[re],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);p(_)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let re=0,Me=Q.length;re<Me;re++){const Se=Q[re],ie=n.get(Se);let ue=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ue=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,ie.__webglTexture),Ge(ue,Se),me(B.__webglFramebuffer,w,Se,i.COLOR_ATTACHMENT0+re,ue,0),p(Se)&&d(ue)}t.unbindTexture()}else{let re=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(re=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,K.__webglTexture),Ge(re,_),_.mipmaps&&_.mipmaps.length>0)for(let Me=0;Me<_.mipmaps.length;Me++)me(B.__webglFramebuffer[Me],w,_,i.COLOR_ATTACHMENT0,re,Me);else me(B.__webglFramebuffer,w,_,i.COLOR_ATTACHMENT0,re,0);p(_)&&d(re),t.unbindTexture()}w.depthBuffer&&Xe(w)}function rt(w){const _=w.textures;for(let B=0,K=_.length;B<K;B++){const Q=_[B];if(p(Q)){const j=T(w),Te=n.get(Q).__webglTexture;t.bindTexture(j,Te),d(j),t.unbindTexture()}}}const Be=[],De=[];function ve(w){if(w.samples>0){if(xe(w)===!1){const _=w.textures,B=w.width,K=w.height;let Q=i.COLOR_BUFFER_BIT;const j=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Te=n.get(w),re=_.length>1;if(re)for(let Se=0;Se<_.length;Se++)t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);const Me=w.texture.mipmaps;Me&&Me.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Se=0;Se<_.length;Se++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),re){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Se]);const ie=n.get(_[Se]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ie,0)}i.blitFramebuffer(0,0,B,K,0,0,B,K,Q,i.NEAREST),l===!0&&(Be.length=0,De.length=0,Be.push(i.COLOR_ATTACHMENT0+Se),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Be.push(j),De.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,De)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Be))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),re)for(let Se=0;Se<_.length;Se++){t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Se]);const ie=n.get(_[Se]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const _=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function ot(w){return Math.min(s.maxSamples,w.samples)}function xe(w){const _=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function He(w){const _=o.render.frame;h.get(w)!==_&&(h.set(w,_),w.update())}function xt(w,_){const B=w.colorSpace,K=w.format,Q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==Ti&&B!==In&&(Ye.getTransfer(B)===Je?(K!==Qt||Q!==cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),_}function ft(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=D,this.setTexture2D=q,this.setTexture2DArray=Y,this.setTexture3D=Z,this.setTextureCube=W,this.rebindTextures=Et,this.setupRenderTarget=P,this.updateRenderTargetMipmap=rt,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=me,this.useMultisampledRTT=xe}function Dm(i,e){function t(n,s=In){let r;const o=Ye.getTransfer(s);if(n===cn)return i.UNSIGNED_BYTE;if(n===No)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Oo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Nl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ol)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ul)return i.BYTE;if(n===Fl)return i.SHORT;if(n===Ki)return i.UNSIGNED_SHORT;if(n===Fo)return i.INT;if(n===Qn)return i.UNSIGNED_INT;if(n===Mn)return i.FLOAT;if(n===yn)return i.HALF_FLOAT;if(n===Bl)return i.ALPHA;if(n===zl)return i.RGB;if(n===Qt)return i.RGBA;if(n===Ji)return i.DEPTH_COMPONENT;if(n===Zi)return i.DEPTH_STENCIL;if(n===kl)return i.RED;if(n===Bo)return i.RED_INTEGER;if(n===Hl)return i.RG;if(n===zo)return i.RG_INTEGER;if(n===ko)return i.RGBA_INTEGER;if(n===Bs||n===zs||n===ks||n===Hs)if(o===Je)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Bs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Hs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Bs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===zs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ks)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Hs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===eo||n===to||n===no||n===io)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===eo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===to)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===no)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===io)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===so||n===ro||n===oo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===so||n===ro)return o===Je?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===oo)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ao||n===lo||n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===_o||n===vo||n===xo||n===Mo||n===So)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ao)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===lo)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===co)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ho)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===uo)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===fo)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===po)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===mo)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===go)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_o)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===vo)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xo)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Mo)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===So)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===yo||n===bo||n===Eo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===yo)return o===Je?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Eo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===To||n===wo||n===Ao||n===Ro)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===To)return r.COMPRESSED_RED_RGTC1_EXT;if(n===wo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ao)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ro)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===$i?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Im=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Um=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Fm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new ec(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new bt({vertexShader:Im,fragmentShader:Um,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ze(new ei(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Nm extends Ri{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,m=null,g=null;const S=typeof XRWebGLBinding<"u",p=new Fm,d={},T=t.getContextAttributes();let E=null,v=null;const R=[],A=[],C=new be;let F=null;const b=new qt;b.viewport=new ut;const y=new qt;y.viewport=new ut;const I=[b,y],D=new eu;let k=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ee=R[$];return ee===void 0&&(ee=new Sr,R[$]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function($){let ee=R[$];return ee===void 0&&(ee=new Sr,R[$]=ee),ee.getGripSpace()},this.getHand=function($){let ee=R[$];return ee===void 0&&(ee=new Sr,R[$]=ee),ee.getHandSpace()};function q($){const ee=A.indexOf($.inputSource);if(ee===-1)return;const me=R[ee];me!==void 0&&(me.update($.inputSource,$.frame,c||o),me.dispatchEvent({type:$.type,data:$.inputSource}))}function Y(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",Z);for(let $=0;$<R.length;$++){const ee=A[$];ee!==null&&(A[$]=null,R[$].disconnect(ee))}k=null,X=null,p.reset();for(const $ in d)delete d[$];e.setRenderTarget(E),m=null,f=null,u=null,s=null,v=null,Ke.stop(),n.isPresenting=!1,e.setPixelRatio(F),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return u===null&&S&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",Z),T.xrCompatible!==!0&&await t.makeXRCompatible(),F=e.getPixelRatio(),e.getSize(C),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Fe=null,we=null;T.depth&&(we=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=T.stencil?Zi:Ji,Fe=T.stencil?$i:Qn);const Xe={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Xe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new tn(f.textureWidth,f.textureHeight,{format:Qt,type:cn,depthTexture:new Ql(f.textureWidth,f.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const me={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,me),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),v=new tn(m.framebufferWidth,m.framebufferHeight,{format:Qt,type:cn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Ke.setContext(s),Ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function Z($){for(let ee=0;ee<$.removed.length;ee++){const me=$.removed[ee],Fe=A.indexOf(me);Fe>=0&&(A[Fe]=null,R[Fe].disconnect(me))}for(let ee=0;ee<$.added.length;ee++){const me=$.added[ee];let Fe=A.indexOf(me);if(Fe===-1){for(let Xe=0;Xe<R.length;Xe++)if(Xe>=A.length){A.push(me),Fe=Xe;break}else if(A[Xe]===null){A[Xe]=me,Fe=Xe;break}if(Fe===-1)break}const we=R[Fe];we&&we.connect(me)}}const W=new L,oe=new L;function de($,ee,me){W.setFromMatrixPosition(ee.matrixWorld),oe.setFromMatrixPosition(me.matrixWorld);const Fe=W.distanceTo(oe),we=ee.projectionMatrix.elements,Xe=me.projectionMatrix.elements,Et=we[14]/(we[10]-1),P=we[14]/(we[10]+1),rt=(we[9]+1)/we[5],Be=(we[9]-1)/we[5],De=(we[8]-1)/we[0],ve=(Xe[8]+1)/Xe[0],ot=Et*De,xe=Et*ve,He=Fe/(-De+ve),xt=He*-De;if(ee.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(xt),$.translateZ(He),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),we[10]===-1)$.projectionMatrix.copy(ee.projectionMatrix),$.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const ft=Et+He,w=P+He,_=ot-xt,B=xe+(Fe-xt),K=rt*P/w*ft,Q=Be*P/w*ft;$.projectionMatrix.makePerspective(_,B,K,Q,ft,w),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Ae($,ee){ee===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ee.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let ee=$.near,me=$.far;p.texture!==null&&(p.depthNear>0&&(ee=p.depthNear),p.depthFar>0&&(me=p.depthFar)),D.near=y.near=b.near=ee,D.far=y.far=b.far=me,(k!==D.near||X!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),k=D.near,X=D.far),D.layers.mask=$.layers.mask|6,b.layers.mask=D.layers.mask&3,y.layers.mask=D.layers.mask&5;const Fe=$.parent,we=D.cameras;Ae(D,Fe);for(let Xe=0;Xe<we.length;Xe++)Ae(we[Xe],Fe);we.length===2?de(D,b,y):D.projectionMatrix.copy(b.projectionMatrix),Ge($,D,Fe)};function Ge($,ee,me){me===null?$.matrix.copy(ee.matrixWorld):($.matrix.copy(me.matrixWorld),$.matrix.invert(),$.matrix.multiply(ee.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ee.projectionMatrix),$.projectionMatrixInverse.copy(ee.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Qi*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=$)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(D)},this.getCameraTexture=function($){return d[$]};let tt=null;function st($,ee){if(h=ee.getViewerPose(c||o),g=ee,h!==null){const me=h.views;m!==null&&(e.setRenderTargetFramebuffer(v,m.framebuffer),e.setRenderTarget(v));let Fe=!1;me.length!==D.cameras.length&&(D.cameras.length=0,Fe=!0);for(let P=0;P<me.length;P++){const rt=me[P];let Be=null;if(m!==null)Be=m.getViewport(rt);else{const ve=u.getViewSubImage(f,rt);Be=ve.viewport,P===0&&(e.setRenderTargetTextures(v,ve.colorTexture,ve.depthStencilTexture),e.setRenderTarget(v))}let De=I[P];De===void 0&&(De=new qt,De.layers.enable(P),De.viewport=new ut,I[P]=De),De.matrix.fromArray(rt.transform.matrix),De.matrix.decompose(De.position,De.quaternion,De.scale),De.projectionMatrix.fromArray(rt.projectionMatrix),De.projectionMatrixInverse.copy(De.projectionMatrix).invert(),De.viewport.set(Be.x,Be.y,Be.width,Be.height),P===0&&(D.matrix.copy(De.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Fe===!0&&D.cameras.push(De)}const we=s.enabledFeatures;if(we&&we.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){u=n.getBinding();const P=u.getDepthInformation(me[0]);P&&P.isValid&&P.texture&&p.init(P,s.renderState)}if(we&&we.includes("camera-access")&&S){e.state.unbindTexture(),u=n.getBinding();for(let P=0;P<me.length;P++){const rt=me[P].camera;if(rt){let Be=d[rt];Be||(Be=new ec,d[rt]=Be);const De=u.getCameraImage(rt);Be.sourceTexture=De}}}}for(let me=0;me<R.length;me++){const Fe=A[me],we=R[me];Fe!==null&&we!==void 0&&we.update(Fe,ee,c||o)}tt&&tt($,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),g=null}const Ke=new ic;Ke.setAnimationLoop(st),this.setAnimationLoop=function($){tt=$},this.dispose=function(){}}}const Wn=new hn,Om=new dt;function Bm(i,e){function t(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function n(p,d){d.color.getRGB(p.fogColor.value,Kl(i)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function s(p,d,T,E,v){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),u(p,d)):d.isMeshPhongMaterial?(r(p,d),h(p,d)):d.isMeshStandardMaterial?(r(p,d),f(p,d),d.isMeshPhysicalMaterial&&m(p,d,v)):d.isMeshMatcapMaterial?(r(p,d),g(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),S(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(o(p,d),d.isLineDashedMaterial&&a(p,d)):d.isPointsMaterial?l(p,d,T,E):d.isSpriteMaterial?c(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,t(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Lt&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,t(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Lt&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,t(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,t(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const T=e.get(d),E=T.envMap,v=T.envMapRotation;E&&(p.envMap.value=E,Wn.copy(v),Wn.x*=-1,Wn.y*=-1,Wn.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Wn.y*=-1,Wn.z*=-1),p.envMapRotation.value.setFromMatrix4(Om.makeRotationFromEuler(Wn)),p.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap&&(p.lightMap.value=d.lightMap,p.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,p.lightMapTransform)),d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,p.aoMapTransform))}function o(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform))}function a(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function l(p,d,T,E){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*T,p.scale.value=E*.5,d.map&&(p.map.value=d.map,t(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function c(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,T){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Lt&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=T.texture,p.transmissionSamplerSize.value.set(T.width,T.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,d){d.matcap&&(p.matcap.value=d.matcap)}function S(p,d){const T=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(T.matrixWorld),p.nearDistance.value=T.shadow.camera.near,p.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function zm(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,E){const v=E.program;n.uniformBlockBinding(T,v)}function c(T,E){let v=s[T.id];v===void 0&&(g(T),v=h(T),s[T.id]=v,T.addEventListener("dispose",p));const R=E.program;n.updateUBOMapping(T,R);const A=e.render.frame;r[T.id]!==A&&(f(T),r[T.id]=A)}function h(T){const E=u();T.__bindingPointIndex=E;const v=i.createBuffer(),R=T.__size,A=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,R,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,v),v}function u(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const E=s[T.id],v=T.uniforms,R=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let A=0,C=v.length;A<C;A++){const F=Array.isArray(v[A])?v[A]:[v[A]];for(let b=0,y=F.length;b<y;b++){const I=F[b];if(m(I,A,b,R)===!0){const D=I.__offset,k=Array.isArray(I.value)?I.value:[I.value];let X=0;for(let q=0;q<k.length;q++){const Y=k[q],Z=S(Y);typeof Y=="number"||typeof Y=="boolean"?(I.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,D+X,I.__data)):Y.isMatrix3?(I.__data[0]=Y.elements[0],I.__data[1]=Y.elements[1],I.__data[2]=Y.elements[2],I.__data[3]=0,I.__data[4]=Y.elements[3],I.__data[5]=Y.elements[4],I.__data[6]=Y.elements[5],I.__data[7]=0,I.__data[8]=Y.elements[6],I.__data[9]=Y.elements[7],I.__data[10]=Y.elements[8],I.__data[11]=0):(Y.toArray(I.__data,X),X+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(T,E,v,R){const A=T.value,C=E+"_"+v;if(R[C]===void 0)return typeof A=="number"||typeof A=="boolean"?R[C]=A:R[C]=A.clone(),!0;{const F=R[C];if(typeof A=="number"||typeof A=="boolean"){if(F!==A)return R[C]=A,!0}else if(F.equals(A)===!1)return F.copy(A),!0}return!1}function g(T){const E=T.uniforms;let v=0;const R=16;for(let C=0,F=E.length;C<F;C++){const b=Array.isArray(E[C])?E[C]:[E[C]];for(let y=0,I=b.length;y<I;y++){const D=b[y],k=Array.isArray(D.value)?D.value:[D.value];for(let X=0,q=k.length;X<q;X++){const Y=k[X],Z=S(Y),W=v%R,oe=W%Z.boundary,de=W+oe;v+=oe,de!==0&&R-de<Z.storage&&(v+=R-de),D.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=v,v+=Z.storage}}}const A=v%R;return A>0&&(v+=R-A),T.__size=v,T.__cache={},this}function S(T){const E={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(E.boundary=4,E.storage=4):T.isVector2?(E.boundary=8,E.storage=8):T.isVector3||T.isColor?(E.boundary=16,E.storage=12):T.isVector4?(E.boundary=16,E.storage=16):T.isMatrix3?(E.boundary=48,E.storage=48):T.isMatrix4?(E.boundary=64,E.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),E}function p(T){const E=T.target;E.removeEventListener("dispose",p);const v=o.indexOf(E.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function d(){for(const T in s)i.deleteBuffer(s[T]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}class km{constructor(e={}){const{canvas:t=gh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;const g=new Uint32Array(4),S=new Int32Array(4);let p=null,d=null;const T=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Fn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let R=!1;this._outputColorSpace=Ht;let A=0,C=0,F=null,b=-1,y=null;const I=new ut,D=new ut;let k=null;const X=new Ee(0);let q=0,Y=t.width,Z=t.height,W=1,oe=null,de=null;const Ae=new ut(0,0,Y,Z),Ge=new ut(0,0,Y,Z);let tt=!1;const st=new qo;let Ke=!1,$=!1;const ee=new dt,me=new L,Fe=new ut,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xe=!1;function Et(){return F===null?W:1}let P=n;function rt(x,N){return t.getContext(x,N)}try{const x={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Io}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",pe,!1),t.addEventListener("webglcontextcreationerror",te,!1),P===null){const N="webgl2";if(P=rt(N,x),P===null)throw rt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Be,De,ve,ot,xe,He,xt,ft,w,_,B,K,Q,j,Te,re,Me,Se,ie,ue,Le,ye,ce,ze;function U(){Be=new $f(P),Be.init(),ye=new Dm(P,Be),De=new Gf(P,Be,e,ye),ve=new Pm(P,Be),De.reversedDepthBuffer&&f&&ve.buffers.depth.setReversed(!0),ot=new Qf(P),xe=new _m,He=new Lm(P,Be,ve,xe,De,ye,ot),xt=new Xf(v),ft=new Kf(v),w=new su(P),ce=new Hf(P,w),_=new Jf(P,w,ot,ce),B=new tp(P,_,w,ot),ie=new ep(P,De,He),re=new Wf(xe),K=new gm(v,xt,ft,Be,De,ce,re),Q=new Bm(v,xe),j=new xm,Te=new Tm(Be),Se=new kf(v,xt,ft,ve,B,m,l),Me=new Rm(v,B,De),ze=new zm(P,ot,De,ve),ue=new Vf(P,Be,ot),Le=new Zf(P,Be,ot),ot.programs=K.programs,v.capabilities=De,v.extensions=Be,v.properties=xe,v.renderLists=j,v.shadowMap=Me,v.state=ve,v.info=ot}U();const se=new Nm(v,P);this.xr=se,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const x=Be.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Be.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(x){x!==void 0&&(W=x,this.setSize(Y,Z,!1))},this.getSize=function(x){return x.set(Y,Z)},this.setSize=function(x,N,H=!0){if(se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=x,Z=N,t.width=Math.floor(x*W),t.height=Math.floor(N*W),H===!0&&(t.style.width=x+"px",t.style.height=N+"px"),this.setViewport(0,0,x,N)},this.getDrawingBufferSize=function(x){return x.set(Y*W,Z*W).floor()},this.setDrawingBufferSize=function(x,N,H){Y=x,Z=N,W=H,t.width=Math.floor(x*H),t.height=Math.floor(N*H),this.setViewport(0,0,x,N)},this.getCurrentViewport=function(x){return x.copy(I)},this.getViewport=function(x){return x.copy(Ae)},this.setViewport=function(x,N,H,V){x.isVector4?Ae.set(x.x,x.y,x.z,x.w):Ae.set(x,N,H,V),ve.viewport(I.copy(Ae).multiplyScalar(W).round())},this.getScissor=function(x){return x.copy(Ge)},this.setScissor=function(x,N,H,V){x.isVector4?Ge.set(x.x,x.y,x.z,x.w):Ge.set(x,N,H,V),ve.scissor(D.copy(Ge).multiplyScalar(W).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(x){ve.setScissorTest(tt=x)},this.setOpaqueSort=function(x){oe=x},this.setTransparentSort=function(x){de=x},this.getClearColor=function(x){return x.copy(Se.getClearColor())},this.setClearColor=function(){Se.setClearColor(...arguments)},this.getClearAlpha=function(){return Se.getClearAlpha()},this.setClearAlpha=function(){Se.setClearAlpha(...arguments)},this.clear=function(x=!0,N=!0,H=!0){let V=0;if(x){let O=!1;if(F!==null){const ne=F.texture.format;O=ne===ko||ne===zo||ne===Bo}if(O){const ne=F.texture.type,he=ne===cn||ne===Qn||ne===Ki||ne===$i||ne===No||ne===Oo,ge=Se.getClearColor(),fe=Se.getClearAlpha(),Pe=ge.r,Ie=ge.g,Re=ge.b;he?(g[0]=Pe,g[1]=Ie,g[2]=Re,g[3]=fe,P.clearBufferuiv(P.COLOR,0,g)):(S[0]=Pe,S[1]=Ie,S[2]=Re,S[3]=fe,P.clearBufferiv(P.COLOR,0,S))}else V|=P.COLOR_BUFFER_BIT}N&&(V|=P.DEPTH_BUFFER_BIT),H&&(V|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",te,!1),Se.dispose(),j.dispose(),Te.dispose(),xe.dispose(),xt.dispose(),ft.dispose(),B.dispose(),ce.dispose(),ze.dispose(),K.dispose(),se.dispose(),se.removeEventListener("sessionstart",nn),se.removeEventListener("sessionend",ta),On.stop()};function ae(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function pe(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const x=ot.autoReset,N=Me.enabled,H=Me.autoUpdate,V=Me.needsUpdate,O=Me.type;U(),ot.autoReset=x,Me.enabled=N,Me.autoUpdate=H,Me.needsUpdate=V,Me.type=O}function te(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function J(x){const N=x.target;N.removeEventListener("dispose",J),_e(N)}function _e(x){Ne(x),xe.remove(x)}function Ne(x){const N=xe.get(x).programs;N!==void 0&&(N.forEach(function(H){K.releaseProgram(H)}),x.isShaderMaterial&&K.releaseShaderCache(x))}this.renderBufferDirect=function(x,N,H,V,O,ne){N===null&&(N=we);const he=O.isMesh&&O.matrixWorld.determinant()<0,ge=fc(x,N,H,V,O);ve.setMaterial(V,he);let fe=H.index,Pe=1;if(V.wireframe===!0){if(fe=_.getWireframeAttribute(H),fe===void 0)return;Pe=2}const Ie=H.drawRange,Re=H.attributes.position;let We=Ie.start*Pe,Qe=(Ie.start+Ie.count)*Pe;ne!==null&&(We=Math.max(We,ne.start*Pe),Qe=Math.min(Qe,(ne.start+ne.count)*Pe)),fe!==null?(We=Math.max(We,0),Qe=Math.min(Qe,fe.count)):Re!=null&&(We=Math.max(We,0),Qe=Math.min(Qe,Re.count));const ht=Qe-We;if(ht<0||ht===1/0)return;ce.setup(O,V,ge,H,fe);let it,et=ue;if(fe!==null&&(it=w.get(fe),et=Le,et.setIndex(it)),O.isMesh)V.wireframe===!0?(ve.setLineWidth(V.wireframeLinewidth*Et()),et.setMode(P.LINES)):et.setMode(P.TRIANGLES);else if(O.isLine){let Ce=V.linewidth;Ce===void 0&&(Ce=1),ve.setLineWidth(Ce*Et()),O.isLineSegments?et.setMode(P.LINES):O.isLineLoop?et.setMode(P.LINE_LOOP):et.setMode(P.LINE_STRIP)}else O.isPoints?et.setMode(P.POINTS):O.isSprite&&et.setMode(P.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)es("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),et.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))et.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ce=O._multiDrawStarts,lt=O._multiDrawCounts,je=O._multiDrawCount,Ot=fe?w.get(fe).bytesPerElement:1,ti=xe.get(V).currentProgram.getUniforms();for(let Bt=0;Bt<je;Bt++)ti.setValue(P,"_gl_DrawID",Bt),et.render(Ce[Bt]/Ot,lt[Bt])}else if(O.isInstancedMesh)et.renderInstances(We,ht,O.count);else if(H.isInstancedBufferGeometry){const Ce=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,lt=Math.min(H.instanceCount,Ce);et.renderInstances(We,ht,lt)}else et.render(We,ht)};function nt(x,N,H){x.transparent===!0&&x.side===on&&x.forceSinglePass===!1?(x.side=Lt,x.needsUpdate=!0,os(x,N,H),x.side=Nn,x.needsUpdate=!0,os(x,N,H),x.side=on):os(x,N,H)}this.compile=function(x,N,H=null){H===null&&(H=x),d=Te.get(H),d.init(N),E.push(d),H.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(d.pushLight(O),O.castShadow&&d.pushShadow(O))}),x!==H&&x.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(d.pushLight(O),O.castShadow&&d.pushShadow(O))}),d.setupLights();const V=new Set;return x.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ne=O.material;if(ne)if(Array.isArray(ne))for(let he=0;he<ne.length;he++){const ge=ne[he];nt(ge,H,O),V.add(ge)}else nt(ne,H,O),V.add(ne)}),d=E.pop(),V},this.compileAsync=function(x,N,H=null){const V=this.compile(x,N,H);return new Promise(O=>{function ne(){if(V.forEach(function(he){xe.get(he).currentProgram.isReady()&&V.delete(he)}),V.size===0){O(x);return}setTimeout(ne,10)}Be.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let $e=null;function un(x){$e&&$e(x)}function nn(){On.stop()}function ta(){On.start()}const On=new ic;On.setAnimationLoop(un),typeof self<"u"&&On.setContext(self),this.setAnimationLoop=function(x){$e=x,se.setAnimationLoop(x),x===null?On.stop():On.start()},se.addEventListener("sessionstart",nn),se.addEventListener("sessionend",ta),this.render=function(x,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(N),N=se.getCamera()),x.isScene===!0&&x.onBeforeRender(v,x,N,F),d=Te.get(x,E.length),d.init(N),E.push(d),ee.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),st.setFromProjectionMatrix(ee,ln,N.reversedDepth),$=this.localClippingEnabled,Ke=re.init(this.clippingPlanes,$),p=j.get(x,T.length),p.init(),T.push(p),se.enabled===!0&&se.isPresenting===!0){const ne=v.xr.getDepthSensingMesh();ne!==null&&Zs(ne,N,-1/0,v.sortObjects)}Zs(x,N,0,v.sortObjects),p.finish(),v.sortObjects===!0&&p.sort(oe,de),Xe=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Xe&&Se.addToRenderList(p,x),this.info.render.frame++,Ke===!0&&re.beginShadows();const H=d.state.shadowsArray;Me.render(H,x,N),Ke===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=p.opaque,O=p.transmissive;if(d.setupLights(),N.isArrayCamera){const ne=N.cameras;if(O.length>0)for(let he=0,ge=ne.length;he<ge;he++){const fe=ne[he];ia(V,O,x,fe)}Xe&&Se.render(x);for(let he=0,ge=ne.length;he<ge;he++){const fe=ne[he];na(p,x,fe,fe.viewport)}}else O.length>0&&ia(V,O,x,N),Xe&&Se.render(x),na(p,x,N);F!==null&&C===0&&(He.updateMultisampleRenderTarget(F),He.updateRenderTargetMipmap(F)),x.isScene===!0&&x.onAfterRender(v,x,N),ce.resetDefaultState(),b=-1,y=null,E.pop(),E.length>0?(d=E[E.length-1],Ke===!0&&re.setGlobalState(v.clippingPlanes,d.state.camera)):d=null,T.pop(),T.length>0?p=T[T.length-1]:p=null};function Zs(x,N,H,V){if(x.visible===!1)return;if(x.layers.test(N.layers)){if(x.isGroup)H=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(N);else if(x.isLight)d.pushLight(x),x.castShadow&&d.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||st.intersectsSprite(x)){V&&Fe.setFromMatrixPosition(x.matrixWorld).applyMatrix4(ee);const he=B.update(x),ge=x.material;ge.visible&&p.push(x,he,ge,H,Fe.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||st.intersectsObject(x))){const he=B.update(x),ge=x.material;if(V&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Fe.copy(x.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),Fe.copy(he.boundingSphere.center)),Fe.applyMatrix4(x.matrixWorld).applyMatrix4(ee)),Array.isArray(ge)){const fe=he.groups;for(let Pe=0,Ie=fe.length;Pe<Ie;Pe++){const Re=fe[Pe],We=ge[Re.materialIndex];We&&We.visible&&p.push(x,he,We,H,Fe.z,Re)}}else ge.visible&&p.push(x,he,ge,H,Fe.z,null)}}const ne=x.children;for(let he=0,ge=ne.length;he<ge;he++)Zs(ne[he],N,H,V)}function na(x,N,H,V){const O=x.opaque,ne=x.transmissive,he=x.transparent;d.setupLightsView(H),Ke===!0&&re.setGlobalState(v.clippingPlanes,H),V&&ve.viewport(I.copy(V)),O.length>0&&rs(O,N,H),ne.length>0&&rs(ne,N,H),he.length>0&&rs(he,N,H),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function ia(x,N,H,V){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[V.id]===void 0&&(d.state.transmissionRenderTarget[V.id]=new tn(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float")?yn:cn,minFilter:Jn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace}));const ne=d.state.transmissionRenderTarget[V.id],he=V.viewport||I;ne.setSize(he.z*v.transmissionResolutionScale,he.w*v.transmissionResolutionScale);const ge=v.getRenderTarget(),fe=v.getActiveCubeFace(),Pe=v.getActiveMipmapLevel();v.setRenderTarget(ne),v.getClearColor(X),q=v.getClearAlpha(),q<1&&v.setClearColor(16777215,.5),v.clear(),Xe&&Se.render(H);const Ie=v.toneMapping;v.toneMapping=Fn;const Re=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),d.setupLightsView(V),Ke===!0&&re.setGlobalState(v.clippingPlanes,V),rs(x,H,V),He.updateMultisampleRenderTarget(ne),He.updateRenderTargetMipmap(ne),Be.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Qe=0,ht=N.length;Qe<ht;Qe++){const it=N[Qe],et=it.object,Ce=it.geometry,lt=it.material,je=it.group;if(lt.side===on&&et.layers.test(V.layers)){const Ot=lt.side;lt.side=Lt,lt.needsUpdate=!0,sa(et,H,V,Ce,lt,je),lt.side=Ot,lt.needsUpdate=!0,We=!0}}We===!0&&(He.updateMultisampleRenderTarget(ne),He.updateRenderTargetMipmap(ne))}v.setRenderTarget(ge,fe,Pe),v.setClearColor(X,q),Re!==void 0&&(V.viewport=Re),v.toneMapping=Ie}function rs(x,N,H){const V=N.isScene===!0?N.overrideMaterial:null;for(let O=0,ne=x.length;O<ne;O++){const he=x[O],ge=he.object,fe=he.geometry,Pe=he.group;let Ie=he.material;Ie.allowOverride===!0&&V!==null&&(Ie=V),ge.layers.test(H.layers)&&sa(ge,N,H,fe,Ie,Pe)}}function sa(x,N,H,V,O,ne){x.onBeforeRender(v,N,H,V,O,ne),x.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),O.onBeforeRender(v,N,H,V,x,ne),O.transparent===!0&&O.side===on&&O.forceSinglePass===!1?(O.side=Lt,O.needsUpdate=!0,v.renderBufferDirect(H,N,V,O,x,ne),O.side=Nn,O.needsUpdate=!0,v.renderBufferDirect(H,N,V,O,x,ne),O.side=on):v.renderBufferDirect(H,N,V,O,x,ne),x.onAfterRender(v,N,H,V,O,ne)}function os(x,N,H){N.isScene!==!0&&(N=we);const V=xe.get(x),O=d.state.lights,ne=d.state.shadowsArray,he=O.state.version,ge=K.getParameters(x,O.state,ne,N,H),fe=K.getProgramCacheKey(ge);let Pe=V.programs;V.environment=x.isMeshStandardMaterial?N.environment:null,V.fog=N.fog,V.envMap=(x.isMeshStandardMaterial?ft:xt).get(x.envMap||V.environment),V.envMapRotation=V.environment!==null&&x.envMap===null?N.environmentRotation:x.envMapRotation,Pe===void 0&&(x.addEventListener("dispose",J),Pe=new Map,V.programs=Pe);let Ie=Pe.get(fe);if(Ie!==void 0){if(V.currentProgram===Ie&&V.lightsStateVersion===he)return oa(x,ge),Ie}else ge.uniforms=K.getUniforms(x),x.onBeforeCompile(ge,v),Ie=K.acquireProgram(ge,fe),Pe.set(fe,Ie),V.uniforms=ge.uniforms;const Re=V.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Re.clippingPlanes=re.uniform),oa(x,ge),V.needsLights=mc(x),V.lightsStateVersion=he,V.needsLights&&(Re.ambientLightColor.value=O.state.ambient,Re.lightProbe.value=O.state.probe,Re.directionalLights.value=O.state.directional,Re.directionalLightShadows.value=O.state.directionalShadow,Re.spotLights.value=O.state.spot,Re.spotLightShadows.value=O.state.spotShadow,Re.rectAreaLights.value=O.state.rectArea,Re.ltc_1.value=O.state.rectAreaLTC1,Re.ltc_2.value=O.state.rectAreaLTC2,Re.pointLights.value=O.state.point,Re.pointLightShadows.value=O.state.pointShadow,Re.hemisphereLights.value=O.state.hemi,Re.directionalShadowMap.value=O.state.directionalShadowMap,Re.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Re.spotShadowMap.value=O.state.spotShadowMap,Re.spotLightMatrix.value=O.state.spotLightMatrix,Re.spotLightMap.value=O.state.spotLightMap,Re.pointShadowMap.value=O.state.pointShadowMap,Re.pointShadowMatrix.value=O.state.pointShadowMatrix),V.currentProgram=Ie,V.uniformsList=null,Ie}function ra(x){if(x.uniformsList===null){const N=x.currentProgram.getUniforms();x.uniformsList=Vs.seqWithValue(N.seq,x.uniforms)}return x.uniformsList}function oa(x,N){const H=xe.get(x);H.outputColorSpace=N.outputColorSpace,H.batching=N.batching,H.batchingColor=N.batchingColor,H.instancing=N.instancing,H.instancingColor=N.instancingColor,H.instancingMorph=N.instancingMorph,H.skinning=N.skinning,H.morphTargets=N.morphTargets,H.morphNormals=N.morphNormals,H.morphColors=N.morphColors,H.morphTargetsCount=N.morphTargetsCount,H.numClippingPlanes=N.numClippingPlanes,H.numIntersection=N.numClipIntersection,H.vertexAlphas=N.vertexAlphas,H.vertexTangents=N.vertexTangents,H.toneMapping=N.toneMapping}function fc(x,N,H,V,O){N.isScene!==!0&&(N=we),He.resetTextureUnits();const ne=N.fog,he=V.isMeshStandardMaterial?N.environment:null,ge=F===null?v.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:Ti,fe=(V.isMeshStandardMaterial?ft:xt).get(V.envMap||he),Pe=V.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Ie=!!H.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Re=!!H.morphAttributes.position,We=!!H.morphAttributes.normal,Qe=!!H.morphAttributes.color;let ht=Fn;V.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(ht=v.toneMapping);const it=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,et=it!==void 0?it.length:0,Ce=xe.get(V),lt=d.state.lights;if(Ke===!0&&($===!0||x!==y)){const Rt=x===y&&V.id===b;re.setState(V,x,Rt)}let je=!1;V.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==lt.state.version||Ce.outputColorSpace!==ge||O.isBatchedMesh&&Ce.batching===!1||!O.isBatchedMesh&&Ce.batching===!0||O.isBatchedMesh&&Ce.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ce.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ce.instancing===!1||!O.isInstancedMesh&&Ce.instancing===!0||O.isSkinnedMesh&&Ce.skinning===!1||!O.isSkinnedMesh&&Ce.skinning===!0||O.isInstancedMesh&&Ce.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ce.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ce.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ce.instancingMorph===!1&&O.morphTexture!==null||Ce.envMap!==fe||V.fog===!0&&Ce.fog!==ne||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==re.numPlanes||Ce.numIntersection!==re.numIntersection)||Ce.vertexAlphas!==Pe||Ce.vertexTangents!==Ie||Ce.morphTargets!==Re||Ce.morphNormals!==We||Ce.morphColors!==Qe||Ce.toneMapping!==ht||Ce.morphTargetsCount!==et)&&(je=!0):(je=!0,Ce.__version=V.version);let Ot=Ce.currentProgram;je===!0&&(Ot=os(V,N,O));let ti=!1,Bt=!1,Ii=!1;const ct=Ot.getUniforms(),Gt=Ce.uniforms;if(ve.useProgram(Ot.program)&&(ti=!0,Bt=!0,Ii=!0),V.id!==b&&(b=V.id,Bt=!0),ti||y!==x){ve.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),ct.setValue(P,"projectionMatrix",x.projectionMatrix),ct.setValue(P,"viewMatrix",x.matrixWorldInverse);const Ut=ct.map.cameraPosition;Ut!==void 0&&Ut.setValue(P,me.setFromMatrixPosition(x.matrixWorld)),De.logarithmicDepthBuffer&&ct.setValue(P,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ct.setValue(P,"isOrthographic",x.isOrthographicCamera===!0),y!==x&&(y=x,Bt=!0,Ii=!0)}if(O.isSkinnedMesh){ct.setOptional(P,O,"bindMatrix"),ct.setOptional(P,O,"bindMatrixInverse");const Rt=O.skeleton;Rt&&(Rt.boneTexture===null&&Rt.computeBoneTexture(),ct.setValue(P,"boneTexture",Rt.boneTexture,He))}O.isBatchedMesh&&(ct.setOptional(P,O,"batchingTexture"),ct.setValue(P,"batchingTexture",O._matricesTexture,He),ct.setOptional(P,O,"batchingIdTexture"),ct.setValue(P,"batchingIdTexture",O._indirectTexture,He),ct.setOptional(P,O,"batchingColorTexture"),O._colorsTexture!==null&&ct.setValue(P,"batchingColorTexture",O._colorsTexture,He));const Wt=H.morphAttributes;if((Wt.position!==void 0||Wt.normal!==void 0||Wt.color!==void 0)&&ie.update(O,H,Ot),(Bt||Ce.receiveShadow!==O.receiveShadow)&&(Ce.receiveShadow=O.receiveShadow,ct.setValue(P,"receiveShadow",O.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Gt.envMap.value=fe,Gt.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&N.environment!==null&&(Gt.envMapIntensity.value=N.environmentIntensity),Bt&&(ct.setValue(P,"toneMappingExposure",v.toneMappingExposure),Ce.needsLights&&pc(Gt,Ii),ne&&V.fog===!0&&Q.refreshFogUniforms(Gt,ne),Q.refreshMaterialUniforms(Gt,V,W,Z,d.state.transmissionRenderTarget[x.id]),Vs.upload(P,ra(Ce),Gt,He)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Vs.upload(P,ra(Ce),Gt,He),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ct.setValue(P,"center",O.center),ct.setValue(P,"modelViewMatrix",O.modelViewMatrix),ct.setValue(P,"normalMatrix",O.normalMatrix),ct.setValue(P,"modelMatrix",O.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Rt=V.uniformsGroups;for(let Ut=0,Qs=Rt.length;Ut<Qs;Ut++){const Bn=Rt[Ut];ze.update(Bn,Ot),ze.bind(Bn,Ot)}}return Ot}function pc(x,N){x.ambientLightColor.needsUpdate=N,x.lightProbe.needsUpdate=N,x.directionalLights.needsUpdate=N,x.directionalLightShadows.needsUpdate=N,x.pointLights.needsUpdate=N,x.pointLightShadows.needsUpdate=N,x.spotLights.needsUpdate=N,x.spotLightShadows.needsUpdate=N,x.rectAreaLights.needsUpdate=N,x.hemisphereLights.needsUpdate=N}function mc(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(x,N,H){const V=xe.get(x);V.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),xe.get(x.texture).__webglTexture=N,xe.get(x.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:H,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,N){const H=xe.get(x);H.__webglFramebuffer=N,H.__useDefaultFramebuffer=N===void 0};const gc=P.createFramebuffer();this.setRenderTarget=function(x,N=0,H=0){F=x,A=N,C=H;let V=!0,O=null,ne=!1,he=!1;if(x){const fe=xe.get(x);if(fe.__useDefaultFramebuffer!==void 0)ve.bindFramebuffer(P.FRAMEBUFFER,null),V=!1;else if(fe.__webglFramebuffer===void 0)He.setupRenderTarget(x);else if(fe.__hasExternalTextures)He.rebindTextures(x,xe.get(x.texture).__webglTexture,xe.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Re=x.depthTexture;if(fe.__boundDepthTexture!==Re){if(Re!==null&&xe.has(Re)&&(x.width!==Re.image.width||x.height!==Re.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");He.setupDepthRenderbuffer(x)}}const Pe=x.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(he=!0);const Ie=xe.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Ie[N])?O=Ie[N][H]:O=Ie[N],ne=!0):x.samples>0&&He.useMultisampledRTT(x)===!1?O=xe.get(x).__webglMultisampledFramebuffer:Array.isArray(Ie)?O=Ie[H]:O=Ie,I.copy(x.viewport),D.copy(x.scissor),k=x.scissorTest}else I.copy(Ae).multiplyScalar(W).floor(),D.copy(Ge).multiplyScalar(W).floor(),k=tt;if(H!==0&&(O=gc),ve.bindFramebuffer(P.FRAMEBUFFER,O)&&V&&ve.drawBuffers(x,O),ve.viewport(I),ve.scissor(D),ve.setScissorTest(k),ne){const fe=xe.get(x.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,fe.__webglTexture,H)}else if(he){const fe=N;for(let Pe=0;Pe<x.textures.length;Pe++){const Ie=xe.get(x.textures[Pe]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Pe,Ie.__webglTexture,H,fe)}}else if(x!==null&&H!==0){const fe=xe.get(x.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,fe.__webglTexture,H)}b=-1},this.readRenderTargetPixels=function(x,N,H,V,O,ne,he,ge=0){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=xe.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&he!==void 0&&(fe=fe[he]),fe){ve.bindFramebuffer(P.FRAMEBUFFER,fe);try{const Pe=x.textures[ge],Ie=Pe.format,Re=Pe.type;if(!De.textureFormatReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!De.textureTypeReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=x.width-V&&H>=0&&H<=x.height-O&&(x.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ge),P.readPixels(N,H,V,O,ye.convert(Ie),ye.convert(Re),ne))}finally{const Pe=F!==null?xe.get(F).__webglFramebuffer:null;ve.bindFramebuffer(P.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(x,N,H,V,O,ne,he,ge=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=xe.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&he!==void 0&&(fe=fe[he]),fe)if(N>=0&&N<=x.width-V&&H>=0&&H<=x.height-O){ve.bindFramebuffer(P.FRAMEBUFFER,fe);const Pe=x.textures[ge],Ie=Pe.format,Re=Pe.type;if(!De.textureFormatReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!De.textureTypeReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const We=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,We),P.bufferData(P.PIXEL_PACK_BUFFER,ne.byteLength,P.STREAM_READ),x.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ge),P.readPixels(N,H,V,O,ye.convert(Ie),ye.convert(Re),0);const Qe=F!==null?xe.get(F).__webglFramebuffer:null;ve.bindFramebuffer(P.FRAMEBUFFER,Qe);const ht=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await _h(P,ht,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,We),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ne),P.deleteBuffer(We),P.deleteSync(ht),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,N=null,H=0){const V=Math.pow(2,-H),O=Math.floor(x.image.width*V),ne=Math.floor(x.image.height*V),he=N!==null?N.x:0,ge=N!==null?N.y:0;He.setTexture2D(x,0),P.copyTexSubImage2D(P.TEXTURE_2D,H,0,0,he,ge,O,ne),ve.unbindTexture()};const _c=P.createFramebuffer(),vc=P.createFramebuffer();this.copyTextureToTexture=function(x,N,H=null,V=null,O=0,ne=null){ne===null&&(O!==0?(es("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ne=O,O=0):ne=0);let he,ge,fe,Pe,Ie,Re,We,Qe,ht;const it=x.isCompressedTexture?x.mipmaps[ne]:x.image;if(H!==null)he=H.max.x-H.min.x,ge=H.max.y-H.min.y,fe=H.isBox3?H.max.z-H.min.z:1,Pe=H.min.x,Ie=H.min.y,Re=H.isBox3?H.min.z:0;else{const Wt=Math.pow(2,-O);he=Math.floor(it.width*Wt),ge=Math.floor(it.height*Wt),x.isDataArrayTexture?fe=it.depth:x.isData3DTexture?fe=Math.floor(it.depth*Wt):fe=1,Pe=0,Ie=0,Re=0}V!==null?(We=V.x,Qe=V.y,ht=V.z):(We=0,Qe=0,ht=0);const et=ye.convert(N.format),Ce=ye.convert(N.type);let lt;N.isData3DTexture?(He.setTexture3D(N,0),lt=P.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(He.setTexture2DArray(N,0),lt=P.TEXTURE_2D_ARRAY):(He.setTexture2D(N,0),lt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const je=P.getParameter(P.UNPACK_ROW_LENGTH),Ot=P.getParameter(P.UNPACK_IMAGE_HEIGHT),ti=P.getParameter(P.UNPACK_SKIP_PIXELS),Bt=P.getParameter(P.UNPACK_SKIP_ROWS),Ii=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,it.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,it.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Pe),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ie),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Re);const ct=x.isDataArrayTexture||x.isData3DTexture,Gt=N.isDataArrayTexture||N.isData3DTexture;if(x.isDepthTexture){const Wt=xe.get(x),Rt=xe.get(N),Ut=xe.get(Wt.__renderTarget),Qs=xe.get(Rt.__renderTarget);ve.bindFramebuffer(P.READ_FRAMEBUFFER,Ut.__webglFramebuffer),ve.bindFramebuffer(P.DRAW_FRAMEBUFFER,Qs.__webglFramebuffer);for(let Bn=0;Bn<fe;Bn++)ct&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,xe.get(x).__webglTexture,O,Re+Bn),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,xe.get(N).__webglTexture,ne,ht+Bn)),P.blitFramebuffer(Pe,Ie,he,ge,We,Qe,he,ge,P.DEPTH_BUFFER_BIT,P.NEAREST);ve.bindFramebuffer(P.READ_FRAMEBUFFER,null),ve.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(O!==0||x.isRenderTargetTexture||xe.has(x)){const Wt=xe.get(x),Rt=xe.get(N);ve.bindFramebuffer(P.READ_FRAMEBUFFER,_c),ve.bindFramebuffer(P.DRAW_FRAMEBUFFER,vc);for(let Ut=0;Ut<fe;Ut++)ct?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Wt.__webglTexture,O,Re+Ut):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Wt.__webglTexture,O),Gt?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Rt.__webglTexture,ne,ht+Ut):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Rt.__webglTexture,ne),O!==0?P.blitFramebuffer(Pe,Ie,he,ge,We,Qe,he,ge,P.COLOR_BUFFER_BIT,P.NEAREST):Gt?P.copyTexSubImage3D(lt,ne,We,Qe,ht+Ut,Pe,Ie,he,ge):P.copyTexSubImage2D(lt,ne,We,Qe,Pe,Ie,he,ge);ve.bindFramebuffer(P.READ_FRAMEBUFFER,null),ve.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Gt?x.isDataTexture||x.isData3DTexture?P.texSubImage3D(lt,ne,We,Qe,ht,he,ge,fe,et,Ce,it.data):N.isCompressedArrayTexture?P.compressedTexSubImage3D(lt,ne,We,Qe,ht,he,ge,fe,et,it.data):P.texSubImage3D(lt,ne,We,Qe,ht,he,ge,fe,et,Ce,it):x.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ne,We,Qe,he,ge,et,Ce,it.data):x.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ne,We,Qe,it.width,it.height,et,it.data):P.texSubImage2D(P.TEXTURE_2D,ne,We,Qe,he,ge,et,Ce,it);P.pixelStorei(P.UNPACK_ROW_LENGTH,je),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Ot),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ti),P.pixelStorei(P.UNPACK_SKIP_ROWS,Bt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ii),ne===0&&N.generateMipmaps&&P.generateMipmap(lt),ve.unbindTexture()},this.initRenderTarget=function(x){xe.get(x).__webglFramebuffer===void 0&&He.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?He.setTextureCube(x,0):x.isData3DTexture?He.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?He.setTexture2DArray(x,0):He.setTexture2D(x,0),ve.unbindTexture()},this.resetState=function(){A=0,C=0,F=null,ve.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}const Gs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Di{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Hm=new jo(-1,1,1,-1,0,1);class Vm extends Nt{constructor(){super(),this.setAttribute("position",new gt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new gt([0,2,0,0,2,0],2))}}const Gm=new Vm;class $o{constructor(e){this._mesh=new Ze(Gm,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Hm)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Wm extends Di{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof bt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ts.clone(e.uniforms),this.material=new bt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new $o(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class ll extends Di{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class Xm extends Di{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class qm{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new be);this._width=n.width,this._height=n.height,t=new tn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:yn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Wm(Gs),this.copyPass.material.blending=Sn,this.clock=new tc}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}ll!==void 0&&(o instanceof ll?n=!0:o instanceof Xm&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new be);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Ym extends Di{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ee}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}const jm={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ee(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ai extends Di{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new be(e.x,e.y):new be(256,256),this.clearColor=new Ee(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new tn(r,o,{type:yn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new tn(r,o,{type:yn});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new tn(r,o,{type:yn});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=jm;this.highPassUniforms=ts.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new bt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new be(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ts.clone(Gs.uniforms),this.blendMaterial=new bt({uniforms:this.copyUniforms,vertexShader:Gs.vertexShader,fragmentShader:Gs.fragmentShader,blending:kr,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ee,this._oldClearAlpha=1,this._basic=new Ks,this._fsQuad=new $o(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new be(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ai.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ai.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new bt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new be(.5,.5)},direction:{value:new be(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new bt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Ai.BlurDirectionX=new be(1,0);Ai.BlurDirectionY=new be(0,1);const Ls={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Km extends Di{constructor(){super(),this.uniforms=ts.clone(Ls.uniforms),this.material=new Yh({name:Ls.name,uniforms:this.uniforms,vertexShader:Ls.vertexShader,fragmentShader:Ls.fragmentShader}),this._fsQuad=new $o(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ye.getTransfer(this._outputColorSpace)===Je&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Al?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Rl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Cl?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Uo?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ll?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Dl?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Pl&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const cl={low:{pixelRatioCap:1,renderScale:.8,shadows:!1,shadowMapSize:512,shadowDistance:60,antialias:!1,waterReflections:!1,bloom:!1,fogDensity:.0075,viewDistance:420,foliageDensity:.25,anisotropy:1},medium:{pixelRatioCap:1.25,renderScale:1,shadows:!0,shadowMapSize:1024,shadowDistance:90,antialias:!1,waterReflections:!1,bloom:!1,fogDensity:.0052,viewDistance:620,foliageDensity:.6,anisotropy:4},high:{pixelRatioCap:2,renderScale:1,shadows:!0,shadowMapSize:2048,shadowDistance:130,antialias:!0,waterReflections:!0,bloom:!0,fogDensity:.004,viewDistance:900,foliageDensity:1,anisotropy:8}},vi={quality:"medium",musicVolume:.6,effectsVolume:.8,cameraSensitivity:1,invertCameraY:!1},lc="letsgo.settings.v1";function hl(i,e){return typeof i=="number"&&Number.isFinite(i)?Math.min(1,Math.max(0,i)):e}function $m(){try{const i=localStorage.getItem(lc);if(!i)return{...vi};const e=JSON.parse(i);return{quality:e.quality==="low"||e.quality==="medium"||e.quality==="high"?e.quality:vi.quality,musicVolume:hl(e.musicVolume,vi.musicVolume),effectsVolume:hl(e.effectsVolume,vi.effectsVolume),cameraSensitivity:typeof e.cameraSensitivity=="number"&&Number.isFinite(e.cameraSensitivity)?Math.min(3,Math.max(.2,e.cameraSensitivity)):vi.cameraSensitivity,invertCameraY:e.invertCameraY===!0}}catch{return{...vi}}}function Jm(i){try{localStorage.setItem(lc,JSON.stringify(i))}catch{}}const Zm=`
  varying vec3 vWorldDirection;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldDirection = normalize(worldPosition.xyz - cameraPosition);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position.z = gl_Position.w; // keep the dome pinned to the far plane
  }
`,Qm=`
  uniform vec3 topColor;
  uniform vec3 horizonColor;
  uniform vec3 bottomColor;
  uniform vec3 sunDirection;
  uniform vec3 sunColor;
  varying vec3 vWorldDirection;

  void main() {
    vec3 dir = normalize(vWorldDirection);
    float h = dir.y;

    // Two soft bands: ground haze below the horizon, sky above it.
    vec3 color = mix(horizonColor, topColor, smoothstep(0.0, 0.55, h));
    color = mix(bottomColor, color, smoothstep(-0.25, 0.02, h));

    // A broad warm glow around the sun, plus a small bright disc.
    float sun = max(dot(dir, normalize(sunDirection)), 0.0);
    color += sunColor * pow(sun, 14.0) * 0.32;
    color += sunColor * pow(sun, 900.0) * 1.6;

    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;class eg extends yt{constructor(t,n){super();z(this,"clouds",[]);const s=new bt({uniforms:{topColor:{value:new Ee("#2f7fe0")},horizonColor:{value:new Ee("#bfe4f7")},bottomColor:{value:new Ee("#8fb39a")},sunDirection:{value:t},sunColor:{value:new Ee("#fff6d8")}},vertexShader:Zm,fragmentShader:Qm,side:Lt,depthWrite:!1}),r=new Ze(new xn(1,24,16),s);r.frustumCulled=!1,r.renderOrder=-1e3,this.add(r);const o=new Ks({color:16777215,fog:!1,transparent:!0,opacity:.95,depthWrite:!1});for(let a=0;a<n;a+=1){const l=new Ze(tg(a),o),c=a/n*Math.PI*2+a*.37,h=260+a*53%150;l.position.set(Math.cos(c)*h,110+a*29%70,Math.sin(c)*h);const u=14+a*17%20;l.scale.setScalar(u),l.renderOrder=-900,l.userData.drift=.6+a*13%10*.08,this.clouds.push(l),this.add(l)}}update(t,n){for(const s of this.clouds){const r=s.userData.drift;s.position.x+=r*t,s.position.x-n.x>420&&(s.position.x-=840),s.lookAt(n.x,s.position.y,n.z)}}}function tg(i){const e=[],t=4+i%3;let n=i*9301+49297;const s=()=>(n=(n*9301+49297)%233280,n/233280);for(let o=0;o<t;o+=1){const a=(o-(t-1)/2)*.62+(s()-.5)*.25,l=(s()-.5)*.22,c=.42+s()*.3,h=10;for(let u=0;u<h;u+=1){const f=u/h*Math.PI*2,m=(u+1)/h*Math.PI*2;e.push(a,l,0),e.push(a+Math.cos(f)*c,l+Math.sin(f)*c*.72,0),e.push(a+Math.cos(m)*c,l+Math.sin(m)*c*.72,0)}}const r=new Nt;return r.setAttribute("position",new gt(e,3)),r.computeVertexNormals(),r}const Lr=new L(.55,.72,.42).normalize(),cc=new L(-.45,.8,-.75).normalize(),ng=9,ul=26;class ig{constructor(e,t){z(this,"renderer");z(this,"scene",new Hh);z(this,"camera");z(this,"clock",new tc);z(this,"sky");z(this,"sun");z(this,"hemisphere");z(this,"ambient");z(this,"fog");z(this,"rimLight",null);z(this,"studio",!1);z(this,"composer",null);z(this,"bloomPass",null);z(this,"preset");z(this,"quality");z(this,"underwater",!1);z(this,"fps",0);z(this,"fpsAccumulator",0);z(this,"fpsFrames",0);z(this,"resize",()=>{const e=window.innerWidth,t=Math.max(1,window.innerHeight),n=Math.min(window.devicePixelRatio||1,this.preset.pixelRatioCap);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(n*this.preset.renderScale),this.renderer.setSize(e,t,!0),this.composer?.setSize(e,t),this.bloomPass?.resolution.set(e,t)});this.quality=t,this.preset=cl[t],this.renderer=new km({antialias:this.preset.antialias,powerPreference:"high-performance",stencil:!1}),this.renderer.outputColorSpace=Ht,this.renderer.toneMapping=Uo,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.type=Tl,this.renderer.domElement.classList.add("game-canvas"),e.appendChild(this.renderer.domElement),this.camera=new qt(62,window.innerWidth/Math.max(1,window.innerHeight),.1,this.preset.viewDistance),this.camera.position.set(0,8,18),this.fog=new Xo(12575991,this.preset.fogDensity),this.scene.fog=this.fog,this.scene.background=new Ee(12575991),this.sky=new eg(Lr,14),this.scene.add(this.sky),this.sun=new Fa(16774102,2.15),this.sun.position.copy(Lr).multiplyScalar(120),this.sun.castShadow=!0,this.scene.add(this.sun),this.scene.add(this.sun.target),this.hemisphere=new $h(13625599,7311194,1),this.scene.add(this.hemisphere),this.ambient=new Qh(16777215,.22),this.scene.add(this.ambient),this.applyQuality(t),this.resize(),window.addEventListener("resize",this.resize)}setStudioMode(e){if(this.studio=e,this.sky.visible=!e,this.configureShadowCamera(),this.applyShadowMapSize(),e){if(this.scene.fog=null,this.scene.background.set(1185309),this.sun.intensity=1.9,this.sun.color.set(16774370),this.hemisphere.intensity=.95,this.hemisphere.color.set(11058648),this.hemisphere.groundColor.set(4672856),this.ambient.intensity=.3,!this.rimLight){const t=new Fa(12572927,1.6);t.position.set(.6,.5,1).multiplyScalar(40),t.castShadow=!1,this.rimLight=t,this.scene.add(t)}this.rimLight.visible=!0}else this.scene.fog=this.fog,this.scene.background.set(12575991),this.sun.intensity=2.15,this.hemisphere.intensity=1,this.hemisphere.color.set(13625599),this.ambient.intensity=.22,this.rimLight&&(this.rimLight.visible=!1)}applyQuality(e){this.quality=e;const t=cl[e];this.preset=t,this.renderer.shadowMap.enabled=t.shadows,this.sun.castShadow=t.shadows,this.applyShadowMapSize(),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null),this.configureShadowCamera(),!this.underwater&&!this.studio&&(this.fog.density=t.fogDensity),this.camera.far=t.viewDistance,this.camera.updateProjectionMatrix(),this.setUpComposer(),this.resize()}applyShadowMapSize(){const e=this.studio?Math.min(2048,this.preset.shadowMapSize*2):this.preset.shadowMapSize;this.sun.shadow.mapSize.x!==e&&(this.sun.shadow.mapSize.set(e,e),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null))}configureShadowCamera(){const e=this.studio?ng:this.preset.shadowDistance*.5,t=this.sun.shadow.camera;t.left=-e,t.right=e,t.top=e,t.bottom=-e,t.near=(this.studio,1),t.far=this.studio?ul*2.4:this.preset.shadowDistance*3.2,t.updateProjectionMatrix(),this.sun.shadow.bias=this.studio?-9e-4:-.0012,this.sun.shadow.normalBias=this.studio?.03:.035}setUpComposer(){if(this.composer&&(this.composer.dispose(),this.composer=null,this.bloomPass=null),!this.preset.bloom)return;const e=new qm(this.renderer);e.addPass(new Ym(this.scene,this.camera));const t=new Ai(new be(window.innerWidth,window.innerHeight),.42,.72,.86);e.addPass(t),e.addPass(new Km),this.composer=e,this.bloomPass=t}focusShadowsOn(e){const t=this.studio?cc:Lr,n=this.studio?ul:this.preset.shadowDistance*1.4;this.sun.target.position.copy(e),this.sun.target.updateMatrixWorld(),this.sun.position.copy(e).addScaledVector(t,n)}setUnderwater(e){this.studio||e===this.underwater||(this.underwater=e,e?(this.fog.color.set(1332846),this.fog.density=.055,this.scene.background.set(933973),this.sun.intensity=1.1,this.hemisphere.color.set(3117232),this.hemisphere.intensity=1.35):(this.fog.color.set(12575991),this.fog.density=this.preset.fogDensity,this.scene.background.set(12575991),this.sun.intensity=2.15,this.hemisphere.color.set(13625599),this.hemisphere.intensity=1))}get isUnderwater(){return this.underwater}render(e){this.fpsAccumulator+=e,this.fpsFrames+=1,this.fpsAccumulator>=.5&&(this.fps=this.fpsFrames/this.fpsAccumulator,this.fpsAccumulator=0,this.fpsFrames=0),this.sky.visible=!this.underwater&&!this.studio,!this.underwater&&!this.studio&&(this.sky.position.copy(this.camera.position),this.sky.update(e,this.camera.position)),this.composer?this.composer.render(e):this.renderer.render(this.scene,this.camera)}get currentQuality(){return this.quality}get currentPreset(){return this.preset}dispose(){window.removeEventListener("resize",this.resize),this.composer?.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}}const sg=-.62,rg=1.1,og=1.1;class ag{constructor(e,t){z(this,"yaw",Math.PI);z(this,"pitch",.33);z(this,"distance",8.6);z(this,"currentDistance",8.6);z(this,"focus",new L);z(this,"smoothedFocus",new L);z(this,"desiredPosition",new L);z(this,"toCamera",new L);z(this,"manualTimer",0);z(this,"initialised",!1);z(this,"ceilingY",null);this.camera=e,this.world=t}get movementYaw(){return this.yaw}get yawDegrees(){return(Ue.radToDeg(this.yaw)%360+360)%360}applyLook(e,t){e===0&&t===0||(this.yaw-=e,this.pitch=Ue.clamp(this.pitch+t,sg,rg),this.manualTimer=og)}update(e,t){if(this.manualTimer>0&&(this.manualTimer-=e),t.getFocusPoint(this.focus),t.speed>1&&(this.focus.x+=t.velocity.x*.09,this.focus.z+=t.velocity.z*.09),!this.initialised)this.smoothedFocus.copy(this.focus),this.yaw=t.facing+Math.PI,this.initialised=!0;else{const o=1-Math.exp(-11*e),a=1-Math.exp(-(t.state==="air"?4.5:9)*e);this.smoothedFocus.x=Ue.lerp(this.smoothedFocus.x,this.focus.x,o),this.smoothedFocus.z=Ue.lerp(this.smoothedFocus.z,this.focus.z,o),this.smoothedFocus.y=Ue.lerp(this.smoothedFocus.y,this.focus.y,a)}this.autoFollow(e,t),t.isSubmerged&&(this.pitch=Ue.lerp(this.pitch,.06,1-Math.exp(-2.6*e)));const n=Ue.clamp(t.speed/9,0,1);this.distance=8.2+n*1.8+(t.state==="swim"?1:0);const s=Math.cos(this.pitch);this.toCamera.set(Math.sin(this.yaw)*s,Math.sin(this.pitch),Math.cos(this.yaw)*s);const r=this.distanceToObstruction(this.distance);this.currentDistance=r<this.currentDistance?r:Ue.lerp(this.currentDistance,r,1-Math.exp(-3.2*e)),this.desiredPosition.copy(this.smoothedFocus).addScaledVector(this.toCamera,Math.max(1.6,this.currentDistance)),this.ceilingY!==null&&this.desiredPosition.y>this.ceilingY&&(this.desiredPosition.y=this.ceilingY),this.camera.position.copy(this.desiredPosition),this.camera.lookAt(this.smoothedFocus)}autoFollow(e,t){if(this.manualTimer>0||t.speed<2.2)return;const n=this.smoothedFocus.x-this.camera.position.x,s=this.smoothedFocus.z-this.camera.position.z,r=Math.hypot(n,s);if(r>.001&&(t.velocity.x*n+t.velocity.z*s)/r<t.speed*.35)return;let a=t.facing+Math.PI-this.yaw;for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;const l=Ue.clamp((t.speed-2.2)/6,0,1);this.yaw+=a*(1-Math.exp(-1.9*l*e))}distanceToObstruction(e){const n=this.world.raycast(this.smoothedFocus,this.toCamera,e+.42);return Math.max(1.6,Math.min(e,n-.42))}reset(e){this.initialised=!1,this.manualTimer=0,this.pitch=.33,this.update(1/60,e)}}const Dr=.22,dl=180,lg=.5;class cg{constructor(){z(this,"move",new be);z(this,"look",new be);z(this,"gamepadConnected",!1);z(this,"lastKey","—");z(this,"lastKeyRecognised",!1);z(this,"usingGamepad",!1);z(this,"keys",new Set);z(this,"held",new Set);z(this,"pendingPresses",new Set);z(this,"pendingReleases",new Set);z(this,"pressedThisFrame",new Set);z(this,"releasedThisFrame",new Set);z(this,"mouseDelta",new be);z(this,"pointerLocked",!1);z(this,"pointerLockWanted",!1);z(this,"discardNextMouseMove",!1);z(this,"previousButtons",[]);z(this,"element",null);z(this,"disposers",[])}attach(e){this.element=e;const t=h=>{if(h.repeat)return;this.keys.add(h.code),this.lastKey=h.code,this.lastKeyRecognised=pl.has(h.code)||Ir[h.code]!==void 0||h.code==="ShiftLeft"||h.code==="ShiftRight",this.usingGamepad=!1;const u=Ir[h.code];u&&(this.press(u),u!=="pause"&&h.preventDefault()),pl.has(h.code)&&h.preventDefault()},n=h=>{this.keys.delete(h.code);const u=Ir[h.code];u&&this.release(u)},s=()=>this.clear(),r=h=>{if(this.pointerLocked){if(this.discardNextMouseMove){this.discardNextMouseMove=!1;return}this.mouseDelta.x+=fl(h.movementX),this.mouseDelta.y+=fl(h.movementY),this.usingGamepad=!1}},o=()=>{const h=document.pointerLockElement===this.element;h&&!this.pointerLocked&&(this.discardNextMouseMove=!0,this.mouseDelta.set(0,0)),this.pointerLocked=h},a=()=>{this.pointerLockWanted&&!this.pointerLocked&&this.requestPointerLock()},l=()=>{this.gamepadConnected=!0},c=()=>{this.gamepadConnected=navigator.getGamepads().some(h=>h!==null)};window.addEventListener("keydown",t),window.addEventListener("keyup",n),window.addEventListener("blur",s),document.addEventListener("mousemove",r),document.addEventListener("pointerlockchange",o),e.addEventListener("mousedown",a),window.addEventListener("gamepadconnected",l),window.addEventListener("gamepaddisconnected",c),this.disposers=[()=>window.removeEventListener("keydown",t),()=>window.removeEventListener("keyup",n),()=>window.removeEventListener("blur",s),()=>document.removeEventListener("mousemove",r),()=>document.removeEventListener("pointerlockchange",o),()=>e.removeEventListener("mousedown",a),()=>window.removeEventListener("gamepadconnected",l),()=>window.removeEventListener("gamepaddisconnected",c)]}dispose(){for(const e of this.disposers)e();this.disposers=[],this.clear()}update(e,t){this.pressedThisFrame.clear(),this.releasedThisFrame.clear();for(const o of this.pendingPresses)this.pressedThisFrame.add(o);for(const o of this.pendingReleases)this.releasedThisFrame.add(o);this.pendingPresses.clear(),this.pendingReleases.clear(),this.move.set(0,0),this.look.set(0,0);let n=0,s=0;(this.keys.has("KeyE")||this.keys.has("ArrowUp"))&&(s-=1),(this.keys.has("KeyD")||this.keys.has("ArrowDown"))&&(s+=1),(this.keys.has("KeyS")||this.keys.has("ArrowLeft"))&&(n-=1),(this.keys.has("KeyF")||this.keys.has("ArrowRight"))&&(n+=1),(n!==0||s!==0)&&(this.move.set(n,s).normalize(),(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"))&&this.move.multiplyScalar(.45)),this.look.x+=this.mouseDelta.x*.0022*e,this.look.y+=this.mouseDelta.y*.0022*e*(t?-1:1),this.mouseDelta.set(0,0);const r=.035*e;this.keys.has("KeyJ")&&(this.look.x-=r),this.keys.has("KeyL")&&(this.look.x+=r),this.keys.has("KeyI")&&(this.look.y-=r*(t?-1:1)),this.keys.has("KeyK")&&(this.look.y+=r*(t?-1:1)),this.pollGamepad(e,t)}pollGamepad(e,t){const n=navigator.getGamepads?navigator.getGamepads():[];let s=null;for(const h of n)if(h&&h.connected){s=h;break}if(!s){this.previousButtons=[];return}this.gamepadConnected=!0;const r=Ds(s.axes[0]??0),o=Ds(s.axes[1]??0);if(r!==0||o!==0){const h=Math.min(1,Math.hypot(r,o)),u=Math.hypot(r,o)||1;this.move.set(r/u*h,o/u*h),this.usingGamepad=!0}const a=Ds(s.axes[2]??0),l=Ds(s.axes[3]??0);(a!==0||l!==0)&&(this.look.x+=a*.045*e,this.look.y+=l*.035*e*(t?-1:1),this.usingGamepad=!0);const c=s.buttons.map(h=>h.pressed||h.value>lg);for(const[h,u]of Object.entries(hg)){const f=Number(h),m=c[f]===!0,g=this.previousButtons[f]===!0;m&&!g?(this.held.has(u)||this.pressedThisFrame.add(u),this.held.add(u),this.usingGamepad=!0):!m&&g&&this.held.delete(u)&&this.releasedThisFrame.add(u)}this.previousButtons=c}press(e){this.held.has(e)||this.pendingPresses.add(e),this.held.add(e)}release(e){this.held.delete(e)&&this.pendingReleases.add(e)}isDown(e){return this.held.has(e)}wasPressed(e){return this.pressedThisFrame.has(e)}wasReleased(e){return this.releasedThisFrame.has(e)}get moveStrength(){return Math.min(1,this.move.length())}setPointerLockWanted(e){this.pointerLockWanted=e,!e&&this.pointerLocked&&document.exitPointerLock()}togglePointerLock(){this.pointerLocked?(this.pointerLockWanted=!1,document.exitPointerLock()):(this.pointerLockWanted=!0,this.requestPointerLock())}requestPointerLock(){if(!this.element||this.pointerLocked)return;const e=this.element.requestPointerLock();e&&typeof e.catch=="function"&&e.catch(()=>{})}get isPointerLocked(){return this.pointerLocked}clear(){this.keys.clear(),this.held.clear(),this.pendingPresses.clear(),this.pendingReleases.clear(),this.pressedThisFrame.clear(),this.releasedThisFrame.clear(),this.mouseDelta.set(0,0),this.move.set(0,0),this.look.set(0,0),this.discardNextMouseMove=!0}}function fl(i){return Number.isFinite(i)?Math.max(-dl,Math.min(dl,i)):0}function Ds(i){return Math.abs(i)<Dr?0:Math.sign(i)*((Math.abs(i)-Dr)/(1-Dr))}const Ir={Space:"jump",KeyR:"grab",KeyQ:"crouch",KeyL:"togglePointerLock",Escape:"pause",ControlLeft:"dive",KeyC:"dive",KeyW:"interact",KeyA:"sideFlip"},hg={0:"jump",2:"grab",3:"sideFlip",1:"dive",6:"crouch",9:"pause"},pl=new Set(["KeyE","KeyS","KeyD","KeyF","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]);class hc{constructor(e=new L(0,0,0),t=new L(0,1,0),n=1){this.start=e,this.end=t,this.radius=n}clone(){return new this.constructor().copy(this)}set(e,t,n){return this.start.copy(e),this.end.copy(t),this.radius=n,this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this.radius=e.radius,this}getCenter(e){return e.copy(this.end).add(this.start).multiplyScalar(.5)}translate(e){return this.start.add(e),this.end.add(e),this}intersectsBox(e){return Ur(this.start.x,this.start.y,this.end.x,this.end.y,e.min.x,e.max.x,e.min.y,e.max.y,this.radius)&&Ur(this.start.x,this.start.z,this.end.x,this.end.z,e.min.x,e.max.x,e.min.z,e.max.z,this.radius)&&Ur(this.start.y,this.start.z,this.end.y,this.end.z,e.min.y,e.max.y,e.min.z,e.max.z,this.radius)}}function Ur(i,e,t,n,s,r,o,a,l){return(s-i<l||s-t<l)&&(i-r<l||t-r<l)&&(o-e<l||o-n<l)&&(e-a<l||n-a<l)}const Bi=new L,zi=new L,Is=new L,ki=new L,sn=new Dn,Fr=new nc,ug=new nc,Us=new is,Hi=new hc,dg=new L,fg=new L,pg=new L,mg=1e-10;function gg(i,e,t=null,n=null){const s=dg.copy(i.end).sub(i.start),r=fg.copy(e.end).sub(e.start),o=pg.copy(e.start).sub(i.start),a=s.dot(r),l=s.dot(s),c=r.dot(r),h=r.dot(o),u=s.dot(o);let f,m;const g=l*c-a*a;if(Math.abs(g)<mg){const S=-h/c,p=(a-h)/c;Math.abs(S-.5)<Math.abs(p-.5)?(f=0,m=S):(f=1,m=p)}else f=(h*a+u*c)/g,m=(f*a-h)/c;m=Math.max(0,Math.min(1,m)),f=Math.max(0,Math.min(1,f)),t&&t.copy(s).multiplyScalar(f).add(i.start),n&&n.copy(r).multiplyScalar(m).add(e.start)}class Jo{constructor(e){this.box=e,this.bounds=new jt,this.layers=new Wo,this.trianglesPerLeaf=8,this.maxLevel=16,this.subTrees=[],this.triangles=[]}addTriangle(e){return this.bounds.min.x=Math.min(this.bounds.min.x,e.a.x,e.b.x,e.c.x),this.bounds.min.y=Math.min(this.bounds.min.y,e.a.y,e.b.y,e.c.y),this.bounds.min.z=Math.min(this.bounds.min.z,e.a.z,e.b.z,e.c.z),this.bounds.max.x=Math.max(this.bounds.max.x,e.a.x,e.b.x,e.c.x),this.bounds.max.y=Math.max(this.bounds.max.y,e.a.y,e.b.y,e.c.y),this.bounds.max.z=Math.max(this.bounds.max.z,e.a.z,e.b.z,e.c.z),this.triangles.push(e),this}calcBox(){return this.box=this.bounds.clone(),this.box.min.x-=.01,this.box.min.y-=.01,this.box.min.z-=.01,this}split(e){if(!this.box)return;const t=[],n=zi.copy(this.box.max).sub(this.box.min).multiplyScalar(.5);for(let r=0;r<2;r++)for(let o=0;o<2;o++)for(let a=0;a<2;a++){const l=new jt,c=Bi.set(r,o,a);l.min.copy(this.box.min).add(c.multiply(n)),l.max.copy(l.min).add(n),t.push(new Jo(l))}let s;for(;s=this.triangles.pop();)for(let r=0;r<t.length;r++)t[r].box.intersectsTriangle(s)&&t[r].triangles.push(s);for(let r=0;r<t.length;r++){const o=t[r].triangles.length;o>this.trianglesPerLeaf&&e<this.maxLevel&&t[r].split(e+1),o!==0&&this.subTrees.push(t[r])}return this}build(){return this.calcBox(),this.split(0),this}getRayTriangles(e,t){for(let n=0;n<this.subTrees.length;n++){const s=this.subTrees[n];if(e.intersectsBox(s.box))if(s.triangles.length>0)for(let r=0;r<s.triangles.length;r++)t.indexOf(s.triangles[r])===-1&&t.push(s.triangles[r]);else s.getRayTriangles(e,t)}}triangleCapsuleIntersect(e,t){t.getPlane(sn);const n=sn.distanceToPoint(e.start)-e.radius,s=sn.distanceToPoint(e.end)-e.radius;if(n>0&&s>0||n<-e.radius&&s<-e.radius)return!1;const r=Math.abs(n/(Math.abs(n)+Math.abs(s))),o=Bi.copy(e.start).lerp(e.end,r);if(t.containsPoint(o))return{normal:sn.normal.clone(),point:o.clone(),depth:Math.abs(Math.min(n,s))};const a=e.radius*e.radius,l=Fr.set(e.start,e.end),c=[[t.a,t.b],[t.b,t.c],[t.c,t.a]];for(let h=0;h<c.length;h++){const u=ug.set(c[h][0],c[h][1]);if(gg(l,u,Is,ki),Is.distanceToSquared(ki)<a)return{normal:Is.clone().sub(ki).normalize(),point:ki.clone(),depth:e.radius-Is.distanceTo(ki)}}return!1}triangleSphereIntersect(e,t){if(t.getPlane(sn),!e.intersectsPlane(sn))return!1;const n=Math.abs(sn.distanceToSphere(e)),s=e.radius*e.radius-n*n,r=sn.projectPoint(e.center,Bi);if(t.containsPoint(e.center))return{normal:sn.normal.clone(),point:r.clone(),depth:Math.abs(sn.distanceToSphere(e))};const o=[[t.a,t.b],[t.b,t.c],[t.c,t.a]];for(let a=0;a<o.length;a++){Fr.set(o[a][0],o[a][1]),Fr.closestPointToPoint(r,!0,zi);const l=zi.distanceToSquared(e.center);if(l<s)return{normal:e.center.clone().sub(zi).normalize(),point:zi.clone(),depth:e.radius-Math.sqrt(l)}}return!1}getSphereTriangles(e,t){for(let n=0;n<this.subTrees.length;n++){const s=this.subTrees[n];if(e.intersectsBox(s.box))if(s.triangles.length>0)for(let r=0;r<s.triangles.length;r++)t.indexOf(s.triangles[r])===-1&&t.push(s.triangles[r]);else s.getSphereTriangles(e,t)}}getCapsuleTriangles(e,t){for(let n=0;n<this.subTrees.length;n++){const s=this.subTrees[n];if(e.intersectsBox(s.box))if(s.triangles.length>0)for(let r=0;r<s.triangles.length;r++)t.indexOf(s.triangles[r])===-1&&t.push(s.triangles[r]);else s.getCapsuleTriangles(e,t)}}sphereIntersect(e){Us.copy(e);const t=[];let n,s=!1;this.getSphereTriangles(e,t);for(let r=0;r<t.length;r++)(n=this.triangleSphereIntersect(Us,t[r]))&&(s=!0,Us.center.add(n.normal.multiplyScalar(n.depth)));if(s){const r=Us.center.clone().sub(e.center),o=r.length();return{normal:r.normalize(),depth:o}}return!1}capsuleIntersect(e){Hi.copy(e);const t=[];let n,s=!1;this.getCapsuleTriangles(Hi,t);for(let r=0;r<t.length;r++)(n=this.triangleCapsuleIntersect(Hi,t[r]))&&(s=!0,Hi.translate(n.normal.multiplyScalar(n.depth)));if(s){const r=Hi.getCenter(new L).sub(e.getCenter(Bi)),o=r.length();return{normal:r.normalize(),depth:o}}return!1}rayIntersect(e){const t=[];let n,s,r=1e100;this.getRayTriangles(e,t);for(let o=0;o<t.length;o++){const a=e.intersectTriangle(t[o].a,t[o].b,t[o].c,!0,Bi);if(a){const l=a.sub(e.origin).length();r>l&&(s=a.clone().add(e.origin),r=l,n=t[o])}}return r<1e100?{distance:r,triangle:n,position:s}:!1}fromGraphNode(e){return e.updateWorldMatrix(!0,!0),e.traverse(t=>{if(t.isMesh===!0&&this.layers.test(t.layers)){let n,s=!1;t.geometry.index!==null?(s=!0,n=t.geometry.toNonIndexed()):n=t.geometry;const r=n.getAttribute("position");for(let o=0;o<r.count;o+=3){const a=new L().fromBufferAttribute(r,o),l=new L().fromBufferAttribute(r,o+1),c=new L().fromBufferAttribute(r,o+2);a.applyMatrix4(t.matrixWorld),l.applyMatrix4(t.matrixWorld),c.applyMatrix4(t.matrixWorld),this.addTriangle(new Yt(a,l,c))}s&&n.dispose()}}),this.build(),this}clear(){return this.box=null,this.bounds.makeEmpty(),this.subTrees.length=0,this.triangles.length=0,this}}class _g{constructor(){z(this,"octree",new Jo);z(this,"waters",[]);z(this,"ladders",[]);z(this,"scratchRay",new Go);z(this,"scratchVector",new L)}addSolid(e){this.octree.fromGraphNode(e)}addWater(e,t,n){this.waters.push({bounds:e,surfaceY:t,test:n})}capsuleIntersect(e){const t=this.octree.capsuleIntersect(e);return t?{normal:t.normal,depth:t.depth}:null}raycast(e,t,n){this.scratchRay.set(e,t);const s=this.octree.rayIntersect(this.scratchRay);return!s||s.distance>n?n:s.distance}addLadder(e,t,n,s){this.ladders.push({bounds:e,facing:t,topY:n,anchor:s})}ladderAt(e,t=0){for(const n of this.ladders)if(e.x>=n.bounds.min.x-t&&e.x<=n.bounds.max.x+t&&e.z>=n.bounds.min.z-t&&e.z<=n.bounds.max.z+t&&e.y>=n.bounds.min.y-t&&e.y<=n.bounds.max.y)return n;return null}waterAt(e){for(const t of this.waters)if(e.x>=t.bounds.min.x&&e.x<=t.bounds.max.x&&e.z>=t.bounds.min.z&&e.z<=t.bounds.max.z&&e.y>=t.bounds.min.y&&e.y<=t.surfaceY&&(!t.test||t.test(e.x,e.z)))return t;return null}groundProbe(e,t){this.scratchVector.set(0,-1,0),this.scratchRay.set(e,this.scratchVector);const n=this.octree.rayIntersect(this.scratchRay);if(!n||n.distance>t)return null;const s=n.triangle.getNormal(new L);return s.y<0&&s.negate(),{y:e.y-n.distance,normal:s}}groundHeightBelow(e,t=200){this.scratchVector.set(0,-1,0),this.scratchRay.set(e,this.scratchVector);const n=this.octree.rayIntersect(this.scratchRay);return!n||n.distance>t?-1/0:e.y-n.distance}reset(){this.waters.length=0}}const G={runSpeed:8.6,walkSpeed:3.1,acceleration:32,deceleration:26,skidDeceleration:46,skidDotThreshold:-.55,skidMinSpeed:5.2,turnRateSlow:13,turnRateFast:5.2,gravity:27,fallGravityMultiplier:1.42,jumpVelocity:9.6,doubleJumpVelocity:11.5,tripleJumpVelocity:13.5,jumpComboWindow:.26,jumpComboMinSpeed:2.6,tripleJumpFlipDelay:.13,tripleJumpFlipDelayShare:.3,tripleJumpFlipMinAirtime:.45,tripleJumpFlipDelayMin:.035,tripleJumpLandMargin:.07,jumpCutMultiplier:.42,airAcceleration:14,airDeceleration:2.2,airTurnRate:6,coyoteTime:.11,jumpBufferTime:.14,crouchDeceleration:11,crouchSpeed:1.6,crouchTurnRate:3.4,longJumpMinSpeed:4.2,longJumpSpeed:17.5,longJumpVelocity:8.6,longJumpAirControl:.25,backflipMaxSpeed:3,backflipVelocity:13,backflipSpeed:5.4,wallKickWindow:.18,wallKickVelocity:11.2,wallKickSpeed:8.4,wallKickLimit:4,sideFlipApex:3,sideFlipLeastVelocity:4.5,sideFlipSpeed:5,sideFlipWindow:.3,airBoostVelocity:5.4,groundPoundHover:.22,groundPoundRecovery:.3,ladderSnagDistance:.85,ladderSpeed:2.8,ladderStandOff:.42,ladderHandHigh:.46,ladderHandLow:.1,ladderJumpOff:4.5,ledgeReach:.62,ledgeGrabLow:.75,ledgeGrabHigh:1.95,ledgeGrabRise:3,ledgeWideDepth:1.15,ledgeStandNarrow:.5,ledgeStandWide:.95,ledgeVaultOver:1.15,ledgeHandForward:.36,ledgeHangLift:1.72,ledgeSettleDown:.8,ledgeSettleUp:.25,ledgeSwingSeconds:.52,ledgeMantleSeconds:.8,ledgeVaultSeconds:.5,ledgeCooldown:.25,brakeMinSpeed:5.4,brakeEndSpeed:1.2,brakeSlideShort:.762,brakeSlideLong:2.03,brakeMomentumBuild:2.83,brakeMomentumFade:1.2,brakeMomentumCurve:1.45,maxWalkableSlopeDegrees:52,groundSnapDistance:.42,stepHeight:.45,swimSpeed:3.4,swimAcceleration:9,swimDrag:2.6,buoyancy:9.5,strokeImpulse:4.6,strokeCooldown:.52,diveAcceleration:11,floatSubmersion:.62,splashSpeed:6,carrySpeedMultiplier:.82,carryReach:1.9,throwSpeed:11,throwLift:4.2,killPlaneY:-45},ml=Math.cos(G.maxWalkableSlopeDegrees*Math.PI/180),Xn={shirt:"#d9353a",overalls:"#2f5fd0",skin:"#f3c29a",glove:"#fbfbf7",shoe:"#6a3b1c",buckle:"#f2c94c",clay:"#b9b2a6"};function vg(i,e=.72,t=0){return new Kt({color:new Ee(i),roughness:e,metalness:t,flatShading:!1})}function Ft(i,e,t=[0,0,0]){const n=new Ze(i,e);return n.position.set(t[0],t[1],t[2]),n.castShadow=!0,n.receiveShadow=!1,n}function Vi(i,e,t){const n=[],s=t/2,r=5;for(let o=0;o<=r;o+=1){const a=Math.PI/2*(o/r);n.push(new be(Math.sin(a)*e,-s-Math.cos(a)*e))}n.push(new be(i,s));for(let o=1;o<=r;o+=1){const a=Math.PI/2*(o/r);n.push(new be(Math.cos(a)*i,s+Math.sin(a)*i))}return new ss(n,14)}const uc=[[0,-.2],[.108,-.195],[.186,-.168],[.238,-.108],[.26,-.03],[.268,.056],[.264,.136],[.256,.192],[.272,.248],[.286,.3],[.29,.345],[.272,.388],[.206,.424],[.124,.448],[0,.46]],Yi=.93;function xg(){return new ss(uc.map(([i,e])=>new be(i*Yi,e)),20)}function Mg(i){const e=[];for(const[n,s]of uc){if(s>i)break;e.push(new be(n*Yi*1.035,s))}const t=e[e.length-1];return e.push(new be(t.x*.97,i)),e.push(new be(0,i)),new ss(e,20)}const qn=1.82,Zo=.92,Pn=.34,St={shoulderX:.282,shoulderY:.345,upper:.32,lower:.34},Sg=Zo+St.shoulderY;function yg(i={}){const e=[],t=(A,C,F)=>{const b=vg(A,C,F);return e.push(b),b},n=i.plain===!0,s=n?t(Xn.clay,.78):null,r=s??t(Xn.shirt,.78),o=s??t(Xn.overalls,.74),a=s??t(Xn.skin,.68),l=s??t(Xn.glove,.66),c=s??t(Xn.shoe,.7),h=s??t(Xn.buckle,.35,.55),u=new yt,f=new yt;f.position.y=Zo,u.add(f);const m=new yt;if(f.add(m),m.add(Ft(xg(),r)),!n){m.add(Ft(Mg(.16),o));for(const A of[-.125,.125])m.add(Ft(new xn(.05,10,8),h,[A*Yi,.21,.27*Yi]))}m.add(Ft(Vi(.094,.118,.15),a,[0,.5,.004]));const g=new yt;if(g.position.set(0,.685,0),m.add(g),g.add(Ft(new xn(.22,20,18),a)),!n){g.add(Ft(new xn(.228,18,12,0,Math.PI*2,0,Math.PI*.52),r,[0,.07,0]));const A=Ft(new $s(.14,.168,.04,14,1,!1,Math.PI*.75,Math.PI*1.5),r,[0,.068,.152]);A.rotation.x=-.16,g.add(A),g.add(Ft(new xn(.068,12,10),a,[0,-.045,.2]))}const S=A=>{const C=new yt;C.position.set(St.shoulderX*Yi*A,St.shoulderY,0),m.add(C),C.add(Ft(Vi(.1,.11,.14),r,[0,-.16,0]));const F=new yt;F.position.y=-.32,C.add(F),F.add(Ft(Vi(.096,.104,.17),r,[0,-.17,0]));const b=Ft(new xn(.142,14,12),l,[0,-.34,0]);return b.scale.set(1.08,1,.82),F.add(b),{shoulder:C,elbow:F}},p=S(-1),d=S(1),T=A=>{const C=new yt;C.position.set(.158*A,-.02,0),m.add(C),C.add(Ft(Vi(.128,.148,.2),o,[0,-.2,0]));const F=new yt;F.position.y=-.42,C.add(F),F.add(Ft(Vi(.115,.128,.18),o,[0,-.17,0]));const b=new yt;b.position.y=-.38,F.add(b);const y=Ft(new xn(.172,14,12),c,[0,.014,.05]);return y.scale.set(.82,.58,1.44),b.add(y),{hip:C,knee:F,ankle:b}},E=T(-1),v=T(1),R=new mt;return R.position.set(0,.3,.68),m.add(R),u.traverse(A=>{A instanceof Ze&&(A.castShadow=!0,A.receiveShadow=!1)}),{root:u,body:f,torso:m,head:g,shoulderLeft:p.shoulder,shoulderRight:d.shoulder,elbowLeft:p.elbow,elbowRight:d.elbow,hipLeft:E.hip,hipRight:v.hip,kneeLeft:E.knee,kneeRight:v.knee,ankleLeft:E.ankle,ankleRight:v.ankle,carryAnchor:R,materials:e}}const M=dc(),at=dc();let gl=!1,Nr=0,_l=0;function dc(){return{bodyPitch:0,bodyRoll:0,bodyYaw:0,bodyHeight:0,bodySquash:1,headPitch:0,headYaw:0,shoulderLeftPitch:0,shoulderRightPitch:0,shoulderLeftRoll:0,shoulderRightRoll:0,elbowLeft:0,elbowRight:0,hipLeft:0,hipRight:0,kneeLeft:0,kneeRight:0,ankleLeft:0,ankleRight:0}}function bg(i,e){Eg(e);const t=e.state==="ledge"?26:e.state==="air"?16:e.state==="climb"?15:13,n=1-Math.exp(-t*e.delta);if(!gl)Object.assign(at,M),gl=!0;else for(const o of Object.keys(M))at[o]=Ue.lerp(at[o],M[o],n);const s=e.flipAxis==="pitch"?e.flipAngle:0,r=e.flipAxis==="roll"?e.flipAngle:0;i.body.rotation.set(at.bodyPitch+s,at.bodyYaw,at.bodyRoll+r),i.body.position.y=Zo+at.bodyHeight,i.body.scale.set(1/Math.sqrt(at.bodySquash),at.bodySquash,1/Math.sqrt(at.bodySquash)),i.head.rotation.set(at.headPitch,at.headYaw,0),i.shoulderLeft.rotation.set(at.shoulderLeftPitch,0,-at.shoulderLeftRoll),i.shoulderRight.rotation.set(at.shoulderRightPitch,0,at.shoulderRightRoll),i.elbowLeft.rotation.x=at.elbowLeft,i.elbowRight.rotation.x=at.elbowRight,i.hipLeft.rotation.x=at.hipLeft,i.hipRight.rotation.x=at.hipRight,i.kneeLeft.rotation.x=at.kneeLeft,i.kneeRight.rotation.x=at.kneeRight,i.ankleLeft.rotation.x=at.ankleLeft,i.ankleRight.rotation.x=at.ankleRight}function Eg(i){switch(Tg(M),i.state){case"climb":Cg(i);break;case"ledge":Ag(i);break;case"swim":Lg(i);break;case"air":Pg(i);break;default:wg(i);break}i.carrying&&Dg(),i.landing&&Ig()}function Tg(i){i.bodyPitch=0,i.bodyRoll=0,i.bodyYaw=0,i.bodyHeight=0,i.bodySquash=1,i.headPitch=0,i.headYaw=0,i.shoulderLeftPitch=0,i.shoulderRightPitch=0,i.shoulderLeftRoll=.17,i.shoulderRightRoll=.17,i.elbowLeft=0,i.elbowRight=0,i.hipLeft=0,i.hipRight=0,i.kneeLeft=0,i.kneeRight=0,i.ankleLeft=0,i.ankleRight=0}function wg(i){const e=Ue.clamp(i.speed/i.maxSpeed,0,1);if(i.poundPhase==="landed"){M.bodyPitch=.18,M.bodyHeight=-.3,M.bodySquash=.88,M.shoulderLeftPitch=-.9,M.shoulderRightPitch=-.9,M.shoulderLeftRoll=.7,M.shoulderRightRoll=.7,M.elbowLeft=-.5,M.elbowRight=-.5,M.hipLeft=-1.3,M.hipRight=-1.3,M.kneeLeft=2.1,M.kneeRight=2.1,M.ankleLeft=-.9,M.ankleRight=-.9,M.headPitch=-.2;return}if(i.crouching){M.bodyPitch=.3,M.bodyHeight=-.185,M.hipLeft=-1.15,M.hipRight=-1.15,M.kneeLeft=1.95,M.kneeRight=1.95,M.ankleLeft=-.95,M.ankleRight=-.95,M.shoulderLeftPitch=-.75,M.shoulderRightPitch=-.75,M.shoulderLeftRoll=.42,M.shoulderRightRoll=.42,M.elbowLeft=-.7,M.elbowRight=-.7,M.headPitch=-.26,M.bodySquash=.94;return}if(i.braking){const l=Ue.lerp(.4,1,Ue.clamp(i.brakeStrength,0,1));M.bodyPitch=-.34*l,M.bodyHeight=-.025*l,M.bodyRoll=.07*l,M.shoulderLeftPitch=-1.15*l,M.shoulderRightPitch=-.55*l,M.shoulderLeftRoll=Ue.lerp(.17,.95,l),M.shoulderRightRoll=Ue.lerp(.17,.8,l),M.elbowLeft=-.35*l,M.elbowRight=-.25*l,M.hipLeft=-.72*l,M.hipRight=.22*l,M.kneeLeft=.62*l,M.kneeRight=1.15*l,M.ankleLeft=0,M.ankleRight=-.35*l,M.headPitch=-.12*l;return}if(i.skidding){M.bodyPitch=-.3,M.bodyHeight=-.11,M.shoulderLeftPitch=-1.5,M.shoulderRightPitch=-1.2,M.shoulderLeftRoll=.85,M.shoulderRightRoll=.7,M.hipLeft=-.5,M.hipRight=.35,M.kneeLeft=.45,M.kneeRight=.2,M.headPitch=-.18;return}if(i.speed<.3){const l=Math.sin(i.time*1.7);M.bodyHeight=l*.012,M.bodySquash=1+l*.008,M.headYaw=Math.sin(i.time*.45)*.22,M.headPitch=Math.sin(i.time*.33)*.05,M.shoulderLeftPitch=.06,M.shoulderRightPitch=-.06,M.shoulderLeftRoll=.2,M.shoulderRightRoll=.2,M.elbowLeft=-.16,M.elbowRight=-.16;return}const t=2.6+e*5.4;Nr=(Nr+t*i.delta)%(Math.PI*2);const n=Nr,s=Math.sin(n),r=Math.sin(n+Math.PI),o=Ue.lerp(.42,1,e),a=Ue.lerp(.3,.95,e);M.hipLeft=s*o,M.hipRight=r*o,M.kneeLeft=Math.max(0,s)*o*1.25,M.kneeRight=Math.max(0,r)*o*1.25,M.ankleLeft=s*.42+.08,M.ankleRight=r*.42+.08,M.shoulderLeftPitch=r*a,M.shoulderRightPitch=s*a,M.elbowLeft=-.22-Math.max(0,-r)*a*.6,M.elbowRight=-.22-Math.max(0,-s)*a*.6,M.shoulderLeftRoll=.18+e*.04-Math.max(0,-r)*.1,M.shoulderRightRoll=.18+e*.04-Math.max(0,-s)*.1,M.bodyPitch=e*.26,M.bodyHeight=Math.abs(Math.sin(n))*.05*e-.02*e,M.bodyRoll=Math.sin(n)*.055*e,M.bodyYaw=Math.sin(n)*.09*e,M.headYaw=-M.bodyYaw*.7,M.headPitch=-e*.12}function Ag(i){const e=i.ledgeWide,t=i.ledgeHanging?0:Ue.clamp(i.ledgeProgress,0,1),n=t>=.45,s=n?(t-.45)/.55:t/.45,r=s*s*(3-2*s),o=(a,l,c)=>n?Ue.lerp(l,c,r):Ue.lerp(a,l,r);M.bodyPitch=o(.1,e?.34:.52,.05),M.bodyHeight=o(-.04,-.02,0),M.bodySquash=o(1.02,.97,1),M.headPitch=o(-.3,-.16,0),M.hipLeft=o(-.16,e?-1.4:-1.75,-.24),M.hipRight=o(-.16,e?-1.4:-.6,-.24),M.kneeLeft=o(.3,e?1.85:1.95,.34),M.kneeRight=o(.3,e?1.85:.9,.34),M.ankleLeft=o(.2,.24,0),M.ankleRight=o(.2,.24,0),M.bodyRoll=e?0:o(0,.18,0),Rg(i)}function Rg(i){const e=Sg+M.bodyHeight,t=i.ledgeLift-e,n=G.ledgeHandForward,s=Math.hypot(t,n),r=St.upper+St.lower;if(s>r-.01){const a=Ue.clamp((s-r)/.3,0,1);if(M.shoulderLeftPitch=Ue.lerp(M.shoulderLeftPitch,-.3,a),M.shoulderRightPitch=Ue.lerp(M.shoulderRightPitch,-.3,a),M.elbowLeft=Ue.lerp(M.elbowLeft,-.28,a),M.elbowRight=Ue.lerp(M.elbowRight,-.28,a),a>=1)return}const o=Lo(t,n);M.shoulderLeftPitch=o.shoulder,M.shoulderRightPitch=o.shoulder,M.elbowLeft=o.elbow,M.elbowRight=o.elbow,M.shoulderLeftRoll=.14,M.shoulderRightRoll=.14}const Or={shoulder:0,elbow:0};function Lo(i,e){const t=St.upper+St.lower,n=Ue.clamp(Math.hypot(i,e),.1,t-.012),s=Math.atan2(-e,-i),r=Math.acos(Ue.clamp((St.upper*St.upper+n*n-St.lower*St.lower)/(2*St.upper*n),-1,1)),o=Math.acos(Ue.clamp((St.upper*St.upper+St.lower*St.lower-n*n)/(2*St.upper*St.lower),-1,1));return Or.shoulder=s+r,Or.elbow=-(Math.PI-o),Or}function Cg(i){_l+=i.climbSpeed*i.delta*2.6;const e=Math.sin(_l);M.bodyPitch=.08,M.headPitch=-.22,M.bodyRoll=e*.05;const t=G.ladderStandOff,n=(e+1)*.5,s=Lo(Ue.lerp(G.ladderHandLow,G.ladderHandHigh,n),t);M.shoulderLeftPitch=s.shoulder,M.elbowLeft=s.elbow;const r=Lo(Ue.lerp(G.ladderHandHigh,G.ladderHandLow,n),t);M.shoulderRightPitch=r.shoulder,M.elbowRight=r.elbow,M.shoulderLeftRoll=.26,M.shoulderRightRoll=.26,M.hipLeft=-.5-Math.max(0,-e)*.7,M.hipRight=-.5-Math.max(0,e)*.7,M.kneeLeft=.7+Math.max(0,-e)*.85,M.kneeRight=.7+Math.max(0,e)*.85,M.ankleLeft=.25,M.ankleRight=.25}function Pg(i){const e=i.verticalSpeed>.5;if(i.againstWall&&!e){M.bodyPitch=-.1,M.shoulderLeftPitch=-.5,M.shoulderRightPitch=-.5,M.shoulderLeftRoll=1,M.shoulderRightRoll=1,M.elbowLeft=-.9,M.elbowRight=-.9,M.hipLeft=-.85,M.hipRight=-.2,M.kneeLeft=.9,M.kneeRight=.3,M.ankleLeft=.1,M.ankleRight=.1,M.headPitch=-.12;return}if(i.poundPhase==="hover"){M.bodyPitch=.5,M.shoulderLeftPitch=-2.3,M.shoulderRightPitch=-2.3,M.shoulderLeftRoll=.9,M.shoulderRightRoll=.9,M.elbowLeft=-1.1,M.elbowRight=-1.1,M.hipLeft=-1.7,M.hipRight=-1.7,M.kneeLeft=2,M.kneeRight=2,M.bodySquash=.94,M.headPitch=-.3;return}if(i.poundPhase==="slam"){M.bodyPitch=-.55,M.bodyHeight=-.05,M.shoulderLeftPitch=-1.5,M.shoulderRightPitch=-1.5,M.shoulderLeftRoll=.75,M.shoulderRightRoll=.75,M.elbowLeft=-.4,M.elbowRight=-.4,M.hipLeft=-1.95,M.hipRight=-1.95,M.kneeLeft=.5,M.kneeRight=.5,M.ankleLeft=-.3,M.ankleRight=-.3,M.bodySquash=1.06,M.headPitch=.15;return}if(i.jumpKind==="side"){M.shoulderLeftPitch=-1.3,M.shoulderRightPitch=-1.3,M.shoulderLeftRoll=.55,M.shoulderRightRoll=.55,M.elbowLeft=-1.5,M.elbowRight=-1.5,M.hipLeft=-1.25,M.hipRight=-1.25,M.kneeLeft=1.6,M.kneeRight=1.6,M.ankleLeft=.3,M.ankleRight=.3,M.bodySquash=1.03;return}if(i.jumpKind==="long"){M.bodyPitch=.92,M.bodyHeight=-.06,M.shoulderLeftPitch=-2.5,M.shoulderRightPitch=-2.5,M.shoulderLeftRoll=.16,M.shoulderRightRoll=.16,M.elbowLeft=-.12,M.elbowRight=-.12,M.hipLeft=.55,M.hipRight=.42,M.kneeLeft=.5,M.kneeRight=.68,M.ankleLeft=.42,M.ankleRight=.42,M.headPitch=-.55,M.bodySquash=1.03;return}if(i.jumpKind==="back"){M.shoulderLeftPitch=1.9,M.shoulderRightPitch=1.9,M.shoulderLeftRoll=.3,M.shoulderRightRoll=.3,M.elbowLeft=-.5,M.elbowRight=-.5,M.hipLeft=-1.5,M.hipRight=-1.5,M.kneeLeft=1.75,M.kneeRight=1.75,M.ankleLeft=.3,M.ankleRight=.3,M.headPitch=.2,M.bodySquash=1.05;return}if(i.jumpKind==="wall"&&e){M.bodyPitch=.16,M.shoulderLeftPitch=-1.9,M.shoulderRightPitch=-.9,M.shoulderLeftRoll=.6,M.shoulderRightRoll=.75,M.elbowLeft=-.5,M.elbowRight=-.3,M.hipLeft=-1.3,M.hipRight=.45,M.kneeLeft=1.35,M.kneeRight=.25,M.ankleLeft=.2,M.ankleRight=.4,M.headPitch=-.1;return}if(i.flipping){M.shoulderLeftPitch=-2.75,M.shoulderRightPitch=-2.75,M.shoulderLeftRoll=.15,M.shoulderRightRoll=.15,M.elbowLeft=-1.5,M.elbowRight=-1.5,M.hipLeft=-1.3,M.hipRight=-1.3,M.kneeLeft=1.9,M.kneeRight=1.9,M.ankleLeft=.5,M.ankleRight=.5,M.bodySquash=1.04;return}if(e){const t=i.jumpStage===2?1.25:1;M.shoulderLeftPitch=-2.5*t,M.shoulderRightPitch=-2.5*t,M.shoulderLeftRoll=.22,M.shoulderRightRoll=.22,M.elbowLeft=-.35*t,M.elbowRight=-.35*t,M.hipLeft=-.55*t,M.hipRight=-.3*t,M.kneeLeft=1.05*t,M.kneeRight=.6*t,M.ankleLeft=.5,M.ankleRight=.42,M.bodyPitch=.12,M.bodySquash=1.06,M.headPitch=-.1}else{const t=Ue.clamp(-i.verticalSpeed/16,0,1);M.shoulderLeftPitch=-1.1-t*.5,M.shoulderRightPitch=-1.1-t*.5,M.shoulderLeftRoll=.75+t*.3,M.shoulderRightRoll=.75+t*.3,M.elbowLeft=-.5,M.elbowRight=-.5,M.hipLeft=-.26+t*.2,M.hipRight=.16,M.kneeLeft=.4,M.kneeRight=.18,M.ankleLeft=-.22,M.ankleRight=-.18,M.bodyPitch=-.06-t*.08,M.bodySquash=1+t*.04,M.headPitch=t*.12}}function Lg(i){if(i.submerged){M.bodyPitch=i.diving?1.85:1.26,M.bodyHeight=.26;const e=i.strokeProgress<1,t=e?i.strokeProgress:i.time*.72%1,n=e?1:.5,s=Math.sin(t*Math.PI)*n;M.shoulderLeftPitch=-2.45+s*1.5,M.shoulderRightPitch=-2.45+s*1.5,M.shoulderLeftRoll=.28+s*1,M.shoulderRightRoll=.28+s*1,M.elbowLeft=-.25-s*.85,M.elbowRight=-.25-s*.85;const r=Math.sin(i.time*4.6);M.hipLeft=r*.4,M.hipRight=-r*.4,M.kneeLeft=Math.max(0,r)*.8,M.kneeRight=Math.max(0,-r)*.8,M.headPitch=-.62}else{M.bodyPitch=.16,M.bodyHeight=.05;const e=Math.sin(i.time*3.2);M.shoulderLeftPitch=-.32+e*.16,M.shoulderRightPitch=-.32-e*.16,M.shoulderLeftRoll=.52+e*.2,M.shoulderRightRoll=.52-e*.2,M.elbowLeft=-1.3-Math.max(0,e)*.28,M.elbowRight=-1.3-Math.max(0,-e)*.28;const t=Math.sin(i.time*2.6);M.hipLeft=-.55+t*.3,M.hipRight=-.55-t*.3,M.kneeLeft=.75+Math.max(0,t)*.4,M.kneeRight=.75+Math.max(0,-t)*.4,M.headPitch=-.1}}function Dg(){M.shoulderLeftPitch=-1.52,M.shoulderRightPitch=-1.52,M.shoulderLeftRoll=.3,M.shoulderRightRoll=.3,M.elbowLeft=-.35,M.elbowRight=-.35,M.bodyPitch=Math.max(M.bodyPitch,0)+.06}function Ig(){M.bodySquash=.82,M.bodyHeight=-.12,M.hipLeft=-.6,M.hipRight=-.6,M.kneeLeft=1.05,M.kneeRight=1.05,M.ankleLeft=-.3,M.ankleRight=-.3,M.shoulderLeftPitch=-.45,M.shoulderRightPitch=-.45,M.shoulderLeftRoll=.55,M.shoulderRightRoll=.55}const vl=new L(0,1,0);class Ug{constructor(e,t,n={},s={}){z(this,"object");z(this,"rig");z(this,"velocity",new L);z(this,"state","air");z(this,"onGround",!1);z(this,"groundNormal",new L(0,1,0));z(this,"facing",0);z(this,"carried",null);z(this,"capsule");z(this,"world");z(this,"events");z(this,"coyoteTimer",0);z(this,"jumpBufferTimer",0);z(this,"jumpHeld",!1);z(this,"jumpStage",1);z(this,"comboWindow",0);z(this,"flipTimer",-1);z(this,"flipDelay",G.tripleJumpFlipDelay);z(this,"flipProgress",0);z(this,"landingTimer",0);z(this,"skidding",!1);z(this,"crouching",!1);z(this,"braking",!1);z(this,"momentum",0);z(this,"brakeRate",0);z(this,"brakeStrength",0);z(this,"jumpKind","normal");z(this,"flipDirection",1);z(this,"flipAxis","pitch");z(this,"airPresses",0);z(this,"sinceTakeOff",99);z(this,"tookOffRunning",!1);z(this,"takeOffY",0);z(this,"sinceSideFlipPress",99);z(this,"poundPhase","none");z(this,"poundTimer",0);z(this,"ladder",null);z(this,"wallNormal",new L);z(this,"wallTimer",99);z(this,"againstWall",!1);z(this,"wallKicks",0);z(this,"ledgeTimer",-1);z(this,"ledgeSeconds",0);z(this,"ledgeWide",!1);z(this,"ledgeVault",!1);z(this,"ledgeHanging",!1);z(this,"ledgeLift",0);z(this,"ledgeCooldown",0);z(this,"ledgeFrom",new L);z(this,"ledgeTo",new L);z(this,"strokeTimer",0);z(this,"submerged",!1);z(this,"atSurface",!1);z(this,"diving",!1);z(this,"footstepPhase",0);z(this,"animationTime",0);z(this,"lastSafePosition",new L);z(this,"safePositionTimer",0);z(this,"diagnostics",{collisions:0,lastNormalY:0,lastDepth:0});z(this,"ledgeDiagnostics",{reason:"",lip:0,surface:0});z(this,"scratchA",new L);z(this,"scratchB",new L);z(this,"scratchMove",new L);z(this,"scratchSide",new L);z(this,"scratchProbe",new L);z(this,"carryables",[]);this.world=e,this.events=n,this.rig=yg(s),this.object=this.rig.root,this.object.position.copy(t),this.capsule=new hc(new L(t.x,t.y+Pn,t.z),new L(t.x,t.y+qn-Pn,t.z),Pn),this.lastSafePosition.copy(t)}get position(){return this.object.position}getFocusPoint(e){return e.copy(this.object.position).addScaledVector(vl,qn*.78)}get speed(){return Math.hypot(this.velocity.x,this.velocity.z)}get isSubmerged(){return this.state==="swim"&&!this.atSurface&&this.submerged}get stateName(){return this.state==="climb"?"climb":this.state==="air"&&this.poundPhase==="hover"?"pound-hover":this.state==="air"&&this.poundPhase==="slam"?"pound":this.poundPhase==="landed"?"pound-land":this.state==="ledge"?this.ledgeHanging?"hanging":this.ledgeWide?"mantle":this.ledgeVault?"ledge-vault":"ledge-swing":this.state==="swim"?this.atSurface?"swim-surface":"swim-under":this.state==="air"?this.againstWall&&this.velocity.y<0?"wall-slide":this.jumpKind==="long"?"long-jump":this.jumpKind==="back"?"backflip":this.jumpKind==="wall"&&this.velocity.y>0?"wall-kick":this.jumpKind==="side"?"side-flip":this.velocity.y<=.5?"fall":this.jumpStage===3?"triple":this.jumpStage===2?"double":"jump":this.crouching?"crouch":this.braking?"brake":this.skidding?"skid":this.speed>G.walkSpeed+.6?"run":this.speed>.25?"walk":"idle"}update(e,t,n){this.animationTime+=e,this.strokeTimer>0&&(this.strokeTimer-=e),this.landingTimer>0&&(this.landingTimer-=e),this.comboWindow>0&&(this.comboWindow-=e),this.flipTimer>=0&&(this.flipTimer+=e),this.wallTimer<10&&(this.wallTimer+=e),this.ledgeCooldown>0&&(this.ledgeCooldown-=e),this.sinceTakeOff<10&&(this.sinceTakeOff+=e),this.sinceSideFlipPress<10&&(this.sinceSideFlipPress+=e),t.wasPressed("sideFlip")&&(this.sinceSideFlipPress=0),this.poundPhase==="landed"&&(this.poundTimer-=e,this.poundTimer<=0&&(this.poundPhase="none"));const s=this.scratchA.set(t.move.x,0,t.move.y),r=Math.min(1,s.length());if(r>.001?s.normalize().applyAxisAngle(vl,n):s.set(0,0,0),this.updateJumpTimers(e,t),this.state==="climb"){this.updateClimb(e,t,s,r),this.updateCarry(e,t),this.updateRecovery(e),this.syncModel(e,r);return}if(this.state==="ledge"){this.updateLedge(e,t),this.updateCarry(e,t),this.updateRecovery(e),this.syncModel(e,r);return}switch(this.updateWaterState(),this.state){case"swim":this.updateSwim(e,t,s,r);break;case"ground":this.updateGround(e,t,s,r);break;default:this.updateAir(e,t,s,r);break}this.integrate(e),this.updateFlip(e),this.updateCarry(e,t),this.updateRecovery(e),this.syncModel(e,r)}updateGround(e,t,n,s){const r=this.scratchB.set(this.velocity.x,0,this.velocity.z),o=r.length();if(this.crouching=t.isDown("crouch")&&this.poundPhase==="none",s>.001&&!this.crouching&&this.tryCatchLadder(n))return;if(this.poundPhase==="landed"){this.braking=!1,this.skidding=!1,this.velocity.x=0,this.velocity.z=0,this.velocity.y<0&&(this.velocity.y=-2);return}if(this.crouching){this.braking=!1,this.skidding=!1,s>.001&&this.turnToward(n,e,o,G.crouchTurnRate);const l=s>.001?G.crouchSpeed:0,c=o>l?Math.max(l,o-G.crouchDeceleration*e):Math.min(l,o+G.acceleration*.35*e);o>.001?r.multiplyScalar(c/o):c>0&&r.copy(this.forwardVector(this.scratchMove)).multiplyScalar(c)}else if(s>.001){this.braking=!1;const l=this.targetSpeedFor(s),c=o>.01?n.dot(this.scratchSide.copy(r).divideScalar(o)):1;if(this.skidding=o>G.skidMinSpeed&&c<G.skidDotThreshold,this.skidding){const h=Math.max(0,o-G.skidDeceleration*e);o>.001&&r.multiplyScalar(h/o)}else{this.turnToward(n,e,o);const h=this.forwardVector(this.scratchMove),u=r.dot(h),f=u<l?Math.min(l,u+G.acceleration*e):Math.max(l,u-G.deceleration*e),m=this.scratchSide.copy(r).addScaledVector(h,-u).multiplyScalar(Math.max(0,1-G.deceleration*1.8*e));r.copy(h).multiplyScalar(f).add(m)}}else{if(this.skidding=!1,!this.braking&&o>G.brakeMinSpeed){this.braking=!0;const h=Math.pow(this.momentum,G.brakeMomentumCurve),u=Ue.lerp(G.brakeSlideShort,G.brakeSlideLong,h);this.brakeRate=o*o/(2*Math.max(.1,u)),this.brakeStrength=h}this.braking&&o<G.brakeEndSpeed&&(this.braking=!1);const l=(this.braking?this.brakeRate:G.deceleration)*e,c=Math.max(0,o-l);o>.001&&r.multiplyScalar(c/o)}if(this.velocity.x=r.x,this.velocity.z=r.z,Math.hypot(r.x,r.z)>G.brakeMinSpeed&&!this.braking?this.momentum=Math.min(1,this.momentum+e/G.brakeMomentumBuild):this.braking||(this.momentum=Math.max(0,this.momentum-e/G.brakeMomentumFade)),this.velocity.y<0&&(this.velocity.y=-2),this.jumpBufferTimer>0&&this.coyoteTimer>0){this.performJump();return}}updateAir(e,t,n,s){this.skidding=!1,this.braking=!1,this.crouching=!1;const r=this.velocity.y>0?G.gravity:G.gravity*G.fallGravityMultiplier;if(this.velocity.y-=r*e,this.velocity.y=Math.max(this.velocity.y,-34),this.jumpHeld&&!t.isDown("jump")&&this.velocity.y>0&&(this.velocity.y*=G.jumpCutMultiplier,this.jumpHeld=!1),this.poundPhase==="hover"||this.poundPhase==="slam"){this.updateGroundPound(e);return}if(this.canSideFlip()){this.performSideFlip();return}if(!this.tryCatchLadder()&&!this.tryCatchLedge()){if(this.againstWall&&this.velocity.y<-3.4&&(this.velocity.y=-3.4),this.jumpBufferTimer>0&&this.wallTimer<G.wallKickWindow&&this.wallKicks<G.wallKickLimit){this.performWallKick();return}if(t.wasPressed("jump")){if(this.airPresses+=1,this.airPresses===1){this.velocity.y=Math.max(this.velocity.y,0)+G.airBoostVelocity,this.jumpHeld=!0,this.jumpBufferTimer=0;return}if(this.airPresses>=2){this.startGroundPound();return}}if(s>.001){const o=this.jumpKind==="long"?G.longJumpAirControl:1;this.turnToward(n,e,0,G.airTurnRate*o);const a=this.targetSpeedFor(s),l=this.scratchB.set(this.velocity.x,0,this.velocity.z);l.addScaledVector(n,G.airAcceleration*o*e),l.length()>Math.max(a,this.speed)&&l.setLength(Math.max(a,this.speed)),this.velocity.x=l.x,this.velocity.z=l.z}else{const o=Math.max(0,1-G.airDeceleration*e);this.velocity.x*=o,this.velocity.z*=o}this.jumpBufferTimer>0&&this.coyoteTimer>0&&this.performJump()}}tryCatchLedge(){const e=u=>(this.ledgeDiagnostics.reason=u,!1);if(this.ledgeCooldown>0)return e("cooldown");if(this.velocity.y>G.ledgeGrabRise)return e("rising");const t=this.againstWall?this.scratchA.copy(this.wallNormal).negate():this.forwardVector(this.scratchA);if(t.lengthSq()<1e-6)return e("no direction");const n=this.object.position.y,s=this.ledgeSurfaceAt(t,G.ledgeReach,n);if(s===null)return e("nothing in front");const r=s-n;if(this.ledgeDiagnostics.lip=Math.round(r*100)/100,this.ledgeDiagnostics.surface=Math.round(s*100)/100,r<G.ledgeGrabLow||r>G.ledgeGrabHigh)return e("out of reach");const o=this.ledgeSurfaceAt(t,G.ledgeReach+G.ledgeStandNarrow,n),a=this.ledgeSurfaceAt(t,G.ledgeReach+G.ledgeWideDepth,n),l=o!==null&&Math.abs(o-s)<.25;this.ledgeWide=l&&a!==null&&Math.abs(a-s)<.25,this.ledgeVault=!l;const c=this.ledgeWide?G.ledgeStandWide:this.ledgeVault?G.ledgeVaultOver:G.ledgeStandNarrow;this.ledgeFrom.copy(this.object.position),this.ledgeTo.set(this.object.position.x+t.x*(G.ledgeReach+c),s,this.object.position.z+t.z*(G.ledgeReach+c));const h=Ue.clamp(s-G.ledgeHangLift,n-G.ledgeSettleDown,n+G.ledgeSettleUp);return this.ledgeFrom.y=h,this.object.position.y=h,this.syncCapsuleFromPosition(),this.facing=Math.atan2(t.x,t.z),this.velocity.set(0,0,0),this.ledgeTimer=0,this.ledgeLift=s-h,this.ledgeHanging=!0,this.ledgeSeconds=this.ledgeWide?G.ledgeMantleSeconds:this.ledgeVault?G.ledgeVaultSeconds:G.ledgeSwingSeconds,this.againstWall=!1,this.wallTimer=99,this.state="ledge",this.ledgeDiagnostics.reason="caught",!0}ledgeSurfaceAt(e,t,n){const s=this.scratchB.set(this.object.position.x+e.x*t,n+G.ledgeGrabHigh+.4,this.object.position.z+e.z*t),r=this.world.groundProbe(s,G.ledgeGrabHigh+.4);return!r||r.normal.y<ml?null:r.y}updateLedge(e,t){if(this.ledgeHanging){this.object.position.copy(this.ledgeFrom),this.object.rotation.y=this.facing,this.syncCapsuleFromPosition(),t.wasPressed("jump")?(this.ledgeHanging=!1,this.ledgeTimer=0,this.jumpBufferTimer=0):t.isDown("crouch")&&(this.ledgeHanging=!1,this.ledgeTimer=-1,this.ledgeCooldown=G.ledgeCooldown,this.velocity.set(0,0,0),this.state="air");return}this.ledgeTimer+=e;const n=Ue.clamp(this.ledgeTimer/this.ledgeSeconds,0,1),s=Ue.clamp(n/(this.ledgeWide?.62:.55),0,1),r=Ue.clamp((n-.34)/.66,0,1),o=s*s*(3-2*s),a=r*r*(3-2*r);this.object.position.set(Ue.lerp(this.ledgeFrom.x,this.ledgeTo.x,a),Ue.lerp(this.ledgeFrom.y,this.ledgeTo.y,o),Ue.lerp(this.ledgeFrom.z,this.ledgeTo.z,a)),this.object.rotation.y=this.facing,this.syncCapsuleFromPosition(),this.ledgeLift=this.ledgeTo.y-this.object.position.y,n>=1&&(this.ledgeTimer=-1,this.ledgeCooldown=G.ledgeCooldown,this.wallKicks=0,this.jumpKind="normal",this.onGround=!0,this.coyoteTimer=G.coyoteTime,this.state="ground")}startGroundPound(){this.velocity.set(0,0,0),this.poundPhase="hover",this.poundTimer=G.groundPoundHover,this.jumpKind="normal",this.jumpStage=1,this.flipTimer=-1,this.flipProgress=0,this.jumpBufferTimer=0}updateGroundPound(e){if(this.poundPhase==="hover"){this.poundTimer-=e,this.velocity.set(0,0,0),this.poundTimer<=0&&(this.poundPhase="slam");return}this.poundPhase==="slam"&&(this.velocity.x=0,this.velocity.z=0,this.velocity.y=-34)}tryCatchLadder(e){if(this.state==="ledge"||this.poundPhase!=="none")return!1;const t=this.world.ladderAt(this.capsuleCentre(this.scratchProbe),G.ladderSnagDistance);if(!t||this.object.position.y>t.topY-.2)return!1;if(e){const n=this.scratchSide.set(Math.sin(t.facing),0,Math.cos(t.facing));if(e.dot(n)<.3)return!1}return this.ladder=t,this.facing=t.facing,this.velocity.set(0,0,0),this.state="climb",this.snapToLadder(t),!0}snapToLadder(e){const t=this.forwardVector(this.scratchMove);this.object.position.x=e.anchor.x-t.x*G.ladderStandOff,this.object.position.z=e.anchor.z-t.z*G.ladderStandOff,this.object.rotation.y=this.facing,this.syncCapsuleFromPosition()}updateClimb(e,t,n,s){const r=this.ladder;if(!r){this.state="air";return}const o=this.forwardVector(this.scratchMove),a=s>.001?n.x*o.x+n.z*o.z:0;this.velocity.set(0,a*G.ladderSpeed,0);const l=r.topY-G.ledgeHangLift;if(this.object.position.y=Ue.clamp(this.object.position.y+this.velocity.y*e,r.bounds.min.y-.2,l),this.snapToLadder(r),this.object.position.y>=l-.01&&a>.2){const c=this.ladder;if(this.ladder=null,this.tryCatchLedge())return;this.ladder=c}if(t.wasPressed("jump")){this.ladder=null,this.state="air",this.velocity.set(-o.x*G.ladderJumpOff,G.jumpVelocity*.75,-o.z*G.ladderJumpOff),this.jumpHeld=!0,this.jumpKind="normal";return}this.object.position.y<=r.bounds.min.y-.19&&(this.ladder=null,this.state="air")}updateSwim(e,t,n,s){this.skidding=!1;const r=this.world.waterAt(this.capsuleCentre(this.scratchB));if(!r){this.state="air";return}const a=r.surfaceY-qn*G.floatSubmersion-this.object.position.y;this.atSurface=Math.abs(a)<.35,this.submerged=!0;const l=t.isDown("dive");if(this.diving=l,l?this.velocity.y-=G.diveAcceleration*e:a>0?this.velocity.y+=Math.min(G.buoyancy,a*7)*e:this.velocity.y+=Math.max(-7.5,a*5)*e,t.wasPressed("jump")&&this.atSurface&&this.tryCatchLedge()){this.submerged=!1,this.diving=!1;return}if(t.wasPressed("jump")&&this.strokeTimer<=0){this.strokeTimer=G.strokeCooldown;const u=this.forwardVector(this.scratchMove),f=(this.atSurface,.55);this.velocity.addScaledVector(u,G.strokeImpulse),this.velocity.y+=G.strokeImpulse*f}s>.001&&(this.turnToward(n,e,0,5.5),this.velocity.addScaledVector(n,G.swimAcceleration*s*e));const c=Math.max(0,1-G.swimDrag*e);this.velocity.multiplyScalar(c);const h=Math.hypot(this.velocity.x,this.velocity.z);if(h>G.swimSpeed){const u=G.swimSpeed/h;this.velocity.x*=u,this.velocity.z*=u}}integrate(e){this.againstWall=!1;const t=this.velocity.length()*e,n=Math.min(6,Math.max(1,Math.ceil(t/(Pn*.75)))),s=e/n,r=this.onGround,o=this.velocity.y;this.diagnostics.collisions=0,this.onGround=!1;for(let a=0;a<n;a+=1)this.moveHorizontally(s,r),this.moveVertically(s);if(this.velocity.y<=.1){const a=r?G.groundSnapDistance:.04;this.settleOnGround(a)}this.onGround?(r||(this.poundPhase==="slam"?(this.poundPhase="landed",this.poundTimer=G.groundPoundRecovery,this.landingTimer=.17,this.events.onLand?.(this.object.position,1)):this.poundPhase!=="landed"&&(this.poundPhase="none"),this.flipTimer=-1,this.flipProgress=0,this.flipDirection=1,this.jumpKind="normal",this.wallKicks=0,this.againstWall=!1,this.wallTimer=99,this.comboWindow=this.jumpStage<3?G.jumpComboWindow:0,this.jumpStage>=3&&(this.jumpStage=1),o<-4&&(this.landingTimer=.17,this.events.onLand?.(this.object.position,Math.min(1,-o/22)))),this.coyoteTimer=G.coyoteTime,this.state==="air"&&(this.state="ground")):this.state==="ground"&&(this.state="air",this.airPresses=0),this.syncPositionFromCapsule()}moveHorizontally(e,t){const n=this.scratchMove.set(this.velocity.x*e,0,this.velocity.z*e);if(Math.hypot(n.x,n.z)<1e-6)return;const s=t?G.stepHeight:0;s>0&&this.capsule.translate(this.scratchSide.set(0,s,0)),this.capsule.translate(n),this.resolveWalls(),s>0&&this.capsule.translate(this.scratchSide.set(0,-s,0))}moveVertically(e){this.capsule.translate(this.scratchMove.set(0,this.velocity.y*e,0)),this.resolveVertical()}resolveWalls(){for(let e=0;e<4;e+=1){const t=this.world.capsuleIntersect(this.capsule);if(!t||Math.abs(t.normal.y)>.7)break;const n=this.scratchB.copy(t.normal).multiplyScalar(t.depth);if(n.y=0,n.lengthSq()<1e-10)break;this.diagnostics.collisions+=1,this.diagnostics.lastNormalY=t.normal.y,this.diagnostics.lastDepth=t.depth,this.capsule.translate(n),this.state==="air"&&(this.scratchA.set(t.normal.x,0,t.normal.z),this.scratchA.lengthSq()>1e-6&&(this.wallNormal.copy(this.scratchA).normalize(),this.wallTimer=0,this.againstWall=!0));const s=this.velocity.x*t.normal.x+this.velocity.z*t.normal.z;s<0&&(this.velocity.x-=t.normal.x*s,this.velocity.z-=t.normal.z*s)}}resolveVertical(){for(let e=0;e<4;e+=1){const t=this.world.capsuleIntersect(this.capsule);if(!t||Math.abs(t.normal.y)<.25)break;const n=t.normal.y*t.depth;if(Math.abs(n)<1e-6)break;this.diagnostics.collisions+=1,this.diagnostics.lastNormalY=t.normal.y,this.diagnostics.lastDepth=t.depth,this.capsule.translate(this.scratchB.set(0,n,0)),t.normal.y<-.5&&this.velocity.y>0&&(this.velocity.y=0)}}settleOnGround(e){const t=this.capsule.start.y-Pn,n=this.scratchSide.set(this.capsule.start.x,t+.25,this.capsule.start.z),s=this.world.groundProbe(n,.25+e);return!s||s.normal.y<ml?!1:(this.capsule.translate(this.scratchMove.set(0,s.y-t,0)),this.onGround=!0,this.groundNormal.copy(s.normal),this.velocity.y<0&&(this.velocity.y=0),!0)}updateJumpTimers(e,t){this.coyoteTimer>0&&(this.coyoteTimer-=e),this.jumpBufferTimer>0&&(this.jumpBufferTimer-=e),t.wasPressed("jump")&&(this.jumpBufferTimer=G.jumpBufferTime)}performJump(){if(this.crouching){if(this.speed>=G.longJumpMinSpeed){this.performLongJump();return}if(this.speed<=G.backflipMaxSpeed){this.performBackflip();return}}this.jumpKind="normal";const e=this.comboWindow>0&&this.speed>=G.jumpComboMinSpeed;this.jumpStage=e?Math.min(3,this.jumpStage+1):1,this.velocity.y=this.jumpStage===3?G.tripleJumpVelocity:this.jumpStage===2?G.doubleJumpVelocity:G.jumpVelocity,this.flipTimer=this.jumpStage===3?0:-1,this.flipDelay=G.tripleJumpFlipDelay,this.flipProgress=0,this.flipDirection=1,this.flipAxis="pitch",this.takeOff()}performLongJump(){const e=this.forwardVector(this.scratchMove);this.velocity.x=e.x*G.longJumpSpeed,this.velocity.z=e.z*G.longJumpSpeed,this.velocity.y=G.longJumpVelocity,this.jumpKind="long",this.jumpStage=1,this.flipTimer=-1,this.flipProgress=0,this.flipDirection=1,this.flipAxis="pitch",this.takeOff()}canSideFlip(){return this.state!=="air"||this.jumpKind!=="normal"||this.poundPhase!=="none"||!this.tookOffRunning?!1:this.sinceTakeOff<=G.sideFlipWindow&&this.sinceSideFlipPress<=G.sideFlipWindow}performSideFlip(){const e=this.forwardVector(this.scratchMove);this.velocity.x=e.x*G.sideFlipSpeed,this.velocity.z=e.z*G.sideFlipSpeed;const t=this.takeOffY+G.sideFlipApex-this.object.position.y;this.velocity.y=Math.max(G.sideFlipLeastVelocity,Math.sqrt(Math.max(0,2*G.gravity*t))),this.jumpKind="side",this.jumpStage=1,this.flipTimer=0,this.flipDelay=G.tripleJumpFlipDelay,this.flipProgress=0,this.flipDirection=1,this.flipAxis="roll",this.jumpHeld=!0,this.sinceSideFlipPress=99,this.sinceTakeOff=99}performBackflip(){const e=this.forwardVector(this.scratchMove);this.velocity.x=-e.x*G.backflipSpeed,this.velocity.z=-e.z*G.backflipSpeed,this.velocity.y=G.backflipVelocity,this.jumpKind="back",this.jumpStage=1,this.flipTimer=0,this.flipDelay=G.tripleJumpFlipDelay,this.flipProgress=0,this.flipDirection=-1,this.flipAxis="pitch",this.takeOff()}performWallKick(){this.velocity.x=this.wallNormal.x*G.wallKickSpeed,this.velocity.z=this.wallNormal.z*G.wallKickSpeed,this.velocity.y=G.wallKickVelocity,this.facing=Math.atan2(this.wallNormal.x,this.wallNormal.z),this.wallKicks+=1,this.wallTimer=99,this.againstWall=!1,this.jumpKind="wall",this.jumpStage=1,this.flipTimer=-1,this.flipProgress=0,this.flipDirection=1,this.flipAxis="pitch",this.takeOff()}takeOff(){this.airPresses=0,this.sinceTakeOff=0,this.takeOffY=this.object.position.y,this.tookOffRunning=this.speed>G.walkSpeed+.6,this.poundPhase="none",this.comboWindow=0,this.jumpHeld=!0,this.jumpBufferTimer=0,this.coyoteTimer=0,this.onGround=!1,this.crouching=!1,this.braking=!1,this.state="air"}updateFlip(e){if(this.flipTimer<0)return;if(this.state!=="air"){this.flipTimer=-1,this.flipProgress=0;return}const t=this.predictTimeToLand(),n=this.flipTimer+t;if(this.flipDelay=Ue.clamp((n-G.tripleJumpFlipMinAirtime)*G.tripleJumpFlipDelayShare,G.tripleJumpFlipDelayMin,G.tripleJumpFlipDelay),this.flipTimer<this.flipDelay)return;const s=t-G.tripleJumpLandMargin,r=Math.max(e,s),o=(1-this.flipProgress)/r;this.flipProgress=Math.min(1,this.flipProgress+o*e)}predictTimeToLand(){const e=this.scratchSide.set(this.object.position.x,this.object.position.y+.3,this.object.position.z),t=this.world.groundProbe(e,80);if(!t)return 1/0;let n=Math.max(0,this.object.position.y-t.y);const s=G.gravity,r=G.gravity*G.fallGravityMultiplier;let o=0,a=this.velocity.y;a>0&&(o+=a/s,n+=a*a/(2*s),a=0);const l=-a;return o+=(-l+Math.sqrt(l*l+2*r*n))/r,o}get flipping(){return this.flipTimer>=this.flipDelay&&this.flipProgress<1}get somersaultProgress(){return this.flipTimer<0?0:this.flipProgress}updateWaterState(){const e=this.state==="swim",t=e?qn*.12:qn*.5,n=this.scratchB.set(this.object.position.x,this.object.position.y+t,this.object.position.z),s=this.world.waterAt(n);if(s&&!e){const r=-this.velocity.y;this.state="swim",this.submerged=!0,this.velocity.y*=.22,this.velocity.x*=.65,this.velocity.z*=.65,r>G.splashSpeed&&this.events.onSplash?.(new L(this.object.position.x,s.surfaceY,this.object.position.z),Math.min(1,r/18))}else!s&&e&&(this.state=this.onGround?"ground":"air",this.submerged=!1,this.atSurface=!1,this.diving=!1)}findCarryTarget(){if(this.carried)return null;let e=null,t=1/0;const n=this.forwardVector(this.scratchMove);for(const s of this.carryables){if(s.held||s.pickupCooldown>0)continue;const r=this.scratchSide.copy(s.position).sub(this.object.position),o=Math.abs(r.y);r.y=0;const a=r.length();if(a>G.carryReach+s.radius||o>qn)continue;const l=a>.001?n.dot(r.divideScalar(a)):1;if(l<-.35)continue;const c=a-l*.5;c<t&&(t=c,e=s)}return e}updateCarry(e,t){if(!t.wasPressed("grab"))return;if(this.carried){this.throwCarried();return}const n=this.findCarryTarget();n&&(n.pickUp(),this.carried=n,this.rig.carryAnchor.add(n.object3d),n.object3d.position.set(0,0,0))}throwCarried(){const e=this.carried;if(!e)return;const t=e.object3d.getWorldPosition(new L),n=this.object.parent;this.rig.carryAnchor.remove(e.object3d),n?.add(e.object3d),e.object3d.position.copy(t);const s=this.forwardVector(this.scratchMove),r=new L().addScaledVector(s,G.throwSpeed).add(new L(this.velocity.x*.4,G.throwLift,this.velocity.z*.4));e.release(r),this.carried=null}dropCarried(){this.carried&&this.throwCarried()}updateRecovery(e){this.safePositionTimer-=e,this.safePositionTimer<=0&&this.state==="ground"&&this.onGround&&this.speed<7&&(this.safePositionTimer=.45,this.lastSafePosition.copy(this.object.position)),this.object.position.y<G.killPlaneY&&this.respawn()}respawn(){this.dropCarried(),this.object.position.copy(this.lastSafePosition),this.object.position.y+=.2,this.velocity.set(0,0,0),this.state="air",this.syncCapsuleFromPosition(),this.events.onRespawn?.()}setSafePosition(e){this.lastSafePosition.copy(e)}teleport(e,t=this.facing){this.dropCarried(),this.object.position.copy(e),this.facing=t,this.velocity.set(0,0,0),this.state="air",this.lastSafePosition.copy(e),this.syncCapsuleFromPosition()}targetSpeedFor(e){const t=e<=.55?Ue.lerp(0,G.walkSpeed,e/.55):Ue.lerp(G.walkSpeed,G.runSpeed,(e-.55)/.45);return this.carried?t*G.carrySpeedMultiplier:t}turnToward(e,t,n,s){if(e.lengthSq()<1e-4)return;const r=Math.atan2(e.x,e.z),o=s??Ue.lerp(G.turnRateSlow,G.turnRateFast,Ue.clamp(n/G.runSpeed,0,1));let a=r-this.facing;for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;const l=Ue.clamp(a,-o*t,o*t);this.facing+=l}forwardVector(e){return e.set(Math.sin(this.facing),0,Math.cos(this.facing))}capsuleCentre(e){return e.copy(this.capsule.start).add(this.capsule.end).multiplyScalar(.5)}syncPositionFromCapsule(){this.object.position.set(this.capsule.start.x,this.capsule.start.y-Pn,this.capsule.start.z)}syncCapsuleFromPosition(){const e=this.object.position;this.capsule.start.set(e.x,e.y+Pn,e.z),this.capsule.end.set(e.x,e.y+qn-Pn,e.z)}syncModel(e,t){this.object.rotation.y=this.facing,this.state==="ground"&&this.speed>.6?(this.footstepPhase+=this.speed*e,this.footstepPhase>1.6&&(this.footstepPhase=0,this.events.onFootstep?.(this.object.position))):this.footstepPhase=0;const n={time:this.animationTime,delta:e,state:this.state,speed:this.speed,maxSpeed:G.runSpeed,verticalSpeed:this.velocity.y,skidding:this.skidding,landing:this.landingTimer>0,carrying:this.carried!==null,submerged:this.submerged&&!this.atSurface,diving:this.diving&&this.state==="swim",jumpStage:this.jumpStage,flipAngle:this.flipTimer<0?0:this.flipProgress*Math.PI*2*this.flipDirection,flipAxis:this.flipAxis,poundPhase:this.poundPhase,climbing:this.state==="climb",climbSpeed:this.state==="climb"?this.velocity.y:0,flipping:this.flipping,crouching:this.crouching,braking:this.braking,brakeStrength:this.braking?this.brakeStrength:0,jumpKind:this.jumpKind,againstWall:this.againstWall,ledgeProgress:this.ledgeTimer<0?0:Math.min(1,this.ledgeTimer/this.ledgeSeconds),ledgeWide:this.ledgeWide,ledgeHanging:this.ledgeHanging,ledgeLift:this.ledgeLift,strokeProgress:this.strokeTimer>0?1-this.strokeTimer/G.strokeCooldown:1};bg(this.rig,n)}get carryAnchor(){return this.rig.carryAnchor}}const _n=220,Fg=18;function Ng(){const e=document.createElement("canvas");e.width=64,e.height=64;const t=e.getContext("2d");if(t){const n=t.createRadialGradient(32,32,0,32,32,32);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.45,"rgba(255,255,255,0.75)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,64,64)}return new qh(e)}class Og{constructor(e){z(this,"points");z(this,"positions");z(this,"colors");z(this,"baseColors");z(this,"velocities");z(this,"lifetimes");z(this,"maxLifetimes");z(this,"next",0);this.positions=new Float32Array(_n*3),this.colors=new Float32Array(_n*3),this.baseColors=new Float32Array(_n*3),this.velocities=new Float32Array(_n*3),this.lifetimes=new Float32Array(_n),this.maxLifetimes=new Float32Array(_n);for(let s=0;s<_n;s+=1)this.positions[s*3+1]=-9999;const t=new Nt;t.setAttribute("position",new Vt(this.positions,3)),t.setAttribute("color",new Vt(this.colors,3));const n=new Zl({size:.42,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:.92,depthWrite:!1,blending:Zn,map:Ng()});this.points=new Xh(t,n),this.points.name="particles",this.points.frustumCulled=!1,this.points.renderOrder=20,e.add(this.points)}splash(e,t){const n=Math.round(14+t*26);for(let s=0;s<n;s+=1){const r=s/n*Math.PI*2+Math.random()*.4,o=1.6+Math.random()*3.4*(.5+t);this.emit(e.x+Math.cos(r)*.3,e.y+.1,e.z+Math.sin(r)*.3,Math.cos(r)*o*.55,3.2+Math.random()*3.6*(.5+t),Math.sin(r)*o*.55,.55,.86,.98,.5+Math.random()*.4)}}dust(e,t){const n=Math.round(8+t*14);for(let s=0;s<n;s+=1){const r=s/n*Math.PI*2+Math.random()*.6,o=1.1+Math.random()*2.3*(.4+t);this.emit(e.x+Math.cos(r)*.25,e.y+.12,e.z+Math.sin(r)*.25,Math.cos(r)*o,.7+Math.random()*1.1,Math.sin(r)*o,.82,.76,.6,.35+Math.random()*.3)}}emit(e,t,n,s,r,o,a,l,c,h){const u=this.next;this.next=(this.next+1)%_n,this.positions[u*3]=e,this.positions[u*3+1]=t,this.positions[u*3+2]=n,this.velocities[u*3]=s,this.velocities[u*3+1]=r,this.velocities[u*3+2]=o,this.baseColors[u*3]=a,this.baseColors[u*3+1]=l,this.baseColors[u*3+2]=c,this.colors[u*3]=a,this.colors[u*3+1]=l,this.colors[u*3+2]=c,this.lifetimes[u]=h,this.maxLifetimes[u]=h}update(e){let t=!1;for(let n=0;n<_n;n+=1){if(this.lifetimes[n]<=0)continue;if(t=!0,this.lifetimes[n]-=e,this.lifetimes[n]<=0){this.positions[n*3+1]=-9999;continue}this.velocities[n*3+1]-=Fg*e,this.positions[n*3]+=this.velocities[n*3]*e,this.positions[n*3+1]+=this.velocities[n*3+1]*e,this.positions[n*3+2]+=this.velocities[n*3+2]*e;const s=this.lifetimes[n]/this.maxLifetimes[n],r=s*s;this.colors[n*3]=this.baseColors[n*3]*r,this.colors[n*3+1]=this.baseColors[n*3+1]*r,this.colors[n*3+2]=this.baseColors[n*3+2]*r}t&&(this.points.geometry.attributes.position.needsUpdate=!0,this.points.geometry.attributes.color.needsUpdate=!0)}dispose(){this.points.geometry.dispose(),this.points.material.map?.dispose(),this.points.material.dispose(),this.points.removeFromParent()}}const xl=26,Bg=.28,Br=7.5,Ml=.25,zg=3.4,kg=22;class Hg{constructor(e,t){z(this,"object3d");z(this,"velocity",new L);z(this,"radius");z(this,"held",!1);z(this,"pickupCooldown",0);z(this,"resting",!1);z(this,"spawnPosition",new L);z(this,"spin",0);this.object3d=e,this.radius=t,this.spawnPosition.copy(e.position)}get position(){return this.object3d.position}update(e,t){if(this.pickupCooldown>0&&(this.pickupCooldown-=e),this.held){this.resting=!1;return}const n=t.waterAt(this.position);if(n){const o=Math.min(1,(n.surfaceY-this.position.y)/(this.radius*2));this.velocity.y+=kg*o*e,this.velocity.y-=xl*e,this.velocity.multiplyScalar(Math.max(0,1-zg*e))}else this.resting||(this.velocity.y-=xl*e,this.velocity.x*=Math.max(0,1-Ml*e),this.velocity.z*=Math.max(0,1-Ml*e));if(this.resting&&!n){this.spin*=Math.max(0,1-Br*e);return}this.position.addScaledVector(this.velocity,e);const s=new L(this.position.x,this.position.y+this.radius,this.position.z),r=t.groundHeightBelow(s,8);Number.isFinite(r)&&this.position.y-this.radius<=r&&(this.position.y=r+this.radius,this.velocity.y<-1.2?this.velocity.y=-this.velocity.y*Bg:(this.velocity.y=0,this.velocity.x*=Math.max(0,1-Br*e),this.velocity.z*=Math.max(0,1-Br*e),this.velocity.lengthSq()<.02&&(this.velocity.set(0,0,0),this.resting=!0))),this.resting||(this.spin=Math.min(12,this.velocity.length()*.9),this.object3d.rotation.x+=this.spin*e*.6,this.object3d.rotation.z+=this.spin*e*.35),this.position.y<-80&&this.respawn()}pickUp(){this.held=!0,this.velocity.set(0,0,0),this.object3d.rotation.set(0,0,0)}release(e){this.held=!1,this.resting=!1,this.velocity.copy(e),this.pickupCooldown=.4}respawn(){this.held=!1,this.resting=!1,this.velocity.set(0,0,0),this.object3d.position.copy(this.spawnPosition),this.object3d.rotation.set(0,0,0)}}const Vg=`
  uniform float uTime;
  varying vec3 vWorldPosition;
  varying vec3 vNormalW;

  // Three travelling waves at different angles and scales. Summing them keeps
  // the surface from showing an obvious repeating direction.
  vec3 waveNormal(vec2 p, float t) {
    vec2 d1 = normalize(vec2(1.0, 0.35));
    vec2 d2 = normalize(vec2(-0.6, 1.0));
    vec2 d3 = normalize(vec2(0.3, -1.0));

    float a1 = sin(dot(p, d1) * 0.55 + t * 1.25) * 0.055;
    float a2 = sin(dot(p, d2) * 0.9 + t * 1.75) * 0.032;
    float a3 = sin(dot(p, d3) * 1.7 + t * 2.4) * 0.016;

    float dx =
      cos(dot(p, d1) * 0.55 + t * 1.25) * 0.055 * 0.55 * d1.x +
      cos(dot(p, d2) * 0.9 + t * 1.75) * 0.032 * 0.9 * d2.x +
      cos(dot(p, d3) * 1.7 + t * 2.4) * 0.016 * 1.7 * d3.x;
    float dz =
      cos(dot(p, d1) * 0.55 + t * 1.25) * 0.055 * 0.55 * d1.y +
      cos(dot(p, d2) * 0.9 + t * 1.75) * 0.032 * 0.9 * d2.y +
      cos(dot(p, d3) * 1.7 + t * 2.4) * 0.016 * 1.7 * d3.y;

    return normalize(vec3(-dx, 1.0, -dz)) + vec3(0.0, a1 + a2 + a3, 0.0) * 0.0;
  }

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPosition = world.xyz;
    vNormalW = waveNormal(world.xz, uTime);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,Gg=`
  uniform float uTime;
  uniform vec3 uShallowColor;
  uniform vec3 uDeepColor;
  uniform vec3 uSkyColor;
  uniform vec3 uSunDirection;
  uniform float uReflectivity;
  varying vec3 vWorldPosition;
  varying vec3 vNormalW;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    vec3 normal = normalize(vNormalW);

    // Grazing angles reflect the sky; looking straight down shows the depth.
    float fresnel = pow(1.0 - max(dot(viewDirection, normal), 0.0), 3.0);

    // A cheap stand-in for depth: the water is deeper away from the island.
    float shoreDistance = clamp(
      (abs(vWorldPosition.x) + abs(vWorldPosition.z + 12.0)) * 0.012, 0.0, 1.0);
    vec3 baseColor = mix(uShallowColor, uDeepColor, 0.45 + shoreDistance * 0.3);

    vec3 color = mix(baseColor, uSkyColor, fresnel * uReflectivity);

    // Sun glitter. The wave normal varies slowly, so an unbroken highlight
    // showed up as one large white smear; fine ripples break it into glints.
    vec3 halfVector = normalize(uSunDirection + viewDirection);
    float specular = pow(max(dot(normal, halfVector), 0.0), 420.0);
    float ripple = 0.5 + 0.5 *
      sin(vWorldPosition.x * 8.3 + uTime * 2.6) *
      sin(vWorldPosition.z * 7.1 - uTime * 2.1);
    color += vec3(1.0, 0.97, 0.88) * specular * (0.25 + ripple * 0.7);

    // Fine sparkle so the surface is never completely still. Three
    // non-harmonic frequencies, so it does not settle into a visible grid.
    float sparkle =
      sin(vWorldPosition.x * 11.3 + uTime * 2.2) *
      sin(vWorldPosition.z * 9.7 - uTime * 1.8) *
      sin((vWorldPosition.x + vWorldPosition.z) * 5.1 + uTime * 1.1);
    color += vec3(0.55, 0.6, 0.62) * max(0.0, abs(sparkle) - 0.86) * 2.4;

    gl_FragColor = vec4(color, 0.74);
    #include <colorspace_fragment>
  }
`;class Wg extends Ze{constructor(t,n,s,r){const o={uTime:{value:0},uShallowColor:{value:new Ee("#3fb6c9")},uDeepColor:{value:new Ee("#14566e")},uSkyColor:{value:new Ee("#bfe4f7")},uSunDirection:{value:s.clone()},uReflectivity:{value:r?.95:.55}};super(new ei(t,t,1,1).rotateX(-Math.PI/2),new bt({uniforms:o,vertexShader:Vg,fragmentShader:Gg,transparent:!0,depthWrite:!1,side:on}));z(this,"uniforms");this.uniforms=o,this.position.y=n,this.renderOrder=10,this.name="water",this.frustumCulled=!1}update(t){this.uniforms.uTime.value=t}setReflective(t){this.uniforms.uReflectivity.value=t?.95:.55}}const ji=80,Gi=2,Sl=1,Xg=new L(0,0,10),qg=Math.PI,qe={x:-22,z:25,half:7,depth:3.4},At={x:14.45,z:-6,width:.9,top:7.14},Qo=new Ee("#565e6c"),ea=new Ee("#646d7d"),yl=1.7,Fs=7,Ln=5.5,Un=2.6,bl=.3,Ns=9,Os=11,Ys=.9,Yg=new Ee("#4a515d"),jg=new Ee("#424954"),Kg=new Ee("#5f6774");function $g(i,e,t={}){const n=t.obstacles===!0,s=new yt;s.name="slab-world",i.add(s);const r=new yt;r.name="solid",s.add(r),r.add(i0(n)),n&&(r.add(zr(-14-yl-Ys/2,-6)),r.add(zr(-14+yl+Ys/2,-6)),r.add(zr(15,-6)),r.add(t0(15,12)),r.add(e0(4,2)));const o=new Ze(new It(ji,Sl,ji),new Kt({color:new Ee("#2a2f38"),roughness:.95}));o.position.y=-Sl/2-.02,o.receiveShadow=!0,o.castShadow=!0,o.name="slab-body",s.add(o);let a=null;const l=[];if(n){for(const u of Jg())r.add(u);e.addWater(new jt(new L(qe.x-qe.half,-3.4,qe.z-qe.half),new L(qe.x+qe.half,0,qe.z+qe.half)),-.12),a=new Wg(qe.half*2,-.12,cc,!1),a.position.set(qe.x,0,qe.z),a.renderOrder=2,s.add(a),r.add(Zg()),e.addLadder(new jt(new L(At.x-At.width,0,At.z-At.width),new L(At.x+.3,At.top,At.z+At.width)),Math.PI/2,At.top,new L(At.x,0,At.z));const h=Qg();h.position.set(3,.3,14),s.add(h),l.push(new Hg(h,.3))}e.addSolid(r);let c=0;return s.traverse(h=>{if(!(h instanceof Ze))return;const u=h.geometry;u.index?c+=u.index.count/3:u.attributes.position&&(c+=u.attributes.position.count/3)}),{carryables:l,water:a,hasObstacles:n,root:s,spawn:Xg.clone(),spawnFacing:qg,triangleCount:Math.round(c)}}function zr(i,e){const t=new It(Ys,Fs,Os,1,Fs,Os),n=new Ze(t,new Kt({color:Qo,roughness:.92}));n.position.set(i,Fs/2,e),n.castShadow=!0,n.receiveShadow=!0,n.name="wall";const s=new Ze(new It(Ys+.12,.24,Os+.12,1,1,Os),new Kt({color:ea,roughness:.85}));return s.position.y=Fs/2+.02,s.castShadow=!0,s.receiveShadow=!0,n.add(s),n}function Jg(){const i=new Kt({color:new Ee("#3a4350"),roughness:.9}),e=qe.half*2,t=[],n=new Ze(new ei(e,e,qe.half,qe.half).rotateX(-Math.PI/2),i);n.position.set(qe.x,-3.4,qe.z),n.receiveShadow=!0,t.push(n);const s=[[qe.x,qe.z-qe.half,e,.4],[qe.x,qe.z+qe.half,e,.4],[qe.x-qe.half,qe.z,.4,e],[qe.x+qe.half,qe.z,.4,e]];for(const[r,o,a,l]of s){const c=new Ze(new It(a,qe.depth,l,Math.ceil(a),qe.depth,Math.ceil(l)),i);c.position.set(r,-3.4/2,o),c.receiveShadow=!0,c.castShadow=!0,t.push(c)}return t}function Zg(){const i=new yt;i.name="ladder";const e=new Kt({color:new Ee("#8a7a63"),roughness:.8}),t=At.top-.1;for(const n of[-1,1]){const s=new Ze(new It(.1,t,.1,1,Math.ceil(t),1),e);s.position.set(At.x,t/2,At.z+n*.34),s.castShadow=!0,s.receiveShadow=!0,i.add(s)}for(let n=.35;n<t;n+=.42){const s=new Ze(new $s(.045,.045,.76,8),e);s.rotation.x=Math.PI/2,s.position.set(At.x,n,At.z),s.castShadow=!0,i.add(s)}return i}function Qg(){const i=new Ze(new It(.52,.52,.52,2,2,2),new Kt({color:new Ee("#9a7a4b"),roughness:.82}));return i.castShadow=!0,i.receiveShadow=!0,i.name="crate",i}function e0(i,e){const t=new Ze(new It(bl,Un,Ns,1,Un,Ns),new Kt({color:Qo,roughness:.92}));t.position.set(i,Un/2,e),t.castShadow=!0,t.receiveShadow=!0,t.name="thin-wall";const n=new Ze(new It(bl+.08,.16,Ns+.08,1,1,Ns),new Kt({color:ea,roughness:.85}));return n.position.y=Un/2-.08,n.castShadow=!0,n.receiveShadow=!0,t.add(n),t}function t0(i,e){const t=new Ze(new It(Ln,Un,Ln,Ln,Un,Ln),new Kt({color:Qo,roughness:.92}));t.position.set(i,Un/2,e),t.castShadow=!0,t.receiveShadow=!0,t.name="platform";const n=new Ze(new It(Ln+.1,.2,Ln+.1,Ln,1,Ln),new Kt({color:ea,roughness:.85}));return n.position.y=Un/2+.01,n.castShadow=!0,n.receiveShadow=!0,t.add(n),t}function n0(i){const e=i.index,t=i.attributes.position;if(!e)return;const n=[];for(let s=0;s<e.count;s+=3){let r=0,o=0;for(let l=0;l<3;l+=1){const c=e.getX(s+l);r+=t.getX(c),o+=t.getZ(c)}r/=3,o/=3,!(Math.abs(r-qe.x)<qe.half-.01&&Math.abs(o-qe.z)<qe.half-.01)&&n.push(e.getX(s),e.getX(s+1),e.getX(s+2))}i.setIndex(n)}function i0(i){const e=ji/Gi,t=new ei(ji,ji,e,e);t.rotateX(-Math.PI/2),i&&n0(t);const n=t.attributes.position,s=new Float32Array(n.count*3),r=new Ee;for(let a=0;a<n.count;a+=1){const l=n.getX(a),c=n.getZ(a),h=Math.floor(l/Gi)+Math.floor(c/Gi);r.copy(h%2===0?Yg:jg),(Math.abs(l%Gi)<.01||Math.abs(c%Gi)<.01)&&r.lerp(Kg,.6),s[a*3]=r.r,s[a*3+1]=r.g,s[a*3+2]=r.b}t.setAttribute("color",new Vt(s,3)),t.computeVertexNormals();const o=new Ze(t,new Kt({vertexColors:!0,roughness:.94,metalness:0}));return o.name="floor",o.receiveShadow=!0,o.castShadow=!1,o}class s0{constructor(e){z(this,"stats");z(this,"focusNotice");z(this,"visible",!0);const t=document.createElement("div");t.className="ui-root",e.appendChild(t);const n=document.createElement("div");n.className="hud",t.appendChild(n),this.stats=document.createElement("div"),this.stats.className="hud__stats",n.appendChild(this.stats);const s=document.createElement("div");s.className="hud__hints",s.innerHTML=`
      Forward <b>E</b> · Back <b>D</b> · Left <b>S</b> · Right <b>F</b> ·
      Walk <b>hold Shift</b> · Jump <b>Space</b><br />
      Jump again on landing for a higher second and third jump · at a run,
      <b>Space</b> then <b>A</b> for a <b>side flip</b><br />
      Crouch <b>Q</b> — crouch running then jump for a <b>long jump</b>, crouch
      still then jump for a <b>backflip</b><br />
      <b>Space</b> again in the air for a boost, and <b>again</b> to <b>ground
      pound</b> · let go at a run to <b>skid</b><br />
      Mouse lock <b>L</b> · Reset <b>Backspace</b> · Panel <b>F3</b> ·
      Quality <b>1</b> low · <b>2</b> medium · <b>3</b> high<br />
      <span class="hud__build">build 96af06f 11-04 17:11</span>
    `,n.appendChild(s),this.focusNotice=document.createElement("div"),this.focusNotice.className="hud__focus",this.focusNotice.textContent="Click the page to give it keyboard focus",n.appendChild(this.focusNotice)}toggleStats(){this.visible=!this.visible,this.stats.hidden=!this.visible}update(e){const t=e.fps>=50?"hud__fps--good":e.fps>=28?"hud__fps--ok":"hud__fps--poor",n=[["FPS",e.fps.toFixed(0),t],["Quality",e.quality],["Draw calls",String(e.drawCalls)],["Triangles",e.triangles.toLocaleString("en-GB")],["State",e.state],["Speed",`${e.speed.toFixed(1)} m/s`],["Position",`${e.position.x.toFixed(0)}, ${e.position.y.toFixed(0)}, ${e.position.z.toFixed(0)}`],["Gamepad",e.gamepad?"connected":"press a button"],["Mouse",e.pointerLocked?"locked":"free  (L)"],["Input",`${e.moveX.toFixed(2)}, ${e.moveY.toFixed(2)}`],["Cam yaw",`${e.cameraYaw.toFixed(0)}°`],["Last key",e.lastKey==="—"?"none yet":`${e.lastKey}${e.lastKeyRecognised?"":"  (unused)"}`]];this.focusNotice.hidden=document.hasFocus(),this.stats.innerHTML="";for(const[s,r,o]of n){const a=document.createElement("div");a.textContent=`${s.padEnd(11," ")}${r}`,o&&(a.className=o),this.stats.appendChild(a)}}}const Do=document.getElementById("app");if(!Do)throw new Error("Missing #app container");const r0=1/20;class o0{constructor(){z(this,"settings",$m());z(this,"engine");z(this,"hud");z(this,"input",new cg);z(this,"collision",new _g);z(this,"effects");z(this,"world");z(this,"player");z(this,"cameraRig");z(this,"running",!0);z(this,"onGlobalKey",e=>{if(e.code==="F3"&&(e.preventDefault(),this.hud.toggleStats()),e.code==="Backspace"&&(e.preventDefault(),this.player.teleport(this.world.spawn,this.world.spawnFacing),this.cameraRig.reset(this.player)),e.code==="Digit1"||e.code==="Digit2"||e.code==="Digit3"){const t={Digit1:"low",Digit2:"medium",Digit3:"high"}[e.code];this.settings={...this.settings,quality:t},this.engine.applyQuality(t),this.engine.setStudioMode(!0),Jm(this.settings)}});z(this,"frame",()=>{if(!this.running)return;requestAnimationFrame(this.frame);const e=Math.min(r0,this.engine.clock.getDelta());this.input.update(this.settings.cameraSensitivity,this.settings.invertCameraY),this.input.wasPressed("togglePointerLock")&&this.input.togglePointerLock(),this.cameraRig.applyLook(this.input.look.x,this.input.look.y),this.player.update(e,this.input,this.cameraRig.movementYaw),this.cameraRig.update(e,this.player);for(const t of this.world.carryables)t.update(e,this.collision);this.world.water?.update(this.engine.clock.elapsedTime),this.effects.update(e),this.engine.focusShadowsOn(this.player.position),this.engine.render(e),this.hud.update({fps:this.engine.fps,quality:this.settings.quality,drawCalls:this.engine.renderer.info.render.calls,triangles:this.engine.renderer.info.render.triangles,state:this.player.stateName,speed:this.player.speed,position:this.player.position,gamepad:this.input.gamepadConnected,lastKey:this.input.lastKey,lastKeyRecognised:this.input.lastKeyRecognised,pointerLocked:this.input.isPointerLocked,moveX:this.input.move.x,moveY:this.input.move.y,cameraYaw:this.cameraRig.yawDegrees})});this.engine=new ig(Do,this.settings.quality),this.engine.setStudioMode(!0),this.effects=new Og(this.engine.scene),this.world=$g(this.engine.scene,this.collision),this.player=new Ug(this.collision,this.world.spawn,{onLand:(t,n)=>{n>.25&&this.effects.dust(t,n)}},{plain:!0}),this.player.facing=this.world.spawnFacing,this.player.carryables=this.world.carryables,this.engine.scene.add(this.player.object),this.cameraRig=new ag(this.engine.camera,this.collision),this.cameraRig.reset(this.player),this.hud=new s0(Do),this.input.attach(this.engine.renderer.domElement),this.input.setPointerLockWanted(!0),window.addEventListener("keydown",this.onGlobalKey);const e=this.engine.renderer.domElement;e.tabIndex=0,e.style.outline="none",window.focus(),e.focus(),this.engine.clock.start(),requestAnimationFrame(this.frame)}get debug(){return{engine:this.engine,player:this.player,world:this.world,settings:this.settings,rig:this.player.rig,freeze:()=>{this.running=!1},simulateMove:(e,t,n,s)=>{const r={move:{x:n,y:s},look:{x:0,y:0},isDown:()=>!1,wasPressed:()=>!1,wasReleased:()=>!1},o=[],a=this.cameraRig.movementYaw;for(let l=0;l<e;l+=1)this.player.update(t,r,a),o.push({x:Math.round(this.player.position.x*1e3)/1e3,z:Math.round(this.player.position.z*1e3)/1e3,speed:Math.round(this.player.speed*100)/100,state:this.player.stateName});return o},simulateJumpCombo:(e=1/60)=>{let t=!1,n=!1;const s={move:{x:0,y:-1},look:{x:0,y:0},isDown:h=>h==="jump"&&t,wasPressed:h=>h==="jump"&&t&&!n,wasReleased:()=>!1},r=this.cameraRig.movementYaw,o=h=>Math.max(1,Math.round(h/e)),a=()=>this.player.update(e,s,r),l=()=>["idle","walk","run","skid"].includes(this.player.stateName);this.player.teleport(this.world.spawn.clone(),this.world.spawnFacing);for(let h=0;h<o(1);h+=1)a();const c=[];for(let h=0;h<3;h+=1){t=!0,n=!1,a(),n=!0;let u=this.player.position.y;for(let f=0;f<o(.4);f+=1)a(),u=Math.max(u,this.player.position.y);t=!1,n=!1;for(let f=0;f<o(2)&&(a(),u=Math.max(u,this.player.position.y),!l());f+=1);c.push(Math.round(u*100)/100);for(let f=0;f<3;f+=1)a()}return c},simulateTripleJump:(e=1/60,t=.4)=>{let n=!1,s=!1;const r={move:{x:0,y:-1},look:{x:0,y:0},isDown:v=>v==="jump"&&n,wasPressed:v=>v==="jump"&&n&&!s,wasReleased:()=>!1},o=this.cameraRig.movementYaw,a=v=>Math.max(1,Math.round(v/e)),l=()=>this.player.update(e,r,o),c=()=>["idle","walk","run","skid"].includes(this.player.stateName);this.player.teleport(this.world.spawn.clone(),this.world.spawnFacing);for(let v=0;v<a(1);v+=1)l();for(let v=0;v<2;v+=1){n=!0,s=!1,l(),s=!0;for(let R=0;R<a(.4);R+=1)l();n=!1;for(let R=0;R<a(2)&&(l(),!c());R+=1);for(let R=0;R<3;R+=1)l()}const h=new jt;let u=this.player.position.y,f=1/0,m={y:0,progress:0,state:"",frame:0},g=0,S=!1,p=-1,d=0,T=0;n=!0,s=!1,l(),s=!0;const E=()=>{u=Math.max(u,this.player.position.y),c()||(T+=1,p<0&&this.player.somersaultProgress>0&&(p=T*e),d=this.player.somersaultProgress),this.player.object.updateMatrixWorld(!0),h.setFromObject(this.player.object),g+=1,!c()&&h.min.y<f&&(f=h.min.y,m={y:Math.round(this.player.position.y*1e3)/1e3,progress:Math.round(this.player.somersaultProgress*100)/100,state:this.player.stateName,frame:g}),this.player.somersaultProgress>=1&&(S=!0)};for(let v=0;v<a(t);v+=1)l(),E();n=!1;for(let v=0;v<a(3)&&(l(),E(),!c());v+=1);return{stage:this.player.stateName,peak:Math.round(u*100)/100,lowestPart:Math.round(f*1e3)/1e3,lowestAt:m,completedBeforeLanding:S,startedAfter:Math.round(p*1e3)/1e3,airtime:Math.round(T*e*1e3)/1e3,progressAtLanding:Math.round(d*100)/100}},simulateMoveSet:(e=1/60)=>{const t={x:0,y:0},n=new Set,s=new Set,r={move:t,look:{x:0,y:0},isDown:p=>n.has(p),wasPressed:p=>s.has(p),wasReleased:()=>!1},o=this.player,a=()=>{o.update(e,r,0),s.clear()},l=p=>Math.max(1,Math.round(p/e)),c=p=>{n.add(p),s.add(p)},h=(p,d=2)=>Math.round(p*10**d)/10**d,u=(p=0,d=10,T=this.world.spawnFacing)=>{n.clear(),s.clear(),t.x=0,t.y=0,o.teleport(new L(p,0,d),T);for(let E=0;E<l(.4);E+=1)a()},f={},m=new jt,g=(p,d=0)=>{let T=1/0,E="";for(let v=0;v<l(p);v+=1)a(),!(v<l(d))&&(o.object.updateMatrixWorld(!0),m.setFromObject(o.object),m.min.y<T&&(T=m.min.y,E=`${o.stateName} ${h(v*e,2)}s`));return{lowestPart:h(T,3),at:E}};u(),n.add("crouch"),f.crouchFloor=g(.8),u(),t.y=-1;for(let p=0;p<l(4);p+=1)a();t.y=0,f.brakeFloor=g(.35),t.y=-1;for(let p=0;p<l(4);p+=1)a();t.y=0,f.brakeSettled=g(.35,.22);const S=()=>{u(),t.y=-1;for(let T=0;T<l(1.2);T+=1)a();const p=o.position.clone();c("jump"),a();let d=o.position.y;for(let T=0;T<l(2.5)&&(a(),d=Math.max(d,o.position.y),!(o.stateName!=="jump"&&o.position.y<=.01&&T>4));T+=1);return n.delete("jump"),{distance:h(Math.hypot(o.position.x-p.x,o.position.z-p.z)),peak:h(d)}};f.runningJump=S();{u(),t.y=-1;for(let R=0;R<l(1.2);R+=1)a();const p=h(o.speed);n.add("crouch"),a();const d=o.stateName,T=o.position.clone();c("jump"),a();const E=o.stateName;let v=o.position.y;for(let R=0;R<l(2.5)&&(a(),v=Math.max(v,o.position.y),!(o.position.y<=.01&&R>4));R+=1);f.longJump={crouchState:d,state:E,speedBefore:p,distance:h(Math.hypot(o.position.x-T.x,o.position.z-T.z)),peak:h(v)}}{u(),n.add("crouch");for(let I=0;I<l(.4);I+=1)a();const p=o.stateName,d=o.position.clone(),T=o.facing;c("jump"),a();const E=o.stateName;let v=o.position.y,R=0,A=1/0;const C=new jt;for(let I=0;I<l(2.5)&&(a(),v=Math.max(v,o.position.y),R=Math.max(R,o.somersaultProgress),o.position.y>.05&&(o.object.updateMatrixWorld(!0),C.setFromObject(o.object),A=Math.min(A,C.min.y)),!(o.position.y<=.01&&I>4));I+=1);const F=o.position.x-d.x,b=o.position.z-d.z,y=-(F*Math.sin(T)+b*Math.cos(T));f.backflip={crouchState:p,state:E,peak:h(v),backwards:h(y),turned:h(R),lowestPart:h(A,3)}}{u(-14,-6,Math.PI/2),t.x=1;for(let A=0;A<l(.5);A+=1)a();c("jump"),a();let p=!1,d=0,T=0,E=!1,v=0;const R=[];for(let A=0;A<l(2.5);A+=1){a();const C=o.stateName;if(R[R.length-1]!==C&&R.push(C),!E&&C==="wall-slide"){p=!0,d=o.position.y,T=o.position.x,c("jump"),E=!0,v=o.position.y;continue}if(E&&(v=Math.max(v,o.position.y)),E&&o.position.y<=.01)break}f.wallKick={touchedWall:p,kicked:E,states:R,gained:h(v-d),movedAway:h(Math.abs(o.position.x-T))}}{u(),t.y=-1;for(let v=0;v<l(4);v+=1)a();const p=h(o.speed),d=o.position.clone();t.y=0;const T=[];let E=0;for(let v=0;v<l(2);v+=1){a();const R=o.stateName;if(T[T.length-1]!==R&&T.push(R),E=v*e,o.speed<.05)break}f.brake={speedBefore:p,states:T,slideDistance:h(Math.hypot(o.position.x-d.x,o.position.z-d.z)),seconds:h(E)}}return u(),f},measureBraking:(e=1/60)=>{const t={x:0,y:0},n={move:t,look:{x:0,y:0},isDown:()=>!1,wasPressed:()=>!1,wasReleased:()=>!1},s=this.player,r=()=>s.update(e,n,0),o=l=>Math.max(1,Math.round(l/e)),a=(l,c=2)=>Math.round(l*10**c)/10**c;return[.5,1,2,3,5].map(l=>{t.x=0,t.y=0,s.teleport(new L(0,0,34),Math.PI);for(let f=0;f<o(.6);f+=1)r();t.y=-1;for(let f=0;f<o(l);f+=1)r();const c=a(s.speed),h=s.position.clone();t.y=0;let u=!1;for(let f=0;f<o(3)&&(r(),s.stateName==="brake"&&(u=!0),!(s.speed<.05));f+=1);return{ran:l,speed:c,slide:a(Math.hypot(s.position.x-h.x,s.position.z-h.z)),skidded:u}})},simulateLedges:(e=1/60)=>{const t={x:0,y:0},n=new Set,s=new Set,r={move:t,look:{x:0,y:0},isDown:E=>n.has(E),wasPressed:E=>s.has(E),wasReleased:()=>!1},o=this.player,a=()=>{o.update(e,r,0),s.clear()},l=E=>Math.max(1,Math.round(E/e)),c=(E,v=2)=>Math.round(E*10**v)/10**v,h=E=>{n.add(E),s.add(E)},u=(E,v,R,A)=>{n.clear(),s.clear(),t.x=0,t.y=0,o.teleport(new L(E,v,R),A)},f=(E,v)=>{const R=[],A=()=>{const y=o.stateName;R[R.length-1]!==y&&R.push(y)};let C=-1;for(let y=0;y<l(E);y+=1)if(a(),A(),o.stateName==="hanging"){C=y;break}if(C<0)return{hung:!1,heldFor:0,states:R,landedAt:c(o.position.y)};const F=o.position.y;for(let y=0;y<l(.5);y+=1)a();const b=o.stateName==="hanging"&&Math.abs(o.position.y-F)<.01;h("jump");for(let y=0;y<l(.2);y+=1)a();n.delete("jump");for(let y=0;y<l(v);y+=1)a(),A();return{hung:!0,stayed:b,states:R,hangLift:c(o.ledgeDiagnostics.lip),landedAt:c(o.position.y),landedAhead:c(o.position.x)}},m={};u(-12.7,5.9,-6,Math.PI/2),m.wallTop=f(1,2),u(15,1.5,8.6,0),m.platform=f(1,2.4),u(3.3,1.3,2,Math.PI/2),m.thinWall=f(1,2.4),u(15,0,6.2,0);for(let E=0;E<l(.4);E+=1)a();t.y=1;for(let E=0;E<l(.5);E+=1)a();h("jump");for(let E=0;E<l(.32);E+=1)a();n.delete("jump"),t.y=0,m.platformJumped=f(1.6,2),u(-14,0,-6,Math.PI/2);for(let E=0;E<l(.4);E+=1)a();t.x=1;for(let E=0;E<l(.4);E+=1)a();h("jump");for(let E=0;E<l(.3);E+=1)a();n.delete("jump");const g=[];let S=0,p=0,d=!1;for(let E=0;E<l(6);E+=1){a();const v=o.stateName;if(g[g.length-1]!==v&&g.push(v),v==="hanging"){d=!0;break}p>0?(p-=1,p===0&&n.delete("jump")):v==="wall-slide"&&(h("jump"),p=l(.3),S+=1,t.x=-t.x)}t.x=0,t.y=0;let T={landedAt:c(o.position.y)};if(d){h("jump");for(let E=0;E<l(.2);E+=1)a();n.delete("jump");for(let E=0;E<l(1.6);E+=1){a();const v=o.stateName;g[g.length-1]!==v&&g.push(v)}T={landedAt:c(o.position.y)}}m.wallTopByKicking={kicks:S,reached:d,states:g,...T},u(0,0,10,this.world.spawnFacing);for(let E=0;E<l(.4);E+=1)a();return m},simulateExtras:(e=1/60)=>{const t={x:0,y:0},n=t,s=new Set,r=new Set,o={move:t,look:{x:0,y:0},isDown:D=>s.has(D),wasPressed:D=>r.has(D),wasReleased:()=>!1},a=this.player,l=()=>{a.update(e,o,0),r.clear()},c=D=>Math.max(1,Math.round(D/e)),h=(D,k=2)=>Math.round(D*10**k)/10**k,u=D=>{s.add(D),r.add(D)},f=(D,k,X,q)=>{s.clear(),r.clear(),t.x=0,t.y=0,a.teleport(new L(D,k,X),q);for(let Y=0;Y<c(.3);Y+=1)l()},m=(D,k)=>{const X=[];for(let q=0;q<c(D);q+=1){l();const Y=a.stateName;if(X[X.length-1]!==Y&&X.push(Y),k?.(Y))break}return X},g={},S=(D,k,X)=>{f(0,0,30,Math.PI),n.y=-X;for(let oe=0;oe<c(1.2);oe+=1)l();const q=h(a.speed);let Y=a.position.y,Z=!1;const W=oe=>{for(let de=0;de<oe;de+=1)l(),Y=Math.max(Y,a.position.y),a.stateName==="side-flip"&&(Z=!0)};return k?(u("sideFlip"),W(c(D)),s.delete("sideFlip"),u("jump")):(u("jump"),W(c(D)),u("sideFlip")),W(c(.4)),s.clear(),W(c(2)),{runningAt:q,flipped:Z,peak:h(Y)}};g.sideFlipJumpThenFlip=S(.12,!1,1),g.sideFlipFlipThenJump=S(.12,!0,1),g.sideFlipLateButInside=S(.26,!1,1),g.sideFlipTooLate=S(.55,!1,1),g.sideFlipFromAWalk=S(.12,!1,.4),f(0,0,30,Math.PI),u("jump");for(let D=0;D<c(.3);D+=1)l();s.delete("jump");for(let D=0;D<c(.18);D+=1)l();const p=h(a.position.y);u("jump");for(let D=0;D<c(.12);D+=1)l();s.delete("jump");let d=a.position.y;for(let D=0;D<c(.3);D+=1)l(),d=Math.max(d,a.position.y);u("jump"),l(),s.delete("jump"),g.groundPound={beforeBoost:p,boostPeak:h(d),states:m(2.5,D=>D==="idle")},f(0,0,30,Math.PI),u("jump");for(let D=0;D<c(.3);D+=1)l();s.delete("jump");for(let D=0;D<c(.18);D+=1)l();u("jump"),l(),s.delete("jump"),g.oneExtraPress={states:m(2.5,D=>D==="idle")},f(12.6,0,-6,Math.PI/2),t.x=1;const T=m(.8,D=>D==="climb"),E=a.stateName==="climb",v=h(a.position.y);a.position.y;const R=[];let A=0;for(let D=0;D<c(3);D+=1){const k=a.position.y,X=a.stateName==="climb";l();const q=a.stateName;R[R.length-1]!==q&&R.push(q),X&&q!=="climb"&&(A=Math.max(A,k-a.position.y))}g.ladder={caught:E,from:v,to:h(a.position.y),states:[...T,...R],why:a.ledgeDiagnostics.reason,lip:a.ledgeDiagnostics.lip,dropAtTop:h(A,3)},f(-22,0,36,Math.PI),t.x=0,t.y=-1;const C=m(2.5,D=>D.startsWith("swim")),F=h(a.position.y);t.x=0,t.y=1;for(let D=0;D<c(2.2);D+=1)l();const b=[];let y=!1;for(let D=0;D<6&&!y;D+=1){u("jump");for(let k=0;k<c(.4);k+=1){l();const X=a.stateName;b[b.length-1]!==X&&b.push(X)}if(s.delete("jump"),a.stateName==="hanging"){u("jump");for(let k=0;k<c(.2);k+=1)l();s.delete("jump");for(let k=0;k<c(1.4);k+=1){l();const X=a.stateName;b[b.length-1]!==X&&b.push(X)}y=a.position.y>-.1}}g.pool={swam:C.some(D=>D.startsWith("swim")),states:C,depth:F,gotOut:y,outStates:b,endedAt:h(a.position.y)},f(3,0,16.4,Math.PI),t.x=0,t.y=-.4;for(let D=0;D<c(.55);D+=1)l();t.y=0;for(let D=0;D<c(.3);D+=1)l();const I=a.findCarryTarget();u("grab"),l(),s.delete("grab");for(let D=0;D<c(.5);D+=1)l();return g.crate={inReach:I!==null,carrying:a.carried!==null},f(0,0,10,this.world.spawnFacing),g},probe:(e,t,n,s=8)=>{const r=this.collision.groundProbe(new L(e,t,n),s);return r?{y:Math.round(r.y*1e3)/1e3,normalY:Math.round(r.normal.y*100)/100}:null},renderFrom:(e,t,n,s)=>{const r=this.engine.camera,o=this.player.position;r.position.set(o.x+e,o.y+t,o.z+n),r.lookAt(o.x,o.y+s,o.z),r.updateMatrixWorld(),this.engine.focusShadowsOn(o),this.engine.render(1/60)}}}}const a0=new o0;window.__letsgo=a0;
