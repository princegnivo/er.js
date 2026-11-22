window.r = function() {
    if (window._rOn) {
        if (window._rOverlay) window._rOverlay.remove();
        if (window._rSrc) window._rSrc.style.opacity = '';
        window._rOn = false;
        return 'Retard OFF';
    }

    var canvas = [].slice.call(document.querySelectorAll('canvas')).filter(function(x){return x.width > 300 && x.height > 200;}).sort(function(a,b){return (b.width*b.height)-(a.width*a.height);})[0];
    if (!canvas) return 'Graphique introuvable.';

    // On crée l'overlay (l'écran de retard)
    var ov = document.createElement('canvas');
    ov.width = canvas.width; ov.height = canvas.height;
    ov.style.cssText = 'position:fixed;pointer-events:none;z-index:2147483647;background:#000;';
    var rect = canvas.getBoundingClientRect();
    ov.style.left = rect.left + 'px'; ov.style.top = rect.top + 'px';
    ov.style.width = rect.width + 'px'; ov.style.height = rect.height + 'px';
    document.body.appendChild(ov);
    
    window._rOverlay = ov;
    window._rSrc = canvas;
    window._rOn = true;
    window._rBuf = [];
    window._rFrameRequested = false;

    // On cache le vrai graphique
    canvas.style.opacity = '0';
    var octx = ov.getContext('2d');

    // LA TECHNIQUE DU BYPASS : On intercepte la fonction de dessin de Pocket Option
    // On va s'accrocher à la fonction requestAnimationFrame (utilisée par tous les graphiques)
    var originalRAF = window.requestAnimationFrame;
    
    window.requestAnimationFrame = function(callback) {
        return originalRAF.call(window, function(timestamp) {
            // On laisse Pocket Option dessiner
            callback(timestamp);
            
            // JUSTE APRÈS son dessin, on capture (avant que Safari efface)
            if (window._rOn) {
                try {
                    var frame = document.createElement('canvas');
                    frame.width = canvas.width; frame.height = canvas.height;
                    var fctx = frame.getContext('2d');
                    
                    // Le drawImage fonctionne ICI car on est dans le même cycle de rendu
                    fctx.drawImage(canvas, 0, 0);
                    
                    window._rBuf.push({ t: Date.now(), frame: frame });
                    while(window._rBuf.length && Date.now() - window._rBuf[0].t > 6500) {
                        window._rBuf.shift();
                    }
                } catch(e) {}
            }
        });
    };

    // La boucle d'affichage du retard
    window._rTimer = setInterval(function() {
        if (!window._rOn) return;
        
        var delayed = null;
        for (var i = 0; i < window._rBuf.length; i++) {
            if (Date.now() - window._rBuf[i].t >= 6000) delayed = window._rBuf[i].frame;
        }

        octx.clearRect(0, 0, ov.width, ov.height);
        if (delayed) {
            octx.drawImage(delayed, 0, 0, ov.width, ov.height);
        } else if (window._rBuf.length > 0) {
            octx.drawImage(window._rBuf[0].frame, 0, 0, ov.width, ov.height);
        }
    }, 100);

    return 'Retard ON (Bypass RAF)';
};

// Fonction pour nettoyer proprement quand on coupe le retard
var originalStop = window.r;
window.r = function() {
    if (window._rOn) {
        window.requestAnimationFrame = window._rOriginalRAF || window.requestAnimationFrame; // restore
    } else {
        window._rOriginalRAF = window.requestAnimationFrame;
    }
    return originalStop.apply(this, arguments);
};
