var Vc=Object.defineProperty;var Gc=(i,e,t)=>e in i?Vc(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var B=(i,e,t)=>Gc(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wo="180",Wc=0,Ma=1,Xc=2,Wl=1,Xl=2,bn=3,Wn=0,Ft=1,rn=2,An=0,ai=1,$r=2,Sa=3,ya=4,jc=5,ii=100,Yc=101,qc=102,Kc=103,Jc=104,$c=200,Zc=201,Qc=202,eh=203,Zr=204,Qr=205,th=206,nh=207,ih=208,sh=209,rh=210,oh=211,ah=212,lh=213,ch=214,eo=0,to=1,no=2,Pi=3,io=4,so=5,ro=6,oo=7,jl=0,hh=1,dh=2,Gn=0,Yl=1,ql=2,Kl=3,Xo=4,Jl=5,$l=6,Zl=7,Ql=300,Li=301,Di=302,ao=303,lo=304,or=306,co=1e3,ri=1001,ho=1002,an=1003,uh=1004,gs=1005,en=1006,hr=1007,oi=1008,pn=1009,ec=1010,tc=1011,is=1012,jo=1013,li=1014,En=1015,Rn=1016,Yo=1017,qo=1018,ss=1020,nc=35902,ic=35899,sc=1021,rc=1022,on=1023,rs=1026,os=1027,oc=1028,Ko=1029,ac=1030,Jo=1031,$o=1033,Ks=33776,Js=33777,$s=33778,Zs=33779,uo=35840,fo=35841,po=35842,mo=35843,go=36196,_o=37492,vo=37496,xo=37808,Mo=37809,So=37810,yo=37811,bo=37812,wo=37813,Eo=37814,To=37815,Ao=37816,Ro=37817,Co=37818,Po=37819,Lo=37820,Do=37821,Io=36492,Uo=36494,No=36495,Fo=36283,Oo=36284,ko=36285,Bo=36286,fh=3200,ph=3201,lc=0,mh=1,Hn="",zt="srgb",Ii="srgb-linear",tr="linear",st="srgb",hi=7680,ba=519,gh=512,_h=513,vh=514,cc=515,xh=516,Mh=517,Sh=518,yh=519,wa=35044,Ea="300 es",fn=2e3,nr=2001;class Fi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ta=1234567;const Qi=Math.PI/180,as=180/Math.PI;function Oi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pt[i&255]+Pt[i>>8&255]+Pt[i>>16&255]+Pt[i>>24&255]+"-"+Pt[e&255]+Pt[e>>8&255]+"-"+Pt[e>>16&15|64]+Pt[e>>24&255]+"-"+Pt[t&63|128]+Pt[t>>8&255]+"-"+Pt[t>>16&255]+Pt[t>>24&255]+Pt[n&255]+Pt[n>>8&255]+Pt[n>>16&255]+Pt[n>>24&255]).toLowerCase()}function He(i,e,t){return Math.max(e,Math.min(t,i))}function Zo(i,e){return(i%e+e)%e}function bh(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function wh(i,e,t){return i!==e?(t-i)/(e-i):0}function es(i,e,t){return(1-t)*i+t*e}function Eh(i,e,t,n){return es(i,e,1-Math.exp(-t*n))}function Th(i,e=1){return e-Math.abs(Zo(i,e*2)-e)}function Ah(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Rh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Ch(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Ph(i,e){return i+Math.random()*(e-i)}function Lh(i){return i*(.5-Math.random())}function Dh(i){i!==void 0&&(Ta=i);let e=Ta+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ih(i){return i*Qi}function Uh(i){return i*as}function Nh(i){return(i&i-1)===0&&i!==0}function Fh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Oh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function kh(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),d=r((e-n)/2),f=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,l*d,l*f,a*c);break;case"YZY":i.set(l*f,a*h,l*d,a*c);break;case"ZXZ":i.set(l*d,l*f,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*p,a*c);break;case"YXY":i.set(l*p,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ai(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ut(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ue={DEG2RAD:Qi,RAD2DEG:as,generateUUID:Oi,clamp:He,euclideanModulo:Zo,mapLinear:bh,inverseLerp:wh,lerp:es,damp:Eh,pingpong:Th,smoothstep:Ah,smootherstep:Rh,randInt:Ch,randFloat:Ph,randFloatSpread:Lh,seededRandom:Dh,degToRad:Ih,radToDeg:Uh,isPowerOfTwo:Nh,ceilPowerOfTwo:Fh,floorPowerOfTwo:Oh,setQuaternionFromProperEuler:kh,normalize:Ut,denormalize:Ai};class Ce{constructor(e=0,t=0){Ce.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class hs{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3];const f=r[o+0],p=r[o+1],g=r[o+2],S=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=S;return}if(d!==S||l!==f||c!==p||h!==g){let m=1-a;const u=l*f+c*p+h*g+d*S,E=u>=0?1:-1,y=1-u*u;if(y>Number.EPSILON){const R=Math.sqrt(y),T=Math.atan2(R,u*E);m=Math.sin(m*T)/R,a=Math.sin(a*T)/R}const v=a*E;if(l=l*m+f*v,c=c*m+p*v,h=h*m+g*v,d=d*m+S*v,m===1-a){const R=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=R,c*=R,h*=R,d*=R}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*d+l*p-c*f,e[t+1]=l*g+h*f+c*d-a*p,e[t+2]=c*g+h*p+a*f-l*d,e[t+3]=h*g-a*d-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),d=a(r/2),f=l(n/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*h*d+c*p*g,this._y=c*p*d-f*h*g,this._z=c*h*g+f*p*d,this._w=c*h*d-f*p*g;break;case"YXZ":this._x=f*h*d+c*p*g,this._y=c*p*d-f*h*g,this._z=c*h*g-f*p*d,this._w=c*h*d+f*p*g;break;case"ZXY":this._x=f*h*d-c*p*g,this._y=c*p*d+f*h*g,this._z=c*h*g+f*p*d,this._w=c*h*d-f*p*g;break;case"ZYX":this._x=f*h*d-c*p*g,this._y=c*p*d+f*h*g,this._z=c*h*g-f*p*d,this._w=c*h*d+f*p*g;break;case"YZX":this._x=f*h*d+c*p*g,this._y=c*p*d+f*h*g,this._z=c*h*g-f*p*d,this._w=c*h*d-f*p*g;break;case"XZY":this._x=f*h*d-c*p*g,this._y=c*p*d-f*h*g,this._z=c*h*g+f*p*d,this._w=c*h*d+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],d=t[10],f=n+a+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(n>a&&n>d){const p=2*Math.sqrt(1+n-a-d);this._w=(h-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-n-d);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-n-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(He(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-t)*h)/c,f=Math.sin(t*h)/c;return this._w=o*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Aa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Aa.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),h=2*(a*t-r*s),d=2*(r*n-o*t);return this.x=t+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return dr.copy(this).projectOnVector(e),this.sub(dr)}reflect(e){return this.sub(dr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const dr=new P,Aa=new hs;class Ye{constructor(e,t,n,s,r,o,a,l,c){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],f=n[2],p=n[5],g=n[8],S=s[0],m=s[3],u=s[6],E=s[1],y=s[4],v=s[7],R=s[2],T=s[5],C=s[8];return r[0]=o*S+a*E+l*R,r[3]=o*m+a*y+l*T,r[6]=o*u+a*v+l*C,r[1]=c*S+h*E+d*R,r[4]=c*m+h*y+d*T,r[7]=c*u+h*v+d*C,r[2]=f*S+p*E+g*R,r[5]=f*m+p*y+g*T,r[8]=f*u+p*v+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,f=a*l-h*r,p=c*r-o*l,g=t*d+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/g;return e[0]=d*S,e[1]=(s*c-h*n)*S,e[2]=(a*n-s*o)*S,e[3]=f*S,e[4]=(h*t-s*l)*S,e[5]=(s*r-a*t)*S,e[6]=p*S,e[7]=(n*l-c*t)*S,e[8]=(o*t-n*r)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ur.makeScale(e,t)),this}rotate(e){return this.premultiply(ur.makeRotation(-e)),this}translate(e,t){return this.premultiply(ur.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ur=new Ye;function hc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ir(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Bh(){const i=ir("canvas");return i.style.display="block",i}const Ra={};function ls(i){i in Ra||(Ra[i]=!0,console.warn(i))}function zh(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Ca=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pa=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Hh(){const i={enabled:!0,workingColorSpace:Ii,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===st&&(s.r=Cn(s.r),s.g=Cn(s.g),s.b=Cn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===st&&(s.r=Ci(s.r),s.g=Ci(s.g),s.b=Ci(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hn?tr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ls("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ls("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ii]:{primaries:e,whitePoint:n,transfer:tr,toXYZ:Ca,fromXYZ:Pa,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:zt},outputColorSpaceConfig:{drawingBufferColorSpace:zt}},[zt]:{primaries:e,whitePoint:n,transfer:st,toXYZ:Ca,fromXYZ:Pa,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:zt}}}),i}const Qe=Hh();function Cn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ci(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let di;class Vh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{di===void 0&&(di=ir("canvas")),di.width=e.width,di.height=e.height;const s=di.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=di}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ir("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Cn(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Cn(t[n]/255)*255):t[n]=Cn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Gh=0;class Qo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gh++}),this.uuid=Oi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(fr(s[o].image)):r.push(fr(s[o]))}else r=fr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function fr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Vh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wh=0;const pr=new P;class Ot extends Fi{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,n=ri,s=ri,r=en,o=oi,a=on,l=pn,c=Ot.DEFAULT_ANISOTROPY,h=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=Oi(),this.name="",this.source=new Qo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ce(0,0),this.repeat=new Ce(1,1),this.center=new Ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(pr).x}get height(){return this.source.getSize(pr).y}get depth(){return this.source.getSize(pr).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ql)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case co:e.x=e.x-Math.floor(e.x);break;case ri:e.x=e.x<0?0:1;break;case ho:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case co:e.y=e.y-Math.floor(e.y);break;case ri:e.y=e.y<0?0:1;break;case ho:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=Ql;Ot.DEFAULT_ANISOTROPY=1;class pt{constructor(e=0,t=0,n=0,s=1){pt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],d=l[8],f=l[1],p=l[5],g=l[9],S=l[2],m=l[6],u=l[10];if(Math.abs(h-f)<.01&&Math.abs(d-S)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+S)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,v=(p+1)/2,R=(u+1)/2,T=(h+f)/4,C=(d+S)/4,U=(g+m)/4;return y>v&&y>R?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=T/n,r=C/n):v>R?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=T/s,r=U/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=C/r,s=U/r),this.set(n,s,r,t),this}let E=Math.sqrt((m-g)*(m-g)+(d-S)*(d-S)+(f-h)*(f-h));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(d-S)/E,this.z=(f-h)/E,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this.w=He(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this.w=He(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xh extends Fi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new Ot(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:en,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Qo(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ln extends Xh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class dc extends Ot{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class jh extends Ot{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ht{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,tn):tn.fromBufferAttribute(r,o),tn.applyMatrix4(e.matrixWorld),this.expandByPoint(tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_s.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_s.copy(n.boundingBox)),_s.applyMatrix4(e.matrixWorld),this.union(_s)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,tn),tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vi),vs.subVectors(this.max,Vi),ui.subVectors(e.a,Vi),fi.subVectors(e.b,Vi),pi.subVectors(e.c,Vi),Ln.subVectors(fi,ui),Dn.subVectors(pi,fi),Yn.subVectors(ui,pi);let t=[0,-Ln.z,Ln.y,0,-Dn.z,Dn.y,0,-Yn.z,Yn.y,Ln.z,0,-Ln.x,Dn.z,0,-Dn.x,Yn.z,0,-Yn.x,-Ln.y,Ln.x,0,-Dn.y,Dn.x,0,-Yn.y,Yn.x,0];return!mr(t,ui,fi,pi,vs)||(t=[1,0,0,0,1,0,0,0,1],!mr(t,ui,fi,pi,vs))?!1:(xs.crossVectors(Ln,Dn),t=[xs.x,xs.y,xs.z],mr(t,ui,fi,pi,vs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const _n=[new P,new P,new P,new P,new P,new P,new P,new P],tn=new P,_s=new Ht,ui=new P,fi=new P,pi=new P,Ln=new P,Dn=new P,Yn=new P,Vi=new P,vs=new P,xs=new P,qn=new P;function mr(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){qn.fromArray(i,r);const a=s.x*Math.abs(qn.x)+s.y*Math.abs(qn.y)+s.z*Math.abs(qn.z),l=e.dot(qn),c=t.dot(qn),h=n.dot(qn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Yh=new Ht,Gi=new P,gr=new P;class ds{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Yh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Gi.subVectors(e,this.center);const t=Gi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Gi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(gr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Gi.copy(e.center).add(gr)),this.expandByPoint(Gi.copy(e.center).sub(gr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const vn=new P,_r=new P,Ms=new P,In=new P,vr=new P,Ss=new P,xr=new P;class ea{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=vn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vn.copy(this.origin).addScaledVector(this.direction,t),vn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){_r.copy(e).add(t).multiplyScalar(.5),Ms.copy(t).sub(e).normalize(),In.copy(this.origin).sub(_r);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Ms),a=In.dot(this.direction),l=-In.dot(Ms),c=In.lengthSq(),h=Math.abs(1-o*o);let d,f,p,g;if(h>0)if(d=o*l-a,f=o*a-l,g=r*h,d>=0)if(f>=-g)if(f<=g){const S=1/h;d*=S,f*=S,p=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-o*r+a)),f=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(d=Math.max(0,-(o*r+a)),f=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+f*(f+2*l)+c);else f=o>0?-r:r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(_r).addScaledVector(Ms,f),p}intersectSphere(e,t){vn.subVectors(e.center,this.origin);const n=vn.dot(this.direction),s=vn.dot(vn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,vn)!==null}intersectTriangle(e,t,n,s,r){vr.subVectors(t,e),Ss.subVectors(n,e),xr.crossVectors(vr,Ss);let o=this.direction.dot(xr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;In.subVectors(this.origin,e);const l=a*this.direction.dot(Ss.crossVectors(In,Ss));if(l<0)return null;const c=a*this.direction.dot(vr.cross(In));if(c<0||l+c>o)return null;const h=-a*In.dot(xr);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class mt{constructor(e,t,n,s,r,o,a,l,c,h,d,f,p,g,S,m){mt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,h,d,f,p,g,S,m)}set(e,t,n,s,r,o,a,l,c,h,d,f,p,g,S,m){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=s,u[1]=r,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=h,u[10]=d,u[14]=f,u[3]=p,u[7]=g,u[11]=S,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new mt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/mi.setFromMatrixColumn(e,0).length(),r=1/mi.setFromMatrixColumn(e,1).length(),o=1/mi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const f=o*h,p=o*d,g=a*h,S=a*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=p+g*c,t[5]=f-S*c,t[9]=-a*l,t[2]=S-f*c,t[6]=g+p*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*h,p=l*d,g=c*h,S=c*d;t[0]=f+S*a,t[4]=g*a-p,t[8]=o*c,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=S+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*h,p=l*d,g=c*h,S=c*d;t[0]=f-S*a,t[4]=-o*d,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=S-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*h,p=o*d,g=a*h,S=a*d;t[0]=l*h,t[4]=g*c-p,t[8]=f*c+S,t[1]=l*d,t[5]=S*c+f,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,g=a*l,S=a*c;t[0]=l*h,t[4]=S-f*d,t[8]=g*d+p,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=p*d+g,t[10]=f-S*d}else if(e.order==="XZY"){const f=o*l,p=o*c,g=a*l,S=a*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=f*d+S,t[5]=o*h,t[9]=p*d-g,t[2]=g*d-p,t[6]=a*h,t[10]=S*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qh,e,Kh)}lookAt(e,t,n){const s=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),Un.crossVectors(n,Xt),Un.lengthSq()===0&&(Math.abs(n.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),Un.crossVectors(n,Xt)),Un.normalize(),ys.crossVectors(Xt,Un),s[0]=Un.x,s[4]=ys.x,s[8]=Xt.x,s[1]=Un.y,s[5]=ys.y,s[9]=Xt.y,s[2]=Un.z,s[6]=ys.z,s[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],f=n[9],p=n[13],g=n[2],S=n[6],m=n[10],u=n[14],E=n[3],y=n[7],v=n[11],R=n[15],T=s[0],C=s[4],U=s[8],w=s[12],M=s[1],I=s[5],D=s[9],H=s[13],X=s[2],Y=s[6],q=s[10],ee=s[14],j=s[3],oe=s[7],he=s[11],Ee=s[15];return r[0]=o*T+a*M+l*X+c*j,r[4]=o*C+a*I+l*Y+c*oe,r[8]=o*U+a*D+l*q+c*he,r[12]=o*w+a*H+l*ee+c*Ee,r[1]=h*T+d*M+f*X+p*j,r[5]=h*C+d*I+f*Y+p*oe,r[9]=h*U+d*D+f*q+p*he,r[13]=h*w+d*H+f*ee+p*Ee,r[2]=g*T+S*M+m*X+u*j,r[6]=g*C+S*I+m*Y+u*oe,r[10]=g*U+S*D+m*q+u*he,r[14]=g*w+S*H+m*ee+u*Ee,r[3]=E*T+y*M+v*X+R*j,r[7]=E*C+y*I+v*Y+R*oe,r[11]=E*U+y*D+v*q+R*he,r[15]=E*w+y*H+v*ee+R*Ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],f=e[10],p=e[14],g=e[3],S=e[7],m=e[11],u=e[15];return g*(+r*l*d-s*c*d-r*a*f+n*c*f+s*a*p-n*l*p)+S*(+t*l*p-t*c*f+r*o*f-s*o*p+s*c*h-r*l*h)+m*(+t*c*d-t*a*p-r*o*d+n*o*p+r*a*h-n*c*h)+u*(-s*a*h-t*l*d+t*a*f+s*o*d-n*o*f+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],f=e[10],p=e[11],g=e[12],S=e[13],m=e[14],u=e[15],E=d*m*c-S*f*c+S*l*p-a*m*p-d*l*u+a*f*u,y=g*f*c-h*m*c-g*l*p+o*m*p+h*l*u-o*f*u,v=h*S*c-g*d*c+g*a*p-o*S*p-h*a*u+o*d*u,R=g*d*l-h*S*l-g*a*f+o*S*f+h*a*m-o*d*m,T=t*E+n*y+s*v+r*R;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/T;return e[0]=E*C,e[1]=(S*f*r-d*m*r-S*s*p+n*m*p+d*s*u-n*f*u)*C,e[2]=(a*m*r-S*l*r+S*s*c-n*m*c-a*s*u+n*l*u)*C,e[3]=(d*l*r-a*f*r-d*s*c+n*f*c+a*s*p-n*l*p)*C,e[4]=y*C,e[5]=(h*m*r-g*f*r+g*s*p-t*m*p-h*s*u+t*f*u)*C,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*u-t*l*u)*C,e[7]=(o*f*r-h*l*r+h*s*c-t*f*c-o*s*p+t*l*p)*C,e[8]=v*C,e[9]=(g*d*r-h*S*r-g*n*p+t*S*p+h*n*u-t*d*u)*C,e[10]=(o*S*r-g*a*r+g*n*c-t*S*c-o*n*u+t*a*u)*C,e[11]=(h*a*r-o*d*r-h*n*c+t*d*c+o*n*p-t*a*p)*C,e[12]=R*C,e[13]=(h*S*s-g*d*s+g*n*f-t*S*f-h*n*m+t*d*m)*C,e[14]=(g*a*s-o*S*s-g*n*l+t*S*l+o*n*m-t*a*m)*C,e[15]=(o*d*s-h*a*s+h*n*l-t*d*l-o*n*f+t*a*f)*C,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,d=a+a,f=r*c,p=r*h,g=r*d,S=o*h,m=o*d,u=a*d,E=l*c,y=l*h,v=l*d,R=n.x,T=n.y,C=n.z;return s[0]=(1-(S+u))*R,s[1]=(p+v)*R,s[2]=(g-y)*R,s[3]=0,s[4]=(p-v)*T,s[5]=(1-(f+u))*T,s[6]=(m+E)*T,s[7]=0,s[8]=(g+y)*C,s[9]=(m-E)*C,s[10]=(1-(f+S))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=mi.set(s[0],s[1],s[2]).length();const o=mi.set(s[4],s[5],s[6]).length(),a=mi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],nn.copy(this);const c=1/r,h=1/o,d=1/a;return nn.elements[0]*=c,nn.elements[1]*=c,nn.elements[2]*=c,nn.elements[4]*=h,nn.elements[5]*=h,nn.elements[6]*=h,nn.elements[8]*=d,nn.elements[9]*=d,nn.elements[10]*=d,t.setFromRotationMatrix(nn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=fn,l=!1){const c=this.elements,h=2*r/(t-e),d=2*r/(n-s),f=(t+e)/(t-e),p=(n+s)/(n-s);let g,S;if(l)g=r/(o-r),S=o*r/(o-r);else if(a===fn)g=-(o+r)/(o-r),S=-2*o*r/(o-r);else if(a===nr)g=-o/(o-r),S=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=fn,l=!1){const c=this.elements,h=2/(t-e),d=2/(n-s),f=-(t+e)/(t-e),p=-(n+s)/(n-s);let g,S;if(l)g=1/(o-r),S=o/(o-r);else if(a===fn)g=-2/(o-r),S=-(o+r)/(o-r);else if(a===nr)g=-1/(o-r),S=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const mi=new P,nn=new mt,qh=new P(0,0,0),Kh=new P(1,1,1),Un=new P,ys=new P,Xt=new P,La=new mt,Da=new hs;class mn{constructor(e=0,t=0,n=0,s=mn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-He(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(He(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-He(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(He(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return La.makeRotationFromQuaternion(e),this.setFromRotationMatrix(La,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Da.setFromEuler(this),this.setFromQuaternion(Da,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}mn.DEFAULT_ORDER="XYZ";class ta{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Jh=0;const Ia=new P,gi=new hs,xn=new mt,bs=new P,Wi=new P,$h=new P,Zh=new hs,Ua=new P(1,0,0),Na=new P(0,1,0),Fa=new P(0,0,1),Oa={type:"added"},Qh={type:"removed"},_i={type:"childadded",child:null},Mr={type:"childremoved",child:null};class yt extends Fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=Oi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new P,t=new mn,n=new hs,s=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new mt},normalMatrix:{value:new Ye}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ta,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return gi.setFromAxisAngle(e,t),this.quaternion.multiply(gi),this}rotateOnWorldAxis(e,t){return gi.setFromAxisAngle(e,t),this.quaternion.premultiply(gi),this}rotateX(e){return this.rotateOnAxis(Ua,e)}rotateY(e){return this.rotateOnAxis(Na,e)}rotateZ(e){return this.rotateOnAxis(Fa,e)}translateOnAxis(e,t){return Ia.copy(e).applyQuaternion(this.quaternion),this.position.add(Ia.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ua,e)}translateY(e){return this.translateOnAxis(Na,e)}translateZ(e){return this.translateOnAxis(Fa,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?bs.copy(e):bs.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Wi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(Wi,bs,this.up):xn.lookAt(bs,Wi,this.up),this.quaternion.setFromRotationMatrix(xn),s&&(xn.extractRotation(s.matrixWorld),gi.setFromRotationMatrix(xn),this.quaternion.premultiply(gi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Oa),_i.child=e,this.dispatchEvent(_i),_i.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qh),Mr.child=e,this.dispatchEvent(Mr),Mr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(xn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Oa),_i.child=e,this.dispatchEvent(_i),_i.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,e,$h),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,Zh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),f=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}yt.DEFAULT_UP=new P(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const sn=new P,Mn=new P,Sr=new P,Sn=new P,vi=new P,xi=new P,ka=new P,yr=new P,br=new P,wr=new P,Er=new pt,Tr=new pt,Ar=new pt;class Qt{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),sn.subVectors(e,t),s.cross(sn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){sn.subVectors(s,t),Mn.subVectors(n,t),Sr.subVectors(e,t);const o=sn.dot(sn),a=sn.dot(Mn),l=sn.dot(Sr),c=Mn.dot(Mn),h=Mn.dot(Sr),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const f=1/d,p=(c*l-a*h)*f,g=(o*h-a*l)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Sn)===null?!1:Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Sn.x),l.addScaledVector(o,Sn.y),l.addScaledVector(a,Sn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return Er.setScalar(0),Tr.setScalar(0),Ar.setScalar(0),Er.fromBufferAttribute(e,t),Tr.fromBufferAttribute(e,n),Ar.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Er,r.x),o.addScaledVector(Tr,r.y),o.addScaledVector(Ar,r.z),o}static isFrontFacing(e,t,n,s){return sn.subVectors(n,t),Mn.subVectors(e,t),sn.cross(Mn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return sn.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),sn.cross(Mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Qt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Qt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;vi.subVectors(s,n),xi.subVectors(r,n),yr.subVectors(e,n);const l=vi.dot(yr),c=xi.dot(yr);if(l<=0&&c<=0)return t.copy(n);br.subVectors(e,s);const h=vi.dot(br),d=xi.dot(br);if(h>=0&&d<=h)return t.copy(s);const f=l*d-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(vi,o);wr.subVectors(e,r);const p=vi.dot(wr),g=xi.dot(wr);if(g>=0&&p<=g)return t.copy(r);const S=p*c-l*g;if(S<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(xi,a);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return ka.subVectors(r,s),a=(d-h)/(d-h+(p-g)),t.copy(s).addScaledVector(ka,a);const u=1/(m+S+f);return o=S*u,a=f*u,t.copy(n).addScaledVector(vi,o).addScaledVector(xi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const uc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},ws={h:0,s:0,l:0};function Rr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class fe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qe.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Qe.workingColorSpace){if(e=Zo(e,1),t=He(t,0,1),n=He(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Rr(o,r,e+1/3),this.g=Rr(o,r,e),this.b=Rr(o,r,e-1/3)}return Qe.colorSpaceToWorking(this,s),this}setStyle(e,t=zt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){const n=uc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Cn(e.r),this.g=Cn(e.g),this.b=Cn(e.b),this}copyLinearToSRGB(e){return this.r=Ci(e.r),this.g=Ci(e.g),this.b=Ci(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return Qe.workingToColorSpace(Lt.copy(this),e),Math.round(He(Lt.r*255,0,255))*65536+Math.round(He(Lt.g*255,0,255))*256+Math.round(He(Lt.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(Lt.copy(this),t);const n=Lt.r,s=Lt.g,r=Lt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(Lt.copy(this),t),e.r=Lt.r,e.g=Lt.g,e.b=Lt.b,e}getStyle(e=zt){Qe.workingToColorSpace(Lt.copy(this),e);const t=Lt.r,n=Lt.g,s=Lt.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Nn),this.setHSL(Nn.h+e,Nn.s+t,Nn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Nn),e.getHSL(ws);const n=es(Nn.h,ws.h,t),s=es(Nn.s,ws.s,t),r=es(Nn.l,ws.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Lt=new fe;fe.NAMES=uc;let ed=0;class ki extends Fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=Oi(),this.name="",this.type="Material",this.blending=ai,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zr,this.blendDst=Qr,this.blendEquation=ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new fe(0,0,0),this.blendAlpha=0,this.depthFunc=Pi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ba,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hi,this.stencilZFail=hi,this.stencilZPass=hi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ai&&(n.blending=this.blending),this.side!==Wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Zr&&(n.blendSrc=this.blendSrc),this.blendDst!==Qr&&(n.blendDst=this.blendDst),this.blendEquation!==ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Pi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ba&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==hi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==hi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==hi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class us extends ki{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.combine=jl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Mt=new P,Es=new Ce;let td=0;class Yt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:td++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=wa,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Es.fromBufferAttribute(this,t),Es.applyMatrix3(e),this.setXY(t,Es.x,Es.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ai(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ai(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ai(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ai(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ai(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),s=Ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),s=Ut(s,this.array),r=Ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==wa&&(e.usage=this.usage),e}}class fc extends Yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class pc extends Yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class bt extends Yt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let nd=0;const Jt=new mt,Cr=new yt,Mi=new P,jt=new Ht,Xi=new Ht,Tt=new P;class Vt extends Fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=Oi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(hc(e)?pc:fc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ye().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Jt.makeRotationFromQuaternion(e),this.applyMatrix4(Jt),this}rotateX(e){return Jt.makeRotationX(e),this.applyMatrix4(Jt),this}rotateY(e){return Jt.makeRotationY(e),this.applyMatrix4(Jt),this}rotateZ(e){return Jt.makeRotationZ(e),this.applyMatrix4(Jt),this}translate(e,t,n){return Jt.makeTranslation(e,t,n),this.applyMatrix4(Jt),this}scale(e,t,n){return Jt.makeScale(e,t,n),this.applyMatrix4(Jt),this}lookAt(e){return Cr.lookAt(e),Cr.updateMatrix(),this.applyMatrix4(Cr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mi).negate(),this.translate(Mi.x,Mi.y,Mi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new bt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ht);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];jt.setFromBufferAttribute(r),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,jt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,jt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(jt.min),this.boundingBox.expandByPoint(jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ds);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(jt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Xi.setFromBufferAttribute(a),this.morphTargetsRelative?(Tt.addVectors(jt.min,Xi.min),jt.expandByPoint(Tt),Tt.addVectors(jt.max,Xi.max),jt.expandByPoint(Tt)):(jt.expandByPoint(Xi.min),jt.expandByPoint(Xi.max))}jt.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Tt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Tt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Tt.fromBufferAttribute(a,c),l&&(Mi.fromBufferAttribute(e,c),Tt.add(Mi)),s=Math.max(s,n.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Yt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let U=0;U<n.count;U++)a[U]=new P,l[U]=new P;const c=new P,h=new P,d=new P,f=new Ce,p=new Ce,g=new Ce,S=new P,m=new P;function u(U,w,M){c.fromBufferAttribute(n,U),h.fromBufferAttribute(n,w),d.fromBufferAttribute(n,M),f.fromBufferAttribute(r,U),p.fromBufferAttribute(r,w),g.fromBufferAttribute(r,M),h.sub(c),d.sub(c),p.sub(f),g.sub(f);const I=1/(p.x*g.y-g.x*p.y);isFinite(I)&&(S.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(I),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(I),a[U].add(S),a[w].add(S),a[M].add(S),l[U].add(m),l[w].add(m),l[M].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let U=0,w=E.length;U<w;++U){const M=E[U],I=M.start,D=M.count;for(let H=I,X=I+D;H<X;H+=3)u(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const y=new P,v=new P,R=new P,T=new P;function C(U){R.fromBufferAttribute(s,U),T.copy(R);const w=a[U];y.copy(w),y.sub(R.multiplyScalar(R.dot(w))).normalize(),v.crossVectors(T,w);const I=v.dot(l[U])<0?-1:1;o.setXYZW(U,y.x,y.y,y.z,I)}for(let U=0,w=E.length;U<w;++U){const M=E[U],I=M.start,D=M.count;for(let H=I,X=I+D;H<X;H+=3)C(e.getX(H+0)),C(e.getX(H+1)),C(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Yt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const s=new P,r=new P,o=new P,a=new P,l=new P,c=new P,h=new P,d=new P;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),S=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,S),o.fromBufferAttribute(t,m),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,S),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(S,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,d=a.normalized,f=new c.constructor(l.length*h);let p=0,g=0;for(let S=0,m=l.length;S<m;S++){a.isInterleavedBufferAttribute?p=l[S]*a.data.stride+a.offset:p=l[S]*h;for(let u=0;u<h;u++)f[g++]=c[p++]}return new Yt(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Vt,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){const f=c[h],p=e(f,n);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,f=c.length;d<f;d++){const p=c[d];h.push(p.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let f=0,p=d.length;f<p;f++)h.push(d[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ba=new mt,Kn=new ea,Ts=new ds,za=new P,As=new P,Rs=new P,Cs=new P,Pr=new P,Ps=new P,Ha=new P,Ls=new P;class We extends yt{constructor(e=new Vt,t=new us){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Ps.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],d=r[l];h!==0&&(Pr.fromBufferAttribute(d,e),o?Ps.addScaledVector(Pr,h):Ps.addScaledVector(Pr.sub(t),h))}t.add(Ps)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ts.copy(n.boundingSphere),Ts.applyMatrix4(r),Kn.copy(e.ray).recast(e.near),!(Ts.containsPoint(Kn.origin)===!1&&(Kn.intersectSphere(Ts,za)===null||Kn.origin.distanceToSquared(za)>(e.far-e.near)**2))&&(Ba.copy(r).invert(),Kn.copy(e.ray).applyMatrix4(Ba),!(n.boundingBox!==null&&Kn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Kn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,S=f.length;g<S;g++){const m=f[g],u=o[m.materialIndex],E=Math.max(m.start,p.start),y=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let v=E,R=y;v<R;v+=3){const T=a.getX(v),C=a.getX(v+1),U=a.getX(v+2);s=Ds(this,u,e,n,c,h,d,T,C,U),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),S=Math.min(a.count,p.start+p.count);for(let m=g,u=S;m<u;m+=3){const E=a.getX(m),y=a.getX(m+1),v=a.getX(m+2);s=Ds(this,o,e,n,c,h,d,E,y,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,S=f.length;g<S;g++){const m=f[g],u=o[m.materialIndex],E=Math.max(m.start,p.start),y=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=E,R=y;v<R;v+=3){const T=v,C=v+1,U=v+2;s=Ds(this,u,e,n,c,h,d,T,C,U),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),S=Math.min(l.count,p.start+p.count);for(let m=g,u=S;m<u;m+=3){const E=m,y=m+1,v=m+2;s=Ds(this,o,e,n,c,h,d,E,y,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function id(i,e,t,n,s,r,o,a){let l;if(e.side===Ft?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===Wn,a),l===null)return null;Ls.copy(a),Ls.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Ls);return c<t.near||c>t.far?null:{distance:c,point:Ls.clone(),object:i}}function Ds(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,As),i.getVertexPosition(l,Rs),i.getVertexPosition(c,Cs);const h=id(i,e,t,n,As,Rs,Cs,Ha);if(h){const d=new P;Qt.getBarycoord(Ha,As,Rs,Cs,d),s&&(h.uv=Qt.getInterpolatedAttribute(s,a,l,c,d,new Ce)),r&&(h.uv1=Qt.getInterpolatedAttribute(r,a,l,c,d,new Ce)),o&&(h.normal=Qt.getInterpolatedAttribute(o,a,l,c,d,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new P,materialIndex:0};Qt.getNormal(As,Rs,Cs,f.normal),h.face=f,h.barycoord=d}return h}class St extends Vt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],d=[];let f=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new bt(c,3)),this.setAttribute("normal",new bt(h,3)),this.setAttribute("uv",new bt(d,2));function g(S,m,u,E,y,v,R,T,C,U,w){const M=v/C,I=R/U,D=v/2,H=R/2,X=T/2,Y=C+1,q=U+1;let ee=0,j=0;const oe=new P;for(let he=0;he<q;he++){const Ee=he*I-H;for(let Xe=0;Xe<Y;Xe++){const G=Xe*M-D;oe[S]=G*E,oe[m]=Ee*y,oe[u]=X,c.push(oe.x,oe.y,oe.z),oe[S]=0,oe[m]=0,oe[u]=T>0?1:-1,h.push(oe.x,oe.y,oe.z),d.push(Xe/C),d.push(1-he/U),ee+=1}}for(let he=0;he<U;he++)for(let Ee=0;Ee<C;Ee++){const Xe=f+Ee+Y*he,G=f+Ee+Y*(he+1),Ve=f+(Ee+1)+Y*(he+1),Ge=f+(Ee+1)+Y*he;l.push(Xe,G,Ge),l.push(G,Ve,Ge),j+=6}a.addGroup(p,j,w),p+=j,f+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new St(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ui(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Nt(i){const e={};for(let t=0;t<i.length;t++){const n=Ui(i[t]);for(const s in n)e[s]=n[s]}return e}function sd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function mc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const cs={clone:Ui,merge:Nt};var rd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,od=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ct extends ki{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rd,this.fragmentShader=od,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ui(e.uniforms),this.uniformsGroups=sd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class gc extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Fn=new P,Va=new Ce,Ga=new Ce;class Zt extends gc{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=as*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Qi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return as*2*Math.atan(Math.tan(Qi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Fn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z),Fn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z)}getViewSize(e,t){return this.getViewBounds(e,Va,Ga),t.subVectors(Ga,Va)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Qi*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Si=-90,yi=1;class ad extends yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Zt(Si,yi,e,t);s.layers=this.layers,this.add(s);const r=new Zt(Si,yi,e,t);r.layers=this.layers,this.add(r);const o=new Zt(Si,yi,e,t);o.layers=this.layers,this.add(o);const a=new Zt(Si,yi,e,t);a.layers=this.layers,this.add(a);const l=new Zt(Si,yi,e,t);l.layers=this.layers,this.add(l);const c=new Zt(Si,yi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===nr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const S=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=S,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(d,f,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class _c extends Ot{constructor(e=[],t=Li,n,s,r,o,a,l,c,h){super(e,t,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ld extends ln{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new _c(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new St(5,5,5),r=new Ct({name:"CubemapFromEquirect",uniforms:Ui(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ft,blending:An});r.uniforms.tEquirect.value=t;const o=new We(s,r),a=t.minFilter;return t.minFilter===oi&&(t.minFilter=en),new ad(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}class vt extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const cd={type:"move"};class Lr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const S of e.hand.values()){const m=t.getJointPose(S,n),u=this._getHandJoint(c,S);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(cd)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new vt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class na{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new fe(e),this.density=t}clone(){return new na(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class hd extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mn,this.environmentIntensity=1,this.environmentRotation=new mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Dr=new P,dd=new P,ud=new Ye;class zn{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Dr.subVectors(n,t).cross(dd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Dr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||ud.getNormalMatrix(e),s=this.coplanarPoint(Dr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Jn=new ds,fd=new Ce(.5,.5),Is=new P;class ia{constructor(e=new zn,t=new zn,n=new zn,s=new zn,r=new zn,o=new zn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=fn,n=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],f=r[6],p=r[7],g=r[8],S=r[9],m=r[10],u=r[11],E=r[12],y=r[13],v=r[14],R=r[15];if(s[0].setComponents(c-o,p-h,u-g,R-E).normalize(),s[1].setComponents(c+o,p+h,u+g,R+E).normalize(),s[2].setComponents(c+a,p+d,u+S,R+y).normalize(),s[3].setComponents(c-a,p-d,u-S,R-y).normalize(),n)s[4].setComponents(l,f,m,v).normalize(),s[5].setComponents(c-l,p-f,u-m,R-v).normalize();else if(s[4].setComponents(c-l,p-f,u-m,R-v).normalize(),t===fn)s[5].setComponents(c+l,p+f,u+m,R+v).normalize();else if(t===nr)s[5].setComponents(l,f,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Jn)}intersectsSprite(e){Jn.center.set(0,0,0);const t=fd.distanceTo(e.center);return Jn.radius=.7071067811865476+t,Jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Jn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Is.x=s.normal.x>0?e.max.x:e.min.x,Is.y=s.normal.y>0?e.max.y:e.min.y,Is.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Is)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class vc extends ki{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Wa=new mt,zo=new ea,Us=new ds,Ns=new P;class pd extends yt{constructor(e=new Vt,t=new vc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Us.copy(n.boundingSphere),Us.applyMatrix4(s),Us.radius+=r,e.ray.intersectsSphere(Us)===!1)return;Wa.copy(s).invert(),zo.copy(e.ray).applyMatrix4(Wa);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=f,S=p;g<S;g++){const m=c.getX(g);Ns.fromBufferAttribute(d,m),Xa(Ns,m,l,s,e,t,this)}}else{const f=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let g=f,S=p;g<S;g++)Ns.fromBufferAttribute(d,g),Xa(Ns,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Xa(i,e,t,n,s,r,o){const a=zo.distanceSqToPoint(i);if(a<t){const l=new P;zo.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class xc extends Ot{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Mc extends Ot{constructor(e,t,n=li,s,r,o,a=an,l=an,c,h=rs,d=1){if(h!==rs&&h!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Qo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Sc extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Tn extends Vt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],f=[],p=[];let g=0;const S=[],m=n/2;let u=0;E(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new bt(d,3)),this.setAttribute("normal",new bt(f,3)),this.setAttribute("uv",new bt(p,2));function E(){const v=new P,R=new P;let T=0;const C=(t-e)/n;for(let U=0;U<=r;U++){const w=[],M=U/r,I=M*(t-e)+e;for(let D=0;D<=s;D++){const H=D/s,X=H*l+a,Y=Math.sin(X),q=Math.cos(X);R.x=I*Y,R.y=-M*n+m,R.z=I*q,d.push(R.x,R.y,R.z),v.set(Y,C,q).normalize(),f.push(v.x,v.y,v.z),p.push(H,1-M),w.push(g++)}S.push(w)}for(let U=0;U<s;U++)for(let w=0;w<r;w++){const M=S[w][U],I=S[w+1][U],D=S[w+1][U+1],H=S[w][U+1];(e>0||w!==0)&&(h.push(M,I,H),T+=3),(t>0||w!==r-1)&&(h.push(I,D,H),T+=3)}c.addGroup(u,T,0),u+=T}function y(v){const R=g,T=new Ce,C=new P;let U=0;const w=v===!0?e:t,M=v===!0?1:-1;for(let D=1;D<=s;D++)d.push(0,m*M,0),f.push(0,M,0),p.push(.5,.5),g++;const I=g;for(let D=0;D<=s;D++){const X=D/s*l+a,Y=Math.cos(X),q=Math.sin(X);C.x=w*q,C.y=m*M,C.z=w*Y,d.push(C.x,C.y,C.z),f.push(0,M,0),T.x=Y*.5+.5,T.y=q*.5*M+.5,p.push(T.x,T.y),g++}for(let D=0;D<s;D++){const H=R+D,X=I+D;v===!0?h.push(X,X+1,H):h.push(X+1,X,H),U+=3}c.addGroup(u,U,v===!0?1:2),u+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class fs extends Vt{constructor(e=[new Ce(0,-.5),new Ce(.5,0),new Ce(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=He(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/t,d=new P,f=new Ce,p=new P,g=new P,S=new P;let m=0,u=0;for(let E=0;E<=e.length-1;E++)switch(E){case 0:m=e[E+1].x-e[E].x,u=e[E+1].y-e[E].y,p.x=u*1,p.y=-m,p.z=u*0,S.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(S.x,S.y,S.z);break;default:m=e[E+1].x-e[E].x,u=e[E+1].y-e[E].y,p.x=u*1,p.y=-m,p.z=u*0,g.copy(p),p.x+=S.x,p.y+=S.y,p.z+=S.z,p.normalize(),l.push(p.x,p.y,p.z),S.copy(g)}for(let E=0;E<=t;E++){const y=n+E*h*s,v=Math.sin(y),R=Math.cos(y);for(let T=0;T<=e.length-1;T++){d.x=e[T].x*v,d.y=e[T].y,d.z=e[T].x*R,o.push(d.x,d.y,d.z),f.x=E/t,f.y=T/(e.length-1),a.push(f.x,f.y);const C=l[3*T+0]*v,U=l[3*T+1],w=l[3*T+0]*R;c.push(C,U,w)}}for(let E=0;E<t;E++)for(let y=0;y<e.length-1;y++){const v=y+E*e.length,R=v,T=v+e.length,C=v+e.length+1,U=v+1;r.push(R,T,U),r.push(C,U,T)}this.setIndex(r),this.setAttribute("position",new bt(o,3)),this.setAttribute("uv",new bt(a,2)),this.setAttribute("normal",new bt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fs(e.points,e.segments,e.phiStart,e.phiLength)}}class Pn extends Vt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,d=e/a,f=t/l,p=[],g=[],S=[],m=[];for(let u=0;u<h;u++){const E=u*f-o;for(let y=0;y<c;y++){const v=y*d-r;g.push(v,-E,0),S.push(0,0,1),m.push(y/a),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let E=0;E<a;E++){const y=E+c*u,v=E+c*(u+1),R=E+1+c*(u+1),T=E+1+c*u;p.push(y,v,T),p.push(v,R,T)}this.setIndex(p),this.setAttribute("position",new bt(g,3)),this.setAttribute("normal",new bt(S,3)),this.setAttribute("uv",new bt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pn(e.width,e.height,e.widthSegments,e.heightSegments)}}class wn extends Vt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],d=new P,f=new P,p=[],g=[],S=[],m=[];for(let u=0;u<=n;u++){const E=[],y=u/n;let v=0;u===0&&o===0?v=.5/t:u===n&&l===Math.PI&&(v=-.5/t);for(let R=0;R<=t;R++){const T=R/t;d.x=-e*Math.cos(s+T*r)*Math.sin(o+y*a),d.y=e*Math.cos(o+y*a),d.z=e*Math.sin(s+T*r)*Math.sin(o+y*a),g.push(d.x,d.y,d.z),f.copy(d).normalize(),S.push(f.x,f.y,f.z),m.push(T+v,1-y),E.push(c++)}h.push(E)}for(let u=0;u<n;u++)for(let E=0;E<t;E++){const y=h[u][E+1],v=h[u][E],R=h[u+1][E],T=h[u+1][E+1];(u!==0||o>0)&&p.push(y,v,T),(u!==n-1||l<Math.PI)&&p.push(v,R,T)}this.setIndex(p),this.setAttribute("position",new bt(g,3)),this.setAttribute("normal",new bt(S,3)),this.setAttribute("uv",new bt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class md extends Ct{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class xt extends ki{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lc,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gd extends ki{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=fh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class _d extends ki{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class sa extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new fe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class vd extends sa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new fe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ir=new mt,ja=new P,Ya=new P;class xd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ce(512,512),this.mapType=pn,this.map=null,this.mapPass=null,this.matrix=new mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ia,this._frameExtents=new Ce(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;ja.setFromMatrixPosition(e.matrixWorld),t.position.copy(ja),Ya.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ya),t.updateMatrixWorld(),Ir.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ir,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ir)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ra extends gc{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Md extends xd{constructor(){super(new ra(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class qa extends sa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new Md}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Sd extends sa{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class yd extends Zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class yc{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const Ka=new P,Fs=new P,bi=new P,wi=new P,Ur=new P,bd=new P,wd=new P;class bc{constructor(e=new P,t=new P){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Ka.subVectors(e,this.start),Fs.subVectors(this.end,this.start);const n=Fs.dot(Fs);let r=Fs.dot(Ka)/n;return t&&(r=He(r,0,1)),r}closestPointToPoint(e,t,n){const s=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=bd,n=wd){const s=10000000000000001e-32;let r,o;const a=this.start,l=e.start,c=this.end,h=e.end;bi.subVectors(c,a),wi.subVectors(h,l),Ur.subVectors(a,l);const d=bi.dot(bi),f=wi.dot(wi),p=wi.dot(Ur);if(d<=s&&f<=s)return t.copy(a),n.copy(l),t.sub(n),t.dot(t);if(d<=s)r=0,o=p/f,o=He(o,0,1);else{const g=bi.dot(Ur);if(f<=s)o=0,r=He(-g/d,0,1);else{const S=bi.dot(wi),m=d*f-S*S;m!==0?r=He((S*p-g*f)/m,0,1):r=0,o=(S*r+p)/f,o<0?(o=0,r=He(-g/d,0,1)):o>1&&(o=1,r=He((S-g)/d,0,1))}}return t.copy(a).add(bi.multiplyScalar(r)),n.copy(l).add(wi.multiplyScalar(o)),t.sub(n),t.dot(t)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function Ja(i,e,t,n){const s=Ed(n);switch(t){case sc:return i*e;case oc:return i*e/s.components*s.byteLength;case Ko:return i*e/s.components*s.byteLength;case ac:return i*e*2/s.components*s.byteLength;case Jo:return i*e*2/s.components*s.byteLength;case rc:return i*e*3/s.components*s.byteLength;case on:return i*e*4/s.components*s.byteLength;case $o:return i*e*4/s.components*s.byteLength;case Ks:case Js:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case $s:case Zs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case fo:case mo:return Math.max(i,16)*Math.max(e,8)/4;case uo:case po:return Math.max(i,8)*Math.max(e,8)/2;case go:case _o:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case vo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case xo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Mo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case So:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case yo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case bo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case wo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Eo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case To:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ao:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ro:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Co:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Po:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Lo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Do:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Io:case Uo:case No:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Fo:case Oo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ko:case Bo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ed(i){switch(i){case pn:case ec:return{byteLength:1,components:1};case is:case tc:case Rn:return{byteLength:2,components:1};case Yo:case qo:return{byteLength:2,components:4};case li:case jo:case En:return{byteLength:4,components:1};case nc:case ic:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function wc(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Td(i){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,d=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,h);else{d.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<d.length;p++){const g=d[f],S=d[p];S.start<=g.start+g.count+1?g.count=Math.max(g.count,S.start+S.count-g.start):(++f,d[f]=S)}d.length=f+1;for(let p=0,g=d.length;p<g;p++){const S=d[p];i.bufferSubData(c,S.start*h.BYTES_PER_ELEMENT,h,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Ad=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Rd=`#ifdef USE_ALPHAHASH
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
#endif`,Cd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Pd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ld=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Dd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Id=`#ifdef USE_AOMAP
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
#endif`,Ud=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nd=`#ifdef USE_BATCHING
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
#endif`,Fd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Od=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,zd=`#ifdef USE_IRIDESCENCE
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
#endif`,Hd=`#ifdef USE_BUMPMAP
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
#endif`,Vd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Gd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Yd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,qd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Kd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Jd=`#define PI 3.141592653589793
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
} // validated`,$d=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Zd=`vec3 transformedNormal = objectNormal;
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
#endif`,Qd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,eu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,tu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,nu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,iu="gl_FragColor = linearToOutputTexel( gl_FragColor );",su=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ru=`#ifdef USE_ENVMAP
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
#endif`,ou=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,au=`#ifdef USE_ENVMAP
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
#endif`,lu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cu=`#ifdef USE_ENVMAP
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
#endif`,hu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,du=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,uu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pu=`#ifdef USE_GRADIENTMAP
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
}`,mu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_u=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vu=`uniform bool receiveShadow;
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
#endif`,xu=`#ifdef USE_ENVMAP
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
#endif`,Mu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Su=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wu=`PhysicalMaterial material;
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
#endif`,Eu=`struct PhysicalMaterial {
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
}`,Tu=`
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
#endif`,Au=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ru=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Du=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Iu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Uu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Nu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Fu=`#if defined( USE_POINTS_UV )
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
#endif`,Ou=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ku=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vu=`#ifdef USE_MORPHTARGETS
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
#endif`,Gu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Xu=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ju=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ku=`#ifdef USE_NORMALMAP
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
#endif`,Ju=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$u=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ef=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,nf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,of=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,af=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,hf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,df=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,uf=`float getShadowMask() {
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
}`,ff=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pf=`#ifdef USE_SKINNING
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
#endif`,mf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gf=`#ifdef USE_SKINNING
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
#endif`,_f=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Sf=`#ifdef USE_TRANSMISSION
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
#endif`,yf=`#ifdef USE_TRANSMISSION
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
#endif`,bf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ef=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Af=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Rf=`uniform sampler2D t2D;
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
}`,Cf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Lf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Df=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,If=`#include <common>
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
}`,Uf=`#if DEPTH_PACKING == 3200
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
}`,Nf=`#define DISTANCE
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
}`,Ff=`#define DISTANCE
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
}`,Of=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bf=`uniform float scale;
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
}`,zf=`uniform vec3 diffuse;
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
}`,Hf=`#include <common>
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
}`,Vf=`uniform vec3 diffuse;
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
}`,Gf=`#define LAMBERT
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
}`,Wf=`#define LAMBERT
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
}`,Xf=`#define MATCAP
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
}`,jf=`#define MATCAP
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
}`,Yf=`#define NORMAL
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
}`,qf=`#define NORMAL
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
}`,Kf=`#define PHONG
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
}`,Jf=`#define PHONG
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
}`,$f=`#define STANDARD
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
}`,Zf=`#define STANDARD
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
}`,Qf=`#define TOON
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
}`,ep=`#define TOON
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
}`,tp=`uniform float size;
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
}`,np=`uniform vec3 diffuse;
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
}`,ip=`#include <common>
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
}`,sp=`uniform vec3 color;
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
}`,rp=`uniform float rotation;
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
}`,op=`uniform vec3 diffuse;
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
}`,qe={alphahash_fragment:Ad,alphahash_pars_fragment:Rd,alphamap_fragment:Cd,alphamap_pars_fragment:Pd,alphatest_fragment:Ld,alphatest_pars_fragment:Dd,aomap_fragment:Id,aomap_pars_fragment:Ud,batching_pars_vertex:Nd,batching_vertex:Fd,begin_vertex:Od,beginnormal_vertex:kd,bsdfs:Bd,iridescence_fragment:zd,bumpmap_pars_fragment:Hd,clipping_planes_fragment:Vd,clipping_planes_pars_fragment:Gd,clipping_planes_pars_vertex:Wd,clipping_planes_vertex:Xd,color_fragment:jd,color_pars_fragment:Yd,color_pars_vertex:qd,color_vertex:Kd,common:Jd,cube_uv_reflection_fragment:$d,defaultnormal_vertex:Zd,displacementmap_pars_vertex:Qd,displacementmap_vertex:eu,emissivemap_fragment:tu,emissivemap_pars_fragment:nu,colorspace_fragment:iu,colorspace_pars_fragment:su,envmap_fragment:ru,envmap_common_pars_fragment:ou,envmap_pars_fragment:au,envmap_pars_vertex:lu,envmap_physical_pars_fragment:xu,envmap_vertex:cu,fog_vertex:hu,fog_pars_vertex:du,fog_fragment:uu,fog_pars_fragment:fu,gradientmap_pars_fragment:pu,lightmap_pars_fragment:mu,lights_lambert_fragment:gu,lights_lambert_pars_fragment:_u,lights_pars_begin:vu,lights_toon_fragment:Mu,lights_toon_pars_fragment:Su,lights_phong_fragment:yu,lights_phong_pars_fragment:bu,lights_physical_fragment:wu,lights_physical_pars_fragment:Eu,lights_fragment_begin:Tu,lights_fragment_maps:Au,lights_fragment_end:Ru,logdepthbuf_fragment:Cu,logdepthbuf_pars_fragment:Pu,logdepthbuf_pars_vertex:Lu,logdepthbuf_vertex:Du,map_fragment:Iu,map_pars_fragment:Uu,map_particle_fragment:Nu,map_particle_pars_fragment:Fu,metalnessmap_fragment:Ou,metalnessmap_pars_fragment:ku,morphinstance_vertex:Bu,morphcolor_vertex:zu,morphnormal_vertex:Hu,morphtarget_pars_vertex:Vu,morphtarget_vertex:Gu,normal_fragment_begin:Wu,normal_fragment_maps:Xu,normal_pars_fragment:ju,normal_pars_vertex:Yu,normal_vertex:qu,normalmap_pars_fragment:Ku,clearcoat_normal_fragment_begin:Ju,clearcoat_normal_fragment_maps:$u,clearcoat_pars_fragment:Zu,iridescence_pars_fragment:Qu,opaque_fragment:ef,packing:tf,premultiplied_alpha_fragment:nf,project_vertex:sf,dithering_fragment:rf,dithering_pars_fragment:of,roughnessmap_fragment:af,roughnessmap_pars_fragment:lf,shadowmap_pars_fragment:cf,shadowmap_pars_vertex:hf,shadowmap_vertex:df,shadowmask_pars_fragment:uf,skinbase_vertex:ff,skinning_pars_vertex:pf,skinning_vertex:mf,skinnormal_vertex:gf,specularmap_fragment:_f,specularmap_pars_fragment:vf,tonemapping_fragment:xf,tonemapping_pars_fragment:Mf,transmission_fragment:Sf,transmission_pars_fragment:yf,uv_pars_fragment:bf,uv_pars_vertex:wf,uv_vertex:Ef,worldpos_vertex:Tf,background_vert:Af,background_frag:Rf,backgroundCube_vert:Cf,backgroundCube_frag:Pf,cube_vert:Lf,cube_frag:Df,depth_vert:If,depth_frag:Uf,distanceRGBA_vert:Nf,distanceRGBA_frag:Ff,equirect_vert:Of,equirect_frag:kf,linedashed_vert:Bf,linedashed_frag:zf,meshbasic_vert:Hf,meshbasic_frag:Vf,meshlambert_vert:Gf,meshlambert_frag:Wf,meshmatcap_vert:Xf,meshmatcap_frag:jf,meshnormal_vert:Yf,meshnormal_frag:qf,meshphong_vert:Kf,meshphong_frag:Jf,meshphysical_vert:$f,meshphysical_frag:Zf,meshtoon_vert:Qf,meshtoon_frag:ep,points_vert:tp,points_frag:np,shadow_vert:ip,shadow_frag:sp,sprite_vert:rp,sprite_frag:op},ce={common:{diffuse:{value:new fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new Ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new fe(16777215)},opacity:{value:1},center:{value:new Ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},un={basic:{uniforms:Nt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:Nt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new fe(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:Nt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new fe(0)},specular:{value:new fe(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:Nt([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:Nt([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new fe(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:Nt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:Nt([ce.points,ce.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:Nt([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:Nt([ce.common,ce.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:Nt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:Nt([ce.sprite,ce.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:Nt([ce.common,ce.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:Nt([ce.lights,ce.fog,{color:{value:new fe(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};un.physical={uniforms:Nt([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new Ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new Ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new fe(0)},specularColor:{value:new fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new Ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const Os={r:0,b:0,g:0},$n=new mn,ap=new mt;function lp(i,e,t,n,s,r,o){const a=new fe(0);let l=r===!0?0:1,c,h,d=null,f=0,p=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?t:e).get(v)),v}function S(y){let v=!1;const R=g(y);R===null?u(a,l):R&&R.isColor&&(u(R,1),v=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,v){const R=g(v);R&&(R.isCubeTexture||R.mapping===or)?(h===void 0&&(h=new We(new St(1,1,1),new Ct({name:"BackgroundCubeMaterial",uniforms:Ui(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Ft,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,C,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),$n.copy(v.backgroundRotation),$n.x*=-1,$n.y*=-1,$n.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&($n.y*=-1,$n.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ap.makeRotationFromEuler($n)),h.material.toneMapped=Qe.getTransfer(R.colorSpace)!==st,(d!==R||f!==R.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,d=R,f=R.version,p=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new We(new Pn(2,2),new Ct({name:"BackgroundMaterial",uniforms:Ui(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(R.colorSpace)!==st,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(d!==R||f!==R.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,d=R,f=R.version,p=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function u(y,v){y.getRGB(Os,mc(i)),n.buffers.color.setClear(Os.r,Os.g,Os.b,v,o)}function E(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,v=1){a.set(y),l=v,u(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,u(a,l)},render:S,addToRenderList:m,dispose:E}}function cp(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(M,I,D,H,X){let Y=!1;const q=d(H,D,I);r!==q&&(r=q,c(r.object)),Y=p(M,H,D,X),Y&&g(M,H,D,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,v(M,I,D,H),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function d(M,I,D){const H=D.wireframe===!0;let X=n[M.id];X===void 0&&(X={},n[M.id]=X);let Y=X[I.id];Y===void 0&&(Y={},X[I.id]=Y);let q=Y[H];return q===void 0&&(q=f(l()),Y[H]=q),q}function f(M){const I=[],D=[],H=[];for(let X=0;X<t;X++)I[X]=0,D[X]=0,H[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:D,attributeDivisors:H,object:M,attributes:{},index:null}}function p(M,I,D,H){const X=r.attributes,Y=I.attributes;let q=0;const ee=D.getAttributes();for(const j in ee)if(ee[j].location>=0){const he=X[j];let Ee=Y[j];if(Ee===void 0&&(j==="instanceMatrix"&&M.instanceMatrix&&(Ee=M.instanceMatrix),j==="instanceColor"&&M.instanceColor&&(Ee=M.instanceColor)),he===void 0||he.attribute!==Ee||Ee&&he.data!==Ee.data)return!0;q++}return r.attributesNum!==q||r.index!==H}function g(M,I,D,H){const X={},Y=I.attributes;let q=0;const ee=D.getAttributes();for(const j in ee)if(ee[j].location>=0){let he=Y[j];he===void 0&&(j==="instanceMatrix"&&M.instanceMatrix&&(he=M.instanceMatrix),j==="instanceColor"&&M.instanceColor&&(he=M.instanceColor));const Ee={};Ee.attribute=he,he&&he.data&&(Ee.data=he.data),X[j]=Ee,q++}r.attributes=X,r.attributesNum=q,r.index=H}function S(){const M=r.newAttributes;for(let I=0,D=M.length;I<D;I++)M[I]=0}function m(M){u(M,0)}function u(M,I){const D=r.newAttributes,H=r.enabledAttributes,X=r.attributeDivisors;D[M]=1,H[M]===0&&(i.enableVertexAttribArray(M),H[M]=1),X[M]!==I&&(i.vertexAttribDivisor(M,I),X[M]=I)}function E(){const M=r.newAttributes,I=r.enabledAttributes;for(let D=0,H=I.length;D<H;D++)I[D]!==M[D]&&(i.disableVertexAttribArray(D),I[D]=0)}function y(M,I,D,H,X,Y,q){q===!0?i.vertexAttribIPointer(M,I,D,X,Y):i.vertexAttribPointer(M,I,D,H,X,Y)}function v(M,I,D,H){S();const X=H.attributes,Y=D.getAttributes(),q=I.defaultAttributeValues;for(const ee in Y){const j=Y[ee];if(j.location>=0){let oe=X[ee];if(oe===void 0&&(ee==="instanceMatrix"&&M.instanceMatrix&&(oe=M.instanceMatrix),ee==="instanceColor"&&M.instanceColor&&(oe=M.instanceColor)),oe!==void 0){const he=oe.normalized,Ee=oe.itemSize,Xe=e.get(oe);if(Xe===void 0)continue;const G=Xe.buffer,Ve=Xe.type,Ge=Xe.bytesPerElement,J=Ve===i.INT||Ve===i.UNSIGNED_INT||oe.gpuType===jo;if(oe.isInterleavedBufferAttribute){const Z=oe.data,ge=Z.stride,Le=oe.offset;if(Z.isInstancedInterleavedBuffer){for(let ve=0;ve<j.locationSize;ve++)u(j.location+ve,Z.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let ve=0;ve<j.locationSize;ve++)m(j.location+ve);i.bindBuffer(i.ARRAY_BUFFER,G);for(let ve=0;ve<j.locationSize;ve++)y(j.location+ve,Ee/j.locationSize,Ve,he,ge*Ge,(Le+Ee/j.locationSize*ve)*Ge,J)}else{if(oe.isInstancedBufferAttribute){for(let Z=0;Z<j.locationSize;Z++)u(j.location+Z,oe.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Z=0;Z<j.locationSize;Z++)m(j.location+Z);i.bindBuffer(i.ARRAY_BUFFER,G);for(let Z=0;Z<j.locationSize;Z++)y(j.location+Z,Ee/j.locationSize,Ve,he,Ee*Ge,Ee/j.locationSize*Z*Ge,J)}}else if(q!==void 0){const he=q[ee];if(he!==void 0)switch(he.length){case 2:i.vertexAttrib2fv(j.location,he);break;case 3:i.vertexAttrib3fv(j.location,he);break;case 4:i.vertexAttrib4fv(j.location,he);break;default:i.vertexAttrib1fv(j.location,he)}}}}E()}function R(){U();for(const M in n){const I=n[M];for(const D in I){const H=I[D];for(const X in H)h(H[X].object),delete H[X];delete I[D]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;const I=n[M.id];for(const D in I){const H=I[D];for(const X in H)h(H[X].object),delete H[X];delete I[D]}delete n[M.id]}function C(M){for(const I in n){const D=n[I];if(D[M.id]===void 0)continue;const H=D[M.id];for(const X in H)h(H[X].object),delete H[X];delete D[M.id]}}function U(){w(),o=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:U,resetDefaultState:w,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:S,enableAttribute:m,disableUnusedAttributes:E}}function hp(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),t.update(h,n,d))}function a(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let p=0;for(let g=0;g<d;g++)p+=h[g];t.update(p,n,1)}function l(c,h,d,f){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,d);let g=0;for(let S=0;S<d;S++)g+=h[S]*f[S];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function dp(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==on&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const U=C===Rn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==pn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==En&&!U)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:S,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:E,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:R,maxSamples:T}}function up(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new zn,a=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||n!==0||s;return s=f,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=h(d,f,0)},this.setState=function(d,f,p){const g=d.clippingPlanes,S=d.clipIntersection,m=d.clipShadows,u=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const E=r?0:n,y=E*4;let v=u.clippingState||null;l.value=v,v=h(g,f,y,p);for(let R=0;R!==y;++R)v[R]=t[R];u.clippingState=v,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,f,p,g){const S=d!==null?d.length:0;let m=null;if(S!==0){if(m=l.value,g!==!0||m===null){const u=p+S*4,E=f.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<u)&&(m=new Float32Array(u));for(let y=0,v=p;y!==S;++y,v+=4)o.copy(d[y]).applyMatrix4(E,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,m}}function fp(i){let e=new WeakMap;function t(o,a){return a===ao?o.mapping=Li:a===lo&&(o.mapping=Di),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ao||a===lo)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new ld(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const Ri=4,$a=[.125,.215,.35,.446,.526,.582],si=20,Nr=new ra,Za=new fe;let Fr=null,Or=0,kr=0,Br=!1;const ni=(1+Math.sqrt(5))/2,Ei=1/ni,Qa=[new P(-ni,Ei,0),new P(ni,Ei,0),new P(-Ei,0,ni),new P(Ei,0,ni),new P(0,ni,-Ei),new P(0,ni,Ei),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],pp=new P;class el{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:o=256,position:a=pp}=r;Fr=this._renderer.getRenderTarget(),Or=this._renderer.getActiveCubeFace(),kr=this._renderer.getActiveMipmapLevel(),Br=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=il(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Fr,Or,kr),this._renderer.xr.enabled=Br,e.scissorTest=!1,ks(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Li||e.mapping===Di?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fr=this._renderer.getRenderTarget(),Or=this._renderer.getActiveCubeFace(),kr=this._renderer.getActiveMipmapLevel(),Br=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:en,minFilter:en,generateMipmaps:!1,type:Rn,format:on,colorSpace:Ii,depthBuffer:!1},s=tl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tl(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=mp(r)),this._blurMaterial=gp(r,e,t)}return s}_compileMaterial(e){const t=new We(this._lodPlanes[0],e);this._renderer.compile(t,Nr)}_sceneToCubeUV(e,t,n,s,r){const l=new Zt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(Za),d.toneMapping=Gn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));const S=new us({name:"PMREM.Background",side:Ft,depthWrite:!1,depthTest:!1}),m=new We(new St,S);let u=!1;const E=e.background;E?E.isColor&&(S.color.copy(E),e.background=null,u=!0):(S.color.copy(Za),u=!0);for(let y=0;y<6;y++){const v=y%3;v===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):v===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));const R=this._cubeSize;ks(s,v*R,y>2?R:0,R,R),d.setRenderTarget(s),u&&d.render(m,l),d.render(e,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=p,d.autoClear=f,e.background=E}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Li||e.mapping===Di;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=il()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new We(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;ks(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Nr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Qa[(s-r-1)%Qa.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new We(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*si-1),S=r/g,m=isFinite(r)?1+Math.floor(h*S):si;m>si&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${si}`);const u=[];let E=0;for(let C=0;C<si;++C){const U=C/S,w=Math.exp(-U*U/2);u.push(w),C===0?E+=w:C<m&&(E+=2*w)}for(let C=0;C<u.length;C++)u[C]=u[C]/E;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=u,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;const v=this._sizeLods[s],R=3*v*(s>y-Ri?s-y+Ri:0),T=4*(this._cubeSize-v);ks(t,R,T,3*v,2*v),l.setRenderTarget(t),l.render(d,Nr)}}function mp(i){const e=[],t=[],n=[];let s=i;const r=i-Ri+1+$a.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>i-Ri?l=$a[o-i+Ri-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,d=1+c,f=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,S=3,m=2,u=1,E=new Float32Array(S*g*p),y=new Float32Array(m*g*p),v=new Float32Array(u*g*p);for(let T=0;T<p;T++){const C=T%3*2/3-1,U=T>2?0:-1,w=[C,U,0,C+2/3,U,0,C+2/3,U+1,0,C,U,0,C+2/3,U+1,0,C,U+1,0];E.set(w,S*g*T),y.set(f,m*g*T);const M=[T,T,T,T,T,T];v.set(M,u*g*T)}const R=new Vt;R.setAttribute("position",new Yt(E,S)),R.setAttribute("uv",new Yt(y,m)),R.setAttribute("faceIndex",new Yt(v,u)),e.push(R),s>Ri&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function tl(i,e,t){const n=new ln(i,e,t);return n.texture.mapping=or,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ks(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function gp(i,e,t){const n=new Float32Array(si),s=new P(0,1,0);return new Ct({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:oa(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function nl(){return new Ct({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oa(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function il(){return new Ct({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function oa(){return`

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
	`}function _p(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ao||l===lo,h=l===Li||l===Di;if(c||h){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new el(i)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new el(i)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function vp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&ls("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function xp(i,e,t,n){const s={},r=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const p in f)e.update(f[p],i.ARRAY_BUFFER)}function c(d){const f=[],p=d.index,g=d.attributes.position;let S=0;if(p!==null){const E=p.array;S=p.version;for(let y=0,v=E.length;y<v;y+=3){const R=E[y+0],T=E[y+1],C=E[y+2];f.push(R,T,T,C,C,R)}}else if(g!==void 0){const E=g.array;S=g.version;for(let y=0,v=E.length/3-1;y<v;y+=3){const R=y+0,T=y+1,C=y+2;f.push(R,T,T,C,C,R)}}else return;const m=new(hc(f)?pc:fc)(f,1);m.version=S;const u=r.get(d);u&&e.remove(u),r.set(d,m)}function h(d){const f=r.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function Mp(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,p){i.drawElements(n,p,r,f*o),t.update(p,n,1)}function c(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,f*o,g),t.update(p,n,g))}function h(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let u=0;u<g;u++)m+=p[u];t.update(m,n,1)}function d(f,p,g,S){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<f.length;u++)c(f[u]/o,p[u],S[u]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,S,0,g);let u=0;for(let E=0;E<g;E++)u+=p[E]*S[E];t.update(u,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Sp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function yp(i,e,t){const n=new WeakMap,s=new pt;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let M=function(){U.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var p=M;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,S=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,u=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),S===!0&&(v=2),m===!0&&(v=3);let R=a.attributes.position.count*v,T=1;R>e.maxTextureSize&&(T=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const C=new Float32Array(R*T*4*d),U=new dc(C,R,T,d);U.type=En,U.needsUpdate=!0;const w=v*4;for(let I=0;I<d;I++){const D=u[I],H=E[I],X=y[I],Y=R*T*4*I;for(let q=0;q<D.count;q++){const ee=q*w;g===!0&&(s.fromBufferAttribute(D,q),C[Y+ee+0]=s.x,C[Y+ee+1]=s.y,C[Y+ee+2]=s.z,C[Y+ee+3]=0),S===!0&&(s.fromBufferAttribute(H,q),C[Y+ee+4]=s.x,C[Y+ee+5]=s.y,C[Y+ee+6]=s.z,C[Y+ee+7]=0),m===!0&&(s.fromBufferAttribute(X,q),C[Y+ee+8]=s.x,C[Y+ee+9]=s.y,C[Y+ee+10]=s.z,C[Y+ee+11]=X.itemSize===4?s.w:1)}}f={count:d,texture:U,size:new Ce(R,T)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const S=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",S),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function bp(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=e.get(l,h);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return d}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}const Ec=new Ot,sl=new Mc(1,1),Tc=new dc,Ac=new jh,Rc=new _c,rl=[],ol=[],al=new Float32Array(16),ll=new Float32Array(9),cl=new Float32Array(4);function Bi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=rl[s];if(r===void 0&&(r=new Float32Array(s),rl[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function wt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Et(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ar(i,e){let t=ol[e];t===void 0&&(t=new Int32Array(e),ol[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function wp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ep(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;i.uniform2fv(this.addr,e),Et(t,e)}}function Tp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(wt(t,e))return;i.uniform3fv(this.addr,e),Et(t,e)}}function Ap(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;i.uniform4fv(this.addr,e),Et(t,e)}}function Rp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(wt(t,n))return;cl.set(n),i.uniformMatrix2fv(this.addr,!1,cl),Et(t,n)}}function Cp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(wt(t,n))return;ll.set(n),i.uniformMatrix3fv(this.addr,!1,ll),Et(t,n)}}function Pp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(wt(t,n))return;al.set(n),i.uniformMatrix4fv(this.addr,!1,al),Et(t,n)}}function Lp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Dp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;i.uniform2iv(this.addr,e),Et(t,e)}}function Ip(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;i.uniform3iv(this.addr,e),Et(t,e)}}function Up(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;i.uniform4iv(this.addr,e),Et(t,e)}}function Np(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Fp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;i.uniform2uiv(this.addr,e),Et(t,e)}}function Op(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;i.uniform3uiv(this.addr,e),Et(t,e)}}function kp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;i.uniform4uiv(this.addr,e),Et(t,e)}}function Bp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(sl.compareFunction=cc,r=sl):r=Ec,t.setTexture2D(e||r,s)}function zp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ac,s)}function Hp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Rc,s)}function Vp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Tc,s)}function Gp(i){switch(i){case 5126:return wp;case 35664:return Ep;case 35665:return Tp;case 35666:return Ap;case 35674:return Rp;case 35675:return Cp;case 35676:return Pp;case 5124:case 35670:return Lp;case 35667:case 35671:return Dp;case 35668:case 35672:return Ip;case 35669:case 35673:return Up;case 5125:return Np;case 36294:return Fp;case 36295:return Op;case 36296:return kp;case 35678:case 36198:case 36298:case 36306:case 35682:return Bp;case 35679:case 36299:case 36307:return zp;case 35680:case 36300:case 36308:case 36293:return Hp;case 36289:case 36303:case 36311:case 36292:return Vp}}function Wp(i,e){i.uniform1fv(this.addr,e)}function Xp(i,e){const t=Bi(e,this.size,2);i.uniform2fv(this.addr,t)}function jp(i,e){const t=Bi(e,this.size,3);i.uniform3fv(this.addr,t)}function Yp(i,e){const t=Bi(e,this.size,4);i.uniform4fv(this.addr,t)}function qp(i,e){const t=Bi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Kp(i,e){const t=Bi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Jp(i,e){const t=Bi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function $p(i,e){i.uniform1iv(this.addr,e)}function Zp(i,e){i.uniform2iv(this.addr,e)}function Qp(i,e){i.uniform3iv(this.addr,e)}function em(i,e){i.uniform4iv(this.addr,e)}function tm(i,e){i.uniform1uiv(this.addr,e)}function nm(i,e){i.uniform2uiv(this.addr,e)}function im(i,e){i.uniform3uiv(this.addr,e)}function sm(i,e){i.uniform4uiv(this.addr,e)}function rm(i,e,t){const n=this.cache,s=e.length,r=ar(t,s);wt(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Ec,r[o])}function om(i,e,t){const n=this.cache,s=e.length,r=ar(t,s);wt(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Ac,r[o])}function am(i,e,t){const n=this.cache,s=e.length,r=ar(t,s);wt(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Rc,r[o])}function lm(i,e,t){const n=this.cache,s=e.length,r=ar(t,s);wt(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Tc,r[o])}function cm(i){switch(i){case 5126:return Wp;case 35664:return Xp;case 35665:return jp;case 35666:return Yp;case 35674:return qp;case 35675:return Kp;case 35676:return Jp;case 5124:case 35670:return $p;case 35667:case 35671:return Zp;case 35668:case 35672:return Qp;case 35669:case 35673:return em;case 5125:return tm;case 36294:return nm;case 36295:return im;case 36296:return sm;case 35678:case 36198:case 36298:case 36306:case 35682:return rm;case 35679:case 36299:case 36307:return om;case 35680:case 36300:case 36308:case 36293:return am;case 36289:case 36303:case 36311:case 36292:return lm}}class hm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Gp(t.type)}}class dm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=cm(t.type)}}class um{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const zr=/(\w+)(\])?(\[|\.)?/g;function hl(i,e){i.seq.push(e),i.map[e.id]=e}function fm(i,e,t){const n=i.name,s=n.length;for(zr.lastIndex=0;;){const r=zr.exec(n),o=zr.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){hl(t,c===void 0?new hm(a,i,e):new dm(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new um(a),hl(t,d)),t=d}}}class Qs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);fm(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function dl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const pm=37297;let mm=0;function gm(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const ul=new Ye;function _m(i){Qe._getMatrix(ul,Qe.workingColorSpace,i);const e=`mat3( ${ul.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(i)){case tr:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function fl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+gm(i.getShaderSource(e),a)}else return r}function vm(i,e){const t=_m(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function xm(i,e){let t;switch(e){case Yl:t="Linear";break;case ql:t="Reinhard";break;case Kl:t="Cineon";break;case Xo:t="ACESFilmic";break;case $l:t="AgX";break;case Zl:t="Neutral";break;case Jl:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Bs=new P;function Mm(){Qe.getLuminanceCoefficients(Bs);const i=Bs.x.toFixed(4),e=Bs.y.toFixed(4),t=Bs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zi).join(`
`)}function ym(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function bm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Zi(i){return i!==""}function pl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ml(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const wm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ho(i){return i.replace(wm,Tm)}const Em=new Map;function Tm(i,e){let t=qe[e];if(t===void 0){const n=Em.get(e);if(n!==void 0)t=qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ho(t)}const Am=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gl(i){return i.replace(Am,Rm)}function Rm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function _l(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function Cm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Wl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Xl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===bn&&(e="SHADOWMAP_TYPE_VSM"),e}function Pm(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Li:case Di:e="ENVMAP_TYPE_CUBE";break;case or:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Lm(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Di:e="ENVMAP_MODE_REFRACTION";break}return e}function Dm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case jl:e="ENVMAP_BLENDING_MULTIPLY";break;case hh:e="ENVMAP_BLENDING_MIX";break;case dh:e="ENVMAP_BLENDING_ADD";break}return e}function Im(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Um(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Cm(t),c=Pm(t),h=Lm(t),d=Dm(t),f=Im(t),p=Sm(t),g=ym(r),S=s.createProgram();let m,u,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Zi).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Zi).join(`
`),u.length>0&&(u+=`
`)):(m=[_l(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zi).join(`
`),u=[_l(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gn?"#define TONE_MAPPING":"",t.toneMapping!==Gn?qe.tonemapping_pars_fragment:"",t.toneMapping!==Gn?xm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,vm("linearToOutputTexel",t.outputColorSpace),Mm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zi).join(`
`)),o=Ho(o),o=pl(o,t),o=ml(o,t),a=Ho(a),a=pl(a,t),a=ml(a,t),o=gl(o),a=gl(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",t.glslVersion===Ea?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ea?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const y=E+m+o,v=E+u+a,R=dl(s,s.VERTEX_SHADER,y),T=dl(s,s.FRAGMENT_SHADER,v);s.attachShader(S,R),s.attachShader(S,T),t.index0AttributeName!==void 0?s.bindAttribLocation(S,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function C(I){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(S)||"",H=s.getShaderInfoLog(R)||"",X=s.getShaderInfoLog(T)||"",Y=D.trim(),q=H.trim(),ee=X.trim();let j=!0,oe=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,S,R,T);else{const he=fl(s,R,"vertex"),Ee=fl(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+Y+`
`+he+`
`+Ee)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(q===""||ee==="")&&(oe=!1);oe&&(I.diagnostics={runnable:j,programLog:Y,vertexShader:{log:q,prefix:m},fragmentShader:{log:ee,prefix:u}})}s.deleteShader(R),s.deleteShader(T),U=new Qs(s,S),w=bm(s,S)}let U;this.getUniforms=function(){return U===void 0&&C(this),U};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(S,pm)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=mm++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=R,this.fragmentShader=T,this}let Nm=0;class Fm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Om(e),t.set(e,n)),n}}class Om{constructor(e){this.id=Nm++,this.code=e,this.usedTimes=0}}function km(i,e,t,n,s,r,o){const a=new ta,l=new Fm,c=new Set,h=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function S(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,M,I,D,H){const X=D.fog,Y=H.geometry,q=w.isMeshStandardMaterial?D.environment:null,ee=(w.isMeshStandardMaterial?t:e).get(w.envMap||q),j=ee&&ee.mapping===or?ee.image.height:null,oe=g[w.type];w.precision!==null&&(p=s.getMaxPrecision(w.precision),p!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",p,"instead."));const he=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Ee=he!==void 0?he.length:0;let Xe=0;Y.morphAttributes.position!==void 0&&(Xe=1),Y.morphAttributes.normal!==void 0&&(Xe=2),Y.morphAttributes.color!==void 0&&(Xe=3);let G,Ve,Ge,J;if(oe){const nt=un[oe];G=nt.vertexShader,Ve=nt.fragmentShader}else G=w.vertexShader,Ve=w.fragmentShader,l.update(w),Ge=l.getVertexShaderID(w),J=l.getFragmentShaderID(w);const Z=i.getRenderTarget(),ge=i.state.buffers.depth.getReversed(),Le=H.isInstancedMesh===!0,ve=H.isBatchedMesh===!0,Ke=!!w.map,gt=!!w.matcap,L=!!ee,it=!!w.aoMap,Se=!!w.lightMap,Ue=!!w.bumpMap,xe=!!w.normalMap,ot=!!w.displacementMap,ye=!!w.emissiveMap,Be=!!w.metalnessMap,De=!!w.roughnessMap,tt=w.anisotropy>0,A=w.clearcoat>0,x=w.dispersion>0,z=w.iridescence>0,$=w.sheen>0,te=w.transmission>0,K=tt&&!!w.anisotropyMap,Pe=A&&!!w.clearcoatMap,ae=A&&!!w.clearcoatNormalMap,Te=A&&!!w.clearcoatRoughnessMap,Ae=z&&!!w.iridescenceMap,se=z&&!!w.iridescenceThicknessMap,me=$&&!!w.sheenColorMap,Oe=$&&!!w.sheenRoughnessMap,Re=!!w.specularMap,de=!!w.specularColorMap,je=!!w.specularIntensityMap,N=te&&!!w.transmissionMap,re=te&&!!w.thicknessMap,le=!!w.gradientMap,Me=!!w.alphaMap,ne=w.alphaTest>0,Q=!!w.alphaHash,we=!!w.extensions;let ze=Gn;w.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(ze=i.toneMapping);const lt={shaderID:oe,shaderType:w.type,shaderName:w.name,vertexShader:G,fragmentShader:Ve,defines:w.defines,customVertexShaderID:Ge,customFragmentShaderID:J,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:p,batching:ve,batchingColor:ve&&H._colorsTexture!==null,instancing:Le,instancingColor:Le&&H.instanceColor!==null,instancingMorph:Le&&H.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Ii,alphaToCoverage:!!w.alphaToCoverage,map:Ke,matcap:gt,envMap:L,envMapMode:L&&ee.mapping,envMapCubeUVHeight:j,aoMap:it,lightMap:Se,bumpMap:Ue,normalMap:xe,displacementMap:f&&ot,emissiveMap:ye,normalMapObjectSpace:xe&&w.normalMapType===mh,normalMapTangentSpace:xe&&w.normalMapType===lc,metalnessMap:Be,roughnessMap:De,anisotropy:tt,anisotropyMap:K,clearcoat:A,clearcoatMap:Pe,clearcoatNormalMap:ae,clearcoatRoughnessMap:Te,dispersion:x,iridescence:z,iridescenceMap:Ae,iridescenceThicknessMap:se,sheen:$,sheenColorMap:me,sheenRoughnessMap:Oe,specularMap:Re,specularColorMap:de,specularIntensityMap:je,transmission:te,transmissionMap:N,thicknessMap:re,gradientMap:le,opaque:w.transparent===!1&&w.blending===ai&&w.alphaToCoverage===!1,alphaMap:Me,alphaTest:ne,alphaHash:Q,combine:w.combine,mapUv:Ke&&S(w.map.channel),aoMapUv:it&&S(w.aoMap.channel),lightMapUv:Se&&S(w.lightMap.channel),bumpMapUv:Ue&&S(w.bumpMap.channel),normalMapUv:xe&&S(w.normalMap.channel),displacementMapUv:ot&&S(w.displacementMap.channel),emissiveMapUv:ye&&S(w.emissiveMap.channel),metalnessMapUv:Be&&S(w.metalnessMap.channel),roughnessMapUv:De&&S(w.roughnessMap.channel),anisotropyMapUv:K&&S(w.anisotropyMap.channel),clearcoatMapUv:Pe&&S(w.clearcoatMap.channel),clearcoatNormalMapUv:ae&&S(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&S(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&S(w.iridescenceMap.channel),iridescenceThicknessMapUv:se&&S(w.iridescenceThicknessMap.channel),sheenColorMapUv:me&&S(w.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&S(w.sheenRoughnessMap.channel),specularMapUv:Re&&S(w.specularMap.channel),specularColorMapUv:de&&S(w.specularColorMap.channel),specularIntensityMapUv:je&&S(w.specularIntensityMap.channel),transmissionMapUv:N&&S(w.transmissionMap.channel),thicknessMapUv:re&&S(w.thicknessMap.channel),alphaMapUv:Me&&S(w.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(xe||tt),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!Y.attributes.uv&&(Ke||Me),fog:!!X,useFog:w.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:w.flatShading===!0&&w.wireframe===!1,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ge,skinning:H.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:Xe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:ze,decodeVideoTexture:Ke&&w.map.isVideoTexture===!0&&Qe.getTransfer(w.map.colorSpace)===st,decodeVideoTextureEmissive:ye&&w.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(w.emissiveMap.colorSpace)===st,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===rn,flipSided:w.side===Ft,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:we&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(we&&w.extensions.multiDraw===!0||ve)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return lt.vertexUv1s=c.has(1),lt.vertexUv2s=c.has(2),lt.vertexUv3s=c.has(3),c.clear(),lt}function u(w){const M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(const I in w.defines)M.push(I),M.push(w.defines[I]);return w.isRawShaderMaterial===!1&&(E(M,w),y(M,w),M.push(i.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function E(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function y(w,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),w.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),w.push(a.mask)}function v(w){const M=g[w.type];let I;if(M){const D=un[M];I=cs.clone(D.uniforms)}else I=w.uniforms;return I}function R(w,M){let I;for(let D=0,H=h.length;D<H;D++){const X=h[D];if(X.cacheKey===M){I=X,++I.usedTimes;break}}return I===void 0&&(I=new Um(i,M,w,r),h.push(I)),I}function T(w){if(--w.usedTimes===0){const M=h.indexOf(w);h[M]=h[h.length-1],h.pop(),w.destroy()}}function C(w){l.remove(w)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:v,acquireProgram:R,releaseProgram:T,releaseShaderCache:C,programs:h,dispose:U}}function Bm(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function zm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function vl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function xl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(d,f,p,g,S,m){let u=i[e];return u===void 0?(u={id:d.id,object:d,geometry:f,material:p,groupOrder:g,renderOrder:d.renderOrder,z:S,group:m},i[e]=u):(u.id=d.id,u.object=d,u.geometry=f,u.material=p,u.groupOrder=g,u.renderOrder=d.renderOrder,u.z=S,u.group=m),e++,u}function a(d,f,p,g,S,m){const u=o(d,f,p,g,S,m);p.transmission>0?n.push(u):p.transparent===!0?s.push(u):t.push(u)}function l(d,f,p,g,S,m){const u=o(d,f,p,g,S,m);p.transmission>0?n.unshift(u):p.transparent===!0?s.unshift(u):t.unshift(u)}function c(d,f){t.length>1&&t.sort(d||zm),n.length>1&&n.sort(f||vl),s.length>1&&s.sort(f||vl)}function h(){for(let d=e,f=i.length;d<f;d++){const p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Hm(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new xl,i.set(n,[o])):s>=r.length?(o=new xl,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Vm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new fe};break;case"SpotLight":t={position:new P,direction:new P,color:new fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new fe,groundColor:new fe};break;case"RectAreaLight":t={color:new fe,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function Gm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Wm=0;function Xm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function jm(i){const e=new Vm,t=Gm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);const s=new P,r=new mt,o=new mt;function a(c){let h=0,d=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let p=0,g=0,S=0,m=0,u=0,E=0,y=0,v=0,R=0,T=0,C=0;c.sort(Xm);for(let w=0,M=c.length;w<M;w++){const I=c[w],D=I.color,H=I.intensity,X=I.distance,Y=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=D.r*H,d+=D.g*H,f+=D.b*H;else if(I.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(I.sh.coefficients[q],H);C++}else if(I.isDirectionalLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ee=I.shadow,j=t.get(I);j.shadowIntensity=ee.intensity,j.shadowBias=ee.bias,j.shadowNormalBias=ee.normalBias,j.shadowRadius=ee.radius,j.shadowMapSize=ee.mapSize,n.directionalShadow[p]=j,n.directionalShadowMap[p]=Y,n.directionalShadowMatrix[p]=I.shadow.matrix,E++}n.directional[p]=q,p++}else if(I.isSpotLight){const q=e.get(I);q.position.setFromMatrixPosition(I.matrixWorld),q.color.copy(D).multiplyScalar(H),q.distance=X,q.coneCos=Math.cos(I.angle),q.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),q.decay=I.decay,n.spot[S]=q;const ee=I.shadow;if(I.map&&(n.spotLightMap[R]=I.map,R++,ee.updateMatrices(I),I.castShadow&&T++),n.spotLightMatrix[S]=ee.matrix,I.castShadow){const j=t.get(I);j.shadowIntensity=ee.intensity,j.shadowBias=ee.bias,j.shadowNormalBias=ee.normalBias,j.shadowRadius=ee.radius,j.shadowMapSize=ee.mapSize,n.spotShadow[S]=j,n.spotShadowMap[S]=Y,v++}S++}else if(I.isRectAreaLight){const q=e.get(I);q.color.copy(D).multiplyScalar(H),q.halfWidth.set(I.width*.5,0,0),q.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=q,m++}else if(I.isPointLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),q.distance=I.distance,q.decay=I.decay,I.castShadow){const ee=I.shadow,j=t.get(I);j.shadowIntensity=ee.intensity,j.shadowBias=ee.bias,j.shadowNormalBias=ee.normalBias,j.shadowRadius=ee.radius,j.shadowMapSize=ee.mapSize,j.shadowCameraNear=ee.camera.near,j.shadowCameraFar=ee.camera.far,n.pointShadow[g]=j,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=I.shadow.matrix,y++}n.point[g]=q,g++}else if(I.isHemisphereLight){const q=e.get(I);q.skyColor.copy(I.color).multiplyScalar(H),q.groundColor.copy(I.groundColor).multiplyScalar(H),n.hemi[u]=q,u++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ce.LTC_FLOAT_1,n.rectAreaLTC2=ce.LTC_FLOAT_2):(n.rectAreaLTC1=ce.LTC_HALF_1,n.rectAreaLTC2=ce.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=f;const U=n.hash;(U.directionalLength!==p||U.pointLength!==g||U.spotLength!==S||U.rectAreaLength!==m||U.hemiLength!==u||U.numDirectionalShadows!==E||U.numPointShadows!==y||U.numSpotShadows!==v||U.numSpotMaps!==R||U.numLightProbes!==C)&&(n.directional.length=p,n.spot.length=S,n.rectArea.length=m,n.point.length=g,n.hemi.length=u,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+R-T,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,U.directionalLength=p,U.pointLength=g,U.spotLength=S,U.rectAreaLength=m,U.hemiLength=u,U.numDirectionalShadows=E,U.numPointShadows=y,U.numSpotShadows=v,U.numSpotMaps=R,U.numLightProbes=C,n.version=Wm++)}function l(c,h){let d=0,f=0,p=0,g=0,S=0;const m=h.matrixWorldInverse;for(let u=0,E=c.length;u<E;u++){const y=c[u];if(y.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(y.isSpotLight){const v=n.spot[p];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),p++}else if(y.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const v=n.hemi[S];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(m),S++}}}return{setup:a,setupView:l,state:n}}function Ml(i){const e=new jm(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Ym(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Ml(i),e.set(s,[a])):r>=o.length?(a=new Ml(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const qm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Km=`uniform sampler2D shadow_pass;
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
}`;function Jm(i,e,t){let n=new ia;const s=new Ce,r=new Ce,o=new pt,a=new gd({depthPacking:ph}),l=new _d,c={},h=t.maxTextureSize,d={[Wn]:Ft,[Ft]:Wn,[rn]:rn},f=new Ct({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ce},radius:{value:4}},vertexShader:qm,fragmentShader:Km}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new Vt;g.setAttribute("position",new Yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new We(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wl;let u=this.type;this.render=function(T,C,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const w=i.getRenderTarget(),M=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),D=i.state;D.setBlending(An),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const H=u!==bn&&this.type===bn,X=u===bn&&this.type!==bn;for(let Y=0,q=T.length;Y<q;Y++){const ee=T[Y],j=ee.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;s.copy(j.mapSize);const oe=j.getFrameExtents();if(s.multiply(oe),r.copy(j.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/oe.x),s.x=r.x*oe.x,j.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/oe.y),s.y=r.y*oe.y,j.mapSize.y=r.y)),j.map===null||H===!0||X===!0){const Ee=this.type!==bn?{minFilter:an,magFilter:an}:{};j.map!==null&&j.map.dispose(),j.map=new ln(s.x,s.y,Ee),j.map.texture.name=ee.name+".shadowMap",j.camera.updateProjectionMatrix()}i.setRenderTarget(j.map),i.clear();const he=j.getViewportCount();for(let Ee=0;Ee<he;Ee++){const Xe=j.getViewport(Ee);o.set(r.x*Xe.x,r.y*Xe.y,r.x*Xe.z,r.y*Xe.w),D.viewport(o),j.updateMatrices(ee,Ee),n=j.getFrustum(),v(C,U,j.camera,ee,this.type)}j.isPointLightShadow!==!0&&this.type===bn&&E(j,U),j.needsUpdate=!1}u=this.type,m.needsUpdate=!1,i.setRenderTarget(w,M,I)};function E(T,C){const U=e.update(S);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ln(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(C,null,U,f,S,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(C,null,U,p,S,null)}function y(T,C,U,w){let M=null;const I=U.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)M=I;else if(M=U.isPointLight===!0?l:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const D=M.uuid,H=C.uuid;let X=c[D];X===void 0&&(X={},c[D]=X);let Y=X[H];Y===void 0&&(Y=M.clone(),X[H]=Y,C.addEventListener("dispose",R)),M=Y}if(M.visible=C.visible,M.wireframe=C.wireframe,w===bn?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:d[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,U.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const D=i.properties.get(M);D.light=U}return M}function v(T,C,U,w,M){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===bn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,T.matrixWorld);const H=e.update(T),X=T.material;if(Array.isArray(X)){const Y=H.groups;for(let q=0,ee=Y.length;q<ee;q++){const j=Y[q],oe=X[j.materialIndex];if(oe&&oe.visible){const he=y(T,oe,w,M);T.onBeforeShadow(i,T,C,U,H,he,j),i.renderBufferDirect(U,null,H,he,T,j),T.onAfterShadow(i,T,C,U,H,he,j)}}}else if(X.visible){const Y=y(T,X,w,M);T.onBeforeShadow(i,T,C,U,H,Y,null),i.renderBufferDirect(U,null,H,Y,T,null),T.onAfterShadow(i,T,C,U,H,Y,null)}}const D=T.children;for(let H=0,X=D.length;H<X;H++)v(D[H],C,U,w,M)}function R(T){T.target.removeEventListener("dispose",R);for(const U in c){const w=c[U],M=T.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}const $m={[eo]:to,[no]:ro,[io]:oo,[Pi]:so,[to]:eo,[ro]:no,[oo]:io,[so]:Pi};function Zm(i,e){function t(){let N=!1;const re=new pt;let le=null;const Me=new pt(0,0,0,0);return{setMask:function(ne){le!==ne&&!N&&(i.colorMask(ne,ne,ne,ne),le=ne)},setLocked:function(ne){N=ne},setClear:function(ne,Q,we,ze,lt){lt===!0&&(ne*=ze,Q*=ze,we*=ze),re.set(ne,Q,we,ze),Me.equals(re)===!1&&(i.clearColor(ne,Q,we,ze),Me.copy(re))},reset:function(){N=!1,le=null,Me.set(-1,0,0,0)}}}function n(){let N=!1,re=!1,le=null,Me=null,ne=null;return{setReversed:function(Q){if(re!==Q){const we=e.get("EXT_clip_control");Q?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),re=Q;const ze=ne;ne=null,this.setClear(ze)}},getReversed:function(){return re},setTest:function(Q){Q?Z(i.DEPTH_TEST):ge(i.DEPTH_TEST)},setMask:function(Q){le!==Q&&!N&&(i.depthMask(Q),le=Q)},setFunc:function(Q){if(re&&(Q=$m[Q]),Me!==Q){switch(Q){case eo:i.depthFunc(i.NEVER);break;case to:i.depthFunc(i.ALWAYS);break;case no:i.depthFunc(i.LESS);break;case Pi:i.depthFunc(i.LEQUAL);break;case io:i.depthFunc(i.EQUAL);break;case so:i.depthFunc(i.GEQUAL);break;case ro:i.depthFunc(i.GREATER);break;case oo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Me=Q}},setLocked:function(Q){N=Q},setClear:function(Q){ne!==Q&&(re&&(Q=1-Q),i.clearDepth(Q),ne=Q)},reset:function(){N=!1,le=null,Me=null,ne=null,re=!1}}}function s(){let N=!1,re=null,le=null,Me=null,ne=null,Q=null,we=null,ze=null,lt=null;return{setTest:function(nt){N||(nt?Z(i.STENCIL_TEST):ge(i.STENCIL_TEST))},setMask:function(nt){re!==nt&&!N&&(i.stencilMask(nt),re=nt)},setFunc:function(nt,gn,cn){(le!==nt||Me!==gn||ne!==cn)&&(i.stencilFunc(nt,gn,cn),le=nt,Me=gn,ne=cn)},setOp:function(nt,gn,cn){(Q!==nt||we!==gn||ze!==cn)&&(i.stencilOp(nt,gn,cn),Q=nt,we=gn,ze=cn)},setLocked:function(nt){N=nt},setClear:function(nt){lt!==nt&&(i.clearStencil(nt),lt=nt)},reset:function(){N=!1,re=null,le=null,Me=null,ne=null,Q=null,we=null,ze=null,lt=null}}}const r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},d={},f=new WeakMap,p=[],g=null,S=!1,m=null,u=null,E=null,y=null,v=null,R=null,T=null,C=new fe(0,0,0),U=0,w=!1,M=null,I=null,D=null,H=null,X=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,ee=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(j)[1]),q=ee>=1):j.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),q=ee>=2);let oe=null,he={};const Ee=i.getParameter(i.SCISSOR_BOX),Xe=i.getParameter(i.VIEWPORT),G=new pt().fromArray(Ee),Ve=new pt().fromArray(Xe);function Ge(N,re,le,Me){const ne=new Uint8Array(4),Q=i.createTexture();i.bindTexture(N,Q),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let we=0;we<le;we++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(re,0,i.RGBA,1,1,Me,0,i.RGBA,i.UNSIGNED_BYTE,ne):i.texImage2D(re+we,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ne);return Q}const J={};J[i.TEXTURE_2D]=Ge(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=Ge(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=Ge(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=Ge(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Z(i.DEPTH_TEST),o.setFunc(Pi),Ue(!1),xe(Ma),Z(i.CULL_FACE),it(An);function Z(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function ge(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function Le(N,re){return d[N]!==re?(i.bindFramebuffer(N,re),d[N]=re,N===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=re),N===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=re),!0):!1}function ve(N,re){let le=p,Me=!1;if(N){le=f.get(re),le===void 0&&(le=[],f.set(re,le));const ne=N.textures;if(le.length!==ne.length||le[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,we=ne.length;Q<we;Q++)le[Q]=i.COLOR_ATTACHMENT0+Q;le.length=ne.length,Me=!0}}else le[0]!==i.BACK&&(le[0]=i.BACK,Me=!0);Me&&i.drawBuffers(le)}function Ke(N){return g!==N?(i.useProgram(N),g=N,!0):!1}const gt={[ii]:i.FUNC_ADD,[Yc]:i.FUNC_SUBTRACT,[qc]:i.FUNC_REVERSE_SUBTRACT};gt[Kc]=i.MIN,gt[Jc]=i.MAX;const L={[$c]:i.ZERO,[Zc]:i.ONE,[Qc]:i.SRC_COLOR,[Zr]:i.SRC_ALPHA,[rh]:i.SRC_ALPHA_SATURATE,[ih]:i.DST_COLOR,[th]:i.DST_ALPHA,[eh]:i.ONE_MINUS_SRC_COLOR,[Qr]:i.ONE_MINUS_SRC_ALPHA,[sh]:i.ONE_MINUS_DST_COLOR,[nh]:i.ONE_MINUS_DST_ALPHA,[oh]:i.CONSTANT_COLOR,[ah]:i.ONE_MINUS_CONSTANT_COLOR,[lh]:i.CONSTANT_ALPHA,[ch]:i.ONE_MINUS_CONSTANT_ALPHA};function it(N,re,le,Me,ne,Q,we,ze,lt,nt){if(N===An){S===!0&&(ge(i.BLEND),S=!1);return}if(S===!1&&(Z(i.BLEND),S=!0),N!==jc){if(N!==m||nt!==w){if((u!==ii||v!==ii)&&(i.blendEquation(i.FUNC_ADD),u=ii,v=ii),nt)switch(N){case ai:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case $r:i.blendFunc(i.ONE,i.ONE);break;case Sa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ya:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case ai:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case $r:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Sa:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ya:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}E=null,y=null,R=null,T=null,C.set(0,0,0),U=0,m=N,w=nt}return}ne=ne||re,Q=Q||le,we=we||Me,(re!==u||ne!==v)&&(i.blendEquationSeparate(gt[re],gt[ne]),u=re,v=ne),(le!==E||Me!==y||Q!==R||we!==T)&&(i.blendFuncSeparate(L[le],L[Me],L[Q],L[we]),E=le,y=Me,R=Q,T=we),(ze.equals(C)===!1||lt!==U)&&(i.blendColor(ze.r,ze.g,ze.b,lt),C.copy(ze),U=lt),m=N,w=!1}function Se(N,re){N.side===rn?ge(i.CULL_FACE):Z(i.CULL_FACE);let le=N.side===Ft;re&&(le=!le),Ue(le),N.blending===ai&&N.transparent===!1?it(An):it(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);const Me=N.stencilWrite;a.setTest(Me),Me&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ye(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):ge(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ue(N){M!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),M=N)}function xe(N){N!==Wc?(Z(i.CULL_FACE),N!==I&&(N===Ma?i.cullFace(i.BACK):N===Xc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ge(i.CULL_FACE),I=N}function ot(N){N!==D&&(q&&i.lineWidth(N),D=N)}function ye(N,re,le){N?(Z(i.POLYGON_OFFSET_FILL),(H!==re||X!==le)&&(i.polygonOffset(re,le),H=re,X=le)):ge(i.POLYGON_OFFSET_FILL)}function Be(N){N?Z(i.SCISSOR_TEST):ge(i.SCISSOR_TEST)}function De(N){N===void 0&&(N=i.TEXTURE0+Y-1),oe!==N&&(i.activeTexture(N),oe=N)}function tt(N,re,le){le===void 0&&(oe===null?le=i.TEXTURE0+Y-1:le=oe);let Me=he[le];Me===void 0&&(Me={type:void 0,texture:void 0},he[le]=Me),(Me.type!==N||Me.texture!==re)&&(oe!==le&&(i.activeTexture(le),oe=le),i.bindTexture(N,re||J[N]),Me.type=N,Me.texture=re)}function A(){const N=he[oe];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function x(){try{i.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function z(){try{i.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $(){try{i.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{i.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function K(){try{i.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Pe(){try{i.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ae(){try{i.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Te(){try{i.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ae(){try{i.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function se(){try{i.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function me(N){G.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),G.copy(N))}function Oe(N){Ve.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),Ve.copy(N))}function Re(N,re){let le=c.get(re);le===void 0&&(le=new WeakMap,c.set(re,le));let Me=le.get(N);Me===void 0&&(Me=i.getUniformBlockIndex(re,N.name),le.set(N,Me))}function de(N,re){const Me=c.get(re).get(N);l.get(re)!==Me&&(i.uniformBlockBinding(re,Me,N.__bindingPointIndex),l.set(re,Me))}function je(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},oe=null,he={},d={},f=new WeakMap,p=[],g=null,S=!1,m=null,u=null,E=null,y=null,v=null,R=null,T=null,C=new fe(0,0,0),U=0,w=!1,M=null,I=null,D=null,H=null,X=null,G.set(0,0,i.canvas.width,i.canvas.height),Ve.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Z,disable:ge,bindFramebuffer:Le,drawBuffers:ve,useProgram:Ke,setBlending:it,setMaterial:Se,setFlipSided:Ue,setCullFace:xe,setLineWidth:ot,setPolygonOffset:ye,setScissorTest:Be,activeTexture:De,bindTexture:tt,unbindTexture:A,compressedTexImage2D:x,compressedTexImage3D:z,texImage2D:Ae,texImage3D:se,updateUBOMapping:Re,uniformBlockBinding:de,texStorage2D:ae,texStorage3D:Te,texSubImage2D:$,texSubImage3D:te,compressedTexSubImage2D:K,compressedTexSubImage3D:Pe,scissor:me,viewport:Oe,reset:je}}function Qm(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ce,h=new WeakMap;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,x){return p?new OffscreenCanvas(A,x):ir("canvas")}function S(A,x,z){let $=1;const te=tt(A);if((te.width>z||te.height>z)&&($=z/Math.max(te.width,te.height)),$<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const K=Math.floor($*te.width),Pe=Math.floor($*te.height);d===void 0&&(d=g(K,Pe));const ae=x?g(K,Pe):d;return ae.width=K,ae.height=Pe,ae.getContext("2d").drawImage(A,0,0,K,Pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+K+"x"+Pe+")."),ae}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),A;return A}function m(A){return A.generateMipmaps}function u(A){i.generateMipmap(A)}function E(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(A,x,z,$,te=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let K=x;if(x===i.RED&&(z===i.FLOAT&&(K=i.R32F),z===i.HALF_FLOAT&&(K=i.R16F),z===i.UNSIGNED_BYTE&&(K=i.R8)),x===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.R8UI),z===i.UNSIGNED_SHORT&&(K=i.R16UI),z===i.UNSIGNED_INT&&(K=i.R32UI),z===i.BYTE&&(K=i.R8I),z===i.SHORT&&(K=i.R16I),z===i.INT&&(K=i.R32I)),x===i.RG&&(z===i.FLOAT&&(K=i.RG32F),z===i.HALF_FLOAT&&(K=i.RG16F),z===i.UNSIGNED_BYTE&&(K=i.RG8)),x===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.RG8UI),z===i.UNSIGNED_SHORT&&(K=i.RG16UI),z===i.UNSIGNED_INT&&(K=i.RG32UI),z===i.BYTE&&(K=i.RG8I),z===i.SHORT&&(K=i.RG16I),z===i.INT&&(K=i.RG32I)),x===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.RGB8UI),z===i.UNSIGNED_SHORT&&(K=i.RGB16UI),z===i.UNSIGNED_INT&&(K=i.RGB32UI),z===i.BYTE&&(K=i.RGB8I),z===i.SHORT&&(K=i.RGB16I),z===i.INT&&(K=i.RGB32I)),x===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),z===i.UNSIGNED_INT&&(K=i.RGBA32UI),z===i.BYTE&&(K=i.RGBA8I),z===i.SHORT&&(K=i.RGBA16I),z===i.INT&&(K=i.RGBA32I)),x===i.RGB&&(z===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),x===i.RGBA){const Pe=te?tr:Qe.getTransfer($);z===i.FLOAT&&(K=i.RGBA32F),z===i.HALF_FLOAT&&(K=i.RGBA16F),z===i.UNSIGNED_BYTE&&(K=Pe===st?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function v(A,x){let z;return A?x===null||x===li||x===ss?z=i.DEPTH24_STENCIL8:x===En?z=i.DEPTH32F_STENCIL8:x===is&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===li||x===ss?z=i.DEPTH_COMPONENT24:x===En?z=i.DEPTH_COMPONENT32F:x===is&&(z=i.DEPTH_COMPONENT16),z}function R(A,x){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==an&&A.minFilter!==en?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function T(A){const x=A.target;x.removeEventListener("dispose",T),U(x),x.isVideoTexture&&h.delete(x)}function C(A){const x=A.target;x.removeEventListener("dispose",C),M(x)}function U(A){const x=n.get(A);if(x.__webglInit===void 0)return;const z=A.source,$=f.get(z);if($){const te=$[x.__cacheKey];te.usedTimes--,te.usedTimes===0&&w(A),Object.keys($).length===0&&f.delete(z)}n.remove(A)}function w(A){const x=n.get(A);i.deleteTexture(x.__webglTexture);const z=A.source,$=f.get(z);delete $[x.__cacheKey],o.memory.textures--}function M(A){const x=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(x.__webglFramebuffer[$]))for(let te=0;te<x.__webglFramebuffer[$].length;te++)i.deleteFramebuffer(x.__webglFramebuffer[$][te]);else i.deleteFramebuffer(x.__webglFramebuffer[$]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[$])}else{if(Array.isArray(x.__webglFramebuffer))for(let $=0;$<x.__webglFramebuffer.length;$++)i.deleteFramebuffer(x.__webglFramebuffer[$]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let $=0;$<x.__webglColorRenderbuffer.length;$++)x.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[$]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const z=A.textures;for(let $=0,te=z.length;$<te;$++){const K=n.get(z[$]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(z[$])}n.remove(A)}let I=0;function D(){I=0}function H(){const A=I;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),I+=1,A}function X(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function Y(A,x){const z=n.get(A);if(A.isVideoTexture&&Be(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&z.__version!==A.version){const $=A.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(z,A,x);return}}else A.isExternalTexture&&(z.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+x)}function q(A,x){const z=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){J(z,A,x);return}t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+x)}function ee(A,x){const z=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){J(z,A,x);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+x)}function j(A,x){const z=n.get(A);if(A.version>0&&z.__version!==A.version){Z(z,A,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+x)}const oe={[co]:i.REPEAT,[ri]:i.CLAMP_TO_EDGE,[ho]:i.MIRRORED_REPEAT},he={[an]:i.NEAREST,[uh]:i.NEAREST_MIPMAP_NEAREST,[gs]:i.NEAREST_MIPMAP_LINEAR,[en]:i.LINEAR,[hr]:i.LINEAR_MIPMAP_NEAREST,[oi]:i.LINEAR_MIPMAP_LINEAR},Ee={[gh]:i.NEVER,[yh]:i.ALWAYS,[_h]:i.LESS,[cc]:i.LEQUAL,[vh]:i.EQUAL,[Sh]:i.GEQUAL,[xh]:i.GREATER,[Mh]:i.NOTEQUAL};function Xe(A,x){if(x.type===En&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===en||x.magFilter===hr||x.magFilter===gs||x.magFilter===oi||x.minFilter===en||x.minFilter===hr||x.minFilter===gs||x.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,oe[x.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,oe[x.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,oe[x.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,he[x.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,he[x.minFilter]),x.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,Ee[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===an||x.minFilter!==gs&&x.minFilter!==oi||x.type===En&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function G(A,x){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",T));const $=x.source;let te=f.get($);te===void 0&&(te={},f.set($,te));const K=X(x);if(K!==A.__cacheKey){te[K]===void 0&&(te[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),te[K].usedTimes++;const Pe=te[A.__cacheKey];Pe!==void 0&&(te[A.__cacheKey].usedTimes--,Pe.usedTimes===0&&w(x)),A.__cacheKey=K,A.__webglTexture=te[K].texture}return z}function Ve(A,x,z){return Math.floor(Math.floor(A/z)/x)}function Ge(A,x,z,$){const K=A.updateRanges;if(K.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,z,$,x.data);else{K.sort((se,me)=>se.start-me.start);let Pe=0;for(let se=1;se<K.length;se++){const me=K[Pe],Oe=K[se],Re=me.start+me.count,de=Ve(Oe.start,x.width,4),je=Ve(me.start,x.width,4);Oe.start<=Re+1&&de===je&&Ve(Oe.start+Oe.count-1,x.width,4)===de?me.count=Math.max(me.count,Oe.start+Oe.count-me.start):(++Pe,K[Pe]=Oe)}K.length=Pe+1;const ae=i.getParameter(i.UNPACK_ROW_LENGTH),Te=i.getParameter(i.UNPACK_SKIP_PIXELS),Ae=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let se=0,me=K.length;se<me;se++){const Oe=K[se],Re=Math.floor(Oe.start/4),de=Math.ceil(Oe.count/4),je=Re%x.width,N=Math.floor(Re/x.width),re=de,le=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,je),i.pixelStorei(i.UNPACK_SKIP_ROWS,N),t.texSubImage2D(i.TEXTURE_2D,0,je,N,re,le,z,$,x.data)}A.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ae),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Te),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ae)}}function J(A,x,z){let $=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&($=i.TEXTURE_3D);const te=G(A,x),K=x.source;t.bindTexture($,A.__webglTexture,i.TEXTURE0+z);const Pe=n.get(K);if(K.version!==Pe.__version||te===!0){t.activeTexture(i.TEXTURE0+z);const ae=Qe.getPrimaries(Qe.workingColorSpace),Te=x.colorSpace===Hn?null:Qe.getPrimaries(x.colorSpace),Ae=x.colorSpace===Hn||ae===Te?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let se=S(x.image,!1,s.maxTextureSize);se=De(x,se);const me=r.convert(x.format,x.colorSpace),Oe=r.convert(x.type);let Re=y(x.internalFormat,me,Oe,x.colorSpace,x.isVideoTexture);Xe($,x);let de;const je=x.mipmaps,N=x.isVideoTexture!==!0,re=Pe.__version===void 0||te===!0,le=K.dataReady,Me=R(x,se);if(x.isDepthTexture)Re=v(x.format===os,x.type),re&&(N?t.texStorage2D(i.TEXTURE_2D,1,Re,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,Re,se.width,se.height,0,me,Oe,null));else if(x.isDataTexture)if(je.length>0){N&&re&&t.texStorage2D(i.TEXTURE_2D,Me,Re,je[0].width,je[0].height);for(let ne=0,Q=je.length;ne<Q;ne++)de=je[ne],N?le&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,de.width,de.height,me,Oe,de.data):t.texImage2D(i.TEXTURE_2D,ne,Re,de.width,de.height,0,me,Oe,de.data);x.generateMipmaps=!1}else N?(re&&t.texStorage2D(i.TEXTURE_2D,Me,Re,se.width,se.height),le&&Ge(x,se,me,Oe)):t.texImage2D(i.TEXTURE_2D,0,Re,se.width,se.height,0,me,Oe,se.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){N&&re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,Re,je[0].width,je[0].height,se.depth);for(let ne=0,Q=je.length;ne<Q;ne++)if(de=je[ne],x.format!==on)if(me!==null)if(N){if(le)if(x.layerUpdates.size>0){const we=Ja(de.width,de.height,x.format,x.type);for(const ze of x.layerUpdates){const lt=de.data.subarray(ze*we/de.data.BYTES_PER_ELEMENT,(ze+1)*we/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,ze,de.width,de.height,1,me,lt)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,de.width,de.height,se.depth,me,de.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ne,Re,de.width,de.height,se.depth,0,de.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?le&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,de.width,de.height,se.depth,me,Oe,de.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ne,Re,de.width,de.height,se.depth,0,me,Oe,de.data)}else{N&&re&&t.texStorage2D(i.TEXTURE_2D,Me,Re,je[0].width,je[0].height);for(let ne=0,Q=je.length;ne<Q;ne++)de=je[ne],x.format!==on?me!==null?N?le&&t.compressedTexSubImage2D(i.TEXTURE_2D,ne,0,0,de.width,de.height,me,de.data):t.compressedTexImage2D(i.TEXTURE_2D,ne,Re,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?le&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,de.width,de.height,me,Oe,de.data):t.texImage2D(i.TEXTURE_2D,ne,Re,de.width,de.height,0,me,Oe,de.data)}else if(x.isDataArrayTexture)if(N){if(re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,Re,se.width,se.height,se.depth),le)if(x.layerUpdates.size>0){const ne=Ja(se.width,se.height,x.format,x.type);for(const Q of x.layerUpdates){const we=se.data.subarray(Q*ne/se.data.BYTES_PER_ELEMENT,(Q+1)*ne/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,se.width,se.height,1,me,Oe,we)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,me,Oe,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Re,se.width,se.height,se.depth,0,me,Oe,se.data);else if(x.isData3DTexture)N?(re&&t.texStorage3D(i.TEXTURE_3D,Me,Re,se.width,se.height,se.depth),le&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,me,Oe,se.data)):t.texImage3D(i.TEXTURE_3D,0,Re,se.width,se.height,se.depth,0,me,Oe,se.data);else if(x.isFramebufferTexture){if(re)if(N)t.texStorage2D(i.TEXTURE_2D,Me,Re,se.width,se.height);else{let ne=se.width,Q=se.height;for(let we=0;we<Me;we++)t.texImage2D(i.TEXTURE_2D,we,Re,ne,Q,0,me,Oe,null),ne>>=1,Q>>=1}}else if(je.length>0){if(N&&re){const ne=tt(je[0]);t.texStorage2D(i.TEXTURE_2D,Me,Re,ne.width,ne.height)}for(let ne=0,Q=je.length;ne<Q;ne++)de=je[ne],N?le&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,me,Oe,de):t.texImage2D(i.TEXTURE_2D,ne,Re,me,Oe,de);x.generateMipmaps=!1}else if(N){if(re){const ne=tt(se);t.texStorage2D(i.TEXTURE_2D,Me,Re,ne.width,ne.height)}le&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me,Oe,se)}else t.texImage2D(i.TEXTURE_2D,0,Re,me,Oe,se);m(x)&&u($),Pe.__version=K.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Z(A,x,z){if(x.image.length!==6)return;const $=G(A,x),te=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+z);const K=n.get(te);if(te.version!==K.__version||$===!0){t.activeTexture(i.TEXTURE0+z);const Pe=Qe.getPrimaries(Qe.workingColorSpace),ae=x.colorSpace===Hn?null:Qe.getPrimaries(x.colorSpace),Te=x.colorSpace===Hn||Pe===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const Ae=x.isCompressedTexture||x.image[0].isCompressedTexture,se=x.image[0]&&x.image[0].isDataTexture,me=[];for(let Q=0;Q<6;Q++)!Ae&&!se?me[Q]=S(x.image[Q],!0,s.maxCubemapSize):me[Q]=se?x.image[Q].image:x.image[Q],me[Q]=De(x,me[Q]);const Oe=me[0],Re=r.convert(x.format,x.colorSpace),de=r.convert(x.type),je=y(x.internalFormat,Re,de,x.colorSpace),N=x.isVideoTexture!==!0,re=K.__version===void 0||$===!0,le=te.dataReady;let Me=R(x,Oe);Xe(i.TEXTURE_CUBE_MAP,x);let ne;if(Ae){N&&re&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,je,Oe.width,Oe.height);for(let Q=0;Q<6;Q++){ne=me[Q].mipmaps;for(let we=0;we<ne.length;we++){const ze=ne[we];x.format!==on?Re!==null?N?le&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,0,0,ze.width,ze.height,Re,ze.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,je,ze.width,ze.height,0,ze.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,0,0,ze.width,ze.height,Re,de,ze.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,je,ze.width,ze.height,0,Re,de,ze.data)}}}else{if(ne=x.mipmaps,N&&re){ne.length>0&&Me++;const Q=tt(me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,je,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(se){N?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,me[Q].width,me[Q].height,Re,de,me[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,je,me[Q].width,me[Q].height,0,Re,de,me[Q].data);for(let we=0;we<ne.length;we++){const lt=ne[we].image[Q].image;N?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,0,0,lt.width,lt.height,Re,de,lt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,je,lt.width,lt.height,0,Re,de,lt.data)}}else{N?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Re,de,me[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,je,Re,de,me[Q]);for(let we=0;we<ne.length;we++){const ze=ne[we];N?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,0,0,Re,de,ze.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,je,Re,de,ze.image[Q])}}}m(x)&&u(i.TEXTURE_CUBE_MAP),K.__version=te.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function ge(A,x,z,$,te,K){const Pe=r.convert(z.format,z.colorSpace),ae=r.convert(z.type),Te=y(z.internalFormat,Pe,ae,z.colorSpace),Ae=n.get(x),se=n.get(z);if(se.__renderTarget=x,!Ae.__hasExternalTextures){const me=Math.max(1,x.width>>K),Oe=Math.max(1,x.height>>K);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,K,Te,me,Oe,x.depth,0,Pe,ae,null):t.texImage2D(te,K,Te,me,Oe,0,Pe,ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),ye(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,te,se.__webglTexture,0,ot(x)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,te,se.__webglTexture,K),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(A,x,z){if(i.bindRenderbuffer(i.RENDERBUFFER,A),x.depthBuffer){const $=x.depthTexture,te=$&&$.isDepthTexture?$.type:null,K=v(x.stencilBuffer,te),Pe=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=ot(x);ye(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ae,K,x.width,x.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,ae,K,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,K,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Pe,i.RENDERBUFFER,A)}else{const $=x.textures;for(let te=0;te<$.length;te++){const K=$[te],Pe=r.convert(K.format,K.colorSpace),ae=r.convert(K.type),Te=y(K.internalFormat,Pe,ae,K.colorSpace),Ae=ot(x);z&&ye(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ae,Te,x.width,x.height):ye(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ae,Te,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,Te,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ve(A,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=n.get(x.depthTexture);$.__renderTarget=x,(!$.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Y(x.depthTexture,0);const te=$.__webglTexture,K=ot(x);if(x.depthTexture.format===rs)ye(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0);else if(x.depthTexture.format===os)ye(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Ke(A){const x=n.get(A),z=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){const $=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),$){const te=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,$.removeEventListener("dispose",te)};$.addEventListener("dispose",te),x.__depthDisposeCallback=te}x.__boundDepthTexture=$}if(A.depthTexture&&!x.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");const $=A.texture.mipmaps;$&&$.length>0?ve(x.__webglFramebuffer[0],A):ve(x.__webglFramebuffer,A)}else if(z){x.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[$]),x.__webglDepthbuffer[$]===void 0)x.__webglDepthbuffer[$]=i.createRenderbuffer(),Le(x.__webglDepthbuffer[$],A,!1);else{const te=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=x.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,K)}}else{const $=A.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Le(x.__webglDepthbuffer,A,!1);else{const te=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,K)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function gt(A,x,z){const $=n.get(A);x!==void 0&&ge($.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Ke(A)}function L(A){const x=A.texture,z=n.get(A),$=n.get(x);A.addEventListener("dispose",C);const te=A.textures,K=A.isWebGLCubeRenderTarget===!0,Pe=te.length>1;if(Pe||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=x.version,o.memory.textures++),K){z.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[ae]=[];for(let Te=0;Te<x.mipmaps.length;Te++)z.__webglFramebuffer[ae][Te]=i.createFramebuffer()}else z.__webglFramebuffer[ae]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let ae=0;ae<x.mipmaps.length;ae++)z.__webglFramebuffer[ae]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(Pe)for(let ae=0,Te=te.length;ae<Te;ae++){const Ae=n.get(te[ae]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&ye(A)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ae=0;ae<te.length;ae++){const Te=te[ae];z.__webglColorRenderbuffer[ae]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[ae]);const Ae=r.convert(Te.format,Te.colorSpace),se=r.convert(Te.type),me=y(Te.internalFormat,Ae,se,Te.colorSpace,A.isXRRenderTarget===!0),Oe=ot(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Oe,me,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,z.__webglColorRenderbuffer[ae])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(z.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Xe(i.TEXTURE_CUBE_MAP,x);for(let ae=0;ae<6;ae++)if(x.mipmaps&&x.mipmaps.length>0)for(let Te=0;Te<x.mipmaps.length;Te++)ge(z.__webglFramebuffer[ae][Te],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Te);else ge(z.__webglFramebuffer[ae],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);m(x)&&u(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Pe){for(let ae=0,Te=te.length;ae<Te;ae++){const Ae=te[ae],se=n.get(Ae);let me=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(me=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(me,se.__webglTexture),Xe(me,Ae),ge(z.__webglFramebuffer,A,Ae,i.COLOR_ATTACHMENT0+ae,me,0),m(Ae)&&u(me)}t.unbindTexture()}else{let ae=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ae=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ae,$.__webglTexture),Xe(ae,x),x.mipmaps&&x.mipmaps.length>0)for(let Te=0;Te<x.mipmaps.length;Te++)ge(z.__webglFramebuffer[Te],A,x,i.COLOR_ATTACHMENT0,ae,Te);else ge(z.__webglFramebuffer,A,x,i.COLOR_ATTACHMENT0,ae,0);m(x)&&u(ae),t.unbindTexture()}A.depthBuffer&&Ke(A)}function it(A){const x=A.textures;for(let z=0,$=x.length;z<$;z++){const te=x[z];if(m(te)){const K=E(A),Pe=n.get(te).__webglTexture;t.bindTexture(K,Pe),u(K),t.unbindTexture()}}}const Se=[],Ue=[];function xe(A){if(A.samples>0){if(ye(A)===!1){const x=A.textures,z=A.width,$=A.height;let te=i.COLOR_BUFFER_BIT;const K=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Pe=n.get(A),ae=x.length>1;if(ae)for(let Ae=0;Ae<x.length;Ae++)t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer);const Te=A.texture.mipmaps;Te&&Te.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let Ae=0;Ae<x.length;Ae++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),ae){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Pe.__webglColorRenderbuffer[Ae]);const se=n.get(x[Ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,se,0)}i.blitFramebuffer(0,0,z,$,0,0,z,$,te,i.NEAREST),l===!0&&(Se.length=0,Ue.length=0,Se.push(i.COLOR_ATTACHMENT0+Ae),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Se.push(K),Ue.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ue)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Se))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ae)for(let Ae=0;Ae<x.length;Ae++){t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,Pe.__webglColorRenderbuffer[Ae]);const se=n.get(x[Ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,se,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const x=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function ot(A){return Math.min(s.maxSamples,A.samples)}function ye(A){const x=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Be(A){const x=o.render.frame;h.get(A)!==x&&(h.set(A,x),A.update())}function De(A,x){const z=A.colorSpace,$=A.format,te=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||z!==Ii&&z!==Hn&&(Qe.getTransfer(z)===st?($!==on||te!==pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),x}function tt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=D,this.setTexture2D=Y,this.setTexture2DArray=q,this.setTexture3D=ee,this.setTextureCube=j,this.rebindTextures=gt,this.setupRenderTarget=L,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=ye}function eg(i,e){function t(n,s=Hn){let r;const o=Qe.getTransfer(s);if(n===pn)return i.UNSIGNED_BYTE;if(n===Yo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===qo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===nc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ic)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ec)return i.BYTE;if(n===tc)return i.SHORT;if(n===is)return i.UNSIGNED_SHORT;if(n===jo)return i.INT;if(n===li)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===Rn)return i.HALF_FLOAT;if(n===sc)return i.ALPHA;if(n===rc)return i.RGB;if(n===on)return i.RGBA;if(n===rs)return i.DEPTH_COMPONENT;if(n===os)return i.DEPTH_STENCIL;if(n===oc)return i.RED;if(n===Ko)return i.RED_INTEGER;if(n===ac)return i.RG;if(n===Jo)return i.RG_INTEGER;if(n===$o)return i.RGBA_INTEGER;if(n===Ks||n===Js||n===$s||n===Zs)if(o===st)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ks)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===$s)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ks)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Js)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===$s)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Zs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===uo||n===fo||n===po||n===mo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===uo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===po)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===mo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===go||n===_o||n===vo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===go||n===_o)return o===st?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===vo)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===xo||n===Mo||n===So||n===yo||n===bo||n===wo||n===Eo||n===To||n===Ao||n===Ro||n===Co||n===Po||n===Lo||n===Do)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===xo)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Mo)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===So)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===yo)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===bo)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===wo)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Eo)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===To)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ao)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ro)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Co)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Po)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Lo)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Do)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Io||n===Uo||n===No)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Io)return o===st?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Uo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===No)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Fo||n===Oo||n===ko||n===Bo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Fo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Oo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ko)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Bo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ss?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const tg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ng=`
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

}`;class ig{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Sc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ct({vertexShader:tg,fragmentShader:ng,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new We(new Pn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class sg extends Fi{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,f=null,p=null,g=null;const S=typeof XRWebGLBinding<"u",m=new ig,u={},E=t.getContextAttributes();let y=null,v=null;const R=[],T=[],C=new Ce;let U=null;const w=new Zt;w.viewport=new pt;const M=new Zt;M.viewport=new pt;const I=[w,M],D=new yd;let H=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let Z=R[J];return Z===void 0&&(Z=new Lr,R[J]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(J){let Z=R[J];return Z===void 0&&(Z=new Lr,R[J]=Z),Z.getGripSpace()},this.getHand=function(J){let Z=R[J];return Z===void 0&&(Z=new Lr,R[J]=Z),Z.getHandSpace()};function Y(J){const Z=T.indexOf(J.inputSource);if(Z===-1)return;const ge=R[Z];ge!==void 0&&(ge.update(J.inputSource,J.frame,c||o),ge.dispatchEvent({type:J.type,data:J.inputSource}))}function q(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",ee);for(let J=0;J<R.length;J++){const Z=T[J];Z!==null&&(T[J]=null,R[J].disconnect(Z))}H=null,X=null,m.reset();for(const J in u)delete u[J];e.setRenderTarget(y),p=null,f=null,d=null,s=null,v=null,Ge.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d===null&&S&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",q),s.addEventListener("inputsourceschange",ee),E.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(C),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let ge=null,Le=null,ve=null;E.depth&&(ve=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=E.stencil?os:rs,Le=E.stencil?ss:li);const Ke={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};d=this.getBinding(),f=d.createProjectionLayer(Ke),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new ln(f.textureWidth,f.textureHeight,{format:on,type:pn,depthTexture:new Mc(f.textureWidth,f.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ge={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ge),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new ln(p.framebufferWidth,p.framebufferHeight,{format:on,type:pn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Ge.setContext(s),Ge.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ee(J){for(let Z=0;Z<J.removed.length;Z++){const ge=J.removed[Z],Le=T.indexOf(ge);Le>=0&&(T[Le]=null,R[Le].disconnect(ge))}for(let Z=0;Z<J.added.length;Z++){const ge=J.added[Z];let Le=T.indexOf(ge);if(Le===-1){for(let Ke=0;Ke<R.length;Ke++)if(Ke>=T.length){T.push(ge),Le=Ke;break}else if(T[Ke]===null){T[Ke]=ge,Le=Ke;break}if(Le===-1)break}const ve=R[Le];ve&&ve.connect(ge)}}const j=new P,oe=new P;function he(J,Z,ge){j.setFromMatrixPosition(Z.matrixWorld),oe.setFromMatrixPosition(ge.matrixWorld);const Le=j.distanceTo(oe),ve=Z.projectionMatrix.elements,Ke=ge.projectionMatrix.elements,gt=ve[14]/(ve[10]-1),L=ve[14]/(ve[10]+1),it=(ve[9]+1)/ve[5],Se=(ve[9]-1)/ve[5],Ue=(ve[8]-1)/ve[0],xe=(Ke[8]+1)/Ke[0],ot=gt*Ue,ye=gt*xe,Be=Le/(-Ue+xe),De=Be*-Ue;if(Z.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(De),J.translateZ(Be),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),ve[10]===-1)J.projectionMatrix.copy(Z.projectionMatrix),J.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const tt=gt+Be,A=L+Be,x=ot-De,z=ye+(Le-De),$=it*L/A*tt,te=Se*L/A*tt;J.projectionMatrix.makePerspective(x,z,$,te,tt,A),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Ee(J,Z){Z===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(Z.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let Z=J.near,ge=J.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(ge=m.depthFar)),D.near=M.near=w.near=Z,D.far=M.far=w.far=ge,(H!==D.near||X!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),H=D.near,X=D.far),D.layers.mask=J.layers.mask|6,w.layers.mask=D.layers.mask&3,M.layers.mask=D.layers.mask&5;const Le=J.parent,ve=D.cameras;Ee(D,Le);for(let Ke=0;Ke<ve.length;Ke++)Ee(ve[Ke],Le);ve.length===2?he(D,w,M):D.projectionMatrix.copy(w.projectionMatrix),Xe(J,D,Le)};function Xe(J,Z,ge){ge===null?J.matrix.copy(Z.matrixWorld):(J.matrix.copy(ge.matrixWorld),J.matrix.invert(),J.matrix.multiply(Z.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(Z.projectionMatrix),J.projectionMatrixInverse.copy(Z.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=as*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(J){l=J,f!==null&&(f.fixedFoveation=J),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(J){return u[J]};let G=null;function Ve(J,Z){if(h=Z.getViewerPose(c||o),g=Z,h!==null){const ge=h.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let Le=!1;ge.length!==D.cameras.length&&(D.cameras.length=0,Le=!0);for(let L=0;L<ge.length;L++){const it=ge[L];let Se=null;if(p!==null)Se=p.getViewport(it);else{const xe=d.getViewSubImage(f,it);Se=xe.viewport,L===0&&(e.setRenderTargetTextures(v,xe.colorTexture,xe.depthStencilTexture),e.setRenderTarget(v))}let Ue=I[L];Ue===void 0&&(Ue=new Zt,Ue.layers.enable(L),Ue.viewport=new pt,I[L]=Ue),Ue.matrix.fromArray(it.transform.matrix),Ue.matrix.decompose(Ue.position,Ue.quaternion,Ue.scale),Ue.projectionMatrix.fromArray(it.projectionMatrix),Ue.projectionMatrixInverse.copy(Ue.projectionMatrix).invert(),Ue.viewport.set(Se.x,Se.y,Se.width,Se.height),L===0&&(D.matrix.copy(Ue.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Le===!0&&D.cameras.push(Ue)}const ve=s.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){d=n.getBinding();const L=d.getDepthInformation(ge[0]);L&&L.isValid&&L.texture&&m.init(L,s.renderState)}if(ve&&ve.includes("camera-access")&&S){e.state.unbindTexture(),d=n.getBinding();for(let L=0;L<ge.length;L++){const it=ge[L].camera;if(it){let Se=u[it];Se||(Se=new Sc,u[it]=Se);const Ue=d.getCameraImage(it);Se.sourceTexture=Ue}}}}for(let ge=0;ge<R.length;ge++){const Le=T[ge],ve=R[ge];Le!==null&&ve!==void 0&&ve.update(Le,Z,c||o)}G&&G(J,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}const Ge=new wc;Ge.setAnimationLoop(Ve),this.setAnimationLoop=function(J){G=J},this.dispose=function(){}}}const Zn=new mn,rg=new mt;function og(i,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function n(m,u){u.color.getRGB(m.fogColor.value,mc(i)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function s(m,u,E,y,v){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(m,u):u.isMeshToonMaterial?(r(m,u),d(m,u)):u.isMeshPhongMaterial?(r(m,u),h(m,u)):u.isMeshStandardMaterial?(r(m,u),f(m,u),u.isMeshPhysicalMaterial&&p(m,u,v)):u.isMeshMatcapMaterial?(r(m,u),g(m,u)):u.isMeshDepthMaterial?r(m,u):u.isMeshDistanceMaterial?(r(m,u),S(m,u)):u.isMeshNormalMaterial?r(m,u):u.isLineBasicMaterial?(o(m,u),u.isLineDashedMaterial&&a(m,u)):u.isPointsMaterial?l(m,u,E,y):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===Ft&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===Ft&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const E=e.get(u),y=E.envMap,v=E.envMapRotation;y&&(m.envMap.value=y,Zn.copy(v),Zn.x*=-1,Zn.y*=-1,Zn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Zn.y*=-1,Zn.z*=-1),m.envMapRotation.value.setFromMatrix4(rg.makeRotationFromEuler(Zn)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function o(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function a(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,E,y){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*E,m.scale.value=y*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function h(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function d(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function f(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,E){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Ft&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,u){u.matcap&&(m.matcap.value=u.matcap)}function S(m,u){const E=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ag(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,y){const v=y.program;n.uniformBlockBinding(E,v)}function c(E,y){let v=s[E.id];v===void 0&&(g(E),v=h(E),s[E.id]=v,E.addEventListener("dispose",m));const R=y.program;n.updateUBOMapping(E,R);const T=e.render.frame;r[E.id]!==T&&(f(E),r[E.id]=T)}function h(E){const y=d();E.__bindingPointIndex=y;const v=i.createBuffer(),R=E.__size,T=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,R,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,v),v}function d(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){const y=s[E.id],v=E.uniforms,R=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let T=0,C=v.length;T<C;T++){const U=Array.isArray(v[T])?v[T]:[v[T]];for(let w=0,M=U.length;w<M;w++){const I=U[w];if(p(I,T,w,R)===!0){const D=I.__offset,H=Array.isArray(I.value)?I.value:[I.value];let X=0;for(let Y=0;Y<H.length;Y++){const q=H[Y],ee=S(q);typeof q=="number"||typeof q=="boolean"?(I.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,D+X,I.__data)):q.isMatrix3?(I.__data[0]=q.elements[0],I.__data[1]=q.elements[1],I.__data[2]=q.elements[2],I.__data[3]=0,I.__data[4]=q.elements[3],I.__data[5]=q.elements[4],I.__data[6]=q.elements[5],I.__data[7]=0,I.__data[8]=q.elements[6],I.__data[9]=q.elements[7],I.__data[10]=q.elements[8],I.__data[11]=0):(q.toArray(I.__data,X),X+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(E,y,v,R){const T=E.value,C=y+"_"+v;if(R[C]===void 0)return typeof T=="number"||typeof T=="boolean"?R[C]=T:R[C]=T.clone(),!0;{const U=R[C];if(typeof T=="number"||typeof T=="boolean"){if(U!==T)return R[C]=T,!0}else if(U.equals(T)===!1)return U.copy(T),!0}return!1}function g(E){const y=E.uniforms;let v=0;const R=16;for(let C=0,U=y.length;C<U;C++){const w=Array.isArray(y[C])?y[C]:[y[C]];for(let M=0,I=w.length;M<I;M++){const D=w[M],H=Array.isArray(D.value)?D.value:[D.value];for(let X=0,Y=H.length;X<Y;X++){const q=H[X],ee=S(q),j=v%R,oe=j%ee.boundary,he=j+oe;v+=oe,he!==0&&R-he<ee.storage&&(v+=R-he),D.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=v,v+=ee.storage}}}const T=v%R;return T>0&&(v+=R-T),E.__size=v,E.__cache={},this}function S(E){const y={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(y.boundary=4,y.storage=4):E.isVector2?(y.boundary=8,y.storage=8):E.isVector3||E.isColor?(y.boundary=16,y.storage=12):E.isVector4?(y.boundary=16,y.storage=16):E.isMatrix3?(y.boundary=48,y.storage=48):E.isMatrix4?(y.boundary=64,y.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),y}function m(E){const y=E.target;y.removeEventListener("dispose",m);const v=o.indexOf(y.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function u(){for(const E in s)i.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:l,update:c,dispose:u}}class lg{constructor(e={}){const{canvas:t=Bh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),S=new Int32Array(4);let m=null,u=null;const E=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let R=!1;this._outputColorSpace=zt;let T=0,C=0,U=null,w=-1,M=null;const I=new pt,D=new pt;let H=null;const X=new fe(0);let Y=0,q=t.width,ee=t.height,j=1,oe=null,he=null;const Ee=new pt(0,0,q,ee),Xe=new pt(0,0,q,ee);let G=!1;const Ve=new ia;let Ge=!1,J=!1;const Z=new mt,ge=new P,Le=new pt,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ke=!1;function gt(){return U===null?j:1}let L=n;function it(b,F){return t.getContext(b,F)}try{const b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Wo}`),t.addEventListener("webglcontextlost",le,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",ne,!1),L===null){const F="webgl2";if(L=it(F,b),L===null)throw it(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Se,Ue,xe,ot,ye,Be,De,tt,A,x,z,$,te,K,Pe,ae,Te,Ae,se,me,Oe,Re,de,je;function N(){Se=new vp(L),Se.init(),Re=new eg(L,Se),Ue=new dp(L,Se,e,Re),xe=new Zm(L,Se),Ue.reversedDepthBuffer&&f&&xe.buffers.depth.setReversed(!0),ot=new Sp(L),ye=new Bm,Be=new Qm(L,Se,xe,ye,Ue,Re,ot),De=new fp(v),tt=new _p(v),A=new Td(L),de=new cp(L,A),x=new xp(L,A,ot,de),z=new bp(L,x,A,ot),se=new yp(L,Ue,Be),ae=new up(ye),$=new km(v,De,tt,Se,Ue,de,ae),te=new og(v,ye),K=new Hm,Pe=new Ym(Se),Ae=new lp(v,De,tt,xe,z,p,l),Te=new Jm(v,z,Ue),je=new ag(L,ot,Ue,xe),me=new hp(L,Se,ot),Oe=new Mp(L,Se,ot),ot.programs=$.programs,v.capabilities=Ue,v.extensions=Se,v.properties=ye,v.renderLists=K,v.shadowMap=Te,v.state=xe,v.info=ot}N();const re=new sg(v,L);this.xr=re,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=Se.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Se.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(b){b!==void 0&&(j=b,this.setSize(q,ee,!1))},this.getSize=function(b){return b.set(q,ee)},this.setSize=function(b,F,V=!0){if(re.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=b,ee=F,t.width=Math.floor(b*j),t.height=Math.floor(F*j),V===!0&&(t.style.width=b+"px",t.style.height=F+"px"),this.setViewport(0,0,b,F)},this.getDrawingBufferSize=function(b){return b.set(q*j,ee*j).floor()},this.setDrawingBufferSize=function(b,F,V){q=b,ee=F,j=V,t.width=Math.floor(b*V),t.height=Math.floor(F*V),this.setViewport(0,0,b,F)},this.getCurrentViewport=function(b){return b.copy(I)},this.getViewport=function(b){return b.copy(Ee)},this.setViewport=function(b,F,V,W){b.isVector4?Ee.set(b.x,b.y,b.z,b.w):Ee.set(b,F,V,W),xe.viewport(I.copy(Ee).multiplyScalar(j).round())},this.getScissor=function(b){return b.copy(Xe)},this.setScissor=function(b,F,V,W){b.isVector4?Xe.set(b.x,b.y,b.z,b.w):Xe.set(b,F,V,W),xe.scissor(D.copy(Xe).multiplyScalar(j).round())},this.getScissorTest=function(){return G},this.setScissorTest=function(b){xe.setScissorTest(G=b)},this.setOpaqueSort=function(b){oe=b},this.setTransparentSort=function(b){he=b},this.getClearColor=function(b){return b.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor(...arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha(...arguments)},this.clear=function(b=!0,F=!0,V=!0){let W=0;if(b){let k=!1;if(U!==null){const ie=U.texture.format;k=ie===$o||ie===Jo||ie===Ko}if(k){const ie=U.texture.type,pe=ie===pn||ie===li||ie===is||ie===ss||ie===Yo||ie===qo,be=Ae.getClearColor(),_e=Ae.getClearAlpha(),Fe=be.r,ke=be.g,Ie=be.b;pe?(g[0]=Fe,g[1]=ke,g[2]=Ie,g[3]=_e,L.clearBufferuiv(L.COLOR,0,g)):(S[0]=Fe,S[1]=ke,S[2]=Ie,S[3]=_e,L.clearBufferiv(L.COLOR,0,S))}else W|=L.COLOR_BUFFER_BIT}F&&(W|=L.DEPTH_BUFFER_BIT),V&&(W|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",le,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",ne,!1),Ae.dispose(),K.dispose(),Pe.dispose(),ye.dispose(),De.dispose(),tt.dispose(),z.dispose(),de.dispose(),je.dispose(),$.dispose(),re.dispose(),re.removeEventListener("sessionstart",cn),re.removeEventListener("sessionend",pa),Xn.stop()};function le(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Me(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const b=ot.autoReset,F=Te.enabled,V=Te.autoUpdate,W=Te.needsUpdate,k=Te.type;N(),ot.autoReset=b,Te.enabled=F,Te.autoUpdate=V,Te.needsUpdate=W,Te.type=k}function ne(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Q(b){const F=b.target;F.removeEventListener("dispose",Q),we(F)}function we(b){ze(b),ye.remove(b)}function ze(b){const F=ye.get(b).programs;F!==void 0&&(F.forEach(function(V){$.releaseProgram(V)}),b.isShaderMaterial&&$.releaseShaderCache(b))}this.renderBufferDirect=function(b,F,V,W,k,ie){F===null&&(F=ve);const pe=k.isMesh&&k.matrixWorld.determinant()<0,be=Fc(b,F,V,W,k);xe.setMaterial(W,pe);let _e=V.index,Fe=1;if(W.wireframe===!0){if(_e=x.getWireframeAttribute(V),_e===void 0)return;Fe=2}const ke=V.drawRange,Ie=V.attributes.position;let Je=ke.start*Fe,rt=(ke.start+ke.count)*Fe;ie!==null&&(Je=Math.max(Je,ie.start*Fe),rt=Math.min(rt,(ie.start+ie.count)*Fe)),_e!==null?(Je=Math.max(Je,0),rt=Math.min(rt,_e.count)):Ie!=null&&(Je=Math.max(Je,0),rt=Math.min(rt,Ie.count));const ft=rt-Je;if(ft<0||ft===1/0)return;de.setup(k,W,be,V,_e);let ct,at=me;if(_e!==null&&(ct=A.get(_e),at=Oe,at.setIndex(ct)),k.isMesh)W.wireframe===!0?(xe.setLineWidth(W.wireframeLinewidth*gt()),at.setMode(L.LINES)):at.setMode(L.TRIANGLES);else if(k.isLine){let Ne=W.linewidth;Ne===void 0&&(Ne=1),xe.setLineWidth(Ne*gt()),k.isLineSegments?at.setMode(L.LINES):k.isLineLoop?at.setMode(L.LINE_LOOP):at.setMode(L.LINE_STRIP)}else k.isPoints?at.setMode(L.POINTS):k.isSprite&&at.setMode(L.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)ls("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),at.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Se.get("WEBGL_multi_draw"))at.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Ne=k._multiDrawStarts,dt=k._multiDrawCounts,et=k._multiDrawCount,Gt=_e?A.get(_e).bytesPerElement:1,ci=ye.get(W).currentProgram.getUniforms();for(let Wt=0;Wt<et;Wt++)ci.setValue(L,"_gl_DrawID",Wt),at.render(Ne[Wt]/Gt,dt[Wt])}else if(k.isInstancedMesh)at.renderInstances(Je,ft,k.count);else if(V.isInstancedBufferGeometry){const Ne=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,dt=Math.min(V.instanceCount,Ne);at.renderInstances(Je,ft,dt)}else at.render(Je,ft)};function lt(b,F,V){b.transparent===!0&&b.side===rn&&b.forceSinglePass===!1?(b.side=Ft,b.needsUpdate=!0,ms(b,F,V),b.side=Wn,b.needsUpdate=!0,ms(b,F,V),b.side=rn):ms(b,F,V)}this.compile=function(b,F,V=null){V===null&&(V=b),u=Pe.get(V),u.init(F),y.push(u),V.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(u.pushLight(k),k.castShadow&&u.pushShadow(k))}),b!==V&&b.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(u.pushLight(k),k.castShadow&&u.pushShadow(k))}),u.setupLights();const W=new Set;return b.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const ie=k.material;if(ie)if(Array.isArray(ie))for(let pe=0;pe<ie.length;pe++){const be=ie[pe];lt(be,V,k),W.add(be)}else lt(ie,V,k),W.add(ie)}),u=y.pop(),W},this.compileAsync=function(b,F,V=null){const W=this.compile(b,F,V);return new Promise(k=>{function ie(){if(W.forEach(function(pe){ye.get(pe).currentProgram.isReady()&&W.delete(pe)}),W.size===0){k(b);return}setTimeout(ie,10)}Se.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let nt=null;function gn(b){nt&&nt(b)}function cn(){Xn.stop()}function pa(){Xn.start()}const Xn=new wc;Xn.setAnimationLoop(gn),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(b){nt=b,re.setAnimationLoop(b),b===null?Xn.stop():Xn.start()},re.addEventListener("sessionstart",cn),re.addEventListener("sessionend",pa),this.render=function(b,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(re.cameraAutoUpdate===!0&&re.updateCamera(F),F=re.getCamera()),b.isScene===!0&&b.onBeforeRender(v,b,F,U),u=Pe.get(b,y.length),u.init(F),y.push(u),Z.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Ve.setFromProjectionMatrix(Z,fn,F.reversedDepth),J=this.localClippingEnabled,Ge=ae.init(this.clippingPlanes,J),m=K.get(b,E.length),m.init(),E.push(m),re.enabled===!0&&re.isPresenting===!0){const ie=v.xr.getDepthSensingMesh();ie!==null&&lr(ie,F,-1/0,v.sortObjects)}lr(b,F,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(oe,he),Ke=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,Ke&&Ae.addToRenderList(m,b),this.info.render.frame++,Ge===!0&&ae.beginShadows();const V=u.state.shadowsArray;Te.render(V,b,F),Ge===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,k=m.transmissive;if(u.setupLights(),F.isArrayCamera){const ie=F.cameras;if(k.length>0)for(let pe=0,be=ie.length;pe<be;pe++){const _e=ie[pe];ga(W,k,b,_e)}Ke&&Ae.render(b);for(let pe=0,be=ie.length;pe<be;pe++){const _e=ie[pe];ma(m,b,_e,_e.viewport)}}else k.length>0&&ga(W,k,b,F),Ke&&Ae.render(b),ma(m,b,F);U!==null&&C===0&&(Be.updateMultisampleRenderTarget(U),Be.updateRenderTargetMipmap(U)),b.isScene===!0&&b.onAfterRender(v,b,F),de.resetDefaultState(),w=-1,M=null,y.pop(),y.length>0?(u=y[y.length-1],Ge===!0&&ae.setGlobalState(v.clippingPlanes,u.state.camera)):u=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function lr(b,F,V,W){if(b.visible===!1)return;if(b.layers.test(F.layers)){if(b.isGroup)V=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(F);else if(b.isLight)u.pushLight(b),b.castShadow&&u.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Ve.intersectsSprite(b)){W&&Le.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Z);const pe=z.update(b),be=b.material;be.visible&&m.push(b,pe,be,V,Le.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Ve.intersectsObject(b))){const pe=z.update(b),be=b.material;if(W&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Le.copy(b.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),Le.copy(pe.boundingSphere.center)),Le.applyMatrix4(b.matrixWorld).applyMatrix4(Z)),Array.isArray(be)){const _e=pe.groups;for(let Fe=0,ke=_e.length;Fe<ke;Fe++){const Ie=_e[Fe],Je=be[Ie.materialIndex];Je&&Je.visible&&m.push(b,pe,Je,V,Le.z,Ie)}}else be.visible&&m.push(b,pe,be,V,Le.z,null)}}const ie=b.children;for(let pe=0,be=ie.length;pe<be;pe++)lr(ie[pe],F,V,W)}function ma(b,F,V,W){const k=b.opaque,ie=b.transmissive,pe=b.transparent;u.setupLightsView(V),Ge===!0&&ae.setGlobalState(v.clippingPlanes,V),W&&xe.viewport(I.copy(W)),k.length>0&&ps(k,F,V),ie.length>0&&ps(ie,F,V),pe.length>0&&ps(pe,F,V),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function ga(b,F,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[W.id]===void 0&&(u.state.transmissionRenderTarget[W.id]=new ln(1,1,{generateMipmaps:!0,type:Se.has("EXT_color_buffer_half_float")||Se.has("EXT_color_buffer_float")?Rn:pn,minFilter:oi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));const ie=u.state.transmissionRenderTarget[W.id],pe=W.viewport||I;ie.setSize(pe.z*v.transmissionResolutionScale,pe.w*v.transmissionResolutionScale);const be=v.getRenderTarget(),_e=v.getActiveCubeFace(),Fe=v.getActiveMipmapLevel();v.setRenderTarget(ie),v.getClearColor(X),Y=v.getClearAlpha(),Y<1&&v.setClearColor(16777215,.5),v.clear(),Ke&&Ae.render(V);const ke=v.toneMapping;v.toneMapping=Gn;const Ie=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),u.setupLightsView(W),Ge===!0&&ae.setGlobalState(v.clippingPlanes,W),ps(b,V,W),Be.updateMultisampleRenderTarget(ie),Be.updateRenderTargetMipmap(ie),Se.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let rt=0,ft=F.length;rt<ft;rt++){const ct=F[rt],at=ct.object,Ne=ct.geometry,dt=ct.material,et=ct.group;if(dt.side===rn&&at.layers.test(W.layers)){const Gt=dt.side;dt.side=Ft,dt.needsUpdate=!0,_a(at,V,W,Ne,dt,et),dt.side=Gt,dt.needsUpdate=!0,Je=!0}}Je===!0&&(Be.updateMultisampleRenderTarget(ie),Be.updateRenderTargetMipmap(ie))}v.setRenderTarget(be,_e,Fe),v.setClearColor(X,Y),Ie!==void 0&&(W.viewport=Ie),v.toneMapping=ke}function ps(b,F,V){const W=F.isScene===!0?F.overrideMaterial:null;for(let k=0,ie=b.length;k<ie;k++){const pe=b[k],be=pe.object,_e=pe.geometry,Fe=pe.group;let ke=pe.material;ke.allowOverride===!0&&W!==null&&(ke=W),be.layers.test(V.layers)&&_a(be,F,V,_e,ke,Fe)}}function _a(b,F,V,W,k,ie){b.onBeforeRender(v,F,V,W,k,ie),b.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),k.onBeforeRender(v,F,V,W,b,ie),k.transparent===!0&&k.side===rn&&k.forceSinglePass===!1?(k.side=Ft,k.needsUpdate=!0,v.renderBufferDirect(V,F,W,k,b,ie),k.side=Wn,k.needsUpdate=!0,v.renderBufferDirect(V,F,W,k,b,ie),k.side=rn):v.renderBufferDirect(V,F,W,k,b,ie),b.onAfterRender(v,F,V,W,k,ie)}function ms(b,F,V){F.isScene!==!0&&(F=ve);const W=ye.get(b),k=u.state.lights,ie=u.state.shadowsArray,pe=k.state.version,be=$.getParameters(b,k.state,ie,F,V),_e=$.getProgramCacheKey(be);let Fe=W.programs;W.environment=b.isMeshStandardMaterial?F.environment:null,W.fog=F.fog,W.envMap=(b.isMeshStandardMaterial?tt:De).get(b.envMap||W.environment),W.envMapRotation=W.environment!==null&&b.envMap===null?F.environmentRotation:b.envMapRotation,Fe===void 0&&(b.addEventListener("dispose",Q),Fe=new Map,W.programs=Fe);let ke=Fe.get(_e);if(ke!==void 0){if(W.currentProgram===ke&&W.lightsStateVersion===pe)return xa(b,be),ke}else be.uniforms=$.getUniforms(b),b.onBeforeCompile(be,v),ke=$.acquireProgram(be,_e),Fe.set(_e,ke),W.uniforms=be.uniforms;const Ie=W.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ie.clippingPlanes=ae.uniform),xa(b,be),W.needsLights=kc(b),W.lightsStateVersion=pe,W.needsLights&&(Ie.ambientLightColor.value=k.state.ambient,Ie.lightProbe.value=k.state.probe,Ie.directionalLights.value=k.state.directional,Ie.directionalLightShadows.value=k.state.directionalShadow,Ie.spotLights.value=k.state.spot,Ie.spotLightShadows.value=k.state.spotShadow,Ie.rectAreaLights.value=k.state.rectArea,Ie.ltc_1.value=k.state.rectAreaLTC1,Ie.ltc_2.value=k.state.rectAreaLTC2,Ie.pointLights.value=k.state.point,Ie.pointLightShadows.value=k.state.pointShadow,Ie.hemisphereLights.value=k.state.hemi,Ie.directionalShadowMap.value=k.state.directionalShadowMap,Ie.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ie.spotShadowMap.value=k.state.spotShadowMap,Ie.spotLightMatrix.value=k.state.spotLightMatrix,Ie.spotLightMap.value=k.state.spotLightMap,Ie.pointShadowMap.value=k.state.pointShadowMap,Ie.pointShadowMatrix.value=k.state.pointShadowMatrix),W.currentProgram=ke,W.uniformsList=null,ke}function va(b){if(b.uniformsList===null){const F=b.currentProgram.getUniforms();b.uniformsList=Qs.seqWithValue(F.seq,b.uniforms)}return b.uniformsList}function xa(b,F){const V=ye.get(b);V.outputColorSpace=F.outputColorSpace,V.batching=F.batching,V.batchingColor=F.batchingColor,V.instancing=F.instancing,V.instancingColor=F.instancingColor,V.instancingMorph=F.instancingMorph,V.skinning=F.skinning,V.morphTargets=F.morphTargets,V.morphNormals=F.morphNormals,V.morphColors=F.morphColors,V.morphTargetsCount=F.morphTargetsCount,V.numClippingPlanes=F.numClippingPlanes,V.numIntersection=F.numClipIntersection,V.vertexAlphas=F.vertexAlphas,V.vertexTangents=F.vertexTangents,V.toneMapping=F.toneMapping}function Fc(b,F,V,W,k){F.isScene!==!0&&(F=ve),Be.resetTextureUnits();const ie=F.fog,pe=W.isMeshStandardMaterial?F.environment:null,be=U===null?v.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Ii,_e=(W.isMeshStandardMaterial?tt:De).get(W.envMap||pe),Fe=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,ke=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ie=!!V.morphAttributes.position,Je=!!V.morphAttributes.normal,rt=!!V.morphAttributes.color;let ft=Gn;W.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(ft=v.toneMapping);const ct=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,at=ct!==void 0?ct.length:0,Ne=ye.get(W),dt=u.state.lights;if(Ge===!0&&(J===!0||b!==M)){const It=b===M&&W.id===w;ae.setState(W,b,It)}let et=!1;W.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==dt.state.version||Ne.outputColorSpace!==be||k.isBatchedMesh&&Ne.batching===!1||!k.isBatchedMesh&&Ne.batching===!0||k.isBatchedMesh&&Ne.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Ne.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Ne.instancing===!1||!k.isInstancedMesh&&Ne.instancing===!0||k.isSkinnedMesh&&Ne.skinning===!1||!k.isSkinnedMesh&&Ne.skinning===!0||k.isInstancedMesh&&Ne.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Ne.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Ne.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Ne.instancingMorph===!1&&k.morphTexture!==null||Ne.envMap!==_e||W.fog===!0&&Ne.fog!==ie||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==ae.numPlanes||Ne.numIntersection!==ae.numIntersection)||Ne.vertexAlphas!==Fe||Ne.vertexTangents!==ke||Ne.morphTargets!==Ie||Ne.morphNormals!==Je||Ne.morphColors!==rt||Ne.toneMapping!==ft||Ne.morphTargetsCount!==at)&&(et=!0):(et=!0,Ne.__version=W.version);let Gt=Ne.currentProgram;et===!0&&(Gt=ms(W,F,k));let ci=!1,Wt=!1,Hi=!1;const ut=Gt.getUniforms(),qt=Ne.uniforms;if(xe.useProgram(Gt.program)&&(ci=!0,Wt=!0,Hi=!0),W.id!==w&&(w=W.id,Wt=!0),ci||M!==b){xe.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ut.setValue(L,"projectionMatrix",b.projectionMatrix),ut.setValue(L,"viewMatrix",b.matrixWorldInverse);const kt=ut.map.cameraPosition;kt!==void 0&&kt.setValue(L,ge.setFromMatrixPosition(b.matrixWorld)),Ue.logarithmicDepthBuffer&&ut.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ut.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,Wt=!0,Hi=!0)}if(k.isSkinnedMesh){ut.setOptional(L,k,"bindMatrix"),ut.setOptional(L,k,"bindMatrixInverse");const It=k.skeleton;It&&(It.boneTexture===null&&It.computeBoneTexture(),ut.setValue(L,"boneTexture",It.boneTexture,Be))}k.isBatchedMesh&&(ut.setOptional(L,k,"batchingTexture"),ut.setValue(L,"batchingTexture",k._matricesTexture,Be),ut.setOptional(L,k,"batchingIdTexture"),ut.setValue(L,"batchingIdTexture",k._indirectTexture,Be),ut.setOptional(L,k,"batchingColorTexture"),k._colorsTexture!==null&&ut.setValue(L,"batchingColorTexture",k._colorsTexture,Be));const Kt=V.morphAttributes;if((Kt.position!==void 0||Kt.normal!==void 0||Kt.color!==void 0)&&se.update(k,V,Gt),(Wt||Ne.receiveShadow!==k.receiveShadow)&&(Ne.receiveShadow=k.receiveShadow,ut.setValue(L,"receiveShadow",k.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(qt.envMap.value=_e,qt.flipEnvMap.value=_e.isCubeTexture&&_e.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&F.environment!==null&&(qt.envMapIntensity.value=F.environmentIntensity),Wt&&(ut.setValue(L,"toneMappingExposure",v.toneMappingExposure),Ne.needsLights&&Oc(qt,Hi),ie&&W.fog===!0&&te.refreshFogUniforms(qt,ie),te.refreshMaterialUniforms(qt,W,j,ee,u.state.transmissionRenderTarget[b.id]),Qs.upload(L,va(Ne),qt,Be)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Qs.upload(L,va(Ne),qt,Be),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ut.setValue(L,"center",k.center),ut.setValue(L,"modelViewMatrix",k.modelViewMatrix),ut.setValue(L,"normalMatrix",k.normalMatrix),ut.setValue(L,"modelMatrix",k.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const It=W.uniformsGroups;for(let kt=0,cr=It.length;kt<cr;kt++){const jn=It[kt];je.update(jn,Gt),je.bind(jn,Gt)}}return Gt}function Oc(b,F){b.ambientLightColor.needsUpdate=F,b.lightProbe.needsUpdate=F,b.directionalLights.needsUpdate=F,b.directionalLightShadows.needsUpdate=F,b.pointLights.needsUpdate=F,b.pointLightShadows.needsUpdate=F,b.spotLights.needsUpdate=F,b.spotLightShadows.needsUpdate=F,b.rectAreaLights.needsUpdate=F,b.hemisphereLights.needsUpdate=F}function kc(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(b,F,V){const W=ye.get(b);W.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),ye.get(b.texture).__webglTexture=F,ye.get(b.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:V,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,F){const V=ye.get(b);V.__webglFramebuffer=F,V.__useDefaultFramebuffer=F===void 0};const Bc=L.createFramebuffer();this.setRenderTarget=function(b,F=0,V=0){U=b,T=F,C=V;let W=!0,k=null,ie=!1,pe=!1;if(b){const _e=ye.get(b);if(_e.__useDefaultFramebuffer!==void 0)xe.bindFramebuffer(L.FRAMEBUFFER,null),W=!1;else if(_e.__webglFramebuffer===void 0)Be.setupRenderTarget(b);else if(_e.__hasExternalTextures)Be.rebindTextures(b,ye.get(b.texture).__webglTexture,ye.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Ie=b.depthTexture;if(_e.__boundDepthTexture!==Ie){if(Ie!==null&&ye.has(Ie)&&(b.width!==Ie.image.width||b.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Be.setupDepthRenderbuffer(b)}}const Fe=b.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(pe=!0);const ke=ye.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(ke[F])?k=ke[F][V]:k=ke[F],ie=!0):b.samples>0&&Be.useMultisampledRTT(b)===!1?k=ye.get(b).__webglMultisampledFramebuffer:Array.isArray(ke)?k=ke[V]:k=ke,I.copy(b.viewport),D.copy(b.scissor),H=b.scissorTest}else I.copy(Ee).multiplyScalar(j).floor(),D.copy(Xe).multiplyScalar(j).floor(),H=G;if(V!==0&&(k=Bc),xe.bindFramebuffer(L.FRAMEBUFFER,k)&&W&&xe.drawBuffers(b,k),xe.viewport(I),xe.scissor(D),xe.setScissorTest(H),ie){const _e=ye.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+F,_e.__webglTexture,V)}else if(pe){const _e=F;for(let Fe=0;Fe<b.textures.length;Fe++){const ke=ye.get(b.textures[Fe]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Fe,ke.__webglTexture,V,_e)}}else if(b!==null&&V!==0){const _e=ye.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,_e.__webglTexture,V)}w=-1},this.readRenderTargetPixels=function(b,F,V,W,k,ie,pe,be=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=ye.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&pe!==void 0&&(_e=_e[pe]),_e){xe.bindFramebuffer(L.FRAMEBUFFER,_e);try{const Fe=b.textures[be],ke=Fe.format,Ie=Fe.type;if(!Ue.textureFormatReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ue.textureTypeReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=b.width-W&&V>=0&&V<=b.height-k&&(b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+be),L.readPixels(F,V,W,k,Re.convert(ke),Re.convert(Ie),ie))}finally{const Fe=U!==null?ye.get(U).__webglFramebuffer:null;xe.bindFramebuffer(L.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(b,F,V,W,k,ie,pe,be=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=ye.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&pe!==void 0&&(_e=_e[pe]),_e)if(F>=0&&F<=b.width-W&&V>=0&&V<=b.height-k){xe.bindFramebuffer(L.FRAMEBUFFER,_e);const Fe=b.textures[be],ke=Fe.format,Ie=Fe.type;if(!Ue.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ue.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Je=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Je),L.bufferData(L.PIXEL_PACK_BUFFER,ie.byteLength,L.STREAM_READ),b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+be),L.readPixels(F,V,W,k,Re.convert(ke),Re.convert(Ie),0);const rt=U!==null?ye.get(U).__webglFramebuffer:null;xe.bindFramebuffer(L.FRAMEBUFFER,rt);const ft=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await zh(L,ft,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Je),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ie),L.deleteBuffer(Je),L.deleteSync(ft),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,F=null,V=0){const W=Math.pow(2,-V),k=Math.floor(b.image.width*W),ie=Math.floor(b.image.height*W),pe=F!==null?F.x:0,be=F!==null?F.y:0;Be.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,V,0,0,pe,be,k,ie),xe.unbindTexture()};const zc=L.createFramebuffer(),Hc=L.createFramebuffer();this.copyTextureToTexture=function(b,F,V=null,W=null,k=0,ie=null){ie===null&&(k!==0?(ls("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ie=k,k=0):ie=0);let pe,be,_e,Fe,ke,Ie,Je,rt,ft;const ct=b.isCompressedTexture?b.mipmaps[ie]:b.image;if(V!==null)pe=V.max.x-V.min.x,be=V.max.y-V.min.y,_e=V.isBox3?V.max.z-V.min.z:1,Fe=V.min.x,ke=V.min.y,Ie=V.isBox3?V.min.z:0;else{const Kt=Math.pow(2,-k);pe=Math.floor(ct.width*Kt),be=Math.floor(ct.height*Kt),b.isDataArrayTexture?_e=ct.depth:b.isData3DTexture?_e=Math.floor(ct.depth*Kt):_e=1,Fe=0,ke=0,Ie=0}W!==null?(Je=W.x,rt=W.y,ft=W.z):(Je=0,rt=0,ft=0);const at=Re.convert(F.format),Ne=Re.convert(F.type);let dt;F.isData3DTexture?(Be.setTexture3D(F,0),dt=L.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Be.setTexture2DArray(F,0),dt=L.TEXTURE_2D_ARRAY):(Be.setTexture2D(F,0),dt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);const et=L.getParameter(L.UNPACK_ROW_LENGTH),Gt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),ci=L.getParameter(L.UNPACK_SKIP_PIXELS),Wt=L.getParameter(L.UNPACK_SKIP_ROWS),Hi=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ct.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ct.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Fe),L.pixelStorei(L.UNPACK_SKIP_ROWS,ke),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ie);const ut=b.isDataArrayTexture||b.isData3DTexture,qt=F.isDataArrayTexture||F.isData3DTexture;if(b.isDepthTexture){const Kt=ye.get(b),It=ye.get(F),kt=ye.get(Kt.__renderTarget),cr=ye.get(It.__renderTarget);xe.bindFramebuffer(L.READ_FRAMEBUFFER,kt.__webglFramebuffer),xe.bindFramebuffer(L.DRAW_FRAMEBUFFER,cr.__webglFramebuffer);for(let jn=0;jn<_e;jn++)ut&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ye.get(b).__webglTexture,k,Ie+jn),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ye.get(F).__webglTexture,ie,ft+jn)),L.blitFramebuffer(Fe,ke,pe,be,Je,rt,pe,be,L.DEPTH_BUFFER_BIT,L.NEAREST);xe.bindFramebuffer(L.READ_FRAMEBUFFER,null),xe.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(k!==0||b.isRenderTargetTexture||ye.has(b)){const Kt=ye.get(b),It=ye.get(F);xe.bindFramebuffer(L.READ_FRAMEBUFFER,zc),xe.bindFramebuffer(L.DRAW_FRAMEBUFFER,Hc);for(let kt=0;kt<_e;kt++)ut?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Kt.__webglTexture,k,Ie+kt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Kt.__webglTexture,k),qt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,It.__webglTexture,ie,ft+kt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,It.__webglTexture,ie),k!==0?L.blitFramebuffer(Fe,ke,pe,be,Je,rt,pe,be,L.COLOR_BUFFER_BIT,L.NEAREST):qt?L.copyTexSubImage3D(dt,ie,Je,rt,ft+kt,Fe,ke,pe,be):L.copyTexSubImage2D(dt,ie,Je,rt,Fe,ke,pe,be);xe.bindFramebuffer(L.READ_FRAMEBUFFER,null),xe.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else qt?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(dt,ie,Je,rt,ft,pe,be,_e,at,Ne,ct.data):F.isCompressedArrayTexture?L.compressedTexSubImage3D(dt,ie,Je,rt,ft,pe,be,_e,at,ct.data):L.texSubImage3D(dt,ie,Je,rt,ft,pe,be,_e,at,Ne,ct):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ie,Je,rt,pe,be,at,Ne,ct.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ie,Je,rt,ct.width,ct.height,at,ct.data):L.texSubImage2D(L.TEXTURE_2D,ie,Je,rt,pe,be,at,Ne,ct);L.pixelStorei(L.UNPACK_ROW_LENGTH,et),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Gt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ci),L.pixelStorei(L.UNPACK_SKIP_ROWS,Wt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Hi),ie===0&&F.generateMipmaps&&L.generateMipmap(dt),xe.unbindTexture()},this.initRenderTarget=function(b){ye.get(b).__webglFramebuffer===void 0&&Be.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Be.setTextureCube(b,0):b.isData3DTexture?Be.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Be.setTexture2DArray(b,0):Be.setTexture2D(b,0),xe.unbindTexture()},this.resetState=function(){T=0,C=0,U=null,xe.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}const er={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class zi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const cg=new ra(-1,1,1,-1,0,1);class hg extends Vt{constructor(){super(),this.setAttribute("position",new bt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new bt([0,2,0,0,2,0],2))}}const dg=new hg;class aa{constructor(e){this._mesh=new We(dg,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,cg)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ug extends zi{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ct?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=cs.clone(e.uniforms),this.material=new Ct({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new aa(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Sl extends zi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class fg extends zi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class pg{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new Ce);this._width=n.width,this._height=n.height,t=new ln(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Rn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ug(er),this.copyPass.material.blending=An,this.clock=new yc}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Sl!==void 0&&(o instanceof Sl?n=!0:o instanceof fg&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Ce);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class mg extends zi{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new fe}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}const gg={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new fe(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Ni extends zi{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new Ce(e.x,e.y):new Ce(256,256),this.clearColor=new fe(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new ln(r,o,{type:Rn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new ln(r,o,{type:Rn});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new ln(r,o,{type:Rn});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=gg;this.highPassUniforms=cs.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ct({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Ce(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=cs.clone(er.uniforms),this.blendMaterial=new Ct({uniforms:this.copyUniforms,vertexShader:er.vertexShader,fragmentShader:er.fragmentShader,blending:$r,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new fe,this._oldClearAlpha=1,this._basic=new us,this._fsQuad=new aa(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Ce(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ni.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ni.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Ct({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Ce(.5,.5)},direction:{value:new Ce(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}_getCompositeMaterial(e){return new Ct({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Ni.BlurDirectionX=new Ce(1,0);Ni.BlurDirectionY=new Ce(0,1);const zs={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class _g extends zi{constructor(){super(),this.uniforms=cs.clone(zs.uniforms),this.material=new md({name:zs.name,uniforms:this.uniforms,vertexShader:zs.vertexShader,fragmentShader:zs.fragmentShader}),this._fsQuad=new aa(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Qe.getTransfer(this._outputColorSpace)===st&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Yl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ql?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Kl?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Xo?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===$l?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Zl?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Jl&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const yl={low:{pixelRatioCap:1,renderScale:.8,shadows:!1,shadowMapSize:512,shadowDistance:60,antialias:!1,waterReflections:!1,bloom:!1,fogDensity:.0075,viewDistance:420,foliageDensity:.25,anisotropy:1},medium:{pixelRatioCap:1.25,renderScale:1,shadows:!0,shadowMapSize:1024,shadowDistance:90,antialias:!1,waterReflections:!1,bloom:!1,fogDensity:.0052,viewDistance:620,foliageDensity:.6,anisotropy:4},high:{pixelRatioCap:2,renderScale:1,shadows:!0,shadowMapSize:2048,shadowDistance:130,antialias:!0,waterReflections:!0,bloom:!0,fogDensity:.004,viewDistance:900,foliageDensity:1,anisotropy:8}},Ti={quality:"medium",musicVolume:.6,effectsVolume:.8,cameraSensitivity:1,invertCameraY:!1},Cc="letsgo.settings.v1";function bl(i,e){return typeof i=="number"&&Number.isFinite(i)?Math.min(1,Math.max(0,i)):e}function vg(){try{const i=localStorage.getItem(Cc);if(!i)return{...Ti};const e=JSON.parse(i);return{quality:e.quality==="low"||e.quality==="medium"||e.quality==="high"?e.quality:Ti.quality,musicVolume:bl(e.musicVolume,Ti.musicVolume),effectsVolume:bl(e.effectsVolume,Ti.effectsVolume),cameraSensitivity:typeof e.cameraSensitivity=="number"&&Number.isFinite(e.cameraSensitivity)?Math.min(3,Math.max(.2,e.cameraSensitivity)):Ti.cameraSensitivity,invertCameraY:e.invertCameraY===!0}}catch{return{...Ti}}}function xg(i){try{localStorage.setItem(Cc,JSON.stringify(i))}catch{}}const Mg=`
  varying vec3 vWorldDirection;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldDirection = normalize(worldPosition.xyz - cameraPosition);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position.z = gl_Position.w; // keep the dome pinned to the far plane
  }
`,Sg=`
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
`;class yg extends vt{constructor(t,n){super();B(this,"clouds",[]);const s=new Ct({uniforms:{topColor:{value:new fe("#2f7fe0")},horizonColor:{value:new fe("#bfe4f7")},bottomColor:{value:new fe("#8fb39a")},sunDirection:{value:t},sunColor:{value:new fe("#fff6d8")}},vertexShader:Mg,fragmentShader:Sg,side:Ft,depthWrite:!1}),r=new We(new wn(1,24,16),s);r.frustumCulled=!1,r.renderOrder=-1e3,this.add(r);const o=new us({color:16777215,fog:!1,transparent:!0,opacity:.95,depthWrite:!1});for(let a=0;a<n;a+=1){const l=new We(bg(a),o),c=a/n*Math.PI*2+a*.37,h=260+a*53%150;l.position.set(Math.cos(c)*h,110+a*29%70,Math.sin(c)*h);const d=14+a*17%20;l.scale.setScalar(d),l.renderOrder=-900,l.userData.drift=.6+a*13%10*.08,this.clouds.push(l),this.add(l)}}update(t,n){for(const s of this.clouds){const r=s.userData.drift;s.position.x+=r*t,s.position.x-n.x>420&&(s.position.x-=840),s.lookAt(n.x,s.position.y,n.z)}}}function bg(i){const e=[],t=4+i%3;let n=i*9301+49297;const s=()=>(n=(n*9301+49297)%233280,n/233280);for(let o=0;o<t;o+=1){const a=(o-(t-1)/2)*.62+(s()-.5)*.25,l=(s()-.5)*.22,c=.42+s()*.3,h=10;for(let d=0;d<h;d+=1){const f=d/h*Math.PI*2,p=(d+1)/h*Math.PI*2;e.push(a,l,0),e.push(a+Math.cos(f)*c,l+Math.sin(f)*c*.72,0),e.push(a+Math.cos(p)*c,l+Math.sin(p)*c*.72,0)}}const r=new Vt;return r.setAttribute("position",new bt(e,3)),r.computeVertexNormals(),r}const Hr=new P(.55,.72,.42).normalize(),la=new P(-.45,.8,-.75).normalize(),wg=9,wl=26,El=new fe(12575991),Tl=new fe(1185309),Al=new fe(13625599),Rl=new fe(11058648),Eg=new fe(1002083),Tg=new fe(1268342),Ag=new fe(3117232),Rg=.05;class Cg{constructor(e,t){B(this,"renderer");B(this,"scene",new hd);B(this,"camera");B(this,"clock",new yc);B(this,"sky");B(this,"sun");B(this,"hemisphere");B(this,"ambient");B(this,"fog");B(this,"rimLight",null);B(this,"studio",!1);B(this,"composer",null);B(this,"bloomPass",null);B(this,"preset");B(this,"quality");B(this,"underwater",!1);B(this,"underwaterMix",0);B(this,"wasUnderwater",!1);B(this,"fps",0);B(this,"fpsAccumulator",0);B(this,"fpsFrames",0);B(this,"resize",()=>{const e=window.innerWidth,t=Math.max(1,window.innerHeight),n=Math.min(window.devicePixelRatio||1,this.preset.pixelRatioCap);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(n*this.preset.renderScale),this.renderer.setSize(e,t,!0),this.composer?.setSize(e,t),this.bloomPass?.resolution.set(e,t)});this.quality=t,this.preset=yl[t],this.renderer=new lg({antialias:this.preset.antialias,powerPreference:"high-performance",stencil:!1}),this.renderer.outputColorSpace=zt,this.renderer.toneMapping=Xo,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.type=Xl,this.renderer.domElement.classList.add("game-canvas"),e.appendChild(this.renderer.domElement),this.camera=new Zt(62,window.innerWidth/Math.max(1,window.innerHeight),.1,this.preset.viewDistance),this.camera.position.set(0,8,18),this.fog=new na(12575991,this.preset.fogDensity),this.scene.fog=this.fog,this.scene.background=new fe(12575991),this.sky=new yg(Hr,14),this.scene.add(this.sky),this.sun=new qa(16774102,2.15),this.sun.position.copy(Hr).multiplyScalar(120),this.sun.castShadow=!0,this.scene.add(this.sun),this.scene.add(this.sun.target),this.hemisphere=new vd(13625599,7311194,1),this.scene.add(this.hemisphere),this.ambient=new Sd(16777215,.22),this.scene.add(this.ambient),this.applyQuality(t),this.resize(),window.addEventListener("resize",this.resize)}setStudioMode(e){if(this.studio=e,this.sky.visible=!e,this.configureShadowCamera(),this.applyShadowMapSize(),e){if(this.scene.fog=null,this.scene.background.copy(Tl),this.sun.intensity=1.9,this.sun.color.set(16774370),this.hemisphere.intensity=.95,this.hemisphere.color.copy(Rl),this.hemisphere.groundColor.set(4672856),this.ambient.intensity=.3,!this.rimLight){const t=new qa(12572927,1.6);t.position.set(.6,.5,1).multiplyScalar(40),t.castShadow=!1,this.rimLight=t,this.scene.add(t)}this.rimLight.visible=!0}else this.scene.fog=this.fog,this.scene.background.copy(El),this.sun.intensity=2.15,this.hemisphere.intensity=1,this.hemisphere.color.copy(Al),this.ambient.intensity=.22,this.rimLight&&(this.rimLight.visible=!1)}applyQuality(e){this.quality=e;const t=yl[e];this.preset=t,this.renderer.shadowMap.enabled=t.shadows,this.sun.castShadow=t.shadows,this.applyShadowMapSize(),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null),this.configureShadowCamera(),!this.underwater&&!this.studio&&(this.fog.density=t.fogDensity),this.camera.far=t.viewDistance,this.camera.updateProjectionMatrix(),this.setUpComposer(),this.resize()}applyShadowMapSize(){const e=this.studio?Math.min(2048,this.preset.shadowMapSize*2):this.preset.shadowMapSize;this.sun.shadow.mapSize.x!==e&&(this.sun.shadow.mapSize.set(e,e),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null))}configureShadowCamera(){const e=this.studio?wg:this.preset.shadowDistance*.5,t=this.sun.shadow.camera;t.left=-e,t.right=e,t.top=e,t.bottom=-e,t.near=(this.studio,1),t.far=this.studio?wl*2.4:this.preset.shadowDistance*3.2,t.updateProjectionMatrix(),this.sun.shadow.bias=this.studio?-9e-4:-.0012,this.sun.shadow.normalBias=this.studio?.03:.035}setUpComposer(){if(this.composer&&(this.composer.dispose(),this.composer=null,this.bloomPass=null),!this.preset.bloom)return;const e=new pg(this.renderer);e.addPass(new mg(this.scene,this.camera));const t=new Ni(new Ce(window.innerWidth,window.innerHeight),.42,.72,.86);e.addPass(t),e.addPass(new _g),this.composer=e,this.bloomPass=t}focusShadowsOn(e){const t=this.studio?la:Hr,n=this.studio?wl:this.preset.shadowDistance*1.4;this.sun.target.position.copy(e),this.sun.target.updateMatrixWorld(),this.sun.position.copy(e).addScaledVector(t,n)}setUnderwater(e){this.underwater=e}get isUnderwater(){return this.underwater}applyUnderwater(e){const t=this.underwater?1:0;if(this.underwaterMix!==t)this.underwaterMix=ue.lerp(this.underwaterMix,t,1-Math.exp(-9*e)),Math.abs(this.underwaterMix-t)<.002&&(this.underwaterMix=t);else if(t===0&&!this.wasUnderwater)return;const n=this.underwaterMix;this.wasUnderwater=n>0;const s=this.studio?Tl:El,r=this.studio?1.9:2.15,o=this.studio?.95:1,a=this.studio?Rl:Al,l=this.studio?0:this.preset.fogDensity;this.scene.background.copy(s).lerp(Eg,n),this.fog.color.copy(s).lerp(Tg,n),this.fog.density=ue.lerp(l,Rg,n),this.sun.intensity=ue.lerp(r,1.15,n),this.hemisphere.intensity=ue.lerp(o,1.35,n),this.hemisphere.color.copy(a).lerp(Ag,n);const c=!this.studio||n>.001;this.scene.fog=c?this.fog:null}render(e){this.fpsAccumulator+=e,this.fpsFrames+=1,this.fpsAccumulator>=.5&&(this.fps=this.fpsFrames/this.fpsAccumulator,this.fpsAccumulator=0,this.fpsFrames=0),this.applyUnderwater(e),this.sky.visible=this.underwaterMix<.5&&!this.studio,this.sky.visible&&(this.sky.position.copy(this.camera.position),this.sky.update(e,this.camera.position)),this.composer?this.composer.render(e):this.renderer.render(this.scene,this.camera)}get currentQuality(){return this.quality}get currentPreset(){return this.preset}dispose(){window.removeEventListener("resize",this.resize),this.composer?.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}}const Pg=-.62,Lg=1.1,Dg=1.1;class Ig{constructor(e,t){B(this,"yaw",Math.PI);B(this,"pitch",.33);B(this,"distance",8.6);B(this,"currentDistance",8.6);B(this,"focus",new P);B(this,"smoothedFocus",new P);B(this,"desiredPosition",new P);B(this,"toCamera",new P);B(this,"manualTimer",0);B(this,"initialised",!1);B(this,"ceilingY",null);this.camera=e,this.world=t}get movementYaw(){return this.yaw}get yawDegrees(){return(ue.radToDeg(this.yaw)%360+360)%360}applyLook(e,t){e===0&&t===0||(this.yaw-=e,this.pitch=ue.clamp(this.pitch+t,Pg,Lg),this.manualTimer=Dg)}update(e,t){if(this.manualTimer>0&&(this.manualTimer-=e),t.getFocusPoint(this.focus),t.speed>1&&(this.focus.x+=t.velocity.x*.09,this.focus.z+=t.velocity.z*.09),!this.initialised)this.smoothedFocus.copy(this.focus),this.yaw=t.facing+Math.PI,this.initialised=!0;else{const o=1-Math.exp(-11*e),a=1-Math.exp(-(t.state==="air"?4.5:9)*e);this.smoothedFocus.x=ue.lerp(this.smoothedFocus.x,this.focus.x,o),this.smoothedFocus.z=ue.lerp(this.smoothedFocus.z,this.focus.z,o),this.smoothedFocus.y=ue.lerp(this.smoothedFocus.y,this.focus.y,a)}this.autoFollow(e,t),t.isSubmerged&&(this.pitch=ue.lerp(this.pitch,.06,1-Math.exp(-2.6*e)));const n=ue.clamp(t.speed/9,0,1);this.distance=8.2+n*1.8+(t.state==="swim"?1:0);const s=Math.cos(this.pitch);this.toCamera.set(Math.sin(this.yaw)*s,Math.sin(this.pitch),Math.cos(this.yaw)*s);const r=this.distanceToObstruction(this.distance);this.currentDistance=r<this.currentDistance?r:ue.lerp(this.currentDistance,r,1-Math.exp(-3.2*e)),this.desiredPosition.copy(this.smoothedFocus).addScaledVector(this.toCamera,Math.max(1.6,this.currentDistance)),this.ceilingY!==null&&this.desiredPosition.y>this.ceilingY&&(this.desiredPosition.y=this.ceilingY),this.camera.position.copy(this.desiredPosition),this.camera.lookAt(this.smoothedFocus)}autoFollow(e,t){if(this.manualTimer>0||t.speed<2.2)return;const n=this.smoothedFocus.x-this.camera.position.x,s=this.smoothedFocus.z-this.camera.position.z,r=Math.hypot(n,s);if(r>.001&&(t.velocity.x*n+t.velocity.z*s)/r<t.speed*.35)return;let a=t.facing+Math.PI-this.yaw;for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;const l=ue.clamp((t.speed-2.2)/6,0,1);this.yaw+=a*(1-Math.exp(-1.9*l*e))}distanceToObstruction(e){const n=this.world.raycast(this.smoothedFocus,this.toCamera,e+.42);return Math.max(1.6,Math.min(e,n-.42))}reset(e){this.initialised=!1,this.manualTimer=0,this.pitch=.33,this.update(1/60,e)}}const Vr=.22,Cl=180,Ug=.5;class Ng{constructor(){B(this,"move",new Ce);B(this,"look",new Ce);B(this,"gamepadConnected",!1);B(this,"lastKey","—");B(this,"lastKeyRecognised",!1);B(this,"usingGamepad",!1);B(this,"keys",new Set);B(this,"held",new Set);B(this,"pendingPresses",new Set);B(this,"pendingReleases",new Set);B(this,"pressedThisFrame",new Set);B(this,"releasedThisFrame",new Set);B(this,"mouseDelta",new Ce);B(this,"pointerLocked",!1);B(this,"pointerLockWanted",!1);B(this,"discardNextMouseMove",!1);B(this,"previousButtons",[]);B(this,"element",null);B(this,"disposers",[])}attach(e){this.element=e;const t=h=>{if(h.repeat)return;this.keys.add(h.code),this.lastKey=h.code,this.lastKeyRecognised=Ll.has(h.code)||Gr[h.code]!==void 0||h.code==="ShiftLeft"||h.code==="ShiftRight",this.usingGamepad=!1;const d=Gr[h.code];d&&(this.press(d),d!=="pause"&&h.preventDefault()),Ll.has(h.code)&&h.preventDefault()},n=h=>{this.keys.delete(h.code);const d=Gr[h.code];d&&this.release(d)},s=()=>this.clear(),r=h=>{if(this.pointerLocked){if(this.discardNextMouseMove){this.discardNextMouseMove=!1;return}this.mouseDelta.x+=Pl(h.movementX),this.mouseDelta.y+=Pl(h.movementY),this.usingGamepad=!1}},o=()=>{const h=document.pointerLockElement===this.element;h&&!this.pointerLocked&&(this.discardNextMouseMove=!0,this.mouseDelta.set(0,0)),this.pointerLocked=h},a=()=>{this.pointerLockWanted&&!this.pointerLocked&&this.requestPointerLock()},l=()=>{this.gamepadConnected=!0},c=()=>{this.gamepadConnected=navigator.getGamepads().some(h=>h!==null)};window.addEventListener("keydown",t),window.addEventListener("keyup",n),window.addEventListener("blur",s),document.addEventListener("mousemove",r),document.addEventListener("pointerlockchange",o),e.addEventListener("mousedown",a),window.addEventListener("gamepadconnected",l),window.addEventListener("gamepaddisconnected",c),this.disposers=[()=>window.removeEventListener("keydown",t),()=>window.removeEventListener("keyup",n),()=>window.removeEventListener("blur",s),()=>document.removeEventListener("mousemove",r),()=>document.removeEventListener("pointerlockchange",o),()=>e.removeEventListener("mousedown",a),()=>window.removeEventListener("gamepadconnected",l),()=>window.removeEventListener("gamepaddisconnected",c)]}dispose(){for(const e of this.disposers)e();this.disposers=[],this.clear()}update(e,t){this.pressedThisFrame.clear(),this.releasedThisFrame.clear();for(const o of this.pendingPresses)this.pressedThisFrame.add(o);for(const o of this.pendingReleases)this.releasedThisFrame.add(o);this.pendingPresses.clear(),this.pendingReleases.clear(),this.move.set(0,0),this.look.set(0,0);let n=0,s=0;(this.keys.has("KeyE")||this.keys.has("ArrowUp"))&&(s-=1),(this.keys.has("KeyD")||this.keys.has("ArrowDown"))&&(s+=1),(this.keys.has("KeyS")||this.keys.has("ArrowLeft"))&&(n-=1),(this.keys.has("KeyF")||this.keys.has("ArrowRight"))&&(n+=1),(n!==0||s!==0)&&(this.move.set(n,s).normalize(),(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"))&&this.move.multiplyScalar(.45)),this.look.x+=this.mouseDelta.x*.0022*e,this.look.y+=this.mouseDelta.y*.0022*e*(t?-1:1),this.mouseDelta.set(0,0);const r=.035*e;this.keys.has("KeyJ")&&(this.look.x-=r),this.keys.has("KeyL")&&(this.look.x+=r),this.keys.has("KeyI")&&(this.look.y-=r*(t?-1:1)),this.keys.has("KeyK")&&(this.look.y+=r*(t?-1:1)),this.pollGamepad(e,t)}pollGamepad(e,t){const n=navigator.getGamepads?navigator.getGamepads():[];let s=null;for(const h of n)if(h&&h.connected){s=h;break}if(!s){this.previousButtons=[];return}this.gamepadConnected=!0;const r=Hs(s.axes[0]??0),o=Hs(s.axes[1]??0);if(r!==0||o!==0){const h=Math.min(1,Math.hypot(r,o)),d=Math.hypot(r,o)||1;this.move.set(r/d*h,o/d*h),this.usingGamepad=!0}const a=Hs(s.axes[2]??0),l=Hs(s.axes[3]??0);(a!==0||l!==0)&&(this.look.x+=a*.045*e,this.look.y+=l*.035*e*(t?-1:1),this.usingGamepad=!0);const c=s.buttons.map(h=>h.pressed||h.value>Ug);for(const[h,d]of Object.entries(Fg)){const f=Number(h),p=c[f]===!0,g=this.previousButtons[f]===!0;p&&!g?(this.held.has(d)||this.pressedThisFrame.add(d),this.held.add(d),this.usingGamepad=!0):!p&&g&&this.held.delete(d)&&this.releasedThisFrame.add(d)}this.previousButtons=c}press(e){this.held.has(e)||this.pendingPresses.add(e),this.held.add(e)}release(e){this.held.delete(e)&&this.pendingReleases.add(e)}isDown(e){return this.held.has(e)}wasPressed(e){return this.pressedThisFrame.has(e)}wasReleased(e){return this.releasedThisFrame.has(e)}get moveStrength(){return Math.min(1,this.move.length())}setPointerLockWanted(e){this.pointerLockWanted=e,!e&&this.pointerLocked&&document.exitPointerLock()}togglePointerLock(){this.pointerLocked?(this.pointerLockWanted=!1,document.exitPointerLock()):(this.pointerLockWanted=!0,this.requestPointerLock())}requestPointerLock(){if(!this.element||this.pointerLocked)return;const e=this.element.requestPointerLock();e&&typeof e.catch=="function"&&e.catch(()=>{})}get isPointerLocked(){return this.pointerLocked}clear(){this.keys.clear(),this.held.clear(),this.pendingPresses.clear(),this.pendingReleases.clear(),this.pressedThisFrame.clear(),this.releasedThisFrame.clear(),this.mouseDelta.set(0,0),this.move.set(0,0),this.look.set(0,0),this.discardNextMouseMove=!0}}function Pl(i){return Number.isFinite(i)?Math.max(-Cl,Math.min(Cl,i)):0}function Hs(i){return Math.abs(i)<Vr?0:Math.sign(i)*((Math.abs(i)-Vr)/(1-Vr))}const Gr={Space:"jump",KeyR:"grab",KeyC:"crouch",KeyQ:"dive",ControlLeft:"dive",KeyL:"togglePointerLock",Escape:"pause",KeyW:"interact",KeyA:"sideFlip",KeyG:"climbDown",KeyE:"forward",ArrowUp:"forward"},Fg={0:"jump",2:"grab",3:"sideFlip",1:"dive",6:"crouch",9:"pause"},Ll=new Set(["KeyE","KeyS","KeyD","KeyF","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]);class Pc{constructor(e=new P(0,0,0),t=new P(0,1,0),n=1){this.start=e,this.end=t,this.radius=n}clone(){return new this.constructor().copy(this)}set(e,t,n){return this.start.copy(e),this.end.copy(t),this.radius=n,this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this.radius=e.radius,this}getCenter(e){return e.copy(this.end).add(this.start).multiplyScalar(.5)}translate(e){return this.start.add(e),this.end.add(e),this}intersectsBox(e){return Wr(this.start.x,this.start.y,this.end.x,this.end.y,e.min.x,e.max.x,e.min.y,e.max.y,this.radius)&&Wr(this.start.x,this.start.z,this.end.x,this.end.z,e.min.x,e.max.x,e.min.z,e.max.z,this.radius)&&Wr(this.start.y,this.start.z,this.end.y,this.end.z,e.min.y,e.max.y,e.min.z,e.max.z,this.radius)}}function Wr(i,e,t,n,s,r,o,a,l){return(s-i<l||s-t<l)&&(i-r<l||t-r<l)&&(o-e<l||o-n<l)&&(e-a<l||n-a<l)}const ji=new P,Yi=new P,Vs=new P,qi=new P,hn=new zn,Xr=new bc,Og=new bc,Gs=new ds,Ki=new Pc,kg=new P,Bg=new P,zg=new P,Hg=1e-10;function Vg(i,e,t=null,n=null){const s=kg.copy(i.end).sub(i.start),r=Bg.copy(e.end).sub(e.start),o=zg.copy(e.start).sub(i.start),a=s.dot(r),l=s.dot(s),c=r.dot(r),h=r.dot(o),d=s.dot(o);let f,p;const g=l*c-a*a;if(Math.abs(g)<Hg){const S=-h/c,m=(a-h)/c;Math.abs(S-.5)<Math.abs(m-.5)?(f=0,p=S):(f=1,p=m)}else f=(h*a+d*c)/g,p=(f*a-h)/c;p=Math.max(0,Math.min(1,p)),f=Math.max(0,Math.min(1,f)),t&&t.copy(s).multiplyScalar(f).add(i.start),n&&n.copy(r).multiplyScalar(p).add(e.start)}class ca{constructor(e){this.box=e,this.bounds=new Ht,this.layers=new ta,this.trianglesPerLeaf=8,this.maxLevel=16,this.subTrees=[],this.triangles=[]}addTriangle(e){return this.bounds.min.x=Math.min(this.bounds.min.x,e.a.x,e.b.x,e.c.x),this.bounds.min.y=Math.min(this.bounds.min.y,e.a.y,e.b.y,e.c.y),this.bounds.min.z=Math.min(this.bounds.min.z,e.a.z,e.b.z,e.c.z),this.bounds.max.x=Math.max(this.bounds.max.x,e.a.x,e.b.x,e.c.x),this.bounds.max.y=Math.max(this.bounds.max.y,e.a.y,e.b.y,e.c.y),this.bounds.max.z=Math.max(this.bounds.max.z,e.a.z,e.b.z,e.c.z),this.triangles.push(e),this}calcBox(){return this.box=this.bounds.clone(),this.box.min.x-=.01,this.box.min.y-=.01,this.box.min.z-=.01,this}split(e){if(!this.box)return;const t=[],n=Yi.copy(this.box.max).sub(this.box.min).multiplyScalar(.5);for(let r=0;r<2;r++)for(let o=0;o<2;o++)for(let a=0;a<2;a++){const l=new Ht,c=ji.set(r,o,a);l.min.copy(this.box.min).add(c.multiply(n)),l.max.copy(l.min).add(n),t.push(new ca(l))}let s;for(;s=this.triangles.pop();)for(let r=0;r<t.length;r++)t[r].box.intersectsTriangle(s)&&t[r].triangles.push(s);for(let r=0;r<t.length;r++){const o=t[r].triangles.length;o>this.trianglesPerLeaf&&e<this.maxLevel&&t[r].split(e+1),o!==0&&this.subTrees.push(t[r])}return this}build(){return this.calcBox(),this.split(0),this}getRayTriangles(e,t){for(let n=0;n<this.subTrees.length;n++){const s=this.subTrees[n];if(e.intersectsBox(s.box))if(s.triangles.length>0)for(let r=0;r<s.triangles.length;r++)t.indexOf(s.triangles[r])===-1&&t.push(s.triangles[r]);else s.getRayTriangles(e,t)}}triangleCapsuleIntersect(e,t){t.getPlane(hn);const n=hn.distanceToPoint(e.start)-e.radius,s=hn.distanceToPoint(e.end)-e.radius;if(n>0&&s>0||n<-e.radius&&s<-e.radius)return!1;const r=Math.abs(n/(Math.abs(n)+Math.abs(s))),o=ji.copy(e.start).lerp(e.end,r);if(t.containsPoint(o))return{normal:hn.normal.clone(),point:o.clone(),depth:Math.abs(Math.min(n,s))};const a=e.radius*e.radius,l=Xr.set(e.start,e.end),c=[[t.a,t.b],[t.b,t.c],[t.c,t.a]];for(let h=0;h<c.length;h++){const d=Og.set(c[h][0],c[h][1]);if(Vg(l,d,Vs,qi),Vs.distanceToSquared(qi)<a)return{normal:Vs.clone().sub(qi).normalize(),point:qi.clone(),depth:e.radius-Vs.distanceTo(qi)}}return!1}triangleSphereIntersect(e,t){if(t.getPlane(hn),!e.intersectsPlane(hn))return!1;const n=Math.abs(hn.distanceToSphere(e)),s=e.radius*e.radius-n*n,r=hn.projectPoint(e.center,ji);if(t.containsPoint(e.center))return{normal:hn.normal.clone(),point:r.clone(),depth:Math.abs(hn.distanceToSphere(e))};const o=[[t.a,t.b],[t.b,t.c],[t.c,t.a]];for(let a=0;a<o.length;a++){Xr.set(o[a][0],o[a][1]),Xr.closestPointToPoint(r,!0,Yi);const l=Yi.distanceToSquared(e.center);if(l<s)return{normal:e.center.clone().sub(Yi).normalize(),point:Yi.clone(),depth:e.radius-Math.sqrt(l)}}return!1}getSphereTriangles(e,t){for(let n=0;n<this.subTrees.length;n++){const s=this.subTrees[n];if(e.intersectsBox(s.box))if(s.triangles.length>0)for(let r=0;r<s.triangles.length;r++)t.indexOf(s.triangles[r])===-1&&t.push(s.triangles[r]);else s.getSphereTriangles(e,t)}}getCapsuleTriangles(e,t){for(let n=0;n<this.subTrees.length;n++){const s=this.subTrees[n];if(e.intersectsBox(s.box))if(s.triangles.length>0)for(let r=0;r<s.triangles.length;r++)t.indexOf(s.triangles[r])===-1&&t.push(s.triangles[r]);else s.getCapsuleTriangles(e,t)}}sphereIntersect(e){Gs.copy(e);const t=[];let n,s=!1;this.getSphereTriangles(e,t);for(let r=0;r<t.length;r++)(n=this.triangleSphereIntersect(Gs,t[r]))&&(s=!0,Gs.center.add(n.normal.multiplyScalar(n.depth)));if(s){const r=Gs.center.clone().sub(e.center),o=r.length();return{normal:r.normalize(),depth:o}}return!1}capsuleIntersect(e){Ki.copy(e);const t=[];let n,s=!1;this.getCapsuleTriangles(Ki,t);for(let r=0;r<t.length;r++)(n=this.triangleCapsuleIntersect(Ki,t[r]))&&(s=!0,Ki.translate(n.normal.multiplyScalar(n.depth)));if(s){const r=Ki.getCenter(new P).sub(e.getCenter(ji)),o=r.length();return{normal:r.normalize(),depth:o}}return!1}rayIntersect(e){const t=[];let n,s,r=1e100;this.getRayTriangles(e,t);for(let o=0;o<t.length;o++){const a=e.intersectTriangle(t[o].a,t[o].b,t[o].c,!0,ji);if(a){const l=a.sub(e.origin).length();r>l&&(s=a.clone().add(e.origin),r=l,n=t[o])}}return r<1e100?{distance:r,triangle:n,position:s}:!1}fromGraphNode(e){return e.updateWorldMatrix(!0,!0),e.traverse(t=>{if(t.isMesh===!0&&this.layers.test(t.layers)){let n,s=!1;t.geometry.index!==null?(s=!0,n=t.geometry.toNonIndexed()):n=t.geometry;const r=n.getAttribute("position");for(let o=0;o<r.count;o+=3){const a=new P().fromBufferAttribute(r,o),l=new P().fromBufferAttribute(r,o+1),c=new P().fromBufferAttribute(r,o+2);a.applyMatrix4(t.matrixWorld),l.applyMatrix4(t.matrixWorld),c.applyMatrix4(t.matrixWorld),this.addTriangle(new Qt(a,l,c))}s&&n.dispose()}}),this.build(),this}clear(){return this.box=null,this.bounds.makeEmpty(),this.subTrees.length=0,this.triangles.length=0,this}}class Gg{constructor(){B(this,"octree",new ca);B(this,"waters",[]);B(this,"ladders",[]);B(this,"scratchRay",new ea);B(this,"scratchVector",new P)}addSolid(e){this.octree.fromGraphNode(e)}addWater(e,t,n){this.waters.push({bounds:e,surfaceY:t,test:n})}capsuleIntersect(e){const t=this.octree.capsuleIntersect(e);return t?{normal:t.normal,depth:t.depth}:null}raycast(e,t,n){this.scratchRay.set(e,t);const s=this.octree.rayIntersect(this.scratchRay);return!s||s.distance>n?n:s.distance}addLadder(e,t,n,s){this.ladders.push({bounds:e,facing:t,topY:n,anchor:s})}ladderAt(e,t=0){for(const n of this.ladders)if(e.x>=n.bounds.min.x-t&&e.x<=n.bounds.max.x+t&&e.z>=n.bounds.min.z-t&&e.z<=n.bounds.max.z+t&&e.y>=n.bounds.min.y-t&&e.y<=n.bounds.max.y)return n;return null}waterAt(e){for(const t of this.waters)if(e.x>=t.bounds.min.x&&e.x<=t.bounds.max.x&&e.z>=t.bounds.min.z&&e.z<=t.bounds.max.z&&e.y>=t.bounds.min.y&&e.y<=t.surfaceY&&(!t.test||t.test(e.x,e.z)))return t;return null}groundProbe(e,t){this.scratchVector.set(0,-1,0),this.scratchRay.set(e,this.scratchVector);const n=this.octree.rayIntersect(this.scratchRay);if(!n||n.distance>t)return null;const s=n.triangle.getNormal(new P);return s.y<0&&s.negate(),{y:e.y-n.distance,normal:s}}groundHeightBelow(e,t=200){this.scratchVector.set(0,-1,0),this.scratchRay.set(e,this.scratchVector);const n=this.octree.rayIntersect(this.scratchRay);return!n||n.distance>t?-1/0:e.y-n.distance}reset(){this.waters.length=0}}const O={runSpeed:8.6,walkSpeed:3.1,acceleration:32,deceleration:26,skidDeceleration:46,skidDotThreshold:-.55,skidMinSpeed:5.2,turnRateSlow:13,turnRateFast:5.2,gravity:27,fallGravityMultiplier:1.42,jumpVelocity:9.6,doubleJumpVelocity:11.5,tripleJumpVelocity:13.5,jumpComboWindow:.26,jumpComboMinSpeed:2.6,tripleJumpFlipDelay:.13,tripleJumpFlipDelayShare:.3,tripleJumpFlipMinAirtime:.45,tripleJumpFlipDelayMin:.035,tripleJumpLandMargin:.07,jumpCutMultiplier:.42,airAcceleration:14,airDeceleration:2.2,airTurnRate:6,coyoteTime:.11,jumpBufferTime:.14,crouchDeceleration:11,crouchSpeed:1.6,crouchTurnRate:3.4,longJumpMinSpeed:4.2,longJumpSpeed:17.5,longJumpVelocity:8.6,longJumpAirControl:.25,backflipMaxSpeed:3,backflipVelocity:13,backflipSpeed:5.4,wallKickWindow:.18,wallKickVelocity:11.2,wallKickSpeed:8.4,sideFlipApex:3,sideFlipLeastVelocity:4.5,sideFlipSpeed:5,sideFlipWindow:.3,airBoostVelocity:6.5,groundPoundHover:.22,groundPoundRecovery:.3,ladderSnagDistance:.85,ladderSpeed:2.8,ladderStandOff:.46,ladderHandHigh:.46,ladderHandLow:.1,ladderJumpOff:4.5,ladderCooldown:.6,ladderTopFeet:1.05,ladderTopSeconds:.6,ladderTopStand:.72,ladderMountSeconds:.55,ladderMountReach:1.7,ladderMountDrop:1.1,ledgeReach:.62,ledgeReachExtra:.45,ledgeGrabLow:.75,ledgeGrabHigh:1.95,ledgeGrabRise:3,ledgeWideDepth:1.15,ledgeStandNarrow:.5,ledgeStandWide:.95,ledgeVaultOver:1.15,ledgeHandForward:.36,ledgeHangLift:1.72,ledgeSettleDown:.8,ledgeSettleUp:.25,ledgeSwingSeconds:.52,ledgeMantleSeconds:.8,ledgeVaultSeconds:.5,ledgeCooldown:.25,ledgeShimmySpeed:1.3,ledgeShimmyProbe:.42,ledgeJumpOff:4.2,ledgeJumpUp:.72,waterExitSeconds:.75,waterExitStand:.9,waterExitReach:.95,waterExitLow:.35,waterExitHigh:2.05,brakeMinSpeed:5.4,brakeEndSpeed:1.2,brakeSlideShort:.762,brakeSlideLong:2.03,brakeMomentumBuild:2.83,brakeMomentumFade:1.2,brakeMomentumCurve:1.45,maxWalkableSlopeDegrees:52,groundSnapDistance:.42,stepHeight:.45,swimSpeed:3.4,swimAcceleration:9,swimDrag:2.6,buoyancy:9.5,strokeImpulse:4.6,strokeCooldown:.52,diveAcceleration:11,floatSubmersion:.62,splashSpeed:6,carrySpeedMultiplier:.82,carryReach:1.9,throwSpeed:11,throwLift:4.2,killPlaneY:-45},Ws=Math.cos(O.maxWalkableSlopeDegrees*Math.PI/180),Qn={shirt:"#d9353a",overalls:"#2f5fd0",skin:"#f3c29a",glove:"#fbfbf7",shoe:"#6a3b1c",buckle:"#f2c94c",clay:"#b9b2a6"};function Wg(i,e=.72,t=0){return new xt({color:new fe(i),roughness:e,metalness:t,flatShading:!1})}function Bt(i,e,t=[0,0,0]){const n=new We(i,e);return n.position.set(t[0],t[1],t[2]),n.castShadow=!0,n.receiveShadow=!1,n}function Ji(i,e,t){const n=[],s=t/2,r=5;for(let o=0;o<=r;o+=1){const a=Math.PI/2*(o/r);n.push(new Ce(Math.sin(a)*e,-s-Math.cos(a)*e))}n.push(new Ce(i,s));for(let o=1;o<=r;o+=1){const a=Math.PI/2*(o/r);n.push(new Ce(Math.cos(a)*i,s+Math.sin(a)*i))}return new fs(n,14)}const Lc=[[0,-.2],[.108,-.195],[.186,-.168],[.238,-.108],[.26,-.03],[.268,.056],[.264,.136],[.256,.192],[.272,.248],[.286,.3],[.29,.345],[.272,.388],[.206,.424],[.124,.448],[0,.46]],ts=.93;function Xg(){return new fs(Lc.map(([i,e])=>new Ce(i*ts,e)),20)}function jg(i){const e=[];for(const[n,s]of Lc){if(s>i)break;e.push(new Ce(n*ts*1.035,s))}const t=e[e.length-1];return e.push(new Ce(t.x*.97,i)),e.push(new Ce(0,i)),new fs(e,20)}const ei=1.82,ha=.92,On=.34,Rt={shoulderX:.282,shoulderY:.345,upper:.32,lower:.34},Yg=ha+Rt.shoulderY;function qg(i={}){const e=[],t=(T,C,U)=>{const w=Wg(T,C,U);return e.push(w),w},n=i.plain===!0,s=n?t(Qn.clay,.78):null,r=s??t(Qn.shirt,.78),o=s??t(Qn.overalls,.74),a=s??t(Qn.skin,.68),l=s??t(Qn.glove,.66),c=s??t(Qn.shoe,.7),h=s??t(Qn.buckle,.35,.55),d=new vt,f=new vt;f.position.y=ha,d.add(f);const p=new vt;if(f.add(p),p.add(Bt(Xg(),r)),!n){p.add(Bt(jg(.16),o));for(const T of[-.125,.125])p.add(Bt(new wn(.05,10,8),h,[T*ts,.21,.27*ts]))}p.add(Bt(Ji(.094,.118,.15),a,[0,.5,.004]));const g=new vt;if(g.position.set(0,.685,0),p.add(g),g.add(Bt(new wn(.22,20,18),a)),!n){g.add(Bt(new wn(.228,18,12,0,Math.PI*2,0,Math.PI*.52),r,[0,.07,0]));const T=Bt(new Tn(.14,.168,.04,14,1,!1,Math.PI*.75,Math.PI*1.5),r,[0,.068,.152]);T.rotation.x=-.16,g.add(T),g.add(Bt(new wn(.068,12,10),a,[0,-.045,.2]))}const S=T=>{const C=new vt;C.position.set(Rt.shoulderX*ts*T,Rt.shoulderY,0),p.add(C),C.add(Bt(Ji(.1,.11,.14),r,[0,-.16,0]));const U=new vt;U.position.y=-.32,C.add(U),U.add(Bt(Ji(.096,.104,.17),r,[0,-.17,0]));const w=Bt(new wn(.142,14,12),l,[0,-.34,0]);return w.scale.set(1.08,1,.82),U.add(w),{shoulder:C,elbow:U}},m=S(-1),u=S(1),E=T=>{const C=new vt;C.position.set(.158*T,-.02,0),p.add(C),C.add(Bt(Ji(.128,.148,.2),o,[0,-.2,0]));const U=new vt;U.position.y=-.42,C.add(U),U.add(Bt(Ji(.115,.128,.18),o,[0,-.17,0]));const w=new vt;w.position.y=-.38,U.add(w);const M=Bt(new wn(.172,14,12),c,[0,.014,.05]);return M.scale.set(.82,.58,1.44),w.add(M),{hip:C,knee:U,ankle:w}},y=E(-1),v=E(1),R=new yt;return R.position.set(0,.3,.68),p.add(R),d.traverse(T=>{T instanceof We&&(T.castShadow=!0,T.receiveShadow=!1)}),{root:d,body:f,torso:p,head:g,shoulderLeft:m.shoulder,shoulderRight:u.shoulder,elbowLeft:m.elbow,elbowRight:u.elbow,hipLeft:y.hip,hipRight:v.hip,kneeLeft:y.knee,kneeRight:v.knee,ankleLeft:y.ankle,ankleRight:v.ankle,carryAnchor:R,materials:e}}const _=Dc(),ht=Dc();let Dl=!1,jr=0,Il=0;function Dc(){return{bodyPitch:0,bodyRoll:0,bodyYaw:0,bodyHeight:0,bodySquash:1,headPitch:0,headYaw:0,shoulderLeftPitch:0,shoulderRightPitch:0,shoulderLeftRoll:0,shoulderRightRoll:0,elbowLeft:0,elbowRight:0,hipLeft:0,hipRight:0,kneeLeft:0,kneeRight:0,ankleLeft:0,ankleRight:0}}function Kg(i,e){Jg(e);const t=e.state==="ledge"?26:e.state==="air"?16:e.state==="climb"?15:13,n=1-Math.exp(-t*e.delta);if(!Dl)Object.assign(ht,_),Dl=!0;else for(const o of Object.keys(_))ht[o]=ue.lerp(ht[o],_[o],n);const s=e.flipAxis==="pitch"?e.flipAngle:0,r=e.flipAxis==="roll"?e.flipAngle:0;i.body.rotation.set(ht.bodyPitch+s,ht.bodyYaw,ht.bodyRoll+r),i.body.position.y=ha+ht.bodyHeight,i.body.scale.set(1/Math.sqrt(ht.bodySquash),ht.bodySquash,1/Math.sqrt(ht.bodySquash)),i.head.rotation.set(ht.headPitch,ht.headYaw,0),i.shoulderLeft.rotation.set(ht.shoulderLeftPitch,0,-ht.shoulderLeftRoll),i.shoulderRight.rotation.set(ht.shoulderRightPitch,0,ht.shoulderRightRoll),i.elbowLeft.rotation.x=ht.elbowLeft,i.elbowRight.rotation.x=ht.elbowRight,i.hipLeft.rotation.x=ht.hipLeft,i.hipRight.rotation.x=ht.hipRight,i.kneeLeft.rotation.x=ht.kneeLeft,i.kneeRight.rotation.x=ht.kneeRight,i.ankleLeft.rotation.x=ht.ankleLeft,i.ankleRight.rotation.x=ht.ankleRight}function Jg(i){switch($g(_),i.state){case"climb":i0(i);break;case"ledge":Qg(i);break;case"swim":r0(i);break;case"air":s0(i);break;default:Zg(i);break}i.carrying&&a0(),i.landing&&l0()}function $g(i){i.bodyPitch=0,i.bodyRoll=0,i.bodyYaw=0,i.bodyHeight=0,i.bodySquash=1,i.headPitch=0,i.headYaw=0,i.shoulderLeftPitch=0,i.shoulderRightPitch=0,i.shoulderLeftRoll=.17,i.shoulderRightRoll=.17,i.elbowLeft=0,i.elbowRight=0,i.hipLeft=0,i.hipRight=0,i.kneeLeft=0,i.kneeRight=0,i.ankleLeft=0,i.ankleRight=0}function Zg(i){const e=ue.clamp(i.speed/i.maxSpeed,0,1);if(i.poundPhase==="landed"){_.bodyPitch=.18,_.bodyHeight=-.3,_.bodySquash=.88,_.shoulderLeftPitch=-.9,_.shoulderRightPitch=-.9,_.shoulderLeftRoll=.7,_.shoulderRightRoll=.7,_.elbowLeft=-.5,_.elbowRight=-.5,_.hipLeft=-1.3,_.hipRight=-1.3,_.kneeLeft=2.1,_.kneeRight=2.1,_.ankleLeft=-.9,_.ankleRight=-.9,_.headPitch=-.2;return}if(i.crouching){_.bodyPitch=.3,_.bodyHeight=-.185,_.hipLeft=-1.15,_.hipRight=-1.15,_.kneeLeft=1.95,_.kneeRight=1.95,_.ankleLeft=-.95,_.ankleRight=-.95,_.shoulderLeftPitch=-.75,_.shoulderRightPitch=-.75,_.shoulderLeftRoll=.42,_.shoulderRightRoll=.42,_.elbowLeft=-.7,_.elbowRight=-.7,_.headPitch=-.26,_.bodySquash=.94;return}if(i.braking){const l=ue.lerp(.4,1,ue.clamp(i.brakeStrength,0,1));_.bodyPitch=-.34*l,_.bodyHeight=-.025*l,_.bodyRoll=.07*l,_.shoulderLeftPitch=-1.15*l,_.shoulderRightPitch=-.55*l,_.shoulderLeftRoll=ue.lerp(.17,.95,l),_.shoulderRightRoll=ue.lerp(.17,.8,l),_.elbowLeft=-.35*l,_.elbowRight=-.25*l,_.hipLeft=-.72*l,_.hipRight=.22*l,_.kneeLeft=.62*l,_.kneeRight=1.15*l,_.ankleLeft=0,_.ankleRight=-.35*l,_.headPitch=-.12*l;return}if(i.skidding){_.bodyPitch=-.3,_.bodyHeight=-.11,_.shoulderLeftPitch=-1.5,_.shoulderRightPitch=-1.2,_.shoulderLeftRoll=.85,_.shoulderRightRoll=.7,_.hipLeft=-.5,_.hipRight=.35,_.kneeLeft=.45,_.kneeRight=.2,_.headPitch=-.18;return}if(i.speed<.3){const l=Math.sin(i.time*1.7);_.bodyHeight=l*.012,_.bodySquash=1+l*.008,_.headYaw=Math.sin(i.time*.45)*.22,_.headPitch=Math.sin(i.time*.33)*.05,_.shoulderLeftPitch=.06,_.shoulderRightPitch=-.06,_.shoulderLeftRoll=.2,_.shoulderRightRoll=.2,_.elbowLeft=-.16,_.elbowRight=-.16;return}const t=2.6+e*5.4;jr=(jr+t*i.delta)%(Math.PI*2);const n=jr,s=Math.sin(n),r=Math.sin(n+Math.PI),o=ue.lerp(.42,1,e),a=ue.lerp(.3,.95,e);_.hipLeft=s*o,_.hipRight=r*o,_.kneeLeft=Math.max(0,s)*o*1.25,_.kneeRight=Math.max(0,r)*o*1.25,_.ankleLeft=s*.42+.08,_.ankleRight=r*.42+.08,_.shoulderLeftPitch=r*a,_.shoulderRightPitch=s*a,_.elbowLeft=-.22-Math.max(0,-r)*a*.6,_.elbowRight=-.22-Math.max(0,-s)*a*.6,_.shoulderLeftRoll=.18+e*.04-Math.max(0,-r)*.1,_.shoulderRightRoll=.18+e*.04-Math.max(0,-s)*.1,_.bodyPitch=e*.26,_.bodyHeight=Math.abs(Math.sin(n))*.05*e-.02*e,_.bodyRoll=Math.sin(n)*.055*e,_.bodyYaw=Math.sin(n)*.09*e,_.headYaw=-_.bodyYaw*.7,_.headPitch=-e*.12}function Qg(i){if(i.ledgeMove==="water-exit"){e0(i);return}if(i.ledgeMove==="ladder-top"){t0(i);return}if(i.ledgeMove==="ladder-mount"){n0(i);return}const e=i.ledgeWide,t=i.ledgeHanging?0:ue.clamp(i.ledgeProgress,0,1),n=t>=.45,s=n?(t-.45)/.55:t/.45,r=s*s*(3-2*s),o=(a,l,c)=>n?ue.lerp(l,c,r):ue.lerp(a,l,r);_.bodyPitch=o(.1,e?.34:.52,.05),_.bodyHeight=o(-.04,-.02,0),_.bodySquash=o(1.02,.97,1),_.headPitch=o(-.3,-.16,0),_.hipLeft=o(-.16,e?-1.4:-1.75,-.24),_.hipRight=o(-.16,e?-1.4:-.6,-.24),_.kneeLeft=o(.3,e?1.85:1.95,.34),_.kneeRight=o(.3,e?1.85:.9,.34),_.ankleLeft=o(.2,.24,0),_.ankleRight=o(.2,.24,0),_.bodyRoll=e?0:o(0,.18,0),da(i)}function e0(i){const e=ue.clamp(i.ledgeProgress,0,1),t=e>=.5,n=t?(e-.5)/.5:e/.5,s=n*n*(3-2*n),r=(o,a,l)=>t?ue.lerp(a,l,s):ue.lerp(o,a,s);_.bodyPitch=r(.26,.52,.06),_.bodyHeight=r(.04,-.02,0),_.bodySquash=r(1.01,.96,1),_.headPitch=r(-.38,-.22,0),_.hipLeft=r(.3,-1.5,-.22),_.hipRight=r(.22,-1.1,-.22),_.kneeLeft=r(.25,1.9,.3),_.kneeRight=r(.2,1.4,.3),_.ankleLeft=r(-.3,.2,0),_.ankleRight=r(-.3,.2,0),da(i)}function t0(i){const e=ue.clamp(i.ledgeProgress,0,1),t=e*e*(3-2*e);_.bodyPitch=ue.lerp(.22,.08,t),_.bodyHeight=ue.lerp(-.02,0,t),_.headPitch=ue.lerp(-.28,-.05,t),_.bodyRoll=Math.sin(e*Math.PI)*.1,_.hipLeft=ue.lerp(-1.5,-.24,t),_.hipRight=ue.lerp(-.35,-.24,t),_.kneeLeft=ue.lerp(1.7,.3,t),_.kneeRight=ue.lerp(.75,.3,t),_.ankleLeft=ue.lerp(.2,0,t),_.ankleRight=ue.lerp(.25,0,t),da(i)}function n0(i){const e=ue.clamp(i.ledgeProgress,0,1),t=Math.sin(ue.clamp(e*1.35,0,1)*Math.PI);_.bodyPitch=.16+t*.3,_.bodyHeight=-t*.16,_.headPitch=-.1-t*.2,_.hipLeft=-t*1,_.hipRight=-t*1.25,_.kneeLeft=t*1.5,_.kneeRight=t*1.85,_.ankleLeft=-t*.5,_.ankleRight=-t*.5;const n=sr(ue.lerp(-.35,O.ladderHandHigh,e),O.ladderStandOff);_.shoulderLeftPitch=n.shoulder,_.shoulderRightPitch=n.shoulder,_.elbowLeft=n.elbow,_.elbowRight=n.elbow,_.shoulderLeftRoll=.26,_.shoulderRightRoll=.26}function da(i){const e=Yg+_.bodyHeight,t=i.ledgeLift-e,n=O.ledgeHandForward,s=Math.hypot(t,n),r=Rt.upper+Rt.lower;if(s>r-.01){const a=ue.clamp((s-r)/.3,0,1);if(_.shoulderLeftPitch=ue.lerp(_.shoulderLeftPitch,-.3,a),_.shoulderRightPitch=ue.lerp(_.shoulderRightPitch,-.3,a),_.elbowLeft=ue.lerp(_.elbowLeft,-.28,a),_.elbowRight=ue.lerp(_.elbowRight,-.28,a),a>=1)return}const o=sr(t,n);_.shoulderLeftPitch=o.shoulder,_.shoulderRightPitch=o.shoulder,_.elbowLeft=o.elbow,_.elbowRight=o.elbow,_.shoulderLeftRoll=.14,_.shoulderRightRoll=.14}const Yr={shoulder:0,elbow:0};function sr(i,e){const t=Rt.upper+Rt.lower,n=ue.clamp(Math.hypot(i,e),.1,t-.012),s=Math.atan2(-e,-i),r=Math.acos(ue.clamp((Rt.upper*Rt.upper+n*n-Rt.lower*Rt.lower)/(2*Rt.upper*n),-1,1)),o=Math.acos(ue.clamp((Rt.upper*Rt.upper+Rt.lower*Rt.lower-n*n)/(2*Rt.upper*Rt.lower),-1,1));return Yr.shoulder=s+r,Yr.elbow=-(Math.PI-o),Yr}function i0(i){Il+=i.climbSpeed*i.delta*2.6;const e=Math.sin(Il);_.bodyPitch=.12+Math.abs(e)*.06,_.headPitch=-.24,_.bodyRoll=e*.11,_.bodyYaw=e*.14,_.bodyHeight=-.04+Math.abs(e)*.05;const t=O.ladderStandOff,n=(e+1)*.5,s=sr(ue.lerp(O.ladderHandLow,O.ladderHandHigh,n),t);_.shoulderLeftPitch=s.shoulder,_.elbowLeft=s.elbow;const r=sr(ue.lerp(O.ladderHandHigh,O.ladderHandLow,n),t);_.shoulderRightPitch=r.shoulder,_.elbowRight=r.elbow,_.shoulderLeftRoll=.26,_.shoulderRightRoll=.26,_.hipLeft=-.34-Math.max(0,-e)*1.15,_.hipRight=-.34-Math.max(0,e)*1.15,_.kneeLeft=.34+Math.max(0,-e)*1.4,_.kneeRight=.34+Math.max(0,e)*1.4,_.ankleLeft=.3-Math.max(0,e)*.35,_.ankleRight=.3-Math.max(0,-e)*.35}function s0(i){const e=i.verticalSpeed>.5;if(i.againstWall&&!e){_.bodyPitch=-.1,_.shoulderLeftPitch=-.5,_.shoulderRightPitch=-.5,_.shoulderLeftRoll=1,_.shoulderRightRoll=1,_.elbowLeft=-.9,_.elbowRight=-.9,_.hipLeft=-.85,_.hipRight=-.2,_.kneeLeft=.9,_.kneeRight=.3,_.ankleLeft=.1,_.ankleRight=.1,_.headPitch=-.12;return}if(i.poundPhase==="hover"){_.bodyPitch=.5,_.shoulderLeftPitch=-2.3,_.shoulderRightPitch=-2.3,_.shoulderLeftRoll=.9,_.shoulderRightRoll=.9,_.elbowLeft=-1.1,_.elbowRight=-1.1,_.hipLeft=-1.7,_.hipRight=-1.7,_.kneeLeft=2,_.kneeRight=2,_.bodySquash=.94,_.headPitch=-.3;return}if(i.poundPhase==="slam"){_.bodyPitch=-.55,_.bodyHeight=-.05,_.shoulderLeftPitch=-1.5,_.shoulderRightPitch=-1.5,_.shoulderLeftRoll=.75,_.shoulderRightRoll=.75,_.elbowLeft=-.4,_.elbowRight=-.4,_.hipLeft=-1.95,_.hipRight=-1.95,_.kneeLeft=.5,_.kneeRight=.5,_.ankleLeft=-.3,_.ankleRight=-.3,_.bodySquash=1.06,_.headPitch=.15;return}if(i.jumpKind==="side"){_.shoulderLeftPitch=-1.3,_.shoulderRightPitch=-1.3,_.shoulderLeftRoll=.55,_.shoulderRightRoll=.55,_.elbowLeft=-1.5,_.elbowRight=-1.5,_.hipLeft=-1.25,_.hipRight=-1.25,_.kneeLeft=1.6,_.kneeRight=1.6,_.ankleLeft=.3,_.ankleRight=.3,_.bodySquash=1.03;return}if(i.jumpKind==="long"){_.bodyPitch=.92,_.bodyHeight=-.06,_.shoulderLeftPitch=-2.5,_.shoulderRightPitch=-2.5,_.shoulderLeftRoll=.16,_.shoulderRightRoll=.16,_.elbowLeft=-.12,_.elbowRight=-.12,_.hipLeft=.55,_.hipRight=.42,_.kneeLeft=.5,_.kneeRight=.68,_.ankleLeft=.42,_.ankleRight=.42,_.headPitch=-.55,_.bodySquash=1.03;return}if(i.jumpKind==="back"){_.shoulderLeftPitch=1.9,_.shoulderRightPitch=1.9,_.shoulderLeftRoll=.3,_.shoulderRightRoll=.3,_.elbowLeft=-.5,_.elbowRight=-.5,_.hipLeft=-1.5,_.hipRight=-1.5,_.kneeLeft=1.75,_.kneeRight=1.75,_.ankleLeft=.3,_.ankleRight=.3,_.headPitch=.2,_.bodySquash=1.05;return}if(i.jumpKind==="wall"&&e){_.bodyPitch=.16,_.shoulderLeftPitch=-1.9,_.shoulderRightPitch=-.9,_.shoulderLeftRoll=.6,_.shoulderRightRoll=.75,_.elbowLeft=-.5,_.elbowRight=-.3,_.hipLeft=-1.3,_.hipRight=.45,_.kneeLeft=1.35,_.kneeRight=.25,_.ankleLeft=.2,_.ankleRight=.4,_.headPitch=-.1;return}if(i.flipping){_.shoulderLeftPitch=-2.75,_.shoulderRightPitch=-2.75,_.shoulderLeftRoll=.15,_.shoulderRightRoll=.15,_.elbowLeft=-1.5,_.elbowRight=-1.5,_.hipLeft=-1.3,_.hipRight=-1.3,_.kneeLeft=1.9,_.kneeRight=1.9,_.ankleLeft=.5,_.ankleRight=.5,_.bodySquash=1.04;return}if(e){const t=i.jumpStage===2?1.25:1;_.shoulderLeftPitch=-2.5*t,_.shoulderRightPitch=-2.5*t,_.shoulderLeftRoll=.22,_.shoulderRightRoll=.22,_.elbowLeft=-.35*t,_.elbowRight=-.35*t,_.hipLeft=-.55*t,_.hipRight=-.3*t,_.kneeLeft=1.05*t,_.kneeRight=.6*t,_.ankleLeft=.5,_.ankleRight=.42,_.bodyPitch=.12,_.bodySquash=1.06,_.headPitch=-.1}else{const t=ue.clamp(-i.verticalSpeed/16,0,1);_.shoulderLeftPitch=-1.1-t*.5,_.shoulderRightPitch=-1.1-t*.5,_.shoulderLeftRoll=.75+t*.3,_.shoulderRightRoll=.75+t*.3,_.elbowLeft=-.5,_.elbowRight=-.5,_.hipLeft=-.26+t*.2,_.hipRight=.16,_.kneeLeft=.4,_.kneeRight=.18,_.ankleLeft=-.22,_.ankleRight=-.18,_.bodyPitch=-.06-t*.08,_.bodySquash=1+t*.04,_.headPitch=t*.12}}let dn=0,Xs=0;const ti={shoulder:0,elbow:0,roll:0};function Vo(i,e){const t=i-Math.floor(i);if(t<.5){const n=t/.5,s=n*n*(3-2*n);ti.shoulder=ue.lerp(-2.78,-.18,s),ti.elbow=-.95*Math.sin(n*Math.PI),ti.roll=.2+Math.sin(n*Math.PI)*.2*e}else{const n=(t-.5)/.5,s=n*n*(3-2*n);ti.shoulder=ue.lerp(-.18,-2.78,s),ti.elbow=-1.35*Math.sin(n*Math.PI),ti.roll=.26+Math.sin(n*Math.PI)*(.78*e)}return ti}function r0(i){const e=i.strokeProgress<1,t=ue.clamp(i.speed/1.5,0,1),n=i.submerged?1:Math.max(t,e?1:0);Xs=ue.lerp(Xs,n,1-Math.exp(-6*i.delta));const s=(i.submerged?.62:.72)+Xs*.5+(e?.85:0);if(dn+=i.delta*s,i.submerged){o0(i);return}const r=Xs,o=(E,y)=>ue.lerp(E,y,r),a=Math.sin(dn*Math.PI*2.6),l=-.52-a*.1,c=-1.2-Math.abs(a)*.16,h=.5+a*.07,d=Math.sin(dn*Math.PI*2),f=Vo(dn,1),p=f.shoulder,g=f.elbow,S=f.roll,m=Vo(dn+.5,1),u=Math.sin(dn*Math.PI*6);_.bodyPitch=o(.14,1.3),_.bodyHeight=o(.04,.3),_.bodyRoll=o(0,Math.sin(dn*Math.PI*2)*.22),_.headPitch=o(-.1,-.5),_.shoulderLeftPitch=o(l,p),_.shoulderRightPitch=o(l,m.shoulder),_.elbowLeft=o(c,g),_.elbowRight=o(c,m.elbow),_.shoulderLeftRoll=o(h,S),_.shoulderRightRoll=o(h,m.roll),_.hipLeft=o(-.95-d*.3,.12+u*.3),_.hipRight=o(-.95+d*.3,.12-u*.3),_.kneeLeft=o(1.1+Math.max(0,d)*.5,.2+Math.max(0,-u)*.3),_.kneeRight=o(1.1+Math.max(0,-d)*.5,.2+Math.max(0,u)*.3),_.ankleLeft=o(.2,-.32),_.ankleRight=o(.2,-.32)}function o0(i){const e=Vo(dn,.55),t=Math.sin(dn*Math.PI*2),n=Math.sin(dn*Math.PI*2-.7);_.bodyPitch=(i.diving?1.9:1.3)+t*.14,_.bodyHeight=.26,_.bodyRoll=0,_.shoulderLeftPitch=e.shoulder,_.shoulderRightPitch=e.shoulder,_.elbowLeft=e.elbow,_.elbowRight=e.elbow,_.shoulderLeftRoll=e.roll,_.shoulderRightRoll=e.roll,_.hipLeft=.1+n*.42,_.hipRight=.1+n*.42,_.kneeLeft=.25+Math.max(0,-n)*.85,_.kneeRight=.25+Math.max(0,-n)*.85,_.ankleLeft=-.3-n*.2,_.ankleRight=-.3-n*.2,_.headPitch=-.5-t*.1}function a0(){_.shoulderLeftPitch=-1.52,_.shoulderRightPitch=-1.52,_.shoulderLeftRoll=.3,_.shoulderRightRoll=.3,_.elbowLeft=-.35,_.elbowRight=-.35,_.bodyPitch=Math.max(_.bodyPitch,0)+.06}function l0(){_.bodySquash=.82,_.bodyHeight=-.12,_.hipLeft=-.6,_.hipRight=-.6,_.kneeLeft=1.05,_.kneeRight=1.05,_.ankleLeft=-.3,_.ankleRight=-.3,_.shoulderLeftPitch=-.45,_.shoulderRightPitch=-.45,_.shoulderLeftRoll=.55,_.shoulderRightRoll=.55}const Ul=new P(0,1,0);class c0{constructor(e,t,n={},s={}){B(this,"object");B(this,"rig");B(this,"velocity",new P);B(this,"state","air");B(this,"onGround",!1);B(this,"groundNormal",new P(0,1,0));B(this,"facing",0);B(this,"carried",null);B(this,"capsule");B(this,"world");B(this,"events");B(this,"coyoteTimer",0);B(this,"jumpBufferTimer",0);B(this,"jumpHeld",!1);B(this,"jumpStage",1);B(this,"comboWindow",0);B(this,"flipTimer",-1);B(this,"flipDelay",O.tripleJumpFlipDelay);B(this,"flipProgress",0);B(this,"landingTimer",0);B(this,"skidding",!1);B(this,"crouching",!1);B(this,"braking",!1);B(this,"momentum",0);B(this,"brakeRate",0);B(this,"brakeStrength",0);B(this,"jumpKind","normal");B(this,"flipDirection",1);B(this,"flipAxis","pitch");B(this,"airPresses",0);B(this,"sinceTakeOff",99);B(this,"tookOffRunning",!1);B(this,"takeOffY",0);B(this,"sinceSideFlipPress",99);B(this,"poundPhase","none");B(this,"poundTimer",0);B(this,"ladder",null);B(this,"ladderCooldown",0);B(this,"wallNormal",new P);B(this,"wallTimer",99);B(this,"againstWall",!1);B(this,"wallKicks",0);B(this,"ledgeTimer",-1);B(this,"ledgeSeconds",0);B(this,"ledgeWide",!1);B(this,"ledgeVault",!1);B(this,"climbMove","mantle");B(this,"ledgeFacingFrom",0);B(this,"pendingLadder",null);B(this,"ledgeHanging",!1);B(this,"ledgeLift",0);B(this,"ledgeCooldown",0);B(this,"ledgeFrom",new P);B(this,"ledgeTo",new P);B(this,"strokeTimer",0);B(this,"waterVolume",null);B(this,"submerged",!1);B(this,"atSurface",!1);B(this,"diving",!1);B(this,"footstepPhase",0);B(this,"animationTime",0);B(this,"lastSafePosition",new P);B(this,"safePositionTimer",0);B(this,"diagnostics",{collisions:0,lastNormalY:0,lastDepth:0});B(this,"ledgeDiagnostics",{reason:"",lip:0,surface:0});B(this,"scratchA",new P);B(this,"scratchB",new P);B(this,"scratchMove",new P);B(this,"scratchSide",new P);B(this,"scratchProbe",new P);B(this,"scratchLedge",new P);B(this,"carryables",[]);this.world=e,this.events=n,this.rig=qg(s),this.object=this.rig.root,this.object.position.copy(t),this.capsule=new Pc(new P(t.x,t.y+On,t.z),new P(t.x,t.y+ei-On,t.z),On),this.lastSafePosition.copy(t)}get position(){return this.object.position}getFocusPoint(e){return e.copy(this.object.position).addScaledVector(Ul,ei*.78)}get speed(){return Math.hypot(this.velocity.x,this.velocity.z)}get isSubmerged(){return this.state==="swim"&&!this.atSurface&&this.submerged}get stateName(){return this.state==="climb"?"climb":this.state==="air"&&this.poundPhase==="hover"?"pound-hover":this.state==="air"&&this.poundPhase==="slam"?"pound":this.poundPhase==="landed"?"pound-land":this.state==="ledge"?this.ledgeHanging?"hanging":this.climbMove==="water-exit"?"water-exit":this.climbMove==="ladder-top"?"ladder-top":this.climbMove==="ladder-mount"?"ladder-mount":this.ledgeWide?"mantle":this.ledgeVault?"ledge-vault":"ledge-swing":this.state==="swim"?this.atSurface?"swim-surface":"swim-under":this.state==="air"?this.againstWall&&this.velocity.y<0?"wall-slide":this.jumpKind==="long"?"long-jump":this.jumpKind==="back"?"backflip":this.jumpKind==="wall"&&this.velocity.y>0?"wall-kick":this.jumpKind==="side"?"side-flip":this.velocity.y<=.5?"fall":this.jumpStage===3?"triple":this.jumpStage===2?"double":"jump":this.crouching?"crouch":this.braking?"brake":this.skidding?"skid":this.speed>O.walkSpeed+.6?"run":this.speed>.25?"walk":"idle"}update(e,t,n){this.animationTime+=e,this.strokeTimer>0&&(this.strokeTimer-=e),this.landingTimer>0&&(this.landingTimer-=e),this.comboWindow>0&&(this.comboWindow-=e),this.flipTimer>=0&&(this.flipTimer+=e),this.wallTimer<10&&(this.wallTimer+=e),this.ledgeCooldown>0&&(this.ledgeCooldown-=e),this.ladderCooldown>0&&(this.ladderCooldown-=e),this.sinceTakeOff<10&&(this.sinceTakeOff+=e),this.sinceSideFlipPress<10&&(this.sinceSideFlipPress+=e),t.wasPressed("sideFlip")&&(this.sinceSideFlipPress=0),this.poundPhase==="landed"&&(this.poundTimer-=e,this.poundTimer<=0&&(this.poundPhase="none"));const s=this.scratchA.set(t.move.x,0,t.move.y),r=Math.min(1,s.length());if(r>.001?s.normalize().applyAxisAngle(Ul,n):s.set(0,0,0),this.updateJumpTimers(e,t),this.state==="climb"){this.updateClimb(e,t,s,r),this.updateCarry(e,t),this.updateRecovery(e),this.syncModel(e,r);return}if(this.state==="ledge"){this.updateLedge(e,t),this.updateCarry(e,t),this.updateRecovery(e),this.syncModel(e,r);return}switch(this.updateWaterState(),this.state){case"swim":this.updateSwim(e,t,s,r);break;case"ground":this.updateGround(e,t,s,r);break;default:this.updateAir(e,t,s,r);break}this.integrate(e),this.updateFlip(e),this.updateCarry(e,t),this.updateRecovery(e),this.syncModel(e,r)}updateGround(e,t,n,s){const r=this.scratchB.set(this.velocity.x,0,this.velocity.z),o=r.length();if(this.crouching=t.isDown("crouch")&&this.poundPhase==="none",t.wasPressed("climbDown")){const l=this.ladderToClimbDown();if(l){this.startLadderMount(l);return}}if(s>.001&&!this.crouching&&this.tryCatchLadder(n))return;if(this.poundPhase==="landed"){this.braking=!1,this.skidding=!1,this.velocity.x=0,this.velocity.z=0,this.velocity.y<0&&(this.velocity.y=-2);return}if(this.crouching){this.braking=!1,this.skidding=!1,s>.001&&this.turnToward(n,e,o,O.crouchTurnRate);const l=s>.001?O.crouchSpeed:0,c=o>l?Math.max(l,o-O.crouchDeceleration*e):Math.min(l,o+O.acceleration*.35*e);o>.001?r.multiplyScalar(c/o):c>0&&r.copy(this.forwardVector(this.scratchMove)).multiplyScalar(c)}else if(s>.001){this.braking=!1;const l=this.targetSpeedFor(s),c=o>.01?n.dot(this.scratchSide.copy(r).divideScalar(o)):1;if(this.skidding=o>O.skidMinSpeed&&c<O.skidDotThreshold,this.skidding){const h=Math.max(0,o-O.skidDeceleration*e);o>.001&&r.multiplyScalar(h/o)}else{this.turnToward(n,e,o);const h=this.forwardVector(this.scratchMove),d=r.dot(h),f=d<l?Math.min(l,d+O.acceleration*e):Math.max(l,d-O.deceleration*e),p=this.scratchSide.copy(r).addScaledVector(h,-d).multiplyScalar(Math.max(0,1-O.deceleration*1.8*e));r.copy(h).multiplyScalar(f).add(p)}}else{if(this.skidding=!1,!this.braking&&o>O.brakeMinSpeed){this.braking=!0;const h=Math.pow(this.momentum,O.brakeMomentumCurve),d=ue.lerp(O.brakeSlideShort,O.brakeSlideLong,h);this.brakeRate=o*o/(2*Math.max(.1,d)),this.brakeStrength=h}this.braking&&o<O.brakeEndSpeed&&(this.braking=!1);const l=(this.braking?this.brakeRate:O.deceleration)*e,c=Math.max(0,o-l);o>.001&&r.multiplyScalar(c/o)}if(this.velocity.x=r.x,this.velocity.z=r.z,Math.hypot(r.x,r.z)>O.brakeMinSpeed&&!this.braking?this.momentum=Math.min(1,this.momentum+e/O.brakeMomentumBuild):this.braking||(this.momentum=Math.max(0,this.momentum-e/O.brakeMomentumFade)),this.velocity.y<0&&(this.velocity.y=-2),this.jumpBufferTimer>0&&this.coyoteTimer>0){this.performJump();return}}updateAir(e,t,n,s){this.skidding=!1,this.braking=!1,this.crouching=!1;const r=this.velocity.y>0?O.gravity:O.gravity*O.fallGravityMultiplier;if(this.velocity.y-=r*e,this.velocity.y=Math.max(this.velocity.y,-34),this.jumpHeld&&!t.isDown("jump")&&this.velocity.y>0&&(this.velocity.y*=O.jumpCutMultiplier,this.jumpHeld=!1),this.poundPhase==="hover"||this.poundPhase==="slam"){this.updateGroundPound(e);return}if(this.canSideFlip()){this.performSideFlip();return}if(!this.tryCatchLadder()&&!this.tryCatchLedge()){if(this.againstWall&&this.velocity.y<-3.4&&(this.velocity.y=-3.4),this.jumpBufferTimer>0&&this.wallTimer<O.wallKickWindow){this.performWallKick();return}if(t.wasPressed("jump")){if(this.airPresses+=1,this.airPresses===1){this.velocity.y=Math.max(this.velocity.y,0)+O.airBoostVelocity,this.jumpHeld=!0,this.jumpBufferTimer=0;return}if(this.airPresses>=2){this.startGroundPound();return}}if(s>.001){const o=this.jumpKind==="long"?O.longJumpAirControl:1;this.turnToward(n,e,0,O.airTurnRate*o);const a=this.targetSpeedFor(s),l=this.scratchB.set(this.velocity.x,0,this.velocity.z);l.addScaledVector(n,O.airAcceleration*o*e),l.length()>Math.max(a,this.speed)&&l.setLength(Math.max(a,this.speed)),this.velocity.x=l.x,this.velocity.z=l.z}else{const o=Math.max(0,1-O.airDeceleration*e);this.velocity.x*=o,this.velocity.z*=o}this.jumpBufferTimer>0&&this.coyoteTimer>0&&this.performJump()}}tryCatchLedge(){const e=d=>(this.ledgeDiagnostics.reason=d,!1);if(this.ledgeCooldown>0)return e("cooldown");if(this.velocity.y>O.ledgeGrabRise)return e("rising");if(this.waterVolume)return e("in water");const t=this.againstWall?this.scratchLedge.copy(this.wallNormal).negate():this.forwardVector(this.scratchLedge);if(t.lengthSq()<1e-6)return e("no direction");const n=this.object.position.y,s=this.ledgeSurfaceAt(t,O.ledgeReach,n);if(s===null)return e("nothing in front");const r=s-n;if(this.ledgeDiagnostics.lip=Math.round(r*100)/100,this.ledgeDiagnostics.surface=Math.round(s*100)/100,r<O.ledgeGrabLow||r>O.ledgeGrabHigh)return e("out of reach");const o=this.ledgeSurfaceAt(t,O.ledgeReach+O.ledgeStandNarrow,n),a=this.ledgeSurfaceAt(t,O.ledgeReach+O.ledgeWideDepth,n),l=o!==null&&Math.abs(o-s)<.25;this.ledgeWide=l&&a!==null&&Math.abs(a-s)<.25,this.ledgeVault=!l,this.climbMove=this.ledgeWide?"mantle":this.ledgeVault?"vault":"swing";const c=this.ledgeWide?O.ledgeStandWide:this.ledgeVault?O.ledgeVaultOver:O.ledgeStandNarrow;this.ledgeFrom.copy(this.object.position),this.ledgeTo.set(this.object.position.x+t.x*(O.ledgeReach+c),s,this.object.position.z+t.z*(O.ledgeReach+c));const h=ue.clamp(s-O.ledgeHangLift,n-O.ledgeSettleDown,n+O.ledgeSettleUp);return this.ledgeFrom.y=h,this.object.position.y=h,this.syncCapsuleFromPosition(),this.facing=Math.atan2(t.x,t.z),this.ledgeFacingFrom=this.facing,this.velocity.set(0,0,0),this.ledgeTimer=0,this.ledgeLift=s-h,this.ledgeHanging=!0,this.ledgeSeconds=this.ledgeWide?O.ledgeMantleSeconds:this.ledgeVault?O.ledgeVaultSeconds:O.ledgeSwingSeconds,this.againstWall=!1,this.wallTimer=99,this.state="ledge",this.ledgeDiagnostics.reason="caught",!0}ledgeSurfaceAt(e,t,n){for(const s of[t,t+O.ledgeReachExtra]){const r=this.scratchB.set(this.object.position.x+e.x*s,n+O.ledgeGrabHigh+.4,this.object.position.z+e.z*s),o=this.world.groundProbe(r,O.ledgeGrabHigh+.4);if(o&&!(o.normal.y<Ws))return o.y}return null}updateLedgeHang(e,t){if(this.object.position.copy(this.ledgeFrom),this.object.rotation.y=this.facing,this.syncCapsuleFromPosition(),t.wasPressed("jump")){const s=this.forwardVector(this.scratchMove);this.ledgeHanging=!1,this.ledgeTimer=-1,this.ledgeCooldown=O.ledgeCooldown,this.ladderCooldown=O.ladderCooldown,this.velocity.set(-s.x*O.ledgeJumpOff,O.jumpVelocity*O.ledgeJumpUp,-s.z*O.ledgeJumpOff),this.jumpHeld=!0,this.jumpKind="normal",this.jumpBufferTimer=0,this.airPresses=0,this.state="air";return}if(t.wasPressed("forward")){this.ledgeHanging=!1,this.ledgeTimer=0,this.jumpBufferTimer=0;return}if(t.isDown("crouch")){this.ledgeHanging=!1,this.ledgeTimer=-1,this.ledgeCooldown=O.ledgeCooldown,this.velocity.set(0,0,0),this.state="air";return}const n=ue.clamp(t.move.x,-1,1);Math.abs(n)>.2&&this.shimmy(n,e)}shimmy(e,t){const n=this.forwardVector(this.scratchMove),s=this.scratchSide.set(-n.z,0,n.x),r=e*O.ledgeShimmySpeed*t,o=this.ledgeFrom.y+this.ledgeLift,a=Math.sign(r)*O.ledgeShimmyProbe,l=this.scratchProbe.copy(this.object.position);this.object.position.x+=s.x*a,this.object.position.z+=s.z*a;const c=this.ledgeSurfaceAt(n,O.ledgeReach,this.object.position.y);this.object.position.copy(l),this.syncCapsuleFromPosition(),!(c===null||Math.abs(c-o)>.2)&&(this.ledgeFrom.x+=s.x*r,this.ledgeFrom.z+=s.z*r,this.ledgeTo.x+=s.x*r,this.ledgeTo.z+=s.z*r,this.object.position.copy(this.ledgeFrom),this.syncCapsuleFromPosition())}updateLedge(e,t){if(this.ledgeHanging){this.updateLedgeHang(e,t);return}this.ledgeTimer+=e;const n=ue.clamp(this.ledgeTimer/this.ledgeSeconds,0,1),s=this.climbMove==="ladder-mount",r=s?.6:this.ledgeWide?.62:.55,o=s?.4:0,a=s?0:.34,l=s?.55:.66,c=ue.clamp((n-o)/r,0,1),h=ue.clamp((n-a)/l,0,1),d=c*c*(3-2*c),f=h*h*(3-2*h);if(this.object.position.set(ue.lerp(this.ledgeFrom.x,this.ledgeTo.x,f),ue.lerp(this.ledgeFrom.y,this.ledgeTo.y,d),ue.lerp(this.ledgeFrom.z,this.ledgeTo.z,f)),this.object.rotation.y=this.turnThrough(this.ledgeFacingFrom,this.facing,f),this.syncCapsuleFromPosition(),this.ledgeLift=this.ledgeTo.y-this.object.position.y,n>=1){if(this.ledgeTimer=-1,this.ledgeCooldown=O.ledgeCooldown,this.wallKicks=0,this.jumpKind="normal",this.velocity.set(0,0,0),this.climbMove==="ladder-mount"&&this.pendingLadder){this.ladder=this.pendingLadder,this.pendingLadder=null,this.facing=this.ladder.facing,this.state="climb",this.snapToLadder(this.ladder);return}this.pendingLadder=null,this.onGround=!0,this.coyoteTimer=O.coyoteTime,this.state="ground"}}turnThrough(e,t,n){let s=t-e;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;return e+s*n}startGroundPound(){this.velocity.set(0,0,0),this.poundPhase="hover",this.poundTimer=O.groundPoundHover,this.jumpKind="normal",this.jumpStage=1,this.flipTimer=-1,this.flipProgress=0,this.jumpBufferTimer=0}updateGroundPound(e){if(this.poundPhase==="hover"){this.poundTimer-=e,this.velocity.set(0,0,0),this.poundTimer<=0&&(this.poundPhase="slam");return}this.poundPhase==="slam"&&(this.velocity.x=0,this.velocity.z=0,this.velocity.y=-34)}tryCatchLadder(e){if(this.state==="ledge"||this.poundPhase!=="none"||this.ladderCooldown>0)return!1;const t=this.world.ladderAt(this.capsuleCentre(this.scratchProbe),O.ladderSnagDistance);if(!t||this.object.position.y>t.topY-.2)return!1;const n=this.scratchSide.set(Math.sin(t.facing),0,Math.cos(t.facing));return e&&e.dot(n)<.3||!e&&this.velocity.x*n.x+this.velocity.z*n.z<.5?!1:(this.ladder=t,this.facing=t.facing,this.velocity.set(0,0,0),this.state="climb",this.snapToLadder(t),!0)}snapToLadder(e){const t=this.forwardVector(this.scratchMove);this.object.position.x=e.anchor.x-t.x*O.ladderStandOff,this.object.position.z=e.anchor.z-t.z*O.ladderStandOff,this.object.rotation.y=this.facing,this.syncCapsuleFromPosition()}updateClimb(e,t,n,s){const r=this.ladder;if(!r){this.state="air";return}if(t.wasPressed("jump")){this.leaveLadder();const c=this.forwardVector(this.scratchMove);this.velocity.set(-c.x*O.ladderJumpOff,O.jumpVelocity*.75,-c.z*O.ladderJumpOff),this.jumpHeld=!0,this.jumpKind="normal";return}const o=ue.clamp(-t.move.y,-1,1);this.velocity.set(0,o*O.ladderSpeed,0);const a=r.topY-O.ladderTopFeet,l=this.object.position.y+this.velocity.y*e;this.object.position.y=ue.clamp(l,r.bounds.min.y-.2,a),this.snapToLadder(r),!(l>=a&&o>.2&&this.startLadderTop(r))&&this.object.position.y<=r.bounds.min.y-.19&&this.leaveLadder()}startLadderTop(e){const t=this.scratchMove.set(Math.sin(e.facing),0,Math.cos(e.facing)),n=this.object.position.y;let s=null,r=0;for(const o of[O.ladderStandOff+.35,O.ladderStandOff+.8,O.ladderStandOff+1.25]){const a=this.scratchProbe.set(this.object.position.x+t.x*o,e.topY+1.2,this.object.position.z+t.z*o),l=this.world.groundProbe(a,1.2+O.ladderTopFeet+.9);if(!(!l||l.normal.y<Ws)&&!(l.y<n-.25)){s=l.y,r=o;break}}return s===null?!1:(this.ladder=null,this.pendingLadder=null,this.climbMove="ladder-top",this.ledgeWide=!0,this.ledgeVault=!1,this.ledgeHanging=!1,this.ledgeFrom.copy(this.object.position),this.ledgeTo.set(this.object.position.x+t.x*(r+O.ladderTopStand),s,this.object.position.z+t.z*(r+O.ladderTopStand)),this.ledgeFacingFrom=this.facing,this.facing=e.facing,this.ledgeLift=s-n,this.ledgeSeconds=O.ladderTopSeconds,this.ledgeTimer=0,this.ledgeCooldown=0,this.ladderCooldown=O.ladderCooldown,this.velocity.set(0,0,0),this.state="ledge",!0)}ladderToClimbDown(){if(this.state!=="ground"||!this.onGround)return null;const e=this.object.position.y;for(const t of this.world.ladders)if(!(Math.abs(t.topY-e)>O.ladderMountDrop||Math.hypot(this.object.position.x-t.anchor.x,this.object.position.z-t.anchor.z)>O.ladderMountReach))return t;return null}startLadderMount(e){const t=this.scratchMove.set(Math.sin(e.facing),0,Math.cos(e.facing));this.ledgeFrom.copy(this.object.position),this.ledgeTo.set(e.anchor.x-t.x*O.ladderStandOff,e.topY-O.ladderTopFeet,e.anchor.z-t.z*O.ladderStandOff),this.climbMove="ladder-mount",this.ledgeWide=!1,this.ledgeVault=!1,this.ledgeHanging=!1,this.ledgeFacingFrom=this.facing,this.facing=e.facing,this.pendingLadder=e,this.ledgeSeconds=O.ladderMountSeconds,this.ledgeTimer=0,this.ledgeLift=e.topY-this.ledgeTo.y,this.ledgeCooldown=0,this.ladderCooldown=0,this.velocity.set(0,0,0),this.onGround=!1,this.crouching=!1,this.state="ledge"}leaveLadder(){this.ladder=null,this.ladderCooldown=O.ladderCooldown,this.state="air",this.velocity.set(0,0,0)}updateSwim(e,t,n,s){this.skidding=!1;const r=this.waterVolume;if(!r){this.state="air";return}const a=r.surfaceY-ei*O.floatSubmersion-this.object.position.y;this.atSurface=Math.abs(a)<.35,this.submerged=!0;const l=t.isDown("crouch")||t.isDown("dive");if(this.diving=l,l?this.velocity.y-=O.diveAcceleration*e:a>0?this.velocity.y+=Math.min(O.buoyancy,a*7)*e:this.velocity.y+=Math.max(-7.5,a*5)*e,t.wasPressed("jump")&&this.atSurface&&this.tryClimbOutOfWater())return;if(t.wasPressed("jump")&&this.strokeTimer<=0){this.strokeTimer=O.strokeCooldown;const d=this.forwardVector(this.scratchMove),f=(this.atSurface,.55);this.velocity.addScaledVector(d,O.strokeImpulse),this.velocity.y+=O.strokeImpulse*f}s>.001&&(this.turnToward(n,e,0,5.5),this.velocity.addScaledVector(n,O.swimAcceleration*s*e));const c=Math.max(0,1-O.swimDrag*e);this.velocity.multiplyScalar(c);const h=Math.hypot(this.velocity.x,this.velocity.z);if(h>O.swimSpeed){const d=O.swimSpeed/h;this.velocity.x*=d,this.velocity.z*=d}}tryClimbOutOfWater(){const e=this.forwardVector(this.scratchMove),t=this.object.position.y;let n=null,s=0;for(const r of[O.waterExitReach,O.waterExitReach+.5]){const o=this.scratchProbe.set(this.object.position.x+e.x*r,t+O.waterExitHigh+.4,this.object.position.z+e.z*r),a=this.world.groundProbe(o,O.waterExitHigh+.4);if(!a||a.normal.y<Ws)continue;const l=a.y-t;if(!(l<O.waterExitLow||l>O.waterExitHigh)){n=a.y,s=r;break}}return n===null?!1:(this.climbMove="water-exit",this.ledgeWide=!0,this.ledgeVault=!1,this.ledgeHanging=!1,this.pendingLadder=null,this.ledgeFrom.copy(this.object.position),this.ledgeTo.set(this.object.position.x+e.x*(s+O.waterExitStand),n,this.object.position.z+e.z*(s+O.waterExitStand)),this.ledgeFacingFrom=this.facing,this.ledgeLift=n-t,this.ledgeSeconds=O.waterExitSeconds,this.ledgeTimer=0,this.ledgeCooldown=0,this.velocity.set(0,0,0),this.submerged=!1,this.atSurface=!1,this.diving=!1,this.state="ledge",!0)}integrate(e){this.againstWall=!1;const t=this.velocity.length()*e,n=Math.min(6,Math.max(1,Math.ceil(t/(On*.75)))),s=e/n,r=this.onGround,o=this.velocity.y;this.diagnostics.collisions=0,this.onGround=!1;for(let a=0;a<n;a+=1)this.moveHorizontally(s,r),this.moveVertically(s);if(this.velocity.y<=.1){const a=r?O.groundSnapDistance:.04;this.settleOnGround(a)}this.onGround?(r||(this.poundPhase==="slam"?(this.poundPhase="landed",this.poundTimer=O.groundPoundRecovery,this.landingTimer=.17,this.events.onLand?.(this.object.position,1)):this.poundPhase!=="landed"&&(this.poundPhase="none"),this.flipTimer=-1,this.flipProgress=0,this.flipDirection=1,this.jumpKind="normal",this.wallKicks=0,this.againstWall=!1,this.wallTimer=99,this.comboWindow=this.jumpStage<3?O.jumpComboWindow:0,this.jumpStage>=3&&(this.jumpStage=1),o<-4&&(this.landingTimer=.17,this.events.onLand?.(this.object.position,Math.min(1,-o/22)))),this.coyoteTimer=O.coyoteTime,this.state==="air"&&(this.state="ground")):this.state==="ground"&&(this.state="air",this.airPresses=0),this.syncPositionFromCapsule()}moveHorizontally(e,t){const n=this.scratchMove.set(this.velocity.x*e,0,this.velocity.z*e);if(Math.hypot(n.x,n.z)<1e-6)return;const s=t?O.stepHeight:0;s>0&&this.capsule.translate(this.scratchSide.set(0,s,0)),this.capsule.translate(n),this.resolveWalls(),s>0&&this.capsule.translate(this.scratchSide.set(0,-s,0))}moveVertically(e){this.capsule.translate(this.scratchMove.set(0,this.velocity.y*e,0)),this.resolveVertical()}resolveWalls(){for(let e=0;e<4;e+=1){const t=this.world.capsuleIntersect(this.capsule);if(!t||Math.abs(t.normal.y)>.7)break;const n=this.scratchB.copy(t.normal).multiplyScalar(t.depth);if(n.y=0,n.lengthSq()<1e-10)break;this.diagnostics.collisions+=1,this.diagnostics.lastNormalY=t.normal.y,this.diagnostics.lastDepth=t.depth,this.capsule.translate(n),this.state==="air"&&(this.scratchA.set(t.normal.x,0,t.normal.z),this.scratchA.lengthSq()>1e-6&&(this.wallNormal.copy(this.scratchA).normalize(),this.wallTimer=0,this.againstWall=!0));const s=this.velocity.x*t.normal.x+this.velocity.z*t.normal.z;s<0&&(this.velocity.x-=t.normal.x*s,this.velocity.z-=t.normal.z*s)}}resolveVertical(){for(let e=0;e<4;e+=1){const t=this.world.capsuleIntersect(this.capsule);if(!t||Math.abs(t.normal.y)<.25)break;const n=t.normal.y*t.depth;if(Math.abs(n)<1e-6)break;this.diagnostics.collisions+=1,this.diagnostics.lastNormalY=t.normal.y,this.diagnostics.lastDepth=t.depth,this.capsule.translate(this.scratchB.set(0,n,0)),t.normal.y<-.5&&this.velocity.y>0&&(this.velocity.y=0)}}settleOnGround(e){const t=this.capsule.start.y-On,n=this.scratchSide.set(this.capsule.start.x,t+.25,this.capsule.start.z),s=this.world.groundProbe(n,.25+e);return!s||s.normal.y<Ws?!1:(this.capsule.translate(this.scratchMove.set(0,s.y-t,0)),this.onGround=!0,this.groundNormal.copy(s.normal),this.velocity.y<0&&(this.velocity.y=0),!0)}updateJumpTimers(e,t){this.coyoteTimer>0&&(this.coyoteTimer-=e),this.jumpBufferTimer>0&&(this.jumpBufferTimer-=e),t.wasPressed("jump")&&(this.jumpBufferTimer=O.jumpBufferTime)}performJump(){if(this.crouching){if(this.speed>=O.longJumpMinSpeed){this.performLongJump();return}if(this.speed<=O.backflipMaxSpeed){this.performBackflip();return}}this.jumpKind="normal";const e=this.comboWindow>0&&this.speed>=O.jumpComboMinSpeed;this.jumpStage=e?Math.min(3,this.jumpStage+1):1,this.velocity.y=this.jumpStage===3?O.tripleJumpVelocity:this.jumpStage===2?O.doubleJumpVelocity:O.jumpVelocity,this.flipTimer=this.jumpStage===3?0:-1,this.flipDelay=O.tripleJumpFlipDelay,this.flipProgress=0,this.flipDirection=1,this.flipAxis="pitch",this.takeOff()}performLongJump(){const e=this.forwardVector(this.scratchMove);this.velocity.x=e.x*O.longJumpSpeed,this.velocity.z=e.z*O.longJumpSpeed,this.velocity.y=O.longJumpVelocity,this.jumpKind="long",this.jumpStage=1,this.flipTimer=-1,this.flipProgress=0,this.flipDirection=1,this.flipAxis="pitch",this.takeOff()}canSideFlip(){return this.state!=="air"||this.jumpKind!=="normal"||this.poundPhase!=="none"||!this.tookOffRunning?!1:this.sinceTakeOff<=O.sideFlipWindow&&this.sinceSideFlipPress<=O.sideFlipWindow}performSideFlip(){const e=this.forwardVector(this.scratchMove);this.velocity.x=e.x*O.sideFlipSpeed,this.velocity.z=e.z*O.sideFlipSpeed;const t=this.takeOffY+O.sideFlipApex-this.object.position.y;this.velocity.y=Math.max(O.sideFlipLeastVelocity,Math.sqrt(Math.max(0,2*O.gravity*t))),this.jumpKind="side",this.jumpStage=1,this.flipTimer=0,this.flipDelay=O.tripleJumpFlipDelay,this.flipProgress=0,this.flipDirection=1,this.flipAxis="roll",this.jumpHeld=!0,this.sinceSideFlipPress=99,this.sinceTakeOff=99}performBackflip(){const e=this.forwardVector(this.scratchMove);this.velocity.x=-e.x*O.backflipSpeed,this.velocity.z=-e.z*O.backflipSpeed,this.velocity.y=O.backflipVelocity,this.jumpKind="back",this.jumpStage=1,this.flipTimer=0,this.flipDelay=O.tripleJumpFlipDelay,this.flipProgress=0,this.flipDirection=-1,this.flipAxis="pitch",this.takeOff()}performWallKick(){this.velocity.x=this.wallNormal.x*O.wallKickSpeed,this.velocity.z=this.wallNormal.z*O.wallKickSpeed,this.velocity.y=O.wallKickVelocity,this.facing=Math.atan2(this.wallNormal.x,this.wallNormal.z),this.wallKicks+=1,this.wallTimer=99,this.againstWall=!1,this.jumpKind="wall",this.jumpStage=1,this.flipTimer=-1,this.flipProgress=0,this.flipDirection=1,this.flipAxis="pitch",this.takeOff()}takeOff(){this.airPresses=0,this.sinceTakeOff=0,this.takeOffY=this.object.position.y,this.tookOffRunning=this.speed>O.walkSpeed+.6,this.poundPhase="none",this.comboWindow=0,this.jumpHeld=!0,this.jumpBufferTimer=0,this.coyoteTimer=0,this.onGround=!1,this.crouching=!1,this.braking=!1,this.state="air"}updateFlip(e){if(this.flipTimer<0)return;if(this.state!=="air"){this.flipTimer=-1,this.flipProgress=0;return}const t=this.predictTimeToLand(),n=this.flipTimer+t;if(this.flipDelay=ue.clamp((n-O.tripleJumpFlipMinAirtime)*O.tripleJumpFlipDelayShare,O.tripleJumpFlipDelayMin,O.tripleJumpFlipDelay),this.flipTimer<this.flipDelay)return;const s=t-O.tripleJumpLandMargin,r=Math.max(e,s),o=(1-this.flipProgress)/r;this.flipProgress=Math.min(1,this.flipProgress+o*e)}predictTimeToLand(){const e=this.scratchSide.set(this.object.position.x,this.object.position.y+.3,this.object.position.z),t=this.world.groundProbe(e,80);if(!t)return 1/0;let n=Math.max(0,this.object.position.y-t.y);const s=O.gravity,r=O.gravity*O.fallGravityMultiplier;let o=0,a=this.velocity.y;a>0&&(o+=a/s,n+=a*a/(2*s),a=0);const l=-a;return o+=(-l+Math.sqrt(l*l+2*r*n))/r,o}get flipping(){return this.flipTimer>=this.flipDelay&&this.flipProgress<1}get somersaultProgress(){return this.flipTimer<0?0:this.flipProgress}updateWaterState(){const e=this.state==="swim",t=e?ei*.12:ei*.5,n=this.scratchB.set(this.object.position.x,this.object.position.y+t,this.object.position.z),s=this.world.waterAt(n);if(this.waterVolume=s,s&&!e){const r=-this.velocity.y;this.state="swim",this.submerged=!0,this.velocity.y*=.22,this.velocity.x*=.65,this.velocity.z*=.65,r>O.splashSpeed&&this.events.onSplash?.(new P(this.object.position.x,s.surfaceY,this.object.position.z),Math.min(1,r/18))}else!s&&e&&(this.state=this.onGround?"ground":"air",this.submerged=!1,this.atSurface=!1,this.diving=!1)}findCarryTarget(){if(this.carried)return null;let e=null,t=1/0;const n=this.forwardVector(this.scratchMove);for(const s of this.carryables){if(s.held||s.pickupCooldown>0)continue;const r=this.scratchSide.copy(s.position).sub(this.object.position),o=Math.abs(r.y);r.y=0;const a=r.length();if(a>O.carryReach+s.radius||o>ei)continue;const l=a>.001?n.dot(r.divideScalar(a)):1;if(l<-.35)continue;const c=a-l*.5;c<t&&(t=c,e=s)}return e}updateCarry(e,t){if(!t.wasPressed("grab"))return;if(this.carried){this.throwCarried();return}const n=this.findCarryTarget();n&&(n.pickUp(),this.carried=n,this.rig.carryAnchor.add(n.object3d),n.object3d.position.set(0,0,0))}throwCarried(){const e=this.carried;if(!e)return;const t=e.object3d.getWorldPosition(new P),n=this.object.parent;this.rig.carryAnchor.remove(e.object3d),n?.add(e.object3d),e.object3d.position.copy(t);const s=this.forwardVector(this.scratchMove),r=new P().addScaledVector(s,O.throwSpeed).add(new P(this.velocity.x*.4,O.throwLift,this.velocity.z*.4));e.release(r),this.carried=null}dropCarried(){this.carried&&this.throwCarried()}updateRecovery(e){this.safePositionTimer-=e,this.safePositionTimer<=0&&this.state==="ground"&&this.onGround&&this.speed<7&&(this.safePositionTimer=.45,this.lastSafePosition.copy(this.object.position)),this.object.position.y<O.killPlaneY&&this.respawn()}respawn(){this.dropCarried(),this.object.position.copy(this.lastSafePosition),this.object.position.y+=.2,this.velocity.set(0,0,0),this.state="air",this.syncCapsuleFromPosition(),this.events.onRespawn?.()}setSafePosition(e){this.lastSafePosition.copy(e)}teleport(e,t=this.facing){this.dropCarried(),this.object.position.copy(e),this.facing=t,this.velocity.set(0,0,0),this.state="air",this.lastSafePosition.copy(e),this.syncCapsuleFromPosition()}targetSpeedFor(e){const t=e<=.55?ue.lerp(0,O.walkSpeed,e/.55):ue.lerp(O.walkSpeed,O.runSpeed,(e-.55)/.45);return this.carried?t*O.carrySpeedMultiplier:t}turnToward(e,t,n,s){if(e.lengthSq()<1e-4)return;const r=Math.atan2(e.x,e.z),o=s??ue.lerp(O.turnRateSlow,O.turnRateFast,ue.clamp(n/O.runSpeed,0,1));let a=r-this.facing;for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;const l=ue.clamp(a,-o*t,o*t);this.facing+=l}forwardVector(e){return e.set(Math.sin(this.facing),0,Math.cos(this.facing))}capsuleCentre(e){return e.copy(this.capsule.start).add(this.capsule.end).multiplyScalar(.5)}syncPositionFromCapsule(){this.object.position.set(this.capsule.start.x,this.capsule.start.y-On,this.capsule.start.z)}syncCapsuleFromPosition(){const e=this.object.position;this.capsule.start.set(e.x,e.y+On,e.z),this.capsule.end.set(e.x,e.y+ei-On,e.z)}syncModel(e,t){this.object.rotation.y=this.facing,this.state==="ground"&&this.speed>.6?(this.footstepPhase+=this.speed*e,this.footstepPhase>1.6&&(this.footstepPhase=0,this.events.onFootstep?.(this.object.position))):this.footstepPhase=0;const n={time:this.animationTime,delta:e,state:this.state,speed:this.speed,maxSpeed:O.runSpeed,verticalSpeed:this.velocity.y,skidding:this.skidding,landing:this.landingTimer>0,carrying:this.carried!==null,submerged:this.submerged&&!this.atSurface,diving:this.diving&&this.state==="swim",jumpStage:this.jumpStage,flipAngle:this.flipTimer<0?0:this.flipProgress*Math.PI*2*this.flipDirection,flipAxis:this.flipAxis,poundPhase:this.poundPhase,climbing:this.state==="climb",climbSpeed:this.state==="climb"?this.velocity.y:0,flipping:this.flipping,crouching:this.crouching,braking:this.braking,brakeStrength:this.braking?this.brakeStrength:0,jumpKind:this.jumpKind,againstWall:this.againstWall,ledgeProgress:this.ledgeTimer<0?0:Math.min(1,this.ledgeTimer/this.ledgeSeconds),ledgeWide:this.ledgeWide,ledgeMove:this.climbMove,ledgeHanging:this.ledgeHanging,ledgeLift:this.ledgeLift,strokeProgress:this.strokeTimer>0?1-this.strokeTimer/O.strokeCooldown:1};Kg(this.rig,n)}get carryAnchor(){return this.rig.carryAnchor}}const yn=220,h0=18;function d0(){const e=document.createElement("canvas");e.width=64,e.height=64;const t=e.getContext("2d");if(t){const n=t.createRadialGradient(32,32,0,32,32,32);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.45,"rgba(255,255,255,0.75)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,64,64)}return new xc(e)}class u0{constructor(e){B(this,"points");B(this,"positions");B(this,"colors");B(this,"baseColors");B(this,"velocities");B(this,"lifetimes");B(this,"maxLifetimes");B(this,"next",0);this.positions=new Float32Array(yn*3),this.colors=new Float32Array(yn*3),this.baseColors=new Float32Array(yn*3),this.velocities=new Float32Array(yn*3),this.lifetimes=new Float32Array(yn),this.maxLifetimes=new Float32Array(yn);for(let s=0;s<yn;s+=1)this.positions[s*3+1]=-9999;const t=new Vt;t.setAttribute("position",new Yt(this.positions,3)),t.setAttribute("color",new Yt(this.colors,3));const n=new vc({size:.42,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:.92,depthWrite:!1,blending:ai,map:d0()});this.points=new pd(t,n),this.points.name="particles",this.points.frustumCulled=!1,this.points.renderOrder=20,e.add(this.points)}splash(e,t){const n=Math.round(14+t*26);for(let s=0;s<n;s+=1){const r=s/n*Math.PI*2+Math.random()*.4,o=1.6+Math.random()*3.4*(.5+t);this.emit(e.x+Math.cos(r)*.3,e.y+.1,e.z+Math.sin(r)*.3,Math.cos(r)*o*.55,3.2+Math.random()*3.6*(.5+t),Math.sin(r)*o*.55,.55,.86,.98,.5+Math.random()*.4)}}dust(e,t){const n=Math.round(8+t*14);for(let s=0;s<n;s+=1){const r=s/n*Math.PI*2+Math.random()*.6,o=1.1+Math.random()*2.3*(.4+t);this.emit(e.x+Math.cos(r)*.25,e.y+.12,e.z+Math.sin(r)*.25,Math.cos(r)*o,.7+Math.random()*1.1,Math.sin(r)*o,.82,.76,.6,.35+Math.random()*.3)}}emit(e,t,n,s,r,o,a,l,c,h){const d=this.next;this.next=(this.next+1)%yn,this.positions[d*3]=e,this.positions[d*3+1]=t,this.positions[d*3+2]=n,this.velocities[d*3]=s,this.velocities[d*3+1]=r,this.velocities[d*3+2]=o,this.baseColors[d*3]=a,this.baseColors[d*3+1]=l,this.baseColors[d*3+2]=c,this.colors[d*3]=a,this.colors[d*3+1]=l,this.colors[d*3+2]=c,this.lifetimes[d]=h,this.maxLifetimes[d]=h}update(e){let t=!1;for(let n=0;n<yn;n+=1){if(this.lifetimes[n]<=0)continue;if(t=!0,this.lifetimes[n]-=e,this.lifetimes[n]<=0){this.positions[n*3+1]=-9999;continue}this.velocities[n*3+1]-=h0*e,this.positions[n*3]+=this.velocities[n*3]*e,this.positions[n*3+1]+=this.velocities[n*3+1]*e,this.positions[n*3+2]+=this.velocities[n*3+2]*e;const s=this.lifetimes[n]/this.maxLifetimes[n],r=s*s;this.colors[n*3]=this.baseColors[n*3]*r,this.colors[n*3+1]=this.baseColors[n*3+1]*r,this.colors[n*3+2]=this.baseColors[n*3+2]*r}t&&(this.points.geometry.attributes.position.needsUpdate=!0,this.points.geometry.attributes.color.needsUpdate=!0)}dispose(){this.points.geometry.dispose(),this.points.material.map?.dispose(),this.points.material.dispose(),this.points.removeFromParent()}}const Nl=26,f0=.28,qr=7.5,Fl=.25,p0=3.4,m0=22;class Ic{constructor(e,t){B(this,"object3d");B(this,"velocity",new P);B(this,"radius");B(this,"held",!1);B(this,"pickupCooldown",0);B(this,"resting",!1);B(this,"spawnPosition",new P);B(this,"spin",0);this.object3d=e,this.radius=t,this.spawnPosition.copy(e.position)}get position(){return this.object3d.position}update(e,t){if(this.pickupCooldown>0&&(this.pickupCooldown-=e),this.held){this.resting=!1;return}const n=t.waterAt(this.position);if(n){const o=Math.min(1,(n.surfaceY-this.position.y)/(this.radius*2));this.velocity.y+=m0*o*e,this.velocity.y-=Nl*e,this.velocity.multiplyScalar(Math.max(0,1-p0*e))}else this.resting||(this.velocity.y-=Nl*e,this.velocity.x*=Math.max(0,1-Fl*e),this.velocity.z*=Math.max(0,1-Fl*e));if(this.resting&&!n){this.spin*=Math.max(0,1-qr*e);return}this.position.addScaledVector(this.velocity,e);const s=new P(this.position.x,this.position.y+this.radius,this.position.z),r=t.groundHeightBelow(s,8);Number.isFinite(r)&&this.position.y-this.radius<=r&&(this.position.y=r+this.radius,this.velocity.y<-1.2?this.velocity.y=-this.velocity.y*f0:(this.velocity.y=0,this.velocity.x*=Math.max(0,1-qr*e),this.velocity.z*=Math.max(0,1-qr*e),this.velocity.lengthSq()<.02&&(this.velocity.set(0,0,0),this.resting=!0))),this.resting||(this.spin=Math.min(12,this.velocity.length()*.9),this.object3d.rotation.x+=this.spin*e*.6,this.object3d.rotation.z+=this.spin*e*.35),this.position.y<-80&&this.respawn()}pickUp(){this.held=!0,this.velocity.set(0,0,0),this.object3d.rotation.set(0,0,0)}release(e){this.held=!1,this.resting=!1,this.velocity.copy(e),this.pickupCooldown=.4}respawn(){this.held=!1,this.resting=!1,this.velocity.set(0,0,0),this.object3d.position.copy(this.spawnPosition),this.object3d.rotation.set(0,0,0)}}const g0=`
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
`,_0=`
  uniform float uTime;
  uniform vec3 uShallowColor;
  uniform vec3 uDeepColor;
  uniform vec3 uSkyColor;
  uniform vec3 uUnderColor;
  uniform vec3 uSunDirection;
  uniform float uReflectivity;
  varying vec3 vWorldPosition;
  varying vec3 vNormalW;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    vec3 normal = normalize(vNormalW);

    // How square-on the surface is being looked at, whichever side of it the
    // eye is. Taken as an absolute so the underside has a shape of its own
    // rather than collapsing to the single value a clamp gives it.
    float facing = abs(dot(viewDirection, normal));

    // ---- Seen from above ---------------------------------------------------
    // A cheap stand-in for depth: the water is deeper away from the island.
    float shoreDistance = clamp(
      (abs(vWorldPosition.x) + abs(vWorldPosition.z + 12.0)) * 0.012, 0.0, 1.0);
    vec3 baseColor = mix(uShallowColor, uDeepColor, 0.45 + shoreDistance * 0.3);

    // Grazing angles reflect the sky; looking straight down shows the depth.
    float fresnel = pow(1.0 - facing, 3.0);
    vec3 above = mix(baseColor, uSkyColor, fresnel * uReflectivity);

    // Sun glitter. The wave normal varies slowly, so an unbroken highlight
    // showed up as one large white smear; fine ripples break it into glints.
    vec3 halfVector = normalize(uSunDirection + viewDirection);
    float specular = pow(max(dot(normal, halfVector), 0.0), 420.0);
    float ripple = 0.5 + 0.5 *
      sin(vWorldPosition.x * 8.3 + uTime * 2.6) *
      sin(vWorldPosition.z * 7.1 - uTime * 2.1);
    above += vec3(1.0, 0.97, 0.88) * specular * (0.25 + ripple * 0.7);

    // Fine sparkle so the surface is never completely still. Three
    // non-harmonic frequencies, so it does not settle into a visible grid.
    float sparkle =
      sin(vWorldPosition.x * 11.3 + uTime * 2.2) *
      sin(vWorldPosition.z * 9.7 - uTime * 1.8) *
      sin((vWorldPosition.x + vWorldPosition.z) * 5.1 + uTime * 1.1);
    above += vec3(0.55, 0.6, 0.62) * max(0.0, abs(sparkle) - 0.86) * 2.4;

    // ---- Seen from underneath ----------------------------------------------
    // Looking up through water is not looking down at it. Straight up there
    // is a bright window where the light comes through; toward the
    // horizontal the surface turns into a mirror of the dark water below,
    // which is what makes it read as a ceiling of water rather than as a
    // hole in the world. Without this branch it was neither, and the scene
    // behind it in this mode is very nearly black.
    float window = pow(facing, 0.75);
    vec3 under = mix(uUnderColor, uSkyColor * 0.92, window);
    float caustic = 0.5 + 0.5 *
      sin(vWorldPosition.x * 2.1 + uTime * 1.3) *
      sin(vWorldPosition.z * 1.7 - uTime * 1.1);
    under += uSkyColor * caustic * 0.07 * window;

    // Crossing the waterline is a band rather than a line. Switched on the
    // sign alone, a camera sitting on the surface flips the whole plane
    // between two different-looking materials from one frame to the next.
    float side = smoothstep(0.08, -0.08, cameraPosition.y - vWorldPosition.y);

    gl_FragColor = vec4(
      mix(above, under, side),
      mix(0.74, mix(0.94, 0.55, window), side)
    );
    #include <colorspace_fragment>
  }
`;class Uc extends We{constructor(t,n,s,r){const o={uTime:{value:0},uShallowColor:{value:new fe("#3fb6c9")},uDeepColor:{value:new fe("#14566e")},uSkyColor:{value:new fe("#bfe4f7")},uUnderColor:{value:new fe("#0d3d52")},uSunDirection:{value:s.clone()},uReflectivity:{value:r?.95:.55}};super(new Pn(t,t,1,1).rotateX(-Math.PI/2),new Ct({uniforms:o,vertexShader:g0,fragmentShader:_0,transparent:!0,depthWrite:!1,side:rn}));B(this,"uniforms");this.uniforms=o,this.position.y=n,this.renderOrder=10,this.name="water",this.frustumCulled=!1}update(t){this.uniforms.uTime.value=t}setReflective(t){this.uniforms.uReflectivity.value=t?.95:.55}}const ns=140,$i=2,Ol=1,v0=new P(0,0,10),x0=Math.PI,_t=new P(56,0,44),$t=Math.PI,$e={x:-22,z:25,half:7,depth:3.4},Dt={x:14.45,z:-6,width:.9,top:7.14},ua=new fe("#565e6c"),fa=new fe("#646d7d"),kl=1.7,js=7,kn=5.5,Vn=2.6,Bl=.3,Ys=9,qs=11,rr=.9,M0=new fe("#4a515d"),S0=new fe("#424954"),y0=new fe("#5f6774");function b0(i,e,t={}){const n=t.obstacles===!0,s=t.holes??(n?[$e]:[]),r=new vt;r.name="slab-world",i.add(r);const o=new vt;o.name="solid",r.add(o),o.add(P0(s)),n&&(o.add(Kr(-14-kl-rr/2,-6)),o.add(Kr(-14+kl+rr/2,-6)),o.add(Kr(15,-6)),o.add(R0(15,12)),o.add(A0(4,2)));const a=new We(new St(ns,Ol,ns),new xt({color:new fe("#2a2f38"),roughness:.95}));a.position.y=-Ol/2-.02,a.receiveShadow=!0,a.castShadow=!0,a.name="slab-body",r.add(a);let l=null;const c=[];if(n){for(const f of w0())o.add(f);e.addWater(new Ht(new P($e.x-$e.half,-$e.depth,$e.z-$e.half),new P($e.x+$e.half,0,$e.z+$e.half)),-.12),l=new Uc($e.half*2,-.12,la,!1),l.position.set($e.x,0,$e.z),l.renderOrder=2,r.add(l),o.add(E0()),e.addLadder(new Ht(new P(Dt.x-Dt.width,0,Dt.z-Dt.width),new P(Dt.x+.3,Dt.top,Dt.z+Dt.width)),Math.PI/2,Dt.top,new P(Dt.x,0,Dt.z));const d=T0();d.position.set(3,.3,14),r.add(d),c.push(new Ic(d,.3))}e.addSolid(o);let h=0;return r.traverse(d=>{if(!(d instanceof We))return;const f=d.geometry;f.index?h+=f.index.count/3:f.attributes.position&&(h+=f.attributes.position.count/3)}),{carryables:c,water:l,hasObstacles:n,root:r,spawn:v0.clone(),spawnFacing:x0,triangleCount:Math.round(h)}}function Kr(i,e){const t=new St(rr,js,qs,1,js,qs),n=new We(t,new xt({color:ua,roughness:.92}));n.position.set(i,js/2,e),n.castShadow=!0,n.receiveShadow=!0,n.name="wall";const s=new We(new St(rr+.12,.24,qs+.12,1,1,qs),new xt({color:fa,roughness:.85}));return s.position.y=js/2+.02,s.castShadow=!0,s.receiveShadow=!0,n.add(s),n}function w0(){const i=new xt({color:new fe("#3a4350"),roughness:.9}),e=$e.half*2,t=[],n=new We(new Pn(e,e,$e.half,$e.half).rotateX(-Math.PI/2),i);n.position.set($e.x,-$e.depth,$e.z),n.receiveShadow=!0,t.push(n);const s=[[$e.x,$e.z-$e.half,e,.4],[$e.x,$e.z+$e.half,e,.4],[$e.x-$e.half,$e.z,.4,e],[$e.x+$e.half,$e.z,.4,e]];for(const[r,o,a,l]of s){const c=new We(new St(a,$e.depth,l,Math.ceil(a),$e.depth,Math.ceil(l)),i);c.position.set(r,-$e.depth/2,o),c.receiveShadow=!0,c.castShadow=!0,t.push(c)}return t}function E0(){const i=new vt;i.name="ladder";const e=new xt({color:new fe("#8a7a63"),roughness:.8}),t=Dt.top-.1;for(const n of[-1,1]){const s=new We(new St(.1,t,.1,1,Math.ceil(t),1),e);s.position.set(Dt.x,t/2,Dt.z+n*.34),s.castShadow=!0,s.receiveShadow=!0,i.add(s)}for(let n=.35;n<t;n+=.42){const s=new We(new Tn(.045,.045,.76,8),e);s.rotation.x=Math.PI/2,s.position.set(Dt.x,n,Dt.z),s.castShadow=!0,i.add(s)}return i}function T0(){const i=new We(new St(.52,.52,.52,2,2,2),new xt({color:new fe("#9a7a4b"),roughness:.82}));return i.castShadow=!0,i.receiveShadow=!0,i.name="crate",i}function A0(i,e){const t=new We(new St(Bl,Vn,Ys,1,Vn,Ys),new xt({color:ua,roughness:.92}));t.position.set(i,Vn/2,e),t.castShadow=!0,t.receiveShadow=!0,t.name="thin-wall";const n=new We(new St(Bl+.08,.16,Ys+.08,1,1,Ys),new xt({color:fa,roughness:.85}));return n.position.y=Vn/2-.08,n.castShadow=!0,n.receiveShadow=!0,t.add(n),t}function R0(i,e){const t=new We(new St(kn,Vn,kn,kn,Vn,kn),new xt({color:ua,roughness:.92}));t.position.set(i,Vn/2,e),t.castShadow=!0,t.receiveShadow=!0,t.name="platform";const n=new We(new St(kn+.1,.2,kn+.1,kn,1,kn),new xt({color:fa,roughness:.85}));return n.position.y=Vn/2+.01,n.castShadow=!0,n.receiveShadow=!0,t.add(n),t}function C0(i,e){const t=i.index,n=i.attributes.position;if(!t)return;const s=[];for(let r=0;r<t.count;r+=3){let o=0,a=0;for(let c=0;c<3;c+=1){const h=t.getX(r+c);o+=n.getX(h),a+=n.getZ(h)}o/=3,a/=3,!(Math.abs(o-e.x)<e.half-.01&&Math.abs(a-e.z)<e.half-.01)&&s.push(t.getX(r),t.getX(r+1),t.getX(r+2))}i.setIndex(s)}function P0(i){const e=ns/$i,t=new Pn(ns,ns,e,e);t.rotateX(-Math.PI/2);for(const a of i)C0(t,a);const n=t.attributes.position,s=new Float32Array(n.count*3),r=new fe;for(let a=0;a<n.count;a+=1){const l=n.getX(a),c=n.getZ(a),h=Math.floor(l/$i)+Math.floor(c/$i);r.copy(h%2===0?M0:S0),(Math.abs(l%$i)<.01||Math.abs(c%$i)<.01)&&r.lerp(y0,.6),s[a*3]=r.r,s[a*3+1]=r.g,s[a*3+2]=r.b}t.setAttribute("color",new Yt(s,3)),t.computeVertexNormals();const o=new We(t,new xt({vertexColors:!0,roughness:.94,metalness:0}));return o.name="floor",o.receiveShadow=!0,o.castShadow=!1,o}const Jr=new P(0,0,54),zl=Math.PI,Ze={x:-35,z:19,half:15,depth:8},L0=new fe("#5c6673"),At=new fe("#49525e"),D0=new fe("#6f7a88"),Nc=new fe("#8a7a63"),Bn=new fe("#b4743a"),Hl=new fe("#3f7f6a");function I0(i,e){const t=new vt;t.name="course",i.add(t);const n=new vt;n.name="course-solid",t.add(n);const s=new vt;s.name="course-decor",t.add(s);const r=[],o=[],a=(y,v,R,T,C,U,w=L0)=>{const M=new We(new St(T,C,U,Math.max(1,Math.round(T)),Math.max(1,Math.round(C)),Math.max(1,Math.round(U))),new xt({color:w,roughness:.92}));return M.position.set(y,v+C/2,R),M.castShadow=!0,M.receiveShadow=!0,n.add(M),M},l=(y,v,R,T,C)=>{const U=a(y,0,R,T,v,C),w=new We(new St(T+.12,.16,C+.12,Math.max(1,Math.round(T)),1,Math.max(1,Math.round(C))),new xt({color:D0,roughness:.85}));return w.position.set(y,v-.08,R),w.castShadow=!0,w.receiveShadow=!0,n.add(w),U},c=(y,v,R,T=1.6)=>{const C=new We(new Tn(T,T,.06,20),new xt({color:Hl,roughness:.8}));C.position.set(y,v+.03,R),C.receiveShadow=!0,s.add(C),r.push(new P(y,v,R))},h=(y,v,R,T,C,U,w="")=>{const M=new vt;M.position.set(y,v,R),M.rotation.y=T;const I=new We(new Tn(.07,.07,1.5,8),new xt({color:Nc,roughness:.8}));I.position.y=.75,I.castShadow=!0,M.add(I);const D=new We(new Pn(2.6,1.3),new us({map:O0(C,U,w),side:rn,transparent:!0}));D.position.y=2.1,M.add(D),s.add(M)};c(0,0,54),h(3.4,0,54,Math.PI*.9,"1 · RUN","E forward · D back · S / F sides","Let go at full speed to skid");for(let y=0;y<6;y+=1)a(-3.2,0,48-y*3,.5,.12,2,At),a(3.2,0,48-y*3,.5,.12,2,At);h(3.4,0,34,Math.PI*.9,"2 · JUMP","Space","Three hurdles, rising"),a(0,0,32,5,.6,.8,Bn),a(0,0,28.5,5,.9,.8,Bn),a(0,0,25,5,1.2,.8,Bn),c(0,0,21),h(3.6,0,21,Math.PI*.9,"3 · DOUBLE & TRIPLE JUMP","Space, then Space again on landing","Keep moving — a combo needs speed"),l(0,1.5,17,4,4),l(0,3.1,12.5,4,4),l(0,5.1,8,4.5,4.5),c(0,0,2),h(4.2,0,2,Math.PI*.9,"4 · LONG JUMP","Run, hold C, then Space","The gap is too wide for a plain jump"),a(0,0,3.4,7,.4,1.6,At),a(0,0,2.2,7,.78,1.2,At),a(0,0,-2,7,1.1,8),a(0,0,-17,9,1.1,7,At),c(0,1.1,-17),h(12,0,-21.4,0,"5 · BACKFLIP","Stand still, hold C, then Space","Face the wall — it throws you backwards"),a(12,0,-23,10,5,1.2,At),c(12,0,-18.5),l(12,2.6,-15,6,4),a(18,0,-15,8,2.6,4),h(18,2.6,-17.8,0,"6 · SIDE FLIP","At a run: Space, then A","Either order, within a third of a second"),l(26,5.1,-15,5,5),h(26,5.1,-11.8,0,"7 · GROUND POUND","In the air: Space, Space again","A boost first, then straight down");const d=new We(new Tn(2.2,2.2,.08,24),new xt({color:Bn,roughness:.75}));d.position.set(26,.04,-8),d.receiveShadow=!0,s.add(d),c(26,0,-8,2.2),h(26,0,-4,0,"8 · WALL KICK","Jump at a wall, then Space again","Bounce side to side to the top"),a(29,0,2,1.2,9,10,At),a(33.8,0,2,1.2,9,10,At),l(31.4,9,9,7.6,5),a(31.4,0,16,5,9,10),h(31.4,0,-2,0,"8b · KEEP GOING","Kick wall to wall, no limit","This one is sixteen metres"),a(29,0,-8,1.2,16,8,At),a(33.8,0,-8,1.2,16,8,At),l(31.4,16,-14.5,7.6,4),c(31.4,16,-14.5,2),h(31.4,9,20.4,0,"9 · OVER THE TOP","Catch the edge · E pulls up","S / F along it · Space jumps off"),a(31.4,9,24,6,2.4,.35,Bn),a(31.4,0,27.5,6,9,5),a(31.4,9,32,6,2.5,1.1,Bn),a(31.4,0,36,6,9,5),a(31.4,0,43,9,11.6,8),h(24.4,.6,43,-Math.PI/2,"10 · LADDER","Walk into it · E up · D down","Space jumps off · G climbs down from the top"),a(22,0,43,6,.6,8,At);const f=26.9,p=11.6,g=f-.145;N0(s,f,43,p),e.addLadder(new Ht(new P(g-1,0,42),new P(g+.45,p,44)),Math.PI/2,p,new P(g,0,43)),c(22,.6,43,2),h(31.4,11.6,47.4,0,"11 · CARRY","R to pick up · R again to throw","Take the crate along the bridge");const S=F0();S.position.set(31.4,11.9,46.4),s.add(S),o.push(new Ic(S,.3)),a(20,11,49,26,.6,3.2,At),a(4,0,49,8,11.6,6),c(4,11.6,49,2.2),h(-15,0,30,Math.PI*.6,"12 · SWIM","Space strokes · Q or Ctrl dives","At the surface, Space climbs out"),a(-19.5,0,30,4,6,4,At),a(-23.5,5.4,30,5,.5,2.2,Bn),c(-19.5,6,30,1.5);for(const y of U0())n.add(y);e.addWater(new Ht(new P(Ze.x-Ze.half,-8,Ze.z-Ze.half),new P(Ze.x+Ze.half,0,Ze.z+Ze.half)),-.15);const m=new Uc(Ze.half*2,-.15,la,!1);m.position.set(Ze.x,-.15,Ze.z),m.renderOrder=2,t.add(m),c(-34,0,0,2.4),h(-30.5,0,0,Math.PI*.35,"13 · THE LOT","Long jump · wall kick · climb · pound","Finish on the far pad"),a(-34,0,.6,7,.4,1.6,At),a(-34,0,-.6,7,.78,1.2,At),a(-34,0,-4,7,1.1,5),a(-34,0,-17,7,1.1,5,At),a(-36.4,0,-24,1.2,10,8,At),a(-31.6,0,-24,1.2,10,8,At),l(-34,10,-30,7.6,4),a(-34,10,-34.5,7,2.5,1.1,Bn),a(-34,0,-38.5,7,10,6);const u=new We(new Tn(3,3,.1,28),new xt({color:Hl,roughness:.7}));u.position.set(-24,.05,-38.5),u.receiveShadow=!0,s.add(u),c(-24,0,-38.5,3),h(-20.5,0,-38.5,Math.PI*.5,"FINISH","Ground pound to land on it","Backspace returns you to the last pad"),e.addSolid(n);let E=0;return t.traverse(y=>{if(!(y instanceof We))return;const v=y.geometry;v.index?E+=v.index.count/3:v.attributes.position&&(E+=v.attributes.position.count/3)}),{root:t,solid:n,carryables:o,water:m,checkpoints:r,triangleCount:Math.round(E)}}function U0(){const i=new xt({color:new fe("#3a4350"),roughness:.9}),e=Ze.half*2,t=[],n=new We(new Pn(e,e,Ze.half,Ze.half).rotateX(-Math.PI/2),i);n.position.set(Ze.x,-8,Ze.z),n.receiveShadow=!0,t.push(n);const s=[[Ze.x,Ze.z-Ze.half,e,.5],[Ze.x,Ze.z+Ze.half,e,.5],[Ze.x-Ze.half,Ze.z,.5,e],[Ze.x+Ze.half,Ze.z,.5,e]];for(const[r,o,a,l]of s){const c=new We(new St(a,Ze.depth,l,Math.ceil(a),Ze.depth,Math.ceil(l)),i);c.position.set(r,-8/2,o),c.receiveShadow=!0,c.castShadow=!0,t.push(c)}return t}function N0(i,e,t,n){const s=new xt({color:Nc,roughness:.8});for(const r of[-1,1]){const o=new We(new St(.11,n-.1,.11,1,Math.ceil(n),1),s);o.position.set(e-.055,(n-.1)/2,t+r*.34),o.castShadow=!0,o.receiveShadow=!0,i.add(o)}for(let r=.36;r<n-.12;r+=.4){const o=new We(new Tn(.055,.055,.78,8),s);o.rotation.x=Math.PI/2,o.position.set(e-.145,r,t),o.castShadow=!0,i.add(o)}}function F0(){const i=new We(new St(.52,.52,.52,2,2,2),new xt({color:new fe("#9a7a4b"),roughness:.82}));return i.castShadow=!0,i.receiveShadow=!0,i.name="crate",i}function O0(i,e,t){const n=document.createElement("canvas");n.width=1024,n.height=512;const s=n.getContext("2d");s&&(s.fillStyle="rgba(22, 27, 35, 0.94)",Vl(s,8,8,n.width-16,n.height-16,26),s.fill(),s.strokeStyle="#8b96a6",s.lineWidth=6,Vl(s,8,8,n.width-16,n.height-16,26),s.stroke(),s.textAlign="center",s.fillStyle="#ffd9a0",s.font="bold 76px system-ui, -apple-system, Segoe UI, sans-serif",s.fillText(i,n.width/2,132),s.fillStyle="#f2f5fa",s.font="600 62px system-ui, -apple-system, Segoe UI, sans-serif",Gl(s,e,n.width/2,236,n.width-90,70),t&&(s.fillStyle="#9fb0c4",s.font="46px system-ui, -apple-system, Segoe UI, sans-serif",Gl(s,t,n.width/2,400,n.width-110,54)));const r=new xc(n);return r.colorSpace=zt,r.minFilter=en,r.magFilter=en,r}function Vl(i,e,t,n,s,r){i.beginPath(),i.moveTo(e+r,t),i.arcTo(e+n,t,e+n,t+s,r),i.arcTo(e+n,t+s,e,t+s,r),i.arcTo(e,t+s,e,t,r),i.arcTo(e,t,e+n,t,r),i.closePath()}function Gl(i,e,t,n,s,r){const o=e.split(" ");let a="",l=n;for(const c of o){const h=a?`${a} ${c}`:c;i.measureText(h).width>s&&a?(i.fillText(a,t,l),a=c,l+=r):a=h}a&&i.fillText(a,t,l)}class k0{constructor(e){B(this,"stats");B(this,"focusNotice");B(this,"prompt");B(this,"promptText","");B(this,"visible",!0);const t=document.createElement("div");t.className="ui-root",e.appendChild(t);const n=document.createElement("div");n.className="hud",t.appendChild(n),this.stats=document.createElement("div"),this.stats.className="hud__stats",n.appendChild(this.stats);const s=document.createElement("div");s.className="hud__hints",s.innerHTML=`
      Forward <b>E</b> · Back <b>D</b> · Left <b>S</b> · Right <b>F</b> ·
      Walk <b>hold Shift</b> · Jump <b>Space</b><br />
      Jump again on landing for a higher second and third jump · at a run,
      <b>Space</b> then <b>A</b> for a <b>side flip</b><br />
      <b>C</b> crouches on land — crouch running then jump for a <b>long
      jump</b>, crouch still then jump for a <b>backflip</b><br />
      <b>Space</b> again in the air for a boost, and <b>again</b> to <b>ground
      pound</b> · kick off walls as long as you keep reaching them<br />
      Ladder: <b>E</b>/<b>D</b> up and down · <b>Space</b> jumps off ·
      <b>G</b> climbs down from the top<br />
      Hanging: <b>S</b>/<b>F</b> along the edge · <b>E</b> pulls up ·
      <b>Space</b> jumps off · <b>C</b> lets go<br />
      Water: <b>Space</b> strokes and climbs out · <b>Q</b> or <b>Ctrl</b>
      dives<br />
      <b>R</b> pick up and throw · let go at a run to <b>skid</b> ·
      Mouse lock <b>L</b> · Reset <b>Backspace</b> · Panel <b>F3</b> ·
      Quality <b>1</b>/<b>2</b>/<b>3</b><br />
      <span class="hud__build">build bddf0c9 11-05 04:09</span>
    `,n.appendChild(s),this.prompt=document.createElement("div"),this.prompt.className="hud__prompt",n.appendChild(this.prompt),this.focusNotice=document.createElement("div"),this.focusNotice.className="hud__focus",this.focusNotice.textContent="Click the page to give it keyboard focus",n.appendChild(this.focusNotice)}setPrompt(e){const t=e??"";t!==this.promptText&&(this.promptText=t,this.prompt.textContent=t,this.prompt.classList.toggle("is-visible",t!==""))}toggleStats(){this.visible=!this.visible,this.stats.hidden=!this.visible}update(e){const t=e.fps>=50?"hud__fps--good":e.fps>=28?"hud__fps--ok":"hud__fps--poor",n=[["FPS",e.fps.toFixed(0),t],["Quality",e.quality],["Draw calls",String(e.drawCalls)],["Triangles",e.triangles.toLocaleString("en-GB")],["State",e.state],["Speed",`${e.speed.toFixed(1)} m/s`],["Position",`${e.position.x.toFixed(0)}, ${e.position.y.toFixed(0)}, ${e.position.z.toFixed(0)}`],["Gamepad",e.gamepad?"connected":"press a button"],["Mouse",e.pointerLocked?"locked":"free  (L)"],["Input",`${e.moveX.toFixed(2)}, ${e.moveY.toFixed(2)}`],["Cam yaw",`${e.cameraYaw.toFixed(0)}°`],["Last key",e.lastKey==="—"?"none yet":`${e.lastKey}${e.lastKeyRecognised?"":"  (unused)"}`]];this.focusNotice.hidden=document.hasFocus(),this.stats.innerHTML="";for(const[s,r,o]of n){const a=document.createElement("div");a.textContent=`${s.padEnd(11," ")}${r}`,o&&(a.className=o),this.stats.appendChild(a)}}}const Go=document.getElementById("app");if(!Go)throw new Error("Missing #app container");const B0=1/20;class z0{constructor(){B(this,"settings",vg());B(this,"engine");B(this,"hud");B(this,"input",new Ng);B(this,"collision",new Gg);B(this,"effects");B(this,"world");B(this,"course");B(this,"player");B(this,"cameraRig");B(this,"running",!0);B(this,"reachedPad",0);B(this,"onGlobalKey",e=>{if(e.code==="F3"&&(e.preventDefault(),this.hud.toggleStats()),e.code==="Backspace"){e.preventDefault();const t=e.shiftKey?Jr:this.lastPad();this.player.teleport(t,e.shiftKey?zl:this.player.facing),this.cameraRig.reset(this.player)}if(e.code==="Digit1"||e.code==="Digit2"||e.code==="Digit3"){const t={Digit1:"low",Digit2:"medium",Digit3:"high"}[e.code];this.settings={...this.settings,quality:t},this.engine.applyQuality(t),this.engine.setStudioMode(!0),xg(this.settings)}});B(this,"frame",()=>{if(!this.running)return;requestAnimationFrame(this.frame);const e=Math.min(B0,this.engine.clock.getDelta());this.input.update(this.settings.cameraSensitivity,this.settings.invertCameraY),this.input.wasPressed("togglePointerLock")&&this.input.togglePointerLock(),this.cameraRig.applyLook(this.input.look.x,this.input.look.y),this.player.update(e,this.input,this.cameraRig.movementYaw),this.cameraRig.update(e,this.player),this.trackProgress();for(const t of this.course.carryables)t.update(e,this.collision);this.course.water.update(this.engine.clock.elapsedTime),this.effects.update(e),this.engine.focusShadowsOn(this.player.position),this.engine.setUnderwater(this.collision.waterAt(this.engine.camera.position)!==null),this.engine.render(e),this.hud.setPrompt(this.currentPrompt()),this.hud.update({fps:this.engine.fps,quality:this.settings.quality,drawCalls:this.engine.renderer.info.render.calls,triangles:this.engine.renderer.info.render.triangles,state:this.player.stateName,speed:this.player.speed,position:this.player.position,gamepad:this.input.gamepadConnected,lastKey:this.input.lastKey,lastKeyRecognised:this.input.lastKeyRecognised,pointerLocked:this.input.isPointerLocked,moveX:this.input.move.x,moveY:this.input.move.y,cameraYaw:this.cameraRig.yawDegrees})});this.engine=new Cg(Go,this.settings.quality),this.engine.setStudioMode(!0),this.effects=new u0(this.engine.scene),this.world=b0(this.engine.scene,this.collision,{holes:[{x:Ze.x,z:Ze.z,half:Ze.half}]}),this.course=I0(this.engine.scene,this.collision),this.player=new c0(this.collision,Jr,{onLand:(t,n)=>{n>.25&&this.effects.dust(t,n)}},{plain:!0}),this.player.facing=zl,this.player.carryables=this.course.carryables,this.engine.scene.add(this.player.object),this.cameraRig=new Ig(this.engine.camera,this.collision),this.cameraRig.reset(this.player),this.hud=new k0(Go),this.input.attach(this.engine.renderer.domElement),this.input.setPointerLockWanted(!0),window.addEventListener("keydown",this.onGlobalKey);const e=this.engine.renderer.domElement;e.tabIndex=0,e.style.outline="none",window.focus(),e.focus(),this.engine.clock.start(),requestAnimationFrame(this.frame)}lastPad(){return this.course.checkpoints[this.reachedPad]??Jr}trackProgress(){const e=this.course.checkpoints;for(let t=0;t<e.length;t+=1){if(t<=this.reachedPad)continue;const n=e[t];Math.abs(this.player.position.y-n.y)<1.5&&Math.hypot(this.player.position.x-n.x,this.player.position.z-n.z)<2.4&&(this.reachedPad=t)}}currentPrompt(){return this.player.ladderToClimbDown()?"G — Climb down":this.player.findCarryTarget()?"R — Pick up":null}get debug(){return{engine:this.engine,player:this.player,testGround:_t,testFacing:$t,world:this.world,settings:this.settings,rig:this.player.rig,freeze:()=>{this.running=!1},simulateMove:(e,t,n,s)=>{const r={move:{x:n,y:s},look:{x:0,y:0},isDown:()=>!1,wasPressed:()=>!1,wasReleased:()=>!1},o=[],a=this.cameraRig.movementYaw;for(let l=0;l<e;l+=1)this.player.update(t,r,a),o.push({x:Math.round(this.player.position.x*1e3)/1e3,z:Math.round(this.player.position.z*1e3)/1e3,speed:Math.round(this.player.speed*100)/100,state:this.player.stateName});return o},simulateJumpCombo:(e=1/60)=>{let t=!1,n=!1;const s={move:{x:0,y:-1},look:{x:0,y:0},isDown:h=>h==="jump"&&t,wasPressed:h=>h==="jump"&&t&&!n,wasReleased:()=>!1},r=this.cameraRig.movementYaw,o=h=>Math.max(1,Math.round(h/e)),a=()=>this.player.update(e,s,r),l=()=>["idle","walk","run","skid"].includes(this.player.stateName);this.player.teleport(_t.clone(),$t);for(let h=0;h<o(1);h+=1)a();const c=[];for(let h=0;h<3;h+=1){t=!0,n=!1,a(),n=!0;let d=this.player.position.y;for(let f=0;f<o(.4);f+=1)a(),d=Math.max(d,this.player.position.y);t=!1,n=!1;for(let f=0;f<o(2)&&(a(),d=Math.max(d,this.player.position.y),!l());f+=1);c.push(Math.round(d*100)/100);for(let f=0;f<3;f+=1)a()}return c},simulateTripleJump:(e=1/60,t=.4)=>{let n=!1,s=!1;const r={move:{x:0,y:-1},look:{x:0,y:0},isDown:v=>v==="jump"&&n,wasPressed:v=>v==="jump"&&n&&!s,wasReleased:()=>!1},o=this.cameraRig.movementYaw,a=v=>Math.max(1,Math.round(v/e)),l=()=>this.player.update(e,r,o),c=()=>["idle","walk","run","skid"].includes(this.player.stateName);this.player.teleport(_t.clone(),$t);for(let v=0;v<a(1);v+=1)l();for(let v=0;v<2;v+=1){n=!0,s=!1,l(),s=!0;for(let R=0;R<a(.4);R+=1)l();n=!1;for(let R=0;R<a(2)&&(l(),!c());R+=1);for(let R=0;R<3;R+=1)l()}const h=new Ht;let d=this.player.position.y,f=1/0,p={y:0,progress:0,state:"",frame:0},g=0,S=!1,m=-1,u=0,E=0;n=!0,s=!1,l(),s=!0;const y=()=>{d=Math.max(d,this.player.position.y),c()||(E+=1,m<0&&this.player.somersaultProgress>0&&(m=E*e),u=this.player.somersaultProgress),this.player.object.updateMatrixWorld(!0),h.setFromObject(this.player.object),g+=1,!c()&&h.min.y<f&&(f=h.min.y,p={y:Math.round(this.player.position.y*1e3)/1e3,progress:Math.round(this.player.somersaultProgress*100)/100,state:this.player.stateName,frame:g}),this.player.somersaultProgress>=1&&(S=!0)};for(let v=0;v<a(t);v+=1)l(),y();n=!1;for(let v=0;v<a(3)&&(l(),y(),!c());v+=1);return{stage:this.player.stateName,peak:Math.round(d*100)/100,lowestPart:Math.round(f*1e3)/1e3,lowestAt:p,completedBeforeLanding:S,startedAfter:Math.round(m*1e3)/1e3,airtime:Math.round(E*e*1e3)/1e3,progressAtLanding:Math.round(u*100)/100}},simulateMoveSet:(e=1/60)=>{const t={x:0,y:0},n=new Set,s=new Set,r={move:t,look:{x:0,y:0},isDown:m=>n.has(m),wasPressed:m=>s.has(m),wasReleased:()=>!1},o=this.player,a=()=>{o.update(e,r,0),s.clear()},l=m=>Math.max(1,Math.round(m/e)),c=m=>{n.add(m),s.add(m)},h=(m,u=2)=>Math.round(m*10**u)/10**u,d=(m=_t.x,u=_t.z,E=$t)=>{n.clear(),s.clear(),t.x=0,t.y=0,o.teleport(new P(m,0,u),E);for(let y=0;y<l(.4);y+=1)a()},f={},p=new Ht,g=(m,u=0)=>{let E=1/0,y="";for(let v=0;v<l(m);v+=1)a(),!(v<l(u))&&(o.object.updateMatrixWorld(!0),p.setFromObject(o.object),p.min.y<E&&(E=p.min.y,y=`${o.stateName} ${h(v*e,2)}s`));return{lowestPart:h(E,3),at:y}};d(),n.add("crouch"),f.crouchFloor=g(.8),d(),t.y=-1;for(let m=0;m<l(4);m+=1)a();t.y=0,f.brakeFloor=g(.35),t.y=-1;for(let m=0;m<l(4);m+=1)a();t.y=0,f.brakeSettled=g(.35,.22);const S=()=>{d(),t.y=-1;for(let E=0;E<l(1.2);E+=1)a();const m=o.position.clone();c("jump"),a();let u=o.position.y;for(let E=0;E<l(2.5)&&(a(),u=Math.max(u,o.position.y),!(o.stateName!=="jump"&&o.position.y<=.01&&E>4));E+=1);return n.delete("jump"),{distance:h(Math.hypot(o.position.x-m.x,o.position.z-m.z)),peak:h(u)}};f.runningJump=S();{d(),t.y=-1;for(let R=0;R<l(1.2);R+=1)a();const m=h(o.speed);n.add("crouch"),a();const u=o.stateName,E=o.position.clone();c("jump"),a();const y=o.stateName;let v=o.position.y;for(let R=0;R<l(2.5)&&(a(),v=Math.max(v,o.position.y),!(o.position.y<=.01&&R>4));R+=1);f.longJump={crouchState:u,state:y,speedBefore:m,distance:h(Math.hypot(o.position.x-E.x,o.position.z-E.z)),peak:h(v)}}{d(),n.add("crouch");for(let I=0;I<l(.4);I+=1)a();const m=o.stateName,u=o.position.clone(),E=o.facing;c("jump"),a();const y=o.stateName;let v=o.position.y,R=0,T=1/0;const C=new Ht;for(let I=0;I<l(2.5)&&(a(),v=Math.max(v,o.position.y),R=Math.max(R,o.somersaultProgress),o.position.y>.05&&(o.object.updateMatrixWorld(!0),C.setFromObject(o.object),T=Math.min(T,C.min.y)),!(o.position.y<=.01&&I>4));I+=1);const U=o.position.x-u.x,w=o.position.z-u.z,M=-(U*Math.sin(E)+w*Math.cos(E));f.backflip={crouchState:m,state:y,peak:h(v),backwards:h(M),turned:h(R),lowestPart:h(T,3)}}{d(-14,-6,Math.PI/2),t.x=1;for(let T=0;T<l(.5);T+=1)a();c("jump"),a();let m=!1,u=0,E=0,y=!1,v=0;const R=[];for(let T=0;T<l(2.5);T+=1){a();const C=o.stateName;if(R[R.length-1]!==C&&R.push(C),!y&&C==="wall-slide"){m=!0,u=o.position.y,E=o.position.x,c("jump"),y=!0,v=o.position.y;continue}if(y&&(v=Math.max(v,o.position.y)),y&&o.position.y<=.01)break}f.wallKick={touchedWall:m,kicked:y,states:R,gained:h(v-u),movedAway:h(Math.abs(o.position.x-E))}}{d(),t.y=-1;for(let v=0;v<l(4);v+=1)a();const m=h(o.speed),u=o.position.clone();t.y=0;const E=[];let y=0;for(let v=0;v<l(2);v+=1){a();const R=o.stateName;if(E[E.length-1]!==R&&E.push(R),y=v*e,o.speed<.05)break}f.brake={speedBefore:m,states:E,slideDistance:h(Math.hypot(o.position.x-u.x,o.position.z-u.z)),seconds:h(y)}}return d(),f},measureBraking:(e=1/60)=>{const t={x:0,y:0},n={move:t,look:{x:0,y:0},isDown:()=>!1,wasPressed:()=>!1,wasReleased:()=>!1},s=this.player,r=()=>s.update(e,n,0),o=l=>Math.max(1,Math.round(l/e)),a=(l,c=2)=>Math.round(l*10**c)/10**c;return[.5,1,2,3,5].map(l=>{t.x=0,t.y=0,s.teleport(new P(_t.x,0,_t.z-8),$t);for(let f=0;f<o(.6);f+=1)r();t.y=-1;for(let f=0;f<o(l);f+=1)r();const c=a(s.speed),h=s.position.clone();t.y=0;let d=!1;for(let f=0;f<o(3)&&(r(),s.stateName==="brake"&&(d=!0),!(s.speed<.05));f+=1);return{ran:l,speed:c,slide:a(Math.hypot(s.position.x-h.x,s.position.z-h.z)),skidded:d}})},simulateLedges:(e=1/60)=>{const t={x:0,y:0},n=new Set,s=new Set,r={move:t,look:{x:0,y:0},isDown:y=>n.has(y),wasPressed:y=>s.has(y),wasReleased:()=>!1},o=this.player,a=()=>{o.update(e,r,0),s.clear()},l=y=>Math.max(1,Math.round(y/e)),c=(y,v=2)=>Math.round(y*10**v)/10**v,h=y=>{n.add(y),s.add(y)},d=(y,v,R,T)=>{n.clear(),s.clear(),t.x=0,t.y=0,o.teleport(new P(y,v,R),T)},f=(y,v)=>{const R=[],T=()=>{const M=o.stateName;R[R.length-1]!==M&&R.push(M)};let C=-1;for(let M=0;M<l(y);M+=1)if(a(),T(),o.stateName==="hanging"){C=M;break}if(C<0)return{hung:!1,heldFor:0,states:R,landedAt:c(o.position.y)};const U=o.position.y;for(let M=0;M<l(.5);M+=1)a();const w=o.stateName==="hanging"&&Math.abs(o.position.y-U)<.01;h("forward");for(let M=0;M<l(.2);M+=1)a();n.delete("forward");for(let M=0;M<l(v);M+=1)a(),T();return{hung:!0,stayed:w,states:R,hangLift:c(o.ledgeDiagnostics.lip),landedAt:c(o.position.y),landedAhead:c(o.position.x)}},p={};d(-12.7,5.9,-6,Math.PI/2),p.wallTop=f(1,2),d(15,1.5,8.6,0),p.platform=f(1,2.4),d(3.3,1.3,2,Math.PI/2),p.thinWall=f(1,2.4),d(15,0,6.2,0);for(let y=0;y<l(.4);y+=1)a();t.y=1;for(let y=0;y<l(.5);y+=1)a();h("jump");for(let y=0;y<l(.32);y+=1)a();n.delete("jump"),t.y=0,p.platformJumped=f(1.6,2),d(-14,0,-6,Math.PI/2);for(let y=0;y<l(.4);y+=1)a();t.x=1;for(let y=0;y<l(.4);y+=1)a();h("jump");for(let y=0;y<l(.3);y+=1)a();n.delete("jump");const g=[];let S=0,m=0,u=!1;for(let y=0;y<l(6);y+=1){a();const v=o.stateName;if(g[g.length-1]!==v&&g.push(v),v==="hanging"){u=!0;break}m>0?(m-=1,m===0&&n.delete("jump")):v==="wall-slide"&&(h("jump"),m=l(.3),S+=1,t.x=-t.x)}t.x=0,t.y=0;let E={landedAt:c(o.position.y)};if(u){h("jump");for(let y=0;y<l(.2);y+=1)a();n.delete("jump");for(let y=0;y<l(1.6);y+=1){a();const v=o.stateName;g[g.length-1]!==v&&g.push(v)}E={landedAt:c(o.position.y)}}p.wallTopByKicking={kicks:S,reached:u,states:g,...E},d(_t.x,0,_t.z,$t);for(let y=0;y<l(.4);y+=1)a();return p},simulateExtras:(e=1/60)=>{const t={x:0,y:0},n=t,s=new Set,r=new Set,o={move:t,look:{x:0,y:0},isDown:D=>s.has(D),wasPressed:D=>r.has(D),wasReleased:()=>!1},a=this.player,l=()=>{a.update(e,o,0),r.clear()},c=D=>Math.max(1,Math.round(D/e)),h=(D,H=2)=>Math.round(D*10**H)/10**H,d=D=>{s.add(D),r.add(D)},f=(D,H,X,Y)=>{s.clear(),r.clear(),t.x=0,t.y=0,a.teleport(new P(D,H,X),Y);for(let q=0;q<c(.3);q+=1)l()},p=(D,H)=>{const X=[];for(let Y=0;Y<c(D);Y+=1){l();const q=a.stateName;if(X[X.length-1]!==q&&X.push(q),H?.(q))break}return X},g={},S=(D,H,X)=>{f(_t.x,0,_t.z-12,$t),n.y=-X;for(let oe=0;oe<c(1.2);oe+=1)l();const Y=h(a.speed);let q=a.position.y,ee=!1;const j=oe=>{for(let he=0;he<oe;he+=1)l(),q=Math.max(q,a.position.y),a.stateName==="side-flip"&&(ee=!0)};return H?(d("sideFlip"),j(c(D)),s.delete("sideFlip"),d("jump")):(d("jump"),j(c(D)),d("sideFlip")),j(c(.4)),s.clear(),j(c(2)),{runningAt:Y,flipped:ee,peak:h(q)}};g.sideFlipJumpThenFlip=S(.12,!1,1),g.sideFlipFlipThenJump=S(.12,!0,1),g.sideFlipLateButInside=S(.26,!1,1),g.sideFlipTooLate=S(.55,!1,1),g.sideFlipFromAWalk=S(.12,!1,.4),f(_t.x,0,_t.z-12,$t),d("jump");for(let D=0;D<c(.3);D+=1)l();s.delete("jump");for(let D=0;D<c(.18);D+=1)l();const m=h(a.position.y);d("jump");for(let D=0;D<c(.12);D+=1)l();s.delete("jump");let u=a.position.y;for(let D=0;D<c(.3);D+=1)l(),u=Math.max(u,a.position.y);d("jump"),l(),s.delete("jump"),g.groundPound={beforeBoost:m,boostPeak:h(u),states:p(2.5,D=>D==="idle")},f(_t.x,0,_t.z-12,$t),d("jump");for(let D=0;D<c(.3);D+=1)l();s.delete("jump");for(let D=0;D<c(.18);D+=1)l();d("jump"),l(),s.delete("jump"),g.oneExtraPress={states:p(2.5,D=>D==="idle")},f(12.6,0,-6,Math.PI/2),t.x=1;const E=p(.8,D=>D==="climb"),y=a.stateName==="climb",v=h(a.position.y);a.position.y;const R=[];let T=0;for(let D=0;D<c(3);D+=1){const H=a.position.y,X=a.stateName==="climb";l();const Y=a.stateName;R[R.length-1]!==Y&&R.push(Y),X&&Y!=="climb"&&(T=Math.max(T,H-a.position.y))}g.ladder={caught:y,from:v,to:h(a.position.y),states:[...E,...R],why:a.ledgeDiagnostics.reason,lip:a.ledgeDiagnostics.lip,dropAtTop:h(T,3)},f(-22,0,36,Math.PI),t.x=0,t.y=-1;const C=p(2.5,D=>D.startsWith("swim")),U=h(a.position.y);t.x=0,t.y=1;for(let D=0;D<c(2.2);D+=1)l();const w=[];let M=!1;for(let D=0;D<6&&!M;D+=1){d("jump");for(let H=0;H<c(.4);H+=1){l();const X=a.stateName;w[w.length-1]!==X&&w.push(X)}if(s.delete("jump"),a.stateName==="hanging"){d("jump");for(let H=0;H<c(.2);H+=1)l();s.delete("jump");for(let H=0;H<c(1.4);H+=1){l();const X=a.stateName;w[w.length-1]!==X&&w.push(X)}M=a.position.y>-.1}}g.pool={swam:C.some(D=>D.startsWith("swim")),states:C,depth:U,gotOut:M,outStates:w,endedAt:h(a.position.y)},f(3,0,16.4,Math.PI),t.x=0,t.y=-.4;for(let D=0;D<c(.55);D+=1)l();t.y=0;for(let D=0;D<c(.3);D+=1)l();const I=a.findCarryTarget();d("grab"),l(),s.delete("grab");for(let D=0;D<c(.5);D+=1)l();return g.crate={inReach:I!==null,carrying:a.carried!==null},f(_t.x,0,_t.z,$t),g},simulateCourse:(e=1/60)=>{const t={x:0,y:0},n=new Set,s=new Set,r={move:t,look:{x:0,y:0},isDown:G=>n.has(G),wasPressed:G=>s.has(G),wasReleased:()=>!1},o=this.player,a=()=>{o.update(e,r,0),s.clear()},l=G=>Math.max(1,Math.round(G/e)),c=(G,Ve=2)=>Math.round(G*10**Ve)/10**Ve,h=G=>{n.add(G),s.add(G)},d=(G,Ve,Ge,J)=>{n.clear(),s.clear(),t.x=0,t.y=0,o.teleport(new P(G,Ve,Ge),J);for(let Z=0;Z<l(.3);Z+=1)a()},f=()=>({x:c(o.position.x),y:c(o.position.y),z:c(o.position.z)}),p={};d(0,0,10,Math.PI),t.y=-1;for(let G=0;G<l(1.5);G+=1)a();n.add("crouch");let g=99,S="";for(let G=0;G<l(1.2);G+=1)if(a(),o.position.z<-4.4&&o.stateName==="crouch"){g=o.position.z,S=o.stateName,h("jump");break}for(let G=0;G<l(.35);G+=1)a();const m=o.stateName;n.clear(),t.y=0;for(let G=0;G<l(2.5);G+=1)a();p.longJumpGap={...f(),tookOffAt:c(g),tookOffState:S,launched:m,endedAs:o.stateName,cleared:o.position.z<-13.5&&o.position.y>1},d(12,0,-18.5,Math.PI),n.add("crouch");for(let G=0;G<l(.4);G+=1)a();const u=o.stateName;h("jump"),a();const E=o.stateName;for(let G=0;G<l(.5);G+=1)a();n.clear();for(let G=0;G<l(2.5);G+=1)a();p.backflipStep={...f(),crouched:u,jumped:E,landed:o.position.y>2.4},d(15,2.6,-15,Math.PI/2),t.x=1;for(let G=0;G<l(.9);G+=1)a();h("jump");for(let G=0;G<l(.1);G+=1)a();h("sideFlip");for(let G=0;G<l(.4);G+=1)a();n.delete("jump"),n.delete("sideFlip"),t.x=0;for(let G=0;G<l(2.5);G+=1)a();p.sideFlipLedge={...f(),landed:o.position.y>4.9},d(31.4,0,2,Math.PI/2),t.x=1;for(let G=0;G<l(.35);G+=1)a();h("jump");let y=l(.3),v=0,R=0;for(let G=0;G<l(7)&&(a(),R=Math.max(R,o.position.y),y>0?(y-=1,y===0&&n.delete("jump")):o.stateName==="wall-slide"&&(h("jump"),y=l(.3),v+=1,t.x=-t.x),o.stateName!=="hanging");G+=1);t.x=0,p.kickShaft={kicks:v,highest:c(R),reached:R>7.5},d(-23.5,5.9,30,Math.PI*.5),t.x=-1;for(let G=0;G<l(1.4);G+=1)a();let T=0;n.add("dive");for(let G=0;G<l(3);G+=1)a(),T=Math.min(T,o.position.y);n.delete("dive"),t.x=0;for(let G=0;G<l(3.5);G+=1)a();const C=o.stateName==="swim-surface";t.x=0,t.y=-1;for(let G=0;G<l(4)&&(a(),!(o.position.z<22));G+=1);t.y=0,t.x=1;for(let G=0;G<l(8)&&(a(),!(o.position.x>-21.3));G+=1);t.x=0;for(let G=0;G<l(.5);G+=1)a();const U=o.position.y,w=c(o.position.x),M=c(o.facing),I=o.stateName;let D=U,H=!1;const X=[];h("jump");for(let G=0;G<l(2.4);G+=1){a(),n.delete("jump"),D=Math.min(D,o.position.y);const Ve=o.stateName;X[X.length-1]!==Ve&&X.push(Ve),Ve==="water-exit"&&(H=!0)}t.x=0,t.y=0,p.pool={deepest:c(T),surfaced:C,floatedAt:c(U),dippedTo:c(D),neverDucked:D>U-.06,usedWaterExit:H,pressedAt:w,pressedFacing:M,pressedState:I,outStates:X,out:o.position.y>-.1,...f()},d(-35,-7.5,12,0);for(let G=0;G<l(6);G+=1)a();const Y=o.stateName,q=c(o.position.y);for(let G=0;G<l(3);G+=1)a();p.floating={state:Y,at:q,stayed:o.stateName,treads:Y==="swim-surface"&&o.stateName==="swim-surface"};{const G=()=>{d(23.5,.6,43,Math.PI/2),t.x=1;for(let De=0;De<l(3)&&(a(),o.stateName!=="climb");De+=1);t.x=0};G();const Ve=c(o.position.y);t.y=-1;for(let De=0;De<l(2);De+=1)a();const Ge=c(o.position.y);t.y=0,h("jump");for(let De=0;De<l(.25);De+=1)a();n.delete("jump");const J=o.stateName;let Z=!1;for(let De=0;De<l(2.2);De+=1)a(),o.stateName==="climb"&&(Z=!0);const ge=o.stateName;G(),t.y=-1;const Le=[];for(let De=0;De<l(11);De+=1){a();const tt=o.stateName;if(Le[Le.length-1]!==tt&&Le.push(tt),tt==="idle"&&o.position.y>11)break}t.y=0;const ve=c(o.position.y),Ke=o.position.y>11.4&&o.position.x>27;G(),t.y=-1;for(let De=0;De<l(5.5)&&(a(),!(o.position.y>10.4));De+=1);t.y=0;for(let De=0;De<l(.3);De+=1)a();const gt=c(o.position.y),L=o.stateName;t.y=1;for(let De=0;De<l(1.2);De+=1)a();const it=c(o.position.y);t.y=0,d(27.9,11.6,43,Math.PI/2);for(let De=0;De<l(.5);De+=1)a();const Se=o.ladderToClimbDown()!==null,Ue=(()=>{const De=o.position.clone();o.teleport(new P(31.4,11.6,43),Math.PI/2);for(let A=0;A<l(.3);A+=1)a();const tt=o.ladderToClimbDown()!==null;o.teleport(De,Math.PI/2);for(let A=0;A<l(.3);A+=1)a();return tt})();h("climbDown");const xe=[];for(let De=0;De<l(1.4);De+=1){a(),n.delete("climbDown");const tt=o.stateName;xe[xe.length-1]!==tt&&xe.push(tt)}const ot=c(o.position.y),ye=o.stateName==="climb";t.y=1;for(let De=0;De<l(1.5);De+=1)a();const Be=c(o.position.y);t.y=0,t.x=0,n.clear(),p.ladderWork={caughtAt:Ve,climbedTo:Ge,climbedUp:Ge>Ve+2,afterJump:J,landedAfterJump:ge,releasedByJump:J!=="climb",reattached:Z,topStates:Le,onTop:ve,gotOver:Ke,pausedAt:gt,pausedOn:L,backedDownTo:it,canStillDescend:it<gt-1,offered:Se,offeredAway:Ue,downStates:xe,mountedAt:ot,backOn:ye,descendedTo:Be,climbedDown:Be<ot-1.5}}{const G=Se=>{d(26.25,9.95,Se,Math.PI/2);for(let Ue=0;Ue<l(1.4)&&(a(),o.stateName!=="hanging");Ue+=1);return o.stateName==="hanging"},Ve=G(40),Ge=c(o.position.z);t.x=1;for(let Se=0;Se<l(1.2);Se+=1)a();t.x=0;const J=c(o.position.z),Z=o.stateName==="hanging";n.add("forward");for(let Se=0;Se<l(.6);Se+=1)a();const ge=o.stateName==="hanging";n.delete("forward"),h("forward");for(let Se=0;Se<l(1.6);Se+=1)a();n.delete("forward");const Le=o.position.y>11.4,ve=G(41),Ke=o.position.y,gt=o.position.x;h("jump");for(let Se=0;Se<l(.35);Se+=1)a();n.delete("jump");const L=o.stateName;for(let Se=0;Se<l(2.2);Se+=1)a();const it=o.position.x<gt-.8;t.x=0,n.clear(),p.ledgeWork={hung:Ve,caughtZ:Ge,shimmiedZ:J,movedAlong:Math.abs(J-Ge)>.6,stillHanging:Z,heldForwardDidNothing:ge,pulledUp:Le,hung2:ve,fromY:c(Ke),afterLedgeJump:L,jumpedOff:L!=="hanging",pushedBack:it,endedAt:c(o.position.y)}}d(_t.x,0,_t.z,$t),n.add("crouch");for(let G=0;G<l(.4);G+=1)a();const ee=o.stateName;n.clear(),d(-35,0,12,Math.PI);for(let G=0;G<l(2);G+=1)a();const j=o.position.y;n.add("dive");for(let G=0;G<l(2);G+=1)a();const oe=c(o.position.y);n.clear(),p.crouchKey={onLand:ee,floatedAt:c(j),divedTo:oe,dives:oe<j-1};{const G=J=>{d(_t.x,0,_t.z,$t);const Z=l(.32);h("jump");let ge=0,Le=!1;for(let ve=0;ve<l(2.6);ve+=1)a(),ge=Math.max(ge,o.position.y),ve===Z&&n.delete("jump"),J&&!Le&&ve>Z&&o.velocity.y<.5&&(h("jump"),Le=!0);return n.clear(),c(ge)},Ve=G(!1),Ge=G(!0);p.airBoost={plain:Ve,boosted:Ge,gain:c(Ge-Ve),lifts:Ge>Ve+.7}}d(31.4,0,-8,Math.PI/2),t.x=1;for(let G=0;G<l(.35);G+=1)a();h("jump");let he=l(.3),Ee=0,Xe=0;for(let G=0;G<l(12)&&(a(),Xe=Math.max(Xe,o.position.y),he>0?(he-=1,he===0&&n.delete("jump")):o.stateName==="wall-slide"&&(h("jump"),he=l(.3),Ee+=1,t.x=-t.x),o.stateName!=="hanging");G+=1);t.x=0,n.clear(),p.manyKicks={kicks:Ee,highest:c(Xe),pastFour:Ee>4},d(31.4,11.6,48.4,Math.PI),t.y=-.35;for(let G=0;G<l(.8);G+=1)a();t.y=0;for(let G=0;G<l(.4);G+=1)a();h("grab"),a(),n.delete("grab");for(let G=0;G<l(.4);G+=1)a();return p.crate={carrying:o.carried!==null},d(0,0,54,Math.PI),p},drive:(e,t={x:0,y:0},n=[],s=1/60)=>{const r=new Set(n),o={move:t,look:{x:0,y:0},isDown:a=>r.has(a),wasPressed:()=>!1,wasReleased:()=>!1};for(let a=0;a<Math.max(1,Math.round(e/s));a+=1)this.player.update(s,o,0);return{state:this.player.stateName,y:Math.round(this.player.position.y*100)/100,speed:Math.round(this.player.speed*100)/100}},probe:(e,t,n,s=8)=>{const r=this.collision.groundProbe(new P(e,t,n),s);return r?{y:Math.round(r.y*1e3)/1e3,normalY:Math.round(r.normal.y*100)/100}:null},renderFrom:(e,t,n,s)=>{const r=this.engine.camera,o=this.player.position;r.position.set(o.x+e,o.y+t,o.z+n),r.lookAt(o.x,o.y+s,o.z),r.updateMatrixWorld(),this.engine.focusShadowsOn(o),this.engine.render(1/60)}}}}const H0=new z0;window.__letsgo=H0;
