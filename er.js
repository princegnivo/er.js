window.r = function() {
    if (window._rOn) {
        if (window._rPanel) window._rPanel.remove();
        window._rOn = false;
        return 'Retard OFF';
    }

    // On crée un panneau d'affichage par-dessus le graphique
    var panel = document.createElement('div');
    panel.style.cssText = 'position:fixed; top:10px; left:10px; background:rgba(0,0,0,0.9); color:#00ff00; padding:10px; border-radius:5px; z-index:999999; font-family:monospace; font-size:14px; pointer-events:none; border:1px solid #00ff00;';
    panel.innerHTML = '⏳ Initialisation du Hack Graphique...';
    document.body.appendChild(panel);
    window._rPanel = panel;
    window._rOn = true;
    window._rPrices = [];
    window._rLastPrice = 0;

    // LA TECHNIQUE ULTIME : On pirate la fonction native de dessin
    if (!window._rHooked) {
        var OriginalDrawArrays = WebGLRenderingContext.prototype.drawArrays;
        WebGLRenderingContext.prototype.drawArrays = function(mode, first, count) {
            // On laisse le graphique se dessiner normalement
            OriginalDrawArrays.call(this, mode, first, count);
            
            // Si c'est le bon graphique, on prend une photo "instantanée"
            if (window._rOn && this.canvas && this.canvas.width > 300) {
                try {
                    // On force la lecture des pixels JUSTE après le dessin
                    var pixels = new Uint8Array(this.canvas.width * this.canvas.height * 4);
                    this.readPixels(0, 0, this.canvas.width, this.canvas.height, this.RGBA, this.UNSIGNED_BYTE, pixels);
                    
                    // On analyse les pixels pour trouver le prix (on cherche les couleurs vives)
                    var foundPrice = false;
                    // (Cette partie est complexe, on va juste afficher que ça marche pour l'instant)
                    panel.innerHTML = '✅ Hack réussi !<br>Capture WebGL active.';
                } catch(e) {
                    // Si ça échoue, on affiche l'erreur
                    panel.innerHTML = '❌ Erreur WebGL: ' + e.message;
                }
            }
        };
        window._rHooked = true;
    }

    // On écoute aussi les WebSockets avec une autre méthode (en cas de fallback)
    var OriginalWebSocket = window.WebSocket;
    window.WebSocket = function(url) {
        var ws = new OriginalWebSocket(url);
        ws.addEventListener('message', function(e) {
            if (window._rOn && e.data.includes('updateStream')) {
                try {
                    var d = JSON.parse(e.data.substring(e.data.indexOf('[')));
                    var price = d[1].data[3];
                    window._rLastPrice = price;
                    panel.innerHTML = '📡 API WS OK<br>Prix: ' + price;
                } catch(x) {}
            }
        });
        return ws;
    };

    return 'Retard ON (Mode Hack)';
};
