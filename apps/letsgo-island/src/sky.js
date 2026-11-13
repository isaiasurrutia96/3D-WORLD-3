import * as THREE from 'three';
export function createSky(){
 const group=new THREE.Group();group.name='Open sky and clouds';
 const sky=new THREE.Mesh(new THREE.SphereGeometry(700,24,16),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{bottom:{value:new THREE.Color('#d2f3fc')},top:{value:new THREE.Color('#6bcced')}},vertexShader:`varying float screenY;void main(){vec4 clip=projectionMatrix*modelViewMatrix*vec4(position,1.);screenY=clip.y/clip.w*.5+.5;gl_Position=clip;}`,fragmentShader:`uniform vec3 bottom;uniform vec3 top;varying float screenY;void main(){gl_FragColor=vec4(mix(bottom,top,clamp(screenY,0.,1.)),1.);\n#include <colorspace_fragment>\n}`}));sky.name='Gradient sky';sky.renderOrder=-10;group.add(sky);
 const clusters=[[-100,-14,-40,5.5],[42,-3,-88,5],[-96,-10,30,5.5],[82,-29,22,7],[-21,-42,64,7],[95,9,-30,5],[-92,20,-11,4.5],[3,12,-92,5],[-14,-22,-70,5],[95,-33,86,6]];
 const parts=[[-1.3,0,0,1.0],[-.55,.35,.08,1.12],[.2,.45,0,1.4],[1.0,.02,.06,1.0],[1.6,-.1,-.07,.72]],geometry=new THREE.SphereGeometry(1,14,10),material=new THREE.MeshLambertMaterial({color:'#f6fcff',toneMapped:false}),mesh=new THREE.InstancedMesh(geometry,material,clusters.length*parts.length),o=new THREE.Object3D();let i=0;
 for(const [x,y,z,s]of clusters)for(const [dx,dy,dz,r]of parts){o.position.set(x+dx*s,y+dy*s,z+dz*s);o.scale.set(s*r,s*r*.68,s*r*.63);o.updateMatrix();mesh.setMatrixAt(i++,o.matrix);}
 mesh.computeBoundingSphere();mesh.name='Soft cloud clusters';group.add(mesh);return group;
}
