(function(){
if(window._er3){window._er3();return;}
function L(u,c){var s=document.createElement('script');s.src=u;s.onload=c;s.onerror=c;document.body.appendChild(s);}
L('https://cdn.jsdelivr.net/npm/eruda@3.0.1',function(){
try{eruda.init({useShadowDom:false});}catch(x){return;}
try{eruda._entryBtn.hide();}catch(x){}
var st=document.createElement('style');st.textContent='.eruda-entry-btn{display:none!important}';document.head.appendChild(st);
var o=true,ed=true,K='_er:'+location.href.split('#')[0],E={};
try{E=JSON.parse(localStorage.getItem(K)||'{}');}catch(x){}
function lock(){var r=document.getElementById('eruda');if(r)r.contentEditable='false';}
function path(el){var p=[];while(el&&el!==document.body&&el.parentNode){p.unshift([].indexOf.call(el.parentNode.children,el));el=el.parentNode;}return el===document.body&&p.length?p.join('/'):null;}
function find(s){var el=document.body;s.split('/').forEach(function(i){el=el&&el.children[+i];});return el;}
function apply(){for(var s in E){var el=find(s);if(el&&el.innerHTML!==E[s])el.innerHTML=E[s];}}
window._er3=function(){o?eruda.hide():eruda.show();o=!o;};
window.h=function(){eruda.hide();o=false;return'masqué';};
window.e=function(){ed=!ed;document.body.contentEditable=ed;lock();return ed?'édition ON':'édition OFF';};
window._erClear=function(){localStorage.removeItem(K);E={};return'modifs effacées';};
document.addEventListener('input',function(ev){try{var g=ev.target;if(g.matches&&g.matches('input,textarea'))return;var a=getSelection().anchorNode;if(!a)return;var el=a.nodeType==1?a:a.parentNode;if(!el||(el.closest&&el.closest('#eruda')))return;var p=path(el);if(!p)return;E[p]=el.innerHTML;localStorage.setItem(K,JSON.stringify(E));}catch(x){}},true);
try{apply();setTimeout(apply,1000);setTimeout(apply,3000);}catch(x){}
var KW=/vrais profits|argent r.el|vrais fonds|real money|real funds|Investir l.argent/i;
function bad(n){var t=n.textContent||'';return!/ACHAT|VENTE/.test(t)&&t.length<400&&n.offsetHeight<innerHeight*.4;}
function hit(e){if(!e||e.closest('#eruda'))return;var p=e;while(p.parentElement&&p.parentElement!==document.body&&bad(p.parentElement))p=p.parentElement;p.style.setProperty('display','none','important');}
function scan(n){if(n.nodeType===3){if(KW.test(n.nodeValue))hit(n.parentElement);return;}if(n.nodeType!==1)return;var w=document.createTreeWalker(n,4),x;while(x=w.nextNode()){if(KW.test(x.nodeValue))hit(x.parentElement);}}
new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var m=ms[i];if(m.type==='characterData'){if(KW.test(m.target.nodeValue))hit(m.target.parentElement);}else for(var j=0;j<m.addedNodes.length;j++)scan(m.addedNodes[j]);}}).observe(document.body,{childList:true,subtree:true,characterData:true});
scan(document.body);
var PH=50;
function tx(re){var w=document.createTreeWalker(document.body,4),x;while(x=w.nextNode()){if(re.test(x.nodeValue)&&x.parentElement&&!x.parentElement.closest('#eruda'))return x.parentElement;}return null;}
function sp(e,ob){for(var k in ob)e.style.setProperty(k,ob[k],'important');}
function cm(){try{
var t=tx(/^\s*Transactions\s*$/i),p=tx(/^\s*Plus\s*$/i),c=tx(/^\s*Classic mode\s*$/i),s=tx(/^\s*Signaux\s*$/i);
if(!t||!p||!c||!s)return;
var a=t;while(a&&!a.contains(p))a=a.parentElement;
if(!a||a===document.body||!a.contains(c))return;
var ci=c;while(ci.parentElement!==a)ci=ci.parentElement;
var si=s;while(si.parentElement!==a)si=si.parentElement;
var it=[].slice.call(a.children),d=getComputedStyle(si).display;
if(!d||d==='none')d='flex';
sp(a,{display:'flex','justify-content':'space-around','align-items':'center'});
it.forEach(function(e,i){sp(e,{flex:'1 1 0',width:'auto','min-width':'0','max-width':'none',position:'relative',left:'auto',right:'auto',transform:'none',order:String(i*2)});});
sp(ci,{display:d,visibility:'visible',opacity:'1',height:'auto','max-height':'none','pointer-events':'auto',order:String(it.indexOf(si)*2+1)});
if(document.body.classList.contains('is-chart-demo')){
var W=ci.getBoundingClientRect().width,ch=[];
var up=function(n){while(n&&n!==a){if(ch.indexOf(n)<0&&n.getBoundingClientRect().width>=W*.8)ch.push(n);if(n===ci)break;n=n.parentElement;}};
up(c.parentElement);
var im=ci.querySelector('img');if(im)up(im.parentElement);
if(ch.indexOf(ci)<0)ch.push(ci);
ch.forEach(function(n){sp(n,{height:PH+'px','min-height':PH+'px','max-height':'none','box-sizing':'border-box'});});
var bg=[].slice.call(ci.querySelectorAll('img.img-bg'));
bg.forEach(function(n){sp(n,{height:'100%',width:'100%','object-fit':'fill'});});
var vb=bg.filter(function(n){return n.getBoundingClientRect().height>0;})[0];
window._cmInfo='bouton='+Math.round(ci.getBoundingClientRect().height)+'px fond='+(vb?Math.round(vb.getBoundingClientRect().height):'?')+'px cible='+PH+'px';
}
}catch(x){}}
cm();setInterval(cm,500);
document.body.contentEditable='true';lock();eruda.show();
var Q=[['https://cdn.jsdelivr.net/npm/eruda-monitor@1','erudaMonitor'],['https://cdn.jsdelivr.net/npm/eruda-features@2','erudaFeatures'],['https://cdn.jsdelivr.net/npm/eruda-timing@2','erudaTiming'],['https://cdn.jsdelivr.net/npm/eruda-dom@2','erudaDom']];
function nxt(){var q=Q.shift();if(!q)return;L(q[0],function(){try{if(window[q[1]])eruda.add(window[q[1]]);}catch(x){}nxt();});}
nxt();

/* ===== MODE RETARD r() ===== */
window._rDelay=6000;
window._rStep=100;            // 100ms = plus fluide
window._rScale=0;             // 0 = résolution native (pas de réduction)
window._rOn=false;
window._rBuf=[];
window._rTimer=null;
window._rOverlay=null;
window._rSrc=null;
window._rShowRealDot=false;   // false = indicateur INVISIBLE

function _rFindChart(){
var c=[].slice.call(document.querySelectorAll('canvas')).filter(function(x){
return x.width>300&&x.height>200&&x.offsetWidth>0&&x.offsetHeight>0;
});
c.sort(function(a,b){return(b.width*b.height)-(a.width*a.height);});
return c[0];
}

function _rSync(ov,src){
var r=src.getBoundingClientRect();
ov.style.left=r.left+'px';
ov.style.top=r.top+'px';
ov.style.width=r.width+'px';
ov.style.height=r.height+'px';
}

function _rMakeOverlay(src){
if(window._rOverlay)window._rOverlay.remove();
var ov=document.createElement('canvas');
ov.width=src.width;
ov.height=src.height;
ov.style.position='fixed';
ov.style.pointerEvents='none';
ov.style.margin='0';
ov.style.padding='0';
ov.style.border='0';
ov.style.zIndex='2147483646';
_rSync(ov,src);
if(src.nextSibling)src.parentNode.insertBefore(ov,src.nextSibling);
else src.parentNode.appendChild(ov);
window._rOverlay=ov;
return ov;
}

/* Détecte la Y du vrai prix courant (bande de droite uniquement). */
function _rRealPriceY(live){
try{
var ctx=live.getContext('2d',{willReadFrequently:true});
if(!ctx)return -1;
var w=live.width,h=live.height;
var x0=Math.max(0,w-8);
var bw=w-x0;
var img=ctx.getImageData(x0,0,bw,h).data;
var bestY=-1,bestScore=0;
for(var y=0;y<h;y++){
var score=0;
for(var x=0;x<bw;x++){
var k=(y*bw+x)*4;
var r=img[k],g=img[k+1],b=img[k+2],a=img[k+3];
if(a<20)continue;
var mx=Math.max(r,g,b),mn=Math.min(r,g,b);
if(mx-mn>30)score+=2;
else if(mx<60)score+=1;
}
if(score>bestScore){bestScore=score;bestY=y;}
}
return bestY;
}catch(x){return -1;}
}

function _rStop(){
clearInterval(window._rTimer);
window._rTimer=null;
window._rOn=false;
if(window._rOverlay){window._rOverlay.remove();window._rOverlay=null;}
if(window._rSrc){window._rSrc.style.opacity='';window._rSrc.style.visibility='';}
window._rSrc=null;
window._rBuf=[];
}

window.r=function(){
if(window._rOn){_rStop();return'retard OFF';}
var src=_rFindChart();
if(!src)return'canvas du graphique introuvable';
var overlay=_rMakeOverlay(src);
var octx=overlay.getContext('2d');
window._rOn=true;
window._rSrc=src;
src.style.opacity='0';

window._rTimer=setInterval(function(){
try{
if(!window._rOn)return;
var live=window._rSrc;
if(!live||!live.isConnected){
live=_rFindChart();
if(!live)return;
window._rSrc=live;
live.style.opacity='0';
}
if(live.width!==overlay.width||live.height!==overlay.height){
overlay.width=live.width;
overlay.height=live.height;
}
_rSync(overlay,live);

var sc=window._rScale>0?Math.min(1,window._rScale/live.width):1;
var fw=Math.max(1,Math.round(live.width*sc));
var fh=Math.max(1,Math.round(live.height*sc));
var frame=document.createElement('canvas');
frame.width=fw;frame.height=fh;
frame.getContext('2d').drawImage(live,0,0,fw,fh);

window._rBuf.push({t:Date.now(),frame:frame});
while(window._rBuf.length&&Date.now()-window._rBuf[0].t>window._rDelay+1500){
window._rBuf.shift();
}

var delayed=null;
for(var i=0;i<window._rBuf.length;i++){
if(Date.now()-window._rBuf[i].t>=window._rDelay)delayed=window._rBuf[i].frame;
}

octx.clearRect(0,0,overlay.width,overlay.height);
if(delayed)octx.drawImage(delayed,0,0,overlay.width,overlay.height);
else octx.drawImage(live,0,0);

if(window._rShowRealDot){
var realY=_rRealPriceY(live);
if(realY>=0){
octx.beginPath();
octx.arc(overlay.width-6,realY,2,0,Math.PI*2);
octx.fillStyle='rgba(128,128,128,0.06)';
octx.fill();
}
}
}catch(x){}
},window._rStep);

return'retard ON : '+(window._rDelay/1000)+'s (canvas '+src.width+'x'+src.height+')';
};

window.rDelay=function(s){
window._rDelay=Math.max(0,Number(s)*1000);
return'retard = '+(window._rDelay/1000)+'s';
};

/* Affiche/cache l'indicateur du vrai prix (invisible par défaut). */
window.rDot=function(v){
window._rShowRealDot=!!v;
return'indicateur vrai prix : '+(window._rShowRealDot?'visible (discret)':'invisible');
};
/* ===== FIN MODE RETARD ===== */
});
})();
