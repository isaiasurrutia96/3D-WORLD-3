(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Iu="modulepreload",Uu=function(i,e){return new URL(i,e).href},Zo={},Nu=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let c=function(u){return Promise.all(u.map(h=>Promise.resolve(h).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");r=c(t.map(u=>{if(u=Uu(u,n),u in Zo)return;Zo[u]=!0;const h=u.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(!!n)for(let g=a.length-1;g>=0;g--){const m=a[g];if(m.href===u&&(!h||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${f}`))return;const _=document.createElement("link");if(_.rel=h?"stylesheet":Iu,h||(_.as="script"),_.crossOrigin="",_.href=u,l&&_.setAttribute("nonce",l),document.head.appendChild(_),h)return new Promise((g,m)=>{_.addEventListener("load",g),_.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})},Ou="Floating garden — merged material surfaces",Fu={x_cells:36,y_cells:32,primary_cm:43,half_cm:21.5,quarter_cm:10.75},Bu=[[6,7],[4,10],[3,15],[4,21],[7,26],[11,28],[15,29],[22,29],[28,27],[31,23],[32,18],[32,12],[29,8],[25,5],[20,3],[15,3],[10,4]],zu=[[22,7],[22,8],[22,9],[22,10],[23,6],[23,7],[23,8],[23,9],[23,10],[24,5],[24,6],[24,7],[24,8],[24,9],[24,10],[25,5],[25,6],[25,7],[25,8],[25,9],[25,10],[26,7],[26,8],[26,9]],ku=-1,Gu=JSON.parse('[{"x":3,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":3,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":3,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":3,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":3,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":3,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":4,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":4,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":4,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":4,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":4,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":4,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":4,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":4,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":4,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":4,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":4,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":4,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":4,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":5,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":5,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":5,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":5,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":5,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":5,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":5,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":5,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":5,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":5,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":5,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":5,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":5,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"path"},{"x":5,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":5,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":5,"y":23,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":6,"y":7,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":6,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":6,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":6,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":6,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":6,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":6,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":6,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":6,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":6,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":6,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":6,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":6,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":6,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":6,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"path"},{"x":6,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"path"},{"x":6,"y":23,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":6,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":7,"y":6,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":7,"y":7,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":7,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":7,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":7,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":7,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":7,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":7,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":7,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":7,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":7,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":7,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":7,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":7,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":7,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":7,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":7,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":7,"y":23,"surface_cm":86,"bed_or_surface":"land","material":"path"},{"x":7,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":7,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":8,"y":5,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":6,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":7,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":8,"y":23,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":8,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"path"},{"x":8,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":8,"y":26,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":9,"y":4,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":5,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":6,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":7,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":9,"y":23,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":9,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":9,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":9,"y":26,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":10,"y":4,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":5,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":6,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":7,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":10,"y":23,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":10,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":10,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":10,"y":26,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":10,"y":27,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":11,"y":4,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":5,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":6,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":7,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":11,"y":23,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":11,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":11,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":11,"y":26,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":11,"y":27,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":12,"y":3,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":4,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":5,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":6,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":7,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":12,"y":23,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":12,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":12,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":12,"y":26,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":12,"y":27,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":13,"y":3,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":4,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":5,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":6,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":7,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":13,"y":23,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":13,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":13,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":13,"y":26,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":13,"y":27,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":13,"y":28,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":14,"y":3,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":4,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":5,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":6,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":7,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":14,"y":23,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":14,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":14,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":14,"y":26,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":14,"y":27,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":14,"y":28,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":15,"y":3,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":4,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":5,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":6,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":7,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":23,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":15,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":15,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":15,"y":26,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":15,"y":27,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":15,"y":28,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":3,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":4,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":5,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":6,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":7,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":23,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":24,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":16,"y":26,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":16,"y":27,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":16,"y":28,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":3,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":4,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":5,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":6,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":7,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":23,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":24,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":17,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":17,"y":26,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":17,"y":27,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":17,"y":28,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":18,"y":3,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":4,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":5,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":6,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":7,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":23,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":18,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":18,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":18,"y":26,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":18,"y":27,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":18,"y":28,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":19,"y":3,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":4,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":5,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":6,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":7,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":23,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":19,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":19,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":19,"y":26,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":19,"y":27,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":19,"y":28,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":20,"y":3,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":4,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":5,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":6,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":7,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":23,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":20,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":20,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":20,"y":26,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":20,"y":27,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":20,"y":28,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":21,"y":4,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":5,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":6,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":7,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":21,"y":23,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":21,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":21,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":21,"y":26,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":21,"y":27,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":21,"y":28,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":22,"y":4,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":22,"y":5,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":22,"y":6,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":22,"y":7,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":22,"y":8,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":22,"y":9,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":22,"y":10,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":22,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":22,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":22,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":22,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":22,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":22,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":22,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":22,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":22,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":22,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":22,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":22,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":22,"y":23,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":22,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":22,"y":25,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":22,"y":26,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":22,"y":27,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":22,"y":28,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":23,"y":4,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":23,"y":5,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":23,"y":6,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":23,"y":7,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":23,"y":8,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":23,"y":9,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":23,"y":10,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":23,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":23,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":23,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":23,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":23,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":23,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":23,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":23,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":23,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":23,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":23,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":23,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":23,"y":23,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":23,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":23,"y":25,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":23,"y":26,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":23,"y":27,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":24,"y":5,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":24,"y":6,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":24,"y":7,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":24,"y":8,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":24,"y":9,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":24,"y":10,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":24,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":24,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":24,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":24,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":24,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":24,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":24,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":24,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":24,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":24,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":24,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":24,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":24,"y":23,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":24,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":24,"y":25,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":24,"y":26,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":24,"y":27,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":25,"y":5,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":25,"y":6,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":25,"y":7,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":25,"y":8,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":25,"y":9,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":25,"y":10,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":25,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":25,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":25,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":25,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":25,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":25,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":25,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":25,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":25,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":25,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":25,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":25,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":25,"y":23,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":25,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":25,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":25,"y":26,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":25,"y":27,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":26,"y":6,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":26,"y":7,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":26,"y":8,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":26,"y":9,"surface_cm":-86,"bed_or_surface":"pond_bed","material":"sand"},{"x":26,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":26,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":26,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":26,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":26,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":26,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":26,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":26,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":26,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":26,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":26,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":26,"y":21,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":26,"y":22,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":26,"y":23,"surface_cm":43,"bed_or_surface":"land","material":"grass"},{"x":26,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":26,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":26,"y":26,"surface_cm":129,"bed_or_surface":"land","material":"grass"},{"x":27,"y":7,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":27,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":27,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":27,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":27,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":27,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":27,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":27,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":27,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":27,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":27,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":27,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":27,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":27,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":27,"y":21,"surface_cm":43,"bed_or_surface":"land","material":"grass"},{"x":27,"y":22,"surface_cm":43,"bed_or_surface":"land","material":"grass"},{"x":27,"y":23,"surface_cm":43,"bed_or_surface":"land","material":"grass"},{"x":27,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":27,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":27,"y":26,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":28,"y":8,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":28,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":28,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":28,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":28,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":28,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":28,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":28,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":28,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":28,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":28,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":28,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":28,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":28,"y":21,"surface_cm":43,"bed_or_surface":"land","material":"grass"},{"x":28,"y":22,"surface_cm":43,"bed_or_surface":"land","material":"grass"},{"x":28,"y":23,"surface_cm":43,"bed_or_surface":"land","material":"grass"},{"x":28,"y":24,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":28,"y":25,"surface_cm":86,"bed_or_surface":"land","material":"grass"},{"x":29,"y":9,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":29,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":29,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":29,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":29,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":29,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":29,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":29,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":29,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":29,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":29,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":29,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":29,"y":21,"surface_cm":43,"bed_or_surface":"land","material":"grass"},{"x":29,"y":22,"surface_cm":43,"bed_or_surface":"land","material":"grass"},{"x":29,"y":23,"surface_cm":43,"bed_or_surface":"land","material":"grass"},{"x":29,"y":24,"surface_cm":43,"bed_or_surface":"land","material":"grass"},{"x":30,"y":10,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":30,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":30,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":30,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":30,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":30,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":30,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":30,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":30,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":30,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":30,"y":20,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":30,"y":21,"surface_cm":43,"bed_or_surface":"land","material":"grass"},{"x":30,"y":22,"surface_cm":43,"bed_or_surface":"land","material":"grass"},{"x":30,"y":23,"surface_cm":43,"bed_or_surface":"land","material":"grass"},{"x":31,"y":11,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":31,"y":12,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":31,"y":13,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":31,"y":14,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":31,"y":15,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":31,"y":16,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":31,"y":17,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":31,"y":18,"surface_cm":0,"bed_or_surface":"land","material":"grass"},{"x":31,"y":19,"surface_cm":0,"bed_or_surface":"land","material":"grass"}]'),Vu=[{id:"T1",name:"Tree",cell:[6,14],anchor_q:[26,58,0],ground_cm:0},{id:"T2",name:"Tree",cell:[10,26],anchor_q:[42,106,8],ground_cm:86},{id:"T3",name:"Tree",cell:[23,27],anchor_q:[94,110,12],ground_cm:129},{id:"T4",name:"Tree",cell:[29,23],anchor_q:[118,94,4],ground_cm:43},{id:"T5",name:"Tree",cell:[30,14],anchor_q:[122,58,0],ground_cm:0},{id:"R1",name:"Rock cluster",cell:[6,10],anchor_q:[24,40,0],ground_cm:0},{id:"R2",name:"Rock cluster",cell:[20,28],anchor_q:[80,112,12],ground_cm:129},{id:"R3",name:"Rock cluster",cell:[28,10],anchor_q:[112,40,0],ground_cm:0},{id:"R4",name:"Rock cluster",cell:[23,5],anchor_q:[92,20,0],ground_cm:0},{id:"R5",name:"Rock cluster",cell:[27,25],anchor_q:[108,100,8],ground_cm:86},{id:"S1",name:"Flower shrub",cell:[5,12],anchor_q:[22,50,0],ground_cm:0},{id:"S2",name:"Flower shrub",cell:[17,27],anchor_q:[70,110,8],ground_cm:86},{id:"S3",name:"Flower shrub",cell:[29,11],anchor_q:[118,46,0],ground_cm:0},{id:"S4",name:"Flower shrub",cell:[22,5],anchor_q:[90,22,0],ground_cm:0},{id:"P1",name:"Pond",cell:[24,8],anchor_q:[98,34,-1],water_cm:-10.75,bed_cm:-86}],Hu=5,Wu={x_min_q:96,x_max_q:104,edge_y_q:20,water_h_q:-1,drop_m:2.8},Xu="Connected blocks of the same material form one softly rounded surface. Source blocks remain editable.",qu=!1,ln={title:Ou,grid:Fu,footprint:Bu,pond_cells:zu,water_h_q:ku,heightmap:Gu,features:Vu,tree_count:Hu,waterfall:Wu,method:Xu,track:qu},jo=JSON.parse('[{"type":"stone","sourceBlockIds":[0,1,5,6,10,11,15,16,20,21,25,26,30,31,35,36,40,41,45,46,50,51,55,56,60,61,65,66,70,71,75,76,80,81,85,86,90,91,95,96,100,101,105,106,110,111,115,116,120,121,122,126,127,128,132,133,134,138,139,140,144,145,149,150,154,155,159,160,164,165,169,170,174,175,179,180,184,185,189,190,194,195,196,200,201,202,206,207,208,212,213,214,218,219,220,221,225,226,227,228,232,233,234,238,239,240,244,245,246,250,251,252,256,257,258,262,263,267,268,272,273,279,280,286,287,291,292,296,297,301,302,303,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,334,335,336,337,341,342,343,344,348,349,350,351,355,356,357,358,362,363,364,365,369,370,371,372,376,377,378,382,383,384,388,389,390,394,395,401,402,408,409,415,416,420,421,425,426,430,431,432,436,437,438,442,443,444,445,449,450,451,452,456,457,458,459,460,464,465,466,467,468,472,473,474,475,476,480,481,482,483,484,488,489,490,491,492,496,497,498,499,500,504,505,506,507,511,512,513,514,518,519,520,521,525,526,527,528,532,533,534,538,539,540,546,547,553,554,560,561,567,568,572,573,577,578,582,583,584,588,589,590,594,595,596,597,601,602,603,604,608,609,610,611,612,616,617,618,619,620,624,625,626,627,628,629,633,634,635,636,637,638,642,643,644,645,646,647,651,652,653,654,655,656,660,661,662,663,664,668,669,670,671,672,676,677,678,679,680,684,685,686,687,688,692,693,694,695,699,700,701,702,706,707,708,714,715,716,722,723,729,730,736,737,741,742,746,747,748,752,753,754,758,759,760,761,765,766,767,768,772,773,774,775,776,780,781,782,783,784,785,789,790,791,792,793,794,798,799,800,801,802,803,807,808,809,810,811,812,813,817,818,819,820,821,822,823,827,828,829,830,831,832,836,837,838,839,840,841,845,846,847,848,849,850,854,855,856,857,858,859,863,864,865,866,867,868,872,873,874,875,876,880,881,882,883,887,888,889,890,896,897,898,904,905,911,912,918,919,925,926,930,931,935,936,937,941,942,943,944,948,949,950,951,955,956,957,958,959,963,964,965,966,967,968,972,973,974,975,976,977,981,982,983,984,985,986,987,991,992,993,994,995,996,997,1001,1002,1003,1004,1005,1006,1007,1011,1012,1013,1014,1015,1016,1017,1021,1022,1023,1024,1025,1026,1027,1031,1032,1033,1034,1035,1036,1037,1041,1042,1043,1044,1045,1046,1047,1051,1052,1053,1054,1055,1056,1057,1061,1062,1063,1064,1065,1066,1070,1071,1072,1073,1074,1075,1079,1080,1081,1082,1083,1087,1088,1089,1090,1096,1097,1098,1104,1105,1106,1112,1113,1119,1120,1126,1127,1131,1132,1136,1137,1141,1142,1143,1147,1148,1149,1150,1154,1155,1156,1157,1158,1162,1163,1164,1165,1166,1170,1171,1172,1173,1174,1175,1179,1180,1181,1182,1183,1184,1185,1189,1190,1191,1192,1193,1194,1195,1199,1200,1201,1202,1203,1204,1205,1206,1210,1211,1212,1213,1214,1215,1216,1217,1221,1222,1223,1224,1225,1226,1227,1228,1232,1233,1234,1235,1236,1237,1238,1239,1243,1244,1245,1246,1247,1248,1249,1250,1254,1255,1256,1257,1258,1259,1260,1261,1265,1266,1267,1268,1269,1270,1271,1275,1276,1277,1278,1279,1280,1281,1285,1286,1287,1288,1289,1290,1294,1295,1296,1297,1298,1302,1303,1304,1305,1311,1312,1313,1314,1320,1321,1322,1328,1329,1335,1336,1342,1343,1347,1348,1352,1353,1354,1358,1359,1360,1364,1365,1366,1367,1371,1372,1373,1374,1375,1379,1380,1381,1382,1383,1384,1388,1389,1390,1391,1392,1393,1397,1398,1399,1400,1401,1402,1403,1407,1408,1409,1410,1411,1412,1413,1414,1418,1419,1420,1421,1422,1423,1424,1425,1429,1430,1431,1432,1433,1434,1435,1436,1437,1441,1442,1443,1444,1445,1446,1447,1448,1449,1453,1454,1455,1456,1457,1458,1459,1460,1461,1465,1466,1467,1468,1469,1470,1471,1472,1473,1477,1478,1479,1480,1481,1482,1483,1484,1488,1489,1490,1491,1492,1493,1494,1495,1499,1500,1501,1502,1503,1504,1505,1509,1510,1511,1512,1513,1514,1518,1519,1520,1521,1522,1526,1527,1528,1529,1530,1536,1537,1538,1539,1545,1546,1547,1553,1554,1560,1561,1567,1568,1574,1575,1579,1580,1584,1585,1586,1590,1591,1592,1593,1597,1598,1599,1600,1604,1605,1606,1607,1608,1612,1613,1614,1615,1616,1617,1621,1622,1623,1624,1625,1626,1627,1631,1632,1633,1634,1635,1636,1637,1641,1642,1643,1644,1645,1646,1647,1648,1652,1653,1654,1655,1656,1657,1658,1659,1660,1664,1665,1666,1667,1668,1669,1670,1671,1672,1673,1677,1678,1679,1680,1681,1682,1683,1684,1685,1686,1690,1691,1692,1693,1694,1695,1696,1697,1698,1702,1703,1704,1705,1706,1707,1708,1709,1710,1714,1715,1716,1717,1718,1719,1720,1721,1722,1726,1727,1728,1729,1730,1731,1732,1733,1737,1738,1739,1740,1741,1742,1743,1747,1748,1749,1750,1751,1752,1756,1757,1758,1759,1760,1761,1765,1766,1767,1768,1769,1775,1776,1777,1778,1784,1785,1786,1792,1793,1794,1800,1801,1807,1808,1814,1815,1819,1820,1824,1825,1826,1830,1831,1832,1833,1837,1838,1839,1840,1844,1845,1846,1847,1848,1852,1853,1854,1855,1856,1857,1861,1862,1863,1864,1865,1866,1867,1871,1872,1873,1874,1875,1876,1877,1878,1882,1883,1884,1885,1886,1887,1888,1889,1893,1894,1895,1896,1897,1898,1899,1900,1901,1905,1906,1907,1908,1909,1910,1911,1912,1913,1914,1918,1919,1920,1921,1922,1923,1924,1925,1926,1927,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,1944,1945,1946,1947,1948,1949,1950,1951,1952,1953,1957,1958,1959,1960,1961,1962,1963,1964,1965,1969,1970,1971,1972,1973,1974,1975,1976,1980,1981,1982,1983,1984,1985,1986,1990,1991,1992,1993,1994,1995,1996,2000,2001,2002,2003,2004,2005,2009,2010,2011,2012,2013,2017,2018,2019,2020,2026,2027,2028,2029,2035,2036,2037,2043,2044,2050,2051,2055,2056,2060,2061,2065,2066,2067,2071,2072,2073,2074,2078,2079,2080,2081,2085,2086,2087,2088,2089,2093,2094,2095,2096,2097,2098,2102,2103,2104,2105,2106,2107,2108,2112,2113,2114,2115,2116,2117,2118,2119,2123,2124,2125,2126,2127,2128,2129,2130,2134,2135,2136,2137,2138,2139,2140,2141,2142,2146,2147,2148,2149,2150,2151,2152,2153,2154,2155,2159,2160,2161,2162,2163,2164,2165,2166,2167,2168,2169,2173,2174,2175,2176,2177,2178,2179,2180,2181,2182,2183,2187,2188,2189,2190,2191,2192,2193,2194,2195,2196,2200,2201,2202,2203,2204,2205,2206,2207,2208,2212,2213,2214,2215,2216,2217,2218,2219,2223,2224,2225,2226,2227,2228,2229,2230,2234,2235,2236,2237,2238,2239,2240,2244,2245,2246,2247,2248,2249,2253,2254,2255,2256,2257,2261,2262,2263,2264,2268,2269,2270,2271,2277,2278,2279,2285,2286,2290,2291,2295,2296,2300,2301,2305,2306,2307,2311,2312,2313,2314,2318,2319,2320,2321,2325,2326,2327,2328,2329,2333,2334,2335,2336,2337,2338,2342,2343,2344,2345,2346,2347,2348,2352,2353,2354,2355,2356,2357,2358,2359,2363,2364,2365,2366,2367,2368,2369,2370,2374,2375,2376,2377,2378,2379,2380,2381,2382,2386,2387,2388,2389,2390,2391,2392,2393,2394,2395,2399,2400,2401,2402,2403,2404,2405,2406,2407,2408,2409,2413,2414,2415,2416,2417,2418,2419,2420,2421,2422,2423,2427,2428,2429,2430,2431,2432,2433,2434,2435,2436,2440,2441,2442,2443,2444,2445,2446,2447,2448,2452,2453,2454,2455,2456,2457,2458,2459,2463,2464,2465,2466,2467,2468,2469,2470,2474,2475,2476,2477,2478,2479,2480,2484,2485,2486,2487,2488,2489,2493,2494,2495,2496,2497,2501,2502,2503,2504,2508,2509,2510,2511,2517,2518,2519,2525,2526,2532,2533,2539,2540,2544,2545,2549,2550,2551,2555,2556,2557,2558,2562,2563,2564,2565,2569,2570,2571,2572,2573,2577,2578,2579,2580,2581,2582,2586,2587,2588,2589,2590,2591,2592,2596,2597,2598,2599,2600,2601,2602,2606,2607,2608,2609,2610,2611,2612,2613,2617,2618,2619,2620,2621,2622,2623,2624,2625,2629,2630,2631,2632,2633,2634,2635,2636,2637,2638,2642,2643,2644,2645,2646,2647,2648,2649,2650,2651,2655,2656,2657,2658,2659,2660,2661,2662,2663,2664,2665,2669,2670,2671,2672,2673,2674,2675,2676,2677,2678,2682,2683,2684,2685,2686,2687,2688,2689,2690,2694,2695,2696,2697,2698,2699,2700,2701,2705,2706,2707,2708,2709,2710,2711,2712,2716,2717,2718,2719,2720,2721,2722,2726,2727,2728,2729,2730,2731,2735,2736,2737,2738,2739,2743,2744,2745,2746,2752,2753,2754,2755,2761,2762,2763,2769,2770,2776,2777,2783,2784,2788,2789,2793,2794,2795,2799,2800,2801,2805,2806,2807,2808,2812,2813,2814,2815,2816,2820,2821,2822,2823,2824,2825,2829,2830,2831,2832,2833,2834,2838,2839,2840,2841,2842,2843,2844,2848,2849,2850,2851,2852,2853,2854,2855,2859,2860,2861,2862,2863,2864,2865,2866,2867,2871,2872,2873,2874,2875,2876,2877,2878,2879,2883,2884,2885,2886,2887,2888,2889,2890,2891,2892,2896,2897,2898,2899,2900,2901,2902,2903,2904,2905,2906,2910,2911,2912,2913,2914,2915,2916,2917,2918,2919,2923,2924,2925,2926,2927,2928,2929,2930,2931,2935,2936,2937,2938,2939,2940,2941,2942,2946,2947,2948,2949,2950,2951,2952,2953,2957,2958,2959,2960,2961,2962,2963,2967,2968,2969,2970,2971,2972,2976,2977,2978,2979,2980,2984,2985,2986,2987,2993,2994,2995,2996,3002,3003,3004,3010,3011,3017,3018,3024,3025,3029,3030,3034,3035,3039,3040,3041,3045,3046,3047,3048,3052,3053,3054,3055,3056,3060,3061,3062,3063,3064,3068,3069,3070,3071,3072,3073,3077,3078,3079,3080,3081,3082,3083,3087,3088,3089,3090,3091,3092,3093,3094,3098,3099,3100,3101,3102,3103,3104,3105,3109,3110,3111,3112,3113,3114,3115,3116,3117,3121,3122,3123,3124,3125,3126,3127,3128,3129,3130,3134,3135,3136,3137,3138,3139,3140,3141,3142,3143,3147,3148,3149,3150,3151,3152,3153,3154,3155,3156,3160,3161,3162,3163,3164,3165,3166,3167,3168,3172,3173,3174,3175,3176,3177,3178,3179,3183,3184,3185,3186,3187,3188,3189,3193,3194,3195,3196,3197,3198,3199,3203,3204,3205,3206,3207,3208,3212,3213,3214,3215,3216,3220,3221,3222,3223,3229,3230,3231,3232,3238,3239,3240,3247,3248,3255,3256,3263,3264,3268,3269,3273,3274,3275,3279,3280,3281,3282,3286,3287,3288,3289,3293,3294,3295,3296,3297,3301,3302,3303,3304,3305,3306,3310,3311,3312,3313,3314,3315,3316,3320,3321,3322,3323,3324,3325,3326,3330,3331,3332,3333,3334,3335,3336,3337,3341,3342,3343,3344,3345,3346,3347,3348,3352,3353,3354,3355,3356,3357,3358,3359,3360,3364,3365,3366,3367,3368,3369,3370,3371,3372,3376,3377,3378,3379,3380,3381,3382,3383,3384,3388,3389,3390,3391,3392,3393,3394,3395,3396,3400,3401,3402,3403,3404,3405,3406,3407,3411,3412,3413,3414,3415,3416,3417,3421,3422,3423,3424,3425,3426,3430,3431,3432,3433,3434,3435,3439,3440,3441,3442,3443,3449,3450,3451,3452,3458,3459,3460,3466,3467,3468,3475,3476,3483,3484,3491,3492,3496,3497,3501,3502,3503,3507,3511,3512,3516,3517,3518,3522,3523,3524,3525,3529,3530,3531,3532,3533,3534,3538,3539,3540,3541,3542,3543,3544,3548,3549,3550,3551,3552,3553,3554,3558,3559,3560,3561,3562,3563,3564,3565,3569,3570,3571,3572,3573,3574,3575,3576,3580,3581,3582,3583,3584,3585,3586,3587,3591,3592,3593,3594,3595,3596,3597,3598,3602,3603,3604,3605,3606,3607,3608,3609,3613,3614,3615,3616,3617,3618,3619,3620,3624,3625,3626,3627,3628,3629,3630,3634,3635,3636,3637,3638,3639,3643,3644,3645,3646,3647,3651,3652,3653,3654,3655,3661,3662,3663,3664,3670,3671,3672,3679,3680,3687,3688,3695,3696,3703,3704,3708,3709,3716,3720,3721,3725,3726,3730,3731,3732,3736,3737,3738,3739,3740,3741,3745,3746,3747,3748,3749,3750,3754,3755,3756,3757,3758,3759,3760,3764,3765,3766,3767,3768,3769,3770,3774,3775,3776,3777,3778,3779,3780,3781,3785,3786,3787,3788,3789,3790,3791,3792,3796,3797,3798,3799,3800,3801,3802,3806,3807,3808,3809,3810,3811,3812,3816,3817,3818,3819,3820,3821,3822,3826,3827,3828,3829,3830,3831,3832,3836,3837,3838,3839,3840,3841,3845,3846,3847,3848,3849,3853,3854,3855,3856,3862,3863,3864,3865,3871,3872,3873,3880,3881,3888,3889,3902,3906,3910,3911,3915,3916,3920,3921,3922,3923,3924,3928,3929,3930,3931,3932,3933,3937,3938,3939,3940,3941,3942,3946,3947,3948,3949,3950,3951,3952,3956,3957,3958,3959,3960,3961,3962,3966,3967,3968,3969,3970,3971,3972,3976,3977,3978,3979,3980,3981,3982,3986,3987,3988,3989,3990,3991,3995,3996,3997,3998,3999,4000,4004,4005,4006,4007,4008,4009,4013,4014,4015,4016,4017,4018,4022,4023,4024,4025,4026,4030,4031,4032,4033,4039,4040,4041,4047,4048,4049,4056,4057,4064,4065,4081,4085,4089,4090,4094,4095,4096,4097,4101,4102,4103,4104,4105,4109,4110,4111,4112,4113,4114,4118,4119,4120,4121,4122,4123,4127,4128,4129,4130,4131,4132,4136,4137,4138,4139,4140,4141,4145,4146,4147,4148,4149,4150,4154,4155,4156,4157,4158,4159,4163,4164,4165,4166,4167,4171,4172,4173,4174,4175,4179,4180,4181,4182,4183,4187,4188,4189,4190,4194,4195,4196,4197,4203,4204,4205,4211,4212,4218,4219,4226,4227,4245,4249,4250,4251,4255,4256,4257,4258,4262,4263,4264,4265,4269,4270,4271,4272,4273,4277,4278,4279,4280,4281,4285,4286,4287,4288,4289,4293,4294,4295,4296,4297,4301,4302,4303,4304,4305,4309,4310,4311,4312,4313,4317,4318,4319,4320,4321,4325,4326,4327,4328,4332,4333,4334,4335,4339,4340,4341,4342,4346,4347,4348,4353,4354,4355,4361,4362,4368,4369,4376,4377,4381,4382,4386,4387,4391,4392,4393,4397,4398,4399,4403,4404,4405,4406,4410,4411,4412,4413,4417,4418,4419,4420,4424,4425,4426,4427,4431,4432,4433,4434,4438,4439,4440,4441,4445,4446,4447,4448,4452,4453,4454,4455,4459,4460,4461,4462,4466,4467,4468,4469,4474,4475,4476,4481,4482,4483,4488,4489,4495,4496,4502,4503,4509,4510,4514,4515,4519,4520,4524,4525,4526,4530,4531,4532,4536,4537,4538,4539,4543,4544,4545,4546,4550,4551,4552,4553,4557,4558,4559,4560,4564,4565,4566,4567,4571,4572,4573,4577,4578,4579,4583,4584,4585,4589,4590,4591,4596,4597,4598,4603,4604,4609,4610,4616,4617,4623,4624,4628,4629,4633,4634,4638,4639,4640,4644,4645,4646,4650,4651,4652,4656,4657,4658,4662,4663,4664,4668,4669,4670,4674,4675,4676,4680,4681,4685,4686,4690,4691,4696,4697,4702,4703,4708,4709,4714,4715,4719,4720,4724,4725,4729,4730,4734,4735,4739,4740,4744,4745,4749,4750,4754,4755,4759,4760,4764,4765,4769,4770,4775,4776,4781,4782,4787,4788,4792,4793,4797,4798,4802,4803,4807,4808,4812,4813,4817,4818,4822,4823,4827,4828],"features":["terrain"],"kind":"mesh","vertexCount":12066,"indexCount":72384,"positionOffset":0,"normalOffset":144792,"indexOffset":289584,"error_m":0.0036497018299996853},{"type":"dirt","sourceBlockIds":[2,3,7,8,12,13,17,18,22,23,27,28,32,33,37,38,42,43,47,48,52,53,57,58,62,63,67,68,72,73,77,78,82,83,87,88,92,93,97,98,102,103,107,108,112,113,117,118,123,124,129,130,135,136,141,142,146,147,151,152,156,157,161,162,166,167,171,172,176,177,181,182,186,187,191,192,197,198,203,204,209,210,215,216,222,223,229,230,235,236,241,242,247,248,253,254,259,260,264,265,269,270,274,275,276,277,281,282,283,284,288,289,293,294,298,299,304,305,310,311,317,318,324,325,331,332,338,339,345,346,352,353,359,360,366,367,373,374,379,380,385,386,391,392,396,397,398,399,403,404,405,406,410,411,412,413,417,418,422,423,427,428,433,434,439,440,446,447,453,454,461,462,469,470,477,478,485,486,493,494,501,502,508,509,515,516,522,523,529,530,535,536,541,542,543,544,548,549,550,551,555,556,557,558,562,563,564,565,569,570,574,575,579,580,585,586,591,592,598,599,605,606,613,614,621,622,630,631,639,640,648,649,657,658,665,666,673,674,681,682,689,690,696,697,703,704,709,710,711,712,717,718,719,720,724,725,726,727,731,732,733,734,738,739,743,744,749,750,755,756,762,763,769,770,777,778,786,787,795,796,804,805,814,815,824,825,833,834,842,843,851,852,860,861,869,870,877,878,884,885,891,892,893,894,899,900,901,902,906,907,908,909,913,914,915,916,920,921,922,923,927,928,932,933,938,939,945,946,952,953,960,961,969,970,978,979,988,989,998,999,1008,1009,1018,1019,1028,1029,1038,1039,1048,1049,1058,1059,1067,1068,1076,1077,1084,1085,1091,1092,1093,1094,1099,1100,1101,1102,1107,1108,1109,1110,1114,1115,1116,1117,1121,1122,1123,1124,1128,1129,1133,1134,1138,1139,1144,1145,1151,1152,1159,1160,1167,1168,1176,1177,1186,1187,1196,1197,1207,1208,1218,1219,1229,1230,1240,1241,1251,1252,1262,1263,1272,1273,1282,1283,1291,1292,1299,1300,1306,1307,1308,1309,1315,1316,1317,1318,1323,1324,1325,1326,1330,1331,1332,1333,1337,1338,1339,1340,1344,1345,1349,1350,1355,1356,1361,1362,1368,1369,1376,1377,1385,1386,1394,1395,1404,1405,1415,1416,1426,1427,1438,1439,1450,1451,1462,1463,1474,1475,1485,1486,1496,1497,1506,1507,1515,1516,1523,1524,1531,1532,1533,1534,1540,1541,1542,1543,1548,1549,1550,1551,1555,1556,1557,1558,1562,1563,1564,1565,1569,1570,1571,1572,1576,1577,1581,1582,1587,1588,1594,1595,1601,1602,1609,1610,1618,1619,1628,1629,1638,1639,1649,1650,1661,1662,1674,1675,1687,1688,1699,1700,1711,1712,1723,1724,1734,1735,1744,1745,1753,1754,1762,1763,1770,1771,1772,1773,1779,1780,1781,1782,1787,1788,1789,1790,1795,1796,1797,1798,1802,1803,1804,1805,1809,1810,1811,1812,1816,1817,1821,1822,1827,1828,1834,1835,1841,1842,1849,1850,1858,1859,1868,1869,1879,1880,1890,1891,1902,1903,1915,1916,1928,1929,1941,1942,1954,1955,1966,1967,1977,1978,1987,1988,1997,1998,2006,2007,2014,2015,2021,2022,2023,2024,2030,2031,2032,2033,2038,2039,2040,2041,2045,2046,2047,2048,2052,2053,2057,2058,2062,2063,2068,2069,2075,2076,2082,2083,2090,2091,2099,2100,2109,2110,2120,2121,2131,2132,2143,2144,2156,2157,2170,2171,2184,2185,2197,2198,2209,2210,2220,2221,2231,2232,2241,2242,2250,2251,2258,2259,2265,2266,2272,2273,2274,2275,2280,2281,2282,2283,2287,2288,2292,2293,2297,2298,2302,2303,2308,2309,2315,2316,2322,2323,2330,2331,2339,2340,2349,2350,2360,2361,2371,2372,2383,2384,2396,2397,2410,2411,2424,2425,2437,2438,2449,2450,2460,2461,2471,2472,2481,2482,2490,2491,2498,2499,2505,2506,2512,2513,2514,2515,2520,2521,2522,2523,2527,2528,2529,2530,2534,2535,2536,2537,2541,2542,2546,2547,2552,2553,2559,2560,2566,2567,2574,2575,2583,2584,2593,2594,2603,2604,2614,2615,2626,2627,2639,2640,2652,2653,2666,2667,2679,2680,2691,2692,2702,2703,2713,2714,2723,2724,2732,2733,2740,2741,2747,2748,2749,2750,2756,2757,2758,2759,2764,2765,2766,2767,2771,2772,2773,2774,2778,2779,2780,2781,2785,2786,2790,2791,2796,2797,2802,2803,2809,2810,2817,2818,2826,2827,2835,2836,2845,2846,2856,2857,2868,2869,2880,2881,2893,2894,2907,2908,2920,2921,2932,2933,2943,2944,2954,2955,2964,2965,2973,2974,2981,2982,2988,2989,2990,2991,2997,2998,2999,3000,3005,3006,3007,3008,3012,3013,3014,3015,3019,3020,3021,3022,3026,3027,3031,3032,3036,3037,3042,3043,3049,3050,3057,3058,3065,3066,3074,3075,3084,3085,3095,3096,3106,3107,3118,3119,3131,3132,3144,3145,3157,3158,3169,3170,3180,3181,3190,3191,3200,3201,3209,3210,3217,3218,3224,3225,3226,3227,3233,3234,3235,3236,3241,3242,3243,3244,3245,3249,3250,3251,3252,3253,3257,3258,3259,3260,3261,3265,3266,3270,3271,3276,3277,3283,3284,3290,3291,3298,3299,3307,3308,3317,3318,3327,3328,3338,3339,3349,3350,3361,3362,3373,3374,3385,3386,3397,3398,3408,3409,3418,3419,3427,3428,3436,3437,3444,3445,3446,3447,3453,3454,3455,3456,3461,3462,3463,3464,3469,3470,3471,3472,3473,3477,3478,3479,3480,3481,3485,3486,3487,3488,3489,3493,3494,3498,3499,3504,3505,3535,3536,3545,3546,3555,3556,3566,3567,3577,3578,3588,3589,3599,3600,3610,3611,3621,3622,3631,3632,3640,3641,3648,3649,3656,3657,3658,3659,3665,3666,3667,3668,3673,3674,3675,3676,3677,3681,3682,3683,3684,3685,3689,3690,3691,3692,3693,3697,3698,3699,3700,3701,3705,3706,3710,3711,3742,3743,3751,3752,3761,3762,3771,3772,3782,3783,3793,3794,3803,3804,3813,3814,3823,3824,3833,3834,3842,3843,3850,3851,3857,3858,3859,3860,3866,3867,3868,3869,3874,3875,3876,3877,3878,3882,3883,3884,3885,3886,3890,3891,3892,3893,3894,3925,3926,3934,3935,3943,3944,3953,3954,3963,3964,3973,3974,3983,3984,3992,3993,4001,4002,4010,4011,4019,4020,4027,4028,4034,4035,4036,4037,4042,4043,4044,4045,4050,4051,4052,4053,4054,4058,4059,4060,4061,4062,4066,4067,4068,4069,4070,4098,4099,4106,4107,4115,4116,4124,4125,4133,4134,4142,4143,4151,4152,4160,4161,4168,4169,4176,4177,4184,4185,4191,4192,4198,4199,4200,4201,4206,4207,4208,4209,4213,4214,4215,4216,4220,4221,4222,4223,4224,4228,4229,4230,4231,4232,4252,4253,4259,4260,4266,4267,4274,4275,4282,4283,4290,4291,4298,4299,4306,4307,4314,4315,4322,4323,4329,4330,4336,4337,4343,4344,4349,4350,4351,4356,4357,4358,4359,4363,4364,4365,4366,4370,4371,4372,4373,4374,4378,4379,4383,4384,4388,4389,4394,4395,4400,4401,4407,4408,4414,4415,4421,4422,4428,4429,4435,4436,4442,4443,4449,4450,4456,4457,4463,4464,4470,4471,4472,4477,4478,4479,4484,4485,4486,4490,4491,4492,4493,4497,4498,4499,4500,4504,4505,4506,4507,4511,4512,4516,4517,4521,4522,4527,4528,4533,4534,4540,4541,4547,4548,4554,4555,4561,4562,4568,4569,4574,4575,4580,4581,4586,4587,4592,4593,4594,4599,4600,4601,4605,4606,4607,4611,4612,4613,4614,4618,4619,4620,4621,4625,4626,4630,4631,4635,4636,4641,4642,4647,4648,4653,4654,4659,4660,4665,4666,4671,4672,4677,4678,4682,4683,4687,4688,4692,4693,4694,4698,4699,4700,4704,4705,4706,4710,4711,4712,4716,4717,4721,4722,4726,4727,4731,4732,4736,4737,4741,4742,4746,4747,4751,4752,4756,4757,4761,4762,4766,4767,4771,4772,4773,4777,4778,4779,4783,4784,4785,4789,4790,4794,4795,4799,4800,4804,4805,4809,4810,4814,4815,4819,4820,4824,4825,4829,4830],"features":["terrain"],"kind":"mesh","vertexCount":10055,"indexCount":60318,"positionOffset":579120,"normalOffset":699780,"indexOffset":820440,"error_m":0.0030435831286013126},{"type":"grass","sourceBlockIds":[4,9,14,19,24,29,34,39,44,49,54,59,64,69,74,79,84,89,94,99,104,109,114,119,125,131,137,143,148,153,158,168,173,178,183,188,193,199,205,211,217,224,231,237,243,249,255,261,290,295,300,306,312,319,326,333,340,347,354,361,368,375,381,387,393,419,424,429,435,441,448,455,463,471,479,487,495,503,510,517,524,531,537,571,576,581,587,593,600,607,615,623,632,641,650,659,667,675,683,691,698,705,740,745,751,757,764,771,779,788,797,806,816,826,835,844,853,862,871,879,886,929,934,940,947,954,962,971,980,990,1000,1010,1020,1030,1040,1050,1060,1069,1078,1086,1130,1135,1140,1146,1153,1161,1169,1178,1188,1198,1209,1220,1231,1242,1253,1264,1274,1284,1293,1301,1346,1351,1357,1363,1370,1378,1387,1396,1406,1417,1428,1440,1452,1464,1476,1487,1498,1508,1517,1525,1578,1583,1589,1596,1603,1611,1620,1630,1640,1651,1663,1676,1689,1701,1713,1725,1736,1746,1755,1764,1818,1823,1829,1836,1843,1851,1860,1870,1881,1892,1904,1917,1930,1943,1956,1968,1979,1989,1999,2008,2016,2059,2064,2070,2077,2084,2092,2101,2111,2122,2133,2145,2158,2172,2186,2199,2211,2222,2233,2243,2252,2260,2267,2299,2304,2310,2317,2324,2332,2341,2351,2362,2373,2385,2398,2412,2426,2439,2451,2462,2473,2483,2492,2500,2507,2543,2548,2554,2561,2568,2576,2585,2595,2605,2616,2628,2641,2654,2668,2681,2693,2704,2715,2725,2734,2742,2787,2792,2798,2804,2811,2819,2828,2837,2847,2858,2870,2882,2895,2909,2922,2934,2945,2956,2966,2975,2983,3028,3033,3038,3044,3051,3059,3067,3076,3086,3097,3108,3120,3133,3146,3159,3171,3182,3192,3202,3211,3219,3267,3272,3278,3285,3292,3300,3309,3319,3329,3340,3351,3363,3375,3387,3399,3410,3420,3429,3438,3495,3500,3506,3537,3547,3557,3568,3579,3590,3601,3612,3623,3633,3642,3650,3707,3712,3744,3753,3763,3773,3784,3795,3805,3815,3825,3835,3844,3852,3927,3936,3945,3955,3965,3975,3985,3994,4003,4012,4021,4029,4100,4108,4117,4126,4135,4144,4153,4162,4170,4178,4186,4193,4254,4261,4268,4276,4284,4292,4300,4308,4316,4324,4331,4338,4345,4380,4385,4390,4396,4402,4409,4416,4423,4430,4437,4444,4451,4458,4465,4513,4518,4523,4529,4535,4542,4549,4556,4563,4570,4576,4582,4588,4627,4632,4637,4643,4649,4655,4661,4667,4673,4679,4684,4689,4718,4723,4728,4733,4738,4743,4748,4753,4758,4763,4768,4791,4796,4801,4806,4811,4816,4821,4826,4831],"features":["terrain"],"kind":"mesh","vertexCount":6777,"indexCount":40650,"positionOffset":1061712,"normalOffset":1143036,"indexOffset":1224360,"error_m":0.002280918415635824},{"type":"path","sourceBlockIds":[163],"features":["terrain"],"kind":"box","position_m":[2.3649999999999998,-0.215,-8.815],"size_m":0.43},{"type":"path","sourceBlockIds":[266,271],"features":["terrain"],"kind":"mesh","vertexCount":62,"indexCount":360,"positionOffset":1386960,"normalOffset":1387704,"indexOffset":1388448,"error_m":0.006622134242206812},{"type":"grass","sourceBlockIds":[278,285,407,414,545,559,566,713,721,728,735,895,903,910,917,924,1095,1103,1111,1118,1125,1310,1319,1327,1334,1341,1535,1544,1552,1559,1566,1573,1774,1783,1791,1799,1806,1813,2025,2034,2042,2049,2276,2284,2516,2524,2531,2538,2751,2760,2768,2775,2782,2992,3001,3009,3016,3023,3228,3237,3448,3457,3465,3660,3669,3861,3870,4038,4046,4202,4210,4217,4360,4367,4494,4501,4508,4615,4622],"features":["terrain"],"kind":"mesh","vertexCount":1458,"indexCount":8736,"positionOffset":1389888,"normalOffset":1407384,"indexOffset":1424880,"error_m":0.0025609363801777363},{"type":"path","sourceBlockIds":[400],"features":["terrain"],"kind":"box","position_m":[3.225,0.645,-10.105],"size_m":0.43},{"type":"path","sourceBlockIds":[552],"features":["terrain"],"kind":"box","position_m":[3.655,0.645,-10.535],"size_m":0.43},{"type":"grass","sourceBlockIds":[2054,2289,2294],"features":["terrain"],"kind":"mesh","vertexCount":87,"indexCount":510,"positionOffset":1459824,"normalOffset":1460868,"indexOffset":1461912,"error_m":0.006903489585965872},{"type":"grass","sourceBlockIds":[3246,3254,3262,3474,3482,3490,3678,3686,3694,3702,3879,3887,3895,4055,4063,4071,4225,4233,4375],"features":["terrain"],"kind":"mesh","vertexCount":375,"indexCount":2238,"positionOffset":1463952,"normalOffset":1468452,"indexOffset":1472952,"error_m":0.0017119672847911716},{"type":"dirt","sourceBlockIds":[3508,3509,3513,3514,3519,3520,3526,3527,3713,3714,3717,3718,3722,3723,3727,3728,3733,3734,3896,3897,3899,3900,3903,3904,3907,3908,3912,3913,3917,3918,4072,4073,4075,4076,4078,4079,4082,4083,4086,4087,4091,4092,4239,4240,4242,4243,4246,4247],"features":["terrain"],"kind":"mesh","vertexCount":578,"indexCount":3456,"positionOffset":1481904,"normalOffset":1488840,"indexOffset":1495776,"error_m":0.0010185318533331156},{"type":"sand","sourceBlockIds":[3510,3515,3521,3528,3715,3719,3724,3729,3735,3898,3901,3905,3909,3914,3919,4074,4077,4080,4084,4088,4093,4241,4244,4248],"features":["terrain"],"kind":"mesh","vertexCount":439,"indexCount":2622,"positionOffset":1509600,"normalOffset":1514868,"indexOffset":1520136,"error_m":0.0013668974861502647},{"type":"stone","sourceBlockIds":[4234,4235],"features":["terrain"],"kind":"mesh","vertexCount":62,"indexCount":360,"positionOffset":1530624,"normalOffset":1531368,"indexOffset":1532112,"error_m":0.006618464831262827},{"type":"dirt","sourceBlockIds":[4236,4237],"features":["terrain"],"kind":"mesh","vertexCount":62,"indexCount":360,"positionOffset":1533552,"normalOffset":1534296,"indexOffset":1535040,"error_m":0.007030179724097252},{"type":"grass","sourceBlockIds":[4238],"features":["terrain"],"kind":"box","position_m":[11.395,-0.215,-2.795],"size_m":0.43},{"type":"grass","sourceBlockIds":[4352,4473,4480,4487,4595,4602,4608,4695,4701,4707,4713,4774,4780,4786],"features":["terrain"],"kind":"mesh","vertexCount":287,"indexCount":1710,"positionOffset":1536480,"normalOffset":1539924,"indexOffset":1543368,"error_m":0.0019973227754235268},{"type":"wood","sourceBlockIds":[4832,4833,4834,4835,4836,4837,4838,4839,4840,4841,4842,4843,4844,4845,4846,4847,4848,4849,4850,4851,4852,4853,4854,4855,4856,4857,4858,4859,4860,4861,4862,4863,4864,4865,4866,4867,4868,4869,4870,4871,4872,4873,4874],"features":["T1"],"kind":"mesh","vertexCount":659,"indexCount":3942,"positionOffset":1550208,"normalOffset":1558116,"indexOffset":1566024,"error_m":0.0011190876830369234},{"type":"wood","sourceBlockIds":[4875],"features":["T1"],"kind":"box","position_m":[3.3325,1.8275,-6.3425],"size_m":0.215},{"type":"leaf","sourceBlockIds":[4876,4877,4878,4879,4880,4881,4882,4883,4884,4885,4886,4887,4888,4889,4890,4891,4892,4893,4894,4895,4896,4897,4898,4899,4900,4901,4902,4903,4904,4905,4906,4907,4908,4909,4910,4911,4912,4913,4914,4915,4916,4917,4918,4919,4920,4921,4922,4923,4924,4925,4926,4927,4928,4929,4930,4931,4932,4933,4934,4935,4936,4937,4938,4939,4940,4941,4942,4943,4944,4945,4946,4947,4948,4949,4950,4951,4952,4953,4954,4955,4956,4957,4958,4959,4960,4961,4962,4963,4964,4965,4966,4967,4968,4969,4970,4971,4972,4973,4974,4975,4976,4977,4978,4979,4980,4981,4982,4983,4984,4985,4986,4987,4988,4989,4990,4991,4992,4993,4994,4995,4996,4997,4998,4999,5000,5001,5002,5003,5004,5005,5006,5007,5008,5009,5010,5011,5012,5013,5014,5015,5016,5017,5018,5019,5020,5021,5022,5023,5024,5025,5026,5027,5028,5029,5030,5031,5032,5033,5034,5035,5036,5037,5038,5039,5040,5041,5042,5043,5044,5045,5046,5047,5048,5049,5050,5051,5052,5053,5054,5055,5056,5057,5058,5059,5060,5061,5062,5063,5064,5065,5066,5067,5068,5069,5070,5071,5072,5073,5074,5075,5076,5077,5078,5079,5080,5081,5082,5083,5084,5085],"features":["T1"],"kind":"mesh","vertexCount":2241,"indexCount":13434,"positionOffset":1581792,"normalOffset":1608684,"indexOffset":1635576,"error_m":0.0027282556984573603},{"type":"wood","sourceBlockIds":[5086,5087,5088,5089,5090,5091,5092,5093,5094,5095,5096,5097,5098,5099,5100,5101,5102,5103,5104,5105,5106,5107,5108,5109,5110,5111,5112,5113,5114,5115,5116,5117,5118,5119,5120],"features":["T2"],"kind":"mesh","vertexCount":559,"indexCount":3342,"positionOffset":1689312,"normalOffset":1696020,"indexOffset":1702728,"error_m":0.0013165709096938372},{"type":"wood","sourceBlockIds":[5121],"features":["T2"],"kind":"box","position_m":[5.0525,2.2575,-11.5025],"size_m":0.215},{"type":"leaf","sourceBlockIds":[5122,5123,5124,5125,5126,5127,5128,5129,5130,5131,5132,5133,5134,5135,5136,5137,5138,5139,5140,5141,5142,5143,5144,5145,5146,5147,5148,5149,5150,5151,5152,5153,5154,5155,5156,5157,5158,5159,5160,5161,5162,5163,5164,5165,5166,5167,5168,5169,5170,5171,5172,5173,5174,5175,5176,5177,5178,5179,5180,5181,5182,5183,5184,5185,5186,5187,5188,5189,5190,5191,5192,5193,5194,5195,5196,5197,5198,5199,5200,5201,5202,5203,5204,5205,5206,5207,5208,5209,5210,5211,5212,5213,5215,5216,5217,5219,5220,5221,5222,5223,5224,5225,5226,5227,5228,5229,5230,5231,5232,5233,5234,5235,5236,5237,5238,5239],"features":["T2"],"kind":"mesh","vertexCount":1523,"indexCount":9150,"positionOffset":1716096,"normalOffset":1734372,"indexOffset":1752648,"error_m":0.0023597220424562693},{"type":"leaf","sourceBlockIds":[5214,5218],"features":["T2"],"kind":"mesh","vertexCount":62,"indexCount":360,"positionOffset":1789248,"normalOffset":1789992,"indexOffset":1790736,"error_m":0.003427577205002308},{"type":"wood","sourceBlockIds":[5240,5241,5242,5243,5244,5245,5246,5247,5248,5249,5250,5251,5252,5253,5254,5255,5256,5257,5258,5259,5260,5261,5262,5263,5264,5265,5266,5267,5268,5269,5270,5271,5272,5273,5274,5275,5276,5277,5278,5279,5280,5281,5282,5283,5284,5285,5286],"features":["T3"],"kind":"mesh","vertexCount":710,"indexCount":4248,"positionOffset":1792176,"normalOffset":1800696,"indexOffset":1809216,"error_m":0.0010784044861793518},{"type":"wood","sourceBlockIds":[5287],"features":["T3"],"kind":"box","position_m":[10.6425,3.3325,-11.9325],"size_m":0.215},{"type":"leaf","sourceBlockIds":[5288,5289,5290,5291,5292,5293,5294,5295,5296,5297,5298,5299,5300,5301,5302,5303,5304,5305,5306,5307,5308,5309,5310,5311,5312,5313,5314,5315,5316,5317,5318,5319,5320,5321,5322,5323,5324,5325,5326,5327,5328,5329,5330,5331,5332,5333,5334,5335,5336,5337,5338,5339,5340,5341,5342,5343,5344,5345,5346,5347,5348,5349,5350,5351,5352,5353,5354,5355,5356,5357,5358,5359,5360,5361,5362,5363,5364,5365,5366,5367,5368,5369,5370,5371,5372,5373,5374,5375,5376,5377,5378,5379,5380,5381,5382,5383,5384,5385,5386,5387,5388,5389,5390,5391,5392,5393,5394,5395,5396,5397,5398,5399,5400,5401,5402,5403,5404,5405,5406,5407,5408,5409,5410,5411,5412,5413,5414,5415,5416,5417,5418,5419,5420,5421,5422,5423,5424,5425,5426,5427,5428,5429,5430,5431,5432,5433,5434,5435,5436,5437,5438,5439,5440,5441,5442,5443,5444,5445,5446,5447,5448,5449,5450,5451,5452,5453,5454,5455,5456,5457,5458,5459,5460,5461,5462,5463,5464,5465,5466,5467,5468,5469,5470,5471,5472,5473,5474,5475,5476,5477,5478,5479,5480,5481,5482,5483,5484,5485,5486,5487,5488,5489,5490,5491,5492,5493,5494,5495,5496,5497],"features":["T3"],"kind":"mesh","vertexCount":2241,"indexCount":13434,"positionOffset":1826208,"normalOffset":1853100,"indexOffset":1879992,"error_m":0.002737396862357855},{"type":"wood","sourceBlockIds":[5498,5499,5500,5501,5502,5503,5504,5505,5506,5507,5508,5509,5510,5511,5512,5513,5514,5515,5516,5517,5518,5519,5520,5521,5522,5523,5524,5525,5526,5527,5528,5529,5530,5531,5532],"features":["T4"],"kind":"mesh","vertexCount":559,"indexCount":3342,"positionOffset":1933728,"normalOffset":1940436,"indexOffset":1947144,"error_m":0.0012929604854434729},{"type":"wood","sourceBlockIds":[5533],"features":["T4"],"kind":"box","position_m":[13.2225,1.8275,-10.2125],"size_m":0.215},{"type":"leaf","sourceBlockIds":[5534,5535,5536,5537,5538,5539,5540,5541,5542,5543,5544,5545,5546,5547,5548,5549,5550,5551,5552,5553,5554,5555,5556,5557,5558,5559,5560,5561,5562,5563,5564,5565,5566,5567,5568,5569,5570,5571,5572,5573,5574,5575,5576,5577,5578,5579,5580,5581,5582,5583,5584,5585,5586,5587,5588,5589,5590,5591,5592,5593,5594,5595,5596,5597,5598,5599,5600,5601,5602,5603,5604,5605,5606,5607,5608,5609,5610,5611,5612,5613,5614,5615,5616,5617,5618,5620,5621,5622,5624,5625,5626,5627,5628,5629,5630,5631,5632,5633,5634,5635,5636],"features":["T4"],"kind":"mesh","vertexCount":1351,"indexCount":8118,"positionOffset":1960512,"normalOffset":1976724,"indexOffset":1992936,"error_m":0.0016384529881179333},{"type":"leaf","sourceBlockIds":[5619,5623],"features":["T4"],"kind":"mesh","vertexCount":62,"indexCount":360,"positionOffset":2025408,"normalOffset":2026152,"indexOffset":2026896,"error_m":0.0031890859827399254},{"type":"leaf","sourceBlockIds":[5637,5638],"features":["T4"],"kind":"mesh","vertexCount":62,"indexCount":360,"positionOffset":2028336,"normalOffset":2029080,"indexOffset":2029824,"error_m":0.003421070519834757},{"type":"wood","sourceBlockIds":[5639,5640,5641,5642,5643,5644,5645,5646,5647,5648,5649,5650,5651,5652,5653,5654,5655,5656,5657,5658,5659,5660,5661,5662,5663,5664,5665,5666,5667,5668,5669,5670,5671,5672,5673,5674,5675,5676,5677],"features":["T5"],"kind":"mesh","vertexCount":609,"indexCount":3642,"positionOffset":2031264,"normalOffset":2038572,"indexOffset":2045880,"error_m":0.00121754826977849},{"type":"wood","sourceBlockIds":[5678],"features":["T5"],"kind":"box","position_m":[13.6525,1.6125,-6.3425],"size_m":0.215},{"type":"leaf","sourceBlockIds":[5679,5680,5681,5682,5683,5684,5685,5686,5687,5688,5689,5690,5691,5692,5693,5694,5695,5696,5697,5698,5699,5700,5701,5702,5703,5704,5705,5706,5707,5708,5709,5710,5711,5712,5713,5714,5715,5716,5717,5718,5719,5720,5721,5722,5723,5724,5725,5726,5727,5728,5729,5730,5731,5732,5733,5734,5735,5736,5737,5738,5739,5740,5741,5742,5743,5744,5745,5746,5747,5748,5749,5750,5751,5752,5753,5754,5755,5756,5757,5758,5759,5760,5761,5762,5763,5764,5765,5766,5767,5768,5769,5770,5771,5772,5773,5774,5775,5776,5777,5778,5779,5780,5781,5782,5783,5784,5785,5786,5787,5788,5789,5790,5791,5792,5793,5794,5795,5796,5797,5798,5799,5800,5801,5802,5803,5804,5805,5806,5807,5808,5809,5810,5811,5812,5813,5814,5815,5816,5817,5818,5819,5820,5821,5822,5823,5824,5825,5826,5827,5828,5829,5830,5831,5832,5833,5834,5835,5836,5837,5838,5839,5840,5841,5842,5843,5844,5845,5846,5847,5848,5849,5850,5851,5852,5853],"features":["T5"],"kind":"mesh","vertexCount":1892,"indexCount":11352,"positionOffset":2060448,"normalOffset":2083152,"indexOffset":2105856,"error_m":0.00127118406817317},{"type":"rock","sourceBlockIds":[5854,5855,5856,5857,5858,5859,5860],"features":["R1"],"kind":"mesh","vertexCount":162,"indexCount":960,"positionOffset":2151264,"normalOffset":2153208,"indexOffset":2155152,"error_m":0.0013338609132915735},{"type":"rock","sourceBlockIds":[5861,5862,5863,5864,5865,5866,5867],"features":["R2"],"kind":"mesh","vertexCount":162,"indexCount":960,"positionOffset":2158992,"normalOffset":2160936,"indexOffset":2162880,"error_m":0.001258233329281211},{"type":"rock","sourceBlockIds":[5868,5869,5870,5871,5872,5873,5874],"features":["R3"],"kind":"mesh","vertexCount":162,"indexCount":960,"positionOffset":2166720,"normalOffset":2168664,"indexOffset":2170608,"error_m":0.0013355235569179058},{"type":"rock","sourceBlockIds":[5875,5876,5877,5878,5879,5880,5881],"features":["R4"],"kind":"mesh","vertexCount":162,"indexCount":960,"positionOffset":2174448,"normalOffset":2176392,"indexOffset":2178336,"error_m":0.0012601538328453898},{"type":"rock","sourceBlockIds":[5882,5883,5884,5885,5886,5887,5888],"features":["R5"],"kind":"mesh","vertexCount":162,"indexCount":960,"positionOffset":2182176,"normalOffset":2184120,"indexOffset":2186064,"error_m":0.0012797400122508407},{"type":"shrub","sourceBlockIds":[5889,5890,5891,5892,5893],"features":["S1"],"kind":"mesh","vertexCount":123,"indexCount":726,"positionOffset":2189904,"normalOffset":2191380,"indexOffset":2192856,"error_m":0.003343257587403059},{"type":"flowerGold","sourceBlockIds":[5894],"features":["S1"],"kind":"box","position_m":[2.31125,0.48375,-5.32125],"size_m":0.1075},{"type":"flowerPink","sourceBlockIds":[5895],"features":["S1"],"kind":"box","position_m":[2.52625,0.26875,-5.42875],"size_m":0.1075},{"type":"flowerGold","sourceBlockIds":[5896],"features":["S1"],"kind":"box","position_m":[2.20375,0.26875,-5.53625],"size_m":0.1075},{"type":"flowerPink","sourceBlockIds":[5897],"features":["S1"],"kind":"box","position_m":[2.41875,0.26875,-5.21375],"size_m":0.1075},{"type":"shrub","sourceBlockIds":[5898,5899,5900,5901,5902],"features":["S2"],"kind":"mesh","vertexCount":123,"indexCount":726,"positionOffset":2195760,"normalOffset":2197236,"indexOffset":2198712,"error_m":0.003447169903665781},{"type":"flowerGold","sourceBlockIds":[5903],"features":["S2"],"kind":"box","position_m":[7.4712499999999995,1.34375,-11.77125],"size_m":0.1075},{"type":"flowerPink","sourceBlockIds":[5904],"features":["S2"],"kind":"box","position_m":[7.68625,1.12875,-11.87875],"size_m":0.1075},{"type":"flowerGold","sourceBlockIds":[5905],"features":["S2"],"kind":"box","position_m":[7.36375,1.12875,-11.98625],"size_m":0.1075},{"type":"flowerPink","sourceBlockIds":[5906],"features":["S2"],"kind":"box","position_m":[7.57875,1.12875,-11.66375],"size_m":0.1075},{"type":"shrub","sourceBlockIds":[5907,5908,5909,5910,5911],"features":["S3"],"kind":"mesh","vertexCount":123,"indexCount":726,"positionOffset":2201616,"normalOffset":2203092,"indexOffset":2204568,"error_m":0.0031808395870029926},{"type":"flowerGold","sourceBlockIds":[5912],"features":["S3"],"kind":"box","position_m":[12.63125,0.48375,-4.89125],"size_m":0.1075},{"type":"flowerPink","sourceBlockIds":[5913],"features":["S3"],"kind":"box","position_m":[12.84625,0.26875,-4.99875],"size_m":0.1075},{"type":"flowerGold","sourceBlockIds":[5914],"features":["S3"],"kind":"box","position_m":[12.52375,0.26875,-5.10625],"size_m":0.1075},{"type":"flowerPink","sourceBlockIds":[5915],"features":["S3"],"kind":"box","position_m":[12.73875,0.26875,-4.7837499999999995],"size_m":0.1075},{"type":"shrub","sourceBlockIds":[5916,5917,5918,5919,5920],"features":["S4"],"kind":"mesh","vertexCount":123,"indexCount":726,"positionOffset":2207472,"normalOffset":2208948,"indexOffset":2210424,"error_m":0.003372772363945842},{"type":"flowerGold","sourceBlockIds":[5921],"features":["S4"],"kind":"box","position_m":[9.62125,0.48375,-2.31125],"size_m":0.1075},{"type":"flowerPink","sourceBlockIds":[5922],"features":["S4"],"kind":"box","position_m":[9.83625,0.26875,-2.41875],"size_m":0.1075},{"type":"flowerGold","sourceBlockIds":[5923],"features":["S4"],"kind":"box","position_m":[9.51375,0.26875,-2.52625],"size_m":0.1075},{"type":"flowerPink","sourceBlockIds":[5924],"features":["S4"],"kind":"box","position_m":[9.72875,0.26875,-2.20375],"size_m":0.1075},{"type":"stem","sourceBlockIds":[5925],"features":["flowers"],"kind":"box","position_m":[3.60125,0.05375,-3.17125],"size_m":0.1075},{"type":"flowerWhite","sourceBlockIds":[5926,5927,5928,5929,5930],"features":["flowers"],"kind":"mesh","vertexCount":135,"indexCount":798,"positionOffset":2213328,"normalOffset":2214948,"indexOffset":2216568,"error_m":0.0020717366132885218},{"type":"stem","sourceBlockIds":[5931],"features":["flowers"],"kind":"box","position_m":[4.46125,0.05375,-2.74125],"size_m":0.1075},{"type":"flowerWhite","sourceBlockIds":[5932,5933,5934,5935,5936],"features":["flowers"],"kind":"mesh","vertexCount":135,"indexCount":798,"positionOffset":2219760,"normalOffset":2221380,"indexOffset":2223000,"error_m":0.002084749983623624},{"type":"stem","sourceBlockIds":[5937],"features":["flowers"],"kind":"box","position_m":[5.75125,0.05375,-2.31125],"size_m":0.1075},{"type":"flowerWhite","sourceBlockIds":[5938,5939,5940,5941,5942],"features":["flowers"],"kind":"mesh","vertexCount":135,"indexCount":798,"positionOffset":2226192,"normalOffset":2227812,"indexOffset":2229432,"error_m":0.0020091081969439983},{"type":"stem","sourceBlockIds":[5943],"features":["flowers"],"kind":"box","position_m":[11.77125,0.05375,-3.17125],"size_m":0.1075},{"type":"flowerWhite","sourceBlockIds":[5944,5945,5946,5947,5948],"features":["flowers"],"kind":"mesh","vertexCount":135,"indexCount":798,"positionOffset":2232624,"normalOffset":2234244,"indexOffset":2235864,"error_m":0.0020660890731960535},{"type":"stem","sourceBlockIds":[5949],"features":["flowers"],"kind":"box","position_m":[13.06125,0.05375,-8.33125],"size_m":0.1075},{"type":"flowerWhite","sourceBlockIds":[5950,5951,5952,5953,5954],"features":["flowers"],"kind":"mesh","vertexCount":135,"indexCount":798,"positionOffset":2239056,"normalOffset":2240676,"indexOffset":2242296,"error_m":0.002006394090130925},{"type":"stem","sourceBlockIds":[5955],"features":["flowers"],"kind":"box","position_m":[3.17125,0.05375,-9.62125],"size_m":0.1075},{"type":"flowerWhite","sourceBlockIds":[5956,5957,5958,5959,5960],"features":["flowers"],"kind":"mesh","vertexCount":135,"indexCount":798,"positionOffset":2245488,"normalOffset":2247108,"indexOffset":2248728,"error_m":0.001934445695951581},{"type":"cloud","sourceBlockIds":[5961,5962,5963,5964,5965,5966,5967,5968,5969,5970,5971,5972,5973,5974,5975,5976,5977,5978,5979,5980,5981,5982,5983,5984,5985,5986,5987,5988,5989,5990,5991,5992,5993,5994,5995,5996,5997,5998,5999,6000,6001,6002,6003,6004,6005,6006,6007,6008,6009,6010,6011,6012,6013,6014,6015,6016,6017,6018,6019,6020,6021,6022,6023,6024,6025,6026,6027,6028,6029,6030,6031,6032,6033,6034,6035,6036,6037,6038,6039,6040,6041,6042,6043,6044,6045,6046,6047,6048,6049,6050,6051,6052,6053,6054,6055,6056,6057,6058,6059,6060,6061,6062,6063,6064,6065,6066,6067,6068,6069,6070,6071,6072,6073,6074,6075,6076,6077,6078,6079,6080,6081,6082,6083,6084,6085,6086,6087,6088,6089,6090,6091,6092,6093,6094,6095,6096,6097,6098,6099,6100,6101,6102,6103,6104,6105,6106,6107,6108,6109,6110,6111,6112,6113,6114,6115,6116,6117,6118,6119,6120,6121,6122,6123,6124,6125,6126,6127,6128,6129,6130,6131,6132,6133,6134,6135,6136,6137,6138,6139,6140,6141,6142,6143,6144,6145,6146,6147,6148,6149,6150,6151,6152,6153,6154,6155,6156,6157,6158],"features":["C1"],"kind":"mesh","vertexCount":1889,"indexCount":11322,"positionOffset":2251920,"normalOffset":2274588,"indexOffset":2297256,"error_m":0.0013985981931909919},{"type":"cloud","sourceBlockIds":[6159,6160,6161,6162,6163,6164,6165,6166,6167,6168,6169,6170,6171,6172,6173,6174,6175,6176,6177,6178,6179,6180,6181,6182,6183,6184,6185,6186,6187,6188,6189,6190,6191,6192,6193,6194,6195,6196,6197,6198,6199,6200,6201,6202,6203,6204,6205,6206,6207,6208,6209,6210,6211,6212,6213,6214,6215,6216,6217,6218,6219,6220,6221,6222,6223,6224,6225,6226,6227,6228,6229,6230,6231,6232,6233,6234,6235,6236,6237,6238,6239,6240,6241,6242,6243,6244,6245,6246,6247,6248,6249,6250,6251,6252,6253,6254,6255,6256,6257,6258,6259,6260,6261,6262,6263,6264,6265,6266,6267,6268,6269,6270,6271,6272,6273,6274,6275,6276,6277,6278,6279,6280,6281,6282,6283,6284,6285,6286,6287,6288,6289,6290,6291,6292,6293,6294,6295,6296,6297,6298,6299,6300,6301,6302,6303,6304,6305,6306,6307,6308,6309,6310,6311,6312,6313,6314,6315,6316,6317,6318,6319,6320,6321,6322,6323,6324,6325,6326,6327,6328,6329,6330,6331,6332,6333,6334,6335,6336,6337,6338,6339,6340,6341,6342,6343,6344,6345,6346,6347,6348,6349,6350,6351,6352,6353,6354,6355,6356],"features":["C2"],"kind":"mesh","vertexCount":1889,"indexCount":11322,"positionOffset":2342544,"normalOffset":2365212,"indexOffset":2387880,"error_m":0.0013922409852966666},{"type":"cloud","sourceBlockIds":[6357,6358,6359,6360,6361,6362,6363,6364,6365,6366,6367,6368,6369,6370,6371,6372,6373,6374,6375,6376,6377,6378,6379,6380,6381,6382,6383,6384,6385,6386,6387,6388,6389,6390,6391,6392,6393,6394,6395,6396,6397,6398,6399,6400,6401,6402,6403,6404,6405,6406,6407,6408,6409,6410,6411,6412,6413,6414,6415,6416,6417,6418,6419,6420,6421,6422,6423,6424,6425,6426,6427,6428,6429,6430,6431,6432,6433,6434,6435,6436,6437,6438,6439,6440,6441,6442,6443,6444,6445,6446,6447,6448,6449,6450,6451,6452,6453,6454,6455,6456,6457,6458,6459,6460,6461,6462,6463,6464,6465,6466,6467,6468,6469,6470,6471,6472,6473,6474,6475,6476,6477,6478,6479,6480,6481,6482,6483,6484,6485,6486,6487,6488,6489,6490,6491,6492,6493,6494,6495,6496,6497,6498,6499,6500,6501,6502,6503,6504,6505,6506,6507,6508,6509,6510,6511,6512,6513,6514,6515,6516,6517,6518,6519,6520,6521,6522,6523,6524,6525,6526,6527,6528,6529,6530,6531,6532,6533,6534,6535,6536,6537,6538,6539,6540,6541,6542,6543,6544,6545,6546,6547,6548,6549,6550,6551,6552,6553,6554],"features":["C3"],"kind":"mesh","vertexCount":1889,"indexCount":11322,"positionOffset":2433168,"normalOffset":2455836,"indexOffset":2478504,"error_m":0.0007044943631626666}]'),Yu=74,Zu=4205352,ju=105082,Ku=2523792,Ju=6555,$u=!1,Qu={components:Yu,rawTriangles:Zu,triangles:ju,binaryBytes:Ku,sourceBlocks:Ju,track:$u},eh=""+new URL("surfaces-DLg3072J.bin",import.meta.url).href;/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ks="180",jn={ROTATE:0,DOLLY:1,PAN:2},Zn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},il=0,Za=1,rl=2,ho=1,sl=2,Qt=3,vn=0,St=1,qt=2,gn=0,Kn=1,ja=2,Ka=3,Ja=4,al=5,Rn=100,ol=101,cl=102,ll=103,ul=104,hl=200,fl=201,dl=202,pl=203,Zr=204,jr=205,ml=206,_l=207,gl=208,xl=209,yl=210,vl=211,Ml=212,bl=213,Sl=214,Kr=0,Jr=1,$r=2,$n=3,Qr=4,es=5,ts=6,ns=7,Gs=0,El=1,Tl=2,xn=0,wl=1,Al=2,Cl=3,Rl=4,Pl=5,Dl=6,fo=7,po=300,Qn=301,ei=302,is=303,rs=304,ur=306,ss=1e3,Pn=1001,as=1002,Nt=1003,Ll=1004,Zi=1005,tn=1006,Wr=1007,Dn=1008,sn=1009,mo=1010,_o=1011,bi=1012,Vs=1013,Ln=1014,nn=1015,Di=1016,Hs=1017,Ws=1018,Si=1020,go=35902,xo=35899,yo=1021,vo=1022,Zt=1023,Ei=1026,Ti=1027,Xs=1028,qs=1029,Mo=1030,Ys=1031,Zs=1033,Ji=33776,$i=33777,Qi=33778,er=33779,os=35840,cs=35841,ls=35842,us=35843,hs=36196,fs=37492,ds=37496,ps=37808,ms=37809,_s=37810,gs=37811,xs=37812,ys=37813,vs=37814,Ms=37815,bs=37816,Ss=37817,Es=37818,Ts=37819,ws=37820,As=37821,Cs=36492,Rs=36494,Ps=36495,Ds=36283,Ls=36284,Is=36285,Us=36286,Il=3200,Ul=3201,js=0,Nl=1,_n="",Lt="srgb",ti="srgb-linear",rr="linear",it="srgb",Xn=7680,$a=519,Ol=512,Fl=513,Bl=514,bo=515,zl=516,kl=517,Gl=518,Vl=519,Qa=35044,eo="300 es",rn=2e3,sr=2001;class Nn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Mt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Xr=Math.PI/180,to=180/Math.PI;function Li(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Mt[i&255]+Mt[i>>8&255]+Mt[i>>16&255]+Mt[i>>24&255]+"-"+Mt[e&255]+Mt[e>>8&255]+"-"+Mt[e>>16&15|64]+Mt[e>>24&255]+"-"+Mt[t&63|128]+Mt[t>>8&255]+"-"+Mt[t>>16&255]+Mt[t>>24&255]+Mt[n&255]+Mt[n>>8&255]+Mt[n>>16&255]+Mt[n>>24&255]).toLowerCase()}function Ye(i,e,t){return Math.max(e,Math.min(t,i))}function th(i,e){return(i%e+e)%e}function ha(i,e,t){return(1-t)*i+t*e}function Bi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Rt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Hl={DEG2RAD:Xr};class he{constructor(e=0,t=0){he.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ye(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class In{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3];const f=s[a+0],d=s[a+1],_=s[a+2],g=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=d,e[t+2]=_,e[t+3]=g;return}if(h!==g||l!==f||c!==d||u!==_){let m=1-o;const p=l*f+c*d+u*_+h*g,T=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const I=Math.sqrt(S),A=Math.atan2(I,p*T);m=Math.sin(m*A)/I,o=Math.sin(o*A)/I}const M=o*T;if(l=l*m+f*M,c=c*m+d*M,u=u*m+_*M,h=h*m+g*M,m===1-o){const I=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=I,c*=I,u*=I,h*=I}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[a],f=s[a+1],d=s[a+2],_=s[a+3];return e[t]=o*_+u*h+l*d-c*f,e[t+1]=l*_+u*f+c*h-o*d,e[t+2]=c*_+u*d+o*f-l*h,e[t+3]=u*_-o*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),h=o(s/2),f=l(n/2),d=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=f*u*h+c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h-f*d*_;break;case"YXZ":this._x=f*u*h+c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h+f*d*_;break;case"ZXY":this._x=f*u*h-c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h-f*d*_;break;case"ZYX":this._x=f*u*h-c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h+f*d*_;break;case"YZX":this._x=f*u*h+c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h-f*d*_;break;case"XZY":this._x=f*u*h-c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h+f*d*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=n+o+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(n>o&&n>h){const d=2*Math.sqrt(1+n-o-h);this._w=(u-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>h){const d=2*Math.sqrt(1+o-n-h);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-n-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-t;return this._w=d*a+t*this._w,this._x=d*n+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ko.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ko.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),h=2*(s*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return fa.copy(this).projectOnVector(e),this.sub(fa)}reflect(e){return this.sub(fa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ye(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const fa=new R,Ko=new In;class We{constructor(e,t,n,r,s,a,o,l,c){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],_=n[8],g=r[0],m=r[3],p=r[6],T=r[1],S=r[4],M=r[7],I=r[2],A=r[5],L=r[8];return s[0]=a*g+o*T+l*I,s[3]=a*m+o*S+l*A,s[6]=a*p+o*M+l*L,s[1]=c*g+u*T+h*I,s[4]=c*m+u*S+h*A,s[7]=c*p+u*M+h*L,s[2]=f*g+d*T+_*I,s[5]=f*m+d*S+_*A,s[8]=f*p+d*M+_*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,f=o*l-u*s,d=c*s-a*l,_=t*h+n*f+r*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=h*g,e[1]=(r*c-u*n)*g,e[2]=(o*n-r*a)*g,e[3]=f*g,e[4]=(u*t-r*l)*g,e[5]=(r*s-o*t)*g,e[6]=d*g,e[7]=(n*l-c*t)*g,e[8]=(a*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(da.makeScale(e,t)),this}rotate(e){return this.premultiply(da.makeRotation(-e)),this}translate(e,t){return this.premultiply(da.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const da=new We;function Wl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ns(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Xl(){const i=Ns("canvas");return i.style.display="block",i}const Jo={};function ar(i){i in Jo||(Jo[i]=!0,console.warn(i))}function nh(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const $o=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qo=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ih(){const i={enabled:!0,workingColorSpace:ti,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===it&&(r.r=yn(r.r),r.g=yn(r.g),r.b=yn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===it&&(r.r=Mi(r.r),r.g=Mi(r.g),r.b=Mi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===_n?rr:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ar("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ar("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ti]:{primaries:e,whitePoint:n,transfer:rr,toXYZ:$o,fromXYZ:Qo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Lt},outputColorSpaceConfig:{drawingBufferColorSpace:Lt}},[Lt]:{primaries:e,whitePoint:n,transfer:it,toXYZ:$o,fromXYZ:Qo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Lt}}}),i}const Qe=ih();function yn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Mi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let si;class ql{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{si===void 0&&(si=Ns("canvas")),si.width=e.width,si.height=e.height;const r=si.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=si}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ns("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=yn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(yn(t[n]/255)*255):t[n]=yn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let rh=0;class Ks{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rh++}),this.uuid=Li(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(pa(r[a].image)):s.push(pa(r[a]))}else s=pa(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function pa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ql.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let sh=0;const ma=new R;class vt extends Nn{constructor(e=vt.DEFAULT_IMAGE,t=vt.DEFAULT_MAPPING,n=Pn,r=Pn,s=tn,a=Dn,o=Zt,l=sn,c=vt.DEFAULT_ANISOTROPY,u=_n){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sh++}),this.uuid=Li(),this.name="",this.source=new Ks(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ma).x}get height(){return this.source.getSize(ma).y}get depth(){return this.source.getSize(ma).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==po)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ss:e.x=e.x-Math.floor(e.x);break;case Pn:e.x=e.x<0?0:1;break;case as:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ss:e.y=e.y-Math.floor(e.y);break;case Pn:e.y=e.y<0?0:1;break;case as:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}vt.DEFAULT_IMAGE=null;vt.DEFAULT_MAPPING=po;vt.DEFAULT_ANISOTROPY=1;class rt{constructor(e=0,t=0,n=0,r=1){rt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,M=(d+1)/2,I=(p+1)/2,A=(u+f)/4,L=(h+g)/4,N=(_+m)/4;return S>M&&S>I?S<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(S),r=A/n,s=L/n):M>I?M<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),n=A/r,s=N/r):I<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(I),n=L/s,r=N/s),this.set(n,r,s,t),this}let T=Math.sqrt((m-_)*(m-_)+(h-g)*(h-g)+(f-u)*(f-u));return Math.abs(T)<.001&&(T=1),this.x=(m-_)/T,this.y=(h-g)/T,this.z=(f-u)/T,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Yl extends Nn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t);const r={width:e,height:t,depth:n.depth},s=new vt(r);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:tn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Ks(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Un extends Yl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class So extends vt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=Pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zl extends vt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=Pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bn{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Kt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Kt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Kt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Kt):Kt.fromBufferAttribute(s,a),Kt.applyMatrix4(e.matrixWorld),this.expandByPoint(Kt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),mr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),mr.copy(n.boundingBox)),mr.applyMatrix4(e.matrixWorld),this.union(mr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kt),Kt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zi),_r.subVectors(this.max,zi),ai.subVectors(e.a,zi),oi.subVectors(e.b,zi),ci.subVectors(e.c,zi),Sn.subVectors(oi,ai),En.subVectors(ci,oi),zn.subVectors(ai,ci);let t=[0,-Sn.z,Sn.y,0,-En.z,En.y,0,-zn.z,zn.y,Sn.z,0,-Sn.x,En.z,0,-En.x,zn.z,0,-zn.x,-Sn.y,Sn.x,0,-En.y,En.x,0,-zn.y,zn.x,0];return!_a(t,ai,oi,ci,_r)||(t=[1,0,0,0,1,0,0,0,1],!_a(t,ai,oi,ci,_r))?!1:(gr.crossVectors(Sn,En),t=[gr.x,gr.y,gr.z],_a(t,ai,oi,ci,_r))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(un),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const un=[new R,new R,new R,new R,new R,new R,new R,new R],Kt=new R,mr=new bn,ai=new R,oi=new R,ci=new R,Sn=new R,En=new R,zn=new R,zi=new R,_r=new R,gr=new R,kn=new R;function _a(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){kn.fromArray(i,s);const o=r.x*Math.abs(kn.x)+r.y*Math.abs(kn.y)+r.z*Math.abs(kn.z),l=e.dot(kn),c=t.dot(kn),u=n.dot(kn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const ah=new bn,ki=new R,ga=new R;class ii{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):ah.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ki.subVectors(e,this.center);const t=ki.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(ki,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ga.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ki.copy(e.center).add(ga)),this.expandByPoint(ki.copy(e.center).sub(ga))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const hn=new R,xa=new R,xr=new R,Tn=new R,ya=new R,yr=new R,va=new R;class hr{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=hn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hn.copy(this.origin).addScaledVector(this.direction,t),hn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){xa.copy(e).add(t).multiplyScalar(.5),xr.copy(t).sub(e).normalize(),Tn.copy(this.origin).sub(xa);const s=e.distanceTo(t)*.5,a=-this.direction.dot(xr),o=Tn.dot(this.direction),l=-Tn.dot(xr),c=Tn.lengthSq(),u=Math.abs(1-a*a);let h,f,d,_;if(u>0)if(h=a*l-o,f=a*o-l,_=s*u,h>=0)if(f>=-_)if(f<=_){const g=1/u;h*=g,f*=g,d=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;else f<=-_?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c):f<=_?(h=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(xa).addScaledVector(xr,f),d}intersectSphere(e,t){hn.subVectors(e.center,this.origin);const n=hn.dot(this.direction),r=hn.dot(hn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,hn)!==null}intersectTriangle(e,t,n,r,s){ya.subVectors(t,e),yr.subVectors(n,e),va.crossVectors(ya,yr);let a=this.direction.dot(va),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Tn.subVectors(this.origin,e);const l=o*this.direction.dot(yr.crossVectors(Tn,yr));if(l<0)return null;const c=o*this.direction.dot(ya.cross(Tn));if(c<0||l+c>a)return null;const u=-o*Tn.dot(va);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class nt{constructor(e,t,n,r,s,a,o,l,c,u,h,f,d,_,g,m){nt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,h,f,d,_,g,m)}set(e,t,n,r,s,a,o,l,c,u,h,f,d,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/li.setFromMatrixColumn(e,0).length(),s=1/li.setFromMatrixColumn(e,1).length(),a=1/li.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=a*u,d=a*h,_=o*u,g=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+_*c,t[5]=f-g*c,t[9]=-o*l,t[2]=g-f*c,t[6]=_+d*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,_=c*u,g=c*h;t[0]=f+g*o,t[4]=_*o-d,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=d*o-_,t[6]=g+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,_=c*u,g=c*h;t[0]=f-g*o,t[4]=-a*h,t[8]=_+d*o,t[1]=d+_*o,t[5]=a*u,t[9]=g-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,d=a*h,_=o*u,g=o*h;t[0]=l*u,t[4]=_*c-d,t[8]=f*c+g,t[1]=l*h,t[5]=g*c+f,t[9]=d*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,d=a*c,_=o*l,g=o*c;t[0]=l*u,t[4]=g-f*h,t[8]=_*h+d,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=d*h+_,t[10]=f-g*h}else if(e.order==="XZY"){const f=a*l,d=a*c,_=o*l,g=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+g,t[5]=a*u,t[9]=d*h-_,t[2]=_*h-d,t[6]=o*u,t[10]=g*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(oh,e,ch)}lookAt(e,t,n){const r=this.elements;return zt.subVectors(e,t),zt.lengthSq()===0&&(zt.z=1),zt.normalize(),wn.crossVectors(n,zt),wn.lengthSq()===0&&(Math.abs(n.z)===1?zt.x+=1e-4:zt.z+=1e-4,zt.normalize(),wn.crossVectors(n,zt)),wn.normalize(),vr.crossVectors(zt,wn),r[0]=wn.x,r[4]=vr.x,r[8]=zt.x,r[1]=wn.y,r[5]=vr.y,r[9]=zt.y,r[2]=wn.z,r[6]=vr.z,r[10]=zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],_=n[2],g=n[6],m=n[10],p=n[14],T=n[3],S=n[7],M=n[11],I=n[15],A=r[0],L=r[4],N=r[8],x=r[12],y=r[1],w=r[5],U=r[9],O=r[13],z=r[2],H=r[6],k=r[10],K=r[14],X=r[3],V=r[7],ee=r[11],ae=r[15];return s[0]=a*A+o*y+l*z+c*X,s[4]=a*L+o*w+l*H+c*V,s[8]=a*N+o*U+l*k+c*ee,s[12]=a*x+o*O+l*K+c*ae,s[1]=u*A+h*y+f*z+d*X,s[5]=u*L+h*w+f*H+d*V,s[9]=u*N+h*U+f*k+d*ee,s[13]=u*x+h*O+f*K+d*ae,s[2]=_*A+g*y+m*z+p*X,s[6]=_*L+g*w+m*H+p*V,s[10]=_*N+g*U+m*k+p*ee,s[14]=_*x+g*O+m*K+p*ae,s[3]=T*A+S*y+M*z+I*X,s[7]=T*L+S*w+M*H+I*V,s[11]=T*N+S*U+M*k+I*ee,s[15]=T*x+S*O+M*K+I*ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+s*l*h-r*c*h-s*o*f+n*c*f+r*o*d-n*l*d)+g*(+t*l*d-t*c*f+s*a*f-r*a*d+r*c*u-s*l*u)+m*(+t*c*h-t*o*d-s*a*h+n*a*d+s*o*u-n*c*u)+p*(-r*o*u-t*l*h+t*o*f+r*a*h-n*a*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],_=e[12],g=e[13],m=e[14],p=e[15],T=h*m*c-g*f*c+g*l*d-o*m*d-h*l*p+o*f*p,S=_*f*c-u*m*c-_*l*d+a*m*d+u*l*p-a*f*p,M=u*g*c-_*h*c+_*o*d-a*g*d-u*o*p+a*h*p,I=_*h*l-u*g*l-_*o*f+a*g*f+u*o*m-a*h*m,A=t*T+n*S+r*M+s*I;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/A;return e[0]=T*L,e[1]=(g*f*s-h*m*s-g*r*d+n*m*d+h*r*p-n*f*p)*L,e[2]=(o*m*s-g*l*s+g*r*c-n*m*c-o*r*p+n*l*p)*L,e[3]=(h*l*s-o*f*s-h*r*c+n*f*c+o*r*d-n*l*d)*L,e[4]=S*L,e[5]=(u*m*s-_*f*s+_*r*d-t*m*d-u*r*p+t*f*p)*L,e[6]=(_*l*s-a*m*s-_*r*c+t*m*c+a*r*p-t*l*p)*L,e[7]=(a*f*s-u*l*s+u*r*c-t*f*c-a*r*d+t*l*d)*L,e[8]=M*L,e[9]=(_*h*s-u*g*s-_*n*d+t*g*d+u*n*p-t*h*p)*L,e[10]=(a*g*s-_*o*s+_*n*c-t*g*c-a*n*p+t*o*p)*L,e[11]=(u*o*s-a*h*s-u*n*c+t*h*c+a*n*d-t*o*d)*L,e[12]=I*L,e[13]=(u*g*r-_*h*r+_*n*f-t*g*f-u*n*m+t*h*m)*L,e[14]=(_*o*r-a*g*r-_*n*l+t*g*l+a*n*m-t*o*m)*L,e[15]=(a*h*r-u*o*r+u*n*l-t*h*l-a*n*f+t*o*f)*L,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,f=s*c,d=s*u,_=s*h,g=a*u,m=a*h,p=o*h,T=l*c,S=l*u,M=l*h,I=n.x,A=n.y,L=n.z;return r[0]=(1-(g+p))*I,r[1]=(d+M)*I,r[2]=(_-S)*I,r[3]=0,r[4]=(d-M)*A,r[5]=(1-(f+p))*A,r[6]=(m+T)*A,r[7]=0,r[8]=(_+S)*L,r[9]=(m-T)*L,r[10]=(1-(f+g))*L,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=li.set(r[0],r[1],r[2]).length();const a=li.set(r[4],r[5],r[6]).length(),o=li.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Jt.copy(this);const c=1/s,u=1/a,h=1/o;return Jt.elements[0]*=c,Jt.elements[1]*=c,Jt.elements[2]*=c,Jt.elements[4]*=u,Jt.elements[5]*=u,Jt.elements[6]*=u,Jt.elements[8]*=h,Jt.elements[9]*=h,Jt.elements[10]*=h,t.setFromRotationMatrix(Jt),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=rn,l=!1){const c=this.elements,u=2*s/(t-e),h=2*s/(n-r),f=(t+e)/(t-e),d=(n+r)/(n-r);let _,g;if(l)_=s/(a-s),g=a*s/(a-s);else if(o===rn)_=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===sr)_=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=rn,l=!1){const c=this.elements,u=2/(t-e),h=2/(n-r),f=-(t+e)/(t-e),d=-(n+r)/(n-r);let _,g;if(l)_=1/(a-s),g=a/(a-s);else if(o===rn)_=-2/(a-s),g=-(a+s)/(a-s);else if(o===sr)_=-1/(a-s),g=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const li=new R,Jt=new nt,oh=new R(0,0,0),ch=new R(1,1,1),wn=new R,vr=new R,zt=new R,ec=new nt,tc=new In;class jt{constructor(e=0,t=0,n=0,r=jt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ye(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ec.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ec,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return tc.setFromEuler(this),this.setFromQuaternion(tc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}jt.DEFAULT_ORDER="XYZ";class Js{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let lh=0;const nc=new R,ui=new In,fn=new nt,Mr=new R,Gi=new R,uh=new R,hh=new In,ic=new R(1,0,0),rc=new R(0,1,0),sc=new R(0,0,1),ac={type:"added"},fh={type:"removed"},hi={type:"childadded",child:null},Ma={type:"childremoved",child:null};class pt extends Nn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:lh++}),this.uuid=Li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new R,t=new jt,n=new In,r=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new nt},normalMatrix:{value:new We}}),this.matrix=new nt,this.matrixWorld=new nt,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Js,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ui.setFromAxisAngle(e,t),this.quaternion.multiply(ui),this}rotateOnWorldAxis(e,t){return ui.setFromAxisAngle(e,t),this.quaternion.premultiply(ui),this}rotateX(e){return this.rotateOnAxis(ic,e)}rotateY(e){return this.rotateOnAxis(rc,e)}rotateZ(e){return this.rotateOnAxis(sc,e)}translateOnAxis(e,t){return nc.copy(e).applyQuaternion(this.quaternion),this.position.add(nc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ic,e)}translateY(e){return this.translateOnAxis(rc,e)}translateZ(e){return this.translateOnAxis(sc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Mr.copy(e):Mr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Gi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fn.lookAt(Gi,Mr,this.up):fn.lookAt(Mr,Gi,this.up),this.quaternion.setFromRotationMatrix(fn),r&&(fn.extractRotation(r.matrixWorld),ui.setFromRotationMatrix(fn),this.quaternion.premultiply(ui.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ac),hi.child=e,this.dispatchEvent(hi),hi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(fh),Ma.child=e,this.dispatchEvent(Ma),Ma.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fn.multiply(e.parent.matrixWorld)),e.applyMatrix4(fn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ac),hi.child=e,this.dispatchEvent(hi),hi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gi,e,uh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gi,hh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),d=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),_.length>0&&(n.nodes=_)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}pt.DEFAULT_UP=new R(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const $t=new R,dn=new R,ba=new R,pn=new R,fi=new R,di=new R,oc=new R,Sa=new R,Ea=new R,Ta=new R,wa=new rt,Aa=new rt,Ca=new rt;class Yt{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),$t.subVectors(e,t),r.cross($t);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){$t.subVectors(r,t),dn.subVectors(n,t),ba.subVectors(e,t);const a=$t.dot($t),o=$t.dot(dn),l=$t.dot(ba),c=dn.dot(dn),u=dn.dot(ba),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(c*l-o*u)*f,_=(a*u-o*l)*f;return s.set(1-d-_,_,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,pn)===null?!1:pn.x>=0&&pn.y>=0&&pn.x+pn.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,pn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,pn.x),l.addScaledVector(a,pn.y),l.addScaledVector(o,pn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return wa.setScalar(0),Aa.setScalar(0),Ca.setScalar(0),wa.fromBufferAttribute(e,t),Aa.fromBufferAttribute(e,n),Ca.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(wa,s.x),a.addScaledVector(Aa,s.y),a.addScaledVector(Ca,s.z),a}static isFrontFacing(e,t,n,r){return $t.subVectors(n,t),dn.subVectors(e,t),$t.cross(dn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $t.subVectors(this.c,this.b),dn.subVectors(this.a,this.b),$t.cross(dn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Yt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Yt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return Yt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Yt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Yt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;fi.subVectors(r,n),di.subVectors(s,n),Sa.subVectors(e,n);const l=fi.dot(Sa),c=di.dot(Sa);if(l<=0&&c<=0)return t.copy(n);Ea.subVectors(e,r);const u=fi.dot(Ea),h=di.dot(Ea);if(u>=0&&h<=u)return t.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(fi,a);Ta.subVectors(e,s);const d=fi.dot(Ta),_=di.dot(Ta);if(_>=0&&d<=_)return t.copy(s);const g=d*c-l*_;if(g<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(n).addScaledVector(di,o);const m=u*_-d*h;if(m<=0&&h-u>=0&&d-_>=0)return oc.subVectors(s,r),o=(h-u)/(h-u+(d-_)),t.copy(r).addScaledVector(oc,o);const p=1/(m+g+f);return a=g*p,o=f*p,t.copy(n).addScaledVector(fi,a).addScaledVector(di,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const jl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},An={h:0,s:0,l:0},br={h:0,s:0,l:0};function Ra(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Lt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qe.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Qe.workingColorSpace){if(e=th(e,1),t=Ye(t,0,1),n=Ye(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Ra(a,s,e+1/3),this.g=Ra(a,s,e),this.b=Ra(a,s,e-1/3)}return Qe.colorSpaceToWorking(this,r),this}setStyle(e,t=Lt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Lt){const n=jl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yn(e.r),this.g=yn(e.g),this.b=yn(e.b),this}copyLinearToSRGB(e){return this.r=Mi(e.r),this.g=Mi(e.g),this.b=Mi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Lt){return Qe.workingToColorSpace(bt.copy(this),e),Math.round(Ye(bt.r*255,0,255))*65536+Math.round(Ye(bt.g*255,0,255))*256+Math.round(Ye(bt.b*255,0,255))}getHexString(e=Lt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(bt.copy(this),t);const n=bt.r,r=bt.g,s=bt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(bt.copy(this),t),e.r=bt.r,e.g=bt.g,e.b=bt.b,e}getStyle(e=Lt){Qe.workingToColorSpace(bt.copy(this),e);const t=bt.r,n=bt.g,r=bt.b;return e!==Lt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(An),this.setHSL(An.h+e,An.s+t,An.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(An),e.getHSL(br);const n=ha(An.h,br.h,t),r=ha(An.s,br.s,t),s=ha(An.l,br.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const bt=new Ze;Ze.NAMES=jl;let dh=0;class On extends Nn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:dh++}),this.uuid=Li(),this.name="",this.type="Material",this.blending=Kn,this.side=vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zr,this.blendDst=jr,this.blendEquation=Rn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ze(0,0,0),this.blendAlpha=0,this.depthFunc=$n,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$a,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xn,this.stencilZFail=Xn,this.stencilZPass=Xn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Kn&&(n.blending=this.blending),this.side!==vn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Zr&&(n.blendSrc=this.blendSrc),this.blendDst!==jr&&(n.blendDst=this.blendDst),this.blendEquation!==Rn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==$n&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$a&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Xn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Xn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class wi extends On{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jt,this.combine=Gs,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mt=new R,Sr=new he;let ph=0;class Et{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ph++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Qa,this.updateRanges=[],this.gpuType=nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Sr.fromBufferAttribute(this,t),Sr.applyMatrix3(e),this.setXY(t,Sr.x,Sr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Bi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Rt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Bi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Bi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Bi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Bi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),r=Rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),r=Rt(r,this.array),s=Rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Qa&&(e.usage=this.usage),e}}class Eo extends Et{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class To extends Et{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class je extends Et{constructor(e,t,n){super(new Float32Array(e),t,n)}}let mh=0;const Wt=new nt,Pa=new pt,pi=new R,kt=new bn,Vi=new bn,yt=new R;class lt extends Nn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:mh++}),this.uuid=Li(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wl(e)?To:Eo)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new We().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Wt.makeRotationFromQuaternion(e),this.applyMatrix4(Wt),this}rotateX(e){return Wt.makeRotationX(e),this.applyMatrix4(Wt),this}rotateY(e){return Wt.makeRotationY(e),this.applyMatrix4(Wt),this}rotateZ(e){return Wt.makeRotationZ(e),this.applyMatrix4(Wt),this}translate(e,t,n){return Wt.makeTranslation(e,t,n),this.applyMatrix4(Wt),this}scale(e,t,n){return Wt.makeScale(e,t,n),this.applyMatrix4(Wt),this}lookAt(e){return Pa.lookAt(e),Pa.updateMatrix(),this.applyMatrix4(Pa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pi).negate(),this.translate(pi.x,pi.y,pi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new je(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];kt.setFromBufferAttribute(s),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,kt.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,kt.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint(kt.min),this.boundingBox.expandByPoint(kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ii);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(kt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Vi.setFromBufferAttribute(o),this.morphTargetsRelative?(yt.addVectors(kt.min,Vi.min),kt.expandByPoint(yt),yt.addVectors(kt.max,Vi.max),kt.expandByPoint(yt)):(kt.expandByPoint(Vi.min),kt.expandByPoint(Vi.max))}kt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)yt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(yt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)yt.fromBufferAttribute(o,c),l&&(pi.fromBufferAttribute(e,c),yt.add(pi)),r=Math.max(r,n.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Et(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let N=0;N<n.count;N++)o[N]=new R,l[N]=new R;const c=new R,u=new R,h=new R,f=new he,d=new he,_=new he,g=new R,m=new R;function p(N,x,y){c.fromBufferAttribute(n,N),u.fromBufferAttribute(n,x),h.fromBufferAttribute(n,y),f.fromBufferAttribute(s,N),d.fromBufferAttribute(s,x),_.fromBufferAttribute(s,y),u.sub(c),h.sub(c),d.sub(f),_.sub(f);const w=1/(d.x*_.y-_.x*d.y);isFinite(w)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(h,-d.y).multiplyScalar(w),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-_.x).multiplyScalar(w),o[N].add(g),o[x].add(g),o[y].add(g),l[N].add(m),l[x].add(m),l[y].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let N=0,x=T.length;N<x;++N){const y=T[N],w=y.start,U=y.count;for(let O=w,z=w+U;O<z;O+=3)p(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const S=new R,M=new R,I=new R,A=new R;function L(N){I.fromBufferAttribute(r,N),A.copy(I);const x=o[N];S.copy(x),S.sub(I.multiplyScalar(I.dot(x))).normalize(),M.crossVectors(A,x);const w=M.dot(l[N])<0?-1:1;a.setXYZW(N,S.x,S.y,S.z,w)}for(let N=0,x=T.length;N<x;++N){const y=T[N],w=y.start,U=y.count;for(let O=w,z=w+U;O<z;O+=3)L(e.getX(O+0)),L(e.getX(O+1)),L(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Et(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const r=new R,s=new R,a=new R,o=new R,l=new R,c=new R,u=new R,h=new R;if(e)for(let f=0,d=e.count;f<d;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,m),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)yt.fromBufferAttribute(e,t),yt.normalize(),e.setXYZ(t,yt.x,yt.y,yt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let d=0,_=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?d=l[g]*o.data.stride+o.offset:d=l[g]*u;for(let p=0;p<u;p++)f[_++]=c[d++]}return new Et(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new lt,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const cc=new nt,Gn=new hr,Er=new ii,lc=new R,Tr=new R,wr=new R,Ar=new R,Da=new R,Cr=new R,uc=new R,Rr=new R;class tt extends pt{constructor(e=new lt,t=new wi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Cr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(Da.fromBufferAttribute(h,e),a?Cr.addScaledVector(Da,u):Cr.addScaledVector(Da.sub(t),u))}t.add(Cr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Er.copy(n.boundingSphere),Er.applyMatrix4(s),Gn.copy(e.ray).recast(e.near),!(Er.containsPoint(Gn.origin)===!1&&(Gn.intersectSphere(Er,lc)===null||Gn.origin.distanceToSquared(lc)>(e.far-e.near)**2))&&(cc.copy(s).invert(),Gn.copy(e.ray).applyMatrix4(cc),!(n.boundingBox!==null&&Gn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Gn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=a[m.materialIndex],T=Math.max(m.start,d.start),S=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let M=T,I=S;M<I;M+=3){const A=o.getX(M),L=o.getX(M+1),N=o.getX(M+2);r=Pr(this,p,e,n,c,u,h,A,L,N),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,d.start),g=Math.min(o.count,d.start+d.count);for(let m=_,p=g;m<p;m+=3){const T=o.getX(m),S=o.getX(m+1),M=o.getX(m+2);r=Pr(this,a,e,n,c,u,h,T,S,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=a[m.materialIndex],T=Math.max(m.start,d.start),S=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let M=T,I=S;M<I;M+=3){const A=M,L=M+1,N=M+2;r=Pr(this,p,e,n,c,u,h,A,L,N),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,d.start),g=Math.min(l.count,d.start+d.count);for(let m=_,p=g;m<p;m+=3){const T=m,S=m+1,M=m+2;r=Pr(this,a,e,n,c,u,h,T,S,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function _h(i,e,t,n,r,s,a,o){let l;if(e.side===St?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===vn,o),l===null)return null;Rr.copy(o),Rr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Rr);return c<t.near||c>t.far?null:{distance:c,point:Rr.clone(),object:i}}function Pr(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Tr),i.getVertexPosition(l,wr),i.getVertexPosition(c,Ar);const u=_h(i,e,t,n,Tr,wr,Ar,uc);if(u){const h=new R;Yt.getBarycoord(uc,Tr,wr,Ar,h),r&&(u.uv=Yt.getInterpolatedAttribute(r,o,l,c,h,new he)),s&&(u.uv1=Yt.getInterpolatedAttribute(s,o,l,c,h,new he)),a&&(u.normal=Yt.getInterpolatedAttribute(a,o,l,c,h,new R),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new R,materialIndex:0};Yt.getNormal(Tr,wr,Ar,f.normal),u.face=f,u.barycoord=h}return u}class cn extends lt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let f=0,d=0;_("z","y","x",-1,-1,n,t,e,a,s,0),_("z","y","x",1,-1,n,t,-e,a,s,1),_("x","z","y",1,1,e,n,t,r,a,2),_("x","z","y",1,-1,e,n,-t,r,a,3),_("x","y","z",1,-1,e,t,n,r,s,4),_("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new je(c,3)),this.setAttribute("normal",new je(u,3)),this.setAttribute("uv",new je(h,2));function _(g,m,p,T,S,M,I,A,L,N,x){const y=M/L,w=I/N,U=M/2,O=I/2,z=A/2,H=L+1,k=N+1;let K=0,X=0;const V=new R;for(let ee=0;ee<k;ee++){const ae=ee*w-O;for(let ye=0;ye<H;ye++){const Ie=ye*y-U;V[g]=Ie*T,V[m]=ae*S,V[p]=z,c.push(V.x,V.y,V.z),V[g]=0,V[m]=0,V[p]=A>0?1:-1,u.push(V.x,V.y,V.z),h.push(ye/L),h.push(1-ee/N),K+=1}}for(let ee=0;ee<N;ee++)for(let ae=0;ae<L;ae++){const ye=f+ae+H*ee,Ie=f+ae+H*(ee+1),Ne=f+(ae+1)+H*(ee+1),Ue=f+(ae+1)+H*ee;l.push(ye,Ie,Ue),l.push(Ie,Ne,Ue),X+=6}o.addGroup(d,X,x),d+=X,f+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ai(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function wt(i){const e={};for(let t=0;t<i.length;t++){const n=Ai(i[t]);for(const r in n)e[r]=n[r]}return e}function gh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Kl(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const Jl={clone:Ai,merge:wt};var xh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mn extends On{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xh,this.fragmentShader=yh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ai(e.uniforms),this.uniformsGroups=gh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class wo extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nt,this.projectionMatrix=new nt,this.projectionMatrixInverse=new nt,this.coordinateSystem=rn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Cn=new R,hc=new he,fc=new he;class It extends wo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=to*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Xr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return to*2*Math.atan(Math.tan(Xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Cn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Cn.x,Cn.y).multiplyScalar(-e/Cn.z),Cn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Cn.x,Cn.y).multiplyScalar(-e/Cn.z)}getViewSize(e,t){return this.getViewBounds(e,hc,fc),t.subVectors(fc,hc)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Xr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const mi=-90,_i=1;class $l extends pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new It(mi,_i,e,t);r.layers=this.layers,this.add(r);const s=new It(mi,_i,e,t);s.layers=this.layers,this.add(s);const a=new It(mi,_i,e,t);a.layers=this.layers,this.add(a);const o=new It(mi,_i,e,t);o.layers=this.layers,this.add(o);const l=new It(mi,_i,e,t);l.layers=this.layers,this.add(l);const c=new It(mi,_i,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===rn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===sr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Ao extends vt{constructor(e=[],t=Qn,n,r,s,a,o,l,c,u){super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ql extends Un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ao(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new cn(5,5,5),s=new Mn({name:"CubemapFromEquirect",uniforms:Ai(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:St,blending:gn});s.uniforms.tEquirect.value=t;const a=new tt(r,s),o=t.minFilter;return t.minFilter===Dn&&(t.minFilter=tn),new $l(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}class Ut extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vh={type:"move"};class qr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ut,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ut,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ut,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,_=.005;c.inputState.pinching&&f>d+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vh)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ut;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Co extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new jt,this.environmentIntensity=1,this.environmentRotation=new jt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class eu extends vt{constructor(e=null,t=1,n=1,r,s,a,o,l,c=Nt,u=Nt,h,f){super(null,a,o,l,c,u,r,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class no extends Et{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const gi=new nt,dc=new nt,Dr=[],pc=new bn,Mh=new nt,Hi=new tt,Wi=new ii;class Ro extends tt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new no(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Mh)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new bn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,gi),pc.copy(e.boundingBox).applyMatrix4(gi),this.boundingBox.union(pc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ii),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,gi),Wi.copy(e.boundingSphere).applyMatrix4(gi),this.boundingSphere.union(Wi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(Hi.geometry=this.geometry,Hi.material=this.material,Hi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wi.copy(this.boundingSphere),Wi.applyMatrix4(n),e.ray.intersectsSphere(Wi)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,gi),dc.multiplyMatrices(n,gi),Hi.matrixWorld=dc,Hi.raycast(e,Dr);for(let a=0,o=Dr.length;a<o;a++){const l=Dr[a];l.instanceId=s,l.object=this,t.push(l)}Dr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new no(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new eu(new Float32Array(r*this.count),r,this.count,Xs,nn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const La=new R,bh=new R,Sh=new We;class mn{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=La.subVectors(n,t).cross(bh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(La),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Sh.getNormalMatrix(e),r=this.coplanarPoint(La).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Vn=new ii,Eh=new he(.5,.5),Lr=new R;class $s{constructor(e=new mn,t=new mn,n=new mn,r=new mn,s=new mn,a=new mn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=rn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],h=s[5],f=s[6],d=s[7],_=s[8],g=s[9],m=s[10],p=s[11],T=s[12],S=s[13],M=s[14],I=s[15];if(r[0].setComponents(c-a,d-u,p-_,I-T).normalize(),r[1].setComponents(c+a,d+u,p+_,I+T).normalize(),r[2].setComponents(c+o,d+h,p+g,I+S).normalize(),r[3].setComponents(c-o,d-h,p-g,I-S).normalize(),n)r[4].setComponents(l,f,m,M).normalize(),r[5].setComponents(c-l,d-f,p-m,I-M).normalize();else if(r[4].setComponents(c-l,d-f,p-m,I-M).normalize(),t===rn)r[5].setComponents(c+l,d+f,p+m,I+M).normalize();else if(t===sr)r[5].setComponents(l,f,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vn)}intersectsSprite(e){Vn.center.set(0,0,0);const t=Eh.distanceTo(e.center);return Vn.radius=.7071067811865476+t,Vn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Lr.x=r.normal.x>0?e.max.x:e.min.x,Lr.y=r.normal.y>0?e.max.y:e.min.y,Lr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Lr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Qs extends On{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Os=new R,Fs=new R,mc=new nt,Xi=new hr,Ir=new ii,Ia=new R,_c=new R;class Po extends pt{constructor(e=new lt,t=new Qs){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Os.fromBufferAttribute(t,r-1),Fs.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Os.distanceTo(Fs);e.setAttribute("lineDistance",new je(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ir.copy(n.boundingSphere),Ir.applyMatrix4(r),Ir.radius+=s,e.ray.intersectsSphere(Ir)===!1)return;mc.copy(r).invert(),Xi.copy(e.ray).applyMatrix4(mc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let g=d,m=_-1;g<m;g+=c){const p=u.getX(g),T=u.getX(g+1),S=Ur(this,e,Xi,l,p,T,g);S&&t.push(S)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(d),p=Ur(this,e,Xi,l,g,m,_-1);p&&t.push(p)}}else{const d=Math.max(0,a.start),_=Math.min(f.count,a.start+a.count);for(let g=d,m=_-1;g<m;g+=c){const p=Ur(this,e,Xi,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=Ur(this,e,Xi,l,_-1,d,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ur(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(Os.fromBufferAttribute(o,r),Fs.fromBufferAttribute(o,s),t.distanceSqToSegment(Os,Fs,Ia,_c)>n)return;Ia.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ia);if(!(c<e.near||c>e.far))return{distance:c,point:_c.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class Th extends vt{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Do extends vt{constructor(e,t,n=Ln,r,s,a,o=Nt,l=Nt,c,u=Ei,h=1){if(u!==Ei&&u!==Ti)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:h};super(f,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ks(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Lo extends vt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Io extends lt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new R,u=new he;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const d=n+h/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[f]/e+1)/2,u.y=(a[f+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new je(a,3)),this.setAttribute("normal",new je(o,3)),this.setAttribute("uv",new je(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Io(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ci extends lt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],d=[];let _=0;const g=[],m=n/2;let p=0;T(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new je(h,3)),this.setAttribute("normal",new je(f,3)),this.setAttribute("uv",new je(d,2));function T(){const M=new R,I=new R;let A=0;const L=(t-e)/n;for(let N=0;N<=s;N++){const x=[],y=N/s,w=y*(t-e)+e;for(let U=0;U<=r;U++){const O=U/r,z=O*l+o,H=Math.sin(z),k=Math.cos(z);I.x=w*H,I.y=-y*n+m,I.z=w*k,h.push(I.x,I.y,I.z),M.set(H,L,k).normalize(),f.push(M.x,M.y,M.z),d.push(O,1-y),x.push(_++)}g.push(x)}for(let N=0;N<r;N++)for(let x=0;x<s;x++){const y=g[x][N],w=g[x+1][N],U=g[x+1][N+1],O=g[x][N+1];(e>0||x!==0)&&(u.push(y,w,O),A+=3),(t>0||x!==s-1)&&(u.push(w,U,O),A+=3)}c.addGroup(p,A,0),p+=A}function S(M){const I=_,A=new he,L=new R;let N=0;const x=M===!0?e:t,y=M===!0?1:-1;for(let U=1;U<=r;U++)h.push(0,m*y,0),f.push(0,y,0),d.push(.5,.5),_++;const w=_;for(let U=0;U<=r;U++){const z=U/r*l+o,H=Math.cos(z),k=Math.sin(z);L.x=x*k,L.y=m*y,L.z=x*H,h.push(L.x,L.y,L.z),f.push(0,y,0),A.x=H*.5+.5,A.y=k*.5*y+.5,d.push(A.x,A.y),_++}for(let U=0;U<r;U++){const O=I+U,z=w+U;M===!0?u.push(z,z+1,O):u.push(z+1,z,O),N+=3}c.addGroup(p,N,M===!0?1:2),p+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ci(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ea extends Ci{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new ea(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class an{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let r=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);const u=n[r],f=n[r+1]-u,d=(a-u)/f;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new he:new R);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new R,r=[],s=[],a=[],o=new R,l=new nt;for(let d=0;d<=e;d++){const _=d/e;r[d]=this.getTangentAt(_,new R)}s[0]=new R,a[0]=new R;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(r[d-1],r[d]),o.length()>Number.EPSILON){o.normalize();const _=Math.acos(Ye(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(o,_))}a[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(Ye(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let _=1;_<=e;_++)s[_].applyMatrix4(l.makeRotationAxis(r[_],d*_)),a[_].crossVectors(r[_],s[_])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ta extends an{constructor(e=0,t=0,n=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new he){const n=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class tu extends ta{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Uo(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,h){let f=(a-s)/c-(o-s)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+h)+(l-o)/h;f*=u,d*=u,r(a,o,f,d)},calc:function(s){const a=s*s,o=a*s;return i+e*s+t*a+n*o}}}const Nr=new R,Ua=new Uo,Na=new Uo,Oa=new Uo;class nu extends an{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new R){const n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(Nr.subVectors(r[0],r[1]).add(r[0]),c=Nr);const h=r[o%s],f=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(Nr.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Nr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(h),d),g=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);g<1e-4&&(g=1),_<1e-4&&(_=g),m<1e-4&&(m=g),Ua.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,_,g,m),Na.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,_,g,m),Oa.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,_,g,m)}else this.curveType==="catmullrom"&&(Ua.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),Na.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),Oa.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return n.set(Ua.calc(l),Na.calc(l),Oa.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new R().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function gc(i,e,t,n,r){const s=(n-e)*.5,a=(r-t)*.5,o=i*i,l=i*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*i+t}function wh(i,e){const t=1-i;return t*t*e}function Ah(i,e){return 2*(1-i)*i*e}function Ch(i,e){return i*i*e}function tr(i,e,t,n){return wh(i,e)+Ah(i,t)+Ch(i,n)}function Rh(i,e){const t=1-i;return t*t*t*e}function Ph(i,e){const t=1-i;return 3*t*t*i*e}function Dh(i,e){return 3*(1-i)*i*i*e}function Lh(i,e){return i*i*i*e}function nr(i,e,t,n,r){return Rh(i,e)+Ph(i,t)+Dh(i,n)+Lh(i,r)}class No extends an{constructor(e=new he,t=new he,n=new he,r=new he){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new he){const n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(nr(e,r.x,s.x,a.x,o.x),nr(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class iu extends an{constructor(e=new R,t=new R,n=new R,r=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new R){const n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(nr(e,r.x,s.x,a.x,o.x),nr(e,r.y,s.y,a.y,o.y),nr(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Oo extends an{constructor(e=new he,t=new he){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new he){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new he){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ru extends an{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Fo extends an{constructor(e=new he,t=new he,n=new he){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new he){const n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(tr(e,r.x,s.x,a.x),tr(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class na extends an{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(tr(e,r.x,s.x,a.x),tr(e,r.y,s.y,a.y),tr(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Bo extends an{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new he){const n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],u=r[a>r.length-2?r.length-1:a+1],h=r[a>r.length-3?r.length-1:a+2];return n.set(gc(o,l.x,c.x,u.x,h.x),gc(o,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new he().fromArray(r))}return this}}var Bs=Object.freeze({__proto__:null,ArcCurve:tu,CatmullRomCurve3:nu,CubicBezierCurve:No,CubicBezierCurve3:iu,EllipseCurve:ta,LineCurve:Oo,LineCurve3:ru,QuadraticBezierCurve:Fo,QuadraticBezierCurve3:na,SplineCurve:Bo});class su extends an{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Bs[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(new Bs[r.type]().fromJSON(r))}return this}}class io extends su{constructor(e){super(),this.type="Path",this.currentPoint=new he,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Oo(this.currentPoint.clone(),new he(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){const s=new Fo(this.currentPoint.clone(),new he(e,t),new he(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){const o=new No(this.currentPoint.clone(),new he(e,t),new he(n,r),new he(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Bo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,r,s,a,o,l),this}absellipse(e,t,n,r,s,a,o,l){const c=new ta(e,t,n,r,s,a,o,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ia extends io{constructor(e){super(e),this.uuid=Li(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(new io().fromJSON(r))}return this}}function Ih(i,e,t=2){const n=e&&e.length,r=n?e[0]*t:i.length;let s=au(i,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=Bh(i,e,s,t)),i.length>80*t){o=1/0,l=1/0;let u=-1/0,h=-1/0;for(let f=t;f<r;f+=t){const d=i[f],_=i[f+1];d<o&&(o=d),_<l&&(l=_),d>u&&(u=d),_>h&&(h=_)}c=Math.max(u-o,h-l),c=c!==0?32767/c:0}return or(s,a,t,o,l,c,0),a}function au(i,e,t,n,r){let s;if(r===jh(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=xc(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=xc(a/n|0,i[a],i[a+1],s);return s&&Ri(s,s.next)&&(lr(s),s=s.next),s}function ni(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Ri(t,t.next)||ft(t.prev,t,t.next)===0)){if(lr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function or(i,e,t,n,r,s,a){if(!i)return;!a&&s&&Hh(i,n,r,s);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(s?Nh(i,n,r,s):Uh(i)){e.push(l.i,i.i,c.i),lr(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Oh(ni(i),e),or(i,e,t,n,r,s,2)):a===2&&Fh(i,e,t,n,r,s):or(ni(i),e,t,n,r,s,1);break}}}function Uh(i){const e=i.prev,t=i,n=i.next;if(ft(e,t,n)>=0)return!1;const r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=Math.min(r,s,a),h=Math.min(o,l,c),f=Math.max(r,s,a),d=Math.max(o,l,c);let _=n.next;for(;_!==e;){if(_.x>=u&&_.x<=f&&_.y>=h&&_.y<=d&&ji(r,o,s,l,a,c,_.x,_.y)&&ft(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function Nh(i,e,t,n){const r=i.prev,s=i,a=i.next;if(ft(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,u=r.y,h=s.y,f=a.y,d=Math.min(o,l,c),_=Math.min(u,h,f),g=Math.max(o,l,c),m=Math.max(u,h,f),p=ro(d,_,e,t,n),T=ro(g,m,e,t,n);let S=i.prevZ,M=i.nextZ;for(;S&&S.z>=p&&M&&M.z<=T;){if(S.x>=d&&S.x<=g&&S.y>=_&&S.y<=m&&S!==r&&S!==a&&ji(o,u,l,h,c,f,S.x,S.y)&&ft(S.prev,S,S.next)>=0||(S=S.prevZ,M.x>=d&&M.x<=g&&M.y>=_&&M.y<=m&&M!==r&&M!==a&&ji(o,u,l,h,c,f,M.x,M.y)&&ft(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;S&&S.z>=p;){if(S.x>=d&&S.x<=g&&S.y>=_&&S.y<=m&&S!==r&&S!==a&&ji(o,u,l,h,c,f,S.x,S.y)&&ft(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;M&&M.z<=T;){if(M.x>=d&&M.x<=g&&M.y>=_&&M.y<=m&&M!==r&&M!==a&&ji(o,u,l,h,c,f,M.x,M.y)&&ft(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Oh(i,e){let t=i;do{const n=t.prev,r=t.next.next;!Ri(n,r)&&cu(n,t,t.next,r)&&cr(n,r)&&cr(r,n)&&(e.push(n.i,t.i,r.i),lr(t),lr(t.next),t=i=r),t=t.next}while(t!==i);return ni(t)}function Fh(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&qh(a,o)){let l=lu(a,o);a=ni(a,a.next),l=ni(l,l.next),or(a,e,t,n,r,s,0),or(l,e,t,n,r,s,0);return}o=o.next}a=a.next}while(a!==i)}function Bh(i,e,t,n){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*n,l=s<a-1?e[s+1]*n:i.length,c=au(i,o,l,n,!1);c===c.next&&(c.steiner=!0),r.push(Xh(c))}r.sort(zh);for(let s=0;s<r.length;s++)t=kh(r[s],t);return t}function zh(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=n-r}return t}function kh(i,e){const t=Gh(i,e);if(!t)return e;const n=lu(t,i);return ni(n,n.next),ni(t,t.next)}function Gh(i,e){let t=e;const n=i.x,r=i.y;let s=-1/0,a;if(Ri(i,t))return t;do{if(Ri(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const h=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>s&&(s=h,a=t.x<t.next.x?t:t.next,h===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&ou(r<c?n:s,r,l,c,r<c?s:n,r,t.x,t.y)){const h=Math.abs(r-t.y)/(n-t.x);cr(t,i)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&Vh(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function Vh(i,e){return ft(i.prev,i,e.prev)<0&&ft(e.next,i,i.next)<0}function Hh(i,e,t,n){let r=i;do r.z===0&&(r.z=ro(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Wh(r)}function Wh(i){let e,t=1;do{let n=i,r;i=null;let s=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(r=n,n=n.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=a}s.nextZ=null,t*=2}while(e>1);return i}function ro(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Xh(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function ou(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function ji(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&ou(i,e,t,n,r,s,a,o)}function qh(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Yh(i,e)&&(cr(i,e)&&cr(e,i)&&Zh(i,e)&&(ft(i.prev,i,e.prev)||ft(i,e.prev,e))||Ri(i,e)&&ft(i.prev,i,i.next)>0&&ft(e.prev,e,e.next)>0)}function ft(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Ri(i,e){return i.x===e.x&&i.y===e.y}function cu(i,e,t,n){const r=Fr(ft(i,e,t)),s=Fr(ft(i,e,n)),a=Fr(ft(t,n,i)),o=Fr(ft(t,n,e));return!!(r!==s&&a!==o||r===0&&Or(i,t,e)||s===0&&Or(i,n,e)||a===0&&Or(t,i,n)||o===0&&Or(t,e,n))}function Or(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Fr(i){return i>0?1:i<0?-1:0}function Yh(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&cu(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function cr(i,e){return ft(i.prev,i,i.next)<0?ft(i,e,i.next)>=0&&ft(i,i.prev,e)>=0:ft(i,e,i.prev)<0||ft(i,i.next,e)<0}function Zh(i,e){let t=i,n=!1;const r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function lu(i,e){const t=so(i.i,i.x,i.y),n=so(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function xc(i,e,t,n){const r=so(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function lr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function so(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function jh(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}class Kh{static triangulate(e,t,n=2){return Ih(e,t,n)}}class on{static area(e){const t=e.length;let n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return on.area(e)<0}static triangulateShape(e,t){const n=[],r=[],s=[];yc(e),vc(n,e);let a=e.length;t.forEach(yc);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,vc(n,t[l]);const o=Kh.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function yc(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function vc(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class ra extends lt{constructor(e=new ia([new he(.5,.5),new he(-.5,.5),new he(-.5,-.5),new he(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new je(r,3)),this.setAttribute("uv",new je(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,_=t.bevelSize!==void 0?t.bevelSize:d-.1,g=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,T=t.UVGenerator!==void 0?t.UVGenerator:Jh;let S,M=!1,I,A,L,N;p&&(S=p.getSpacedPoints(u),M=!0,f=!1,I=p.computeFrenetFrames(u,!1),A=new R,L=new R,N=new R),f||(m=0,d=0,_=0,g=0);const x=o.extractPoints(c);let y=x.shape;const w=x.holes;if(!on.isClockWise(y)){y=y.reverse();for(let oe=0,ne=w.length;oe<ne;oe++){const te=w[oe];on.isClockWise(te)&&(w[oe]=te.reverse())}}function O(oe){const te=10000000000000001e-36;let P=oe[0];for(let W=1;W<=oe.length;W++){const Z=W%oe.length,re=oe[Z],_e=re.x-P.x,Se=re.y-P.y,E=_e*_e+Se*Se,v=Math.max(Math.abs(re.x),Math.abs(re.y),Math.abs(P.x),Math.abs(P.y)),F=te*v*v;if(E<=F){oe.splice(Z,1),W--;continue}P=re}}O(y),w.forEach(O);const z=w.length,H=y;for(let oe=0;oe<z;oe++){const ne=w[oe];y=y.concat(ne)}function k(oe,ne,te){return ne||console.error("THREE.ExtrudeGeometry: vec does not exist"),oe.clone().addScaledVector(ne,te)}const K=y.length;function X(oe,ne,te){let P,W,Z;const re=oe.x-ne.x,_e=oe.y-ne.y,Se=te.x-oe.x,E=te.y-oe.y,v=re*re+_e*_e,F=re*E-_e*Se;if(Math.abs(F)>Number.EPSILON){const q=Math.sqrt(v),ie=Math.sqrt(Se*Se+E*E),Y=ne.x-_e/q,Ce=ne.y+re/q,de=te.x-E/ie,Te=te.y+Se/ie,we=((de-Y)*E-(Te-Ce)*Se)/(re*E-_e*Se);P=Y+re*we-oe.x,W=Ce+_e*we-oe.y;const fe=P*P+W*W;if(fe<=2)return new he(P,W);Z=Math.sqrt(fe/2)}else{let q=!1;re>Number.EPSILON?Se>Number.EPSILON&&(q=!0):re<-Number.EPSILON?Se<-Number.EPSILON&&(q=!0):Math.sign(_e)===Math.sign(E)&&(q=!0),q?(P=-_e,W=re,Z=Math.sqrt(v)):(P=re,W=_e,Z=Math.sqrt(v/2))}return new he(P/Z,W/Z)}const V=[];for(let oe=0,ne=H.length,te=ne-1,P=oe+1;oe<ne;oe++,te++,P++)te===ne&&(te=0),P===ne&&(P=0),V[oe]=X(H[oe],H[te],H[P]);const ee=[];let ae,ye=V.concat();for(let oe=0,ne=z;oe<ne;oe++){const te=w[oe];ae=[];for(let P=0,W=te.length,Z=W-1,re=P+1;P<W;P++,Z++,re++)Z===W&&(Z=0),re===W&&(re=0),ae[P]=X(te[P],te[Z],te[re]);ee.push(ae),ye=ye.concat(ae)}let Ie;if(m===0)Ie=on.triangulateShape(H,w);else{const oe=[],ne=[];for(let te=0;te<m;te++){const P=te/m,W=d*Math.cos(P*Math.PI/2),Z=_*Math.sin(P*Math.PI/2)+g;for(let re=0,_e=H.length;re<_e;re++){const Se=k(H[re],V[re],Z);Pe(Se.x,Se.y,-W),P===0&&oe.push(Se)}for(let re=0,_e=z;re<_e;re++){const Se=w[re];ae=ee[re];const E=[];for(let v=0,F=Se.length;v<F;v++){const q=k(Se[v],ae[v],Z);Pe(q.x,q.y,-W),P===0&&E.push(q)}P===0&&ne.push(E)}}Ie=on.triangulateShape(oe,ne)}const Ne=Ie.length,Ue=_+g;for(let oe=0;oe<K;oe++){const ne=f?k(y[oe],ye[oe],Ue):y[oe];M?(L.copy(I.normals[0]).multiplyScalar(ne.x),A.copy(I.binormals[0]).multiplyScalar(ne.y),N.copy(S[0]).add(L).add(A),Pe(N.x,N.y,N.z)):Pe(ne.x,ne.y,0)}for(let oe=1;oe<=u;oe++)for(let ne=0;ne<K;ne++){const te=f?k(y[ne],ye[ne],Ue):y[ne];M?(L.copy(I.normals[oe]).multiplyScalar(te.x),A.copy(I.binormals[oe]).multiplyScalar(te.y),N.copy(S[oe]).add(L).add(A),Pe(N.x,N.y,N.z)):Pe(te.x,te.y,h/u*oe)}for(let oe=m-1;oe>=0;oe--){const ne=oe/m,te=d*Math.cos(ne*Math.PI/2),P=_*Math.sin(ne*Math.PI/2)+g;for(let W=0,Z=H.length;W<Z;W++){const re=k(H[W],V[W],P);Pe(re.x,re.y,h+te)}for(let W=0,Z=w.length;W<Z;W++){const re=w[W];ae=ee[W];for(let _e=0,Se=re.length;_e<Se;_e++){const E=k(re[_e],ae[_e],P);M?Pe(E.x,E.y+S[u-1].y,S[u-1].x+te):Pe(E.x,E.y,h+te)}}}$(),ce();function $(){const oe=r.length/3;if(f){let ne=0,te=K*ne;for(let P=0;P<Ne;P++){const W=Ie[P];be(W[2]+te,W[1]+te,W[0]+te)}ne=u+m*2,te=K*ne;for(let P=0;P<Ne;P++){const W=Ie[P];be(W[0]+te,W[1]+te,W[2]+te)}}else{for(let ne=0;ne<Ne;ne++){const te=Ie[ne];be(te[2],te[1],te[0])}for(let ne=0;ne<Ne;ne++){const te=Ie[ne];be(te[0]+K*u,te[1]+K*u,te[2]+K*u)}}n.addGroup(oe,r.length/3-oe,0)}function ce(){const oe=r.length/3;let ne=0;ge(H,ne),ne+=H.length;for(let te=0,P=w.length;te<P;te++){const W=w[te];ge(W,ne),ne+=W.length}n.addGroup(oe,r.length/3-oe,1)}function ge(oe,ne){let te=oe.length;for(;--te>=0;){const P=te;let W=te-1;W<0&&(W=oe.length-1);for(let Z=0,re=u+m*2;Z<re;Z++){const _e=K*Z,Se=K*(Z+1),E=ne+P+_e,v=ne+W+_e,F=ne+W+Se,q=ne+P+Se;qe(E,v,F,q)}}}function Pe(oe,ne,te){l.push(oe),l.push(ne),l.push(te)}function be(oe,ne,te){Ke(oe),Ke(ne),Ke(te);const P=r.length/3,W=T.generateTopUV(n,r,P-3,P-2,P-1);D(W[0]),D(W[1]),D(W[2])}function qe(oe,ne,te,P){Ke(oe),Ke(ne),Ke(P),Ke(ne),Ke(te),Ke(P);const W=r.length/3,Z=T.generateSideWallUV(n,r,W-6,W-3,W-2,W-1);D(Z[0]),D(Z[1]),D(Z[3]),D(Z[1]),D(Z[2]),D(Z[3])}function Ke(oe){r.push(l[oe*3+0]),r.push(l[oe*3+1]),r.push(l[oe*3+2])}function D(oe){s.push(oe.x),s.push(oe.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return $h(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];n.push(o)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Bs[r.type]().fromJSON(r)),new ra(n,e.options)}}const Jh={generateTopUV:function(i,e,t,n,r){const s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[r*3],u=e[r*3+1];return[new he(s,a),new he(o,l),new he(c,u)]},generateSideWallUV:function(i,e,t,n,r,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],f=e[r*3],d=e[r*3+1],_=e[r*3+2],g=e[s*3],m=e[s*3+1],p=e[s*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new he(a,1-l),new he(c,1-h),new he(f,1-_),new he(g,1-p)]:[new he(o,1-l),new he(u,1-h),new he(d,1-_),new he(m,1-p)]}};function $h(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){const s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Ii extends lt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,h=e/o,f=t/l,d=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const T=p*f-a;for(let S=0;S<c;S++){const M=S*h-s;_.push(M,-T,0),g.push(0,0,1),m.push(S/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<o;T++){const S=T+c*p,M=T+c*(p+1),I=T+1+c*(p+1),A=T+1+c*p;d.push(S,M,A),d.push(M,I,A)}this.setIndex(d),this.setAttribute("position",new je(_,3)),this.setAttribute("normal",new je(g,3)),this.setAttribute("uv",new je(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ii(e.width,e.height,e.widthSegments,e.heightSegments)}}class zo extends lt{constructor(e=new ia([new he(0,.5),new he(-.5,-.5),new he(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],r=[],s=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new je(r,3)),this.setAttribute("normal",new je(s,3)),this.setAttribute("uv",new je(a,2));function c(u){const h=r.length/3,f=u.extractPoints(t);let d=f.shape;const _=f.holes;on.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=_.length;m<p;m++){const T=_[m];on.isClockWise(T)===!0&&(_[m]=T.reverse())}const g=on.triangulateShape(d,_);for(let m=0,p=_.length;m<p;m++){const T=_[m];d=d.concat(T)}for(let m=0,p=d.length;m<p;m++){const T=d[m];r.push(T.x,T.y,0),s.push(0,0,1),a.push(T.x,T.y)}for(let m=0,p=g.length;m<p;m++){const T=g[m],S=T[0]+h,M=T[1]+h,I=T[2]+h;n.push(S,M,I),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Qh(t,e)}static fromJSON(e,t){const n=[];for(let r=0,s=e.shapes.length;r<s;r++){const a=t[e.shapes[r]];n.push(a)}return new zo(n,e.curveSegments)}}function Qh(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const r=i[t];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e}class ko extends lt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new R,f=new R,d=[],_=[],g=[],m=[];for(let p=0;p<=n;p++){const T=[],S=p/n;let M=0;p===0&&a===0?M=.5/t:p===n&&l===Math.PI&&(M=-.5/t);for(let I=0;I<=t;I++){const A=I/t;h.x=-e*Math.cos(r+A*s)*Math.sin(a+S*o),h.y=e*Math.cos(a+S*o),h.z=e*Math.sin(r+A*s)*Math.sin(a+S*o),_.push(h.x,h.y,h.z),f.copy(h).normalize(),g.push(f.x,f.y,f.z),m.push(A+M,1-S),T.push(c++)}u.push(T)}for(let p=0;p<n;p++)for(let T=0;T<t;T++){const S=u[p][T+1],M=u[p][T],I=u[p+1][T],A=u[p+1][T+1];(p!==0||a>0)&&d.push(S,M,A),(p!==n-1||l<Math.PI)&&d.push(M,I,A)}this.setIndex(d),this.setAttribute("position",new je(_,3)),this.setAttribute("normal",new je(g,3)),this.setAttribute("uv",new je(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ko(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class sa extends lt{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const a=[],o=[],l=[],c=[],u=new R,h=new R,f=new R;for(let d=0;d<=n;d++)for(let _=0;_<=r;_++){const g=_/r*s,m=d/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(g),h.y=(e+t*Math.cos(m))*Math.sin(g),h.z=t*Math.sin(m),o.push(h.x,h.y,h.z),u.x=e*Math.cos(g),u.y=e*Math.sin(g),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(_/r),c.push(d/n)}for(let d=1;d<=n;d++)for(let _=1;_<=r;_++){const g=(r+1)*d+_-1,m=(r+1)*(d-1)+_-1,p=(r+1)*(d-1)+_,T=(r+1)*d+_;a.push(g,m,T),a.push(m,p,T)}this.setIndex(a),this.setAttribute("position",new je(o,3)),this.setAttribute("normal",new je(l,3)),this.setAttribute("uv",new je(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sa(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class aa extends lt{constructor(e=new na(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};const a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new R,l=new R,c=new he;let u=new R;const h=[],f=[],d=[],_=[];g(),this.setIndex(_),this.setAttribute("position",new je(h,3)),this.setAttribute("normal",new je(f,3)),this.setAttribute("uv",new je(d,2));function g(){for(let S=0;S<t;S++)m(S);m(s===!1?t:0),T(),p()}function m(S){u=e.getPointAt(S/t,u);const M=a.normals[S],I=a.binormals[S];for(let A=0;A<=r;A++){const L=A/r*Math.PI*2,N=Math.sin(L),x=-Math.cos(L);l.x=x*M.x+N*I.x,l.y=x*M.y+N*I.y,l.z=x*M.z+N*I.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,h.push(o.x,o.y,o.z)}}function p(){for(let S=1;S<=t;S++)for(let M=1;M<=r;M++){const I=(r+1)*(S-1)+(M-1),A=(r+1)*S+(M-1),L=(r+1)*S+M,N=(r+1)*(S-1)+M;_.push(I,A,N),_.push(A,L,N)}}function T(){for(let S=0;S<=t;S++)for(let M=0;M<=r;M++)c.x=S/t,c.y=M/r,d.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new aa(new Bs[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Pi extends On{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=js,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ao extends Pi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new he(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ye(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Go extends On{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=js,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jt,this.combine=Gs,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class uu extends On{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Il,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class hu extends On{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class oa extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class fu extends oa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Fa=new nt,Mc=new R,bc=new R;class du{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.mapType=sn,this.map=null,this.mapPass=null,this.matrix=new nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $s,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Mc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Mc),bc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(bc),t.updateMatrixWorld(),Fa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fa,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Fa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Sc=new nt,qi=new R,Ba=new R;class ef extends du{constructor(){super(new It(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new he(4,2),this._viewportCount=6,this._viewports=[new rt(2,1,1,1),new rt(0,1,1,1),new rt(3,1,1,1),new rt(1,1,1,1),new rt(3,0,1,1),new rt(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),qi.setFromMatrixPosition(e.matrixWorld),n.position.copy(qi),Ba.copy(n.position),Ba.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ba),n.updateMatrixWorld(),r.makeTranslation(-qi.x,-qi.y,-qi.z),Sc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sc,n.coordinateSystem,n.reversedDepth)}}class pu extends oa{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new ef}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class ca extends wo{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class tf extends du{constructor(){super(new ca(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class oo extends oa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new tf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class mu extends It{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Ec=new nt;class nf{constructor(e,t,n=0,r=1/0){this.ray=new hr(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Js,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ec.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ec),this}intersectObject(e,t=!0,n=[]){return co(e,this,n,t),n.sort(Tc),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)co(e[r],this,n,t);return n.sort(Tc),n}}function Tc(i,e){return i.distance-e.distance}function co(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)co(s[a],e,t,!0)}}class lo{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ye(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ye(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const wc=new R;let Br,za;class rf extends pt{constructor(e=new R(0,0,1),t=new R(0,0,0),n=1,r=16776960,s=n*.2,a=s*.2){super(),this.type="ArrowHelper",Br===void 0&&(Br=new lt,Br.setAttribute("position",new je([0,0,0,0,1,0],3)),za=new ea(.5,1,5,1),za.translate(0,-.5,0)),this.position.copy(t),this.line=new Po(Br,new Qs({color:r,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new tt(za,new wi({color:r,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,s,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{wc.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(wc,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class _u extends Nn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Ac(i,e,t,n){const r=sf(n);switch(t){case yo:return i*e;case Xs:return i*e/r.components*r.byteLength;case qs:return i*e/r.components*r.byteLength;case Mo:return i*e*2/r.components*r.byteLength;case Ys:return i*e*2/r.components*r.byteLength;case vo:return i*e*3/r.components*r.byteLength;case Zt:return i*e*4/r.components*r.byteLength;case Zs:return i*e*4/r.components*r.byteLength;case Ji:case $i:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Qi:case er:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case cs:case us:return Math.max(i,16)*Math.max(e,8)/4;case os:case ls:return Math.max(i,8)*Math.max(e,8)/2;case hs:case fs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ds:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ps:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ms:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case _s:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case gs:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case xs:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ys:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case vs:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ms:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case bs:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ss:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Es:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ts:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ws:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case As:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Cs:case Rs:case Ps:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ds:case Ls:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Is:case Us:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function sf(i){switch(i){case sn:case mo:return{byteLength:1,components:1};case bi:case _o:case Di:return{byteLength:2,components:1};case Hs:case Ws:return{byteLength:2,components:4};case Ln:case Vs:case nn:return{byteLength:4,components:1};case go:case xo:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ks}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ks);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function gu(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function af(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((d,_)=>d.start-_.start);let f=0;for(let d=1;d<h.length;d++){const _=h[f],g=h[d];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,h[f]=g)}h.length=f+1;for(let d=0,_=h.length;d<_;d++){const g=h[d];i.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var of=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,lf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,uf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ff=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,df=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,pf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,_f=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,vf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Mf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,bf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Sf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ef=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Af=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Cf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Rf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Pf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Df=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Lf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,If=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Uf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Nf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Of=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ff="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,kf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Vf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Wf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Kf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$f=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Qf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ed=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,td=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,nd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,id=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,sd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ad=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,od=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,cd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ld=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ud=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,dd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,md=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,_d=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,yd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Md=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Sd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ed=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Td=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,wd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ad=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Rd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Pd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Dd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ld=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Id=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ud=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Nd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Od=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Fd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Hd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Wd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Xd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,qd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Zd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Kd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$d=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ep=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,tp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ip=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,sp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ap=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,op=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,up=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,dp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,pp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,mp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,_p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Mp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ep=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Tp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ap=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Cp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Dp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ip=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Up=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Np=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Op=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Bp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:of,alphahash_pars_fragment:cf,alphamap_fragment:lf,alphamap_pars_fragment:uf,alphatest_fragment:hf,alphatest_pars_fragment:ff,aomap_fragment:df,aomap_pars_fragment:pf,batching_pars_vertex:mf,batching_vertex:_f,begin_vertex:gf,beginnormal_vertex:xf,bsdfs:yf,iridescence_fragment:vf,bumpmap_pars_fragment:Mf,clipping_planes_fragment:bf,clipping_planes_pars_fragment:Sf,clipping_planes_pars_vertex:Ef,clipping_planes_vertex:Tf,color_fragment:wf,color_pars_fragment:Af,color_pars_vertex:Cf,color_vertex:Rf,common:Pf,cube_uv_reflection_fragment:Df,defaultnormal_vertex:Lf,displacementmap_pars_vertex:If,displacementmap_vertex:Uf,emissivemap_fragment:Nf,emissivemap_pars_fragment:Of,colorspace_fragment:Ff,colorspace_pars_fragment:Bf,envmap_fragment:zf,envmap_common_pars_fragment:kf,envmap_pars_fragment:Gf,envmap_pars_vertex:Vf,envmap_physical_pars_fragment:Qf,envmap_vertex:Hf,fog_vertex:Wf,fog_pars_vertex:Xf,fog_fragment:qf,fog_pars_fragment:Yf,gradientmap_pars_fragment:Zf,lightmap_pars_fragment:jf,lights_lambert_fragment:Kf,lights_lambert_pars_fragment:Jf,lights_pars_begin:$f,lights_toon_fragment:ed,lights_toon_pars_fragment:td,lights_phong_fragment:nd,lights_phong_pars_fragment:id,lights_physical_fragment:rd,lights_physical_pars_fragment:sd,lights_fragment_begin:ad,lights_fragment_maps:od,lights_fragment_end:cd,logdepthbuf_fragment:ld,logdepthbuf_pars_fragment:ud,logdepthbuf_pars_vertex:hd,logdepthbuf_vertex:fd,map_fragment:dd,map_pars_fragment:pd,map_particle_fragment:md,map_particle_pars_fragment:_d,metalnessmap_fragment:gd,metalnessmap_pars_fragment:xd,morphinstance_vertex:yd,morphcolor_vertex:vd,morphnormal_vertex:Md,morphtarget_pars_vertex:bd,morphtarget_vertex:Sd,normal_fragment_begin:Ed,normal_fragment_maps:Td,normal_pars_fragment:wd,normal_pars_vertex:Ad,normal_vertex:Cd,normalmap_pars_fragment:Rd,clearcoat_normal_fragment_begin:Pd,clearcoat_normal_fragment_maps:Dd,clearcoat_pars_fragment:Ld,iridescence_pars_fragment:Id,opaque_fragment:Ud,packing:Nd,premultiplied_alpha_fragment:Od,project_vertex:Fd,dithering_fragment:Bd,dithering_pars_fragment:zd,roughnessmap_fragment:kd,roughnessmap_pars_fragment:Gd,shadowmap_pars_fragment:Vd,shadowmap_pars_vertex:Hd,shadowmap_vertex:Wd,shadowmask_pars_fragment:Xd,skinbase_vertex:qd,skinning_pars_vertex:Yd,skinning_vertex:Zd,skinnormal_vertex:jd,specularmap_fragment:Kd,specularmap_pars_fragment:Jd,tonemapping_fragment:$d,tonemapping_pars_fragment:Qd,transmission_fragment:ep,transmission_pars_fragment:tp,uv_pars_fragment:np,uv_pars_vertex:ip,uv_vertex:rp,worldpos_vertex:sp,background_vert:ap,background_frag:op,backgroundCube_vert:cp,backgroundCube_frag:lp,cube_vert:up,cube_frag:hp,depth_vert:fp,depth_frag:dp,distanceRGBA_vert:pp,distanceRGBA_frag:mp,equirect_vert:_p,equirect_frag:gp,linedashed_vert:xp,linedashed_frag:yp,meshbasic_vert:vp,meshbasic_frag:Mp,meshlambert_vert:bp,meshlambert_frag:Sp,meshmatcap_vert:Ep,meshmatcap_frag:Tp,meshnormal_vert:wp,meshnormal_frag:Ap,meshphong_vert:Cp,meshphong_frag:Rp,meshphysical_vert:Pp,meshphysical_frag:Dp,meshtoon_vert:Lp,meshtoon_frag:Ip,points_vert:Up,points_frag:Np,shadow_vert:Op,shadow_frag:Fp,sprite_vert:Bp,sprite_frag:zp},xe={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},en={basic:{uniforms:wt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:wt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Ze(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:wt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:wt([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:wt([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new Ze(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:wt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:wt([xe.points,xe.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:wt([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:wt([xe.common,xe.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:wt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:wt([xe.sprite,xe.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:wt([xe.common,xe.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:wt([xe.lights,xe.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};en.physical={uniforms:wt([en.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const zr={r:0,b:0,g:0},Hn=new jt,kp=new nt;function Gp(i,e,t,n,r,s,a){const o=new Ze(0);let l=s===!0?0:1,c,u,h=null,f=0,d=null;function _(S){let M=S.isScene===!0?S.background:null;return M&&M.isTexture&&(M=(S.backgroundBlurriness>0?t:e).get(M)),M}function g(S){let M=!1;const I=_(S);I===null?p(o,l):I&&I.isColor&&(p(I,1),M=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(S,M){const I=_(M);I&&(I.isCubeTexture||I.mapping===ur)?(u===void 0&&(u=new tt(new cn(1,1,1),new Mn({name:"BackgroundCubeMaterial",uniforms:Ai(en.backgroundCube.uniforms),vertexShader:en.backgroundCube.vertexShader,fragmentShader:en.backgroundCube.fragmentShader,side:St,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,L,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Hn.copy(M.backgroundRotation),Hn.x*=-1,Hn.y*=-1,Hn.z*=-1,I.isCubeTexture&&I.isRenderTargetTexture===!1&&(Hn.y*=-1,Hn.z*=-1),u.material.uniforms.envMap.value=I,u.material.uniforms.flipEnvMap.value=I.isCubeTexture&&I.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(kp.makeRotationFromEuler(Hn)),u.material.toneMapped=Qe.getTransfer(I.colorSpace)!==it,(h!==I||f!==I.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,h=I,f=I.version,d=i.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):I&&I.isTexture&&(c===void 0&&(c=new tt(new Ii(2,2),new Mn({name:"BackgroundMaterial",uniforms:Ai(en.background.uniforms),vertexShader:en.background.vertexShader,fragmentShader:en.background.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=I,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(I.colorSpace)!==it,I.matrixAutoUpdate===!0&&I.updateMatrix(),c.material.uniforms.uvTransform.value.copy(I.matrix),(h!==I||f!==I.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=I,f=I.version,d=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,M){S.getRGB(zr,Kl(i)),n.buffers.color.setClear(zr.r,zr.g,zr.b,M,a)}function T(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,M=1){o.set(S),l=M,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(o,l)},render:g,addToRenderList:m,dispose:T}}function Vp(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,a=!1;function o(y,w,U,O,z){let H=!1;const k=h(O,U,w);s!==k&&(s=k,c(s.object)),H=d(y,O,U,z),H&&_(y,O,U,z),z!==null&&e.update(z,i.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,M(y,w,U,O),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function h(y,w,U){const O=U.wireframe===!0;let z=n[y.id];z===void 0&&(z={},n[y.id]=z);let H=z[w.id];H===void 0&&(H={},z[w.id]=H);let k=H[O];return k===void 0&&(k=f(l()),H[O]=k),k}function f(y){const w=[],U=[],O=[];for(let z=0;z<t;z++)w[z]=0,U[z]=0,O[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:U,attributeDivisors:O,object:y,attributes:{},index:null}}function d(y,w,U,O){const z=s.attributes,H=w.attributes;let k=0;const K=U.getAttributes();for(const X in K)if(K[X].location>=0){const ee=z[X];let ae=H[X];if(ae===void 0&&(X==="instanceMatrix"&&y.instanceMatrix&&(ae=y.instanceMatrix),X==="instanceColor"&&y.instanceColor&&(ae=y.instanceColor)),ee===void 0||ee.attribute!==ae||ae&&ee.data!==ae.data)return!0;k++}return s.attributesNum!==k||s.index!==O}function _(y,w,U,O){const z={},H=w.attributes;let k=0;const K=U.getAttributes();for(const X in K)if(K[X].location>=0){let ee=H[X];ee===void 0&&(X==="instanceMatrix"&&y.instanceMatrix&&(ee=y.instanceMatrix),X==="instanceColor"&&y.instanceColor&&(ee=y.instanceColor));const ae={};ae.attribute=ee,ee&&ee.data&&(ae.data=ee.data),z[X]=ae,k++}s.attributes=z,s.attributesNum=k,s.index=O}function g(){const y=s.newAttributes;for(let w=0,U=y.length;w<U;w++)y[w]=0}function m(y){p(y,0)}function p(y,w){const U=s.newAttributes,O=s.enabledAttributes,z=s.attributeDivisors;U[y]=1,O[y]===0&&(i.enableVertexAttribArray(y),O[y]=1),z[y]!==w&&(i.vertexAttribDivisor(y,w),z[y]=w)}function T(){const y=s.newAttributes,w=s.enabledAttributes;for(let U=0,O=w.length;U<O;U++)w[U]!==y[U]&&(i.disableVertexAttribArray(U),w[U]=0)}function S(y,w,U,O,z,H,k){k===!0?i.vertexAttribIPointer(y,w,U,z,H):i.vertexAttribPointer(y,w,U,O,z,H)}function M(y,w,U,O){g();const z=O.attributes,H=U.getAttributes(),k=w.defaultAttributeValues;for(const K in H){const X=H[K];if(X.location>=0){let V=z[K];if(V===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(V=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(V=y.instanceColor)),V!==void 0){const ee=V.normalized,ae=V.itemSize,ye=e.get(V);if(ye===void 0)continue;const Ie=ye.buffer,Ne=ye.type,Ue=ye.bytesPerElement,$=Ne===i.INT||Ne===i.UNSIGNED_INT||V.gpuType===Vs;if(V.isInterleavedBufferAttribute){const ce=V.data,ge=ce.stride,Pe=V.offset;if(ce.isInstancedInterleavedBuffer){for(let be=0;be<X.locationSize;be++)p(X.location+be,ce.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let be=0;be<X.locationSize;be++)m(X.location+be);i.bindBuffer(i.ARRAY_BUFFER,Ie);for(let be=0;be<X.locationSize;be++)S(X.location+be,ae/X.locationSize,Ne,ee,ge*Ue,(Pe+ae/X.locationSize*be)*Ue,$)}else{if(V.isInstancedBufferAttribute){for(let ce=0;ce<X.locationSize;ce++)p(X.location+ce,V.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let ce=0;ce<X.locationSize;ce++)m(X.location+ce);i.bindBuffer(i.ARRAY_BUFFER,Ie);for(let ce=0;ce<X.locationSize;ce++)S(X.location+ce,ae/X.locationSize,Ne,ee,ae*Ue,ae/X.locationSize*ce*Ue,$)}}else if(k!==void 0){const ee=k[K];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(X.location,ee);break;case 3:i.vertexAttrib3fv(X.location,ee);break;case 4:i.vertexAttrib4fv(X.location,ee);break;default:i.vertexAttrib1fv(X.location,ee)}}}}T()}function I(){N();for(const y in n){const w=n[y];for(const U in w){const O=w[U];for(const z in O)u(O[z].object),delete O[z];delete w[U]}delete n[y]}}function A(y){if(n[y.id]===void 0)return;const w=n[y.id];for(const U in w){const O=w[U];for(const z in O)u(O[z].object),delete O[z];delete w[U]}delete n[y.id]}function L(y){for(const w in n){const U=n[w];if(U[y.id]===void 0)continue;const O=U[y.id];for(const z in O)u(O[z].object),delete O[z];delete U[y.id]}}function N(){x(),a=!0,s!==r&&(s=r,c(s.object))}function x(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:N,resetDefaultState:x,dispose:I,releaseStatesOfGeometry:A,releaseStatesOfProgram:L,initAttributes:g,enableAttribute:m,disableUnusedAttributes:T}}function Hp(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let d=0;for(let _=0;_<h;_++)d+=u[_];t.update(d,n,1)}function l(c,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let _=0;_<c.length;_++)a(c[_],u[_],f[_]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,h);let _=0;for(let g=0;g<h;g++)_+=u[g]*f[g];t.update(_,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Wp(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(L){return!(L!==Zt&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const N=L===Di&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==sn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==nn&&!N)}function l(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=_>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:S,maxFragmentUniforms:M,vertexTextures:I,maxSamples:A}}function Xp(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new mn,o=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||r;return r=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const _=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!r||_===null||_.length===0||s&&!m)s?u(null):c();else{const T=s?0:n,S=T*4;let M=p.clippingState||null;l.value=M,M=u(_,f,S,d);for(let I=0;I!==S;++I)M[I]=t[I];p.clippingState=M,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,_){const g=h!==null?h.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=d+g*4,T=f.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,M=d;S!==g;++S,M+=4)a.copy(h[S]).applyMatrix4(T,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function qp(i){let e=new WeakMap;function t(a,o){return o===is?a.mapping=Qn:o===rs&&(a.mapping=ei),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===is||o===rs)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Ql(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const vi=4,Cc=[.125,.215,.35,.446,.526,.582],Yn=20,ka=new ca,Rc=new Ze;let Ga=null,Va=0,Ha=0,Wa=!1;const qn=(1+Math.sqrt(5))/2,xi=1/qn,Pc=[new R(-qn,xi,0),new R(qn,xi,0),new R(-xi,0,qn),new R(xi,0,qn),new R(0,qn,-xi),new R(0,qn,xi),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)],Yp=new R;class zs{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=Yp}=s;Ga=this._renderer.getRenderTarget(),Va=this._renderer.getActiveCubeFace(),Ha=this._renderer.getActiveMipmapLevel(),Wa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ic(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ga,Va,Ha),this._renderer.xr.enabled=Wa,e.scissorTest=!1,kr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Qn||e.mapping===ei?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ga=this._renderer.getRenderTarget(),Va=this._renderer.getActiveCubeFace(),Ha=this._renderer.getActiveMipmapLevel(),Wa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:tn,minFilter:tn,generateMipmaps:!1,type:Di,format:Zt,colorSpace:ti,depthBuffer:!1},r=Dc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dc(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Zp(s)),this._blurMaterial=jp(s,e,t)}return r}_compileMaterial(e){const t=new tt(this._lodPlanes[0],e);this._renderer.compile(t,ka)}_sceneToCubeUV(e,t,n,r,s){const l=new It(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(Rc),h.toneMapping=xn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null));const g=new wi({name:"PMREM.Background",side:St,depthWrite:!1,depthTest:!1}),m=new tt(new cn,g);let p=!1;const T=e.background;T?T.isColor&&(g.color.copy(T),e.background=null,p=!0):(g.color.copy(Rc),p=!0);for(let S=0;S<6;S++){const M=S%3;M===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[S],s.y,s.z)):M===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[S]));const I=this._cubeSize;kr(r,M*I,S>2?I:0,I,I),h.setRenderTarget(r),p&&h.render(m,l),h.render(e,l)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=f,e.background=T}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Qn||e.mapping===ei;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ic()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new tt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;kr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ka)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Pc[(r-s-1)%Pc.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new tt(this._lodPlanes[r],c),f=c.uniforms,d=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Yn-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):Yn;m>Yn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Yn}`);const p=[];let T=0;for(let L=0;L<Yn;++L){const N=L/g,x=Math.exp(-N*N/2);p.push(x),L===0?T+=x:L<m&&(T+=2*x)}for(let L=0;L<p.length;L++)p[L]=p[L]/T;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:S}=this;f.dTheta.value=_,f.mipInt.value=S-n;const M=this._sizeLods[r],I=3*M*(r>S-vi?r-S+vi:0),A=4*(this._cubeSize-M);kr(t,I,A,3*M,2*M),l.setRenderTarget(t),l.render(h,ka)}}function Zp(i){const e=[],t=[],n=[];let r=i;const s=i-vi+1+Cc.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>i-vi?l=Cc[a-i+vi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,_=6,g=3,m=2,p=1,T=new Float32Array(g*_*d),S=new Float32Array(m*_*d),M=new Float32Array(p*_*d);for(let A=0;A<d;A++){const L=A%3*2/3-1,N=A>2?0:-1,x=[L,N,0,L+2/3,N,0,L+2/3,N+1,0,L,N,0,L+2/3,N+1,0,L,N+1,0];T.set(x,g*_*A),S.set(f,m*_*A);const y=[A,A,A,A,A,A];M.set(y,p*_*A)}const I=new lt;I.setAttribute("position",new Et(T,g)),I.setAttribute("uv",new Et(S,m)),I.setAttribute("faceIndex",new Et(M,p)),e.push(I),r>vi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Dc(i,e,t){const n=new Un(i,e,t);return n.texture.mapping=ur,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function kr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function jp(i,e,t){const n=new Float32Array(Yn),r=new R(0,1,0);return new Mn({name:"SphericalGaussianBlur",defines:{n:Yn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Vo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:gn,depthTest:!1,depthWrite:!1})}function Lc(){return new Mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:gn,depthTest:!1,depthWrite:!1})}function Ic(){return new Mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gn,depthTest:!1,depthWrite:!1})}function Vo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Kp(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===is||l===rs,u=l===Qn||l===ei;if(c||u){let h=e.get(o);const f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new zs(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const d=o.image;return c&&d&&d.height>0||u&&d&&r(d)?(t===null&&(t=new zs(i)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Jp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&ar("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function $p(i,e,t,n){const r={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",a),delete r[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const d in f)e.update(f[d],i.ARRAY_BUFFER)}function c(h){const f=[],d=h.index,_=h.attributes.position;let g=0;if(d!==null){const T=d.array;g=d.version;for(let S=0,M=T.length;S<M;S+=3){const I=T[S+0],A=T[S+1],L=T[S+2];f.push(I,A,A,L,L,I)}}else if(_!==void 0){const T=_.array;g=_.version;for(let S=0,M=T.length/3-1;S<M;S+=3){const I=S+0,A=S+1,L=S+2;f.push(I,A,A,L,L,I)}}else return;const m=new(Wl(f)?To:Eo)(f,1);m.version=g;const p=s.get(h);p&&e.remove(p),s.set(h,m)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Qp(i,e,t){let n;function r(f){n=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,d){i.drawElements(n,d,s,f*a),t.update(d,n,1)}function c(f,d,_){_!==0&&(i.drawElementsInstanced(n,d,s,f*a,_),t.update(d,n,_))}function u(f,d,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,_);let m=0;for(let p=0;p<_;p++)m+=d[p];t.update(m,n,1)}function h(f,d,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/a,d[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,g,0,_);let p=0;for(let T=0;T<_;T++)p+=d[T]*g[T];t.update(p,n,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function em(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function tm(i,e,t){const n=new WeakMap,r=new rt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==h){let x=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",x)};f!==void 0&&f.texture.dispose();const d=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let S=0;d===!0&&(S=1),_===!0&&(S=2),g===!0&&(S=3);let M=o.attributes.position.count*S,I=1;M>e.maxTextureSize&&(I=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const A=new Float32Array(M*I*4*h),L=new So(A,M,I,h);L.type=nn,L.needsUpdate=!0;const N=S*4;for(let y=0;y<h;y++){const w=m[y],U=p[y],O=T[y],z=M*I*4*y;for(let H=0;H<w.count;H++){const k=H*N;d===!0&&(r.fromBufferAttribute(w,H),A[z+k+0]=r.x,A[z+k+1]=r.y,A[z+k+2]=r.z,A[z+k+3]=0),_===!0&&(r.fromBufferAttribute(U,H),A[z+k+4]=r.x,A[z+k+5]=r.y,A[z+k+6]=r.z,A[z+k+7]=0),g===!0&&(r.fromBufferAttribute(O,H),A[z+k+8]=r.x,A[z+k+9]=r.y,A[z+k+10]=r.z,A[z+k+11]=O.itemSize===4?r.w:1)}}f={count:h,texture:L,size:new he(M,I)},n.set(o,f),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let g=0;g<c.length;g++)d+=c[g];const _=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function nm(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const xu=new vt,Uc=new Do(1,1),yu=new So,vu=new Zl,Mu=new Ao,Nc=[],Oc=[],Fc=new Float32Array(16),Bc=new Float32Array(9),zc=new Float32Array(4);function Ui(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Nc[r];if(s===void 0&&(s=new Float32Array(r),Nc[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function gt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function xt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function la(i,e){let t=Oc[e];t===void 0&&(t=new Int32Array(e),Oc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function im(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function rm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;i.uniform2fv(this.addr,e),xt(t,e)}}function sm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(gt(t,e))return;i.uniform3fv(this.addr,e),xt(t,e)}}function am(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;i.uniform4fv(this.addr,e),xt(t,e)}}function om(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),xt(t,e)}else{if(gt(t,n))return;zc.set(n),i.uniformMatrix2fv(this.addr,!1,zc),xt(t,n)}}function cm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),xt(t,e)}else{if(gt(t,n))return;Bc.set(n),i.uniformMatrix3fv(this.addr,!1,Bc),xt(t,n)}}function lm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),xt(t,e)}else{if(gt(t,n))return;Fc.set(n),i.uniformMatrix4fv(this.addr,!1,Fc),xt(t,n)}}function um(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function hm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;i.uniform2iv(this.addr,e),xt(t,e)}}function fm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;i.uniform3iv(this.addr,e),xt(t,e)}}function dm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;i.uniform4iv(this.addr,e),xt(t,e)}}function pm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function mm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;i.uniform2uiv(this.addr,e),xt(t,e)}}function _m(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;i.uniform3uiv(this.addr,e),xt(t,e)}}function gm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;i.uniform4uiv(this.addr,e),xt(t,e)}}function xm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Uc.compareFunction=bo,s=Uc):s=xu,t.setTexture2D(e||s,r)}function ym(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||vu,r)}function vm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Mu,r)}function Mm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||yu,r)}function bm(i){switch(i){case 5126:return im;case 35664:return rm;case 35665:return sm;case 35666:return am;case 35674:return om;case 35675:return cm;case 35676:return lm;case 5124:case 35670:return um;case 35667:case 35671:return hm;case 35668:case 35672:return fm;case 35669:case 35673:return dm;case 5125:return pm;case 36294:return mm;case 36295:return _m;case 36296:return gm;case 35678:case 36198:case 36298:case 36306:case 35682:return xm;case 35679:case 36299:case 36307:return ym;case 35680:case 36300:case 36308:case 36293:return vm;case 36289:case 36303:case 36311:case 36292:return Mm}}function Sm(i,e){i.uniform1fv(this.addr,e)}function Em(i,e){const t=Ui(e,this.size,2);i.uniform2fv(this.addr,t)}function Tm(i,e){const t=Ui(e,this.size,3);i.uniform3fv(this.addr,t)}function wm(i,e){const t=Ui(e,this.size,4);i.uniform4fv(this.addr,t)}function Am(i,e){const t=Ui(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Cm(i,e){const t=Ui(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Rm(i,e){const t=Ui(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Pm(i,e){i.uniform1iv(this.addr,e)}function Dm(i,e){i.uniform2iv(this.addr,e)}function Lm(i,e){i.uniform3iv(this.addr,e)}function Im(i,e){i.uniform4iv(this.addr,e)}function Um(i,e){i.uniform1uiv(this.addr,e)}function Nm(i,e){i.uniform2uiv(this.addr,e)}function Om(i,e){i.uniform3uiv(this.addr,e)}function Fm(i,e){i.uniform4uiv(this.addr,e)}function Bm(i,e,t){const n=this.cache,r=e.length,s=la(t,r);gt(n,s)||(i.uniform1iv(this.addr,s),xt(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||xu,s[a])}function zm(i,e,t){const n=this.cache,r=e.length,s=la(t,r);gt(n,s)||(i.uniform1iv(this.addr,s),xt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||vu,s[a])}function km(i,e,t){const n=this.cache,r=e.length,s=la(t,r);gt(n,s)||(i.uniform1iv(this.addr,s),xt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Mu,s[a])}function Gm(i,e,t){const n=this.cache,r=e.length,s=la(t,r);gt(n,s)||(i.uniform1iv(this.addr,s),xt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||yu,s[a])}function Vm(i){switch(i){case 5126:return Sm;case 35664:return Em;case 35665:return Tm;case 35666:return wm;case 35674:return Am;case 35675:return Cm;case 35676:return Rm;case 5124:case 35670:return Pm;case 35667:case 35671:return Dm;case 35668:case 35672:return Lm;case 35669:case 35673:return Im;case 5125:return Um;case 36294:return Nm;case 36295:return Om;case 36296:return Fm;case 35678:case 36198:case 36298:case 36306:case 35682:return Bm;case 35679:case 36299:case 36307:return zm;case 35680:case 36300:case 36308:case 36293:return km;case 36289:case 36303:case 36311:case 36292:return Gm}}class Hm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=bm(t.type)}}class Wm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Vm(t.type)}}class Xm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Xa=/(\w+)(\])?(\[|\.)?/g;function kc(i,e){i.seq.push(e),i.map[e.id]=e}function qm(i,e,t){const n=i.name,r=n.length;for(Xa.lastIndex=0;;){const s=Xa.exec(n),a=Xa.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){kc(t,c===void 0?new Hm(o,i,e):new Wm(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new Xm(o),kc(t,h)),t=h}}}class Yr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);qm(s,a,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Gc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Ym=37297;let Zm=0;function jm(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Vc=new We;function Km(i){Qe._getMatrix(Vc,Qe.workingColorSpace,i);const e=`mat3( ${Vc.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(i)){case rr:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Hc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+jm(i.getShaderSource(e),o)}else return s}function Jm(i,e){const t=Km(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function $m(i,e){let t;switch(e){case wl:t="Linear";break;case Al:t="Reinhard";break;case Cl:t="Cineon";break;case Rl:t="ACESFilmic";break;case Dl:t="AgX";break;case fo:t="Neutral";break;case Pl:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Gr=new R;function Qm(){Qe.getLuminanceCoefficients(Gr);const i=Gr.x.toFixed(4),e=Gr.y.toFixed(4),t=Gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function e0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ki).join(`
`)}function t0(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function n0(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ki(i){return i!==""}function Wc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const i0=/^[ \t]*#include +<([\w\d./]+)>/gm;function uo(i){return i.replace(i0,s0)}const r0=new Map;function s0(i,e){let t=Xe[e];if(t===void 0){const n=r0.get(e);if(n!==void 0)t=Xe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return uo(t)}const a0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qc(i){return i.replace(a0,o0)}function o0(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Yc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function c0(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ho?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===sl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Qt&&(e="SHADOWMAP_TYPE_VSM"),e}function l0(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Qn:case ei:e="ENVMAP_TYPE_CUBE";break;case ur:e="ENVMAP_TYPE_CUBE_UV";break}return e}function u0(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ei:e="ENVMAP_MODE_REFRACTION";break}return e}function h0(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Gs:e="ENVMAP_BLENDING_MULTIPLY";break;case El:e="ENVMAP_BLENDING_MIX";break;case Tl:e="ENVMAP_BLENDING_ADD";break}return e}function f0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function d0(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=c0(t),c=l0(t),u=u0(t),h=h0(t),f=f0(t),d=e0(t),_=t0(s),g=r.createProgram();let m,p,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ki).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ki).join(`
`),p.length>0&&(p+=`
`)):(m=[Yc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ki).join(`
`),p=[Yc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==xn?"#define TONE_MAPPING":"",t.toneMapping!==xn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==xn?$m("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,Jm("linearToOutputTexel",t.outputColorSpace),Qm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ki).join(`
`)),a=uo(a),a=Wc(a,t),a=Xc(a,t),o=uo(o),o=Wc(o,t),o=Xc(o,t),a=qc(a),o=qc(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===eo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===eo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=T+m+a,M=T+p+o,I=Gc(r,r.VERTEX_SHADER,S),A=Gc(r,r.FRAGMENT_SHADER,M);r.attachShader(g,I),r.attachShader(g,A),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function L(w){if(i.debug.checkShaderErrors){const U=r.getProgramInfoLog(g)||"",O=r.getShaderInfoLog(I)||"",z=r.getShaderInfoLog(A)||"",H=U.trim(),k=O.trim(),K=z.trim();let X=!0,V=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,g,I,A);else{const ee=Hc(r,I,"vertex"),ae=Hc(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+H+`
`+ee+`
`+ae)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(k===""||K==="")&&(V=!1);V&&(w.diagnostics={runnable:X,programLog:H,vertexShader:{log:k,prefix:m},fragmentShader:{log:K,prefix:p}})}r.deleteShader(I),r.deleteShader(A),N=new Yr(r,g),x=n0(r,g)}let N;this.getUniforms=function(){return N===void 0&&L(this),N};let x;this.getAttributes=function(){return x===void 0&&L(this),x};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(g,Ym)),y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Zm++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=I,this.fragmentShader=A,this}let p0=0;class m0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new _0(e),t.set(e,n)),n}}class _0{constructor(e){this.id=p0++,this.code=e,this.usedTimes=0}}function g0(i,e,t,n,r,s,a){const o=new Js,l=new m0,c=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let d=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return c.add(x),x===0?"uv":`uv${x}`}function m(x,y,w,U,O){const z=U.fog,H=O.geometry,k=x.isMeshStandardMaterial?U.environment:null,K=(x.isMeshStandardMaterial?t:e).get(x.envMap||k),X=K&&K.mapping===ur?K.image.height:null,V=_[x.type];x.precision!==null&&(d=r.getMaxPrecision(x.precision),d!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const ee=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ae=ee!==void 0?ee.length:0;let ye=0;H.morphAttributes.position!==void 0&&(ye=1),H.morphAttributes.normal!==void 0&&(ye=2),H.morphAttributes.color!==void 0&&(ye=3);let Ie,Ne,Ue,$;if(V){const He=en[V];Ie=He.vertexShader,Ne=He.fragmentShader}else Ie=x.vertexShader,Ne=x.fragmentShader,l.update(x),Ue=l.getVertexShaderID(x),$=l.getFragmentShaderID(x);const ce=i.getRenderTarget(),ge=i.state.buffers.depth.getReversed(),Pe=O.isInstancedMesh===!0,be=O.isBatchedMesh===!0,qe=!!x.map,Ke=!!x.matcap,D=!!K,oe=!!x.aoMap,ne=!!x.lightMap,te=!!x.bumpMap,P=!!x.normalMap,W=!!x.displacementMap,Z=!!x.emissiveMap,re=!!x.metalnessMap,_e=!!x.roughnessMap,Se=x.anisotropy>0,E=x.clearcoat>0,v=x.dispersion>0,F=x.iridescence>0,q=x.sheen>0,ie=x.transmission>0,Y=Se&&!!x.anisotropyMap,Ce=E&&!!x.clearcoatMap,de=E&&!!x.clearcoatNormalMap,Te=E&&!!x.clearcoatRoughnessMap,we=F&&!!x.iridescenceMap,fe=F&&!!x.iridescenceThicknessMap,ve=q&&!!x.sheenColorMap,Oe=q&&!!x.sheenRoughnessMap,Le=!!x.specularMap,Me=!!x.specularColorMap,Ve=!!x.specularIntensityMap,C=ie&&!!x.transmissionMap,se=ie&&!!x.thicknessMap,ue=!!x.gradientMap,me=!!x.alphaMap,le=x.alphaTest>0,Q=!!x.alphaHash,Ae=!!x.extensions;let Be=xn;x.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(Be=i.toneMapping);const $e={shaderID:V,shaderType:x.type,shaderName:x.name,vertexShader:Ie,fragmentShader:Ne,defines:x.defines,customVertexShaderID:Ue,customFragmentShaderID:$,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:be,batchingColor:be&&O._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&O.instanceColor!==null,instancingMorph:Pe&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ce===null?i.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:ti,alphaToCoverage:!!x.alphaToCoverage,map:qe,matcap:Ke,envMap:D,envMapMode:D&&K.mapping,envMapCubeUVHeight:X,aoMap:oe,lightMap:ne,bumpMap:te,normalMap:P,displacementMap:f&&W,emissiveMap:Z,normalMapObjectSpace:P&&x.normalMapType===Nl,normalMapTangentSpace:P&&x.normalMapType===js,metalnessMap:re,roughnessMap:_e,anisotropy:Se,anisotropyMap:Y,clearcoat:E,clearcoatMap:Ce,clearcoatNormalMap:de,clearcoatRoughnessMap:Te,dispersion:v,iridescence:F,iridescenceMap:we,iridescenceThicknessMap:fe,sheen:q,sheenColorMap:ve,sheenRoughnessMap:Oe,specularMap:Le,specularColorMap:Me,specularIntensityMap:Ve,transmission:ie,transmissionMap:C,thicknessMap:se,gradientMap:ue,opaque:x.transparent===!1&&x.blending===Kn&&x.alphaToCoverage===!1,alphaMap:me,alphaTest:le,alphaHash:Q,combine:x.combine,mapUv:qe&&g(x.map.channel),aoMapUv:oe&&g(x.aoMap.channel),lightMapUv:ne&&g(x.lightMap.channel),bumpMapUv:te&&g(x.bumpMap.channel),normalMapUv:P&&g(x.normalMap.channel),displacementMapUv:W&&g(x.displacementMap.channel),emissiveMapUv:Z&&g(x.emissiveMap.channel),metalnessMapUv:re&&g(x.metalnessMap.channel),roughnessMapUv:_e&&g(x.roughnessMap.channel),anisotropyMapUv:Y&&g(x.anisotropyMap.channel),clearcoatMapUv:Ce&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:de&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&g(x.sheenRoughnessMap.channel),specularMapUv:Le&&g(x.specularMap.channel),specularColorMapUv:Me&&g(x.specularColorMap.channel),specularIntensityMapUv:Ve&&g(x.specularIntensityMap.channel),transmissionMapUv:C&&g(x.transmissionMap.channel),thicknessMapUv:se&&g(x.thicknessMap.channel),alphaMapUv:me&&g(x.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(P||Se),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!H.attributes.uv&&(qe||me),fog:!!z,useFog:x.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:x.flatShading===!0&&x.wireframe===!1,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ge,skinning:O.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:ye,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&w.length>0,shadowMapType:i.shadowMap.type,toneMapping:Be,decodeVideoTexture:qe&&x.map.isVideoTexture===!0&&Qe.getTransfer(x.map.colorSpace)===it,decodeVideoTextureEmissive:Z&&x.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(x.emissiveMap.colorSpace)===it,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===qt,flipSided:x.side===St,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Ae&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ae&&x.extensions.multiDraw===!0||be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return $e.vertexUv1s=c.has(1),$e.vertexUv2s=c.has(2),$e.vertexUv3s=c.has(3),c.clear(),$e}function p(x){const y=[];if(x.shaderID?y.push(x.shaderID):(y.push(x.customVertexShaderID),y.push(x.customFragmentShaderID)),x.defines!==void 0)for(const w in x.defines)y.push(w),y.push(x.defines[w]);return x.isRawShaderMaterial===!1&&(T(y,x),S(y,x),y.push(i.outputColorSpace)),y.push(x.customProgramCacheKey),y.join()}function T(x,y){x.push(y.precision),x.push(y.outputColorSpace),x.push(y.envMapMode),x.push(y.envMapCubeUVHeight),x.push(y.mapUv),x.push(y.alphaMapUv),x.push(y.lightMapUv),x.push(y.aoMapUv),x.push(y.bumpMapUv),x.push(y.normalMapUv),x.push(y.displacementMapUv),x.push(y.emissiveMapUv),x.push(y.metalnessMapUv),x.push(y.roughnessMapUv),x.push(y.anisotropyMapUv),x.push(y.clearcoatMapUv),x.push(y.clearcoatNormalMapUv),x.push(y.clearcoatRoughnessMapUv),x.push(y.iridescenceMapUv),x.push(y.iridescenceThicknessMapUv),x.push(y.sheenColorMapUv),x.push(y.sheenRoughnessMapUv),x.push(y.specularMapUv),x.push(y.specularColorMapUv),x.push(y.specularIntensityMapUv),x.push(y.transmissionMapUv),x.push(y.thicknessMapUv),x.push(y.combine),x.push(y.fogExp2),x.push(y.sizeAttenuation),x.push(y.morphTargetsCount),x.push(y.morphAttributeCount),x.push(y.numDirLights),x.push(y.numPointLights),x.push(y.numSpotLights),x.push(y.numSpotLightMaps),x.push(y.numHemiLights),x.push(y.numRectAreaLights),x.push(y.numDirLightShadows),x.push(y.numPointLightShadows),x.push(y.numSpotLightShadows),x.push(y.numSpotLightShadowsWithMaps),x.push(y.numLightProbes),x.push(y.shadowMapType),x.push(y.toneMapping),x.push(y.numClippingPlanes),x.push(y.numClipIntersection),x.push(y.depthPacking)}function S(x,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),x.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),x.push(o.mask)}function M(x){const y=_[x.type];let w;if(y){const U=en[y];w=Jl.clone(U.uniforms)}else w=x.uniforms;return w}function I(x,y){let w;for(let U=0,O=u.length;U<O;U++){const z=u[U];if(z.cacheKey===y){w=z,++w.usedTimes;break}}return w===void 0&&(w=new d0(i,y,x,s),u.push(w)),w}function A(x){if(--x.usedTimes===0){const y=u.indexOf(x);u[y]=u[u.length-1],u.pop(),x.destroy()}}function L(x){l.remove(x)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:I,releaseProgram:A,releaseShaderCache:L,programs:u,dispose:N}}function x0(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function y0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Zc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function jc(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h,f,d,_,g,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:_,renderOrder:h.renderOrder,z:g,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=_,p.renderOrder=h.renderOrder,p.z=g,p.group=m),e++,p}function o(h,f,d,_,g,m){const p=a(h,f,d,_,g,m);d.transmission>0?n.push(p):d.transparent===!0?r.push(p):t.push(p)}function l(h,f,d,_,g,m){const p=a(h,f,d,_,g,m);d.transmission>0?n.unshift(p):d.transparent===!0?r.unshift(p):t.unshift(p)}function c(h,f){t.length>1&&t.sort(h||y0),n.length>1&&n.sort(f||Zc),r.length>1&&r.sort(f||Zc)}function u(){for(let h=e,f=i.length;h<f;h++){const d=i[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function v0(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new jc,i.set(n,[a])):r>=s.length?(a=new jc,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function M0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new Ze};break;case"SpotLight":t={position:new R,direction:new R,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":t={color:new Ze,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function b0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let S0=0;function E0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function T0(i){const e=new M0,t=b0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);const r=new R,s=new nt,a=new nt;function o(c){let u=0,h=0,f=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let d=0,_=0,g=0,m=0,p=0,T=0,S=0,M=0,I=0,A=0,L=0;c.sort(E0);for(let x=0,y=c.length;x<y;x++){const w=c[x],U=w.color,O=w.intensity,z=w.distance,H=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)u+=U.r*O,h+=U.g*O,f+=U.b*O;else if(w.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(w.sh.coefficients[k],O);L++}else if(w.isDirectionalLight){const k=e.get(w);if(k.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const K=w.shadow,X=t.get(w);X.shadowIntensity=K.intensity,X.shadowBias=K.bias,X.shadowNormalBias=K.normalBias,X.shadowRadius=K.radius,X.shadowMapSize=K.mapSize,n.directionalShadow[d]=X,n.directionalShadowMap[d]=H,n.directionalShadowMatrix[d]=w.shadow.matrix,T++}n.directional[d]=k,d++}else if(w.isSpotLight){const k=e.get(w);k.position.setFromMatrixPosition(w.matrixWorld),k.color.copy(U).multiplyScalar(O),k.distance=z,k.coneCos=Math.cos(w.angle),k.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),k.decay=w.decay,n.spot[g]=k;const K=w.shadow;if(w.map&&(n.spotLightMap[I]=w.map,I++,K.updateMatrices(w),w.castShadow&&A++),n.spotLightMatrix[g]=K.matrix,w.castShadow){const X=t.get(w);X.shadowIntensity=K.intensity,X.shadowBias=K.bias,X.shadowNormalBias=K.normalBias,X.shadowRadius=K.radius,X.shadowMapSize=K.mapSize,n.spotShadow[g]=X,n.spotShadowMap[g]=H,M++}g++}else if(w.isRectAreaLight){const k=e.get(w);k.color.copy(U).multiplyScalar(O),k.halfWidth.set(w.width*.5,0,0),k.halfHeight.set(0,w.height*.5,0),n.rectArea[m]=k,m++}else if(w.isPointLight){const k=e.get(w);if(k.color.copy(w.color).multiplyScalar(w.intensity),k.distance=w.distance,k.decay=w.decay,w.castShadow){const K=w.shadow,X=t.get(w);X.shadowIntensity=K.intensity,X.shadowBias=K.bias,X.shadowNormalBias=K.normalBias,X.shadowRadius=K.radius,X.shadowMapSize=K.mapSize,X.shadowCameraNear=K.camera.near,X.shadowCameraFar=K.camera.far,n.pointShadow[_]=X,n.pointShadowMap[_]=H,n.pointShadowMatrix[_]=w.shadow.matrix,S++}n.point[_]=k,_++}else if(w.isHemisphereLight){const k=e.get(w);k.skyColor.copy(w.color).multiplyScalar(O),k.groundColor.copy(w.groundColor).multiplyScalar(O),n.hemi[p]=k,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xe.LTC_FLOAT_1,n.rectAreaLTC2=xe.LTC_FLOAT_2):(n.rectAreaLTC1=xe.LTC_HALF_1,n.rectAreaLTC2=xe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const N=n.hash;(N.directionalLength!==d||N.pointLength!==_||N.spotLength!==g||N.rectAreaLength!==m||N.hemiLength!==p||N.numDirectionalShadows!==T||N.numPointShadows!==S||N.numSpotShadows!==M||N.numSpotMaps!==I||N.numLightProbes!==L)&&(n.directional.length=d,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=M+I-A,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=L,N.directionalLength=d,N.pointLength=_,N.spotLength=g,N.rectAreaLength=m,N.hemiLength=p,N.numDirectionalShadows=T,N.numPointShadows=S,N.numSpotShadows=M,N.numSpotMaps=I,N.numLightProbes=L,n.version=S0++)}function l(c,u){let h=0,f=0,d=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,T=c.length;p<T;p++){const S=c[p];if(S.isDirectionalLight){const M=n.directional[h];M.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),h++}else if(S.isSpotLight){const M=n.spot[d];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const M=n.rectArea[_];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(m),a.identity(),s.copy(S.matrixWorld),s.premultiply(m),a.extractRotation(s),M.halfWidth.set(S.width*.5,0,0),M.halfHeight.set(0,S.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),_++}else if(S.isPointLight){const M=n.point[f];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const M=n.hemi[g];M.direction.setFromMatrixPosition(S.matrixWorld),M.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:n}}function Kc(i){const e=new T0(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function w0(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Kc(i),e.set(r,[o])):s>=a.length?(o=new Kc(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const A0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,C0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function R0(i,e,t){let n=new $s;const r=new he,s=new he,a=new rt,o=new uu({depthPacking:Ul}),l=new hu,c={},u=t.maxTextureSize,h={[vn]:St,[St]:vn,[qt]:qt},f=new Mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:A0,fragmentShader:C0}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const _=new lt;_.setAttribute("position",new Et(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new tt(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ho;let p=this.type;this.render=function(A,L,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const x=i.getRenderTarget(),y=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),U=i.state;U.setBlending(gn),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const O=p!==Qt&&this.type===Qt,z=p===Qt&&this.type!==Qt;for(let H=0,k=A.length;H<k;H++){const K=A[H],X=K.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;r.copy(X.mapSize);const V=X.getFrameExtents();if(r.multiply(V),s.copy(X.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/V.x),r.x=s.x*V.x,X.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/V.y),r.y=s.y*V.y,X.mapSize.y=s.y)),X.map===null||O===!0||z===!0){const ae=this.type!==Qt?{minFilter:Nt,magFilter:Nt}:{};X.map!==null&&X.map.dispose(),X.map=new Un(r.x,r.y,ae),X.map.texture.name=K.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();const ee=X.getViewportCount();for(let ae=0;ae<ee;ae++){const ye=X.getViewport(ae);a.set(s.x*ye.x,s.y*ye.y,s.x*ye.z,s.y*ye.w),U.viewport(a),X.updateMatrices(K,ae),n=X.getFrustum(),M(L,N,X.camera,K,this.type)}X.isPointLightShadow!==!0&&this.type===Qt&&T(X,N),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(x,y,w)};function T(A,L){const N=e.update(g);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Un(r.x,r.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(L,null,N,f,g,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(L,null,N,d,g,null)}function S(A,L,N,x){let y=null;const w=N.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(w!==void 0)y=w;else if(y=N.isPointLight===!0?l:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const U=y.uuid,O=L.uuid;let z=c[U];z===void 0&&(z={},c[U]=z);let H=z[O];H===void 0&&(H=y.clone(),z[O]=H,L.addEventListener("dispose",I)),y=H}if(y.visible=L.visible,y.wireframe=L.wireframe,x===Qt?y.side=L.shadowSide!==null?L.shadowSide:L.side:y.side=L.shadowSide!==null?L.shadowSide:h[L.side],y.alphaMap=L.alphaMap,y.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,y.map=L.map,y.clipShadows=L.clipShadows,y.clippingPlanes=L.clippingPlanes,y.clipIntersection=L.clipIntersection,y.displacementMap=L.displacementMap,y.displacementScale=L.displacementScale,y.displacementBias=L.displacementBias,y.wireframeLinewidth=L.wireframeLinewidth,y.linewidth=L.linewidth,N.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const U=i.properties.get(y);U.light=N}return y}function M(A,L,N,x,y){if(A.visible===!1)return;if(A.layers.test(L.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===Qt)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,A.matrixWorld);const O=e.update(A),z=A.material;if(Array.isArray(z)){const H=O.groups;for(let k=0,K=H.length;k<K;k++){const X=H[k],V=z[X.materialIndex];if(V&&V.visible){const ee=S(A,V,x,y);A.onBeforeShadow(i,A,L,N,O,ee,X),i.renderBufferDirect(N,null,O,ee,A,X),A.onAfterShadow(i,A,L,N,O,ee,X)}}}else if(z.visible){const H=S(A,z,x,y);A.onBeforeShadow(i,A,L,N,O,H,null),i.renderBufferDirect(N,null,O,H,A,null),A.onAfterShadow(i,A,L,N,O,H,null)}}const U=A.children;for(let O=0,z=U.length;O<z;O++)M(U[O],L,N,x,y)}function I(A){A.target.removeEventListener("dispose",I);for(const N in c){const x=c[N],y=A.target.uuid;y in x&&(x[y].dispose(),delete x[y])}}}const P0={[Kr]:Jr,[$r]:ts,[Qr]:ns,[$n]:es,[Jr]:Kr,[ts]:$r,[ns]:Qr,[es]:$n};function D0(i,e){function t(){let C=!1;const se=new rt;let ue=null;const me=new rt(0,0,0,0);return{setMask:function(le){ue!==le&&!C&&(i.colorMask(le,le,le,le),ue=le)},setLocked:function(le){C=le},setClear:function(le,Q,Ae,Be,$e){$e===!0&&(le*=Be,Q*=Be,Ae*=Be),se.set(le,Q,Ae,Be),me.equals(se)===!1&&(i.clearColor(le,Q,Ae,Be),me.copy(se))},reset:function(){C=!1,ue=null,me.set(-1,0,0,0)}}}function n(){let C=!1,se=!1,ue=null,me=null,le=null;return{setReversed:function(Q){if(se!==Q){const Ae=e.get("EXT_clip_control");Q?Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.ZERO_TO_ONE_EXT):Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.NEGATIVE_ONE_TO_ONE_EXT),se=Q;const Be=le;le=null,this.setClear(Be)}},getReversed:function(){return se},setTest:function(Q){Q?ce(i.DEPTH_TEST):ge(i.DEPTH_TEST)},setMask:function(Q){ue!==Q&&!C&&(i.depthMask(Q),ue=Q)},setFunc:function(Q){if(se&&(Q=P0[Q]),me!==Q){switch(Q){case Kr:i.depthFunc(i.NEVER);break;case Jr:i.depthFunc(i.ALWAYS);break;case $r:i.depthFunc(i.LESS);break;case $n:i.depthFunc(i.LEQUAL);break;case Qr:i.depthFunc(i.EQUAL);break;case es:i.depthFunc(i.GEQUAL);break;case ts:i.depthFunc(i.GREATER);break;case ns:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=Q}},setLocked:function(Q){C=Q},setClear:function(Q){le!==Q&&(se&&(Q=1-Q),i.clearDepth(Q),le=Q)},reset:function(){C=!1,ue=null,me=null,le=null,se=!1}}}function r(){let C=!1,se=null,ue=null,me=null,le=null,Q=null,Ae=null,Be=null,$e=null;return{setTest:function(He){C||(He?ce(i.STENCIL_TEST):ge(i.STENCIL_TEST))},setMask:function(He){se!==He&&!C&&(i.stencilMask(He),se=He)},setFunc:function(He,At,Ot){(ue!==He||me!==At||le!==Ot)&&(i.stencilFunc(He,At,Ot),ue=He,me=At,le=Ot)},setOp:function(He,At,Ot){(Q!==He||Ae!==At||Be!==Ot)&&(i.stencilOp(He,At,Ot),Q=He,Ae=At,Be=Ot)},setLocked:function(He){C=He},setClear:function(He){$e!==He&&(i.clearStencil(He),$e=He)},reset:function(){C=!1,se=null,ue=null,me=null,le=null,Q=null,Ae=null,Be=null,$e=null}}}const s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,d=[],_=null,g=!1,m=null,p=null,T=null,S=null,M=null,I=null,A=null,L=new Ze(0,0,0),N=0,x=!1,y=null,w=null,U=null,O=null,z=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,K=0;const X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(X)[1]),k=K>=1):X.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),k=K>=2);let V=null,ee={};const ae=i.getParameter(i.SCISSOR_BOX),ye=i.getParameter(i.VIEWPORT),Ie=new rt().fromArray(ae),Ne=new rt().fromArray(ye);function Ue(C,se,ue,me){const le=new Uint8Array(4),Q=i.createTexture();i.bindTexture(C,Q),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ae=0;Ae<ue;Ae++)C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,le):i.texImage2D(se+Ae,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,le);return Q}const $={};$[i.TEXTURE_2D]=Ue(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=Ue(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[i.TEXTURE_2D_ARRAY]=Ue(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=Ue(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ce(i.DEPTH_TEST),a.setFunc($n),te(!1),P(Za),ce(i.CULL_FACE),oe(gn);function ce(C){u[C]!==!0&&(i.enable(C),u[C]=!0)}function ge(C){u[C]!==!1&&(i.disable(C),u[C]=!1)}function Pe(C,se){return h[C]!==se?(i.bindFramebuffer(C,se),h[C]=se,C===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=se),C===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=se),!0):!1}function be(C,se){let ue=d,me=!1;if(C){ue=f.get(se),ue===void 0&&(ue=[],f.set(se,ue));const le=C.textures;if(ue.length!==le.length||ue[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,Ae=le.length;Q<Ae;Q++)ue[Q]=i.COLOR_ATTACHMENT0+Q;ue.length=le.length,me=!0}}else ue[0]!==i.BACK&&(ue[0]=i.BACK,me=!0);me&&i.drawBuffers(ue)}function qe(C){return _!==C?(i.useProgram(C),_=C,!0):!1}const Ke={[Rn]:i.FUNC_ADD,[ol]:i.FUNC_SUBTRACT,[cl]:i.FUNC_REVERSE_SUBTRACT};Ke[ll]=i.MIN,Ke[ul]=i.MAX;const D={[hl]:i.ZERO,[fl]:i.ONE,[dl]:i.SRC_COLOR,[Zr]:i.SRC_ALPHA,[yl]:i.SRC_ALPHA_SATURATE,[gl]:i.DST_COLOR,[ml]:i.DST_ALPHA,[pl]:i.ONE_MINUS_SRC_COLOR,[jr]:i.ONE_MINUS_SRC_ALPHA,[xl]:i.ONE_MINUS_DST_COLOR,[_l]:i.ONE_MINUS_DST_ALPHA,[vl]:i.CONSTANT_COLOR,[Ml]:i.ONE_MINUS_CONSTANT_COLOR,[bl]:i.CONSTANT_ALPHA,[Sl]:i.ONE_MINUS_CONSTANT_ALPHA};function oe(C,se,ue,me,le,Q,Ae,Be,$e,He){if(C===gn){g===!0&&(ge(i.BLEND),g=!1);return}if(g===!1&&(ce(i.BLEND),g=!0),C!==al){if(C!==m||He!==x){if((p!==Rn||M!==Rn)&&(i.blendEquation(i.FUNC_ADD),p=Rn,M=Rn),He)switch(C){case Kn:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ja:i.blendFunc(i.ONE,i.ONE);break;case Ka:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ja:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case Kn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ja:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ka:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ja:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}T=null,S=null,I=null,A=null,L.set(0,0,0),N=0,m=C,x=He}return}le=le||se,Q=Q||ue,Ae=Ae||me,(se!==p||le!==M)&&(i.blendEquationSeparate(Ke[se],Ke[le]),p=se,M=le),(ue!==T||me!==S||Q!==I||Ae!==A)&&(i.blendFuncSeparate(D[ue],D[me],D[Q],D[Ae]),T=ue,S=me,I=Q,A=Ae),(Be.equals(L)===!1||$e!==N)&&(i.blendColor(Be.r,Be.g,Be.b,$e),L.copy(Be),N=$e),m=C,x=!1}function ne(C,se){C.side===qt?ge(i.CULL_FACE):ce(i.CULL_FACE);let ue=C.side===St;se&&(ue=!ue),te(ue),C.blending===Kn&&C.transparent===!1?oe(gn):oe(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),s.setMask(C.colorWrite);const me=C.stencilWrite;o.setTest(me),me&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),Z(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?ce(i.SAMPLE_ALPHA_TO_COVERAGE):ge(i.SAMPLE_ALPHA_TO_COVERAGE)}function te(C){y!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),y=C)}function P(C){C!==il?(ce(i.CULL_FACE),C!==w&&(C===Za?i.cullFace(i.BACK):C===rl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ge(i.CULL_FACE),w=C}function W(C){C!==U&&(k&&i.lineWidth(C),U=C)}function Z(C,se,ue){C?(ce(i.POLYGON_OFFSET_FILL),(O!==se||z!==ue)&&(i.polygonOffset(se,ue),O=se,z=ue)):ge(i.POLYGON_OFFSET_FILL)}function re(C){C?ce(i.SCISSOR_TEST):ge(i.SCISSOR_TEST)}function _e(C){C===void 0&&(C=i.TEXTURE0+H-1),V!==C&&(i.activeTexture(C),V=C)}function Se(C,se,ue){ue===void 0&&(V===null?ue=i.TEXTURE0+H-1:ue=V);let me=ee[ue];me===void 0&&(me={type:void 0,texture:void 0},ee[ue]=me),(me.type!==C||me.texture!==se)&&(V!==ue&&(i.activeTexture(ue),V=ue),i.bindTexture(C,se||$[C]),me.type=C,me.texture=se)}function E(){const C=ee[V];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function F(){try{i.compressedTexImage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function q(){try{i.texSubImage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ie(){try{i.texSubImage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ce(){try{i.compressedTexSubImage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function de(){try{i.texStorage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Te(){try{i.texStorage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function we(){try{i.texImage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function fe(){try{i.texImage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ve(C){Ie.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),Ie.copy(C))}function Oe(C){Ne.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),Ne.copy(C))}function Le(C,se){let ue=c.get(se);ue===void 0&&(ue=new WeakMap,c.set(se,ue));let me=ue.get(C);me===void 0&&(me=i.getUniformBlockIndex(se,C.name),ue.set(C,me))}function Me(C,se){const me=c.get(se).get(C);l.get(se)!==me&&(i.uniformBlockBinding(se,me,C.__bindingPointIndex),l.set(se,me))}function Ve(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},V=null,ee={},h={},f=new WeakMap,d=[],_=null,g=!1,m=null,p=null,T=null,S=null,M=null,I=null,A=null,L=new Ze(0,0,0),N=0,x=!1,y=null,w=null,U=null,O=null,z=null,Ie.set(0,0,i.canvas.width,i.canvas.height),Ne.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ce,disable:ge,bindFramebuffer:Pe,drawBuffers:be,useProgram:qe,setBlending:oe,setMaterial:ne,setFlipSided:te,setCullFace:P,setLineWidth:W,setPolygonOffset:Z,setScissorTest:re,activeTexture:_e,bindTexture:Se,unbindTexture:E,compressedTexImage2D:v,compressedTexImage3D:F,texImage2D:we,texImage3D:fe,updateUBOMapping:Le,uniformBlockBinding:Me,texStorage2D:de,texStorage3D:Te,texSubImage2D:q,texSubImage3D:ie,compressedTexSubImage2D:Y,compressedTexSubImage3D:Ce,scissor:ve,viewport:Oe,reset:Ve}}function L0(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new he,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(E,v){return d?new OffscreenCanvas(E,v):Ns("canvas")}function g(E,v,F){let q=1;const ie=Se(E);if((ie.width>F||ie.height>F)&&(q=F/Math.max(ie.width,ie.height)),q<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const Y=Math.floor(q*ie.width),Ce=Math.floor(q*ie.height);h===void 0&&(h=_(Y,Ce));const de=v?_(Y,Ce):h;return de.width=Y,de.height=Ce,de.getContext("2d").drawImage(E,0,0,Y,Ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+Y+"x"+Ce+")."),de}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){i.generateMipmap(E)}function T(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(E,v,F,q,ie=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Y=v;if(v===i.RED&&(F===i.FLOAT&&(Y=i.R32F),F===i.HALF_FLOAT&&(Y=i.R16F),F===i.UNSIGNED_BYTE&&(Y=i.R8)),v===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(Y=i.R8UI),F===i.UNSIGNED_SHORT&&(Y=i.R16UI),F===i.UNSIGNED_INT&&(Y=i.R32UI),F===i.BYTE&&(Y=i.R8I),F===i.SHORT&&(Y=i.R16I),F===i.INT&&(Y=i.R32I)),v===i.RG&&(F===i.FLOAT&&(Y=i.RG32F),F===i.HALF_FLOAT&&(Y=i.RG16F),F===i.UNSIGNED_BYTE&&(Y=i.RG8)),v===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(Y=i.RG8UI),F===i.UNSIGNED_SHORT&&(Y=i.RG16UI),F===i.UNSIGNED_INT&&(Y=i.RG32UI),F===i.BYTE&&(Y=i.RG8I),F===i.SHORT&&(Y=i.RG16I),F===i.INT&&(Y=i.RG32I)),v===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),F===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),F===i.UNSIGNED_INT&&(Y=i.RGB32UI),F===i.BYTE&&(Y=i.RGB8I),F===i.SHORT&&(Y=i.RGB16I),F===i.INT&&(Y=i.RGB32I)),v===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),F===i.UNSIGNED_INT&&(Y=i.RGBA32UI),F===i.BYTE&&(Y=i.RGBA8I),F===i.SHORT&&(Y=i.RGBA16I),F===i.INT&&(Y=i.RGBA32I)),v===i.RGB&&(F===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),v===i.RGBA){const Ce=ie?rr:Qe.getTransfer(q);F===i.FLOAT&&(Y=i.RGBA32F),F===i.HALF_FLOAT&&(Y=i.RGBA16F),F===i.UNSIGNED_BYTE&&(Y=Ce===it?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function M(E,v){let F;return E?v===null||v===Ln||v===Si?F=i.DEPTH24_STENCIL8:v===nn?F=i.DEPTH32F_STENCIL8:v===bi&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Ln||v===Si?F=i.DEPTH_COMPONENT24:v===nn?F=i.DEPTH_COMPONENT32F:v===bi&&(F=i.DEPTH_COMPONENT16),F}function I(E,v){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Nt&&E.minFilter!==tn?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function A(E){const v=E.target;v.removeEventListener("dispose",A),N(v),v.isVideoTexture&&u.delete(v)}function L(E){const v=E.target;v.removeEventListener("dispose",L),y(v)}function N(E){const v=n.get(E);if(v.__webglInit===void 0)return;const F=E.source,q=f.get(F);if(q){const ie=q[v.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&x(E),Object.keys(q).length===0&&f.delete(F)}n.remove(E)}function x(E){const v=n.get(E);i.deleteTexture(v.__webglTexture);const F=E.source,q=f.get(F);delete q[v.__cacheKey],a.memory.textures--}function y(E){const v=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let ie=0;ie<v.__webglFramebuffer[q].length;ie++)i.deleteFramebuffer(v.__webglFramebuffer[q][ie]);else i.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)i.deleteFramebuffer(v.__webglFramebuffer[q]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const F=E.textures;for(let q=0,ie=F.length;q<ie;q++){const Y=n.get(F[q]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(F[q])}n.remove(E)}let w=0;function U(){w=0}function O(){const E=w;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),w+=1,E}function z(E){const v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function H(E,v){const F=n.get(E);if(E.isVideoTexture&&re(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&F.__version!==E.version){const q=E.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(F,E,v);return}}else E.isExternalTexture&&(F.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+v)}function k(E,v){const F=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){$(F,E,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+v)}function K(E,v){const F=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){$(F,E,v);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+v)}function X(E,v){const F=n.get(E);if(E.version>0&&F.__version!==E.version){ce(F,E,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+v)}const V={[ss]:i.REPEAT,[Pn]:i.CLAMP_TO_EDGE,[as]:i.MIRRORED_REPEAT},ee={[Nt]:i.NEAREST,[Ll]:i.NEAREST_MIPMAP_NEAREST,[Zi]:i.NEAREST_MIPMAP_LINEAR,[tn]:i.LINEAR,[Wr]:i.LINEAR_MIPMAP_NEAREST,[Dn]:i.LINEAR_MIPMAP_LINEAR},ae={[Ol]:i.NEVER,[Vl]:i.ALWAYS,[Fl]:i.LESS,[bo]:i.LEQUAL,[Bl]:i.EQUAL,[Gl]:i.GEQUAL,[zl]:i.GREATER,[kl]:i.NOTEQUAL};function ye(E,v){if(v.type===nn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===tn||v.magFilter===Wr||v.magFilter===Zi||v.magFilter===Dn||v.minFilter===tn||v.minFilter===Wr||v.minFilter===Zi||v.minFilter===Dn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,V[v.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,V[v.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,V[v.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,ee[v.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,ee[v.minFilter]),v.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,ae[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Nt||v.minFilter!==Zi&&v.minFilter!==Dn||v.type===nn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Ie(E,v){let F=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",A));const q=v.source;let ie=f.get(q);ie===void 0&&(ie={},f.set(q,ie));const Y=z(v);if(Y!==E.__cacheKey){ie[Y]===void 0&&(ie[Y]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),ie[Y].usedTimes++;const Ce=ie[E.__cacheKey];Ce!==void 0&&(ie[E.__cacheKey].usedTimes--,Ce.usedTimes===0&&x(v)),E.__cacheKey=Y,E.__webglTexture=ie[Y].texture}return F}function Ne(E,v,F){return Math.floor(Math.floor(E/F)/v)}function Ue(E,v,F,q){const Y=E.updateRanges;if(Y.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,F,q,v.data);else{Y.sort((fe,ve)=>fe.start-ve.start);let Ce=0;for(let fe=1;fe<Y.length;fe++){const ve=Y[Ce],Oe=Y[fe],Le=ve.start+ve.count,Me=Ne(Oe.start,v.width,4),Ve=Ne(ve.start,v.width,4);Oe.start<=Le+1&&Me===Ve&&Ne(Oe.start+Oe.count-1,v.width,4)===Me?ve.count=Math.max(ve.count,Oe.start+Oe.count-ve.start):(++Ce,Y[Ce]=Oe)}Y.length=Ce+1;const de=i.getParameter(i.UNPACK_ROW_LENGTH),Te=i.getParameter(i.UNPACK_SKIP_PIXELS),we=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let fe=0,ve=Y.length;fe<ve;fe++){const Oe=Y[fe],Le=Math.floor(Oe.start/4),Me=Math.ceil(Oe.count/4),Ve=Le%v.width,C=Math.floor(Le/v.width),se=Me,ue=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ve),i.pixelStorei(i.UNPACK_SKIP_ROWS,C),t.texSubImage2D(i.TEXTURE_2D,0,Ve,C,se,ue,F,q,v.data)}E.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,de),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Te),i.pixelStorei(i.UNPACK_SKIP_ROWS,we)}}function $(E,v,F){let q=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=i.TEXTURE_3D);const ie=Ie(E,v),Y=v.source;t.bindTexture(q,E.__webglTexture,i.TEXTURE0+F);const Ce=n.get(Y);if(Y.version!==Ce.__version||ie===!0){t.activeTexture(i.TEXTURE0+F);const de=Qe.getPrimaries(Qe.workingColorSpace),Te=v.colorSpace===_n?null:Qe.getPrimaries(v.colorSpace),we=v.colorSpace===_n||de===Te?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);let fe=g(v.image,!1,r.maxTextureSize);fe=_e(v,fe);const ve=s.convert(v.format,v.colorSpace),Oe=s.convert(v.type);let Le=S(v.internalFormat,ve,Oe,v.colorSpace,v.isVideoTexture);ye(q,v);let Me;const Ve=v.mipmaps,C=v.isVideoTexture!==!0,se=Ce.__version===void 0||ie===!0,ue=Y.dataReady,me=I(v,fe);if(v.isDepthTexture)Le=M(v.format===Ti,v.type),se&&(C?t.texStorage2D(i.TEXTURE_2D,1,Le,fe.width,fe.height):t.texImage2D(i.TEXTURE_2D,0,Le,fe.width,fe.height,0,ve,Oe,null));else if(v.isDataTexture)if(Ve.length>0){C&&se&&t.texStorage2D(i.TEXTURE_2D,me,Le,Ve[0].width,Ve[0].height);for(let le=0,Q=Ve.length;le<Q;le++)Me=Ve[le],C?ue&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,Me.width,Me.height,ve,Oe,Me.data):t.texImage2D(i.TEXTURE_2D,le,Le,Me.width,Me.height,0,ve,Oe,Me.data);v.generateMipmaps=!1}else C?(se&&t.texStorage2D(i.TEXTURE_2D,me,Le,fe.width,fe.height),ue&&Ue(v,fe,ve,Oe)):t.texImage2D(i.TEXTURE_2D,0,Le,fe.width,fe.height,0,ve,Oe,fe.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){C&&se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,me,Le,Ve[0].width,Ve[0].height,fe.depth);for(let le=0,Q=Ve.length;le<Q;le++)if(Me=Ve[le],v.format!==Zt)if(ve!==null)if(C){if(ue)if(v.layerUpdates.size>0){const Ae=Ac(Me.width,Me.height,v.format,v.type);for(const Be of v.layerUpdates){const $e=Me.data.subarray(Be*Ae/Me.data.BYTES_PER_ELEMENT,(Be+1)*Ae/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,Be,Me.width,Me.height,1,ve,$e)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,0,Me.width,Me.height,fe.depth,ve,Me.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,le,Le,Me.width,Me.height,fe.depth,0,Me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else C?ue&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,0,Me.width,Me.height,fe.depth,ve,Oe,Me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,le,Le,Me.width,Me.height,fe.depth,0,ve,Oe,Me.data)}else{C&&se&&t.texStorage2D(i.TEXTURE_2D,me,Le,Ve[0].width,Ve[0].height);for(let le=0,Q=Ve.length;le<Q;le++)Me=Ve[le],v.format!==Zt?ve!==null?C?ue&&t.compressedTexSubImage2D(i.TEXTURE_2D,le,0,0,Me.width,Me.height,ve,Me.data):t.compressedTexImage2D(i.TEXTURE_2D,le,Le,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):C?ue&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,Me.width,Me.height,ve,Oe,Me.data):t.texImage2D(i.TEXTURE_2D,le,Le,Me.width,Me.height,0,ve,Oe,Me.data)}else if(v.isDataArrayTexture)if(C){if(se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,me,Le,fe.width,fe.height,fe.depth),ue)if(v.layerUpdates.size>0){const le=Ac(fe.width,fe.height,v.format,v.type);for(const Q of v.layerUpdates){const Ae=fe.data.subarray(Q*le/fe.data.BYTES_PER_ELEMENT,(Q+1)*le/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,fe.width,fe.height,1,ve,Oe,Ae)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,ve,Oe,fe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Le,fe.width,fe.height,fe.depth,0,ve,Oe,fe.data);else if(v.isData3DTexture)C?(se&&t.texStorage3D(i.TEXTURE_3D,me,Le,fe.width,fe.height,fe.depth),ue&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,ve,Oe,fe.data)):t.texImage3D(i.TEXTURE_3D,0,Le,fe.width,fe.height,fe.depth,0,ve,Oe,fe.data);else if(v.isFramebufferTexture){if(se)if(C)t.texStorage2D(i.TEXTURE_2D,me,Le,fe.width,fe.height);else{let le=fe.width,Q=fe.height;for(let Ae=0;Ae<me;Ae++)t.texImage2D(i.TEXTURE_2D,Ae,Le,le,Q,0,ve,Oe,null),le>>=1,Q>>=1}}else if(Ve.length>0){if(C&&se){const le=Se(Ve[0]);t.texStorage2D(i.TEXTURE_2D,me,Le,le.width,le.height)}for(let le=0,Q=Ve.length;le<Q;le++)Me=Ve[le],C?ue&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,ve,Oe,Me):t.texImage2D(i.TEXTURE_2D,le,Le,ve,Oe,Me);v.generateMipmaps=!1}else if(C){if(se){const le=Se(fe);t.texStorage2D(i.TEXTURE_2D,me,Le,le.width,le.height)}ue&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ve,Oe,fe)}else t.texImage2D(i.TEXTURE_2D,0,Le,ve,Oe,fe);m(v)&&p(q),Ce.__version=Y.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function ce(E,v,F){if(v.image.length!==6)return;const q=Ie(E,v),ie=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+F);const Y=n.get(ie);if(ie.version!==Y.__version||q===!0){t.activeTexture(i.TEXTURE0+F);const Ce=Qe.getPrimaries(Qe.workingColorSpace),de=v.colorSpace===_n?null:Qe.getPrimaries(v.colorSpace),Te=v.colorSpace===_n||Ce===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const we=v.isCompressedTexture||v.image[0].isCompressedTexture,fe=v.image[0]&&v.image[0].isDataTexture,ve=[];for(let Q=0;Q<6;Q++)!we&&!fe?ve[Q]=g(v.image[Q],!0,r.maxCubemapSize):ve[Q]=fe?v.image[Q].image:v.image[Q],ve[Q]=_e(v,ve[Q]);const Oe=ve[0],Le=s.convert(v.format,v.colorSpace),Me=s.convert(v.type),Ve=S(v.internalFormat,Le,Me,v.colorSpace),C=v.isVideoTexture!==!0,se=Y.__version===void 0||q===!0,ue=ie.dataReady;let me=I(v,Oe);ye(i.TEXTURE_CUBE_MAP,v);let le;if(we){C&&se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ve,Oe.width,Oe.height);for(let Q=0;Q<6;Q++){le=ve[Q].mipmaps;for(let Ae=0;Ae<le.length;Ae++){const Be=le[Ae];v.format!==Zt?Le!==null?C?ue&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ae,0,0,Be.width,Be.height,Le,Be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ae,Ve,Be.width,Be.height,0,Be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):C?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ae,0,0,Be.width,Be.height,Le,Me,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ae,Ve,Be.width,Be.height,0,Le,Me,Be.data)}}}else{if(le=v.mipmaps,C&&se){le.length>0&&me++;const Q=Se(ve[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ve,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(fe){C?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ve[Q].width,ve[Q].height,Le,Me,ve[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ve,ve[Q].width,ve[Q].height,0,Le,Me,ve[Q].data);for(let Ae=0;Ae<le.length;Ae++){const $e=le[Ae].image[Q].image;C?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ae+1,0,0,$e.width,$e.height,Le,Me,$e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ae+1,Ve,$e.width,$e.height,0,Le,Me,$e.data)}}else{C?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Le,Me,ve[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ve,Le,Me,ve[Q]);for(let Ae=0;Ae<le.length;Ae++){const Be=le[Ae];C?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ae+1,0,0,Le,Me,Be.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ae+1,Ve,Le,Me,Be.image[Q])}}}m(v)&&p(i.TEXTURE_CUBE_MAP),Y.__version=ie.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function ge(E,v,F,q,ie,Y){const Ce=s.convert(F.format,F.colorSpace),de=s.convert(F.type),Te=S(F.internalFormat,Ce,de,F.colorSpace),we=n.get(v),fe=n.get(F);if(fe.__renderTarget=v,!we.__hasExternalTextures){const ve=Math.max(1,v.width>>Y),Oe=Math.max(1,v.height>>Y);ie===i.TEXTURE_3D||ie===i.TEXTURE_2D_ARRAY?t.texImage3D(ie,Y,Te,ve,Oe,v.depth,0,Ce,de,null):t.texImage2D(ie,Y,Te,ve,Oe,0,Ce,de,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),Z(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,ie,fe.__webglTexture,0,W(v)):(ie===i.TEXTURE_2D||ie>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,ie,fe.__webglTexture,Y),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Pe(E,v,F){if(i.bindRenderbuffer(i.RENDERBUFFER,E),v.depthBuffer){const q=v.depthTexture,ie=q&&q.isDepthTexture?q.type:null,Y=M(v.stencilBuffer,ie),Ce=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=W(v);Z(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,de,Y,v.width,v.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,de,Y,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Y,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ce,i.RENDERBUFFER,E)}else{const q=v.textures;for(let ie=0;ie<q.length;ie++){const Y=q[ie],Ce=s.convert(Y.format,Y.colorSpace),de=s.convert(Y.type),Te=S(Y.internalFormat,Ce,de,Y.colorSpace),we=W(v);F&&Z(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,we,Te,v.width,v.height):Z(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,we,Te,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Te,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function be(E,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(v.depthTexture);q.__renderTarget=v,(!q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),H(v.depthTexture,0);const ie=q.__webglTexture,Y=W(v);if(v.depthTexture.format===Ei)Z(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ie,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ie,0);else if(v.depthTexture.format===Ti)Z(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ie,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function qe(E){const v=n.get(E),F=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){const q=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){const ie=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",ie)};q.addEventListener("dispose",ie),v.__depthDisposeCallback=ie}v.__boundDepthTexture=q}if(E.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");const q=E.texture.mipmaps;q&&q.length>0?be(v.__webglFramebuffer[0],E):be(v.__webglFramebuffer,E)}else if(F){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=i.createRenderbuffer(),Pe(v.__webglDepthbuffer[q],E,!1);else{const ie=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=v.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,ie,i.RENDERBUFFER,Y)}}else{const q=E.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Pe(v.__webglDepthbuffer,E,!1);else{const ie=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,ie,i.RENDERBUFFER,Y)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ke(E,v,F){const q=n.get(E);v!==void 0&&ge(q.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&qe(E)}function D(E){const v=E.texture,F=n.get(E),q=n.get(v);E.addEventListener("dispose",L);const ie=E.textures,Y=E.isWebGLCubeRenderTarget===!0,Ce=ie.length>1;if(Ce||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=v.version,a.memory.textures++),Y){F.__webglFramebuffer=[];for(let de=0;de<6;de++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[de]=[];for(let Te=0;Te<v.mipmaps.length;Te++)F.__webglFramebuffer[de][Te]=i.createFramebuffer()}else F.__webglFramebuffer[de]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let de=0;de<v.mipmaps.length;de++)F.__webglFramebuffer[de]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Ce)for(let de=0,Te=ie.length;de<Te;de++){const we=n.get(ie[de]);we.__webglTexture===void 0&&(we.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&Z(E)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let de=0;de<ie.length;de++){const Te=ie[de];F.__webglColorRenderbuffer[de]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[de]);const we=s.convert(Te.format,Te.colorSpace),fe=s.convert(Te.type),ve=S(Te.internalFormat,we,fe,Te.colorSpace,E.isXRRenderTarget===!0),Oe=W(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Oe,ve,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,F.__webglColorRenderbuffer[de])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Pe(F.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),ye(i.TEXTURE_CUBE_MAP,v);for(let de=0;de<6;de++)if(v.mipmaps&&v.mipmaps.length>0)for(let Te=0;Te<v.mipmaps.length;Te++)ge(F.__webglFramebuffer[de][Te],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Te);else ge(F.__webglFramebuffer[de],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);m(v)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ce){for(let de=0,Te=ie.length;de<Te;de++){const we=ie[de],fe=n.get(we);let ve=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ve=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ve,fe.__webglTexture),ye(ve,we),ge(F.__webglFramebuffer,E,we,i.COLOR_ATTACHMENT0+de,ve,0),m(we)&&p(ve)}t.unbindTexture()}else{let de=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(de=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(de,q.__webglTexture),ye(de,v),v.mipmaps&&v.mipmaps.length>0)for(let Te=0;Te<v.mipmaps.length;Te++)ge(F.__webglFramebuffer[Te],E,v,i.COLOR_ATTACHMENT0,de,Te);else ge(F.__webglFramebuffer,E,v,i.COLOR_ATTACHMENT0,de,0);m(v)&&p(de),t.unbindTexture()}E.depthBuffer&&qe(E)}function oe(E){const v=E.textures;for(let F=0,q=v.length;F<q;F++){const ie=v[F];if(m(ie)){const Y=T(E),Ce=n.get(ie).__webglTexture;t.bindTexture(Y,Ce),p(Y),t.unbindTexture()}}}const ne=[],te=[];function P(E){if(E.samples>0){if(Z(E)===!1){const v=E.textures,F=E.width,q=E.height;let ie=i.COLOR_BUFFER_BIT;const Y=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ce=n.get(E),de=v.length>1;if(de)for(let we=0;we<v.length;we++)t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer);const Te=E.texture.mipmaps;Te&&Te.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let we=0;we<v.length;we++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(ie|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(ie|=i.STENCIL_BUFFER_BIT)),de){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[we]);const fe=n.get(v[we]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,fe,0)}i.blitFramebuffer(0,0,F,q,0,0,F,q,ie,i.NEAREST),l===!0&&(ne.length=0,te.length=0,ne.push(i.COLOR_ATTACHMENT0+we),E.depthBuffer&&E.resolveDepthBuffer===!1&&(ne.push(Y),te.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,te)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ne))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),de)for(let we=0;we<v.length;we++){t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[we]);const fe=n.get(v[we]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,fe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const v=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function W(E){return Math.min(r.maxSamples,E.samples)}function Z(E){const v=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function re(E){const v=a.render.frame;u.get(E)!==v&&(u.set(E,v),E.update())}function _e(E,v){const F=E.colorSpace,q=E.format,ie=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||F!==ti&&F!==_n&&(Qe.getTransfer(F)===it?(q!==Zt||ie!==sn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}function Se(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=U,this.setTexture2D=H,this.setTexture2DArray=k,this.setTexture3D=K,this.setTextureCube=X,this.rebindTextures=Ke,this.setupRenderTarget=D,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=P,this.setupDepthRenderbuffer=qe,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=Z}function bu(i,e){function t(n,r=_n){let s;const a=Qe.getTransfer(r);if(n===sn)return i.UNSIGNED_BYTE;if(n===Hs)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ws)return i.UNSIGNED_SHORT_5_5_5_1;if(n===go)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===xo)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===mo)return i.BYTE;if(n===_o)return i.SHORT;if(n===bi)return i.UNSIGNED_SHORT;if(n===Vs)return i.INT;if(n===Ln)return i.UNSIGNED_INT;if(n===nn)return i.FLOAT;if(n===Di)return i.HALF_FLOAT;if(n===yo)return i.ALPHA;if(n===vo)return i.RGB;if(n===Zt)return i.RGBA;if(n===Ei)return i.DEPTH_COMPONENT;if(n===Ti)return i.DEPTH_STENCIL;if(n===Xs)return i.RED;if(n===qs)return i.RED_INTEGER;if(n===Mo)return i.RG;if(n===Ys)return i.RG_INTEGER;if(n===Zs)return i.RGBA_INTEGER;if(n===Ji||n===$i||n===Qi||n===er)if(a===it)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ji)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===$i)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Qi)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===er)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ji)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===$i)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Qi)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===er)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===os||n===cs||n===ls||n===us)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===os)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===cs)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ls)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===us)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===hs||n===fs||n===ds)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===hs||n===fs)return a===it?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ds)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ps||n===ms||n===_s||n===gs||n===xs||n===ys||n===vs||n===Ms||n===bs||n===Ss||n===Es||n===Ts||n===ws||n===As)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ps)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ms)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===_s)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===gs)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===xs)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ys)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===vs)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ms)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===bs)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ss)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Es)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ts)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ws)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===As)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Cs||n===Rs||n===Ps)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Cs)return a===it?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Rs)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ps)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ds||n===Ls||n===Is||n===Us)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Ds)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ls)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Is)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Us)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Si?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const I0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,U0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class N0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Lo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Mn({vertexShader:I0,fragmentShader:U0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new tt(new Ii(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class O0 extends Nn{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,_=null;const g=typeof XRWebGLBinding<"u",m=new N0,p={},T=t.getContextAttributes();let S=null,M=null;const I=[],A=[],L=new he;let N=null;const x=new It;x.viewport=new rt;const y=new It;y.viewport=new rt;const w=[x,y],U=new mu;let O=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ce=I[$];return ce===void 0&&(ce=new qr,I[$]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function($){let ce=I[$];return ce===void 0&&(ce=new qr,I[$]=ce),ce.getGripSpace()},this.getHand=function($){let ce=I[$];return ce===void 0&&(ce=new qr,I[$]=ce),ce.getHandSpace()};function H($){const ce=A.indexOf($.inputSource);if(ce===-1)return;const ge=I[ce];ge!==void 0&&(ge.update($.inputSource,$.frame,c||a),ge.dispatchEvent({type:$.type,data:$.inputSource}))}function k(){r.removeEventListener("select",H),r.removeEventListener("selectstart",H),r.removeEventListener("selectend",H),r.removeEventListener("squeeze",H),r.removeEventListener("squeezestart",H),r.removeEventListener("squeezeend",H),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",K);for(let $=0;$<I.length;$++){const ce=A[$];ce!==null&&(A[$]=null,I[$].disconnect(ce))}O=null,z=null,m.reset();for(const $ in p)delete p[$];e.setRenderTarget(S),d=null,f=null,h=null,r=null,M=null,Ue.stop(),n.isPresenting=!1,e.setPixelRatio(N),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&g&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",H),r.addEventListener("selectstart",H),r.addEventListener("selectend",H),r.addEventListener("squeeze",H),r.addEventListener("squeezestart",H),r.addEventListener("squeezeend",H),r.addEventListener("end",k),r.addEventListener("inputsourceschange",K),T.xrCompatible!==!0&&await t.makeXRCompatible(),N=e.getPixelRatio(),e.getSize(L),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let ge=null,Pe=null,be=null;T.depth&&(be=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=T.stencil?Ti:Ei,Pe=T.stencil?Si:Ln);const qe={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:s};h=this.getBinding(),f=h.createProjectionLayer(qe),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),M=new Un(f.textureWidth,f.textureHeight,{format:Zt,type:sn,depthTexture:new Do(f.textureWidth,f.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ge={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,ge),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new Un(d.framebufferWidth,d.framebufferHeight,{format:Zt,type:sn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ue.setContext(r),Ue.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function K($){for(let ce=0;ce<$.removed.length;ce++){const ge=$.removed[ce],Pe=A.indexOf(ge);Pe>=0&&(A[Pe]=null,I[Pe].disconnect(ge))}for(let ce=0;ce<$.added.length;ce++){const ge=$.added[ce];let Pe=A.indexOf(ge);if(Pe===-1){for(let qe=0;qe<I.length;qe++)if(qe>=A.length){A.push(ge),Pe=qe;break}else if(A[qe]===null){A[qe]=ge,Pe=qe;break}if(Pe===-1)break}const be=I[Pe];be&&be.connect(ge)}}const X=new R,V=new R;function ee($,ce,ge){X.setFromMatrixPosition(ce.matrixWorld),V.setFromMatrixPosition(ge.matrixWorld);const Pe=X.distanceTo(V),be=ce.projectionMatrix.elements,qe=ge.projectionMatrix.elements,Ke=be[14]/(be[10]-1),D=be[14]/(be[10]+1),oe=(be[9]+1)/be[5],ne=(be[9]-1)/be[5],te=(be[8]-1)/be[0],P=(qe[8]+1)/qe[0],W=Ke*te,Z=Ke*P,re=Pe/(-te+P),_e=re*-te;if(ce.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(_e),$.translateZ(re),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),be[10]===-1)$.projectionMatrix.copy(ce.projectionMatrix),$.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const Se=Ke+re,E=D+re,v=W-_e,F=Z+(Pe-_e),q=oe*D/E*Se,ie=ne*D/E*Se;$.projectionMatrix.makePerspective(v,F,q,ie,Se,E),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ae($,ce){ce===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ce.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let ce=$.near,ge=$.far;m.texture!==null&&(m.depthNear>0&&(ce=m.depthNear),m.depthFar>0&&(ge=m.depthFar)),U.near=y.near=x.near=ce,U.far=y.far=x.far=ge,(O!==U.near||z!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),O=U.near,z=U.far),U.layers.mask=$.layers.mask|6,x.layers.mask=U.layers.mask&3,y.layers.mask=U.layers.mask&5;const Pe=$.parent,be=U.cameras;ae(U,Pe);for(let qe=0;qe<be.length;qe++)ae(be[qe],Pe);be.length===2?ee(U,x,y):U.projectionMatrix.copy(x.projectionMatrix),ye($,U,Pe)};function ye($,ce,ge){ge===null?$.matrix.copy(ce.matrixWorld):($.matrix.copy(ge.matrixWorld),$.matrix.invert(),$.matrix.multiply(ce.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ce.projectionMatrix),$.projectionMatrixInverse.copy(ce.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=to*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function($){return p[$]};let Ie=null;function Ne($,ce){if(u=ce.getViewerPose(c||a),_=ce,u!==null){const ge=u.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let Pe=!1;ge.length!==U.cameras.length&&(U.cameras.length=0,Pe=!0);for(let D=0;D<ge.length;D++){const oe=ge[D];let ne=null;if(d!==null)ne=d.getViewport(oe);else{const P=h.getViewSubImage(f,oe);ne=P.viewport,D===0&&(e.setRenderTargetTextures(M,P.colorTexture,P.depthStencilTexture),e.setRenderTarget(M))}let te=w[D];te===void 0&&(te=new It,te.layers.enable(D),te.viewport=new rt,w[D]=te),te.matrix.fromArray(oe.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(oe.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(ne.x,ne.y,ne.width,ne.height),D===0&&(U.matrix.copy(te.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Pe===!0&&U.cameras.push(te)}const be=r.enabledFeatures;if(be&&be.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&g){h=n.getBinding();const D=h.getDepthInformation(ge[0]);D&&D.isValid&&D.texture&&m.init(D,r.renderState)}if(be&&be.includes("camera-access")&&g){e.state.unbindTexture(),h=n.getBinding();for(let D=0;D<ge.length;D++){const oe=ge[D].camera;if(oe){let ne=p[oe];ne||(ne=new Lo,p[oe]=ne);const te=h.getCameraImage(oe);ne.sourceTexture=te}}}}for(let ge=0;ge<I.length;ge++){const Pe=A[ge],be=I[ge];Pe!==null&&be!==void 0&&be.update(Pe,ce,c||a)}Ie&&Ie($,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),_=null}const Ue=new gu;Ue.setAnimationLoop(Ne),this.setAnimationLoop=function($){Ie=$},this.dispose=function(){}}}const Wn=new jt,F0=new nt;function B0(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Kl(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,T,S,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,M)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,T,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===St&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===St&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const T=e.get(p),S=T.envMap,M=T.envMapRotation;S&&(m.envMap.value=S,Wn.copy(M),Wn.x*=-1,Wn.y*=-1,Wn.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Wn.y*=-1,Wn.z*=-1),m.envMapRotation.value.setFromMatrix4(F0.makeRotationFromEuler(Wn)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,T,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===St&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const T=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function z0(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,S){const M=S.program;n.uniformBlockBinding(T,M)}function c(T,S){let M=r[T.id];M===void 0&&(_(T),M=u(T),r[T.id]=M,T.addEventListener("dispose",m));const I=S.program;n.updateUBOMapping(T,I);const A=e.render.frame;s[T.id]!==A&&(f(T),s[T.id]=A)}function u(T){const S=h();T.__bindingPointIndex=S;const M=i.createBuffer(),I=T.__size,A=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,I,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,M),M}function h(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const S=r[T.id],M=T.uniforms,I=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let A=0,L=M.length;A<L;A++){const N=Array.isArray(M[A])?M[A]:[M[A]];for(let x=0,y=N.length;x<y;x++){const w=N[x];if(d(w,A,x,I)===!0){const U=w.__offset,O=Array.isArray(w.value)?w.value:[w.value];let z=0;for(let H=0;H<O.length;H++){const k=O[H],K=g(k);typeof k=="number"||typeof k=="boolean"?(w.__data[0]=k,i.bufferSubData(i.UNIFORM_BUFFER,U+z,w.__data)):k.isMatrix3?(w.__data[0]=k.elements[0],w.__data[1]=k.elements[1],w.__data[2]=k.elements[2],w.__data[3]=0,w.__data[4]=k.elements[3],w.__data[5]=k.elements[4],w.__data[6]=k.elements[5],w.__data[7]=0,w.__data[8]=k.elements[6],w.__data[9]=k.elements[7],w.__data[10]=k.elements[8],w.__data[11]=0):(k.toArray(w.__data,z),z+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,w.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(T,S,M,I){const A=T.value,L=S+"_"+M;if(I[L]===void 0)return typeof A=="number"||typeof A=="boolean"?I[L]=A:I[L]=A.clone(),!0;{const N=I[L];if(typeof A=="number"||typeof A=="boolean"){if(N!==A)return I[L]=A,!0}else if(N.equals(A)===!1)return N.copy(A),!0}return!1}function _(T){const S=T.uniforms;let M=0;const I=16;for(let L=0,N=S.length;L<N;L++){const x=Array.isArray(S[L])?S[L]:[S[L]];for(let y=0,w=x.length;y<w;y++){const U=x[y],O=Array.isArray(U.value)?U.value:[U.value];for(let z=0,H=O.length;z<H;z++){const k=O[z],K=g(k),X=M%I,V=X%K.boundary,ee=X+V;M+=V,ee!==0&&I-ee<K.storage&&(M+=I-ee),U.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=M,M+=K.storage}}}const A=M%I;return A>0&&(M+=I-A),T.__size=M,T.__cache={},this}function g(T){const S={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(S.boundary=4,S.storage=4):T.isVector2?(S.boundary=8,S.storage=8):T.isVector3||T.isColor?(S.boundary=16,S.storage=12):T.isVector4?(S.boundary=16,S.storage=16):T.isMatrix3?(S.boundary=48,S.storage=48):T.isMatrix4?(S.boundary=64,S.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),S}function m(T){const S=T.target;S.removeEventListener("dispose",m);const M=a.indexOf(S.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function p(){for(const T in r)i.deleteBuffer(r[T]);a=[],r={},s={}}return{bind:l,update:c,dispose:p}}class Su{constructor(e={}){const{canvas:t=Xl(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const T=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let I=!1;this._outputColorSpace=Lt;let A=0,L=0,N=null,x=-1,y=null;const w=new rt,U=new rt;let O=null;const z=new Ze(0);let H=0,k=t.width,K=t.height,X=1,V=null,ee=null;const ae=new rt(0,0,k,K),ye=new rt(0,0,k,K);let Ie=!1;const Ne=new $s;let Ue=!1,$=!1;const ce=new nt,ge=new R,Pe=new rt,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qe=!1;function Ke(){return N===null?X:1}let D=n;function oe(b,B){return t.getContext(b,B)}try{const b={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ks}`),t.addEventListener("webglcontextlost",ue,!1),t.addEventListener("webglcontextrestored",me,!1),t.addEventListener("webglcontextcreationerror",le,!1),D===null){const B="webgl2";if(D=oe(B,b),D===null)throw oe(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let ne,te,P,W,Z,re,_e,Se,E,v,F,q,ie,Y,Ce,de,Te,we,fe,ve,Oe,Le,Me,Ve;function C(){ne=new Jp(D),ne.init(),Le=new bu(D,ne),te=new Wp(D,ne,e,Le),P=new D0(D,ne),te.reversedDepthBuffer&&f&&P.buffers.depth.setReversed(!0),W=new em(D),Z=new x0,re=new L0(D,ne,P,Z,te,Le,W),_e=new qp(M),Se=new Kp(M),E=new af(D),Me=new Vp(D,E),v=new $p(D,E,W,Me),F=new nm(D,v,E,W),fe=new tm(D,te,re),de=new Xp(Z),q=new g0(M,_e,Se,ne,te,Me,de),ie=new B0(M,Z),Y=new v0,Ce=new w0(ne),we=new Gp(M,_e,Se,P,F,d,l),Te=new R0(M,F,te),Ve=new z0(D,W,te,P),ve=new Hp(D,ne,W),Oe=new Qp(D,ne,W),W.programs=q.programs,M.capabilities=te,M.extensions=ne,M.properties=Z,M.renderLists=Y,M.shadowMap=Te,M.state=P,M.info=W}C();const se=new O0(M,D);this.xr=se,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const b=ne.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=ne.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(b){b!==void 0&&(X=b,this.setSize(k,K,!1))},this.getSize=function(b){return b.set(k,K)},this.setSize=function(b,B,j=!0){if(se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=b,K=B,t.width=Math.floor(b*X),t.height=Math.floor(B*X),j===!0&&(t.style.width=b+"px",t.style.height=B+"px"),this.setViewport(0,0,b,B)},this.getDrawingBufferSize=function(b){return b.set(k*X,K*X).floor()},this.setDrawingBufferSize=function(b,B,j){k=b,K=B,X=j,t.width=Math.floor(b*j),t.height=Math.floor(B*j),this.setViewport(0,0,b,B)},this.getCurrentViewport=function(b){return b.copy(w)},this.getViewport=function(b){return b.copy(ae)},this.setViewport=function(b,B,j,J){b.isVector4?ae.set(b.x,b.y,b.z,b.w):ae.set(b,B,j,J),P.viewport(w.copy(ae).multiplyScalar(X).round())},this.getScissor=function(b){return b.copy(ye)},this.setScissor=function(b,B,j,J){b.isVector4?ye.set(b.x,b.y,b.z,b.w):ye.set(b,B,j,J),P.scissor(U.copy(ye).multiplyScalar(X).round())},this.getScissorTest=function(){return Ie},this.setScissorTest=function(b){P.setScissorTest(Ie=b)},this.setOpaqueSort=function(b){V=b},this.setTransparentSort=function(b){ee=b},this.getClearColor=function(b){return b.copy(we.getClearColor())},this.setClearColor=function(){we.setClearColor(...arguments)},this.getClearAlpha=function(){return we.getClearAlpha()},this.setClearAlpha=function(){we.setClearAlpha(...arguments)},this.clear=function(b=!0,B=!0,j=!0){let J=0;if(b){let G=!1;if(N!==null){const pe=N.texture.format;G=pe===Zs||pe===Ys||pe===qs}if(G){const pe=N.texture.type,Ee=pe===sn||pe===Ln||pe===bi||pe===Si||pe===Hs||pe===Ws,De=we.getClearColor(),Re=we.getClearAlpha(),ke=De.r,Ge=De.g,Fe=De.b;Ee?(_[0]=ke,_[1]=Ge,_[2]=Fe,_[3]=Re,D.clearBufferuiv(D.COLOR,0,_)):(g[0]=ke,g[1]=Ge,g[2]=Fe,g[3]=Re,D.clearBufferiv(D.COLOR,0,g))}else J|=D.COLOR_BUFFER_BIT}B&&(J|=D.DEPTH_BUFFER_BIT),j&&(J|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ue,!1),t.removeEventListener("webglcontextrestored",me,!1),t.removeEventListener("webglcontextcreationerror",le,!1),we.dispose(),Y.dispose(),Ce.dispose(),Z.dispose(),_e.dispose(),Se.dispose(),F.dispose(),Me.dispose(),Ve.dispose(),q.dispose(),se.dispose(),se.removeEventListener("sessionstart",Ot),se.removeEventListener("sessionend",Ni),Gt.stop()};function ue(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function me(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const b=W.autoReset,B=Te.enabled,j=Te.autoUpdate,J=Te.needsUpdate,G=Te.type;C(),W.autoReset=b,Te.enabled=B,Te.autoUpdate=j,Te.needsUpdate=J,Te.type=G}function le(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Q(b){const B=b.target;B.removeEventListener("dispose",Q),Ae(B)}function Ae(b){Be(b),Z.remove(b)}function Be(b){const B=Z.get(b).programs;B!==void 0&&(B.forEach(function(j){q.releaseProgram(j)}),b.isShaderMaterial&&q.releaseShaderCache(b))}this.renderBufferDirect=function(b,B,j,J,G,pe){B===null&&(B=be);const Ee=G.isMesh&&G.matrixWorld.determinant()<0,De=Au(b,B,j,J,G);P.setMaterial(J,Ee);let Re=j.index,ke=1;if(J.wireframe===!0){if(Re=v.getWireframeAttribute(j),Re===void 0)return;ke=2}const Ge=j.drawRange,Fe=j.attributes.position;let Je=Ge.start*ke,st=(Ge.start+Ge.count)*ke;pe!==null&&(Je=Math.max(Je,pe.start*ke),st=Math.min(st,(pe.start+pe.count)*ke)),Re!==null?(Je=Math.max(Je,0),st=Math.min(st,Re.count)):Fe!=null&&(Je=Math.max(Je,0),st=Math.min(st,Fe.count));const dt=st-Je;if(dt<0||dt===1/0)return;Me.setup(G,J,De,j,Re);let ct,ot=ve;if(Re!==null&&(ct=E.get(Re),ot=Oe,ot.setIndex(ct)),G.isMesh)J.wireframe===!0?(P.setLineWidth(J.wireframeLinewidth*Ke()),ot.setMode(D.LINES)):ot.setMode(D.TRIANGLES);else if(G.isLine){let ze=J.linewidth;ze===void 0&&(ze=1),P.setLineWidth(ze*Ke()),G.isLineSegments?ot.setMode(D.LINES):G.isLineLoop?ot.setMode(D.LINE_LOOP):ot.setMode(D.LINE_STRIP)}else G.isPoints?ot.setMode(D.POINTS):G.isSprite&&ot.setMode(D.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)ar("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ot.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(ne.get("WEBGL_multi_draw"))ot.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const ze=G._multiDrawStarts,ut=G._multiDrawCounts,et=G._multiDrawCount,Ft=Re?E.get(Re).bytesPerElement:1,ri=Z.get(J).currentProgram.getUniforms();for(let Bt=0;Bt<et;Bt++)ri.setValue(D,"_gl_DrawID",Bt),ot.render(ze[Bt]/Ft,ut[Bt])}else if(G.isInstancedMesh)ot.renderInstances(Je,dt,G.count);else if(j.isInstancedBufferGeometry){const ze=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,ut=Math.min(j.instanceCount,ze);ot.renderInstances(Je,dt,ut)}else ot.render(Je,dt)};function $e(b,B,j){b.transparent===!0&&b.side===qt&&b.forceSinglePass===!1?(b.side=St,b.needsUpdate=!0,pr(b,B,j),b.side=vn,b.needsUpdate=!0,pr(b,B,j),b.side=qt):pr(b,B,j)}this.compile=function(b,B,j=null){j===null&&(j=b),p=Ce.get(j),p.init(B),S.push(p),j.traverseVisible(function(G){G.isLight&&G.layers.test(B.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),b!==j&&b.traverseVisible(function(G){G.isLight&&G.layers.test(B.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),p.setupLights();const J=new Set;return b.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const pe=G.material;if(pe)if(Array.isArray(pe))for(let Ee=0;Ee<pe.length;Ee++){const De=pe[Ee];$e(De,j,G),J.add(De)}else $e(pe,j,G),J.add(pe)}),p=S.pop(),J},this.compileAsync=function(b,B,j=null){const J=this.compile(b,B,j);return new Promise(G=>{function pe(){if(J.forEach(function(Ee){Z.get(Ee).currentProgram.isReady()&&J.delete(Ee)}),J.size===0){G(b);return}setTimeout(pe,10)}ne.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let He=null;function At(b){He&&He(b)}function Ot(){Gt.stop()}function Ni(){Gt.start()}const Gt=new gu;Gt.setAnimationLoop(At),typeof self<"u"&&Gt.setContext(self),this.setAnimationLoop=function(b){He=b,se.setAnimationLoop(b),b===null?Gt.stop():Gt.start()},se.addEventListener("sessionstart",Ot),se.addEventListener("sessionend",Ni),this.render=function(b,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(B),B=se.getCamera()),b.isScene===!0&&b.onBeforeRender(M,b,B,N),p=Ce.get(b,S.length),p.init(B),S.push(p),ce.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Ne.setFromProjectionMatrix(ce,rn,B.reversedDepth),$=this.localClippingEnabled,Ue=de.init(this.clippingPlanes,$),m=Y.get(b,T.length),m.init(),T.push(m),se.enabled===!0&&se.isPresenting===!0){const pe=M.xr.getDepthSensingMesh();pe!==null&&Fn(pe,B,-1/0,M.sortObjects)}Fn(b,B,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(V,ee),qe=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,qe&&we.addToRenderList(m,b),this.info.render.frame++,Ue===!0&&de.beginShadows();const j=p.state.shadowsArray;Te.render(j,b,B),Ue===!0&&de.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=m.opaque,G=m.transmissive;if(p.setupLights(),B.isArrayCamera){const pe=B.cameras;if(G.length>0)for(let Ee=0,De=pe.length;Ee<De;Ee++){const Re=pe[Ee];Wo(J,G,b,Re)}qe&&we.render(b);for(let Ee=0,De=pe.length;Ee<De;Ee++){const Re=pe[Ee];Oi(m,b,Re,Re.viewport)}}else G.length>0&&Wo(J,G,b,B),qe&&we.render(b),Oi(m,b,B);N!==null&&L===0&&(re.updateMultisampleRenderTarget(N),re.updateRenderTargetMipmap(N)),b.isScene===!0&&b.onAfterRender(M,b,B),Me.resetDefaultState(),x=-1,y=null,S.pop(),S.length>0?(p=S[S.length-1],Ue===!0&&de.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function Fn(b,B,j,J){if(b.visible===!1)return;if(b.layers.test(B.layers)){if(b.isGroup)j=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(B);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Ne.intersectsSprite(b)){J&&Pe.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ce);const Ee=F.update(b),De=b.material;De.visible&&m.push(b,Ee,De,j,Pe.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Ne.intersectsObject(b))){const Ee=F.update(b),De=b.material;if(J&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Pe.copy(b.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),Pe.copy(Ee.boundingSphere.center)),Pe.applyMatrix4(b.matrixWorld).applyMatrix4(ce)),Array.isArray(De)){const Re=Ee.groups;for(let ke=0,Ge=Re.length;ke<Ge;ke++){const Fe=Re[ke],Je=De[Fe.materialIndex];Je&&Je.visible&&m.push(b,Ee,Je,j,Pe.z,Fe)}}else De.visible&&m.push(b,Ee,De,j,Pe.z,null)}}const pe=b.children;for(let Ee=0,De=pe.length;Ee<De;Ee++)Fn(pe[Ee],B,j,J)}function Oi(b,B,j,J){const G=b.opaque,pe=b.transmissive,Ee=b.transparent;p.setupLightsView(j),Ue===!0&&de.setGlobalState(M.clippingPlanes,j),J&&P.viewport(w.copy(J)),G.length>0&&dr(G,B,j),pe.length>0&&dr(pe,B,j),Ee.length>0&&dr(Ee,B,j),P.buffers.depth.setTest(!0),P.buffers.depth.setMask(!0),P.buffers.color.setMask(!0),P.setPolygonOffset(!1)}function Wo(b,B,j,J){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[J.id]===void 0&&(p.state.transmissionRenderTarget[J.id]=new Un(1,1,{generateMipmaps:!0,type:ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float")?Di:sn,minFilter:Dn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));const pe=p.state.transmissionRenderTarget[J.id],Ee=J.viewport||w;pe.setSize(Ee.z*M.transmissionResolutionScale,Ee.w*M.transmissionResolutionScale);const De=M.getRenderTarget(),Re=M.getActiveCubeFace(),ke=M.getActiveMipmapLevel();M.setRenderTarget(pe),M.getClearColor(z),H=M.getClearAlpha(),H<1&&M.setClearColor(16777215,.5),M.clear(),qe&&we.render(j);const Ge=M.toneMapping;M.toneMapping=xn;const Fe=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),p.setupLightsView(J),Ue===!0&&de.setGlobalState(M.clippingPlanes,J),dr(b,j,J),re.updateMultisampleRenderTarget(pe),re.updateRenderTargetMipmap(pe),ne.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let st=0,dt=B.length;st<dt;st++){const ct=B[st],ot=ct.object,ze=ct.geometry,ut=ct.material,et=ct.group;if(ut.side===qt&&ot.layers.test(J.layers)){const Ft=ut.side;ut.side=St,ut.needsUpdate=!0,Xo(ot,j,J,ze,ut,et),ut.side=Ft,ut.needsUpdate=!0,Je=!0}}Je===!0&&(re.updateMultisampleRenderTarget(pe),re.updateRenderTargetMipmap(pe))}M.setRenderTarget(De,Re,ke),M.setClearColor(z,H),Fe!==void 0&&(J.viewport=Fe),M.toneMapping=Ge}function dr(b,B,j){const J=B.isScene===!0?B.overrideMaterial:null;for(let G=0,pe=b.length;G<pe;G++){const Ee=b[G],De=Ee.object,Re=Ee.geometry,ke=Ee.group;let Ge=Ee.material;Ge.allowOverride===!0&&J!==null&&(Ge=J),De.layers.test(j.layers)&&Xo(De,B,j,Re,Ge,ke)}}function Xo(b,B,j,J,G,pe){b.onBeforeRender(M,B,j,J,G,pe),b.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),G.onBeforeRender(M,B,j,J,b,pe),G.transparent===!0&&G.side===qt&&G.forceSinglePass===!1?(G.side=St,G.needsUpdate=!0,M.renderBufferDirect(j,B,J,G,b,pe),G.side=vn,G.needsUpdate=!0,M.renderBufferDirect(j,B,J,G,b,pe),G.side=qt):M.renderBufferDirect(j,B,J,G,b,pe),b.onAfterRender(M,B,j,J,G,pe)}function pr(b,B,j){B.isScene!==!0&&(B=be);const J=Z.get(b),G=p.state.lights,pe=p.state.shadowsArray,Ee=G.state.version,De=q.getParameters(b,G.state,pe,B,j),Re=q.getProgramCacheKey(De);let ke=J.programs;J.environment=b.isMeshStandardMaterial?B.environment:null,J.fog=B.fog,J.envMap=(b.isMeshStandardMaterial?Se:_e).get(b.envMap||J.environment),J.envMapRotation=J.environment!==null&&b.envMap===null?B.environmentRotation:b.envMapRotation,ke===void 0&&(b.addEventListener("dispose",Q),ke=new Map,J.programs=ke);let Ge=ke.get(Re);if(Ge!==void 0){if(J.currentProgram===Ge&&J.lightsStateVersion===Ee)return Yo(b,De),Ge}else De.uniforms=q.getUniforms(b),b.onBeforeCompile(De,M),Ge=q.acquireProgram(De,Re),ke.set(Re,Ge),J.uniforms=De.uniforms;const Fe=J.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Fe.clippingPlanes=de.uniform),Yo(b,De),J.needsLights=Ru(b),J.lightsStateVersion=Ee,J.needsLights&&(Fe.ambientLightColor.value=G.state.ambient,Fe.lightProbe.value=G.state.probe,Fe.directionalLights.value=G.state.directional,Fe.directionalLightShadows.value=G.state.directionalShadow,Fe.spotLights.value=G.state.spot,Fe.spotLightShadows.value=G.state.spotShadow,Fe.rectAreaLights.value=G.state.rectArea,Fe.ltc_1.value=G.state.rectAreaLTC1,Fe.ltc_2.value=G.state.rectAreaLTC2,Fe.pointLights.value=G.state.point,Fe.pointLightShadows.value=G.state.pointShadow,Fe.hemisphereLights.value=G.state.hemi,Fe.directionalShadowMap.value=G.state.directionalShadowMap,Fe.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Fe.spotShadowMap.value=G.state.spotShadowMap,Fe.spotLightMatrix.value=G.state.spotLightMatrix,Fe.spotLightMap.value=G.state.spotLightMap,Fe.pointShadowMap.value=G.state.pointShadowMap,Fe.pointShadowMatrix.value=G.state.pointShadowMatrix),J.currentProgram=Ge,J.uniformsList=null,Ge}function qo(b){if(b.uniformsList===null){const B=b.currentProgram.getUniforms();b.uniformsList=Yr.seqWithValue(B.seq,b.uniforms)}return b.uniformsList}function Yo(b,B){const j=Z.get(b);j.outputColorSpace=B.outputColorSpace,j.batching=B.batching,j.batchingColor=B.batchingColor,j.instancing=B.instancing,j.instancingColor=B.instancingColor,j.instancingMorph=B.instancingMorph,j.skinning=B.skinning,j.morphTargets=B.morphTargets,j.morphNormals=B.morphNormals,j.morphColors=B.morphColors,j.morphTargetsCount=B.morphTargetsCount,j.numClippingPlanes=B.numClippingPlanes,j.numIntersection=B.numClipIntersection,j.vertexAlphas=B.vertexAlphas,j.vertexTangents=B.vertexTangents,j.toneMapping=B.toneMapping}function Au(b,B,j,J,G){B.isScene!==!0&&(B=be),re.resetTextureUnits();const pe=B.fog,Ee=J.isMeshStandardMaterial?B.environment:null,De=N===null?M.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:ti,Re=(J.isMeshStandardMaterial?Se:_e).get(J.envMap||Ee),ke=J.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Ge=!!j.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Fe=!!j.morphAttributes.position,Je=!!j.morphAttributes.normal,st=!!j.morphAttributes.color;let dt=xn;J.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(dt=M.toneMapping);const ct=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ot=ct!==void 0?ct.length:0,ze=Z.get(J),ut=p.state.lights;if(Ue===!0&&($===!0||b!==y)){const Tt=b===y&&J.id===x;de.setState(J,b,Tt)}let et=!1;J.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==ut.state.version||ze.outputColorSpace!==De||G.isBatchedMesh&&ze.batching===!1||!G.isBatchedMesh&&ze.batching===!0||G.isBatchedMesh&&ze.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&ze.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&ze.instancing===!1||!G.isInstancedMesh&&ze.instancing===!0||G.isSkinnedMesh&&ze.skinning===!1||!G.isSkinnedMesh&&ze.skinning===!0||G.isInstancedMesh&&ze.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&ze.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&ze.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&ze.instancingMorph===!1&&G.morphTexture!==null||ze.envMap!==Re||J.fog===!0&&ze.fog!==pe||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==de.numPlanes||ze.numIntersection!==de.numIntersection)||ze.vertexAlphas!==ke||ze.vertexTangents!==Ge||ze.morphTargets!==Fe||ze.morphNormals!==Je||ze.morphColors!==st||ze.toneMapping!==dt||ze.morphTargetsCount!==ot)&&(et=!0):(et=!0,ze.__version=J.version);let Ft=ze.currentProgram;et===!0&&(Ft=pr(J,B,G));let ri=!1,Bt=!1,Fi=!1;const ht=Ft.getUniforms(),Vt=ze.uniforms;if(P.useProgram(Ft.program)&&(ri=!0,Bt=!0,Fi=!0),J.id!==x&&(x=J.id,Bt=!0),ri||y!==b){P.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ht.setValue(D,"projectionMatrix",b.projectionMatrix),ht.setValue(D,"viewMatrix",b.matrixWorldInverse);const Ct=ht.map.cameraPosition;Ct!==void 0&&Ct.setValue(D,ge.setFromMatrixPosition(b.matrixWorld)),te.logarithmicDepthBuffer&&ht.setValue(D,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&ht.setValue(D,"isOrthographic",b.isOrthographicCamera===!0),y!==b&&(y=b,Bt=!0,Fi=!0)}if(G.isSkinnedMesh){ht.setOptional(D,G,"bindMatrix"),ht.setOptional(D,G,"bindMatrixInverse");const Tt=G.skeleton;Tt&&(Tt.boneTexture===null&&Tt.computeBoneTexture(),ht.setValue(D,"boneTexture",Tt.boneTexture,re))}G.isBatchedMesh&&(ht.setOptional(D,G,"batchingTexture"),ht.setValue(D,"batchingTexture",G._matricesTexture,re),ht.setOptional(D,G,"batchingIdTexture"),ht.setValue(D,"batchingIdTexture",G._indirectTexture,re),ht.setOptional(D,G,"batchingColorTexture"),G._colorsTexture!==null&&ht.setValue(D,"batchingColorTexture",G._colorsTexture,re));const Ht=j.morphAttributes;if((Ht.position!==void 0||Ht.normal!==void 0||Ht.color!==void 0)&&fe.update(G,j,Ft),(Bt||ze.receiveShadow!==G.receiveShadow)&&(ze.receiveShadow=G.receiveShadow,ht.setValue(D,"receiveShadow",G.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(Vt.envMap.value=Re,Vt.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&B.environment!==null&&(Vt.envMapIntensity.value=B.environmentIntensity),Bt&&(ht.setValue(D,"toneMappingExposure",M.toneMappingExposure),ze.needsLights&&Cu(Vt,Fi),pe&&J.fog===!0&&ie.refreshFogUniforms(Vt,pe),ie.refreshMaterialUniforms(Vt,J,X,K,p.state.transmissionRenderTarget[b.id]),Yr.upload(D,qo(ze),Vt,re)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Yr.upload(D,qo(ze),Vt,re),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&ht.setValue(D,"center",G.center),ht.setValue(D,"modelViewMatrix",G.modelViewMatrix),ht.setValue(D,"normalMatrix",G.normalMatrix),ht.setValue(D,"modelMatrix",G.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const Tt=J.uniformsGroups;for(let Ct=0,ua=Tt.length;Ct<ua;Ct++){const Bn=Tt[Ct];Ve.update(Bn,Ft),Ve.bind(Bn,Ft)}}return Ft}function Cu(b,B){b.ambientLightColor.needsUpdate=B,b.lightProbe.needsUpdate=B,b.directionalLights.needsUpdate=B,b.directionalLightShadows.needsUpdate=B,b.pointLights.needsUpdate=B,b.pointLightShadows.needsUpdate=B,b.spotLights.needsUpdate=B,b.spotLightShadows.needsUpdate=B,b.rectAreaLights.needsUpdate=B,b.hemisphereLights.needsUpdate=B}function Ru(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(b,B,j){const J=Z.get(b);J.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),Z.get(b.texture).__webglTexture=B,Z.get(b.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:j,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,B){const j=Z.get(b);j.__webglFramebuffer=B,j.__useDefaultFramebuffer=B===void 0};const Pu=D.createFramebuffer();this.setRenderTarget=function(b,B=0,j=0){N=b,A=B,L=j;let J=!0,G=null,pe=!1,Ee=!1;if(b){const Re=Z.get(b);if(Re.__useDefaultFramebuffer!==void 0)P.bindFramebuffer(D.FRAMEBUFFER,null),J=!1;else if(Re.__webglFramebuffer===void 0)re.setupRenderTarget(b);else if(Re.__hasExternalTextures)re.rebindTextures(b,Z.get(b.texture).__webglTexture,Z.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Fe=b.depthTexture;if(Re.__boundDepthTexture!==Fe){if(Fe!==null&&Z.has(Fe)&&(b.width!==Fe.image.width||b.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");re.setupDepthRenderbuffer(b)}}const ke=b.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Ee=!0);const Ge=Z.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ge[B])?G=Ge[B][j]:G=Ge[B],pe=!0):b.samples>0&&re.useMultisampledRTT(b)===!1?G=Z.get(b).__webglMultisampledFramebuffer:Array.isArray(Ge)?G=Ge[j]:G=Ge,w.copy(b.viewport),U.copy(b.scissor),O=b.scissorTest}else w.copy(ae).multiplyScalar(X).floor(),U.copy(ye).multiplyScalar(X).floor(),O=Ie;if(j!==0&&(G=Pu),P.bindFramebuffer(D.FRAMEBUFFER,G)&&J&&P.drawBuffers(b,G),P.viewport(w),P.scissor(U),P.setScissorTest(O),pe){const Re=Z.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+B,Re.__webglTexture,j)}else if(Ee){const Re=B;for(let ke=0;ke<b.textures.length;ke++){const Ge=Z.get(b.textures[ke]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+ke,Ge.__webglTexture,j,Re)}}else if(b!==null&&j!==0){const Re=Z.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Re.__webglTexture,j)}x=-1},this.readRenderTargetPixels=function(b,B,j,J,G,pe,Ee,De=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=Z.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ee!==void 0&&(Re=Re[Ee]),Re){P.bindFramebuffer(D.FRAMEBUFFER,Re);try{const ke=b.textures[De],Ge=ke.format,Fe=ke.type;if(!te.textureFormatReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!te.textureTypeReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=b.width-J&&j>=0&&j<=b.height-G&&(b.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+De),D.readPixels(B,j,J,G,Le.convert(Ge),Le.convert(Fe),pe))}finally{const ke=N!==null?Z.get(N).__webglFramebuffer:null;P.bindFramebuffer(D.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(b,B,j,J,G,pe,Ee,De=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=Z.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ee!==void 0&&(Re=Re[Ee]),Re)if(B>=0&&B<=b.width-J&&j>=0&&j<=b.height-G){P.bindFramebuffer(D.FRAMEBUFFER,Re);const ke=b.textures[De],Ge=ke.format,Fe=ke.type;if(!te.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!te.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Je=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Je),D.bufferData(D.PIXEL_PACK_BUFFER,pe.byteLength,D.STREAM_READ),b.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+De),D.readPixels(B,j,J,G,Le.convert(Ge),Le.convert(Fe),0);const st=N!==null?Z.get(N).__webglFramebuffer:null;P.bindFramebuffer(D.FRAMEBUFFER,st);const dt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await nh(D,dt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Je),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,pe),D.deleteBuffer(Je),D.deleteSync(dt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,B=null,j=0){const J=Math.pow(2,-j),G=Math.floor(b.image.width*J),pe=Math.floor(b.image.height*J),Ee=B!==null?B.x:0,De=B!==null?B.y:0;re.setTexture2D(b,0),D.copyTexSubImage2D(D.TEXTURE_2D,j,0,0,Ee,De,G,pe),P.unbindTexture()};const Du=D.createFramebuffer(),Lu=D.createFramebuffer();this.copyTextureToTexture=function(b,B,j=null,J=null,G=0,pe=null){pe===null&&(G!==0?(ar("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),pe=G,G=0):pe=0);let Ee,De,Re,ke,Ge,Fe,Je,st,dt;const ct=b.isCompressedTexture?b.mipmaps[pe]:b.image;if(j!==null)Ee=j.max.x-j.min.x,De=j.max.y-j.min.y,Re=j.isBox3?j.max.z-j.min.z:1,ke=j.min.x,Ge=j.min.y,Fe=j.isBox3?j.min.z:0;else{const Ht=Math.pow(2,-G);Ee=Math.floor(ct.width*Ht),De=Math.floor(ct.height*Ht),b.isDataArrayTexture?Re=ct.depth:b.isData3DTexture?Re=Math.floor(ct.depth*Ht):Re=1,ke=0,Ge=0,Fe=0}J!==null?(Je=J.x,st=J.y,dt=J.z):(Je=0,st=0,dt=0);const ot=Le.convert(B.format),ze=Le.convert(B.type);let ut;B.isData3DTexture?(re.setTexture3D(B,0),ut=D.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(re.setTexture2DArray(B,0),ut=D.TEXTURE_2D_ARRAY):(re.setTexture2D(B,0),ut=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,B.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,B.unpackAlignment);const et=D.getParameter(D.UNPACK_ROW_LENGTH),Ft=D.getParameter(D.UNPACK_IMAGE_HEIGHT),ri=D.getParameter(D.UNPACK_SKIP_PIXELS),Bt=D.getParameter(D.UNPACK_SKIP_ROWS),Fi=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,ct.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ct.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ke),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ge),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Fe);const ht=b.isDataArrayTexture||b.isData3DTexture,Vt=B.isDataArrayTexture||B.isData3DTexture;if(b.isDepthTexture){const Ht=Z.get(b),Tt=Z.get(B),Ct=Z.get(Ht.__renderTarget),ua=Z.get(Tt.__renderTarget);P.bindFramebuffer(D.READ_FRAMEBUFFER,Ct.__webglFramebuffer),P.bindFramebuffer(D.DRAW_FRAMEBUFFER,ua.__webglFramebuffer);for(let Bn=0;Bn<Re;Bn++)ht&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Z.get(b).__webglTexture,G,Fe+Bn),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Z.get(B).__webglTexture,pe,dt+Bn)),D.blitFramebuffer(ke,Ge,Ee,De,Je,st,Ee,De,D.DEPTH_BUFFER_BIT,D.NEAREST);P.bindFramebuffer(D.READ_FRAMEBUFFER,null),P.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(G!==0||b.isRenderTargetTexture||Z.has(b)){const Ht=Z.get(b),Tt=Z.get(B);P.bindFramebuffer(D.READ_FRAMEBUFFER,Du),P.bindFramebuffer(D.DRAW_FRAMEBUFFER,Lu);for(let Ct=0;Ct<Re;Ct++)ht?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ht.__webglTexture,G,Fe+Ct):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ht.__webglTexture,G),Vt?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Tt.__webglTexture,pe,dt+Ct):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Tt.__webglTexture,pe),G!==0?D.blitFramebuffer(ke,Ge,Ee,De,Je,st,Ee,De,D.COLOR_BUFFER_BIT,D.NEAREST):Vt?D.copyTexSubImage3D(ut,pe,Je,st,dt+Ct,ke,Ge,Ee,De):D.copyTexSubImage2D(ut,pe,Je,st,ke,Ge,Ee,De);P.bindFramebuffer(D.READ_FRAMEBUFFER,null),P.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Vt?b.isDataTexture||b.isData3DTexture?D.texSubImage3D(ut,pe,Je,st,dt,Ee,De,Re,ot,ze,ct.data):B.isCompressedArrayTexture?D.compressedTexSubImage3D(ut,pe,Je,st,dt,Ee,De,Re,ot,ct.data):D.texSubImage3D(ut,pe,Je,st,dt,Ee,De,Re,ot,ze,ct):b.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,pe,Je,st,Ee,De,ot,ze,ct.data):b.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,pe,Je,st,ct.width,ct.height,ot,ct.data):D.texSubImage2D(D.TEXTURE_2D,pe,Je,st,Ee,De,ot,ze,ct);D.pixelStorei(D.UNPACK_ROW_LENGTH,et),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ft),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ri),D.pixelStorei(D.UNPACK_SKIP_ROWS,Bt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Fi),pe===0&&B.generateMipmaps&&D.generateMipmap(ut),P.unbindTexture()},this.initRenderTarget=function(b){Z.get(b).__webglFramebuffer===void 0&&re.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?re.setTextureCube(b,0):b.isData3DTexture?re.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?re.setTexture2DArray(b,0):re.setTexture2D(b,0),P.unbindTexture()},this.resetState=function(){A=0,L=0,N=null,P.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}const k0=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Rl,AddEquation:Rn,AddOperation:Tl,AdditiveBlending:ja,AgXToneMapping:Dl,AlphaFormat:yo,AlwaysCompare:Vl,AlwaysDepth:Jr,AlwaysStencilFunc:$a,ArcCurve:tu,ArrayCamera:mu,ArrowHelper:rf,BackSide:St,BasicDepthPacking:Il,Box3:bn,BoxGeometry:cn,BufferAttribute:Et,BufferGeometry:lt,ByteType:mo,Camera:wo,CanvasTexture:Th,CatmullRomCurve3:nu,CineonToneMapping:Cl,CircleGeometry:Io,ClampToEdgeWrapping:Pn,Color:Ze,ColorManagement:Qe,ConeGeometry:ea,ConstantAlphaFactor:bl,ConstantColorFactor:vl,Controls:_u,CubeCamera:$l,CubeReflectionMapping:Qn,CubeRefractionMapping:ei,CubeTexture:Ao,CubeUVReflectionMapping:ur,CubicBezierCurve:No,CubicBezierCurve3:iu,CullFaceBack:Za,CullFaceFront:rl,CullFaceNone:il,Curve:an,CurvePath:su,CustomBlending:al,CustomToneMapping:Pl,CylinderGeometry:Ci,Data3DTexture:Zl,DataArrayTexture:So,DataTexture:eu,DepthFormat:Ei,DepthStencilFormat:Ti,DepthTexture:Do,DirectionalLight:oo,DoubleSide:qt,DstAlphaFactor:ml,DstColorFactor:gl,EllipseCurve:ta,EqualCompare:Bl,EqualDepth:Qr,EquirectangularReflectionMapping:is,EquirectangularRefractionMapping:rs,Euler:jt,EventDispatcher:Nn,ExternalTexture:Lo,ExtrudeGeometry:ra,Float32BufferAttribute:je,FloatType:nn,FrontSide:vn,Frustum:$s,GLSL3:eo,GreaterCompare:zl,GreaterDepth:ts,GreaterEqualCompare:Gl,GreaterEqualDepth:es,Group:Ut,HalfFloatType:Di,HemisphereLight:fu,ImageUtils:ql,InstancedBufferAttribute:no,InstancedMesh:Ro,IntType:Vs,KeepStencilOp:Xn,Layers:Js,LessCompare:Fl,LessDepth:$r,LessEqualCompare:bo,LessEqualDepth:$n,Light:oa,Line:Po,LineBasicMaterial:Qs,LineCurve:Oo,LineCurve3:ru,LinearFilter:tn,LinearMipmapLinearFilter:Dn,LinearMipmapNearestFilter:Wr,LinearSRGBColorSpace:ti,LinearToneMapping:wl,LinearTransfer:rr,MOUSE:jn,Material:On,MathUtils:Hl,Matrix3:We,Matrix4:nt,MaxEquation:ul,Mesh:tt,MeshBasicMaterial:wi,MeshDepthMaterial:uu,MeshDistanceMaterial:hu,MeshLambertMaterial:Go,MeshPhysicalMaterial:ao,MeshStandardMaterial:Pi,MinEquation:ll,MirroredRepeatWrapping:as,MixOperation:El,MultiplyBlending:Ja,MultiplyOperation:Gs,NearestFilter:Nt,NearestMipmapLinearFilter:Zi,NearestMipmapNearestFilter:Ll,NeutralToneMapping:fo,NeverCompare:Ol,NeverDepth:Kr,NoBlending:gn,NoColorSpace:_n,NoToneMapping:xn,NormalBlending:Kn,NotEqualCompare:kl,NotEqualDepth:ns,Object3D:pt,ObjectSpaceNormalMap:Nl,OneFactor:fl,OneMinusConstantAlphaFactor:Sl,OneMinusConstantColorFactor:Ml,OneMinusDstAlphaFactor:_l,OneMinusDstColorFactor:xl,OneMinusSrcAlphaFactor:jr,OneMinusSrcColorFactor:pl,OrthographicCamera:ca,PCFShadowMap:ho,PCFSoftShadowMap:sl,PMREMGenerator:zs,Path:io,PerspectiveCamera:It,Plane:mn,PlaneGeometry:Ii,PointLight:pu,QuadraticBezierCurve:Fo,QuadraticBezierCurve3:na,Quaternion:In,RED_GREEN_RGTC2_Format:Is,RED_RGTC1_Format:Ds,REVISION:ks,RGBADepthPacking:Ul,RGBAFormat:Zt,RGBAIntegerFormat:Zs,RGBA_ASTC_10x10_Format:Ts,RGBA_ASTC_10x5_Format:bs,RGBA_ASTC_10x6_Format:Ss,RGBA_ASTC_10x8_Format:Es,RGBA_ASTC_12x10_Format:ws,RGBA_ASTC_12x12_Format:As,RGBA_ASTC_4x4_Format:ps,RGBA_ASTC_5x4_Format:ms,RGBA_ASTC_5x5_Format:_s,RGBA_ASTC_6x5_Format:gs,RGBA_ASTC_6x6_Format:xs,RGBA_ASTC_8x5_Format:ys,RGBA_ASTC_8x6_Format:vs,RGBA_ASTC_8x8_Format:Ms,RGBA_BPTC_Format:Cs,RGBA_ETC2_EAC_Format:ds,RGBA_PVRTC_2BPPV1_Format:us,RGBA_PVRTC_4BPPV1_Format:ls,RGBA_S3TC_DXT1_Format:$i,RGBA_S3TC_DXT3_Format:Qi,RGBA_S3TC_DXT5_Format:er,RGBFormat:vo,RGB_BPTC_SIGNED_Format:Rs,RGB_BPTC_UNSIGNED_Format:Ps,RGB_ETC1_Format:hs,RGB_ETC2_Format:fs,RGB_PVRTC_2BPPV1_Format:cs,RGB_PVRTC_4BPPV1_Format:os,RGB_S3TC_DXT1_Format:Ji,RGFormat:Mo,RGIntegerFormat:Ys,Ray:hr,Raycaster:nf,RedFormat:Xs,RedIntegerFormat:qs,ReinhardToneMapping:Al,RenderTarget:Yl,RepeatWrapping:ss,ReverseSubtractEquation:cl,SIGNED_RED_GREEN_RGTC2_Format:Us,SIGNED_RED_RGTC1_Format:Ls,SRGBColorSpace:Lt,SRGBTransfer:it,Scene:Co,ShaderChunk:Xe,ShaderLib:en,ShaderMaterial:Mn,Shape:ia,ShapeGeometry:zo,ShapeUtils:on,ShortType:_o,Source:Ks,Sphere:ii,SphereGeometry:ko,Spherical:lo,SplineCurve:Bo,SrcAlphaFactor:Zr,SrcAlphaSaturateFactor:yl,SrcColorFactor:dl,StaticDrawUsage:Qa,SubtractEquation:ol,SubtractiveBlending:Ka,TOUCH:Zn,TangentSpaceNormalMap:js,Texture:vt,TorusGeometry:sa,Triangle:Yt,TubeGeometry:aa,UVMapping:po,Uint16BufferAttribute:Eo,Uint32BufferAttribute:To,UniformsLib:xe,UniformsUtils:Jl,UnsignedByteType:sn,UnsignedInt101111Type:xo,UnsignedInt248Type:Si,UnsignedInt5999Type:go,UnsignedIntType:Ln,UnsignedShort4444Type:Hs,UnsignedShort5551Type:Ws,UnsignedShortType:bi,VSMShadowMap:Qt,Vector2:he,Vector3:R,Vector4:rt,WebGLCoordinateSystem:rn,WebGLCubeRenderTarget:Ql,WebGLRenderTarget:Un,WebGLRenderer:Su,WebGLUtils:bu,WebGPUCoordinateSystem:sr,WebXRController:qr,ZeroFactor:hl,createCanvasElement:Xl},Symbol.toStringTag,{value:"Module"})),Jc={type:"change"},Ho={type:"start"},Eu={type:"end"},Vr=new hr,$c=new mn,G0=Math.cos(70*Hl.DEG2RAD),_t=new R,Pt=2*Math.PI,at={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},qa=1e-6;class V0 extends _u{constructor(e,t=null){super(e,t),this.state=at.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:jn.ROTATE,MIDDLE:jn.DOLLY,RIGHT:jn.PAN},this.touches={ONE:Zn.ROTATE,TWO:Zn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new In,this._lastTargetPosition=new R,this._quat=new In().setFromUnitVectors(e.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new lo,this._sphericalDelta=new lo,this._scale=1,this._panOffset=new R,this._rotateStart=new he,this._rotateEnd=new he,this._rotateDelta=new he,this._panStart=new he,this._panEnd=new he,this._panDelta=new he,this._dollyStart=new he,this._dollyEnd=new he,this._dollyDelta=new he,this._dollyDirection=new R,this._mouse=new he,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=W0.bind(this),this._onPointerDown=H0.bind(this),this._onPointerUp=X0.bind(this),this._onContextMenu=$0.bind(this),this._onMouseWheel=Z0.bind(this),this._onKeyDown=j0.bind(this),this._onTouchStart=K0.bind(this),this._onTouchMove=J0.bind(this),this._onMouseDown=q0.bind(this),this._onMouseMove=Y0.bind(this),this._interceptControlDown=Q0.bind(this),this._interceptControlUp=e_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Jc),this.update(),this.state=at.NONE}update(e=null){const t=this.object.position;_t.copy(t).sub(this.target),_t.applyQuaternion(this._quat),this._spherical.setFromVector3(_t),this.autoRotate&&this.state===at.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=Pt:n>Math.PI&&(n-=Pt),r<-Math.PI?r+=Pt:r>Math.PI&&(r-=Pt),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(_t.setFromSpherical(this._spherical),_t.applyQuaternion(this._quatInverse),t.copy(this.target).add(_t),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=_t.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new R(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new R(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=_t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Vr.origin.copy(this.object.position),Vr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Vr.direction))<G0?this.object.lookAt(this.target):($c.setFromNormalAndCoplanarPoint(this.object.up,this.target),Vr.intersectPlane($c,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>qa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>qa||this._lastTargetPosition.distanceToSquared(this.target)>qa?(this.dispatchEvent(Jc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Pt/60*this.autoRotateSpeed*e:Pt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){_t.setFromMatrixColumn(t,0),_t.multiplyScalar(-e),this._panOffset.add(_t)}_panUp(e,t){this.screenSpacePanning===!0?_t.setFromMatrixColumn(t,1):(_t.setFromMatrixColumn(t,0),_t.crossVectors(this.object.up,_t)),_t.multiplyScalar(e),this._panOffset.add(_t)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;_t.copy(r).sub(this.target);let s=_t.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/n.clientHeight,this.object.matrix),this._panUp(2*t*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),r=e-n.left,s=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Pt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Pt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Pt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Pt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Pt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Pt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(n*n+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),s=.5*(e.pageY+n.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Pt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Pt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new he,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function H0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function W0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function X0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Eu),this.state=at.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function q0(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case jn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=at.DOLLY;break;case jn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=at.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=at.ROTATE}break;case jn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=at.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=at.PAN}break;default:this.state=at.NONE}this.state!==at.NONE&&this.dispatchEvent(Ho)}function Y0(i){switch(this.state){case at.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case at.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case at.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Z0(i){this.enabled===!1||this.enableZoom===!1||this.state!==at.NONE||(i.preventDefault(),this.dispatchEvent(Ho),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Eu))}function j0(i){this.enabled!==!1&&this._handleKeyDown(i)}function K0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Zn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=at.TOUCH_ROTATE;break;case Zn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=at.TOUCH_PAN;break;default:this.state=at.NONE}break;case 2:switch(this.touches.TWO){case Zn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=at.TOUCH_DOLLY_PAN;break;case Zn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=at.TOUCH_DOLLY_ROTATE;break;default:this.state=at.NONE}break;default:this.state=at.NONE}this.state!==at.NONE&&this.dispatchEvent(Ho)}function J0(i){switch(this._trackPointer(i),this.state){case at.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case at.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case at.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case at.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=at.NONE}}function $0(i){this.enabled!==!1&&i.preventDefault()}function Q0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function e_(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Yi=new R;function Xt(i,e,t,n,r,s){const a=2*Math.PI*r/4,o=Math.max(s-2*r,0),l=Math.PI/4;Yi.copy(e),Yi[n]=0,Yi.normalize();const c=.5*a/(a+o),u=1-Yi.angleTo(i)/l;return Math.sign(Yi[t])===1?u*c:o/(a+o)+c+c*(1-u)}class Jn extends cn{constructor(e=1,t=1,n=1,r=2,s=.1){const a=r*2+1;if(s=Math.min(e/2,t/2,n/2,s),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:r,radius:s},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const l=new R,c=new R,u=new R(e,t,n).divideScalar(2).subScalar(s),h=this.attributes.position.array,f=this.attributes.normal.array,d=this.attributes.uv.array,_=h.length/6,g=new R,m=.5/a;for(let p=0,T=0;p<h.length;p+=3,T+=2)switch(l.fromArray(h,p),c.copy(l),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),h[p+0]=u.x*Math.sign(l.x)+c.x*s,h[p+1]=u.y*Math.sign(l.y)+c.y*s,h[p+2]=u.z*Math.sign(l.z)+c.z*s,f[p+0]=c.x,f[p+1]=c.y,f[p+2]=c.z,Math.floor(p/_)){case 0:g.set(1,0,0),d[T+0]=Xt(g,c,"z","y",s,n),d[T+1]=1-Xt(g,c,"y","z",s,t);break;case 1:g.set(-1,0,0),d[T+0]=1-Xt(g,c,"z","y",s,n),d[T+1]=1-Xt(g,c,"y","z",s,t);break;case 2:g.set(0,1,0),d[T+0]=1-Xt(g,c,"x","z",s,e),d[T+1]=Xt(g,c,"z","x",s,n);break;case 3:g.set(0,-1,0),d[T+0]=1-Xt(g,c,"x","z",s,e),d[T+1]=1-Xt(g,c,"z","x",s,n);break;case 4:g.set(0,0,1),d[T+0]=1-Xt(g,c,"x","y",s,e),d[T+1]=1-Xt(g,c,"y","x",s,t);break;case 5:g.set(0,0,-1),d[T+0]=Xt(g,c,"x","y",s,e),d[T+1]=1-Xt(g,c,"y","x",s,t);break}}static fromJSON(e){return new Jn(e.width,e.height,e.depth,e.segments,e.radius)}}class t_ extends Co{constructor(){super();const e=new cn;e.deleteAttribute("uv");const t=new Pi({side:St}),n=new Pi,r=new pu(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const s=new tt(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const a=new Ro(e,n,6),o=new pt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new tt(e,yi(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new tt(e,yi(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const u=new tt(e,yi(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);const h=new tt(e,yi(43));h.position.set(-.462,8.89,14.52),h.scale.set(4.38,5.441,.088),this.add(h);const f=new tt(e,yi(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);const d=new tt(e,yi(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function yi(i){return new Go({color:0,emissive:16777215,emissiveIntensity:i})}function Tu(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),s={},a={},o=i[0].morphTargetsRelative,l=new lt;let c=0;for(let u=0;u<i.length;++u){const h=i[u];let f=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;s[d]===void 0&&(s[d]=[]),s[d].push(h.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!r.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(h.morphAttributes[d])}if(e){let d;if(t)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,u),c+=d}}if(t){let u=0;const h=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let _=0;_<d.count;++_)h.push(d.getX(_)+u);u+=i[f].attributes.position.count}l.setIndex(h)}for(const u in s){const h=Qc(s[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(const u in a){const h=a[u][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let f=0;f<h;++f){const d=[];for(let g=0;g<a[u].length;++g)d.push(a[u][g][f]);const _=Qc(d);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(_)}}return l}function Qc(i){let e,t,n,r=-1,s=0;for(let c=0;c<i.length;++c){const u=i[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*t}const a=new e(s),o=new Et(a,t,n);let l=0;for(let c=0;c<i.length;++c){const u=i[c];if(u.isInterleavedBufferAttribute){const h=l/t;for(let f=0,d=u.count;f<d;f++)for(let _=0;_<t;_++){const g=u.getComponent(f,_);o.setComponent(f+h,_,g)}}else a.set(u.array,l);l+=u.count*t}return r!==void 0&&(o.gpuType=r),o}function n_({THREE:i,RoundedBoxGeometry:e,world:t,renderer:n,camera:r,onRender:s,onExit:a}){const o={x:4.3,y:4.3},l=.12,c=.043,u=.095,h=new i.Vector2(.645,.55),f=new i.Vector2(3.55,1.935),d=[[0,0],[1.29,0],[1.29,.86],[1.72,1.29],[4.3,1.29],[4.3,2.58],[0,2.58]].map(C=>new i.Vector2(...C)),_=new i.Group;_.name="Mini golf — Hole 1, Par 2",_.position.set(o.x,0,-o.y),t.add(_);const g=document.querySelector("#golf-ui"),m=document.querySelector("#golf-strokes"),p=document.querySelector("#golf-message"),T=document.querySelector("#golf-power-fill");function S(C,se,ue=i.Shape){const me=new ue,le=C.map((Q,Ae)=>{const Be=C[(Ae+C.length-1)%C.length],$e=C[(Ae+1)%C.length],He=Math.min(se,Q.distanceTo(Be)*.35,Q.distanceTo($e)*.35);return{p:Q,a:Q.clone().add(Be.clone().sub(Q).normalize().multiplyScalar(He)),b:Q.clone().add($e.clone().sub(Q).normalize().multiplyScalar(He))}});me.moveTo(le[0].a.x,le[0].a.y);for(const Q of le)me.lineTo(Q.a.x,Q.a.y),me.quadraticCurveTo(Q.p.x,Q.p.y,Q.b.x,Q.b.y);return me.closePath(),me}function M(C,se){return C.map((ue,me)=>{const le=C[(me+C.length-1)%C.length],Q=C[(me+1)%C.length],Ae=ue.clone().sub(le).normalize(),Be=Q.clone().sub(ue).normalize(),$e=new i.Vector2(Ae.y,-Ae.x),He=new i.Vector2(Be.y,-Be.x),At=$e.clone().add(He);return ue.clone().add(At.multiplyScalar(se/At.dot(He)))})}const I=S(d,.16),A=I.getPoints(8).filter((C,se,ue)=>se===0||C.distanceTo(ue[se-1])>1e-8);A[0].distanceTo(A.at(-1))<1e-7&&A.pop();const L=new i.Path;L.absarc(f.x,f.y,.105,0,Math.PI*2,!0),I.holes.push(L);const N=new i.ExtrudeGeometry(I,{depth:.08,bevelEnabled:!0,bevelThickness:.01,bevelSize:.008,bevelSegments:3,curveSegments:16});N.rotateX(-Math.PI/2),N.translate(0,.03,0);const x=new i.Mesh(N,new i.MeshStandardMaterial({color:"#519d63",roughness:.94}));x.name="One continuous putting surface with a real cup opening",x.receiveShadow=!0,x.castShadow=!0,_.add(x);const y=S(M(d,.13),.22);y.holes.push(S(d,.16,i.Path));const w=new i.ExtrudeGeometry(y,{depth:.18,bevelEnabled:!0,bevelThickness:.025,bevelSize:.018,bevelSegments:4,curveSegments:16});w.rotateX(-Math.PI/2),w.translate(0,.035,0);const U=new i.Mesh(w,new i.MeshStandardMaterial({color:"#e1d5b5",roughness:.8}));U.name="Continuous softly rounded stone edging",U.castShadow=!0,U.receiveShadow=!0,_.add(U);const O=new i.Mesh(new i.CylinderGeometry(.096,.096,.12,32,1,!0),new i.MeshStandardMaterial({color:"#344e40",roughness:.9,side:i.DoubleSide}));O.position.set(f.x,.052,-f.y),O.name="Cup inside wall",_.add(O);const z=new i.Mesh(new i.CircleGeometry(.096,32),new i.MeshStandardMaterial({color:"#253c32",roughness:1}));z.rotation.x=-Math.PI/2,z.position.set(f.x,.012,-f.y),z.name="Cup bottom",_.add(z);const H=new i.Mesh(new i.CircleGeometry(.18,32),new i.MeshStandardMaterial({color:"#9cce8a",roughness:1}));H.rotation.x=-Math.PI/2,H.scale.y=.65,H.position.set(h.x,l+.002,-h.y),H.name="Tee marking",_.add(H);const k=new i.Mesh(new i.SphereGeometry(c,24,16),new i.MeshStandardMaterial({color:"#fffdf5",roughness:.43}));k.name="Golf ball",k.castShadow=!0,_.add(k);const K=new i.Mesh(new i.CylinderGeometry(.013,.018,.94,12),new i.MeshStandardMaterial({color:"#f5e8cb",roughness:.55}));K.position.set(f.x,l+.47,-f.y),K.name="Flagpole",K.castShadow=!0,_.add(K);const X=new i.Shape;X.moveTo(0,0),X.lineTo(.43,0),X.lineTo(.34,-.13),X.lineTo(.43,-.26),X.lineTo(0,-.26),X.closePath();const V=new i.Mesh(new i.ShapeGeometry(X),new i.MeshStandardMaterial({color:"#e85d54",side:i.DoubleSide,roughness:.75}));V.position.set(f.x,l+.92,-f.y),V.name="Red hole flag",V.castShadow=!0,_.add(V);const ee=document.createElement("canvas");ee.width=128,ee.height=128;const ae=ee.getContext("2d");ae.fillStyle="#fffbed",ae.font="bold 108px sans-serif",ae.textAlign="center",ae.textBaseline="middle",ae.fillText("1",64,70);const ye=new i.CanvasTexture(ee);ye.colorSpace=i.SRGBColorSpace;const Ie=new i.Mesh(new i.PlaneGeometry(.18,.2),new i.MeshBasicMaterial({map:ye,transparent:!0,side:i.DoubleSide,depthWrite:!1}));Ie.position.set(f.x+.15,l+.79,-f.y+.003),Ie.name="Flag number 1",_.add(Ie);const Ne=new i.ArrowHelper(new i.Vector3(0,0,-1),new i.Vector3,.7,"#fff5bf",.14,.085);Ne.name="Putt aiming arrow",Ne.visible=!1,_.add(Ne);const Ue=h.clone(),$=new i.Vector2,ce=new i.Raycaster,ge=new i.Vector2,Pe=new i.Plane(new i.Vector3(0,1,0),-l),be=new i.Vector3,qe=1.2,Ke=3.9,D=1.1;let oe=!1,ne=null,te=0,P=0,W=!1,Z=0,re=0,_e=0;const Se=new i.Vector2;function E(C){let se=!1;for(let ue=0,me=A.length-1;ue<A.length;me=ue++){const le=A[ue],Q=A[me];le.y>C.y!=Q.y>C.y&&C.x<(Q.x-le.x)*(C.y-le.y)/(Q.y-le.y)+le.x&&(se=!se)}return se}const v=A.map((C,se)=>{const ue=A[(se+1)%A.length],me=ue.clone().sub(C),le=new i.Vector2(-me.y,me.x).normalize();return{a:C,b:ue,d:me,lengthSq:me.lengthSq(),inward:le}});function F(C){const se=n.domElement.getBoundingClientRect();return ge.set((C.clientX-se.left)/se.width*2-1,-(C.clientY-se.top)/se.height*2+1),ce.setFromCamera(ge,r),ce.ray.intersectPlane(Pe,be)?new i.Vector2(be.x-o.x,-be.z-o.y):null}function q(){k.position.set(Ue.x,l+c-(W?Math.min(1,Z/.28)*.15:0),-Ue.y),k.visible=!W||Z<.28}function ie(){m.textContent=P+" "+(P===1?"stroke":"strokes"),T.style.width=Math.round(te*100)+"%",p.textContent=W?`In the cup! ${P===1?"Hole in one!":P+" strokes."}`:$.lengthSq()>.001?"Rolling…":ne!==null?"Release to putt. Pull farther for more power.":"Drag back from the ball, then release to putt."}function Y(){ne=null,te=0,Ne.visible=!1,ie(),s()}function Ce(C){if(W){Z=Math.min(.28,Z+C),q();return}const se=$.length();if(se<.025){$.set(0,0),q();return}const ue=Math.max(0,se-qe*C);$.multiplyScalar(ue/se);const me=Ue.clone();Ue.addScaledVector($,C);for(let Ae=0;Ae<3;Ae++){let Be=!1;const $e=E(Ue);for(const He of v){const At=Math.max(0,Math.min(1,Ue.clone().sub(He.a).dot(He.d)/He.lengthSq)),Ot=He.a.clone().addScaledVector(He.d,At),Ni=Ue.clone().sub(Ot),Gt=Ni.length();if(Gt<c||!$e&&Gt<c+Ke*C){const Fn=$e&&Gt>1e-7?Ni.multiplyScalar(1/Gt):He.inward.clone();Ue.copy(Ot).addScaledVector(Fn,c+2e-4);const Oi=$.dot(Fn);Oi<0&&$.addScaledVector(Fn,-1.5699999999999998*Oi),Be=!0}}if(!Be)break}Ue.distanceTo(f)<u*.83&&$.length()<1.9&&(Ue.copy(f),$.set(0,0),W=!0,Z=0,ie());const Q=Ue.clone().sub(me);k.rotation.z-=Q.x/c,k.rotation.x-=Q.y/c,q()}function de(C){if(re=0,!oe)return;const se=_e?Math.min(.05,(C-_e)/1e3):1/60;_e=C;let ue=se;for(;ue>0;){const me=Math.min(.008333333333333333,ue);Ce(me),ue-=me}ie(),s(),$.lengthSq()>1e-4||W&&Z<.28?re=requestAnimationFrame(de):_e=0}function Te(){re||(_e=0,re=requestAnimationFrame(de))}function we(C){if(!oe||W||$.lengthSq()>.001||ne!==null)return;const se=F(C);!se||se.distanceTo(Ue)>.28||(C.preventDefault(),ne=C.pointerId,n.domElement.setPointerCapture(C.pointerId),te=0,ie())}function fe(C){if(C.pointerId!==ne)return;C.preventDefault();const se=F(C);if(!se)return;const ue=Ue.clone().sub(se);te=Math.min(1,ue.length()/D),Se.copy(ue).normalize(),Ne.visible=te>.025,Ne.position.set(Ue.x,l+.025,-Ue.y),Ne.setDirection(new i.Vector3(Se.x,0,-Se.y)),Ne.setLength(.3+te*1.15,.14,.085),ie(),s()}function ve(C){if(C.pointerId!==ne)return;C.preventDefault();const se=te,ue=Se.clone();ne=null,n.domElement.hasPointerCapture(C.pointerId)&&n.domElement.releasePointerCapture(C.pointerId),Ne.visible=!1,se>.035?(P++,$.copy(ue).multiplyScalar(se*Ke),te=0,ie(),Te()):Y()}const Oe=n.domElement;Oe.addEventListener("pointerdown",we),Oe.addEventListener("pointermove",fe),Oe.addEventListener("pointerup",ve),Oe.addEventListener("pointercancel",Y),Oe.addEventListener("lostpointercapture",()=>{ne!==null&&Y()}),window.addEventListener("blur",Y),document.addEventListener("visibilitychange",()=>{document.hidden&&Y()});function Le(){re&&cancelAnimationFrame(re),re=0,_e=0,Ue.copy(h),$.set(0,0),W=!1,Z=0,P=0,k.visible=!0,q(),Y(),ie(),s()}function Me(C){oe=C,g.hidden=!C,document.body.classList.toggle("golf-playing",C),Oe.style.cursor=C?"crosshair":"",C||(re&&cancelAnimationFrame(re),re=0,$.set(0,0),Y()),ie()}document.querySelector("#golf-reset").onclick=Le,document.querySelector("#golf-exit").onclick=a,q(),ie();const Ve={hole:1,par:2,origin_m:o,footprint_m:[4.3,2.58],floor_height_m:l,outer_polygon_m:d.map(C=>C.toArray()),inner_boundary_m:A.map(C=>C.toArray()),tee_m:h.toArray(),cup_m:f.toArray(),ball_radius_m:c,cup_radius_m:u,materials:{turf:"#519d63",rim:"#e1d5b5"},features:["flat gentle bend","tee","flagged cup"],sourceGrid_m:.43};return{group:_,ball:k,rail:U,turf:x,coursePlan:Ve,step:Ce,reset:Le,setPlaying:Me,isPlaying:()=>oe,getState:()=>({position:Ue.toArray(),velocity:$.toArray(),strokes:P,won:W,dragging:ne!==null,power:te}),focus:new i.Vector3(o.x+2.15,.12,-o.y-1.29),worldBall:()=>new i.Vector3(o.x+Ue.x,l+c,-o.y-Ue.y)}}function i_(i){const e=document.createElement("canvas"),t=e.getContext("2d",{alpha:!0});if(!t)throw new Error("A drawing context is unavailable.");e.dataset.graphics="canvas";let n=1,r=1,s=1,a=()=>[],o=i,l=()=>!0,c=0,u=null,h=null;const f={domElement:e,info:{render:{calls:0,triangles:0}},shadowMap:{enabled:!1},setActorProvider(_,g){a=_,l=g},setBaseFaces(_){o=_??i},setPixelRatio(_){s=Math.min(_,1)},getPixelRatio(){return s},setSize(_,g){n=_,r=g,e.width=Math.round(_*s),e.height=Math.round(g*s),e.style.width=_+"px",e.style.height=g+"px"},render(_,g){h=g;const m=50-(performance.now()-c);if(m>0){u===null&&(u=setTimeout(()=>{u=null,d(h)},m));return}d(g)}};function d(_){c=performance.now(),_.updateMatrixWorld();const g=_.matrixWorldInverse.elements,m=_.projectionMatrix.elements,p=_.matrixWorld.elements;function T(I){const A=I.map(([N,x,y])=>[g[0]*N+g[4]*x+g[8]*y+g[12],g[1]*N+g[5]*x+g[9]*y+g[13],g[2]*N+g[6]*x+g[10]*y+g[14]]),L=[];for(let N=0;N<A.length;N++){const x=A[N],y=A[(N+1)%A.length],w=x[2]<=-_.near,U=y[2]<=-_.near;if(w&&L.push(x),w!==U){const O=(-_.near-x[2])/(y[2]-x[2]);L.push(x.map((z,H)=>z+(y[H]-z)*O))}}return L.map(([N,x,y])=>{const w=m[3]*N+m[7]*x+m[11]*y+m[15];return[((m[0]*N+m[12])/w+1)*n/2,(1-(m[5]*x+m[13])/w)*r/2]})}function S(I){const A=[];for(const L of I){if(L.cloud&&!l())continue;const N=L.center??(L.center=L.points.reduce((z,H)=>z.map((k,K)=>k+H[K]/L.points.length),[0,0,0])),x=L.normal;if((_.isPerspectiveCamera?x.reduce((z,H,k)=>z+H*(p[12+k]-N[k]),0):x[0]*p[8]+x[1]*p[9]+x[2]*p[10])<=0&&!L.doubleSided)continue;const w=T(L.points);if(w.length<3)continue;const U=w.map(z=>z[0]),O=w.map(z=>z[1]);Math.max(...U)<0||Math.min(...U)>n||Math.max(...O)<0||Math.min(...O)>r||A.push({face:L,p:w,z:g[2]*N[0]+g[6]*N[1]+g[10]*N[2]+g[14]})}A.sort((L,N)=>(L.face.layer??0)-(N.face.layer??0)||L.z-N.z);for(const{face:L,p:N}of A){t.globalAlpha=L.alpha??1,t.beginPath();for(let x=0;x<N.length;x++)x?t.lineTo(...N[x]):t.moveTo(...N[x]);t.closePath(),t.fillStyle=L.color,t.fill(),(L.alpha??1)===1&&(t.strokeStyle=L.color,t.stroke())}return A.length}t.setTransform(s,0,0,s,0,0),t.clearRect(0,0,n,r),t.lineWidth=.5,t.lineJoin="round";const M=S(o)+S(a());t.globalAlpha=1,f.info.render.calls=1,f.info.render.triangles=M*2}return f}function Hr(i){const e=[],t=new R,n=new R,r=new R,s=i.name.startsWith("Mini golf"),a=i.name.startsWith("Canyon Switchbacks");return i.traverse(o=>{if(!o.isMesh||o.isInstancedMesh||o.material.map)return;const l=o.geometry.attributes.position,c=o.geometry.index,u=Array.from({length:l.count},()=>[0,0,0]),h=[];let f=s?o.name.includes("putting surface")?10:o.name.includes("Tee marking")?11:o.name.startsWith("Cup")?12:o.name.includes("stone edging")?20:30:0;if(a){const d=o.name.split(" ")[1];f={water:1,underside:2,asphalt:10,white:12,red:12,rail:20,wood:25,leaf:25,rock:25,flower:25}[d]??0}for(let d=0;d<(c?.count??l.count);d+=3){const _=[0,1,2].map(g=>c?c.getX(d+g):d+g);h.push({points:_.map(g=>u[g]),normal:[0,0,0],color:o.material.color?.getStyle()||"#ffffff",alpha:o.material.opacity??1,doubleSided:o.material.side===2,layer:f})}e.push({mesh:o,position:l,vertices:u,triangles:h})}),()=>{i.updateWorldMatrix(!0,!0);const o=[];for(const l of e){let c=!0;for(let u=l.mesh;u;u=u.parent)if(!u.visible){c=!1;break}if(c){for(let u=0;u<l.position.count;u++)t.fromBufferAttribute(l.position,u).applyMatrix4(l.mesh.matrixWorld).toArray(l.vertices[u]);for(const u of l.triangles)n.fromArray(u.points[1]).sub(t.fromArray(u.points[0])),r.fromArray(u.points[2]).sub(t),n.cross(r).normalize().toArray(u.normal),u.center=void 0;o.push(...l.triangles)}}return o}}const r_=8.6,s_=.43,a_=[{name:"North bridge",z:-54},{name:"South bridge",z:36}],ir=[],fr=(i,e)=>ir.push({length:Math.hypot(e[0]-i[0],e[1]-i[1]),point:t=>({x:i[0]+(e[0]-i[0])*t,z:i[1]+(e[1]-i[1])*t,tx:Math.sign(e[0]-i[0]),tz:0})}),wu=(i,e,t,n)=>ir.push({length:Math.abs(n-t)*9,point:r=>{const s=t+(n-t)*r,a=Math.sign(n-t);return{x:i+9*Math.cos(s),z:e+9*Math.sin(s),tx:-Math.sin(s)*a,tz:Math.cos(s)*a}}});fr([0,36],[-33,36]);for(let i=0;i<5;i++){const e=i%2?-22:-33,t=27-i*18;wu(e,t,Math.PI/2,i%2?-Math.PI/2:Math.PI*1.5),i<4&&fr([e,t-9],[i%2?-33:-22,t-9])}fr([-33,-54],[33,-54]);for(let i=0;i<5;i++){const e=i%2?22:33,t=-45+i*18;wu(e,t,-Math.PI/2,i%2?-Math.PI*1.5:Math.PI/2),i<4&&fr([e,t+9],[i%2?33:22,t+9])}fr([33,36],[0,36]);function o_(i,e){const t=Math.exp(-Math.pow((e+54)/6,2)),n=Math.exp(-Math.pow((e-36)/6,2));return 8.28+Math.exp(-i*i/180)*(3*t+1.6*n)}function c_(i=960){const e=ir.reduce((r,s)=>r+s.length,0),t=Array.from({length:i+1},(r,s)=>{let a=s/i*e,o=ir[0];for(const c of ir){if(o=c,a<=c.length)break;a-=c.length}const l=o.point(Math.min(1,a/o.length));return{...l,y:o_(l.x,l.z),nx:-l.tz,nz:l.tx,distance:s/i*e}});function n(r,s){let a=null,o=1/0;for(let l=0;l<i;l++){const c=t[l],u=t[l+1],h=u.x-c.x,f=u.z-c.z,d=Math.max(0,Math.min(1,((r-c.x)*h+(s-c.z)*f)/(h*h+f*f))),_=c.x+h*d,g=c.z+f*d,m=(r-_)**2+(s-g)**2;if(m<o){o=m;const p=Math.hypot(h,f);a={index:l,t:d,x:_,z:g,y:c.y+(u.y-c.y)*d,tx:h/p,tz:f/p,nx:-f/p,nz:h/p,progress:(l+d)/i,distance:Math.sqrt(m)}}}return a}return{samples:t,length:e,count:i,width:r_,curb:s_,bridges:a_,nearest:n}}const Dt=4.3;function el(i=0){const e=[];for(let t=-14;t<14;t++)for(let n=-18;n<15;n++){const r=(t+.5)*Dt,s=(n+.5)*Dt,a=Math.max(0,Math.abs(r)-(42-i)),o=Math.max(0,Math.abs(s+9)-(52-i)),l=52-i*.85+3*Math.sin(s/14)+2*Math.cos(s/33);Math.hypot(a,o)<16-i*.12&&Math.abs(r)<l&&e.push([t,n])}return e}function l_(i){const e=new Set(i.map(s=>s.join(","))),t=new Map,n=(s,a)=>t.set(s.join(","),a);for(const[s,a]of i)e.has(`${s},${a-1}`)||n([s,a],[s+1,a]),e.has(`${s+1},${a}`)||n([s+1,a],[s+1,a+1]),e.has(`${s},${a+1}`)||n([s+1,a+1],[s,a+1]),e.has(`${s-1},${a}`)||n([s,a+1],[s,a]);const r=[];for(;t.size;){const s=t.keys().next().value,a=[];let l=s.split(",").map(Number);do{const u=l.join(",");if(a.push(l),l=t.get(u),t.delete(u),!l)throw new Error("An island contour did not connect.")}while(l.join(",")!==s);const c=a.filter((u,h)=>{const f=a[(h+a.length-1)%a.length],d=a[(h+1)%a.length];return(u[0]-f[0])*(d[1]-u[1])!==(u[1]-f[1])*(d[0]-u[0])});r.push(c.map(([u,h])=>[u*Dt,h*Dt]))}return r}function u_({software:i=!1}={}){const e=new Ut;e.name="Canyon Switchbacks — merged floating island";const t=c_(i?360:1200),n=new Map,r={grass:"#91cb34",dirt:"#cb8b50",stone:"#a19aa9",rock:"#b9afb4",leaf:"#72b12c",wood:"#95612f",flower:"#f4c73c",asphalt:"#33373d",underside:"#515461",red:"#df4540",white:"#fff5e5",rail:"#c9d5d7",water:"#35c9da"},s=new Map(Object.entries(r).map(([x,y])=>[x,new Go({color:y,side:qt})]));function a(x,y,w){x.deleteAttribute("uv"),x.index&&(x=x.toNonIndexed()),n.has(y)||n.set(y,[]),n.get(y).push(x)}function o(x,y,w,U,O,z,H,k=.12){const K=i||H==="rail"||O<.1?new cn(U,O,z):new Jn(U,O,z,1,Math.min(k,U*.12,O*.12,z*.12));K.translate(x,y,w),a(K,H)}function l(x){const y=new ia,w=.55,U=x.map(([O,z],H)=>{const k=new he(O,-z),K=new he(...x[(H+x.length-1)%x.length].map((V,ee)=>ee?-V:V)),X=new he(...x[(H+1)%x.length].map((V,ee)=>ee?-V:V));return{p:k,a:k.clone().add(K.sub(k).setLength(w)),b:k.clone().add(X.sub(k).setLength(w))}});y.moveTo(U[0].a.x,U[0].a.y);for(const O of U)y.lineTo(O.a.x,O.a.y),y.quadraticCurveTo(O.p.x,O.p.y,O.b.x,O.b.y);return y.closePath(),y}function c(x,y,w,U){for(const O of l_(x)){const z=new ra(l(O),{depth:w-y-.16,bevelEnabled:!0,bevelSize:.12,bevelThickness:.08,bevelSegments:i?1:2,curveSegments:i?1:3,steps:1});z.rotateX(-Math.PI/2),z.translate(0,y+.08,0),a(z,U)}}const u=el(),h=x=>Math.sin((x+9)/21)*1.5,f=u.filter(([x,y])=>Math.abs((x+.5)*Dt-h((y+.5)*Dt))>8.6+1.5*(1+Math.sin((y+.5)*Dt/14)));c(u,-5.16,-2.58,"stone"),c(f,-2.58,3.87,"stone"),c(f,3.87,7.57,"dirt"),c(f,7.57,8,"grass");for(const[x,y,w]of[[4.3,-10.32,-5.16],[8.6,-17.2,-10.32],[17.2,-25.8,-17.2],[25.8,-33.54,-25.8],[35.5,-40.42,-33.54],[44,-45.58,-40.42]])c(el(x),y,w,"stone");const d=u.filter(([x])=>Math.abs((x+.5)*Dt)<12.9);c(d,-2.58,.86,"stone");const _=u.filter(([x,y])=>{const w=(x+.5)*Dt,U=(y+.5)*Dt;return Math.abs(w)>6.45&&Math.abs(w)<12.9&&Math.abs(U+9)<51});c(_,.86,1.72,"dirt"),c(_,1.72,2.15,"grass");for(const x of[-1,1]){const y=u.filter(([U,O])=>{const z=(U+.5)*Dt,H=(O+.5)*Dt;return z*x>15&&z*x<43&&H<-61});c(y,8,10.58,"dirt"),c(y,10.58,11.01,"grass");const w=y.filter(([U,O])=>Math.abs((U+.5)*Dt)>25&&(O+.5)*Dt<-65);c(w,11.01,12.3,"dirt"),c(w,12.3,12.73,"grass")}const g=[];for(let x=0;x<64;x++){const y=-72+x*132.3/64,w=-72+(x+1)*132.3/64,U=h(y),O=h(w);for(const z of[[U-3.1,1.02,y],[O-3.1,1.02,w],[O+3.1,1.02,w],[U-3.1,1.02,y],[O+3.1,1.02,w],[U+3.1,1.02,y]])g.push(...z)}const m=new lt;m.setAttribute("position",new je(g,3)),m.computeVertexNormals(),a(m,"water");const p=new Ii(6.2,23,i?1:4,1);p.translate(h(60.3),-10.48,60.3),a(p,"water");for(let x=0;x<14;x++)o(h(60.3)+Math.sin(x*2.17)*2.4,-22-x*.36,60.3,.25,.43,.25,"white",.04);for(let x=0;x<18;x++)o(h(-59+x*6.3)+Math.sin(x*1.7)*1.2,1.04,-59+x*6.3,1.2,.025,.08,"white",0);function T(x,y,w,U){const O=[];for(let H=0;H<t.count;H++){const k=t.samples[H],K=t.samples[H+1],X=(ee,ae)=>[ee.x+ee.nx*ae,ee.y+w,ee.z+ee.nz*ae],V=[X(k,x),X(K,x),X(K,y),X(k,y)];for(const ee of[0,2,1,0,3,2])O.push(...V[ee])}const z=new lt;z.setAttribute("position",new je(O,3)),z.computeVertexNormals(),a(z,U)}const S=t.width/2,M=S+t.curb;T(-M,M,0,"asphalt"),T(-M,M,-.34,"underside");for(const x of[-1,1]){const y=[],w=[],U=[],O=[],z=i?8:4;let H=-100;for(let k=0;k<t.count;k++){const K=t.samples[k],X=t.samples[k+1],V=(ye,Ie,Ne)=>[ye.x+ye.nx*Ie,ye.y+Ne,ye.z+ye.nz*Ie],ee=[V(K,x*S,.035),V(X,x*S,.035),V(X,x*M,.035),V(K,x*M,.035)];for(const ye of[0,2,1,0,3,2])(Math.floor(K.distance/2.15)%2?w:y).push(...ee[ye]);const ae=[V(K,x*M,0),V(X,x*M,0),V(X,x*M,-.34),V(K,x*M,-.34)];for(const ye of[0,1,2,0,2,3])U.push(...ae[ye]);for(const ye of[.53,1.04]){const Ie=[V(K,x*(M+.06),ye-.07),V(X,x*(M+.06),ye-.07),V(X,x*(M+.06),ye+.07),V(K,x*(M+.06),ye+.07)];for(const Ne of[0,1,2,0,2,3])O.push(...Ie[Ne])}K.distance-H>z&&(H=K.distance,o(K.x+K.nx*x*(M+.06),K.y+.55,K.z+K.nz*x*(M+.06),.16,1.18,.16,"rail",.02))}for(const[k,K]of[[y,"red"],[w,"white"],[U,"underside"],[O,"rail"]]){const X=new lt;X.setAttribute("position",new je(k,3)),X.computeVertexNormals(),a(X,K)}}const I=t.samples[0];for(let x=0;x<10;x++)for(let y=0;y<2;y++)o(I.x+(y-.5)*.6,I.y+.05,I.z+(x-4.5)*t.width/10,.6,.035,t.width/10,(x+y)%2?"asphalt":"white",0);const A=[];function L(x,y,w,U=1){if(U*=1.5,!(t.nearest(x,y).distance<M+3.3)){o(x,w+2.4*U,y,1.3*U,4.8*U,1.3*U,"wood",.15);for(const[z,H,k,K]of[[0,5.4,0,4.6],[-1.8,4.8,0,2.8],[1.7,4.9,.3,3],[.1,6.8,-.4,3],[-.5,5.1,1.8,2.8]])o(x+z*U,w+H*U,y+k*U,K*U,K*.8*U,K*U,"leaf",.3);A.push({kind:"tree",x,z:y,y:w})}}for(const[x,y,w,U]of[[-49,43,8,.95],[47,44,8,.9],[-51,-18,8,.85],[50,-19,8,.9],[-30,-67,12.73,1.15],[30,-67,12.73,1.1],[-15,45,8,.75],[16,46,8,.8],[-51,-53,8,.8],[51,-53,8,.85]])L(x,y,w,U);const N=[[-33,27],[-22,9],[-33,-9],[-22,-27],[-33,-45],[33,27],[22,9],[33,-9],[22,-27],[33,-45],[-48,8],[48,-37],[-19,-63],[19,-62]];for(const[x,[y,w]]of N.entries())if(!(t.nearest(y,w).distance<M+1.3)){x<10&&(o(y,8.5,w,5.16,.86,5.16,"dirt",.16),o(y,9.04,w,5.16,.22,5.16,"grass",.08));for(let U=0;U<3;U++)o(y+(U-1)*.9,(x<10?9.2:8.45)+U*.32,w+U%2*.7,1.25,1.2+U*.5,1.25,x%2?"rock":"leaf",.18);if(x%2===0)for(let U=0;U<3;U++)o(y+(U-1)*.65,x<10?9.85:9.1,w+.4,.35,.4,.35,"flower",.05)}for(const[x,y]of n){const w=Tu(y,!1);w.computeBoundingBox(),w.computeBoundingSphere();const U=new tt(w,s.get(x));U.name=`Canyon ${x} — continuous material surfaces`,U.castShadow=x!=="water"&&x!=="white",U.receiveShadow=!0,e.add(U);for(const O of y)O.dispose()}return e.userData={concept:5,grid:.43,bridgeCount:2,routeLength:t.length,trackWidth:t.width},{group:e,route:t,scenery:A,center:new R(0,1,-9),getStats:()=>({...e.userData,drawCalls:e.children.length,triangles:e.children.reduce((x,y)=>x+y.geometry.attributes.position.count/3,0)})}}const h_=120*.44704,f_=1.25,Ya=(i,e,t)=>Math.max(e,Math.min(t,i)),d_=(i,e,t)=>i<e?Math.min(e,i+t):Math.max(e,i-t);function tl(i){const e=i.samples[Math.ceil(i.count*3/i.length)];return{x:e.x,y:e.y,z:e.z,yaw:Math.atan2(e.tx,e.tz),speed:0,lateral:0,steering:0,hold:0,holdDirection:0,wheel:0,pitch:0,contact:0,elapsed:0,lastLap:null,lap:1,nextGate:1,progress:i.nearest(e.x,e.z).progress,started:!1}}function nl(i,e,t,n){const r=Ya(e.steer||0,-1,1),s=Ya(e.throttle||0,-1,1);i.contact=Math.max(0,i.contact-t),s>0?i.speed=Math.min(h_,i.speed+(i.speed<0?32:24)*t):s<0?i.speed=Math.max(-6,i.speed-(i.speed>0?34:8)*t):i.speed=d_(i.speed,0,(1.8+.0035*i.speed*i.speed)*t),r&&Math.sign(r)===i.holdDirection?i.hold+=t:(i.hold=0,i.holdDirection=Math.sign(r));const a=Ya((i.hold-.5)/.8,0,1),o=.415/(1+Math.abs(i.speed)/11)*(1+.2*a*a*(3-2*a)),l=r*o,c=l*i.steering>=0&&Math.abs(l)>Math.abs(i.steering);i.steering+=(l-i.steering)*(1-Math.exp(-(c?6.5:14)*t));const u=i.contact>0&&s>0?Math.max(2,i.speed):i.speed;i.yaw+=u/2.03*Math.tan(i.steering)*t,i.lateral*=Math.exp(-8*t);const h=Math.sin(i.yaw),f=Math.cos(i.yaw);let d=h*i.speed+f*i.lateral,_=f*i.speed-h*i.lateral;i.x+=d*t,i.z+=_*t;const g=n.nearest(i.x,i.z),m=n.width/2-f_;if(g.distance>m){const M=(i.x-g.x)/g.distance,I=(i.z-g.z)/g.distance,A=d*M+_*I;if(i.x=g.x+M*m,i.z=g.z+I*m,A>0){const L=i.contact<=0&&A>2?.08:0;d-=(1+L)*A*M,_-=(1+L)*A*I;const N=d*g.tx+_*g.tz,x=Math.exp(-1.2*t);d+=g.tx*N*(x-1),_+=g.tz*N*(x-1),i.contact=.14}}i.speed=d*h+_*f,i.lateral=d*f-_*h,i.y=g.y,i.wheel+=i.speed*t/.34;const p=n.nearest(i.x+h,i.z+f),T=n.nearest(i.x-h,i.z-f);i.pitch+=(-Math.atan2(p.y-T.y,2)-i.pitch)*(1-Math.exp(-10*t)),!i.started&&Math.abs(i.speed)>.5&&(i.started=!0),i.started&&(i.elapsed+=t);const S=(g.progress-i.progress+1)%1;if(i.started&&S<.1){const M=i.nextGate/4;i.nextGate<4&&i.progress<M&&g.progress>=M&&i.nextGate++,i.nextGate===4&&i.progress>.9&&g.progress<.1&&(i.lastLap=i.elapsed,i.elapsed=0,i.lap++,i.nextGate=1)}i.progress=g.progress}function p_({route:i,scene:e,camera:t,software:n,onRender:r,onExit:s}){const a=new Ut;a.name="Canyon kart — independent driving",e.add(a);const o=new Ut;a.add(o);const c=Object.fromEntries(Object.entries({red:"#e75d40",dark:"#343c44",black:"#242831",silver:"#d1d9d5",seat:"#684c39",lamp:"#fff1ba"}).map(([V,ee])=>[V,new Pi({color:ee,roughness:.68})]));function u(V,ee,ae,ye,Ie,Ne,Ue,$,ce=.08){const ge=n?new cn(Ie,Ne,Ue):new Jn(Ie,Ne,Ue,2,ce),Pe=new tt(ge,c[$]);return Pe.position.set(ee,ae,ye),Pe.castShadow=!0,V.add(Pe),Pe}u(o,0,.4,0,1.3,.24,2.15,"dark"),u(o,0,.65,.65,1.25,.34,.9,"red"),u(o,0,.57,-.88,1.3,.38,.5,"red"),u(o,0,.61,-.25,.72,.18,.66,"seat"),u(o,0,.91,-.58,.72,.65,.18,"seat"),u(o,0,.35,1.15,1.7,.16,.16,"silver",.04),u(o,0,.35,-1.15,1.7,.16,.16,"silver",.04),u(o,0,.7,.05,.13,.36,.13,"silver",.035);const h=new tt(new sa(.23,.035,5,16),c.dark);h.position.set(0,.97,.15),h.rotation.x=-.7,o.add(h);const f=[],d=[];for(const V of[-.88,.88])for(const ee of[-.77,.77]){const ae=new Ut;ae.position.set(V,.34,ee),o.add(ae),ee>0&&d.push(ae);const ye=new Ut;ae.add(ye),f.push(ye);const Ie=new tt(new Ci(.34,.34,.3,n?8:14),c.black);Ie.rotation.z=Math.PI/2,Ie.castShadow=!0,ye.add(Ie);const Ne=new tt(new Ci(.17,.17,.315,8),c.silver);Ne.rotation.z=Math.PI/2,ye.add(Ne)}let _=tl(i),g=!1,m=0,p=0;const T=new Set,S=new Map,M=new Map,I=document.querySelector("#drive-ui"),A=document.querySelector("#drive-controls"),L=new Set(["KeyE","KeyD","KeyS","KeyF","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]);function N(){const V=ae=>T.has(ae),ee=ae=>[...S.values()].includes(ae);return{throttle:V("KeyD")||V("ArrowDown")||ee("brake")?-1:V("KeyE")||V("ArrowUp")||ee("gas")?1:0,steer:Number(V("KeyF")||V("ArrowRight")||ee("right"))-Number(V("KeyS")||V("ArrowLeft")||ee("left"))}}function x(){T.clear(),S.clear();for(const[V,ee]of M)ee.hasPointerCapture(V)&&ee.releasePointerCapture(V);M.clear();for(const V of A.querySelectorAll("button"))V.classList.remove("pressed")}window.addEventListener("keydown",V=>{!g||!L.has(V.code)||(V.preventDefault(),T.add(V.code))}),window.addEventListener("keyup",V=>T.delete(V.code));for(const V of A.querySelectorAll("[data-drive]")){V.addEventListener("pointerdown",ae=>{g&&(ae.preventDefault(),S.set(ae.pointerId,V.dataset.drive),M.set(ae.pointerId,V),V.setPointerCapture(ae.pointerId),V.classList.add("pressed"))});const ee=ae=>{S.delete(ae.pointerId),M.delete(ae.pointerId),V.classList.toggle("pressed",[...S.values()].includes(V.dataset.drive))};for(const ae of["pointerup","pointercancel","lostpointercapture"])V.addEventListener(ae,ee);V.addEventListener("contextmenu",ae=>ae.preventDefault())}for(const V of["blur","pagehide","resize"])window.addEventListener(V,x);document.addEventListener("visibilitychange",()=>{document.hidden&&x()});const y=new R,w=new R;function U(V=1){const ee=Math.sin(_.yaw),ae=Math.cos(_.yaw);w.set(_.x-ee*10,_.y+5.8,_.z-ae*10),t.position.lerp(w,1-Math.exp(-7*V)),y.set(_.x+ee*7,_.y+.6,_.z+ae*7),t.lookAt(y),t.aspect=innerWidth/innerHeight,t.updateProjectionMatrix()}function O(){a.position.set(_.x,_.y+.03,_.z),a.rotation.y=_.yaw,o.rotation.x=_.pitch;for(const V of f)V.rotation.x=_.wheel;for(const V of d)V.rotation.y=_.steering;h.rotation.z=-_.steering*2}function z(V){const ee=Math.floor(V/60),ae=(V%60).toFixed(2).padStart(5,"0");return`${ee}:${ae}`}function H(){document.querySelector("#drive-speed").textContent=Math.round(Math.abs(_.speed)/.44704),document.querySelector("#drive-time").textContent=z(_.elapsed),document.querySelector("#drive-lap").textContent=`Lap ${_.lap}`,document.querySelector("#drive-last").textContent=_.lastLap===null?_.started?"Follow the full loop":"Move forward to start your lap":`Last lap ${z(_.lastLap)}`}function k(V){if(m=0,!g)return;let ee=p?Math.min(.05,(V-p)/1e3):1/60;for(p=V;ee>0;){const ae=Math.min(.008333333333333333,ee);nl(_,N(),ae,i),ee-=ae}O(),U(1/60),H(),r(),m=requestAnimationFrame(k)}function K(){x(),_=tl(i),O(),H(),g&&U(),r()}function X(V){g=V,I.hidden=!V,A.hidden=!V||navigator.maxTouchPoints===0,document.body.classList.toggle("canyon-driving",V),x(),m&&cancelAnimationFrame(m),m=0,p=0,V&&(U(),m=requestAnimationFrame(k)),H()}return document.querySelector("#drive-reset").onclick=K,document.querySelector("#drive-exit").onclick=()=>{X(!1),s()},O(),H(),{group:a,camera:t,reset:K,setDriving:X,syncCamera:U,release:x,isDriving:()=>g,getState:()=>({..._,input:N()}),step:(V,ee)=>{nl(_,V,ee,i),O(),H()},place:V=>{const ee=i.samples[Math.floor(V*i.count)%i.count];_.x=ee.x,_.y=ee.y,_.z=ee.z,_.yaw=Math.atan2(ee.tx,ee.tz),_.speed=0,_.lateral=0,_.progress=V,O()},frontWheels:d}}async function m_(){const i=await fetch(eh).then(P=>{if(!P.ok)throw new Error("The island geometry could not load.");return P.arrayBuffer()}),e=new Co,t=new Ut,n=new Ut,r=new Ut;t.name="Floating Garden — connected material surfaces",n.name="Island terrain and five trees",r.name="Three merged cloud shapes",t.add(n,r),e.add(t);let s,a=!1;for(const P of[{antialias:!0,powerPreference:"default"},{antialias:!1,powerPreference:"default"},{antialias:!1,powerPreference:"low-power"}])try{s=new Su({...P,alpha:!0,preserveDrawingBuffer:!0,failIfMajorPerformanceCaveat:!1});break}catch{}if(!s){const P=await Nu(()=>import("./compatibility-faces-Bceo-6z4.js"),[],import.meta.url);s=i_(P.default),a=!0}s.setPixelRatio(Math.min(devicePixelRatio,1)),s.setSize(innerWidth,innerHeight),a||(s.outputColorSpace=Lt,s.toneMapping=fo,s.toneMappingExposure=1,s.shadowMap.enabled=!1,s.shadowMap.type=Qt),document.body.appendChild(s.domElement),s.domElement.dataset.graphics=a?"canvas":"webgl";const o=new ca(-12,12,9,-9,.1,650),l=new V0(o,s.domElement),c=new R(7.74,-.25,-6.88);let u=o;if(l.target.copy(c),l.enablePan=!1,l.enableDamping=!1,l.minZoom=.65,l.maxZoom=4,l.maxPolarAngle=Math.PI*.85,!a){const P=new t_,W=new zs(s);e.environment=W.fromScene(P,.04).texture,e.environmentIntensity=.4,P.dispose(),W.dispose()}e.add(new fu("#fff8ea","#b4c8df",1.05));const h=new oo("#fff0d1",2.8);h.position.copy(c).add(new R(-10,18,12)),h.target.position.copy(c),h.castShadow=!0,h.shadow.mapSize.set(1024,1024),Object.assign(h.shadow.camera,{left:-11,right:11,top:11,bottom:-11,near:.1,far:48}),h.shadow.normalBias=.003,h.shadow.bias=-15e-6,h.shadow.radius=5,h.shadow.blurSamples=8,e.add(h,h.target);const f=new oo("#edf7ff",.45);f.position.copy(c).add(new R(14,6,-12)),e.add(f);const d={grass:"#91cb34",dirt:"#ca8e57",stone:"#a6a1ad",path:"#dcd1b9",sand:"#cbc9ad",wood:"#986332",leaf:"#76b62f",rock:"#bdb4b7",shrub:"#6ba52b",flowerPink:"#ef8644",flowerGold:"#f4c73c",flowerWhite:"#fff6dd",stem:"#5c952f",cloud:"#ffffff"},_=new Map;for(const[P,W]of Object.entries(d))_.set(P,new Pi({color:W,roughness:P==="cloud"?.9:.77,metalness:0}));for(const P of jo){let W,Z;P.kind==="box"?(W=new Jn(P.size_m,P.size_m,P.size_m,4,P.size_m*.085),Z=new tt(W,_.get(P.type)),Z.position.fromArray(P.position_m)):(W=new lt,W.setAttribute("position",new Et(new Float32Array(i,P.positionOffset,P.vertexCount*3),3)),W.setAttribute("normal",new Et(new Float32Array(i,P.normalOffset,P.vertexCount*3),3)),W.setIndex(new Et(new Uint32Array(i,P.indexOffset,P.indexCount),1)),Z=new tt(W,_.get(P.type))),W.computeBoundingBox(),W.computeBoundingSphere(),Z.name=`${P.type} — ${P.features.join(", ")} — ${P.sourceBlockIds.length} source blocks`,Z.castShadow=P.type!=="cloud",Z.receiveShadow=P.type!=="cloud",Z.userData={type:P.type,features:P.features,sourceBlockIds:P.sourceBlockIds,merged:!0},(P.type==="cloud"?r:n).add(Z)}for(const P of[n,r]){const W=new Map;for(const Z of[...P.children]){const re=Z.userData.type;W.has(re)||W.set(re,[]),W.get(re).push(Z)}for(const[Z,re]of W){const _e=[],Se=[],E=[];for(const q of re){q.updateMatrix();const ie=q.geometry.clone();ie.applyMatrix4(q.matrix),ie.deleteAttribute("uv"),ie.index||ie.setIndex(Array.from({length:ie.attributes.position.count},(Y,Ce)=>Ce)),ie.computeBoundingBox(),Se.push(ie.boundingBox.clone()),E.push({...q.userData,name:q.name}),_e.push(ie),P.remove(q),q.geometry.dispose()}const v=Tu(_e,!1),F=new tt(v,_.get(Z));F.name=`${Z} — merged material surfaces`,F.castShadow=Z!=="cloud",F.receiveShadow=Z!=="cloud",F.userData={type:Z,parts:E,merged:!0},F.userData.fitBoxes=Se.map(q=>({min:q.min.toArray(),max:q.max.toArray()})),P.add(F);for(const q of _e)q.dispose()}}const g=.1075,m=[],p=[];for(const[P,W]of ln.pond_cells){const Z=P*.43,re=Z+.43,_e=-W*.43,Se=_e-.43,E=-g;m.push(Z,E,_e,re,E,_e,re,E,Se,Z,E,_e,re,E,Se,Z,E,Se);for(let v=0;v<6;v++)p.push(0,1,0)}const T=new lt;T.setAttribute("position",new je(m,3)),T.setAttribute("normal",new je(p,3));const S=new ao({color:"#28c9de",roughness:.24,clearcoat:.8,clearcoatRoughness:.22,transparent:!0,opacity:.88,depthWrite:!1}),M=new tt(T,S);M.name="Pond and connected waterfall outlet",M.receiveShadow=!0,M.renderOrder=2,n.add(M),new Set(ln.pond_cells.map(([P,W])=>P+","+W));const I=new wi({color:"#e3ffff",transparent:!0,opacity:.58});for(const[P,[W,Z]]of ln.pond_cells.entries())if(P%2===0){const re=(W+.5)*.43,_e=-(Z+.5)*.43,Se=new na(new R(re-.12,-g+.006,_e),new R(re,-g+.006,_e-.035),new R(re+.12,-g+.006,_e)),E=new tt(new aa(Se,10,.006,4,!1),I);E.name="Pond ripple",E.renderOrder=3,n.add(E)}const A=new Ut;A.name="Waterfall — continuous curved lip and falling sheet",n.add(A);const L=(ln.waterfall.x_min_q+ln.waterfall.x_max_q)*g/2,N=-ln.waterfall.edge_y_q*g,x=(ln.waterfall.x_max_q-ln.waterfall.x_min_q)*g,y=3.3;function w(P,W){let re,_e;if(W<.15){const E=W/.15*Math.PI/2;re=-g-.18*(1-Math.cos(E)),_e=N+.18*Math.sin(E)}else re=-g-.18-(W-.15)/(1-.15)*(y-.18),_e=N+.18+.045*Math.sin((W-.15)*4);const Se=x*(1-.28*W);return new R(L+P*Se/2+.014*Math.sin(W*30+P*3),re,_e+.008*Math.cos(P*9+W*18))}const U=[],O=[],z=[],H=12,k=48;for(let P=0;P<=k;P++)for(let W=0;W<=H;W++){const Z=w(W/H*2-1,P/k);U.push(Z.x,Z.y,Z.z),O.push(W/H,P/k)}for(let P=0;P<k;P++)for(let W=0;W<H;W++){const Z=P*(H+1)+W,re=Z+1,_e=Z+H+1,Se=_e+1;z.push(Z,_e,re,re,_e,Se)}const K=new lt;K.setAttribute("position",new je(U,3)),K.setAttribute("uv",new je(O,2)),K.setIndex(z),K.computeVertexNormals();const X=new tt(K,new ao({color:"#38d2e7",roughness:.27,clearcoat:.65,transparent:!0,opacity:.7,side:qt,depthWrite:!1}));X.renderOrder=3,X.name="Flowing water sheet",A.add(X);const V=new Qs({color:"#efffff",transparent:!0,opacity:.66,depthWrite:!1});for(const[P,W]of[-.8,-.4,.04,.44,.8].entries()){const Z=[];for(let Se=0;Se<30;Se++){const E=.025+Se/29*(.72+P*.035),v=w(W,E);v.z+=.009,Z.push(v)}const re=new lt().setFromPoints(Z),_e=new Po(re,V);_e.renderOrder=4,_e.name="Waterfall highlight",A.add(_e)}const ee=new Ro(new Jn(.055,.085,.055,2,.012),new wi({color:"#e4fbff",transparent:!0,opacity:.72}),26),ae=new pt;for(let P=0;P<26;P++){const W=P/25;ae.position.set(L+Math.sin(P*2.37)*.28*(1-W),-g-y-.08-P*.031,N+.23+Math.cos(P*1.73)*.08),ae.scale.setScalar(.45+P%4*.16),ae.updateMatrix(),ee.setMatrixAt(P,ae.matrix)}ee.name="Waterfall droplets",A.add(ee);const ye=n_({THREE:k0,RoundedBoxGeometry:Jn,world:t,renderer:s,camera:u,onRender:()=>be(),onExit:()=>Ke("front")}),Ie=u_({software:a});e.add(Ie.group);const Ne=p_({route:Ie.route,scene:e,camera:new It(58,innerWidth/innerHeight,.1,650),software:a,onRender:()=>be(),onExit:()=>Ke("front")});let Ue;if(a){const P=Hr(ye.group),W=Hr(A),Z=Hr(Ne.group);Ue=Hr(Ie.group)(),s.setActorProvider(()=>ge==="canyon"?Z():[...W(),...P()],()=>r.visible&&ge==="garden"),document.querySelector("footer").textContent="Compatibility view · Drag to orbit · Scroll or pinch to zoom";for(const re of document.querySelector("#quality").options)re.value!=="low"&&(re.disabled=!0)}let $="front",ce="low",ge="canyon";const Pe={front:new R(10,10.5,20),back:new R(-18,12,-19),low:new R(11,6,23),top:new R(0,40,.001)};function be(){s.render(e,u)}function qe(){u.updateMatrixWorld(!0),t.updateMatrixWorld(!0);const P=u.matrixWorldInverse,W=new R,Z=new nt;let re=1/0,_e=-1/0,Se=1/0,E=-1/0;(ge==="canyon"?Ie.group:t).traverse(Y=>{if(!Y.isMesh||!Y.visible||!Y.parent.visible)return;Y.geometry.boundingBox||Y.geometry.computeBoundingBox();const Ce=Y.geometry.boundingBox;function de(Te,we=Ce){for(const fe of[we.min.x,we.max.x])for(const ve of[we.min.y,we.max.y])for(const Oe of[we.min.z,we.max.z])W.set(fe,ve,Oe).applyMatrix4(Te).applyMatrix4(P),re=Math.min(re,W.x),_e=Math.max(_e,W.x),Se=Math.min(Se,W.y),E=Math.max(E,W.y)}if(Y.userData.fitBoxes){for(const Te of Y.userData.fitBoxes)de(Y.matrixWorld,new bn(new R().fromArray(Te.min),new R().fromArray(Te.max)));return}if(Y.isInstancedMesh)for(let Te=0;Te<Y.count;Te++)Y.getMatrixAt(Te,Z),de(new nt().multiplyMatrices(Y.matrixWorld,Z));else de(Y.matrixWorld)});const v=innerWidth/innerHeight,F=Math.max((E-Se)/2,(_e-re)/(2*v))*1.09,q=(re+_e)/2,ie=(Se+E)/2;u.left=q-F*v,u.right=q+F*v,u.top=ie+F,u.bottom=ie-F,u.updateProjectionMatrix()}function Ke(P){if(P==="golf"){D();return}if(P==="drive"){oe();return}Ne.setDriving(!1),ye.setPlaying(!1),l.enabled=!0,u=o;const W=ge==="canyon"?Ie.center:c;$=P,r.visible=P!=="top",u.up.set(0,1,0),u.zoom=1,u.position.copy(W).addScaledVector(Pe[P],ge==="canyon"?9:1),l.target.copy(W),u.lookAt(W),l.enableRotate=P!=="top",l.update(),qe(),be()}function D(){ge!=="garden"&&ne("garden"),Ne.setDriving(!1),u=o,$="golf",r.visible=!1,l.enabled=!1,ye.setPlaying(!0),u.up.set(0,1,0),u.zoom=1,u.position.copy(ye.focus).add(new R(1.8,5.8,5.7)),u.lookAt(ye.focus);const P=innerWidth/innerHeight,W=Math.max(4.8,5.8/P);u.left=-W*P/2,u.right=W*P/2,u.top=W/2,u.bottom=-W/2,u.updateProjectionMatrix(),be()}function oe(){ge!=="canyon"&&ne("canyon"),ye.setPlaying(!1),u=Ne.camera,$="drive",l.enabled=!1,u.up.set(0,1,0),Ne.setDriving(!0),be()}function ne(P){ge=P,t.visible=P==="garden",Ie.group.visible=P==="canyon",Ne.group.visible=P==="canyon",a&&s.setBaseFaces(P==="canyon"?Ue:null),document.querySelector("#play-golf").hidden=P!=="garden",document.querySelector("#drive-canyon").hidden=P!=="canyon",document.querySelector("#show-garden").hidden=P==="garden",document.querySelector("#show-canyon").hidden=P==="canyon",document.querySelector("header h1").textContent=P==="canyon"?"Canyon Switchbacks":"Floating Garden",document.querySelector("header p").textContent=P==="canyon"?"Two bridges. One winding lap.":"A little island. One little golf hole.";const W=P==="canyon"?Ie.center:c,Z=P==="canyon"?8:1;h.target.position.copy(W),h.position.copy(W).add(new R(-10,18,12).multiplyScalar(Z)),Object.assign(h.shadow.camera,{left:-11*Z,right:11*Z,top:11*Z,bottom:-11*Z,far:48*Z}),h.shadow.camera.updateProjectionMatrix(),Ke("front")}function te(P){if(a&&P!=="low")return!1;ce=P;const W={low:{ratio:1,shadow:0},good:{ratio:1.5,shadow:1024},excellent:{ratio:2,shadow:2048}}[P];s.setPixelRatio(Math.min(devicePixelRatio,W.ratio)),s.shadowMap.enabled=W.shadow>0,W.shadow&&(h.shadow.mapSize.set(W.shadow,W.shadow),h.shadow.map&&(h.shadow.map.dispose(),h.shadow.map=null),h.shadow.mapPass&&(h.shadow.mapPass.dispose(),h.shadow.mapPass=null)),s.setSize(innerWidth,innerHeight),document.querySelector("#quality").value=P;try{localStorage.setItem("letsgo.garden.graphics.v1",P)}catch{}be()}for(const P of document.querySelectorAll("[data-view]"))P.onclick=()=>Ke(P.dataset.view);document.querySelector("#play-golf").onclick=D,document.querySelector("#drive-canyon").onclick=oe,document.querySelector("#show-garden").onclick=()=>ne("garden"),document.querySelector("#show-canyon").onclick=()=>ne("canyon"),document.querySelector("#quality").onchange=P=>te(P.target.value),l.addEventListener("change",be),window.addEventListener("resize",()=>{s.setSize(innerWidth,innerHeight),$==="drive"?(Ne.syncCamera(),be()):Ke($)});try{const P=localStorage.getItem("letsgo.garden.graphics.v1");["low","good","excellent"].includes(P)&&te(P)}catch{}ne("canyon"),document.querySelector("#loading").remove(),window.referenceIsland={world:t,land:n,clouds:r,fall:A,pond:M,golf:ye,canyon:Ie,drive:Ne,renderer:s,scene:e,get camera(){return u},controls:l,plan:ln,summary:Qu,components:jo,setupView:Ke,setWorld:ne,setQuality:te,render:be,clean:()=>document.body.classList.add("clean"),getQuality:()=>ce,getWorld:()=>ge},window.referenceIslandReady=!0,window.__letsgoGarden=window.referenceIsland,s.domElement.dataset.ready="true"}m_().catch(i=>{console.error("Floating Garden could not start.",i);const e=document.getElementById("loading");if(e){e.replaceChildren();const t=document.createElement("section");t.className="load-error";const n=document.createElement("h2");n.textContent="The garden couldn’t open";const r=document.createElement("p");r.textContent="Close other 3D tabs, restart your browser, and try again.";const s=document.createElement("button");s.type="button",s.textContent="Try again",s.onclick=()=>location.reload(),t.append(n,r,s),e.append(t)}});
