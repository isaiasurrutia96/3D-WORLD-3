import {createLand} from './layout.js';
import {addScenery} from './props.js';
import {addClouds} from './sky.js';
import {prepareFaces,createBlockMeshes} from './block-mesh.js';
export function createIslandData(){
 const world=addClouds(addScenery(createLand())),faces=prepareFaces(world);
 return{world,faces};
}
export function createTerrain(data=createIslandData(),quality='low'){return createBlockMeshes(data.faces,quality);}
