export const QUALITY_KEY='letsgo.island.graphics.v1';
export const QUALITY={
 low:{label:'Low',pixelRatio:1,segments:1,shadows:false,shadowSize:0,lighting:'baked'},
 medium:{label:'Medium',pixelRatio:1.5,segments:1,shadows:true,shadowSize:1024,lighting:'lambert'},
 high:{label:'High',pixelRatio:2,segments:2,shadows:true,shadowSize:2048,lighting:'standard'}
};
export function readQuality(storage){try{const value=storage.getItem(QUALITY_KEY);return QUALITY[value]?value:'low';}catch{return'low';}}
export function saveQuality(storage,value){if(!QUALITY[value])throw new TypeError('Unknown graphics quality');try{storage.setItem(QUALITY_KEY,value);}catch{}}
