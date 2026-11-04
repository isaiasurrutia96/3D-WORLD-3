import * as THREE from 'three';

// A single airborne pose sequence, separate from both accepted ground gaits.
export function createJumpClip(avatar){
 const times=[0,.20,.48,.80,1],tracks=[];
 const poses={
  spine:[0,.05,.04,0,0],
  left_thigh:[-.45,-.70,-.55,-.22,-.10],right_thigh:[-.03,-.20,-.30,-.15,-.10],
  left_calf:[.55,1.0,.80,.35,.20],right_calf:[.10,.40,.55,.30,.20],
  left_upper_arm:[-.30,-.75,-.65,-.25,-.10],right_upper_arm:[-.30,-.75,-.65,-.25,-.10],
  left_forearm:[-.45,-.65,-.65,-.45,-.30],right_forearm:[-.45,-.65,-.65,-.45,-.30],
 };
 for(const side of ['left','right'])poses[`${side}_foot`]=times.map((_,i)=>-poses[`${side}_thigh`][i]-poses[`${side}_calf`][i]);
 for(const bone of avatar.skeleton.bones){
  const values=[];
  for(const angle of poses[bone.name]??times.map(()=>0))values.push(...new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),angle).toArray());
  tracks.push(new THREE.QuaternionKeyframeTrack(`${bone.name}.quaternion`,times,values));
 }
 tracks.push(new THREE.NumberKeyframeTrack('pelvis.position[y]',times,times.map(()=>avatar.skeleton.getBoneByName('pelvis').position.y)));
 return new THREE.AnimationClip('Single jump',1,tracks);
}
