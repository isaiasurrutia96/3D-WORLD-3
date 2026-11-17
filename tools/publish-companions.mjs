import {existsSync,readFileSync,writeFileSync,appendFileSync,cpSync,rmSync,renameSync} from 'node:fs';
import {resolve,join,sep} from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

export const ROUTES=['racing','island','garden'];
export const MARKER='.companion-pages.json';

export function validatePages(directory){
 for(const route of ROUTES){
  const folder=resolve(directory,route),entry=join(folder,'index.html');
  if(!existsSync(entry))throw new Error(`Missing published route: ${route}/index.html`);
  const html=readFileSync(entry,'utf8');let scripts=0;
  for(const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)){
   const reference=match[1];if(/^(?:[a-z]+:|#|\/\/)/i.test(reference))continue;
   const pathname=decodeURIComponent(reference.split(/[?#]/)[0]);if(!pathname)continue;
   const target=resolve(folder,pathname);
   if(target!==folder&&!target.startsWith(folder+sep))throw new Error(`Route ${route} references assets outside its directory: ${reference}`);
   if(!existsSync(target))throw new Error(`Missing asset for ${route}: ${reference}`);
   if(/\.js$/.test(pathname))scripts++;
  }
  if(!scripts)throw new Error(`No built JavaScript entry for ${route}`);
 }
 return true;
}

export function companionsCurrent(site,revision){
 try{return JSON.parse(readFileSync(join(site,MARKER),'utf8')).revision===revision&&validatePages(site);}catch{return false;}
}

// Replace only the companion directories. The main world, hashed root assets,
// avatar-preview, custom domain files and every other published path stay intact.
export function stageCompanions(source,site,revision){
 source=resolve(source);site=resolve(site);
 if(source===site||source.startsWith(site+sep)||site.startsWith(source+sep))throw new Error('Build and published directories must be separate.');
 if(!/^[0-9a-f]{40,64}$/.test(revision))throw new Error('A complete source commit is required.');
 if(!existsSync(join(site,'index.html')))throw new Error('The existing main page must be present before publishing companions.');
 validatePages(source);
 for(const route of ROUTES){
  const temporary=join(site,`.stage-${route}`);rmSync(temporary,{recursive:true,force:true});
  cpSync(join(source,route),temporary,{recursive:true});
  rmSync(join(site,route),{recursive:true,force:true});renameSync(temporary,join(site,route));
 }
 writeFileSync(join(site,MARKER),JSON.stringify({version:1,revision,routes:ROUTES},null,2)+'\n');
 if(!existsSync(join(site,'.nojekyll')))writeFileSync(join(site,'.nojekyll'),'');
 validatePages(site);
}

function git(cwd,args){return execFileSync('git',['-C',cwd,...args],{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();}
function allowed(path){return path===MARKER||path==='.nojekyll'||ROUTES.some(route=>path.startsWith(route+'/'));}

export function pushCompanions(source,site,revision){
 site=resolve(site);
 if(resolve(git(site,['rev-parse','--show-toplevel']))!==site)throw new Error('Use a dedicated published-site checkout.');
 if(git(site,['status','--porcelain']))throw new Error('The published-site checkout must start clean.');
 for(let attempt=0;attempt<3;attempt++){
  // This is an isolated CI checkout. Re-read the newest root publication on
  // each retry so a concurrent root update is never replaced by an older one.
  git(site,['fetch','origin','refs/heads/gh-pages']);
  git(site,['reset','--hard','FETCH_HEAD']);
  stageCompanions(source,site,revision);
  git(site,['add','--',...ROUTES,MARKER,'.nojekyll']);
  const changed=git(site,['diff','--cached','--name-only']).split('\n').filter(Boolean);
  if(!changed.length)return {changed:false};
  if(changed.some(path=>!allowed(path)))throw new Error('Refusing to change the published main world.');
  git(site,['-c','user.name=github-actions[bot]','-c','user.email=41898282+github-actions[bot]@users.noreply.github.com','commit','-m',`Publish companion games from ${revision.slice(0,7)}; preserve main world`]);
  try{git(site,['push','origin','HEAD:refs/heads/gh-pages']);return {changed:true};}
  catch(error){if(attempt===2)throw error;}
 }
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const args=process.argv.slice(2),value=(name,fallback)=>{const i=args.indexOf(name);return i<0?fallback:args[i+1];};
 const source=resolve(value('--source','dist')),site=resolve(value('--site','.published-site')),revision=value('--revision',git(process.cwd(),['rev-parse','HEAD']));
 if(args.includes('--plan')){
  const needed=process.env.EVENT_NAME!=='workflow_run'||!companionsCurrent(site,revision);
  if(process.env.GITHUB_OUTPUT)appendFileSync(process.env.GITHUB_OUTPUT,`needed=${needed}\n`);
  console.log(JSON.stringify({needed,revision}));
 }else{
  const result=args.includes('--push')?pushCompanions(source,site,revision):(stageCompanions(source,site,revision),{changed:true});
  console.log(JSON.stringify({...result,revision,routes:ROUTES}));
 }
}
