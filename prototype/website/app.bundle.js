(()=>{var ac=0,So=1,oc=2;var hr=1,lc=2,Ri=3,Bn=0,be=1,ln=2,cn=0,Ii=1,ur=2,bo=3,To=4,cc=5;var Kn=100,hc=101,uc=102,dc=103,pc=104,fc=200,mc=201,gc=202,_c=203,Eo=204,wo=205,vc=206,xc=207,yc=208,Mc=209,Sc=210,bc=211,Tc=212,Ec=213,wc=214,ts=0,es=1,ns=2,Mi=3,is=4,rs=5,ss=6,as=7,Ao=0,Ac=1,Cc=2,Je=0,Co=1,Ro=2,Io=3,Po=4,Lo=5,No=6,Do=7;var Uo=300,zn=301,Qn=302,Os=303,Bs=304,dr=306,os=1e3,rn=1001,ls=1002,ue=1003,Rc=1004;var pr=1005;var fe=1006,zs=1007;var Vn=1008;var De=1009,Fo=1010,Oo=1011,Pi=1012,Vs=1013,$e=1014,je=1015,Ke=1016,ks=1017,Gs=1018,Li=1020,Bo=35902,zo=35899,Vo=1021,ko=1022,Ve=1023,sn=1026,kn=1027,Go=1028,Hs=1029,Gn=1030,Ws=1031;var Xs=1033,fr=33776,mr=33777,gr=33778,_r=33779,qs=35840,Ys=35841,Zs=35842,Js=35843,$s=36196,js=37492,Ks=37496,Qs=37488,ta=37489,vr=37490,ea=37491,na=37808,ia=37809,ra=37810,sa=37811,aa=37812,oa=37813,la=37814,ca=37815,ha=37816,ua=37817,da=37818,pa=37819,fa=37820,ma=37821,ga=36492,_a=36494,va=36495,xa=36283,ya=36284,xr=36285,Ma=36286;var Hi=2300,cs=2301,Kr=2302,mo=2303,go=2400,_o=2401,vo=2402;var Ic=3200;var Ho=0,Pc=1,Sn="",Le="srgb",Wi="srgb-linear",Xi="linear",Ht="srgb";var Qr=7680;var Lc=519,Nc=512,Dc=513,Uc=514,Sa=515,Fc=516,Oc=517,ba=518,Bc=519,zc=35044;var Wo="300 es",Ze=2e3,qi=2001;function zh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Vh(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Yi(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Vc(){let i=Yi("canvas");return i.style.display="block",i}var Dl={},Si=null;function Xo(...i){let t="THREE."+i.shift();Si?Si("log",t,...i):console.log(t,...i)}function kc(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function yt(...i){i=kc(i);let t="THREE."+i.shift();if(Si)Si("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Tt(...i){i=kc(i);let t="THREE."+i.shift();if(Si)Si("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Jn(...i){let t=i.join(" ");t in Dl||(Dl[t]=!0,yt(...i))}function Gc(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}var Hc={[ts]:es,[ns]:ss,[is]:as,[Mi]:rs,[es]:ts,[ss]:ns,[as]:is,[rs]:Mi},an=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let r=n[t];if(r!==void 0){let s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}},ge=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Xa=Math.PI/180,hs=180/Math.PI;function yr(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ge[i&255]+ge[i>>8&255]+ge[i>>16&255]+ge[i>>24&255]+"-"+ge[t&255]+ge[t>>8&255]+"-"+ge[t>>16&15|64]+ge[t>>24&255]+"-"+ge[e&63|128]+ge[e>>8&255]+"-"+ge[e>>16&255]+ge[e>>24&255]+ge[n&255]+ge[n>>8&255]+ge[n>>16&255]+ge[n>>24&255]).toLowerCase()}function Bt(i,t,e){return Math.max(t,Math.min(e,i))}function kh(i,t){return(i%t+t)%t}function qa(i,t,e){return(1-e)*i+e*t}function Oi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Te(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var $o=class $o{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Bt(this.x,t.x,e.x),this.y=Bt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Bt(this.x,t,e),this.y=Bt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Bt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Bt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*r+t.x,this.y=s*r+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};$o.prototype.isVector2=!0;var Ot=$o,on=class{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,a,l){let c=n[r+0],o=n[r+1],h=n[r+2],f=n[r+3],u=s[a+0],p=s[a+1],_=s[a+2],d=s[a+3];if(f!==d||c!==u||o!==p||h!==_){let M=c*u+o*p+h*_+f*d;M<0&&(u=-u,p=-p,_=-_,d=-d,M=-M);let g=1-l;if(M<.9995){let m=Math.acos(M),T=Math.sin(m);g=Math.sin(g*m)/T,l=Math.sin(l*m)/T,c=c*g+u*l,o=o*g+p*l,h=h*g+_*l,f=f*g+d*l}else{c=c*g+u*l,o=o*g+p*l,h=h*g+_*l,f=f*g+d*l;let m=1/Math.sqrt(c*c+o*o+h*h+f*f);c*=m,o*=m,h*=m,f*=m}}t[e]=c,t[e+1]=o,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,r,s,a){let l=n[r],c=n[r+1],o=n[r+2],h=n[r+3],f=s[a],u=s[a+1],p=s[a+2],_=s[a+3];return t[e]=l*_+h*f+c*p-o*u,t[e+1]=c*_+h*u+o*f-l*p,t[e+2]=o*_+h*p+l*u-c*f,t[e+3]=h*_-l*f-c*u-o*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,r=t._y,s=t._z,a=t._order,l=Math.cos,c=Math.sin,o=l(n/2),h=l(r/2),f=l(s/2),u=c(n/2),p=c(r/2),_=c(s/2);switch(a){case"XYZ":this._x=u*h*f+o*p*_,this._y=o*p*f-u*h*_,this._z=o*h*_+u*p*f,this._w=o*h*f-u*p*_;break;case"YXZ":this._x=u*h*f+o*p*_,this._y=o*p*f-u*h*_,this._z=o*h*_-u*p*f,this._w=o*h*f+u*p*_;break;case"ZXY":this._x=u*h*f-o*p*_,this._y=o*p*f+u*h*_,this._z=o*h*_+u*p*f,this._w=o*h*f-u*p*_;break;case"ZYX":this._x=u*h*f-o*p*_,this._y=o*p*f+u*h*_,this._z=o*h*_-u*p*f,this._w=o*h*f+u*p*_;break;case"YZX":this._x=u*h*f+o*p*_,this._y=o*p*f+u*h*_,this._z=o*h*_-u*p*f,this._w=o*h*f-u*p*_;break;case"XZY":this._x=u*h*f-o*p*_,this._y=o*p*f-u*h*_,this._z=o*h*_+u*p*f,this._w=o*h*f+u*p*_;break;default:yt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],r=e[4],s=e[8],a=e[1],l=e[5],c=e[9],o=e[2],h=e[6],f=e[10],u=n+l+f;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(s-o)*p,this._z=(a-r)*p}else if(n>l&&n>f){let p=2*Math.sqrt(1+n-l-f);this._w=(h-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+o)/p}else if(l>f){let p=2*Math.sqrt(1+l-n-f);this._w=(s-o)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+f-n-l);this._w=(a-r)/p,this._x=(s+o)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Bt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,r=t._y,s=t._z,a=t._w,l=e._x,c=e._y,o=e._z,h=e._w;return this._x=n*h+a*l+r*o-s*c,this._y=r*h+a*c+s*l-n*o,this._z=s*h+a*o+n*c-r*l,this._w=a*h-n*l-r*c-s*o,this._onChangeCallback(),this}slerp(t,e){let n=t._x,r=t._y,s=t._z,a=t._w,l=this.dot(t);l<0&&(n=-n,r=-r,s=-s,a=-a,l=-l);let c=1-e;if(l<.9995){let o=Math.acos(l),h=Math.sin(o);c=Math.sin(c*o)/h,e=Math.sin(e*o)/h,this._x=this._x*c+n*e,this._y=this._y*c+r*e,this._z=this._z*c+s*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+r*e,this._z=this._z*c+s*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},jo=class jo{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ul.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ul.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,r=this.z,s=t.x,a=t.y,l=t.z,c=t.w,o=2*(a*r-l*n),h=2*(l*e-s*r),f=2*(s*n-a*e);return this.x=e+c*o+a*f-l*h,this.y=n+c*h+l*o-s*f,this.z=r+c*f+s*h-a*o,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Bt(this.x,t.x,e.x),this.y=Bt(this.y,t.y,e.y),this.z=Bt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Bt(this.x,t,e),this.y=Bt(this.y,t,e),this.z=Bt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Bt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,r=t.y,s=t.z,a=e.x,l=e.y,c=e.z;return this.x=r*c-s*l,this.y=s*a-n*c,this.z=n*l-r*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ya.copy(this).projectOnVector(t),this.sub(Ya)}reflect(t){return this.sub(Ya.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Bt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};jo.prototype.isVector3=!0;var D=jo,Ya=new D,Ul=new on,Ko=class Ko{constructor(t,e,n,r,s,a,l,c,o){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,l,c,o)}set(t,e,n,r,s,a,l,c,o){let h=this.elements;return h[0]=t,h[1]=r,h[2]=l,h[3]=e,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=o,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,r=e.elements,s=this.elements,a=n[0],l=n[3],c=n[6],o=n[1],h=n[4],f=n[7],u=n[2],p=n[5],_=n[8],d=r[0],M=r[3],g=r[6],m=r[1],T=r[4],E=r[7],A=r[2],b=r[5],R=r[8];return s[0]=a*d+l*m+c*A,s[3]=a*M+l*T+c*b,s[6]=a*g+l*E+c*R,s[1]=o*d+h*m+f*A,s[4]=o*M+h*T+f*b,s[7]=o*g+h*E+f*R,s[2]=u*d+p*m+_*A,s[5]=u*M+p*T+_*b,s[8]=u*g+p*E+_*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],l=t[5],c=t[6],o=t[7],h=t[8];return e*a*h-e*l*o-n*s*h+n*l*c+r*s*o-r*a*c}invert(){let t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],l=t[5],c=t[6],o=t[7],h=t[8],f=h*a-l*o,u=l*c-h*s,p=o*s-a*c,_=e*f+n*u+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let d=1/_;return t[0]=f*d,t[1]=(r*o-h*n)*d,t[2]=(l*n-r*a)*d,t[3]=u*d,t[4]=(h*e-r*c)*d,t[5]=(r*s-l*e)*d,t[6]=p*d,t[7]=(n*c-o*e)*d,t[8]=(a*e-n*s)*d,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,a,l){let c=Math.cos(s),o=Math.sin(s);return this.set(n*c,n*o,-n*(c*a+o*l)+a+t,-r*o,r*c,-r*(-o*a+c*l)+l+e,0,0,1),this}scale(t,e){return Jn("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Za.makeScale(t,e)),this}rotate(t){return Jn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Za.makeRotation(-t)),this}translate(t,e){return Jn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Za.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Ko.prototype.isMatrix3=!0;var Ct=Ko,Za=new Ct,Fl=new Ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ol=new Ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Gh(){let i={enabled:!0,workingColorSpace:Wi,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Ht&&(r.r=yn(r.r),r.g=yn(r.g),r.b=yn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ht&&(r.r=yi(r.r),r.g=yi(r.g),r.b=yi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Sn?Xi:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Jn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Jn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Wi]:{primaries:t,whitePoint:n,transfer:Xi,toXYZ:Fl,fromXYZ:Ol,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Le},outputColorSpaceConfig:{drawingBufferColorSpace:Le}},[Le]:{primaries:t,whitePoint:n,transfer:Ht,toXYZ:Fl,fromXYZ:Ol,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Le}}}),i}var Ft=Gh();function yn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function yi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var oi,us=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{oi===void 0&&(oi=Yi("canvas")),oi.width=t.width,oi.height=t.height;let r=oi.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),n=oi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Yi("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=yn(s[a]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(yn(e[n]/255)*255):e[n]=yn(e[n]);return{data:e,width:t.width,height:t.height}}else return yt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Hh=0,bi=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Hh++}),this.uuid=yr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,l=r.length;a<l;a++)r[a].isDataTexture?s.push(Ja(r[a].image)):s.push(Ja(r[a]))}else s=Ja(r);n.url=s}return e||(t.images[this.uuid]=n),n}};function Ja(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?us.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(yt("Texture: Unable to serialize Texture."),{})}var Wh=0,$a=new D,Ee=class i extends an{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=rn,r=rn,s=fe,a=Vn,l=Ve,c=De,o=i.DEFAULT_ANISOTROPY,h=Sn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=yr(),this.name="",this.source=new bi(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=o,this.format=l,this.internalFormat=null,this.type=c,this.offset=new Ot(0,0),this.repeat=new Ot(1,1),this.center=new Ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize($a).x}get height(){return this.source.getSize($a).y}get depth(){return this.source.getSize($a).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){yt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let r=this[e];if(r===void 0){yt(`Texture.setValues(): property '${e}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Uo)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case os:t.x=t.x-Math.floor(t.x);break;case rn:t.x=t.x<0?0:1;break;case ls:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case os:t.y=t.y-Math.floor(t.y);break;case rn:t.y=t.y<0?0:1;break;case ls:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ee.DEFAULT_IMAGE=null;Ee.DEFAULT_MAPPING=Uo;Ee.DEFAULT_ANISOTROPY=1;var Qo=class Qo{constructor(t=0,e=0,n=0,r=1){this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*r+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s,c=t.elements,o=c[0],h=c[4],f=c[8],u=c[1],p=c[5],_=c[9],d=c[2],M=c[6],g=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-d)<.01&&Math.abs(_-M)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+d)<.1&&Math.abs(_+M)<.1&&Math.abs(o+p+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let T=(o+1)/2,E=(p+1)/2,A=(g+1)/2,b=(h+u)/4,R=(f+d)/4,C=(_+M)/4;return T>E&&T>A?T<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(T),r=b/n,s=R/n):E>A?E<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),n=b/r,s=C/r):A<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),n=R/s,r=C/s),this.set(n,r,s,e),this}let m=Math.sqrt((M-_)*(M-_)+(f-d)*(f-d)+(u-h)*(u-h));return Math.abs(m)<.001&&(m=1),this.x=(M-_)/m,this.y=(f-d)/m,this.z=(u-h)/m,this.w=Math.acos((o+p+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Bt(this.x,t.x,e.x),this.y=Bt(this.y,t.y,e.y),this.z=Bt(this.z,t.z,e.z),this.w=Bt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Bt(this.x,t,e),this.y=Bt(this.y,t,e),this.z=Bt(this.z,t,e),this.w=Bt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Bt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Qo.prototype.isVector4=!0;var Qt=Qo,ds=class extends an{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Qt(0,0,t,e),this.scissorTest=!1,this.viewport=new Qt(0,0,t,e),this.textures=[];let r={width:t,height:e,depth:n.depth},s=new Ee(r),a=n.count;for(let l=0;l<a;l++)this.textures[l]=s.clone(),this.textures[l].isRenderTargetTexture=!0,this.textures[l].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:fe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let r=Object.assign({},t.textures[e].image);this.textures[e].source=new bi(r)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},we=class extends ds{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Zi=class extends Ee{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=ue,this.minFilter=ue,this.wrapR=rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var ps=class extends Ee{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=ue,this.minFilter=ue,this.wrapR=rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Fs=class Fs{constructor(t,e,n,r,s,a,l,c,o,h,f,u,p,_,d,M){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,l,c,o,h,f,u,p,_,d,M)}set(t,e,n,r,s,a,l,c,o,h,f,u,p,_,d,M){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=r,g[1]=s,g[5]=a,g[9]=l,g[13]=c,g[2]=o,g[6]=h,g[10]=f,g[14]=u,g[3]=p,g[7]=_,g[11]=d,g[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Fs().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,r=1/li.setFromMatrixColumn(t,0).length(),s=1/li.setFromMatrixColumn(t,1).length(),a=1/li.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,r=t.y,s=t.z,a=Math.cos(n),l=Math.sin(n),c=Math.cos(r),o=Math.sin(r),h=Math.cos(s),f=Math.sin(s);if(t.order==="XYZ"){let u=a*h,p=a*f,_=l*h,d=l*f;e[0]=c*h,e[4]=-c*f,e[8]=o,e[1]=p+_*o,e[5]=u-d*o,e[9]=-l*c,e[2]=d-u*o,e[6]=_+p*o,e[10]=a*c}else if(t.order==="YXZ"){let u=c*h,p=c*f,_=o*h,d=o*f;e[0]=u+d*l,e[4]=_*l-p,e[8]=a*o,e[1]=a*f,e[5]=a*h,e[9]=-l,e[2]=p*l-_,e[6]=d+u*l,e[10]=a*c}else if(t.order==="ZXY"){let u=c*h,p=c*f,_=o*h,d=o*f;e[0]=u-d*l,e[4]=-a*f,e[8]=_+p*l,e[1]=p+_*l,e[5]=a*h,e[9]=d-u*l,e[2]=-a*o,e[6]=l,e[10]=a*c}else if(t.order==="ZYX"){let u=a*h,p=a*f,_=l*h,d=l*f;e[0]=c*h,e[4]=_*o-p,e[8]=u*o+d,e[1]=c*f,e[5]=d*o+u,e[9]=p*o-_,e[2]=-o,e[6]=l*c,e[10]=a*c}else if(t.order==="YZX"){let u=a*c,p=a*o,_=l*c,d=l*o;e[0]=c*h,e[4]=d-u*f,e[8]=_*f+p,e[1]=f,e[5]=a*h,e[9]=-l*h,e[2]=-o*h,e[6]=p*f+_,e[10]=u-d*f}else if(t.order==="XZY"){let u=a*c,p=a*o,_=l*c,d=l*o;e[0]=c*h,e[4]=-f,e[8]=o*h,e[1]=u*f+d,e[5]=a*h,e[9]=p*f-_,e[2]=_*f-p,e[6]=l*h,e[10]=d*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Xh,t,qh)}lookAt(t,e,n){let r=this.elements;return Ie.subVectors(t,e),Ie.lengthSq()===0&&(Ie.z=1),Ie.normalize(),En.crossVectors(n,Ie),En.lengthSq()===0&&(Math.abs(n.z)===1?Ie.x+=1e-4:Ie.z+=1e-4,Ie.normalize(),En.crossVectors(n,Ie)),En.normalize(),Rr.crossVectors(Ie,En),r[0]=En.x,r[4]=Rr.x,r[8]=Ie.x,r[1]=En.y,r[5]=Rr.y,r[9]=Ie.y,r[2]=En.z,r[6]=Rr.z,r[10]=Ie.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,r=e.elements,s=this.elements,a=n[0],l=n[4],c=n[8],o=n[12],h=n[1],f=n[5],u=n[9],p=n[13],_=n[2],d=n[6],M=n[10],g=n[14],m=n[3],T=n[7],E=n[11],A=n[15],b=r[0],R=r[4],C=r[8],B=r[12],P=r[1],J=r[5],L=r[9],q=r[13],Q=r[2],K=r[6],Y=r[10],U=r[14],H=r[3],et=r[7],Mt=r[11],dt=r[15];return s[0]=a*b+l*P+c*Q+o*H,s[4]=a*R+l*J+c*K+o*et,s[8]=a*C+l*L+c*Y+o*Mt,s[12]=a*B+l*q+c*U+o*dt,s[1]=h*b+f*P+u*Q+p*H,s[5]=h*R+f*J+u*K+p*et,s[9]=h*C+f*L+u*Y+p*Mt,s[13]=h*B+f*q+u*U+p*dt,s[2]=_*b+d*P+M*Q+g*H,s[6]=_*R+d*J+M*K+g*et,s[10]=_*C+d*L+M*Y+g*Mt,s[14]=_*B+d*q+M*U+g*dt,s[3]=m*b+T*P+E*Q+A*H,s[7]=m*R+T*J+E*K+A*et,s[11]=m*C+T*L+E*Y+A*Mt,s[15]=m*B+T*q+E*U+A*dt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],a=t[1],l=t[5],c=t[9],o=t[13],h=t[2],f=t[6],u=t[10],p=t[14],_=t[3],d=t[7],M=t[11],g=t[15],m=c*p-o*u,T=l*p-o*f,E=l*u-c*f,A=a*p-o*h,b=a*u-c*h,R=a*f-l*h;return e*(d*m-M*T+g*E)-n*(_*m-M*A+g*b)+r*(_*T-d*A+g*R)-s*(_*E-d*b+M*R)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],r=t[8],s=t[1],a=t[5],l=t[9],c=t[2],o=t[6],h=t[10];return e*(a*h-l*o)-n*(s*h-l*c)+r*(s*o-a*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],l=t[5],c=t[6],o=t[7],h=t[8],f=t[9],u=t[10],p=t[11],_=t[12],d=t[13],M=t[14],g=t[15],m=e*l-n*a,T=e*c-r*a,E=e*o-s*a,A=n*c-r*l,b=n*o-s*l,R=r*o-s*c,C=h*d-f*_,B=h*M-u*_,P=h*g-p*_,J=f*M-u*d,L=f*g-p*d,q=u*g-p*M,Q=m*q-T*L+E*J+A*P-b*B+R*C;if(Q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let K=1/Q;return t[0]=(l*q-c*L+o*J)*K,t[1]=(r*L-n*q-s*J)*K,t[2]=(d*R-M*b+g*A)*K,t[3]=(u*b-f*R-p*A)*K,t[4]=(c*P-a*q-o*B)*K,t[5]=(e*q-r*P+s*B)*K,t[6]=(M*E-_*R-g*T)*K,t[7]=(h*R-u*E+p*T)*K,t[8]=(a*L-l*P+o*C)*K,t[9]=(n*P-e*L-s*C)*K,t[10]=(_*b-d*E+g*m)*K,t[11]=(f*E-h*b-p*m)*K,t[12]=(l*B-a*J-c*C)*K,t[13]=(e*J-n*B+r*C)*K,t[14]=(d*T-_*A-M*m)*K,t[15]=(h*A-f*T+u*m)*K,this}scale(t){let e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),r=Math.sin(e),s=1-n,a=t.x,l=t.y,c=t.z,o=s*a,h=s*l;return this.set(o*a+n,o*l-r*c,o*c+r*l,0,o*l+r*c,h*l+n,h*c-r*a,0,o*c-r*l,h*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,a){return this.set(1,n,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){let r=this.elements,s=e._x,a=e._y,l=e._z,c=e._w,o=s+s,h=a+a,f=l+l,u=s*o,p=s*h,_=s*f,d=a*h,M=a*f,g=l*f,m=c*o,T=c*h,E=c*f,A=n.x,b=n.y,R=n.z;return r[0]=(1-(d+g))*A,r[1]=(p+E)*A,r[2]=(_-T)*A,r[3]=0,r[4]=(p-E)*b,r[5]=(1-(u+g))*b,r[6]=(M+m)*b,r[7]=0,r[8]=(_+T)*R,r[9]=(M-m)*R,r[10]=(1-(u+d))*R,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){let r=this.elements;t.x=r[12],t.y=r[13],t.z=r[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),e.identity(),this;let a=li.set(r[0],r[1],r[2]).length(),l=li.set(r[4],r[5],r[6]).length(),c=li.set(r[8],r[9],r[10]).length();s<0&&(a=-a),We.copy(this);let o=1/a,h=1/l,f=1/c;return We.elements[0]*=o,We.elements[1]*=o,We.elements[2]*=o,We.elements[4]*=h,We.elements[5]*=h,We.elements[6]*=h,We.elements[8]*=f,We.elements[9]*=f,We.elements[10]*=f,e.setFromRotationMatrix(We),n.x=a,n.y=l,n.z=c,this}makePerspective(t,e,n,r,s,a,l=Ze,c=!1){let o=this.elements,h=2*s/(e-t),f=2*s/(n-r),u=(e+t)/(e-t),p=(n+r)/(n-r),_,d;if(c)_=s/(a-s),d=a*s/(a-s);else if(l===Ze)_=-(a+s)/(a-s),d=-2*a*s/(a-s);else if(l===qi)_=-a/(a-s),d=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return o[0]=h,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=f,o[9]=p,o[13]=0,o[2]=0,o[6]=0,o[10]=_,o[14]=d,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(t,e,n,r,s,a,l=Ze,c=!1){let o=this.elements,h=2/(e-t),f=2/(n-r),u=-(e+t)/(e-t),p=-(n+r)/(n-r),_,d;if(c)_=1/(a-s),d=a/(a-s);else if(l===Ze)_=-2/(a-s),d=-(a+s)/(a-s);else if(l===qi)_=-1/(a-s),d=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return o[0]=h,o[4]=0,o[8]=0,o[12]=u,o[1]=0,o[5]=f,o[9]=0,o[13]=p,o[2]=0,o[6]=0,o[10]=_,o[14]=d,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Fs.prototype.isMatrix4=!0;var Kt=Fs,li=new D,We=new Kt,Xh=new D(0,0,0),qh=new D(1,1,1),En=new D,Rr=new D,Ie=new D,Bl=new Kt,zl=new on,Pn=class i{constructor(t=0,e=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let r=t.elements,s=r[0],a=r[4],l=r[8],c=r[1],o=r[5],h=r[9],f=r[2],u=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(Bt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,o),this._z=0);break;case"YXZ":this._x=Math.asin(-Bt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(l,p),this._z=Math.atan2(c,o)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Bt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,o)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Bt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,o));break;case"YZX":this._z=Math.asin(Bt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,o),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(l,p));break;case"XZY":this._z=Math.asin(-Bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,o),this._y=Math.atan2(l,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:yt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Bl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Bl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return zl.setFromEuler(this),this.setFromQuaternion(zl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Pn.DEFAULT_ORDER="XYZ";var Ji=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Yh=0,Vl=new D,ci=new on,fn=new Kt,Ir=new D,Bi=new D,Zh=new D,Jh=new on,kl=new D(1,0,0),Gl=new D(0,1,0),Hl=new D(0,0,1),Wl={type:"added"},$h={type:"removed"},hi={type:"childadded",child:null},ja={type:"childremoved",child:null},Ae=class i extends an{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yh++}),this.uuid=yr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new D,e=new Pn,n=new on,r=new D(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Kt},normalMatrix:{value:new Ct}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ji,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ci.setFromAxisAngle(t,e),this.quaternion.multiply(ci),this}rotateOnWorldAxis(t,e){return ci.setFromAxisAngle(t,e),this.quaternion.premultiply(ci),this}rotateX(t){return this.rotateOnAxis(kl,t)}rotateY(t){return this.rotateOnAxis(Gl,t)}rotateZ(t){return this.rotateOnAxis(Hl,t)}translateOnAxis(t,e){return Vl.copy(t).applyQuaternion(this.quaternion),this.position.add(Vl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(kl,t)}translateY(t){return this.translateOnAxis(Gl,t)}translateZ(t){return this.translateOnAxis(Hl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(fn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ir.copy(t):Ir.set(t,e,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Bi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fn.lookAt(Bi,Ir,this.up):fn.lookAt(Ir,Bi,this.up),this.quaternion.setFromRotationMatrix(fn),r&&(fn.extractRotation(r.matrixWorld),ci.setFromRotationMatrix(fn),this.quaternion.premultiply(ci.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Tt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Wl),hi.child=t,this.dispatchEvent(hi),hi.child=null):Tt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent($h),ja.child=t,this.dispatchEvent(ja),ja.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),fn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),fn.multiply(t.parent.matrixWorld)),t.applyMatrix4(fn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Wl),hi.child=t,this.dispatchEvent(hi),hi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,t,Zh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,Jh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,r=t.z,s=this.matrix.elements;s[12]+=e-s[0]*e-s[4]*n-s[8]*r,s[13]+=n-s[1]*e-s[5]*n-s[9]*r,s[14]+=r-s[2]*e-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let s=this.children;for(let a=0,l=s.length;a<l;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(l=>({...l})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(l,c){return l[c.uuid]===void 0&&(l[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);let l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){let c=l.shapes;if(Array.isArray(c))for(let o=0,h=c.length;o<h;o++){let f=c[o];s(t.shapes,f)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let l=[];for(let c=0,o=this.material.length;c<o;c++)l.push(s(t.materials,this.material[c]));r.material=l}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){let c=this.animations[l];r.animations.push(s(t.animations,c))}}if(e){let l=a(t.geometries),c=a(t.materials),o=a(t.textures),h=a(t.images),f=a(t.shapes),u=a(t.skeletons),p=a(t.animations),_=a(t.nodes);l.length>0&&(n.geometries=l),c.length>0&&(n.materials=c),o.length>0&&(n.textures=o),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=r,n;function a(l){let c=[];for(let o in l){let h=l[o];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let r=t.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ae.DEFAULT_UP=new D(0,1,0);Ae.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var xn=class extends Ae{constructor(){super(),this.isGroup=!0,this.type="Group"}},jh={type:"move"},Ti=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,a=null,l=this._targetRay,c=this._grip,o=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(o&&t.hand){a=!0;for(let d of t.hand.values()){let M=e.getJointPose(d,n),g=this._getHandJoint(o,d);M!==null&&(g.matrix.fromArray(M.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=M.radius),g.visible=M!==null}let h=o.joints["index-finger-tip"],f=o.joints["thumb-tip"],u=h.position.distanceTo(f.position),p=.02,_=.005;o.inputState.pinching&&u>p+_?(o.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!o.inputState.pinching&&u<=p-_&&(o.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));l!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(jh)))}return l!==null&&(l.visible=r!==null),c!==null&&(c.visible=s!==null),o!==null&&(o.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new xn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Wc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wn={h:0,s:0,l:0},Pr={h:0,s:0,l:0};function Ka(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Dt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Le){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ft.colorSpaceToWorking(this,e),this}setRGB(t,e,n,r=Ft.workingColorSpace){return this.r=t,this.g=e,this.b=n,Ft.colorSpaceToWorking(this,r),this}setHSL(t,e,n,r=Ft.workingColorSpace){if(t=kh(t,1),e=Bt(e,0,1),n=Bt(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=Ka(a,s,t+1/3),this.g=Ka(a,s,t),this.b=Ka(a,s,t-1/3)}return Ft.colorSpaceToWorking(this,r),this}setStyle(t,e=Le){function n(s){s!==void 0&&parseFloat(s)<1&&yt("Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,a=r[1],l=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:yt("Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);yt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Le){let n=Wc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):yt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=yn(t.r),this.g=yn(t.g),this.b=yn(t.b),this}copyLinearToSRGB(t){return this.r=yi(t.r),this.g=yi(t.g),this.b=yi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Le){return Ft.workingToColorSpace(_e.copy(this),t),Math.round(Bt(_e.r*255,0,255))*65536+Math.round(Bt(_e.g*255,0,255))*256+Math.round(Bt(_e.b*255,0,255))}getHexString(t=Le){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Ft.workingColorSpace){Ft.workingToColorSpace(_e.copy(this),e);let n=_e.r,r=_e.g,s=_e.b,a=Math.max(n,r,s),l=Math.min(n,r,s),c,o,h=(l+a)/2;if(l===a)c=0,o=0;else{let f=a-l;switch(o=h<=.5?f/(a+l):f/(2-a-l),a){case n:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-n)/f+2;break;case s:c=(n-r)/f+4;break}c/=6}return t.h=c,t.s=o,t.l=h,t}getRGB(t,e=Ft.workingColorSpace){return Ft.workingToColorSpace(_e.copy(this),e),t.r=_e.r,t.g=_e.g,t.b=_e.b,t}getStyle(t=Le){Ft.workingToColorSpace(_e.copy(this),t);let e=_e.r,n=_e.g,r=_e.b;return t!==Le?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(wn),this.setHSL(wn.h+t,wn.s+e,wn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(wn),t.getHSL(Pr);let n=qa(wn.h,Pr.h,e),r=qa(wn.s,Pr.s,e),s=qa(wn.l,Pr.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},_e=new Dt;Dt.NAMES=Wc;var $i=class extends Ae{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pn,this.environmentIntensity=1,this.environmentRotation=new Pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Xe=new D,mn=new D,Qa=new D,gn=new D,ui=new D,di=new D,Xl=new D,to=new D,eo=new D,no=new D,io=new Qt,ro=new Qt,so=new Qt,In=class i{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Xe.subVectors(t,e),r.cross(Xe);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){Xe.subVectors(r,e),mn.subVectors(n,e),Qa.subVectors(t,e);let a=Xe.dot(Xe),l=Xe.dot(mn),c=Xe.dot(Qa),o=mn.dot(mn),h=mn.dot(Qa),f=a*o-l*l;if(f===0)return s.set(0,0,0),null;let u=1/f,p=(o*c-l*h)*u,_=(a*h-l*c)*u;return s.set(1-p-_,_,p)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,gn)===null?!1:gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getInterpolation(t,e,n,r,s,a,l,c){return this.getBarycoord(t,e,n,r,gn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,gn.x),c.addScaledVector(a,gn.y),c.addScaledVector(l,gn.z),c)}static getInterpolatedAttribute(t,e,n,r,s,a){return io.setScalar(0),ro.setScalar(0),so.setScalar(0),io.fromBufferAttribute(t,e),ro.fromBufferAttribute(t,n),so.fromBufferAttribute(t,r),a.setScalar(0),a.addScaledVector(io,s.x),a.addScaledVector(ro,s.y),a.addScaledVector(so,s.z),a}static isFrontFacing(t,e,n,r){return Xe.subVectors(n,e),mn.subVectors(t,e),Xe.cross(mn).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Xe.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),Xe.cross(mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return i.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,r=this.b,s=this.c,a,l;ui.subVectors(r,n),di.subVectors(s,n),to.subVectors(t,n);let c=ui.dot(to),o=di.dot(to);if(c<=0&&o<=0)return e.copy(n);eo.subVectors(t,r);let h=ui.dot(eo),f=di.dot(eo);if(h>=0&&f<=h)return e.copy(r);let u=c*f-h*o;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(ui,a);no.subVectors(t,s);let p=ui.dot(no),_=di.dot(no);if(_>=0&&p<=_)return e.copy(s);let d=p*o-c*_;if(d<=0&&o>=0&&_<=0)return l=o/(o-_),e.copy(n).addScaledVector(di,l);let M=h*_-p*f;if(M<=0&&f-h>=0&&p-_>=0)return Xl.subVectors(s,r),l=(f-h)/(f-h+(p-_)),e.copy(r).addScaledVector(Xl,l);let g=1/(M+d+u);return a=d*g,l=u*g,e.copy(n).addScaledVector(ui,a).addScaledVector(di,l)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ln=class{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(qe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(qe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=qe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,l=s.count;a<l;a++)t.isMesh===!0?t.getVertexPosition(a,qe):qe.fromBufferAttribute(s,a),qe.applyMatrix4(t.matrixWorld),this.expandByPoint(qe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Lr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Lr.copy(n.boundingBox)),Lr.applyMatrix4(t.matrixWorld),this.union(Lr)}let r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,qe),qe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(zi),Nr.subVectors(this.max,zi),pi.subVectors(t.a,zi),fi.subVectors(t.b,zi),mi.subVectors(t.c,zi),An.subVectors(fi,pi),Cn.subVectors(mi,fi),Xn.subVectors(pi,mi);let e=[0,-An.z,An.y,0,-Cn.z,Cn.y,0,-Xn.z,Xn.y,An.z,0,-An.x,Cn.z,0,-Cn.x,Xn.z,0,-Xn.x,-An.y,An.x,0,-Cn.y,Cn.x,0,-Xn.y,Xn.x,0];return!ao(e,pi,fi,mi,Nr)||(e=[1,0,0,0,1,0,0,0,1],!ao(e,pi,fi,mi,Nr))?!1:(Dr.crossVectors(An,Cn),e=[Dr.x,Dr.y,Dr.z],ao(e,pi,fi,mi,Nr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,qe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(qe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(_n),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},_n=[new D,new D,new D,new D,new D,new D,new D,new D],qe=new D,Lr=new Ln,pi=new D,fi=new D,mi=new D,An=new D,Cn=new D,Xn=new D,zi=new D,Nr=new D,Dr=new D,qn=new D;function ao(i,t,e,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){qn.fromArray(i,s);let l=r.x*Math.abs(qn.x)+r.y*Math.abs(qn.y)+r.z*Math.abs(qn.z),c=t.dot(qn),o=e.dot(qn),h=n.dot(qn);if(Math.max(-Math.max(c,o,h),Math.min(c,o,h))>l)return!1}return!0}var ae=new D,Ur=new Ot,Kh=0,xe=class extends an{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Kh++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=zc,this.updateRanges=[],this.gpuType=je,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ur.fromBufferAttribute(this,e),Ur.applyMatrix3(t),this.setXY(e,Ur.x,Ur.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ae.fromBufferAttribute(this,e),ae.applyMatrix3(t),this.setXYZ(e,ae.x,ae.y,ae.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ae.fromBufferAttribute(this,e),ae.applyMatrix4(t),this.setXYZ(e,ae.x,ae.y,ae.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ae.fromBufferAttribute(this,e),ae.applyNormalMatrix(t),this.setXYZ(e,ae.x,ae.y,ae.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ae.fromBufferAttribute(this,e),ae.transformDirection(t),this.setXYZ(e,ae.x,ae.y,ae.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Oi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Te(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Oi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Oi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Oi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Oi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array),r=Te(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array),r=Te(r,this.array),s=Te(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var ji=class extends xe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ki=class extends xe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ee=class extends xe{constructor(t,e,n){super(new Float32Array(t),e,n)}},Qh=new Ln,Vi=new D,oo=new D,Nn=class{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Qh.setFromPoints(t).getCenter(n);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Vi.subVectors(t,this.center);let e=Vi.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Vi,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(oo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Vi.copy(t.center).add(oo)),this.expandByPoint(Vi.copy(t.center).sub(oo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},tu=0,ze=new Kt,lo=new Ae,gi=new D,Pe=new Ln,ki=new Ln,he=new D,me=class i extends an{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tu++}),this.uuid=yr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(zh(t)?Ki:ji)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Ct().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return ze.makeRotationFromQuaternion(t),this.applyMatrix4(ze),this}rotateX(t){return ze.makeRotationX(t),this.applyMatrix4(ze),this}rotateY(t){return ze.makeRotationY(t),this.applyMatrix4(ze),this}rotateZ(t){return ze.makeRotationZ(t),this.applyMatrix4(ze),this}translate(t,e,n){return ze.makeTranslation(t,e,n),this.applyMatrix4(ze),this}scale(t,e,n){return ze.makeScale(t,e,n),this.applyMatrix4(ze),this}lookAt(t){return lo.lookAt(t),lo.updateMatrix(),this.applyMatrix4(lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gi).negate(),this.translate(gi.x,gi.y,gi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let r=0,s=t.length;r<s;r++){let a=t[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ee(n,3))}else{let n=Math.min(t.length,e.count);for(let r=0;r<n;r++){let s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&yt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ln);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Tt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){let s=e[n];Pe.setFromBufferAttribute(s),this.morphTargetsRelative?(he.addVectors(this.boundingBox.min,Pe.min),this.boundingBox.expandByPoint(he),he.addVectors(this.boundingBox.max,Pe.max),this.boundingBox.expandByPoint(he)):(this.boundingBox.expandByPoint(Pe.min),this.boundingBox.expandByPoint(Pe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Tt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Nn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Tt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){let n=this.boundingSphere.center;if(Pe.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){let l=e[s];ki.setFromBufferAttribute(l),this.morphTargetsRelative?(he.addVectors(Pe.min,ki.min),Pe.expandByPoint(he),he.addVectors(Pe.max,ki.max),Pe.expandByPoint(he)):(Pe.expandByPoint(ki.min),Pe.expandByPoint(ki.max))}Pe.getCenter(n);let r=0;for(let s=0,a=t.count;s<a;s++)he.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(he));if(e)for(let s=0,a=e.length;s<a;s++){let l=e[s],c=this.morphTargetsRelative;for(let o=0,h=l.count;o<h;o++)he.fromBufferAttribute(l,o),c&&(gi.fromBufferAttribute(t,o),he.add(gi)),r=Math.max(r,n.distanceToSquared(he))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Tt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Tt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,r=e.normal,s=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new xe(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let l=[],c=[];for(let C=0;C<n.count;C++)l[C]=new D,c[C]=new D;let o=new D,h=new D,f=new D,u=new Ot,p=new Ot,_=new Ot,d=new D,M=new D;function g(C,B,P){o.fromBufferAttribute(n,C),h.fromBufferAttribute(n,B),f.fromBufferAttribute(n,P),u.fromBufferAttribute(s,C),p.fromBufferAttribute(s,B),_.fromBufferAttribute(s,P),h.sub(o),f.sub(o),p.sub(u),_.sub(u);let J=1/(p.x*_.y-_.x*p.y);isFinite(J)&&(d.copy(h).multiplyScalar(_.y).addScaledVector(f,-p.y).multiplyScalar(J),M.copy(f).multiplyScalar(p.x).addScaledVector(h,-_.x).multiplyScalar(J),l[C].add(d),l[B].add(d),l[P].add(d),c[C].add(M),c[B].add(M),c[P].add(M))}let m=this.groups;m.length===0&&(m=[{start:0,count:t.count}]);for(let C=0,B=m.length;C<B;++C){let P=m[C],J=P.start,L=P.count;for(let q=J,Q=J+L;q<Q;q+=3)g(t.getX(q+0),t.getX(q+1),t.getX(q+2))}let T=new D,E=new D,A=new D,b=new D;function R(C){A.fromBufferAttribute(r,C),b.copy(A);let B=l[C];T.copy(B),T.sub(A.multiplyScalar(A.dot(B))).normalize(),E.crossVectors(b,B);let J=E.dot(c[C])<0?-1:1;a.setXYZW(C,T.x,T.y,T.z,J)}for(let C=0,B=m.length;C<B;++C){let P=m[C],J=P.start,L=P.count;for(let q=J,Q=J+L;q<Q;q+=3)R(t.getX(q+0)),R(t.getX(q+1)),R(t.getX(q+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new xe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);let r=new D,s=new D,a=new D,l=new D,c=new D,o=new D,h=new D,f=new D;if(t)for(let u=0,p=t.count;u<p;u+=3){let _=t.getX(u+0),d=t.getX(u+1),M=t.getX(u+2);r.fromBufferAttribute(e,_),s.fromBufferAttribute(e,d),a.fromBufferAttribute(e,M),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,d),o.fromBufferAttribute(n,M),l.add(h),c.add(h),o.add(h),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(d,c.x,c.y,c.z),n.setXYZ(M,o.x,o.y,o.z)}else for(let u=0,p=e.count;u<p;u+=3)r.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)he.fromBufferAttribute(t,e),he.normalize(),t.setXYZ(e,he.x,he.y,he.z)}toNonIndexed(){function t(l,c){let o=l.array,h=l.itemSize,f=l.normalized,u=new o.constructor(c.length*h),p=0,_=0;for(let d=0,M=c.length;d<M;d++){l.isInterleavedBufferAttribute?p=c[d]*l.data.stride+l.offset:p=c[d]*h;for(let g=0;g<h;g++)u[_++]=o[p++]}return new xe(u,h,f)}if(this.index===null)return yt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,r=this.attributes;for(let l in r){let c=r[l],o=t(c,n);e.setAttribute(l,o)}let s=this.morphAttributes;for(let l in s){let c=[],o=s[l];for(let h=0,f=o.length;h<f;h++){let u=o[h],p=t(u,n);c.push(p)}e.morphAttributes[l]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let l=0,c=a.length;l<c;l++){let o=a[l];e.addGroup(o.start,o.count,o.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let o in c)c[o]!==void 0&&(t[o]=c[o]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let o=n[c];t.data.attributes[c]=o.toJSON(t.data)}let r={},s=!1;for(let c in this.morphAttributes){let o=this.morphAttributes[c],h=[];for(let f=0,u=o.length;f<u;f++){let p=o[f];h.push(p.toJSON(t.data))}h.length>0&&(r[c]=h,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let l=this.boundingSphere;return l!==null&&(t.data.boundingSphere=l.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let r=t.attributes;for(let o in r){let h=r[o];this.setAttribute(o,h.clone(e))}let s=t.morphAttributes;for(let o in s){let h=[],f=s[o];for(let u=0,p=f.length;u<p;u++)h.push(f[u].clone(e));this.morphAttributes[o]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let o=0,h=a.length;o<h;o++){let f=a[o];this.addGroup(f.start,f.count,f.materialIndex)}let l=t.boundingBox;l!==null&&(this.boundingBox=l.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var co=new D,eu=new D,nu=new Ct,Ye=class{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let r=co.subVectors(n,e).cross(eu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let r=t.delta(co),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(r,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||nu.getNormalMatrix(t),r=this.coplanarPoint(co).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},iu=0,Mn=class extends an{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=yr(),this.name="",this.type="Material",this.blending=Ii,this.side=Bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Eo,this.blendDst=wo,this.blendEquation=Kn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Dt(0,0,0),this.blendAlpha=0,this.depthFunc=Mi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Lc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qr,this.stencilZFail=Qr,this.stencilZPass=Qr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){yt(`Material: parameter '${e}' has value of undefined.`);continue}let r=this[e];if(r===void 0){yt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let a=[];for(let l in s){let c=s[l];delete c.metadata,a.push(c)}return a}if(e){let s=r(t.textures),a=r(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Dt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Ye().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ot().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ot().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var vn=new D,ho=new D,Fr=new D,Or=new D,Ei=class{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,vn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=vn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(vn.copy(this.origin).addScaledVector(this.direction,e),vn.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){ho.copy(t).add(e).multiplyScalar(.5),Fr.copy(e).sub(t).normalize(),Or.copy(this.origin).sub(ho);let s=t.distanceTo(e)*.5,a=-this.direction.dot(Fr),l=Or.dot(this.direction),c=-Or.dot(Fr),o=Or.lengthSq(),h=Math.abs(1-a*a),f,u,p,_;if(h>0)if(f=a*c-l,u=a*l-c,_=s*h,f>=0)if(u>=-_)if(u<=_){let d=1/h;f*=d,u*=d,p=f*(f+a*u+2*l)+u*(a*f+u+2*c)+o}else u=s,f=Math.max(0,-(a*u+l)),p=-f*f+u*(u+2*c)+o;else u=-s,f=Math.max(0,-(a*u+l)),p=-f*f+u*(u+2*c)+o;else u<=-_?(f=Math.max(0,-(-a*s+l)),u=f>0?-s:Math.min(Math.max(-s,-c),s),p=-f*f+u*(u+2*c)+o):u<=_?(f=0,u=Math.min(Math.max(-s,-c),s),p=u*(u+2*c)+o):(f=Math.max(0,-(a*s+l)),u=f>0?s:Math.min(Math.max(-s,-c),s),p=-f*f+u*(u+2*c)+o);else u=a>0?-s:s,f=Math.max(0,-(a*u+l)),p=-f*f+u*(u+2*c)+o;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(ho).addScaledVector(Fr,u),p}intersectSphere(t,e){if(t.radius<0)return null;vn.subVectors(t.center,this.origin);let n=vn.dot(this.direction),r=vn.dot(vn)-n*n,s=t.radius*t.radius;if(r>s)return null;let a=Math.sqrt(s-r),l=n-a,c=n+a;return c<0?null:l<0?this.at(c,e):this.at(l,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,a,l,c,o=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return o>=0?(n=(t.min.x-u.x)*o,r=(t.max.x-u.x)*o):(n=(t.max.x-u.x)*o,r=(t.min.x-u.x)*o),h>=0?(s=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(s=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),f>=0?(l=(t.min.z-u.z)*f,c=(t.max.z-u.z)*f):(l=(t.max.z-u.z)*f,c=(t.min.z-u.z)*f),n>c||l>r)||((l>n||n!==n)&&(n=l),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,vn)!==null}intersectTriangle(t,e,n,r,s){let a=this.origin,l=this.direction,c=l.x,o=l.y,h=l.z,f=t.x-a.x,u=t.y-a.y,p=t.z-a.z,_=e.x-a.x,d=e.y-a.y,M=e.z-a.z,g=n.x-a.x,m=n.y-a.y,T=n.z-a.z,E=Math.abs(c),A=Math.abs(o),b=Math.abs(h),R,C,B,P,J,L,q,Q,K,Y,U,H;if(E>=A&&E>=b?(B=c,L=f,K=_,H=g,c>=0?(R=o,C=h,P=u,J=p,q=d,Q=M,Y=m,U=T):(R=h,C=o,P=p,J=u,q=M,Q=d,Y=T,U=m)):A>=b?(B=o,L=u,K=d,H=m,o>=0?(R=h,C=c,P=p,J=f,q=M,Q=_,Y=T,U=g):(R=c,C=h,P=f,J=p,q=_,Q=M,Y=g,U=T)):(B=h,L=p,K=M,H=T,h>=0?(R=c,C=o,P=f,J=u,q=_,Q=d,Y=g,U=m):(R=o,C=c,P=u,J=f,q=d,Q=_,Y=m,U=g)),B===0)return null;let et=R/B,Mt=C/B,dt=1/B,Nt=P-et*L,gt=J-Mt*L,nt=q-et*K,j=Q-Mt*K,ht=Y-et*H,Et=U-Mt*H,pt=ht*j-Et*nt,S=Nt*Et-gt*ht,x=nt*gt-j*Nt;if(r){if(pt<0||S<0||x<0)return null}else if((pt<0||S<0||x<0)&&(pt>0||S>0||x>0))return null;let I=pt+S+x;if(I===0)return null;let V=dt*(pt*L+S*K+x*H);return(I>0?V<0:V>0)?null:this.at(V/I,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Qi=class extends Mn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=Ao,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},ql=new Kt,Yn=new Ei,Br=new Nn,Yl=new D,zr=new D,Vr=new D,kr=new D,uo=new D,Gr=new D,Zl=new D,Hr=new D,Ce=class extends Ae{constructor(t=new me,e=new Qi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let l=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}getVertexPosition(t,e){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(r,t);let l=this.morphTargetInfluences;if(s&&l){Gr.set(0,0,0);for(let c=0,o=s.length;c<o;c++){let h=l[c],f=s[c];h!==0&&(uo.fromBufferAttribute(f,t),a?Gr.addScaledVector(uo,h):Gr.addScaledVector(uo.sub(e),h))}e.add(Gr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Br.copy(n.boundingSphere),Br.applyMatrix4(s),Yn.copy(t.ray).recast(t.near),!(Br.containsPoint(Yn.origin)===!1&&(Yn.intersectSphere(Br,Yl)===null||Yn.origin.distanceToSquared(Yl)>(t.far-t.near)**2))&&(ql.copy(s).invert(),Yn.copy(t.ray).applyMatrix4(ql),!(n.boundingBox!==null&&Yn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Yn)))}_computeIntersections(t,e,n){let r,s=this.geometry,a=this.material,l=s.index,c=s.attributes.position,o=s.attributes.uv,h=s.attributes.uv1,f=s.attributes.normal,u=s.groups,p=s.drawRange;if(l!==null)if(Array.isArray(a))for(let _=0,d=u.length;_<d;_++){let M=u[_],g=a[M.materialIndex],m=Math.max(M.start,p.start),T=Math.min(l.count,Math.min(M.start+M.count,p.start+p.count));for(let E=m,A=T;E<A;E+=3){let b=l.getX(E),R=l.getX(E+1),C=l.getX(E+2);r=Wr(this,g,t,n,o,h,f,b,R,C),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=M.materialIndex,e.push(r))}}else{let _=Math.max(0,p.start),d=Math.min(l.count,p.start+p.count);for(let M=_,g=d;M<g;M+=3){let m=l.getX(M),T=l.getX(M+1),E=l.getX(M+2);r=Wr(this,a,t,n,o,h,f,m,T,E),r&&(r.faceIndex=Math.floor(M/3),e.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,d=u.length;_<d;_++){let M=u[_],g=a[M.materialIndex],m=Math.max(M.start,p.start),T=Math.min(c.count,Math.min(M.start+M.count,p.start+p.count));for(let E=m,A=T;E<A;E+=3){let b=E,R=E+1,C=E+2;r=Wr(this,g,t,n,o,h,f,b,R,C),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=M.materialIndex,e.push(r))}}else{let _=Math.max(0,p.start),d=Math.min(c.count,p.start+p.count);for(let M=_,g=d;M<g;M+=3){let m=M,T=M+1,E=M+2;r=Wr(this,a,t,n,o,h,f,m,T,E),r&&(r.faceIndex=Math.floor(M/3),e.push(r))}}}};function ru(i,t,e,n,r,s,a,l){let c;if(t.side===be?c=n.intersectTriangle(a,s,r,!0,l):c=n.intersectTriangle(r,s,a,t.side===Bn,l),c===null)return null;Hr.copy(l),Hr.applyMatrix4(i.matrixWorld);let o=e.ray.origin.distanceTo(Hr);return o<e.near||o>e.far?null:{distance:o,point:Hr.clone(),object:i}}function Wr(i,t,e,n,r,s,a,l,c,o){i.getVertexPosition(l,zr),i.getVertexPosition(c,Vr),i.getVertexPosition(o,kr);let h=ru(i,t,e,n,zr,Vr,kr,Zl);if(h){let f=new D;In.getBarycoord(Zl,zr,Vr,kr,f),r&&(h.uv=In.getInterpolatedAttribute(r,l,c,o,f,new Ot)),s&&(h.uv1=In.getInterpolatedAttribute(s,l,c,o,f,new Ot)),a&&(h.normal=In.getInterpolatedAttribute(a,l,c,o,f,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:l,b:c,c:o,normal:new D,materialIndex:0};In.getNormal(zr,Vr,kr,u.normal),h.face=u,h.barycoord=f}return h}var fs=class extends Ee{constructor(t=null,e=1,n=1,r,s,a,l,c,o=ue,h=ue,f,u){super(null,a,l,c,o,h,r,s,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Zn=new Nn,su=new Ot(.5,.5),Xr=new D,tr=class{constructor(t=new Ye,e=new Ye,n=new Ye,r=new Ye,s=new Ye,a=new Ye){this.planes=[t,e,n,r,s,a]}set(t,e,n,r,s,a){let l=this.planes;return l[0].copy(t),l[1].copy(e),l[2].copy(n),l[3].copy(r),l[4].copy(s),l[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ze,n=!1){let r=this.planes,s=t.elements,a=s[0],l=s[1],c=s[2],o=s[3],h=s[4],f=s[5],u=s[6],p=s[7],_=s[8],d=s[9],M=s[10],g=s[11],m=s[12],T=s[13],E=s[14],A=s[15];if(r[0].setComponents(o-a,p-h,g-_,A-m).normalize(),r[1].setComponents(o+a,p+h,g+_,A+m).normalize(),r[2].setComponents(o+l,p+f,g+d,A+T).normalize(),r[3].setComponents(o-l,p-f,g-d,A-T).normalize(),n)r[4].setComponents(c,u,M,E).normalize(),r[5].setComponents(o-c,p-u,g-M,A-E).normalize();else if(r[4].setComponents(o-c,p-u,g-M,A-E).normalize(),e===Ze)r[5].setComponents(o+c,p+u,g+M,A+E).normalize();else if(e===qi)r[5].setComponents(c,u,M,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Zn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Zn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Zn)}intersectsSprite(t){Zn.center.set(0,0,0);let e=su.distanceTo(t.center);return Zn.radius=.7071067811865476+e,Zn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Zn)}intersectsSphere(t){let e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let r=e[n];if(Xr.x=r.normal.x>0?t.max.x:t.min.x,Xr.y=r.normal.y>0?t.max.y:t.min.y,Xr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Xr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var $n=class extends Mn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Dt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},ms=new D,gs=new D,Jl=new Kt,Gi=new Ei,qr=new Nn,po=new D,$l=new D,_s=class extends Ae{constructor(t=new me,e=new $n){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let r=1,s=e.count;r<s;r++)ms.fromBufferAttribute(e,r-1),gs.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=ms.distanceTo(gs);t.setAttribute("lineDistance",new ee(n,1))}else yt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qr.copy(n.boundingSphere),qr.applyMatrix4(r),qr.radius+=s,t.ray.intersectsSphere(qr)===!1)return;Jl.copy(r).invert(),Gi.copy(t.ray).applyMatrix4(Jl);let l=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=l*l,o=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let p=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let d=p,M=_-1;d<M;d+=o){let g=h.getX(d),m=h.getX(d+1),T=Yr(this,t,Gi,c,g,m,d);T&&e.push(T)}if(this.isLineLoop){let d=h.getX(_-1),M=h.getX(p),g=Yr(this,t,Gi,c,d,M,_-1);g&&e.push(g)}}else{let p=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let d=p,M=_-1;d<M;d+=o){let g=Yr(this,t,Gi,c,d,d+1,d);g&&e.push(g)}if(this.isLineLoop){let d=Yr(this,t,Gi,c,_-1,p,_-1);d&&e.push(d)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let l=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}};function Yr(i,t,e,n,r,s,a){let l=i.geometry.attributes.position;if(ms.fromBufferAttribute(l,r),gs.fromBufferAttribute(l,s),e.distanceSqToSegment(ms,gs,po,$l)>n)return;po.applyMatrix4(i.matrixWorld);let o=t.ray.origin.distanceTo(po);if(!(o<t.near||o>t.far))return{distance:o,point:$l.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var jl=new D,Kl=new D,wi=class extends _s{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let r=0,s=e.count;r<s;r+=2)jl.fromBufferAttribute(e,r),Kl.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+jl.distanceTo(Kl);t.setAttribute("lineDistance",new ee(n,1))}else yt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var vs=class extends Mn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Dt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Ql=new Kt,xo=new Ei,Zr=new Nn,Jr=new D,er=class extends Ae{constructor(t=new me,e=new vs){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Zr.copy(n.boundingSphere),Zr.applyMatrix4(r),Zr.radius+=s,t.ray.intersectsSphere(Zr)===!1)return;Ql.copy(r).invert(),xo.copy(t.ray).applyMatrix4(Ql);let l=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=l*l,o=n.index,f=n.attributes.position;if(o!==null){let u=Math.max(0,a.start),p=Math.min(o.count,a.start+a.count);for(let _=u,d=p;_<d;_++){let M=o.getX(_);Jr.fromBufferAttribute(f,M),tc(Jr,M,c,r,t,e,this)}}else{let u=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let _=u,d=p;_<d;_++)Jr.fromBufferAttribute(f,_),tc(Jr,_,c,r,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let l=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}};function tc(i,t,e,n,r,s,a){let l=xo.distanceSqToPoint(i);if(l<e){let c=new D;xo.closestPointToPoint(i,c),c.applyMatrix4(n);let o=r.ray.origin.distanceTo(c);if(o<r.near||o>r.far)return;s.push({distance:o,distanceToRay:Math.sqrt(l),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var nr=class extends Ee{constructor(t=[],e=zn,n,r,s,a,l,c,o,h){super(t,e,n,r,s,a,l,c,o,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Dn=class extends Ee{constructor(t,e,n=$e,r,s,a,l=ue,c=ue,o,h=sn,f=1){if(h!==sn&&h!==kn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:f};super(u,r,s,a,l,c,h,n,o),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new bi(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},xs=class extends Dn{constructor(t,e=$e,n=zn,r,s,a=ue,l=ue,c,o=sn){let h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,n,r,s,a,l,c,o),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},ir=class extends Ee{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ai=class i extends me{constructor(t=1,e=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let l=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let c=[],o=[],h=[],f=[],u=0,p=0;_("z","y","x",-1,-1,n,e,t,a,s,0),_("z","y","x",1,-1,n,e,-t,a,s,1),_("x","z","y",1,1,t,n,e,r,a,2),_("x","z","y",1,-1,t,n,-e,r,a,3),_("x","y","z",1,-1,t,e,n,r,s,4),_("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new ee(o,3)),this.setAttribute("normal",new ee(h,3)),this.setAttribute("uv",new ee(f,2));function _(d,M,g,m,T,E,A,b,R,C,B){let P=E/R,J=A/C,L=E/2,q=A/2,Q=b/2,K=R+1,Y=C+1,U=0,H=0,et=new D;for(let Mt=0;Mt<Y;Mt++){let dt=Mt*J-q;for(let Nt=0;Nt<K;Nt++){let gt=Nt*P-L;et[d]=gt*m,et[M]=dt*T,et[g]=Q,o.push(et.x,et.y,et.z),et[d]=0,et[M]=0,et[g]=b>0?1:-1,h.push(et.x,et.y,et.z),f.push(Nt/R),f.push(1-Mt/C),U+=1}}for(let Mt=0;Mt<C;Mt++)for(let dt=0;dt<R;dt++){let Nt=u+dt+K*Mt,gt=u+dt+K*(Mt+1),nt=u+(dt+1)+K*(Mt+1),j=u+(dt+1)+K*Mt;c.push(Nt,gt,j),c.push(gt,nt,j),H+=6}l.addGroup(p,H,B),p+=H,u+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var ys=class i extends me{constructor(t=[],e=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:r};let s=[],a=[];l(r),o(n),h(),this.setAttribute("position",new ee(s,3)),this.setAttribute("normal",new ee(s.slice(),3)),this.setAttribute("uv",new ee(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function l(m){let T=new D,E=new D,A=new D;for(let b=0;b<e.length;b+=3)p(e[b+0],T),p(e[b+1],E),p(e[b+2],A),c(T,E,A,m)}function c(m,T,E,A){let b=A+1,R=[];for(let C=0;C<=b;C++){R[C]=[];let B=m.clone().lerp(E,C/b),P=T.clone().lerp(E,C/b),J=b-C;for(let L=0;L<=J;L++)L===0&&C===b?R[C][L]=B:R[C][L]=B.clone().lerp(P,L/J)}for(let C=0;C<b;C++)for(let B=0;B<2*(b-C)-1;B++){let P=Math.floor(B/2);B%2===0?(u(R[C][P+1]),u(R[C+1][P]),u(R[C][P])):(u(R[C][P+1]),u(R[C+1][P+1]),u(R[C+1][P]))}}function o(m){let T=new D;for(let E=0;E<s.length;E+=3)T.x=s[E+0],T.y=s[E+1],T.z=s[E+2],T.normalize().multiplyScalar(m),s[E+0]=T.x,s[E+1]=T.y,s[E+2]=T.z}function h(){let m=new D;for(let T=0;T<s.length;T+=3){m.x=s[T+0],m.y=s[T+1],m.z=s[T+2];let E=M(m)/2/Math.PI+.5,A=g(m)/Math.PI+.5;a.push(E,1-A)}_(),f()}function f(){for(let m=0;m<a.length;m+=6){let T=a[m+0],E=a[m+2],A=a[m+4],b=Math.max(T,E,A),R=Math.min(T,E,A);b>.9&&R<.1&&(T<.2&&(a[m+0]+=1),E<.2&&(a[m+2]+=1),A<.2&&(a[m+4]+=1))}}function u(m){s.push(m.x,m.y,m.z)}function p(m,T){let E=m*3;T.x=t[E+0],T.y=t[E+1],T.z=t[E+2]}function _(){let m=new D,T=new D,E=new D,A=new D,b=new Ot,R=new Ot,C=new Ot;for(let B=0,P=0;B<s.length;B+=9,P+=6){m.set(s[B+0],s[B+1],s[B+2]),T.set(s[B+3],s[B+4],s[B+5]),E.set(s[B+6],s[B+7],s[B+8]),b.set(a[P+0],a[P+1]),R.set(a[P+2],a[P+3]),C.set(a[P+4],a[P+5]),A.copy(m).add(T).add(E).divideScalar(3);let J=M(A);d(b,P+0,m,J),d(R,P+2,T,J),d(C,P+4,E,J)}}function d(m,T,E,A){A<0&&m.x===1&&(a[T]=m.x-1),E.x===0&&E.z===0&&(a[T]=A/2/Math.PI+.5)}function M(m){return Math.atan2(m.z,-m.x)}function g(m){return Math.atan2(-m.y,Math.sqrt(m.x*m.x+m.z*m.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}};var rr=class i extends ys{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var jn=class i extends me{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};let s=t/2,a=e/2,l=Math.floor(n),c=Math.floor(r),o=l+1,h=c+1,f=t/l,u=e/c,p=[],_=[],d=[],M=[];for(let g=0;g<h;g++){let m=g*u-a;for(let T=0;T<o;T++){let E=T*f-s;_.push(E,-m,0),d.push(0,0,1),M.push(T/l),M.push(1-g/c)}}for(let g=0;g<c;g++)for(let m=0;m<l;m++){let T=m+o*g,E=m+o*(g+1),A=m+1+o*(g+1),b=m+1+o*g;p.push(T,E,b),p.push(E,A,b)}this.setIndex(p),this.setAttribute("position",new ee(_,3)),this.setAttribute("normal",new ee(d,3)),this.setAttribute("uv",new ee(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var sr=class i extends me{constructor(t=1,e=.4,n=64,r=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:e,tubularSegments:n,radialSegments:r,p:s,q:a},n=Math.floor(n),r=Math.floor(r);let l=[],c=[],o=[],h=[],f=new D,u=new D,p=new D,_=new D,d=new D,M=new D,g=new D;for(let T=0;T<=n;++T){let E=T/n*s*Math.PI*2;m(E,s,a,t,p),m(E+.01,s,a,t,_),M.subVectors(_,p),g.addVectors(_,p),d.crossVectors(M,g),g.crossVectors(d,M),d.normalize(),g.normalize();for(let A=0;A<=r;++A){let b=A/r*Math.PI*2,R=-e*Math.cos(b),C=e*Math.sin(b);f.x=p.x+(R*g.x+C*d.x),f.y=p.y+(R*g.y+C*d.y),f.z=p.z+(R*g.z+C*d.z),c.push(f.x,f.y,f.z),u.subVectors(f,p).normalize(),o.push(u.x,u.y,u.z),h.push(T/n),h.push(A/r)}}for(let T=1;T<=n;T++)for(let E=1;E<=r;E++){let A=(r+1)*(T-1)+(E-1),b=(r+1)*T+(E-1),R=(r+1)*T+E,C=(r+1)*(T-1)+E;l.push(A,b,C),l.push(b,R,C)}this.setIndex(l),this.setAttribute("position",new ee(c,3)),this.setAttribute("normal",new ee(o,3)),this.setAttribute("uv",new ee(h,2));function m(T,E,A,b,R){let C=Math.cos(T),B=Math.sin(T),P=A/E*T,J=Math.cos(P);R.x=b*(2+J)*.5*C,R.y=b*(2+J)*B*.5,R.z=b*Math.sin(P)*.5}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}};var Ci=class extends me{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){let e=[],n=new Set,r=new D,s=new D;if(t.index!==null){let a=t.attributes.position,l=t.index,c=t.groups;c.length===0&&(c=[{start:0,count:l.count,materialIndex:0}]);for(let o=0,h=c.length;o<h;++o){let f=c[o],u=f.start,p=f.count;for(let _=u,d=u+p;_<d;_+=3)for(let M=0;M<3;M++){let g=l.getX(_+M),m=l.getX(_+(M+1)%3);r.fromBufferAttribute(a,g),s.fromBufferAttribute(a,m),ec(r,s,n)===!0&&(e.push(r.x,r.y,r.z),e.push(s.x,s.y,s.z))}}}else{let a=t.attributes.position;for(let l=0,c=a.count/3;l<c;l++)for(let o=0;o<3;o++){let h=3*l+o,f=3*l+(o+1)%3;r.fromBufferAttribute(a,h),s.fromBufferAttribute(a,f),ec(r,s,n)===!0&&(e.push(r.x,r.y,r.z),e.push(s.x,s.y,s.z))}}this.setAttribute("position",new ee(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};function ec(i,t,e){let n=`${i.x},${i.y},${i.z}-${t.x},${t.y},${t.z}`,r=`${t.x},${t.y},${t.z}-${i.x},${i.y},${i.z}`;return e.has(n)===!0||e.has(r)===!0?!1:(e.add(n),e.add(r),!0)}function ti(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let r=i[e][n];if(nc(r))r.isRenderTargetTexture?(yt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone();else if(Array.isArray(r))if(nc(r[0])){let s=[];for(let a=0,l=r.length;a<l;a++)s[a]=r[a].clone();t[e][n]=s}else t[e][n]=r.slice();else t[e][n]=r}}return t}function Me(i){let t={};for(let e=0;e<i.length;e++){let n=ti(i[e]);for(let r in n)t[r]=n[r]}return t}function nc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function au(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function qo(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ft.workingColorSpace}var Xc={clone:ti,merge:Me},ou=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ye=class extends Mn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ou,this.fragmentShader=lu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ti(t.uniforms),this.uniformsGroups=au(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let r=t.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=e[r.value]||null;break;case"c":this.uniforms[n].value=new Dt().setHex(r.value);break;case"v2":this.uniforms[n].value=new Ot().fromArray(r.value);break;case"v3":this.uniforms[n].value=new D().fromArray(r.value);break;case"v4":this.uniforms[n].value=new Qt().fromArray(r.value);break;case"m3":this.uniforms[n].value=new Ct().fromArray(r.value);break;case"m4":this.uniforms[n].value=new Kt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Ms=class extends ye{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Ss=class extends Mn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ic,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},bs=class extends Mn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function _i(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function fo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Un=class{constructor(t,e,n,r){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,r=e[n],s=e[n-1];n:{t:{let a;e:{i:if(!(t<r)){for(let l=n+2;;){if(r===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===l)break;if(s=r,r=e[++n],t<r)break t}a=e.length;break e}if(!(t>=s)){let l=e[1];t<l&&(n=2,s=l);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=e[--n-1],t>=s)break t}a=n,n=0;break e}break n}for(;n<a;){let l=n+a>>>1;t<e[l]?a=l:n=l+1}if(r=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,t,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=t*r;for(let a=0;a!==r;++a)e[a]=n[s+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ts=class extends Un{constructor(t,e,n,r){super(t,e,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:go,endingEnd:go}}intervalChanged_(t,e,n){let r=this.parameterPositions,s=t-2,a=t+1,l=r[s],c=r[a];if(l===void 0)switch(this.getSettings_().endingStart){case _o:s=t,l=2*e-n;break;case vo:s=r.length-2,l=e+r[s]-r[s+1];break;default:s=t,l=n}if(c===void 0)switch(this.getSettings_().endingEnd){case _o:a=t,c=2*n-e;break;case vo:a=1,c=n+r[1]-r[0];break;default:a=t-1,c=e}let o=(n-e)*.5,h=this.valueSize;this._weightPrev=o/(e-l),this._weightNext=o/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(t,e,n,r){let s=this.resultBuffer,a=this.sampleValues,l=this.valueSize,c=t*l,o=c-l,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,p=this._weightNext,_=(n-e)/(r-e),d=_*_,M=d*_,g=-u*M+2*u*d-u*_,m=(1+u)*M+(-1.5-2*u)*d+(-.5+u)*_+1,T=(-1-p)*M+(1.5+p)*d+.5*_,E=p*M-p*d;for(let A=0;A!==l;++A)s[A]=g*a[h+A]+m*a[o+A]+T*a[c+A]+E*a[f+A];return s}},Es=class extends Un{constructor(t,e,n,r){super(t,e,n,r)}interpolate_(t,e,n,r){let s=this.resultBuffer,a=this.sampleValues,l=this.valueSize,c=t*l,o=c-l,h=(n-e)/(r-e),f=1-h;for(let u=0;u!==l;++u)s[u]=a[o+u]*f+a[c+u]*h;return s}},ws=class extends Un{constructor(t,e,n,r){super(t,e,n,r)}interpolate_(t){return this.copySampleValue_(t-1)}},As=class extends Un{interpolate_(t,e,n,r){let s=this.resultBuffer,a=this.sampleValues,l=this.valueSize,c=t*l,o=c-l,h=this.inTangents,f=this.outTangents;if(!h||!f){let _=(n-e)/(r-e),d=1-_;for(let M=0;M!==l;++M)s[M]=a[o+M]*d+a[c+M]*_;return s}let u=l*2,p=t-1;for(let _=0;_!==l;++_){let d=a[o+_],M=a[c+_],g=p*u+_*2,m=f[g],T=f[g+1],E=t*u+_*2,A=h[E],b=h[E+1],R=hu(n,e,m,A,r);s[_]=qc(R,d,T,b,M)}return s}};function qc(i,t,e,n,r){let s=1-i;return s*s*s*t+3*s*s*i*e+3*s*i*i*n+i*i*i*r}function cu(i,t,e,n,r){let s=1-i;return 3*s*s*(e-t)+6*s*i*(n-e)+3*i*i*(r-n)}function hu(i,t,e,n,r){let s=(i-t)/(r-t);for(let a=0;a<8;a++){let l=qc(s,t,e,n,r)-i;if(Math.abs(l)<1e-10)break;let c=cu(s,t,e,n,r);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-l/c))}return s}var Ne=class{constructor(t,e,n,r){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=_i(e,this.TimeBufferType),this.values=_i(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:_i(t.times,Array),values:_i(t.values,Array)};let r=t.getInterpolation();r!==t.DefaultInterpolation&&(n.interpolation=r),fo(t.settings)&&(n.settings={inTangents:_i(t.settings.inTangents,Array),outTangents:_i(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ws(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Es(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ts(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new As(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Hi:e=this.InterpolantFactoryMethodDiscrete;break;case cs:e=this.InterpolantFactoryMethodLinear;break;case Kr:e=this.InterpolantFactoryMethodSmooth;break;case mo:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return yt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Hi;case this.InterpolantFactoryMethodLinear:return cs;case this.InterpolantFactoryMethodSmooth:return Kr;case this.InterpolantFactoryMethodBezier:return mo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,r=e.length;n!==r;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,r=e.length;n!==r;++n)e[n]*=t;fo(this.settings)&&(ic(this.settings.inTangents,t),ic(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<t;)++s;for(;a!==-1&&n[a]>e;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let l=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*l,a*l)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Tt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,r=this.values,s=n.length;s===0&&(Tt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let l=0;l!==s;l++){let c=n[l];if(typeof c=="number"&&isNaN(c)){Tt("KeyframeTrack: Time is not a valid number.",this,l,c),t=!1;break}if(a!==null&&a>c){Tt("KeyframeTrack: Out of order keys.",this,l,c,a),t=!1;break}a=c}if(r!==void 0&&Vh(r))for(let l=0,c=r.length;l!==c;++l){let o=r[l];if(isNaN(o)){Tt("KeyframeTrack: Value is not a valid number.",this,l,o),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Kr,s=t.length-1,a=1;for(let l=1;l<s;++l){let c=!1,o=t[l],h=t[l+1];if(o!==h&&(l!==1||o!==t[0]))if(r)c=!0;else{let f=l*n,u=f-n,p=f+n;for(let _=0;_!==n;++_){let d=e[f+_];if(d!==e[u+_]||d!==e[p+_]){c=!0;break}}}if(c){if(l!==a){t[a]=t[l];let f=l*n,u=a*n;for(let p=0;p!==n;++p)e[u+p]=e[f+p]}++a}}if(s>0){t[a]=t[s];for(let l=s*n,c=a*n,o=0;o!==n;++o)e[c+o]=e[l+o];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,r=new n(this.name,t,e);return r.createInterpolant=this.createInterpolant,fo(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function ic(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}Ne.prototype.ValueTypeName="";Ne.prototype.TimeBufferType=Float32Array;Ne.prototype.ValueBufferType=Float32Array;Ne.prototype.DefaultInterpolation=cs;var Fn=class extends Ne{constructor(t,e,n){super(t,e,n)}};Fn.prototype.ValueTypeName="bool";Fn.prototype.ValueBufferType=Array;Fn.prototype.DefaultInterpolation=Hi;Fn.prototype.InterpolantFactoryMethodLinear=void 0;Fn.prototype.InterpolantFactoryMethodSmooth=void 0;var Cs=class extends Ne{constructor(t,e,n,r){super(t,e,n,r)}};Cs.prototype.ValueTypeName="color";var Rs=class extends Ne{constructor(t,e,n,r){super(t,e,n,r)}};Rs.prototype.ValueTypeName="number";var Is=class extends Un{constructor(t,e,n,r){super(t,e,n,r)}interpolate_(t,e,n,r){let s=this.resultBuffer,a=this.sampleValues,l=this.valueSize,c=(n-e)/(r-e),o=t*l;for(let h=o+l;o!==h;o+=4)on.slerpFlat(s,0,a,o-l,a,o,c);return s}},ar=class extends Ne{constructor(t,e,n,r){super(t,e,n,r)}InterpolantFactoryMethodLinear(t){return new Is(this.times,this.values,this.getValueSize(),t)}};ar.prototype.ValueTypeName="quaternion";ar.prototype.InterpolantFactoryMethodSmooth=void 0;var On=class extends Ne{constructor(t,e,n){super(t,e,n)}};On.prototype.ValueTypeName="string";On.prototype.ValueBufferType=Array;On.prototype.DefaultInterpolation=Hi;On.prototype.InterpolantFactoryMethodLinear=void 0;On.prototype.InterpolantFactoryMethodSmooth=void 0;var Ps=class extends Ne{constructor(t,e,n,r){super(t,e,n,r)}};Ps.prototype.ValueTypeName="vector";var Ls=class{constructor(t,e,n){let r=this,s=!1,a=0,l=0,c,o=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){l++,s===!1&&r.onStart!==void 0&&r.onStart(h,a,l),s=!0},this.itemEnd=function(h){a++,r.onProgress!==void 0&&r.onProgress(h,a,l),a===l&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return o.push(h,f),this},this.removeHandler=function(h){let f=o.indexOf(h);return f!==-1&&o.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=o.length;f<u;f+=2){let p=o[f],_=o[f+1];if(p.global&&(p.lastIndex=0),p.test(h))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Yc=new Ls,Ns=class{constructor(t){this.manager=t!==void 0?t:Yc,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(r,s){n.load(t,r,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ns.DEFAULT_MATERIAL_NAME="__DEFAULT";var $r=new D,jr=new on,nn=new D,or=class extends Ae{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=Ze,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose($r,jr,nn),nn.x===1&&nn.y===1&&nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($r,jr,nn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose($r,jr,nn),nn.x===1&&nn.y===1&&nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($r,jr,nn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Rn=new D,rc=new Ot,sc=new Ot,ve=class extends or{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=hs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Xa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return hs*2*Math.atan(Math.tan(Xa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Rn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Rn.x,Rn.y).multiplyScalar(-t/Rn.z),Rn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Rn.x,Rn.y).multiplyScalar(-t/Rn.z)}getViewSize(t,e){return this.getViewBounds(t,rc,sc),e.subVectors(sc,rc)}setViewOffset(t,e,n,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Xa*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,o=a.fullHeight;s+=a.offsetX*r/c,e-=a.offsetY*n/o,r*=a.width/c,n*=a.height/o}let l=this.filmOffset;l!==0&&(s+=t*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var lr=class extends or{constructor(t=-1,e=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-t,a=n+t,l=r+e,c=r-e;if(this.view!==null&&this.view.enabled){let o=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=o*this.view.offsetX,a=s+o*this.view.width,l-=h*this.view.offsetY,c=l-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,l,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var vi=-90,xi=1,Ds=class extends Ae{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new ve(vi,xi,t,e);r.layers=this.layers,this.add(r);let s=new ve(vi,xi,t,e);s.layers=this.layers,this.add(s);let a=new ve(vi,xi,t,e);a.layers=this.layers,this.add(a);let l=new ve(vi,xi,t,e);l.layers=this.layers,this.add(l);let c=new ve(vi,xi,t,e);c.layers=this.layers,this.add(c);let o=new ve(vi,xi,t,e);o.layers=this.layers,this.add(o)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,r,s,a,l,c]=e;for(let o of e)this.remove(o);if(t===Ze)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===qi)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let o of e)this.add(o),o.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,a,l,c,o,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let d=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let M=!1;t.isWebGLRenderer===!0?M=t.state.buffers.depth.getReversed():M=t.reversedDepthBuffer,t.setRenderTarget(n,0,r),M&&t.autoClear===!1&&t.clearDepth(),t.render(e,s),t.setRenderTarget(n,1,r),M&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,r),M&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,3,r),M&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,r),M&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),n.texture.generateMipmaps=d,t.setRenderTarget(n,5,r),M&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,u,p),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},Us=class extends ve{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Yo="\\[\\]\\.:\\/",uu=new RegExp("["+Yo+"]","g"),Zo="[^"+Yo+"]",du="[^"+Yo.replace("\\.","")+"]",pu=/((?:WC+[\/:])*)/.source.replace("WC",Zo),fu=/(WCOD+)?/.source.replace("WCOD",du),mu=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Zo),gu=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Zo),_u=new RegExp("^"+pu+fu+mu+gu+"$"),vu=["material","materials","bones","map"],yo=class{constructor(t,e,n){let r=n||Yt.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,r)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Yt=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(uu,"")}static parseTrackName(t){let e=_u.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);vu.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let a=0;a<s.length;a++){let l=s[a];if(l.name===e||l.uuid===e)return l;let c=n(l.children);if(c)return c}return null},r=n(t.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)t[e++]=n[r]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,r=e.propertyName,s=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){yt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let o=e.objectIndex;switch(n){case"materials":if(!t.material){Tt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Tt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Tt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===o){o=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Tt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Tt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Tt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(o!==void 0){if(t[o]===void 0){Tt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[o]}}let a=t[r];if(a===void 0){let o=e.nodeName;Tt("PropertyBinding: Trying to update property for track: "+o+"."+r+" but it wasn't found.",t);return}let l=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?l=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!t.geometry){Tt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Tt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Yt.Composite=yo;Yt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Yt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Yt.prototype.GetterByBindingType=[Yt.prototype._getValue_direct,Yt.prototype._getValue_array,Yt.prototype._getValue_arrayElement,Yt.prototype._getValue_toArray];Yt.prototype.SetterByBindingTypeAndVersioning=[[Yt.prototype._setValue_direct,Yt.prototype._setValue_direct_setNeedsUpdate,Yt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Yt.prototype._setValue_array,Yt.prototype._setValue_array_setNeedsUpdate,Yt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Yt.prototype._setValue_arrayElement,Yt.prototype._setValue_arrayElement_setNeedsUpdate,Yt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Yt.prototype._setValue_fromArray,Yt.prototype._setValue_fromArray_setNeedsUpdate,Yt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var pg=new Float32Array(1);var cr=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,yt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};var tl=class tl{constructor(t,e,n,r){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,r){let s=this.elements;return s[0]=t,s[2]=e,s[1]=n,s[3]=r,this}};tl.prototype.isMatrix2=!0;var Mo=tl;function Jo(i,t,e,n){let r=xu(n);switch(e){case Vo:return i*t;case Go:return i*t/r.components*r.byteLength;case Hs:return i*t/r.components*r.byteLength;case Gn:return i*t*2/r.components*r.byteLength;case Ws:return i*t*2/r.components*r.byteLength;case ko:return i*t*3/r.components*r.byteLength;case Ve:return i*t*4/r.components*r.byteLength;case Xs:return i*t*4/r.components*r.byteLength;case fr:case mr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case gr:case _r:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ys:case Js:return Math.max(i,16)*Math.max(t,8)/4;case qs:case Zs:return Math.max(i,8)*Math.max(t,8)/2;case $s:case js:case Qs:case ta:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ks:case vr:case ea:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case na:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ia:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ra:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case sa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case aa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case oa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case la:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ca:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ha:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ua:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case da:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case pa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case fa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ma:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ga:case _a:case va:return Math.ceil(i/4)*Math.ceil(t/4)*16;case xa:case ya:return Math.ceil(i/4)*Math.ceil(t/4)*8;case xr:case Ma:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function xu(i){switch(i){case De:case Fo:return{byteLength:1,components:1};case Pi:case Oo:case Ke:return{byteLength:2,components:1};case ks:case Gs:return{byteLength:2,components:4};case $e:case Vs:case je:return{byteLength:4,components:1};case Bo:case zo:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?yt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function mh(){let i=null,t=!1,e=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),e(s,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function Mu(i){let t=new WeakMap;return{get:function(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)},remove:function(e){e.isInterleavedBufferAttribute&&(e=e.data);let n=t.get(e);n&&(i.deleteBuffer(n.buffer),t.delete(e))},update:function(e,n){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let s=t.get(e);return void((!s||s.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version}))}let r=t.get(e);if(r===void 0)t.set(e,(function(s,a){let l=s.array,c=s.usage,o=l.byteLength,h=i.createBuffer(),f;if(i.bindBuffer(a,h),i.bufferData(a,l,c),s.onUploadCallback(),l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)f=s.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else{if(!(l instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);f=i.UNSIGNED_BYTE}return{buffer:h,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:s.version,size:o}})(e,n));else if(r.version<e.version){if(r.size!==e.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,l){let c=a.array,o=a.updateRanges;if(i.bindBuffer(l,s),o.length===0)i.bufferSubData(l,0,c);else{o.sort((f,u)=>f.start-u.start);let h=0;for(let f=1;f<o.length;f++){let u=o[h],p=o[f];p.start<=u.start+u.count+1?u.count=Math.max(u.count,p.start+p.count-u.start):(++h,o[h]=p)}o.length=h+1;for(let f=0,u=o.length;f<u;f++){let p=o[f];i.bufferSubData(l,p.start*c.BYTES_PER_ELEMENT,c,p.start,p.count)}a.clearUpdateRanges()}a.onUploadCallback()})(r.buffer,e,n),r.version=e.version}}}}var Su=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bu=`#ifdef USE_ALPHAHASH
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
#endif`,Tu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Eu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Au=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cu=`#ifdef USE_AOMAP
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
#endif`,Ru=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Iu=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Pu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Nu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Du=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Uu=`#ifdef USE_IRIDESCENCE
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
#endif`,Fu=`#ifdef USE_BUMPMAP
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
#endif`,Ou=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Bu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ku=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Gu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Hu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Wu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Xu=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,qu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Yu=`vec3 transformedNormal = objectNormal;
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
#endif`,Zu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ju=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$u=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ju=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ku="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,td=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,ed=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,nd=`#ifdef USE_ENVMAP
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
#endif`,id=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,sd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ad=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,od=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ld=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cd=`#ifdef USE_GRADIENTMAP
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
}`,hd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ud=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pd=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,fd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
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
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,md=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_d=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,yd=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Md=`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Sd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,bd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Td=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Ed=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ad=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Id=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ld=`#if defined( USE_POINTS_UV )
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
#endif`,Nd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Dd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ud=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Fd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Od=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bd=`#ifdef USE_MORPHTARGETS
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
#endif`,zd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,kd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Gd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Xd=`#ifdef USE_NORMALMAP
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
#endif`,qd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$d=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Kd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ep=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,np=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ip=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,sp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,ap=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,op=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,lp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cp=`#ifdef USE_SKINNING
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
#endif`,hp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,up=`#ifdef USE_SKINNING
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
#endif`,dp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,gp=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_p=`#ifdef USE_TRANSMISSION
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
#endif`,vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Sp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bp=`uniform sampler2D t2D;
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
}`,Tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ep=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ap=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cp=`#include <common>
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
}`,Rp=`#if DEPTH_PACKING == 3200
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
}`,Ip=`#define DISTANCE
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
}`,Pp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Np=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dp=`uniform float scale;
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
}`,Up=`uniform vec3 diffuse;
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
}`,Fp=`#include <common>
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
}`,Op=`uniform vec3 diffuse;
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
}`,Bp=`#define LAMBERT
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
}`,zp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,Vp=`#define MATCAP
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
}`,kp=`#define MATCAP
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
}`,Gp=`#define NORMAL
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
}`,Hp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Wp=`#define PHONG
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
}`,Xp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,qp=`#define STANDARD
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
}`,Yp=`#define STANDARD
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
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,Zp=`#define TOON
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
}`,Jp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,$p=`uniform float size;
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
}`,jp=`uniform vec3 diffuse;
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
}`,Kp=`#include <common>
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
}`,Qp=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,tf=`uniform float rotation;
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
}`,ef=`uniform vec3 diffuse;
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
}`,Lt={alphahash_fragment:Su,alphahash_pars_fragment:bu,alphamap_fragment:Tu,alphamap_pars_fragment:Eu,alphatest_fragment:wu,alphatest_pars_fragment:Au,aomap_fragment:Cu,aomap_pars_fragment:Ru,batching_pars_vertex:Iu,batching_vertex:Pu,begin_vertex:Lu,beginnormal_vertex:Nu,bsdfs:Du,iridescence_fragment:Uu,bumpmap_pars_fragment:Fu,clipping_planes_fragment:Ou,clipping_planes_pars_fragment:Bu,clipping_planes_pars_vertex:zu,clipping_planes_vertex:Vu,color_fragment:ku,color_pars_fragment:Gu,color_pars_vertex:Hu,color_vertex:Wu,common:Xu,cube_uv_reflection_fragment:qu,defaultnormal_vertex:Yu,displacementmap_pars_vertex:Zu,displacementmap_vertex:Ju,emissivemap_fragment:$u,emissivemap_pars_fragment:ju,colorspace_fragment:Ku,colorspace_pars_fragment:Qu,envmap_fragment:td,envmap_common_pars_fragment:ed,envmap_pars_fragment:nd,envmap_pars_vertex:id,envmap_physical_pars_fragment:fd,envmap_vertex:rd,fog_vertex:sd,fog_pars_vertex:ad,fog_fragment:od,fog_pars_fragment:ld,gradientmap_pars_fragment:cd,lightmap_pars_fragment:hd,lights_lambert_fragment:ud,lights_lambert_pars_fragment:dd,lights_pars_begin:pd,lights_toon_fragment:md,lights_toon_pars_fragment:gd,lights_phong_fragment:_d,lights_phong_pars_fragment:vd,lights_physical_fragment:xd,lights_physical_pars_fragment:yd,lights_fragment_begin:Md,lights_fragment_maps:Sd,lights_fragment_end:bd,lightprobes_pars_fragment:Td,logdepthbuf_fragment:Ed,logdepthbuf_pars_fragment:wd,logdepthbuf_pars_vertex:Ad,logdepthbuf_vertex:Cd,map_fragment:Rd,map_pars_fragment:Id,map_particle_fragment:Pd,map_particle_pars_fragment:Ld,metalnessmap_fragment:Nd,metalnessmap_pars_fragment:Dd,morphinstance_vertex:Ud,morphcolor_vertex:Fd,morphnormal_vertex:Od,morphtarget_pars_vertex:Bd,morphtarget_vertex:zd,normal_fragment_begin:Vd,normal_fragment_maps:kd,normal_pars_fragment:Gd,normal_pars_vertex:Hd,normal_vertex:Wd,normalmap_pars_fragment:Xd,clearcoat_normal_fragment_begin:qd,clearcoat_normal_fragment_maps:Yd,clearcoat_pars_fragment:Zd,iridescence_pars_fragment:Jd,opaque_fragment:$d,packing:jd,premultiplied_alpha_fragment:Kd,project_vertex:Qd,dithering_fragment:tp,dithering_pars_fragment:ep,roughnessmap_fragment:np,roughnessmap_pars_fragment:ip,shadowmap_pars_fragment:rp,shadowmap_pars_vertex:sp,shadowmap_vertex:ap,shadowmask_pars_fragment:op,skinbase_vertex:lp,skinning_pars_vertex:cp,skinning_vertex:hp,skinnormal_vertex:up,specularmap_fragment:dp,specularmap_pars_fragment:pp,tonemapping_fragment:fp,tonemapping_pars_fragment:mp,transmission_fragment:gp,transmission_pars_fragment:_p,uv_pars_fragment:vp,uv_pars_vertex:xp,uv_vertex:yp,worldpos_vertex:Mp,background_vert:Sp,background_frag:bp,backgroundCube_vert:Tp,backgroundCube_frag:Ep,cube_vert:wp,cube_frag:Ap,depth_vert:Cp,depth_frag:Rp,distance_vert:Ip,distance_frag:Pp,equirect_vert:Lp,equirect_frag:Np,linedashed_vert:Dp,linedashed_frag:Up,meshbasic_vert:Fp,meshbasic_frag:Op,meshlambert_vert:Bp,meshlambert_frag:zp,meshmatcap_vert:Vp,meshmatcap_frag:kp,meshnormal_vert:Gp,meshnormal_frag:Hp,meshphong_vert:Wp,meshphong_frag:Xp,meshphysical_vert:qp,meshphysical_frag:Yp,meshtoon_vert:Zp,meshtoon_frag:Jp,points_vert:$p,points_frag:jp,shadow_vert:Kp,shadow_frag:Qp,sprite_vert:tf,sprite_frag:ef},at={common:{diffuse:{value:new Dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ct},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ct}},envmap:{envMap:{value:null},envMapRotation:{value:new Ct},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ct},normalScale:{value:new Ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new Dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0},uvTransform:{value:new Ct}},sprite:{diffuse:{value:new Dt(16777215)},opacity:{value:1},center:{value:new Ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ct},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0}}},un={basic:{uniforms:Me([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Lt.meshbasic_vert,fragmentShader:Lt.meshbasic_frag},lambert:{uniforms:Me([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Dt(0)},envMapIntensity:{value:1}}]),vertexShader:Lt.meshlambert_vert,fragmentShader:Lt.meshlambert_frag},phong:{uniforms:Me([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Dt(0)},specular:{value:new Dt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Lt.meshphong_vert,fragmentShader:Lt.meshphong_frag},standard:{uniforms:Me([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Lt.meshphysical_vert,fragmentShader:Lt.meshphysical_frag},toon:{uniforms:Me([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Dt(0)}}]),vertexShader:Lt.meshtoon_vert,fragmentShader:Lt.meshtoon_frag},matcap:{uniforms:Me([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Lt.meshmatcap_vert,fragmentShader:Lt.meshmatcap_frag},points:{uniforms:Me([at.points,at.fog]),vertexShader:Lt.points_vert,fragmentShader:Lt.points_frag},dashed:{uniforms:Me([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Lt.linedashed_vert,fragmentShader:Lt.linedashed_frag},depth:{uniforms:Me([at.common,at.displacementmap]),vertexShader:Lt.depth_vert,fragmentShader:Lt.depth_frag},normal:{uniforms:Me([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Lt.meshnormal_vert,fragmentShader:Lt.meshnormal_frag},sprite:{uniforms:Me([at.sprite,at.fog]),vertexShader:Lt.sprite_vert,fragmentShader:Lt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Lt.background_vert,fragmentShader:Lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ct}},vertexShader:Lt.backgroundCube_vert,fragmentShader:Lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Lt.cube_vert,fragmentShader:Lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Lt.equirect_vert,fragmentShader:Lt.equirect_frag},distance:{uniforms:Me([at.common,at.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Lt.distance_vert,fragmentShader:Lt.distance_frag},shadow:{uniforms:Me([at.lights,at.fog,{color:{value:new Dt(0)},opacity:{value:1}}]),vertexShader:Lt.shadow_vert,fragmentShader:Lt.shadow_frag}};un.physical={uniforms:Me([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ct},clearcoatNormalScale:{value:new Ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ct},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ct},sheen:{value:0},sheenColor:{value:new Dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ct},transmissionSamplerSize:{value:new Ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ct},attenuationDistance:{value:0},attenuationColor:{value:new Dt(0)},specularColor:{value:new Dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ct},anisotropyVector:{value:new Ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ct}}]),vertexShader:Lt.meshphysical_vert,fragmentShader:Lt.meshphysical_frag};var Ta={r:0,b:0,g:0},nf=new Kt,gh=new Ct;function rf(i,t,e,n,r,s){let a=new Dt(0),l,c,o=r===!0?0:1,h=null,f=0,u=null;function p(d){let M=d.isScene===!0?d.background:null;if(M&&M.isTexture){let g=d.backgroundBlurriness>0;M=t.get(M,g)}return M}function _(d,M){d.getRGB(Ta,qo(i)),e.buffers.color.setClear(Ta.r,Ta.g,Ta.b,M,s)}return{getClearColor:function(){return a},setClearColor:function(d,M=1){a.set(d),o=M,_(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(d){o=d,_(a,o)},render:function(d){let M=!1,g=p(d);g===null?_(a,o):g&&g.isColor&&(_(g,1),M=!0);let m=i.xr.getEnvironmentBlendMode();m==="additive"?e.buffers.color.setClear(0,0,0,1,s):m==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,s),(i.autoClear||M)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(d,M){let g=p(M);g&&(g.isCubeTexture||g.mapping===dr)?(c===void 0&&(c=new Ce(new Ai(1,1,1),new ye({name:"BackgroundCubeMaterial",uniforms:ti(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:be,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(m,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=g,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(nf.makeRotationFromEuler(M.backgroundRotation)).transpose(),g.isCubeTexture&&g.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(gh),c.material.toneMapped=Ft.getTransfer(g.colorSpace)!==Ht,h===g&&f===g.version&&u===i.toneMapping||(c.material.needsUpdate=!0,h=g,f=g.version,u=i.toneMapping),c.layers.enableAll(),d.unshift(c,c.geometry,c.material,0,0,null)):g&&g.isTexture&&(l===void 0&&(l=new Ce(new jn(2,2),new ye({name:"BackgroundMaterial",uniforms:ti(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=g,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Ft.getTransfer(g.colorSpace)!==Ht,g.matrixAutoUpdate===!0&&g.updateMatrix(),l.material.uniforms.uvTransform.value.copy(g.matrix),h===g&&f===g.version&&u===i.toneMapping||(l.material.needsUpdate=!0,h=g,f=g.version,u=i.toneMapping),l.layers.enableAll(),d.unshift(l,l.geometry,l.material,0,0,null))},dispose:function(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}}}function sf(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=o(null),s=r,a=!1;function l(g){return i.bindVertexArray(g)}function c(g){return i.deleteVertexArray(g)}function o(g){let m=[],T=[],E=[];for(let A=0;A<e;A++)m[A]=0,T[A]=0,E[A]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:m,enabledAttributes:T,attributeDivisors:E,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let m=0,T=g.length;m<T;m++)g[m]=0}function f(g){u(g,0)}function u(g,m){let T=s.newAttributes,E=s.enabledAttributes,A=s.attributeDivisors;T[g]=1,E[g]===0&&(i.enableVertexAttribArray(g),E[g]=1),A[g]!==m&&(i.vertexAttribDivisor(g,m),A[g]=m)}function p(){let g=s.newAttributes,m=s.enabledAttributes;for(let T=0,E=m.length;T<E;T++)m[T]!==g[T]&&(i.disableVertexAttribArray(T),m[T]=0)}function _(g,m,T,E,A,b,R){R===!0?i.vertexAttribIPointer(g,m,T,A,b):i.vertexAttribPointer(g,m,T,E,A,b)}function d(){M(),a=!0,s!==r&&(s=r,l(s.object))}function M(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(g,m,T,E,A){let b=!1,R=(function(C,B,P,J){let L=J.wireframe===!0,q=n[B.id];q===void 0&&(q={},n[B.id]=q);let Q=C.isInstancedMesh===!0?C.id:0,K=q[Q];K===void 0&&(K={},q[Q]=K);let Y=K[P.id];Y===void 0&&(Y={},K[P.id]=Y);let U=Y[L];return U===void 0&&(U=o(i.createVertexArray()),Y[L]=U),U})(g,E,T,m);s!==R&&(s=R,l(s.object)),b=(function(C,B,P,J){let L=s.attributes,q=B.attributes,Q=0,K=P.getAttributes();for(let Y in K)if(K[Y].location>=0){let U=L[Y],H=q[Y];if(H===void 0&&(Y==="instanceMatrix"&&C.instanceMatrix&&(H=C.instanceMatrix),Y==="instanceColor"&&C.instanceColor&&(H=C.instanceColor)),U===void 0||U.attribute!==H||H&&U.data!==H.data)return!0;Q++}return s.attributesNum!==Q||s.index!==J})(g,E,T,A),b&&(function(C,B,P,J){let L={},q=B.attributes,Q=0,K=P.getAttributes();for(let Y in K)if(K[Y].location>=0){let U=q[Y];U===void 0&&(Y==="instanceMatrix"&&C.instanceMatrix&&(U=C.instanceMatrix),Y==="instanceColor"&&C.instanceColor&&(U=C.instanceColor));let H={};H.attribute=U,U&&U.data&&(H.data=U.data),L[Y]=H,Q++}s.attributes=L,s.attributesNum=Q,s.index=J})(g,E,T,A),A!==null&&t.update(A,i.ELEMENT_ARRAY_BUFFER),(b||a)&&(a=!1,(function(C,B,P,J){h();let L=J.attributes,q=P.getAttributes(),Q=B.defaultAttributeValues;for(let K in q){let Y=q[K];if(Y.location>=0){let U=L[K];if(U===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(U=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(U=C.instanceColor)),U!==void 0){let H=U.normalized,et=U.itemSize,Mt=t.get(U);if(Mt===void 0)continue;let dt=Mt.buffer,Nt=Mt.type,gt=Mt.bytesPerElement,nt=Nt===i.INT||Nt===i.UNSIGNED_INT||U.gpuType===Vs;if(U.isInterleavedBufferAttribute){let j=U.data,ht=j.stride,Et=U.offset;if(j.isInstancedInterleavedBuffer){for(let pt=0;pt<Y.locationSize;pt++)u(Y.location+pt,j.meshPerAttribute);C.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let pt=0;pt<Y.locationSize;pt++)f(Y.location+pt);i.bindBuffer(i.ARRAY_BUFFER,dt);for(let pt=0;pt<Y.locationSize;pt++)_(Y.location+pt,et/Y.locationSize,Nt,H,ht*gt,(Et+et/Y.locationSize*pt)*gt,nt)}else{if(U.isInstancedBufferAttribute){for(let j=0;j<Y.locationSize;j++)u(Y.location+j,U.meshPerAttribute);C.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=U.meshPerAttribute*U.count)}else for(let j=0;j<Y.locationSize;j++)f(Y.location+j);i.bindBuffer(i.ARRAY_BUFFER,dt);for(let j=0;j<Y.locationSize;j++)_(Y.location+j,et/Y.locationSize,Nt,H,et*gt,et/Y.locationSize*j*gt,nt)}}else if(Q!==void 0){let H=Q[K];if(H!==void 0)switch(H.length){case 2:i.vertexAttrib2fv(Y.location,H);break;case 3:i.vertexAttrib3fv(Y.location,H);break;case 4:i.vertexAttrib4fv(Y.location,H);break;default:i.vertexAttrib1fv(Y.location,H)}}}}p()})(g,m,T,E),A!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(A).buffer))},reset:d,resetDefaultState:M,dispose:function(){d();for(let g in n){let m=n[g];for(let T in m){let E=m[T];for(let A in E){let b=E[A];for(let R in b)c(b[R].object),delete b[R];delete E[A]}}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let m=n[g.id];for(let T in m){let E=m[T];for(let A in E){let b=E[A];for(let R in b)c(b[R].object),delete b[R];delete E[A]}}delete n[g.id]},releaseStatesOfObject:function(g){for(let m in n){let T=n[m],E=g.isInstancedMesh===!0?g.id:0,A=T[E];if(A!==void 0){for(let b in A){let R=A[b];for(let C in R)c(R[C].object),delete R[C];delete A[b]}delete T[E],Object.keys(T).length===0&&delete n[m]}}},releaseStatesOfProgram:function(g){for(let m in n){let T=n[m];for(let E in T){let A=T[E];if(A[g.id]===void 0)continue;let b=A[g.id];for(let R in b)c(b[R].object),delete b[R];delete A[g.id]}}},initAttributes:h,enableAttribute:f,disableUnusedAttributes:p}}function af(i,t,e){let n;this.setMode=function(r){n=r},this.render=function(r,s){i.drawArrays(n,r,s),e.update(s,n,1)},this.renderInstances=function(r,s,a){a!==0&&(i.drawArraysInstanced(n,r,s,a),e.update(s,n,a))},this.renderMultiDraw=function(r,s,a){if(a===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,r,0,s,0,a);let l=0;for(let c=0;c<a;c++)l+=s[c];e.update(l,n,1)}}function of(i,t,e,n){let r;function s(h){if(h==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";h="mediump"}return h==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=e.precision!==void 0?e.precision:"highp",l=s(a);l!==a&&(yt("WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);let c=e.logarithmicDepthBuffer===!0,o=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");return e.reversedDepthBuffer===!0&&o===!1&&yt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){let h=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:s,textureFormatReadable:function(h){return h===Ve||n.convert(h)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(h){let f=h===Ke&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(h!==De&&h!==je&&!f&&n.convert(h)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:o,maxTextures:i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),maxVertexTextures:i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),maxSamples:i.getParameter(i.MAX_SAMPLES),samples:i.getParameter(i.SAMPLES)}}function lf(i){let t=this,e=null,n=0,r=!1,s=!1,a=new Ye,l=new Ct,c={value:null,needsUpdate:!1};function o(h,f,u,p){let _=h!==null?h.length:0,d=null;if(_!==0){if(d=c.value,p!==!0||d===null){let M=u+4*_,g=f.matrixWorldInverse;l.getNormalMatrix(g),(d===null||d.length<M)&&(d=new Float32Array(M));for(let m=0,T=u;m!==_;++m,T+=4)a.copy(h[m]).applyMatrix4(g,l),a.normal.toArray(d,T),d[T+3]=a.constant}c.value=d,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,d}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){let u=h.length!==0||f||n!==0||r;return r=f,n=h.length,u},this.beginShadows=function(){s=!0,o(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){e=o(h,f,0)},this.setState=function(h,f,u){let p=h.clippingPlanes,_=h.clipIntersection,d=h.clipShadows,M=i.get(h);if(!r||p===null||p.length===0||s&&!d)s?o(null):(function(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0})();else{let g=s?0:n,m=4*g,T=M.clippingState||null;c.value=T,T=o(p,f,m,u);for(let E=0;E!==m;++E)T[E]=e[E];M.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=g}}}gh.set(-1,0,0,0,1,0,0,0,1);var Mr=new lr,Zc=new Dt,el=null,nl=0,il=0,rl=!1,cf=new D,ei=new D,wa=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,r=100,s={}){let{size:a=256,position:l=cf}=s;el=this._renderer.getRenderTarget(),nl=this._renderer.getActiveCubeFace(),il=this._renderer.getActiveMipmapLevel(),rl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,r,c,l),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=jc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$c(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(el,nl,il),this._renderer.xr.enabled=rl,t.scissorTest=!1,Ni(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===zn||t.mapping===Qn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),el=this._renderer.getRenderTarget(),nl=this._renderer.getActiveCubeFace(),il=this._renderer.getActiveMipmapLevel(),rl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:fe,minFilter:fe,generateMipmaps:!1,type:Ke,format:Ve,colorSpace:Wi,depthBuffer:!1},r=Jc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Jc(t,e,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=hf(s)),this._blurMaterial=df(s,t,e),this._ggxMaterial=uf(s,t,e)}return r}_compileMaterial(t){let e=new Ce(new me,t);this._renderer.compile(e,Mr)}_sceneToCubeUV(t,e,n,r,s){let a=new ve(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],o=this._renderer,h=o.autoClear,f=o.toneMapping;o.getClearColor(Zc),o.toneMapping=Je,o.autoClear=!1,o.state.buffers.depth.getReversed()&&(o.setRenderTarget(r),o.clearDepth(),o.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ce(new Ai,new Qi({name:"PMREM.Background",side:be,depthWrite:!1,depthTest:!1})));let u=this._backgroundBox,p=u.material,_=!1,d=t.background;d?d.isColor&&(p.color.copy(d),t.background=null,_=!0):(p.color.copy(Zc),_=!0);for(let M=0;M<6;M++){let g=M%3;g===0?(a.up.set(0,l[M],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[M],s.y,s.z)):g===1?(a.up.set(0,0,l[M]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[M],s.z)):(a.up.set(0,l[M],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[M]));let m=this._cubeSize;Ni(r,g*m,M>2?m:0,m,m),o.setRenderTarget(r),_&&o.render(u,a),o.render(t,a)}o.toneMapping=f,o.autoClear=h,t.background=d}_textureToCubeUV(t,e){let n=this._renderer,r=t.mapping===zn||t.mapping===Qn;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=jc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$c());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s,s.uniforms.envMap.value=t;let l=this._cubeSize;Ni(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Mr)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=n}_applyGGXFilter(t,e,n){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,l=this._lodMeshes[n];l.material=a;let c=a.uniforms,o=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),f=Math.sqrt(o*o-h*h)*(1.25*o),{_lodMax:u}=this,p=this._sizeLods[n],_=3*p*(n>u-4?n-u+4:0),d=4*(this._cubeSize-p);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=u-e,Ni(s,_,d,3*p,2*p),r.setRenderTarget(s),r.render(l,Mr),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=u-n,Ni(t,_,d,3*p,2*p),r.setRenderTarget(t),r.render(l,Mr)}_blur(t,e,n,r){let s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(t,s,e,n,a),this._blurPass(s,t,n,n,a)}_blurPass(t,e,n,r,s){let a=this._renderer,l=this._blurMaterial,c=this._lodMeshes[r];c.material=l;let o=l.uniforms;o.envMap.value=t.texture,o.sigma.value=s,o.mipInt.value=this._lodMax-n;let h=this._sizeLods[r];Ni(e,3*h*(r>this._lodMax-4?r-this._lodMax+4:0),4*(this._cubeSize-h),3*h,2*h),a.setRenderTarget(e),a.render(c,Mr)}};function hf(i){let t=[],e=[],n=i,r=i-4+1+6;for(let s=0;s<r;s++){let a=Math.pow(2,n);t.push(a);let l=1/(a-2),c=-l,o=1+l,h=[c,c,o,c,o,o,c,c,o,o,c,o],f=6,u=6,p=3,_=new Float32Array(p*u*f),d=new Float32Array(p*u*f);for(let g=0;g<f;g++){let m=g%3*2/3-1,T=g>2?0:-1,E=[m,T,0,m+2/3,T,0,m+2/3,T+1,0,m,T,0,m+2/3,T+1,0,m,T+1,0];_.set(E,p*u*g);for(let A=0;A<u;A++){let b=2*h[2*A]-1,R=2*h[2*A+1]-1;g===0?ei.set(1,R,b):g===1?ei.set(-b,1,-R):g===2?ei.set(-b,R,1):g===3?ei.set(-1,R,-b):g===4?ei.set(-b,-1,R):ei.set(b,R,-1),ei.toArray(d,(g*u+A)*p)}}let M=new me;M.setAttribute("position",new xe(_,p)),M.setAttribute("outputDirection",new xe(d,p)),e.push(new Ce(M,null)),n>4&&n--}return{lodMeshes:e,sizeLods:t}}function Jc(i,t,e){let n=new we(i,t,e);return n.texture.mapping=dr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ni(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function uf(i,t,e){return new ye({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:256,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ra(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:cn,depthTest:!1,depthWrite:!1})}function df(i,t,e){return new ye({name:"SphericalGaussianBlur",defines:{SAMPLES:20,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ra(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:cn,depthTest:!1,depthWrite:!1})}function $c(){return new ye({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ra(),fragmentShader:`

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
		`,blending:cn,depthTest:!1,depthWrite:!1})}function jc(){return new ye({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:cn,depthTest:!1,depthWrite:!1})}function Ra(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Aa=class extends we{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new nr(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ai(5,5,5),s=new ye({name:"CubemapFromEquirect",uniforms:ti(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:be,blending:cn});s.uniforms.tEquirect.value=e;let a=new Ce(r,s),l=e.minFilter;return e.minFilter===Vn&&(e.minFilter=fe),new Ds(1,10,this).update(t,a),e.minFilter=l,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,r=!0){let s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,r);t.setRenderTarget(s)}};function pf(i){let t=new WeakMap,e=new WeakMap,n=null;function r(l,c){return c===Os?l.mapping=zn:c===Bs&&(l.mapping=Qn),l}function s(l){let c=l.target;c.removeEventListener("dispose",s);let o=t.get(c);o!==void 0&&(t.delete(c),o.dispose())}function a(l){let c=l.target;c.removeEventListener("dispose",a);let o=e.get(c);o!==void 0&&(e.delete(c),o.dispose())}return{get:function(l,c=!1){return l==null?null:c?(function(o){if(o&&o.isTexture){let h=o.mapping,f=h===Os||h===Bs,u=h===zn||h===Qn;if(f||u){let p=e.get(o),_=p!==void 0?p.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==_)return n===null&&(n=new wa(i)),p=f?n.fromEquirectangular(o,p):n.fromCubemap(o,p),p.texture.pmremVersion=o.pmremVersion,e.set(o,p),p.texture;if(p!==void 0)return p.texture;{let d=o.image;return f&&d&&d.height>0||u&&d&&(function(M){let g=0,m=6;for(let T=0;T<m;T++)M[T]!==void 0&&g++;return g===m})(d)?(n===null&&(n=new wa(i)),p=f?n.fromEquirectangular(o):n.fromCubemap(o),p.texture.pmremVersion=o.pmremVersion,e.set(o,p),o.addEventListener("dispose",a),p.texture):null}}}return o})(l):(function(o){if(o&&o.isTexture){let h=o.mapping;if(h===Os||h===Bs){if(t.has(o))return r(t.get(o).texture,o.mapping);{let f=o.image;if(f&&f.height>0){let u=new Aa(f.height);return u.fromEquirectangularTexture(i,o),t.set(o,u),o.addEventListener("dispose",s),r(u.texture,o.mapping)}return null}}}return o})(l)},dispose:function(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}}}function ff(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let r=i.getExtension(n);return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let r=e(n);return r===null&&Jn("WebGLRenderer: "+n+" extension not supported."),r}}}function mf(i,t,e,n){let r={},s=new WeakMap;function a(c){let o=c.target;o.index!==null&&t.remove(o.index);for(let f in o.attributes)t.remove(o.attributes[f]);o.removeEventListener("dispose",a),delete r[o.id];let h=s.get(o);h&&(t.remove(h),s.delete(o)),n.releaseStatesOfGeometry(o),o.isInstancedBufferGeometry===!0&&delete o._maxInstanceCount,e.memory.geometries--}function l(c){let o=[],h=c.index,f=c.attributes.position,u=0;if(f===void 0)return;if(h!==null){let d=h.array;u=h.version;for(let M=0,g=d.length;M<g;M+=3){let m=d[M+0],T=d[M+1],E=d[M+2];o.push(m,T,T,E,E,m)}}else{let d=f.array;u=f.version;for(let M=0,g=d.length/3-1;M<g;M+=3){let m=M+0,T=M+1,E=M+2;o.push(m,T,T,E,E,m)}}let p=new(f.count>=65535?Ki:ji)(o,1);p.version=u;let _=s.get(c);_&&t.remove(_),s.set(c,p)}return{get:function(c,o){return r[o.id]===!0||(o.addEventListener("dispose",a),r[o.id]=!0,e.memory.geometries++),o},update:function(c){let o=c.attributes;for(let h in o)t.update(o[h],i.ARRAY_BUFFER)},getWireframeAttribute:function(c){let o=s.get(c);if(o){let h=c.index;h!==null&&o.version<h.version&&l(c)}else l(c);return s.get(c)}}}function gf(i,t,e){let n,r,s;this.setMode=function(a){n=a},this.setIndex=function(a){r=a.type,s=a.bytesPerElement},this.render=function(a,l){i.drawElements(n,l,r,a*s),e.update(l,n,1)},this.renderInstances=function(a,l,c){c!==0&&(i.drawElementsInstanced(n,l,r,a*s,c),e.update(l,n,c))},this.renderMultiDraw=function(a,l,c){if(c===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,l,0,r,a,0,c);let o=0;for(let h=0;h<c;h++)o+=l[h];e.update(o,n,1)}}function _f(i){let t={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:t,programs:null,autoReset:!0,reset:function(){t.calls=0,t.triangles=0,t.points=0,t.lines=0},update:function(e,n,r){switch(t.calls++,n){case i.TRIANGLES:t.triangles+=r*(e/3);break;case i.LINES:t.lines+=r*(e/2);break;case i.LINE_STRIP:t.lines+=r*(e-1);break;case i.LINE_LOOP:t.lines+=r*e;break;case i.POINTS:t.points+=r*e;break;default:Tt("WebGLInfo: Unknown draw mode:",n)}}}}function vf(i,t,e){let n=new WeakMap,r=new Qt;return{update:function(s,a,l){let c=s.morphTargetInfluences,o=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=o!==void 0?o.length:0,f=n.get(a);if(f===void 0||f.count!==h){f!==void 0&&f.texture.dispose();let u=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],m=0;u===!0&&(m=1),p===!0&&(m=2),_===!0&&(m=3);let T=a.attributes.position.count*m,E=1;T>t.maxTextureSize&&(E=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);let A=new Float32Array(T*E*4*h),b=new Zi(A,T,E,h);b.type=je,b.needsUpdate=!0;let R=4*m;for(let C=0;C<h;C++){let B=d[C],P=M[C],J=g[C],L=T*E*4*C;for(let q=0;q<B.count;q++){let Q=q*R;u===!0&&(r.fromBufferAttribute(B,q),A[L+Q+0]=r.x,A[L+Q+1]=r.y,A[L+Q+2]=r.z,A[L+Q+3]=0),p===!0&&(r.fromBufferAttribute(P,q),A[L+Q+4]=r.x,A[L+Q+5]=r.y,A[L+Q+6]=r.z,A[L+Q+7]=0),_===!0&&(r.fromBufferAttribute(J,q),A[L+Q+8]=r.x,A[L+Q+9]=r.y,A[L+Q+10]=r.z,A[L+Q+11]=J.itemSize===4?r.w:1)}}f={count:h,texture:b,size:new Ot(T,E)},n.set(a,f),a.addEventListener("dispose",function C(){b.dispose(),n.delete(a),a.removeEventListener("dispose",C)})}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",s.morphTexture,e);else{let u=0;for(let _=0;_<c.length;_++)u+=c[_];let p=a.morphTargetsRelative?1:1-u;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}}}function xf(i,t,e,n,r){let s=new WeakMap;function a(l){let c=l.target;c.removeEventListener("dispose",a),n.releaseStatesOfObject(c),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:function(l){let c=r.render.frame,o=l.geometry,h=t.get(l,o);if(s.get(h)!==c&&(t.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h},dispose:function(){s=new WeakMap}}}var yf={[Co]:"LINEAR_TONE_MAPPING",[Ro]:"REINHARD_TONE_MAPPING",[Io]:"CINEON_TONE_MAPPING",[Po]:"ACES_FILMIC_TONE_MAPPING",[No]:"AGX_TONE_MAPPING",[Do]:"NEUTRAL_TONE_MAPPING",[Lo]:"CUSTOM_TONE_MAPPING"};function Mf(i,t,e,n,r,s){let a=new we(t,e,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),l=null,c=null,o=new me;o.setAttribute("position",new ee([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new ee([0,2,0,0,2,0],2));let h=new Ms({uniforms:{tDiffuse:{value:null}},vertexShader:`
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

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

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

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Ce(o,h),u=new lr(-1,1,1,-1,0,1),p,_=null,d=null,M=!1,g=null,m=[],T=!1;this.setSize=function(E,A){a.setSize(E,A),l!==null&&l.setSize(E,A),c!==null&&c.setSize(E,A);for(let b=0;b<m.length;b++){let R=m[b];R.setSize&&R.setSize(E,A)}},this.setEffects=function(E){m=E,T=m.length>0&&m[0].isRenderPass===!0;let A=a.width,b=a.height;m.length>0&&l===null&&(l=new we(A,b,{type:Ke,depthBuffer:!1,stencilBuffer:!1}),c=new we(A,b,{type:Ke,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<m.length;R++){let C=m[R];C.setSize&&C.setSize(A,b)}},this.begin=function(E,A){if(M||E.toneMapping===Je&&m.length===0)return!1;if(g=A,A!==null){let b=A.width,R=A.height;a.width===b&&a.height===R||this.setSize(b,R)}return T===!1&&E.setRenderTarget(a),p=E.toneMapping,E.toneMapping=Je,!0},this.hasRenderPass=function(){return T},this.end=function(E,A){E.toneMapping=p,M=!0;let b=a,R=l;for(let C=0;C<m.length;C++){let B=m[C];B.enabled!==!1&&(B.render(E,R,b,A),B.needsSwap!==!1&&(b=R,R=R===l?c:l))}if(_!==E.outputColorSpace||d!==E.toneMapping){_=E.outputColorSpace,d=E.toneMapping,h.defines={},Ft.getTransfer(_)===Ht&&(h.defines.SRGB_TRANSFER="");let C=yf[d];C&&(h.defines[C]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,E.setRenderTarget(g),E.render(f,u),g=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){a.dispose(),l!==null&&l.dispose(),c!==null&&c.dispose(),o.dispose(),h.dispose()}}var _h=new Ee,ol=new Dn(1,1),vh=new Zi,xh=new ps,yh=new nr,Kc=[],Qc=[],th=new Float32Array(16),eh=new Float32Array(9),nh=new Float32Array(4);function Ui(i,t,e){let n=i[0];if(n<=0||n>0)return i;let r=t*e,s=Kc[r];if(s===void 0&&(s=new Float32Array(r),Kc[r]=s),t!==0){n.toArray(s,0);for(let a=1,l=0;a!==t;++a)l+=e,i[a].toArray(s,l)}return s}function oe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function le(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ia(i,t){let e=Qc[t];e===void 0&&(e=new Int32Array(t),Qc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Sf(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function bf(i,t){let e=this.cache;if(t.x!==void 0)e[0]===t.x&&e[1]===t.y||(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(oe(e,t))return;i.uniform2fv(this.addr,t),le(e,t)}}function Tf(i,t){let e=this.cache;if(t.x!==void 0)e[0]===t.x&&e[1]===t.y&&e[2]===t.z||(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)e[0]===t.r&&e[1]===t.g&&e[2]===t.b||(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(oe(e,t))return;i.uniform3fv(this.addr,t),le(e,t)}}function Ef(i,t){let e=this.cache;if(t.x!==void 0)e[0]===t.x&&e[1]===t.y&&e[2]===t.z&&e[3]===t.w||(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(oe(e,t))return;i.uniform4fv(this.addr,t),le(e,t)}}function wf(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(oe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),le(e,t)}else{if(oe(e,n))return;nh.set(n),i.uniformMatrix2fv(this.addr,!1,nh),le(e,n)}}function Af(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(oe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),le(e,t)}else{if(oe(e,n))return;eh.set(n),i.uniformMatrix3fv(this.addr,!1,eh),le(e,n)}}function Cf(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(oe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),le(e,t)}else{if(oe(e,n))return;th.set(n),i.uniformMatrix4fv(this.addr,!1,th),le(e,n)}}function Rf(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function If(i,t){let e=this.cache;if(t.x!==void 0)e[0]===t.x&&e[1]===t.y||(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(oe(e,t))return;i.uniform2iv(this.addr,t),le(e,t)}}function Pf(i,t){let e=this.cache;if(t.x!==void 0)e[0]===t.x&&e[1]===t.y&&e[2]===t.z||(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(oe(e,t))return;i.uniform3iv(this.addr,t),le(e,t)}}function Lf(i,t){let e=this.cache;if(t.x!==void 0)e[0]===t.x&&e[1]===t.y&&e[2]===t.z&&e[3]===t.w||(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(oe(e,t))return;i.uniform4iv(this.addr,t),le(e,t)}}function Nf(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Df(i,t){let e=this.cache;if(t.x!==void 0)e[0]===t.x&&e[1]===t.y||(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(oe(e,t))return;i.uniform2uiv(this.addr,t),le(e,t)}}function Uf(i,t){let e=this.cache;if(t.x!==void 0)e[0]===t.x&&e[1]===t.y&&e[2]===t.z||(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(oe(e,t))return;i.uniform3uiv(this.addr,t),le(e,t)}}function Ff(i,t){let e=this.cache;if(t.x!==void 0)e[0]===t.x&&e[1]===t.y&&e[2]===t.z&&e[3]===t.w||(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(oe(e,t))return;i.uniform4uiv(this.addr,t),le(e,t)}}function Of(i,t,e){let n=this.cache,r=e.allocateTextureUnit(),s;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(ol.compareFunction=e.isReversedDepthBuffer()?ba:Sa,s=ol):s=_h,e.setTexture2D(t||s,r)}function Bf(i,t,e){let n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||xh,r)}function zf(i,t,e){let n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||yh,r)}function Vf(i,t,e){let n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||vh,r)}function kf(i){switch(i){case 5126:return Sf;case 35664:return bf;case 35665:return Tf;case 35666:return Ef;case 35674:return wf;case 35675:return Af;case 35676:return Cf;case 5124:case 35670:return Rf;case 35667:case 35671:return If;case 35668:case 35672:return Pf;case 35669:case 35673:return Lf;case 5125:return Nf;case 36294:return Df;case 36295:return Uf;case 36296:return Ff;case 35678:case 36198:case 36298:case 36306:case 35682:return Of;case 35679:case 36299:case 36307:return Bf;case 35680:case 36300:case 36308:case 36293:return zf;case 36289:case 36303:case 36311:case 36292:return Vf}}function Gf(i,t){i.uniform1fv(this.addr,t)}function Hf(i,t){let e=Ui(t,this.size,2);i.uniform2fv(this.addr,e)}function Wf(i,t){let e=Ui(t,this.size,3);i.uniform3fv(this.addr,e)}function Xf(i,t){let e=Ui(t,this.size,4);i.uniform4fv(this.addr,e)}function qf(i,t){let e=Ui(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Yf(i,t){let e=Ui(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Zf(i,t){let e=Ui(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Jf(i,t){i.uniform1iv(this.addr,t)}function $f(i,t){i.uniform2iv(this.addr,t)}function jf(i,t){i.uniform3iv(this.addr,t)}function Kf(i,t){i.uniform4iv(this.addr,t)}function Qf(i,t){i.uniform1uiv(this.addr,t)}function tm(i,t){i.uniform2uiv(this.addr,t)}function em(i,t){i.uniform3uiv(this.addr,t)}function nm(i,t){i.uniform4uiv(this.addr,t)}function im(i,t,e){let n=this.cache,r=t.length,s=Ia(e,r),a;oe(n,s)||(i.uniform1iv(this.addr,s),le(n,s)),a=this.type===i.SAMPLER_2D_SHADOW?ol:_h;for(let l=0;l!==r;++l)e.setTexture2D(t[l]||a,s[l])}function rm(i,t,e){let n=this.cache,r=t.length,s=Ia(e,r);oe(n,s)||(i.uniform1iv(this.addr,s),le(n,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||xh,s[a])}function sm(i,t,e){let n=this.cache,r=t.length,s=Ia(e,r);oe(n,s)||(i.uniform1iv(this.addr,s),le(n,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||yh,s[a])}function am(i,t,e){let n=this.cache,r=t.length,s=Ia(e,r);oe(n,s)||(i.uniform1iv(this.addr,s),le(n,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||vh,s[a])}function om(i){switch(i){case 5126:return Gf;case 35664:return Hf;case 35665:return Wf;case 35666:return Xf;case 35674:return qf;case 35675:return Yf;case 35676:return Zf;case 5124:case 35670:return Jf;case 35667:case 35671:return $f;case 35668:case 35672:return jf;case 35669:case 35673:return Kf;case 5125:return Qf;case 36294:return tm;case 36295:return em;case 36296:return nm;case 35678:case 36198:case 36298:case 36306:case 35682:return im;case 35679:case 36299:case 36307:return rm;case 35680:case 36300:case 36308:case 36293:return sm;case 36289:case 36303:case 36311:case 36292:return am}}var ll=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=kf(e.type)}},cl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=om(e.type)}},hl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let l=r[s];l.setValue(t,e[l.id],n)}}},sl=/(\w+)(\])?(\[|\.)?/g;function ih(i,t){i.seq.push(t),i.map[t.id]=t}function lm(i,t,e){let n=i.name,r=n.length;for(sl.lastIndex=0;;){let s=sl.exec(n),a=sl.lastIndex,l=s[1],c=s[2]==="]",o=s[3];if(c&&(l|=0),o===void 0||o==="["&&a+2===r){ih(e,o===void 0?new ll(l,i,t):new cl(l,i,t));break}{let h=e.map[l];h===void 0&&(h=new hl(l),ih(e,h)),e=h}}}var Di=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let l=t.getActiveUniform(e,a);lm(l,t.getUniformLocation(e,l.name),this)}let r=[],s=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(t,e,n,r){let s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){let r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,a=e.length;s!==a;++s){let l=e[s],c=n[l.id];c.needsUpdate!==!1&&l.setValue(t,c.value,r)}}static seqWithValue(t,e){let n=[];for(let r=0,s=t.length;r!==s;++r){let a=t[r];a.id in e&&n.push(a)}return n}};function rh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var cm=0;function hm(i,t){let e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){let l=a+1;n.push(`${l===t?">":" "} ${l}: ${e[a]}`)}return n.join(`
`)}var sh=new Ct;function um(i){Ft._getMatrix(sh,Ft.workingColorSpace,i);let t=`mat3( ${sh.elements.map(e=>e.toFixed(4))} )`;switch(Ft.getTransfer(i)){case Xi:return[t,"LinearTransferOETF"];case Ht:return[t,"sRGBTransferOETF"];default:return yt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function ah(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+hm(i.getShaderSource(t),a)}return r}function dm(i,t){let e=um(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var pm={[Co]:"Linear",[Ro]:"Reinhard",[Io]:"Cineon",[Po]:"ACESFilmic",[No]:"AgX",[Do]:"Neutral",[Lo]:"Custom"};function fm(i,t){let e=pm[t];return e===void 0?(yt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ea=new D;function mm(){return Ft.getLuminanceCoefficients(Ea),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${Ea.x.toFixed(4)}, ${Ea.y.toFixed(4)}, ${Ea.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(br).join(`
`)}function _m(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function vm(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(t,r),a=s.name,l=1;s.type===i.FLOAT_MAT2&&(l=2),s.type===i.FLOAT_MAT3&&(l=3),s.type===i.FLOAT_MAT4&&(l=4),e[a]={type:s.type,location:i.getAttribLocation(t,a),locationSize:l}}return e}function br(i){return i!==""}function oh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function lh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var xm=/^[ \t]*#include +<([\w\d./]+)>/gm;function ul(i){return i.replace(xm,Mm)}var ym=new Map;function Mm(i,t){let e=Lt[t];if(e===void 0){let n=ym.get(t);if(n===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");e=Lt[n],yt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n)}return ul(e)}var Sm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ch(i){return i.replace(Sm,bm)}function bm(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function hh(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var Tm={[hr]:"SHADOWMAP_TYPE_PCF",[Ri]:"SHADOWMAP_TYPE_VSM"};function Em(i){return Tm[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var wm={[zn]:"ENVMAP_TYPE_CUBE",[Qn]:"ENVMAP_TYPE_CUBE",[dr]:"ENVMAP_TYPE_CUBE_UV"};function Am(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":wm[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Cm={[Qn]:"ENVMAP_MODE_REFRACTION"};function Rm(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Cm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Im={[Ao]:"ENVMAP_BLENDING_MULTIPLY",[Ac]:"ENVMAP_BLENDING_MIX",[Cc]:"ENVMAP_BLENDING_ADD"};function Pm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Im[i.combine]||"ENVMAP_BLENDING_NONE"}function Lm(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Nm(i,t,e,n){let r=i.getContext(),s=e.defines,a=e.vertexShader,l=e.fragmentShader,c=Em(e),o=Am(e),h=Rm(e),f=Pm(e),u=Lm(e),p=gm(e),_=_m(s),d=r.createProgram(),M,g,m=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(M=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(br).join(`
`),M.length>0&&(M+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(br).join(`
`),g.length>0&&(g+=`
`)):(M=[hh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(br).join(`
`),g=[hh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+o:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Je?"#define TONE_MAPPING":"",e.toneMapping!==Je?Lt.tonemapping_pars_fragment:"",e.toneMapping!==Je?fm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Lt.colorspace_pars_fragment,dm("linearToOutputTexel",e.outputColorSpace),mm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(br).join(`
`)),a=ul(a),a=oh(a,e),a=lh(a,e),l=ul(l),l=oh(l,e),l=lh(l,e),a=ch(a),l=ch(l),e.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,M=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,g=["#define varying in",e.glslVersion===Wo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Wo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let T=m+M+a,E=m+g+l,A=rh(r,r.VERTEX_SHADER,T),b=rh(r,r.FRAGMENT_SHADER,E);function R(J){if(i.debug.checkShaderErrors){let L=r.getProgramInfoLog(d)||"",q=r.getShaderInfoLog(A)||"",Q=r.getShaderInfoLog(b)||"",K=L.trim(),Y=q.trim(),U=Q.trim(),H=!0,et=!0;if(r.getProgramParameter(d,r.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,d,A,b);else{let Mt=ah(r,A,"vertex"),dt=ah(r,b,"fragment");Tt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(d,r.VALIDATE_STATUS)+`

Material Name: `+J.name+`
Material Type: `+J.type+`

Program Info Log: `+K+`
`+Mt+`
`+dt)}else K!==""?yt("WebGLProgram: Program Info Log:",K):Y!==""&&U!==""||(et=!1);et&&(J.diagnostics={runnable:H,programLog:K,vertexShader:{log:Y,prefix:M},fragmentShader:{log:U,prefix:g}})}r.deleteShader(A),r.deleteShader(b),C=new Di(r,d),B=vm(r,d)}let C,B;r.attachShader(d,A),r.attachShader(d,b),e.index0AttributeName!==void 0?r.bindAttribLocation(d,0,e.index0AttributeName):e.hasPositionAttribute===!0&&r.bindAttribLocation(d,0,"position"),r.linkProgram(d),this.getUniforms=function(){return C===void 0&&R(this),C},this.getAttributes=function(){return B===void 0&&R(this),B};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(d,37297)),P},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(d),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=cm++,this.cacheKey=t,this.usedTimes=1,this.program=d,this.vertexShader=A,this.fragmentShader=b,this}var Dm=0,dl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let r=this._getShaderCacheForMaterial(t);return r.has(e)===!1&&(r.add(e),e.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new pl(t),e.set(t,n)),n}},pl=class{constructor(t){this.id=Dm++,this.code=t,this.usedTimes=0}};function Um(i){return i===Gn||i===vr||i===xr}function Fm(i,t,e,n,r,s){let a=new Ji,l=new dl,c=new Set,o=[],h=new Map,f=n.logarithmicDepthBuffer,u=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(d){return c.add(d),d===0?"uv":`uv${d}`}return{getParameters:function(d,M,g,m,T,E){let A=m.fog,b=T.geometry,R=d.isMeshStandardMaterial||d.isMeshLambertMaterial||d.isMeshPhongMaterial?m.environment:null,C=d.isMeshStandardMaterial||d.isMeshLambertMaterial&&!d.envMap||d.isMeshPhongMaterial&&!d.envMap,B=t.get(d.envMap||R,C),P=B&&B.mapping===dr?B.image.height:null,J=p[d.type];d.precision!==null&&(u=n.getMaxPrecision(d.precision),u!==d.precision&&yt("WebGLProgram.getParameters:",d.precision,"not supported, using",u,"instead."));let L=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,q=L!==void 0?L.length:0,Q,K,Y,U,H=0;if(b.morphAttributes.position!==void 0&&(H=1),b.morphAttributes.normal!==void 0&&(H=2),b.morphAttributes.color!==void 0&&(H=3),J){let ke=un[J];Q=ke.vertexShader,K=ke.fragmentShader}else{Q=d.vertexShader,K=d.fragmentShader;let ke=l.getVertexShaderStage(d),Hn=l.getFragmentShaderStage(d);l.update(d,ke,Hn),Y=ke.id,U=Hn.id}let et=i.getRenderTarget(),Mt=i.state.buffers.depth.getReversed(),dt=T.isInstancedMesh===!0,Nt=T.isBatchedMesh===!0,gt=!!d.map,nt=!!d.matcap,j=!!B,ht=!!d.aoMap,Et=!!d.lightMap,pt=!!d.bumpMap&&d.wireframe===!1,S=!!d.normalMap,x=!!d.displacementMap,I=!!d.emissiveMap,V=!!d.metalnessMap,y=!!d.roughnessMap,z=d.anisotropy>0,O=d.clearcoat>0,w=d.dispersion>0,W=d.retroreflectivity>0,Z=d.iridescence>0,$=d.sheen>0,lt=d.transmission>0,St=z&&!!d.anisotropyMap,xt=O&&!!d.clearcoatMap,ft=O&&!!d.clearcoatNormalMap,It=O&&!!d.clearcoatRoughnessMap,tt=Z&&!!d.iridescenceMap,rt=Z&&!!d.iridescenceThicknessMap,it=$&&!!d.sheenColorMap,ct=$&&!!d.sheenRoughnessMap,qt=!!d.specularMap,kt=!!d.specularColorMap,te=!!d.specularIntensityMap,Se=lt&&!!d.transmissionMap,_t=lt&&!!d.thicknessMap,Xt=!!d.gradientMap,Pt=!!d.alphaMap,de=d.alphaTest>0,Wt=!!d.alphaHash,ne=!!d.extensions,ie=Je;d.toneMapped&&(et!==null&&et.isXRRenderTarget!==!0||(ie=i.toneMapping));let Fe={shaderID:J,shaderType:d.type,shaderName:d.name,vertexShader:Q,fragmentShader:K,defines:d.defines,customVertexShaderID:Y,customFragmentShaderID:U,isRawShaderMaterial:d.isRawShaderMaterial===!0,glslVersion:d.glslVersion,precision:u,batching:Nt,batchingColor:Nt&&T._colorsTexture!==null,instancing:dt,instancingColor:dt&&T.instanceColor!==null,instancingMorph:dt&&T.morphTexture!==null,outputColorSpace:et===null?i.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Ft.workingColorSpace,alphaToCoverage:!!d.alphaToCoverage,map:gt,matcap:nt,envMap:j,envMapMode:j&&B.mapping,envMapCubeUVHeight:P,aoMap:ht,lightMap:Et,bumpMap:pt,normalMap:S,displacementMap:x,emissiveMap:I,normalMapObjectSpace:S&&d.normalMapType===Pc,normalMapTangentSpace:S&&d.normalMapType===Ho,packedNormalMap:S&&d.normalMapType===Ho&&Um(d.normalMap.format),metalnessMap:V,roughnessMap:y,anisotropy:z,anisotropyMap:St,clearcoat:O,clearcoatMap:xt,clearcoatNormalMap:ft,clearcoatRoughnessMap:It,dispersion:w,retroreflection:W,iridescence:Z,iridescenceMap:tt,iridescenceThicknessMap:rt,sheen:$,sheenColorMap:it,sheenRoughnessMap:ct,specularMap:qt,specularColorMap:kt,specularIntensityMap:te,transmission:lt,transmissionMap:Se,thicknessMap:_t,gradientMap:Xt,opaque:d.transparent===!1&&d.blending===Ii&&d.alphaToCoverage===!1,alphaMap:Pt,alphaTest:de,alphaHash:Wt,combine:d.combine,mapUv:gt&&_(d.map.channel),aoMapUv:ht&&_(d.aoMap.channel),lightMapUv:Et&&_(d.lightMap.channel),bumpMapUv:pt&&_(d.bumpMap.channel),normalMapUv:S&&_(d.normalMap.channel),displacementMapUv:x&&_(d.displacementMap.channel),emissiveMapUv:I&&_(d.emissiveMap.channel),metalnessMapUv:V&&_(d.metalnessMap.channel),roughnessMapUv:y&&_(d.roughnessMap.channel),anisotropyMapUv:St&&_(d.anisotropyMap.channel),clearcoatMapUv:xt&&_(d.clearcoatMap.channel),clearcoatNormalMapUv:ft&&_(d.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:It&&_(d.clearcoatRoughnessMap.channel),iridescenceMapUv:tt&&_(d.iridescenceMap.channel),iridescenceThicknessMapUv:rt&&_(d.iridescenceThicknessMap.channel),sheenColorMapUv:it&&_(d.sheenColorMap.channel),sheenRoughnessMapUv:ct&&_(d.sheenRoughnessMap.channel),specularMapUv:qt&&_(d.specularMap.channel),specularColorMapUv:kt&&_(d.specularColorMap.channel),specularIntensityMapUv:te&&_(d.specularIntensityMap.channel),transmissionMapUv:Se&&_(d.transmissionMap.channel),thicknessMapUv:_t&&_(d.thicknessMap.channel),alphaMapUv:Pt&&_(d.alphaMap.channel),vertexTangents:!!b.attributes.tangent&&(S||z),vertexNormals:!!b.attributes.normal,vertexColors:d.vertexColors,vertexAlphas:d.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,pointsUvs:T.isPoints===!0&&!!b.attributes.uv&&(gt||Pt),fog:!!A,useFog:d.fog===!0,fogExp2:!!A&&A.isFogExp2,flatShading:d.wireframe===!1&&(d.flatShading===!0||b.attributes.normal===void 0&&S===!1&&(d.isMeshLambertMaterial||d.isMeshPhongMaterial||d.isMeshStandardMaterial||d.isMeshPhysicalMaterial)),sizeAttenuation:d.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Mt,skinning:T.isSkinnedMesh===!0,hasPositionAttribute:b.attributes.position!==void 0,morphTargets:b.morphAttributes.position!==void 0,morphNormals:b.morphAttributes.normal!==void 0,morphColors:b.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:H,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:E.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:d.dithering,shadowMapEnabled:i.shadowMap.enabled&&g.length>0,shadowMapType:i.shadowMap.type,toneMapping:ie,decodeVideoTexture:gt&&d.map.isVideoTexture===!0&&Ft.getTransfer(d.map.colorSpace)===Ht,decodeVideoTextureEmissive:I&&d.emissiveMap.isVideoTexture===!0&&Ft.getTransfer(d.emissiveMap.colorSpace)===Ht,premultipliedAlpha:d.premultipliedAlpha,doubleSided:d.side===ln,flipSided:d.side===be,useDepthPacking:d.depthPacking>=0,depthPacking:d.depthPacking||0,index0AttributeName:d.index0AttributeName,extensionClipCullDistance:ne&&d.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ne&&d.extensions.multiDraw===!0||Nt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:d.customProgramCacheKey()};return Fe.vertexUv1s=c.has(1),Fe.vertexUv2s=c.has(2),Fe.vertexUv3s=c.has(3),c.clear(),Fe},getProgramCacheKey:function(d){let M=[];if(d.shaderID?M.push(d.shaderID):(M.push(d.customVertexShaderID),M.push(d.customFragmentShaderID)),d.defines!==void 0)for(let g in d.defines)M.push(g),M.push(d.defines[g]);return d.isRawShaderMaterial===!1&&((function(g,m){g.push(m.precision),g.push(m.outputColorSpace),g.push(m.envMapMode),g.push(m.envMapCubeUVHeight),g.push(m.mapUv),g.push(m.alphaMapUv),g.push(m.lightMapUv),g.push(m.aoMapUv),g.push(m.bumpMapUv),g.push(m.normalMapUv),g.push(m.displacementMapUv),g.push(m.emissiveMapUv),g.push(m.metalnessMapUv),g.push(m.roughnessMapUv),g.push(m.anisotropyMapUv),g.push(m.clearcoatMapUv),g.push(m.clearcoatNormalMapUv),g.push(m.clearcoatRoughnessMapUv),g.push(m.iridescenceMapUv),g.push(m.iridescenceThicknessMapUv),g.push(m.sheenColorMapUv),g.push(m.sheenRoughnessMapUv),g.push(m.specularMapUv),g.push(m.specularColorMapUv),g.push(m.specularIntensityMapUv),g.push(m.transmissionMapUv),g.push(m.thicknessMapUv),g.push(m.combine),g.push(m.fogExp2),g.push(m.sizeAttenuation),g.push(m.morphTargetsCount),g.push(m.morphAttributeCount),g.push(m.numSunLights),g.push(m.numDirLights),g.push(m.numPointLights),g.push(m.numSpotLights),g.push(m.numSpotLightMaps),g.push(m.numHemiLights),g.push(m.numRectAreaLights),g.push(m.numSunLightShadows),g.push(m.numDirLightShadows),g.push(m.numPointLightShadows),g.push(m.numSpotLightShadows),g.push(m.numSpotLightShadowsWithMaps),g.push(m.numLightProbes),g.push(m.shadowMapType),g.push(m.toneMapping),g.push(m.numClippingPlanes),g.push(m.numClipIntersection),g.push(m.depthPacking)})(M,d),(function(g,m){a.disableAll(),m.instancing&&a.enable(0),m.instancingColor&&a.enable(1),m.instancingMorph&&a.enable(2),m.matcap&&a.enable(3),m.envMap&&a.enable(4),m.normalMapObjectSpace&&a.enable(5),m.normalMapTangentSpace&&a.enable(6),m.clearcoat&&a.enable(7),m.iridescence&&a.enable(8),m.alphaTest&&a.enable(9),m.vertexColors&&a.enable(10),m.vertexAlphas&&a.enable(11),m.vertexUv1s&&a.enable(12),m.vertexUv2s&&a.enable(13),m.vertexUv3s&&a.enable(14),m.vertexTangents&&a.enable(15),m.anisotropy&&a.enable(16),m.alphaHash&&a.enable(17),m.batching&&a.enable(18),m.dispersion&&a.enable(19),m.retroreflection&&a.enable(24),m.batchingColor&&a.enable(20),m.gradientMap&&a.enable(21),m.packedNormalMap&&a.enable(22),m.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),m.fog&&a.enable(0),m.useFog&&a.enable(1),m.flatShading&&a.enable(2),m.logarithmicDepthBuffer&&a.enable(3),m.reversedDepthBuffer&&a.enable(4),m.skinning&&a.enable(5),m.morphTargets&&a.enable(6),m.morphNormals&&a.enable(7),m.morphColors&&a.enable(8),m.premultipliedAlpha&&a.enable(9),m.shadowMapEnabled&&a.enable(10),m.doubleSided&&a.enable(11),m.flipSided&&a.enable(12),m.useDepthPacking&&a.enable(13),m.dithering&&a.enable(14),m.transmission&&a.enable(15),m.sheen&&a.enable(16),m.opaque&&a.enable(17),m.pointsUvs&&a.enable(18),m.decodeVideoTexture&&a.enable(19),m.decodeVideoTextureEmissive&&a.enable(20),m.alphaToCoverage&&a.enable(21),m.numLightProbeGrids>0&&a.enable(22),m.hasPositionAttribute&&a.enable(23),g.push(a.mask)})(M,d),M.push(i.outputColorSpace)),M.push(d.customProgramCacheKey),M.join()},getUniforms:function(d){let M=p[d.type],g;if(M){let m=un[M];g=Xc.clone(m.uniforms)}else g=d.uniforms;return g},acquireProgram:function(d,M){let g=h.get(M);return g!==void 0?++g.usedTimes:(g=new Nm(i,M,d,r),o.push(g),h.set(M,g)),g},releaseProgram:function(d){if(--d.usedTimes===0){let M=o.indexOf(d);o[M]=o[o.length-1],o.pop(),h.delete(d.cacheKey),d.destroy()}},releaseShaderCache:function(d){l.remove(d)},programs:o,dispose:function(){l.dispose()}}}function Om(){let i=new WeakMap;return{has:function(t){return i.has(t)},get:function(t){let e=i.get(t);return e===void 0&&(e={},i.set(t,e)),e},remove:function(t){i.delete(t)},update:function(t,e,n){i.get(t)[e]=n},dispose:function(){i=new WeakMap}}}function Bm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function uh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function dh(){let i=[],t=0,e=[],n=[],r=[];function s(l){let c=0;return l.isInstancedMesh&&(c+=2),l.isSkinnedMesh&&(c+=1),c}function a(l,c,o,h,f,u){let p=i[t];return p===void 0?(p={id:l.id,object:l,geometry:c,material:o,materialVariant:s(l),groupOrder:h,renderOrder:l.renderOrder,z:f,group:u},i[t]=p):(p.id=l.id,p.object=l,p.geometry=c,p.material=o,p.materialVariant=s(l),p.groupOrder=h,p.renderOrder=l.renderOrder,p.z=f,p.group=u),t++,p}return{opaque:e,transmissive:n,transparent:r,init:function(){t=0,e.length=0,n.length=0,r.length=0},push:function(l,c,o,h,f,u,p){p.reversedDepth===!0&&(f=-f);let _=a(l,c,o,h,f,u);o.transmission>0?n.push(_):o.transparent===!0?r.push(_):e.push(_)},unshift:function(l,c,o,h,f,u){let p=a(l,c,o,h,f,u);o.transmission>0?n.unshift(p):o.transparent===!0?r.unshift(p):e.unshift(p)},finish:function(){for(let l=t,c=i.length;l<c;l++){let o=i[l];if(o.id===null)break;o.id=null,o.object=null,o.geometry=null,o.material=null,o.group=null}},sort:function(l,c){e.length>1&&e.sort(l||Bm),n.length>1&&n.sort(c||uh),r.length>1&&r.sort(c||uh)}}}function zm(){let i=new WeakMap;return{get:function(t,e){let n=i.get(t),r;return n===void 0?(r=new dh,i.set(t,[r])):e>=n.length?(r=new dh,n.push(r)):r=n[e],r},dispose:function(){i=new WeakMap}}}function Vm(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new D,color:new Dt};break;case"SpotLight":e={position:new D,direction:new D,color:new Dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Dt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Dt,groundColor:new Dt};break;case"RectAreaLight":e={color:new Dt,position:new D,halfWidth:new D,halfHeight:new D}}return i[t.id]=e,e}}}function km(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot,shadowCameraNear:1,shadowCameraFar:1e3}}return i[t.id]=e,e}}}var Gm=0;function Hm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Wm(i){let t=new Vm,e=km(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);let r=new D,s=new Kt,a=new Kt;return{setup:function(l){let c=0,o=0,h=0;for(let P=0;P<9;P++)n.probe[P].set(0,0,0);let f=0,u=0,p=0,_=0,d=0,M=0,g=0,m=0,T=0,E=0,A=0,b=0,R=0,C=0;l.sort(Hm);for(let P=0,J=l.length;P<J;P++){let L=l[P],q=L.color,Q=L.intensity,K=L.distance,Y=null;if(L.shadow&&L.shadow.map&&(Y=L.shadow.map.texture.format===Gn?L.shadow.map.texture:L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)c+=q.r*Q,o+=q.g*Q,h+=q.b*Q;else if(L.isLightProbe){for(let U=0;U<9;U++)n.probe[U].addScaledVector(L.sh.coefficients[U],Q);C++}else if(L.isSunLight){let U=t.get(L);if(U.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let H=L.shadow,et=e.get(L);et.shadowIntensity=H.intensity,et.shadowBias=H.bias,et.shadowNormalBias=H.normalBias,et.shadowRadius=H.radius,et.shadowMapSize.copy(H.mapSize).multiply(H.getFrameExtents()),n.sunShadow[u]=et,n.sunShadowMap[u]=Y;let Mt=H.getViewportCount();for(let dt=0;dt<Mt;dt++)n.sunShadowMatrix[p+dt]=H.getMatrix(dt),n.sunShadowCascade[p+dt]=H._cascadeData[dt];p+=Mt,u++}n.sun[f]=U,f++}else if(L.isDirectionalLight){let U=t.get(L);if(U.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let H=L.shadow,et=e.get(L);et.shadowIntensity=H.intensity,et.shadowBias=H.bias,et.shadowNormalBias=H.normalBias,et.shadowRadius=H.radius,et.shadowMapSize=H.mapSize,n.directionalShadow[_]=et,n.directionalShadowMap[_]=Y,n.directionalShadowMatrix[_]=L.shadow.matrix,T++}n.directional[_]=U,_++}else if(L.isSpotLight){let U=t.get(L);U.position.setFromMatrixPosition(L.matrixWorld),U.color.copy(q).multiplyScalar(Q),U.distance=K,U.coneCos=Math.cos(L.angle),U.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),U.decay=L.decay,n.spot[M]=U;let H=L.shadow;if(L.map&&(n.spotLightMap[b]=L.map,b++,H.updateMatrices(L),L.castShadow&&R++),n.spotLightMatrix[M]=H.matrix,L.castShadow){let et=e.get(L);et.shadowIntensity=H.intensity,et.shadowBias=H.bias,et.shadowNormalBias=H.normalBias,et.shadowRadius=H.radius,et.shadowMapSize=H.mapSize,n.spotShadow[M]=et,n.spotShadowMap[M]=Y,A++}M++}else if(L.isRectAreaLight){let U=t.get(L);U.color.copy(q).multiplyScalar(Q),U.halfWidth.set(.5*L.width,0,0),U.halfHeight.set(0,.5*L.height,0),n.rectArea[g]=U,g++}else if(L.isPointLight){let U=t.get(L);if(U.color.copy(L.color).multiplyScalar(L.intensity),U.distance=L.distance,U.decay=L.decay,L.castShadow){let H=L.shadow,et=e.get(L);et.shadowIntensity=H.intensity,et.shadowBias=H.bias,et.shadowNormalBias=H.normalBias,et.shadowRadius=H.radius,et.shadowMapSize=H.mapSize,et.shadowCameraNear=H.camera.near,et.shadowCameraFar=H.camera.far,n.pointShadow[d]=et,n.pointShadowMap[d]=Y,n.pointShadowMatrix[d]=L.shadow.matrix,E++}n.point[d]=U,d++}else if(L.isHemisphereLight){let U=t.get(L);U.skyColor.copy(L.color).multiplyScalar(Q),U.groundColor.copy(L.groundColor).multiplyScalar(Q),n.hemi[m]=U,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=o,n.ambient[2]=h;let B=n.hash;B.sunLength===f&&B.directionalLength===_&&B.pointLength===d&&B.spotLength===M&&B.rectAreaLength===g&&B.hemiLength===m&&B.numSunShadows===u&&B.numDirectionalShadows===T&&B.numPointShadows===E&&B.numSpotShadows===A&&B.numSpotMaps===b&&B.numLightProbes===C||(n.sun.length=f,n.directional.length=_,n.spot.length=M,n.rectArea.length=g,n.point.length=d,n.hemi.length=m,n.sunShadow.length=u,n.sunShadowMap.length=u,n.sunShadowMatrix.length=p,n.sunShadowCascade.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=A,n.spotShadowMap.length=A,n.spotLightMatrix.length=A+b-R,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=C,B.sunLength=f,B.directionalLength=_,B.pointLength=d,B.spotLength=M,B.rectAreaLength=g,B.hemiLength=m,B.numSunShadows=u,B.numDirectionalShadows=T,B.numPointShadows=E,B.numSpotShadows=A,B.numSpotMaps=b,B.numLightProbes=C,n.version=Gm++)},setupView:function(l,c){let o=0,h=0,f=0,u=0,p=0,_=0,d=c.matrixWorldInverse;for(let M=0,g=l.length;M<g;M++){let m=l[M];if(m.isSunLight){let T=n.sun[o];T.direction.setFromMatrixPosition(m.matrixWorld),T.direction.transformDirection(d),o++}else if(m.isDirectionalLight){let T=n.directional[h];T.direction.setFromMatrixPosition(m.matrixWorld),r.setFromMatrixPosition(m.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(d),h++}else if(m.isSpotLight){let T=n.spot[u];T.position.setFromMatrixPosition(m.matrixWorld),T.position.applyMatrix4(d),T.direction.setFromMatrixPosition(m.matrixWorld),r.setFromMatrixPosition(m.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(d),u++}else if(m.isRectAreaLight){let T=n.rectArea[p];T.position.setFromMatrixPosition(m.matrixWorld),T.position.applyMatrix4(d),a.identity(),s.copy(m.matrixWorld),s.premultiply(d),a.extractRotation(s),T.halfWidth.set(.5*m.width,0,0),T.halfHeight.set(0,.5*m.height,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),p++}else if(m.isPointLight){let T=n.point[f];T.position.setFromMatrixPosition(m.matrixWorld),T.position.applyMatrix4(d),f++}else if(m.isHemisphereLight){let T=n.hemi[_];T.direction.setFromMatrixPosition(m.matrixWorld),T.direction.transformDirection(d),_++}}},state:n}}function ph(i){let t=new Wm(i),e=[],n=[],r=[],s={lightsArray:e,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:function(a){s.camera=a,e.length=0,n.length=0,r.length=0},state:s,setupLights:function(){t.setup(e)},setupLightsView:function(a){t.setupView(e,a)},pushLight:function(a){e.push(a)},pushShadow:function(a){n.push(a)},pushLightProbeGrid:function(a){r.push(a)}}}function Xm(i){let t=new WeakMap;return{get:function(e,n=0){let r=t.get(e),s;return r===void 0?(s=new ph(i),t.set(e,[s])):n>=r.length?(s=new ph(i),r.push(s)):s=r[n],s},dispose:function(){t=new WeakMap}}}var qm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ym=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Zm=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],Jm=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],fh=new Kt,Sr=new D,al=new D;function $m(i,t,e){let n=new tr,r=new Ot,s=new Ot,a=new Qt,l=new Ss,c=new bs,o={},h=e.maxTextureSize,f={[Bn]:be,[be]:Bn,[ln]:ln},u=new ye({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ot},radius:{value:4}},vertexShader:qm,fragmentShader:Ym}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let _=new me;_.setAttribute("position",new xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let d=new Ce(_,u),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hr;let g=this.type;function m(b,R){let C=t.update(d);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null?b.mapPass=new we(r.x,r.y,{format:Gn,type:Ke}):b.mapPass.width===b.map.width&&b.mapPass.height===b.map.height||b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(R,null,C,u,d,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value.set(b.map.width,b.map.height),p.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(R,null,C,p,d,null)}function T(b,R,C,B){let P=null,J=C.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(J!==void 0)P=J;else if(P=C.isPointLight===!0?c:l,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let L=P.uuid,q=R.uuid,Q=o[L];Q===void 0&&(Q={},o[L]=Q);let K=Q[q];K===void 0&&(K=P.clone(),Q[q]=K,R.addEventListener("dispose",A)),P=K}return P.visible=R.visible,P.wireframe=R.wireframe,P.side=B===Ri?R.shadowSide!==null?R.shadowSide:R.side:R.shadowSide!==null?R.shadowSide:f[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,C.isPointLight===!0&&P.isMeshDistanceMaterial===!0&&(i.properties.get(P).light=C),P}function E(b,R,C,B,P){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&P===Ri)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,b.matrixWorld);let L=t.update(b),q=b.material;if(Array.isArray(q)){let Q=L.groups;for(let K=0,Y=Q.length;K<Y;K++){let U=Q[K],H=q[U.materialIndex];if(H&&H.visible){let et=T(b,H,B,P);b.onBeforeShadow(i,b,R,C,L,et,U),i.renderBufferDirect(C,null,L,et,b,U),b.onAfterShadow(i,b,R,C,L,et,U)}}}else if(q.visible){let Q=T(b,q,B,P);b.onBeforeShadow(i,b,R,C,L,Q,null),i.renderBufferDirect(C,null,L,Q,b,null),b.onAfterShadow(i,b,R,C,L,Q,null)}}let J=b.children;for(let L=0,q=J.length;L<q;L++)E(J[L],R,C,B,P)}function A(b){b.target.removeEventListener("dispose",A);for(let R in o){let C=o[R],B=b.target.uuid;B in C&&(C[B].dispose(),delete C[B])}}this.render=function(b,R,C){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||b.length===0)return;this.type===lc&&(yt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=hr);let B=i.getRenderTarget(),P=i.getActiveCubeFace(),J=i.getActiveMipmapLevel(),L=i.state;L.setBlending(cn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let q=g!==this.type;q&&R.traverse(function(Q){Q.material&&(Array.isArray(Q.material)?Q.material.forEach(K=>K.needsUpdate=!0):Q.material.needsUpdate=!0)});for(let Q=0,K=b.length;Q<K;Q++){let Y=b[Q],U=Y.shadow;if(U===void 0){yt("WebGLShadowMap:",Y,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;r.copy(U.mapSize);let H=U.getFrameExtents();r.multiply(H),s.copy(U.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/H.x),r.x=s.x*H.x,U.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/H.y),r.y=s.y*H.y,U.mapSize.y=s.y));let et=i.state.buffers.depth.getReversed();if(U.camera._reversedDepth=et,U.map===null||q===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===Ri){if(Y.isPointLight){yt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new we(r.x,r.y,{format:Gn,type:Ke,minFilter:fe,magFilter:fe,generateMipmaps:!1}),U.map.texture.name=Y.name+".shadowMap",U.map.depthTexture=new Dn(r.x,r.y,je),U.map.depthTexture.name=Y.name+".shadowMapDepth",U.map.depthTexture.format=sn,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=ue,U.map.depthTexture.magFilter=ue}else Y.isPointLight?(U.map=new Aa(r.x),U.map.depthTexture=new xs(r.x,$e)):(U.map=new we(r.x,r.y),U.map.depthTexture=new Dn(r.x,r.y,$e)),U.map.depthTexture.name=Y.name+".shadowMap",U.map.depthTexture.format=sn,this.type===hr?(U.map.depthTexture.compareFunction=et?ba:Sa,U.map.depthTexture.minFilter=fe,U.map.depthTexture.magFilter=fe):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=ue,U.map.depthTexture.magFilter=ue);U.camera.updateProjectionMatrix()}U.map.isWebGLCubeRenderTarget===!0||U.map.width===r.x&&U.map.height===r.y||U.map.setSize(r.x,r.y);let Mt=U.map.isWebGLCubeRenderTarget?6:U.getViewportCount();Y.isPointLight!==!0&&U.updateMatrices(Y,C);for(let dt=0;dt<Mt;dt++){let Nt=U.getCamera(dt);if(Y.isPointLight){let gt=U.camera,nt=U.matrix,j=Y.distance||gt.far;j!==gt.far&&(gt.far=j,gt.updateProjectionMatrix()),Sr.setFromMatrixPosition(Y.matrixWorld),gt.position.copy(Sr),al.copy(gt.position),al.add(Zm[dt]),gt.up.copy(Jm[dt]),gt.lookAt(al),gt.updateMatrixWorld(),nt.makeTranslation(-Sr.x,-Sr.y,-Sr.z),fh.multiplyMatrices(gt.projectionMatrix,gt.matrixWorldInverse),U._frustum.setFromProjectionMatrix(fh,gt.coordinateSystem,gt.reversedDepth)}if(U.map.isWebGLCubeRenderTarget)i.setRenderTarget(U.map,dt),i.clear();else{dt===0&&(i.setRenderTarget(U.map),i.clear());let gt=U.getViewport(dt);a.set(s.x*gt.x,s.y*gt.y,s.x*gt.z,s.y*gt.w),L.viewport(a)}n=U.getFrustum(dt),E(R,C,Nt,Y,this.type)}U.isPointLightShadow!==!0&&this.type===Ri&&m(U,C),U.needsUpdate=!1}g=this.type,M.needsUpdate=!1,i.setRenderTarget(B,P,J)}}function jm(i,t){let e=new function(){let y=!1,z=new Qt,O=null,w=new Qt(0,0,0,0);return{setMask:function(W){O===W||y||(i.colorMask(W,W,W,W),O=W)},setLocked:function(W){y=W},setClear:function(W,Z,$,lt,St){St===!0&&(W*=lt,Z*=lt,$*=lt),z.set(W,Z,$,lt),w.equals(z)===!1&&(i.clearColor(W,Z,$,lt),w.copy(z))},reset:function(){y=!1,O=null,w.set(-1,0,0,0)}}},n=new function(){let y=!1,z=!1,O=null,w=null,W=null;return{setReversed:function(Z){if(z!==Z){let $=t.get("EXT_clip_control");Z?$.clipControlEXT($.LOWER_LEFT_EXT,$.ZERO_TO_ONE_EXT):$.clipControlEXT($.LOWER_LEFT_EXT,$.NEGATIVE_ONE_TO_ONE_EXT),z=Z;let lt=W;W=null,this.setClear(lt)}},getReversed:function(){return z},setTest:function(Z){Z?j(i.DEPTH_TEST):ht(i.DEPTH_TEST)},setMask:function(Z){O===Z||y||(i.depthMask(Z),O=Z)},setFunc:function(Z){if(z&&(Z=Hc[Z]),w!==Z){switch(Z){case ts:i.depthFunc(i.NEVER);break;case es:i.depthFunc(i.ALWAYS);break;case ns:i.depthFunc(i.LESS);break;case Mi:i.depthFunc(i.LEQUAL);break;case is:i.depthFunc(i.EQUAL);break;case rs:i.depthFunc(i.GEQUAL);break;case ss:i.depthFunc(i.GREATER);break;case as:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}w=Z}},setLocked:function(Z){y=Z},setClear:function(Z){W!==Z&&(W=Z,z&&(Z=1-Z),i.clearDepth(Z))},reset:function(){y=!1,O=null,w=null,W=null,z=!1}}},r=new function(){let y=!1,z=null,O=null,w=null,W=null,Z=null,$=null,lt=null,St=null;return{setTest:function(xt){y||(xt?j(i.STENCIL_TEST):ht(i.STENCIL_TEST))},setMask:function(xt){z===xt||y||(i.stencilMask(xt),z=xt)},setFunc:function(xt,ft,It){O===xt&&w===ft&&W===It||(i.stencilFunc(xt,ft,It),O=xt,w=ft,W=It)},setOp:function(xt,ft,It){Z===xt&&$===ft&&lt===It||(i.stencilOp(xt,ft,It),Z=xt,$=ft,lt=It)},setLocked:function(xt){y=xt},setClear:function(xt){St!==xt&&(i.clearStencil(xt),St=xt)},reset:function(){y=!1,z=null,O=null,w=null,W=null,Z=null,$=null,lt=null,St=null}}},s=new WeakMap,a=new WeakMap,l={},c={},o={},h=new WeakMap,f=[],u=null,p=!1,_=null,d=null,M=null,g=null,m=null,T=null,E=null,A=new Dt(0,0,0),b=0,R=!1,C=null,B=null,P=null,J=null,L=null,q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Q=!1,K=0,Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(Y)[1]),Q=K>=1):Y.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),Q=K>=2);let U=null,H={},et=i.getParameter(i.SCISSOR_BOX),Mt=i.getParameter(i.VIEWPORT),dt=new Qt().fromArray(et),Nt=new Qt().fromArray(Mt);function gt(y,z,O,w){let W=new Uint8Array(4),Z=i.createTexture();i.bindTexture(y,Z),i.texParameteri(y,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(y,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let $=0;$<O;$++)y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY?i.texImage3D(z,0,i.RGBA,1,1,w,0,i.RGBA,i.UNSIGNED_BYTE,W):i.texImage2D(z+$,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,W);return Z}let nt={};function j(y){l[y]!==!0&&(i.enable(y),l[y]=!0)}function ht(y){l[y]!==!1&&(i.disable(y),l[y]=!1)}nt[i.TEXTURE_2D]=gt(i.TEXTURE_2D,i.TEXTURE_2D,1),nt[i.TEXTURE_CUBE_MAP]=gt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),nt[i.TEXTURE_2D_ARRAY]=gt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),nt[i.TEXTURE_3D]=gt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),e.setClear(0,0,0,1),n.setClear(1),r.setClear(0),j(i.DEPTH_TEST),n.setFunc(Mi),x(!1),I(So),j(i.CULL_FACE),S(cn);let Et={[Kn]:i.FUNC_ADD,[hc]:i.FUNC_SUBTRACT,[uc]:i.FUNC_REVERSE_SUBTRACT};Et[dc]=i.MIN,Et[pc]=i.MAX;let pt={[fc]:i.ZERO,[mc]:i.ONE,[gc]:i.SRC_COLOR,[Eo]:i.SRC_ALPHA,[Sc]:i.SRC_ALPHA_SATURATE,[yc]:i.DST_COLOR,[vc]:i.DST_ALPHA,[_c]:i.ONE_MINUS_SRC_COLOR,[wo]:i.ONE_MINUS_SRC_ALPHA,[Mc]:i.ONE_MINUS_DST_COLOR,[xc]:i.ONE_MINUS_DST_ALPHA,[bc]:i.CONSTANT_COLOR,[Tc]:i.ONE_MINUS_CONSTANT_COLOR,[Ec]:i.CONSTANT_ALPHA,[wc]:i.ONE_MINUS_CONSTANT_ALPHA};function S(y,z,O,w,W,Z,$,lt,St,xt){if(y!==cn){if(p===!1&&(j(i.BLEND),p=!0),y===cc)W=W||z,Z=Z||O,$=$||w,z===d&&W===m||(i.blendEquationSeparate(Et[z],Et[W]),d=z,m=W),O===M&&w===g&&Z===T&&$===E||(i.blendFuncSeparate(pt[O],pt[w],pt[Z],pt[$]),M=O,g=w,T=Z,E=$),lt.equals(A)!==!1&&St===b||(i.blendColor(lt.r,lt.g,lt.b,St),A.copy(lt),b=St),_=y,R=!1;else if(y!==_||xt!==R){if(d===Kn&&m===Kn||(i.blendEquation(i.FUNC_ADD),d=Kn,m=Kn),xt)switch(y){case Ii:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ur:i.blendFunc(i.ONE,i.ONE);break;case bo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case To:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Tt("WebGLState: Invalid blending: ",y)}else switch(y){case Ii:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ur:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case bo:Tt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case To:Tt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Tt("WebGLState: Invalid blending: ",y)}M=null,g=null,T=null,E=null,A.set(0,0,0),b=0,_=y,R=xt}}else p===!0&&(ht(i.BLEND),p=!1)}function x(y){C!==y&&(y?i.frontFace(i.CW):i.frontFace(i.CCW),C=y)}function I(y){y!==ac?(j(i.CULL_FACE),y!==B&&(y===So?i.cullFace(i.BACK):y===oc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ht(i.CULL_FACE),B=y}function V(y,z,O){y?(j(i.POLYGON_OFFSET_FILL),J===z&&L===O||(J=z,L=O,n.getReversed()&&(z=-z),i.polygonOffset(z,O))):ht(i.POLYGON_OFFSET_FILL)}return{buffers:{color:e,depth:n,stencil:r},enable:j,disable:ht,bindFramebuffer:function(y,z){return o[y]!==z&&(i.bindFramebuffer(y,z),o[y]=z,y===i.DRAW_FRAMEBUFFER&&(o[i.FRAMEBUFFER]=z),y===i.FRAMEBUFFER&&(o[i.DRAW_FRAMEBUFFER]=z),!0)},drawBuffers:function(y,z){let O=f,w=!1;if(y){O=h.get(z),O===void 0&&(O=[],h.set(z,O));let W=y.textures;if(O.length!==W.length||O[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,$=W.length;Z<$;Z++)O[Z]=i.COLOR_ATTACHMENT0+Z;O.length=W.length,w=!0}}else O[0]!==i.BACK&&(O[0]=i.BACK,w=!0);w&&i.drawBuffers(O)},useProgram:function(y){return u!==y&&(i.useProgram(y),u=y,!0)},setBlending:S,setMaterial:function(y,z){y.side===ln?ht(i.CULL_FACE):j(i.CULL_FACE);let O=y.side===be;z&&(O=!O),x(O),y.blending===Ii&&y.transparent===!1?S(cn):S(y.blending,y.blendEquation,y.blendSrc,y.blendDst,y.blendEquationAlpha,y.blendSrcAlpha,y.blendDstAlpha,y.blendColor,y.blendAlpha,y.premultipliedAlpha),n.setFunc(y.depthFunc),n.setTest(y.depthTest),n.setMask(y.depthWrite),e.setMask(y.colorWrite);let w=y.stencilWrite;r.setTest(w),w&&(r.setMask(y.stencilWriteMask),r.setFunc(y.stencilFunc,y.stencilRef,y.stencilFuncMask),r.setOp(y.stencilFail,y.stencilZFail,y.stencilZPass)),V(y.polygonOffset,y.polygonOffsetFactor,y.polygonOffsetUnits),y.alphaToCoverage===!0?j(i.SAMPLE_ALPHA_TO_COVERAGE):ht(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:x,setCullFace:I,setLineWidth:function(y){y!==P&&(Q&&i.lineWidth(y),P=y)},setPolygonOffset:V,setScissorTest:function(y){y?j(i.SCISSOR_TEST):ht(i.SCISSOR_TEST)},activeTexture:function(y){y===void 0&&(y=i.TEXTURE0+q-1),U!==y&&(i.activeTexture(y),U=y)},bindTexture:function(y,z,O){O===void 0&&(O=U===null?i.TEXTURE0+q-1:U);let w=H[O];w===void 0&&(w={type:void 0,texture:void 0},H[O]=w),w.type===y&&w.texture===z||(U!==O&&(i.activeTexture(O),U=O),i.bindTexture(y,z||nt[y]),w.type=y,w.texture=z)},unbindTexture:function(){let y=H[U];y!==void 0&&y.type!==void 0&&(i.bindTexture(y.type,null),y.type=void 0,y.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D(...arguments)}catch(y){Tt("WebGLState:",y)}},compressedTexImage3D:function(){try{i.compressedTexImage3D(...arguments)}catch(y){Tt("WebGLState:",y)}},texImage2D:function(){try{i.texImage2D(...arguments)}catch(y){Tt("WebGLState:",y)}},texImage3D:function(){try{i.texImage3D(...arguments)}catch(y){Tt("WebGLState:",y)}},pixelStorei:function(y,z){c[y]!==z&&(i.pixelStorei(y,z),c[y]=z)},getParameter:function(y){return c[y]!==void 0?c[y]:i.getParameter(y)},updateUBOMapping:function(y,z){let O=a.get(z);O===void 0&&(O=new WeakMap,a.set(z,O));let w=O.get(y);w===void 0&&(w=i.getUniformBlockIndex(z,y.name),O.set(y,w))},uniformBlockBinding:function(y,z){let O=a.get(z).get(y);s.get(z)!==O&&(i.uniformBlockBinding(z,O,y.__bindingPointIndex),s.set(z,O))},texStorage2D:function(){try{i.texStorage2D(...arguments)}catch(y){Tt("WebGLState:",y)}},texStorage3D:function(){try{i.texStorage3D(...arguments)}catch(y){Tt("WebGLState:",y)}},texSubImage2D:function(){try{i.texSubImage2D(...arguments)}catch(y){Tt("WebGLState:",y)}},texSubImage3D:function(){try{i.texSubImage3D(...arguments)}catch(y){Tt("WebGLState:",y)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D(...arguments)}catch(y){Tt("WebGLState:",y)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D(...arguments)}catch(y){Tt("WebGLState:",y)}},scissor:function(y){dt.equals(y)===!1&&(i.scissor(y.x,y.y,y.z,y.w),dt.copy(y))},viewport:function(y){Nt.equals(y)===!1&&(i.viewport(y.x,y.y,y.z,y.w),Nt.copy(y))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),n.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),l={},c={},U=null,H={},o={},h=new WeakMap,f=[],u=null,p=!1,_=null,d=null,M=null,g=null,m=null,T=null,E=null,A=new Dt(0,0,0),b=0,R=!1,C=null,B=null,P=null,J=null,L=null,dt.set(0,0,i.canvas.width,i.canvas.height),Nt.set(0,0,i.canvas.width,i.canvas.height),e.reset(),n.reset(),r.reset()}}}function Km(i,t,e,n,r,s,a){let l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),o=new Ot,h=new WeakMap,f=new Set,u,p=new WeakMap,_=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function d(S,x){return _?new OffscreenCanvas(S,x):Yi("canvas")}function M(S,x,I){let V=1,y=pt(S);if((y.width>I||y.height>I)&&(V=I/Math.max(y.width,y.height)),V<1){if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){let z=Math.floor(V*y.width),O=Math.floor(V*y.height);u===void 0&&(u=d(z,O));let w=x?d(z,O):u;return w.width=z,w.height=O,w.getContext("2d").drawImage(S,0,0,z,O),yt("WebGLRenderer: Texture has been resized from ("+y.width+"x"+y.height+") to ("+z+"x"+O+")."),w}return"data"in S&&yt("WebGLRenderer: Image in DataTexture is too big ("+y.width+"x"+y.height+")."),S}return S}function g(S){return S.generateMipmaps}function m(S){i.generateMipmap(S)}function T(S){return S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?i.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(S,x,I,V,y,z=!1){if(S!==null){if(i[S]!==void 0)return i[S];yt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let O;V&&(O=t.get("EXT_texture_norm16"),O||yt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let w=x;if(x===i.RED&&(I===i.FLOAT&&(w=i.R32F),I===i.HALF_FLOAT&&(w=i.R16F),I===i.UNSIGNED_BYTE&&(w=i.R8),I===i.UNSIGNED_SHORT&&O&&(w=O.R16_EXT),I===i.SHORT&&O&&(w=O.R16_SNORM_EXT)),x===i.RED_INTEGER&&(I===i.UNSIGNED_BYTE&&(w=i.R8UI),I===i.UNSIGNED_SHORT&&(w=i.R16UI),I===i.UNSIGNED_INT&&(w=i.R32UI),I===i.BYTE&&(w=i.R8I),I===i.SHORT&&(w=i.R16I),I===i.INT&&(w=i.R32I)),x===i.RG&&(I===i.FLOAT&&(w=i.RG32F),I===i.HALF_FLOAT&&(w=i.RG16F),I===i.UNSIGNED_BYTE&&(w=i.RG8),I===i.UNSIGNED_SHORT&&O&&(w=O.RG16_EXT),I===i.SHORT&&O&&(w=O.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(I===i.UNSIGNED_BYTE&&(w=i.RG8UI),I===i.UNSIGNED_SHORT&&(w=i.RG16UI),I===i.UNSIGNED_INT&&(w=i.RG32UI),I===i.BYTE&&(w=i.RG8I),I===i.SHORT&&(w=i.RG16I),I===i.INT&&(w=i.RG32I)),x===i.RGB_INTEGER&&(I===i.UNSIGNED_BYTE&&(w=i.RGB8UI),I===i.UNSIGNED_SHORT&&(w=i.RGB16UI),I===i.UNSIGNED_INT&&(w=i.RGB32UI),I===i.BYTE&&(w=i.RGB8I),I===i.SHORT&&(w=i.RGB16I),I===i.INT&&(w=i.RGB32I)),x===i.RGBA_INTEGER&&(I===i.UNSIGNED_BYTE&&(w=i.RGBA8UI),I===i.UNSIGNED_SHORT&&(w=i.RGBA16UI),I===i.UNSIGNED_INT&&(w=i.RGBA32UI),I===i.BYTE&&(w=i.RGBA8I),I===i.SHORT&&(w=i.RGBA16I),I===i.INT&&(w=i.RGBA32I)),x===i.RGB&&(I===i.UNSIGNED_SHORT&&O&&(w=O.RGB16_EXT),I===i.SHORT&&O&&(w=O.RGB16_SNORM_EXT),I===i.UNSIGNED_INT_5_9_9_9_REV&&(w=i.RGB9_E5),I===i.UNSIGNED_INT_10F_11F_11F_REV&&(w=i.R11F_G11F_B10F)),x===i.RGBA){let W=z?Xi:Ft.getTransfer(y);I===i.FLOAT&&(w=i.RGBA32F),I===i.HALF_FLOAT&&(w=i.RGBA16F),I===i.UNSIGNED_BYTE&&(w=W===Ht?i.SRGB8_ALPHA8:i.RGBA8),I===i.UNSIGNED_SHORT&&O&&(w=O.RGBA16_EXT),I===i.SHORT&&O&&(w=O.RGBA16_SNORM_EXT),I===i.UNSIGNED_SHORT_4_4_4_4&&(w=i.RGBA4),I===i.UNSIGNED_SHORT_5_5_5_1&&(w=i.RGB5_A1)}return w!==i.R16F&&w!==i.R32F&&w!==i.RG16F&&w!==i.RG32F&&w!==i.RGBA16F&&w!==i.RGBA32F||t.get("EXT_color_buffer_float"),w}function A(S,x){let I;return S?x===null||x===$e||x===Li?I=i.DEPTH24_STENCIL8:x===je?I=i.DEPTH32F_STENCIL8:x===Pi&&(I=i.DEPTH24_STENCIL8,yt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===$e||x===Li?I=i.DEPTH_COMPONENT24:x===je?I=i.DEPTH_COMPONENT32F:x===Pi&&(I=i.DEPTH_COMPONENT16),I}function b(S,x){return g(S)===!0||S.isFramebufferTexture&&S.minFilter!==ue&&S.minFilter!==fe?Math.log2(Math.max(x.width,x.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?x.mipmaps.length:1}function R(S){let x=S.target;x.removeEventListener("dispose",R),(function(I){let V=n.get(I);if(V.__webglInit===void 0)return;let y=I.source,z=p.get(y);if(z){let O=z[V.__cacheKey];O.usedTimes--,O.usedTimes===0&&B(I),Object.keys(z).length===0&&p.delete(y)}n.remove(I)})(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&f.delete(x)}function C(S){let x=S.target;x.removeEventListener("dispose",C),(function(I){let V=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(V.__webglFramebuffer[z]))for(let O=0;O<V.__webglFramebuffer[z].length;O++)i.deleteFramebuffer(V.__webglFramebuffer[z][O]);else i.deleteFramebuffer(V.__webglFramebuffer[z]);V.__webglDepthbuffer&&i.deleteRenderbuffer(V.__webglDepthbuffer[z])}else{if(Array.isArray(V.__webglFramebuffer))for(let z=0;z<V.__webglFramebuffer.length;z++)i.deleteFramebuffer(V.__webglFramebuffer[z]);else i.deleteFramebuffer(V.__webglFramebuffer);if(V.__webglDepthbuffer&&i.deleteRenderbuffer(V.__webglDepthbuffer),V.__webglMultisampledFramebuffer&&i.deleteFramebuffer(V.__webglMultisampledFramebuffer),V.__webglColorRenderbuffer)for(let z=0;z<V.__webglColorRenderbuffer.length;z++)V.__webglColorRenderbuffer[z]&&i.deleteRenderbuffer(V.__webglColorRenderbuffer[z]);V.__webglDepthRenderbuffer&&i.deleteRenderbuffer(V.__webglDepthRenderbuffer)}let y=I.textures;for(let z=0,O=y.length;z<O;z++){let w=n.get(y[z]);w.__webglTexture&&(i.deleteTexture(w.__webglTexture),a.memory.textures--),n.remove(y[z])}n.remove(I)})(x)}function B(S){let x=n.get(S);i.deleteTexture(x.__webglTexture);let I=S.source;delete p.get(I)[x.__cacheKey],a.memory.textures--}let P=0;function J(S,x){let I=n.get(S);if(S.isVideoTexture&&(function(V){let y=a.render.frame;h.get(V)!==y&&(h.set(V,y),V.update())})(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&I.__version!==S.version){let V=S.image;if(V===null)yt("WebGLRenderer: Texture marked for update but no image data found.");else{if(V.complete!==!1)return void H(I,S,x);yt("WebGLRenderer: Texture marked for update but image is incomplete")}}else S.isExternalTexture&&(I.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,I.__webglTexture,i.TEXTURE0+x)}let L={[os]:i.REPEAT,[rn]:i.CLAMP_TO_EDGE,[ls]:i.MIRRORED_REPEAT},q={[ue]:i.NEAREST,[Rc]:i.NEAREST_MIPMAP_NEAREST,[pr]:i.NEAREST_MIPMAP_LINEAR,[fe]:i.LINEAR,[zs]:i.LINEAR_MIPMAP_NEAREST,[Vn]:i.LINEAR_MIPMAP_LINEAR},Q={[Nc]:i.NEVER,[Bc]:i.ALWAYS,[Dc]:i.LESS,[Sa]:i.LEQUAL,[Uc]:i.EQUAL,[ba]:i.GEQUAL,[Fc]:i.GREATER,[Oc]:i.NOTEQUAL};function K(S,x){if(x.type!==je||t.has("OES_texture_float_linear")!==!1||x.magFilter!==fe&&x.magFilter!==zs&&x.magFilter!==pr&&x.magFilter!==Vn&&x.minFilter!==fe&&x.minFilter!==zs&&x.minFilter!==pr&&x.minFilter!==Vn||yt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(S,i.TEXTURE_WRAP_S,L[x.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,L[x.wrapT]),S!==i.TEXTURE_3D&&S!==i.TEXTURE_2D_ARRAY||i.texParameteri(S,i.TEXTURE_WRAP_R,L[x.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,q[x.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,q[x.minFilter]),x.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,Q[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===ue||x.minFilter!==pr&&x.minFilter!==Vn||x.type===je&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let I=t.get("EXT_texture_filter_anisotropic");i.texParameterf(S,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Y(S,x){let I=!1;S.__webglInit===void 0&&(S.__webglInit=!0,x.addEventListener("dispose",R));let V=x.source,y=p.get(V);y===void 0&&(y={},p.set(V,y));let z=(function(O){let w=[];return w.push(O.wrapS),w.push(O.wrapT),w.push(O.wrapR||0),w.push(O.magFilter),w.push(O.minFilter),w.push(O.anisotropy),w.push(O.internalFormat),w.push(O.format),w.push(O.type),w.push(O.generateMipmaps),w.push(O.premultiplyAlpha),w.push(O.flipY),w.push(O.unpackAlignment),w.push(O.colorSpace),w.join()})(x);if(z!==S.__cacheKey){y[z]===void 0&&(y[z]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,I=!0),y[z].usedTimes++;let O=y[S.__cacheKey];O!==void 0&&(y[S.__cacheKey].usedTimes--,O.usedTimes===0&&B(x)),S.__cacheKey=z,S.__webglTexture=y[z].texture}return I}function U(S,x,I){return Math.floor(Math.floor(S/I)/x)}function H(S,x,I){let V=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(V=i.TEXTURE_3D);let y=Y(S,x),z=x.source;e.bindTexture(V,S.__webglTexture,i.TEXTURE0+I);let O=n.get(z);if(z.version!==O.__version||y===!0){if(e.activeTexture(i.TEXTURE0+I),!(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)){let rt=Ft.getPrimaries(Ft.workingColorSpace),it=x.colorSpace===Sn?null:Ft.getPrimaries(x.colorSpace),ct=x.colorSpace===Sn||rt===it?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct)}e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let w=M(x.image,!1,r.maxTextureSize);w=Et(x,w);let W=s.convert(x.format,x.colorSpace),Z=s.convert(x.type),$,lt=E(x.internalFormat,W,Z,x.normalized,x.colorSpace,x.isVideoTexture);K(V,x);let St=x.mipmaps,xt=x.isVideoTexture!==!0,ft=O.__version===void 0||y===!0,It=z.dataReady,tt=b(x,w);if(x.isDepthTexture)lt=A(x.format===kn,x.type),ft&&(xt?e.texStorage2D(i.TEXTURE_2D,1,lt,w.width,w.height):e.texImage2D(i.TEXTURE_2D,0,lt,w.width,w.height,0,W,Z,null));else if(x.isDataTexture)if(St.length>0){xt&&ft&&e.texStorage2D(i.TEXTURE_2D,tt,lt,St[0].width,St[0].height);for(let rt=0,it=St.length;rt<it;rt++)$=St[rt],xt?It&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,$.width,$.height,W,Z,$.data):e.texImage2D(i.TEXTURE_2D,rt,lt,$.width,$.height,0,W,Z,$.data);x.generateMipmaps=!1}else xt?(ft&&e.texStorage2D(i.TEXTURE_2D,tt,lt,w.width,w.height),It&&(function(rt,it,ct,qt){let kt=rt.updateRanges;if(kt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,it.width,it.height,ct,qt,it.data);else{kt.sort((Pt,de)=>Pt.start-de.start);let te=0;for(let Pt=1;Pt<kt.length;Pt++){let de=kt[te],Wt=kt[Pt],ne=de.start+de.count,ie=U(Wt.start,it.width,4),Fe=U(de.start,it.width,4);Wt.start<=ne+1&&ie===Fe&&U(Wt.start+Wt.count-1,it.width,4)===ie?de.count=Math.max(de.count,Wt.start+Wt.count-de.start):(++te,kt[te]=Wt)}kt.length=te+1;let Se=e.getParameter(i.UNPACK_ROW_LENGTH),_t=e.getParameter(i.UNPACK_SKIP_PIXELS),Xt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,it.width);for(let Pt=0,de=kt.length;Pt<de;Pt++){let Wt=kt[Pt],ne=Math.floor(Wt.start/4),ie=Math.ceil(Wt.count/4),Fe=ne%it.width,ke=Math.floor(ne/it.width),Hn=ie;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Fe),e.pixelStorei(i.UNPACK_SKIP_ROWS,ke),e.texSubImage2D(i.TEXTURE_2D,0,Fe,ke,Hn,1,ct,qt,it.data)}rt.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Se),e.pixelStorei(i.UNPACK_SKIP_PIXELS,_t),e.pixelStorei(i.UNPACK_SKIP_ROWS,Xt)}})(x,w,W,Z)):e.texImage2D(i.TEXTURE_2D,0,lt,w.width,w.height,0,W,Z,w.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){xt&&ft&&e.texStorage3D(i.TEXTURE_2D_ARRAY,tt,lt,St[0].width,St[0].height,w.depth);for(let rt=0,it=St.length;rt<it;rt++)if($=St[rt],x.format!==Ve)if(W!==null)if(xt){if(It)if(x.layerUpdates.size>0){let ct=Jo($.width,$.height,x.format,x.type);for(let qt of x.layerUpdates){let kt=$.data.subarray(qt*ct/$.data.BYTES_PER_ELEMENT,(qt+1)*ct/$.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,qt,$.width,$.height,1,W,kt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,0,$.width,$.height,w.depth,W,$.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,rt,lt,$.width,$.height,w.depth,0,$.data,0,0);else yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else xt?It&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,0,$.width,$.height,w.depth,W,Z,$.data):e.texImage3D(i.TEXTURE_2D_ARRAY,rt,lt,$.width,$.height,w.depth,0,W,Z,$.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{xt&&ft&&e.texStorage2D(i.TEXTURE_2D,tt,lt,St[0].width,St[0].height);for(let rt=0,it=St.length;rt<it;rt++)$=St[rt],x.format!==Ve?W!==null?xt?It&&e.compressedTexSubImage2D(i.TEXTURE_2D,rt,0,0,$.width,$.height,W,$.data):e.compressedTexImage2D(i.TEXTURE_2D,rt,lt,$.width,$.height,0,$.data):yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):xt?It&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,$.width,$.height,W,Z,$.data):e.texImage2D(i.TEXTURE_2D,rt,lt,$.width,$.height,0,W,Z,$.data)}else if(x.isDataArrayTexture)if(xt){if(ft&&e.texStorage3D(i.TEXTURE_2D_ARRAY,tt,lt,w.width,w.height,w.depth),It)if(x.layerUpdates.size>0){let rt=Jo(w.width,w.height,x.format,x.type);for(let it of x.layerUpdates){let ct=w.data.subarray(it*rt/w.data.BYTES_PER_ELEMENT,(it+1)*rt/w.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,it,w.width,w.height,1,W,Z,ct)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,w.width,w.height,w.depth,W,Z,w.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,lt,w.width,w.height,w.depth,0,W,Z,w.data);else if(x.isData3DTexture)xt?(ft&&e.texStorage3D(i.TEXTURE_3D,tt,lt,w.width,w.height,w.depth),It&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,w.width,w.height,w.depth,W,Z,w.data)):e.texImage3D(i.TEXTURE_3D,0,lt,w.width,w.height,w.depth,0,W,Z,w.data);else if(x.isFramebufferTexture){if(ft)if(xt)e.texStorage2D(i.TEXTURE_2D,tt,lt,w.width,w.height);else{let rt=w.width,it=w.height;for(let ct=0;ct<tt;ct++)e.texImage2D(i.TEXTURE_2D,ct,lt,rt,it,0,W,Z,null),rt>>=1,it>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){let rt=i.canvas;if(rt.hasAttribute("layoutsubtree")||rt.setAttribute("layoutsubtree","true"),w.parentNode!==rt)return rt.appendChild(w),f.add(x),rt.onpaint=it=>{let ct=it.changedElements;for(let qt of f)ct.includes(qt.image)&&(qt.needsUpdate=!0)},void rt.requestPaint();if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,w);else{let ct=i.RGBA,qt=i.RGBA,kt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,ct,qt,kt,w)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(St.length>0){if(xt&&ft){let rt=pt(St[0]);e.texStorage2D(i.TEXTURE_2D,tt,lt,rt.width,rt.height)}for(let rt=0,it=St.length;rt<it;rt++)$=St[rt],xt?It&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,W,Z,$):e.texImage2D(i.TEXTURE_2D,rt,lt,W,Z,$);x.generateMipmaps=!1}else if(xt){if(ft){let rt=pt(w);e.texStorage2D(i.TEXTURE_2D,tt,lt,rt.width,rt.height)}It&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,W,Z,w)}else e.texImage2D(i.TEXTURE_2D,0,lt,W,Z,w);g(x)&&m(V),O.__version=z.version,x.onUpdate&&x.onUpdate(x)}S.__version=x.version}function et(S,x,I,V,y,z){let O=s.convert(I.format,I.colorSpace),w=s.convert(I.type),W=E(I.internalFormat,O,w,I.normalized,I.colorSpace),Z=n.get(x),$=n.get(I);if($.__renderTarget=x,!Z.__hasExternalTextures){let lt=Math.max(1,x.width>>z),St=Math.max(1,x.height>>z);y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY?e.texImage3D(y,z,W,lt,St,x.depth,0,O,w,null):e.texImage2D(y,z,W,lt,St,0,O,w,null)}e.bindFramebuffer(i.FRAMEBUFFER,S),ht(x)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,y,$.__webglTexture,0,j(x)):(y===i.TEXTURE_2D||y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,y,$.__webglTexture,z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Mt(S,x,I){if(i.bindRenderbuffer(i.RENDERBUFFER,S),x.depthBuffer){let V=x.depthTexture,y=V&&V.isDepthTexture?V.type:null,z=A(x.stencilBuffer,y),O=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ht(x)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,j(x),z,x.width,x.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,j(x),z,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,z,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,O,i.RENDERBUFFER,S)}else{let V=x.textures;for(let y=0;y<V.length;y++){let z=V[y],O=s.convert(z.format,z.colorSpace),w=s.convert(z.type),W=E(z.internalFormat,O,w,z.normalized,z.colorSpace);ht(x)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,j(x),W,x.width,x.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,j(x),W,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,W,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function dt(S,x,I){let V=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,S),!x.depthTexture||!x.depthTexture.isDepthTexture)throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let y=n.get(x.depthTexture);if(y.__renderTarget=x,y.__webglTexture&&x.depthTexture.image.width===x.width&&x.depthTexture.image.height===x.height||(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),V){if(y.__webglInit===void 0&&(y.__webglInit=!0,x.depthTexture.addEventListener("dispose",R)),y.__webglTexture===void 0){y.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture),K(i.TEXTURE_CUBE_MAP,x.depthTexture);let Z=s.convert(x.depthTexture.format),$=s.convert(x.depthTexture.type),lt;x.depthTexture.format===sn?lt=i.DEPTH_COMPONENT24:x.depthTexture.format===kn&&(lt=i.DEPTH24_STENCIL8);for(let St=0;St<6;St++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,lt,x.width,x.height,0,Z,$,null)}}else J(x.depthTexture,0);let z=y.__webglTexture,O=j(x),w=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+I:i.TEXTURE_2D,W=x.depthTexture.format===kn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===sn)ht(x)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,w,z,0,O):i.framebufferTexture2D(i.FRAMEBUFFER,W,w,z,0);else{if(x.depthTexture.format!==kn)throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");ht(x)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,w,z,0,O):i.framebufferTexture2D(i.FRAMEBUFFER,W,w,z,0)}}function Nt(S){let x=n.get(S),I=S.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==S.depthTexture){let V=S.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),V){let y=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,V.removeEventListener("dispose",y)};V.addEventListener("dispose",y),x.__depthDisposeCallback=y}x.__boundDepthTexture=V}if(S.depthTexture&&!x.__autoAllocateDepthBuffer)if(I)for(let V=0;V<6;V++)dt(x.__webglFramebuffer[V],S,V);else{let V=S.texture.mipmaps;V&&V.length>0?dt(x.__webglFramebuffer[0],S,0):dt(x.__webglFramebuffer,S,0)}else if(I){x.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[V]),x.__webglDepthbuffer[V]===void 0)x.__webglDepthbuffer[V]=i.createRenderbuffer(),Mt(x.__webglDepthbuffer[V],S,!1);else{let y=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=x.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,z),i.framebufferRenderbuffer(i.FRAMEBUFFER,y,i.RENDERBUFFER,z)}}else{let V=S.texture.mipmaps;if(V&&V.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Mt(x.__webglDepthbuffer,S,!1);else{let y=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,z),i.framebufferRenderbuffer(i.FRAMEBUFFER,y,i.RENDERBUFFER,z)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}let gt=[],nt=[];function j(S){return Math.min(r.maxSamples,S.samples)}function ht(S){let x=n.get(S);return S.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Et(S,x){let I=S.colorSpace,V=S.format,y=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||I!==Wi&&I!==Sn&&(Ft.getTransfer(I)===Ht?V===Ve&&y===De||yt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Tt("WebGLTextures: Unsupported texture color space:",I)),x}function pt(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(o.width=S.naturalWidth||S.width,o.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(o.width=S.displayWidth,o.height=S.displayHeight):(o.width=S.width,o.height=S.height),o}this.allocateTextureUnit=function(){let S=P;return S>=r.maxTextures&&yt("WebGLTextures: Trying to use "+(S+1)+" texture units while this GPU supports only "+r.maxTextures),P+=1,S},this.resetTextureUnits=function(){P=0},this.getTextureUnits=function(){return P},this.setTextureUnits=function(S){P=S},this.setTexture2D=J,this.setTexture2DArray=function(S,x){let I=n.get(S);S.isRenderTargetTexture===!1&&S.version>0&&I.__version!==S.version?H(I,S,x):(S.isExternalTexture&&(I.__webglTexture=S.sourceTexture?S.sourceTexture:null),e.bindTexture(i.TEXTURE_2D_ARRAY,I.__webglTexture,i.TEXTURE0+x))},this.setTexture3D=function(S,x){let I=n.get(S);S.isRenderTargetTexture===!1&&S.version>0&&I.__version!==S.version?H(I,S,x):e.bindTexture(i.TEXTURE_3D,I.__webglTexture,i.TEXTURE0+x)},this.setTextureCube=function(S,x){let I=n.get(S);S.isCubeDepthTexture!==!0&&S.version>0&&I.__version!==S.version?(function(V,y,z){if(y.image.length!==6)return;let O=Y(V,y),w=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+z);let W=n.get(w);if(w.version!==W.__version||O===!0){e.activeTexture(i.TEXTURE0+z);let Z=Ft.getPrimaries(Ft.workingColorSpace),$=y.colorSpace===Sn?null:Ft.getPrimaries(y.colorSpace),lt=y.colorSpace===Sn||Z===$?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,lt);let St=y.isCompressedTexture||y.image[0].isCompressedTexture,xt=y.image[0]&&y.image[0].isDataTexture,ft=[];for(let _t=0;_t<6;_t++)ft[_t]=St||xt?xt?y.image[_t].image:y.image[_t]:M(y.image[_t],!0,r.maxCubemapSize),ft[_t]=Et(y,ft[_t]);let It=ft[0],tt=s.convert(y.format,y.colorSpace),rt=s.convert(y.type),it=E(y.internalFormat,tt,rt,y.normalized,y.colorSpace),ct=y.isVideoTexture!==!0,qt=W.__version===void 0||O===!0,kt=w.dataReady,te,Se=b(y,It);if(K(i.TEXTURE_CUBE_MAP,y),St){ct&&qt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Se,it,It.width,It.height);for(let _t=0;_t<6;_t++){te=ft[_t].mipmaps;for(let Xt=0;Xt<te.length;Xt++){let Pt=te[Xt];y.format!==Ve?tt!==null?ct?kt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Xt,0,0,Pt.width,Pt.height,tt,Pt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Xt,it,Pt.width,Pt.height,0,Pt.data):yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ct?kt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Xt,0,0,Pt.width,Pt.height,tt,rt,Pt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Xt,it,Pt.width,Pt.height,0,tt,rt,Pt.data)}}}else{if(te=y.mipmaps,ct&&qt){te.length>0&&Se++;let _t=pt(ft[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Se,it,_t.width,_t.height)}for(let _t=0;_t<6;_t++)if(xt){ct?kt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,ft[_t].width,ft[_t].height,tt,rt,ft[_t].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,it,ft[_t].width,ft[_t].height,0,tt,rt,ft[_t].data);for(let Xt=0;Xt<te.length;Xt++){let Pt=te[Xt].image[_t].image;ct?kt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Xt+1,0,0,Pt.width,Pt.height,tt,rt,Pt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Xt+1,it,Pt.width,Pt.height,0,tt,rt,Pt.data)}}else{ct?kt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,tt,rt,ft[_t]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,it,tt,rt,ft[_t]);for(let Xt=0;Xt<te.length;Xt++){let Pt=te[Xt];ct?kt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Xt+1,0,0,tt,rt,Pt.image[_t]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Xt+1,it,tt,rt,Pt.image[_t])}}}g(y)&&m(i.TEXTURE_CUBE_MAP),W.__version=w.version,y.onUpdate&&y.onUpdate(y)}V.__version=y.version})(I,S,x):e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+x)},this.rebindTextures=function(S,x,I){let V=n.get(S);x!==void 0&&et(V.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),I!==void 0&&Nt(S)},this.setupRenderTarget=function(S){let x=S.texture,I=n.get(S),V=n.get(x);S.addEventListener("dispose",C);let y=S.textures,z=S.isWebGLCubeRenderTarget===!0,O=y.length>1;if(O||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=x.version,a.memory.textures++),z){I.__webglFramebuffer=[];for(let w=0;w<6;w++)if(x.mipmaps&&x.mipmaps.length>0){I.__webglFramebuffer[w]=[];for(let W=0;W<x.mipmaps.length;W++)I.__webglFramebuffer[w][W]=i.createFramebuffer()}else I.__webglFramebuffer[w]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){I.__webglFramebuffer=[];for(let w=0;w<x.mipmaps.length;w++)I.__webglFramebuffer[w]=i.createFramebuffer()}else I.__webglFramebuffer=i.createFramebuffer();if(O)for(let w=0,W=y.length;w<W;w++){let Z=n.get(y[w]);Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture(),a.memory.textures++)}if(S.samples>0&&ht(S)===!1){I.__webglMultisampledFramebuffer=i.createFramebuffer(),I.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let w=0;w<y.length;w++){let W=y[w];I.__webglColorRenderbuffer[w]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,I.__webglColorRenderbuffer[w]);let Z=s.convert(W.format,W.colorSpace),$=s.convert(W.type),lt=E(W.internalFormat,Z,$,W.normalized,W.colorSpace,S.isXRRenderTarget===!0),St=j(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,St,lt,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+w,i.RENDERBUFFER,I.__webglColorRenderbuffer[w])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(I.__webglDepthRenderbuffer=i.createRenderbuffer(),Mt(I.__webglDepthRenderbuffer,S,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(z){e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),K(i.TEXTURE_CUBE_MAP,x);for(let w=0;w<6;w++)if(x.mipmaps&&x.mipmaps.length>0)for(let W=0;W<x.mipmaps.length;W++)et(I.__webglFramebuffer[w][W],S,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+w,W);else et(I.__webglFramebuffer[w],S,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+w,0);g(x)&&m(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(O){for(let w=0,W=y.length;w<W;w++){let Z=y[w],$=n.get(Z),lt=i.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(lt=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,$.__webglTexture),K(lt,Z),et(I.__webglFramebuffer,S,Z,i.COLOR_ATTACHMENT0+w,lt,0),g(Z)&&m(lt)}e.unbindTexture()}else{let w=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(w=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(w,V.__webglTexture),K(w,x),x.mipmaps&&x.mipmaps.length>0)for(let W=0;W<x.mipmaps.length;W++)et(I.__webglFramebuffer[W],S,x,i.COLOR_ATTACHMENT0,w,W);else et(I.__webglFramebuffer,S,x,i.COLOR_ATTACHMENT0,w,0);g(x)&&m(w),e.unbindTexture()}S.depthBuffer&&Nt(S)},this.updateRenderTargetMipmap=function(S){let x=S.textures;for(let I=0,V=x.length;I<V;I++){let y=x[I];if(g(y)){let z=T(S),O=n.get(y).__webglTexture;e.bindTexture(z,O),m(z),e.unbindTexture()}}},this.updateMultisampleRenderTarget=function(S){if(S.samples>0){if(ht(S)===!1){let x=S.textures,I=S.width,V=S.height,y=i.COLOR_BUFFER_BIT,z=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,O=n.get(S),w=x.length>1;if(w)for(let Z=0;Z<x.length;Z++)e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,O.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,O.__webglMultisampledFramebuffer);let W=S.texture.mipmaps;W&&W.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,O.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,O.__webglFramebuffer);for(let Z=0;Z<x.length;Z++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(y|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(y|=i.STENCIL_BUFFER_BIT)),w){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,O.__webglColorRenderbuffer[Z]);let $=n.get(x[Z]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,$,0)}i.blitFramebuffer(0,0,I,V,0,0,I,V,y,i.NEAREST),c===!0&&(gt.length=0,nt.length=0,gt.push(i.COLOR_ATTACHMENT0+Z),S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&(gt.push(z),nt.push(z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,nt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,gt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),w)for(let Z=0;Z<x.length;Z++){e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,O.__webglColorRenderbuffer[Z]);let $=n.get(x[Z]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,O.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.TEXTURE_2D,$,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,O.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&c){let x=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}},this.setupDepthRenderbuffer=Nt,this.setupFrameBufferTexture=et,this.useMultisampledRTT=ht,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Qm(i,t){return{convert:function(e,n=Sn){let r,s=Ft.getTransfer(n);if(e===De)return i.UNSIGNED_BYTE;if(e===ks)return i.UNSIGNED_SHORT_4_4_4_4;if(e===Gs)return i.UNSIGNED_SHORT_5_5_5_1;if(e===Bo)return i.UNSIGNED_INT_5_9_9_9_REV;if(e===zo)return i.UNSIGNED_INT_10F_11F_11F_REV;if(e===Fo)return i.BYTE;if(e===Oo)return i.SHORT;if(e===Pi)return i.UNSIGNED_SHORT;if(e===Vs)return i.INT;if(e===$e)return i.UNSIGNED_INT;if(e===je)return i.FLOAT;if(e===Ke)return i.HALF_FLOAT;if(e===Vo)return i.ALPHA;if(e===ko)return i.RGB;if(e===Ve)return i.RGBA;if(e===sn)return i.DEPTH_COMPONENT;if(e===kn)return i.DEPTH_STENCIL;if(e===Go)return i.RED;if(e===Hs)return i.RED_INTEGER;if(e===Gn)return i.RG;if(e===Ws)return i.RG_INTEGER;if(e===Xs)return i.RGBA_INTEGER;if(e===fr||e===mr||e===gr||e===_r)if(s===Ht){if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(e===fr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(e===mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(e===gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(e===_r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=t.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(e===fr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(e===mr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(e===gr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(e===_r)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(e===qs||e===Ys||e===Zs||e===Js){if(r=t.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(e===qs)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(e===Ys)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(e===Zs)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(e===Js)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(e===$s||e===js||e===Ks||e===Qs||e===ta||e===vr||e===ea){if(r=t.get("WEBGL_compressed_texture_etc"),r===null)return null;if(e===$s||e===js)return s===Ht?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(e===Ks)return s===Ht?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(e===Qs)return r.COMPRESSED_R11_EAC;if(e===ta)return r.COMPRESSED_SIGNED_R11_EAC;if(e===vr)return r.COMPRESSED_RG11_EAC;if(e===ea)return r.COMPRESSED_SIGNED_RG11_EAC}if(e===na||e===ia||e===ra||e===sa||e===aa||e===oa||e===la||e===ca||e===ha||e===ua||e===da||e===pa||e===fa||e===ma){if(r=t.get("WEBGL_compressed_texture_astc"),r===null)return null;if(e===na)return s===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(e===ia)return s===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(e===ra)return s===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(e===sa)return s===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(e===aa)return s===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(e===oa)return s===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(e===la)return s===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(e===ca)return s===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(e===ha)return s===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(e===ua)return s===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(e===da)return s===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(e===pa)return s===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(e===fa)return s===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(e===ma)return s===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(e===ga||e===_a||e===va){if(r=t.get("EXT_texture_compression_bptc"),r===null)return null;if(e===ga)return s===Ht?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(e===_a)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(e===va)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(e===xa||e===ya||e===xr||e===Ma){if(r=t.get("EXT_texture_compression_rgtc"),r===null)return null;if(e===xa)return r.COMPRESSED_RED_RGTC1_EXT;if(e===ya)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(e===xr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(e===Ma)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return e===Li?i.UNSIGNED_INT_24_8:i[e]!==void 0?i[e]:null}}}var tg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,eg=`
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

}`,fl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new ir(t.texture);t.depthNear===e.depthNear&&t.depthFar===e.depthFar||(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new ye({vertexShader:tg,fragmentShader:eg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ce(new jn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ml=class extends an{constructor(t,e){super();let n=this,r=null,s=1,a=null,l="local-floor",c=1,o=null,h=null,f=null,u=null,p=null,_=null,d=typeof XRWebGLBinding<"u",M=new fl,g={},m=e.getContextAttributes(),T=null,E=null,A=[],b=[],R=new Ot,C=null,B=null,P=new ve;P.viewport=new Qt;let J=new ve;J.viewport=new Qt;let L=[P,J],q=new Us,Q=null,K=null;function Y(nt){let j=b.indexOf(nt.inputSource);if(j===-1)return;let ht=A[j];ht!==void 0&&(ht.update(nt.inputSource,nt.frame,o||a),ht.dispatchEvent({type:nt.type,data:nt.inputSource}))}function U(){r.removeEventListener("select",Y),r.removeEventListener("selectstart",Y),r.removeEventListener("selectend",Y),r.removeEventListener("squeeze",Y),r.removeEventListener("squeezestart",Y),r.removeEventListener("squeezeend",Y),r.removeEventListener("end",U),r.removeEventListener("inputsourceschange",H);for(let nt=0;nt<A.length;nt++){let j=b[nt];j!==null&&(b[nt]=null,A[nt].disconnect(j))}Q=null,K=null,M.reset();for(let nt in g)delete g[nt];if(t.setRenderTarget(T),p=null,u=null,f=null,r=null,E=null,gt.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(R.width,R.height,!1),B!==null){let nt=B.camera;nt.fov=B.fov,nt.zoom=B.zoom,nt.updateProjectionMatrix(),B=null}n.dispatchEvent({type:"sessionend"})}function H(nt){for(let j=0;j<nt.removed.length;j++){let ht=nt.removed[j],Et=b.indexOf(ht);Et>=0&&(b[Et]=null,A[Et].disconnect(ht))}for(let j=0;j<nt.added.length;j++){let ht=nt.added[j],Et=b.indexOf(ht);if(Et===-1){for(let S=0;S<A.length;S++){if(S>=b.length){b.push(ht),Et=S;break}if(b[S]===null){b[S]=ht,Et=S;break}}if(Et===-1)break}let pt=A[Et];pt&&pt.connect(ht)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(nt){let j=A[nt];return j===void 0&&(j=new Ti,A[nt]=j),j.getTargetRaySpace()},this.getControllerGrip=function(nt){let j=A[nt];return j===void 0&&(j=new Ti,A[nt]=j),j.getGripSpace()},this.getHand=function(nt){let j=A[nt];return j===void 0&&(j=new Ti,A[nt]=j),j.getHandSpace()},this.setFramebufferScaleFactor=function(nt){s=nt,n.isPresenting===!0&&yt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(nt){l=nt,n.isPresenting===!0&&yt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return o||a},this.setReferenceSpace=function(nt){o=nt},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f===null&&d&&(f=new XRWebGLBinding(r,e)),f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(nt){if(r=nt,r!==null){if(T=t.getRenderTarget(),r.addEventListener("select",Y),r.addEventListener("selectstart",Y),r.addEventListener("selectend",Y),r.addEventListener("squeeze",Y),r.addEventListener("squeezestart",Y),r.addEventListener("squeezeend",Y),r.addEventListener("end",U),r.addEventListener("inputsourceschange",H),m.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(R),d&&"createProjectionLayer"in XRWebGLBinding.prototype){let j=null,ht=null,Et=null;m.depth&&(Et=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,j=m.stencil?kn:sn,ht=m.stencil?Li:$e);let pt={colorFormat:e.RGBA8,depthFormat:Et,scaleFactor:s};f=this.getBinding(),u=f.createProjectionLayer(pt),r.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),E=new we(u.textureWidth,u.textureHeight,{format:Ve,type:De,depthTexture:new Dn(u.textureWidth,u.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let j={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,e,j),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new we(p.framebufferWidth,p.framebufferHeight,{format:Ve,type:De,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),o=null,a=await r.requestReferenceSpace(l),gt.setContext(r),gt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};let et=new D,Mt=new D;function dt(nt,j){j===null?nt.matrixWorld.copy(nt.matrix):nt.matrixWorld.multiplyMatrices(j.matrixWorld,nt.matrix),nt.matrixWorldInverse.copy(nt.matrixWorld).invert()}this.updateCamera=function(nt){if(r===null)return;let j=nt.near,ht=nt.far;M.texture!==null&&(M.depthNear>0&&(j=M.depthNear),M.depthFar>0&&(ht=M.depthFar)),q.near=J.near=P.near=j,q.far=J.far=P.far=ht,Q===q.near&&K===q.far||(r.updateRenderState({depthNear:q.near,depthFar:q.far}),Q=q.near,K=q.far),q.layers.mask=6|nt.layers.mask,P.layers.mask=-5&q.layers.mask,J.layers.mask=-3&q.layers.mask;let Et=nt.parent,pt=q.cameras;dt(q,Et);for(let S=0;S<pt.length;S++)dt(pt[S],Et);pt.length===2?(function(S,x,I){et.setFromMatrixPosition(x.matrixWorld),Mt.setFromMatrixPosition(I.matrixWorld);let V=et.distanceTo(Mt),y=x.projectionMatrix.elements,z=I.projectionMatrix.elements,O=y[14]/(y[10]-1),w=y[14]/(y[10]+1),W=(y[9]+1)/y[5],Z=(y[9]-1)/y[5],$=(y[8]-1)/y[0],lt=(z[8]+1)/z[0],St=O*$,xt=O*lt,ft=V/(-$+lt),It=ft*-$;if(x.matrixWorld.decompose(S.position,S.quaternion,S.scale),S.translateX(It),S.translateZ(ft),S.matrixWorld.compose(S.position,S.quaternion,S.scale),S.matrixWorldInverse.copy(S.matrixWorld).invert(),y[10]===-1)S.projectionMatrix.copy(x.projectionMatrix),S.projectionMatrixInverse.copy(x.projectionMatrixInverse);else{let tt=O+ft,rt=w+ft,it=St-It,ct=xt+(V-It),qt=W*w/rt*tt,kt=Z*w/rt*tt;S.projectionMatrix.makePerspective(it,ct,qt,kt,tt,rt),S.projectionMatrixInverse.copy(S.projectionMatrix).invert()}})(q,P,J):q.projectionMatrix.copy(P.projectionMatrix),B===null&&nt.isPerspectiveCamera&&(B={camera:nt,fov:nt.fov,zoom:nt.zoom}),(function(S,x,I){I===null?S.matrix.copy(x.matrixWorld):(S.matrix.copy(I.matrixWorld),S.matrix.invert(),S.matrix.multiply(x.matrixWorld)),S.matrix.decompose(S.position,S.quaternion,S.scale),S.updateMatrixWorld(!0),S.projectionMatrix.copy(x.projectionMatrix),S.projectionMatrixInverse.copy(x.projectionMatrixInverse),S.isPerspectiveCamera&&(S.fov=2*hs*Math.atan(1/S.projectionMatrix.elements[5]),S.zoom=1)})(nt,q,Et)},this.getCamera=function(){return q},this.getFoveation=function(){if(u!==null||p!==null)return c},this.setFoveation=function(nt){c=nt,u!==null&&(u.fixedFoveation=nt),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=nt)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(q)},this.getCameraTexture=function(nt){return g[nt]};let Nt=null,gt=new mh;gt.setAnimationLoop(function(nt,j){if(h=j.getViewerPose(o||a),_=j,h!==null){let ht=h.views;p!==null&&(t.setRenderTargetFramebuffer(E,p.framebuffer),t.setRenderTarget(E));let Et=!1;ht.length!==q.cameras.length&&(q.cameras.length=0,Et=!0);for(let S=0;S<ht.length;S++){let x=ht[S],I=null;if(p!==null)I=p.getViewport(x);else{let y=f.getViewSubImage(u,x);I=y.viewport,S===0&&(t.setRenderTargetTextures(E,y.colorTexture,y.depthStencilTexture),t.setRenderTarget(E))}let V=L[S];V===void 0&&(V=new ve,V.layers.enable(S),V.viewport=new Qt,L[S]=V),V.matrix.fromArray(x.transform.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale),V.projectionMatrix.fromArray(x.projectionMatrix),V.projectionMatrixInverse.copy(V.projectionMatrix).invert(),V.viewport.set(I.x,I.y,I.width,I.height),S===0&&(q.matrix.copy(V.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale)),Et===!0&&q.cameras.push(V)}let pt=r.enabledFeatures;if(pt&&pt.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&d){f=n.getBinding();let S=f.getDepthInformation(ht[0]);S&&S.isValid&&S.texture&&M.init(S,r.renderState)}if(pt&&pt.includes("camera-access")&&d){t.state.unbindTexture(),f=n.getBinding();for(let S=0;S<ht.length;S++){let x=ht[S].camera;if(x){let I=g[x];I||(I=new ir,g[x]=I);let V=f.getCameraImage(x);I.sourceTexture=V}}}}for(let ht=0;ht<A.length;ht++){let Et=b[ht],pt=A[ht];Et!==null&&pt!==void 0&&pt.update(Et,j,o||a)}Nt&&Nt(nt,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),_=null}),this.setAnimationLoop=function(nt){Nt=nt},this.dispose=function(){}}},ng=new Kt,Mh=new Ct;function ig(i,t){function e(r,s){r.matrixAutoUpdate===!0&&r.updateMatrix(),s.value.copy(r.matrix)}function n(r,s){r.opacity.value=s.opacity,s.color&&r.diffuse.value.copy(s.color),s.emissive&&r.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(r.map.value=s.map,e(s.map,r.mapTransform)),s.alphaMap&&(r.alphaMap.value=s.alphaMap,e(s.alphaMap,r.alphaMapTransform)),s.bumpMap&&(r.bumpMap.value=s.bumpMap,e(s.bumpMap,r.bumpMapTransform),r.bumpScale.value=s.bumpScale,s.side===be&&(r.bumpScale.value*=-1)),s.normalMap&&(r.normalMap.value=s.normalMap,e(s.normalMap,r.normalMapTransform),r.normalScale.value.copy(s.normalScale),s.side===be&&r.normalScale.value.negate()),s.displacementMap&&(r.displacementMap.value=s.displacementMap,e(s.displacementMap,r.displacementMapTransform),r.displacementScale.value=s.displacementScale,r.displacementBias.value=s.displacementBias),s.emissiveMap&&(r.emissiveMap.value=s.emissiveMap,e(s.emissiveMap,r.emissiveMapTransform)),s.specularMap&&(r.specularMap.value=s.specularMap,e(s.specularMap,r.specularMapTransform)),s.alphaTest>0&&(r.alphaTest.value=s.alphaTest);let a=t.get(s),l=a.envMap,c=a.envMapRotation;l&&(r.envMap.value=l,r.envMapRotation.value.setFromMatrix4(ng.makeRotationFromEuler(c)).transpose(),l.isCubeTexture&&l.isRenderTargetTexture===!1&&r.envMapRotation.value.premultiply(Mh),r.reflectivity.value=s.reflectivity,r.ior.value=s.ior,r.refractionRatio.value=s.refractionRatio),s.lightMap&&(r.lightMap.value=s.lightMap,r.lightMapIntensity.value=s.lightMapIntensity,e(s.lightMap,r.lightMapTransform)),s.aoMap&&(r.aoMap.value=s.aoMap,r.aoMapIntensity.value=s.aoMapIntensity,e(s.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,s){s.color.getRGB(r.fogColor.value,qo(i)),s.isFog?(r.fogNear.value=s.near,r.fogFar.value=s.far):s.isFogExp2&&(r.fogDensity.value=s.density)},refreshMaterialUniforms:function(r,s,a,l,c){s.isNodeMaterial?s.uniformsNeedUpdate=!1:s.isMeshBasicMaterial?n(r,s):s.isMeshLambertMaterial?(n(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshToonMaterial?(n(r,s),(function(o,h){h.gradientMap&&(o.gradientMap.value=h.gradientMap)})(r,s)):s.isMeshPhongMaterial?(n(r,s),(function(o,h){o.specular.value.copy(h.specular),o.shininess.value=Math.max(h.shininess,1e-4)})(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshStandardMaterial?(n(r,s),(function(o,h){o.metalness.value=h.metalness,h.metalnessMap&&(o.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,o.metalnessMapTransform)),o.roughness.value=h.roughness,h.roughnessMap&&(o.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,o.roughnessMapTransform)),h.envMap&&(o.envMapIntensity.value=h.envMapIntensity)})(r,s),s.isMeshPhysicalMaterial&&(function(o,h,f){o.ior.value=h.ior,h.sheen>0&&(o.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),o.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(o.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,o.sheenColorMapTransform)),h.sheenRoughnessMap&&(o.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,o.sheenRoughnessMapTransform))),h.clearcoat>0&&(o.clearcoat.value=h.clearcoat,o.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(o.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,o.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(o.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,o.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(o.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,o.clearcoatNormalMapTransform),o.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===be&&o.clearcoatNormalScale.value.negate())),h.dispersion>0&&(o.dispersion.value=h.dispersion),h.retroreflectivity>0&&(o.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(o.iridescence.value=h.iridescence,o.iridescenceIOR.value=h.iridescenceIOR,o.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],o.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(o.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,o.iridescenceMapTransform)),h.iridescenceThicknessMap&&(o.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,o.iridescenceThicknessMapTransform))),h.transmission>0&&(o.transmission.value=h.transmission,o.transmissionSamplerMap.value=f.texture,o.transmissionSamplerSize.value.set(f.width,f.height),h.transmissionMap&&(o.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,o.transmissionMapTransform)),o.thickness.value=h.thickness,h.thicknessMap&&(o.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,o.thicknessMapTransform)),o.attenuationDistance.value=h.attenuationDistance,o.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(o.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(o.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,o.anisotropyMapTransform))),o.specularIntensity.value=h.specularIntensity,o.specularColor.value.copy(h.specularColor),h.specularColorMap&&(o.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,o.specularColorMapTransform)),h.specularIntensityMap&&(o.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,o.specularIntensityMapTransform))})(r,s,c)):s.isMeshMatcapMaterial?(n(r,s),(function(o,h){h.matcap&&(o.matcap.value=h.matcap)})(r,s)):s.isMeshDepthMaterial?n(r,s):s.isMeshDistanceMaterial?(n(r,s),(function(o,h){let f=t.get(h).light;o.referencePosition.value.setFromMatrixPosition(f.matrixWorld),o.nearDistance.value=f.shadow.camera.near,o.farDistance.value=f.shadow.camera.far})(r,s)):s.isMeshNormalMaterial?n(r,s):s.isLineBasicMaterial?((function(o,h){o.diffuse.value.copy(h.color),o.opacity.value=h.opacity,h.map&&(o.map.value=h.map,e(h.map,o.mapTransform))})(r,s),s.isLineDashedMaterial&&(function(o,h){o.dashSize.value=h.dashSize,o.totalSize.value=h.dashSize+h.gapSize,o.scale.value=h.scale})(r,s)):s.isPointsMaterial?(function(o,h,f,u){o.diffuse.value.copy(h.color),o.opacity.value=h.opacity,o.size.value=h.size*f,o.scale.value=.5*u,h.map&&(o.map.value=h.map,e(h.map,o.uvTransform)),h.alphaMap&&(o.alphaMap.value=h.alphaMap,e(h.alphaMap,o.alphaMapTransform)),h.alphaTest>0&&(o.alphaTest.value=h.alphaTest)})(r,s,a,l):s.isSpriteMaterial?(function(o,h){o.diffuse.value.copy(h.color),o.opacity.value=h.opacity,o.rotation.value=h.rotation,h.map&&(o.map.value=h.map,e(h.map,o.mapTransform)),h.alphaMap&&(o.alphaMap.value=h.alphaMap,e(h.alphaMap,o.alphaMapTransform)),h.alphaTest>0&&(o.alphaTest.value=h.alphaTest)})(r,s):s.isShadowMaterial?(r.color.value.copy(s.color),r.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function rg(i,t,e,n){let r={},s={},a=[],l=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(u,p,_,d){if((function(M,g,m,T){let E=M.value,A=g+"_"+m;if(T[A]===void 0)return typeof E=="number"||typeof E=="boolean"?T[A]=E:ArrayBuffer.isView(E)?T[A]=E.slice():T[A]=E.clone(),!0;{let b=T[A];if(typeof E=="number"||typeof E=="boolean"){if(b!==E)return T[A]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(b.equals(E)===!1)return b.copy(E),!0}}return!1})(u,p,_,d)===!0){let M=u.__offset,g=u.value;if(Array.isArray(g)){let m=0;for(let T=0;T<g.length;T++){let E=g[T],A=h(E);o(E,u.__data,m),typeof E=="number"||typeof E=="boolean"||E.isMatrix3||ArrayBuffer.isView(E)||(m+=A.storage/Float32Array.BYTES_PER_ELEMENT)}}else o(g,u.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,M,u.__data)}}function o(u,p,_){typeof u=="number"||typeof u=="boolean"?p[0]=u:u.isMatrix3?(p[0]=u.elements[0],p[1]=u.elements[1],p[2]=u.elements[2],p[3]=0,p[4]=u.elements[3],p[5]=u.elements[4],p[6]=u.elements[5],p[7]=0,p[8]=u.elements[6],p[9]=u.elements[7],p[10]=u.elements[8],p[11]=0):ArrayBuffer.isView(u)?p.set(new u.constructor(u.buffer,u.byteOffset,p.length)):u.toArray(p,_)}function h(u){let p={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(p.boundary=4,p.storage=4):u.isVector2?(p.boundary=8,p.storage=8):u.isVector3||u.isColor?(p.boundary=16,p.storage=12):u.isVector4?(p.boundary=16,p.storage=16):u.isMatrix3?(p.boundary=48,p.storage=48):u.isMatrix4?(p.boundary=64,p.storage=64):u.isTexture?yt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(u)?(p.boundary=16,p.storage=u.byteLength):yt("WebGLRenderer: Unsupported uniform value type.",u),p}function f(u){let p=u.target;p.removeEventListener("dispose",f);let _=a.indexOf(p.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(r[p.id]),delete r[p.id],delete s[p.id]}return{bind:function(u,p){let _=p.program;n.uniformBlockBinding(u,_)},update:function(u,p){let _=r[u.id];_===void 0&&((function(g){let m=g.uniforms,T=0,E=16;for(let b=0,R=m.length;b<R;b++){let C=Array.isArray(m[b])?m[b]:[m[b]];for(let B=0,P=C.length;B<P;B++){let J=C[B],L=Array.isArray(J.value)?J.value:[J.value];for(let q=0,Q=L.length;q<Q;q++){let K=h(L[q]),Y=T%E,U=Y%K.boundary,H=Y+U;T+=U,H!==0&&E-H<K.storage&&(T+=E-H),J.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=T,T+=K.storage}}}let A=T%E;A>0&&(T+=E-A),g.__size=T,g.__cache={}})(u),_=(function(g){let m=(function(){for(let b=0;b<l;b++)if(a.indexOf(b)===-1)return a.push(b),b;return Tt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();g.__bindingPointIndex=m;let T=i.createBuffer(),E=g.__size,A=g.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,E,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,m,T),T})(u),r[u.id]=_,u.addEventListener("dispose",f));let d=p.program;n.updateUBOMapping(u,d);let M=t.render.frame;s[u.id]!==M&&((function(g){let m=r[g.id],T=g.uniforms,E=g.__cache;i.bindBuffer(i.UNIFORM_BUFFER,m);for(let A=0,b=T.length;A<b;A++){let R=T[A];if(Array.isArray(R))for(let C=0,B=R.length;C<B;C++)c(R[C],A,C,E);else c(R,A,0,E)}i.bindBuffer(i.UNIFORM_BUFFER,null)})(u),s[u.id]=M)},dispose:function(){for(let u in r)i.deleteBuffer(r[u]);a=[],r={},s={}}}}Mh.set(-1,0,0,0,1,0,0,0,1);var sg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),hn=null;function ag(){return hn===null&&(hn=new fs(sg,16,16,Gn,Ke),hn.name="DFG_LUT",hn.minFilter=fe,hn.magFilter=fe,hn.wrapS=rn,hn.wrapT=rn,hn.generateMipmaps=!1,hn.needsUpdate=!0),hn}var Ca=class{constructor(t={}){let{canvas:e=Vc(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:l=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:o=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:p=De}=t,_;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;let d=p,M=new Set([Xs,Ws,Hs]),g=new Set([De,$e,Pi,Li,ks,Gs]),m=new Uint32Array(4),T=new Int32Array(4),E=new D,A=null,b=null,R=[],C=[],B=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Je,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,J=!1,L=null,q=null,Q=null,K=null;this._outputColorSpace=Le;let Y=0,U=0,H=null,et=-1,Mt=null,dt=new Qt,Nt=new Qt,gt=null,nt=new Dt(0),j=0,ht=e.width,Et=e.height,pt=1,S=null,x=null,I=new Qt(0,0,ht,Et),V=new Qt(0,0,ht,Et),y=!1,z=new tr,O=!1,w=!1,W=new Kt,Z=new D,$=new Qt,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},St=!1;function xt(){return H===null?pt:1}let ft,It,tt,rt,it,ct,qt,kt,te,Se,_t,Xt,Pt,de,Wt,ne,ie,Fe,ke,Hn,Qe,bn,Er,N=n;function xl(v,F){return e.getContext(v,F)}try{let v={alpha:!0,depth:r,stencil:s,antialias:l,premultipliedAlpha:c,preserveDrawingBuffer:o,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Da,!1),e.addEventListener("webglcontextrestored",Ua,!1),e.addEventListener("webglcontextcreationerror",Fa,!1),N===null){let F="webgl2";if(N=xl(F,v),N===null)throw xl(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}yl()}catch(v){throw e.removeEventListener("webglcontextlost",Da,!1),e.removeEventListener("webglcontextrestored",Ua,!1),e.removeEventListener("webglcontextcreationerror",Fa,!1),Tt("WebGLRenderer: "+v.message),v}function yl(){ft=new ff(N),ft.init(),Qe=new Qm(N,ft),It=new of(N,ft,t,Qe),tt=new jm(N,ft),It.reversedDepthBuffer&&u&&tt.buffers.depth.setReversed(!0),q=N.createFramebuffer(),Q=N.createFramebuffer(),K=N.createFramebuffer(),rt=new _f(N),it=new Om,ct=new Km(N,ft,tt,it,It,Qe,rt),qt=new pf(P),kt=new Mu(N),bn=new sf(N,kt),te=new mf(N,kt,rt,bn),Se=new xf(N,te,kt,bn,rt),Fe=new vf(N,It,ct),Wt=new lf(it),_t=new Fm(P,qt,ft,It,bn,Wt),Xt=new ig(P,it),Pt=new zm,de=new Xm(ft),ie=new rf(P,qt,tt,Se,_,c),ne=new $m(P,Se,It),Er=new rg(N,rt,It,tt),ke=new af(N,ft,rt),Hn=new gf(N,ft,rt),rt.programs=_t.programs,P.capabilities=It,P.extensions=ft,P.properties=it,P.renderLists=Pt,P.shadowMap=ne,P.state=tt,P.info=rt}d!==De&&(B=new Mf(d,e.width,e.height,l,r,s));let re=new ml(P,N);function Da(v){v.preventDefault(),Xo("WebGLRenderer: Context Lost."),J=!0}function Ua(){Xo("WebGLRenderer: Context Restored."),J=!1;let v=rt.autoReset,F=ne.enabled,k=ne.autoUpdate,X=ne.needsUpdate,G=ne.type;yl(),rt.autoReset=v,ne.enabled=F,ne.autoUpdate=k,ne.needsUpdate=X,ne.type=G}function Fa(v){Tt("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Ml(v){let F=v.target;F.removeEventListener("dispose",Ml),(function(k){(function(X){let G=it.get(X).programs;G!==void 0&&(G.forEach(function(st){_t.releaseProgram(st)}),X.isShaderMaterial&&_t.releaseShaderCache(X))})(k),it.remove(k)})(F)}function Sl(v,F,k,X){L!==null&&v.isNodeMaterial&&L.setObject(X,v),O===!0&&Wt.setState(v,k,!1),v.transparent===!0&&v.side===ln&&v.forceSinglePass===!1?(v.side=be,v.needsUpdate=!0,Ar(v,F,X),v.side=Bn,v.needsUpdate=!0,Ar(v,F,X),v.side=ln):Ar(v,F,X)}this.xr=re,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let v=ft.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=ft.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return pt},this.setPixelRatio=function(v){v!==void 0&&(pt=v,this.setSize(ht,Et,!1))},this.getSize=function(v){return v.set(ht,Et)},this.setSize=function(v,F,k=!0){re.isPresenting?yt("WebGLRenderer: Can't change size while VR device is presenting."):(ht=v,Et=F,e.width=Math.floor(v*pt),e.height=Math.floor(F*pt),k===!0&&(e.style.width=v+"px",e.style.height=F+"px"),B!==null&&B.setSize(e.width,e.height),this.setViewport(0,0,v,F))},this.getDrawingBufferSize=function(v){return v.set(ht*pt,Et*pt).floor()},this.setDrawingBufferSize=function(v,F,k){ht=v,Et=F,pt=k,e.width=Math.floor(v*k),e.height=Math.floor(F*k),this.setViewport(0,0,v,F)},this.setEffects=function(v){if(d!==De){if(v){for(let F=0;F<v.length;F++)if(v[F].isOutputPass===!0){yt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}B.setEffects(v||[])}else Tt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.")},this.getCurrentViewport=function(v){return v.copy(dt)},this.getViewport=function(v){return v.copy(I)},this.setViewport=function(v,F,k,X){v.isVector4?I.set(v.x,v.y,v.z,v.w):I.set(v,F,k,X),tt.viewport(dt.copy(I).multiplyScalar(pt).round())},this.getScissor=function(v){return v.copy(V)},this.setScissor=function(v,F,k,X){v.isVector4?V.set(v.x,v.y,v.z,v.w):V.set(v,F,k,X),tt.scissor(Nt.copy(V).multiplyScalar(pt).round())},this.getScissorTest=function(){return y},this.setScissorTest=function(v){tt.setScissorTest(y=v)},this.setOpaqueSort=function(v){S=v},this.setTransparentSort=function(v){x=v},this.getClearColor=function(v){return v.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor(...arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha(...arguments)},this.clear=function(v=!0,F=!0,k=!0){let X=0;if(v){let G=!1;if(H!==null){let st=H.texture.format;G=M.has(st)}if(G){let st=H.texture.type,ot=g.has(st),ut=ie.getClearColor(),mt=ie.getClearAlpha(),bt=ut.r,Vt=ut.g,Gt=ut.b;ot?(m[0]=bt,m[1]=Vt,m[2]=Gt,m[3]=mt,N.clearBufferuiv(N.COLOR,0,m)):(T[0]=bt,T[1]=Vt,T[2]=Gt,T[3]=mt,N.clearBufferiv(N.COLOR,0,T))}else X|=N.COLOR_BUFFER_BIT}F&&(X|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),k&&(X|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&N.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),L=v},this.dispose=function(){e.removeEventListener("webglcontextlost",Da,!1),e.removeEventListener("webglcontextrestored",Ua,!1),e.removeEventListener("webglcontextcreationerror",Fa,!1),ie.dispose(),Pt.dispose(),de.dispose(),it.dispose(),qt.dispose(),Se.dispose(),bn.dispose(),Er.dispose(),_t.dispose(),re.dispose(),re.removeEventListener("sessionstart",bl),re.removeEventListener("sessionend",Tl),Wn.stop()},this.renderBufferDirect=function(v,F,k,X,G,st){F===null&&(F=lt);let ot=G.isMesh&&G.matrixWorld.determinantAffine()<0,ut=(function(Ut,jt,pe,wt,Rt){jt.isScene!==!0&&(jt=lt),ct.resetTextureUnits();let Ge=jt.fog,za=wt.isMeshStandardMaterial||wt.isMeshLambertMaterial||wt.isMeshPhongMaterial?jt.environment:null,Cr=H===null?P.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:Ft.workingColorSpace,Fi=wt.isMeshStandardMaterial||wt.isMeshLambertMaterial&&!wt.envMap||wt.isMeshPhongMaterial&&!wt.envMap,tn=qt.get(wt.envMap||za,Fi),ii=wt.vertexColors===!0&&!!pe.attributes.color&&pe.attributes.color.itemSize===4,dn=!!pe.attributes.tangent&&(!!wt.normalMap||wt.anisotropy>0),Va=!!pe.morphAttributes.position,ri=!!pe.morphAttributes.normal,Fh=!!pe.morphAttributes.color,Pl=Je;wt.toneMapped&&(H!==null&&H.isXRRenderTarget!==!0||(Pl=P.toneMapping));let Ll=pe.morphAttributes.position||pe.morphAttributes.normal||pe.morphAttributes.color,Oh=Ll!==void 0?Ll.length:0,At=it.get(wt),pn=b.state.lights;if(O===!0&&(w===!0||Ut!==Mt)){let se=Ut===Mt&&wt.id===et;Wt.setState(wt,Ut,se)}let He=!1;wt.version===At.__version?At.needsLights&&At.lightsStateVersion!==pn.state.version||At.outputColorSpace!==Cr||Rt.isBatchedMesh&&At.batching===!1?He=!0:Rt.isBatchedMesh||At.batching!==!0?Rt.isBatchedMesh&&At.batchingColor===!0&&Rt._colorsTexture===null||Rt.isBatchedMesh&&At.batchingColor===!1&&Rt._colorsTexture!==null||Rt.isInstancedMesh&&At.instancing===!1?He=!0:Rt.isInstancedMesh||At.instancing!==!0?Rt.isSkinnedMesh&&At.skinning===!1?He=!0:Rt.isSkinnedMesh||At.skinning!==!0?Rt.isInstancedMesh&&At.instancingColor===!0&&Rt.instanceColor===null||Rt.isInstancedMesh&&At.instancingColor===!1&&Rt.instanceColor!==null||Rt.isInstancedMesh&&At.instancingMorph===!0&&Rt.morphTexture===null||Rt.isInstancedMesh&&At.instancingMorph===!1&&Rt.morphTexture!==null||At.envMap!==tn||wt.fog===!0&&At.fog!==Ge?He=!0:At.numClippingPlanes===void 0||At.numClippingPlanes===Wt.numPlanes&&At.numIntersection===Wt.numIntersection?(At.vertexAlphas!==ii||At.vertexTangents!==dn||At.morphTargets!==Va||At.morphNormals!==ri||At.morphColors!==Fh||At.toneMapping!==Pl||At.morphTargetsCount!==Oh||!!At.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(He=!0):He=!0:He=!0:He=!0:He=!0:(He=!0,At.__version=wt.version);let Tn=At.currentProgram;He===!0&&(Tn=Ar(wt,jt,Rt),L&&wt.isNodeMaterial&&L.onUpdateProgram(wt,Tn,At));let Nl=!1,si=!1,ka=!1,Zt=Tn.getUniforms(),Oe=At.uniforms;if(tt.useProgram(Tn.program)&&(Nl=!0,si=!0,ka=!0),wt.id!==et&&(et=wt.id,si=!0),At.needsLights){let se=(function(en,Ha){if(en.length===0)return null;if(en.length===1)return en[0].texture!==null?en[0]:null;E.setFromMatrixPosition(Ha.matrixWorld);for(let ai=0,Bh=en.length;ai<Bh;ai++){let Wa=en[ai];if(Wa.texture!==null&&Wa.boundingBox.containsPoint(E))return Wa}return null})(b.state.lightProbeGridArray,Rt);At.lightProbeGrid!==se&&(At.lightProbeGrid=se,si=!0)}if(Nl||Mt!==Ut){tt.buffers.depth.getReversed()&&Ut.reversedDepth!==!0&&(Ut._reversedDepth=!0,Ut.updateProjectionMatrix()),Zt.setValue(N,"projectionMatrix",Ut.projectionMatrix),Zt.setValue(N,"viewMatrix",Ut.matrixWorldInverse);let se=Zt.map.cameraPosition;se!==void 0&&se.setValue(N,Z.setFromMatrixPosition(Ut.matrixWorld)),It.logarithmicDepthBuffer&&Zt.setValue(N,"logDepthBufFC",2/(Math.log(Ut.far+1)/Math.LN2)),(wt.isMeshPhongMaterial||wt.isMeshToonMaterial||wt.isMeshLambertMaterial||wt.isMeshBasicMaterial||wt.isMeshStandardMaterial||wt.isShaderMaterial)&&Zt.setValue(N,"isOrthographic",Ut.isOrthographicCamera===!0),Mt!==Ut&&(Mt=Ut,si=!0,ka=!0)}if(At.needsLights&&(pn.state.sunShadowMap.length>0&&Zt.setValue(N,"sunShadowMap",pn.state.sunShadowMap,ct),pn.state.directionalShadowMap.length>0&&Zt.setValue(N,"directionalShadowMap",pn.state.directionalShadowMap,ct),pn.state.spotShadowMap.length>0&&Zt.setValue(N,"spotShadowMap",pn.state.spotShadowMap,ct),pn.state.pointShadowMap.length>0&&Zt.setValue(N,"pointShadowMap",pn.state.pointShadowMap,ct)),Rt.isSkinnedMesh){Zt.setOptional(N,Rt,"bindMatrix"),Zt.setOptional(N,Rt,"bindMatrixInverse");let se=Rt.skeleton;se&&(se.boneTexture===null&&se.computeBoneTexture(),Zt.setValue(N,"boneTexture",se.boneTexture,ct))}Rt.isBatchedMesh&&(Zt.setOptional(N,Rt,"batchingTexture"),Zt.setValue(N,"batchingTexture",Rt._matricesTexture,ct),Zt.setOptional(N,Rt,"batchingIdTexture"),Zt.setValue(N,"batchingIdTexture",Rt._indirectTexture,ct),Zt.setOptional(N,Rt,"batchingColorTexture"),Rt._colorsTexture!==null&&Zt.setValue(N,"batchingColorTexture",Rt._colorsTexture,ct));let Ga=pe.morphAttributes;if(Ga.position===void 0&&Ga.normal===void 0&&Ga.color===void 0||Fe.update(Rt,pe,Tn),(si||At.receiveShadow!==Rt.receiveShadow)&&(At.receiveShadow=Rt.receiveShadow,Zt.setValue(N,"receiveShadow",Rt.receiveShadow)),(wt.isMeshStandardMaterial||wt.isMeshLambertMaterial||wt.isMeshPhongMaterial)&&wt.envMap===null&&jt.environment!==null&&(Oe.envMapIntensity.value=jt.environmentIntensity),Oe.dfgLUT!==void 0&&(Oe.dfgLUT.value=ag()),si){if(Zt.setValue(N,"toneMappingExposure",P.toneMappingExposure),At.needsLights&&(Re=ka,(Be=Oe).ambientLightColor.needsUpdate=Re,Be.lightProbe.needsUpdate=Re,Be.sunLights.needsUpdate=Re,Be.sunLightShadows.needsUpdate=Re,Be.directionalLights.needsUpdate=Re,Be.directionalLightShadows.needsUpdate=Re,Be.pointLights.needsUpdate=Re,Be.pointLightShadows.needsUpdate=Re,Be.spotLights.needsUpdate=Re,Be.spotLightShadows.needsUpdate=Re,Be.rectAreaLights.needsUpdate=Re,Be.hemisphereLights.needsUpdate=Re),Ge&&wt.fog===!0&&Xt.refreshFogUniforms(Oe,Ge),Xt.refreshMaterialUniforms(Oe,wt,pt,Et,b.state.transmissionRenderTarget[Ut.id]),At.needsLights&&At.lightProbeGrid){let se=At.lightProbeGrid;Oe.probesSH.value=se.texture,Oe.probesMin.value.copy(se.boundingBox.min),Oe.probesMax.value.copy(se.boundingBox.max),Oe.probesResolution.value.copy(se.resolution)}Di.upload(N,Cl(At),Oe,ct)}var Be,Re;if(wt.isShaderMaterial&&wt.uniformsNeedUpdate===!0&&(Di.upload(N,Cl(At),Oe,ct),wt.uniformsNeedUpdate=!1),wt.isSpriteMaterial&&Zt.setValue(N,"center",Rt.center),Zt.setValue(N,"modelViewMatrix",Rt.modelViewMatrix),Zt.setValue(N,"normalMatrix",Rt.normalMatrix),Zt.setValue(N,"modelMatrix",Rt.matrixWorld),wt.uniformsGroups!==void 0){let se=wt.uniformsGroups;for(let en=0,Ha=se.length;en<Ha;en++){let ai=se[en];Er.update(ai,Tn),Er.bind(ai,Tn)}}return Tn})(v,F,k,X,G);tt.setMaterial(X,ot);let mt=k.index,bt=1;if(X.wireframe===!0){if(mt=te.getWireframeAttribute(k),mt===void 0)return;bt=2}let Vt=k.drawRange,Gt=k.attributes.position,vt=Vt.start*bt,zt=(Vt.start+Vt.count)*bt;st!==null&&(vt=Math.max(vt,st.start*bt),zt=Math.min(zt,(st.start+st.count)*bt)),mt!==null?(vt=Math.max(vt,0),zt=Math.min(zt,mt.count)):Gt!=null&&(vt=Math.max(vt,0),zt=Math.min(zt,Gt.count));let ce=zt-vt;if(ce<0||ce===1/0)return;let Jt;bn.setup(G,X,ut,k,mt);let $t=ke;if(mt!==null&&(Jt=kt.get(mt),$t=Hn,$t.setIndex(Jt)),G.isMesh)X.wireframe===!0?(tt.setLineWidth(X.wireframeLinewidth*xt()),$t.setMode(N.LINES)):$t.setMode(N.TRIANGLES);else if(G.isLine){let Ut=X.linewidth;Ut===void 0&&(Ut=1),tt.setLineWidth(Ut*xt()),G.isLineSegments?$t.setMode(N.LINES):G.isLineLoop?$t.setMode(N.LINE_LOOP):$t.setMode(N.LINE_STRIP)}else G.isPoints?$t.setMode(N.POINTS):G.isSprite&&$t.setMode(N.TRIANGLES);if(G.isBatchedMesh)if(ft.get("WEBGL_multi_draw"))$t.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let Ut=G._multiDrawStarts,jt=G._multiDrawCounts,pe=G._multiDrawCount,wt=mt?kt.get(mt).bytesPerElement:1,Rt=it.get(X).currentProgram.getUniforms();for(let Ge=0;Ge<pe;Ge++)Rt.setValue(N,"_gl_DrawID",Ge),$t.render(Ut[Ge]/wt,jt[Ge])}else if(G.isInstancedMesh)$t.renderInstances(vt,ce,G.count);else if(k.isInstancedBufferGeometry){let Ut=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,jt=Math.min(k.instanceCount,Ut);$t.renderInstances(vt,ce,jt)}else $t.render(vt,ce)},this.compile=function(v,F,k=null){k===null&&(k=v),L!==null&&L.renderStart(v,F,k),b=de.get(k),b.init(F),C.push(b),k.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(b.pushLight(G),G.castShadow&&b.pushShadow(G))}),v!==k&&v.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(b.pushLight(G),G.castShadow&&b.pushShadow(G))}),b.setupLights(),L!==null&&L.updateLights(b.state.lightsArray),w=this.localClippingEnabled,O=Wt.init(this.clippingPlanes,w),O===!0&&Wt.setGlobalState(this.clippingPlanes,F),L!==null&&ne.render(b.state.shadowsArray,k,F);let X=new Set;return v.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let st=G.material;if(st)if(Array.isArray(st))for(let ot=0;ot<st.length;ot++){let ut=st[ot];Sl(ut,k,F,G),X.add(ut)}else Sl(st,k,F,G),X.add(st)}),b=C.pop(),L!==null&&L.renderEnd(),X},this.compileAsync=function(v,F,k=null){let X=this.compile(v,F,k);return new Promise(G=>{function st(){X.forEach(function(ot){let ut=it.get(ot).currentProgram;(ut===void 0||ut.isReady())&&X.delete(ot)}),X.size!==0?setTimeout(st,10):G(v)}ft.get("KHR_parallel_shader_compile")!==null?st():setTimeout(st,10)})};let Oa=null;function bl(){Wn.stop()}function Tl(){Wn.start()}let Wn=new mh;function Ba(v,F,k,X){if(v.visible===!1)return;if(v.layers.test(F.layers)){if(v.isGroup)k=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(F);else if(v.isLightProbeGrid)b.pushLightProbeGrid(v);else if(v.isLight)b.pushLight(v),v.castShadow&&b.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(z)){X&&$.setFromMatrixPosition(v.matrixWorld).applyMatrix4(W);let st=Se.update(v),ot=v.material;ot.visible&&A.push(v,st,ot,k,$.z,null,F)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||v.intersectsFrustum(z))){let st=Se.update(v),ot=v.material;if(X&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),$.copy(v.boundingSphere.center)):(st.boundingSphere===null&&st.computeBoundingSphere(),$.copy(st.boundingSphere.center)),$.applyMatrix4(v.matrixWorld).applyMatrix4(W)),Array.isArray(ot)){let ut=st.groups;for(let mt=0,bt=ut.length;mt<bt;mt++){let Vt=ut[mt],Gt=ot[Vt.materialIndex];Gt&&Gt.visible&&A.push(v,st,Gt,k,$.z,Vt,F)}}else ot.visible&&A.push(v,st,ot,k,$.z,null,F)}}let G=v.children;for(let st=0,ot=G.length;st<ot;st++)Ba(G[st],F,k,X)}function El(v,F,k,X){let{opaque:G,transmissive:st,transparent:ot}=v;b.setupLightsView(k),O===!0&&Wt.setGlobalState(P.clippingPlanes,k),X&&tt.viewport(dt.copy(X)),G.length>0&&wr(G,F,k),st.length>0&&wr(st,F,k),ot.length>0&&wr(ot,F,k),tt.buffers.depth.setTest(!0),tt.buffers.depth.setMask(!0),tt.buffers.color.setMask(!0),tt.setPolygonOffset(!1)}function wl(v,F,k,X){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[X.id]===void 0){let Gt=ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[X.id]=new we(1,1,{generateMipmaps:!0,type:Gt?Ke:De,minFilter:Vn,samples:Math.max(4,It.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ft.workingColorSpace})}let G=b.state.transmissionRenderTarget[X.id],st=X.viewport||dt;G.setSize(st.z*P.transmissionResolutionScale,st.w*P.transmissionResolutionScale);let ot=P.getRenderTarget(),ut=P.getActiveCubeFace(),mt=P.getActiveMipmapLevel();P.setRenderTarget(G),P.getClearColor(nt),j=P.getClearAlpha(),j<1&&P.setClearColor(16777215,.5),P.clear(),St&&ie.render(k);let bt=P.toneMapping;P.toneMapping=Je;let Vt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),b.setupLightsView(X),O===!0&&Wt.setGlobalState(P.clippingPlanes,X),wr(v,k,X),ct.updateMultisampleRenderTarget(G),ct.updateRenderTargetMipmap(G),ft.has("WEBGL_multisampled_render_to_texture")===!1){let Gt=!1;for(let vt=0,zt=F.length;vt<zt;vt++){let ce=F[vt],{object:Jt,geometry:$t,material:Ut,group:jt}=ce;if(Ut.side===ln&&Jt.layers.test(X.layers)){let pe=Ut.side;Ut.side=be,Ut.needsUpdate=!0,Al(Jt,k,X,$t,Ut,jt),Ut.side=pe,Ut.needsUpdate=!0,Gt=!0}}Gt===!0&&(ct.updateMultisampleRenderTarget(G),ct.updateRenderTargetMipmap(G))}P.setRenderTarget(ot,ut,mt),P.setClearColor(nt,j),Vt!==void 0&&(X.viewport=Vt),P.toneMapping=bt}function wr(v,F,k){let X=F.isScene===!0?F.overrideMaterial:null;for(let G=0,st=v.length;G<st;G++){let ot=v[G],{object:ut,geometry:mt,group:bt}=ot,Vt=ot.material;Vt.allowOverride===!0&&X!==null&&(Vt=X),ut.layers.test(k.layers)&&Al(ut,F,k,mt,Vt,bt)}}function Al(v,F,k,X,G,st){L!==null&&G.isNodeMaterial&&L.setObject(v,G),v.onBeforeRender(P,F,k,X,G,st),v.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),G.onBeforeRender(P,F,k,X,v,st),G.transparent===!0&&G.side===ln&&G.forceSinglePass===!1?(G.side=be,G.needsUpdate=!0,P.renderBufferDirect(k,F,X,G,v,st),G.side=Bn,G.needsUpdate=!0,P.renderBufferDirect(k,F,X,G,v,st),G.side=ln):P.renderBufferDirect(k,F,X,G,v,st),v.onAfterRender(P,F,k,X,G,st)}function Ar(v,F,k){F.isScene!==!0&&(F=lt);let X=it.get(v),G=b.state.lights,st=b.state.shadowsArray,ot=G.state.version,ut=_t.getParameters(v,G.state,st,F,k,b.state.lightProbeGridArray),mt=_t.getProgramCacheKey(ut),bt=X.programs;X.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?F.environment:null,X.fog=F.fog;let Vt=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;X.envMap=qt.get(v.envMap||X.environment,Vt),X.envMapRotation=X.environment!==null&&v.envMap===null?F.environmentRotation:v.envMapRotation,bt===void 0&&(v.addEventListener("dispose",Ml),bt=new Map,X.programs=bt);let Gt=bt.get(mt);if(Gt!==void 0){if(X.currentProgram===Gt&&X.lightsStateVersion===ot)return Rl(v,ut),Gt}else ut.uniforms=_t.getUniforms(v),L!==null&&v.isNodeMaterial&&L.build(v,k,ut),v.onBeforeCompile(ut,P),Gt=_t.acquireProgram(ut,mt),bt.set(mt,Gt),X.uniforms=ut.uniforms;let vt=X.uniforms;return(v.isShaderMaterial||v.isRawShaderMaterial)&&v.clipping!==!0||(vt.clippingPlanes=Wt.uniform),Rl(v,ut),X.needsLights=(function(zt){return zt.isMeshLambertMaterial||zt.isMeshToonMaterial||zt.isMeshPhongMaterial||zt.isMeshStandardMaterial||zt.isShadowMaterial||zt.isShaderMaterial&&zt.lights===!0})(v),X.lightsStateVersion=ot,X.needsLights&&(vt.ambientLightColor.value=G.state.ambient,vt.lightProbe.value=G.state.probe,vt.sunLights.value=G.state.sun,vt.sunLightShadows.value=G.state.sunShadow,vt.directionalLights.value=G.state.directional,vt.directionalLightShadows.value=G.state.directionalShadow,vt.spotLights.value=G.state.spot,vt.spotLightShadows.value=G.state.spotShadow,vt.rectAreaLights.value=G.state.rectArea,vt.ltc_1.value=G.state.rectAreaLTC1,vt.ltc_2.value=G.state.rectAreaLTC2,vt.pointLights.value=G.state.point,vt.pointLightShadows.value=G.state.pointShadow,vt.hemisphereLights.value=G.state.hemi,vt.sunShadowMatrix.value=G.state.sunShadowMatrix,vt.sunShadowCascade.value=G.state.sunShadowCascade,vt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,vt.spotLightMatrix.value=G.state.spotLightMatrix,vt.spotLightMap.value=G.state.spotLightMap,vt.pointShadowMatrix.value=G.state.pointShadowMatrix),X.lightProbeGrid=b.state.lightProbeGridArray.length>0,X.currentProgram=Gt,X.uniformsList=null,Gt}function Cl(v){if(v.uniformsList===null){let F=v.currentProgram.getUniforms();v.uniformsList=Di.seqWithValue(F.seq,v.uniforms)}return v.uniformsList}function Rl(v,F){let k=it.get(v);k.outputColorSpace=F.outputColorSpace,k.batching=F.batching,k.batchingColor=F.batchingColor,k.instancing=F.instancing,k.instancingColor=F.instancingColor,k.instancingMorph=F.instancingMorph,k.skinning=F.skinning,k.morphTargets=F.morphTargets,k.morphNormals=F.morphNormals,k.morphColors=F.morphColors,k.morphTargetsCount=F.morphTargetsCount,k.numClippingPlanes=F.numClippingPlanes,k.numIntersection=F.numClipIntersection,k.vertexAlphas=F.vertexAlphas,k.vertexTangents=F.vertexTangents,k.toneMapping=F.toneMapping}function Il(v){let F=it.get(v);return F.__readFormat===v.format&&F.__readType===v.type||(F.__readFormat=v.format,F.__readType=v.type,F.__formatReadable=It.textureFormatReadable(v.format),F.__typeReadable=It.textureTypeReadable(v.type)),F}Wn.setAnimationLoop(function(v){Oa&&Oa(v)}),typeof self<"u"&&Wn.setContext(self),this.setAnimationLoop=function(v){Oa=v,re.setAnimationLoop(v),v===null?Wn.stop():Wn.start()},re.addEventListener("sessionstart",bl),re.addEventListener("sessionend",Tl),this.render=function(v,F){if(F!==void 0&&F.isCamera!==!0)return void Tt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(J===!0)return;L!==null&&L.renderStart(v,F);let k=re.enabled===!0&&re.isPresenting===!0,X=B!==null&&(H===null||k)&&B.begin(P,H);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),re.enabled!==!0||re.isPresenting!==!0||B!==null&&B.isCompositing()!==!1||(re.cameraAutoUpdate===!0&&re.updateCamera(F),F=re.getCamera()),v.isScene===!0&&v.onBeforeRender(P,v,F,H),b=de.get(v,C.length),b.init(F),b.state.textureUnits=ct.getTextureUnits(),C.push(b),W.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),z.setFromProjectionMatrix(W,Ze,F.reversedDepth),w=this.localClippingEnabled,O=Wt.init(this.clippingPlanes,w),A=Pt.get(v,R.length),A.init(),R.push(A),re.enabled===!0&&re.isPresenting===!0){let st=P.xr.getDepthSensingMesh();st!==null&&Ba(st,F,-1/0,P.sortObjects)}Ba(v,F,0,P.sortObjects),A.finish(),L!==null&&L.updateLights(b.state.lightsArray),P.sortObjects===!0&&A.sort(S,x),St=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,St&&ie.addToRenderList(A,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),O===!0&&Wt.beginShadows();let G=b.state.shadowsArray;if(ne.render(G,v,F),O===!0&&Wt.endShadows(),(X&&B.hasRenderPass())===!1){let st=A.opaque,ot=A.transmissive;if(b.setupLights(),F.isArrayCamera){let ut=F.cameras;if(ot.length>0)for(let mt=0,bt=ut.length;mt<bt;mt++)wl(st,ot,v,ut[mt]);St&&ie.render(v);for(let mt=0,bt=ut.length;mt<bt;mt++){let Vt=ut[mt];El(A,v,Vt,Vt.viewport)}}else ot.length>0&&wl(st,ot,v,F),St&&ie.render(v),El(A,v,F)}H!==null&&U===0&&(ct.updateMultisampleRenderTarget(H),ct.updateRenderTargetMipmap(H)),X&&B.end(P),v.isScene===!0&&v.onAfterRender(P,v,F),bn.resetDefaultState(),et=-1,Mt=null,C.pop(),C.length>0?(b=C[C.length-1],ct.setTextureUnits(b.state.textureUnits),O===!0&&Wt.setGlobalState(P.clippingPlanes,b.state.camera)):b=null,R.pop(),A=R.length>0?R[R.length-1]:null,L!==null&&L.renderEnd()},this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(v,F,k){let X=it.get(v);X.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),it.get(v.texture).__webglTexture=F,it.get(v.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:k,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,F){let k=it.get(v);k.__webglFramebuffer=F,k.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(v,F=0,k=0){H=v,Y=F,U=k;let X=null,G=!1,st=!1;if(v){let ot=it.get(v);if(ot.__useDefaultFramebuffer!==void 0)return tt.bindFramebuffer(N.FRAMEBUFFER,ot.__webglFramebuffer),dt.copy(v.viewport),Nt.copy(v.scissor),gt=v.scissorTest,tt.viewport(dt),tt.scissor(Nt),tt.setScissorTest(gt),void(et=-1);if(ot.__webglFramebuffer===void 0)ct.setupRenderTarget(v);else if(ot.__hasExternalTextures)ct.rebindTextures(v,it.get(v.texture).__webglTexture,it.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let bt=v.depthTexture;if(ot.__boundDepthTexture!==bt){if(bt!==null&&it.has(bt)&&(v.width!==bt.image.width||v.height!==bt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ct.setupDepthRenderbuffer(v)}}let ut=v.texture;(ut.isData3DTexture||ut.isDataArrayTexture||ut.isCompressedArrayTexture)&&(st=!0);let mt=it.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(X=Array.isArray(mt[F])?mt[F][k]:mt[F],G=!0):X=v.samples>0&&ct.useMultisampledRTT(v)===!1?it.get(v).__webglMultisampledFramebuffer:Array.isArray(mt)?mt[k]:mt,dt.copy(v.viewport),Nt.copy(v.scissor),gt=v.scissorTest}else dt.copy(I).multiplyScalar(pt).floor(),Nt.copy(V).multiplyScalar(pt).floor(),gt=y;if(k!==0&&(X=q),tt.bindFramebuffer(N.FRAMEBUFFER,X)&&tt.drawBuffers(v,X),tt.viewport(dt),tt.scissor(Nt),tt.setScissorTest(gt),G){let ot=it.get(v.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+F,ot.__webglTexture,k)}else if(st){let ot=F;for(let ut=0;ut<v.textures.length;ut++){let mt=it.get(v.textures[ut]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+ut,mt.__webglTexture,k,ot)}}else if(v!==null&&k!==0){let ot=it.get(v.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ot.__webglTexture,k)}et=-1},this.readRenderTargetPixels=function(v,F,k,X,G,st,ot,ut=0){if(!v||!v.isWebGLRenderTarget)return void Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let mt=it.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ot!==void 0&&(mt=mt[ot]),mt){tt.bindFramebuffer(N.FRAMEBUFFER,mt);try{let bt=v.textures[ut],Vt=bt.format,Gt=bt.type;v.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ut);let vt=Il(bt);if(vt.__formatReadable===!1)return void Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(vt.__typeReadable===!1)return void Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");F>=0&&F<=v.width-X&&k>=0&&k<=v.height-G&&N.readPixels(F,k,X,G,Qe.convert(Vt),Qe.convert(Gt),st)}finally{let bt=H!==null?it.get(H).__webglFramebuffer:null;tt.bindFramebuffer(N.FRAMEBUFFER,bt)}}},this.readRenderTargetPixelsAsync=async function(v,F,k,X,G,st,ot,ut=0){if(!v||!v.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let mt=it.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ot!==void 0&&(mt=mt[ot]),mt){if(F>=0&&F<=v.width-X&&k>=0&&k<=v.height-G){tt.bindFramebuffer(N.FRAMEBUFFER,mt);let bt=v.textures[ut],Vt=bt.format,Gt=bt.type;v.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ut);let vt=Il(bt);if(vt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(vt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let zt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,zt),N.bufferData(N.PIXEL_PACK_BUFFER,st.byteLength,N.STREAM_READ),N.readPixels(F,k,X,G,Qe.convert(Vt),Qe.convert(Gt),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);let ce=H!==null?it.get(H).__webglFramebuffer:null;tt.bindFramebuffer(N.FRAMEBUFFER,ce);let Jt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Gc(N,Jt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,zt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,st),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(zt),N.deleteSync(Jt),st}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(v,F=null,k=0){let X=Math.pow(2,-k),G=Math.floor(v.image.width*X),st=Math.floor(v.image.height*X),ot=F!==null?F.x:0,ut=F!==null?F.y:0;ct.setTexture2D(v,0),N.copyTexSubImage2D(N.TEXTURE_2D,k,0,0,ot,ut,G,st),tt.unbindTexture()},this.copyTextureToTexture=function(v,F,k=null,X=null,G=0,st=0){let ot,ut,mt,bt,Vt,Gt,vt,zt,ce,Jt=v.isCompressedTexture?v.mipmaps[st]:v.image;if(k!==null)ot=k.max.x-k.min.x,ut=k.max.y-k.min.y,mt=k.isBox3?k.max.z-k.min.z:1,bt=k.min.x,Vt=k.min.y,Gt=k.isBox3?k.min.z:0;else{let tn=Math.pow(2,-G);ot=Math.floor(Jt.width*tn),ut=Math.floor(Jt.height*tn),mt=v.isDataArrayTexture?Jt.depth:v.isData3DTexture?Math.floor(Jt.depth*tn):1,bt=0,Vt=0,Gt=0}X!==null?(vt=X.x,zt=X.y,ce=X.z):(vt=0,zt=0,ce=0);let $t=Qe.convert(F.format),Ut=Qe.convert(F.type),jt;F.isData3DTexture?(ct.setTexture3D(F,0),jt=N.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(ct.setTexture2DArray(F,0),jt=N.TEXTURE_2D_ARRAY):(ct.setTexture2D(F,0),jt=N.TEXTURE_2D),tt.activeTexture(N.TEXTURE0),tt.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,F.flipY),tt.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),tt.pixelStorei(N.UNPACK_ALIGNMENT,F.unpackAlignment);let pe=tt.getParameter(N.UNPACK_ROW_LENGTH),wt=tt.getParameter(N.UNPACK_IMAGE_HEIGHT),Rt=tt.getParameter(N.UNPACK_SKIP_PIXELS),Ge=tt.getParameter(N.UNPACK_SKIP_ROWS),za=tt.getParameter(N.UNPACK_SKIP_IMAGES);tt.pixelStorei(N.UNPACK_ROW_LENGTH,Jt.width),tt.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Jt.height),tt.pixelStorei(N.UNPACK_SKIP_PIXELS,bt),tt.pixelStorei(N.UNPACK_SKIP_ROWS,Vt),tt.pixelStorei(N.UNPACK_SKIP_IMAGES,Gt);let Cr=v.isDataArrayTexture||v.isData3DTexture,Fi=F.isDataArrayTexture||F.isData3DTexture;if(v.isDepthTexture){let tn=it.get(v),ii=it.get(F),dn=it.get(tn.__renderTarget),Va=it.get(ii.__renderTarget);tt.bindFramebuffer(N.READ_FRAMEBUFFER,dn.__webglFramebuffer),tt.bindFramebuffer(N.DRAW_FRAMEBUFFER,Va.__webglFramebuffer);for(let ri=0;ri<mt;ri++)Cr&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,it.get(v).__webglTexture,G,Gt+ri),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,it.get(F).__webglTexture,st,ce+ri)),N.blitFramebuffer(bt,Vt,ot,ut,vt,zt,ot,ut,N.DEPTH_BUFFER_BIT,N.NEAREST);tt.bindFramebuffer(N.READ_FRAMEBUFFER,null),tt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(G!==0||v.isRenderTargetTexture||it.has(v)){let tn=it.get(v),ii=it.get(F);tt.bindFramebuffer(N.READ_FRAMEBUFFER,Q),tt.bindFramebuffer(N.DRAW_FRAMEBUFFER,K);for(let dn=0;dn<mt;dn++)Cr?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,tn.__webglTexture,G,Gt+dn):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,tn.__webglTexture,G),Fi?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ii.__webglTexture,st,ce+dn):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ii.__webglTexture,st),G!==0?N.blitFramebuffer(bt,Vt,ot,ut,vt,zt,ot,ut,N.COLOR_BUFFER_BIT,N.NEAREST):Fi?N.copyTexSubImage3D(jt,st,vt,zt,ce+dn,bt,Vt,ot,ut):N.copyTexSubImage2D(jt,st,vt,zt,bt,Vt,ot,ut);tt.bindFramebuffer(N.READ_FRAMEBUFFER,null),tt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Fi?v.isDataTexture||v.isData3DTexture?N.texSubImage3D(jt,st,vt,zt,ce,ot,ut,mt,$t,Ut,Jt.data):F.isCompressedArrayTexture?N.compressedTexSubImage3D(jt,st,vt,zt,ce,ot,ut,mt,$t,Jt.data):N.texSubImage3D(jt,st,vt,zt,ce,ot,ut,mt,$t,Ut,Jt):v.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,st,vt,zt,ot,ut,$t,Ut,Jt.data):v.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,st,vt,zt,Jt.width,Jt.height,$t,Jt.data):N.texSubImage2D(N.TEXTURE_2D,st,vt,zt,ot,ut,$t,Ut,Jt);tt.pixelStorei(N.UNPACK_ROW_LENGTH,pe),tt.pixelStorei(N.UNPACK_IMAGE_HEIGHT,wt),tt.pixelStorei(N.UNPACK_SKIP_PIXELS,Rt),tt.pixelStorei(N.UNPACK_SKIP_ROWS,Ge),tt.pixelStorei(N.UNPACK_SKIP_IMAGES,za),st===0&&F.generateMipmaps&&N.generateMipmap(jt),tt.unbindTexture()},this.initRenderTarget=function(v){it.get(v).__webglFramebuffer===void 0&&ct.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?ct.setTextureCube(v,0):v.isData3DTexture?ct.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?ct.setTexture2DArray(v,0):ct.setTexture2D(v,0),tt.unbindTexture()},this.resetState=function(){Y=0,U=0,H=null,tt.reset(),bn.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ze}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Ft._getDrawingBufferColorSpace(t),e.unpackColorSpace=Ft._getUnpackColorSpace()}};var Na=window.matchMedia("(prefers-reduced-motion: reduce)").matches,Ue=(i,t=document)=>t.querySelector(i),ni=(i,t=document)=>[...t.querySelectorAll(i)],Sh=()=>Ue("#boot")?.classList.add("is-done");Na||new URLSearchParams(location.search).has("noboot")?Sh():window.setTimeout(Sh,900);var Ih=new IntersectionObserver(i=>{for(let t of i)t.isIntersecting&&(t.target.classList.add("visible"),Ih.unobserve(t.target))},{threshold:.14,rootMargin:"0px 0px -8% 0px"});for(let i of ni("[data-reveal]"))Ih.observe(i);var Ph=new IntersectionObserver(i=>{for(let t of i){if(!t.isIntersecting)continue;let e=t.target,n=Number(e.dataset.count??0),r=performance.now(),s=Na?0:900,a=l=>{let c=s===0?1:Math.min(1,(l-r)/s),o=1-Math.pow(1-c,3);e.textContent=String(Math.round(n*o)),c<1&&requestAnimationFrame(a)};requestAnimationFrame(a),Ph.unobserve(e)}},{threshold:.6});for(let i of ni("[data-count]"))Ph.observe(i);var lg=Ue("#nav"),bh=Ue("#scrollProgress"),gl=Ue("#menuButton"),Lh=Ue(".nav-links"),Nh=()=>{lg?.classList.toggle("scrolled",window.scrollY>12);let i=document.documentElement.scrollHeight-window.innerHeight;bh&&(bh.style.width=`${i>0?window.scrollY/i*100:0}%`)};window.addEventListener("scroll",Nh,{passive:!0});Nh();gl?.addEventListener("click",()=>{let i=Lh?.classList.toggle("open")??!1;gl.setAttribute("aria-expanded",String(i))});for(let i of ni(".nav-links a"))i.addEventListener("click",()=>{Lh?.classList.remove("open"),gl?.setAttribute("aria-expanded","false")});var Th=Ue("#cursorGlow");if(Th&&!Na&&window.matchMedia("(pointer: fine)").matches){let i=window.innerWidth/2,t=window.innerHeight/2,e=i,n=t;window.addEventListener("pointermove",s=>{e=s.clientX,n=s.clientY},{passive:!0});let r=()=>{i+=(e-i)*.1,t+=(n-t)*.1,Th.style.transform=`translate3d(${i}px, ${t}px, 0)`,requestAnimationFrame(r)};requestAnimationFrame(r)}var Eh={chat:{path:"/v1/chat/completions",client:"WorkBuddy \xB7 DSH \xB7 any OpenAI client",code:`curl http://127.0.0.1:46890/v1/chat/completions \\
  -H "Authorization: Bearer $AI_BOBBY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "wb/hy3",
    "stream": true,
    "messages": [
      { "role": "user", "content": "\u4F60\u597D" }
    ]
  }'`},responses:{path:"/v1/responses",client:"Codex \xB7 Responses API",code:`curl http://127.0.0.1:46890/v1/responses \\
  -H "Authorization: Bearer $AI_BOBBY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "oc/space-bunny-free",
    "input": "Explain local-first AI gateways.",
    "stream": true
  }'`},messages:{path:"/v1/messages",client:"Claude Code \xB7 Anthropic Messages",code:`curl http://127.0.0.1:46890/v1/messages \\
  -H "Authorization: Bearer $AI_BOBBY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "wbi/glm-5.3",
    "max_tokens": 512,
    "messages": [
      { "role": "user", "content": "\u4F60\u597D" }
    ]
  }'`}},wh=Ue("#protocolCode"),Ah=Ue("#protocolPath"),Ch=Ue("#protocolClient"),cg=i=>i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),hg=i=>{let t=cg(i);return t=t.replace(/(&quot;.*?&quot;|".*?")/g,'<span class="tok-str">$1</span>'),t=t.replace(/\b(curl|http|https|Authorization|Bearer|Content-Type|application\/json)\b/g,'<span class="tok-key">$1</span>'),t=t.replace(/\b(true|false|null)\b/g,'<span class="tok-num">$1</span>'),t=t.replace(/(#.*)$/gm,'<span class="tok-com">$1</span>'),t},Dh=i=>{let t=Eh[i]??Eh.chat;wh&&(wh.innerHTML=hg(t.code)),Ah&&(Ah.textContent=t.path),Ch&&(Ch.textContent=t.client);for(let e of ni(".protocol-tab")){let n=e.dataset.protocol===i;e.classList.toggle("active",n),e.setAttribute("aria-selected",String(n))}};for(let i of ni(".protocol-tab"))i.addEventListener("click",()=>Dh(i.dataset.protocol));Dh("chat");var Pa=Ue("#commandToast"),Uh=async i=>{try{await navigator.clipboard.writeText(i)}catch{let t=document.createElement("textarea");t.value=i,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}},Tr=i=>{Pa&&(Pa.textContent=i,Pa.classList.add("show"),window.clearTimeout(Tr.timer),Tr.timer=window.setTimeout(()=>Pa.classList.remove("show"),1900))};for(let i of ni("[data-copy]"))i.addEventListener("click",async()=>{await Uh(i.dataset.copy),i.classList.add("copied"),Tr("Install command copied to clipboard"),window.setTimeout(()=>i.classList.remove("copied"),1500)});var _l=Ue("#installToast"),La=Ue("#updateToast"),vl=i=>i?.classList.remove("show");for(let i of ni(".toast-close"))i.addEventListener("click",()=>vl(i.closest(".toast")));_l?.querySelector(".toast-action")?.addEventListener("click",async()=>{await Uh("curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh | bash"),Tr("Install command copied \u2014 demo prompt only"),vl(_l)});La?.querySelector(".toast-action")?.addEventListener("click",()=>{La.querySelector("strong").textContent="Refreshing\u2026",Tr("Demo: service worker would activate the new version"),window.setTimeout(()=>vl(La),900)});var ug=new URLSearchParams(location.search).has("clean");ug||(window.setTimeout(()=>_l?.classList.add("show"),6500),window.setTimeout(()=>La?.classList.add("show"),10500));var Rh=Ue("#webgl");async function dg(){if(!Rh||Na){document.body.classList.add("no-webgl");return}try{let i=new Ca({canvas:Rh,antialias:!1,alpha:!1,powerPreference:"high-performance"});i.setPixelRatio(Math.min(window.devicePixelRatio,1.8)),i.setSize(window.innerWidth,window.innerHeight),i.setClearColor(329485,1);let t=new $i,e=new ve(50,window.innerWidth/window.innerHeight,.1,100);e.position.set(0,0,7);let n={uTime:{value:0},uMouse:{value:new Ot(0,0)},uAspect:{value:window.innerWidth/window.innerHeight}},r=new Ce(new jn(26,18),new ye({uniforms:n,depthWrite:!1,vertexShader:`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform float uAspect;
          uniform vec2 uMouse;

          float hash21(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
          }

          void main() {
            vec2 p = vUv - 0.5;
            p.x *= uAspect;
            vec2 mouse = (uMouse - 0.5) * 0.12;
            p += mouse;

            float r = length(p);
            float angle = atan(p.y, p.x);
            float swirl = sin(angle * 6.0 + r * 15.0 - uTime * 0.55) * 0.5 + 0.5;
            float glow = smoothstep(0.78, 0.0, r);
            float ring = smoothstep(0.018, 0.0, abs(fract(r * 5.5 - uTime * 0.13) - 0.5) - 0.475);
            float outer = smoothstep(0.04, 0.0, abs(fract(r * 2.2 + 0.15) - 0.5) - 0.49);

            vec3 col = vec3(0.004, 0.006, 0.016);
            col += vec3(0.014, 0.055, 0.26) * glow * 0.42;
            col += vec3(0.035, 0.14, 0.68) * ring * (0.08 + glow * 0.28);
            col += vec3(0.03, 0.1, 0.3) * outer * 0.12;
            col += vec3(0.1, 0.35, 0.9) * swirl * glow * 0.014;

            vec2 grid = floor(vUv * vec2(210.0, 150.0));
            float star = hash21(grid);
            if (star > 0.994) {
              float twinkle = 0.55 + 0.45 * sin(uTime * 1.4 + star * 40.0);
              col += vec3(0.45, 0.6, 1.0) * smoothstep(0.994, 1.0, star) * twinkle * 0.55;
            }

            col *= 1.0 - smoothstep(0.22, 0.92, r) * 0.8;
            float grain = (hash21(vUv * 1000.0 + uTime) - 0.5) * 0.012;
            gl_FragColor = vec4(col + grain, 1.0);
          }
        `}));r.position.z=-7,t.add(r);let s=new xn;t.add(s);let a=1400,l=new Float32Array(a*3),c=new Float32Array(a*3),o=new Float32Array(a),h=new Dt;for(let C=0;C<a;C+=1){let B=1.3+Math.pow(Math.random(),1.7)*5.4,P=Math.random()*Math.PI*2,J=(Math.random()-.5)*3.2;l[C*3]=Math.cos(P)*B,l[C*3+1]=Math.sin(P)*B*.56+J*.35,l[C*3+2]=J,h.setHSL(.6+Math.random()*.08,.78,.48+Math.random()*.35),c[C*3]=h.r,c[C*3+1]=h.g,c[C*3+2]=h.b,o[C]=Math.random()*Math.PI*2}let f=new me;f.setAttribute("position",new xe(l,3)),f.setAttribute("color",new xe(c,3)),f.setAttribute("aSeed",new xe(o,1));let u=new ye({transparent:!0,depthWrite:!1,blending:ur,uniforms:{uTime:{value:0},uPixelRatio:{value:i.getPixelRatio()}},vertexShader:`
        attribute float aSeed;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPixelRatio;
        void main() {
          vColor = color;
          vec3 p = position;
          float pulse = sin(uTime * 0.8 + aSeed) * 0.5 + 0.5;
          p.z += sin(uTime * 0.35 + aSeed) * 0.18;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (1.2 + pulse * 2.1) * uPixelRatio * (8.0 / -mv.z);
          vAlpha = 0.12 + pulse * 0.52;
        }
      `,fragmentShader:`
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float a = smoothstep(0.5, 0.05, d) * vAlpha;
          gl_FragColor = vec4(vColor, a);
        }
      `}),p=new er(f,u);s.add(p);let _=new sr(2.1,.018,260,12,2,3),d=new wi(new Ci(_),new $n({color:1986559,transparent:!0,opacity:.1}));d.rotation.x=.55,s.add(d);let M=new wi(new Ci(new rr(3.25,2)),new $n({color:6130687,transparent:!0,opacity:.035}));s.add(M);let g=0,m=0;window.addEventListener("pointermove",C=>{g=(C.clientX/window.innerWidth-.5)*2,m=(C.clientY/window.innerHeight-.5)*2},{passive:!0});let T=()=>{let C=window.innerWidth,B=window.innerHeight;e.aspect=C/B,e.updateProjectionMatrix(),i.setPixelRatio(Math.min(window.devicePixelRatio,1.8)),i.setSize(C,B),n.uAspect.value=C/B,u.uniforms.uPixelRatio.value=i.getPixelRatio()};window.addEventListener("resize",T);let E=0,A=!0,b=new cr,R=()=>{if(!A)return;let C=b.getElapsedTime();n.uTime.value=C,n.uMouse.value.set(g*.5+.5,-m*.5+.5),u.uniforms.uTime.value=C,s.rotation.y=C*.045+g*.08,s.rotation.x=-m*.045,p.rotation.z=C*.018,d.rotation.z=C*.08,d.rotation.y=C*.06,M.rotation.y=-C*.012,i.render(t,e),E=requestAnimationFrame(R)};R(),document.addEventListener("visibilitychange",()=>{A=!document.hidden,A&&R()}),window.addEventListener("pagehide",()=>{A=!1,cancelAnimationFrame(E)},{once:!0})}catch{document.body.classList.add("no-webgl")}}dg();})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
