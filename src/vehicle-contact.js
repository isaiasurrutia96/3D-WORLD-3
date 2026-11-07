// Only impacts introduce sideways velocity. Ordinary driving retains grip.
const RADIUS=1.18,OFFSETS=[-.35,.35],INVERSE_INERTIA=.65;
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));

export function moveKartAgainstRails(state,vx,vz,dt,world){
 const sin=Math.sin(state.yaw),cos=Math.cos(state.yaw);
 // At 180 MPH a fixed tick travels 0.67 m. Smaller collision steps keep
 // the capsule on its original side of thin rails and around segment joins.
 const steps=Math.max(1,Math.ceil(Math.hypot(vx,vz)*dt/.22));
 const substep=dt/steps,canRebound=state.railContactTime<=0;
 let impactApplied=false;
 for(let part=0;part<steps;part++){
  const oldX=state.x,oldZ=state.z;
  let x=oldX+vx*substep,z=oldZ+vz*substep;
  const contacts=[];
  // Project the two ends repeatedly: resolving one end must not leave the
  // other inside a rail at a curve or joint.
  for(let iteration=0;iteration<3;iteration++){
   let corrected=false;
   for(const offset of OFFSETS){
    const px=x+sin*offset,pz=z+cos*offset;
    const resolved=world.resolveHorizontal(oldX+sin*offset,oldZ+cos*offset,px,pz,state.y,RADIUS,1.8);
    const dx=resolved.x-px,dz=resolved.z-pz,depth=Math.hypot(dx,dz);
    if(depth<1e-7)continue;
    x+=dx;z+=dz;corrected=true;
    const nx=dx/depth,nz=dz/depth;
    if(!contacts.some(c=>c.offset===offset&&c.nx*nx+c.nz*nz>.995))contacts.push({nx,nz,offset,rx:sin*offset-nx*RADIUS,rz:cos*offset-nz*RADIUS});
   }
   if(!corrected)break;
  }
  if(contacts.length){
   const targets=contacts.map(c=>{
    const closing=-(vx*c.nx+vz*c.nz);
    // Resting/sustained contact has zero restitution. A fresh impact gets
    // one small rebound, capped even at boosted speed.
    return canRebound&&!impactApplied&&closing>1.5?Math.min(1.5,closing*.075):0;
   });
   for(let iteration=0;iteration<8;iteration++)for(let i=0;i<contacts.length;i++){
    const c=contacts[i],lever=c.rz*c.nx-c.rx*c.nz;
    const normalSpeed=vx*c.nx+vz*c.nz+state.impactYawRate*lever;
    if(normalSpeed>=targets[i]-1e-7)continue;
    // Tire resistance suppresses yaw from tiny repeated drive forces while
    // resting on a rail; a genuine corner impact can still rotate the body.
    const inverseInertia=-normalSpeed>2?INVERSE_INERTIA:0;
    const impulse=(targets[i]-normalSpeed)/(1+lever*lever*inverseInertia);
    vx+=c.nx*impulse;vz+=c.nz*impulse;
    state.impactYawRate=clamp(state.impactYawRate+lever*impulse*inverseInertia,-.8,.8);
    // Friction is proportional to the load into the rail. A shallow scrape
    // keeps more tangential momentum than a steep impact.
    const tx=-c.nz,tz=c.nx,tangentSpeed=vx*tx+vz*tz;
    const friction=clamp(-tangentSpeed,-.10*impulse,.10*impulse);
    vx+=tx*friction;vz+=tz*friction;
   }
   if(targets.some(v=>v>0)){state.impactRecovery=.12;impactApplied=true;}
   state.railContactTime=.3;
  }
  state.x=x;state.z=z;
 }
 return{vx,vz};
}
