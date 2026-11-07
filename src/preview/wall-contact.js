// Isolated proposal for review. The live track does not use this solver yet.
const HALF_WIDTH=1.18,HALF_LENGTH=1.5,MASS=220;
const INVERSE_MASS=1/MASS,INVERSE_INERTIA=12/(MASS*((2*HALF_WIDTH)**2+(2*HALF_LENGTH)**2));
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const approachZero=(value,amount)=>Math.sign(value)*Math.max(0,Math.abs(value)-amount);
export function createContactPreview(kind){
 const yaw=kind==='head-on'?Math.PI/2:25*Math.PI/180,speed=kind==='head-on'?7:8;
 return{x:kind==='head-on'?-9:-6,y:0,z:kind==='head-on'?0:-11,yaw,vx:Math.sin(yaw)*speed,vz:Math.cos(yaw)*speed,omega:0,speed,steering:0,wheelRotation:0,pitch:0,bank:0,time:0,impactAt:null,touching:false};
}
export function contactCorners(state){
 const sin=Math.sin(state.yaw),cos=Math.cos(state.yaw),corners=[];
 for(const x of [-HALF_WIDTH,HALF_WIDTH])for(const z of [-HALF_LENGTH,HALF_LENGTH])corners.push({x:x*cos+z*sin,z:-x*sin+z*cos});
 return corners;
}
export function contactEnergy(state){return .5*MASS*(state.vx**2+state.vz**2)+.5/INVERSE_INERTIA*state.omega**2;}
export function stepContactPreview(state,dt){
 const oldX=state.x,oldZ=state.z,sin=Math.sin(state.yaw),cos=Math.cos(state.yaw);
 const forward=approachZero(state.vx*sin+state.vz*cos,.7*dt),side=(state.vx*cos-state.vz*sin)*Math.exp(-6*dt);
 state.vx=forward*sin+side*cos;state.vz=forward*cos-side*sin;state.omega*=Math.exp(-3*dt);
 state.x+=state.vx*dt;state.z+=state.vz*dt;state.yaw+=state.omega*dt;state.time+=dt;
 const corners=contactCorners(state),penetration=Math.max(...corners.map(p=>state.x+p.x));
 state.touching=penetration>=-.002;
 if(state.touching){
  if(state.impactAt===null)state.impactAt=state.time;
  state.x-=Math.max(0,penetration);
  const contacts=corners.filter(p=>state.x+p.x>=-.006);
  // Resolve actual contact-point velocity with zero restitution. Rotation
  // comes from the contact's lever arm, never an assigned wall-tangent yaw.
  for(let iteration=0;iteration<12;iteration++)for(const r of contacts){
   const normalSpeed=-(state.vx+state.omega*r.z);
   if(normalSpeed>=-1e-9)continue;
   const impulse=-normalSpeed/(INVERSE_MASS+r.z*r.z*INVERSE_INERTIA);
   state.vx-=impulse*INVERSE_MASS;state.omega-=r.z*impulse*INVERSE_INERTIA;
   const tangentSpeed=state.vz-state.omega*r.x;
   const friction=clamp(-tangentSpeed/(INVERSE_MASS+r.x*r.x*INVERSE_INERTIA),-.12*impulse,.12*impulse);
   state.vz+=friction*INVERSE_MASS;state.omega-=r.x*friction*INVERSE_INERTIA;
  }
 }
 if(Math.hypot(state.vx,state.vz)<.015&&Math.abs(state.omega)<.015)state.vx=state.vz=state.omega=0;
 state.speed=Math.hypot(state.vx,state.vz);
 state.wheelRotation+=((state.x-oldX)*Math.sin(state.yaw)+(state.z-oldZ)*Math.cos(state.yaw))/.38;
}
export function bakeContactPreview(kind,duration=6,step=1/120){
 const state=createContactPreview(kind),frames=[{...state}];
 for(let i=0;i<Math.round(duration/step);i++){stepContactPreview(state,step);frames.push({...state});}
 return frames;
}
