import * as THREE from 'three';
import {shieldActive,SHIELD_POP_SECONDS} from './shield.js';

// A translucent centre with a bright view-dependent rim, without bloom or
// extra lights. One small mesh per shield keeps the effect inexpensive.
export function createShieldView(kart){
 const material=new THREE.ShaderMaterial({
  uniforms:{tint:{value:new THREE.Color('#58ceff')},opacity:{value:1}},
  vertexShader:`
   #include <common>
   #include <logdepthbuf_pars_vertex>
   varying vec3 viewNormal;
   varying vec3 viewPosition;
   void main(){
    vec4 p=modelViewMatrix*vec4(position,1.0);
    viewPosition=p.xyz;
    viewNormal=normalize(normalMatrix*normal);
    gl_Position=projectionMatrix*p;
    #include <logdepthbuf_vertex>
   }`,
  fragmentShader:`
   #include <logdepthbuf_pars_fragment>
   uniform vec3 tint;
   uniform float opacity;
   varying vec3 viewNormal;
   varying vec3 viewPosition;
   void main(){
    #include <logdepthbuf_fragment>
    float rim=pow(1.0-abs(dot(normalize(viewNormal),normalize(-viewPosition))),2.3);
    gl_FragColor=vec4(tint,(0.045+0.66*rim)*opacity);
    #include <colorspace_fragment>
   }`,
  transparent:true,depthWrite:false,side:THREE.FrontSide,
 });
 const bubble=new THREE.Mesh(new THREE.SphereGeometry(1,28,18),material);bubble.name='One-hit blue shield';bubble.position.y=1.1;bubble.renderOrder=8;kart.add(bubble);bubble.visible=false;
 return(state,time=0)=>{
  const active=state&&shieldActive(state),flash=state?.shieldFlash??0;
  bubble.visible=!!active||flash>0;if(!bubble.visible)return;
  const pop=active?0:1-flash/SHIELD_POP_SECONDS,scale=active?1+.012*Math.sin(time*3):1+pop*.2;
  bubble.scale.set(1.9,1.55,2.35).multiplyScalar(scale);
  material.uniforms.opacity.value=active?1:1-pop;material.uniforms.tint.value.set(active?'#58ceff':'#e7fbff');
 };
}

export function updateShieldHud(node,state){
 const active=state&&shieldActive(state),popping=(state?.shieldFlash??0)>0;
 node.hidden=!active&&!popping;
 const text=active?'Shield active · 1 hit':'Shield spent';if(node.textContent!==text)node.textContent=text;
}
