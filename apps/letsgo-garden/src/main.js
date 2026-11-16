import './style.css';
import './canyon.css';
import {startGarden} from './world.js';

startGarden().catch(error=>{
 console.error('Floating Garden could not start.',error);
 const loading=document.getElementById('loading');
 if(loading){
  loading.replaceChildren();
  const box=document.createElement('section');box.className='load-error';
  const title=document.createElement('h2');title.textContent='The garden couldn’t open';
  const help=document.createElement('p');help.textContent='Close other 3D tabs, restart your browser, and try again.';
  const retry=document.createElement('button');retry.type='button';retry.textContent='Try again';retry.onclick=()=>location.reload();
  box.append(title,help,retry);loading.append(box);
 }
});
