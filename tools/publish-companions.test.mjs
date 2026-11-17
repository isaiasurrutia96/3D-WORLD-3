import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,existsSync,rmSync,readdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {ROUTES,stageCompanions,companionsCurrent,validatePages,pushCompanions} from './publish-companions.mjs';
const revision='418a1d7a68404991c7dab4f828d9fedd5f2d2a58';
function put(path,body){mkdirSync(join(path,'..'),{recursive:true});writeFileSync(path,body);}
function fixture(){
 const root=mkdtempSync(join(tmpdir(),'letsgo-pages-')),source=join(root,'dist'),site=join(root,'published');
 put(join(site,'index.html'),'<script src="./assets/claude-current.js"></script>');put(join(site,'assets/claude-current.js'),'latest approved avatar');put(join(site,'avatar-preview/index.html'),'keep this preview');put(join(site,'CNAME'),'example.test');put(join(site,'.nojekyll'),'');
 for(const route of ROUTES){put(join(source,route,'index.html'),'<script type="module" src="./assets/game.js"></script><link href="./assets/game.css" rel="stylesheet">');put(join(source,route,'assets/game.js'),`game ${route}`);put(join(source,route,'assets/game.css'),'canvas{}');put(join(source,route,'assets/world.bin'),Buffer.from([1,2,3]));}
 return {root,source,site};
}
function rootFiles(site){const files={};function visit(folder,prefix=''){for(const item of readdirSync(folder,{withFileTypes:true})){if(!prefix&&(ROUTES.includes(item.name)||item.name==='.companion-pages.json'))continue;const name=prefix+item.name;if(item.isDirectory())visit(join(folder,item.name),name+'/');else files[name]=createHash('sha256').update(readFileSync(join(folder,item.name))).digest('hex');}}visit(site);return files;}

test('restore all companion URLs and their assets without changing any main-world file',()=>{
 const f=fixture();try{const before=rootFiles(f.site);put(join(f.site,'racing/assets/stale.js'),'old');stageCompanions(f.source,f.site,revision);assert.equal(validatePages(f.site),true);assert.deepEqual(rootFiles(f.site),before);assert.equal(existsSync(join(f.site,'racing/assets/stale.js')),false);assert.equal(companionsCurrent(f.site,revision),true);assert.equal(companionsCurrent(f.site,'0'.repeat(40)),false);}finally{rmSync(f.root,{recursive:true,force:true});}
});
test('an incomplete build cannot replace the published games or the main world',()=>{
 const f=fixture();try{const before=rootFiles(f.site);rmSync(join(f.source,'garden/assets/game.js'));assert.throws(()=>stageCompanions(f.source,f.site,revision),/Missing asset/);assert.deepEqual(rootFiles(f.site),before);assert.equal(existsSync(join(f.site,'racing')),false);}finally{rmSync(f.root,{recursive:true,force:true});}
});
test('missing or broken route assets force repair; overlapping directories are rejected',()=>{
 const f=fixture();try{stageCompanions(f.source,f.site,revision);rmSync(join(f.site,'racing/assets/game.js'));assert.equal(companionsCurrent(f.site,revision),false);assert.throws(()=>stageCompanions(f.site,f.site,revision),/separate/);}finally{rmSync(f.root,{recursive:true,force:true});}
});

test('publishing refreshes a stale checkout and preserves a newer main world',()=>{
 const f=fixture();
 const git=(cwd,...args)=>execFileSync('git',['-C',cwd,...args],{encoding:'utf8',stdio:'pipe'}).trim();
 const commit=(cwd,message)=>git(cwd,'-c','user.name=Pages Test','-c','user.email=pages@example.test','commit','-m',message);
 try{
  const remote=join(f.root,'remote.git'),writer=join(f.root,'root-publisher');
  execFileSync('git',['init','--bare',remote],{stdio:'pipe'});
  git(f.site,'init','-b','gh-pages');
  git(f.site,'add','.');commit(f.site,'existing published root');
  git(f.site,'remote','add','origin',remote);git(f.site,'push','origin','gh-pages');
  execFileSync('git',['clone','--branch','gh-pages',remote,writer],{stdio:'pipe'});
  const newerRoot='<script src="./assets/latest.js"></script>';
  put(join(writer,'index.html'),newerRoot);put(join(writer,'assets/latest.js'),'new root published while companion checkout was stale');
  git(writer,'add','.');commit(writer,'newer main world');git(writer,'push','origin','gh-pages');
  assert.equal(pushCompanions(f.source,f.site,revision).changed,true);
  assert.equal(readFileSync(join(f.site,'index.html'),'utf8'),newerRoot);
  assert.equal(git(remote,'show','gh-pages:index.html'),newerRoot);
  assert.equal(git(remote,'show','gh-pages:racing/assets/game.js'),'game racing');
  assert.equal(pushCompanions(f.source,f.site,revision).changed,false);
  put(join(f.site,'index.html'),'local work must never be discarded');
  assert.throws(()=>pushCompanions(f.source,f.site,revision),/start clean/);
 }finally{rmSync(f.root,{recursive:true,force:true});}
});
