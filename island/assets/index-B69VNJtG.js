var kd=Object.defineProperty;var Bd=(i,t,e)=>t in i?kd(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var K=(i,t,e)=>Bd(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const fl="180",ps={ROTATE:0,DOLLY:1,PAN:2},us={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Hd=0,ic=1,Vd=2,pl=1,Gd=2,Bn=3,ci=0,$e=1,ze=2,ai=0,ms=1,sc=2,rc=3,oc=4,Wd=5,Ei=100,Xd=101,jd=102,Yd=103,qd=104,Kd=200,Zd=201,$d=202,Jd=203,ma=204,ga=205,Qd=206,tu=207,eu=208,nu=209,iu=210,su=211,ru=212,ou=213,au=214,_a=0,xa=1,va=2,Ms=3,Ma=4,ya=5,Sa=6,ba=7,ml=0,lu=1,cu=2,Wn=0,hu=1,du=2,uu=3,fu=4,pu=5,mu=6,gu=7,Ah=300,ys=301,Ss=302,wa=303,Ea=304,po=306,ro=1e3,Pi=1001,Ta=1002,on=1003,_u=1004,_r=1005,An=1006,vo=1007,Ci=1008,Cn=1009,Rh=1010,Ph=1011,ir=1012,gl=1013,Ni=1014,Rn=1015,ur=1016,_l=1017,xl=1018,sr=1020,Ch=35902,Lh=35899,Dh=1021,Ih=1022,rn=1023,rr=1026,or=1027,vl=1028,Ml=1029,Uh=1030,yl=1031,Sl=1033,$r=33776,Jr=33777,Qr=33778,to=33779,Aa=35840,Ra=35841,Pa=35842,Ca=35843,La=36196,Da=37492,Ia=37496,Ua=37808,Na=37809,Fa=37810,Oa=37811,za=37812,ka=37813,Ba=37814,Ha=37815,Va=37816,Ga=37817,Wa=37818,Xa=37819,ja=37820,Ya=37821,qa=36492,Ka=36494,Za=36495,$a=36283,Ja=36284,Qa=36285,tl=36286,xu=3200,vu=3201,bl=0,Mu=1,ii="",nn="srgb",bs="srgb-linear",oo="linear",ne="srgb",Wi=7680,ac=519,yu=512,Su=513,bu=514,Nh=515,wu=516,Eu=517,Tu=518,Au=519,lc=35044,cc="300 es",Pn=2e3,ao=2001;class Bi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Fe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let hc=1234567;const Js=Math.PI/180,ar=180/Math.PI;function As(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Fe[i&255]+Fe[i>>8&255]+Fe[i>>16&255]+Fe[i>>24&255]+"-"+Fe[t&255]+Fe[t>>8&255]+"-"+Fe[t>>16&15|64]+Fe[t>>24&255]+"-"+Fe[e&63|128]+Fe[e>>8&255]+"-"+Fe[e>>16&255]+Fe[e>>24&255]+Fe[n&255]+Fe[n>>8&255]+Fe[n>>16&255]+Fe[n>>24&255]).toLowerCase()}function Ut(i,t,e){return Math.max(t,Math.min(e,i))}function wl(i,t){return(i%t+t)%t}function Ru(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Pu(i,t,e){return i!==t?(e-i)/(t-i):0}function Qs(i,t,e){return(1-e)*i+e*t}function Cu(i,t,e,n){return Qs(i,t,1-Math.exp(-e*n))}function Lu(i,t=1){return t-Math.abs(wl(i,t*2)-t)}function Du(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Iu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Uu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Nu(i,t){return i+Math.random()*(t-i)}function Fu(i){return i*(.5-Math.random())}function Ou(i){i!==void 0&&(hc=i);let t=hc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function zu(i){return i*Js}function ku(i){return i*ar}function Bu(i){return(i&i-1)===0&&i!==0}function Hu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Vu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Gu(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),p=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*d,l*u,a*c);break;case"YZY":i.set(l*u,a*h,l*d,a*c);break;case"ZXZ":i.set(l*d,l*u,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*p,a*c);break;case"YXY":i.set(l*p,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ds(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Be(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const at={DEG2RAD:Js,RAD2DEG:ar,generateUUID:As,clamp:Ut,euclideanModulo:wl,mapLinear:Ru,inverseLerp:Pu,lerp:Qs,damp:Cu,pingpong:Lu,smoothstep:Du,smootherstep:Iu,randInt:Uu,randFloat:Nu,randFloatSpread:Fu,seededRandom:Ou,degToRad:zu,radToDeg:ku,isPowerOfTwo:Bu,ceilPowerOfTwo:Hu,floorPowerOfTwo:Vu,setQuaternionFromProperEuler:Gu,normalize:Be,denormalize:ds};class Mt{constructor(t=0,e=0){Mt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ut(this.x,t.x,e.x),this.y=Ut(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ut(this.x,t,e),this.y=Ut(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ut(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ut(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class hi{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3];const u=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==u||c!==p||h!==g){let m=1-a;const f=l*u+c*p+h*g+d*_,M=f>=0?1:-1,E=1-f*f;if(E>Number.EPSILON){const R=Math.sqrt(E),A=Math.atan2(R,f*M);m=Math.sin(m*A)/R,a=Math.sin(a*A)/R}const v=a*M;if(l=l*m+u*v,c=c*m+p*v,h=h*m+g*v,d=d*m+_*v,m===1-a){const R=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=R,c*=R,h*=R,d*=R}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[o],u=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*d+l*p-c*u,t[e+1]=l*g+h*u+c*d-a*p,t[e+2]=c*g+h*p+a*u-l*d,t[e+3]=h*g-a*d-l*u-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),d=a(r/2),u=l(n/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"YZX":this._x=u*h*d+c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d-u*p*g;break;case"XZY":this._x=u*h*d-c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(n>a&&n>d){const p=2*Math.sqrt(1+n-a-d);this._w=(h-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-n-d);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-n-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ut(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(t=0,e=0,n=0){T.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(dc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(dc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ut(this.x,t.x,e.x),this.y=Ut(this.y,t.y,e.y),this.z=Ut(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ut(this.x,t,e),this.y=Ut(this.y,t,e),this.z=Ut(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ut(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Mo.copy(this).projectOnVector(t),this.sub(Mo)}reflect(t){return this.sub(Mo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ut(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Mo=new T,dc=new hi;class Ht{constructor(t,e,n,s,r,o,a,l,c){Ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],p=n[5],g=n[8],_=s[0],m=s[3],f=s[6],M=s[1],E=s[4],v=s[7],R=s[2],A=s[5],C=s[8];return r[0]=o*_+a*M+l*R,r[3]=o*m+a*E+l*A,r[6]=o*f+a*v+l*C,r[1]=c*_+h*M+d*R,r[4]=c*m+h*E+d*A,r[7]=c*f+h*v+d*C,r[2]=u*_+p*M+g*R,r[5]=u*m+p*E+g*A,r[8]=u*f+p*v+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,p=c*r-o*l,g=e*d+n*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=d*_,t[1]=(s*c-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=u*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=p*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(yo.makeScale(t,e)),this}rotate(t){return this.premultiply(yo.makeRotation(-t)),this}translate(t,e){return this.premultiply(yo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const yo=new Ht;function Fh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function lo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wu(){const i=lo("canvas");return i.style.display="block",i}const uc={};function lr(i){i in uc||(uc[i]=!0,console.warn(i))}function Xu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const fc=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pc=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ju(){const i={enabled:!0,workingColorSpace:bs,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ne&&(s.r=Xn(s.r),s.g=Xn(s.g),s.b=Xn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ne&&(s.r=gs(s.r),s.g=gs(s.g),s.b=gs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ii?oo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return lr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return lr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[bs]:{primaries:t,whitePoint:n,transfer:oo,toXYZ:fc,fromXYZ:pc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:nn},outputColorSpaceConfig:{drawingBufferColorSpace:nn}},[nn]:{primaries:t,whitePoint:n,transfer:ne,toXYZ:fc,fromXYZ:pc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:nn}}}),i}const Kt=ju();function Xn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Xi;class Yu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Xi===void 0&&(Xi=lo("canvas")),Xi.width=t.width,Xi.height=t.height;const s=Xi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Xi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=lo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Xn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Xn(e[n]/255)*255):e[n]=Xn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let qu=0;class El{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qu++}),this.uuid=As(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(So(s[o].image)):r.push(So(s[o]))}else r=So(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function So(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Yu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ku=0;const bo=new T;class Ge extends Bi{constructor(t=Ge.DEFAULT_IMAGE,e=Ge.DEFAULT_MAPPING,n=Pi,s=Pi,r=An,o=Ci,a=rn,l=Cn,c=Ge.DEFAULT_ANISOTROPY,h=ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=As(),this.name="",this.source=new El(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Mt(0,0),this.repeat=new Mt(1,1),this.center=new Mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(bo).x}get height(){return this.source.getSize(bo).y}get depth(){return this.source.getSize(bo).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ah)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ro:t.x=t.x-Math.floor(t.x);break;case Pi:t.x=t.x<0?0:1;break;case Ta:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ro:t.y=t.y-Math.floor(t.y);break;case Pi:t.y=t.y<0?0:1;break;case Ta:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=Ah;Ge.DEFAULT_ANISOTROPY=1;class xe{constructor(t=0,e=0,n=0,s=1){xe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(c+1)/2,v=(p+1)/2,R=(f+1)/2,A=(h+u)/4,C=(d+_)/4,I=(g+m)/4;return E>v&&E>R?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=A/n,r=C/n):v>R?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=A/s,r=I/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=C/r,s=I/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-_)/M,this.z=(u-h)/M,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ut(this.x,t.x,e.x),this.y=Ut(this.y,t.y,e.y),this.z=Ut(this.z,t.z,e.z),this.w=Ut(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ut(this.x,t,e),this.y=Ut(this.y,t,e),this.z=Ut(this.z,t,e),this.w=Ut(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ut(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Zu extends Bi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:An,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new xe(0,0,t,e),this.scissorTest=!1,this.viewport=new xe(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Ge(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:An,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new El(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Fi extends Zu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Oh extends Ge{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class $u extends Ge{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ln{constructor(t=new T(1/0,1/0,1/0),e=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(mn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(mn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=mn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,mn):mn.fromBufferAttribute(r,o),mn.applyMatrix4(t.matrixWorld),this.expandByPoint(mn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),xr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xr.copy(n.boundingBox)),xr.applyMatrix4(t.matrixWorld),this.union(xr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,mn),mn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ns),vr.subVectors(this.max,Ns),ji.subVectors(t.a,Ns),Yi.subVectors(t.b,Ns),qi.subVectors(t.c,Ns),qn.subVectors(Yi,ji),Kn.subVectors(qi,Yi),mi.subVectors(ji,qi);let e=[0,-qn.z,qn.y,0,-Kn.z,Kn.y,0,-mi.z,mi.y,qn.z,0,-qn.x,Kn.z,0,-Kn.x,mi.z,0,-mi.x,-qn.y,qn.x,0,-Kn.y,Kn.x,0,-mi.y,mi.x,0];return!wo(e,ji,Yi,qi,vr)||(e=[1,0,0,0,1,0,0,0,1],!wo(e,ji,Yi,qi,vr))?!1:(Mr.crossVectors(qn,Kn),e=[Mr.x,Mr.y,Mr.z],wo(e,ji,Yi,qi,vr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,mn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(mn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Un),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Un=[new T,new T,new T,new T,new T,new T,new T,new T],mn=new T,xr=new Ln,ji=new T,Yi=new T,qi=new T,qn=new T,Kn=new T,mi=new T,Ns=new T,vr=new T,Mr=new T,gi=new T;function wo(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){gi.fromArray(i,r);const a=s.x*Math.abs(gi.x)+s.y*Math.abs(gi.y)+s.z*Math.abs(gi.z),l=t.dot(gi),c=e.dot(gi),h=n.dot(gi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Ju=new Ln,Fs=new T,Eo=new T;class Rs{constructor(t=new T,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Ju.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Fs.subVectors(t,this.center);const e=Fs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Fs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Eo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Fs.copy(t.center).add(Eo)),this.expandByPoint(Fs.copy(t.center).sub(Eo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Nn=new T,To=new T,yr=new T,Zn=new T,Ao=new T,Sr=new T,Ro=new T;class Tl{constructor(t=new T,e=new T(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Nn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Nn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Nn.copy(this.origin).addScaledVector(this.direction,e),Nn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){To.copy(t).add(e).multiplyScalar(.5),yr.copy(e).sub(t).normalize(),Zn.copy(this.origin).sub(To);const r=t.distanceTo(e)*.5,o=-this.direction.dot(yr),a=Zn.dot(this.direction),l=-Zn.dot(yr),c=Zn.lengthSq(),h=Math.abs(1-o*o);let d,u,p,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,p=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(To).addScaledVector(yr,u),p}intersectSphere(t,e){Nn.subVectors(t.center,this.origin);const n=Nn.dot(this.direction),s=Nn.dot(Nn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Nn)!==null}intersectTriangle(t,e,n,s,r){Ao.subVectors(e,t),Sr.subVectors(n,t),Ro.crossVectors(Ao,Sr);let o=this.direction.dot(Ro),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Zn.subVectors(this.origin,t);const l=a*this.direction.dot(Sr.crossVectors(Zn,Sr));if(l<0)return null;const c=a*this.direction.dot(Ao.cross(Zn));if(c<0||l+c>o)return null;const h=-a*Zn.dot(Ro);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he{constructor(t,e,n,s,r,o,a,l,c,h,d,u,p,g,_,m){he.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,d,u,p,g,_,m)}set(t,e,n,s,r,o,a,l,c,h,d,u,p,g,_,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new he().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ki.setFromMatrixColumn(t,0).length(),r=1/Ki.setFromMatrixColumn(t,1).length(),o=1/Ki.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=o*h,p=o*d,g=a*h,_=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=p+g*c,e[5]=u-_*c,e[9]=-a*l,e[2]=_-u*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){const u=l*h,p=l*d,g=c*h,_=c*d;e[0]=u+_*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=_+u*a,e[10]=o*l}else if(t.order==="ZXY"){const u=l*h,p=l*d,g=c*h,_=c*d;e[0]=u-_*a,e[4]=-o*d,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const u=o*h,p=o*d,g=a*h,_=a*d;e[0]=l*h,e[4]=g*c-p,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const u=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-u*d,e[8]=g*d+p,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*d+g,e[10]=u-_*d}else if(t.order==="XZY"){const u=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=o*h,e[9]=p*d-g,e[2]=g*d-p,e[6]=a*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Qu,t,tf)}lookAt(t,e,n){const s=this.elements;return tn.subVectors(t,e),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),$n.crossVectors(n,tn),$n.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),$n.crossVectors(n,tn)),$n.normalize(),br.crossVectors(tn,$n),s[0]=$n.x,s[4]=br.x,s[8]=tn.x,s[1]=$n.y,s[5]=br.y,s[9]=tn.y,s[2]=$n.z,s[6]=br.z,s[10]=tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],M=n[3],E=n[7],v=n[11],R=n[15],A=s[0],C=s[4],I=s[8],S=s[12],b=s[1],L=s[5],P=s[9],U=s[13],z=s[2],k=s[6],V=s[10],q=s[14],W=s[3],Q=s[7],ot=s[11],pt=s[15];return r[0]=o*A+a*b+l*z+c*W,r[4]=o*C+a*L+l*k+c*Q,r[8]=o*I+a*P+l*V+c*ot,r[12]=o*S+a*U+l*q+c*pt,r[1]=h*A+d*b+u*z+p*W,r[5]=h*C+d*L+u*k+p*Q,r[9]=h*I+d*P+u*V+p*ot,r[13]=h*S+d*U+u*q+p*pt,r[2]=g*A+_*b+m*z+f*W,r[6]=g*C+_*L+m*k+f*Q,r[10]=g*I+_*P+m*V+f*ot,r[14]=g*S+_*U+m*q+f*pt,r[3]=M*A+E*b+v*z+R*W,r[7]=M*C+E*L+v*k+R*Q,r[11]=M*I+E*P+v*V+R*ot,r[15]=M*S+E*U+v*q+R*pt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],p=t[14],g=t[3],_=t[7],m=t[11],f=t[15];return g*(+r*l*d-s*c*d-r*a*u+n*c*u+s*a*p-n*l*p)+_*(+e*l*p-e*c*u+r*o*u-s*o*p+s*c*h-r*l*h)+m*(+e*c*d-e*a*p-r*o*d+n*o*p+r*a*h-n*c*h)+f*(-s*a*h-e*l*d+e*a*u+s*o*d-n*o*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],p=t[11],g=t[12],_=t[13],m=t[14],f=t[15],M=d*m*c-_*u*c+_*l*p-a*m*p-d*l*f+a*u*f,E=g*u*c-h*m*c-g*l*p+o*m*p+h*l*f-o*u*f,v=h*_*c-g*d*c+g*a*p-o*_*p-h*a*f+o*d*f,R=g*d*l-h*_*l-g*a*u+o*_*u+h*a*m-o*d*m,A=e*M+n*E+s*v+r*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/A;return t[0]=M*C,t[1]=(_*u*r-d*m*r-_*s*p+n*m*p+d*s*f-n*u*f)*C,t[2]=(a*m*r-_*l*r+_*s*c-n*m*c-a*s*f+n*l*f)*C,t[3]=(d*l*r-a*u*r-d*s*c+n*u*c+a*s*p-n*l*p)*C,t[4]=E*C,t[5]=(h*m*r-g*u*r+g*s*p-e*m*p-h*s*f+e*u*f)*C,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*f-e*l*f)*C,t[7]=(o*u*r-h*l*r+h*s*c-e*u*c-o*s*p+e*l*p)*C,t[8]=v*C,t[9]=(g*d*r-h*_*r-g*n*p+e*_*p+h*n*f-e*d*f)*C,t[10]=(o*_*r-g*a*r+g*n*c-e*_*c-o*n*f+e*a*f)*C,t[11]=(h*a*r-o*d*r-h*n*c+e*d*c+o*n*p-e*a*p)*C,t[12]=R*C,t[13]=(h*_*s-g*d*s+g*n*u-e*_*u-h*n*m+e*d*m)*C,t[14]=(g*a*s-o*_*s-g*n*l+e*_*l+o*n*m-e*a*m)*C,t[15]=(o*d*s-h*a*s+h*n*l-e*d*l-o*n*u+e*a*u)*C,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,p=r*h,g=r*d,_=o*h,m=o*d,f=a*d,M=l*c,E=l*h,v=l*d,R=n.x,A=n.y,C=n.z;return s[0]=(1-(_+f))*R,s[1]=(p+v)*R,s[2]=(g-E)*R,s[3]=0,s[4]=(p-v)*A,s[5]=(1-(u+f))*A,s[6]=(m+M)*A,s[7]=0,s[8]=(g+E)*C,s[9]=(m-M)*C,s[10]=(1-(u+_))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ki.set(s[0],s[1],s[2]).length();const o=Ki.set(s[4],s[5],s[6]).length(),a=Ki.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],gn.copy(this);const c=1/r,h=1/o,d=1/a;return gn.elements[0]*=c,gn.elements[1]*=c,gn.elements[2]*=c,gn.elements[4]*=h,gn.elements[5]*=h,gn.elements[6]*=h,gn.elements[8]*=d,gn.elements[9]*=d,gn.elements[10]*=d,e.setFromRotationMatrix(gn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Pn,l=!1){const c=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),p=(n+s)/(n-s);let g,_;if(l)g=r/(o-r),_=o*r/(o-r);else if(a===Pn)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===ao)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Pn,l=!1){const c=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),p=-(n+s)/(n-s);let g,_;if(l)g=1/(o-r),_=o/(o-r);else if(a===Pn)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===ao)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ki=new T,gn=new he,Qu=new T(0,0,0),tf=new T(1,1,1),$n=new T,br=new T,tn=new T,mc=new he,gc=new hi;class Sn{constructor(t=0,e=0,n=0,s=Sn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ut(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return mc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(mc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return gc.setFromEuler(this),this.setFromQuaternion(gc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sn.DEFAULT_ORDER="XYZ";class Al{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ef=0;const _c=new T,Zi=new hi,Fn=new he,wr=new T,Os=new T,nf=new T,sf=new hi,xc=new T(1,0,0),vc=new T(0,1,0),Mc=new T(0,0,1),yc={type:"added"},rf={type:"removed"},$i={type:"childadded",child:null},Po={type:"childremoved",child:null};class we extends Bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ef++}),this.uuid=As(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=we.DEFAULT_UP.clone();const t=new T,e=new Sn,n=new hi,s=new T(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new Ht}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=we.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Al,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Zi.setFromAxisAngle(t,e),this.quaternion.multiply(Zi),this}rotateOnWorldAxis(t,e){return Zi.setFromAxisAngle(t,e),this.quaternion.premultiply(Zi),this}rotateX(t){return this.rotateOnAxis(xc,t)}rotateY(t){return this.rotateOnAxis(vc,t)}rotateZ(t){return this.rotateOnAxis(Mc,t)}translateOnAxis(t,e){return _c.copy(t).applyQuaternion(this.quaternion),this.position.add(_c.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(xc,t)}translateY(t){return this.translateOnAxis(vc,t)}translateZ(t){return this.translateOnAxis(Mc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?wr.copy(t):wr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(Os,wr,this.up):Fn.lookAt(wr,Os,this.up),this.quaternion.setFromRotationMatrix(Fn),s&&(Fn.extractRotation(s.matrixWorld),Zi.setFromRotationMatrix(Fn),this.quaternion.premultiply(Zi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(yc),$i.child=t,this.dispatchEvent($i),$i.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(rf),Po.child=t,this.dispatchEvent(Po),Po.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Fn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Fn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(yc),$i.child=t,this.dispatchEvent($i),$i.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,t,nf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,sf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}we.DEFAULT_UP=new T(0,1,0);we.DEFAULT_MATRIX_AUTO_UPDATE=!0;we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const _n=new T,On=new T,Co=new T,zn=new T,Ji=new T,Qi=new T,Sc=new T,Lo=new T,Do=new T,Io=new T,Uo=new xe,No=new xe,Fo=new xe;class un{constructor(t=new T,e=new T,n=new T){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),_n.subVectors(t,e),s.cross(_n);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){_n.subVectors(s,e),On.subVectors(n,e),Co.subVectors(t,e);const o=_n.dot(_n),a=_n.dot(On),l=_n.dot(Co),c=On.dot(On),h=On.dot(Co),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const u=1/d,p=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,zn.x),l.addScaledVector(o,zn.y),l.addScaledVector(a,zn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Uo.setScalar(0),No.setScalar(0),Fo.setScalar(0),Uo.fromBufferAttribute(t,e),No.fromBufferAttribute(t,n),Fo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Uo,r.x),o.addScaledVector(No,r.y),o.addScaledVector(Fo,r.z),o}static isFrontFacing(t,e,n,s){return _n.subVectors(n,e),On.subVectors(t,e),_n.cross(On).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return _n.subVectors(this.c,this.b),On.subVectors(this.a,this.b),_n.cross(On).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return un.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return un.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return un.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return un.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return un.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Ji.subVectors(s,n),Qi.subVectors(r,n),Lo.subVectors(t,n);const l=Ji.dot(Lo),c=Qi.dot(Lo);if(l<=0&&c<=0)return e.copy(n);Do.subVectors(t,s);const h=Ji.dot(Do),d=Qi.dot(Do);if(h>=0&&d<=h)return e.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Ji,o);Io.subVectors(t,r);const p=Ji.dot(Io),g=Qi.dot(Io);if(g>=0&&p<=g)return e.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Qi,a);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return Sc.subVectors(r,s),a=(d-h)/(d-h+(p-g)),e.copy(s).addScaledVector(Sc,a);const f=1/(m+_+u);return o=_*f,a=u*f,e.copy(n).addScaledVector(Ji,o).addScaledVector(Qi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const zh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},Er={h:0,s:0,l:0};function Oo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Wt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=nn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Kt.workingColorSpace){if(t=wl(t,1),e=Ut(e,0,1),n=Ut(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Oo(o,r,t+1/3),this.g=Oo(o,r,t),this.b=Oo(o,r,t-1/3)}return Kt.colorSpaceToWorking(this,s),this}setStyle(t,e=nn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=nn){const n=zh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Xn(t.r),this.g=Xn(t.g),this.b=Xn(t.b),this}copyLinearToSRGB(t){return this.r=gs(t.r),this.g=gs(t.g),this.b=gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=nn){return Kt.workingToColorSpace(Oe.copy(this),t),Math.round(Ut(Oe.r*255,0,255))*65536+Math.round(Ut(Oe.g*255,0,255))*256+Math.round(Ut(Oe.b*255,0,255))}getHexString(t=nn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.workingToColorSpace(Oe.copy(this),e);const n=Oe.r,s=Oe.g,r=Oe.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.workingToColorSpace(Oe.copy(this),e),t.r=Oe.r,t.g=Oe.g,t.b=Oe.b,t}getStyle(t=nn){Kt.workingToColorSpace(Oe.copy(this),t);const e=Oe.r,n=Oe.g,s=Oe.b;return t!==nn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Jn),this.setHSL(Jn.h+t,Jn.s+e,Jn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Jn),t.getHSL(Er);const n=Qs(Jn.h,Er.h,e),s=Qs(Jn.s,Er.s,e),r=Qs(Jn.l,Er.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Oe=new Wt;Wt.NAMES=zh;let of=0;class Ps extends Bi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:of++}),this.uuid=As(),this.name="",this.type="Material",this.blending=ms,this.side=ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ma,this.blendDst=ga,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ac,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wi,this.stencilZFail=Wi,this.stencilZPass=Wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ms&&(n.blending=this.blending),this.side!==ci&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ma&&(n.blendSrc=this.blendSrc),this.blendDst!==ga&&(n.blendDst=this.blendDst),this.blendEquation!==Ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ms&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ac&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Wi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Wi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Wi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Hi extends Ps{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=ml,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ye=new T,Tr=new Mt;let af=0;class Mn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:af++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=lc,this.updateRanges=[],this.gpuType=Rn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Tr.fromBufferAttribute(this,e),Tr.applyMatrix3(t),this.setXY(e,Tr.x,Tr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ds(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Be(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ds(e,this.array)),e}setX(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ds(e,this.array)),e}setY(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ds(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ds(e,this.array)),e}setW(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Be(e,this.array),n=Be(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Be(e,this.array),n=Be(n,this.array),s=Be(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Be(e,this.array),n=Be(n,this.array),s=Be(s,this.array),r=Be(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==lc&&(t.usage=this.usage),t}}class kh extends Mn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Bh extends Mn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class $t extends Mn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let lf=0;const cn=new he,zo=new we,ts=new T,en=new Ln,zs=new Ln,Ce=new T;class De extends Bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=As(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Fh(t)?Bh:kh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ht().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return cn.makeRotationFromQuaternion(t),this.applyMatrix4(cn),this}rotateX(t){return cn.makeRotationX(t),this.applyMatrix4(cn),this}rotateY(t){return cn.makeRotationY(t),this.applyMatrix4(cn),this}rotateZ(t){return cn.makeRotationZ(t),this.applyMatrix4(cn),this}translate(t,e,n){return cn.makeTranslation(t,e,n),this.applyMatrix4(cn),this}scale(t,e,n){return cn.makeScale(t,e,n),this.applyMatrix4(cn),this}lookAt(t){return zo.lookAt(t),zo.updateMatrix(),this.applyMatrix4(zo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ts).negate(),this.translate(ts.x,ts.y,ts.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new $t(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ln);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];en.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new T,1/0);return}if(t){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];zs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ce.addVectors(en.min,zs.min),en.expandByPoint(Ce),Ce.addVectors(en.max,zs.max),en.expandByPoint(Ce)):(en.expandByPoint(zs.min),en.expandByPoint(zs.max))}en.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ce.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ce));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ce.fromBufferAttribute(a,c),l&&(ts.fromBufferAttribute(t,c),Ce.add(ts)),s=Math.max(s,n.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<n.count;I++)a[I]=new T,l[I]=new T;const c=new T,h=new T,d=new T,u=new Mt,p=new Mt,g=new Mt,_=new T,m=new T;function f(I,S,b){c.fromBufferAttribute(n,I),h.fromBufferAttribute(n,S),d.fromBufferAttribute(n,b),u.fromBufferAttribute(r,I),p.fromBufferAttribute(r,S),g.fromBufferAttribute(r,b),h.sub(c),d.sub(c),p.sub(u),g.sub(u);const L=1/(p.x*g.y-g.x*p.y);isFinite(L)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(L),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(L),a[I].add(_),a[S].add(_),a[b].add(_),l[I].add(m),l[S].add(m),l[b].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let I=0,S=M.length;I<S;++I){const b=M[I],L=b.start,P=b.count;for(let U=L,z=L+P;U<z;U+=3)f(t.getX(U+0),t.getX(U+1),t.getX(U+2))}const E=new T,v=new T,R=new T,A=new T;function C(I){R.fromBufferAttribute(s,I),A.copy(R);const S=a[I];E.copy(S),E.sub(R.multiplyScalar(R.dot(S))).normalize(),v.crossVectors(A,S);const L=v.dot(l[I])<0?-1:1;o.setXYZW(I,E.x,E.y,E.z,L)}for(let I=0,S=M.length;I<S;++I){const b=M[I],L=b.start,P=b.count;for(let U=L,z=L+P;U<z;U+=3)C(t.getX(U+0)),C(t.getX(U+1)),C(t.getX(U+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Mn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const s=new T,r=new T,o=new T,a=new T,l=new T,c=new T,h=new T,d=new T;if(t)for(let u=0,p=t.count;u<p;u+=3){const g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=e.count;u<p;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*h;for(let f=0;f<h;f++)u[g++]=c[p++]}return new Mn(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new De,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],p=t(u,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const p=c[d];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const bc=new he,_i=new Tl,Ar=new Rs,wc=new T,Rr=new T,Pr=new T,Cr=new T,ko=new T,Lr=new T,Ec=new T,Dr=new T;class Zt extends we{constructor(t=new De,e=new Hi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Lr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],d=r[l];h!==0&&(ko.fromBufferAttribute(d,t),o?Lr.addScaledVector(ko,h):Lr.addScaledVector(ko.sub(e),h))}e.add(Lr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere),Ar.applyMatrix4(r),_i.copy(t.ray).recast(t.near),!(Ar.containsPoint(_i.origin)===!1&&(_i.intersectSphere(Ar,wc)===null||_i.origin.distanceToSquared(wc)>(t.far-t.near)**2))&&(bc.copy(r).invert(),_i.copy(t.ray).applyMatrix4(bc),!(n.boundingBox!==null&&_i.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,_i)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const m=u[g],f=o[m.materialIndex],M=Math.max(m.start,p.start),E=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let v=M,R=E;v<R;v+=3){const A=a.getX(v),C=a.getX(v+1),I=a.getX(v+2);s=Ir(this,f,t,n,c,h,d,A,C,I),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const M=a.getX(m),E=a.getX(m+1),v=a.getX(m+2);s=Ir(this,o,t,n,c,h,d,M,E,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const m=u[g],f=o[m.materialIndex],M=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=M,R=E;v<R;v+=3){const A=v,C=v+1,I=v+2;s=Ir(this,f,t,n,c,h,d,A,C,I),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const M=m,E=m+1,v=m+2;s=Ir(this,o,t,n,c,h,d,M,E,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function cf(i,t,e,n,s,r,o,a){let l;if(t.side===$e?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===ci,a),l===null)return null;Dr.copy(a),Dr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Dr);return c<e.near||c>e.far?null:{distance:c,point:Dr.clone(),object:i}}function Ir(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Rr),i.getVertexPosition(l,Pr),i.getVertexPosition(c,Cr);const h=cf(i,t,e,n,Rr,Pr,Cr,Ec);if(h){const d=new T;un.getBarycoord(Ec,Rr,Pr,Cr,d),s&&(h.uv=un.getInterpolatedAttribute(s,a,l,c,d,new Mt)),r&&(h.uv1=un.getInterpolatedAttribute(r,a,l,c,d,new Mt)),o&&(h.normal=un.getInterpolatedAttribute(o,a,l,c,d,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new T,materialIndex:0};un.getNormal(Rr,Pr,Cr,u.normal),h.face=u,h.barycoord=d}return h}class pn extends De{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new $t(c,3)),this.setAttribute("normal",new $t(h,3)),this.setAttribute("uv",new $t(d,2));function g(_,m,f,M,E,v,R,A,C,I,S){const b=v/C,L=R/I,P=v/2,U=R/2,z=A/2,k=C+1,V=I+1;let q=0,W=0;const Q=new T;for(let ot=0;ot<V;ot++){const pt=ot*L-U;for(let kt=0;kt<k;kt++){const re=kt*b-P;Q[_]=re*M,Q[m]=pt*E,Q[f]=z,c.push(Q.x,Q.y,Q.z),Q[_]=0,Q[m]=0,Q[f]=A>0?1:-1,h.push(Q.x,Q.y,Q.z),d.push(kt/C),d.push(1-ot/I),q+=1}}for(let ot=0;ot<I;ot++)for(let pt=0;pt<C;pt++){const kt=u+pt+k*ot,re=u+pt+k*(ot+1),de=u+(pt+1)+k*(ot+1),Jt=u+(pt+1)+k*ot;l.push(kt,re,Jt),l.push(re,de,Jt),W+=6}a.addGroup(p,W,S),p+=W,u+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ws(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function He(i){const t={};for(let e=0;e<i.length;e++){const n=ws(i[e]);for(const s in n)t[s]=n[s]}return t}function hf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Hh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const df={clone:ws,merge:He};var uf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ff=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class di extends Ps{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=uf,this.fragmentShader=ff,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ws(t.uniforms),this.uniformsGroups=hf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Vh extends we{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=Pn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Qn=new T,Tc=new Mt,Ac=new Mt;class Ve extends Vh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ar*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Js*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ar*2*Math.atan(Math.tan(Js*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z),Qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z)}getViewSize(t,e){return this.getViewBounds(t,Tc,Ac),e.subVectors(Ac,Tc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Js*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const es=-90,ns=1;class pf extends we{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ve(es,ns,t,e);s.layers=this.layers,this.add(s);const r=new Ve(es,ns,t,e);r.layers=this.layers,this.add(r);const o=new Ve(es,ns,t,e);o.layers=this.layers,this.add(o);const a=new Ve(es,ns,t,e);a.layers=this.layers,this.add(a);const l=new Ve(es,ns,t,e);l.layers=this.layers,this.add(l);const c=new Ve(es,ns,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Pn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ao)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,u,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Gh extends Ge{constructor(t=[],e=ys,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class mf extends Fi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Gh(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new pn(5,5,5),r=new di({name:"CubemapFromEquirect",uniforms:ws(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$e,blending:ai});r.uniforms.tEquirect.value=e;const o=new Zt(s,r),a=e.minFilter;return e.minFilter===Ci&&(e.minFilter=An),new pf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class ce extends we{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gf={type:"move"};class Bo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ce,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ce,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ce,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(gf)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ce;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class _f extends we{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sn,this.environmentIntensity=1,this.environmentRotation=new Sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Rl extends Ge{constructor(t=null,e=1,n=1,s,r,o,a,l,c=on,h=on,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rc extends Mn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const is=new he,Pc=new he,Ur=[],Cc=new Ln,xf=new he,ks=new Zt,Bs=new Rs;class el extends Zt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Rc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,xf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ln),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,is),Cc.copy(t.boundingBox).applyMatrix4(is),this.boundingBox.union(Cc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Rs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,is),Bs.copy(t.boundingSphere).applyMatrix4(is),this.boundingSphere.union(Bs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(ks.geometry=this.geometry,ks.material=this.material,ks.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bs.copy(this.boundingSphere),Bs.applyMatrix4(n),t.ray.intersectsSphere(Bs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,is),Pc.multiplyMatrices(n,is),ks.matrixWorld=Pc,ks.raycast(t,Ur);for(let o=0,a=Ur.length;o<a;o++){const l=Ur[o];l.instanceId=r,l.object=this,e.push(l)}Ur.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Rc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Rl(new Float32Array(s*this.count),s,this.count,vl,Rn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ho=new T,vf=new T,Mf=new Ht;class Gn{constructor(t=new T(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ho.subVectors(n,e).cross(vf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ho),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Mf.getNormalMatrix(t),s=this.coplanarPoint(Ho).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const xi=new Rs,yf=new Mt(.5,.5),Nr=new T;class Pl{constructor(t=new Gn,e=new Gn,n=new Gn,s=new Gn,r=new Gn,o=new Gn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Pn,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],p=r[7],g=r[8],_=r[9],m=r[10],f=r[11],M=r[12],E=r[13],v=r[14],R=r[15];if(s[0].setComponents(c-o,p-h,f-g,R-M).normalize(),s[1].setComponents(c+o,p+h,f+g,R+M).normalize(),s[2].setComponents(c+a,p+d,f+_,R+E).normalize(),s[3].setComponents(c-a,p-d,f-_,R-E).normalize(),n)s[4].setComponents(l,u,m,v).normalize(),s[5].setComponents(c-l,p-u,f-m,R-v).normalize();else if(s[4].setComponents(c-l,p-u,f-m,R-v).normalize(),e===Pn)s[5].setComponents(c+l,p+u,f+m,R+v).normalize();else if(e===ao)s[5].setComponents(l,u,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),xi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),xi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(t){xi.center.set(0,0,0);const e=yf.distanceTo(t.center);return xi.radius=.7071067811865476+e,xi.applyMatrix4(t.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Nr.x=s.normal.x>0?t.max.x:t.min.x,Nr.y=s.normal.y>0?t.max.y:t.min.y,Nr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Nr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Wh extends Ge{constructor(t,e,n=Ni,s,r,o,a=on,l=on,c,h=rr,d=1){if(h!==rr&&h!==or)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:d};super(u,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new El(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Xh extends Ge{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class _s extends De{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],p=[];let g=0;const _=[],m=n/2;let f=0;M(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new $t(d,3)),this.setAttribute("normal",new $t(u,3)),this.setAttribute("uv",new $t(p,2));function M(){const v=new T,R=new T;let A=0;const C=(e-t)/n;for(let I=0;I<=r;I++){const S=[],b=I/r,L=b*(e-t)+t;for(let P=0;P<=s;P++){const U=P/s,z=U*l+a,k=Math.sin(z),V=Math.cos(z);R.x=L*k,R.y=-b*n+m,R.z=L*V,d.push(R.x,R.y,R.z),v.set(k,C,V).normalize(),u.push(v.x,v.y,v.z),p.push(U,1-b),S.push(g++)}_.push(S)}for(let I=0;I<s;I++)for(let S=0;S<r;S++){const b=_[S][I],L=_[S+1][I],P=_[S+1][I+1],U=_[S][I+1];(t>0||S!==0)&&(h.push(b,L,U),A+=3),(e>0||S!==r-1)&&(h.push(L,P,U),A+=3)}c.addGroup(f,A,0),f+=A}function E(v){const R=g,A=new Mt,C=new T;let I=0;const S=v===!0?t:e,b=v===!0?1:-1;for(let P=1;P<=s;P++)d.push(0,m*b,0),u.push(0,b,0),p.push(.5,.5),g++;const L=g;for(let P=0;P<=s;P++){const z=P/s*l+a,k=Math.cos(z),V=Math.sin(z);C.x=S*V,C.y=m*b,C.z=S*k,d.push(C.x,C.y,C.z),u.push(0,b,0),A.x=k*.5+.5,A.y=V*.5*b+.5,p.push(A.x,A.y),g++}for(let P=0;P<s;P++){const U=R+P,z=L+P;v===!0?h.push(z,z+1,U):h.push(z+1,z,U),I+=3}c.addGroup(f,I,v===!0?1:2),f+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Sf{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],u=n[s+1]-h,p=(o-h)/u;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new Mt:new T);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new T,s=[],r=[],o=[],a=new T,l=new he;for(let p=0;p<=t;p++){const g=p/t;s[p]=this.getTangentAt(g,new T)}r[0]=new T,o[0]=new T;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ut(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Ut(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}function Cl(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,d){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,p=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,p*=h,s(o,a,u,p)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Fr=new T,Vo=new Cl,Go=new Cl,Wo=new Cl;class Ll extends Sf{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new T){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Fr.subVectors(s[0],s[1]).add(s[0]),c=Fr);const d=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Fr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Fr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),p),_=Math.pow(d.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(h),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Vo.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,_,m),Go.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,_,m),Wo.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Vo.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Go.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Wo.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(Vo.calc(l),Go.calc(l),Wo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new T().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}class Cs extends De{constructor(t=[new Mt(0,-.5),new Mt(.5,0),new Mt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ut(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/e,d=new T,u=new Mt,p=new T,g=new T,_=new T;let m=0,f=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,f=t[M+1].y-t[M].y,p.x=f*1,p.y=-m,p.z=f*0,_.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:m=t[M+1].x-t[M].x,f=t[M+1].y-t[M].y,p.x=f*1,p.y=-m,p.z=f*0,g.copy(p),p.x+=_.x,p.y+=_.y,p.z+=_.z,p.normalize(),l.push(p.x,p.y,p.z),_.copy(g)}for(let M=0;M<=e;M++){const E=n+M*h*s,v=Math.sin(E),R=Math.cos(E);for(let A=0;A<=t.length-1;A++){d.x=t[A].x*v,d.y=t[A].y,d.z=t[A].x*R,o.push(d.x,d.y,d.z),u.x=M/e,u.y=A/(t.length-1),a.push(u.x,u.y);const C=l[3*A+0]*v,I=l[3*A+1],S=l[3*A+0]*R;c.push(C,I,S)}}for(let M=0;M<e;M++)for(let E=0;E<t.length-1;E++){const v=E+M*t.length,R=v,A=v+t.length,C=v+t.length+1,I=v+1;r.push(R,A,I),r.push(C,I,A)}this.setIndex(r),this.setAttribute("position",new $t(o,3)),this.setAttribute("uv",new $t(a,2)),this.setAttribute("normal",new $t(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cs(t.points,t.segments,t.phiStart,t.phiLength)}}class fr extends De{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,d=t/a,u=e/l,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const M=f*u-o;for(let E=0;E<c;E++){const v=E*d-r;g.push(v,-M,0),_.push(0,0,1),m.push(E/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<a;M++){const E=M+c*f,v=M+c*(f+1),R=M+1+c*(f+1),A=M+1+c*f;p.push(E,v,A),p.push(v,R,A)}this.setIndex(p),this.setAttribute("position",new $t(g,3)),this.setAttribute("normal",new $t(_,3)),this.setAttribute("uv",new $t(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fr(t.width,t.height,t.widthSegments,t.heightSegments)}}class ei extends De{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],d=new T,u=new T,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){const M=[],E=f/n;let v=0;f===0&&o===0?v=.5/e:f===n&&l===Math.PI&&(v=-.5/e);for(let R=0;R<=e;R++){const A=R/e;d.x=-t*Math.cos(s+A*r)*Math.sin(o+E*a),d.y=t*Math.cos(o+E*a),d.z=t*Math.sin(s+A*r)*Math.sin(o+E*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(A+v,1-E),M.push(c++)}h.push(M)}for(let f=0;f<n;f++)for(let M=0;M<e;M++){const E=h[f][M+1],v=h[f][M],R=h[f+1][M],A=h[f+1][M+1];(f!==0||o>0)&&p.push(E,v,A),(f!==n-1||l<Math.PI)&&p.push(v,R,A)}this.setIndex(p),this.setAttribute("position",new $t(g,3)),this.setAttribute("normal",new $t(_,3)),this.setAttribute("uv",new $t(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ei(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Dl extends De{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new T,d=new T,u=new T;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){const _=g/s*r,m=p/n*Math.PI*2;d.x=(t+e*Math.cos(m))*Math.cos(_),d.y=(t+e*Math.cos(m))*Math.sin(_),d.z=e*Math.sin(m),a.push(d.x,d.y,d.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(g/s),c.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){const _=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,M=(s+1)*p+g;o.push(_,m,M),o.push(m,f,M)}this.setIndex(o),this.setAttribute("position",new $t(a,3)),this.setAttribute("normal",new $t(l,3)),this.setAttribute("uv",new $t(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dl(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class jh extends Ps{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bl,this.normalScale=new Mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Me extends Ps{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bl,this.normalScale=new Mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=ml,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class bf extends Ps{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class wf extends Ps{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Yh extends we{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Ef extends Yh{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Xo=new he,Lc=new T,Dc=new T;class Tf{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Mt(512,512),this.mapType=Cn,this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pl,this._frameExtents=new Mt(1,1),this._viewportCount=1,this._viewports=[new xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Lc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Lc),Dc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Dc),e.updateMatrixWorld(),Xo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xo,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Xo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Il extends Vh{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Af extends Tf{constructor(){super(new Il(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class qh extends Yh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.shadow=new Af}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Rf extends Ve{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Ic{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Ut(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ut(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Uc=new T,Or=new T,ss=new T,rs=new T,jo=new T,Pf=new T,Cf=new T;class Kh{constructor(t=new T,e=new T){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Uc.subVectors(t,this.start),Or.subVectors(this.end,this.start);const n=Or.dot(Or);let r=Or.dot(Uc)/n;return e&&(r=Ut(r,0,1)),r}closestPointToPoint(t,e,n){const s=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(t,e=Pf,n=Cf){const s=10000000000000001e-32;let r,o;const a=this.start,l=t.start,c=this.end,h=t.end;ss.subVectors(c,a),rs.subVectors(h,l),jo.subVectors(a,l);const d=ss.dot(ss),u=rs.dot(rs),p=rs.dot(jo);if(d<=s&&u<=s)return e.copy(a),n.copy(l),e.sub(n),e.dot(e);if(d<=s)r=0,o=p/u,o=Ut(o,0,1);else{const g=ss.dot(jo);if(u<=s)o=0,r=Ut(-g/d,0,1);else{const _=ss.dot(rs),m=d*u-_*_;m!==0?r=Ut((_*p-g*u)/m,0,1):r=0,o=(_*r+p)/u,o<0?(o=0,r=Ut(-g/d,0,1)):o>1&&(o=1,r=Ut((_-g)/d,0,1))}}return e.copy(a).add(ss.multiplyScalar(r)),n.copy(l).add(rs.multiplyScalar(o)),e.sub(n),e.dot(e)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class Lf extends Bi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Nc(i,t,e,n){const s=Df(n);switch(e){case Dh:return i*t;case vl:return i*t/s.components*s.byteLength;case Ml:return i*t/s.components*s.byteLength;case Uh:return i*t*2/s.components*s.byteLength;case yl:return i*t*2/s.components*s.byteLength;case Ih:return i*t*3/s.components*s.byteLength;case rn:return i*t*4/s.components*s.byteLength;case Sl:return i*t*4/s.components*s.byteLength;case $r:case Jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Qr:case to:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ra:case Ca:return Math.max(i,16)*Math.max(t,8)/4;case Aa:case Pa:return Math.max(i,8)*Math.max(t,8)/2;case La:case Da:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ia:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ua:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Na:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Fa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Oa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case za:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ka:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ba:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ha:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Va:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ga:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Wa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Xa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ja:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ya:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case qa:case Ka:case Za:return Math.ceil(i/4)*Math.ceil(t/4)*16;case $a:case Ja:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Qa:case tl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Df(i){switch(i){case Cn:case Rh:return{byteLength:1,components:1};case ir:case Ph:case ur:return{byteLength:2,components:1};case _l:case xl:return{byteLength:2,components:4};case Ni:case gl:case Rn:return{byteLength:4,components:1};case Ch:case Lh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:fl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=fl);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Zh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function If(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){const g=d[u],_=d[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){const _=d[p];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Uf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nf=`#ifdef USE_ALPHAHASH
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
#endif`,Ff=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Of=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Bf=`#ifdef USE_AOMAP
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
#endif`,Hf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vf=`#ifdef USE_BATCHING
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
#endif`,Gf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Yf=`#ifdef USE_IRIDESCENCE
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
#endif`,qf=`#ifdef USE_BUMPMAP
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
#endif`,Kf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Zf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$f=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,tp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ep=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,np=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ip=`#define PI 3.141592653589793
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
} // validated`,sp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,rp=`vec3 transformedNormal = objectNormal;
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
#endif`,op=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ap=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hp="gl_FragColor = linearToOutputTexel( gl_FragColor );",dp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,up=`#ifdef USE_ENVMAP
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
#endif`,fp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,pp=`#ifdef USE_ENVMAP
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
#endif`,mp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gp=`#ifdef USE_ENVMAP
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
#endif`,_p=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yp=`#ifdef USE_GRADIENTMAP
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
}`,Sp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ep=`uniform bool receiveShadow;
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
#endif`,Tp=`#ifdef USE_ENVMAP
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
#endif`,Ap=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Pp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lp=`PhysicalMaterial material;
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
#endif`,Dp=`struct PhysicalMaterial {
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
}`,Ip=`
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
#endif`,Up=`#if defined( RE_IndirectDiffuse )
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
#endif`,Np=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Op=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Bp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Gp=`#if defined( USE_POINTS_UV )
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
#endif`,Wp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kp=`#ifdef USE_MORPHTARGETS
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
#endif`,Zp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$p=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Jp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Qp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,em=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,nm=`#ifdef USE_NORMALMAP
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
#endif`,im=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,om=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,am=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,cm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,um=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_m=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,xm=`float getShadowMask() {
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
}`,vm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mm=`#ifdef USE_SKINNING
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
#endif`,ym=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sm=`#ifdef USE_SKINNING
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
#endif`,bm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Em=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Am=`#ifdef USE_TRANSMISSION
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
#endif`,Rm=`#ifdef USE_TRANSMISSION
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
#endif`,Pm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Im=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Um=`uniform sampler2D t2D;
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
}`,Nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Om=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,km=`#include <common>
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
}`,Bm=`#if DEPTH_PACKING == 3200
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
}`,Hm=`#define DISTANCE
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
}`,Vm=`#define DISTANCE
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
}`,Gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xm=`uniform float scale;
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
}`,jm=`uniform vec3 diffuse;
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
}`,Ym=`#include <common>
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
}`,qm=`uniform vec3 diffuse;
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
}`,Km=`#define LAMBERT
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
}`,Zm=`#define LAMBERT
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
}`,$m=`#define MATCAP
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
}`,Jm=`#define MATCAP
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
}`,Qm=`#define NORMAL
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
}`,t0=`#define NORMAL
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
}`,e0=`#define PHONG
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
}`,n0=`#define PHONG
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
}`,i0=`#define STANDARD
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
}`,s0=`#define STANDARD
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
}`,r0=`#define TOON
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
}`,o0=`#define TOON
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
}`,a0=`uniform float size;
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
}`,l0=`uniform vec3 diffuse;
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
}`,c0=`#include <common>
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
}`,h0=`uniform vec3 color;
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
}`,d0=`uniform float rotation;
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
}`,u0=`uniform vec3 diffuse;
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
}`,Gt={alphahash_fragment:Uf,alphahash_pars_fragment:Nf,alphamap_fragment:Ff,alphamap_pars_fragment:Of,alphatest_fragment:zf,alphatest_pars_fragment:kf,aomap_fragment:Bf,aomap_pars_fragment:Hf,batching_pars_vertex:Vf,batching_vertex:Gf,begin_vertex:Wf,beginnormal_vertex:Xf,bsdfs:jf,iridescence_fragment:Yf,bumpmap_pars_fragment:qf,clipping_planes_fragment:Kf,clipping_planes_pars_fragment:Zf,clipping_planes_pars_vertex:$f,clipping_planes_vertex:Jf,color_fragment:Qf,color_pars_fragment:tp,color_pars_vertex:ep,color_vertex:np,common:ip,cube_uv_reflection_fragment:sp,defaultnormal_vertex:rp,displacementmap_pars_vertex:op,displacementmap_vertex:ap,emissivemap_fragment:lp,emissivemap_pars_fragment:cp,colorspace_fragment:hp,colorspace_pars_fragment:dp,envmap_fragment:up,envmap_common_pars_fragment:fp,envmap_pars_fragment:pp,envmap_pars_vertex:mp,envmap_physical_pars_fragment:Tp,envmap_vertex:gp,fog_vertex:_p,fog_pars_vertex:xp,fog_fragment:vp,fog_pars_fragment:Mp,gradientmap_pars_fragment:yp,lightmap_pars_fragment:Sp,lights_lambert_fragment:bp,lights_lambert_pars_fragment:wp,lights_pars_begin:Ep,lights_toon_fragment:Ap,lights_toon_pars_fragment:Rp,lights_phong_fragment:Pp,lights_phong_pars_fragment:Cp,lights_physical_fragment:Lp,lights_physical_pars_fragment:Dp,lights_fragment_begin:Ip,lights_fragment_maps:Up,lights_fragment_end:Np,logdepthbuf_fragment:Fp,logdepthbuf_pars_fragment:Op,logdepthbuf_pars_vertex:zp,logdepthbuf_vertex:kp,map_fragment:Bp,map_pars_fragment:Hp,map_particle_fragment:Vp,map_particle_pars_fragment:Gp,metalnessmap_fragment:Wp,metalnessmap_pars_fragment:Xp,morphinstance_vertex:jp,morphcolor_vertex:Yp,morphnormal_vertex:qp,morphtarget_pars_vertex:Kp,morphtarget_vertex:Zp,normal_fragment_begin:$p,normal_fragment_maps:Jp,normal_pars_fragment:Qp,normal_pars_vertex:tm,normal_vertex:em,normalmap_pars_fragment:nm,clearcoat_normal_fragment_begin:im,clearcoat_normal_fragment_maps:sm,clearcoat_pars_fragment:rm,iridescence_pars_fragment:om,opaque_fragment:am,packing:lm,premultiplied_alpha_fragment:cm,project_vertex:hm,dithering_fragment:dm,dithering_pars_fragment:um,roughnessmap_fragment:fm,roughnessmap_pars_fragment:pm,shadowmap_pars_fragment:mm,shadowmap_pars_vertex:gm,shadowmap_vertex:_m,shadowmask_pars_fragment:xm,skinbase_vertex:vm,skinning_pars_vertex:Mm,skinning_vertex:ym,skinnormal_vertex:Sm,specularmap_fragment:bm,specularmap_pars_fragment:wm,tonemapping_fragment:Em,tonemapping_pars_fragment:Tm,transmission_fragment:Am,transmission_pars_fragment:Rm,uv_pars_fragment:Pm,uv_pars_vertex:Cm,uv_vertex:Lm,worldpos_vertex:Dm,background_vert:Im,background_frag:Um,backgroundCube_vert:Nm,backgroundCube_frag:Fm,cube_vert:Om,cube_frag:zm,depth_vert:km,depth_frag:Bm,distanceRGBA_vert:Hm,distanceRGBA_frag:Vm,equirect_vert:Gm,equirect_frag:Wm,linedashed_vert:Xm,linedashed_frag:jm,meshbasic_vert:Ym,meshbasic_frag:qm,meshlambert_vert:Km,meshlambert_frag:Zm,meshmatcap_vert:$m,meshmatcap_frag:Jm,meshnormal_vert:Qm,meshnormal_frag:t0,meshphong_vert:e0,meshphong_frag:n0,meshphysical_vert:i0,meshphysical_frag:s0,meshtoon_vert:r0,meshtoon_frag:o0,points_vert:a0,points_frag:l0,shadow_vert:c0,shadow_frag:h0,sprite_vert:d0,sprite_frag:u0},ht={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new Mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new Mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},En={basic:{uniforms:He([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:He([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:He([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:He([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:He([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:He([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:He([ht.points,ht.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:He([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:He([ht.common,ht.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:He([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:He([ht.sprite,ht.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distanceRGBA:{uniforms:He([ht.common,ht.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distanceRGBA_vert,fragmentShader:Gt.distanceRGBA_frag},shadow:{uniforms:He([ht.lights,ht.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};En.physical={uniforms:He([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new Mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new Mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new Mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};const zr={r:0,b:0,g:0},vi=new Sn,f0=new he;function p0(i,t,e,n,s,r,o){const a=new Wt(0);let l=r===!0?0:1,c,h,d=null,u=0,p=null;function g(E){let v=E.isScene===!0?E.background:null;return v&&v.isTexture&&(v=(E.backgroundBlurriness>0?e:t).get(v)),v}function _(E){let v=!1;const R=g(E);R===null?f(a,l):R&&R.isColor&&(f(R,1),v=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,v){const R=g(v);R&&(R.isCubeTexture||R.mapping===po)?(h===void 0&&(h=new Zt(new pn(1,1,1),new di({name:"BackgroundCubeMaterial",uniforms:ws(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,C,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),vi.copy(v.backgroundRotation),vi.x*=-1,vi.y*=-1,vi.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(f0.makeRotationFromEuler(vi)),h.material.toneMapped=Kt.getTransfer(R.colorSpace)!==ne,(d!==R||u!==R.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,d=R,u=R.version,p=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new Zt(new fr(2,2),new di({name:"BackgroundMaterial",uniforms:ws(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(R.colorSpace)!==ne,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(d!==R||u!==R.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,d=R,u=R.version,p=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function f(E,v){E.getRGB(zr,Hh(i)),n.buffers.color.setClear(zr.r,zr.g,zr.b,v,o)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,v=1){a.set(E),l=v,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,f(a,l)},render:_,addToRenderList:m,dispose:M}}function m0(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,o=!1;function a(b,L,P,U,z){let k=!1;const V=d(U,P,L);r!==V&&(r=V,c(r.object)),k=p(b,U,P,z),k&&g(b,U,P,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,v(b,L,P,U),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return i.createVertexArray()}function c(b){return i.bindVertexArray(b)}function h(b){return i.deleteVertexArray(b)}function d(b,L,P){const U=P.wireframe===!0;let z=n[b.id];z===void 0&&(z={},n[b.id]=z);let k=z[L.id];k===void 0&&(k={},z[L.id]=k);let V=k[U];return V===void 0&&(V=u(l()),k[U]=V),V}function u(b){const L=[],P=[],U=[];for(let z=0;z<e;z++)L[z]=0,P[z]=0,U[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:P,attributeDivisors:U,object:b,attributes:{},index:null}}function p(b,L,P,U){const z=r.attributes,k=L.attributes;let V=0;const q=P.getAttributes();for(const W in q)if(q[W].location>=0){const ot=z[W];let pt=k[W];if(pt===void 0&&(W==="instanceMatrix"&&b.instanceMatrix&&(pt=b.instanceMatrix),W==="instanceColor"&&b.instanceColor&&(pt=b.instanceColor)),ot===void 0||ot.attribute!==pt||pt&&ot.data!==pt.data)return!0;V++}return r.attributesNum!==V||r.index!==U}function g(b,L,P,U){const z={},k=L.attributes;let V=0;const q=P.getAttributes();for(const W in q)if(q[W].location>=0){let ot=k[W];ot===void 0&&(W==="instanceMatrix"&&b.instanceMatrix&&(ot=b.instanceMatrix),W==="instanceColor"&&b.instanceColor&&(ot=b.instanceColor));const pt={};pt.attribute=ot,ot&&ot.data&&(pt.data=ot.data),z[W]=pt,V++}r.attributes=z,r.attributesNum=V,r.index=U}function _(){const b=r.newAttributes;for(let L=0,P=b.length;L<P;L++)b[L]=0}function m(b){f(b,0)}function f(b,L){const P=r.newAttributes,U=r.enabledAttributes,z=r.attributeDivisors;P[b]=1,U[b]===0&&(i.enableVertexAttribArray(b),U[b]=1),z[b]!==L&&(i.vertexAttribDivisor(b,L),z[b]=L)}function M(){const b=r.newAttributes,L=r.enabledAttributes;for(let P=0,U=L.length;P<U;P++)L[P]!==b[P]&&(i.disableVertexAttribArray(P),L[P]=0)}function E(b,L,P,U,z,k,V){V===!0?i.vertexAttribIPointer(b,L,P,z,k):i.vertexAttribPointer(b,L,P,U,z,k)}function v(b,L,P,U){_();const z=U.attributes,k=P.getAttributes(),V=L.defaultAttributeValues;for(const q in k){const W=k[q];if(W.location>=0){let Q=z[q];if(Q===void 0&&(q==="instanceMatrix"&&b.instanceMatrix&&(Q=b.instanceMatrix),q==="instanceColor"&&b.instanceColor&&(Q=b.instanceColor)),Q!==void 0){const ot=Q.normalized,pt=Q.itemSize,kt=t.get(Q);if(kt===void 0)continue;const re=kt.buffer,de=kt.type,Jt=kt.bytesPerElement,$=de===i.INT||de===i.UNSIGNED_INT||Q.gpuType===gl;if(Q.isInterleavedBufferAttribute){const et=Q.data,_t=et.stride,Nt=Q.offset;if(et.isInstancedInterleavedBuffer){for(let At=0;At<W.locationSize;At++)f(W.location+At,et.meshPerAttribute);b.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let At=0;At<W.locationSize;At++)m(W.location+At);i.bindBuffer(i.ARRAY_BUFFER,re);for(let At=0;At<W.locationSize;At++)E(W.location+At,pt/W.locationSize,de,ot,_t*Jt,(Nt+pt/W.locationSize*At)*Jt,$)}else{if(Q.isInstancedBufferAttribute){for(let et=0;et<W.locationSize;et++)f(W.location+et,Q.meshPerAttribute);b.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let et=0;et<W.locationSize;et++)m(W.location+et);i.bindBuffer(i.ARRAY_BUFFER,re);for(let et=0;et<W.locationSize;et++)E(W.location+et,pt/W.locationSize,de,ot,pt*Jt,pt/W.locationSize*et*Jt,$)}}else if(V!==void 0){const ot=V[q];if(ot!==void 0)switch(ot.length){case 2:i.vertexAttrib2fv(W.location,ot);break;case 3:i.vertexAttrib3fv(W.location,ot);break;case 4:i.vertexAttrib4fv(W.location,ot);break;default:i.vertexAttrib1fv(W.location,ot)}}}}M()}function R(){I();for(const b in n){const L=n[b];for(const P in L){const U=L[P];for(const z in U)h(U[z].object),delete U[z];delete L[P]}delete n[b]}}function A(b){if(n[b.id]===void 0)return;const L=n[b.id];for(const P in L){const U=L[P];for(const z in U)h(U[z].object),delete U[z];delete L[P]}delete n[b.id]}function C(b){for(const L in n){const P=n[L];if(P[b.id]===void 0)continue;const U=P[b.id];for(const z in U)h(U[z].object),delete U[z];delete P[b.id]}}function I(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:S,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function g0(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function a(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let p=0;for(let g=0;g<d;g++)p+=h[g];e.update(p,n,1)}function l(c,h,d,u){if(d===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_]*u[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function _0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==rn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const I=C===ur&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Cn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Rn&&!I)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:v,vertexTextures:R,maxSamples:A}}function x0(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Gn,a=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||n!==0||s;return s=u,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const M=r?0:n,E=M*4;let v=f.clippingState||null;l.value=v,v=h(g,u,E,p);for(let R=0;R!==E;++R)v[R]=e[R];f.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,p,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=p+_*4,M=u.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let E=0,v=p;E!==_;++E,v+=4)o.copy(d[E]).applyMatrix4(M,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function v0(i){let t=new WeakMap;function e(o,a){return a===wa?o.mapping=ys:a===Ea&&(o.mapping=Ss),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===wa||a===Ea)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new mf(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const fs=4,Fc=[.125,.215,.35,.446,.526,.582],Ti=20,Yo=new Il,Oc=new Wt;let qo=null,Ko=0,Zo=0,$o=!1;const wi=(1+Math.sqrt(5))/2,os=1/wi,zc=[new T(-wi,os,0),new T(wi,os,0),new T(-os,0,wi),new T(os,0,wi),new T(0,wi,-os),new T(0,wi,os),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)],M0=new T;class kc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=M0}=r;qo=this._renderer.getRenderTarget(),Ko=this._renderer.getActiveCubeFace(),Zo=this._renderer.getActiveMipmapLevel(),$o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(qo,Ko,Zo),this._renderer.xr.enabled=$o,t.scissorTest=!1,kr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ys||t.mapping===Ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),qo=this._renderer.getRenderTarget(),Ko=this._renderer.getActiveCubeFace(),Zo=this._renderer.getActiveMipmapLevel(),$o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:An,minFilter:An,generateMipmaps:!1,type:ur,format:rn,colorSpace:bs,depthBuffer:!1},s=Bc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=y0(r)),this._blurMaterial=S0(r,t,e)}return s}_compileMaterial(t){const e=new Zt(this._lodPlanes[0],t);this._renderer.compile(e,Yo)}_sceneToCubeUV(t,e,n,s,r){const l=new Ve(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(Oc),d.toneMapping=Wn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));const _=new Hi({name:"PMREM.Background",side:$e,depthWrite:!1,depthTest:!1}),m=new Zt(new pn,_);let f=!1;const M=t.background;M?M.isColor&&(_.color.copy(M),t.background=null,f=!0):(_.color.copy(Oc),f=!0);for(let E=0;E<6;E++){const v=E%3;v===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):v===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));const R=this._cubeSize;kr(s,v*R,E>2?R:0,R,R),d.setRenderTarget(s),f&&d.render(m,l),d.render(t,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=p,d.autoClear=u,t.background=M}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===ys||t.mapping===Ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Zt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;kr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Yo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=zc[(s-r-1)%zc.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Zt(this._lodPlanes[s],c),u=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ti-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Ti;m>Ti&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ti}`);const f=[];let M=0;for(let C=0;C<Ti;++C){const I=C/_,S=Math.exp(-I*I/2);f.push(S),C===0?M+=S:C<m&&(M+=2*S)}for(let C=0;C<f.length;C++)f[C]=f[C]/M;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:E}=this;u.dTheta.value=g,u.mipInt.value=E-n;const v=this._sizeLods[s],R=3*v*(s>E-fs?s-E+fs:0),A=4*(this._cubeSize-v);kr(e,R,A,3*v,2*v),l.setRenderTarget(e),l.render(d,Yo)}}function y0(i){const t=[],e=[],n=[];let s=i;const r=i-fs+1+Fc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-fs?l=Fc[o-i+fs-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,_=3,m=2,f=1,M=new Float32Array(_*g*p),E=new Float32Array(m*g*p),v=new Float32Array(f*g*p);for(let A=0;A<p;A++){const C=A%3*2/3-1,I=A>2?0:-1,S=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];M.set(S,_*g*A),E.set(u,m*g*A);const b=[A,A,A,A,A,A];v.set(b,f*g*A)}const R=new De;R.setAttribute("position",new Mn(M,_)),R.setAttribute("uv",new Mn(E,m)),R.setAttribute("faceIndex",new Mn(v,f)),t.push(R),s>fs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Bc(i,t,e){const n=new Fi(i,t,e);return n.texture.mapping=po,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function kr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function S0(i,t,e){const n=new Float32Array(Ti),s=new T(0,1,0);return new di({name:"SphericalGaussianBlur",defines:{n:Ti,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ul(),fragmentShader:`

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
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Hc(){return new di({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ul(),fragmentShader:`

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
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Vc(){return new di({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ul(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Ul(){return`

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
	`}function b0(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===wa||l===Ea,h=l===ys||l===Ss;if(c||h){let d=t.get(a);const u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new kc(i)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new kc(i)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function w0(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&lr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function E0(i,t,e,n){const s={},r=new WeakMap;function o(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete s[u.id];const p=r.get(u);p&&(t.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const p in u)t.update(u[p],i.ARRAY_BUFFER)}function c(d){const u=[],p=d.index,g=d.attributes.position;let _=0;if(p!==null){const M=p.array;_=p.version;for(let E=0,v=M.length;E<v;E+=3){const R=M[E+0],A=M[E+1],C=M[E+2];u.push(R,A,A,C,C,R)}}else if(g!==void 0){const M=g.array;_=g.version;for(let E=0,v=M.length/3-1;E<v;E+=3){const R=E+0,A=E+1,C=E+2;u.push(R,A,A,C,C,R)}}else return;const m=new(Fh(u)?Bh:kh)(u,1);m.version=_;const f=r.get(d);f&&t.remove(f),r.set(d,m)}function h(d){const u=r.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function T0(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,p){i.drawElements(n,p,r,u*o),e.update(p,n,1)}function c(u,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,u*o,g),e.update(p,n,g))}function h(u,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,u,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function d(u,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<u.length;f++)c(u[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,u,0,_,0,g);let f=0;for(let M=0;M<g;M++)f+=p[M]*_[M];e.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function A0(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function R0(i,t,e){const n=new WeakMap,s=new xe;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==d){let b=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",b)};var p=b;u!==void 0&&u.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let R=a.attributes.position.count*v,A=1;R>t.maxTextureSize&&(A=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const C=new Float32Array(R*A*4*d),I=new Oh(C,R,A,d);I.type=Rn,I.needsUpdate=!0;const S=v*4;for(let L=0;L<d;L++){const P=f[L],U=M[L],z=E[L],k=R*A*4*L;for(let V=0;V<P.count;V++){const q=V*S;g===!0&&(s.fromBufferAttribute(P,V),C[k+q+0]=s.x,C[k+q+1]=s.y,C[k+q+2]=s.z,C[k+q+3]=0),_===!0&&(s.fromBufferAttribute(U,V),C[k+q+4]=s.x,C[k+q+5]=s.y,C[k+q+6]=s.z,C[k+q+7]=0),m===!0&&(s.fromBufferAttribute(z,V),C[k+q+8]=s.x,C[k+q+9]=s.y,C[k+q+10]=s.z,C[k+q+11]=z.itemSize===4?s.w:1)}}u={count:d,texture:I,size:new Mt(R,A)},n.set(a,u),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function P0(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const $h=new Ge,Gc=new Wh(1,1),Jh=new Oh,Qh=new $u,td=new Gh,Wc=[],Xc=[],jc=new Float32Array(16),Yc=new Float32Array(9),qc=new Float32Array(4);function Ls(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Wc[s];if(r===void 0&&(r=new Float32Array(s),Wc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Re(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function mo(i,t){let e=Xc[t];e===void 0&&(e=new Int32Array(t),Xc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function C0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function L0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2fv(this.addr,t),Re(e,t)}}function D0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;i.uniform3fv(this.addr,t),Re(e,t)}}function I0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4fv(this.addr,t),Re(e,t)}}function U0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;qc.set(n),i.uniformMatrix2fv(this.addr,!1,qc),Re(e,n)}}function N0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;Yc.set(n),i.uniformMatrix3fv(this.addr,!1,Yc),Re(e,n)}}function F0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;jc.set(n),i.uniformMatrix4fv(this.addr,!1,jc),Re(e,n)}}function O0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function z0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2iv(this.addr,t),Re(e,t)}}function k0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3iv(this.addr,t),Re(e,t)}}function B0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4iv(this.addr,t),Re(e,t)}}function H0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function V0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2uiv(this.addr,t),Re(e,t)}}function G0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3uiv(this.addr,t),Re(e,t)}}function W0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4uiv(this.addr,t),Re(e,t)}}function X0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Gc.compareFunction=Nh,r=Gc):r=$h,e.setTexture2D(t||r,s)}function j0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Qh,s)}function Y0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||td,s)}function q0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Jh,s)}function K0(i){switch(i){case 5126:return C0;case 35664:return L0;case 35665:return D0;case 35666:return I0;case 35674:return U0;case 35675:return N0;case 35676:return F0;case 5124:case 35670:return O0;case 35667:case 35671:return z0;case 35668:case 35672:return k0;case 35669:case 35673:return B0;case 5125:return H0;case 36294:return V0;case 36295:return G0;case 36296:return W0;case 35678:case 36198:case 36298:case 36306:case 35682:return X0;case 35679:case 36299:case 36307:return j0;case 35680:case 36300:case 36308:case 36293:return Y0;case 36289:case 36303:case 36311:case 36292:return q0}}function Z0(i,t){i.uniform1fv(this.addr,t)}function $0(i,t){const e=Ls(t,this.size,2);i.uniform2fv(this.addr,e)}function J0(i,t){const e=Ls(t,this.size,3);i.uniform3fv(this.addr,e)}function Q0(i,t){const e=Ls(t,this.size,4);i.uniform4fv(this.addr,e)}function tg(i,t){const e=Ls(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function eg(i,t){const e=Ls(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function ng(i,t){const e=Ls(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function ig(i,t){i.uniform1iv(this.addr,t)}function sg(i,t){i.uniform2iv(this.addr,t)}function rg(i,t){i.uniform3iv(this.addr,t)}function og(i,t){i.uniform4iv(this.addr,t)}function ag(i,t){i.uniform1uiv(this.addr,t)}function lg(i,t){i.uniform2uiv(this.addr,t)}function cg(i,t){i.uniform3uiv(this.addr,t)}function hg(i,t){i.uniform4uiv(this.addr,t)}function dg(i,t,e){const n=this.cache,s=t.length,r=mo(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||$h,r[o])}function ug(i,t,e){const n=this.cache,s=t.length,r=mo(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Qh,r[o])}function fg(i,t,e){const n=this.cache,s=t.length,r=mo(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||td,r[o])}function pg(i,t,e){const n=this.cache,s=t.length,r=mo(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Jh,r[o])}function mg(i){switch(i){case 5126:return Z0;case 35664:return $0;case 35665:return J0;case 35666:return Q0;case 35674:return tg;case 35675:return eg;case 35676:return ng;case 5124:case 35670:return ig;case 35667:case 35671:return sg;case 35668:case 35672:return rg;case 35669:case 35673:return og;case 5125:return ag;case 36294:return lg;case 36295:return cg;case 36296:return hg;case 35678:case 36198:case 36298:case 36306:case 35682:return dg;case 35679:case 36299:case 36307:return ug;case 35680:case 36300:case 36308:case 36293:return fg;case 36289:case 36303:case 36311:case 36292:return pg}}class gg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=K0(e.type)}}class _g{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=mg(e.type)}}class xg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Jo=/(\w+)(\])?(\[|\.)?/g;function Kc(i,t){i.seq.push(t),i.map[t.id]=t}function vg(i,t,e){const n=i.name,s=n.length;for(Jo.lastIndex=0;;){const r=Jo.exec(n),o=Jo.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Kc(e,c===void 0?new gg(a,i,t):new _g(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new xg(a),Kc(e,d)),e=d}}}class eo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);vg(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Zc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Mg=37297;let yg=0;function Sg(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const $c=new Ht;function bg(i){Kt._getMatrix($c,Kt.workingColorSpace,i);const t=`mat3( ${$c.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(i)){case oo:return[t,"LinearTransferOETF"];case ne:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Jc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Sg(i.getShaderSource(t),a)}else return r}function wg(i,t){const e=bg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Eg(i,t){let e;switch(t){case hu:e="Linear";break;case du:e="Reinhard";break;case uu:e="Cineon";break;case fu:e="ACESFilmic";break;case mu:e="AgX";break;case gu:e="Neutral";break;case pu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Br=new T;function Tg(){Kt.getLuminanceCoefficients(Br);const i=Br.x.toFixed(4),t=Br.y.toFixed(4),e=Br.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ag(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zs).join(`
`)}function Rg(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Pg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Zs(i){return i!==""}function Qc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function th(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Cg=/^[ \t]*#include +<([\w\d./]+)>/gm;function nl(i){return i.replace(Cg,Dg)}const Lg=new Map;function Dg(i,t){let e=Gt[t];if(e===void 0){const n=Lg.get(t);if(n!==void 0)e=Gt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return nl(e)}const Ig=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function eh(i){return i.replace(Ig,Ug)}function Ug(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function nh(i){let t=`precision ${i.precision} float;
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
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Ng(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===pl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Gd?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Bn&&(t="SHADOWMAP_TYPE_VSM"),t}function Fg(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ys:case Ss:t="ENVMAP_TYPE_CUBE";break;case po:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Og(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ss:t="ENVMAP_MODE_REFRACTION";break}return t}function zg(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ml:t="ENVMAP_BLENDING_MULTIPLY";break;case lu:t="ENVMAP_BLENDING_MIX";break;case cu:t="ENVMAP_BLENDING_ADD";break}return t}function kg(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Bg(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Ng(e),c=Fg(e),h=Og(e),d=zg(e),u=kg(e),p=Ag(e),g=Rg(r),_=s.createProgram();let m,f,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Zs).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Zs).join(`
`),f.length>0&&(f+=`
`)):(m=[nh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zs).join(`
`),f=[nh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Wn?"#define TONE_MAPPING":"",e.toneMapping!==Wn?Gt.tonemapping_pars_fragment:"",e.toneMapping!==Wn?Eg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,wg("linearToOutputTexel",e.outputColorSpace),Tg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Zs).join(`
`)),o=nl(o),o=Qc(o,e),o=th(o,e),a=nl(a),a=Qc(a,e),a=th(a,e),o=eh(o),a=eh(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===cc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===cc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const E=M+m+o,v=M+f+a,R=Zc(s,s.VERTEX_SHADER,E),A=Zc(s,s.FRAGMENT_SHADER,v);s.attachShader(_,R),s.attachShader(_,A),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(L){if(i.debug.checkShaderErrors){const P=s.getProgramInfoLog(_)||"",U=s.getShaderInfoLog(R)||"",z=s.getShaderInfoLog(A)||"",k=P.trim(),V=U.trim(),q=z.trim();let W=!0,Q=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,R,A);else{const ot=Jc(s,R,"vertex"),pt=Jc(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+k+`
`+ot+`
`+pt)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(V===""||q==="")&&(Q=!1);Q&&(L.diagnostics={runnable:W,programLog:k,vertexShader:{log:V,prefix:m},fragmentShader:{log:q,prefix:f}})}s.deleteShader(R),s.deleteShader(A),I=new eo(s,_),S=Pg(s,_)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(_,Mg)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=yg++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=A,this}let Hg=0;class Vg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Gg(t),e.set(t,n)),n}}class Gg{constructor(t){this.id=Hg++,this.code=t,this.usedTimes=0}}function Wg(i,t,e,n,s,r,o){const a=new Al,l=new Vg,c=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,b,L,P,U){const z=P.fog,k=U.geometry,V=S.isMeshStandardMaterial?P.environment:null,q=(S.isMeshStandardMaterial?e:t).get(S.envMap||V),W=q&&q.mapping===po?q.image.height:null,Q=g[S.type];S.precision!==null&&(p=s.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const ot=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,pt=ot!==void 0?ot.length:0;let kt=0;k.morphAttributes.position!==void 0&&(kt=1),k.morphAttributes.normal!==void 0&&(kt=2),k.morphAttributes.color!==void 0&&(kt=3);let re,de,Jt,$;if(Q){const Qt=En[Q];re=Qt.vertexShader,de=Qt.fragmentShader}else re=S.vertexShader,de=S.fragmentShader,l.update(S),Jt=l.getVertexShaderID(S),$=l.getFragmentShaderID(S);const et=i.getRenderTarget(),_t=i.state.buffers.depth.getReversed(),Nt=U.isInstancedMesh===!0,At=U.isBatchedMesh===!0,Yt=!!S.map,Ne=!!S.matcap,F=!!q,ue=!!S.aoMap,zt=!!S.lightMap,Dt=!!S.bumpMap,yt=!!S.normalMap,fe=!!S.displacementMap,St=!!S.emissiveMap,Vt=!!S.metalnessMap,Pe=!!S.roughnessMap,ve=S.anisotropy>0,D=S.clearcoat>0,y=S.dispersion>0,G=S.iridescence>0,Z=S.sheen>0,tt=S.transmission>0,Y=ve&&!!S.anisotropyMap,Tt=D&&!!S.clearcoatMap,lt=D&&!!S.clearcoatNormalMap,bt=D&&!!S.clearcoatRoughnessMap,wt=G&&!!S.iridescenceMap,st=G&&!!S.iridescenceThicknessMap,ft=Z&&!!S.sheenColorMap,Lt=Z&&!!S.sheenRoughnessMap,Et=!!S.specularMap,dt=!!S.specularColorMap,Bt=!!S.specularIntensityMap,O=tt&&!!S.transmissionMap,rt=tt&&!!S.thicknessMap,ct=!!S.gradientMap,gt=!!S.alphaMap,nt=S.alphaTest>0,J=!!S.alphaHash,vt=!!S.extensions;let Ot=Wn;S.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Ot=i.toneMapping);const oe={shaderID:Q,shaderType:S.type,shaderName:S.name,vertexShader:re,fragmentShader:de,defines:S.defines,customVertexShaderID:Jt,customFragmentShaderID:$,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:At,batchingColor:At&&U._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&U.instanceColor!==null,instancingMorph:Nt&&U.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:et===null?i.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:bs,alphaToCoverage:!!S.alphaToCoverage,map:Yt,matcap:Ne,envMap:F,envMapMode:F&&q.mapping,envMapCubeUVHeight:W,aoMap:ue,lightMap:zt,bumpMap:Dt,normalMap:yt,displacementMap:u&&fe,emissiveMap:St,normalMapObjectSpace:yt&&S.normalMapType===Mu,normalMapTangentSpace:yt&&S.normalMapType===bl,metalnessMap:Vt,roughnessMap:Pe,anisotropy:ve,anisotropyMap:Y,clearcoat:D,clearcoatMap:Tt,clearcoatNormalMap:lt,clearcoatRoughnessMap:bt,dispersion:y,iridescence:G,iridescenceMap:wt,iridescenceThicknessMap:st,sheen:Z,sheenColorMap:ft,sheenRoughnessMap:Lt,specularMap:Et,specularColorMap:dt,specularIntensityMap:Bt,transmission:tt,transmissionMap:O,thicknessMap:rt,gradientMap:ct,opaque:S.transparent===!1&&S.blending===ms&&S.alphaToCoverage===!1,alphaMap:gt,alphaTest:nt,alphaHash:J,combine:S.combine,mapUv:Yt&&_(S.map.channel),aoMapUv:ue&&_(S.aoMap.channel),lightMapUv:zt&&_(S.lightMap.channel),bumpMapUv:Dt&&_(S.bumpMap.channel),normalMapUv:yt&&_(S.normalMap.channel),displacementMapUv:fe&&_(S.displacementMap.channel),emissiveMapUv:St&&_(S.emissiveMap.channel),metalnessMapUv:Vt&&_(S.metalnessMap.channel),roughnessMapUv:Pe&&_(S.roughnessMap.channel),anisotropyMapUv:Y&&_(S.anisotropyMap.channel),clearcoatMapUv:Tt&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:lt&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:bt&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:wt&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:st&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:ft&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Lt&&_(S.sheenRoughnessMap.channel),specularMapUv:Et&&_(S.specularMap.channel),specularColorMapUv:dt&&_(S.specularColorMap.channel),specularIntensityMapUv:Bt&&_(S.specularIntensityMap.channel),transmissionMapUv:O&&_(S.transmissionMap.channel),thicknessMapUv:rt&&_(S.thicknessMap.channel),alphaMapUv:gt&&_(S.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(yt||ve),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!k.attributes.uv&&(Yt||gt),fog:!!z,useFog:S.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:_t,skinning:U.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:pt,morphTextureStride:kt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ot,decodeVideoTexture:Yt&&S.map.isVideoTexture===!0&&Kt.getTransfer(S.map.colorSpace)===ne,decodeVideoTextureEmissive:St&&S.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(S.emissiveMap.colorSpace)===ne,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===ze,flipSided:S.side===$e,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:vt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(vt&&S.extensions.multiDraw===!0||At)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return oe.vertexUv1s=c.has(1),oe.vertexUv2s=c.has(2),oe.vertexUv3s=c.has(3),c.clear(),oe}function f(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const L in S.defines)b.push(L),b.push(S.defines[L]);return S.isRawShaderMaterial===!1&&(M(b,S),E(b,S),b.push(i.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function M(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function E(S,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){const b=g[S.type];let L;if(b){const P=En[b];L=df.clone(P.uniforms)}else L=S.uniforms;return L}function R(S,b){let L;for(let P=0,U=h.length;P<U;P++){const z=h[P];if(z.cacheKey===b){L=z,++L.usedTimes;break}}return L===void 0&&(L=new Bg(i,b,S,r),h.push(L)),L}function A(S){if(--S.usedTimes===0){const b=h.indexOf(S);h[b]=h[h.length-1],h.pop(),S.destroy()}}function C(S){l.remove(S)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:v,acquireProgram:R,releaseProgram:A,releaseShaderCache:C,programs:h,dispose:I}}function Xg(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function jg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function ih(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function sh(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d,u,p,g,_,m){let f=i[t];return f===void 0?(f={id:d.id,object:d,geometry:u,material:p,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},i[t]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=_,f.group=m),t++,f}function a(d,u,p,g,_,m){const f=o(d,u,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):e.push(f)}function l(d,u,p,g,_,m){const f=o(d,u,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):e.unshift(f)}function c(d,u){e.length>1&&e.sort(d||jg),n.length>1&&n.sort(u||ih),s.length>1&&s.sort(u||ih)}function h(){for(let d=t,u=i.length;d<u;d++){const p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Yg(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new sh,i.set(n,[o])):s>=r.length?(o=new sh,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function qg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new T,color:new Wt};break;case"SpotLight":e={position:new T,direction:new T,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new T,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new T,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new T,halfWidth:new T,halfHeight:new T};break}return i[t.id]=e,e}}}function Kg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Zg=0;function $g(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Jg(i){const t=new qg,e=Kg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new T);const s=new T,r=new he,o=new he;function a(c){let h=0,d=0,u=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,M=0,E=0,v=0,R=0,A=0,C=0;c.sort($g);for(let S=0,b=c.length;S<b;S++){const L=c[S],P=L.color,U=L.intensity,z=L.distance,k=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=P.r*U,d+=P.g*U,u+=P.b*U;else if(L.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(L.sh.coefficients[V],U);C++}else if(L.isDirectionalLight){const V=t.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const q=L.shadow,W=e.get(L);W.shadowIntensity=q.intensity,W.shadowBias=q.bias,W.shadowNormalBias=q.normalBias,W.shadowRadius=q.radius,W.shadowMapSize=q.mapSize,n.directionalShadow[p]=W,n.directionalShadowMap[p]=k,n.directionalShadowMatrix[p]=L.shadow.matrix,M++}n.directional[p]=V,p++}else if(L.isSpotLight){const V=t.get(L);V.position.setFromMatrixPosition(L.matrixWorld),V.color.copy(P).multiplyScalar(U),V.distance=z,V.coneCos=Math.cos(L.angle),V.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),V.decay=L.decay,n.spot[_]=V;const q=L.shadow;if(L.map&&(n.spotLightMap[R]=L.map,R++,q.updateMatrices(L),L.castShadow&&A++),n.spotLightMatrix[_]=q.matrix,L.castShadow){const W=e.get(L);W.shadowIntensity=q.intensity,W.shadowBias=q.bias,W.shadowNormalBias=q.normalBias,W.shadowRadius=q.radius,W.shadowMapSize=q.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=k,v++}_++}else if(L.isRectAreaLight){const V=t.get(L);V.color.copy(P).multiplyScalar(U),V.halfWidth.set(L.width*.5,0,0),V.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=V,m++}else if(L.isPointLight){const V=t.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),V.distance=L.distance,V.decay=L.decay,L.castShadow){const q=L.shadow,W=e.get(L);W.shadowIntensity=q.intensity,W.shadowBias=q.bias,W.shadowNormalBias=q.normalBias,W.shadowRadius=q.radius,W.shadowMapSize=q.mapSize,W.shadowCameraNear=q.camera.near,W.shadowCameraFar=q.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=k,n.pointShadowMatrix[g]=L.shadow.matrix,E++}n.point[g]=V,g++}else if(L.isHemisphereLight){const V=t.get(L);V.skyColor.copy(L.color).multiplyScalar(U),V.groundColor.copy(L.groundColor).multiplyScalar(U),n.hemi[f]=V,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ht.LTC_FLOAT_1,n.rectAreaLTC2=ht.LTC_FLOAT_2):(n.rectAreaLTC1=ht.LTC_HALF_1,n.rectAreaLTC2=ht.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const I=n.hash;(I.directionalLength!==p||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==m||I.hemiLength!==f||I.numDirectionalShadows!==M||I.numPointShadows!==E||I.numSpotShadows!==v||I.numSpotMaps!==R||I.numLightProbes!==C)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=v+R-A,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,I.directionalLength=p,I.pointLength=g,I.spotLength=_,I.rectAreaLength=m,I.hemiLength=f,I.numDirectionalShadows=M,I.numPointShadows=E,I.numSpotShadows=v,I.numSpotMaps=R,I.numLightProbes=C,n.version=Zg++)}function l(c,h){let d=0,u=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let f=0,M=c.length;f<M;f++){const E=c[f];if(E.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(E.isSpotLight){const v=n.spot[p];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(E.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(E.width*.5,0,0),v.halfHeight.set(0,E.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const v=n.point[u];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),u++}else if(E.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(E.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function rh(i){const t=new Jg(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Qg(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new rh(i),t.set(s,[a])):r>=o.length?(a=new rh(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const t_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,e_=`uniform sampler2D shadow_pass;
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
}`;function n_(i,t,e){let n=new Pl;const s=new Mt,r=new Mt,o=new xe,a=new bf({depthPacking:vu}),l=new wf,c={},h=e.maxTextureSize,d={[ci]:$e,[$e]:ci,[ze]:ze},u=new di({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Mt},radius:{value:4}},vertexShader:t_,fragmentShader:e_}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new De;g.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Zt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pl;let f=this.type;this.render=function(A,C,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const S=i.getRenderTarget(),b=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),P=i.state;P.setBlending(ai),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const U=f!==Bn&&this.type===Bn,z=f===Bn&&this.type!==Bn;for(let k=0,V=A.length;k<V;k++){const q=A[k],W=q.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const Q=W.getFrameExtents();if(s.multiply(Q),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,W.mapSize.y=r.y)),W.map===null||U===!0||z===!0){const pt=this.type!==Bn?{minFilter:on,magFilter:on}:{};W.map!==null&&W.map.dispose(),W.map=new Fi(s.x,s.y,pt),W.map.texture.name=q.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const ot=W.getViewportCount();for(let pt=0;pt<ot;pt++){const kt=W.getViewport(pt);o.set(r.x*kt.x,r.y*kt.y,r.x*kt.z,r.y*kt.w),P.viewport(o),W.updateMatrices(q,pt),n=W.getFrustum(),v(C,I,W.camera,q,this.type)}W.isPointLightShadow!==!0&&this.type===Bn&&M(W,I),W.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(S,b,L)};function M(A,C){const I=t.update(_);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Fi(s.x,s.y)),u.uniforms.shadow_pass.value=A.map.texture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(C,null,I,u,_,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(C,null,I,p,_,null)}function E(A,C,I,S){let b=null;const L=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)b=L;else if(b=I.isPointLight===!0?l:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const P=b.uuid,U=C.uuid;let z=c[P];z===void 0&&(z={},c[P]=z);let k=z[U];k===void 0&&(k=b.clone(),z[U]=k,C.addEventListener("dispose",R)),b=k}if(b.visible=C.visible,b.wireframe=C.wireframe,S===Bn?b.side=C.shadowSide!==null?C.shadowSide:C.side:b.side=C.shadowSide!==null?C.shadowSide:d[C.side],b.alphaMap=C.alphaMap,b.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,b.map=C.map,b.clipShadows=C.clipShadows,b.clippingPlanes=C.clippingPlanes,b.clipIntersection=C.clipIntersection,b.displacementMap=C.displacementMap,b.displacementScale=C.displacementScale,b.displacementBias=C.displacementBias,b.wireframeLinewidth=C.wireframeLinewidth,b.linewidth=C.linewidth,I.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const P=i.properties.get(b);P.light=I}return b}function v(A,C,I,S,b){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===Bn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);const U=t.update(A),z=A.material;if(Array.isArray(z)){const k=U.groups;for(let V=0,q=k.length;V<q;V++){const W=k[V],Q=z[W.materialIndex];if(Q&&Q.visible){const ot=E(A,Q,S,b);A.onBeforeShadow(i,A,C,I,U,ot,W),i.renderBufferDirect(I,null,U,ot,A,W),A.onAfterShadow(i,A,C,I,U,ot,W)}}}else if(z.visible){const k=E(A,z,S,b);A.onBeforeShadow(i,A,C,I,U,k,null),i.renderBufferDirect(I,null,U,k,A,null),A.onAfterShadow(i,A,C,I,U,k,null)}}const P=A.children;for(let U=0,z=P.length;U<z;U++)v(P[U],C,I,S,b)}function R(A){A.target.removeEventListener("dispose",R);for(const I in c){const S=c[I],b=A.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}const i_={[_a]:xa,[va]:Sa,[Ma]:ba,[Ms]:ya,[xa]:_a,[Sa]:va,[ba]:Ma,[ya]:Ms};function s_(i,t){function e(){let O=!1;const rt=new xe;let ct=null;const gt=new xe(0,0,0,0);return{setMask:function(nt){ct!==nt&&!O&&(i.colorMask(nt,nt,nt,nt),ct=nt)},setLocked:function(nt){O=nt},setClear:function(nt,J,vt,Ot,oe){oe===!0&&(nt*=Ot,J*=Ot,vt*=Ot),rt.set(nt,J,vt,Ot),gt.equals(rt)===!1&&(i.clearColor(nt,J,vt,Ot),gt.copy(rt))},reset:function(){O=!1,ct=null,gt.set(-1,0,0,0)}}}function n(){let O=!1,rt=!1,ct=null,gt=null,nt=null;return{setReversed:function(J){if(rt!==J){const vt=t.get("EXT_clip_control");J?vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.ZERO_TO_ONE_EXT):vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.NEGATIVE_ONE_TO_ONE_EXT),rt=J;const Ot=nt;nt=null,this.setClear(Ot)}},getReversed:function(){return rt},setTest:function(J){J?et(i.DEPTH_TEST):_t(i.DEPTH_TEST)},setMask:function(J){ct!==J&&!O&&(i.depthMask(J),ct=J)},setFunc:function(J){if(rt&&(J=i_[J]),gt!==J){switch(J){case _a:i.depthFunc(i.NEVER);break;case xa:i.depthFunc(i.ALWAYS);break;case va:i.depthFunc(i.LESS);break;case Ms:i.depthFunc(i.LEQUAL);break;case Ma:i.depthFunc(i.EQUAL);break;case ya:i.depthFunc(i.GEQUAL);break;case Sa:i.depthFunc(i.GREATER);break;case ba:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}gt=J}},setLocked:function(J){O=J},setClear:function(J){nt!==J&&(rt&&(J=1-J),i.clearDepth(J),nt=J)},reset:function(){O=!1,ct=null,gt=null,nt=null,rt=!1}}}function s(){let O=!1,rt=null,ct=null,gt=null,nt=null,J=null,vt=null,Ot=null,oe=null;return{setTest:function(Qt){O||(Qt?et(i.STENCIL_TEST):_t(i.STENCIL_TEST))},setMask:function(Qt){rt!==Qt&&!O&&(i.stencilMask(Qt),rt=Qt)},setFunc:function(Qt,In,bn){(ct!==Qt||gt!==In||nt!==bn)&&(i.stencilFunc(Qt,In,bn),ct=Qt,gt=In,nt=bn)},setOp:function(Qt,In,bn){(J!==Qt||vt!==In||Ot!==bn)&&(i.stencilOp(Qt,In,bn),J=Qt,vt=In,Ot=bn)},setLocked:function(Qt){O=Qt},setClear:function(Qt){oe!==Qt&&(i.clearStencil(Qt),oe=Qt)},reset:function(){O=!1,rt=null,ct=null,gt=null,nt=null,J=null,vt=null,Ot=null,oe=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,p=[],g=null,_=!1,m=null,f=null,M=null,E=null,v=null,R=null,A=null,C=new Wt(0,0,0),I=0,S=!1,b=null,L=null,P=null,U=null,z=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,q=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(W)[1]),V=q>=1):W.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),V=q>=2);let Q=null,ot={};const pt=i.getParameter(i.SCISSOR_BOX),kt=i.getParameter(i.VIEWPORT),re=new xe().fromArray(pt),de=new xe().fromArray(kt);function Jt(O,rt,ct,gt){const nt=new Uint8Array(4),J=i.createTexture();i.bindTexture(O,J),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let vt=0;vt<ct;vt++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(rt,0,i.RGBA,1,1,gt,0,i.RGBA,i.UNSIGNED_BYTE,nt):i.texImage2D(rt+vt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,nt);return J}const $={};$[i.TEXTURE_2D]=Jt(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=Jt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[i.TEXTURE_2D_ARRAY]=Jt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=Jt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),et(i.DEPTH_TEST),o.setFunc(Ms),Dt(!1),yt(ic),et(i.CULL_FACE),ue(ai);function et(O){h[O]!==!0&&(i.enable(O),h[O]=!0)}function _t(O){h[O]!==!1&&(i.disable(O),h[O]=!1)}function Nt(O,rt){return d[O]!==rt?(i.bindFramebuffer(O,rt),d[O]=rt,O===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=rt),O===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=rt),!0):!1}function At(O,rt){let ct=p,gt=!1;if(O){ct=u.get(rt),ct===void 0&&(ct=[],u.set(rt,ct));const nt=O.textures;if(ct.length!==nt.length||ct[0]!==i.COLOR_ATTACHMENT0){for(let J=0,vt=nt.length;J<vt;J++)ct[J]=i.COLOR_ATTACHMENT0+J;ct.length=nt.length,gt=!0}}else ct[0]!==i.BACK&&(ct[0]=i.BACK,gt=!0);gt&&i.drawBuffers(ct)}function Yt(O){return g!==O?(i.useProgram(O),g=O,!0):!1}const Ne={[Ei]:i.FUNC_ADD,[Xd]:i.FUNC_SUBTRACT,[jd]:i.FUNC_REVERSE_SUBTRACT};Ne[Yd]=i.MIN,Ne[qd]=i.MAX;const F={[Kd]:i.ZERO,[Zd]:i.ONE,[$d]:i.SRC_COLOR,[ma]:i.SRC_ALPHA,[iu]:i.SRC_ALPHA_SATURATE,[eu]:i.DST_COLOR,[Qd]:i.DST_ALPHA,[Jd]:i.ONE_MINUS_SRC_COLOR,[ga]:i.ONE_MINUS_SRC_ALPHA,[nu]:i.ONE_MINUS_DST_COLOR,[tu]:i.ONE_MINUS_DST_ALPHA,[su]:i.CONSTANT_COLOR,[ru]:i.ONE_MINUS_CONSTANT_COLOR,[ou]:i.CONSTANT_ALPHA,[au]:i.ONE_MINUS_CONSTANT_ALPHA};function ue(O,rt,ct,gt,nt,J,vt,Ot,oe,Qt){if(O===ai){_===!0&&(_t(i.BLEND),_=!1);return}if(_===!1&&(et(i.BLEND),_=!0),O!==Wd){if(O!==m||Qt!==S){if((f!==Ei||v!==Ei)&&(i.blendEquation(i.FUNC_ADD),f=Ei,v=Ei),Qt)switch(O){case ms:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case sc:i.blendFunc(i.ONE,i.ONE);break;case rc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case oc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case ms:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case sc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case rc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case oc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}M=null,E=null,R=null,A=null,C.set(0,0,0),I=0,m=O,S=Qt}return}nt=nt||rt,J=J||ct,vt=vt||gt,(rt!==f||nt!==v)&&(i.blendEquationSeparate(Ne[rt],Ne[nt]),f=rt,v=nt),(ct!==M||gt!==E||J!==R||vt!==A)&&(i.blendFuncSeparate(F[ct],F[gt],F[J],F[vt]),M=ct,E=gt,R=J,A=vt),(Ot.equals(C)===!1||oe!==I)&&(i.blendColor(Ot.r,Ot.g,Ot.b,oe),C.copy(Ot),I=oe),m=O,S=!1}function zt(O,rt){O.side===ze?_t(i.CULL_FACE):et(i.CULL_FACE);let ct=O.side===$e;rt&&(ct=!ct),Dt(ct),O.blending===ms&&O.transparent===!1?ue(ai):ue(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);const gt=O.stencilWrite;a.setTest(gt),gt&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),St(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?et(i.SAMPLE_ALPHA_TO_COVERAGE):_t(i.SAMPLE_ALPHA_TO_COVERAGE)}function Dt(O){b!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),b=O)}function yt(O){O!==Hd?(et(i.CULL_FACE),O!==L&&(O===ic?i.cullFace(i.BACK):O===Vd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):_t(i.CULL_FACE),L=O}function fe(O){O!==P&&(V&&i.lineWidth(O),P=O)}function St(O,rt,ct){O?(et(i.POLYGON_OFFSET_FILL),(U!==rt||z!==ct)&&(i.polygonOffset(rt,ct),U=rt,z=ct)):_t(i.POLYGON_OFFSET_FILL)}function Vt(O){O?et(i.SCISSOR_TEST):_t(i.SCISSOR_TEST)}function Pe(O){O===void 0&&(O=i.TEXTURE0+k-1),Q!==O&&(i.activeTexture(O),Q=O)}function ve(O,rt,ct){ct===void 0&&(Q===null?ct=i.TEXTURE0+k-1:ct=Q);let gt=ot[ct];gt===void 0&&(gt={type:void 0,texture:void 0},ot[ct]=gt),(gt.type!==O||gt.texture!==rt)&&(Q!==ct&&(i.activeTexture(ct),Q=ct),i.bindTexture(O,rt||$[O]),gt.type=O,gt.texture=rt)}function D(){const O=ot[Q];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function y(){try{i.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function G(){try{i.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Z(){try{i.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function tt(){try{i.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Tt(){try{i.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function lt(){try{i.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function bt(){try{i.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function wt(){try{i.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function st(){try{i.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ft(O){re.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),re.copy(O))}function Lt(O){de.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),de.copy(O))}function Et(O,rt){let ct=c.get(rt);ct===void 0&&(ct=new WeakMap,c.set(rt,ct));let gt=ct.get(O);gt===void 0&&(gt=i.getUniformBlockIndex(rt,O.name),ct.set(O,gt))}function dt(O,rt){const gt=c.get(rt).get(O);l.get(rt)!==gt&&(i.uniformBlockBinding(rt,gt,O.__bindingPointIndex),l.set(rt,gt))}function Bt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Q=null,ot={},d={},u=new WeakMap,p=[],g=null,_=!1,m=null,f=null,M=null,E=null,v=null,R=null,A=null,C=new Wt(0,0,0),I=0,S=!1,b=null,L=null,P=null,U=null,z=null,re.set(0,0,i.canvas.width,i.canvas.height),de.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:et,disable:_t,bindFramebuffer:Nt,drawBuffers:At,useProgram:Yt,setBlending:ue,setMaterial:zt,setFlipSided:Dt,setCullFace:yt,setLineWidth:fe,setPolygonOffset:St,setScissorTest:Vt,activeTexture:Pe,bindTexture:ve,unbindTexture:D,compressedTexImage2D:y,compressedTexImage3D:G,texImage2D:wt,texImage3D:st,updateUBOMapping:Et,uniformBlockBinding:dt,texStorage2D:lt,texStorage3D:bt,texSubImage2D:Z,texSubImage3D:tt,compressedTexSubImage2D:Y,compressedTexSubImage3D:Tt,scissor:ft,viewport:Lt,reset:Bt}}function r_(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Mt,h=new WeakMap;let d;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,y){return p?new OffscreenCanvas(D,y):lo("canvas")}function _(D,y,G){let Z=1;const tt=ve(D);if((tt.width>G||tt.height>G)&&(Z=G/Math.max(tt.width,tt.height)),Z<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const Y=Math.floor(Z*tt.width),Tt=Math.floor(Z*tt.height);d===void 0&&(d=g(Y,Tt));const lt=y?g(Y,Tt):d;return lt.width=Y,lt.height=Tt,lt.getContext("2d").drawImage(D,0,0,Y,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+Y+"x"+Tt+")."),lt}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),D;return D}function m(D){return D.generateMipmaps}function f(D){i.generateMipmap(D)}function M(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(D,y,G,Z,tt=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Y=y;if(y===i.RED&&(G===i.FLOAT&&(Y=i.R32F),G===i.HALF_FLOAT&&(Y=i.R16F),G===i.UNSIGNED_BYTE&&(Y=i.R8)),y===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(Y=i.R8UI),G===i.UNSIGNED_SHORT&&(Y=i.R16UI),G===i.UNSIGNED_INT&&(Y=i.R32UI),G===i.BYTE&&(Y=i.R8I),G===i.SHORT&&(Y=i.R16I),G===i.INT&&(Y=i.R32I)),y===i.RG&&(G===i.FLOAT&&(Y=i.RG32F),G===i.HALF_FLOAT&&(Y=i.RG16F),G===i.UNSIGNED_BYTE&&(Y=i.RG8)),y===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(Y=i.RG8UI),G===i.UNSIGNED_SHORT&&(Y=i.RG16UI),G===i.UNSIGNED_INT&&(Y=i.RG32UI),G===i.BYTE&&(Y=i.RG8I),G===i.SHORT&&(Y=i.RG16I),G===i.INT&&(Y=i.RG32I)),y===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),G===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),G===i.UNSIGNED_INT&&(Y=i.RGB32UI),G===i.BYTE&&(Y=i.RGB8I),G===i.SHORT&&(Y=i.RGB16I),G===i.INT&&(Y=i.RGB32I)),y===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),G===i.UNSIGNED_INT&&(Y=i.RGBA32UI),G===i.BYTE&&(Y=i.RGBA8I),G===i.SHORT&&(Y=i.RGBA16I),G===i.INT&&(Y=i.RGBA32I)),y===i.RGB&&(G===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),y===i.RGBA){const Tt=tt?oo:Kt.getTransfer(Z);G===i.FLOAT&&(Y=i.RGBA32F),G===i.HALF_FLOAT&&(Y=i.RGBA16F),G===i.UNSIGNED_BYTE&&(Y=Tt===ne?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function v(D,y){let G;return D?y===null||y===Ni||y===sr?G=i.DEPTH24_STENCIL8:y===Rn?G=i.DEPTH32F_STENCIL8:y===ir&&(G=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Ni||y===sr?G=i.DEPTH_COMPONENT24:y===Rn?G=i.DEPTH_COMPONENT32F:y===ir&&(G=i.DEPTH_COMPONENT16),G}function R(D,y){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==on&&D.minFilter!==An?Math.log2(Math.max(y.width,y.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?y.mipmaps.length:1}function A(D){const y=D.target;y.removeEventListener("dispose",A),I(y),y.isVideoTexture&&h.delete(y)}function C(D){const y=D.target;y.removeEventListener("dispose",C),b(y)}function I(D){const y=n.get(D);if(y.__webglInit===void 0)return;const G=D.source,Z=u.get(G);if(Z){const tt=Z[y.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&S(D),Object.keys(Z).length===0&&u.delete(G)}n.remove(D)}function S(D){const y=n.get(D);i.deleteTexture(y.__webglTexture);const G=D.source,Z=u.get(G);delete Z[y.__cacheKey],o.memory.textures--}function b(D){const y=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(y.__webglFramebuffer[Z]))for(let tt=0;tt<y.__webglFramebuffer[Z].length;tt++)i.deleteFramebuffer(y.__webglFramebuffer[Z][tt]);else i.deleteFramebuffer(y.__webglFramebuffer[Z]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[Z])}else{if(Array.isArray(y.__webglFramebuffer))for(let Z=0;Z<y.__webglFramebuffer.length;Z++)i.deleteFramebuffer(y.__webglFramebuffer[Z]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let Z=0;Z<y.__webglColorRenderbuffer.length;Z++)y.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[Z]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const G=D.textures;for(let Z=0,tt=G.length;Z<tt;Z++){const Y=n.get(G[Z]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),o.memory.textures--),n.remove(G[Z])}n.remove(D)}let L=0;function P(){L=0}function U(){const D=L;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),L+=1,D}function z(D){const y=[];return y.push(D.wrapS),y.push(D.wrapT),y.push(D.wrapR||0),y.push(D.magFilter),y.push(D.minFilter),y.push(D.anisotropy),y.push(D.internalFormat),y.push(D.format),y.push(D.type),y.push(D.generateMipmaps),y.push(D.premultiplyAlpha),y.push(D.flipY),y.push(D.unpackAlignment),y.push(D.colorSpace),y.join()}function k(D,y){const G=n.get(D);if(D.isVideoTexture&&Vt(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&G.__version!==D.version){const Z=D.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(G,D,y);return}}else D.isExternalTexture&&(G.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+y)}function V(D,y){const G=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&G.__version!==D.version){$(G,D,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+y)}function q(D,y){const G=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&G.__version!==D.version){$(G,D,y);return}e.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+y)}function W(D,y){const G=n.get(D);if(D.version>0&&G.__version!==D.version){et(G,D,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+y)}const Q={[ro]:i.REPEAT,[Pi]:i.CLAMP_TO_EDGE,[Ta]:i.MIRRORED_REPEAT},ot={[on]:i.NEAREST,[_u]:i.NEAREST_MIPMAP_NEAREST,[_r]:i.NEAREST_MIPMAP_LINEAR,[An]:i.LINEAR,[vo]:i.LINEAR_MIPMAP_NEAREST,[Ci]:i.LINEAR_MIPMAP_LINEAR},pt={[yu]:i.NEVER,[Au]:i.ALWAYS,[Su]:i.LESS,[Nh]:i.LEQUAL,[bu]:i.EQUAL,[Tu]:i.GEQUAL,[wu]:i.GREATER,[Eu]:i.NOTEQUAL};function kt(D,y){if(y.type===Rn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===An||y.magFilter===vo||y.magFilter===_r||y.magFilter===Ci||y.minFilter===An||y.minFilter===vo||y.minFilter===_r||y.minFilter===Ci)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,Q[y.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,Q[y.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,Q[y.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,ot[y.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,ot[y.minFilter]),y.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,pt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===on||y.minFilter!==_r&&y.minFilter!==Ci||y.type===Rn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");i.texParameterf(D,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function re(D,y){let G=!1;D.__webglInit===void 0&&(D.__webglInit=!0,y.addEventListener("dispose",A));const Z=y.source;let tt=u.get(Z);tt===void 0&&(tt={},u.set(Z,tt));const Y=z(y);if(Y!==D.__cacheKey){tt[Y]===void 0&&(tt[Y]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,G=!0),tt[Y].usedTimes++;const Tt=tt[D.__cacheKey];Tt!==void 0&&(tt[D.__cacheKey].usedTimes--,Tt.usedTimes===0&&S(y)),D.__cacheKey=Y,D.__webglTexture=tt[Y].texture}return G}function de(D,y,G){return Math.floor(Math.floor(D/G)/y)}function Jt(D,y,G,Z){const Y=D.updateRanges;if(Y.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,G,Z,y.data);else{Y.sort((st,ft)=>st.start-ft.start);let Tt=0;for(let st=1;st<Y.length;st++){const ft=Y[Tt],Lt=Y[st],Et=ft.start+ft.count,dt=de(Lt.start,y.width,4),Bt=de(ft.start,y.width,4);Lt.start<=Et+1&&dt===Bt&&de(Lt.start+Lt.count-1,y.width,4)===dt?ft.count=Math.max(ft.count,Lt.start+Lt.count-ft.start):(++Tt,Y[Tt]=Lt)}Y.length=Tt+1;const lt=i.getParameter(i.UNPACK_ROW_LENGTH),bt=i.getParameter(i.UNPACK_SKIP_PIXELS),wt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let st=0,ft=Y.length;st<ft;st++){const Lt=Y[st],Et=Math.floor(Lt.start/4),dt=Math.ceil(Lt.count/4),Bt=Et%y.width,O=Math.floor(Et/y.width),rt=dt,ct=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Bt),i.pixelStorei(i.UNPACK_SKIP_ROWS,O),e.texSubImage2D(i.TEXTURE_2D,0,Bt,O,rt,ct,G,Z,y.data)}D.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,lt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,bt),i.pixelStorei(i.UNPACK_SKIP_ROWS,wt)}}function $(D,y,G){let Z=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Z=i.TEXTURE_3D);const tt=re(D,y),Y=y.source;e.bindTexture(Z,D.__webglTexture,i.TEXTURE0+G);const Tt=n.get(Y);if(Y.version!==Tt.__version||tt===!0){e.activeTexture(i.TEXTURE0+G);const lt=Kt.getPrimaries(Kt.workingColorSpace),bt=y.colorSpace===ii?null:Kt.getPrimaries(y.colorSpace),wt=y.colorSpace===ii||lt===bt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);let st=_(y.image,!1,s.maxTextureSize);st=Pe(y,st);const ft=r.convert(y.format,y.colorSpace),Lt=r.convert(y.type);let Et=E(y.internalFormat,ft,Lt,y.colorSpace,y.isVideoTexture);kt(Z,y);let dt;const Bt=y.mipmaps,O=y.isVideoTexture!==!0,rt=Tt.__version===void 0||tt===!0,ct=Y.dataReady,gt=R(y,st);if(y.isDepthTexture)Et=v(y.format===or,y.type),rt&&(O?e.texStorage2D(i.TEXTURE_2D,1,Et,st.width,st.height):e.texImage2D(i.TEXTURE_2D,0,Et,st.width,st.height,0,ft,Lt,null));else if(y.isDataTexture)if(Bt.length>0){O&&rt&&e.texStorage2D(i.TEXTURE_2D,gt,Et,Bt[0].width,Bt[0].height);for(let nt=0,J=Bt.length;nt<J;nt++)dt=Bt[nt],O?ct&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,dt.width,dt.height,ft,Lt,dt.data):e.texImage2D(i.TEXTURE_2D,nt,Et,dt.width,dt.height,0,ft,Lt,dt.data);y.generateMipmaps=!1}else O?(rt&&e.texStorage2D(i.TEXTURE_2D,gt,Et,st.width,st.height),ct&&Jt(y,st,ft,Lt)):e.texImage2D(i.TEXTURE_2D,0,Et,st.width,st.height,0,ft,Lt,st.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){O&&rt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,gt,Et,Bt[0].width,Bt[0].height,st.depth);for(let nt=0,J=Bt.length;nt<J;nt++)if(dt=Bt[nt],y.format!==rn)if(ft!==null)if(O){if(ct)if(y.layerUpdates.size>0){const vt=Nc(dt.width,dt.height,y.format,y.type);for(const Ot of y.layerUpdates){const oe=dt.data.subarray(Ot*vt/dt.data.BYTES_PER_ELEMENT,(Ot+1)*vt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,Ot,dt.width,dt.height,1,ft,oe)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,0,dt.width,dt.height,st.depth,ft,dt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,nt,Et,dt.width,dt.height,st.depth,0,dt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?ct&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,0,dt.width,dt.height,st.depth,ft,Lt,dt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,nt,Et,dt.width,dt.height,st.depth,0,ft,Lt,dt.data)}else{O&&rt&&e.texStorage2D(i.TEXTURE_2D,gt,Et,Bt[0].width,Bt[0].height);for(let nt=0,J=Bt.length;nt<J;nt++)dt=Bt[nt],y.format!==rn?ft!==null?O?ct&&e.compressedTexSubImage2D(i.TEXTURE_2D,nt,0,0,dt.width,dt.height,ft,dt.data):e.compressedTexImage2D(i.TEXTURE_2D,nt,Et,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?ct&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,dt.width,dt.height,ft,Lt,dt.data):e.texImage2D(i.TEXTURE_2D,nt,Et,dt.width,dt.height,0,ft,Lt,dt.data)}else if(y.isDataArrayTexture)if(O){if(rt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,gt,Et,st.width,st.height,st.depth),ct)if(y.layerUpdates.size>0){const nt=Nc(st.width,st.height,y.format,y.type);for(const J of y.layerUpdates){const vt=st.data.subarray(J*nt/st.data.BYTES_PER_ELEMENT,(J+1)*nt/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,st.width,st.height,1,ft,Lt,vt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,ft,Lt,st.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Et,st.width,st.height,st.depth,0,ft,Lt,st.data);else if(y.isData3DTexture)O?(rt&&e.texStorage3D(i.TEXTURE_3D,gt,Et,st.width,st.height,st.depth),ct&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,ft,Lt,st.data)):e.texImage3D(i.TEXTURE_3D,0,Et,st.width,st.height,st.depth,0,ft,Lt,st.data);else if(y.isFramebufferTexture){if(rt)if(O)e.texStorage2D(i.TEXTURE_2D,gt,Et,st.width,st.height);else{let nt=st.width,J=st.height;for(let vt=0;vt<gt;vt++)e.texImage2D(i.TEXTURE_2D,vt,Et,nt,J,0,ft,Lt,null),nt>>=1,J>>=1}}else if(Bt.length>0){if(O&&rt){const nt=ve(Bt[0]);e.texStorage2D(i.TEXTURE_2D,gt,Et,nt.width,nt.height)}for(let nt=0,J=Bt.length;nt<J;nt++)dt=Bt[nt],O?ct&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,ft,Lt,dt):e.texImage2D(i.TEXTURE_2D,nt,Et,ft,Lt,dt);y.generateMipmaps=!1}else if(O){if(rt){const nt=ve(st);e.texStorage2D(i.TEXTURE_2D,gt,Et,nt.width,nt.height)}ct&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ft,Lt,st)}else e.texImage2D(i.TEXTURE_2D,0,Et,ft,Lt,st);m(y)&&f(Z),Tt.__version=Y.version,y.onUpdate&&y.onUpdate(y)}D.__version=y.version}function et(D,y,G){if(y.image.length!==6)return;const Z=re(D,y),tt=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+G);const Y=n.get(tt);if(tt.version!==Y.__version||Z===!0){e.activeTexture(i.TEXTURE0+G);const Tt=Kt.getPrimaries(Kt.workingColorSpace),lt=y.colorSpace===ii?null:Kt.getPrimaries(y.colorSpace),bt=y.colorSpace===ii||Tt===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);const wt=y.isCompressedTexture||y.image[0].isCompressedTexture,st=y.image[0]&&y.image[0].isDataTexture,ft=[];for(let J=0;J<6;J++)!wt&&!st?ft[J]=_(y.image[J],!0,s.maxCubemapSize):ft[J]=st?y.image[J].image:y.image[J],ft[J]=Pe(y,ft[J]);const Lt=ft[0],Et=r.convert(y.format,y.colorSpace),dt=r.convert(y.type),Bt=E(y.internalFormat,Et,dt,y.colorSpace),O=y.isVideoTexture!==!0,rt=Y.__version===void 0||Z===!0,ct=tt.dataReady;let gt=R(y,Lt);kt(i.TEXTURE_CUBE_MAP,y);let nt;if(wt){O&&rt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,Bt,Lt.width,Lt.height);for(let J=0;J<6;J++){nt=ft[J].mipmaps;for(let vt=0;vt<nt.length;vt++){const Ot=nt[vt];y.format!==rn?Et!==null?O?ct&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,vt,0,0,Ot.width,Ot.height,Et,Ot.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,vt,Bt,Ot.width,Ot.height,0,Ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,vt,0,0,Ot.width,Ot.height,Et,dt,Ot.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,vt,Bt,Ot.width,Ot.height,0,Et,dt,Ot.data)}}}else{if(nt=y.mipmaps,O&&rt){nt.length>0&&gt++;const J=ve(ft[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,Bt,J.width,J.height)}for(let J=0;J<6;J++)if(st){O?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ft[J].width,ft[J].height,Et,dt,ft[J].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Bt,ft[J].width,ft[J].height,0,Et,dt,ft[J].data);for(let vt=0;vt<nt.length;vt++){const oe=nt[vt].image[J].image;O?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,vt+1,0,0,oe.width,oe.height,Et,dt,oe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,vt+1,Bt,oe.width,oe.height,0,Et,dt,oe.data)}}else{O?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Et,dt,ft[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Bt,Et,dt,ft[J]);for(let vt=0;vt<nt.length;vt++){const Ot=nt[vt];O?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,vt+1,0,0,Et,dt,Ot.image[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,vt+1,Bt,Et,dt,Ot.image[J])}}}m(y)&&f(i.TEXTURE_CUBE_MAP),Y.__version=tt.version,y.onUpdate&&y.onUpdate(y)}D.__version=y.version}function _t(D,y,G,Z,tt,Y){const Tt=r.convert(G.format,G.colorSpace),lt=r.convert(G.type),bt=E(G.internalFormat,Tt,lt,G.colorSpace),wt=n.get(y),st=n.get(G);if(st.__renderTarget=y,!wt.__hasExternalTextures){const ft=Math.max(1,y.width>>Y),Lt=Math.max(1,y.height>>Y);tt===i.TEXTURE_3D||tt===i.TEXTURE_2D_ARRAY?e.texImage3D(tt,Y,bt,ft,Lt,y.depth,0,Tt,lt,null):e.texImage2D(tt,Y,bt,ft,Lt,0,Tt,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,D),St(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,tt,st.__webglTexture,0,fe(y)):(tt===i.TEXTURE_2D||tt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,tt,st.__webglTexture,Y),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Nt(D,y,G){if(i.bindRenderbuffer(i.RENDERBUFFER,D),y.depthBuffer){const Z=y.depthTexture,tt=Z&&Z.isDepthTexture?Z.type:null,Y=v(y.stencilBuffer,tt),Tt=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=fe(y);St(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt,Y,y.width,y.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,Y,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,Y,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Tt,i.RENDERBUFFER,D)}else{const Z=y.textures;for(let tt=0;tt<Z.length;tt++){const Y=Z[tt],Tt=r.convert(Y.format,Y.colorSpace),lt=r.convert(Y.type),bt=E(Y.internalFormat,Tt,lt,Y.colorSpace),wt=fe(y);G&&St(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,wt,bt,y.width,y.height):St(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,wt,bt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,bt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function At(D,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,D),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(y.depthTexture);Z.__renderTarget=y,(!Z.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),k(y.depthTexture,0);const tt=Z.__webglTexture,Y=fe(y);if(y.depthTexture.format===rr)St(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0);else if(y.depthTexture.format===or)St(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Yt(D){const y=n.get(D),G=D.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==D.depthTexture){const Z=D.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),Z){const tt=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,Z.removeEventListener("dispose",tt)};Z.addEventListener("dispose",tt),y.__depthDisposeCallback=tt}y.__boundDepthTexture=Z}if(D.depthTexture&&!y.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");const Z=D.texture.mipmaps;Z&&Z.length>0?At(y.__webglFramebuffer[0],D):At(y.__webglFramebuffer,D)}else if(G){y.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[Z]),y.__webglDepthbuffer[Z]===void 0)y.__webglDepthbuffer[Z]=i.createRenderbuffer(),Nt(y.__webglDepthbuffer[Z],D,!1);else{const tt=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=y.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,tt,i.RENDERBUFFER,Y)}}else{const Z=D.texture.mipmaps;if(Z&&Z.length>0?e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Nt(y.__webglDepthbuffer,D,!1);else{const tt=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,tt,i.RENDERBUFFER,Y)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ne(D,y,G){const Z=n.get(D);y!==void 0&&_t(Z.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&Yt(D)}function F(D){const y=D.texture,G=n.get(D),Z=n.get(y);D.addEventListener("dispose",C);const tt=D.textures,Y=D.isWebGLCubeRenderTarget===!0,Tt=tt.length>1;if(Tt||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=y.version,o.memory.textures++),Y){G.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(y.mipmaps&&y.mipmaps.length>0){G.__webglFramebuffer[lt]=[];for(let bt=0;bt<y.mipmaps.length;bt++)G.__webglFramebuffer[lt][bt]=i.createFramebuffer()}else G.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){G.__webglFramebuffer=[];for(let lt=0;lt<y.mipmaps.length;lt++)G.__webglFramebuffer[lt]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(Tt)for(let lt=0,bt=tt.length;lt<bt;lt++){const wt=n.get(tt[lt]);wt.__webglTexture===void 0&&(wt.__webglTexture=i.createTexture(),o.memory.textures++)}if(D.samples>0&&St(D)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let lt=0;lt<tt.length;lt++){const bt=tt[lt];G.__webglColorRenderbuffer[lt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[lt]);const wt=r.convert(bt.format,bt.colorSpace),st=r.convert(bt.type),ft=E(bt.internalFormat,wt,st,bt.colorSpace,D.isXRRenderTarget===!0),Lt=fe(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Lt,ft,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,G.__webglColorRenderbuffer[lt])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),Nt(G.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),kt(i.TEXTURE_CUBE_MAP,y);for(let lt=0;lt<6;lt++)if(y.mipmaps&&y.mipmaps.length>0)for(let bt=0;bt<y.mipmaps.length;bt++)_t(G.__webglFramebuffer[lt][bt],D,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,bt);else _t(G.__webglFramebuffer[lt],D,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);m(y)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let lt=0,bt=tt.length;lt<bt;lt++){const wt=tt[lt],st=n.get(wt);let ft=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ft=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ft,st.__webglTexture),kt(ft,wt),_t(G.__webglFramebuffer,D,wt,i.COLOR_ATTACHMENT0+lt,ft,0),m(wt)&&f(ft)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(lt=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,Z.__webglTexture),kt(lt,y),y.mipmaps&&y.mipmaps.length>0)for(let bt=0;bt<y.mipmaps.length;bt++)_t(G.__webglFramebuffer[bt],D,y,i.COLOR_ATTACHMENT0,lt,bt);else _t(G.__webglFramebuffer,D,y,i.COLOR_ATTACHMENT0,lt,0);m(y)&&f(lt),e.unbindTexture()}D.depthBuffer&&Yt(D)}function ue(D){const y=D.textures;for(let G=0,Z=y.length;G<Z;G++){const tt=y[G];if(m(tt)){const Y=M(D),Tt=n.get(tt).__webglTexture;e.bindTexture(Y,Tt),f(Y),e.unbindTexture()}}}const zt=[],Dt=[];function yt(D){if(D.samples>0){if(St(D)===!1){const y=D.textures,G=D.width,Z=D.height;let tt=i.COLOR_BUFFER_BIT;const Y=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Tt=n.get(D),lt=y.length>1;if(lt)for(let wt=0;wt<y.length;wt++)e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer);const bt=D.texture.mipmaps;bt&&bt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let wt=0;wt<y.length;wt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(tt|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(tt|=i.STENCIL_BUFFER_BIT)),lt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[wt]);const st=n.get(y[wt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,st,0)}i.blitFramebuffer(0,0,G,Z,0,0,G,Z,tt,i.NEAREST),l===!0&&(zt.length=0,Dt.length=0,zt.push(i.COLOR_ATTACHMENT0+wt),D.depthBuffer&&D.resolveDepthBuffer===!1&&(zt.push(Y),Dt.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Dt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,zt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),lt)for(let wt=0;wt<y.length;wt++){e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[wt]);const st=n.get(y[wt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,st,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const y=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function fe(D){return Math.min(s.maxSamples,D.samples)}function St(D){const y=n.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Vt(D){const y=o.render.frame;h.get(D)!==y&&(h.set(D,y),D.update())}function Pe(D,y){const G=D.colorSpace,Z=D.format,tt=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||G!==bs&&G!==ii&&(Kt.getTransfer(G)===ne?(Z!==rn||tt!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),y}function ve(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=P,this.setTexture2D=k,this.setTexture2DArray=V,this.setTexture3D=q,this.setTextureCube=W,this.rebindTextures=Ne,this.setupRenderTarget=F,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=yt,this.setupDepthRenderbuffer=Yt,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=St}function o_(i,t){function e(n,s=ii){let r;const o=Kt.getTransfer(s);if(n===Cn)return i.UNSIGNED_BYTE;if(n===_l)return i.UNSIGNED_SHORT_4_4_4_4;if(n===xl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ch)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Lh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Rh)return i.BYTE;if(n===Ph)return i.SHORT;if(n===ir)return i.UNSIGNED_SHORT;if(n===gl)return i.INT;if(n===Ni)return i.UNSIGNED_INT;if(n===Rn)return i.FLOAT;if(n===ur)return i.HALF_FLOAT;if(n===Dh)return i.ALPHA;if(n===Ih)return i.RGB;if(n===rn)return i.RGBA;if(n===rr)return i.DEPTH_COMPONENT;if(n===or)return i.DEPTH_STENCIL;if(n===vl)return i.RED;if(n===Ml)return i.RED_INTEGER;if(n===Uh)return i.RG;if(n===yl)return i.RG_INTEGER;if(n===Sl)return i.RGBA_INTEGER;if(n===$r||n===Jr||n===Qr||n===to)if(o===ne)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===$r)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===to)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===$r)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Qr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===to)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Aa||n===Ra||n===Pa||n===Ca)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Aa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ra)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Pa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ca)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===La||n===Da||n===Ia)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===La||n===Da)return o===ne?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ia)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ua||n===Na||n===Fa||n===Oa||n===za||n===ka||n===Ba||n===Ha||n===Va||n===Ga||n===Wa||n===Xa||n===ja||n===Ya)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ua)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Na)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Fa)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Oa)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===za)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ka)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ba)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ha)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Va)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ga)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Wa)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Xa)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ja)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ya)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===qa||n===Ka||n===Za)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===qa)return o===ne?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ka)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Za)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===$a||n===Ja||n===Qa||n===tl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===$a)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ja)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Qa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===tl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===sr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const a_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,l_=`
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

}`;class c_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Xh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new di({vertexShader:a_,fragmentShader:l_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Zt(new fr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class h_ extends Bi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,g=null;const _=typeof XRWebGLBinding<"u",m=new c_,f={},M=e.getContextAttributes();let E=null,v=null;const R=[],A=[],C=new Mt;let I=null;const S=new Ve;S.viewport=new xe;const b=new Ve;b.viewport=new xe;const L=[S,b],P=new Rf;let U=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let et=R[$];return et===void 0&&(et=new Bo,R[$]=et),et.getTargetRaySpace()},this.getControllerGrip=function($){let et=R[$];return et===void 0&&(et=new Bo,R[$]=et),et.getGripSpace()},this.getHand=function($){let et=R[$];return et===void 0&&(et=new Bo,R[$]=et),et.getHandSpace()};function k($){const et=A.indexOf($.inputSource);if(et===-1)return;const _t=R[et];_t!==void 0&&(_t.update($.inputSource,$.frame,c||o),_t.dispatchEvent({type:$.type,data:$.inputSource}))}function V(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",q);for(let $=0;$<R.length;$++){const et=A[$];et!==null&&(A[$]=null,R[$].disconnect(et))}U=null,z=null,m.reset();for(const $ in f)delete f[$];t.setRenderTarget(E),p=null,u=null,d=null,s=null,v=null,Jt.stop(),n.isPresenting=!1,t.setPixelRatio(I),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",V),s.addEventListener("inputsourceschange",q),M.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let _t=null,Nt=null,At=null;M.depth&&(At=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,_t=M.stencil?or:rr,Nt=M.stencil?sr:Ni);const Yt={colorFormat:e.RGBA8,depthFormat:At,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Yt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),v=new Fi(u.textureWidth,u.textureHeight,{format:rn,type:Cn,depthTexture:new Wh(u.textureWidth,u.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const _t={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,_t),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new Fi(p.framebufferWidth,p.framebufferHeight,{format:rn,type:Cn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Jt.setContext(s),Jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function q($){for(let et=0;et<$.removed.length;et++){const _t=$.removed[et],Nt=A.indexOf(_t);Nt>=0&&(A[Nt]=null,R[Nt].disconnect(_t))}for(let et=0;et<$.added.length;et++){const _t=$.added[et];let Nt=A.indexOf(_t);if(Nt===-1){for(let Yt=0;Yt<R.length;Yt++)if(Yt>=A.length){A.push(_t),Nt=Yt;break}else if(A[Yt]===null){A[Yt]=_t,Nt=Yt;break}if(Nt===-1)break}const At=R[Nt];At&&At.connect(_t)}}const W=new T,Q=new T;function ot($,et,_t){W.setFromMatrixPosition(et.matrixWorld),Q.setFromMatrixPosition(_t.matrixWorld);const Nt=W.distanceTo(Q),At=et.projectionMatrix.elements,Yt=_t.projectionMatrix.elements,Ne=At[14]/(At[10]-1),F=At[14]/(At[10]+1),ue=(At[9]+1)/At[5],zt=(At[9]-1)/At[5],Dt=(At[8]-1)/At[0],yt=(Yt[8]+1)/Yt[0],fe=Ne*Dt,St=Ne*yt,Vt=Nt/(-Dt+yt),Pe=Vt*-Dt;if(et.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Pe),$.translateZ(Vt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),At[10]===-1)$.projectionMatrix.copy(et.projectionMatrix),$.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const ve=Ne+Vt,D=F+Vt,y=fe-Pe,G=St+(Nt-Pe),Z=ue*F/D*ve,tt=zt*F/D*ve;$.projectionMatrix.makePerspective(y,G,Z,tt,ve,D),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function pt($,et){et===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(et.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let et=$.near,_t=$.far;m.texture!==null&&(m.depthNear>0&&(et=m.depthNear),m.depthFar>0&&(_t=m.depthFar)),P.near=b.near=S.near=et,P.far=b.far=S.far=_t,(U!==P.near||z!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),U=P.near,z=P.far),P.layers.mask=$.layers.mask|6,S.layers.mask=P.layers.mask&3,b.layers.mask=P.layers.mask&5;const Nt=$.parent,At=P.cameras;pt(P,Nt);for(let Yt=0;Yt<At.length;Yt++)pt(At[Yt],Nt);At.length===2?ot(P,S,b):P.projectionMatrix.copy(S.projectionMatrix),kt($,P,Nt)};function kt($,et,_t){_t===null?$.matrix.copy(et.matrixWorld):($.matrix.copy(_t.matrixWorld),$.matrix.invert(),$.matrix.multiply(et.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(et.projectionMatrix),$.projectionMatrixInverse.copy(et.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=ar*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function($){l=$,u!==null&&(u.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(P)},this.getCameraTexture=function($){return f[$]};let re=null;function de($,et){if(h=et.getViewerPose(c||o),g=et,h!==null){const _t=h.views;p!==null&&(t.setRenderTargetFramebuffer(v,p.framebuffer),t.setRenderTarget(v));let Nt=!1;_t.length!==P.cameras.length&&(P.cameras.length=0,Nt=!0);for(let F=0;F<_t.length;F++){const ue=_t[F];let zt=null;if(p!==null)zt=p.getViewport(ue);else{const yt=d.getViewSubImage(u,ue);zt=yt.viewport,F===0&&(t.setRenderTargetTextures(v,yt.colorTexture,yt.depthStencilTexture),t.setRenderTarget(v))}let Dt=L[F];Dt===void 0&&(Dt=new Ve,Dt.layers.enable(F),Dt.viewport=new xe,L[F]=Dt),Dt.matrix.fromArray(ue.transform.matrix),Dt.matrix.decompose(Dt.position,Dt.quaternion,Dt.scale),Dt.projectionMatrix.fromArray(ue.projectionMatrix),Dt.projectionMatrixInverse.copy(Dt.projectionMatrix).invert(),Dt.viewport.set(zt.x,zt.y,zt.width,zt.height),F===0&&(P.matrix.copy(Dt.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Nt===!0&&P.cameras.push(Dt)}const At=s.enabledFeatures;if(At&&At.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=n.getBinding();const F=d.getDepthInformation(_t[0]);F&&F.isValid&&F.texture&&m.init(F,s.renderState)}if(At&&At.includes("camera-access")&&_){t.state.unbindTexture(),d=n.getBinding();for(let F=0;F<_t.length;F++){const ue=_t[F].camera;if(ue){let zt=f[ue];zt||(zt=new Xh,f[ue]=zt);const Dt=d.getCameraImage(ue);zt.sourceTexture=Dt}}}}for(let _t=0;_t<R.length;_t++){const Nt=A[_t],At=R[_t];Nt!==null&&At!==void 0&&At.update(Nt,et,c||o)}re&&re($,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}const Jt=new Zh;Jt.setAnimationLoop(de),this.setAnimationLoop=function($){re=$},this.dispose=function(){}}}const Mi=new Sn,d_=new he;function u_(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Hh(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,E,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,v)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,M,E):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===$e&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===$e&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const M=t.get(f),E=M.envMap,v=M.envMapRotation;E&&(m.envMap.value=E,Mi.copy(v),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),m.envMapRotation.value.setFromMatrix4(d_.makeRotationFromEuler(Mi)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,M,E){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=E*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===$e&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const M=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function f_(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,E){const v=E.program;n.uniformBlockBinding(M,v)}function c(M,E){let v=s[M.id];v===void 0&&(g(M),v=h(M),s[M.id]=v,M.addEventListener("dispose",m));const R=E.program;n.updateUBOMapping(M,R);const A=t.render.frame;r[M.id]!==A&&(u(M),r[M.id]=A)}function h(M){const E=d();M.__bindingPointIndex=E;const v=i.createBuffer(),R=M.__size,A=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,R,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,v),v}function d(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const E=s[M.id],v=M.uniforms,R=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let A=0,C=v.length;A<C;A++){const I=Array.isArray(v[A])?v[A]:[v[A]];for(let S=0,b=I.length;S<b;S++){const L=I[S];if(p(L,A,S,R)===!0){const P=L.__offset,U=Array.isArray(L.value)?L.value:[L.value];let z=0;for(let k=0;k<U.length;k++){const V=U[k],q=_(V);typeof V=="number"||typeof V=="boolean"?(L.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,P+z,L.__data)):V.isMatrix3?(L.__data[0]=V.elements[0],L.__data[1]=V.elements[1],L.__data[2]=V.elements[2],L.__data[3]=0,L.__data[4]=V.elements[3],L.__data[5]=V.elements[4],L.__data[6]=V.elements[5],L.__data[7]=0,L.__data[8]=V.elements[6],L.__data[9]=V.elements[7],L.__data[10]=V.elements[8],L.__data[11]=0):(V.toArray(L.__data,z),z+=q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,P,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(M,E,v,R){const A=M.value,C=E+"_"+v;if(R[C]===void 0)return typeof A=="number"||typeof A=="boolean"?R[C]=A:R[C]=A.clone(),!0;{const I=R[C];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return R[C]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function g(M){const E=M.uniforms;let v=0;const R=16;for(let C=0,I=E.length;C<I;C++){const S=Array.isArray(E[C])?E[C]:[E[C]];for(let b=0,L=S.length;b<L;b++){const P=S[b],U=Array.isArray(P.value)?P.value:[P.value];for(let z=0,k=U.length;z<k;z++){const V=U[z],q=_(V),W=v%R,Q=W%q.boundary,ot=W+Q;v+=Q,ot!==0&&R-ot<q.storage&&(v+=R-ot),P.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=v,v+=q.storage}}}const A=v%R;return A>0&&(v+=R-A),M.__size=v,M.__cache={},this}function _(M){const E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),E}function m(M){const E=M.target;E.removeEventListener("dispose",m);const v=o.indexOf(E.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function f(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:l,update:c,dispose:f}}class p_{constructor(t={}){const{canvas:e=Wu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const M=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let R=!1;this._outputColorSpace=nn;let A=0,C=0,I=null,S=-1,b=null;const L=new xe,P=new xe;let U=null;const z=new Wt(0);let k=0,V=e.width,q=e.height,W=1,Q=null,ot=null;const pt=new xe(0,0,V,q),kt=new xe(0,0,V,q);let re=!1;const de=new Pl;let Jt=!1,$=!1;const et=new he,_t=new T,Nt=new xe,At={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Yt=!1;function Ne(){return I===null?W:1}let F=n;function ue(w,B){return e.getContext(w,B)}try{const w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${fl}`),e.addEventListener("webglcontextlost",ct,!1),e.addEventListener("webglcontextrestored",gt,!1),e.addEventListener("webglcontextcreationerror",nt,!1),F===null){const B="webgl2";if(F=ue(B,w),F===null)throw ue(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let zt,Dt,yt,fe,St,Vt,Pe,ve,D,y,G,Z,tt,Y,Tt,lt,bt,wt,st,ft,Lt,Et,dt,Bt;function O(){zt=new w0(F),zt.init(),Et=new o_(F,zt),Dt=new _0(F,zt,t,Et),yt=new s_(F,zt),Dt.reversedDepthBuffer&&u&&yt.buffers.depth.setReversed(!0),fe=new A0(F),St=new Xg,Vt=new r_(F,zt,yt,St,Dt,Et,fe),Pe=new v0(v),ve=new b0(v),D=new If(F),dt=new m0(F,D),y=new E0(F,D,fe,dt),G=new P0(F,y,D,fe),st=new R0(F,Dt,Vt),lt=new x0(St),Z=new Wg(v,Pe,ve,zt,Dt,dt,lt),tt=new u_(v,St),Y=new Yg,Tt=new Qg(zt),wt=new p0(v,Pe,ve,yt,G,p,l),bt=new n_(v,G,Dt),Bt=new f_(F,fe,Dt,yt),ft=new g0(F,zt,fe),Lt=new T0(F,zt,fe),fe.programs=Z.programs,v.capabilities=Dt,v.extensions=zt,v.properties=St,v.renderLists=Y,v.shadowMap=bt,v.state=yt,v.info=fe}O();const rt=new h_(v,F);this.xr=rt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const w=zt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=zt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(w){w!==void 0&&(W=w,this.setSize(V,q,!1))},this.getSize=function(w){return w.set(V,q)},this.setSize=function(w,B,X=!0){if(rt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=w,q=B,e.width=Math.floor(w*W),e.height=Math.floor(B*W),X===!0&&(e.style.width=w+"px",e.style.height=B+"px"),this.setViewport(0,0,w,B)},this.getDrawingBufferSize=function(w){return w.set(V*W,q*W).floor()},this.setDrawingBufferSize=function(w,B,X){V=w,q=B,W=X,e.width=Math.floor(w*X),e.height=Math.floor(B*X),this.setViewport(0,0,w,B)},this.getCurrentViewport=function(w){return w.copy(L)},this.getViewport=function(w){return w.copy(pt)},this.setViewport=function(w,B,X,j){w.isVector4?pt.set(w.x,w.y,w.z,w.w):pt.set(w,B,X,j),yt.viewport(L.copy(pt).multiplyScalar(W).round())},this.getScissor=function(w){return w.copy(kt)},this.setScissor=function(w,B,X,j){w.isVector4?kt.set(w.x,w.y,w.z,w.w):kt.set(w,B,X,j),yt.scissor(P.copy(kt).multiplyScalar(W).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(w){yt.setScissorTest(re=w)},this.setOpaqueSort=function(w){Q=w},this.setTransparentSort=function(w){ot=w},this.getClearColor=function(w){return w.copy(wt.getClearColor())},this.setClearColor=function(){wt.setClearColor(...arguments)},this.getClearAlpha=function(){return wt.getClearAlpha()},this.setClearAlpha=function(){wt.setClearAlpha(...arguments)},this.clear=function(w=!0,B=!0,X=!0){let j=0;if(w){let H=!1;if(I!==null){const it=I.texture.format;H=it===Sl||it===yl||it===Ml}if(H){const it=I.texture.type,ut=it===Cn||it===Ni||it===ir||it===sr||it===_l||it===xl,xt=wt.getClearColor(),mt=wt.getClearAlpha(),Ct=xt.r,It=xt.g,Rt=xt.b;ut?(g[0]=Ct,g[1]=It,g[2]=Rt,g[3]=mt,F.clearBufferuiv(F.COLOR,0,g)):(_[0]=Ct,_[1]=It,_[2]=Rt,_[3]=mt,F.clearBufferiv(F.COLOR,0,_))}else j|=F.COLOR_BUFFER_BIT}B&&(j|=F.DEPTH_BUFFER_BIT),X&&(j|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ct,!1),e.removeEventListener("webglcontextrestored",gt,!1),e.removeEventListener("webglcontextcreationerror",nt,!1),wt.dispose(),Y.dispose(),Tt.dispose(),St.dispose(),Pe.dispose(),ve.dispose(),G.dispose(),dt.dispose(),Bt.dispose(),Z.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",bn),rt.removeEventListener("sessionend",$l),fi.stop()};function ct(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function gt(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const w=fe.autoReset,B=bt.enabled,X=bt.autoUpdate,j=bt.needsUpdate,H=bt.type;O(),fe.autoReset=w,bt.enabled=B,bt.autoUpdate=X,bt.needsUpdate=j,bt.type=H}function nt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function J(w){const B=w.target;B.removeEventListener("dispose",J),vt(B)}function vt(w){Ot(w),St.remove(w)}function Ot(w){const B=St.get(w).programs;B!==void 0&&(B.forEach(function(X){Z.releaseProgram(X)}),w.isShaderMaterial&&Z.releaseShaderCache(w))}this.renderBufferDirect=function(w,B,X,j,H,it){B===null&&(B=At);const ut=H.isMesh&&H.matrixWorld.determinant()<0,xt=Id(w,B,X,j,H);yt.setMaterial(j,ut);let mt=X.index,Ct=1;if(j.wireframe===!0){if(mt=y.getWireframeAttribute(X),mt===void 0)return;Ct=2}const It=X.drawRange,Rt=X.attributes.position;let jt=It.start*Ct,ee=(It.start+It.count)*Ct;it!==null&&(jt=Math.max(jt,it.start*Ct),ee=Math.min(ee,(it.start+it.count)*Ct)),mt!==null?(jt=Math.max(jt,0),ee=Math.min(ee,mt.count)):Rt!=null&&(jt=Math.max(jt,0),ee=Math.min(ee,Rt.count));const _e=ee-jt;if(_e<0||_e===1/0)return;dt.setup(H,j,xt,X,mt);let le,se=ft;if(mt!==null&&(le=D.get(mt),se=Lt,se.setIndex(le)),H.isMesh)j.wireframe===!0?(yt.setLineWidth(j.wireframeLinewidth*Ne()),se.setMode(F.LINES)):se.setMode(F.TRIANGLES);else if(H.isLine){let Pt=j.linewidth;Pt===void 0&&(Pt=1),yt.setLineWidth(Pt*Ne()),H.isLineSegments?se.setMode(F.LINES):H.isLineLoop?se.setMode(F.LINE_LOOP):se.setMode(F.LINE_STRIP)}else H.isPoints?se.setMode(F.POINTS):H.isSprite&&se.setMode(F.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)lr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),se.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(zt.get("WEBGL_multi_draw"))se.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Pt=H._multiDrawStarts,me=H._multiDrawCounts,qt=H._multiDrawCount,Je=mt?D.get(mt).bytesPerElement:1,Gi=St.get(j).currentProgram.getUniforms();for(let Qe=0;Qe<qt;Qe++)Gi.setValue(F,"_gl_DrawID",Qe),se.render(Pt[Qe]/Je,me[Qe])}else if(H.isInstancedMesh)se.renderInstances(jt,_e,H.count);else if(X.isInstancedBufferGeometry){const Pt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,me=Math.min(X.instanceCount,Pt);se.renderInstances(jt,_e,me)}else se.render(jt,_e)};function oe(w,B,X){w.transparent===!0&&w.side===ze&&w.forceSinglePass===!1?(w.side=$e,w.needsUpdate=!0,gr(w,B,X),w.side=ci,w.needsUpdate=!0,gr(w,B,X),w.side=ze):gr(w,B,X)}this.compile=function(w,B,X=null){X===null&&(X=w),f=Tt.get(X),f.init(B),E.push(f),X.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),w!==X&&w.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),f.setupLights();const j=new Set;return w.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const it=H.material;if(it)if(Array.isArray(it))for(let ut=0;ut<it.length;ut++){const xt=it[ut];oe(xt,X,H),j.add(xt)}else oe(it,X,H),j.add(it)}),f=E.pop(),j},this.compileAsync=function(w,B,X=null){const j=this.compile(w,B,X);return new Promise(H=>{function it(){if(j.forEach(function(ut){St.get(ut).currentProgram.isReady()&&j.delete(ut)}),j.size===0){H(w);return}setTimeout(it,10)}zt.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let Qt=null;function In(w){Qt&&Qt(w)}function bn(){fi.stop()}function $l(){fi.start()}const fi=new Zh;fi.setAnimationLoop(In),typeof self<"u"&&fi.setContext(self),this.setAnimationLoop=function(w){Qt=w,rt.setAnimationLoop(w),w===null?fi.stop():fi.start()},rt.addEventListener("sessionstart",bn),rt.addEventListener("sessionend",$l),this.render=function(w,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(B),B=rt.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,B,I),f=Tt.get(w,E.length),f.init(B),E.push(f),et.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),de.setFromProjectionMatrix(et,Pn,B.reversedDepth),$=this.localClippingEnabled,Jt=lt.init(this.clippingPlanes,$),m=Y.get(w,M.length),m.init(),M.push(m),rt.enabled===!0&&rt.isPresenting===!0){const it=v.xr.getDepthSensingMesh();it!==null&&_o(it,B,-1/0,v.sortObjects)}_o(w,B,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(Q,ot),Yt=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,Yt&&wt.addToRenderList(m,w),this.info.render.frame++,Jt===!0&&lt.beginShadows();const X=f.state.shadowsArray;bt.render(X,w,B),Jt===!0&&lt.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=m.opaque,H=m.transmissive;if(f.setupLights(),B.isArrayCamera){const it=B.cameras;if(H.length>0)for(let ut=0,xt=it.length;ut<xt;ut++){const mt=it[ut];Ql(j,H,w,mt)}Yt&&wt.render(w);for(let ut=0,xt=it.length;ut<xt;ut++){const mt=it[ut];Jl(m,w,mt,mt.viewport)}}else H.length>0&&Ql(j,H,w,B),Yt&&wt.render(w),Jl(m,w,B);I!==null&&C===0&&(Vt.updateMultisampleRenderTarget(I),Vt.updateRenderTargetMipmap(I)),w.isScene===!0&&w.onAfterRender(v,w,B),dt.resetDefaultState(),S=-1,b=null,E.pop(),E.length>0?(f=E[E.length-1],Jt===!0&&lt.setGlobalState(v.clippingPlanes,f.state.camera)):f=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function _o(w,B,X,j){if(w.visible===!1)return;if(w.layers.test(B.layers)){if(w.isGroup)X=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(B);else if(w.isLight)f.pushLight(w),w.castShadow&&f.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||de.intersectsSprite(w)){j&&Nt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(et);const ut=G.update(w),xt=w.material;xt.visible&&m.push(w,ut,xt,X,Nt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||de.intersectsObject(w))){const ut=G.update(w),xt=w.material;if(j&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Nt.copy(w.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),Nt.copy(ut.boundingSphere.center)),Nt.applyMatrix4(w.matrixWorld).applyMatrix4(et)),Array.isArray(xt)){const mt=ut.groups;for(let Ct=0,It=mt.length;Ct<It;Ct++){const Rt=mt[Ct],jt=xt[Rt.materialIndex];jt&&jt.visible&&m.push(w,ut,jt,X,Nt.z,Rt)}}else xt.visible&&m.push(w,ut,xt,X,Nt.z,null)}}const it=w.children;for(let ut=0,xt=it.length;ut<xt;ut++)_o(it[ut],B,X,j)}function Jl(w,B,X,j){const H=w.opaque,it=w.transmissive,ut=w.transparent;f.setupLightsView(X),Jt===!0&&lt.setGlobalState(v.clippingPlanes,X),j&&yt.viewport(L.copy(j)),H.length>0&&mr(H,B,X),it.length>0&&mr(it,B,X),ut.length>0&&mr(ut,B,X),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function Ql(w,B,X,j){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[j.id]===void 0&&(f.state.transmissionRenderTarget[j.id]=new Fi(1,1,{generateMipmaps:!0,type:zt.has("EXT_color_buffer_half_float")||zt.has("EXT_color_buffer_float")?ur:Cn,minFilter:Ci,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace}));const it=f.state.transmissionRenderTarget[j.id],ut=j.viewport||L;it.setSize(ut.z*v.transmissionResolutionScale,ut.w*v.transmissionResolutionScale);const xt=v.getRenderTarget(),mt=v.getActiveCubeFace(),Ct=v.getActiveMipmapLevel();v.setRenderTarget(it),v.getClearColor(z),k=v.getClearAlpha(),k<1&&v.setClearColor(16777215,.5),v.clear(),Yt&&wt.render(X);const It=v.toneMapping;v.toneMapping=Wn;const Rt=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),f.setupLightsView(j),Jt===!0&&lt.setGlobalState(v.clippingPlanes,j),mr(w,X,j),Vt.updateMultisampleRenderTarget(it),Vt.updateRenderTargetMipmap(it),zt.has("WEBGL_multisampled_render_to_texture")===!1){let jt=!1;for(let ee=0,_e=B.length;ee<_e;ee++){const le=B[ee],se=le.object,Pt=le.geometry,me=le.material,qt=le.group;if(me.side===ze&&se.layers.test(j.layers)){const Je=me.side;me.side=$e,me.needsUpdate=!0,tc(se,X,j,Pt,me,qt),me.side=Je,me.needsUpdate=!0,jt=!0}}jt===!0&&(Vt.updateMultisampleRenderTarget(it),Vt.updateRenderTargetMipmap(it))}v.setRenderTarget(xt,mt,Ct),v.setClearColor(z,k),Rt!==void 0&&(j.viewport=Rt),v.toneMapping=It}function mr(w,B,X){const j=B.isScene===!0?B.overrideMaterial:null;for(let H=0,it=w.length;H<it;H++){const ut=w[H],xt=ut.object,mt=ut.geometry,Ct=ut.group;let It=ut.material;It.allowOverride===!0&&j!==null&&(It=j),xt.layers.test(X.layers)&&tc(xt,B,X,mt,It,Ct)}}function tc(w,B,X,j,H,it){w.onBeforeRender(v,B,X,j,H,it),w.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),H.onBeforeRender(v,B,X,j,w,it),H.transparent===!0&&H.side===ze&&H.forceSinglePass===!1?(H.side=$e,H.needsUpdate=!0,v.renderBufferDirect(X,B,j,H,w,it),H.side=ci,H.needsUpdate=!0,v.renderBufferDirect(X,B,j,H,w,it),H.side=ze):v.renderBufferDirect(X,B,j,H,w,it),w.onAfterRender(v,B,X,j,H,it)}function gr(w,B,X){B.isScene!==!0&&(B=At);const j=St.get(w),H=f.state.lights,it=f.state.shadowsArray,ut=H.state.version,xt=Z.getParameters(w,H.state,it,B,X),mt=Z.getProgramCacheKey(xt);let Ct=j.programs;j.environment=w.isMeshStandardMaterial?B.environment:null,j.fog=B.fog,j.envMap=(w.isMeshStandardMaterial?ve:Pe).get(w.envMap||j.environment),j.envMapRotation=j.environment!==null&&w.envMap===null?B.environmentRotation:w.envMapRotation,Ct===void 0&&(w.addEventListener("dispose",J),Ct=new Map,j.programs=Ct);let It=Ct.get(mt);if(It!==void 0){if(j.currentProgram===It&&j.lightsStateVersion===ut)return nc(w,xt),It}else xt.uniforms=Z.getUniforms(w),w.onBeforeCompile(xt,v),It=Z.acquireProgram(xt,mt),Ct.set(mt,It),j.uniforms=xt.uniforms;const Rt=j.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Rt.clippingPlanes=lt.uniform),nc(w,xt),j.needsLights=Nd(w),j.lightsStateVersion=ut,j.needsLights&&(Rt.ambientLightColor.value=H.state.ambient,Rt.lightProbe.value=H.state.probe,Rt.directionalLights.value=H.state.directional,Rt.directionalLightShadows.value=H.state.directionalShadow,Rt.spotLights.value=H.state.spot,Rt.spotLightShadows.value=H.state.spotShadow,Rt.rectAreaLights.value=H.state.rectArea,Rt.ltc_1.value=H.state.rectAreaLTC1,Rt.ltc_2.value=H.state.rectAreaLTC2,Rt.pointLights.value=H.state.point,Rt.pointLightShadows.value=H.state.pointShadow,Rt.hemisphereLights.value=H.state.hemi,Rt.directionalShadowMap.value=H.state.directionalShadowMap,Rt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Rt.spotShadowMap.value=H.state.spotShadowMap,Rt.spotLightMatrix.value=H.state.spotLightMatrix,Rt.spotLightMap.value=H.state.spotLightMap,Rt.pointShadowMap.value=H.state.pointShadowMap,Rt.pointShadowMatrix.value=H.state.pointShadowMatrix),j.currentProgram=It,j.uniformsList=null,It}function ec(w){if(w.uniformsList===null){const B=w.currentProgram.getUniforms();w.uniformsList=eo.seqWithValue(B.seq,w.uniforms)}return w.uniformsList}function nc(w,B){const X=St.get(w);X.outputColorSpace=B.outputColorSpace,X.batching=B.batching,X.batchingColor=B.batchingColor,X.instancing=B.instancing,X.instancingColor=B.instancingColor,X.instancingMorph=B.instancingMorph,X.skinning=B.skinning,X.morphTargets=B.morphTargets,X.morphNormals=B.morphNormals,X.morphColors=B.morphColors,X.morphTargetsCount=B.morphTargetsCount,X.numClippingPlanes=B.numClippingPlanes,X.numIntersection=B.numClipIntersection,X.vertexAlphas=B.vertexAlphas,X.vertexTangents=B.vertexTangents,X.toneMapping=B.toneMapping}function Id(w,B,X,j,H){B.isScene!==!0&&(B=At),Vt.resetTextureUnits();const it=B.fog,ut=j.isMeshStandardMaterial?B.environment:null,xt=I===null?v.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:bs,mt=(j.isMeshStandardMaterial?ve:Pe).get(j.envMap||ut),Ct=j.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,It=!!X.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Rt=!!X.morphAttributes.position,jt=!!X.morphAttributes.normal,ee=!!X.morphAttributes.color;let _e=Wn;j.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(_e=v.toneMapping);const le=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,se=le!==void 0?le.length:0,Pt=St.get(j),me=f.state.lights;if(Jt===!0&&($===!0||w!==b)){const ke=w===b&&j.id===S;lt.setState(j,w,ke)}let qt=!1;j.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==me.state.version||Pt.outputColorSpace!==xt||H.isBatchedMesh&&Pt.batching===!1||!H.isBatchedMesh&&Pt.batching===!0||H.isBatchedMesh&&Pt.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Pt.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Pt.instancing===!1||!H.isInstancedMesh&&Pt.instancing===!0||H.isSkinnedMesh&&Pt.skinning===!1||!H.isSkinnedMesh&&Pt.skinning===!0||H.isInstancedMesh&&Pt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Pt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Pt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Pt.instancingMorph===!1&&H.morphTexture!==null||Pt.envMap!==mt||j.fog===!0&&Pt.fog!==it||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==lt.numPlanes||Pt.numIntersection!==lt.numIntersection)||Pt.vertexAlphas!==Ct||Pt.vertexTangents!==It||Pt.morphTargets!==Rt||Pt.morphNormals!==jt||Pt.morphColors!==ee||Pt.toneMapping!==_e||Pt.morphTargetsCount!==se)&&(qt=!0):(qt=!0,Pt.__version=j.version);let Je=Pt.currentProgram;qt===!0&&(Je=gr(j,B,H));let Gi=!1,Qe=!1,Us=!1;const ge=Je.getUniforms(),an=Pt.uniforms;if(yt.useProgram(Je.program)&&(Gi=!0,Qe=!0,Us=!0),j.id!==S&&(S=j.id,Qe=!0),Gi||b!==w){yt.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),ge.setValue(F,"projectionMatrix",w.projectionMatrix),ge.setValue(F,"viewMatrix",w.matrixWorldInverse);const We=ge.map.cameraPosition;We!==void 0&&We.setValue(F,_t.setFromMatrixPosition(w.matrixWorld)),Dt.logarithmicDepthBuffer&&ge.setValue(F,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&ge.setValue(F,"isOrthographic",w.isOrthographicCamera===!0),b!==w&&(b=w,Qe=!0,Us=!0)}if(H.isSkinnedMesh){ge.setOptional(F,H,"bindMatrix"),ge.setOptional(F,H,"bindMatrixInverse");const ke=H.skeleton;ke&&(ke.boneTexture===null&&ke.computeBoneTexture(),ge.setValue(F,"boneTexture",ke.boneTexture,Vt))}H.isBatchedMesh&&(ge.setOptional(F,H,"batchingTexture"),ge.setValue(F,"batchingTexture",H._matricesTexture,Vt),ge.setOptional(F,H,"batchingIdTexture"),ge.setValue(F,"batchingIdTexture",H._indirectTexture,Vt),ge.setOptional(F,H,"batchingColorTexture"),H._colorsTexture!==null&&ge.setValue(F,"batchingColorTexture",H._colorsTexture,Vt));const ln=X.morphAttributes;if((ln.position!==void 0||ln.normal!==void 0||ln.color!==void 0)&&st.update(H,X,Je),(Qe||Pt.receiveShadow!==H.receiveShadow)&&(Pt.receiveShadow=H.receiveShadow,ge.setValue(F,"receiveShadow",H.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(an.envMap.value=mt,an.flipEnvMap.value=mt.isCubeTexture&&mt.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&B.environment!==null&&(an.envMapIntensity.value=B.environmentIntensity),Qe&&(ge.setValue(F,"toneMappingExposure",v.toneMappingExposure),Pt.needsLights&&Ud(an,Us),it&&j.fog===!0&&tt.refreshFogUniforms(an,it),tt.refreshMaterialUniforms(an,j,W,q,f.state.transmissionRenderTarget[w.id]),eo.upload(F,ec(Pt),an,Vt)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(eo.upload(F,ec(Pt),an,Vt),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&ge.setValue(F,"center",H.center),ge.setValue(F,"modelViewMatrix",H.modelViewMatrix),ge.setValue(F,"normalMatrix",H.normalMatrix),ge.setValue(F,"modelMatrix",H.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const ke=j.uniformsGroups;for(let We=0,xo=ke.length;We<xo;We++){const pi=ke[We];Bt.update(pi,Je),Bt.bind(pi,Je)}}return Je}function Ud(w,B){w.ambientLightColor.needsUpdate=B,w.lightProbe.needsUpdate=B,w.directionalLights.needsUpdate=B,w.directionalLightShadows.needsUpdate=B,w.pointLights.needsUpdate=B,w.pointLightShadows.needsUpdate=B,w.spotLights.needsUpdate=B,w.spotLightShadows.needsUpdate=B,w.rectAreaLights.needsUpdate=B,w.hemisphereLights.needsUpdate=B}function Nd(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(w,B,X){const j=St.get(w);j.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),St.get(w.texture).__webglTexture=B,St.get(w.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:X,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,B){const X=St.get(w);X.__webglFramebuffer=B,X.__useDefaultFramebuffer=B===void 0};const Fd=F.createFramebuffer();this.setRenderTarget=function(w,B=0,X=0){I=w,A=B,C=X;let j=!0,H=null,it=!1,ut=!1;if(w){const mt=St.get(w);if(mt.__useDefaultFramebuffer!==void 0)yt.bindFramebuffer(F.FRAMEBUFFER,null),j=!1;else if(mt.__webglFramebuffer===void 0)Vt.setupRenderTarget(w);else if(mt.__hasExternalTextures)Vt.rebindTextures(w,St.get(w.texture).__webglTexture,St.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Rt=w.depthTexture;if(mt.__boundDepthTexture!==Rt){if(Rt!==null&&St.has(Rt)&&(w.width!==Rt.image.width||w.height!==Rt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Vt.setupDepthRenderbuffer(w)}}const Ct=w.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ut=!0);const It=St.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(It[B])?H=It[B][X]:H=It[B],it=!0):w.samples>0&&Vt.useMultisampledRTT(w)===!1?H=St.get(w).__webglMultisampledFramebuffer:Array.isArray(It)?H=It[X]:H=It,L.copy(w.viewport),P.copy(w.scissor),U=w.scissorTest}else L.copy(pt).multiplyScalar(W).floor(),P.copy(kt).multiplyScalar(W).floor(),U=re;if(X!==0&&(H=Fd),yt.bindFramebuffer(F.FRAMEBUFFER,H)&&j&&yt.drawBuffers(w,H),yt.viewport(L),yt.scissor(P),yt.setScissorTest(U),it){const mt=St.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+B,mt.__webglTexture,X)}else if(ut){const mt=B;for(let Ct=0;Ct<w.textures.length;Ct++){const It=St.get(w.textures[Ct]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Ct,It.__webglTexture,X,mt)}}else if(w!==null&&X!==0){const mt=St.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,mt.__webglTexture,X)}S=-1},this.readRenderTargetPixels=function(w,B,X,j,H,it,ut,xt=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let mt=St.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ut!==void 0&&(mt=mt[ut]),mt){yt.bindFramebuffer(F.FRAMEBUFFER,mt);try{const Ct=w.textures[xt],It=Ct.format,Rt=Ct.type;if(!Dt.textureFormatReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Dt.textureTypeReadable(Rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=w.width-j&&X>=0&&X<=w.height-H&&(w.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+xt),F.readPixels(B,X,j,H,Et.convert(It),Et.convert(Rt),it))}finally{const Ct=I!==null?St.get(I).__webglFramebuffer:null;yt.bindFramebuffer(F.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(w,B,X,j,H,it,ut,xt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let mt=St.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ut!==void 0&&(mt=mt[ut]),mt)if(B>=0&&B<=w.width-j&&X>=0&&X<=w.height-H){yt.bindFramebuffer(F.FRAMEBUFFER,mt);const Ct=w.textures[xt],It=Ct.format,Rt=Ct.type;if(!Dt.textureFormatReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Dt.textureTypeReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const jt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,jt),F.bufferData(F.PIXEL_PACK_BUFFER,it.byteLength,F.STREAM_READ),w.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+xt),F.readPixels(B,X,j,H,Et.convert(It),Et.convert(Rt),0);const ee=I!==null?St.get(I).__webglFramebuffer:null;yt.bindFramebuffer(F.FRAMEBUFFER,ee);const _e=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Xu(F,_e,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,jt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,it),F.deleteBuffer(jt),F.deleteSync(_e),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,B=null,X=0){const j=Math.pow(2,-X),H=Math.floor(w.image.width*j),it=Math.floor(w.image.height*j),ut=B!==null?B.x:0,xt=B!==null?B.y:0;Vt.setTexture2D(w,0),F.copyTexSubImage2D(F.TEXTURE_2D,X,0,0,ut,xt,H,it),yt.unbindTexture()};const Od=F.createFramebuffer(),zd=F.createFramebuffer();this.copyTextureToTexture=function(w,B,X=null,j=null,H=0,it=null){it===null&&(H!==0?(lr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),it=H,H=0):it=0);let ut,xt,mt,Ct,It,Rt,jt,ee,_e;const le=w.isCompressedTexture?w.mipmaps[it]:w.image;if(X!==null)ut=X.max.x-X.min.x,xt=X.max.y-X.min.y,mt=X.isBox3?X.max.z-X.min.z:1,Ct=X.min.x,It=X.min.y,Rt=X.isBox3?X.min.z:0;else{const ln=Math.pow(2,-H);ut=Math.floor(le.width*ln),xt=Math.floor(le.height*ln),w.isDataArrayTexture?mt=le.depth:w.isData3DTexture?mt=Math.floor(le.depth*ln):mt=1,Ct=0,It=0,Rt=0}j!==null?(jt=j.x,ee=j.y,_e=j.z):(jt=0,ee=0,_e=0);const se=Et.convert(B.format),Pt=Et.convert(B.type);let me;B.isData3DTexture?(Vt.setTexture3D(B,0),me=F.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Vt.setTexture2DArray(B,0),me=F.TEXTURE_2D_ARRAY):(Vt.setTexture2D(B,0),me=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,B.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,B.unpackAlignment);const qt=F.getParameter(F.UNPACK_ROW_LENGTH),Je=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Gi=F.getParameter(F.UNPACK_SKIP_PIXELS),Qe=F.getParameter(F.UNPACK_SKIP_ROWS),Us=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,le.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,le.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Ct),F.pixelStorei(F.UNPACK_SKIP_ROWS,It),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Rt);const ge=w.isDataArrayTexture||w.isData3DTexture,an=B.isDataArrayTexture||B.isData3DTexture;if(w.isDepthTexture){const ln=St.get(w),ke=St.get(B),We=St.get(ln.__renderTarget),xo=St.get(ke.__renderTarget);yt.bindFramebuffer(F.READ_FRAMEBUFFER,We.__webglFramebuffer),yt.bindFramebuffer(F.DRAW_FRAMEBUFFER,xo.__webglFramebuffer);for(let pi=0;pi<mt;pi++)ge&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,St.get(w).__webglTexture,H,Rt+pi),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,St.get(B).__webglTexture,it,_e+pi)),F.blitFramebuffer(Ct,It,ut,xt,jt,ee,ut,xt,F.DEPTH_BUFFER_BIT,F.NEAREST);yt.bindFramebuffer(F.READ_FRAMEBUFFER,null),yt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(H!==0||w.isRenderTargetTexture||St.has(w)){const ln=St.get(w),ke=St.get(B);yt.bindFramebuffer(F.READ_FRAMEBUFFER,Od),yt.bindFramebuffer(F.DRAW_FRAMEBUFFER,zd);for(let We=0;We<mt;We++)ge?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ln.__webglTexture,H,Rt+We):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ln.__webglTexture,H),an?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ke.__webglTexture,it,_e+We):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ke.__webglTexture,it),H!==0?F.blitFramebuffer(Ct,It,ut,xt,jt,ee,ut,xt,F.COLOR_BUFFER_BIT,F.NEAREST):an?F.copyTexSubImage3D(me,it,jt,ee,_e+We,Ct,It,ut,xt):F.copyTexSubImage2D(me,it,jt,ee,Ct,It,ut,xt);yt.bindFramebuffer(F.READ_FRAMEBUFFER,null),yt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else an?w.isDataTexture||w.isData3DTexture?F.texSubImage3D(me,it,jt,ee,_e,ut,xt,mt,se,Pt,le.data):B.isCompressedArrayTexture?F.compressedTexSubImage3D(me,it,jt,ee,_e,ut,xt,mt,se,le.data):F.texSubImage3D(me,it,jt,ee,_e,ut,xt,mt,se,Pt,le):w.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,it,jt,ee,ut,xt,se,Pt,le.data):w.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,it,jt,ee,le.width,le.height,se,le.data):F.texSubImage2D(F.TEXTURE_2D,it,jt,ee,ut,xt,se,Pt,le);F.pixelStorei(F.UNPACK_ROW_LENGTH,qt),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Je),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Gi),F.pixelStorei(F.UNPACK_SKIP_ROWS,Qe),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Us),it===0&&B.generateMipmaps&&F.generateMipmap(me),yt.unbindTexture()},this.initRenderTarget=function(w){St.get(w).__webglFramebuffer===void 0&&Vt.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Vt.setTextureCube(w,0):w.isData3DTexture?Vt.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Vt.setTexture2DArray(w,0):Vt.setTexture2D(w,0),yt.unbindTexture()},this.resetState=function(){A=0,C=0,I=null,yt.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}}const oh={type:"change"},Nl={type:"start"},ed={type:"end"},Hr=new Tl,ah=new Gn,m_=Math.cos(70*at.DEG2RAD),Ee=new T,Xe=2*Math.PI,ie={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Qo=1e-6;class g_ extends Lf{constructor(t,e=null){super(t,e),this.state=ie.NONE,this.target=new T,this.cursor=new T,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ps.ROTATE,MIDDLE:ps.DOLLY,RIGHT:ps.PAN},this.touches={ONE:us.ROTATE,TWO:us.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new T,this._lastQuaternion=new hi,this._lastTargetPosition=new T,this._quat=new hi().setFromUnitVectors(t.up,new T(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ic,this._sphericalDelta=new Ic,this._scale=1,this._panOffset=new T,this._rotateStart=new Mt,this._rotateEnd=new Mt,this._rotateDelta=new Mt,this._panStart=new Mt,this._panEnd=new Mt,this._panDelta=new Mt,this._dollyStart=new Mt,this._dollyEnd=new Mt,this._dollyDelta=new Mt,this._dollyDirection=new T,this._mouse=new Mt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=x_.bind(this),this._onPointerDown=__.bind(this),this._onPointerUp=v_.bind(this),this._onContextMenu=T_.bind(this),this._onMouseWheel=S_.bind(this),this._onKeyDown=b_.bind(this),this._onTouchStart=w_.bind(this),this._onTouchMove=E_.bind(this),this._onMouseDown=M_.bind(this),this._onMouseMove=y_.bind(this),this._interceptControlDown=A_.bind(this),this._interceptControlUp=R_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(oh),this.update(),this.state=ie.NONE}update(t=null){const e=this.object.position;Ee.copy(e).sub(this.target),Ee.applyQuaternion(this._quat),this._spherical.setFromVector3(Ee),this.autoRotate&&this.state===ie.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Xe:n>Math.PI&&(n-=Xe),s<-Math.PI?s+=Xe:s>Math.PI&&(s-=Xe),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ee.setFromSpherical(this._spherical),Ee.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ee),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ee.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new T(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new T(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ee.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Hr.origin.copy(this.object.position),Hr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Hr.direction))<m_?this.object.lookAt(this.target):(ah.setFromNormalAndCoplanarPoint(this.object.up,this.target),Hr.intersectPlane(ah,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Qo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Qo||this._lastTargetPosition.distanceToSquared(this.target)>Qo?(this.dispatchEvent(oh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Xe/60*this.autoRotateSpeed*t:Xe/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ee.setFromMatrixColumn(e,0),Ee.multiplyScalar(-t),this._panOffset.add(Ee)}_panUp(t,e){this.screenSpacePanning===!0?Ee.setFromMatrixColumn(e,1):(Ee.setFromMatrixColumn(e,0),Ee.crossVectors(this.object.up,Ee)),Ee.multiplyScalar(t),this._panOffset.add(Ee)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ee.copy(s).sub(this.target);let r=Ee.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Xe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Xe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Xe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Xe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Xe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Xe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Xe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Xe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Mt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function __(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function x_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function v_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ed),this.state=ie.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function M_(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ps.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ie.DOLLY;break;case ps.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ie.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ie.ROTATE}break;case ps.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ie.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ie.PAN}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(Nl)}function y_(i){switch(this.state){case ie.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ie.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ie.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function S_(i){this.enabled===!1||this.enableZoom===!1||this.state!==ie.NONE||(i.preventDefault(),this.dispatchEvent(Nl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(ed))}function b_(i){this.enabled!==!1&&this._handleKeyDown(i)}function w_(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case us.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ie.TOUCH_ROTATE;break;case us.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ie.TOUCH_PAN;break;default:this.state=ie.NONE}break;case 2:switch(this.touches.TWO){case us.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ie.TOUCH_DOLLY_PAN;break;case us.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ie.TOUCH_DOLLY_ROTATE;break;default:this.state=ie.NONE}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(Nl)}function E_(i){switch(this._trackPointer(i),this.state){case ie.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ie.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ie.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ie.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ie.NONE}}function T_(i){this.enabled!==!1&&i.preventDefault()}function A_(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function R_(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const P_=[{name:"standard",antialias:!0,powerPreference:"default"},{name:"compatible",antialias:!1,powerPreference:"default"},{name:"low-power",antialias:!1,powerPreference:"low-power"}];function C_(i,t=e=>new p_(e)){const e=[];for(const n of P_){const s=n.name==="standard"?i:i.cloneNode(!1);try{const r=t({canvas:s,antialias:n.antialias,powerPreference:n.powerPreference,alpha:!0,depth:!0,stencil:!1,failIfMajorPerformanceCaveat:!1});return s!==i&&i.replaceWith(s),s.dataset.graphics=n.name,{renderer:r,canvas:s,compatible:n.name!=="standard"}}catch(r){e.push(r)}}throw new AggregateError(e,"The browser could not start WebGL 2 graphics with standard or compatibility settings.")}function L_(i,t){const e=i.cloneNode(!1),n=e.getContext("2d",{alpha:!0});if(!n)throw new Error("The browser could not start a 2D graphics context.");i.replaceWith(e),e.dataset.graphics="canvas";let s=1,r=1,o=1,a=t,l=()=>[];const c={canvas:e,info:{render:{calls:0,triangles:0}},setFaces(h){a=h},setActors(h){l=h},setPixelRatio(h){s=Math.min(1.25,h)},setSize(h,d){r=h,o=d,e.width=Math.round(h*s),e.height=Math.round(d*s)},render(h,d){d.updateMatrixWorld();const u=d.matrixWorldInverse.elements,p=d.projectionMatrix.elements,g=d.matrixWorld.elements,_=-d.near,m=([v,R,A])=>[u[0]*v+u[4]*R+u[8]*A+u[12],u[1]*v+u[5]*R+u[9]*A+u[13],u[2]*v+u[6]*R+u[10]*A+u[14]];function f(v){const R=v.map(m),A=[];for(let C=0;C<R.length;C++){const I=R[C],S=R[(C+1)%R.length],b=I[2]<=_,L=S[2]<=_;if(b&&A.push(I),b!==L){const P=(_-I[2])/(S[2]-I[2]);A.push(I.map((U,z)=>U+(S[z]-U)*P))}}return A.map(([C,I,S])=>{const b=p[3]*C+p[7]*I+p[11]*S+p[15];return[((p[0]*C+p[12])/b+1)*r*.5,(1-(p[5]*I+p[13])/b)*o*.5]})}const M=[];for(const v of[...a,...l()]){const R=v.normal,A=v.avatar?v.points.reduce((L,P)=>L.map((U,z)=>U+P[z]/v.points.length),[0,0,0]):v.center??(v.center=v.points.reduce((L,P)=>L.map((U,z)=>U+P[z]/v.points.length),[0,0,0]));if((d.isPerspectiveCamera?R[0]*(g[12]-A[0])+R[1]*(g[13]-A[1])+R[2]*(g[14]-A[2]):R[0]*g[8]+R[1]*g[9]+R[2]*g[10])<=1e-5&&!v.doubleSided)continue;const I=f(v.points);if(I.length<3)continue;const S=I.map(L=>L[0]),b=I.map(L=>L[1]);Math.max(...S)<0||Math.min(...S)>r||Math.max(...b)<0||Math.min(...b)>o||M.push({face:v,projected:I,depth:u[2]*A[0]+u[6]*A[1]+u[10]*A[2]+u[14]})}M.sort((v,R)=>v.depth-R.depth),n.setTransform(s,0,0,s,0,0),n.clearRect(0,0,r,o),n.lineWidth=.45,n.lineJoin="round";function E(v,R,A=!1,C=!1){if(!(v.length<3)){if(n.beginPath(),C)for(let I=0;I<v.length;I++){const S=v[I],b=v[(I+v.length-1)%v.length],L=v[(I+1)%v.length],P=S.map((z,k)=>z*.82+b[k]*.18),U=S.map((z,k)=>z*.82+L[k]*.18);I===0?n.moveTo(...P):n.lineTo(...P),n.quadraticCurveTo(...S,...U)}else v.forEach(([I,S],b)=>b?n.lineTo(I,S):n.moveTo(I,S));n.closePath(),n.fillStyle=R,n.fill(),A&&(n.strokeStyle=R,n.stroke())}}for(const{face:v,projected:R}of M)n.globalAlpha=v.alpha??1,v.water||v.avatar||v.surface?E(R,v.css,(v.avatar||v.surface)&&v.alpha===1):(E(R,v.rim,!0),E(f(v.inner),v.css,!1,!0));n.globalAlpha=1,c.info.render.faces=M.length}};return{renderer:c,canvas:e,compatible:!0}}const ta=1,li=[{n:[1,0,0],u:[0,0,-1],v:[0,1,0]},{n:[-1,0,0],u:[0,0,1],v:[0,1,0]},{n:[0,1,0],u:[1,0,0],v:[0,0,-1]},{n:[0,-1,0],u:[1,0,0],v:[0,0,1]},{n:[0,0,1],u:[1,0,0],v:[0,1,0]},{n:[0,0,-1],u:[-1,0,0],v:[0,1,0]}],as=(i,t,e)=>`${i},${t},${e}`;class D_{constructor(){this.cells=new Map,this.revision=0}get(t,e,n){return this.cells.get(as(t,e,n))}set(t,e,n,s){if(![t,e,n].every(Number.isInteger))throw new TypeError("Block coordinates must be integer grid cells.");return s===null?this.cells.delete(as(t,e,n)):this.cells.set(as(t,e,n),{x:t,y:e,z:n,type:s}),this.revision++,this}remove(t,e,n){return this.set(t,e,n,null)}snap(t,e,n){return{x:Math.floor(t/ta),y:Math.floor(e/ta),z:Math.floor(n/ta)}}solidAt(t,e,n){const s=this.snap(t,e,n),r=this.get(s.x,s.y,s.z);return!!r&&!["cloud","water"].includes(r.type)}*exposedFaces(){for(const t of this.cells.values())for(let e=0;e<li.length;e++){const{n}=li[e],s=this.get(t.x+n[0],t.y+n[1],t.z+n[2]);(!s||t.type!=="water"&&s.type==="water")&&(yield{...t,direction:e})}}collisionBoxes(){const t=new Set([...this.cells.values()].filter(s=>!["cloud","water"].includes(s.type)).map(s=>as(s.x,s.y,s.z))),e=[],n=(s,r,o)=>t.has(as(s,r,o));for(const{x:s,y:r,z:o}of this.cells.values()){if(!n(s,r,o))continue;let a=s+1,l=r+1,c=o+1;for(;n(a,r,o);)a++;const h=(u,p)=>{for(let g=s;g<a;g++)if(!n(g,u,p))return!1;return!0};for(;h(r,c);)c++;const d=u=>{for(let p=o;p<c;p++)if(!h(u,p))return!1;return!0};for(;d(l);)l++;for(let u=r;u<l;u++)for(let p=o;p<c;p++)for(let g=s;g<a;g++)t.delete(as(g,u,p));e.push({min:[s,r,o],max:[a,l,c]})}return e}}const Ai={overheadElevation:55,angledCamera:{targetX:.60882,targetY:-1.36139,distance:308.86737,frameScale:.96776},angledElevation:25.0131},nd=[[-20,-29],[-12,-33],[-4,-33],[0,-35],[6,-38],[14,-35],[19,-28],[23,-26],[28,-23],[30,-17],[32,-13],[33,-9],[34,-4],[34,2],[32,7],[29,12],[27,17],[23,21],[18,22],[12,26],[6,29],[0,33],[-4,32],[-9,28],[-14,26],[-20,22],[-24,17],[-28,13],[-31,9],[-33,6],[-35,1],[-35,-5],[-34,-9],[-31,-13],[-28,-16],[-26,-20],[-24,-24],[-23,-28]],I_=[{id:"left-rear",height:2,polygon:[[-23,-26],[-21,-30],[-18,-31],[-14,-30],[-11,-28],[-10,-24],[-12,-20],[-16,-19],[-20,-20],[-22,-23]]},{id:"rear-link",height:2,polygon:[[-13,-29],[-8,-31],[-2,-32],[3,-35],[6,-32],[5,-28],[1,-27],[-3,-28],[-8,-27],[-11,-26]]},{id:"right-rear",height:2,polygon:[[18,-25],[23,-26],[27,-24],[29,-20],[29,-17],[27,-15],[23,-15],[20,-17],[19,-20]]},{id:"upper-apron",height:2,polygon:[[-1,-34],[5,-37],[11,-36],[17,-32],[19,-28],[21,-25],[21,-21],[18,-19],[15,-18],[11,-19],[8,-21],[4,-23],[1,-26],[-1,-28]]},{id:"upper-lawn",height:5,polygon:[[0,-34],[3,-36],[8,-35],[13,-33],[16,-29],[16,-27],[13,-24],[9,-23],[5,-24],[2,-27]]}],Fl=[{id:"left-large",x:-30,z:-3,scale:1.15,trunk:7,source:[350,520],crown:"broad",vertical:.85,canopyBack:1.5},{id:"rear-left",x:-17,z:-26,scale:.85,trunk:4,source:[530,246],crown:"small",vertical:.75,canopyBack:1.5},{id:"rear-high",x:10,z:-28,scale:1.05,trunk:6,source:[900,205],crown:"tall",vertical:.8,canopyBack:2.5},{id:"rear-right",x:23,z:-20,scale:.85,trunk:4,source:[1090,320],crown:"small-right",vertical:.75,canopyBack:1.5},{id:"right-large",x:30,z:1,scale:1.03,trunk:6,source:[1180,565],crown:"round",vertical:.75,canopyBack:1.5}],Ol=[{id:"left-foreground",x:-27,z:6,source:[388,620],cells:[[0,0,0],[1,0,0],[0,0,1],[1,0,1],[0,1,0],[1,1,0],[2,0,1]]},{id:"upper-rear",x:1,z:-34,source:[785,145],cells:[[0,0,0],[1,0,0],[0,0,1],[1,0,1],[0,1,0],[0,2,0],[1,1,0]]},{id:"terrace-right",x:14,z:-25,source:[963,260],cells:[[0,0,0],[1,0,0],[1,1,0],[0,0,1],[2,0,0]]},{id:"right-shore",x:25,z:3,source:[1123,584],cells:[[0,0,0],[1,0,0],[0,0,1],[1,0,1],[1,1,0],[2,0,1]]},{id:"pond-front",x:12,z:18,source:[941,760],cells:[[0,0,0],[1,0,0],[0,0,1],[1,0,1],[0,1,0],[2,0,1]]}],id=[{id:"rear-link",x:-3,z:-30,source:[710,197]},{id:"left-shore",x:-30,z:2,source:[341,582]},{id:"right-shore",x:23,z:0,source:[1074,559]},{id:"pond-front",x:10,z:20,source:[888,785]}],U_=[[-26,-16],[-26,-16],[-25,-16],[-25,-17],[-25,-18],[-24,-17],[-24,-18],[-24,-20],[-23,-18],[-23,-20],[-23,-21],[-22,-20],[-22,-21],[-22,-22],[-21,-21],[-21,-22],[-21,-23]],N_=[[15,11],[15,15],[16,17],[18,17],[20,17],[20,20],[21,21],[23,20],[24,17],[25,15],[25,11],[24,9],[22,7],[19,7],[17,9]],Le={x:21.5,z:19.5,nx:.45,nz:Math.sqrt(1-.45**2),width:2.2},lh=[[1,0],[1,0],[.99,0],[.94,1],[.92,2],[.89,2],[.81,5],[.77,6],[.73,6],[.69,6],[.64,7],[.54,9],[.49,10],[.44,10],[.34,12],[.29,12],[.25,13],[.21,15],[.15,15],[.06,16],[.025,17]];function go(i,t,e){let n=!1;for(let s=0,r=e.length-1;s<e.length;r=s++){const[o,a]=e[s],[l,c]=e[r];a>t!=c>t&&i<(l-o)*(t-a)/(c-a)+o&&(n=!n)}return n}const ch=36,hh=44,Vn={minX:15,maxX:26,minZ:8,maxZ:25,level:.55,bottom:-2};function sd(i,t,e){const n=Math.sin(i*127.1+t*311.7+e*74.7)*43758.5453;return n-Math.floor(n)}function F_(i,t){const e=i+.5-Le.x,n=t+.5-Le.z;return e*Le.nx+n*Le.nz>.05&&Math.abs(e*Le.nz-n*Le.nx)<Le.width*.5}function O_(i,t){return go(i+.5,t+.5,nd)&&!F_(i,t)}function il(i,t){return go(i+.5,t+.5,N_)}function rd(i,t){if(!O_(i,t))return null;if(il(i,t))return Vn.bottom;let e=0;for(const n of I_)go(i+.5,t+.5,n.polygon)&&(e=Math.max(e,n.height));return e}function Es(i,t){const e=rd(Math.floor(i),Math.floor(t));return e===null?null:e+1}function z_(i,t){let e=-3;for(let n=0;n<lh.length;n++){const[s,r]=lh[n];go((i+.5)/s,(t+.5-r)/s,nd)&&(e=-4-n)}return e}function k_(){const i=new D_;for(let t=-ch;t<ch;t++)for(let e=-hh;e<hh;e++){const n=rd(t,e);if(n!==null){for(let s=z_(t,e);s<=n;s++)i.set(t,s,e,s===n?il(t,e)?"sand":"grass":s>=n-2||s>=-3?"earth":"stone");il(t,e)&&(i.set(t,-1,e,"water"),i.set(t,0,e,"water"))}}return i}Fl.map(i=>[i.x,i.z,i.scale]);Ol.map(i=>[i.x,i.z]);const B_={broad:[[-2.2,0,.3,2.7,2.4,2.8],[2,0,1,2.9,2.5,2.7],[0,2.2,0,3,2.6,2.8],[-1.5,1.2,-2.2,2.7,2.4,2.5],[2.3,1.4,-1.7,2.4,2.1,2.5],[-.3,-.7,2.4,2.5,2.1,2.4]],small:[[-1.7,0,0,2.8,2.8,2.5],[1.7,.2,.4,2.8,2.4,2.6],[0,2.2,-.7,2.5,2.8,2.5],[0,-1,2,2.1,1.8,2.1]],tall:[[-2.1,.4,0,2.7,3,2.6],[2.2,.1,.5,2.9,2.8,2.8],[0,3,-.5,2.7,3.1,2.8],[-1.4,1.7,-2,2.5,2.5,2.5],[1.8,2.3,-1.8,2.5,2.7,2.5],[0,-1.5,2.6,2.1,2,2]],"small-right":[[-1.7,.1,.5,2.7,2.5,2.4],[1.8,0,0,2.6,2.6,2.6],[0,2.2,-.5,2.5,2.9,2.5],[.4,-1.1,2,2.1,1.8,2.1]],round:[[-2,0,0,2.7,2.7,2.7],[2,0,.5,2.8,2.7,2.8],[0,2.3,0,2.9,2.8,2.7],[-1,1,-2.2,2.4,2.2,2.4],[1.8,1.5,-1.8,2.3,2.4,2.3],[0,-1,2.2,2.5,2.1,2.4]]};function H_(i,t){const{x:e,z:n,scale:s,trunk:r,crown:o,vertical:a=1,canopyBack:l=0}=t,c=Es(e,n);if(c===null)throw new Error("Tree outside land: "+t.id);for(let h=0;h<2;h++)for(let d=0;d<r;d++)for(let u=0;u<2;u++)i.set(e+h,c+d,n+u,"trunk");for(const[h,d]of[[-1,0],[2,0],[0,-1],[0,2]])i.set(e+h,c,n+d,"trunk");for(const[h,d,u]of[[-1,r-4,0],[-1,r-3,0],[-2,r-2,0],[2,r-3,1],[2,r-2,1],[3,r-1,1]])i.set(e+h,c+d,n+u,"trunk");for(let h=-7;h<=7;h++)for(let d=-4;d<=8;d++)for(let u=-7;u<=7;u++)B_[o].some(([p,g,_,m,f,M])=>((h-.5-p*s)/(m*s))**2+((d-g*s*a)/(f*s*a))**2+((u-.5-_*s+l)/(M*s))**2<1)&&i.set(e+h,c+r+d,n+u,(h+2*d+u)%5===0?"leafLight":"leaf")}function V_(i,{x:t,z:e}){const n=Es(t,e);for(const[s,r,o]of[[0,0,0],[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,0],[1,1,0],[-1,1,0],[0,1,1],[0,1,-1],[0,2,0]])i.set(t+s,n+r,e+o,r>0?"leafLight":"leaf");for(const[s,r,o]of[[-1,1,0],[1,1,0],[0,1,1],[0,2,0]])i.set(t+s,n+r,e+o,"berry")}function G_(i){for(const t of Fl)H_(i,t);for(const t of Ol){const e=Es(t.x,t.z);if(e===null)throw new Error("Rock outside land: "+t.id);for(const[n,s,r]of t.cells)i.set(t.x+n,e+s,t.z+r,"rock")}for(const t of id)V_(i,t);for(const[t,e]of U_){const n=Es(t,e);n!==null&&i.set(t,n-1,e,"path")}return i}function W_(i){for(const[t,e,n,s]of[[-34,15,-25,1.1],[-6,12,-36,.3],[38,15,-25,1]]){const r=Math.ceil(9*s),o=Math.ceil(7*s);for(let a=-r;a<=r;a++)for(let l=0;l<=o;l++)for(let c=-3;c<=3;c++)[[-4,1.4,4,2.5],[0,2.8,4.5,4],[4,1.1,4,2.5]].some(([d,u,p,g])=>((a-d*s)/(p*s))**2+((l-u*s)/(g*s))**2+(c/(3*s+.4))**2<1)&&i.set(t+a,e+l,n+c,"cloud")}return i}const Hs=new T;function hn(i,t,e,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;Hs.copy(t),Hs[n]=0,Hs.normalize();const c=.5*o/(o+a),h=1-Hs.angleTo(i)/l;return Math.sign(Hs[e])===1?h*c:a/(o+a)+c+c*(1-h)}class zl extends pn{constructor(t=1,e=1,n=1,s=2,r=.1){const o=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const l=new T,c=new T,h=new T(t,e,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,u=this.attributes.normal.array,p=this.attributes.uv.array,g=d.length/6,_=new T,m=.5/o;for(let f=0,M=0;f<d.length;f+=3,M+=2)switch(l.fromArray(d,f),c.copy(l),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),d[f+0]=h.x*Math.sign(l.x)+c.x*r,d[f+1]=h.y*Math.sign(l.y)+c.y*r,d[f+2]=h.z*Math.sign(l.z)+c.z*r,u[f+0]=c.x,u[f+1]=c.y,u[f+2]=c.z,Math.floor(f/g)){case 0:_.set(1,0,0),p[M+0]=hn(_,c,"z","y",r,n),p[M+1]=1-hn(_,c,"y","z",r,e);break;case 1:_.set(-1,0,0),p[M+0]=1-hn(_,c,"z","y",r,n),p[M+1]=1-hn(_,c,"y","z",r,e);break;case 2:_.set(0,1,0),p[M+0]=1-hn(_,c,"x","z",r,t),p[M+1]=hn(_,c,"z","x",r,n);break;case 3:_.set(0,-1,0),p[M+0]=1-hn(_,c,"x","z",r,t),p[M+1]=1-hn(_,c,"z","x",r,n);break;case 4:_.set(0,0,1),p[M+0]=1-hn(_,c,"x","y",r,t),p[M+1]=1-hn(_,c,"y","x",r,e);break;case 5:_.set(0,0,-1),p[M+0]=hn(_,c,"x","y",r,t),p[M+1]=1-hn(_,c,"y","x",r,e);break}}static fromJSON(t){return new zl(t.width,t.height,t.depth,t.segments,t.radius)}}const od="letsgo.island.graphics.v1",Oi={low:{label:"Low",pixelRatio:1,segments:1,shadows:!1,shadowSize:0,lighting:"baked"},medium:{label:"Medium",pixelRatio:1.5,segments:1,shadows:!0,shadowSize:1024,lighting:"lambert"},high:{label:"High",pixelRatio:2,segments:2,shadows:!0,shadowSize:2048,lighting:"standard"}};function X_(i){try{const t=i.getItem(od);return Oi[t]?t:"low"}catch{return"low"}}function j_(i,t){if(!Oi[t])throw new TypeError("Unknown graphics quality");try{i.setItem(od,t)}catch{}}const Y_={grass:"#93d91e",earth:"#da965a",stone:"#b1a7ae",trunk:"#b07839",leaf:"#a0ce12",leafLight:"#c0e526",rock:"#d0c5c5",path:"#e0d4bb",berry:"#98cb24",cloud:"#ffffff",sand:"#d4b879"},sl=[[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]];function rl(i,t=0,e=0){const{n,u:s,v:r}=li[i.direction];return sl.map(([o,a])=>[i.x+.5+n[0]*(.5+e)+s[0]*o*(1-t*2)+r[0]*a*(1-t*2),i.y+.5+n[1]*(.5+e)+s[1]*o*(1-t*2)+r[1]*a*(1-t*2),i.z+.5+n[2]*(.5+e)+s[2]*o*(1-t*2)+r[2]*a*(1-t*2)])}function q_(i,t){if(t.direction!==2||t.type==="cloud")return 1;let e=0;for(const n of[-.35,.35])for(let s=1;s<24;s++){const r=i.get(Math.floor(t.x+.5-s*.68+n),t.y+1+s,Math.floor(t.z+.5-s*.42));if(r&&!["cloud","water"].includes(r.type)){e++;break}}return 1-e*.22}function ad(i){return[...i.exposedFaces()].filter(t=>t.type!=="water").map(t=>{const e=li[t.direction].n,n=[.8,.97,1,.6,.88,.93][t.direction],s=.92+sd(t.x,t.y,t.z)*.16,r=new Wt(Y_[t.type]??"#b8b8b8").multiplyScalar(s),o=r.clone().multiplyScalar(n*q_(i,t));let a=0;for(let l=0;l<li.length;l++){const c=li[l].n,h=i.get(t.x+c[0],t.y+c[1],t.z+c[2]);h&&h.type!=="water"&&(a|=1<<l)}return{...t,normal:e,neighbors:a,points:rl(t),inner:rl(t,.055,.015),color:o.toArray(),baseColor:r.toArray(),css:o.getStyle(),rim:o.clone().multiplyScalar(.88).getStyle()}})}function K_(){const t=new Uint8Array(16384);for(let n=0;n<4096;n++){const s=190+Math.round(sd(n%64,0,Math.floor(n/64))*65);t.set([s,s,s,255],n*4)}const e=new Rl(t,64,64,rn);return e.wrapS=e.wrapT=ro,e.needsUpdate=!0,e}function Z_(i){return i==="high"?new jh({vertexColors:!0,roughness:.86,metalness:0,bumpMap:K_(),bumpScale:.025}):i==="medium"?new Me({vertexColors:!0}):new Hi({vertexColors:!0})}function $_(i,t="low"){const e=Oi[t],n=new ce;n.name="Rounded editable block island";const s=new Map,r=Z_(t);let o=0;for(const l of i){const c=l.type==="cloud",h=Math.floor(l.x/16)+","+Math.floor(l.z/16)+(c?",cloud":"");s.has(h)||s.set(h,{positions:[],normals:[],colors:[],uvs:[],indices:[],sky:c});const d=s.get(h),{n:u,u:p,v:g}=li[l.direction],_=.19,m=e.segments===2?[-.5,-.5+_*.3,-.5+_,.5-_,.5-_*.3,.5]:[-.5,-.5+_,.5-_,.5],f=m.length,M=d.positions.length/3,E=t==="low"?l.color:l.baseColor;for(const R of m)for(const A of m){const C=u.map((Q,ot)=>Q*.5+p[ot]*A+g[ot]*R),I=C.map((Q,ot)=>{const pt=l.neighbors&1<<ot*2,kt=l.neighbors&1<<ot*2+1;return Math.max(kt?-.5:-.5+_,Math.min(pt?.5:.5-_,Q))}),S=C.map((Q,ot)=>Q-I[ot]),b=Math.hypot(...S),L=S.map(Q=>Q/b),P=Math.min(1,(.5-Math.abs(A))/_),U=Math.min(1,(.5-Math.abs(R))/_),z=.095*P*U,k=Math.abs(A)>.5-_?-.095*Math.sign(A)*U/_:0,V=Math.abs(R)>.5-_?-.095*Math.sign(R)*P/_:0,q=L.map((Q,ot)=>Q-p[ot]*k-g[ot]*V),W=Math.hypot(...q);d.positions.push(l.x+.5+I[0]+L[0]*_+u[0]*z,l.y+.5+I[1]+L[1]*_+u[1]*z,l.z+.5+I[2]+L[2]*_+u[2]*z),d.normals.push(...q.map(Q=>Q/W)),d.colors.push(...E),d.uvs.push(A+.5,R+.5)}for(let R=0;R<f-1;R++)for(let A=0;A<f-1;A++){const C=M+R*f+A,I=C+1,S=C+f,b=S+1;d.indices.push(C,I,b,C,b,S),o+=2}const v=d.positions.length/3;d.positions.push(...rl(l,0,-.16).flat());for(let R=0;R<4;R++)d.normals.push(...u),d.colors.push(...E.map(A=>A*.86)),d.uvs.push(sl[R][0]+.5,sl[R][1]+.5);d.indices.push(v,v+1,v+2,v,v+2,v+3),o+=2}for(const[l,c]of s){const h=new De;h.setAttribute("position",new $t(c.positions,3)),h.setAttribute("normal",new $t(c.normals,3)),h.setAttribute("color",new $t(c.colors,3)),h.setAttribute("uv",new $t(c.uvs,2)),h.setIndex(c.indices),h.computeBoundingSphere();const d=new Zt(h,r);d.name="Rounded block chunk "+l,d.castShadow=e.shadows&&!c.sky,d.receiveShadow=e.shadows&&!c.sky,n.add(d)}const a=i.filter(l=>l.type==="berry"&&l.direction===2);if(a.length){const l=new zl(.25,.22,.25,1,.06),c=t==="low"?new Hi:new Me,h=new el(l,c,a.length*3),d=new we;let u=0;for(const p of a)for(const[g,_,m]of[[.22,.25,"#df7134"],[.72,.65,"#edae36"],[.65,.2,"#e76135"]])d.position.set(p.x+g,p.y+1.02,p.z+_),d.updateMatrix(),h.setMatrixAt(u,d.matrix),h.setColorAt(u++,new Wt(m));h.computeBoundingSphere(),h.name="Small colored berries",n.add(h),o+=l.attributes.position.count/3*a.length*3}return n.userData.faces=i.length,n.userData.triangles=o,n}function dh(i){const t=new Set;i.traverse(e=>{e.isMesh&&(e.geometry.dispose(),t.add(e.material))});for(const e of t)e.bumpMap?.dispose(),e.dispose()}function ld(){const i=W_(G_(k_())),t=ad(i);return{world:i,faces:t}}function J_(i=ld(),t="low"){return $_(i.faces,t)}const Vr=new Wt;function yi(i,t,e,n=1,s=!1){return Vr.set(e),{points:i,inner:i,normal:t,x:i[0][0],y:i[0][1],z:i[0][2],css:Vr.getStyle(),rim:Vr.getStyle(),color:Vr.toArray(),alpha:n,water:!0,back:s}}function cd(i){const t=[],e=Vn.level;function n(o,a,l,c,h=.75){const d=a[0]-o[0],u=a[1]-o[1],p=Math.hypot(d,u),g=-u/p*l*.5,_=d/p*l*.5;t.push(yi([[o[0]+g,e+.012,o[1]+_],[a[0]+g,e+.012,a[1]+_],[a[0]-g,e+.012,a[1]-_],[o[0]-g,e+.012,o[1]-_]],[0,1,0],c,h))}for(const o of i.cells.values()){if(o.type!=="water"||o.y!==0)continue;const{x:a,z:l}=o;t.push(yi([[a,e,l+1],[a+1,e,l+1],[a+1,e,l],[a,e,l]],[0,1,0],(a+l)%3===0?"#21c6df":"#15bad6",.94));const c=[[.15,.05],[.75,.05],[1,.45],[.7,.96],[.1,.8],[-.02,.4]];for(let h=0;h<c.length-1;h++)n(c[h].map((d,u)=>d+(u?l:a)),c[h+1].map((d,u)=>d+(u?l:a)),.026,"#d6fcff",.65)}const s=[Le.nz,-.45],r=(o,a,l)=>[Le.x+s[0]*o+Le.nx*a,l,Le.z+s[1]*o+Le.nz*a];t.push(yi([r(-1.1,-.8,e),r(1.1,-.8,e),r(1.1,.02,e),r(-1.1,.02,e)],[0,1,0],"#60dfec",.86));for(let o=0;o<3;o++){const a=-1.1+o*Le.width/3,l=a+Le.width/3-.035;for(let c=0;c<23;c++){const h=e-c*1.04,d=h-1.07,u=.2*Math.sin(c/23*Math.PI*.5),p=[Le.nx,0,Le.nz],g=.76*(1-c/29),_=[r(a,u,h),r(a,u,d),r(l,u,d),r(l,u,h)];t.push(yi(_,p,o===1?"#72e0ef":"#3ecbe7",g)),t.push(yi([..._].reverse(),p.map(m=>-m),"#71e2ee",g*.65,!0)),o!==1&&t.push(yi([r(a+.09,u+.012,h),r(a+.09,u+.012,d),r(a+.16,u+.012,d),r(a+.16,u+.012,h)],p,"#eeffff",g*.9))}}for(const[o,a,l]of[[-.75,24,.3],[.25,24.5,.25],[.75,25,.25],[-.25,25.5,.2],[-.5,26,.2],[.5,26.5,.15],[0,27.5,.15],[-.25,28,.1]]){const c=e-a;t.push(yi([r(o,.25,c),r(o,.25,c-l),r(o+l,.25,c-l),r(o+l,.25,c)],[Le.nx,0,Le.nz],"#c6f8ff",.7))}return t}function Q_(i){const t=[],e=[],n=[];for(const l of i){if(l.back)continue;const c=t.length/3;t.push(...l.points.flat());for(let h=0;h<4;h++)e.push(...l.color,l.alpha);n.push(c,c+1,c+2,c,c+2,c+3)}const s=new De;s.setAttribute("position",new $t(t,3)),s.setAttribute("color",new $t(e,4)),s.setIndex(n);const r=new Hi({vertexColors:!0,transparent:!0,depthWrite:!1,side:ze}),o=new Zt(s,r),a=new ce;return o.name="Reference pond and narrow waterfall",a.add(o),a}class kl{constructor(t=new T(0,0,0),e=new T(0,1,0),n=1){this.start=t,this.end=e,this.radius=n}clone(){return new this.constructor().copy(this)}set(t,e,n){return this.start.copy(t),this.end.copy(e),this.radius=n,this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this.radius=t.radius,this}getCenter(t){return t.copy(this.end).add(this.start).multiplyScalar(.5)}translate(t){return this.start.add(t),this.end.add(t),this}intersectsBox(t){return ea(this.start.x,this.start.y,this.end.x,this.end.y,t.min.x,t.max.x,t.min.y,t.max.y,this.radius)&&ea(this.start.x,this.start.z,this.end.x,this.end.z,t.min.x,t.max.x,t.min.z,t.max.z,this.radius)&&ea(this.start.y,this.start.z,this.end.y,this.end.z,t.min.y,t.max.y,t.min.z,t.max.z,this.radius)}}function ea(i,t,e,n,s,r,o,a,l){return(s-i<l||s-e<l)&&(i-r<l||e-r<l)&&(o-t<l||o-n<l)&&(t-a<l||n-a<l)}const Vs=new T,Gs=new T,Gr=new T,Ws=new T,wn=new Gn,na=new Kh,tx=new Kh,Wr=new Rs,Xs=new kl,ex=new T,nx=new T,ix=new T,sx=1e-10;function rx(i,t,e=null,n=null){const s=ex.copy(i.end).sub(i.start),r=nx.copy(t.end).sub(t.start),o=ix.copy(t.start).sub(i.start),a=s.dot(r),l=s.dot(s),c=r.dot(r),h=r.dot(o),d=s.dot(o);let u,p;const g=l*c-a*a;if(Math.abs(g)<sx){const _=-h/c,m=(a-h)/c;Math.abs(_-.5)<Math.abs(m-.5)?(u=0,p=_):(u=1,p=m)}else u=(h*a+d*c)/g,p=(u*a-h)/c;p=Math.max(0,Math.min(1,p)),u=Math.max(0,Math.min(1,u)),e&&e.copy(s).multiplyScalar(u).add(i.start),n&&n.copy(r).multiplyScalar(p).add(t.start)}class Bl{constructor(t){this.box=t,this.bounds=new Ln,this.layers=new Al,this.trianglesPerLeaf=8,this.maxLevel=16,this.subTrees=[],this.triangles=[]}addTriangle(t){return this.bounds.min.x=Math.min(this.bounds.min.x,t.a.x,t.b.x,t.c.x),this.bounds.min.y=Math.min(this.bounds.min.y,t.a.y,t.b.y,t.c.y),this.bounds.min.z=Math.min(this.bounds.min.z,t.a.z,t.b.z,t.c.z),this.bounds.max.x=Math.max(this.bounds.max.x,t.a.x,t.b.x,t.c.x),this.bounds.max.y=Math.max(this.bounds.max.y,t.a.y,t.b.y,t.c.y),this.bounds.max.z=Math.max(this.bounds.max.z,t.a.z,t.b.z,t.c.z),this.triangles.push(t),this}calcBox(){return this.box=this.bounds.clone(),this.box.min.x-=.01,this.box.min.y-=.01,this.box.min.z-=.01,this}split(t){if(!this.box)return;const e=[],n=Gs.copy(this.box.max).sub(this.box.min).multiplyScalar(.5);for(let r=0;r<2;r++)for(let o=0;o<2;o++)for(let a=0;a<2;a++){const l=new Ln,c=Vs.set(r,o,a);l.min.copy(this.box.min).add(c.multiply(n)),l.max.copy(l.min).add(n),e.push(new Bl(l))}let s;for(;s=this.triangles.pop();)for(let r=0;r<e.length;r++)e[r].box.intersectsTriangle(s)&&e[r].triangles.push(s);for(let r=0;r<e.length;r++){const o=e[r].triangles.length;o>this.trianglesPerLeaf&&t<this.maxLevel&&e[r].split(t+1),o!==0&&this.subTrees.push(e[r])}return this}build(){return this.calcBox(),this.split(0),this}getRayTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const s=this.subTrees[n];if(t.intersectsBox(s.box))if(s.triangles.length>0)for(let r=0;r<s.triangles.length;r++)e.indexOf(s.triangles[r])===-1&&e.push(s.triangles[r]);else s.getRayTriangles(t,e)}}triangleCapsuleIntersect(t,e){e.getPlane(wn);const n=wn.distanceToPoint(t.start)-t.radius,s=wn.distanceToPoint(t.end)-t.radius;if(n>0&&s>0||n<-t.radius&&s<-t.radius)return!1;const r=Math.abs(n/(Math.abs(n)+Math.abs(s))),o=Vs.copy(t.start).lerp(t.end,r);if(e.containsPoint(o))return{normal:wn.normal.clone(),point:o.clone(),depth:Math.abs(Math.min(n,s))};const a=t.radius*t.radius,l=na.set(t.start,t.end),c=[[e.a,e.b],[e.b,e.c],[e.c,e.a]];for(let h=0;h<c.length;h++){const d=tx.set(c[h][0],c[h][1]);if(rx(l,d,Gr,Ws),Gr.distanceToSquared(Ws)<a)return{normal:Gr.clone().sub(Ws).normalize(),point:Ws.clone(),depth:t.radius-Gr.distanceTo(Ws)}}return!1}triangleSphereIntersect(t,e){if(e.getPlane(wn),!t.intersectsPlane(wn))return!1;const n=Math.abs(wn.distanceToSphere(t)),s=t.radius*t.radius-n*n,r=wn.projectPoint(t.center,Vs);if(e.containsPoint(t.center))return{normal:wn.normal.clone(),point:r.clone(),depth:Math.abs(wn.distanceToSphere(t))};const o=[[e.a,e.b],[e.b,e.c],[e.c,e.a]];for(let a=0;a<o.length;a++){na.set(o[a][0],o[a][1]),na.closestPointToPoint(r,!0,Gs);const l=Gs.distanceToSquared(t.center);if(l<s)return{normal:t.center.clone().sub(Gs).normalize(),point:Gs.clone(),depth:t.radius-Math.sqrt(l)}}return!1}getSphereTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const s=this.subTrees[n];if(t.intersectsBox(s.box))if(s.triangles.length>0)for(let r=0;r<s.triangles.length;r++)e.indexOf(s.triangles[r])===-1&&e.push(s.triangles[r]);else s.getSphereTriangles(t,e)}}getCapsuleTriangles(t,e){for(let n=0;n<this.subTrees.length;n++){const s=this.subTrees[n];if(t.intersectsBox(s.box))if(s.triangles.length>0)for(let r=0;r<s.triangles.length;r++)e.indexOf(s.triangles[r])===-1&&e.push(s.triangles[r]);else s.getCapsuleTriangles(t,e)}}sphereIntersect(t){Wr.copy(t);const e=[];let n,s=!1;this.getSphereTriangles(t,e);for(let r=0;r<e.length;r++)(n=this.triangleSphereIntersect(Wr,e[r]))&&(s=!0,Wr.center.add(n.normal.multiplyScalar(n.depth)));if(s){const r=Wr.center.clone().sub(t.center),o=r.length();return{normal:r.normalize(),depth:o}}return!1}capsuleIntersect(t){Xs.copy(t);const e=[];let n,s=!1;this.getCapsuleTriangles(Xs,e);for(let r=0;r<e.length;r++)(n=this.triangleCapsuleIntersect(Xs,e[r]))&&(s=!0,Xs.translate(n.normal.multiplyScalar(n.depth)));if(s){const r=Xs.getCenter(new T).sub(t.getCenter(Vs)),o=r.length();return{normal:r.normalize(),depth:o}}return!1}rayIntersect(t){const e=[];let n,s,r=1e100;this.getRayTriangles(t,e);for(let o=0;o<e.length;o++){const a=t.intersectTriangle(e[o].a,e[o].b,e[o].c,!0,Vs);if(a){const l=a.sub(t.origin).length();r>l&&(s=a.clone().add(t.origin),r=l,n=e[o])}}return r<1e100?{distance:r,triangle:n,position:s}:!1}fromGraphNode(t){return t.updateWorldMatrix(!0,!0),t.traverse(e=>{if(e.isMesh===!0&&this.layers.test(e.layers)){let n,s=!1;e.geometry.index!==null?(s=!0,n=e.geometry.toNonIndexed()):n=e.geometry;const r=n.getAttribute("position");for(let o=0;o<r.count;o+=3){const a=new T().fromBufferAttribute(r,o),l=new T().fromBufferAttribute(r,o+1),c=new T().fromBufferAttribute(r,o+2);a.applyMatrix4(e.matrixWorld),l.applyMatrix4(e.matrixWorld),c.applyMatrix4(e.matrixWorld),this.addTriangle(new un(a,l,c))}s&&n.dispose()}}),this.build(),this}clear(){return this.box=null,this.bounds.makeEmpty(),this.subTrees.length=0,this.triangles.length=0,this}}class ox{constructor(){K(this,"octree",new Bl);K(this,"waters",[]);K(this,"solids",[]);K(this,"ladders",[]);K(this,"scratchRay",new Tl);K(this,"scratchVector",new T)}addSolid(t){this.solids.push(t),this.octree.fromGraphNode(t)}addWater(t,e,n){this.waters.push({bounds:t,surfaceY:e,test:n})}capsuleIntersect(t){const e=this.octree.capsuleIntersect(t);return e?{normal:e.normal,depth:e.depth}:null}raycast(t,e,n){this.scratchRay.set(t,e);const s=this.octree.rayIntersect(this.scratchRay);return!s||s.distance>n?n:s.distance}surfaceProbe(t,e,n){this.scratchRay.set(t,e);const s=this.octree.rayIntersect(this.scratchRay);if(!s||s.distance>n)return null;const r=s.triangle.getNormal(new T);return r.dot(e)>0&&r.negate(),{distance:s.distance,normal:r}}addLadder(t,e,n,s){this.ladders.push({bounds:t,facing:e,topY:n,anchor:s})}ladderAt(t,e=0){for(const n of this.ladders)if(t.x>=n.bounds.min.x-e&&t.x<=n.bounds.max.x+e&&t.z>=n.bounds.min.z-e&&t.z<=n.bounds.max.z+e&&t.y>=n.bounds.min.y-e&&t.y<=n.bounds.max.y)return n;return null}waterAt(t){for(const e of this.waters)if(t.x>=e.bounds.min.x&&t.x<=e.bounds.max.x&&t.z>=e.bounds.min.z&&t.z<=e.bounds.max.z&&t.y>=e.bounds.min.y&&t.y<=e.surfaceY&&(!e.test||e.test(t.x,t.z)))return e;return null}groundProbe(t,e){this.scratchVector.set(0,-1,0),this.scratchRay.set(t,this.scratchVector);const n=this.octree.rayIntersect(this.scratchRay);if(!n||n.distance>e)return null;const s=n.triangle.getNormal(new T);return s.y<0&&s.negate(),{y:t.y-n.distance,normal:s}}groundHeightBelow(t,e=200){this.scratchVector.set(0,-1,0),this.scratchRay.set(t,this.scratchVector);const n=this.octree.rayIntersect(this.scratchRay);return!n||n.distance>e?-1/0:t.y-n.distance}reset(){this.waters.length=0}}function ax(i,t,e){const n=i.clone();n.y+=e;const s=i.clone();return s.y+=t-e,new kl(n,s,e)}const N={runSpeed:8.6,walkSpeed:3.1,acceleration:32,deceleration:26,skidDeceleration:46,skidDotThreshold:-.55,skidMinSpeed:5.2,turnRateSlow:13,turnRateFast:5.2,gravity:27,fallGravityMultiplier:1.42,jumpVelocity:9.6,doubleJumpVelocity:11.5,tripleJumpVelocity:13.5,jumpComboWindow:.26,jumpComboMinSpeed:2.6,tripleJumpFlipDelay:.13,tripleJumpFlipDelayShare:.3,tripleJumpFlipMinAirtime:.45,tripleJumpFlipDelayMin:.035,tripleJumpLandMargin:.07,jumpCutMultiplier:.42,airAcceleration:14,airDeceleration:2.2,airTurnRate:6,coyoteTime:.11,jumpBufferTime:.14,crouchDeceleration:11,crouchSpeed:1.6,crouchTurnRate:3.4,longJumpMinSpeed:4.2,longJumpSpeed:17.5,longJumpVelocity:8.6,longJumpAirControl:.25,backflipMaxSpeed:3,backflipVelocity:13,backflipSpeed:5.4,wallKickWindow:.18,wallKickVelocity:11.2,wallKickSpeed:8.4,sideFlipApex:3,sideFlipLeastVelocity:4.5,sideFlipSpeed:5,sideFlipWindow:.3,sideFlipBuffer:.26,airBoostVelocity:8.8,airPoundDelay:.16,chargeLeastPower:.78,groundPoundHover:.22,groundPoundRecovery:.3,ladderSnagDistance:.85,ladderSpeed:2.8,ladderStandOff:.46,ladderHandHigh:.46,ladderHandLow:.1,ladderJumpOff:4.5,ladderCooldown:.6,ladderTopFeet:1.05,ladderTopSeconds:.6,ladderTopStand:.72,ladderMountSeconds:.55,ladderMountReach:1.7,ladderMountDrop:1.1,ledgeReach:.62,ledgeReachExtra:.45,ledgeGrabLow:.75,ledgeGrabHigh:1.95,ledgeGrabRise:3,ledgeWideDepth:1.15,ledgeStandNarrow:.5,ledgeStandWide:.95,ledgeVaultOver:1.15,ledgeHandForward:.36,ledgeEdgeStep:.05,ledgeWallProbe:.5,ledgeWallDrops:[.35,.7,.12],ledgeWallUpright:.55,ledgeSquareRate:7,ledgeClipAllow:.05,ledgeHangLift:1.72,ledgeSettleDown:.8,ledgeSettleUp:.25,ledgeSwingSeconds:.52,ledgeMantleSeconds:.8,ledgeVaultSeconds:.5,ledgeCooldown:.25,ledgeMinDrop:1.6,ledgeShimmySpeed:1.3,ledgeGripStride:.62,ledgeHandOut:.07,ledgeGripLift:.13,ledgeShimmyProbe:.42,ledgeBoostWindow:.34,ledgeBoostRise:.26,ledgeBoostLift:.55,ledgeBoostVelocity:4.4,ledgeJumpOff:4.2,ledgeJumpUp:.72,waterExitSeconds:.75,waterExitStand:.9,waterExitReach:.95,waterExitLow:.35,waterExitHigh:2.05,brakeMinSpeed:5.4,brakeEndSpeed:1.2,brakeSlideShort:.762,brakeSlideLong:2.03,brakeMomentumBuild:2.83,brakeMomentumFade:1.2,brakeMomentumCurve:1.45,maxWalkableSlopeDegrees:52,groundSnapDistance:.42,stepHeight:.45,swimSpeed:3.4,swimAcceleration:9,swimDrag:2.6,buoyancy:9.5,strokeImpulse:4.6,strokeLiftSurface:.05,strokeLiftUnder:.55,swimSurfaceRise:1.3,waterExitGrace:.45,strokeCooldown:.52,divePlunge:.25,underResponse:7,underGlide:4.5,lookLevelBand:.09,underRest:.03,surfaceBandMargin:.05,floatSubmersion:.76,splashSpeed:6,carrySpeedMultiplier:.82,carryReach:1.9,throwSpeed:11,throwLift:4.2,killPlaneY:-45},ls=Math.cos(N.maxWalkableSlopeDegrees*Math.PI/180),Si={shirt:"#d9353a",overalls:"#2f5fd0",skin:"#f3c29a",glove:"#fbfbf7",shoe:"#6a3b1c",buckle:"#f2c94c",clay:"#b9b2a6"};function lx(i,t=.72,e=0){return new jh({color:new Wt(i),roughness:t,metalness:e,flatShading:!1})}function je(i,t,e=[0,0,0]){const n=new Zt(i,t);return n.position.set(e[0],e[1],e[2]),n.castShadow=!0,n.receiveShadow=!1,n}function js(i,t,e){const n=[],s=e/2,r=5;for(let o=0;o<=r;o+=1){const a=Math.PI/2*(o/r);n.push(new Mt(Math.sin(a)*t,-s-Math.cos(a)*t))}n.push(new Mt(i,s));for(let o=1;o<=r;o+=1){const a=Math.PI/2*(o/r);n.push(new Mt(Math.cos(a)*i,s+Math.sin(a)*i))}return new Cs(n,14)}const hd=[[0,-.2],[.108,-.195],[.186,-.168],[.238,-.108],[.26,-.03],[.268,.056],[.264,.136],[.256,.192],[.272,.248],[.286,.3],[.29,.345],[.272,.388],[.206,.424],[.124,.448],[0,.46]],tr=.93;function cx(){return new Cs(hd.map(([i,t])=>new Mt(i*tr,t)),20)}function hx(i){const t=[];for(const[n,s]of hd){if(s>i)break;t.push(new Mt(n*tr*1.035,s))}const e=t[t.length-1];return t.push(new Mt(e.x*.97,i)),t.push(new Mt(0,i)),new Cs(t,20)}const ti=1.82,Hl=.92,kn=.34,te={shoulderX:.282,shoulderY:.345,upper:.32,lower:.34},dd=Hl+te.shoulderY;function ud(i={}){const t=[],e=(A,C,I)=>{const S=lx(A,C,I);return t.push(S),S},n=i.plain===!0,s=n?e(Si.clay,.78):null,r=s??e(Si.shirt,.78),o=s??e(Si.overalls,.74),a=s??e(Si.skin,.68),l=s??e(Si.glove,.66),c=s??e(Si.shoe,.7),h=s??e(Si.buckle,.35,.55),d=new ce,u=new ce;u.position.y=Hl,d.add(u);const p=new ce;if(u.add(p),p.add(je(cx(),r)),!n){p.add(je(hx(.16),o));for(const A of[-.125,.125])p.add(je(new ei(.05,10,8),h,[A*tr,.21,.27*tr]))}p.add(je(js(.094,.118,.15),a,[0,.5,.004]));const g=new ce;if(g.position.set(0,.685,0),p.add(g),g.add(je(new ei(.22,20,18),a)),!n){g.add(je(new ei(.228,18,12,0,Math.PI*2,0,Math.PI*.52),r,[0,.07,0]));const A=je(new _s(.14,.168,.04,14,1,!1,Math.PI*.75,Math.PI*1.5),r,[0,.068,.152]);A.rotation.x=-.16,g.add(A),g.add(je(new ei(.068,12,10),a,[0,-.045,.2]))}const _=A=>{const C=new ce;C.position.set(te.shoulderX*tr*A,te.shoulderY,0),p.add(C),C.add(je(js(.1,.11,.14),r,[0,-.16,0]));const I=new ce;I.position.y=-.32,C.add(I),I.add(je(js(.096,.104,.17),r,[0,-.17,0]));const S=je(new ei(.142,14,12),l,[0,-.34,0]);return S.scale.set(1.08,1,.82),I.add(S),{shoulder:C,elbow:I}},m=_(-1),f=_(1),M=A=>{const C=new ce;C.position.set(.158*A,-.02,0),p.add(C),C.add(je(js(.128,.148,.2),o,[0,-.2,0]));const I=new ce;I.position.y=-.42,C.add(I),I.add(je(js(.115,.128,.18),o,[0,-.17,0]));const S=new ce;S.position.y=-.38,I.add(S);const b=je(new ei(.172,14,12),c,[0,.014,.05]);return b.scale.set(.82,.58,1.44),S.add(b),{hip:C,knee:I,ankle:S}},E=M(-1),v=M(1),R=new we;return R.position.set(0,.3,.68),p.add(R),d.traverse(A=>{A instanceof Zt&&(A.castShadow=!0,A.receiveShadow=!1)}),{root:d,body:u,torso:p,head:g,shoulderLeft:m.shoulder,shoulderRight:f.shoulder,elbowLeft:m.elbow,elbowRight:f.elbow,hipLeft:E.hip,hipRight:v.hip,kneeLeft:E.knee,kneeRight:v.knee,ankleLeft:E.ankle,ankleRight:v.ankle,carryAnchor:R,materials:t}}const x=Vl(),Xr=Vl(),Xt=Vl();let uh=!1,ia=0,fh=0;function Vl(){return{bodyPitch:0,bodyRoll:0,bodyYaw:0,bodyHeight:0,bodySquash:1,headPitch:0,headYaw:0,shoulderLeftPitch:0,shoulderRightPitch:0,shoulderLeftRoll:0,shoulderRightRoll:0,elbowLeft:0,elbowRight:0,hipLeft:0,hipRight:0,kneeLeft:0,kneeRight:0,ankleLeft:0,ankleRight:0}}function dx(i,t){ux(t),Mx(t);const e=t.state==="ledge"?26:t.state==="air"?16:t.state==="climb"?15:13,n=1-Math.exp(-e*t.delta);if(!uh)Object.assign(Xr,x),uh=!0;else for(const o of Object.keys(x))Xr[o]=at.lerp(Xr[o],x[o],n);Object.assign(Xt,Xr),vx(t,1-Math.exp(-14*t.delta));const s=t.flipAxis==="pitch"?t.flipAngle:0,r=t.flipAxis==="roll"?t.flipAngle:0;i.body.rotation.set(Xt.bodyPitch+s,Xt.bodyYaw,Xt.bodyRoll+r),i.body.position.y=Hl+Xt.bodyHeight,i.body.scale.set(1/Math.sqrt(Xt.bodySquash),Xt.bodySquash,1/Math.sqrt(Xt.bodySquash)),i.head.rotation.set(Xt.headPitch,Xt.headYaw,0),i.shoulderLeft.rotation.set(Xt.shoulderLeftPitch,0,-Xt.shoulderLeftRoll),i.shoulderRight.rotation.set(Xt.shoulderRightPitch,0,Xt.shoulderRightRoll),i.elbowLeft.rotation.x=Xt.elbowLeft,i.elbowRight.rotation.x=Xt.elbowRight,i.hipLeft.rotation.x=Xt.hipLeft,i.hipRight.rotation.x=Xt.hipRight,i.kneeLeft.rotation.x=Xt.kneeLeft,i.kneeRight.rotation.x=Xt.kneeRight,i.ankleLeft.rotation.x=Xt.ankleLeft,i.ankleRight.rotation.x=Xt.ankleRight}function ux(i){switch(fx(x),i.state){case"climb":yx(i);break;case"ledge":mx(i);break;case"swim":bx(i);break;case"air":Sx(i);break;default:px(i);break}i.carrying&&Ex(),i.landing&&Tx()}function fx(i){i.bodyPitch=0,i.bodyRoll=0,i.bodyYaw=0,i.bodyHeight=0,i.bodySquash=1,i.headPitch=0,i.headYaw=0,i.shoulderLeftPitch=0,i.shoulderRightPitch=0,i.shoulderLeftRoll=.17,i.shoulderRightRoll=.17,i.elbowLeft=0,i.elbowRight=0,i.hipLeft=0,i.hipRight=0,i.kneeLeft=0,i.kneeRight=0,i.ankleLeft=0,i.ankleRight=0}function px(i){const t=at.clamp(i.speed/i.maxSpeed,0,1);if(i.poundPhase==="landed"){x.bodyPitch=.18,x.bodyHeight=-.3,x.bodySquash=.88,x.shoulderLeftPitch=-.9,x.shoulderRightPitch=-.9,x.shoulderLeftRoll=.7,x.shoulderRightRoll=.7,x.elbowLeft=-.5,x.elbowRight=-.5,x.hipLeft=-1.3,x.hipRight=-1.3,x.kneeLeft=2.1,x.kneeRight=2.1,x.ankleLeft=-.9,x.ankleRight=-.9,x.headPitch=-.2;return}if(i.crouching){x.bodyPitch=.3,x.bodyHeight=-.185,x.hipLeft=-1.15,x.hipRight=-1.15,x.kneeLeft=1.95,x.kneeRight=1.95,x.ankleLeft=-.95,x.ankleRight=-.95,x.shoulderLeftPitch=-.75,x.shoulderRightPitch=-.75,x.shoulderLeftRoll=.42,x.shoulderRightRoll=.42,x.elbowLeft=-.7,x.elbowRight=-.7,x.headPitch=-.26,x.bodySquash=.94;return}if(i.braking){const l=at.lerp(.4,1,at.clamp(i.brakeStrength,0,1));x.bodyPitch=-.34*l,x.bodyHeight=-.025*l,x.bodyRoll=.07*l,x.shoulderLeftPitch=-1.15*l,x.shoulderRightPitch=-.55*l,x.shoulderLeftRoll=at.lerp(.17,.95,l),x.shoulderRightRoll=at.lerp(.17,.8,l),x.elbowLeft=-.35*l,x.elbowRight=-.25*l,x.hipLeft=-.72*l,x.hipRight=.22*l,x.kneeLeft=.62*l,x.kneeRight=1.15*l,x.ankleLeft=0,x.ankleRight=-.35*l,x.headPitch=-.12*l;return}if(i.skidding){x.bodyPitch=-.3,x.bodyHeight=-.11,x.shoulderLeftPitch=-1.5,x.shoulderRightPitch=-1.2,x.shoulderLeftRoll=.85,x.shoulderRightRoll=.7,x.hipLeft=-.5,x.hipRight=.35,x.kneeLeft=.45,x.kneeRight=.2,x.headPitch=-.18;return}if(i.speed<.3){const l=Math.sin(i.time*1.7);x.bodyHeight=l*.012,x.bodySquash=1+l*.008,x.headYaw=Math.sin(i.time*.45)*.22,x.headPitch=Math.sin(i.time*.33)*.05,x.shoulderLeftPitch=.06,x.shoulderRightPitch=-.06,x.shoulderLeftRoll=.2,x.shoulderRightRoll=.2,x.elbowLeft=-.16,x.elbowRight=-.16;return}const e=2.6+t*5.4;ia=(ia+e*i.delta)%(Math.PI*2);const n=ia,s=Math.sin(n),r=Math.sin(n+Math.PI),o=at.lerp(.42,1,t),a=at.lerp(.3,.95,t);x.hipLeft=s*o,x.hipRight=r*o,x.kneeLeft=Math.max(0,s)*o*1.25,x.kneeRight=Math.max(0,r)*o*1.25,x.ankleLeft=s*.42+.08,x.ankleRight=r*.42+.08,x.shoulderLeftPitch=r*a,x.shoulderRightPitch=s*a,x.elbowLeft=-.22-Math.max(0,-r)*a*.6,x.elbowRight=-.22-Math.max(0,-s)*a*.6,x.shoulderLeftRoll=.18+t*.04-Math.max(0,-r)*.1,x.shoulderRightRoll=.18+t*.04-Math.max(0,-s)*.1,x.bodyPitch=t*.26,x.bodyHeight=Math.abs(Math.sin(n))*.05*t-.02*t,x.bodyRoll=Math.sin(n)*.055*t,x.bodyYaw=Math.sin(n)*.09*t,x.headYaw=-x.bodyYaw*.7,x.headPitch=-t*.12}function mx(i){if(i.ledgeMove==="water-exit"){gx(i);return}if(i.ledgeMove==="ladder-top"){_x(i);return}if(i.ledgeMove==="ladder-mount"){xx(i);return}const t=i.ledgeWide,e=i.ledgeHanging?0:at.clamp(i.ledgeProgress,0,1),n=e>=.45,s=n?(e-.45)/.55:e/.45,r=s*s*(3-2*s),o=(l,c,h)=>n?at.lerp(c,h,r):at.lerp(l,c,r);x.bodyPitch=o(.1,t?.34:.52,.05),x.bodyHeight=o(-.04,-.02,0),x.bodySquash=o(1.02,.97,1),x.headPitch=o(-.3,-.16,0),x.hipLeft=o(-.16,t?-1.4:-1.75,-.24),x.hipRight=o(-.16,t?-1.4:-.6,-.24),x.kneeLeft=o(.3,t?1.85:1.95,.34),x.kneeRight=o(.3,t?1.85:.9,.34),x.ankleLeft=o(.2,.24,0),x.ankleRight=o(.2,.24,0),x.bodyRoll=t?0:o(0,.18,0);const a=at.clamp(i.ledgeBoost,0,1);a>0&&(x.bodyPitch-=a*.3,x.bodyHeight+=a*.05,x.bodySquash=at.lerp(x.bodySquash,1.05,a),x.headPitch+=a*.26,x.hipLeft=at.lerp(x.hipLeft,.12,a),x.hipRight=at.lerp(x.hipRight,.02,a),x.kneeLeft=at.lerp(x.kneeLeft,.1,a),x.kneeRight=at.lerp(x.kneeRight,.22,a),x.ankleLeft=at.lerp(x.ankleLeft,-.3,a),x.ankleRight=at.lerp(x.ankleRight,-.3,a)),Gl(i)}function gx(i){const t=at.clamp(i.ledgeProgress,0,1),e=t>=.5,n=e?(t-.5)/.5:t/.5,s=n*n*(3-2*n),r=(o,a,l)=>e?at.lerp(a,l,s):at.lerp(o,a,s);x.bodyPitch=r(.26,.52,.06),x.bodyHeight=r(.04,-.02,0),x.bodySquash=r(1.01,.96,1),x.headPitch=r(-.38,-.22,0),x.hipLeft=r(.3,-1.5,-.22),x.hipRight=r(.22,-1.1,-.22),x.kneeLeft=r(.25,1.9,.3),x.kneeRight=r(.2,1.4,.3),x.ankleLeft=r(-.3,.2,0),x.ankleRight=r(-.3,.2,0),Gl(i)}function _x(i){const t=at.clamp(i.ledgeProgress,0,1),e=t*t*(3-2*t);x.bodyPitch=at.lerp(.22,.08,e),x.bodyHeight=at.lerp(-.02,0,e),x.headPitch=at.lerp(-.28,-.05,e),x.bodyRoll=Math.sin(t*Math.PI)*.1,x.hipLeft=at.lerp(-1.5,-.24,e),x.hipRight=at.lerp(-.35,-.24,e),x.kneeLeft=at.lerp(1.7,.3,e),x.kneeRight=at.lerp(.75,.3,e),x.ankleLeft=at.lerp(.2,0,e),x.ankleRight=at.lerp(.25,0,e),Gl(i)}function xx(i){const t=at.clamp(i.ledgeProgress,0,1),e=Math.sin(at.clamp(t*1.35,0,1)*Math.PI);x.bodyPitch=.16+e*.3,x.bodyHeight=-e*.16,x.headPitch=-.1-e*.2,x.hipLeft=-e*1,x.hipRight=-e*1.25,x.kneeLeft=e*1.5,x.kneeRight=e*1.85,x.ankleLeft=-e*.5,x.ankleRight=-e*.5;const n=ol(at.lerp(-.35,N.ladderHandHigh,t),N.ladderStandOff);x.shoulderLeftPitch=n.shoulder,x.shoulderRightPitch=n.shoulder,x.elbowLeft=n.elbow,x.elbowRight=n.elbow,x.shoulderLeftRoll=.26,x.shoulderRightRoll=.26}function Gl(i){const t=dd+x.bodyHeight,e=i.ledgeLift-t,n=N.ledgeHandForward,s=Math.hypot(e,n),r=te.upper+te.lower;if(s>r-.01){const a=at.clamp((s-r)/.3,0,1);if(x.shoulderLeftPitch=at.lerp(x.shoulderLeftPitch,-.3,a),x.shoulderRightPitch=at.lerp(x.shoulderRightPitch,-.3,a),x.elbowLeft=at.lerp(x.elbowLeft,-.28,a),x.elbowRight=at.lerp(x.elbowRight,-.28,a),a>=1)return}const o=fd(N.ledgeHandOut,e,n);x.shoulderLeftPitch=o.shoulder,x.shoulderRightPitch=o.shoulder,x.elbowLeft=o.elbow,x.elbowRight=o.elbow,x.shoulderLeftRoll=o.roll,x.shoulderRightRoll=o.roll}let Ye=0;function vx(i,t){const e=i.state==="ledge"&&i.ledgeHanging&&i.ledgeShimmy!==0?1:0;if(Ye=at.lerp(Ye,e,t),Ye<.002){Ye=0;return}const n=i.ledgeLift-(dd+Xt.bodyHeight),s=N.ledgeHandForward,r=-Math.sign(i.ledgeShimmy)||1,o=i.ledgeGrip-Math.floor(i.ledgeGrip),a=r*Math.cos(o*Math.PI*2)*Ye;Xt.bodyRoll-=a*.085;const l=Math.sin(Xt.bodyRoll)*(te.shoulderY+n),c=N.ledgeGripStride/4*Ye;for(const d of[-1,1]){const p=d===r?o:(o+.5)%1,g=p>=.5,_=g?(p-.5)*2:p*2,m=_*_*(3-2*_),f=c*(g?-1+2*m:1-2*_),M=g?Math.sin(_*Math.PI)*Ye:0,E=fd(N.ledgeHandOut+d*(r*f+l),n-M*N.ledgeGripLift,s-M*N.ledgeGripLift*.45);d<0?(Xt.shoulderLeftPitch=E.shoulder,Xt.shoulderLeftRoll=E.roll,Xt.elbowLeft=E.elbow):(Xt.shoulderRightPitch=E.shoulder,Xt.shoulderRightRoll=E.roll,Xt.elbowRight=E.elbow)}Xt.bodyYaw+=r*.05*Ye,Xt.headYaw+=r*.2*Ye;const h=Math.sin(o*Math.PI*2)*Ye;Xt.hipLeft-=.09*Ye+h*.07,Xt.hipRight-=.09*Ye-h*.07,Xt.kneeLeft+=.1*Ye-h*.06,Xt.kneeRight+=.1*Ye+h*.06}function Mx(i){const t=at.clamp(i.windUp,0,1);if(t<=.001)return;const e=t*t*(3-2*t)*.86,n=(s,r)=>at.lerp(s,r,e);x.bodyPitch=n(x.bodyPitch,.34),x.bodyHeight=n(x.bodyHeight,-.2),x.bodySquash=n(x.bodySquash,.93),x.headPitch=n(x.headPitch,-.3),x.hipLeft=n(x.hipLeft,-1.2),x.hipRight=n(x.hipRight,-1.2),x.kneeLeft=n(x.kneeLeft,2),x.kneeRight=n(x.kneeRight,2),x.ankleLeft=n(x.ankleLeft,-.98),x.ankleRight=n(x.ankleRight,-.98),x.shoulderLeftPitch=n(x.shoulderLeftPitch,.62),x.shoulderRightPitch=n(x.shoulderRightPitch,.62),x.elbowLeft=n(x.elbowLeft,-.5),x.elbowRight=n(x.elbowRight,-.5),x.shoulderLeftRoll=n(x.shoulderLeftRoll,.3),x.shoulderRightRoll=n(x.shoulderRightRoll,.3)}const sa={shoulder:0,elbow:0};function ol(i,t){const e=te.upper+te.lower,n=at.clamp(Math.hypot(i,t),.1,e-.012),s=Math.atan2(-t,-i),r=Math.acos(at.clamp((te.upper*te.upper+n*n-te.lower*te.lower)/(2*te.upper*n),-1,1)),o=Math.acos(at.clamp((te.upper*te.upper+te.lower*te.lower-n*n)/(2*te.upper*te.lower),-1,1));return sa.shoulder=s+r,sa.elbow=-(Math.PI-o),sa}const jr={shoulder:0,roll:0,elbow:0};function fd(i,t,e){const n=te.upper+te.lower,s=at.clamp(Math.hypot(i,t,e),.1,n-.012),r=Math.acos(at.clamp((te.upper*te.upper+te.lower*te.lower-s*s)/(2*te.upper*te.lower),-1,1)),o=-(Math.PI-r),a=-(te.upper-te.lower*Math.cos(r)),l=te.lower*Math.sin(r),c=Math.asin(at.clamp(i/Math.max(-a,1e-4),-1,1)),h=a*Math.cos(c);return jr.roll=c,jr.elbow=o,jr.shoulder=Math.atan2(e,t)-Math.atan2(l,h),jr}function yx(i){fh+=i.climbSpeed*i.delta*2.6;const t=Math.sin(fh);x.bodyPitch=.12+Math.abs(t)*.06,x.headPitch=-.24,x.bodyRoll=t*.11,x.bodyYaw=t*.14,x.bodyHeight=-.04+Math.abs(t)*.05;const e=N.ladderStandOff,n=(t+1)*.5,s=ol(at.lerp(N.ladderHandLow,N.ladderHandHigh,n),e);x.shoulderLeftPitch=s.shoulder,x.elbowLeft=s.elbow;const r=ol(at.lerp(N.ladderHandHigh,N.ladderHandLow,n),e);x.shoulderRightPitch=r.shoulder,x.elbowRight=r.elbow,x.shoulderLeftRoll=.26,x.shoulderRightRoll=.26,x.hipLeft=-.34-Math.max(0,-t)*1.15,x.hipRight=-.34-Math.max(0,t)*1.15,x.kneeLeft=.34+Math.max(0,-t)*1.4,x.kneeRight=.34+Math.max(0,t)*1.4,x.ankleLeft=.3-Math.max(0,t)*.35,x.ankleRight=.3-Math.max(0,-t)*.35}function Sx(i){const t=i.verticalSpeed>.5;if(i.againstWall&&!t){x.bodyPitch=-.1,x.shoulderLeftPitch=-.5,x.shoulderRightPitch=-.5,x.shoulderLeftRoll=1,x.shoulderRightRoll=1,x.elbowLeft=-.9,x.elbowRight=-.9,x.hipLeft=-.85,x.hipRight=-.2,x.kneeLeft=.9,x.kneeRight=.3,x.ankleLeft=.1,x.ankleRight=.1,x.headPitch=-.12;return}if(i.poundPhase==="hover"){x.bodyPitch=.5,x.shoulderLeftPitch=-2.3,x.shoulderRightPitch=-2.3,x.shoulderLeftRoll=.9,x.shoulderRightRoll=.9,x.elbowLeft=-1.1,x.elbowRight=-1.1,x.hipLeft=-1.7,x.hipRight=-1.7,x.kneeLeft=2,x.kneeRight=2,x.bodySquash=.94,x.headPitch=-.3;return}if(i.poundPhase==="slam"){x.bodyPitch=-.55,x.bodyHeight=-.05,x.shoulderLeftPitch=-1.5,x.shoulderRightPitch=-1.5,x.shoulderLeftRoll=.75,x.shoulderRightRoll=.75,x.elbowLeft=-.4,x.elbowRight=-.4,x.hipLeft=-1.95,x.hipRight=-1.95,x.kneeLeft=.5,x.kneeRight=.5,x.ankleLeft=-.3,x.ankleRight=-.3,x.bodySquash=1.06,x.headPitch=.15;return}if(i.jumpKind==="side"){x.shoulderLeftPitch=-1.3,x.shoulderRightPitch=-1.3,x.shoulderLeftRoll=.55,x.shoulderRightRoll=.55,x.elbowLeft=-1.5,x.elbowRight=-1.5,x.hipLeft=-1.25,x.hipRight=-1.25,x.kneeLeft=1.6,x.kneeRight=1.6,x.ankleLeft=.3,x.ankleRight=.3,x.bodySquash=1.03;return}if(i.jumpKind==="long"){x.bodyPitch=.92,x.bodyHeight=-.06,x.shoulderLeftPitch=-2.5,x.shoulderRightPitch=-2.5,x.shoulderLeftRoll=.16,x.shoulderRightRoll=.16,x.elbowLeft=-.12,x.elbowRight=-.12,x.hipLeft=.55,x.hipRight=.42,x.kneeLeft=.5,x.kneeRight=.68,x.ankleLeft=.42,x.ankleRight=.42,x.headPitch=-.55,x.bodySquash=1.03;return}if(i.jumpKind==="back"){x.shoulderLeftPitch=1.9,x.shoulderRightPitch=1.9,x.shoulderLeftRoll=.3,x.shoulderRightRoll=.3,x.elbowLeft=-.5,x.elbowRight=-.5,x.hipLeft=-1.5,x.hipRight=-1.5,x.kneeLeft=1.75,x.kneeRight=1.75,x.ankleLeft=.3,x.ankleRight=.3,x.headPitch=.2,x.bodySquash=1.05;return}if(i.jumpKind==="wall"&&t){x.bodyPitch=.16,x.shoulderLeftPitch=-1.9,x.shoulderRightPitch=-.9,x.shoulderLeftRoll=.6,x.shoulderRightRoll=.75,x.elbowLeft=-.5,x.elbowRight=-.3,x.hipLeft=-1.3,x.hipRight=.45,x.kneeLeft=1.35,x.kneeRight=.25,x.ankleLeft=.2,x.ankleRight=.4,x.headPitch=-.1;return}if(i.flipping){x.shoulderLeftPitch=-2.75,x.shoulderRightPitch=-2.75,x.shoulderLeftRoll=.15,x.shoulderRightRoll=.15,x.elbowLeft=-1.5,x.elbowRight=-1.5,x.hipLeft=-1.3,x.hipRight=-1.3,x.kneeLeft=1.9,x.kneeRight=1.9,x.ankleLeft=.5,x.ankleRight=.5,x.bodySquash=1.04;return}if(t){const e=i.jumpStage===2?1.25:1;x.shoulderLeftPitch=-2.5*e,x.shoulderRightPitch=-2.5*e,x.shoulderLeftRoll=.22,x.shoulderRightRoll=.22,x.elbowLeft=-.35*e,x.elbowRight=-.35*e,x.hipLeft=-.55*e,x.hipRight=-.3*e,x.kneeLeft=1.05*e,x.kneeRight=.6*e,x.ankleLeft=.5,x.ankleRight=.42,x.bodyPitch=.12,x.bodySquash=1.06,x.headPitch=-.1}else{const e=at.clamp(-i.verticalSpeed/16,0,1);x.shoulderLeftPitch=-1.1-e*.5,x.shoulderRightPitch=-1.1-e*.5,x.shoulderLeftRoll=.75+e*.3,x.shoulderRightRoll=.75+e*.3,x.elbowLeft=-.5,x.elbowRight=-.5,x.hipLeft=-.26+e*.2,x.hipRight=.16,x.kneeLeft=.4,x.kneeRight=.18,x.ankleLeft=-.22,x.ankleRight=-.18,x.bodyPitch=-.06-e*.08,x.bodySquash=1+e*.04,x.headPitch=e*.12}}let xn=0,$s=0;const bi={shoulder:0,elbow:0,roll:0};function al(i,t){const e=i-Math.floor(i);if(e<.5){const n=e/.5,s=n*n*(3-2*n);bi.shoulder=at.lerp(-2.78,-.18,s),bi.elbow=-.95*Math.sin(n*Math.PI),bi.roll=.2+Math.sin(n*Math.PI)*.2*t}else{const n=(e-.5)/.5,s=n*n*(3-2*n);bi.shoulder=at.lerp(-.18,-2.78,s),bi.elbow=-1.35*Math.sin(n*Math.PI),bi.roll=.26+Math.sin(n*Math.PI)*(.78*t)}return bi}function bx(i){const t=i.strokeProgress<1,e=at.clamp(i.speed/1.5,0,1),n=at.clamp(Math.hypot(i.speed,i.verticalSpeed)/1.5,0,1),s=Math.max(i.submerged?n:e,t?1:0);$s=at.lerp($s,s,1-Math.exp(-6*i.delta));const r=(i.submerged?.62:.72)+$s*.5+(t?.85:0);if(xn+=i.delta*r,i.submerged){wx(i);return}const o=$s,a=(E,v)=>at.lerp(E,v,o),l=Math.sin(xn*Math.PI*2.6),c=-.52-l*.1,h=-1.2-Math.abs(l)*.16,d=.5+l*.07,u=Math.sin(xn*Math.PI*2),p=al(xn,1),g=p.shoulder,_=p.elbow,m=p.roll,f=al(xn+.5,1),M=Math.sin(xn*Math.PI*6);x.bodyPitch=a(.1,1.02),x.bodyHeight=a(.02,.36),x.bodyRoll=a(0,Math.sin(xn*Math.PI*2)*.22),x.headPitch=a(-.3,-.66),x.shoulderLeftPitch=a(c,g),x.shoulderRightPitch=a(c,f.shoulder),x.elbowLeft=a(h,_),x.elbowRight=a(h,f.elbow),x.shoulderLeftRoll=a(d,m),x.shoulderRightRoll=a(d,f.roll),x.hipLeft=a(-.46-u*.26,-.12+M*.3),x.hipRight=a(-.46+u*.26,-.12-M*.3),x.kneeLeft=a(.72+Math.max(0,u)*.45,.2+Math.max(0,-M)*.3),x.kneeRight=a(.72+Math.max(0,-u)*.45,.2+Math.max(0,M)*.3),x.ankleLeft=a(.26,-.32),x.ankleRight=a(.26,-.32)}function wx(i){const t=al(xn,.55),e=Math.sin(xn*Math.PI*2),n=Math.sin(xn*Math.PI*2-.7),s=$s,r=(l,c)=>at.lerp(l,c,s),o=Math.sin(xn*Math.PI*2.4),a=at.clamp(i.swimAim,-1,1);x.bodyPitch=r(1.02+e*.03,1.3+a*.62+e*.14),x.bodyHeight=.26,x.bodyRoll=0,x.shoulderLeftPitch=r(-1.25-o*.06,t.shoulder),x.shoulderRightPitch=r(-1.25+o*.06,t.shoulder),x.elbowLeft=r(-.55-Math.abs(o)*.12,t.elbow),x.elbowRight=r(-.55-Math.abs(o)*.12,t.elbow),x.shoulderLeftRoll=r(.72+o*.16,t.roll),x.shoulderRightRoll=r(.72+o*.16,t.roll),x.hipLeft=r(.32+n*.1,.1+n*.42),x.hipRight=r(.32-n*.1,.1+n*.42),x.kneeLeft=r(.5+Math.max(0,-n)*.2,.25+Math.max(0,-n)*.85),x.kneeRight=r(.5+Math.max(0,n)*.2,.25+Math.max(0,-n)*.85),x.ankleLeft=r(-.35,-.3-n*.2),x.ankleRight=r(-.35,-.3-n*.2),x.headPitch=r(-.32,-.5-e*.1-a*.12)}function Ex(){x.shoulderLeftPitch=-1.52,x.shoulderRightPitch=-1.52,x.shoulderLeftRoll=.3,x.shoulderRightRoll=.3,x.elbowLeft=-.35,x.elbowRight=-.35,x.bodyPitch=Math.max(x.bodyPitch,0)+.06}function Tx(){x.bodySquash=.82,x.bodyHeight=-.12,x.hipLeft=-.6,x.hipRight=-.6,x.kneeLeft=1.05,x.kneeRight=1.05,x.ankleLeft=-.3,x.ankleRight=-.3,x.shoulderLeftPitch=-.45,x.shoulderRightPitch=-.45,x.shoulderLeftRoll=.55,x.shoulderRightRoll=.55}const ph=new T(0,1,0);class Ax{constructor(t,e,n={},s={}){K(this,"object");K(this,"rig");K(this,"velocity",new T);K(this,"state","air");K(this,"onGround",!1);K(this,"groundNormal",new T(0,1,0));K(this,"facing",0);K(this,"carried",null);K(this,"capsule");K(this,"world");K(this,"events");K(this,"coyoteTimer",0);K(this,"jumpBufferTimer",0);K(this,"windUp",0);K(this,"jumpPower",1);K(this,"jumpFromThumb",!1);K(this,"lastPower",1);K(this,"sinceAirBoost",10);K(this,"jumpHeld",!1);K(this,"jumpStage",1);K(this,"comboWindow",0);K(this,"flipTimer",-1);K(this,"flipDelay",N.tripleJumpFlipDelay);K(this,"flipProgress",0);K(this,"landingTimer",0);K(this,"skidding",!1);K(this,"crouching",!1);K(this,"braking",!1);K(this,"momentum",0);K(this,"brakeRate",0);K(this,"brakeStrength",0);K(this,"jumpKind","normal");K(this,"flipDirection",1);K(this,"flipAxis","pitch");K(this,"airPresses",0);K(this,"sinceTakeOff",99);K(this,"tookOffRunning",!1);K(this,"takeOffY",0);K(this,"sinceSideFlipPress",99);K(this,"sideBuffer",0);K(this,"poundPhase","none");K(this,"poundTimer",0);K(this,"ladder",null);K(this,"ladderCooldown",0);K(this,"wallNormal",new T);K(this,"wallTimer",99);K(this,"againstWall",!1);K(this,"wallKicks",0);K(this,"ledgeTimer",-1);K(this,"ledgeSeconds",0);K(this,"ledgeWide",!1);K(this,"ledgeVault",!1);K(this,"climbMove","mantle");K(this,"ledgeFacingFrom",0);K(this,"pendingLadder",null);K(this,"ledgeHanging",!1);K(this,"ledgeLift",0);K(this,"ledgeCooldown",0);K(this,"ledgeStand",0);K(this,"ledgeBoosted",!1);K(this,"ledgeBoostAt",0);K(this,"gripPhase",0);K(this,"gripMoving",0);K(this,"ledgeFrom",new T);K(this,"ledgeTo",new T);K(this,"strokeTimer",0);K(this,"waterVolume",null);K(this,"submerged",!1);K(this,"atSurface",!1);K(this,"lookYaw",0);K(this,"lookPitch",0);K(this,"dived",!1);K(this,"plungeTimer",0);K(this,"scratchLook",new T);K(this,"leftWaterTimer",0);K(this,"diving",!1);K(this,"footstepPhase",0);K(this,"animationTime",0);K(this,"lastSafePosition",new T);K(this,"floorNormalY",1);K(this,"safePositionTimer",0);K(this,"diagnostics",{collisions:0,lastNormalY:0,lastDepth:0});K(this,"ledgeDiagnostics",{reason:"",lip:0,surface:0});K(this,"scratchA",new T);K(this,"scratchB",new T);K(this,"scratchMove",new T);K(this,"scratchSide",new T);K(this,"scratchProbe",new T);K(this,"scratchLedge",new T);K(this,"carryables",[]);this.world=t,this.events=n,this.rig=ud(s),this.object=this.rig.root,this.object.position.copy(e),this.capsule=new kl(new T(e.x,e.y+kn,e.z),new T(e.x,e.y+ti-kn,e.z),kn),this.lastSafePosition.copy(e)}get windUpShowing(){return this.windUp}get jumpInfo(){return{stage:this.jumpStage,kind:this.jumpKind,pound:this.poundPhase,airPresses:this.airPresses,power:this.lastPower,fromThumb:this.jumpFromThumb}}get position(){return this.object.position}getFocusPoint(t){return t.copy(this.object.position).addScaledVector(ph,ti*.78)}get speed(){return Math.hypot(this.velocity.x,this.velocity.z)}get isSubmerged(){return this.state==="swim"&&!this.atSurface&&this.submerged}get stateName(){return this.state==="climb"?"climb":this.state==="air"&&this.poundPhase==="hover"?"pound-hover":this.state==="air"&&this.poundPhase==="slam"?"pound":this.poundPhase==="landed"?"pound-land":this.state==="ledge"?this.ledgeHanging?"hanging":this.climbMove==="water-exit"?"water-exit":this.climbMove==="ladder-top"?"ladder-top":this.climbMove==="ladder-mount"?"ladder-mount":this.ledgeWide?"mantle":this.ledgeVault?"ledge-vault":"ledge-swing":this.state==="swim"?this.atSurface?"swim-surface":"swim-under":this.state==="air"?this.againstWall&&this.velocity.y<0?"wall-slide":this.jumpKind==="long"?"long-jump":this.jumpKind==="back"?"backflip":this.jumpKind==="wall"&&this.velocity.y>0?"wall-kick":this.jumpKind==="side"?"side-flip":this.velocity.y<=.5?"fall":this.jumpStage===3?"triple":this.jumpStage===2?"double":"jump":this.crouching?"crouch":this.braking?"brake":this.skidding?"skid":this.speed>N.walkSpeed+.6?"run":this.speed>.25?"walk":"idle"}update(t,e,n,s=0){this.lookYaw=n,this.lookPitch=s,this.animationTime+=t,this.strokeTimer>0&&(this.strokeTimer-=t),this.landingTimer>0&&(this.landingTimer-=t),this.comboWindow>0&&(this.comboWindow-=t),this.flipTimer>=0&&(this.flipTimer+=t),this.wallTimer<10&&(this.wallTimer+=t),this.ledgeCooldown>0&&(this.ledgeCooldown-=t),this.ladderCooldown>0&&(this.ladderCooldown-=t),this.leftWaterTimer>0&&(this.leftWaterTimer-=t),this.sinceTakeOff<10&&(this.sinceTakeOff+=t),this.sinceAirBoost<10&&(this.sinceAirBoost+=t),this.sinceSideFlipPress<10&&(this.sinceSideFlipPress+=t),e.wasPressed("sideFlip")&&(this.sinceSideFlipPress=0),this.sideBuffer>0&&(this.sideBuffer-=t),(e.chargingAction()==="sideJump"||e.wasPressed("sideJump"))&&(this.sideBuffer=N.sideFlipBuffer),this.poundPhase==="landed"&&(this.poundTimer-=t,this.poundTimer<=0&&(this.poundPhase="none"));const r=this.scratchA.set(e.move.x,0,e.move.y),o=Math.min(1,r.length());o>.001?r.normalize().applyAxisAngle(ph,n):r.set(0,0,0),this.updateJumpTimers(t,e);const a=e.chargingAction();if(this.windUp=a&&this.onGround&&this.poundPhase==="none"?e.chargeNow(a):0,this.state==="climb"){this.updateClimb(t,e,r,o),this.updateCarry(t,e),this.updateRecovery(t),this.syncModel(t,o);return}if(this.state==="ledge"){this.updateLedge(t,e,r),this.updateCarry(t,e),this.updateRecovery(t),this.syncModel(t,o);return}switch(this.updateWaterState(),this.state){case"swim":this.updateSwim(t,e,r,o);break;case"ground":this.updateGround(t,e,r,o);break;default:this.updateAir(t,e,r,o);break}this.integrate(t),this.updateFlip(t),this.updateCarry(t,e),this.updateRecovery(t),this.syncModel(t,o)}updateGround(t,e,n,s){const r=this.scratchB.set(this.velocity.x,0,this.velocity.z),o=r.length();if(this.crouching=e.isDown("crouch")&&this.poundPhase==="none",e.wasPressed("climbDown")){const l=this.ladderToClimbDown();if(l){this.startLadderMount(l);return}}if(s>.001&&!this.crouching&&this.tryCatchLadder(n))return;if(this.poundPhase==="landed"){this.braking=!1,this.skidding=!1,this.velocity.x=0,this.velocity.z=0,this.velocity.y<0&&(this.velocity.y=-2);return}if(this.crouching){this.braking=!1,this.skidding=!1,s>.001&&this.turnToward(n,t,o,N.crouchTurnRate);const l=s>.001?N.crouchSpeed:0,c=o>l?Math.max(l,o-N.crouchDeceleration*t):Math.min(l,o+N.acceleration*.35*t);o>.001?r.multiplyScalar(c/o):c>0&&r.copy(this.forwardVector(this.scratchMove)).multiplyScalar(c)}else if(s>.001){this.braking=!1;const l=this.targetSpeedFor(s),c=o>.01?n.dot(this.scratchSide.copy(r).divideScalar(o)):1;if(this.skidding=o>N.skidMinSpeed&&c<N.skidDotThreshold,this.skidding){const h=Math.max(0,o-N.skidDeceleration*t);o>.001&&r.multiplyScalar(h/o)}else{this.turnToward(n,t,o);const h=this.forwardVector(this.scratchMove),d=r.dot(h),u=d<l?Math.min(l,d+N.acceleration*t):Math.max(l,d-N.deceleration*t),p=this.scratchSide.copy(r).addScaledVector(h,-d).multiplyScalar(Math.max(0,1-N.deceleration*1.8*t));r.copy(h).multiplyScalar(u).add(p)}}else{if(this.skidding=!1,!this.braking&&o>N.brakeMinSpeed){this.braking=!0;const h=Math.pow(this.momentum,N.brakeMomentumCurve),d=at.lerp(N.brakeSlideShort,N.brakeSlideLong,h);this.brakeRate=o*o/(2*Math.max(.1,d)),this.brakeStrength=h}this.braking&&o<N.brakeEndSpeed&&(this.braking=!1);const l=(this.braking?this.brakeRate:N.deceleration)*t,c=Math.max(0,o-l);o>.001&&r.multiplyScalar(c/o)}if(this.velocity.x=r.x,this.velocity.z=r.z,Math.hypot(r.x,r.z)>N.brakeMinSpeed&&!this.braking?this.momentum=Math.min(1,this.momentum+t/N.brakeMomentumBuild):this.braking||(this.momentum=Math.max(0,this.momentum-t/N.brakeMomentumFade)),this.velocity.y<0&&(this.velocity.y=-2),this.coyoteTimer>0&&this.poundPhase==="none"){if(e.wasPressed("backflip")){const l=e.chargeOf("backflip")!==null;this.performBackflip(this.charged(e,"backflip")),l&&(this.jumpHeld=!1);return}if(e.wasPressed("diveJump")){const l=e.chargeOf("diveJump")!==null;this.performLongJump(this.charged(e,"diveJump")),l&&(this.jumpHeld=!1);return}if(e.wasPressed("sideJump")){const l=this.charged(e,"sideJump"),c=e.chargeOf("sideJump")!==null;this.takeOff(),this.performSideFlip(l),c&&(this.jumpHeld=!1);return}}if(this.jumpBufferTimer>0&&this.coyoteTimer>0){this.jumpFromThumb?(this.performJump(this.jumpPower),this.jumpHeld=!1):this.performJump();return}}charged(t,e){const n=t.chargeOf(e);return this.lastPower=n===null?1:at.lerp(N.chargeLeastPower,1,n),this.lastPower}updateAir(t,e,n,s){this.skidding=!1,this.braking=!1,this.crouching=!1;const r=this.velocity.y>0?N.gravity:N.gravity*N.fallGravityMultiplier;if(this.velocity.y-=r*t,this.velocity.y=Math.max(this.velocity.y,-34),this.jumpHeld&&!e.isDown("jump")&&this.velocity.y>0&&(this.velocity.y*=N.jumpCutMultiplier,this.jumpHeld=!1),this.poundPhase==="hover"||this.poundPhase==="slam"){this.updateGroundPound(t);return}if(this.canSideFlip()){this.performSideFlip();return}if(this.wantsBufferedSideFlip()){this.sideBuffer=0,this.performSideFlip(1,!0);return}if(!this.tryCatchLadder()&&!this.tryCatchLedge()){if(this.againstWall&&this.velocity.y<-3.4&&(this.velocity.y=-3.4),this.jumpBufferTimer>0&&this.wallTimer<N.wallKickWindow){this.performWallKick();return}if(e.wasPressed("jump")&&this.leftWaterTimer<=0){if(this.airPresses===0){this.airPresses=1,this.sinceAirBoost=0,this.velocity.y=Math.max(this.velocity.y,0)+N.airBoostVelocity,this.jumpHeld=!0,this.jumpBufferTimer=0;return}if(this.sinceAirBoost>=N.airPoundDelay){this.airPresses+=1,this.startGroundPound();return}}if(s>.001){const o=this.jumpKind==="long"?N.longJumpAirControl:1;this.turnToward(n,t,0,N.airTurnRate*o);const a=this.targetSpeedFor(s),l=this.scratchB.set(this.velocity.x,0,this.velocity.z);l.addScaledVector(n,N.airAcceleration*o*t),l.length()>Math.max(a,this.speed)&&l.setLength(Math.max(a,this.speed)),this.velocity.x=l.x,this.velocity.z=l.z}else{const o=Math.max(0,1-N.airDeceleration*t);this.velocity.x*=o,this.velocity.z*=o}this.jumpBufferTimer>0&&this.coyoteTimer>0&&this.performJump()}}tryCatchLedge(){const t=_=>(this.ledgeDiagnostics.reason=_,!1);if(this.ledgeCooldown>0)return t("cooldown");if(this.velocity.y>N.ledgeGrabRise)return t("rising");if(this.waterVolume)return t("in water");const e=this.againstWall?this.scratchLedge.copy(this.wallNormal).negate():this.forwardVector(this.scratchLedge);if(e.lengthSq()<1e-6)return t("no direction");const n=this.object.position.y,s=this.ledgeSurfaceAt(e,N.ledgeReach,n);if(s===null)return t("nothing in front");const r=s-n;if(this.ledgeDiagnostics.lip=Math.round(r*100)/100,this.ledgeDiagnostics.surface=Math.round(s*100)/100,r<N.ledgeGrabLow||r>N.ledgeGrabHigh)return t("out of reach");const o=this.world.groundProbe(this.scratchProbe.set(this.object.position.x,n+.15,this.object.position.z),N.ledgeMinDrop+.15);if(o&&s-o.y<N.ledgeMinDrop)return t("only a step");const a=this.ledgeWallFacing(e,s);a!==null&&(this.facing=a,this.forwardVector(e));const l=this.ledgeSurfaceAt(e,N.ledgeReach+N.ledgeStandNarrow,n),c=this.ledgeSurfaceAt(e,N.ledgeReach+N.ledgeWideDepth,n),h=l!==null&&Math.abs(l-s)<.25;this.ledgeWide=h&&c!==null&&Math.abs(c-s)<.25,this.ledgeVault=!h,this.climbMove=this.ledgeWide?"mantle":this.ledgeVault?"vault":"swing";const d=this.ledgeWide?N.ledgeStandWide:this.ledgeVault?N.ledgeVaultOver:N.ledgeStandNarrow;this.ledgeStand=d;const p=this.ledgeEdgeDistance(e,s,n)-N.ledgeHandForward;this.object.position.x+=e.x*p,this.object.position.z+=e.z*p,this.ledgeFrom.copy(this.object.position),this.ledgeTo.set(this.object.position.x+e.x*(N.ledgeHandForward+d),s,this.object.position.z+e.z*(N.ledgeHandForward+d));const g=at.clamp(s-N.ledgeHangLift,n-N.ledgeSettleDown,n+N.ledgeSettleUp);return this.ledgeFrom.y=g,this.object.position.y=g,this.syncCapsuleFromPosition(),this.facing=Math.atan2(e.x,e.z),this.ledgeFacingFrom=this.facing,this.velocity.set(0,0,0),this.ledgeTimer=0,this.ledgeBoosted=!1,this.ledgeLift=s-g,this.ledgeHanging=!0,this.gripPhase=0,this.gripMoving=0,this.ledgeSeconds=this.ledgeWide?N.ledgeMantleSeconds:this.ledgeVault?N.ledgeVaultSeconds:N.ledgeSwingSeconds,this.againstWall=!1,this.wallTimer=99,this.state="ledge",this.ledgeDiagnostics.reason="caught",!0}ledgeSurfaceAt(t,e,n){for(const s of[e,e+N.ledgeReachExtra]){const r=this.scratchB.set(this.object.position.x+t.x*s,n+N.ledgeGrabHigh+.4,this.object.position.z+t.z*s),o=this.world.groundProbe(r,N.ledgeGrabHigh+.4);if(o&&!(o.normal.y<ls))return o.y}return null}ledgeEdgeDistance(t,e,n){const s=N.ledgeReach+N.ledgeReachExtra;for(let r=N.ledgeEdgeStep;r<=s;r+=N.ledgeEdgeStep){const o=this.scratchB.set(this.object.position.x+t.x*r,n+N.ledgeGrabHigh+.4,this.object.position.z+t.z*r),a=this.world.groundProbe(o,N.ledgeGrabHigh+.4);if(a&&!(a.normal.y<ls)&&!(Math.abs(a.y-e)>.12))return r}return N.ledgeHandForward}ledgeWallFacing(t,e){const n=N.ledgeReach+N.ledgeReachExtra+N.ledgeWallProbe;for(const s of N.ledgeWallDrops){const r=this.scratchProbe.set(this.object.position.x,e-s,this.object.position.z),o=this.world.surfaceProbe(r,t,n);if(!o)continue;const a=Math.hypot(o.normal.x,o.normal.z);if(!(a<N.ledgeWallUpright))return Math.atan2(-o.normal.x/a,-o.normal.z/a)}return null}updateLedgeHang(t,e,n){if(this.object.position.copy(this.ledgeFrom),this.object.rotation.y=this.facing,this.syncCapsuleFromPosition(),e.wasPressed("jump")){this.ledgeHanging=!1,this.ledgeTimer=0,this.ledgeBoosted=!1,this.ledgeBoostAt=0,this.jumpBufferTimer=0;return}if(e.wasPressed("back")){const o=this.forwardVector(this.scratchMove);this.ledgeHanging=!1,this.ledgeTimer=-1,this.ledgeCooldown=N.ledgeCooldown,this.ladderCooldown=N.ladderCooldown,this.velocity.set(-o.x*N.ledgeJumpOff,N.jumpVelocity*N.ledgeJumpUp,-o.z*N.ledgeJumpOff),this.jumpHeld=!0,this.jumpKind="normal",this.jumpBufferTimer=0,this.airPresses=0,this.state="air";return}if(e.isDown("crouch")){this.ledgeHanging=!1,this.ledgeTimer=-1,this.ledgeCooldown=N.ledgeCooldown,this.velocity.set(0,0,0),this.state="air";return}const s=this.edgeSide(this.scratchSide),r=at.clamp(n.x*s.x+n.z*s.z,-1,1);Math.abs(r)>.2?this.shimmy(r,t):this.settleGrip(t)}settleGrip(t){if(this.gripMoving===0)return;const e=N.ledgeShimmySpeed/N.ledgeGripStride*t,n=this.gripPhase*2*this.gripMoving,s=Math.ceil(n-1e-6)/2*this.gripMoving;if((s-this.gripPhase)*this.gripMoving<=e){this.gripPhase=s,this.gripMoving=0;return}this.gripPhase+=e*this.gripMoving}lookDirection(t){const e=Math.sign(this.lookPitch)*Math.max(0,Math.abs(this.lookPitch)-N.lookLevelBand),n=Math.cos(e);return t.set(-Math.sin(this.lookYaw)*n,-Math.sin(e),-Math.cos(this.lookYaw)*n).normalize()}edgeSide(t){const e=this.forwardVector(this.scratchMove);return t.set(-e.z,0,e.x)}shimmy(t,e){const n=this.edgeSide(this.scratchSide),s=this.scratchMove,r=t*N.ledgeShimmySpeed*e,o=this.ledgeFrom.y+this.ledgeLift,a=()=>{this.object.position.copy(this.ledgeFrom),this.syncCapsuleFromPosition(),this.gripMoving=0},l=Math.sign(r)*N.ledgeShimmyProbe;this.object.position.x=this.ledgeFrom.x+n.x*l,this.object.position.z=this.ledgeFrom.z+n.z*l;const c=this.ledgeSurfaceAt(s,N.ledgeReach,this.object.position.y);if(c===null||Math.abs(c-o)>.2){a();return}this.object.position.x=this.ledgeFrom.x+n.x*r,this.object.position.z=this.ledgeFrom.z+n.z*r;const h=this.ledgeWallFacing(s,o);h!==null&&(this.facing=this.turnThrough(this.facing,h,Math.min(1,N.ledgeSquareRate*e)),this.forwardVector(s));const u=this.ledgeEdgeDistance(s,o,this.object.position.y)-N.ledgeHandForward;this.object.position.x+=s.x*u,this.object.position.z+=s.z*u,this.syncCapsuleFromPosition();const p=this.world.capsuleIntersect(this.capsule);if(p&&p.depth>N.ledgeClipAllow){a();return}this.gripPhase+=r/N.ledgeGripStride,this.gripMoving=Math.sign(r),this.ledgeFrom.copy(this.object.position),this.ledgeTo.set(this.object.position.x+s.x*(N.ledgeHandForward+this.ledgeStand),o,this.object.position.z+s.z*(N.ledgeHandForward+this.ledgeStand))}updateLedge(t,e,n){if(this.ledgeHanging){this.updateLedgeHang(t,e,n);return}(this.climbMove==="mantle"||this.climbMove==="vault"||this.climbMove==="swing")&&!this.ledgeBoosted&&e.wasPressed("jump")&&this.ledgeTimer<=N.ledgeBoostWindow&&(this.ledgeBoosted=!0,this.ledgeBoostAt=this.ledgeTimer),this.ledgeTimer+=t;const r=at.clamp(this.ledgeTimer/this.ledgeSeconds,0,1),o=this.climbMove==="ladder-mount",a=o?.6:this.ledgeWide?.62:.55,l=o?.4:0,c=o?0:.34,h=o?.55:.66,d=at.clamp((r-l)/a,0,1),u=at.clamp((r-c)/h,0,1),p=d*d*(3-2*d),g=u*u*(3-2*u);if(this.object.position.set(at.lerp(this.ledgeFrom.x,this.ledgeTo.x,g),at.lerp(this.ledgeFrom.y,this.ledgeTo.y,p),at.lerp(this.ledgeFrom.z,this.ledgeTo.z,g)),this.object.position.y+=this.boostLift(),this.object.rotation.y=this.turnThrough(this.ledgeFacingFrom,this.facing,g),this.syncCapsuleFromPosition(),this.ledgeLift=this.ledgeTo.y-this.object.position.y,r>=1){if(this.ledgeTimer=-1,this.ledgeCooldown=N.ledgeCooldown,this.wallKicks=0,this.jumpKind="normal",this.velocity.set(0,0,0),this.ledgeBoosted){this.ledgeBoosted=!1,this.pendingLadder=null,this.velocity.y=N.ledgeBoostVelocity,this.jumpHeld=!0,this.airPresses=0,this.jumpBufferTimer=0,this.state="air";return}if(this.climbMove==="ladder-mount"&&this.pendingLadder){this.ladder=this.pendingLadder,this.pendingLadder=null,this.facing=this.ladder.facing,this.state="climb",this.snapToLadder(this.ladder);return}this.pendingLadder=null,this.onGround=!0,this.coyoteTimer=N.coyoteTime,this.state="ground"}}boostLift(){if(!this.ledgeBoosted)return 0;const t=at.clamp((this.ledgeTimer-this.ledgeBoostAt)/N.ledgeBoostRise,0,1);return t*t*(3-2*t)*N.ledgeBoostLift}swimAim(){const t=Math.hypot(this.velocity.x,this.velocity.y,this.velocity.z);return t<.4?0:at.clamp(-this.velocity.y/t,-1,1)}boostShowing(){return this.boostLift()/N.ledgeBoostLift}turnThrough(t,e,n){let s=e-t;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;return t+s*n}startGroundPound(){this.velocity.set(0,0,0),this.poundPhase="hover",this.poundTimer=N.groundPoundHover,this.jumpKind="normal",this.jumpStage=1,this.flipTimer=-1,this.flipProgress=0,this.jumpBufferTimer=0}updateGroundPound(t){if(this.poundPhase==="hover"){this.poundTimer-=t,this.velocity.set(0,0,0),this.poundTimer<=0&&(this.poundPhase="slam");return}this.poundPhase==="slam"&&(this.velocity.x=0,this.velocity.z=0,this.velocity.y=-34)}tryCatchLadder(t){if(this.state==="ledge"||this.poundPhase!=="none"||this.ladderCooldown>0)return!1;const e=this.world.ladderAt(this.capsuleCentre(this.scratchProbe),N.ladderSnagDistance);if(!e||this.object.position.y>e.topY-.2)return!1;const n=this.scratchSide.set(Math.sin(e.facing),0,Math.cos(e.facing));return t&&t.dot(n)<.3||!t&&this.velocity.x*n.x+this.velocity.z*n.z<.5?!1:(this.ladder=e,this.facing=e.facing,this.velocity.set(0,0,0),this.state="climb",this.snapToLadder(e),!0)}snapToLadder(t){const e=this.forwardVector(this.scratchMove);this.object.position.x=t.anchor.x-e.x*N.ladderStandOff,this.object.position.z=t.anchor.z-e.z*N.ladderStandOff,this.object.rotation.y=this.facing,this.syncCapsuleFromPosition()}updateClimb(t,e,n,s){const r=this.ladder;if(!r){this.state="air";return}if(e.wasPressed("jump")){this.leaveLadder();const c=this.forwardVector(this.scratchMove);this.velocity.set(-c.x*N.ladderJumpOff,N.jumpVelocity*.75,-c.z*N.ladderJumpOff),this.jumpHeld=!0,this.jumpKind="normal";return}const o=at.clamp(-e.move.y,-1,1);this.velocity.set(0,o*N.ladderSpeed,0);const a=r.topY-N.ladderTopFeet,l=this.object.position.y+this.velocity.y*t;this.object.position.y=at.clamp(l,r.bounds.min.y-.2,a),this.snapToLadder(r),!(l>=a&&o>.2&&this.startLadderTop(r))&&this.object.position.y<=r.bounds.min.y-.19&&this.leaveLadder()}startLadderTop(t){const e=this.scratchMove.set(Math.sin(t.facing),0,Math.cos(t.facing)),n=this.object.position.y;let s=null,r=0;for(const o of[N.ladderStandOff+.35,N.ladderStandOff+.8,N.ladderStandOff+1.25]){const a=this.scratchProbe.set(this.object.position.x+e.x*o,t.topY+1.2,this.object.position.z+e.z*o),l=this.world.groundProbe(a,1.2+N.ladderTopFeet+.9);if(!(!l||l.normal.y<ls)&&!(l.y<n-.25)){s=l.y,r=o;break}}return s===null?!1:(this.ladder=null,this.pendingLadder=null,this.climbMove="ladder-top",this.ledgeWide=!0,this.ledgeVault=!1,this.ledgeHanging=!1,this.ledgeFrom.copy(this.object.position),this.ledgeTo.set(this.object.position.x+e.x*(r+N.ladderTopStand),s,this.object.position.z+e.z*(r+N.ladderTopStand)),this.ledgeFacingFrom=this.facing,this.facing=t.facing,this.ledgeLift=s-n,this.ledgeSeconds=N.ladderTopSeconds,this.ledgeTimer=0,this.ledgeBoosted=!1,this.ledgeCooldown=0,this.ladderCooldown=N.ladderCooldown,this.velocity.set(0,0,0),this.state="ledge",!0)}ladderToClimbDown(){if(this.state!=="ground"||!this.onGround)return null;const t=this.object.position.y;for(const e of this.world.ladders)if(!(Math.abs(e.topY-t)>N.ladderMountDrop||Math.hypot(this.object.position.x-e.anchor.x,this.object.position.z-e.anchor.z)>N.ladderMountReach))return e;return null}startLadderMount(t){const e=this.scratchMove.set(Math.sin(t.facing),0,Math.cos(t.facing));this.ledgeFrom.copy(this.object.position),this.ledgeTo.set(t.anchor.x-e.x*N.ladderStandOff,t.topY-N.ladderTopFeet,t.anchor.z-e.z*N.ladderStandOff),this.climbMove="ladder-mount",this.ledgeWide=!1,this.ledgeVault=!1,this.ledgeHanging=!1,this.ledgeFacingFrom=this.facing,this.facing=t.facing,this.pendingLadder=t,this.ledgeSeconds=N.ladderMountSeconds,this.ledgeTimer=0,this.ledgeBoosted=!1,this.ledgeLift=t.topY-this.ledgeTo.y,this.ledgeCooldown=0,this.ladderCooldown=0,this.velocity.set(0,0,0),this.onGround=!1,this.crouching=!1,this.state="ledge"}leaveLadder(){this.ladder=null,this.ladderCooldown=N.ladderCooldown,this.state="air",this.velocity.set(0,0,0)}updateSwim(t,e,n,s){this.skidding=!1;const r=this.waterVolume;if(!r){this.state="air";return}const a=r.surfaceY-ti*N.floatSubmersion-this.object.position.y;this.atSurface=Math.abs(a)<.35,this.submerged=!0,this.plungeTimer>0&&(this.plungeTimer-=t);const l=e.wasPressed("crouch")||e.wasPressed("dive"),c=e.isDown("crouch")||e.isDown("dive");!this.dived&&(l||c)&&(this.dived=!0,l&&(this.plungeTimer=N.divePlunge));const h=c||this.plungeTimer>0;if(this.diving=h,this.dived&&!h&&a<this.surfaceBand&&this.velocity.y>-.5&&(this.dived=!1),this.dived){this.swimUnder(t,e,h);return}if(a>0?this.velocity.y+=Math.min(N.buoyancy,a*7)*t:this.velocity.y+=Math.max(-7.5,a*5)*t,e.wasPressed("jump")&&this.atSurface&&this.tryClimbOutOfWater())return;if(e.wasPressed("jump")&&this.strokeTimer<=0){this.strokeTimer=N.strokeCooldown;const p=this.forwardVector(this.scratchMove),g=this.atSurface?N.strokeLiftSurface:N.strokeLiftUnder;this.velocity.addScaledVector(p,N.strokeImpulse),this.velocity.y+=N.strokeImpulse*g}s>.001&&(this.turnToward(n,t,0,5.5),this.velocity.addScaledVector(n,N.swimAcceleration*s*t)),this.atSurface&&this.velocity.y>N.swimSurfaceRise&&(this.velocity.y=N.swimSurfaceRise);const d=Math.max(0,1-N.swimDrag*t);this.velocity.multiplyScalar(d);const u=Math.hypot(this.velocity.x,this.velocity.z);if(u>N.swimSpeed){const p=N.swimSpeed/u;this.velocity.x*=p,this.velocity.z*=p}}get surfaceBand(){return ti*(1-N.floatSubmersion)+N.surfaceBandMargin}swimUnder(t,e,n){const s=-e.move.y,r=e.move.x,o=(e.isDown("jump")?1:0)-(n?1:0),a=this.lookDirection(this.scratchLook),l=this.scratchMove.set(Math.cos(this.lookYaw),0,-Math.sin(this.lookYaw)).multiplyScalar(r).addScaledVector(a,s);l.x*l.x+l.z*l.z>4e-4&&this.turnToward(l,t,0,5.5),l.y+=o;const c=l.length();c>1&&l.multiplyScalar(1/c),l.multiplyScalar(N.swimSpeed),e.wasPressed("jump")&&this.strokeTimer<=0&&(this.strokeTimer=N.strokeCooldown);const h=c>.001?N.underResponse:N.underGlide;this.velocity.lerp(l,1-Math.exp(-h*t)),c<=.001&&this.velocity.lengthSq()<N.underRest*N.underRest&&this.velocity.set(0,0,0)}tryClimbOutOfWater(){const t=this.forwardVector(this.scratchMove),e=this.object.position.y;let n=null,s=0;for(const r of[N.waterExitReach,N.waterExitReach+.5]){const o=this.scratchProbe.set(this.object.position.x+t.x*r,e+N.waterExitHigh+.4,this.object.position.z+t.z*r),a=this.world.groundProbe(o,N.waterExitHigh+.4);if(!a||a.normal.y<ls)continue;const l=a.y-e;if(!(l<N.waterExitLow||l>N.waterExitHigh)){n=a.y,s=r;break}}return n===null?!1:(this.climbMove="water-exit",this.ledgeWide=!0,this.ledgeVault=!1,this.ledgeHanging=!1,this.pendingLadder=null,this.ledgeFrom.copy(this.object.position),this.ledgeTo.set(this.object.position.x+t.x*(s+N.waterExitStand),n,this.object.position.z+t.z*(s+N.waterExitStand)),this.ledgeFacingFrom=this.facing,this.ledgeLift=n-e,this.ledgeSeconds=N.waterExitSeconds,this.ledgeTimer=0,this.ledgeBoosted=!1,this.ledgeCooldown=0,this.velocity.set(0,0,0),this.submerged=!1,this.atSurface=!1,this.diving=!1,this.dived=!1,this.plungeTimer=0,this.state="ledge",!0)}integrate(t){this.againstWall=!1;const e=this.velocity.length()*t,n=Math.min(6,Math.max(1,Math.ceil(e/(kn*.75)))),s=t/n,r=this.onGround,o=this.velocity.y;this.diagnostics.collisions=0,this.onGround=!1,this.floorNormalY=1;for(let a=0;a<n;a+=1)this.moveHorizontally(s,r),this.moveVertically(s);if(this.velocity.y<=.1){const a=Math.max(this.floorNormalY,ls),l=r?N.groundSnapDistance:.04+kn*(1/a-1);this.settleOnGround(l)}this.onGround?(r||(this.poundPhase==="slam"?(this.poundPhase="landed",this.poundTimer=N.groundPoundRecovery,this.landingTimer=.17,this.events.onLand?.(this.object.position,1)):this.poundPhase!=="landed"&&(this.poundPhase="none"),this.flipTimer=-1,this.flipProgress=0,this.flipDirection=1,this.jumpKind="normal",this.wallKicks=0,this.againstWall=!1,this.wallTimer=99,this.comboWindow=this.jumpStage<3?N.jumpComboWindow:0,this.jumpStage>=3&&(this.jumpStage=1),o<-4&&(this.landingTimer=.17,this.events.onLand?.(this.object.position,Math.min(1,-o/22)))),this.coyoteTimer=N.coyoteTime,this.state==="air"&&(this.state="ground")):this.state==="ground"&&(this.state="air",this.airPresses=0),this.syncPositionFromCapsule()}moveHorizontally(t,e){const n=this.scratchMove.set(this.velocity.x*t,0,this.velocity.z*t);if(Math.hypot(n.x,n.z)<1e-6)return;const s=e?N.stepHeight:0;s>0&&this.capsule.translate(this.scratchSide.set(0,s,0)),this.capsule.translate(n),this.resolveWalls(),s>0&&this.capsule.translate(this.scratchSide.set(0,-s,0))}moveVertically(t){this.capsule.translate(this.scratchMove.set(0,this.velocity.y*t,0)),this.resolveVertical()}resolveWalls(){for(let t=0;t<4;t+=1){const e=this.world.capsuleIntersect(this.capsule);if(!e||Math.abs(e.normal.y)>.7)break;const n=this.scratchB.copy(e.normal).multiplyScalar(e.depth);if(n.y=0,n.lengthSq()<1e-10)break;this.diagnostics.collisions+=1,this.diagnostics.lastNormalY=e.normal.y,this.diagnostics.lastDepth=e.depth,this.capsule.translate(n),this.state==="air"&&(this.scratchA.set(e.normal.x,0,e.normal.z),this.scratchA.lengthSq()>1e-6&&(this.wallNormal.copy(this.scratchA).normalize(),this.wallTimer=0,this.againstWall=!0));const s=this.velocity.x*e.normal.x+this.velocity.z*e.normal.z;s<0&&(this.velocity.x-=e.normal.x*s,this.velocity.z-=e.normal.z*s)}}resolveVertical(){for(let t=0;t<4;t+=1){const e=this.world.capsuleIntersect(this.capsule);if(!e||Math.abs(e.normal.y)<.25)break;const n=e.normal.y*e.depth;if(Math.abs(n)<1e-6)break;e.normal.y>.25&&(this.floorNormalY=Math.min(this.floorNormalY,e.normal.y)),this.diagnostics.collisions+=1,this.diagnostics.lastNormalY=e.normal.y,this.diagnostics.lastDepth=e.depth,this.capsule.translate(this.scratchB.set(0,n,0)),e.normal.y<-.5&&this.velocity.y>0&&(this.velocity.y=0)}}settleOnGround(t){const e=this.capsule.start.y-kn,n=this.scratchSide.set(this.capsule.start.x,e+.25,this.capsule.start.z),s=this.world.groundProbe(n,.25+t);return!s||s.normal.y<ls?!1:(this.capsule.translate(this.scratchMove.set(0,s.y-e,0)),this.onGround=!0,this.groundNormal.copy(s.normal),this.velocity.y<0&&(this.velocity.y=0),!0)}updateJumpTimers(t,e){this.coyoteTimer>0&&(this.coyoteTimer-=t),this.jumpBufferTimer>0&&(this.jumpBufferTimer-=t),e.wasPressed("jump")&&(this.jumpBufferTimer=N.jumpBufferTime,this.jumpPower=this.charged(e,"jump"),this.jumpFromThumb=e.chargeOf("jump")!==null)}performJump(t=1){if(this.crouching){if(this.speed>=N.longJumpMinSpeed){this.performLongJump(t);return}if(this.speed<=N.backflipMaxSpeed){this.performBackflip(t);return}}this.jumpKind="normal";const e=this.comboWindow>0&&this.speed>=N.jumpComboMinSpeed;this.jumpStage=e?Math.min(3,this.jumpStage+1):1,this.velocity.y=t*(this.jumpStage===3?N.tripleJumpVelocity:this.jumpStage===2?N.doubleJumpVelocity:N.jumpVelocity),this.flipTimer=this.jumpStage===3?0:-1,this.flipDelay=N.tripleJumpFlipDelay,this.flipProgress=0,this.flipDirection=1,this.flipAxis="pitch",this.takeOff()}performLongJump(t=1){const e=this.forwardVector(this.scratchMove);this.velocity.x=e.x*N.longJumpSpeed,this.velocity.z=e.z*N.longJumpSpeed,this.velocity.y=N.longJumpVelocity*t,this.jumpKind="long",this.jumpStage=1,this.flipTimer=-1,this.flipProgress=0,this.flipDirection=1,this.flipAxis="pitch",this.takeOff()}wantsBufferedSideFlip(){return this.sideBuffer<=0||this.state!=="air"||this.jumpKind!=="normal"||this.poundPhase!=="none"?!1:this.sinceTakeOff<=N.sideFlipWindow}canSideFlip(){return this.state!=="air"||this.jumpKind!=="normal"||this.poundPhase!=="none"||!this.tookOffRunning?!1:this.sinceTakeOff<=N.sideFlipWindow&&this.sinceSideFlipPress<=N.sideFlipWindow}performSideFlip(t=1,e=!1){const n=this.forwardVector(this.scratchMove),s=Math.hypot(this.velocity.x,this.velocity.z);(!e||s<=N.sideFlipSpeed)&&(this.velocity.x=n.x*N.sideFlipSpeed,this.velocity.z=n.z*N.sideFlipSpeed);const r=this.takeOffY+N.sideFlipApex-this.object.position.y;this.velocity.y=Math.max(N.sideFlipLeastVelocity,Math.sqrt(Math.max(0,2*N.gravity*r)))*t,this.jumpKind="side",this.jumpStage=1,this.flipTimer=0,this.flipDelay=N.tripleJumpFlipDelay,this.flipProgress=0,this.flipDirection=1,this.flipAxis="roll",this.jumpHeld=!0,this.sinceSideFlipPress=99,this.sinceTakeOff=99}performBackflip(t=1){const e=this.forwardVector(this.scratchMove);this.velocity.x=-e.x*N.backflipSpeed,this.velocity.z=-e.z*N.backflipSpeed,this.velocity.y=N.backflipVelocity*t,this.jumpKind="back",this.jumpStage=1,this.flipTimer=0,this.flipDelay=N.tripleJumpFlipDelay,this.flipProgress=0,this.flipDirection=-1,this.flipAxis="pitch",this.takeOff()}performWallKick(){this.velocity.x=this.wallNormal.x*N.wallKickSpeed,this.velocity.z=this.wallNormal.z*N.wallKickSpeed,this.velocity.y=N.wallKickVelocity,this.facing=Math.atan2(this.wallNormal.x,this.wallNormal.z),this.wallKicks+=1,this.wallTimer=99,this.againstWall=!1,this.jumpKind="wall",this.jumpStage=1,this.flipTimer=-1,this.flipProgress=0,this.flipDirection=1,this.flipAxis="pitch",this.takeOff()}takeOff(){this.airPresses=0,this.sinceTakeOff=0,this.takeOffY=this.object.position.y,this.tookOffRunning=this.speed>N.walkSpeed+.6,this.poundPhase="none",this.comboWindow=0,this.jumpHeld=!0,this.jumpBufferTimer=0,this.coyoteTimer=0,this.onGround=!1,this.crouching=!1,this.braking=!1,this.state="air"}updateFlip(t){if(this.flipTimer<0)return;if(this.state!=="air"){this.flipTimer=-1,this.flipProgress=0;return}const e=this.predictTimeToLand(),n=this.flipTimer+e;if(this.flipDelay=at.clamp((n-N.tripleJumpFlipMinAirtime)*N.tripleJumpFlipDelayShare,N.tripleJumpFlipDelayMin,N.tripleJumpFlipDelay),this.flipTimer<this.flipDelay)return;const s=e-N.tripleJumpLandMargin,r=Math.max(t,s),o=(1-this.flipProgress)/r;this.flipProgress=Math.min(1,this.flipProgress+o*t)}predictTimeToLand(){const t=this.scratchSide.set(this.object.position.x,this.object.position.y+.3,this.object.position.z),e=this.world.groundProbe(t,80);if(!e)return 1/0;let n=Math.max(0,this.object.position.y-e.y);const s=N.gravity,r=N.gravity*N.fallGravityMultiplier;let o=0,a=this.velocity.y;a>0&&(o+=a/s,n+=a*a/(2*s),a=0);const l=-a;return o+=(-l+Math.sqrt(l*l+2*r*n))/r,o}get flipping(){return this.flipTimer>=this.flipDelay&&this.flipProgress<1}get somersaultProgress(){return this.flipTimer<0?0:this.flipProgress}updateWaterState(){const t=this.state==="swim",e=t?ti*.12:ti*.5,n=this.scratchB.set(this.object.position.x,this.object.position.y+e,this.object.position.z),s=this.world.waterAt(n);if(this.waterVolume=s,s&&!t){const r=-this.velocity.y;this.state="swim",this.submerged=!0,this.dived=!1,this.plungeTimer=0,this.velocity.y*=.22,this.velocity.x*=.65,this.velocity.z*=.65,r>N.splashSpeed&&this.events.onSplash?.(new T(this.object.position.x,s.surfaceY,this.object.position.z),Math.min(1,r/18))}else!s&&t&&(this.state=this.onGround?"ground":"air",this.submerged=!1,this.atSurface=!1,this.diving=!1,this.dived=!1,this.plungeTimer=0,this.leftWaterTimer=N.waterExitGrace,this.airPresses=0,this.jumpBufferTimer=0)}findCarryTarget(){if(this.carried)return null;let t=null,e=1/0;const n=this.forwardVector(this.scratchMove);for(const s of this.carryables){if(s.held||s.pickupCooldown>0)continue;const r=this.scratchSide.copy(s.position).sub(this.object.position),o=Math.abs(r.y);r.y=0;const a=r.length();if(a>N.carryReach+s.radius||o>ti)continue;const l=a>.001?n.dot(r.divideScalar(a)):1;if(l<-.35)continue;const c=a-l*.5;c<e&&(e=c,t=s)}return t}updateCarry(t,e){if(!e.wasPressed("grab"))return;if(this.carried){this.throwCarried();return}const n=this.findCarryTarget();n&&(n.pickUp(),this.carried=n,this.rig.carryAnchor.add(n.object3d),n.object3d.position.set(0,0,0))}throwCarried(){const t=this.carried;if(!t)return;const e=t.object3d.getWorldPosition(new T),n=this.object.parent;this.rig.carryAnchor.remove(t.object3d),n?.add(t.object3d),t.object3d.position.copy(e);const s=this.forwardVector(this.scratchMove),r=new T().addScaledVector(s,N.throwSpeed).add(new T(this.velocity.x*.4,N.throwLift,this.velocity.z*.4));t.release(r),this.carried=null}dropCarried(){this.carried&&this.throwCarried()}updateRecovery(t){this.safePositionTimer-=t,this.safePositionTimer<=0&&this.state==="ground"&&this.onGround&&this.speed<7&&this.groundUnderCentre()&&(this.safePositionTimer=.45,this.lastSafePosition.copy(this.object.position)),this.object.position.y<N.killPlaneY&&this.respawn()}groundUnderCentre(){const t=this.object.position,e=new T(t.x,t.y+.3,t.z),n=this.world.groundProbe(e,.6);return n!==null&&Math.abs(n.y-t.y)<.2&&n.normal.y>.6}respawn(){this.dropCarried(),this.object.position.copy(this.lastSafePosition),this.object.position.y+=.2,this.velocity.set(0,0,0),this.state="air",this.syncCapsuleFromPosition(),this.events.onRespawn?.()}setSafePosition(t){this.lastSafePosition.copy(t)}rideAlong(t,e,n,s,r,o){this.object.position.set(t,e,n),this.facing=s,this.velocity.set(r,0,o),this.state="ground",this.syncCapsuleFromPosition()}poseStanding(t){this.state="ground",this.velocity.set(0,0,0),this.landingTimer=0,this.animationTime+=t,this.syncModel(t,0)}teleport(t,e=this.facing){this.dropCarried(),this.object.position.copy(t),this.facing=e,this.velocity.set(0,0,0),this.state="air",this.lastSafePosition.copy(t),this.syncCapsuleFromPosition()}targetSpeedFor(t){const e=t<=.55?at.lerp(0,N.walkSpeed,t/.55):at.lerp(N.walkSpeed,N.runSpeed,(t-.55)/.45);return this.carried?e*N.carrySpeedMultiplier:e}turnToward(t,e,n,s){if(t.lengthSq()<1e-4)return;const r=Math.atan2(t.x,t.z),o=s??at.lerp(N.turnRateSlow,N.turnRateFast,at.clamp(n/N.runSpeed,0,1));let a=r-this.facing;for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;const l=at.clamp(a,-o*e,o*e);this.facing+=l}forwardVector(t){return t.set(Math.sin(this.facing),0,Math.cos(this.facing))}capsuleCentre(t){return t.copy(this.capsule.start).add(this.capsule.end).multiplyScalar(.5)}syncPositionFromCapsule(){this.object.position.set(this.capsule.start.x,this.capsule.start.y-kn,this.capsule.start.z)}syncCapsuleFromPosition(){const t=this.object.position;this.capsule.start.set(t.x,t.y+kn,t.z),this.capsule.end.set(t.x,t.y+ti-kn,t.z)}syncModel(t,e){this.object.rotation.y=this.facing,this.state==="ground"&&this.speed>.6?(this.footstepPhase+=this.speed*t,this.footstepPhase>1.6&&(this.footstepPhase=0,this.events.onFootstep?.(this.object.position))):this.footstepPhase=0;const n={time:this.animationTime,delta:t,state:this.state,speed:this.speed,maxSpeed:N.runSpeed,verticalSpeed:this.velocity.y,skidding:this.skidding,landing:this.landingTimer>0,carrying:this.carried!==null,submerged:this.submerged&&!this.atSurface,diving:this.diving&&this.state==="swim",jumpStage:this.jumpStage,flipAngle:this.flipTimer<0?0:this.flipProgress*Math.PI*2*this.flipDirection,flipAxis:this.flipAxis,poundPhase:this.poundPhase,climbing:this.state==="climb",climbSpeed:this.state==="climb"?this.velocity.y:0,flipping:this.flipping,crouching:this.crouching,braking:this.braking,brakeStrength:this.braking?this.brakeStrength:0,jumpKind:this.jumpKind,againstWall:this.againstWall,ledgeProgress:this.ledgeTimer<0?0:Math.min(1,this.ledgeTimer/this.ledgeSeconds),ledgeWide:this.ledgeWide,ledgeMove:this.climbMove,ledgeHanging:this.ledgeHanging,ledgeGrip:this.gripPhase,ledgeShimmy:this.gripMoving,ledgeLift:this.ledgeLift,ledgeBoost:this.boostShowing(),swimAim:this.swimAim(),windUp:this.windUp,strokeProgress:this.strokeTimer>0?1-this.strokeTimer/N.strokeCooldown:1};dx(this.rig,n)}get carryAnchor(){return this.rig.carryAnchor}}const ra=.22,mh=180,Rx=.5;class Px{constructor(){K(this,"move",new Mt);K(this,"look",new Mt);K(this,"gamepadConnected",!1);K(this,"lastKey","—");K(this,"lastKeyRecognised",!1);K(this,"usingGamepad",!1);K(this,"keys",new Set);K(this,"held",new Set);K(this,"touchStick",null);K(this,"virtualHeld",new Set);K(this,"charging",new Map);K(this,"chargeAtPress",new Map);K(this,"pendingPresses",new Set);K(this,"pendingReleases",new Set);K(this,"pressedThisFrame",new Set);K(this,"releasedThisFrame",new Set);K(this,"mouseDelta",new Mt);K(this,"pointerLocked",!1);K(this,"pointerLockWanted",!1);K(this,"discardNextMouseMove",!1);K(this,"previousButtons",[]);K(this,"element",null);K(this,"disposers",[])}attach(t){this.element=t;const e=h=>{if(h.repeat)return;this.keys.add(h.code),this.lastKey=h.code,this.lastKeyRecognised=_h.has(h.code)||oa[h.code]!==void 0||h.code==="ShiftLeft"||h.code==="ShiftRight",this.usingGamepad=!1;const d=oa[h.code];d&&(this.press(d),d!=="pause"&&h.preventDefault()),_h.has(h.code)&&h.preventDefault()},n=h=>{this.keys.delete(h.code);const d=oa[h.code];d&&this.release(d)},s=()=>this.clear(),r=h=>{if(this.pointerLocked){if(this.discardNextMouseMove){this.discardNextMouseMove=!1;return}this.mouseDelta.x+=gh(h.movementX),this.mouseDelta.y+=gh(h.movementY),this.usingGamepad=!1}},o=()=>{const h=document.pointerLockElement===this.element;h&&!this.pointerLocked&&(this.discardNextMouseMove=!0,this.mouseDelta.set(0,0)),this.pointerLocked=h},a=()=>{this.pointerLockWanted&&!this.pointerLocked&&this.requestPointerLock()},l=()=>{this.gamepadConnected=!0},c=()=>{this.gamepadConnected=navigator.getGamepads().some(h=>h!==null)};window.addEventListener("keydown",e),window.addEventListener("keyup",n),window.addEventListener("blur",s),document.addEventListener("mousemove",r),document.addEventListener("pointerlockchange",o),t.addEventListener("mousedown",a),window.addEventListener("gamepadconnected",l),window.addEventListener("gamepaddisconnected",c),this.disposers=[()=>window.removeEventListener("keydown",e),()=>window.removeEventListener("keyup",n),()=>window.removeEventListener("blur",s),()=>document.removeEventListener("mousemove",r),()=>document.removeEventListener("pointerlockchange",o),()=>t.removeEventListener("mousedown",a),()=>window.removeEventListener("gamepadconnected",l),()=>window.removeEventListener("gamepaddisconnected",c)]}setTouchStick(t,e=0){this.touchStick=t===null?null:{x:t,y:e},t!==null&&(this.usingGamepad=!1)}addLook(t,e){this.mouseDelta.x+=t,this.mouseDelta.y+=e,this.usingGamepad=!1}beginCharge(t,e){this.charging.set(t,{start:performance.now(),seconds:Math.max(.01,e)}),this.usingGamepad=!1}chargeNow(t){const e=this.charging.get(t);return e?Math.min(1,(performance.now()-e.start)/(e.seconds*1e3)):0}chargingAction(){let t=null,e=-1/0;for(const[n,s]of this.charging)s.start>=e&&(e=s.start,t=n);return t}releaseCharge(t){const e=this.chargeNow(t);this.charging.delete(t),this.chargeAtPress.set(t,e),this.pressAction(t),this.holdAction(t,!1)}cancelCharge(t){this.charging.delete(t)}chargeOf(t){return this.chargeAtPress.get(t)??null}pressAction(t){this.pendingPresses.add(t),this.held.add(t),this.virtualHeld.add(t),this.usingGamepad=!1}holdAction(t,e){if(e){this.held.has(t)||this.pressAction(t);return}this.virtualHeld.delete(t),this.held.delete(t)&&this.pendingReleases.add(t)}releaseTouch(){this.touchStick=null;for(const t of Array.from(this.charging.keys()))this.cancelCharge(t);for(const t of Array.from(this.virtualHeld))this.holdAction(t,!1)}dispose(){for(const t of this.disposers)t();this.disposers=[],this.clear()}update(t,e){for(const o of Array.from(this.chargeAtPress.keys()))this.pendingPresses.has(o)||this.chargeAtPress.delete(o);this.pressedThisFrame.clear(),this.releasedThisFrame.clear();for(const o of this.pendingPresses)this.pressedThisFrame.add(o);for(const o of this.pendingReleases)this.releasedThisFrame.add(o);this.pendingPresses.clear(),this.pendingReleases.clear(),this.move.set(0,0),this.look.set(0,0);let n=0,s=0;(this.keys.has("KeyE")||this.keys.has("ArrowUp"))&&(s-=1),(this.keys.has("KeyD")||this.keys.has("ArrowDown"))&&(s+=1),(this.keys.has("KeyS")||this.keys.has("ArrowLeft"))&&(n-=1),(this.keys.has("KeyF")||this.keys.has("ArrowRight"))&&(n+=1),(n!==0||s!==0)&&(this.move.set(n,s).normalize(),(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"))&&this.move.multiplyScalar(.45)),this.touchStick&&this.move.set(this.touchStick.x,this.touchStick.y),this.look.x+=this.mouseDelta.x*.0022*t,this.look.y+=this.mouseDelta.y*.0022*t*(e?-1:1),this.mouseDelta.set(0,0);const r=.035*t;this.keys.has("KeyJ")&&(this.look.x-=r),this.keys.has("KeyL")&&(this.look.x+=r),this.keys.has("KeyI")&&(this.look.y-=r*(e?-1:1)),this.keys.has("KeyK")&&(this.look.y+=r*(e?-1:1)),this.pollGamepad(t,e)}pollGamepad(t,e){const n=navigator.getGamepads?navigator.getGamepads():[];let s=null;for(const h of n)if(h&&h.connected){s=h;break}if(!s){this.previousButtons=[];return}this.gamepadConnected=!0;const r=Yr(s.axes[0]??0),o=Yr(s.axes[1]??0);if(r!==0||o!==0){const h=Math.min(1,Math.hypot(r,o)),d=Math.hypot(r,o)||1;this.move.set(r/d*h,o/d*h),this.usingGamepad=!0}const a=Yr(s.axes[2]??0),l=Yr(s.axes[3]??0);(a!==0||l!==0)&&(this.look.x+=a*.045*t,this.look.y+=l*.035*t*(e?-1:1),this.usingGamepad=!0);const c=s.buttons.map(h=>h.pressed||h.value>Rx);for(const[h,d]of Object.entries(Cx)){const u=Number(h),p=c[u]===!0,g=this.previousButtons[u]===!0;p&&!g?(this.held.has(d)||this.pressedThisFrame.add(d),this.held.add(d),this.usingGamepad=!0):!p&&g&&this.held.delete(d)&&this.releasedThisFrame.add(d)}this.previousButtons=c}press(t){this.held.has(t)||this.pendingPresses.add(t),this.held.add(t)}release(t){this.held.delete(t)&&this.pendingReleases.add(t)}isDown(t){return this.held.has(t)}wasPressed(t){return this.pressedThisFrame.has(t)}wasReleased(t){return this.releasedThisFrame.has(t)}get moveStrength(){return Math.min(1,this.move.length())}setPointerLockWanted(t){this.pointerLockWanted=t,!t&&this.pointerLocked&&document.exitPointerLock()}togglePointerLock(){this.pointerLocked?(this.pointerLockWanted=!1,document.exitPointerLock()):(this.pointerLockWanted=!0,this.requestPointerLock())}requestPointerLock(){if(!this.element||this.pointerLocked)return;const t=this.element.requestPointerLock();t&&typeof t.catch=="function"&&t.catch(()=>{})}get isPointerLocked(){return this.pointerLocked}clear(){this.keys.clear(),this.held.clear(),this.pendingPresses.clear(),this.pendingReleases.clear(),this.pressedThisFrame.clear(),this.releasedThisFrame.clear(),this.mouseDelta.set(0,0),this.move.set(0,0),this.look.set(0,0),this.discardNextMouseMove=!0}}function gh(i){return Number.isFinite(i)?Math.max(-mh,Math.min(mh,i)):0}function Yr(i){return Math.abs(i)<ra?0:Math.sign(i)*((Math.abs(i)-ra)/(1-ra))}const oa={Space:"jump",KeyR:"grab",KeyC:"crouch",KeyQ:"dive",ControlLeft:"dive",KeyL:"togglePointerLock",Escape:"pause",KeyW:"interact",KeyA:"sideFlip",KeyG:"climbDown",KeyD:"back",ArrowDown:"back"},Cx={0:"jump",2:"grab",3:"sideFlip",1:"dive",6:"crouch",9:"pause"},_h=new Set(["KeyE","KeyS","KeyD","KeyF","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]),Se=.45,Tn=1/Se,Lx=[-16,1.005,14],Dx=i=>!["water","cloud"].includes(i),aa=(i,t)=>i.reduce((e,n,s)=>e+n*t[s],0);function xh(i){const t=new Map,e=[];for(const o of i.exposedFaces()){if(!Dx(o.type))continue;const{n:a,u:l,v:c}=li[o.direction],h=[o.x+.5,o.y+.5,o.z+.5],d=aa(h,a)+.5,u=o.direction+","+d;t.has(u)||t.set(u,{n:a,u:l,v:c,plane:d,tiles:new Map});const p=aa(h,l)-.5,g=aa(h,c)-.5;t.get(u).tiles.set(p+","+g,[p,g])}for(const{n:o,u:a,v:l,plane:c,tiles:h}of t.values())for(const[d,[u,p]]of h){if(!h.has(d))continue;let g=1,_=1;for(;h.has(u+g+","+p);)g++;const m=M=>{for(let E=u;E<u+g;E++)if(!h.has(E+","+M))return!1;return!0};for(;m(p+_);)_++;for(let M=u;M<u+g;M++)for(let E=p;E<p+_;E++)h.delete(M+","+E);const f=[[u,p],[u+g,p],[u+g,p+_],[u,p+_]].map(([M,E])=>o.map((v,R)=>(v*c+a[R]*M+l[R]*E)*Se));for(const M of[0,1,2,0,2,3])e.push(...f[M])}const n=new De;n.setAttribute("position",new $t(e,3));const s=new Zt(n,new Hi),r=new ox;return s.name="Seamless island collision surfaces",r.addSolid(s),r.addWater(new Ln(new T(Vn.minX,Vn.bottom+1,Vn.minZ).multiplyScalar(Se),new T(Vn.maxX,Vn.level,Vn.maxZ).multiplyScalar(Se)),Vn.level*Se,(o,a)=>i.get(Math.floor(o/Se),0,Math.floor(a/Se))?.type==="water"),{collision:r,mesh:s,triangles:e.length/9,revision:i.revision}}function Ix(){const t=new Uint8Array(4096);for(let n=0;n<32;n++)for(let s=0;s<32;s++){const r=Math.hypot((s+.5)/32*2-1,(n+.5)/32*2-1),o=Math.max(0,1-r)**1.8;t.set([255,255,255,Math.round(o*255)],(n*32+s)*4)}const e=new Rl(t,32,32,rn);return e.needsUpdate=!0,e}function Ux(i){let t=xh(i),e="",n=[];const s=[],r=new T(...Lx).multiplyScalar(Se),o=new Ax(t.collision,r,{},{plain:!0}),a=new Px,l=new ce;o.facing=Math.PI,l.name="Existing clay avatar",l.scale.setScalar(Tn),l.position.y=.1,l.add(o.object);const c=new Map;o.object.traverse(g=>{g.isMesh&&c.set(g,g.material)});const h=new Zt(new fr(1.6,1.6),new Hi({color:"#29452b",map:Ix(),transparent:!0,opacity:.32,depthWrite:!1}));h.name="Soft avatar contact shadow",h.userData.avatarShadow=!0,h.rotation.x=-Math.PI/2,l.add(h);const d=new T,u=new T(0,-1,0),p={root:l,player:o,input:a,shadow:h,get collision(){return t.collision},get colliderTriangles(){return t.triangles},addCollision(g){s.push(g),t.collision.addSolid(g)},get position(){return o.position.clone().multiplyScalar(Tn)},focus(g=new T){return o.getFocusPoint(g).multiplyScalar(Tn).add(l.position)},step(g,_,m=0){o.update(g,a,_,m),d.copy(o.position),d.y+=.3;const f=t.collision.groundHeightBelow(d,7),M=Math.max(0,o.position.y-f);h.visible=Number.isFinite(f)&&M<6&&o.state!=="swim",h.visible&&(h.position.set(o.position.x,f+.018,o.position.z),h.material.opacity=.32/(1+M*.4),h.scale.setScalar(1+M*.08))},reset(){a.clear(),a.releaseTouch(),o.teleport(r,Math.PI)},setQuality(g){if(g===e)return;e=g;for(const m of n)m.dispose();n=[];const _=new Map;for(const[m,f]of c){if(g==="high")m.material=f;else{if(!_.has(f)){const M=new Me({color:f.color});_.set(f,M),n.push(M)}m.material=_.get(f)}m.castShadow=!1,m.receiveShadow=g!=="low"}},cameraDistance(g,_){d.copy(g).multiplyScalar(Se),u.copy(_).sub(g);const m=u.length();return m<.001?m:(u.normalize(),t.collision.raycast(d,u,m*Se)*Tn)},rebuildCollision(){const g=xh(i),_=t.collision;_.octree.clear(),_.solids.length=0;for(const M of[g.mesh,...s])_.addSolid(M);_.waters.splice(0,_.waters.length,...g.collision.waters),t.mesh.geometry.dispose(),t.mesh.material.dispose(),t={...g,collision:_};const m=o.position.clone().multiplyScalar(Tn),f=Es(m.x,m.z);f!==null&&m.y<f&&p.reset()}};return p.setQuality("low"),p}function Nx(i,t){const e=document.createElement("div");e.className="avatar-touch",e.hidden=!0,e.innerHTML=`
  <div class="move-pad" id="island-move-pad" role="group" aria-label="Touch anywhere on the left to move"><div class="move-pad__base" hidden><span class="move-pad__knob"></span><span class="move-pad__label">Move</span></div></div>
  <div class="avatar-actions"><button type="button" data-action="crouch" tabindex="-1">Crouch</button><button type="button" data-action="jump" tabindex="-1">Jump</button></div>
  <div class="kart-touch" hidden>
   <div class="kart-touch__steering" role="group" aria-label="Kart steering buttons">
    <button type="button" data-action="driveLeft" aria-label="Steer left" tabindex="-1"><span aria-hidden="true">←</span><small>Left</small></button>
    <button type="button" data-action="driveRight" aria-label="Steer right" tabindex="-1"><span aria-hidden="true">→</span><small>Right</small></button>
   </div>
   <button type="button" class="kart-touch__brake" data-action="driveBrake" aria-label="Hold to brake and reverse" tabindex="-1"><span aria-hidden="true">↓</span>Brake / Reverse</button>
   <button type="button" class="kart-touch__gas" data-action="driveGas" aria-label="Hold to accelerate" tabindex="-1">Gas<small>Hold to accelerate</small></button>
  </div>`,t.append(e);const n=e.querySelector(".move-pad"),s=e.querySelector(".move-pad__base"),r=e.querySelector(".move-pad__knob"),o=e.querySelector(".avatar-actions"),a=e.querySelector(".kart-touch"),l=new Map;let c=null,h=0,d=0,u=!1;function p(f){if(f.pointerId!==c)return;const M=(f.clientX-h)/42,E=(f.clientY-d)/42,v=Math.hypot(M,E),R=Math.max(1,v);if(r.style.transform=`translate(${M/R*34}px,${E/R*34}px)`,v<.14)i.setTouchStick(0,0);else{const A=Math.min(1,(v-.14)/.86);i.setTouchStick(M/v*A,E/v*A)}f.preventDefault()}n.addEventListener("pointerdown",f=>{if(u||c!==null||f.button>0)return;f.preventDefault(),f.stopPropagation(),c=f.pointerId,h=f.clientX,d=f.clientY;const M=n.getBoundingClientRect();s.style.left=h-M.left+"px",s.style.top=d-M.top+"px",s.hidden=!1,n.setPointerCapture(c),n.classList.add("is-down"),p(f)}),n.addEventListener("pointermove",p);function g(f){f.pointerId===c&&(c=null,s.hidden=!0,r.style.transform="",n.classList.remove("is-down"),i.setTouchStick(null),_(n,f.pointerId));const M=l.get(f.pointerId);if(!M)return;l.delete(f.pointerId),i.holdAction(M,!1);const E=e.querySelector(`[data-action="${M}"]`);E.classList.remove("is-down"),E.setAttribute("aria-pressed","false"),_(E,f.pointerId)}function _(f,M){f.hasPointerCapture(M)&&f.releasePointerCapture(M)}n.addEventListener("lostpointercapture",g);for(const f of e.querySelectorAll("[data-action]"))f.setAttribute("aria-pressed","false"),f.addEventListener("pointerdown",M=>{if(M.button>0)return;M.preventDefault(),M.stopPropagation();const E=f.dataset.action;[...l.values()].includes(E)||(l.set(M.pointerId,E),f.setPointerCapture(M.pointerId),f.classList.add("is-down"),f.setAttribute("aria-pressed","true"),i.holdAction(E,!0))}),f.addEventListener("lostpointercapture",g);for(const f of["pointerup","pointercancel"])document.addEventListener(f,g,!0);function m(){c!==null&&g({pointerId:c});for(const f of[...l.keys()])g({pointerId:f});i.releaseTouch(),i.clear()}return window.addEventListener("blur",m),window.addEventListener("pagehide",m),document.addEventListener("visibilitychange",()=>{document.hidden&&m()}),e.addEventListener("contextmenu",f=>f.preventDefault()),{root:e,clear:m,setVisible(f){f||m(),e.hidden=!f},setDriving(f){f!==u&&(m(),u=f,n.hidden=f,o.hidden=f,a.hidden=!f)}}}function pd(i){const t=[],e=new T,n=new T,s=new T;return i.traverse(r=>{if(!r.isMesh)return;const o=r.geometry.getAttribute("position"),a=r.geometry.index,l=r.material.color??new Wt("#b9b2a6"),c=Array.from({length:32},(u,p)=>l.clone().multiplyScalar(.55+p/31*.65).getStyle()),h=Array.from({length:o.count},()=>[0,0,0]),d=[];for(let u=0;u<(a?.count??o.count);u+=3){const p=[0,1,2].map(_=>a?a.getX(u+_):u+_),g={points:p.map(_=>h[_]),normal:[0,0,0],avatar:!0,css:c[20],alpha:1};d.push(g)}t.push({mesh:r,position:o,vertices:h,triangles:d,shades:c})}),()=>{i.updateWorldMatrix(!0,!0);const r=[];for(const{mesh:o,position:a,vertices:l,triangles:c,shades:h}of t){let d=!0;for(let u=o;u;u=u.parent)if(!u.visible){d=!1;break}if(d){for(let u=0;u<a.count;u++)e.fromBufferAttribute(a,u).applyMatrix4(o.matrixWorld),e.toArray(l[u]);for(const u of c){n.fromArray(u.points[1]).sub(e.fromArray(u.points[0])),s.fromArray(u.points[2]).sub(e),n.cross(s).normalize().toArray(u.normal);const p=Math.max(0,Math.min(1,.45+u.normal[1]*.4-u.normal[0]*.22-u.normal[2]*.16));u.css=h[Math.round(p*31)]}r.push(...c)}}return r}}function Fx(i){const t=pd(i.player.object),e=new T,n={points:Array.from({length:16},()=>[0,0,0]),normal:[0,1,0],avatar:!0,css:"#29452b",alpha:.18};return()=>{i.root.updateMatrixWorld(!0);const s=t();if(!i.shadow.visible)return s;for(let r=0;r<16;r++){const o=r/16*Math.PI*2;e.set(Math.cos(o)*.65,Math.sin(o)*.65,0).applyMatrix4(i.shadow.matrixWorld),e.toArray(n.points[r])}return n.alpha=i.shadow.material.opacity*.6,[...s,n]}}const cr={z:-150},Li=13,co=1.1,Ke=Li+co,vh=1.2,Ox=92.4,zx=-270,kx=[[50,85,0],[85,45,0],[155,40,0],[540,40,0],[580,60,0],[590,95,0],[575,120,0],[510,120,0],[465,118,0],[435,92,0],[405,85,0],[155,85,0],[115,90,0],[100,115,0],[98,140,0],[113,163,0],[155,170,0],[245,170,0],[275,180,0],[300,210,2],[305,240,7],[287,270,8],[205,355,8],[185,390,4],[195,425,0],[222,442,0],[245,432,0],[252,403,0],[268,373,0],[300,363,0],[423,363,0],[449,376,0],[465,424,0],[487,442,0],[525,445,0],[562,424,0],[586,389,0],[602,351,0],[598,306,0],[580,267,0],[553,239,0],[520,225,0],[485,230,0],[450,253,0],[422,276,0],[390,283,0],[170,283,0],[137,301,0],[118,315,0],[89,311,0],[65,294,0],[50,270,0],[48,100,0]],la=new Ll(kx.map(([i,t,e])=>new T(i*vh+Ox,e,t*vh+zx)),!0,"centripetal"),Di=1200,jn=Array.from({length:Di+1},(i,t)=>{const e=la.getPointAt(t/Di),n=la.getTangentAt(t/Di),s=new T(-n.z,0,n.x).normalize();return{point:e,normal:s,distance:t/Di*la.getLength()}}),Ze={minX:128,maxX:154,minZ:cr.z-10,maxZ:cr.z+10},sn=(i,t,e=0)=>i.point.clone().addScaledVector(i.normal,t).add(new T(0,e,0)),ll=i=>i.x<145&&Math.abs(i.z-cr.z)<9,Wl=[],ri=[];for(let i=0;i<Di;i++){const t=jn[i],e=jn[i+1];Wl.push({a:t.point,b:e.point,halfWidth:Ke,corners:[sn(t,-Ke),sn(e,-Ke),sn(e,Ke),sn(t,Ke)]});for(const n of[-1,1]){const s=sn(t,n*(Ke+.15)),r=sn(e,n*(Ke+.15));!ll(s)&&!ll(r)&&ri.push({a:s,b:r})}}ri.push({a:new T(130,0,Ze.minZ),b:new T(136,0,Ze.minZ)},{a:new T(130,0,Ze.maxZ),b:new T(136,0,Ze.maxZ)});function ca(i,t,e=0,n=!1,s=!1){const r=[],o=[];for(let l=0;l<Di;l++){const c=jn[l],h=jn[l+1];if(s&&ll(sn(c,t)))continue;const d=[sn(c,i,e),sn(h,i,e),sn(h,t,e),sn(c,t,e)],u=new Wt(Math.floor(c.distance/3)%2?"#f4f3ef":"#dc2828");for(const p of t>i?[0,2,1,0,3,2]:[0,1,2,0,2,3])r.push(...d[p].toArray()),n&&o.push(u.r,u.g,u.b)}const a=new De;return a.setAttribute("position",new $t(r,3)),n&&a.setAttribute("color",new $t(o,3)),a.computeVertexNormals(),a}function Bx(){const i=new ce;i.name="Floating winding circuit";const t=new Me({color:"#25272b",side:ze}),e=new Zt(ca(-Ke,Ke),t);e.receiveShadow=!0,i.add(e);const n=[];for(let _=0;_<Di;_++)for(const m of[-1,1]){const f=sn(jn[_],m*Ke),M=sn(jn[_+1],m*Ke),E=[f,M,M.clone().add(new T(0,-.65,0)),f.clone().add(new T(0,-.65,0))];for(const v of[0,1,2,0,2,3])n.push(...E[v].toArray())}const s=new De;s.setAttribute("position",new $t(n,3)),s.computeVertexNormals(),i.add(new Zt(s,new Me({color:"#555b65",side:ze})));const r=new Zt(ca(-Ke,Ke,-.65),new Me({color:"#424750",side:ze}));i.add(r);const o=new Me({vertexColors:!0,side:ze});for(const _ of[-1,1])i.add(new Zt(ca(_*Li,_*Ke,.04,!0,!0),o));const a=new Zt(new pn(Ze.maxX-Ze.minX,.65,Ze.maxZ-Ze.minZ),t);a.position.set((Ze.minX+Ze.maxX)/2,-.325,cr.z),a.receiveShadow=!0,i.add(a);for(const _ of[-1,1])for(let m=128;m<136;m+=2){const f=new Zt(new pn(2,.06,.9),new Me({color:m/2%2?"#f4f3ef":"#dc2828"}));f.position.set(m+1,.03,cr.z+_*9.55),i.add(f)}const l=new Me({color:"#a5adb8"}),c=new el(new pn(.16,.16,1),l,ri.length*2),h=new el(new pn(.18,1.18,.18),l,Math.ceil(ri.length/3)),d=new we,u=new T(0,0,1);let p=0,g=0;for(let _=0;_<ri.length;_++){const{a:m,b:f}=ri[_],M=f.clone().sub(m);for(const E of[.55,1.08])d.position.copy(m).add(f).multiplyScalar(.5),d.position.y+=E,d.quaternion.setFromUnitVectors(u,M.clone().normalize()),d.scale.set(1,1,M.length()+.04),d.updateMatrix(),c.setMatrixAt(p++,d.matrix);_%3===0&&(d.position.copy(m),d.position.y+=.59,d.quaternion.identity(),d.scale.set(1,1,1),d.updateMatrix(),h.setMatrixAt(g++,d.matrix))}return c.instanceMatrix.needsUpdate=!0,h.count=g,h.instanceMatrix.needsUpdate=!0,i.add(c,h),i}function Hx({bodyColor:i="#df3438"}={}){const t=new ce;t.name="Go-kart prototype",t.userData.drivable=!1;const e=new Me({color:"#919aa6"}),n=new Me({color:"#171b22"}),s=new Me({color:"#c9d0d8"}),r=new Me({color:"#414b5b"}),o=new Me({color:"#24334f"}),a=new T(0,1,0);function l(v,R,A,C=.035,I="frame tube"){const S=new T(...R),b=new T(...A),L=b.clone().sub(S),P=new Zt(new _s(C,C,L.length(),8),e);return P.name=I,P.position.copy(S).add(b).multiplyScalar(.5),P.quaternion.setFromUnitVectors(a,L.normalize()),P.castShadow=!0,v.add(P),P}function c(v,R,A=.035){R.forEach((C,I)=>l(v,C,R[(I+1)%R.length],A))}const h=new ce;h.name="chassis",t.add(h),c(h,[[-.7,.3,-1.2],[.7,.3,-1.2],[.7,.3,.8],[.5,.3,1.35],[-.5,.3,1.35],[-.7,.3,.8]]);for(const v of[-1,-.55,.2,.85])l(h,[-.7,.3,v],[.7,.3,v]);for(const v of[-1,1])l(h,[v*.7,.3,-1.15],[v*.76,.55,-.9]),l(h,[v*.76,.55,-.9],[v*.76,.55,.25]),l(h,[v*.76,.55,.25],[v*.7,.3,.6]);const d=new ce;d.name="seat_frame",t.add(d),c(d,[[-.35,.4,-.75],[.35,.4,-.75],[.35,.4,-.12],[-.35,.4,-.12]],.03),c(d,[[-.35,.4,-.75],[.35,.4,-.75],[.35,1.02,-.94],[-.35,1.02,-.94]],.03),l(d,[-.35,.7,-.84],[.35,.7,-.84],.025);for(const v of[-1,1])l(d,[v*.35,.4,-.75],[v*.52,.3,-.95],.03);for(const[v,R]of[["front_axle",1.03],["rear_axle",-1]]){const A=new ce;A.name=v,t.add(A),l(A,[-1.05,.38,R],[1.05,.38,R],.045);for(const[C,I]of[["left",-1],["right",1]]){const S=new ce;S.name=`${v}_${C}_wheel`,S.position.set(I*1.04,.38,R),A.add(S);const b=[[.2,-.14],[.32,-.14],[.37,-.105],[.38,-.06],[.38,.06],[.37,.105],[.32,.14],[.2,.14],[.2,-.14]],L=new Zt(new Cs(b.map(([z,k])=>new Mt(z,k)),20),n);L.name="tire",L.rotation.z=Math.PI/2,L.castShadow=!0,S.add(L);const P=new Zt(new _s(.205,.205,.285,16),s);P.name="rim",P.rotation.z=Math.PI/2,S.add(P);const U=new Zt(new _s(.065,.065,.31,12),r);U.name="hub",U.rotation.z=Math.PI/2,S.add(U),l(A,[I*.7,.3,R],[I*.91,.38,R],.035,"axle support")}}const u=new ce;u.name="steering_assembly",t.add(u);const p=[0,.31,.63],g=[0,.94,.15];l(u,p,g,.03,"steering_column");const _=new Zt(new Dl(.24,.025,6,20),n);_.name="steering_wheel",_.position.fromArray(g),_.quaternion.setFromUnitVectors(new T(0,0,1),new T(...g).sub(new T(...p)).normalize()),u.add(_);for(let v=0;v<3;v++){const R=v*Math.PI*2/3;l(_,[0,0,0],[Math.cos(R)*.21,Math.sin(R)*.21,0],.016,"steering spoke")}for(const v of[-1,1])l(u,[0,.31,.63],[v*.8,.38,1.03],.02,"steering link");const m=new ce;m.name="body_panels",t.add(m);const f=new Me({color:i,side:ze});function M(v,R,A=0){const C=[],I=[];for(const[L,P,U,z]of R){const k=Math.min(.06,P*.3,(z-U)*.25);for(const[V,q]of[[-P+k,U],[P-k,U],[P,U+k],[P,z-k],[P-k,z],[-P+k,z],[-P,z-k],[-P,U+k]])C.push(V+A,q,L)}for(let L=0;L<R.length-1;L++)for(let P=0;P<8;P++){const U=L*8+P,z=L*8+(P+1)%8;I.push(U,z,U+8,z,z+8,U+8)}for(let L=1;L<7;L++){I.push(0,L+1,L);const P=(R.length-1)*8;I.push(P,P+L,P+L+1)}const S=new De;S.setAttribute("position",new $t(C,3)),S.setIndex(I),S.computeVertexNormals();const b=new Zt(S,f);b.name=v,b.castShadow=!0,b.receiveShadow=!0,m.add(b)}M("front_nose",[[.38,.36,.29,.49],[.74,.54,.27,.63],[1.3,.57,.27,.5],[1.49,.49,.3,.43]]);for(const v of[-1,1])M(v<0?"left_side_pod":"right_side_pod",[[-.86,.13,.3,.46],[-.66,.23,.27,.6],[.43,.23,.27,.58],[.7,.12,.3,.43]],v*.65);M("rear_shell",[[-1.38,.57,.28,.46],[-1.22,.68,.27,.61],[-.86,.65,.28,.59]]),M("floor_pan",[[-1.13,.62,.265,.32],[.53,.62,.265,.32]]);function E(v,R,A,C=0){const I=new Zt(new pn(...R),o);I.name=v,I.position.set(...A),I.rotation.x=C,I.castShadow=!0,m.add(I)}E("seat_base",[.66,.065,.63],[0,.425,-.435]),E("seat_back",[.66,.63,.065],[0,.72,-.845],-.3);for(const v of[-1,1])E(v<0?"seat_left_side":"seat_right_side",[.055,.17,.62],[v*.34,.5,-.435]);return m.getObjectByName("floor_pan").material=r,t}const Vx={x:125.5,y:0,z:-146.5};function Xl({name:i,points:t,count:e=1800,halfWidth:n=13,curbWidth:s=1.1,access:r,opening:o,arcLengthDivisions:a}){const l=new Ll(t,!0,"centripetal");a&&(l.arcLengthDivisions=a);const c=l.getLength(),h=n+s,d=Array.from({length:e+1},(_,m)=>{const f=l.getPointAt(m/e),M=l.getTangentAt(m/e);return f.y=Math.max(0,f.y),{point:f,normal:new T(-M.z,0,M.x).normalize(),distance:m/e*c}});d[e].point.copy(d[0].point),d[e].normal.copy(d[0].normal);const u=(_,m,f=0)=>_.point.clone().addScaledVector(_.normal,m).add(new T(0,f,0)),p=[],g=[];for(let _=0;_<e;_++){const m=d[_],f=d[_+1];p.push({a:m.point,b:f.point,halfWidth:h,corners:[u(m,-h),u(f,-h),u(f,h),u(m,h)]});for(const M of[-1,1]){const E=u(d[_],M*(h+.15)),v=u(d[_+1],M*(h+.15));!o(E)&&!o(v)&&g.push({a:E,b:v})}}if(r.axis==="z")for(const _ of[r.minX,r.maxX])g.push({a:new T(_,0,r.railStartZ),b:new T(_,0,r.railEndZ)});else for(const _ of[r.minZ,r.maxZ])g.push({a:new T(r.railStartX,0,_),b:new T(r.maxX,0,_)});return{name:i,samples:d,segments:p,rails:g,halfWidth:n,curbWidth:s,outer:h,access:r,opening:o,offset:u}}const Gx=[[410,220,0],[410,460,0],[420,700,0],[430,850,0],[420,920,0],[370,970,0],[300,970,0],[260,930,0],[250,860,0],[280,800,0],[330,770,0],[410,810,12],[480,820,12],[540,780,12],[555,710,12],[520,650,16],[360,490,28],[230,340,28],[110,210,28],[70,160,28],[70,120,28],[100,90,28],[150,90,28],[210,120,28],[350,220,28],[460,300,28],[500,340,24],[500,390,18],[470,430,14],[400,480,14],[200,680,14],[110,750,6],[50,750,0],[20,700,0],[20,630,0],[40,480,6],[65,340,12],[100,280,12],[140,250,12],[210,230,12],[260,250,8],[290,300,0],[290,500,0],[270,550,0],[210,570,0],[160,550,0],[140,510,0],[145,350,0],[165,200,0],[170,90,0],[210,50,0],[270,40,0],[330,60,0],[370,100,0],[400,160,0]],cl={x:-301.5},Wx={minX:cl.x-2,maxX:-128,minZ:-10,maxZ:10,height:0,railStartX:cl.x+14.25},md=Xl({name:"Skyline floating circuit",points:Gx.map(([i,t,e])=>new T(-650+i*.85,e,t*.85-187)),access:Wx,opening:i=>i.x>cl.x+8&&Math.abs(i.z)<9}),ha={entry:[832.97,559.13],points:[[433.14,-93.52,0],[494.31,-29.27,0],[745.21,239.47,0],[851.04,355.13,0],[866.52,373.41,0],[878.82,390.11,0],[885.63,400.82,0],[891.66,411.77,0],[896.23,421.61,0],[900.78,433.73,0],[903.99,445,0],[906.13,456.29,0],[907.11,467.36,0],[907.03,476.73,0],[905.79,487.83,0],[903.28,499.02,0],[899.57,509.78,0],[895.54,518.44,0],[889.92,527.8,0],[884.18,535.19,0],[877.49,541.94,0],[869.89,547.83,0],[861.71,552.55,0],[853.06,556.03,0],[843.94,558.24,0],[834.54,559.12,0],[826.75,558.78,0],[817.54,557.05,0],[808.58,553.91,0],[800.14,549.56,0],[793.72,545.21,0],[787.86,540.3,0],[781.33,533.71,0],[775.23,526.45,0],[765.17,512,0],[743.7,473.12,0],[727.09,447.5,0],[716.85,433.97,0],[707.65,423.2,0],[697.6,412.88,0],[687.82,404.48,0],[681.27,399.84,0],[674.44,395.83,0],[667.37,392.48,0],[660.11,389.79,0],[652.71,387.75,0],[643.67,386.01,0],[606.11,381.87,0],[590.41,378.91,0],[581.4,376.14,0],[572.89,372.49,0],[564.75,367.79,0],[558.3,363.05,0],[551.07,356.44,0],[545.68,350.31,0],[540.93,343.71,0],[536.08,335.24,0],[530.44,321.61,0],[523.24,296.96,0],[519.8,286.85,0],[515.57,277.03,0],[510.44,267.7,0],[504.31,258.91,0],[497.01,250.46,0],[488.6,242.47,0],[479.4,235.41,0],[472.4,231.1,0],[463.58,226.82,0],[454.36,223.52,0],[444.79,221.16,0],[427.08,218.75,0],[386.86,216.15,0],[376.08,214.4,0],[367.11,212.1,0],[357.07,208.37,0],[347.28,203.31,0],[337.81,196.88,0],[329.05,189.28,0],[322.35,182,0],[317.38,175.46,0],[312.99,168.5,0],[309.23,161.17,0],[306.14,153.49,0],[303.78,145.61,0],[302.19,137.77,0],[301.24,128.51,0],[301.73,113.33,0],[304.19,99.71,0],[308.39,86.34,0],[319.6,58.25,0],[321.86,50.62,0],[323.41,42.93,0],[324.22,33.7,0],[324.02,25.91,0],[322.72,16.43,0],[320.25,6.91,0],[315.91,-3.81,0],[311,-12.47,0],[304.14,-21.71,0],[295.43,-30.86,0],[286.12,-38.72,0],[274.77,-46.57,0],[259.86,-55.02,0],[247,-61.1,0],[227.45,-68.27,0],[208.52,-72.92,0],[187.32,-75.84,0],[165.68,-76.71,0],[145.5,-75.46,0],[125.9,-72.19,0],[106.71,-66.76,0],[86.87,-58.89,0],[67.73,-48.91,0],[49.52,-36.91,0],[26.07,-18.2,0],[6.06,.24,0],[-8.11,15.74,0],[-22.2,33.65,0],[-35.33,52.51,0],[-56.09,84.45,0],[-68.73,101.68,0],[-77.11,111.47,0],[-85.94,120.54,0],[-95.2,128.83,0],[-105.05,136.31,0],[-117.44,143.85,0],[-129.42,149.54,0],[-143.21,154.45,0],[-157.05,157.96,0],[-180.1,161.96,0],[-207,165.1,0],[-224.29,165.96,0],[-238.27,164.85,0],[-245.81,163,0],[-252.92,160.06,0],[-258.21,156.9,0],[-264.13,152.01,0],[-269.23,146.24,0],[-273.57,139.82,0],[-277.99,131.54,0],[-282.28,121.49,0],[-285.96,111.07,0],[-289.9,97.48,0],[-303.1,40.69,0],[-314.34,-2.79,0],[-331.08,-64.13,0],[-339.33,-99.74,0],[-341.85,-116.38,0],[-342.7,-129.88,0],[-342.24,-144.96,0],[-340.09,-160.97,0],[-337.28,-173.31,0],[-333.66,-185.45,0],[-327.16,-203.2,0],[-314.2,-235.15,0],[-311.96,-242.54,0],[-310.65,-250.08,0],[-310.5,-254.62,0],[-310.95,-259.09,0],[-313.2,-266.11,0],[-317.38,-272.07,0],[-323.23,-276.4,0],[-327.29,-278.01,0],[-331.58,-278.83,0],[-335.96,-278.82,0],[-341.68,-277.54,0],[-345.76,-275.75,0],[-350.79,-272.45,0],[-355.34,-268.37,0],[-359.43,-263.79,0],[-364.83,-256.29,0],[-370.19,-246.85,0],[-375.37,-235.52,0],[-387.22,-206.4,0],[-394.37,-190.72,0],[-403.07,-173.85,0],[-413.61,-156.18,0],[-425.37,-139.44,0],[-437.82,-124.32,0],[-451.14,-110.67,0],[-464.1,-99.84,0],[-478.28,-90.01,0],[-495.07,-80.56,0],[-510.08,-74.04,0],[-525.86,-68.91,0],[-543.93,-64.82,0],[-566.32,-61.53,0],[-590.61,-59.39,0],[-612.21,-59.22,0],[-637.18,-61.19,0],[-649.71,-63.03,0],[-663.79,-65.78,0],[-691.9,-72.94,0],[-719.78,-82.21,0],[-742.58,-91.7,0],[-763.12,-102.44,0],[-782.73,-114.95,0],[-802.63,-130.1,0],[-820.04,-145.77,0],[-836.25,-162.77,0],[-850.02,-179.76,0],[-865.55,-201.85,0],[-875.52,-217.58,0],[-884.79,-233.77,0],[-894.01,-251.85,0],[-919.06,-304.06,0],[-926.17,-317.04,0],[-934.08,-329.33,0],[-941.98,-339.15,0],[-949.74,-346.72,0],[-958.59,-353.36,0],[-967.01,-358.22,0],[-977.53,-362.7,0],[-986.96,-365.46,0],[-998.33,-367.44,0],[-1008.18,-368.12,0],[-1020.89,-367.82,0],[-1033.38,-366.36,0],[-1045.97,-363.64,0],[-1056.58,-360.12,0],[-1066.49,-355.62,0],[-1075.88,-350.01,0],[-1084.6,-343.22,0],[-1091.23,-336.49,0],[-1096.8,-328.94,0],[-1101.24,-320.67,0],[-1104.47,-311.87,0],[-1106.38,-302.86,0],[-1106.94,-292.24,0],[-1105.81,-281.6,0],[-1103.07,-271.01,0],[-1098.28,-259.4,0],[-1092.14,-248.53,0],[-1082.95,-235.59,0],[-1074.59,-225.9,0],[-1064.43,-216.2,0],[-1052.07,-206.61,0],[-1035.9,-195.83,0],[-1001.03,-174.05,0],[-971.43,-156.31,0],[-929.9,-133.32,0],[-905.82,-121.2,0],[-880.74,-109.32,0],[-834.74,-88.99,0],[-789.78,-71.28,0],[-731.01,-50.43,.97806],[-667.16,-29.7,3.70857],[-593.56,-7.81,7.63829],[-329.39,67.51,12],[-301.72,74.63,12],[-279.52,78.7,12],[-261.42,80.39,12],[-251.77,80.46,12],[-241.64,79.91,12],[-224.4,77.57,12],[-202.33,72.59,12],[-180.67,65.97,12],[-159.62,57.6,12],[-140.96,48.15,12],[-121.65,36.29,12],[-108.73,27.34,12],[-96.26,17.78,12],[-83.07,6.36,12],[-71.88,-4.6,11.92425],[-54.45,-24.01,11.38394],[-15.96,-70.95,8.64958],[-1.19,-88.23,7.30281],[19.24,-110.52,5.42207],[39.08,-130.6,3.70896],[51.72,-142.17,2.74828],[61.47,-149.85,2.11105],[70.7,-155.39,1.6081],[79.25,-158.48,1.22523],[86.69,-159.38,.94215],[94.16,-158.56,.69058],[101.38,-156.2,.47194],[116.5,-148.39,.12524],[123.57,-145.52,.0399],[132.46,-143.9,17e-5],[140.02,-144.26,0],[147.42,-146.03,0],[155.76,-149.74,0],[163.47,-154.77,0],[180.33,-168.42,0],[189.26,-174.67,0],[201.64,-181.43,0],[214.79,-186.73,0],[223.79,-189.44,0],[232.96,-191.56,0],[251.77,-194.1,0],[267.44,-194.28,0],[284.57,-192.24,0],[300.29,-188.27,0],[316.82,-181.86,0],[334.66,-172.69,0],[353.45,-161.17,0],[374.74,-146.15,0],[395.77,-129.49,0],[411.03,-115.67,0],[432.04,-94.64,0]]},er={z:-450},Xx={axis:"z",minX:-10,maxX:10,minZ:er.z-2,maxZ:-228,height:0,railStartZ:er.z+14.25,railEndZ:-228},gd=Xl({name:"Suzuka floating circuit",count:2400,arcLengthDivisions:14400,points:ha.points.map(([i,t,e])=>new T(i-ha.entry[0],e,t-ha.entry[1]+er.z)),access:Xx,opening:i=>i.z<er.z+15&&i.z>er.z+7&&Math.abs(i.x)<10}),jx=[[[980,790],[860,820],[780,890],[680,930],[550,935],[460,910],[430,870],[450,825],[490,810],[550,825],[610,835],[650,815],[665,775],[650,745],[670,710],[730,700],[800,710],[850,690],[880,650],[870,610],[830,580],[750,555],[660,535]],[[550,570],[440,640],[370,700],[335,760],[300,805],[250,825],[200,812],[160,775],[150,735],[170,700],[220,670],[285,650]],[[340,620],[380,565],[440,530],[470,490],[460,455],[410,430],[350,410],[280,380],[230,340],[210,290],[210,245],[240,190],[300,150],[370,125],[440,125],[480,145],[480,170],[440,195],[390,215],[375,245],[400,265],[455,270],[520,250],[590,220]],[[650,235],[710,260],[765,280],[825,280],[900,255],[960,230],[1010,205],[1065,160],[1140,140],[1210,150],[1280,185],[1335,225],[1385,290],[1425,370],[1420,430],[1390,470],[1340,490],[1280,485],[1220,450],[1160,420],[1095,390],[1035,380],[995,395],[980,425],[1e3,475],[975,500],[910,500],[840,500],[805,492],[791,470]],[[799,442],[825,405],[850,360],[835,330],[800,310],[745,305],[695,315],[655,340],[645,370],[670,398],[717,417],[738,444],[725,469],[680,483],[630,480],[575,490],[550,515],[570,540],[610,552]],[[670,560],[750,590],[820,625],[830,655],[805,675],[750,680],[680,670],[610,660],[540,660],[470,650],[410,610],[350,580],[280,580],[210,580],[160,565],[130,535],[140,495],[175,460],[240,425],[320,395],[400,365],[480,330],[550,290],[590,240],[620,200],[670,180],[725,180],[765,165],[780,130],[780,105],[810,80],[860,75],[915,90],[940,115],[930,145],[900,165],[895,185],[925,210],[980,235],[1025,270],[1065,325],[1105,345],[1135,335],[1165,305],[1190,280],[1230,290],[1265,320],[1275,355],[1255,395],[1220,425],[1160,455],[1120,500],[1110,540],[1135,575],[1180,600],[1230,630],[1255,670],[1245,700],[1200,740],[1105,775]]],hl=jx.flat(),Ts=new Ll(hl.map(([i,t])=>new T((i-980)*.65,0,(950-t)*.85+850)),!0,"centripetal");Ts.arcLengthDivisions=32768;const _d=Ts.getLength(),zi=2400,Mh=Array.from({length:zi},(i,t)=>Ts.getPointAt(t/zi)),xd=23/(_d/zi),da=Math.ceil(xd*3),vd=Array.from({length:2*da+1},(i,t)=>({offset:t-da,weight:Math.exp(-.5*((t-da)/xd)**2)})),Yx=vd.reduce((i,t)=>i+t.weight,0),hr=Mh.map((i,t)=>vd.reduce((e,n)=>e.addScaledVector(Mh[(t+n.offset+zi)%zi],n.weight/Yx),new T)),qx=[[[980,790],0],[[1210,150],0],[[1420,430],16],[[1160,420],16],[[799,442],32],[[820,625],32],[[470,650],16],[[1065,325],16],[[1220,425],0],[[1105,775],0]],Kx=Ts.getLengths(Ts.arcLengthDivisions),no=qx.map(([[i,t],e])=>{const n=hl.findIndex(s=>s[0]===i&&s[1]===t);return{u:Kx[Math.round(n/hl.length*Ts.arcLengthDivisions)]/_d,height:e}});no.push({u:1,height:0});const Zx=hr[0].x;let qr=0;for(let i=0;i<zi;i++){const t=i/zi;for(;t>no[qr+1].u;)qr++;const e=no[qr],n=no[qr+1],s=(t-e.u)/(n.u-e.u),r=s*s*s*(s*(s*6-15)+10);hr[i].x-=Zx,hr[i].y=e.height+(n.height-e.height)*r}const ho=hr[0].clone(),$x={axis:"z",minX:-10,maxX:10,minZ:228,maxZ:ho.z+2,height:0,railStartZ:228,railEndZ:ho.z-18},Md=Xl({name:"Winding floating circuit",points:hr,count:2400,arcLengthDivisions:24e3,access:$x,opening:i=>i.y<.05&&i.z<ho.z-5&&i.z>ho.z-30&&Math.abs(i.x)<10}),cs=24;function yd(i,t){const e=new Map;for(const n of i){const s=Math.floor((Math.min(n.a.x,n.b.x)-t)/cs),r=Math.floor((Math.max(n.a.x,n.b.x)+t)/cs),o=Math.floor((Math.min(n.a.z,n.b.z)-t)/cs),a=Math.floor((Math.max(n.a.z,n.b.z)+t)/cs);for(let l=s;l<=r;l++)for(let c=o;c<=a;c++){const h=`${l},${c}`;e.has(h)||e.set(h,[]),e.get(h).push(n)}}return(n,s)=>e.get(`${Math.floor(n/cs)},${Math.floor(s/cs)}`)??[]}function Jx(i,t,e){const n=i.b.x-i.a.x,s=i.b.z-i.a.z,r=((t-i.a.x)*n+(e-i.a.z)*s)/(n*n+s*s),o=Math.max(0,Math.min(1,r)),a=i.a.x+n*o,l=i.a.z+s*o;return{rawT:r,x:a,z:l,y:i.a.y+(i.b.y-i.a.y)*o,distance:Math.hypot(t-a,e-l)}}function yh(i,t,e,n,s){const r=(n.z-s.z)*(e.x-s.x)+(s.x-n.x)*(e.z-s.z);if(Math.abs(r)<1e-10)return null;const o=((n.z-s.z)*(i-s.x)+(s.x-n.x)*(t-s.z))/r,a=((s.z-e.z)*(i-s.x)+(e.x-s.x)*(t-s.z))/r,l=1-o-a;return o>=-1e-7&&a>=-1e-7&&l>=-1e-7?o*e.y+a*n.y+l*s.y:null}function Sd(i,t=Li+co+1){const e=yd(i,t);return(n,s,r=1/0)=>{let o=null;for(const a of e(n,s)){const[l,c,h,d]=a.corners,u=yh(n,s,l,c,h)??yh(n,s,l,h,d);u!==null&&u<=r&&(o===null||u>o)&&(o=u)}return o}}function bd(i){const t=yd(i,2);return(e,n,s,r,o,a=.48,l=2.3)=>{for(let c=0;c<3;c++)for(const h of t(s,r)){const d=Jx(h,s,r);if(o>=d.y+1.2||o+l<d.y||d.distance>=a)continue;let u=s-d.x,p=r-d.z,g=Math.hypot(u,p);g<1e-5&&(u=e-d.x,p=n-d.z,g=Math.hypot(u,p)||1),s=d.x+u/g*a,r=d.z+p/g*a}return{x:s,z:r}}}Sd([...Wl,...md.segments,...gd.segments,...Md.segments]);const Qx=[...ri,...md.rails,...gd.rails,...Md.rails];bd(Qx);const xs={name:"Original Circuit",horizontalScale:.4,offset:{x:28-128*.4,y:Se,z:150*.4-9*Se},bridge:{minX:13.8,maxX:30,halfWidth:2.6,z:-9*Se,y:Se},home:{x:21,y:Se,z:-9*Se,yaw:Math.PI/2}},Hn=new T(xs.offset.x,xs.offset.y,xs.offset.z),dn=xs.horizontalScale,hs=i=>new T(i.x*dn,i.y,i.z*dn).add(Hn),Sh=new T(0,1,0);function tv(i){const t=new ce;t.name="Original Circuit and island bridge",t.scale.setScalar(Tn);const e=Bx();e.position.copy(Hn),e.scale.set(dn,1,dn),t.add(e);const n=Wl.map(P=>({...P,a:hs(P.a),b:hs(P.b),halfWidth:P.halfWidth*dn,corners:P.corners.map(hs)})),s=ri.map(P=>({a:hs(P.a),b:hs(P.b)})),r=xs.bridge,o={minX:Ze.minX*dn+Hn.x,maxX:Ze.maxX*dn+Hn.x,minZ:Ze.minZ*dn+Hn.z,maxZ:Ze.maxZ*dn+Hn.z,y:Hn.y};for(const P of[-1,1])s.push({a:new T(r.minX+.4,r.y,r.z+P*r.halfWidth),b:new T(r.maxX,r.y,r.z+P*r.halfWidth)});const a=Sd(n,(Li+co)*dn+1),l=bd(s),c=[],h=[],d=new Me({color:"#30343b"}),u=new Me({color:"#a5adb8"}),p=new Me({color:"#dc2828"}),g=new Me({color:"#f4f3ef"});function _(P,U,z,k){const V=new Zt(new pn(...P),z);return V.position.set(...U),V.name=k,t.add(V),V}_([r.maxX-r.minX,.65,r.halfWidth*2],[(r.minX+r.maxX)/2,r.y-.325,r.z],d,"Island bridge deck");for(const P of[-1,1]){for(let U=r.minX;U<r.maxX;U+=2){const z=Math.min(2,r.maxX-U);_([z,.06,.4],[U+z/2,r.y+.03,r.z+P*(r.halfWidth-.2)],Math.floor((U-r.minX)/2)%2?g:p,"Bridge red-white curb")}for(const U of[.55,1.08])_([r.maxX-r.minX-.4,.16,.16],[(r.minX+.4+r.maxX)/2,r.y+U,r.z+P*r.halfWidth],u,"Bridge guardrail");for(let U=r.minX+.4;U<=r.maxX;U+=2)_([.18,1.18,.18],[U,r.y+.59,r.z+P*r.halfWidth],u,"Bridge rail post")}function m(P,U=null,z=!1){let k=P;U&&new T().subVectors(k[1],k[0]).cross(new T().subVectors(k[2],k[0])).dot(U)<0&&(k=[...k].reverse());for(const V of[0,1,2,0,2,3])c.push(...k[V].toArray());if(z)for(const V of[2,1,0,3,2,0])c.push(...k[V].toArray())}function f(P,U){const z=P.map(V=>V.clone().multiplyScalar(Tn).toArray()),k=new T().subVectors(P[1],P[0]).cross(new T().subVectors(P[2],P[0])).normalize().toArray();h.push({points:z,normal:k,css:U,alpha:1,surface:!0,doubleSided:!0})}function M(P){m(P,Sh);const U=P.map(z=>z.clone().add(new T(0,-.65,0)));m(U,Sh.clone().negate()),f(P,"#343840"),f(U,"#454b54");for(const[z,k]of[[0,1],[3,2]]){const V=[P[z],P[k],U[k],U[z]];m(V,null,!0),f(V,"#555b65")}}for(const P of n)M(P.corners);for(const P of[{...r,minZ:r.z-r.halfWidth,maxZ:r.z+r.halfWidth},o])M([new T(P.minX,P.y,P.minZ),new T(P.minX,P.y,P.maxZ),new T(P.maxX,P.y,P.maxZ),new T(P.maxX,P.y,P.minZ)]);const E=Li+co;for(let P=0;P<jn.length-1;P++)for(const U of[-1,1]){const z=jn[P],k=jn[P+1],V=(W,Q)=>hs(W.point.clone().addScaledVector(W.normal,Q)).add(new T(0,.04,0)),q=V(z,U*E);(q.x-Hn.x)/dn<145&&Math.abs((q.z-Hn.z)/dn+150)<9||f([V(z,U*Li),V(k,U*Li),V(k,U*E),q],Math.floor(z.distance/3)%2?"#f4f3ef":"#dc2828")}for(const[P,U]of s.entries()){const z=U.a.clone().add(new T(0,1.2,0)),k=U.b.clone().add(new T(0,1.2,0));m([U.a,U.b,k,z],null,!0);for(const V of[.55,1.08])f([U.a.clone().add(new T(0,V-.08,0)),U.b.clone().add(new T(0,V-.08,0)),U.b.clone().add(new T(0,V+.08,0)),U.a.clone().add(new T(0,V+.08,0))],"#b4becb");P%6===0&&f([U.a.clone().add(new T(-.09,0,0)),U.a.clone().add(new T(.09,0,0)),z.clone().add(new T(.09,0,0)),z.clone().add(new T(-.09,0,0))],"#a5adb8")}for(const P of[-1,1])for(let U=r.minX;U<r.maxX;U+=2){const z=Math.min(U+2,r.maxX),k=r.z+P*(r.halfWidth-.2);f([new T(U,r.y+.06,k-.2),new T(z,r.y+.06,k-.2),new T(z,r.y+.06,k+.2),new T(U,r.y+.06,k+.2)],Math.floor((U-r.minX)/2)%2?"#dc2828":"#f4f3ef")}const v=new De;v.setAttribute("position",new $t(c,3));const R=new Zt(v,new Me({side:ze}));R.name="Walkable Original Circuit, bridge and rails";let A=null;const C=(P,U,z)=>P>=z.minX&&P<=z.maxX&&U>=z.minZ&&U<=z.maxZ,I={...r,minZ:r.z-r.halfWidth,maxZ:r.z+r.halfWidth};function S(P,U,z){const k=Math.floor(P/Se),V=Math.floor(U/Se);if(Math.abs(k)>36||Math.abs(V)>44)return null;const q=Number.isFinite(z)?Math.min(60,Math.floor(z/Se-1+1e-6)):60;for(let W=q;W>=-26;W--){const Q=i.get(k,W,V),ot=i.get(k,W+1,V);if(Q&&!["water","cloud"].includes(Q.type)&&(!ot||["water","cloud"].includes(ot.type)))return(W+1)*Se}return null}const b={supportHeight(P,U,z=1/0){let k=S(P,U,z);const V=a(P,U,z);V!==null&&(k===null||V>k)&&(k=V);for(const q of[I,o])C(P,U,q)&&q.y<=z&&(k===null||q.y>k)&&(k=q.y);return k},resolveHorizontal(P,U,z,k,V,q=.48,W=2.3){const Q=l(P,U,z,k,V,q,W);if(A&&Math.abs(Q.x)<17&&Math.abs(Q.z)<21){const ot=ax(new T(Q.x,V+.035,Q.z),W,q),pt=A.capsuleIntersect(ot);pt&&Math.abs(pt.normal.y)<.65&&(Q.x+=pt.normal.x*pt.depth,Q.z+=pt.normal.z*pt.depth)}return Q}};t.traverse(P=>{P.isMesh&&(P.castShadow=!1,P.receiveShadow=!1)});const L={minX:1/0,maxX:-1/0,minZ:1/0,maxZ:-1/0};for(const P of n)for(const U of P.corners)L.minX=Math.min(L.minX,U.x),L.maxX=Math.max(L.maxX,U.x),L.minZ=Math.min(L.minZ,U.z),L.maxZ=Math.max(L.maxZ,U.z);return{root:t,solid:R,faces:h,physics:b,segments:n,rails:s,bounds:L,plan:xs,connect(P){P.addCollision(R),A=P.collision}}}const ev=22,ua=.05,nv=Object.freeze({ankleHeight:.15,centerHeight:.099,forwardOffset:.12,radiusX:.1705,radiusY:.099,radiusZ:.297}),iv=[["pelvis",null,[0,.91,0]],["spine","pelvis",[0,1.13,0]],["chest","spine",[0,1.43,0]],["neck","chest",[0,1.65,0]],["head","neck",[0,1.85,0]]];for(const[i,t]of[["left",-1],["right",1]])iv.push([`${i}_upper_arm`,"chest",[t*.38,1.48-ua,0]],[`${i}_forearm`,`${i}_upper_arm`,[t*.47,1.12-ua,.025]],[`${i}_hand`,`${i}_forearm`,[t*.5,.83-ua,.06]],[`${i}_thigh`,"pelvis",[t*.165,.86,0]],[`${i}_calf`,`${i}_thigh`,[t*.165,.51,.015]],[`${i}_foot`,`${i}_calf`,[t*.165,nv.ankleHeight,0]],[`${i}_toe`,`${i}_foot`,[t*.18,.099,.3]]);const Kr=1/120,sv=ev,fa=1.18,rv=[-.35,.35],ov=.65,bh=(i,t,e)=>Math.max(t,Math.min(e,i));function av(i,t,e,n,s){const r=Math.sin(i.yaw),o=Math.cos(i.yaw),a=Math.max(1,Math.ceil(Math.hypot(t,e)*n/.22)),l=n/a,c=i.railContactTime<=0;let h=!1;for(let d=0;d<a;d++){const u=i.x,p=i.z;let g=u+t*l,_=p+e*l;const m=[];for(let f=0;f<3;f++){let M=!1;for(const E of rv){const v=g+r*E,R=_+o*E,A=s.resolveHorizontal(u+r*E,p+o*E,v,R,i.y,fa,1.8),C=A.x-v,I=A.z-R,S=Math.hypot(C,I);if(S<1e-7)continue;g+=C,_+=I,M=!0;const b=C/S,L=I/S;m.some(P=>P.offset===E&&P.nx*b+P.nz*L>.995)||m.push({nx:b,nz:L,offset:E,rx:r*E-b*fa,rz:o*E-L*fa})}if(!M)break}if(m.length){const f=m.map(M=>{const E=-(t*M.nx+e*M.nz);return c&&!h&&E>1.5?Math.min(1.5,E*.075):0});for(let M=0;M<8;M++)for(let E=0;E<m.length;E++){const v=m[E],R=v.rz*v.nx-v.rx*v.nz,A=t*v.nx+e*v.nz+i.impactYawRate*R;if(A>=f[E]-1e-7)continue;const C=-A>2?ov:0,I=(f[E]-A)/(1+R*R*C);t+=v.nx*I,e+=v.nz*I,i.impactYawRate=bh(i.impactYawRate+R*I*C,-.8,.8);const S=-v.nz,b=v.nx,L=t*S+e*b,P=bh(-L,-.1*I,.1*I);t+=S*P,e+=b*P}f.some(M=>M>0)&&(i.impactRecovery=.12,h=!0),i.railContactTime=.3}i.x=g,i.z=_}return{vx:t,vz:e}}const lv=120*.44704,cv=180*.44704,hv=24,dv=48,uv=.415,fv=.5,pv=.8,mv=.2,wh=2.03,gv=.38,ni=(i,t,e)=>Math.max(t,Math.min(e,i)),Zr=(i,t,e)=>i<t?Math.min(t,i+e):Math.max(t,i-e);function Eh(){return{...Vx,yaw:Math.PI/2,speed:0,lateralSpeed:0,steering:0,steerHoldTime:0,steerHoldDirection:0,wheelRotation:0,verticalVelocity:0,grounded:!0,pitch:0,bank:0,heldItem:null,boostTime:0,spinTime:0,shieldHits:0,shieldTime:0,shieldFlash:0,railContactTime:0,impactYawRate:0,impactRecovery:0}}function _v(i,t,e,n){i.railContactTime=Math.max(0,(i.railContactTime??0)-e),i.impactRecovery=Math.max(0,(i.impactRecovery??0)-e),i.impactYawRate=(i.impactYawRate??0)*Math.exp(-6*e),i.lateralSpeed=(i.lateralSpeed??0)*Math.exp(-7*e);const s=i.boostTime>0,r=(i.spinTime??0)>0,o=Math.max(0,(i.spinTime??0)-e);i.spinTime=o<1e-8?0:o,i.boostTime=Math.max(0,i.boostTime-e);const a=ni(t.throttle??0,-1,1),l=r?0:ni(t.steer??0,-1,1),c=!!t.brake,h=s&&a>=0&&!c?1:a,d=s?cv:lv;i.impactRecovery>0&&a>=0&&(i.speed*=Math.exp(-6*e)),r?i.speed=Zr(i.speed,0,(c||a<0?36:20)*e):c?i.speed=Zr(i.speed,0,36*e):h>0&&i.impactRecovery<=0?i.speed=i.speed>d?Zr(i.speed,d,12*e):Math.min(d,i.speed+(i.speed<0?36:s?dv:hv)*e):h<0?i.speed=ni(i.speed-(i.speed>0?36:8)*e,-8,d):i.impactRecovery<=0&&(i.speed=Zr(i.speed,0,(1.8+.0035*i.speed*i.speed)*e));const u=Math.abs(l)>.55&&i.speed>2&&i.grounded&&!c?Math.sign(l):0;u?(i.steerHoldTime=(i.steerHoldDirection===u?i.steerHoldTime:0)+e,i.steerHoldDirection=u):(i.steerHoldTime=0,i.steerHoldDirection=0);const p=ni((i.steerHoldTime-fv)/pv,0,1),g=1+mv*p*p*(3-2*p),_=uv/(1+Math.abs(i.speed)/11)*g,m=l*i.steering>=0&&Math.abs(l*_)>Math.abs(i.steering);i.steering+=(l*_-i.steering)*(1-Math.exp(-(m?6.5:14)*e));const f=i.railContactTime>0&&h>0?Math.max(i.speed,2):i.speed,M=i.grounded?-f/wh*Math.tan(i.steering)*e:0,E=i.yaw+M;i.yaw=E+i.impactYawRate*e;const v=i.x,R=i.z,A=Math.sin(i.yaw),C=Math.cos(i.yaw);let I=Math.sin(E)*i.speed+Math.cos(E)*i.lateralSpeed,S=Math.cos(E)*i.speed-Math.sin(E)*i.lateralSpeed;const b=Math.hypot(I,S),L=Math.max(d,Math.abs(i.speed));b>L&&(I*=L/b,S*=L/b);const P=av(i,I,S,e,n);i.speed=P.vx*A+P.vz*C,i.lateralSpeed=P.vx*C-P.vz*A;const U=i.x,z=i.z,k=(U-v)*A+(z-R)*C;i.wheelRotation+=k/gv;const V=n.supportHeight(U,z,i.y+.65);if(i.grounded&&V!==null&&V>=i.y-.65)i.y=V,i.verticalVelocity=0;else{i.grounded=!1;const q=i.y;i.verticalVelocity-=sv*e,i.y+=i.verticalVelocity*e;const W=n.supportHeight(U,z,q+.001);i.verticalVelocity<=0&&W!==null&&q>=W-.02&&i.y<=W&&(i.y=W,i.verticalVelocity=0,i.grounded=!0)}if(i.grounded){const q=n.supportHeight(U+A*1.03,z+C*1.03,i.y+.7),W=n.supportHeight(U-A,z-C,i.y+.7),Q=n.supportHeight(U-C*.8,z+A*.8,i.y+.7),ot=n.supportHeight(U+C*.8,z-A*.8,i.y+.7),pt=q!==null&&W!==null?Math.atan2(W-q,wh):0,kt=Q!==null&&ot!==null?Math.atan2(ot-Q,1.6):0;i.pitch+=(ni(pt,-.4,.4)-i.pitch)*(1-Math.exp(-12*e)),i.bank+=(ni(kt,-.3,.3)-i.bank)*(1-Math.exp(-12*e))}}function xv(i,t){return i.grounded&&t.grounded&&!(t.spinTime>0)&&Math.hypot(i.x-t.x,i.z-t.z)<4.5&&Math.abs(i.y-t.y)<.7&&Math.hypot(t.speed,t.lateralSpeed??0)<.75}function vv(i,t){if(!i.grounded||i.spinTime>0||Math.hypot(i.speed,i.lateralSpeed??0)>.75)return null;for(const[e,n]of[[1.95,-.2],[-1.95,-.2],[0,-2.3],[0,2.5]]){const s=i.x+Math.cos(i.yaw)*e+Math.sin(i.yaw)*n,r=i.z-Math.sin(i.yaw)*e+Math.cos(i.yaw)*n,o=t.supportHeight(s,r,i.y+.5);if(o===null||Math.abs(o-i.y)>.5)continue;const a=t.resolveHorizontal(s,r,s,r,o);if(Math.hypot(a.x-s,a.z-r)<.02)return{x:s,y:o,z:r,yaw:i.yaw}}return null}function Mv(i,t,e,n,s=.42,r=2.3){if(e>n.y+1.2||e+r<n.y)return{x:i,z:t};const o=Math.sin(n.yaw),a=Math.cos(n.yaw),l=i-n.x,c=t-n.z;let h=l*a-c*o,d=l*o+c*a;const u=ni(h,-1.18,1.18),p=ni(d,-1.5,1.5);let g=h-u,_=d-p,m=Math.hypot(g,_);return m>=s?{x:i,z:t}:(m<1e-6?1.18-Math.abs(h)<1.5-Math.abs(d)?h=Math.sign(h||1)*(1.18+s):d=Math.sign(d||1)*(1.5+s):(h=u+g/m*s,d=p+_/m*s),{x:n.x+h*a+d*o,z:n.z-h*o+d*a})}const wd=.92;function yv(i){i.body.position.set(0,wd,0),i.body.rotation.set(0,0,0),i.body.scale.set(1,1,1);for(const t of["torso","head","shoulderLeft","shoulderRight","elbowLeft","elbowRight","hipLeft","hipRight","kneeLeft","kneeRight","ankleLeft","ankleRight"])i[t].rotation.set(0,0,0)}const Sv=.75;function bv(i){const t=i.spinTime??0;if(t<=0)return 0;const e=Math.max(0,Math.min(1,1-t/Sv));return Math.PI*2*e*e*e*(e*(e*6-15)+10)}function wv(i){return Math.round(Math.abs(i)*2.2369362920544)}function Ev(i){const t=-i;if(Math.abs(t)<1e-8)return{left:0,right:0};const e=Math.sign(t),n=2.03/Math.tan(Math.abs(t)),s=Math.atan2(2.03,Math.max(.01,n-1.04)),r=Math.atan2(2.03,n+1.04);return{left:e*(e<0?s:r),right:e*(e>0?s:r)}}function Tv(i){const t=[];for(const o of["front_axle","rear_axle"])for(const a of["left","right"])t.push({node:i.getObjectByName(`${o}_${a}_wheel`),front:o==="front_axle",side:a});const e=i.getObjectByName("steering_wheel"),n=e.quaternion.clone(),s=new hi,r=new T(0,0,1);return function(a){i.position.set(a.x,a.y,a.z),i.rotation.set(a.pitch,a.yaw+bv(a),a.bank,"YXZ");const l=Ev(a.steering);for(const c of t)c.node.rotation.set(a.wheelRotation,c.front?l[c.side]:0,0,"YXZ");e.quaternion.copy(n).multiply(s.setFromAxisAngle(r,-a.steering*2.5))}}function Av(i){const t=i.userData.characterRig;if(t)return function(){yv(t),t.torso.rotation.x=.05;for(const[r,o]of[["Left",-1],["Right",1]])t[`hip${r}`].rotation.x=-1.6,t[`knee${r}`].rotation.x=.22,t[`ankle${r}`].rotation.x=1.38,t[`shoulder${r}`].rotation.set(-.95,0,-o*.25),t[`elbow${r}`].rotation.x=-1.3;i.position.set(0,.59-wd,-.45),i.rotation.set(0,0,0),i.updateMatrixWorld(!0)};const e=new Map(i.skeleton.bones.map(s=>[s.name,s])),n=i.skeleton.bones.map(s=>({bone:s,position:s.position.clone(),quaternion:s.quaternion.clone()}));return function(){for(const r of n)r.bone.position.copy(r.position),r.bone.quaternion.copy(r.quaternion);e.get("spine").rotation.x=.05;for(const[r,o]of[["left",-1],["right",1]])e.get(`${r}_thigh`).rotation.x=-1.6,e.get(`${r}_calf`).rotation.x=.22,e.get(`${r}_foot`).rotation.x=1.38,e.get(`${r}_upper_arm`).rotation.set(-.8,0,-o*.45),e.get(`${r}_forearm`).rotation.x=-1.15,e.get(`${r}_hand`).rotation.x=-.1;i.position.set(0,-.32,-.45),i.rotation.set(0,0,0),i.updateMatrixWorld(!0),i.skeleton.update()}}function Rv(i,t=null){const e=Hx(),n=Eh(),s=ud({plain:!0});s.root.userData.characterRig=s,s.root.visible=!1,e.add(s.root);const r=Av(s.root),o=Tv(e);let a=!1,l=0,c={...n},h="";const d=new Me({color:"#b9b2a6"});s.root.traverse(f=>{f.isMesh&&(f.material=d)}),e.traverse(f=>{f.castShadow=!1,f.receiveShadow=!1}),i.root.add(e);const u={...i.plan.home},p=new T;if(t){const f=t.collision.capsuleIntersect.bind(t.collision);t.collision.capsuleIntersect=M=>{const E=f(M);if(E||a)return E;const v=M.start.x,R=M.start.z,A=M.start.y-M.radius,C=M.end.y-M.start.y+M.radius*2,I=Mv(v,R,A,n,M.radius,C),S=I.x-v,b=I.z-R,L=Math.hypot(S,b);return L>1e-7?{normal:new T(S/L,0,b/L),depth:L}:null}}function g(){Object.assign(n,Eh(),u),n.heldItem=null,n.shieldTime=0,n.boostTime=0,c={...n},l=0,o(n)}function _(f,M){const E=Math.sin(n.yaw)*n.speed+Math.cos(n.yaw)*(n.lateralSpeed??0),v=Math.cos(n.yaw)*n.speed-Math.sin(n.yaw)*(n.lateralSpeed??0);f.player.rideAlong(M.x,M.y,M.z,M.yaw,E,v),f.shadow.visible=!1}const m={model:e,state:n,driver:s,home:u,get driving(){return a},get message(){return h},get mph(){return wv(Math.hypot(n.speed,n.lateralSpeed??0))},near(f){return!a&&Math.hypot(f.player.position.x-n.x,f.player.position.z-n.z)<4.5&&Math.abs(f.player.position.y-n.y)<1},toggle(f){if(h="",a){const E=vv(n,i.physics);return E?(a=!1,n.speed=0,n.lateralSpeed=0,s.root.visible=!1,f.player.object.visible=!0,f.player.teleport(p.set(E.x,E.y+.005,E.z),E.yaw),f.input.releaseTouch(),f.input.clear(),!0):(h=Math.abs(n.speed)>.75?"Stop to get out":"No safe place to get out",!1)}const M=f.player.position;return xv({grounded:f.player.onGround,x:M.x,y:M.y,z:M.z},n)?(a=!0,l=0,c={...n},s.root.visible=!0,f.player.object.visible=!1,f.shadow.visible=!1,r(),f.input.releaseTouch(),f.input.clear(),_(f,n),!0):!1},update(f,M,E){if(!a)return;const v=M.move.y>.18||M.isDown("driveBrake"),R=M.move.y<-.18||M.isDown("driveGas"),A=M.isDown("driveLeft"),C=M.isDown("driveRight"),I=A||C?Number(C)-Number(A):Math.abs(M.move.x)>.08?M.move.x:0,S={throttle:v?-1:R?1:0,brake:v&&n.speed>.4,steer:I};for(l+=Math.min(.1,f);l>=Kr;)c={...n},_v(n,S,Kr,i.physics),l-=Kr;if(n.y<-35){m.reset(E);return}const b=l/Kr,L=Math.atan2(Math.sin(n.yaw-c.yaw),Math.cos(n.yaw-c.yaw)),P={...n,x:c.x+(n.x-c.x)*b,y:c.y+(n.y-c.y)*b,z:c.z+(n.z-c.z)*b,yaw:c.yaw+L*b};o(P),r(),s.shoulderLeft.rotation.z-=n.steering*.3,s.shoulderRight.rotation.z-=n.steering*.3,_(E,P)},reset(f){a=!1,s.root.visible=!1,f.player.object.visible=!0,g(),f.reset(),h=""}};return g(),m}function Pv(){const i=new URLSearchParams(window.location.search).get("touch");return i==="1"||i==="true"?!0:i==="0"||i==="false"?!1:!!(navigator.maxTouchPoints>0&&window.matchMedia("(pointer: coarse)").matches)}function Cv(){const i=e=>{e.cancelable&&e.preventDefault()},t=e=>{e.cancelable&&e.preventDefault()};return document.addEventListener("gesturestart",i),document.addEventListener("gesturechange",i),document.addEventListener("gestureend",i),document.addEventListener("touchmove",t,{passive:!1}),document.addEventListener("dblclick",i),()=>{document.removeEventListener("gesturestart",i),document.removeEventListener("gesturechange",i),document.removeEventListener("gestureend",i),document.removeEventListener("touchmove",t),document.removeEventListener("dblclick",i)}}let pe=document.querySelector("canvas");const Ii=new _f,qe=ld();let uo=cd(qe.world);const ki=document.getElementById("graphics-quality");let fo,Ys,qs;try{fo=C_(pe)}catch(i){try{fo=L_(pe,[...qe.faces,...uo])}catch(t){throw document.getElementById("load-error").hidden=!1,document.getElementById("camera-hint").hidden=!0,document.querySelectorAll("nav button,nav select").forEach(e=>e.disabled=!0),document.getElementById("retry-load").addEventListener("click",()=>location.reload()),new AggregateError([i,t],"Neither graphics view could start.")}}const{renderer:Ue,compatible:Lv}=fo;pe=fo.canvas;const Dn=pe.dataset.graphics==="canvas";let ui="low";try{ui=Dn?"low":X_(localStorage)}catch{}if(Dn){ki.title="Medium and High need 3D graphics support. Low works in compatibility view.";for(const i of ki.options)i.value!=="low"&&(i.disabled=!0)}const Dv=new Ef("#fbfff4","#9eb6d0",1.2),fn=new qh("#fff8e6",2.5);fn.position.set(-55,90,-40);fn.target.position.set(0,-5,0);Object.assign(fn.shadow.camera,{left:-65,right:65,top:65,bottom:-65,near:2,far:220});fn.shadow.bias=-12e-5;fn.shadow.normalBias=.035;const Ed=new qh("#dfefff",.9);Ed.position.set(50,18,70);Ii.add(Dv,fn,fn.target,Ed);Dn||(Ue.outputColorSpace=nn,Ue.setClearColor(0,0),Ue.shadowMap.autoUpdate=!1);const be=Ux(qe.world);Ii.add(be.root);const Ds=tv(qe.world);Ds.connect(be);Ii.add(Ds.root);const ae=Rv(Ds,be);if(Dn){const i=Fx(be),t=pd(ae.model);Ue.setActors(()=>[...i(),...t()])}const Te=be.input;Te.attach(pe);Te.setPointerLockWanted(!1);pe.tabIndex=0;const vs=Pv(),pr=vs?Nx(Te,document.getElementById("island")):null;vs&&(document.body.classList.add("has-touch"),Cv());const Ri=new Il(-65,65,46,-46,.1,700),nr=new Ve(29.3,1,.1,1e3),Ui=new Ve(44,1,.1,6e3),Ie=new Ve(58,1,.1,700),oi=new Ve(58,1,.1,700);for(const i of[Ri,nr,Ie,oi])i.far=6e3;let si=oi,Yn="walk",io=!1;const Ft=new g_(Ie,pe);Ft.enableDamping=!1;Ft.enablePan=!1;Ft.minZoom=.6;Ft.maxZoom=4;Ft.rotateSpeed=.65;Ft.zoomSpeed=.85;let dl=!1,Iv=0,yn=null,so=0,dr=0,Th=0,ul=0;const Ks=new T,pa=new T,vn=new T;function Td(){dl=!1,Ue.render(Ii,si),pe.dataset.renders=++Iv,pe.dataset.drawCalls=Ue.info.render.calls,pe.dataset.triangles=Ue.info.render.triangles}function Is(){dl||(dl=!0,requestAnimationFrame(Td))}function jl(){if(Yn!=="walk")return;vn.copy(Ie.position).sub(Ft.target);const i=vn.length(),t=be.cameraDistance(Ft.target,Ie.position);oi.position.copy(Ft.target).addScaledVector(vn,i>.001?Math.min(i,Math.max(.8,t-.45))/i:1),oi.quaternion.copy(Ie.quaternion),oi.zoom=Ie.zoom,oi.updateProjectionMatrix()}Ft.addEventListener("change",()=>{jl(),io||Is()});Ft.addEventListener("start",()=>{ul=performance.now()+1800});function Ad(){if(Dn){Ue.setFaces([...qe.faces,...uo,...Ds.faces]);return}Ys&&(Ii.remove(Ys),dh(Ys)),qs&&(Ii.remove(qs),dh(qs)),Ys=J_(qe,ui),qs=Q_(uo),Ii.add(Ys,qs),Ue.shadowMap.needsUpdate=!0}function Rd(){const i=Ds.bounds,t=Tn,e=Math.min(-36,i.minX*t),n=i.maxX*t,s=Math.min(-44,i.minZ*t),r=Math.max(44,i.maxZ*t);Ft.target.set((e+n)/2,2,(s+r)/2);const o=new T(-.12,1,1.1).normalize(),a=new T(o.z,0,-o.x).normalize(),l=o.clone().cross(a),c=Math.tan(at.degToRad(Ui.fov)/2);let h=0;for(const d of[e,n])for(const u of[-26,30])for(const p of[s,r]){const g=new T(d,u,p).sub(Ft.target);h=Math.max(h,g.dot(o)+Math.max(Math.abs(g.dot(a))/(c*Ui.aspect),Math.abs(g.dot(l))/c))}h*=1.1,Ui.position.copy(Ft.target).addScaledVector(o,h),Ft.minDistance=h*.35,Ft.maxDistance=h*2,Ft.update()}function Yl(){const i=pe.clientWidth,t=pe.clientHeight,e=i/t,n=Math.max(36.5714,54.8571/e);Ue.setPixelRatio(Math.min(window.devicePixelRatio||1,Lv?1:Oi[ui].pixelRatio)),Ue.setSize(i,t,!1),Ri.left=-n*e,Ri.right=n*e,Ri.top=n,Ri.bottom=-n,Ri.updateProjectionMatrix(),nr.aspect=e,nr.fov=at.radToDeg(2*Math.atan(n*Ai.angledCamera.frameScale/Ai.angledCamera.distance)),nr.updateProjectionMatrix();for(const s of[Ie,oi])s.aspect=e,s.fov=e<.8?66:58,s.updateProjectionMatrix();Ui.aspect=e,Ui.updateProjectionMatrix(),Yn==="track"&&Rd(),jl(),Is()}function ql(i,t=!0){if(!Oi[i])throw new TypeError("Unknown graphics quality");if(Dn&&i!=="low")return!1;if(ui=i,ki.value=i,pe.dataset.quality=i,be.setQuality(i),!Dn){const e=Oi[i];Ue.toneMapping=Wn,Ue.shadowMap.enabled=e.shadows,Ue.shadowMap.type=pl,fn.shadow.radius=i==="high"?3.5:1.5,fn.castShadow=e.shadows,fn.shadow.map?.dispose(),fn.shadow.map=null,e.shadows&&fn.shadow.mapSize.set(e.shadowSize,e.shadowSize)}if(Ad(),Yl(),t)try{j_(localStorage,i)}catch{}return!0}function Uv(i){be.focus(Ks),ae.driving&&(Ks.x+=be.player.velocity.x*Tn*.08,Ks.z+=be.player.velocity.z*Tn*.08),pa.copy(Ks).sub(Ft.target),pa.length()>18?Ft.target.copy(Ks):Ft.target.addScaledVector(pa,1-Math.exp(-10*i)),vn.copy(Ie.position).sub(Pd),Ie.position.copy(Ft.target).add(vn),Ft.update(),jl()}const Pd=new T,Nv=["jump","crouch","dive","sideFlip","climbDown","backflip","sideJump","diveJump","grab","driveGas","driveBrake","driveLeft","driveRight"];function Kl(){pr?.setDriving(ae.driving);const i=document.getElementById("kart-panel"),t=document.getElementById("kart-action"),e=document.getElementById("kart-status");i.hidden=Yn!=="walk"||!ae.driving&&!ae.near(be);const n=ae.driving?"Exit kart":"Drive kart";t.textContent!==n&&(t.textContent=n);const s=ae.message||(ae.driving?ae.mph+" MPH":vs?"Ready to drive":"R to drive");e.textContent!==s&&(e.textContent=s)}function Cd(){ae.toggle(be)&&(pr?.setDriving(ae.driving),Vi("walk")),dr=performance.now()+1e3,Kl(),Is()}function Ld(i){if(yn=null,Yn!=="walk"||document.hidden)return;const t=Math.min(.05,so?(i-so)/1e3:1/60);if(so=i,Te.update(1,!1),Te.wasPressed("grab")&&(Cd(),yn!==null))return;if((Te.moveStrength>.001||Te.look.lengthSq()>1e-5||Nv.some(n=>Te.isDown(n)||Te.wasPressed(n))||be.player.state!=="ground"||be.player.speed>.02||ae.driving&&!ae.state.grounded)&&(dr=i+650),i<dr){if(io=!0,Pd.copy(Ft.target),Te.look.lengthSq()>1e-5){ul=i+1800,vn.copy(Ie.position).sub(Ft.target);const s=Ft.getAzimuthalAngle()-Te.look.x,r=at.clamp(Ft.getPolarAngle()+Te.look.y,.08,Math.PI*.48);vn.setFromSphericalCoords(vn.length(),r,s),Ie.position.copy(Ft.target).add(vn),Ft.update()}if(ae.driving){if(ae.update(t,Te,be),!ae.driving){io=!1,Vi("walk");return}if(ae.driving&&ae.state.speed>2&&i>ul){const s=Ft.getAzimuthalAngle(),r=ae.state.yaw+Math.PI,o=Math.atan2(Math.sin(r-s),Math.cos(r-s));vn.copy(Ie.position).sub(Ft.target).setFromSphericalCoords(Ie.position.distanceTo(Ft.target),Ft.getPolarAngle(),s+o*(1-Math.exp(-1.9*t))),Ie.position.copy(Ft.target).add(vn)}}else be.step(t,Ft.getAzimuthalAngle(),Math.PI/2-Ft.getPolarAngle());Uv(t),io=!1;const n=1e3/(Dn?15:ui==="low"?30:60);i-Th>=n&&(Th=i,Is())}Kl(),yn=requestAnimationFrame(Ld)}function Dd(){yn===null&&!document.hidden&&(so=0,dr=performance.now()+700,yn=requestAnimationFrame(Ld))}function Vi(i){if(!["walk","angled","overhead","track"].includes(i))throw new TypeError("Unknown island view");if(yn!==null&&(cancelAnimationFrame(yn),yn=null),Te.releaseTouch(),Te.clear(),Yn=i,si=i==="walk"?oi:i==="angled"?nr:i==="track"?Ui:Ri,Ft.object=i==="walk"?Ie:si,Ft.minDistance=i==="walk"?5:90,Ft.maxDistance=i==="walk"?ae.driving?180:70:600,Ft.minPolarAngle=.08,Ft.maxPolarAngle=i==="walk"?Math.PI*.48:Math.PI*.7,i==="walk")be.focus(Ft.target),Ie.position.copy(Ft.target).add(ae.driving?new T(-Math.sin(ae.state.yaw)*25,14,-Math.cos(ae.state.yaw)*25):new T(0,11,19)),Ie.zoom=1;else if(i==="track")Rd(),Ui.zoom=1;else{const t=(i==="angled"?Ai.angledElevation:Ai.overheadElevation)*Math.PI/180,e=new T(i==="angled"?Ai.angledCamera.targetX:1.2857,i==="angled"?Ai.angledCamera.targetY:-1.3,i==="angled"?0:-4.225),n=i==="angled"?Ai.angledCamera.distance:170;si.position.copy(e).add(new T(0,n*Math.sin(t),n*Math.cos(t))),si.zoom=1,Ft.target.copy(e),si.updateProjectionMatrix()}Ft.update(),pe.dataset.view=i,document.body.dataset.view=i,pr?.setVisible(i==="walk");for(const[t,e]of[["explore","walk"],["overview","angled"],["top-view","overhead"],["track-view","track"]])document.getElementById(t).setAttribute("aria-pressed",String(i===e));document.getElementById("reset-avatar").hidden=i!=="walk",document.getElementById("camera-hint").textContent=i==="walk"?ae.driving?vs?"Left / Right: steer · Gas / Brake–Reverse · Stop to exit":"E / Up: gas · D / Down: brake/reverse · S/F or arrows: steer · R: exit · Backspace: reset":vs?"Touch left to move · Jump / Crouch · Drag right to look":"E/D/S/F or arrows: move · Space: jump · Shift: walk · C: crouch · R: kart · Backspace: reset":(Dn?"Compatibility view · ":"")+"Drag to orbit · "+(vs?"Pinch":"Scroll")+" to zoom · R: angled view",Kl(),Yl(),Is(),i==="walk"&&Dd()}function Zl(){ae.reset(be),pr?.setDriving(!1),Vi("walk"),pe.focus({preventScroll:!0})}window.addEventListener("resize",Yl);for(const[i,t]of[["explore","walk"],["overview","angled"],["top-view","overhead"],["track-view","track"]])document.getElementById(i).addEventListener("click",()=>{Vi(t),pe.focus({preventScroll:!0})});document.getElementById("reset-avatar").addEventListener("click",Zl);document.getElementById("kart-action").addEventListener("click",()=>{Cd(),pe.focus({preventScroll:!0})});ki.addEventListener("change",()=>{ql(ki.value),pe.focus({preventScroll:!0})});ki.addEventListener("focus",()=>{Te.releaseTouch(),Te.clear()});for(const i of["keydown","keyup"])ki.addEventListener(i,t=>t.stopPropagation());window.addEventListener("keydown",i=>{i.target instanceof HTMLSelectElement||(i.code==="Backspace"&&Yn==="walk"?(i.preventDefault(),i.repeat||Zl()):i.code==="KeyR"&&Yn!=="walk"&&!i.repeat&&Vi("angled"))});pe.addEventListener("contextmenu",i=>i.preventDefault());document.addEventListener("visibilitychange",()=>{Te.releaseTouch(),Te.clear(),pr?.clear(),document.hidden&&yn!==null?(cancelAnimationFrame(yn),yn=null):Yn==="walk"&&Dd()});window.__letsgoIsland={world:qe.world,avatar:be,kart:ae,trackLink:Ds,setQuality:ql,setView:Vi,resetAvatar:Zl,referenceLandmarks(){return si.updateMatrixWorld(),[...Fl.map(t=>({...t,kind:"tree"})),...Ol.map(t=>({...t,kind:"rock"})),...id.map(t=>({...t,kind:"shrub"}))].map(t=>{const e=new T(t.x+1,Es(t.x,t.z),t.z+1).project(si);return{id:t.kind+":"+t.id,sourceView:"overhead",source:t.source,screen:[(e.x+1)*pe.clientWidth/2,(1-e.y)*pe.clientHeight/2]}})},get collisionBoxes(){return qe.world.collisionBoxes()},setBlock(i,t,e,n){qe.world.set(i,t,e,n),qe.faces=ad(qe.world),uo=cd(qe.world),be.rebuildCollision(),Ad(),dr=performance.now()+1e3,Is()},get stats(){return{blocks:qe.world.cells.size,faces:qe.faces.length,drawCalls:Ue.info.render.calls,triangles:Ue.info.render.triangles,mode:pe.dataset.graphics,quality:ui,view:Yn,shadowSize:Oi[ui].shadowSize,pixelRatio:Dn?1:Ue.getPixelRatio()}}};ql(ui,!1);Vi("walk");Td();pe.dataset.scene="block-island";pe.dataset.ready="true";
