var Ic=Object.defineProperty;var Uc=(i,e,t)=>e in i?Ic(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var k=(i,e,t)=>Uc(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ko="180",Nc=0,pa=1,Fc=2,Nl=1,Fl=2,yn=3,Gn=0,Ft=1,rn=2,wn=0,ri=1,qr=2,ma=3,ga=4,Oc=5,ti=100,Bc=101,kc=102,zc=103,Hc=104,Vc=200,Gc=201,Wc=202,Xc=203,jr=204,Yr=205,qc=206,jc=207,Yc=208,Kc=209,Jc=210,$c=211,Zc=212,Qc=213,eh=214,Kr=0,Jr=1,$r=2,Ri=3,Zr=4,Qr=5,eo=6,to=7,Ol=0,th=1,nh=2,Vn=0,Bl=1,kl=2,zl=3,zo=4,Hl=5,Vl=6,Gl=7,Wl=300,Ci=301,Pi=302,no=303,io=304,tr=306,so=1e3,ii=1001,ro=1002,an=1003,ih=1004,ps=1005,Qt=1006,rr=1007,si=1008,fn=1009,Xl=1010,ql=1011,ts=1012,Ho=1013,oi=1014,En=1015,An=1016,Vo=1017,Go=1018,ns=1020,jl=35902,Yl=35899,Kl=1021,Jl=1022,on=1023,is=1026,ss=1027,$l=1028,Wo=1029,Zl=1030,Xo=1031,qo=1033,Xs=33776,qs=33777,js=33778,Ys=33779,oo=35840,ao=35841,lo=35842,co=35843,ho=36196,uo=37492,fo=37496,po=37808,mo=37809,go=37810,_o=37811,vo=37812,xo=37813,Mo=37814,So=37815,yo=37816,bo=37817,Eo=37818,To=37819,wo=37820,Ao=37821,Ro=36492,Co=36494,Po=36495,Lo=36283,Do=36284,Io=36285,Uo=36286,sh=3200,rh=3201,Ql=0,oh=1,zn="",zt="srgb",Li="srgb-linear",$s="linear",tt="srgb",li=7680,_a=519,ah=512,lh=513,ch=514,ec=515,hh=516,uh=517,dh=518,fh=519,va=35044,xa="300 es",dn=2e3,Zs=2001;class Ui{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ma=1234567;const $i=Math.PI/180,rs=180/Math.PI;function Ni(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pt[i&255]+Pt[i>>8&255]+Pt[i>>16&255]+Pt[i>>24&255]+"-"+Pt[e&255]+Pt[e>>8&255]+"-"+Pt[e>>16&15|64]+Pt[e>>24&255]+"-"+Pt[t&63|128]+Pt[t>>8&255]+"-"+Pt[t>>16&255]+Pt[t>>24&255]+Pt[n&255]+Pt[n>>8&255]+Pt[n>>16&255]+Pt[n>>24&255]).toLowerCase()}function Be(i,e,t){return Math.max(e,Math.min(t,i))}function jo(i,e){return(i%e+e)%e}function ph(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function mh(i,e,t){return i!==e?(t-i)/(e-i):0}function Zi(i,e,t){return(1-t)*i+t*e}function gh(i,e,t,n){return Zi(i,e,1-Math.exp(-t*n))}function _h(i,e=1){return e-Math.abs(jo(i,e*2)-e)}function vh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function xh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Mh(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Sh(i,e){return i+Math.random()*(e-i)}function yh(i){return i*(.5-Math.random())}function bh(i){i!==void 0&&(Ma=i);let e=Ma+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Eh(i){return i*$i}function Th(i){return i*rs}function wh(i){return(i&i-1)===0&&i!==0}function Ah(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Rh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ch(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),f=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,l*u,l*f,a*c);break;case"YZY":i.set(l*f,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*f,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*p,a*c);break;case"YXY":i.set(l*p,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ti(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ut(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ne={DEG2RAD:$i,RAD2DEG:rs,generateUUID:Ni,clamp:Be,euclideanModulo:jo,mapLinear:ph,inverseLerp:mh,lerp:Zi,damp:gh,pingpong:_h,smoothstep:vh,smootherstep:xh,randInt:Mh,randFloat:Sh,randFloatSpread:yh,seededRandom:bh,degToRad:Eh,radToDeg:Th,isPowerOfTwo:wh,ceilPowerOfTwo:Ah,floorPowerOfTwo:Rh,setQuaternionFromProperEuler:Ch,normalize:Ut,denormalize:Ti};class Te{constructor(e=0,t=0){Te.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Be(this.x,e.x,t.x),this.y=Be(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Be(this.x,e,t),this.y=Be(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Be(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Be(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ls{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],p=r[o+1],g=r[o+2],M=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=M;return}if(u!==M||l!==f||c!==p||h!==g){let m=1-a;const d=l*f+c*p+h*g+u*M,T=d>=0?1:-1,E=1-d*d;if(E>Number.EPSILON){const A=Math.sqrt(E),w=Math.atan2(A,d*T);m=Math.sin(m*w)/A,a=Math.sin(a*w)/A}const v=a*T;if(l=l*m+f*v,c=c*m+p*v,h=h*m+g*v,u=u*m+M*v,m===1-a){const A=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=A,c*=A,h*=A,u*=A}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*p-c*f,e[t+1]=l*g+h*f+c*u-a*p,e[t+2]=c*g+h*p+a*f-l*u,e[t+3]=h*g-a*u-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),f=l(n/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"YZX":this._x=f*h*u+c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u-f*p*g;break;case"XZY":this._x=f*h*u-c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Be(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,f=Math.sin(t*h)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Sa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Sa.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Be(this.x,e.x,t.x),this.y=Be(this.y,e.y,t.y),this.z=Be(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Be(this.x,e,t),this.y=Be(this.y,e,t),this.z=Be(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Be(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return or.copy(this).projectOnVector(e),this.sub(or)}reflect(e){return this.sub(or.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Be(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const or=new P,Sa=new ls;class Ge{constructor(e,t,n,s,r,o,a,l,c){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],p=n[5],g=n[8],M=s[0],m=s[3],d=s[6],T=s[1],E=s[4],v=s[7],A=s[2],w=s[5],C=s[8];return r[0]=o*M+a*T+l*A,r[3]=o*m+a*E+l*w,r[6]=o*d+a*v+l*C,r[1]=c*M+h*T+u*A,r[4]=c*m+h*E+u*w,r[7]=c*d+h*v+u*C,r[2]=f*M+p*T+g*A,r[5]=f*m+p*E+g*w,r[8]=f*d+p*v+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,f=a*l-h*r,p=c*r-o*l,g=t*u+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return e[0]=u*M,e[1]=(s*c-h*n)*M,e[2]=(a*n-s*o)*M,e[3]=f*M,e[4]=(h*t-s*l)*M,e[5]=(s*r-a*t)*M,e[6]=p*M,e[7]=(n*l-c*t)*M,e[8]=(o*t-n*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ar.makeScale(e,t)),this}rotate(e){return this.premultiply(ar.makeRotation(-e)),this}translate(e,t){return this.premultiply(ar.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ar=new Ge;function tc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Qs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ph(){const i=Qs("canvas");return i.style.display="block",i}const ya={};function os(i){i in ya||(ya[i]=!0,console.warn(i))}function Lh(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const ba=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ea=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Dh(){const i={enabled:!0,workingColorSpace:Li,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===tt&&(s.r=Rn(s.r),s.g=Rn(s.g),s.b=Rn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===tt&&(s.r=Ai(s.r),s.g=Ai(s.g),s.b=Ai(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===zn?$s:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return os("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return os("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Li]:{primaries:e,whitePoint:n,transfer:$s,toXYZ:ba,fromXYZ:Ea,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:zt},outputColorSpaceConfig:{drawingBufferColorSpace:zt}},[zt]:{primaries:e,whitePoint:n,transfer:tt,toXYZ:ba,fromXYZ:Ea,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:zt}}}),i}const Je=Dh();function Rn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ai(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ci;class Ih{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ci===void 0&&(ci=Qs("canvas")),ci.width=e.width,ci.height=e.height;const s=ci.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ci}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Qs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Rn(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Rn(t[n]/255)*255):t[n]=Rn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Uh=0;class Yo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=Ni(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(lr(s[o].image)):r.push(lr(s[o]))}else r=lr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function lr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ih.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Nh=0;const cr=new P;class Ot extends Ui{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,n=ii,s=ii,r=Qt,o=si,a=on,l=fn,c=Ot.DEFAULT_ANISOTROPY,h=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=Ni(),this.name="",this.source=new Yo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Te(0,0),this.repeat=new Te(1,1),this.center=new Te(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(cr).x}get height(){return this.source.getSize(cr).y}get depth(){return this.source.getSize(cr).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Wl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case so:e.x=e.x-Math.floor(e.x);break;case ii:e.x=e.x<0?0:1;break;case ro:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case so:e.y=e.y-Math.floor(e.y);break;case ii:e.y=e.y<0?0:1;break;case ro:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=Wl;Ot.DEFAULT_ANISOTROPY=1;class dt{constructor(e=0,t=0,n=0,s=1){dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],f=l[1],p=l[5],g=l[9],M=l[2],m=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-M)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+M)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,v=(p+1)/2,A=(d+1)/2,w=(h+f)/4,C=(u+M)/4,N=(g+m)/4;return E>v&&E>A?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=w/n,r=C/n):v>A?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=w/s,r=N/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=C/r,s=N/r),this.set(n,s,r,t),this}let T=Math.sqrt((m-g)*(m-g)+(u-M)*(u-M)+(f-h)*(f-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-M)/T,this.z=(f-h)/T,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Be(this.x,e.x,t.x),this.y=Be(this.y,e.y,t.y),this.z=Be(this.z,e.z,t.z),this.w=Be(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Be(this.x,e,t),this.y=Be(this.y,e,t),this.z=Be(this.z,e,t),this.w=Be(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Be(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Fh extends Ui{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new Ot(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Yo(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ln extends Fh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class nc extends Ot{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Oh extends Ot{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ht{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(en.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(en.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=en.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,en):en.fromBufferAttribute(r,o),en.applyMatrix4(e.matrixWorld),this.expandByPoint(en);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ms.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ms.copy(n.boundingBox)),ms.applyMatrix4(e.matrixWorld),this.union(ms)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,en),en.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zi),gs.subVectors(this.max,zi),hi.subVectors(e.a,zi),ui.subVectors(e.b,zi),di.subVectors(e.c,zi),Pn.subVectors(ui,hi),Ln.subVectors(di,ui),qn.subVectors(hi,di);let t=[0,-Pn.z,Pn.y,0,-Ln.z,Ln.y,0,-qn.z,qn.y,Pn.z,0,-Pn.x,Ln.z,0,-Ln.x,qn.z,0,-qn.x,-Pn.y,Pn.x,0,-Ln.y,Ln.x,0,-qn.y,qn.x,0];return!hr(t,hi,ui,di,gs)||(t=[1,0,0,0,1,0,0,0,1],!hr(t,hi,ui,di,gs))?!1:(_s.crossVectors(Pn,Ln),t=[_s.x,_s.y,_s.z],hr(t,hi,ui,di,gs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,en).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(en).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const gn=[new P,new P,new P,new P,new P,new P,new P,new P],en=new P,ms=new Ht,hi=new P,ui=new P,di=new P,Pn=new P,Ln=new P,qn=new P,zi=new P,gs=new P,_s=new P,jn=new P;function hr(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){jn.fromArray(i,r);const a=s.x*Math.abs(jn.x)+s.y*Math.abs(jn.y)+s.z*Math.abs(jn.z),l=e.dot(jn),c=t.dot(jn),h=n.dot(jn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Bh=new Ht,Hi=new P,ur=new P;class cs{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Bh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Hi.subVectors(e,this.center);const t=Hi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Hi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ur.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Hi.copy(e.center).add(ur)),this.expandByPoint(Hi.copy(e.center).sub(ur))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const _n=new P,dr=new P,vs=new P,Dn=new P,fr=new P,xs=new P,pr=new P;class Ko{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=_n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_n.copy(this.origin).addScaledVector(this.direction,t),_n.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){dr.copy(e).add(t).multiplyScalar(.5),vs.copy(t).sub(e).normalize(),Dn.copy(this.origin).sub(dr);const r=e.distanceTo(t)*.5,o=-this.direction.dot(vs),a=Dn.dot(this.direction),l=-Dn.dot(vs),c=Dn.lengthSq(),h=Math.abs(1-o*o);let u,f,p,g;if(h>0)if(u=o*l-a,f=o*a-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const M=1/h;u*=M,f*=M,p=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(dr).addScaledVector(vs,f),p}intersectSphere(e,t){_n.subVectors(e.center,this.origin);const n=_n.dot(this.direction),s=_n.dot(_n)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,_n)!==null}intersectTriangle(e,t,n,s,r){fr.subVectors(t,e),xs.subVectors(n,e),pr.crossVectors(fr,xs);let o=this.direction.dot(pr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Dn.subVectors(this.origin,e);const l=a*this.direction.dot(xs.crossVectors(Dn,xs));if(l<0)return null;const c=a*this.direction.dot(fr.cross(Dn));if(c<0||l+c>o)return null;const h=-a*Dn.dot(pr);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ft{constructor(e,t,n,s,r,o,a,l,c,h,u,f,p,g,M,m){ft.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,h,u,f,p,g,M,m)}set(e,t,n,s,r,o,a,l,c,h,u,f,p,g,M,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=M,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ft().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/fi.setFromMatrixColumn(e,0).length(),r=1/fi.setFromMatrixColumn(e,1).length(),o=1/fi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=o*h,p=o*u,g=a*h,M=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=p+g*c,t[5]=f-M*c,t[9]=-a*l,t[2]=M-f*c,t[6]=g+p*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*h,p=l*u,g=c*h,M=c*u;t[0]=f+M*a,t[4]=g*a-p,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=M+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*h,p=l*u,g=c*h,M=c*u;t[0]=f-M*a,t[4]=-o*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=M-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*h,p=o*u,g=a*h,M=a*u;t[0]=l*h,t[4]=g*c-p,t[8]=f*c+M,t[1]=l*u,t[5]=M*c+f,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,g=a*l,M=a*c;t[0]=l*h,t[4]=M-f*u,t[8]=g*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=p*u+g,t[10]=f-M*u}else if(e.order==="XZY"){const f=o*l,p=o*c,g=a*l,M=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=f*u+M,t[5]=o*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*h,t[10]=M*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kh,e,zh)}lookAt(e,t,n){const s=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),In.crossVectors(n,Xt),In.lengthSq()===0&&(Math.abs(n.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),In.crossVectors(n,Xt)),In.normalize(),Ms.crossVectors(Xt,In),s[0]=In.x,s[4]=Ms.x,s[8]=Xt.x,s[1]=In.y,s[5]=Ms.y,s[9]=Xt.y,s[2]=In.z,s[6]=Ms.z,s[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],p=n[13],g=n[2],M=n[6],m=n[10],d=n[14],T=n[3],E=n[7],v=n[11],A=n[15],w=s[0],C=s[4],N=s[8],y=s[12],b=s[1],U=s[5],D=s[9],H=s[13],j=s[2],L=s[6],V=s[10],Z=s[14],q=s[3],re=s[7],ce=s[11],ye=s[15];return r[0]=o*w+a*b+l*j+c*q,r[4]=o*C+a*U+l*L+c*re,r[8]=o*N+a*D+l*V+c*ce,r[12]=o*y+a*H+l*Z+c*ye,r[1]=h*w+u*b+f*j+p*q,r[5]=h*C+u*U+f*L+p*re,r[9]=h*N+u*D+f*V+p*ce,r[13]=h*y+u*H+f*Z+p*ye,r[2]=g*w+M*b+m*j+d*q,r[6]=g*C+M*U+m*L+d*re,r[10]=g*N+M*D+m*V+d*ce,r[14]=g*y+M*H+m*Z+d*ye,r[3]=T*w+E*b+v*j+A*q,r[7]=T*C+E*U+v*L+A*re,r[11]=T*N+E*D+v*V+A*ce,r[15]=T*y+E*H+v*Z+A*ye,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],f=e[10],p=e[14],g=e[3],M=e[7],m=e[11],d=e[15];return g*(+r*l*u-s*c*u-r*a*f+n*c*f+s*a*p-n*l*p)+M*(+t*l*p-t*c*f+r*o*f-s*o*p+s*c*h-r*l*h)+m*(+t*c*u-t*a*p-r*o*u+n*o*p+r*a*h-n*c*h)+d*(-s*a*h-t*l*u+t*a*f+s*o*u-n*o*f+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],f=e[10],p=e[11],g=e[12],M=e[13],m=e[14],d=e[15],T=u*m*c-M*f*c+M*l*p-a*m*p-u*l*d+a*f*d,E=g*f*c-h*m*c-g*l*p+o*m*p+h*l*d-o*f*d,v=h*M*c-g*u*c+g*a*p-o*M*p-h*a*d+o*u*d,A=g*u*l-h*M*l-g*a*f+o*M*f+h*a*m-o*u*m,w=t*T+n*E+s*v+r*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/w;return e[0]=T*C,e[1]=(M*f*r-u*m*r-M*s*p+n*m*p+u*s*d-n*f*d)*C,e[2]=(a*m*r-M*l*r+M*s*c-n*m*c-a*s*d+n*l*d)*C,e[3]=(u*l*r-a*f*r-u*s*c+n*f*c+a*s*p-n*l*p)*C,e[4]=E*C,e[5]=(h*m*r-g*f*r+g*s*p-t*m*p-h*s*d+t*f*d)*C,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*d-t*l*d)*C,e[7]=(o*f*r-h*l*r+h*s*c-t*f*c-o*s*p+t*l*p)*C,e[8]=v*C,e[9]=(g*u*r-h*M*r-g*n*p+t*M*p+h*n*d-t*u*d)*C,e[10]=(o*M*r-g*a*r+g*n*c-t*M*c-o*n*d+t*a*d)*C,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*p-t*a*p)*C,e[12]=A*C,e[13]=(h*M*s-g*u*s+g*n*f-t*M*f-h*n*m+t*u*m)*C,e[14]=(g*a*s-o*M*s-g*n*l+t*M*l+o*n*m-t*a*m)*C,e[15]=(o*u*s-h*a*s+h*n*l-t*u*l-o*n*f+t*a*f)*C,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,f=r*c,p=r*h,g=r*u,M=o*h,m=o*u,d=a*u,T=l*c,E=l*h,v=l*u,A=n.x,w=n.y,C=n.z;return s[0]=(1-(M+d))*A,s[1]=(p+v)*A,s[2]=(g-E)*A,s[3]=0,s[4]=(p-v)*w,s[5]=(1-(f+d))*w,s[6]=(m+T)*w,s[7]=0,s[8]=(g+E)*C,s[9]=(m-T)*C,s[10]=(1-(f+M))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=fi.set(s[0],s[1],s[2]).length();const o=fi.set(s[4],s[5],s[6]).length(),a=fi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],tn.copy(this);const c=1/r,h=1/o,u=1/a;return tn.elements[0]*=c,tn.elements[1]*=c,tn.elements[2]*=c,tn.elements[4]*=h,tn.elements[5]*=h,tn.elements[6]*=h,tn.elements[8]*=u,tn.elements[9]*=u,tn.elements[10]*=u,t.setFromRotationMatrix(tn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=dn,l=!1){const c=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),p=(n+s)/(n-s);let g,M;if(l)g=r/(o-r),M=o*r/(o-r);else if(a===dn)g=-(o+r)/(o-r),M=-2*o*r/(o-r);else if(a===Zs)g=-o/(o-r),M=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=dn,l=!1){const c=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),p=-(n+s)/(n-s);let g,M;if(l)g=1/(o-r),M=o/(o-r);else if(a===dn)g=-2/(o-r),M=-(o+r)/(o-r);else if(a===Zs)g=-1/(o-r),M=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const fi=new P,tn=new ft,kh=new P(0,0,0),zh=new P(1,1,1),In=new P,Ms=new P,Xt=new P,Ta=new ft,wa=new ls;class pn{constructor(e=0,t=0,n=0,s=pn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Be(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Be(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Be(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ta.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ta,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return wa.setFromEuler(this),this.setFromQuaternion(wa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pn.DEFAULT_ORDER="XYZ";class Jo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Hh=0;const Aa=new P,pi=new ls,vn=new ft,Ss=new P,Vi=new P,Vh=new P,Gh=new ls,Ra=new P(1,0,0),Ca=new P(0,1,0),Pa=new P(0,0,1),La={type:"added"},Wh={type:"removed"},mi={type:"childadded",child:null},mr={type:"childremoved",child:null};class Mt extends Ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hh++}),this.uuid=Ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mt.DEFAULT_UP.clone();const e=new P,t=new pn,n=new ls,s=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ft},normalMatrix:{value:new Ge}}),this.matrix=new ft,this.matrixWorld=new ft,this.matrixAutoUpdate=Mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Jo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return pi.setFromAxisAngle(e,t),this.quaternion.multiply(pi),this}rotateOnWorldAxis(e,t){return pi.setFromAxisAngle(e,t),this.quaternion.premultiply(pi),this}rotateX(e){return this.rotateOnAxis(Ra,e)}rotateY(e){return this.rotateOnAxis(Ca,e)}rotateZ(e){return this.rotateOnAxis(Pa,e)}translateOnAxis(e,t){return Aa.copy(e).applyQuaternion(this.quaternion),this.position.add(Aa.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ra,e)}translateY(e){return this.translateOnAxis(Ca,e)}translateZ(e){return this.translateOnAxis(Pa,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ss.copy(e):Ss.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Vi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(Vi,Ss,this.up):vn.lookAt(Ss,Vi,this.up),this.quaternion.setFromRotationMatrix(vn),s&&(vn.extractRotation(s.matrixWorld),pi.setFromRotationMatrix(vn),this.quaternion.premultiply(pi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(La),mi.child=e,this.dispatchEvent(mi),mi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wh),mr.child=e,this.dispatchEvent(mr),mr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(La),mi.child=e,this.dispatchEvent(mi),mi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vi,e,Vh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vi,Gh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Mt.DEFAULT_UP=new P(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const nn=new P,xn=new P,gr=new P,Mn=new P,gi=new P,_i=new P,Da=new P,_r=new P,vr=new P,xr=new P,Mr=new dt,Sr=new dt,yr=new dt;class Zt{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),nn.subVectors(e,t),s.cross(nn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){nn.subVectors(s,t),xn.subVectors(n,t),gr.subVectors(e,t);const o=nn.dot(nn),a=nn.dot(xn),l=nn.dot(gr),c=xn.dot(xn),h=xn.dot(gr),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,p=(c*l-a*h)*f,g=(o*h-a*l)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Mn)===null?!1:Mn.x>=0&&Mn.y>=0&&Mn.x+Mn.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Mn.x),l.addScaledVector(o,Mn.y),l.addScaledVector(a,Mn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return Mr.setScalar(0),Sr.setScalar(0),yr.setScalar(0),Mr.fromBufferAttribute(e,t),Sr.fromBufferAttribute(e,n),yr.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Mr,r.x),o.addScaledVector(Sr,r.y),o.addScaledVector(yr,r.z),o}static isFrontFacing(e,t,n,s){return nn.subVectors(n,t),xn.subVectors(e,t),nn.cross(xn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return nn.subVectors(this.c,this.b),xn.subVectors(this.a,this.b),nn.cross(xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Zt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Zt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Zt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Zt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Zt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;gi.subVectors(s,n),_i.subVectors(r,n),_r.subVectors(e,n);const l=gi.dot(_r),c=_i.dot(_r);if(l<=0&&c<=0)return t.copy(n);vr.subVectors(e,s);const h=gi.dot(vr),u=_i.dot(vr);if(h>=0&&u<=h)return t.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(gi,o);xr.subVectors(e,r);const p=gi.dot(xr),g=_i.dot(xr);if(g>=0&&p<=g)return t.copy(r);const M=p*c-l*g;if(M<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(_i,a);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Da.subVectors(r,s),a=(u-h)/(u-h+(p-g)),t.copy(s).addScaledVector(Da,a);const d=1/(m+M+f);return o=M*d,a=f*d,t.copy(n).addScaledVector(gi,o).addScaledVector(_i,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ic={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Un={h:0,s:0,l:0},ys={h:0,s:0,l:0};function br(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class pe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Je.workingColorSpace){return this.r=e,this.g=t,this.b=n,Je.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Je.workingColorSpace){if(e=jo(e,1),t=Be(t,0,1),n=Be(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=br(o,r,e+1/3),this.g=br(o,r,e),this.b=br(o,r,e-1/3)}return Je.colorSpaceToWorking(this,s),this}setStyle(e,t=zt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){const n=ic[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Rn(e.r),this.g=Rn(e.g),this.b=Rn(e.b),this}copyLinearToSRGB(e){return this.r=Ai(e.r),this.g=Ai(e.g),this.b=Ai(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return Je.workingToColorSpace(Lt.copy(this),e),Math.round(Be(Lt.r*255,0,255))*65536+Math.round(Be(Lt.g*255,0,255))*256+Math.round(Be(Lt.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.workingToColorSpace(Lt.copy(this),t);const n=Lt.r,s=Lt.g,r=Lt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Je.workingColorSpace){return Je.workingToColorSpace(Lt.copy(this),t),e.r=Lt.r,e.g=Lt.g,e.b=Lt.b,e}getStyle(e=zt){Je.workingToColorSpace(Lt.copy(this),e);const t=Lt.r,n=Lt.g,s=Lt.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Un),this.setHSL(Un.h+e,Un.s+t,Un.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Un),e.getHSL(ys);const n=Zi(Un.h,ys.h,t),s=Zi(Un.s,ys.s,t),r=Zi(Un.l,ys.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Lt=new pe;pe.NAMES=ic;let Xh=0;class Fi extends Ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=Ni(),this.name="",this.type="Material",this.blending=ri,this.side=Gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=jr,this.blendDst=Yr,this.blendEquation=ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new pe(0,0,0),this.blendAlpha=0,this.depthFunc=Ri,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_a,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=li,this.stencilZFail=li,this.stencilZPass=li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ri&&(n.blending=this.blending),this.side!==Gn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==jr&&(n.blendSrc=this.blendSrc),this.blendDst!==Yr&&(n.blendDst=this.blendDst),this.blendEquation!==ti&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ri&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_a&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==li&&(n.stencilFail=this.stencilFail),this.stencilZFail!==li&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==li&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class hs extends Fi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.combine=Ol,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const _t=new P,bs=new Te;let qh=0;class jt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=va,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)bs.fromBufferAttribute(this,t),bs.applyMatrix3(e),this.setXY(t,bs.x,bs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix3(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix4(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyNormalMatrix(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.transformDirection(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ti(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ti(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ti(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ti(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ti(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),s=Ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),s=Ut(s,this.array),r=Ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==va&&(e.usage=this.usage),e}}class sc extends jt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class rc extends jt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class St extends jt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let jh=0;const Jt=new ft,Er=new Mt,vi=new P,qt=new Ht,Gi=new Ht,Tt=new P;class Vt extends Ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=Ni(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(tc(e)?rc:sc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ge().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Jt.makeRotationFromQuaternion(e),this.applyMatrix4(Jt),this}rotateX(e){return Jt.makeRotationX(e),this.applyMatrix4(Jt),this}rotateY(e){return Jt.makeRotationY(e),this.applyMatrix4(Jt),this}rotateZ(e){return Jt.makeRotationZ(e),this.applyMatrix4(Jt),this}translate(e,t,n){return Jt.makeTranslation(e,t,n),this.applyMatrix4(Jt),this}scale(e,t,n){return Jt.makeScale(e,t,n),this.applyMatrix4(Jt),this}lookAt(e){return Er.lookAt(e),Er.updateMatrix(),this.applyMatrix4(Er.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vi).negate(),this.translate(vi.x,vi.y,vi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new St(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ht);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];qt.setFromBufferAttribute(r),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Gi.setFromBufferAttribute(a),this.morphTargetsRelative?(Tt.addVectors(qt.min,Gi.min),qt.expandByPoint(Tt),Tt.addVectors(qt.max,Gi.max),qt.expandByPoint(Tt)):(qt.expandByPoint(Gi.min),qt.expandByPoint(Gi.max))}qt.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Tt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Tt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Tt.fromBufferAttribute(a,c),l&&(vi.fromBufferAttribute(e,c),Tt.add(vi)),s=Math.max(s,n.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new jt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let N=0;N<n.count;N++)a[N]=new P,l[N]=new P;const c=new P,h=new P,u=new P,f=new Te,p=new Te,g=new Te,M=new P,m=new P;function d(N,y,b){c.fromBufferAttribute(n,N),h.fromBufferAttribute(n,y),u.fromBufferAttribute(n,b),f.fromBufferAttribute(r,N),p.fromBufferAttribute(r,y),g.fromBufferAttribute(r,b),h.sub(c),u.sub(c),p.sub(f),g.sub(f);const U=1/(p.x*g.y-g.x*p.y);isFinite(U)&&(M.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(U),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(U),a[N].add(M),a[y].add(M),a[b].add(M),l[N].add(m),l[y].add(m),l[b].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let N=0,y=T.length;N<y;++N){const b=T[N],U=b.start,D=b.count;for(let H=U,j=U+D;H<j;H+=3)d(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const E=new P,v=new P,A=new P,w=new P;function C(N){A.fromBufferAttribute(s,N),w.copy(A);const y=a[N];E.copy(y),E.sub(A.multiplyScalar(A.dot(y))).normalize(),v.crossVectors(w,y);const U=v.dot(l[N])<0?-1:1;o.setXYZW(N,E.x,E.y,E.z,U)}for(let N=0,y=T.length;N<y;++N){const b=T[N],U=b.start,D=b.count;for(let H=U,j=U+D;H<j;H+=3)C(e.getX(H+0)),C(e.getX(H+1)),C(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new jt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const s=new P,r=new P,o=new P,a=new P,l=new P,c=new P,h=new P,u=new P;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),M=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,M),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,M),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(M,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let p=0,g=0;for(let M=0,m=l.length;M<m;M++){a.isInterleavedBufferAttribute?p=l[M]*a.data.stride+a.offset:p=l[M]*h;for(let d=0;d<h;d++)f[g++]=c[p++]}return new jt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Vt,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],p=e(f,n);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ia=new ft,Yn=new Ko,Es=new cs,Ua=new P,Ts=new P,ws=new P,As=new P,Tr=new P,Rs=new P,Na=new P,Cs=new P;class He extends Mt{constructor(e=new Vt,t=new hs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Rs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(Tr.fromBufferAttribute(u,e),o?Rs.addScaledVector(Tr,h):Rs.addScaledVector(Tr.sub(t),h))}t.add(Rs)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Es.copy(n.boundingSphere),Es.applyMatrix4(r),Yn.copy(e.ray).recast(e.near),!(Es.containsPoint(Yn.origin)===!1&&(Yn.intersectSphere(Es,Ua)===null||Yn.origin.distanceToSquared(Ua)>(e.far-e.near)**2))&&(Ia.copy(r).invert(),Yn.copy(e.ray).applyMatrix4(Ia),!(n.boundingBox!==null&&Yn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Yn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,M=f.length;g<M;g++){const m=f[g],d=o[m.materialIndex],T=Math.max(m.start,p.start),E=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let v=T,A=E;v<A;v+=3){const w=a.getX(v),C=a.getX(v+1),N=a.getX(v+2);s=Ps(this,d,e,n,c,h,u,w,C,N),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),M=Math.min(a.count,p.start+p.count);for(let m=g,d=M;m<d;m+=3){const T=a.getX(m),E=a.getX(m+1),v=a.getX(m+2);s=Ps(this,o,e,n,c,h,u,T,E,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,M=f.length;g<M;g++){const m=f[g],d=o[m.materialIndex],T=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=T,A=E;v<A;v+=3){const w=v,C=v+1,N=v+2;s=Ps(this,d,e,n,c,h,u,w,C,N),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),M=Math.min(l.count,p.start+p.count);for(let m=g,d=M;m<d;m+=3){const T=m,E=m+1,v=m+2;s=Ps(this,o,e,n,c,h,u,T,E,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Yh(i,e,t,n,s,r,o,a){let l;if(e.side===Ft?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===Gn,a),l===null)return null;Cs.copy(a),Cs.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Cs);return c<t.near||c>t.far?null:{distance:c,point:Cs.clone(),object:i}}function Ps(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,Ts),i.getVertexPosition(l,ws),i.getVertexPosition(c,As);const h=Yh(i,e,t,n,Ts,ws,As,Na);if(h){const u=new P;Zt.getBarycoord(Na,Ts,ws,As,u),s&&(h.uv=Zt.getInterpolatedAttribute(s,a,l,c,u,new Te)),r&&(h.uv1=Zt.getInterpolatedAttribute(r,a,l,c,u,new Te)),o&&(h.normal=Zt.getInterpolatedAttribute(o,a,l,c,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new P,materialIndex:0};Zt.getNormal(Ts,ws,As,f.normal),h.face=f,h.barycoord=u}return h}class vt extends Vt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new St(c,3)),this.setAttribute("normal",new St(h,3)),this.setAttribute("uv",new St(u,2));function g(M,m,d,T,E,v,A,w,C,N,y){const b=v/C,U=A/N,D=v/2,H=A/2,j=w/2,L=C+1,V=N+1;let Z=0,q=0;const re=new P;for(let ce=0;ce<V;ce++){const ye=ce*U-H;for(let ke=0;ke<L;ke++){const De=ke*b-D;re[M]=De*T,re[m]=ye*E,re[d]=j,c.push(re.x,re.y,re.z),re[M]=0,re[m]=0,re[d]=w>0?1:-1,h.push(re.x,re.y,re.z),u.push(ke/C),u.push(1-ce/N),Z+=1}}for(let ce=0;ce<N;ce++)for(let ye=0;ye<C;ye++){const ke=f+ye+L*ce,De=f+ye+L*(ce+1),Ze=f+(ye+1)+L*(ce+1),Qe=f+(ye+1)+L*ce;l.push(ke,De,Qe),l.push(De,Ze,Qe),q+=6}a.addGroup(p,q,y),p+=q,f+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Di(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Nt(i){const e={};for(let t=0;t<i.length;t++){const n=Di(i[t]);for(const s in n)e[s]=n[s]}return e}function Kh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function oc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}const as={clone:Di,merge:Nt};var Jh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$h=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rt extends Fi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jh,this.fragmentShader=$h,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Di(e.uniforms),this.uniformsGroups=Kh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ac extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ft,this.projectionMatrix=new ft,this.projectionMatrixInverse=new ft,this.coordinateSystem=dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Nn=new P,Fa=new Te,Oa=new Te;class $t extends ac{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=rs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan($i*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return rs*2*Math.atan(Math.tan($i*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Nn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Nn.x,Nn.y).multiplyScalar(-e/Nn.z),Nn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Nn.x,Nn.y).multiplyScalar(-e/Nn.z)}getViewSize(e,t){return this.getViewBounds(e,Fa,Oa),t.subVectors(Oa,Fa)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan($i*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const xi=-90,Mi=1;class Zh extends Mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new $t(xi,Mi,e,t);s.layers=this.layers,this.add(s);const r=new $t(xi,Mi,e,t);r.layers=this.layers,this.add(r);const o=new $t(xi,Mi,e,t);o.layers=this.layers,this.add(o);const a=new $t(xi,Mi,e,t);a.layers=this.layers,this.add(a);const l=new $t(xi,Mi,e,t);l.layers=this.layers,this.add(l);const c=new $t(xi,Mi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===dn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Zs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=M,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,f,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class lc extends Ot{constructor(e=[],t=Ci,n,s,r,o,a,l,c,h){super(e,t,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Qh extends ln{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new lc(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new vt(5,5,5),r=new Rt({name:"CubemapFromEquirect",uniforms:Di(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ft,blending:wn});r.uniforms.tEquirect.value=t;const o=new He(s,r),a=t.minFilter;return t.minFilter===si&&(t.minFilter=Qt),new Zh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}class mt extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const eu={type:"move"};class wr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const M of e.hand.values()){const m=t.getJointPose(M,n),d=this._getHandJoint(c,M);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(eu)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new mt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class $o{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new pe(e),this.density=t}clone(){return new $o(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class tu extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pn,this.environmentIntensity=1,this.environmentRotation=new pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Ar=new P,nu=new P,iu=new Ge;class kn{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Ar.subVectors(n,t).cross(nu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ar),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||iu.getNormalMatrix(e),s=this.coplanarPoint(Ar).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Kn=new cs,su=new Te(.5,.5),Ls=new P;class Zo{constructor(e=new kn,t=new kn,n=new kn,s=new kn,r=new kn,o=new kn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=dn,n=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],p=r[7],g=r[8],M=r[9],m=r[10],d=r[11],T=r[12],E=r[13],v=r[14],A=r[15];if(s[0].setComponents(c-o,p-h,d-g,A-T).normalize(),s[1].setComponents(c+o,p+h,d+g,A+T).normalize(),s[2].setComponents(c+a,p+u,d+M,A+E).normalize(),s[3].setComponents(c-a,p-u,d-M,A-E).normalize(),n)s[4].setComponents(l,f,m,v).normalize(),s[5].setComponents(c-l,p-f,d-m,A-v).normalize();else if(s[4].setComponents(c-l,p-f,d-m,A-v).normalize(),t===dn)s[5].setComponents(c+l,p+f,d+m,A+v).normalize();else if(t===Zs)s[5].setComponents(l,f,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kn)}intersectsSprite(e){Kn.center.set(0,0,0);const t=su.distanceTo(e.center);return Kn.radius=.7071067811865476+t,Kn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Ls.x=s.normal.x>0?e.max.x:e.min.x,Ls.y=s.normal.y>0?e.max.y:e.min.y,Ls.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ls)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class cc extends Fi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new pe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ba=new ft,No=new Ko,Ds=new cs,Is=new P;class ru extends Mt{constructor(e=new Vt,t=new cc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ds.copy(n.boundingSphere),Ds.applyMatrix4(s),Ds.radius+=r,e.ray.intersectsSphere(Ds)===!1)return;Ba.copy(s).invert(),No.copy(e.ray).applyMatrix4(Ba);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=f,M=p;g<M;g++){const m=c.getX(g);Is.fromBufferAttribute(u,m),ka(Is,m,l,s,e,t,this)}}else{const f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=f,M=p;g<M;g++)Is.fromBufferAttribute(u,g),ka(Is,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ka(i,e,t,n,s,r,o){const a=No.distanceSqToPoint(i);if(a<t){const l=new P;No.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class hc extends Ot{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class uc extends Ot{constructor(e,t,n=oi,s,r,o,a=an,l=an,c,h=is,u=1){if(h!==is&&h!==ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:u};super(f,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Yo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class dc extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Tn extends Vt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],p=[];let g=0;const M=[],m=n/2;let d=0;T(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new St(u,3)),this.setAttribute("normal",new St(f,3)),this.setAttribute("uv",new St(p,2));function T(){const v=new P,A=new P;let w=0;const C=(t-e)/n;for(let N=0;N<=r;N++){const y=[],b=N/r,U=b*(t-e)+e;for(let D=0;D<=s;D++){const H=D/s,j=H*l+a,L=Math.sin(j),V=Math.cos(j);A.x=U*L,A.y=-b*n+m,A.z=U*V,u.push(A.x,A.y,A.z),v.set(L,C,V).normalize(),f.push(v.x,v.y,v.z),p.push(H,1-b),y.push(g++)}M.push(y)}for(let N=0;N<s;N++)for(let y=0;y<r;y++){const b=M[y][N],U=M[y+1][N],D=M[y+1][N+1],H=M[y][N+1];(e>0||y!==0)&&(h.push(b,U,H),w+=3),(t>0||y!==r-1)&&(h.push(U,D,H),w+=3)}c.addGroup(d,w,0),d+=w}function E(v){const A=g,w=new Te,C=new P;let N=0;const y=v===!0?e:t,b=v===!0?1:-1;for(let D=1;D<=s;D++)u.push(0,m*b,0),f.push(0,b,0),p.push(.5,.5),g++;const U=g;for(let D=0;D<=s;D++){const j=D/s*l+a,L=Math.cos(j),V=Math.sin(j);C.x=y*V,C.y=m*b,C.z=y*L,u.push(C.x,C.y,C.z),f.push(0,b,0),w.x=L*.5+.5,w.y=V*.5*b+.5,p.push(w.x,w.y),g++}for(let D=0;D<s;D++){const H=A+D,j=U+D;v===!0?h.push(j,j+1,H):h.push(j+1,j,H),N+=3}c.addGroup(d,N,v===!0?1:2),d+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class us extends Vt{constructor(e=[new Te(0,-.5),new Te(.5,0),new Te(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Be(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/t,u=new P,f=new Te,p=new P,g=new P,M=new P;let m=0,d=0;for(let T=0;T<=e.length-1;T++)switch(T){case 0:m=e[T+1].x-e[T].x,d=e[T+1].y-e[T].y,p.x=d*1,p.y=-m,p.z=d*0,M.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(M.x,M.y,M.z);break;default:m=e[T+1].x-e[T].x,d=e[T+1].y-e[T].y,p.x=d*1,p.y=-m,p.z=d*0,g.copy(p),p.x+=M.x,p.y+=M.y,p.z+=M.z,p.normalize(),l.push(p.x,p.y,p.z),M.copy(g)}for(let T=0;T<=t;T++){const E=n+T*h*s,v=Math.sin(E),A=Math.cos(E);for(let w=0;w<=e.length-1;w++){u.x=e[w].x*v,u.y=e[w].y,u.z=e[w].x*A,o.push(u.x,u.y,u.z),f.x=T/t,f.y=w/(e.length-1),a.push(f.x,f.y);const C=l[3*w+0]*v,N=l[3*w+1],y=l[3*w+0]*A;c.push(C,N,y)}}for(let T=0;T<t;T++)for(let E=0;E<e.length-1;E++){const v=E+T*e.length,A=v,w=v+e.length,C=v+e.length+1,N=v+1;r.push(A,w,N),r.push(C,N,w)}this.setIndex(r),this.setAttribute("position",new St(o,3)),this.setAttribute("uv",new St(a,2)),this.setAttribute("normal",new St(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new us(e.points,e.segments,e.phiStart,e.phiLength)}}class Cn extends Vt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=e/a,f=t/l,p=[],g=[],M=[],m=[];for(let d=0;d<h;d++){const T=d*f-o;for(let E=0;E<c;E++){const v=E*u-r;g.push(v,-T,0),M.push(0,0,1),m.push(E/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let T=0;T<a;T++){const E=T+c*d,v=T+c*(d+1),A=T+1+c*(d+1),w=T+1+c*d;p.push(E,v,w),p.push(v,A,w)}this.setIndex(p),this.setAttribute("position",new St(g,3)),this.setAttribute("normal",new St(M,3)),this.setAttribute("uv",new St(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cn(e.width,e.height,e.widthSegments,e.heightSegments)}}class bn extends Vt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new P,f=new P,p=[],g=[],M=[],m=[];for(let d=0;d<=n;d++){const T=[],E=d/n;let v=0;d===0&&o===0?v=.5/t:d===n&&l===Math.PI&&(v=-.5/t);for(let A=0;A<=t;A++){const w=A/t;u.x=-e*Math.cos(s+w*r)*Math.sin(o+E*a),u.y=e*Math.cos(o+E*a),u.z=e*Math.sin(s+w*r)*Math.sin(o+E*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),M.push(f.x,f.y,f.z),m.push(w+v,1-E),T.push(c++)}h.push(T)}for(let d=0;d<n;d++)for(let T=0;T<t;T++){const E=h[d][T+1],v=h[d][T],A=h[d+1][T],w=h[d+1][T+1];(d!==0||o>0)&&p.push(E,v,w),(d!==n-1||l<Math.PI)&&p.push(v,A,w)}this.setIndex(p),this.setAttribute("position",new St(g,3)),this.setAttribute("normal",new St(M,3)),this.setAttribute("uv",new St(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ou extends Rt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class gt extends Fi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ql,this.normalScale=new Te(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class au extends Fi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=sh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class lu extends Fi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Qo extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new pe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class cu extends Qo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new pe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Rr=new ft,za=new P,Ha=new P;class hu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Te(512,512),this.mapType=fn,this.map=null,this.mapPass=null,this.matrix=new ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zo,this._frameExtents=new Te(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;za.setFromMatrixPosition(e.matrixWorld),t.position.copy(za),Ha.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ha),t.updateMatrixWorld(),Rr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rr,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Rr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ea extends ac{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class uu extends hu{constructor(){super(new ea(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Va extends Qo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new uu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class du extends Qo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class fu extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class fc{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const Ga=new P,Us=new P,Si=new P,yi=new P,Cr=new P,pu=new P,mu=new P;class pc{constructor(e=new P,t=new P){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Ga.subVectors(e,this.start),Us.subVectors(this.end,this.start);const n=Us.dot(Us);let r=Us.dot(Ga)/n;return t&&(r=Be(r,0,1)),r}closestPointToPoint(e,t,n){const s=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=pu,n=mu){const s=10000000000000001e-32;let r,o;const a=this.start,l=e.start,c=this.end,h=e.end;Si.subVectors(c,a),yi.subVectors(h,l),Cr.subVectors(a,l);const u=Si.dot(Si),f=yi.dot(yi),p=yi.dot(Cr);if(u<=s&&f<=s)return t.copy(a),n.copy(l),t.sub(n),t.dot(t);if(u<=s)r=0,o=p/f,o=Be(o,0,1);else{const g=Si.dot(Cr);if(f<=s)o=0,r=Be(-g/u,0,1);else{const M=Si.dot(yi),m=u*f-M*M;m!==0?r=Be((M*p-g*f)/m,0,1):r=0,o=(M*r+p)/f,o<0?(o=0,r=Be(-g/u,0,1)):o>1&&(o=1,r=Be((M-g)/u,0,1))}}return t.copy(a).add(Si.multiplyScalar(r)),n.copy(l).add(yi.multiplyScalar(o)),t.sub(n),t.dot(t)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function Wa(i,e,t,n){const s=gu(n);switch(t){case Kl:return i*e;case $l:return i*e/s.components*s.byteLength;case Wo:return i*e/s.components*s.byteLength;case Zl:return i*e*2/s.components*s.byteLength;case Xo:return i*e*2/s.components*s.byteLength;case Jl:return i*e*3/s.components*s.byteLength;case on:return i*e*4/s.components*s.byteLength;case qo:return i*e*4/s.components*s.byteLength;case Xs:case qs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case js:case Ys:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ao:case co:return Math.max(i,16)*Math.max(e,8)/4;case oo:case lo:return Math.max(i,8)*Math.max(e,8)/2;case ho:case uo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case fo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case po:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case mo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case go:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case _o:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case vo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case xo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Mo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case So:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case yo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case bo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Eo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case To:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case wo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ao:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ro:case Co:case Po:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Lo:case Do:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Io:case Uo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function gu(i){switch(i){case fn:case Xl:return{byteLength:1,components:1};case ts:case ql:case An:return{byteLength:2,components:1};case Vo:case Go:return{byteLength:2,components:4};case oi:case Ho:case En:return{byteLength:4,components:1};case jl:case Yl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ko}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ko);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function mc(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function _u(i){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){const g=u[f],M=u[p];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++f,u[f]=M)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){const M=u[p];i.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var vu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xu=`#ifdef USE_ALPHAHASH
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
#endif`,Mu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Su=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Eu=`#ifdef USE_AOMAP
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
#endif`,Tu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wu=`#ifdef USE_BATCHING
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
#endif`,Au=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ru=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Pu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Lu=`#ifdef USE_IRIDESCENCE
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
#endif`,Du=`#ifdef USE_BUMPMAP
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
#endif`,Iu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Uu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ou=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ku=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Hu=`#define PI 3.141592653589793
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
} // validated`,Vu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Gu=`vec3 transformedNormal = objectNormal;
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
#endif`,Wu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ju=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ku=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ju=`#ifdef USE_ENVMAP
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
#endif`,$u=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Zu=`#ifdef USE_ENVMAP
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
#endif`,Qu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ed=`#ifdef USE_ENVMAP
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
#endif`,td=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,id=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rd=`#ifdef USE_GRADIENTMAP
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
}`,od=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ad=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ld=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cd=`uniform bool receiveShadow;
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
#endif`,hd=`#ifdef USE_ENVMAP
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
#endif`,ud=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,md=`PhysicalMaterial material;
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
#endif`,gd=`struct PhysicalMaterial {
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
}`,_d=`
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
#endif`,vd=`#if defined( RE_IndirectDiffuse )
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
#endif`,xd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Md=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Sd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ed=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Td=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ad=`#if defined( USE_POINTS_UV )
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
#endif`,Rd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ld=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Id=`#ifdef USE_MORPHTARGETS
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
#endif`,Ud=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Fd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Od=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zd=`#ifdef USE_NORMALMAP
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
#endif`,Hd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,jd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Kd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$d=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ef=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,nf=`float getShadowMask() {
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
}`,sf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rf=`#ifdef USE_SKINNING
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
#endif`,of=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,af=`#ifdef USE_SKINNING
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
#endif`,lf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,uf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,df=`#ifdef USE_TRANSMISSION
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
#endif`,ff=`#ifdef USE_TRANSMISSION
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
#endif`,pf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_f=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xf=`uniform sampler2D t2D;
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
}`,Mf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ef=`#include <common>
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
}`,Tf=`#if DEPTH_PACKING == 3200
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
}`,wf=`#define DISTANCE
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
}`,Af=`#define DISTANCE
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
}`,Rf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pf=`uniform float scale;
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
}`,Lf=`uniform vec3 diffuse;
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
}`,Df=`#include <common>
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
}`,If=`uniform vec3 diffuse;
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
}`,Uf=`#define LAMBERT
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
}`,Nf=`#define LAMBERT
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
}`,Ff=`#define MATCAP
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
}`,Of=`#define MATCAP
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
}`,Bf=`#define NORMAL
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
}`,kf=`#define NORMAL
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
}`,zf=`#define PHONG
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
}`,Hf=`#define PHONG
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
}`,Vf=`#define STANDARD
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
}`,Gf=`#define STANDARD
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
}`,Wf=`#define TOON
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
}`,Xf=`#define TOON
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
}`,qf=`uniform float size;
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
}`,jf=`uniform vec3 diffuse;
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
}`,Yf=`#include <common>
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
}`,Kf=`uniform vec3 color;
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
}`,Jf=`uniform float rotation;
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
}`,$f=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:vu,alphahash_pars_fragment:xu,alphamap_fragment:Mu,alphamap_pars_fragment:Su,alphatest_fragment:yu,alphatest_pars_fragment:bu,aomap_fragment:Eu,aomap_pars_fragment:Tu,batching_pars_vertex:wu,batching_vertex:Au,begin_vertex:Ru,beginnormal_vertex:Cu,bsdfs:Pu,iridescence_fragment:Lu,bumpmap_pars_fragment:Du,clipping_planes_fragment:Iu,clipping_planes_pars_fragment:Uu,clipping_planes_pars_vertex:Nu,clipping_planes_vertex:Fu,color_fragment:Ou,color_pars_fragment:Bu,color_pars_vertex:ku,color_vertex:zu,common:Hu,cube_uv_reflection_fragment:Vu,defaultnormal_vertex:Gu,displacementmap_pars_vertex:Wu,displacementmap_vertex:Xu,emissivemap_fragment:qu,emissivemap_pars_fragment:ju,colorspace_fragment:Yu,colorspace_pars_fragment:Ku,envmap_fragment:Ju,envmap_common_pars_fragment:$u,envmap_pars_fragment:Zu,envmap_pars_vertex:Qu,envmap_physical_pars_fragment:hd,envmap_vertex:ed,fog_vertex:td,fog_pars_vertex:nd,fog_fragment:id,fog_pars_fragment:sd,gradientmap_pars_fragment:rd,lightmap_pars_fragment:od,lights_lambert_fragment:ad,lights_lambert_pars_fragment:ld,lights_pars_begin:cd,lights_toon_fragment:ud,lights_toon_pars_fragment:dd,lights_phong_fragment:fd,lights_phong_pars_fragment:pd,lights_physical_fragment:md,lights_physical_pars_fragment:gd,lights_fragment_begin:_d,lights_fragment_maps:vd,lights_fragment_end:xd,logdepthbuf_fragment:Md,logdepthbuf_pars_fragment:Sd,logdepthbuf_pars_vertex:yd,logdepthbuf_vertex:bd,map_fragment:Ed,map_pars_fragment:Td,map_particle_fragment:wd,map_particle_pars_fragment:Ad,metalnessmap_fragment:Rd,metalnessmap_pars_fragment:Cd,morphinstance_vertex:Pd,morphcolor_vertex:Ld,morphnormal_vertex:Dd,morphtarget_pars_vertex:Id,morphtarget_vertex:Ud,normal_fragment_begin:Nd,normal_fragment_maps:Fd,normal_pars_fragment:Od,normal_pars_vertex:Bd,normal_vertex:kd,normalmap_pars_fragment:zd,clearcoat_normal_fragment_begin:Hd,clearcoat_normal_fragment_maps:Vd,clearcoat_pars_fragment:Gd,iridescence_pars_fragment:Wd,opaque_fragment:Xd,packing:qd,premultiplied_alpha_fragment:jd,project_vertex:Yd,dithering_fragment:Kd,dithering_pars_fragment:Jd,roughnessmap_fragment:$d,roughnessmap_pars_fragment:Zd,shadowmap_pars_fragment:Qd,shadowmap_pars_vertex:ef,shadowmap_vertex:tf,shadowmask_pars_fragment:nf,skinbase_vertex:sf,skinning_pars_vertex:rf,skinning_vertex:of,skinnormal_vertex:af,specularmap_fragment:lf,specularmap_pars_fragment:cf,tonemapping_fragment:hf,tonemapping_pars_fragment:uf,transmission_fragment:df,transmission_pars_fragment:ff,uv_pars_fragment:pf,uv_pars_vertex:mf,uv_vertex:gf,worldpos_vertex:_f,background_vert:vf,background_frag:xf,backgroundCube_vert:Mf,backgroundCube_frag:Sf,cube_vert:yf,cube_frag:bf,depth_vert:Ef,depth_frag:Tf,distanceRGBA_vert:wf,distanceRGBA_frag:Af,equirect_vert:Rf,equirect_frag:Cf,linedashed_vert:Pf,linedashed_frag:Lf,meshbasic_vert:Df,meshbasic_frag:If,meshlambert_vert:Uf,meshlambert_frag:Nf,meshmatcap_vert:Ff,meshmatcap_frag:Of,meshnormal_vert:Bf,meshnormal_frag:kf,meshphong_vert:zf,meshphong_frag:Hf,meshphysical_vert:Vf,meshphysical_frag:Gf,meshtoon_vert:Wf,meshtoon_frag:Xf,points_vert:qf,points_frag:jf,shadow_vert:Yf,shadow_frag:Kf,sprite_vert:Jf,sprite_frag:$f},le={common:{diffuse:{value:new pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Te(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new pe(16777215)},opacity:{value:1},center:{value:new Te(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},un={basic:{uniforms:Nt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Nt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new pe(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Nt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new pe(0)},specular:{value:new pe(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Nt([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Nt([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new pe(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Nt([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Nt([le.points,le.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Nt([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Nt([le.common,le.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Nt([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Nt([le.sprite,le.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:Nt([le.common,le.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:Nt([le.lights,le.fog,{color:{value:new pe(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};un.physical={uniforms:Nt([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Te(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Te},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new pe(0)},specularColor:{value:new pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Te},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Ns={r:0,b:0,g:0},Jn=new pn,Zf=new ft;function Qf(i,e,t,n,s,r,o){const a=new pe(0);let l=r===!0?0:1,c,h,u=null,f=0,p=null;function g(E){let v=E.isScene===!0?E.background:null;return v&&v.isTexture&&(v=(E.backgroundBlurriness>0?t:e).get(v)),v}function M(E){let v=!1;const A=g(E);A===null?d(a,l):A&&A.isColor&&(d(A,1),v=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,v){const A=g(v);A&&(A.isCubeTexture||A.mapping===tr)?(h===void 0&&(h=new He(new vt(1,1,1),new Rt({name:"BackgroundCubeMaterial",uniforms:Di(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Ft,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,C,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Jn.copy(v.backgroundRotation),Jn.x*=-1,Jn.y*=-1,Jn.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Jn.y*=-1,Jn.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Zf.makeRotationFromEuler(Jn)),h.material.toneMapped=Je.getTransfer(A.colorSpace)!==tt,(u!==A||f!==A.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=A,f=A.version,p=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new He(new Cn(2,2),new Rt({name:"BackgroundMaterial",uniforms:Di(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Je.getTransfer(A.colorSpace)!==tt,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||f!==A.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,u=A,f=A.version,p=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function d(E,v){E.getRGB(Ns,oc(i)),n.buffers.color.setClear(Ns.r,Ns.g,Ns.b,v,o)}function T(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,v=1){a.set(E),l=v,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,d(a,l)},render:M,addToRenderList:m,dispose:T}}function ep(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(b,U,D,H,j){let L=!1;const V=u(H,D,U);r!==V&&(r=V,c(r.object)),L=p(b,H,D,j),L&&g(b,H,D,j),j!==null&&e.update(j,i.ELEMENT_ARRAY_BUFFER),(L||o)&&(o=!1,v(b,U,D,H),j!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function l(){return i.createVertexArray()}function c(b){return i.bindVertexArray(b)}function h(b){return i.deleteVertexArray(b)}function u(b,U,D){const H=D.wireframe===!0;let j=n[b.id];j===void 0&&(j={},n[b.id]=j);let L=j[U.id];L===void 0&&(L={},j[U.id]=L);let V=L[H];return V===void 0&&(V=f(l()),L[H]=V),V}function f(b){const U=[],D=[],H=[];for(let j=0;j<t;j++)U[j]=0,D[j]=0,H[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:D,attributeDivisors:H,object:b,attributes:{},index:null}}function p(b,U,D,H){const j=r.attributes,L=U.attributes;let V=0;const Z=D.getAttributes();for(const q in Z)if(Z[q].location>=0){const ce=j[q];let ye=L[q];if(ye===void 0&&(q==="instanceMatrix"&&b.instanceMatrix&&(ye=b.instanceMatrix),q==="instanceColor"&&b.instanceColor&&(ye=b.instanceColor)),ce===void 0||ce.attribute!==ye||ye&&ce.data!==ye.data)return!0;V++}return r.attributesNum!==V||r.index!==H}function g(b,U,D,H){const j={},L=U.attributes;let V=0;const Z=D.getAttributes();for(const q in Z)if(Z[q].location>=0){let ce=L[q];ce===void 0&&(q==="instanceMatrix"&&b.instanceMatrix&&(ce=b.instanceMatrix),q==="instanceColor"&&b.instanceColor&&(ce=b.instanceColor));const ye={};ye.attribute=ce,ce&&ce.data&&(ye.data=ce.data),j[q]=ye,V++}r.attributes=j,r.attributesNum=V,r.index=H}function M(){const b=r.newAttributes;for(let U=0,D=b.length;U<D;U++)b[U]=0}function m(b){d(b,0)}function d(b,U){const D=r.newAttributes,H=r.enabledAttributes,j=r.attributeDivisors;D[b]=1,H[b]===0&&(i.enableVertexAttribArray(b),H[b]=1),j[b]!==U&&(i.vertexAttribDivisor(b,U),j[b]=U)}function T(){const b=r.newAttributes,U=r.enabledAttributes;for(let D=0,H=U.length;D<H;D++)U[D]!==b[D]&&(i.disableVertexAttribArray(D),U[D]=0)}function E(b,U,D,H,j,L,V){V===!0?i.vertexAttribIPointer(b,U,D,j,L):i.vertexAttribPointer(b,U,D,H,j,L)}function v(b,U,D,H){M();const j=H.attributes,L=D.getAttributes(),V=U.defaultAttributeValues;for(const Z in L){const q=L[Z];if(q.location>=0){let re=j[Z];if(re===void 0&&(Z==="instanceMatrix"&&b.instanceMatrix&&(re=b.instanceMatrix),Z==="instanceColor"&&b.instanceColor&&(re=b.instanceColor)),re!==void 0){const ce=re.normalized,ye=re.itemSize,ke=e.get(re);if(ke===void 0)continue;const De=ke.buffer,Ze=ke.type,Qe=ke.bytesPerElement,J=Ze===i.INT||Ze===i.UNSIGNED_INT||re.gpuType===Ho;if(re.isInterleavedBufferAttribute){const ee=re.data,ge=ee.stride,Fe=re.offset;if(ee.isInstancedInterleavedBuffer){for(let Ae=0;Ae<q.locationSize;Ae++)d(q.location+Ae,ee.meshPerAttribute);b.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Ae=0;Ae<q.locationSize;Ae++)m(q.location+Ae);i.bindBuffer(i.ARRAY_BUFFER,De);for(let Ae=0;Ae<q.locationSize;Ae++)E(q.location+Ae,ye/q.locationSize,Ze,ce,ge*Qe,(Fe+ye/q.locationSize*Ae)*Qe,J)}else{if(re.isInstancedBufferAttribute){for(let ee=0;ee<q.locationSize;ee++)d(q.location+ee,re.meshPerAttribute);b.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ee=0;ee<q.locationSize;ee++)m(q.location+ee);i.bindBuffer(i.ARRAY_BUFFER,De);for(let ee=0;ee<q.locationSize;ee++)E(q.location+ee,ye/q.locationSize,Ze,ce,ye*Qe,ye/q.locationSize*ee*Qe,J)}}else if(V!==void 0){const ce=V[Z];if(ce!==void 0)switch(ce.length){case 2:i.vertexAttrib2fv(q.location,ce);break;case 3:i.vertexAttrib3fv(q.location,ce);break;case 4:i.vertexAttrib4fv(q.location,ce);break;default:i.vertexAttrib1fv(q.location,ce)}}}}T()}function A(){N();for(const b in n){const U=n[b];for(const D in U){const H=U[D];for(const j in H)h(H[j].object),delete H[j];delete U[D]}delete n[b]}}function w(b){if(n[b.id]===void 0)return;const U=n[b.id];for(const D in U){const H=U[D];for(const j in H)h(H[j].object),delete H[j];delete U[D]}delete n[b.id]}function C(b){for(const U in n){const D=n[U];if(D[b.id]===void 0)continue;const H=D[b.id];for(const j in H)h(H[j].object),delete H[j];delete D[b.id]}}function N(){y(),o=!0,r!==s&&(r=s,c(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:N,resetDefaultState:y,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfProgram:C,initAttributes:M,enableAttribute:m,disableUnusedAttributes:T}}function tp(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];t.update(p,n,1)}function l(c,h,u,f){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let M=0;M<u;M++)g+=h[M]*f[M];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function np(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==on&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const N=C===An&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==fn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==En&&!N)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:T,maxVaryings:E,maxFragmentUniforms:v,vertexTextures:A,maxSamples:w}}function ip(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new kn,a=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||n!==0||s;return s=f,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,p){const g=u.clippingPlanes,M=u.clipIntersection,m=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const T=r?0:n,E=T*4;let v=d.clippingState||null;l.value=v,v=h(g,f,E,p);for(let A=0;A!==E;++A)v[A]=t[A];d.clippingState=v,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,p,g){const M=u!==null?u.length:0;let m=null;if(M!==0){if(m=l.value,g!==!0||m===null){const d=p+M*4,T=f.matrixWorldInverse;a.getNormalMatrix(T),(m===null||m.length<d)&&(m=new Float32Array(d));for(let E=0,v=p;E!==M;++E,v+=4)o.copy(u[E]).applyMatrix4(T,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}function sp(i){let e=new WeakMap;function t(o,a){return a===no?o.mapping=Ci:a===io&&(o.mapping=Pi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===no||a===io)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Qh(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const wi=4,Xa=[.125,.215,.35,.446,.526,.582],ni=20,Pr=new ea,qa=new pe;let Lr=null,Dr=0,Ir=0,Ur=!1;const ei=(1+Math.sqrt(5))/2,bi=1/ei,ja=[new P(-ei,bi,0),new P(ei,bi,0),new P(-bi,0,ei),new P(bi,0,ei),new P(0,ei,-bi),new P(0,ei,bi),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],rp=new P;class Ya{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:o=256,position:a=rp}=r;Lr=this._renderer.getRenderTarget(),Dr=this._renderer.getActiveCubeFace(),Ir=this._renderer.getActiveMipmapLevel(),Ur=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$a(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ja(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Lr,Dr,Ir),this._renderer.xr.enabled=Ur,e.scissorTest=!1,Fs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ci||e.mapping===Pi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lr=this._renderer.getRenderTarget(),Dr=this._renderer.getActiveCubeFace(),Ir=this._renderer.getActiveMipmapLevel(),Ur=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:An,format:on,colorSpace:Li,depthBuffer:!1},s=Ka(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ka(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=op(r)),this._blurMaterial=ap(r,e,t)}return s}_compileMaterial(e){const t=new He(this._lodPlanes[0],e);this._renderer.compile(t,Pr)}_sceneToCubeUV(e,t,n,s,r){const l=new $t(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,p=u.toneMapping;u.getClearColor(qa),u.toneMapping=Vn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const M=new hs({name:"PMREM.Background",side:Ft,depthWrite:!1,depthTest:!1}),m=new He(new vt,M);let d=!1;const T=e.background;T?T.isColor&&(M.color.copy(T),e.background=null,d=!0):(M.color.copy(qa),d=!0);for(let E=0;E<6;E++){const v=E%3;v===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):v===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));const A=this._cubeSize;Fs(s,v*A,E>2?A:0,A,A),u.setRenderTarget(s),d&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=p,u.autoClear=f,e.background=T}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Ci||e.mapping===Pi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=$a()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ja());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new He(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Fs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Pr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=ja[(s-r-1)%ja.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new He(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ni-1),M=r/g,m=isFinite(r)?1+Math.floor(h*M):ni;m>ni&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ni}`);const d=[];let T=0;for(let C=0;C<ni;++C){const N=C/M,y=Math.exp(-N*N/2);d.push(y),C===0?T+=y:C<m&&(T+=2*y)}for(let C=0;C<d.length;C++)d[C]=d[C]/T;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:E}=this;f.dTheta.value=g,f.mipInt.value=E-n;const v=this._sizeLods[s],A=3*v*(s>E-wi?s-E+wi:0),w=4*(this._cubeSize-v);Fs(t,A,w,3*v,2*v),l.setRenderTarget(t),l.render(u,Pr)}}function op(i){const e=[],t=[],n=[];let s=i;const r=i-wi+1+Xa.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>i-wi?l=Xa[o-i+wi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,M=3,m=2,d=1,T=new Float32Array(M*g*p),E=new Float32Array(m*g*p),v=new Float32Array(d*g*p);for(let w=0;w<p;w++){const C=w%3*2/3-1,N=w>2?0:-1,y=[C,N,0,C+2/3,N,0,C+2/3,N+1,0,C,N,0,C+2/3,N+1,0,C,N+1,0];T.set(y,M*g*w),E.set(f,m*g*w);const b=[w,w,w,w,w,w];v.set(b,d*g*w)}const A=new Vt;A.setAttribute("position",new jt(T,M)),A.setAttribute("uv",new jt(E,m)),A.setAttribute("faceIndex",new jt(v,d)),e.push(A),s>wi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ka(i,e,t){const n=new ln(i,e,t);return n.texture.mapping=tr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function ap(i,e,t){const n=new Float32Array(ni),s=new P(0,1,0);return new Rt({name:"SphericalGaussianBlur",defines:{n:ni,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ta(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Ja(){return new Rt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ta(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function $a(){return new Rt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ta(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function ta(){return`

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
	`}function lp(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===no||l===io,h=l===Ci||l===Pi;if(c||h){let u=e.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Ya(i)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new Ya(i)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function cp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&os("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function hp(i,e,t,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const p in f)e.update(f[p],i.ARRAY_BUFFER)}function c(u){const f=[],p=u.index,g=u.attributes.position;let M=0;if(p!==null){const T=p.array;M=p.version;for(let E=0,v=T.length;E<v;E+=3){const A=T[E+0],w=T[E+1],C=T[E+2];f.push(A,w,w,C,C,A)}}else if(g!==void 0){const T=g.array;M=g.version;for(let E=0,v=T.length/3-1;E<v;E+=3){const A=E+0,w=E+1,C=E+2;f.push(A,w,w,C,C,A)}}else return;const m=new(tc(f)?rc:sc)(f,1);m.version=M;const d=r.get(u);d&&e.remove(d),r.set(u,m)}function h(u){const f=r.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function up(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,p){i.drawElements(n,p,r,f*o),t.update(p,n,1)}function c(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,f*o,g),t.update(p,n,g))}function h(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];t.update(m,n,1)}function u(f,p,g,M){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],M[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,M,0,g);let d=0;for(let T=0;T<g;T++)d+=p[T]*M[T];t.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function dp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function fp(i,e,t){const n=new WeakMap,s=new dt;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let b=function(){N.dispose(),n.delete(a),a.removeEventListener("dispose",b)};var p=b;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,M=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],T=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),M===!0&&(v=2),m===!0&&(v=3);let A=a.attributes.position.count*v,w=1;A>e.maxTextureSize&&(w=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const C=new Float32Array(A*w*4*u),N=new nc(C,A,w,u);N.type=En,N.needsUpdate=!0;const y=v*4;for(let U=0;U<u;U++){const D=d[U],H=T[U],j=E[U],L=A*w*4*U;for(let V=0;V<D.count;V++){const Z=V*y;g===!0&&(s.fromBufferAttribute(D,V),C[L+Z+0]=s.x,C[L+Z+1]=s.y,C[L+Z+2]=s.z,C[L+Z+3]=0),M===!0&&(s.fromBufferAttribute(H,V),C[L+Z+4]=s.x,C[L+Z+5]=s.y,C[L+Z+6]=s.z,C[L+Z+7]=0),m===!0&&(s.fromBufferAttribute(j,V),C[L+Z+8]=s.x,C[L+Z+9]=s.y,C[L+Z+10]=s.z,C[L+Z+11]=j.itemSize===4?s.w:1)}}f={count:u,texture:N,size:new Te(A,w)},n.set(a,f),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const M=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",M),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function pp(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}const gc=new Ot,Za=new uc(1,1),_c=new nc,vc=new Oh,xc=new lc,Qa=[],el=[],tl=new Float32Array(16),nl=new Float32Array(9),il=new Float32Array(4);function Oi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Qa[s];if(r===void 0&&(r=new Float32Array(s),Qa[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function yt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function bt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function nr(i,e){let t=el[e];t===void 0&&(t=new Int32Array(e),el[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function mp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function gp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;i.uniform2fv(this.addr,e),bt(t,e)}}function _p(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(yt(t,e))return;i.uniform3fv(this.addr,e),bt(t,e)}}function vp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;i.uniform4fv(this.addr,e),bt(t,e)}}function xp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(yt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),bt(t,e)}else{if(yt(t,n))return;il.set(n),i.uniformMatrix2fv(this.addr,!1,il),bt(t,n)}}function Mp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(yt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),bt(t,e)}else{if(yt(t,n))return;nl.set(n),i.uniformMatrix3fv(this.addr,!1,nl),bt(t,n)}}function Sp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(yt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),bt(t,e)}else{if(yt(t,n))return;tl.set(n),i.uniformMatrix4fv(this.addr,!1,tl),bt(t,n)}}function yp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function bp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;i.uniform2iv(this.addr,e),bt(t,e)}}function Ep(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;i.uniform3iv(this.addr,e),bt(t,e)}}function Tp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;i.uniform4iv(this.addr,e),bt(t,e)}}function wp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ap(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;i.uniform2uiv(this.addr,e),bt(t,e)}}function Rp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;i.uniform3uiv(this.addr,e),bt(t,e)}}function Cp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;i.uniform4uiv(this.addr,e),bt(t,e)}}function Pp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Za.compareFunction=ec,r=Za):r=gc,t.setTexture2D(e||r,s)}function Lp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||vc,s)}function Dp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||xc,s)}function Ip(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||_c,s)}function Up(i){switch(i){case 5126:return mp;case 35664:return gp;case 35665:return _p;case 35666:return vp;case 35674:return xp;case 35675:return Mp;case 35676:return Sp;case 5124:case 35670:return yp;case 35667:case 35671:return bp;case 35668:case 35672:return Ep;case 35669:case 35673:return Tp;case 5125:return wp;case 36294:return Ap;case 36295:return Rp;case 36296:return Cp;case 35678:case 36198:case 36298:case 36306:case 35682:return Pp;case 35679:case 36299:case 36307:return Lp;case 35680:case 36300:case 36308:case 36293:return Dp;case 36289:case 36303:case 36311:case 36292:return Ip}}function Np(i,e){i.uniform1fv(this.addr,e)}function Fp(i,e){const t=Oi(e,this.size,2);i.uniform2fv(this.addr,t)}function Op(i,e){const t=Oi(e,this.size,3);i.uniform3fv(this.addr,t)}function Bp(i,e){const t=Oi(e,this.size,4);i.uniform4fv(this.addr,t)}function kp(i,e){const t=Oi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function zp(i,e){const t=Oi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Hp(i,e){const t=Oi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Vp(i,e){i.uniform1iv(this.addr,e)}function Gp(i,e){i.uniform2iv(this.addr,e)}function Wp(i,e){i.uniform3iv(this.addr,e)}function Xp(i,e){i.uniform4iv(this.addr,e)}function qp(i,e){i.uniform1uiv(this.addr,e)}function jp(i,e){i.uniform2uiv(this.addr,e)}function Yp(i,e){i.uniform3uiv(this.addr,e)}function Kp(i,e){i.uniform4uiv(this.addr,e)}function Jp(i,e,t){const n=this.cache,s=e.length,r=nr(t,s);yt(n,r)||(i.uniform1iv(this.addr,r),bt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||gc,r[o])}function $p(i,e,t){const n=this.cache,s=e.length,r=nr(t,s);yt(n,r)||(i.uniform1iv(this.addr,r),bt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||vc,r[o])}function Zp(i,e,t){const n=this.cache,s=e.length,r=nr(t,s);yt(n,r)||(i.uniform1iv(this.addr,r),bt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||xc,r[o])}function Qp(i,e,t){const n=this.cache,s=e.length,r=nr(t,s);yt(n,r)||(i.uniform1iv(this.addr,r),bt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||_c,r[o])}function em(i){switch(i){case 5126:return Np;case 35664:return Fp;case 35665:return Op;case 35666:return Bp;case 35674:return kp;case 35675:return zp;case 35676:return Hp;case 5124:case 35670:return Vp;case 35667:case 35671:return Gp;case 35668:case 35672:return Wp;case 35669:case 35673:return Xp;case 5125:return qp;case 36294:return jp;case 36295:return Yp;case 36296:return Kp;case 35678:case 36198:case 36298:case 36306:case 35682:return Jp;case 35679:case 36299:case 36307:return $p;case 35680:case 36300:case 36308:case 36293:return Zp;case 36289:case 36303:case 36311:case 36292:return Qp}}class tm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Up(t.type)}}class nm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=em(t.type)}}class im{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Nr=/(\w+)(\])?(\[|\.)?/g;function sl(i,e){i.seq.push(e),i.map[e.id]=e}function sm(i,e,t){const n=i.name,s=n.length;for(Nr.lastIndex=0;;){const r=Nr.exec(n),o=Nr.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){sl(t,c===void 0?new tm(a,i,e):new nm(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new im(a),sl(t,u)),t=u}}}class Ks{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);sm(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function rl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const rm=37297;let om=0;function am(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const ol=new Ge;function lm(i){Je._getMatrix(ol,Je.workingColorSpace,i);const e=`mat3( ${ol.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(i)){case $s:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function al(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+am(i.getShaderSource(e),a)}else return r}function cm(i,e){const t=lm(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function hm(i,e){let t;switch(e){case Bl:t="Linear";break;case kl:t="Reinhard";break;case zl:t="Cineon";break;case zo:t="ACESFilmic";break;case Vl:t="AgX";break;case Gl:t="Neutral";break;case Hl:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Os=new P;function um(){Je.getLuminanceCoefficients(Os);const i=Os.x.toFixed(4),e=Os.y.toFixed(4),t=Os.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function dm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ji).join(`
`)}function fm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function pm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Ji(i){return i!==""}function ll(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function cl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const mm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fo(i){return i.replace(mm,_m)}const gm=new Map;function _m(i,e){let t=Xe[e];if(t===void 0){const n=gm.get(e);if(n!==void 0)t=Xe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Fo(t)}const vm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hl(i){return i.replace(vm,xm)}function xm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ul(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function Mm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Nl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Fl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===yn&&(e="SHADOWMAP_TYPE_VSM"),e}function Sm(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ci:case Pi:e="ENVMAP_TYPE_CUBE";break;case tr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ym(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Pi:e="ENVMAP_MODE_REFRACTION";break}return e}function bm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ol:e="ENVMAP_BLENDING_MULTIPLY";break;case th:e="ENVMAP_BLENDING_MIX";break;case nh:e="ENVMAP_BLENDING_ADD";break}return e}function Em(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Tm(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Mm(t),c=Sm(t),h=ym(t),u=bm(t),f=Em(t),p=dm(t),g=fm(r),M=s.createProgram();let m,d,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ji).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ji).join(`
`),d.length>0&&(d+=`
`)):(m=[ul(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ji).join(`
`),d=[ul(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Vn?"#define TONE_MAPPING":"",t.toneMapping!==Vn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Vn?hm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,cm("linearToOutputTexel",t.outputColorSpace),um(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ji).join(`
`)),o=Fo(o),o=ll(o,t),o=cl(o,t),a=Fo(a),a=ll(a,t),a=cl(a,t),o=hl(o),a=hl(a),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===xa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===xa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const E=T+m+o,v=T+d+a,A=rl(s,s.VERTEX_SHADER,E),w=rl(s,s.FRAGMENT_SHADER,v);s.attachShader(M,A),s.attachShader(M,w),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function C(U){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(M)||"",H=s.getShaderInfoLog(A)||"",j=s.getShaderInfoLog(w)||"",L=D.trim(),V=H.trim(),Z=j.trim();let q=!0,re=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,M,A,w);else{const ce=al(s,A,"vertex"),ye=al(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+L+`
`+ce+`
`+ye)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(V===""||Z==="")&&(re=!1);re&&(U.diagnostics={runnable:q,programLog:L,vertexShader:{log:V,prefix:m},fragmentShader:{log:Z,prefix:d}})}s.deleteShader(A),s.deleteShader(w),N=new Ks(s,M),y=pm(s,M)}let N;this.getUniforms=function(){return N===void 0&&C(this),N};let y;this.getAttributes=function(){return y===void 0&&C(this),y};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(M,rm)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=om++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=A,this.fragmentShader=w,this}let wm=0;class Am{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Rm(e),t.set(e,n)),n}}class Rm{constructor(e){this.id=wm++,this.code=e,this.usedTimes=0}}function Cm(i,e,t,n,s,r,o){const a=new Jo,l=new Am,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,b,U,D,H){const j=D.fog,L=H.geometry,V=y.isMeshStandardMaterial?D.environment:null,Z=(y.isMeshStandardMaterial?t:e).get(y.envMap||V),q=Z&&Z.mapping===tr?Z.image.height:null,re=g[y.type];y.precision!==null&&(p=s.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const ce=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,ye=ce!==void 0?ce.length:0;let ke=0;L.morphAttributes.position!==void 0&&(ke=1),L.morphAttributes.normal!==void 0&&(ke=2),L.morphAttributes.color!==void 0&&(ke=3);let De,Ze,Qe,J;if(re){const et=un[re];De=et.vertexShader,Ze=et.fragmentShader}else De=y.vertexShader,Ze=y.fragmentShader,l.update(y),Qe=l.getVertexShaderID(y),J=l.getFragmentShaderID(y);const ee=i.getRenderTarget(),ge=i.state.buffers.depth.getReversed(),Fe=H.isInstancedMesh===!0,Ae=H.isBatchedMesh===!0,je=!!y.map,Ct=!!y.matcap,I=!!Z,ot=!!y.aoMap,ze=!!y.lightMap,Ie=!!y.bumpMap,xe=!!y.normalMap,at=!!y.displacementMap,Me=!!y.emissiveMap,We=!!y.metalnessMap,Et=!!y.roughnessMap,pt=y.anisotropy>0,R=y.clearcoat>0,_=y.dispersion>0,z=y.iridescence>0,K=y.sheen>0,Q=y.transmission>0,Y=pt&&!!y.anisotropyMap,we=R&&!!y.clearcoatMap,oe=R&&!!y.clearcoatNormalMap,Se=R&&!!y.clearcoatRoughnessMap,be=z&&!!y.iridescenceMap,ie=z&&!!y.iridescenceThicknessMap,de=K&&!!y.sheenColorMap,Le=K&&!!y.sheenRoughnessMap,Ee=!!y.specularMap,he=!!y.specularColorMap,Ve=!!y.specularIntensityMap,F=Q&&!!y.transmissionMap,se=Q&&!!y.thicknessMap,ae=!!y.gradientMap,me=!!y.alphaMap,te=y.alphaTest>0,$=!!y.alphaHash,ve=!!y.extensions;let Oe=Vn;y.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Oe=i.toneMapping);const st={shaderID:re,shaderType:y.type,shaderName:y.name,vertexShader:De,fragmentShader:Ze,defines:y.defines,customVertexShaderID:Qe,customFragmentShaderID:J,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Ae,batchingColor:Ae&&H._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&H.instanceColor!==null,instancingMorph:Fe&&H.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ee===null?i.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Li,alphaToCoverage:!!y.alphaToCoverage,map:je,matcap:Ct,envMap:I,envMapMode:I&&Z.mapping,envMapCubeUVHeight:q,aoMap:ot,lightMap:ze,bumpMap:Ie,normalMap:xe,displacementMap:f&&at,emissiveMap:Me,normalMapObjectSpace:xe&&y.normalMapType===oh,normalMapTangentSpace:xe&&y.normalMapType===Ql,metalnessMap:We,roughnessMap:Et,anisotropy:pt,anisotropyMap:Y,clearcoat:R,clearcoatMap:we,clearcoatNormalMap:oe,clearcoatRoughnessMap:Se,dispersion:_,iridescence:z,iridescenceMap:be,iridescenceThicknessMap:ie,sheen:K,sheenColorMap:de,sheenRoughnessMap:Le,specularMap:Ee,specularColorMap:he,specularIntensityMap:Ve,transmission:Q,transmissionMap:F,thicknessMap:se,gradientMap:ae,opaque:y.transparent===!1&&y.blending===ri&&y.alphaToCoverage===!1,alphaMap:me,alphaTest:te,alphaHash:$,combine:y.combine,mapUv:je&&M(y.map.channel),aoMapUv:ot&&M(y.aoMap.channel),lightMapUv:ze&&M(y.lightMap.channel),bumpMapUv:Ie&&M(y.bumpMap.channel),normalMapUv:xe&&M(y.normalMap.channel),displacementMapUv:at&&M(y.displacementMap.channel),emissiveMapUv:Me&&M(y.emissiveMap.channel),metalnessMapUv:We&&M(y.metalnessMap.channel),roughnessMapUv:Et&&M(y.roughnessMap.channel),anisotropyMapUv:Y&&M(y.anisotropyMap.channel),clearcoatMapUv:we&&M(y.clearcoatMap.channel),clearcoatNormalMapUv:oe&&M(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&M(y.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&M(y.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&M(y.iridescenceThicknessMap.channel),sheenColorMapUv:de&&M(y.sheenColorMap.channel),sheenRoughnessMapUv:Le&&M(y.sheenRoughnessMap.channel),specularMapUv:Ee&&M(y.specularMap.channel),specularColorMapUv:he&&M(y.specularColorMap.channel),specularIntensityMapUv:Ve&&M(y.specularIntensityMap.channel),transmissionMapUv:F&&M(y.transmissionMap.channel),thicknessMapUv:se&&M(y.thicknessMap.channel),alphaMapUv:me&&M(y.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(xe||pt),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!L.attributes.uv&&(je||me),fog:!!j,useFog:y.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ge,skinning:H.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:ke,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:Oe,decodeVideoTexture:je&&y.map.isVideoTexture===!0&&Je.getTransfer(y.map.colorSpace)===tt,decodeVideoTextureEmissive:Me&&y.emissiveMap.isVideoTexture===!0&&Je.getTransfer(y.emissiveMap.colorSpace)===tt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===rn,flipSided:y.side===Ft,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ve&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ve&&y.extensions.multiDraw===!0||Ae)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return st.vertexUv1s=c.has(1),st.vertexUv2s=c.has(2),st.vertexUv3s=c.has(3),c.clear(),st}function d(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const U in y.defines)b.push(U),b.push(y.defines[U]);return y.isRawShaderMaterial===!1&&(T(b,y),E(b,y),b.push(i.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function T(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function E(y,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),y.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),y.push(a.mask)}function v(y){const b=g[y.type];let U;if(b){const D=un[b];U=as.clone(D.uniforms)}else U=y.uniforms;return U}function A(y,b){let U;for(let D=0,H=h.length;D<H;D++){const j=h[D];if(j.cacheKey===b){U=j,++U.usedTimes;break}}return U===void 0&&(U=new Tm(i,b,y,r),h.push(U)),U}function w(y){if(--y.usedTimes===0){const b=h.indexOf(y);h[b]=h[h.length-1],h.pop(),y.destroy()}}function C(y){l.remove(y)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:v,acquireProgram:A,releaseProgram:w,releaseShaderCache:C,programs:h,dispose:N}}function Pm(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Lm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function dl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function fl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,f,p,g,M,m){let d=i[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:M,group:m},i[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=M,d.group=m),e++,d}function a(u,f,p,g,M,m){const d=o(u,f,p,g,M,m);p.transmission>0?n.push(d):p.transparent===!0?s.push(d):t.push(d)}function l(u,f,p,g,M,m){const d=o(u,f,p,g,M,m);p.transmission>0?n.unshift(d):p.transparent===!0?s.unshift(d):t.unshift(d)}function c(u,f){t.length>1&&t.sort(u||Lm),n.length>1&&n.sort(f||dl),s.length>1&&s.sort(f||dl)}function h(){for(let u=e,f=i.length;u<f;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Dm(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new fl,i.set(n,[o])):s>=r.length?(o=new fl,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Im(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new pe};break;case"SpotLight":t={position:new P,direction:new P,color:new pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new pe,groundColor:new pe};break;case"RectAreaLight":t={color:new pe,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function Um(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Nm=0;function Fm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Om(i){const e=new Im,t=Um(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);const s=new P,r=new ft,o=new ft;function a(c){let h=0,u=0,f=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let p=0,g=0,M=0,m=0,d=0,T=0,E=0,v=0,A=0,w=0,C=0;c.sort(Fm);for(let y=0,b=c.length;y<b;y++){const U=c[y],D=U.color,H=U.intensity,j=U.distance,L=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)h+=D.r*H,u+=D.g*H,f+=D.b*H;else if(U.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(U.sh.coefficients[V],H);C++}else if(U.isDirectionalLight){const V=e.get(U);if(V.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const Z=U.shadow,q=t.get(U);q.shadowIntensity=Z.intensity,q.shadowBias=Z.bias,q.shadowNormalBias=Z.normalBias,q.shadowRadius=Z.radius,q.shadowMapSize=Z.mapSize,n.directionalShadow[p]=q,n.directionalShadowMap[p]=L,n.directionalShadowMatrix[p]=U.shadow.matrix,T++}n.directional[p]=V,p++}else if(U.isSpotLight){const V=e.get(U);V.position.setFromMatrixPosition(U.matrixWorld),V.color.copy(D).multiplyScalar(H),V.distance=j,V.coneCos=Math.cos(U.angle),V.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),V.decay=U.decay,n.spot[M]=V;const Z=U.shadow;if(U.map&&(n.spotLightMap[A]=U.map,A++,Z.updateMatrices(U),U.castShadow&&w++),n.spotLightMatrix[M]=Z.matrix,U.castShadow){const q=t.get(U);q.shadowIntensity=Z.intensity,q.shadowBias=Z.bias,q.shadowNormalBias=Z.normalBias,q.shadowRadius=Z.radius,q.shadowMapSize=Z.mapSize,n.spotShadow[M]=q,n.spotShadowMap[M]=L,v++}M++}else if(U.isRectAreaLight){const V=e.get(U);V.color.copy(D).multiplyScalar(H),V.halfWidth.set(U.width*.5,0,0),V.halfHeight.set(0,U.height*.5,0),n.rectArea[m]=V,m++}else if(U.isPointLight){const V=e.get(U);if(V.color.copy(U.color).multiplyScalar(U.intensity),V.distance=U.distance,V.decay=U.decay,U.castShadow){const Z=U.shadow,q=t.get(U);q.shadowIntensity=Z.intensity,q.shadowBias=Z.bias,q.shadowNormalBias=Z.normalBias,q.shadowRadius=Z.radius,q.shadowMapSize=Z.mapSize,q.shadowCameraNear=Z.camera.near,q.shadowCameraFar=Z.camera.far,n.pointShadow[g]=q,n.pointShadowMap[g]=L,n.pointShadowMatrix[g]=U.shadow.matrix,E++}n.point[g]=V,g++}else if(U.isHemisphereLight){const V=e.get(U);V.skyColor.copy(U.color).multiplyScalar(H),V.groundColor.copy(U.groundColor).multiplyScalar(H),n.hemi[d]=V,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=le.LTC_FLOAT_1,n.rectAreaLTC2=le.LTC_FLOAT_2):(n.rectAreaLTC1=le.LTC_HALF_1,n.rectAreaLTC2=le.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const N=n.hash;(N.directionalLength!==p||N.pointLength!==g||N.spotLength!==M||N.rectAreaLength!==m||N.hemiLength!==d||N.numDirectionalShadows!==T||N.numPointShadows!==E||N.numSpotShadows!==v||N.numSpotMaps!==A||N.numLightProbes!==C)&&(n.directional.length=p,n.spot.length=M,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=v+A-w,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=C,N.directionalLength=p,N.pointLength=g,N.spotLength=M,N.rectAreaLength=m,N.hemiLength=d,N.numDirectionalShadows=T,N.numPointShadows=E,N.numSpotShadows=v,N.numSpotMaps=A,N.numLightProbes=C,n.version=Nm++)}function l(c,h){let u=0,f=0,p=0,g=0,M=0;const m=h.matrixWorldInverse;for(let d=0,T=c.length;d<T;d++){const E=c[d];if(E.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),u++}else if(E.isSpotLight){const v=n.spot[p];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(E.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(E.width*.5,0,0),v.halfHeight.set(0,E.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),f++}else if(E.isHemisphereLight){const v=n.hemi[M];v.direction.setFromMatrixPosition(E.matrixWorld),v.direction.transformDirection(m),M++}}}return{setup:a,setupView:l,state:n}}function pl(i){const e=new Om(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Bm(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new pl(i),e.set(s,[a])):r>=o.length?(a=new pl(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const km=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zm=`uniform sampler2D shadow_pass;
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
}`;function Hm(i,e,t){let n=new Zo;const s=new Te,r=new Te,o=new dt,a=new au({depthPacking:rh}),l=new lu,c={},h=t.maxTextureSize,u={[Gn]:Ft,[Ft]:Gn,[rn]:rn},f=new Rt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Te},radius:{value:4}},vertexShader:km,fragmentShader:zm}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new Vt;g.setAttribute("position",new jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new He(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nl;let d=this.type;this.render=function(w,C,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const y=i.getRenderTarget(),b=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),D=i.state;D.setBlending(wn),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const H=d!==yn&&this.type===yn,j=d===yn&&this.type!==yn;for(let L=0,V=w.length;L<V;L++){const Z=w[L],q=Z.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);const re=q.getFrameExtents();if(s.multiply(re),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/re.x),s.x=r.x*re.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/re.y),s.y=r.y*re.y,q.mapSize.y=r.y)),q.map===null||H===!0||j===!0){const ye=this.type!==yn?{minFilter:an,magFilter:an}:{};q.map!==null&&q.map.dispose(),q.map=new ln(s.x,s.y,ye),q.map.texture.name=Z.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();const ce=q.getViewportCount();for(let ye=0;ye<ce;ye++){const ke=q.getViewport(ye);o.set(r.x*ke.x,r.y*ke.y,r.x*ke.z,r.y*ke.w),D.viewport(o),q.updateMatrices(Z,ye),n=q.getFrustum(),v(C,N,q.camera,Z,this.type)}q.isPointLightShadow!==!0&&this.type===yn&&T(q,N),q.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(y,b,U)};function T(w,C){const N=e.update(M);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ln(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(C,null,N,f,M,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(C,null,N,p,M,null)}function E(w,C,N,y){let b=null;const U=N.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(U!==void 0)b=U;else if(b=N.isPointLight===!0?l:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const D=b.uuid,H=C.uuid;let j=c[D];j===void 0&&(j={},c[D]=j);let L=j[H];L===void 0&&(L=b.clone(),j[H]=L,C.addEventListener("dispose",A)),b=L}if(b.visible=C.visible,b.wireframe=C.wireframe,y===yn?b.side=C.shadowSide!==null?C.shadowSide:C.side:b.side=C.shadowSide!==null?C.shadowSide:u[C.side],b.alphaMap=C.alphaMap,b.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,b.map=C.map,b.clipShadows=C.clipShadows,b.clippingPlanes=C.clippingPlanes,b.clipIntersection=C.clipIntersection,b.displacementMap=C.displacementMap,b.displacementScale=C.displacementScale,b.displacementBias=C.displacementBias,b.wireframeLinewidth=C.wireframeLinewidth,b.linewidth=C.linewidth,N.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const D=i.properties.get(b);D.light=N}return b}function v(w,C,N,y,b){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===yn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,w.matrixWorld);const H=e.update(w),j=w.material;if(Array.isArray(j)){const L=H.groups;for(let V=0,Z=L.length;V<Z;V++){const q=L[V],re=j[q.materialIndex];if(re&&re.visible){const ce=E(w,re,y,b);w.onBeforeShadow(i,w,C,N,H,ce,q),i.renderBufferDirect(N,null,H,ce,w,q),w.onAfterShadow(i,w,C,N,H,ce,q)}}}else if(j.visible){const L=E(w,j,y,b);w.onBeforeShadow(i,w,C,N,H,L,null),i.renderBufferDirect(N,null,H,L,w,null),w.onAfterShadow(i,w,C,N,H,L,null)}}const D=w.children;for(let H=0,j=D.length;H<j;H++)v(D[H],C,N,y,b)}function A(w){w.target.removeEventListener("dispose",A);for(const N in c){const y=c[N],b=w.target.uuid;b in y&&(y[b].dispose(),delete y[b])}}}const Vm={[Kr]:Jr,[$r]:eo,[Zr]:to,[Ri]:Qr,[Jr]:Kr,[eo]:$r,[to]:Zr,[Qr]:Ri};function Gm(i,e){function t(){let F=!1;const se=new dt;let ae=null;const me=new dt(0,0,0,0);return{setMask:function(te){ae!==te&&!F&&(i.colorMask(te,te,te,te),ae=te)},setLocked:function(te){F=te},setClear:function(te,$,ve,Oe,st){st===!0&&(te*=Oe,$*=Oe,ve*=Oe),se.set(te,$,ve,Oe),me.equals(se)===!1&&(i.clearColor(te,$,ve,Oe),me.copy(se))},reset:function(){F=!1,ae=null,me.set(-1,0,0,0)}}}function n(){let F=!1,se=!1,ae=null,me=null,te=null;return{setReversed:function($){if(se!==$){const ve=e.get("EXT_clip_control");$?ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.ZERO_TO_ONE_EXT):ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.NEGATIVE_ONE_TO_ONE_EXT),se=$;const Oe=te;te=null,this.setClear(Oe)}},getReversed:function(){return se},setTest:function($){$?ee(i.DEPTH_TEST):ge(i.DEPTH_TEST)},setMask:function($){ae!==$&&!F&&(i.depthMask($),ae=$)},setFunc:function($){if(se&&($=Vm[$]),me!==$){switch($){case Kr:i.depthFunc(i.NEVER);break;case Jr:i.depthFunc(i.ALWAYS);break;case $r:i.depthFunc(i.LESS);break;case Ri:i.depthFunc(i.LEQUAL);break;case Zr:i.depthFunc(i.EQUAL);break;case Qr:i.depthFunc(i.GEQUAL);break;case eo:i.depthFunc(i.GREATER);break;case to:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=$}},setLocked:function($){F=$},setClear:function($){te!==$&&(se&&($=1-$),i.clearDepth($),te=$)},reset:function(){F=!1,ae=null,me=null,te=null,se=!1}}}function s(){let F=!1,se=null,ae=null,me=null,te=null,$=null,ve=null,Oe=null,st=null;return{setTest:function(et){F||(et?ee(i.STENCIL_TEST):ge(i.STENCIL_TEST))},setMask:function(et){se!==et&&!F&&(i.stencilMask(et),se=et)},setFunc:function(et,mn,cn){(ae!==et||me!==mn||te!==cn)&&(i.stencilFunc(et,mn,cn),ae=et,me=mn,te=cn)},setOp:function(et,mn,cn){($!==et||ve!==mn||Oe!==cn)&&(i.stencilOp(et,mn,cn),$=et,ve=mn,Oe=cn)},setLocked:function(et){F=et},setClear:function(et){st!==et&&(i.clearStencil(et),st=et)},reset:function(){F=!1,se=null,ae=null,me=null,te=null,$=null,ve=null,Oe=null,st=null}}}const r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,p=[],g=null,M=!1,m=null,d=null,T=null,E=null,v=null,A=null,w=null,C=new pe(0,0,0),N=0,y=!1,b=null,U=null,D=null,H=null,j=null;const L=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,Z=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(q)[1]),V=Z>=1):q.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),V=Z>=2);let re=null,ce={};const ye=i.getParameter(i.SCISSOR_BOX),ke=i.getParameter(i.VIEWPORT),De=new dt().fromArray(ye),Ze=new dt().fromArray(ke);function Qe(F,se,ae,me){const te=new Uint8Array(4),$=i.createTexture();i.bindTexture(F,$),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ve=0;ve<ae;ve++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,te):i.texImage2D(se+ve,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,te);return $}const J={};J[i.TEXTURE_2D]=Qe(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=Qe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=Qe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=Qe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ee(i.DEPTH_TEST),o.setFunc(Ri),Ie(!1),xe(pa),ee(i.CULL_FACE),ot(wn);function ee(F){h[F]!==!0&&(i.enable(F),h[F]=!0)}function ge(F){h[F]!==!1&&(i.disable(F),h[F]=!1)}function Fe(F,se){return u[F]!==se?(i.bindFramebuffer(F,se),u[F]=se,F===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=se),F===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=se),!0):!1}function Ae(F,se){let ae=p,me=!1;if(F){ae=f.get(se),ae===void 0&&(ae=[],f.set(se,ae));const te=F.textures;if(ae.length!==te.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let $=0,ve=te.length;$<ve;$++)ae[$]=i.COLOR_ATTACHMENT0+$;ae.length=te.length,me=!0}}else ae[0]!==i.BACK&&(ae[0]=i.BACK,me=!0);me&&i.drawBuffers(ae)}function je(F){return g!==F?(i.useProgram(F),g=F,!0):!1}const Ct={[ti]:i.FUNC_ADD,[Bc]:i.FUNC_SUBTRACT,[kc]:i.FUNC_REVERSE_SUBTRACT};Ct[zc]=i.MIN,Ct[Hc]=i.MAX;const I={[Vc]:i.ZERO,[Gc]:i.ONE,[Wc]:i.SRC_COLOR,[jr]:i.SRC_ALPHA,[Jc]:i.SRC_ALPHA_SATURATE,[Yc]:i.DST_COLOR,[qc]:i.DST_ALPHA,[Xc]:i.ONE_MINUS_SRC_COLOR,[Yr]:i.ONE_MINUS_SRC_ALPHA,[Kc]:i.ONE_MINUS_DST_COLOR,[jc]:i.ONE_MINUS_DST_ALPHA,[$c]:i.CONSTANT_COLOR,[Zc]:i.ONE_MINUS_CONSTANT_COLOR,[Qc]:i.CONSTANT_ALPHA,[eh]:i.ONE_MINUS_CONSTANT_ALPHA};function ot(F,se,ae,me,te,$,ve,Oe,st,et){if(F===wn){M===!0&&(ge(i.BLEND),M=!1);return}if(M===!1&&(ee(i.BLEND),M=!0),F!==Oc){if(F!==m||et!==y){if((d!==ti||v!==ti)&&(i.blendEquation(i.FUNC_ADD),d=ti,v=ti),et)switch(F){case ri:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qr:i.blendFunc(i.ONE,i.ONE);break;case ma:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ga:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case ri:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ma:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ga:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}T=null,E=null,A=null,w=null,C.set(0,0,0),N=0,m=F,y=et}return}te=te||se,$=$||ae,ve=ve||me,(se!==d||te!==v)&&(i.blendEquationSeparate(Ct[se],Ct[te]),d=se,v=te),(ae!==T||me!==E||$!==A||ve!==w)&&(i.blendFuncSeparate(I[ae],I[me],I[$],I[ve]),T=ae,E=me,A=$,w=ve),(Oe.equals(C)===!1||st!==N)&&(i.blendColor(Oe.r,Oe.g,Oe.b,st),C.copy(Oe),N=st),m=F,y=!1}function ze(F,se){F.side===rn?ge(i.CULL_FACE):ee(i.CULL_FACE);let ae=F.side===Ft;se&&(ae=!ae),Ie(ae),F.blending===ri&&F.transparent===!1?ot(wn):ot(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);const me=F.stencilWrite;a.setTest(me),me&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Me(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ee(i.SAMPLE_ALPHA_TO_COVERAGE):ge(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(F){b!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),b=F)}function xe(F){F!==Nc?(ee(i.CULL_FACE),F!==U&&(F===pa?i.cullFace(i.BACK):F===Fc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ge(i.CULL_FACE),U=F}function at(F){F!==D&&(V&&i.lineWidth(F),D=F)}function Me(F,se,ae){F?(ee(i.POLYGON_OFFSET_FILL),(H!==se||j!==ae)&&(i.polygonOffset(se,ae),H=se,j=ae)):ge(i.POLYGON_OFFSET_FILL)}function We(F){F?ee(i.SCISSOR_TEST):ge(i.SCISSOR_TEST)}function Et(F){F===void 0&&(F=i.TEXTURE0+L-1),re!==F&&(i.activeTexture(F),re=F)}function pt(F,se,ae){ae===void 0&&(re===null?ae=i.TEXTURE0+L-1:ae=re);let me=ce[ae];me===void 0&&(me={type:void 0,texture:void 0},ce[ae]=me),(me.type!==F||me.texture!==se)&&(re!==ae&&(i.activeTexture(ae),re=ae),i.bindTexture(F,se||J[F]),me.type=F,me.texture=se)}function R(){const F=ce[re];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function z(){try{i.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function K(){try{i.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Q(){try{i.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function we(){try{i.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function oe(){try{i.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Se(){try{i.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function be(){try{i.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ie(){try{i.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function de(F){De.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),De.copy(F))}function Le(F){Ze.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),Ze.copy(F))}function Ee(F,se){let ae=c.get(se);ae===void 0&&(ae=new WeakMap,c.set(se,ae));let me=ae.get(F);me===void 0&&(me=i.getUniformBlockIndex(se,F.name),ae.set(F,me))}function he(F,se){const me=c.get(se).get(F);l.get(se)!==me&&(i.uniformBlockBinding(se,me,F.__bindingPointIndex),l.set(se,me))}function Ve(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},re=null,ce={},u={},f=new WeakMap,p=[],g=null,M=!1,m=null,d=null,T=null,E=null,v=null,A=null,w=null,C=new pe(0,0,0),N=0,y=!1,b=null,U=null,D=null,H=null,j=null,De.set(0,0,i.canvas.width,i.canvas.height),Ze.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ee,disable:ge,bindFramebuffer:Fe,drawBuffers:Ae,useProgram:je,setBlending:ot,setMaterial:ze,setFlipSided:Ie,setCullFace:xe,setLineWidth:at,setPolygonOffset:Me,setScissorTest:We,activeTexture:Et,bindTexture:pt,unbindTexture:R,compressedTexImage2D:_,compressedTexImage3D:z,texImage2D:be,texImage3D:ie,updateUBOMapping:Ee,uniformBlockBinding:he,texStorage2D:oe,texStorage3D:Se,texSubImage2D:K,texSubImage3D:Q,compressedTexSubImage2D:Y,compressedTexSubImage3D:we,scissor:de,viewport:Le,reset:Ve}}function Wm(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Te,h=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,_){return p?new OffscreenCanvas(R,_):Qs("canvas")}function M(R,_,z){let K=1;const Q=pt(R);if((Q.width>z||Q.height>z)&&(K=z/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Y=Math.floor(K*Q.width),we=Math.floor(K*Q.height);u===void 0&&(u=g(Y,we));const oe=_?g(Y,we):u;return oe.width=Y,oe.height=we,oe.getContext("2d").drawImage(R,0,0,Y,we),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Y+"x"+we+")."),oe}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),R;return R}function m(R){return R.generateMipmaps}function d(R){i.generateMipmap(R)}function T(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(R,_,z,K,Q=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Y=_;if(_===i.RED&&(z===i.FLOAT&&(Y=i.R32F),z===i.HALF_FLOAT&&(Y=i.R16F),z===i.UNSIGNED_BYTE&&(Y=i.R8)),_===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(Y=i.R8UI),z===i.UNSIGNED_SHORT&&(Y=i.R16UI),z===i.UNSIGNED_INT&&(Y=i.R32UI),z===i.BYTE&&(Y=i.R8I),z===i.SHORT&&(Y=i.R16I),z===i.INT&&(Y=i.R32I)),_===i.RG&&(z===i.FLOAT&&(Y=i.RG32F),z===i.HALF_FLOAT&&(Y=i.RG16F),z===i.UNSIGNED_BYTE&&(Y=i.RG8)),_===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(Y=i.RG8UI),z===i.UNSIGNED_SHORT&&(Y=i.RG16UI),z===i.UNSIGNED_INT&&(Y=i.RG32UI),z===i.BYTE&&(Y=i.RG8I),z===i.SHORT&&(Y=i.RG16I),z===i.INT&&(Y=i.RG32I)),_===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),z===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),z===i.UNSIGNED_INT&&(Y=i.RGB32UI),z===i.BYTE&&(Y=i.RGB8I),z===i.SHORT&&(Y=i.RGB16I),z===i.INT&&(Y=i.RGB32I)),_===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),z===i.UNSIGNED_INT&&(Y=i.RGBA32UI),z===i.BYTE&&(Y=i.RGBA8I),z===i.SHORT&&(Y=i.RGBA16I),z===i.INT&&(Y=i.RGBA32I)),_===i.RGB&&(z===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),_===i.RGBA){const we=Q?$s:Je.getTransfer(K);z===i.FLOAT&&(Y=i.RGBA32F),z===i.HALF_FLOAT&&(Y=i.RGBA16F),z===i.UNSIGNED_BYTE&&(Y=we===tt?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function v(R,_){let z;return R?_===null||_===oi||_===ns?z=i.DEPTH24_STENCIL8:_===En?z=i.DEPTH32F_STENCIL8:_===ts&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===oi||_===ns?z=i.DEPTH_COMPONENT24:_===En?z=i.DEPTH_COMPONENT32F:_===ts&&(z=i.DEPTH_COMPONENT16),z}function A(R,_){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==an&&R.minFilter!==Qt?Math.log2(Math.max(_.width,_.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?_.mipmaps.length:1}function w(R){const _=R.target;_.removeEventListener("dispose",w),N(_),_.isVideoTexture&&h.delete(_)}function C(R){const _=R.target;_.removeEventListener("dispose",C),b(_)}function N(R){const _=n.get(R);if(_.__webglInit===void 0)return;const z=R.source,K=f.get(z);if(K){const Q=K[_.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&y(R),Object.keys(K).length===0&&f.delete(z)}n.remove(R)}function y(R){const _=n.get(R);i.deleteTexture(_.__webglTexture);const z=R.source,K=f.get(z);delete K[_.__cacheKey],o.memory.textures--}function b(R){const _=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(_.__webglFramebuffer[K]))for(let Q=0;Q<_.__webglFramebuffer[K].length;Q++)i.deleteFramebuffer(_.__webglFramebuffer[K][Q]);else i.deleteFramebuffer(_.__webglFramebuffer[K]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[K])}else{if(Array.isArray(_.__webglFramebuffer))for(let K=0;K<_.__webglFramebuffer.length;K++)i.deleteFramebuffer(_.__webglFramebuffer[K]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let K=0;K<_.__webglColorRenderbuffer.length;K++)_.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[K]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const z=R.textures;for(let K=0,Q=z.length;K<Q;K++){const Y=n.get(z[K]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),o.memory.textures--),n.remove(z[K])}n.remove(R)}let U=0;function D(){U=0}function H(){const R=U;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),U+=1,R}function j(R){const _=[];return _.push(R.wrapS),_.push(R.wrapT),_.push(R.wrapR||0),_.push(R.magFilter),_.push(R.minFilter),_.push(R.anisotropy),_.push(R.internalFormat),_.push(R.format),_.push(R.type),_.push(R.generateMipmaps),_.push(R.premultiplyAlpha),_.push(R.flipY),_.push(R.unpackAlignment),_.push(R.colorSpace),_.join()}function L(R,_){const z=n.get(R);if(R.isVideoTexture&&We(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&z.__version!==R.version){const K=R.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(z,R,_);return}}else R.isExternalTexture&&(z.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+_)}function V(R,_){const z=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){J(z,R,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+_)}function Z(R,_){const z=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){J(z,R,_);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+_)}function q(R,_){const z=n.get(R);if(R.version>0&&z.__version!==R.version){ee(z,R,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+_)}const re={[so]:i.REPEAT,[ii]:i.CLAMP_TO_EDGE,[ro]:i.MIRRORED_REPEAT},ce={[an]:i.NEAREST,[ih]:i.NEAREST_MIPMAP_NEAREST,[ps]:i.NEAREST_MIPMAP_LINEAR,[Qt]:i.LINEAR,[rr]:i.LINEAR_MIPMAP_NEAREST,[si]:i.LINEAR_MIPMAP_LINEAR},ye={[ah]:i.NEVER,[fh]:i.ALWAYS,[lh]:i.LESS,[ec]:i.LEQUAL,[ch]:i.EQUAL,[dh]:i.GEQUAL,[hh]:i.GREATER,[uh]:i.NOTEQUAL};function ke(R,_){if(_.type===En&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Qt||_.magFilter===rr||_.magFilter===ps||_.magFilter===si||_.minFilter===Qt||_.minFilter===rr||_.minFilter===ps||_.minFilter===si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,re[_.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,re[_.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,re[_.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,ce[_.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,ce[_.minFilter]),_.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,ye[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===an||_.minFilter!==ps&&_.minFilter!==si||_.type===En&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function De(R,_){let z=!1;R.__webglInit===void 0&&(R.__webglInit=!0,_.addEventListener("dispose",w));const K=_.source;let Q=f.get(K);Q===void 0&&(Q={},f.set(K,Q));const Y=j(_);if(Y!==R.__cacheKey){Q[Y]===void 0&&(Q[Y]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),Q[Y].usedTimes++;const we=Q[R.__cacheKey];we!==void 0&&(Q[R.__cacheKey].usedTimes--,we.usedTimes===0&&y(_)),R.__cacheKey=Y,R.__webglTexture=Q[Y].texture}return z}function Ze(R,_,z){return Math.floor(Math.floor(R/z)/_)}function Qe(R,_,z,K){const Y=R.updateRanges;if(Y.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,z,K,_.data);else{Y.sort((ie,de)=>ie.start-de.start);let we=0;for(let ie=1;ie<Y.length;ie++){const de=Y[we],Le=Y[ie],Ee=de.start+de.count,he=Ze(Le.start,_.width,4),Ve=Ze(de.start,_.width,4);Le.start<=Ee+1&&he===Ve&&Ze(Le.start+Le.count-1,_.width,4)===he?de.count=Math.max(de.count,Le.start+Le.count-de.start):(++we,Y[we]=Le)}Y.length=we+1;const oe=i.getParameter(i.UNPACK_ROW_LENGTH),Se=i.getParameter(i.UNPACK_SKIP_PIXELS),be=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let ie=0,de=Y.length;ie<de;ie++){const Le=Y[ie],Ee=Math.floor(Le.start/4),he=Math.ceil(Le.count/4),Ve=Ee%_.width,F=Math.floor(Ee/_.width),se=he,ae=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ve),i.pixelStorei(i.UNPACK_SKIP_ROWS,F),t.texSubImage2D(i.TEXTURE_2D,0,Ve,F,se,ae,z,K,_.data)}R.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,oe),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Se),i.pixelStorei(i.UNPACK_SKIP_ROWS,be)}}function J(R,_,z){let K=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(K=i.TEXTURE_3D);const Q=De(R,_),Y=_.source;t.bindTexture(K,R.__webglTexture,i.TEXTURE0+z);const we=n.get(Y);if(Y.version!==we.__version||Q===!0){t.activeTexture(i.TEXTURE0+z);const oe=Je.getPrimaries(Je.workingColorSpace),Se=_.colorSpace===zn?null:Je.getPrimaries(_.colorSpace),be=_.colorSpace===zn||oe===Se?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);let ie=M(_.image,!1,s.maxTextureSize);ie=Et(_,ie);const de=r.convert(_.format,_.colorSpace),Le=r.convert(_.type);let Ee=E(_.internalFormat,de,Le,_.colorSpace,_.isVideoTexture);ke(K,_);let he;const Ve=_.mipmaps,F=_.isVideoTexture!==!0,se=we.__version===void 0||Q===!0,ae=Y.dataReady,me=A(_,ie);if(_.isDepthTexture)Ee=v(_.format===ss,_.type),se&&(F?t.texStorage2D(i.TEXTURE_2D,1,Ee,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Ee,ie.width,ie.height,0,de,Le,null));else if(_.isDataTexture)if(Ve.length>0){F&&se&&t.texStorage2D(i.TEXTURE_2D,me,Ee,Ve[0].width,Ve[0].height);for(let te=0,$=Ve.length;te<$;te++)he=Ve[te],F?ae&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,he.width,he.height,de,Le,he.data):t.texImage2D(i.TEXTURE_2D,te,Ee,he.width,he.height,0,de,Le,he.data);_.generateMipmaps=!1}else F?(se&&t.texStorage2D(i.TEXTURE_2D,me,Ee,ie.width,ie.height),ae&&Qe(_,ie,de,Le)):t.texImage2D(i.TEXTURE_2D,0,Ee,ie.width,ie.height,0,de,Le,ie.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){F&&se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,me,Ee,Ve[0].width,Ve[0].height,ie.depth);for(let te=0,$=Ve.length;te<$;te++)if(he=Ve[te],_.format!==on)if(de!==null)if(F){if(ae)if(_.layerUpdates.size>0){const ve=Wa(he.width,he.height,_.format,_.type);for(const Oe of _.layerUpdates){const st=he.data.subarray(Oe*ve/he.data.BYTES_PER_ELEMENT,(Oe+1)*ve/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,Oe,he.width,he.height,1,de,st)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,he.width,he.height,ie.depth,de,he.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,te,Ee,he.width,he.height,ie.depth,0,he.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?ae&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,he.width,he.height,ie.depth,de,Le,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,te,Ee,he.width,he.height,ie.depth,0,de,Le,he.data)}else{F&&se&&t.texStorage2D(i.TEXTURE_2D,me,Ee,Ve[0].width,Ve[0].height);for(let te=0,$=Ve.length;te<$;te++)he=Ve[te],_.format!==on?de!==null?F?ae&&t.compressedTexSubImage2D(i.TEXTURE_2D,te,0,0,he.width,he.height,de,he.data):t.compressedTexImage2D(i.TEXTURE_2D,te,Ee,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?ae&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,he.width,he.height,de,Le,he.data):t.texImage2D(i.TEXTURE_2D,te,Ee,he.width,he.height,0,de,Le,he.data)}else if(_.isDataArrayTexture)if(F){if(se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,me,Ee,ie.width,ie.height,ie.depth),ae)if(_.layerUpdates.size>0){const te=Wa(ie.width,ie.height,_.format,_.type);for(const $ of _.layerUpdates){const ve=ie.data.subarray($*te/ie.data.BYTES_PER_ELEMENT,($+1)*te/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$,ie.width,ie.height,1,de,Le,ve)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,de,Le,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ee,ie.width,ie.height,ie.depth,0,de,Le,ie.data);else if(_.isData3DTexture)F?(se&&t.texStorage3D(i.TEXTURE_3D,me,Ee,ie.width,ie.height,ie.depth),ae&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,de,Le,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Ee,ie.width,ie.height,ie.depth,0,de,Le,ie.data);else if(_.isFramebufferTexture){if(se)if(F)t.texStorage2D(i.TEXTURE_2D,me,Ee,ie.width,ie.height);else{let te=ie.width,$=ie.height;for(let ve=0;ve<me;ve++)t.texImage2D(i.TEXTURE_2D,ve,Ee,te,$,0,de,Le,null),te>>=1,$>>=1}}else if(Ve.length>0){if(F&&se){const te=pt(Ve[0]);t.texStorage2D(i.TEXTURE_2D,me,Ee,te.width,te.height)}for(let te=0,$=Ve.length;te<$;te++)he=Ve[te],F?ae&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,de,Le,he):t.texImage2D(i.TEXTURE_2D,te,Ee,de,Le,he);_.generateMipmaps=!1}else if(F){if(se){const te=pt(ie);t.texStorage2D(i.TEXTURE_2D,me,Ee,te.width,te.height)}ae&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,de,Le,ie)}else t.texImage2D(i.TEXTURE_2D,0,Ee,de,Le,ie);m(_)&&d(K),we.__version=Y.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function ee(R,_,z){if(_.image.length!==6)return;const K=De(R,_),Q=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+z);const Y=n.get(Q);if(Q.version!==Y.__version||K===!0){t.activeTexture(i.TEXTURE0+z);const we=Je.getPrimaries(Je.workingColorSpace),oe=_.colorSpace===zn?null:Je.getPrimaries(_.colorSpace),Se=_.colorSpace===zn||we===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const be=_.isCompressedTexture||_.image[0].isCompressedTexture,ie=_.image[0]&&_.image[0].isDataTexture,de=[];for(let $=0;$<6;$++)!be&&!ie?de[$]=M(_.image[$],!0,s.maxCubemapSize):de[$]=ie?_.image[$].image:_.image[$],de[$]=Et(_,de[$]);const Le=de[0],Ee=r.convert(_.format,_.colorSpace),he=r.convert(_.type),Ve=E(_.internalFormat,Ee,he,_.colorSpace),F=_.isVideoTexture!==!0,se=Y.__version===void 0||K===!0,ae=Q.dataReady;let me=A(_,Le);ke(i.TEXTURE_CUBE_MAP,_);let te;if(be){F&&se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ve,Le.width,Le.height);for(let $=0;$<6;$++){te=de[$].mipmaps;for(let ve=0;ve<te.length;ve++){const Oe=te[ve];_.format!==on?Ee!==null?F?ae&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ve,0,0,Oe.width,Oe.height,Ee,Oe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ve,Ve,Oe.width,Oe.height,0,Oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ve,0,0,Oe.width,Oe.height,Ee,he,Oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ve,Ve,Oe.width,Oe.height,0,Ee,he,Oe.data)}}}else{if(te=_.mipmaps,F&&se){te.length>0&&me++;const $=pt(de[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ve,$.width,$.height)}for(let $=0;$<6;$++)if(ie){F?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,de[$].width,de[$].height,Ee,he,de[$].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ve,de[$].width,de[$].height,0,Ee,he,de[$].data);for(let ve=0;ve<te.length;ve++){const st=te[ve].image[$].image;F?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ve+1,0,0,st.width,st.height,Ee,he,st.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ve+1,Ve,st.width,st.height,0,Ee,he,st.data)}}else{F?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Ee,he,de[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ve,Ee,he,de[$]);for(let ve=0;ve<te.length;ve++){const Oe=te[ve];F?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ve+1,0,0,Ee,he,Oe.image[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ve+1,Ve,Ee,he,Oe.image[$])}}}m(_)&&d(i.TEXTURE_CUBE_MAP),Y.__version=Q.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function ge(R,_,z,K,Q,Y){const we=r.convert(z.format,z.colorSpace),oe=r.convert(z.type),Se=E(z.internalFormat,we,oe,z.colorSpace),be=n.get(_),ie=n.get(z);if(ie.__renderTarget=_,!be.__hasExternalTextures){const de=Math.max(1,_.width>>Y),Le=Math.max(1,_.height>>Y);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,Y,Se,de,Le,_.depth,0,we,oe,null):t.texImage2D(Q,Y,Se,de,Le,0,we,oe,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),Me(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Q,ie.__webglTexture,0,at(_)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,Q,ie.__webglTexture,Y),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Fe(R,_,z){if(i.bindRenderbuffer(i.RENDERBUFFER,R),_.depthBuffer){const K=_.depthTexture,Q=K&&K.isDepthTexture?K.type:null,Y=v(_.stencilBuffer,Q),we=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=at(_);Me(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,oe,Y,_.width,_.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,Y,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Y,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,we,i.RENDERBUFFER,R)}else{const K=_.textures;for(let Q=0;Q<K.length;Q++){const Y=K[Q],we=r.convert(Y.format,Y.colorSpace),oe=r.convert(Y.type),Se=E(Y.internalFormat,we,oe,Y.colorSpace),be=at(_);z&&Me(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,be,Se,_.width,_.height):Me(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,be,Se,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Se,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ae(R,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(_.depthTexture);K.__renderTarget=_,(!K.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),L(_.depthTexture,0);const Q=K.__webglTexture,Y=at(_);if(_.depthTexture.format===is)Me(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(_.depthTexture.format===ss)Me(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function je(R){const _=n.get(R),z=R.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==R.depthTexture){const K=R.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),K){const Q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),_.__depthDisposeCallback=Q}_.__boundDepthTexture=K}if(R.depthTexture&&!_.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");const K=R.texture.mipmaps;K&&K.length>0?Ae(_.__webglFramebuffer[0],R):Ae(_.__webglFramebuffer,R)}else if(z){_.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[K]),_.__webglDepthbuffer[K]===void 0)_.__webglDepthbuffer[K]=i.createRenderbuffer(),Fe(_.__webglDepthbuffer[K],R,!1);else{const Q=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=_.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,Y)}}else{const K=R.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Fe(_.__webglDepthbuffer,R,!1);else{const Q=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,Y)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ct(R,_,z){const K=n.get(R);_!==void 0&&ge(K.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&je(R)}function I(R){const _=R.texture,z=n.get(R),K=n.get(_);R.addEventListener("dispose",C);const Q=R.textures,Y=R.isWebGLCubeRenderTarget===!0,we=Q.length>1;if(we||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=_.version,o.memory.textures++),Y){z.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer[oe]=[];for(let Se=0;Se<_.mipmaps.length;Se++)z.__webglFramebuffer[oe][Se]=i.createFramebuffer()}else z.__webglFramebuffer[oe]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer=[];for(let oe=0;oe<_.mipmaps.length;oe++)z.__webglFramebuffer[oe]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(we)for(let oe=0,Se=Q.length;oe<Se;oe++){const be=n.get(Q[oe]);be.__webglTexture===void 0&&(be.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&Me(R)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let oe=0;oe<Q.length;oe++){const Se=Q[oe];z.__webglColorRenderbuffer[oe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[oe]);const be=r.convert(Se.format,Se.colorSpace),ie=r.convert(Se.type),de=E(Se.internalFormat,be,ie,Se.colorSpace,R.isXRRenderTarget===!0),Le=at(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Le,de,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,z.__webglColorRenderbuffer[oe])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Fe(z.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),ke(i.TEXTURE_CUBE_MAP,_);for(let oe=0;oe<6;oe++)if(_.mipmaps&&_.mipmaps.length>0)for(let Se=0;Se<_.mipmaps.length;Se++)ge(z.__webglFramebuffer[oe][Se],R,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Se);else ge(z.__webglFramebuffer[oe],R,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);m(_)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let oe=0,Se=Q.length;oe<Se;oe++){const be=Q[oe],ie=n.get(be);let de=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(de=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(de,ie.__webglTexture),ke(de,be),ge(z.__webglFramebuffer,R,be,i.COLOR_ATTACHMENT0+oe,de,0),m(be)&&d(de)}t.unbindTexture()}else{let oe=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(oe=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(oe,K.__webglTexture),ke(oe,_),_.mipmaps&&_.mipmaps.length>0)for(let Se=0;Se<_.mipmaps.length;Se++)ge(z.__webglFramebuffer[Se],R,_,i.COLOR_ATTACHMENT0,oe,Se);else ge(z.__webglFramebuffer,R,_,i.COLOR_ATTACHMENT0,oe,0);m(_)&&d(oe),t.unbindTexture()}R.depthBuffer&&je(R)}function ot(R){const _=R.textures;for(let z=0,K=_.length;z<K;z++){const Q=_[z];if(m(Q)){const Y=T(R),we=n.get(Q).__webglTexture;t.bindTexture(Y,we),d(Y),t.unbindTexture()}}}const ze=[],Ie=[];function xe(R){if(R.samples>0){if(Me(R)===!1){const _=R.textures,z=R.width,K=R.height;let Q=i.COLOR_BUFFER_BIT;const Y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,we=n.get(R),oe=_.length>1;if(oe)for(let be=0;be<_.length;be++)t.bindFramebuffer(i.FRAMEBUFFER,we.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,we.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer);const Se=R.texture.mipmaps;Se&&Se.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let be=0;be<_.length;be++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),oe){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,we.__webglColorRenderbuffer[be]);const ie=n.get(_[be]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ie,0)}i.blitFramebuffer(0,0,z,K,0,0,z,K,Q,i.NEAREST),l===!0&&(ze.length=0,Ie.length=0,ze.push(i.COLOR_ATTACHMENT0+be),R.depthBuffer&&R.resolveDepthBuffer===!1&&(ze.push(Y),Ie.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ie)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ze))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),oe)for(let be=0;be<_.length;be++){t.bindFramebuffer(i.FRAMEBUFFER,we.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,we.__webglColorRenderbuffer[be]);const ie=n.get(_[be]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,we.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const _=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function at(R){return Math.min(s.maxSamples,R.samples)}function Me(R){const _=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function We(R){const _=o.render.frame;h.get(R)!==_&&(h.set(R,_),R.update())}function Et(R,_){const z=R.colorSpace,K=R.format,Q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||z!==Li&&z!==zn&&(Je.getTransfer(z)===tt?(K!==on||Q!==fn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),_}function pt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=D,this.setTexture2D=L,this.setTexture2DArray=V,this.setTexture3D=Z,this.setTextureCube=q,this.rebindTextures=Ct,this.setupRenderTarget=I,this.updateRenderTargetMipmap=ot,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=je,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=Me}function Xm(i,e){function t(n,s=zn){let r;const o=Je.getTransfer(s);if(n===fn)return i.UNSIGNED_BYTE;if(n===Vo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Go)return i.UNSIGNED_SHORT_5_5_5_1;if(n===jl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Yl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Xl)return i.BYTE;if(n===ql)return i.SHORT;if(n===ts)return i.UNSIGNED_SHORT;if(n===Ho)return i.INT;if(n===oi)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===An)return i.HALF_FLOAT;if(n===Kl)return i.ALPHA;if(n===Jl)return i.RGB;if(n===on)return i.RGBA;if(n===is)return i.DEPTH_COMPONENT;if(n===ss)return i.DEPTH_STENCIL;if(n===$l)return i.RED;if(n===Wo)return i.RED_INTEGER;if(n===Zl)return i.RG;if(n===Xo)return i.RG_INTEGER;if(n===qo)return i.RGBA_INTEGER;if(n===Xs||n===qs||n===js||n===Ys)if(o===tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Xs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Xs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===qs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ys)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===oo||n===ao||n===lo||n===co)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===oo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ao)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===lo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===co)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ho||n===uo||n===fo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ho||n===uo)return o===tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===fo)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===po||n===mo||n===go||n===_o||n===vo||n===xo||n===Mo||n===So||n===yo||n===bo||n===Eo||n===To||n===wo||n===Ao)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===po)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===mo)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===go)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===_o)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===vo)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===xo)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Mo)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===So)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===yo)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===bo)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Eo)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===To)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===wo)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ao)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ro||n===Co||n===Po)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ro)return o===tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Co)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Po)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Lo||n===Do||n===Io||n===Uo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Lo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Do)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Io)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Uo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ns?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const qm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jm=`
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

}`;class Ym{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new dc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Rt({vertexShader:qm,fragmentShader:jm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new He(new Cn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Km extends Ui{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,p=null,g=null;const M=typeof XRWebGLBinding<"u",m=new Ym,d={},T=t.getContextAttributes();let E=null,v=null;const A=[],w=[],C=new Te;let N=null;const y=new $t;y.viewport=new dt;const b=new $t;b.viewport=new dt;const U=[y,b],D=new fu;let H=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ee=A[J];return ee===void 0&&(ee=new wr,A[J]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(J){let ee=A[J];return ee===void 0&&(ee=new wr,A[J]=ee),ee.getGripSpace()},this.getHand=function(J){let ee=A[J];return ee===void 0&&(ee=new wr,A[J]=ee),ee.getHandSpace()};function L(J){const ee=w.indexOf(J.inputSource);if(ee===-1)return;const ge=A[ee];ge!==void 0&&(ge.update(J.inputSource,J.frame,c||o),ge.dispatchEvent({type:J.type,data:J.inputSource}))}function V(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",Z);for(let J=0;J<A.length;J++){const ee=w[J];ee!==null&&(w[J]=null,A[J].disconnect(ee))}H=null,j=null,m.reset();for(const J in d)delete d[J];e.setRenderTarget(E),p=null,f=null,u=null,s=null,v=null,Qe.stop(),n.isPresenting=!1,e.setPixelRatio(N),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u===null&&M&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",V),s.addEventListener("inputsourceschange",Z),T.xrCompatible!==!0&&await t.makeXRCompatible(),N=e.getPixelRatio(),e.getSize(C),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let ge=null,Fe=null,Ae=null;T.depth&&(Ae=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=T.stencil?ss:is,Fe=T.stencil?ns:oi);const je={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(je),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new ln(f.textureWidth,f.textureHeight,{format:on,type:fn,depthTexture:new uc(f.textureWidth,f.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ge={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ge),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new ln(p.framebufferWidth,p.framebufferHeight,{format:on,type:fn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Qe.setContext(s),Qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Z(J){for(let ee=0;ee<J.removed.length;ee++){const ge=J.removed[ee],Fe=w.indexOf(ge);Fe>=0&&(w[Fe]=null,A[Fe].disconnect(ge))}for(let ee=0;ee<J.added.length;ee++){const ge=J.added[ee];let Fe=w.indexOf(ge);if(Fe===-1){for(let je=0;je<A.length;je++)if(je>=w.length){w.push(ge),Fe=je;break}else if(w[je]===null){w[je]=ge,Fe=je;break}if(Fe===-1)break}const Ae=A[Fe];Ae&&Ae.connect(ge)}}const q=new P,re=new P;function ce(J,ee,ge){q.setFromMatrixPosition(ee.matrixWorld),re.setFromMatrixPosition(ge.matrixWorld);const Fe=q.distanceTo(re),Ae=ee.projectionMatrix.elements,je=ge.projectionMatrix.elements,Ct=Ae[14]/(Ae[10]-1),I=Ae[14]/(Ae[10]+1),ot=(Ae[9]+1)/Ae[5],ze=(Ae[9]-1)/Ae[5],Ie=(Ae[8]-1)/Ae[0],xe=(je[8]+1)/je[0],at=Ct*Ie,Me=Ct*xe,We=Fe/(-Ie+xe),Et=We*-Ie;if(ee.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Et),J.translateZ(We),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Ae[10]===-1)J.projectionMatrix.copy(ee.projectionMatrix),J.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const pt=Ct+We,R=I+We,_=at-Et,z=Me+(Fe-Et),K=ot*I/R*pt,Q=ze*I/R*pt;J.projectionMatrix.makePerspective(_,z,K,Q,pt,R),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function ye(J,ee){ee===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ee.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let ee=J.near,ge=J.far;m.texture!==null&&(m.depthNear>0&&(ee=m.depthNear),m.depthFar>0&&(ge=m.depthFar)),D.near=b.near=y.near=ee,D.far=b.far=y.far=ge,(H!==D.near||j!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),H=D.near,j=D.far),D.layers.mask=J.layers.mask|6,y.layers.mask=D.layers.mask&3,b.layers.mask=D.layers.mask&5;const Fe=J.parent,Ae=D.cameras;ye(D,Fe);for(let je=0;je<Ae.length;je++)ye(Ae[je],Fe);Ae.length===2?ce(D,y,b):D.projectionMatrix.copy(y.projectionMatrix),ke(J,D,Fe)};function ke(J,ee,ge){ge===null?J.matrix.copy(ee.matrixWorld):(J.matrix.copy(ge.matrixWorld),J.matrix.invert(),J.matrix.multiply(ee.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ee.projectionMatrix),J.projectionMatrixInverse.copy(ee.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=rs*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(J){l=J,f!==null&&(f.fixedFoveation=J),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(J){return d[J]};let De=null;function Ze(J,ee){if(h=ee.getViewerPose(c||o),g=ee,h!==null){const ge=h.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let Fe=!1;ge.length!==D.cameras.length&&(D.cameras.length=0,Fe=!0);for(let I=0;I<ge.length;I++){const ot=ge[I];let ze=null;if(p!==null)ze=p.getViewport(ot);else{const xe=u.getViewSubImage(f,ot);ze=xe.viewport,I===0&&(e.setRenderTargetTextures(v,xe.colorTexture,xe.depthStencilTexture),e.setRenderTarget(v))}let Ie=U[I];Ie===void 0&&(Ie=new $t,Ie.layers.enable(I),Ie.viewport=new dt,U[I]=Ie),Ie.matrix.fromArray(ot.transform.matrix),Ie.matrix.decompose(Ie.position,Ie.quaternion,Ie.scale),Ie.projectionMatrix.fromArray(ot.projectionMatrix),Ie.projectionMatrixInverse.copy(Ie.projectionMatrix).invert(),Ie.viewport.set(ze.x,ze.y,ze.width,ze.height),I===0&&(D.matrix.copy(Ie.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Fe===!0&&D.cameras.push(Ie)}const Ae=s.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){u=n.getBinding();const I=u.getDepthInformation(ge[0]);I&&I.isValid&&I.texture&&m.init(I,s.renderState)}if(Ae&&Ae.includes("camera-access")&&M){e.state.unbindTexture(),u=n.getBinding();for(let I=0;I<ge.length;I++){const ot=ge[I].camera;if(ot){let ze=d[ot];ze||(ze=new dc,d[ot]=ze);const Ie=u.getCameraImage(ot);ze.sourceTexture=Ie}}}}for(let ge=0;ge<A.length;ge++){const Fe=w[ge],Ae=A[ge];Fe!==null&&Ae!==void 0&&Ae.update(Fe,ee,c||o)}De&&De(J,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),g=null}const Qe=new mc;Qe.setAnimationLoop(Ze),this.setAnimationLoop=function(J){De=J},this.dispose=function(){}}}const $n=new pn,Jm=new ft;function $m(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,oc(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,T,E,v){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,v)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),M(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,T,E):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Ft&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Ft&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const T=e.get(d),E=T.envMap,v=T.envMapRotation;E&&(m.envMap.value=E,$n.copy(v),$n.x*=-1,$n.y*=-1,$n.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&($n.y*=-1,$n.z*=-1),m.envMapRotation.value.setFromMatrix4(Jm.makeRotationFromEuler($n)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,T,E){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*T,m.scale.value=E*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,T){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ft&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function M(m,d){const T=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Zm(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,E){const v=E.program;n.uniformBlockBinding(T,v)}function c(T,E){let v=s[T.id];v===void 0&&(g(T),v=h(T),s[T.id]=v,T.addEventListener("dispose",m));const A=E.program;n.updateUBOMapping(T,A);const w=e.render.frame;r[T.id]!==w&&(f(T),r[T.id]=w)}function h(T){const E=u();T.__bindingPointIndex=E;const v=i.createBuffer(),A=T.__size,w=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,A,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,v),v}function u(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const E=s[T.id],v=T.uniforms,A=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let w=0,C=v.length;w<C;w++){const N=Array.isArray(v[w])?v[w]:[v[w]];for(let y=0,b=N.length;y<b;y++){const U=N[y];if(p(U,w,y,A)===!0){const D=U.__offset,H=Array.isArray(U.value)?U.value:[U.value];let j=0;for(let L=0;L<H.length;L++){const V=H[L],Z=M(V);typeof V=="number"||typeof V=="boolean"?(U.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,D+j,U.__data)):V.isMatrix3?(U.__data[0]=V.elements[0],U.__data[1]=V.elements[1],U.__data[2]=V.elements[2],U.__data[3]=0,U.__data[4]=V.elements[3],U.__data[5]=V.elements[4],U.__data[6]=V.elements[5],U.__data[7]=0,U.__data[8]=V.elements[6],U.__data[9]=V.elements[7],U.__data[10]=V.elements[8],U.__data[11]=0):(V.toArray(U.__data,j),j+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(T,E,v,A){const w=T.value,C=E+"_"+v;if(A[C]===void 0)return typeof w=="number"||typeof w=="boolean"?A[C]=w:A[C]=w.clone(),!0;{const N=A[C];if(typeof w=="number"||typeof w=="boolean"){if(N!==w)return A[C]=w,!0}else if(N.equals(w)===!1)return N.copy(w),!0}return!1}function g(T){const E=T.uniforms;let v=0;const A=16;for(let C=0,N=E.length;C<N;C++){const y=Array.isArray(E[C])?E[C]:[E[C]];for(let b=0,U=y.length;b<U;b++){const D=y[b],H=Array.isArray(D.value)?D.value:[D.value];for(let j=0,L=H.length;j<L;j++){const V=H[j],Z=M(V),q=v%A,re=q%Z.boundary,ce=q+re;v+=re,ce!==0&&A-ce<Z.storage&&(v+=A-ce),D.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=v,v+=Z.storage}}}const w=v%A;return w>0&&(v+=A-w),T.__size=v,T.__cache={},this}function M(T){const E={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(E.boundary=4,E.storage=4):T.isVector2?(E.boundary=8,E.storage=8):T.isVector3||T.isColor?(E.boundary=16,E.storage=12):T.isVector4?(E.boundary=16,E.storage=16):T.isMatrix3?(E.boundary=48,E.storage=48):T.isMatrix4?(E.boundary=64,E.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),E}function m(T){const E=T.target;E.removeEventListener("dispose",m);const v=o.indexOf(E.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function d(){for(const T in s)i.deleteBuffer(s[T]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}class Qm{constructor(e={}){const{canvas:t=Ph(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),M=new Int32Array(4);let m=null,d=null;const T=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let A=!1;this._outputColorSpace=zt;let w=0,C=0,N=null,y=-1,b=null;const U=new dt,D=new dt;let H=null;const j=new pe(0);let L=0,V=t.width,Z=t.height,q=1,re=null,ce=null;const ye=new dt(0,0,V,Z),ke=new dt(0,0,V,Z);let De=!1;const Ze=new Zo;let Qe=!1,J=!1;const ee=new ft,ge=new P,Fe=new dt,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let je=!1;function Ct(){return N===null?q:1}let I=n;function ot(S,O){return t.getContext(S,O)}try{const S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ko}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",me,!1),t.addEventListener("webglcontextcreationerror",te,!1),I===null){const O="webgl2";if(I=ot(O,S),I===null)throw ot(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let ze,Ie,xe,at,Me,We,Et,pt,R,_,z,K,Q,Y,we,oe,Se,be,ie,de,Le,Ee,he,Ve;function F(){ze=new cp(I),ze.init(),Ee=new Xm(I,ze),Ie=new np(I,ze,e,Ee),xe=new Gm(I,ze),Ie.reversedDepthBuffer&&f&&xe.buffers.depth.setReversed(!0),at=new dp(I),Me=new Pm,We=new Wm(I,ze,xe,Me,Ie,Ee,at),Et=new sp(v),pt=new lp(v),R=new _u(I),he=new ep(I,R),_=new hp(I,R,at,he),z=new pp(I,_,R,at),ie=new fp(I,Ie,We),oe=new ip(Me),K=new Cm(v,Et,pt,ze,Ie,he,oe),Q=new $m(v,Me),Y=new Dm,we=new Bm(ze),be=new Qf(v,Et,pt,xe,z,p,l),Se=new Hm(v,z,Ie),Ve=new Zm(I,at,Ie,xe),de=new tp(I,ze,at),Le=new up(I,ze,at),at.programs=K.programs,v.capabilities=Ie,v.extensions=ze,v.properties=Me,v.renderLists=Y,v.shadowMap=Se,v.state=xe,v.info=at}F();const se=new Km(v,I);this.xr=se,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const S=ze.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=ze.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(S){S!==void 0&&(q=S,this.setSize(V,Z,!1))},this.getSize=function(S){return S.set(V,Z)},this.setSize=function(S,O,G=!0){if(se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=S,Z=O,t.width=Math.floor(S*q),t.height=Math.floor(O*q),G===!0&&(t.style.width=S+"px",t.style.height=O+"px"),this.setViewport(0,0,S,O)},this.getDrawingBufferSize=function(S){return S.set(V*q,Z*q).floor()},this.setDrawingBufferSize=function(S,O,G){V=S,Z=O,q=G,t.width=Math.floor(S*G),t.height=Math.floor(O*G),this.setViewport(0,0,S,O)},this.getCurrentViewport=function(S){return S.copy(U)},this.getViewport=function(S){return S.copy(ye)},this.setViewport=function(S,O,G,W){S.isVector4?ye.set(S.x,S.y,S.z,S.w):ye.set(S,O,G,W),xe.viewport(U.copy(ye).multiplyScalar(q).round())},this.getScissor=function(S){return S.copy(ke)},this.setScissor=function(S,O,G,W){S.isVector4?ke.set(S.x,S.y,S.z,S.w):ke.set(S,O,G,W),xe.scissor(D.copy(ke).multiplyScalar(q).round())},this.getScissorTest=function(){return De},this.setScissorTest=function(S){xe.setScissorTest(De=S)},this.setOpaqueSort=function(S){re=S},this.setTransparentSort=function(S){ce=S},this.getClearColor=function(S){return S.copy(be.getClearColor())},this.setClearColor=function(){be.setClearColor(...arguments)},this.getClearAlpha=function(){return be.getClearAlpha()},this.setClearAlpha=function(){be.setClearAlpha(...arguments)},this.clear=function(S=!0,O=!0,G=!0){let W=0;if(S){let B=!1;if(N!==null){const ne=N.texture.format;B=ne===qo||ne===Xo||ne===Wo}if(B){const ne=N.texture.type,ue=ne===fn||ne===oi||ne===ts||ne===ns||ne===Vo||ne===Go,_e=be.getClearColor(),fe=be.getClearAlpha(),Pe=_e.r,Ue=_e.g,Re=_e.b;ue?(g[0]=Pe,g[1]=Ue,g[2]=Re,g[3]=fe,I.clearBufferuiv(I.COLOR,0,g)):(M[0]=Pe,M[1]=Ue,M[2]=Re,M[3]=fe,I.clearBufferiv(I.COLOR,0,M))}else W|=I.COLOR_BUFFER_BIT}O&&(W|=I.DEPTH_BUFFER_BIT),G&&(W|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",me,!1),t.removeEventListener("webglcontextcreationerror",te,!1),be.dispose(),Y.dispose(),we.dispose(),Me.dispose(),Et.dispose(),pt.dispose(),z.dispose(),he.dispose(),Ve.dispose(),K.dispose(),se.dispose(),se.removeEventListener("sessionstart",cn),se.removeEventListener("sessionend",la),Wn.stop()};function ae(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function me(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const S=at.autoReset,O=Se.enabled,G=Se.autoUpdate,W=Se.needsUpdate,B=Se.type;F(),at.autoReset=S,Se.enabled=O,Se.autoUpdate=G,Se.needsUpdate=W,Se.type=B}function te(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function $(S){const O=S.target;O.removeEventListener("dispose",$),ve(O)}function ve(S){Oe(S),Me.remove(S)}function Oe(S){const O=Me.get(S).programs;O!==void 0&&(O.forEach(function(G){K.releaseProgram(G)}),S.isShaderMaterial&&K.releaseShaderCache(S))}this.renderBufferDirect=function(S,O,G,W,B,ne){O===null&&(O=Ae);const ue=B.isMesh&&B.matrixWorld.determinant()<0,_e=Ac(S,O,G,W,B);xe.setMaterial(W,ue);let fe=G.index,Pe=1;if(W.wireframe===!0){if(fe=_.getWireframeAttribute(G),fe===void 0)return;Pe=2}const Ue=G.drawRange,Re=G.attributes.position;let qe=Ue.start*Pe,nt=(Ue.start+Ue.count)*Pe;ne!==null&&(qe=Math.max(qe,ne.start*Pe),nt=Math.min(nt,(ne.start+ne.count)*Pe)),fe!==null?(qe=Math.max(qe,0),nt=Math.min(nt,fe.count)):Re!=null&&(qe=Math.max(qe,0),nt=Math.min(nt,Re.count));const ut=nt-qe;if(ut<0||ut===1/0)return;he.setup(B,W,_e,G,fe);let rt,it=de;if(fe!==null&&(rt=R.get(fe),it=Le,it.setIndex(rt)),B.isMesh)W.wireframe===!0?(xe.setLineWidth(W.wireframeLinewidth*Ct()),it.setMode(I.LINES)):it.setMode(I.TRIANGLES);else if(B.isLine){let Ce=W.linewidth;Ce===void 0&&(Ce=1),xe.setLineWidth(Ce*Ct()),B.isLineSegments?it.setMode(I.LINES):B.isLineLoop?it.setMode(I.LINE_LOOP):it.setMode(I.LINE_STRIP)}else B.isPoints?it.setMode(I.POINTS):B.isSprite&&it.setMode(I.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)os("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),it.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(ze.get("WEBGL_multi_draw"))it.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Ce=B._multiDrawStarts,ct=B._multiDrawCounts,$e=B._multiDrawCount,Gt=fe?R.get(fe).bytesPerElement:1,ai=Me.get(W).currentProgram.getUniforms();for(let Wt=0;Wt<$e;Wt++)ai.setValue(I,"_gl_DrawID",Wt),it.render(Ce[Wt]/Gt,ct[Wt])}else if(B.isInstancedMesh)it.renderInstances(qe,ut,B.count);else if(G.isInstancedBufferGeometry){const Ce=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,ct=Math.min(G.instanceCount,Ce);it.renderInstances(qe,ut,ct)}else it.render(qe,ut)};function st(S,O,G){S.transparent===!0&&S.side===rn&&S.forceSinglePass===!1?(S.side=Ft,S.needsUpdate=!0,fs(S,O,G),S.side=Gn,S.needsUpdate=!0,fs(S,O,G),S.side=rn):fs(S,O,G)}this.compile=function(S,O,G=null){G===null&&(G=S),d=we.get(G),d.init(O),E.push(d),G.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(d.pushLight(B),B.castShadow&&d.pushShadow(B))}),S!==G&&S.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(d.pushLight(B),B.castShadow&&d.pushShadow(B))}),d.setupLights();const W=new Set;return S.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ne=B.material;if(ne)if(Array.isArray(ne))for(let ue=0;ue<ne.length;ue++){const _e=ne[ue];st(_e,G,B),W.add(_e)}else st(ne,G,B),W.add(ne)}),d=E.pop(),W},this.compileAsync=function(S,O,G=null){const W=this.compile(S,O,G);return new Promise(B=>{function ne(){if(W.forEach(function(ue){Me.get(ue).currentProgram.isReady()&&W.delete(ue)}),W.size===0){B(S);return}setTimeout(ne,10)}ze.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let et=null;function mn(S){et&&et(S)}function cn(){Wn.stop()}function la(){Wn.start()}const Wn=new mc;Wn.setAnimationLoop(mn),typeof self<"u"&&Wn.setContext(self),this.setAnimationLoop=function(S){et=S,se.setAnimationLoop(S),S===null?Wn.stop():Wn.start()},se.addEventListener("sessionstart",cn),se.addEventListener("sessionend",la),this.render=function(S,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(O),O=se.getCamera()),S.isScene===!0&&S.onBeforeRender(v,S,O,N),d=we.get(S,E.length),d.init(O),E.push(d),ee.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Ze.setFromProjectionMatrix(ee,dn,O.reversedDepth),J=this.localClippingEnabled,Qe=oe.init(this.clippingPlanes,J),m=Y.get(S,T.length),m.init(),T.push(m),se.enabled===!0&&se.isPresenting===!0){const ne=v.xr.getDepthSensingMesh();ne!==null&&ir(ne,O,-1/0,v.sortObjects)}ir(S,O,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(re,ce),je=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,je&&be.addToRenderList(m,S),this.info.render.frame++,Qe===!0&&oe.beginShadows();const G=d.state.shadowsArray;Se.render(G,S,O),Qe===!0&&oe.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,B=m.transmissive;if(d.setupLights(),O.isArrayCamera){const ne=O.cameras;if(B.length>0)for(let ue=0,_e=ne.length;ue<_e;ue++){const fe=ne[ue];ha(W,B,S,fe)}je&&be.render(S);for(let ue=0,_e=ne.length;ue<_e;ue++){const fe=ne[ue];ca(m,S,fe,fe.viewport)}}else B.length>0&&ha(W,B,S,O),je&&be.render(S),ca(m,S,O);N!==null&&C===0&&(We.updateMultisampleRenderTarget(N),We.updateRenderTargetMipmap(N)),S.isScene===!0&&S.onAfterRender(v,S,O),he.resetDefaultState(),y=-1,b=null,E.pop(),E.length>0?(d=E[E.length-1],Qe===!0&&oe.setGlobalState(v.clippingPlanes,d.state.camera)):d=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function ir(S,O,G,W){if(S.visible===!1)return;if(S.layers.test(O.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(O);else if(S.isLight)d.pushLight(S),S.castShadow&&d.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Ze.intersectsSprite(S)){W&&Fe.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ee);const ue=z.update(S),_e=S.material;_e.visible&&m.push(S,ue,_e,G,Fe.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Ze.intersectsObject(S))){const ue=z.update(S),_e=S.material;if(W&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Fe.copy(S.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),Fe.copy(ue.boundingSphere.center)),Fe.applyMatrix4(S.matrixWorld).applyMatrix4(ee)),Array.isArray(_e)){const fe=ue.groups;for(let Pe=0,Ue=fe.length;Pe<Ue;Pe++){const Re=fe[Pe],qe=_e[Re.materialIndex];qe&&qe.visible&&m.push(S,ue,qe,G,Fe.z,Re)}}else _e.visible&&m.push(S,ue,_e,G,Fe.z,null)}}const ne=S.children;for(let ue=0,_e=ne.length;ue<_e;ue++)ir(ne[ue],O,G,W)}function ca(S,O,G,W){const B=S.opaque,ne=S.transmissive,ue=S.transparent;d.setupLightsView(G),Qe===!0&&oe.setGlobalState(v.clippingPlanes,G),W&&xe.viewport(U.copy(W)),B.length>0&&ds(B,O,G),ne.length>0&&ds(ne,O,G),ue.length>0&&ds(ue,O,G),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function ha(S,O,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[W.id]===void 0&&(d.state.transmissionRenderTarget[W.id]=new ln(1,1,{generateMipmaps:!0,type:ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float")?An:fn,minFilter:si,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Je.workingColorSpace}));const ne=d.state.transmissionRenderTarget[W.id],ue=W.viewport||U;ne.setSize(ue.z*v.transmissionResolutionScale,ue.w*v.transmissionResolutionScale);const _e=v.getRenderTarget(),fe=v.getActiveCubeFace(),Pe=v.getActiveMipmapLevel();v.setRenderTarget(ne),v.getClearColor(j),L=v.getClearAlpha(),L<1&&v.setClearColor(16777215,.5),v.clear(),je&&be.render(G);const Ue=v.toneMapping;v.toneMapping=Vn;const Re=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),d.setupLightsView(W),Qe===!0&&oe.setGlobalState(v.clippingPlanes,W),ds(S,G,W),We.updateMultisampleRenderTarget(ne),We.updateRenderTargetMipmap(ne),ze.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let nt=0,ut=O.length;nt<ut;nt++){const rt=O[nt],it=rt.object,Ce=rt.geometry,ct=rt.material,$e=rt.group;if(ct.side===rn&&it.layers.test(W.layers)){const Gt=ct.side;ct.side=Ft,ct.needsUpdate=!0,ua(it,G,W,Ce,ct,$e),ct.side=Gt,ct.needsUpdate=!0,qe=!0}}qe===!0&&(We.updateMultisampleRenderTarget(ne),We.updateRenderTargetMipmap(ne))}v.setRenderTarget(_e,fe,Pe),v.setClearColor(j,L),Re!==void 0&&(W.viewport=Re),v.toneMapping=Ue}function ds(S,O,G){const W=O.isScene===!0?O.overrideMaterial:null;for(let B=0,ne=S.length;B<ne;B++){const ue=S[B],_e=ue.object,fe=ue.geometry,Pe=ue.group;let Ue=ue.material;Ue.allowOverride===!0&&W!==null&&(Ue=W),_e.layers.test(G.layers)&&ua(_e,O,G,fe,Ue,Pe)}}function ua(S,O,G,W,B,ne){S.onBeforeRender(v,O,G,W,B,ne),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),B.onBeforeRender(v,O,G,W,S,ne),B.transparent===!0&&B.side===rn&&B.forceSinglePass===!1?(B.side=Ft,B.needsUpdate=!0,v.renderBufferDirect(G,O,W,B,S,ne),B.side=Gn,B.needsUpdate=!0,v.renderBufferDirect(G,O,W,B,S,ne),B.side=rn):v.renderBufferDirect(G,O,W,B,S,ne),S.onAfterRender(v,O,G,W,B,ne)}function fs(S,O,G){O.isScene!==!0&&(O=Ae);const W=Me.get(S),B=d.state.lights,ne=d.state.shadowsArray,ue=B.state.version,_e=K.getParameters(S,B.state,ne,O,G),fe=K.getProgramCacheKey(_e);let Pe=W.programs;W.environment=S.isMeshStandardMaterial?O.environment:null,W.fog=O.fog,W.envMap=(S.isMeshStandardMaterial?pt:Et).get(S.envMap||W.environment),W.envMapRotation=W.environment!==null&&S.envMap===null?O.environmentRotation:S.envMapRotation,Pe===void 0&&(S.addEventListener("dispose",$),Pe=new Map,W.programs=Pe);let Ue=Pe.get(fe);if(Ue!==void 0){if(W.currentProgram===Ue&&W.lightsStateVersion===ue)return fa(S,_e),Ue}else _e.uniforms=K.getUniforms(S),S.onBeforeCompile(_e,v),Ue=K.acquireProgram(_e,fe),Pe.set(fe,Ue),W.uniforms=_e.uniforms;const Re=W.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Re.clippingPlanes=oe.uniform),fa(S,_e),W.needsLights=Cc(S),W.lightsStateVersion=ue,W.needsLights&&(Re.ambientLightColor.value=B.state.ambient,Re.lightProbe.value=B.state.probe,Re.directionalLights.value=B.state.directional,Re.directionalLightShadows.value=B.state.directionalShadow,Re.spotLights.value=B.state.spot,Re.spotLightShadows.value=B.state.spotShadow,Re.rectAreaLights.value=B.state.rectArea,Re.ltc_1.value=B.state.rectAreaLTC1,Re.ltc_2.value=B.state.rectAreaLTC2,Re.pointLights.value=B.state.point,Re.pointLightShadows.value=B.state.pointShadow,Re.hemisphereLights.value=B.state.hemi,Re.directionalShadowMap.value=B.state.directionalShadowMap,Re.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Re.spotShadowMap.value=B.state.spotShadowMap,Re.spotLightMatrix.value=B.state.spotLightMatrix,Re.spotLightMap.value=B.state.spotLightMap,Re.pointShadowMap.value=B.state.pointShadowMap,Re.pointShadowMatrix.value=B.state.pointShadowMatrix),W.currentProgram=Ue,W.uniformsList=null,Ue}function da(S){if(S.uniformsList===null){const O=S.currentProgram.getUniforms();S.uniformsList=Ks.seqWithValue(O.seq,S.uniforms)}return S.uniformsList}function fa(S,O){const G=Me.get(S);G.outputColorSpace=O.outputColorSpace,G.batching=O.batching,G.batchingColor=O.batchingColor,G.instancing=O.instancing,G.instancingColor=O.instancingColor,G.instancingMorph=O.instancingMorph,G.skinning=O.skinning,G.morphTargets=O.morphTargets,G.morphNormals=O.morphNormals,G.morphColors=O.morphColors,G.morphTargetsCount=O.morphTargetsCount,G.numClippingPlanes=O.numClippingPlanes,G.numIntersection=O.numClipIntersection,G.vertexAlphas=O.vertexAlphas,G.vertexTangents=O.vertexTangents,G.toneMapping=O.toneMapping}function Ac(S,O,G,W,B){O.isScene!==!0&&(O=Ae),We.resetTextureUnits();const ne=O.fog,ue=W.isMeshStandardMaterial?O.environment:null,_e=N===null?v.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Li,fe=(W.isMeshStandardMaterial?pt:Et).get(W.envMap||ue),Pe=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ue=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Re=!!G.morphAttributes.position,qe=!!G.morphAttributes.normal,nt=!!G.morphAttributes.color;let ut=Vn;W.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(ut=v.toneMapping);const rt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,it=rt!==void 0?rt.length:0,Ce=Me.get(W),ct=d.state.lights;if(Qe===!0&&(J===!0||S!==b)){const It=S===b&&W.id===y;oe.setState(W,S,It)}let $e=!1;W.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==ct.state.version||Ce.outputColorSpace!==_e||B.isBatchedMesh&&Ce.batching===!1||!B.isBatchedMesh&&Ce.batching===!0||B.isBatchedMesh&&Ce.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ce.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ce.instancing===!1||!B.isInstancedMesh&&Ce.instancing===!0||B.isSkinnedMesh&&Ce.skinning===!1||!B.isSkinnedMesh&&Ce.skinning===!0||B.isInstancedMesh&&Ce.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ce.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ce.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ce.instancingMorph===!1&&B.morphTexture!==null||Ce.envMap!==fe||W.fog===!0&&Ce.fog!==ne||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==oe.numPlanes||Ce.numIntersection!==oe.numIntersection)||Ce.vertexAlphas!==Pe||Ce.vertexTangents!==Ue||Ce.morphTargets!==Re||Ce.morphNormals!==qe||Ce.morphColors!==nt||Ce.toneMapping!==ut||Ce.morphTargetsCount!==it)&&($e=!0):($e=!0,Ce.__version=W.version);let Gt=Ce.currentProgram;$e===!0&&(Gt=fs(W,O,B));let ai=!1,Wt=!1,ki=!1;const ht=Gt.getUniforms(),Yt=Ce.uniforms;if(xe.useProgram(Gt.program)&&(ai=!0,Wt=!0,ki=!0),W.id!==y&&(y=W.id,Wt=!0),ai||b!==S){xe.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ht.setValue(I,"projectionMatrix",S.projectionMatrix),ht.setValue(I,"viewMatrix",S.matrixWorldInverse);const Bt=ht.map.cameraPosition;Bt!==void 0&&Bt.setValue(I,ge.setFromMatrixPosition(S.matrixWorld)),Ie.logarithmicDepthBuffer&&ht.setValue(I,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ht.setValue(I,"isOrthographic",S.isOrthographicCamera===!0),b!==S&&(b=S,Wt=!0,ki=!0)}if(B.isSkinnedMesh){ht.setOptional(I,B,"bindMatrix"),ht.setOptional(I,B,"bindMatrixInverse");const It=B.skeleton;It&&(It.boneTexture===null&&It.computeBoneTexture(),ht.setValue(I,"boneTexture",It.boneTexture,We))}B.isBatchedMesh&&(ht.setOptional(I,B,"batchingTexture"),ht.setValue(I,"batchingTexture",B._matricesTexture,We),ht.setOptional(I,B,"batchingIdTexture"),ht.setValue(I,"batchingIdTexture",B._indirectTexture,We),ht.setOptional(I,B,"batchingColorTexture"),B._colorsTexture!==null&&ht.setValue(I,"batchingColorTexture",B._colorsTexture,We));const Kt=G.morphAttributes;if((Kt.position!==void 0||Kt.normal!==void 0||Kt.color!==void 0)&&ie.update(B,G,Gt),(Wt||Ce.receiveShadow!==B.receiveShadow)&&(Ce.receiveShadow=B.receiveShadow,ht.setValue(I,"receiveShadow",B.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Yt.envMap.value=fe,Yt.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&O.environment!==null&&(Yt.envMapIntensity.value=O.environmentIntensity),Wt&&(ht.setValue(I,"toneMappingExposure",v.toneMappingExposure),Ce.needsLights&&Rc(Yt,ki),ne&&W.fog===!0&&Q.refreshFogUniforms(Yt,ne),Q.refreshMaterialUniforms(Yt,W,q,Z,d.state.transmissionRenderTarget[S.id]),Ks.upload(I,da(Ce),Yt,We)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ks.upload(I,da(Ce),Yt,We),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ht.setValue(I,"center",B.center),ht.setValue(I,"modelViewMatrix",B.modelViewMatrix),ht.setValue(I,"normalMatrix",B.normalMatrix),ht.setValue(I,"modelMatrix",B.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const It=W.uniformsGroups;for(let Bt=0,sr=It.length;Bt<sr;Bt++){const Xn=It[Bt];Ve.update(Xn,Gt),Ve.bind(Xn,Gt)}}return Gt}function Rc(S,O){S.ambientLightColor.needsUpdate=O,S.lightProbe.needsUpdate=O,S.directionalLights.needsUpdate=O,S.directionalLightShadows.needsUpdate=O,S.pointLights.needsUpdate=O,S.pointLightShadows.needsUpdate=O,S.spotLights.needsUpdate=O,S.spotLightShadows.needsUpdate=O,S.rectAreaLights.needsUpdate=O,S.hemisphereLights.needsUpdate=O}function Cc(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(S,O,G){const W=Me.get(S);W.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),Me.get(S.texture).__webglTexture=O,Me.get(S.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:G,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,O){const G=Me.get(S);G.__webglFramebuffer=O,G.__useDefaultFramebuffer=O===void 0};const Pc=I.createFramebuffer();this.setRenderTarget=function(S,O=0,G=0){N=S,w=O,C=G;let W=!0,B=null,ne=!1,ue=!1;if(S){const fe=Me.get(S);if(fe.__useDefaultFramebuffer!==void 0)xe.bindFramebuffer(I.FRAMEBUFFER,null),W=!1;else if(fe.__webglFramebuffer===void 0)We.setupRenderTarget(S);else if(fe.__hasExternalTextures)We.rebindTextures(S,Me.get(S.texture).__webglTexture,Me.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Re=S.depthTexture;if(fe.__boundDepthTexture!==Re){if(Re!==null&&Me.has(Re)&&(S.width!==Re.image.width||S.height!==Re.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");We.setupDepthRenderbuffer(S)}}const Pe=S.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(ue=!0);const Ue=Me.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ue[O])?B=Ue[O][G]:B=Ue[O],ne=!0):S.samples>0&&We.useMultisampledRTT(S)===!1?B=Me.get(S).__webglMultisampledFramebuffer:Array.isArray(Ue)?B=Ue[G]:B=Ue,U.copy(S.viewport),D.copy(S.scissor),H=S.scissorTest}else U.copy(ye).multiplyScalar(q).floor(),D.copy(ke).multiplyScalar(q).floor(),H=De;if(G!==0&&(B=Pc),xe.bindFramebuffer(I.FRAMEBUFFER,B)&&W&&xe.drawBuffers(S,B),xe.viewport(U),xe.scissor(D),xe.setScissorTest(H),ne){const fe=Me.get(S.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+O,fe.__webglTexture,G)}else if(ue){const fe=O;for(let Pe=0;Pe<S.textures.length;Pe++){const Ue=Me.get(S.textures[Pe]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Pe,Ue.__webglTexture,G,fe)}}else if(S!==null&&G!==0){const fe=Me.get(S.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,fe.__webglTexture,G)}y=-1},this.readRenderTargetPixels=function(S,O,G,W,B,ne,ue,_e=0){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=Me.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ue!==void 0&&(fe=fe[ue]),fe){xe.bindFramebuffer(I.FRAMEBUFFER,fe);try{const Pe=S.textures[_e],Ue=Pe.format,Re=Pe.type;if(!Ie.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ie.textureTypeReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=S.width-W&&G>=0&&G<=S.height-B&&(S.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+_e),I.readPixels(O,G,W,B,Ee.convert(Ue),Ee.convert(Re),ne))}finally{const Pe=N!==null?Me.get(N).__webglFramebuffer:null;xe.bindFramebuffer(I.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(S,O,G,W,B,ne,ue,_e=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=Me.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ue!==void 0&&(fe=fe[ue]),fe)if(O>=0&&O<=S.width-W&&G>=0&&G<=S.height-B){xe.bindFramebuffer(I.FRAMEBUFFER,fe);const Pe=S.textures[_e],Ue=Pe.format,Re=Pe.type;if(!Ie.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ie.textureTypeReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qe=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,qe),I.bufferData(I.PIXEL_PACK_BUFFER,ne.byteLength,I.STREAM_READ),S.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+_e),I.readPixels(O,G,W,B,Ee.convert(Ue),Ee.convert(Re),0);const nt=N!==null?Me.get(N).__webglFramebuffer:null;xe.bindFramebuffer(I.FRAMEBUFFER,nt);const ut=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Lh(I,ut,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,qe),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ne),I.deleteBuffer(qe),I.deleteSync(ut),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,O=null,G=0){const W=Math.pow(2,-G),B=Math.floor(S.image.width*W),ne=Math.floor(S.image.height*W),ue=O!==null?O.x:0,_e=O!==null?O.y:0;We.setTexture2D(S,0),I.copyTexSubImage2D(I.TEXTURE_2D,G,0,0,ue,_e,B,ne),xe.unbindTexture()};const Lc=I.createFramebuffer(),Dc=I.createFramebuffer();this.copyTextureToTexture=function(S,O,G=null,W=null,B=0,ne=null){ne===null&&(B!==0?(os("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ne=B,B=0):ne=0);let ue,_e,fe,Pe,Ue,Re,qe,nt,ut;const rt=S.isCompressedTexture?S.mipmaps[ne]:S.image;if(G!==null)ue=G.max.x-G.min.x,_e=G.max.y-G.min.y,fe=G.isBox3?G.max.z-G.min.z:1,Pe=G.min.x,Ue=G.min.y,Re=G.isBox3?G.min.z:0;else{const Kt=Math.pow(2,-B);ue=Math.floor(rt.width*Kt),_e=Math.floor(rt.height*Kt),S.isDataArrayTexture?fe=rt.depth:S.isData3DTexture?fe=Math.floor(rt.depth*Kt):fe=1,Pe=0,Ue=0,Re=0}W!==null?(qe=W.x,nt=W.y,ut=W.z):(qe=0,nt=0,ut=0);const it=Ee.convert(O.format),Ce=Ee.convert(O.type);let ct;O.isData3DTexture?(We.setTexture3D(O,0),ct=I.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(We.setTexture2DArray(O,0),ct=I.TEXTURE_2D_ARRAY):(We.setTexture2D(O,0),ct=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,O.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,O.unpackAlignment);const $e=I.getParameter(I.UNPACK_ROW_LENGTH),Gt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),ai=I.getParameter(I.UNPACK_SKIP_PIXELS),Wt=I.getParameter(I.UNPACK_SKIP_ROWS),ki=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,rt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,rt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Pe),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ue),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Re);const ht=S.isDataArrayTexture||S.isData3DTexture,Yt=O.isDataArrayTexture||O.isData3DTexture;if(S.isDepthTexture){const Kt=Me.get(S),It=Me.get(O),Bt=Me.get(Kt.__renderTarget),sr=Me.get(It.__renderTarget);xe.bindFramebuffer(I.READ_FRAMEBUFFER,Bt.__webglFramebuffer),xe.bindFramebuffer(I.DRAW_FRAMEBUFFER,sr.__webglFramebuffer);for(let Xn=0;Xn<fe;Xn++)ht&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Me.get(S).__webglTexture,B,Re+Xn),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Me.get(O).__webglTexture,ne,ut+Xn)),I.blitFramebuffer(Pe,Ue,ue,_e,qe,nt,ue,_e,I.DEPTH_BUFFER_BIT,I.NEAREST);xe.bindFramebuffer(I.READ_FRAMEBUFFER,null),xe.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(B!==0||S.isRenderTargetTexture||Me.has(S)){const Kt=Me.get(S),It=Me.get(O);xe.bindFramebuffer(I.READ_FRAMEBUFFER,Lc),xe.bindFramebuffer(I.DRAW_FRAMEBUFFER,Dc);for(let Bt=0;Bt<fe;Bt++)ht?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Kt.__webglTexture,B,Re+Bt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Kt.__webglTexture,B),Yt?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,It.__webglTexture,ne,ut+Bt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,It.__webglTexture,ne),B!==0?I.blitFramebuffer(Pe,Ue,ue,_e,qe,nt,ue,_e,I.COLOR_BUFFER_BIT,I.NEAREST):Yt?I.copyTexSubImage3D(ct,ne,qe,nt,ut+Bt,Pe,Ue,ue,_e):I.copyTexSubImage2D(ct,ne,qe,nt,Pe,Ue,ue,_e);xe.bindFramebuffer(I.READ_FRAMEBUFFER,null),xe.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Yt?S.isDataTexture||S.isData3DTexture?I.texSubImage3D(ct,ne,qe,nt,ut,ue,_e,fe,it,Ce,rt.data):O.isCompressedArrayTexture?I.compressedTexSubImage3D(ct,ne,qe,nt,ut,ue,_e,fe,it,rt.data):I.texSubImage3D(ct,ne,qe,nt,ut,ue,_e,fe,it,Ce,rt):S.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ne,qe,nt,ue,_e,it,Ce,rt.data):S.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ne,qe,nt,rt.width,rt.height,it,rt.data):I.texSubImage2D(I.TEXTURE_2D,ne,qe,nt,ue,_e,it,Ce,rt);I.pixelStorei(I.UNPACK_ROW_LENGTH,$e),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Gt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ai),I.pixelStorei(I.UNPACK_SKIP_ROWS,Wt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,ki),ne===0&&O.generateMipmaps&&I.generateMipmap(ct),xe.unbindTexture()},this.initRenderTarget=function(S){Me.get(S).__webglFramebuffer===void 0&&We.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?We.setTextureCube(S,0):S.isData3DTexture?We.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?We.setTexture2DArray(S,0):We.setTexture2D(S,0),xe.unbindTexture()},this.resetState=function(){w=0,C=0,N=null,xe.reset(),he.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}}const Js={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Bi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const eg=new ea(-1,1,1,-1,0,1);class tg extends Vt{constructor(){super(),this.setAttribute("position",new St([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new St([0,2,0,0,2,0],2))}}const ng=new tg;class na{constructor(e){this._mesh=new He(ng,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,eg)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ig extends Bi{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Rt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=as.clone(e.uniforms),this.material=new Rt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new na(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class ml extends Bi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class sg extends Bi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class rg{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new Te);this._width=n.width,this._height=n.height,t=new ln(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:An}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ig(Js),this.copyPass.material.blending=wn,this.clock=new fc}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}ml!==void 0&&(o instanceof ml?n=!0:o instanceof sg&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Te);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class og extends Bi{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new pe}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}const ag={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new pe(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Ii extends Bi{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new Te(e.x,e.y):new Te(256,256),this.clearColor=new pe(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new ln(r,o,{type:An}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new ln(r,o,{type:An});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new ln(r,o,{type:An});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=ag;this.highPassUniforms=as.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Rt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Te(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=as.clone(Js.uniforms),this.blendMaterial=new Rt({uniforms:this.copyUniforms,vertexShader:Js.vertexShader,fragmentShader:Js.fragmentShader,blending:qr,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new pe,this._oldClearAlpha=1,this._basic=new hs,this._fsQuad=new na(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Te(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ii.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ii.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Rt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Te(.5,.5)},direction:{value:new Te(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}_getCompositeMaterial(e){return new Rt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Ii.BlurDirectionX=new Te(1,0);Ii.BlurDirectionY=new Te(0,1);const Bs={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class lg extends Bi{constructor(){super(),this.uniforms=as.clone(Bs.uniforms),this.material=new ou({name:Bs.name,uniforms:this.uniforms,vertexShader:Bs.vertexShader,fragmentShader:Bs.fragmentShader}),this._fsQuad=new na(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Je.getTransfer(this._outputColorSpace)===tt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Bl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===kl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===zl?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===zo?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Vl?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Gl?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Hl&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const gl={low:{pixelRatioCap:1,renderScale:.8,shadows:!1,shadowMapSize:512,shadowDistance:60,antialias:!1,waterReflections:!1,bloom:!1,fogDensity:.0075,viewDistance:420,foliageDensity:.25,anisotropy:1},medium:{pixelRatioCap:1.25,renderScale:1,shadows:!0,shadowMapSize:1024,shadowDistance:90,antialias:!1,waterReflections:!1,bloom:!1,fogDensity:.0052,viewDistance:620,foliageDensity:.6,anisotropy:4},high:{pixelRatioCap:2,renderScale:1,shadows:!0,shadowMapSize:2048,shadowDistance:130,antialias:!0,waterReflections:!0,bloom:!0,fogDensity:.004,viewDistance:900,foliageDensity:1,anisotropy:8}},Ei={quality:"medium",musicVolume:.6,effectsVolume:.8,cameraSensitivity:1,invertCameraY:!1},Mc="letsgo.settings.v1";function _l(i,e){return typeof i=="number"&&Number.isFinite(i)?Math.min(1,Math.max(0,i)):e}function cg(){try{const i=localStorage.getItem(Mc);if(!i)return{...Ei};const e=JSON.parse(i);return{quality:e.quality==="low"||e.quality==="medium"||e.quality==="high"?e.quality:Ei.quality,musicVolume:_l(e.musicVolume,Ei.musicVolume),effectsVolume:_l(e.effectsVolume,Ei.effectsVolume),cameraSensitivity:typeof e.cameraSensitivity=="number"&&Number.isFinite(e.cameraSensitivity)?Math.min(3,Math.max(.2,e.cameraSensitivity)):Ei.cameraSensitivity,invertCameraY:e.invertCameraY===!0}}catch{return{...Ei}}}function hg(i){try{localStorage.setItem(Mc,JSON.stringify(i))}catch{}}const ug=`
  varying vec3 vWorldDirection;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldDirection = normalize(worldPosition.xyz - cameraPosition);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position.z = gl_Position.w; // keep the dome pinned to the far plane
  }
`,dg=`
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
`;class fg extends mt{constructor(t,n){super();k(this,"clouds",[]);const s=new Rt({uniforms:{topColor:{value:new pe("#2f7fe0")},horizonColor:{value:new pe("#bfe4f7")},bottomColor:{value:new pe("#8fb39a")},sunDirection:{value:t},sunColor:{value:new pe("#fff6d8")}},vertexShader:ug,fragmentShader:dg,side:Ft,depthWrite:!1}),r=new He(new bn(1,24,16),s);r.frustumCulled=!1,r.renderOrder=-1e3,this.add(r);const o=new hs({color:16777215,fog:!1,transparent:!0,opacity:.95,depthWrite:!1});for(let a=0;a<n;a+=1){const l=new He(pg(a),o),c=a/n*Math.PI*2+a*.37,h=260+a*53%150;l.position.set(Math.cos(c)*h,110+a*29%70,Math.sin(c)*h);const u=14+a*17%20;l.scale.setScalar(u),l.renderOrder=-900,l.userData.drift=.6+a*13%10*.08,this.clouds.push(l),this.add(l)}}update(t,n){for(const s of this.clouds){const r=s.userData.drift;s.position.x+=r*t,s.position.x-n.x>420&&(s.position.x-=840),s.lookAt(n.x,s.position.y,n.z)}}}function pg(i){const e=[],t=4+i%3;let n=i*9301+49297;const s=()=>(n=(n*9301+49297)%233280,n/233280);for(let o=0;o<t;o+=1){const a=(o-(t-1)/2)*.62+(s()-.5)*.25,l=(s()-.5)*.22,c=.42+s()*.3,h=10;for(let u=0;u<h;u+=1){const f=u/h*Math.PI*2,p=(u+1)/h*Math.PI*2;e.push(a,l,0),e.push(a+Math.cos(f)*c,l+Math.sin(f)*c*.72,0),e.push(a+Math.cos(p)*c,l+Math.sin(p)*c*.72,0)}}const r=new Vt;return r.setAttribute("position",new St(e,3)),r.computeVertexNormals(),r}const Fr=new P(.55,.72,.42).normalize(),ia=new P(-.45,.8,-.75).normalize(),mg=9,vl=26;class gg{constructor(e,t){k(this,"renderer");k(this,"scene",new tu);k(this,"camera");k(this,"clock",new fc);k(this,"sky");k(this,"sun");k(this,"hemisphere");k(this,"ambient");k(this,"fog");k(this,"rimLight",null);k(this,"studio",!1);k(this,"composer",null);k(this,"bloomPass",null);k(this,"preset");k(this,"quality");k(this,"underwater",!1);k(this,"fps",0);k(this,"fpsAccumulator",0);k(this,"fpsFrames",0);k(this,"resize",()=>{const e=window.innerWidth,t=Math.max(1,window.innerHeight),n=Math.min(window.devicePixelRatio||1,this.preset.pixelRatioCap);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(n*this.preset.renderScale),this.renderer.setSize(e,t,!0),this.composer?.setSize(e,t),this.bloomPass?.resolution.set(e,t)});this.quality=t,this.preset=gl[t],this.renderer=new Qm({antialias:this.preset.antialias,powerPreference:"high-performance",stencil:!1}),this.renderer.outputColorSpace=zt,this.renderer.toneMapping=zo,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.type=Fl,this.renderer.domElement.classList.add("game-canvas"),e.appendChild(this.renderer.domElement),this.camera=new $t(62,window.innerWidth/Math.max(1,window.innerHeight),.1,this.preset.viewDistance),this.camera.position.set(0,8,18),this.fog=new $o(12575991,this.preset.fogDensity),this.scene.fog=this.fog,this.scene.background=new pe(12575991),this.sky=new fg(Fr,14),this.scene.add(this.sky),this.sun=new Va(16774102,2.15),this.sun.position.copy(Fr).multiplyScalar(120),this.sun.castShadow=!0,this.scene.add(this.sun),this.scene.add(this.sun.target),this.hemisphere=new cu(13625599,7311194,1),this.scene.add(this.hemisphere),this.ambient=new du(16777215,.22),this.scene.add(this.ambient),this.applyQuality(t),this.resize(),window.addEventListener("resize",this.resize)}setStudioMode(e){if(this.studio=e,this.sky.visible=!e,this.configureShadowCamera(),this.applyShadowMapSize(),e){if(this.scene.fog=null,this.scene.background.set(1185309),this.sun.intensity=1.9,this.sun.color.set(16774370),this.hemisphere.intensity=.95,this.hemisphere.color.set(11058648),this.hemisphere.groundColor.set(4672856),this.ambient.intensity=.3,!this.rimLight){const t=new Va(12572927,1.6);t.position.set(.6,.5,1).multiplyScalar(40),t.castShadow=!1,this.rimLight=t,this.scene.add(t)}this.rimLight.visible=!0}else this.scene.fog=this.fog,this.scene.background.set(12575991),this.sun.intensity=2.15,this.hemisphere.intensity=1,this.hemisphere.color.set(13625599),this.ambient.intensity=.22,this.rimLight&&(this.rimLight.visible=!1)}applyQuality(e){this.quality=e;const t=gl[e];this.preset=t,this.renderer.shadowMap.enabled=t.shadows,this.sun.castShadow=t.shadows,this.applyShadowMapSize(),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null),this.configureShadowCamera(),!this.underwater&&!this.studio&&(this.fog.density=t.fogDensity),this.camera.far=t.viewDistance,this.camera.updateProjectionMatrix(),this.setUpComposer(),this.resize()}applyShadowMapSize(){const e=this.studio?Math.min(2048,this.preset.shadowMapSize*2):this.preset.shadowMapSize;this.sun.shadow.mapSize.x!==e&&(this.sun.shadow.mapSize.set(e,e),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null))}configureShadowCamera(){const e=this.studio?mg:this.preset.shadowDistance*.5,t=this.sun.shadow.camera;t.left=-e,t.right=e,t.top=e,t.bottom=-e,t.near=(this.studio,1),t.far=this.studio?vl*2.4:this.preset.shadowDistance*3.2,t.updateProjectionMatrix(),this.sun.shadow.bias=this.studio?-9e-4:-.0012,this.sun.shadow.normalBias=this.studio?.03:.035}setUpComposer(){if(this.composer&&(this.composer.dispose(),this.composer=null,this.bloomPass=null),!this.preset.bloom)return;const e=new rg(this.renderer);e.addPass(new og(this.scene,this.camera));const t=new Ii(new Te(window.innerWidth,window.innerHeight),.42,.72,.86);e.addPass(t),e.addPass(new lg),this.composer=e,this.bloomPass=t}focusShadowsOn(e){const t=this.studio?ia:Fr,n=this.studio?vl:this.preset.shadowDistance*1.4;this.sun.target.position.copy(e),this.sun.target.updateMatrixWorld(),this.sun.position.copy(e).addScaledVector(t,n)}setUnderwater(e){this.studio||e===this.underwater||(this.underwater=e,e?(this.fog.color.set(1332846),this.fog.density=.055,this.scene.background.set(933973),this.sun.intensity=1.1,this.hemisphere.color.set(3117232),this.hemisphere.intensity=1.35):(this.fog.color.set(12575991),this.fog.density=this.preset.fogDensity,this.scene.background.set(12575991),this.sun.intensity=2.15,this.hemisphere.color.set(13625599),this.hemisphere.intensity=1))}get isUnderwater(){return this.underwater}render(e){this.fpsAccumulator+=e,this.fpsFrames+=1,this.fpsAccumulator>=.5&&(this.fps=this.fpsFrames/this.fpsAccumulator,this.fpsAccumulator=0,this.fpsFrames=0),this.sky.visible=!this.underwater&&!this.studio,!this.underwater&&!this.studio&&(this.sky.position.copy(this.camera.position),this.sky.update(e,this.camera.position)),this.composer?this.composer.render(e):this.renderer.render(this.scene,this.camera)}get currentQuality(){return this.quality}get currentPreset(){return this.preset}dispose(){window.removeEventListener("resize",this.resize),this.composer?.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}}const _g=-.62,vg=1.1,xg=1.1;class Mg{constructor(e,t){k(this,"yaw",Math.PI);k(this,"pitch",.33);k(this,"distance",8.6);k(this,"currentDistance",8.6);k(this,"focus",new P);k(this,"smoothedFocus",new P);k(this,"desiredPosition",new P);k(this,"toCamera",new P);k(this,"manualTimer",0);k(this,"initialised",!1);k(this,"ceilingY",null);this.camera=e,this.world=t}get movementYaw(){return this.yaw}get yawDegrees(){return(Ne.radToDeg(this.yaw)%360+360)%360}applyLook(e,t){e===0&&t===0||(this.yaw-=e,this.pitch=Ne.clamp(this.pitch+t,_g,vg),this.manualTimer=xg)}update(e,t){if(this.manualTimer>0&&(this.manualTimer-=e),t.getFocusPoint(this.focus),t.speed>1&&(this.focus.x+=t.velocity.x*.09,this.focus.z+=t.velocity.z*.09),!this.initialised)this.smoothedFocus.copy(this.focus),this.yaw=t.facing+Math.PI,this.initialised=!0;else{const o=1-Math.exp(-11*e),a=1-Math.exp(-(t.state==="air"?4.5:9)*e);this.smoothedFocus.x=Ne.lerp(this.smoothedFocus.x,this.focus.x,o),this.smoothedFocus.z=Ne.lerp(this.smoothedFocus.z,this.focus.z,o),this.smoothedFocus.y=Ne.lerp(this.smoothedFocus.y,this.focus.y,a)}this.autoFollow(e,t),t.isSubmerged&&(this.pitch=Ne.lerp(this.pitch,.06,1-Math.exp(-2.6*e)));const n=Ne.clamp(t.speed/9,0,1);this.distance=8.2+n*1.8+(t.state==="swim"?1:0);const s=Math.cos(this.pitch);this.toCamera.set(Math.sin(this.yaw)*s,Math.sin(this.pitch),Math.cos(this.yaw)*s);const r=this.distanceToObstruction(this.distance);this.currentDistance=r<this.currentDistance?r:Ne.lerp(this.currentDistance,r,1-Math.exp(-3.2*e)),this.desiredPosition.copy(this.smoothedFocus).addScaledVector(this.toCamera,Math.max(1.6,this.currentDistance)),this.ceilingY!==null&&this.desiredPosition.y>this.ceilingY&&(this.desiredPosition.y=this.ceilingY),this.camera.position.copy(this.desiredPosition),this.camera.lookAt(this.smoothedFocus)}autoFollow(e,t){if(this.manualTimer>0||t.speed<2.2)return;const n=this.smoothedFocus.x-this.camera.position.x,s=this.smoothedFocus.z-this.camera.position.z,r=Math.hypot(n,s);if(r>.001&&(t.velocity.x*n+t.velocity.z*s)/r<t.speed*.35)return;let a=t.facing+Math.PI-this.yaw;for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;const l=Ne.clamp((t.speed-2.2)/6,0,1);this.yaw+=a*(1-Math.exp(-1.9*l*e))}distanceToObstruction(e){const n=this.world.raycast(this.smoothedFocus,this.toCamera,e+.42);return Math.max(1.6,Math.min(e,n-.42))}reset(e){this.initialised=!1,this.manualTimer=0,this.pitch=.33,this.update(1/60,e)}}const Or=.22,xl=180,Sg=.5;class yg{constructor(){k(this,"move",new Te);k(this,"look",new Te);k(this,"gamepadConnected",!1);k(this,"lastKey","—");k(this,"lastKeyRecognised",!1);k(this,"usingGamepad",!1);k(this,"keys",new Set);k(this,"held",new Set);k(this,"pendingPresses",new Set);k(this,"pendingReleases",new Set);k(this,"pressedThisFrame",new Set);k(this,"releasedThisFrame",new Set);k(this,"mouseDelta",new Te);k(this,"pointerLocked",!1);k(this,"pointerLockWanted",!1);k(this,"discardNextMouseMove",!1);k(this,"previousButtons",[]);k(this,"element",null);k(this,"disposers",[])}attach(e){this.element=e;const t=h=>{if(h.repeat)return;this.keys.add(h.code),this.lastKey=h.code,this.lastKeyRecognised=Sl.has(h.code)||Br[h.code]!==void 0||h.code==="ShiftLeft"||h.code==="ShiftRight",this.usingGamepad=!1;const u=Br[h.code];u&&(this.press(u),u!=="pause"&&h.preventDefault()),Sl.has(h.code)&&h.preventDefault()},n=h=>{this.keys.delete(h.code);const u=Br[h.code];u&&this.release(u)},s=()=>this.clear(),r=h=>{if(this.pointerLocked){if(this.discardNextMouseMove){this.discardNextMouseMove=!1;return}this.mouseDelta.x+=Ml(h.movementX),this.mouseDelta.y+=Ml(h.movementY),this.usingGamepad=!1}},o=()=>{const h=document.pointerLockElement===this.element;h&&!this.pointerLocked&&(this.discardNextMouseMove=!0,this.mouseDelta.set(0,0)),this.pointerLocked=h},a=()=>{this.pointerLockWanted&&!this.pointerLocked&&this.requestPointerLock()},l=()=>{this.gamepadConnected=!0},c=()=>{this.gamepadConnected=navigator.getGamepads().some(h=>h!==null)};window.addEventListener("keydown",t),window.addEventListener("keyup",n),window.addEventListener("blur",s),document.addEventListener("mousemove",r),document.addEventListener("pointerlockchange",o),e.addEventListener("mousedown",a),window.addEventListener("gamepadconnected",l),window.addEventListener("gamepaddisconnected",c),this.disposers=[()=>window.removeEventListener("keydown",t),()=>window.removeEventListener("keyup",n),()=>window.removeEventListener("blur",s),()=>document.removeEventListener("mousemove",r),()=>document.removeEventListener("pointerlockchange",o),()=>e.removeEventListener("mousedown",a),()=>window.removeEventListener("gamepadconnected",l),()=>window.removeEventListener("gamepaddisconnected",c)]}dispose(){for(const e of this.disposers)e();this.disposers=[],this.clear()}update(e,t){this.pressedThisFrame.clear(),this.releasedThisFrame.clear();for(const o of this.pendingPresses)this.pressedThisFrame.add(o);for(const o of this.pendingReleases)this.releasedThisFrame.add(o);this.pendingPresses.clear(),this.pendingReleases.clear(),this.move.set(0,0),this.look.set(0,0);let n=0,s=0;(this.keys.has("KeyE")||this.keys.has("ArrowUp"))&&(s-=1),(this.keys.has("KeyD")||this.keys.has("ArrowDown"))&&(s+=1),(this.keys.has("KeyS")||this.keys.has("ArrowLeft"))&&(n-=1),(this.keys.has("KeyF")||this.keys.has("ArrowRight"))&&(n+=1),(n!==0||s!==0)&&(this.move.set(n,s).normalize(),(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"))&&this.move.multiplyScalar(.45)),this.look.x+=this.mouseDelta.x*.0022*e,this.look.y+=this.mouseDelta.y*.0022*e*(t?-1:1),this.mouseDelta.set(0,0);const r=.035*e;this.keys.has("KeyJ")&&(this.look.x-=r),this.keys.has("KeyL")&&(this.look.x+=r),this.keys.has("KeyI")&&(this.look.y-=r*(t?-1:1)),this.keys.has("KeyK")&&(this.look.y+=r*(t?-1:1)),this.pollGamepad(e,t)}pollGamepad(e,t){const n=navigator.getGamepads?navigator.getGamepads():[];let s=null;for(const h of n)if(h&&h.connected){s=h;break}if(!s){this.previousButtons=[];return}this.gamepadConnected=!0;const r=ks(s.axes[0]??0),o=ks(s.axes[1]??0);if(r!==0||o!==0){const h=Math.min(1,Math.hypot(r,o)),u=Math.hypot(r,o)||1;this.move.set(r/u*h,o/u*h),this.usingGamepad=!0}const a=ks(s.axes[2]??0),l=ks(s.axes[3]??0);(a!==0||l!==0)&&(this.look.x+=a*.045*e,this.look.y+=l*.035*e*(t?-1:1),this.usingGamepad=!0);const c=s.buttons.map(h=>h.pressed||h.value>Sg);for(const[h,u]of Object.entries(bg)){const f=Number(h),p=c[f]===!0,g=this.previousButtons[f]===!0;p&&!g?(this.held.has(u)||this.pressedThisFrame.add(u),this.held.add(u),this.usingGamepad=!0):!p&&g&&this.held.delete(u)&&this.releasedThisFrame.add(u)}this.previousButtons=c}press(e){this.held.has(e)||this.pendingPresses.add(e),this.held.add(e)}release(e){this.held.delete(e)&&this.pendingReleases.add(e)}isDown(e){return this.held.has(e)}wasPressed(e){return this.pressedThisFrame.has(e)}wasReleased(e){return this.releasedThisFrame.has(e)}get moveStrength(){return Math.min(1,this.move.length())}setPointerLockWanted(e){this.pointerLockWanted=e,!e&&this.pointerLocked&&document.exitPointerLock()}togglePointerLock(){this.pointerLocked?(this.pointerLockWanted=!1,document.exitPointerLock()):(this.pointerLockWanted=!0,this.requestPointerLock())}requestPointerLock(){if(!this.element||this.pointerLocked)return;const e=this.element.requestPointerLock();e&&typeof e.catch=="function"&&e.catch(()=>{})}get isPointerLocked(){return this.pointerLocked}clear(){this.keys.clear(),this.held.clear(),this.pendingPresses.clear(),this.pendingReleases.clear(),this.pressedThisFrame.clear(),this.releasedThisFrame.clear(),this.mouseDelta.set(0,0),this.move.set(0,0),this.look.set(0,0),this.discardNextMouseMove=!0}}function Ml(i){return Number.isFinite(i)?Math.max(-xl,Math.min(xl,i)):0}function ks(i){return Math.abs(i)<Or?0:Math.sign(i)*((Math.abs(i)-Or)/(1-Or))}const Br={Space:"jump",KeyR:"grab",KeyQ:"crouch",KeyL:"togglePointerLock",Escape:"pause",ControlLeft:"dive",KeyC:"dive",KeyW:"interact",KeyA:"sideFlip"},bg={0:"jump",2:"grab",3:"sideFlip",1:"dive",6:"crouch",9:"pause"},Sl=new Set(["KeyE","KeyS","KeyD","KeyF","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]);class Sc{constructor(e=new P(0,0,0),t=new P(0,1,0),n=1){this.start=e,this.end=t,this.radius=n}clone(){return new this.constructor().copy(this)}set(e,t,n){return this.start.copy(e),this.end.copy(t),this.radius=n,this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this.radius=e.radius,this}getCenter(e){return e.copy(this.end).add(this.start).multiplyScalar(.5)}translate(e){return this.start.add(e),this.end.add(e),this}intersectsBox(e){return kr(this.start.x,this.start.y,this.end.x,this.end.y,e.min.x,e.max.x,e.min.y,e.max.y,this.radius)&&kr(this.start.x,this.start.z,this.end.x,this.end.z,e.min.x,e.max.x,e.min.z,e.max.z,this.radius)&&kr(this.start.y,this.start.z,this.end.y,this.end.z,e.min.y,e.max.y,e.min.z,e.max.z,this.radius)}}function kr(i,e,t,n,s,r,o,a,l){return(s-i<l||s-t<l)&&(i-r<l||t-r<l)&&(o-e<l||o-n<l)&&(e-a<l||n-a<l)}const Wi=new P,Xi=new P,zs=new P,qi=new P,hn=new kn,zr=new pc,Eg=new pc,Hs=new cs,ji=new Sc,Tg=new P,wg=new P,Ag=new P,Rg=1e-10;function Cg(i,e,t=null,n=null){const s=Tg.copy(i.end).sub(i.start),r=wg.copy(e.end).sub(e.start),o=Ag.copy(e.start).sub(i.start),a=s.dot(r),l=s.dot(s),c=r.dot(r),h=r.dot(o),u=s.dot(o);let f,p;const g=l*c-a*a;if(Math.abs(g)<Rg){const M=-h/c,m=(a-h)/c;Math.abs(M-.5)<Math.abs(m-.5)?(f=0,p=M):(f=1,p=m)}else f=(h*a+u*c)/g,p=(f*a-h)/c;p=Math.max(0,Math.min(1,p)),f=Math.max(0,Math.min(1,f)),t&&t.copy(s).multiplyScalar(f).add(i.start),n&&n.copy(r).multiplyScalar(p).add(e.start)}class sa{constructor(e){this.box=e,this.bounds=new Ht,this.layers=new Jo,this.trianglesPerLeaf=8,this.maxLevel=16,this.subTrees=[],this.triangles=[]}addTriangle(e){return this.bounds.min.x=Math.min(this.bounds.min.x,e.a.x,e.b.x,e.c.x),this.bounds.min.y=Math.min(this.bounds.min.y,e.a.y,e.b.y,e.c.y),this.bounds.min.z=Math.min(this.bounds.min.z,e.a.z,e.b.z,e.c.z),this.bounds.max.x=Math.max(this.bounds.max.x,e.a.x,e.b.x,e.c.x),this.bounds.max.y=Math.max(this.bounds.max.y,e.a.y,e.b.y,e.c.y),this.bounds.max.z=Math.max(this.bounds.max.z,e.a.z,e.b.z,e.c.z),this.triangles.push(e),this}calcBox(){return this.box=this.bounds.clone(),this.box.min.x-=.01,this.box.min.y-=.01,this.box.min.z-=.01,this}split(e){if(!this.box)return;const t=[],n=Xi.copy(this.box.max).sub(this.box.min).multiplyScalar(.5);for(let r=0;r<2;r++)for(let o=0;o<2;o++)for(let a=0;a<2;a++){const l=new Ht,c=Wi.set(r,o,a);l.min.copy(this.box.min).add(c.multiply(n)),l.max.copy(l.min).add(n),t.push(new sa(l))}let s;for(;s=this.triangles.pop();)for(let r=0;r<t.length;r++)t[r].box.intersectsTriangle(s)&&t[r].triangles.push(s);for(let r=0;r<t.length;r++){const o=t[r].triangles.length;o>this.trianglesPerLeaf&&e<this.maxLevel&&t[r].split(e+1),o!==0&&this.subTrees.push(t[r])}return this}build(){return this.calcBox(),this.split(0),this}getRayTriangles(e,t){for(let n=0;n<this.subTrees.length;n++){const s=this.subTrees[n];if(e.intersectsBox(s.box))if(s.triangles.length>0)for(let r=0;r<s.triangles.length;r++)t.indexOf(s.triangles[r])===-1&&t.push(s.triangles[r]);else s.getRayTriangles(e,t)}}triangleCapsuleIntersect(e,t){t.getPlane(hn);const n=hn.distanceToPoint(e.start)-e.radius,s=hn.distanceToPoint(e.end)-e.radius;if(n>0&&s>0||n<-e.radius&&s<-e.radius)return!1;const r=Math.abs(n/(Math.abs(n)+Math.abs(s))),o=Wi.copy(e.start).lerp(e.end,r);if(t.containsPoint(o))return{normal:hn.normal.clone(),point:o.clone(),depth:Math.abs(Math.min(n,s))};const a=e.radius*e.radius,l=zr.set(e.start,e.end),c=[[t.a,t.b],[t.b,t.c],[t.c,t.a]];for(let h=0;h<c.length;h++){const u=Eg.set(c[h][0],c[h][1]);if(Cg(l,u,zs,qi),zs.distanceToSquared(qi)<a)return{normal:zs.clone().sub(qi).normalize(),point:qi.clone(),depth:e.radius-zs.distanceTo(qi)}}return!1}triangleSphereIntersect(e,t){if(t.getPlane(hn),!e.intersectsPlane(hn))return!1;const n=Math.abs(hn.distanceToSphere(e)),s=e.radius*e.radius-n*n,r=hn.projectPoint(e.center,Wi);if(t.containsPoint(e.center))return{normal:hn.normal.clone(),point:r.clone(),depth:Math.abs(hn.distanceToSphere(e))};const o=[[t.a,t.b],[t.b,t.c],[t.c,t.a]];for(let a=0;a<o.length;a++){zr.set(o[a][0],o[a][1]),zr.closestPointToPoint(r,!0,Xi);const l=Xi.distanceToSquared(e.center);if(l<s)return{normal:e.center.clone().sub(Xi).normalize(),point:Xi.clone(),depth:e.radius-Math.sqrt(l)}}return!1}getSphereTriangles(e,t){for(let n=0;n<this.subTrees.length;n++){const s=this.subTrees[n];if(e.intersectsBox(s.box))if(s.triangles.length>0)for(let r=0;r<s.triangles.length;r++)t.indexOf(s.triangles[r])===-1&&t.push(s.triangles[r]);else s.getSphereTriangles(e,t)}}getCapsuleTriangles(e,t){for(let n=0;n<this.subTrees.length;n++){const s=this.subTrees[n];if(e.intersectsBox(s.box))if(s.triangles.length>0)for(let r=0;r<s.triangles.length;r++)t.indexOf(s.triangles[r])===-1&&t.push(s.triangles[r]);else s.getCapsuleTriangles(e,t)}}sphereIntersect(e){Hs.copy(e);const t=[];let n,s=!1;this.getSphereTriangles(e,t);for(let r=0;r<t.length;r++)(n=this.triangleSphereIntersect(Hs,t[r]))&&(s=!0,Hs.center.add(n.normal.multiplyScalar(n.depth)));if(s){const r=Hs.center.clone().sub(e.center),o=r.length();return{normal:r.normalize(),depth:o}}return!1}capsuleIntersect(e){ji.copy(e);const t=[];let n,s=!1;this.getCapsuleTriangles(ji,t);for(let r=0;r<t.length;r++)(n=this.triangleCapsuleIntersect(ji,t[r]))&&(s=!0,ji.translate(n.normal.multiplyScalar(n.depth)));if(s){const r=ji.getCenter(new P).sub(e.getCenter(Wi)),o=r.length();return{normal:r.normalize(),depth:o}}return!1}rayIntersect(e){const t=[];let n,s,r=1e100;this.getRayTriangles(e,t);for(let o=0;o<t.length;o++){const a=e.intersectTriangle(t[o].a,t[o].b,t[o].c,!0,Wi);if(a){const l=a.sub(e.origin).length();r>l&&(s=a.clone().add(e.origin),r=l,n=t[o])}}return r<1e100?{distance:r,triangle:n,position:s}:!1}fromGraphNode(e){return e.updateWorldMatrix(!0,!0),e.traverse(t=>{if(t.isMesh===!0&&this.layers.test(t.layers)){let n,s=!1;t.geometry.index!==null?(s=!0,n=t.geometry.toNonIndexed()):n=t.geometry;const r=n.getAttribute("position");for(let o=0;o<r.count;o+=3){const a=new P().fromBufferAttribute(r,o),l=new P().fromBufferAttribute(r,o+1),c=new P().fromBufferAttribute(r,o+2);a.applyMatrix4(t.matrixWorld),l.applyMatrix4(t.matrixWorld),c.applyMatrix4(t.matrixWorld),this.addTriangle(new Zt(a,l,c))}s&&n.dispose()}}),this.build(),this}clear(){return this.box=null,this.bounds.makeEmpty(),this.subTrees.length=0,this.triangles.length=0,this}}class Pg{constructor(){k(this,"octree",new sa);k(this,"waters",[]);k(this,"ladders",[]);k(this,"scratchRay",new Ko);k(this,"scratchVector",new P)}addSolid(e){this.octree.fromGraphNode(e)}addWater(e,t,n){this.waters.push({bounds:e,surfaceY:t,test:n})}capsuleIntersect(e){const t=this.octree.capsuleIntersect(e);return t?{normal:t.normal,depth:t.depth}:null}raycast(e,t,n){this.scratchRay.set(e,t);const s=this.octree.rayIntersect(this.scratchRay);return!s||s.distance>n?n:s.distance}addLadder(e,t,n,s){this.ladders.push({bounds:e,facing:t,topY:n,anchor:s})}ladderAt(e,t=0){for(const n of this.ladders)if(e.x>=n.bounds.min.x-t&&e.x<=n.bounds.max.x+t&&e.z>=n.bounds.min.z-t&&e.z<=n.bounds.max.z+t&&e.y>=n.bounds.min.y-t&&e.y<=n.bounds.max.y)return n;return null}waterAt(e){for(const t of this.waters)if(e.x>=t.bounds.min.x&&e.x<=t.bounds.max.x&&e.z>=t.bounds.min.z&&e.z<=t.bounds.max.z&&e.y>=t.bounds.min.y&&e.y<=t.surfaceY&&(!t.test||t.test(e.x,e.z)))return t;return null}groundProbe(e,t){this.scratchVector.set(0,-1,0),this.scratchRay.set(e,this.scratchVector);const n=this.octree.rayIntersect(this.scratchRay);if(!n||n.distance>t)return null;const s=n.triangle.getNormal(new P);return s.y<0&&s.negate(),{y:e.y-n.distance,normal:s}}groundHeightBelow(e,t=200){this.scratchVector.set(0,-1,0),this.scratchRay.set(e,this.scratchVector);const n=this.octree.rayIntersect(this.scratchRay);return!n||n.distance>t?-1/0:e.y-n.distance}reset(){this.waters.length=0}}const X={runSpeed:8.6,walkSpeed:3.1,acceleration:32,deceleration:26,skidDeceleration:46,skidDotThreshold:-.55,skidMinSpeed:5.2,turnRateSlow:13,turnRateFast:5.2,gravity:27,fallGravityMultiplier:1.42,jumpVelocity:9.6,doubleJumpVelocity:11.5,tripleJumpVelocity:13.5,jumpComboWindow:.26,jumpComboMinSpeed:2.6,tripleJumpFlipDelay:.13,tripleJumpFlipDelayShare:.3,tripleJumpFlipMinAirtime:.45,tripleJumpFlipDelayMin:.035,tripleJumpLandMargin:.07,jumpCutMultiplier:.42,airAcceleration:14,airDeceleration:2.2,airTurnRate:6,coyoteTime:.11,jumpBufferTime:.14,crouchDeceleration:11,crouchSpeed:1.6,crouchTurnRate:3.4,longJumpMinSpeed:4.2,longJumpSpeed:17.5,longJumpVelocity:8.6,longJumpAirControl:.25,backflipMaxSpeed:3,backflipVelocity:13,backflipSpeed:5.4,wallKickWindow:.18,wallKickVelocity:11.2,wallKickSpeed:8.4,sideFlipApex:3,sideFlipLeastVelocity:4.5,sideFlipSpeed:5,sideFlipWindow:.3,airBoostVelocity:5.4,groundPoundHover:.22,groundPoundRecovery:.3,ladderSnagDistance:.85,ladderSpeed:2.8,ladderStandOff:.42,ladderHandHigh:.46,ladderHandLow:.1,ladderJumpOff:4.5,ladderCooldown:.6,ledgeReach:.62,ledgeReachExtra:.45,ledgeGrabLow:.75,ledgeGrabHigh:1.95,ledgeGrabRise:3,ledgeWideDepth:1.15,ledgeStandNarrow:.5,ledgeStandWide:.95,ledgeVaultOver:1.15,ledgeHandForward:.36,ledgeHangLift:1.72,ledgeSettleDown:.8,ledgeSettleUp:.25,ledgeSwingSeconds:.52,ledgeMantleSeconds:.8,ledgeVaultSeconds:.5,ledgeCooldown:.25,brakeMinSpeed:5.4,brakeEndSpeed:1.2,brakeSlideShort:.762,brakeSlideLong:2.03,brakeMomentumBuild:2.83,brakeMomentumFade:1.2,brakeMomentumCurve:1.45,maxWalkableSlopeDegrees:52,groundSnapDistance:.42,stepHeight:.45,swimSpeed:3.4,swimAcceleration:9,swimDrag:2.6,buoyancy:9.5,strokeImpulse:4.6,strokeCooldown:.52,diveAcceleration:11,floatSubmersion:.62,splashSpeed:6,carrySpeedMultiplier:.82,carryReach:1.9,throwSpeed:11,throwLift:4.2,killPlaneY:-45},yl=Math.cos(X.maxWalkableSlopeDegrees*Math.PI/180),Zn={shirt:"#d9353a",overalls:"#2f5fd0",skin:"#f3c29a",glove:"#fbfbf7",shoe:"#6a3b1c",buckle:"#f2c94c",clay:"#b9b2a6"};function Lg(i,e=.72,t=0){return new gt({color:new pe(i),roughness:e,metalness:t,flatShading:!1})}function kt(i,e,t=[0,0,0]){const n=new He(i,e);return n.position.set(t[0],t[1],t[2]),n.castShadow=!0,n.receiveShadow=!1,n}function Yi(i,e,t){const n=[],s=t/2,r=5;for(let o=0;o<=r;o+=1){const a=Math.PI/2*(o/r);n.push(new Te(Math.sin(a)*e,-s-Math.cos(a)*e))}n.push(new Te(i,s));for(let o=1;o<=r;o+=1){const a=Math.PI/2*(o/r);n.push(new Te(Math.cos(a)*i,s+Math.sin(a)*i))}return new us(n,14)}const yc=[[0,-.2],[.108,-.195],[.186,-.168],[.238,-.108],[.26,-.03],[.268,.056],[.264,.136],[.256,.192],[.272,.248],[.286,.3],[.29,.345],[.272,.388],[.206,.424],[.124,.448],[0,.46]],Qi=.93;function Dg(){return new us(yc.map(([i,e])=>new Te(i*Qi,e)),20)}function Ig(i){const e=[];for(const[n,s]of yc){if(s>i)break;e.push(new Te(n*Qi*1.035,s))}const t=e[e.length-1];return e.push(new Te(t.x*.97,i)),e.push(new Te(0,i)),new us(e,20)}const Qn=1.82,ra=.92,Fn=.34,At={shoulderX:.282,shoulderY:.345,upper:.32,lower:.34},Ug=ra+At.shoulderY;function Ng(i={}){const e=[],t=(w,C,N)=>{const y=Lg(w,C,N);return e.push(y),y},n=i.plain===!0,s=n?t(Zn.clay,.78):null,r=s??t(Zn.shirt,.78),o=s??t(Zn.overalls,.74),a=s??t(Zn.skin,.68),l=s??t(Zn.glove,.66),c=s??t(Zn.shoe,.7),h=s??t(Zn.buckle,.35,.55),u=new mt,f=new mt;f.position.y=ra,u.add(f);const p=new mt;if(f.add(p),p.add(kt(Dg(),r)),!n){p.add(kt(Ig(.16),o));for(const w of[-.125,.125])p.add(kt(new bn(.05,10,8),h,[w*Qi,.21,.27*Qi]))}p.add(kt(Yi(.094,.118,.15),a,[0,.5,.004]));const g=new mt;if(g.position.set(0,.685,0),p.add(g),g.add(kt(new bn(.22,20,18),a)),!n){g.add(kt(new bn(.228,18,12,0,Math.PI*2,0,Math.PI*.52),r,[0,.07,0]));const w=kt(new Tn(.14,.168,.04,14,1,!1,Math.PI*.75,Math.PI*1.5),r,[0,.068,.152]);w.rotation.x=-.16,g.add(w),g.add(kt(new bn(.068,12,10),a,[0,-.045,.2]))}const M=w=>{const C=new mt;C.position.set(At.shoulderX*Qi*w,At.shoulderY,0),p.add(C),C.add(kt(Yi(.1,.11,.14),r,[0,-.16,0]));const N=new mt;N.position.y=-.32,C.add(N),N.add(kt(Yi(.096,.104,.17),r,[0,-.17,0]));const y=kt(new bn(.142,14,12),l,[0,-.34,0]);return y.scale.set(1.08,1,.82),N.add(y),{shoulder:C,elbow:N}},m=M(-1),d=M(1),T=w=>{const C=new mt;C.position.set(.158*w,-.02,0),p.add(C),C.add(kt(Yi(.128,.148,.2),o,[0,-.2,0]));const N=new mt;N.position.y=-.42,C.add(N),N.add(kt(Yi(.115,.128,.18),o,[0,-.17,0]));const y=new mt;y.position.y=-.38,N.add(y);const b=kt(new bn(.172,14,12),c,[0,.014,.05]);return b.scale.set(.82,.58,1.44),y.add(b),{hip:C,knee:N,ankle:y}},E=T(-1),v=T(1),A=new Mt;return A.position.set(0,.3,.68),p.add(A),u.traverse(w=>{w instanceof He&&(w.castShadow=!0,w.receiveShadow=!1)}),{root:u,body:f,torso:p,head:g,shoulderLeft:m.shoulder,shoulderRight:d.shoulder,elbowLeft:m.elbow,elbowRight:d.elbow,hipLeft:E.hip,hipRight:v.hip,kneeLeft:E.knee,kneeRight:v.knee,ankleLeft:E.ankle,ankleRight:v.ankle,carryAnchor:A,materials:e}}const x=bc(),lt=bc();let bl=!1,Hr=0,El=0;function bc(){return{bodyPitch:0,bodyRoll:0,bodyYaw:0,bodyHeight:0,bodySquash:1,headPitch:0,headYaw:0,shoulderLeftPitch:0,shoulderRightPitch:0,shoulderLeftRoll:0,shoulderRightRoll:0,elbowLeft:0,elbowRight:0,hipLeft:0,hipRight:0,kneeLeft:0,kneeRight:0,ankleLeft:0,ankleRight:0}}function Fg(i,e){Og(e);const t=e.state==="ledge"?26:e.state==="air"?16:e.state==="climb"?15:13,n=1-Math.exp(-t*e.delta);if(!bl)Object.assign(lt,x),bl=!0;else for(const o of Object.keys(x))lt[o]=Ne.lerp(lt[o],x[o],n);const s=e.flipAxis==="pitch"?e.flipAngle:0,r=e.flipAxis==="roll"?e.flipAngle:0;i.body.rotation.set(lt.bodyPitch+s,lt.bodyYaw,lt.bodyRoll+r),i.body.position.y=ra+lt.bodyHeight,i.body.scale.set(1/Math.sqrt(lt.bodySquash),lt.bodySquash,1/Math.sqrt(lt.bodySquash)),i.head.rotation.set(lt.headPitch,lt.headYaw,0),i.shoulderLeft.rotation.set(lt.shoulderLeftPitch,0,-lt.shoulderLeftRoll),i.shoulderRight.rotation.set(lt.shoulderRightPitch,0,lt.shoulderRightRoll),i.elbowLeft.rotation.x=lt.elbowLeft,i.elbowRight.rotation.x=lt.elbowRight,i.hipLeft.rotation.x=lt.hipLeft,i.hipRight.rotation.x=lt.hipRight,i.kneeLeft.rotation.x=lt.kneeLeft,i.kneeRight.rotation.x=lt.kneeRight,i.ankleLeft.rotation.x=lt.ankleLeft,i.ankleRight.rotation.x=lt.ankleRight}function Og(i){switch(Bg(x),i.state){case"climb":Vg(i);break;case"ledge":zg(i);break;case"swim":Wg(i);break;case"air":Gg(i);break;default:kg(i);break}i.carrying&&Xg(),i.landing&&qg()}function Bg(i){i.bodyPitch=0,i.bodyRoll=0,i.bodyYaw=0,i.bodyHeight=0,i.bodySquash=1,i.headPitch=0,i.headYaw=0,i.shoulderLeftPitch=0,i.shoulderRightPitch=0,i.shoulderLeftRoll=.17,i.shoulderRightRoll=.17,i.elbowLeft=0,i.elbowRight=0,i.hipLeft=0,i.hipRight=0,i.kneeLeft=0,i.kneeRight=0,i.ankleLeft=0,i.ankleRight=0}function kg(i){const e=Ne.clamp(i.speed/i.maxSpeed,0,1);if(i.poundPhase==="landed"){x.bodyPitch=.18,x.bodyHeight=-.3,x.bodySquash=.88,x.shoulderLeftPitch=-.9,x.shoulderRightPitch=-.9,x.shoulderLeftRoll=.7,x.shoulderRightRoll=.7,x.elbowLeft=-.5,x.elbowRight=-.5,x.hipLeft=-1.3,x.hipRight=-1.3,x.kneeLeft=2.1,x.kneeRight=2.1,x.ankleLeft=-.9,x.ankleRight=-.9,x.headPitch=-.2;return}if(i.crouching){x.bodyPitch=.3,x.bodyHeight=-.185,x.hipLeft=-1.15,x.hipRight=-1.15,x.kneeLeft=1.95,x.kneeRight=1.95,x.ankleLeft=-.95,x.ankleRight=-.95,x.shoulderLeftPitch=-.75,x.shoulderRightPitch=-.75,x.shoulderLeftRoll=.42,x.shoulderRightRoll=.42,x.elbowLeft=-.7,x.elbowRight=-.7,x.headPitch=-.26,x.bodySquash=.94;return}if(i.braking){const l=Ne.lerp(.4,1,Ne.clamp(i.brakeStrength,0,1));x.bodyPitch=-.34*l,x.bodyHeight=-.025*l,x.bodyRoll=.07*l,x.shoulderLeftPitch=-1.15*l,x.shoulderRightPitch=-.55*l,x.shoulderLeftRoll=Ne.lerp(.17,.95,l),x.shoulderRightRoll=Ne.lerp(.17,.8,l),x.elbowLeft=-.35*l,x.elbowRight=-.25*l,x.hipLeft=-.72*l,x.hipRight=.22*l,x.kneeLeft=.62*l,x.kneeRight=1.15*l,x.ankleLeft=0,x.ankleRight=-.35*l,x.headPitch=-.12*l;return}if(i.skidding){x.bodyPitch=-.3,x.bodyHeight=-.11,x.shoulderLeftPitch=-1.5,x.shoulderRightPitch=-1.2,x.shoulderLeftRoll=.85,x.shoulderRightRoll=.7,x.hipLeft=-.5,x.hipRight=.35,x.kneeLeft=.45,x.kneeRight=.2,x.headPitch=-.18;return}if(i.speed<.3){const l=Math.sin(i.time*1.7);x.bodyHeight=l*.012,x.bodySquash=1+l*.008,x.headYaw=Math.sin(i.time*.45)*.22,x.headPitch=Math.sin(i.time*.33)*.05,x.shoulderLeftPitch=.06,x.shoulderRightPitch=-.06,x.shoulderLeftRoll=.2,x.shoulderRightRoll=.2,x.elbowLeft=-.16,x.elbowRight=-.16;return}const t=2.6+e*5.4;Hr=(Hr+t*i.delta)%(Math.PI*2);const n=Hr,s=Math.sin(n),r=Math.sin(n+Math.PI),o=Ne.lerp(.42,1,e),a=Ne.lerp(.3,.95,e);x.hipLeft=s*o,x.hipRight=r*o,x.kneeLeft=Math.max(0,s)*o*1.25,x.kneeRight=Math.max(0,r)*o*1.25,x.ankleLeft=s*.42+.08,x.ankleRight=r*.42+.08,x.shoulderLeftPitch=r*a,x.shoulderRightPitch=s*a,x.elbowLeft=-.22-Math.max(0,-r)*a*.6,x.elbowRight=-.22-Math.max(0,-s)*a*.6,x.shoulderLeftRoll=.18+e*.04-Math.max(0,-r)*.1,x.shoulderRightRoll=.18+e*.04-Math.max(0,-s)*.1,x.bodyPitch=e*.26,x.bodyHeight=Math.abs(Math.sin(n))*.05*e-.02*e,x.bodyRoll=Math.sin(n)*.055*e,x.bodyYaw=Math.sin(n)*.09*e,x.headYaw=-x.bodyYaw*.7,x.headPitch=-e*.12}function zg(i){const e=i.ledgeWide,t=i.ledgeHanging?0:Ne.clamp(i.ledgeProgress,0,1),n=t>=.45,s=n?(t-.45)/.55:t/.45,r=s*s*(3-2*s),o=(a,l,c)=>n?Ne.lerp(l,c,r):Ne.lerp(a,l,r);x.bodyPitch=o(.1,e?.34:.52,.05),x.bodyHeight=o(-.04,-.02,0),x.bodySquash=o(1.02,.97,1),x.headPitch=o(-.3,-.16,0),x.hipLeft=o(-.16,e?-1.4:-1.75,-.24),x.hipRight=o(-.16,e?-1.4:-.6,-.24),x.kneeLeft=o(.3,e?1.85:1.95,.34),x.kneeRight=o(.3,e?1.85:.9,.34),x.ankleLeft=o(.2,.24,0),x.ankleRight=o(.2,.24,0),x.bodyRoll=e?0:o(0,.18,0),Hg(i)}function Hg(i){const e=Ug+x.bodyHeight,t=i.ledgeLift-e,n=X.ledgeHandForward,s=Math.hypot(t,n),r=At.upper+At.lower;if(s>r-.01){const a=Ne.clamp((s-r)/.3,0,1);if(x.shoulderLeftPitch=Ne.lerp(x.shoulderLeftPitch,-.3,a),x.shoulderRightPitch=Ne.lerp(x.shoulderRightPitch,-.3,a),x.elbowLeft=Ne.lerp(x.elbowLeft,-.28,a),x.elbowRight=Ne.lerp(x.elbowRight,-.28,a),a>=1)return}const o=Oo(t,n);x.shoulderLeftPitch=o.shoulder,x.shoulderRightPitch=o.shoulder,x.elbowLeft=o.elbow,x.elbowRight=o.elbow,x.shoulderLeftRoll=.14,x.shoulderRightRoll=.14}const Vr={shoulder:0,elbow:0};function Oo(i,e){const t=At.upper+At.lower,n=Ne.clamp(Math.hypot(i,e),.1,t-.012),s=Math.atan2(-e,-i),r=Math.acos(Ne.clamp((At.upper*At.upper+n*n-At.lower*At.lower)/(2*At.upper*n),-1,1)),o=Math.acos(Ne.clamp((At.upper*At.upper+At.lower*At.lower-n*n)/(2*At.upper*At.lower),-1,1));return Vr.shoulder=s+r,Vr.elbow=-(Math.PI-o),Vr}function Vg(i){El+=i.climbSpeed*i.delta*2.6;const e=Math.sin(El);x.bodyPitch=.12+Math.abs(e)*.06,x.headPitch=-.24,x.bodyRoll=e*.11,x.bodyYaw=e*.14,x.bodyHeight=-.04+Math.abs(e)*.05;const t=X.ladderStandOff,n=(e+1)*.5,s=Oo(Ne.lerp(X.ladderHandLow,X.ladderHandHigh,n),t);x.shoulderLeftPitch=s.shoulder,x.elbowLeft=s.elbow;const r=Oo(Ne.lerp(X.ladderHandHigh,X.ladderHandLow,n),t);x.shoulderRightPitch=r.shoulder,x.elbowRight=r.elbow,x.shoulderLeftRoll=.26,x.shoulderRightRoll=.26,x.hipLeft=-.34-Math.max(0,-e)*1.15,x.hipRight=-.34-Math.max(0,e)*1.15,x.kneeLeft=.34+Math.max(0,-e)*1.4,x.kneeRight=.34+Math.max(0,e)*1.4,x.ankleLeft=.3-Math.max(0,e)*.35,x.ankleRight=.3-Math.max(0,-e)*.35}function Gg(i){const e=i.verticalSpeed>.5;if(i.againstWall&&!e){x.bodyPitch=-.1,x.shoulderLeftPitch=-.5,x.shoulderRightPitch=-.5,x.shoulderLeftRoll=1,x.shoulderRightRoll=1,x.elbowLeft=-.9,x.elbowRight=-.9,x.hipLeft=-.85,x.hipRight=-.2,x.kneeLeft=.9,x.kneeRight=.3,x.ankleLeft=.1,x.ankleRight=.1,x.headPitch=-.12;return}if(i.poundPhase==="hover"){x.bodyPitch=.5,x.shoulderLeftPitch=-2.3,x.shoulderRightPitch=-2.3,x.shoulderLeftRoll=.9,x.shoulderRightRoll=.9,x.elbowLeft=-1.1,x.elbowRight=-1.1,x.hipLeft=-1.7,x.hipRight=-1.7,x.kneeLeft=2,x.kneeRight=2,x.bodySquash=.94,x.headPitch=-.3;return}if(i.poundPhase==="slam"){x.bodyPitch=-.55,x.bodyHeight=-.05,x.shoulderLeftPitch=-1.5,x.shoulderRightPitch=-1.5,x.shoulderLeftRoll=.75,x.shoulderRightRoll=.75,x.elbowLeft=-.4,x.elbowRight=-.4,x.hipLeft=-1.95,x.hipRight=-1.95,x.kneeLeft=.5,x.kneeRight=.5,x.ankleLeft=-.3,x.ankleRight=-.3,x.bodySquash=1.06,x.headPitch=.15;return}if(i.jumpKind==="side"){x.shoulderLeftPitch=-1.3,x.shoulderRightPitch=-1.3,x.shoulderLeftRoll=.55,x.shoulderRightRoll=.55,x.elbowLeft=-1.5,x.elbowRight=-1.5,x.hipLeft=-1.25,x.hipRight=-1.25,x.kneeLeft=1.6,x.kneeRight=1.6,x.ankleLeft=.3,x.ankleRight=.3,x.bodySquash=1.03;return}if(i.jumpKind==="long"){x.bodyPitch=.92,x.bodyHeight=-.06,x.shoulderLeftPitch=-2.5,x.shoulderRightPitch=-2.5,x.shoulderLeftRoll=.16,x.shoulderRightRoll=.16,x.elbowLeft=-.12,x.elbowRight=-.12,x.hipLeft=.55,x.hipRight=.42,x.kneeLeft=.5,x.kneeRight=.68,x.ankleLeft=.42,x.ankleRight=.42,x.headPitch=-.55,x.bodySquash=1.03;return}if(i.jumpKind==="back"){x.shoulderLeftPitch=1.9,x.shoulderRightPitch=1.9,x.shoulderLeftRoll=.3,x.shoulderRightRoll=.3,x.elbowLeft=-.5,x.elbowRight=-.5,x.hipLeft=-1.5,x.hipRight=-1.5,x.kneeLeft=1.75,x.kneeRight=1.75,x.ankleLeft=.3,x.ankleRight=.3,x.headPitch=.2,x.bodySquash=1.05;return}if(i.jumpKind==="wall"&&e){x.bodyPitch=.16,x.shoulderLeftPitch=-1.9,x.shoulderRightPitch=-.9,x.shoulderLeftRoll=.6,x.shoulderRightRoll=.75,x.elbowLeft=-.5,x.elbowRight=-.3,x.hipLeft=-1.3,x.hipRight=.45,x.kneeLeft=1.35,x.kneeRight=.25,x.ankleLeft=.2,x.ankleRight=.4,x.headPitch=-.1;return}if(i.flipping){x.shoulderLeftPitch=-2.75,x.shoulderRightPitch=-2.75,x.shoulderLeftRoll=.15,x.shoulderRightRoll=.15,x.elbowLeft=-1.5,x.elbowRight=-1.5,x.hipLeft=-1.3,x.hipRight=-1.3,x.kneeLeft=1.9,x.kneeRight=1.9,x.ankleLeft=.5,x.ankleRight=.5,x.bodySquash=1.04;return}if(e){const t=i.jumpStage===2?1.25:1;x.shoulderLeftPitch=-2.5*t,x.shoulderRightPitch=-2.5*t,x.shoulderLeftRoll=.22,x.shoulderRightRoll=.22,x.elbowLeft=-.35*t,x.elbowRight=-.35*t,x.hipLeft=-.55*t,x.hipRight=-.3*t,x.kneeLeft=1.05*t,x.kneeRight=.6*t,x.ankleLeft=.5,x.ankleRight=.42,x.bodyPitch=.12,x.bodySquash=1.06,x.headPitch=-.1}else{const t=Ne.clamp(-i.verticalSpeed/16,0,1);x.shoulderLeftPitch=-1.1-t*.5,x.shoulderRightPitch=-1.1-t*.5,x.shoulderLeftRoll=.75+t*.3,x.shoulderRightRoll=.75+t*.3,x.elbowLeft=-.5,x.elbowRight=-.5,x.hipLeft=-.26+t*.2,x.hipRight=.16,x.kneeLeft=.4,x.kneeRight=.18,x.ankleLeft=-.22,x.ankleRight=-.18,x.bodyPitch=-.06-t*.08,x.bodySquash=1+t*.04,x.headPitch=t*.12}}function Wg(i){const e=i.strokeProgress<1,t=e?i.strokeProgress:i.time*.78%1,n=e?1:.62,s=Math.sin(t*Math.PI)*n,r=Math.max(0,-Math.cos(t*2*Math.PI))*n;if(i.submerged){x.bodyPitch=i.diving?1.85:1.26,x.bodyHeight=.26,x.bodyRoll=Math.sin(t*2*Math.PI)*.12,x.shoulderLeftPitch=-2.5+s*1.35,x.shoulderRightPitch=-2.5+s*1.35,x.shoulderLeftRoll=.24+s*.95,x.shoulderRightRoll=.24+s*.95,x.elbowLeft=-.2-r*1.5,x.elbowRight=-.2-r*1.5,x.hipLeft=-.15-r*1+s*.35,x.hipRight=-.15-r*1+s*.35,x.kneeLeft=r*1.6,x.kneeRight=r*1.6,x.ankleLeft=.3-s*.5,x.ankleRight=.3-s*.5,x.headPitch=-.62;return}x.bodyPitch=.2,x.bodyHeight=.05,x.bodyRoll=Math.sin(t*2*Math.PI)*.1;const o=Math.sin(t*2*Math.PI),a=-o;x.shoulderLeftPitch=-1.15-o*.95,x.shoulderRightPitch=-1.15-a*.95,x.shoulderLeftRoll=.42+Math.max(0,o)*.3,x.shoulderRightRoll=.42+Math.max(0,a)*.3,x.elbowLeft=-.75-Math.max(0,-o)*.9,x.elbowRight=-.75-Math.max(0,-a)*.9,x.hipLeft=-.5-a*.55,x.hipRight=-.5-o*.55,x.kneeLeft=.6+Math.max(0,a)*.7,x.kneeRight=.6+Math.max(0,o)*.7,x.ankleLeft=.25,x.ankleRight=.25,x.headPitch=-.14}function Xg(){x.shoulderLeftPitch=-1.52,x.shoulderRightPitch=-1.52,x.shoulderLeftRoll=.3,x.shoulderRightRoll=.3,x.elbowLeft=-.35,x.elbowRight=-.35,x.bodyPitch=Math.max(x.bodyPitch,0)+.06}function qg(){x.bodySquash=.82,x.bodyHeight=-.12,x.hipLeft=-.6,x.hipRight=-.6,x.kneeLeft=1.05,x.kneeRight=1.05,x.ankleLeft=-.3,x.ankleRight=-.3,x.shoulderLeftPitch=-.45,x.shoulderRightPitch=-.45,x.shoulderLeftRoll=.55,x.shoulderRightRoll=.55}const Tl=new P(0,1,0);class jg{constructor(e,t,n={},s={}){k(this,"object");k(this,"rig");k(this,"velocity",new P);k(this,"state","air");k(this,"onGround",!1);k(this,"groundNormal",new P(0,1,0));k(this,"facing",0);k(this,"carried",null);k(this,"capsule");k(this,"world");k(this,"events");k(this,"coyoteTimer",0);k(this,"jumpBufferTimer",0);k(this,"jumpHeld",!1);k(this,"jumpStage",1);k(this,"comboWindow",0);k(this,"flipTimer",-1);k(this,"flipDelay",X.tripleJumpFlipDelay);k(this,"flipProgress",0);k(this,"landingTimer",0);k(this,"skidding",!1);k(this,"crouching",!1);k(this,"braking",!1);k(this,"momentum",0);k(this,"brakeRate",0);k(this,"brakeStrength",0);k(this,"jumpKind","normal");k(this,"flipDirection",1);k(this,"flipAxis","pitch");k(this,"airPresses",0);k(this,"sinceTakeOff",99);k(this,"tookOffRunning",!1);k(this,"takeOffY",0);k(this,"sinceSideFlipPress",99);k(this,"poundPhase","none");k(this,"poundTimer",0);k(this,"ladder",null);k(this,"ladderCooldown",0);k(this,"wallNormal",new P);k(this,"wallTimer",99);k(this,"againstWall",!1);k(this,"wallKicks",0);k(this,"ledgeTimer",-1);k(this,"ledgeSeconds",0);k(this,"ledgeWide",!1);k(this,"ledgeVault",!1);k(this,"ledgeHanging",!1);k(this,"ledgeLift",0);k(this,"ledgeCooldown",0);k(this,"ledgeFrom",new P);k(this,"ledgeTo",new P);k(this,"strokeTimer",0);k(this,"submerged",!1);k(this,"atSurface",!1);k(this,"diving",!1);k(this,"footstepPhase",0);k(this,"animationTime",0);k(this,"lastSafePosition",new P);k(this,"safePositionTimer",0);k(this,"diagnostics",{collisions:0,lastNormalY:0,lastDepth:0});k(this,"ledgeDiagnostics",{reason:"",lip:0,surface:0});k(this,"scratchA",new P);k(this,"scratchB",new P);k(this,"scratchMove",new P);k(this,"scratchSide",new P);k(this,"scratchProbe",new P);k(this,"carryables",[]);this.world=e,this.events=n,this.rig=Ng(s),this.object=this.rig.root,this.object.position.copy(t),this.capsule=new Sc(new P(t.x,t.y+Fn,t.z),new P(t.x,t.y+Qn-Fn,t.z),Fn),this.lastSafePosition.copy(t)}get position(){return this.object.position}getFocusPoint(e){return e.copy(this.object.position).addScaledVector(Tl,Qn*.78)}get speed(){return Math.hypot(this.velocity.x,this.velocity.z)}get isSubmerged(){return this.state==="swim"&&!this.atSurface&&this.submerged}get stateName(){return this.state==="climb"?"climb":this.state==="air"&&this.poundPhase==="hover"?"pound-hover":this.state==="air"&&this.poundPhase==="slam"?"pound":this.poundPhase==="landed"?"pound-land":this.state==="ledge"?this.ledgeHanging?"hanging":this.ledgeWide?"mantle":this.ledgeVault?"ledge-vault":"ledge-swing":this.state==="swim"?this.atSurface?"swim-surface":"swim-under":this.state==="air"?this.againstWall&&this.velocity.y<0?"wall-slide":this.jumpKind==="long"?"long-jump":this.jumpKind==="back"?"backflip":this.jumpKind==="wall"&&this.velocity.y>0?"wall-kick":this.jumpKind==="side"?"side-flip":this.velocity.y<=.5?"fall":this.jumpStage===3?"triple":this.jumpStage===2?"double":"jump":this.crouching?"crouch":this.braking?"brake":this.skidding?"skid":this.speed>X.walkSpeed+.6?"run":this.speed>.25?"walk":"idle"}update(e,t,n){this.animationTime+=e,this.strokeTimer>0&&(this.strokeTimer-=e),this.landingTimer>0&&(this.landingTimer-=e),this.comboWindow>0&&(this.comboWindow-=e),this.flipTimer>=0&&(this.flipTimer+=e),this.wallTimer<10&&(this.wallTimer+=e),this.ledgeCooldown>0&&(this.ledgeCooldown-=e),this.ladderCooldown>0&&(this.ladderCooldown-=e),this.sinceTakeOff<10&&(this.sinceTakeOff+=e),this.sinceSideFlipPress<10&&(this.sinceSideFlipPress+=e),t.wasPressed("sideFlip")&&(this.sinceSideFlipPress=0),this.poundPhase==="landed"&&(this.poundTimer-=e,this.poundTimer<=0&&(this.poundPhase="none"));const s=this.scratchA.set(t.move.x,0,t.move.y),r=Math.min(1,s.length());if(r>.001?s.normalize().applyAxisAngle(Tl,n):s.set(0,0,0),this.updateJumpTimers(e,t),this.state==="climb"){this.updateClimb(e,t,s,r),this.updateCarry(e,t),this.updateRecovery(e),this.syncModel(e,r);return}if(this.state==="ledge"){this.updateLedge(e,t),this.updateCarry(e,t),this.updateRecovery(e),this.syncModel(e,r);return}switch(this.updateWaterState(),this.state){case"swim":this.updateSwim(e,t,s,r);break;case"ground":this.updateGround(e,t,s,r);break;default:this.updateAir(e,t,s,r);break}this.integrate(e),this.updateFlip(e),this.updateCarry(e,t),this.updateRecovery(e),this.syncModel(e,r)}updateGround(e,t,n,s){const r=this.scratchB.set(this.velocity.x,0,this.velocity.z),o=r.length();if(this.crouching=t.isDown("crouch")&&this.poundPhase==="none",s>.001&&!this.crouching&&this.tryCatchLadder(n))return;if(this.poundPhase==="landed"){this.braking=!1,this.skidding=!1,this.velocity.x=0,this.velocity.z=0,this.velocity.y<0&&(this.velocity.y=-2);return}if(this.crouching){this.braking=!1,this.skidding=!1,s>.001&&this.turnToward(n,e,o,X.crouchTurnRate);const l=s>.001?X.crouchSpeed:0,c=o>l?Math.max(l,o-X.crouchDeceleration*e):Math.min(l,o+X.acceleration*.35*e);o>.001?r.multiplyScalar(c/o):c>0&&r.copy(this.forwardVector(this.scratchMove)).multiplyScalar(c)}else if(s>.001){this.braking=!1;const l=this.targetSpeedFor(s),c=o>.01?n.dot(this.scratchSide.copy(r).divideScalar(o)):1;if(this.skidding=o>X.skidMinSpeed&&c<X.skidDotThreshold,this.skidding){const h=Math.max(0,o-X.skidDeceleration*e);o>.001&&r.multiplyScalar(h/o)}else{this.turnToward(n,e,o);const h=this.forwardVector(this.scratchMove),u=r.dot(h),f=u<l?Math.min(l,u+X.acceleration*e):Math.max(l,u-X.deceleration*e),p=this.scratchSide.copy(r).addScaledVector(h,-u).multiplyScalar(Math.max(0,1-X.deceleration*1.8*e));r.copy(h).multiplyScalar(f).add(p)}}else{if(this.skidding=!1,!this.braking&&o>X.brakeMinSpeed){this.braking=!0;const h=Math.pow(this.momentum,X.brakeMomentumCurve),u=Ne.lerp(X.brakeSlideShort,X.brakeSlideLong,h);this.brakeRate=o*o/(2*Math.max(.1,u)),this.brakeStrength=h}this.braking&&o<X.brakeEndSpeed&&(this.braking=!1);const l=(this.braking?this.brakeRate:X.deceleration)*e,c=Math.max(0,o-l);o>.001&&r.multiplyScalar(c/o)}if(this.velocity.x=r.x,this.velocity.z=r.z,Math.hypot(r.x,r.z)>X.brakeMinSpeed&&!this.braking?this.momentum=Math.min(1,this.momentum+e/X.brakeMomentumBuild):this.braking||(this.momentum=Math.max(0,this.momentum-e/X.brakeMomentumFade)),this.velocity.y<0&&(this.velocity.y=-2),this.jumpBufferTimer>0&&this.coyoteTimer>0){this.performJump();return}}updateAir(e,t,n,s){this.skidding=!1,this.braking=!1,this.crouching=!1;const r=this.velocity.y>0?X.gravity:X.gravity*X.fallGravityMultiplier;if(this.velocity.y-=r*e,this.velocity.y=Math.max(this.velocity.y,-34),this.jumpHeld&&!t.isDown("jump")&&this.velocity.y>0&&(this.velocity.y*=X.jumpCutMultiplier,this.jumpHeld=!1),this.poundPhase==="hover"||this.poundPhase==="slam"){this.updateGroundPound(e);return}if(this.canSideFlip()){this.performSideFlip();return}if(!this.tryCatchLadder()&&!this.tryCatchLedge()){if(this.againstWall&&this.velocity.y<-3.4&&(this.velocity.y=-3.4),this.jumpBufferTimer>0&&this.wallTimer<X.wallKickWindow){this.performWallKick();return}if(t.wasPressed("jump")){if(this.airPresses+=1,this.airPresses===1){this.velocity.y=Math.max(this.velocity.y,0)+X.airBoostVelocity,this.jumpHeld=!0,this.jumpBufferTimer=0;return}if(this.airPresses>=2){this.startGroundPound();return}}if(s>.001){const o=this.jumpKind==="long"?X.longJumpAirControl:1;this.turnToward(n,e,0,X.airTurnRate*o);const a=this.targetSpeedFor(s),l=this.scratchB.set(this.velocity.x,0,this.velocity.z);l.addScaledVector(n,X.airAcceleration*o*e),l.length()>Math.max(a,this.speed)&&l.setLength(Math.max(a,this.speed)),this.velocity.x=l.x,this.velocity.z=l.z}else{const o=Math.max(0,1-X.airDeceleration*e);this.velocity.x*=o,this.velocity.z*=o}this.jumpBufferTimer>0&&this.coyoteTimer>0&&this.performJump()}}tryCatchLedge(){const e=u=>(this.ledgeDiagnostics.reason=u,!1);if(this.ledgeCooldown>0)return e("cooldown");if(this.velocity.y>X.ledgeGrabRise)return e("rising");const t=this.againstWall?this.scratchA.copy(this.wallNormal).negate():this.forwardVector(this.scratchA);if(t.lengthSq()<1e-6)return e("no direction");const n=this.object.position.y,s=this.ledgeSurfaceAt(t,X.ledgeReach,n);if(s===null)return e("nothing in front");const r=s-n;if(this.ledgeDiagnostics.lip=Math.round(r*100)/100,this.ledgeDiagnostics.surface=Math.round(s*100)/100,r<X.ledgeGrabLow||r>X.ledgeGrabHigh)return e("out of reach");const o=this.ledgeSurfaceAt(t,X.ledgeReach+X.ledgeStandNarrow,n),a=this.ledgeSurfaceAt(t,X.ledgeReach+X.ledgeWideDepth,n),l=o!==null&&Math.abs(o-s)<.25;this.ledgeWide=l&&a!==null&&Math.abs(a-s)<.25,this.ledgeVault=!l;const c=this.ledgeWide?X.ledgeStandWide:this.ledgeVault?X.ledgeVaultOver:X.ledgeStandNarrow;this.ledgeFrom.copy(this.object.position),this.ledgeTo.set(this.object.position.x+t.x*(X.ledgeReach+c),s,this.object.position.z+t.z*(X.ledgeReach+c));const h=Ne.clamp(s-X.ledgeHangLift,n-X.ledgeSettleDown,n+X.ledgeSettleUp);return this.ledgeFrom.y=h,this.object.position.y=h,this.syncCapsuleFromPosition(),this.facing=Math.atan2(t.x,t.z),this.velocity.set(0,0,0),this.ledgeTimer=0,this.ledgeLift=s-h,this.ledgeHanging=!0,this.ledgeSeconds=this.ledgeWide?X.ledgeMantleSeconds:this.ledgeVault?X.ledgeVaultSeconds:X.ledgeSwingSeconds,this.againstWall=!1,this.wallTimer=99,this.state="ledge",this.ledgeDiagnostics.reason="caught",!0}ledgeSurfaceAt(e,t,n){for(const s of[t,t+X.ledgeReachExtra]){const r=this.scratchB.set(this.object.position.x+e.x*s,n+X.ledgeGrabHigh+.4,this.object.position.z+e.z*s),o=this.world.groundProbe(r,X.ledgeGrabHigh+.4);if(o&&!(o.normal.y<yl))return o.y}return null}updateLedge(e,t){if(this.ledgeHanging){this.object.position.copy(this.ledgeFrom),this.object.rotation.y=this.facing,this.syncCapsuleFromPosition(),t.wasPressed("jump")?(this.ledgeHanging=!1,this.ledgeTimer=0,this.jumpBufferTimer=0):t.isDown("crouch")&&(this.ledgeHanging=!1,this.ledgeTimer=-1,this.ledgeCooldown=X.ledgeCooldown,this.velocity.set(0,0,0),this.state="air");return}this.ledgeTimer+=e;const n=Ne.clamp(this.ledgeTimer/this.ledgeSeconds,0,1),s=Ne.clamp(n/(this.ledgeWide?.62:.55),0,1),r=Ne.clamp((n-.34)/.66,0,1),o=s*s*(3-2*s),a=r*r*(3-2*r);this.object.position.set(Ne.lerp(this.ledgeFrom.x,this.ledgeTo.x,a),Ne.lerp(this.ledgeFrom.y,this.ledgeTo.y,o),Ne.lerp(this.ledgeFrom.z,this.ledgeTo.z,a)),this.object.rotation.y=this.facing,this.syncCapsuleFromPosition(),this.ledgeLift=this.ledgeTo.y-this.object.position.y,n>=1&&(this.ledgeTimer=-1,this.ledgeCooldown=X.ledgeCooldown,this.wallKicks=0,this.jumpKind="normal",this.onGround=!0,this.coyoteTimer=X.coyoteTime,this.state="ground")}startGroundPound(){this.velocity.set(0,0,0),this.poundPhase="hover",this.poundTimer=X.groundPoundHover,this.jumpKind="normal",this.jumpStage=1,this.flipTimer=-1,this.flipProgress=0,this.jumpBufferTimer=0}updateGroundPound(e){if(this.poundPhase==="hover"){this.poundTimer-=e,this.velocity.set(0,0,0),this.poundTimer<=0&&(this.poundPhase="slam");return}this.poundPhase==="slam"&&(this.velocity.x=0,this.velocity.z=0,this.velocity.y=-34)}tryCatchLadder(e){if(this.state==="ledge"||this.poundPhase!=="none"||this.ladderCooldown>0)return!1;const t=this.world.ladderAt(this.capsuleCentre(this.scratchProbe),X.ladderSnagDistance);if(!t||this.object.position.y>t.topY-.2)return!1;const n=this.scratchSide.set(Math.sin(t.facing),0,Math.cos(t.facing));return e&&e.dot(n)<.3||!e&&this.velocity.x*n.x+this.velocity.z*n.z<.5?!1:(this.ladder=t,this.facing=t.facing,this.velocity.set(0,0,0),this.state="climb",this.snapToLadder(t),!0)}snapToLadder(e){const t=this.forwardVector(this.scratchMove);this.object.position.x=e.anchor.x-t.x*X.ladderStandOff,this.object.position.z=e.anchor.z-t.z*X.ladderStandOff,this.object.rotation.y=this.facing,this.syncCapsuleFromPosition()}updateClimb(e,t,n,s){const r=this.ladder;if(!r){this.state="air";return}if(t.wasPressed("jump")){this.leaveLadder();const h=this.forwardVector(this.scratchMove);this.velocity.set(-h.x*X.ladderJumpOff,X.jumpVelocity*.75,-h.z*X.ladderJumpOff),this.jumpHeld=!0,this.jumpKind="normal";return}const o=Ne.clamp(-t.move.y,-1,1);this.velocity.set(0,o*X.ladderSpeed,0);const a=r.topY-X.ledgeHangLift,l=this.object.position.y+this.velocity.y*e,c=l>=a;if(this.object.position.y=Ne.clamp(l,r.bounds.min.y-.2,a),this.snapToLadder(r),c&&o>.2){const h=this.ladder;if(this.ladder=null,this.tryCatchLedge())return;this.ladder=h,this.leaveLadder();const u=this.forwardVector(this.scratchMove);this.velocity.set(u.x*1.2,X.jumpVelocity*.55,u.z*1.2),this.jumpHeld=!1;return}this.object.position.y<=r.bounds.min.y-.19&&this.leaveLadder()}leaveLadder(){this.ladder=null,this.ladderCooldown=X.ladderCooldown,this.state="air",this.velocity.set(0,0,0)}updateSwim(e,t,n,s){this.skidding=!1;const r=this.world.waterAt(this.capsuleCentre(this.scratchB));if(!r){this.state="air";return}const a=r.surfaceY-Qn*X.floatSubmersion-this.object.position.y;this.atSurface=Math.abs(a)<.35,this.submerged=!0;const l=t.isDown("crouch")||t.isDown("dive");if(this.diving=l,l?this.velocity.y-=X.diveAcceleration*e:a>0?this.velocity.y+=Math.min(X.buoyancy,a*7)*e:this.velocity.y+=Math.max(-7.5,a*5)*e,t.wasPressed("jump")&&this.atSurface&&this.tryCatchLedge()){this.submerged=!1,this.diving=!1;return}if(t.wasPressed("jump")&&this.strokeTimer<=0){this.strokeTimer=X.strokeCooldown;const u=this.forwardVector(this.scratchMove),f=(this.atSurface,.55);this.velocity.addScaledVector(u,X.strokeImpulse),this.velocity.y+=X.strokeImpulse*f}s>.001&&(this.turnToward(n,e,0,5.5),this.velocity.addScaledVector(n,X.swimAcceleration*s*e));const c=Math.max(0,1-X.swimDrag*e);this.velocity.multiplyScalar(c);const h=Math.hypot(this.velocity.x,this.velocity.z);if(h>X.swimSpeed){const u=X.swimSpeed/h;this.velocity.x*=u,this.velocity.z*=u}}integrate(e){this.againstWall=!1;const t=this.velocity.length()*e,n=Math.min(6,Math.max(1,Math.ceil(t/(Fn*.75)))),s=e/n,r=this.onGround,o=this.velocity.y;this.diagnostics.collisions=0,this.onGround=!1;for(let a=0;a<n;a+=1)this.moveHorizontally(s,r),this.moveVertically(s);if(this.velocity.y<=.1){const a=r?X.groundSnapDistance:.04;this.settleOnGround(a)}this.onGround?(r||(this.poundPhase==="slam"?(this.poundPhase="landed",this.poundTimer=X.groundPoundRecovery,this.landingTimer=.17,this.events.onLand?.(this.object.position,1)):this.poundPhase!=="landed"&&(this.poundPhase="none"),this.flipTimer=-1,this.flipProgress=0,this.flipDirection=1,this.jumpKind="normal",this.wallKicks=0,this.againstWall=!1,this.wallTimer=99,this.comboWindow=this.jumpStage<3?X.jumpComboWindow:0,this.jumpStage>=3&&(this.jumpStage=1),o<-4&&(this.landingTimer=.17,this.events.onLand?.(this.object.position,Math.min(1,-o/22)))),this.coyoteTimer=X.coyoteTime,this.state==="air"&&(this.state="ground")):this.state==="ground"&&(this.state="air",this.airPresses=0),this.syncPositionFromCapsule()}moveHorizontally(e,t){const n=this.scratchMove.set(this.velocity.x*e,0,this.velocity.z*e);if(Math.hypot(n.x,n.z)<1e-6)return;const s=t?X.stepHeight:0;s>0&&this.capsule.translate(this.scratchSide.set(0,s,0)),this.capsule.translate(n),this.resolveWalls(),s>0&&this.capsule.translate(this.scratchSide.set(0,-s,0))}moveVertically(e){this.capsule.translate(this.scratchMove.set(0,this.velocity.y*e,0)),this.resolveVertical()}resolveWalls(){for(let e=0;e<4;e+=1){const t=this.world.capsuleIntersect(this.capsule);if(!t||Math.abs(t.normal.y)>.7)break;const n=this.scratchB.copy(t.normal).multiplyScalar(t.depth);if(n.y=0,n.lengthSq()<1e-10)break;this.diagnostics.collisions+=1,this.diagnostics.lastNormalY=t.normal.y,this.diagnostics.lastDepth=t.depth,this.capsule.translate(n),this.state==="air"&&(this.scratchA.set(t.normal.x,0,t.normal.z),this.scratchA.lengthSq()>1e-6&&(this.wallNormal.copy(this.scratchA).normalize(),this.wallTimer=0,this.againstWall=!0));const s=this.velocity.x*t.normal.x+this.velocity.z*t.normal.z;s<0&&(this.velocity.x-=t.normal.x*s,this.velocity.z-=t.normal.z*s)}}resolveVertical(){for(let e=0;e<4;e+=1){const t=this.world.capsuleIntersect(this.capsule);if(!t||Math.abs(t.normal.y)<.25)break;const n=t.normal.y*t.depth;if(Math.abs(n)<1e-6)break;this.diagnostics.collisions+=1,this.diagnostics.lastNormalY=t.normal.y,this.diagnostics.lastDepth=t.depth,this.capsule.translate(this.scratchB.set(0,n,0)),t.normal.y<-.5&&this.velocity.y>0&&(this.velocity.y=0)}}settleOnGround(e){const t=this.capsule.start.y-Fn,n=this.scratchSide.set(this.capsule.start.x,t+.25,this.capsule.start.z),s=this.world.groundProbe(n,.25+e);return!s||s.normal.y<yl?!1:(this.capsule.translate(this.scratchMove.set(0,s.y-t,0)),this.onGround=!0,this.groundNormal.copy(s.normal),this.velocity.y<0&&(this.velocity.y=0),!0)}updateJumpTimers(e,t){this.coyoteTimer>0&&(this.coyoteTimer-=e),this.jumpBufferTimer>0&&(this.jumpBufferTimer-=e),t.wasPressed("jump")&&(this.jumpBufferTimer=X.jumpBufferTime)}performJump(){if(this.crouching){if(this.speed>=X.longJumpMinSpeed){this.performLongJump();return}if(this.speed<=X.backflipMaxSpeed){this.performBackflip();return}}this.jumpKind="normal";const e=this.comboWindow>0&&this.speed>=X.jumpComboMinSpeed;this.jumpStage=e?Math.min(3,this.jumpStage+1):1,this.velocity.y=this.jumpStage===3?X.tripleJumpVelocity:this.jumpStage===2?X.doubleJumpVelocity:X.jumpVelocity,this.flipTimer=this.jumpStage===3?0:-1,this.flipDelay=X.tripleJumpFlipDelay,this.flipProgress=0,this.flipDirection=1,this.flipAxis="pitch",this.takeOff()}performLongJump(){const e=this.forwardVector(this.scratchMove);this.velocity.x=e.x*X.longJumpSpeed,this.velocity.z=e.z*X.longJumpSpeed,this.velocity.y=X.longJumpVelocity,this.jumpKind="long",this.jumpStage=1,this.flipTimer=-1,this.flipProgress=0,this.flipDirection=1,this.flipAxis="pitch",this.takeOff()}canSideFlip(){return this.state!=="air"||this.jumpKind!=="normal"||this.poundPhase!=="none"||!this.tookOffRunning?!1:this.sinceTakeOff<=X.sideFlipWindow&&this.sinceSideFlipPress<=X.sideFlipWindow}performSideFlip(){const e=this.forwardVector(this.scratchMove);this.velocity.x=e.x*X.sideFlipSpeed,this.velocity.z=e.z*X.sideFlipSpeed;const t=this.takeOffY+X.sideFlipApex-this.object.position.y;this.velocity.y=Math.max(X.sideFlipLeastVelocity,Math.sqrt(Math.max(0,2*X.gravity*t))),this.jumpKind="side",this.jumpStage=1,this.flipTimer=0,this.flipDelay=X.tripleJumpFlipDelay,this.flipProgress=0,this.flipDirection=1,this.flipAxis="roll",this.jumpHeld=!0,this.sinceSideFlipPress=99,this.sinceTakeOff=99}performBackflip(){const e=this.forwardVector(this.scratchMove);this.velocity.x=-e.x*X.backflipSpeed,this.velocity.z=-e.z*X.backflipSpeed,this.velocity.y=X.backflipVelocity,this.jumpKind="back",this.jumpStage=1,this.flipTimer=0,this.flipDelay=X.tripleJumpFlipDelay,this.flipProgress=0,this.flipDirection=-1,this.flipAxis="pitch",this.takeOff()}performWallKick(){this.velocity.x=this.wallNormal.x*X.wallKickSpeed,this.velocity.z=this.wallNormal.z*X.wallKickSpeed,this.velocity.y=X.wallKickVelocity,this.facing=Math.atan2(this.wallNormal.x,this.wallNormal.z),this.wallKicks+=1,this.wallTimer=99,this.againstWall=!1,this.jumpKind="wall",this.jumpStage=1,this.flipTimer=-1,this.flipProgress=0,this.flipDirection=1,this.flipAxis="pitch",this.takeOff()}takeOff(){this.airPresses=0,this.sinceTakeOff=0,this.takeOffY=this.object.position.y,this.tookOffRunning=this.speed>X.walkSpeed+.6,this.poundPhase="none",this.comboWindow=0,this.jumpHeld=!0,this.jumpBufferTimer=0,this.coyoteTimer=0,this.onGround=!1,this.crouching=!1,this.braking=!1,this.state="air"}updateFlip(e){if(this.flipTimer<0)return;if(this.state!=="air"){this.flipTimer=-1,this.flipProgress=0;return}const t=this.predictTimeToLand(),n=this.flipTimer+t;if(this.flipDelay=Ne.clamp((n-X.tripleJumpFlipMinAirtime)*X.tripleJumpFlipDelayShare,X.tripleJumpFlipDelayMin,X.tripleJumpFlipDelay),this.flipTimer<this.flipDelay)return;const s=t-X.tripleJumpLandMargin,r=Math.max(e,s),o=(1-this.flipProgress)/r;this.flipProgress=Math.min(1,this.flipProgress+o*e)}predictTimeToLand(){const e=this.scratchSide.set(this.object.position.x,this.object.position.y+.3,this.object.position.z),t=this.world.groundProbe(e,80);if(!t)return 1/0;let n=Math.max(0,this.object.position.y-t.y);const s=X.gravity,r=X.gravity*X.fallGravityMultiplier;let o=0,a=this.velocity.y;a>0&&(o+=a/s,n+=a*a/(2*s),a=0);const l=-a;return o+=(-l+Math.sqrt(l*l+2*r*n))/r,o}get flipping(){return this.flipTimer>=this.flipDelay&&this.flipProgress<1}get somersaultProgress(){return this.flipTimer<0?0:this.flipProgress}updateWaterState(){const e=this.state==="swim",t=e?Qn*.12:Qn*.5,n=this.scratchB.set(this.object.position.x,this.object.position.y+t,this.object.position.z),s=this.world.waterAt(n);if(s&&!e){const r=-this.velocity.y;this.state="swim",this.submerged=!0,this.velocity.y*=.22,this.velocity.x*=.65,this.velocity.z*=.65,r>X.splashSpeed&&this.events.onSplash?.(new P(this.object.position.x,s.surfaceY,this.object.position.z),Math.min(1,r/18))}else!s&&e&&(this.state=this.onGround?"ground":"air",this.submerged=!1,this.atSurface=!1,this.diving=!1)}findCarryTarget(){if(this.carried)return null;let e=null,t=1/0;const n=this.forwardVector(this.scratchMove);for(const s of this.carryables){if(s.held||s.pickupCooldown>0)continue;const r=this.scratchSide.copy(s.position).sub(this.object.position),o=Math.abs(r.y);r.y=0;const a=r.length();if(a>X.carryReach+s.radius||o>Qn)continue;const l=a>.001?n.dot(r.divideScalar(a)):1;if(l<-.35)continue;const c=a-l*.5;c<t&&(t=c,e=s)}return e}updateCarry(e,t){if(!t.wasPressed("grab"))return;if(this.carried){this.throwCarried();return}const n=this.findCarryTarget();n&&(n.pickUp(),this.carried=n,this.rig.carryAnchor.add(n.object3d),n.object3d.position.set(0,0,0))}throwCarried(){const e=this.carried;if(!e)return;const t=e.object3d.getWorldPosition(new P),n=this.object.parent;this.rig.carryAnchor.remove(e.object3d),n?.add(e.object3d),e.object3d.position.copy(t);const s=this.forwardVector(this.scratchMove),r=new P().addScaledVector(s,X.throwSpeed).add(new P(this.velocity.x*.4,X.throwLift,this.velocity.z*.4));e.release(r),this.carried=null}dropCarried(){this.carried&&this.throwCarried()}updateRecovery(e){this.safePositionTimer-=e,this.safePositionTimer<=0&&this.state==="ground"&&this.onGround&&this.speed<7&&(this.safePositionTimer=.45,this.lastSafePosition.copy(this.object.position)),this.object.position.y<X.killPlaneY&&this.respawn()}respawn(){this.dropCarried(),this.object.position.copy(this.lastSafePosition),this.object.position.y+=.2,this.velocity.set(0,0,0),this.state="air",this.syncCapsuleFromPosition(),this.events.onRespawn?.()}setSafePosition(e){this.lastSafePosition.copy(e)}teleport(e,t=this.facing){this.dropCarried(),this.object.position.copy(e),this.facing=t,this.velocity.set(0,0,0),this.state="air",this.lastSafePosition.copy(e),this.syncCapsuleFromPosition()}targetSpeedFor(e){const t=e<=.55?Ne.lerp(0,X.walkSpeed,e/.55):Ne.lerp(X.walkSpeed,X.runSpeed,(e-.55)/.45);return this.carried?t*X.carrySpeedMultiplier:t}turnToward(e,t,n,s){if(e.lengthSq()<1e-4)return;const r=Math.atan2(e.x,e.z),o=s??Ne.lerp(X.turnRateSlow,X.turnRateFast,Ne.clamp(n/X.runSpeed,0,1));let a=r-this.facing;for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;const l=Ne.clamp(a,-o*t,o*t);this.facing+=l}forwardVector(e){return e.set(Math.sin(this.facing),0,Math.cos(this.facing))}capsuleCentre(e){return e.copy(this.capsule.start).add(this.capsule.end).multiplyScalar(.5)}syncPositionFromCapsule(){this.object.position.set(this.capsule.start.x,this.capsule.start.y-Fn,this.capsule.start.z)}syncCapsuleFromPosition(){const e=this.object.position;this.capsule.start.set(e.x,e.y+Fn,e.z),this.capsule.end.set(e.x,e.y+Qn-Fn,e.z)}syncModel(e,t){this.object.rotation.y=this.facing,this.state==="ground"&&this.speed>.6?(this.footstepPhase+=this.speed*e,this.footstepPhase>1.6&&(this.footstepPhase=0,this.events.onFootstep?.(this.object.position))):this.footstepPhase=0;const n={time:this.animationTime,delta:e,state:this.state,speed:this.speed,maxSpeed:X.runSpeed,verticalSpeed:this.velocity.y,skidding:this.skidding,landing:this.landingTimer>0,carrying:this.carried!==null,submerged:this.submerged&&!this.atSurface,diving:this.diving&&this.state==="swim",jumpStage:this.jumpStage,flipAngle:this.flipTimer<0?0:this.flipProgress*Math.PI*2*this.flipDirection,flipAxis:this.flipAxis,poundPhase:this.poundPhase,climbing:this.state==="climb",climbSpeed:this.state==="climb"?this.velocity.y:0,flipping:this.flipping,crouching:this.crouching,braking:this.braking,brakeStrength:this.braking?this.brakeStrength:0,jumpKind:this.jumpKind,againstWall:this.againstWall,ledgeProgress:this.ledgeTimer<0?0:Math.min(1,this.ledgeTimer/this.ledgeSeconds),ledgeWide:this.ledgeWide,ledgeHanging:this.ledgeHanging,ledgeLift:this.ledgeLift,strokeProgress:this.strokeTimer>0?1-this.strokeTimer/X.strokeCooldown:1};Fg(this.rig,n)}get carryAnchor(){return this.rig.carryAnchor}}const Sn=220,Yg=18;function Kg(){const e=document.createElement("canvas");e.width=64,e.height=64;const t=e.getContext("2d");if(t){const n=t.createRadialGradient(32,32,0,32,32,32);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.45,"rgba(255,255,255,0.75)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,64,64)}return new hc(e)}class Jg{constructor(e){k(this,"points");k(this,"positions");k(this,"colors");k(this,"baseColors");k(this,"velocities");k(this,"lifetimes");k(this,"maxLifetimes");k(this,"next",0);this.positions=new Float32Array(Sn*3),this.colors=new Float32Array(Sn*3),this.baseColors=new Float32Array(Sn*3),this.velocities=new Float32Array(Sn*3),this.lifetimes=new Float32Array(Sn),this.maxLifetimes=new Float32Array(Sn);for(let s=0;s<Sn;s+=1)this.positions[s*3+1]=-9999;const t=new Vt;t.setAttribute("position",new jt(this.positions,3)),t.setAttribute("color",new jt(this.colors,3));const n=new cc({size:.42,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:.92,depthWrite:!1,blending:ri,map:Kg()});this.points=new ru(t,n),this.points.name="particles",this.points.frustumCulled=!1,this.points.renderOrder=20,e.add(this.points)}splash(e,t){const n=Math.round(14+t*26);for(let s=0;s<n;s+=1){const r=s/n*Math.PI*2+Math.random()*.4,o=1.6+Math.random()*3.4*(.5+t);this.emit(e.x+Math.cos(r)*.3,e.y+.1,e.z+Math.sin(r)*.3,Math.cos(r)*o*.55,3.2+Math.random()*3.6*(.5+t),Math.sin(r)*o*.55,.55,.86,.98,.5+Math.random()*.4)}}dust(e,t){const n=Math.round(8+t*14);for(let s=0;s<n;s+=1){const r=s/n*Math.PI*2+Math.random()*.6,o=1.1+Math.random()*2.3*(.4+t);this.emit(e.x+Math.cos(r)*.25,e.y+.12,e.z+Math.sin(r)*.25,Math.cos(r)*o,.7+Math.random()*1.1,Math.sin(r)*o,.82,.76,.6,.35+Math.random()*.3)}}emit(e,t,n,s,r,o,a,l,c,h){const u=this.next;this.next=(this.next+1)%Sn,this.positions[u*3]=e,this.positions[u*3+1]=t,this.positions[u*3+2]=n,this.velocities[u*3]=s,this.velocities[u*3+1]=r,this.velocities[u*3+2]=o,this.baseColors[u*3]=a,this.baseColors[u*3+1]=l,this.baseColors[u*3+2]=c,this.colors[u*3]=a,this.colors[u*3+1]=l,this.colors[u*3+2]=c,this.lifetimes[u]=h,this.maxLifetimes[u]=h}update(e){let t=!1;for(let n=0;n<Sn;n+=1){if(this.lifetimes[n]<=0)continue;if(t=!0,this.lifetimes[n]-=e,this.lifetimes[n]<=0){this.positions[n*3+1]=-9999;continue}this.velocities[n*3+1]-=Yg*e,this.positions[n*3]+=this.velocities[n*3]*e,this.positions[n*3+1]+=this.velocities[n*3+1]*e,this.positions[n*3+2]+=this.velocities[n*3+2]*e;const s=this.lifetimes[n]/this.maxLifetimes[n],r=s*s;this.colors[n*3]=this.baseColors[n*3]*r,this.colors[n*3+1]=this.baseColors[n*3+1]*r,this.colors[n*3+2]=this.baseColors[n*3+2]*r}t&&(this.points.geometry.attributes.position.needsUpdate=!0,this.points.geometry.attributes.color.needsUpdate=!0)}dispose(){this.points.geometry.dispose(),this.points.material.map?.dispose(),this.points.material.dispose(),this.points.removeFromParent()}}const wl=26,$g=.28,Gr=7.5,Al=.25,Zg=3.4,Qg=22;class Ec{constructor(e,t){k(this,"object3d");k(this,"velocity",new P);k(this,"radius");k(this,"held",!1);k(this,"pickupCooldown",0);k(this,"resting",!1);k(this,"spawnPosition",new P);k(this,"spin",0);this.object3d=e,this.radius=t,this.spawnPosition.copy(e.position)}get position(){return this.object3d.position}update(e,t){if(this.pickupCooldown>0&&(this.pickupCooldown-=e),this.held){this.resting=!1;return}const n=t.waterAt(this.position);if(n){const o=Math.min(1,(n.surfaceY-this.position.y)/(this.radius*2));this.velocity.y+=Qg*o*e,this.velocity.y-=wl*e,this.velocity.multiplyScalar(Math.max(0,1-Zg*e))}else this.resting||(this.velocity.y-=wl*e,this.velocity.x*=Math.max(0,1-Al*e),this.velocity.z*=Math.max(0,1-Al*e));if(this.resting&&!n){this.spin*=Math.max(0,1-Gr*e);return}this.position.addScaledVector(this.velocity,e);const s=new P(this.position.x,this.position.y+this.radius,this.position.z),r=t.groundHeightBelow(s,8);Number.isFinite(r)&&this.position.y-this.radius<=r&&(this.position.y=r+this.radius,this.velocity.y<-1.2?this.velocity.y=-this.velocity.y*$g:(this.velocity.y=0,this.velocity.x*=Math.max(0,1-Gr*e),this.velocity.z*=Math.max(0,1-Gr*e),this.velocity.lengthSq()<.02&&(this.velocity.set(0,0,0),this.resting=!0))),this.resting||(this.spin=Math.min(12,this.velocity.length()*.9),this.object3d.rotation.x+=this.spin*e*.6,this.object3d.rotation.z+=this.spin*e*.35),this.position.y<-80&&this.respawn()}pickUp(){this.held=!0,this.velocity.set(0,0,0),this.object3d.rotation.set(0,0,0)}release(e){this.held=!1,this.resting=!1,this.velocity.copy(e),this.pickupCooldown=.4}respawn(){this.held=!1,this.resting=!1,this.velocity.set(0,0,0),this.object3d.position.copy(this.spawnPosition),this.object3d.rotation.set(0,0,0)}}const e0=`
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
`,t0=`
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
`;class Tc extends He{constructor(t,n,s,r){const o={uTime:{value:0},uShallowColor:{value:new pe("#3fb6c9")},uDeepColor:{value:new pe("#14566e")},uSkyColor:{value:new pe("#bfe4f7")},uSunDirection:{value:s.clone()},uReflectivity:{value:r?.95:.55}};super(new Cn(t,t,1,1).rotateX(-Math.PI/2),new Rt({uniforms:o,vertexShader:e0,fragmentShader:t0,transparent:!0,depthWrite:!1,side:rn}));k(this,"uniforms");this.uniforms=o,this.position.y=n,this.renderOrder=10,this.name="water",this.frustumCulled=!1}update(t){this.uniforms.uTime.value=t}setReflective(t){this.uniforms.uReflectivity.value=t?.95:.55}}const es=140,Ki=2,Rl=1,n0=new P(0,0,10),i0=Math.PI,xt=new P(56,0,44),sn=Math.PI,Ye={x:-22,z:25,half:7,depth:3.4},Dt={x:14.45,z:-6,width:.9,top:7.14},oa=new pe("#565e6c"),aa=new pe("#646d7d"),Cl=1.7,Vs=7,On=5.5,Hn=2.6,Pl=.3,Gs=9,Ws=11,er=.9,s0=new pe("#4a515d"),r0=new pe("#424954"),o0=new pe("#5f6774");function a0(i,e,t={}){const n=t.obstacles===!0,s=t.holes??(n?[Ye]:[]),r=new mt;r.name="slab-world",i.add(r);const o=new mt;o.name="solid",r.add(o),o.add(p0(s)),n&&(o.add(Wr(-14-Cl-er/2,-6)),o.add(Wr(-14+Cl+er/2,-6)),o.add(Wr(15,-6)),o.add(d0(15,12)),o.add(u0(4,2)));const a=new He(new vt(es,Rl,es),new gt({color:new pe("#2a2f38"),roughness:.95}));a.position.y=-Rl/2-.02,a.receiveShadow=!0,a.castShadow=!0,a.name="slab-body",r.add(a);let l=null;const c=[];if(n){for(const f of l0())o.add(f);e.addWater(new Ht(new P(Ye.x-Ye.half,-Ye.depth,Ye.z-Ye.half),new P(Ye.x+Ye.half,0,Ye.z+Ye.half)),-.12),l=new Tc(Ye.half*2,-.12,ia,!1),l.position.set(Ye.x,0,Ye.z),l.renderOrder=2,r.add(l),o.add(c0()),e.addLadder(new Ht(new P(Dt.x-Dt.width,0,Dt.z-Dt.width),new P(Dt.x+.3,Dt.top,Dt.z+Dt.width)),Math.PI/2,Dt.top,new P(Dt.x,0,Dt.z));const u=h0();u.position.set(3,.3,14),r.add(u),c.push(new Ec(u,.3))}e.addSolid(o);let h=0;return r.traverse(u=>{if(!(u instanceof He))return;const f=u.geometry;f.index?h+=f.index.count/3:f.attributes.position&&(h+=f.attributes.position.count/3)}),{carryables:c,water:l,hasObstacles:n,root:r,spawn:n0.clone(),spawnFacing:i0,triangleCount:Math.round(h)}}function Wr(i,e){const t=new vt(er,Vs,Ws,1,Vs,Ws),n=new He(t,new gt({color:oa,roughness:.92}));n.position.set(i,Vs/2,e),n.castShadow=!0,n.receiveShadow=!0,n.name="wall";const s=new He(new vt(er+.12,.24,Ws+.12,1,1,Ws),new gt({color:aa,roughness:.85}));return s.position.y=Vs/2+.02,s.castShadow=!0,s.receiveShadow=!0,n.add(s),n}function l0(){const i=new gt({color:new pe("#3a4350"),roughness:.9}),e=Ye.half*2,t=[],n=new He(new Cn(e,e,Ye.half,Ye.half).rotateX(-Math.PI/2),i);n.position.set(Ye.x,-Ye.depth,Ye.z),n.receiveShadow=!0,t.push(n);const s=[[Ye.x,Ye.z-Ye.half,e,.4],[Ye.x,Ye.z+Ye.half,e,.4],[Ye.x-Ye.half,Ye.z,.4,e],[Ye.x+Ye.half,Ye.z,.4,e]];for(const[r,o,a,l]of s){const c=new He(new vt(a,Ye.depth,l,Math.ceil(a),Ye.depth,Math.ceil(l)),i);c.position.set(r,-Ye.depth/2,o),c.receiveShadow=!0,c.castShadow=!0,t.push(c)}return t}function c0(){const i=new mt;i.name="ladder";const e=new gt({color:new pe("#8a7a63"),roughness:.8}),t=Dt.top-.1;for(const n of[-1,1]){const s=new He(new vt(.1,t,.1,1,Math.ceil(t),1),e);s.position.set(Dt.x,t/2,Dt.z+n*.34),s.castShadow=!0,s.receiveShadow=!0,i.add(s)}for(let n=.35;n<t;n+=.42){const s=new He(new Tn(.045,.045,.76,8),e);s.rotation.x=Math.PI/2,s.position.set(Dt.x,n,Dt.z),s.castShadow=!0,i.add(s)}return i}function h0(){const i=new He(new vt(.52,.52,.52,2,2,2),new gt({color:new pe("#9a7a4b"),roughness:.82}));return i.castShadow=!0,i.receiveShadow=!0,i.name="crate",i}function u0(i,e){const t=new He(new vt(Pl,Hn,Gs,1,Hn,Gs),new gt({color:oa,roughness:.92}));t.position.set(i,Hn/2,e),t.castShadow=!0,t.receiveShadow=!0,t.name="thin-wall";const n=new He(new vt(Pl+.08,.16,Gs+.08,1,1,Gs),new gt({color:aa,roughness:.85}));return n.position.y=Hn/2-.08,n.castShadow=!0,n.receiveShadow=!0,t.add(n),t}function d0(i,e){const t=new He(new vt(On,Hn,On,On,Hn,On),new gt({color:oa,roughness:.92}));t.position.set(i,Hn/2,e),t.castShadow=!0,t.receiveShadow=!0,t.name="platform";const n=new He(new vt(On+.1,.2,On+.1,On,1,On),new gt({color:aa,roughness:.85}));return n.position.y=Hn/2+.01,n.castShadow=!0,n.receiveShadow=!0,t.add(n),t}function f0(i,e){const t=i.index,n=i.attributes.position;if(!t)return;const s=[];for(let r=0;r<t.count;r+=3){let o=0,a=0;for(let c=0;c<3;c+=1){const h=t.getX(r+c);o+=n.getX(h),a+=n.getZ(h)}o/=3,a/=3,!(Math.abs(o-e.x)<e.half-.01&&Math.abs(a-e.z)<e.half-.01)&&s.push(t.getX(r),t.getX(r+1),t.getX(r+2))}i.setIndex(s)}function p0(i){const e=es/Ki,t=new Cn(es,es,e,e);t.rotateX(-Math.PI/2);for(const a of i)f0(t,a);const n=t.attributes.position,s=new Float32Array(n.count*3),r=new pe;for(let a=0;a<n.count;a+=1){const l=n.getX(a),c=n.getZ(a),h=Math.floor(l/Ki)+Math.floor(c/Ki);r.copy(h%2===0?s0:r0),(Math.abs(l%Ki)<.01||Math.abs(c%Ki)<.01)&&r.lerp(o0,.6),s[a*3]=r.r,s[a*3+1]=r.g,s[a*3+2]=r.b}t.setAttribute("color",new jt(s,3)),t.computeVertexNormals();const o=new He(t,new gt({vertexColors:!0,roughness:.94,metalness:0}));return o.name="floor",o.receiveShadow=!0,o.castShadow=!1,o}const Xr=new P(0,0,54),Ll=Math.PI,Ke={x:-34,z:18,half:15,depth:8},m0=new pe("#5c6673"),wt=new pe("#49525e"),g0=new pe("#6f7a88"),wc=new pe("#8a7a63"),Bn=new pe("#b4743a"),Dl=new pe("#3f7f6a");function _0(i,e){const t=new mt;t.name="course",i.add(t);const n=new mt;n.name="course-solid",t.add(n);const s=new mt;s.name="course-decor",t.add(s);const r=[],o=[],a=(T,E,v,A,w,C,N=m0)=>{const y=new He(new vt(A,w,C,Math.max(1,Math.round(A)),Math.max(1,Math.round(w)),Math.max(1,Math.round(C))),new gt({color:N,roughness:.92}));return y.position.set(T,E+w/2,v),y.castShadow=!0,y.receiveShadow=!0,n.add(y),y},l=(T,E,v,A,w)=>{const C=a(T,0,v,A,E,w),N=new He(new vt(A+.12,.16,w+.12,Math.max(1,Math.round(A)),1,Math.max(1,Math.round(w))),new gt({color:g0,roughness:.85}));return N.position.set(T,E-.08,v),N.castShadow=!0,N.receiveShadow=!0,n.add(N),C},c=(T,E,v,A=1.6)=>{const w=new He(new Tn(A,A,.06,20),new gt({color:Dl,roughness:.8}));w.position.set(T,E+.03,v),w.receiveShadow=!0,s.add(w),r.push(new P(T,E,v))},h=(T,E,v,A,w,C,N="")=>{const y=new mt;y.position.set(T,E,v),y.rotation.y=A;const b=new He(new Tn(.07,.07,1.5,8),new gt({color:wc,roughness:.8}));b.position.y=.75,b.castShadow=!0,y.add(b);const U=new He(new Cn(2.6,1.3),new hs({map:S0(w,C,N),side:rn,transparent:!0}));U.position.y=2.1,y.add(U),s.add(y)};c(0,0,54),h(3.4,0,54,Math.PI*.9,"1 · RUN","E forward · D back · S / F sides","Let go at full speed to skid");for(let T=0;T<6;T+=1)a(-3.2,0,48-T*3,.5,.12,2,wt),a(3.2,0,48-T*3,.5,.12,2,wt);h(3.4,0,34,Math.PI*.9,"2 · JUMP","Space","Three hurdles, rising"),a(0,0,32,5,.6,.8,Bn),a(0,0,28.5,5,.9,.8,Bn),a(0,0,25,5,1.2,.8,Bn),c(0,0,21),h(3.6,0,21,Math.PI*.9,"3 · DOUBLE & TRIPLE JUMP","Space, then Space again on landing","Keep moving — a combo needs speed"),l(0,1.5,17,4,4),l(0,3.1,12.5,4,4),l(0,5.1,8,4.5,4.5),c(0,0,2),h(4.2,0,2,Math.PI*.9,"4 · LONG JUMP","Run, hold Q, then Space","The gap is too wide for a plain jump"),a(0,0,3.4,7,.4,1.6,wt),a(0,0,2.2,7,.78,1.2,wt),a(0,0,-2,7,1.1,8),a(0,0,-17,9,1.1,7,wt),c(0,1.1,-17),h(12,0,-21.4,0,"5 · BACKFLIP","Stand still, hold Q, then Space","Face the wall — it throws you backwards"),a(12,0,-23,10,5,1.2,wt),c(12,0,-18.5),l(12,2.6,-15,6,4),a(18,0,-15,8,2.6,4),h(18,2.6,-17.8,0,"6 · SIDE FLIP","At a run: Space, then A","Either order, within a third of a second"),l(26,5.1,-15,5,5),h(26,5.1,-11.8,0,"7 · GROUND POUND","In the air: Space, Space again","A boost first, then straight down");const u=new He(new Tn(2.2,2.2,.08,24),new gt({color:Bn,roughness:.75}));u.position.set(26,.04,-8),u.receiveShadow=!0,s.add(u),c(26,0,-8,2.2),h(26,0,-4,0,"8 · WALL KICK","Jump at a wall, then Space again","Bounce side to side to the top"),a(29,0,2,1.2,9,10,wt),a(33.8,0,2,1.2,9,10,wt),l(31.4,9,9,7.6,5),a(31.4,0,16,5,9,10),h(31.4,0,-2,0,"8b · KEEP GOING","Kick wall to wall, no limit","This one is sixteen metres"),a(29,0,-8,1.2,16,8,wt),a(33.8,0,-8,1.2,16,8,wt),l(31.4,16,-14.5,7.6,4),c(31.4,16,-14.5,2),h(31.4,9,20.4,0,"9 · OVER THE TOP","Jump at the edge, then Space to climb","Thin wall · wall top · wide roof"),a(31.4,9,24,6,2.4,.35,Bn),a(31.4,0,27.5,6,9,5),a(31.4,9,32,6,2.5,1.1,Bn),a(31.4,0,36,6,9,5),a(31.4,0,43,9,11.6,8),h(24.4,.6,43,-Math.PI/2,"10 · LADDER","Walk into it · E up, D down","Space jumps off, Q lets go"),a(22,0,43,6,.6,8,wt);const f=26.95,p=11.6;x0(n,f,43,p),e.addLadder(new Ht(new P(f-1,0,42),new P(f+.35,p,44)),Math.PI/2,p,new P(f,0,43)),c(22,.6,43,2),h(31.4,11.6,47.4,0,"11 · CARRY","R to pick up · R again to throw","Take the crate along the bridge");const g=M0();g.position.set(31.4,11.9,46.4),s.add(g),o.push(new Ec(g,.3)),a(20,11,49,26,.6,3.2,wt),a(4,0,49,8,11.6,6),c(4,11.6,49,2.2),h(-15,0,30,Math.PI*.6,"12 · SWIM","Space strokes · C or Ctrl dives","At the surface, Space grabs the edge"),a(-19.5,0,30,4,6,4,wt),a(-23.5,5.4,30,5,.5,2.2,Bn),c(-19.5,6,30,1.5);for(const T of v0())n.add(T);e.addWater(new Ht(new P(Ke.x-Ke.half,-8,Ke.z-Ke.half),new P(Ke.x+Ke.half,0,Ke.z+Ke.half)),-.15);const M=new Tc(Ke.half*2,-.15,ia,!1);M.position.set(Ke.x,0,Ke.z),M.renderOrder=2,t.add(M),c(-34,0,0,2.4),h(-30.5,0,0,Math.PI*.35,"13 · THE LOT","Long jump · wall kick · climb · pound","Finish on the far pad"),a(-34,0,.6,7,.4,1.6,wt),a(-34,0,-.6,7,.78,1.2,wt),a(-34,0,-4,7,1.1,5),a(-34,0,-17,7,1.1,5,wt),a(-36.4,0,-24,1.2,10,8,wt),a(-31.6,0,-24,1.2,10,8,wt),l(-34,10,-30,7.6,4),a(-34,10,-34.5,7,2.5,1.1,Bn),a(-34,0,-38.5,7,10,6);const m=new He(new Tn(3,3,.1,28),new gt({color:Dl,roughness:.7}));m.position.set(-24,.05,-38.5),m.receiveShadow=!0,s.add(m),c(-24,0,-38.5,3),h(-20.5,0,-38.5,Math.PI*.5,"FINISH","Ground pound to land on it","Backspace returns you to the last pad"),e.addSolid(n);let d=0;return t.traverse(T=>{if(!(T instanceof He))return;const E=T.geometry;E.index?d+=E.index.count/3:E.attributes.position&&(d+=E.attributes.position.count/3)}),{root:t,solid:n,carryables:o,water:M,checkpoints:r,triangleCount:Math.round(d)}}function v0(){const i=new gt({color:new pe("#3a4350"),roughness:.9}),e=Ke.half*2,t=[],n=new He(new Cn(e,e,Ke.half,Ke.half).rotateX(-Math.PI/2),i);n.position.set(Ke.x,-8,Ke.z),n.receiveShadow=!0,t.push(n);const s=[[Ke.x,Ke.z-Ke.half,e,.5],[Ke.x,Ke.z+Ke.half,e,.5],[Ke.x-Ke.half,Ke.z,.5,e],[Ke.x+Ke.half,Ke.z,.5,e]];for(const[r,o,a,l]of s){const c=new He(new vt(a,Ke.depth,l,Math.ceil(a),Ke.depth,Math.ceil(l)),i);c.position.set(r,-8/2,o),c.receiveShadow=!0,c.castShadow=!0,t.push(c)}return t}function x0(i,e,t,n){const s=new gt({color:wc,roughness:.8});for(const r of[-1,1]){const o=new He(new vt(.1,n-.1,.1,1,Math.ceil(n),1),s);o.position.set(e,(n-.1)/2,t+r*.34),o.castShadow=!0,o.receiveShadow=!0,i.add(o)}for(let r=.35;r<n-.1;r+=.42){const o=new He(new Tn(.045,.045,.76,8),s);o.rotation.x=Math.PI/2,o.position.set(e,r,t),o.castShadow=!0,i.add(o)}}function M0(){const i=new He(new vt(.52,.52,.52,2,2,2),new gt({color:new pe("#9a7a4b"),roughness:.82}));return i.castShadow=!0,i.receiveShadow=!0,i.name="crate",i}function S0(i,e,t){const n=document.createElement("canvas");n.width=1024,n.height=512;const s=n.getContext("2d");s&&(s.fillStyle="rgba(22, 27, 35, 0.94)",Il(s,8,8,n.width-16,n.height-16,26),s.fill(),s.strokeStyle="#8b96a6",s.lineWidth=6,Il(s,8,8,n.width-16,n.height-16,26),s.stroke(),s.textAlign="center",s.fillStyle="#ffd9a0",s.font="bold 76px system-ui, -apple-system, Segoe UI, sans-serif",s.fillText(i,n.width/2,132),s.fillStyle="#f2f5fa",s.font="600 62px system-ui, -apple-system, Segoe UI, sans-serif",Ul(s,e,n.width/2,236,n.width-90,70),t&&(s.fillStyle="#9fb0c4",s.font="46px system-ui, -apple-system, Segoe UI, sans-serif",Ul(s,t,n.width/2,400,n.width-110,54)));const r=new hc(n);return r.colorSpace=zt,r.minFilter=Qt,r.magFilter=Qt,r}function Il(i,e,t,n,s,r){i.beginPath(),i.moveTo(e+r,t),i.arcTo(e+n,t,e+n,t+s,r),i.arcTo(e+n,t+s,e,t+s,r),i.arcTo(e,t+s,e,t,r),i.arcTo(e,t,e+n,t,r),i.closePath()}function Ul(i,e,t,n,s,r){const o=e.split(" ");let a="",l=n;for(const c of o){const h=a?`${a} ${c}`:c;i.measureText(h).width>s&&a?(i.fillText(a,t,l),a=c,l+=r):a=h}a&&i.fillText(a,t,l)}class y0{constructor(e){k(this,"stats");k(this,"focusNotice");k(this,"visible",!0);const t=document.createElement("div");t.className="ui-root",e.appendChild(t);const n=document.createElement("div");n.className="hud",t.appendChild(n),this.stats=document.createElement("div"),this.stats.className="hud__stats",n.appendChild(this.stats);const s=document.createElement("div");s.className="hud__hints",s.innerHTML=`
      Forward <b>E</b> · Back <b>D</b> · Left <b>S</b> · Right <b>F</b> ·
      Walk <b>hold Shift</b> · Jump <b>Space</b><br />
      Jump again on landing for a higher second and third jump · at a run,
      <b>Space</b> then <b>A</b> for a <b>side flip</b><br />
      <b>Q</b> crouches on land and <b>dives</b> in water — crouch running then
      jump for a <b>long jump</b>, crouch still then jump for a <b>backflip</b><br />
      <b>Space</b> again in the air for a boost, and <b>again</b> to <b>ground
      pound</b> · kick off walls as long as you keep reaching them<br />
      <b>R</b> pick up and throw · <b>E</b>/<b>D</b> climb a ladder, <b>Space</b>
      leaves it · let go at a run to <b>skid</b><br />
      Mouse lock <b>L</b> · Reset <b>Backspace</b> · Panel <b>F3</b> ·
      Quality <b>1</b> low · <b>2</b> medium · <b>3</b> high<br />
      <span class="hud__build">build 6797b95 11-04 22:07</span>
    `,n.appendChild(s),this.focusNotice=document.createElement("div"),this.focusNotice.className="hud__focus",this.focusNotice.textContent="Click the page to give it keyboard focus",n.appendChild(this.focusNotice)}toggleStats(){this.visible=!this.visible,this.stats.hidden=!this.visible}update(e){const t=e.fps>=50?"hud__fps--good":e.fps>=28?"hud__fps--ok":"hud__fps--poor",n=[["FPS",e.fps.toFixed(0),t],["Quality",e.quality],["Draw calls",String(e.drawCalls)],["Triangles",e.triangles.toLocaleString("en-GB")],["State",e.state],["Speed",`${e.speed.toFixed(1)} m/s`],["Position",`${e.position.x.toFixed(0)}, ${e.position.y.toFixed(0)}, ${e.position.z.toFixed(0)}`],["Gamepad",e.gamepad?"connected":"press a button"],["Mouse",e.pointerLocked?"locked":"free  (L)"],["Input",`${e.moveX.toFixed(2)}, ${e.moveY.toFixed(2)}`],["Cam yaw",`${e.cameraYaw.toFixed(0)}°`],["Last key",e.lastKey==="—"?"none yet":`${e.lastKey}${e.lastKeyRecognised?"":"  (unused)"}`]];this.focusNotice.hidden=document.hasFocus(),this.stats.innerHTML="";for(const[s,r,o]of n){const a=document.createElement("div");a.textContent=`${s.padEnd(11," ")}${r}`,o&&(a.className=o),this.stats.appendChild(a)}}}const Bo=document.getElementById("app");if(!Bo)throw new Error("Missing #app container");const b0=1/20;class E0{constructor(){k(this,"settings",cg());k(this,"engine");k(this,"hud");k(this,"input",new yg);k(this,"collision",new Pg);k(this,"effects");k(this,"world");k(this,"course");k(this,"player");k(this,"cameraRig");k(this,"running",!0);k(this,"reachedPad",0);k(this,"onGlobalKey",e=>{if(e.code==="F3"&&(e.preventDefault(),this.hud.toggleStats()),e.code==="Backspace"){e.preventDefault();const t=e.shiftKey?Xr:this.lastPad();this.player.teleport(t,e.shiftKey?Ll:this.player.facing),this.cameraRig.reset(this.player)}if(e.code==="Digit1"||e.code==="Digit2"||e.code==="Digit3"){const t={Digit1:"low",Digit2:"medium",Digit3:"high"}[e.code];this.settings={...this.settings,quality:t},this.engine.applyQuality(t),this.engine.setStudioMode(!0),hg(this.settings)}});k(this,"frame",()=>{if(!this.running)return;requestAnimationFrame(this.frame);const e=Math.min(b0,this.engine.clock.getDelta());this.input.update(this.settings.cameraSensitivity,this.settings.invertCameraY),this.input.wasPressed("togglePointerLock")&&this.input.togglePointerLock(),this.cameraRig.applyLook(this.input.look.x,this.input.look.y),this.player.update(e,this.input,this.cameraRig.movementYaw),this.cameraRig.update(e,this.player),this.trackProgress();for(const t of this.course.carryables)t.update(e,this.collision);this.course.water.update(this.engine.clock.elapsedTime),this.effects.update(e),this.engine.focusShadowsOn(this.player.position),this.engine.render(e),this.hud.update({fps:this.engine.fps,quality:this.settings.quality,drawCalls:this.engine.renderer.info.render.calls,triangles:this.engine.renderer.info.render.triangles,state:this.player.stateName,speed:this.player.speed,position:this.player.position,gamepad:this.input.gamepadConnected,lastKey:this.input.lastKey,lastKeyRecognised:this.input.lastKeyRecognised,pointerLocked:this.input.isPointerLocked,moveX:this.input.move.x,moveY:this.input.move.y,cameraYaw:this.cameraRig.yawDegrees})});this.engine=new gg(Bo,this.settings.quality),this.engine.setStudioMode(!0),this.effects=new Jg(this.engine.scene),this.world=a0(this.engine.scene,this.collision,{holes:[{x:Ke.x,z:Ke.z,half:Ke.half}]}),this.course=_0(this.engine.scene,this.collision),this.player=new jg(this.collision,Xr,{onLand:(t,n)=>{n>.25&&this.effects.dust(t,n)}},{plain:!0}),this.player.facing=Ll,this.player.carryables=this.course.carryables,this.engine.scene.add(this.player.object),this.cameraRig=new Mg(this.engine.camera,this.collision),this.cameraRig.reset(this.player),this.hud=new y0(Bo),this.input.attach(this.engine.renderer.domElement),this.input.setPointerLockWanted(!0),window.addEventListener("keydown",this.onGlobalKey);const e=this.engine.renderer.domElement;e.tabIndex=0,e.style.outline="none",window.focus(),e.focus(),this.engine.clock.start(),requestAnimationFrame(this.frame)}lastPad(){return this.course.checkpoints[this.reachedPad]??Xr}trackProgress(){const e=this.course.checkpoints;for(let t=0;t<e.length;t+=1){if(t<=this.reachedPad)continue;const n=e[t];Math.abs(this.player.position.y-n.y)<1.5&&Math.hypot(this.player.position.x-n.x,this.player.position.z-n.z)<2.4&&(this.reachedPad=t)}}get debug(){return{engine:this.engine,player:this.player,testGround:xt,testFacing:sn,world:this.world,settings:this.settings,rig:this.player.rig,freeze:()=>{this.running=!1},simulateMove:(e,t,n,s)=>{const r={move:{x:n,y:s},look:{x:0,y:0},isDown:()=>!1,wasPressed:()=>!1,wasReleased:()=>!1},o=[],a=this.cameraRig.movementYaw;for(let l=0;l<e;l+=1)this.player.update(t,r,a),o.push({x:Math.round(this.player.position.x*1e3)/1e3,z:Math.round(this.player.position.z*1e3)/1e3,speed:Math.round(this.player.speed*100)/100,state:this.player.stateName});return o},simulateJumpCombo:(e=1/60)=>{let t=!1,n=!1;const s={move:{x:0,y:-1},look:{x:0,y:0},isDown:h=>h==="jump"&&t,wasPressed:h=>h==="jump"&&t&&!n,wasReleased:()=>!1},r=this.cameraRig.movementYaw,o=h=>Math.max(1,Math.round(h/e)),a=()=>this.player.update(e,s,r),l=()=>["idle","walk","run","skid"].includes(this.player.stateName);this.player.teleport(xt.clone(),sn);for(let h=0;h<o(1);h+=1)a();const c=[];for(let h=0;h<3;h+=1){t=!0,n=!1,a(),n=!0;let u=this.player.position.y;for(let f=0;f<o(.4);f+=1)a(),u=Math.max(u,this.player.position.y);t=!1,n=!1;for(let f=0;f<o(2)&&(a(),u=Math.max(u,this.player.position.y),!l());f+=1);c.push(Math.round(u*100)/100);for(let f=0;f<3;f+=1)a()}return c},simulateTripleJump:(e=1/60,t=.4)=>{let n=!1,s=!1;const r={move:{x:0,y:-1},look:{x:0,y:0},isDown:v=>v==="jump"&&n,wasPressed:v=>v==="jump"&&n&&!s,wasReleased:()=>!1},o=this.cameraRig.movementYaw,a=v=>Math.max(1,Math.round(v/e)),l=()=>this.player.update(e,r,o),c=()=>["idle","walk","run","skid"].includes(this.player.stateName);this.player.teleport(xt.clone(),sn);for(let v=0;v<a(1);v+=1)l();for(let v=0;v<2;v+=1){n=!0,s=!1,l(),s=!0;for(let A=0;A<a(.4);A+=1)l();n=!1;for(let A=0;A<a(2)&&(l(),!c());A+=1);for(let A=0;A<3;A+=1)l()}const h=new Ht;let u=this.player.position.y,f=1/0,p={y:0,progress:0,state:"",frame:0},g=0,M=!1,m=-1,d=0,T=0;n=!0,s=!1,l(),s=!0;const E=()=>{u=Math.max(u,this.player.position.y),c()||(T+=1,m<0&&this.player.somersaultProgress>0&&(m=T*e),d=this.player.somersaultProgress),this.player.object.updateMatrixWorld(!0),h.setFromObject(this.player.object),g+=1,!c()&&h.min.y<f&&(f=h.min.y,p={y:Math.round(this.player.position.y*1e3)/1e3,progress:Math.round(this.player.somersaultProgress*100)/100,state:this.player.stateName,frame:g}),this.player.somersaultProgress>=1&&(M=!0)};for(let v=0;v<a(t);v+=1)l(),E();n=!1;for(let v=0;v<a(3)&&(l(),E(),!c());v+=1);return{stage:this.player.stateName,peak:Math.round(u*100)/100,lowestPart:Math.round(f*1e3)/1e3,lowestAt:p,completedBeforeLanding:M,startedAfter:Math.round(m*1e3)/1e3,airtime:Math.round(T*e*1e3)/1e3,progressAtLanding:Math.round(d*100)/100}},simulateMoveSet:(e=1/60)=>{const t={x:0,y:0},n=new Set,s=new Set,r={move:t,look:{x:0,y:0},isDown:m=>n.has(m),wasPressed:m=>s.has(m),wasReleased:()=>!1},o=this.player,a=()=>{o.update(e,r,0),s.clear()},l=m=>Math.max(1,Math.round(m/e)),c=m=>{n.add(m),s.add(m)},h=(m,d=2)=>Math.round(m*10**d)/10**d,u=(m=xt.x,d=xt.z,T=sn)=>{n.clear(),s.clear(),t.x=0,t.y=0,o.teleport(new P(m,0,d),T);for(let E=0;E<l(.4);E+=1)a()},f={},p=new Ht,g=(m,d=0)=>{let T=1/0,E="";for(let v=0;v<l(m);v+=1)a(),!(v<l(d))&&(o.object.updateMatrixWorld(!0),p.setFromObject(o.object),p.min.y<T&&(T=p.min.y,E=`${o.stateName} ${h(v*e,2)}s`));return{lowestPart:h(T,3),at:E}};u(),n.add("crouch"),f.crouchFloor=g(.8),u(),t.y=-1;for(let m=0;m<l(4);m+=1)a();t.y=0,f.brakeFloor=g(.35),t.y=-1;for(let m=0;m<l(4);m+=1)a();t.y=0,f.brakeSettled=g(.35,.22);const M=()=>{u(),t.y=-1;for(let T=0;T<l(1.2);T+=1)a();const m=o.position.clone();c("jump"),a();let d=o.position.y;for(let T=0;T<l(2.5)&&(a(),d=Math.max(d,o.position.y),!(o.stateName!=="jump"&&o.position.y<=.01&&T>4));T+=1);return n.delete("jump"),{distance:h(Math.hypot(o.position.x-m.x,o.position.z-m.z)),peak:h(d)}};f.runningJump=M();{u(),t.y=-1;for(let A=0;A<l(1.2);A+=1)a();const m=h(o.speed);n.add("crouch"),a();const d=o.stateName,T=o.position.clone();c("jump"),a();const E=o.stateName;let v=o.position.y;for(let A=0;A<l(2.5)&&(a(),v=Math.max(v,o.position.y),!(o.position.y<=.01&&A>4));A+=1);f.longJump={crouchState:d,state:E,speedBefore:m,distance:h(Math.hypot(o.position.x-T.x,o.position.z-T.z)),peak:h(v)}}{u(),n.add("crouch");for(let U=0;U<l(.4);U+=1)a();const m=o.stateName,d=o.position.clone(),T=o.facing;c("jump"),a();const E=o.stateName;let v=o.position.y,A=0,w=1/0;const C=new Ht;for(let U=0;U<l(2.5)&&(a(),v=Math.max(v,o.position.y),A=Math.max(A,o.somersaultProgress),o.position.y>.05&&(o.object.updateMatrixWorld(!0),C.setFromObject(o.object),w=Math.min(w,C.min.y)),!(o.position.y<=.01&&U>4));U+=1);const N=o.position.x-d.x,y=o.position.z-d.z,b=-(N*Math.sin(T)+y*Math.cos(T));f.backflip={crouchState:m,state:E,peak:h(v),backwards:h(b),turned:h(A),lowestPart:h(w,3)}}{u(-14,-6,Math.PI/2),t.x=1;for(let w=0;w<l(.5);w+=1)a();c("jump"),a();let m=!1,d=0,T=0,E=!1,v=0;const A=[];for(let w=0;w<l(2.5);w+=1){a();const C=o.stateName;if(A[A.length-1]!==C&&A.push(C),!E&&C==="wall-slide"){m=!0,d=o.position.y,T=o.position.x,c("jump"),E=!0,v=o.position.y;continue}if(E&&(v=Math.max(v,o.position.y)),E&&o.position.y<=.01)break}f.wallKick={touchedWall:m,kicked:E,states:A,gained:h(v-d),movedAway:h(Math.abs(o.position.x-T))}}{u(),t.y=-1;for(let v=0;v<l(4);v+=1)a();const m=h(o.speed),d=o.position.clone();t.y=0;const T=[];let E=0;for(let v=0;v<l(2);v+=1){a();const A=o.stateName;if(T[T.length-1]!==A&&T.push(A),E=v*e,o.speed<.05)break}f.brake={speedBefore:m,states:T,slideDistance:h(Math.hypot(o.position.x-d.x,o.position.z-d.z)),seconds:h(E)}}return u(),f},measureBraking:(e=1/60)=>{const t={x:0,y:0},n={move:t,look:{x:0,y:0},isDown:()=>!1,wasPressed:()=>!1,wasReleased:()=>!1},s=this.player,r=()=>s.update(e,n,0),o=l=>Math.max(1,Math.round(l/e)),a=(l,c=2)=>Math.round(l*10**c)/10**c;return[.5,1,2,3,5].map(l=>{t.x=0,t.y=0,s.teleport(new P(xt.x,0,xt.z-8),sn);for(let f=0;f<o(.6);f+=1)r();t.y=-1;for(let f=0;f<o(l);f+=1)r();const c=a(s.speed),h=s.position.clone();t.y=0;let u=!1;for(let f=0;f<o(3)&&(r(),s.stateName==="brake"&&(u=!0),!(s.speed<.05));f+=1);return{ran:l,speed:c,slide:a(Math.hypot(s.position.x-h.x,s.position.z-h.z)),skidded:u}})},simulateLedges:(e=1/60)=>{const t={x:0,y:0},n=new Set,s=new Set,r={move:t,look:{x:0,y:0},isDown:E=>n.has(E),wasPressed:E=>s.has(E),wasReleased:()=>!1},o=this.player,a=()=>{o.update(e,r,0),s.clear()},l=E=>Math.max(1,Math.round(E/e)),c=(E,v=2)=>Math.round(E*10**v)/10**v,h=E=>{n.add(E),s.add(E)},u=(E,v,A,w)=>{n.clear(),s.clear(),t.x=0,t.y=0,o.teleport(new P(E,v,A),w)},f=(E,v)=>{const A=[],w=()=>{const b=o.stateName;A[A.length-1]!==b&&A.push(b)};let C=-1;for(let b=0;b<l(E);b+=1)if(a(),w(),o.stateName==="hanging"){C=b;break}if(C<0)return{hung:!1,heldFor:0,states:A,landedAt:c(o.position.y)};const N=o.position.y;for(let b=0;b<l(.5);b+=1)a();const y=o.stateName==="hanging"&&Math.abs(o.position.y-N)<.01;h("jump");for(let b=0;b<l(.2);b+=1)a();n.delete("jump");for(let b=0;b<l(v);b+=1)a(),w();return{hung:!0,stayed:y,states:A,hangLift:c(o.ledgeDiagnostics.lip),landedAt:c(o.position.y),landedAhead:c(o.position.x)}},p={};u(-12.7,5.9,-6,Math.PI/2),p.wallTop=f(1,2),u(15,1.5,8.6,0),p.platform=f(1,2.4),u(3.3,1.3,2,Math.PI/2),p.thinWall=f(1,2.4),u(15,0,6.2,0);for(let E=0;E<l(.4);E+=1)a();t.y=1;for(let E=0;E<l(.5);E+=1)a();h("jump");for(let E=0;E<l(.32);E+=1)a();n.delete("jump"),t.y=0,p.platformJumped=f(1.6,2),u(-14,0,-6,Math.PI/2);for(let E=0;E<l(.4);E+=1)a();t.x=1;for(let E=0;E<l(.4);E+=1)a();h("jump");for(let E=0;E<l(.3);E+=1)a();n.delete("jump");const g=[];let M=0,m=0,d=!1;for(let E=0;E<l(6);E+=1){a();const v=o.stateName;if(g[g.length-1]!==v&&g.push(v),v==="hanging"){d=!0;break}m>0?(m-=1,m===0&&n.delete("jump")):v==="wall-slide"&&(h("jump"),m=l(.3),M+=1,t.x=-t.x)}t.x=0,t.y=0;let T={landedAt:c(o.position.y)};if(d){h("jump");for(let E=0;E<l(.2);E+=1)a();n.delete("jump");for(let E=0;E<l(1.6);E+=1){a();const v=o.stateName;g[g.length-1]!==v&&g.push(v)}T={landedAt:c(o.position.y)}}p.wallTopByKicking={kicks:M,reached:d,states:g,...T},u(xt.x,0,xt.z,sn);for(let E=0;E<l(.4);E+=1)a();return p},simulateExtras:(e=1/60)=>{const t={x:0,y:0},n=t,s=new Set,r=new Set,o={move:t,look:{x:0,y:0},isDown:D=>s.has(D),wasPressed:D=>r.has(D),wasReleased:()=>!1},a=this.player,l=()=>{a.update(e,o,0),r.clear()},c=D=>Math.max(1,Math.round(D/e)),h=(D,H=2)=>Math.round(D*10**H)/10**H,u=D=>{s.add(D),r.add(D)},f=(D,H,j,L)=>{s.clear(),r.clear(),t.x=0,t.y=0,a.teleport(new P(D,H,j),L);for(let V=0;V<c(.3);V+=1)l()},p=(D,H)=>{const j=[];for(let L=0;L<c(D);L+=1){l();const V=a.stateName;if(j[j.length-1]!==V&&j.push(V),H?.(V))break}return j},g={},M=(D,H,j)=>{f(xt.x,0,xt.z-12,sn),n.y=-j;for(let re=0;re<c(1.2);re+=1)l();const L=h(a.speed);let V=a.position.y,Z=!1;const q=re=>{for(let ce=0;ce<re;ce+=1)l(),V=Math.max(V,a.position.y),a.stateName==="side-flip"&&(Z=!0)};return H?(u("sideFlip"),q(c(D)),s.delete("sideFlip"),u("jump")):(u("jump"),q(c(D)),u("sideFlip")),q(c(.4)),s.clear(),q(c(2)),{runningAt:L,flipped:Z,peak:h(V)}};g.sideFlipJumpThenFlip=M(.12,!1,1),g.sideFlipFlipThenJump=M(.12,!0,1),g.sideFlipLateButInside=M(.26,!1,1),g.sideFlipTooLate=M(.55,!1,1),g.sideFlipFromAWalk=M(.12,!1,.4),f(xt.x,0,xt.z-12,sn),u("jump");for(let D=0;D<c(.3);D+=1)l();s.delete("jump");for(let D=0;D<c(.18);D+=1)l();const m=h(a.position.y);u("jump");for(let D=0;D<c(.12);D+=1)l();s.delete("jump");let d=a.position.y;for(let D=0;D<c(.3);D+=1)l(),d=Math.max(d,a.position.y);u("jump"),l(),s.delete("jump"),g.groundPound={beforeBoost:m,boostPeak:h(d),states:p(2.5,D=>D==="idle")},f(xt.x,0,xt.z-12,sn),u("jump");for(let D=0;D<c(.3);D+=1)l();s.delete("jump");for(let D=0;D<c(.18);D+=1)l();u("jump"),l(),s.delete("jump"),g.oneExtraPress={states:p(2.5,D=>D==="idle")},f(12.6,0,-6,Math.PI/2),t.x=1;const T=p(.8,D=>D==="climb"),E=a.stateName==="climb",v=h(a.position.y);a.position.y;const A=[];let w=0;for(let D=0;D<c(3);D+=1){const H=a.position.y,j=a.stateName==="climb";l();const L=a.stateName;A[A.length-1]!==L&&A.push(L),j&&L!=="climb"&&(w=Math.max(w,H-a.position.y))}g.ladder={caught:E,from:v,to:h(a.position.y),states:[...T,...A],why:a.ledgeDiagnostics.reason,lip:a.ledgeDiagnostics.lip,dropAtTop:h(w,3)},f(-22,0,36,Math.PI),t.x=0,t.y=-1;const C=p(2.5,D=>D.startsWith("swim")),N=h(a.position.y);t.x=0,t.y=1;for(let D=0;D<c(2.2);D+=1)l();const y=[];let b=!1;for(let D=0;D<6&&!b;D+=1){u("jump");for(let H=0;H<c(.4);H+=1){l();const j=a.stateName;y[y.length-1]!==j&&y.push(j)}if(s.delete("jump"),a.stateName==="hanging"){u("jump");for(let H=0;H<c(.2);H+=1)l();s.delete("jump");for(let H=0;H<c(1.4);H+=1){l();const j=a.stateName;y[y.length-1]!==j&&y.push(j)}b=a.position.y>-.1}}g.pool={swam:C.some(D=>D.startsWith("swim")),states:C,depth:N,gotOut:b,outStates:y,endedAt:h(a.position.y)},f(3,0,16.4,Math.PI),t.x=0,t.y=-.4;for(let D=0;D<c(.55);D+=1)l();t.y=0;for(let D=0;D<c(.3);D+=1)l();const U=a.findCarryTarget();u("grab"),l(),s.delete("grab");for(let D=0;D<c(.5);D+=1)l();return g.crate={inReach:U!==null,carrying:a.carried!==null},f(xt.x,0,xt.z,sn),g},simulateCourse:(e=1/60)=>{const t={x:0,y:0},n=new Set,s=new Set,r={move:t,look:{x:0,y:0},isDown:L=>n.has(L),wasPressed:L=>s.has(L),wasReleased:()=>!1},o=this.player,a=()=>{o.update(e,r,0),s.clear()},l=L=>Math.max(1,Math.round(L/e)),c=(L,V=2)=>Math.round(L*10**V)/10**V,h=L=>{n.add(L),s.add(L)},u=(L,V,Z,q)=>{n.clear(),s.clear(),t.x=0,t.y=0,o.teleport(new P(L,V,Z),q);for(let re=0;re<l(.3);re+=1)a()},f=()=>({x:c(o.position.x),y:c(o.position.y),z:c(o.position.z)}),p={};u(0,0,10,Math.PI),t.y=-1;for(let L=0;L<l(1.5);L+=1)a();n.add("crouch");let g=99,M="";for(let L=0;L<l(1.2);L+=1)if(a(),o.position.z<-4.4&&o.stateName==="crouch"){g=o.position.z,M=o.stateName,h("jump");break}for(let L=0;L<l(.35);L+=1)a();const m=o.stateName;n.clear(),t.y=0;for(let L=0;L<l(2.5);L+=1)a();p.longJumpGap={...f(),tookOffAt:c(g),tookOffState:M,launched:m,endedAs:o.stateName,cleared:o.position.z<-13.5&&o.position.y>1},u(12,0,-18.5,Math.PI),n.add("crouch");for(let L=0;L<l(.4);L+=1)a();const d=o.stateName;h("jump"),a();const T=o.stateName;for(let L=0;L<l(.5);L+=1)a();n.clear();for(let L=0;L<l(2.5);L+=1)a();p.backflipStep={...f(),crouched:d,jumped:T,landed:o.position.y>2.4},u(15,2.6,-15,Math.PI/2),t.x=1;for(let L=0;L<l(.9);L+=1)a();h("jump");for(let L=0;L<l(.1);L+=1)a();h("sideFlip");for(let L=0;L<l(.4);L+=1)a();n.delete("jump"),n.delete("sideFlip"),t.x=0;for(let L=0;L<l(2.5);L+=1)a();p.sideFlipLedge={...f(),landed:o.position.y>4.9},u(31.4,0,2,Math.PI/2),t.x=1;for(let L=0;L<l(.35);L+=1)a();h("jump");let E=l(.3),v=0,A=0;for(let L=0;L<l(7)&&(a(),A=Math.max(A,o.position.y),E>0?(E-=1,E===0&&n.delete("jump")):o.stateName==="wall-slide"&&(h("jump"),E=l(.3),v+=1,t.x=-t.x),o.stateName!=="hanging");L+=1);t.x=0,p.kickShaft={kicks:v,highest:c(A),reached:A>7.5},u(-23.5,5.9,30,Math.PI*.5),t.x=-1;for(let L=0;L<l(1.4);L+=1)a();let w=0;n.add("dive");for(let L=0;L<l(3);L+=1)a(),w=Math.min(w,o.position.y);n.delete("dive"),t.x=0;for(let L=0;L<l(3);L+=1)a();const C=o.stateName==="swim-surface";t.y=1;for(let L=0;L<l(3);L+=1)a();let N=!1;for(let L=0;L<6&&!N;L+=1){h("jump");for(let V=0;V<l(.4);V+=1)a();if(n.delete("jump"),o.stateName==="hanging"){h("jump");for(let V=0;V<l(.2);V+=1)a();n.delete("jump");for(let V=0;V<l(1.6);V+=1)a();N=o.position.y>-.1}}t.x=0,t.y=0,p.pool={deepest:c(w),surfaced:C,out:N,...f()};{const L=()=>{u(23.5,.6,43,Math.PI/2),t.x=1;for(let De=0;De<l(3)&&(a(),o.stateName!=="climb");De+=1);t.x=0};L();const V=c(o.position.y);t.y=-1;for(let De=0;De<l(2);De+=1)a();const Z=c(o.position.y);t.y=0,h("jump");for(let De=0;De<l(.25);De+=1)a();n.delete("jump");const q=o.stateName;for(let De=0;De<l(2);De+=1)a();const re=o.stateName;L(),t.y=-1;const ce=[];for(let De=0;De<l(9);De+=1){a();const Ze=o.stateName;if(ce[ce.length-1]!==Ze&&ce.push(Ze),Ze==="hanging")break}const ye=o.stateName==="hanging",ke=[];if(ye){h("jump"),t.y=0;for(let De=0;De<l(.25);De+=1)a();n.delete("jump");for(let De=0;De<l(2.4);De+=1){a();const Ze=o.stateName;ke[ke.length-1]!==Ze&&ke.push(Ze)}}t.y=0,t.x=0,p.ladderWork={caughtAt:V,climbedTo:Z,climbedUp:Z>V+2,afterJump:q,landedAfterJump:re,releasedByJump:q!=="climb",topStates:ce,hung:ye,overStates:ke,onTop:c(o.position.y),gotOver:o.position.y>11}}u(xt.x,0,xt.z,sn),n.add("crouch");for(let L=0;L<l(.4);L+=1)a();const y=o.stateName;n.clear(),u(-34,0,10,Math.PI);for(let L=0;L<l(2);L+=1)a();const b=o.position.y;n.add("crouch");for(let L=0;L<l(2);L+=1)a();const U=c(o.position.y);n.clear(),p.crouchKey={onLand:y,floatedAt:c(b),divedTo:U,dives:U<b-1},u(31.4,0,-8,Math.PI/2),t.x=1;for(let L=0;L<l(.35);L+=1)a();h("jump");let D=l(.3),H=0,j=0;for(let L=0;L<l(12)&&(a(),j=Math.max(j,o.position.y),D>0?(D-=1,D===0&&n.delete("jump")):o.stateName==="wall-slide"&&(h("jump"),D=l(.3),H+=1,t.x=-t.x),o.stateName!=="hanging");L+=1);t.x=0,n.clear(),p.manyKicks={kicks:H,highest:c(j),pastFour:H>4},u(31.4,11.6,48.4,Math.PI),t.y=-.35;for(let L=0;L<l(.8);L+=1)a();t.y=0;for(let L=0;L<l(.4);L+=1)a();h("grab"),a(),n.delete("grab");for(let L=0;L<l(.4);L+=1)a();return p.crate={carrying:o.carried!==null},u(0,0,54,Math.PI),p},probe:(e,t,n,s=8)=>{const r=this.collision.groundProbe(new P(e,t,n),s);return r?{y:Math.round(r.y*1e3)/1e3,normalY:Math.round(r.normal.y*100)/100}:null},renderFrom:(e,t,n,s)=>{const r=this.engine.camera,o=this.player.position;r.position.set(o.x+e,o.y+t,o.z+n),r.lookAt(o.x,o.y+s,o.z),r.updateMatrixWorld(),this.engine.focusShadowsOn(o),this.engine.render(1/60)}}}}const T0=new E0;window.__letsgo=T0;
