import {WebGLRenderer} from 'three';

const profiles=[
 {name:'standard',antialias:true,powerPreference:'high-performance'},
 {name:'compatible',antialias:false,powerPreference:'default'},
 {name:'low-power',antialias:false,powerPreference:'low-power'},
];

// Some Firefox/driver combinations reject multisampling or the high-performance
// adapter request while still supporting WebGL 2 with ordinary settings.
export function createIslandRenderer(canvas,build=options=>new WebGLRenderer(options)){
 const failures=[];
 for(const profile of profiles){
  // A rejected constructor can still leave a diagnostic context attached to
  // its canvas. Retry on a fresh canvas so its attributes really can change.
  const target=profile.name==='standard'?canvas:canvas.cloneNode(false);
  try{
   const renderer=build({canvas:target,antialias:profile.antialias,powerPreference:profile.powerPreference,alpha:false,depth:true,stencil:false,failIfMajorPerformanceCaveat:false});
   if(target!==canvas)canvas.replaceWith(target);
   target.dataset.graphics=profile.name;
   return{renderer,canvas:target,compatible:profile.name!=='standard'};
  }catch(error){failures.push(error);}
 }
 throw new AggregateError(failures,'The browser could not start WebGL 2 graphics with standard or compatibility settings.');
}
