import {createCharacterRig,CHARACTER_HEIGHT,CHARACTER_RADIUS,HIP_HEIGHT} from '../claude/player/PlayerModel.ts';
export {CHARACTER_HEIGHT,CHARACTER_RADIUS,HIP_HEIGHT};
export function createOnFootAvatar(){
 const rig=createCharacterRig({plain:true}),avatar=rig.root;
 avatar.name='Claude player avatar';avatar.userData.characterRig=rig;
 avatar.userData.source='isaiasurrutia96/3D-WORLD-3@b60e295cd836f830c93e9ddc28ae61e157ef2b3f';
 return avatar;
}
export function resetRig(rig){
 rig.body.position.set(0,HIP_HEIGHT,0);rig.body.rotation.set(0,0,0);rig.body.scale.set(1,1,1);
 for(const name of ['torso','head','shoulderLeft','shoulderRight','elbowLeft','elbowRight','hipLeft','hipRight','kneeLeft','kneeRight','ankleLeft','ankleRight'])rig[name].rotation.set(0,0,0);
}
