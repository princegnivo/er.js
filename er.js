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

/* ===== MODE RETARD - TECHNIQUE DU CALQUE (POCKET OPTION) ===== */
window._rDelay = 6000;
window._rOn = false;
window._rOverlay = null;
window._rSrc = null;
window._rWrapper = null;
window._rShowRealDot = false;

window.r = function() {
    if (window._rOn) {
        if (window._rWrapper) window._rWrapper.remove();
        if (window._rSrc) window._rSrc.style.opacity = '';
        window._rOn = false;
        return 'Retard OFF';
    }

    // On cherche l'élément parent qui contient le graphique (souvent un div avec position absolute ou relative)
    var canvas = [].slice.call(document.querySelectorAll('canvas')).filter(function(x){return x.width > 300 && x.height > 200;})[0];
    if (!canvas) return 'Graphique introuvable.';

    // On cherche le conteneur du graphique (souvent le parent direct ou le grand-parent)
    var container = canvas.parentElement;
    while (container && container !== document.body && container.getBoundingClientRect().height < 100) {
        container = container.parentElement;
    }
    if (!container) return 'Conteneur introuvable';

    window._rSrc = canvas;
    window._rOn = true;

    // On crée une "fenêtre" (wrapper) qui va afficher un clone du graphique
    var wrapper = document.createElement('div');
    wrapper.id = 'po-retard-wrapper';
    
    // On le place exactement par-dessus le graphique d'origine
    var rect = container.getBoundingClientRect();
    wrapper.style.cssText = `
        position: fixed !important;
        top: ${rect.top}px !important;
        left: ${rect.left}px !important;
        width: ${rect.width}px !important;
        height: ${rect.height}px !important;
        z-index: 99999 !important;
        overflow: hidden !important;
        pointer-events: none !important;
        background: #0f1622 !important; /* Couleur de fond de Pocket Option */
    `;

    // On clone le conteneur entier du graphique
    var clone = container.cloneNode(true);
    clone.style.transform = 'translateY(-15px)'; // Décalage pour simuler le retard
    clone.style.opacity = '1';
    clone.style.pointerEvents = 'none';
    
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);
    window._rWrapper = wrapper;

    // On cache le vrai graphique en dessous
    canvas.style.opacity = '0';

    return 'Retard ON (Miroir)';
};

window.rDelay = function(s) {
    if (window._rWrapper && window._rWrapper.firstChild) {
        window._rWrapper.firstChild.style.transform = `translateY(${s}px)`;
    }
    return 'Décalage spatial: ' + s + 'px';
};
/* ===== FIN MODE RETARD ===== */
});
})();
