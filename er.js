window.r = function() {
    if (window._rOn) {
        if (window._rWrapper) window._rWrapper.remove();
        if (window._rSrc) window._rSrc.style.opacity = '';
        window._rOn = false;
        return 'Retard OFF';
    }

    var canvas = [].slice.call(document.querySelectorAll('canvas')).filter(function(x){return x.width > 300 && x.height > 200;}).sort(function(a,b){return (b.width*b.height)-(a.width*a.height);})[0];
    if (!canvas) return 'Graphique introuvable.';

    // On trouve le conteneur du graphique
    var container = canvas.parentElement;
    while (container && container !== document.body && container.getBoundingClientRect().height < 100) {
        container = container.parentElement;
    }
    if (!container) return 'Conteneur introuvable';

    var rect = container.getBoundingClientRect();
    var ov = document.createElement('canvas');
    ov.width = canvas.width; ov.height = canvas.height;
    ov.style.cssText = 'position:fixed;pointer-events:none;z-index:2147483647;';
    ov.style.left = rect.left + 'px'; ov.style.top = rect.top + 'px';
    ov.style.width = rect.width + 'px'; ov.style.height = rect.height + 'px';
    document.body.appendChild(ov);

    window._rOverlay = ov;
    window._rSrc = canvas;
    window._rOn = true;
    window._rBuf = [];
    
    // On masque le vrai graphique
    canvas.style.opacity = '0';

    var octx = ov.getContext('2d');

    function captureFrame() {
        // La technique du SVG pour forcer Safari à faire un "screenshot"
        var svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">` +
                  `<foreignObject width="100%" height="100%">` +
                  `<div xmlns="http://www.w3.org/1999/xhtml" style="width:${rect.width}px;height:${rect.height}px;background:#0f1622;">` +
                  container.outerHTML + // On clone le HTML
                  `</div></foreignObject></svg>`;
        
        var img = new Image();
        var svg64 = btoa(unescape(encodeURIComponent(svg)));
        var image64 = 'data:image/svg+xml;base64,' + svg64;
        
        img.onload = function() {
            var frame = document.createElement('canvas');
            frame.width = rect.width; frame.height = rect.height;
            var fctx = frame.getContext('2d');
            fctx.drawImage(img, 0, 0);
            
            window._rBuf.push({ t: Date.now(), frame: frame });
            while(window._rBuf.length && Date.now() - window._rBuf[0].t > 6500) {
                window._rBuf.shift();
            }
            
            var delayed = null;
            for(var i=0; i<window._rBuf.length; i++) {
                if(Date.now() - window._rBuf[i].t >= 6000) delayed = window._rBuf[i].frame;
            }
            
            octx.clearRect(0, 0, ov.width, ov.height);
            if(delayed) octx.drawImage(delayed, 0, 0, ov.width, ov.height);
            else octx.drawImage(img, 0, 0, ov.width, ov.height); // Image live au début
        };
        img.src = image64;
    }

    // On lance la capture 5 fois par seconde
    window._rTimer = setInterval(captureFrame, 200);
    captureFrame(); // Première capture immédiate

    return 'Retard ON (Mode SVG)';
};
